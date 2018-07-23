'use strict';

const count = document.querySelector('.counter');
const error = document.querySelector('output.errors');

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('message', function(e) {
  count.textContent = JSON.parse(e.data).connections;
  error.textContent = JSON.parse(e.data).errors;
});

window.addEventListener('beforeunload', function(e) {
  connection.close(1000, 'close');
});
