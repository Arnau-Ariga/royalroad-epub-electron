let storyData = null;

async function fetchChapters() {
  const url = document.getElementById('urlInput').value;
  storyData = await window.electronAPI.fetchChapters(url);

  const list = document.getElementById('chapterList');
  list.innerHTML = '';
  storyData.chapters.forEach((chap, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" value="${index}"> ${chap.title}`;
    list.appendChild(li);
  });
}

async function generateEpub() {
  const checkboxes = document.querySelectorAll('#chapterList input:checked');
  const selectedIndexes = Array.from(checkboxes).map(cb => parseInt(cb.value));
  await window.electronAPI.generateEpub(storyData, selectedIndexes);
  alert('EPUB generated!');
}
