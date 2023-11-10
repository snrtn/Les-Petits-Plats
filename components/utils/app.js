'use strict';

import fetchApp from './fetchApp.js'; // Importation de la fonction 'fetchApp' depuis le module 'fetchApp.js'
import card from '../views/card.js'; // Importation de la fonction 'card' depuis le module 'card.js'
import search from './search.js'; // Importation de la fonction 'search' depuis le module 'search.js'

const app = async () => {
  const data = await fetchApp(); // Appel de la fonction 'fetchApp' pour récupérer les données des recettes de cuisine
  search(data); // Appel de la fonction 'search' pour effectuer une recherche initiale avec les données récupérées

  card(data); // Appel de la fonction 'card' pour afficher les recettes initiales
  window.localStorage.setItem('ORIGIN_DATA_KEY', JSON.stringify(data)); // Stockage des données initiales dans le stockage local du navigateur
};

window.addEventListener('load', app); // Ajout d'un écouteur d'événements pour exécuter la fonction 'app' lorsque la page est entièrement chargée
