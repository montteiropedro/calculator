let html = document.querySelector('html');

const toggleTheme = document.querySelector('.toggle__body--theme');
const toggleThemeDot = document.querySelector('.toggle__dot');


toggleTheme.addEventListener('click', () => {
  if (html.attributes[1].value === '1') {
    html.dataset.theme = 2;
    toggleTheme.setAttribute('data-theme', '2');
  }
  else if (html.attributes[1].value === '2') {
    html.dataset.theme = 3;
    toggleTheme.setAttribute('data-theme', '3');
  }
  else if (html.attributes[1].value === '3') {
    html.dataset.theme = 1;
    toggleTheme.setAttribute('data-theme', '1');
  }
});
