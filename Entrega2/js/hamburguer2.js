let icono2 = document.querySelector('.hamburguer2');
let desplegable2 = document.querySelector('.scrolled_menu2');



icono2.addEventListener('click', () => {
    desplegable2.classList.toggle('showHamburguer');
    console.log("hola");
});