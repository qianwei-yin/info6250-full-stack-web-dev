const uuid = require('uuid').v4;
const dayjs = require('dayjs');

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
	],
	income: ['transfer', 'salary'],
};

const userData = {
	abc: {
		categories: JSON.parse(JSON.stringify(initialCategories)), // deep copy
		accounts: {
			cash: [{ id: uuid(), name: 'cash' }],
			'debit cards': [{ id: uuid(), name: 'boa-visa' }],
			'credit cards': [
				{ id: uuid(), name: 'chase-visa' },
				{ id: uuid(), name: 'amex-visa' },
			],
			others: [],
		},
		transactions: [
			{
				id: '1c5ddf48-b616-4ce2-b12c-ff74ff08e055',
				amount: 1932.27,
				category: 'transfer',
				time: '2023-02-04T08:30',
				type: 'income',
				description: 'Fracture of coronoid process of right mandible, 7thB',
				accountType: 'credit cards',
				account: 'chase-visa',
			},
			{
				id: '76e592cf-ca04-4c25-b5cf-376f5921c121',
				amount: 912.02,
				category: 'transfer',
				time: '2023-03-26T08:30',
				type: 'income',
				description: 'Other specified injuries of unspecified elbow, subs encntr',
				accountType: 'credit cards',
				account: 'chase-visa',
			},
			{
				id: 'f29dbedc-44f3-4ee0-a0c4-36acf1707522',
				amount: 1607.94,
				category: 'salary',
				time: '2023-03-10T08:30',
				type: 'income',
				description: 'Tinea barbae and tinea capitis',
				accountType: 'credit cards',
				account: 'amex-visa',
			},
			{
				id: '9434123a-4522-481e-a769-4c47dbcaaa80',
				amount: 115.15,
				category: 'transfer',
				time: '2022-12-24T08:30',
				type: 'income',
				description: 'Postimmunization arthropathy, elbow',
				accountType: 'credit cards',
				account: 'amex-visa',
			},
			{
				id: 'c0d9a899-a4f0-4c7d-b9d7-2b0549f1f9c6',
				amount: 1820.0,
				category: 'salary',
				time: '2022-11-11T08:30',
				type: 'income',
				description: 'Retinopathy of prematurity, stage 1, right eye',
				accountType: 'credit cards',
				account: 'chase-visa',
			},
			{
				id: '1037ebd9-2f75-4cea-af01-1d8f82a57f1c',
				amount: 1698.88,
				category: 'transfer',
				time: '2022-11-19T08:30',
				type: 'income',
				description: 'Other specified injury of unspecified middle and inner ear',
				accountType: 'credit cards',
				account: 'amex-visa',
			},
			{
				id: '1252999e-a14d-42b8-ab47-de01813d60a3',
				amount: 595.73,
				category: 'salary',
				time: '2022-11-14T08:30',
				type: 'income',
				description: 'Personal history of malignant neoplasm of urinary tract',
				accountType: 'credit cards',
				account: 'amex-visa',
			},
			{
				id: 'b359d60e-a4c7-4f1e-9bf0-e664bfb85840',
				amount: 67.27,
				category: 'salary',
				time: '2023-03-05T08:30',
				type: 'income',
				description: 'Underdosing of analeptics and opioid receptor antag, init',
				accountType: 'credit cards',
				account: 'amex-visa',
			},
			{
				id: '763251f7-2b9d-4af3-83a9-bff5f0ce22f4',
				amount: 1510.13,
				category: 'salary',
				time: '2023-01-18T08:30',
				type: 'income',
				description: 'Burns of 50-59% of body surface w 40-49% third degree burns',
				accountType: 'credit cards',
				account: 'amex-visa',
			},
			{
				id: 'e2c1fe48-8fec-4676-8299-7661a23a1296',
				amount: 1705.15,
				category: 'transfer',
				time: '2023-02-02T08:30',
				type: 'income',
				description: 'Disp fx of anterior column of right acetabulum, init',
				accountType: 'credit cards',
				account: 'amex-visa',
			},
			{
				id: '53742a5a-de08-49d1-9dfb-0cf8fd25f697',
				amount: 1115.32,
				category: 'salary',
				time: '2023-01-21T08:30',
				type: 'income',
				description: 'Atrioventricular septal defect',
				accountType: 'credit cards',
				account: 'amex-visa',
			},
			{
				id: 'f953788e-325e-46ad-961c-793dc6da6961',
				amount: 1601.52,
				category: 'transfer',
				time: '2022-11-16T08:30',
				type: 'income',
				description: 'Insect bite (nonvenomous) of left upper arm',
				accountType: 'credit cards',
				account: 'amex-visa',
			},
			{
				id: '86b7e9e8-059a-434e-8dee-971d2b4a32f3',
				amount: 1301.95,
				category: 'transfer',
				time: '2023-03-21T08:30',
				type: 'income',
				description: 'Retained (old) foreign body in iris or ciliary body',
				accountType: 'credit cards',
				account: 'chase-visa',
			},
			{
				id: '115369f0-2415-4873-b37d-91f97db9029c',
				amount: 959.61,
				category: 'salary',
				time: '2023-03-02T08:30',
				type: 'income',
				description: 'Nondisp fx of olecran pro w/o intartic extn unsp ulna, 7thR',
				accountType: 'credit cards',
				account: 'amex-visa',
			},
			{
				id: '9db2dde8-e351-4a7c-9a7b-ef980b547fde',
				amount: 214.58,
				category: 'transfer',
				time: '2022-12-19T08:30',
				type: 'income',
				description: 'Displ seg fx shaft of unsp tibia, 7thP',
				accountType: 'credit cards',
				account: 'chase-visa',
			},
			{
				id: '56b46826-d952-4a72-a087-7e0b3820bdb0',
				amount: 437.47,
				category: 'shopping',
				time: '2023-03-09T09:25',
				type: 'expenses',
				description: 'Oth traum nondisp spondylolysis of second cervcal vert, sqla',
				accountType: 'credit cards',
				account: 'amex-visa',
			},
			{
				id: '5e5d7109-f45d-426c-9569-4dcf179c75a9',
				amount: 503.8,
				category: 'gift',
				time: '2023-04-03T09:25',
				type: 'expenses',
				description: 'Obstructed labor due to face presentation, fetus 1',
				accountType: 'credit cards',
				account: 'chase-visa',
			},
			{
				id: '19eeea6b-bfc7-4e0f-917c-a35d4d674df4',
				amount: 1852.43,
				category: 'shopping',
				time: '2022-11-18T09:25',
				type: 'expenses',
				description: 'Nondisp fx of med condyle of r humer, subs for fx w nonunion',
				accountType: 'credit cards',
				account: 'amex-visa',
			},
			{
				id: 'dbcc25b2-d2e7-44df-a1c6-fe6755b30a76',
				amount: 398.84,
				category: 'gas',
				time: '2022-12-17T09:25',
				type: 'expenses',
				description: 'Abnormal finding of blood chemistry, unspecified',
				accountType: 'credit cards',
				account: 'chase-visa',
			},
			{
				id: '815442a5-2fa0-49ad-81e9-25ca56f6b9c1',
				amount: 1784.9,
				category: 'travel',
				time: '2023-01-26T09:25',
				type: 'expenses',
				description: 'Posterior disp fx of sternal end of right clavicle',
				accountType: 'credit cards',
				account: 'chase-visa',
			},
			{
				id: 'f358ecd7-05ce-477f-be7c-95d0b7c5be26',
				amount: 1989.57,
				category: 'shopping',
				time: '2022-11-26T09:25',
				type: 'expenses',
				description: 'Obstructed labor due to face presentation, fetus 1',
				accountType: 'credit cards',
				account: 'chase-visa',
			},
			{
				id: '65a2b406-8273-488c-8371-3e2634aba5d2',
				amount: 1319.41,
				category: 'restaurant',
				time: '2022-12-04T09:25',
				type: 'expenses',
				description: 'Other fracture of right foot, 7thG',
				accountType: 'credit cards',
				account: 'amex-visa',
			},
			{
				id: '02c7e3bf-0db2-49f1-9404-ba2a30468c20',
				amount: 164.1,
				category: 'kids',
				time: '2023-02-10T09:25',
				type: 'expenses',
				description: 'Pressure ulcer of back',
				accountType: 'credit cards',
				account: 'amex-visa',
			},
			{
				id: 'cbb9a534-e4da-441b-812c-3543c96af4d5',
				amount: 1317.73,
				category: 'sports',
				time: '2023-03-30T09:25',
				type: 'expenses',
				description: 'Injury of trochlear nerve, left side, initial encounter',
				accountType: 'credit cards',
				account: 'chase-visa',
			},
			{
				id: '182848d7-a674-4c46-ac7e-06606318001a',
				amount: 1207.09,
				category: 'shopping',
				time: '2023-02-22T09:25',
				type: 'expenses',
				description: 'Burn of first degree of right hand, unsp site, init encntr',
				accountType: 'credit cards',
				account: 'chase-visa',
			},
			{
				id: '194b1631-e3b5-4e54-ba9c-a3ae646d7d8b',
				amount: 1961.02,
				category: 'transportation',
				time: '2023-01-03T09:25',
				type: 'expenses',
				description: 'Unspecified traumatic cataract, right eye',
				accountType: 'debit cards',
				account: 'boa-visa',
			},
			{
				id: '381c15ff-559a-4913-a3f7-7445a23342f0',
				amount: 1157.77,
				category: 'transportation',
				time: '2023-03-28T09:25',
				type: 'expenses',
				description: 'Other injury of muscle, fascia and tendon of lower back',
				accountType: 'debit cards',
				account: 'boa-visa',
			},
			{
				id: '8c967561-386a-43e5-a5c4-6df737ff9ba9',
				amount: 1710.22,
				category: 'entertainment',
				time: '2022-12-21T09:25',
				type: 'expenses',
				description: 'Inj flexor musc/fasc/tend right thumb at forarm lv, sequela',
				accountType: 'debit cards',
				account: 'boa-visa',
			},
			{
				id: 'fad266fa-f5bb-499f-b471-ff5ad2d26e3d',
				amount: 996.11,
				category: 'gas',
				time: '2023-01-31T09:25',
				type: 'expenses',
				description: 'Unspecified superficial injury of foot',
				accountType: 'debit cards',
				account: 'boa-visa',
			},
			{
				id: '0d055405-a590-4a65-8b0b-4b6d697509ce',
				amount: 768.77,
				category: 'clothes',
				time: '2023-03-31T09:25',
				type: 'expenses',
				description: 'Hang-glider fire injuring occupant, subsequent encounter',
				accountType: 'debit cards',
				account: 'boa-visa',
			},
			{
				id: '01cf7325-229b-43d2-b952-3d2090d12caf',
				amount: 741.09,
				category: 'gas',
				time: '2022-11-26T09:25',
				type: 'expenses',
				description: 'Subluxation of unsp parts of unsp shoulder girdle, sequela',
				accountType: 'debit cards',
				account: 'boa-visa',
			},
			{
				id: '3f681492-8d72-468e-9693-d19527a136a7',
				amount: 1416.25,
				category: 'gift',
				time: '2023-03-15T09:25',
				type: 'expenses',
				description: 'Contact with hotplate',
				accountType: 'debit cards',
				account: 'boa-visa',
			},
			{
				id: 'e09fc3c1-09bb-4537-8579-32c90bc009cd',
				amount: 889.35,
				category: 'kids',
				time: '2023-02-21T09:25',
				type: 'expenses',
				description: 'Unspecified secondary cataract',
				accountType: 'debit cards',
				account: 'boa-visa',
			},
			{
				id: 'de47f996-d697-45d0-9792-e1d74e4dfe25',
				amount: 1785.8,
				category: 'entertainment',
				time: '2023-01-08T09:25',
				type: 'expenses',
				description: 'Puncture wound w foreign body of right upper arm, subs',
				accountType: 'debit cards',
				account: 'boa-visa',
			},
			{
				id: '00ab95e7-d8ad-41a6-9833-2a85bdaeb299',
				amount: 849.39,
				category: 'shopping',
				time: '2023-01-28T09:25',
				type: 'expenses',
				description: 'Other pemphigus',
				accountType: 'debit cards',
				account: 'boa-visa',
			},
			{
				id: '1c72eeb9-7fb6-43cd-9c8b-166d7c1c3ec8',
				amount: 191.54,
				category: 'restaurant',
				time: '2022-11-29T09:25',
				type: 'expenses',
				description: 'Dietary counseling and surveillance',
				accountType: 'cash',
				account: 'cash',
			},
			{
				id: '6647ba97-4c32-4df2-a3c2-36c778b65890',
				amount: 1319.45,
				category: 'kids',
				time: '2022-12-08T09:25',
				type: 'expenses',
				description: 'Contact with scissors',
				accountType: 'cash',
				account: 'cash',
			},
			{
				id: '8d3402fe-36a8-4edd-b563-69a31588ba82',
				amount: 715.22,
				category: 'shopping',
				time: '2022-11-05T09:25',
				type: 'expenses',
				description: 'Chronic leukemia of unspecified cell type',
				accountType: 'cash',
				account: 'cash',
			},
			{
				id: '6a0bc356-4f61-4196-a9ca-4df59221062d',
				amount: 1298.9,
				category: 'gas',
				time: '2022-12-19T09:25',
				type: 'expenses',
				description: 'Strain of adductor musc/fasc/tend unsp thigh, sequela',
				accountType: 'cash',
				account: 'cash',
			},
			{
				id: '4362c4af-9a33-4960-be19-e3876d071e49',
				amount: 737.95,
				category: 'sports',
				time: '2022-12-20T09:25',
				type: 'expenses',
				description: 'Toxic effect of venom of gila monster, assault, init encntr',
				accountType: 'cash',
				account: 'cash',
			},
			{
				id: 'd93033e8-984f-4199-b185-c50b7e342329',
				amount: 1128.89,
				category: 'sports',
				time: '2023-02-08T09:25',
				type: 'expenses',
				description: 'Grey baby syndrome',
				accountType: 'cash',
				account: 'cash',
			},
			{
				id: '76d9e2ca-c547-4b58-bd55-6bc42d7bb735',
				amount: 1031.59,
				category: 'kids',
				time: '2023-01-16T09:25',
				type: 'expenses',
				description: 'Inj flexor musc/fasc/tend r mid finger at forarm lv, sequela',
				accountType: 'cash',
				account: 'cash',
			},
			{
				id: 'a6b07db6-1da7-4a36-8954-7f1969b8822f',
				amount: 1469.35,
				category: 'travel',
				time: '2022-12-28T09:25',
				type: 'expenses',
				description: 'Other postprocedural shock, initial encounter',
				accountType: 'cash',
				account: 'cash',
			},
			{
				id: 'a880697f-cde5-43ee-a5b4-2a0fcae712b5',
				amount: 1473.98,
				category: 'kids',
				time: '2023-03-16T09:25',
				type: 'expenses',
				description: 'Nondisp fx of prox phalanx of l lit fngr, 7thK',
				accountType: 'cash',
				account: 'cash',
			},
			{
				id: '3b70538f-3acf-4439-8598-a0e997bc1a54',
				amount: 729.92,
				category: 'travel',
				time: '2022-11-25T09:25',
				type: 'expenses',
				description: 'Sprain of ligaments of cervical spine, sequela',
				accountType: 'cash',
				account: 'cash',
			},
		],
	},
};

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

function getTransactions({ username, startDate, endDate, sortMethod }) {
	const filteredTransactions = userData[username].transactions.filter((trans) => {
		return trans.time >= `${startDate}T00:00` && trans.time <= `${endDate}T23:59`;
	});

	if (sortMethod === 'newer') {
		return filteredTransactions.sort((a, b) => dayjs(b.time) - dayjs(a.time));
	} else if (sortMethod === 'older') {
		return filteredTransactions.sort((a, b) => dayjs(a.time) - dayjs(b.time));
	} else if (sortMethod === 'larger') {
		return filteredTransactions.sort((a, b) => b.amount - a.amount);
	} else if (sortMethod === 'smaller') {
		return filteredTransactions.sort((a, b) => a.amount - b.amount);
	}
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
	checkBillDate,
	getBill,
	checkExistTransactionId,
	updateTransaction,
	deleteTransaction,
	getAccounts,
	checkAccountTypeAndName,
	addAccount,
	updateAccount,
	deleteAccount,
};
