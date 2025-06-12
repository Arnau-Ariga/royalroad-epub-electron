const { ipcMain } = require('electron');
const { RoyalRoadAPI } = require('@fsoc/royalroadl-api');
const { generateEpub } = require('./src/epub');

ipcMain.handle('generate-epub', async (event, url, selectedIndexes) => {
  const api = new RoyalRoadAPI();

  const match = url.match(/\/fiction\/(\d+)\//);
  const id = match ? match[1] : null;
  if (!id) throw new Error('Invalid URL');

  const { data } = await api.fiction.getFiction(id);
  if (selectedIndexes === null) return data;

  const selectedChapters = selectedIndexes.map(i => data.chapters[i]);
  await generateEpub(data, selectedChapters);
});
