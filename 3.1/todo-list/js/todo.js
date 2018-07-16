'use strict';

const doneList = document.querySelector('.done');
const unDoneList = document.querySelector('.undone');
const inputs = document.querySelectorAll('.todo-list input');

Array.from(inputs).forEach(input => input.addEventListener('click', moveElement));

function moveElement(event) {
  const element = event.target;

  if (element.checked) {
    doneList.appendChild(element.parentElement);
  } else {
    unDoneList.appendChild(element.parentElement);
  }
}