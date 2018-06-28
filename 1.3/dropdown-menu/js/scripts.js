'use strict';

const dropdownMenu = document.getElementsByClassName('wrapper-dropdown');

dropdownMenu[0].onclick = () => {
  dropdownMenu[0].classList.toggle('active');
}