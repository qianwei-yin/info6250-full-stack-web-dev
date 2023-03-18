'use strict';

export function isValidUsername(username) {
	if (username === '') return false;
	return username.trim().match(/^[A-Za-z0-9_]+$/);
}

export function isValidWord(word) {
	if (word === '') return false;
	return word.trim().match(/^[A-Za-z]*$/);
}
