(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const logdown = __webpack_require__(1)

const reduxLogdown = (name, opts = {}) => {
  const logger = opts.logger || logdown(name)
  const prevLogger = opts.logger || logdown('prev state', { prefixColor: '#999999' })
  const actionLogger = opts.logger || logdown('action', { prefixColor: '#FFCC66' })
  const nextLogger = opts.logger || logdown('next state', { prefixColor: '#6699CC' })
  prevLogger.state = actionLogger.state = nextLogger.state = logger.state
  let prevState
  let recursionLevel = -1
  let accumulator = []

  return store => next => action => {
    ++recursionLevel
    accumulator[recursionLevel] = []

    if (!logger.state.isEnabled) {
      return next(action)
    }

    prevState = store.getState()

    if (opts.diff && typeof logger.groupCollapsed === 'function') {
      accumulator[recursionLevel].push(() => logger.groupCollapsed('*action* `' + action.type + '`'))
    } else {
      accumulator[recursionLevel].push(() => logger.log('*action* `' + action.type + '`'))
    }

    if (opts.diff && typeof logger.groupCollapsed === 'function') {
      accumulator[recursionLevel].push(() => prevLogger.log(prevState))
      accumulator[recursionLevel].push(() => actionLogger.log(action))
    }

    let result = next(action)

    if (opts.diff && typeof logger.groupCollapsed === 'function') {
      accumulator[recursionLevel].push(() => nextLogger.log(store.getState()))
      accumulator[recursionLevel].push(() => logger.groupEnd('*action* `' + action.type + '`'))
    }

    if (recursionLevel === 0) {
      for (let i = 0; i < accumulator.length; ++i) {
        accumulator[i].forEach(thunk => thunk())
      }
      accumulator = []
    }

    --recursionLevel

    return result
  }
}

module.exports = reduxLogdown


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).logdown=e()}}(function(){return function e(t,r,n){function o(s,f){if(!r[s]){if(!t[s]){var u="function"==typeof require&&require;if(!f&&u)return require(s,!0);if(i)return i(s,!0);var p=new Error("Cannot find module '"+s+"'");throw p.code="MODULE_NOT_FOUND",p}var a=r[s]={exports:{}};t[s][0].call(a.exports,function(e){var r=t[s][1][e];return o(r||e)},a,a.exports,e,t,r,n)}return r[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(e,t,r){var n=e("./util/to-array");t.exports=function(){function e(t,r){return this instanceof e?e._isPrefixAlreadyInUse(t)?e._getInstanceByPrefix(t):(this.opts=e._normalizeOpts(t,r),this.state=e._getInitialState(this.opts),e._decorateLoggerMethods(this),e._instances.push(this),this):new e(t,r)}return e._instances=[],e._prefixRegExps=[],e._prepareRegExpForPrefixSearch=function(e){return new RegExp("^"+e.replace(/\*/g,".*?")+"$")},e._isPrefixAlreadyInUse=function(t){return e._instances.some(function(e){return e.opts.prefix===t})},e._getInstanceByPrefix=function(t){return e._instances.filter(function(e){return e.opts.prefix===t})[0]},e._normalizeOpts=function(t,r){if("string"!=typeof t)throw new TypeError("prefix must be a string");var n=void 0===(r=r||{}).markdown||Boolean(r.markdown),o=r.prefixColor||e._getNextPrefixColor();return{logger:r.logger||console,markdown:n,prefix:t,prefixColor:o}},e._getInitialState=function(t){return{isEnabled:e._getEnableState(t)}},e._getEnableState=function(t){var r=!1;return e._prefixRegExps.forEach(function(e){"enable"===e.type&&e.regExp.test(t.prefix)?r=!0:"disable"===e.type&&e.regExp.test(t.prefix)&&(r=!1)}),r},e._decorateLoggerMethods=function(e){Object.keys(e.opts.logger).forEach(function(t){e[t]=function(){if(this.state.isEnabled){var e=n(arguments),r=this._prepareOutput(e,t);(this.opts.logger[t]||this.opts.logger.log).apply(this.opts.logger,r)}}})},e}},{"./util/to-array":10}],2:[function(e,t,r){var n=e("./base")(),o=e("./markdown/browser"),i=e("./util/is-color-supported/browser"),s=e("./util/get-global")();n.prefixColors=["#F2777A","#F99157","#FFCC66","#99CC99","#66CCCC","#6699CC","#CC99CC"],n._setPrefixRegExps=function(){try{s.localStorage&&"string"==typeof s.localStorage.getItem("debug")&&(n._prefixRegExps=[],s.localStorage.getItem("debug").split(",").forEach(function(e){var t="enable";"-"===(e=e.trim())[0]&&(e=e.substr(1),t="disable");var r=n._prepareRegExpForPrefixSearch(e);n._prefixRegExps.push({type:t,regExp:r})}))}catch(e){}},n._getNextPrefixColor=function(){var e=0;return function(){return e+=1,n.prefixColors[e%n.prefixColors.length]}}(),n.prototype._getDecoratedPrefix=function(){var e=[];return i()?(e.push("%c"+this.opts.prefix+"%c "),e.push("color:"+this.opts.prefixColor+"; font-weight:bold;","")):e.push("["+this.opts.prefix+"] "),e},n.prototype._prepareOutput=function(e){var t,r=this._getDecoratedPrefix();return"string"==typeof e[0]?this.opts.markdown&&i()?(t=o.parse(e[0]),r[0]=r[0]+t.text,r=r.concat(t.styles)):r[0]=r[0]+e[0]:r.push(e[0]),e.length>1&&(r=r.concat(e.slice(1))),r},n._setPrefixRegExps(),t.exports=n},{"./base":1,"./markdown/browser":3,"./util/get-global":6,"./util/is-color-supported/browser":7}],3:[function(e,t,r){var n=e("./rules/browser"),o=e("./get-next-match");t.exports={parse:function(e){for(var t=[],r=o(e,n);r;)t.push(r.rule.style),t.push(""),e=e.replace(r.rule.regexp,r.rule.replacer),r=o(e,n);return{text:e,styles:t}}}},{"./get-next-match":4,"./rules/browser":5}],4:[function(e,t,r){t.exports=function(e,t){var r=[];return t.forEach(function(t){var n=e.match(t.regexp);n&&r.push({rule:t,match:n})}),0===r.length?null:(r.sort(function(e,t){return e.match.index-t.match.index}),r[0])}},{}],5:[function(e,t,r){t.exports=[{regexp:/\*([^*]+)\*/,replacer:function(e,t){return"%c"+t+"%c"},style:"font-weight:bold;"},{regexp:/_([^_]+)_/,replacer:function(e,t){return"%c"+t+"%c"},style:"font-style:italic;"},{regexp:/`([^`]+)`/,replacer:function(e,t){return"%c"+t+"%c"},style:"background-color:rgba(255,204,102, 0.1);color:#FFCC66;padding:2px 5px;border-radius:2px;"}]},{}],6:[function(e,t,r){(function(e){t.exports=function(){return"object"==typeof self&&self.self===self&&self||"object"==typeof e&&e.global===e&&e||this}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],7:[function(e,t,r){var n=e("../is-webkit"),o=e("../is-firefox");t.exports=function(){return n()||o()}},{"../is-firefox":8,"../is-webkit":9}],8:[function(e,t,r){t.exports=function(){try{return navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)}catch(e){return!1}}},{}],9:[function(e,t,r){t.exports=function(){try{return"WebkitAppearance"in document.documentElement.style}catch(e){return!1}}},{}],10:[function(e,t,r){t.exports=function(e){return Array.prototype.slice.call(e,0)}},{}]},{},[2])(2)});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
});