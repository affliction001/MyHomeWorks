'use strict';

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://neto-api.herokuapp.com/book/');
xhr.send();

xhr.addEventListener('load', onLoad);
function onLoad() {
  const books = JSON.parse(xhr.responseText);

  let booksList = '';

  books.forEach((book) => {
    let bookChars = '<li data-title="' + book.title +'" ' +
                    'data-author="' + book.author.name + '" ' +
                    'data-info="' + book.info + '" ' +
                    'data-price="' + book.price + '">' +
                    '<img src="' + book.cover.small + '"></li>';

    booksList += bookChars;
  });

  document.querySelector('ul#content').innerHTML = booksList;
}