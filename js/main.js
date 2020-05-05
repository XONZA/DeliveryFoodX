const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");



cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
let login = localStorage.getItem('authname');

function toogleModalAuth(){
modalAuth.classList.toggle('is-open');
}



function autorizered(){
console.log("AUTH");

function logOut(){
  login = null;
  buttonOut.removeEventListener('click', logOut)
  buttonAuth.style.display = '';
  userName.style.display = '';
  buttonOut.style.display = '';  
  localStorage.removeItem('authname');
  checkAuth();
}

  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut)
}

function notAuthorized(){
console.log("NOT AUTH");

  function logIn(event) {
    event.preventDefault();
     login = loginInput.value;
      if(login == ''){
        alert("Введите логин и пароль!");
      }
      else{
     localStorage.setItem('authname', login);
     console.log(login);
     toogleModalAuth();
     buttonAuth.removeEventListener('click', toogleModalAuth);
     closeAuth.removeEventListener('click', toogleModalAuth);
     loginForm.removeEventListener('submit', logIn);
     loginForm.reset();
     checkAuth();
      }
    }

  buttonAuth.addEventListener('click', toogleModalAuth);
  closeAuth.addEventListener('click', toogleModalAuth);
  loginForm.addEventListener('submit', logIn);
}

function checkAuth(){

if (login) {
  autorizered();
}
else {
  notAuthorized();
}

}

checkAuth();
