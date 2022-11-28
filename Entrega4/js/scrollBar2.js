let icono2 = document.querySelector('.hamburguer2');
let desplegable2 = document.querySelector('.scrolled_menu2');
let nav = document.querySelector('.head');
let logo = document.querySelector('#img_logo');


icono2.addEventListener('click', () => {
    desplegable2.classList.toggle('showHamburguer');
    
});


window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.documentElement.scrollTop > 50) {
    nav.className = "sticky";
    logo.className = "sizeLogo"
  } else {
    nav.className = "normal";
    logo.className = "";
  }
}