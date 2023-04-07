import { useState } from 'react';
import Logo from './Logo';
import Alert from './Alert';
import { isAlphaNumeric } from '../scripts/utils';

const Login = ({ state: { alertParams }, setters: { setLoggedIn, setAlertParams, setUsername } }) => {
	const [usernameInput, setUsernameInput] = useState('');

	function handleSubmit(e) {
		e.preventDefault();

		if (usernameInput === 'dog') {
			setAlertParams({
				showAlert: true,
				alertType: 'warning',
				alertMsg: 'Sorry, DOGs are forbidden.',
			});
			return;
		}

		if (!isAlphaNumeric(usernameInput)) {
			setAlertParams({
				showAlert: true,
				alertType: 'warning',
				alertMsg: 'Username should only contain letters and numbers.',
			});
			return;
		}

		setLoggedIn(true);
		setUsername(usernameInput);
		setAlertParams({
			showAlert: false,
			alertType: 'warning',
			alertMsg: '',
		});
	}

	return (
		<form className="login__form" onSubmit={handleSubmit}>
			<Logo />
			<Alert state={{ alertParams }} />
			<input
				type="text"
				className="input login__input"
				placeholder="User Name"
				name="username"
				value={usernameInput}
				onInput={(e) => setUsernameInput(e.target.value)}
			/>
			<button className="btn--outline" type="submit">
				log in
			</button>
		</form>
	);
};

export default Login;
