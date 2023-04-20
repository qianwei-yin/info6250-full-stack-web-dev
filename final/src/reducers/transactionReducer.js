import dayjs from 'dayjs';
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
} from '../scripts/actions/transactionActions';

const reducer = (state, action) => {
	if (action.type === SET_BILL) {
		return { ...state, bill: action.payload };
	} else if (action.type === SET_TRANSACTIONS) {
		return { ...state, transactions: action.payload };
	} else if (action.type === SET_PICKED_TIME_OPTION) {
		const pickedTimeOption = action.payload;
		let pickedTimeIndex = dayjs().set('hour', 0).set('minute', 0);

		if (pickedTimeOption === 'Yearly') pickedTimeIndex = pickedTimeIndex.set('month', 0).set('date', 1);
		else if (pickedTimeOption === 'Monthly') pickedTimeIndex = pickedTimeIndex.set('date', 1);
		else if (pickedTimeOption === 'Weekly') pickedTimeIndex = pickedTimeIndex.set('day', 1);

		return { ...state, pickedTimeOption, pickedTimeIndex };
	} else if (action.type === SET_PICKED_TIME_INDEX) {
		const { pickedTimeOption: option, pickedTimeIndex: index } = state;
		const direction = action.payload;

		// increase date
		if (direction === 'forwards') {
			if (option === 'Yearly') return { ...state, pickedTimeIndex: index.add(1, 'year') };
			else if (option === 'Monthly') return { ...state, pickedTimeIndex: index.add(1, 'month') };
			else if (option === 'Weekly') return { ...state, pickedTimeIndex: index.add(1, 'week') };
			else if (option === 'Daily') return { ...state, pickedTimeIndex: index.add(1, 'day') };
		}
		// decrease date
		else if (direction === 'backwards') {
			if (option === 'Yearly') return { ...state, pickedTimeIndex: index.subtract(1, 'year') };
			else if (option === 'Monthly') return { ...state, pickedTimeIndex: index.subtract(1, 'month') };
			else if (option === 'Weekly') return { ...state, pickedTimeIndex: index.subtract(1, 'week') };
			else if (option === 'Daily') return { ...state, pickedTimeIndex: index.subtract(1, 'day') };
		}
	} else if (action.type === SET_PICKED_CURRENT_TIME) {
		const { pickedTimeOption: option, pickedTimeIndex: index } = state;

		if (option === 'Yearly') return { ...state, pickedCurrentTime: index.format('YYYY') };
		else if (option === 'Monthly') return { ...state, pickedCurrentTime: index.format('MMMM') };
		else if (option === 'Weekly')
			return {
				...state,
				pickedCurrentTime: `${index.format('MMM DD')} - ${index.add(6, 'day').format('MMM DD')}`,
			};
		else if (option === 'Daily') return { ...state, pickedCurrentTime: index.format('MM/DD/YYYY') };
	} else if (action.type === SET_PICKED_TIME_DATE) {
		const { pickedTimeOption: option, pickedTimeIndex: index } = state;
		const pickedTimeStartDate = index.format('YYYY-MM-DD');

		if (option === 'Yearly')
			return { ...state, pickedTimeStartDate, pickedTimeEndDate: index.endOf('year').format('YYYY-MM-DD') };
		else if (option === 'Monthly')
			return { ...state, pickedTimeStartDate, pickedTimeEndDate: index.endOf('month').format('YYYY-MM-DD') };
		else if (option === 'Weekly')
			return { ...state, pickedTimeStartDate, pickedTimeEndDate: index.add(6, 'day').format('YYYY-MM-DD') };
		else if (option === 'Daily')
			return { ...state, pickedTimeStartDate, pickedTimeEndDate: index.format('YYYY-MM-DD') };
	} else if (action.type === RESET_TRANSACTION_STATE) {
		return { ...action.payload };
	} else if (action.type === SET_SORT_METHOD) {
		return { ...state, sortMethod: action.payload };
	} else if (action.type === SET_PAGE) {
		return { ...state, page: action.payload };
	} else if (action.type === SET_TOTALS) {
		return { ...state, totals: action.payload };
	} else {
		throw new Error(`No matching "${action.type}" - action type.`);
	}
};

export default reducer;
