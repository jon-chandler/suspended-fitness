/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/navigation.js":
/*!*************************************!*\
  !*** ./js/components/navigation.js ***!
  \*************************************/
/***/ (() => {



/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/navigation */ "./js/components/navigation.js");
/* harmony import */ var _components_navigation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_navigation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_parallax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/parallax */ "./js/utils/parallax.js");
/* harmony import */ var _utils_parallax__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_parallax__WEBPACK_IMPORTED_MODULE_1__);



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
      window.scrollTo(0, 1);
    }, 100);
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

  //console.log('>', settings[index].child, 'SCROLL', setVal, 'TOP', scrollTop, 'BOTTOM', scrollBottom)

  if (scrollBottom - scrollTop < setVal) {
    setVal = 0;
  }
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

/***/ }),

/***/ "./scss/main.scss":
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nHookWebpackError: Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\nSassError: Undefined variable.\n    ╷\n173 │         transition: $transition-f;\n    │                     ^^^^^^^^^^^^^\n    ╵\n  scss/core/_typography.scss 173:21  @forward\n  scss/main.scss 6:1                 root stylesheet\n    at tryRunOrWebpackError (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/HookWebpackError.js:87:9)\n    at __webpack_require_module__ (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5515:12)\n    at __webpack_require__ (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5462:18)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5550:20\n    at symbolIterator (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3485:9)\n    at done (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3527:9)\n    at Hook.eval [as callAsync] (eval at create (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:15:1)\n    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/tapable/lib/Hook.js:21:14)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5437:43\n    at symbolIterator (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3482:9)\n    at timesSync (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3463:5)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5399:16\n    at symbolIterator (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3485:9)\n    at timesSync (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3463:5)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5367:15\n    at symbolIterator (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3485:9)\n    at done (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3527:9)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5313:8\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:3713:6\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/HookWebpackError.js:68:2\n    at Hook.eval [as callAsync] (eval at create (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:15:1)\n    at Cache.store (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Cache.js:113:20)\n    at ItemCacheFacade.store (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/CacheFacade.js:142:15)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:3712:11\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Cache.js:99:5\n    at Hook.eval [as callAsync] (eval at create (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:16:1)\n    at Cache.get (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Cache.js:81:18)\n    at ItemCacheFacade.get (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/CacheFacade.js:116:15)\n    at Compilation._codeGenerationModule (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:3680:9)\n    at codeGen (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5301:11)\n    at symbolIterator (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3482:9)\n    at timesSync (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3463:5)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5331:14\n    at processQueue (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/util/processAsyncTree.js:61:4)\n    at process.processTicksAndRejections (node:internal/process/task_queues:85:11)\n-- inner error --\nError: Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\nSassError: Undefined variable.\n    ╷\n173 │         transition: $transition-f;\n    │                     ^^^^^^^^^^^^^\n    ╵\n  scss/core/_typography.scss 173:21  @forward\n  scss/main.scss 6:1                 root stylesheet\n    at Object.<anonymous> (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/scss/main.scss:1:7)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js:544:10\n    at Hook.eval [as call] (eval at create (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/tapable/lib/HookCodeFactory.js:19:10), <anonymous>:7:1)\n    at Hook.CALL_DELEGATE [as _call] (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/tapable/lib/Hook.js:16:14)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5517:39\n    at tryRunOrWebpackError (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/HookWebpackError.js:82:7)\n    at __webpack_require_module__ (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5515:12)\n    at __webpack_require__ (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5462:18)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5550:20\n    at symbolIterator (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3485:9)\n    at done (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3527:9)\n    at Hook.eval [as callAsync] (eval at create (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:15:1)\n    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/tapable/lib/Hook.js:21:14)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5437:43\n    at symbolIterator (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3482:9)\n    at timesSync (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3463:5)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5399:16\n    at symbolIterator (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3485:9)\n    at timesSync (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3463:5)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5367:15\n    at symbolIterator (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3485:9)\n    at done (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3527:9)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5313:8\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:3713:6\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/HookWebpackError.js:68:2\n    at Hook.eval [as callAsync] (eval at create (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:15:1)\n    at Cache.store (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Cache.js:113:20)\n    at ItemCacheFacade.store (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/CacheFacade.js:142:15)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:3712:11\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Cache.js:99:5\n    at Hook.eval [as callAsync] (eval at create (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:16:1)\n    at Cache.get (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Cache.js:81:18)\n    at ItemCacheFacade.get (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/CacheFacade.js:116:15)\n    at Compilation._codeGenerationModule (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:3680:9)\n    at codeGen (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5301:11)\n    at symbolIterator (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3482:9)\n    at timesSync (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/neo-async/async.js:3463:5)\n    at /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/Compilation.js:5331:14\n    at processQueue (/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/webpack/lib/util/processAsyncTree.js:61:4)\n    at process.processTicksAndRejections (node:internal/process/task_queues:85:11)\n\nGenerated code for /Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!/Users/me/Sites/SUSPENDED-FITNESS/frontend_src/scss/main.scss\n1 | throw new Error(\"Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\\nSassError: Undefined variable.\\n    ╷\\n173 │         transition: $transition-f;\\n    │                     ^^^^^^^^^^^^^\\n    ╵\\n  scss/core/_typography.scss 173:21  @forward\\n  scss/main.scss 6:1                 root stylesheet\");");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./js/main.js");
/******/ 	// This entry module doesn't tell about it's top-level declarations so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./scss/main.scss");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map