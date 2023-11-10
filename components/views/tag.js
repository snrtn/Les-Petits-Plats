'use strict';

import card from './card.js';
import select from './select.js';

import { map, filter } from '../utils/fx.js';

// Fonction pour gérer les étiquettes
export default function tag(data, checkIng, checkApp, checkUst) {
  // Sélection des éléments d'étiquettes
  const tagsIng = document.querySelector('.tagsIngredient');
  const tagsApp = document.querySelector('.tagsAppareil');
  const tagsUst = document.querySelector('.tagsUstensile');

  // Rendu des étiquettes en fonction de checkIng, checkApp et checkUst
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

  // Tableaux pour stocker les étiquettes sélectionnées
  let arrIng = [];
  let arrApp = [];
  let arrUst = [];

  // Gestionnaires d'événements de clic sur les étiquettes
  window.handleIngTag = event => {
    arrIng.push(event.innerText);

    // Réinitialiser la liste de sélection
    select(data, arrIng, arrApp, arrUst);

    checkIng = filter(checkIng, tag => !arrIng.includes(tag));
    // Réinitialiser la liste d'étiquettes
    tag(data, checkIng, checkApp, checkUst);

    // Supprimer l'élément sélectionné
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

// Fonction pour gérer les effets des étiquettes
function tagFx(checkIng, checkApp, checkUst) {
  // Récupération des données depuis localStorage
  const origin = JSON.parse(localStorage.getItem('ORIGIN_DATA_KEY'));
  const searchData = JSON.parse(localStorage.getItem('SEARCH_DATA_KEY'));
  const isCheck = JSON.parse(localStorage.getItem('ISCHECK_KEY'));
  const search = JSON.parse(localStorage.getItem('SEARCH_KEY'));

  // Gestion de l'étiquette de recherche
  if (isCheck === true && search.length !== 0) {
    // Supprimer la recherche de checkIng si checkIng est vide
    if (checkIng.length === 0 || checkApp.length === 0 || checkUst.length === 0) {
      checkIng = filter(checkIng, ingredient => ingredient !== search);
    }

    // Ajouter la recherche à checkIng si elle n'est pas déjà présente
    if (!checkIng.includes(search)) {
      checkIng.push(search);
    }
  }

  // Vérification des conditions isCheck et search
  if (isCheck === true && search.length !== 0 && !checkIng.includes(search)) {
    checkIng.push(search);
  }

  // Tableau pour stocker les recettes filtrées
  let newData = [];

  // Filtrer les recettes en fonction des étiquettes sélectionnées
  if (checkIng.length || checkApp.length || checkUst.length) {
    let uniqueRecipes = new Set();

    // Filtrer les recettes en fonction des ingrédients sélectionnés
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

    // Convertir l'ensemble en tableau et filtrer les valeurs nulles
    newData = filter(Array.from(uniqueRecipes), Boolean);

    // Filtrer davantage en fonction des étiquettes sélectionnées
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
    // Rendu des cartes en fonction des données stockées ou des données de recherche
    if (isCheck) {
      card(searchData);
    } else {
      card(origin);
    }
    return;
  }

  // Création d'un objet avec les recettes filtrées
  newData = { recipes: newData };

  // Rendu des cartes en fonction des recettes filtrées
  card(newData);
}
