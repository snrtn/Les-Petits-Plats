"use strict";

import displayTag from '../pages/displayTag.js';
import displayTagView from '../pages/displayTagView.js';
import {_map } from '../utils/_.js';

export default function check(data) {
  let ingredientGet = [];
  let appareilGet = [];
  let ustensilGet = [];

  _map(data.recipes, (all) => {let {ingredients, appliance, ustensils} = all;
    _map(ingredients, (item) => {let {ingredient} = item; ingredientGet.push(ingredient)});
    appareilGet.push(appliance);
    ustensilGet.push(...ustensils);});

  let ingredientTag = ingredientGet.sort().reduce((unique, ingredient) =>
    unique.indexOf(ingredient) !== -1 ? unique : [...unique, ingredient],[]);
  let appareilTag = appareilGet.sort().reduce((unique, appareil) =>
    unique.indexOf(appareil) !== -1 ? unique : [...unique, appareil],[]);
  let ustensilTag = ustensilGet.sort().reduce((unique, ustensil) =>
    unique.indexOf(ustensil) !== -1 ? unique : [...unique, ustensil],[]);

  let ingredientCheck = [];
  let appareilCheck = [];
  let ustensileCheck = [];

  function start() {
    displayTag(ingredientTag, appareilTag, ustensilTag, ingredientCheck, appareilCheck, ustensileCheck );
    displayTagView(ingredientCheck, appareilCheck, ustensileCheck);
    return void undefined};
  
  start();

  window.handleIngredient = (event) => {ingredientCheck.push(`${event.innerText}`);
    start();};
  window.handleAppareil = (event) => {appareilCheck.push(`${event.innerText}`);
    start();};
  window.handleUstensile = (event) => {ustensileCheck.push(`${event.innerText}`);
    start();};};