const {
  app,
  BrowserWindow,
  BrowserView,
  ipcMain,
  dialog,
} = require('electron');
const path = require('path');
const fs = require('fs');

if (require('electron-squirrel-startup')) {
  app.quit();
}

let child;
let mainWindow;
let editorView;
let webPageView;
let backgroundView = null;
let resolutionView;
let modalView;
let shadowView;
let multiViews = [];
const editedStyles = {};
const syncStates = {};
let isGlobalScrolling = false;
let globalScrollDebounceTimer = null;
let isMultiViewMode = false;
let isSingleModeTilted = false;
let currentResolutionKey = 'desktop';
let isTilted = false;
let customResolutions = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
};

const createModalLoading = () => {
  child = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: mainWindow.getBounds().width,
    height: mainWindow.getBounds().height,
  });

  const loadingUrl = process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL
    ? `${process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL}/loading`
    : `file://${path.join(__dirname, '../dist/renderer/index.html')}/loading`;

  child.loadURL(loadingUrl);

  child.once('ready-to-show', () => {
    child.show();
  });
};

const createModalView = () => {
  if (modalView) {
    return;
  }

  modalView = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  shadowView = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  const modalUrl = process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL
    ? `${process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL}/modal`
    : `file://${path.join(__dirname, '../dist/renderer/index.html')}/modal`;

  const shadowHtml = `
    <style>
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
    </style>
    <div></div>
  `;

  shadowView.webContents.loadURL(
    `data:text/html;charset=utf-8,${encodeURIComponent(shadowHtml)}`,
  );
  modalView.webContents.loadURL(modalUrl);

  mainWindow.addBrowserView(shadowView);
  mainWindow.addBrowserView(modalView);

  shadowView.setBounds({
    x: 0,
    y: 0,
    width: mainWindow.getBounds().width,
    height: mainWindow.getBounds().height,
  });

  const modalWidth = 700;
  const modalHeight = 500;
  modalView.setBounds({
    x: (mainWindow.getBounds().width - modalWidth) / 2,
    y: (mainWindow.getBounds().height - modalHeight) / 2,
    width: modalWidth,
    height: modalHeight,
  });

  modalView.webContents.once('did-finish-load', () => {
    modalView.webContents.send('currentResolutions', customResolutions);
  });
};

const createBackgroundView = (x = 0) => {
  if (backgroundView) {
    mainWindow.removeBrowserView(backgroundView);
    backgroundView.webContents.destroy();
    backgroundView = null;
  }

  backgroundView = new BrowserView({
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.addBrowserView(backgroundView);

  backgroundView.setBounds({
    x,
    y: 80,
    width: mainWindow.getBounds().width - x,
    height: mainWindow.getBounds().height - 80,
  });

  const backgroundHtml = `
    <style>
      body {
        background-color: #303030;
        margin: 0;
        overflow: hidden;
        position: relative;
      }
      .resolution-label {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 5px;
        z-index: 9999;
      }
    </style>
    <div id="resolution-label-container"></div>
  `;

  backgroundView.webContents.loadURL(
    `data:text/html;charset=utf-8,${encodeURIComponent(backgroundHtml)}`,
  );
};

const createBrowserViews = async (url) => {
  if (editorView) {
    mainWindow.removeBrowserView(editorView);
  }

  if (webPageView) {
    mainWindow.removeBrowserView(webPageView);
  }

  if (resolutionView) {
    mainWindow.removeBrowserView(resolutionView);
  }

  const toolHeight = 80;

  editorView = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  webPageView = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  resolutionView = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.addBrowserView(editorView);

  editorView.setBounds({
    x: 0,
    y: toolHeight,
    width: 400,
    height: mainWindow.getBounds().height - toolHeight,
  });

  const editorUrl = process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL
    ? `${process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL}/editor`
    : `file://${path.join(__dirname, '../dist/renderer/index.html')}/editor`;

  mainWindow.addBrowserView(resolutionView);

  resolutionView.setBounds({
    x: 0,
    y: 0,
    width: mainWindow.getBounds().width,
    height: 80,
  });

  const resolutionUrl = process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL
    ? `${process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL}/resolution`
    : `file://${path.join(__dirname, '../dist/renderer/index.html')}/resolution`;

  try {
    await editorView.webContents.loadURL(editorUrl);
    await resolutionView.webContents.loadURL(resolutionUrl);

    mainWindow.addBrowserView(webPageView);
    webPageView.setBackgroundColor('#ffffff');
    mainWindow.setTopBrowserView(webPageView);
    webPageView.setBounds({
      x: 400,
      y: toolHeight,
      width: mainWindow.getBounds().width - 400,
      height: mainWindow.getBounds().height - toolHeight,
    });
    webPageView.webContents.loadURL(url);

    webPageView.webContents.on('did-finish-load', async () => {
      if (!isMultiViewMode) {
        webPageView.webContents.setZoomFactor(1);
      }
      const script = fs.readFileSync(
        path.join(__dirname, 'highlight.js'),
        'utf8',
      );
      await webPageView.webContents.executeJavaScript(script);
      child.close();
    });
  } catch (error) {
    console.error('Failed to load URL:', error);
  }
};

const applyStyles = async (view, editedStyle) => {
  const promises = Object.values(editedStyle).map(async ({ xPath, style }) => {
    const styleString = JSON.stringify(style)
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"');

    await view.webContents.executeJavaScript(`
      (function() {
        const selectedElement = document.evaluate(${JSON.stringify(xPath)}, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          if (selectedElement) {
            const styles = JSON.parse('${styleString}');

            for (const [key, value] of Object.entries(styles)) {
              selectedElement.style[key] = value;
            }
          }
      })();
    `);
  });
  await Promise.all(promises);
};

const getViewConfigs = (tilted) =>
  tilted
    ? [
        {
          width: customResolutions.mobile.height,
          height: customResolutions.mobile.width,
          scale: 0.5,
          x: 20,
        },
        {
          width: customResolutions.tablet.height,
          height: customResolutions.tablet.width,
          scale: 0.5,
          x: customResolutions.mobile.height * 0.5 + 40,
        },
        {
          width: customResolutions.desktop.width,
          height: customResolutions.desktop.height,
          scale: 0.5,
          x:
            customResolutions.mobile.height * 0.5 +
            customResolutions.tablet.height * 0.5 +
            60,
        },
      ]
    : [
        {
          width: customResolutions.mobile.width,
          height: customResolutions.mobile.height,
          scale: 0.5,
          x: 20,
        },
        {
          width: customResolutions.tablet.width,
          height: customResolutions.tablet.height,
          scale: 0.5,
          x: customResolutions.mobile.width * 0.5 + 40,
        },
        {
          width: customResolutions.desktop.width,
          height: customResolutions.desktop.height,
          scale: 0.5,
          x:
            customResolutions.mobile.width * 0.5 +
            customResolutions.tablet.width * 0.5 +
            60,
        },
      ];

const setViewBounds = (view, config, index) => {
  const scaledWidth = Math.round(config.width * config.scale);
  const scaledHeight = Math.round(config.height * config.scale);

  view.setBounds({
    x: config.x,
    y: 140,
    width: scaledWidth,
    height: scaledHeight,
  });

  backgroundView.webContents.executeJavaScript(`
    (function() {
      let container = document.getElementById('resolution-label-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'resolution-label-container';
        document.body.appendChild(container);
      }

      let label = document.getElementById('resolution-label-${index}');
      if (!label) {
        label = document.createElement('div');
        label.id = 'resolution-label-${index}';
        label.className = 'resolution-label';
        container.appendChild(label);
      }
      label.style.left = '${config.x}px';
      label.style.top = '20px';
      label.textContent = '${config.width} x ${config.height}px';
    })();
`);
};

const cleanUpViews = async (views) => {
  await Promise.all(
    views.map(async (view) => {
      await view.webContents.executeJavaScript(
        'if (window.cleanupScrollHandlers) window.cleanupScrollHandlers();',
      );
      mainWindow.removeBrowserView(view);
      view.webContents.destroy();
    }),
  );
};

const createAndInitializeView = async (config, index, url) => {
  const view = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.addBrowserView(view);
  view.setBackgroundColor('#ffffff');
  mainWindow.setTopBrowserView(view);
  setViewBounds(view, config, index);
  await view.webContents.loadURL(url);
  view.webContents.setZoomFactor(config.scale);
  syncStates[index] = { isScrolling: false };

  await view.webContents.executeJavaScript(
    `
    (function() {
      let isScrolling = false;
      let lastScrollPosition = { x: 0, y: 0 };
      let scrollDebounceTimer = null;

      const scrollHandler = () => {
        if (isScrolling) return;

        clearTimeout(scrollDebounceTimer);
        scrollDebounceTimer = setTimeout(() => {
          const scrollX = window.scrollX / (document.documentElement.scrollWidth - window.innerWidth) || 0;
          const scrollY = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) || 0;

          if (Math.abs(scrollX - lastScrollPosition.x) > 0.001 || Math.abs(scrollY - lastScrollPosition.y) > 0.001) {
            lastScrollPosition = { x: scrollX, y: scrollY };
            window.electronAPI.reportScroll(${index}, scrollX, scrollY);
          }
        }, 50);
      };

      window.addEventListener('scroll', scrollHandler);

      const syncScrollHandler = (scrollX, scrollY) => {
        isScrolling = true;
        const targetX = scrollX * (document.documentElement.scrollWidth - window.innerWidth);
        const targetY = scrollY * (document.documentElement.scrollHeight - window.innerHeight);
        window.scrollTo(targetX, targetY);
        setTimeout(() => {
          isScrolling = false;
          window.electronAPI.syncScrollComplete(${index});
        }, 100);
      };

      window.electronAPI.onSyncScroll(syncScrollHandler);

      window.cleanupScrollHandlers = () => {
        window.removeEventListener('scroll', scrollHandler);
        window.electronAPI.removeSyncScrollListener(syncScrollHandler);
      };
    })();
  `.replace(/\${index}/g, index),
  );

  await applyStyles(view, editedStyles);
  multiViews.push(view);
};

const createMultiViews = async () => {
  if (multiViews.length > 0) {
    await cleanUpViews(multiViews);
    multiViews = [];
  }

  createBackgroundView(0);

  const viewConfigs = getViewConfigs(isTilted);
  const currentUrl = await webPageView.webContents.getURL();

  await viewConfigs.reduce(async (previousPromise, config, index) => {
    await previousPromise;
    return createAndInitializeView(config, index, currentUrl);
  }, Promise.resolve());
};

const restoreDefaultViews = async () => {
  if (multiViews.length > 0) {
    await cleanUpViews(multiViews);
    multiViews = [];
  }

  if (backgroundView) {
    mainWindow.removeBrowserView(backgroundView);
    backgroundView.webContents.destroy();
    backgroundView = null;
  }

  mainWindow.addBrowserView(editorView);
  mainWindow.addBrowserView(webPageView);

  webPageView.webContents.setZoomFactor(1);
  webPageView.setBounds({
    x: 400,
    y: 80,
    width: mainWindow.getBounds().width - 400,
    height: mainWindow.getBounds().height - 80,
  });
};

const toggleTiltSingleView = () => {
  if (currentResolutionKey === 'desktop') {
    return;
  }

  isSingleModeTilted = !isSingleModeTilted;
  const currentBounds = webPageView.getBounds();
  const mainWindowBounds = mainWindow.getBounds();
  const resolution = customResolutions[currentResolutionKey];

  if (isSingleModeTilted) {
    webPageView.setBounds({
      x: currentBounds.x,
      y: 80,
      width: resolution.height,
      height: mainWindowBounds.height - 80,
    });
  } else {
    webPageView.setBounds({
      x: currentBounds.x,
      y: 80,
      width: resolution.width,
      height: mainWindowBounds.height - 80,
    });
  }
};

const toggleTiltMultiViews = async () => {
  isTilted = !isTilted;
  const viewConfigs = getViewConfigs(isTilted);

  multiViews.forEach((view, index) => {
    const config = viewConfigs[index];

    if (config) {
      setViewBounds(view, config, index);
      view.webContents.setZoomFactor(config.scale);
    }
  });
};

ipcMain.on('enableMultiViewMode', async () => {
  isMultiViewMode = true;
  isSingleModeTilted = false;
  isTilted = false;

  await createMultiViews();
});

ipcMain.on('tiltViews', () => {
  if (isMultiViewMode) {
    toggleTiltMultiViews();
  } else {
    toggleTiltSingleView();
  }
});

ipcMain.on('update-resolutions', (event, resolutions) => {
  customResolutions = {
    mobile: {
      width: Number(resolutions.mobile.width),
      height: Number(resolutions.mobile.height),
    },
    tablet: {
      width: Number(resolutions.tablet.width),
      height: Number(resolutions.tablet.height),
    },
    desktop: {
      width: Number(resolutions.desktop.width),
      height: Number(resolutions.desktop.height),
    },
  };

  if (isMultiViewMode) {
    createMultiViews();
  } else {
    const currentResolution = customResolutions[currentResolutionKey];

    webPageView.setBounds({
      x: 400,
      y: 80,
      width: currentResolution.width,
      height: mainWindow.getBounds().height - 80,
    });

    webPageView.webContents.setZoomFactor(1);
  }
});

ipcMain.on('setResolution', (event, resolutionKey) => {
  currentResolutionKey = resolutionKey;
  isMultiViewMode = false;
  isSingleModeTilted = false;

  restoreDefaultViews();

  if (resolutionKey === 'desktop') {
    webPageView.setBounds({
      x: 400,
      y: 80,
      width: mainWindow.getBounds().width - 400,
      height: mainWindow.getBounds().height - 80,
    });
  } else {
    const resolution = customResolutions[resolutionKey];

    webPageView.setBounds({
      x: 400,
      y: 80,
      width: resolution.width,
      height: mainWindow.getBounds().height - 80,
    });
  }

  webPageView.webContents.setZoomFactor(1);
});

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: false,
    },
    fullscreen: true,
    backgroundColor: '#303030',
  });

  const startUrl =
    process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL ||
    `file://${path.join(__dirname, '../dist/renderer/index.html')}`;
  mainWindow.loadURL(startUrl);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
};

function setupIpcListeners() {
  ipcMain.on('reportScroll', (event, sourceIndex, scrollX, scrollY) => {
    if (isGlobalScrolling) {
      return;
    }

    isGlobalScrolling = true;

    clearTimeout(globalScrollDebounceTimer);
    globalScrollDebounceTimer = setTimeout(() => {
      let syncCompleteCount = 0;
      const totalViews = multiViews.length;

      const handleSyncComplete = (syncEvent, viewIndex) => {
        syncStates[viewIndex].isScrolling = false;
        syncCompleteCount += 1;

        if (syncCompleteCount === totalViews - 1) {
          isGlobalScrolling = false;

          Object.keys(syncStates).forEach((index) => {
            syncStates[index].isScrolling = false;
          });

          ipcMain.removeListener('syncScrollComplete', handleSyncComplete);
        }
      };

      ipcMain.on('syncScrollComplete', handleSyncComplete);

      multiViews.forEach((view, index) => {
        if (index !== sourceIndex && !syncStates[index].isScrolling) {
          syncStates[index].isScrolling = true;

          view.webContents.send('sync-scroll', scrollX, scrollY);
        }
      });
    }, 50);
  });

  ipcMain.on('load-url', async (event, url) => {
    await createModalLoading();
    await createBrowserViews(url);
  });

  ipcMain.on('show-modal', () => {
    if (modalView) {
      mainWindow.removeBrowserView(modalView);
      mainWindow.removeBrowserView(shadowView);
      modalView = null;
      shadowView = null;
    }
    createModalView();
  });

  ipcMain.on('close-modal', () => {
    if (modalView) {
      mainWindow.removeBrowserView(modalView);
      mainWindow.removeBrowserView(shadowView);
      modalView = null;
      shadowView = null;
    }
  });

  ipcMain.on('apply-style', (event, style) => {
    const { xPath, cssText } = style;

    if (!editedStyles[xPath]) {
      editedStyles[xPath] = { style: {} };
    }
    const [property, value] = cssText.split(': ');
    editedStyles[xPath].style[property] = value;

    webPageView.webContents
      .executeJavaScript(
        `
      (function() {
        const selectedElement = document.evaluate(${JSON.stringify(xPath)}, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          if (selectedElement) {
            selectedElement.style.cssText += '${cssText}';
          }
      })();
    `,
      )
      .catch((err) => console.error(err));
  });

  ipcMain.on('element-clicked', async (event, elementInfo) => {
    const script = fs.readFileSync(
      path.join(__dirname, 'utils/styleUtils.js'),
      'utf8',
    );

    const style = await webPageView.webContents.executeJavaScript(`
      (function() {
        ${script}

        function getElementXPath(element) {
          if (element.id !== '')
            return 'id("' + element.id + '")';
          if (element === document.body)
            return element.tagName;

          let ix = 0;
          const siblings = element.parentNode.childNodes;
          for (let i = 0; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling === element)
              return getElementXPath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
              ix++;
          }
          return null;
        }

        function getElementFriendlyIdentifier(element) {
          if (element.id) {
            return '#' + element.id;
          }

          const tagName = element.tagName.toLowerCase();

          const classNames = element.className
            ? '.' + element.className.split(' ').filter(className => className !== 'hover-highlight' && className !== 'click-highlight').join('.')
            : '';

          const siblings = Array.from(element.parentNode.children).filter(sibling => sibling.tagName === element.tagName);
          const index = siblings.indexOf(element) + 1;
          const identifier = \`\${tagName}\${classNames}\${index > 1 ? \`[\${index}]\` : ''}\`;

          if (element.parentElement && element.parentElement.tagName.toLowerCase() !== 'html') {
            return getElementFriendlyIdentifier(element.parentElement) + ' > ' + identifier;
          }

          return identifier;
        }

        const element = document.evaluate(${JSON.stringify(elementInfo.xPath)}, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
          const computedStyle = window.getComputedStyle(element);
          return {
            xPath: ${JSON.stringify(elementInfo.xPath)},
            friendlyIdentifier: getElementFriendlyIdentifier(element),
            style: getComputedStyleProperties(computedStyle)
          };
        }
        return null;
      })();
    `);

    if (style) {
      editedStyles[elementInfo.xPath] = style;
      editorView.webContents.send('element-style', style);
    }
  });

  ipcMain.on('save-document', (event, content) => {
    dialog
      .showSaveDialog({
        title: 'Save Modified Styles',
        defaultPath: 'modified_styles.txt',
        filters: [{ name: 'Text Files', extensions: ['txt'] }],
      })
      .then((result) => {
        if (!result.canceled && result.filePath) {
          fs.writeFileSync(result.filePath, content);
        }
      })
      .catch((err) => {
        console.error('파일 저장 중 오류가 발생했습니다:', err);
      });
  });
}

app.whenReady().then(() => {
  setupIpcListeners();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (require('electron-squirrel-startup')) {
    app.quit();
  }
});
