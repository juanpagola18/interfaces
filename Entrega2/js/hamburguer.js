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
    
    
    
},100);

increment(); 
