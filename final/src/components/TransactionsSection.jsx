import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { useTransactionContext } from '../context/transactionContext';
import { EditForm, TransactionsActions, Transactions, TransactionsPagination, Loading } from '../components';

const TransactionsSection = () => {
	const { loadingTransactions } = useAppContext();
	const { transactions, pickedTimeOption, pickedTimeIndex, sortMethod, refreshTransactions, page, setPage } =
		useTransactionContext();

	useEffect(() => {
		if (page === 1) refreshTransactions();
		else setPage(1);
	}, [sortMethod, pickedTimeOption, pickedTimeIndex]);

	useEffect(() => {
		refreshTransactions();
	}, [page]);

	return (
		<div className="transactions-section">
			<div className="transaction-items">
				<TransactionsActions />

				{(() => {
					if (loadingTransactions) {
						return (
							<div className="center-child">
								<Loading size="3" color="amber" />
							</div>
						);
					}
					if (transactions.length > 0) {
						return <Transactions />;
					}
					return <p className="no-transactions">There is no transaction at this time.</p>;
				})()}
				<TransactionsPagination />
			</div>

			<EditForm />
		</div>
	);
};

export default TransactionsSection;
