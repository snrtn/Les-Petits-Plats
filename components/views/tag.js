'use strict';

import card from './card.js';
import select from './select.js';

export default function tag(data, checkIng, checkApp, checkUst) {
  const tagsIng = document.querySelector('.tagsIngredient');
  const tagsApp = document.querySelector('.tagsAppareil');
  const tagsUst = document.querySelector('.tagsUstensile');
  // create tag ingredient
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
  // Ingredient onclick envent
  window.handleIngTag = event => {
    arrIng.push(event.innerText);
    // retrier select item
    // aller à ./select.js: line 54
    select(data, arrIng, arrApp, arrUst);

    checkIng = checkIng.filter(tag => !arrIng.includes(tag));
    // retrier tag item
    tag(data, checkIng, checkApp, checkUst);

    // retrier card item
    // aller à line 64
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
  console.log('🚀 ~ file: tag.js:65 ~ tagFx ~ checkIng:', checkIng);

  // si plus 2 ou 3,4 array: ['Beurre', 'Chocolat']
  // newData.push(
  // 	...origin.recipes.filter((tag) => tag.ingredients.some((el) => el.ingredient.includes('Beurre', 'Chocolat'))),
  // );
  // newData: (0)

  // array: ['Beurre']
  // newData.push(
  // 	...origin.recipes.filter((tag) => tag.ingredients.some((el) => el.ingredient.includes('Beurre'))),
  // );
  // newData: (14)

  // {recipes: Array(50)}
  const origin = JSON.parse(localStorage.getItem('DATA_KEY'));

  let newData = [];
  newData.push(...origin.recipes.filter(tag => tag.ingredients.some(el => el.ingredient.includes(checkIng))));
  console.log('🚀 ~ file: tag.js:67 ~ tagFx ~ newData:', newData);

  // comment ajouter avec appliance et ustensils ??
  // newData.push(...origin.recipes.filter((value) => !value.appliance.includes(checkApp)));
  // newData.push(...origin.recipes.filter((value) => value.ustensils.some((el) => !el.includes(checkUst))));

  // s'il y a value dans le recherche
  // 'coco'
  // newData: (6)

  newData = { recipes: newData };
  // retrier card item
  card(newData);
}
