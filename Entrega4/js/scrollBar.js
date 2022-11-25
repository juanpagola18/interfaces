"use strict";
let icono = document.querySelector('.hamburguer');
let hamburguer = document.querySelector('.hamburguer-icon')
let desplegable = document.querySelector('.scrolled_menu');
let ulImg = document.querySelectorAll('.li-gallery');
let imageClose = document.querySelector('.close-icon')
let menu1 = document.querySelector('#menu--1');
let menu2 = document.querySelector('#menu--2');
let menu3 = document.querySelector('#menu--3');
let menu4 = document.querySelector('#menu--4');
let menu5 = document.querySelector('#menu--5');
let menu6 = document.querySelector('#menu--6');



icono.addEventListener('click', () => {
    desplegable.classList.toggle('showHamburguer');
    hamburguer.classList.toggle('notShow');
    hamburguer.classList.add('showX');
    imageClose.classList.toggle('notShow');
    imageClose.classList.add('showX');
    menu1.classList.toggle('showMenu1');
    menu2.classList.toggle('showMenu2');
    menu3.classList.toggle('showMenu3');
    menu4.classList.toggle('showMenu4');
    menu5.classList.toggle('showMenu5');
    menu6.classList.toggle('showMenu6');
});



let numero = document.getElementById("percent");
let i = 1;


setInterval(function increment(){
   if(i <=100){
    numero.innerHTML = i+"%";
    i++;
    }
    
    
    
},50);

let carga = document.querySelector('.show');

setTimeout(function desapear(){
    carga.classList.remove('show');
    carga.classList.remove('loading');
    carga.classList.add('notShow');
},5000);

let btn = document.querySelector('.preOrder');
let payment = document.querySelector('.payment_page');
let closePayment = document.querySelector('#closePayment');
let content_ufc = document.querySelector('.content_ufc');

closePayment.addEventListener('click', () => {
    payment.classList.toggle('showPayment');
    
});

btn.addEventListener('click', () => {
    content_ufc.classList.toggle('borroneado');
    payment.classList.toggle('showPayment');

     
});
function myFunction() {
    if (document.documentElement.scrollTop > 50) {
      nav.className = "sticky";
      logo.className = "sizeLogo"
    } else {
      nav.className = "normal";
      logo.className = "";
    }
  }
