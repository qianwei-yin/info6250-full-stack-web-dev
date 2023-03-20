const users = {};

function isValid(username) {
	const name = username.trim();
	if (!name || name.length > 20) return false;
	return name.match(/^[A-Za-z0-9_]+$/);
}

function getUsers() {
	return users;
}

function addUser(username) {
	users[username] = true;
	return users;
}

function deleteUser(username) {
	if (users[username]) {
		users[username] = false;
	}
	return users;
}

module.exports = {
	isValid,
	getUsers,
	addUser,
	deleteUser,
};
