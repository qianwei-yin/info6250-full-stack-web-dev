import { useState } from 'react';
import Warning from './Warning';
import Logo from './Logo';
import { fetchLogin, fetchWord } from '../services';
import { ERROR_MESSAGES } from '../errorConstant';
import Loading from './Loading';

const Login = ({ states: { warningParams }, setStates }) => {
	const [isLoginLoading, setIsLoginLoading] = useState(false);
	const [usernameInput, setUsernameInput] = useState('');

	function handleSubmit(e) {
		e.preventDefault();

		// before fetching
		setIsLoginLoading(true);
		setStates((oldStates) => {
			return {
				...oldStates,
				warningParams: {
					showWarning: false,
					warningMsg: '',
				},
			};
		});

		fetchLogin(usernameInput)
			.then((data) => {
				return fetchWord();
			})
			.then((data) => {
				setStates((oldStates) => {
					return {
						...oldStates,
						loggedIn: true,
						username: data.username,
						storedWord: data.storedWord,
					};
				});
			})
			.catch((err) => {
				console.log(err);
				setStates((oldStates) => {
					return {
						...oldStates,
						warningParams: {
							showWarning: true,
							warningMsg: ERROR_MESSAGES[err.error] || ERROR_MESSAGES.default,
						},
					};
				});
			})
			.finally(() => {
				setIsLoginLoading(false);
			});
	}

	return (
		<div className="login-section" onSubmit={handleSubmit}>
			<form className="form login-form">
				<Logo />

				<h3 className="login-text">{isLoginLoading ? <Loading /> : 'login'}</h3>

				<Warning warningParams={warningParams} />

				<div className="form-row">
					<label htmlFor="username" className="form-label">
						user name
					</label>
					<input
						type="text"
						className="form-input input--username"
						name="username"
						value={usernameInput}
						onInput={(e) => setUsernameInput(e.target.value)}
					/>
				</div>
				<button className="btn btn--submit btn--login" type="submit" disabled={isLoginLoading}>
					log in
				</button>
			</form>
		</div>
	);
};
export default Login;
