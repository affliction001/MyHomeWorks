'use strict';

let images = ['./i/breuer-building.jpg',
              './i/guggenheim-museum.jpg',
              './i/headquarters.jpg',
              './i/IAC.jpg',
              './i/new-museum.jpg'];

let prev = document.getElementById('prevPhoto');
let next = document.getElementById('nextPhoto');

let photo = document.getElementById('currentPhoto');
photo.src = images[0];

let counter = 0;

function handlerPrev() {
  counter === 0 ? counter = (images.length - 1) : counter--;
  photo.src = images[counter];
}

function handlerNext() {
  counter === (images.length - 1) ? counter = 0 : counter++;
  photo.src = images[counter];
}

prev.onclick = handlerPrev;
next.onclick = handlerNext;