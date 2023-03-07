'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const port = 3000;

const { checkSession, getHome, login, logout, newGame, guess } = require('./controller.js');

const app = express();

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', checkSession, getHome);
app.post('/login', login);
app.post('/logout', logout);
app.post('/new-game', checkSession, newGame);
app.post('/guess', checkSession, guess);

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
