'use strict';

import card from './card.js';
import select from './select.js';

import { map, filter } from '../utils/fx.js';

export default function tag(data, checkIng, checkApp, checkUst) {
  const tagsIng = document.querySelector('.tagsIngredient');
  const tagsApp = document.querySelector('.tagsAppareil');
  const tagsUst = document.querySelector('.tagsUstensile');

  // create tag item / Template literals
  tagsIng.innerHTML = map(
    checkIng,
    index =>
      `<li class="tagsItem" onclick="handleIngTag(this)"><p>${index}</p><div><img src="./components/assets/images/xmark.svg"/></div></li>`,
  ).join('');
  tagsApp.innerHTML = map(
    checkApp,
    index =>
      `<li class="tagsItem" onclick="handleAppTag(this)"><p>${index}</p><div><img src="./components/assets/images/xmark.svg"/></div></li>`,
  ).join('');
  tagsUst.innerHTML = map(
    checkUst,
    index =>
      `<li class="tagsItem" onclick="handleUstTag(this)"><p>${index}</p><div><img src="./components/assets/images/xmark.svg"/></div></li>`,
  ).join('');

  let arrIng = [];
  let arrApp = [];
  let arrUst = [];
  // tag onclick envent
  window.handleIngTag = event => {
    arrIng.push(event.innerText);
    // reset select list
    select(data, arrIng, arrApp, arrUst);

    checkIng = filter(checkIng, tag => !arrIng.includes(tag));
    // reset tag list
    tag(data, checkIng, checkApp, checkUst);

    // remove selected item
    tagFx(checkIng, checkApp, checkUst);
  };
  window.handleAppTag = event => {
    arrApp.push(event.innerText);
    select(data, arrIng, arrApp, arrUst);
    checkApp = filter(checkApp, tag => !arrApp.includes(tag));
    tag(data, checkIng, checkApp, checkUst);
    tagFx(checkIng, checkApp, checkUst);
  };
  window.handleUstTag = event => {
    arrUst.push(event.innerText);
    select(data, arrIng, arrApp, arrUst);
    checkUst = filter(checkUst, tag => !arrUst.includes(tag));
    tag(data, checkIng, checkApp, checkUst);
    tagFx(checkIng, checkApp, checkUst);
  };
}

function tagFx(checkIng, checkApp, checkUst) {
  const origin = JSON.parse(localStorage.getItem('ORIGIN_DATA_KEY'));
  const searchData = JSON.parse(localStorage.getItem('SEARCH_DATA_KEY'));
  const isCheck = JSON.parse(localStorage.getItem('ISCHECK_KEY'));
  const search = JSON.parse(localStorage.getItem('SEARCH_KEY'));

  let newData = [];

  if (checkIng.length || checkApp.length || checkUst.length) {
    let uniqueRecipes = new Set();

    checkIng.forEach(ingredient => {
      uniqueRecipes = new Set([
        ...uniqueRecipes,
        ...filter(origin.recipes, tag =>
          tag.ingredients.some(recipeIngredient =>
            recipeIngredient.ingredient.toLowerCase().includes(ingredient.toLowerCase()),
          ),
        ),
      ]);
    });

    checkApp.forEach(appareil => {
      uniqueRecipes = new Set([...uniqueRecipes, ...filter(origin.recipes, tag => tag.appliance.includes(appareil))]);
    });

    checkUst.forEach(ustensil => {
      uniqueRecipes = new Set([
        ...uniqueRecipes,
        ...filter(origin.recipes, tag => tag.ustensils.some(recipeUstensil => recipeUstensil.includes(ustensil))),
      ]);
    });

    newData = Array.from(uniqueRecipes).filter(Boolean);

    newData = filter(
      newData,
      recipe =>
        checkIng.every(ing =>
          recipe.ingredients.some(recipeIng => recipeIng.ingredient.toLowerCase().includes(ing.toLowerCase())),
        ) &&
        checkApp.every(app => recipe.appliance.includes(app)) &&
        checkUst.every(ust => recipe.ustensils.some(recipeUst => recipeUst.includes(ust))),
    );
  } else {
    if (isCheck) {
      card(searchData);
    } else {
      card(origin);
    }
    return;
  }

  newData = { recipes: newData };
  card(newData);
}
