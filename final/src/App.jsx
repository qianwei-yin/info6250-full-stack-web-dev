import { useEffect } from 'react';
import './css/index.css';
import { useAppContext } from './context/appContext';
import { useUserContext } from './context/userContext';
import { useTransactionContext } from './context/transactionContext';
import pageLinks from './scripts/pageLinks';
import LoginPage from './pages/LoginPage';
import { Navbar } from './components';
import { fetchSession } from './services/sessionServices';
import { fetchCategories } from './services/categoryServices';
import { fetchAccounts } from './services/accountServices';
import { ERRORS, ERROR_MESSAGES } from './scripts/errorConstants';

function App() {
	const { theme, page, loggedIn, setLoggedIn, openPrompt, resetAppState } = useAppContext();
	const { setUsername, resetUserState, setCategories, setAccounts } = useUserContext();
	const { resetTransactionState } = useTransactionContext();

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	// When refreshing the page, get session and check if the user is logged in
	useEffect(() => {
		fetchSession()
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

	if (!loggedIn) return <LoginPage />;
	return (
		<>
			<Navbar />
			{pageLinks[page]}
		</>
	);
}

export default App;
