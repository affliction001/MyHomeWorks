'use strict';

const buttonIn = document.querySelector('.sign-in-htm .button');

buttonIn.addEventListener('click', function (e) {
  event.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', onLoad);
  xhr.send(JSON.stringify(getSignInFields()));

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
  xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('load', onLoad);
  xhr.send(JSON.stringify(getSignUpFields()));

  function onLoad() {
    const answer = JSON.parse(xhr.responseText);

    if (answer.error) {
      document.querySelector('.sign-up-htm output.error-message').innerText = answer.message;
    } else {
      document.querySelector('.sign-up-htm output.error-message').innerText = `Пользователь ${answer.name} успешно зарегистрирован`;
    }
  }
});

function getSignInFields() {
  const email = document.querySelector('.sign-in-htm #email');
  const pass = document.querySelector('.sign-in-htm #pass');

  let result = {};
  result[email.name] = email.value;
  result[pass.name] = pass.value;

  return result;
}

function getSignUpFields() {
  const email = document.querySelector('.sign-up-htm #email');
  const pass = document.querySelectorAll('.sign-up-htm #pass');

  let result = {};
  result[email.name] = email.value;

  Array.from(pass).forEach(p => {
    result[p.name] = p.value;
  });

  return result;
}