"use strict";

const filterContainer = document.querySelector('.filterContainer');

const displayTag = () => {
  const nameArr = [
    { name: 'Ingrédients'},
    { name: 'Appareils'},
    { name: 'Ustensiles'}
  ];

  let item = nameArr.map((items) => {
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

  filterContainer.innerHTML = item;

  window.handleFilter = (event) =>{
    const container = event.closest(":not(.btnFilter)");
    const btnFilter = event.closest(".btnFilter");
    const item = container.querySelector('.item');
    const img = container.querySelector('.btnFilter img');
    
    if(item.style.display === 'none') {
      btnFilter.style.borderBottomLeftRadius = '0rem';
      btnFilter.style.borderBottomRightRadius = '0rem';
      item.style.display = 'flex';
      img.style.transform = 'rotate(180deg)'
    } else {
      btnFilter.style.borderBottomLeftRadius = '1.1rem';
      btnFilter.style.borderBottomRightRadius = '1.1rem';
      item.style.display = 'none';
      img.style.transform = 'rotate(0deg)'
    }
  }
};

displayTag();

