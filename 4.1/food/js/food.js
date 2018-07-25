'use strict';

const foodUrl = 'https://neto-api.herokuapp.com/food/42';
const ratingUrl = 'https://neto-api.herokuapp.com/food/42/rating';
const consumersUrl = 'https://neto-api.herokuapp.com/food/42/consumers';

function getFoodRecipes(recipe) {
  document.querySelector('[data-pic]').style = `background: url(${recipe.pic}) no-repeat center center`;
  document.querySelector('[data-title]').textContent = recipe.title;

  let ingr = '';
  recipe.ingredients.forEach(i => {
    ingr += i + ',';
  });
  ingr = ingr.replace(/,$/, '.');
  document.querySelector('[data-ingredients]').textContent = ingr;
}

function getRating(rating) {
  const rat = Math.floor(+rating.rating * 100) / 100;
  document.querySelector('[data-rating]').textContent = rat;
  document.querySelector('[data-star]').style = `width: ${rat * 10}%`;
  document.querySelector('[data-votes]').textContent = `(${rating.votes} оценок)`;
}

function getConsumers(consumers) {
  let consums = '';
  let totalConsums = consumers.total;
  consumers.consumers.forEach(consumer => {
    consums += `<img src="${consumer.pic}" title="${consumer.name}">`;
  });
  consums += `<span>(+${+totalConsums - consumers.consumers.length})</span>`;
  document.querySelector('[data-consumers]').innerHTML = consums;
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

loadData(foodUrl)
  .then(getFoodRecipes);
loadData(ratingUrl)
  .then(getRating);
loadData(consumersUrl)
  .then(getConsumers);

function randName() {
  let superName = `f${Math.round(Math.random() * 10000)}u${Math.round(Math.random()
    * 10000)}n${Math.round(Math.random() * 10000)}c${Math.round(Math.random()
    * 10000)}t${Math.round(Math.random() * 10000)}i${Math.round(Math.random()
    * 10000)}o${Math.round(Math.random() * 10000)}n`;
  return superName;
}