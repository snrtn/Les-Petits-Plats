'use strict';

import select from './select.js'; // Importation de la fonction de sélection depuis le fichier 'select.js'
import { map } from '../utils/fx.js'; // Importation de la fonction 'map' depuis le fichier d'utilitaires 'fx.js'

// Définition de la fonction 'card' qui génère et affiche les cartes de recettes en fonction des données passées en paramètre.
export default function card(data) {
  // Sélection des éléments du DOM nécessaires
  const wrapper = document.querySelector('.my__card'); // Conteneur principal pour les cartes
  const count = document.querySelector('.my__num'); // Élément affichant le nombre total de recettes
  const notFind = document.querySelector('.my__notFind'); // Élément affichant un message si aucune recette n'est trouvée

  const errMessage = "Il n'y a pas des recettes correspondant"; // Message d'erreur si aucune recette n'est trouvée

  // Vérification et affichage du message d'erreur si aucune recette n'est trouvée
  data.recipes.length <= 0 ? (notFind.innerHTML = errMessage) : (notFind.innerHTML = '');

  // Affichage du nombre total de recettes
  count.innerHTML = `${data.recipes.length} recettes`;

  // Génération des cartes de recettes à partir des données fournies
  wrapper.innerHTML = map(data.recipes, item => {
    let { id, image, name, time, description, ingredients } = item;

    // Génération des informations sur les ingrédients
    let info = map(ingredients, item => {
      let { ingredient, quantity, unit } = item;

      // Vérification de l'existence de la quantité et de l'unité, et assignation de chaînes vides si non définies
      quantity === undefined && (quantity = '');
      unit === undefined && (unit = '');

      // Template literals pour chaque information sur l'ingrédient
      return `
          <div class="ingredient__info">
            <h3>${ingredient}</h3>
            <p>${quantity}<span>${unit}</span></p>
          </div>`;
    }).join('');

    // Template literals pour chaque carte de recette
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
  }).join('');

  // Appel de la fonction de sélection pour mettre à jour les filtres
  select(data);
}
