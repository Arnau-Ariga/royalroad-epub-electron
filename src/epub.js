const fs = require('fs');
const path = require('path');
const Epub = require('epub-gen');
const { RoyalRoadAPI } = require('@fsoc/royalroadl-api');

async function generateEpub(fiction, chaptersMeta) {
  const api = new RoyalRoadAPI();
  const chapters = await Promise.all(
    chaptersMeta.map(ch => api.chapter.getChapter(ch.id))
  );

  const content = chapters.map((ch, i) => ({
    title: chaptersMeta[i].title,
    data: ch.data.content
  }));

  const option = {
    title: fiction.title,
    author: fiction.author.name,
    output: path.join(__dirname, '..', `${fiction.title}.epub`),
    content: content
  };

  await new Epub(option).promise;
}

module.exports = { generateEpub };
