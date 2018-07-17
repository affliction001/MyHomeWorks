'use strict';

function handleTableClick(event) {
  const header = event.target;

  if (header.classList.contains('prop__name')) {
    header.dataset.dir === undefined || header.dataset.dir == -1 ? header.dataset.dir = 1 : header.dataset.dir = -1;
    event.currentTarget.dataset.sortBy = field;
    sortTable(header.dataset.propName, header.dataset.dir);
  }
}

