'use strict';

const formSignIn = new FormData(document.getElementsByClassName('sign-in-htm')[0]);
const formSignUp = new FormData(document.getElementsByClassName('sign-up-htm')[0]);

const buttonIn = document.querySelector('.sign-in-htm .button');

buttonIn.addEventListener('click', function (e) {
  event.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", onLoad);
  xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(formSignIn));

  function onLoad() {
    const answer = JSON.parse(xhr.responseText);

    if (answer.error) {
      document.querySelector('.sign-in-htm output.error-message').innerText = answer.message;
    } else {
      document.querySelector('.sign-in-htm output.error-message').innerText = `Пользователь ${answer.name} успешно авторизован`;
    }
  }
});

const buttonUp = document.querySelector('.sign-up-htm .button');

buttonUp.addEventListener('click', function (e) {
  event.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", onLoad);
  xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(formSignUp));

  function onLoad() {
    const answer = JSON.parse(xhr.responseText);

    if (answer.error) {
      document.querySelector('.sign-up-htm output.error-message').innerText = answer.message;
    } else {
      document.querySelector('.sign-up-htm output.error-message').innerText = `Пользователь ${answer.name} успешно зарегистрирован`;
    }
  }
});