// Constants benefits
// - reduces risk of typos (IDE can code-complete)
// - easier to confirm it is correct (easier to check properties than strings)
// - If a value changes, you can change it in one place and the rest of the code can continue to use the constant

// Might be SERVER_CODES and CLIENT_CODES if we had more and different constants
export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_TASK: 'required-task',
  TASK_MISSING: 'noSuchId', // Someone was inconsistent!
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
};

export const MESSAGES = {
  // The [] below uses the variable value as the key
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
  // Here we use 'dog' to simulate a bad password
  [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
  [SERVER.REQUIRED_TASK]: 'Please enter the task to do',
  default: 'Something went wrong.  Please try again',
};
