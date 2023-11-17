'use strict';

import fetchApp from './fetchApp.js';
import search from './search.js';

import card from '../views/card.js';
import select from '../views/select.js';
import tag from '../views/select.js';

const app = async () => {
  const data = await fetchApp();
  search(data);

  card(data);
  // Enregistrer les données d'origine dans le stockage local.
  window.localStorage.setItem('ORIGIN_DATA_KEY', JSON.stringify(data));
};

// Exécuter la fonction principale lors du chargement de la page.
window.addEventListener('load', app);

// Réinitialiser les valeurs stockées localement avant de quitter la page.
window.addEventListener('beforeunload', function () {
  window.localStorage.setItem('ISCHECK_KEY', JSON.stringify(false));
  window.localStorage.setItem('SEARCH_KEY', JSON.stringify(''));
});
