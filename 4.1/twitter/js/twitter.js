'use strict';

const twittUrl = 'https://neto-api.herokuapp.com/twitter/jsonp';

function publishProfile(profile) {
  document.querySelector('[data-wallpaper]').src = profile.wallpaper;
  document.querySelector('[data-username]').textContent = profile.username;
  document.querySelector('[data-description]').textContent = profile.description;
  document.querySelector('[data-pic]').src = profile.pic;
  document.querySelector('[data-tweets]').textContent = profile.tweets;
  document.querySelector('[data-followers]').textContent = profile.followers;
  document.querySelector('[data-following]').textContent = profile.following;
}

function loadData(url) {
  const functionName = randName();
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

function randName() {
  let superName = `f${Math.round(Math.random() * 10000)}u${Math.round(Math.random()
          * 10000)}n${Math.round(Math.random() * 10000)}c${Math.round(Math.random()
          * 10000)}t${Math.round(Math.random() * 10000)}i${Math.round(Math.random()
          * 10000)}o${Math.round(Math.random() * 10000)}n`;
  return superName;
}

loadData(twittUrl)
  .then(publishProfile);