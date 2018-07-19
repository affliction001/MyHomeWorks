'use strict';

const counterElement = document.getElementById('counter');

if (localStorage.counter) {
  counterElement.innerText = localStorage.counter;
} else {
  localStorage.counter = 0;
  counterElement.innerText = localStorage.counter;
}

document.getElementById('increment').addEventListener('click', function (e) {
  let value = +localStorage.counter;
  counterElement.innerText = ++value;
  localStorage.counter = value;
});

document.getElementById('decrement').addEventListener('click', function (e) {
  let value = +localStorage.counter;
  counterElement.innerText = --value;
  localStorage.counter = value;
});

document.getElementById('reset').addEventListener('click', function (e) {
  localStorage.counter = 0;
  counterElement.innerText = localStorage.counter;
});