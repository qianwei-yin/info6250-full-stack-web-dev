const uuid = require('uuid').v4;
const { version: uuidVersion } = require('uuid');
const { validate: uuidValidate } = require('uuid');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const testData = require('../testData.json');
dayjs.extend(customParseFormat);

const initialCategories = {
	// clothes,restaurant,entertainment,gas,gift,travel,kids,shopping,sports,transportation
	expenses: [
		'clothes',
		'restaurant',
		'entertainment',
		'gas',
		'gift',
		'travel',
		'kids',
		'shopping',
		'sports',
		'transportation',
		'uncategorized',
	],
	income: ['transfer', 'salary', 'uncategorized'],
};

const userData = {
	conway: {
		categories: JSON.parse(JSON.stringify(initialCategories)), // deep copy
		accounts: {
			cash: ['cash'],
			'debit cards': ['boa-visa'],
			'credit cards': ['chase-visa', 'amex-visa'],
			others: ['uncategorized'],
		},
		defaultAccount: { accountType: 'cash', account: 'cash' },
		transactions: testData,
	},
};

function limitStringLength(str) {
	return str.trim().length <= 20;
}

function checkUsername(username) {
	if (username === '') return false;
	return username.trim().match(/^[A-Za-z0-9_]+$/);
}

function initiateUserData(username) {
	if (userData[username]) return;
	userData[username] = {
		categories: JSON.parse(JSON.stringify(initialCategories)), // deep copy
		accounts: {
			cash: ['cash'],
			'debit cards': [],
			'credit cards': [],
			others: ['uncategorized'],
		},
		defaultAccount: { accountType: 'cash', account: 'cash' },
		transactions: [],
	};
}

// --------------CATEGORIES--------------
function getCategories(username) {
	return userData[username].categories;
}

function checkCategoryName(categoryName) {
	if (categoryName === '') return false;
	return categoryName.trim().match(/^[A-Za-z0-9 -_]+$/);
}

function checkExistCategory({ username, type, category }) {
	const categoriesArray = userData[username].categories[type];
	return categoriesArray.includes(category);
}

function checkDuplicateOrNoSuchCategoryName({ username, type, action, categoryName }) {
	const categoriesArray = userData[username].categories[type];
	if (action === 'add') {
		return categoriesArray.includes(categoryName) ? 'duplicate-category-name' : null;
	}
	if (action === 'delete') {
		return categoriesArray.includes(categoryName) ? null : 'not-found-category-name';
	}
}

function updateCategories({ username, type, action, categoryName }) {
	const categoriesArray = userData[username].categories[type];
	if (action === 'add') {
		categoriesArray.push(categoryName);
	}
	if (action === 'delete') {
		const index = categoriesArray.indexOf(categoryName);
		categoriesArray.splice(index, 1);

		// Change deleted category's corresponding transaction to others
		userData[username].transactions.forEach((el) => {
			if (el.category === categoryName) {
				el.category = 'uncategorized';
			}
		});
	}
	return userData[username].categories;
}

// --------------TRANSACTIONS--------------
function uuidValidateV4(uuid) {
	return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}
function validateTime(time) {
	return dayjs(time, 'YYYY-MM-DD[T]HH:mm', true).isValid();
}

function addTransaction({ username, amount, category, time, type, description, accountType, account }) {
	const newTransaction = { id: uuid(), amount, category, time, type, description, accountType, account };

	userData[username].transactions.push(newTransaction);
	return newTransaction;
}

function getTransactions({ username, startDate, endDate, sortMethod, page }) {
	const filteredTransactions = userData[username].transactions.filter((trans) => {
		return trans.time >= `${startDate}T00:00` && trans.time <= `${endDate}T23:59`;
	});
	const transactionsCount = filteredTransactions.length;

	// pagination, page starts at 1
	const startIndex = 10 * (page - 1);
	const endIndex = startIndex + 10;
	let paginatedSortedFilteredTransactions = [];

	if (sortMethod === 'newer') {
		paginatedSortedFilteredTransactions = filteredTransactions
			.sort((a, b) => dayjs(b.time) - dayjs(a.time))
			.slice(startIndex, endIndex);
	} else if (sortMethod === 'older') {
		paginatedSortedFilteredTransactions = filteredTransactions
			.sort((a, b) => dayjs(a.time) - dayjs(b.time))
			.slice(startIndex, endIndex);
	} else if (sortMethod === 'larger') {
		paginatedSortedFilteredTransactions = filteredTransactions
			.sort((a, b) => b.amount - a.amount)
			.slice(startIndex, endIndex);
	} else if (sortMethod === 'smaller') {
		paginatedSortedFilteredTransactions = filteredTransactions
			.sort((a, b) => a.amount - b.amount)
			.slice(startIndex, endIndex);
	}

	return { paginatedSortedFilteredTransactions, transactionsCount };
}

function checkBillDate(date) {
	if (date === '') return false;
	if (date.length !== 10) return false;
	return date.match(/^[0-9-]+$/);
}

function getBill({ username, startTime, endTime }) {
	const bill = userData[username].transactions
		.filter((trans) => trans.time >= startTime && trans.time <= endTime)
		.reduce(
			(acc, trans) => {
				const { type, category, amount } = trans;
				if (!acc[type][category]) acc[type][category] = 0;
				acc[type][category] += amount;
				return acc;
			},
			{ expenses: {}, income: {} }
		);
	return bill;
}

function checkExistTransactionId({ username, id }) {
	const index = userData[username].transactions.findIndex((trans) => trans.id === id);
	return index > -1;
}

function updateTransaction({ username, id, amount, category, time, type, description, accountType, account }) {
	const updatedTransaction = { id, amount, category, time, type, description, accountType, account };

	userData[username].transactions.forEach((trans, index, array) => {
		if (trans.id === id) {
			array[index] = updatedTransaction;
		}
	});
	return updatedTransaction;
}

function deleteTransaction({ username, id }) {
	const toDeleteIndex = userData[username].transactions.findIndex((trans) => trans.id === id);
	userData[username].transactions.splice(toDeleteIndex, 1);
	return userData[username].transactions;
}

function getAccounts(username) {
	return userData[username].accounts;
}

function checkAccountName(account) {
	if (account === '') return false;
	return account.trim().match(/^[A-Za-z0-9_ -]+$/);
}

function checkAccountTypeAndName({ username, accountType, account }) {
	const { accounts } = userData[username];
	if (Object.keys(accounts).includes(accountType)) {
		const accountIndex = accounts[accountType].findIndex((el) => el === account);
		return accountIndex > -1 ? 'account-exists' : 'account-not-exists';
	} else {
		return 'invalid-account-type';
	}
}

function updateAccount({ username, accountType, account, action }) {
	const accountsArray = userData[username].accounts[accountType];
	if (action === 'add') {
		accountsArray.push(account);
	}
	if (action === 'delete') {
		const index = accountsArray.indexOf(account);
		accountsArray.splice(index, 1);

		// Change deleted account's corresponding transaction to uncategorized
		userData[username].transactions.forEach((el) => {
			if (el.accountType === accountType && el.account === account) {
				el.accountType = 'others';
				el.account = 'uncategorized';
			}
		});

		// If deleted account is default account, change default account to uncategorized
		if (
			userData[username].defaultAccount.accountType === accountType &&
			userData[username].defaultAccount.account === account
		) {
			userData[username].defaultAccount = { accountType: 'others', account: 'uncategorized' };
		}
	}

	return userData[username].accounts;
}

function getDefaultAccount(username) {
	return userData[username].defaultAccount;
}

function updateDefaultAccount({ username, accountType, account }) {
	userData[username].defaultAccount = { accountType, account };
	return userData[username].defaultAccount;
}

module.exports = {
	limitStringLength,
	checkUsername,
	checkCategoryName,
	initiateUserData,
	getCategories,
	checkDuplicateOrNoSuchCategoryName,
	updateCategories,
	addTransaction,
	getTransactions,
	checkBillDate,
	getBill,
	checkExistTransactionId,
	checkExistCategory,
	updateTransaction,
	deleteTransaction,
	getAccounts,
	checkAccountTypeAndName,
	updateAccount,
	getDefaultAccount,
	updateDefaultAccount,
	uuidValidateV4,
	validateTime,
	checkAccountName,
};
