'use strict';

const sounds = ['first.mp3', 'second.mp3', 'third.mp3', 'fourth.mp3', 'fifth.mp3'];

const piano = document.getElementsByClassName('set');
const keys = document.getElementsByTagName('li');

document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'Shift':
      piano[0].classList.remove('middle');
      piano[0].classList.add('lower');
      break;
    case 'Alt':
      piano[0].classList.remove('middle');
      piano[0].classList.add('higher');
      break;
  }
});

document.addEventListener('keyup', event => {
  switch (event.key) {
    case 'Shift':
      piano[0].classList.remove('lower');
      piano[0].classList.add('middle');
      break;
    case 'Alt':
      piano[0].classList.remove('higher');
      piano[0].classList.add('middle');
      break;
  }
});

for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener('click', event => {
    const player = event.currentTarget.getElementsByTagName('audio');
    let tone = '';

    if (piano[0].classList.contains('middle')) {
      tone = 'middle';
    } else if (piano[0].classList.contains('lower')) {
      tone = 'lower';
    } else if (piano[0].classList.contains('higher')) {
      tone = 'higher';
    }

    player[0].src = `./sounds/${tone}/${sounds[i]}`;
    player[0].currentTime = 0;
    player[0].play();
  });
}