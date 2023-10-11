"use strict";

import displayCard from '../pages/displayCard.js';
import check from './check.js';
import {_filter } from "../utils/_.js";

const field = document.querySelector('.fieldSearch');
const message = document.querySelector('.err');

export default function search(data) {
  field.addEventListener('keyup', (event) => {
    const target = event.target;
    const err = "Veuillez entrer 3 caractères ou plus";

    let result = '';
    (target.value.length <= 3 ) ?
      (result = "", message.innerText = err) :
      (result = target.name === 'search' && target.value, message.innerText = "", start(data, result));
    (target.value.length === 0 ) && (message.innerText = "", start(data, result));})};

const start = (data, result) => {
  let arrResult = [];
  arrResult.push(..._filter(data.recipes, (value) => value.name.toLowerCase().includes(result)));
  arrResult.push(..._filter(data.recipes, (value) => value.description.toLowerCase().includes(result)));
  arrResult.push(..._filter(data.recipes, (value) => 
    value.ingredients.some((el) => el.ingredient.toLowerCase().includes(result))));
  arrResult.push(..._filter(data.recipes, (value) => value.appliance.toLowerCase().includes(result)));
  arrResult.push(..._filter(data.recipes, (value) => 
    value.ustensils.some((el) => el.toLowerCase().includes(result))));

  let reData = arrResult.filter((character, idx, arr) => 
    arr.findIndex((item) => item.name === character.name && item.id === character.id) === idx);

  arrResult = {recipes: reData.sort((a, b) => a.id - b.id)};
  displayCard(arrResult);
  check(arrResult);};