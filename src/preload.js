const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadUrl: (url) => ipcRenderer.send('load-url', url),
  showModal: () => ipcRenderer.send('show-modal'),
  closeModal: () => ipcRenderer.send('close-modal'),
  elementClicked: (elementInfo) =>
    ipcRenderer.send('element-clicked', elementInfo),
  applyStyle: (style) => ipcRenderer.send('apply-style', style),
  toggleMultiView: () => ipcRenderer.send('toggleMultiViews'),
  syncScroll: (sourceIndex, scrollPos) => {
    if (typeof scrollPos.x === 'number' && typeof scrollPos.y === 'number') {
      ipcRenderer.send('syncScroll', sourceIndex, scrollPos);
    }
  },
  tiltViews: () => ipcRenderer.send('tiltViews'),
  updateResolutions: (resolutions) =>
    ipcRenderer.send('update-resolutions', resolutions),
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  removeListener: (channel, func) => {
    ipcRenderer.removeListener(channel, func);
  },
});
