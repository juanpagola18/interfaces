let logo = document.querySelector('#img_logo');
let nav = document.querySelector('.head');


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