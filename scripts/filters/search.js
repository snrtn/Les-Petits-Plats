"use strict";

const FIELD_SEARCH = document.querySelector('.fieldSearch');
const BTN_SEARCH = document.querySelector('.btnSearch')
const FIELD_KEYPRESS = document.getElementById('fieldKeypress');

let result = null;
FIELD_SEARCH.addEventListener('change', function (event) {
  result = event.target.name === 'fieldSearch' && event.target.value;
})

const search = (data) => {
  BTN_SEARCH.addEventListener('click', function () {
    handleSearch(data);
  });
  FIELD_KEYPRESS.addEventListener('keyup', function (event) {
    handleKeypress(event, data);
  });
}

function handleSearch(data) {
  console.log('get data', data, result);
}
function handleKeypress(event, data) {
  event.keyCode === 13 || event.key === 'Enter' ? console.log(data, result) : false;
}

export default search;