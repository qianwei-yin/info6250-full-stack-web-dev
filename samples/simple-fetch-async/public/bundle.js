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
/* harmony export */   "fetchCatDetails": () => (/* binding */ fetchCatDetails),
/* harmony export */   "fetchCatList": () => (/* binding */ fetchCatList)
/* harmony export */ });
// No "use strict" or IIFE is needed, because webpack/babel do that for us!

// named export
function fetchCatList() {
  // Return a promise of parsed results or error object
  return fetch("/cats") // Using a relative url so we use the existing current page domain + protocol
  ["catch"](function () {
    // network error is rejected promise
    return Promise.reject({
      error: 'networkError'
    }); // We return rejected promise with an error object!
  }).then(function (response) {
    if (!response.ok) {
      // Some sort of error status code
      return response.json().then(function (info) {
        return Promise.reject(info);
      }); // We return rejected promise with parsed error object
    }

    return response.json(); // Parse the successful response data
  });
  // Using any successful data is done by the caller, not by this function
  // - Keeps this function reusable and decoupled from the consumption of the results
}
;

// named export
function fetchCatDetails(name) {
  // Return a promise of parsed results or error object
  return fetch("/cats/".concat(name)) // Using a relative url so we use the existing current page domain + protocol
  ["catch"](function () {
    // network error is rejected promise
    return Promise.reject({
      error: 'networkError'
    }); // We return rejected promise with an error object!
  }).then(function (response) {
    if (!response.ok) {
      // Some sort of error status code
      return response.json().then(function (info) {
        return Promise.reject(info);
      }); // We return rejected promise with parsed error object
    }

    return response.json(); // Parse the successful response data
  });
  // Using any successful data is done by the caller, not by this function
  // - Keeps this function reusable and decoupled from the consumption of the results
}
;

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var state = {
  cats: {}
};
state.updateCats = function (catsData) {
  var cats = {}; // replacement object
  catsData.forEach(function (name) {
    cats[name] = _objectSpread({
      name: name
    }, state.cats[name]); // copies existing data for this cat
  });

  state.cats = cats; // replaces previous data for all cats
};

state.updateCat = function (catData) {
  var name = catData.name;
  state.cats[name] = catData;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// No "use strict" or IIFE is needed, because webpack/babel do that for us!

function render(state, rootEl) {
  var cats = state.cats; // Destructure cats property from state into new variable
  var html = generateCatCardsHtml(cats);
  rootEl.innerHTML = html;
}
function generateCatCardsHtml(cats) {
  var listHtml = Object.keys(cats).map(function (name) {
    return "\n      <li class=\"card\">\n          ".concat(generateCatCardHtml(cats[name]), "\n        </button>\n      </li>\n    ");
  }).join('');
  return "\n    <ul class=\"cards\">\n      ".concat(listHtml, "\n    </ul>\n  ");
}
function generateCatCardHtml(cat) {
  var ageHtml = cat.age ? "<span class=\"card__age\">Age: ".concat(cat.age, "</span>") : "";
  var colorHtml = cat.color ? "<span class=\"card__color\">Color: ".concat(cat.color, "</span>") : "";
  var buttonHtml = cat.age ? '' : "<button class=\"card__load\" data-name=\"".concat(cat.name, "\">Load</button>");
  var html = "\n    <h2 class=\"card__name\">".concat(cat.name, "</h2>\n    ").concat(ageHtml, "\n    ").concat(colorHtml, "\n    ").concat(buttonHtml, "\n  ");
  return html;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

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
/*!*********************!*\
  !*** ./src/cats.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ "./src/view.js");
// No "use strict" or IIFE is needed, because webpack/babel do that for us!




var rootEl = document.querySelector('.main');
rootEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('card__load')) {
    var name = e.target.dataset.name;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchCatDetails)(name).then(function (catData) {
      _state__WEBPACK_IMPORTED_MODULE_0__["default"].updateCat(catData);
      (0,_view__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
    })["catch"](function (error) {
      console.warn("replace this with actual error reporting", error);
    });
  }
});

// Below runs on load
(0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchCatList)().then(function (cats) {
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].updateCats(cats);
  (0,_view__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
})["catch"](function (error) {
  console.warn("replace this with actual error reporting", error);
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map