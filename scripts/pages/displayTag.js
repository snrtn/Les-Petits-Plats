'use strict';

import { _map, _filter } from '../utils/_.js';

const filter = document.querySelector('.filterContainer');
let resultIngredient = '',
  resultAppareil = '',
  resultUstensil = '';

export default function displayTag(
  ingredientTag,
  appareilTag,
  ustensileTag,
  ingredientCheck,
  appareilCheck,
  ustensilCheck,
) {
  const arrName = [{ name: 'Ingrédients' }, { name: 'Appareils' }, { name: 'Ustensiles' }];

  let mapIngredient = _map(
    _filter(ingredientTag, tag => !ingredientCheck.includes(tag)),
    text => `<li class="itemIngredient" onclick="handleIngredient(this)">${text}</li>`,
  ).join('');
  let mapAppareil = _map(
    _filter(appareilTag, tag => !appareilCheck.includes(tag)),
    text => `<li class="itemAppareil" onclick="handleAppareil(this)">${text}</li>`,
  ).join('');
  let mapUstensil = _map(
    _filter(ustensileTag, tag => !ustensilCheck.includes(tag)),
    text => `<li class="itemUstensile" onclick="handleUstensile(this)">${text}</li>`,
  ).join('');

  function start(arrName, mapIngredient, mapAppareil, mapUstensil) {
    return _map(arrName, items => {
      const { name } = items;
      if (name === 'Ingrédients') {
        return `
          <div id="ing">
            <button class="btnFilter" onclick="handleFilter(this)">
              <p>${name}</p>
              <img src="/assets/images/arrowDown.svg" alt="" />
            </button>
            <div class="item">
              <div>
                <input type="search" class="fieldIngredient" name="fieldIngredient"/>
                <img src="'../../assets/images/icon_search.svg" alt="" />
              </div>
              <ul class="noCheck">
                <spen class="errIngredient err"></spen>
                ${mapIngredient}
              </ul>
            </div>
          </div>
        `;
      } else if (name === 'Appareils') {
        return `
          <div id="app">
            <button class="btnFilter" onclick="handleFilter(this)">
              <p>${name}</p>
              <img src="/assets/images/arrowDown.svg" alt="" />
            </button>
            <div class="item">
              <div>
                <input type="search" class="fieldAppareil"  name="fieldAppareil"/>
                <img src="'../../assets/images/icon_search.svg" alt="" />
              </div>
            <ul class="noCheck">
              <spen class="errAppareil err"></spen>
              ${mapAppareil}
            </ul>
          </div>
          </div>
        `;
      } else {
        return `
          <div id="ust">
            <button class="btnFilter" onclick="handleFilter(this)">
                <p>${name}</p>
                <img src="/assets/images/arrowDown.svg" alt="" />
              </button>
              <div class="item">
              <div>
                <input type="search" class="fieldUstensile" name="fieldUstensile"/>
                  <img src="'../../assets/images/icon_search.svg" alt="" />
                </div>
              <ul class="noCheck">
                <spen class="errUstensil err"></spen>
                ${mapUstensil}
              </ul>
            </div>
          </div>
        `;
      }
    }).join('');
  }
  filter.innerHTML = start(arrName, mapIngredient, mapAppareil, mapUstensil);

  function eventIng() {
    const ingredient = document.querySelector('.fieldIngredient'),
      errIngredient = document.querySelector('.errIngredient'),
      err = 'Veuillez entrer 3 caractères ou plus',
      resultIng = document.querySelector('#ing ul');

    ingredient.addEventListener('keyup', event => {
      const target = event.target;
      target.value.length <= 2
        ? ((resultIngredient = ''), (errIngredient.innerText = err))
        : ((resultIngredient = target.name === 'fieldIngredient' && target.value),
          (errIngredient.innerText = ''),
          (mapIngredient = _map(
            ingredientTag.filter(tag => tag.includes(resultIngredient)),
            text => `<li class="itemIngredient" onclick="handleIngredient(this)">${text}</li>`,
          ).join('')),
          (resultIng.innerHTML = `<ul class="noCheck">
            <spen class="errIngredient err"></spen>
            ${mapIngredient}
          </ul>`));
      target.value.length === 0 &&
        ((errIngredient.innerText = ''),
        (mapIngredient = _map(
          _filter(ingredientTag, tag => !ingredientCheck.includes(tag)),
          text => `<li class="itemIngredient" onclick="handleIngredient(this)">${text}</li>`,
        ).join('')),
        (resultIng.innerHTML = `<ul class="noCheck">
            <spen class="errIngredient err"></spen>
            ${mapIngredient}
          </ul>`));
    });
  }
  function eventApp() {
    const appareil = document.querySelector('.fieldAppareil'),
      errAppareil = document.querySelector('.errAppareil'),
      err = 'Veuillez entrer 3 caractères ou plus',
      resultApp = document.querySelector('#app ul');

    appareil.addEventListener('keyup', event => {
      const target = event.target;
      target.value.length <= 2
        ? ((resultAppareil = ''), (errAppareil.innerText = err))
        : ((resultAppareil = target.name === 'fieldAppareil' && target.value),
          (errAppareil.innerText = ''),
          (mapAppareil = _map(
            appareilTag.filter(tag => tag.includes(resultAppareil)),
            text => `<li class="itemAppareil" onclick="handleAppareil(this)">${text}</li>`,
          ).join('')),
          (resultApp.innerHTML = `<ul class="noCheck">
            <spen class="errAppareil err"></spen>
            ${mapAppareil}
          </ul>`));
      target.value.length === 0 &&
        ((errAppareil.innerText = ''),
        (mapAppareil = _map(
          _filter(appareilTag, tag => !appareilCheck.includes(tag)),
          text => `<li class="itemAppareil" onclick="handleAppareil(this)">${text}</li>`,
        ).join('')),
        (resultApp.innerHTML = `<ul class="noCheck">
            <spen class="errAppareil err"></spen>
            ${mapAppareil}
          </ul>`));
    });
  }
  function eventUst() {
    const ustensil = document.querySelector('.fieldUstensile'),
      errUstensil = document.querySelector('.errUstensil'),
      err = 'Veuillez entrer 3 caractères ou plus',
      resultUst = document.querySelector('#ust ul');

    ustensil.addEventListener('keyup', event => {
      const target = event.target;
      target.value.length <= 2
        ? ((resultUstensil = ''), (errUstensil.innerText = err))
        : ((resultUstensil = target.name === 'fieldUstensile' && target.value),
          (errUstensil.innerText = ''),
          (mapUstensil = _map(
            ustensileTag.filter(tag => tag.includes(resultUstensil)),
            text => `<li class="itemUstensile" onclick="handleUstensile(this)">${text}</li>`,
          ).join('')),
          (resultUst.innerHTML = `<ul class="noCheck">
            <spen class="errUstensil err"></spen>
            ${mapUstensil}
          </ul>`));
      target.value.length === 0 &&
        ((errUstensil.innerText = ''),
        (mapUstensil = _map(
          _filter(ustensileTag, tag => !appareilCheck.includes(tag)),
          text => `<li class="itemUstensile" onclick="handleUstensile(this)">${text}</li>`,
        ).join('')),
        (resultUst.innerHTML = `<ul class="noCheck">
            <spen class="errUstensil err"></spen>
            ${mapUstensil}
          </ul>`));
    });
  }
  eventIng();
  eventApp();
  eventUst();
}
