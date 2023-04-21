const sessions = require('../server-data/sessions.js');
const userData = require('../server-data/userData.js');

function getAccounts(req, res) {
	const { username } = res.locals;
	const accounts = userData.getAccounts(username);
	res.json({ accounts });
}

function checkAccountParams(req, res, next) {
	const { username } = res.locals;
	const { accountType } = req.body;
	const account = req.body.account?.toLowerCase();

	if (!userData.limitStringLength(account)) {
		res.status(400).json({ error: 'too-long-account-name' });
		return;
	}
	if (!userData.checkAccountName(account)) {
		res.status(400).json({ error: 'invalid-account-name' });
		return;
	}
	const accountStatus = userData.checkAccountTypeAndName({ username, accountType, account });
	if (accountStatus === 'invalid-account-type') {
		res.status(400).json({ error: 'invalid-account-type' });
		return;
	}

	res.locals.accountStatus = accountStatus;
	next();
}

function updateAccount(req, res) {
	const { username, accountStatus } = res.locals;
	const { accountType, action } = req.body;
	const account = req.body.account?.toLowerCase();

	if (account === 'uncategorized') {
		res.status(400).json({ error: 'not-allowed-account' });
		return;
	}
	if (accountStatus === 'account-not-exists' && action === 'delete') {
		res.status(404).json({ error: 'not-found-account' });
		return;
	}
	if (accountStatus === 'account-exists' && action === 'add') {
		res.status(400).json({ error: 'duplicate-account' });
		return;
	}

	const newAccounts = userData.updateAccount({ username, accountType, account, action });
	res.json({ accounts: newAccounts });
}

function getDefaultAccount(req, res) {
	const { username } = res.locals;
	const defaultAccount = userData.getDefaultAccount(username);
	res.json({ defaultAccount });
}

function updateDefaultAccount(req, res) {
	const { username, accountStatus } = res.locals;
	const { accountType, account } = req.body;

	if (accountStatus === 'account-not-exists') {
		res.status(404).json({ error: 'not-found-account' });
		return;
	}

	const newDefaultAccount = userData.updateDefaultAccount({ username, accountType, account });
	res.json({ defaultAccount: newDefaultAccount });
}

module.exports = { getAccounts, checkAccountParams, updateAccount, getDefaultAccount, updateDefaultAccount };
