"use strict";

const filterContainer = document.querySelector('.filterContainer');

const displayTag = (data) => {
  const nameArr = [
    { name: 'Ingrédients'},
    { name: 'Appareils'},
    { name: 'Ustensiles'}
  ];
  
  // Ingrédients
  let arrIngredientsGet = [];
  data.recipes.map((item) => {
    let {ingredients} = item;
    ingredients.map(items => {
      let {ingredient} = items;
      arrIngredientsGet.push(ingredient)
    })
  })
  let arrIngredients = arrIngredientsGet.filter((element, index) => {
    arrIngredientsGet.sort();
    return arrIngredientsGet.indexOf(element) === index;
  });
  let mapIngredients = arrIngredients.map((index) => {
    return `
      <li onclick="handleIngredient(this)">${index}</li>
    `
  }).join('');

  // Appareils
  let arrAppareilsGet = [];
  data.recipes.map((item) => {
    let {appliance} = item;
      arrAppareilsGet.push(appliance)
  })
  let arrAppareils = arrAppareilsGet.filter((element, index) => {
    arrAppareilsGet.sort();
    return arrAppareilsGet.indexOf(element) === index;
  });
  let mapAppareils = arrAppareils.map((index) => {
    return `
      <li onclick="handleAppareils(this)">${index}</li>
    `
  }).join('');

  // Ustensiles
  let arrUstensilesGet = [];
  data.recipes.map((item) => {
    let {ustensils} = item;
      arrUstensilesGet.push(...ustensils)
  })
  let arrUstensiles = arrUstensilesGet.filter((element, index) => {
    arrUstensilesGet.sort();
    return arrUstensilesGet.indexOf(element) === index;
  });
  let mapUstensiles = arrUstensiles.map((index) => {
    return `
      <li onclick="handleUstensiles(this)">${index}</li>
    `
  }).join('');

  // button
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
            <ul class="check ingredient">
              
            </ul>
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
              <input type="search" />
              <img src="'../../assets/images/icon_search.svg" alt="" />
            </div>
            <ul class="check appareil">
              
            </ul>
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
              <input type="search" />
              <img src="'../../assets/images/icon_search.svg" alt="" />
            </div>
            <ul class="check ustensile">
              
            </ul>
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

  window.handleIngredient = (event) => {
    console.log(event.innerText);
  }
  window.handleAppareils = (event) => {
    console.log(event.innerText);
  }
  window.handleUstensiles = (event) => {
    console.log(event.innerText);
  }

  window.handleFilter = (event) =>{
    const container = event.closest(":not(.btnFilter)");
    const btnFilter = event.closest(".btnFilter");
    const item = container.querySelector('.item');
    const img = container.querySelector('.btnFilter img');
    
    if(item.style.display === 'none') {
      btnFilter.style.borderBottomLeftRadius = '0rem';
      btnFilter.style.borderBottomRightRadius = '0rem';
      item.style.display = 'flex';
      img.style.transform = 'rotate(180deg)'
    } else {
      btnFilter.style.borderBottomLeftRadius = '1.1rem';
      btnFilter.style.borderBottomRightRadius = '1.1rem';
      item.style.display = 'none';
      img.style.transform = 'rotate(0deg)'
    }
  }
};

export default displayTag;

