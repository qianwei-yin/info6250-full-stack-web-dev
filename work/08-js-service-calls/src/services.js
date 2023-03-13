'use strict';
// This exported function returns a promise
// that resolves with data
// or rejects with an error object

export function fetchSession() {
	return fetch('/api/session')
		.catch(() => Promise.reject({ error: 'network-error' }))
		.then((response) => {
			if (!response.ok) {
				return response.json().then((err) => Promise.reject(err));
			}
			return response.json();
		});
}

export function fetchWord() {
	return fetch('/api/word')
		.catch(() => Promise.reject({ error: 'network-error' }))
		.then((response) => {
			if (!response.ok) {
				return response.json().then((err) => Promise.reject(err));
			}
			return response.json();
		});
}

export function fetchLogin(username) {
	return (
		fetch('/api/session', {
			method: 'POST',
			headers: {
				'content-type': 'application/json', // set this header when sending JSON in the body of request
			},
			body: JSON.stringify({ username }),
		})
			// fetch() rejects on network error
			// So we convert that to a formatted error object
			// so our caller can handle all "errors" in a similar way
			.catch(() => Promise.reject({ error: 'network-error' }))
			.then((response) => {
				if (!response.ok) {
					// response.ok checks the status code from the service
					// This service returns JSON on errors,
					// so we use that as the error object and reject
					return response.json().then((err) => Promise.reject(err));
				}
				return response.json(); // happy status code means resolve with data from service
			})
	);
}

export function fetchLogout() {
	return fetch('/api/session', {
		method: 'DELETE',
	})
		.catch(() => Promise.reject({ error: 'network-error' }))
		.then((response) => {
			if (!response.ok) {
				return response.json().then((err) => Promise.reject(err));
			}
			return response.json();
		});
}

export function postWord(word) {
	return fetch('/api/word', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({ word }),
	})
		.catch(() => Promise.reject({ error: 'network-error' }))
		.then((response) => {
			if (!response.ok) {
				return response.json().then((err) => Promise.reject(err));
			}
			return response.json();
		});
}
