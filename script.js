let closeSettingsBtn = document.querySelector('.close-btn');
let openSettingsBtn = document.querySelector('.btn-settings');
let modal = document.getElementById('modal');

closeSettingsBtn.addEventListener('click', function () {
  modal.classList.remove('show');
  modal.classList.add('hide');
});

openSettingsBtn.addEventListener('click', function () {
  modal.classList.remove('hide');
  modal.classList.add('show');
});
