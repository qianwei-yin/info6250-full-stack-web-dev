import { SET_USERNAME, RESET_USER_STATE, SET_CATEGORIES, SET_ACCOUNTS } from '../scripts/userActions';

const reducer = (state, action) => {
	switch (action.type) {
		case SET_USERNAME:
			return { ...state, username: action.payload };
		case RESET_USER_STATE:
			return { ...action.payload };
		case SET_CATEGORIES:
			return { ...state, categories: action.payload };
		case SET_ACCOUNTS:
			return { ...state, accounts: action.payload };
		default:
			throw new Error(`No matching "${action.type}" - action type.`);
	}
};

export default reducer;
