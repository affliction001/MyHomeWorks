'use strict';

function callback(obj) {
  document.querySelector('[data-wallpaper]').src = obj.wallpaper;
  document.querySelector('[data-username]').textContent = obj.username;
  document.querySelector('[data-description]').textContent = obj.description;
  document.querySelector('[data-pic]').src = obj.pic;
  document.querySelector('[data-tweets]').textContent = obj.tweets;
  document.querySelector('[data-followers]').textContent = obj.followers;
  document.querySelector('[data-following]').textContent = obj.following;
}

const scriptNode = document.createElement('script');
scriptNode.src = 'https://neto-api.herokuapp.com/twitter/jsonp';
document.querySelector('body').appendChild(scriptNode);
