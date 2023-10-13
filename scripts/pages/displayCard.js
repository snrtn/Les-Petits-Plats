'use strict';

import searchCheck from '../filters/searchCheck.js';
import { _map } from '../utils/_.js';

const myCard = document.querySelector('.my__card'),
  myTotal = document.querySelector('.my__num'),
  myNotFind = document.querySelector('.my__notFind');

export default function displayCard(data) {
  const message = "Il n'y a pas des recettes correspondant";
  data.recipes.length <= 0 ? (myNotFind.innerHTML = message) : (myNotFind.innerHTML = '');

  myTotal.innerHTML = `${data.recipes.length} recettes`;

  myCard.innerHTML = _map(data.recipes, lists => {
    let { id, image, name, time, description, ingredients } = lists;

    let info = _map(ingredients, infos => {
      let { ingredient, quantity, unit } = infos;

      quantity === undefined ? (quantity = '') : (quantity = quantity);
      unit === undefined ? (unit = '') : (unit = unit);

      return `
        <div class="ingredient__info">
          <h3>${ingredient}</h3>
          <p>${quantity}<span>${unit}</span></p>
        </div>`;
    }).join('');

    return `
      <div data-index="${id}">
        <article>
          <div class="my__card-iamge">
            <img src="../assets/images/recettes/${image}" alt="${name}" />
            <div>
              <p>${time}<span>min</span></p>
            </div>
          </div>
          <div class="my__card-wrapper">
            <div class="my__card-infos">
              <h1>${name}</h1>
              <div class="my__card-recette">
                <h2>RECETTE</h2>
                <p>
                  ${description}
                </p>
              </div>
              <div class="my__card-ingredient">
                <h2>Ingrédients</h2>
                <article>
                  ${info}
                </article>
              </div>
            </div>
          </div>
        </article>
      </div>`;
  }).join('');
  searchCheck(data);
}
