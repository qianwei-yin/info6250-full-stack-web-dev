const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('./sessions');
const users = require('./users');

const app = express();
const PORT = process.env.PORT || 3000; // Will use PORT 4000 in this assignment

app.use(cookieParser());
app.use(express.static('./build')); // this folder will appear after running "npm run build"
app.use(express.json()); // Parses requests with json content bodies

app.route('/api/v1/session').get(checkSession, getSession).post(addSession).delete(deleteSession);
app.route('/api/v1/word').get(checkSession, getWord).post(checkSession, updateWord);

///////////////// Sessions //////////////////////
function checkSession(req, res, next) {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getUserBySession(sid) : '';

	if (!sid || !username) {
		res.status(401).json({ error: 'auth-missing' });
		return;
	}

	res.locals.username = username;
	next();
}

// Check for existing session
function getSession(req, res) {
	const { username } = res.locals;
	res.json({ username });
}

// Login
function addSession(req, res) {
	const { username } = req.body;

	if (!users.isValidUsername(username)) {
		res.status(400).json({ error: 'invalid-username' });
		return;
	}

	if (username === 'dog') {
		res.status(403).json({ error: 'auth-insufficient' });
		return;
	}

	const sid = sessions.addSession(username);

	res.cookie('sid', sid);
	res.json({ username });
}

// Logout
function deleteSession(req, res) {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getUserBySession(sid) : '';

	if (sid) {
		res.clearCookie('sid');
	}
	if (username) {
		sessions.deleteSession(sid);
	}

	// If there is a username, then !!username === true, otherwise, false
	res.json({ wasLoggedIn: !!username });
}

////////////////////// Stored Word //////////////////////
function getWord(req, res) {
	const { username } = res.locals;
	const storedWord = users.userWord[username] || '';
	res.json({ username, storedWord });
}

function updateWord(req, res) {
	const { username } = res.locals;
	const { word } = req.body;

	// word can be an empty string, which equals "delete the word"
	if (!word && word !== '') {
		res.status(400).json({ error: 'required-word' });
		return;
	}

	if (!users.isValidWord(word)) {
		res.status(400).json({ error: 'invalid-word' });
		return;
	}

	users.userWord[username] = word;
	res.json({ username, storedWord: word });
}

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
