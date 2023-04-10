import resolveFetchPromise from './resolveFetchPromise';

// GET request cannot pass body! So the parameters should be included in the url
function fetchTransactions({ startDate, endDate, sortMethod }) {
	return resolveFetchPromise(
		fetch(`/api/v1/transactions?startDate=${startDate}&endDate=${endDate}&sortMethod=${sortMethod}`)
	);
}

function fetchBill({ startDate, endDate }) {
	return resolveFetchPromise(fetch(`/api/v1/transactions/bill?startDate=${startDate}&endDate=${endDate}`));
}

function fetchCreateTransaction({ amount, category, time, type, description, accountType, account }) {
	return resolveFetchPromise(
		fetch('/api/v1/transactions', {
			method: 'POST',
			'content-type': 'application/json',
			body: JSON.stringify({ amount, category, time, type, description, accountType, account }),
		})
	);
}

function fetchUpdateTransaction({ id, amount, category, time, type, description, accountType, account }) {
	return resolveFetchPromise(
		fetch(`/api/v1/transactions/${id}`, {
			method: 'PATCH',
			'content-type': 'application/json',
			body: JSON.stringify({ amount, category, time, type, description, accountType, account }),
		})
	);
}

function fetchDeleteTransaction(id) {
	return resolveFetchPromise(fetch(`/api/v1/transactions/${id}`, { method: 'DELETE' }));
}

export { fetchTransactions, fetchBill, fetchCreateTransaction, fetchUpdateTransaction, fetchDeleteTransaction };
