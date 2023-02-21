'use strict';

const allWords = require('../words.js');
const { usernameGame } = require('../store.js');

const checkValidGuess = (username, guessWord) => {
	if (!guessWord)
		return {
			type: 'no input',
			msg: `Invalid guess! Please input a word from the possible ones.`,
		};

	const { validGuessedWords } = usernameGame[username];
	const isGuessed = validGuessedWords.find((el) => el[0] === guessWord.toLowerCase()) ? true : false;

	if (!allWords.includes(guessWord.toLowerCase())) {
		return {
			type: 'impossible',
			msg: `Invalid guess! Please choose a word from the possible ones.`,
		};
	}
	if (isGuessed) {
		return {
			type: 'guessed',
			msg: `Invalid guess! Please choose a word that you haven't guessed.`,
		};
	}

	return {
		type: 'valid',
		msg: '',
	};
};

module.exports = checkValidGuess;
