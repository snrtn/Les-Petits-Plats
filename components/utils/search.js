'use strict';

import card from '../views/card.js';
import { filter } from './fx.js';

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
  // ...filter(data.recipes, value => value.name.toLowerCase().includes(result))
  // La méthode filter est exécutée pour chaque élément du tableau data.recipes.
  // La fonction value => value.name.toLowerCase().includes(result) convertit la propriété name de chaque élément en minuscules, puis vérifie si cette propriété contient la chaîne de caractères result.
  // Si c'est le cas, l'élément est conservé dans le tableau résultant. Sinon, il est supprimé.
  // En fin de compte, le tableau filtré est renvoyé.
  // Ce code permet d'extraire du tableau data.recipes uniquement les recettes dont la propriété name contient une certaine chaîne de caractères.

  // includes
  // Recherche dans le tableau : Elle permet de vérifier la présence d'un élément spécifique dans le tableau.
  // Valeur de retour : Elle renvoie true ou false en fonction de la présence de l'élément.
  // Sensibilité à la casse : Par défaut, elle est sensible à la casse. Cela signifie que 'banane' et 'Banane' sont considérés comme deux éléments distincts.
  // Possibilité de spécifier un index de départ : La méthode includes permet de spécifier en deuxième argument l'index à partir duquel commencer la recherche.

  // ...filter(data.recipes, value => value.ingredients.some(el => el.ingredient.toLowerCase().includes(result)))
  // data.recipes : Il s'agit du tableau des recettes à filtrer.
  // filter : C'est la méthode qui filtre les éléments du tableau.
  // value => ... : C'est la fonction de rappel de la méthode filter, elle est exécutée pour chaque élément du tableau (value).
  // value.ingredients : Cela récupère le tableau d'ingrédients de chaque recette.
  // .some(el => el.ingredient.toLowerCase().includes(result)) : Cela vérifie si au moins l'un des ingrédients, représenté par el, satisfait une condition spécifiée. La condition est que la propriété ingredient de l'ingrédient, convertie en minuscules, contient la chaîne de caractères spécifiée (result).
  // .toLowerCase() : Cela convertit la chaîne de caractères en minuscules pour éviter les problèmes de sensibilité à la casse.
  // .includes(result) : Cela vérifie si la chaîne de caractères contient la sous-chaîne spécifiée.
  // En résumé, ce code filtre les recettes du tableau data.recipes en ne retenant que celles dont au moins un ingrédient satisfait la condition de contenir la chaîne de caractères spécifiée (result).

  // some
  // Vérification de la condition : Elle exécute une fonction (condition) pour chaque élément du tableau, et si au moins un élément satisfait la condition, elle renvoie true.
  // Valeur de retour : Elle renvoie true ou false.
  // Fonction de rappel : La méthode some prend une fonction de rappel en argument, qui est exécutée pour chaque élément du tableau.
  // Arrêt de la vérification du tableau : Dès qu'un élément satisfait la condition, la méthode renvoie immédiatement true sans vérifier le reste des éléments.
  // En résumé, la méthode some est utile lorsque vous souhaitez savoir si au moins un élément d'un tableau satisfait une condition particulière.

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
  // Set
  // new Set() est une manière de créer un nouvel objet Set en JavaScript. Set est un objet intégré qui représente une collection de valeurs uniques, sans doublons.
  // L'objet Set est utilisé pour stocker des valeurs uniques et éviter les doublons dans les données. Il préserve l'ordre d'insertion des valeurs.

  // .has()
  // La méthode .has() en JavaScript est utilisée sur des objets Set pour vérifier la présence d'un élément spécifié dans l'ensemble. Si l'élément est présent, la méthode renvoie true, sinon elle renvoie false.

  // .add()
  // La méthode .add() en JavaScript est utilisée sur les objets Set pour ajouter un nouvel élément à l'ensemble. Si l'élément est déjà présent, l'ensemble reste inchangé.

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
