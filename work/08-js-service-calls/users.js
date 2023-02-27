// Odd naming on "wordFor"?
// This is chosen to make the use of it read more naturally:
// `wordFor[username] = word;`
//
// Some teams will embrace that, others will want a more rigidly consistent style

const wordFor = {};

// We could have some functions to abstract the storage of words
// Similar to how sessions.js never exports the sessions object

// I've exported the wordFor object instead because our use is so simple
// - different people in the industry have different views on when is the
// best time to put a layer of abstraction around data

function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function isValidWord(word) {
  let isValid = true;
  isValid = isValid && word.match(/^[A-Za-z]*$/);
  return isValid;
}

module.exports = {
  isValidUsername,
  isValidWord,
  wordFor,
};
