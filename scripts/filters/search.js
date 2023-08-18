"use strict";

const btnSearch = document.querySelector('.btnSearch')
const fieldKeypress = document.getElementById('fieldKeypress');
const fieldSearch = document.querySelector('.fieldSearch');

const search = (data) => {
  // reset value
  let result = null;

  // onchange event
  fieldSearch.addEventListener('change', function (event) {
    if (event.target.name === 'fieldSearch') {
      result = event.target.value;
      return false;
    } else {
      return true;
    }
  })

  // action button click
  btnSearch.addEventListener('click', function () {
    handleSearch(data, result);
  });

  // action button keydown
  fieldKeypress.addEventListener('keydown', function (event) {
    handleKeypress(event, data, result);
  });
  
}

function handleSearch(data, result) {
  console.log('get data', data, result);
}

function handleKeypress(event, data, result) {
  if(event.keyCode === 13 || event.key === 'Enter') { 
      console.log(data, result);
      return false; 
  } else {
      return true;
  }
}

export default search;