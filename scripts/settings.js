const modal = document.querySelector('.settings__modal');
const openSettingsBtn = document.querySelector('.btn-settings');
const closeSettingsBtn = document.querySelector('.btn-close');
const applySettingsBtn = document.querySelector('.btn-apply');

const body = document.getElementById('body');
const fontOptions = document.querySelectorAll('input[name="fontOptions"]');
const colorOptions = document.querySelectorAll('input[name="colorOptions"]');

// console.log(body, fontOptions,  colorOptions );

/* Open Settings */
const openSettings = () => {
  modal.classList.remove('hidden');
};

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
  body.className = '';

  let selectedFont = '';
  for (const font of fontOptions) {
    if (font.checked) {
      selectedFont = font.value;
      // break;
    }
  }
  body.classList.add(selectedFont);

  let selectedColor = '';
  for (const color of colorOptions) {
    if (color.checked) {
      selectedColor = color.value;
      // break;
    }
  }

  body.classList.add(selectedColor);
  // console.log(body, fontOptions, selectedFont, colorOptions, selectedColor );

  closeSettings();
}

/* Set Timer Type & Duration */

/* Set Timers */
// TO-DO=> timer select functionality;

/* TO-DO => update active color buttonOptions.innerHTML = '✔️'*/
function updateAccentColor(accentColor) {
  currentProgressRingColor = accentColor;
  currentAccentColor = accentColor;
}

/* Set Light/Dark Theme */
/* TO-DO => BONUS Light/Dark Theme functionality */
/* TO-DO => BONUS update active Light/Dark Theme */
