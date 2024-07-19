const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadUrl: (url) => ipcRenderer.send('load-url', url),
  onNavigateToApp: (callback) => ipcRenderer.on('navigate-to-app', callback),
  showModal: () => ipcRenderer.send('show-modal'),
  closeModal: () => ipcRenderer.send('close-modal'),
  elementClicked: (elementInfo) =>
    ipcRenderer.send('element-clicked', elementInfo),
  applyStyle: (style) => ipcRenderer.send('apply-style', style),
  generateUUID: () => ipcRenderer.invoke('generate-uuid'),
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  removeListener: (channel, func) => {
    ipcRenderer.removeListener(channel, func);
  },
});
