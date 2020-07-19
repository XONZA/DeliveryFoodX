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
const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const buttonClear = document.querySelector('.clear-cart');

let login = localStorage.getItem('authname');

const cart =  [];

const loadCart = function(){
    if(localStorage.getItem(login)){
      JSON.parse(localStorage.getItem(login)).forEach(function(item){
        cart.push(item);
      });
    }
  
}
const savecart = function(){
  localStorage.setItem(login, JSON.stringify(cart))
}

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
  cart.length = 0;
  login = null;
  buttonOut.removeEventListener('click', logOut)
  buttonAuth.style.display = '';
  userName.style.display = '';
  buttonOut.style.display = '';  
  cartButton.style.display = '';
  localStorage.removeItem('authname');
  checkAuth();
}

  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'flex';
  cartButton.style.display = 'flex';
  buttonOut.addEventListener('click', logOut)
  loadCart();
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
              <button class="button button-primary button-add-cart" id="${id}">
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

function addToCart(event){

  const target = event.target;
  const buttonAddToCart = target.closest('.button-add-cart');

  if(buttonAddToCart){
    const card = target.closest('.card');
    const title = card.querySelector('.card-title-reg').textContent;
    const cost = card.querySelector('.card-price-bold').textContent;
    const id = buttonAddToCart.id;

    const food = cart.find(function(item){
      return item.id === id;
    })

    if (food) {
      food.count += 1;
    } else {
      cart.push({ 
        id: id,
        title: title,
        cost: cost,
        count: 1
     });
    }
    
  }
  savecart();
}

function renderCart() {
  modalBody.textContent = '';

  cart.forEach(function ({id, title, cost, count}) {
    const ItemCart = `
                <div class="food-row">
                  <span class="food-name">${title}</span>
                  <strong class="food-price">${cost}</strong>
                  <div class="food-counter">
                    <button class="counter-button counter-minus" data-id="${id}">-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button counter-plus" data-id="${id}">+</button>
                  </div>
              </div>
    `;
    modalBody.insertAdjacentHTML('afterbegin', ItemCart);
    })

    const totalPrice = cart.reduce(function(result, item){
      return result + (parseFloat(item.cost) * item.count);
    },0);

    modalPrice.textContent = totalPrice + 'P';

  }

  function chengeCount(event){
    const target = event.target;



    if (target.classList.contains('counter-minus')){
        const food = cart.find(function(item){
          return item.id === target.dataset.id;
        });
        food.count--;
        if(food.count === 0){
          cart.splice(cart.indexOf(food),1);
        }
        renderCart();
    }

    if(target.classList.contains('counter-plus')){ 
      const food = cart.find(function(item){
        return item.id === target.dataset.id;
      });
      food.count++;
      renderCart();
    }
    savecart();
  }

  function init(){
getData('./db/partners.json').then(function(data){
  data.forEach(createCardRest)
});
new Swiper('.swiper-container',{
  loop: true,
  autoplay: true
})
modalBody.addEventListener('click', chengeCount);
cardsMenu.addEventListener('click', addToCart);
  checkAuth();
  cardRest.addEventListener('click', openGoods);
logo.addEventListener('click', function(){
  Promo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
})
buttonClear.addEventListener('click', function(){
  cart.length = 0;
  savecart();
  renderCart();
})
cartButton.addEventListener("click", function(){
  renderCart();
  toggleModal();
} );
close.addEventListener("click", toggleModal);
  }
  init();