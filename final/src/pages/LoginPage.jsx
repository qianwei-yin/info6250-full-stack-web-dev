import { useState } from 'react';
import { useAppContext } from '../context/appContext';
import { useUserContext } from '../context/userContext';
import { fetchLogin } from '../services/sessionServices';
import { fetchCategories } from '../services/categoryServices';
import { fetchAccounts, fetchDefaultAccount } from '../services/accountServices';
import { FormRowInput, ThemeToggler, Loading, Logo } from '../components';

const LoginPage = () => {
	const { catchErrorDuringUserAction, setLoggedIn, setLoadingLogin, closePrompt, loggedIn, loadingLogin } =
		useAppContext();
	const { setUsername, setCategories, setAccounts, setDefaultAccount } = useUserContext();

	const [usernameInput, setUsernameInput] = useState('');

	function handleUsernameInput(e) {
		setUsernameInput(e.target.value);
	}

	// need to separate login function out, because the login function will be used in other places.
	function handleSubmit(e) {
		e.preventDefault();
		login(usernameInput);
	}

	function login(username) {
		setLoadingLogin(true);

		fetchLogin(username)
			.then((data) => {
				closePrompt();
				setUsername(data.username);

				return fetchCategories();
			})
			.then((data) => {
				setCategories(data.categories);

				return fetchAccounts();
			})
			.then((data) => {
				setAccounts(data.accounts);

				return fetchDefaultAccount();
			})
			.then((data) => {
				setDefaultAccount(data.defaultAccount);
				setLoggedIn(true);
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

				<FormRowInput
					props={{
						name: 'username',
						label: 'username',
						type: 'text',
						handleInput: handleUsernameInput,
						value: usernameInput,
					}}
				/>

				<button className="btn--with-border" type="submit" disabled={!usernameInput}>
					{loadingLogin ? <Loading /> : 'Log In'}
				</button>

				<button className="btn--with-border" onClick={() => login('conway')} type="button">
					{loadingLogin ? <Loading /> : 'Log In As Test User'}
				</button>
			</form>
		</>
	);
};

export default LoginPage;
