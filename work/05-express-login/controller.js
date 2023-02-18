const { v4: uuidv4 } = require('uuid');
const loginPage = require('./pages/login');
const homePage = require('./pages/home');
const unauthzPage = require('./pages/unauthz');
const { sessions, words } = require('./data');

exports.checkSID = (req, res) => {
	const { sid } = req.cookies;

	// If modify the cookie but not delete it, the sid will still exist, so need to double check if sid.uuid also exist
	if (!sid || !sid.uuid) {
		res.send(loginPage());
	} else {
		const { username } = sessions[sid.uuid];
		const stored = findWordByUsername(username);

		res.status(200).send(homePage(username, stored?.word));
	}
};

exports.login = (req, res) => {
	const username = req.body.username;

	// If username is not valid
	if (!username || username === 'dog' || !isAlphaNumeric(username)) {
		return res.status(401).send(unauthzPage());
	}

	const uuid = uuidv4();
	// store the uuid-username property
	sessions[uuid] = { username };

	res.cookie(
		'sid',
		{ uuid },
		{
			httpOnly: true,
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
		}
	);

	// after login successfully, redirect to root domain
	res.redirect('/');
};

exports.logout = (req, res) => {
	// first get cookie
	const { uuid } = req.cookies.sid;

	// delete cookie in server
	delete sessions[uuid];
	// delete cookie in browser
	res.clearCookie('sid');

	// redirect to home page, since now the cookie is gone, so it prompts user to log in
	res.redirect('/');
};

exports.changeWord = (req, res) => {
	// First check is cookie is valid
	const { sid } = req.cookies;
	if (!sid || !sid.uuid) return res.redirect('/');

	const { username } = sessions[sid.uuid];
	const stored = findWordByUsername(username);

	// If this user already has stored word
	if (stored) {
		words.forEach((el) => {
			if (el.username === stored.username) el.word = req.body.word;
		});
	}
	// If user has no stored word
	else {
		words.push({ username, word: req.body.word });
	}

	// After changing/adding word, redirect to home page, and it will automatically display the new word
	res.redirect('/');
};

// helper functions
const findWordByUsername = (username) => {
	const stored = words.find((el) => el.username === username);
	return stored;
};

const isAlphaNumeric = (str) => /^[0-9A-Z]+$/i.test(str);
