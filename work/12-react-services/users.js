const userWord = {
	abc: 'hello',
};

function isValidUsername(username) {
	if (!username) return false;
	return username.trim().match(/^[A-Za-z0-9_]+$/);
}

// word can be an empty string
function isValidWord(word) {
	return word.trim().match(/^[A-Za-z]*$/);
}

module.exports = { userWord, isValidUsername, isValidWord };
