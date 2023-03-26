const spinnerHTML = `<span><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></span>`;

export function render({ state, appEl }) {
	const html = `
        ${generateLoginHTML(state)}
        ${generateChatHTML(state)}
    `;
	appEl.innerHTML = html;
}

function generateLoginHTML(state) {
	if (state.isLoginPending) return '<section class="login-view">' + spinnerHTML + '</section>';
	if (state.isLoggedIn) return '';

	return (
		`
        <section class="login-view">
            <form class="login-form">
                <h1 class="login-text">Log In</h1>
            ` +
		`
                ${state.showError ? '<p class="warning">' + state.error + '</p>' : ''}
            ` +
		`
                <input placeholder="Enter username to login" type="text" class="input--username" name="username" />
                <button class="login-btn">Log In</button>
            </form>
        </section>
    `
	);
}

function generateChatHTML(state) {
	if (!state.isLoggedIn) return '';
	return `
        <section class="chat-view">
			<div class="users">
                ${generateUsersHTML(state)}
            </div>
			<div class="messages">
                ${generateMessagesHTML(state)}
            </div>
			<div class="logout">
                ${generateLogoutHTML(state)}
            </div>
			<form class="send-form">
                ${generateSendFormHTML(state)}
            </form>
		</section>
    `;
}

function generateUsersHTML(state) {
	if (!state.isLoggedIn) return '';
	return `
        <h3>${state.isUsersPending ? spinnerHTML : 'Active Users'}</h3>
        <ul class="user-list">
        ${Object.entries(state.users)
			.map((el) => {
				if (el[1]) {
					return `
                        <li>
                            <div class="user">
                                <div class="avatar user__avatar">${el[0].slice(0, 1)}</div>
                                <span class="username">${el[0]}</span>
                            </div>
                        </li>
                    `;
				}
				return '';
			})
			.join('')}
        </ul>
    `;
}

function generateMessagesHTML(state) {
	if (!state.isLoggedIn) return '';

	return `
        <h3>${state.isMessagesPending ? spinnerHTML : 'Public Chat Room'}</h3>
        ${state.showError ? '<p class="warning">' + state.error + '</p>' : ''}
        <ol class="message-list">
        ${state.messages
			.slice()
			.reverse()
			.map((el) => {
				return `
                    <div class="message">
                        <div class="message__sender">
                            <div class="avatar sender__avatar">${el.username.slice(0, 1)}</div>
                            <span class="sender__username">${el.username}</span>
                        </div>
                        <p class="message__text">${el.message}</p>
                    </div>
                `;
			})
			.join('')}
        </ol>
    `;
}

function generateLogoutHTML(state) {
	if (!state.isLoggedIn) return '';
	return '<button class="logout-btn">Log Out</button>';
}

function generateSendFormHTML(state) {
	if (!state.isLoggedIn) return '';
	return `
        <input
            placeholder="Enter message to send"
            type="text"
            class="send-form__input--text"
            name="text"
            required
        />
        <button class="send-form__btn" type="submit">Send</button>
    `;
}

export function renderUsers({ state, appEl }) {
	const usersEl = appEl.querySelector('.users');
	if (!usersEl) return;
	usersEl.innerHTML = generateUsersHTML(state);
}

export function renderMessages({ state, appEl }) {
	const messagesEl = appEl.querySelector('.messages');
	if (!messagesEl) return;
	messagesEl.innerHTML = generateMessagesHTML(state);
}
