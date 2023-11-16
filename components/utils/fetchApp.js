'use strict';

// Déclaration du chemin du fichier JSON contenant les recettes
const recipe = './components/data/recipes.json';

// Fonction asynchrone pour récupérer les données des recettes
const fetchApp = async () => {
  try {
    // Envoi d'une requête pour récupérer les données du fichier JSON
    const response = await fetch(recipe);

    // Conversion des données en format JSON
    const data = await response.json();

    // Retourne les données récupérées
    return data;
  } catch (error) {
    // En cas d'erreur, retourne faux
    return false;
  }
};

// Exportation de la fonction fetchApp pour pouvoir l'utiliser dans d'autres fichiers
export default fetchApp;
