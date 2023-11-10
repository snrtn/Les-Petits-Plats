const curry =
  f =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

export const map = curry((iter, f) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

export const filter = curry((iter, f) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});
