import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/appReducer';
import {
	TOGGLE_THEME,
	CHANGE_PAGE,
	OPEN_PROMPT,
	CLOSE_PROMPT,
	LOADING_LOGIN,
	SET_LOGGED_IN,
	RESET_APP_STATE,
	OPEN_MODAL,
	CLOSE_MODAL,
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
	loadingLogin: false,
	prompt: {
		showPrompt: false,
		promptType: '',
		promptMsg: '',
	},
	showModal: false,
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

	function setLoadingLogin(loading) {
		dispatch({ type: LOADING_LOGIN, payload: loading });
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

	return (
		<AppContext.Provider
			value={{
				...state,
				resetAppState,
				catchErrorDuringUserAction,
				toggleTheme,
				setPage,
				setLoggedIn,
				setLoadingLogin,
				openPrompt,
				closePrompt,
				openModal,
				closeModal,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
