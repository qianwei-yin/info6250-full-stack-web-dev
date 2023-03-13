'use strict';

import { fetchLogin, fetchSession, fetchWord, fetchLogout, postWord } from './services';
import { showSection, hideSection, displayWarning, renderHome } from './view';
import { isValidUsername, isValidWord } from './utils';

const loginSectionEl = document.querySelector('.login-section');
const loginWarningEl = document.querySelector('#login-warning');
const loginBtnEl = document.querySelector('.btn--login');
const nameEl = document.querySelector('.input--username');
const homeSectionEl = document.querySelector('.home-section');
const homeHeaderEl = document.querySelector('.header');
const homeWarningEl = document.querySelector('#home-warning');
const homeContentEl = document.querySelector('.home');
const renderHomeElObj = { headerEl: homeHeaderEl, warningEl: homeWarningEl, homeEl: homeContentEl };

// Run after every refreshing
initialRender();
function initialRender() {
	fetchSession()
		.then(() => {
			fetchWordAndRenderHome();
		})
		.catch((err) => {
			if (err.error === 'auth-missing') {
				showSection(loginSectionEl);
				hideSection(homeSectionEl);
				hideSection(loginWarningEl);
			}
		});
}

function fetchWordAndRenderHome() {
	fetchWord()
		.then((data) => {
			hideSection(loginSectionEl);
			showSection(homeSectionEl);
			renderHome(data, renderHomeElObj);
		})
		.catch((err) => {
			checkErrors(homeWarningEl, err);
		});
}

loginBtnEl.addEventListener('click', (e) => {
	e.preventDefault();
	const nameInput = nameEl.value;

	if (!isValidUsername(nameInput)) {
		displayWarning(
			loginWarningEl,
			'Please make sure the username is not empty and only include letters and numbers.'
		);
		return;
	}
	if (nameInput === 'dog') {
		displayWarning(loginWarningEl, 'Sorry, DOGs are forbidden!');
		return;
	}

	fetchLogin(nameInput)
		.then(() => {
			fetchWordAndRenderHome();
		})
		.catch((err) => {
			checkErrors(loginWarningEl, err);
		});
});

homeSectionEl.addEventListener('click', (e) => {
	e.preventDefault();
	if (e.target.classList.contains('btn--logout')) {
		logout();
	}
	if (e.target.classList.contains('btn--new-word')) {
		const newWordBtnEl = e.target;
		const wordInput = newWordBtnEl.previousElementSibling.children[1].value;
		newWord(wordInput);
	}
});

function logout() {
	fetchLogout()
		.then(() => initialRender())
		.catch((err) => {
			checkErrors(homeWarningEl, err);
		});
}

function newWord(wordInput) {
	if (!isValidWord(wordInput)) {
		displayWarning(homeWarningEl, 'Please make sure your word is not empty and only include letters.');
		return;
	}

	postWord(wordInput)
		.then(() => {
			fetchWordAndRenderHome();
		})
		.catch((err) => {
			checkErrors(homeWarningEl, err);
		});
}

function checkErrors(el, err) {
	if (err.error === 'network-error') {
		displayWarning(el, 'Your network is down, please check your Internet connection.');
		return;
	}
	if (err.error === 'auth-missing') {
		showSection(loginSectionEl);
		hideSection(homeSectionEl);
		displayWarning(loginWarningEl, 'Your session is invalid, missing or expired, please log in again.');
		return;
	}
	if (err.error === 'required-username') {
		displayWarning(
			loginWarningEl,
			'Please make sure the username is not empty and only include letters and numbers.'
		);
		return;
	}
	if (err.error === 'auth-insufficient') {
		displayWarning(loginWarningEl, 'Sorry, DOGs are forbidden!');
		return;
	}
	if (err.error === 'required-word' || err.error === 'invalid-word') {
		displayWarning(homeWarningEl, 'Please make sure your word is not empty and only include letters.');
		return;
	}
	displayWarning(el, 'Something went wrong, please try again later.');
	return;
}
