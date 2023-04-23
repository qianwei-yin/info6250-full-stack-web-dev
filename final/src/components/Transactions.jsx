import { useTransactionContext } from '../context/transactionContext';
import { TransactionItem } from '../components';

const Transactions = () => {
	const { transactions, chosenTransactionId, setChosenTransactionId, totals } = useTransactionContext();

	return (
		<>
			<p>There are {totals} transactions.</p>
			<div className="transactions">
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
		</>
	);
};

export default Transactions;
