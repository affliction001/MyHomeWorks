'use strict';

const slides = document.querySelector('.slides');

const next = document.querySelector('a[data-action=next]');
const prev = document.querySelector('a[data-action=prev]');
const first = document.querySelector('a[data-action=first]');
const last = document.querySelector('a[data-action=last]');

next.addEventListener('click', moveForward);
prev.addEventListener('click', moveBack);
first.addEventListener('click', moveToFirst);
last.addEventListener('click', moveToLast);

slides.firstElementChild.classList.add('slide-current');
checkForDisable(slides.firstElementChild);

function moveSlide(step) {
  const currentSlide = slides.querySelector('.slide-current');
  let activatedSlide = null;

  switch (step) {
    case 'next':
      activatedSlide = currentSlide.nextElementSibling;
      break;
    case 'prev':
      activatedSlide = currentSlide.previousElementSibling;
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

function moveForward() {
  moveSlide('next');
}

function moveBack() {
  moveSlide('prev');
}

function moveToFirst() {
  moveSlide('first');
}

function moveToLast() {
  moveSlide('last');
}

function checkForDisable(element) {
  if (element.nextElementSibling) {
    if (next.classList.contains('disabled')) {
      next.classList.remove('disabled');
      next.addEventListener('click', moveForward);
      last.classList.remove('disabled');
      last.addEventListener('click', moveToLast);
    }
  } else {
    next.classList.add('disabled');
    next.removeEventListener('click', moveForward);
    last.classList.add('disabled');
    last.removeEventListener('click', moveToLast);
  }

  if (element.previousElementSibling) {
    if (prev.classList.contains('disabled')) {
      prev.classList.remove('disabled');
      prev.addEventListener('click', moveBack);
      first.classList.remove('disabled');
      first.addEventListener('click', moveToFirst);
    }
  } else {
    prev.classList.add('disabled');
    prev.removeEventListener('click', moveBack);
    first.classList.add('disabled');
    first.removeEventListener('click', moveToFirst);
  }
}