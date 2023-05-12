const modal = document.getElementById('settings');
const openSettingsBtn = document.getElementById('btn-open');
const closeSettingsBtn = document.querySelector('.btn-close');
const applySettingsBtn = document.querySelector('.btn-apply');

const body = document.getElementById('body');
const fontOptions = document.querySelectorAll('input[name="font-options"]');
const colorOptions = document.querySelectorAll('input[name="color-options"]');

function getSettings() {
  /* Set Timer Type & Duration */
  numberOfPomodoros = document.getElementById('pomodoro');
  shortBreakLength = document.getElementById('short-break');
  longBreakLength = document.getElementById('long-break');

  timer.settings.pomodorosRemainingUntilLongBreak = +numberOfPomodoros.value;
  timer.settings.shortBreak = +shortBreakLength.value;
  timer.settings.longBreak = +longBreakLength.value;

  updateRemainingTime();
  updateTimerUI();
}

fontOptions.forEach((font) => {
  /* Set Font */
  font.addEventListener('change', (e) => {
    selectedFont = e.target.value;
    updateFont();
  });
});

function updateFont() {
  fontOptions.forEach((font) => {
    selectedFont === font.value
      ? (font.checked = true)
      : (font.checked = false);
  });
}

colorOptions.forEach((color) => {
  /* Set Accent Color */
  color.addEventListener('change', (e) => {
    selectedColor = e.target.value;
    updateAccentColor();
  });
});

function updateAccentColor() {
  colorOptions.forEach((color) => {
    selectedColor === color.value
      ? (color.checked = true)
      : (color.checked = false);
  });
}
let selectedFont = 'theme-sans';
let selectedColor = 'theme-peach';

window.onload = function () {
  setInitialStyles();
};

const setInitialStyles = () => {
  /* set Kumbh Sans as font and peach as accent color on page load */
  body.className = '';
  body.classList.add(selectedFont);
  body.classList.add(selectedColor);
  updateFont();
  updateAccentColor();
};

openSettingsBtn.addEventListener('click', () => {
  modal.classList.add('show');
});

const closeSettings = () => {
  modal.classList.remove('show');
};

closeSettingsBtn.addEventListener('click', closeSettings);

document.addEventListener('keydown', function (e) {
  /* close modal when the Esc key is pressed */ if (
    e.key === 'Escape' &&
    modal.classList.contains('show')
  ) {
    closeSettings();
  }
});

/* Apply Settings */
function applySettings() {
  getSettings();
  body.className = '';
  body.classList.add(selectedFont);
  body.classList.add(selectedColor);
  closeSettings();
}

/* Set Light/Dark Theme */
/* TO-DO => BONUS Light/Dark Theme functionality */
/* TO-DO => BONUS update active Light/Dark Theme */
