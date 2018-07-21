'use strict';

const colorsContainer = document.querySelector('#colorSwatch');
const sizesContainer = document.querySelector('#sizeSwatch');
const cartContainer = document.querySelector('#quick-cart');

getColors();
getSizes();
getCart();

function getColors() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
  xhr.addEventListener('load', function () {
    if (!localStorage.colors) {
      saveColors(xhr.responseText);
    } else {
      let nodes = '';
      const colors = takeColors();

      colors.forEach((color) => {
        nodes += createColorNode(color.title, color.type, color.code, color.isAvailable);
      });

      colorsContainer.innerHTML = nodes;
    }
  });
  xhr.send();
}

function getSizes() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
  xhr.addEventListener('load', function () {
    if (!localStorage.sizes) {
      saveSizes(xhr.responseText);
    } else {
      let nodes = '';
      const sizes = takeSizes();

      sizes.forEach((size) => {
        nodes += createSizeNode(size.title, size.type, size.isAvailable);
      });

      sizesContainer.innerHTML = nodes;
    }
  });
  xhr.send();
}

function getCart() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://neto-api.herokuapp.com/cart');
  xhr.addEventListener('load', function () {
    const cart = JSON.parse(xhr.responseText);

    if (cart.error) {
      console.log(cart.message);
    } else {
      if (cart.length === 0) {
        cartContainer.innerHTML = createSnippetCartNode(0, false);
      } else {
        let nodes = '';
        let allPrice = 0;

        Array.from(cart).forEach(product => {
          nodes += createSnippetProductNode(product.id, product.pic, product.title, product.quantity, product.price);
          allPrice += +product.price * +product.quantity;
        });

        nodes += createSnippetCartNode(allPrice, true);
        cartContainer.innerHTML = nodes;
      }
    }

    deleteProductFromCart();
  });
  xhr.send();
}

function saveColors(colors) {
  localStorage.colors = colors;
}

function takeColors() {
  try {
    return JSON.parse(localStorage.getItem('colors'));
  } catch (e) {
    return null;
  }
}

function saveSizes(sizes) {
  localStorage.sizes = sizes;
}

function takeSizes() {
  try {
    return JSON.parse(localStorage.getItem('sizes'));
  } catch (e) {
    return null;
  }
}

function createColorNode(title, type, code, isAvailable) {
  const available = isAvailable ? 'available' : 'soldout';
  const disabled = isAvailable ? '' : 'disabled';

  let node =
   `<div data-value="${type}" class="swatch-element color ${type} ${available}">
      <div class="tooltip">${title}</div>
      <input quickbeam="color" id="swatch-1-${type}" type="radio" name="color" value="${type}" ${disabled}>
      <label for="swatch-1-${type}" style="border-color: red;">
        <span style="background-color: ${code};"></span>
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    </div>`;

  return node;
}

function createSizeNode(title, type, isAvailable) {
  const available = isAvailable ? 'available' : 'soldout';
  const disabled = isAvailable ? '' : 'disabled';

  let node =
    `<div data-value="${type}" class="swatch-element plain ${type} ${available}">
      <input id="swatch-0-${type}" type="radio" name="size" value="${type}" ${disabled}>
      <label for="swatch-0-${type}">
        ${title}
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    </div>`;

  return node;
}

function createSnippetProductNode(id, pic, title, quantity, price) {
  let node =
   `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${id}" style="opacity: 1;">
      <div class="quick-cart-product-wrap">
        <img src="${pic}" title="${title}">
        <span class="s1" style="background-color: #000; opacity: .5">$${price}</span>
        <span class="s2"></span>
      </div>
      <span class="count hide fadeUp" id="quick-cart-product-count-${id}">${quantity}</span>
      <span class="quick-cart-product-remove remove" data-id="${id}"></span>
    </div>`;

  return node;
}

function createSnippetCartNode(allPrice, isOpen) {
  let open = isOpen ? 'open' : '';

  let node =
   `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${open}">
      <span>
        <strong class="quick-cart-text">Оформить заказ<br></strong>
        <span id="quick-cart-price">$${allPrice}</span>
      </span>
    </a>`;

  return node;
}

function deleteProductFromCart() {
  const removeButton = document.querySelector('#quick-cart .remove');

  removeButton.addEventListener('click', function(e) {
    const removeProduct = {};
    removeProduct.productId = e.target.dataset.id;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', function(e) {
      console.log(JSON.parse(xhr.responseText));
    });
    xhr.send(JSON.stringify(removeProduct));
  });
}