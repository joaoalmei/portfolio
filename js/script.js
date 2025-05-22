const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const userPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
let theme = localStorage.getItem('theme');

if (!theme) {
  theme = userPrefersLight ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
}

function updateThemeUI() {
  if (theme === 'light') {
    body.classList.add('light');
    themeToggle.textContent = 'Light Mode';
    themeToggle.classList.add('light-mode-active');
    themeToggle.classList.remove('dark-mode-active');
  } else {
    body.classList.remove('light');
    themeToggle.textContent = 'Dark Mode';
    themeToggle.classList.add('dark-mode-active');
    themeToggle.classList.remove('light-mode-active');
  }
}

themeToggle.addEventListener('click', () => {
  theme = theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  updateThemeUI();
});

const titles = ['João Almeida', 'João Almeida', 'João Almeida'];
const subtitles = [
  'Desenvolvedor Frontend',
  'Apaixonado por tecnologias',
  'Criando soluções que importam'
];

const typingSpeed = 120;
const erasingSpeed = 50;
const delayBetween = 2000;

const titleElement = document.getElementById('animated-title');
const subtitleElement = document.getElementById('subtitle');

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  if (!isDeleting && charIndex <= titles[titleIndex].length) {
    titleElement.textContent = titles[titleIndex].substring(0, charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else if (isDeleting && charIndex >= 0) {
    titleElement.textContent = titles[titleIndex].substring(0, charIndex);
    charIndex--;
    setTimeout(type, erasingSpeed);
  } else if (charIndex > titles[titleIndex].length) {
    setTimeout(() => {
      isDeleting = true;
      setTimeout(type, erasingSpeed);
    }, delayBetween);
  } else if (charIndex < 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    updateSubtitle();
    setTimeout(type, typingSpeed);
  }
}

function updateSubtitle() {
  subtitleElement.textContent = subtitles[titleIndex];
}

updateSubtitle();
type();
updateThemeUI();
