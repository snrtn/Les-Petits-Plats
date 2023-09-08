"use strict";

import fetchApp from "./fetchApp.js";
import displayCard from '../pages/displayCard.js';

const app = async () => {
  const data = await fetchApp();
  displayCard(data);
};

window.addEventListener("load", app);