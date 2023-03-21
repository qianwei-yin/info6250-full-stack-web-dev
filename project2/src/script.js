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
		.then(() => {
			login();
			waitOnUsers();
			waitOnMessages();
			render({ state, appEl });
			return fetchUsers();
		})
		.then((users) => {
			setUsers(users);
			renderUsers({ state, appEl });
			return fetchMessages();
		})
		.then((messages) => {
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

	setInterval(refreshUsersAndMessages, 5000);
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
