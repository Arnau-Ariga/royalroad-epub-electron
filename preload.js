const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  generateEPUB: (url, selectedChapters) => ipcRenderer.invoke('generate-epub', url, selectedChapters)
});
