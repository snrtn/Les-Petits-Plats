'use strict';

import card from './card.js';
import select from './select.js';

export default function tag(data, checkIng, checkApp, checkUst) {
  const tagsIng = document.querySelector('.tagsIngredient');
  const tagsApp = document.querySelector('.tagsAppareil');
  const tagsUst = document.querySelector('.tagsUstensile');

  tagsIng.innerHTML = checkIng
    .map(
      index =>
        `<li class="tagsItem" onclick="handleIngTag(this)"><p>${index}</p><div><img src="./components/assets/images/xmark.svg"/></div></li>`,
    )
    .join('');
  tagsApp.innerHTML = checkApp
    .map(
      index =>
        `<li class="tagsItem" onclick="handleAppTag(this)"><p>${index}</p><div><img src="./components/assets/images/xmark.svg"/></div></li>`,
    )
    .join('');
  tagsUst.innerHTML = checkUst
    .map(
      index =>
        `<li class="tagsItem" onclick="handleUstTag(this)"><p>${index}</p><div><img src="./components/assets/images/xmark.svg"/></div></li>`,
    )
    .join('');

  let arrIng = [];
  let arrApp = [];
  let arrUst = [];

  window.handleIngTag = event => {
    arrIng.push(event.innerText);
    select(data, arrIng, arrApp, arrUst);
    checkIng = checkIng.filter(tag => !arrIng.includes(tag));
    tag(data, checkIng, checkApp, checkUst);
    tagFx(checkIng, checkApp, checkUst);
  };
  window.handleAppTag = event => {
    arrApp.push(event.innerText);
    select(data, arrIng, arrApp, arrUst);
    checkApp = checkApp.filter(tag => !arrApp.includes(tag));
    tag(data, checkIng, checkApp, checkUst);
    tagFx(checkIng, checkApp, checkUst);
  };
  window.handleUstTag = event => {
    arrUst.push(event.innerText);
    select(data, arrIng, arrApp, arrUst);
    checkUst = checkUst.filter(tag => !arrUst.includes(tag));
    tag(data, checkIng, checkApp, checkUst);
    tagFx(checkIng, checkApp, checkUst);
  };
}

function tagFx(checkIng, checkApp, checkUst) {
  const origin = JSON.parse(localStorage.getItem('DATA_KEY'));

  let newData = [];
  checkApp.length === 0 &&
    checkUst.length === 0 &&
    (newData = origin.recipes.filter(tag =>
      checkIng.every(requiredIngredient =>
        tag.ingredients.some(recipeIngredient =>
          recipeIngredient.ingredient.toLowerCase().includes(requiredIngredient.toLowerCase()),
        ),
      ),
    ));
  checkIng.length === 0 &&
    checkUst.length === 0 &&
    (newData = origin.recipes.filter(tag =>
      checkApp.every(requiredAppareil => tag.appliance.includes(requiredAppareil)),
    ));
  checkIng.length === 0 &&
    checkApp.length === 0 &&
    (newData = origin.recipes.filter(tag =>
      checkUst.every(requiredUstensil =>
        tag.ustensils.some(recipeUstensil => recipeUstensil.includes(requiredUstensil)),
      ),
    ));

  newData = { recipes: newData };
  card(newData);
}
