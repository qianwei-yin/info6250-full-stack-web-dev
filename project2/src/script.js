import { fetchSession, fetchLogin, fetchLogout, fetchUsers, fetchMessages } from './services';
import { CLIENT, SERVER } from './constants';
import state, {
	waitOnLogin,
	login,
	logout,
	waitOnUsers,
	setUsers,
	waitOnMessages,
	setMessages,
	setError,
} from './state';
import { render, renderMessages, renderUsers } from './render';
import { addAbilityToLogin, addAbilityToLogout, addAbilityToSend } from './listeners';

export const appEl = document.querySelector('#app');

addAbilityToLogin(appEl);
addAbilityToLogout(appEl);
addAbilityToSend(appEl);

// Run when starting...
checkSession();

function checkSession() {
	waitOnLogin();
	render({ state, appEl });
	fetchSession()
		// when starts, commonly won't execute, because it will throw a auth-missing error
		.then(() => {
			login();
			waitOnUsers();
			waitOnMessages();
			render({ state, appEl });
			return Promise.all([fetchUsers(), fetchMessages()]);
		})
		.then((data) => {
			setUsers(data[0]);
			setMessages(data[1]);
			render({ state, appEl });
		})
		.catch((err) => {
			if (err?.error === SERVER.AUTH_MISSING) {
				logout();
				render({ state, appEl });
			} else {
				setError(err?.error || 'ERROR');
				render({ state, appEl });
			}
		})
		.then(() => {
			setInterval(refreshUsersAndMessages, 5000);
		});
}

function refreshUsersAndMessages() {
	if (!state.isLoggedIn) return;

	fetchUsers()
		.then((users) => {
			setUsers(users);
			renderUsers({ state, appEl });
			return fetchMessages();
		})
		.then((messages) => {
			// This line makes sure that if there is no new message, it will not render.
			if (messages.length === state.messages.length) return;
			setMessages(messages);
			renderMessages({ state, appEl });
		})
		.catch((err) => {
			if (err?.error === SERVER.AUTH_MISSING) {
				logout();
				render({ state, appEl });
			} else {
				setError(err?.error || 'ERROR');
				render({ state, appEl });
			}
		});
}
