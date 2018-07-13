'use strict';

const doneList = document.querySelector('.done');
const unDoneList = document.querySelector('.undone');
const inputs = document.querySelectorAll('.todo-list input');

Array.from(inputs).forEach(input => input.addEventListener('click', event => moveElement(event.target)));

function moveElement(element) {
  if (element.checked) {
    doneList.appendChild(element.parentElement);
  } else {
    unDoneList.appendChild(element.parentElement);
  }
}