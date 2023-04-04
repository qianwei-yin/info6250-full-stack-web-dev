export function fetchSession() {
	return resolveFetchPromise(fetch('/api/v1/session'));
}

export function fetchLogin(username) {
	return resolveFetchPromise(
		fetch('/api/v1/session', {
			method: 'POST',
			headers: new Headers({
				'content-type': 'application/json',
			}),
			body: JSON.stringify({ username }),
		})
	);
}

export function fetchLogout() {
	return resolveFetchPromise(
		fetch('/api/v1/session', {
			method: 'DELETE',
		})
	);
}

export function fetchWord() {
	return resolveFetchPromise(fetch('/api/v1/word'));
}

export function fetchUpdateWord(word) {
	return resolveFetchPromise(
		fetch('/api/v1/word', {
			method: 'POST',
			headers: new Headers({
				'content-type': 'application/json',
			}),
			body: JSON.stringify({ word }),
		})
	);
}

function resolveFetchPromise(promise) {
	return promise
		.catch(() => Promise.reject({ error: 'network-error' }))
		.then((resp) => {
			if (resp.ok) {
				return resp.json();
			}
			return resp
				.json()
				.catch((error) => Promise.reject({ error })) // error when parsing
				.then((err) => Promise.reject(err)); // error message from server
		});
}
