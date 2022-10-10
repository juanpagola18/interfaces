"use strict";
let icono = document.querySelector('.hamburguer');
let desplegable = document.querySelector('.scrolled_menu');
let ulImg = document.querySelectorAll('.li-gallery');


icono.addEventListener('click', () => {
    desplegable.classList.toggle('showHamburguer');
    
});

let icono2 = document.querySelector('.hamburguer2');
let desplegable2 = document.querySelector('.scrolled_menu2');



icono2.addEventListener('click', () => {
    desplegable2.classList.toggle('showHamburguer');
    console.log("hola");
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



