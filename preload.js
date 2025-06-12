const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  fetchChapters: (url) => ipcRenderer.invoke('fetch-chapters', url),
  generateEpub: (story, selectedIndexes) => ipcRenderer.invoke('generate-epub', story, selectedIndexes)
});
