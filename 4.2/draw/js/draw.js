'use strict';

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.style.display = 'block';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', e => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);
});

let colorTone = 0;
let brushSize = 5;
let reflectSize = 100;
let isMouseDown = false;

canvas.addEventListener('mousedown', function(e) {
  isMouseDown = true;
});

canvas.addEventListener('mouseup', function(e) {
  isMouseDown = false;
  ctx.beginPath();
});

canvas.addEventListener('mousemove', e => {
  let x = e.clientX;
  let y = e.clientY;

  if (isMouseDown) {
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.lineTo(x, y);
    ctx.strokeStyle = `hsl(${colorTone}, 100%, 50%)`;
    ctx.lineWidth = brushSize;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  e.shiftKey ? colorTone-- : colorTone++;

  if (colorTone > 359) {
    colorTone = 0;
  } else if (colorTone < 0) {
    colorTone = 359;
  }

  if (reflectSize > brushSize) {
    brushSize++;
  } else {
    brushSize--;
  }
  if (brushSize === 100) {
    reflectSize = 5;
  }
  if (brushSize === 5) {
    reflectSize = 100;
  }
});