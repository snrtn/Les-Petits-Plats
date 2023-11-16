'use strict';

import select from './select.js';
import { map } from '../utils/fx.js';

// Fonction card pour générer la mise en page des cartes de recettes
export default function card(data) {
  // Sélection des éléments du DOM
  const wrapper = document.querySelector('.my__card');
  const count = document.querySelector('.my__num');
  const notFind = document.querySelector('.my__notFind');

  // Message d'erreur pour le cas où aucune recette ne correspond
  const errMessage = "Il n'y a pas de recettes correspondantes";

  // Vérification si la longueur des recettes est inférieure ou égale à 0
  data.recipes.length <= 0 ? (notFind.innerHTML = errMessage) : (notFind.innerHTML = '');

  // Affichage du nombre total de recettes
  count.innerHTML = `${data.recipes.length} recettes`;

  // Génération du contenu HTML en utilisant la fonction map sur les données des recettes
  wrapper.innerHTML = map(data.recipes, item => {
    // Extraction des propriétés nécessaires de chaque recette
    let { id, image, name, time, description, ingredients } = item;

    // Génération des informations sur les ingrédients en utilisant la fonction map
    let info = map(ingredients, item => {
      let { ingredient, quantity, unit } = item;

      // Gestion des cas où la quantité ou l'unité est undefined
      quantity === undefined && (quantity = '');
      unit === undefined && (unit = '');

      // Retourne le HTML pour chaque ingrédient
      return `
          <div class="ingredient__info">
            <h3>${ingredient}</h3>
            <p>${quantity}<span>${unit}</span></p>
          </div>`;
    }).join('');

    // Retourne le HTML pour chaque carte de recette
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
                <h2>INGRÉDIENTS</h2>
                <article>
                  ${info}
                </article>
              </div>
            </div>
          </div>
        </article>
      </div>`;
  }).join('');

  // Appel de la fonction select pour la gestion des filtres
  select(data);
}
