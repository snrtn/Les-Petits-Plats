'use strict';

import card from '../views/card.js';

export default function search(data) {
  const field = document.querySelector('.fieldSearch');
  const message = document.querySelector('.err');
  const errMessage = 'Veuillez entrer 3 caractères ou plus';

  // Ajout d'un auditeur d'événements pour la frappe de touches
  field.addEventListener('keyup', event => {
    let result = ''; // Variable pour stocker le résultat de la recherche
    let isCheck = false;

    // Si la longueur de la valeur entrée est inférieure ou égale à 2
    event.target.value.length <= 2
      ? ((result = ''), (message.innerText = errMessage)) // Afficher le message d'erreur
      : ((result = event.target.name === 'search' && event.target.value),
        (message.innerText = ''), // Réinitialiser le message d'erreur
        (isCheck = true),
        start(data, result, isCheck)); // Appeler la fonction start avec les données, le résultat et l'état de vérification
    // Si la longueur de la valeur entrée est égale à 0
    event.target.value.length === 0 && ((message.innerText = ''), (isCheck = false), start(data, result, isCheck)); // Réinitialiser le message d'erreur et l'état de vérification
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

  let trieItem = newData.filter(
    (character, idx, arr) => arr.findIndex(item => item.name === character.name && item.id === character.id) === idx,
  );

  newData = { recipes: trieItem.sort((a, b) => a.id - b.id) };

  // Enregistrement des données dans le stockage local en fonction du résultat
  result.length === 0
    ? window.localStorage.setItem('SEARCH_DATA_KEY', JSON.stringify(data))
    : window.localStorage.setItem('SEARCH_DATA_KEY', JSON.stringify(newData));

  window.localStorage.setItem('ISCHECK_KEY', JSON.stringify(isCheck));
  window.localStorage.setItem('SEARCH_KEY', JSON.stringify(result));

  card(newData);
};
