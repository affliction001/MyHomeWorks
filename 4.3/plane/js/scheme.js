'use strict'

const urlPlane = 'https://neto-api.herokuapp.com/plane/';
const selectedId = document.querySelector('#acSelect');

const btnSetEmpty = document.querySelector('#btnSetEmpty');
const btnSetFull = document.querySelector('#btnSetFull');
btnSetEmpty.setAttribute('disabled', 'true');
btnSetFull.setAttribute('disabled', 'true');

const seatMapTitle = document.querySelector('#seatMapTitle');
const seatMapDiv = document.querySelector('#seatMapDiv');

const totalPax = document.querySelector('#totalPax');
const totalAdult = document.querySelector('#totalAdult');
const totalHalf = document.querySelector('#totalHalf');

let adultCount = 0;
let halfCount = 0;

function updateCounts() {
  adultCount = 0;
  halfCount = 0;
  const seats = Array.from(document.querySelectorAll('div.seat'));
  seats.forEach(s => {
    if (s.classList.contains('adult')) ++adultCount;
    if (s.classList.contains('half')) ++halfCount;
  });

  totalAdult.textContent = adultCount;
  totalHalf.textContent = halfCount;
}

function getSchema(schema) {
  totalPax.textContent = schema.passengers;

  Array.from(seatMapDiv.children).forEach(ch => seatMapDiv.removeChild(ch));

  for (let i = 0; i < schema.scheme.length; i++) {
    seatMapDiv.appendChild(tamplateEngine(createTamplate(schema, i+1)));
  }

  btnSetEmpty.removeAttribute('disabled');
  btnSetFull.removeAttribute('disabled');

  updateCounts();
}

function createTamplate(schema, numberRow) {
  switch (schema.scheme[numberRow-1]) {
    case 0:
      return {
        tag: 'div',
        cls: ['row', 'seating-row', 'text-center'],
        content: [
          {
            tag: 'div',
            cls: ['col-xs-1', 'row-number'],
            content: {
              tag: 'h2',
              cls: '',
              content: numberRow
            }
          },
          {
            tag: 'div',
            cls: 'col-xs-5',
            content: [
              {
                tag: 'div',
                cls: ['col-xs-4', 'no-seat'],
              },
              {
                tag: 'div',
                cls: ['col-xs-4', 'no-seat'],
              },
              {
                tag: 'div',
                cls: ['col-xs-4', 'no-seat'],
              }
            ]
          },
          {
            tag: 'div',
            cls: 'col-xs-5',
            content: [
              {
                tag: 'div',
                cls: ['col-xs-4', 'no-seat'],
              },
              {
                tag: 'div',
                cls: ['col-xs-4', 'no-seat'],
              },
              {
                tag: 'div',
                cls: ['col-xs-4', 'no-seat'],
              }
            ]
          }
        ]
      };
      break;
    case 4:
      return {
        tag: 'div',
        cls: ['row', 'seating-row', 'text-center'],
        content: [
          {
            tag: 'div',
            cls: ['col-xs-1', 'row-number'],
            content: {
              tag: 'h2',
              cls: '',
              content: numberRow
            }
          },
          {
            tag: 'div',
            cls: 'col-xs-5',
            content: [
              {
                tag: 'div',
                cls: ['col-xs-4', 'no-seat'],
              },
              {
                tag: 'div',
                cls: ['col-xs-4', 'seat'],
                content: {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'B'
                }
              },
              {
                tag: 'div',
                cls: ['col-xs-4', 'seat'],
                content: {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'C'
                }
              }
            ]
          },
          {
            tag: 'div',
            cls: 'col-xs-5',
            content: [
              {
                tag: 'div',
                cls: ['col-xs-4', 'seat'],
                content: {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'D'
                }
              },
              {
                tag: 'div',
                cls: ['col-xs-4', 'seat'],
                content: {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'E'
                }
              },
              {
                tag: 'div',
                cls: ['col-xs-4', 'no-seat'],
              }
            ]
          }
        ]
      };
      break;
    case 6:
      return {
        tag: 'div',
        cls: ['row', 'seating-row', 'text-center'],
        content: [
          {
            tag: 'div',
            cls: ['col-xs-1', 'row-number'],
            content: {
              tag: 'h2',
              cls: '',
              content: numberRow
            }
          },
          {
            tag: 'div',
            cls: 'col-xs-5',
            content: [
              {
                tag: 'div',
                cls: ['col-xs-4', 'seat'],
                content: {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'A'
                }
              },
              {
                tag: 'div',
                cls: ['col-xs-4', 'seat'],
                content: {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'B'
                }
              },
              {
                tag: 'div',
                cls: ['col-xs-4', 'seat'],
                content: {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'C'
                }
              }
            ]
          },
          {
            tag: 'div',
            cls: 'col-xs-5',
            content: [
              {
                tag: 'div',
                cls: ['col-xs-4', 'seat'],
                content: {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'D'
                }
              },
              {
                tag: 'div',
                cls: ['col-xs-4', 'seat'],
                content: {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'E'
                }
              },
              {
                tag: 'div',
                cls: ['col-xs-4', 'seat'],
                content: {
                  tag: 'span',
                  cls: 'seat-label',
                  content: 'F'
                }
              }
            ]
          }
        ]
      };
      break;
  }
}

function tamplateEngine(block) {
  if ((block === undefined) || (block === null) || (block === false)) {
    return document.createTextNode('');
  }

  if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
    return document.createTextNode(block.toString());
  }

  if (Array.isArray(block)) {
    return block.reduce((f, elem) => {
      f.appendChild(tamplateEngine(elem));

      return f;
    }, document.createDocumentFragment());
  }

  const element = document.createElement(block.tag || 'div');

  [].concat(block.cls || []).forEach(
    className => element.classList.add(className)
  );

  if (block.attrs) {
    Object.keys(block.attrs).forEach(
      key => element.setAttribute(key, block.attrs[key])
    );
  }

  if (block.content) element.appendChild(tamplateEngine(block.content));

  return element;
}

document.querySelector('#btnSeatMap').addEventListener('click', function(e) {
  e.preventDefault();
  const planeId = selectedId.value;

  seatMapTitle.textContent = selectedId.selectedOptions[0].text;

  fetch(`https://neto-api.herokuapp.com/plane/${planeId}`)
    .then(res => res.json())
    .then(getSchema);
});

btnSetFull.addEventListener('click', e => {
  e.preventDefault();

  const seats = document.querySelectorAll('div.seat');

  Array.from(seats).forEach(seat => {
    if (!(seat.classList.contains('adult') || seat.classList.contains('half'))) {
      seat.classList.add('adult');
    }
  });

  updateCounts();
});

btnSetEmpty.addEventListener('click', e => {
  e.preventDefault();

  const seats = document.querySelectorAll('div.seat');

  Array.from(seats).forEach(seat => {
    seat.classList.remove('adult', 'half');
  });

  updateCounts();
});

seatMapDiv.addEventListener('click', e => {
  if (e.target.classList.contains('seat') || e.target.classList.contains('seat-label')) {
    if (e.altKey) {
      if (e.target.classList.contains('seat-label')) {
        e.target.parentElement.classList.remove('adult');
        e.target.parentElement.classList.toggle('half');
      } else {
        e.target.classList.remove('adult');
        e.target.classList.toggle('half');
      }
    } else {
      if (e.target.classList.contains('seat-label')) {
        e.target.parentElement.classList.remove('half');
        e.target.parentElement.classList.toggle('adult');
      } else {
        e.target.classList.remove('half');
        e.target.classList.toggle('adult');
      }
    }
  }

  updateCounts();
});