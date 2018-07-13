'use strict';

const listOfArticles = document.querySelector('.tabs-content').children;
const navTab = document.querySelector('.tabs-nav');
const demoTab = navTab.firstElementChild;
let currentTab = 0;

Array.from(listOfArticles).forEach((tab) => {
  navTab.appendChild(demoTab.cloneNode(true));
  navTab.lastElementChild.firstElementChild.innerHTML = tab.dataset.tabTitle;
  navTab.lastElementChild.firstElementChild.classList.add(tab.dataset.tabIcon);
});

navTab.removeChild(demoTab);

const tabs = navTab.children;

tabs[currentTab].classList.add('ui-tabs-active');

for (let i = 0; i < listOfArticles.length; i++) {
  if (currentTab !== i) {
    listOfArticles[i].classList.add('hidden');
  }
}

Array.from(tabs).forEach(tab => {
  tab.addEventListener('click', function(event) {
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].classList.contains('ui-tabs-active')) {
        tabs[i].classList.remove('ui-tabs-active');
        listOfArticles[i].classList.add('hidden');
      }
    }

    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i] === this) {
        tabs[i].classList.add('ui-tabs-active');
        listOfArticles[i].classList.remove('hidden');
      }
    }
  });
});