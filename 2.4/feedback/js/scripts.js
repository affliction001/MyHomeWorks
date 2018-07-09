'use strict';

const inputs = document.querySelectorAll('input, textarea');
const sendButton = document.querySelector('.contentform .button-contact');
const zip = document.querySelector('input[name=zip]');

// Проверяем все ли поля заполнены.

Array.from(inputs).forEach(function (input) {
  input.addEventListener('input', function () {
    checkEnters();
  });
});

function  checkEnters() {
  let bool = true;

  Array.from(inputs).forEach(function (input) {
    if (input.value === '') {
      bool = false;
    }
  });

  bool ? sendButton.disabled = false : sendButton.disabled = true;
}

// В поле почтовый индекс можно вводить только цифры.

zip.addEventListener('input', function () {
  if (this.value.search(/\d*\D/) !== -1) {
    this.value = this.value.slice(0, this.value.length - 1);
  }
});

//

sendButton.addEventListener('click', function () {
  document.querySelector('.contentform').classList.add('hidden');
  document.querySelector('#output').classList.remove('hidden');
});