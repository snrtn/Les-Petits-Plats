'use strict';

import select from './select.js';

export default function card(data) {
  const wrapper = document.querySelector('.my__card');
  const count = document.querySelector('.my__num');
  const notFind = document.querySelector('.my__notFind');

  const errMessage = "Il n'y a pas des recettes correspondant";
  data.recipes.length <= 0 ? (notFind.innerHTML = errMessage) : (notFind.innerHTML = '');
  count.innerHTML = `${data.recipes.length} recettes`;
  wrapper.innerHTML = data.recipes
    .map(item => {
      let { id, image, name, time, description, ingredients } = item;

      let info = ingredients
        .map(item => {
          let { ingredient, quantity, unit } = item;

          quantity === undefined && (quantity = '');
          unit === undefined && (unit = '');

          return `
          <div class="ingredient__info">
            <h3>${ingredient}</h3>
            <p>${quantity}<span>${unit}</span></p>
          </div>`;
        })
        .join('');

      return `
      <div data-index="${id}">
        <article>
          <div class="my__card-iamge">
            <img src="./components/assets/images/recettes/${image}" alt="${name}" />
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
    })
    .join('');

  select(data);
}
