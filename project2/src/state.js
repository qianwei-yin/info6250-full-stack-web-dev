import { MESSAGES } from './constants';

const state = {
	isLoggedIn: false,
	isLoginPending: true,
	isUsersPending: false,
	isMessagesPending: false,
	users: {},
	messages: [],
	showError: false,
	error: '',
};

export function waitOnLogin() {
	state.isLoggedIn = false;
	state.isLoginPending = true;
	state.users = {};
	state.messages = [];
	state.showError = false;
}

export function login() {
	state.isLoggedIn = true;
	state.isLoginPending = false;
	state.showError = false;
}

export function logout() {
	state.isLoggedIn = false;
	state.isLoginPending = false;
	state.users = {};
	state.messages = [];
	state.showError = false;
}

export function waitOnUsers() {
	state.users = {};
	state.isUsersPending = true;
	state.showError = false;
}

export function setUsers(users) {
	state.users = users;
	state.isUsersPending = false;
	state.showError = false;
}

export function waitOnMessages() {
	state.messages = [];
	state.isMessagesPending = true;
	state.showError = false;
}

export function setMessages(messages) {
	state.messages = messages;
	state.isMessagesPending = false;
	state.showError = false;
}

export function setError(error) {
	if (!error) {
		state.showError = false;
		state.error = '';
	} else {
		state.showError = true;
		state.error = MESSAGES[error] || MESSAGES.default;
	}
}

export default state;
