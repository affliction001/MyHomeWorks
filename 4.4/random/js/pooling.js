'use strict';

const containerPoll = document.querySelector('.pooling');
const pollValues = containerPoll.querySelectorAll('div');

setInterval(() => {
  const pollXhr = new XMLHttpRequest();
  pollXhr.addEventListener('load', e => {
    const pollValue = pollXhr.responseText;
    Array.from(pollValues).forEach(div => div.classList.remove('flip-it'));

    const findedDiv = Array.from(pollValues).find(div => {
      if (pollValue == div.textContent) {
        return div;
      }
    });

    findedDiv.classList.add('flip-it');
  });
  pollXhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
  pollXhr.send();
}, 5000);