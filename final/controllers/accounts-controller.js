const sessions = require('../server-data/sessions.js');
const userData = require('../server-data/userData.js');

function getAccounts(req, res) {
	const { username } = res.locals;
	const accounts = userData.getAccounts(username);
	res.json({ accounts });
}

function checkAccountParams(req, res, next) {
	const { username } = res.locals;
	const { accountType, account } = req.body;

	const accountStatus = userData.checkAccountTypeAndName({ username, accountType, account });
	if (accountStatus === 'invalid-account-type') {
		res.status(400).json({ error: 'invalid-account-type' });
		return;
	}

	res.locals.accountStatus = accountStatus;
	next();
}

function createAccount(req, res) {
	const { username, accountStatus } = res.locals;
	const { accountType, account } = req.body;

	if (accountStatus === 'account-exists') {
		res.status(404).json({ error: 'already-exist-account' });
		return;
	}

	const newAccounts = userData.addAccount({ username, accountType, account });
	res.status(201).json({ accounts: newAccounts });
}

function updateAccount(req, res) {
	const { username, accountStatus } = res.locals;
	const { accountId: id } = req.params;
	const { accountType, account } = req.body;

	if (accountStatus === 'account-not-exists') {
		res.status(404).json({ error: 'not-found-account' });
		return;
	}

	const newAccounts = userData.updateAccount({ username, id, accountType, account });
	res.json({ accounts: newAccounts });
}

function deleteAccount(req, res) {
	const { username } = res.locals;
	const { accountId: id } = req.params;
	const { accountType } = req.body;

	const newAccounts = userData.deleteAccount({ username, id, accountType });
	res.json({ accounts: newAccounts });
}

module.exports = { getAccounts, checkAccountParams, createAccount, deleteAccount, updateAccount };
