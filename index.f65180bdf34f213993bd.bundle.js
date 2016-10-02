/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _vue = __webpack_require__(5);

	var _vue2 = _interopRequireDefault(_vue);

	var _Game = __webpack_require__(6);

	var _Game2 = _interopRequireDefault(_Game);

	var _store = __webpack_require__(73);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//the main entrance
	/* eslint-disable no-new */
	new _vue2.default({ el: '#application', components: { Game: _Game2.default }, store: _store2.default });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./main.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "* {\n    box-sizing: border-box;\n    padding: 0;\n    margin: 0;\n}\n\nhtml, body {\n    width: 100%;\n    height: 100%;\n}\n\nbody {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Vue.js v2.0.1
	 * (c) 2014-2016 Evan You
	 * Released under the MIT License.
	 */
	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Vue=t()}(this,function(){"use strict";function e(e){return null==e?"":"object"==typeof e?JSON.stringify(e,null,2):String(e)}function t(e){var t=parseFloat(e,10);return t||0===t?t:e}function n(e,t){for(var n=Object.create(null),r=e.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return t?function(e){return n[e.toLowerCase()]}:function(e){return n[e]}}function r(e,t){if(e.length){var n=e.indexOf(t);if(n>-1)return e.splice(n,1)}}function i(e,t){return hr.call(e,t)}function o(e){return"string"==typeof e||"number"==typeof e}function a(e){var t=Object.create(null);return function(n){var r=t[n];return r||(t[n]=e(n))}}function s(e,t){function n(n){var r=arguments.length;return r?r>1?e.apply(t,arguments):e.call(t,n):e.call(t)}return n._length=e.length,n}function c(e,t){t=t||0;for(var n=e.length-t,r=new Array(n);n--;)r[n]=e[n+t];return r}function u(e,t){for(var n in t)e[n]=t[n];return e}function l(e){return null!==e&&"object"==typeof e}function f(e){return $r.call(e)===wr}function d(e){for(var t={},n=0;n<e.length;n++)e[n]&&u(t,e[n]);return t}function p(){}function v(e){return e.reduce(function(e,t){return e.concat(t.staticKeys||[])},[]).join(",")}function h(e,t){return e==t||!(!l(e)||!l(t))&&JSON.stringify(e)===JSON.stringify(t)}function m(e,t){for(var n=0;n<e.length;n++)if(h(e[n],t))return n;return-1}function g(e){var t=(e+"").charCodeAt(0);return 36===t||95===t}function y(e,t,n,r){Object.defineProperty(e,t,{value:n,enumerable:!!r,writable:!0,configurable:!0})}function _(e){if(!kr.test(e)){var t=e.split(".");return function(e){for(var n=0;n<t.length;n++){if(!e)return;e=e[t[n]]}return e}}}function b(e){return/native code/.test(e.toString())}function $(e){Rr.target&&Ir.push(Rr.target),Rr.target=e}function w(){Rr.target=Ir.pop()}function C(){Fr.length=0,Br={},Hr=Ur=!1}function x(){for(Ur=!0,Fr.sort(function(e,t){return e.id-t.id}),zr=0;zr<Fr.length;zr++){var e=Fr[zr],t=e.id;Br[t]=null,e.run()}Nr&&xr.devtools&&Nr.emit("flush"),C()}function k(e){var t=e.id;if(null==Br[t]){if(Br[t]=!0,Ur){for(var n=Fr.length-1;n>=0&&Fr[n].id>e.id;)n--;Fr.splice(Math.max(n,zr)+1,0,e)}else Fr.push(e);Hr||(Hr=!0,Mr(x))}}function A(e,t){var n,r;t||(t=qr,t.clear());var i=Array.isArray(e),o=l(e);if((i||o)&&Object.isExtensible(e)){if(e.__ob__){var a=e.__ob__.dep.id;if(t.has(a))return;t.add(a)}if(i)for(n=e.length;n--;)A(e[n],t);else if(o)for(r=Object.keys(e),n=r.length;n--;)A(e[r[n]],t)}}function O(e,t){e.__proto__=t}function T(e,t,n){for(var r=0,i=n.length;r<i;r++){var o=n[r];y(e,o,t[o])}}function S(e){if(l(e)){var t;return i(e,"__ob__")&&e.__ob__ instanceof Yr?t=e.__ob__:Gr.shouldConvert&&!xr._isServer&&(Array.isArray(e)||f(e))&&Object.isExtensible(e)&&!e._isVue&&(t=new Yr(e)),t}}function E(e,t,n,r){var i=new Rr,o=Object.getOwnPropertyDescriptor(e,t);if(!o||o.configurable!==!1){var a=o&&o.get,s=o&&o.set,c=S(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=a?a.call(e):n;if(Rr.target&&(i.depend(),c&&c.dep.depend(),Array.isArray(t)))for(var r=void 0,o=0,s=t.length;o<s;o++)r=t[o],r&&r.__ob__&&r.__ob__.dep.depend();return t},set:function(t){var r=a?a.call(e):n;t!==r&&(s?s.call(e,t):n=t,c=S(t),i.notify())}})}}function j(e,t,n){if(Array.isArray(e))return e.splice(t,1,n),n;if(i(e,t))return void(e[t]=n);var r=e.__ob__;if(!(e._isVue||r&&r.vmCount))return r?(E(r.value,t,n),r.dep.notify(),n):void(e[t]=n)}function L(e,t){var n=e.__ob__;e._isVue||n&&n.vmCount||i(e,t)&&(delete e[t],n&&n.dep.notify())}function D(e){e._watchers=[],N(e),M(e),P(e),I(e),F(e)}function N(e){var t=e.$options.props;if(t){var n=e.$options.propsData||{},r=e.$options._propKeys=Object.keys(t),i=!e.$parent;Gr.shouldConvert=i;for(var o=function(i){var o=r[i];E(e,o,je(o,t,n,e))},a=0;a<r.length;a++)o(a);Gr.shouldConvert=!0}}function M(e){var t=e.$options.data;t=e._data="function"==typeof t?t.call(e):t||{},f(t)||(t={});for(var n=Object.keys(t),r=e.$options.props,o=n.length;o--;)r&&i(r,n[o])||U(e,n[o]);S(t),t.__ob__&&t.__ob__.vmCount++}function P(e){var t=e.$options.computed;if(t)for(var n in t){var r=t[n];"function"==typeof r?(Qr.get=R(r,e),Qr.set=p):(Qr.get=r.get?r.cache!==!1?R(r.get,e):s(r.get,e):p,Qr.set=r.set?s(r.set,e):p),Object.defineProperty(e,n,Qr)}}function R(e,t){var n=new Jr(t,e,p,{lazy:!0});return function(){return n.dirty&&n.evaluate(),Rr.target&&n.depend(),n.value}}function I(e){var t=e.$options.methods;if(t)for(var n in t)null!=t[n]&&(e[n]=s(t[n],e))}function F(e){var t=e.$options.watch;if(t)for(var n in t){var r=t[n];if(Array.isArray(r))for(var i=0;i<r.length;i++)B(e,n,r[i]);else B(e,n,r)}}function B(e,t,n){var r;f(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=e[n]),e.$watch(t,n,r)}function H(e){var t={};t.get=function(){return this._data},Object.defineProperty(e.prototype,"$data",t),e.prototype.$set=j,e.prototype.$delete=L,e.prototype.$watch=function(e,t,n){var r=this;n=n||{},n.user=!0;var i=new Jr(r,e,t,n);return n.immediate&&t.call(r,i.value),function(){i.teardown()}}}function U(e,t){g(t)||Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){return e._data[t]},set:function(n){e._data[t]=n}})}function z(e){var t=new Xr(e.tag,e.data,e.children,e.text,e.elm,e.ns,e.context,e.componentOptions);return t.isStatic=e.isStatic,t.key=e.key,t.isCloned=!0,t}function V(e){for(var t=new Array(e.length),n=0;n<e.length;n++)t[n]=z(e[n]);return t}function J(e,t,n){if(o(e))return[q(e)];if(Array.isArray(e)){for(var r=[],i=0,a=e.length;i<a;i++){var s=e[i],c=r[r.length-1];Array.isArray(s)?r.push.apply(r,J(s,t,i)):o(s)?c&&c.text?c.text+=String(s):""!==s&&r.push(q(s)):s instanceof Xr&&(s.text&&c&&c.text?c.text+=s.text:(t&&K(s,t),s.tag&&null==s.key&&null!=n&&(s.key="__vlist_"+n+"_"+i+"__"),r.push(s)))}return r}}function q(e){return new Xr(void 0,void 0,void 0,String(e))}function K(e,t){if(e.tag&&!e.ns&&(e.ns=t,e.children))for(var n=0,r=e.children.length;n<r;n++)K(e.children[n],t)}function W(e){return e&&e.filter(function(e){return e&&e.componentOptions})[0]}function Z(e,t,n){var r=e[t];if(r){var i=e.__injected||(e.__injected={});i[t]||(i[t]=!0,e[t]=function(){r.apply(this,arguments),n.apply(this,arguments)})}else e[t]=n}function G(e,t,n,r){var i,o,a,s,c,u;for(i in e)if(o=e[i],a=t[i],o)if(a){if(o!==a)if(Array.isArray(a)){a.length=o.length;for(var l=0;l<a.length;l++)a[l]=o[l];e[i]=a}else a.fn=o,e[i]=a}else u="!"===i.charAt(0),c=u?i.slice(1):i,Array.isArray(o)?n(c,o.invoker=Y(o),u):(o.invoker||(s=o,o=e[i]={},o.fn=s,o.invoker=Q(o)),n(c,o.invoker,u));else;for(i in t)e[i]||(c="!"===i.charAt(0)?i.slice(1):i,r(c,t[i].invoker))}function Y(e){return function(t){for(var n=arguments,r=1===arguments.length,i=0;i<e.length;i++)r?e[i](t):e[i].apply(null,n)}}function Q(e){return function(t){var n=1===arguments.length;n?e.fn(t):e.fn.apply(null,arguments)}}function X(e){var t=e.$options,n=t.parent;if(n&&!t.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(e)}e.$parent=n,e.$root=n?n.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}function ee(e){e.prototype._mount=function(e,t){var n=this;return n.$el=e,n.$options.render||(n.$options.render=ei),te(n,"beforeMount"),n._watcher=new Jr(n,function(){n._update(n._render(),t)},p),t=!1,n.$root===n&&(n._isMounted=!0,te(n,"mounted")),n},e.prototype._update=function(e,t){var n=this;n._isMounted&&te(n,"beforeUpdate");var r=n.$el,i=ti;ti=n;var o=n._vnode;n._vnode=e,o?n.$el=n.__patch__(o,e):n.$el=n.__patch__(n.$el,e,t),ti=i,r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el),n._isMounted&&te(n,"updated")},e.prototype._updateFromParent=function(e,t,n,r){var i=this,o=!(!i.$options._renderChildren&&!r);if(i.$options._parentVnode=n,i.$options._renderChildren=r,e&&i.$options.props){Gr.shouldConvert=!1;for(var a=i.$options._propKeys||[],s=0;s<a.length;s++){var c=a[s];i[c]=je(c,i.$options.props,e,i)}Gr.shouldConvert=!0}if(t){var u=i.$options._parentListeners;i.$options._parentListeners=t,i._updateListeners(t,u)}o&&(i.$slots=ye(r,i._renderContext),i.$forceUpdate())},e.prototype.$forceUpdate=function(){var e=this;e._watcher&&e._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){te(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||r(t.$children,e),e._watcher&&e._watcher.teardown();for(var n=e._watchers.length;n--;)e._watchers[n].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,te(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null)}}}function te(e,t){var n=e.$options[t];if(n)for(var r=0,i=n.length;r<i;r++)n[r].call(e);e.$emit("hook:"+t)}function ne(e,t,n,r,i){if(e&&(l(e)&&(e=we.extend(e)),"function"==typeof e)){if(!e.cid)if(e.resolved)e=e.resolved;else if(e=ue(e,function(){n.$forceUpdate()}),!e)return;t=t||{};var o=le(t,e);if(e.options.functional)return re(e,o,t,n,r);var a=t.on;t.on=t.nativeOn,e.options.abstract&&(t={}),de(t);var s=e.options.name||i,c=new Xr("vue-component-"+e.cid+(s?"-"+s:""),t,void 0,void 0,void 0,void 0,n,{Ctor:e,propsData:o,listeners:a,tag:i,children:r});return c}}function re(e,t,n,r,i){var o={},a=e.options.props;if(a)for(var c in a)o[c]=je(c,a,t);return e.options.render.call(null,s(ve,{_self:Object.create(r)}),{props:o,data:n,parent:r,children:J(i),slots:function(){return ye(i,r)}})}function ie(e,t){var n=e.componentOptions,r={_isComponent:!0,parent:t,propsData:n.propsData,_componentTag:n.tag,_parentVnode:e,_parentListeners:n.listeners,_renderChildren:n.children},i=e.data.inlineTemplate;return i&&(r.render=i.render,r.staticRenderFns=i.staticRenderFns),new n.Ctor(r)}function oe(e,t){if(!e.child||e.child._isDestroyed){var n=e.child=ie(e,ti);n.$mount(t?e.elm:void 0,t)}}function ae(e,t){var n=t.componentOptions,r=t.child=e.child;r._updateFromParent(n.propsData,n.listeners,t,n.children)}function se(e){e.child._isMounted||(e.child._isMounted=!0,te(e.child,"mounted")),e.data.keepAlive&&(e.child._inactive=!1,te(e.child,"activated"))}function ce(e){e.child._isDestroyed||(e.data.keepAlive?(e.child._inactive=!0,te(e.child,"deactivated")):e.child.$destroy())}function ue(e,t){if(!e.requested){e.requested=!0;var n=e.pendingCallbacks=[t],r=!0,i=function(t){if(l(t)&&(t=we.extend(t)),e.resolved=t,!r)for(var i=0,o=n.length;i<o;i++)n[i](t)},o=function(e){},a=e(i,o);return a&&"function"==typeof a.then&&!e.resolved&&a.then(i,o),r=!1,e.resolved}e.pendingCallbacks.push(t)}function le(e,t){var n=t.options.props;if(n){var r={},i=e.attrs,o=e.props,a=e.domProps;if(i||o||a)for(var s in n){var c=br(s);fe(r,o,s,c,!0)||fe(r,i,s,c)||fe(r,a,s,c)}return r}}function fe(e,t,n,r,o){if(t){if(i(t,n))return e[n]=t[n],o||delete t[n],!0;if(i(t,r))return e[n]=t[r],o||delete t[r],!0}return!1}function de(e){e.hook||(e.hook={});for(var t=0;t<ri.length;t++){var n=ri[t],r=e.hook[n],i=ni[n];e.hook[n]=r?pe(i,r):i}}function pe(e,t){return function(n,r){e(n,r),t(n,r)}}function ve(e,t,n){return t&&(Array.isArray(t)||"object"!=typeof t)&&(n=t,t=void 0),he(this._self,e,t,n)}function he(e,t,n,r){if(!n||!n.__ob__){if(!t)return ei();if("string"==typeof t){var i,o=xr.getTagNamespace(t);return xr.isReservedTag(t)?new Xr(t,n,J(r,o),void 0,void 0,o,e):(i=Ee(e.$options,"components",t))?ne(i,n,e,r,t):new Xr(t,n,J(r,o),void 0,void 0,o,e)}return ne(t,n,e,r)}}function me(e){e.$vnode=null,e._vnode=null,e._staticTrees=null,e._renderContext=e.$options._parentVnode&&e.$options._parentVnode.context,e.$slots=ye(e.$options._renderChildren,e._renderContext),e.$createElement=s(ve,e),e.$options.el&&e.$mount(e.$options.el)}function ge(n){n.prototype.$nextTick=function(e){Mr(e,this)},n.prototype._render=function(){var e=this,t=e.$options,n=t.render,r=t.staticRenderFns,i=t._parentVnode;if(e._isMounted)for(var o in e.$slots)e.$slots[o]=V(e.$slots[o]);r&&!e._staticTrees&&(e._staticTrees=[]),e.$vnode=i;var a;try{a=n.call(e._renderProxy,e.$createElement)}catch(t){if(xr.errorHandler)xr.errorHandler.call(null,t,e);else{if(xr._isServer)throw t;setTimeout(function(){throw t},0)}a=e._vnode}return a instanceof Xr||(a=ei()),a.parent=i,a},n.prototype._h=ve,n.prototype._s=e,n.prototype._n=t,n.prototype._e=ei,n.prototype._q=h,n.prototype._i=m,n.prototype._m=function(e,t){var n=this._staticTrees[e];if(n&&!t)return Array.isArray(n)?V(n):z(n);if(n=this._staticTrees[e]=this.$options.staticRenderFns[e].call(this._renderProxy),Array.isArray(n))for(var r=0;r<n.length;r++)n[r].isStatic=!0,n[r].key="__static__"+e+"_"+r;else n.isStatic=!0,n.key="__static__"+e;return n};var r=function(e){return e};n.prototype._f=function(e){return Ee(this.$options,"filters",e,!0)||r},n.prototype._l=function(e,t){var n,r,i,o,a;if(Array.isArray(e))for(n=new Array(e.length),r=0,i=e.length;r<i;r++)n[r]=t(e[r],r);else if("number"==typeof e)for(n=new Array(e),r=0;r<e;r++)n[r]=t(r+1,r);else if(l(e))for(o=Object.keys(e),n=new Array(o.length),r=0,i=o.length;r<i;r++)a=o[r],n[r]=t(e[a],a,r);return n},n.prototype._t=function(e,t){var n=this.$slots[e];return n||t},n.prototype._b=function(e,t,n){if(t)if(l(t)){Array.isArray(t)&&(t=d(t));for(var r in t)if("class"===r||"style"===r)e[r]=t[r];else{var i=n||xr.mustUseProp(r)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={});i[r]=t[r]}}else;return e},n.prototype._k=function(e){return xr.keyCodes[e]}}function ye(e,t){var n={};if(!e)return n;for(var r,i,o=J(e)||[],a=[],s=0,c=o.length;s<c;s++)if(i=o[s],i.context===t&&i.data&&(r=i.data.slot)){var u=n[r]||(n[r]=[]);"template"===i.tag?u.push.apply(u,i.children):u.push(i)}else a.push(i);return a.length&&(1!==a.length||" "!==a[0].text&&!a[0].isComment)&&(n.default=a),n}function _e(e){e._events=Object.create(null);var t=e.$options._parentListeners,n=s(e.$on,e),r=s(e.$off,e);e._updateListeners=function(e,t){G(e,t||{},n,r)},t&&e._updateListeners(t)}function be(e){e.prototype.$on=function(e,t){var n=this;return(n._events[e]||(n._events[e]=[])).push(t),n},e.prototype.$once=function(e,t){function n(){r.$off(e,n),t.apply(r,arguments)}var r=this;return n.fn=t,r.$on(e,n),r},e.prototype.$off=function(e,t){var n=this;if(!arguments.length)return n._events=Object.create(null),n;var r=n._events[e];if(!r)return n;if(1===arguments.length)return n._events[e]=null,n;for(var i,o=r.length;o--;)if(i=r[o],i===t||i.fn===t){r.splice(o,1);break}return n},e.prototype.$emit=function(e){var t=this,n=t._events[e];if(n){n=n.length>1?c(n):n;for(var r=c(arguments,1),i=0,o=n.length;i<o;i++)n[i].apply(t,r)}return t}}function $e(e){function t(e,t){var r=e.$options=Object.create(n(e));r.parent=t.parent,r.propsData=t.propsData,r._parentVnode=t._parentVnode,r._parentListeners=t._parentListeners,r._renderChildren=t._renderChildren,r._componentTag=t._componentTag,t.render&&(r.render=t.render,r.staticRenderFns=t.staticRenderFns)}function n(e){var t=e.constructor,n=t.options;if(t.super){var r=t.super.options,i=t.superOptions;r!==i&&(t.superOptions=r,n=t.options=Se(r,t.extendOptions),n.name&&(n.components[n.name]=t))}return n}e.prototype._init=function(e){var r=this;r._uid=ii++,r._isVue=!0,e&&e._isComponent?t(r,e):r.$options=Se(n(r),e||{},r),r._renderProxy=r,r._self=r,X(r),_e(r),te(r,"beforeCreate"),D(r),te(r,"created"),me(r)}}function we(e){this._init(e)}function Ce(e,t){var n,r,o;for(n in t)r=e[n],o=t[n],i(e,n)?l(r)&&l(o)&&Ce(r,o):j(e,n,o);return e}function xe(e,t){return t?e?e.concat(t):Array.isArray(t)?t:[t]:e}function ke(e,t){var n=Object.create(e||null);return t?u(n,t):n}function Ae(e){if(e.components){var t,n=e.components;for(var r in n){var i=r.toLowerCase();vr(i)||xr.isReservedTag(i)||(t=n[r],f(t)&&(n[r]=we.extend(t)))}}}function Oe(e){var t=e.props;if(t){var n,r,i,o={};if(Array.isArray(t))for(n=t.length;n--;)r=t[n],"string"==typeof r&&(i=gr(r),o[i]={type:null});else if(f(t))for(var a in t)r=t[a],i=gr(a),o[i]=f(r)?r:{type:r};e.props=o}}function Te(e){var t=e.directives;if(t)for(var n in t){var r=t[n];"function"==typeof r&&(t[n]={bind:r,update:r})}}function Se(e,t,n){function r(r){var i=si[r]||ci;l[r]=i(e[r],t[r],n,r)}Ae(t),Oe(t),Te(t);var o=t.extends;if(o&&(e="function"==typeof o?Se(e,o.options,n):Se(e,o,n)),t.mixins)for(var a=0,s=t.mixins.length;a<s;a++){var c=t.mixins[a];c.prototype instanceof we&&(c=c.options),e=Se(e,c,n)}var u,l={};for(u in e)r(u);for(u in t)i(e,u)||r(u);return l}function Ee(e,t,n,r){if("string"==typeof n){var i=e[t],o=i[n]||i[gr(n)]||i[yr(gr(n))];return o}}function je(e,t,n,r){var o=t[e],a=!i(n,e),s=n[e];if("Boolean"===De(o.type)&&(a&&!i(o,"default")?s=!1:""!==s&&s!==br(e)||(s=!0)),void 0===s){s=Le(r,o,e);var c=Gr.shouldConvert;Gr.shouldConvert=!0,S(s),Gr.shouldConvert=c}return s}function Le(e,t,n){if(i(t,"default")){var r=t.default;return l(r),"function"==typeof r&&t.type!==Function?r.call(e):r}}function De(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t&&t[1]}function Ne(e){e.use=function(e){if(!e.installed){var t=c(arguments,1);return t.unshift(this),"function"==typeof e.install?e.install.apply(e,t):e.apply(null,t),e.installed=!0,this}}}function Me(e){e.mixin=function(t){e.options=Se(e.options,t)}}function Pe(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var n=this,r=0===n.cid;if(r&&e._Ctor)return e._Ctor;var i=e.name||n.options.name,o=function(e){this._init(e)};return o.prototype=Object.create(n.prototype),o.prototype.constructor=o,o.cid=t++,o.options=Se(n.options,e),o.super=n,o.extend=n.extend,xr._assetTypes.forEach(function(e){o[e]=n[e]}),i&&(o.options.components[i]=o),o.superOptions=n.options,o.extendOptions=e,r&&(e._Ctor=o),o}}function Re(e){xr._assetTypes.forEach(function(t){e[t]=function(n,r){return r?("component"===t&&f(r)&&(r.name=r.name||n,r=e.extend(r)),"directive"===t&&"function"==typeof r&&(r={bind:r,update:r}),this.options[t+"s"][n]=r,r):this.options[t+"s"][n]}})}function Ie(e){var t={};t.get=function(){return xr},Object.defineProperty(e,"config",t),e.util=ui,e.set=j,e.delete=L,e.nextTick=Mr,e.options=Object.create(null),xr._assetTypes.forEach(function(t){e.options[t+"s"]=Object.create(null)}),u(e.options.components,fi),Ne(e),Me(e),Pe(e),Re(e)}function Fe(e){for(var t=e.data,n=e,r=e;r.child;)r=r.child._vnode,r.data&&(t=Be(r.data,t));for(;n=n.parent;)n.data&&(t=Be(t,n.data));return He(t)}function Be(e,t){return{staticClass:Ue(e.staticClass,t.staticClass),class:e.class?[e.class,t.class]:t.class}}function He(e){var t=e.class,n=e.staticClass;return n||t?Ue(n,ze(t)):""}function Ue(e,t){return e?t?e+" "+t:e:t||""}function ze(e){var t="";if(!e)return t;if("string"==typeof e)return e;if(Array.isArray(e)){for(var n,r=0,i=e.length;r<i;r++)e[r]&&(n=ze(e[r]))&&(t+=n+" ");return t.slice(0,-1)}if(l(e)){for(var o in e)e[o]&&(t+=o+" ");return t.slice(0,-1)}return t}function Ve(e){return ki(e)?"svg":"math"===e?"math":void 0}function Je(e){if(!Or)return!0;if(Oi(e))return!1;if(e=e.toLowerCase(),null!=Ti[e])return Ti[e];var t=document.createElement(e);return e.indexOf("-")>-1?Ti[e]=t.constructor===window.HTMLUnknownElement||t.constructor===window.HTMLElement:Ti[e]=/HTMLUnknownElement/.test(t.toString())}function qe(e){if("string"==typeof e){if(e=document.querySelector(e),!e)return document.createElement("div")}return e}function Ke(e){return document.createElement(e)}function We(e,t){return document.createElementNS(bi[e],t)}function Ze(e){return document.createTextNode(e)}function Ge(e){return document.createComment(e)}function Ye(e,t,n){e.insertBefore(t,n)}function Qe(e,t){e.removeChild(t)}function Xe(e,t){e.appendChild(t)}function et(e){return e.parentNode}function tt(e){return e.nextSibling}function nt(e){return e.tagName}function rt(e,t){e.textContent=t}function it(e){return e.childNodes}function ot(e,t,n){e.setAttribute(t,n)}function at(e,t){var n=e.data.ref;if(n){var i=e.context,o=e.child||e.elm,a=i.$refs;t?Array.isArray(a[n])?r(a[n],o):a[n]===o&&(a[n]=void 0):e.data.refInFor?Array.isArray(a[n])?a[n].push(o):a[n]=[o]:a[n]=o}}function st(e){return null==e}function ct(e){return null!=e}function ut(e,t){return e.key===t.key&&e.tag===t.tag&&e.isComment===t.isComment&&!e.data==!t.data}function lt(e,t,n){var r,i,o={};for(r=t;r<=n;++r)i=e[r].key,ct(i)&&(o[i]=r);return o}function ft(e){function t(e){return new Xr(C.tagName(e).toLowerCase(),{},[],void 0,e)}function n(e,t){function n(){0===--n.listeners&&r(e)}return n.listeners=t,n}function r(e){var t=C.parentNode(e);C.removeChild(t,e)}function i(e,t,n){var r,i=e.data;if(e.isRootInsert=!n,ct(i)&&(ct(r=i.hook)&&ct(r=r.init)&&r(e),ct(r=e.child)))return u(e,t),e.elm;var o=e.children,s=e.tag;return ct(s)?(e.elm=e.ns?C.createElementNS(e.ns,s):C.createElement(s),l(e),a(e,o,t),ct(i)&&c(e,t)):e.isComment?e.elm=C.createComment(e.text):e.elm=C.createTextNode(e.text),e.elm}function a(e,t,n){if(Array.isArray(t))for(var r=0;r<t.length;++r)C.appendChild(e.elm,i(t[r],n,!0));else o(e.text)&&C.appendChild(e.elm,C.createTextNode(e.text))}function s(e){for(;e.child;)e=e.child._vnode;return ct(e.tag)}function c(e,t){for(var n=0;n<$.create.length;++n)$.create[n](Li,e);_=e.data.hook,ct(_)&&(_.create&&_.create(Li,e),_.insert&&t.push(e))}function u(e,t){e.data.pendingInsert&&t.push.apply(t,e.data.pendingInsert),e.elm=e.child.$el,s(e)?(c(e,t),l(e)):(at(e),t.push(e))}function l(e){var t;ct(t=e.context)&&ct(t=t.$options._scopeId)&&C.setAttribute(e.elm,t,""),ct(t=ti)&&t!==e.context&&ct(t=t.$options._scopeId)&&C.setAttribute(e.elm,t,"")}function f(e,t,n,r,o,a){for(;r<=o;++r)C.insertBefore(e,i(n[r],a),t)}function d(e){var t,n,r=e.data;if(ct(r))for(ct(t=r.hook)&&ct(t=t.destroy)&&t(e),t=0;t<$.destroy.length;++t)$.destroy[t](e);if(ct(t=e.child)&&!r.keepAlive&&d(t._vnode),ct(t=e.children))for(n=0;n<e.children.length;++n)d(e.children[n])}function p(e,t,n,r){for(;n<=r;++n){var i=t[n];ct(i)&&(ct(i.tag)?(v(i),d(i)):C.removeChild(e,i.elm))}}function v(e,t){if(t||ct(e.data)){var i=$.remove.length+1;for(t?t.listeners+=i:t=n(e.elm,i),ct(_=e.child)&&ct(_=_._vnode)&&ct(_.data)&&v(_,t),_=0;_<$.remove.length;++_)$.remove[_](e,t);ct(_=e.data.hook)&&ct(_=_.remove)?_(e,t):t()}else r(e.elm)}function h(e,t,n,r,o){for(var a,s,c,u,l=0,d=0,v=t.length-1,h=t[0],g=t[v],y=n.length-1,_=n[0],b=n[y],$=!o;l<=v&&d<=y;)st(h)?h=t[++l]:st(g)?g=t[--v]:ut(h,_)?(m(h,_,r),h=t[++l],_=n[++d]):ut(g,b)?(m(g,b,r),g=t[--v],b=n[--y]):ut(h,b)?(m(h,b,r),$&&C.insertBefore(e,h.elm,C.nextSibling(g.elm)),h=t[++l],b=n[--y]):ut(g,_)?(m(g,_,r),$&&C.insertBefore(e,g.elm,h.elm),g=t[--v],_=n[++d]):(st(a)&&(a=lt(t,l,v)),s=ct(_.key)?a[_.key]:null,st(s)?(C.insertBefore(e,i(_,r),h.elm),_=n[++d]):(c=t[s],c.tag!==_.tag?(C.insertBefore(e,i(_,r),h.elm),_=n[++d]):(m(c,_,r),t[s]=void 0,$&&C.insertBefore(e,_.elm,h.elm),_=n[++d])));l>v?(u=st(n[y+1])?null:n[y+1].elm,f(e,u,n,d,y,r)):d>y&&p(e,t,l,v)}function m(e,t,n,r){if(e!==t){if(t.isStatic&&e.isStatic&&t.key===e.key&&t.isCloned)return void(t.elm=e.elm);var i,o,a=ct(i=t.data);a&&ct(o=i.hook)&&ct(i=o.prepatch)&&i(e,t);var c=t.elm=e.elm,u=e.children,l=t.children;if(a&&s(t)){for(i=0;i<$.update.length;++i)$.update[i](e,t);ct(o)&&ct(i=o.update)&&i(e,t)}if(st(t.text)?ct(u)&&ct(l)?u!==l&&h(c,u,l,n,r):ct(l)?(ct(e.text)&&C.setTextContent(c,""),f(c,null,l,0,l.length-1,n)):ct(u)?p(c,u,0,u.length-1):ct(e.text)&&C.setTextContent(c,""):e.text!==t.text&&C.setTextContent(c,t.text),a){for(i=0;i<$.postpatch.length;++i)$.postpatch[i](e,t);ct(o)&&ct(i=o.postpatch)&&i(e,t)}}}function g(e,t,n){if(n&&e.parent)e.parent.data.pendingInsert=t;else for(var r=0;r<t.length;++r)t[r].data.hook.insert(t[r])}function y(e,t,n){t.elm=e;var r=t.tag,i=t.data,o=t.children;if(ct(i)&&(ct(_=i.hook)&&ct(_=_.init)&&_(t,!0),ct(_=t.child)))return u(t,n),!0;if(ct(r)){if(ct(o)){var s=C.childNodes(e);if(s.length){var l=!0;if(s.length!==o.length)l=!1;else for(var f=0;f<o.length;f++)if(!y(s[f],o[f],n)){l=!1;break}if(!l)return!1}else a(t,o,n)}ct(i)&&c(t,n)}return!0}var _,b,$={},w=e.modules,C=e.nodeOps;for(_=0;_<Di.length;++_)for($[Di[_]]=[],b=0;b<w.length;++b)void 0!==w[b][Di[_]]&&$[Di[_]].push(w[b][Di[_]]);return function(e,n,r,o){var a,c,u=!1,l=[];if(e){var f=ct(e.nodeType);if(!f&&ut(e,n))m(e,n,l,o);else{if(f){if(1===e.nodeType&&e.hasAttribute("server-rendered")&&(e.removeAttribute("server-rendered"),r=!0),r&&y(e,n,l))return g(n,l,!0),e;e=t(e)}if(a=e.elm,c=C.parentNode(a),i(n,l),n.parent&&(n.parent.elm=n.elm,s(n)))for(var v=0;v<$.create.length;++v)$.create[v](Li,n.parent);null!==c?(C.insertBefore(c,n.elm,C.nextSibling(a)),p(c,[e],0,0)):ct(e.tag)&&d(e)}}else u=!0,i(n,l);return g(n,l,u),n.elm}}function dt(e,t,n){var r=t.data.directives;if(r)for(var i=0;i<r.length;i++){var o=r[i],a=Ee(t.context.$options,"directives",o.name,!0);if(a){var s=e&&e.data.directives;s&&(o.oldValue=s[i].value),o.modifiers||(o.modifiers=Mi),n(a,o)}}}function pt(e,t,n){dt(e,t,function(r,i){vt(r,i,n,t,e)})}function vt(e,t,n,r,i){var o=e&&e[n];o&&o(r.elm,t,r,i)}function ht(e,t){if(e.data.attrs||t.data.attrs){var n,r,i,o=t.elm,a=e.data.attrs||{},s=t.data.attrs||{};s.__ob__&&(s=t.data.attrs=u({},s));for(n in s)r=s[n],i=a[n],i!==r&&mt(o,n,r);for(n in a)null==s[n]&&(gi(n)?o.removeAttributeNS(mi,yi(n)):vi(n)||o.removeAttribute(n))}}function mt(e,t,n){hi(t)?_i(n)?e.removeAttribute(t):e.setAttribute(t,t):vi(t)?e.setAttribute(t,_i(n)||"false"===n?"false":"true"):gi(t)?_i(n)?e.removeAttributeNS(mi,yi(t)):e.setAttributeNS(mi,t,n):_i(n)?e.removeAttribute(t):e.setAttribute(t,n)}function gt(e,t){var n=t.elm,r=t.data,i=e.data;if(r.staticClass||r.class||i&&(i.staticClass||i.class)){var o=Fe(t),a=n._transitionClasses;a&&(o=Ue(o,ze(a))),o!==n._prevClass&&(n.setAttribute("class",o),n._prevClass=o)}}function yt(e,t){if(e.data.on||t.data.on){var n=t.data.on||{},r=e.data.on||{},i=t.elm._v_add||(t.elm._v_add=function(e,n,r){t.elm.addEventListener(e,n,r)}),o=t.elm._v_remove||(t.elm._v_remove=function(e,n){t.elm.removeEventListener(e,n)});G(n,r,i,o)}}function _t(e,t){if(e.data.domProps||t.data.domProps){var n,r,i=t.elm,o=e.data.domProps||{},a=t.data.domProps||{};a.__ob__&&(a=t.data.domProps=u({},a));for(n in o)null==a[n]&&(i[n]=void 0);for(n in a)if("textContent"!==n&&"innerHTML"!==n||!t.children||(t.children.length=0),r=a[n],"value"===n){i._value=r;var s=null==r?"":String(r);i.value!==s&&(i.value=s)}else i[n]=r}}function bt(e,t){if(e.data&&e.data.style||t.data.style){var n,r,i=t.elm,o=e.data.style||{},a=t.data.style||{};if("string"==typeof a)return void(i.style.cssText=a);var s=a.__ob__;Array.isArray(a)&&(a=t.data.style=d(a)),s&&(a=t.data.style=u({},a));for(r in o)a[r]||(i.style[Ui(r)]="");for(r in a)n=a[r],n!==o[r]&&(i.style[Ui(r)]=null==n?"":n)}}function $t(e,t){if(e.classList)t.indexOf(" ")>-1?t.split(/\s+/).forEach(function(t){return e.classList.add(t)}):e.classList.add(t);else{var n=" "+e.getAttribute("class")+" ";n.indexOf(" "+t+" ")<0&&e.setAttribute("class",(n+t).trim())}}function wt(e,t){if(e.classList)t.indexOf(" ")>-1?t.split(/\s+/).forEach(function(t){return e.classList.remove(t)}):e.classList.remove(t);else{for(var n=" "+e.getAttribute("class")+" ",r=" "+t+" ";n.indexOf(r)>=0;)n=n.replace(r," ");e.setAttribute("class",n.trim())}}function Ct(e){Yi(function(){Yi(e)})}function xt(e,t){(e._transitionClasses||(e._transitionClasses=[])).push(t),$t(e,t)}function kt(e,t){e._transitionClasses&&r(e._transitionClasses,t),wt(e,t)}function At(e,t,n){var r=Ot(e,t),i=r.type,o=r.timeout,a=r.propCount;if(!i)return n();var s=i===Ji?Wi:Gi,c=0,u=function(){e.removeEventListener(s,l),n()},l=function(t){t.target===e&&++c>=a&&u()};setTimeout(function(){c<a&&u()},o+1),e.addEventListener(s,l)}function Ot(e,t){var n,r=window.getComputedStyle(e),i=r[Ki+"Delay"].split(", "),o=r[Ki+"Duration"].split(", "),a=Tt(i,o),s=r[Zi+"Delay"].split(", "),c=r[Zi+"Duration"].split(", "),u=Tt(s,c),l=0,f=0;t===Ji?a>0&&(n=Ji,l=a,f=o.length):t===qi?u>0&&(n=qi,l=u,f=c.length):(l=Math.max(a,u),n=l>0?a>u?Ji:qi:null,f=n?n===Ji?o.length:c.length:0);var d=n===Ji&&Qi.test(r[Ki+"Property"]);return{type:n,timeout:l,propCount:f,hasTransform:d}}function Tt(e,t){return Math.max.apply(null,t.map(function(t,n){return St(t)+St(e[n])}))}function St(e){return 1e3*Number(e.slice(0,-1))}function Et(e){var t=e.elm;t._leaveCb&&(t._leaveCb.cancelled=!0,t._leaveCb());var n=Lt(e.data.transition);if(n&&!t._enterCb&&1===t.nodeType){var r=n.css,i=n.type,o=n.enterClass,a=n.enterActiveClass,s=n.appearClass,c=n.appearActiveClass,u=n.beforeEnter,l=n.enter,f=n.afterEnter,d=n.enterCancelled,p=n.beforeAppear,v=n.appear,h=n.afterAppear,m=n.appearCancelled,g=ti.$vnode,y=g&&g.parent?g.parent.context:ti,_=!y._isMounted||!e.isRootInsert;if(!_||v||""===v){var b=_?s:o,$=_?c:a,w=_?p||u:u,C=_&&"function"==typeof v?v:l,x=_?h||f:f,k=_?m||d:d,A=r!==!1&&!Er,O=C&&(C._length||C.length)>1,T=t._enterCb=Dt(function(){A&&kt(t,$),T.cancelled?(A&&kt(t,b),k&&k(t)):x&&x(t),t._enterCb=null});e.data.show||Z(e.data.hook||(e.data.hook={}),"insert",function(){var n=t.parentNode,r=n&&n._pending&&n._pending[e.key];r&&r.tag===e.tag&&r.elm._leaveCb&&r.elm._leaveCb(),C&&C(t,T)}),w&&w(t),A&&(xt(t,b),xt(t,$),Ct(function(){kt(t,b),T.cancelled||O||At(t,i,T)})),e.data.show&&C&&C(t,T),A||O||T()}}}function jt(e,t){function n(){m.cancelled||(e.data.show||((r.parentNode._pending||(r.parentNode._pending={}))[e.key]=e),u&&u(r),v&&(xt(r,s),xt(r,c),Ct(function(){kt(r,s),m.cancelled||h||At(r,a,m)})),l&&l(r,m),v||h||m())}var r=e.elm;r._enterCb&&(r._enterCb.cancelled=!0,r._enterCb());var i=Lt(e.data.transition);if(!i)return t();if(!r._leaveCb&&1===r.nodeType){var o=i.css,a=i.type,s=i.leaveClass,c=i.leaveActiveClass,u=i.beforeLeave,l=i.leave,f=i.afterLeave,d=i.leaveCancelled,p=i.delayLeave,v=o!==!1&&!Er,h=l&&(l._length||l.length)>1,m=r._leaveCb=Dt(function(){r.parentNode&&r.parentNode._pending&&(r.parentNode._pending[e.key]=null),v&&kt(r,c),m.cancelled?(v&&kt(r,s),d&&d(r)):(t(),f&&f(r)),r._leaveCb=null});p?p(n):n()}}function Lt(e){if(e){if("object"==typeof e){var t={};return e.css!==!1&&u(t,Xi(e.name||"v")),u(t,e),t}return"string"==typeof e?Xi(e):void 0}}function Dt(e){var t=!1;return function(){t||(t=!0,e())}}function Nt(e,t,n){var r=t.value,i=e.multiple;if(!i||Array.isArray(r)){for(var o,a,s=0,c=e.options.length;s<c;s++)if(a=e.options[s],i)o=m(r,Pt(a))>-1,a.selected!==o&&(a.selected=o);else if(h(Pt(a),r))return void(e.selectedIndex!==s&&(e.selectedIndex=s));i||(e.selectedIndex=-1)}}function Mt(e,t){for(var n=0,r=t.length;n<r;n++)if(h(Pt(t[n]),e))return!1;return!0}function Pt(e){return"_value"in e?e._value:e.value}function Rt(e){e.target.composing=!0}function It(e){e.target.composing=!1,Ft(e.target,"input")}function Ft(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}function Bt(e){return!e.child||e.data&&e.data.transition?e:Bt(e.child._vnode)}function Ht(e){var t=e&&e.componentOptions;return t&&t.Ctor.options.abstract?Ht(W(t.children)):e}function Ut(e){var t={},n=e.$options;for(var r in n.propsData)t[r]=e[r];var i=n._parentListeners;for(var o in i)t[gr(o)]=i[o].fn;return t}function zt(e,t){return/\d-keep-alive$/.test(t.tag)?e("keep-alive"):null}function Vt(e){for(;e=e.parent;)if(e.data.transition)return!0}function Jt(e){e.elm._moveCb&&e.elm._moveCb(),e.elm._enterCb&&e.elm._enterCb()}function qt(e){e.data.newPos=e.elm.getBoundingClientRect()}function Kt(e){var t=e.data.pos,n=e.data.newPos,r=t.left-n.left,i=t.top-n.top;if(r||i){e.data.moved=!0;var o=e.elm.style;o.transform=o.WebkitTransform="translate("+r+"px,"+i+"px)",o.transitionDuration="0s"}}function Wt(e,t){var n=document.createElement("div");return n.innerHTML='<div a="'+e+'">',n.innerHTML.indexOf(t)>0}function Zt(e){return ho.innerHTML=e,ho.textContent}function Gt(e,t,n){return t&&(e=e.replace(qo,"<").replace(Ko,">")),n&&(e=e.replace(Wo,"\n")),e.replace(Zo,"&").replace(Go,'"')}function Yt(e,t){function n(t){d+=t,e=e.substring(t)}function r(){var t=e.match(wo);if(t){var r={tagName:t[1],attrs:[],start:d};n(t[0].length);for(var i,o;!(i=e.match(Co))&&(o=e.match(_o));)n(o[0].length),r.attrs.push(o);if(i)return r.unarySlash=i[1],n(i[0].length),r.end=d,r}}function i(e){var n=e.tagName,r=e.unarySlash;u&&("p"===s&&xi(n)&&o("",s),Ci(n)&&s===n&&o("",n));for(var i=l(n)||"html"===n&&"head"===s||!!r,a=e.attrs.length,d=new Array(a),p=0;p<a;p++){var v=e.attrs[p];Ao&&v[0].indexOf('""')===-1&&(""===v[3]&&delete v[3],
	""===v[4]&&delete v[4],""===v[5]&&delete v[5]);var h=v[3]||v[4]||v[5]||"";d[p]={name:v[1],value:f?Gt(h,t.shouldDecodeTags,t.shouldDecodeNewlines):h}}i||(c.push({tag:n,attrs:d}),s=n,r=""),t.start&&t.start(n,d,i,e.start,e.end)}function o(e,n,r,i){var o;if(null==r&&(r=d),null==i&&(i=d),n){var a=n.toLowerCase();for(o=c.length-1;o>=0&&c[o].tag.toLowerCase()!==a;o--);}else o=0;if(o>=0){for(var u=c.length-1;u>=o;u--)t.end&&t.end(c[u].tag,r,i);c.length=o,s=o&&c[o-1].tag}else"br"===n.toLowerCase()?t.start&&t.start(n,[],!0,r,i):"p"===n.toLowerCase()&&(t.start&&t.start(n,[],!1,r,i),t.end&&t.end(n,r,i))}for(var a,s,c=[],u=t.expectHTML,l=t.isUnaryTag||Cr,f=t.isFromDOM,d=0;e;){if(a=e,s&&Vo(s)){var p=s.toLowerCase(),v=Jo[p]||(Jo[p]=new RegExp("([\\s\\S]*?)(</"+p+"[^>]*>)","i")),h=0,m=e.replace(v,function(e,n,r){return h=r.length,"script"!==p&&"style"!==p&&"noscript"!==p&&(n=n.replace(/<!--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,"$1")),t.chars&&t.chars(n),""});d+=e.length-m.length,e=m,o("</"+p+">",p,d-h,d)}else{var g=e.indexOf("<");if(0===g){if(/^<!--/.test(e)){var y=e.indexOf("-->");if(y>=0){n(y+3);continue}}if(/^<!\[/.test(e)){var _=e.indexOf("]>");if(_>=0){n(_+2);continue}}var b=e.match(ko);if(b){n(b[0].length);continue}var $=e.match(xo);if($){var w=d;n($[0].length),o($[0],$[1],w,d);continue}var C=r();if(C){i(C);continue}}var x=void 0;g>=0?(x=e.substring(0,g),n(g)):(x=e,e=""),t.chars&&t.chars(x)}if(e===a)throw new Error("Error parsing template:\n\n"+e)}o()}function Qt(e){function t(){(a||(a=[])).push(e.slice(d,i).trim()),d=i+1}var n,r,i,o,a,s=!1,c=!1,u=0,l=0,f=0,d=0;for(i=0;i<e.length;i++)if(r=n,n=e.charCodeAt(i),s)39===n&&92!==r&&(s=!s);else if(c)34===n&&92!==r&&(c=!c);else if(124!==n||124===e.charCodeAt(i+1)||124===e.charCodeAt(i-1)||u||l||f)switch(n){case 34:c=!0;break;case 39:s=!0;break;case 40:f++;break;case 41:f--;break;case 91:l++;break;case 93:l--;break;case 123:u++;break;case 125:u--}else void 0===o?(d=i+1,o=e.slice(0,i).trim()):t();if(void 0===o?o=e.slice(0,i).trim():0!==d&&t(),a)for(i=0;i<a.length;i++)o=Xt(o,a[i]);return o}function Xt(e,t){var n=t.indexOf("(");if(n<0)return'_f("'+t+'")('+e+")";var r=t.slice(0,n),i=t.slice(n+1);return'_f("'+r+'")('+e+","+i}function en(e,t){var n=t?Xo(t):Yo;if(n.test(e)){for(var r,i,o=[],a=n.lastIndex=0;r=n.exec(e);){i=r.index,i>a&&o.push(JSON.stringify(e.slice(a,i)));var s=Qt(r[1].trim());o.push("_s("+s+")"),a=i+r[0].length}return a<e.length&&o.push(JSON.stringify(e.slice(a))),o.join("+")}}function tn(e){console.error("[Vue parser]: "+e)}function nn(e,t){return e?e.map(function(e){return e[t]}).filter(function(e){return e}):[]}function rn(e,t,n){(e.props||(e.props=[])).push({name:t,value:n})}function on(e,t,n){(e.attrs||(e.attrs=[])).push({name:t,value:n})}function an(e,t,n,r,i){(e.directives||(e.directives=[])).push({name:t,value:n,arg:r,modifiers:i})}function sn(e,t,n,r,i){r&&r.capture&&(delete r.capture,t="!"+t);var o;r&&r.native?(delete r.native,o=e.nativeEvents||(e.nativeEvents={})):o=e.events||(e.events={});var a={value:n,modifiers:r},s=o[t];Array.isArray(s)?i?s.unshift(a):s.push(a):s?o[t]=i?[a,s]:[s,a]:o[t]=a}function cn(e,t,n){var r=un(e,":"+t)||un(e,"v-bind:"+t);if(null!=r)return r;if(n!==!1){var i=un(e,t);if(null!=i)return JSON.stringify(i)}}function un(e,t){var n;if(null!=(n=e.attrsMap[t]))for(var r=e.attrsList,i=0,o=r.length;i<o;i++)if(r[i].name===t){r.splice(i,1);break}return n}function ln(e,t){Oo=t.warn||tn,To=t.getTagNamespace||Cr,So=t.mustUseProp||Cr,Eo=t.isPreTag||Cr,jo=nn(t.modules,"preTransformNode"),Lo=nn(t.modules,"transformNode"),Do=nn(t.modules,"postTransformNode"),No=t.delimiters;var n,r,i=[],o=t.preserveWhitespace!==!1,a=!1,s=!1;return Yt(e,{expectHTML:t.expectHTML,isUnaryTag:t.isUnaryTag,isFromDOM:t.isFromDOM,shouldDecodeTags:t.shouldDecodeTags,shouldDecodeNewlines:t.shouldDecodeNewlines,start:function(e,o,c){function u(e){}var l=r&&r.ns||To(e);t.isIE&&"svg"===l&&(o=On(o));var f={type:1,tag:e,attrsList:o,attrsMap:xn(o),parent:r,children:[]};l&&(f.ns=l),An(f)&&(f.forbidden=!0);for(var d=0;d<jo.length;d++)jo[d](f,t);if(a||(fn(f),f.pre&&(a=!0)),Eo(f.tag)&&(s=!0),a)dn(f);else{hn(f),mn(f),yn(f),pn(f),f.plain=!f.key&&!o.length,vn(f),_n(f),bn(f);for(var p=0;p<Lo.length;p++)Lo[p](f,t);$n(f)}n||(n=f,u(n)),r&&!f.forbidden&&(f.else?gn(f,r):(r.children.push(f),f.parent=r)),c||(r=f,i.push(f));for(var v=0;v<Do.length;v++)Do[v](f,t)},end:function(){var e=i[i.length-1],t=e.children[e.children.length-1];t&&3===t.type&&" "===t.text&&e.children.pop(),i.length-=1,r=i[i.length-1],e.pre&&(a=!1),Eo(e.tag)&&(s=!1)},chars:function(e){if(r&&(e=s||e.trim()?sa(e):o&&r.children.length?" ":"")){var t;!a&&" "!==e&&(t=en(e,No))?r.children.push({type:2,expression:t,text:e}):r.children.push({type:3,text:e})}}}),n}function fn(e){null!=un(e,"v-pre")&&(e.pre=!0)}function dn(e){var t=e.attrsList.length;if(t)for(var n=e.attrs=new Array(t),r=0;r<t;r++)n[r]={name:e.attrsList[r].name,value:JSON.stringify(e.attrsList[r].value)};else e.pre||(e.plain=!0)}function pn(e){var t=cn(e,"key");t&&(e.key=t)}function vn(e){var t=cn(e,"ref");t&&(e.ref=t,e.refInFor=wn(e))}function hn(e){var t;if(t=un(e,"v-for")){var n=t.match(ta);if(!n)return;e.for=n[2].trim();var r=n[1].trim(),i=r.match(na);i?(e.alias=i[1].trim(),e.iterator1=i[2].trim(),i[3]&&(e.iterator2=i[3].trim())):e.alias=r}}function mn(e){var t=un(e,"v-if");t&&(e.if=t),null!=un(e,"v-else")&&(e.else=!0)}function gn(e,t){var n=kn(t.children);n&&n.if&&(n.elseBlock=e)}function yn(e){var t=un(e,"v-once");null!=t&&(e.once=!0)}function _n(e){if("slot"===e.tag)e.slotName=cn(e,"name");else{var t=cn(e,"slot");t&&(e.slotTarget=t)}}function bn(e){var t;(t=cn(e,"is"))&&(e.component=t),null!=un(e,"inline-template")&&(e.inlineTemplate=!0)}function $n(e){var t,n,r,i,o,a,s,c=e.attrsList;for(t=0,n=c.length;t<n;t++)if(r=c[t].name,i=c[t].value,ea.test(r))if(e.hasBindings=!0,a=Cn(r),a&&(r=r.replace(aa,"")),ra.test(r))r=r.replace(ra,""),a&&a.prop&&(s=!0,r=gr(r),"innerHtml"===r&&(r="innerHTML")),s||So(r)?rn(e,r,i):on(e,r,i);else if(ia.test(r))r=r.replace(ia,""),sn(e,r,i,a);else{r=r.replace(ea,"");var u=r.match(oa);u&&(o=u[1])&&(r=r.slice(0,-(o.length+1))),an(e,r,i,o,a)}else on(e,r,JSON.stringify(i))}function wn(e){for(var t=e;t;){if(void 0!==t.for)return!0;t=t.parent}return!1}function Cn(e){var t=e.match(aa);if(t){var n={};return t.forEach(function(e){n[e.slice(1)]=!0}),n}}function xn(e){for(var t={},n=0,r=e.length;n<r;n++)t[e[n].name]=e[n].value;return t}function kn(e){for(var t=e.length;t--;)if(e[t].tag)return e[t]}function An(e){return"style"===e.tag||"script"===e.tag&&(!e.attrsMap.type||"text/javascript"===e.attrsMap.type)}function On(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];ca.test(r.name)||(r.name=r.name.replace(ua,""),t.push(r))}return t}function Tn(e,t){e&&(Mo=la(t.staticKeys||""),Po=t.isReservedTag||function(){return!1},En(e),jn(e,!1))}function Sn(e){return n("type,tag,attrsList,attrsMap,plain,parent,children,attrs"+(e?","+e:""))}function En(e){if(e.static=Ln(e),1===e.type)for(var t=0,n=e.children.length;t<n;t++){var r=e.children[t];En(r),r.static||(e.static=!1)}}function jn(e,t){if(1===e.type){if(e.once||e.static)return e.staticRoot=!0,void(e.staticInFor=t);if(e.children)for(var n=0,r=e.children.length;n<r;n++)jn(e.children[n],!!e.for)}}function Ln(e){return 2!==e.type&&(3===e.type||!(!e.pre&&(e.hasBindings||e.if||e.for||vr(e.tag)||!Po(e.tag)||!Object.keys(e).every(Mo))))}function Dn(e,t){var n=t?"nativeOn:{":"on:{";for(var r in e)n+='"'+r+'":'+Nn(e[r])+",";return n.slice(0,-1)+"}"}function Nn(e){if(e){if(Array.isArray(e))return"["+e.map(Nn).join(",")+"]";if(e.modifiers){var t="",n=[];for(var r in e.modifiers)pa[r]?t+=pa[r]:n.push(r);n.length&&(t=Mn(n)+t);var i=fa.test(e.value)?e.value+"($event)":e.value;return"function($event){"+t+i+"}"}return fa.test(e.value)?e.value:"function($event){"+e.value+"}"}return"function(){}"}function Mn(e){var t=1===e.length?Pn(e[0]):Array.prototype.concat.apply([],e.map(Pn));return Array.isArray(t)?"if("+t.map(function(e){return"$event.keyCode!=="+e}).join("&&")+")return;":"if($event.keyCode!=="+t+")return;"}function Pn(e){return parseInt(e,10)||da[e]||"_k("+JSON.stringify(e)+")"}function Rn(e,t){e.wrapData=function(e){return"_b("+e+","+t.value+(t.modifiers&&t.modifiers.prop?",true":"")+")"}}function In(e,t){var n=Ho,r=Ho=[];Uo=t,Ro=t.warn||tn,Io=nn(t.modules,"transformCode"),Fo=nn(t.modules,"genData"),Bo=t.directives||{};var i=e?Fn(e):'_h("div")';return Ho=n,{render:"with(this){return "+i+"}",staticRenderFns:r}}function Fn(e){if(e.staticRoot&&!e.staticProcessed)return e.staticProcessed=!0,Ho.push("with(this){return "+Fn(e)+"}"),"_m("+(Ho.length-1)+(e.staticInFor?",true":"")+")";if(e.for&&!e.forProcessed)return Un(e);if(e.if&&!e.ifProcessed)return Bn(e);if("template"!==e.tag||e.slotTarget){if("slot"===e.tag)return Wn(e);var t;if(e.component)t=Zn(e);else{var n=zn(e),r=e.inlineTemplate?null:Jn(e);t="_h('"+e.tag+"'"+(n?","+n:"")+(r?","+r:"")+")"}for(var i=0;i<Io.length;i++)t=Io[i](e,t);return t}return Jn(e)||"void 0"}function Bn(e){var t=e.if;return e.ifProcessed=!0,"("+t+")?"+Fn(e)+":"+Hn(e)}function Hn(e){return e.elseBlock?Fn(e.elseBlock):"_e()"}function Un(e){var t=e.for,n=e.alias,r=e.iterator1?","+e.iterator1:"",i=e.iterator2?","+e.iterator2:"";return e.forProcessed=!0,"_l(("+t+"),function("+n+r+i+"){return "+Fn(e)+"})"}function zn(e){if(!e.plain){var t="{",n=Vn(e);n&&(t+=n+","),e.key&&(t+="key:"+e.key+","),e.ref&&(t+="ref:"+e.ref+","),e.refInFor&&(t+="refInFor:true,"),e.component&&(t+='tag:"'+e.tag+'",'),e.slotTarget&&(t+="slot:"+e.slotTarget+",");for(var r=0;r<Fo.length;r++)t+=Fo[r](e);if(e.attrs&&(t+="attrs:{"+Gn(e.attrs)+"},"),e.props&&(t+="domProps:{"+Gn(e.props)+"},"),e.events&&(t+=Dn(e.events)+","),e.nativeEvents&&(t+=Dn(e.nativeEvents,!0)+","),e.inlineTemplate){var i=e.children[0];if(1===i.type){var o=In(i,Uo);t+="inlineTemplate:{render:function(){"+o.render+"},staticRenderFns:["+o.staticRenderFns.map(function(e){return"function(){"+e+"}"}).join(",")+"]}"}}return t=t.replace(/,$/,"")+"}",e.wrapData&&(t=e.wrapData(t)),t}}function Vn(e){var t=e.directives;if(t){var n,r,i,o,a="directives:[",s=!1;for(n=0,r=t.length;n<r;n++){i=t[n],o=!0;var c=Bo[i.name]||va[i.name];c&&(o=!!c(e,i,Ro)),o&&(s=!0,a+='{name:"'+i.name+'"'+(i.value?",value:("+i.value+"),expression:"+JSON.stringify(i.value):"")+(i.arg?',arg:"'+i.arg+'"':"")+(i.modifiers?",modifiers:"+JSON.stringify(i.modifiers):"")+"},")}return s?a.slice(0,-1)+"]":void 0}}function Jn(e){if(e.children.length)return"["+e.children.map(qn).join(",")+"]"}function qn(e){return 1===e.type?Fn(e):Kn(e)}function Kn(e){return 2===e.type?e.expression:JSON.stringify(e.text)}function Wn(e){var t=e.slotName||'"default"',n=Jn(e);return n?"_t("+t+","+n+")":"_t("+t+")"}function Zn(e){var t=Jn(e);return"_h("+e.component+","+zn(e)+(t?","+t:"")+")"}function Gn(e){for(var t="",n=0;n<e.length;n++){var r=e[n];t+='"'+r.name+'":'+r.value+","}return t.slice(0,-1)}function Yn(e,t){var n=ln(e.trim(),t);Tn(n,t);var r=In(n,t);return{ast:n,render:r.render,staticRenderFns:r.staticRenderFns}}function Qn(e,t){var n=(t.warn||tn,un(e,"class"));n&&(e.staticClass=JSON.stringify(n));var r=cn(e,"class",!1);r&&(e.classBinding=r)}function Xn(e){var t="";return e.staticClass&&(t+="staticClass:"+e.staticClass+","),e.classBinding&&(t+="class:"+e.classBinding+","),t}function er(e){var t=cn(e,"style",!1);t&&(e.styleBinding=t)}function tr(e){return e.styleBinding?"style:("+e.styleBinding+"),":""}function nr(e,t,n){zo=n;var r=t.value,i=t.modifiers,o=e.tag,a=e.attrsMap.type;if("select"===o)return ar(e,r);if("input"===o&&"checkbox"===a)rr(e,r);else{if("input"!==o||"radio"!==a)return or(e,r,i);ir(e,r)}}function rr(e,t){var n=cn(e,"value")||"null",r=cn(e,"true-value")||"true",i=cn(e,"false-value")||"false";rn(e,"checked","Array.isArray("+t+")?_i("+t+","+n+")>-1:_q("+t+","+r+")"),sn(e,"change","var $$a="+t+",$$el=$event.target,$$c=$$el.checked?("+r+"):("+i+");if(Array.isArray($$a)){var $$v="+n+",$$i=_i($$a,$$v);if($$c){$$i<0&&("+t+"=$$a.concat($$v))}else{$$i>-1&&("+t+"=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{"+t+"=$$c}",null,!0)}function ir(e,t){var n=cn(e,"value")||"null";rn(e,"checked","_q("+t+","+n+")"),sn(e,"change",t+"="+n,null,!0)}function or(e,t,n){var r=e.attrsMap.type,i=n||{},o=i.lazy,a=i.number,s=i.trim,c=o||Sr&&"range"===r?"change":"input",u=!o&&"range"!==r,l="input"===e.tag||"textarea"===e.tag,f=l?"$event.target.value"+(s?".trim()":""):"$event",d=a||"number"===r?t+"=_n("+f+")":t+"="+f;if(l&&u&&(d="if($event.target.composing)return;"+d),rn(e,"value",l?"_s("+t+")":"("+t+")"),sn(e,c,d,null,!0),u)return!0}function ar(e,t){var n=t+'=Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){return "_value" in o ? o._value : o.value})'+(null==e.attrsMap.multiple?"[0]":"");return sn(e,"change",n,null,!0),!0}function sr(e,t){t.value&&rn(e,"textContent","_s("+t.value+")")}function cr(e,t){t.value&&rn(e,"innerHTML","_s("+t.value+")")}function ur(e,t){return t=t?u(u({},ba),t):ba,Yn(e,t)}function lr(e,t,n){var r=(t&&t.warn||ai,t&&t.delimiters?String(t.delimiters)+e:e);if(_a[r])return _a[r];var i={},o=ur(e,t);i.render=fr(o.render);var a=o.staticRenderFns.length;i.staticRenderFns=new Array(a);for(var s=0;s<a;s++)i.staticRenderFns[s]=fr(o.staticRenderFns[s]);return _a[r]=i}function fr(e){try{return new Function(e)}catch(e){return p}}function dr(e){if(e.outerHTML)return e.outerHTML;var t=document.createElement("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}var pr,vr=n("slot,component",!0),hr=Object.prototype.hasOwnProperty,mr=/-(\w)/g,gr=a(function(e){return e.replace(mr,function(e,t){return t?t.toUpperCase():""})}),yr=a(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}),_r=/([^-])([A-Z])/g,br=a(function(e){return e.replace(_r,"$1-$2").replace(_r,"$1-$2").toLowerCase()}),$r=Object.prototype.toString,wr="[object Object]",Cr=function(){return!1},xr={optionMergeStrategies:Object.create(null),silent:!1,devtools:!1,errorHandler:null,ignoredElements:null,keyCodes:Object.create(null),isReservedTag:Cr,isUnknownElement:Cr,getTagNamespace:p,mustUseProp:Cr,_assetTypes:["component","directive","filter"],_lifecycleHooks:["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated"],_maxUpdateCount:100,_isServer:!1},kr=/[^\w\.\$]/,Ar="__proto__"in{},Or="undefined"!=typeof window&&"[object Object]"!==Object.prototype.toString.call(window),Tr=Or&&window.navigator.userAgent.toLowerCase(),Sr=Tr&&/msie|trident/.test(Tr),Er=Tr&&Tr.indexOf("msie 9.0")>0,jr=Tr&&Tr.indexOf("edge/")>0,Lr=Tr&&Tr.indexOf("android")>0,Dr=Tr&&/iphone|ipad|ipod|ios/.test(Tr),Nr=Or&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__,Mr=function(){function e(){r=!1;var e=n.slice(0);n.length=0;for(var t=0;t<e.length;t++)e[t]()}var t,n=[],r=!1;if("undefined"!=typeof Promise&&b(Promise)){var i=Promise.resolve();t=function(){i.then(e),Dr&&setTimeout(p)}}else if("undefined"==typeof MutationObserver||!b(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())t=setTimeout;else{var o=1,a=new MutationObserver(e),s=document.createTextNode(String(o));a.observe(s,{characterData:!0}),t=function(){o=(o+1)%2,s.data=String(o)}}return function(i,o){var a=o?function(){i.call(o)}:i;n.push(a),r||(r=!0,t(e,0))}}();pr="undefined"!=typeof Set&&b(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return void 0!==this.set[e]},e.prototype.add=function(e){this.set[e]=1},e.prototype.clear=function(){this.set=Object.create(null)},e}();var Pr=0,Rr=function(){this.id=Pr++,this.subs=[]};Rr.prototype.addSub=function(e){this.subs.push(e)},Rr.prototype.removeSub=function(e){r(this.subs,e)},Rr.prototype.depend=function(){Rr.target&&Rr.target.addDep(this)},Rr.prototype.notify=function(){for(var e=this.subs.slice(),t=0,n=e.length;t<n;t++)e[t].update()},Rr.target=null;var Ir=[],Fr=[],Br={},Hr=!1,Ur=!1,zr=0,Vr=0,Jr=function(e,t,n,r){void 0===r&&(r={}),this.vm=e,e._watchers.push(this),this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync,this.expression=t.toString(),this.cb=n,this.id=++Vr,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new pr,this.newDepIds=new pr,"function"==typeof t?this.getter=t:(this.getter=_(t),this.getter||(this.getter=function(){})),this.value=this.lazy?void 0:this.get()};Jr.prototype.get=function(){$(this);var e=this.getter.call(this.vm,this.vm);return this.deep&&A(e),w(),this.cleanupDeps(),e},Jr.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},Jr.prototype.cleanupDeps=function(){for(var e=this,t=this.deps.length;t--;){var n=e.deps[t];e.newDepIds.has(n.id)||n.removeSub(e)}var r=this.depIds;this.depIds=this.newDepIds,this.newDepIds=r,this.newDepIds.clear(),r=this.deps,this.deps=this.newDeps,this.newDeps=r,this.newDeps.length=0},Jr.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():k(this)},Jr.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||l(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(e){if(!xr.errorHandler)throw e;xr.errorHandler.call(null,e,this.vm)}else this.cb.call(this.vm,e,t)}}},Jr.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},Jr.prototype.depend=function(){for(var e=this,t=this.deps.length;t--;)e.deps[t].depend()},Jr.prototype.teardown=function(){var e=this;if(this.active){this.vm._isBeingDestroyed||this.vm._vForRemoving||r(this.vm._watchers,this);for(var t=this.deps.length;t--;)e.deps[t].removeSub(e);this.active=!1}};var qr=new pr,Kr=Array.prototype,Wr=Object.create(Kr);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(e){var t=Kr[e];y(Wr,e,function(){for(var n=arguments,r=arguments.length,i=new Array(r);r--;)i[r]=n[r];var o,a=t.apply(this,i),s=this.__ob__;switch(e){case"push":o=i;break;case"unshift":o=i;break;case"splice":o=i.slice(2)}return o&&s.observeArray(o),s.dep.notify(),a})});var Zr=Object.getOwnPropertyNames(Wr),Gr={shouldConvert:!0,isSettingProps:!1},Yr=function(e){if(this.value=e,this.dep=new Rr,this.vmCount=0,y(e,"__ob__",this),Array.isArray(e)){var t=Ar?O:T;t(e,Wr,Zr),this.observeArray(e)}else this.walk(e)};Yr.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)E(e,t[n],e[t[n]])},Yr.prototype.observeArray=function(e){for(var t=0,n=e.length;t<n;t++)S(e[t])};var Qr={enumerable:!0,configurable:!0,get:p,set:p},Xr=function(e,t,n,r,i,o,a,s){this.tag=e,this.data=t,this.children=n,this.text=r,this.elm=i,this.ns=o,this.context=a,this.key=t&&t.key,this.componentOptions=s,this.child=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1},ei=function(){var e=new Xr;return e.text="",e.isComment=!0,e},ti=null,ni={init:oe,prepatch:ae,insert:se,destroy:ce},ri=Object.keys(ni),ii=0;$e(we),H(we),be(we),ee(we),ge(we);var oi,ai=p,si=xr.optionMergeStrategies;si.data=function(e,t,n){return n?e||t?function(){var r="function"==typeof t?t.call(n):t,i="function"==typeof e?e.call(n):void 0;return r?Ce(r,i):i}:void 0:t?"function"!=typeof t?e:e?function(){return Ce(t.call(this),e.call(this))}:t:e},xr._lifecycleHooks.forEach(function(e){si[e]=xe}),xr._assetTypes.forEach(function(e){si[e+"s"]=ke}),si.watch=function(e,t){if(!t)return e;if(!e)return t;var n={};u(n,e);for(var r in t){var i=n[r],o=t[r];i&&!Array.isArray(i)&&(i=[i]),n[r]=i?i.concat(o):[o]}return n},si.props=si.methods=si.computed=function(e,t){if(!t)return e;if(!e)return t;var n=Object.create(null);return u(n,e),u(n,t),n};var ci=function(e,t){return void 0===t?e:t},ui=Object.freeze({defineReactive:E,_toString:e,toNumber:t,makeMap:n,isBuiltInTag:vr,remove:r,hasOwn:i,isPrimitive:o,cached:a,camelize:gr,capitalize:yr,hyphenate:br,bind:s,toArray:c,extend:u,isObject:l,isPlainObject:f,toObject:d,noop:p,no:Cr,genStaticKeys:v,looseEqual:h,looseIndexOf:m,isReserved:g,def:y,parsePath:_,hasProto:Ar,inBrowser:Or,UA:Tr,isIE:Sr,isIE9:Er,isEdge:jr,isAndroid:Lr,isIOS:Dr,devtools:Nr,nextTick:Mr,get _Set(){return pr},mergeOptions:Se,resolveAsset:Ee,warn:ai,formatComponentName:oi,validateProp:je}),li={name:"keep-alive",abstract:!0,created:function(){this.cache=Object.create(null)},render:function(){var e=W(this.$slots.default);if(e&&e.componentOptions){var t=e.componentOptions,n=null==e.key?t.Ctor.cid+"::"+t.tag:e.key;this.cache[n]?e.child=this.cache[n].child:this.cache[n]=e,e.data.keepAlive=!0}return e},destroyed:function(){var e=this;for(var t in this.cache){var n=e.cache[t];te(n.child,"deactivated"),n.child.$destroy()}}},fi={KeepAlive:li};Ie(we),Object.defineProperty(we.prototype,"$isServer",{get:function(){return xr._isServer}}),we.version="2.0.1";var di,pi=n("value,selected,checked,muted"),vi=n("contenteditable,draggable,spellcheck"),hi=n("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),mi="http://www.w3.org/1999/xlink",gi=function(e){return":"===e.charAt(5)&&"xlink"===e.slice(0,5)},yi=function(e){return gi(e)?e.slice(6,e.length):""},_i=function(e){return null==e||e===!1},bi={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},$i=n("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template"),wi=n("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr",!0),Ci=n("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source",!0),xi=n("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track",!0),ki=n("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font,font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),Ai=function(e){return"pre"===e},Oi=function(e){return $i(e)||ki(e)},Ti=Object.create(null),Si=Object.freeze({createElement:Ke,createElementNS:We,createTextNode:Ze,createComment:Ge,insertBefore:Ye,removeChild:Qe,appendChild:Xe,parentNode:et,nextSibling:tt,tagName:nt,setTextContent:rt,childNodes:it,setAttribute:ot}),Ei={create:function(e,t){at(t)},update:function(e,t){e.data.ref!==t.data.ref&&(at(e,!0),at(t))},destroy:function(e){at(e,!0)}},ji={},Li=new Xr("",ji,[]),Di=["create","update","postpatch","remove","destroy"],Ni={create:function(e,t){var n=!1;dt(e,t,function(r,i){vt(r,i,"bind",t,e),r.inserted&&(n=!0)}),n&&Z(t.data.hook||(t.data.hook={}),"insert",function(){pt(e,t,"inserted")})},update:function(e,t){pt(e,t,"update"),e.data.directives&&!t.data.directives&&pt(e,e,"unbind")},postpatch:function(e,t){pt(e,t,"componentUpdated")},destroy:function(e){pt(e,e,"unbind")}},Mi=Object.create(null),Pi=[Ei,Ni],Ri={create:ht,update:ht},Ii={create:gt,update:gt},Fi={create:yt,update:yt},Bi={create:_t,update:_t},Hi=["Webkit","Moz","ms"],Ui=a(function(e){if(di=di||document.createElement("div"),e=gr(e),"filter"!==e&&e in di.style)return e;for(var t=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<Hi.length;n++){var r=Hi[n]+t;if(r in di.style)return r}}),zi={create:bt,update:bt},Vi=Or&&!Er,Ji="transition",qi="animation",Ki="transition",Wi="transitionend",Zi="animation",Gi="animationend";Vi&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(Ki="WebkitTransition",Wi="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(Zi="WebkitAnimation",Gi="webkitAnimationEnd"));var Yi=Or&&window.requestAnimationFrame||setTimeout,Qi=/\b(transform|all)(,|$)/,Xi=a(function(e){return{enterClass:e+"-enter",leaveClass:e+"-leave",appearClass:e+"-enter",enterActiveClass:e+"-enter-active",leaveActiveClass:e+"-leave-active",appearActiveClass:e+"-enter-active"}}),eo=Or?{create:function(e,t){t.data.show||Et(t)},remove:function(e,t){e.data.show?t():jt(e,t)}}:{},to=[Ri,Ii,Fi,Bi,zi,eo],no=to.concat(Pi),ro=ft({nodeOps:Si,modules:no});Er&&document.addEventListener("selectionchange",function(){var e=document.activeElement;e&&e.vmodel&&Ft(e,"input")});var io={bind:function(e,t,n){if("select"===n.tag){if(Nt(e,t,n.context),Sr||jr){var r=function(){Nt(e,t,n.context)};Mr(r),setTimeout(r,0)}}else"textarea"!==n.tag&&"text"!==e.type||(Lr||(e.addEventListener("compositionstart",Rt),e.addEventListener("compositionend",It)),Er&&(e.vmodel=!0))},componentUpdated:function(e,t,n){if("select"===n.tag){Nt(e,t,n.context);var r=e.multiple?t.value.some(function(t){return Mt(t,e.options)}):Mt(t.value,e.options);r&&Ft(e,"change")}}},oo={bind:function(e,t,n){var r=t.value;n=Bt(n);var i=n.data&&n.data.transition;r&&i&&!Er&&Et(n);var o="none"===e.style.display?"":e.style.display;e.style.display=r?o:"none",e.__vOriginalDisplay=o},update:function(e,t,n){var r=t.value,i=t.oldValue;if(r!==i){n=Bt(n);var o=n.data&&n.data.transition;o&&!Er?r?(Et(n),e.style.display=e.__vOriginalDisplay):jt(n,function(){e.style.display="none"}):e.style.display=r?e.__vOriginalDisplay:"none"}}},ao={model:io,show:oo},so={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String},co={name:"transition",props:so,abstract:!0,render:function(e){var t=this,n=this.$slots.default;if(n&&(n=n.filter(function(e){return e.tag}),n.length)){var r=this.mode,i=n[0];if(Vt(this.$vnode))return i;var o=Ht(i);if(!o)return i;if(this._leaving)return zt(e,i);o.key=null==o.key||o.isStatic?"__v"+(o.tag+this._uid)+"__":o.key;var a=(o.data||(o.data={})).transition=Ut(this),s=this._vnode,c=Ht(s);if(o.data.directives&&o.data.directives.some(function(e){return"show"===e.name})&&(o.data.show=!0),c&&c.data&&c.key!==o.key){var l=c.data.transition=u({},a);if("out-in"===r)return this._leaving=!0,Z(l,"afterLeave",function(){t._leaving=!1,t.$forceUpdate()}),zt(e,i);if("in-out"===r){var f,d=function(){f()};Z(a,"afterEnter",d),Z(a,"enterCancelled",d),Z(l,"delayLeave",function(e){f=e})}}return i}}},uo=u({tag:String,moveClass:String},so);delete uo.mode;var lo={props:uo,render:function(e){for(var t=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,i=this.$slots.default||[],o=this.children=[],a=Ut(this),s=0;s<i.length;s++){var c=i[s];c.tag&&null!=c.key&&0!==String(c.key).indexOf("__vlist")&&(o.push(c),n[c.key]=c,(c.data||(c.data={})).transition=a)}if(r){for(var u=[],l=[],f=0;f<r.length;f++){var d=r[f];d.data.transition=a,d.data.pos=d.elm.getBoundingClientRect(),n[d.key]?u.push(d):l.push(d)}this.kept=e(t,null,u),this.removed=l}return e(t,null,o)},beforeUpdate:function(){this.__patch__(this._vnode,this.kept,!1,!0),this._vnode=this.kept},updated:function(){var e=this.prevChildren,t=this.moveClass||this.name+"-move";if(e.length&&this.hasMove(e[0].elm,t)){e.forEach(Jt),e.forEach(qt),e.forEach(Kt);document.body.offsetHeight;e.forEach(function(e){if(e.data.moved){var n=e.elm,r=n.style;xt(n,t),r.transform=r.WebkitTransform=r.transitionDuration="",n.addEventListener(Wi,n._moveCb=function e(r){r&&!/transform$/.test(r.propertyName)||(n.removeEventListener(Wi,e),n._moveCb=null,kt(n,t))})}})}},methods:{hasMove:function(e,t){if(!Vi)return!1;if(null!=this._hasMove)return this._hasMove;xt(e,t);var n=Ot(e);return kt(e,t),this._hasMove=n.hasTransform}}},fo={Transition:co,TransitionGroup:lo};we.config.isUnknownElement=Je,we.config.isReservedTag=Oi,we.config.getTagNamespace=Ve,we.config.mustUseProp=pi,u(we.options.directives,ao),u(we.options.components,fo),we.prototype.__patch__=xr._isServer?p:ro,we.prototype.$mount=function(e,t){return e=e&&!xr._isServer?qe(e):void 0,this._mount(e,t)},setTimeout(function(){xr.devtools&&Nr&&Nr.emit("init",we)},0);var po=!!Or&&Wt(">","&gt;"),vo=!!Or&&Wt("\n","&#10;"),ho=document.createElement("div"),mo=/([^\s"'<>\/=]+)/,go=/(?:=)/,yo=[/"([^"]*)"+/.source,/'([^']*)'+/.source,/([^\s"'=<>`]+)/.source],_o=new RegExp("^\\s*"+mo.source+"(?:\\s*("+go.source+")\\s*(?:"+yo.join("|")+"))?"),bo="[a-zA-Z_][\\w\\-\\.]*",$o="((?:"+bo+"\\:)?"+bo+")",wo=new RegExp("^<"+$o),Co=/^\s*(\/?)>/,xo=new RegExp("^<\\/"+$o+"[^>]*>"),ko=/^<!DOCTYPE [^>]+>/i,Ao=!1;"x".replace(/x(.)?/g,function(e,t){Ao=""===t});var Oo,To,So,Eo,jo,Lo,Do,No,Mo,Po,Ro,Io,Fo,Bo,Ho,Uo,zo,Vo=n("script,style",!0),Jo={},qo=/&lt;/g,Ko=/&gt;/g,Wo=/&#10;/g,Zo=/&amp;/g,Go=/&quot;/g,Yo=/\{\{((?:.|\n)+?)\}\}/g,Qo=/[-.*+?^${}()|[\]\/\\]/g,Xo=a(function(e){var t=e[0].replace(Qo,"\\$&"),n=e[1].replace(Qo,"\\$&");return new RegExp(t+"((?:.|\\n)+?)"+n,"g")}),ea=/^v-|^@|^:/,ta=/(.*)\s+(?:in|of)\s+(.*)/,na=/\(([^,]*),([^,]*)(?:,([^,]*))?\)/,ra=/^:|^v-bind:/,ia=/^@|^v-on:/,oa=/:(.*)$/,aa=/\.[^\.]+/g,sa=a(Zt),ca=/^xmlns:NS\d+/,ua=/^NS\d+:/,la=a(Sn),fa=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/,da={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},pa={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:"if($event.target !== $event.currentTarget)return;"},va={bind:Rn,cloak:p},ha=(new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b")+"\\b"),{staticKeys:["staticClass"],transformNode:Qn,genData:Xn}),ma={transformNode:er,genData:tr},ga=[ha,ma],ya={model:nr,text:sr,html:cr},_a=Object.create(null),ba={isIE:Sr,expectHTML:!0,modules:ga,staticKeys:v(ga),directives:ya,isReservedTag:Oi,isUnaryTag:wi,mustUseProp:pi,getTagNamespace:Ve,isPreTag:Ai},$a=a(function(e){var t=qe(e);return t&&t.innerHTML}),wa=we.prototype.$mount;return we.prototype.$mount=function(e,t){if(e=e&&qe(e),e===document.body||e===document.documentElement)return this;var n=this.$options;if(!n.render){var r=n.template,i=!1;if(r)if("string"==typeof r)"#"===r.charAt(0)&&(i=!0,r=$a(r));else{if(!r.nodeType)return this;i=!0,r=r.innerHTML}else e&&(i=!0,r=dr(e));if(r){var o=lr(r,{warn:ai,isFromDOM:i,shouldDecodeTags:po,shouldDecodeNewlines:vo,delimiters:n.delimiters},this),a=o.render,s=o.staticRenderFns;n.render=a,n.staticRenderFns=s}}return wa.call(this,e,t)},we.compile=lr,we});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(7)

	/* script */
	__vue_exports__ = __webpack_require__(10)

	/* template */
	var __vue_template__ = __webpack_require__(72)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-1"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Game.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Game.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1&scoped=true!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Game.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "\n.game-panel[data-v-1]{\n    position: relative;\n    width: 450px;\n    height: 670px;\n    border: 4px solid #BDBDBD;\n    border-radius: 2px;\n    background-color: #faf8ef;\n    padding: 10px;\n    display: flex;\n    flex-direction: column;\n}\n@media screen and (max-width: 450px) {\n.game-panel[data-v-1]{\n        width: 100%;\n        height: 100%;\n        justify-content: space-around;\n}\n}\n", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var _Dashboard = __webpack_require__(11);

	var _Dashboard2 = _interopRequireDefault(_Dashboard);

	var _Chessboard = __webpack_require__(32);

	var _Chessboard2 = _interopRequireDefault(_Chessboard);

	var _PlayStatus = __webpack_require__(52);

	var _PlayStatus2 = _interopRequireDefault(_PlayStatus);

	var _Rank = __webpack_require__(57);

	var _Rank2 = _interopRequireDefault(_Rank);

	var _NameInput = __webpack_require__(67);

	var _NameInput2 = _interopRequireDefault(_NameInput);

	var _vuex = __webpack_require__(24);

	var _statusEnum = __webpack_require__(50);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	    //通过mapGetters将getters映射到computed里

	    computed: _extends({}, (0, _vuex.mapGetters)(['displayRank', 'displayNameInput'])),

	    //通过mapActions将actions映射到methods里

	    methods: _extends({}, (0, _vuex.mapActions)(['reset', 'updateStatus', 'setupServerChannel'])),

	    created: function created() {
	        this.updateStatus(_statusEnum.STATUS.READY);
	        this.setupServerChannel();
	        this.reset();
	    },

	    components: { Dashboard: _Dashboard2.default, Chessboard: _Chessboard2.default, Status: _PlayStatus2.default, Rank: _Rank2.default, NameInput: _NameInput2.default }
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(12)

	/* script */
	__vue_exports__ = __webpack_require__(14)

	/* template */
	var __vue_template__ = __webpack_require__(31)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-2"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-2", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Dashboard.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Dashboard.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Dashboard.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "\n.status-bar[data-v-2]{\n    width: 100%;\n    height: 100px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n", ""]);

	// exports


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Logo = __webpack_require__(15);

	var _Logo2 = _interopRequireDefault(_Logo);

	var _MatchInfo = __webpack_require__(20);

	var _MatchInfo2 = _interopRequireDefault(_MatchInfo);

	var _Score = __webpack_require__(26);

	var _Score2 = _interopRequireDefault(_Score);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    components: { Logo: _Logo2.default, MatchInfo: _MatchInfo2.default, Score: _Score2.default }
	}; //
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(16)

	/* script */
	__vue_exports__ = __webpack_require__(18)

	/* template */
	var __vue_template__ = __webpack_require__(19)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-7"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-7", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Logo.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Logo.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Logo.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "\n.logo[data-v-7]{\n    width: 160px;\n    height: 100px;\n    line-height: 90px;\n    padding: 5px;\n    border-radius: 5px;\n    background-color: #5979ac;\n    color: #fff;\n    text-align: center;\n}\na[data-v-7] {\n    text-decoration: none;\n    color: #fff;\n}\n@media screen and (max-width: 450px) {\n.logo[data-v-7]{\n        width: 150px;\n}\n}\n@media screen and (max-width: 380px) {\n.logo[data-v-7]{\n        width: 140px;\n}\n}\n@media screen and (max-width: 360px) {\n.logo[data-v-7]{\n        width: 110px;\n}\na[data-v-7]{\n        font-size: 18px;\n}\n}\n", ""]);

	// exports


/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//

	exports.default = {};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _m(0)
	}},staticRenderFns: [function (){with(this) {
	  return _h('h1', {
	    staticClass: "logo"
	  }, [_h('a', {
	    attrs: {
	      "href": "https://github.com/leftstick/vue-memory-game",
	      "target": "_blank"
	    }
	  }, ["Memory"])])
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7", module.exports)
	  }
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(21)

	/* script */
	__vue_exports__ = __webpack_require__(23)

	/* template */
	var __vue_template__ = __webpack_require__(25)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-8"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-8", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-8", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] MatchInfo.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(22);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MatchInfo.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MatchInfo.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "\n.board[data-v-8]{\n    width: 120px;\n    height: 100px;\n    padding: 10px;\n    background-color: #bbada0;\n    border-radius: 5px;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    align-items: center;\n    color: #eae0d1;\n}\nspan[data-v-8]{\n    font-size: 19px;\n    font-weight: bold;\n    display: block;\n    width: 100%;\n    text-align: center;\n}\nh2[data-v-8]{\n    color: #fff;\n}\n@media screen and (max-width: 450px) {\n.board[data-v-8]{\n        width: 105px;\n}\nspan[data-v-8]{\n        font-size: 17px;\n}\n}\n@media screen and (max-width: 380px) {\n.board[data-v-8]{\n        width: 95px;\n}\n}\n@media screen and (max-width: 360px) {\n.board[data-v-8]{\n        width: 90px;\n}\nspan[data-v-8]{\n        font-size: 15px;\n}\n}\n", ""]);

	// exports


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//


	var _vuex = __webpack_require__(24);

	exports.default = {
	    computed: _extends({}, (0, _vuex.mapGetters)(['leftMatched']))
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * vuex v2.0.0
	 * (c) 2016 Evan You
	 * @license MIT
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.Vuex = factory());
	}(this, (function () { 'use strict';

	var devtoolHook =
	  typeof window !== 'undefined' &&
	  window.__VUE_DEVTOOLS_GLOBAL_HOOK__

	function devtoolPlugin (store) {
	  if (!devtoolHook) { return }

	  store._devtoolHook = devtoolHook

	  devtoolHook.emit('vuex:init', store)

	  devtoolHook.on('vuex:travel-to-state', function (targetState) {
	    store.replaceState(targetState)
	  })

	  store.subscribe(function (mutation, state) {
	    devtoolHook.emit('vuex:mutation', mutation, state)
	  })
	}

	function applyMixin (Vue) {
	  var version = Number(Vue.version.split('.')[0])

	  if (version >= 2) {
	    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1
	    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit })
	  } else {
	    // override init and inject vuex init procedure
	    // for 1.x backwards compatibility.
	    var _init = Vue.prototype._init
	    Vue.prototype._init = function (options) {
	      if ( options === void 0 ) options = {};

	      options.init = options.init
	        ? [vuexInit].concat(options.init)
	        : vuexInit
	      _init.call(this, options)
	    }
	  }

	  /**
	   * Vuex init hook, injected into each instances init hooks list.
	   */

	  function vuexInit () {
	    var options = this.$options
	    // store injection
	    if (options.store) {
	      this.$store = options.store
	    } else if (options.parent && options.parent.$store) {
	      this.$store = options.parent.$store
	    }
	  }
	}

	function mapState (states) {
	  var res = {}
	  normalizeMap(states).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;

	    res[key] = function mappedState () {
	      return typeof val === 'function'
	        ? val.call(this, this.$store.state, this.$store.getters)
	        : this.$store.state[val]
	    }
	  })
	  return res
	}

	function mapMutations (mutations) {
	  var res = {}
	  normalizeMap(mutations).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;

	    res[key] = function mappedMutation () {
	      var args = [], len = arguments.length;
	      while ( len-- ) args[ len ] = arguments[ len ];

	      return this.$store.commit.apply(this.$store, [val].concat(args))
	    }
	  })
	  return res
	}

	function mapGetters (getters) {
	  var res = {}
	  normalizeMap(getters).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;

	    res[key] = function mappedGetter () {
	      if (!(val in this.$store.getters)) {
	        console.error(("[vuex] unknown getter: " + val))
	      }
	      return this.$store.getters[val]
	    }
	  })
	  return res
	}

	function mapActions (actions) {
	  var res = {}
	  normalizeMap(actions).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;

	    res[key] = function mappedAction () {
	      var args = [], len = arguments.length;
	      while ( len-- ) args[ len ] = arguments[ len ];

	      return this.$store.dispatch.apply(this.$store, [val].concat(args))
	    }
	  })
	  return res
	}

	function normalizeMap (map) {
	  return Array.isArray(map)
	    ? map.map(function (key) { return ({ key: key, val: key }); })
	    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
	}

	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	function isPromise (val) {
	  return val && typeof val.then === 'function'
	}

	function assert (condition, msg) {
	  if (!condition) { throw new Error(("[vuex] " + msg)) }
	}

	var Vue // bind on install

	var Store = function Store (options) {
	  var this$1 = this;
	  if ( options === void 0 ) options = {};

	  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.")
	  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.")

	  var state = options.state; if ( state === void 0 ) state = {};
	  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
	  var strict = options.strict; if ( strict === void 0 ) strict = false;

	  // store internal state
	  this._options = options
	  this._committing = false
	  this._actions = Object.create(null)
	  this._mutations = Object.create(null)
	  this._wrappedGetters = Object.create(null)
	  this._runtimeModules = Object.create(null)
	  this._subscribers = []
	  this._watcherVM = new Vue()

	    // bind commit and dispatch to self
	  var store = this
	  var ref = this;
	  var dispatch = ref.dispatch;
	  var commit = ref.commit;
	  this.dispatch = function boundDispatch (type, payload) {
	    return dispatch.call(store, type, payload)
	    }
	    this.commit = function boundCommit (type, payload, options) {
	    return commit.call(store, type, payload, options)
	  }

	  // strict mode
	  this.strict = strict

	  // init root module.
	  // this also recursively registers all sub-modules
	  // and collects all module getters inside this._wrappedGetters
	  installModule(this, state, [], options)

	  // initialize the store vm, which is responsible for the reactivity
	  // (also registers _wrappedGetters as computed properties)
	  resetStoreVM(this, state)

	  // apply plugins
	  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); })
	};

	var prototypeAccessors = { state: {} };

	prototypeAccessors.state.get = function () {
	  return this._vm.state
	};

	prototypeAccessors.state.set = function (v) {
	  assert(false, "Use store.replaceState() to explicit replace store state.")
	};

	Store.prototype.commit = function commit (type, payload, options) {
	    var this$1 = this;

	  // check object-style commit
	  if (isObject(type) && type.type) {
	    options = payload
	    payload = type
	    type = type.type
	  }
	  var mutation = { type: type, payload: payload }
	  var entry = this._mutations[type]
	  if (!entry) {
	    console.error(("[vuex] unknown mutation type: " + type))
	    return
	  }
	  this._withCommit(function () {
	    entry.forEach(function commitIterator (handler) {
	      handler(payload)
	    })
	  })
	  if (!options || !options.silent) {
	    this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); })
	  }
	};

	Store.prototype.dispatch = function dispatch (type, payload) {
	  // check object-style dispatch
	  if (isObject(type) && type.type) {
	    payload = type
	    type = type.type
	  }
	  var entry = this._actions[type]
	  if (!entry) {
	    console.error(("[vuex] unknown action type: " + type))
	    return
	  }
	  return entry.length > 1
	    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
	    : entry[0](payload)
	};

	Store.prototype.subscribe = function subscribe (fn) {
	  var subs = this._subscribers
	  if (subs.indexOf(fn) < 0) {
	    subs.push(fn)
	  }
	  return function () {
	    var i = subs.indexOf(fn)
	    if (i > -1) {
	      subs.splice(i, 1)
	    }
	  }
	};

	Store.prototype.watch = function watch (getter, cb, options) {
	    var this$1 = this;

	  assert(typeof getter === 'function', "store.watch only accepts a function.")
	  return this._watcherVM.$watch(function () { return getter(this$1.state); }, cb, options)
	};

	Store.prototype.replaceState = function replaceState (state) {
	    var this$1 = this;

	  this._withCommit(function () {
	    this$1._vm.state = state
	  })
	};

	Store.prototype.registerModule = function registerModule (path, module) {
	  if (typeof path === 'string') { path = [path] }
	  assert(Array.isArray(path), "module path must be a string or an Array.")
	  this._runtimeModules[path.join('.')] = module
	  installModule(this, this.state, path, module)
	  // reset store to update getters...
	  resetStoreVM(this, this.state)
	};

	Store.prototype.unregisterModule = function unregisterModule (path) {
	    var this$1 = this;

	  if (typeof path === 'string') { path = [path] }
	  assert(Array.isArray(path), "module path must be a string or an Array.")
	    delete this._runtimeModules[path.join('.')]
	  this._withCommit(function () {
	    var parentState = getNestedState(this$1.state, path.slice(0, -1))
	    Vue.delete(parentState, path[path.length - 1])
	  })
	  resetStore(this)
	};

	Store.prototype.hotUpdate = function hotUpdate (newOptions) {
	  updateModule(this._options, newOptions)
	  resetStore(this)
	};

	Store.prototype._withCommit = function _withCommit (fn) {
	  var committing = this._committing
	  this._committing = true
	  fn()
	  this._committing = committing
	};

	Object.defineProperties( Store.prototype, prototypeAccessors );

	function updateModule (targetModule, newModule) {
	  if (newModule.actions) {
	    targetModule.actions = newModule.actions
	  }
	  if (newModule.mutations) {
	    targetModule.mutations = newModule.mutations
	  }
	  if (newModule.getters) {
	    targetModule.getters = newModule.getters
	  }
	  if (newModule.modules) {
	    for (var key in newModule.modules) {
	      if (!(targetModule.modules && targetModule.modules[key])) {
	        console.warn(
	          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
	          'manual reload is needed'
	        )
	        return
	      }
	      updateModule(targetModule.modules[key], newModule.modules[key])
	    }
	  }
	}

	function resetStore (store) {
	  store._actions = Object.create(null)
	  store._mutations = Object.create(null)
	  store._wrappedGetters = Object.create(null)
	  var state = store.state
	  // init root module
	  installModule(store, state, [], store._options, true)
	  // init all runtime modules
	  Object.keys(store._runtimeModules).forEach(function (key) {
	    installModule(store, state, key.split('.'), store._runtimeModules[key], true)
	  })
	  // reset vm
	  resetStoreVM(store, state)
	}

	function resetStoreVM (store, state) {
	  var oldVm = store._vm

	  // bind store public getters
	  store.getters = {}
	  var wrappedGetters = store._wrappedGetters
	  var computed = {}
	  Object.keys(wrappedGetters).forEach(function (key) {
	    var fn = wrappedGetters[key]
	    // use computed to leverage its lazy-caching mechanism
	    computed[key] = function () { return fn(store); }
	    Object.defineProperty(store.getters, key, {
	      get: function () { return store._vm[key]; }
	    })
	  })

	  // use a Vue instance to store the state tree
	  // suppress warnings just in case the user has added
	  // some funky global mixins
	  var silent = Vue.config.silent
	  Vue.config.silent = true
	  store._vm = new Vue({
	    data: { state: state },
	    computed: computed
	  })
	  Vue.config.silent = silent

	  // enable strict mode for new vm
	  if (store.strict) {
	    enableStrictMode(store)
	  }

	  if (oldVm) {
	    // dispatch changes in all subscribed watchers
	    // to force getter re-evaluation.
	    store._withCommit(function () {
	      oldVm.state = null
	    })
	    Vue.nextTick(function () { return oldVm.$destroy(); })
	  }
	}

	function installModule (store, rootState, path, module, hot) {
	  var isRoot = !path.length
	  var state = module.state;
	  var actions = module.actions;
	  var mutations = module.mutations;
	  var getters = module.getters;
	  var modules = module.modules;

	  // set state
	  if (!isRoot && !hot) {
	    var parentState = getNestedState(rootState, path.slice(0, -1))
	    var moduleName = path[path.length - 1]
	    store._withCommit(function () {
	      Vue.set(parentState, moduleName, state || {})
	    })
	  }

	  if (mutations) {
	    Object.keys(mutations).forEach(function (key) {
	      registerMutation(store, key, mutations[key], path)
	    })
	  }

	  if (actions) {
	    Object.keys(actions).forEach(function (key) {
	      registerAction(store, key, actions[key], path)
	    })
	  }

	  if (getters) {
	    wrapGetters(store, getters, path)
	  }

	  if (modules) {
	    Object.keys(modules).forEach(function (key) {
	      installModule(store, rootState, path.concat(key), modules[key], hot)
	    })
	  }
	}

	function registerMutation (store, type, handler, path) {
	  if ( path === void 0 ) path = [];

	  var entry = store._mutations[type] || (store._mutations[type] = [])
	  entry.push(function wrappedMutationHandler (payload) {
	    handler(getNestedState(store.state, path), payload)
	  })
	}

	function registerAction (store, type, handler, path) {
	  if ( path === void 0 ) path = [];

	  var entry = store._actions[type] || (store._actions[type] = [])
	  var dispatch = store.dispatch;
	  var commit = store.commit;
	  entry.push(function wrappedActionHandler (payload, cb) {
	    var res = handler({
	      dispatch: dispatch,
	      commit: commit,
	      getters: store.getters,
	      state: getNestedState(store.state, path),
	      rootState: store.state
	    }, payload, cb)
	    if (!isPromise(res)) {
	      res = Promise.resolve(res)
	    }
	    if (store._devtoolHook) {
	      return res.catch(function (err) {
	        store._devtoolHook.emit('vuex:error', err)
	        throw err
	      })
	    } else {
	      return res
	    }
	  })
	}

	function wrapGetters (store, moduleGetters, modulePath) {
	  Object.keys(moduleGetters).forEach(function (getterKey) {
	    var rawGetter = moduleGetters[getterKey]
	    if (store._wrappedGetters[getterKey]) {
	      console.error(("[vuex] duplicate getter key: " + getterKey))
	      return
	    }
	    store._wrappedGetters[getterKey] = function wrappedGetter (store) {
	      return rawGetter(
	        getNestedState(store.state, modulePath), // local state
	        store.getters, // getters
	        store.state // root state
	      )
	    }
	  })
	}

	function enableStrictMode (store) {
	  store._vm.$watch('state', function () {
	    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.")
	  }, { deep: true, sync: true })
	}

	function getNestedState (state, path) {
	  return path.length
	    ? path.reduce(function (state, key) { return state[key]; }, state)
	    : state
	}

	function install (_Vue) {
	  if (Vue) {
	    console.error(
	      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
	    )
	    return
	  }
	  Vue = _Vue
	  applyMixin(Vue)
	}

	// auto install in dist mode
	if (typeof window !== 'undefined' && window.Vue) {
	  install(window.Vue)
	}

	var index = {
	  Store: Store,
	  install: install,
	  mapState: mapState,
	  mapMutations: mapMutations,
	  mapGetters: mapGetters,
	  mapActions: mapActions
	}

	return index;

	})));

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "board"
	  }, [_m(0), " ", _h('h2', [_s(leftMatched)])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('span', ["Pairs Left To Match"])
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-8", module.exports)
	  }
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(27)

	/* script */
	__vue_exports__ = __webpack_require__(29)

	/* template */
	var __vue_template__ = __webpack_require__(30)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-9"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-9", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-9", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Score.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(28);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-9&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Score.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-9&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Score.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "\n.score[data-v-9]{\n    width: 120px;\n    height: 100px;\n    padding: 10px;\n    background-color: #bbada0;\n    border-radius: 5px;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    align-items: center;\n    color: #eae0d1;\n}\nspan[data-v-9]{\n    font-size: 19px;\n    font-weight: bold;\n    display: block;\n    width: 100%;\n    text-align: center;\n}\nh2[data-v-9]{\n    color: #fff;\n}\n@media screen and (max-width: 450px) {\n.score[data-v-9]{\n        width: 105px;\n}\nspan[data-v-9]{\n        font-size: 17px;\n}\n}\n@media screen and (max-width: 380px) {\n.score[data-v-9]{\n        width: 95px;\n}\n}\n@media screen and (max-width: 360px) {\n.score[data-v-9]{\n        width: 90px;\n}\nspan[data-v-9]{\n        font-size: 15px;\n}\n}\n", ""]);

	// exports


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//

	var _vuex = __webpack_require__(24);

	exports.default = {
	    computed: _extends({}, (0, _vuex.mapGetters)(['highestSpeed']))
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "score"
	  }, [_m(0), " ", _h('h2', [_s(highestSpeed)])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('span', ["Highest Speed"])
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-9", module.exports)
	  }
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "status-bar"
	  }, [_h('Logo'), " ", _h('Match-info'), " ", _h('Score')])
	}},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2", module.exports)
	  }
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(33)

	/* script */
	__vue_exports__ = __webpack_require__(35)

	/* template */
	var __vue_template__ = __webpack_require__(51)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-3"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Chessboard.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(34);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Chessboard.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Chessboard.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "\n.chessboard[data-v-3]{\n    margin-top: 20px;\n    width: 100%;\n    background-color: #fff;\n    height: 530px;\n    border-radius: 4px;\n    padding: 10px 5px;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    align-items: center;\n    align-content: space-around;\n}\n.container[data-v-3]:nth-child(4n){\n    margin-right: 0px;\n}\n@media screen and (max-width: 450px) {\n.chessboard[data-v-3]{\n        height: 480px;\n        padding: 10px 0px;\n}\n}\n@media screen and (max-width: 370px) {\n.chessboard[data-v-3]{\n        height: 450px;\n}\n}\n", ""]);

	// exports


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//

	var _Card = __webpack_require__(36);

	var _Card2 = _interopRequireDefault(_Card);

	var _vuex = __webpack_require__(24);

	var _statusEnum = __webpack_require__(50);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	    data: function data() {
	        return {
	            lastCard: null
	        };
	    },

	    computed: _extends({}, (0, _vuex.mapGetters)(['leftMatched', 'cards', 'status'])),

	    methods: _extends({}, (0, _vuex.mapActions)(['updateStatus', 'match', 'flipCards']), {

	        onFlipped: function onFlipped(e) {
	            var _this = this;

	            if (this.status === _statusEnum.STATUS.READY) {
	                this.updateStatus(_statusEnum.STATUS.PLAYING);
	            }
	            if (!this.lastCard) {
	                return this.lastCard = e;
	            }
	            if (this.lastCard !== e && this.lastCard.cardName === e.cardName) {
	                this.lastCard = null;
	                this.match();
	                return this.leftMatched || this.updateStatus(_statusEnum.STATUS.PASS);
	            }
	            var lastCard = this.lastCard;
	            this.lastCard = null;
	            setTimeout(function () {
	                _this.flipCards([lastCard, e]);
	            }, 1000);
	        }

	    }),

	    components: { Card: _Card2.default }
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(37)

	/* script */
	__vue_exports__ = __webpack_require__(39)

	/* template */
	var __vue_template__ = __webpack_require__(40)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-10"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-10", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-10", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Card.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(38);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-10&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Card.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-10&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Card.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "\n.container[data-v-10]{\n    width: 100px;\n    height: 121px;\n    margin-right: 3px;\n    cursor: pointer;\n    position: relative;\n    perspective: 800px;\n}\n.card[data-v-10] {\n    width: 100%;\n    height: 100%;\n    transition: transform 1s;\n    transform-style: preserve-3d;\n}\n.card.flipped[data-v-10] {\n    transform: rotateY( 180deg );\n}\n.card img[data-v-10] {\n    display: block;\n    height: 100%;\n    width: 100%;\n    position: absolute;\n    backface-visibility: hidden;\n}\n.card .back[data-v-10] {\n    background: blue;\n    transform: rotateY( 0deg );\n}\n.card .front[data-v-10] {\n    background: blue;\n    transform: rotateY( 180deg );\n}\n@media screen and (max-width: 450px) {\n.container[data-v-10]{\n        width: 92px;\n        height: 111px;\n        margin-right: 1px;\n}\n}\n@media screen and (max-width: 380px) {\n.container[data-v-10]{\n        width: 85px;\n        height: 102px;\n        margin-right: 1px;\n}\n}\n@media screen and (max-width: 360px) {\n.container[data-v-10]{\n        width: 70px;\n        height: 84px;\n        margin-right: 1px;\n}\n}\n", ""]);

	// exports


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var _vuex = __webpack_require__(24);

	exports.default = {

	    props: {
	        option: {
	            type: Object,
	            default: function _default() {
	                return {
	                    flipped: false,
	                    cardName: ''
	                };
	            }
	        }
	    },

	    methods: _extends({}, (0, _vuex.mapActions)(['flipCard']), {
	        flip: function flip() {
	            if (this.option.flipped) {
	                return;
	            }
	            this.flipCard(this.option);
	            this.$emit('flipped', this.option);
	        }
	    }),

	    components: {}
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "container",
	    on: {
	      "click": flip
	    }
	  }, [_h('div', {
	    staticClass: "card",
	    class: {
	      flipped: option.flipped
	    }
	  }, [(option.cardName === '8-ball') ? _h('img', {
	    staticClass: "front",
	    attrs: {
	      "src": __webpack_require__(41)
	    }
	  }) : _e(), " ", (option.cardName === 'baked-potato') ? _h('img', {
	    staticClass: "front",
	    attrs: {
	      "src": __webpack_require__(42)
	    }
	  }) : _e(), " ", (option.cardName === 'dinosaur') ? _h('img', {
	    staticClass: "front",
	    attrs: {
	      "src": __webpack_require__(43)
	    }
	  }) : _e(), " ", (option.cardName === 'kronos') ? _h('img', {
	    staticClass: "front",
	    attrs: {
	      "src": __webpack_require__(44)
	    }
	  }) : _e(), " ", (option.cardName === 'rocket') ? _h('img', {
	    staticClass: "front",
	    attrs: {
	      "src": __webpack_require__(45)
	    }
	  }) : _e(), " ", (option.cardName === 'skinny-unicorn') ? _h('img', {
	    staticClass: "front",
	    attrs: {
	      "src": __webpack_require__(46)
	    }
	  }) : _e(), " ", (option.cardName === 'that-guy') ? _h('img', {
	    staticClass: "front",
	    attrs: {
	      "src": __webpack_require__(47)
	    }
	  }) : _e(), " ", (option.cardName === 'zeppelin') ? _h('img', {
	    staticClass: "front",
	    attrs: {
	      "src": __webpack_require__(48)
	    }
	  }) : _e(), " ", _m(0)])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('img', {
	    staticClass: "back",
	    attrs: {
	      "src": __webpack_require__(49)
	    }
	  })
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-10", module.exports)
	  }
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fef0ce08923e6a3abd942125fd954069.png";

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "77c1c93cf9edd4d87fc0978cdbec2cae.png";

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "b27bcc48c8318e00dc6e0a7c44c07223.png";

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f3aea3740c7db4b3f308e2df842ec934.png";

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "aad6324871f94894d63e73b3cc376730.png";

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "4a164a6ff3c659a8999eaa036e4f52d5.png";

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "c59e1bcb7ac7cf5fb2221392749df061.png";

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "cff45bfffdf53253d01b337b5def33c5.png";

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "6dba3655e10a58f2e52f702871c41250.png";

/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var STATUS = exports.STATUS = {
	    READY: 'READY',
	    PLAYING: 'PLAYING',
	    PASS: 'PASS'
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "chessboard"
	  }, [_l((cards), function(cart) {
	    return _h('Card', {
	      attrs: {
	        "option": cart
	      },
	      on: {
	        "flipped": onFlipped
	      }
	    })
	  })])
	}},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3", module.exports)
	  }
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(53)

	/* script */
	__vue_exports__ = __webpack_require__(55)

	/* template */
	var __vue_template__ = __webpack_require__(56)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-4"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-4", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] PlayStatus.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(54);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PlayStatus.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PlayStatus.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "\n.status-footer[data-v-4]{\n    position: relative;\n    margin-top: 10px;\n    width: 100%;\n    height: 20px;\n    line-height: 20px;\n    text-align: center;\n    font-size: 18px;\n    font-weight: bold;\n}\n.elapsed[data-v-4]{\n    position: absolute;\n    right: 10px;\n    font-size: 15px;\n    font-weight: normal;\n}\n", ""]);

	// exports


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//

	var _vuex = __webpack_require__(24);

	var _statusEnum = __webpack_require__(50);

	exports.default = {

	    data: function data() {
	        return _statusEnum.STATUS;
	    },

	    computed: _extends({}, (0, _vuex.mapGetters)(['userName', 'elapsedMs', 'status']))
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "status-footer"
	  }, [(status === READY) ? _h('span', [_s(userName)]) : _e(), " ", (status === PLAYING) ? _h('span', ["Playing"]) : _e(), " ", _h('span', {
	    staticClass: "elapsed"
	  }, [_s(elapsedMs) + " s"])])
	}},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4", module.exports)
	  }
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(58)

	/* script */
	__vue_exports__ = __webpack_require__(60)

	/* template */
	var __vue_template__ = __webpack_require__(66)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-5"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Rank.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(59);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Rank.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Rank.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "\n.rank[data-v-5]{\n    position: absolute;\n    left: 0;\n    top: 0;\n    z-index: 10;\n    width: 100%;\n    height: 100%;\n    padding: 10px;\n    display: flex;\n    flex-direction: column;\n    background-color: #faf8ef;\n}\n.header[data-v-5]{\n    border: 4px solid #BDBDBD;\n    border-radius: 2px;\n    height: 100px;\n    line-height: 100px;\n    text-align: center;\n    background-color: #5979ac;\n    color: #fff;\n}\n.content[data-v-5]{\n    padding: 5px;\n    margin-top: 20px;\n    border: 4px solid #BDBDBD;\n    border-radius: 2px;\n    height: 370px;\n}\n.footer[data-v-5]{\n    flex-grow: 2;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n.back-btn[data-v-5]{\n    width: 150px;\n    border-radius: 2px;\n    outline: none;\n    text-align: center;\n    text-decoration: none;\n}\n", ""]);

	// exports


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var _vuex = __webpack_require__(24);

	var _RankList = __webpack_require__(61);

	var _RankList2 = _interopRequireDefault(_RankList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {

	    computed: _extends({}, (0, _vuex.mapGetters)(['ranks'])),

	    methods: _extends({}, (0, _vuex.mapActions)(['reset'])),

	    components: { RankList: _RankList2.default }
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(62)

	/* script */
	__vue_exports__ = __webpack_require__(64)

	/* template */
	var __vue_template__ = __webpack_require__(65)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-11"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-11", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-11", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] RankList.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(63);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-11&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./RankList.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-11&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./RankList.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "\ntable[data-v-11]{\n    width: 100%;\n}\nthead[data-v-11]{\n    background-color: #bd2d30;\n    font-size: 18px;\n    color: #fff;\n}\ntbody tr[data-v-11]{\n    height: 30px;\n}\n", ""]);

	// exports


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var _vuex = __webpack_require__(24);

	exports.default = {
	    props: {
	        list: {
	            type: Array,
	            default: function _default() {
	                return [];
	            }
	        }
	    },

	    computed: _extends({}, (0, _vuex.mapGetters)(['userName']))
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('table', {
	    attrs: {
	      "align": "center"
	    }
	  }, [_m(0), " ", _h('tbody', [_l((list), function(rank, $index) {
	    return _h('tr', {
	      style: ({
	        backgroundColor: rank.username === userName ? 'yellow' : 'transparent'
	      })
	    }, [_h('td', {
	      attrs: {
	        "width": "10%",
	        "align": "center"
	      }
	    }, [_s($index + 1)]), " ", _h('td', {
	      attrs: {
	        "width": "70%",
	        "align": "center"
	      }
	    }, [_s(rank.username)]), " ", _h('td', {
	      attrs: {
	        "width": "20%",
	        "align": "center"
	      }
	    }, [_s(rank.speed)])])
	  })])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('thead', [_h('tr', [_h('th', {
	    attrs: {
	      "width": "10%"
	    }
	  }, ["No."]), " ", _h('th', {
	    attrs: {
	      "width": "70%"
	    }
	  }, ["Alias"]), " ", _h('th', {
	    attrs: {
	      "width": "20%"
	    }
	  }, ["Speed"])])])
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-11", module.exports)
	  }
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "rank"
	  }, [_m(0), " ", _h('div', {
	    staticClass: "content"
	  }, [_h('Rank-list', {
	    attrs: {
	      "list": ranks
	    }
	  })]), " ", _h('div', {
	    staticClass: "footer"
	  }, [_h('a', {
	    staticClass: "back-btn",
	    attrs: {
	      "href": ""
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        $event.stopPropagation();
	        reset($event)
	      }
	    }
	  }, ["Back To Game"])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('div', {
	    staticClass: "header"
	  }, [_h('h1', ["Hey Ranky！！"])])
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5", module.exports)
	  }
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(68)

	/* script */
	__vue_exports__ = __webpack_require__(70)

	/* template */
	var __vue_template__ = __webpack_require__(71)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-6"

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] NameInput.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(69);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NameInput.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6&scoped=true!./../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NameInput.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "\n.container[data-v-6]{\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    background-color: rgba(164, 164, 164, 0.7);\n    top: 0;\n    left: 0;\n    z-index: 10;\n}\n.naming[data-v-6]{\n    width: 250px;\n    height: 100px;\n    border: 4px solid #BDBDBD;\n    border-radius: 2px;\n    padding: 10px;\n    position: absolute;\n    top: 50%;\n    margin-top: -50px;\n    left: 50%;\n    margin-left: -125px;\n    background-color: #faf8ef;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n}\nh3[data-v-6]{\n    margin-bottom: 10px;\n}\ninput[data-v-6]{\n    width: 200px;\n    height: 25px;\n    line-height: 25px;\n    padding: 2px;\n}\n\n", ""]);

	// exports


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//

	var _vuex = __webpack_require__(24);

	exports.default = {
	    data: function data() {
	        return {
	            name: this.userName
	        };
	    },

	    computed: _extends({}, (0, _vuex.mapGetters)(['userName'])),

	    methods: _extends({}, (0, _vuex.mapActions)(['toggleRank', 'toggleNameInput', 'updateUserName', 'updateRank']), {
	        modifyName: function modifyName() {
	            if (!this.name) {
	                return;
	            }
	            this.updateUserName(this.name);
	            this.updateRank();
	            this.toggleRank(true);
	            this.toggleNameInput(false);
	        }
	    })
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "container"
	  }, [_h('div', {
	    staticClass: "naming"
	  }, [_m(0), " ", _h('input', {
	    directives: [{
	      name: "model",
	      value: (name),
	      expression: "name"
	    }],
	    attrs: {
	      "type": "text",
	      "autofocus": "true"
	    },
	    domProps: {
	      "value": _s(name)
	    },
	    on: {
	      "keyup": function($event) {
	        if ($event.keyCode !== 13) return;
	        modifyName($event)
	      },
	      "input": function($event) {
	        if ($event.target.composing) return;
	        name = $event.target.value
	      }
	    }
	  })])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('h3', ["Your Name"])
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-6", module.exports)
	  }
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "game-panel"
	  }, [_h('Dashboard'), " ", _h('Chessboard'), " ", _h('Status'), " ", (displayRank) ? _h('Rank') : _e(), " ", (displayNameInput) ? _h('Name-input') : _e()])
	}},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1", module.exports)
	  }
	}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vue = __webpack_require__(5);

	var _vue2 = _interopRequireDefault(_vue);

	var _vuex = __webpack_require__(24);

	var _vuex2 = _interopRequireDefault(_vuex);

	var _actions = __webpack_require__(74);

	var _actions2 = _interopRequireDefault(_actions);

	var _getters = __webpack_require__(114);

	var _getters2 = _interopRequireDefault(_getters);

	var _mutations = __webpack_require__(115);

	var _mutations2 = _interopRequireDefault(_mutations);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//have vuex involved
	_vue2.default.use(_vuex2.default);

	var state = {
	    leftMatched: 0,
	    highestSpeed: 0,
	    status: '',
	    cards: [],
	    elapsedMs: 0,
	    displayRank: false,
	    displayNameInput: false,
	    ranks: [],
	    userName: ''
	};

	exports.default = new _vuex2.default.Store({
	    state: state,
	    actions: _actions2.default,
	    mutations: _mutations2.default,
	    getters: _getters2.default,
	    strict: ("production") !== 'production'
	});

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _shuffle = __webpack_require__(75);

	var _statusEnum = __webpack_require__(50);

	var _wilddog = __webpack_require__(76);

	var _wilddog2 = _interopRequireDefault(_wilddog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var cardNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn', 'that-guy', 'zeppelin'];

	var timerId = void 0,
	    ref = void 0;

	var config = { syncURL: 'https://memorygame.wilddogio.com' };

	var statusHandler = {
	    PLAYING: function PLAYING(_ref) {
	        var commit = _ref.commit;

	        timerId = setInterval(function () {
	            commit('counting');
	        }, 1000);
	    },

	    PASS: function PASS(_ref2) {
	        var commit = _ref2.commit;

	        clearInterval(timerId);
	        commit('updateHighestSpeed');
	        commit('toggleNameInput', true);
	    }
	};

	exports.default = {
	    reset: function reset(_ref3) {
	        var commit = _ref3.commit;

	        commit('reset', {
	            leftMatched: 8,
	            highestSpeed: localStorage.getItem('highestSpeed') || 9999,
	            status: _statusEnum.STATUS.READY,
	            cards: (0, _shuffle.shuffle)(cardNames.concat(cardNames)).map(function (name) {
	                return { flipped: false, cardName: name };
	            }),
	            elapsedMs: 0,
	            displayRank: false,
	            displayNameInput: false,
	            ranks: [],
	            userName: localStorage.getItem('userName') || ''
	        });
	    },

	    updateStatus: function updateStatus(context, status) {
	        context.commit('updateStatus', status);
	        statusHandler[status] && statusHandler[status](context);
	    },

	    setupServerChannel: function setupServerChannel(_ref4) {
	        var commit = _ref4.commit;

	        _wilddog2.default.initializeApp(config);
	        ref = _wilddog2.default.sync().ref('users');
	        ref.orderByChild('speed').limitToFirst(10).on('value', function (data) {

	            var ranks = [];
	            var obj = data.val();
	            if (!obj) {
	                return;
	            }
	            var keys = Object.keys(obj);

	            for (var i = 0; i < keys.length; i++) {
	                ranks.push(obj[keys[i]]);
	            }
	            ranks.sort(function (a, b) {
	                return a.speed - b.speed;
	            });
	            commit('updateRanks', ranks);
	        }, function (err) {
	            console.log('error', err);
	        });
	    },

	    updateUserName: function updateUserName(_ref5, name) {
	        var commit = _ref5.commit;

	        commit('updateUsername', name);
	    },

	    flipCard: function flipCard(_ref6, card) {
	        var commit = _ref6.commit;

	        commit('flip', card);
	    },

	    flipCards: function flipCards(_ref7, cards) {
	        var commit = _ref7.commit;

	        commit('flips', cards);
	    },

	    match: function match(_ref8) {
	        var commit = _ref8.commit;

	        commit('decreaseMatch');
	    },

	    toggleRank: function toggleRank(_ref9, boo) {
	        var commit = _ref9.commit;

	        commit('toggleRank', boo);
	    },

	    toggleNameInput: function toggleNameInput(_ref10, boo) {
	        var commit = _ref10.commit;

	        commit('toggleNameInput', boo);
	    },

	    updateRank: function updateRank(_ref11) {
	        var state = _ref11.state;
	        var commit = _ref11.commit;

	        ref.child(state.userName).set({
	            username: state.userName,
	            speed: state.elapsedMs
	        });
	    }
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var shuffle = exports.shuffle = function shuffle(arr) {
	    var newArr = arr.slice();
	    for (var i = newArr.length; i; i -= 1) {
	        var j = Math.floor(Math.random() * i);
	        var x = newArr[i - 1];
	        newArr[i - 1] = newArr[j];
	        newArr[j] = x;
	    }
	    return newArr;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function(){var define=null;!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.eio=e()}}(function(){var e;return function t(e,r,n){function o(i,a){if(!r[i]){if(!e[i]){var c="function"==typeof require&&require;if(!a&&c)return require(i,!0);if(s)return s(i,!0);var p=new Error("Cannot find module '"+i+"'");throw p.code="MODULE_NOT_FOUND",p}var u=r[i]={exports:{}};e[i][0].call(u.exports,function(t){var r=e[i][1][t];return o(r?r:t)},u,u.exports,t,e,r,n)}return r[i].exports}for(var s="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(e,t,r){t.exports=e("./lib/")},{"./lib/":2}],2:[function(e,t,r){t.exports=e("./socket"),t.exports.parser=e("engine.io-parser")},{"./socket":3,"engine.io-parser":20}],3:[function(e,t,r){(function(r){function n(e,t){if(!(this instanceof n))return new n(e,t);t=t||{},e&&"object"==typeof e&&(t=e,e=null),e?(e=u(e),t.hostname=e.host,t.secure="https"==e.protocol||"wss"==e.protocol,t.port=e.port,e.query&&(t.query=e.query)):t.host&&(t.hostname=u(t.host).host),this.secure=null!=t.secure?t.secure:r.location&&"https:"==location.protocol,t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.agent=t.agent||!1,this.hostname=t.hostname||(r.location?location.hostname:"localhost"),this.port=t.port||(r.location&&location.port?location.port:this.secure?443:80),this.query=t.query||{},"string"==typeof this.query&&(this.query=f.decode(this.query)),this.upgrade=!1!==t.upgrade,this.path=(t.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!t.forceJSONP,this.jsonp=!1!==t.jsonp,this.forceBase64=!!t.forceBase64,this.enablesXDR=!!t.enablesXDR,this.timestampParam=t.timestampParam||"t",this.timestampRequests=t.timestampRequests,this.transports=t.transports||["polling","websocket"],this.readyState="",this.writeBuffer=[],this.policyPort=t.policyPort||843,this.rememberUpgrade=t.rememberUpgrade||!1,this.binaryType=null,this.onlyBinaryUpgrades=t.onlyBinaryUpgrades,this.perMessageDeflate=!1!==t.perMessageDeflate&&(t.perMessageDeflate||{}),!0===this.perMessageDeflate&&(this.perMessageDeflate={}),this.perMessageDeflate&&null==this.perMessageDeflate.threshold&&(this.perMessageDeflate.threshold=1024),this.pfx=t.pfx||null,this.key=t.key||null,this.passphrase=t.passphrase||null,this.cert=t.cert||null,this.ca=t.ca||null,this.ciphers=t.ciphers||null,this.rejectUnauthorized=void 0===t.rejectUnauthorized||t.rejectUnauthorized;var o="object"==typeof r&&r;o.global===o&&t.extraHeaders&&Object.keys(t.extraHeaders).length>0&&(this.extraHeaders=t.extraHeaders),this.open()}function o(e){var t={};for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);return t}var s=e("./transports"),i=e("component-emitter"),a=e("debug")("engine.io-client:socket"),c=e("indexof"),p=e("engine.io-parser"),u=e("parseuri"),h=e("parsejson"),f=e("parseqs");t.exports=n,n.priorWebsocketSuccess=!1,i(n.prototype),n.protocol=p.protocol,n.Socket=n,n.Transport=e("./transport"),n.transports=e("./transports"),n.parser=e("engine.io-parser"),n.prototype.createTransport=function(e){a('creating transport "%s"',e);var t=o(this.query);t.EIO=p.protocol,t.transport=e,this.id&&(t.sid=this.id);var r=new s[e]({agent:this.agent,hostname:this.hostname,port:this.port,secure:this.secure,path:this.path,query:t,forceJSONP:this.forceJSONP,jsonp:this.jsonp,forceBase64:this.forceBase64,enablesXDR:this.enablesXDR,timestampRequests:this.timestampRequests,timestampParam:this.timestampParam,policyPort:this.policyPort,socket:this,pfx:this.pfx,key:this.key,passphrase:this.passphrase,cert:this.cert,ca:this.ca,ciphers:this.ciphers,rejectUnauthorized:this.rejectUnauthorized,perMessageDeflate:this.perMessageDeflate,extraHeaders:this.extraHeaders});return r},n.prototype.open=function(){var e;if(this.rememberUpgrade&&n.priorWebsocketSuccess&&this.transports.indexOf("websocket")!=-1)e="websocket";else{if(0===this.transports.length){var t=this;return void setTimeout(function(){t.emit("error","No transports available")},0)}e=this.transports[0]}this.readyState="opening";try{e=this.createTransport(e)}catch(r){return this.transports.shift(),void this.open()}e.open(),this.setTransport(e)},n.prototype.setTransport=function(e){a("setting transport %s",e.name);var t=this;this.transport&&(a("clearing existing transport %s",this.transport.name),this.transport.removeAllListeners()),this.transport=e,e.on("drain",function(){t.onDrain()}).on("packet",function(e){t.onPacket(e)}).on("error",function(e){t.onError(e)}).on("close",function(){t.onClose("transport close")})},n.prototype.probe=function(e){function t(){if(f.onlyBinaryUpgrades){var t=!this.supportsBinary&&f.transport.supportsBinary;h=h||t}h||(a('probe transport "%s" opened',e),u.send([{type:"ping",data:"probe"}]),u.once("packet",function(t){if(!h)if("pong"==t.type&&"probe"==t.data){if(a('probe transport "%s" pong',e),f.upgrading=!0,f.emit("upgrading",u),!u)return;n.priorWebsocketSuccess="websocket"==u.name,a('pausing current transport "%s"',f.transport.name),f.transport.pause(function(){h||"closed"!=f.readyState&&(a("changing transport and sending upgrade packet"),p(),f.setTransport(u),u.send([{type:"upgrade"}]),f.emit("upgrade",u),u=null,f.upgrading=!1,f.flush())})}else{a('probe transport "%s" failed',e);var r=new Error("probe error");r.transport=u.name,f.emit("upgradeError",r)}}))}function r(){h||(h=!0,p(),u.close(),u=null)}function o(t){var n=new Error("probe error: "+t);n.transport=u.name,r(),a('probe transport "%s" failed because of error: %s',e,t),f.emit("upgradeError",n)}function s(){o("transport closed")}function i(){o("socket closed")}function c(e){u&&e.name!=u.name&&(a('"%s" works - aborting "%s"',e.name,u.name),r())}function p(){u.removeListener("open",t),u.removeListener("error",o),u.removeListener("close",s),f.removeListener("close",i),f.removeListener("upgrading",c)}a('probing transport "%s"',e);var u=this.createTransport(e,{probe:1}),h=!1,f=this;n.priorWebsocketSuccess=!1,u.once("open",t),u.once("error",o),u.once("close",s),this.once("close",i),this.once("upgrading",c),u.open()},n.prototype.onOpen=function(){if(a("socket open"),this.readyState="open",n.priorWebsocketSuccess="websocket"==this.transport.name,this.emit("open"),this.flush(),"open"==this.readyState&&this.upgrade&&this.transport.pause){a("starting upgrade probes");for(var e=0,t=this.upgrades.length;e<t;e++)this.probe(this.upgrades[e])}},n.prototype.onPacket=function(e){if("opening"==this.readyState||"open"==this.readyState)switch(a('socket receive: type "%s", data "%s"',e.type,e.data),this.emit("packet",e),this.emit("heartbeat"),e.type){case"open":this.onHandshake(h(e.data));break;case"pong":this.setPing(),this.emit("pong");break;case"error":var t=new Error("server error");t.code=e.data,this.onError(t);break;case"message":this.emit("data",e.data),this.emit("message",e.data)}else a('packet received with socket readyState "%s"',this.readyState)},n.prototype.onHandshake=function(e){this.emit("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this.upgrades=this.filterUpgrades(e.upgrades),this.pingInterval=e.pingInterval,this.pingTimeout=e.pingTimeout,this.onOpen(),"closed"!=this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))},n.prototype.onHeartbeat=function(e){clearTimeout(this.pingTimeoutTimer);var t=this;t.pingTimeoutTimer=setTimeout(function(){"closed"!=t.readyState&&t.onClose("ping timeout")},e||t.pingInterval+t.pingTimeout)},n.prototype.setPing=function(){var e=this;clearTimeout(e.pingIntervalTimer),e.pingIntervalTimer=setTimeout(function(){a("writing ping packet - expecting pong within %sms",e.pingTimeout),e.ping(),e.onHeartbeat(e.pingTimeout)},e.pingInterval)},n.prototype.ping=function(){var e=this;this.sendPacket("ping",function(){e.emit("ping")})},n.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()},n.prototype.flush=function(){"closed"!=this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(a("flushing %d packets in socket",this.writeBuffer.length),this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))},n.prototype.write=n.prototype.send=function(e,t,r){return this.sendPacket("message",e,t,r),this},n.prototype.sendPacket=function(e,t,r,n){if("function"==typeof t&&(n=t,t=void 0),"function"==typeof r&&(n=r,r=null),"closing"!=this.readyState&&"closed"!=this.readyState){r=r||{},r.compress=!1!==r.compress;var o={type:e,data:t,options:r};this.emit("packetCreate",o),this.writeBuffer.push(o),n&&this.once("flush",n),this.flush()}},n.prototype.close=function(){function e(){n.onClose("forced close"),a("socket closing - telling transport to close"),n.transport.close()}function t(){n.removeListener("upgrade",t),n.removeListener("upgradeError",t),e()}function r(){n.once("upgrade",t),n.once("upgradeError",t)}if("opening"==this.readyState||"open"==this.readyState){this.readyState="closing";var n=this;this.writeBuffer.length?this.once("drain",function(){this.upgrading?r():e()}):this.upgrading?r():e()}return this},n.prototype.onError=function(e){a("socket error %j",e),n.priorWebsocketSuccess=!1,this.emit("error",e),this.onClose("transport error",e)},n.prototype.onClose=function(e,t){if("opening"==this.readyState||"open"==this.readyState||"closing"==this.readyState){a('socket close with reason: "%s"',e);var r=this;clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",e,t),r.writeBuffer=[],r.prevBufferLen=0}},n.prototype.filterUpgrades=function(e){for(var t=[],r=0,n=e.length;r<n;r++)~c(this.transports,e[r])&&t.push(e[r]);return t}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{"./transport":4,"./transports":5,"component-emitter":16,debug:18,"engine.io-parser":20,indexof:24,parsejson:27,parseqs:28,parseuri:29}],4:[function(e,t,r){function n(e){this.path=e.path,this.hostname=e.hostname,this.port=e.port,this.secure=e.secure,this.query=e.query,this.timestampParam=e.timestampParam,this.timestampRequests=e.timestampRequests,this.readyState="",this.agent=e.agent||!1,this.socket=e.socket,this.enablesXDR=e.enablesXDR,this.pfx=e.pfx,this.key=e.key,this.passphrase=e.passphrase,this.cert=e.cert,this.ca=e.ca,this.ciphers=e.ciphers,this.rejectUnauthorized=e.rejectUnauthorized,this.extraHeaders=e.extraHeaders}var o=e("engine.io-parser"),s=e("component-emitter");t.exports=n,s(n.prototype),n.prototype.onError=function(e,t){var r=new Error(e);return r.type="TransportError",r.description=t,this.emit("error",r),this},n.prototype.open=function(){return"closed"!=this.readyState&&""!=this.readyState||(this.readyState="opening",this.doOpen()),this},n.prototype.close=function(){return"opening"!=this.readyState&&"open"!=this.readyState||(this.doClose(),this.onClose()),this},n.prototype.send=function(e){if("open"!=this.readyState)throw new Error("Transport not open");this.write(e)},n.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open")},n.prototype.onData=function(e){var t=o.decodePacket(e,this.socket.binaryType);this.onPacket(t)},n.prototype.onPacket=function(e){this.emit("packet",e)},n.prototype.onClose=function(){this.readyState="closed",this.emit("close")}},{"component-emitter":16,"engine.io-parser":20}],5:[function(e,t,r){(function(t){function n(e){var r,n=!1,a=!1,c=!1!==e.jsonp;if(t.location){var p="https:"==location.protocol,u=location.port;u||(u=p?443:80),n=e.hostname!=location.hostname||u!=e.port,a=e.secure!=p}if(e.xdomain=n,e.xscheme=a,r=new o(e),"open"in r&&!e.forceJSONP)return new s(e);if(!c)throw new Error("JSONP disabled");return new i(e)}var o=e("xmlhttprequest-ssl"),s=e("./polling-xhr"),i=e("./polling-jsonp"),a=e("./websocket");r.polling=n,r.websocket=a}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{"./polling-jsonp":6,"./polling-xhr":7,"./websocket":9,"xmlhttprequest-ssl":10}],6:[function(e,t,r){(function(r){function n(){}function o(e){s.call(this,e),this.query=this.query||{},a||(r.___eio||(r.___eio=[]),a=r.___eio),this.index=a.length;var t=this;a.push(function(e){t.onData(e)}),this.query.j=this.index,r.document&&r.addEventListener&&r.addEventListener("beforeunload",function(){t.script&&(t.script.onerror=n)},!1)}var s=e("./polling"),i=e("component-inherit");t.exports=o;var a,c=/\n/g,p=/\\n/g;i(o,s),o.prototype.supportsBinary=!1,o.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),s.prototype.doClose.call(this)},o.prototype.doPoll=function(){var e=this,t=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),t.async=!0,t.src=this.uri(),t.onerror=function(t){e.onError("jsonp poll error",t)};var r=document.getElementsByTagName("script")[0];r?r.parentNode.insertBefore(t,r):(document.head||document.body).appendChild(t),this.script=t;var n="undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent);n&&setTimeout(function(){var e=document.createElement("iframe");document.body.appendChild(e),document.body.removeChild(e)},100)},o.prototype.doWrite=function(e,t){function r(){n(),t()}function n(){if(o.iframe)try{o.form.removeChild(o.iframe)}catch(e){o.onError("jsonp polling iframe removal error",e)}try{var t='<iframe src="javascript:0" name="'+o.iframeId+'">';s=document.createElement(t)}catch(e){s=document.createElement("iframe"),s.name=o.iframeId,s.src="javascript:0"}s.id=o.iframeId,o.form.appendChild(s),o.iframe=s}var o=this;if(!this.form){var s,i=document.createElement("form"),a=document.createElement("textarea"),u=this.iframeId="eio_iframe_"+this.index;i.className="socketio",i.style.position="absolute",i.style.top="-1000px",i.style.left="-1000px",i.target=u,i.method="POST",i.setAttribute("accept-charset","utf-8"),a.name="d",i.appendChild(a),document.body.appendChild(i),this.form=i,this.area=a}this.form.action=this.uri(),n(),e=e.replace(p,"\\\n"),this.area.value=e.replace(c,"\\n");try{this.form.submit()}catch(h){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"==o.iframe.readyState&&r()}:this.iframe.onload=r}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{"./polling":8,"component-inherit":17}],7:[function(e,t,r){(function(r){function n(){}function o(e){if(c.call(this,e),r.location){var t="https:"==location.protocol,n=location.port;n||(n=t?443:80),this.xd=e.hostname!=r.location.hostname||n!=e.port,this.xs=e.secure!=t}else this.extraHeaders=e.extraHeaders}function s(e){this.method=e.method||"GET",this.uri=e.uri,this.xd=!!e.xd,this.xs=!!e.xs,this.async=!1!==e.async,this.data=void 0!=e.data?e.data:null,this.agent=e.agent,this.isBinary=e.isBinary,this.supportsBinary=e.supportsBinary,this.enablesXDR=e.enablesXDR,this.pfx=e.pfx,this.key=e.key,this.passphrase=e.passphrase,this.cert=e.cert,this.ca=e.ca,this.ciphers=e.ciphers,this.rejectUnauthorized=e.rejectUnauthorized,this.extraHeaders=e.extraHeaders,this.create()}function i(){for(var e in s.requests)s.requests.hasOwnProperty(e)&&s.requests[e].abort()}var a=e("xmlhttprequest-ssl"),c=e("./polling"),p=e("component-emitter"),u=e("component-inherit"),h=e("debug")("engine.io-client:polling-xhr");t.exports=o,t.exports.Request=s,u(o,c),o.prototype.supportsBinary=!0,o.prototype.request=function(e){return e=e||{},e.uri=this.uri(),e.xd=this.xd,e.xs=this.xs,e.agent=this.agent||!1,e.supportsBinary=this.supportsBinary,e.enablesXDR=this.enablesXDR,e.pfx=this.pfx,e.key=this.key,e.passphrase=this.passphrase,e.cert=this.cert,e.ca=this.ca,e.ciphers=this.ciphers,e.rejectUnauthorized=this.rejectUnauthorized,e.extraHeaders=this.extraHeaders,new s(e)},o.prototype.doWrite=function(e,t){var r="string"!=typeof e&&void 0!==e,n=this.request({method:"POST",data:e,isBinary:r}),o=this;n.on("success",t),n.on("error",function(e){o.onError("xhr post error",e)}),this.sendXhr=n},o.prototype.doPoll=function(){h("xhr poll");var e=this.request(),t=this;e.on("data",function(e){t.onData(e)}),e.on("error",function(e){t.onError("xhr poll error",e)}),this.pollXhr=e},p(s.prototype),s.prototype.create=function(){var e={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};e.pfx=this.pfx,e.key=this.key,e.passphrase=this.passphrase,e.cert=this.cert,e.ca=this.ca,e.ciphers=this.ciphers,e.rejectUnauthorized=this.rejectUnauthorized;var t=this.xhr=new a(e),n=this;try{h("xhr open %s: %s",this.method,this.uri),t.open(this.method,this.uri,this.async);try{if(this.extraHeaders){t.setDisableHeaderCheck(!0);for(var o in this.extraHeaders)this.extraHeaders.hasOwnProperty(o)&&t.setRequestHeader(o,this.extraHeaders[o])}}catch(i){}if(this.supportsBinary&&(t.responseType="arraybuffer"),"POST"==this.method)try{this.isBinary?t.setRequestHeader("Content-type","application/octet-stream"):t.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(i){}"withCredentials"in t&&(t.withCredentials=!0),this.hasXDR()?(t.onload=function(){n.onLoad()},t.onerror=function(){n.onError(t.responseText)}):t.onreadystatechange=function(){4==t.readyState&&(200==t.status||1223==t.status?n.onLoad():setTimeout(function(){n.onError(t.status)},0))},h("xhr data %s",this.data),t.send(this.data)}catch(i){return void setTimeout(function(){n.onError(i)},0)}r.document&&(this.index=s.requestsCount++,s.requests[this.index]=this)},s.prototype.onSuccess=function(){this.emit("success"),this.cleanup()},s.prototype.onData=function(e){this.emit("data",e),this.onSuccess()},s.prototype.onError=function(e){this.emit("error",e),this.cleanup(!0)},s.prototype.cleanup=function(e){if("undefined"!=typeof this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=n:this.xhr.onreadystatechange=n,e)try{this.xhr.abort()}catch(t){}r.document&&delete s.requests[this.index],this.xhr=null}},s.prototype.onLoad=function(){var e;try{var t;try{t=this.xhr.getResponseHeader("Content-Type").split(";")[0]}catch(r){}if("application/octet-stream"===t)e=this.xhr.response;else if(this.supportsBinary)try{e=String.fromCharCode.apply(null,new Uint8Array(this.xhr.response))}catch(r){for(var n=new Uint8Array(this.xhr.response),o=[],s=0,i=n.length;s<i;s++)o.push(n[s]);e=String.fromCharCode.apply(null,o)}else e=this.xhr.responseText}catch(r){this.onError(r)}null!=e&&this.onData(e)},s.prototype.hasXDR=function(){return"undefined"!=typeof r.XDomainRequest&&!this.xs&&this.enablesXDR},s.prototype.abort=function(){this.cleanup()},r.document&&(s.requestsCount=0,s.requests={},r.attachEvent?r.attachEvent("onunload",i):r.addEventListener&&r.addEventListener("beforeunload",i,!1))}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{"./polling":8,"component-emitter":16,"component-inherit":17,debug:18,"xmlhttprequest-ssl":10}],8:[function(e,t,r){function n(e){var t=e&&e.forceBase64;u&&!t||(this.supportsBinary=!1),o.call(this,e)}var o=e("../transport"),s=e("parseqs"),i=e("engine.io-parser"),a=e("component-inherit"),c=e("yeast"),p=e("debug")("engine.io-client:polling");t.exports=n;var u=function(){var t=e("xmlhttprequest-ssl"),r=new t({xdomain:!1});return null!=r.responseType}();a(n,o),n.prototype.name="polling",n.prototype.doOpen=function(){this.poll()},n.prototype.pause=function(e){function t(){p("paused"),r.readyState="paused",e()}var r=this;if(this.readyState="pausing",this.polling||!this.writable){var n=0;this.polling&&(p("we are currently polling - waiting to pause"),n++,this.once("pollComplete",function(){p("pre-pause polling complete"),--n||t()})),this.writable||(p("we are currently writing - waiting to pause"),n++,this.once("drain",function(){p("pre-pause writing complete"),--n||t()}))}else t()},n.prototype.poll=function(){p("polling"),this.polling=!0,this.doPoll(),this.emit("poll")},n.prototype.onData=function(e){var t=this;p("polling got data %s",e);var r=function(e,r,n){return"opening"==t.readyState&&t.onOpen(),"close"==e.type?(t.onClose(),!1):void t.onPacket(e)};i.decodePayload(e,this.socket.binaryType,r),"closed"!=this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"==this.readyState?this.poll():p('ignoring poll - transport state "%s"',this.readyState))},n.prototype.doClose=function(){function e(){p("writing close packet"),t.write([{type:"close"}])}var t=this;"open"==this.readyState?(p("transport open - closing"),e()):(p("transport not open - deferring close"),this.once("open",e))},n.prototype.write=function(e){var t=this;this.writable=!1;var r=function(){t.writable=!0,t.emit("drain")},t=this;i.encodePayload(e,this.supportsBinary,function(e){t.doWrite(e,r)})},n.prototype.uri=function(){var e=this.query||{},t=this.secure?"https":"http",r="";!1!==this.timestampRequests&&(e[this.timestampParam]=c()),this.supportsBinary||e.sid||(e.b64=1),e=s.encode(e),this.port&&("https"==t&&443!=this.port||"http"==t&&80!=this.port)&&(r=":"+this.port),e.length&&(e="?"+e);var n=this.hostname.indexOf(":")!==-1;return t+"://"+(n?"["+this.hostname+"]":this.hostname)+r+this.path+e}},{"../transport":4,"component-inherit":17,debug:18,"engine.io-parser":20,parseqs:28,"xmlhttprequest-ssl":10,yeast:31}],9:[function(e,t,r){(function(r){function n(e){var t=e&&e.forceBase64;t&&(this.supportsBinary=!1),this.perMessageDeflate=e.perMessageDeflate,o.call(this,e)}var o=e("../transport"),s=e("engine.io-parser"),i=e("parseqs"),a=e("component-inherit"),c=e("yeast"),p=e("debug")("engine.io-client:websocket"),u=r.WebSocket||r.MozWebSocket,h=u;if(!h&&"undefined"==typeof window)try{h=e("ws")}catch(f){}t.exports=n,a(n,o),n.prototype.name="websocket",n.prototype.supportsBinary=!0,n.prototype.doOpen=function(){if(this.check()){var e=this.uri(),t=void 0,r={agent:this.agent,perMessageDeflate:this.perMessageDeflate};r.pfx=this.pfx,r.key=this.key,r.passphrase=this.passphrase,r.cert=this.cert,r.ca=this.ca,r.ciphers=this.ciphers,r.rejectUnauthorized=this.rejectUnauthorized,this.extraHeaders&&(r.headers=this.extraHeaders),this.ws=u?new h(e):new h(e,t,r),void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.supports&&this.ws.supports.binary?(this.supportsBinary=!0,this.ws.binaryType="buffer"):this.ws.binaryType="arraybuffer",this.addEventListeners()}},n.prototype.addEventListeners=function(){var e=this;this.ws.onopen=function(){e.onOpen()},this.ws.onclose=function(){e.onClose()},this.ws.onmessage=function(t){e.onData(t.data)},this.ws.onerror=function(t){e.onError("websocket error",t)}},"undefined"!=typeof navigator&&/iPad|iPhone|iPod/i.test(navigator.userAgent)&&(n.prototype.onData=function(e){var t=this;setTimeout(function(){o.prototype.onData.call(t,e)},0)}),n.prototype.write=function(e){function t(){n.emit("flush"),setTimeout(function(){n.writable=!0,n.emit("drain")},0)}var n=this;this.writable=!1;for(var o=e.length,i=0,a=o;i<a;i++)!function(e){s.encodePacket(e,n.supportsBinary,function(s){if(!u){var i={};if(e.options&&(i.compress=e.options.compress),n.perMessageDeflate){var a="string"==typeof s?r.Buffer.byteLength(s):s.length;a<n.perMessageDeflate.threshold&&(i.compress=!1)}}try{u?n.ws.send(s):n.ws.send(s,i)}catch(c){p("websocket closed before onclose event")}--o||t()})}(e[i])},n.prototype.onClose=function(){o.prototype.onClose.call(this)},n.prototype.doClose=function(){"undefined"!=typeof this.ws&&this.ws.close()},n.prototype.uri=function(){var e=this.query||{},t=this.secure?"wss":"ws",r="";this.port&&("wss"==t&&443!=this.port||"ws"==t&&80!=this.port)&&(r=":"+this.port),this.timestampRequests&&(e[this.timestampParam]=c()),this.supportsBinary||(e.b64=1),e=i.encode(e),e.length&&(e="?"+e);var n=this.hostname.indexOf(":")!==-1;return t+"://"+(n?"["+this.hostname+"]":this.hostname)+r+this.path+e},n.prototype.check=function(){return!(!h||"__initialize"in h&&this.name===n.prototype.name)}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{"../transport":4,"component-inherit":17,debug:18,"engine.io-parser":20,parseqs:28,ws:15,yeast:31}],10:[function(e,t,r){var n=e("has-cors");t.exports=function(e){var t=e.xdomain,r=e.xscheme,o=e.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!t||n))return new XMLHttpRequest}catch(s){}try{if("undefined"!=typeof XDomainRequest&&!r&&o)return new XDomainRequest}catch(s){}if(!t)try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(s){}}},{"has-cors":23}],11:[function(e,t,r){function n(e,t,r){function n(e,o){if(n.count<=0)throw new Error("after called too many times");--n.count,e?(s=!0,t(e),t=r):0!==n.count||s||t(null,o)}var s=!1;return r=r||o,n.count=e,0===e?t():n}function o(){}t.exports=n},{}],12:[function(e,t,r){t.exports=function(e,t,r){var n=e.byteLength;if(t=t||0,r=r||n,e.slice)return e.slice(t,r);if(t<0&&(t+=n),r<0&&(r+=n),r>n&&(r=n),t>=n||t>=r||0===n)return new ArrayBuffer(0);for(var o=new Uint8Array(e),s=new Uint8Array(r-t),i=t,a=0;i<r;i++,a++)s[a]=o[i];return s.buffer}},{}],13:[function(e,t,r){!function(e){"use strict";r.encode=function(t){var r,n=new Uint8Array(t),o=n.length,s="";for(r=0;r<o;r+=3)s+=e[n[r]>>2],s+=e[(3&n[r])<<4|n[r+1]>>4],s+=e[(15&n[r+1])<<2|n[r+2]>>6],s+=e[63&n[r+2]];return o%3===2?s=s.substring(0,s.length-1)+"=":o%3===1&&(s=s.substring(0,s.length-2)+"=="),s},r.decode=function(t){var r,n,o,s,i,a=.75*t.length,c=t.length,p=0;"="===t[t.length-1]&&(a--,"="===t[t.length-2]&&a--);var u=new ArrayBuffer(a),h=new Uint8Array(u);for(r=0;r<c;r+=4)n=e.indexOf(t[r]),o=e.indexOf(t[r+1]),s=e.indexOf(t[r+2]),i=e.indexOf(t[r+3]),h[p++]=n<<2|o>>4,h[p++]=(15&o)<<4|s>>2,h[p++]=(3&s)<<6|63&i;return u}}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")},{}],14:[function(e,t,r){(function(e){function r(e){for(var t=0;t<e.length;t++){var r=e[t];if(r.buffer instanceof ArrayBuffer){var n=r.buffer;if(r.byteLength!==n.byteLength){var o=new Uint8Array(r.byteLength);o.set(new Uint8Array(n,r.byteOffset,r.byteLength)),n=o.buffer}e[t]=n}}}function n(e,t){t=t||{};var n=new s;r(e);for(var o=0;o<e.length;o++)n.append(e[o]);return t.type?n.getBlob(t.type):n.getBlob()}function o(e,t){return r(e),new Blob(e,t||{})}var s=e.BlobBuilder||e.WebKitBlobBuilder||e.MSBlobBuilder||e.MozBlobBuilder,i=function(){try{var e=new Blob(["hi"]);return 2===e.size}catch(t){return!1}}(),a=i&&function(){try{var e=new Blob([new Uint8Array([1,2])]);return 2===e.size}catch(t){return!1}}(),c=s&&s.prototype.append&&s.prototype.getBlob;t.exports=function(){return i?a?e.Blob:o:c?n:void 0}()}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{}],15:[function(e,t,r){},{}],16:[function(e,t,r){function n(e){if(e)return o(e)}function o(e){for(var t in n.prototype)e[t]=n.prototype[t];return e}t.exports=n,n.prototype.on=n.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks[e]=this._callbacks[e]||[]).push(t),this},n.prototype.once=function(e,t){function r(){n.off(e,r),t.apply(this,arguments)}var n=this;return this._callbacks=this._callbacks||{},r.fn=t,this.on(e,r),this},n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var r=this._callbacks[e];if(!r)return this;if(1==arguments.length)return delete this._callbacks[e],this;for(var n,o=0;o<r.length;o++)if(n=r[o],n===t||n.fn===t){r.splice(o,1);break}return this},n.prototype.emit=function(e){this._callbacks=this._callbacks||{};var t=[].slice.call(arguments,1),r=this._callbacks[e];if(r){r=r.slice(0);for(var n=0,o=r.length;n<o;++n)r[n].apply(this,t)}return this},n.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks[e]||[]},n.prototype.hasListeners=function(e){return!!this.listeners(e).length}},{}],17:[function(e,t,r){t.exports=function(e,t){var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}},{}],18:[function(e,t,r){function n(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var e=arguments,t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+r.humanize(this.diff),!t)return e;var n="color: "+this.color;e=[e[0],n,"color: inherit"].concat(Array.prototype.slice.call(e,1));var o=0,s=0;return e[0].replace(/%[a-z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(s=o))}),e.splice(s,0,n),e}function s(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function i(e){try{null==e?r.storage.removeItem("debug"):r.storage.debug=e}catch(t){}}function a(){var e;try{e=r.storage.debug}catch(t){}return e}function c(){try{return window.localStorage}catch(e){}}r=t.exports=e("./debug"),r.log=s,r.formatArgs=o,r.save=i,r.load=a,r.useColors=n,r.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:c(),r.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],r.formatters.j=function(e){return JSON.stringify(e)},r.enable(a())},{"./debug":19}],19:[function(e,t,r){function n(){return r.colors[u++%r.colors.length]}function o(e){function t(){}function o(){var e=o,t=+new Date,s=t-(p||t);e.diff=s,e.prev=p,e.curr=t,p=t,null==e.useColors&&(e.useColors=r.useColors()),null==e.color&&e.useColors&&(e.color=n());var i=Array.prototype.slice.call(arguments);i[0]=r.coerce(i[0]),"string"!=typeof i[0]&&(i=["%o"].concat(i));var a=0;i[0]=i[0].replace(/%([a-z%])/g,function(t,n){if("%%"===t)return t;a++;var o=r.formatters[n];if("function"==typeof o){var s=i[a];t=o.call(e,s),i.splice(a,1),a--}return t}),"function"==typeof r.formatArgs&&(i=r.formatArgs.apply(e,i));var c=o.log||r.log||console.log.bind(console);c.apply(e,i)}t.enabled=!1,o.enabled=!0;var s=r.enabled(e)?o:t;return s.namespace=e,s}function s(e){r.save(e);for(var t=(e||"").split(/[\s,]+/),n=t.length,o=0;o<n;o++)t[o]&&(e=t[o].replace(/\*/g,".*?"),"-"===e[0]?r.skips.push(new RegExp("^"+e.substr(1)+"$")):r.names.push(new RegExp("^"+e+"$")))}function i(){r.enable("")}function a(e){var t,n;for(t=0,n=r.skips.length;t<n;t++)if(r.skips[t].test(e))return!1;for(t=0,n=r.names.length;t<n;t++)if(r.names[t].test(e))return!0;return!1}function c(e){return e instanceof Error?e.stack||e.message:e}r=t.exports=o,r.coerce=c,r.disable=i,r.enable=s,r.enabled=a,r.humanize=e("ms"),r.names=[],r.skips=[],r.formatters={};var p,u=0},{ms:26}],20:[function(e,t,r){(function(t){function n(e,t){var n="b"+r.packets[e.type]+e.data.data;return t(n)}function o(e,t,n){if(!t)return r.encodeBase64Packet(e,n);var o=e.data,s=new Uint8Array(o),i=new Uint8Array(1+o.byteLength);i[0]=m[e.type];for(var a=0;a<s.length;a++)i[a+1]=s[a];return n(i.buffer)}function s(e,t,n){if(!t)return r.encodeBase64Packet(e,n);var o=new FileReader;return o.onload=function(){e.data=o.result,r.encodePacket(e,t,!0,n)},o.readAsArrayBuffer(e.data)}function i(e,t,n){if(!t)return r.encodeBase64Packet(e,n);if(g)return s(e,t,n);var o=new Uint8Array(1);o[0]=m[e.type];var i=new w([o.buffer,e.data]);return n(i)}function a(e,t,r){for(var n=new Array(e.length),o=f(e.length,r),s=function(e,r,o){t(r,function(t,r){n[e]=r,o(t,n)})},i=0;i<e.length;i++)s(i,e[i],o)}var c=e("./keys"),p=e("has-binary"),u=e("arraybuffer.slice"),h=e("base64-arraybuffer"),f=e("after"),l=e("utf8"),d=navigator.userAgent.match(/Android/i),y=/PhantomJS/i.test(navigator.userAgent),g=d||y;r.protocol=3;var m=r.packets={
	open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},v=c(m),b={type:"error",data:"parser error"},w=e("blob");r.encodePacket=function(e,r,s,a){"function"==typeof r&&(a=r,r=!1),"function"==typeof s&&(a=s,s=null);var c=void 0===e.data?void 0:e.data.buffer||e.data;if(t.ArrayBuffer&&c instanceof ArrayBuffer)return o(e,r,a);if(w&&c instanceof t.Blob)return i(e,r,a);if(c&&c.base64)return n(e,a);var p=m[e.type];return void 0!==e.data&&(p+=s?l.encode(String(e.data)):String(e.data)),a(""+p)},r.encodeBase64Packet=function(e,n){var o="b"+r.packets[e.type];if(w&&e.data instanceof t.Blob){var s=new FileReader;return s.onload=function(){var e=s.result.split(",")[1];n(o+e)},s.readAsDataURL(e.data)}var i;try{i=String.fromCharCode.apply(null,new Uint8Array(e.data))}catch(a){for(var c=new Uint8Array(e.data),p=new Array(c.length),u=0;u<c.length;u++)p[u]=c[u];i=String.fromCharCode.apply(null,p)}return o+=t.btoa(i),n(o)},r.decodePacket=function(e,t,n){if("string"==typeof e||void 0===e){if("b"==e.charAt(0))return r.decodeBase64Packet(e.substr(1),t);if(n)try{e=l.decode(e)}catch(o){return b}var s=e.charAt(0);return Number(s)==s&&v[s]?e.length>1?{type:v[s],data:e.substring(1)}:{type:v[s]}:b}var i=new Uint8Array(e),s=i[0],a=u(e,1);return w&&"blob"===t&&(a=new w([a])),{type:v[s],data:a}},r.decodeBase64Packet=function(e,r){var n=v[e.charAt(0)];if(!t.ArrayBuffer)return{type:n,data:{base64:!0,data:e.substr(1)}};var o=h.decode(e.substr(1));return"blob"===r&&w&&(o=new w([o])),{type:n,data:o}},r.encodePayload=function(e,t,n){function o(e){return e.length+":"+e}function s(e,n){r.encodePacket(e,!!i&&t,!0,function(e){n(null,o(e))})}"function"==typeof t&&(n=t,t=null);var i=p(e);return t&&i?w&&!g?r.encodePayloadAsBlob(e,n):r.encodePayloadAsArrayBuffer(e,n):e.length?void a(e,s,function(e,t){return n(t.join(""))}):n("0:")},r.decodePayload=function(e,t,n){if("string"!=typeof e)return r.decodePayloadAsBinary(e,t,n);"function"==typeof t&&(n=t,t=null);var o;if(""==e)return n(b,0,1);for(var s,i,a="",c=0,p=e.length;c<p;c++){var u=e.charAt(c);if(":"!=u)a+=u;else{if(""==a||a!=(s=Number(a)))return n(b,0,1);if(i=e.substr(c+1,s),a!=i.length)return n(b,0,1);if(i.length){if(o=r.decodePacket(i,t,!0),b.type==o.type&&b.data==o.data)return n(b,0,1);var h=n(o,c+s,p);if(!1===h)return}c+=s,a=""}}return""!=a?n(b,0,1):void 0},r.encodePayloadAsArrayBuffer=function(e,t){function n(e,t){r.encodePacket(e,!0,!0,function(e){return t(null,e)})}return e.length?void a(e,n,function(e,r){var n=r.reduce(function(e,t){var r;return r="string"==typeof t?t.length:t.byteLength,e+r.toString().length+r+2},0),o=new Uint8Array(n),s=0;return r.forEach(function(e){var t="string"==typeof e,r=e;if(t){for(var n=new Uint8Array(e.length),i=0;i<e.length;i++)n[i]=e.charCodeAt(i);r=n.buffer}t?o[s++]=0:o[s++]=1;for(var a=r.byteLength.toString(),i=0;i<a.length;i++)o[s++]=parseInt(a[i]);o[s++]=255;for(var n=new Uint8Array(r),i=0;i<n.length;i++)o[s++]=n[i]}),t(o.buffer)}):t(new ArrayBuffer(0))},r.encodePayloadAsBlob=function(e,t){function n(e,t){r.encodePacket(e,!0,!0,function(e){var r=new Uint8Array(1);if(r[0]=1,"string"==typeof e){for(var n=new Uint8Array(e.length),o=0;o<e.length;o++)n[o]=e.charCodeAt(o);e=n.buffer,r[0]=0}for(var s=e instanceof ArrayBuffer?e.byteLength:e.size,i=s.toString(),a=new Uint8Array(i.length+1),o=0;o<i.length;o++)a[o]=parseInt(i[o]);if(a[i.length]=255,w){var c=new w([r.buffer,a.buffer,e]);t(null,c)}})}a(e,n,function(e,r){return t(new w(r))})},r.decodePayloadAsBinary=function(e,t,n){"function"==typeof t&&(n=t,t=null);for(var o=e,s=[],i=!1;o.byteLength>0;){for(var a=new Uint8Array(o),c=0===a[0],p="",h=1;255!=a[h];h++){if(p.length>310){i=!0;break}p+=a[h]}if(i)return n(b,0,1);o=u(o,2+p.length),p=parseInt(p);var f=u(o,0,p);if(c)try{f=String.fromCharCode.apply(null,new Uint8Array(f))}catch(l){var d=new Uint8Array(f);f="";for(var h=0;h<d.length;h++)f+=String.fromCharCode(d[h])}s.push(f),o=u(o,p)}var y=s.length;s.forEach(function(e,o){n(r.decodePacket(e,t,!0),o,y)})}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{"./keys":21,after:11,"arraybuffer.slice":12,"base64-arraybuffer":13,blob:14,"has-binary":22,utf8:30}],21:[function(e,t,r){t.exports=Object.keys||function(e){var t=[],r=Object.prototype.hasOwnProperty;for(var n in e)r.call(e,n)&&t.push(n);return t}},{}],22:[function(e,t,r){(function(r){function n(e){function t(e){if(!e)return!1;if(r.Buffer&&r.Buffer.isBuffer(e)||r.ArrayBuffer&&e instanceof ArrayBuffer||r.Blob&&e instanceof Blob||r.File&&e instanceof File)return!0;if(o(e)){for(var n=0;n<e.length;n++)if(t(e[n]))return!0}else if(e&&"object"==typeof e){e.toJSON&&(e=e.toJSON());for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)&&t(e[s]))return!0}return!1}return t(e)}var o=e("isarray");t.exports=n}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{isarray:25}],23:[function(e,t,r){try{t.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(n){t.exports=!1}},{}],24:[function(e,t,r){var n=[].indexOf;t.exports=function(e,t){if(n)return e.indexOf(t);for(var r=0;r<e.length;++r)if(e[r]===t)return r;return-1}},{}],25:[function(e,t,r){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],26:[function(e,t,r){function n(e){if(e=""+e,!(e.length>1e4)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*h;case"days":case"day":case"d":return r*u;case"hours":case"hour":case"hrs":case"hr":case"h":return r*p;case"minutes":case"minute":case"mins":case"min":case"m":return r*c;case"seconds":case"second":case"secs":case"sec":case"s":return r*a;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r}}}}function o(e){return e>=u?Math.round(e/u)+"d":e>=p?Math.round(e/p)+"h":e>=c?Math.round(e/c)+"m":e>=a?Math.round(e/a)+"s":e+"ms"}function s(e){return i(e,u,"day")||i(e,p,"hour")||i(e,c,"minute")||i(e,a,"second")||e+" ms"}function i(e,t,r){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+r:Math.ceil(e/t)+" "+r+"s"}var a=1e3,c=60*a,p=60*c,u=24*p,h=365.25*u;t.exports=function(e,t){return t=t||{},"string"==typeof e?n(e):t["long"]?s(e):o(e)}},{}],27:[function(e,t,r){(function(e){var r=/^[\],:{}\s]*$/,n=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,o=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,s=/(?:^|:|,)(?:\s*\[)+/g,i=/^\s+/,a=/\s+$/;t.exports=function(t){return"string"==typeof t&&t?(t=t.replace(i,"").replace(a,""),e.JSON&&JSON.parse?JSON.parse(t):r.test(t.replace(n,"@").replace(o,"]").replace(s,""))?new Function("return "+t)():void 0):null}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{}],28:[function(e,t,r){r.encode=function(e){var t="";for(var r in e)e.hasOwnProperty(r)&&(t.length&&(t+="&"),t+=encodeURIComponent(r)+"="+encodeURIComponent(e[r]));return t},r.decode=function(e){for(var t={},r=e.split("&"),n=0,o=r.length;n<o;n++){var s=r[n].split("=");t[decodeURIComponent(s[0])]=decodeURIComponent(s[1])}return t}},{}],29:[function(e,t,r){var n=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,o=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(e){var t=e,r=e.indexOf("["),s=e.indexOf("]");r!=-1&&s!=-1&&(e=e.substring(0,r)+e.substring(r,s).replace(/:/g,";")+e.substring(s,e.length));for(var i=n.exec(e||""),a={},c=14;c--;)a[o[c]]=i[c]||"";return r!=-1&&s!=-1&&(a.source=t,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a}},{}],30:[function(t,r,n){(function(t){!function(o){function s(e){for(var t,r,n=[],o=0,s=e.length;o<s;)t=e.charCodeAt(o++),t>=55296&&t<=56319&&o<s?(r=e.charCodeAt(o++),56320==(64512&r)?n.push(((1023&t)<<10)+(1023&r)+65536):(n.push(t),o--)):n.push(t);return n}function i(e){for(var t,r=e.length,n=-1,o="";++n<r;)t=e[n],t>65535&&(t-=65536,o+=w(t>>>10&1023|55296),t=56320|1023&t),o+=w(t);return o}function a(e){if(e>=55296&&e<=57343)throw Error("Lone surrogate U+"+e.toString(16).toUpperCase()+" is not a scalar value")}function c(e,t){return w(e>>t&63|128)}function p(e){if(0==(4294967168&e))return w(e);var t="";return 0==(4294965248&e)?t=w(e>>6&31|192):0==(4294901760&e)?(a(e),t=w(e>>12&15|224),t+=c(e,6)):0==(4292870144&e)&&(t=w(e>>18&7|240),t+=c(e,12),t+=c(e,6)),t+=w(63&e|128)}function u(e){for(var t,r=s(e),n=r.length,o=-1,i="";++o<n;)t=r[o],i+=p(t);return i}function h(){if(b>=v)throw Error("Invalid byte index");var e=255&m[b];if(b++,128==(192&e))return 63&e;throw Error("Invalid continuation byte")}function f(){var e,t,r,n,o;if(b>v)throw Error("Invalid byte index");if(b==v)return!1;if(e=255&m[b],b++,0==(128&e))return e;if(192==(224&e)){var t=h();if(o=(31&e)<<6|t,o>=128)return o;throw Error("Invalid continuation byte")}if(224==(240&e)){if(t=h(),r=h(),o=(15&e)<<12|t<<6|r,o>=2048)return a(o),o;throw Error("Invalid continuation byte")}if(240==(248&e)&&(t=h(),r=h(),n=h(),o=(15&e)<<18|t<<12|r<<6|n,o>=65536&&o<=1114111))return o;throw Error("Invalid UTF-8 detected")}function l(e){m=s(e),v=m.length,b=0;for(var t,r=[];(t=f())!==!1;)r.push(t);return i(r)}var d="object"==typeof n&&n,y="object"==typeof r&&r&&r.exports==d&&r,g="object"==typeof t&&t;g.global!==g&&g.window!==g||(o=g);var m,v,b,w=String.fromCharCode,x={version:"2.0.0",encode:u,decode:l};if("function"==typeof e&&"object"==typeof e.amd&&e.amd)e(function(){return x});else if(d&&!d.nodeType)if(y)y.exports=x;else{var k={},B=k.hasOwnProperty;for(var S in x)B.call(x,S)&&(d[S]=x[S])}else o.utf8=x}(this)}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})},{}],31:[function(e,t,r){"use strict";function n(e){var t="";do t=a[e%c]+t,e=Math.floor(e/c);while(e>0);return t}function o(e){var t=0;for(h=0;h<e.length;h++)t=t*c+p[e.charAt(h)];return t}function s(){var e=n(+new Date);return e!==i?(u=0,i=e):e+"."+n(u++)}for(var i,a="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),c=64,p={},u=0,h=0;h<c;h++)p[a[h]]=h;s.encode=n,s.decode=o,t.exports=s},{}]},{},[1])(1)});})();
	(function(ns){var CLIENT_VERSION = "2.0.0";var NODE_CLIENT=0;ns.wrapper=function(good,wd){
	var h,n=this;function p(a){return void 0!==a}function aa(a,b){var c=a.split("."),d=n;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)!c.length&&p(b)?d[e]=b:d[e]?d=d[e]:d=d[e]={}}function ba(){}function ca(a){a.sb=function(){return a.md?a.md:a.md=new a}}
	function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
	else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return"array"==da(a)}function q(a){return"string"==typeof a}function fa(a){return"number"==typeof a}function ga(a){return"function"==da(a)}function ha(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ia(a,b,c){return a.call.apply(a.bind,arguments)}
	function ja(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:ja;return r.apply(null,arguments)}var ka=Date.now||function(){return+new Date};
	function la(a,b){function c(){}c.prototype=b.prototype;a.Ye=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Re=function(a,c,f){for(var g=Array(arguments.length-2),k=2;k<arguments.length;k++)g[k-2]=arguments[k];return b.prototype[c].apply(a,g)}};function ma(a){if(Error.captureStackTrace)Error.captureStackTrace(this,ma);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}la(ma,Error);ma.prototype.name="CustomError";function na(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^ka()).toString(36)};var oa=Array.prototype.indexOf?function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},pa=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},qa=Array.prototype.filter?function(a,b,c){return Array.prototype.filter.call(a,
	b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=q(a)?a.split(""):a,k=0;k<d;k++)if(k in g){var l=g[k];b.call(c,l,k,a)&&(e[f++]=l)}return e},ra=Array.prototype.map?function(a,b,c){return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},sa=Array.prototype.reduce?function(a,b,c,d){d&&(b=r(b,d));return Array.prototype.reduce.call(a,b,c)}:function(a,b,c,d){var e=c;pa(a,function(c,g){e=b.call(d,
	e,c,g,a)});return e},ta=Array.prototype.every?function(a,b,c){return Array.prototype.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function ua(a,b){var c=va(a,b,void 0);return 0>c?null:q(a)?a.charAt(c):a[c]}function va(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function wa(a,b){var c=oa(a,b);0<=c&&Array.prototype.splice.call(a,c,1)}
	function xa(a,b){a.sort(b||ya)}function ya(a,b){return a>b?1:a<b?-1:0};function za(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function t(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function Aa(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])}function Ba(a){var b={};Aa(a,function(a,d){b[a]=d});return b};function Ca(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Da(){}
	function Ea(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(ea(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),Ea(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],"function"!=typeof f&&(c.push(e),Fa(d,c),c.push(":"),Ea(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":Fa(b,c);break;case "number":c.push(isFinite(b)&&
	!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}var Ga={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ha=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
	function Fa(a,b){b.push('"',a.replace(Ha,function(a){var b=Ga[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),Ga[a]=b);return b}),'"')};function Ia(a){var b=[];Aa(a,function(a,d){ea(d)?pa(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""}function Ja(a){var b={};a=a.replace(/^\?/,"").split("&");pa(a,function(a){a&&(a=a.split("="),b[a[0]]=a[1])});return b}function Ka(a){return"undefined"!==typeof JSON&&p(JSON.parse)?JSON.parse(a):Ca(a)}
	function v(a){if("undefined"!==typeof JSON&&p(JSON.stringify))a=JSON.stringify(a);else{var b=[];Ea(new Da,a,b);a=b.join("")}return a}var La={};function Ma(){this.tc=w}Ma.prototype.u=function(a){return this.tc.ia(a)};Ma.prototype.toString=function(){return this.tc.toString()};function x(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function Na(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function Oa(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function Pa(a){var b=0,c;for(c in a)b++;return b}function Qa(a){for(var b in a)return b}function Ra(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function Sa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function Ta(a,b){return null!==a&&b in a}
	function Ua(a,b){for(var c in a)if(a[c]==b)return!0;return!1}function Va(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function Wa(a,b){var c=Va(a,b,void 0);return c&&a[c]}function Xa(a){for(var b in a)return!1;return!0}function Ya(a){var b={},c;for(c in a)b[c]=a[c];return b}var Za="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
	function $a(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Za.length;f++)c=Za[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function ab(a){this.Mb=a;this.qc="wilddog:"}ab.prototype.set=function(a,b){null==b?this.Mb.removeItem(this.qc+a):this.Mb.setItem(this.qc+a,v(b))};ab.prototype.get=function(a){a=this.Mb.getItem(this.qc+a);return null==a?null:Ka(a)};ab.prototype.remove=function(a){this.Mb.removeItem(this.qc+a)};ab.prototype.toString=function(){return this.Mb.toString()};function bb(){this.Ib={}}bb.prototype.set=function(a,b){null==b?delete this.Ib[a]:this.Ib[a]=b};bb.prototype.get=function(a){return za(this.Ib,a)?this.Ib[a]:null};bb.prototype.remove=function(a){delete this.Ib[a]};function cb(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("wilddog:sentinel","cache");b.removeItem("wilddog:sentinel");return new ab(b)}}catch(c){}return new bb}var db=cb("localStorage"),y=cb("sessionStorage");function eb(){this.g=-1};function fb(){this.g=-1;this.g=64;this.f=[];this.I=[];this.W=[];this.o=[];this.o[0]=128;for(var a=1;a<this.g;++a)this.o[a]=0;this.A=this.m=0;this.reset()}la(fb,eb);fb.prototype.reset=function(){this.f[0]=1732584193;this.f[1]=4023233417;this.f[2]=2562383102;this.f[3]=271733878;this.f[4]=3285377520;this.A=this.m=0};
	function gb(a,b,c){c||(c=0);var d=a.W;if(q(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.f[0];c=a.f[1];for(var g=a.f[2],k=a.f[3],l=a.f[4],m,e=0;80>e;e++)40>e?20>e?(f=k^c&(g^k),m=1518500249):(f=c^g^k,m=1859775393):60>e?(f=c&g|k&(c|g),m=2400959708):(f=c^g^k,m=3395469782),f=(b<<
	5|b>>>27)+f+l+m+d[e]&4294967295,l=k,k=g,g=(c<<30|c>>>2)&4294967295,c=b,b=f;a.f[0]=a.f[0]+b&4294967295;a.f[1]=a.f[1]+c&4294967295;a.f[2]=a.f[2]+g&4294967295;a.f[3]=a.f[3]+k&4294967295;a.f[4]=a.f[4]+l&4294967295}
	fb.prototype.update=function(a,b){if(null!=a){p(b)||(b=a.length);for(var c=b-this.g,d=0,e=this.I,f=this.m;d<b;){if(0==f)for(;d<=c;)gb(this,a,d),d+=this.g;if(q(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.g){gb(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.g){gb(this,e);f=0;break}}this.m=f;this.A+=b}};var hb;a:{var ib=n.navigator;if(ib){var jb=ib.userAgent;if(jb){hb=jb;break a}}hb=""};var kb=null,lb=null;function mb(a){var b="";nb(a,function(a){b+=String.fromCharCode(a)});return b}function nb(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=lb[c];if(null!=e)return e;if(!/^[\s\xa0]*$/.test(c))throw Error("Unknown base64 encoding at char: "+c);}return b}ob();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),k=c(64);if(64===k&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=k&&b(g<<6&192|k))}}
	function ob(){if(!kb){kb={};lb={};for(var a=0;65>a;a++)kb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),lb[kb[a]]=a,62<=a&&(lb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)]=a)}};var pb=function(){var a=1;return function(){return a++}}();function z(a,b){if(!a)throw qb(b);}function qb(a){return Error("Wilddog ("+rb+") INTERNAL ASSERT FAILED: "+a)}function sb(a){try{return NODE_CLIENT?(new Buffer(a,"base64")).toString("utf8"):"undefined"!==typeof atob?atob(a):mb(a)}catch(b){tb("base64Decode failed: ",b)}return null}
	function ub(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e=e-55296,d++,z(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}a=new fb;a.update(b);b=[];d=8*a.A;56>a.m?a.update(a.o,56-a.m):a.update(a.o,a.g-(a.m-56));for(c=a.g-1;56<=c;c--)a.I[c]=d&255,d/=256;gb(a,a.I);for(c=d=0;5>c;c++)for(e=
	24;0<=e;e-=8)b[d]=a.f[c]>>e&255,++d;ob();a=kb;c=[];for(d=0;d<b.length;d+=3){var f=b[d],g=(e=d+1<b.length)?b[d+1]:0,k=d+2<b.length,l=k?b[d+2]:0,m=f>>2,f=(f&3)<<4|g>>4,g=(g&15)<<2|l>>6,l=l&63;k||(l=64,e||(g=64));c.push(a[m],a[f],a[g],a[l])}return c.join("")}
	function vb(a){for(var b="",c=0;c<arguments.length;c++)var d=arguments[c],e=da(d),b="array"==e||"object"==e&&"number"==typeof d.length?b+vb.apply(null,arguments[c]):"object"===typeof arguments[c]?b+v(arguments[c]):b+arguments[c],b=b+" ";return b}var wb=null,xb=!0;function tb(a){!0===xb&&(xb=!1,null===wb&&!0===y.get("logging_enabled")&&yb(!0));if(wb){var b=vb.apply(null,arguments);wb(b)}}function zb(a){return function(){tb(a,arguments)}}
	function Ab(a){if("undefined"!==typeof console){var b="WILDDOG INTERNAL ERROR: "+vb.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function Bb(a){var b=vb.apply(null,arguments);throw Error("WILDDOG FATAL ERROR: "+b);}function B(a){if("undefined"!==typeof console){var b="WILDDOG WARNING: "+vb.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
	function Cb(a){var b="",c="",d="",e="",f=!0,g="https",k=443;if(q(a)){var l=a.indexOf("//");0<=l&&(g=a.substring(0,l-1),a=a.substring(l+2));l=a.indexOf("/");-1===l&&(l=a.length);b=a.substring(0,l);e="";a=a.substring(l).split("/");for(l=0;l<a.length;l++)if(0<a[l].length){var m=a[l];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(u){}e+="/"+m}a=b.split(".");3===a.length?(c=a[1],d=a[0].toLowerCase()):2===a.length&&(c=a[0]);l=b.indexOf(":");0<=l&&(f="https"===g||"wss"===g,k=b.substring(l+1),isFinite(k)&&
	(k=String(k)),k=q(k)?/^\s*-?0x/i.test(k)?parseInt(k,16):parseInt(k,10):NaN)}return{host:b,port:k,domain:c,ze:d,hb:f,scheme:g,Ub:e}}function Db(a){return fa(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}function Eb(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=Fb(a),d=Fb(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}
	function Gb(a){if("object"!==typeof a||null===a)return v(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=v(b[d]),c+=":",c+=Gb(a[b[d]]);return c+"}"}function Hb(a,b){if(ea(a))for(var c=0;c<a.length;++c)b(c,a[c]);else x(a,b)}
	function Ib(a){z(!Db(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
	(d="0"+d),c+=d;return c.toLowerCase()}var Jb=/^-?\d{1,10}$/;function Fb(a){return Jb.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function Kb(a){try{a()}catch(b){setTimeout(function(){B("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function C(a,b){if(ga(a)){var c=Array.prototype.slice.call(arguments,1).slice();Kb(function(){a.apply(null,c)})}};function Lb(a){z(ea(a)&&0<a.length,"Requires a non-empty array");this.I=a;this.g={}}Lb.prototype.m=function(a,b){for(var c=this.g[a]||[],d=0;d<c.length;d++)c[d].Kb.apply(c[d].context,Array.prototype.slice.call(arguments,1))};Lb.prototype.Va=function(a,b,c){Mb(this,a);this.g[a]=this.g[a]||[];this.g[a].push({Kb:b,context:c});(a=this.o(a))&&b.apply(c,a)};Lb.prototype.eb=function(a,b,c){Mb(this,a);a=this.g[a]||[];for(var d=0;d<a.length;d++)if(a[d].Kb===b&&(!c||c===a[d].context)){a.splice(d,1);break}};
	function Mb(a,b){z(ua(a.I,function(a){return a===b}),"Unknown event: "+b)};function Nb(a,b){Lb.call(this,["authStateChanged","authTokenExpired"]);this.A={Ad:!1};this.f={};Object.defineProperty(this,"name",{value:b,writable:!1});Object.defineProperty(this,"options",{value:a,writable:!1});var c=this;["auth","sync"].forEach(function(a){c[a]=function(){var b="__"+a,f=n.wilddog.__getService(a);if(!f)throw Error("Could not found module "+a);c[b]||(c[b]=f(this));return c[b]}})}la(Nb,Lb);
	Nb.prototype.Td=function(a,b){var c=!0,d;for(d in Ob)if(Ob.hasOwnProperty(d)&&Ob[d]===a){c=!1;break}if(c)throw Error("Unknown event "+a);this.f[a]=b;switch(a){case Ob.Pa:this.A.Ad=b&&b.Ad}this.m(a,b)};Nb.prototype.emit=Nb.prototype.Td;Nb.prototype.bind=function(a,b){this.Va(a,b)};Nb.prototype.bind=Nb.prototype.bind;Nb.prototype.Be=function(a,b){this.eb(a,b)};Nb.prototype.unbind=Nb.prototype.Be;Nb.prototype.o=function(a){switch(a){case Ob.Pa:return[this.f[Ob.Pa]]}return null};
	var Ob={Pa:"authStateChanged",dd:"authTokenExpired"};function Pb(a){var b={},c={},d={},e="";try{var f=a.split("."),g=sb(f[0])||"",k=sb(f[1])||"",b=Ka(g),c=Ka(k),e=f[2],d=c.d||{};delete c.d}catch(l){console.warn("error",l)}return{Te:b,Ec:c,data:d,Ve:e}}function Qb(a){a=Pb(a).Ec;return"object"===typeof a&&a.hasOwnProperty("iat")?t(a,"iat"):null};var Rb="auth.wilddog.com";function Sb(a,b,c){this.g=["session",b.pc,b.Fb,a].join(":");this.f=c}Sb.prototype.set=function(a,b){if(!b)if(this.f.length)b=this.f[0];else throw Error("wd.auth.SessionManager : No storage options available!");b.set(this.g,a)};Sb.prototype.get=function(){var a=ra(this.f,r(this.m,this)),a=qa(a,function(a){return null!==a});xa(a,function(a,c){return Qb(c.idToken)-Qb(a.idToken)});return 0<a.length?a.shift():null};Sb.prototype.m=function(a){try{var b=a.get(this.g);if(b.idToken)return b;Tb(this)}catch(c){}return null};
	function Tb(a){pa(a.f,function(b){b.remove(a.g)})};function Ub(a,b,c,d,e){this.uid=e;this.displayName=a;this.email=b;this.photoURL=c;this.providerId=d};function Vb(a,b,c){this.ca=c;this.m=a;this.o=b;this.g=0;this.f=null}Vb.prototype.get=function(){var a;0<this.g?(this.g--,a=this.f,this.f=a.next,a.next=null):a=this.m();return a};function Wb(a,b){a.o(b);a.g<a.ca&&(a.g++,b.next=a.f,a.f=b)};function Xb(){this.g=this.f=null}var Zb=new Vb(function(){return new Yb},function(a){a.reset()},100);Xb.prototype.add=function(a,b){var c=Zb.get();c.set(a,b);this.g?this.g.next=c:this.f=c;this.g=c};Xb.prototype.remove=function(){var a=null;this.f&&(a=this.f,this.f=this.f.next,this.f||(this.g=null),a.next=null);return a};function Yb(){this.next=this.g=this.f=null}Yb.prototype.set=function(a,b){this.f=a;this.g=b;this.next=null};Yb.prototype.reset=function(){this.next=this.g=this.f=null};function $b(a){n.setTimeout(function(){throw a;},0)}var ac;
	function bc(){var a=n.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==hb.indexOf("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=r(function(a){if(("*"==d||a.origin==
	d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==hb.indexOf("Trident")&&-1==hb.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.Qa;c.Qa=null;a()}};return function(a){d.next={Qa:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(a){var b=
	document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){n.setTimeout(a,0)}};function cc(a,b){dc||ec();fc||(dc(),fc=!0);gc.add(a,b)}var dc;function ec(){if(n.Promise&&n.Promise.resolve){var a=n.Promise.resolve(void 0);dc=function(){a.then(hc)}}else dc=function(){var a=hc,c;!(c=!ga(n.setImmediate))&&(c=n.Window&&n.Window.prototype)&&(c=-1==hb.indexOf("Edge")&&n.Window.prototype.setImmediate==n.setImmediate);c?(ac||(ac=bc()),ac(a)):n.setImmediate(a)}}var fc=!1,gc=new Xb;function hc(){for(var a=null;a=gc.remove();){try{a.f.call(a.g)}catch(b){$b(b)}Wb(Zb,a)}fc=!1};function ic(a,b){this.f=jc;this.W=void 0;this.o=this.g=this.m=null;this.A=this.I=!1;if(a!=ba)try{var c=this;a.call(b,function(a){kc(c,lc,a)},function(a){if(!(a instanceof mc))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}kc(c,nc,a)})}catch(d){kc(this,nc,d)}}var jc=0,lc=2,nc=3;function oc(){this.next=this.context=this.f=this.g=this.B=null;this.m=!1}oc.prototype.reset=function(){this.context=this.f=this.g=this.B=null;this.m=!1};
	var pc=new Vb(function(){return new oc},function(a){a.reset()},100);function qc(a,b,c){var d=pc.get();d.g=a;d.f=b;d.context=c;return d}ic.prototype.then=function(a,b,c){return rc(this,ga(a)?a:null,ga(b)?b:null,c)};ic.prototype.then=ic.prototype.then;ic.prototype.$goog_Thenable=!0;h=ic.prototype;h.Ae=function(a,b){return rc(this,null,a,b)};h.cancel=function(a){this.f==jc&&cc(function(){var b=new mc(a);sc(this,b)},this)};
	function sc(a,b){if(a.f==jc)if(a.m){var c=a.m;if(c.g){for(var d=0,e=null,f=null,g=c.g;g&&(g.m||(d++,g.B==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(c.f==jc&&1==d?sc(c,b):(f?(d=f,d.next==c.o&&(c.o=d),d.next=d.next.next):tc(c),uc(c,e,nc,b)))}a.m=null}else kc(a,nc,b)}function vc(a,b){a.g||a.f!=lc&&a.f!=nc||wc(a);a.o?a.o.next=b:a.g=b;a.o=b}
	function rc(a,b,c,d){var e=qc(null,null,null);e.B=new ic(function(a,g){e.g=b?function(c){try{var e=b.call(d,c);a(e)}catch(m){g(m)}}:a;e.f=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof mc?g(b):a(e)}catch(m){g(m)}}:g});e.B.m=a;vc(a,e);return e.B}h.Ce=function(a){this.f=jc;kc(this,lc,a)};h.De=function(a){this.f=jc;kc(this,nc,a)};
	function kc(a,b,c){if(a.f==jc){a==c&&(b=nc,c=new TypeError("Promise cannot resolve to itself"));a.f=1;var d;a:{var e=c,f=a.Ce,g=a.De;if(e instanceof ic)vc(e,qc(f||ba,g||null,a)),d=!0;else{var k;if(e)try{k=!!e.$goog_Thenable}catch(m){k=!1}else k=!1;if(k)e.then(f,g,a),d=!0;else{if(ha(e))try{var l=e.then;if(ga(l)){xc(e,l,f,g,a);d=!0;break a}}catch(m){g.call(a,m);d=!0;break a}d=!1}}}d||(a.W=c,a.f=b,a.m=null,wc(a),b!=nc||c instanceof mc||yc(a,c))}}
	function xc(a,b,c,d,e){function f(a){k||(k=!0,d.call(e,a))}function g(a){k||(k=!0,c.call(e,a))}var k=!1;try{b.call(a,g,f)}catch(l){f(l)}}function wc(a){a.I||(a.I=!0,cc(a.Vd,a))}function tc(a){var b=null;a.g&&(b=a.g,a.g=b.next,b.next=null);a.g||(a.o=null);return b}h.Vd=function(){for(var a=null;a=tc(this);)uc(this,a,this.f,this.W);this.I=!1};
	function uc(a,b,c,d){if(c==nc&&b.f&&!b.m)for(;a&&a.A;a=a.m)a.A=!1;if(b.B)b.B.m=null,zc(b,c,d);else try{b.m?b.g.call(b.context):zc(b,c,d)}catch(e){Ac.call(null,e)}Wb(pc,b)}function zc(a,b,c){b==lc?a.g.call(a.context,c):a.f&&a.f.call(a.context,c)}function yc(a,b){a.A=!0;cc(function(){a.A&&Ac.call(null,b)})}var Ac=$b;function mc(a){ma.call(this,a)}la(mc,ma);mc.prototype.name="cancel";var Bc=n.Promise||ic;n.setTimeout||(n.setTimeout=function(){window.setTimeout.apply(window,arguments)});ic.prototype["catch"]=ic.prototype.Ae;function D(){var a=this;this.g=this.m=null;this.f=new Bc(function(b,c){a.m=b;a.g=c})}function E(a,b){return function(c,d){c?a.g(c):a.m(d);ga(b)&&(Cc(a.f),1===b.length?b(c):b(c,d))}}function Cc(a){a.then(void 0,ba)};function F(a,b,c,d){Ub.call(this,b.displayName,b.email,b.photoURL,b.providerId,b.uid);this.isAnonymous="anonymous"===this.f;this.emailVerified=!0===c;this.providerData=d||[];this.refreshToken=null;Object.defineProperty(this,"__authManager",{value:a,writable:!1})}la(F,Ub);aa("wd.User",F);F.prototype["delete"]=function(a){var b=new D;Dc(this.__authManager,this.za(),E(b,a));return b.f};F.prototype["delete"]=F.prototype["delete"];F.prototype.za=function(){return(this.__authManager.Ja||null).idToken};
	F.prototype.getToken=F.prototype.za;F.prototype.link=function(a,b){G("wilddog.User.link",1,2,arguments.length);Ec("wilddog.User.link",a);var c=a.provider,d=new D,e={};e.idToken=this.za();"password"==c?(e.email=a.email,e.password=a.password,Fc(this.__authManager,e,E(d,b))):(e.providerId=a.provider,e.accessToken=a.accessToken,e.openId=a.openId||"",e.authType="link",Gc(this.__authManager,e,E(d,b)));return d.f};F.prototype.link=F.prototype.link;
	F.prototype.Ee=function(a,b){G("wilddog.User.unlink",1,2,arguments.length);Hc("wilddog.User.unlink",a);var c=new D,d=this;Ic(this.__authManager,"unlink",{idToken:this.za(),deleteProvider:[a]},E(c,function(c,f){f&&(d.providerData=d.providerData.filter(function(b){if(b.providerId!=a)return b}),0===d.providerData.length&&(Jc(d.__authManager,null),C(void 0,null)));b&&b(c,f)}));return c.f};F.prototype.unlink=F.prototype.Ee;
	F.prototype.ae=function(a,b){G("wilddog.auth().signInWithPopup",1,2,arguments.length);Ec("wilddog.auth().signInWithPopup",a);var c=new D;Kc(this.__authManager,a,{authType:"link",idToken:this.za()},E(c,b));return c.f};F.prototype.linkWithPopup=F.prototype.ae;F.prototype.be=function(a,b){G("wilddog.auth().signInWithPopup",1,2,arguments.length);Ec("wilddog.auth().signInWithPopup",a);var c=new D;Lc(this.__authManager,a,{authType:"link",idToken:this.za()},E(c,b));return c.f};
	F.prototype.linkWithRedirect=F.prototype.be;F.prototype.He=function(a,b){G("wilddog.User.updateProfile",1,2,arguments.length);Ec("wilddog.User.updateProfile",a);var c=new D;a.idToken=this.za();Ic(this.__authManager,"profile",a,E(c,b));return c.f};F.prototype.updateProfile=F.prototype.He;F.prototype.Fe=function(a,b){G("wilddog.User.updateEmail",1,2,arguments.length);Hc("wilddog.User.updateEmail",a);var c=new D;Fc(this.__authManager,{email:a,idToken:this.za()},E(c,b));return c.f};
	F.prototype.updateEmail=F.prototype.Fe;F.prototype.Ge=function(a,b){G("wilddog.User.updatePassword",1,2,arguments.length);Hc("wilddog.User.updatePassword",a);var c=new D;Fc(this.__authManager,{password:a,idToken:this.za()},E(c,b));return c.f};F.prototype.updatePassword=F.prototype.Ge;
	F.prototype.ne=function(a){G("wilddog.User.sendEmailVerification",0,1,arguments.length);H("wilddog.User.sendEmailVerification",1,a,!0);var b=new D;Mc(this.__authManager,{idToken:this.za(),requestType:"VERIFY_EMAIL"},E(b,a));return b.f};F.prototype.sendEmailVerification=F.prototype.ne;F.prototype.reload=function(a){G("wilddog.User.reload",0,1,arguments.length);H("wilddog.User.reload",1,a,!0);var b=new D;Nc(this.__authManager,this.za(),E(b,a));return b.f};F.prototype.reload=F.prototype.reload;
	F.prototype.le=function(a,b){G("wilddog.User.reload",1,2,arguments.length);H("wilddog.User.reload",2,b,!0);if(!a||!a.provider)throw Error("Unknown credential object.");var c=new D;Gc(this.__authManager,a,E(c,b));return c.f};F.prototype.reauthenticate=F.prototype.le;function Oc(a){if(a&&a.users&&a.users[0])return a=a.users[0],new Ub(a.displayName,a.email,a.photoUrl,a.providerId,a.localId);throw Error("Bad response format.");}function Pc(a,b){var c=Oc(b);if(!c)return null;var d=b.users[0],e=d.providerUserInfo.map(function(a){a.photoURL=a.photoUrl;delete a.photoUrl;return a});return new F(a,c,d.emailVerified,e)};function G(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function Qc(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
	function H(a,b,c,d){if((!d||p(c))&&!ga(c))throw Error(Qc(a,b,d)+"must be a valid function.");}function Rc(a,b,c){if(p(c)&&(!ha(c)||null===c))throw Error(Qc(a,b,!0)+"must be a valid context object.");};function I(a,b){if(1==arguments.length){this.D=a.split("/");for(var c=0,d=0;d<this.D.length;d++)0<this.D[d].length&&(this.D[c]=this.D[d],c++);this.D.length=c;this.$=0}else this.D=a,this.$=b}function J(a,b){var c=K(a);if(null===c)return b;if(c===K(b))return J(L(a),L(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}function K(a){return a.$>=a.D.length?null:a.D[a.$]}function Sc(a){return a.D.length-a.$}
	function L(a){var b=a.$;b<a.D.length&&b++;return new I(a.D,b)}function Tc(a){return a.$<a.D.length?a.D[a.D.length-1]:null}h=I.prototype;h.toString=function(){for(var a="",b=this.$;b<this.D.length;b++)""!==this.D[b]&&(a+="/"+this.D[b]);return a||"/"};h.slice=function(a){return this.D.slice(this.$+(a||0))};h.parent=function(){if(this.$>=this.D.length)return null;for(var a=[],b=this.$;b<this.D.length-1;b++)a.push(this.D[b]);return new I(a,0)};
	h.B=function(a){for(var b=[],c=this.$;c<this.D.length;c++)b.push(this.D[c]);if(a instanceof I)for(c=a.$;c<a.D.length;c++)b.push(a.D[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new I(b,0)};h.j=function(){return this.$>=this.D.length};h.Z=function(a){if(Sc(this)!==Sc(a))return!1;for(var b=this.$,c=a.$;b<=this.D.length;b++,c++)if(this.D[b]!==a.D[c])return!1;return!0};
	h.contains=function(a){var b=this.$,c=a.$;if(Sc(this)>Sc(a))return!1;for(;b<this.D.length;){if(this.D[b]!==a.D[c])return!1;++b;++c}return!0};var M=new I("");function Uc(a,b){this.g=a.slice();this.f=Math.max(1,this.g.length);this.m=b;for(var c=0;c<this.g.length;c++)this.f+=Vc(this.g[c]);Wc(this)}Uc.prototype.push=function(a){0<this.g.length&&(this.f+=1);this.g.push(a);this.f+=Vc(a);Wc(this)};Uc.prototype.pop=function(){var a=this.g.pop();this.f-=Vc(a);0<this.g.length&&--this.f};
	function Wc(a){if(768<a.f)throw Error(a.m+"has a key path longer than 768 bytes ("+a.f+").");if(32<a.g.length)throw Error(a.m+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+Xc(a));}function Xc(a){return 0==a.g.length?"":"in property '"+a.g.join(".")+"'"};function Vc(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};var Yc=/[\[\].#$\/\u0000-\u001F\u007F]/,Zc=/[\[\].#$\u0000-\u001F\u007F]/;function $c(a){return q(a)&&0!==a.length&&!Yc.test(a)}function ad(a){return null===a||q(a)||fa(a)&&!Db(a)||ha(a)&&za(a,".sv")}function bd(a,b,c,d){d&&!p(b)||cd(Qc(a,1,d),b,c)}
	function cd(a,b,c){c instanceof I&&(c=new Uc(c,a));if(!p(b))throw Error(a+"contains undefined "+Xc(c));if(ga(b))throw Error(a+"contains a function "+Xc(c)+" with contents: "+b.toString());if(Db(b))throw Error(a+"contains "+b.toString()+" "+Xc(c));if(q(b)&&b.length>10485760/3&&10485760<Vc(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+Xc(c)+" ('"+b.substring(0,50)+"...')");if(ha(b)){var d=!1,e=!1;Aa(b,function(b,g){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
	!0,!$c(b)))throw Error(a+" contains an invalid key ("+b+") "+Xc(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);cd(a,g,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+Xc(c)+" in addition to actual children.");}}
	function dd(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!$c(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(I.f);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
	function ed(a,b,c){var d=Qc(a,1,!1);if(!ha(b)||ea(b))throw Error(d+" must be an Object containing the children to replace.");if(za(b,".value"))throw Error(d+' must not contain ".value".  To overwrite with a leaf value, just use .set() instead.');var e=[];Aa(b,function(a,b){var k=new I(a);cd(d,b,c.B(k));if(".priority"===Tc(k)&&!ad(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});
	dd(d,e)}function fd(a,b,c){if(Db(c))throw Error(Qc(a,b,!1)+"is "+c.toString()+", but must be a valid Wilddog priority (a string, finite number, server value, or null).");if(!ad(c))throw Error(Qc(a,b,!1)+"must be a valid Wilddog priority (a string, finite number, server value, or null).");}
	function gd(a,b,c){if(!c||p(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(Qc(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function hd(a,b,c,d){if((!d||p(c))&&!$c(c))throw Error(Qc(a,b,d)+'was an invalid key: "'+c+'".  Wilddog keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
	function id(a,b){if(!q(b)||0===b.length||Zc.test(b))throw Error(Qc(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function jd(a,b){if(".info"===K(b))throw Error(a+" failed: Can't modify data under /.info/");}function Hc(a,b){if(!q(b))throw Error(Qc(a,1,!1)+"must be a valid string.");}function Ec(a,b){if(!ha(b)||null===b)throw Error(Qc(a,1,!1)+"must be a valid object.");};function kd(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(navigator.userAgent)}function ld(){return"undefined"!==typeof location&&/^file:\//.test(location.href)}
	function md(){if("undefined"===typeof navigator)return!1;var a=navigator.userAgent;if("Microsoft Internet Explorer"===navigator.appName){if((a=a.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/))&&1<a.length)return 8<=parseFloat(a[1])}else if(-1<a.indexOf("Trident")&&(a=a.match(/rv:([0-9]{2,2}[\.0-9]{0,})/))&&1<a.length)return 8<=parseFloat(a[1]);return!1};function nd(){var a=window.opener.frames,b;for(b=a.length-1;0<=b;b--)try{if(a[b].location.protocol===window.location.protocol&&a[b].location.host===window.location.host&&"__winchan_relay_frame"===a[b].name)return a[b]}catch(c){}return null}function od(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,!1)}function pd(a,b,c){a.detachEvent?a.detachEvent("on"+b,c):a.removeEventListener&&a.removeEventListener(b,c,!1)}
	function qd(a){/^https?:\/\//.test(a)||(a=window.location.href);var b=/^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);return b?b[1]:a}function rd(a){var b="";try{a=a.replace("#","");var c=Ja(a);c&&za(c,"__wilddog_request_key")&&(b=t(c,"__wilddog_request_key"))}catch(d){}return b}function sd(){var a=Cb(Rb);return a.scheme+"://"+a.host+"/v2"}function td(a){return sd()+"/"+a+"/auth/channel"};var ud={NETWORK_ERROR:"Unable to contact the Wilddog server.",SERVER_ERROR:"An unknown server error occurred.",TRANSPORT_UNAVAILABLE:"There are no login transports available for the requested method.",REQUEST_INTERRUPTED:"The browser redirected the page before the login request could complete.",USER_CANCELLED:"The user cancelled authentication."};function vd(a){var b=Error(t(ud,a),a);b.code=a;return b};function xd(a){a.callback_parameter||(a.callback_parameter="callback");this.f=a;window.__wilddog_auth_jsonp=window.__wilddog_auth_jsonp||{}}
	xd.prototype.open=function(a,b,c){function d(){c&&(c(vd("REQUEST_INTERRUPTED")),c=null)}function e(){setTimeout(function(){window.__wilddog_auth_jsonp[f]=void 0;Xa(window.__wilddog_auth_jsonp)&&(window.__wilddog_auth_jsonp=void 0);try{var a=document.getElementById(f);a&&a.parentNode.removeChild(a)}catch(b){}},1);pd(window,"beforeunload",d)}var f="fn"+(new Date).getTime()+Math.floor(99999*Math.random());b[this.f.callback_parameter]="__wilddog_auth_jsonp."+f;a+=(/\?/.test(a)?"":"?")+Ia(b);od(window,
	"beforeunload",d);window.__wilddog_auth_jsonp[f]=function(a){c&&(c(null,a),c=null);e()};yd(f,a,c)};
	function yd(a,b,c){setTimeout(function(){try{var d=document.createElement("script");d.type="text/javascript";d.id=a;d.async=!0;d.src=b;d.onerror=function(){var b=document.getElementById(a);null!==b&&b.parentNode.removeChild(b);c&&c(vd("NETWORK_ERROR"))};var e,f=document.getElementsByTagName("head");f&&0!=f.length?e=f[0]:e=document.documentElement;e.appendChild(d)}catch(g){c&&c(vd("NETWORK_ERROR"))}},0)}xd.isAvailable=function(){return!NODE_CLIENT};xd.prototype.Lb=function(){return"json"};function zd(a){a.method||(a.method="GET");a.headers||(a.headers={});a.headers.content_type||(a.headers.content_type="application/json");a.headers.content_type=a.headers.content_type.toLowerCase();this.f=a}
	zd.prototype.open=function(a,b,c){function d(){c&&(c(vd("REQUEST_INTERRUPTED")),c=null)}var e=new XMLHttpRequest,f=this.f.method.toUpperCase(),g;od(window,"beforeunload",d);e.onreadystatechange=function(){if(c&&4===e.readyState){var a;if(200<=e.status&&300>e.status){try{a=Ka(e.responseText)}catch(b){}c(null,a)}else 500<=e.status&&600>e.status?c(vd("SERVER_ERROR")):c(vd("NETWORK_ERROR"));c=null;pd(window,"beforeunload",d)}};if("GET"===f)a+=(/\?/.test(a)?"":"?")+Ia(b),g=null;else{var k=this.f.headers.content_type;
	"application/json"===k&&(g=v(b));"application/x-www-form-urlencoded"===k&&(g=Ia(b))}e.open(f,a,!0);a={"X-Requested-With":"XMLHttpRequest",Accept:"application/json;text/plain"};$a(a,this.f.headers);for(var l in a)e.setRequestHeader(l,a[l]);e.send(g)};zd.isAvailable=function(){return!NODE_CLIENT&&!!window.XMLHttpRequest&&(!("undefined"!==typeof navigator&&(navigator.userAgent.match(/MSIE/)||navigator.userAgent.match(/Trident/)))||md())};zd.prototype.Lb=function(){return"json"};function Ad(a){if(!a.window_features||"undefined"!==typeof navigator&&(-1!==navigator.userAgent.indexOf("Fennec/")||-1!==navigator.userAgent.indexOf("Firefox/")&&-1!==navigator.userAgent.indexOf("Android")))a.window_features=void 0;a.window_name||(a.window_name="_blank");this.f=a}
	Ad.prototype.open=function(a,b,c){function d(a){g&&(document.body.removeChild(g),g=void 0);u&&(u=clearInterval(u));pd(window,"message",e);pd(window,"unload",d);if(m&&!a)try{m.close()}catch(b){k.postMessage("die",l)}m=k=void 0}function e(a){if(a.origin===l)try{var b=Ka(a.data);"ready"===b.a?k.postMessage(A,l):"error"===b.a?(d(!1),c&&(c(b.d),c=null)):"response"===b.a&&(d(b.forceKeepWindowOpen),c&&(c(null,b.d),c=null))}catch(e){}}var f=md(),g,k;if(!this.f.relay_url)return c(Error("invalid arguments: origin of url and relay_url must match"));
	var l=qd(a);if(l!==qd(this.f.relay_url))c&&setTimeout(function(){c(Error("invalid arguments: origin of url and relay_url must match"))},0);else{f&&(g=document.createElement("iframe"),g.setAttribute("src",this.f.relay_url),g.style.display="none",g.setAttribute("name","__winchan_relay_frame"),document.body.appendChild(g),k=g.contentWindow);a+=(/\?/.test(a)?"":"?")+Ia(b);var m=window.open(a,this.f.window_name,this.f.window_features);k||(k=m);var u=setInterval(function(){m&&m.closed&&(d(!1),c&&(c(vd("USER_CANCELLED")),
	c=null))},500),A=v({a:"request",d:b});od(window,"unload",d);od(window,"message",e)}};
	Ad.isAvailable=function(){return!NODE_CLIENT&&"postMessage"in window&&!ld()&&!(kd()||"undefined"!==typeof navigator&&(navigator.userAgent.match(/Windows Phone/)||window.Windows&&/^ms-appx:/.test(location.href))||"undefined"!==typeof navigator&&"undefined"!==typeof window&&(navigator.userAgent.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i)||navigator.userAgent.match(/CriOS/)||navigator.userAgent.match(/Twitter for iPhone/)||navigator.userAgent.match(/FBAN\/FBIOS/)||window.navigator.standalone))&&
	!("undefined"!==typeof navigator&&navigator.userAgent.match(/PhantomJS/))};Ad.prototype.Lb=function(){return"popup"};function Bd(a,b,c){this.ac=a||{};this.Wb=b||{};this.ga=c||{};this.ac.remember||(this.ac.remember="default")}var Cd=["remember","redirectTo"];function Dd(a){var b={},c={};Aa(a||{},function(a,e){0<=oa(Cd,a)?b[a]=e:c[a]=e});return new Bd(b,{},c)};function Ed(a){this.f=na()+na()+na();this.g=a}
	Ed.prototype.open=function(a,b,c){function d(){c&&(c(vd("USER_CANCELLED")),c=null)}var e=this,f=Cb(Rb),g;b.requestId=this.f;b.redirectTo=f.scheme+"://"+f.host+"/blank/page.html";a+=/\?/.test(a)?"":"?";a+=Ia(b);(g=window.open(a,"_blank","location=no"))&&ga(g.addEventListener)?(g.addEventListener("loadstart",function(a){var b;if(b=a&&a.url)a:{try{var m=document.createElement("a");m.href=a.url;b=m.host===f.host&&"/blank/page.html"===m.pathname;break a}catch(u){}b=!1}b&&(a=rd(a.url),g.removeEventListener("exit",
	d),g.close(),a=new Bd(null,null,{requestId:e.f,requestKey:a}),e.g.requestWithCredential("/auth/session",a,c),c=null)}),g.addEventListener("exit",d)):c(vd("TRANSPORT_UNAVAILABLE"))};Ed.isAvailable=function(){return!NODE_CLIENT&&kd()};Ed.prototype.Lb=function(){return"redirect"};function Fd(){this.f=na()+na()+na()}Fd.prototype.open=function(a,b){y.set("redirect_request_id",this.f);y.set("redirect_request_id",this.f);b.requestId=this.f;b.redirectTo=b.redirectTo||window.location.href;a+=(/\?/.test(a)?"":"?")+Ia(b);window.location=a};Fd.isAvailable=function(){return!NODE_CLIENT&&!ld()&&!kd()};Fd.prototype.Lb=function(){return"redirect"};function Hd(a,b,c){this.A=a;this.xa=a.app;this.g=b;this.m=new Sb(this.xa.name,b,[db,y]);this.Ja=null;this.o=c;Id(this)}function Id(a){y.get("redirect_request_id")&&Jd(a);var b=a.m.get();b&&b.idToken?Nc(a,b.idToken,function(c,d){if(!c&&d){var e={signIn:!0};e.currentUser=d;e.idToken=b.idToken;Jc(a,e);Kd(a,e,{})}else Jc(a,null)}):Jc(a,null)}function Ld(a,b,c,d){b&&b.idToken?Md(a,b.idToken,c,d):(Jc(a,null),C(d,Error("No idToken found in response.")))}
	function Md(a,b,c,d){Nc(a,b,function(e,f){if(!e&&f){var g={signIn:!0};g.currentUser=f;g.idToken=b;Jc(a,g);Kd(a,g,c);C(d,e,f)}else Jc(a,null),C(d,e)})}
	function Gc(a,b,c){Nd(a);var d=new Bd({},{},b||{}),e;e="POST";switch(b.providerId||b.provider){case "password":b="verifyPassword";break;case "anonymous":b="verifyAnonymous";break;case "custom":b="verifyCustomToken";break;default:b="credential",e="GET"}if(!b)throw Error("Unknown provider '"+provider+"'.");e={path:b,method:e};d.ga._method=e.method;Od(a,[zd,xd],"/auth/"+e.path,d,c)}
	function Kc(a,b,c,d){Nd(a);var e=[Ad,Ed];c=Dd(c);b.id?(c.ga.providerId=b.id,c.ga.scope=b.scope||"",c.ga.appId=a.g.Fb,c.Wb.window_features="menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top="+("object"===typeof screen?.5*(screen.height-625):0)+",left="+("object"===typeof screen?.5*(screen.width-625):0),c.Wb.relay_url=td(a.g.Fb),c.Wb.requestWithCredential=r(a.f,a),Od(a,e,"/auth/oauth",c,d)):setTimeout(function(){C(d,vd("TRANSPORT_UNAVAILABLE_FOR_UNKNOWN_PROVIDER"))},
	0)}function Lc(a,b,c,d){Nd(a);var e=[Fd];c=Dd(c);b.id?(c.ga.providerId=b.id,c.ga.scope=b.scope||"",c.ga.appId=a.g.Fb,y.set("redirect_client_options",c.ac),Od(a,e,"/auth/oauth",c,d)):C(d,vd("TRANSPORT_UNAVAILABLE"))}
	function Jd(a){var b=y.get("redirect_request_id");if(b){var c=y.get("redirect_client_options"),d=[zd,xd],b={requestId:b,requestKey:rd(document.location.hash)},c=new Bd(c,{},b);try{document.location.hash=document.location.hash.replace(/&__wilddog_request_key=([a-zA-z0-9]*)/,"")}catch(e){}Od(a,d,"/auth/session",c,function(){y.remove("redirect_request_id");y.remove("redirect_client_options")}.bind(a))}}
	function Pd(a,b,c){Nd(a);b=Dd(b);b.ga._method="POST";a.f("/auth/signupNewUser",b,function(b,e){!b&&e&&e.idToken?Md(a,e.idToken,null,c):C(c,b)})}function Ic(a,b,c,d){var e={idToken:c.idToken},f=c.photoURL||a.Ja.currentUser.photoURL,g=c.displayName||a.Ja.currentUser.displayName;switch(b){case "unlink":e.deleteProvider=c.deleteProvider;break;case "profile":e.photoUrl=f,e.displayName=g}Qd(a,e,function(b,c){b?C(d,b):(a.Ja.currentUser.displayName=g,a.Ja.currentUser.photoURL=f,Kd(a,a.Ja),C(d,b,c))})}
	function Fc(a,b,c){Qd(a,b,function(b,e){b?C(c,b):Ld(a,e,{},c)})}function Qd(a,b,c){b=Dd(b);b.ga._method="POST";b.ga.idToken=a.Ja.idToken;a.f("/auth/setAccountInfo",b,function(a,b){a?C(c,a):C(c,a,b)})}function Nc(a,b,c){Nd(a);b=Dd({idToken:b});b.ga._method="POST";a.f("/auth/getAccountInfo",b,function(b,e){b?C(c,b):C(c,b,Pc(a,e))})}
	function Dc(a,b,c){Nd(a);b=Dd({idToken:b});b.ga._method="POST";a.f("/auth/deleteAccount",b,function(b,e){!b&&e&&"ok"==e.status&&a.Ja&&(Jc(a,null),C(void 0,null));C(c,b)})}function Mc(a,b,c){Nd(a);b=Dd(b);b.ga._method="POST";a.f("/auth/getOobConfirmationCode",b,function(a,b){C(c,a,b)})}Hd.prototype.Hc=function(a,b){Nd(this);var c=Dd({email:a});c.ga._method="POST";this.f("/auth/getProvider",c,function(a,c){a?C(b,a):C(b,a,c.allProviders||[])})};Hd.prototype.f=function(a,b,c){Rd(this,[zd,xd],a,b,c)};
	function Od(a,b,c,d,e){Rd(a,b,c,d,function(b,c){!b&&c&&c.idToken?Ld(a,c,d.ac,function(a,b){a?C(e,a):C(e,null,b)}):C(e,b||vd("UNKNOWN_ERROR"))})}
	function Rd(a,b,c,d,e){b=qa(b,function(a){return"function"===typeof a.isAvailable&&a.isAvailable()});0===b.length?setTimeout(function(){C(e,vd("TRANSPORT_UNAVAILABLE"))},0):(b=b.shift(),d.Wb.method=d.ga._method,b=new b(d.Wb),d=Ba(d.ga),d.v=(NODE_CLIENT?"node-":"js-")+CLIENT_VERSION,d.transport=b.Lb(),d.suppress_status_codes=!0,a=sd()+"/"+a.g.Fb+c,b.open(a,d,function(a,b){if(a)C(e,a);else if(b&&b.error){var c=Error(b.error.message);c.code=b.error.code;c.details=b.error.details;C(e,c)}else C(e,null,
	b)}))}function Kd(a,b,c){Tb(a.m);c=c||{};var d=db;"sessionOnly"===c.remember&&(d=y);"none"!==c.remember&&a.m.set(b,d)}function Jc(a,b){a.Ja=b;a.A.currentUser=b&&b.signIn?b.currentUser:null;a.o&&a.o(null!==b);b&&b.signIn||Tb(a.m);a.xa.emit(Ob.Pa,b||{signIn:!1})}function Nd(a){if(a.g.nd&&"auth.wilddog.com"===Rb)throw Error("This custom Wilddog server ('"+a.g.domain+"') does not support delegated login.");};function Sd(){var a="undefined"!==typeof window?window:global;if(!a.wilddog){a.wilddog={};var b={};a.wilddog.initializeApp=function(b,d){var e=d||"DEFAULT";a.wilddog[e]=new Nb(b,e);return a.wilddog[e]};a.wilddog.__regService=function(a,d){b[a]=d};a.wilddog.__getService=function(a){return b[a]};["auth","sync"].forEach(function(b){a.wilddog[b]=function(){if(!a.wilddog.DEFAULT)throw Error("App has not been initialized.");return a.wilddog.DEFAULT[b]()}});n.wilddog=a.wilddog}return a.wilddog||n.wilddog}
	;Sd().__regService("auth",function(a){return new N(a)});
	function N(a){if(!a.options.authDomain)throw Error("Could not find 'authDomain' in options.");var b=this;this.g=function(a){var b=/^([a-zA-Z0-9\-_]+)\.([a-z]+)\.com/.exec(a.toLowerCase());if(!b)throw Error("Bad 'authDomain' format '"+a+"'.");return{Fb:b[1],Xe:b[2],Qe:b[0],pc:"",nd:"wilddog"!==b[2]}}(a.options.authDomain);this.app=a;this.f=new Hd(this,this.g);this.app.bind(Ob.dd,function(a){var d=b.f;a=a.reason;d.Ja=null;d.A.currentUser=null;d.xa.emit(Ob.Pa,{signIn:!1,reason:a});d.o&&d.o(!1);Tb(d.m)})}
	N.prototype.de=function(a){function b(b){var e;if(!(e=b&&b.signIn)){var f=c.f;e=y.get("redirect_request_id");f=f.m.get();e=!(e||f&&f.idToken)}e&&a(b&&b.signIn?b.currentUser:null)}var c=this;G("wilddog.auth().onAuthStateChanged",1,1,arguments.length);H("wilddog.auth().onAuthStateChanged",1,a,!1);this.app.bind(Ob.Pa,b);return function(){c.app.unbind(Ob.Pa,b)}};N.prototype.onAuthStateChanged=N.prototype.de;
	N.prototype.se=function(a){G("wilddog.auth().signInAnonymously",0,1,arguments.length);H("wilddog.auth().signInAnonymously",1,a,!0);var b=new D;Pd(this.f,{},E(b,a));return b.f};N.prototype.signInAnonymously=N.prototype.se;N.prototype.oe=function(a,b){G("wilddog.auth().sendPasswordResetEmail",1,2,arguments.length);H("wilddog.auth().sendPasswordResetEmail",2,b,!0);var c=new D;Mc(this.f,{requestType:"RESET_PASSWORD",email:a},E(c,b));return c.f};N.prototype.sendPasswordResetEmail=N.prototype.oe;
	N.prototype.Hc=function(a,b){G("wilddog.auth().fetchProvidersForEmail",1,2,arguments.length);H("wilddog.auth().fetchProvidersForEmail",2,b,!0);var c=new D;this.f.Hc(a,E(c,b));return c.f};N.prototype.fetchProvidersForEmail=N.prototype.Hc;N.prototype.ue=function(a,b){G("wilddog.auth().signInWithCustomToken",1,2,arguments.length);H("wilddog.auth().signInWithCustomToken",2,b,!0);var c=new D;Gc(this.f,{providerId:"custom",token:a},E(c,b));return c.f};N.prototype.signInWithCustomToken=N.prototype.ue;
	N.prototype.ve=function(a,b,c){G("wilddog.auth().signInWithEmailAndPassword",2,3,arguments.length);H("wilddog.auth().signInWithEmailAndPassword",3,c,!0);var d=new D;Gc(this.f,{providerId:"password",password:b,email:a},E(d,c));return d.f};N.prototype.signInWithEmailAndPassword=N.prototype.ve;N.prototype.ye=function(a){G("wilddog.auth().signOut",0,1,arguments.length);H("wilddog.auth().signOut",1,a,!0);var b=new D,c=E(b,a);Jc(this.f,null);C(c,null);return b.f};N.prototype.signOut=N.prototype.ye;
	N.prototype.Rd=function(a,b,c){G("wilddog.auth().createUserWithEmailAndPassword",2,3,arguments.length);H("wilddog.auth().createUserWithEmailAndPassword",3,c,!0);var d=new D;Pd(this.f,{email:a,password:b},E(d,c));return d.f};N.prototype.createUserWithEmailAndPassword=N.prototype.Rd;N.prototype.we=function(a,b){G("wilddog.auth().signInWithPopup",1,2,arguments.length);Ec("wilddog.auth().signInWithPopup",a);var c=new D;Kc(this.f,a,{authType:"login"},E(c,b));return c.f};N.prototype.signInWithPopup=N.prototype.we;
	N.prototype.xe=function(a,b){G("wilddog.auth().signInWithRedirect",1,2,arguments.length);Ec("wilddog.auth().signInWithRedirect",a);var c=new D;Lc(this.f,a,{authType:"login"},E(c,b));return c.f};N.prototype.signInWithRedirect=N.prototype.xe;
	N.prototype.te=function(a,b){G("wilddog.auth().signInWithCredential",1,2,arguments.length);Ec("wilddog.auth().signInWithCredential",a);var c={};c.providerId=a.provider;c.accessToken=a.accessToken;c.openId=a.openId||"";c.authType="login";var d=new D;Gc(this.f,c,E(d,b));return d.f};N.prototype.signInWithCredential=N.prototype.te;function Td(){this.f={}}Td.prototype.get=function(){return Ya(this.f)};var Ud={},Vd=null;"undefined"!="function"&&"undefined"!==typeof module&&module.exports?Vd=__webpack_require__(81):Vd=eio;function Wd(a,b,c,d,e,f){this.id=a;this.m=zb("c:"+this.id+":");this.pa=c;this.I=d;this.A=e;this.W=f;this.f=b;this.o=0;this.m("Connection created");this.g=Xd(this);this.g.on("open",Yd(this));this.g.on("error",Zd(this))}function Yd(a){return function(){a.g.on("message",$d(a));a.g.on("close",ae(a))}}
	function $d(a){return function(b){if(null==b)throw Error("data is null");if(0!=b.charAt(0))if(2==b.charAt(0)){var c=null;try{c=JSON.parse(b.substr(1))}catch(f){throw f;}if("object"!=typeof c||2>c.length)throw Error("decodedData in wrong format");b=c[1];if("wd"==c[0])if("c"==b.t)if(c=b.d,"h"==c.t){b=c.d;var c=b.ts,d=b.v,e=b.h;a.sessionId=b.s;"1.0"!=d&&B("Protocol version mismatch detected");0==a.o&&(e!=a.f.Aa?(be(a.f,e),a.m("updateHost ",e),a.g.close(),a.g=Xd(a),a.g.on("open",Yd(a)),a.g.on("error",
	Zd(a))):(a.o=1,a.m("realtime state connected"),b=a.f,d=b.Ra.indexOf(a.f.Aa),0<=d&&(b.Ra.splice(d,1),y.set("failHosts",JSON.stringify(b.Ra))),a.I&&(a.I(c),a.I=null)))}else"r"==c.t?(c=c.d,a.m("Reset packet received.  New host: "+c),be(a.f,c),a.close()):"s"==c.t&&(a.W(c.d),a.close());else"d"==b.t&&a.pa(b.d);else a.m("eventType not known")}else 1!=b.charAt(0)&&a.m("data format error")}}function ae(a){return function(){2!==a.o&&(a.m("Closing realtime connection."),a.o=2,a.A&&(a.A(),a.A=null))}}
	function Zd(a){return function(b){if(0==a.o){var c=a.f.Aa,d=a.f;null!=c&&0>d.Ra.indexOf(c)&&c!=d.host&&(d.Ra.push(c),y.set("failHosts",JSON.stringify(d.Ra)));a.m("error while connecting",b,c);be(a.f)}a.close()}}
	function Xd(a){var b=(a.f.hb?"https://":"http://")+a.f.Aa+"?v=1.0&cv="+CLIENT_VERSION,c=a.f;c.host!==c.Aa&&(b=b+"&ns="+a.f.qd);a.sessionId&&(b=b+"&s="+a.sessionId);0<a.f.Ra.length&&(b=b+"&fst="+encodeURIComponent(a.f.Ra.join(",")));a={path:"/.ws",rememberUpgrade:!0};"undefined"==typeof document&&(a.jsonp=!1);return Vd(b,a)}Wd.prototype.va=function(a){a="2"+JSON.stringify(["wd",{t:"d",d:a}]);this.g.send(a)};
	Wd.prototype.close=function(){2!==this.o&&(this.m("Closing realtime connection."),this.o=2,this.g.close(),this.A&&(this.A(),this.A=null))};function ce(){Lb.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.pa=!0;if(b){var c=this;document.addEventListener(b,
	function(){var b=!document[a];b!==c.pa&&(c.pa=b,c.m("visible",b))},!1)}}la(ce,Lb);ce.prototype.o=function(a){z("visible"===a,"Unknown event type: "+a);return[this.pa]};ca(ce);function de(){Lb.call(this,["online"]);this.f=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener){var a=this;window.addEventListener("online",function(){a.f||(a.f=!0,a.m("online",!0))},!1);window.addEventListener("offline",function(){a.f&&(a.f=!1,a.m("online",!1))},!1)}}la(de,Lb);de.prototype.o=function(a){z("online"===a,"Unknown event type: "+a);return[this.f]};ca(de);function ee(a,b,c,d){this.id=fe++;this.f=zb("p:"+this.id+":");this.Zc=this.zc=!1;this.da={};this.m=[];this.Ka=0;this.Fa=[];this.g=!1;this.I=1E3;this.lb=3E5;this.ad=b;this.$c=c;this.Nd=d;this.bd=a;this.Tc=null;this.Yb={};this.Ld=0;this.Ea=this.Ac=null;ge(this,0);ce.sb().Va("visible",this.he,this);-1===a.host.indexOf("wd.local")&&de.sb().Va("online",this.ge,this)}var fe=0,he=0;h=ee.prototype;
	h.va=function(a,b,c){var d=++this.Ld;a={r:d,a:a,b:b};this.f(v(a));z(this.g,"sendRequest call when we're not connected not allowed.");this.A.va(a);c&&(this.Yb[d]=c)};h.od=function(a,b,c,d){var e=a.ra(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.da[f]=this.da[f]||{};z(!this.da[f][e],"listen() called twice for same path/queryId.");a={S:d,jc:b,je:a,tag:c};this.da[f][e]=a;this.g&&ie(this,a)};
	function ie(a,b){var c=b.je,d=c.path.toString(),e=c.ra();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=je(c.F),f.t=b.tag);f.h=b.jc();a.va("q",f,function(f){var k=f.d,l=f.s;if(k&&"object"===typeof k&&za(k,"w")){var m=t(k,"w");ea(m)&&0<=oa(m,"no_index")&&B("Using an unspecified index. Consider adding "+('".indexOn": "'+c.F.U().toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.da[d]&&a.da[d][e])===b&&(a.f("listen response",f),"ok"!==l&&ke(a,d,e),b.S&&
	b.S(l,k))})}h.Ed=function(a,b,c){this.o={Sd:a,hd:!1,Kb:b,$b:c};this.f("Authenticating using credential: "+a);le(this);40==a.length&&(this.f("Admin auth credential detected.  Reducing max reconnect time."),this.lb=3E4)};h.Cd=function(a){delete this.o;this.g&&this.va("unauth",{},function(b){a(b.s,b.d)})};function le(a){var b=a.o;a.g&&b&&a.va("auth",{cred:b.Sd},function(c){var d=c.s;c=c.d||"error";"ok"!==d&&a.o===b&&delete a.o;b.hd?"ok"!==d&&b.$b&&b.$b(d,c):(b.hd=!0,b.Kb&&b.Kb(d,c))})}
	h.Dd=function(a,b){var c=a.path.toString(),d=a.ra();this.f("Unlisten called for "+c+" "+d);if(ke(this,c,d)&&this.g){var e=je(a.F);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.va("n",c)}};h.Pc=function(a,b,c){this.g?me(this,"o",a,b,c):this.Fa.push({Ub:a,action:"o",data:b,S:c})};h.rd=function(a,b,c){this.g?me(this,"om",a,b,c):this.Fa.push({Ub:a,action:"om",data:b,S:c})};h.nc=function(a,b){this.g?me(this,"oc",a,null,b):this.Fa.push({Ub:a,action:"oc",data:null,S:b})};
	function me(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.va(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}h.Db=function(a,b,c,d){ne(this,"p",a,b,c,d)};h.pd=function(a,b,c,d){ne(this,"m",a,b,c,d)};function ne(a,b,c,d,e,f){d={p:c,d:d};p(f)&&(d.h=f);a.m.push({action:b,request:d,S:e});a.Ka++;b=a.m.length-1;a.g?oe(a,b):a.f("Buffering put: "+c)}
	function oe(a,b){var c=a.m[b].action,d=a.m[b].request,e=a.m[b].S;a.m[b].ke=a.g;a.va(c,d,function(d){a.f(c+" response",d);delete a.m[b];a.Ka--;0===a.Ka&&(a.m=[]);e&&e(d.s,d.d)})}h.Qc=function(a){if(this.g){a={c:a};this.f("reportStats",a);var b=this;this.va("s",a,function(a){"ok"!==a.s&&b.f("reportStats","Error sending stats: "+a.d)})}};
	h.ee=function(a){if("r"in a){this.f("from server: "+v(a));var b=a.r,c=this.Yb[b];c&&(delete this.Yb[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,c=a.b,this.f("handleServerMessage",b,c),"d"===b?this.ad(c.p,c.d,!1,c.t):"m"===b?this.ad(c.p,c.d,!0,c.t):"c"===b?pe(this,c.p,c.q):"ac"===b?(a=c.s,b=c.d,c=this.o,delete this.o,c&&c.$b&&c.$b(a,b)):"sd"===b?this.Tc?this.Tc(c):"msg"in c&&"undefined"!==typeof console&&console.log("WILDDOG: "+c.msg.replace("\n",
	"\nWILDDOG: ")):Ab("Unrecognized action received from server: "+v(b)+"\nAre you using the latest client?"))}};h.Ie=function(a){this.f("connection ready");this.g=!0;this.Ea=(new Date).getTime();this.Nd({serverTimeOffset:a-(new Date).getTime()});a={};a["sdk.js."+CLIENT_VERSION.replace(/\./g,"-")]=1;kd()&&(a["framework.cordova"]=1);this.Qc(a);qe(this);this.$c(!0)};
	function ge(a,b){z(!a.A,"Scheduling a connect when we're already connected/ing?");a.W&&clearTimeout(a.W);a.W=setTimeout(function(){a.W=null;re(a)},Math.floor(b))}h.he=function(a){a&&!this.pa&&this.I===this.lb&&(this.f("Window became visible.  Reducing delay."),this.I=1E3,this.A||ge(this,0));this.pa=a};h.ge=function(a){a?(this.f("Browser went online."),this.I=1E3,this.A||ge(this,0)):(this.f("Browser went offline.  Killing connection."),this.A&&this.A.close())};
	h.sd=function(){this.f("data client disconnected");this.g=!1;this.A=null;for(var a=0;a<this.m.length;a++){var b=this.m[a];b&&"h"in b.request&&b.ke&&(b.S&&b.S("disconnect"),delete this.m[a],this.Ka--)}0===this.Ka&&(this.m=[]);this.Yb={};se(this)&&(this.pa?this.Ea&&(3E4<(new Date).getTime()-this.Ea&&(this.I=1E3),this.Ea=null):(this.f("Window isn't visible.  Delaying reconnect."),this.I=this.lb,this.Ac=(new Date).getTime()),a=Math.max(0,this.I-((new Date).getTime()-this.Ac)),a*=Math.random(),this.f("Trying to reconnect in "+
	a+"ms"),ge(this,a),this.I=Math.min(this.lb,1.3*this.I));this.$c(!1)};function re(a){if(se(a)){a.f("Making a connection attempt");a.Ac=(new Date).getTime();a.Ea=null;var b=r(a.ee,a),c=r(a.Ie,a),d=r(a.sd,a),e=a.id+":"+he++;a.A=new Wd(e,a.bd,b,c,d,function(b){B(b+" ("+a.bd.toString()+")");a.Zc=!0})}}h.cb=function(){this.zc=!0;this.A?this.A.close():(this.W&&(clearTimeout(this.W),this.W=null),this.g&&this.sd())};h.Bb=function(){this.zc=!1;this.I=1E3;this.A||ge(this,0)};
	function pe(a,b,c){c=c?ra(c,function(a){return Gb(a)}).join("$"):"default";(a=ke(a,b,c))&&a.S&&a.S("permission_denied")}function ke(a,b,c){b=(new I(b)).toString();var d;p(a.da[b])?(d=a.da[b][c],delete a.da[b][c],0===Pa(a.da[b])&&delete a.da[b]):d=void 0;return d}function qe(a){le(a);x(a.da,function(b){x(b,function(b){ie(a,b)})});for(var b=0;b<a.m.length;b++)a.m[b]&&oe(a,b);for(;a.Fa.length;)b=a.Fa.shift(),me(a,b.action,b.Ub,b.data,b.S)}function se(a){var b;b=de.sb().f;return!a.Zc&&!a.zc&&b};function te(){this.children={};this.Dc=0;this.value=null}function ue(a,b,c){this.m=a?a:"";this.g=b?b:null;this.f=c?c:new te}function ve(a,b){for(var c=b instanceof I?b:new I(b),d=a,e;null!==(e=K(c));)d=new ue(e,d,t(d.f.children,e)||new te),c=L(c);return d}h=ue.prototype;h.ta=function(){return this.f.value};function we(a,b){z("undefined"!==typeof b,"Cannot set value to undefined");a.f.value=b;xe(a)}h.ic=function(){return 0<this.f.Dc};h.j=function(){return null===this.ta()&&!this.ic()};
	h.V=function(a){var b=this;x(this.f.children,function(c,d){a(new ue(d,b,c))})};function ye(a,b,c,d){c&&!d&&b(a);a.V(function(a){ye(a,b,!0,d)});c&&d&&b(a)}function ze(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}h.path=function(){return new I(null===this.g?this.m:this.g.path()+"/"+this.m)};h.name=function(){return this.m};h.parent=function(){return this.g};
	function xe(a){if(null!==a.g){var b=a.g,c=a.m,d=a.j(),e=za(b.f.children,c);d&&e?(delete b.f.children[c],b.f.Dc--,xe(b)):d||e||(b.f.children[c]=a.f,b.f.Dc++,xe(b))}};function Ae(a,b){return Eb(a.name,b.name)}function Be(a,b){return Eb(a,b)};function Ce(){}Ce.f;var De={};function Ee(a){return r(a.compare,a)}Ce.prototype.kc=function(a,b){return 0!==this.compare(new P("[MIN_NAME]",a),new P("[MIN_NAME]",b))};Ce.prototype.Sb=function(){return Fe};function Ge(a){this.f=a}la(Ge,Ce);h=Ge.prototype;h.Ob=function(a){return!a.P(this.f).j()};h.compare=function(a,b){var c=a.node.P(this.f),d=b.node.P(this.f),c=c.ob(d);return 0===c?Eb(a.name,b.name):c};h.Pb=function(a,b){var c=Q(a),c=w.T(this.f,c);return new P(b,c)};
	h.Qb=function(){var a=w.T(this.f,He);return new P("[MAX_NAME]",a)};h.toString=function(){return this.f};function Ie(){}la(Ie,Ce);h=Ie.prototype;h.compare=function(a,b){var c=a.node.J(),d=b.node.J(),c=c.ob(d);return 0===c?Eb(a.name,b.name):c};h.Ob=function(a){return!a.J().j()};h.kc=function(a,b){return!a.J().Z(b.J())};h.Sb=function(){return Fe};h.Qb=function(){return new P("[MAX_NAME]",new Je("[PRIORITY-POST]",He))};h.Pb=function(a,b){var c=Q(a);return new P(b,new Je("[PRIORITY-POST]",c))};
	h.toString=function(){return".priority"};var R=new Ie;function Ke(){}la(Ke,Ce);h=Ke.prototype;h.compare=function(a,b){return Eb(a.name,b.name)};h.Ob=function(){throw qb("KeyIndex.isDefinedOn not expected to be called.");};h.kc=function(){return!1};h.Sb=function(){return Fe};h.Qb=function(){return new P("[MAX_NAME]",w)};h.Pb=function(a){z(q(a),"KeyIndex indexValue must always be a string.");return new P(a,w)};h.toString=function(){return".key"};var Le=new Ke;function Me(){}la(Me,Ce);h=Me.prototype;
	h.compare=function(a,b){var c=a.node.ob(b.node);return 0===c?Eb(a.name,b.name):c};h.Ob=function(){return!0};h.kc=function(a,b){return!a.Z(b)};h.Sb=function(){return Fe};h.Qb=function(){return Ne};h.Pb=function(a,b){var c=Q(a);return new P(b,c)};h.toString=function(){return".value"};var Oe=new Me;function S(){}S.prototype.R;S.prototype.J;S.prototype.aa;S.prototype.P;S.prototype.ia;S.prototype.Lc;S.prototype.T;S.prototype.M;S.prototype.ua;S.prototype.j;S.prototype.Ua;S.prototype.N;S.prototype.hash;S.prototype.ob;S.prototype.Z;S.prototype.Na;S.prototype.zb;function P(a,b){this.name=a;this.node=b}function Pe(a,b){return new P(a,b)};function Qe(){this.set={}}h=Qe.prototype;h.add=function(a,b){this.set[a]=null!==b?b:!0};h.contains=function(a){return za(this.set,a)};h.get=function(a){return this.contains(a)?this.set[a]:void 0};h.remove=function(a){delete this.set[a]};h.j=function(){return Xa(this.set)};h.count=function(){return Pa(this.set)};function Re(a,b){x(a.set,function(a,d){b(d,a)})};function Se(){this.C=this.K=null}Se.prototype.find=function(a){if(null!=this.K)return this.K.ia(a);if(a.j()||null==this.C)return null;var b=K(a);a=L(a);return this.C.contains(b)?this.C.get(b).find(a):null};function Te(a,b,c){if(b.j())a.K=c,a.C=null;else if(null!==a.K)a.K=a.K.M(b,c);else{null==a.C&&(a.C=new Qe);var d=K(b);a.C.contains(d)||a.C.add(d,new Se);a=a.C.get(d);b=L(b);Te(a,b,c)}}
	function Ue(a,b){if(b.j())return a.K=null,a.C=null,!0;if(null!==a.K){if(a.K.R())return!1;var c=a.K;a.K=null;c.V(R,function(b,c){Te(a,new I(b),c)});return Ue(a,b)}return null!==a.C?(c=K(b),b=L(b),a.C.contains(c)&&Ue(a.C.get(c),b)&&a.C.remove(c),a.C.j()?(a.C=null,!0):!1):!0}function Ve(a,b,c){null!==a.K?c(b,a.K):a.V(function(a,e){var f=new I(b.toString()+"/"+a);Ve(e,f,c)})}Se.prototype.V=function(a){null!==this.C&&Re(this.C,function(b,c){a(b,c)})};function We(a,b){this.Bd={};this.W=new Xe(a);this.g=b;var c=1E4+2E4*Math.random();setTimeout(r(this.f,this),Math.floor(c))}We.prototype.f=function(){var a=this.W.get(),b={},c=!1,d;for(d in a)0<a[d]&&za(this.Bd,d)&&(b[d]=a[d],c=!0);c&&this.g.Qc(b);setTimeout(r(this.f,this),Math.floor(6E5*Math.random()))};function Xe(a){this.g=a;this.f=null}Xe.prototype.get=function(){var a=this.g.get(),b=Ya(a);if(this.f)for(var c in this.f)b[c]-=this.f[c];this.f=a;return b};var Ye={},Ze={};function $e(a){a=a.toString();Ye[a]||(Ye[a]=new Td);return Ye[a]}function af(a,b){var c=a.toString();Ze[c]||(Ze[c]=b());return Ze[c]};function bf(a,b){return a&&"object"===typeof a?(z(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function cf(a,b){var c=new Se;Ve(a,new I(""),function(a,e){Te(c,a,df(e,b))});return c}function df(a,b){var c=a.J().N(),c=bf(c,b),d;if(a.R()){var e=bf(a.ta(),b);return e!==a.ta()||c!==a.J().N()?new Je(e,Q(c)):a}d=a;c!==a.J().N()&&(d=d.aa(new Je(c)));a.V(R,function(a,c){var e=df(c,b);e!==c&&(d=d.T(a,e))});return d};function ef(a,b){this.f=zb("p:rest:");this.g=a;this.m=b;this.o=null;this.da={}}function ff(a,b){if(p(b))return"tag$"+b;var c=a.F;z(gf(c)&&c.w==R,"should have a tag if it's not a default query.");return a.path.toString()}h=ef.prototype;
	h.od=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.ra());var f=ff(a,c),g={};this.da[f]=g;a=hf(a.F);var k=this;jf(this,e+".json",a,function(a,b){var u=b;404===a&&(a=u=null);null===a&&k.m(e,u,!1,c);t(k.da,f)===g&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};h.Dd=function(a,b){var c=ff(a,b);delete this.da[c]};h.Ed=function(a,b){this.o=a;var c=Pb(a),d=c.data,c=c.Ec&&c.Ec.exp;b&&b("ok",{auth:d,expires:c})};h.Cd=function(a){this.o=null;a("ok",null)};
	h.Pc=function(){};h.rd=function(){};h.nc=function(){};h.Db=function(){};h.pd=function(){};h.Qc=function(){};
	function jf(a,b,c,d){c=c||{};c.format="export";a.o&&(c.auth=a.o);var e=(a.g.hb?"https://":"http://")+a.g.host+b+"?"+Ia(c);a.f("Sending REST request for "+e);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(d&&4===f.readyState){a.f("REST Response for "+e+" received. status:",f.status,"response:",f.responseText);var b=null;if(200<=f.status&&300>f.status){try{b=Ka(f.responseText)}catch(c){B("Failed to parse JSON response for "+e+": "+f.responseText)}d(null,b)}else 401!==f.status&&404!==f.status&&
	B("Got unsuccessful REST response for "+e+" Status: "+f.status),d(f.status);d=null}};f.open("GET",e,!0);f.send()};function kf(){this.f=[]}function lf(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.$a();null===c||f.Z(c.$a())||(a.f.push(c),c=null);null===c&&(c=new mf(f));c.add(e)}c&&a.f.push(c)}function nf(a,b,c){lf(a,c);of(a,function(a){return a.Z(b)})}function pf(a,b,c){lf(a,c);of(a,function(a){return a.contains(b)||b.contains(a)})}
	function of(a,b){for(var c=!0,d=0;d<a.f.length;d++){var e=a.f[d];if(e)if(e=e.$a(),b(e)){for(var e=a.f[d],f=0;f<e.gc.length;f++){var g=e.gc[f];if(null!==g){e.gc[f]=null;var k=g.Ta();wb&&tb("event: "+g.toString());Kb(k)}}a.f[d]=null}else c=!1}c&&(a.f=[])}function mf(a){this.na=a;this.gc=[]}mf.prototype.add=function(a){this.gc.push(a)};mf.prototype.$a=function(){return this.na};function qf(a,b){this.type=rf;this.source=sf;this.path=a;this.Sc=b}qf.prototype.Tb=function(){return this.path.j()?this:new qf(L(this.path),this.Sc)};qf.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Sc+")"};function tf(a,b,c){this.type=uf;this.source=a;this.path=b;this.children=c}tf.prototype.Tb=function(a){if(this.path.j())return a=this.children.subtree(new I(a)),a.j()?null:a.value?new vf(this.source,M,a.value):new tf(this.source,M,a);z(K(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new tf(this.source,L(this.path),this.children)};tf.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function wf(a,b){this.type=xf;this.source=a;this.path=b}wf.prototype.Tb=function(){return this.path.j()?new wf(this.source,M):new wf(this.source,L(this.path))};wf.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function vf(a,b,c){this.type=yf;this.source=a;this.path=b;this.Ba=c}vf.prototype.Tb=function(a){return this.path.j()?new vf(this.source,M,this.Ba.P(a)):new vf(this.source,L(this.path),this.Ba)};vf.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ba.toString()+")"};var yf=0,uf=1,rf=2,xf=3;function zf(){}zf.prototype.source;zf.prototype.type;zf.prototype.path;function Af(a,b,c,d){this.Jc=a;this.jd=b;this.fb=c;this.Xc=d;z(!d||b,"Tagged queries must be from server.")}var sf=new Af(!0,!1,null,!1),Bf=new Af(!1,!0,null,!1);Af.prototype.toString=function(){return this.Jc?"user":this.Xc?"server(queryID="+this.fb+")":"server"};function T(a,b,c,d){this.type=a;this.Ca=b;this.Ma=c;this.Oc=d;this.rc=void 0}function Cf(a){return new T(Df,a)}var Df="value";function Ef(){}Ef.prototype.$a;Ef.prototype.hc;Ef.prototype.Ta;Ef.prototype.toString;function Ff(a,b,c,d){this.Gc=b;this.uc=c;this.rc=d;this.fc=a}Ff.prototype.$a=function(){var a=this.uc.gb();return"value"===this.fc?a.path:a.parent().path};Ff.prototype.hc=function(){return this.fc};Ff.prototype.Ta=function(){return this.Gc.Ta(this)};Ff.prototype.toString=function(){return this.$a().toString()+":"+this.fc+":"+v(this.uc.gd())};function Gf(a,b,c){this.Gc=a;this.error=b;this.path=c}Gf.prototype.$a=function(){return this.path};
	Gf.prototype.hc=function(){return"cancel"};Gf.prototype.Ta=function(){return this.Gc.Ta(this)};Gf.prototype.toString=function(){return this.path.toString()+":cancel"};function Hf(){}Hf.prototype.Rc;Hf.prototype.createEvent;Hf.prototype.Ta;Hf.prototype.Fc;Hf.prototype.matches;Hf.prototype.Mc;function If(a,b,c){this.nb=a;this.Ya=b;this.Za=c||null}h=If.prototype;h.Rc=function(a){return"value"===a};h.createEvent=function(a,b){var c=b.F.U();return new Ff("value",this,new U(a.Ca,b.gb(),c))};
	h.Ta=function(a){var b=this.Za;if("cancel"===a.hc()){z(this.Ya,"Raising a cancel event on a listener with no cancel callback");var c=this.Ya;return function(){c.call(b,a.error)}}var d=this.nb;return function(){d.call(b,a.uc)}};h.Fc=function(a,b){return this.Ya?new Gf(this,a,b):null};h.matches=function(a){return a instanceof If?a.nb&&this.nb?a.nb===this.nb&&a.Za===this.Za:!0:!1};h.Mc=function(){return null!==this.nb};function Jf(a,b,c){this.ha=a;this.Ya=b;this.Za=c}h=Jf.prototype;
	h.Rc=function(a){a="children_added"===a?"child_added":a;return Ta(this.ha,"children_removed"===a?"child_removed":a)};h.Fc=function(a,b){return this.Ya?new Gf(this,a,b):null};h.createEvent=function(a,b){z(null!=a.Ma,"Child events should have a childName.");var c=b.gb().B(a.Ma);return new Ff(a.type,this,new U(a.Ca,c,b.F.U()),a.rc)};
	h.Ta=function(a){var b=this.Za;if("cancel"===a.hc()){z(this.Ya,"Raising a cancel event on a listener with no cancel callback");var c=this.Ya;return function(){c.call(b,a.error)}}var d=this.ha[a.fc];return function(){d.call(b,a.uc,a.rc)}};
	h.matches=function(a){if(a instanceof Jf){if(!this.ha||!a.ha)return!0;if(this.Za===a.Za){var b=Pa(a.ha);if(b===Pa(this.ha)){if(1===b){var b=Qa(a.ha),c=Qa(this.ha);return c===b&&(!a.ha[b]||!this.ha[c]||a.ha[b]===this.ha[c])}return Oa(this.ha,function(b,c){return a.ha[c]===b})}}}return!1};h.Mc=function(){return null!==this.ha};function Kf(a){this.g=a;this.w=a.F.U()}function Lf(a,b,c,d){var e=[],f=[];pa(b,function(b){"child_changed"===b.type&&a.w.kc(b.Oc,b.Ca)&&f.push(new T("child_moved",b.Ca,b.Ma))});Mf(a,e,"child_removed",b,d,c);Mf(a,e,"child_added",b,d,c);Mf(a,e,"child_moved",f,d,c);Mf(a,e,"child_changed",b,d,c);Mf(a,e,Df,b,d,c);return e}function Mf(a,b,c,d,e,f){d=qa(d,function(a){return a.type===c});xa(d,r(a.f,a));pa(d,function(c){var d=Nf(a,c,f);pa(e,function(e){e.Rc(c.type)&&b.push(e.createEvent(d,a.g))})})}
	function Nf(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.rc=c.Lc(b.Ma,b.Ca,a.w));return b}Kf.prototype.f=function(a,b){if(null==a.Ma||null==b.Ma)throw qb("Should only compare child_ events.");return this.w.compare(new P(a.Ma,a.Ca),new P(b.Ma,b.Ca))};function Of(){}Of.prototype.kd=function(){return null};Of.prototype.Kc=function(){return null};var Pf=new Of;function Qf(a,b,c){this.Hd=a;this.Da=b;this.oc=c}Qf.prototype.kd=function(a){var b=this.Da.L;if(Rf(b,a))return b.u().P(a);b=null!=this.oc?new Sf(this.oc,!0,!1):this.Da.G();return this.Hd.La(a,b)};Qf.prototype.Kc=function(a,b,c){var d=null!=this.oc?this.oc:Tf(this.Da);a=this.Hd.Cc(d,b,1,c,a);return 0===a.length?null:a[0]};function Uf(a,b){this.xc=a;this.Qd=b}function Vf(a){this.O=a}
	Vf.prototype.Oa=function(a,b,c,d){var e=new Wf,f;if(b.type===yf)b.source.Jc?c=Xf(this,a,b.path,b.Ba,c,d,e):(z(b.source.jd,"Unknown source."),f=b.source.Xc,c=Yf(this,a,b.path,b.Ba,c,d,f,e));else if(b.type===uf)b.source.Jc?c=Zf(this,a,b.path,b.children,c,d,e):(z(b.source.jd,"Unknown source."),f=b.source.Xc,c=$f(this,a,b.path,b.children,c,d,f,e));else if(b.type===rf)if(b.Sc)if(f=b.path,null!=c.Cb(f))c=a;else{b=new Qf(c,a,d);d=a.L.u();if(f.j()||".priority"===K(f))ag(a.G())?b=c.qa(Tf(a)):(b=a.G().u(),
	z(b instanceof bg,"serverChildren would be complete if leaf node"),b=c.Jb(b)),b=this.O.oa(d,b,e);else{f=K(f);var g=c.La(f,a.G());null==g&&Rf(a.G(),f)&&(g=d.P(f));b=null!=g?this.O.M(d,f,g,b,e):a.L.u().ua(f)?this.O.M(d,f,w,b,e):d;b.j()&&ag(a.G())&&(d=c.qa(Tf(a)),d.R()&&(b=this.O.oa(b,d,e)))}d=ag(a.G())||null!=c.Cb(M);c=cg(a,b,d,this.O.ya())}else c=dg(this,a,b.path,c,d,e);else if(b.type===xf)d=b.path,b=a.G(),f=b.u(),g=b.ba||d.j(),c=eg(this,new fg(a.L,new Sf(f,g,b.qb)),d,c,Pf,e);else throw qb("Unknown operation type: "+
	b.type);e=Ra(e.f);d=c;b=d.L;b.ba&&(f=b.u().R()||b.u().j(),g=gg(a),(0<e.length||!a.L.ba||f&&!b.u().Z(g)||!b.u().J().Z(g.J()))&&e.push(Cf(gg(d))));return new Uf(c,e)};
	function eg(a,b,c,d,e,f){var g=b.L;if(null!=d.Cb(c))return b;var k;if(c.j())z(ag(b.G()),"If change path is empty, we must have complete server data"),b.G().qb?(e=Tf(b),d=d.Jb(e instanceof bg?e:w)):d=d.qa(Tf(b)),f=a.O.oa(b.L.u(),d,f);else{var l=K(c);if(".priority"==l)z(1==Sc(c),"Can't have a priority with additional path components"),f=g.u(),k=b.G().u(),d=d.Zb(c,f,k),f=null!=d?a.O.aa(f,d):g.u();else{var m=L(c);Rf(g,l)?(k=b.G().u(),d=d.Zb(c,g.u(),k),d=null!=d?g.u().P(l).M(m,d):g.u().P(l)):d=d.La(l,
	b.G());f=null!=d?a.O.M(g.u(),l,d,e,f):g.u()}}return cg(b,f,g.ba||c.j(),a.O.ya())}function Yf(a,b,c,d,e,f,g,k){var l=b.G();g=g?a.O:a.O.rb();if(c.j())d=g.oa(l.u(),d,null);else if(g.ya()&&!l.qb)d=l.u().M(c,d),d=g.oa(l.u(),d,null);else{var m=K(c);if((c.j()?!l.ba||l.qb:!Rf(l,K(c)))&&1<Sc(c))return b;d=l.u().P(m).M(L(c),d);d=".priority"==m?g.aa(l.u(),d):g.M(l.u(),m,d,Pf,null)}l=l.ba||c.j();b=new fg(b.L,new Sf(d,l,g.ya()));return eg(a,b,c,e,new Qf(e,b,f),k)}
	function Xf(a,b,c,d,e,f,g){var k=b.L;e=new Qf(e,b,f);if(c.j())d=a.O.oa(b.L.u(),d,g),a=cg(b,d,!0,a.O.ya());else if(f=K(c),".priority"===f)d=a.O.aa(b.L.u(),d),a=cg(b,d,k.ba,k.qb);else{c=L(c);var l=k.u().P(f),m;if(c.j())m=d;else{var u=e.kd(f);null!=u?m=".priority"===Tc(c)&&u.ia(c.parent()).j()?u:u.M(c,d):m=w}l.Z(m)?a=b:(d=a.O.M(k.u(),f,m,e,g),a=cg(b,d,k.ba,a.O.ya()))}return a}
	function Zf(a,b,c,d,e,f,g){var k=b;hg(d,function(d,m){var u=c.B(d);Rf(b.L,K(u))&&(k=Xf(a,k,u,m,e,f,g))});hg(d,function(d,m){var u=c.B(d);Rf(b.L,K(u))||(k=Xf(a,k,u,m,e,f,g))});return k}function ig(a,b){hg(b,function(b,d){a=a.M(b,d)});return a}
	function $f(a,b,c,d,e,f,g,k){if(b.G().u().j()&&!ag(b.G()))return b;var l=b;c=c.j()?d:jg(kg,c,d);var m=b.G().u();c.children.ja(function(c,d){if(m.ua(c)){var O=b.G().u().P(c),O=ig(O,d);l=Yf(a,l,new I(c),O,e,f,g,k)}});c.children.ja(function(c,d){var O=!ag(b.G())&&null==d.value;m.ua(c)||O||(O=b.G().u().P(c),O=ig(O,d),l=Yf(a,l,new I(c),O,e,f,g,k))});return l}
	function dg(a,b,c,d,e,f){if(null!=d.Cb(c))return b;var g=new Qf(d,b,e),k=e=b.L.u();if(ag(b.G())){if(c.j())e=d.qa(Tf(b)),k=a.O.oa(b.L.u(),e,f);else if(".priority"===K(c)){var l=d.La(K(c),b.G());null==l||e.j()||e.J().Z(l)||(k=a.O.aa(e,l))}else l=K(c),e=d.La(l,b.G()),null!=e&&(k=a.O.M(b.L.u(),l,e,g,f));e=!0}else if(b.L.ba||c.j())k=e,e=b.L.u(),e.R()||e.V(R,function(c){var e=d.La(c,b.G());null!=e&&(k=a.O.M(k,c,e,g,f))}),e=b.L.ba;else{l=K(c);if(1==Sc(c)||Rf(b.L,l))c=d.La(l,b.G()),null!=c&&(k=a.O.M(e,l,
	c,g,f));e=!1}return cg(b,k,e,a.O.ya())};function Sf(a,b,c){this.f=a;this.ba=b;this.qb=c}function ag(a){return a.ba}function Rf(a,b){return a.ba&&!a.qb||a.f.ua(b)}Sf.prototype.u=function(){return this.f};({}).Ke;function lg(a,b){this.g=a;this.f=b?b:mg}h=lg.prototype;h.Ga=function(a,b){return new lg(this.g,this.f.Ga(a,b,this.g).Y(null,null,ng,null,null))};h.remove=function(a){return new lg(this.g,this.f.remove(a,this.g).Y(null,null,ng,null,null))};h.get=function(a){for(var b,c=this.f;!c.j();){b=this.g(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
	function og(a,b){for(var c,d=a.f,e=null;!d.j();){c=a.g(b,d.key);if(0===c){if(d.left.j())return e?e.key:null;for(d=d.left;!d.right.j();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}h.j=function(){return this.f.j()};h.count=function(){return this.f.count()};h.Rb=function(){return this.f.Rb()};h.Ab=function(){return this.f.Ab()};h.ja=function(a){return this.f.ja(a)};
	h.tb=function(a){return new pg(this.f,null,this.g,!1,a)};h.ub=function(a,b){return new pg(this.f,a,this.g,!1,b)};h.vb=function(a,b){return new pg(this.f,a,this.g,!0,b)};h.ld=function(a){return new pg(this.f,null,this.g,!0,a)};function pg(a,b,c,d,e){this.f=e||null;this.g=d;this.Ha=[];for(e=1;!a.j();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.g?a.left:a.right;else if(0===e){this.Ha.push(a);break}else this.Ha.push(a),a=this.g?a.right:a.left}
	function qg(a){if(0===a.Ha.length)return null;var b=a.Ha.pop(),c;a.f?c=a.f(b.key,b.value):c={key:b.key,value:b.value};if(a.g)for(b=b.left;!b.j();)a.Ha.push(b),b=b.right;else for(b=b.right;!b.j();)a.Ha.push(b),b=b.left;return c}function rg(a){if(0===a.Ha.length)return null;var b;b=a.Ha;b=b[b.length-1];return a.f?a.f(b.key,b.value):{key:b.key,value:b.value}}function sg(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:tg;this.left=null!=d?d:mg;this.right=null!=e?e:mg}var tg=!0,ng=!1;h=sg.prototype;
	h.Y=function(a,b,c,d,e){return new sg(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};h.count=function(){return this.left.count()+1+this.right.count()};h.j=function(){return!1};h.ja=function(a){return this.left.ja(a)||a(this.key,this.value)||this.right.ja(a)};function ug(a){return a.left.j()?a:ug(a.left)}h.Rb=function(){return ug(this).key};h.Ab=function(){return this.right.j()?this.key:this.right.Ab()};
	h.Ga=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.Y(null,null,null,e.left.Ga(a,b,c),null):0===d?e.Y(null,b,null,null,null):e.Y(null,null,null,null,e.right.Ga(a,b,c));return vg(e)};function wg(a){if(a.left.j())return mg;a.left.fa()||a.left.left.fa()||(a=xg(a));a=a.Y(null,null,null,wg(a.left),null);return vg(a)}
	h.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.j()||c.left.fa()||c.left.left.fa()||(c=xg(c)),c=c.Y(null,null,null,c.left.remove(a,b),null);else{c.left.fa()&&(c=yg(c));c.right.j()||c.right.fa()||c.right.left.fa()||(c=zg(c),c.left.left.fa()&&(c=yg(c),c=zg(c)));if(0===b(a,c.key)){if(c.right.j())return mg;d=ug(c.right);c=c.Y(d.key,d.value,null,null,wg(c.right))}c=c.Y(null,null,null,null,c.right.remove(a,b))}return vg(c)};h.fa=function(){return this.color};
	function vg(a){a.right.fa()&&!a.left.fa()&&(a=Ag(a));a.left.fa()&&a.left.left.fa()&&(a=yg(a));a.left.fa()&&a.right.fa()&&(a=zg(a));return a}function xg(a){a=zg(a);a.right.left.fa()&&(a=a.Y(null,null,null,null,yg(a.right)),a=Ag(a),a=zg(a));return a}function Ag(a){return a.right.Y(null,null,a.color,a.Y(null,null,tg,null,a.right.left),null)}function yg(a){return a.left.Y(null,null,a.color,null,a.Y(null,null,tg,a.left.right,null))}
	function zg(a){return a.Y(null,null,!a.color,a.left.Y(null,null,!a.left.color,null,null),a.right.Y(null,null,!a.right.color,null,null))}function Bg(){}h=Bg.prototype;h.Y=function(){return this};h.Ga=function(a,b){return new sg(a,b,null)};h.remove=function(){return this};h.count=function(){return 0};h.j=function(){return!0};h.ja=function(){return!1};h.Rb=function(){return null};h.Ab=function(){return null};h.fa=function(){return!1};var mg=new Bg;function Cg(a,b){this.f=a;this.xb=b}Cg.prototype.get=function(a){var b=t(this.f,a);if(!b)throw Error("No index defined for "+a);return b===De?null:b};function Dg(a,b,c){var d=Na(a.f,function(d,f){var g=t(a.xb,f);z(g,"Missing index implementation for "+f);if(d===De){if(g.Ob(b.node)){for(var k=[],l=c.tb(Pe),m=qg(l);m;)m.name!=b.name&&k.push(m),m=qg(l);k.push(b);return Eg(k,Ee(g))}return De}g=c.get(b.name);k=d;g&&(k=k.remove(new P(b.name,g)));return k.Ga(b,b.node)});return new Cg(d,a.xb)}
	function Fg(a,b,c){var d=Na(a.f,function(a){if(a===De)return a;var d=c.get(b.name);return d?a.remove(new P(b.name,d)):a});return new Cg(d,a.xb)}var Gg=new Cg({".priority":De},{".priority":R});function Je(a,b){this.K=a;z(p(this.K)&&null!==this.K,"LeafNode shouldn't be created with null/undefined value.");this.ea=b||w;Hg(this.ea);this.f=null}h=Je.prototype;h.R=function(){return!0};h.J=function(){return this.ea};h.aa=function(a){return new Je(this.K,a)};h.P=function(a){return".priority"===a?this.ea:w};h.ia=function(a){return a.j()?this:".priority"===K(a)?this.ea:w};h.ua=function(){return!1};h.Lc=function(){return null};
	h.T=function(a,b){return".priority"===a?this.aa(b):b.j()&&".priority"!==a?this:w.T(a,b).aa(this.ea)};h.M=function(a,b){var c=K(a);if(null===c)return b;if(b.j()&&".priority"!==c)return this;z(".priority"!==c||1===Sc(a),".priority must be the last token in a path");return this.T(c,w.M(L(a),b))};h.j=function(){return!1};h.Ua=function(){return 0};h.N=function(a){return a&&!this.J().j()?{".value":this.ta(),".priority":this.J().N()}:this.ta()};
	h.hash=function(){if(null===this.f){var a="";this.ea.j()||(a+="priority:"+Ig(this.ea.N())+":");var b=typeof this.K,a=a+(b+":"),a="number"===b?a+Ib(this.K):a+this.K;this.f=ub(a)}return this.f};h.ta=function(){return this.K};h.ob=function(a){if(a===w)return 1;if(a instanceof bg)return-1;z(a.R(),"Unknown node type");var b=typeof a.K,c=typeof this.K,d=oa(Jg,b),e=oa(Jg,c);z(0<=d,"Unknown leaf type: "+b);z(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.K<a.K?-1:this.K===a.K?0:1:e-d};
	var Jg=["object","boolean","number","string"];Je.prototype.Na=function(){return this};Je.prototype.zb=function(){return!0};Je.prototype.Z=function(a){return a===this?!0:a.R()?this.K===a.K&&this.ea.Z(a.ea):!1};Je.prototype.toString=function(){return v(this.N(!0))};function bg(a,b,c){this.C=a;(this.ea=b)&&Hg(this.ea);a.j()&&z(!this.ea||this.ea.j(),"An empty node cannot have a priority");this.f=c;this.g=null}h=bg.prototype;h.R=function(){return!1};h.J=function(){return this.ea||w};h.aa=function(a){return this.C.j()?this:new bg(this.C,a,this.f)};h.P=function(a){if(".priority"===a)return this.J();a=this.C.get(a);return null===a?w:a};h.ia=function(a){var b=K(a);return null===b?this:this.P(b).ia(L(a))};h.ua=function(a){return null!==this.C.get(a)};
	h.T=function(a,b){z(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.aa(b);var c=new P(a,b),d,e;b.j()?(d=this.C.remove(a),c=Fg(this.f,c,this.C)):(d=this.C.Ga(a,b),c=Dg(this.f,c,this.C));e=d.j()?w:this.ea;return new bg(d,e,c)};h.M=function(a,b){var c=K(a);if(null===c)return b;z(".priority"!==K(a)||1===Sc(a),".priority must be the last token in a path");var d=this.P(c).M(L(a),b);return this.T(c,d)};h.j=function(){return this.C.j()};h.Ua=function(){return this.C.count()};
	var Kg=/^(0|[1-9]\d*)$/;h=bg.prototype;h.N=function(a){if(this.j())return null;var b={},c=0,d=0,e=!0;this.V(R,function(f,g){b[f]=g.N(a);c++;e&&Kg.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],g;for(g in b)f[g]=b[g];return f}a&&!this.J().j()&&(b[".priority"]=this.J().N());return b};h.hash=function(){if(null===this.g){var a="";this.J().j()||(a+="priority:"+Ig(this.J().N())+":");this.V(R,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.g=""===a?"":ub(a)}return this.g};
	h.Lc=function(a,b,c){return(c=Lg(this,c))?(a=og(c,new P(a,b)))?a.name:null:og(this.C,a)};function Mg(a,b){var c;c=(c=Lg(a,b))?(c=c.Rb())&&c.name:a.C.Rb();return c?new P(c,a.C.get(c)):null}function Ng(a,b){var c;c=(c=Lg(a,b))?(c=c.Ab())&&c.name:a.C.Ab();return c?new P(c,a.C.get(c)):null}h.V=function(a,b){var c=Lg(this,a);return c?c.ja(function(a){return b(a.name,a.node)}):this.C.ja(b)};h.tb=function(a){return this.ub(a.Sb(),a)};
	h.ub=function(a,b){var c=Lg(this,b);if(c)return c.ub(a,function(a){return a});for(var c=this.C.ub(a.name,Pe),d=rg(c);null!=d&&0>b.compare(d,a);)qg(c),d=rg(c);return c};h.ld=function(a){return this.vb(a.Qb(),a)};h.vb=function(a,b){var c=Lg(this,b);if(c)return c.vb(a,function(a){return a});for(var c=this.C.vb(a.name,Pe),d=rg(c);null!=d&&0<b.compare(d,a);)qg(c),d=rg(c);return c};h.ob=function(a){return this.j()?a.j()?0:-1:a.R()||a.j()?1:a===He?-1:0};
	h.Na=function(a){if(a===Le||Ua(this.f.xb,a.toString()))return this;var b=this.f,c=this.C;z(a!==Le,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.tb(Pe),f=qg(c);f;)e=e||a.Ob(f.node),d.push(f),f=qg(c);var g;e?g=Eg(d,Ee(a)):g=De;d=a.toString();e=Ya(b.xb);e[d]=a;a=Ya(b.f);a[d]=g;return new bg(this.C,this.ea,new Cg(a,e))};h.zb=function(a){return a===Le||Ua(this.f.xb,a.toString())};
	h.Z=function(a){if(a===this)return!0;if(a.R())return!1;if(this.J().Z(a.J())&&this.C.count()===a.C.count()){var b=this.tb(R);a=a.tb(R);for(var c=qg(b),d=qg(a);c&&d;){if(c.name!==d.name||!c.node.Z(d.node))return!1;c=qg(b);d=qg(a)}return null===c&&null===d}return!1};function Lg(a,b){return b===Le?null:a.f.get(b.toString())}h.toString=function(){return v(this.N(!0))};function Q(a,b){if(null===a)return w;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);z(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new Je(a,Q(c));if(a instanceof Array){var d=w,e=a;x(e,function(a,b){if(za(e,b)&&"."!==b.substring(0,1)){var c=Q(a);if(c.R()||!c.j())d=
	d.T(b,c)}});return d.aa(Q(c))}var f=[],g=!1,k=a;Aa(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=Q(k[a]);b.j()||(g=g||!b.J().j(),f.push(new P(a,b)))}});if(0==f.length)return w;var l=Eg(f,Ae,function(a){return a.name},Be);if(g){var m=Eg(f,Ee(R));return new bg(l,Q(c),new Cg({".priority":m},{".priority":R}))}return new bg(l,Q(c),Gg)}var Og=Math.log(2);
	function Pg(a){this.count=parseInt(Math.log(a+1)/Og,10);this.ed=this.count-1;this.Pd=a+1&parseInt(Array(this.count+1).join("1"),2)}function Qg(a){var b=!(a.Pd&1<<a.ed);a.ed--;return b}
	function Eg(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var m=a[b],u=c?c(m):m;return new sg(u,m.node,ng,null,null)}var m=parseInt(f/2,10)+b,f=e(b,m),A=e(m+1,d),m=a[m],u=c?c(m):m;return new sg(u,m.node,ng,f,A)}a.sort(b);var f=function(b){function d(b,g){var k=u-b,A=u;u-=b;var A=e(k+1,A),k=a[k],O=c?c(k):k,A=new sg(O,k.node,g,null,A);f?f.left=A:m=A;f=A}for(var f=null,m=null,u=a.length,A=0;A<b.count;++A){var O=Qg(b),Gd=Math.pow(2,b.count-(A+1));O?d(Gd,ng):(d(Gd,ng),d(Gd,tg))}return m}(new Pg(a.length));
	return null!==f?new lg(d||b,f):new lg(d||b)}function Ig(a){return"number"===typeof a?"number:"+Ib(a):"string:"+a}function Hg(a){if(a.R()){var b=a.N();z("string"===typeof b||"number"===typeof b||"object"===typeof b&&za(b,".sv"),"Priority must be a string or number.")}else z(a===He||a.j(),"priority of unexpected type.");z(a===He||a.J().j(),"Priority nodes can't have a priority of their own.")}var w=new bg(new lg(Be),null,Gg);function Rg(){bg.call(this,new lg(Be),w,Gg)}la(Rg,bg);h=Rg.prototype;
	h.ob=function(a){return a===this?0:1};h.Z=function(a){return a===this};h.J=function(){return this};h.P=function(){return w};h.j=function(){return!1};var He=new Rg,Fe=new P("[MIN_NAME]",w),Ne=new P("[MAX_NAME]",He);function fg(a,b){this.L=a;this.f=b}function cg(a,b,c,d){return new fg(new Sf(b,c,d),a.f)}function gg(a){return a.L.ba?a.L.u():null}fg.prototype.G=function(){return this.f};function Tf(a){return a.f.ba?a.f.u():null};function Sg(a,b){this.wa=a;var c=a.F,d=new Tg(c.U()),c=gf(c)?new Tg(c.U()):c.ka?new Ug(c):new Vg(c);this.g=new Vf(c);var e=b.G(),f=b.L,g=d.oa(w,e.u(),null),k=c.oa(w,f.u(),null);this.Da=new fg(new Sf(k,f.ba,c.ya()),new Sf(g,e.ba,d.ya()));this.f=[];this.m=new Kf(a)}function Wg(a){return a.wa}h=Sg.prototype;h.G=function(){return this.Da.G().u()};h.Sa=function(a){var b=Tf(this.Da);return b&&(gf(this.wa.F)||!a.j()&&!b.P(K(a)).j())?b.ia(a):null};h.j=function(){return 0===this.f.length};h.mb=function(a){this.f.push(a)};
	h.Wa=function(a,b){var c=[];if(b){z(null==a,"A cancel should cancel all event registrations.");var d=this.wa.path;pa(this.f,function(a){(a=a.Fc(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.f.length;++f){var g=this.f[f];if(!g.matches(a))e.push(g);else if(a.Mc()){e=e.concat(this.f.slice(f+1));break}}this.f=e}else this.f=[];return c};
	h.Oa=function(a,b,c){a.type===uf&&null!==a.source.fb&&(z(Tf(this.Da),"We should always have a full cache before handling merges"),z(gg(this.Da),"Missing event cache, even though we have a server cache"));var d=this.Da;a=this.g.Oa(d,a,b,c);b=this.g;c=a.xc;z(c.L.u().zb(b.O.U()),"Event snap not indexed");z(c.G().u().zb(b.O.U()),"Server snap not indexed");z(ag(a.xc.G())||!ag(d.G()),"Once a server snap is complete, it should never go back");this.Da=a.xc;return Xg(this,a.Qd,a.xc.L.u(),null)};
	function Yg(a,b){var c=a.Da.L,d=[];c.u().R()||c.u().V(R,function(a,b){d.push(new T("child_added",b,a))});c.ba&&d.push(Cf(c.u()));return Xg(a,d,c.u(),b)}function Xg(a,b,c,d){return Lf(a.m,b,c,d?[d]:a.f)};function Zg(a,b){this.value=a;this.children=b||$g}var $g=new lg(function(a,b){return a===b?0:a<b?-1:1});function ah(a){var b=kg;x(a,function(a,d){b=b.set(new I(d),a)});return b}h=Zg.prototype;h.j=function(){return null===this.value&&this.children.j()};function bh(a,b,c){if(null!=a.value&&c(a.value))return{path:M,value:a.value};if(b.j())return null;var d=K(b);a=a.children.get(d);return null!==a?(b=bh(a,L(b),c),null!=b?{path:(new I(d)).B(b.path),value:b.value}:null):null}
	function ch(a,b){return bh(a,b,function(){return!0})}h.subtree=function(a){if(a.j())return this;var b=this.children.get(K(a));return null!==b?b.subtree(L(a)):kg};h.set=function(a,b){if(a.j())return new Zg(b,this.children);var c=K(a),d=(this.children.get(c)||kg).set(L(a),b),c=this.children.Ga(c,d);return new Zg(this.value,c)};
	h.remove=function(a){if(a.j())return this.children.j()?kg:new Zg(null,this.children);var b=K(a),c=this.children.get(b);return c?(a=c.remove(L(a)),b=a.j()?this.children.remove(b):this.children.Ga(b,a),null===this.value&&b.j()?kg:new Zg(this.value,b)):this};h.get=function(a){if(a.j())return this.value;var b=this.children.get(K(a));return b?b.get(L(a)):null};
	function jg(a,b,c){if(b.j())return c;var d=K(b);b=jg(a.children.get(d)||kg,L(b),c);d=b.j()?a.children.remove(d):a.children.Ga(d,b);return new Zg(a.value,d)}function dh(a,b){return eh(a,M,b)}function eh(a,b,c){var d={};a.children.ja(function(a,f){d[a]=eh(f,b.B(a),c)});return c(b,a.value,d)}function fh(a,b,c){return gh(a,b,M,c)}function gh(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.j())return null;e=K(b);return(a=a.children.get(e))?gh(a,L(b),c.B(e),d):null}
	function hh(a,b,c){if(!b.j()){var d=!0;a.value&&(d=c(M,a.value));!0===d&&(d=K(b),(a=a.children.get(d))&&ih(a,L(b),M.B(d),c))}}function ih(a,b,c,d){if(b.j())return a;a.value&&d(c,a.value);var e=K(b);return(a=a.children.get(e))?ih(a,L(b),c.B(e),d):kg}function hg(a,b){jh(a,M,b)}function jh(a,b,c){a.children.ja(function(a,e){jh(e,b.B(a),c)});a.value&&c(b,a.value)}function kh(a,b){a.children.ja(function(a,d){d.value&&b(a,d.value)})}var kg=new Zg(null);
	Zg.prototype.toString=function(){var a={};hg(this,function(b,c){a[b.toString()]=c.toString()});return v(a)};function lh(){this.f={}}h=lh.prototype;h.j=function(){return Xa(this.f)};h.Oa=function(a,b,c){var d=a.source.fb;if(null!==d)return d=t(this.f,d),z(null!=d,"SyncTree gave us an op for an invalid query."),d.Oa(a,b,c);var e=[];x(this.f,function(d){e=e.concat(d.Oa(a,b,c))});return e};h.mb=function(a,b,c,d,e){var f=a.ra(),g=t(this.f,f);if(!g){var g=c.qa(e?d:null),k=!1;g?k=!0:(d instanceof bg?g=c.Jb(d):g=w,k=!1);g=new Sg(a,new fg(new Sf(g,k,!1),new Sf(d,e,!1)));this.f[f]=g}g.mb(b);return Yg(g,b)};
	h.Wa=function(a,b,c){var d=a.ra(),e=[],f=[],g=null!=mh(this);if("default"===d){var k=this;x(this.f,function(a,d){f=f.concat(a.Wa(b,c));a.j()&&(delete k.f[d],gf(a.wa.F)||e.push(a.wa))})}else{var l=t(this.f,d);l&&(f=f.concat(l.Wa(b,c)),l.j()&&(delete this.f[d],gf(l.wa.F)||e.push(l.wa)))}g&&null==mh(this)&&e.push(new V(a.H.xa,a.H,a.path));return{me:e,Ud:f}};function nh(a){return qa(Ra(a.f),function(a){return!gf(a.wa.F)})}h.Sa=function(a){var b=null;x(this.f,function(c){b=b||c.Sa(a)});return b};
	function oh(a,b){if(gf(b.F))return mh(a);var c=b.ra();return t(a.f,c)}function mh(a){return Wa(a.f,function(a){return gf(a.wa.F)})||null};function ph(a){this.X=a}var qh=new ph(new Zg(null));function rh(a,b,c){if(b.j())return new ph(new Zg(c));var d=ch(a.X,b);if(null!=d){var e=d.path,d=d.value;b=J(e,b);d=d.M(b,c);return new ph(a.X.set(e,d))}a=jg(a.X,b,new Zg(c));return new ph(a)}function sh(a,b,c){var d=a;Aa(c,function(a,c){d=rh(d,b.B(a),c)});return d}ph.prototype.sc=function(a){if(a.j())return qh;a=jg(this.X,a,kg);return new ph(a)};function th(a,b){var c=ch(a.X,b);return null!=c?a.X.get(c.path).ia(J(c.path,b)):null}
	function uh(a){var b=[],c=a.X.value;null!=c?c.R()||c.V(R,function(a,c){b.push(new P(a,c))}):a.X.children.ja(function(a,c){null!=c.value&&b.push(new P(a,c.value))});return b}function vh(a,b){if(b.j())return a;var c=th(a,b);return null!=c?new ph(new Zg(c)):new ph(a.X.subtree(b))}ph.prototype.j=function(){return this.X.j()};ph.prototype.apply=function(a){return wh(M,this.X,a)};
	function wh(a,b,c){if(null!=b.value)return c.M(a,b.value);var d=null;b.children.ja(function(b,f){".priority"===b?(z(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=wh(a.B(b),f,c)});c.ia(a).j()||null===d||(c=c.M(a.B(".priority"),d));return c};La.Pe;function xh(){this.f=qh;this.g=[];this.m=-1}h=xh.prototype;
	h.sc=function(a){var b=va(this.g,function(b){return b.yc===a});z(0<=b,"removeWrite called with nonexistent writeId.");var c=this.g[b];this.g.splice(b,1);for(var d=c.visible,e=!1,f=this.g.length-1;d&&0<=f;){var g=this.g[f];g.visible&&(f>=b&&yh(g,c.path)?d=!1:c.path.contains(g.path)&&(e=!0));f--}if(d){if(e)this.f=zh(this.g,Ah,M),0<this.g.length?this.m=this.g[this.g.length-1].yc:this.m=-1;else if(c.Ba)this.f=this.f.sc(c.path);else{var k=this;x(c.children,function(a,b){k.f=k.f.sc(c.path.B(b))})}return c.path}return null};
	h.qa=function(a,b,c,d){if(c||d){var e=vh(this.f,a);return!d&&e.j()?b:d||null!=b||null!=th(e,M)?(e=zh(this.g,function(b){return(b.visible||d)&&(!c||!(0<=oa(c,b.yc)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||w,e.apply(b)):null}e=th(this.f,a);if(null!=e)return e;e=vh(this.f,a);return e.j()?b:null!=b||null!=th(e,M)?(b=b||w,e.apply(b)):null};
	h.Jb=function(a,b){var c=w,d=th(this.f,a);if(d)d.R()||d.V(R,function(a,b){c=c.T(a,b)});else if(b){var e=vh(this.f,a);b.V(R,function(a,b){var d=vh(e,new I(a)).apply(b);c=c.T(a,d)});pa(uh(e),function(a){c=c.T(a.name,a.node)})}else e=vh(this.f,a),pa(uh(e),function(a){c=c.T(a.name,a.node)});return c};h.Zb=function(a,b,c,d){z(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.B(b);if(null!=th(this.f,a))return null;a=vh(this.f,a);return a.j()?d.ia(b):a.apply(d.ia(b))};
	h.La=function(a,b,c){a=a.B(b);var d=th(this.f,a);return null!=d?d:Rf(c,b)?vh(this.f,a).apply(c.u().P(b)):null};h.Cb=function(a){return th(this.f,a)};h.Cc=function(a,b,c,d,e,f){var g;a=vh(this.f,a);g=th(a,M);if(null==g)if(null!=b)g=a.apply(b);else return[];g=g.Na(f);if(g.j()||g.R())return[];b=[];a=Ee(f);e=e?g.vb(c,f):g.ub(c,f);for(f=qg(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=qg(e);return b};
	function yh(a,b){return a.Ba?a.path.contains(b):!!Va(a.children,function(c,d){return a.path.B(d).contains(b)})}function Ah(a){return a.visible}
	function zh(a,b,c){for(var d=qh,e=0;e<a.length;++e){var f=a[e];if(b(f)){var g=f.path;if(f.Ba)c.contains(g)?(g=J(c,g),d=rh(d,g,f.Ba)):g.contains(c)&&(g=J(g,c),d=rh(d,M,f.Ba.ia(g)));else if(f.children)if(c.contains(g))g=J(c,g),d=sh(d,g,f.children);else{if(g.contains(c))if(g=J(g,c),g.j())d=sh(d,M,f.children);else if(f=t(f.children,K(g)))f=f.ia(L(g)),d=rh(d,M,f)}else throw qb("WriteRecord should have .snap or .children");}}return d}function Bh(a,b){this.jb=a;this.X=b}h=Bh.prototype;
	h.qa=function(a,b,c){return this.X.qa(this.jb,a,b,c)};h.Jb=function(a){return this.X.Jb(this.jb,a)};h.Zb=function(a,b,c){return this.X.Zb(this.jb,a,b,c)};h.Cb=function(a){return this.X.Cb(this.jb.B(a))};h.Cc=function(a,b,c,d,e){return this.X.Cc(this.jb,a,b,c,d,e)};h.La=function(a,b){return this.X.La(this.jb,a,b)};h.B=function(a){return new Bh(this.jb.B(a),this.X)};La.Le;function Ch(a){this.f=kg;this.g=new xh;this.A={};this.m={};this.o=a}function Dh(a,b,c,d,e){var f=a.g,g=e;z(d>f.m,"Stacking an older write on top of newer ones");p(g)||(g=!0);f.g.push({path:b,Ba:c,yc:d,visible:g});g&&(f.f=rh(f.f,b,c));f.m=d;return e?Eh(a,new vf(sf,b,c)):[]}function Fh(a,b,c,d){var e=a.g;z(d>e.m,"Stacking an older merge on top of newer ones");e.g.push({path:b,children:c,yc:d,visible:!0});e.f=sh(e.f,b,c);e.m=d;c=ah(c);return Eh(a,new tf(sf,b,c))}
	function Gh(a,b,c){c=c||!1;b=a.g.sc(b);return null==b?[]:Eh(a,new qf(b,c))}function Hh(a,b,c){c=ah(c);return Eh(a,new tf(Bf,b,c))}function Ih(a,b,c,d){d=Jh(a,d);if(null!=d){var e=Kh(d);d=e.path;e=e.fb;b=J(d,b);c=new vf(new Af(!1,!0,e,!0),b,c);return Lh(a,d,c)}return[]}function Mh(a,b,c,d){if(d=Jh(a,d)){var e=Kh(d);d=e.path;e=e.fb;b=J(d,b);c=ah(c);c=new tf(new Af(!1,!0,e,!0),b,c);return Lh(a,d,c)}return[]}
	Ch.prototype.mb=function(a,b){var c=a.path,d=null,e=!1;hh(this.f,c,function(a,b){var f=J(a,c);d=b.Sa(f);e=e||null!=mh(b);return!d});var f=this.f.get(c);f?(e=e||null!=mh(f),d=d||f.Sa(M)):(f=new lh,this.f=this.f.set(c,f));var g;null!=d?g=!0:(g=!1,d=w,kh(this.f.subtree(c),function(a,b){var c=b.Sa(M);c&&(d=d.T(a,c))}));var k=null!=oh(f,a);if(!k&&!gf(a.F)){var l=Nh(a);z(!Ta(this.m,l),"View does not exist, but we have a tag");var m=Oh++;this.m[l]=m;this.A["_"+m]=l}g=f.mb(a,b,new Bh(c,this.g),d,g);k||e||
	(f=oh(f,a),g=g.concat(Ph(this,a,f)));return g};
	Ch.prototype.Wa=function(a,b,c){var d=a.path,e=this.f.get(d),f=[];if(e&&("default"===a.ra()||null!=oh(e,a))){f=e.Wa(a,b,c);e.j()&&(this.f=this.f.remove(d));e=f.me;f=f.Ud;b=-1!==va(e,function(a){return gf(a.F)});var g=fh(this.f,d,function(a,b){return null!=mh(b)});if(b&&!g&&(d=this.f.subtree(d),!d.j()))for(var d=Qh(d),k=0;k<d.length;++k){var l=d[k],m=l.wa,l=Rh(this,l);this.o.Uc(m,Sh(this,m),l.jc,l.S)}if(!g&&0<e.length&&!c)if(b)this.o.vc(a,null);else{var u=this;pa(e,function(a){a.ra();var b=u.m[Nh(a)];
	u.o.vc(a,b)})}Th(this,e)}return f};Ch.prototype.qa=function(a,b){var c=this.g,d=fh(this.f,a,function(b,c){var d=J(b,a);if(d=c.Sa(d))return d});return c.qa(a,d,b,!0)};function Qh(a){return dh(a,function(a,c,d){if(c&&null!=mh(c))return[mh(c)];var e=[];c&&(e=nh(c));x(d,function(a){e=e.concat(a)});return e})}function Th(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!gf(d.F)){var d=Nh(d),e=a.m[d];delete a.m[d];delete a.A["_"+e]}}}
	function Ph(a,b,c){var d=b.path,e=Sh(a,b);c=Rh(a,c);b=a.o.Uc(b,e,c.jc,c.S);d=a.f.subtree(d);if(e)z(null==mh(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=dh(d,function(a,b,c){if(!a.j()&&b&&null!=mh(b))return[Wg(mh(b))];var d=[];b&&(d=d.concat(ra(nh(b),function(a){return a.wa})));x(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.o.vc(c,Sh(a,c));return b}
	function Rh(a,b){var c=b.wa,d=Sh(a,c);return{jc:function(){return(b.G()||w).hash()},S:function(b){if("ok"===b){if(d){var f=c.path;if(b=Jh(a,d)){var g=Kh(b);b=g.path;g=g.fb;f=J(b,f);f=new wf(new Af(!1,!0,g,!0),f);b=Lh(a,b,f)}else b=[]}else b=Eh(a,new wf(Bf,c.path));return b}switch(b){case "too_big":f="The data requested exceeds the maximum size,that can be accessed with a single request.";break;case "limits_exceeded":f="The request is refused by server side because of the resource limit of your APP plan.";
	break;case "permission_denied":f="Client doesn't have permission to access the desired data.";break;case "unavailable":f="The service is unavailable";break;default:f="Unknown error."}f=Error(b+": "+f);f.code=b.toUpperCase();return a.Wa(c,null,f)}}}function Nh(a){return a.path.toString()+"$"+a.ra()}function Kh(a){var b=a.indexOf("$");z(-1!==b&&b<a.length-1,"Bad queryKey.");return{fb:a.substr(b+1),path:new I(a.substr(0,b))}}function Jh(a,b){var c=a.A,d="_"+b;return null!==c&&d in c?c[d]:void 0}
	function Sh(a,b){var c=Nh(b);return t(a.m,c)}var Oh=1;function Lh(a,b,c){var d=a.f.get(b);z(d,"Missing sync point for query tag that we're tracking");return d.Oa(c,new Bh(b,a.g),null)}function Eh(a,b){return Uh(a,b,a.f,null,new Bh(M,a.g))}function Uh(a,b,c,d,e){if(b.path.j())return Vh(a,b,c,d,e);var f=c.get(M);null==d&&null!=f&&(d=f.Sa(M));var g=[],k=K(b.path),l=b.Tb(k);if((c=c.children.get(k))&&l)var m=d?d.P(k):null,k=e.B(k),g=g.concat(Uh(a,l,c,m,k));f&&(g=g.concat(f.Oa(b,e,d)));return g}
	function Vh(a,b,c,d,e){var f=c.get(M);null==d&&null!=f&&(d=f.Sa(M));var g=[];c.children.ja(function(c,f){var m=d?d.P(c):null,u=e.B(c),A=b.Tb(c);A&&(g=g.concat(Vh(a,A,f,m,u)))});f&&(g=g.concat(f.Oa(b,e,d)));return g};function U(a,b,c){this.f=a;this.g=b;this.w=c}U.prototype.N=function(){G("Wilddog.DataSnapshot.val",0,0,arguments.length);return this.f.N()};U.prototype.val=U.prototype.N;U.prototype.gd=function(){G("Wilddog.DataSnapshot.exportVal",0,0,arguments.length);return this.f.N(!0)};U.prototype.exportVal=U.prototype.gd;U.prototype.m=function(){G("Wilddog.DataSnapshot.exists",0,0,arguments.length);return!this.f.j()};U.prototype.exists=U.prototype.m;
	U.prototype.B=function(a){G("Wilddog.DataSnapshot.child",0,1,arguments.length);fa(a)&&(a=String(a));id("Wilddog.DataSnapshot.child",a);var b=new I(a),c=this.g.B(b);return new U(this.f.ia(b),c,R)};U.prototype.child=U.prototype.B;U.prototype.ua=function(a){G("Wilddog.DataSnapshot.hasChild",1,1,arguments.length);id("Wilddog.DataSnapshot.hasChild",a);var b=new I(a);return!this.f.ia(b).j()};U.prototype.hasChild=U.prototype.ua;
	U.prototype.J=function(){G("Wilddog.DataSnapshot.getPriority",0,0,arguments.length);return this.f.J().N()};U.prototype.getPriority=U.prototype.J;U.prototype.o=function(a){G("Wilddog.DataSnapshot.forEach",1,1,arguments.length);H("Wilddog.DataSnapshot.forEach",1,a,!1);if(this.f.R())return!1;var b=this;return!!this.f.V(this.w,function(c,d){return a(new U(d,b.g.B(c),R))})};U.prototype.forEach=U.prototype.o;
	U.prototype.ic=function(){G("Wilddog.DataSnapshot.hasChildren",0,0,arguments.length);return this.f.R()?!1:!this.f.j()};U.prototype.hasChildren=U.prototype.ic;U.prototype.name=function(){B("Wilddog.DataSnapshot.name() being deprecated. Please use Wilddog.DataSnapshot.key() instead.");G("Wilddog.DataSnapshot.name",0,0,arguments.length);return this.key()};U.prototype.name=U.prototype.name;U.prototype.key=function(){G("Wilddog.DataSnapshot.key",0,0,arguments.length);return this.g.key()};
	U.prototype.key=U.prototype.key;U.prototype.Ua=function(){G("Wilddog.DataSnapshot.numChildren",0,0,arguments.length);return this.f.Ua()};U.prototype.numChildren=U.prototype.Ua;U.prototype.gb=function(){G("Wilddog.DataSnapshot.ref",0,0,arguments.length);return this.g};U.prototype.ref=U.prototype.gb;function Wh(a,b,c){this.I=b;this.xa=a;this.Fa=$e(b);this.g=new kf;this.Ea=1;this.Ia=null;this.m;c||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)?(this.m=new ef(this.I,r(this.Gd,this)),setTimeout(r(this.Fd,this,!0),0)):this.m=this.Ia=new ee(this.I,r(this.Gd,this),r(this.Fd,this),r(this.Je,this));this.lb=af(b,r(function(){return new We(this.Fa,this.m)},this));this.o=new ue;
	this.Ka=new Ma;var d=this;this.pa=new Ch({Uc:function(a,b,c,k){b=[];c=d.Ka.u(a.path);c.j()||(b=Eh(d.pa,new vf(Bf,a.path,c)),setTimeout(function(){k("ok")},0));return b},vc:ba});this.xa.bind(Ob.Pa,function(a){a&&a.signIn?d.m.Ed(a.idToken,function(){Xh(d,"authenticated",!0)},function(a,b){Yh(d,a,b)}):d.m.Cd(function(a,b){Yh(d,a,b)})});Xh(this,"connected",!1);this.A=new Se;this.ec=0;this.Yc=null;this.f=new Ch({Uc:function(a,b,c,k){d.m.od(a,c,b,function(b,c){var f=k(b,c);pf(d.g,a.path,f)});return[]},
	vc:function(a,b){d.m.Dd(a,b)}})}function Yh(a,b,c){Xh(a,"authenticated",!1);"expired_token"==b&&a.xa.emit(Ob.dd,{status:b,reason:c})}h=Wh.prototype;h.toString=function(){return(this.I.hb?"https://":"http://")+this.I.host};h.name=function(){return this.I.qd};function Zh(a){a=a.Ka.u(new I(".info/serverTimeOffset")).N()||0;return(new Date).getTime()+a}function $h(a){a=a={timestamp:Zh(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
	h.Gd=function(a,b,c,d){this.ec++;var e=new I(a);b=this.Yc?this.Yc(a,b):b;a=[];d?c?(b=Na(b,function(a){return Q(a)}),a=Mh(this.f,e,b,d)):(b=Q(b),a=Ih(this.f,e,b,d)):c?(d=Na(b,function(a){return Q(a)}),a=Hh(this.f,e,d)):(d=Q(b),a=Eh(this.f,new vf(Bf,e,d)));d=e;0<a.length&&(d=ai(this,e));pf(this.g,d,a)};h.Fd=function(a){Xh(this,"connected",a);!1===a&&bi(this)};h.Je=function(a){var b=this;Hb(a,function(a,d){Xh(b,d,a)})};
	function Xh(a,b,c){b=new I("/.info/"+b);c=Q(c);var d=a.Ka;d.tc=d.tc.M(b,c);c=Eh(a.pa,new vf(Bf,b,c));pf(a.g,b,c)}h.Xa=function(a,b,c,d){this.Xb("set",{path:a.toString(),value:b,Ue:c});var e=$h(this);b=Q(b,c);var e=df(b,e),f=this.Ea++,e=Dh(this.f,a,e,f,!0);lf(this.g,e);var g=this;this.m.Db(a.toString(),b.N(!0),function(b,c){var e="ok"===b;e||B("set at "+a+" failed: "+b);e=Gh(g.f,f,!e);pf(g.g,a,e);ci(d,b,c)});e=di(this,a);ai(this,e);pf(this.g,e,[])};
	h.update=function(a,b,c){this.Xb("update",{path:a.toString(),value:b});var d=!0,e=$h(this),f={};x(b,function(a,b){d=!1;var c=Q(a);f[b]=df(c,e)});if(d)tb("update() called with empty data.  Don't do anything."),ci(c,"ok");else{var g=this.Ea++,k=Fh(this.f,a,f,g);lf(this.g,k);var l=this;this.m.pd(a.toString(),b,function(b,d){var e="ok"===b;e||B("update at "+a+" failed: "+b);var e=Gh(l.f,g,!e),f=a;0<e.length&&(f=ai(l,a));pf(l.g,f,e);ci(c,b,d)});b=di(this,a);ai(this,b);pf(this.g,a,[])}};
	function bi(a){a.Xb("onDisconnectEvents");var b=$h(a),c=[];Ve(cf(a.A,b),M,function(b,e){c=c.concat(Eh(a.f,new vf(Bf,b,e)));var f=di(a,b);ai(a,f)});a.A=new Se;pf(a.g,M,c)}h.nc=function(a,b){var c=this;this.m.nc(a.toString(),function(d,e){"ok"===d&&Ue(c.A,a);ci(b,d,e)})};function ei(a,b,c,d){var e=Q(c);a.m.Pc(b.toString(),e.N(!0),function(c,g){"ok"===c&&Te(a.A,b,e);ci(d,c,g)})}function fi(a,b,c,d,e){var f=Q(c,d);a.m.Pc(b.toString(),f.N(!0),function(c,d){"ok"===c&&Te(a.A,b,f);ci(e,c,d)})}
	function gi(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(tb("onDisconnect().update() called with empty data.  Don't do anything."),ci(d,"ok")):a.m.rd(b.toString(),c,function(e,f){if("ok"===e)for(var l in c)if(c.hasOwnProperty(l)){var m=Q(c[l]);Te(a.A,b.B(l),m)}ci(d,e,f)})}function hi(a,b,c){c=".info"===K(b.path)?a.pa.mb(b,c):a.f.mb(b,c);nf(a.g,b.path,c)}h.cb=function(){this.Ia&&this.Ia.cb()};h.Bb=function(){this.Ia&&this.Ia.Bb()};
	h.Vc=function(a){if("undefined"!==typeof console){a?(this.W||(this.W=new Xe(this.Fa)),a=this.W.get()):a=this.Fa.get();var b=sa(Sa(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a)if(a.hasOwnProperty(c)){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};h.Wc=function(a){var b=this.Fa,c;p(c)||(c=1);za(b.f,a)||(b.f[a]=0);b.f[a]+=c;this.lb.Bd[a]=!0};h.Xb=function(a){var b="";this.Ia&&(b=this.Ia.id+":");tb(b,arguments)};
	function ci(a,b,c){a&&Kb(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function ii(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.hb=b;this.qd=c;this.pc=e||"";this.Aa=db.get("host:"+a)||this.host;this.Ra=JSON.parse(y.get("failHosts"))||[]}ii.prototype.nd=function(){return"wilddogio.com"!==this.domain&&"wilddogio-demo.com"!==this.domain};
	function be(a,b){null==b?(a.Aa=a.host,"s-"===a.Aa.substr(0,2)&&db.remove("host:"+a.host)):b!==a.Aa&&0<b.indexOf(".wilddogio.com")&&(a.Aa=b,"s-"===a.Aa.substr(0,2)&&db.set("host:"+a.host,a.Aa))}ii.prototype.toString=function(){var a=(this.hb?"https://":"http://")+this.host;this.pc&&(a+="<"+this.pc+">");return a};({}).Ne;
	function ji(a,b,c,d,e){function f(){}a.Xb("transaction on "+b);var g=new V(a.xa,a,b);g.Va("value",f);c={path:b,update:c,S:d,status:null,ud:pb(),cd:e,zd:0,wc:function(){g.eb("value",f)},Bc:null,sa:null,bc:null,cc:null,dc:null};d=a.f.qa(b,void 0)||w;c.bc=d;d=c.update(d.N());if(p(d)){cd("transaction failed: Data returned ",d,c.path);c.status=1;e=ve(a.o,b);var k=e.ta()||[];k.push(c);we(e,k);"object"===typeof d&&null!==d&&za(d,".priority")?(k=t(d,".priority"),z(ad(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):k=
	(a.f.qa(b)||w).J().N();e=$h(a);d=Q(d,k);e=df(d,e);c.cc=d;c.dc=e;c.sa=a.Ea++;c=Dh(a.f,b,e,c.sa,c.cd);pf(a.g,b,c);ki(a)}else c.wc(),c.cc=null,c.dc=null,c.S&&(a=new U(c.bc,new V(a.xa,a,c.path),R),c.S(null,!1,a))}function ki(a,b){var c=b||a.o;b||li(a,c);if(null!==c.ta()){var d=mi(a,c);z(0<d.length,"Sending zero length transaction queue");ta(d,function(a){return 1===a.status})&&ni(a,c.path(),d)}else c.ic()&&c.V(function(b){ki(a,b)})}
	function ni(a,b,c){for(var d=ra(c,function(a){return a.sa}),e=a.f.qa(b,d)||w,d=e,e=e.hash(),f=0;f<c.length;f++){var g=c[f];z(1===g.status,"tryToSendTransactionQueue_: items in queue should all be run.");g.status=2;g.zd++;var k=J(b,g.path),d=d.M(k,g.cc)}var d=d.N(!0),l=a.xa;a.m.Db(b.toString(),d,function(d){a.Xb("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(Gh(a.f,c[f].sa));if(c[f].S){var g=c[f].dc,k=new V(l,a,c[f].path);
	d.push(r(c[f].S,null,null,!0,new U(g,k,R)))}c[f].wc()}li(a,ve(a.o,b));ki(a);pf(a.g,b,e);for(f=0;f<d.length;f++)Kb(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(B("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].Bc=d;ai(a,b)}},e)}function ai(a,b){var c=oi(a,b),d=c.path(),c=mi(a,c);pi(a,c,d);return d}
	function pi(a,b,c){if(0!==b.length){for(var d=[],e=[],f=ra(b,function(a){return a.sa}),g=0;g<b.length;g++){var k=b[g],l=J(c,k.path),m=!1,u;z(null!==l,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)m=!0,u=k.Bc,e=e.concat(Gh(a.f,k.sa,!0));else if(1===k.status)if(25<=k.zd)m=!0,u="maxretry",e=e.concat(Gh(a.f,k.sa,!0));else{var A=a.f.qa(k.path,f)||w;k.bc=A;var O=b[g].update(A.N());p(O)?(cd("transaction failed: Data returned ",O,k.path),l=Q(O),"object"===typeof O&&null!=
	O&&za(O,".priority")||(l=l.aa(A.J())),A=k.sa,O=$h(a),O=df(l,O),k.cc=l,k.dc=O,k.sa=a.Ea++,wa(f,A),e=e.concat(Dh(a.f,k.path,O,k.sa,k.cd)),e=e.concat(Gh(a.f,A,!0))):(m=!0,u="nodata",e=e.concat(Gh(a.f,k.sa,!0)))}pf(a.g,c,e);e=[];m&&(b[g].status=3,setTimeout(b[g].wc,Math.floor(0)),b[g].S&&("nodata"===u?(k=new V(a.xa,a,b[g].path),d.push(r(b[g].S,null,null,!1,new U(b[g].bc,k,R)))):d.push(r(b[g].S,null,Error(u),!1,null))))}li(a,a.o);for(g=0;g<d.length;g++)Kb(d[g]);ki(a)}}
	function oi(a,b){for(var c,d=a.o;null!==(c=K(b))&&null===d.ta();)d=ve(d,c),b=L(b);return d}function mi(a,b){var c=[];qi(a,b,c);c.sort(function(a,b){return a.ud-b.ud});return c}function qi(a,b,c){var d=b.ta();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.V(function(b){qi(a,b,c)})}function li(a,b){var c=b.ta();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;we(b,0<c.length?c:null)}b.V(function(b){li(a,b)})}
	function di(a,b){var c=oi(a,b).path(),d=ve(a.o,b);ze(d,function(b){ri(a,b)});ri(a,d);ye(d,function(b){ri(a,b)});return c}
	function ri(a,b){var c=b.ta();if(null!==c){for(var d=[],e=[],f=-1,g=0;g<c.length;g++)4!==c[g].status&&(2===c[g].status?(z(f===g-1,"All SENT items should be at beginning of queue."),f=g,c[g].status=4,c[g].Bc="set"):(z(1===c[g].status,"Unexpected transaction status in abort"),c[g].wc(),e=e.concat(Gh(a.f,c[g].sa,!0)),c[g].S&&d.push(r(c[g].S,null,Error("set"),!1,null))));-1===f?we(b,null):c.length=f+1;pf(a.g,b.path(),e);for(g=0;g<d.length;g++)Kb(d[g])}};function si(){this.f={};this.g=!1}ca(si);si.prototype.cb=function(a){for(var b in this.f[a.name])this.f[a.name].hasOwnProperty(b)&&this.f[a.name][b].cb()};si.prototype.interrupt=si.prototype.cb;si.prototype.Bb=function(a){for(var b in this.f[a.name])this.f[a.name].hasOwnProperty(b)&&this.f[a.name][b].Bb()};si.prototype.resume=si.prototype.Bb;si.prototype.Ic=function(){this.g=!0};function ti(a){var b=this;this.Qa=a;this.m="*";md()?this.f=this.g=nd():(this.f=window.opener,this.g=window);if(!b.f)throw"Unable to find relay frame";od(this.g,"message",r(this.A,this));od(this.g,"message",r(this.o,this));try{ui(this,{a:"ready"})}catch(c){od(this.f,"load",function(){ui(b,{a:"ready"})})}od(window,"unload",r(this.W,this))}function ui(a,b){b=v(b);md()?a.f.doPost(b,a.m):a.f.postMessage(b,a.m)}
	ti.prototype.A=function(a){var b=this,c;try{c=Ka(a.data)}catch(d){}c&&"request"===c.a&&(pd(window,"message",this.A),this.m=a.origin,this.Qa&&setTimeout(function(){b.Qa(b.m,c.d,function(a,c){b.I=!c;b.Qa=void 0;ui(b,{a:"response",d:a,forceKeepWindowOpen:c})})},0))};ti.prototype.W=function(){try{pd(this.g,"message",this.o)}catch(a){}this.Qa&&(ui(this,{a:"error",d:"unknown closed window"}),this.Qa=void 0);try{window.close()}catch(a){}};ti.prototype.o=function(a){if(this.I&&"die"===a.data)try{window.close()}catch(b){}};var W={Xd:function(){Ud.Oe.Wd();Ud.Id.Se()}};W.forceLongPolling=W.Xd;W.Yd=function(){Ud.Id.Wd()};W.forceWebSockets=W.Yd;W.re=function(a,b){a.H.Ia.Tc=b};W.setSecurityDebugCallback=W.re;W.Vc=function(a,b){a.H.Vc(b)};W.stats=W.Vc;W.Wc=function(a,b){a.H.Wc(b)};W.statsIncrementCounter=W.Wc;W.ec=function(a){return a.H.ec};W.dataUpdateCount=W.ec;W.$d=function(a,b){a.H.Yc=b};W.interceptServerData=W.$d;W.fe=function(a){new ti(a)};W.onPopupOpen=W.fe;W.pe=function(a){Rb=a};W.setAuthenticationServer=W.pe;function vi(a,b){this.committed=a;this.snapshot=b};function X(a,b){this.f=a;this.na=b}X.prototype.cancel=function(a){G("Wilddog.onDisconnect().cancel",0,1,arguments.length);H("Wilddog.onDisconnect().cancel",1,a,!0);var b=new D;this.f.nc(this.na,E(b,a));return b.f};X.prototype.cancel=X.prototype.cancel;X.prototype.cancel=X.prototype.cancel;
	X.prototype.remove=function(a){G("Wilddog.onDisconnect().remove",0,1,arguments.length);jd("Wilddog.onDisconnect().remove",this.na);H("Wilddog.onDisconnect().remove",1,a,!0);var b=new D;ei(this.f,this.na,null,E(b,a));return b.f};X.prototype.remove=X.prototype.remove;X.prototype.remove=X.prototype.remove;
	X.prototype.set=function(a,b){G("Wilddog.onDisconnect().set",1,2,arguments.length);jd("Wilddog.onDisconnect().set",this.na);bd("Wilddog.onDisconnect().set",a,this.na,!1);H("Wilddog.onDisconnect().set",2,b,!0);var c=new D;ei(this.f,this.na,a,E(c,b));return c.f};X.prototype.set=X.prototype.set;X.prototype.set=X.prototype.set;
	X.prototype.Xa=function(a,b,c){G("Wilddog.onDisconnect().setWithPriority",2,3,arguments.length);jd("Wilddog.onDisconnect().setWithPriority",this.na);bd("Wilddog.onDisconnect().setWithPriority",a,this.na,!1);fd("Wilddog.onDisconnect().setWithPriority",2,b);H("Wilddog.onDisconnect().setWithPriority",3,c,!0);var d=new D;fi(this.f,this.na,a,b,E(d,c));return d.f};X.prototype.setWithPriority=X.prototype.Xa;X.prototype.setWithPriority=X.prototype.Xa;
	X.prototype.update=function(a,b){G("Wilddog.onDisconnect().update",1,2,arguments.length);jd("Wilddog.onDisconnect().update",this.na);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;B("Passing an Array to Wilddog.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}ed("Wilddog.onDisconnect().update",a,this.na);H("Wilddog.onDisconnect().update",2,b,!0);c=new D;
	gi(this.f,this.na,a,E(c,b));return c.f};X.prototype.update=X.prototype.update;X.prototype.update=X.prototype.update;var wi=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);z(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);z(20===c.length,"nextPushId: Length should be 20.");
	return c}}();function Wf(){this.f={}}
	function xi(a,b){var c=b.type,d=b.Ma;z("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");z(".priority"!==d,"Only non-priority child changes can be tracked.");var e=t(a.f,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.f[d]=new T("child_changed",b.Ca,d,e.Ca);else if("child_removed"==c&&"child_added"==f)delete a.f[d];else if("child_removed"==c&&"child_changed"==f)a.f[d]=new T("child_removed",e.Oc,d);else if("child_changed"==c&&"child_added"==
	f)a.f[d]=new T("child_added",b.Ca,d);else if("child_changed"==c&&"child_changed"==f)a.f[d]=new T("child_changed",b.Ca,d,e.Oc);else throw qb("Illegal combination of changes: "+b+" occurred after "+e);}else a.f[d]=b};function Tg(a){this.w=a}h=Tg.prototype;h.M=function(a,b,c,d,e){z(a.zb(this.w),"A node must be indexed if only a child is updated");d=a.P(b);if(d.Z(c))return a;null!=e&&(c.j()?a.ua(b)?xi(e,new T("child_removed",d,b)):z(a.R(),"A child remove without an old child only makes sense on a leaf node"):d.j()?xi(e,new T("child_added",c,b)):xi(e,new T("child_changed",c,b,d)));return a.R()&&c.j()?a:a.T(b,c).Na(this.w)};
	h.oa=function(a,b,c){null!=c&&(a.R()||a.V(R,function(a,e){b.ua(a)||xi(c,new T("child_removed",e,a))}),b.R()||b.V(R,function(b,e){if(a.ua(b)){var f=a.P(b);f.Z(e)||xi(c,new T("child_changed",e,b,f))}else xi(c,new T("child_added",e,b))}));return b.Na(this.w)};h.aa=function(a,b){return a.j()?w:a.aa(b)};h.ya=function(){return!1};h.rb=function(){return this};h.U=function(){return this.w};function Vg(a){this.m=new Tg(a.U());this.w=a.U();var b;a.la?(b=yi(a),b=a.U().Pb(zi(a),b)):b=a.U().Sb();this.g=b;a.ma?(b=Ai(a),a=a.U().Pb(Bi(a),b)):a=a.U().Qb();this.f=a}h=Vg.prototype;h.matches=function(a){return 0>=this.w.compare(this.g,a)&&0>=this.w.compare(a,this.f)};h.M=function(a,b,c,d,e){this.matches(new P(b,c))||(c=w);return this.m.M(a,b,c,d,e)};
	h.oa=function(a,b,c){b.R()&&(b=w);var d=b.Na(this.w),d=d.aa(w),e=this;b.V(R,function(a,b){e.matches(new P(a,b))||(d=d.T(a,w))});return this.m.oa(a,d,c)};h.aa=function(a){return a};h.ya=function(){return!0};h.rb=function(){return this.m};h.U=function(){return this.w};function Ug(a){this.f=new Vg(a);this.w=a.U();z(a.ka,"Only valid if limit has been set");this.ca=a.ca;this.g=!Ci(a)}h=Ug.prototype;h.M=function(a,b,c,d,e){this.f.matches(new P(b,c))||(c=w);return a.P(b).Z(c)?a:a.Ua()<this.ca?this.f.rb().M(a,b,c,d,e):Di(this,a,b,c,d,e)};
	h.oa=function(a,b,c){var d;if(b.R()||b.j())d=w.Na(this.w);else if(2*this.ca<b.Ua()&&b.zb(this.w)){d=w.Na(this.w);b=this.g?b.vb(this.f.f,this.w):b.ub(this.f.g,this.w);for(var e=0;0<b.Ha.length&&e<this.ca;){var f=qg(b),g;if(g=this.g?0>=this.w.compare(this.f.g,f):0>=this.w.compare(f,this.f.f))d=d.T(f.name,f.node),e++;else break}}else{d=b.Na(this.w);d=d.aa(w);var k,l,m;if(this.g){b=d.ld(this.w);k=this.f.f;l=this.f.g;var u=Ee(this.w);m=function(a,b){return u(b,a)}}else b=d.tb(this.w),k=this.f.g,l=this.f.f,
	m=Ee(this.w);for(var e=0,A=!1;0<b.Ha.length;)f=qg(b),!A&&0>=m(k,f)&&(A=!0),(g=A&&e<this.ca&&0>=m(f,l))?e++:d=d.T(f.name,w)}return this.f.rb().oa(a,d,c)};h.aa=function(a){return a};h.ya=function(){return!0};h.rb=function(){return this.f.rb()};h.U=function(){return this.w};
	function Di(a,b,c,d,e,f){var g;if(a.g){var k=Ee(a.w);g=function(a,b){return k(b,a)}}else g=Ee(a.w);z(b.Ua()==a.ca,"");var l=new P(c,d),m=a.g?Mg(b,a.w):Ng(b,a.w),u=a.f.matches(l);if(b.ua(c)){var A=b.P(c),m=e.Kc(a.w,m,a.g);null!=m&&m.name==c&&(m=e.Kc(a.w,m,a.g));e=null==m?1:g(m,l);if(u&&!d.j()&&0<=e)return null!=f&&xi(f,new T("child_changed",d,c,A)),b.T(c,d);null!=f&&xi(f,new T("child_removed",A,c));b=b.T(c,w);return null!=m&&a.f.matches(m)?(null!=f&&xi(f,new T("child_added",m.node,m.name)),b.T(m.name,
	m.node)):b}return d.j()?b:u&&0<=g(m,l)?(null!=f&&(xi(f,new T("child_removed",m.node,m.name)),xi(f,new T("child_added",d,c))),b.T(c,d).T(m.name,w)):b};function Ei(){this.pb=this.ma=this.ib=this.la=this.ka=!1;this.ca=0;this.kb="";this.yb=null;this.bb="";this.wb=null;this.ab="";this.w=R}var Fi=new Ei;function Ci(a){return""===a.kb?a.la:"l"===a.kb}function zi(a){z(a.la,"Only valid if start has been set");return a.yb}function yi(a){z(a.la,"Only valid if start has been set");return a.ib?a.bb:"[MIN_NAME]"}function Bi(a){z(a.ma,"Only valid if end has been set");return a.wb}
	function Ai(a){z(a.ma,"Only valid if end has been set");return a.pb?a.ab:"[MAX_NAME]"}h=Ei.prototype;h.U=function(){return this.w};function Gi(a){var b=new Ei;b.ka=a.ka;b.ca=a.ca;b.la=a.la;b.yb=a.yb;b.ib=a.ib;b.bb=a.bb;b.ma=a.ma;b.wb=a.wb;b.pb=a.pb;b.ab=a.ab;b.w=a.w;return b}h.Nc=function(a){var b=Gi(this);b.ka=!0;b.ca=a;b.kb="";return b};h.lc=function(a){var b=Gi(this);b.ka=!0;b.ca=a;b.kb="l";return b};h.mc=function(a){var b=Gi(this);b.ka=!0;b.ca=a;b.kb="r";return b};
	h.Vb=function(a,b){var c=Gi(this);c.la=!0;p(a)||(a=null);c.yb=a;null!=b?(c.ib=!0,c.bb=b):(c.ib=!1,c.bb="");return c};h.Nb=function(a,b){var c=Gi(this);c.ma=!0;p(a)||(a=null);c.wb=a;p(b)?(c.pb=!0,c.ab=b):(c.We=!1,c.ab="");return c};function Hi(a,b){var c=Gi(a);c.w=b;return c}function je(a){var b={};a.la&&(b.sp=a.yb,a.ib&&(b.sn=a.bb));a.ma&&(b.ep=a.wb,a.pb&&(b.en=a.ab));if(a.ka){b.l=a.ca;var c=a.kb;""===c&&(c=Ci(a)?"l":"r");b.vf=c}a.w!==R&&(b.i=a.w.toString());return b}
	function gf(a){return!(a.la||a.ma||a.ka)}function hf(a){var b={};if(gf(a)&&a.w==R)return b;var c;a.w===R?c="$priority":a.w===Oe?c="$value":a.w===Le?c="$key":(z(a.w instanceof Ge,"Unrecognized index type!"),c=a.w.toString());b.orderBy=v(c);a.la&&(b.startAt=v(a.yb),a.ib&&(b.startAt+=","+v(a.bb)));a.ma&&(b.endAt=v(a.wb),a.pb&&(b.endAt+=","+v(a.ab)));a.ka&&(Ci(a)?b.limitToFirst=a.ca:b.limitToLast=a.ca);return b}h.toString=function(){return v(je(this))};function Y(a,b,c,d){this.H=a;this.path=b;this.F=c;this.f=d}
	function Ii(a){var b=null,c=null;a.la&&(b=zi(a));a.ma&&(c=Bi(a));if(a.U()===Le){if(a.la){if("[MIN_NAME]"!=yi(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.ma){if("[MAX_NAME]"!=Ai(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
	typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.U()===R){if(null!=b&&!ad(b)||null!=c&&!ad(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(z(a.U()instanceof Ge||a.U()===Oe,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
	}function Ji(a){if(a.la&&a.ma&&a.ka&&(!a.ka||""===a.kb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function Ki(a,b){if(!0===a.f)throw Error(b+": You can't combine multiple orderBy calls.");}Y.prototype.gb=function(a){G("Query.ref",0,1,arguments.length);return new V(this.app,this.H,a?this.path.B(a):this.path)};Y.prototype.ref=Y.prototype.gb;Y.prototype.ref=Y.prototype.gb;
	Y.prototype.Va=function(a,b,c,d){G("Query.on",2,4,arguments.length);gd("Query.on",a,!1);H("Query.on",2,b,!1);var e=Li("Query.on",c,d);if("value"===a)hi(this.H,this,new If(b,e.cancel||null,e.context||null));else{var f={};f[a]=b;hi(this.H,this,new Jf(f,e.cancel,e.context))}return b};Y.prototype.on=Y.prototype.Va;Y.prototype.on=Y.prototype.Va;
	Y.prototype.eb=function(a,b,c){G("Query.off",0,3,arguments.length);gd("Query.off",a,!0);H("Query.off",2,b,!0);Rc("Query.off",3,c);var d=null,e=null;"value"===a?d=new If(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new Jf(e,null,c||null));e=this.H;d=".info"===K(this.path)?e.pa.Wa(this,d):e.f.Wa(this,d);nf(e.g,this.path,d)};Y.prototype.off=Y.prototype.eb;Y.prototype.off=Y.prototype.eb;
	Y.prototype.td=function(a,b){function c(k){f&&(f=!1,e.eb(a,c),b&&b.call(d.context,k),g.m(k))}G("Query.once",1,4,arguments.length);gd("Query.once",a,!1);H("Query.once",2,b,!0);var d=Li("Query.once",arguments[2],arguments[3]),e=this,f=!0,g=new D;Cc(g.f);this.Va(a,c,function(b){e.eb(a,c);d.cancel&&d.cancel.call(d.context,b);g.g(b)});return g.f};Y.prototype.once=Y.prototype.td;Y.prototype.once=Y.prototype.td;
	Y.prototype.Nc=function(a){B("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");G("Query.limit",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limit: First argument must be a positive integer.");if(this.F.ka)throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");var b=this.F.Nc(a);Ji(b);return new Y(this.H,this.path,b,this.f)};Y.prototype.limit=Y.prototype.Nc;
	Y.prototype.lc=function(a){G("Query.limitToFirst",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.F.ka)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.H,this.path,this.F.lc(a),this.f)};Y.prototype.limitToFirst=Y.prototype.lc;Y.prototype.limitToFirst=Y.prototype.lc;
	Y.prototype.mc=function(a){G("Query.limitToLast",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.F.ka)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.H,this.path,this.F.mc(a),this.f)};Y.prototype.limitToLast=Y.prototype.mc;Y.prototype.limitToLast=Y.prototype.mc;
	Y.prototype.vd=function(a){G("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');hd("Query.orderByChild",1,a,!1);Ki(this,"Query.orderByChild");var b=Hi(this.F,new Ge(a));Ii(b);return new Y(this.H,
	this.path,b,!0)};Y.prototype.orderByChild=Y.prototype.vd;Y.prototype.orderByChild=Y.prototype.vd;Y.prototype.wd=function(){G("Query.orderByKey",0,0,arguments.length);Ki(this,"Query.orderByKey");var a=Hi(this.F,Le);Ii(a);return new Y(this.H,this.path,a,!0)};Y.prototype.orderByKey=Y.prototype.wd;Y.prototype.orderByKey=Y.prototype.wd;Y.prototype.xd=function(){G("Query.orderByPriority",0,0,arguments.length);Ki(this,"Query.orderByPriority");var a=Hi(this.F,R);Ii(a);return new Y(this.H,this.path,a,!0)};
	Y.prototype.orderByPriority=Y.prototype.xd;Y.prototype.orderByPriority=Y.prototype.xd;Y.prototype.yd=function(){G("Query.orderByValue",0,0,arguments.length);Ki(this,"Query.orderByValue");var a=Hi(this.F,Oe);Ii(a);return new Y(this.H,this.path,a,!0)};Y.prototype.orderByValue=Y.prototype.yd;Y.prototype.orderByValue=Y.prototype.yd;
	Y.prototype.Vb=function(a,b){G("Query.startAt",0,2,arguments.length);bd("Query.startAt",a,this.path,!0);hd("Query.startAt",2,b,!0);var c=this.F.Vb(a,b);Ji(c);Ii(c);if(this.F.la)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");p(a)||(b=a=null);return new Y(this.H,this.path,c,this.f)};Y.prototype.startAt=Y.prototype.Vb;Y.prototype.startAt=Y.prototype.Vb;
	Y.prototype.Nb=function(a,b){G("Query.endAt",0,2,arguments.length);bd("Query.endAt",a,this.path,!0);hd("Query.endAt",2,b,!0);var c=this.F.Nb(a,b);Ji(c);Ii(c);if(this.F.ma)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new Y(this.H,this.path,c,this.f)};Y.prototype.endAt=Y.prototype.Nb;Y.prototype.endAt=Y.prototype.Nb;
	Y.prototype.fd=function(a,b){G("Query.equalTo",1,2,arguments.length);bd("Query.equalTo",a,this.path,!1);hd("Query.equalTo",2,b,!0);if(this.F.la)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.F.ma)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.Vb(a,b).Nb(a,b)};Y.prototype.equalTo=Y.prototype.fd;Y.prototype.equalTo=Y.prototype.fd;
	Y.prototype.toString=function(){G("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.$;c<a.D.length;c++)""!==a.D[c]&&(b+="/"+encodeURIComponent(String(a.D[c])));return this.H.toString()+(b||"/")};Y.prototype.toString=Y.prototype.toString;Y.prototype.ra=function(){var a=Gb(je(this.F));return"{}"===a?"default":a};
	function Li(a,b,c){var d={cancel:null,context:null};if(b&&c)d.cancel=b,H(a,3,d.cancel,!0),d.context=c,Rc(a,4,d.context);else if(b)if("object"===typeof b&&null!==b)d.context=b;else if("function"===typeof b)d.cancel=b;else throw Error(Qc(a,3,!0)+" must either be a cancel callback or a context object.");return d};var Z={};Z.Eb=ee;Z.DataConnection=Z.Eb;ee.prototype.Md=function(a,b){this.va("q",{p:a},b)};Z.Eb.prototype.simpleListen=Z.Eb.prototype.Md;ee.prototype.Kd=function(a,b){this.va("echo",{d:a},b)};Z.Eb.prototype.echo=Z.Eb.prototype.Kd;ee.prototype.interrupt=ee.prototype.cb;Z.Od=Wd;Z.RealTimeConnection=Z.Od;Wd.prototype.sendRequest=Wd.prototype.va;Wd.prototype.close=Wd.prototype.close;
	Z.Zd=function(a){var b=ee.prototype.Db;ee.prototype.Db=function(c,d,e,f){p(f)&&(f=a());b.call(this,c,d,e,f)};return function(){ee.prototype.Db=b}};Z.hijackHash=Z.Zd;Z.Jd=La.Me;Z.ConnectionTarget=Z.Jd;Z.ra=function(a){return a.ra()};Z.queryIdentifier=Z.ra;Z.ce=function(a){return a.H.Ia.da};Z.listens=Z.ce;Z.Ic=function(a){a.Ic()};Z.forceRestClient=Z.Ic;Sd().__regService("sync",function(a){return new V(a)});
	function V(a,b,c){this.app=a;if(!b&&!c){b=a.options.syncURL;if(!b)throw Error("Could not find 'syncURL' in options.");a=Cb(b);b=a.ze;"wilddog"===a.domain&&Bb(a.host+" is no longer supported. Please use <YOUR WILDDOG>.wilddogio.com instead");b||Bb("Cannot parse Wilddog url. Please use https://<YOUR WILDDOG>.wilddogio.com");a.hb||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&B("Insecure Wilddog access from a secure page. Please use https in calls to new Wilddog().");
	b=new ii(a.host,a.hb,b);a=new I(a.Ub);c=si.sb();var d=this.app,e=b.toString();c.f[d.name]||(c.f[d.name]={});var f=t(c.f[d.name],e);f||(f=new Wh(d,b,c.g),c.f[d.name][e]=f);b=f;c=a}Y.call(this,b,c,Fi,!1)}la(V,Y);V.prototype.name=function(){B("Wilddog.name() being deprecated. Please use Wilddog.key() instead.");G("Wilddog.name",0,0,arguments.length);return this.key()};V.prototype.name=V.prototype.name;V.prototype.key=function(){G("Wilddog.key",0,0,arguments.length);return this.path.j()?null:Tc(this.path)};
	V.prototype.key=V.prototype.key;V.prototype.B=function(a){G("Wilddog.child",1,1,arguments.length);if(fa(a))a=String(a);else if(!(a instanceof I))if(null===K(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));id("Wilddog.child",b)}else id("Wilddog.child",a);return new V(this.app,this.H,this.path.B(a))};V.prototype.child=V.prototype.B;V.prototype.parent=function(){G("Wilddog.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new V(this.app,this.H,a)};
	V.prototype.parent=V.prototype.parent;V.prototype.root=function(){G("Wilddog.ref",0,0,arguments.length);for(var a=this;null!==a.parent();)a=a.parent();return a};V.prototype.root=V.prototype.root;V.prototype.set=function(a,b){G("Wilddog.set",1,2,arguments.length);jd("Wilddog.set",this.path);bd("Wilddog.set",a,this.path,!1);H("Wilddog.set",2,b,!0);var c=new D;this.H.Xa(this.path,a,null,E(c,b));return c.f};V.prototype.set=V.prototype.set;
	V.prototype.update=function(a,b){G("Wilddog.update",1,2,arguments.length);jd("Wilddog.update",this.path);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;B("Passing an Array to Wilddog.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}ed("Wilddog.update",a,this.path);H("Wilddog.update",2,b,!0);c=new D;this.H.update(this.path,a,E(c,b));return c.f};V.prototype.update=V.prototype.update;
	V.prototype.Xa=function(a,b,c){G("Wilddog.setWithPriority",2,3,arguments.length);jd("Wilddog.setWithPriority",this.path);bd("Wilddog.setWithPriority",a,this.path,!1);fd("Wilddog.setWithPriority",2,b);H("Wilddog.setWithPriority",3,c,!0);if(".length"===this.key()||".keys"===this.key())throw"Wilddog.setWithPriority failed: "+this.key()+" is a read-only object.";var d=new D;this.H.Xa(this.path,a,b,E(d,c));return d.f};V.prototype.setWithPriority=V.prototype.Xa;
	V.prototype.remove=function(a){G("Wilddog.remove",0,1,arguments.length);jd("Wilddog.remove",this.path);H("Wilddog.remove",1,a,!0);this.set(null,a)};V.prototype.remove=V.prototype.remove;
	V.prototype.transaction=function(a,b,c){G("Wilddog.transaction",1,3,arguments.length);jd("Wilddog.transaction",this.path);H("Wilddog.transaction",1,a,!1);H("Wilddog.transaction",2,b,!0);if(p(c)&&"boolean"!=typeof c)throw Error(Qc("Wilddog.transaction",3,!0)+"must be a boolean.");if(".length"===this.key()||".keys"===this.key())throw"Wilddog.transaction failed: "+this.key()+" is a read-only object.";"undefined"===typeof c&&(c=!0);var d=new D;ga(b)&&Cc(d.f);ji(this.H,this.path,a,function(a,c,g){a?d.g(a):
	d.m(new vi(c,g));ga(b)&&b(a,c,g)},c);return d.f};V.prototype.transaction=V.prototype.transaction;V.prototype.qe=function(a,b){G("Wilddog.setPriority",1,2,arguments.length);jd("Wilddog.setPriority",this.path);fd("Wilddog.setPriority",1,a);H("Wilddog.setPriority",2,b,!0);var c=new D;this.H.Xa(this.path.B(".priority"),a,null,E(c,b));return c.f};V.prototype.setPriority=V.prototype.qe;
	V.prototype.push=function(a,b){G("Wilddog.push",0,2,arguments.length);jd("Wilddog.push",this.path);bd("Wilddog.push",a,this.path,!0);H("Wilddog.push",2,b,!0);var c=Zh(this.H),d=wi(c),c=this.B(d);if(null!=a){var e=this,f=c.set(a,b).then(function(){return e.B(d)});c.then=r(f.then,f);c["catch"]=r(f.then,f,void 0);ga(b)&&Cc(f)}return c};V.prototype.push=V.prototype.push;V.prototype.onDisconnect=function(){jd("Wilddog.onDisconnect",this.path);return new X(this.H,this.path)};V.prototype.onDisconnect=V.prototype.onDisconnect;
	function Mi(){G("Wilddog.goOffline",0,0,arguments.length);si.sb().cb(this.app)}aa("Wilddog.goOffline",Mi);function Ni(){G("Wilddog.goOnline",0,0,arguments.length);si.sb().Bb(this.app)}aa("Wilddog.goOnline",Ni);
	function yb(a,b){z(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?wb=r(console.log,console):"object"===typeof console.log&&(wb=function(a){console.log(a)})),b&&y.set("logging_enabled",!0)):a?wb=a:(wb=null,y.remove("logging_enabled"))}var rb=CLIENT_VERSION;V.prototype.goOffline=Mi;V.prototype.goOnline=Ni;V.prototype.enableLogging=yb;V.prototype.ServerValue={TIMESTAMP:{".sv":"timestamp"}};
	V.prototype.SDK_VERSION=rb;V.prototype.INTERNAL=W;V.prototype.TEST_ACCESS=Z;var Oi={ie:{}};Oi.ie.all={};Oi=Sd();
	(function(a){a.auth=a.auth?a.auth:{};[{id:"password",name:"Email",Gb:"email",Hb:"password"},{id:"qq",name:"QQ",Gb:"accessToken",Hb:"openId"},{id:"weibo",name:"Weibo",Gb:"accessToken",Hb:"openId"},{id:"weixin",name:"Weixin",Gb:"accessToken",Hb:"openId"},{id:"weixinmp",name:"Weixinmp",Gb:"accessToken",Hb:"openId"}].forEach(function(b){a.auth[b.name+"AuthProvider"]=function(){this.id=b.id;this.addScope=function(a){this.scope=a}};a.auth[b.name+"AuthProvider"].credential=function(a,d){var e={};e.provider=
	b.id;e[b.Gb]=a;e[b.Hb]=d;return e}})})(Oi);1!=NODE_CLIENT?("object"==typeof module&&module.exports&&(module.exports=Oi),"function"=="function"&&__webpack_require__(113)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return Oi}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)),window?window.wilddog=Oi:WorkerGlobalScope&&self&&(self.wilddog=Oi)):module.exports=Oi;
	};ns.wrapper(ns.goog,ns.wd)})({goog:{},wd:{}})

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(77).Buffer))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(78)
	var ieee754 = __webpack_require__(79)
	var isArray = __webpack_require__(80)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(77).Buffer, (function() { return this; }())))

/***/ },
/* 78 */
/***/ function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr(len * 3 / 4 - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ },
/* 79 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 80 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports =  __webpack_require__(82);


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(83);

	/**
	 * Exports parser
	 *
	 * @api public
	 *
	 */
	module.exports.parser = __webpack_require__(90);


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */

	var transports = __webpack_require__(84);
	var Emitter = __webpack_require__(100);
	var debug = __webpack_require__(104)('engine.io-client:socket');
	var index = __webpack_require__(110);
	var parser = __webpack_require__(90);
	var parseuri = __webpack_require__(111);
	var parsejson = __webpack_require__(112);
	var parseqs = __webpack_require__(101);

	/**
	 * Module exports.
	 */

	module.exports = Socket;

	/**
	 * Noop function.
	 *
	 * @api private
	 */

	function noop(){}

	/**
	 * Socket constructor.
	 *
	 * @param {String|Object} uri or options
	 * @param {Object} options
	 * @api public
	 */

	function Socket(uri, opts){
	  if (!(this instanceof Socket)) return new Socket(uri, opts);

	  opts = opts || {};

	  if (uri && 'object' == typeof uri) {
	    opts = uri;
	    uri = null;
	  }

	  if (uri) {
	    uri = parseuri(uri);
	    opts.hostname = uri.host;
	    opts.secure = uri.protocol == 'https' || uri.protocol == 'wss';
	    opts.port = uri.port;
	    if (uri.query) opts.query = uri.query;
	  } else if (opts.host) {
	    opts.hostname = parseuri(opts.host).host;
	  }

	  this.secure = null != opts.secure ? opts.secure :
	    (global.location && 'https:' == location.protocol);

	  if (opts.hostname && !opts.port) {
	    // if no port is specified manually, use the protocol default
	    opts.port = this.secure ? '443' : '80';
	  }

	  this.agent = opts.agent || false;
	  this.hostname = opts.hostname ||
	    (global.location ? location.hostname : 'localhost');
	  this.port = opts.port || (global.location && location.port ?
	       location.port :
	       (this.secure ? 443 : 80));
	  this.query = opts.query || {};
	  if ('string' == typeof this.query) this.query = parseqs.decode(this.query);
	  this.upgrade = false !== opts.upgrade;
	  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
	  this.forceJSONP = !!opts.forceJSONP;
	  this.jsonp = false !== opts.jsonp;
	  this.forceBase64 = !!opts.forceBase64;
	  this.enablesXDR = !!opts.enablesXDR;
	  this.timestampParam = opts.timestampParam || 't';
	  this.timestampRequests = opts.timestampRequests;
	  this.transports = opts.transports || ['polling', 'websocket'];
	  this.readyState = '';
	  this.writeBuffer = [];
	  this.policyPort = opts.policyPort || 843;
	  this.rememberUpgrade = opts.rememberUpgrade || false;
	  this.binaryType = null;
	  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
	  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

	  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
	  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
	    this.perMessageDeflate.threshold = 1024;
	  }

	  // SSL options for Node.js client
	  this.pfx = opts.pfx || null;
	  this.key = opts.key || null;
	  this.passphrase = opts.passphrase || null;
	  this.cert = opts.cert || null;
	  this.ca = opts.ca || null;
	  this.ciphers = opts.ciphers || null;
	  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? null : opts.rejectUnauthorized;

	  // other options for Node.js client
	  var freeGlobal = typeof global == 'object' && global;
	  if (freeGlobal.global === freeGlobal) {
	    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
	      this.extraHeaders = opts.extraHeaders;
	    }
	  }

	  this.open();
	}

	Socket.priorWebsocketSuccess = false;

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Socket.prototype);

	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	Socket.protocol = parser.protocol; // this is an int

	/**
	 * Expose deps for legacy compatibility
	 * and standalone browser access.
	 */

	Socket.Socket = Socket;
	Socket.Transport = __webpack_require__(89);
	Socket.transports = __webpack_require__(84);
	Socket.parser = __webpack_require__(90);

	/**
	 * Creates transport of the given type.
	 *
	 * @param {String} transport name
	 * @return {Transport}
	 * @api private
	 */

	Socket.prototype.createTransport = function (name) {
	  debug('creating transport "%s"', name);
	  var query = clone(this.query);

	  // append engine.io protocol identifier
	  query.EIO = parser.protocol;

	  // transport name
	  query.transport = name;

	  // session id if we already have one
	  if (this.id) query.sid = this.id;

	  var transport = new transports[name]({
	    agent: this.agent,
	    hostname: this.hostname,
	    port: this.port,
	    secure: this.secure,
	    path: this.path,
	    query: query,
	    forceJSONP: this.forceJSONP,
	    jsonp: this.jsonp,
	    forceBase64: this.forceBase64,
	    enablesXDR: this.enablesXDR,
	    timestampRequests: this.timestampRequests,
	    timestampParam: this.timestampParam,
	    policyPort: this.policyPort,
	    socket: this,
	    pfx: this.pfx,
	    key: this.key,
	    passphrase: this.passphrase,
	    cert: this.cert,
	    ca: this.ca,
	    ciphers: this.ciphers,
	    rejectUnauthorized: this.rejectUnauthorized,
	    perMessageDeflate: this.perMessageDeflate,
	    extraHeaders: this.extraHeaders
	  });

	  return transport;
	};

	function clone (obj) {
	  var o = {};
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      o[i] = obj[i];
	    }
	  }
	  return o;
	}

	/**
	 * Initializes transport to use and starts probe.
	 *
	 * @api private
	 */
	Socket.prototype.open = function () {
	  var transport;
	  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1) {
	    transport = 'websocket';
	  } else if (0 === this.transports.length) {
	    // Emit error on next tick so it can be listened to
	    var self = this;
	    setTimeout(function() {
	      self.emit('error', 'No transports available');
	    }, 0);
	    return;
	  } else {
	    transport = this.transports[0];
	  }
	  this.readyState = 'opening';

	  // Retry with the next transport if the transport is disabled (jsonp: false)
	  try {
	    transport = this.createTransport(transport);
	  } catch (e) {
	    this.transports.shift();
	    this.open();
	    return;
	  }

	  transport.open();
	  this.setTransport(transport);
	};

	/**
	 * Sets the current transport. Disables the existing one (if any).
	 *
	 * @api private
	 */

	Socket.prototype.setTransport = function(transport){
	  debug('setting transport %s', transport.name);
	  var self = this;

	  if (this.transport) {
	    debug('clearing existing transport %s', this.transport.name);
	    this.transport.removeAllListeners();
	  }

	  // set up transport
	  this.transport = transport;

	  // set up transport listeners
	  transport
	  .on('drain', function(){
	    self.onDrain();
	  })
	  .on('packet', function(packet){
	    self.onPacket(packet);
	  })
	  .on('error', function(e){
	    self.onError(e);
	  })
	  .on('close', function(){
	    self.onClose('transport close');
	  });
	};

	/**
	 * Probes a transport.
	 *
	 * @param {String} transport name
	 * @api private
	 */

	Socket.prototype.probe = function (name) {
	  debug('probing transport "%s"', name);
	  var transport = this.createTransport(name, { probe: 1 })
	    , failed = false
	    , self = this;

	  Socket.priorWebsocketSuccess = false;

	  function onTransportOpen(){
	    if (self.onlyBinaryUpgrades) {
	      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
	      failed = failed || upgradeLosesBinary;
	    }
	    if (failed) return;

	    debug('probe transport "%s" opened', name);
	    transport.send([{ type: 'ping', data: 'probe' }]);
	    transport.once('packet', function (msg) {
	      if (failed) return;
	      if ('pong' == msg.type && 'probe' == msg.data) {
	        debug('probe transport "%s" pong', name);
	        self.upgrading = true;
	        self.emit('upgrading', transport);
	        if (!transport) return;
	        Socket.priorWebsocketSuccess = 'websocket' == transport.name;

	        debug('pausing current transport "%s"', self.transport.name);
	        self.transport.pause(function () {
	          if (failed) return;
	          if ('closed' == self.readyState) return;
	          debug('changing transport and sending upgrade packet');

	          cleanup();

	          self.setTransport(transport);
	          transport.send([{ type: 'upgrade' }]);
	          self.emit('upgrade', transport);
	          transport = null;
	          self.upgrading = false;
	          self.flush();
	        });
	      } else {
	        debug('probe transport "%s" failed', name);
	        var err = new Error('probe error');
	        err.transport = transport.name;
	        self.emit('upgradeError', err);
	      }
	    });
	  }

	  function freezeTransport() {
	    if (failed) return;

	    // Any callback called by transport should be ignored since now
	    failed = true;

	    cleanup();

	    transport.close();
	    transport = null;
	  }

	  //Handle any error that happens while probing
	  function onerror(err) {
	    var error = new Error('probe error: ' + err);
	    error.transport = transport.name;

	    freezeTransport();

	    debug('probe transport "%s" failed because of error: %s', name, err);

	    self.emit('upgradeError', error);
	  }

	  function onTransportClose(){
	    onerror("transport closed");
	  }

	  //When the socket is closed while we're probing
	  function onclose(){
	    onerror("socket closed");
	  }

	  //When the socket is upgraded while we're probing
	  function onupgrade(to){
	    if (transport && to.name != transport.name) {
	      debug('"%s" works - aborting "%s"', to.name, transport.name);
	      freezeTransport();
	    }
	  }

	  //Remove all listeners on the transport and on self
	  function cleanup(){
	    transport.removeListener('open', onTransportOpen);
	    transport.removeListener('error', onerror);
	    transport.removeListener('close', onTransportClose);
	    self.removeListener('close', onclose);
	    self.removeListener('upgrading', onupgrade);
	  }

	  transport.once('open', onTransportOpen);
	  transport.once('error', onerror);
	  transport.once('close', onTransportClose);

	  this.once('close', onclose);
	  this.once('upgrading', onupgrade);

	  transport.open();

	};

	/**
	 * Called when connection is deemed open.
	 *
	 * @api public
	 */

	Socket.prototype.onOpen = function () {
	  debug('socket open');
	  this.readyState = 'open';
	  Socket.priorWebsocketSuccess = 'websocket' == this.transport.name;
	  this.emit('open');
	  this.flush();

	  // we check for `readyState` in case an `open`
	  // listener already closed the socket
	  if ('open' == this.readyState && this.upgrade && this.transport.pause) {
	    debug('starting upgrade probes');
	    for (var i = 0, l = this.upgrades.length; i < l; i++) {
	      this.probe(this.upgrades[i]);
	    }
	  }
	};

	/**
	 * Handles a packet.
	 *
	 * @api private
	 */

	Socket.prototype.onPacket = function (packet) {
	  if ('opening' == this.readyState || 'open' == this.readyState) {
	    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

	    this.emit('packet', packet);

	    // Socket is live - any packet counts
	    this.emit('heartbeat');

	    switch (packet.type) {
	      case 'open':
	        this.onHandshake(parsejson(packet.data));
	        break;

	      case 'pong':
	        this.setPing();
	        this.emit('pong');
	        break;

	      case 'error':
	        var err = new Error('server error');
	        err.code = packet.data;
	        this.onError(err);
	        break;

	      case 'message':
	        this.emit('data', packet.data);
	        this.emit('message', packet.data);
	        break;
	    }
	  } else {
	    debug('packet received with socket readyState "%s"', this.readyState);
	  }
	};

	/**
	 * Called upon handshake completion.
	 *
	 * @param {Object} handshake obj
	 * @api private
	 */

	Socket.prototype.onHandshake = function (data) {
	  this.emit('handshake', data);
	  this.id = data.sid;
	  this.transport.query.sid = data.sid;
	  this.upgrades = this.filterUpgrades(data.upgrades);
	  this.pingInterval = data.pingInterval;
	  this.pingTimeout = data.pingTimeout;
	  this.onOpen();
	  // In case open handler closes socket
	  if  ('closed' == this.readyState) return;
	  this.setPing();

	  // Prolong liveness of socket on heartbeat
	  this.removeListener('heartbeat', this.onHeartbeat);
	  this.on('heartbeat', this.onHeartbeat);
	};

	/**
	 * Resets ping timeout.
	 *
	 * @api private
	 */

	Socket.prototype.onHeartbeat = function (timeout) {
	  clearTimeout(this.pingTimeoutTimer);
	  var self = this;
	  self.pingTimeoutTimer = setTimeout(function () {
	    if ('closed' == self.readyState) return;
	    self.onClose('ping timeout');
	  }, timeout || (self.pingInterval + self.pingTimeout));
	};

	/**
	 * Pings server every `this.pingInterval` and expects response
	 * within `this.pingTimeout` or closes connection.
	 *
	 * @api private
	 */

	Socket.prototype.setPing = function () {
	  var self = this;
	  clearTimeout(self.pingIntervalTimer);
	  self.pingIntervalTimer = setTimeout(function () {
	    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
	    self.ping();
	    self.onHeartbeat(self.pingTimeout);
	  }, self.pingInterval);
	};

	/**
	* Sends a ping packet.
	*
	* @api private
	*/

	Socket.prototype.ping = function () {
	  var self = this;
	  this.sendPacket('ping', function(){
	    self.emit('ping');
	  });
	};

	/**
	 * Called on `drain` event
	 *
	 * @api private
	 */

	Socket.prototype.onDrain = function() {
	  this.writeBuffer.splice(0, this.prevBufferLen);

	  // setting prevBufferLen = 0 is very important
	  // for example, when upgrading, upgrade packet is sent over,
	  // and a nonzero prevBufferLen could cause problems on `drain`
	  this.prevBufferLen = 0;

	  if (0 === this.writeBuffer.length) {
	    this.emit('drain');
	  } else {
	    this.flush();
	  }
	};

	/**
	 * Flush write buffers.
	 *
	 * @api private
	 */

	Socket.prototype.flush = function () {
	  if ('closed' != this.readyState && this.transport.writable &&
	    !this.upgrading && this.writeBuffer.length) {
	    debug('flushing %d packets in socket', this.writeBuffer.length);
	    this.transport.send(this.writeBuffer);
	    // keep track of current length of writeBuffer
	    // splice writeBuffer and callbackBuffer on `drain`
	    this.prevBufferLen = this.writeBuffer.length;
	    this.emit('flush');
	  }
	};

	/**
	 * Sends a message.
	 *
	 * @param {String} message.
	 * @param {Function} callback function.
	 * @param {Object} options.
	 * @return {Socket} for chaining.
	 * @api public
	 */

	Socket.prototype.write =
	Socket.prototype.send = function (msg, options, fn) {
	  this.sendPacket('message', msg, options, fn);
	  return this;
	};

	/**
	 * Sends a packet.
	 *
	 * @param {String} packet type.
	 * @param {String} data.
	 * @param {Object} options.
	 * @param {Function} callback function.
	 * @api private
	 */

	Socket.prototype.sendPacket = function (type, data, options, fn) {
	  if('function' == typeof data) {
	    fn = data;
	    data = undefined;
	  }

	  if ('function' == typeof options) {
	    fn = options;
	    options = null;
	  }

	  if ('closing' == this.readyState || 'closed' == this.readyState) {
	    return;
	  }

	  options = options || {};
	  options.compress = false !== options.compress;

	  var packet = {
	    type: type,
	    data: data,
	    options: options
	  };
	  this.emit('packetCreate', packet);
	  this.writeBuffer.push(packet);
	  if (fn) this.once('flush', fn);
	  this.flush();
	};

	/**
	 * Closes the connection.
	 *
	 * @api private
	 */

	Socket.prototype.close = function () {
	  if ('opening' == this.readyState || 'open' == this.readyState) {
	    this.readyState = 'closing';

	    var self = this;

	    if (this.writeBuffer.length) {
	      this.once('drain', function() {
	        if (this.upgrading) {
	          waitForUpgrade();
	        } else {
	          close();
	        }
	      });
	    } else if (this.upgrading) {
	      waitForUpgrade();
	    } else {
	      close();
	    }
	  }

	  function close() {
	    self.onClose('forced close');
	    debug('socket closing - telling transport to close');
	    self.transport.close();
	  }

	  function cleanupAndClose() {
	    self.removeListener('upgrade', cleanupAndClose);
	    self.removeListener('upgradeError', cleanupAndClose);
	    close();
	  }

	  function waitForUpgrade() {
	    // wait for upgrade to finish since we can't send packets while pausing a transport
	    self.once('upgrade', cleanupAndClose);
	    self.once('upgradeError', cleanupAndClose);
	  }

	  return this;
	};

	/**
	 * Called upon transport error
	 *
	 * @api private
	 */

	Socket.prototype.onError = function (err) {
	  debug('socket error %j', err);
	  Socket.priorWebsocketSuccess = false;
	  this.emit('error', err);
	  this.onClose('transport error', err);
	};

	/**
	 * Called upon transport close.
	 *
	 * @api private
	 */

	Socket.prototype.onClose = function (reason, desc) {
	  if ('opening' == this.readyState || 'open' == this.readyState || 'closing' == this.readyState) {
	    debug('socket close with reason: "%s"', reason);
	    var self = this;

	    // clear timers
	    clearTimeout(this.pingIntervalTimer);
	    clearTimeout(this.pingTimeoutTimer);

	    // stop event from firing again for transport
	    this.transport.removeAllListeners('close');

	    // ensure transport won't stay open
	    this.transport.close();

	    // ignore further transport communication
	    this.transport.removeAllListeners();

	    // set ready state
	    this.readyState = 'closed';

	    // clear session id
	    this.id = null;

	    // emit close event
	    this.emit('close', reason, desc);

	    // clean buffers after, so users can still
	    // grab the buffers on `close` event
	    self.writeBuffer = [];
	    self.prevBufferLen = 0;
	  }
	};

	/**
	 * Filters upgrades, returning only those matching client transports.
	 *
	 * @param {Array} server upgrades
	 * @api private
	 *
	 */

	Socket.prototype.filterUpgrades = function (upgrades) {
	  var filteredUpgrades = [];
	  for (var i = 0, j = upgrades.length; i<j; i++) {
	    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
	  }
	  return filteredUpgrades;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies
	 */

	var XMLHttpRequest = __webpack_require__(85);
	var XHR = __webpack_require__(87);
	var JSONP = __webpack_require__(107);
	var websocket = __webpack_require__(108);

	/**
	 * Export transports.
	 */

	exports.polling = polling;
	exports.websocket = websocket;

	/**
	 * Polling transport polymorphic constructor.
	 * Decides on xhr vs jsonp based on feature detection.
	 *
	 * @api private
	 */

	function polling(opts){
	  var xhr;
	  var xd = false;
	  var xs = false;
	  var jsonp = false !== opts.jsonp;

	  if (global.location) {
	    var isSSL = 'https:' == location.protocol;
	    var port = location.port;

	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }

	    xd = opts.hostname != location.hostname || port != opts.port;
	    xs = opts.secure != isSSL;
	  }

	  opts.xdomain = xd;
	  opts.xscheme = xs;
	  xhr = new XMLHttpRequest(opts);

	  if ('open' in xhr && !opts.forceJSONP) {
	    return new XHR(opts);
	  } else {
	    if (!jsonp) throw new Error('JSONP disabled');
	    return new JSONP(opts);
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// browser shim for xmlhttprequest module
	var hasCORS = __webpack_require__(86);

	module.exports = function(opts) {
	  var xdomain = opts.xdomain;

	  // scheme must be same when usign XDomainRequest
	  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
	  var xscheme = opts.xscheme;

	  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
	  // https://github.com/Automattic/engine.io-client/pull/217
	  var enablesXDR = opts.enablesXDR;

	  // XMLHttpRequest can be disabled on IE
	  try {
	    if ('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
	      return new XMLHttpRequest();
	    }
	  } catch (e) { }

	  // Use XDomainRequest for IE8 if enablesXDR is true
	  // because loading bar keeps flashing when using jsonp-polling
	  // https://github.com/yujiosaka/socke.io-ie8-loading-example
	  try {
	    if ('undefined' != typeof XDomainRequest && !xscheme && enablesXDR) {
	      return new XDomainRequest();
	    }
	  } catch (e) { }

	  if (!xdomain) {
	    try {
	      return new ActiveXObject('Microsoft.XMLHTTP');
	    } catch(e) { }
	  }
	}


/***/ },
/* 86 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 *
	 * Logic borrowed from Modernizr:
	 *
	 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
	 */

	try {
	  module.exports = typeof XMLHttpRequest !== 'undefined' &&
	    'withCredentials' in new XMLHttpRequest();
	} catch (err) {
	  // if XMLHttp support is disabled in IE then it will throw
	  // when trying to create
	  module.exports = false;
	}


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module requirements.
	 */

	var XMLHttpRequest = __webpack_require__(85);
	var Polling = __webpack_require__(88);
	var Emitter = __webpack_require__(100);
	var inherit = __webpack_require__(102);
	var debug = __webpack_require__(104)('engine.io-client:polling-xhr');

	/**
	 * Module exports.
	 */

	module.exports = XHR;
	module.exports.Request = Request;

	/**
	 * Empty function
	 */

	function empty(){}

	/**
	 * XHR Polling constructor.
	 *
	 * @param {Object} opts
	 * @api public
	 */

	function XHR(opts){
	  Polling.call(this, opts);

	  if (global.location) {
	    var isSSL = 'https:' == location.protocol;
	    var port = location.port;

	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }

	    this.xd = opts.hostname != global.location.hostname ||
	      port != opts.port;
	    this.xs = opts.secure != isSSL;
	  } else {
	    this.extraHeaders = opts.extraHeaders;
	  }
	}

	/**
	 * Inherits from Polling.
	 */

	inherit(XHR, Polling);

	/**
	 * XHR supports binary
	 */

	XHR.prototype.supportsBinary = true;

	/**
	 * Creates a request.
	 *
	 * @param {String} method
	 * @api private
	 */

	XHR.prototype.request = function(opts){
	  opts = opts || {};
	  opts.uri = this.uri();
	  opts.xd = this.xd;
	  opts.xs = this.xs;
	  opts.agent = this.agent || false;
	  opts.supportsBinary = this.supportsBinary;
	  opts.enablesXDR = this.enablesXDR;

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;

	  // other options for Node.js client
	  opts.extraHeaders = this.extraHeaders;

	  return new Request(opts);
	};

	/**
	 * Sends data.
	 *
	 * @param {String} data to send.
	 * @param {Function} called upon flush.
	 * @api private
	 */

	XHR.prototype.doWrite = function(data, fn){
	  var isBinary = typeof data !== 'string' && data !== undefined;
	  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
	  var self = this;
	  req.on('success', fn);
	  req.on('error', function(err){
	    self.onError('xhr post error', err);
	  });
	  this.sendXhr = req;
	};

	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */

	XHR.prototype.doPoll = function(){
	  debug('xhr poll');
	  var req = this.request();
	  var self = this;
	  req.on('data', function(data){
	    self.onData(data);
	  });
	  req.on('error', function(err){
	    self.onError('xhr poll error', err);
	  });
	  this.pollXhr = req;
	};

	/**
	 * Request constructor
	 *
	 * @param {Object} options
	 * @api public
	 */

	function Request(opts){
	  this.method = opts.method || 'GET';
	  this.uri = opts.uri;
	  this.xd = !!opts.xd;
	  this.xs = !!opts.xs;
	  this.async = false !== opts.async;
	  this.data = undefined != opts.data ? opts.data : null;
	  this.agent = opts.agent;
	  this.isBinary = opts.isBinary;
	  this.supportsBinary = opts.supportsBinary;
	  this.enablesXDR = opts.enablesXDR;

	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;

	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;

	  this.create();
	}

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Request.prototype);

	/**
	 * Creates the XHR object and sends the request.
	 *
	 * @api private
	 */

	Request.prototype.create = function(){
	  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;

	  var xhr = this.xhr = new XMLHttpRequest(opts);
	  var self = this;

	  try {
	    debug('xhr open %s: %s', this.method, this.uri);
	    xhr.open(this.method, this.uri, this.async);
	    try {
	      if (this.extraHeaders) {
	        xhr.setDisableHeaderCheck(true);
	        for (var i in this.extraHeaders) {
	          if (this.extraHeaders.hasOwnProperty(i)) {
	            xhr.setRequestHeader(i, this.extraHeaders[i]);
	          }
	        }
	      }
	    } catch (e) {}
	    if (this.supportsBinary) {
	      // This has to be done after open because Firefox is stupid
	      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
	      xhr.responseType = 'arraybuffer';
	    }

	    if ('POST' == this.method) {
	      try {
	        if (this.isBinary) {
	          xhr.setRequestHeader('Content-type', 'application/octet-stream');
	        } else {
	          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
	        }
	      } catch (e) {}
	    }

	    // ie6 check
	    if ('withCredentials' in xhr) {
	      xhr.withCredentials = true;
	    }

	    if (this.hasXDR()) {
	      xhr.onload = function(){
	        self.onLoad();
	      };
	      xhr.onerror = function(){
	        self.onError(xhr.responseText);
	      };
	    } else {
	      xhr.onreadystatechange = function(){
	        if (4 != xhr.readyState) return;
	        if (200 == xhr.status || 1223 == xhr.status) {
	          self.onLoad();
	        } else {
	          // make sure the `error` event handler that's user-set
	          // does not throw in the same tick and gets caught here
	          setTimeout(function(){
	            self.onError(xhr.status);
	          }, 0);
	        }
	      };
	    }

	    debug('xhr data %s', this.data);
	    xhr.send(this.data);
	  } catch (e) {
	    // Need to defer since .create() is called directly fhrom the constructor
	    // and thus the 'error' event can only be only bound *after* this exception
	    // occurs.  Therefore, also, we cannot throw here at all.
	    setTimeout(function() {
	      self.onError(e);
	    }, 0);
	    return;
	  }

	  if (global.document) {
	    this.index = Request.requestsCount++;
	    Request.requests[this.index] = this;
	  }
	};

	/**
	 * Called upon successful response.
	 *
	 * @api private
	 */

	Request.prototype.onSuccess = function(){
	  this.emit('success');
	  this.cleanup();
	};

	/**
	 * Called if we have data.
	 *
	 * @api private
	 */

	Request.prototype.onData = function(data){
	  this.emit('data', data);
	  this.onSuccess();
	};

	/**
	 * Called upon error.
	 *
	 * @api private
	 */

	Request.prototype.onError = function(err){
	  this.emit('error', err);
	  this.cleanup(true);
	};

	/**
	 * Cleans up house.
	 *
	 * @api private
	 */

	Request.prototype.cleanup = function(fromError){
	  if ('undefined' == typeof this.xhr || null === this.xhr) {
	    return;
	  }
	  // xmlhttprequest
	  if (this.hasXDR()) {
	    this.xhr.onload = this.xhr.onerror = empty;
	  } else {
	    this.xhr.onreadystatechange = empty;
	  }

	  if (fromError) {
	    try {
	      this.xhr.abort();
	    } catch(e) {}
	  }

	  if (global.document) {
	    delete Request.requests[this.index];
	  }

	  this.xhr = null;
	};

	/**
	 * Called upon load.
	 *
	 * @api private
	 */

	Request.prototype.onLoad = function(){
	  var data;
	  try {
	    var contentType;
	    try {
	      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
	    } catch (e) {}
	    if (contentType === 'application/octet-stream') {
	      data = this.xhr.response;
	    } else {
	      if (!this.supportsBinary) {
	        data = this.xhr.responseText;
	      } else {
	        try {
	          data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
	        } catch (e) {
	          var ui8Arr = new Uint8Array(this.xhr.response);
	          var dataArray = [];
	          for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
	            dataArray.push(ui8Arr[idx]);
	          }

	          data = String.fromCharCode.apply(null, dataArray);
	        }
	      }
	    }
	  } catch (e) {
	    this.onError(e);
	  }
	  if (null != data) {
	    this.onData(data);
	  }
	};

	/**
	 * Check if it has XDomainRequest.
	 *
	 * @api private
	 */

	Request.prototype.hasXDR = function(){
	  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
	};

	/**
	 * Aborts the request.
	 *
	 * @api public
	 */

	Request.prototype.abort = function(){
	  this.cleanup();
	};

	/**
	 * Aborts pending requests when unloading the window. This is needed to prevent
	 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
	 * emitted.
	 */

	if (global.document) {
	  Request.requestsCount = 0;
	  Request.requests = {};
	  if (global.attachEvent) {
	    global.attachEvent('onunload', unloadHandler);
	  } else if (global.addEventListener) {
	    global.addEventListener('beforeunload', unloadHandler, false);
	  }
	}

	function unloadHandler() {
	  for (var i in Request.requests) {
	    if (Request.requests.hasOwnProperty(i)) {
	      Request.requests[i].abort();
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Transport = __webpack_require__(89);
	var parseqs = __webpack_require__(101);
	var parser = __webpack_require__(90);
	var inherit = __webpack_require__(102);
	var yeast = __webpack_require__(103);
	var debug = __webpack_require__(104)('engine.io-client:polling');

	/**
	 * Module exports.
	 */

	module.exports = Polling;

	/**
	 * Is XHR2 supported?
	 */

	var hasXHR2 = (function() {
	  var XMLHttpRequest = __webpack_require__(85);
	  var xhr = new XMLHttpRequest({ xdomain: false });
	  return null != xhr.responseType;
	})();

	/**
	 * Polling interface.
	 *
	 * @param {Object} opts
	 * @api private
	 */

	function Polling(opts){
	  var forceBase64 = (opts && opts.forceBase64);
	  if (!hasXHR2 || forceBase64) {
	    this.supportsBinary = false;
	  }
	  Transport.call(this, opts);
	}

	/**
	 * Inherits from Transport.
	 */

	inherit(Polling, Transport);

	/**
	 * Transport name.
	 */

	Polling.prototype.name = 'polling';

	/**
	 * Opens the socket (triggers polling). We write a PING message to determine
	 * when the transport is open.
	 *
	 * @api private
	 */

	Polling.prototype.doOpen = function(){
	  this.poll();
	};

	/**
	 * Pauses polling.
	 *
	 * @param {Function} callback upon buffers are flushed and transport is paused
	 * @api private
	 */

	Polling.prototype.pause = function(onPause){
	  var pending = 0;
	  var self = this;

	  this.readyState = 'pausing';

	  function pause(){
	    debug('paused');
	    self.readyState = 'paused';
	    onPause();
	  }

	  if (this.polling || !this.writable) {
	    var total = 0;

	    if (this.polling) {
	      debug('we are currently polling - waiting to pause');
	      total++;
	      this.once('pollComplete', function(){
	        debug('pre-pause polling complete');
	        --total || pause();
	      });
	    }

	    if (!this.writable) {
	      debug('we are currently writing - waiting to pause');
	      total++;
	      this.once('drain', function(){
	        debug('pre-pause writing complete');
	        --total || pause();
	      });
	    }
	  } else {
	    pause();
	  }
	};

	/**
	 * Starts polling cycle.
	 *
	 * @api public
	 */

	Polling.prototype.poll = function(){
	  debug('polling');
	  this.polling = true;
	  this.doPoll();
	  this.emit('poll');
	};

	/**
	 * Overloads onData to detect payloads.
	 *
	 * @api private
	 */

	Polling.prototype.onData = function(data){
	  var self = this;
	  debug('polling got data %s', data);
	  var callback = function(packet, index, total) {
	    // if its the first message we consider the transport open
	    if ('opening' == self.readyState) {
	      self.onOpen();
	    }

	    // if its a close packet, we close the ongoing requests
	    if ('close' == packet.type) {
	      self.onClose();
	      return false;
	    }

	    // otherwise bypass onData and handle the message
	    self.onPacket(packet);
	  };

	  // decode payload
	  parser.decodePayload(data, this.socket.binaryType, callback);

	  // if an event did not trigger closing
	  if ('closed' != this.readyState) {
	    // if we got data we're not polling
	    this.polling = false;
	    this.emit('pollComplete');

	    if ('open' == this.readyState) {
	      this.poll();
	    } else {
	      debug('ignoring poll - transport state "%s"', this.readyState);
	    }
	  }
	};

	/**
	 * For polling, send a close packet.
	 *
	 * @api private
	 */

	Polling.prototype.doClose = function(){
	  var self = this;

	  function close(){
	    debug('writing close packet');
	    self.write([{ type: 'close' }]);
	  }

	  if ('open' == this.readyState) {
	    debug('transport open - closing');
	    close();
	  } else {
	    // in case we're trying to close while
	    // handshaking is in progress (GH-164)
	    debug('transport not open - deferring close');
	    this.once('open', close);
	  }
	};

	/**
	 * Writes a packets payload.
	 *
	 * @param {Array} data packets
	 * @param {Function} drain callback
	 * @api private
	 */

	Polling.prototype.write = function(packets){
	  var self = this;
	  this.writable = false;
	  var callbackfn = function() {
	    self.writable = true;
	    self.emit('drain');
	  };

	  var self = this;
	  parser.encodePayload(packets, this.supportsBinary, function(data) {
	    self.doWrite(data, callbackfn);
	  });
	};

	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */

	Polling.prototype.uri = function(){
	  var query = this.query || {};
	  var schema = this.secure ? 'https' : 'http';
	  var port = '';

	  // cache busting is forced
	  if (false !== this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }

	  if (!this.supportsBinary && !query.sid) {
	    query.b64 = 1;
	  }

	  query = parseqs.encode(query);

	  // avoid port if default for schema
	  if (this.port && (('https' == schema && this.port != 443) ||
	     ('http' == schema && this.port != 80))) {
	    port = ':' + this.port;
	  }

	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }

	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var parser = __webpack_require__(90);
	var Emitter = __webpack_require__(100);

	/**
	 * Module exports.
	 */

	module.exports = Transport;

	/**
	 * Transport abstract constructor.
	 *
	 * @param {Object} options.
	 * @api private
	 */

	function Transport (opts) {
	  this.path = opts.path;
	  this.hostname = opts.hostname;
	  this.port = opts.port;
	  this.secure = opts.secure;
	  this.query = opts.query;
	  this.timestampParam = opts.timestampParam;
	  this.timestampRequests = opts.timestampRequests;
	  this.readyState = '';
	  this.agent = opts.agent || false;
	  this.socket = opts.socket;
	  this.enablesXDR = opts.enablesXDR;

	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;

	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;
	}

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Transport.prototype);

	/**
	 * Emits an error.
	 *
	 * @param {String} str
	 * @return {Transport} for chaining
	 * @api public
	 */

	Transport.prototype.onError = function (msg, desc) {
	  var err = new Error(msg);
	  err.type = 'TransportError';
	  err.description = desc;
	  this.emit('error', err);
	  return this;
	};

	/**
	 * Opens the transport.
	 *
	 * @api public
	 */

	Transport.prototype.open = function () {
	  if ('closed' == this.readyState || '' == this.readyState) {
	    this.readyState = 'opening';
	    this.doOpen();
	  }

	  return this;
	};

	/**
	 * Closes the transport.
	 *
	 * @api private
	 */

	Transport.prototype.close = function () {
	  if ('opening' == this.readyState || 'open' == this.readyState) {
	    this.doClose();
	    this.onClose();
	  }

	  return this;
	};

	/**
	 * Sends multiple packets.
	 *
	 * @param {Array} packets
	 * @api private
	 */

	Transport.prototype.send = function(packets){
	  if ('open' == this.readyState) {
	    this.write(packets);
	  } else {
	    throw new Error('Transport not open');
	  }
	};

	/**
	 * Called upon open
	 *
	 * @api private
	 */

	Transport.prototype.onOpen = function () {
	  this.readyState = 'open';
	  this.writable = true;
	  this.emit('open');
	};

	/**
	 * Called with data.
	 *
	 * @param {String} data
	 * @api private
	 */

	Transport.prototype.onData = function(data){
	  var packet = parser.decodePacket(data, this.socket.binaryType);
	  this.onPacket(packet);
	};

	/**
	 * Called with a decoded packet.
	 */

	Transport.prototype.onPacket = function (packet) {
	  this.emit('packet', packet);
	};

	/**
	 * Called upon close.
	 *
	 * @api private
	 */

	Transport.prototype.onClose = function () {
	  this.readyState = 'closed';
	  this.emit('close');
	};


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */

	var keys = __webpack_require__(91);
	var hasBinary = __webpack_require__(92);
	var sliceBuffer = __webpack_require__(94);
	var base64encoder = __webpack_require__(95);
	var after = __webpack_require__(96);
	var utf8 = __webpack_require__(97);

	/**
	 * Check if we are running an android browser. That requires us to use
	 * ArrayBuffer with polling transports...
	 *
	 * http://ghinda.net/jpeg-blob-ajax-android/
	 */

	var isAndroid = navigator.userAgent.match(/Android/i);

	/**
	 * Check if we are running in PhantomJS.
	 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
	 * https://github.com/ariya/phantomjs/issues/11395
	 * @type boolean
	 */
	var isPhantomJS = /PhantomJS/i.test(navigator.userAgent);

	/**
	 * When true, avoids using Blobs to encode payloads.
	 * @type boolean
	 */
	var dontSendBlobs = isAndroid || isPhantomJS;

	/**
	 * Current protocol version.
	 */

	exports.protocol = 3;

	/**
	 * Packet types.
	 */

	var packets = exports.packets = {
	    open:     0    // non-ws
	  , close:    1    // non-ws
	  , ping:     2
	  , pong:     3
	  , message:  4
	  , upgrade:  5
	  , noop:     6
	};

	var packetslist = keys(packets);

	/**
	 * Premade error packet.
	 */

	var err = { type: 'error', data: 'parser error' };

	/**
	 * Create a blob api even for blob builder when vendor prefixes exist
	 */

	var Blob = __webpack_require__(99);

	/**
	 * Encodes a packet.
	 *
	 *     <packet type id> [ <data> ]
	 *
	 * Example:
	 *
	 *     5hello world
	 *     3
	 *     4
	 *
	 * Binary is encoded in an identical principle
	 *
	 * @api private
	 */

	exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
	  if ('function' == typeof supportsBinary) {
	    callback = supportsBinary;
	    supportsBinary = false;
	  }

	  if ('function' == typeof utf8encode) {
	    callback = utf8encode;
	    utf8encode = null;
	  }

	  var data = (packet.data === undefined)
	    ? undefined
	    : packet.data.buffer || packet.data;

	  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
	    return encodeArrayBuffer(packet, supportsBinary, callback);
	  } else if (Blob && data instanceof global.Blob) {
	    return encodeBlob(packet, supportsBinary, callback);
	  }

	  // might be an object with { base64: true, data: dataAsBase64String }
	  if (data && data.base64) {
	    return encodeBase64Object(packet, callback);
	  }

	  // Sending data as a utf-8 string
	  var encoded = packets[packet.type];

	  // data fragment is optional
	  if (undefined !== packet.data) {
	    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
	  }

	  return callback('' + encoded);

	};

	function encodeBase64Object(packet, callback) {
	  // packet data is an object { base64: true, data: dataAsBase64String }
	  var message = 'b' + exports.packets[packet.type] + packet.data.data;
	  return callback(message);
	}

	/**
	 * Encode packet helpers for binary types
	 */

	function encodeArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  var data = packet.data;
	  var contentArray = new Uint8Array(data);
	  var resultBuffer = new Uint8Array(1 + data.byteLength);

	  resultBuffer[0] = packets[packet.type];
	  for (var i = 0; i < contentArray.length; i++) {
	    resultBuffer[i+1] = contentArray[i];
	  }

	  return callback(resultBuffer.buffer);
	}

	function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  var fr = new FileReader();
	  fr.onload = function() {
	    packet.data = fr.result;
	    exports.encodePacket(packet, supportsBinary, true, callback);
	  };
	  return fr.readAsArrayBuffer(packet.data);
	}

	function encodeBlob(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  if (dontSendBlobs) {
	    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
	  }

	  var length = new Uint8Array(1);
	  length[0] = packets[packet.type];
	  var blob = new Blob([length.buffer, packet.data]);

	  return callback(blob);
	}

	/**
	 * Encodes a packet with binary data in a base64 string
	 *
	 * @param {Object} packet, has `type` and `data`
	 * @return {String} base64 encoded message
	 */

	exports.encodeBase64Packet = function(packet, callback) {
	  var message = 'b' + exports.packets[packet.type];
	  if (Blob && packet.data instanceof global.Blob) {
	    var fr = new FileReader();
	    fr.onload = function() {
	      var b64 = fr.result.split(',')[1];
	      callback(message + b64);
	    };
	    return fr.readAsDataURL(packet.data);
	  }

	  var b64data;
	  try {
	    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
	  } catch (e) {
	    // iPhone Safari doesn't let you apply with typed arrays
	    var typed = new Uint8Array(packet.data);
	    var basic = new Array(typed.length);
	    for (var i = 0; i < typed.length; i++) {
	      basic[i] = typed[i];
	    }
	    b64data = String.fromCharCode.apply(null, basic);
	  }
	  message += global.btoa(b64data);
	  return callback(message);
	};

	/**
	 * Decodes a packet. Changes format to Blob if requested.
	 *
	 * @return {Object} with `type` and `data` (if any)
	 * @api private
	 */

	exports.decodePacket = function (data, binaryType, utf8decode) {
	  // String data
	  if (typeof data == 'string' || data === undefined) {
	    if (data.charAt(0) == 'b') {
	      return exports.decodeBase64Packet(data.substr(1), binaryType);
	    }

	    if (utf8decode) {
	      try {
	        data = utf8.decode(data);
	      } catch (e) {
	        return err;
	      }
	    }
	    var type = data.charAt(0);

	    if (Number(type) != type || !packetslist[type]) {
	      return err;
	    }

	    if (data.length > 1) {
	      return { type: packetslist[type], data: data.substring(1) };
	    } else {
	      return { type: packetslist[type] };
	    }
	  }

	  var asArray = new Uint8Array(data);
	  var type = asArray[0];
	  var rest = sliceBuffer(data, 1);
	  if (Blob && binaryType === 'blob') {
	    rest = new Blob([rest]);
	  }
	  return { type: packetslist[type], data: rest };
	};

	/**
	 * Decodes a packet encoded in a base64 string
	 *
	 * @param {String} base64 encoded message
	 * @return {Object} with `type` and `data` (if any)
	 */

	exports.decodeBase64Packet = function(msg, binaryType) {
	  var type = packetslist[msg.charAt(0)];
	  if (!global.ArrayBuffer) {
	    return { type: type, data: { base64: true, data: msg.substr(1) } };
	  }

	  var data = base64encoder.decode(msg.substr(1));

	  if (binaryType === 'blob' && Blob) {
	    data = new Blob([data]);
	  }

	  return { type: type, data: data };
	};

	/**
	 * Encodes multiple messages (payload).
	 *
	 *     <length>:data
	 *
	 * Example:
	 *
	 *     11:hello world2:hi
	 *
	 * If any contents are binary, they will be encoded as base64 strings. Base64
	 * encoded strings are marked with a b before the length specifier
	 *
	 * @param {Array} packets
	 * @api private
	 */

	exports.encodePayload = function (packets, supportsBinary, callback) {
	  if (typeof supportsBinary == 'function') {
	    callback = supportsBinary;
	    supportsBinary = null;
	  }

	  var isBinary = hasBinary(packets);

	  if (supportsBinary && isBinary) {
	    if (Blob && !dontSendBlobs) {
	      return exports.encodePayloadAsBlob(packets, callback);
	    }

	    return exports.encodePayloadAsArrayBuffer(packets, callback);
	  }

	  if (!packets.length) {
	    return callback('0:');
	  }

	  function setLengthHeader(message) {
	    return message.length + ':' + message;
	  }

	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
	      doneCallback(null, setLengthHeader(message));
	    });
	  }

	  map(packets, encodeOne, function(err, results) {
	    return callback(results.join(''));
	  });
	};

	/**
	 * Async array map using after
	 */

	function map(ary, each, done) {
	  var result = new Array(ary.length);
	  var next = after(ary.length, done);

	  var eachWithIndex = function(i, el, cb) {
	    each(el, function(error, msg) {
	      result[i] = msg;
	      cb(error, result);
	    });
	  };

	  for (var i = 0; i < ary.length; i++) {
	    eachWithIndex(i, ary[i], next);
	  }
	}

	/*
	 * Decodes data when a payload is maybe expected. Possible binary contents are
	 * decoded from their base64 representation
	 *
	 * @param {String} data, callback method
	 * @api public
	 */

	exports.decodePayload = function (data, binaryType, callback) {
	  if (typeof data != 'string') {
	    return exports.decodePayloadAsBinary(data, binaryType, callback);
	  }

	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }

	  var packet;
	  if (data == '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }

	  var length = ''
	    , n, msg;

	  for (var i = 0, l = data.length; i < l; i++) {
	    var chr = data.charAt(i);

	    if (':' != chr) {
	      length += chr;
	    } else {
	      if ('' == length || (length != (n = Number(length)))) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }

	      msg = data.substr(i + 1, n);

	      if (length != msg.length) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }

	      if (msg.length) {
	        packet = exports.decodePacket(msg, binaryType, true);

	        if (err.type == packet.type && err.data == packet.data) {
	          // parser error in individual packet - ignoring payload
	          return callback(err, 0, 1);
	        }

	        var ret = callback(packet, i + n, l);
	        if (false === ret) return;
	      }

	      // advance cursor
	      i += n;
	      length = '';
	    }
	  }

	  if (length != '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }

	};

	/**
	 * Encodes multiple messages (payload) as binary.
	 *
	 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
	 * 255><data>
	 *
	 * Example:
	 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
	 *
	 * @param {Array} packets
	 * @return {ArrayBuffer} encoded payload
	 * @api private
	 */

	exports.encodePayloadAsArrayBuffer = function(packets, callback) {
	  if (!packets.length) {
	    return callback(new ArrayBuffer(0));
	  }

	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(data) {
	      return doneCallback(null, data);
	    });
	  }

	  map(packets, encodeOne, function(err, encodedPackets) {
	    var totalLength = encodedPackets.reduce(function(acc, p) {
	      var len;
	      if (typeof p === 'string'){
	        len = p.length;
	      } else {
	        len = p.byteLength;
	      }
	      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
	    }, 0);

	    var resultArray = new Uint8Array(totalLength);

	    var bufferIndex = 0;
	    encodedPackets.forEach(function(p) {
	      var isString = typeof p === 'string';
	      var ab = p;
	      if (isString) {
	        var view = new Uint8Array(p.length);
	        for (var i = 0; i < p.length; i++) {
	          view[i] = p.charCodeAt(i);
	        }
	        ab = view.buffer;
	      }

	      if (isString) { // not true binary
	        resultArray[bufferIndex++] = 0;
	      } else { // true binary
	        resultArray[bufferIndex++] = 1;
	      }

	      var lenStr = ab.byteLength.toString();
	      for (var i = 0; i < lenStr.length; i++) {
	        resultArray[bufferIndex++] = parseInt(lenStr[i]);
	      }
	      resultArray[bufferIndex++] = 255;

	      var view = new Uint8Array(ab);
	      for (var i = 0; i < view.length; i++) {
	        resultArray[bufferIndex++] = view[i];
	      }
	    });

	    return callback(resultArray.buffer);
	  });
	};

	/**
	 * Encode as Blob
	 */

	exports.encodePayloadAsBlob = function(packets, callback) {
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(encoded) {
	      var binaryIdentifier = new Uint8Array(1);
	      binaryIdentifier[0] = 1;
	      if (typeof encoded === 'string') {
	        var view = new Uint8Array(encoded.length);
	        for (var i = 0; i < encoded.length; i++) {
	          view[i] = encoded.charCodeAt(i);
	        }
	        encoded = view.buffer;
	        binaryIdentifier[0] = 0;
	      }

	      var len = (encoded instanceof ArrayBuffer)
	        ? encoded.byteLength
	        : encoded.size;

	      var lenStr = len.toString();
	      var lengthAry = new Uint8Array(lenStr.length + 1);
	      for (var i = 0; i < lenStr.length; i++) {
	        lengthAry[i] = parseInt(lenStr[i]);
	      }
	      lengthAry[lenStr.length] = 255;

	      if (Blob) {
	        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
	        doneCallback(null, blob);
	      }
	    });
	  }

	  map(packets, encodeOne, function(err, results) {
	    return callback(new Blob(results));
	  });
	};

	/*
	 * Decodes data when a payload is maybe expected. Strings are decoded by
	 * interpreting each byte as a key code for entries marked to start with 0. See
	 * description of encodePayloadAsBinary
	 *
	 * @param {ArrayBuffer} data, callback method
	 * @api public
	 */

	exports.decodePayloadAsBinary = function (data, binaryType, callback) {
	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }

	  var bufferTail = data;
	  var buffers = [];

	  var numberTooLong = false;
	  while (bufferTail.byteLength > 0) {
	    var tailArray = new Uint8Array(bufferTail);
	    var isString = tailArray[0] === 0;
	    var msgLength = '';

	    for (var i = 1; ; i++) {
	      if (tailArray[i] == 255) break;

	      if (msgLength.length > 310) {
	        numberTooLong = true;
	        break;
	      }

	      msgLength += tailArray[i];
	    }

	    if(numberTooLong) return callback(err, 0, 1);

	    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
	    msgLength = parseInt(msgLength);

	    var msg = sliceBuffer(bufferTail, 0, msgLength);
	    if (isString) {
	      try {
	        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
	      } catch (e) {
	        // iPhone Safari doesn't let you apply to typed arrays
	        var typed = new Uint8Array(msg);
	        msg = '';
	        for (var i = 0; i < typed.length; i++) {
	          msg += String.fromCharCode(typed[i]);
	        }
	      }
	    }

	    buffers.push(msg);
	    bufferTail = sliceBuffer(bufferTail, msgLength);
	  }

	  var total = buffers.length;
	  buffers.forEach(function(buffer, i) {
	    callback(exports.decodePacket(buffer, binaryType, true), i, total);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 91 */
/***/ function(module, exports) {

	
	/**
	 * Gets the keys for an object.
	 *
	 * @return {Array} keys
	 * @api private
	 */

	module.exports = Object.keys || function keys (obj){
	  var arr = [];
	  var has = Object.prototype.hasOwnProperty;

	  for (var i in obj) {
	    if (has.call(obj, i)) {
	      arr.push(i);
	    }
	  }
	  return arr;
	};


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/*
	 * Module requirements.
	 */

	var isArray = __webpack_require__(93);

	/**
	 * Module exports.
	 */

	module.exports = hasBinary;

	/**
	 * Checks for binary data.
	 *
	 * Right now only Buffer and ArrayBuffer are supported..
	 *
	 * @param {Object} anything
	 * @api public
	 */

	function hasBinary(data) {

	  function _hasBinary(obj) {
	    if (!obj) return false;

	    if ( (global.Buffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
	         (global.Blob && obj instanceof Blob) ||
	         (global.File && obj instanceof File)
	        ) {
	      return true;
	    }

	    if (isArray(obj)) {
	      for (var i = 0; i < obj.length; i++) {
	          if (_hasBinary(obj[i])) {
	              return true;
	          }
	      }
	    } else if (obj && 'object' == typeof obj) {
	      if (obj.toJSON) {
	        obj = obj.toJSON();
	      }

	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
	          return true;
	        }
	      }
	    }

	    return false;
	  }

	  return _hasBinary(data);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 94 */
/***/ function(module, exports) {

	/**
	 * An abstraction for slicing an arraybuffer even when
	 * ArrayBuffer.prototype.slice is not supported
	 *
	 * @api public
	 */

	module.exports = function(arraybuffer, start, end) {
	  var bytes = arraybuffer.byteLength;
	  start = start || 0;
	  end = end || bytes;

	  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

	  if (start < 0) { start += bytes; }
	  if (end < 0) { end += bytes; }
	  if (end > bytes) { end = bytes; }

	  if (start >= bytes || start >= end || bytes === 0) {
	    return new ArrayBuffer(0);
	  }

	  var abv = new Uint8Array(arraybuffer);
	  var result = new Uint8Array(end - start);
	  for (var i = start, ii = 0; i < end; i++, ii++) {
	    result[ii] = abv[i];
	  }
	  return result.buffer;
	};


/***/ },
/* 95 */
/***/ function(module, exports) {

	/*
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */
	(function(chars){
	  "use strict";

	  exports.encode = function(arraybuffer) {
	    var bytes = new Uint8Array(arraybuffer),
	    i, len = bytes.length, base64 = "";

	    for (i = 0; i < len; i+=3) {
	      base64 += chars[bytes[i] >> 2];
	      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
	      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
	      base64 += chars[bytes[i + 2] & 63];
	    }

	    if ((len % 3) === 2) {
	      base64 = base64.substring(0, base64.length - 1) + "=";
	    } else if (len % 3 === 1) {
	      base64 = base64.substring(0, base64.length - 2) + "==";
	    }

	    return base64;
	  };

	  exports.decode =  function(base64) {
	    var bufferLength = base64.length * 0.75,
	    len = base64.length, i, p = 0,
	    encoded1, encoded2, encoded3, encoded4;

	    if (base64[base64.length - 1] === "=") {
	      bufferLength--;
	      if (base64[base64.length - 2] === "=") {
	        bufferLength--;
	      }
	    }

	    var arraybuffer = new ArrayBuffer(bufferLength),
	    bytes = new Uint8Array(arraybuffer);

	    for (i = 0; i < len; i+=4) {
	      encoded1 = chars.indexOf(base64[i]);
	      encoded2 = chars.indexOf(base64[i+1]);
	      encoded3 = chars.indexOf(base64[i+2]);
	      encoded4 = chars.indexOf(base64[i+3]);

	      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
	      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
	      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
	    }

	    return arraybuffer;
	  };
	})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");


/***/ },
/* 96 */
/***/ function(module, exports) {

	module.exports = after

	function after(count, callback, err_cb) {
	    var bail = false
	    err_cb = err_cb || noop
	    proxy.count = count

	    return (count === 0) ? callback() : proxy

	    function proxy(err, result) {
	        if (proxy.count <= 0) {
	            throw new Error('after called too many times')
	        }
	        --proxy.count

	        // after first error, rest are passed to err_cb
	        if (err) {
	            bail = true
	            callback(err)
	            // future error callbacks will go to error handler
	            callback = err_cb
	        } else if (proxy.count === 0 && !bail) {
	            callback(null, result)
	        }
	    }
	}

	function noop() {}


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/utf8js v2.0.0 by @mathias */
	;(function(root) {

		// Detect free variables `exports`
		var freeExports = typeof exports == 'object' && exports;

		// Detect free variable `module`
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;

		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/*--------------------------------------------------------------------------*/

		var stringFromCharCode = String.fromCharCode;

		// Taken from https://mths.be/punycode
		function ucs2decode(string) {
			var output = [];
			var counter = 0;
			var length = string.length;
			var value;
			var extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		// Taken from https://mths.be/punycode
		function ucs2encode(array) {
			var length = array.length;
			var index = -1;
			var value;
			var output = '';
			while (++index < length) {
				value = array[index];
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
			}
			return output;
		}

		function checkScalarValue(codePoint) {
			if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
				throw Error(
					'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
					' is not a scalar value'
				);
			}
		}
		/*--------------------------------------------------------------------------*/

		function createByte(codePoint, shift) {
			return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
		}

		function encodeCodePoint(codePoint) {
			if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
				return stringFromCharCode(codePoint);
			}
			var symbol = '';
			if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
				symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
			}
			else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
				checkScalarValue(codePoint);
				symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
				symbol += createByte(codePoint, 6);
			}
			else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
				symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
				symbol += createByte(codePoint, 12);
				symbol += createByte(codePoint, 6);
			}
			symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
			return symbol;
		}

		function utf8encode(string) {
			var codePoints = ucs2decode(string);
			var length = codePoints.length;
			var index = -1;
			var codePoint;
			var byteString = '';
			while (++index < length) {
				codePoint = codePoints[index];
				byteString += encodeCodePoint(codePoint);
			}
			return byteString;
		}

		/*--------------------------------------------------------------------------*/

		function readContinuationByte() {
			if (byteIndex >= byteCount) {
				throw Error('Invalid byte index');
			}

			var continuationByte = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			if ((continuationByte & 0xC0) == 0x80) {
				return continuationByte & 0x3F;
			}

			// If we end up here, it’s not a continuation byte
			throw Error('Invalid continuation byte');
		}

		function decodeSymbol() {
			var byte1;
			var byte2;
			var byte3;
			var byte4;
			var codePoint;

			if (byteIndex > byteCount) {
				throw Error('Invalid byte index');
			}

			if (byteIndex == byteCount) {
				return false;
			}

			// Read first byte
			byte1 = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			// 1-byte sequence (no continuation bytes)
			if ((byte1 & 0x80) == 0) {
				return byte1;
			}

			// 2-byte sequence
			if ((byte1 & 0xE0) == 0xC0) {
				var byte2 = readContinuationByte();
				codePoint = ((byte1 & 0x1F) << 6) | byte2;
				if (codePoint >= 0x80) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 3-byte sequence (may include unpaired surrogates)
			if ((byte1 & 0xF0) == 0xE0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
				if (codePoint >= 0x0800) {
					checkScalarValue(codePoint);
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 4-byte sequence
			if ((byte1 & 0xF8) == 0xF0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				byte4 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
					(byte3 << 0x06) | byte4;
				if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
					return codePoint;
				}
			}

			throw Error('Invalid UTF-8 detected');
		}

		var byteArray;
		var byteCount;
		var byteIndex;
		function utf8decode(byteString) {
			byteArray = ucs2decode(byteString);
			byteCount = byteArray.length;
			byteIndex = 0;
			var codePoints = [];
			var tmp;
			while ((tmp = decodeSymbol()) !== false) {
				codePoints.push(tmp);
			}
			return ucs2encode(codePoints);
		}

		/*--------------------------------------------------------------------------*/

		var utf8 = {
			'version': '2.0.0',
			'encode': utf8encode,
			'decode': utf8decode
		};

		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return utf8;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = utf8;
			} else { // in Narwhal or RingoJS v0.7.0-
				var object = {};
				var hasOwnProperty = object.hasOwnProperty;
				for (var key in utf8) {
					hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.utf8 = utf8;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(98)(module), (function() { return this; }())))

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 99 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Create a blob builder even when vendor prefixes exist
	 */

	var BlobBuilder = global.BlobBuilder
	  || global.WebKitBlobBuilder
	  || global.MSBlobBuilder
	  || global.MozBlobBuilder;

	/**
	 * Check if Blob constructor is supported
	 */

	var blobSupported = (function() {
	  try {
	    var a = new Blob(['hi']);
	    return a.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();

	/**
	 * Check if Blob constructor supports ArrayBufferViews
	 * Fails in Safari 6, so we need to map to ArrayBuffers there.
	 */

	var blobSupportsArrayBufferView = blobSupported && (function() {
	  try {
	    var b = new Blob([new Uint8Array([1,2])]);
	    return b.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();

	/**
	 * Check if BlobBuilder is supported
	 */

	var blobBuilderSupported = BlobBuilder
	  && BlobBuilder.prototype.append
	  && BlobBuilder.prototype.getBlob;

	/**
	 * Helper function that maps ArrayBufferViews to ArrayBuffers
	 * Used by BlobBuilder constructor and old browsers that didn't
	 * support it in the Blob constructor.
	 */

	function mapArrayBufferViews(ary) {
	  for (var i = 0; i < ary.length; i++) {
	    var chunk = ary[i];
	    if (chunk.buffer instanceof ArrayBuffer) {
	      var buf = chunk.buffer;

	      // if this is a subarray, make a copy so we only
	      // include the subarray region from the underlying buffer
	      if (chunk.byteLength !== buf.byteLength) {
	        var copy = new Uint8Array(chunk.byteLength);
	        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
	        buf = copy.buffer;
	      }

	      ary[i] = buf;
	    }
	  }
	}

	function BlobBuilderConstructor(ary, options) {
	  options = options || {};

	  var bb = new BlobBuilder();
	  mapArrayBufferViews(ary);

	  for (var i = 0; i < ary.length; i++) {
	    bb.append(ary[i]);
	  }

	  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
	};

	function BlobConstructor(ary, options) {
	  mapArrayBufferViews(ary);
	  return new Blob(ary, options || {});
	};

	module.exports = (function() {
	  if (blobSupported) {
	    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
	  } else if (blobBuilderSupported) {
	    return BlobBuilderConstructor;
	  } else {
	    return undefined;
	  }
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 100 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};

	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 101 */
/***/ function(module, exports) {

	/**
	 * Compiles a querystring
	 * Returns string representation of the object
	 *
	 * @param {Object}
	 * @api private
	 */

	exports.encode = function (obj) {
	  var str = '';

	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      if (str.length) str += '&';
	      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
	    }
	  }

	  return str;
	};

	/**
	 * Parses a simple querystring into an object
	 *
	 * @param {String} qs
	 * @api private
	 */

	exports.decode = function(qs){
	  var qry = {};
	  var pairs = qs.split('&');
	  for (var i = 0, l = pairs.length; i < l; i++) {
	    var pair = pairs[i].split('=');
	    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	  }
	  return qry;
	};


/***/ },
/* 102 */
/***/ function(module, exports) {

	
	module.exports = function(a, b){
	  var fn = function(){};
	  fn.prototype = b.prototype;
	  a.prototype = new fn;
	  a.prototype.constructor = a;
	};

/***/ },
/* 103 */
/***/ function(module, exports) {

	'use strict';

	var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
	  , length = 64
	  , map = {}
	  , seed = 0
	  , i = 0
	  , prev;

	/**
	 * Return a string representing the specified number.
	 *
	 * @param {Number} num The number to convert.
	 * @returns {String} The string representation of the number.
	 * @api public
	 */
	function encode(num) {
	  var encoded = '';

	  do {
	    encoded = alphabet[num % length] + encoded;
	    num = Math.floor(num / length);
	  } while (num > 0);

	  return encoded;
	}

	/**
	 * Return the integer value specified by the given string.
	 *
	 * @param {String} str The string to convert.
	 * @returns {Number} The integer value represented by the string.
	 * @api public
	 */
	function decode(str) {
	  var decoded = 0;

	  for (i = 0; i < str.length; i++) {
	    decoded = decoded * length + map[str.charAt(i)];
	  }

	  return decoded;
	}

	/**
	 * Yeast: A tiny growing id generator.
	 *
	 * @returns {String} A unique id.
	 * @api public
	 */
	function yeast() {
	  var now = encode(+new Date());

	  if (now !== prev) return seed = 0, prev = now;
	  return now +'.'+ encode(seed++);
	}

	//
	// Map each character to its index.
	//
	for (; i < length; i++) map[alphabet[i]] = i;

	//
	// Expose the `yeast`, `encode` and `decode` functions.
	//
	yeast.encode = encode;
	yeast.decode = decode;
	module.exports = yeast;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(105);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(106);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 106 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module requirements.
	 */

	var Polling = __webpack_require__(88);
	var inherit = __webpack_require__(102);

	/**
	 * Module exports.
	 */

	module.exports = JSONPPolling;

	/**
	 * Cached regular expressions.
	 */

	var rNewline = /\n/g;
	var rEscapedNewline = /\\n/g;

	/**
	 * Global JSONP callbacks.
	 */

	var callbacks;

	/**
	 * Callbacks count.
	 */

	var index = 0;

	/**
	 * Noop.
	 */

	function empty () { }

	/**
	 * JSONP Polling constructor.
	 *
	 * @param {Object} opts.
	 * @api public
	 */

	function JSONPPolling (opts) {
	  Polling.call(this, opts);

	  this.query = this.query || {};

	  // define global callbacks array if not present
	  // we do this here (lazily) to avoid unneeded global pollution
	  if (!callbacks) {
	    // we need to consider multiple engines in the same page
	    if (!global.___eio) global.___eio = [];
	    callbacks = global.___eio;
	  }

	  // callback identifier
	  this.index = callbacks.length;

	  // add callback to jsonp global
	  var self = this;
	  callbacks.push(function (msg) {
	    self.onData(msg);
	  });

	  // append to query string
	  this.query.j = this.index;

	  // prevent spurious errors from being emitted when the window is unloaded
	  if (global.document && global.addEventListener) {
	    global.addEventListener('beforeunload', function () {
	      if (self.script) self.script.onerror = empty;
	    }, false);
	  }
	}

	/**
	 * Inherits from Polling.
	 */

	inherit(JSONPPolling, Polling);

	/*
	 * JSONP only supports binary as base64 encoded strings
	 */

	JSONPPolling.prototype.supportsBinary = false;

	/**
	 * Closes the socket.
	 *
	 * @api private
	 */

	JSONPPolling.prototype.doClose = function () {
	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }

	  if (this.form) {
	    this.form.parentNode.removeChild(this.form);
	    this.form = null;
	    this.iframe = null;
	  }

	  Polling.prototype.doClose.call(this);
	};

	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */

	JSONPPolling.prototype.doPoll = function () {
	  var self = this;
	  var script = document.createElement('script');

	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }

	  script.async = true;
	  script.src = this.uri();
	  script.onerror = function(e){
	    self.onError('jsonp poll error',e);
	  };

	  var insertAt = document.getElementsByTagName('script')[0];
	  if (insertAt) {
	    insertAt.parentNode.insertBefore(script, insertAt);
	  }
	  else {
	    (document.head || document.body).appendChild(script);
	  }
	  this.script = script;

	  var isUAgecko = 'undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);
	  
	  if (isUAgecko) {
	    setTimeout(function () {
	      var iframe = document.createElement('iframe');
	      document.body.appendChild(iframe);
	      document.body.removeChild(iframe);
	    }, 100);
	  }
	};

	/**
	 * Writes with a hidden iframe.
	 *
	 * @param {String} data to send
	 * @param {Function} called upon flush.
	 * @api private
	 */

	JSONPPolling.prototype.doWrite = function (data, fn) {
	  var self = this;

	  if (!this.form) {
	    var form = document.createElement('form');
	    var area = document.createElement('textarea');
	    var id = this.iframeId = 'eio_iframe_' + this.index;
	    var iframe;

	    form.className = 'socketio';
	    form.style.position = 'absolute';
	    form.style.top = '-1000px';
	    form.style.left = '-1000px';
	    form.target = id;
	    form.method = 'POST';
	    form.setAttribute('accept-charset', 'utf-8');
	    area.name = 'd';
	    form.appendChild(area);
	    document.body.appendChild(form);

	    this.form = form;
	    this.area = area;
	  }

	  this.form.action = this.uri();

	  function complete () {
	    initIframe();
	    fn();
	  }

	  function initIframe () {
	    if (self.iframe) {
	      try {
	        self.form.removeChild(self.iframe);
	      } catch (e) {
	        self.onError('jsonp polling iframe removal error', e);
	      }
	    }

	    try {
	      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	      var html = '<iframe src="javascript:0" name="'+ self.iframeId +'">';
	      iframe = document.createElement(html);
	    } catch (e) {
	      iframe = document.createElement('iframe');
	      iframe.name = self.iframeId;
	      iframe.src = 'javascript:0';
	    }

	    iframe.id = self.iframeId;

	    self.form.appendChild(iframe);
	    self.iframe = iframe;
	  }

	  initIframe();

	  // escape \n to prevent it from being converted into \r\n by some UAs
	  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
	  data = data.replace(rEscapedNewline, '\\\n');
	  this.area.value = data.replace(rNewline, '\\n');

	  try {
	    this.form.submit();
	  } catch(e) {}

	  if (this.iframe.attachEvent) {
	    this.iframe.onreadystatechange = function(){
	      if (self.iframe.readyState == 'complete') {
	        complete();
	      }
	    };
	  } else {
	    this.iframe.onload = complete;
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */

	var Transport = __webpack_require__(89);
	var parser = __webpack_require__(90);
	var parseqs = __webpack_require__(101);
	var inherit = __webpack_require__(102);
	var yeast = __webpack_require__(103);
	var debug = __webpack_require__(104)('engine.io-client:websocket');
	var BrowserWebSocket = global.WebSocket || global.MozWebSocket;

	/**
	 * Get either the `WebSocket` or `MozWebSocket` globals
	 * in the browser or try to resolve WebSocket-compatible
	 * interface exposed by `ws` for Node-like environment.
	 */

	var WebSocket = BrowserWebSocket;
	if (!WebSocket && typeof window === 'undefined') {
	  try {
	    WebSocket = __webpack_require__(109);
	  } catch (e) { }
	}

	/**
	 * Module exports.
	 */

	module.exports = WS;

	/**
	 * WebSocket transport constructor.
	 *
	 * @api {Object} connection options
	 * @api public
	 */

	function WS(opts){
	  var forceBase64 = (opts && opts.forceBase64);
	  if (forceBase64) {
	    this.supportsBinary = false;
	  }
	  this.perMessageDeflate = opts.perMessageDeflate;
	  Transport.call(this, opts);
	}

	/**
	 * Inherits from Transport.
	 */

	inherit(WS, Transport);

	/**
	 * Transport name.
	 *
	 * @api public
	 */

	WS.prototype.name = 'websocket';

	/*
	 * WebSockets support binary
	 */

	WS.prototype.supportsBinary = true;

	/**
	 * Opens socket.
	 *
	 * @api private
	 */

	WS.prototype.doOpen = function(){
	  if (!this.check()) {
	    // let probe timeout
	    return;
	  }

	  var self = this;
	  var uri = this.uri();
	  var protocols = void(0);
	  var opts = {
	    agent: this.agent,
	    perMessageDeflate: this.perMessageDeflate
	  };

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  if (this.extraHeaders) {
	    opts.headers = this.extraHeaders;
	  }

	  this.ws = BrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);

	  if (this.ws.binaryType === undefined) {
	    this.supportsBinary = false;
	  }

	  if (this.ws.supports && this.ws.supports.binary) {
	    this.supportsBinary = true;
	    this.ws.binaryType = 'buffer';
	  } else {
	    this.ws.binaryType = 'arraybuffer';
	  }

	  this.addEventListeners();
	};

	/**
	 * Adds event listeners to the socket
	 *
	 * @api private
	 */

	WS.prototype.addEventListeners = function(){
	  var self = this;

	  this.ws.onopen = function(){
	    self.onOpen();
	  };
	  this.ws.onclose = function(){
	    self.onClose();
	  };
	  this.ws.onmessage = function(ev){
	    self.onData(ev.data);
	  };
	  this.ws.onerror = function(e){
	    self.onError('websocket error', e);
	  };
	};

	/**
	 * Override `onData` to use a timer on iOS.
	 * See: https://gist.github.com/mloughran/2052006
	 *
	 * @api private
	 */

	if ('undefined' != typeof navigator
	  && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
	  WS.prototype.onData = function(data){
	    var self = this;
	    setTimeout(function(){
	      Transport.prototype.onData.call(self, data);
	    }, 0);
	  };
	}

	/**
	 * Writes data to socket.
	 *
	 * @param {Array} array of packets.
	 * @api private
	 */

	WS.prototype.write = function(packets){
	  var self = this;
	  this.writable = false;

	  // encodePacket efficient as it uses WS framing
	  // no need for encodePayload
	  var total = packets.length;
	  for (var i = 0, l = total; i < l; i++) {
	    (function(packet) {
	      parser.encodePacket(packet, self.supportsBinary, function(data) {
	        if (!BrowserWebSocket) {
	          // always create a new object (GH-437)
	          var opts = {};
	          if (packet.options) {
	            opts.compress = packet.options.compress;
	          }

	          if (self.perMessageDeflate) {
	            var len = 'string' == typeof data ? global.Buffer.byteLength(data) : data.length;
	            if (len < self.perMessageDeflate.threshold) {
	              opts.compress = false;
	            }
	          }
	        }

	        //Sometimes the websocket has already been closed but the browser didn't
	        //have a chance of informing us about it yet, in that case send will
	        //throw an error
	        try {
	          if (BrowserWebSocket) {
	            // TypeError is thrown when passing the second argument on Safari
	            self.ws.send(data);
	          } else {
	            self.ws.send(data, opts);
	          }
	        } catch (e){
	          debug('websocket closed before onclose event');
	        }

	        --total || done();
	      });
	    })(packets[i]);
	  }

	  function done(){
	    self.emit('flush');

	    // fake drain
	    // defer to next tick to allow Socket to clear writeBuffer
	    setTimeout(function(){
	      self.writable = true;
	      self.emit('drain');
	    }, 0);
	  }
	};

	/**
	 * Called upon close
	 *
	 * @api private
	 */

	WS.prototype.onClose = function(){
	  Transport.prototype.onClose.call(this);
	};

	/**
	 * Closes socket.
	 *
	 * @api private
	 */

	WS.prototype.doClose = function(){
	  if (typeof this.ws !== 'undefined') {
	    this.ws.close();
	  }
	};

	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */

	WS.prototype.uri = function(){
	  var query = this.query || {};
	  var schema = this.secure ? 'wss' : 'ws';
	  var port = '';

	  // avoid port if default for schema
	  if (this.port && (('wss' == schema && this.port != 443)
	    || ('ws' == schema && this.port != 80))) {
	    port = ':' + this.port;
	  }

	  // append timestamp to URI
	  if (this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }

	  // communicate binary support capabilities
	  if (!this.supportsBinary) {
	    query.b64 = 1;
	  }

	  query = parseqs.encode(query);

	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }

	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};

	/**
	 * Feature detection for WebSocket.
	 *
	 * @return {Boolean} whether this transport is available.
	 * @api public
	 */

	WS.prototype.check = function(){
	  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 109 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 110 */
/***/ function(module, exports) {

	
	var indexOf = [].indexOf;

	module.exports = function(arr, obj){
	  if (indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 111 */
/***/ function(module, exports) {

	/**
	 * Parses an URI
	 *
	 * @author Steven Levithan <stevenlevithan.com> (MIT license)
	 * @api private
	 */

	var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

	var parts = [
	    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
	];

	module.exports = function parseuri(str) {
	    var src = str,
	        b = str.indexOf('['),
	        e = str.indexOf(']');

	    if (b != -1 && e != -1) {
	        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
	    }

	    var m = re.exec(str || ''),
	        uri = {},
	        i = 14;

	    while (i--) {
	        uri[parts[i]] = m[i] || '';
	    }

	    if (b != -1 && e != -1) {
	        uri.source = src;
	        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
	        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
	        uri.ipv6uri = true;
	    }

	    return uri;
	};


/***/ },
/* 112 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * JSON parse.
	 *
	 * @see Based on jQuery#parseJSON (MIT) and JSON2
	 * @api private
	 */

	var rvalidchars = /^[\],:{}\s]*$/;
	var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
	var rtrimLeft = /^\s+/;
	var rtrimRight = /\s+$/;

	module.exports = function parsejson(data) {
	  if ('string' != typeof data || !data) {
	    return null;
	  }

	  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');

	  // Attempt to parse using the native JSON parser first
	  if (global.JSON && JSON.parse) {
	    return JSON.parse(data);
	  }

	  if (rvalidchars.test(data.replace(rvalidescape, '@')
	      .replace(rvalidtokens, ']')
	      .replace(rvalidbraces, ''))) {
	    return (new Function('return ' + data))();
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 113 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 114 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    leftMatched: function leftMatched(state) {
	        return state.leftMatched;
	    },

	    highestSpeed: function highestSpeed(state) {
	        return state.highestSpeed;
	    },

	    elapsedMs: function elapsedMs(state) {
	        return state.elapsedMs;
	    },

	    cards: function cards(state) {
	        return state.cards;
	    },

	    status: function status(state) {
	        return state.status;
	    },

	    displayRank: function displayRank(state) {
	        return state.displayRank;
	    },

	    displayNameInput: function displayNameInput(state) {
	        return state.displayNameInput;
	    },

	    userName: function userName(state) {
	        return state.userName;
	    },

	    ranks: function ranks(state) {
	        return state.ranks;
	    }
	};

/***/ },
/* 115 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    reset: function reset(st, newState) {
	        st.leftMatched = newState.leftMatched;
	        st.highestSpeed = newState.highestSpeed;
	        st.status = newState.status;
	        st.cards = newState.cards;
	        st.elapsedMs = newState.elapsedMs;
	        st.displayRank = newState.displayRank;
	        st.displayNameInput = newState.displayNameInput;
	        st.ranks = newState.ranks;
	        st.userName = newState.userName;
	    },
	    updateStatus: function updateStatus(st, newStatus) {
	        st.status = newStatus;
	    },
	    decreaseMatch: function decreaseMatch(st) {
	        st.leftMatched--;
	    },
	    flip: function flip(st, card) {
	        var c = st.cards.find(function (cc) {
	            return cc === card;
	        });
	        c.flipped = !c.flipped;
	    },
	    flips: function flips(st, cards) {
	        st.cards.filter(function (cc) {
	            return cards.indexOf(cc) >= 0;
	        }).forEach(function (cc) {
	            cc.flipped = !cc.flipped;
	        });
	    },
	    counting: function counting(st) {
	        st.elapsedMs++;
	    },
	    updateHighestSpeed: function updateHighestSpeed(st) {
	        if (!localStorage.getItem('highestSpeed')) {
	            return localStorage.setItem('highestSpeed', st.elapsedMs);
	        }
	        if (localStorage.getItem('highestSpeed') > st.elapsedMs) {
	            return localStorage.setItem('highestSpeed', st.elapsedMs);
	        }
	    },
	    toggleRank: function toggleRank(st, boo) {
	        st.displayRank = boo;
	    },
	    toggleNameInput: function toggleNameInput(st, boo) {
	        st.displayNameInput = boo;
	    },
	    updateUsername: function updateUsername(st, name) {
	        localStorage.setItem('userName', name);
	        st.userName = name;
	    },
	    updateRanks: function updateRanks(st, ranks) {
	        st.ranks = ranks;
	    }
	};

/***/ }
/******/ ]);