const clickAudio = new Audio('../audios/click-audio.mp3');

const toggleSound = document.querySelector('.toggle__body--sound');
// const toggleSoundDot = document.querySelector('.toggle__dot');

const buttonsAudio = document.querySelectorAll('.buttons>button');

const toggleThemeAudio = document.querySelector('.toggle__body--theme');

toggleSound.addEventListener('click', () => {
  toggleSound.toggleAttribute('enabled');

  if (toggleSound.hasAttribute('enabled')) return;

  clickAudio.load();
  clickAudio.play();
});

toggleThemeAudio.addEventListener('click', () => {
  if (!toggleSound.hasAttribute('enabled')) return;

  clickAudio.load();
  clickAudio.play();
});

buttonsAudio.forEach(button => {
  button.addEventListener('click', () => {
    if (!toggleSound.hasAttribute('enabled')) return;

    clickAudio.load();
    clickAudio.play();
  });
});
