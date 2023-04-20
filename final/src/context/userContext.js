import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/userReducer';
import {
	SET_USERNAME,
	RESET_USER_STATE,
	SET_CATEGORIES,
	SET_ACCOUNTS,
	SET_DEFAULT_ACCOUNT,
} from '../scripts/actions/userActions';

const initialState = {
	username: '',
	categories: { income: [], expenses: [] },
	accounts: {
		cash: [],
		'debit cards': [],
		'credit cards': [],
		others: [],
	},
	defaultAccount: { accountType: 'cash', account: 'cash' },
};

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	function resetUserState() {
		dispatch({ type: RESET_USER_STATE, payload: initialState });
	}

	function setUsername(username) {
		dispatch({ type: SET_USERNAME, payload: username });
	}

	function setCategories(categories) {
		dispatch({ type: SET_CATEGORIES, payload: categories });
	}

	function setAccounts(accounts) {
		dispatch({ type: SET_ACCOUNTS, payload: accounts });
	}

	function setDefaultAccount({ accountType, account }) {
		dispatch({ type: SET_DEFAULT_ACCOUNT, payload: { accountType, account } });
	}

	return (
		<UserContext.Provider
			value={{
				...state,
				setUsername,
				resetUserState,
				setCategories,
				setAccounts,
				setDefaultAccount,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	return useContext(UserContext);
};
