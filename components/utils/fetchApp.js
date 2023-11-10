'use strict';

const recipe = './components/data/recipes.json'; // Chemin du fichier JSON contenant les recettes

const fetchApp = async () => {
  try {
    const response = await fetch(recipe); // Tentative de récupération des données depuis le fichier JSON
    const data = await response.json(); // Conversion de la réponse en format JSON
    return data; // Retour des données récupérées
  } catch (error) {
    return false; // En cas d'erreur, retourne la valeur 'false'
  }
};

export default fetchApp; // Exportation de la fonction 'fetchApp' pour être utilisée dans d'autres modules
