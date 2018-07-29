'use strict';

const canvas = document.querySelector('#wall');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pi = Math.PI;
const timeFunctions = [
  function nextPoint(x, y, time) {
    return {
      x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
      y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
  },
  function nextPoint(x, y, time) {
    return {
      x: x + Math.sin((x + (time / 10)) / 100) * 5,
      y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
  }
];
const rotateSpeeds = [-0.2, -0.1, 0.1, 0.2];
const figuresCount = Math.floor(((Math.random() * 151) + 50) / 2);

let crosses = [];
let circles = [];

class Figure {
  constructor() {
    this.x = Math.floor(Math.random() * canvas.width + 1);
    this.y = Math.floor(Math.random() * canvas.height + 1);
    this.timeF = timeFunctions[Math.random() >= 0.5 ? 1 : 0];
    this.size = Math.ceil(Math.random() * 0.6 * 10) / 10;
    this.width = 5 * this.size;
  }

  paint() {}
}

class Cross extends Figure {
  constructor() {
    super();
    this.crossSize = this.size * 20;
    this.rotateSpeed = rotateSpeeds[Math.floor(Math.random() * 4)];
    this.rotateDistance = 0;
  }

  paint(ctx) {
    const newCrd = this.timeF(this.x, this.y, new Date());

    ctx.save();
    ctx.beginPath();

    ctx.translate(newCrd.x, newCrd.y);
    ctx.rotate(this.rotateDistance * pi / 180);
    this.rotateDistance += this.rotateSpeed;

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = this.width;
    ctx.moveTo(-this.crossSize/2, 0);
    ctx.lineTo(this.crossSize/2, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -this.crossSize/2);
    ctx.lineTo(0, this.crossSize/2);
    ctx.stroke();

    ctx.restore();
  }
}

class Circle extends Figure {
  constructor() {
    super();
    this.circleRadius = this.size * 12;
  }

  paint(ctx) {
    const newCrd = this.timeF(this.x, this.y, new Date());

    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = this.width;
    ctx.arc(newCrd.x, newCrd.y, this.circleRadius, 0, 2*pi);
    ctx.stroke();

    ctx.restore();
  }
}

function repaintScreen() {
  setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    crosses.forEach(cross => cross.paint(context));
    circles.forEach(circle => circle.paint(context));
  }, 50);
}

function createFigures() {
  for (let i = 0; i < figuresCount; i++) {
    crosses.push(new Cross());
    circles.push(new Circle());
  }
}

createFigures();
repaintScreen();

window.addEventListener('resize', e => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  crosses = [];
  circles = [];

  createFigures();
});