const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;
let tooltipWindow;
let editorView;
let webPageView;

const createBrowserViews = async (url) => {
  if (editorView) {
    mainWindow.removeBrowserView(editorView);
  }

  if (webPageView) {
    mainWindow.removeBrowserView(webPageView);
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

  mainWindow.setBrowserView(editorView);

  editorView.setBounds({
    x: 0,
    y: toolHeight,
    width: 400,
    height: mainWindow.getBounds().height - toolHeight,
  });

  const editorUrl = process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL
    ? `${process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL}/editor`
    : `file://${path.join(__dirname, '../dist/renderer/index.html')}/editor`;

  try {
    await editorView.webContents.loadURL(editorUrl);

    mainWindow.addBrowserView(webPageView);
    webPageView.setBounds({
      x: 400,
      y: toolHeight,
      width: mainWindow.getBounds().width - 400,
      height: mainWindow.getBounds().height - toolHeight,
    });

    await webPageView.webContents.loadURL(url);
  } catch (error) {
    console.error('Failed to load URL:', error);
  }
};

const createTooltipWindow = () => {
  tooltipWindow = new BrowserWindow({
    width: 80,
    height: 30,
    frame: false,
    transparent: true,
    alwaysOnTop: false,
    show: false,
    webPreferences: {
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  const fontPath = path.join(
    __dirname,
    'renderer/assets/fonts/DegularDisplay-Regular.woff2',
  );
  const fontFile = fs.readFileSync(fontPath);
  const base64Font = fontFile.toString('base64');

  tooltipWindow.loadURL(`data:text/html;charset=utf-8,
    <style>
      @font-face {
        font-family: 'DegularDisplay';
        src: url(data:font/woff2;base64,${base64Font}) format('woff2');
        font-weight: normal;
        font-style: normal;
      }
      body { margin: 0; padding: 0; overflow: hidden; }
      .tooltip {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        background: black;
        color: white;
        font-size: 14px;
        font-family: 'DegularDisplay', sans-serif;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    </style>
    <div id="tooltip" class="tooltip"></div>
    <script>
      const { ipcRenderer } = require('electron');
      ipcRenderer.on('update-tooltip', (event, text) => {
        const tooltipElement = document.getElementById('tooltip');
        if (tooltipElement) {
          tooltipElement.textContent = text;
          console.log("Tooltip text updated:", text);
        } else {
          console.error("Tooltip element not found");
        }
      });
    </script>`);

  tooltipWindow.on('closed', () => {
    tooltipWindow = null;
  });
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
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

  ipcMain.on('show-tooltip', (event, { x, y, text }) => {
    if (!tooltipWindow) {
      createTooltipWindow();
    }

    tooltipWindow.setBounds({ x: x + 134, y: y + 80, width: 80, height: 30 });
    tooltipWindow.webContents.send('update-tooltip', text);
    tooltipWindow.show();
  });

  ipcMain.on('hide-tooltip', () => {
    if (tooltipWindow) {
      tooltipWindow.webContents.send('update-tooltip', '');
      tooltipWindow.hide();
    }
  });

  createTooltipWindow();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  createTooltipWindow();
});

app.on('window-all-closed', () => {
  if (require('electron-squirrel-startup')) {
    app.quit();
  }
});
