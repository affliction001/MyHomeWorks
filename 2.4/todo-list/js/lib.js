function countWorks(works) {
  let counter = 0;

  for (let work of works) {
    if (work.checked) {
      counter++;
    }
  }

  return counter;
}

function outputResult(outElement, currentCount, totalCount) {
  outElement.value = `${currentCount} из ${totalCount}`;
}

function checkComplete(element, current, total) {
  current === total ? element.classList.add('complete') : element.classList.remove('complete');
}