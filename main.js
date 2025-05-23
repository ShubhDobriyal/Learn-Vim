const chapterNav = document.getElementById('chapters-navigation');
const contentEl = document.getElementById('content');
const totalChapters = 29; // If you have chapters 0–29
const chaptersDir = './chapters/';
let currentChapter = 0;   // Start at chapter 0

function createChapterNav() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i <= totalChapters; i++) {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = `Chapter ${i}`;
    link.href = "#";
    link.dataset.chapter = i;
    link.addEventListener('click', handleChapterClick);
    listItem.appendChild(link);
    fragment.appendChild(listItem);
  }
  chapterNav.appendChild(fragment);
}

function handleChapterClick(e) {
  e.preventDefault();
  const chapterNum = Number(this.dataset.chapter);
  if (chapterNum !== currentChapter) {
    loadChapter(chapterNum);
  }
}

function setActiveChapter(chapterNum) {
  const links = chapterNav.querySelectorAll('a');
  links.forEach(link => {
    if (Number(link.dataset.chapter) === chapterNum) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

function loadMarkdown(file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("File not found");
      return response.text();
    })
    .then(md => {
      const converter = new showdown.Converter();
      contentEl.innerHTML = converter.makeHtml(md);
    })
    .catch(() => {
      contentEl.innerHTML = `<p>Chapter not found.</p>`;
    });
}

function loadChapter(chapterNum) {
  currentChapter = chapterNum;
  setActiveChapter(chapterNum);
  loadMarkdown(`${chaptersDir}chapter${chapterNum}.md`);
}

// Initialize navigation and load Chapter 0 by default
createChapterNav();
loadChapter(currentChapter);
