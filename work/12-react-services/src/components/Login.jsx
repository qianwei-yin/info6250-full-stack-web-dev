import { useState } from 'react';
import Warning from './Warning';
import Logo from './Logo';

const Login = ({ states: { loggedIn, warningParams }, setStates }) => {
	const [usernameInput, setUsernameInput] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
	}

	return (
		<div className="login-section" onSubmit={handleSubmit}>
			<form className="form login-form">
				<Logo />

				<h3 className="login-text">login</h3>

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
				<button className="btn btn--submit btn--login" type="submit">
					log in
				</button>
			</form>
		</div>
	);
};
export default Login;
