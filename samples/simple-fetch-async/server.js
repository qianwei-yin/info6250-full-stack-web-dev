const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('./public'));

const cats = {
  'Jorts': {
    name: 'Jorts',
    age: 3,
    color: 'orange',
  },
  'Jean': {
    name: 'Jean',
    age: 8,
    color: 'tabby',
  },
  'Nyancat': {
    name: 'Nyancat',
    age: 11,
    color: 'rainbow poptart',
  },
};

app.get('/cats', (req, res) => {
  res.json(Object.keys(cats));
});

// Note: This is a sample from BEFORE we cover services
// - This section will be different once we start REST services
app.post('/cats', express.json(), (req, res) => {
  // Insufficient security! What should be here?
  const cat = req.body;
  cats[cat.name] = cat; // Think about why this is bad!
  res.json(cats);
});

app.get('/cats/:name', (req, res) => {
  const name = req.params.name;
  if( !cats[name] ) {
    res.status(400).json({ error: 'invalid-name' });
    return;
  }

  res.json(cats[name]);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

