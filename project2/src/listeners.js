import { fetchSession, fetchLogin, fetchLogout, fetchAddMessage } from './services';
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
import { render, renderMessages } from './render';

export function addAbilityToLogin(appEl) {
	appEl.addEventListener('submit', (e) => {
		e.preventDefault();
		if (!e.target.classList.contains('login-form')) return;

		const usernameInput = appEl.querySelector('.input--username').value;
		waitOnLogin();
		render({ state, appEl });
		fetchLogin(usernameInput)
			.then(() => {
				login();
				waitOnUsers();
				waitOnMessages();
				render({ state, appEl });
				// fetchChat
			})
			.catch((err) => {
				logout();
				setError(err?.error || 'ERROR');
				render({ state, appEl });
			});
	});
}

export function addAbilityToLogout(appEl) {
	appEl.addEventListener('click', (e) => {
		if (!e.target.classList.contains('logout-btn')) return;

		logout();
		render({ state, appEl });
		fetchLogout().catch((err) => {
			console.log(err);
			setError(err?.error || 'ERROR');
			render({ state, appEl });
		});
	});
}

export function addAbilityToSend(appEl) {
	appEl.addEventListener('submit', (e) => {
		if (!e.target.classList.contains('send-form')) return;

		const messageInputEl = appEl.querySelector('.send-form__input--text');
		fetchAddMessage(messageInputEl.value)
			.then((messages) => {
				setMessages(messages);
				renderMessages({ state, appEl });
				messageInputEl.value = '';
			})
			.catch((err) => {
				setError(err?.error || 'ERROR');
				renderMessages({ state, appEl });
			});
	});
}
