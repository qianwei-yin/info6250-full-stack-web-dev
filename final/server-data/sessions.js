const uuid = require('uuid').v4;

const sidUser = {};

function getUserBySession(sid) {
	return sidUser[sid];
}

function addSession(username) {
	const sid = uuid();
	sidUser[sid] = username;
	return sid;
}

function deleteSession(sid) {
	delete sidUser[sid];
}

module.exports = { getUserBySession, addSession, deleteSession };
