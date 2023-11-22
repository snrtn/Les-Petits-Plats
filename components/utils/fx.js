// Définition de la fonction curry : transforme la fonction f en une fonction curry et la renvoie
const curry =
  f =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);
// const curry = f => ... : curry est une fonction qui retourne une fonction. La variable f est la fonction que nous voulons "curryfier".
// (a, ..._) => ... : La fonction interne prend un premier argument a suivi de tous les autres arguments regroupés dans ..._.
// _.length ? f(a, ..._) : (..._) => f(a, ..._) : Si la longueur de la liste des autres arguments (_) est différente de zéro, cela signifie que des arguments supplémentaires ont été fournis. Dans ce cas, la fonction originale f est appelée avec les arguments existants et les nouveaux arguments. Sinon, une nouvelle fonction est renvoyée, prête à accepter davantage d'arguments. Cette nouvelle fonction permet une application partielle des arguments.

// Définition de la fonction map : utilise la fonction curry pour prendre un objet iterable (iter) et une fonction (f),
// puis applique la fonction à chaque élément, renvoyant le tableau résultant
export const map = curry((iter, f) => {
  // Initialise un tableau vide pour stocker les résultats de la transformation.
  let res = [];

  // Parcourt chaque élément de l'objet iterable (iter).
  for (const a of iter) {
    // Applique la fonction (f) à l'élément en cours et ajoute le résultat au tableau.
    res.push(f(a));
  }

  // Renvoie le tableau résultant de la transformation.
  return res;
});

// Définition de la fonction filter : utilise la fonction curry pour prendre un objet iterable (iter) et une fonction de condition (f),
// puis renvoie un tableau des éléments satisfaisant la condition
export const filter = curry((iter, f) => {
  // Initialise un tableau vide pour stocker les éléments satisfaisant la condition.
  let res = [];

  // Parcourt chaque élément de l'objet iterable (iter).
  for (const a of iter) {
    // Vérifie si l'élément satisfait la condition définie par la fonction (f).
    if (f(a)) res.push(a);
  }

  // Renvoie le tableau résultant des éléments satisfaisant la condition.
  return res;
});
