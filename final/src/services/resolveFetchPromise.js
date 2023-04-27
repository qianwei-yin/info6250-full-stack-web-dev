function resolveFetchPromise(promise) {
	return promise
		.catch(() => Promise.reject({ error: 'network-error' }))
		.then((resp) => {
			if (resp.ok) {
				return resp.json();
			}
			return resp
				.json()
				.catch((error) => Promise.reject({ error })) // error during parsing
				.then((err) => Promise.reject(err)); // error from server
		});
}

export default resolveFetchPromise;
