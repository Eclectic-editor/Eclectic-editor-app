const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadUrl: (url) => ipcRenderer.send('load-url', url),
  showModal: () => ipcRenderer.send('show-modal'),
  closeModal: () => ipcRenderer.send('close-modal'),
  elementClicked: (elementInfo) =>
    ipcRenderer.send('element-clicked', elementInfo),
  applyStyle: (style) => ipcRenderer.send('apply-style', style),
  reportScroll: (sourceIndex, scrollX, scrollY) => {
    ipcRenderer.send('reportScroll', sourceIndex, scrollX, scrollY);
  },
  onSyncScroll: (callback) => {
    ipcRenderer.on('sync-scroll', (event, scrollX, scrollY) => {
      callback(scrollX, scrollY);
    });
  },
  syncScrollComplete: (viewIndex) => {
    ipcRenderer.send('syncScrollComplete', viewIndex);
  },
  removeSyncScrollListener: (callback) => {
    ipcRenderer.removeListener('sync-scroll', callback);
  },
  tiltViews: () => ipcRenderer.send('tiltViews'),
  updateResolutions: (resolutions) =>
    ipcRenderer.send('update-resolutions', resolutions),
  setResolution: (resolution) => ipcRenderer.send('setResolution', resolution),
  enableMultiViewMode: () => ipcRenderer.send('enableMultiViewMode'),
  saveDocument: (content) => ipcRenderer.send('saveDocument', content),
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  removeListener: (channel, func) => {
    ipcRenderer.removeListener(channel, func);
  },
});
