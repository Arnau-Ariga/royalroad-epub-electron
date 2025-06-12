async function fetchChapters() {
  const url = document.getElementById('url').value;
  const res = await window.electronAPI.generateEPUB(url, null); // get metadata only
  const chapters = res.chapters;

  const list = document.getElementById('chapterList');
  list.innerHTML = '';

  chapters.forEach((ch, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" value="${idx}" /> ${ch.title}`;
    list.appendChild(li);
  });
}

async function createEPUB() {
  const url = document.getElementById('url').value;
  const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
  const selectedIndexes = Array.from(checkboxes).map(cb => parseInt(cb.value));

  await window.electronAPI.generateEPUB(url, selectedIndexes);
  alert('EPUB created!');
}
