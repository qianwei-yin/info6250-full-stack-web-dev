const ERRORS = {
	NETWORK_ERROR: 'network-error',

	AUTH_MISSING: 'auth-missing',
	INVALID_USERNAME: 'invalid-username',
	AUTH_INSUFFICIENT: 'auth-insufficient',
	INVALID_ACCOUNT_TYPE: 'invalid-account-type',
	ALREADY_EXIST_ACCOUNT: 'already-exist-account',
	NOT_FOUND_ACCOUNT: 'not-found-account',
	INVALID_CATEGORY_TYPE: 'invalid-category-type',
	INVALID_CATEGORY_ACTION: 'invalid-category-action',
	INVALID_CATEGORY_NAME: 'invalid-category-name',
	DUPLICATE_CATEGORY_NAME: 'duplicate-category-name',
	NOT_FOUND_CATEGORY_NAME: 'not-found-category-name',
	REQUIRED_AMOUNT: 'required-amount',
	NOT_FOUND_TRANSACTION: 'not-found-transaction',
	INVALID_BILL_DATE: 'invalid-bill-date',
};

const ERROR_MESSAGES = {
	[ERRORS.AUTH_MISSING]: 'Your session is invalid, missing or has expired, please log in again.',
	[ERRORS.INVALID_USERNAME]: 'Username can only contain letters, numbers and underscore.',
	[ERRORS.AUTH_INSUFFICIENT]: 'Sorry, DOGs are forbidden!',
	default: 'Somrthing went wrong, please try again later.',
};

export { ERRORS, ERROR_MESSAGES };
