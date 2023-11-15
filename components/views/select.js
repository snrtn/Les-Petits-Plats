'use strict';

import card from './card.js';
import tag from './tag.js';

import { map, filter } from '../utils/fx.js';

let checkIng = [];
let checkApp = [];
let checkUst = [];

export default function select(data, arrIng, arrApp, arrUst) {
  const wrapper = document.querySelector('.filterContainer');

  let getIng = [];
  let getApp = [];
  let getUst = [];
  // get select item
  map(data.recipes, all => {
    let { ingredients, appliance, ustensils } = all;
    map(ingredients, item => {
      let { ingredient } = item;
      getIng.push(ingredient);
    });
    getApp.push(appliance);
    getUst.push(...ustensils);
  });

  // delete duplication
  const tagIng = [...new Set(getIng.sort())];
  const tagApp = [...new Set(getApp.sort())];
  const tagUst = [...new Set(getUst.sort())];

  // create selecte list / Template literals
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

  // remove selected item
  arrIng !== undefined && (checkIng = filter(checkIng, tag => !arrIng.includes(tag)));
  arrApp !== undefined && (checkApp = filter(checkApp, tag => !arrApp.includes(tag)));
  arrUst !== undefined && (checkUst = filter(checkUst, tag => !arrUst.includes(tag)));

  const title = [{ name: 'Ingrédients' }, { name: 'Appareils' }, { name: 'Ustensiles' }];
  function selectFx(title, mapIng, mapApp, mapUst) {
    return map(title, item => {
      const { name } = item;

      // conditional rendering / Template literals
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
                <spen class="errIngredient err"></spen>
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
              <spen class="errAppareil err"></spen>
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
                <spen class="errUstensil err"></spen>
                ${mapUst}
              </ul>
            </div>
          </div>
        `;
      }
    }).join('');
  }
  wrapper.innerHTML = selectFx(title, mapIng, mapApp, mapUst);

  // toggle dropdown
  window.handleToggle = event => {
    const container = event.closest(':not(.btnFilter)');
    const btnFilter = event.closest('.btnFilter');
    const item = container.querySelector('.item');
    const img = container.querySelector('.btnFilter img');

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
  // input validation
  function ingFx() {
    ing.addEventListener('keyup', event => {
      let resultIng = '';

      // field validation
      event.target.value.length <= 2
        ? ((resultIng = ''), (errIng.innerText = errMessage))
        : ((resultIng = event.target.name === 'fieldIng' && event.target.value),
          (errIng.innerText = ''),
          (mapIng = map(
            filter(tagIng, tag => tag.includes(resultIng)),
            text => `<li class="itemIngredient" onclick="handleIng(this)">${text}</li>`,
          ).join('')),
          (docIng.innerHTML = `<ul class="noCheck">
            <spen class="errIngredient err"></spen>
            ${mapIng}
          </ul>`));

      // field reset
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
  ingFx();
  appFx();
  ustFx();

  // list onclick event
  window.handleIng = event => {
    checkIng.push(`${event.innerText}`);

    let resultIng = [];
    resultIng.push(event.innerText);

    let newData = [];
    newData.push(...filter(data.recipes, value => value.ingredients.some(el => el.ingredient.includes(resultIng))));

    // donner check list
    tag(data, checkIng, checkApp, checkUst);

    newData = { recipes: newData };
    // reset card item
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
