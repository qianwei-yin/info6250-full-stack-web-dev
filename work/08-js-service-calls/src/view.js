'use strict';

export function showSection(el) {
	el.classList.remove('not-show');
}

export function hideSection(el) {
	el.classList.add('not-show');
}

export function displayWarning(el, msg) {
	el.classList.remove('not-show');
	el.innerText = msg;
}

export function renderHome(wordFor, elObj) {
	const { headerEl, warningEl, homeEl } = elObj;
	const { username: name, storedWord: word } = wordFor;

	const headerHtml = `
        <div class="logo">
            <img src="./assets/favicon.svg" alt="word world logo" class="logo__img" />
            <h3 class="logo__text"><span>word</span> world</h3>
        </div>
        <div class="user">
            <span class="user__img">${name.slice(0, 1)}</span>
            <span class="user__name">${name}</span>
            <form>
                <button class="btn btn--logout">log out</button>
            </form>
        </div>
    `;

	const homeHtml = `
        <div class="content">
            <h2 class="content__text">
                <span class="content__name">${name}, </span>
                ${word ? 'your word is' : 'you have no word, add one!'}
            </h2>
            ${word ? '<span class="content__word">' + word + '</span>' : ''}
        </div>

        <form class="form change-form">
            <h3 class="change-text">Wanna ${word ? 'Change' : 'Add'}?</h3>
            <div class="form-row">
                <label for="word" class="form-label">your new word</label>
                <input type="text" class="form-input input--word" name="word" />
            </div>
            <button class="btn btn--submit btn--new-word">submit</button>
        </form>
    `;

	headerEl.innerHTML = headerHtml;
	warningEl.classList.add('not-show');
	homeEl.innerHTML = homeHtml;
}
