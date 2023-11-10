'use strict';

import fetchApp from './fetchApp.js';
import search from './search.js';

import card from '../views/card.js';
import select from '../views/select.js';
import tag from '../views/select.js';

const app = async () => {
  const data = await fetchApp();
  search(data);

  card(data);
  localStorage.setItem('DATA_KEY', JSON.stringify(data));
};

window.addEventListener('load', app);
