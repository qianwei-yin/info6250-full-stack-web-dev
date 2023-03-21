export const SERVER = {
	AUTH_MISSING: 'auth-missing',
	INVALID_USERNAME: 'invalid-username',
	FORBIDDEN_USERNAME: 'forbidden-username',
	INVALID_MESSAGE: 'invalid-message',
};

export const CLIENT = {
	NETWORK_ERROR: 'network-error',
};

export const MESSAGES = {
	[CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network, please try again later.',
	[SERVER.AUTH_MISSING]: 'Your session is invalid or has expired, logging you out...',
	[SERVER.INVALID_USERNAME]: 'Please enter a valid (letters and/or numbers) username.',
	[SERVER.FORBIDDEN_USERNAME]: 'Sorry, DOGs are forbidden, please use another username.',
	[SERVER.INVALID_MESSAGE]: 'Cannot send empty messages!',
	default: 'Something went wrong, please try again later.',
};
