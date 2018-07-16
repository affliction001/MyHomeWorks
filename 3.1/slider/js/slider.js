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

function checkForDisable(element) {
  if (element.nextElementSibling) {
    if (next.classList.contains('disabled')) {
      next.classList.remove('disabled');
      next.addEventListener('click', moveSlide);
      last.classList.remove('disabled');
      last.addEventListener('click', moveSlide);
    }
  } else {
    next.classList.add('disabled');
    next.removeEventListener('click', moveSlide);
    last.classList.add('disabled');
    last.removeEventListener('click', moveSlide);
  }

  if (element.previousElementSibling) {
    if (prev.classList.contains('disabled')) {
      prev.classList.remove('disabled');
      prev.addEventListener('click', moveSlide);
      first.classList.remove('disabled');
      first.addEventListener('click', moveSlide);
    }
  } else {
    prev.classList.add('disabled');
    prev.removeEventListener('click', moveSlide);
    first.classList.add('disabled');
    first.removeEventListener('click', moveSlide);
  }
}