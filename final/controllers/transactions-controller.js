const sessions = require('../server-data/sessions.js');
const userData = require('../server-data/userData.js');

function checkTransactionParams(req, res, next) {
	const { username } = res.locals;
	const { amount, category, time, type, description, accountType, account } = req.body;

	if (!amount || amount <= 0) {
		res.status(400).json({ error: 'required-amount' });
		return;
	}
	if (type !== 'income' && type !== 'expenses') {
		res.status(400).json({ error: 'invalid-category-type' });
		return;
	}
	if (!userData.checkExistCategory({ username, type, category })) {
		res.status(404).json({ error: 'not-found-category-name' });
		return;
	}
	if (userData.checkAccountTypeAndName({ username, accountType, account }) !== 'account-exists') {
		res.status(404).json({ error: 'not-found-account' });
		return;
	}

	next();
}

function createTransaction(req, res) {
	const { username } = res.locals;
	const { amount, category, time, type, description, accountType, account } = req.body;
	const newTransactions = userData.addTransaction({
		username,
		amount,
		category,
		time,
		type,
		description,
		accountType,
		account,
	});

	res.status(201).json({ transactions: newTransactions });
}

function getTransactions(req, res) {
	const { username } = res.locals;
	const transactions = userData.getTransactions(username);
	res.json({ transactions });
}

function updateTransaction(req, res) {
	const { username } = res.locals;
	const { id, amount, category, time, type, description, accountType, account } = req.body;

	if (!userData.checkExistTransactionId({ username, id })) {
		res.status(404).json({ error: 'not-found-transaction' });
		return;
	}

	const newTransactions = userData.updateTransaction({
		username,
		id,
		amount,
		category,
		time,
		type,
		description,
		accountType,
		account,
	});
	res.json({ transactions: newTransactions });
}

function deleteTransaction(req, res) {
	const { username } = res.locals;
	const { id } = req.body;

	if (!userData.checkExistTransactionId({ username, id })) {
		res.status(404).json({ error: 'not-found-transaction' });
		return;
	}

	const newTransactions = userData.deleteTransaction({ username, id });
	res.json({ transactions: newTransactions });
}

module.exports = {
	checkTransactionParams,
	createTransaction,
	getTransactions,
	updateTransaction,
	deleteTransaction,
};
