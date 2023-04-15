import { useState, useEffect } from 'react';
import './app.css';
import Home from './components/Home';
import Login from './components/Login';
import Loading from './components/Loading';
import { fetchSession, fetchWord } from './services';
import { ERRORS, ERROR_MESSAGES } from './errorConstant';

function App() {
	const [states, setStates] = useState({
		loggedIn: false,
		username: '',
		storedWord: '',
		warningParams: {
			showWarning: false,
			warningMsg: '',
		},
		isInitialFetchLoading: false,
	});

	// Only runs when page refresh
	useEffect(() => {
		// loading
		setStates((oldStates) => {
			return {
				...oldStates,
				isInitialFetchLoading: true,
				warningParams: {
					showWarning: false,
					warningMsg: '',
				},
			};
		});

		// start fetching
		fetchSession()
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
				// here auth-missing is not an error
				if (err.error === ERRORS.AUTH_MISSING) return;
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
				setStates((oldStates) => {
					return { ...oldStates, isInitialFetchLoading: false };
				});
			});
	}, []);

	if (states.isInitialFetchLoading) return <Loading />;
	if (states.loggedIn) return <Home states={states} setStates={setStates} />;
	return <Login states={states} setStates={setStates} />;
}

export default App;
