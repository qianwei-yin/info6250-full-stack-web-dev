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

const reducer = (state, action) => {
	switch (action.type) {
		case TOGGLE_THEME:
			const newTheme = state.theme === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', newTheme);
			return { ...state, theme: newTheme };
		case CHANGE_PAGE:
			return { ...state, page: action.payload };
		case SET_LOGGED_IN:
			return { ...state, loggedIn: action.payload };
		case LOADING_LOGIN:
			return { ...state, loadingLogin: action.payload };
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
		default:
			throw new Error(`No matching "${action.type}" - action type.`);
	}
};

export default reducer;
