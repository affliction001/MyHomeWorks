'use strict';

const cart = document.querySelector('.add-to-cart');

list.addEventListener('click', function(event) {
  event.preventDefault();
  if (event.target.classList.contains('add-to-cart')) {
    addToCart({title: event.target.dataset.title, price: event.target.dataset.price});
  }
});