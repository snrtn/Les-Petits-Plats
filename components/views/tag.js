'use strict';

import card from './card.js';
import select from './select.js';
import { map, filter } from '../utils/fx.js';

// Fonction principale pour gérer les tags
export default function tag(data, checkIng, checkApp, checkUst) {
  // Sélection des éléments HTML pour les tags d'ingrédients, appareils, et ustensiles
  const tagsIng = document.querySelector('.tagsIngredient');
  const tagsApp = document.querySelector('.tagsAppareil');
  const tagsUst = document.querySelector('.tagsUstensile');

  // Mise à jour des tags d'ingrédients dans la section HTML correspondante
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

  // Initialisation des listes pour stocker les tags sélectionnés
  let arrIng = [];
  let arrApp = [];
  let arrUst = [];

  // Définition des fonctions pour gérer la suppression des tags lorsqu'ils sont cliqués
  window.handleIngTag = event => {
    // Ajout du tag sélectionné à la liste
    arrIng.push(event.innerText);

    // Appel de la fonction de filtrage avec les nouvelles listes de tags
    select(data, arrIng, arrApp, arrUst);

    // Filtrage des tags pour exclure le tag sélectionné
    checkIng = filter(checkIng, tag => !arrIng.includes(tag));

    // Mise à jour des tags dans l'interface utilisateur
    tag(data, checkIng, checkApp, checkUst);

    // Appel de la fonction pour afficher les résultats filtrés
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

// Fonction pour gérer l'affichage des résultats filtrés
function tagFx(checkIng, checkApp, checkUst) {
  // Récupération des données originales, des données de recherche, et des états de vérification depuis le stockage local
  const origin = JSON.parse(localStorage.getItem('ORIGIN_DATA_KEY'));
  const searchData = JSON.parse(localStorage.getItem('SEARCH_DATA_KEY'));
  const isCheck = JSON.parse(localStorage.getItem('ISCHECK_KEY'));
  const search = JSON.parse(localStorage.getItem('SEARCH_KEY'));

  // Vérification de l'état de recherche et du contenu de la variable de recherche
  if (isCheck && search.length > 0) {
    // Si la recherche est active et qu'une recherche spécifique a été effectuée...
    if (checkIng.includes(search)) {
      // Si le tag d'ingrédient est présent dans la liste, il est exclu et la recherche est mise à jour
      if (checkIng.length < 1) {
        tagFx(checkIng, checkApp, checkUst, [search], [], []);
      } else {
        const searchIndex = checkIng.indexOf(search);
        checkIng.splice(searchIndex, 1);
        tagFx(checkIng, checkApp, checkUst, [], [], []);
      }
    }
  }

  // Initialisation des listes pour stocker les résultats filtrés
  let newData = [];
  let newSearchData = [];
  let uniqueRecipes = new Set();

  // Gestion des cas où la recherche est activée ou désactivée
  if (isCheck === true) {
    // Si la recherche est activée...
    if (checkIng.length || checkApp.length || checkUst.length) {
      // Filtrage des données de recherche en fonction des tags sélectionnés
      checkIng.forEach(ingredient => {
        uniqueRecipes = new Set([
          ...uniqueRecipes,
          ...filter(searchData.recipes, tag =>
            tag.ingredients.some(recipeIngredient => recipeIngredient.ingredient.includes(ingredient)),
          ),
        ]);
      });

      checkApp.forEach(appareil => {
        uniqueRecipes = new Set([
          ...uniqueRecipes,
          ...filter(searchData.recipes, tag => tag.appliance.includes(appareil)),
        ]);
      });

      checkUst.forEach(ustensil => {
        uniqueRecipes = new Set([
          ...uniqueRecipes,
          ...filter(searchData.recipes, tag => tag.ustensils.some(recipeUstensil => recipeUstensil.includes(ustensil))),
        ]);
      });

      // Filtrage des recettes uniques et conversion en tableau
      newSearchData = filter(Array.from(uniqueRecipes), Boolean);

      // Filtrage additionnel en fonction des tags sélectionnés
      newSearchData = filter(
        newSearchData,
        recipe =>
          checkIng.every(ing => recipe.ingredients.some(recipeIng => recipeIng.ingredient.includes(ing))) &&
          checkApp.every(app => recipe.appliance.includes(app)) &&
          checkUst.every(ust => recipe.ustensils.some(recipeUst => recipeUst.includes(ust))),
      );

      // Conversion en objet pour la structure des données
      newSearchData = { recipes: newSearchData };
    }
  }

  // Gestion des cas où la recherche est désactivée
  if (isCheck === false) {
    // Si la recherche est désactivée...
    if (checkIng.length || checkApp.length || checkUst.length) {
      // Filtrage des données originales en fonction des tags sélectionnés
      checkIng.forEach(ingredient => {
        uniqueRecipes = new Set([
          ...uniqueRecipes,
          ...filter(origin.recipes, tag =>
            tag.ingredients.some(recipeIngredient => recipeIngredient.ingredient.includes(ingredient)),
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

      // Filtrage des recettes uniques et conversion en tableau
      newData = filter(Array.from(uniqueRecipes), Boolean);

      // Filtrage additionnel en fonction des tags sélectionnés
      newData = filter(
        newData,
        recipe =>
          checkIng.every(ing => recipe.ingredients.some(recipeIng => recipeIng.ingredient.includes(ing))) &&
          checkApp.every(app => recipe.appliance.includes(app)) &&
          checkUst.every(ust => recipe.ustensils.some(recipeUst => recipeUst.includes(ust))),
      );

      // Conversion en objet pour la structure des données
      newData = { recipes: newData };
    }
  }

  // Gestion des cas spécifiques d'affichage des résultats
  if (
    isCheck === true &&
    search.length > 0 &&
    checkIng.length === 0 &&
    checkApp.length === 0 &&
    checkUst.length === 0
  ) {
    // Affichage des résultats de recherche
    card(searchData);
  } else if (
    isCheck === false &&
    search.length === 0 &&
    checkIng.length === 0 &&
    checkApp.length === 0 &&
    checkUst.length === 0
  ) {
    // Affichage des données originales
    card(origin);
  } else {
    if (isCheck === true) {
      card(newSearchData);
    } else {
      card(newData);
    }
  }
}
