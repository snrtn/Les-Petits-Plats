"use strict";

import displayCard from '../pages/displayCard.js';
import displayTag from '../pages/displayTag.js';

const fieldSearch = document.querySelector('.fieldSearch');
const btnSearch = document.querySelector('.btnSearch')
const fieldKeypress = document.getElementById('fieldKeypress');
const err = document.querySelector('.err');

let result = "";
let arrResult = [];

fieldSearch.addEventListener('change', function (event) {
  if ( event.target.value.length < 3 ) {
    err.innerText = "Veuillez entrer 3 caractères ou plus";
    result = "";
  } else {
    err.innerText = "";
    result = event.target.name === 'fieldSearch' && event.target.value;
  }
})

const search = (data) => {
  btnSearch.addEventListener('click', function () {
    handleSearch(data);
  });
  fieldKeypress.addEventListener('keyup', function (event) {
    handleKeypress(event, data);
  });
}

let searchTool = (data) => {
  let resultName = data.recipes.filter(value => {
    return value.name.toLowerCase().includes(result);
  });
  let resultDescription = data.recipes.filter(value => {
    return value.description.toLowerCase().includes(result);
  });
  let resultIngredients = data.recipes.filter(value => {
    return value.ingredients.some((el) => el.ingredient.toLowerCase().includes(result))
  });
  let resultAppliance = data.recipes.filter(value => {
    return value.appliance.toLowerCase().includes(result);
  });
  let resultUstensils = data.recipes.filter(value => {
    return value.ustensils.some((el) => el.toLowerCase().includes(result))
  });

  // init array
  arrResult = [];

  // add array
  arrResult.push(...resultName);
  arrResult.push(...resultDescription);
  arrResult.push(...resultIngredients);
  arrResult.push(...resultAppliance);
  arrResult.push(...resultUstensils);

  // duplicate item delete
  const reData = arrResult.filter((character, idx, arr)=>{
    return arr.findIndex((item) => item.name === character.name && item.company === character.company) === idx
  });

  // id 1, 2, 3
  reData.sort(function(a, b) {
    return a.id - b.id;
  });

  arrResult = {recipes:reData};
  displayCard(arrResult);
  displayTag(arrResult);
}

function handleSearch(data) {
  searchTool(data)
}

function handleKeypress(event, data) {
  if (event.keyCode === 13 || event.key === 'Enter') {
    searchTool(data)
  }
}

export default search;