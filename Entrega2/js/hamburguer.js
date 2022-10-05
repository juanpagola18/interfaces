"use strict";
let icono = document.querySelector('.hamburguer');
let desplegable = document.querySelector('.scrolled_menu');

icono.addEventListener('click', () => {
    desplegable.classList.toggle('showHamburguer');
    
});