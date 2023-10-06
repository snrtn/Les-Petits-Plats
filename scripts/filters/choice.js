"use strict";

import displayTag from '../pages/displayTag.js'
import displayTagsView from '../pages/displayTagsView.js'

const choice = (data) => {
  let arrIngredientsGet = [];
  let arrAppareilsGet = [];
  let arrUstensilesGet = [];

  let arrIngredientsChoice = [];
  let arrAppareilsChoice = [];
  let arrUstensilesChoice = [];

   // find ingredients
  data.recipes.map((item) => {
    let {ingredients} = item;
    ingredients.map(items => {
      let {ingredient} = items;
      // add array of ingredients
      arrIngredientsGet.push(ingredient)
    })
  }) 
  // filter & sort ingredients
  let arrIngredients = arrIngredientsGet.filter((element, index) => {
    arrIngredientsGet.sort();
    return arrIngredientsGet.indexOf(element) === index;
  });
  
  // find appliances
  data.recipes.map((item) => {
    let {appliance} = item;
      arrAppareilsGet.push(appliance)
  })
  // filter & sort appliances
  let arrAppareils = arrAppareilsGet.filter((element, index) => {
    arrAppareilsGet.sort();
    return arrAppareilsGet.indexOf(element) === index;
  });

  // find ustensils
  data.recipes.map((item) => {
    let {ustensils} = item;
      arrUstensilesGet.push(...ustensils)
  })
  // filter & sort ustensils
  let arrUstensiles = arrUstensilesGet.filter((element, index) => {
    arrUstensilesGet.sort();
    return arrUstensilesGet.indexOf(element) === index;
  });

  // list action
  window.handleIngredient = (event) => {
    arrIngredientsChoice.push(`${event.innerText}`);
    displayTag(arrIngredients, arrAppareils, arrUstensiles, arrIngredientsChoice, arrAppareilsChoice, arrUstensilesChoice);
    displayTagsView(arrIngredientsChoice, arrAppareilsChoice, arrUstensilesChoice);    
  }
  window.handleAppareils = (event) => { 
    arrAppareilsChoice.push(`${event.innerText}`);
    displayTag(arrIngredients, arrAppareils, arrUstensiles, arrIngredientsChoice, arrAppareilsChoice, arrUstensilesChoice);
    displayTagsView(arrIngredientsChoice, arrAppareilsChoice,arrUstensilesChoice);
  }
  window.handleUstensiles = (event) => {
    arrUstensilesChoice.push(`${event.innerText}`);
    displayTag(arrIngredients, arrAppareils, arrUstensiles, arrIngredientsChoice, arrAppareilsChoice, arrUstensilesChoice);
    displayTagsView(arrIngredientsChoice, arrAppareilsChoice, arrUstensilesChoice);
  }

  



  // envoyer paramètre à
  displayTag(arrIngredients, arrAppareils, arrUstensiles, arrIngredientsChoice, arrAppareilsChoice, arrUstensilesChoice);


  // toggle button
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
} 

export default choice;