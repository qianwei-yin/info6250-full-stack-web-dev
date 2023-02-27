// No "use strict" or IIFE is needed, because webpack/babel do that for us!

import state from './state';
import { fetchCatList, fetchCatDetails } from './services';
import render from './view';

const rootEl = document.querySelector('.main');

rootEl.addEventListener('click', (e) => {
  if(e.target.classList.contains('card__load')) {
    const name = e.target.dataset.name;
    fetchCatDetails(name)
    .then( catData => {
      state.updateCat(catData);
      render(state, rootEl);
    })
    .catch( error => {
      console.warn("replace this with actual error reporting", error);
    });
  }
});


// Below runs on load
fetchCatList()
.then( cats => {
  state.updateCats(cats);
  render(state, rootEl);
})
.catch( error => {
  console.warn("replace this with actual error reporting", error);
});


