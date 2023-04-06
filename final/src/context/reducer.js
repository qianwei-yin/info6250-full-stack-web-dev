import { TOGGLE_THEME } from './actions';

const reducer = (state, action) => {
	switch (action.type) {
		case TOGGLE_THEME:
			return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
		default:
			throw new Error(`No matching "${action.type}" - action type.`);
	}
};

export default reducer;
