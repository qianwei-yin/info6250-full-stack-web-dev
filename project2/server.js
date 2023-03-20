const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// middlewares
app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

// controllers
const {
	verifySession,
	getSession,
	addSession,
	deleteSession,
	getUsers,
	getMessages,
	addMessage,
} = require('./controller.js');

// routes
app.route('/api/v1/sessions').get(verifySession, getSession).post(addSession).delete(deleteSession);
app.route('/api/v1/users').get(verifySession, getUsers);
app.route('/api/v1/messages').get(verifySession, getMessages).post(verifySession, addMessage);

// listen
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
