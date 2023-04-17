import { useState } from 'react';
import { useAppContext } from '../context/appContext';
import { useUserContext } from '../context/userContext';
import { fetchLogin } from '../services/sessionServices';
import { fetchCategories } from '../services/categoryServices';
import { fetchAccounts } from '../services/accountServices';
import { FormRowInput, ThemeToggler, Loading, Prompt, Logo } from '../components';

const LoginPage = () => {
	const {
		prompt,
		catchErrorDuringUserAction,
		setLoggedIn,
		setLoadingLogin,
		openPrompt,
		closePrompt,
		loggedIn,
		loadingLogin,
	} = useAppContext();
	const { setUsername, setCategories, setAccounts } = useUserContext();

	const [usernameInput, setUsernameInput] = useState('');

	function handleUsernameInput(e) {
		setUsernameInput(e.target.value);
	}

	function handleTestUserLogin() {
		setUsernameInput('conway');
		handleSubmit(null);
	}

	function handleSubmit(e) {
		if (e) e.preventDefault();

		setLoadingLogin(true);
		closePrompt();

		fetchLogin(usernameInput)
			.then((data) => {
				setLoggedIn(true);
				setUsername(data.username);

				return fetchCategories();
			})
			.then((data) => {
				setCategories(data.categories);

				return fetchAccounts();
			})
			.then((data) => {
				setAccounts(data.accounts);
			})
			.catch(catchErrorDuringUserAction)
			.finally(() => {
				setLoadingLogin(false);
			});
	}

	return (
		<>
			<div className="login-header">
				<Logo />
				<ThemeToggler />
			</div>
			<form className="login-form" onSubmit={handleSubmit}>
				<h1 className="login-form__text">Login</h1>

				{prompt.showPrompt && <Prompt type={prompt.promptType} msg={prompt.promptMsg} />}

				<FormRowInput
					props={{
						name: 'username',
						label: 'username',
						type: 'text',
						handleInput: handleUsernameInput,
						value: usernameInput,
					}}
				/>

				<button className="btn--with-border" type="submit">
					{loadingLogin ? <Loading /> : 'Log In'}
				</button>

				<button className="btn--with-border" onClick={handleTestUserLogin}>
					{loadingLogin ? <Loading /> : 'Log In As Test User'}
				</button>
			</form>
		</>
	);
};

export default LoginPage;
