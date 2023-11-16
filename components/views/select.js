'use strict';

import card from './card.js';
import tag from './tag.js';
import { map, filter } from '../utils/fx.js';

// Initialisation des tableaux de filtres pour les ingrédients, appareils et ustensiles
let checkIng = [];
let checkApp = [];
let checkUst = [];

// Fonction principale pour gérer les filtres
export default function select(data, arrIng, arrApp, arrUst) {
  // Sélection de l'élément du DOM pour les filtres
  const wrapper = document.querySelector('.filterContainer');

  // Initialisation des tableaux pour stocker les valeurs uniques d'ingrédients, appareils et ustensiles
  let getIng = [];
  let getApp = [];
  let getUst = [];

  // Extraction des données d'ingrédients, appareils et ustensiles de toutes les recettes
  map(data.recipes, all => {
    let { ingredients, appliance, ustensils } = all;

    // Extraction des ingrédients
    map(ingredients, item => {
      let { ingredient } = item;
      getIng.push(ingredient);
    });

    // Extraction des appareils
    getApp.push(appliance);

    // Extraction des ustensiles
    getUst.push(...ustensils);
  });

  // Création de listes d'ingrédients, appareils et ustensiles uniques
  const tagIng = [...new Set(getIng.sort())];
  const tagApp = [...new Set(getApp.sort())];
  const tagUst = [...new Set(getUst.sort())];

  // Génération des éléments HTML pour chaque liste de filtres
  let mapIng = map(
    filter(tagIng, tag => !checkIng.includes(tag)),
    text => `<li class="itemIngredient" onclick="handleIng(this)">${text}</li>`,
  ).join('');
  let mapApp = map(
    filter(tagApp, tag => !checkApp.includes(tag)),
    text => `<li class="itemAppareil" onclick="handleApp(this)">${text}</li>`,
  ).join('');
  let mapUst = map(
    filter(tagUst, tag => !checkUst.includes(tag)),
    text => `<li class="itemUstensile" onclick="handleUst(this)">${text}</li>`,
  ).join('');

  // Filtrage des éléments déjà sélectionnés lors de l'appel à la fonction
  arrIng !== undefined && (checkIng = filter(checkIng, tag => !arrIng.includes(tag)));
  arrApp !== undefined && (checkApp = filter(checkApp, tag => !arrApp.includes(tag)));
  arrUst !== undefined && (checkUst = filter(checkUst, tag => !arrUst.includes(tag)));

  // Définition des titres pour chaque liste de filtres
  const title = [{ name: 'Ingrédients' }, { name: 'Appareils' }, { name: 'Ustensiles' }];

  // Fonction pour générer les éléments HTML des listes de filtres
  function selectFx(title, mapIng, mapApp, mapUst) {
    return map(title, item => {
      const { name } = item;

      // Construction de la section pour chaque type de filtre (ingrédients, appareils, ustensiles)
      if (name === 'Ingrédients') {
        return `
          <div id="ing">
            <button class="btnFilter" onclick="handleToggle(this)">
              <p>${name}</p>
              <img src="./components/assets/images/arrowDown.svg" alt="" />
            </button>
            <div class="item">
              <div>
                <input type="search" class="fieldIngredient" name="fieldIng"/>
                <img src="./components/assets/images/icon_search.svg" alt="" />
              </div>
              <ul class="noCheck">
                <span class="errIngredient err"></span>
                ${mapIng}
              </ul>
            </div>
          </div>
        `;
      } else if (name === 'Appareils') {
        return `
          <div id="app">
            <button class="btnFilter" onclick="handleToggle(this)">
              <p>${name}</p>
              <img src="./components/assets/images/arrowDown.svg" alt="" />
            </button>
            <div class="item">
              <div>
                <input type="search" class="fieldAppareil"  name="fieldApp"/>
                <img src="./components/assets/images/icon_search.svg" alt="" />
              </div>
            <ul class="noCheck">
              <span class="errIngredient err"></span>
              ${mapApp}
            </ul>
          </div>
          </div>
        `;
      } else {
        return `
          <div id="ust">
            <button class="btnFilter" onclick="handleToggle(this)">
                <p>${name}</p>
                <img src="./components/assets/images/arrowDown.svg" alt="" />
              </button>
              <div class="item">
              <div>
                <input type="search" class="fieldUstensile" name="fieldUst"/>
                  <img src="./components/assets/images/icon_search.svg" alt="" />
                </div>
              <ul class="noCheck">
                <span class="errIngredient err"></span>
                ${mapUst}
              </ul>
            </div>
          </div>
        `;
      }
    }).join('');
  }

  // Génération des listes de filtres dans le DOM
  wrapper.innerHTML = selectFx(title, mapIng, mapApp, mapUst);

  // Fonction de gestion de l'affichage des filtres déroulants
  window.handleToggle = event => {
    const container = event.closest(':not(.btnFilter)');
    const btnFilter = event.closest('.btnFilter');
    const item = container.querySelector('.item');
    const img = container.querySelector('.btnFilter img');

    // Toggle pour afficher ou masquer les filtres
    item.style.display === 'none'
      ? ((btnFilter.style.borderBottomLeftRadius = '0rem'),
        (btnFilter.style.borderBottomRightRadius = '0rem'),
        (item.style.display = 'flex'),
        (img.style.transform = 'rotate(180deg)'))
      : ((btnFilter.style.borderBottomLeftRadius = '1.1rem'),
        (btnFilter.style.borderBottomRightRadius = '1.1rem'),
        (item.style.display = 'none'),
        (img.style.transform = 'rotate(0deg)'));
  };

  // Définition des éléments du DOM pour la recherche d'ingrédients, appareils et ustensiles
  const ing = document.querySelector('.fieldIngredient');
  const app = document.querySelector('.fieldAppareil');
  const ust = document.querySelector('.fieldUstensile');
  const errIng = document.querySelector('.errIngredient');
  const errApp = document.querySelector('.errAppareil');
  const errUst = document.querySelector('.errUstensil');
  const docIng = document.querySelector('#ing ul');
  const docApp = document.querySelector('#app ul');
  const docUst = document.querySelector('#ust ul');
  const errMessage = 'Veuillez entrer 3 caractères ou plus';

  // Fonction pour gérer les événements liés à la recherche d'ingrédients
  function ingFx() {
    ing.addEventListener('keyup', event => {
      let resultIng = '';

      // Vérification de la longueur de la saisie
      event.target.value.length <= 2
        ? ((resultIng = ''), (errIng.innerText = errMessage))
        : ((resultIng = event.target.name === 'fieldIng' && event.target.value),
          (errIng.innerText = ''),
          // Filtrage des ingrédients correspondant à la saisie et création des éléments de la liste
          (mapIng = map(
            filter(tagIng, tag => tag.includes(resultIng)),
            text => `<li class="itemIngredient" onclick="handleIng(this)">${text}</li>`,
          ).join('')),
          // Mise à jour de la liste des ingrédients affichée dans le DOM
          (docIng.innerHTML = `<ul class="noCheck">
            <spen class="errIngredient err"></spen>
            ${mapIng}
          </ul>`));

      // Réinitialisation de la liste lorsque la saisie est vide
      event.target.value.length === 0 &&
        ((errIng.innerText = ''),
        (mapIng = map(tagIng, text => `<li class="itemIngredient" onclick="handleIng(this)">${text}</li>`).join('')),
        (docIng.innerHTML = `<ul class="noCheck">
          <spen class="errIngredient err"></spen>
          ${mapIng}
        	</ul>`));
    });
  }

  function appFx() {
    app.addEventListener('keyup', event => {
      let resultApp = '';
      event.target.value.length <= 2
        ? ((resultApp = ''), (errApp.innerText = errMessage))
        : ((resultApp = event.target.name === 'fieldApp' && event.target.value),
          (errApp.innerText = ''),
          (mapApp = map(
            filter(tagApp, tag => tag.includes(resultApp)),
            text => `<li class="itemAppareil" onclick="handleApp(this)">${text}</li>`,
          ).join('')),
          (docApp.innerHTML = `<ul class="noCheck">
						<spen class="errIngredient err"></spen>
						${mapApp}
						</ul>`));
      event.target.value.length === 0 &&
        ((errApp.innerText = ''),
        (mapApp = map(tagApp, text => `<li class="itemAppareil" onclick="handleApp(this)">${text}</li>`).join('')),
        (docApp.innerHTML = `<ul class="noCheck">
					<spen class="errIngredient err"></spen>
					${mapApp}
					</ul>`));
    });
  }
  function ustFx() {
    ust.addEventListener('keyup', event => {
      let resultUst = '';
      event.target.value.length <= 2
        ? ((resultUst = ''), (errUst.innerText = errMessage))
        : ((resultUst = event.target.name === 'fieldUst' && event.target.value),
          (errUst.innerText = ''),
          (mapUst = map(
            filter(tagUst, tag => tag.includes(resultUst)),
            text => `<li class="itemUstensile" onclick="handleUst(this)">${text}</li>`,
          ).join('')),
          (docUst.innerHTML = `<ul class="noCheck">
						<spen class="errIngredient err"></spen>
						${mapUst}
						</ul>`));
      event.target.value.length === 0 &&
        ((errUst.innerText = ''),
        (mapUst = map(tagUst, text => `<li class="itemUstensile" onclick="handleUst(this)">${text}</li>`).join('')),
        (docUst.innerHTML = `<ul class="noCheck">
					<spen class="errIngredient err"></spen>
					${mapUst}
					</ul>`));
    });
  }

  // Appel des fonctions de gestion des événements
  ingFx();
  appFx();
  ustFx();

  // Fonction pour gérer la sélection d'un ingrédient
  window.handleIng = event => {
    checkIng.push(`${event.innerText}`);

    let resultIng = [];
    resultIng.push(event.innerText);

    let newData = [];
    // Filtrage des recettes contenant l'ingrédient sélectionné
    newData.push(...filter(data.recipes, value => value.ingredients.some(el => el.ingredient.includes(resultIng))));

    // Mise à jour des tags et affichage des nouvelles recettes
    tag(data, checkIng, checkApp, checkUst);
    newData = { recipes: newData };
    card(newData);
  };

  window.handleApp = event => {
    checkApp.push(`${event.innerText}`);
    let resultApp = [];
    let newData = [];
    resultApp.push(event.innerText);
    newData.push(...filter(data.recipes, value => value.appliance.includes(resultApp)));
    newData = { recipes: newData };
    tag(data, checkIng, checkApp, checkUst);
    card(newData);
  };
  window.handleUst = event => {
    checkUst.push(`${event.innerText}`);
    let resultUst = [];
    let newData = [];
    resultUst.push(event.innerText);
    newData.push(...filter(data.recipes, value => value.ustensils.some(el => el.includes(resultUst))));
    newData = { recipes: newData };
    tag(data, checkIng, checkApp, checkUst);
    card(newData);
  };
}
