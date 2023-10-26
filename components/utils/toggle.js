window.handleFilter = (event) => {
	const container = event.closest(':not(.btnFilter)');
	const btnFilter = event.closest('.btnFilter');
	const item = container.querySelector('.item');
	const img = container.querySelector('.btnFilter img');

	item.style.display === 'none'
		? ((btnFilter.style.borderBottomLeftRadius = '0rem'),
		  (btnFilter.style.borderBottomRightRadius = '0rem'),
		  (item.style.display = 'flex'),
		  (img.style.transform = 'rotate(180deg)'))
		: ((btnFilter.style.borderBottomLeftRadius = '1.1rem'),
		  (btnFilter.style.borderBottomRightRadius = '1.1rem'),
		  (item.style.display = 'none'),
		  (img.style.transform = 'rotate(0deg)'));
};