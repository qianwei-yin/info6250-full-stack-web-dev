import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/appContext';
import { useTransactionContext } from '../context/transactionContext';
import { fetchTransactions } from '../services/transactionServices';
import EditForm from './EditForm';
import TransactionItem from './TransactionItem';

const sortMethods = ['newer', 'older', 'larger', 'smaller'];

const TransactionsSection = () => {
	const { catchErrorDuringUserAction } = useAppContext();
	const {
		transactions,
		setTransactions,
		pickedTimeOption,
		pickedTimeIndex,
		pickedTimeStartDate: startDate,
		pickedTimeEndDate: endDate,
		sortMethod,
		setSortMethod,
	} = useTransactionContext();

	const [chosenTransactionId, setChosenTransactionId] = useState('');

	useEffect(() => {
		fetchTransactions({ startDate, endDate, sortMethod })
			.then((data) => {
				setTransactions(data.transactions);
			})
			.catch(catchErrorDuringUserAction);
	}, [sortMethod, pickedTimeOption, pickedTimeIndex]);

	return (
		<div className="transactions-section">
			<div className="transaction-items">
				<div className="transactions-actions">
					<button className="btn--with-border" onClick={() => setChosenTransactionId('')}>
						Add
					</button>
					<select
						name="sort-method"
						id="sort-method"
						className="form-row__select"
						defaultValue={sortMethod}
						onChange={(e) => setSortMethod(e.target.value)}
					>
						{sortMethods.map((el) => {
							return (
								<option key={el} value={el}>
									{el}
								</option>
							);
						})}
					</select>
				</div>
				<div className="transactions">
					{transactions.map((el) => {
						return (
							<TransactionItem
								key={el.id}
								transaction={el}
								setChosenTransaction={setChosenTransactionId}
							/>
						);
					})}
				</div>
			</div>

			<EditForm chosenTransactionId={chosenTransactionId} setChosenTransactionId={setChosenTransactionId} />
		</div>
	);
};

export default TransactionsSection;
