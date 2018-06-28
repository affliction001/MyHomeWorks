'use strict';

const dropdownMenu = document.getElementsByClassName('wrapper-dropdown');

dropdownMenu[0].onclick = () => {
  dropdownMenu[0].classList.contains('active') ?
    dropdownMenu[0].classList.remove('active') :
    dropdownMenu[0].classList.add('active');
}