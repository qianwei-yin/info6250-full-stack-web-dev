import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { ReactComponent as Left } from '../icons/angle-left-solid.svg';
import { ReactComponent as Right } from '../icons/angle-right-solid.svg';
import { useAppContext } from '../context/appContext';
import { useTransactionContext } from '../context/transactionContext';
import { fetchTransactions } from '../services/transactionServices';
import EditForm from './EditForm';
import TransactionItem from './TransactionItem';

const sortMethods = ['newer', 'older', 'larger', 'smaller'];

const TransactionsSection = () => {
	const {
		transactions,
		setTransactions,
		pickedTimeOption,
		pickedTimeIndex,
		sortMethod,
		setSortMethod,
		refreshTransactions,
		page,
		totals,
		setPage,
	} = useTransactionContext();

	const [chosenTransactionId, setChosenTransactionId] = useState('');

	useEffect(() => {
		console.log(1);
		setPage(1);
	}, [sortMethod, pickedTimeOption, pickedTimeIndex]);

	useEffect(() => {
		console.log(1);
		refreshTransactions();
		setChosenTransactionId('');
	}, [page, sortMethod, pickedTimeOption, pickedTimeIndex]);

	function handleDecreasePage() {
		if (page === 1) return;
		setPage(page - 1);
	}

	function handleIncreasePage() {
		if (checkPage()) return;
		setPage(page + 1);
	}

	// check if current page is the maximum
	function checkPage() {
		return 10 * page >= totals;
	}

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

				{transactions.length > 0 ? (
					<div className="transactions">
						<p>There are {totals} transactions.</p>
						{transactions.map((el) => {
							return (
								<TransactionItem
									key={el.id}
									transaction={el}
									chosenTransactionId={chosenTransactionId}
									setChosenTransaction={setChosenTransactionId}
								/>
							);
						})}
					</div>
				) : (
					<div className="transactions no-transactions">There is no transaction at this time.</div>
				)}

				<div className="transactions-pagination">
					<span className="pagination__left">
						<Left className={`icon ${page === 1 ? 'inactive' : ''}`} onClick={handleDecreasePage} />
					</span>
					<span className="pagination__page">{page}</span>
					<span className="pagination__right">
						<Right className={`icon ${checkPage() ? 'inactive' : ''}`} onClick={handleIncreasePage} />
					</span>
				</div>
			</div>

			<EditForm chosenTransactionId={chosenTransactionId} setChosenTransactionId={setChosenTransactionId} />
		</div>
	);
};

export default TransactionsSection;
