import resolveFetchPromise from './resolveFetchPromise';

function fetchAccounts() {
	return resolveFetchPromise(fetch('/api/v1/accounts'));
}

function fetchDefaultAccount() {
	return resolveFetchPromise(fetch('/api/v1/accounts/default'));
}

function fetchUpdateAccounts({ accountType, account, action }) {
	return resolveFetchPromise(
		fetch(`/api/v1/accounts`, {
			method: 'PATCH',
			headers: new Headers({
				'content-type': 'application/json',
			}),
			body: JSON.stringify({ accountType, account, action }),
		})
	);
}

function fetchUpdateDefaultAccount({ accountType, account }) {
	return resolveFetchPromise(
		fetch(`/api/v1/accounts/default`, {
			method: 'PATCH',
			headers: new Headers({
				'content-type': 'application/json',
			}),
			body: JSON.stringify({ accountType, account }),
		})
	);
}

export { fetchAccounts, fetchUpdateAccounts, fetchDefaultAccount, fetchUpdateDefaultAccount };
