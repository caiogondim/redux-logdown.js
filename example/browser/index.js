(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).logdown=e()}}(function(){return function e(t,r,n){function o(s,f){if(!r[s]){if(!t[s]){var u="function"==typeof require&&require;if(!f&&u)return u(s,!0);if(i)return i(s,!0);var p=new Error("Cannot find module '"+s+"'");throw p.code="MODULE_NOT_FOUND",p}var a=r[s]={exports:{}};t[s][0].call(a.exports,function(e){var r=t[s][1][e];return o(r||e)},a,a.exports,e,t,r,n)}return r[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(e,t,r){var n=e("./util/to-array");t.exports=function(){function e(t,r){return this instanceof e?e._isPrefixAlreadyInUse(t)?e._getInstanceByPrefix(t):(this.opts=e._normalizeOpts(t,r),this.state=e._getInitialState(this.opts),e._instances.push(this),this):new e(t,r)}return e._instances=[],e._prefixRegExps=[],e._prepareRegExpForPrefixSearch=function(e){return new RegExp("^"+e.replace(/\*/g,".*?")+"$")},e._isPrefixAlreadyInUse=function(t){return e._instances.some(function(e){return e.opts.prefix===t})},e._getInstanceByPrefix=function(t){return e._instances.filter(function(e){return e.opts.prefix===t})[0]},e._normalizeOpts=function(t,r){if("string"!=typeof t)throw new TypeError("prefix must be a string");var n=void 0===(r=r||{}).markdown||Boolean(r.markdown),o=r.prefixColor||e._getNextPrefixColor();return{logger:r.logger||console,markdown:n,prefix:t,prefixColor:o}},e._getInitialState=function(t){return{isEnabled:e._getEnableState(t)}},e._getEnableState=function(t){var r=!1;return e._prefixRegExps.forEach(function(e){"enable"===e.type&&e.regExp.test(t.prefix)?r=!0:"disable"===e.type&&e.regExp.test(t.prefix)&&(r=!1)}),r},["debug","log","info","warn","error"].forEach(function(t){e.prototype[t]=function(){if(this.state.isEnabled){var e=n(arguments),r=this._prepareOutput(e,t);(this.opts.logger[t]||this.opts.logger.log).apply(this.opts.logger,r)}}},this),e}},{"./util/to-array":10}],2:[function(e,t,r){var n=e("./base")(),o=e("./markdown/browser"),i=e("./util/is-color-supported/browser"),s=e("./util/get-global")();n.prefixColors=["#F2777A","#F99157","#FFCC66","#99CC99","#66CCCC","#6699CC","#CC99CC"],n._setPrefixRegExps=function(){try{s.localStorage&&"string"==typeof s.localStorage.getItem("debug")&&(n._prefixRegExps=[],s.localStorage.getItem("debug").split(",").forEach(function(e){var t="enable";"-"===(e=e.trim())[0]&&(e=e.substr(1),t="disable");var r=n._prepareRegExpForPrefixSearch(e);n._prefixRegExps.push({type:t,regExp:r})}))}catch(e){}},n._getNextPrefixColor=function(){var e=0;return function(){return e+=1,n.prefixColors[e%n.prefixColors.length]}}(),n.prototype._getDecoratedPrefix=function(){var e=[];return i()?(e.push("%c"+this.opts.prefix+"%c "),e.push("color:"+this.opts.prefixColor+"; font-weight:bold;","")):e.push("["+this.opts.prefix+"] "),e},n.prototype._prepareOutput=function(e){var t,r=this._getDecoratedPrefix();return"string"==typeof e[0]?this.opts.markdown&&i()?(t=o.parse(e[0]),r[0]=r[0]+t.text,r=r.concat(t.styles)):r[0]=r[0]+e[0]:r.push(e[0]),e.length>1&&(r=r.concat(e.slice(1))),r},n._setPrefixRegExps(),t.exports=n},{"./base":1,"./markdown/browser":3,"./util/get-global":6,"./util/is-color-supported/browser":7}],3:[function(e,t,r){var n=e("./rules/browser"),o=e("./get-next-match");t.exports={parse:function(e){for(var t=[],r=o(e,n);r;)t.push(r.rule.style),t.push(""),e=e.replace(r.rule.regexp,r.rule.replacer),r=o(e,n);return{text:e,styles:t}}}},{"./get-next-match":4,"./rules/browser":5}],4:[function(e,t,r){t.exports=function(e,t){var r=[];return t.forEach(function(t){var n=e.match(t.regexp);n&&r.push({rule:t,match:n})}),0===r.length?null:(r.sort(function(e,t){return e.match.index-t.match.index}),r[0])}},{}],5:[function(e,t,r){t.exports=[{regexp:/\*([^*]+)\*/,replacer:function(e,t){return"%c"+t+"%c"},style:"font-weight:bold;"},{regexp:/_([^_]+)_/,replacer:function(e,t){return"%c"+t+"%c"},style:"font-style:italic;"},{regexp:/`([^`]+)`/,replacer:function(e,t){return"%c"+t+"%c"},style:"background-color:rgba(255,204,102, 0.1);color:#FFCC66;padding:2px 5px;border-radius:2px;"}]},{}],6:[function(e,t,r){(function(e){t.exports=function(){return"object"==typeof self&&self.self===self&&self||"object"==typeof e&&e.global===e&&e||this}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],7:[function(e,t,r){var n=e("../is-webkit"),o=e("../is-firefox");t.exports=function(){return n()||o()}},{"../is-firefox":8,"../is-webkit":9}],8:[function(e,t,r){t.exports=function(){try{return navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)}catch(e){return!1}}},{}],9:[function(e,t,r){t.exports=function(){try{return"WebkitAppearance"in document.documentElement.style}catch(e){return!1}}},{}],10:[function(e,t,r){t.exports=function(e){return Array.prototype.slice.call(e,0)}},{}]},{},[2])(2)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
const logdown = require('logdown')

const reduxLogdown = (name, opts = {}) => {
  const logger = logdown(name)
  let prevState = undefined

  return store => next => action => {
    prevState = store.getState()

    if (opts.diff && typeof console.groupCollapsed === 'function') {
      logger.groupCollapsed('**action** `' + action.type + '`')
    } else {
      logger.log('**action** `' + action.type + '`')
    }

    if (opts.diff && typeof console.groupCollapsed === 'function') {
      logger.log('**prev state**', prevState)
    }

    let result = next(action)

    if (opts.diff && typeof console.groupCollapsed === 'function') {
      logger.log('**next state**', store.getState())
      logger.groupEnd('**action** `' + action.type + '`')
    }

    return result
  }
}

module.exports = reduxLogdown

},{"logdown":1}]},{},[2]);
