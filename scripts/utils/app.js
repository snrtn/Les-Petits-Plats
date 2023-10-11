"use strict";

import fetchApp from "./fetchApp.js";
import displayCard from '../pages/displayCard.js';
import check from '../filters/check.js';
import search from '../filters/search.js';

const app = async () => {
  const data = await fetchApp();
  displayCard(data);
  search(data);
  check(data);
};

window.addEventListener("load", app);