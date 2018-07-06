'use strict';

function init() {
	const tabs = document.querySelectorAll('nav > a');

	Array.from(tabs).forEach(function(tab) {
		tab.addEventListener('click', function(event) {
			event.preventDefault();

			for (let t of tabs) {
				t.classList.remove('active');
			}

			this.classList.add('active');

			const link = this.getAttribute('href');

      const xhr = new XMLHttpRequest();
      xhr.open('GET', link);
      xhr.send();

      xhr.addEventListener('readystatechange', onReady);
      function onReady() {
        if (xhr.status === 200) {
          document.querySelector('#content').innerHTML = xhr.responseText;
        }
      }

      xhr.addEventListener('loadstart', onLoadStart);
      function onLoadStart() {
      	document.querySelector('#preloader').classList.remove('hidden');
			}

      xhr.addEventListener('loadend', onLoadEnd);
      function onLoadEnd() {
        document.querySelector('#preloader').classList.add('hidden');
      }
		});
	});
}

document.addEventListener('DOMContentLoaded', init);