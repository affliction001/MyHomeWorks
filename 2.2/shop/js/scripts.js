'use strict';

function init() {
  const buttons = document.querySelectorAll('button.add');
  const cartCount = document.querySelector('span#cart-count');
  const cartTotalPrice = document.querySelector('span#cart-total-price');

  Array.from(buttons).forEach((button) => {
    let price = button.dataset.price;

    button.addEventListener('click', () => {
      cartCount.innerHTML = +cartCount.innerHTML + 1;
      cartTotalPrice.innerHTML = getPriceFormatted(+price + +cartTotalPrice.innerHTML.replace(/\s*/g, ''));
    });
  });
}

document.addEventListener('DOMContentLoaded', init);