"use strict";

const FILTER_CONTAINER = document.querySelector('.filterContainer');

const displayFilter = () => {
  const arrFilter = [
    { name: 'Ingrédients'},
    { name: 'Appareils'},
    { name: 'Ustensiles'}
  ];

  let item = arrFilter.map((items) => {
    let { name } = items;
    return `
      <div>
        <button class="btnFilter" onclick="handleFilter(this)">
          <p>${name}</p>
          <img src="/assets/images/arrowDown.svg" alt="" />
        </button>
        <div class="item">
          <div>
            <input type="search" />
            <img src="'../../assets/images/icon_search.svg" alt="" />
          </div>
          <ul class="check">
            <li>asdasd</li>
            <li>asdasd</li>
          </ul>
          <ul class="noCheck">
            <li>asdasd</li>
            <li>asdasd</li>
            <li>asdasd</li>
            <li>asdasd</li>
            <li>asdasd</li>
            <li>asdasd</li>
            <li>asdasd</li>
          </ul>
        </div>
      </div>
    `;
  })
  .join("");

  FILTER_CONTAINER.innerHTML = item;

  window.handleFilter = (event) =>{
    const CONTAINER = event.closest(":not(.btnFilter)");
    const BTN_FILTER = event.closest(".btnFilter");
    const ITEM = CONTAINER.querySelector('.item');
    const IMG = CONTAINER.querySelector('.btnFilter img');
    
    if(ITEM.style.display === 'none') {
      BTN_FILTER.style.borderBottomLeftRadius = '0rem';
      BTN_FILTER.style.borderBottomRightRadius = '0rem';
      ITEM.style.display = 'flex';
      IMG.style.transform = 'rotate(180deg)'
    } else {
      BTN_FILTER.style.borderBottomLeftRadius = '1.1rem';
      BTN_FILTER.style.borderBottomRightRadius = '1.1rem';
      ITEM.style.display = 'none';
      IMG.style.transform = 'rotate(0deg)'
    }
  }
};

displayFilter();

