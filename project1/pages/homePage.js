const allWords = require('../words.js');

const homePage = ({ gameData }) => {
	const referenceWord = gameData?.referenceWord || ''; // array contains arrays
	const validGuessedWords = gameData?.validGuessedWords || []; // array contains arrays
	const invalidGuessedWords = gameData?.invalidGuessedWords || []; // array contains strings
	const alertParams = gameData?.alertParams || {}; // object

	const validCount = validGuessedWords.length;

	let messageStart = 'Come on';
	let lastValidWord = '';
	let lastValidWordMatch = 0;
	let success = false;

	if (validCount > 0) {
		success = validGuessedWords[validCount - 1][0] === referenceWord;
		lastValidWord = validGuessedWords[validCount - 1][0];
		lastValidWordMatch = validGuessedWords[validCount - 1][1];
	}
	if (validCount > 1) {
		const compare = validGuessedWords[validCount - 1][1] - validGuessedWords[validCount - 2][1];
		if (compare > 0) messageStart = 'Closer';
		else if (compare < 0) messageStart = 'Ooops';
	}

	return `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />

				<link rel="stylesheet" href="./css/styles.css" />
				<link rel="stylesheet" href="./css/home.css" />

				<title>Home | Guess My Word</title>
			</head>
			<body>
				<section class="section-center ${success ? 'success' : ''}">
					<nav class="navbar">
						<form action="/new-game" method="post" class="new-game__form">
							<button class="new-game__btn btn--no-outline" type="submit">again</button>
						</form>
						<form action="/logout" method="post" class="logout__form">
							<button class="logout__btn btn--no-outline" type="submit">log out</button>
						</form>
					</nav>

					<p 
					class="alert ${alertParams?.showAlert ? 'show-alert' : ''} alert--${alertParams?.alertType}"
					>
						${alertParams?.alertMessage}
					</p>

					${
						success
							? '<p class="message">Nice job! You won the game!</p>'
							: `<p class="message">
								${
									lastValidWord
										? `${messageStart}! <span class="last-guessed__word">${lastValidWord}</span> Matches
								<span class="last-guessed__count">${lastValidWordMatch}</span> letters!`
										: 'Start your game! Beat it as quick as possible!'
								}
							</p>`
					}

					<main class="guess-area">
						<div class="full-list">
							<h3 class="full-list__title">All possible words</h3>
							<div class="full-list__words">
								${allWords.map((word) => `<p>${word}</p>`).join('')}
							</div>
						</div>
						<form action="/guess" method="post" class="guess__form">
							<input
								type="text"
								class="guess__input"
								placeholder="Have a guess from words on the left"
								name="guessWord"
							/>
							<button class="guess__btn btn--outline" type="submit" ${success ? 'disabled' : ''}>guess</button>
						</form>
						<div class="guessed-list">
							<h3 class="guessed-list__title">Guessed words</h3>
							<div class="guessed-list__content">
								<div class="guessed-list__content__title">
									<p>order</p>
									<p>word</p>
									<p>match</p>
								</div>
								<div class="guessed-list__content__words">
									${validGuessedWords
										.slice()
										.reverse()
										.map((el, index) => {
											return `
												<div class="guessed-list__content__words--row">
													<p>${validCount - index}</p>
													<p>${el[0]}</p>
													<p>${el[1]}</p>
												</div>
												`;
										})
										.join('')}
									${invalidGuessedWords
										.slice()
										.reverse()
										.map((el) => {
											return `
												<div class="guessed-list__content__words--row--invalid">
													<p>#</p>
													<p>${el}</p>
													<p>-</p>
												</div>
												`;
										})
										.join('')}
								</div>
							</div>
						</div>
					</main>
				</section>

				<footer class="footer">
					&copy; 2023 <span class="footer--company">guess my word</span> All rights reserved.
				</footer>
			</body>
		</html>
		`;
};

module.exports = homePage;
