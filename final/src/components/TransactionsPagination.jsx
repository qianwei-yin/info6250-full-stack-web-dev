import { ReactComponent as Left } from '../icons/angle-left-solid.svg';
import { ReactComponent as Right } from '../icons/angle-right-solid.svg';
import { useTransactionContext } from '../context/transactionContext';
import { SET_PAGE } from '../scripts/actions/transactionActions';

const TransactionsPagination = () => {
	const { page, totals, setPage, refreshTransactions, setChosenTransactionId, dispatch } = useTransactionContext();

	function handleDecreasePage() {
		if (page === 1) return;
		// setChosenTransactionId('');
		setPage(page - 1);
		// refreshTransactions();
		// Why not use useEffect to refresh when page changes?
		// Because there is a feature: after creating/updating a transaction, the pagination will automatically go to the created/updated transaction's page, i.e. page changes! In this situation, I don't want the edit form to be cleared.
		// However, when user chooses another time, so the page should be set to 1, i.e. page changes! In this situation, the edit form should be cleared.
		// Therefore, the code that should be executed are different in these 2 situations
	}
	function handleIncreasePage() {
		if (checkPage()) return;
		// setChosenTransactionId('');
		setPage(page + 1);
		// refreshTransactions();
	}
	// check if current page is the maximum
	function checkPage() {
		return 10 * page >= totals;
	}

	return (
		<div className="transactions-pagination">
			<span className="pagination__left">
				<Left className={`icon ${page === 1 ? 'inactive' : ''}`} onClick={handleDecreasePage} />
			</span>
			<span className="pagination__page">{page}</span>
			<span className="pagination__right">
				<Right className={`icon ${checkPage() ? 'inactive' : ''}`} onClick={handleIncreasePage} />
			</span>
		</div>
	);
};

export default TransactionsPagination;
