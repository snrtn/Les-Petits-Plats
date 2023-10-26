'use strict';

import card from './card.js';
import tag from './tag.js';

let checkIng = [];
let checkApp = [];
let checkUst = [];

export default function select(data, arrIng, arrApp, arrUst) {
  const wrapper = document.querySelector('.filterContainer');

  let getIng = [];
  let getApp = [];
  let getUst = [];
  // trier select item
  data.recipes.map(all => {
    let { ingredients, appliance, ustensils } = all;
    ingredients.map(item => {
      let { ingredient } = item;
      getIng.push(ingredient);
    });
    getApp.push(appliance);
    getUst.push(...ustensils);
  });

  // delete duplication
  let tagIng = getIng
    .sort()
    .reduce((unique, ingredient) => (unique.indexOf(ingredient) !== -1 ? unique : [...unique, ingredient]), []);
  let tagApp = getApp
    .sort()
    .reduce((unique, appareil) => (unique.indexOf(appareil) !== -1 ? unique : [...unique, appareil]), []);
  let tagUst = getUst
    .sort()
    .reduce((unique, ustensil) => (unique.indexOf(ustensil) !== -1 ? unique : [...unique, ustensil]), []);

  // view list
  // aller à line 243: onclick event
  let mapIng = tagIng
    .filter(tag => !checkIng.includes(tag))
    .map(text => `<li class="itemIngredient" onclick="handleIng(this)">${text}</li>`)
    .join('');
  let mapApp = tagApp
    .filter(tag => !checkApp.includes(tag))
    .map(text => `<li class="itemAppareil" onclick="handleApp(this)">${text}</li>`)
    .join('');
  let mapUst = tagUst
    .filter(tag => !checkUst.includes(tag))
    .map(text => `<li class="itemUstensile" onclick="handleUst(this)">${text}</li>`)
    .join('');

  // retrier select item
  arrIng !== undefined && (checkIng = checkIng.filter(tag => !arrIng.includes(tag)));
  arrApp !== undefined && (checkApp = checkApp.filter(tag => !arrApp.includes(tag)));
  arrUst !== undefined && (checkUst = checkUst.filter(tag => !arrUst.includes(tag)));

  const title = [{ name: 'Ingrédients' }, { name: 'Appareils' }, { name: 'Ustensiles' }];
  // select
  function selectFx(title, mapIng, mapApp, mapUst) {
    return title
      .map(item => {
        const { name } = item;

        // view select
        // 01 aller à line 134: toggle dropdown
        // 02 aller à line 162: recherche
        if (name === 'Ingrédients') {
          return `
          <div id="ing">
						<!-- 01 -->
            <button class="btnFilter" onclick="handleToggle(this)">
              <p>${name}</p>
              <img src="./components/assets/images/arrowDown.svg" alt="" />
            </button>
            <div class="item">
              <div>
                <!-- 02 -->
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
      })
      .join('');
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
  // Ingredient input validation
  function ingFx() {
    ing.addEventListener('keyup', event => {
      let resultIng = '';

      // field validation
      event.target.value.length <= 2
        ? ((resultIng = ''), (errIng.innerText = errMessage))
        : ((resultIng = event.target.name === 'fieldIng' && event.target.value),
          (errIng.innerText = ''),
          (mapIng = tagIng
            .filter(tag => tag.includes(resultIng))
            .map(text => `<li class="itemIngredient" onclick="handleIng(this)">${text}</li>`)
            .join('')),
          (docIng.innerHTML = `<ul class="noCheck">
            <spen class="errIngredient err"></spen>
            ${mapIng}
          </ul>`));

      // field reset
      event.target.value.length === 0 &&
        ((errIng.innerText = ''),
        (mapIng = tagIng.map(text => `<li class="itemIngredient" onclick="handleIng(this)">${text}</li>`).join('')),
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
          (mapApp = tagApp
            .filter(tag => tag.includes(resultApp))
            .map(text => `<li class="itemAppareil" onclick="handleApp(this)">${text}</li>`)
            .join('')),
          (docApp.innerHTML = `<ul class="noCheck">
						<spen class="errIngredient err"></spen>
						${mapApp}
						</ul>`));
      event.target.value.length === 0 &&
        ((errApp.innerText = ''),
        (mapApp = tagApp.map(text => `<li class="itemAppareil" onclick="handleApp(this)">${text}</li>`).join('')),
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
          (mapUst = tagUst
            .filter(tag => tag.includes(resultUst))
            .map(text => `<li class="itemUstensile" onclick="handleUst(this)">${text}</li>`)
            .join('')),
          (docUst.innerHTML = `<ul class="noCheck">
						<spen class="errIngredient err"></spen>
						${mapUst}
						</ul>`));
      event.target.value.length === 0 &&
        ((errUst.innerText = ''),
        (mapUst = tagUst.map(text => `<li class="itemUstensile" onclick="handleUst(this)">${text}</li>`).join('')),
        (docUst.innerHTML = `<ul class="noCheck">
					<spen class="errIngredient err"></spen>
					${mapUst}
					</ul>`));
    });
  }
  ingFx();
  appFx();
  ustFx();

  // Ingredient list onclick event
  window.handleIng = event => {
    checkIng.push(`${event.innerText}`);

    let resultIng = [];
    resultIng.push(event.innerText);

    let newData = [];
    newData.push(...data.recipes.filter(value => value.ingredients.some(el => el.ingredient.includes(resultIng))));

    // retrier tag item
    tag(data, checkIng, checkApp, checkUst);

    newData = { recipes: newData };
    // retrier card item
    card(newData);
  };
  window.handleApp = event => {
    checkApp.push(`${event.innerText}`);
    let resultApp = [];
    let newData = [];
    resultApp.push(event.innerText);
    newData.push(...data.recipes.filter(value => value.appliance.includes(resultApp)));
    newData = { recipes: newData };
    tag(data, checkIng, checkApp, checkUst);
    card(newData);
  };
  window.handleUst = event => {
    checkUst.push(`${event.innerText}`);
    let resultUst = [];
    let newData = [];
    resultUst.push(event.innerText);
    newData.push(...data.recipes.filter(value => value.ustensils.some(el => el.includes(resultUst))));
    newData = { recipes: newData };
    tag(data, checkIng, checkApp, checkUst);
    card(newData);
  };
}
