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
    // Si la recherche est activée et qu'une recherche spécifique a été effectuée...

    // Vérification si le tag d'ingrédient de la recherche est inclus dans les tags d'ingrédients sélectionnés
    if (checkIng.includes(search)) {
      // Si le tag d'ingrédient est présent dans la liste, il est exclu et la recherche est mise à jour

      // Vérification si la liste des tags d'ingrédients est vide
      if (checkIng.length < 1) {
        // Si la liste est vide, appeler la fonction tagFx avec la recherche comme seul tag
        tagFx(checkIng, checkApp, checkUst, [search], [], []);
      } else {
        // Si la liste n'est pas vide, trouver l'index du tag de recherche et le retirer de la liste
        const searchIndex = checkIng.indexOf(search);
        checkIng.splice(searchIndex, 1);

        // Ensuite, appeler la fonction tagFx avec des listes vides pour les autres types de tags
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
      // Gestion des ingrédients
      // Boucle à travers chaque ingrédient sélectionné
      for (let i = 0; i < checkIng.length; i++) {
        // Récupération de l'ingrédient en cours d'itération
        const ingredient = checkIng[i];

        // Boucle à travers chaque recette dans les données d'origine
        for (let j = 0; j < searchData.recipes.length; j++) {
          // Récupération de la recette en cours d'itération
          const recipe = searchData.recipes[j];

          // Vérification si l'ingrédient est inclus dans les ingrédients de la recette
          if (recipe.ingredients.some(recipeIngredient => recipeIngredient.ingredient.includes(ingredient))) {
            // Ajout de la recette à l'ensemble de recettes uniques
            uniqueRecipes = new Set([...uniqueRecipes, recipe]);
          }
        }
      }

      // Gestion des appareils
      for (let i = 0; i < checkApp.length; i++) {
        const appareil = checkApp[i];
        for (let j = 0; j < searchData.recipes.length; j++) {
          const recipe = searchData.recipes[j];
          if (recipe.appliance.includes(appareil)) {
            uniqueRecipes = new Set([...uniqueRecipes, recipe]);
          }
        }
      }

      // Gestion des ustensiles
      for (let i = 0; i < checkUst.length; i++) {
        const ustensil = checkUst[i];
        for (let j = 0; j < searchData.recipes.length; j++) {
          const recipe = searchData.recipes[j];
          if (recipe.ustensils.some(recipeUstensil => recipeUstensil.includes(ustensil))) {
            uniqueRecipes = new Set([...uniqueRecipes, recipe]);
          }
        }
      }

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
      // checkIng.every(ing => recipe.ingredients.some(recipeIng => recipeIng.ingredient.includes(ing)))

      // Ce code utilise les méthodes .every() et .some() des tableaux en JavaScript pour vérifier une condition entre deux tableaux : checkIng et recipe.ingredients.

      // checkIng.every(ing => ...): Cette partie du code vérifie si la condition spécifiée dans la fonction fléchée est vraie pour chaque élément du tableau checkIng. Le paramètre ing représente chaque élément du tableau checkIng.

      // recipe.ingredients.some(recipeIng => ...): Cette partie du code vérifie si la condition spécifiée dans la fonction fléchée est vraie pour au moins un élément du tableau recipe.ingredients. Le paramètre recipeIng représente chaque élément du tableau recipe.ingredients.

      // recipeIng.ingredient.includes(ing): Cette partie vérifie si la valeur de la propriété ingredient de l'objet recipeIng contient la valeur ing. En d'autres termes, elle vérifie si la valeur actuelle de ingredient pour l'élément recipeIng en cours d'itération contient la valeur ing en cours d'itération dans le tableau checkIng.

      // En résumé, le code vérifie si "tous les éléments du tableau checkIng sont inclus dans la propriété ingredient d'au moins un élément du tableau recipe.ingredients". Si c'est le cas, l'expression entière renvoie true, sinon elle renvoie false. Ce code peut être utilisé pour vérifier si tous les ingrédients de checkIng sont inclus dans au moins un élément de recipe.ingredients.

      //
      // Conversion en objet pour la structure des données
      newSearchData = { recipes: newSearchData };
    }
  }

  // Gestion des cas où la recherche est désactivée
  if (isCheck === false) {
    if (checkIng.length || checkApp.length || checkUst.length) {
      for (let i = 0; i < checkIng.length; i++) {
        const ingredient = checkIng[i];
        for (let j = 0; j < origin.recipes.length; j++) {
          const recipe = origin.recipes[j];
          if (recipe.ingredients.some(recipeIngredient => recipeIngredient.ingredient.includes(ingredient))) {
            uniqueRecipes = new Set([...uniqueRecipes, recipe]);
          }
        }
      }
      for (let i = 0; i < checkApp.length; i++) {
        const appareil = checkApp[i];
        for (let j = 0; j < origin.recipes.length; j++) {
          const recipe = origin.recipes[j];
          if (recipe.appliance.includes(appareil)) {
            uniqueRecipes = new Set([...uniqueRecipes, recipe]);
          }
        }
      }
      for (let i = 0; i < checkUst.length; i++) {
        const ustensil = checkUst[i];
        for (let j = 0; j < origin.recipes.length; j++) {
          const recipe = origin.recipes[j];
          if (recipe.ustensils.some(recipeUstensil => recipeUstensil.includes(ustensil))) {
            uniqueRecipes = new Set([...uniqueRecipes, recipe]);
          }
        }
      }
      newData = filter(Array.from(uniqueRecipes), Boolean);
      newData = filter(
        newData,
        recipe =>
          checkIng.every(ing => recipe.ingredients.some(recipeIng => recipeIng.ingredient.includes(ing))) &&
          checkApp.every(app => recipe.appliance.includes(app)) &&
          checkUst.every(ust => recipe.ustensils.some(recipeUst => recipeUst.includes(ust))),
      );
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
