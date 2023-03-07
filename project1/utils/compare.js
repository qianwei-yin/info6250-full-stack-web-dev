'use strict';

const compare = (reference, candidate) => {
	if (!candidate) return 0;

	let sameNum = 0;
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
};

module.exports = compare;
