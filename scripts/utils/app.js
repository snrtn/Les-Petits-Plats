'use strict';

import fetchApp from './fetchApp.js';
import displayCard from '../displayCard.js';
import search from '../search.js';
import check from '../searchCheck.js';

const app = async () => {
  const data = await fetchApp();
  displayCard(data);
  search(data);
  check(data);
};

window.addEventListener('load', app);
