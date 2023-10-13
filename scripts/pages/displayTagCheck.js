'use strict';

import { _map } from '../utils/_.js';

const tagsIngredient = document.querySelector('.tagsIngredient'),
  tagsAppareil = document.querySelector('.tagsAppareil'),
  tagsUstensile = document.querySelector('.tagsUstensile');

export default function displayTagCheck(ingredientCheck, appareilCheck, ustensileCheck) {
  tagsIngredient.innerHTML = _map(
    ingredientCheck,
    index => `<li class="tagsItem"><p>${index}</p><div>X</div></li>`,
  ).join('');
  tagsAppareil.innerHTML = _map(appareilCheck, index => `<li class="tagsItem"><p>${index}</p><div>X</div></li>`).join(
    '',
  );
  tagsUstensile.innerHTML = _map(ustensileCheck, index => `<li class="tagsItem"><p>${index}</p><div>X</div></li>`).join(
    '',
  );
}
