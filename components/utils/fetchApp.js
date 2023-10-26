'use strict';

const recipe = './components/data/recipes.json';

const fetchApp = async () => {
	try {
		const response = await fetch(recipe);
		const data = await response.json();
		return data;
	} catch (error) {
		return false;
	}
};

export default fetchApp;
