'use strict';

const secretCode = ['KeyY','KeyT','KeyN','KeyJ','KeyK','KeyJ','KeyU','KeyB','KeyZ'];
let unlockStatus = 0;

function showNavBar(event) {
  if (!event.ctrlKey) {
    return;
  }

  if (!event.altKey) {
    return;
  }

  if (event.code === 'KeyT') {
    document.getElementsByTagName('nav')[0].classList.toggle('visible');
  }
}

function findEasterEgg(event) {
  if (event.code === secretCode[unlockStatus]) {
    unlockStatus++;

    if (unlockStatus === secretCode.length) {
      document.getElementsByClassName('secret')[0].classList.toggle('visible');
    }
  } else {
    event.code === secretCode[0] ? unlockStatus = 1 : unlockStatus = 0;
  }
}

document.addEventListener('keydown', showNavBar);
document.addEventListener('keydown', findEasterEgg);