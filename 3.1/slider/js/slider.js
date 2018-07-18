'use strict';

const slides = document.querySelector('.slides');

const next = document.querySelector('a[data-action=next]');
const prev = document.querySelector('a[data-action=prev]');
const first = document.querySelector('a[data-action=first]');
const last = document.querySelector('a[data-action=last]');

next.addEventListener('click', moveSlide);
prev.addEventListener('click', moveSlide);
first.addEventListener('click', moveSlide);
last.addEventListener('click', moveSlide);

slides.firstElementChild.classList.add('slide-current');
checkForDisable(slides.firstElementChild);

function moveSlide(event) {
  const currentSlide = slides.querySelector('.slide-current');
  let activatedSlide = null;

  switch (event.target.dataset.action) {
    case 'next':
      if (next.classList.contains('disabled')) {
        activatedSlide = currentSlide;
      } else {
        activatedSlide = currentSlide.nextElementSibling;
      }
      break;
    case 'prev':
      if (prev.classList.contains('disabled')) {
        activatedSlide = currentSlide;
      } else {
        activatedSlide = currentSlide.previousElementSibling;
      }
      break;
    case 'first':
      activatedSlide = slides.firstElementChild;
      break;
    case 'last':
      activatedSlide = slides.lastElementChild;
      break;
  }

  currentSlide.classList.remove('slide-current');
  activatedSlide.classList.add('slide-current');

  checkForDisable(activatedSlide);
}

function checkForDisable(element) {
  if (element.nextElementSibling) {
    if (next.classList.contains('disabled')) {
      next.classList.remove('disabled');
      last.classList.remove('disabled');
    }
  } else {
    next.classList.add('disabled');
    last.classList.add('disabled');
  }

  if (element.previousElementSibling) {
    if (prev.classList.contains('disabled')) {
      prev.classList.remove('disabled');
      first.classList.remove('disabled');
    }
  } else {
    prev.classList.add('disabled');
    first.classList.add('disabled');
  }
}