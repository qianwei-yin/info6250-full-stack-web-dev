function isAlphaNumeric(str) {
	return /^[0-9A-Z]+$/i.test(str);
}

function isAlpha(str) {
	return /^[A-Z]+$/i.test(str);
}

function compare(candidate) {
	let sameNum = 0;
	const reference = 'recat';
	const refLetterMap = {};

	for (let letter of reference.toLowerCase()) {
		if (!refLetterMap[letter]) {
			refLetterMap[letter] = 0;
		}
		refLetterMap[letter] += 1;
	}

	for (let letter of candidate.toLowerCase()) {
		if (refLetterMap[letter] > 0) {
			sameNum++;
			refLetterMap[letter]--;
		}
	}

	return sameNum;
}

export { isAlphaNumeric, isAlpha, compare };
