'use strict';

import card from '../views/card.js';

export default function search(data) {
  const field = document.querySelector('.fieldSearch');
  const message = document.querySelector('.err');
  const errMessage = 'Veuillez entrer 3 caractères ou plus';

  field.addEventListener('keyup', event => {
    let result = '';
    // field validation
    event.target.value.length <= 2
      ? ((result = ''), (message.innerText = errMessage))
      : ((result = event.target.name === 'search' && event.target.value),
        (message.innerText = ''),
        start(data, result));

    // field reset
    event.target.value.length === 0 && ((message.innerText = ''), start(data, result));
  });
}

const start = (data, result) => {
  let newData = [];
  newData.push(
    ...data.recipes.filter(value => value.name.toLowerCase().includes(result)),
    ...data.recipes.filter(value => value.description.toLowerCase().includes(result)),
    ...data.recipes.filter(value => value.ingredients.some(el => el.ingredient.toLowerCase().includes(result))),
    ...data.recipes.filter(value => value.appliance.toLowerCase().includes(result)),
    ...data.recipes.filter(value => value.ustensils.some(el => el.toLowerCase().includes(result))),
  );

  // delete duplication
  let trieItem = newData.filter(
    (character, idx, arr) => arr.findIndex(item => item.name === character.name && item.id === character.id) === idx,
  );

  // reset ABC
  newData = { recipes: trieItem.sort((a, b) => a.id - b.id) };

  // reset card item
  card(newData);
};
