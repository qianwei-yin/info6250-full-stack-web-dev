const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {
	const sid = uuid();
	sessions[sid] = { username };
	return sid;
}

function getUserBySession(sid) {
	return sessions[sid]?.username;
}

function deleteSession(sid) {
	delete sessions[sid];
}

module.exports = {
	addSession,
	getUserBySession,
	deleteSession,
};
