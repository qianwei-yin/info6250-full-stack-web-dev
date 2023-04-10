import resolveFetchPromise from './resolveFetchPromise';

function fetchAccounts() {
	return resolveFetchPromise(fetch('/api/v1/accounts'));
}

function fetchCreateAccount({ accountType, account }) {
	return resolveFetchPromise(
		fetch('/api/v1/accounts', {
			method: 'POST',
			'content-type': 'application/json',
			body: JSON.stringify({ accountType, account }),
		})
	);
}

function fetchUpdateAccount({ id, accountType, account }) {
	return resolveFetchPromise(
		fetch(`/api/v1/accounts/${id}`, {
			method: 'PATCH',
			'content-type': 'application/json',
			body: JSON.stringify({ id, accountType, account }),
		})
	);
}

function fetchDeleteAccount({ id, accountType, account }) {
	return resolveFetchPromise(
		fetch(`/api/v1/accounts/${id}`, {
			method: 'DELETE',
			'content-type': 'application/json',
			body: JSON.stringify({ id, accountType, account }),
		})
	);
}

export { fetchAccounts, fetchCreateAccount, fetchUpdateAccount, fetchDeleteAccount };
