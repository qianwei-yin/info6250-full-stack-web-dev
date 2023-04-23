import React, { useContext, useReducer } from 'react';
import dayjs from 'dayjs';
import reducer from '../reducers/transactionReducer';
import {
	SET_TRANSACTIONS,
	SET_BILL,
	SET_PICKED_TIME_OPTION,
	SET_PICKED_TIME_INDEX,
	SET_PICKED_CURRENT_TIME,
	RESET_TRANSACTION_STATE,
	SET_PICKED_TIME_DATE,
	SET_SORT_METHOD,
	SET_PAGE,
	SET_TOTALS,
	SET_CHOSEN_TRANSACTION_ID,
} from '../scripts/actions/transactionActions';
import { fetchTransactions } from '../services/transactionServices';
import { useAppContext } from './appContext';
import { SET_LOADING_TRANSACTIONS } from '../scripts/actions/appActions';

const initialState = {
	bill: { income: {}, expenses: {} },
	transactions: [],
	pickedTimeOption: 'Monthly',
	pickedTimeIndex: dayjs().set('date', 1).set('hour', 0).set('minute', 0),
	pickedCurrentTime: dayjs().format('MMMM'),
	pickedTimeStartDate: dayjs().set('date', 1).format('YYYY-MM-DD'),
	pickedTimeEndDate: dayjs().endOf('month').format('YYYY-MM-DD'),
	sortMethod: 'newer',
	page: 1,
	totals: 0,
	chosenTransactionId: '',
};

const TransactionContext = React.createContext();

export const TransactionProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { catchErrorDuringUserAction, setLoading, loadingTransactions } = useAppContext();

	function resetTransactionState() {
		dispatch({ type: RESET_TRANSACTION_STATE, payload: initialState });
	}

	function setBill(bill) {
		dispatch({ type: SET_BILL, payload: bill });
	}

	function setTransactions(transactions) {
		dispatch({ type: SET_TRANSACTIONS, payload: transactions });
	}

	function setPage(page) {
		dispatch({ type: SET_PAGE, payload: page });
	}

	function setTotals(totals) {
		dispatch({ type: SET_TOTALS, payload: totals });
	}

	function refreshTransactions() {
		const { pickedTimeStartDate: startDate, pickedTimeEndDate: endDate, sortMethod, page } = state;

		setLoading({ type: SET_LOADING_TRANSACTIONS, value: true });
		fetchTransactions({ startDate, endDate, sortMethod, page })
			.then((data) => {
				console.log('trans');
				setTotals(data.totals);
				setTransactions(data.transactions);
				setChosenTransactionId('');
			})
			.catch(catchErrorDuringUserAction)
			.finally(() => setLoading({ type: SET_LOADING_TRANSACTIONS, value: false }));
	}

	function setPickedTimeOption(option) {
		dispatch({ type: SET_PICKED_TIME_OPTION, payload: option });
		dispatch({ type: SET_PICKED_CURRENT_TIME });
		dispatch({ type: SET_PICKED_TIME_DATE });
	}
	function setPickedTimeIndex(direction) {
		dispatch({ type: SET_PICKED_TIME_INDEX, payload: direction });
		dispatch({ type: SET_PICKED_CURRENT_TIME });
		dispatch({ type: SET_PICKED_TIME_DATE });
	}

	function setSortMethod(method) {
		dispatch({ type: SET_SORT_METHOD, payload: method });
	}

	function setChosenTransactionId(id) {
		dispatch({ type: SET_CHOSEN_TRANSACTION_ID, payload: id });
	}

	return (
		<TransactionContext.Provider
			value={{
				...state,
				dispatch,
				resetTransactionState,
				setBill,
				setTransactions,
				setPickedTimeOption,
				setPickedTimeIndex,
				setSortMethod,
				refreshTransactions,
				setPage,
				setTotals,
				setChosenTransactionId,
			}}
		>
			{children}
		</TransactionContext.Provider>
	);
};

export const useTransactionContext = () => {
	return useContext(TransactionContext);
};
