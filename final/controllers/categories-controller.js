const userData = require('../server-data/userData.js');

function getCategories(req, res) {
	const { username } = res.locals;
	const categories = userData.getCategories(username);
	res.json({ categories });
}

function updateCategories(req, res) {
	const { username } = res.locals;
	const { type, action } = req.body;
	const categoryName = req.body.categoryName?.toLowerCase();

	if (!userData.limitStringLength(categoryName)) {
		res.status(400).json({ error: 'too-long-category-name' });
		return;
	}
	if (categoryName === 'uncategorized') {
		res.status(400).json({ error: 'not-allowed-category-name' });
		return;
	}
	if (type !== 'income' && type !== 'expenses') {
		res.status(400).json({ error: 'invalid-category-type' });
		return;
	}
	if (action !== 'add' && action !== 'delete') {
		res.status(400).json({ error: 'invalid-category-action' });
		return;
	}
	if (!userData.checkCategoryName(categoryName)) {
		// accepts letters, numbers, spaces and underline
		res.status(400).json({ error: 'invalid-category-name' });
		return;
	}

	const duplicateOrNoSuch = userData.checkDuplicateOrNoSuchCategoryName({ username, type, action, categoryName });
	if (duplicateOrNoSuch === 'duplicate-category-name') {
		res.status(400).json({ error: duplicateOrNoSuch });
		return;
	}
	if (duplicateOrNoSuch === 'not-found-category-name') {
		res.status(404).json({ error: duplicateOrNoSuch });
		return;
	}

	const newCategories = userData.updateCategories({ username, type, action, categoryName });
	res.json({ categories: newCategories });
}

module.exports = { getCategories, updateCategories };
