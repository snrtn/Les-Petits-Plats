'use strict';

import fetchApp from './fetchApp.js';
import card from '../views/card.js';
import search from '../utils/search.js';
import select from '../views/select.js';
import tag from '../views/select.js';

const app = async () => {
	const data = await fetchApp();
	card(data);
	search(data);
	select(data);
	tag(data);

	localStorage.setItem('DATA_KEY', JSON.stringify(data));
};

window.addEventListener('load', app);
