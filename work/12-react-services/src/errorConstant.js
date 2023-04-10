export const ERRORS = {
	AUTH_MISSING: 'auth-missing',
	INVALID_USERNAME: 'invalid-username',
	AUTH_INSUFFICIENT: 'auth-insufficient',
	REQUIRED_WORD: 'required-word',
	INVALID_WORD: 'invalid-word',
	NETWORK_ERROR: 'network-error',
};

export const ERROR_MESSAGES = {
	[ERRORS.INVALID_USERNAME]: 'Your username should only contain letters and numbers.',
	[ERRORS.AUTH_INSUFFICIENT]: 'Sorry, DOGs are forbidden!',
	[ERRORS.REQUIRED_WORD]: 'Please provide your new word.',
	[ERRORS.INVALID_WORD]: 'Your new word should only contain letters.',
	[ERRORS.NETWORK_ERROR]: 'It seems that we lost connection with your network, please check you connection.',
	default: 'Something went wrong, please try again later.',
};
