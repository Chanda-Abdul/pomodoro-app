const modal = document.querySelector('.settings__modal');
const openSettingsBtn = document.querySelector('.btn-settings');
const closeSettingsBtn = document.querySelector('.btn-close');
const applySettingsBtn = document.querySelector('.btn-apply');

const body = document.getElementById('body');
const fontOptions = document.querySelectorAll('input[name="font-options"]');
const colorOptions = document.querySelectorAll('input[name="color-options"]');


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

// console.log(body, font-options,  color-options );

/* Open Settings */
const openSettings = () => {
  modal.classList.remove('hidden');

  for (const font of font-options) {
   
    if (font.value === selectedFont) {
    
const fontButton = document.getElementById(font.id);
fontButton.classList.add('active-font')
  // console.log(fontButton)      
  // selectedFont = font.value;
    }
  }
  // body.classList.add(selectedFont);


  for (const color of color-options) {
    // console.log(color)
    if (color.checked) {
      // console.log(color)
      // selectedColor = color.value;
    }
  }
  // body.classList.add(selectedColor);
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

 
  for (const font of fontOptions) {
    if (font.checked) {
      selectedFont = font.value;
    }
  }
  body.classList.add(selectedFont);


  for (const color of colorOptions) {
    // console.log(color)
    if (color.checked) {
      selectedColor = color.value;
    }
  }
  body.classList.add(selectedColor);

  closeSettings();
}

/* Set Timer Type & Duration */

/* Set Timers */
// TO-DO=> timer select functionality;

/* TO-DO => update active color buttonOptions.innerHTML = '✔️'*/
// function updateAccentColor(accentColor) {
//   currentProgressRingColor = accentColor;
//   currentAccentColor = accentColor;
// }

/* Set Light/Dark Theme */
/* TO-DO => BONUS Light/Dark Theme functionality */
/* TO-DO => BONUS update active Light/Dark Theme */
