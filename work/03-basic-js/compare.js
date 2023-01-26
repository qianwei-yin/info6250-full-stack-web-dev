'use strict';
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {
	// DO NOT MODIFY

	/* YOU MAY MODIFY THE LINES BELOW */
	const word1 = lowerSort(word);
	const word2 = lowerSort(guess);

	const wordLength = word1.length;

	let [index1, index2, sameNum] = [0, 0, 0];
	while (index1 < wordLength && index2 < wordLength) {
		if (word1[index1].localeCompare(word2[index2]) === 0) {
			sameNum += 1;
			index1 += 1;
			index2 += 1;
		} else if (word1[index1].localeCompare(word2[index2]) < 0) {
			index1 += 1;
		} else {
			index2 += 1;
		}
	}

	return sameNum;
}

function lowerSort(word) {
	return word
		.toLowerCase()
		.split('')
		.sort((a, b) => {
			return a.localeCompare(b);
		});
}
