'use strict';

import card from '../views/card.js';
import { map, filter } from './fx.js';

// Fonction de recherche
export default function search(data) {
  // Sélection des éléments du champ de recherche et du message d'erreur
  const field = document.querySelector('.fieldSearch');
  const message = document.querySelector('.err');
  const errMessage = 'Veuillez entrer 3 caractères ou plus'; // Message d'erreur

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

// Fonction de démarrage de la recherche
const start = (data, result, isCheck) => {
  let newData = []; // Tableau pour stocker les nouvelles données filtrées

  // Ajout des éléments filtrés au tableau newData en utilisant la fonction filter
  newData.push(
    ...filter(data.recipes, value => value.name.toLowerCase().includes(result)),
    ...filter(data.recipes, value => value.description.toLowerCase().includes(result)),
    ...filter(data.recipes, value => value.ingredients.some(el => el.ingredient.toLowerCase().includes(result))),
    ...filter(data.recipes, value => value.appliance.toLowerCase().includes(result)),
    ...filter(data.recipes, value => value.ustensils.some(el => el.toLowerCase().includes(result))),
  );

  // crée un tableau vide pour stocker les éléments en double.
  const duplicate = [];
  // crée un ensemble (Set) pour suivre les identifiants déjà rencontrés.
  const idSet = new Set();

  // parcourt chaque élément dans le tableau newData.
  for (const item of newData) {
    // Si l'identifiant de l'élément n'est pas déjà présent dans l'ensemble.
    if (!idSet.has(item.id)) {
      // On ajoute l'identifiant à l'ensemble.
      idSet.add(item.id);

      // On ajoute l'élément au tableau duplicate, car il n'est pas en double.
      duplicate.push(item);
    }
  }

  newData = { recipes: duplicate.sort((a, b) => a.id - b.id) }; // Stockage des nouvelles données dans newData

  // Enregistrement des données dans le stockage local en fonction du résultat
  result.length === 0
    ? window.localStorage.setItem('SEARCH_DATA_KEY', JSON.stringify(data))
    : window.localStorage.setItem('SEARCH_DATA_KEY', JSON.stringify(newData));
  window.localStorage.setItem('ISCHECK_KEY', JSON.stringify(isCheck));
  window.localStorage.setItem('SEARCH_KEY', JSON.stringify(result));

  // Appel de la fonction card avec les nouvelles données
  card(newData);
};
