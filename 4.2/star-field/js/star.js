'use strict';

const canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 400;

canvas.addEventListener('click', () => {
  drawStars(canvas);
});

function drawStars(canvas) {
  canvas.style = 'background-color: #000';

  const context = canvas.getContext('2d');
  context.clearRect(0,0, canvas.width, canvas.height);

  let starsCount; // количество звезд от 200 до 400
  let starSize; // размер звезды от 0 до 1.1
  let starColors = ['#ffffff', '#ffe9c4', '#d4fbff'];
  let starColor;  // цвет звезды случайный из трех возможных
  let starBright; // яркость звезды случайная от 0.8 до 1

  starsCount = Math.floor(Math.random() * 201) + 200;

  for (let i = 0; i < starsCount; i++) {
    starSize = Math.floor(Math.random() * 12) / 10;
    starColor = starColors[Math.floor(Math.random() * 3)];
    starBright = (Math.floor(Math.random() * 3) + 8) / 10;

    const starX = Math.floor(Math.random() * (canvas.width + 1));
    const starY = Math.floor(Math.random() * (canvas.height + 1));

    context.beginPath();
    context.fillStyle = starColor;
    context.globalAlpha = starBright;
    context.fillRect(starX, starY, starSize, starSize);
  }
}