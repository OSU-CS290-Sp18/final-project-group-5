
function showCreateUserModal(){
  console.log('showing modal');
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
async function addUserToDB(username, secret, callback){
  var request = new XMLHttpRequest();
  var requestURL = '/addUser';
  request.open('POST', requestURL);
  var requestBody = JSON.stringify({
    username : username,
    secret : secret
  });
  request.addEventListener('load', function(event){
    console.log(event.target.status);
    if(event.target.status == 200){
      callback();
    }if(event.target.status == 400){
      callback('404');
    }
    else{
      callback('404');
    }
  });
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(requestBody);
}
function handleModalAcceptClick(){
  var username = document.getElementById('user-name-input').value;
  var secret = document.getElementById('user-secret-input').value;
  addUserToDB(username, secret, function(err){
    if(!err){
      window.location.replace('/feeds/' + username + '/' + secret);
    }
  });
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
