'use strict';

const randomWord = require('./randomWord.js');
const { usernameGame } = require('../store.js');

const newGame = (username) => {
	const referenceWord = randomWord();
	console.log({ username, randomWord: referenceWord });

	usernameGame[username] = {
		referenceWord,
		validGuessedWords: [],
		invalidGuessedWords: [],
		alertParams: {
			showAlert: false,
			alertType: '',
			alertMessage: '',
		},
	};
};

module.exports = newGame;
