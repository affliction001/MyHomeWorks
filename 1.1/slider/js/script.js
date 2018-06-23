'use strict';

let images = ['i/airmax.png',
              'i/airmax-jump.png',
              'i/airmax-on-foot.png',
              'i/airmax-playground.png',
              'i/airmax-top-view.png'];

let slider = document.getElementById('slider');
let counter = 0;

setInterval(() => {
  slider.src = images[counter];
  counter === 4 ? counter = 0 : counter++;
}, 5000);