const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadUrl: (url) => ipcRenderer.send('load-url', url),
  onNavigateToApp: (callback) => ipcRenderer.on('navigate-to-app', callback),
  showTooltip: ({ x, y, text }) =>
    ipcRenderer.send('show-tooltip', { x, y, text }),
  hideTooltip: () => ipcRenderer.send('hide-tooltip'),
  showModal: () => ipcRenderer.send('show-modal'),
  closeModal: () => ipcRenderer.send('close-modal'),
});
