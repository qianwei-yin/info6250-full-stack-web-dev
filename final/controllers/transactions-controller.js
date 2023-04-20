const sessions = require('../server-data/sessions.js');
const userData = require('../server-data/userData.js');

function checkTransactionParams(req, res, next) {
	const { username } = res.locals;
	const { amount, category, time, type, description, accountType, account } = req.body;

	if (!amount || Number(amount) <= 0) {
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
	const newTransaction = userData.addTransaction({
		username,
		amount: Number(amount),
		category,
		time,
		type,
		description,
		accountType,
		account,
	});

	// returns the new created transaction
	res.status(201).json({ transaction: newTransaction });
}

function getTransactions(req, res) {
	const { username } = res.locals;
	const { startDate, endDate, sortMethod, page } = req.query;

	const { paginatedSortedFilteredTransactions, transactionsCount } = userData.getTransactions({
		username,
		startDate,
		endDate,
		sortMethod,
		page,
	});

	res.json({ transactions: paginatedSortedFilteredTransactions, totals: transactionsCount });
}

function getBill(req, res) {
	const { username } = res.locals;
	const { startDate, endDate } = req.query;

	if (!userData.checkBillDate(startDate) || !userData.checkBillDate(endDate)) {
		res.status(400).json({ error: 'invalid-bill-date' });
		return;
	}

	const bill = userData.getBill({ username, startTime: startDate + 'T00:00', endTime: endDate + 'T23:59' });
	res.json({ bill });
}

function updateTransaction(req, res) {
	const { username } = res.locals;
	const { transactionId: id } = req.params;
	const { amount, category, time, type, description, accountType, account } = req.body;

	if (!userData.checkExistTransactionId({ username, id })) {
		res.status(404).json({ error: 'not-found-transaction' });
		return;
	}

	const updatedTransaction = userData.updateTransaction({
		username,
		id,
		amount: Number(amount),
		category,
		time,
		type,
		description,
		accountType,
		account,
	});
	// returns the new updated transaction
	res.json({ transactions: updatedTransaction });
}

function deleteTransaction(req, res) {
	const { username } = res.locals;
	const { transactionId: id } = req.params;

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
	getBill,
	updateTransaction,
	deleteTransaction,
};
