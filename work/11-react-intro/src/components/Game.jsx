import { useState } from 'react';
import Logo from './Logo';
import UserInfo from './UserInfo';
import Alert from './Alert';
import { isAlpha, compare } from '../scripts/utils';

const Game = ({ state: { alertParams, username }, setters: { setLoggedIn, setAlertParams, setUsername } }) => {
	const [guessWordInput, setGuessWordInput] = useState('');

	function handleSubmit(e) {
		e.preventDefault();

		if (guessWordInput.length !== 5) {
			setAlertParams({
				showAlert: true,
				alertType: 'warning',
				alertMsg: `"${guessWordInput}" is not valid. Candidate word should be a 5-letter word.`,
			});
			return;
		}

		if (!isAlpha(guessWordInput)) {
			setAlertParams({
				showAlert: true,
				alertType: 'warning',
				alertMsg: `"${guessWordInput}" is not valid. Candidate word should only contain letters.`,
			});
			return;
		}

		const sameNum = compare(guessWordInput);
		if (sameNum !== 5) {
			setAlertParams({
				showAlert: true,
				alertType: 'warning',
				alertMsg: `"${guessWordInput}" had ${sameNum} letters in common. Come on!`,
			});
			return;
		}

		setAlertParams({
			showAlert: true,
			alertType: 'success',
			alertMsg: `"${guessWordInput}" is the secret word!`,
		});
	}

	function handleLogout() {
		setLoggedIn(false);
		setUsername('');
		setAlertParams({
			showAlert: false,
			alertType: '',
			alertMsg: '',
		});
	}

	return (
		<>
			<nav className="game-navbar">
				<UserInfo username={username} />
				<Logo />
				<button className="btn" onClick={handleLogout}>
					Log Out
				</button>
			</nav>

			<form className="guess__form" onSubmit={handleSubmit}>
				<Alert state={{ alertParams }} />
				<input
					type="text"
					className="input guess__input"
					placeholder="Guess a 5-letter word"
					name="guessWord"
					value={guessWordInput}
					onInput={(e) => setGuessWordInput(e.target.value)}
				/>
				<button className="btn--outline" type="submit">
					Guess
				</button>
			</form>
		</>
	);
};
export default Game;
