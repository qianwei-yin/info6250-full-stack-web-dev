const state = {
  cats: {},
};

state.updateCats = function(catsData) {
  const cats = {}; // replacement object
  catsData.forEach( name => {
    cats[name] = { name, ...state.cats[name] }; // copies existing data for this cat
  });
  state.cats = cats; // replaces previous data for all cats
};

state.updateCat = function(catData) {
  const { name } = catData;
  state.cats[name] = catData;
};


export default state;
