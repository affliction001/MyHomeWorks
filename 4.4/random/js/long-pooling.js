'use strict';

const containerLongPoll = document.querySelector('.long-pooling');
const longPollValues = containerLongPoll.querySelectorAll('div');

function longPoll() {
  const longPollXhr = new XMLHttpRequest();
  longPollXhr.addEventListener('load', e => {
    const longValue = longPollXhr.responseText;
    Array.from(longPollValues).forEach(div => div.classList.remove('flip-it'));

    const findedDiv = Array.from(longPollValues).find(div => {
      if (longValue.trim() == div.textContent) {
        return div;
      }
    });

    findedDiv.classList.add('flip-it');

    longPoll();
  });
  longPollXhr.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
  longPollXhr.send();
}

longPoll();