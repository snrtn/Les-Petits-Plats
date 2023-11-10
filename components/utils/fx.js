const curry =
  f =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

// Cette partie du code définit une fonction curry, qui prend une fonction f en argument et retourne une nouvelle fonction. Cette nouvelle fonction peut être partiellement appliquée en fournissant un premier argument a, puis elle peut être complétée avec d'autres arguments ultérieurs. Cela permet une écriture plus concise des fonctions partielles.

export const map = curry((iter, f) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

// La fonction map prend deux arguments : un itérable (iter) et une fonction de transformation (f). Elle applique la fonction f à chaque élément de l'itérable et stocke les résultats dans un tableau, qu'elle renvoie.

export const filter = curry((iter, f) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

// La fonction filter fonctionne de manière similaire à map, mais elle ne conserve que les éléments de l'itérable pour lesquels la fonction de filtrage f renvoie true.
