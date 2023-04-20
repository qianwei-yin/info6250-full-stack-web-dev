import { useEffect } from 'react';
import './css/index.css';
import { useAppContext } from './context/appContext';
import { useUserContext } from './context/userContext';
import { useTransactionContext } from './context/transactionContext';
import pageLinks from './scripts/constants/pageLinks';
import LoginPage from './pages/LoginPage';
import { Navbar, Prompt } from './components';
import { fetchSession } from './services/sessionServices';
import { fetchCategories } from './services/categoryServices';
import { fetchAccounts, fetchDefaultAccount } from './services/accountServices';
import { ERRORS, ERROR_MESSAGES } from './scripts/constants/errorConstants';

function App() {
	const { prompt, theme, page, loggedIn, setLoggedIn, openPrompt, resetAppState } = useAppContext();
	const { setUsername, resetUserState, setCategories, setAccounts, setDefaultAccount } = useUserContext();
	const { resetTransactionState } = useTransactionContext();

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	// When refreshing the page, get session and check if the user is logged in
	useEffect(() => {
		fetchSession()
			.then((data) => {
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
			.catch((err) => {
				if (err.error === ERRORS.AUTH_MISSING) {
					resetAppState();
					resetUserState();
					resetTransactionState();
				} else {
					openPrompt({
						promptType: 'warning',
						promptMsg: ERROR_MESSAGES[err.error] || ERROR_MESSAGES.default,
					});
				}
			});
	}, []);

	return (
		<>
			{prompt.showPrompt && <Prompt type={prompt.promptType} msg={prompt.promptMsg} />}

			{loggedIn ? (
				<>
					<Navbar />
					{pageLinks[page]}
				</>
			) : (
				<LoginPage />
			)}
		</>
	);
}

export default App;
