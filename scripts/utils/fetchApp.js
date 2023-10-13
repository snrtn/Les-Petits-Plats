'use strict';

const dataJson = './data/recipes.json';

const fetchApp = async () => {
  try {
    const response = await fetch(dataJson);
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
};

export default fetchApp;
