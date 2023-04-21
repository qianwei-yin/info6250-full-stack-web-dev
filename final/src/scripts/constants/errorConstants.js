const ERRORS = {
	NETWORK_ERROR: 'network-error',

	AUTH_MISSING: 'auth-missing',
	INVALID_USERNAME: 'invalid-username',
	AUTH_INSUFFICIENT: 'auth-insufficient',

	INVALID_ACCOUNT_TYPE: 'invalid-account-type',
	NOT_ALLOWED_ACCOUNT: 'not-allowed-account',
	DUPLICATE_ACCOUNT: 'duplicate-account',
	NOT_FOUND_ACCOUNT: 'not-found-account',
	INVALID_ACCOUNT_NAME: 'invalid-account-name',

	NOT_ALLOWED_CATEGORY_NAME: 'not-allowed-category-name',
	INVALID_CATEGORY_TYPE: 'invalid-category-type',
	INVALID_CATEGORY_ACTION: 'invalid-category-action',
	INVALID_CATEGORY_NAME: 'invalid-category-name',
	DUPLICATE_CATEGORY_NAME: 'duplicate-category-name',
	NOT_FOUND_CATEGORY_NAME: 'not-found-category-name',

	INVALID_BILL_DATE: 'invalid-bill-date',
	INVALID_TRANSACTION_ID: 'invalid-transaction-id',
	NOT_FOUND_TRANSACTION: 'not-found-transaction',
	INVALID_TRANSACTION_AMOUNT: 'invalid-transaction-amount',
	INVALID_TRANSACTION_TYPE: 'invalid-transaction-type',
	INVALID_TRANSACTION_CATEGORY: 'invalid-transaction-category',
	INVALID_TRANSACTION_TIME: 'invalid-transaction-time',
	INVALID_TRANSACTION_ACCOUNT_TYPE: 'invalid-transaction-account-type',
	INVALID_TRANSACTION_ACCOUNT: 'invalid-transaction-account',

	TOO_LONG_ACCOUNT_NAME: 'too-long-account-name',
	TOO_LONG_CATEGORY_NAME: 'too-long-category-name',
	TOO_LONG_USERNAME: 'too-long-username',
	TOO_LONG_TRANSACTION_AMOUNT: 'too-long-transaction-amount',
};

const ERROR_MESSAGES = {
	default: 'Something went wrong, please try again later.',

	[ERRORS.AUTH_MISSING]: 'Your session is invalid, missing or has expired, please log in again.',
	[ERRORS.INVALID_USERNAME]: 'Username can only contain letters, numbers and underline(_).',
	[ERRORS.AUTH_INSUFFICIENT]: 'Sorry, DOGs are forbidden!',

	[ERRORS.NOT_ALLOWED_CATEGORY_NAME]: 'Actions on "uncategorized" are forbidden.',
	[ERRORS.INVALID_CATEGORY_TYPE]: 'Your category type should only be chosen from "income" and "expenses".',
	[ERRORS.INVALID_CATEGORY_ACTION]: 'Your actions on category can only be "add" or "delete".',
	[ERRORS.INVALID_CATEGORY_NAME]:
		'Your category name can only contain letters, numbers, spaces, dash(-) and underline(_).',
	[ERRORS.DUPLICATE_CATEGORY_NAME]: 'This category already exists.',
	[ERRORS.NOT_FOUND_CATEGORY_NAME]: 'This category does not exist.',

	[ERRORS.INVALID_ACCOUNT_TYPE]:
		'Your account type should only be chosen from "cash", "debit cards", "credit cards" and "others".',
	[ERRORS.NOT_ALLOWED_ACCOUNT]: 'Actions on "uncategorized" are forbidden.',
	[ERRORS.NOT_FOUND_ACCOUNT]: 'This account does not exist.',
	[ERRORS.DUPLICATE_ACCOUNT]: 'This account already exists.',
	[ERRORS.INVALID_ACCOUNT_NAME]:
		'New account should only contain letters, numbers, spaces, dash(-) and underline(_).',

	[ERRORS.INVALID_BILL_DATE]:
		'The time range chosen from time picker is invalid, please refresh the page and try again.',
	[ERRORS.INVALID_TRANSACTION_ID]: 'The id of this transaction is invalid, please refresh the page and try again.',
	[ERRORS.NOT_FOUND_TRANSACTION]: 'This transaction does not exist.',
	[ERRORS.INVALID_TRANSACTION_AMOUNT]: 'The amount should be larger than 0.',
	[ERRORS.INVALID_TRANSACTION_TYPE]: 'Please choose a transaction type.',
	[ERRORS.INVALID_TRANSACTION_CATEGORY]: 'Please choose a transaction category.',
	[ERRORS.INVALID_TRANSACTION_TIME]:
		'The time of this transaction is invalid, please refresh the page and try again.',
	[ERRORS.INVALID_TRANSACTION_ACCOUNT_TYPE]: 'Please choose a transaction account type.',
	[ERRORS.INVALID_TRANSACTION_ACCOUNT]: 'Please choose a transaction account out of your settings.',

	[ERRORS.TOO_LONG_ACCOUNT_NAME]: 'Your account should be no more than 20 characters.',
	[ERRORS.TOO_LONG_CATEGORY_NAME]: 'Your category should be no more than 20 characters.',
	[ERRORS.TOO_LONG_USERNAME]: 'Your username should be no more than 20 characters.',
	[ERRORS.TOO_LONG_TRANSACTION_AMOUNT]: 'Your transaction amount should be no more than 100 million.',
};

export { ERRORS, ERROR_MESSAGES };
