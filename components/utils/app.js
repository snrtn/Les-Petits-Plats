'use strict';

import fetchApp from './fetchApp.js';

import card from '../views/card.js';
import search from './search.js';

const app = async () => {
  const data = await fetchApp();
  search(data);

  card(data);
  window.localStorage.setItem('ORIGIN_DATA_KEY', JSON.stringify(data));
};

window.addEventListener('load', app);
