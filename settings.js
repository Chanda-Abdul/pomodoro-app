/* Modal Open/Close */
let closeSettingsBtn = document.querySelector('.close-btn');
let openSettingsBtn = document.querySelector('.btn-settings');
let modal = document.getElementById('modal');

function closeSettingsModal() {
  openSettingsBtn.classList.remove('hide');
  openSettingsBtn.classList.add('show');
  modal.className = 'hide';
}

function openSettingsModal() {
  openSettingsBtn.classList.remove('show');
  openSettingsBtn.classList.add('hide');
  modal.className = 'show';
}

/* Set Timer Type & Duration */

/* Set Font Family */
const body = document.querySelector('body');
let currentFont = '';

function updateFont(fontFamily) {
  currentFont = `font-${fontFamily}`;
}
/* Set Accent Color */

/* Apply Settings */
function applySettings() {
  body.className = currentFont;
  closeSettingsModal();
}
