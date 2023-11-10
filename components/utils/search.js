'use strict';

import card from '../views/card.js';
import { map, filter } from './fx.js';

export default function search(data) {
  const field = document.querySelector('.fieldSearch');
  const message = document.querySelector('.err');
  const errMessage = 'Veuillez entrer 3 caractères ou plus';

  field.addEventListener('keyup', event => {
    let result = '';
    let isCheck = false;
    // validation
    event.target.value.length <= 2
      ? ((result = ''), (message.innerText = errMessage))
      : ((result = event.target.name === 'search' && event.target.value),
        (message.innerText = ''),
        (isCheck = true),
        start(data, result, isCheck));

    // reset
    event.target.value.length === 0 && ((message.innerText = ''), (isCheck = false), start(data, result, isCheck));
  });
}

const start = (data, result, isCheck) => {
  let newData = [];
  newData.push(
    ...filter(data.recipes, value => value.name.toLowerCase().includes(result)),
    ...filter(data.recipes, value => value.description.toLowerCase().includes(result)),
    ...filter(data.recipes, value => value.ingredients.some(el => el.ingredient.toLowerCase().includes(result))),
    ...filter(data.recipes, value => value.appliance.toLowerCase().includes(result)),
    ...filter(data.recipes, value => value.ustensils.some(el => el.toLowerCase().includes(result))),
  );

  // delete duplication
  let duplicate = Array.from(new Set(map(newData, a => a.id))).map(id => {
    return newData.find(a => a.id === id);
  });

  // sort ABC
  newData = { recipes: duplicate.sort((a, b) => a.id - b.id) };

  // save data et valu
  result.length === 0
    ? window.localStorage.setItem('SEARCH_DATA_KEY', JSON.stringify(data))
    : window.localStorage.setItem('SEARCH_DATA_KEY', JSON.stringify(newData));
  window.localStorage.setItem('ISCHECK_KEY', JSON.stringify(isCheck));
  window.localStorage.setItem('SEARCH_KEY', JSON.stringify(result));

  // donner dat
  card(newData);
};
