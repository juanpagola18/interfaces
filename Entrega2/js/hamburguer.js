"use strict";
let icono = document.querySelector('.hamburguer');
let desplegable = document.querySelector('.scrolled_menu');

icono.addEventListener('click', () => {
    desplegable.classList.toggle('showHamburguer');
    
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


