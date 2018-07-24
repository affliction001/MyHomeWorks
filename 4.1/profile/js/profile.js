'use strict';

const profileURL = 'https://neto-api.herokuapp.com/profile/me';
const techURL = 'https://neto-api.herokuapp.com/profile/:id/technologies';
let technologiesURL = '';

function publishProfile(profile) {
  document.querySelector('[data-name]').textContent = profile.name;
  document.querySelector('[data-description]').textContent = profile.description;
  document.querySelector('[data-pic]').src = profile.pic;
  document.querySelector('[data-position]').textContent = profile.position;

  technologiesURL = techURL.replace(/:id/, profile.id);

  loadData(technologiesURL)
    .then(publishTechnologies);

  document.querySelector('.content').style = 'display:initial';
}

function publishTechnologies(techs) {
  let techList = '';
  techs.forEach(t => {
    techList += `<span class="devicons devicons-${t}"></span>`;
  });
  document.querySelector('[data-technologies]').innerHTML = techList;
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

loadData(profileURL)
  .then(publishProfile);

function randName() {
  let superName = `f${Math.round(Math.random() * 10000)}u${Math.round(Math.random()
    * 10000)}n${Math.round(Math.random() * 10000)}c${Math.round(Math.random()
    * 10000)}t${Math.round(Math.random() * 10000)}i${Math.round(Math.random()
    * 10000)}o${Math.round(Math.random() * 10000)}n`;
  return superName;
}