"use strict";

const URL = "./data/recipes.json";

const fetchApp = async () => {
  try {
    const RESPONSE = await fetch(URL);
    const DATA = await RESPONSE.json();
    return DATA;
  } catch (error) {
    return false;
  }
};

export default fetchApp;