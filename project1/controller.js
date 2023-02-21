const { v4: uuidv4 } = require('uuid');

const compare = require('./utils/compare.js');
const checkValidGuess = require('./utils/checkValidGuess.js');
const newGame = require('./utils/newGame.js');

const { sidUsername, usernameGame } = require('./store.js');
const loginPage = require('./pages/loginPage.js');
const homePage = require('./pages/homePage.js');

exports.checkSession = (req, res, next) => {
	const { sid } = req.cookies;

	if (!sid) {
		return res.send(loginPage());
	}
	if (!sid.uuid || !sidUsername[sid.uuid]) {
		clearCookie(res, sid.uuid);
		const alertParams = {
			showAlert: true,
			alertType: 'warning',
			alertMessage: 'Your session is invalid or has expired, please log in again.',
		};
		return res.send(loginPage(alertParams));
	}

	next();
};

exports.getHome = (req, res) => {
	const { sid } = req.cookies;

	const username = sidUsername[sid.uuid];
	const gameData = usernameGame[username];

	if (!gameData) newGame(username);

	res.status(200).send(homePage({ gameData }));
};

exports.login = (req, res) => {
	const username = req.body.username;

	if (!username || username.toLowerCase() === 'dog' || !isAlphaNumeric(username)) {
		const alertParams = {
			showAlert: true,
			alertType: 'warning',
			alertMessage:
				'Your username is invalid, it can only include letters and numbers, and "dog" is forbidden, please try again.',
		};
		res.status(401).send(loginPage(alertParams));
		return;
	}

	const uuid = uuidv4();
	// store the sid-username property
	sidUsername[uuid] = username;

	// store cookie into browser
	res.cookie(
		'sid',
		{ uuid },
		{
			httpOnly: true,
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
		}
	);

	res.redirect('/');
};

exports.logout = (req, res) => {
	const { sid } = req.cookies;

	clearCookie(res, sid.uuid);
	res.redirect('/');
};

exports.newGame = (req, res) => {
	const { sid } = req.cookies;

	const username = sidUsername[sid.uuid];
	newGame(username);

	res.redirect('/');
};

exports.guess = (req, res) => {
	const { guessWord } = req.body;
	const { sid } = req.cookies;
	const username = sidUsername[sid.uuid];
	const gameData = usernameGame[username];
	const { referenceWord, validGuessedWords, invalidGuessedWords, alertParams } = gameData;

	const { type, msg } = checkValidGuess(username, guessWord);

	if (type === 'valid') {
		const sameNum = compare(referenceWord, guessWord);
		validGuessedWords.push([guessWord.toLowerCase(), sameNum]);
		alertParams.showAlert = false;
		return res.redirect('/');
	}

	if (type === 'impossible') {
		// add to invalid array
		invalidGuessedWords.push(guessWord.toLowerCase());
	}
	// alert
	alertParams.showAlert = true;
	alertParams.alertType = 'warning';
	alertParams.alertMessage = msg;
	return res.redirect('/');
};

const isAlphaNumeric = (str) => /^[0-9A-Z]+$/i.test(str);

const clearCookie = (res, uuid) => {
	// delete cookie in server
	delete sidUsername[uuid];
	// delete cookie in browser
	res.clearCookie('sid');
};
