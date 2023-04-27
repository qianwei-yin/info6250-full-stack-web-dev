import resolveFetchPromise from './resolveFetchPromise';

function fetchSession() {
	return resolveFetchPromise(fetch('/api/v1/sessions'));
}

function fetchLogin(username) {
	return resolveFetchPromise(
		fetch('/api/v1/sessions', {
			method: 'POST',
			headers: new Headers({
				'content-type': 'application/json',
			}),
			body: JSON.stringify({ username }),
		})
	);
}

function fetchLogout() {
	return resolveFetchPromise(
		fetch('/api/v1/sessions', {
			method: 'DELETE',
		})
	);
}

export { fetchSession, fetchLogin, fetchLogout };
