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
      <li class="itemIngredient" onclick="handleIngredient(this)">${index}</li>
    `
  }).join('');
  let mapAppareils = differenceAppareils.map((index) => {
    return `
      <li class="itemAppareil" onclick="handleAppareils(this)">${index}</li>
    `
  }).join('');
  let mapUstensiles = differenceUstensiles.map((index) => {
    return `
      <li class="itemUstensile" onclick="handleUstensiles(this)">${index}</li>
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
              <input type="search" class="fieldIngredient" name="fieldIngredient"/>
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
              <input type="search" class="fieldAppareil"  name="fieldAppareil"/>
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
              <input type="search" class="fieldUstensile" name="fieldUstensile"/>
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

  
  const fieldIngredient = document.querySelector('.fieldIngredient');
  const fieldAppareil = document.querySelector('.fieldAppareil');
  const fieldUstensile = document.querySelector('.fieldUstensile');
  const itemIngredient = document.querySelectorAll('.itemIngredient');

  
  let resultIngredient = "";
  let resultAppareil = "";
  let resultUstensile = "";


  // onchange target.value
  fieldIngredient.addEventListener('change', function (event) {
    if ( event.target.value.length >= 3 ) {
      resultIngredient = event.target.name === 'fieldIngredient' && event.target.value;

      onchangeIngredient(resultIngredient);
    } else {
      resultIngredient = "";
    }
  })

  function onchangeIngredient(resultIngredient){
    for(let i = 0; i < differenceIngredients.length; i++) {
      console.log(itemIngredient[i]);
    }
    

    for (let i = 0; i < differenceIngredients.length; i++) {
      if (differenceIngredients[i] === resultIngredient){ 
        differenceIngredients.indexOf(resultIngredient)
      }
    }  
  }
  

  fieldAppareil.addEventListener('change', function (event) {
    if ( event.target.value.length >= 3 ) {
      resultAppareil = event.target.name === 'fieldAppareil' && event.target.value;

      console.log(resultAppareil);
    } else {
      resultAppareil = "";
    }
  })
  fieldUstensile.addEventListener('change', function (event) {
    if ( event.target.value.length >= 3 ) {
      resultUstensile = event.target.name === 'fieldUstensile' && event.target.value;

      console.log(resultUstensile);
    } else {
      resultUstensile = "";
    }
  })

};

export default displayTag;

