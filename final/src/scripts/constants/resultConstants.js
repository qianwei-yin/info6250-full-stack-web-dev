const RESULTS = {
	ADD_TRANSACTION_SUCCESS: 'add-transaction-success',
	UPDATE_TRANSACTION_SUCCESS: 'update-transaction-success',
	DELETE_TRANSACTION_SUCCESS: 'delete-transaction-success',

	ADD_ACCOUNT_SUCCESS: 'add-account-success',
	DELETE_ACCOUNT_SUCCESS: 'delete-account-success',
	SET_DEFAULT_ACCOUNT_SUCCESS: 'set-default-account-success',
	ALREADY_DEFAULT_ACCOUNT: 'already-default-account',
	SET_DEFAULT_ACCOUNT_AUTOMATICALLY: 'set-default-account-automatically',

	ADD_CATEGORY_SUCCESS: 'add-category-success',
	DELETE_CATEGORY_SUCCESS: 'delete-category-success',
};

const RESULT_MESSAGES = {
	default: 'Success!',

	[RESULTS.ADD_TRANSACTION_SUCCESS]: 'Added new transaction successfully!',
	[RESULTS.UPDATE_TRANSACTION_SUCCESS]: 'Updated transaction successfully!',
	[RESULTS.DELETE_TRANSACTION_SUCCESS]: 'Deleted transaction successfully!',

	[RESULTS.ADD_ACCOUNT_SUCCESS]: 'Added new account successfully!',
	[RESULTS.DELETE_ACCOUNT_SUCCESS]: 'Deleted account successfully!',
	[RESULTS.SET_DEFAULT_ACCOUNT_SUCCESS]: ' has been set to default account successfully!',
	[RESULTS.ALREADY_DEFAULT_ACCOUNT]: ' is already the default account!',
	[RESULTS.SET_DEFAULT_ACCOUNT_AUTOMATICALLY]: ' has been set to default account automatically!',

	[RESULTS.ADD_CATEGORY_SUCCESS]: 'Added new category successfully!',
	[RESULTS.DELETE_CATEGORY_SUCCESS]: 'Deleted category successfully!',
};

export { RESULTS, RESULT_MESSAGES };
