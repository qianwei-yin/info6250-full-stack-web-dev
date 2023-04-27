import resolveFetchPromise from './resolveFetchPromise';

// GET request cannot pass body! So the parameters should be included in the url
function fetchTransactions({ startDate, endDate, sortMethod, page }) {
	return resolveFetchPromise(
		fetch(`/api/v1/transactions?startDate=${startDate}&endDate=${endDate}&sortMethod=${sortMethod}&page=${page}`)
	);
}

function fetchTargetedTransactionPage({ sortMethod, id, startDate, endDate }) {
	return resolveFetchPromise(
		fetch(`/api/v1/transactions/${id}?sortMethod=${sortMethod}&startDate=${startDate}&endDate=${endDate}`)
	);
}

function fetchBill({ startDate, endDate }) {
	return resolveFetchPromise(fetch(`/api/v1/transactions/bill?startDate=${startDate}&endDate=${endDate}`));
}

function fetchCreateTransaction({ amount, category, time, type, description, accountType, account }) {
	return resolveFetchPromise(
		fetch('/api/v1/transactions', {
			method: 'POST',
			headers: new Headers({
				'content-type': 'application/json',
			}),
			body: JSON.stringify({ amount, category, time, type, description, accountType, account }),
		})
	);
}

function fetchUpdateTransaction({ id, amount, category, time, type, description, accountType, account }) {
	return resolveFetchPromise(
		fetch(`/api/v1/transactions/${id}`, {
			method: 'PATCH',
			headers: new Headers({
				'content-type': 'application/json',
			}),
			body: JSON.stringify({ amount, category, time, type, description, accountType, account }),
		})
	);
}

function fetchDeleteTransaction(id) {
	return resolveFetchPromise(fetch(`/api/v1/transactions/${id}`, { method: 'DELETE' }));
}

export {
	fetchTransactions,
	fetchTargetedTransactionPage,
	fetchBill,
	fetchCreateTransaction,
	fetchUpdateTransaction,
	fetchDeleteTransaction,
};
