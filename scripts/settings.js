
/* Set Timer Type & Duration */


/* Set Timers */
// TO-DO=> timer select functionality;

/* Set Font Family */
/* TO-DO => review font select functionality */
/* TO-DO => update active font */

const container = document.querySelector('container');
let currentFont = '';

function updateFont(fontFamily) {
  currentFont = `font-${fontFamily}`;
}
/* Set Accent Color */
/* TO-DO => review color select functionality */
/* TO-DO => update active color */
const currentTimerType = document.getElementById('active-toggle');
const progressRingColor = document.getElementById('__time-progress-ring');
let currentAccentColor = '';
let currentProgressRingColor = '';


/* TO-DO => update active color buttonOptions.innerHTML = '✔️'*/
function updateAccentColor(accentColor) {
  currentProgressRingColor = accentColor;
  currentAccentColor = accentColor;
}
/* Apply Settings */
function applySettings() {
  container.className = currentFont;
  currentTimerType.className= 'btn';
  currentTimerType.classList.add(`${currentAccentColor}`)
  progressRingColor.className= currentAccentColor;
  closeSettingsModal();
}


/* Set Light/Dark Theme */
/* TO-DO => BONUS Light/Dark Theme functionality */
/* TO-DO => BONUS update active Light/Dark Theme */