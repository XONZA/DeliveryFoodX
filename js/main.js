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
const sectionHeading = document.querySelector('.menu-title');

let login = localStorage.getItem('authname');

const getData = async function(url){

  const response = await fetch(url);

  if(!response.ok){
    throw new Error(`EROR ADRESS ${url}.
     status ${response.status}!`);
  }

  return await response.json();
  
};

const toggleModal = function() {
  modal.classList.toggle("is-open");
};

const toogleModalAuth = function(){
modalAuth.classList.toggle('is-open');
};

const autorizered = function(){
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
};

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

function createCardRest(rest){

const { image, kitchen, name, price, stars, products, time_of_delivery } = rest;

  const card = `
        <a  class="card card-restaurant" data-products="${products}"
        data-info="${[name, price, stars, kitchen ]}"
        >
        <img src="${image}" alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title">${name}</h3>
            <span class="card-tag tag">${time_of_delivery} мин</span>
          </div>
          <div class="card-info">
            <div class="rating">
              ${stars}
            </div>
            <div class="price">От ${price} ₽</div>
            <div class="category">${kitchen}</div>
          </div>
        </div>
      </a>
`
  cardRest.insertAdjacentHTML('afterbegin',card);
}

function createCardGood(goods){

const { description, id, image, name, price } = goods;

  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
          <img src="${image}" alt="image" class="card-image"/>
          <div class="card-text">
            <div class="card-heading">
              <h3 class="card-title card-title-reg">${name}</h3>
            </div>
            <div class="card-info">
              <div class="ingredients">${description}
              </div>
            </div>
            <div class="card-buttons">
              <button class="button button-primary button-add-cart">
                <span class="button-card-text">В корзину</span>
                <span class="button-cart-svg"></span>
              </button>
              <strong class="card-price-bold">${price} ₽</strong>
            </div>
          </div>
  `);
  cardsMenu.insertAdjacentElement('beforeend',card);


}

function  createTitleMenu(info = []) {
  
const title = `
            <h2 class="section-title restaurant-title">${info[0]}</h2>
            <div class="card-info">
              <div class="rating">
                ${info[2]}
              </div>
              <div class="price">От ${info[1]} ₽</div>
              <div class="category">${info[3]}</div>

`

sectionHeading.insertAdjacentHTML('afterbegin', title);
  }

function openGoods(event) {
 const target = event.target;
 console.log(target);
 const resta = target.closest('.card-restaurant');

 if(resta && login){

  sectionHeading.textContent = '';
cardsMenu.textContent = '';
  Promo.classList.add('hide');
  restaurants.classList.add('hide');
  menu.classList.remove('hide');
  createTitleMenu(resta.dataset.info.split(','));
  getData(`./db/${resta.dataset.products}`).then(function(data){
    data.forEach(createCardGood)
  });
 }
 else{
   toogleModalAuth();
 }
  }

  function init(){
getData('./db/partners.json').then(function(data){
  data.forEach(createCardRest)
});

  checkAuth();
  cardRest.addEventListener('click', openGoods);
logo.addEventListener('click', function(){
  Promo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
})
cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
  }
  init();