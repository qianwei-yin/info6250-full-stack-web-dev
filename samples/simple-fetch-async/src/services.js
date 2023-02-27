// No "use strict" or IIFE is needed, because webpack/babel do that for us!

// named export
export function fetchCatList() {
  // Return a promise of parsed results or error object
  return fetch(`/cats`) // Using a relative url so we use the existing current page domain + protocol
    .catch( () => { // network error is rejected promise
      return Promise.reject({ error: 'networkError' }); // We return rejected promise with an error object!
    })
    .then( response => {
      if(!response.ok) { // Some sort of error status code
        return response.json().then( info => Promise.reject(info) ); // We return rejected promise with parsed error object
      }
      return response.json(); // Parse the successful response data
    });
  // Using any successful data is done by the caller, not by this function
  // - Keeps this function reusable and decoupled from the consumption of the results
};

// named export
export function fetchCatDetails(name) {
  // Return a promise of parsed results or error object
  return fetch(`/cats/${name}`) // Using a relative url so we use the existing current page domain + protocol
    .catch( () => { // network error is rejected promise
      return Promise.reject({ error: 'networkError' }); // We return rejected promise with an error object!
    })
    .then( response => {
      if(!response.ok) { // Some sort of error status code
        return response.json().then( info => Promise.reject(info) ); // We return rejected promise with parsed error object
      }
      return response.json(); // Parse the successful response data
    });
  // Using any successful data is done by the caller, not by this function
  // - Keeps this function reusable and decoupled from the consumption of the results
};

