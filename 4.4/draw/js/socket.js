'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

ws.addEventListener('open', e => {
  editor.addEventListener('update', e => {
    e.canvas.toBlob(img => {
      ws.send(img);
    });
  });
});
