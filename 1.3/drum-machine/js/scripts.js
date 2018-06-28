'use strict';

const drumKits = document.getElementsByClassName('drum-kit__drum');

function onPlay(element) {
  element.onclick = () => {
    const player = element.getElementsByTagName('audio');
    player[0].currentTime = 0;
    player[0].play();
  }
}

for (let kit of drumKits) {
  onPlay(kit);
}