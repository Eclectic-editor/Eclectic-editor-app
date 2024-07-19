const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { randomUUID } = require('crypto');

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
    webPageView.webContents
      .executeJavaScript(
        `
      (function() {
        const selectedElement = document.querySelector('[data-eclectic="${style.eclectic}"]');
        if (selectedElement) {
          selectedElement.style.cssText += '${style.cssText}';
        }
      })();
    `,
      )
      .catch((err) => console.error(err));
  });

  ipcMain.on('element-clicked', async (event, elementInfo) => {
    const style = await webPageView.webContents.executeJavaScript(`
      (function() {
        const element = document.querySelector('[data-eclectic="${elementInfo.eclectic}"]');
        if (element) {
          const computedStyle = window.getComputedStyle(element);
          return {
            fontFamily: computedStyle.fontFamily,
            color: computedStyle.color,
            fontSize: computedStyle.fontSize,
            lineHeight: computedStyle.lineHeight,
            fontWeight: computedStyle.fontWeight,
            fontStyle: computedStyle.fontStyle,
            fontVariant: computedStyle.fontVariant,
            textDecoration: computedStyle.textDecoration,
          };
        }
        return null;
      })();
    `);

    if (style) {
      editorView.webContents.send('element-style', {
        eclectic: elementInfo.eclectic,
        style,
      });
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

ipcMain.handle('generate-uuid', async () => randomUUID());
