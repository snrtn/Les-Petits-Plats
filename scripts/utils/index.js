"use strict";

// appeler js file
import fetchApp from "./fetchApp.js";
import handleSearch from '../filters/search.js';

const index = async () => {
  const DATA = await fetchApp();

  handleSearch(DATA);
};

window.addEventListener("load", index);