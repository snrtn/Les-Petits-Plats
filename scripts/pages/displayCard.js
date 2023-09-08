"use strict";

const myCard = document.querySelector('.my__card');

const displayCard = (data) => {
  let item = data.recipes.map((items) => {
    let {id, image, name, time, description, ingredients} = items;

    // card ingredient
    let itemIngredient = ingredients.map((itemss) => {
      let {ingredient, quantity, unit} = itemss;

      if (quantity === undefined ) {
        quantity = '';
      }
      if( unit === undefined ) {
        unit = '';
      }

      return `
        <div class="ingredient__info">
          <h3>${ingredient}</h3>
          <p>${quantity}<span>${unit}</span></p>
        </div>
      `
    }).join("");

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
                  ${itemIngredient}
                </article>
              </div>
            </div>
          </div>
        </article>
      </div>
    `
  }).join("");

  myCard.innerHTML = item;
}

export default displayCard;