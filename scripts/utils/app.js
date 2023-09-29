"use strict";

import fetchApp from "./fetchApp.js";
import displayCard from '../pages/displayCard.js';
import choice from '../filters/choice.js';
import search from '../filters/search.js';

const app = async () => {
  const data = await fetchApp();
  displayCard(data);
  choice(data)
  search(data);
};

window.addEventListener("load", app);