'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
const containerWs = document.querySelector('.websocket');
const wsValues = containerWs.querySelectorAll('div');

ws.addEventListener('message', e => {
  Array.from(wsValues).forEach(div => div.classList.remove('flip-it'));

  const findedDiv = Array.from(wsValues).find(div => {
    if (e.data == div.textContent) {
      return div;
    }
  });

  findedDiv.classList.add('flip-it');
});