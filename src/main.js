const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');

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
    : `file://${path.join(__dirname, '../dist/renderer/index.html')}#/editor`;

  mainWindow.addBrowserView(resolutionView);

  resolutionView.setBounds({
    x: 0,
    y: 0,
    width: 1400,
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
        await webPageView.webContents.executeJavaScript(`
          const style = document.createElement('style');
          style.innerHTML = \`
          .hover-highlight {
            position: relative;
            outline: 2px dashed #00b894;
            z-index: 1000;
          }
          .click-highlight {
            outline: 2px solid #0984e3;
            z-index: 1000;
          }
          .hover-element-info,
          .click-element-info {
            position: absolute;
            top: 100%;
            left: 0;
            background: rgba(255, 255, 255, 0.9);
            padding: 2px 5px;
            font-size: 14px;
            z-index: 1000;
            pointer-events: none;
          }
          \`;
          document.head.appendChild(style);

          const hoverInfoBox = document.createElement('div');
          hoverInfoBox.classList.add('hover-element-info');
          document.body.appendChild(hoverInfoBox);

          const clickInfoBox = document.createElement('div');
          clickInfoBox.classList.add('click-element-info');
          document.body.appendChild(clickInfoBox);

          const addEventListeners = (target) => {
            target.addEventListener('mouseover', (event) => {
              if (window.hoveredElement) {
                window.hoveredElement.classList.remove('hover-highlight');
              }
              if (event.target.classList.contains('click-highlight')) return;

              event.target.classList.add('hover-highlight');
              window.hoveredElement = event.target;

              const rect = event.target.getBoundingClientRect();
              hoverInfoBox.style.top = rect.top + window.scrollY - hoverInfoBox.offsetHeight + 'px';
              hoverInfoBox.style.left = rect.left + window.scrollX + 'px';
              hoverInfoBox.style.backgroundColor = '#00b894';
              hoverInfoBox.innerHTML = \`<strong>\${event.target.tagName.toLowerCase()}</strong>\${
                event.target.classList.length > 0
                  ? '.' + Array.from(event.target.classList).filter(c => c !== 'hover-highlight' && c !== 'click-highlight').join('.')
                  : ''
              }\`;
            });

            target.addEventListener('click', (event) => {
              event.preventDefault();
              event.stopPropagation();
              if (window.selectedElement) {
                window.selectedElement.classList.remove('click-highlight');
              }
              event.target.classList.add('click-highlight');
              window.selectedElement = event.target;

              const rect = event.target.getBoundingClientRect();
              clickInfoBox.style.top = rect.top + window.scrollY - clickInfoBox.offsetHeight + 'px';
              clickInfoBox.style.left = rect.left + window.scrollX + 'px';
              clickInfoBox.style.backgroundColor = '#0984e3';
              clickInfoBox.innerHTML = \`<strong>\${event.target.tagName.toLowerCase()}</strong>\${
                event.target.classList.length > 0
                  ? '.' + Array.from(event.target.classList).filter(c => c !== 'hover-highlight' && c !== 'click-highlight').join('.')
                  : ''
              }\`;
            });
          };

          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element Node
                  addEventListeners(node);
                  node.querySelectorAll('*').forEach(addEventListeners);
                }
              });
            });
          });

          observer.observe(document.body, {
            childList: true,
            subtree: true
          });

          document.querySelectorAll('*').forEach(addEventListeners);
        `);
        removeLoadingView();
      } catch (err) {
        console.error('Error during JavaScript execution:', err);
      }
    });
  } catch (error) {
    console.error('Failed to load URL:', error);
  }
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

  ipcMain.on('show-modal', () => {
    console.log('show-modal event received');
    if (modalView) {
      mainWindow.removeBrowserView(modalView);
      mainWindow.removeBrowserView(shadowView);
      modalView = null;
      shadowView = null;
    }
    createModalView();
  });

  ipcMain.on('close-modal', () => {
    console.log('close-modal event received');
    if (modalView) {
      mainWindow.removeBrowserView(modalView);
      mainWindow.removeBrowserView(shadowView);
      modalView = null;
      shadowView = null;
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
