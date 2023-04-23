import { useEffect } from 'react';
import './css/index.css';
import { useAppContext } from './context/appContext';
import { useUserContext } from './context/userContext';
import { useTransactionContext } from './context/transactionContext';
import pageLinks from './scripts/constants/pageLinks';
import LoginPage from './pages/LoginPage';
import { Loading, Navbar, Prompt } from './components';
import { fetchSession } from './services/sessionServices';
import { fetchCategories } from './services/categoryServices';
import { fetchAccounts, fetchDefaultAccount } from './services/accountServices';
import { ERRORS, ERROR_MESSAGES } from './scripts/constants/errorConstants';
import { SET_LOADING_PAGE } from './scripts/actions/appActions';

function App() {
	const { prompt, theme, page, loggedIn, setLoggedIn, openPrompt, resetAppState, setLoading, loadingPage } =
		useAppContext();
	const { setUsername, resetUserState, setCategories, setAccounts, setDefaultAccount } = useUserContext();
	const { resetTransactionState } = useTransactionContext();

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	// When refreshing the page, get session and check if the user is logged in
	useEffect(() => {
		setLoading({ type: SET_LOADING_PAGE, value: true });

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
			})
			.finally(() => {
				setLoading({ type: SET_LOADING_PAGE, value: false });
			});
	}, []);

	return (
		<>
			{prompt.showPrompt && <Prompt type={prompt.promptType} msg={prompt.promptMsg} />}
			{/* Use IFFE to do conditional rendering */}
			{(() => {
				if (loadingPage) {
					return (
						<div className="center-child">
							<Loading size="4" color="amber" />
						</div>
					);
				}
				if (loggedIn) {
					return (
						<>
							<Navbar />
							{pageLinks[page]}
						</>
					);
				}
				return <LoginPage />;
			})()}
		</>
	);
}

export default App;
