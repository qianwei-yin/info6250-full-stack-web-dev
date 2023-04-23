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
	SET_LOADING_LOGIN,
	SET_LOADING_LOGOUT,
	SET_LOADING_PAGE,
	SET_LOADING_DASHBOARD,
	SET_LOADING_TRANSACTIONS,
	SET_LOADING_SETTINGS_ADD,
	SET_LOADING_SETTINGS_DELETE,
	SET_LOADING_TRANSACTIONS_DELETE,
} from '../scripts/actions/appActions';

const reducer = (state, action) => {
	switch (action.type) {
		case SET_LOADING_LOGIN:
			return { ...state, loadingLogin: action.payload };
		case SET_LOADING_LOGOUT:
			return { ...state, loadingLogout: action.payload };
		case SET_LOADING_PAGE:
			return { ...state, loadingPage: action.payload };
		case SET_LOADING_DASHBOARD:
			return { ...state, loadingDashboard: action.payload };
		case SET_LOADING_TRANSACTIONS:
			return { ...state, loadingTransactions: action.payload };
		case SET_LOADING_SETTINGS_ADD:
			return { ...state, loadingSettingsAdd: action.payload };
		case SET_LOADING_SETTINGS_DELETE:
			return { ...state, loadingSettingsDelete: action.payload };
		case SET_LOADING_TRANSACTIONS_DELETE:
			return { ...state, loadingTransactionsDelete: action.payload };
		case TOGGLE_THEME:
			const newTheme = state.theme === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', newTheme);
			return { ...state, theme: newTheme };
		case CHANGE_PAGE:
			return { ...state, page: action.payload };
		case SET_LOGGED_IN:
			return { ...state, loggedIn: action.payload };
		case OPEN_PROMPT:
			const { promptType, promptMsg } = action.payload;
			return {
				...state,
				prompt: {
					showPrompt: true,
					promptType,
					promptMsg,
				},
			};
		case CLOSE_PROMPT:
			return {
				...state,
				prompt: {
					showPrompt: false,
					promptType: '',
					promptMsg: '',
				},
			};
		case RESET_APP_STATE:
			return { ...action.payload, theme: state.theme };
		case OPEN_MODAL:
			return { ...state, showModal: true };
		case CLOSE_MODAL:
			return { ...state, showModal: false };
		case SET_SETTINGS_SECTION:
			return { ...state, settingsSection: action.payload };
		default:
			throw new Error(`No matching "${action.type}" - action type.`);
	}
};

export default reducer;
