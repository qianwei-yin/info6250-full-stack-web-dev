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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// Constants benefits
// - reduces risk of typos (IDE can code-complete)
// - easier to confirm it is correct (easier to check properties than strings)
// - If a value changes, you can change it in one place and the rest of the code can continue to use the constant

// Might be SERVER_CODES and CLIENT_CODES if we had more and different constants
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_TASK: 'required-task',
  TASK_MISSING: 'noSuchId' // Someone was inconsistent!
};

var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = (_MESSAGES = {}, _defineProperty(_MESSAGES, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network.  Please try again'), _defineProperty(_MESSAGES, SERVER.AUTH_INSUFFICIENT, 'Your username/password combination does not match any records, please try again.'), _defineProperty(_MESSAGES, SERVER.REQUIRED_USERNAME, 'Please enter a valid (letters and/or numbers) username'), _defineProperty(_MESSAGES, SERVER.REQUIRED_TASK, 'Please enter the task to do'), _defineProperty(_MESSAGES, "default", 'Something went wrong.  Please try again'), _MESSAGES);

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addAbilityToAddTodo": () => (/* binding */ addAbilityToAddTodo),
/* harmony export */   "addAbilityToLogin": () => (/* binding */ addAbilityToLogin),
/* harmony export */   "addAbilityToLogout": () => (/* binding */ addAbilityToLogout),
/* harmony export */   "addAbilityToRefresh": () => (/* binding */ addAbilityToRefresh),
/* harmony export */   "addAbilityToRemoveTodo": () => (/* binding */ addAbilityToRemoveTodo),
/* harmony export */   "addAbilityToToggleComplete": () => (/* binding */ addAbilityToToggleComplete)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");



function addAbilityToLogin(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  // Using 'submit' so we can get both submit via button-click and by "enter"
  appEl.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!e.target.classList.contains('login__form')) {
      return;
    }
    var username = appEl.querySelector('.login__username').value;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnTodos)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    }); // show loading state
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (todos) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(username);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setTodos)(todos);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToLogout(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('controls__logout')) {
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)() // We don't really care about results
    ["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToRefresh(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('controls__refresh')) {
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnTodos)(); // Show loading state
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchTodos)().then(function (todos) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setTodos)(todos);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToToggleComplete(_ref4) {
  var state = _ref4.state,
    appEl = _ref4.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('todo__toggle')) {
      return;
    }
    var id = e.target.dataset.id;
    // Here I elect not show a waiting status...what impact could that have?
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUpdateTodo)(id, {
      done: !state.todos[id].done
    }).then(function (todo) {
      // Service call returns the updated todo
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.updateTodo)({
        id: id,
        todo: todo
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      console.log(err);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToAddTodo(_ref5) {
  var state = _ref5.state,
    appEl = _ref5.appEl;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('add__form')) {
      return;
    }
    var task = appEl.querySelector('.add__task').value;
    // Here I elect not show a waiting status...what impact could that have?
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchAddTodo)(task).then(function (todo) {
      // Notice we get the id of the new todo from the returned todo
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.addTodo)({
        id: todo.id,
        todo: todo
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      console.log(err);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToRemoveTodo(_ref6) {
  var state = _ref6.state,
    appEl = _ref6.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('todo__delete')) {
      return;
    }
    var id = e.target.dataset.id;
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.waitOnTodos)(); // Show loading state
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchDeleteTodo)(id).then(function () {
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchTodos)(); // Return the promise so we can chain
    }).then(function (todos) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setTodos)(todos);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Here we rebuild ALL the HTML whenever the state changes
// That is not the most efficient way to do it
// We COULD make these functions smarter about noticing what state changed
// and what HTML is dependent on that state
// and only replace the HTML that needs to be replaced
// but we'll be moving to React soon where someone has already written that
// The key part here is to see how the HTML is based on state
// - at this stage, the "action" is not visible, only the state
// - so our render is decoupled from the actions and events

function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n   <main class=\"\">\n     ".concat(generateStatusHtml(state), "\n     ").concat(generateLoginHtml(state), "\n     ").concat(generateContentHtml(state), "\n   </main>\n  ");
  appEl.innerHTML = html;
}
function generateStatusHtml(state) {
  return "\n      <div class=\"status\">".concat(state.error, "</div>\n  ");
}
function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return "\n      <div class=\"login__waiting\">Loading user...</div>\n    ";
  }
  if (state.isLoggedIn) {
    return "";
  }

  // The #/login below isn't "real" - the form should never navigate
  // I included it merely as a hint to what the form does
  return "\n      <div class=\"login\">\n        <form class=\"login__form\" action=\"#/login\">\n          <label>\n            <span>Username:</span>\n            <input class=\"login__username\" value=\"\">\n          </label>\n          <button class=\"login__button\" type=\"submit\">Login</button>\n        </form>\n      </div>\n  ";
}
function generateContentHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  if (state.isTodoPending) {
    return "\n      <div class=\"content\">\n        ".concat(generateControlsHtml(state), "\n        <div class=\"todos__waiting\">Loading Todos...</div>\n      </div>\n    ");
  }
  return "\n      <div class=\"content\">\n        ".concat(generateControlsHtml(state), "\n        <ul class=\"todos\">").concat(generateTodosHtml(state), "</ul>\n        ").concat(generateAddTodoHtml(state), "\n      </div>\n  ");
}
function generateControlsHtml(state) {
  return "\n        <div class=\"controls\">\n          <button class=\"controls__refresh\">Refresh</button>\n          <button class=\"controls__logout\">Logout</button>\n        </div>\n  ";
}
function generateTodosHtml(state) {
  var todosHtml = Object.values(state.todos).map(function (todo) {
    var isDoneClass = todo.done ? "todo__text--complete" : "";
    var isAddedClass = state.lastAddedTodoId === todo.id ? "todo__text--added" : "";
    return "\n      <li class=\"todo\">\n        <label\n        >\n          <input\n            class=\"todo__toggle\"\n            data-id=\"".concat(todo.id, "\"\n            type=\"checkbox\"\n            ").concat(todo.done ? "checked" : "", "\n          >\n          <span\n            data-id=\"").concat(todo.id, "\"\n            class=\"todo__toggle todo__text ").concat(isDoneClass, " ").concat(isAddedClass, " \"\n          >\n            ").concat(todo.task, "\n          </span>\n        </label>\n        <button\n          data-id=\"").concat(todo.id, "\"\n          class=\"todo__delete\"\n        >\n          &#10060;\n        </button>\n      </li>\n      ");
  }).join('') || "<p>No Todo Items yet, add one!</p>";
  return todosHtml;
}
function generateAddTodoHtml(state) {
  return "\n        <form class=\"add__form\" action=\"#/add\">\n          <input class=\"add__task\">\n          <button type=\"submit\" class=\"add__button\">Add</button>\n        </form>\n  ";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAddTodo": () => (/* binding */ fetchAddTodo),
/* harmony export */   "fetchDeleteTodo": () => (/* binding */ fetchDeleteTodo),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession),
/* harmony export */   "fetchTodos": () => (/* binding */ fetchTodos),
/* harmony export */   "fetchUpdateTodo": () => (/* binding */ fetchUpdateTodo)
/* harmony export */ });
// Each of these functions is a bit repetitive
// We COULD write a function that they each use to reduce that
// But
// (1) While these services all use the same structure, not all services will
// (2) I wanted to demonstrate what was happening rather than abstract it away
//     so that you will be able to write a different way to handle different services
//
// Key lesson: These functions all handle:
// - MAKING the service calls
// - Passing the data
// - Parsing the results
//
// But these functions DO NOT
// - change the state
// - change the DOM
//
// This makes these functions fully decoupled and reuseable
//
// Notice they each return a promise. This is essential.
// It allows the caller to attach reactions in then() and catch() clauses
function fetchAddTodo(task) {
  return fetch('/api/todos', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      task: task
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchDeleteTodo(id) {
  return fetch("/api/todos/".concat(id), {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchUpdateTodo(id, todoUpdates) {
  return fetch("/api/todos/".concat(id), {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify(todoUpdates)
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchTodos() {
  return fetch('/api/todos')["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchSession() {
  return fetch('/api/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
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
/* harmony export */   "addTodo": () => (/* binding */ addTodo),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "setError": () => (/* binding */ setError),
/* harmony export */   "setTodos": () => (/* binding */ setTodos),
/* harmony export */   "updateTodo": () => (/* binding */ updateTodo),
/* harmony export */   "waitOnLogin": () => (/* binding */ waitOnLogin),
/* harmony export */   "waitOnTodos": () => (/* binding */ waitOnTodos)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  // We store these as an object because we will access by id
  todos: {},
  isLoggedIn: false,
  isLoginPending: true,
  // We start with our login status unknown
  isTodoPending: false,
  username: '',
  lastAddedTodoId: '',
  error: ''
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.todos = {};
  state.error = '';
}
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
  state.lastAddedTodoId = '';
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.todos = {};
  state.error = '';
}
function waitOnTodos() {
  state.todos = {};
  state.isTodoPending = true;
  state.error = '';
}
function setTodos(todos) {
  state.todos = todos;
  state.isTodoPending = false;
  state.error = '';
  state.lastAddedTodoId = '';
}
function updateTodo(_ref) {
  var id = _ref.id,
    todo = _ref.todo;
  state.todos[id] = todo;
  state.error = '';
  state.lastAddedTodoId = '';
}
function addTodo(_ref2) {
  var id = _ref2.id,
    todo = _ref2.todo;
  state.todos[id] = todo;
  state.lastAddedTodoId = id;
  state.error = '';
}
function setError(error) {
  console.log(error);
  if (!error) {
    state.error = '';
    return;
  }
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
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
/*!**********************!*\
  !*** ./src/todos.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");






// Main code
// This is where someone new to the code will see what happens on load
// You want to make it easy to see the big picture
// and easy to find the part you care about
// - Why did you come here? To fix a bug? Add a feature?
// - Make it easy to find the relevant code
// - skimmable

var appEl = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToLogin)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToLogout)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToRefresh)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToToggleComplete)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToAddTodo)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToRemoveTodo)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
checkForSession();

//////////

function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchSession)().then(function (session) {
    // The returned object from the service call
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.username); // We do not have todos yet!
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    }); // Show we are logged in but don't have todos
    return (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchTodos)(); // By returning this promise we can chain the original promise
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_0__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION
      }); // Expected, not a problem
    }

    return Promise.reject(err); // Pass any other error unchanged
  }).then(function (todos) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setTodos)(todos);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION) {
      // expected "error"
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)(); // No longer waiting, set to logged out case
      (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
      return;
    }
    // For unexpected errors, report them
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
    (0,_render__WEBPACK_IMPORTED_MODULE_3__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  });
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map