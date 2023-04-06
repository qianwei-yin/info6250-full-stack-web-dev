import React, { useContext, useReducer } from 'react';
import reducer from './reducer';
import { TOGGLE_THEME } from './actions';

const initialState = {
	theme: 'light',
};

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	function toggleTheme() {
		dispatch({ type: TOGGLE_THEME });
	}

	return <AppContext.Provider value={{ ...state, toggleTheme }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	return useContext(AppContext);
};
