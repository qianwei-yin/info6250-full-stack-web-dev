import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/appReducer';
import {
	TOGGLE_THEME,
	CHANGE_PAGE,
	OPEN_PROMPT,
	CLOSE_PROMPT,
	SET_LOGGED_IN,
	RESET_APP_STATE,
	OPEN_MODAL,
	CLOSE_MODAL,
	SET_SETTINGS_SECTION,
} from '../scripts/actions/appActions';
import { ERRORS, ERROR_MESSAGES } from '../scripts/constants/errorConstants';

// get theme preference from local storage
function getStorageTheme() {
	let theme = 'light';
	if (localStorage.getItem('theme')) {
		theme = localStorage.getItem('theme');
	}
	return theme;
}

const initialState = {
	theme: getStorageTheme(),
	page: 'dashboard',
	loggedIn: false,
	prompt: {
		showPrompt: false,
		promptType: '',
		promptMsg: '',
	},
	showModal: false,
	settingsSection: 'categories',

	loadingLogin: false, // effect on login button
	loadingLogout: false, // effect on logout button
	loadingPage: false, // effect on the whole screen
	loadingDashboard: false, // effect on the dashboard page
	loadingTransactions: false, // effect on the left side of add page
	loadingSettingsAdd: false, // effect on the settings page when adding an item
	loadingSettingsDelete: false, // effect on Modal when deleting an item on settings page
	loadingTransactionsDelete: false, // effect on Modal when deleting a transaction
};

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	function catchErrorDuringUserAction(err) {
		console.log(err);
		if (err.error === ERRORS.AUTH_MISSING) {
			setLoggedIn(false);
		}
		openPrompt({ promptType: 'warning', promptMsg: ERROR_MESSAGES[err.error] || ERROR_MESSAGES.default });
	}

	function resetAppState() {
		dispatch({ type: RESET_APP_STATE, payload: initialState });
	}

	function toggleTheme() {
		dispatch({ type: TOGGLE_THEME });
	}

	function setPage(pageName) {
		dispatch({ type: CHANGE_PAGE, payload: pageName });
	}

	function setLoggedIn(loggedIn) {
		dispatch({ type: SET_LOGGED_IN, payload: loggedIn });
	}

	function setLoading({ type, value }) {
		dispatch({ type, payload: value });
	}

	// Because a prompt will stay on the page for around 5 sec, if during this period, user submit multiple false request, setTimeout makes sure that the prompt can appear multiple times.
	function openPrompt({ promptType, promptMsg }) {
		dispatch({ type: CLOSE_PROMPT });
		setTimeout(() => {
			dispatch({ type: OPEN_PROMPT, payload: { promptType, promptMsg } });
		}, 0);
	}
	function closePrompt() {
		dispatch({ type: CLOSE_PROMPT });
	}

	function openModal() {
		dispatch({ type: OPEN_MODAL });
	}
	function closeModal() {
		dispatch({ type: CLOSE_MODAL });
	}

	function setSettingsSection(section) {
		dispatch({ type: SET_SETTINGS_SECTION, payload: section });
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				resetAppState,
				catchErrorDuringUserAction,
				toggleTheme,
				setPage,
				setLoggedIn,
				setLoading,
				openPrompt,
				closePrompt,
				openModal,
				closeModal,
				setSettingsSection,
				dispatch,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
