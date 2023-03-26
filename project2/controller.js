// server state
const sessions = require('./sessions.js');
const users = require('./users.js');
const messages = require('./messages.js');

exports.verifySession = (req, res, next) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getUserBySession(sid) : '';

	if (!users.isValid(username)) {
		res.status(401).json({ error: 'auth-missing' });
		return;
	}

	req.username = username;
	next();
};

exports.getSession = (req, res) => {
	const { username } = req;
	res.json({ username });
};

exports.addSession = (req, res) => {
	const { username } = req.body;

	if (!users.isValid(username)) {
		res.status(400).json({ error: 'invalid-username' });
		return;
	}

	if (username === 'dog') {
		res.status(403).json({ error: 'forbidden-username' });
		return;
	}

	const sid = sessions.addSession(username);
	users.addUser(username);
	res.cookie('sid', sid);
	res.end();
};

exports.deleteSession = (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getUserBySession(sid) : '';

	if (sid) {
		res.clearCookie('sid');
	}

	if (username) {
		sessions.deleteSession(sid);
		users.deleteUser(username);
	}

	res.end();
};

exports.getUsers = (req, res) => {
	res.json(users.getUsers());
};

exports.getMessages = (req, res) => {
	res.json(messages.getMessages());
};

exports.addMessage = (req, res) => {
	const {
		username,
		body: { message },
	} = req;

	if (!message) {
		res.status(400).json({ error: 'invalid-message' });
		return;
	}

	messages.addMessage(username, message);
	res.json(messages.getMessages());
};
