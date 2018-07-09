'use strict';

function init() {
  const workList = document.querySelectorAll('.list-block input');
  const outMessage = document.querySelector('output');
  const worksCount = workList.length;
  let counter = countWorks(workList);

  outputResult(outMessage, counter, worksCount);
  checkComplete(document.querySelector('.list-block'), counter, worksCount);

  Array.from(workList).forEach((work) => {
    work.addEventListener('click', function() {
      counter = countWorks(workList);
      outputResult(outMessage, counter, worksCount);
      checkComplete(document.querySelector('.list-block'), counter, worksCount);
    });
  });
}

document.addEventListener('DOMContentLoaded', init);