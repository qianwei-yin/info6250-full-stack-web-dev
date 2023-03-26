export function fetchSession() {
	return fetch('/api/v1/sessions', {
		method: 'GET',
	})
		.catch(() => Promise.reject({ error: 'network-error' }))
		.then((resp) => {
			if (resp.ok) {
				return resp.json();
			}
			return resp
				.json()
				.catch((error) => Promise.reject({ error }))
				.then((err) => Promise.reject(err));
		});
}

export function fetchLogin(username) {
	return fetch('/api/v1/sessions', {
		method: 'POST',
		headers: new Headers({
			'content-type': 'application/json',
		}),
		body: JSON.stringify({ username }),
	})
		.catch(() => Promise.reject({ error: 'network-error' }))
		.then((resp) => {
			if (resp.ok) {
				return Promise.resolve();
			}
			return resp
				.json()
				.catch((error) => Promise.reject({ error }))
				.then((err) => Promise.reject(err));
		});
}

export function fetchLogout() {
	return fetch('/api/v1/sessions', {
		method: 'DELETE',
	})
		.catch(() => Promise.reject({ error: 'network-error' }))
		.then((resp) => {
			if (resp.ok) {
				return Promise.resolve();
			}
			return resp
				.json()
				.catch((error) => Promise.reject({ error }))
				.then((err) => Promise.reject(err));
		});
}

export function fetchUsers() {
	return fetch('/api/v1/users', { method: 'GET' })
		.catch(() => Promise.reject({ error: 'network-error' }))
		.then((resp) => {
			if (resp.ok) return resp.json();
			return resp
				.json()
				.catch((error) => Promise.reject({ error }))
				.then((err) => Promise.reject(err));
		});
}

export function fetchMessages() {
	return fetch('/api/v1/messages', { method: 'GET' })
		.catch(() => Promise.reject({ error: 'network-error' }))
		.then((resp) => {
			if (resp.ok) return resp.json();
			return resp
				.json()
				.catch((error) => Promise.reject({ error }))
				.then((err) => Promise.reject(err));
		});
}

export function fetchAddMessage(message) {
	return fetch('/api/v1/messages', {
		method: 'POST',
		headers: new Headers({
			'content-type': 'application/json',
		}),
		body: JSON.stringify({ message }),
	})
		.catch(() => Promise.reject({ error: 'network-error' }))
		.then((resp) => {
			if (resp.ok) {
				return resp.json();
			}
			return resp
				.json()
				.catch((error) => Promise.reject({ error }))
				.then((err) => Promise.reject(err));
		});
}
