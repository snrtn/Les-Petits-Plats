// Définition de la fonction curry : transforme la fonction f en une fonction curry et la renvoie
const curry =
  f =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

// Définition de la fonction map : utilise la fonction curry pour prendre un objet iterable (iter) et une fonction (f), puis applique la fonction à chaque élément, renvoyant le tableau résultant
export const map = curry((iter, f) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

// Définition de la fonction filter : utilise la fonction curry pour prendre un objet iterable (iter) et une fonction de condition (f), puis renvoie un tableau des éléments satisfaisant la condition
export const filter = curry((iter, f) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});
