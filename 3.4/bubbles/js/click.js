'use strict';

const canvas = document.querySelector("canvas");
const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('open', function(e) {
  showBubbles(connection);
});

canvas.addEventListener('click', function(e) {
  const clickXY = {'x': e.clientX, 'y': e.clientY};
  connection.send(JSON.stringify(clickXY));
});