const uuid = require('uuid').v4;

const initialCategories = {
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
	],
	income: ['transfer', 'salary'],
};

const singleTransactionModel = [
	{
		id: uuid(),
		amount: 100,
		category: 'clothes',
		time: new Date(),
		type: 'expenses',
		description:
			' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos facere rerum alias! Magnam pariatur magni ipsum? Quasi aliquam veritatis id!',
		accountType: 'cash',
		account: 'cash',
	},
];

const userData = {};

function checkUsername(username) {
	if (username === '') return false;
	return username.trim().match(/^[A-Za-z0-9_]+$/);
}

function initiateUserData(username) {
	if (userData[username]) return;
	userData[username] = {
		categories: JSON.parse(JSON.stringify(initialCategories)), // deep copy
		accounts: {
			cash: [{ id: uuid(), name: 'cash' }],
			'debit cards': [],
			'credit cards': [],
			others: [],
		},
		transactions: [],
	};
}

function checkCategoryName(categoryName) {
	if (categoryName === '') return false;
	return categoryName.trim().match(/^[A-Za-z0-9 _]+$/);
}

function getCategories(username) {
	return userData[username].categories;
}

function checkDuplicateOrNoSuchCategoryName({ username, type, action, categoryName }) {
	const categoriesArray = userData[username].categories[type];
	if (action === 'add') {
		return categoriesArray.includes(categoryName.toLowerCase()) ? 'duplicate-category-name' : null;
	}
	if (action === 'delete') {
		return categoriesArray.includes(categoryName.toLowerCase()) ? null : 'not-found-category-name';
	}
}

function updateCategories({ username, type, action, categoryName }) {
	const categoriesArray = userData[username].categories[type];
	if (action === 'add') {
		categoriesArray.push(categoryName);
	}
	if (action === 'delete') {
		const index = categoriesArray.indexOf(categoryName);
		categoriesArray.aplice(index, 1);
	}
	return userData[username].categories;
}

function checkExistCategory({ username, type, category }) {
	return userData[username].categories[type].includes(category);
}

function addTransaction({ username, amount, category, time, type, description, accountType, account }) {
	userData[username].transactions.push({
		id: uuid(),
		amount,
		category,
		time,
		type,
		description,
		accountType,
		account,
	});
	return userData[username].transactions;
}

function getTransactions(username) {
	return userData[username].transactions;
}

function checkExistTransactionId({ username, id }) {
	const index = userData[username].transactions.findIndex((trans) => trans.id === id);
	return index > -1;
}

function updateTransaction({ username, id, amount, category, time, type, description, accountType, account }) {
	userData[username].transactions.forEach((trans, index, array) => {
		if (trans.id === id) {
			array[index] = { id, amount, category, time, type, description, accountType, account };
		}
	});
	return userData[username].transactions;
}

function deleteTransaction({ username, id }) {
	const toDeleteIndex = userData[username].transactions.findIndex((trans) => trans.id === id);
	userData[username].transactions.splice(toDeleteIndex, 1);
	return userData[username].transactions;
}

function getAccounts(username) {
	return userData[username].accounts;
}

function checkAccountTypeAndName({ username, accountType, account }) {
	const { accounts } = userData[username];
	if (Object.keys(accounts).includes(accountType)) {
		const accountIndex = Object.values(accounts[accountType]).findIndex((acc) => acc.name === account);
		return accountIndex > -1 ? 'account-exists' : 'account-not-exists';
	} else {
		return 'invalid-account-type';
	}
}

function addAccount({ username, accountType, account }) {
	userData[username].accounts[accountType].push({ id: uuid(), name: account });
	return userData[username].accounts;
}

function updateAccount({ username, id, accountType, account }) {
	const accountsArray = userData[username].accounts[accountType];
	accountsArray.forEach((acc, index, array) => {
		if (acc.id === id) {
			array[index].name = account;
		}
	});
	return userData[username].accounts;
}

function deleteAccount({ username, id, accountType }) {
	const accountsArray = userData[username].accounts[accountType];
	const toDeleteIndex = accountsArray.findIndex((acc) => acc.id === id);
	accountsArray.splice(toDeleteIndex, 1);
	return userData[username].accounts;
}

module.exports = {
	checkUsername,
	checkCategoryName,
	initiateUserData,
	getCategories,
	checkDuplicateOrNoSuchCategoryName,
	updateCategories,
	checkExistCategory,
	addTransaction,
	getTransactions,
	checkExistTransactionId,
	updateTransaction,
	deleteTransaction,
	getAccounts,
	checkAccountTypeAndName,
	addAccount,
	updateAccount,
	deleteAccount,
};
