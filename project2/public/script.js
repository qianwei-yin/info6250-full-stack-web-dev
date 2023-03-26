/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CLIENT": () => (/* binding */ CLIENT),
/* harmony export */   "MESSAGES": () => (/* binding */ MESSAGES),
/* harmony export */   "SERVER": () => (/* binding */ SERVER)
/* harmony export */ });
var _MESSAGES;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  INVALID_USERNAME: 'invalid-username',
  FORBIDDEN_USERNAME: 'forbidden-username',
  INVALID_MESSAGE: 'invalid-message'
};
var CLIENT = {
  NETWORK_ERROR: 'network-error'
};
var MESSAGES = (_MESSAGES = {}, _defineProperty(_MESSAGES, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network, please try again later.'), _defineProperty(_MESSAGES, SERVER.AUTH_MISSING, 'Your session is invalid or has expired, logging you out...'), _defineProperty(_MESSAGES, SERVER.INVALID_USERNAME, 'Please enter a valid (within 20 letters and/or numbers) username.'), _defineProperty(_MESSAGES, SERVER.FORBIDDEN_USERNAME, 'Sorry, DOGs are forbidden, please use another username.'), _defineProperty(_MESSAGES, SERVER.INVALID_MESSAGE, 'Cannot send empty messages!'), _defineProperty(_MESSAGES, "default", 'Something went wrong, please try again later.'), _MESSAGES);

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addAbilityToLogin": () => (/* binding */ addAbilityToLogin),
/* harmony export */   "addAbilityToLogout": () => (/* binding */ addAbilityToLogout),
/* harmony export */   "addAbilityToSend": () => (/* binding */ addAbilityToSend)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");



function addAbilityToLogin(appEl) {
  appEl.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!e.target.classList.contains('login-form')) return;
    var usernameInput = appEl.querySelector('.input--username').value;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnLogin)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(usernameInput).then(function () {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)();
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnUsers)();
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnMessages)();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
      return Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsers)(), (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)()]);
    }).then(function (data) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUsers)(data[0]);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(data[1]);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
    });
  });
}
function addAbilityToLogout(appEl) {
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('logout-btn')) return;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)()["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
    });
  });
}
function addAbilityToSend(appEl) {
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('send-form')) return;
    var messageInputEl = appEl.querySelector('.send-form__input--text');
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchAddMessage)(messageInputEl.value).then(function (messages) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderMessages)({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
      messageInputEl.value = '';
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderMessages)({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
    });
  });
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "renderMessages": () => (/* binding */ renderMessages),
/* harmony export */   "renderUsers": () => (/* binding */ renderUsers)
/* harmony export */ });
var spinnerHTML = "<span><div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div></span>";
function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n        ".concat(generateLoginHTML(state), "\n        ").concat(generateChatHTML(state), "\n    ");
  appEl.innerHTML = html;
}
function generateLoginHTML(state) {
  if (state.isLoginPending) return '<section class="login-view">' + spinnerHTML + '</section>';
  if (state.isLoggedIn) return '';
  return "\n        <section class=\"login-view\">\n            <form class=\"login-form\">\n                <h1 class=\"login-text\">Log In</h1>\n            " + "\n                ".concat(state.showError ? '<p class="warning">' + state.error + '</p>' : '', "\n            ") + "\n                <input placeholder=\"Enter username to login\" type=\"text\" class=\"input--username\" name=\"username\" />\n                <button class=\"login-btn\">Log In</button>\n            </form>\n        </section>\n    ";
}
function generateChatHTML(state) {
  if (!state.isLoggedIn) return '';
  return "\n        <section class=\"chat-view\">\n\t\t\t<div class=\"users\">\n                ".concat(generateUsersHTML(state), "\n            </div>\n\t\t\t<div class=\"messages\">\n                ").concat(generateMessagesHTML(state), "\n            </div>\n\t\t\t<div class=\"logout\">\n                ").concat(generateLogoutHTML(state), "\n            </div>\n\t\t\t<form class=\"send-form\">\n                ").concat(generateSendFormHTML(state), "\n            </form>\n\t\t</section>\n    ");
}
function generateUsersHTML(state) {
  if (!state.isLoggedIn) return '';
  return "\n        <h3>".concat(state.isUsersPending ? spinnerHTML : 'Active Users', "</h3>\n        <ul class=\"user-list\">\n        ").concat(Object.entries(state.users).map(function (el) {
    if (el[1]) {
      return "\n                        <li>\n                            <div class=\"user\">\n                                <div class=\"avatar user__avatar\">".concat(el[0].slice(0, 1), "</div>\n                                <span class=\"username\">").concat(el[0], "</span>\n                            </div>\n                        </li>\n                    ");
    }
    return '';
  }).join(''), "\n        </ul>\n    ");
}
function generateMessagesHTML(state) {
  if (!state.isLoggedIn) return '';
  return "\n        <h3>".concat(state.isMessagesPending ? spinnerHTML : 'Public Chat Room', "</h3>\n        ").concat(state.showError ? '<p class="warning">' + state.error + '</p>' : '', "\n        <ol class=\"message-list\">\n        ").concat(state.messages.slice().reverse().map(function (el) {
    return "\n                    <div class=\"message\">\n                        <div class=\"message__sender\">\n                            <div class=\"avatar sender__avatar\">".concat(el.username.slice(0, 1), "</div>\n                            <span class=\"sender__username\">").concat(el.username, "</span>\n                        </div>\n                        <p class=\"message__text\">").concat(el.message, "</p>\n                    </div>\n                ");
  }).join(''), "\n        </ol>\n    ");
}
function generateLogoutHTML(state) {
  if (!state.isLoggedIn) return '';
  return '<button class="logout-btn">Log Out</button>';
}
function generateSendFormHTML(state) {
  if (!state.isLoggedIn) return '';
  return "\n        <input\n            placeholder=\"Enter message to send\"\n            type=\"text\"\n            class=\"send-form__input--text\"\n            name=\"text\"\n            required\n        />\n        <button class=\"send-form__btn\" type=\"submit\">Send</button>\n    ";
}
function renderUsers(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl;
  var usersEl = appEl.querySelector('.users');
  if (!usersEl) return;
  usersEl.innerHTML = generateUsersHTML(state);
}
function renderMessages(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl;
  var messagesEl = appEl.querySelector('.messages');
  if (!messagesEl) return;
  messagesEl.innerHTML = generateMessagesHTML(state);
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAddMessage": () => (/* binding */ fetchAddMessage),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchMessages": () => (/* binding */ fetchMessages),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession),
/* harmony export */   "fetchUsers": () => (/* binding */ fetchUsers)
/* harmony export */ });
function fetchSession() {
  return fetch('/api/v1/sessions', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (resp) {
    if (resp.ok) {
      return resp.json();
    }
    return resp.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch('/api/v1/sessions', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (resp) {
    if (resp.ok) {
      return Promise.resolve();
    }
    return resp.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch('/api/v1/sessions', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (resp) {
    if (resp.ok) {
      return Promise.resolve();
    }
    return resp.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchUsers() {
  return fetch('/api/v1/users', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (resp) {
    if (resp.ok) return resp.json();
    return resp.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchMessages() {
  return fetch('/api/v1/messages', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (resp) {
    if (resp.ok) return resp.json();
    return resp.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchAddMessage(message) {
  return fetch('/api/v1/messages', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      message: message
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (resp) {
    if (resp.ok) {
      return resp.json();
    }
    return resp.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "setError": () => (/* binding */ setError),
/* harmony export */   "setMessages": () => (/* binding */ setMessages),
/* harmony export */   "setUsers": () => (/* binding */ setUsers),
/* harmony export */   "waitOnLogin": () => (/* binding */ waitOnLogin),
/* harmony export */   "waitOnMessages": () => (/* binding */ waitOnMessages),
/* harmony export */   "waitOnUsers": () => (/* binding */ waitOnUsers)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  isLoggedIn: false,
  isLoginPending: true,
  isUsersPending: false,
  isMessagesPending: false,
  users: {},
  messages: [],
  showError: false,
  error: ''
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.users = {};
  state.messages = [];
  state.showError = false;
}
function login() {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.showError = false;
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.users = {};
  state.messages = [];
  state.showError = false;
}
function waitOnUsers() {
  state.users = {};
  state.isUsersPending = true;
  state.showError = false;
}
function setUsers(users) {
  state.users = users;
  state.isUsersPending = false;
  state.showError = false;
}
function waitOnMessages() {
  state.messages = [];
  state.isMessagesPending = true;
  state.showError = false;
}
function setMessages(messages) {
  state.messages = messages;
  state.isMessagesPending = false;
  state.showError = false;
}
function setError(error) {
  if (!error) {
    state.showError = false;
    state.error = '';
  } else {
    state.showError = true;
    state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appEl": () => (/* binding */ appEl)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");





var appEl = document.querySelector('#app');
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToLogin)(appEl);
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToLogout)(appEl);
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToSend)(appEl);

// Run when starting...
checkSession();
function checkSession() {
  (0,_state__WEBPACK_IMPORTED_MODULE_2__.waitOnLogin)();
  (0,_render__WEBPACK_IMPORTED_MODULE_3__.render)({
    state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
    appEl: appEl
  });
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchSession)()
  // when starts, commonly won't execute, because it will throw a auth-missing error
  .then(function () {
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.login)();
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.waitOnUsers)();
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.waitOnMessages)();
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
      appEl: appEl
    });
    return Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsers)(), (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)()]);
  }).then(function (data) {
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.setUsers)(data[0]);
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.setMessages)(data[1]);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.render)({
      state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
      appEl: appEl
    });
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_1__.SERVER.AUTH_MISSING) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.render)({
        state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
        appEl: appEl
      });
    } else {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.render)({
        state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
        appEl: appEl
      });
    }
  }).then(function () {
    setInterval(refreshUsersAndMessages, 5000);
  });
}
function refreshUsersAndMessages() {
  if (!_state__WEBPACK_IMPORTED_MODULE_2__["default"].isLoggedIn) return;
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsers)().then(function (users) {
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.setUsers)(users);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderUsers)({
      state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
      appEl: appEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)();
  }).then(function (messages) {
    // This line makes sure that if there is no new message, it will not render.
    if (messages.length === _state__WEBPACK_IMPORTED_MODULE_2__["default"].messages.length) return;
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.setMessages)(messages);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMessages)({
      state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
      appEl: appEl
    });
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_1__.SERVER.AUTH_MISSING) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.render)({
        state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
        appEl: appEl
      });
    } else {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.render)({
        state: _state__WEBPACK_IMPORTED_MODULE_2__["default"],
        appEl: appEl
      });
    }
  });
}
})();

/******/ })()
;
//# sourceMappingURL=script.js.map