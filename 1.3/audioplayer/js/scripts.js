'use strict';

const songs = ['./mp3/LA Chill Tour.mp3',
               './mp3/LA Fusion Jam.mp3',
               './mp3/This is it band.mp3'];

const mediaplayer = document.getElementsByClassName('mediaplayer');
const title = document.getElementsByClassName('title');
const player = document.getElementsByClassName('player');
const play = document.getElementsByClassName('playstate');
const stop = document.getElementsByClassName('stop');
const back = document.getElementsByClassName('back');
const next = document.getElementsByClassName('next');

let pl = document.getElementsByClassName('fa-play');
let pa = document.getElementsByClassName('fa-pause');

let songNumber = 0;
player[0].src = songs[songNumber];

let status = false;

play[0].onclick = () => {
  if (player[0].paused) {
    player[0].play();
    pl[0].style.display = 'none';
    pa[0].style.display = 'block';
    mediaplayer[0].classList.add('play');
    status = true;
  } else {
    player[0].pause();
    pa[0].style.display = 'none';
    pl[0].style.display = 'block';
    mediaplayer[0].classList.remove('play');
    status = false;
  }
}

stop[0].onclick = () => {
  player[0].pause();
  player[0].currentTime = 0;
  pa[0].style.display = 'none';
  pl[0].style.display = 'block';
  mediaplayer[0].classList.remove('play');
  status = false;
}

back[0].onclick = () => {
  songNumber !== 0 ? songNumber-- : songNumber = songs.length - 1;
  player[0].src = songs[songNumber];
  title[0].title = songs[songNumber].substring(6, songs[songNumber].length - 4);
  if (status) player[0].play();
}

next[0].onclick = () => {
  songNumber !== songs.length - 1 ? songNumber++ : songNumber = 0;
  player[0].src = songs[songNumber];
  title[0].title = songs[songNumber].substring(6, songs[songNumber].length - 4);
  if (status) player[0].play();
}