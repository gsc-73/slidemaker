const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api', {
  save: (o) => ipcRenderer.invoke('save', o),
  open: () => ipcRenderer.invoke('open')
});
