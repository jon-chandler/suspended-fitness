/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/navigation.js":
/*!*************************************!*\
  !*** ./js/components/navigation.js ***!
  \*************************************/
/***/ (() => {



/***/ }),

/***/ "./js/utils/parallax.js":
/*!******************************!*\
  !*** ./js/utils/parallax.js ***!
  \******************************/
/***/ (() => {

var setListener = [];
var settings = [];
var resizeID;
var winH = window.innerHeight;
var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
var scrollBottom = scrollTop + winH;
var bgContainer = document.getElementById('background-animation');
var parallax = function parallax() {
  var targetClass = '.parallax-elem';
  var childClass = '.js-parallax-elem';
  var targets = Array.prototype.slice.call(document.querySelectorAll(targetClass), 0);
  if (targets.length === 0) {
    return;
  }
  targets.forEach(function (target, index) {
    target.setAttribute('data-index', index);
    var child = target.querySelector(childClass);
    if (!child) {
      return;
    }
    settings.push({
      child: child,
      scrollRatio: (child.clientHeight - target.clientHeight) / (winH + target.clientHeight)
    });
    setListener.push({
      target: target,
      handleEvent: function handleEvent() {
        observer.observe(target);
      }
    });
    bindThem(target);
    setTimeout(function () {
      child.classList.add('add-trans');
    }, 500);
  });
  window.addEventListener('resize', function () {
    clearTimeout(resizeID);
    resizeID = setTimeout(function () {
      winH = window.innerHeight;
      targets.forEach(function (target, index) {
        if (!settings[index].child) {
          return;
        }
        settings[index].scrollRatio = (settings[index].child.clientHeight - target.clientHeight) / (winH + target.clientHeight);
      });
    }, 200);
  });
  window.addEventListener('scroll', function () {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollBottom = scrollTop + winH;
  }, {
    passive: true
  });
};
var observerFunc = function observerFunc(entries) {
  entries.forEach(function (entry) {
    var target = entry.target;
    var listener = setListener[target.getAttribute('data-index')];
    if (entry.isIntersecting) {
      target.style.willChange = 'transform';
      window.addEventListener('scroll', listener, {
        passive: true
      });
    } else {
      target.style.willChange = '';
      window.removeEventListener('scroll', listener, {
        passive: true
      });
    }
    requestAnimationFrame(parallaxFunc.bind(target));
  });
};
var parallaxFunc = function parallaxFunc() {
  var index = Number(this.getAttribute('data-index'));
  var targetPosi = scrollTop + 100;
  var setVal = targetPosi - settings[index].scrollRatio.toFixed(1);
  settings[index].child.style.transform = 'translate3d(0,' + setVal + 'px,0)';
};
var observer = new IntersectionObserver(observerFunc, {
  root: null,
  rootMargin: '0px',
  threshold: .5
});
var bindThem = function bindThem(elem) {
  observer.observe(elem);
  requestAnimationFrame(parallaxFunc.bind(elem));
};
var addObserver = function addObserver(entries) {
  entries.forEach(function (entry) {
    requestAnimationFrame(parallaxFunc.bind(entry));
  });
};
window.addEventListener('DOMContentLoaded', function () {
  var bgAmin = document.getElementById('background-animation');
  if (!bgAmin) {
    return;
  }
  parallax();
  bgContainer.scrollTo(0, window.innerHeight);
});

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/navigation */ "./js/components/navigation.js");
/* harmony import */ var _components_navigation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_navigation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_parallax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/parallax */ "./js/utils/parallax.js");
/* harmony import */ var _utils_parallax__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_parallax__WEBPACK_IMPORTED_MODULE_1__);


})();

// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=main.js.map