
function showCreateUserModal(){
  var modalBackdrop = document.getElementById('modal-backdrop');
  var createUserModal = document.getElementById('create-user-modal');
  modalBackdrop.classList.remove('hidden');
  createUserModal.classList.remove('hidden');
}
function hideCreateUserModal(){
    var modalBackdrop = document.getElementById('modal-backdrop');
    var createUserModal = document.getElementById('create-user-modal');
    modalBackdrop.classList.add('hidden');
    createUserModal.classList.add('hidden');
}
function handleModalAcceptClick(){
    //do request thing
}
window.addEventListener('DOMContentLoaded', function () {

  var createUserButton = document.getElementById('create-user-button');
  if (createUserButton) {
    createUserButton.addEventListener('click', showCreateUserModal);
  }

  var modalCloseButton = document.querySelector('#create-user-modal .modal-close-button');
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', hideCreateUserModal);
  }

  var modalCancalButton = document.querySelector('#create-user-modal .modal-cancel-button');
  if (modalCancalButton) {
    modalCancalButton.addEventListener('click', hideCreateUserModal);
  }

  var modalAcceptButton = document.querySelector('#create-user-modal .modal-accept-button');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);
  }
});
