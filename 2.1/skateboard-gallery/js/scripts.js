'use strict';

const imgLinks = document.getElementsByClassName('gallery-nav')[0].getElementsByTagName('a');
const viewImg = document.getElementById('view');

for (let imgLink of imgLinks) {
  imgLink.addEventListener('click', event => {
    event.preventDefault();

    for (let iLink of imgLinks) {
      iLink.classList.remove('gallery-current');
    }

    event.currentTarget.classList.add('gallery-current');
    viewImg.src = event.currentTarget.href;
  });
}