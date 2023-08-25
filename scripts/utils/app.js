"use strict";

import fetchApp from "./fetchApp.js";
import handleSearch from '../filters/search.js';

const app = async () => {
  const DATA = await fetchApp();
  handleSearch(DATA);
};

window.addEventListener("load", app);