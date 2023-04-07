import { useState } from 'react';
import Logo from './Logo';
import UserInfo from './UserInfo';
import Alert from './Alert';
import { isAlpha, compare } from '../scripts/utils';

const Game = ({ state: { alertParams, username }, setters: { setLoggedIn, setAlertParams, setUsername } }) => {
	const [guessWordInput, setGuessWordInput] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		const candidate = guessWordInput;
		setGuessWordInput('');

		if (candidate.length !== 5) {
			setAlertParams({
				showAlert: true,
				alertType: 'warning',
				alertMsg: `"${candidate}" is not valid. Candidate word should be a 5-letter word.`,
			});
			return;
		}

		if (!isAlpha(candidate)) {
			setAlertParams({
				showAlert: true,
				alertType: 'warning',
				alertMsg: `"${candidate}" is not valid. Candidate word should only contain letters.`,
			});
			return;
		}

		const sameNum = compare(candidate);
		if (sameNum !== 5) {
			setAlertParams({
				showAlert: true,
				alertType: 'warning',
				alertMsg: `"${candidate}" had ${sameNum} letters in common. Come on!`,
			});
			return;
		}

		setAlertParams({
			showAlert: true,
			alertType: 'success',
			alertMsg: `"${candidate}" is the secret word!`,
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
