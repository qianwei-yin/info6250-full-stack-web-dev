const express = require('express');
const cookieParser = require('cookie-parser');

const { checkSession, getSession, createSession, deleteSession } = require('./controllers/sessions-controller.js');
const { getCategories, updateCategories } = require('./controllers/categories-controller.js');
const {
	checkTransactionParams,
	createTransaction,
	getTransactions,
	getBill,
	updateTransaction,
	deleteTransaction,
} = require('./controllers/transactions-controller.js');
const {
	checkAccountParams,
	getAccounts,
	updateAccount,
	getDefaultAccount,
	updateDefaultAccount,
} = require('./controllers/accounts-controller.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

app.route('/api/v1/sessions').get(checkSession, getSession).post(createSession).delete(deleteSession);

app.route('/api/v1/categories').get(checkSession, getCategories).patch(checkSession, updateCategories);

app.route('/api/v1/transactions/bill').get(checkSession, getBill);
app.route('/api/v1/transactions')
	.get(checkSession, getTransactions)
	.post(checkSession, checkTransactionParams, createTransaction);
app.route('/api/v1/transactions/:transactionId')
	.patch(checkSession, checkTransactionParams, updateTransaction)
	.delete(checkSession, deleteTransaction);

app.route('/api/v1/accounts').get(checkSession, getAccounts).patch(checkSession, checkAccountParams, updateAccount);
app.route('/api/v1/accounts/default').get(checkSession, getDefaultAccount).patch(checkSession, updateDefaultAccount);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
