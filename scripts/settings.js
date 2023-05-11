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

  /* Set Font */
  for (const font of fontOptions) {
    if (font.checked) {
      selectedFont = font.value;
    }
  }

  /* Set Accent Color */
  for (const color of colorOptions) {
    if (color.checked) {
      selectedColor = color.value;
    }
  }
  updateRemainingTime();
  updateTimerUI();
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
};

/* Open Settings */
function openSettings() {
  modal.classList.remove('hidden');

  for (const font of fontOptions) {
    // TO-DO => add event listener
    const fontButton = document.getElementById(font.id);
    if (font.value === selectedFont) {
      fontButton.classList.add('active-font');
    } else {
      fontButton.classList.remove('active-font');
    }
  }

  for (const color of colorOptions) {
        // TO-DO => add event listener
    const colorButton = document.getElementById(color.id);
    if (color.value === selectedColor) {
      colorButton.classList.add('active-color');
    } else {
      colorButton.classList.remove('active-color');
    }
  }
}

openSettingsBtn.addEventListener('click', openSettings);

/* Close Settings */
const closeSettings = () => {
  modal.classList.add('hidden');
};

closeSettingsBtn.addEventListener('click', closeSettings);

/* close modal when the Esc key is pressed */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
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
