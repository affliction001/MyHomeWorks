'use strict';

const colorsContainer = document.querySelector('#colorSwatch');
const sizesContainer = document.querySelector('#sizeSwatch');

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
      console.log(takeSizes());
    }
  });
  xhr.send();
}

function getCart() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://neto-api.herokuapp.com/cart');
  xhr.addEventListener('load', function () {
    console.log(JSON.parse(xhr.responseText));
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