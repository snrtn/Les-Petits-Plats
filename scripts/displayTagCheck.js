'use strict';

import displayTag from './displayTag.js';
import displayCard from './displayCard.js';
import { _filter, _map } from './utils/_.js';

const tagsIngredient = document.querySelector('.tagsIngredient'),
  tagsAppareil = document.querySelector('.tagsAppareil'),
  tagsUstensile = document.querySelector('.tagsUstensile');

export default function displayTagCheck(ingredientCheck, appareilCheck, ustensilCheck) {
  console.log('🚀 ~ file: displayTagCheck.js:10 ~ displayTagCheck ~ ustensilCheck:', ustensilCheck);
  console.log('🚀 ~ file: displayTagCheck.js:10 ~ displayTagCheck ~ appareilCheck:', appareilCheck);
  console.log('🚀 ~ file: displayTagCheck.js:10 ~ displayTagCheck ~ ingredientCheck:', ingredientCheck);
  let ingTag = [],
    appTag = [],
    ustTag = [];

  tagsIngredient.innerHTML = _map(
    ingredientCheck,
    index =>
      `<li class="tagsItem" onclick="handleIngredientTag(this)"><p>${index}</p><div><img src="../assets/images/xmark.svg"/></div></li>`,
  ).join('');
  window.handleIngredientTag = event => {
    ingTag.push(event.innerText);
    ingredientCheck = _filter(ingredientCheck, tag => !ingTag.includes(tag));
    console.log('🚀 ~ file: displayTagCheck.js:25 ~ displayTagCheck ~ ingredientCheck:', ingredientCheck);
    displayTagCheck(ingredientCheck, appareilCheck, ustensilCheck);
  };

  tagsAppareil.innerHTML = _map(
    appareilCheck,
    index =>
      `<li class="tagsItem" onclick="handleAppareilTag(this)"><p>${index}</p><div><img src="../assets/images/xmark.svg"/></div></li>`,
  ).join('');
  window.handleAppareilTag = event => {
    appTag.push(event.innerText);
    appareilCheck = _filter(appareilCheck, tag => !appTag.includes(tag));
    console.log('🚀 ~ file: displayTagCheck.js:37 ~ displayTagCheck ~ appareilCheck:', appareilCheck);
    displayTagCheck(ingredientCheck, appareilCheck, ustensilCheck);
  };

  tagsUstensile.innerHTML = _map(
    ustensilCheck,
    index =>
      `<li class="tagsItem" onclick="handleUstensilTag(this)"><p>${index}</p><div><img src="../assets/images/xmark.svg"/></div></li>`,
  ).join('');
  window.handleUstensilTag = event => {
    ustTag.push(event.innerText);
    ustensilCheck = _filter(ustensilCheck, tag => !ustTag.includes(tag));
    console.log('🚀 ~ file: displayTagCheck.js:49 ~ displayTagCheck ~ ustensilCheck:', ustensilCheck);
    displayTagCheck(ingredientCheck, appareilCheck, ustensilCheck);
  };
}
