const sessions = require('../server-data/sessions.js');
const userData = require('../server-data/userData.js');

function checkSession(req, res, next) {
	const { sid } = req.cookies;
	const username = sid ? sessions.getUserBySession(sid) : '';

	if (!sid || !username) {
		res.status(401).json({ error: 'auth-missing' });
		return;
	}

	res.locals.username = username;
	next();
}

function getSession(req, res) {
	const { username } = res.locals;
	res.json({ username });
}

function createSession(req, res) {
	const { username } = req.body;

	if (!userData.checkUsername(username)) {
		res.status(400).json({ error: 'invalid-username' });
		return;
	}
	if (username === 'dog') {
		res.status(403).json({ error: 'auth-insufficient' });
		return;
	}

	const sid = sessions.addSession(username); // bind sid and username
	userData.initiateUserData(username); // bind username and initial data

	res.cookie('sid', sid);
	res.json({ username });
}

function deleteSession(req, res) {
	const { sid } = req.cookies;
	const username = sid ? sessions.getUserBySession(sid) : '';

	if (sid) {
		res.clearCookie('sid');
	}
	if (username) {
		sessions.deleteSession(sid);
	}

	// If there is a username, then !!username === true, otherwise, false
	// And this message can be ignored
	res.json({ wasLoggedIn: !!username });
}

module.exports = { checkSession, getSession, createSession, deleteSession };
