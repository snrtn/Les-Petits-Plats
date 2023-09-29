"use strict";

const tagsIngredient = document.querySelector('.tagsIngredient');
const tagsAppareil = document.querySelector('.tagsAppareil');
const tagsUstensile = document.querySelector('.tagsUstensile');

const displayTagsView = (arrIngredientsChoice, arrAppareilsChoice, arrUstensilesChoice) => {

  let mapIngredientsChoice = arrIngredientsChoice.map((index) => {
    return `
      <li class="tagsItem">
        <p>${index}</p>
        <div>X</div>
      </li>
    `
  }).join('');
  tagsIngredient.innerHTML = mapIngredientsChoice;

  let mapAppareilsChoice = arrAppareilsChoice.map((index) => {
    return `
      <li class="tagsItem">
        <p>${index}</p>
        <div>X</div>
      </li>
    `
  }).join('');
  tagsAppareil.innerHTML = mapAppareilsChoice;

  let mapUstensilesChoice = arrUstensilesChoice.map((index) => {
    return `
      <li class="tagsItem">
        <p>${index}</p>
        <div>X</div>
      </li>
    `
  }).join('');
  tagsUstensile.innerHTML = mapUstensilesChoice;
}

export default displayTagsView;