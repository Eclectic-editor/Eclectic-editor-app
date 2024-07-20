const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;
let editorView;
let webPageView;
let resolutionView;
let loadingView;
let modalView;
let shadowView;
let responsiveViews = [];
const editedStyles = {};

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

  const modalWidth = 500;
  const modalHeight = 400;
  modalView.setBounds({
    x: (mainWindow.getBounds().width - modalWidth) / 2,
    y: (mainWindow.getBounds().height - modalHeight) / 2,
    width: modalWidth,
    height: modalHeight,
  });
};

const createLoadingView = () => {
  if (loadingView) {
    mainWindow.removeBrowserView(loadingView);
  }

  loadingView = new BrowserView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  const loadingUrl = process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL
    ? `${process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL}/loading`
    : `file://${path.join(__dirname, '../dist/renderer/index.html')}/loading`;

  loadingView.webContents.loadURL(loadingUrl);

  mainWindow.addBrowserView(loadingView);

  loadingView.setBounds({
    x: 0,
    y: 0,
    width: mainWindow.getBounds().width,
    height: mainWindow.getBounds().height,
  });
};

const removeLoadingView = () => {
  if (loadingView) {
    mainWindow.removeBrowserView(loadingView);
    loadingView.webContents.destroy();
    loadingView = null;
  }
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
    await createLoadingView();
    await editorView.webContents.loadURL(editorUrl);
    await resolutionView.webContents.loadURL(resolutionUrl);

    mainWindow.addBrowserView(webPageView);
    webPageView.setBounds({
      x: 400,
      y: toolHeight,
      width: mainWindow.getBounds().width - 400,
      height: mainWindow.getBounds().height - toolHeight,
    });
    webPageView.webContents.loadURL(url);

    mainWindow.removeBrowserView(loadingView);
    mainWindow.addBrowserView(loadingView);
    loadingView.setBounds({
      x: 0,
      y: 0,
      width: mainWindow.getBounds().width,
      height: mainWindow.getBounds().height,
    });

    webPageView.webContents.on('did-finish-load', async () => {
      try {
        const script = fs.readFileSync(
          path.join(__dirname, 'highlight.js'),
          'utf8',
        );
        await webPageView.webContents.executeJavaScript(script);
        removeLoadingView();
      } catch (err) {
        console.error('Error during JavaScript execution:', err);
      }
    });
  } catch (error) {
    console.error('Failed to load URL:', error);
  }
};

const applyStyles = async (view, editedStyle) => {
  const promises = Object.values(editedStyle).map(async ({ xPath, style }) => {
    const styleString = Object.entries(style)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
    await view.webContents.executeJavaScript(`
      (function() {
        const selectedElement = document.evaluate(${JSON.stringify(xPath)}, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (selectedElement) {
          selectedElement.style.cssText += '${styleString}';
        }
      })();
    `);
  });
  await Promise.all(promises);
};

const createResponsiveViews = async () => {
  if (responsiveViews.length > 0) {
    responsiveViews.forEach((view) => mainWindow.removeBrowserView(view));
    responsiveViews = [];
  }

  const viewConfigs = [
    { width: 375, height: mainWindow.getBounds().height - 80, x: 0 },
    { width: 768, height: mainWindow.getBounds().height - 80, x: 375 },
    { width: 1440, height: mainWindow.getBounds().height - 80, x: 1143 },
  ];

  const currentUrl = await webPageView.webContents.getURL();

  const viewPromises = viewConfigs.map(async (config) => {
    const view = new BrowserView({
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        enableRemoteModule: false,
      },
    });

    mainWindow.addBrowserView(view);
    view.setBounds({
      x: config.x,
      y: 80,
      width: config.width,
      height: config.height,
    });
    view.setAutoResize({ width: false, height: false });
    await view.webContents.loadURL(currentUrl);
    await applyStyles(view, editedStyles);

    responsiveViews.push(view);
  });

  await Promise.all(viewPromises);

  mainWindow.removeBrowserView(editorView);
};

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
  });

  const startUrl =
    process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL ||
    `file://${path.join(__dirname, '../dist/renderer/index.html')}`;
  mainWindow.loadURL(startUrl);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on('load-url', async (event, url) => {
    await createBrowserViews(url);
  });

  ipcMain.on('openResponsiveViews', async () => {
    await createResponsiveViews();
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
    const style = await webPageView.webContents.executeJavaScript(`
      (function() {
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

        const element = document.evaluate(${JSON.stringify(elementInfo.xPath)}, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
          const computedStyle = window.getComputedStyle(element);
          return {
            xPath: ${JSON.stringify(elementInfo.xPath)},
            style: {
              fontFamily: computedStyle.fontFamily,
              color: computedStyle.color,
              fontSize: computedStyle.fontSize,
              lineHeight: computedStyle.lineHeight,
              fontWeight: computedStyle.fontWeight,
              fontStyle: computedStyle.fontStyle,
              fontVariant: computedStyle.fontVariant,
              textDecoration: computedStyle.textDecoration,
            }
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
};

app.whenReady().then(() => {
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
