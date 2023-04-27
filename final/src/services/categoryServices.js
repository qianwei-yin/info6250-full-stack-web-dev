import resolveFetchPromise from './resolveFetchPromise';

function fetchCategories() {
	return resolveFetchPromise(fetch('/api/v1/categories'));
}

function fetchUpdateCategories({ type, categoryName, action }) {
	return resolveFetchPromise(
		fetch('/api/v1/categories', {
			method: 'PATCH',
			headers: new Headers({
				'content-type': 'application/json',
			}),
			body: JSON.stringify({ type, categoryName, action }),
		})
	);
}

export { fetchCategories, fetchUpdateCategories };
