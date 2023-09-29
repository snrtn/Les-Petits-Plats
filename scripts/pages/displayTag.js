"use strict";

const filterContainer = document.querySelector('.filterContainer');

const nameArr = [
  { name: 'Ingrédients'},
  { name: 'Appareils'},
  { name: 'Ustensiles'}
]; 

const displayTag = (arrIngredients, arrAppareils, arrUstensiles, arrIngredientsChoice, arrAppareilsChoice, arrUstensilesChoice) => {

  // différence entre deux ensembles
  let differenceIngredients = arrIngredients.filter(x => !arrIngredientsChoice.includes(x));
  let differenceAppareils = arrAppareils.filter(x => !arrAppareilsChoice.includes(x));
  let differenceUstensiles = arrUstensiles.filter(x => !arrUstensilesChoice.includes(x));

  // display Ingrédients & Appareils &Ustensiles
  let mapIngredients = differenceIngredients.map((index) => {
    return `
      <li onclick="handleIngredient(this)">${index}</li>
    `
  }).join('');
  let mapAppareils = differenceAppareils.map((index) => {
    return `
      <li onclick="handleAppareils(this)">${index}</li>
    `
  }).join('');
  let mapUstensiles = differenceUstensiles.map((index) => {
    return `
      <li onclick="handleUstensiles(this)">${index}</li>
    `
  }).join('');

  
  // display tags
  let item = nameArr.map((items) => {
    let { name } = items;
    
    if(name === "Ingrédients"){
      return `
        <div>
          <button class="btnFilter" onclick="handleFilter(this)">
            <p>${name}</p>
            <img src="/assets/images/arrowDown.svg" alt="" />
          </button>
          <div class="item">
            <div>
              <input type="search" />
              <img src="'../../assets/images/icon_search.svg" alt="" />
            </div>
            <ul class="noCheck">
              ${mapIngredients}
            </ul>
          </div>
        </div>
      `;
    } else if (name === "Appareils") {
      return `
        <div>
          <button class="btnFilter" onclick="handleFilter(this)">
            <p>${name}</p>
            <img src="/assets/images/arrowDown.svg" alt="" />
          </button>
          <div class="item">
            <div>
              <input type="search"/>
              <img src="'../../assets/images/icon_search.svg" alt="" />
            </div>
            <ul class="noCheck">
              ${mapAppareils}
            </ul>
          </div>
        </div>
      `;
    } else {
      return `
        <div>
          <button class="btnFilter" onclick="handleFilter(this)">
            <p>${name}</p>
            <img src="/assets/images/arrowDown.svg" alt="" />
          </button>
          <div class="item">
            <div>
              <input type="search"/>
              <img src="'../../assets/images/icon_search.svg" alt="" />
            </div>
            <ul class="noCheck">
              ${mapUstensiles}
            </ul>
          </div>
        </div>
      `;
    }
    
  })
  .join("");
  filterContainer.innerHTML = item;
};

export default displayTag;

