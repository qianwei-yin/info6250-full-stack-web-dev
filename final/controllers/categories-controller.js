const sessions = require('../server-data/sessions.js');
const userData = require('../server-data/userData.js');

function getCategories(req, res) {
	const { username } = res.locals;
	const categories = userData.getCategories(username);
	res.json({ categories });
}

function updateCategories(req, res) {
	const { username } = res.locals;
	const { type, categoryName, action } = req.body;

	if (type !== 'income' && type !== 'expenses') {
		res.status(400).json({ error: 'invalid-category-type' });
		return;
	}
	if (action !== 'add' && action !== 'delete') {
		res.status(400).json({ error: 'invalid-category-action' });
		return;
	}
	if (!userData.checkCategoryName(categoryName)) {
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
