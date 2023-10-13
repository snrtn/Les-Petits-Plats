'use strict';

import fetchApp from './fetchApp.js';
import displayCard from '../pages/displayCard.js';
import search from '../filters/search.js';
import check from '../filters/searchCheck.js';

const app = async () => {
  const data = await fetchApp();
  displayCard(data);
  search(data);
  check(data);
};

window.addEventListener('load', app);
