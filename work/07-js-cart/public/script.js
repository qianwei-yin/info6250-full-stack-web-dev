/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "catCounts": () => (/* binding */ catCounts),
/* harmony export */   "catProducts": () => (/* binding */ catProducts)
/* harmony export */ });
var catProducts = {
  cat1: {
    name: 'Kali',
    price: 0.99,
    url: 'http://placekitten.com/150/150?image=1'
  },
  cat2: {
    name: 'Mongo',
    price: 3.14,
    url: 'http://placekitten.com/150/150?image=2'
  },
  cat3: {
    name: 'Kankon',
    price: 2.73,
    url: 'http://placekitten.com/150/150?image=3'
  }
};
var catCounts = {};

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
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");

(function () {
  var toggleCartEl = document.querySelector('.toggle-cart');
  var productsContentEl = document.querySelector('.products');
  var cartContentEl = document.querySelector('.cart');
  var checkoutContentEl = document.querySelector('.checkout');
  var totalAmountEl = document.querySelector('.text--amount');
  var checkoutBtnEl = document.querySelector('.btn-checkout');
  var state = {
    cartOpen: false
  };
  toggleCartEl.addEventListener('click', function () {
    state.cartOpen = !state.cartOpen;
    if (state.cartOpen) {
      toggleCartEl.innerText = 'Hide Cart';
    } else {
      displayViewCart();
    }
    render();
  });
  productsContentEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('add-to-cart')) {
      return;
    }
    var addId = e.target.dataset.id;
    if (_data__WEBPACK_IMPORTED_MODULE_0__.catCounts[addId]) {
      _data__WEBPACK_IMPORTED_MODULE_0__.catCounts[addId]++;
    } else {
      _data__WEBPACK_IMPORTED_MODULE_0__.catCounts[addId] = 1;
    }
    render();
  });
  cartContentEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('toggle-quantity')) {
      return;
    }
    var toggleId = e.target.parentElement.dataset.id;
    if (e.target.classList.contains('btn-increase')) {
      _data__WEBPACK_IMPORTED_MODULE_0__.catCounts[toggleId]++;
    } else {
      _data__WEBPACK_IMPORTED_MODULE_0__.catCounts[toggleId]--;
      if (_data__WEBPACK_IMPORTED_MODULE_0__.catCounts[toggleId] === 0) {
        delete _data__WEBPACK_IMPORTED_MODULE_0__.catCounts[toggleId];
      }
    }
    render();
  });
  checkoutBtnEl.addEventListener('click', function () {
    for (var key in _data__WEBPACK_IMPORTED_MODULE_0__.catCounts) {
      delete _data__WEBPACK_IMPORTED_MODULE_0__.catCounts[key];
    }
    state.cartOpen = false;
    render();
  });
  function render() {
    if (!state.cartOpen) {
      cartContentEl.classList.add('not-show');
      checkoutContentEl.classList.add('not-show');
      displayViewCart();
    } else {
      cartContentEl.classList.remove('not-show');
      checkoutContentEl.classList.remove('not-show');
    }
    var htmlProducts = generateProductsHtml();
    productsContentEl.innerHTML = htmlProducts;
    var htmlCart = '';
    if (Object.keys(_data__WEBPACK_IMPORTED_MODULE_0__.catCounts).length === 0) {
      checkoutBtnEl.disabled = true;
      htmlCart = '<h1 class="empty-cart">Your cart is empty</h1>';
    } else {
      checkoutBtnEl.disabled = false;
      htmlCart = generateCartHtml();
    }
    cartContentEl.innerHTML = htmlCart;
    var totalAmount = calculateTotalAmount();
    totalAmountEl.innerText = "$".concat(totalAmount.toFixed(2));
  }
  function generateProductsHtml() {
    return "\n            ".concat(Object.keys(_data__WEBPACK_IMPORTED_MODULE_0__.catProducts).map(function (id) {
      return "\n                        <div class=\"product\">\n                            <article class=\"product__info\">\n                                <img src=\"".concat(_data__WEBPACK_IMPORTED_MODULE_0__.catProducts[id].url, "\" alt=\"").concat(id, "\" class=\"info__img\" />\n                                <div class=\"info__text\">\n                                    <span class=\"info__name\">").concat(_data__WEBPACK_IMPORTED_MODULE_0__.catProducts[id].name, "</span>\n                                    <span class=\"info__price\">$").concat(_data__WEBPACK_IMPORTED_MODULE_0__.catProducts[id].price, "</span>\n                                </div>\n                            </article>\n                            <button class=\"add-to-cart\" data-id=\"").concat(id, "\">Add To Cart</button>\n                        </div>\n                    ");
    }).join(''), "\n        ");
  }
  function generateCartHtml() {
    return "\n            <div class=\"cart__row cart__title\">\n                <span>Image</span>\n                <span>Name</span>\n                <span>Total</span>\n                <span>Quantity</span>\n            </div>\n            ".concat(Object.keys(_data__WEBPACK_IMPORTED_MODULE_0__.catCounts).map(function (id) {
      return "\n                        <div class=\"cart__row cart__product\">\n                            <img src=\"".concat(_data__WEBPACK_IMPORTED_MODULE_0__.catProducts[id].url, "\" alt=\"").concat(id, "\" class=\"row__img\" />\n                            <span>").concat(_data__WEBPACK_IMPORTED_MODULE_0__.catProducts[id].name, "</span>\n                            <span>$").concat((_data__WEBPACK_IMPORTED_MODULE_0__.catProducts[id].price * _data__WEBPACK_IMPORTED_MODULE_0__.catCounts[id]).toFixed(2), "</span>\n                            <div class=\"quantity\" data-id=\"").concat(id, "\">\n                                <button class=\"toggle-quantity btn-decrease\">-</button>\n                                <span class=\"row__quantity\">").concat(_data__WEBPACK_IMPORTED_MODULE_0__.catCounts[id], "</span>\n                                <button class=\"toggle-quantity btn-increase\">+</button>\n                            </div>\n                        </div>\n                    ");
    }).join(''), "\n        ");
  }
  function calculateTotalAmount() {
    return Object.keys(_data__WEBPACK_IMPORTED_MODULE_0__.catCounts).reduce(function (acc, id) {
      acc += Number((_data__WEBPACK_IMPORTED_MODULE_0__.catCounts[id] * _data__WEBPACK_IMPORTED_MODULE_0__.catProducts[id].price).toFixed(2));
      return acc;
    }, 0);
  }
  function calculateTotalItem() {
    return Object.keys(_data__WEBPACK_IMPORTED_MODULE_0__.catCounts).reduce(function (acc, id) {
      acc += _data__WEBPACK_IMPORTED_MODULE_0__.catCounts[id];
      return acc;
    }, 0);
  }
  function displayViewCart() {
    var totalItem = calculateTotalItem();
    toggleCartEl.innerText = "View Cart".concat(totalItem > 0 ? " (".concat(totalItem, ")") : '');
  }
  render();
})();
})();

/******/ })()
;
//# sourceMappingURL=script.js.map