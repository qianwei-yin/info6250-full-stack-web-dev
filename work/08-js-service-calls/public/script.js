/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession),
/* harmony export */   "fetchWord": () => (/* binding */ fetchWord),
/* harmony export */   "postWord": () => (/* binding */ postWord)
/* harmony export */ });


// This exported function returns a promise
// that resolves with data
// or rejects with an error object
function fetchSession() {
  return fetch('/api/session')["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchWord() {
  return fetch('/api/word')["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      username: username
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function postWord(word) {
  return fetch('/api/word', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isValidUsername": () => (/* binding */ isValidUsername),
/* harmony export */   "isValidWord": () => (/* binding */ isValidWord)
/* harmony export */ });


function isValidUsername(username) {
  if (username === '') return false;
  return username.trim().match(/^[A-Za-z0-9_]+$/);
}
function isValidWord(word) {
  if (word === '') return false;
  return word.trim().match(/^[A-Za-z]*$/);
}

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayWarning": () => (/* binding */ displayWarning),
/* harmony export */   "hideSection": () => (/* binding */ hideSection),
/* harmony export */   "renderHome": () => (/* binding */ renderHome),
/* harmony export */   "showSection": () => (/* binding */ showSection)
/* harmony export */ });


function showSection(el) {
  el.classList.remove('not-show');
}
function hideSection(el) {
  el.classList.add('not-show');
}
function displayWarning(el, msg) {
  el.classList.remove('not-show');
  el.innerText = msg;
}
function renderHome(wordFor, elObj) {
  var headerEl = elObj.headerEl,
    warningEl = elObj.warningEl,
    homeEl = elObj.homeEl;
  var name = wordFor.username,
    word = wordFor.storedWord;
  var headerHtml = "\n        <div class=\"logo\">\n            <img src=\"./assets/favicon.svg\" alt=\"word world logo\" class=\"logo__img\" />\n            <h3 class=\"logo__text\"><span>word</span> world</h3>\n        </div>\n        <div class=\"user\">\n            <span class=\"user__img\">".concat(name.slice(0, 1), "</span>\n            <span class=\"user__name\">").concat(name, "</span>\n            <form>\n                <button class=\"btn btn--logout\">log out</button>\n            </form>\n        </div>\n    ");
  var homeHtml = "\n        <div class=\"content\">\n            <h2 class=\"content__text\">\n                <span class=\"content__name\">".concat(name, ", </span>\n                ").concat(word ? 'your word is' : 'you have no word, add one!', "\n            </h2>\n            ").concat(word ? '<span class="content__word">' + word + '</span>' : '', "\n        </div>\n\n        <form class=\"form change-form\">\n            <h3 class=\"change-text\">Wanna ").concat(word ? 'Change' : 'Add', "?</h3>\n            <div class=\"form-row\">\n                <label for=\"word\" class=\"form-label\">your new word</label>\n                <input type=\"text\" class=\"form-input input--word\" name=\"word\" />\n            </div>\n            <button class=\"btn btn--submit btn--new-word\">submit</button>\n        </form>\n    ");
  headerEl.innerHTML = headerHtml;
  warningEl.classList.add('not-show');
  homeEl.innerHTML = homeHtml;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.js");





var loginSectionEl = document.querySelector('.login-section');
var loginWarningEl = document.querySelector('#login-warning');
var loginBtnEl = document.querySelector('.btn--login');
var nameEl = document.querySelector('.input--username');
var homeSectionEl = document.querySelector('.home-section');
var homeHeaderEl = document.querySelector('.header');
var homeWarningEl = document.querySelector('#home-warning');
var homeContentEl = document.querySelector('.home');
var renderHomeElObj = {
  headerEl: homeHeaderEl,
  warningEl: homeWarningEl,
  homeEl: homeContentEl
};

// Run after every refreshing
initialRender();
function initialRender() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function () {
    fetchWordAndRenderHome();
  })["catch"](function (err) {
    if (err.error === 'auth-missing') {
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.showSection)(loginSectionEl);
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.hideSection)(homeSectionEl);
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.hideSection)(loginWarningEl);
    }
  });
}
function fetchWordAndRenderHome() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchWord)().then(function (data) {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.hideSection)(loginSectionEl);
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.showSection)(homeSectionEl);
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.renderHome)(data, renderHomeElObj);
  })["catch"](function (err) {
    checkErrors(homeWarningEl, err);
  });
}
loginBtnEl.addEventListener('click', function (e) {
  e.preventDefault();
  var nameInput = nameEl.value;
  if (!(0,_utils__WEBPACK_IMPORTED_MODULE_2__.isValidUsername)(nameInput)) {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.displayWarning)(loginWarningEl, 'Please make sure the username is not empty and only include letters and numbers.');
    return;
  }
  if (nameInput === 'dog') {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.displayWarning)(loginWarningEl, 'Sorry, DOGs are forbidden!');
    return;
  }
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(nameInput).then(function () {
    fetchWordAndRenderHome();
  })["catch"](function (err) {
    checkErrors(loginWarningEl, err);
  });
});
homeSectionEl.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('btn--logout')) {
    logout();
  }
  if (e.target.classList.contains('btn--new-word')) {
    var newWordBtnEl = e.target;
    var wordInput = newWordBtnEl.previousElementSibling.children[1].value;
    newWord(wordInput);
  }
});
function logout() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
    return initialRender();
  })["catch"](function (err) {
    checkErrors(homeWarningEl, err);
  });
}
function newWord(wordInput) {
  if (!(0,_utils__WEBPACK_IMPORTED_MODULE_2__.isValidWord)(wordInput)) {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.displayWarning)(homeWarningEl, 'Please make sure your word is not empty and only include letters.');
    return;
  }
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.postWord)(wordInput).then(function () {
    fetchWordAndRenderHome();
  })["catch"](function (err) {
    checkErrors(homeWarningEl, err);
  });
}
function checkErrors(el, err) {
  if (err.error === 'network-error') {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.displayWarning)(el, 'Your network is down, please check your Internet connection.');
    return;
  }
  if (err.error === 'auth-missing') {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.showSection)(loginSectionEl);
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.hideSection)(homeSectionEl);
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.displayWarning)(loginWarningEl, 'Your session is invalid, missing or expired, please log in again.');
    return;
  }
  if (err.error === 'required-username') {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.displayWarning)(loginWarningEl, 'Please make sure the username is not empty and only include letters and numbers.');
    return;
  }
  if (err.error === 'auth-insufficient') {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.displayWarning)(loginWarningEl, 'Sorry, DOGs are forbidden!');
    return;
  }
  if (err.error === 'required-word' || err.error === 'invalid-word') {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.displayWarning)(homeWarningEl, 'Please make sure your word is not empty and only include letters.');
    return;
  }
  (0,_view__WEBPACK_IMPORTED_MODULE_1__.displayWarning)(el, 'Something went wrong, please try again later.');
  return;
}
})();

/******/ })()
;
//# sourceMappingURL=script.js.map