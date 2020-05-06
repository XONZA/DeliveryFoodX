'use strict';
////
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardRest = document.querySelector('.cards-restaurants');
const Promo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
let login = localStorage.getItem('authname');


function toggleModal() {
  modal.classList.toggle("is-open");
}

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

function createCardRest(){

  const card = `
        <a  class="card card-restaurant">
        <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title">Тануки</h3>
            <span class="card-tag tag">60 мин</span>
          </div>
          <div class="card-info">
            <div class="rating">
              4.5
            </div>
            <div class="price">От 1 200 ₽</div>
            <div class="category">Суши, роллы</div>
          </div>
        </div>
      </a>
`
  cardRest.insertAdjacentHTML('afterbegin',card);
}

function createCardGood(){
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
          <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
          <div class="card-text">
            <div class="card-heading">
              <h3 class="card-title card-title-reg">Пицца Классика</h3>
            </div>
            <div class="card-info">
              <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
                грибы.
              </div>
            </div>
            <div class="card-buttons">
              <button class="button button-primary button-add-cart">
                <span class="button-card-text">В корзину</span>
                <span class="button-cart-svg"></span>
              </button>
              <strong class="card-price-bold">510 ₽</strong>
            </div>
          </div>
  `);
  cardsMenu.insertAdjacentElement('beforeend',card);
}

function openGoods(event) {
 const target = event.target;
 const resta = target.closest('.card-restaurant');

 if(resta && login){
cardsMenu.textContent = '';
  Promo.classList.add('hide');
  restaurants.classList.add('hide');
  menu.classList.remove('hide');
  createCardGood();
 }
 else{
   toogleModalAuth();
 }
  }



  checkAuth();
  createCardRest();
  cardRest.addEventListener('click', openGoods);
logo.addEventListener('click', function(){
  Promo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
})
cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
