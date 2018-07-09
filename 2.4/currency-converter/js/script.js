'use strict';

const source = document.querySelector('#source');
const result = document.querySelector('#result');
const from = document.querySelector('#from');
const to = document.querySelector('#to');
const loader = document.querySelector('#loader');
const content = document.querySelector('#content')

let currencyList = '';

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://neto-api.herokuapp.com/currency');
xhr.send();
xhr.addEventListener('load', onReady);
xhr.addEventListener('loadstart', onLoadStart);
xhr.addEventListener('loadend', onLoadEnd);

function onReady() {
  if (xhr.status === 200 && xhr.readyState === 4) {
    currencyList = JSON.parse(xhr.responseText);

    let currencyListString = '';

    Array.from(currencyList).forEach(function (currency) {
      currencyListString += `<option value="${currency.value}">${currency.code}</option>`;
    });

    from.innerHTML = currencyListString;
    to.innerHTML = currencyListString;
  }
}

function onLoadStart() {
  loader.classList.remove('hidden');
}

function onLoadEnd() {
  loader.classList.add('hidden');
  content.classList.remove('hidden');
}

source.addEventListener('input', function() {
  result.value = Math.round(+source.value * +from.value / +to.value * 100) / 100;
});

from.addEventListener('input', function() {
  result.value = Math.round(+source.value * +from.value / +to.value * 100) / 100;
});

to.addEventListener('input', function() {
  result.value = Math.round(+source.value * +from.value / +to.value * 100) / 100;
});