'use strict';

import searchCheck from './searchCheck.js';
import { _filter, _map } from './utils/_.js';

const tagsIngredient = document.querySelector('.tagsIngredient'),
  tagsAppareil = document.querySelector('.tagsAppareil'),
  tagsUstensile = document.querySelector('.tagsUstensile');

export default function displayTagCheck(data, ingredientCheck, appareilCheck, ustensilCheck) {
  let ingTag = [],
    appTag = [],
    ustTag = [];

  let setIng = [],
    setApp = [],
    setUst = [];

  let lowercaseIng = [],
    lowercaseApp = [],
    lowercaseUst = [];

  tagsIngredient.innerHTML = _map(
    ingredientCheck,
    index =>
      `<li class="tagsItem" onclick="handleIngredientTag(this)"><p>${index}</p><div><img src="../assets/images/xmark.svg"/></div></li>`,
  ).join('');
  tagsAppareil.innerHTML = _map(
    appareilCheck,
    index =>
      `<li class="tagsItem" onclick="handleAppareilTag(this)"><p>${index}</p><div><img src="../assets/images/xmark.svg"/></div></li>`,
  ).join('');
  tagsUstensile.innerHTML = _map(
    ustensilCheck,
    index =>
      `<li class="tagsItem" onclick="handleUstensilTag(this)"><p>${index}</p><div><img src="../assets/images/xmark.svg"/></div></li>`,
  ).join('');

  ingredientCheck !== undefined && forIng();
  appareilCheck !== undefined && forApp();
  ustensilCheck !== undefined && forUst();

  function forIng() {
    for (let i = 0; i < ingredientCheck.length; i++) {
      lowercaseIng.push(ingredientCheck[i]);
    }
  }
  function forApp() {
    for (let i = 0; i < appareilCheck.length; i++) {
      lowercaseApp.push(appareilCheck[i]);
    }
  }
  function forUst() {
    for (let i = 0; i < ustensilCheck.length; i++) {
      lowercaseUst.push(ustensilCheck[i]);
    }
  }

  window.handleIngredientTag = event => {
    ingTag.push(event.innerText);
    ingredientCheck = _filter(ingredientCheck, tag => !ingTag.includes(tag));
    setIng = ingTag;
    searchCheck(data, setIng, setApp, setUst);
    displayTagCheck(data, ingredientCheck, appareilCheck, ustensilCheck);
  };
  window.handleAppareilTag = event => {
    appTag.push(event.innerText);
    appareilCheck = _filter(appareilCheck, tag => !appTag.includes(tag));
    setApp = appTag;
    searchCheck(data, setIng, setApp, setUst);
    displayTagCheck(data, ingredientCheck, appareilCheck, ustensilCheck);
  };
  window.handleUstensilTag = event => {
    ustTag.push(event.innerText);
    ustensilCheck = _filter(ustensilCheck, tag => !ustTag.includes(tag));
    setUst = ustTag;
    searchCheck(data, setIng, setApp, setUst);
    displayTagCheck(data, ingredientCheck, appareilCheck, ustensilCheck);
  };
}
