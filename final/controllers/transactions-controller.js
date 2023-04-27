const userData = require('../server-data/userData.js');

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

function getTargetedTransactionPage(req, res) {
	const { username } = res.locals;
	const { sortMethod, startDate, endDate } = req.query;
	const { transactionId: id } = req.params;

	// id exists and id isn't valid
	if (id && !userData.uuidValidateV4(id)) {
		res.status(400).json({ error: 'invalid-transaction-id' });
		return;
	}
	if (id && !userData.checkExistTransactionId({ username, id })) {
		res.status(404).json({ error: 'not-found-transaction' });
		return;
	}

	const targetedPage = userData.getTargetedTransactionPage({
		username,
		sortMethod,
		id,
		startDate,
		endDate,
	});

	res.json({ page: targetedPage });
}

function checkTransactionParams(req, res, next) {
	const { username } = res.locals;
	const { amount, category, time, type, accountType, account } = req.body;
	const { transactionId: id } = req.params;

	// id exists and id isn't valid
	if (id && !userData.uuidValidateV4(id)) {
		res.status(400).json({ error: 'invalid-transaction-id' });
		return;
	}
	if (id && !userData.checkExistTransactionId({ username, id })) {
		res.status(404).json({ error: 'not-found-transaction' });
		return;
	}
	if (Number(amount) <= 0) {
		res.status(400).json({ error: 'invalid-transaction-amount' });
		return;
	}
	if (Number(amount) > 100000000) {
		res.status(400).json({ error: 'too-long-transaction-amount' });
		return;
	}
	if (type !== 'income' && type !== 'expenses') {
		res.status(400).json({ error: 'invalid-transaction-type' });
		return;
	}
	if (!userData.checkExistCategory({ username, type, category })) {
		res.status(400).json({ error: 'invalid-transaction-category' });
		return;
	}
	if (!userData.validateTime(time)) {
		res.status(400).json({ error: 'invalid-transaction-time' });
		return;
	}
	// checkAccount includes 2 errors: 'account-not-exists', 'invalid-account-type'
	const checkAccount = userData.checkAccountTypeAndName({ username, accountType, account });
	if (checkAccount !== 'account-exists') {
		const errorType =
			checkAccount === 'account-not-exists' ? 'invalid-transaction-account' : 'invalid-transaction-account-type';
		res.status(400).json({ error: errorType });
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

function updateTransaction(req, res) {
	const { username } = res.locals;
	const { transactionId: id } = req.params;
	const { amount, category, time, type, description, accountType, account } = req.body;

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
	res.json({ transaction: updatedTransaction });
}

function deleteTransaction(req, res) {
	const { username } = res.locals;
	const { transactionId: id } = req.params;

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
	getTargetedTransactionPage,
};
