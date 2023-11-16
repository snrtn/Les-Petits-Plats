'use strict';

// Importation du module fetchApp pour récupérer les données, ainsi que des modules card et search pour les utiliser dans l'application principale.

import fetchApp from './fetchApp.js'; // Importer le module fetchApp et exécuter la fonction fetchApp pour obtenir les données de manière asynchrone.
import card from '../views/card.js'; // Importer le module card.
import search from './search.js'; // Importer le module search.

// Fonction principale de l'application.
const app = async () => {
  // Exécuter la fonction fetchApp pour obtenir les données.
  const data = await fetchApp();

  // Utiliser le module search pour initialiser la fonction de recherche avec les données obtenues.
  search(data);

  // Utiliser le module card pour créer la mise en page initiale des cartes.
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
