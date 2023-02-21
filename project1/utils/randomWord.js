'use strict';

const allWords = require('../words.js');

const randomWord = () => {
	const length = allWords.length;
	const randomNumber = Math.floor(Math.random() * length);
	return allWords[randomNumber];
};

module.exports = randomWord;
