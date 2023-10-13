'use strict';

import displayTag from '../pages/displayTag.js';
import displayTagCheck from '../pages/displayTagCheck.js';
import displayCard from '../pages/displayCard.js';
import { _map, _filter } from '../utils/_.js';

let ingredientCheck = [],
  appareilCheck = [],
  ustensileCheck = [];

export default function searchCheck(data) {
  let ingredientGet = [],
    appareilGet = [],
    ustensilGet = [];

  _map(data.recipes, all => {
    let { ingredients, appliance, ustensils } = all;
    _map(ingredients, item => {
      let { ingredient } = item;
      ingredientGet.push(ingredient);
    });
    appareilGet.push(appliance);
    ustensilGet.push(...ustensils);
  });

  let ingredientTag = ingredientGet
    .sort()
    .reduce((unique, ingredient) => (unique.indexOf(ingredient) !== -1 ? unique : [...unique, ingredient]), []);
  let appareilTag = appareilGet
    .sort()
    .reduce((unique, appareil) => (unique.indexOf(appareil) !== -1 ? unique : [...unique, appareil]), []);
  let ustensilTag = ustensilGet
    .sort()
    .reduce((unique, ustensil) => (unique.indexOf(ustensil) !== -1 ? unique : [...unique, ustensil]), []);

  function start() {
    displayTag(ingredientTag, appareilTag, ustensilTag, ingredientCheck, appareilCheck, ustensileCheck);
    displayTagCheck(ingredientCheck, appareilCheck, ustensileCheck);
  }

  window.handleIngredient = event => {
    ingredientCheck.push(`${event.innerText}`);
    start();
    let resultIngredient = [],
      arrResult = [];
    resultIngredient.push(event.innerText.toLowerCase());
    arrResult.push(
      ..._filter(data.recipes, value =>
        value.ingredients.some(el => el.ingredient.toLowerCase().includes(resultIngredient)),
      ),
    );
    arrResult = { recipes: arrResult };
    displayCard(arrResult);
  };
  window.handleAppareil = event => {
    appareilCheck.push(`${event.innerText}`);
    start();
    let resultAppareil = [],
      arrResult = [];
    resultAppareil.push(event.innerText.toLowerCase());
    arrResult.push(..._filter(data.recipes, value => value.appliance.toLowerCase().includes(resultAppareil)));
    arrResult = { recipes: arrResult };
    displayCard(arrResult);
  };
  window.handleUstensile = event => {
    ustensileCheck.push(`${event.innerText}`);
    start();
    let resultUstensil = [],
      arrResult = [];
    resultUstensil.push(event.innerText.toLowerCase());
    arrResult.push(
      ..._filter(data.recipes, value => value.ustensils.some(el => el.toLowerCase().includes(resultUstensil))),
    );
    arrResult = { recipes: arrResult };
    displayCard(arrResult);
  };
  start();
}
