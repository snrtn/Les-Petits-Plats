'use strict';

import card from '../views/card.js'; // Importation de la fonction de génération de cartes depuis le fichier 'card.js'
import { map, filter } from './fx.js'; // Importation des fonctions 'map' et 'filter' depuis le fichier d'utilitaires 'fx.js'

// Définition de la fonction 'search' qui gère la recherche en fonction des données passées en paramètre.
export default function search(data) {
  const field = document.querySelector('.fieldSearch'); // Sélection de l'élément de champ de recherche dans le DOM
  const message = document.querySelector('.err'); // Sélection de l'élément d'affichage des messages d'erreur dans le DOM
  const errMessage = 'Veuillez entrer 3 caractères ou plus'; // Message d'erreur pour les entrées de moins de 3 caractères

  // Ajout d'un écouteur d'événements pour gérer les frappes de clavier dans le champ de recherche
  field.addEventListener('keyup', event => {
    let result = ''; // Initialisation de la variable pour stocker le résultat de la recherche
    let isCheck = false; // Initialisation de la variable pour vérifier si la recherche est activée

    // Validation de la longueur de l'entrée
    event.target.value.length <= 2
      ? ((result = ''), (message.innerText = errMessage)) // Affichage d'un message d'erreur si l'entrée est trop courte
      : ((result = event.target.name === 'search' && event.target.value),
        (message.innerText = ''),
        (isCheck = true), // Activation de la recherche si l'entrée est valide
        start(data, result, isCheck)); // Appel de la fonction de recherche avec les données, le résultat et l'indicateur de recherche
  });
}

// Fonction principale de recherche qui filtre les données en fonction du résultat de la recherche et des critères spécifiés
const start = (data, result, isCheck) => {
  let newData = [];

  // Filtrage des données en fonction du résultat de la recherche dans plusieurs critères
  newData.push(
    ...filter(data.recipes, value => value.name.toLowerCase().includes(result)), // Filtrage par nom de recette
    ...filter(data.recipes, value => value.description.toLowerCase().includes(result)), // Filtrage par description de recette
    ...filter(data.recipes, value => value.ingredients.some(el => el.ingredient.toLowerCase().includes(result))), // Filtrage par ingrédients
    ...filter(data.recipes, value => value.appliance.toLowerCase().includes(result)), // Filtrage par appareil
    ...filter(data.recipes, value => value.ustensils.some(el => el.toLowerCase().includes(result))), // Filtrage par ustensiles
  );

  // Suppression des duplications dans les résultats de la recherche
  let duplicate = Array.from(new Set(map(newData, a => a.id))).map(id => {
    return newData.find(a => a.id === id);
  });

  // Tri des résultats par ordre alphabétique
  newData = { recipes: duplicate.sort((a, b) => a.id - b.id) };

  // Sauvegarde des données de recherche et du résultat dans le stockage local
  result.length === 0
    ? window.localStorage.setItem('SEARCH_DATA_KEY', JSON.stringify(data))
    : window.localStorage.setItem('SEARCH_DATA_KEY', JSON.stringify(newData));
  window.localStorage.setItem('ISCHECK_KEY', JSON.stringify(isCheck));
  window.localStorage.setItem('SEARCH_KEY', JSON.stringify(result));

  // Affichage des cartes de recettes correspondant aux critères de recherche
  card(newData);
};
