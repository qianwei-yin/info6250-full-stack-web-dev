const userWord = {};

function isValidUsername(username) {
	if (!username) return false;
	return username.trim().match(/^[A-Za-z0-9_]+$/);
}

// word can be an empty string
function isValidWord(word) {
	if (word.trim() === '') return false;
	return word.trim().match(/^[A-Za-z]*$/);
}

module.exports = { userWord, isValidUsername, isValidWord };
