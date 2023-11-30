'use strict';

// Déclaration du chemin du fichier JSON contenant les recettes
const recipe = './components/data/recipes.json';

// Fonction asynchrone pour récupérer les données des recettes
const fetchApp = async () => {
  try {
    // Envoi d'une requête pour récupérer les données du fichier JSON
    const response = await fetch(recipe);
    // fetch(recipe); est un code JavaScript qui utilise la fonction fetch pour effectuer une requête réseau.
    // fetch a pour rôle de récupérer la ressource représentée par recipe de manière asynchrone. recipe est généralement une adresse URL, et la fonction fetch tente de récupérer des données à partir de cette adresse.

    // Conversion des données en format JSON
    const data = await response.json();

    // Retourne les données récupérées
    return data;
  } catch (error) {
    // En cas d'erreur, retourne faux
    return false;
  }
};
// async/await
// En ajoutant le mot-clé async devant la fonction, vous indiquez qu'elle renverra toujours une Promise. Pour marquer les parties du code qui sont asynchrones, vous utilisez le mot-clé await. Cela permet d'attendre la fin d'une opération asynchrone et de récupérer son résultat.

// try/catch
// En français, "try/catch" se traduit par "essayer/capturer". Cela signifie que vous placez les parties du code où une exception pourrait se produire dans le bloc "essayer", et si une exception survient, le code d'exception est placé dans le bloc "capturer".
// Par exemple, si une partie de votre code pourrait générer une exception, vous l'incluez dans le bloc try. Si une exception se produit, le flux d'exécution se déplace vers le bloc catch, où vous pouvez gérer cette exception de manière appropriée.

// Exportation de la fonction fetchApp pour pouvoir l'utiliser dans d'autres fichiers
export default fetchApp;
