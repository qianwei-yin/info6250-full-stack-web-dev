import { ReactComponent as Left } from '../icons/angle-left-solid.svg';
import { ReactComponent as Right } from '../icons/angle-right-solid.svg';
import { useTransactionContext } from '../context/transactionContext';

const TransactionsPagination = () => {
	const { page, totals, setPage } = useTransactionContext();

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
