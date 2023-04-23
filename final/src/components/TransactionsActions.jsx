import { useTransactionContext } from '../context/transactionContext';

const sortMethods = ['newer', 'older', 'larger', 'smaller'];

const TransactionsActions = () => {
	const { sortMethod, setSortMethod, setChosenTransactionId } = useTransactionContext();

	return (
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
	);
};

export default TransactionsActions;
