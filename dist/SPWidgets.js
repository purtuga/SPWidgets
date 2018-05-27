!function(root, factory) {
    "object" === typeof exports && "object" === typeof module ? module.exports = factory() : "function" === typeof define && define.amd ? define([], factory) : "object" === typeof exports ? exports.SPWidgets = factory() : root.SPWidgets = factory();
}("undefined" !== typeof self ? self : this, function() {
    /******/
    return function(modules) {
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
            return installedModules[moduleId].exports;
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: false,
                /******/
                exports: {}
            };
            /******/
            /******/
            // Execute the module function
            /******/
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/
            // Flag the module as loaded
            /******/
            module.l = true;
            /******/
            /******/
            // Return the exports of the module
            /******/
            return module.exports;
        }
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        __webpack_require__.m = modules;
        /******/
        /******/
        // expose the module cache
        /******/
        __webpack_require__.c = installedModules;
        /******/
        /******/
        // define getter function for harmony exports
        /******/
        __webpack_require__.d = function(exports, name, getter) {
            /******/
            __webpack_require__.o(exports, name) || /******/
            Object.defineProperty(exports, name, {
                /******/
                configurable: false,
                /******/
                enumerable: true,
                /******/
                get: getter
            });
        };
        /******/
        /******/
        // getDefaultExport function for compatibility with non-harmony modules
        /******/
        __webpack_require__.n = function(module) {
            /******/
            var getter = module && module.__esModule ? /******/
            function() {
                return module.default;
            } : /******/
            function() {
                return module;
            };
            /******/
            __webpack_require__.d(getter, "a", getter);
            /******/
            return getter;
        };
        /******/
        /******/
        // Object.prototype.hasOwnProperty.call
        /******/
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/
        // __webpack_public_path__
        /******/
        __webpack_require__.p = "";
        /******/
        /******/
        // Load entry module and return exports
        /******/
        return __webpack_require__(__webpack_require__.s = 51);
    }([ /* 0 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export objectExtend */
        var OBJECT_TYPE = "[object Object]";
        var _toString = Function.call.bind(Object.prototype.toString);
        //============================================================
        /**
 * Extends an object with the properties of another.
 *
 * @param {Object|Boolean} mergeIntoObj
 *  The object that will have the properties of every other object provided
 *  on input merged into. This can also be a `Boolean`, in which case,
 *  a deep merge of objects will be done - argument number 2 will
 *  become the `mergeIntoObj`.
 * @param {...Object} mergeObjects
 *
 * @return {Object}
 */
        function objectExtend(mergeIntoObj) {
            var response = mergeIntoObj || {};
            for (var _len = arguments.length, mergeObjects = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) mergeObjects[_key - 1] = arguments[_key];
            var total = mergeObjects.length;
            var deepMerge = false;
            var i = void 0;
            var key = void 0;
            if ("boolean" === typeof mergeIntoObj) {
                deepMerge = mergeIntoObj;
                response = mergeObjects.shift() || {};
                total = mergeObjects.length;
            }
            for (i = 0; i < total; i++) {
                if (!mergeObjects[i]) continue;
                for (key in mergeObjects[i]) mergeObjects[i].hasOwnProperty(key) && (deepMerge && _toString(response[key]) === OBJECT_TYPE && _toString(mergeObjects[i][key]) === OBJECT_TYPE ? response[key] = objectExtend(true, response[key], mergeObjects[i][key]) : response[key] = mergeObjects[i][key]);
            }
            return response;
        }
        /* harmony default export */
        __webpack_exports__.a = objectExtend;
    }, /* 1 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export dataStore */
        // POLYFILL FOR WEAKMAP
        //  [pt] changed how "delete" is defined so that it can work in IE8
        /* jshint ignore:start */
        /**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
        "undefined" === typeof WeakMap && function() {
            var defineProperty = Object.defineProperty;
            var counter = Date.now() % 1e9;
            var WeakMap = function() {
                this.name = "__st" + (1e9 * Math.random() >>> 0) + counter++ + "__";
            };
            WeakMap.prototype = {
                set: function(key, value) {
                    var entry = key[this.name];
                    entry && entry[0] === key ? entry[1] = value : defineProperty(key, this.name, {
                        value: [ key, value ],
                        writable: true
                    });
                    return this;
                },
                get: function(key) {
                    var entry;
                    return (entry = key[this.name]) && entry[0] === key ? entry[1] : void 0;
                },
                // [pt] Quotes around the delete property needed for IE8
                delete: function(key) {
                    var entry = key[this.name];
                    if (!entry || entry[0] !== key) return false;
                    entry[0] = entry[1] = void 0;
                    return true;
                },
                has: function(key) {
                    var entry = key[this.name];
                    if (!entry) return false;
                    return entry[0] === key;
                }
            };
            window.WeakMap = WeakMap;
        }();
        /* jshint ignore:end */
        /**
 * Returns an object that contains an initialized WeakMap (`stash` property)
 * where data can be stored.
 *
 * @namespace dataStore
 *
 */
        var dataStore = /** @lends dataStore */ {
            /**
   * Stash data here.
   * @type WeakMap
   */
            stash: new WeakMap(),
            /**
   * Create a private data store and return it.
   * @return {WeakMap}
   */
            create: function() {
                return new WeakMap();
            }
        };
        /* harmony default export */
        __webpack_exports__.a = dataStore;
    }, /* 2 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export EventEmitter */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Compose__ = __webpack_require__(16);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__es6_Set__ = __webpack_require__(17);
        //----------------------------------------------------------------
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_1__dataStore__.a.create();
        var arraySlice = Function.call.bind(Array.prototype.slice);
        var isFunction = function(fn) {
            return "function" === typeof fn;
        };
        var objectKeys = Object.keys;
        /**
 * Emits events. Use it to extend other modules and thus add events to them.
 *
 * @class EventEmitter
 * @extends Compose
 */
        var EventEmitter = __WEBPACK_IMPORTED_MODULE_0__Compose__.a.extend(/** @lends EventEmitter.prototype */ {
            /**
     * Add a callback to a given event name
     *
     * @param {String} evName
     *  The event name to be listened to or a list of event sperated by a space.
     *  The EventEmitter instance can be used as the `evName` as well which will
     *  essentially listen to all events.
     *  Note that this special event however, will change the arguments
     *  passed to the callback by pre-pending the Event Name (`String`) and
     *  appending the Component instance.
     *
     * @param {Function} callback
     *  A callback function to listen to the event. The callback function
     *  can cancel any queued event callbacks by returning `true` (boolean).
     *
     * @return {EventEmitter#EventListener}
     *
     * @example
     *
     * events.on("some-event", (...args) => {});
     *
     * // List to all events
     * events.on(events, (evNameTriggered, ...args) => {}
     */
            on: function(evName, callback) {
                var _this = this;
                var _getSetup$call = getSetup.call(this), all = _getSetup$call.all, listeners = _getSetup$call.listeners;
                var events = getEventNameList(evName).reduce(function(eventList, eventName) {
                    var off = void 0;
                    // If eventName is `this` then listen to all events
                    if (eventName === _this) {
                        all.add(callback);
                        off = function() {
                            return all.delete(callback);
                        };
                    } else {
                        eventName in listeners || (listeners[eventName] = new __WEBPACK_IMPORTED_MODULE_2__es6_Set__.a());
                        listeners[eventName].add(callback);
                        off = function() {
                            return listeners[eventName].delete(callback);
                        };
                    }
                    eventList[eventName] = {
                        off: off
                    };
                    return eventList;
                }, {});
                /**
         * EventEmitter Listener object, returned when one of the listener setter methods
         * (ex. `on()`, `once()`, `pipe`) are used.
         *
         * @typedef {Object} EventEmitter~EventListener
         *
         * @property {Object} listeners
         *  An object with the individual listeners. Each respective event listener
         *  has an `off()` method to turn that listener off.
         *
         * @property {Function} off
         *  Remove callback from event.
         */
                var response = {
                    off: function() {
                        objectKeys(events).forEach(function(eventName) {
                            return events[eventName].off();
                        });
                    }
                };
                response.listeners = events;
                return response;
            },
            /**
     * Remove a callback from a given event
     *
     * @param {String} evName
     * @param {Function} callback
     *
     */
            off: function(evName, callback) {
                var _getSetup$call2 = getSetup.call(this), all = _getSetup$call2.all, listeners = _getSetup$call2.listeners;
                if (evName === this) {
                    all.delete(callback);
                    return;
                }
                listeners[evName] && listeners.delete(callback);
            },
            /**
     * Add a callback to a given event name that is executed only once.
     *
     * @param {String} evName
     *  The event name. This can be a list of event delimited with a space. Each
     *  event listeners will be triggered at most once.
     * @param {Function} callback
     *
     * @return {EventEmitter#EventListener}
     */
            once: function(evName, callback) {
                var _this2 = this;
                var events = getEventNameList(evName).reduce(function(eventListeners, eventName) {
                    var eventNameListener = _this2.on(evName, function() {
                        eventNameListener.off();
                        callback.apply(void 0, arguments);
                    });
                    eventListeners[eventName] = eventNameListener;
                    return eventListeners;
                }, {});
                var response = {
                    off: function() {
                        objectKeys(events).forEach(function(eventName) {
                            return events[eventName].off();
                        });
                    }
                };
                response.listeners = events;
                return response;
            },
            /**
     * Emit an event and execute any callback listening. Any of the listening
     * events can cancel the calling of queued callbacks by returning `true`
     * (boolean)
     *
     * @param {String} evName
     *  The event name to be triggered. __NOTE__: can not be a `"*"` or the EventEmitter
     *  instance since they holds special meaning.
     *
     * @param {...*} callbackArgs
     */
            emit: function(evName) {
                if ("*" === evName || evName === this) {
                    console.log("EventEmitter#emit(): can not emit to events to '*'");
                    // jshint ignore:line
                    return;
                }
                var setup = getSetup.call(this);
                var eventListeners = setup.listeners;
                var eventPipes = setup.pipes;
                var eventAll = setup.all;
                var args = arraySlice(arguments, 1);
                var isCanceled = false;
                var callbackHandler = function(callback) {
                    if (isFunction(callback)) {
                        var response = callback.apply(callback, args);
                        // if a boolean true was returned, don't call any more listeners.
                        if (true === response) {
                            isCanceled = true;
                            return true;
                        }
                    }
                };
                // Regular event listeners
                if (eventListeners[evName] && eventListeners[evName].size) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = void 0;
                    try {
                        for (var _step, _iterator = eventListeners[evName][Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var cb = _step.value;
                            if (callbackHandler(cb)) break;
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            !_iteratorNormalCompletion && _iterator.return && _iterator.return();
                        } finally {
                            if (_didIteratorError) throw _iteratorError;
                        }
                    }
                }
                // Event listeners for all events
                if (!isCanceled && ("*" in eventListeners || eventAll.size)) {
                    // Special event "*": pass event name and instance
                    args = arraySlice(arguments, 0);
                    args.push(this);
                    if (eventListeners["*"] && eventListeners["*"].size) {
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = void 0;
                        try {
                            for (var _step2, _iterator2 = eventListeners["*"][Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var _cb = _step2.value;
                                if (callbackHandler(_cb)) break;
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                !_iteratorNormalCompletion2 && _iterator2.return && _iterator2.return();
                            } finally {
                                if (_didIteratorError2) throw _iteratorError2;
                            }
                        }
                    }
                    if (eventAll.size) {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = void 0;
                        try {
                            for (var _step3, _iterator3 = eventAll[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var _cb2 = _step3.value;
                                if (callbackHandler(_cb2)) break;
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                !_iteratorNormalCompletion3 && _iterator3.return && _iterator3.return();
                            } finally {
                                if (_didIteratorError3) throw _iteratorError3;
                            }
                        }
                    }
                    // set args back to original
                    args = arraySlice(arguments, 1);
                }
                if (eventPipes.size) {
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = void 0;
                    try {
                        for (var _step4, _iterator4 = eventPipes[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var pipe = _step4.value;
                            pipe && pipe(evName, args);
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            !_iteratorNormalCompletion4 && _iterator4.return && _iterator4.return();
                        } finally {
                            if (_didIteratorError4) throw _iteratorError4;
                        }
                    }
                }
            },
            /**
     * Emit the events from one instance of EventEmitter to another. Useful
     * for when multiple components are used together as part of a larger
     * component and have the need to emit events to a common EventEmitter.
     *
     * @param {EventEmitter} pipeTo
     *  The EventEmitter instance object to where events should be piped.
     *  Can also be an object/class having an `emit(evName, data)` method.
     *
     * @param {String} [prefix]
     *  If defined, prefix will be added to any event emited. Example:
     *  if defining `foo-` as the prefix, then every event emitted will
     *  prefixed wth this value. So a `click` event on the source will
     *  be piped as `foo-click`.
     *
     * @param {Boolean} [includeInstance=true]
     *  When set to `true` (default), the piped event will include the source
     *  instance as an additional argument to the event that is piped.
     *
     *  @return {EventListener}
     */
            pipe: function(pipeTo, prefix, includeInstance) {
                var _this3 = this;
                if (!pipeTo || !pipeTo.emit) return {
                    off: function() {}
                };
                var pipes = getSetup.call(this).pipes;
                var pipeEvToReceiver = function(triggeredEvName, args) {
                    prefix ? args.unshift(prefix + triggeredEvName) : args.unshift(triggeredEvName);
                    (includeInstance || "undefined" === typeof includeInstance) && args.push(_this3);
                    pipeTo.emit.apply(pipeTo, args);
                };
                pipes.add(pipeEvToReceiver);
                return {
                    off: function() {
                        pipes.delete(pipeEvToReceiver);
                    }
                };
            },
            /**
     * Returns a boolean indicating if the current EventEmitter has listener
     * @returns {Boolean}
     */
            hasListeners: function() {
                var _getSetup$call3 = getSetup.call(this), listeners = _getSetup$call3.listeners, pipes = _getSetup$call3.pipes;
                return objectKeys(listeners).some(function(evName) {
                    return !!listeners[evName].size;
                }) || !!pipes.size;
            },
            destroy: function() {
                __WEBPACK_IMPORTED_MODULE_0__Compose__.a.prototype.destroy.call(this, true);
            }
        });
        /**
 * Returns the instance setup object. Creates it if it does not have one.
 * @private
 * @this EventEmitter
 */
        function getSetup() {
            if (!PRIVATE.has(this)) {
                /*
            listeners: {
                'evName': Set[ Callbacks ]
            },
            pipes: Set[ Callbacks ]
            all: Set[ Callbacks ]
        */
                PRIVATE.set(this, {
                    listeners: {},
                    pipes: new __WEBPACK_IMPORTED_MODULE_2__es6_Set__.a(),
                    all: new __WEBPACK_IMPORTED_MODULE_2__es6_Set__.a()
                });
                // When this object is destroyed, remove all data
                this.onDestroy && this.onDestroy(function() {
                    PRIVATE.has(this) && PRIVATE.delete(this);
                }.bind(this));
            }
            return PRIVATE.get(this);
        }
        function getEventNameList(eventNamesStr) {
            if ("string" === typeof eventNamesStr) return eventNamesStr.split(/\s+/);
            return [ eventNamesStr ];
        }
        /**
 * Adds event emitter functionality to an object
 *
 * @param {Object} target
 */
        EventEmitter.mixin = function(target) {
            target && [ "on", "off", "emit", "once", "pipe" ].forEach(function(method) {
                Object.defineProperty(target, method, {
                    configurable: true,
                    value: EventEmitter.prototype[method].bind(target)
                });
            });
        };
        /* harmony default export */
        __webpack_exports__.a = EventEmitter;
    }, /* 3 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export fillTemplate */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__getObjectPropValue__ = __webpack_require__(54);
        var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        /**
 * An extremely lightweight template engine for replacing
 * tokens in the form of {{name}} with values from an object
 * or a list (array) of objects
 *
 * @function fillTemplate
 *
 * @param {String|HTMLElement} template
 *  Template should use double curly braces for data attributes.
 *  These can be defined in dot notation for deep values in the data.
 *
 * @param {Object|Array<Object>} data
 *  The Object containing the data that will be applied to the
 *  template. An array of objects can also be defined
 *
 * @return {String}
 */
        function fillTemplate(template, data) {
            var i, j, x, y, item, tokenVal, tmp, opt = {};
            // If user used an object to define input param, then parse that now
            if ("object" === ("undefined" === typeof template ? "undefined" : _typeof(template)) && 1 === arguments.length) {
                data = template.data;
                template = template.template;
            }
            opt.response = "";
            if ("string" !== typeof template) {
                tmp = document.createElement("div");
                tmp.appendChild(template);
                template = tmp.innerHTML;
            } else opt.template = template;
            opt.tokens = opt.template.match(/(\{\{.*?\}\})/g);
            Array.isArray(data) || (data = data ? [ data ] : [ {} ]);
            // If we have tokens in the template, then replace them
            if (null !== opt.tokens) // If data tokens were passed in on input, then use them
            // in looking for that token in the template and replacing
            // it with the value defined.
            for (x = 0, y = data.length; x < y; x++) {
                item = opt.template;
                for (i = 0, j = opt.tokens.length; i < j; i++) {
                    opt.tokens[i] = opt.tokens[i].replace(/[\{\}]/g, "");
                    tokenVal = Object(__WEBPACK_IMPORTED_MODULE_0__getObjectPropValue__.a)(data[x], opt.tokens[i]) || "";
                    //tokenVal        = data[x][ opt.tokens[i] ] || '';
                    if ("function" === typeof tokenVal) {
                        var fnContext = data[x];
                        // Function should be called with the same context as it was originally created.
                        -1 !== opt.tokens[i].indexOf(".") && (fnContext = Object(__WEBPACK_IMPORTED_MODULE_0__getObjectPropValue__.a)(data[x], opt.tokens[i].substr(0, opt.tokens[i].lastIndexOf("."))));
                        tokenVal = tokenVal.call(fnContext);
                    }
                    item = item.replace("{{" + opt.tokens[i] + "}}", tokenVal);
                }
                opt.response += item;
            } else opt.response = opt.template;
            return opt.response;
        }
        /* harmony default export */
        __webpack_exports__.a = fillTemplate;
    }, /* 4 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domAddClass */
        /**
 * Adds class to an element
 *
 * @function domAddClass
 *
 * @param {HTMLElement} el
 * @param {String} cssClass
 *  Multiple classes can be set using spaces as a delimiter
 */
        function domAddClass(el, cssClass) {
            var classNameList = String(cssClass).trim().split(/\s+/).map(function(className) {
                return className.trim();
            });
            el && classNameList.length && classNameList.forEach(function(cssClass) {
                return el.classList.add(cssClass);
            });
        }
        /* harmony default export */
        __webpack_exports__.a = domAddClass;
    }, /* 5 */
    /***/
    function(module, exports) {
        /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
        // css base code, injected by the css-loader
        module.exports = function() {
            var list = [];
            // return the list of modules as css string
            list.toString = function() {
                var result = [];
                for (var i = 0; i < this.length; i++) {
                    var item = this[i];
                    item[2] ? result.push("@media " + item[2] + "{" + item[1] + "}") : result.push(item[1]);
                }
                return result.join("");
            };
            // import a list of modules into the list
            list.i = function(modules, mediaQuery) {
                "string" === typeof modules && (modules = [ [ null, modules, "" ] ]);
                var alreadyImportedModules = {};
                for (var i = 0; i < this.length; i++) {
                    var id = this[i][0];
                    "number" === typeof id && (alreadyImportedModules[id] = true);
                }
                for (i = 0; i < modules.length; i++) {
                    var item = modules[i];
                    // skip already imported module
                    // this implementation is not 100% perfect for weird media query combinations
                    //  when a module is imported multiple times with different media queries.
                    //  I hope this will never occur (Hey this way we have smaller bundles)
                    if ("number" !== typeof item[0] || !alreadyImportedModules[item[0]]) {
                        mediaQuery && !item[2] ? item[2] = mediaQuery : mediaQuery && (item[2] = "(" + item[2] + ") and (" + mediaQuery + ")");
                        list.push(item);
                    }
                }
            };
            return list;
        };
    }, /* 6 */
    /***/
    function(module, exports, __webpack_require__) {
        /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
        var stylesInDom = {};
        var isOldIE = function(fn) {
            var memo;
            return function() {
                "undefined" === typeof memo && (memo = fn.apply(this, arguments));
                return memo;
            };
        }(function() {
            // Test for IE <= 9 as proposed by Browserhacks
            // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
            // Tests for existence of standard globals is to allow style-loader
            // to operate correctly into non-standard environments
            // @see https://github.com/webpack-contrib/style-loader/issues/177
            return window && document && document.all && !window.atob;
        });
        var getTarget = function(target) {
            return document.querySelector(target);
        };
        var getElement = function(fn) {
            var memo = {};
            return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if ("function" === typeof target) return target();
                if ("undefined" === typeof memo[target]) {
                    var styleTarget = getTarget.call(this, target);
                    // Special case to return head of iframe instead of iframe itself
                    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) try {
                        // This will throw an exception if access to iframe is blocked
                        // due to cross-origin restrictions
                        styleTarget = styleTarget.contentDocument.head;
                    } catch (e) {
                        styleTarget = null;
                    }
                    memo[target] = styleTarget;
                }
                return memo[target];
            };
        }();
        var singleton = null;
        var singletonCounter = 0;
        var stylesInsertedAtTop = [];
        var fixUrls = __webpack_require__(78);
        module.exports = function(list, options) {
            if ("undefined" !== typeof DEBUG && DEBUG && "object" !== typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
            options = options || {};
            options.attrs = "object" === typeof options.attrs ? options.attrs : {};
            // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
            // tags it will allow on a page
            options.singleton || "boolean" === typeof options.singleton || (options.singleton = isOldIE());
            // By default, add <style> tags to the <head> element
            options.insertInto || (options.insertInto = "head");
            // By default, add <style> tags to the bottom of the target
            options.insertAt || (options.insertAt = "bottom");
            var styles = listToStyles(list, options);
            addStylesToDom(styles, options);
            return function(newList) {
                var mayRemove = [];
                for (var i = 0; i < styles.length; i++) {
                    var item = styles[i];
                    var domStyle = stylesInDom[item.id];
                    domStyle.refs--;
                    mayRemove.push(domStyle);
                }
                if (newList) {
                    var newStyles = listToStyles(newList, options);
                    addStylesToDom(newStyles, options);
                }
                for (var i = 0; i < mayRemove.length; i++) {
                    var domStyle = mayRemove[i];
                    if (0 === domStyle.refs) {
                        for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
                        delete stylesInDom[domStyle.id];
                    }
                }
            };
        };
        function addStylesToDom(styles, options) {
            for (var i = 0; i < styles.length; i++) {
                var item = styles[i];
                var domStyle = stylesInDom[item.id];
                if (domStyle) {
                    domStyle.refs++;
                    for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j](item.parts[j]);
                    for (;j < item.parts.length; j++) domStyle.parts.push(addStyle(item.parts[j], options));
                } else {
                    var parts = [];
                    for (var j = 0; j < item.parts.length; j++) parts.push(addStyle(item.parts[j], options));
                    stylesInDom[item.id] = {
                        id: item.id,
                        refs: 1,
                        parts: parts
                    };
                }
            }
        }
        function listToStyles(list, options) {
            var styles = [];
            var newStyles = {};
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var id = options.base ? item[0] + options.base : item[0];
                var css = item[1];
                var media = item[2];
                var sourceMap = item[3];
                var part = {
                    css: css,
                    media: media,
                    sourceMap: sourceMap
                };
                newStyles[id] ? newStyles[id].parts.push(part) : styles.push(newStyles[id] = {
                    id: id,
                    parts: [ part ]
                });
            }
            return styles;
        }
        function insertStyleElement(options, style) {
            var target = getElement(options.insertInto);
            if (!target) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];
            if ("top" === options.insertAt) {
                lastStyleElementInsertedAtTop ? lastStyleElementInsertedAtTop.nextSibling ? target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling) : target.appendChild(style) : target.insertBefore(style, target.firstChild);
                stylesInsertedAtTop.push(style);
            } else if ("bottom" === options.insertAt) target.appendChild(style); else {
                if ("object" !== typeof options.insertAt || !options.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
                var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
                target.insertBefore(style, nextSibling);
            }
        }
        function removeStyleElement(style) {
            if (null === style.parentNode) return false;
            style.parentNode.removeChild(style);
            var idx = stylesInsertedAtTop.indexOf(style);
            idx >= 0 && stylesInsertedAtTop.splice(idx, 1);
        }
        function createStyleElement(options) {
            var style = document.createElement("style");
            options.attrs.type = "text/css";
            addAttrs(style, options.attrs);
            insertStyleElement(options, style);
            return style;
        }
        function createLinkElement(options) {
            var link = document.createElement("link");
            options.attrs.type = "text/css";
            options.attrs.rel = "stylesheet";
            addAttrs(link, options.attrs);
            insertStyleElement(options, link);
            return link;
        }
        function addAttrs(el, attrs) {
            Object.keys(attrs).forEach(function(key) {
                el.setAttribute(key, attrs[key]);
            });
        }
        function addStyle(obj, options) {
            var style, update, remove, result;
            // If a transform function was defined, run it on the css
            if (options.transform && obj.css) {
                result = options.transform(obj.css);
                if (!result) // If the transform function returns a falsy value, don't add this css.
                // This allows conditional loading of css
                return function() {};
                // If transform returns a value, use that instead of the original css.
                // This allows running runtime transformations on the css.
                obj.css = result;
            }
            if (options.singleton) {
                var styleIndex = singletonCounter++;
                style = singleton || (singleton = createStyleElement(options));
                update = applyToSingletonTag.bind(null, style, styleIndex, false);
                remove = applyToSingletonTag.bind(null, style, styleIndex, true);
            } else if (obj.sourceMap && "function" === typeof URL && "function" === typeof URL.createObjectURL && "function" === typeof URL.revokeObjectURL && "function" === typeof Blob && "function" === typeof btoa) {
                style = createLinkElement(options);
                update = updateLink.bind(null, style, options);
                remove = function() {
                    removeStyleElement(style);
                    style.href && URL.revokeObjectURL(style.href);
                };
            } else {
                style = createStyleElement(options);
                update = applyToTag.bind(null, style);
                remove = function() {
                    removeStyleElement(style);
                };
            }
            update(obj);
            return function(newObj) {
                if (newObj) {
                    if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) return;
                    update(obj = newObj);
                } else remove();
            };
        }
        var replaceText = function() {
            var textStore = [];
            return function(index, replacement) {
                textStore[index] = replacement;
                return textStore.filter(Boolean).join("\n");
            };
        }();
        function applyToSingletonTag(style, index, remove, obj) {
            var css = remove ? "" : obj.css;
            if (style.styleSheet) style.styleSheet.cssText = replaceText(index, css); else {
                var cssNode = document.createTextNode(css);
                var childNodes = style.childNodes;
                childNodes[index] && style.removeChild(childNodes[index]);
                childNodes.length ? style.insertBefore(cssNode, childNodes[index]) : style.appendChild(cssNode);
            }
        }
        function applyToTag(style, obj) {
            var css = obj.css;
            var media = obj.media;
            media && style.setAttribute("media", media);
            if (style.styleSheet) style.styleSheet.cssText = css; else {
                for (;style.firstChild; ) style.removeChild(style.firstChild);
                style.appendChild(document.createTextNode(css));
            }
        }
        function updateLink(link, options, obj) {
            var css = obj.css;
            var sourceMap = obj.sourceMap;
            /*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
            var autoFixUrls = void 0 === options.convertToAbsoluteUrls && sourceMap;
            (options.convertToAbsoluteUrls || autoFixUrls) && (css = fixUrls(css));
            sourceMap && (// http://stackoverflow.com/a/26603875
            css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */");
            var blob = new Blob([ css ], {
                type: "text/css"
            });
            var oldSrc = link.href;
            link.href = URL.createObjectURL(blob);
            oldSrc && URL.revokeObjectURL(oldSrc);
        }
    }, /* 7 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export parseHTML */
        var DOCUMENT = document;
        /**
 * Parses a string into native HTML element
 *
 * @function parseHTML
 *
 * @param {String} htmlString
 *
 * @return {DocumentFragment}
 *  A document fragmenet object with all of the HTMl in it.
 *
 * @example
 *
 * var myUI = parseHTML("<div>something</div>");
 *  // myUI.firstChild === <div>something</div>
 *
 *
 * @example
 *
 * var myUI = parseHTML("<!-- Comment here --> <div>Something</div>");
 *  // myUI.firstChild === <!-- Comment here -->
 *  // myUI..childNodes[0] === <div>Something</div>
 *
 */
        function parseHTML(htmlString) {
            var fragment = DOCUMENT.createDocumentFragment(), div = DOCUMENT.createElement("div");
            // If fragment does not have a .children porperty, then create it by
            // point it at childNodes
            "children" in fragment || (fragment.children = fragment.childNodes);
            div.innerHTML = htmlString;
            div.childNodes.length && Array.prototype.slice.call(div.childNodes, 0).forEach(function(node) {
                fragment.appendChild(node);
            });
            return fragment;
        }
        /* harmony default export */
        __webpack_exports__.a = parseHTML;
    }, /* 8 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export Widget */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Compose__ = __webpack_require__(16);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__domutils_domAddClass__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__domutils_domRemoveClass__ = __webpack_require__(11);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__domutils_domChildren__ = __webpack_require__(25);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__styles_widget_less__ = __webpack_require__(76);
        /* harmony import */
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__styles_widget_less__);
        /**
 * Base class for a Widget
 *
 * @class Widget
 * @extends Compose
 *
 */
        var Widget = __WEBPACK_IMPORTED_MODULE_0__Compose__.a.extend(/** @lends Widget.prototype */ {
            init: function() {
                var me = this;
                me.onDestroy(function() {
                    _destroy.call(me);
                });
            },
            destroy: function() {
                _destroy.call(this);
                __WEBPACK_IMPORTED_MODULE_0__Compose__.a.prototype.destroy.call(this);
            },
            /**
     * The widget HTML Element
     *
     * @type {HTMLElement}
     */
            $ui: null,
            /**
     * Returns the Widget DOM element.
     * If current object instance has a property name `$ui`, that will be returned
     * by this method. Should be implemented by specfic widget if this pattern
     * is not implemented.
     *
     * @return {HTMLElement}
     */
            getEle: function() {
                return this.$ui;
            },
            /**
     * Checks if the Widget is visible.  Depends on `getEle` returning the widget's
     * UI element.
     *
     * @return {Boolean}
     */
            isVisible: function() {
                var $ui = this.getEle();
                return !!($ui.offsetWidth || $ui.offsetHeight || $ui.getClientRects().length);
            },
            /**
     * Checks the widget visibility (`isVisible`) and then updates it to
     * the opposite state.
     */
            toggle: function() {
                var me = this;
                me.isVisible() ? me.hide() : me.show();
            },
            /**
     * Makes widget UI visible
     */
            show: function() {
                Object(__WEBPACK_IMPORTED_MODULE_2__domutils_domRemoveClass__.a)(this.getEle(), "my-widget-hide");
            },
            /**
     * Hides the widget UI
     */
            hide: function() {
                Object(__WEBPACK_IMPORTED_MODULE_1__domutils_domAddClass__.a)(this.getEle(), "my-widget-hide");
            },
            /**
     * Appends the Widget to a given element.
     *
     * @param {HTMLElement|Widget} cntr
     * @param {Number} [atPosition]
     *  Position where element should be placed inside of the `cntr`.
     *  Default is at the bottom (after last item). Zero based
     */
            appendTo: function(cntr, atPosition) {
                if (!cntr) return;
                var $ele = this.getEle();
                var $cntrEle = cntr.appendChild ? cntr : cntr.getEle ? cntr.getEle() : null;
                if (!$cntrEle) return;
                if ("undefined" === typeof atPosition) {
                    $cntrEle.appendChild($ele);
                    return;
                }
                var cntrChildren = Object(__WEBPACK_IMPORTED_MODULE_3__domutils_domChildren__.a)($cntrEle);
                cntrChildren[atPosition] ? $cntrEle.insertBefore($ele, cntrChildren[atPosition]) : $cntrEle.appendChild($ele);
            },
            /**
     * Removes the Widget from it's parent (removes it from DOM)
     */
            detach: function() {
                var ui = this.getEle();
                ui && ui.parentNode && ui.parentNode.removeChild(ui);
            }
        });
        /**
 * @private
 */
        function _destroy() {
            this.detach();
            this.$ui = null;
        }
        /* harmony default export */
        __webpack_exports__.a = Widget;
    }, /* 9 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domFind */
        /**
 * Finds Elements within a given HTML Element using `querySelectorAll` and
 * return an Array with those elements.
 *
 * @function domFind
 *
 * @param {HTMLElement} domEle
 * @param {String} selector
 *
 * @returns {Array<HTMLElement>}
 */
        function domFind(domEle, selector) {
            return Array.prototype.slice.call(domEle.querySelectorAll(selector));
        }
        /* harmony default export */
        __webpack_exports__.a = domFind;
    }, /* 10 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domAddEventListener */
        /**
 * Adds an event handler to a DOM element and returns back an
 * object that allows for removal of the event.
 *
 * @function domAddEventListener
 *
 * @param {HTMLElement} ele
 * @param {String} event
 *  The event to listen to (ex. `click`). Multiple events can be defined
 *  by separating them with whitespace
 * @param {Function} callback
 * @param {Boolean} [capture]
 *
 * @return DOMEventListener
 *
 * @example
 *
 * var listener = domAddEventHandler(myEle, "click", function(){});
 * ...
 * listener.remove();
 */
        function domAddEventListener(ele, event, callback, capture) {
            var events = event.split(/\s+/);
            var evListeners = {};
            events.forEach(function(evName) {
                ele.addEventListener(evName, callback, capture);
                evListeners[evName] = {
                    remove: function() {
                        return ele.removeEventListener(evName, callback, capture);
                    }
                };
            });
            /**
     * A DOM Event listener.
     *
     * @typedef {Object} DOMEventListener
     *
     * @property {Function} remove
     * @property {Object} listeners
     *  List of listeners that were bound to the DOM element. Each listeners has a
     *  corresponding `.remove()` method.
     */
            return Object.create({
                listeners: evListeners,
                remove: function() {
                    events.forEach(function(evName) {
                        return evListeners[evName].remove();
                    });
                }
            });
        }
        /* harmony default export */
        __webpack_exports__.a = domAddEventListener;
    }, /* 11 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domRemoveClass */
        /**
 * removes a class from an element
 *
 * @function domRemoveClass
 *
 * @param {HTMLElement} el
 * @param {String} cssClass
 */
        function domRemoveClass(el, cssClass) {
            return el.classList.remove(cssClass);
        }
        /* harmony default export */
        __webpack_exports__.a = domRemoveClass;
    }, /* 12 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_es7_fetch__ = __webpack_require__(58);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_parseXML__ = __webpack_require__(29);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_es6_promise__ = __webpack_require__(13);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__doesMsgHaveError__ = __webpack_require__(30);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__getMsgError__ = __webpack_require__(28);
        var fetch = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_es7_fetch__.a.fetch;
        /**
 * Handles API calls to SharePoint using the low level ES7 fetch() api,
 * thus is has the same input signature. Response will be processed for
 * Sharepoint Status errors and then data parsed, returning instead an
 * object.
 *
 * @param {String|Request} input
 * @param {Object} init
 *
 * @return {Promise<ApiFetchResponse, Error>}
 *  Promise is resolved with an object containing the following:
 *
 *      {
 *          content:    {},         // XMLDocument
 *          msgType:    'xml',      // String
 *          response:   response    // A Response object
 *      }
 *
 */
        var apiFetch = function(input, init) {
            return fetch(input, init).then(parseApiResponse).then(checkForSharePointErrors).then(checkForHttpErrors);
        }, /**
 * Checks the HTTP resposne to see if there was an HTTP error.
 *
 * @private
 *
 * @param response
 *
 * @returns {*}
 */
        checkForHttpErrors = function(response) {
            var res = response.status ? response : response.response ? response.response : {};
            // If server returned an error code, then reject promise
            if (res.status >= 200 && res.status < 300) return response;
            var error = new Error("HTTP " + res.status + ": " + res.statusText + " (" + res.url + ")");
            error.response = response;
            return __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_es6_promise__.a.reject(error);
        }, /**
 * Parses the API response into either XML or JSON
 *
 * @private
 *
 * @param response
 * @returns {*}
 */
        parseApiResponse = function(response) {
            // If the message return is JSON, then parse that.
            if (-1 !== response.headers.map["content-type"].join("").toLowerCase().indexOf("application/json")) return response.json().then(function(content) {
                return {
                    content: content,
                    msgType: "json",
                    response: response
                };
            });
            // Get the response text and then parse it.
            return response.text().then(function(responseString) {
                /**
         * A sharepoint API response
         *
         * @typedef {Object} ApiFetchResponse
         *
         * @property {Document} content
         * @property {String} msgType
         *  Valid value: `xml`
         * @property {Object} response
         *  API fetch response
         */
                return {
                    content: Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_parseXML__.a)(responseString),
                    msgType: responseString ? "xml" : "",
                    // responseString could be empty - example: HTTP 403
                    response: response
                };
            });
        }, /**
 * Checks the API response for any SharePoint processing errors.
 *
 * @private
 *
 * @param {Object} response
 *
 * @returns {*}
 */
        checkForSharePointErrors = function(response) {
            if ("xml" === response.msgType && Object(__WEBPACK_IMPORTED_MODULE_3__doesMsgHaveError__.a)(response.content)) {
                var error = new Error(Object(__WEBPACK_IMPORTED_MODULE_4__getMsgError__.a)(response.content));
                error.response = response;
                return __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_es6_promise__.a.reject(error);
            }
            return response;
        };
        /* harmony default export */
        __webpack_exports__.a = apiFetch;
    }, /* 13 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* WEBPACK VAR INJECTION */
        (function(process, global, module) {
            /* unused harmony export Promise */
            var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            /**
 * LOCAL CHANGES (Paul Tavares):
 *
 * -    Changed to ensure that auto-polyfill does not override the native implementation.
 *      Changes done to .default() method.
 * -    Changed AMD so that it returns the .promise (and not the namespace with promise and polyfill),
 * -    Comment out code in lib$es6$promise$asap$$attemptVertx() which was causing
 *      webpack to try to load a module called Vertx (what?)
 *
 * See: https://github.com/stefanpenner/es6-promise/issues/140#issuecomment-192913875
 *
 */
            var polyfill;
            /*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
 * @version   3.2.1
 */
            (function() {
                /* jshint ignore:start */
                function lib$es6$promise$utils$$objectOrFunction(x) {
                    return "function" === typeof x || "object" === ("undefined" === typeof x ? "undefined" : _typeof(x)) && null !== x;
                }
                function lib$es6$promise$utils$$isFunction(x) {
                    return "function" === typeof x;
                }
                var lib$es6$promise$utils$$_isArray;
                lib$es6$promise$utils$$_isArray = Array.isArray ? Array.isArray : function(x) {
                    return "[object Array]" === Object.prototype.toString.call(x);
                };
                var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
                var lib$es6$promise$asap$$len = 0;
                var lib$es6$promise$asap$$customSchedulerFn;
                var lib$es6$promise$asap$$asap = function(callback, arg) {
                    lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
                    lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
                    lib$es6$promise$asap$$len += 2;
                    2 === lib$es6$promise$asap$$len && (// If len is 2, that means that we need to schedule an async flush.
                    // If additional callbacks are queued before the queue is flushed, they
                    // will be processed by this flush that we are scheduling.
                    lib$es6$promise$asap$$customSchedulerFn ? lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush) : lib$es6$promise$asap$$scheduleFlush());
                };
                function lib$es6$promise$asap$$setScheduler(scheduleFn) {
                    lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
                }
                function lib$es6$promise$asap$$setAsap(asapFn) {
                    lib$es6$promise$asap$$asap = asapFn;
                }
                var lib$es6$promise$asap$$browserWindow = "undefined" !== typeof window ? window : void 0;
                var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
                var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
                var lib$es6$promise$asap$$isNode = "undefined" === typeof self && "undefined" !== typeof process && "[object process]" === {}.toString.call(process);
                // test for web worker but not in IE10
                var lib$es6$promise$asap$$isWorker = "undefined" !== typeof Uint8ClampedArray && "undefined" !== typeof importScripts && "undefined" !== typeof MessageChannel;
                function lib$es6$promise$asap$$useSetTimeout() {
                    return function() {
                        setTimeout(lib$es6$promise$asap$$flush, 1);
                    };
                }
                var lib$es6$promise$asap$$queue = new Array(1e3);
                function lib$es6$promise$asap$$flush() {
                    for (var i = 0; i < lib$es6$promise$asap$$len; i += 2) {
                        var callback = lib$es6$promise$asap$$queue[i];
                        var arg = lib$es6$promise$asap$$queue[i + 1];
                        callback(arg);
                        lib$es6$promise$asap$$queue[i] = void 0;
                        lib$es6$promise$asap$$queue[i + 1] = void 0;
                    }
                    lib$es6$promise$asap$$len = 0;
                }
                var lib$es6$promise$asap$$scheduleFlush;
                // Decide what async method to use to triggering processing of queued callbacks:
                lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$isNode ? // node
                function() {
                    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
                    // see https://github.com/cujojs/when/issues/410 for details
                    return function() {
                        process.nextTick(lib$es6$promise$asap$$flush);
                    };
                }() : lib$es6$promise$asap$$BrowserMutationObserver ? function() {
                    var iterations = 0;
                    var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
                    var node = document.createTextNode("");
                    observer.observe(node, {
                        characterData: true
                    });
                    return function() {
                        node.data = iterations = ++iterations % 2;
                    };
                }() : lib$es6$promise$asap$$isWorker ? // web worker
                function() {
                    var channel = new MessageChannel();
                    channel.port1.onmessage = lib$es6$promise$asap$$flush;
                    return function() {
                        channel.port2.postMessage(0);
                    };
                }() : void 0 === lib$es6$promise$asap$$browserWindow && true ? function() {
                    //try {
                    //  var r = require;
                    //  var vertx = r('vertx');
                    //  lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
                    //  return lib$es6$promise$asap$$useVertxTimer();
                    //} catch(e) {
                    //}
                    return lib$es6$promise$asap$$useSetTimeout();
                }() : lib$es6$promise$asap$$useSetTimeout();
                function lib$es6$promise$then$$then(onFulfillment, onRejection) {
                    var parent = this;
                    var child = new this.constructor(lib$es6$promise$$internal$$noop);
                    void 0 === child[lib$es6$promise$$internal$$PROMISE_ID] && lib$es6$promise$$internal$$makePromise(child);
                    var state = parent._state;
                    if (state) {
                        var callback = arguments[state - 1];
                        lib$es6$promise$asap$$asap(function() {
                            lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
                        });
                    } else lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
                    return child;
                }
                var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
                function lib$es6$promise$promise$resolve$$resolve(object) {
                    /*jshint validthis:true */
                    var Constructor = this;
                    if (object && "object" === ("undefined" === typeof object ? "undefined" : _typeof(object)) && object.constructor === Constructor) return object;
                    var promise = new Constructor(lib$es6$promise$$internal$$noop);
                    lib$es6$promise$$internal$$resolve(promise, object);
                    return promise;
                }
                var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
                var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);
                function lib$es6$promise$$internal$$noop() {}
                var lib$es6$promise$$internal$$PENDING = void 0;
                var lib$es6$promise$$internal$$FULFILLED = 1;
                var lib$es6$promise$$internal$$REJECTED = 2;
                var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
                function lib$es6$promise$$internal$$selfFulfillment() {
                    return new TypeError("You cannot resolve a promise with itself");
                }
                function lib$es6$promise$$internal$$cannotReturnOwn() {
                    return new TypeError("A promises callback cannot return that same promise.");
                }
                function lib$es6$promise$$internal$$getThen(promise) {
                    try {
                        return promise.then;
                    } catch (error) {
                        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
                        return lib$es6$promise$$internal$$GET_THEN_ERROR;
                    }
                }
                function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
                    try {
                        then.call(value, fulfillmentHandler, rejectionHandler);
                    } catch (e) {
                        return e;
                    }
                }
                function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
                    lib$es6$promise$asap$$asap(function(promise) {
                        var sealed = false;
                        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
                            if (sealed) return;
                            sealed = true;
                            thenable !== value ? lib$es6$promise$$internal$$resolve(promise, value) : lib$es6$promise$$internal$$fulfill(promise, value);
                        }, function(reason) {
                            if (sealed) return;
                            sealed = true;
                            lib$es6$promise$$internal$$reject(promise, reason);
                        }, "Settle: " + (promise._label || " unknown promise"));
                        if (!sealed && error) {
                            sealed = true;
                            lib$es6$promise$$internal$$reject(promise, error);
                        }
                    }, promise);
                }
                function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
                    thenable._state === lib$es6$promise$$internal$$FULFILLED ? lib$es6$promise$$internal$$fulfill(promise, thenable._result) : thenable._state === lib$es6$promise$$internal$$REJECTED ? lib$es6$promise$$internal$$reject(promise, thenable._result) : lib$es6$promise$$internal$$subscribe(thenable, void 0, function(value) {
                        lib$es6$promise$$internal$$resolve(promise, value);
                    }, function(reason) {
                        lib$es6$promise$$internal$$reject(promise, reason);
                    });
                }
                function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
                    maybeThenable.constructor === promise.constructor && then === lib$es6$promise$then$$default && constructor.resolve === lib$es6$promise$promise$resolve$$default ? lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable) : then === lib$es6$promise$$internal$$GET_THEN_ERROR ? lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error) : void 0 === then ? lib$es6$promise$$internal$$fulfill(promise, maybeThenable) : lib$es6$promise$utils$$isFunction(then) ? lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then) : lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
                }
                function lib$es6$promise$$internal$$resolve(promise, value) {
                    promise === value ? lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment()) : lib$es6$promise$utils$$objectOrFunction(value) ? lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value)) : lib$es6$promise$$internal$$fulfill(promise, value);
                }
                function lib$es6$promise$$internal$$publishRejection(promise) {
                    promise._onerror && promise._onerror(promise._result);
                    lib$es6$promise$$internal$$publish(promise);
                }
                function lib$es6$promise$$internal$$fulfill(promise, value) {
                    if (promise._state !== lib$es6$promise$$internal$$PENDING) return;
                    promise._result = value;
                    promise._state = lib$es6$promise$$internal$$FULFILLED;
                    0 !== promise._subscribers.length && lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
                }
                function lib$es6$promise$$internal$$reject(promise, reason) {
                    if (promise._state !== lib$es6$promise$$internal$$PENDING) return;
                    promise._state = lib$es6$promise$$internal$$REJECTED;
                    promise._result = reason;
                    lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
                }
                function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
                    var subscribers = parent._subscribers;
                    var length = subscribers.length;
                    parent._onerror = null;
                    subscribers[length] = child;
                    subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
                    subscribers[length + lib$es6$promise$$internal$$REJECTED] = onRejection;
                    0 === length && parent._state && lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
                }
                function lib$es6$promise$$internal$$publish(promise) {
                    var subscribers = promise._subscribers;
                    var settled = promise._state;
                    if (0 === subscribers.length) return;
                    var child, callback, detail = promise._result;
                    for (var i = 0; i < subscribers.length; i += 3) {
                        child = subscribers[i];
                        callback = subscribers[i + settled];
                        child ? lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail) : callback(detail);
                    }
                    promise._subscribers.length = 0;
                }
                function lib$es6$promise$$internal$$ErrorObject() {
                    this.error = null;
                }
                var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
                function lib$es6$promise$$internal$$tryCatch(callback, detail) {
                    try {
                        return callback(detail);
                    } catch (e) {
                        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
                        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
                    }
                }
                function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
                    var value, error, succeeded, failed, hasCallback = lib$es6$promise$utils$$isFunction(callback);
                    if (hasCallback) {
                        value = lib$es6$promise$$internal$$tryCatch(callback, detail);
                        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
                            failed = true;
                            error = value.error;
                            value = null;
                        } else succeeded = true;
                        if (promise === value) {
                            lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
                            return;
                        }
                    } else {
                        value = detail;
                        succeeded = true;
                    }
                    promise._state !== lib$es6$promise$$internal$$PENDING || (hasCallback && succeeded ? lib$es6$promise$$internal$$resolve(promise, value) : failed ? lib$es6$promise$$internal$$reject(promise, error) : settled === lib$es6$promise$$internal$$FULFILLED ? lib$es6$promise$$internal$$fulfill(promise, value) : settled === lib$es6$promise$$internal$$REJECTED && lib$es6$promise$$internal$$reject(promise, value));
                }
                function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
                    try {
                        resolver(function(value) {
                            lib$es6$promise$$internal$$resolve(promise, value);
                        }, function(reason) {
                            lib$es6$promise$$internal$$reject(promise, reason);
                        });
                    } catch (e) {
                        lib$es6$promise$$internal$$reject(promise, e);
                    }
                }
                var lib$es6$promise$$internal$$id = 0;
                function lib$es6$promise$$internal$$nextId() {
                    return lib$es6$promise$$internal$$id++;
                }
                function lib$es6$promise$$internal$$makePromise(promise) {
                    promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
                    promise._state = void 0;
                    promise._result = void 0;
                    promise._subscribers = [];
                }
                function lib$es6$promise$promise$all$$all(entries) {
                    return new lib$es6$promise$enumerator$$default(this, entries).promise;
                }
                var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
                function lib$es6$promise$promise$race$$race(entries) {
                    /*jshint validthis:true */
                    var Constructor = this;
                    return new Constructor(lib$es6$promise$utils$$isArray(entries) ? function(resolve, reject) {
                        var length = entries.length;
                        for (var i = 0; i < length; i++) Constructor.resolve(entries[i]).then(resolve, reject);
                    } : function(resolve, reject) {
                        reject(new TypeError("You must pass an array to race."));
                    });
                }
                var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
                function lib$es6$promise$promise$reject$$reject(reason) {
                    /*jshint validthis:true */
                    var Constructor = this;
                    var promise = new Constructor(lib$es6$promise$$internal$$noop);
                    lib$es6$promise$$internal$$reject(promise, reason);
                    return promise;
                }
                var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
                function lib$es6$promise$promise$$needsResolver() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                }
                function lib$es6$promise$promise$$needsNew() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                }
                var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
                /**
    Promise objects represent the eventual result of an asynchronous operation. The
    primary way of interacting with a promise is through its `then` method, which
    registers callbacks to receive either a promise's eventual value or the reason
    why the promise cannot be fulfilled.
      Terminology
    -----------
      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
    - `thenable` is an object or function that defines a `then` method.
    - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
    - `exception` is a value that is thrown using the throw statement.
    - `reason` is a value that indicates why a promise was rejected.
    - `settled` the final resting state of a promise, fulfilled or rejected.
      A promise can be in one of three states: pending, fulfilled, or rejected.
      Promises that are fulfilled have a fulfillment value and are in the fulfilled
    state.  Promises that are rejected have a rejection reason and are in the
    rejected state.  A fulfillment value is never a thenable.
      Promises can also be said to *resolve* a value.  If this value is also a
    promise, then the original promise's settled state will match the value's
    settled state.  So a promise that *resolves* a promise that rejects will
    itself reject, and a promise that *resolves* a promise that fulfills will
    itself fulfill.
        Basic Usage:
    ------------
      ```js
    var promise = new Promise(function(resolve, reject) {
      // on success
      resolve(value);
        // on failure
      reject(reason);
    });
      promise.then(function(value) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```
      Advanced Usage:
    ---------------
      Promises shine when abstracting away asynchronous interactions such as
    `XMLHttpRequest`s.
      ```js
    function getJSON(url) {
      return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
          xhr.open('GET', url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();
          function handler() {
          if (this.readyState === this.DONE) {
            if (this.status === 200) {
              resolve(this.response);
            } else {
              reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
            }
          }
        };
      });
    }
      getJSON('/posts.json').then(function(json) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```
      Unlike callbacks, promises are great composable primitives.
      ```js
    Promise.all([
      getJSON('/posts'),
      getJSON('/comments')
    ]).then(function(values){
      values[0] // => postsJSON
      values[1] // => commentsJSON
        return values;
    });
    ```
      @class Promise
    @param {function} resolver
    Useful for tooling.
    @constructor
  */
                function lib$es6$promise$promise$$Promise(resolver) {
                    this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
                    this._result = this._state = void 0;
                    this._subscribers = [];
                    if (lib$es6$promise$$internal$$noop !== resolver) {
                        "function" !== typeof resolver && lib$es6$promise$promise$$needsResolver();
                        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
                    }
                }
                lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
                lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
                lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
                lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
                lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
                lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
                lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
                lib$es6$promise$promise$$Promise.prototype = {
                    constructor: lib$es6$promise$promise$$Promise,
                    /**
      The primary way of interacting with a promise is through its `then` method,
      which registers callbacks to receive either a promise's eventual value or the
      reason why the promise cannot be fulfilled.
        ```js
      findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
      ```
        Chaining
      --------
        The return value of `then` is itself a promise.  This second, 'downstream'
      promise is resolved with the return value of the first promise's fulfillment
      or rejection handler, or rejected if the handler throws an exception.
        ```js
      findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });
        findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
      ```
      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
        ```js
      findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
      ```
        Assimilation
      ------------
        Sometimes the value you want to propagate to a downstream promise can only be
      retrieved asynchronously. This can be achieved by returning a promise in the
      fulfillment or rejection handler. The downstream promise will then be pending
      until the returned promise is settled. This is called *assimilation*.
        ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
      ```
        If the assimliated promise rejects, then the downstream promise will also reject.
        ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
      ```
        Simple Example
      --------------
        Synchronous Example
        ```javascript
      var result;
        try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
      ```
        Errback Example
        ```js
      findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
      ```
        Promise Example;
        ```javascript
      findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
      ```
        Advanced Example
      --------------
        Synchronous Example
        ```javascript
      var author, books;
        try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
      ```
        Errback Example
        ```js
        function foundBooks(books) {
        }
        function failure(reason) {
        }
        findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
      ```
        Promise Example;
        ```javascript
      findAuthor().
        then(findBooksByAuthor).
        then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
      ```
        @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      Useful for tooling.
      @return {Promise}
    */
                    then: lib$es6$promise$then$$default,
                    /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.
        ```js
      function findAuthor(){
        throw new Error('couldn't find that author');
      }
        // synchronous
      try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }
        // async with promises
      findAuthor().catch(function(reason){
        // something went wrong
      });
      ```
        @method catch
      @param {Function} onRejection
      Useful for tooling.
      @return {Promise}
    */
                    catch: function(onRejection) {
                        return this.then(null, onRejection);
                    }
                };
                var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
                function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
                    this._instanceConstructor = Constructor;
                    this.promise = new Constructor(lib$es6$promise$$internal$$noop);
                    this.promise[lib$es6$promise$$internal$$PROMISE_ID] || lib$es6$promise$$internal$$makePromise(this.promise);
                    if (Array.isArray(input)) {
                        this._input = input;
                        this.length = input.length;
                        this._remaining = input.length;
                        this._result = new Array(this.length);
                        if (0 === this.length) lib$es6$promise$$internal$$fulfill(this.promise, this._result); else {
                            this.length = this.length || 0;
                            this._enumerate();
                            0 === this._remaining && lib$es6$promise$$internal$$fulfill(this.promise, this._result);
                        }
                    } else lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
                }
                function lib$es6$promise$enumerator$$validationError() {
                    return new Error("Array Methods must be provided an Array");
                }
                lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
                    var length = this.length;
                    var input = this._input;
                    for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) this._eachEntry(input[i], i);
                };
                lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
                    var c = this._instanceConstructor;
                    var resolve = c.resolve;
                    if (resolve === lib$es6$promise$promise$resolve$$default) {
                        var then = lib$es6$promise$$internal$$getThen(entry);
                        if (then === lib$es6$promise$then$$default && entry._state !== lib$es6$promise$$internal$$PENDING) this._settledAt(entry._state, i, entry._result); else if ("function" !== typeof then) {
                            this._remaining--;
                            this._result[i] = entry;
                        } else if (c === lib$es6$promise$promise$$default) {
                            var promise = new c(lib$es6$promise$$internal$$noop);
                            lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
                            this._willSettleAt(promise, i);
                        } else this._willSettleAt(new c(function(resolve) {
                            resolve(entry);
                        }), i);
                    } else this._willSettleAt(resolve(entry), i);
                };
                lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
                    var promise = this.promise;
                    if (promise._state === lib$es6$promise$$internal$$PENDING) {
                        this._remaining--;
                        state === lib$es6$promise$$internal$$REJECTED ? lib$es6$promise$$internal$$reject(promise, value) : this._result[i] = value;
                    }
                    0 === this._remaining && lib$es6$promise$$internal$$fulfill(promise, this._result);
                };
                lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
                    var enumerator = this;
                    lib$es6$promise$$internal$$subscribe(promise, void 0, function(value) {
                        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
                    }, function(reason) {
                        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
                    });
                };
                function lib$es6$promise$polyfill$$polyfill() {
                    var local;
                    if ("undefined" !== typeof global) local = global; else if ("undefined" !== typeof self) local = self; else try {
                        local = Function("return this")();
                    } catch (e) {
                        throw new Error("polyfill failed because global object is unavailable in this environment");
                    }
                    var P = local.Promise;
                    if (P) {
                        //if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
                        lib$es6$promise$umd$$ES6Promise.Promise = P;
                        return;
                    }
                    local.Promise = lib$es6$promise$promise$$default;
                }
                var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
                var lib$es6$promise$umd$$ES6Promise = polyfill = {
                    Promise: lib$es6$promise$promise$$default,
                    polyfill: lib$es6$promise$polyfill$$default
                };
                lib$es6$promise$polyfill$$default();
                "function" === typeof define && __webpack_require__(61) ? define(function() {
                    return lib$es6$promise$umd$$ES6Promise.Promise;
                }) : "undefined" !== typeof module && module.exports ? module.exports = lib$es6$promise$umd$$ES6Promise.Promise : "undefined" !== typeof this && (this.ES6Promise = lib$es6$promise$umd$$ES6Promise);
            }).call(this);
            var Promise = polyfill.Promise;
            /* harmony default export */
            __webpack_exports__.a = Promise;
        }).call(__webpack_exports__, __webpack_require__(59), __webpack_require__(35), __webpack_require__(60)(module));
    }, /* 14 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_es6_promise__ = __webpack_require__(13);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__sputils_apiFetch__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__sputils_cache__ = __webpack_require__(15);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__sputils_getFullUrl__ = __webpack_require__(64);
        /* global _spPageContextInfo, L_Menu_BaseUrl */
        /**
 * Returns a Promise that resolves to the current site Web URL.
 * URL will end with a forward slash (/) and will always be a fully qualified
 * url (starting with http...).
 *
 * If this function is unable to determine the Site Url from data already
 * loaded, then it will call a webservice to retrieve it.
 *
 * @function
 *
 * @param {String} [pageUrl=document.location.href]
 *  The URL from where the Base Site Web URL will be obtained. Defaults to
 *  current page URL.
 *
 * @return {Promise}
 *  Resolves to a String representing the base Web URL of the site.
 *  Rejects if unable to determine the web URL.
 *
 * @throws Unable to determine site url
 *
 */
        var getSiteUrl = function(pageUrl) {
            var siteUrlResponse, siteUrl, page = "", isThisPage = false, errorMessage = "getSiteUrl(): Unable to determine site url from " + pageUrl, cacheKey = "getSiteWebUrl():", docLocation = document.location;
            if (pageUrl) page = pageUrl; else {
                page = docLocation.href;
                isThisPage = true;
            }
            // Get only the pure url up to the page... no URL params or hash.
            page.indexOf("?") > -1 ? page = page.substr(0, page.indexOf("?")) : page.indexOf("#") > -1 && (page = page.substr(0, page.indexOf("#")));
            cacheKey += page;
            siteUrlResponse = new __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_es6_promise__.a(function(resolve, reject) {
                if (!page) {
                    reject(new Error(errorMessage));
                    return;
                }
                // If the URL site is already known, return it.
                if (__WEBPACK_IMPORTED_MODULE_2__sputils_cache__.a.get(cacheKey)) {
                    resolve(__WEBPACK_IMPORTED_MODULE_2__sputils_cache__.a.get(cacheKey));
                    return;
                }
                // If it is the current page, then try to determine the siteUrl
                // based on variables set by SharePoint
                if (isThisPage) {
                    // DO we have _spPageContextInfo to work with?
                    // Then use locate the web URL in one of several params
                    "undefined" !== typeof _spPageContextInfo && [ "webAbsoluteUrl", "webServerRelativeUrl" ].some(function(attr) {
                        if (_spPageContextInfo[attr]) {
                            siteUrl = _spPageContextInfo[attr];
                            return true;
                        }
                    });
                    // Do we have L_Menu_BaseUrl defined?
                    !siteUrl && "undefined" !== typeof L_Menu_BaseUrl && L_Menu_BaseUrl && (siteUrl = L_Menu_BaseUrl);
                    // ensure we get a full url starting with http
                    if (siteUrl) {
                        resolve(Object(__WEBPACK_IMPORTED_MODULE_3__sputils_getFullUrl__.a)(siteUrl));
                        return;
                    }
                }
                // Lets try to validate webURL against current root site collection
                // Works only if running inside of SharePoint (ex. in webpart)
                Object(__WEBPACK_IMPORTED_MODULE_1__sputils_apiFetch__.a)(Object(__WEBPACK_IMPORTED_MODULE_3__sputils_getFullUrl__.a)("/_vti_bin/Webs.asmx", true), {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/xml;charset=UTF-8"
                    },
                    body: "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><WebUrlFromPageUrl xmlns='http://schemas.microsoft.com/sharepoint/soap/' ><pageUrl>" + page + "</pageUrl></WebUrlFromPageUrl></soap:Body></soap:Envelope>"
                }).then(function(response) {
                    siteUrl = response.content.querySelector("WebUrlFromPageUrlResult").textContent;
                    resolve(Object(__WEBPACK_IMPORTED_MODULE_3__sputils_getFullUrl__.a)(siteUrl));
                }).catch(function(error) {
                    if (pageUrl) {
                        resolve(Object(__WEBPACK_IMPORTED_MODULE_3__sputils_getFullUrl__.a)(pageUrl));
                        return;
                    }
                    reject(error);
                });
            }).catch(function(error) {
                __WEBPACK_IMPORTED_MODULE_2__sputils_cache__.a.clear(cacheKey);
                return __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_es6_promise__.a.reject(error);
            });
            page && Object(__WEBPACK_IMPORTED_MODULE_2__sputils_cache__.a)(cacheKey, siteUrlResponse);
            return siteUrlResponse;
        };
        /* harmony default export */
        __webpack_exports__.a = getSiteUrl;
    }, /* 15 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /**
 * Simple caching function.
 * @function
 *
 * @param {Sting} key
 * @param {Object} value
 *
 * @return {undefined}
 *
 * Methods:
 *
 *  cache("myKey") // getter. Same as cache.get()
 *  cache("myKey", "value") // Setter. Same as cache.set();
 *  cache.clear(key)
 *  cache.clearAll()
 *  cache.get(key),
 *  cache.set(key, value),
 *  cache.isCached(key)
 *
 * Dependencies:
 *
 *  none
 *
 */
        var cache = function() {
            var cacheData = {}, fnCaller = function(key, value) {
                if (!key) return;
                // Getter
                if ("undefined" === typeof value) return fnCaller.get(key);
                // Setter
                return fnCaller.set(key, value);
            };
            /**
     * Clear specific key from cache.
     * @function cache.clear
     * @param {String} key
     */
            fnCaller.clear = function(key) {
                delete cacheData[key];
            };
            /**
     * Clears all cached data
     * @fucntion cache.clearAll
     */
            fnCaller.clearAll = function() {
                cacheData = {};
            };
            /**
    * Gets a cached piece of data
    * @function cache.get
    * @param {String} key
    */
            fnCaller.get = function(key) {
                return cacheData[key];
            };
            /**
     * Caches a piece of data.
     * @function cache.set
     * @param {String} key
     * @param {*} value
     */
            fnCaller.set = function(key, value) {
                cacheData[key] = value;
                return value;
            };
            /**
     * Returns a boolean indicating if the give key has cached data.
     * @function cache.isCached
     * @param {String} key
     * @return {Boolean}
     */
            fnCaller.isCached = function(key) {
                if (cacheData.hasOwnProperty(key)) return true;
                return false;
            };
            return fnCaller;
        }();
        //end: cache method.
        /* harmony default export */
        __webpack_exports__.a = cache;
    }, /* 16 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export getDestroyCallback */
        /* unused harmony export Compose */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__queueCallback__ = __webpack_require__(62);
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        //=========================================================
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_1__dataStore__.a.create();
        var COMMON_DESTROY_METHOD_NAME = [ "destroy", // Compose
        "remove", // DOM Events Listeners
        "off" ];
        // Aliases
        Object.create;
        // return all KEYs of an object, even those that are not iterable
        function objectKeys(prototype) {
            var k = void 0, keys = [];
            for (k in prototype) keys.push(k);
            return keys;
        }
        // Base instance methods for Compose'd object
        var baseMethods = /** @lends Compose.prototype */ {
            /**
     * Property indicating whether instance has been destroyed
     */
            isDestroyed: false,
            /**
     * instance initializing code
     */
            init: function() {},
            /**
     * Destroys the instance, by removing its private data.
     * Any attached `onDestroy` callback will be executed `async` - queued and
     * called on next event loop
     *
     * @param {Boolean} [executeCallbacksNow=false]
     */
            destroy: function(executeCallbacksNow) {
                if (PRIVATE.has(this)) {
                    var destroyCallbacks = PRIVATE.get(this);
                    PRIVATE.delete(this);
                    executeCallbacksNow ? destroyCallbacks.forEach(callOnDestroyCallback) : Object(__WEBPACK_IMPORTED_MODULE_2__queueCallback__.a)(function() {
                        return destroyCallbacks.forEach(callOnDestroyCallback);
                    });
                }
                "boolean" === typeof this.isDestroyed && (this.isDestroyed = true);
            },
            /**
     * Adds a callback to the queue to be called when this object's `.destroy()`
     * is called.
     *
     * @param {Function} callback
     */
            onDestroy: function(callback) {
                getInstanceState(this).push(callback);
            },
            /**
     * Returns the factory for this instance.
     *
     * @return {Compose}
     */
            getFactory: function() {
                if (this.constructor) return this.constructor;
            }
        };
        var staticMethods = /** @lends Compose */ {
            /**
     * Creates an new factory based on the prototye of the current Factory
     * and any other Factory given on input.
     *
     * @return {Compose}
     */
            extend: function() {
                var Class = function(_ref) {
                    _inherits(Class, _ref);
                    function Class() {
                        _classCallCheck(this, Class);
                        return _possibleConstructorReturn(this, (Class.__proto__ || Object.getPrototypeOf(Class)).apply(this, arguments));
                    }
                    return Class;
                }(this);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                Object(__WEBPACK_IMPORTED_MODULE_0__objectExtend__.a)(Class.prototype, args.reduce(function(newProto, obj) {
                    if (obj) {
                        var thisObjProto = obj.prototype || obj;
                        objectKeys(thisObjProto).forEach(function(objKey) {
                            newProto[objKey] = thisObjProto[objKey];
                        });
                    }
                    return newProto;
                }, {}));
                return Class;
            },
            /**
     * Checks if the Object given on input looks like an instance of this Factory.
     *
     * @return {Boolean}
     */
            isInstanceOf: function(instanceObj) {
                if (!instanceObj) return false;
                var neededKeys = objectKeys(this.prototype);
                // If any prototype key is not in the object prototype, then return false
                return !neededKeys.some(function(protoKey) {
                    return "undefined" === typeof instanceObj[protoKey];
                });
            },
            /**
     * Creates an instance object based on this factory.
     *
     * @return {Object}
     */
            create: function() {
                return new (Function.prototype.bind.apply(this, [ null ].concat(Array.prototype.slice.call(arguments))))();
            },
            /**
     * Returns a standard callback that can be used to remove cleanup instance state
     * from specific Store (WeakMap). Returned function will destroy known Instances
     * that have destroy methods.
     *
     * @param {Object} instanceState
     * @param {WeakMap} [stateStore]
     *
     * @return {Function}
     *
     * @example
     *
     * const MY_PRIVATE = new WeakMap();
     * cont NewWdg = Componse.extend({
     *      init() {
     *          const state = {};
     *          MY_PRIVATE.set(this, state);
     *          ...
     *
     *          this.onDestroy(Compose.getDestroyCallback(state, MY_PRIVATE));
     *      }
     * });
     */
            getDestroyCallback: getDestroyCallback
        };
        /**
 * Returns a standard callback that can be used to remove cleanup instance state
 * from specific Store (WeakMap). Returned function will destroy known Instances
 * that have destroy methods.
 *
 * @method Compose~getDestroyCallback
 *
 * @param {Object} instanceState
 * @param {WeakMap} [stateStore]
 *
 * @return {Function}
 *
 * @example
 *
 * const MY_PRIVATE = new WeakMap();
 * cont NewWdg = Componse.extend({
 *      init() {
 *          const state = {};
 *          MY_PRIVATE.set(this, state);
 *          ...
 *
 *          this.onDestroy(Compose.getDestroyCallback(state, MY_PRIVATE));
 *      }
 * });
 */
        function getDestroyCallback(instanceState, stateStore) {
            return function() {
                instanceState && // Destroy all Compose object
                Object.keys(instanceState).forEach(function(prop) {
                    if (instanceState[prop]) {
                        COMMON_DESTROY_METHOD_NAME.some(function(method) {
                            if (instanceState[prop][method] && ("remove" !== method || !(instanceState[prop] instanceof Node))) {
                                instanceState[prop][method]();
                                return true;
                            }
                        });
                        instanceState[prop] = void 0;
                    }
                });
                stateStore && stateStore.has && stateStore.has(instanceState) && stateStore.delete(instanceState);
            };
        }
        function getInstanceState(inst) {
            PRIVATE.has(inst) || PRIVATE.set(inst, []);
            return PRIVATE.get(inst);
        }
        function callOnDestroyCallback(callback) {
            "function" === typeof callback && callback();
        }
        /**
 * Composes new factory methods from a list of given Objects/Classes.
 *
 * @class Compose
 * @borrows Compose~getDestroyCallback as Compose.getDestroyCallback
 *
 * @example
 *
 * var Widget = Compose.create(Model, Events);
 *
 * myWidget = Widget.create();
 *
 */
        var Compose = function() {
            function ComposeConstructor() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                // Called with `new`?
                if (this && this.constructor && this instanceof this.constructor) return this.init.apply(this, args);
                // called directly
                return new (Function.prototype.bind.apply(ComposeConstructor, [ null ].concat(args)))();
            }
            ComposeConstructor.prototype.constructor = ComposeConstructor;
            return ComposeConstructor;
        }();
        Object(__WEBPACK_IMPORTED_MODULE_0__objectExtend__.a)(Compose.prototype, baseMethods);
        Object(__WEBPACK_IMPORTED_MODULE_0__objectExtend__.a)(Compose, staticMethods);
        /* harmony default export */
        __webpack_exports__.a = Compose;
    }, /* 17 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Set__ = __webpack_require__(63);
        /* unused harmony reexport Set */
        /* unused harmony reexport FakeSet */
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__Set__.a;
        });
    }, /* 18 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__ = __webpack_require__(16);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        var _slicedToArray = function() {
            function sliceIterator(arr, i) {
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = void 0;
                try {
                    for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
                        _arr.push(_s.value);
                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = true;
                    _e = err;
                } finally {
                    try {
                        !_n && _i.return && _i.return();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) return arr;
                if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }();
        //================================================================
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create();
        var COLORS = [ "blueLight", "blue", "blueDark", "teal", "greenLight", "green", "greenDark", "magentaLight", "magenta", "purpleLight", "purple", "black", "orange", "red", "redDark" ];
        var nextColorIndex = 0;
        var assignedColor = {};
        // Timed cache?
        /**
 * Model for a user profile. Accounts for attributes returned by
 * the UserProfile service, as well as the Search Principals and
 * normalizes those.
 *
 * @class UserProfileModel
 * @extends Compose
 *
 * @param {Object} [modelProperties]
 * @param {Object} [options]
 * @param {String} [options.webURL]
 */
        var UserProfileModel = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__.a.extend(/** @lends UserProfileModel.prototype */ {
            init: function(modelProperties, options) {
                var _this = this;
                if (PRIVATE.has(this)) return;
                var opt = Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options);
                PRIVATE.set(this, opt);
                Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)(this, {
                    AboutMe: "",
                    AccountName: "",
                    // Should be same as LoginName
                    CellPhone: "",
                    Department: "",
                    DisplayName: "",
                    // Should be the same as 'Name'
                    EmployeeID: "",
                    Email: "",
                    Fax: "",
                    FirstName: "",
                    HomePhone: "",
                    ID: "",
                    Id: "",
                    // SP2013 and above. Should be same as ID
                    Initials: "",
                    Color: "",
                    LastName: "",
                    LoginName: "",
                    // Should be same as AccountName
                    Manager: "",
                    Name: "",
                    Office: "",
                    PersonalSpace: "",
                    PictureURL: "",
                    PreferredName: "",
                    PublicSiteRedirect: "",
                    QuickLinks: "",
                    Title: "",
                    UserName: "",
                    UserInfoID: "",
                    // Should be the same as ID. returned by SearchPrincipals service
                    UserProfile_GUID: "",
                    UserPhoto: "",
                    // Will be set to use {fullURL}userphoto.aspx
                    WebSite: "",
                    WorkEmail: "",
                    WorkPhone: ""
                }, modelProperties);
                //------------------------------------------------------
                // Handle data differences from SearchPrincipals output
                //------------------------------------------------------
                !this.ID && this.Id && (this.ID = this.Id);
                // If there is a UserInfoID, then make sure ID is also set
                !this.ID && this.UserInfoID && (this.ID = this.UserInfoID);
                this.UserInfoID = this.Id = this.ID;
                // If there is a DisplayName but no Name, then set the name
                if (!this.Name) {
                    this.Name = this.DisplayName || this.PreferredName;
                    this.Name || !this.FirstName && !this.LastName || (this.Name = this.FirstName + " " + this.LastName);
                }
                !this.AccountName && this.LoginName && (this.AccountName = this.LoginName);
                !this.LoginName && this.AccountName && (this.LoginName = this.AccountName);
                !this.UserPhoto && this.AccountName && (this.UserPhoto = (opt.webURL || "/") + "_layouts/userphoto.aspx?size=M&accountname=" + encodeURIComponent(this.AccountName));
                this.Initials || this.deriveInitials();
                this.Color || this.setRandomColor();
                this.onDestroy(function() {
                    return PRIVATE.delete(_this);
                });
            },
            /**
     * Derives the user's initials based on firstName, LastName or DisplayName.
     * Calling this method will set the Model's `Initials` property
     */
            deriveInitials: function() {
                var firstCharOf = function(stringValue) {
                    return stringValue.trim().charAt(0);
                };
                var firstName = this.FirstName;
                var lastName = this.LastName;
                var displayName = this.DisplayName || this.Name;
                // If no first or last name, but we have a display name (common with output
                // from list queries), then parse that and use it.
                if (!firstName && !lastName && displayName) {
                    var _displayName$split = displayName.split(/\W/);
                    var _displayName$split2 = _slicedToArray(_displayName$split, 2);
                    var _displayName$split2$ = _displayName$split2[0];
                    firstName = void 0 === _displayName$split2$ ? "" : _displayName$split2$;
                    var _displayName$split2$2 = _displayName$split2[1];
                    lastName = void 0 === _displayName$split2$2 ? "" : _displayName$split2$2;
                }
                this.Initials = firstCharOf(firstName) + firstCharOf(lastName) || "?";
            },
            /**
     * Sets a random color on the current user profile model.
     * Color is store in model attribute named `Color` and also returned and
     * represents one of the available color names (CSS modifiers) that the
     * `Persona` widget supports.
     *
     * @returns {String}
     */
            setRandomColor: function() {
                var accountName = this.AccountName;
                var color = COLORS[nextColorIndex];
                accountName && (assignedColor[accountName] ? color = assignedColor[accountName] : assignedColor[accountName] = color);
                nextColorIndex === COLORS.length - 1 ? nextColorIndex = 0 : nextColorIndex++;
                return this.Color = color;
            },
            /**
     * Returns a string value with the user information in the format normally
     * received in SOAP responses (ex. `ID;#VisibleValue`)
     *
     * @param {Boolean} [expanded=false]
     *  If true, then the format returned is the `expanded` one (normally received in
     *  queries when `ExpandUserField` is used)
     *
     * @return {String}
     *
     * @example
     *
     *  // non-expanded: 11;#Paul Tavares
     *  // Expanded: 11;#Paul Tavares,#i:0#.f|membership|paul.tavares@sharepoint.com,#paul.tavares@sharepoint.com,#,#Paul Tavares
     */
            toCamlResponseString: function(expanded) {
                var _this2 = this;
                // Examples:
                var response = this.ID + ";#" + this.Name;
                expanded && (response += [ "Name", "AccountName", "Email", "SIP", "DisplayName" ].map(function(attr) {
                    return _this2[attr];
                }).join(",#"));
                return response;
            }
        });
        UserProfileModel.defaults = {
            webURL: ""
        };
        /* harmony default export */
        __webpack_exports__.a = UserProfileModel;
    }, /* 19 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domHasClass */
        /**
 * Check if an element has a given class
 *
 * @function domHasClass
 *
 * @param {HTMLElement} el
 * @param {String} cssClass
 *
 * @return {Boolean}
 */
        function domHasClass(el, cssClass) {
            if (el && cssClass) return el.classList.contains(cssClass);
            return false;
        }
        /* harmony default export */
        __webpack_exports__.a = domHasClass;
    }, /* 20 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /**
 * Returns the requested nodes from the given xml document
 *
 * @param {Object} options
 *
 * @param {XMLDocument} options.xDoc
 *
 * @param {String} options.nodeName
 *
 * @param {Boolean} [options.asJQuery=false]
 *      If true, then xmlNodes will be returned as a jQuery
 *      selection object, ready to be traversed and/or filtered.
 *
 * @param {Boolean} [options.cleanAttr=true]
 *      if true, the 'ows_' will be stripped from column names.
 *      Only used when asJQuery=false.
 *
 * @param {Object} [options.nodeModel=null]
 *      A factory constructor that will be used to build each node.
 *      Factory must have a `create` member that will be called with
 *      the object. The model constructor method should have a signature
 *      of the following: `function(modelData, options)`
 *
 * @param {Object} [options.nodeModelOptions]
 *      Any data to be passed to the `nodeModel` constructor as the second
 *      argument. NOTE that this method will add an attribute to the options
 *      called 'source' that will contain the XML node used to create the object
 *
 * @param {Boolean} [options.convertTypes=false]
 *      When true, this method will attempt to convert certain known
 *      String values to javascript natives (ex. `"TRUE"` would become `true`)
 *
 *
 * @return {Array|jQuery}
 *      Each object that represents an XML node will contain properties
 *      for each attribute found on that node. Also, the Object will
 *      contain a special attribute - ___xmlNode - that is the actual
 *      xml node.
 *
 * @example
 *
 *  API.getNodesFromXml({
 *      xDoc: jgXHR.responseXML,
 *      nodeName: "z:row"
 *  });
 *
 * // returns something similar to the following:
 *  {
 *      ID: "123",
 *      Title: "item title",
 *      ___xmlNode: XMLElement
 *  }
 *
 *
 */
        var getNodesFromXml = function(options) {
            var getNodeAsObj, nodeList, i, j, opt = Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_objectExtend__.a)({}, {
                xDoc: null,
                nodeName: "",
                cleanAttr: true,
                nodeModel: null,
                nodeModelOptions: null,
                convertTypes: false
            }, options), nodes = opt.xDoc.getElementsByTagName(opt.nodeName);
            0 === nodes.length && "z:row" === opt.nodeName && (nodes = opt.xDoc.getElementsByTagName("row"));
            0 === nodes.length && "rs:data" === opt.nodeName && (nodes = opt.xDoc.getElementsByTagName("data"));
            nodeList = [];
            getNodeAsObj = function(ele) {
                var name, x, y, attrs = ele.attributes, row = {};
                for (x = 0, y = attrs.length; x < y; x++) {
                    name = attrs[x].name;
                    opt.cleanAttr && name.indexOf("ows_") > -1 && (name = name.replace("ows_", ""));
                    opt.convertTypes ? row[name] = getJsNativeFromString(attrs[x].value) : row[name] = attrs[x].value;
                }
                // Also store the original xml node
                // FIXME: remove ___xmlNode from object
                // row.___xmlNode = ele;
                Object.defineProperty(row, "___xmlNode", {
                    value: ele,
                    configurable: true
                });
                return opt.nodeModel && opt.nodeModel.create ? opt.nodeModel.create(row, Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_objectExtend__.a)({}, opt.nodeModelOptions, {
                    source: ele
                })) : row;
            };
            for (i = 0, j = nodes.length; i < j; i++) nodeList.push(getNodeAsObj(nodes[i]));
            return nodeList;
        }, //end: API.getNodesFromXml
        /**
 * Returns a JS native type (if possible) from the given string.
 * @private
 * @param {String} str
 *
 * @return {String|Object}
 */
        getJsNativeFromString = function(str) {
            if (!str) return str;
            var response = str;
            switch (str.toUpperCase()) {
              case "TRUE":
                response = true;
                break;

              case "FALSE":
                response = false;
            }
            return response;
        };
        getNodesFromXml.getJsNativeFromString = getJsNativeFromString;
        /* harmony default export */
        __webpack_exports__.a = getNodesFromXml;
    }, /* 21 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domClosest */
        var body = document.body;
        var matches = body.matches || body.matchesSelector || body.msMatchesSelector || body.mozMatchesSelector || body.webkitMatchesSelector || body.oMatchesSelector;
        /**
 * Finds the closest DOM element to another by walking up its ancestors.
 *
 * @function domClosest
 *
 * @param {HTMLElement} ele
 * @param {String} selector
 *
 * @return {HTMLElement|undefined}
 */
        function domClosest(ele, selector) {
            var parent = ele;
            var response;
            for (;!response && parent && "HTML" !== parent.nodeName.toUpperCase(); ) matches.call(parent, selector) ? response = parent : parent = parent.parentElement;
            return response;
        }
        /* harmony default export */
        __webpack_exports__.a = domClosest;
    }, /* 22 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export functionBind */
        /* unused harmony export functionBindCall */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return objectDefineProperty;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return objectDefineProperties;
        });
        /* unused harmony export objectKeys */
        /* unused harmony export isArray */
        /* unused harmony export arrayForEach */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return arrayIndexOf;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return arraySplice;
        });
        /* unused harmony export consoleLog */
        /* unused harmony export consoleError */
        // Function
        // functionBind(fn, fnParent)
        var functionBind = Function.bind.call.bind(Function.bind);
        // usage: functionBindCall(Array.prototype.forEach) // generates a bound function to Array.prototype.forEach.call
        var functionBindCall = functionBind(Function.call.bind, Function.call);
        // Object
        var objectDefineProperty = Object.defineProperty;
        var objectDefineProperties = Object.defineProperties;
        Object.keys;
        // Array
        var arr = [];
        Array.isArray;
        functionBindCall(arr.forEach);
        var arrayIndexOf = functionBindCall(arr.indexOf);
        var arraySplice = functionBindCall(arr.splice);
        // Logging
        var consoleLog = console.log;
        console.error;
    }, /* 23 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__sputils_cache__ = __webpack_require__(15);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__sputils_getNodesFromXml__ = __webpack_require__(20);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__models_ListItemModel__ = __webpack_require__(67);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__collections_ListItemsCollection__ = __webpack_require__(69);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__sputils_apiFetch__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__spapi_getSiteWebUrl__ = __webpack_require__(14);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /**
 * Method to retrieve data from a SharePoint list using GetListItems or
 * GetListItemChangesSinceToken operations of the List.axps webservice.
 * @function
 *
 * @param {Object} options
 *      Supports same input options as SPServices
 *
 * @param {Object} options.listName
 *
 * @param {String} [options.webURL="currentSiteWeb"]
 *
 * @param {String} [options.viewName=""]
 *
 * @param {String} [options.CAMLViewFields=""]
 *
 * @param {String} [options.CAMLQuery=""]
 *
 * @param {String} [options.CAMLQueryOptions=""]
 *
 * @param {String|Number} [options.CAMLRowLimit=""]
 *
 * @param {String} [options.operation="GetListItems"]
 *      Value Could also be set to "GetListItemChangesSinceToken".
 *
 * @param {Boolean} [options.changeToken=""]
 *      Used only when options.operation is "GetListItemChangesSinceToken"
 *
 * @param {Boolean} [options.cacheXML=false]
 *
 * @param {Boolean} [options.ListItemModel=ListItemModel]
 *  The model to be used for each row retrieved. Model constructor must
 *  support a .create() method.
 *
 * @return {Promise<ListItemsCollection>|Promise<Error>}
 *   Promise is resolved with a Collection, or rejected with an Error object
 *
 * @see https://msdn.microsoft.com/en-us/library/websvclists.lists.getlistitems(v=office.14).aspx
 * @see https://msdn.microsoft.com/en-us/library/office/ms467521.aspx
 *
 * @example
 *
 * getListItems({
 *   listName: "tasks",
 *   cacheXML: true,
 *   async: false,
 *   CAMLQuery: '<Query>' +
 *      '<Where>' +
 *      '<Eq>' +
 *          '<FieldRef Name="Author" LookupId="TRUE"/>" +
 *          '<Value Type="Integer"><UserID/></Value>' +
 *      '</Eq>' +
 *      '</Where>
 *      '<OrderBy><FieldRef Name="Title"/></OrderBy></Query>',
 *   CAMLViewFields: '<ViewFields><FieldRef Name="Title"/></ViewFields>'
 * })
 */
        var getListItems = function getListItems(options) {
            var reqPromise, opt = Object(__WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_objectExtend__.a)({}, getListItems.defaults, options);
            return Object(__WEBPACK_IMPORTED_MODULE_5__spapi_getSiteWebUrl__.a)(opt.webURL).then(function(webURL) {
                opt.webURL = webURL;
                opt.cacheKey = opt.webURL + "?" + [ opt.listName, opt.viewName, opt.CAMLViewFields, opt.CAMLQuery, opt.CAMLRowLimit, opt.CAMLQueryOptions, opt.operation, opt.changeToken ].join("|");
                opt.isCached = __WEBPACK_IMPORTED_MODULE_0__sputils_cache__.a.isCached(opt.cacheKey);
                // If cacheXML is true and we have a cached version, return it.
                if (opt.cacheXML && opt.isCached) return Object(__WEBPACK_IMPORTED_MODULE_0__sputils_cache__.a)(opt.cacheKey);
                // If cacheXML is FALSE, and we have a cached version of this key,
                // then remove the cached version - basically reset
                opt.isCached && __WEBPACK_IMPORTED_MODULE_0__sputils_cache__.a.clear(opt.cacheKey);
                reqPromise = Object(__WEBPACK_IMPORTED_MODULE_4__sputils_apiFetch__.a)(opt.webURL + "_vti_bin/Lists.asmx", {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/xml;charset=UTF-8"
                    },
                    body: '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><' + opt.operation + ' xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>' + opt.listName + "</listName><viewName>" + (opt.viewName || "") + "</viewName><query>" + (opt.CAMLQuery || "<Query></Query>") + "</query><viewFields>" + (opt.CAMLViewFields || "<ViewFields></ViewFields>") + "</viewFields><rowLimit>" + (opt.CAMLRowLimit || 0) + "</rowLimit><queryOptions>" + (opt.CAMLQueryOptions || "<QueryOptions></QueryOptions>") + "</queryOptions>" + (// Insert Change Token if operation is "GetListItemChangesSinceToken"
                    "GetListItemChangesSinceToken" === opt.operation ? "<changeToken>" + (opt.changeToken || "") + "</changeToken>" : "") + "</" + opt.operation + "></soap:Body></soap:Envelope>"
                }).then(function(response) {
                    return __WEBPACK_IMPORTED_MODULE_3__collections_ListItemsCollection__.a.create(Object(__WEBPACK_IMPORTED_MODULE_1__sputils_getNodesFromXml__.a)({
                        xDoc: response.content,
                        nodeName: "z:row",
                        nodeModel: opt.ListItemModel || opt.listItemModel,
                        // Lowercase "listItemModel" is for backward compatibiltiy
                        nodeModelOptions: Object(__WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_objectExtend__.a)({}, opt)
                    }), {
                        apiResponse: response,
                        queryOptions: opt
                    });
                });
                // If cacheXML was true, then cache this promise
                opt.cacheXML && Object(__WEBPACK_IMPORTED_MODULE_0__sputils_cache__.a)(opt.cacheKey, reqPromise);
                return reqPromise;
            });
        };
        getListItems.defaults = {
            listName: "",
            webURL: "",
            viewName: "",
            CAMLViewFields: "",
            CAMLQuery: "",
            CAMLRowLimit: "",
            CAMLQueryOptions: "",
            operation: "GetListItems",
            // Optionally: set it to = GetListItemChangesSinceToken
            cacheXML: false,
            async: true,
            changeToken: "",
            // GetListChangesSinceToken only
            ListItemModel: __WEBPACK_IMPORTED_MODULE_2__models_ListItemModel__.a,
            ListItemCollection: __WEBPACK_IMPORTED_MODULE_3__collections_ListItemsCollection__.a
        };
        /* harmony default export */
        __webpack_exports__.a = getListItems;
    }, /* 24 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export nextTick */
        var reIsNativeCode = /native code/i;
        /**
 * Executes a function at the end of the current event Loop - during micro-task processing
 *
 * @param {Function} callback
 */
        var nextTick = function() {
            if ("undefined" !== typeof setImediate && reIsNativeCode.test(setImediate.toString())) return setImediate;
            // Native Promsie? Use it.
            if ("function" === typeof Promise && reIsNativeCode.test(Promise.toString())) {
                var resolved = Promise.resolve();
                return function(fn) {
                    resolved.then(fn).catch(function(e) {
                        return console.log(e);
                    });
                };
            }
            // fallback to setTimeout
            // From: https://bugzilla.mozilla.org/show_bug.cgi?id=686201#c68
            var immediates = [];
            var processing = false;
            function processPending() {
                setTimeout(function() {
                    immediates.shift()();
                    immediates.length ? processPending() : processing = false;
                }, 0);
            }
            return function(fn) {
                immediates.push(fn);
                if (!processing) {
                    processing = true;
                    processPending();
                }
            };
        }();
        /* harmony default export */
        __webpack_exports__.a = nextTick;
    }, /* 25 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domChildren */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__domMatches__ = __webpack_require__(41);
        /**
 * Returns the children of a given element, but only those of
 * `nodeType` 1. The list of children can also be filter by
 * a given CSS Selector.
 *
 * @function domChildren
 *
 * @param {HTMLElement} ele
 * @param {String} [selector]
 *
 * @return [Array]
 */
        function domChildren(ele, selector) {
            var children = Array.prototype.slice.call(ele.childNodes || [], 0).filter(function(childNode) {
                return 1 === childNode.nodeType;
            });
            selector && (children = children.filter(function(childNode) {
                return Object(__WEBPACK_IMPORTED_MODULE_0__domMatches__.a)(childNode, selector);
            }));
            return children;
        }
        /* harmony default export */
        __webpack_exports__.a = domChildren;
    }, /* 26 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domToggleClass */
        /**
 * Toggles a CSS class on/off on an element
 *
 * @function domToggleClass
 *
 * @param {HTMLElement} el
 * @param {String} cssClass
 */
        function domToggleClass(el, cssClass) {
            if (el) return el.classList.toggle(cssClass);
        }
        /* harmony default export */
        __webpack_exports__.a = domToggleClass;
    }, /* 27 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domClosest__ = __webpack_require__(21);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddClass__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domRemoveClass__ = __webpack_require__(11);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domAddEventListener__ = __webpack_require__(10);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10__Persona_html__ = __webpack_require__(117);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10__Persona_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__Persona_html__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_11__Persona_less__ = __webpack_require__(118);
        /* harmony import */
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__Persona_less__);
        //----------------------------------------------------------------
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create();
        var CSS_CLASS_NO_DETAILS = "spwidgets-Persona--noDetails";
        /**
 * Widget description
 *
 * @class Persona
 * @extends Widget
 *
 * @param {Object} options
 * @param {UserProfileModel} options.userProfile
 * @param {String} [options.presence='offline']
 * @param {String} [options.variant="circle"]
 * @param {String} [options.size=null]
 * @param {Boolean} [options.hideDetails=false]
 * @param {Boolean} [options.hideAction=true]
 * @param {Boolean} [options.hideInitials=true]
 * @param {String} [options.initialsColor=nul]
 *
 * @fires Persona#click
 * @fires Persona#photo-load-failed
 * @fires Persona#action-click
 */
        var Persona = {
            init: function(options) {
                var inst = {
                    opt: Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options),
                    sizeModifier: "",
                    presenceModifier: "offline",
                    variant: "",
                    initialsColor: ""
                };
                PRIVATE.set(this, inst);
                var opt = inst.opt;
                var emit = this.emit.bind(this);
                this._model = opt.userProfile;
                var $ui = this.$ui = Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__.a)(Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__.a)(this.getTemplate(), opt.userProfile)).firstChild;
                var uiFind = $ui.querySelector.bind($ui);
                inst.$imgArea = uiFind(".ms-Persona-imageArea");
                inst.$initials = uiFind(".ms-Persona-initials");
                // Find the persona element, which might not be the top element,
                // since this widget could have been extended and UI might be wrapped
                // in other elements (ex. people picker)
                inst.$persona = Object(__WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domClosest__.a)(inst.$imgArea, ".ms-Persona");
                var $userPhotoImg = uiFind(".ms-Persona-imageArea img");
                Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domAddEventListener__.a)($userPhotoImg, "error", handleUserPhotoLoadFailure.bind(this, $userPhotoImg));
                inst.imgFailedEv = this.once("photo-load-failed", this.showInitials.bind(this));
                opt.size && this.setSize(opt.size);
                opt.hideDetails && this.hideDetails();
                opt.variant && this.setVariant(opt.variant);
                opt.showInitials && this.showInitials();
                opt.initialsColor ? this.setInitialsColor(opt.initialsColor) : null === opt.initialsColor && opt.userProfile && opt.userProfile.Color && this.setInitialsColor(opt.userProfile.Color);
                opt.presence && this.setPresence(opt.presence);
                opt.hideAction && Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddClass__.a)($ui, "spwidgets-Persona--noAction");
                Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domAddEventListener__.a)(uiFind(".ms-Persona-actionIcon"), "click", function(ev) {
                    /**
             * User clicked on the Persona's action button
             *
             * @event Persona#action-click
             */
                    emit("action-click");
                    ev.stopPropagation();
                });
                Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domAddEventListener__.a)($ui, "click", function() {
                    /**
             * Persona Element was clicked on by user
             *
             * @event Persona#click
             */
                    emit("click");
                });
                this.onDestroy(function() {
                    // Destroy all Compose object
                    Object.keys(inst).forEach(function(prop) {
                        if (inst[prop]) {
                            // Widgets
                            inst[prop].destroy ? inst[prop].destroy() : inst[prop].remove ? inst[prop].remove() : inst[prop].off && inst[prop].off();
                            inst[prop] = void 0;
                        }
                    });
                    PRIVATE.delete(this);
                }.bind(this));
            },
            /**
     * Get the HTML template for the widget.
     *
     * @returns {String}
     */
            getTemplate: function() {
                return __WEBPACK_IMPORTED_MODULE_10__Persona_html___default.a;
            },
            /**
     * Returns the user profile this instance of the persona widget.
     *
     * @returns {UserProfileModel}
     */
            getUserProfile: function() {
                return this._model;
            },
            /**
     * Shows the initials instead of the user photo.
     */
            showInitials: function() {
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddClass__.a)(this.getEle(), "spwidgets-Persona--showInitials");
            },
            /**
     * Hides the user's initials and shows instead the user's photo (if any).
     */
            hideInitials: function() {
                Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domRemoveClass__.a)(this.getEle(), "spwidgets-Persona--showInitials");
            },
            /**
     * Sets the color for the initials.
     *
     * @param {Persona~InitialsColor} color
     *  One of the colors supported by Office UI Fabric Personal widget:
     *  `blueLight`, `blue`, `blueDark`, `teal`, `greenLight`, `green`, `greenDark`,
     *  `magentaLight`, `magenta`, `purpleLight`, `purple`, `black`, `orange`,
     *  `red`, `redDark`,
     *
     */
            setInitialsColor: function(color) {
                var inst = PRIVATE.get(this);
                var $initials = inst.$initials;
                inst.initialsColor && Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domRemoveClass__.a)($initials, "ms-Persona-initials--" + inst.initialsColor);
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddClass__.a)($initials, "ms-Persona-initials--" + color);
                inst.initialsColor = color;
            },
            /**
     * Sets the Persona style that should be shown.
     *
     * @param {String} variant
     *  A string with the variant that should be shown. Valid values are:
     *  `circle` (Default), `token` and `facePile`
     */
            setVariant: function(variant) {
                var inst = PRIVATE.get(this);
                var $ui = inst.$persona;
                inst.variant && Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domRemoveClass__.a)($ui, "ms-Persona--" + inst.variant);
                if (variant) {
                    Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddClass__.a)($ui, "ms-Persona--" + variant);
                    inst.variant = variant;
                }
            },
            /**
     * Sets the size of the widget.
     *
     * @param {String} size
     *  Valid value are: `tiny`, `xs`, `sm`, `lg`, `xl`
     */
            setSize: function(size) {
                if (!size) return;
                var inst = PRIVATE.get(this), $persona = inst.$persona, cssClassName = "ms-Persona--" + size.toLowerCase();
                inst.sizeModifier && Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domRemoveClass__.a)($persona, inst.sizeModifier);
                inst.sizeModifier = cssClassName;
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddClass__.a)($persona, cssClassName);
            },
            /**
     * Sets the presence of the Persona.
     *
     * @param {String} state
     *  The state to set on the Persona. Possible values are:
     *  `noPresence`, `available`, `away`, `blocked`, `busy`, `dnd` (do not disturb) and `offline` (default).
     */
            setPresence: function(state) {
                var inst = PRIVATE.get(this), $ui = inst.$persona;
                if (inst.presenceModifier) {
                    Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domRemoveClass__.a)($ui, "ms-Persona--" + inst.presenceModifier);
                    inst.presenceModifier = "";
                }
                if (state) {
                    state = String(state).toLowerCase();
                    Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddClass__.a)($ui, "ms-Persona--" + state);
                    inst.presenceModifier = state;
                }
            },
            /**
     * Replaces the Personal user photo with a new one
     *
     * @param {String} url
     */
            setUserPhoto: function(url) {
                var inst = PRIVATE.get(this);
                var $currentImg = inst.$imgArea.querySelector("img");
                var $imgParent = $currentImg.parentNode;
                var $userPhotoImg = Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__.a)('<img class="ms-Persona-image" src="' + url + '" />').firstChild;
                Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domAddEventListener__.a)($userPhotoImg, "error", handleUserPhotoLoadFailure.bind(this, $userPhotoImg));
                $imgParent.insertBefore($userPhotoImg, $currentImg);
                $imgParent.removeChild($currentImg);
            },
            /**
     * Hides the details (show image only)
     */
            hideDetails: function() {
                showHideDetails.call(this, true);
            },
            /**
     * Shows the details
     */
            showDetails: function() {
                showHideDetails.call(this);
            },
            /**
     * Sets the profile initials
     *
     * @param {String} initials
     */
            setInitials: function(initials) {
                PRIVATE.get(this).$initials.textContent = initials || "";
            }
        };
        /**
 * Show or hides the details area based on the input param
 *
 * @param {Boolean} hide
 */
        function showHideDetails(hide) {
            var $ui = this.getEle();
            hide ? Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddClass__.a)($ui, CSS_CLASS_NO_DETAILS) : Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domRemoveClass__.a)($ui, CSS_CLASS_NO_DETAILS);
        }
        /**
 * Handle failure of user photo
 *
 * @param {DOMElement} $img
 */
        function handleUserPhotoLoadFailure($img) {
            $img.style.display = "none";
            // If image is no longer attached (ex. setUserPhoto() was called while
            // this image was being loaded), then exit and don't notify.
            if (!$img.parentNode) return;
            /**
     * The user's profile photo failed to load.
     *
     * @event Persona#photo-load-failed
     *
     * @type {Object}
     * @property {DOMElement} $img
     * @property {String} src
     */
            this.emit("photo-load-failed", {
                $img: $img,
                src: $img.getAttribute("src")
            });
        }
        Persona = __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__.a.extend(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__.a, Persona);
        Persona.defaults = {
            userProfile: null,
            presence: "offline",
            variant: "circle",
            size: null,
            hideDetails: false,
            hideAction: true,
            hideInitials: true,
            initialsColor: null
        };
        /* harmony default export */
        __webpack_exports__.a = Persona;
    }, /* 28 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */
        __webpack_exports__.a = getMsgError;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domFind__ = __webpack_require__(9);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_parseXML__ = __webpack_require__(29);
        /**
 * Given a sharepoint webservices response, this method will
 * look to see if it contains an error and return that error
 * formated as a string.
 *
 * @param {XMLDocument|String} xmlMsg
 *
 * @return {String} errorMessage
 *
 */
        function getMsgError(xmlMsg) {
            "string" === typeof xmlMsg ? xmlMsg = Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_parseXML__.a)(xmlMsg) : xmlMsg && xmlMsg.jquery && (xmlMsg = xmlMsg[0]);
            // if xmlDocument does not support querySelector, throw error
            if (!xmlMsg.querySelector) throw new Error("input is not an XML Document!");
            var error = "", spErr = Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domFind__.a)(xmlMsg, "ErrorCode"), count = 0;
            spErr.length || (spErr = Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domFind__.a)(xmlMsg, "faultcode"));
            // See if any Elements with ErrorMessage attribute
            if (!spErr.length) {
                spErr = Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domFind__.a)(xmlMsg, "CopyResult[ErrorMessage]");
                if (spErr.length) {
                    spErr.forEach(function(thisErr) {
                        count += 1;
                        error += "(" + count + ") " + (thisErr.getAttribute("ErrorCode") || "unknown") + ": " + thisErr.getAttribute("ErrorMessage") + "\n";
                    });
                    return count + " error(s) encountered! \n" + error;
                }
            }
            if (!spErr.length) return "";
            // Loop through and get all errors.
            spErr.forEach(function(thisErr) {
                var textContent = thisErr.textContent;
                if ("0x00000000" !== textContent) {
                    count += 1;
                    error += "(" + count + ") " + textContent + ": " + Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domFind__.a)(thisErr.parentNode, "*").filter(function(ele) {
                        return ele !== thisErr;
                    }).reduce(function(text, ele) {
                        return text + " " + ele.textContent;
                    }, "") + "\n";
                }
            });
            error = count + " error(s) encountered! \n" + error;
            return error;
        }
    }, /* 29 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export parseXML */
        // from jQuery: https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/ajax/parseXML.js
        /**
 * Parses a string of XML data into an XML document that can be traversed.
 *
 * @param {String} data
 *
 * @returns XMLDocument
 *
 * @throws Error
 */
        var parseXML = function(data) {
            var xml;
            if (!data || "string" !== typeof data) return null;
            // Support: IE9
            try {
                xml = new window.DOMParser().parseFromString(data, "text/xml");
            } catch (e) {
                xml = void 0;
            }
            var errors;
            if (!xml || (errors = xml.getElementsByTagName("parsererror")).length) {
                var err;
                try {
                    err = new Error("Invalid XML: " + errors[0].textContent);
                    err.xmlData = data;
                } catch (e) {
                    err = new Error("Invalid XML: " + data);
                }
                throw err;
            }
            return xml;
        };
        /* harmony default export */
        __webpack_exports__.a = parseXML;
    }, /* 30 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domFind__ = __webpack_require__(9);
        /**
 * Checks if an xml message has an error. Taken from
 * SPWidgets.
 *
 * @param {XMLDocument} xmlMsg
 *
 * @return {Boolean}
 */
        /* harmony default export */
        __webpack_exports__.a = function(xmlMsg) {
            // BACKWARD COMPATIBILITY
            // if xmlMsg seems to be a jQuery object, then get it native element
            xmlMsg.jquery && (xmlMsg = xmlMsg[0]);
            // if xmlDocument does not support querySelector, throw error
            if (!xmlMsg.querySelector) throw new Error("input is not an XML Document!");
            var spErrCode = Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domFind__.a)(xmlMsg, "ErrorCode"), response = false;
            // If we don't have <ErrorCode> elements, then check other stuff
            // that sharepoint can return in error conditions
            if (!spErrCode.length) {
                // Any "fauldcode" nodes?
                if (Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domFind__.a)(xmlMsg, "faultcode").length) return true;
                // Any CopyResult nodes with ErrorMessage
                if (Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_domutils_domFind__.a)(xmlMsg, "CopyResult[ErrorMessage]").length) return true;
                return response;
            }
            spErrCode.some(function(errorCodeEle) {
                var errorCodeString = errorCodeEle.textContent;
                if ("0x00000000" !== errorCodeString && "NoError" !== errorCodeString) {
                    response = true;
                    return true;
                }
            });
            return response;
        };
    }, /* 31 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_xmlEscape__ = __webpack_require__(52);
        // FIXME: remove references to this file and replace with 'common-micro-libs/src/jsutils/xmlEscape'
        /* harmony default export */
        __webpack_exports__.a = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_xmlEscape__.a;
    }, /* 32 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /**
 * Given an array of CAML matches, this method will wrap them all in a
 * Logical condition (<And></And> or a <Or></Or>).
 *
 * @function getCamlLogical
 *
 * @param {Object}  options
 *              Options for the call. See below.
 * @param {String}  options.type
 *              Static String. The type of logical condition that
 *              the 'values' should be wrapped in. Possible values
 *              are 'AND' or 'OR'.  Default is 'AND'.
 * @param {Array} options.values
 *              The array of String elements that will be
 *              join into caml Logical condition.
 * @param {Function} [options.onEachValue=null]
 *              A function to process each items in the 'values'
 *              array. Function must return the value that should
 *              be used instead of the one found in the array. Use
 *              it to define the xml around each value
 *              (ex. <Eq><FieldRef>...</Eq>).
 *              Function is given 1 input param - the item currently
 *              being processed (from the 'values' input param).
 *
 * @return {String} logical Query as a single string.
 *
 * @example Create a OR statement from an array of conditions
 *
 *   getCamlLogical({
 *        type: "or",
 *        values: [
 *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test</Value></Eq>",
 *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test1</Value></Eq>",
 *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test2</Value></Eq>",
 *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test3</Value></Eq>",
 *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test4</Value></Eq>"
 *        ]
 *      })
 *
 *
 * @example Concatenate multiple calls to getCamlLogical():
 *
 *     getCamlLogical({
 *        type: "or",
 *        values: [
 *           "<Eq><FieldRef Name='ID' /><Value Type='Text'>10</Value></Eq>",
 *           "<Eq><FieldRef Name='ID' /><Value Type='Text'>15</Value></Eq>",
 *           getCamlLogical({
 *              type: "and",
 *              values: [
 *                 "west",
 *                 "east"
 *              ],
 *              onEachValue: function(loc){
 *                 return "<Neq><FieldRef Name='Region'/><Value Type='Text'>" +
 *                         loc + "</Value></Neq>";
 *              }
 *          })
 *        ]
 *      })
 *
 */
        var getCamlLogical = function getCamlLogical(options) {
            var i, o = Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_objectExtend__.a)({}, {
                type: "AND",
                values: [],
                onEachValue: null
            }, options), tagOpen = "<And>", tagClose = "</And>", logical = "", total = 0, last = 0, haveFn = false, newLogical = "", totalBuilt = 0;
            o.type = String(o.type).toUpperCase();
            Array.isArray(o.values) || (o.values = [ o.values ]);
            if ("AND" !== o.type) {
                tagOpen = "<Or>";
                tagClose = "</Or>";
            }
            // logical = tagOpen;
            total = o.values.length;
            last = total - 1;
            haveFn = "function" === typeof o.onEachValue;
            // Loop through all query logical strings and build
            // the overall filter logical
            for (i = 0; i < total; i++) {
                newLogical = "";
                newLogical += haveFn ? String(o.onEachValue(o.values[i])).toString() : String(o.values[i]).toString();
                if (newLogical) {
                    logical += newLogical;
                    totalBuilt++;
                    // If the total number of items is >2, then build the rest
                    // of the logicals by calling this method again with the
                    // remainder of the filters as input.
                    if (last - i > 1) {
                        newLogical = getCamlLogical(Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_objectExtend__.a)({}, o, {
                            values: o.values.slice(i + 1, total - i)
                        }));
                        // If building the remainder of the filter returned
                        // something, then add it to the list and incrment the
                        // number of logicals built.
                        if (newLogical) {
                            totalBuilt++;
                            logical += newLogical;
                        }
                        // Break out of this loop, even if there are other
                        // items... The call above will take care of the others
                        break;
                    }
                }
            }
            totalBuilt > 1 && (logical = tagOpen + logical + tagClose);
            return logical;
        };
        // getCamlLogical()
        /* harmony default export */
        __webpack_exports__.a = getCamlLogical;
    }, /* 33 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /**
 * Parses a Sharepoint lookup values as returned by webservices
 * (SOAP, ex: `id;#title;#id;#Title`) into an array of objects.
 *
 * @param {String} lookupValue
 *  Lookup items string as returned by SP - usually in format of
 *  `id;#valueHere`.
 *
 * @return {Array<Object>}
 *  Array of objects. Each object has two keys; `Title` and `ID`
 *
 * @example
 *
 * parseLookupFieldValue("1;#item one title;#2;#item two title");
 * // Returns:
 * [
 *      {
 *          ID: "1",
 *          Title: "item one title"
 *      },
 *      {
 *          ID: "2",
 *          Title: "item two title"
 *      }
 * ]
 */
        var parseLookupFieldValue = function(lookupValue) {
            var i, vId, vTitle, response = [], valueTokens = String(lookupValue).split(";#"), total = valueTokens.length;
            if (!lookupValue) return response;
            for (i = 0; i < total; i++) {
                vId = valueTokens[i];
                i++;
                vTitle = valueTokens[i];
                (vId || vTitle) && response.push({
                    // FIXME: remove deprecated values
                    /* DEPRECATED */
                    id: vId,
                    /* DEPRECATED */
                    title: vTitle,
                    ID: vId,
                    Title: vTitle
                });
            }
            return response;
        };
        /* harmony default export */
        __webpack_exports__.a = parseLookupFieldValue;
    }, /* 34 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__sputils_apiFetch__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__sputils_cache__ = __webpack_require__(15);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__getSiteWebUrl__ = __webpack_require__(14);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__models_ListModel__ = __webpack_require__(65);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /**
* Get a list definition from sharepoint or return its cached version
* if one exists.
 *
* @function
*
* @param {Object} options
*
* @param {String} options.listName
* @param {String} [options.webURL='']
* @param {Boolean} [options.cache=true]
*      The message response is cached UNTIL the next time the same
*      request is received with `cache` set to false.
* @param {Boolean} [options.ListModel]
*      List model constructor factory. Factory must expose a method called
*      `create` that accepts two input parameters: the source (XML, JSON) and
*      the `options`.
*
* @return {Promise<ListModel, Error>}
*  Resolved one object - ListModel object. Sample output
*/
        var getList = function getList(options) {
            var opt = Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_objectExtend__.a)({}, getList.defaults, options);
            return Object(__WEBPACK_IMPORTED_MODULE_2__getSiteWebUrl__.a)(opt.webURL).then(function(webURL) {
                opt.webURL = webURL;
                var reqPromise, getCacheKey = function(listName) {
                    return opt.webURL + "?List=" + listName;
                };
                // Backwards compatibility
                "undefined" !== typeof opt.cacheXML && (opt.cache = opt.cacheXML);
                opt.cacheKey = getCacheKey(opt.listName);
                opt.isCached = __WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a.isCached(opt.cacheKey);
                var convertResponseToModel = function(response) {
                    var listDef = opt.ListModel.create(response.content, {
                        webURL: opt.webURL
                    });
                    // If cache is true, then create cache with internal name and external
                    opt.cache && (// Was list name an internal UID? then use list Title
                    0 === opt.listName.indexOf("{") ? Object(__WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a)(getCacheKey(listDef.Title), reqPromise) : Object(__WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a)(getCacheKey(listDef.ID), reqPromise));
                    return listDef;
                };
                // If cacheXML is true and we have a cached version, return it.
                if (opt.cache && opt.isCached) return Object(__WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a)(opt.cacheKey).then(convertResponseToModel);
                // If cache is FALSE, and we have a cached version of this key,
                // then remove the cached version - basically reset
                opt.isCached && __WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a.clear(opt.cacheKey);
                // FIXME: each invocation should get unique ListModel? instead of cached one?
                reqPromise = Object(__WEBPACK_IMPORTED_MODULE_0__sputils_apiFetch__.a)(opt.webURL + "_vti_bin/Lists.asmx", {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/xml;charset=UTF-8"
                    },
                    body: '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>' + opt.listName + "</listName></GetList></soap:Body></soap:Envelope>"
                });
                // If there is a failure, remove from cache
                reqPromise.catch(function() {
                    __WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a.clear(opt.cacheKey);
                });
                // If cache was true, then cache this promise
                opt.cache && Object(__WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a)(opt.cacheKey, reqPromise);
                return reqPromise.then(convertResponseToModel);
            });
        };
        getList.defaults = {
            listName: "",
            webURL: "",
            cache: true,
            ListModel: __WEBPACK_IMPORTED_MODULE_3__models_ListModel__.a
        };
        /* harmony default export */
        __webpack_exports__.a = getList;
    }, /* 35 */
    /***/
    function(module, exports) {
        var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        var g;
        // This works in non-strict mode
        g = function() {
            return this;
        }();
        try {
            // This works if eval is allowed (see CSP)
            g = g || Function("return this")() || (0, eval)("this");
        } catch (e) {
            // This works if the window reference is available
            "object" === ("undefined" === typeof window ? "undefined" : _typeof(window)) && (g = window);
        }
        // g can still be undefined, but nothing to do about it...
        // We return undefined, instead of nothing here, so it's
        // easier to handle this case. if(!global) { ...}
        module.exports = g;
    }, /* 36 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* WEBPACK VAR INJECTION */
        (function(global) {
            /* unused harmony export GLOBAL */
            /* unused harmony export getGlobal */
            var GLOBAL = function() {
                /* global self, window, global */
                if ("undefined" !== typeof window) return window;
                if ("undefined" !== typeof global) return global;
                if ("undefined" !== typeof self) return self;
                return Function("return this;")();
            }();
            function getGlobal() {
                return GLOBAL;
            }
            /* harmony default export */
            __webpack_exports__.a = getGlobal;
        }).call(__webpack_exports__, __webpack_require__(35));
    }, /* 37 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */
        __webpack_exports__.a = FakeIterator;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__runtime_aliases__ = __webpack_require__(22);
        //-----------------------------------------------------------------------
        var $iterator$ = "undefined" !== typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
        // Great reference: http://2ality.com/2015/02/es6-iteration.html
        function FakeIterator(keys, values) {
            Object(__WEBPACK_IMPORTED_MODULE_0__runtime_aliases__.d)(this, "_", {
                value: {
                    keys: keys.slice(0),
                    values: values ? values.slice(0) : null,
                    idx: 0,
                    total: keys.length
                }
            });
        }
        Object(__WEBPACK_IMPORTED_MODULE_0__runtime_aliases__.c)(FakeIterator.prototype, {
            constructor: {
                value: FakeIterator
            },
            next: {
                enumerable: true,
                configurable: true,
                value: function() {
                    var response = {
                        done: this._.idx === this._.total
                    };
                    if (response.done) {
                        response.value = void 0;
                        return response;
                    }
                    var nextIdx = this._.idx++;
                    response.value = this._.keys[nextIdx];
                    this._.values && (response.value = [ response.value, this._.values[nextIdx] ]);
                    return response;
                }
            }
        });
        Object(__WEBPACK_IMPORTED_MODULE_0__runtime_aliases__.d)(FakeIterator.prototype, $iterator$, {
            value: function() {
                return this;
            }
        });
    }, /* 38 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__getList__ = __webpack_require__(34);
        /* harmony import */
        __webpack_require__(15);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__sputils_getNodesFromXml__ = __webpack_require__(20);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__models_ListColumnModel__ = __webpack_require__(66);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__collections_ListColumnsCollection__ = __webpack_require__(70);
        /**
 * Gets the list of columns names for the given list that are
 * visible on edit/new/disp forms. This method attempts to NOT return any
 * column that is internal.
 *
 * @param {Object|String} options
 *      An object with the options below, or a string with the listName.
 *
 * @param {String} options.listName
 *      The list name.
 *
 * @param {String} [options.columnName]
 *      Internal or External name of column. When set, only that one column will
 *      be returned.
 *
 * @param {String} [options.webURL]
 *
 * @param {Boolean} [options.cache=true]
 *      If true (default), request will be cached. This is mainly a pass through to
 *      `getList()`.
 *
 * @param {Object} [options.ListItemModel=ListColumnModel]
 *      The List Column Model factory to be used. Factory must expose a `create` method
 *      that accepts two input parameters: column definition (object) and options.
 *      See [ListColumnModel]{@link ListColumnModel} for more details.
 *
 * @param {Object} [options.ListColumnsCollection=ListColumnsCollection]
 *
 * @param {Array} [options.whiteList=[]]
 *  A list of column `Name`s that will always be returned, even if they are internal
 *  or hidden SharePoint List columns.
 *
 * @return {Promise<ListColumnCollection, Error>}
 *  Promise is resolved with an ListColumnCollection {@link ListColumnCollection}
 *  containing [ListColumnModels]{@link ListColumnModel}
 *
 * @example
 *
 * // Example of column definition object:
 *
 * {
 *      ColName: "nvarchar1",
 *      DisplayName: "Task Name",
 *      Name: "Title",
 *      StaticName: "Title",
 *      Type: "Text",
 *      FromBaseType: "TRUE",
 *      ID: "{fa564e0f-0c70-4ab9-b863-0177e6ddd247}",
 *      Required: "TRUE",
 *      Sealed: "TRUE",
 *      SourceID: "http://schemas.microsoft.com/sharepoint/v3",
 *      getColumnValues: function () {}
 * }
 */
        function getListColumns(options) {
            var opt = Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_objectExtend__.a)({}, getListColumns.defaults, "string" === typeof options ? {
                listName: options
            } : options);
            "undefined" !== typeof opt.cacheXML && (opt.cache = opt.cacheXML);
            return Object(__WEBPACK_IMPORTED_MODULE_1__getList__.a)({
                listName: opt.listName,
                cache: opt.cache,
                webURL: opt.webURL,
                async: opt.async
            }).then(function(list) {
                opt.listDef = list;
                var i, j, columns = Object(__WEBPACK_IMPORTED_MODULE_3__sputils_getNodesFromXml__.a)({
                    xDoc: list.getSource(),
                    nodeName: "Field",
                    nodeModel: opt.ListColumnModel,
                    convertTypes: true,
                    nodeModelOptions: {
                        list: list
                    }
                }), cols = [];
                for (i = 0, j = columns.length; i < j; i++) // Include only (all must match):
                //      -   Hidden attribute not set to is not true (no internal SP fields)
                //      -   Has to have a Display attribute
                //      -   No AuthoringInfo attribute (these are used on the edit buttons)
                if (opt.whiteList && -1 !== opt.whiteList.indexOf(columns[i].Name) || !columns[i].Hidden && (void 0 === columns[i].List || "Docs" !== columns[i].List && "AppPrincipals" !== columns[i].List) && columns[i].DisplayName && void 0 === columns[i].AuthoringInfo && (!opt.columnName || columns[i].Name === opt.columnName || columns[i].StaticName === opt.columnName || columns[i].DisplayName === opt.columnName)) {
                    // FIXME: remove this once all is converted to models
                    // If XML property is present, remove it
                    columns[i].___xmlNode && delete columns[i].___xmlNode;
                    cols.push(columns[i]);
                    // If there was a column name defined on input, then
                    // break the loop... this was it.
                    // FIXME: remove this option from this method
                    opt.columnName && (i += j);
                } else opt.ListModel && columns[i].destroy();
                return opt.ListColumnsCollection.create(cols, {
                    listDef: list
                });
            });
        }
        /**
 * Default input params
 * @static
 * @name getListColumns.defaults
 * @type {Object}
 */
        getListColumns.defaults = {
            listName: "",
            columnName: "",
            cache: true,
            webURL: null,
            whiteList: [ "ParentID", "FileLeafRef" ],
            ListColumnModel: __WEBPACK_IMPORTED_MODULE_4__models_ListColumnModel__.a,
            ListColumnsCollection: __WEBPACK_IMPORTED_MODULE_5__collections_ListColumnsCollection__.a
        };
        /* harmony default export */
        __webpack_exports__.a = getListColumns;
    }, /* 39 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return PRIVATE;
        });
        /* unused harmony export INTERNAL_EVENTS */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return EV_STOP_DEPENDEE_NOTIFICATION;
        });
        /* unused harmony export ARRAY_PROTOTYPE */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return OBJECT_PROTOTYPE;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return IS_COMPUTED_NOTIFIER;
        });
        /* unused harmony export OBSERVABLE_FLAG */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return bindCallTo;
        });
        /* unused harmony export dependeeList */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "j", function() {
            return onInternalEvent;
        });
        /* unused harmony export emitInternalEvent */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return isArray;
        });
        /* unused harmony export arrayIndexOf */
        /* unused harmony export arraySplice */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return arrayForEach;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "i", function() {
            return isPureObject;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return isObservable;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "m", function() {
            return setObservableFlag;
        });
        /* harmony export (immutable) */
        __webpack_exports__.l = setDependencyTracker;
        /* harmony export (immutable) */
        __webpack_exports__.p = unsetDependencyTracker;
        /* harmony export (immutable) */
        __webpack_exports__.n = stopDependeeNotifications;
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "k", function() {
            return queueDependeeNotifier;
        });
        /* harmony export (immutable) */
        __webpack_exports__.o = storeDependeeNotifiers;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_nextTick__ = __webpack_require__(24);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_es6_Set__ = __webpack_require__(17);
        //=======================================================================
        var NOOP = function() {};
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create();
        var INTERNAL_EVENTS = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_EventEmitter__.a.create();
        var EV_STOP_DEPENDEE_NOTIFICATION = "1";
        var ARRAY_PROTOTYPE = Array.prototype;
        var OBJECT_PROTOTYPE = Object.prototype;
        var IS_COMPUTED_NOTIFIER = "__od_cn__";
        var bindCallTo = Function.call.bind.bind(Function.call);
        var dependeeList = new __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_es6_Set__.a();
        var onInternalEvent = INTERNAL_EVENTS.on.bind(INTERNAL_EVENTS);
        var emitInternalEvent = INTERNAL_EVENTS.emit.bind(INTERNAL_EVENTS);
        var isArray = Array.isArray;
        bindCallTo(ARRAY_PROTOTYPE.indexOf);
        bindCallTo(ARRAY_PROTOTYPE.splice);
        var arrayForEach = bindCallTo(ARRAY_PROTOTYPE.forEach);
        var isPureObject = function(obj) {
            return obj && "[object Object]" === OBJECT_PROTOTYPE.toString.call(obj);
        };
        var isObservable = function(obj) {
            return obj && obj.___observable_data___ === NOOP;
        };
        var setObservableFlag = function(obj) {
            return obj && Object.defineProperty(obj, "___observable_data___", {
                get: function() {
                    return NOOP;
                }
            });
        };
        /**
 * Allows for adding a Dependee notifier to the global list of dependency trackers.
 *
 * @param {Function} dependeeNotifier
 */
        function setDependencyTracker(dependeeNotifier) {
            dependeeNotifier && dependeeList.add(dependeeNotifier);
        }
        /**
 * Removes a Dependee notifier from the global list of dependency trackers.
 *
 * @param {Function} dependeeNotifier
 */
        function unsetDependencyTracker(dependeeNotifier) {
            if (!dependeeNotifier) return;
            dependeeList.delete(dependeeNotifier);
        }
        /**
 * Removes a Dependee notifier from any stored ObservableProperty list of dependees, thus
 * stopping all notifications to that depenedee.
 *
 * @param {Function} dependeeNotifier
 */
        function stopDependeeNotifications(dependeeNotifier) {
            dependeeNotifier && emitInternalEvent(EV_STOP_DEPENDEE_NOTIFICATION, dependeeNotifier);
        }
        var queueDependeeNotifier = function() {
            var dependeeNotifiers = new __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_es6_Set__.a();
            var execNotifiers = function() {
                dependeeNotifiers.forEach(function(notifierCb) {
                    return notifierCb();
                });
                dependeeNotifiers.clear();
            };
            return function(notifierCb) {
                // Computed property notifiers are lightweight, so execute
                // these now and don't queue them.
                if (notifierCb[IS_COMPUTED_NOTIFIER]) {
                    notifierCb();
                    return;
                }
                if (!notifierCb || dependeeNotifiers.has(notifierCb)) return;
                var callNextTick = !dependeeNotifiers.size;
                dependeeNotifiers.add(notifierCb);
                callNextTick && Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_nextTick__.a)(execNotifiers);
            };
        }();
        function storeDependeeNotifiers(store) {
            store && dependeeList.size && dependeeList.forEach(function(dependeeCallback) {
                return store.add(dependeeCallback);
            });
        }
    }, /* 40 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export mixin */
        /* unused harmony export ObservableArray */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_nextTick__ = __webpack_require__(24);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_es6_Set__ = __webpack_require__(17);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__common__ = __webpack_require__(39);
        /* unused harmony reexport setDependencyTracker */
        /* unused harmony reexport unsetDependencyTracker */
        /* unused harmony reexport stopDependeeNotifications */
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        //==============================================================
        var ArrayPrototype = Array.prototype;
        var objectDefineProp = Object.defineProperty;
        var objectKeys = Object.keys;
        var emit = Object(__WEBPACK_IMPORTED_MODULE_3__common__.f)(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_EventEmitter__.a.prototype.emit);
        var changeMethods = [ "pop", "push", "shift", "splice", "unshift", "sort", "reverse" ];
        var addMethods = [ "push", "splice", "unshift" ];
        var removeMethods = [ "pop", "shift", "splice" ];
        /**
 * An Array like object with the added ability to listen to events.
 * It supports all methods available to a normal array, like `forEach`,
 * `some` and `reduce`
 *
 * @class ObservableArray
 *
 * @extends EventEmitter
 * @extends Array
 *
 * @fires ObservableArray#change
 */
        var ObservableArray = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_EventEmitter__.a.extend(/** @lends ObservableArray.prototype */ {
            /**
     * The length of the array. Unlike the `length` property, this one is able
     * to notify dependees if any are set to be track dependencies.
     *
     * @name len
     * @type {Number}
     */
            // For backwards compatible with initial version
            // use `len` property instead
            size: function() {
                Object(__WEBPACK_IMPORTED_MODULE_3__common__.o)(getInstance(this).dependees);
                return this.length;
            },
            /**
     * Returns a member of the collection given an index (zero based),
     * or updates the item at a given index with a new value.
     *
     * @param {Number} index
     * @param {*} [newValue]
     */
            item: function(index) {
                var args = ArrayPrototype.slice.call(arguments, 0);
                var _array = this;
                Object(__WEBPACK_IMPORTED_MODULE_3__common__.o)(getInstance(this).dependees);
                // GET mode..
                if (1 === args.length) return _array[index];
                // Update mode... Emits event
                var events = getNewEventObject();
                if (_array[index] === args[1]) events.updated = [ args[1] ]; else {
                    events.removed = [ _array[index] ];
                    events.added = [ args[1] ];
                }
                var updateResponse = _array[index] = args[1];
                notifyDependees(_array, events);
                return updateResponse;
            }
        });
        function getInstance(obArray) {
            if (!__WEBPACK_IMPORTED_MODULE_3__common__.d.has(obArray)) {
                var dependees = new __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_es6_Set__.a();
                var isQueued = false;
                var nextEvent = null;
                var storeEventData = function(events) {
                    if (!events) return;
                    nextEvent || (nextEvent = getNewEventObject());
                    objectKeys(events).forEach(function(eventName) {
                        var _nextEvent$eventName;
                        if (!events[eventName]) return;
                        nextEvent[eventName] || (nextEvent[eventName] = []);
                        (_nextEvent$eventName = nextEvent[eventName]).push.apply(_nextEvent$eventName, _toConsumableArray(events[eventName]));
                    });
                };
                var inst = {
                    dependees: dependees,
                    notify: function(events) {
                        // Queue up calling all dependee notifiers
                        dependees.forEach(function(cb) {
                            return Object(__WEBPACK_IMPORTED_MODULE_3__common__.k)(cb);
                        });
                        storeEventData(events);
                        if (isQueued) return;
                        isQueued = true;
                        Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_nextTick__.a)(function() {
                            var eventData = nextEvent;
                            nextEvent = null;
                            /**
                     * ObservableArray was changed.
                     *
                     * @event ObservableArray#change
                     * @type {ObservableArray~ObservableArrayChangeEvent}
                     */
                            emit(obArray, "change", eventData);
                            isQueued = false;
                        });
                    }
                };
                __WEBPACK_IMPORTED_MODULE_3__common__.d.set(obArray, inst);
                var ev1 = Object(__WEBPACK_IMPORTED_MODULE_3__common__.j)(__WEBPACK_IMPORTED_MODULE_3__common__.a, function(cb) {
                    dependees.delete(cb);
                });
                obArray.onDestroy && obArray.onDestroy(function() {
                    dependees.clear();
                    ev1.off();
                    __WEBPACK_IMPORTED_MODULE_3__common__.d.delete(obArray);
                });
            }
            return __WEBPACK_IMPORTED_MODULE_3__common__.d.get(obArray);
        }
        /**
 * Converts an array instance methods to a wrapped version that can detect changes
 * and also track dependee notifiers when data is accessed from the array
 *
 * @param {Array} arr
 *
 * @return {Array}
 */
        function makeArrayObservable(arr) {
            // If it looks like this array is already an being observered, then exit.
            if (Object(__WEBPACK_IMPORTED_MODULE_3__common__.h)(arr)) return;
            Object(__WEBPACK_IMPORTED_MODULE_3__common__.m)(arr);
            var arrCurrentProto = arr.__proto__;
            // eslint-disable-line
            var newArrProto = void 0;
            // If we already have a wrapped prototype for this array's
            // current prototype, then just use that
            if (__WEBPACK_IMPORTED_MODULE_3__common__.d.has(arrCurrentProto)) newArrProto = __WEBPACK_IMPORTED_MODULE_3__common__.d.get(arrCurrentProto); else {
                // Create new Array instance prototype
                newArrProto = Object.create(arrCurrentProto);
                // Add all methods of Array.prototype to the collection
                Object.getOwnPropertyNames(ArrayPrototype).forEach(function(method) {
                    if ("constructor" === method || "function" !== typeof ArrayPrototype[method]) return;
                    var origMethod = newArrProto[method];
                    var doEvents = -1 !== changeMethods.indexOf(method);
                    var canAdd = -1 !== addMethods.indexOf(method);
                    var canRemove = -1 !== removeMethods.indexOf(method);
                    var isArraySplice = "splice" === method;
                    objectDefineProp(newArrProto, method, {
                        value: function() {
                            var _this = this;
                            Object(__WEBPACK_IMPORTED_MODULE_3__common__.o)(getInstance(this).dependees);
                            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                            var response = origMethod.call.apply(origMethod, [ this ].concat(args));
                            // If the response is an array, then add method to it that allows it
                            // to be converted to an observable
                            Object(__WEBPACK_IMPORTED_MODULE_3__common__.g)(response) && response !== this && objectDefineProp(response, "toObservable", {
                                value: function() {
                                    if (_this.getFactory) return _this.getFactory().create(response);
                                    return mixin(response);
                                }
                            });
                            // If Array method can manipulate the array, then emit event
                            if (doEvents) {
                                var events = getNewEventObject();
                                // Add Events
                                canAdd && (isArraySplice ? args.length > 2 && (events.added = args.slice(2)) : events.added = args);
                                canRemove && (events.removed = isArraySplice ? response : [ response ]);
                                notifyDependees(this, events);
                            }
                            return response;
                        },
                        writable: true,
                        configurable: true
                    });
                });
                // Add `len` property, which is shorthand for `length` but with added
                // ability to observe for array changes when called and trigger notifiers
                // when changed.
                objectDefineProp(newArrProto, "len", {
                    get: function() {
                        Object(__WEBPACK_IMPORTED_MODULE_3__common__.o)(getInstance(this).dependees);
                        return this.length;
                    },
                    set: function(n) {
                        var response = this.length = n;
                        notifyDependees(this);
                        return response;
                    },
                    configurable: true
                });
                __WEBPACK_IMPORTED_MODULE_3__common__.d.set(arrCurrentProto, newArrProto);
            }
            arr.__proto__ = newArrProto;
            // eslint-disable-line
            return arr;
        }
        function notifyDependees(arrObj, events) {
            getInstance(arrObj).notify(events);
        }
        /**
 * Make an array instance observable in place
 *
 * @param {Array} arr
 *
 * @return {Array}
 */
        function mixin(arr) {
            Object(__WEBPACK_IMPORTED_MODULE_3__common__.g)(arr) || (arr = []);
            return ObservableArray.create(arr);
        }
        // Define the "create" factory method that will then redefine each
        // our proxyied methods of Array prototype into the array instance
        objectDefineProp(ObservableArray, "create", {
            value: function(arrayInstance) {
                var observable = arrayInstance || [];
                var thisPrototype = this.prototype;
                if (Object(__WEBPACK_IMPORTED_MODULE_3__common__.h)(observable)) return observable;
                makeArrayObservable(observable);
                var observableProto = Object.create(observable.__proto__);
                // eslint-disable-line
                // FIXME: we should be caching this new object (prototype) defined above...
                // Copy all methods in this prototype to the Array instance
                for (var prop in thisPrototype) /* eslint-disable */
                objectDefineProp(observableProto, prop, {
                    value: thisPrototype[prop],
                    writable: true,
                    configurable: true
                });
                objectDefineProp(observableProto, "constructor", {
                    value: this
                });
                observable.__proto__ = observableProto;
                observable.init && observable.init.apply(observable, arguments);
                return observable;
            }
        });
        function getNewEventObject() {
            /**
     * The array was changed.
     *
     * @typedef {Object} ObservableArray~ObservableArrayChangeEvent
     * @property {Array|null} added
     * @property {Array|null} removed
     * @property {Array|null} updated
     */
            return {
                added: null,
                removed: null,
                updated: null
            };
        }
        /* harmony default export */
        __webpack_exports__.a = ObservableArray;
    }, /* 41 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domMatches */
        /**
 * Given an HTML Element and a selector, this method will return
 * a Boolean indicating if Element matches selector.
 *
 * @function domMatches
 *
 * @param {HTMLElement} el
 * @param {String} selector
 *
 * @return {Boolean}
 */
        function domMatches(el, selector) {
            if (!el || !selector) return false;
            return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
        }
        /* harmony default export */
        __webpack_exports__.a = domMatches;
    }, /* 42 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__sputils_apiFetch__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__getSiteWebUrl__ = __webpack_require__(14);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__models_UserProfileModel__ = __webpack_require__(18);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_domutils_domFind__ = __webpack_require__(9);
        /**
 * Given a list of users, this method will resolve those if they
 * are not part of the site collection user list info.
 *
 * @param {Object} options
 *
 * @param {Array|String} options.principalKeys
 *  The principal key (login name/Account Name/email) to be resolved.
 *  An array of values can also be used on input.
 *
 * @param {String} [options.webURL="current_site"]
 *
 * @param {String} [options.principalType='All']
 *  The type of principal that is being resolved. Possible values are
 *  `All` (default), `Distribution List`, `None`, `SecurityGroup`,
 *  `SharePointGroup` and `User`.
 *   See https://msdn.microsoft.com/en-us/library/people.spprincipaltype(v=office.12).aspx
 *
 * @param {Boolean} [options.addToUserInfoList=true]
 *  If true, then principal will be added to the site collection
 *  user info list.
 *
 * @param {Compose} [options.UserProfileModel=UserProfileModel]
 *  A Composable object that will be used to build each user profile.
 *
 * @return {Promise<Array<UserProfileModel>, Error>}
 *  Promise is resolved with an array of UserProfileModels
 *  or rejected with an error.
 *
 * @see https://msdn.microsoft.com/EN-US/library/office/websvcpeople.people.resolveprincipals.aspx
 *
 * @example
 *
 *  resolvePrincipals({
 *      principalKeys: "domain\\userid"
 *  })
 *  .then(function(resolvedUsers){
 *      // do something
 *  });
 */
        var resolvePrincipals = function resolvePrincipals(options) {
            var opt = Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, resolvePrincipals.defaults, options);
            Array.isArray(opt.principalKeys) || (opt.principalKeys = [ opt.principalKeys ]);
            return Object(__WEBPACK_IMPORTED_MODULE_1__getSiteWebUrl__.a)(opt.webURL).then(function(webURL) {
                opt.webURL = webURL + "/_vti_bin/People.asmx";
                var principalXml = opt.principalKeys.map(function(principal) {
                    return "<string>" + principal + "</string>";
                }).join("");
                return Object(__WEBPACK_IMPORTED_MODULE_0__sputils_apiFetch__.a)(opt.webURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/xml;charset=UTF-8",
                        SOAPAction: "http://schemas.microsoft.com/sharepoint/soap/ResolvePrincipals"
                    },
                    body: '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ResolvePrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/"><principalKeys>' + principalXml + "</principalKeys><principalType>" + opt.principalType + "</principalType><addToUserInfoList>" + opt.addToUserInfoList + "</addToUserInfoList></ResolvePrincipals></soap:Body></soap:Envelope>"
                }).then(function(response) {
                    return Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_domutils_domFind__.a)(response.content, "PrincipalInfo").map(function(principalInfo) {
                        return Array.prototype.slice.call(principalInfo.childNodes, 0).reduce(function(profile, attrNode) {
                            var attrName = attrNode.nodeName;
                            if (1 === attrNode.nodeType) {
                                profile[attrName] = attrNode.textContent;
                                "DisplayName" === attrName && (profile.Name = profile[attrName]);
                                "UserInfoID" === attrName && (profile.ID = profile[attrName]);
                            }
                            return profile;
                        }, opt.UserProfileModel.create());
                    });
                });
            });
        };
        resolvePrincipals.defaults = {
            webURL: "",
            principalKeys: [],
            principalType: "All",
            addToUserInfoList: true,
            UserProfileModel: __WEBPACK_IMPORTED_MODULE_2__models_UserProfileModel__.a
        };
        /* harmony default export */
        __webpack_exports__.a = resolvePrincipals;
    }, /* 43 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__sputils_apiFetch__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__sputils_cache__ = __webpack_require__(15);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__getSiteWebUrl__ = __webpack_require__(14);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__models_UserProfileModel__ = __webpack_require__(18);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_domutils_domFind__ = __webpack_require__(9);
        /**
 * Given some text, the operation will search for user that match
 * that text.
 *
 * @param {Object} options
 * @param {Object} options.searchText
 * @param {Object} [options.maxResults=50]
 * @param {Object} [options.principalType='All']
 *      Default is User. Others include: None, DistributionList,
 *      SecurityGroup, SharePointGroup, All
 * @param {Object} [options.webURL='currentSiteUrl']
 * @param {Object} [options.cache=true]
 *
 * @return {Promise<Array<UserProfileModel>, Error>}
 *  Promise is resolved with an array of UserProfileModels
 *  or rejected with an error.
 *
 * @see https://msdn.microsoft.com/en-us/library/people.people.searchprincipals.aspx
 */
        var searchPrincipals = function searchPrincipals(options) {
            var reqPromise, opt = Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_objectExtend__.a)({}, searchPrincipals.defaults, options);
            return Object(__WEBPACK_IMPORTED_MODULE_2__getSiteWebUrl__.a)(opt.webURL).then(function(webURL) {
                opt.webURL = webURL + "_vti_bin/People.asmx";
                opt.cacheKey = opt.webURL + "?" + [ opt.searchText, opt.maxResults, opt.principalType ].join("|");
                opt.isCached = __WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a.isCached(opt.cacheKey);
                if (opt.cacheXML && opt.isCached) return Object(__WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a)(opt.cacheKey);
                __WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a.clear(opt.cacheKey);
                reqPromise = Object(__WEBPACK_IMPORTED_MODULE_0__sputils_apiFetch__.a)(opt.webURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/xml;charset=UTF-8"
                    },
                    body: '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><SearchPrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/"><searchText>' + opt.searchText + "</searchText><maxResults>" + opt.maxResults + "</maxResults><principalType>" + opt.principalType + "</principalType></SearchPrincipals></soap:Body></soap:Envelope>"
                }).then(function(response) {
                    return Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_domutils_domFind__.a)(response.content, "PrincipalInfo").map(function(principalInfo) {
                        return opt.UserProfileModel.create(Array.prototype.slice.call(principalInfo.childNodes, 0).reduce(function(profile, attrNode) {
                            var attrName = attrNode.nodeName;
                            1 === attrNode.nodeType && (profile[attrName] = attrNode.textContent);
                            return profile;
                        }, {}), {
                            webURL: webURL
                        });
                    });
                });
                opt.cache && Object(__WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a)(opt.cacheKey, reqPromise);
                reqPromise.catch(function() {
                    __WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a.clear(opt.cacheKey, reqPromise);
                });
                return reqPromise;
            });
        };
        searchPrincipals.defaults = {
            searchText: "",
            maxResults: 50,
            principalType: "All",
            webURL: "",
            cache: true,
            UserProfileModel: __WEBPACK_IMPORTED_MODULE_3__models_UserProfileModel__.a
        };
        // SAMPLE XML response:
        // <?xml version="1.0" encoding="utf-8"?>
        //      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        //          <soap:Body>
        //              <SearchPrincipalsResponse xmlns="http://schemas.microsoft.com/sharepoint/soap/">
        //                  <SearchPrincipalsResult>
        //                      <PrincipalInfo>
        //                          <AccountName>i:0#.f|membership|jack.smith@tenant.com</AccountName>
        //                          <UserInfoID>12</UserInfoID>
        //                          <DisplayName>Jack Smith</DisplayName>
        //                          <Email>jack.smith@tenant.com</Email>
        //                          <IsResolved>true</IsResolved>
        //                          <PrincipalType>User</PrincipalType>
        //                      </PrincipalInfo>
        //                      <PrincipalInfo>
        //                          <AccountName>i:0#.f|membership|jack.miller@tenant.com</AccountName>
        //                          <UserInfoID>15</UserInfoID>
        //                          <DisplayName>Jack Miller</DisplayName>
        //                          <IsResolved>true</IsResolved>
        //                          <PrincipalType>User</PrincipalType>
        //                      </PrincipalInfo>
        //                  </SearchPrincipalsResult>
        //              </SearchPrincipalsResponse>
        //          </soap:Body>
        //  </soap:Envelope>
        /* harmony default export */
        __webpack_exports__.a = searchPrincipals;
    }, /* 44 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export uuid */
        // Some of the code below was taken from from https://github.com/ericelliott/cuid/
        /**
 * Generates a unique id. This is really a CUID.
 *
 * @namespace uuid
 */
        var counter = 1, pad = function(num, size) {
            var s = "000000000" + num;
            return s.substr(s.length - size);
        }, globalCount = function() {
            var i, count = 0;
            for (i in window) count++;
            return count;
        }(), fingerprint = function() {
            return pad((navigator.mimeTypes.length + navigator.userAgent.length).toString(36) + globalCount.toString(36), 4);
        }();
        var uuid = Object.create(/** @lends uuid */ {
            generate: function() {
                var timestamp = new Date().getTime().toString(36), nextCounter = pad((counter++).toString(36), 4), random = "xxxxxxxx".replace(/[x]/g, function() {
                    // This code from: http://stackoverflow.com/a/2117523/471188
                    var v = 16 * Math.random() | 0;
                    return v.toString(16);
                });
                return "c" + timestamp + nextCounter + fingerprint + random;
            }
        });
        /* harmony default export */
        __webpack_exports__.a = uuid;
    }, /* 45 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_es6_Map__ = __webpack_require__(46);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7__ListItem_ListItem__ = __webpack_require__(47);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8__List_html__ = __webpack_require__(97);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8__List_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__List_html__);
        //-------------------------------------------------------------
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create();
        /**
 * A list of items.
 *
 * @class List
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} [options]
 *
 * @param {Array<Object>|Collection} [options.items]
 *  An array of objects with the items to be displayed. Could also be a
 *  `Collection` as a result of an API call.  Each Object should contain
 *  the attributes needed by the specified `ListItemWidget` on input.
 *
 * @param {Widget} [options.ListItemWidget]
 *  The Widget to be used in building each list item. If widget inherits
 *  from [EventEmitter]{@link EventEmitter}, then those events will be
 *  `pipe`'d to this widget.
 *
 * @param {Object} [options.listItemOptions]
 *  Options to be passed along to each initialization of a ListItem widget.
 *
 * @param {Object} [options.allowMultiples = true]
 *  If selection of multiples items is allowed. Default is true.
 *
 * @fires ListItem#item:selected
 * @fires ListItem#item:unselected
 */
        var List = /** @lends List.prototype */ {
            init: function(options) {
                var inst = {
                    opt: Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options),
                    listItems: new __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_es6_Map__.a()
                };
                PRIVATE.set(this, inst);
                this.$ui = Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__.a)(Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__.a)(__WEBPACK_IMPORTED_MODULE_8__List_html___default.a, inst.opt)).firstChild;
                inst.opt.items && this.setItems(inst.opt.items);
                this.onDestroy(function() {
                    this.clear();
                    PRIVATE.delete(this);
                }.bind(this));
            },
            /**
     * Sets a new list of items provided on input to the widget.
     *
     * @param {Array<Object>|Collection} items
     */
            setItems: function(items) {
                var _this = this;
                var me = this, inst = PRIVATE.get(me), listItems = inst.listItems, $ele = me.getEle(), $newItemSet = document.createDocumentFragment(), ListItemWidget = inst.opt.ListItemWidget;
                me.clear();
                // Item object needs to have `forEach` (array or Collection)
                if (!items || !items.forEach) return;
                items.forEach(function(itemData) {
                    var itemWidget = ListItemWidget.create({
                        item: itemData
                    });
                    itemWidget.appendTo($newItemSet);
                    itemWidget.pipe(me, "item:");
                    // if single selection, then ensure that when an item is selected, that we unSelect all others
                    inst.opt.allowMultiples || itemWidget.on("selected", function(selectedItem) {
                        _this.unselectAll();
                        listItems.get(selectedItem).select();
                    });
                    listItems.set(itemData, itemWidget);
                });
                $ele.appendChild($newItemSet);
            },
            /**
     * Clears all items from the list (removes them)
     */
            clear: function() {
                var listItems = PRIVATE.get(this).listItems;
                listItems.forEach(function(listItem) {
                    listItem && listItem.destroy();
                });
                listItems.clear();
            },
            /**
     * Select a specific item currently in the list
     *
     * @param {Object} itemData
     * The item data object that represents the item to be selected.
     * Note that this object must be exactly the one used when the item
     * was added to the List.
     */
            selectItem: function(itemData) {
                var listItems = PRIVATE.get(this).listItems;
                itemData && listItems.has(itemData) && listItems.get(itemData).select();
            },
            /**
     * Unselect a specific item currently in the list.
     *
     * @param {Object} itemData
     * The item data object that represents the item to be selected.
     * Note that this object must be exactly the one used when the item
     * was added to the List.
     */
            unselectItem: function(itemData) {
                var listItems = PRIVATE.get(this).listItems;
                itemData && listItems.has(itemData) && listItems.get(itemData).unselect();
            },
            /**
     * Un-selects all items from the list
     */
            unselectAll: function() {
                PRIVATE.get(this).listItems.forEach(function(itemWdg) {
                    return itemWdg.unselect();
                });
            },
            /**
     * Returns an array (possibly empty) of all selected items in the list
     *
     * @return {Array}
     */
            getSelected: function() {
                var response = [];
                PRIVATE.get(this).listItems.forEach(function(itemWdg, itemData) {
                    itemWdg.isSelected() && response.push(itemData);
                });
                return response;
            }
        };
        List = __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__.a.extend(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__.a, List);
        List.defaults = {
            items: null,
            ListItemWidget: __WEBPACK_IMPORTED_MODULE_7__ListItem_ListItem__.a,
            listItemOptions: null,
            allowMultiples: true
        };
        /* harmony default export */
        __webpack_exports__.a = List;
    }, /* 46 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Map__ = __webpack_require__(93);
        /* unused harmony reexport Map */
        /* unused harmony reexport FakeMap */
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return __WEBPACK_IMPORTED_MODULE_0__Map__.a;
        });
    }, /* 47 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domAddEventListener__ = __webpack_require__(10);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domHasClass__ = __webpack_require__(19);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domToggleClass__ = __webpack_require__(26);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domAddClass__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10_common_micro_libs_src_domutils_domRemoveClass__ = __webpack_require__(11);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_11__ListItemSimple_html__ = __webpack_require__(94);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_11__ListItemSimple_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__ListItemSimple_html__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_12__ListItem_less__ = __webpack_require__(95);
        /* harmony import */
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__ListItem_less__);
        //----------------------------------------------------------------
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create();
        var NBSP = "&nbsp;";
        /**
 * A list item widget displayed in the `List`. The widget provides
 * a template where multiple pieces of data can be displayed as well
 * as support for selection and visual queues.
 *
 * @class ListItem
 * @extends Widget
 *
 * @param {Object} options
 *
 * @param {Object} options.item
 *  The Item model for the list item. Object will also be given to event
 *  callbacks
 *
 * @param {String} [options.primaryFrom='Title']
 *  The attribute from `options.item` to be used as the value for the
 *  Primary text.
 *
 * @param {String} [options.secondaryFrom='Editor']
 *
 * @param {String} [options.tertiaryFrom='']
 *
 * @param {String} [options.metaFrom='Modified']
 *
 * @param {Object} [options.selectable=true]
 *
 * @param {Object} [options.unseen=false]
 *
 * @param {Object} [options.unread=false]
 *
 *
 * @fires ListItem#selected
 * @fires ListItem#unselected
 */
        var ListItem = /** @lends ListItem.prototype */ {
            init: function(options) {
                var me = this, inst = {
                    opt: Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options, {
                        _ui: {}
                    })
                }, opt = inst.opt, item = opt.item, _ui = opt._ui;
                PRIVATE.set(this, inst);
                // Define the data values for the template
                _ui.primary = item[opt.primaryFrom || "Title"] || NBSP;
                _ui.secondary = item[opt.secondaryFrom] || NBSP;
                _ui.tertiary = item[opt.tertiaryFrom] || NBSP;
                _ui.meta = item[opt.metaFrom] || NBSP;
                var $ui = me.$ui = Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__.a)(Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__.a)(this.getTemplate(), opt)).firstChild;
                // Apply behaviours to the template
                opt.selectable && Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domAddClass__.a)($ui, "is-selectable");
                opt.unseen && Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domAddClass__.a)($ui, "is-unseen");
                opt.unread && Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domAddClass__.a)($ui, "is-unread");
                // Listen for clicks on the list item
                Object(__WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domAddEventListener__.a)($ui, "click", function() {
                    // If selectable, toggle the condition
                    if (Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domHasClass__.a)($ui, "is-selectable")) {
                        me.toggleSelected();
                        Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domHasClass__.a)($ui, "is-selected") ? /**
                     * List Item was selected. The data structure used to
                     * build the list item is provided to event listeners.
                     *
                     * @event ListItem#selected
                     * @type Object
                     */
                        me.emit("selected", item) : /**
                     * List Item was unselected. The data structure used to
                     * build the list item is provided to event listeners.
                     *
                     * @event ListItem#unselected
                     * @type Object
                     */
                        me.emit("unselected", item);
                    }
                });
                me.onDestroy(function() {
                    PRIVATE.delete(me);
                }.bind(this));
            },
            /**
     * Toggles the item's selection. Only applied if List item `is-selectable`
     */
            toggleSelected: function() {
                var $ui = this.getEle();
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domHasClass__.a)($ui, "is-selectable") && Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domToggleClass__.a)($ui, "is-selected");
            },
            /**
     * Selects the list item. Only applied if list item `is-selectable`
     */
            select: function() {
                var $ui = this.getEle();
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domHasClass__.a)($ui, "is-selectable") && Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domAddClass__.a)($ui, "is-selected");
            },
            /**
     * Unselects the List item. Only applied if list item `is-selectable`
     */
            unselect: function() {
                var $ui = this.getEle();
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domHasClass__.a)($ui, "is-selectable") && Object(__WEBPACK_IMPORTED_MODULE_10_common_micro_libs_src_domutils_domRemoveClass__.a)($ui, "is-selected");
            },
            /**
     * Returns a boolean indicating if the item is currently selected in the list
     *
     * @return {Boolean}
     */
            isSelected: function() {
                return Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domHasClass__.a)(this.getEle(), "is-selected");
            },
            /**
     * Returns the template for the widget.
     *
     * @return {String}
     */
            getTemplate: function() {
                return __WEBPACK_IMPORTED_MODULE_11__ListItemSimple_html___default.a;
            }
        };
        ListItem = __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__.a.extend(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__.a, ListItem);
        ListItem.defaults = {
            item: null,
            primaryFrom: "Title",
            secondaryFrom: "Editor",
            tertiaryFrom: "",
            metaFrom: "Modified",
            selectable: true,
            unseen: false,
            unread: false
        };
        /* harmony default export */
        __webpack_exports__.a = ListItem;
    }, /* 48 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domPosition */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__jsutils_objectExtend__ = __webpack_require__(0);
        var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        var WINDOW = window;
        var DOCUMENT = WINDOW.document;
        var SCROLL_TOP = "scrollTop";
        var SCROLL_LEFT = "scrollLeft";
        var PAGE_Y_OFFSET = "pageYOffset";
        var PAGE_X_OFFSET = "pageXOffset";
        var UNDEFINED = "undefined";
        var PX = "px";
        //const isTop     = /top/i;
        //const isBottom  = /bottom/i;
        var isLeft = /left/i;
        //const isRight   = /right/i;
        /**
 * Positions an element against another. Elements (both `positionEle` and
 * `anchorEle` should already be visible in dom (ex. call this method right
 * after adding them to DOM).
 *
 * @function domPosition
 *
 * @param {HTMLElement} positionEle
 *
 * @param {HTMLElement} anchorEle
 *
 * @param {Object} [options]
 * 
 * @param {String} [options.my]
 *  Which area of the `positionEle` should be used to position it against the
 *  `anchorEle`. Default is `top left`. Possible values:
 *  -   `top left`
 *  -   `top right`
 *
 * @param {String} [options.at]
 *  The `anchorEle` position where the `positionEle` should be displayed. Default
 *  is `bottom left` (so right below the `anchorEle`, left aligned).
 *
 * @param {HTMLElement} [options.viewport=window]
 *  The viewport to be used in detecting collision. (NOTE: currently,
 *  only window is supported)
 *
 */
        function domPosition(positionEle, anchorEle, options) {
            var positionEleStyles = positionEle.style;
            var anchorEleRect = anchorEle.getBoundingClientRect();
            var positionEleRect = positionEle.getBoundingClientRect();
            var opt = Object(__WEBPACK_IMPORTED_MODULE_0__jsutils_objectExtend__.a)({
                my: "top left",
                at: "bottom left",
                viewport: WINDOW
            }, options);
            var _getViewportScrollInf = getViewportScrollInfo(opt.viewport), scrollTop = _getViewportScrollInf.scrollTop, scrollLeft = _getViewportScrollInf.scrollLeft;
            // FIXME: support for non-window viewport
            // FIXME: support for non window viewport
            // var viewportTop     = 0;
            var viewportBottom = opt.viewport.innerHeight;
            var viewportRight = opt.viewport.innerWidth;
            var isMyLeft = isLeft.test(opt.my);
            var isMyRight = !isMyLeft;
            var isAtLeft = isLeft.test(opt.at);
            var isAtRight = !isAtLeft;
            // Set default coordinates based o above position defaults
            var posLeft = anchorEleRect.left;
            var posTop = anchorEleRect.bottom + scrollTop;
            //------------------------------------------
            // CALCULATE: TOP
            // Top side of position ele
            //------------------------------------------
            // FIXME: support for "my" === bottom as well as "at" top
            //------------------------------------------
            // CALCULATE: LEFT
            // Left side of the position el
            //------------------------------------------
            // my === left  &&  at === right
            isMyLeft && isAtRight ? posLeft = anchorEleRect.right : isMyRight && isAtRight ? posLeft = anchorEleRect.right - positionEleRect.width : isMyRight && isAtLeft && (posLeft = anchorEleRect.left - positionEleRect.width);
            //------------------------------------------------------
            // Adjust positions based on viewport collisions
            //------------------------------------------------------
            //--- LEFT --\\
            // If the Right side of the position element goes beyound
            // the right side of the viewport, flip the horizontal position...
            posLeft + positionEleRect.width > viewportRight + scrollLeft && (posLeft -= positionEleRect.width);
            //--- TOP --\\
            // If it the position of the element goes beyond the bottom of
            // the viewport, flip it up...
            posTop + positionEleRect.height > viewportBottom + scrollTop && (posTop -= positionEleRect.height + anchorEleRect.height);
            positionEleStyles.left = posLeft + PX;
            positionEleStyles.top = posTop + PX;
        }
        /* harmony default export */
        __webpack_exports__.a = domPosition;
        /**
 * returns the `scrollTop` and `scrollLeft` for a given element
 *
 * @param {HTMLElement|Window|Document} viewport
 * @returns {Object}
 *
 * @example
 *
 * // return object:
 *
 * {
 *      scrollTop:      222,
 *      scrollLeft:     11
 * }
 *
 */
        function getViewportScrollInfo(viewport) {
            var response = {};
            if (viewport === WINDOW || viewport === DOCUMENT) if (_typeof(WINDOW[PAGE_Y_OFFSET]) !== UNDEFINED) {
                response[SCROLL_TOP] = WINDOW[PAGE_Y_OFFSET];
                response[SCROLL_LEFT] = WINDOW[PAGE_X_OFFSET];
            } else if (DOCUMENT.documentElement) {
                response[SCROLL_TOP] = DOCUMENT.documentElement[SCROLL_TOP];
                response[SCROLL_LEFT] = DOCUMENT.documentElement[SCROLL_LEFT];
            } else {
                response[SCROLL_TOP] = DOCUMENT.body[SCROLL_TOP];
                response[SCROLL_LEFT] = DOCUMENT.body[SCROLL_LEFT];
            } else {
                response[SCROLL_TOP] = viewport[SCROLL_TOP];
                response[SCROLL_LEFT] = viewport[SCROLL_LEFT];
            }
            return response;
        }
    }, /* 49 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export DomKeyboardInteraction */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__domAddEventListener__ = __webpack_require__(10);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__domFind__ = __webpack_require__(9);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__domChildren__ = __webpack_require__(25);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6__domHasClass__ = __webpack_require__(19);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7__domAddClass__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8__domRemoveClass__ = __webpack_require__(11);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9__domToggleClass__ = __webpack_require__(26);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10__scrollEleIntoView__ = __webpack_require__(99);
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_1__jsutils_dataStore__.a.create();
        /**
 * Adds Keyboard navigation support (up, down, enter, esc) to the
 * children of a given element controlled from an input field.
 * For use in cases where the user's cursor may be focused on an
 * input field (or an elemnet that can receive focus) and wanting to
 * control selection of HTML elements in a group.  As focus moves
 * from Element to Element, the `focusClass`  CSS class (see input
 * params) will be applied to the element.
 *
 * The keyboard action that will be applies are:
 *
 * -    UP arrow key: move focus to prior selection
 * -    DOWN arrow key: move focus to prior selection
 * -    ENTER key: Add `selectedClass` to element
 * -    ESC key: remove `focusClass` from current element
 *
 * @class DomKeyboardInteraction
 * @extends EventEmitter
 *
 * @param {Object} options
 *
 * @param {HTMLElement} options.input
 *  An input field or an element that can received focus (ex. `tabindex=0`).
 *  Keyboard interaction will be driven from this input while it has focus.
 *
 * @param {HTMLElement} options.eleGroup
 *  The Element containing the group of Element that will be cycled. This
 *  would likely be an element with `max-height` set and `overflow:auto`.
 *
 * @param {String} [options.eleSelector=""]
 *  The selector to be used in retrieving the list of element that will
 *  receive focus with the keyboard actions. Selector will be used on
 *  `options.eleGroup`. If not defined, the children of `options.eleGroup`
 *  will be used to set focus
 *
 * @param {String} [options.focusClass="my-isFocused"]
 *  The CSS class name that will be applied to the Element that gains focus.
 *
 * @param {String} [options.selectedClass="my-isSelected"]
 *  The CSS Class name that will be applied to the Element that should be
 *  marked as selected.
 *
 * @param {Boolean} [options.preventDefault=true]
 *  If set to true, `preventDefault` method of the event will be called.
 *
 * @param {Boolean} [options.stopPropagation=true]
 *  If se to `true`, `stopPropagation` method of the event will be called.
 *
 * @fires DomKeyboardInteraction#keyDown
 * @fires DomKeyboardInteraction#keyUp
 * @fires DomKeyboardInteraction#keyEnter
 * @fires DomKeyboardInteraction#keyEsc
 *
 * @example
 *
 * var keyboardInteraction = DomKeyboardInteraction.create({
 *      input: inputFieldElement,
 *      eleGroup: choicesElement,
 *      eleSelector: ".choice"
 * });
 */
        var DomKeyboardInteraction = /** @lends DomKeyboardInteraction.prototype */ {
            init: function(options) {
                var inst = {
                    opt: Object(__WEBPACK_IMPORTED_MODULE_0__jsutils_objectExtend__.a)({}, DomKeyboardInteraction.defaults, options)
                }, opt = inst.opt, domListeners = [];
                PRIVATE.set(this, inst);
                if (!opt.input || !opt.eleGroup) throw new TypeError("options.input and options.eleGroup are required");
                // Helper methods
                inst.hasFocus = function(ele) {
                    return Object(__WEBPACK_IMPORTED_MODULE_6__domHasClass__.a)(ele, opt.focusClass);
                };
                inst.setFocus = function(ele) {
                    return Object(__WEBPACK_IMPORTED_MODULE_7__domAddClass__.a)(ele, opt.focusClass);
                };
                inst.removeFocus = function(ele) {
                    return Object(__WEBPACK_IMPORTED_MODULE_8__domRemoveClass__.a)(ele, opt.focusClass);
                };
                inst.getChildren = function() {
                    return opt.eleSelector ? Object(__WEBPACK_IMPORTED_MODULE_4__domFind__.a)(opt.eleGroup, opt.eleSelector) : Object(__WEBPACK_IMPORTED_MODULE_5__domChildren__.a)(opt.eleGroup);
                };
                domListeners.push(Object(__WEBPACK_IMPORTED_MODULE_3__domAddEventListener__.a)(opt.input, "keydown", function(ev) {
                    var focusEle, key = ev.which || ev.keyCode, eventName = "";
                    switch (key) {
                      case 40:
                        /**
                     * User clicked the DOWN arrow key.
                     *
                     * @event DomKeyboardInteraction#keyDown
                     *
                     * @type {KeyboardEvent}
                     * @property {HTMLElement|undefined} focusElement
                     */
                        eventName = "keyDown";
                        focusEle = this.focusNext();
                        break;

                      case 38:
                        /**
                     * User clicked the UP arrow key.
                     *
                     * @event DomKeyboardInteraction#keyUp
                     *
                     * @type {KeyboardEvent}
                     * @property {HTMLElement|undefined} focusElement
                     */
                        eventName = "keyUp";
                        focusEle = this.focusPrevious();
                        break;

                      case 13:
                        /**
                     * User clicked the ENTER key.
                     *
                     * @event DomKeyboardInteraction#keyEnter
                     *
                     * @type {KeyboardEvent}
                     * @property {HTMLElement|undefined} focusElement
                     */
                        eventName = "keyEnter";
                        focusEle = toggleSelected.call(this);
                        break;

                      case 27:
                        /**
                     * User clicked the ESC key.
                     *
                     * @event DomKeyboardInteraction#keyEsc
                     *
                     * @type {KeyboardEvent}
                     * @property {HTMLElement|undefined} focusElement
                     */
                        eventName = "keyEsc";
                        focusEle = this.resetFocus();
                    }
                    if (eventName) {
                        ev.focusElement = focusEle;
                        opt.preventDefault && ev.preventDefault();
                        opt.stopPropagation && ev.stopPropagation();
                        this.emit(eventName, ev);
                    }
                }.bind(this)));
                this.onDestroy(function() {
                    var ev;
                    for (;ev = domListeners.shift(); ) ev.remove();
                    PRIVATE.delete(this);
                }.bind(this));
            },
            /**
     * Sets focus on the next result item
     *
     * @return {HTMLElement|undefined}
     *  Returns the Element currently with focus
     */
            focusNext: function() {
                var currentFocusEle, currentFocusEleIndex, inst = PRIVATE.get(this), scrollingParent = inst.opt.eleGroup, groupChildren = inst.getChildren(), hasFocus = inst.hasFocus, setFocus = inst.setFocus;
                if (!groupChildren.length) return;
                // Find currently focused element (if any)
                groupChildren.some(function(ele, index) {
                    if (hasFocus(ele)) {
                        currentFocusEleIndex = index;
                        currentFocusEle = ele;
                        return true;
                    }
                });
                // Nothing selected? - set first item
                if (!currentFocusEle) {
                    setFocus(groupChildren[0]);
                    Object(__WEBPACK_IMPORTED_MODULE_10__scrollEleIntoView__.a)(groupChildren[0], scrollingParent);
                    return groupChildren[0];
                }
                inst.removeFocus(currentFocusEle);
                // If currently in the last item, select the first one again
                if (currentFocusEleIndex === groupChildren.length - 1) {
                    setFocus(groupChildren[0]);
                    Object(__WEBPACK_IMPORTED_MODULE_10__scrollEleIntoView__.a)(groupChildren[0], scrollingParent);
                    return groupChildren[0];
                }
                setFocus(groupChildren[currentFocusEleIndex + 1]);
                Object(__WEBPACK_IMPORTED_MODULE_10__scrollEleIntoView__.a)(groupChildren[currentFocusEleIndex + 1], scrollingParent);
                return groupChildren[currentFocusEleIndex + 1];
            },
            /**
     * Sets focus on previous result item
     *
     * @return {HTMLElement|undefined}
     */
            focusPrevious: function() {
                var currentFocusEle, currentFocusEleIndex, inst = PRIVATE.get(this), opt = inst.opt, scrollingParent = opt.eleGroup, groupChildren = inst.getChildren(), lastIndex = groupChildren.length - 1, hasFocus = inst.hasFocus, setFocus = inst.setFocus;
                if (!groupChildren.length) return;
                // Find currently focused element (if any)
                groupChildren.some(function(ele, index) {
                    if (hasFocus(ele)) {
                        currentFocusEleIndex = index;
                        currentFocusEle = ele;
                        return true;
                    }
                });
                // Nothing selected? - set last item
                if (!currentFocusEle) {
                    setFocus(groupChildren[lastIndex]);
                    Object(__WEBPACK_IMPORTED_MODULE_10__scrollEleIntoView__.a)(groupChildren[lastIndex], scrollingParent);
                    return groupChildren[lastIndex];
                }
                inst.removeFocus(currentFocusEle);
                // If currently in the first item, select the last one again
                if (0 === currentFocusEleIndex) {
                    setFocus(groupChildren[lastIndex]);
                    Object(__WEBPACK_IMPORTED_MODULE_10__scrollEleIntoView__.a)(groupChildren[lastIndex], scrollingParent);
                    return groupChildren[lastIndex];
                }
                setFocus(groupChildren[currentFocusEleIndex - 1]);
                Object(__WEBPACK_IMPORTED_MODULE_10__scrollEleIntoView__.a)(groupChildren[currentFocusEleIndex - 1], scrollingParent);
                return groupChildren[currentFocusEleIndex - 1];
            },
            /**
     * Resets the focus.
     *
     * @return {HTMLElement}
     *  If an element had focus, it will be returned.
     */
            resetFocus: function() {
                var focusedEle = this.getFocusEle();
                focusedEle && PRIVATE.get(this).removeFocus(focusedEle);
                return focusedEle;
            },
            /**
     * Returns the DOM element currently with focus
     *
     * @return {HTMLElement}
     */
            getFocusEle: function() {
                var response, inst = PRIVATE.get(this);
                inst.getChildren().some(function(ele) {
                    if (inst.hasFocus(ele)) {
                        response = ele;
                        return true;
                    }
                });
                return response;
            }
        };
        function toggleSelected() {
            var focusedEle, inst = PRIVATE.get(this), selectedClass = inst.opt.selectedClass;
            if (selectedClass) {
                focusedEle = this.getFocusEle();
                focusedEle && Object(__WEBPACK_IMPORTED_MODULE_9__domToggleClass__.a)(focusedEle, selectedClass);
            }
            return focusedEle;
        }
        DomKeyboardInteraction = __WEBPACK_IMPORTED_MODULE_2__jsutils_EventEmitter__.a.extend(DomKeyboardInteraction);
        DomKeyboardInteraction.defaults = {
            input: null,
            eleGroup: null,
            focusClass: "my-isFocused",
            selectedClass: "my-isSelected",
            eleSelector: ""
        };
        /* harmony default export */
        __webpack_exports__.a = DomKeyboardInteraction;
    }, /* 50 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domTriggerEvent */
        var keyboardEvents = [ "keyup", "keydown", "keypress" ], mouseEvents = [ "mouseup", "mousedown" ];
        /**
 * @private
 *
 * @returns {Event}
 */
        function getNewGenericEvent(eventName, options) {
            var event;
            try {
                event = new Event(eventName);
            } catch (e) {
                event = document.createEvent("CustomEvent");
                event.initCustomEvent(eventName, true, true, options || {});
            }
            return event;
        }
        /**
 * @private
 *
 * @returns {Event}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent
 */
        function getNewKeyboardEvent(eventName, options) {
            var event;
            try {
                event = new KeyboardEvent(eventName, options);
            } catch (e) {
                event = getNewGenericEvent(eventName, options);
            }
            return event;
        }
        /**
 * @private
 *
 * @returns {Event}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent
 */
        function getNewMouseEvent(eventName, options) {
            var event;
            try {
                event = new MouseEvent(eventName);
            } catch (e) {
                event = getNewGenericEvent(eventName, options);
            }
            return event;
        }
        /**
 * Triggers an events on a given DOM Element.
 *
 * @function domTriggerEvent
 *
 * @param {HTMLElement} ele
 * @param {String} eventName
 * @param {Object} [options]
 *
 */
        function domTriggerEvent(ele, eventName, options) {
            if (!ele || !eventName) return;
            // FIXME: does not work for window.scroll()
            if ("function" === typeof ele[eventName]) {
                ele[eventName]();
                return;
            }
            var evInstance;
            -1 !== keyboardEvents.indexOf(eventName) ? evInstance = getNewKeyboardEvent(eventName, options) : -1 !== mouseEvents.indexOf(eventName) && (evInstance = getNewMouseEvent(eventName, options));
            ele.dispatchEvent(evInstance);
        }
        /* harmony default export */
        __webpack_exports__.a = domTriggerEvent;
    }, /* 51 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: true
        });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__sputils_getMsgError__ = __webpack_require__(28);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__sputils_doesMsgHaveError__ = __webpack_require__(30);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__sputils_xmlEscape__ = __webpack_require__(31);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__sputils_fillTemplate__ = __webpack_require__(53);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__sputils_getCamlLogical__ = __webpack_require__(32);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__sputils_getSPVersion__ = __webpack_require__(55);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6__sputils_parseDateString__ = __webpack_require__(56);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7__sputils_parseLookupFieldValue__ = __webpack_require__(33);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8__sputils_getDateString__ = __webpack_require__(57);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9__sputils_getNodesFromXml__ = __webpack_require__(20);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10__spapi_getList__ = __webpack_require__(34);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_11__spapi_getListColumns__ = __webpack_require__(38);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_12__spapi_getListFormCollection__ = __webpack_require__(71);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_13__spapi_getListItems__ = __webpack_require__(23);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_14__spapi_getSiteListCollection__ = __webpack_require__(72);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_15__spapi_getSiteWebUrl__ = __webpack_require__(14);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_16__spapi_getUserProfile__ = __webpack_require__(73);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_17__spapi_resolvePrincipals__ = __webpack_require__(42);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_18__spapi_searchPrincipals__ = __webpack_require__(43);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_19__spapi_updateListItems__ = __webpack_require__(74);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_20__widgets_ChoiceField_ChoiceField__ = __webpack_require__(75);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_21__widgets_DateTimeField_DateTimeField__ = __webpack_require__(86);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_22__widgets_List_List__ = __webpack_require__(45);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_23__widgets_ListItem_ListItem__ = __webpack_require__(47);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_24__widgets_LookupField_LookupField__ = __webpack_require__(98);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_25__widgets_Message_Message__ = __webpack_require__(107);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_26__widgets_PeoplePicker_PeoplePicker__ = __webpack_require__(111);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_27__widgets_Persona_Persona__ = __webpack_require__(27);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_28__widgets_TextField_TextField__ = __webpack_require__(131);
        /* harmony default export */
        __webpack_exports__.default = {
            getMsgError: __WEBPACK_IMPORTED_MODULE_0__sputils_getMsgError__.a,
            doesMsgHaveError: __WEBPACK_IMPORTED_MODULE_1__sputils_doesMsgHaveError__.a,
            xmlEscape: __WEBPACK_IMPORTED_MODULE_2__sputils_xmlEscape__.a,
            fillTemplate: __WEBPACK_IMPORTED_MODULE_3__sputils_fillTemplate__.a,
            getCamlLogical: __WEBPACK_IMPORTED_MODULE_4__sputils_getCamlLogical__.a,
            getSPVersion: __WEBPACK_IMPORTED_MODULE_5__sputils_getSPVersion__.a,
            parseDateString: __WEBPACK_IMPORTED_MODULE_6__sputils_parseDateString__.a,
            parseLookupFieldValue: __WEBPACK_IMPORTED_MODULE_7__sputils_parseLookupFieldValue__.a,
            getDateString: __WEBPACK_IMPORTED_MODULE_8__sputils_getDateString__.a,
            getNodesFromXml: __WEBPACK_IMPORTED_MODULE_9__sputils_getNodesFromXml__.a,
            getList: __WEBPACK_IMPORTED_MODULE_10__spapi_getList__.a,
            getListColumns: __WEBPACK_IMPORTED_MODULE_11__spapi_getListColumns__.a,
            getListFormCollection: __WEBPACK_IMPORTED_MODULE_12__spapi_getListFormCollection__.a,
            getListItems: __WEBPACK_IMPORTED_MODULE_13__spapi_getListItems__.a,
            getSiteListCollection: __WEBPACK_IMPORTED_MODULE_14__spapi_getSiteListCollection__.a,
            getSiteWebUrl: __WEBPACK_IMPORTED_MODULE_15__spapi_getSiteWebUrl__.a,
            getUserProfile: __WEBPACK_IMPORTED_MODULE_16__spapi_getUserProfile__.a,
            resolvePrincipals: __WEBPACK_IMPORTED_MODULE_17__spapi_resolvePrincipals__.a,
            searchPrincipals: __WEBPACK_IMPORTED_MODULE_18__spapi_searchPrincipals__.a,
            updateListItems: __WEBPACK_IMPORTED_MODULE_19__spapi_updateListItems__.a,
            ChoiceField: __WEBPACK_IMPORTED_MODULE_20__widgets_ChoiceField_ChoiceField__.a,
            DateTimeField: __WEBPACK_IMPORTED_MODULE_21__widgets_DateTimeField_DateTimeField__.a,
            List: __WEBPACK_IMPORTED_MODULE_22__widgets_List_List__.a,
            ListItem: __WEBPACK_IMPORTED_MODULE_23__widgets_ListItem_ListItem__.a,
            LookupField: __WEBPACK_IMPORTED_MODULE_24__widgets_LookupField_LookupField__.a,
            Message: __WEBPACK_IMPORTED_MODULE_25__widgets_Message_Message__.a,
            PeoplePicker: __WEBPACK_IMPORTED_MODULE_26__widgets_PeoplePicker_PeoplePicker__.a,
            Persona: __WEBPACK_IMPORTED_MODULE_27__widgets_Persona_Persona__.a,
            TextField: __WEBPACK_IMPORTED_MODULE_28__widgets_TextField_TextField__.a
        };
    }, /* 52 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export xmlEscape */
        /**
 * HTML and XML escaping routines
 * @namespace xmlEscape
 */
        var xmlEscape = /** @lends xmlEscape */ {
            /**
         * Escapes html code. Characters that are escaped include
         * <, > and &. These are converted to the HTML safe
         * characters.  This method can also be used to escape XML.
         *
         * @param {Object} xmlString
         *          The html code to be escaped.
         *
         * @return {String}
         *          html escaped
         *
         */
            escape: function(xmlString) {
                if ("string" !== typeof xmlString) return "";
                return xmlString.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;");
            },
            /**
         * Un-escapes html code. Characters that are un-escaped include
         * "&lt;", "&gt;" "&apos;", "&quot;" and "&amp;". These are
         * converted to <, >, ', " and &
         *
         * @param {Object} xmlString
         *          The html code to be un-escaped.
         *
         * @return {String}
         *          html string escaped.
         *
         */
            unescape: function(xmlString) {
                if ("string" !== typeof xmlString) return "";
                return xmlString.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&apos;/g, "'").replace(/&quot;/g, '"');
            }
        };
        /* harmony default export */
        __webpack_exports__.a = xmlEscape;
    }, /* 53 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony default export */
        __webpack_exports__.a = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_fillTemplate__.a;
    }, /* 54 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export getObjectPropValue */
        /**
 * Returns an Object property value using dot notation and thus
 * find the key no matter how deep it is in the given object.
 *
 * @param {Object} obj
 *  The object to be used in retrieving the key value.
 *
 * @param {String} prop
 *  A property name whose value will be returned. This property
 *  definition could be defined using dot notation is wanting to
 *  retrieve a property deep in the object. Example:
 *  `name`, or `i18n.en-us.name`
 *
 */
        function getObjectPropValue(obj, prop) {
            if (!obj || !prop) return;
            var keys = prop.split(".");
            var key = void 0;
            for (;key = keys.shift(); ) {
                if (!obj || !(obj instanceof Object) || !(key in obj)) return;
                obj = obj[key];
            }
            return obj;
        }
        /* harmony default export */
        __webpack_exports__.a = getObjectPropValue;
    }, /* 55 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* global SP, _spPageContextInfo */
        /**
 * Returns the SharePoint version number. This is accomplished by
 * looking for  the SP namespace and if it is define, parsing the
 * SP.ClientSchemeversions value.
 *
 * @param {Boolean} returnExternal
 *          If true, then the external version (ex. 2007, 2010) is
 *          returned. Default is to return the internal version number
 *          (ex. 12, 14)
 *
 * @return {String}
 *
 */
        var getSPVersion = function(returnExternal) {
            // Some approaches below taken from:
            // http://sharepoint.stackexchange.com/questions/74978/can-i-tell-what-version-of-sharepoint-is-being-used-from-javascript
            var versionMap = {
                12: "2007",
                14: "2010",
                15: "2013"
            }, version = 12, foundIt = false;
            // If the SP variable is defined, then its at least SP2010
            if ("undefined" !== typeof SP) {
                version = 14;
                if (SP.ClientSchemaVersions && SP.ClientSchemaVersions.currentVersion) {
                    version = parseInt(SP.ClientSchemaVersions.currentVersion);
                    foundIt = true;
                }
                if (!foundIt && "undefined" !== typeof _spPageContextInfo) {
                    version = parseInt(_spPageContextInfo.webUIVersion);
                    4 === version && (version = 14);
                }
            }
            // TODO: implement method detailed by Jeremy Thake: http://www.jeremythake.com/2013/08/get-sharepoint-version-number-of-your-platform-quickly/
            // Queries: /_vti_pvt/service.cnf ... Works in SP2010 / 2013, 2007 as well.
            // OUTPUT:
            //      vti_encoding:SR|utf8-nl
            //      ti_extenderversion:SR|16.0.0.1216
            returnExternal && (version = versionMap[version] || version);
            return version;
        };
        //end: getSPVersion();
        /* harmony default export */
        __webpack_exports__.a = getSPVersion;
    }, /* 56 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /**
 * Parses a date string in ISO 8601 format into a Date object.
 * Date format supported on input:
 *  2013-09-01T01:00:00
 *  2013-09-01T01:00:00Z
 *  2013-09-01T01:00:00Z+05:00
 *
 * @param {String} dateString
 *      The date string to be parsed.
 *
 * @return {Date|Null}
 *      If unable to parse string, a Null value will be returned.
 *
 * @see {https://github.com/csnover/js-iso8601}
 *      Method was developed using some of the code from js-iso8601
 *      project on github by csnover.
 *
 */
        var parseDateString = function(dateString) {
            var re, dtPieces, i, j, numericKeys, minOffset, dtObj = null;
            if (!dateString) return dtObj;
            // let's see if Date.parse() can do it?
            // We append 'T00:00' to the date string case it is
            // only in format YYYY-MM-DD
            dtObj = Date.parse(10 === dateString.length ? dateString + "T00:00" : dateString);
            if (dtObj) return new Date(dtObj);
            // Once we parse the date string, these locations
            // in the array must be Numbers.
            numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ];
            // Define regEx
            re = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
            // dtPieces:
            //    [0]
            //    [1]   YYYY
            //    [2]   MM
            //    [3]   DD
            //    [4]   HH
            //    [5]   mm
            //    [6]   ss
            //    [7]   msec
            //    [8]   Z
            //    [9]   +|-
            //    [10]  Z HH
            //    [11]  Z mm
            dtPieces = dateString.match(re);
            if (!dtPieces) return dtObj;
            for (i = 0, j = numericKeys.length; i < j; i++) dtPieces[numericKeys[i]] = ~~dtPieces[numericKeys[i]];
            // Month is "zero" based
            --dtPieces[2];
            // Date specifed UTC Format?
            if ("Z" === dtPieces[8]) {
                // do we need to calculate offset to minutes?
                if (void 0 !== dtPieces[9]) {
                    minOffset = 60 * dtPieces[10] + dtPieces[11];
                    "+" === dtPieces[9] && (minOffset = -minOffset);
                    dtPieces[5] += minOffset;
                }
                dtObj = new Date(Date.UTC(dtPieces[1], dtPieces[2], dtPieces[3], dtPieces[4], dtPieces[5], dtPieces[6], dtPieces[7]));
            } else dtObj = new Date(dtPieces[1], dtPieces[2], dtPieces[3], dtPieces[4], dtPieces[5], dtPieces[6], dtPieces[7]);
            return dtObj;
        };
        //end: parseDateString()
        /* harmony default export */
        __webpack_exports__.a = parseDateString;
    }, /* 57 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /**
 * Returns a date string in the format expected by Sharepoint
 * Date/time fields. Usefull in doing filtering queries.
 *
 * Credit:  Matt (twitter @iOnline247)
 *          {@see http://spservices.codeplex.com/discussions/349356}
 *
 * @param {Date} [dateObj=Date()]
 * @param {String} [formatType='local']
 *              Possible formats: local, utc
 *
 * @return {String} a date string.
 *
 */
        var getDateString = function(dateObj, formatType) {
            formatType = String(formatType || "local").toLowerCase();
            dateObj = dateObj || new Date();
            function pad(n) {
                return n < 10 ? "0" + n : n;
            }
            var ret = "";
            ret = "utc" === formatType ? dateObj.getUTCFullYear() + "-" + pad(dateObj.getUTCMonth() + 1) + "-" + pad(dateObj.getUTCDate()) + "T" + pad(dateObj.getUTCHours()) + ":" + pad(dateObj.getUTCMinutes()) + ":" + pad(dateObj.getUTCSeconds()) + "Z" : dateObj.getFullYear() + "-" + pad(dateObj.getMonth() + 1) + "-" + pad(dateObj.getDate()) + "T" + pad(dateObj.getHours()) + ":" + pad(dateObj.getMinutes()) + ":" + pad(dateObj.getSeconds());
            return ret;
        };
        //end: SPGetDateString()
        /* harmony default export */
        __webpack_exports__.a = getDateString;
    }, /* 58 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export fetchPolyfill */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__es6_promise__ = __webpack_require__(13);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__EventEmitter__ = __webpack_require__(2);
        /* jshint ignore:start */
        var globalEvents = __WEBPACK_IMPORTED_MODULE_1__EventEmitter__.a.create();
        /**
 * A polyfill for the proposed ECMAScript `fetch` API and associated classes.
 * Provides a lowlevel interface for retrieving data from a server.
 *
 * Members of this namespace:
 *
 *  -   `fetchPolyfill.Headers`
 *  -   `fetchPolyfill.Request`
 *  -   `fetchPolyfill.Response`
 *  -   `fetchPolyfill.fetch`
 *  -   `fetchPolyfill.on`: Event emitter to listen for events
 *
 * @namespace fetchPolyfill
 *
 * @see https://github.com/purtuga/fetch
 * @see https://github.com/github/fetch
 *
 * @fires fetchPolyfill#pre-fetch
 * @fires fetchPolyfill#post-fetch
 *
 * @example
 *
 * define(["es7-fetch"], function(fetchPolyfill){
 *
 *     var fetch = fetchPolyfill.fetch;
 *
 *     fetch("api/end/point", {
 *         method:     "POST",
 *         onProgress: opt.onProgress,
 *         headers: {
 *             'Content-Type': 'text/xml;charset=UTF-8',
 *             'SOAPAction':   'http://schemas.microsoft.com/sharepoint/soap/CopyIntoItems'
 *         },
 *         body: '<?xml version="1.0" encoding="utf-8"?>' +
 *         '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
 *         '<soap:Body><CopyIntoItems xmlns="http://schemas.microsoft.com/sharepoint"> + ' +
 *         '<someContent></someContent>' +
 *         '</soap:Body></soap:Envelope>'
 *     }).then(function(response){
 *         return response.text().then(function(xmlData){
 *             ...
 *         });
 *     });
 *
 * });
 */
        // FIXME: PT: not good... overriding native implementation if it exists
        var fetchPolyfill = function fetchPolyfill(self) {
            self = self || Function("return this")();
            // jshint ignore:line
            [ "Headers", "Request", "Response", "fetch" ].forEach(function(prop) {
                self[prop] = fetchPolyfill[prop];
            });
        };
        !function(self) {
            if (self.fetch) return;
            function normalizeName(name) {
                "string" !== typeof name && (name = String(name));
                if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) throw new TypeError("Invalid character in header field name");
                return name.toLowerCase();
            }
            function normalizeValue(value) {
                "string" !== typeof value && (value = String(value));
                return value;
            }
            function Headers(headers) {
                this.map = {};
                headers instanceof Headers ? headers.forEach(function(value, name) {
                    this.append(name, value);
                }, this) : headers && Object.getOwnPropertyNames(headers).forEach(function(name) {
                    this.append(name, headers[name]);
                }, this);
            }
            Headers.prototype.append = function(name, value) {
                name = normalizeName(name);
                value = normalizeValue(value);
                var list = this.map[name];
                if (!list) {
                    list = [];
                    this.map[name] = list;
                }
                list.push(value);
            };
            Headers.prototype.delete = function(name) {
                delete this.map[normalizeName(name)];
            };
            Headers.prototype.get = function(name) {
                var values = this.map[normalizeName(name)];
                return values ? values[0] : null;
            };
            Headers.prototype.getAll = function(name) {
                return this.map[normalizeName(name)] || [];
            };
            Headers.prototype.has = function(name) {
                return this.map.hasOwnProperty(normalizeName(name));
            };
            Headers.prototype.set = function(name, value) {
                this.map[normalizeName(name)] = [ normalizeValue(value) ];
            };
            Headers.prototype.forEach = function(callback, thisArg) {
                Object.getOwnPropertyNames(this.map).forEach(function(name) {
                    this.map[name].forEach(function(value) {
                        callback.call(thisArg, value, name, this);
                    }, this);
                }, this);
            };
            function consumed(body) {
                if (body.bodyUsed) return __WEBPACK_IMPORTED_MODULE_0__es6_promise__.a.reject(new TypeError("Already read"));
                body.bodyUsed = true;
            }
            function fileReaderReady(reader) {
                return new __WEBPACK_IMPORTED_MODULE_0__es6_promise__.a(function(resolve, reject) {
                    reader.onload = function() {
                        resolve(reader.result);
                    };
                    reader.onerror = function() {
                        reject(reader.error);
                    };
                });
            }
            function readBlobAsArrayBuffer(blob) {
                var reader = new FileReader();
                reader.readAsArrayBuffer(blob);
                return fileReaderReady(reader);
            }
            function readBlobAsText(blob) {
                var reader = new FileReader();
                reader.readAsText(blob);
                return fileReaderReady(reader);
            }
            var support = {
                blob: "FileReader" in self && "Blob" in self && function() {
                    try {
                        new Blob();
                        return true;
                    } catch (e) {
                        return false;
                    }
                }(),
                formData: "FormData" in self,
                arrayBuffer: "ArrayBuffer" in self
            };
            function Body() {
                this.bodyUsed = false;
                this._initBody = function(body) {
                    this._bodyInit = body;
                    if ("string" === typeof body) this._bodyText = body; else if (support.blob && Blob.prototype.isPrototypeOf(body)) this._bodyBlob = body; else if (support.formData && FormData.prototype.isPrototypeOf(body)) this._bodyFormData = body; else if (body) {
                        if (!support.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(body)) throw new Error("unsupported BodyInit type");
                    } else this._bodyText = "";
                    this.headers.get("content-type") || ("string" === typeof body ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type && this.headers.set("content-type", this._bodyBlob.type));
                };
                if (support.blob) {
                    this.blob = function() {
                        var rejected = consumed(this);
                        if (rejected) return rejected;
                        if (this._bodyBlob) return __WEBPACK_IMPORTED_MODULE_0__es6_promise__.a.resolve(this._bodyBlob);
                        if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                        return __WEBPACK_IMPORTED_MODULE_0__es6_promise__.a.resolve(new Blob([ this._bodyText ]));
                    };
                    this.arrayBuffer = function() {
                        return this.blob().then(readBlobAsArrayBuffer);
                    };
                    this.text = function() {
                        var rejected = consumed(this);
                        if (rejected) return rejected;
                        if (this._bodyBlob) return readBlobAsText(this._bodyBlob);
                        if (this._bodyFormData) throw new Error("could not read FormData body as text");
                        return __WEBPACK_IMPORTED_MODULE_0__es6_promise__.a.resolve(this._bodyText);
                    };
                } else this.text = function() {
                    var rejected = consumed(this);
                    return rejected || __WEBPACK_IMPORTED_MODULE_0__es6_promise__.a.resolve(this._bodyText);
                };
                support.formData && (this.formData = function() {
                    return this.text().then(decode);
                });
                this.json = function() {
                    return this.text().then(JSON.parse);
                };
                return this;
            }
            // HTTP methods whose capitalization should be normalized
            var methods = [ "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT" ];
            function normalizeMethod(method) {
                var upcased = method.toUpperCase();
                return methods.indexOf(upcased) > -1 ? upcased : method;
            }
            function Request(input, options) {
                options = options || {};
                var body = options.body;
                if (Request.prototype.isPrototypeOf(input)) {
                    if (input.bodyUsed) throw new TypeError("Already read");
                    this.url = input.url;
                    this.credentials = input.credentials;
                    options.headers || (this.headers = new Headers(input.headers));
                    this.method = input.method;
                    this.mode = input.mode;
                    if (!body) {
                        body = input._bodyInit;
                        input.bodyUsed = true;
                    }
                } else this.url = input;
                this.credentials = options.credentials || this.credentials || "omit";
                !options.headers && this.headers || (this.headers = new Headers(options.headers));
                this.method = normalizeMethod(options.method || this.method || "GET");
                this.mode = options.mode || this.mode || null;
                this.referrer = null;
                if (("GET" === this.method || "HEAD" === this.method) && body) throw new TypeError("Body not allowed for GET or HEAD requests");
                this._initBody(body);
            }
            Request.prototype.clone = function() {
                return new Request(this);
            };
            function decode(body) {
                var form = new FormData();
                body.trim().split("&").forEach(function(bytes) {
                    if (bytes) {
                        var split = bytes.split("=");
                        var name = split.shift().replace(/\+/g, " ");
                        var value = split.join("=").replace(/\+/g, " ");
                        form.append(decodeURIComponent(name), decodeURIComponent(value));
                    }
                });
                return form;
            }
            function headers(xhr) {
                var head = new Headers();
                var pairs = xhr.getAllResponseHeaders().trim().split("\n");
                pairs.forEach(function(header) {
                    var split = header.trim().split(":");
                    var key = split.shift().trim();
                    var value = split.join(":").trim();
                    head.append(key, value);
                });
                return head;
            }
            Body.call(Request.prototype);
            function Response(bodyInit, options) {
                options || (options = {});
                this.type = "default";
                this.status = options.status;
                this.ok = this.status >= 200 && this.status < 300;
                this.statusText = options.statusText;
                this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
                this.url = options.url || "";
                this._initBody(bodyInit);
            }
            Body.call(Response.prototype);
            Response.prototype.clone = function() {
                return new Response(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new Headers(this.headers),
                    url: this.url
                });
            };
            Response.error = function() {
                var response = new Response(null, {
                    status: 0,
                    statusText: ""
                });
                response.type = "error";
                return response;
            };
            var redirectStatuses = [ 301, 302, 303, 307, 308 ];
            Response.redirect = function(url, status) {
                if (-1 === redirectStatuses.indexOf(status)) throw new RangeError("Invalid status code");
                return new Response(null, {
                    status: status,
                    headers: {
                        location: url
                    }
                });
            };
            self.Headers = Headers;
            self.Request = Request;
            self.Response = Response;
            self.fetch = function(input, init) {
                var xhr = new XMLHttpRequest();
                var reqPromise = new __WEBPACK_IMPORTED_MODULE_0__es6_promise__.a(function(resolve, reject) {
                    var request;
                    request = Request.prototype.isPrototypeOf(input) && !init ? input : new Request(input, init);
                    // var xhr = new XMLHttpRequest()
                    function responseURL() {
                        if ("responseURL" in xhr) return xhr.responseURL;
                        // Avoid security warnings on getResponseHeader when not allowed by CORS
                        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) return xhr.getResponseHeader("X-Request-URL");
                        return;
                    }
                    xhr.onload = function() {
                        var options = {
                            status: xhr.status,
                            statusText: xhr.statusText,
                            headers: headers(xhr),
                            url: responseURL()
                        };
                        var body = "response" in xhr ? xhr.response : xhr.responseText;
                        /**
                 * A fetch (http call) was completed.
                 *
                 * @event fetchPolyfill#post-fetch
                 * @type {Object}
                 * @property {String} url
                 * @property {XMLHttpRequest} xhr
                 */
                        globalEvents.emit("post-fetch", {
                            url: input,
                            xhr: xhr
                        });
                        resolve(new Response(body, options));
                    };
                    xhr.onerror = function() {
                        globalEvents.emit("post-fetch", {
                            url: input,
                            xhr: xhr
                        });
                        reject(new TypeError("Network request failed"));
                    };
                    // Paul Tavares: Add support for onProgress of upload content
                    init && init.onProgress && xhr.upload && xhr.upload.addEventListener && xhr.upload.addEventListener("progress", init.onProgress, false);
                    xhr.open(request.method, request.url, true);
                    "include" === request.credentials && (xhr.withCredentials = true);
                    "responseType" in xhr && support.blob && (xhr.responseType = "blob");
                    request.headers.forEach(function(value, name) {
                        xhr.setRequestHeader(name, value);
                    });
                    /**
             * fetch (http request) is about to be done
             *
             * @event fetchPolyfill#pre-fetch
             * @type Object
             * @property {String} url
             * @property {Object} options
             */
                    globalEvents.emit("pre-fetch", {
                        url: input,
                        xhr: xhr,
                        init: init
                    });
                    xhr.send("undefined" === typeof request._bodyInit ? null : request._bodyInit);
                });
                // Paul Tavares: Allow abort() of requests
                reqPromise.abort = function() {
                    xhr.abort();
                };
                return reqPromise;
            };
            self.fetch.polyfill = true;
        }(fetchPolyfill);
        fetchPolyfill.on = globalEvents.on.bind(globalEvents);
        // Attempt to polyfill the namespace given on input or the global namespace
        fetchPolyfill();
        /* harmony default export */
        __webpack_exports__.a = fetchPolyfill;
    }, /* 59 */
    /***/
    function(module, exports) {
        // shim for using process in browser
        var process = module.exports = {};
        // cached from whatever global is present so that test runners that stub it
        // don't break things.  But we need to wrap it in a try catch in case it is
        // wrapped in strict mode code which doesn't define any globals.  It's inside a
        // function because try/catches deoptimize in certain engines.
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined");
        }
        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined");
        }
        !function() {
            try {
                cachedSetTimeout = "function" === typeof setTimeout ? setTimeout : defaultSetTimout;
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                cachedClearTimeout = "function" === typeof clearTimeout ? clearTimeout : defaultClearTimeout;
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }();
        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) //normal enviroments in sane situations
            return setTimeout(fun, 0);
            // if setTimeout wasn't available but was latter defined
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                cachedSetTimeout = setTimeout;
                return setTimeout(fun, 0);
            }
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedSetTimeout(fun, 0);
            } catch (e) {
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                    return cachedSetTimeout.call(null, fun, 0);
                } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                    return cachedSetTimeout.call(this, fun, 0);
                }
            }
        }
        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
            return clearTimeout(marker);
            // if clearTimeout wasn't available but was latter defined
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                cachedClearTimeout = clearTimeout;
                return clearTimeout(marker);
            }
            try {
                // when when somebody has screwed with setTimeout but no I.E. maddness
                return cachedClearTimeout(marker);
            } catch (e) {
                try {
                    // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                    return cachedClearTimeout.call(null, marker);
                } catch (e) {
                    // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                    // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                    return cachedClearTimeout.call(this, marker);
                }
            }
        }
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
            if (!draining || !currentQueue) return;
            draining = false;
            currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1;
            queue.length && drainQueue();
        }
        function drainQueue() {
            if (draining) return;
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;
            var len = queue.length;
            for (;len; ) {
                currentQueue = queue;
                queue = [];
                for (;++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                queueIndex = -1;
                len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
        }
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
            queue.push(new Item(fun, args));
            1 !== queue.length || draining || runTimeout(drainQueue);
        };
        // v8 likes predictible objects
        function Item(fun, array) {
            this.fun = fun;
            this.array = array;
        }
        Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = "";
        // empty string to avoid regexp issues
        process.versions = {};
        function noop() {}
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;
        process.listeners = function(name) {
            return [];
        };
        process.binding = function(name) {
            throw new Error("process.binding is not supported");
        };
        process.cwd = function() {
            return "/";
        };
        process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        };
        process.umask = function() {
            return 0;
        };
    }, /* 60 */
    /***/
    function(module, exports) {
        module.exports = function(originalModule) {
            if (!originalModule.webpackPolyfill) {
                var module = Object.create(originalModule);
                // module.parent = undefined by default
                module.children || (module.children = []);
                Object.defineProperty(module, "loaded", {
                    enumerable: true,
                    get: function() {
                        return module.l;
                    }
                });
                Object.defineProperty(module, "id", {
                    enumerable: true,
                    get: function() {
                        return module.i;
                    }
                });
                Object.defineProperty(module, "exports", {
                    enumerable: true
                });
                module.webpackPolyfill = 1;
            }
            return module;
        };
    }, /* 61 */
    /***/
    function(module, exports) {
        /* WEBPACK VAR INJECTION */
        (function(__webpack_amd_options__) {
            /* globals __webpack_amd_options__ */
            module.exports = __webpack_amd_options__;
        }).call(exports, {});
    }, /* 62 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export queueCallback */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__es6_Set__ = __webpack_require__(17);
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        //===============================================
        var callbacks = new __WEBPACK_IMPORTED_MODULE_0__es6_Set__.a();
        var queue = void 0;
        /**
 * Queue a callback to be executed after at the start of next event loop.
 * This differs from `nextTick` in that callbacks are not executed during
 * micro-processing, but rather on next event loop, so this is not ideal
 * for logic that can cause UI reflow.
 *
 * @param {Function} cb
 */
        function queueCallback(cb) {
            if ("function" === typeof cb) {
                callbacks.add(cb);
                queue || (queue = setTimeout(flushQueue, 0));
            }
        }
        /* harmony default export */
        __webpack_exports__.a = queueCallback;
        function flushQueue() {
            var cbList = [].concat(_toConsumableArray(callbacks));
            callbacks.clear();
            queue = null;
            var cb = void 0;
            for (;cb = cbList.shift(); ) {
                cb();
                cb = null;
            }
        }
    }, /* 63 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Set;
        });
        /* unused harmony export FakeSet */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__getGlobal__ = __webpack_require__(36);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__Iterator__ = __webpack_require__(37);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__runtime_aliases__ = __webpack_require__(22);
        //============================================================
        var Set = Object(__WEBPACK_IMPORTED_MODULE_0__getGlobal__.a)().Set || FakeSet;
        function FakeSet() {}
        Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.c)(FakeSet.prototype, {
            constructor: {
                value: FakeSet,
                configurable: true
            },
            _: {
                get: function() {
                    var values = [];
                    Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.d)(this, "_", {
                        value: values
                    });
                    return values;
                }
            },
            add: {
                value: function(item) {
                    -1 === Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.a)(this._, item) && this._.push(item);
                    return this;
                }
            },
            has: {
                value: function(item) {
                    return -1 !== Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.a)(this._, item);
                }
            },
            size: {
                get: function() {
                    return this._.length;
                }
            },
            clear: {
                value: function() {
                    this._.splice(0);
                }
            },
            delete: {
                value: function(item) {
                    var idx = Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.a)(this._, item);
                    if (-1 !== idx) {
                        this._.splice(idx, 1);
                        return true;
                    }
                    return false;
                }
            },
            values: {
                value: function() {
                    return new __WEBPACK_IMPORTED_MODULE_1__Iterator__.a(this._);
                }
            },
            entries: {
                value: function() {
                    return new __WEBPACK_IMPORTED_MODULE_1__Iterator__.a(this._, this._);
                }
            },
            forEach: {
                value: function(cb) {
                    var _this = this;
                    this._.forEach(function(item) {
                        return cb(item, item, _this);
                    });
                }
            }
        });
    }, /* 64 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */
        __webpack_exports__.a = getFullUrl;
        var DOCUMENT_LOCATION = document.location;
        /**
 * Returns the full URL (starting with `http...` for a given page address
 *
 * @param {String} pageAddress
 * @param {Boolean} [noEndSlash=false]
 *  By default, the returned url will be ensured to end with a `/`. set this
 *  param to `true` to not append this character if needed.
 *
 * @returns {string}
 */
        function getFullUrl(pageAddress, noEndSlash) {
            // if URL does not end with "/" then insert it
            pageAddress && !noEndSlash && "/" !== pageAddress.charAt(pageAddress.length - 1) && (pageAddress += "/");
            if (pageAddress.toLowerCase().indexOf("http") > -1) return pageAddress;
            pageAddress = DOCUMENT_LOCATION.protocol + "//" + DOCUMENT_LOCATION.hostname + (80 !== Number(DOCUMENT_LOCATION.port) && Number(DOCUMENT_LOCATION.port) > 0 ? ":" + DOCUMENT_LOCATION.port : "") + pageAddress;
            return pageAddress;
        }
    }, /* 65 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__ = __webpack_require__(16);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__sputils_getNodesFromXml__ = __webpack_require__(20);
        var instData = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.stash, /**
 * List model. Contains the List definition data.
 *
 * @constructor ListModel
 * @extends Compose
 *
 * @param {XMLDocument|Object} source
 *  The list source - either an XML document or an Object
 *
 * @param {Object} [options]
 *
 * @param {String} [options.type="xml"]
 *  the type data in `source`. Supported values are `xml` and `json`
 *
 * @param {String} [options.webURL=""]
 *  The Full webURL of the Site for the list (ex. `https://.../sites/web1`).
 *  Option enables some of the value added methods of this model
 *
 * @example List definition attributes:
 *
 *  {
 *      "DocTemplateUrl":                   "",
 *      "DefaultViewUrl":                   "/sites/siteA/Lists/Tasks/AllItems.aspx",
 *      "MobileDefaultViewUrl":             "",
 *      "ID":                               "{7EE477D9-D257-47F5-A25D-A882D882E51F}",
 *      "Title":                            "Tasks",
 *      "Description":                      "",
 *      "ImageUrl":                         "/_layouts/15/images/ittask.png?rev=30",
 *      "Name":                             "{7EE477D9-D257-47F5-A25D-A882D882E51F}",
 *      "BaseType":                         "0",
 *      "FeatureId":                        "f9ce21f8-f437-4f7e-8bc6-946378c850f0",
 *      "ServerTemplate":                   "171",
 *      "Created":                          "20131115 21:43:34",
 *      "Modified":                         "20161212 20:06:34",
 *      "LastDeleted":                      "20161209 17:55:58",
 *      "Version":                          "39",
 *      "Direction":                        "none",
 *      "ThumbnailSize":                    "",
 *      "WebImageWidth":                    "",
 *      "WebImageHeight":                   "",
 *      "Flags":                            "549458048",
 *      "ItemCount":                        "65",
 *      "AnonymousPermMask":                "0",
 *      "RootFolder":                       "/sites/siteA/Lists/Tasks",
 *      "ReadSecurity":                     "1",
 *      "WriteSecurity":                    "1",
 *      "Author":                           "11",
 *      "EventSinkAssembly":                "",
 *      "EventSinkClass":                   "",
 *      "EventSinkData":                    "",
 *      "EmailAlias":                       "",
 *      "WebFullUrl":                       "/sites/siteA",
 *      "WebId":                            "b0cb691f-3a1c-4199-a7f4-86a1bb147cc9",
 *      "SendToLocation":                   "",
 *      "ScopeId":                          "1d5001e0-2e0c-483b-8579-f14931151477",
 *      "MajorVersionLimit":                "50",
 *      "MajorWithMinorVersionsLimit":      "0",
 *      "WorkFlowId":                       "",
 *      "HasUniqueScopes":                  false,
 *      "NoThrottleListOperations":         false,
 *      "HasRelatedLists":                  "",
 *      "Followable":                       false,
 *      "Acl":                              "",
 *      "Flags2":                           "0",
 *      "RootFolderId":                     "070d6524-2096-4c1b-9a6f-fbd2dc036c76",
 *      "ComplianceTag":                    "",
 *      "ComplianceFlags":                  "0",
 *      "UserModified":                     "20161212 20:06:34",
 *      "ListSchemaVersion":                "107",
 *      "AllowDeletion":                    true,
 *      "AllowMultiResponses":              false,
 *      "EnableAttachments":                true,
 *      "EnableModeration":                 false,
 *      "EnableVersioning":                 true,
 *      "HasExternalDataSource":            false,
 *      "Hidden":                           false,
 *      "MultipleDataList":                 false,
 *      "Ordered":                          false,
 *      "ShowUser":                         true,
 *      "EnablePeopleSelector":             false,
 *      "EnableResourceSelector":           false,
 *      "EnableMinorVersion":               false,
 *      "RequireCheckout":                  false,
 *      "ThrottleListOperations":           false,
 *      "ExcludeFromOfflineClient":         false,
 *      "CanOpenFileAsync":                 true,
 *      "EnableFolderCreation":             false,
 *      "IrmEnabled":                       false,
 *      "IrmSyncable":                      false,
 *      "IsApplicationList":                false,
 *      "PreserveEmptyValues":              false,
 *      "StrictTypeCoercion":               false,
 *      "EnforceDataValidation":            false,
 *      "MaxItemsPerThrottledOperation":    "5000"
 *  }
 *
 */
        ListModel = /** @lends ListModel.prototype */ {
            init: function(source, options) {
                var _this = this;
                if (instData.has(this)) return;
                var listObj, me = this, opt = Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options);
                opt.type = opt.type.toLowerCase();
                opt.source = source;
                instData.set(me, opt);
                "xml" === opt.type ? listObj = getListDetailsFromXML.call(me, opt.source) : "json" === opt.type && (listObj = getListDetailsFromJSON.call(me, opt.source));
                Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)(me, listObj);
                this.onDestroy(function() {
                    return instData.delete(_this);
                });
            },
            /**
     * returns the original list source used to build the model.
     */
            getSource: function() {
                return instData.get(this).source;
            },
            /**
     * Returns the url to the list. The absolute URL (ex. `https://.../sites/web1`)
     * will be returned _if_ the model was initialized with the `options.webURL`
     * defined on input.. Else, the absolute path from the root of the domain will
     * be returned (ex. `/sites/web1`).
     *
     * @return {String}
     */
            getListUrl: function() {
                var rootUrl, opt = instData.get(this);
                if (!opt.webURL) return this.RootFolder || "";
                rootUrl = opt.webURL.substr(0, opt.webURL.indexOf(this.WebFullUrl));
                if (!rootUrl) return this.RootFolder || "";
                return rootUrl + this.RootFolder;
            },
            /**
     * Will return the site's URL where the list is located.
     * __note:__ depends on the model having been initialized with
     * the value in the options.
     */
            getWebURL: function() {
                return instData.get(this).webURL;
            }
        }, /**
 * Returns an object with the list definition from an XML document
 * @private
 * @return {Object}
 */
        getListDetailsFromXML = function(xmlDoc) {
            var listDef = Object(__WEBPACK_IMPORTED_MODULE_3__sputils_getNodesFromXml__.a)({
                xDoc: xmlDoc,
                nodeName: "List",
                convertTypes: true
            }).shift();
            if (!listDef) {
                // Try to get the List properties from "ListProperties" - which is
                // returned when an update to the list is done (updateList())
                listDef = Object(__WEBPACK_IMPORTED_MODULE_3__sputils_getNodesFromXml__.a)({
                    xDoc: xmlDoc,
                    nodeName: "ListProperties",
                    convertTypes: true
                }).shift();
                if (!listDef) return {};
            }
            delete listDef.Fields;
            delete listDef.RegionalSettings;
            delete listDef.ServerSettings;
            delete listDef.___xmlNode;
            return listDef;
        }, /**
 * returns an object with the list definition from a JSON response object.
 */
        getListDetailsFromJSON = function() {};
        ListModel = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__.a.extend(ListModel);
        ListModel.defaults = {
            type: "xml",
            // possible values: xml, json
            webURL: ""
        };
        /* harmony default export */
        __webpack_exports__.a = ListModel;
    }, /* 66 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export isContentType */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__ = __webpack_require__(16);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__spapi_getListItems__ = __webpack_require__(23);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_es6_promise__ = __webpack_require__(13);
        //============================================================================
        var instData = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.stash;
        var FIELD_CONTENT_TYPE_ID = "ContentTypeID";
        /**
 * list Column Model.
 *
 * @class ListColumnModel
 * @extends Compose
 *
 * @param {Object} columnData
 *      A javascript Object with the column
 * @param {Object} [options]
 * @param {ListModel|String} [options.list=null]
 *      A reference to the [ListModel]{ListModel} of the column
 * @param {String} [options.type="xml"]
 *      A static string of either `xml` or `json`
 *      (json not yet supported, 2015-07-03)
 * @param {Object} [options.source=null]
 *      The source originally used to create the model. (ex. the XML node or the
 *     JSON response object)
 *
 */
        var ListColumnModel = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__.a.extend(/** @lends ListColumnModel.prototype */ {
            init: function(columnData, options) {
                var _this = this;
                if (instData.has(this)) return;
                var opt = Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options);
                Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)(this, {
                    ID: "",
                    Type: "",
                    Name: "",
                    DisplayName: "",
                    Sortable: "",
                    StaticName: "",
                    Required: false,
                    ReadOnly: false,
                    // Calculated fields -------------------------------------------------
                    webURL: "",
                    // SPWidgets inserted value if available
                    listID: "",
                    // SPWigets inserted value if available
                    listName: "",
                    // SPWigets inserted value if available
                    isContentType: false
                }, columnData);
                // Calcualted fields
                this.isContentType = isContentType(this);
                if (opt.list) {
                    opt.list.getWebUrl && (this.webURL = opt.list.getWebUrl());
                    opt.list.ID && (this.listID = opt.list.ID);
                    opt.list.Title && (this.listName = opt.list.Name);
                }
                instData.set(this, opt);
                this.onDestroy(function() {
                    return instData.delete(_this);
                });
            },
            /**
     * Returns the values for the column. Useful for column of type Choice or Lookup.
     *
     * @param {Object} [lookupOptions]
     *  Used only when column is of type `Lookup` or `LookupMulti`.
     *  An object with options that will be used with [getListItems]{getListItems}
     *  to retrieve the list of column values.
     *
     * @return {Promise<Array<Object|String>, Error>}
     */
            getColumnValues: function(lookupOptions) {
                var me = this, $colXml = instData.get(me).source, colType = me.Type, colValues = [];
                return new __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_es6_promise__.a(function(resolve, reject) {
                    switch (colType) {
                      case "Choice":
                      case "MultiChoice":
                        Array.prototype.slice.call($colXml.querySelectorAll("CHOICE"), 0).forEach(function(choiceEle) {
                            colValues.push(choiceEle.textContent || "");
                        });
                        resolve(colValues);
                        break;

                      case "Lookup":
                      case "LookupMulti":
                        Object(__WEBPACK_IMPORTED_MODULE_3__spapi_getListItems__.a)(Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)({
                            CAMLQuery: '<Query><OrderBy><FieldRef Name="' + me.ShowField + '"/></OrderBy></Query>',
                            CAMLViewFields: '<ViewFields><FieldRef Name="' + me.ShowField + '"/></ViewFields>'
                        }, lookupOptions, {
                            listName: me.List
                        })).then(function(rows) {
                            resolve(rows);
                        }, function(err) {
                            reject(err);
                        });
                        break;

                      default:
                        resolve(colValues);
                    }
                });
            },
            /**
     * returns the ListModel if one was given on input when listColumnModel instance
     * was created.
     *
     * @return {ListModel}
     */
            getList: function() {
                return instData.get(this).list;
            }
        });
        /**
 * Is column the Content Type field
 *
 * @param {ListColumnModel} column
 *
 * @return {Boolean}
 */
        function isContentType(column) {
            return column.Name === FIELD_CONTENT_TYPE_ID || "ContentType" === column.Name || "Computed" === column.Type && column.PIAttribute === FIELD_CONTENT_TYPE_ID;
        }
        ListColumnModel.defaults = {
            list: null,
            type: "xml",
            source: null
        };
        /* harmony default export */
        __webpack_exports__.a = ListColumnModel;
    }, /* 67 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_observable_data_src_ObservableObject__ = __webpack_require__(68);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_parseHTML__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_domutils_domFind__ = __webpack_require__(9);
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.stash;
        /**
 * Model for SharePoint List Items (rows). Object returned will include all of
 * the properties that were given on input (row). In addition, if `options`
 * are provided on input and those have a `CAMLViewFields`, then the model
 * will have one attribute for each - even if those were not included in the
 * `itemData` (SharePoint does not return empty attributes)
 *
 * @class ListItemModel
 * @extends ObservableObject
 *
 * @param {Object} itemData
 *      An object with the properties for the model
 * @param {Object} [options]
 *  An object with the options used to get the row from SP
 *
 */
        var ListItemModel = __WEBPACK_IMPORTED_MODULE_0_observable_data_src_ObservableObject__.a.extend(/** @lends ListItemModel.prototype */ {
            init: function(itemData, options) {
                var _this = this;
                if (PRIVATE.has(this)) return;
                __WEBPACK_IMPORTED_MODULE_0_observable_data_src_ObservableObject__.a.prototype.init.call(this, itemData, options);
                var opt = Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)({}, {
                    listName: "",
                    webURL: ""
                }, options);
                // If options has CAMLViewFields, then ensure the model has
                // those fields defined as attributes
                opt && opt.CAMLViewFields && Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_domutils_domFind__.a)(Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_parseHTML__.a)(opt.CAMLViewFields), "FieldRef").forEach(function(fieldEle) {
                    var fieldName = fieldEle.getAttribute("Name");
                    fieldName && !_this.hasOwnProperty(fieldName) && (_this[fieldName] = "");
                });
                PRIVATE.set(this, opt);
                this.onDestroy(function() {
                    return PRIVATE.delete(_this);
                });
            },
            /**
     * Returns an object with the `listName` and `webURL`
     * attributes needed to retrieve list information. Data
     * will only be available if provided on input when model
     * was initialized.
     *
     * @returns {Object}
     */
            getListInfo: function() {
                return PRIVATE.get(this);
            }
        });
        /* harmony default export */
        __webpack_exports__.a = ListItemModel;
    }, /* 68 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export createComputedProp */
        /* unused harmony export observableAssign */
        /* unused harmony export makeObservable */
        /* unused harmony export watchProp */
        /* unused harmony export watchPropOnce */
        /* unused harmony export unwatchProp */
        /* unused harmony export notifyPropWatchers */
        /* unused harmony export observableMixin */
        /* unused harmony export ObservableObject */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__ = __webpack_require__(16);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_nextTick__ = __webpack_require__(24);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_es6_Set__ = __webpack_require__(17);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__common__ = __webpack_require__(39);
        /* unused harmony reexport setDependencyTracker */
        /* unused harmony reexport unsetDependencyTracker */
        /* unused harmony reexport stopDependeeNotifications */
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        //=======================================================
        var OBJECT = Object;
        // aliases
        var objectCreate = OBJECT.create;
        var objectDefineProperty = OBJECT.defineProperty;
        var objectHasOwnProperty = Object(__WEBPACK_IMPORTED_MODULE_5__common__.f)(__WEBPACK_IMPORTED_MODULE_5__common__.c.hasOwnProperty);
        var objectKeys = Object.keys;
        var noopEventListener = objectCreate({
            off: function() {}
        });
        /**
 * Adds the ability to observe `Object` property values for changes.
 * Uses an internal `EventEmitter` instance to list and trigger events,
 * and `Object.defineProperty` getter/setters to setup watchers on
 * property values.
 *
 * Currently has no support for addition or deletion from the object,
 * but with the ES7 forth coming Proxy functionality, that will be
 * added.
 *
 * @class ObservableObject
 * @extends Compose
 *
 * @param {Object} [model]
 * @param {Object} [options]
 * @param {Boolean} [options.watchAll=true]
 *  if `model` was given on input, then all properties will be automatically made watchable.
 * @param {Boolean} [options.deep=true]
 *  If set to true, the model is walked and all deep objects made observable as well
 *
 * @example
 *
 * // Used as a mixin
 * var myObj = {
 *      first: "paul",
 *      last: "tavares"
 * };
 *
 * ObservableObject.mixin(myObj);
 *
 * myObj.on("first", function(newValue, oldValue){
 *      alert("first name was changed");
 * });
 *
 * @example
 *
 * // Used as part of a class prototype
 * var MyModel = Compose.extend(ObservableObject);
 *
 * var user = MyModel.create({
 *      first: "paul",
 *      last: "tavares"
 * });
 *
 * user.on("first", function(newValue, oldValue){
 *  alert("first name was change")
 * });
 *
 */
        var ObservableObject = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__.a.extend(/** @lends ObservableObject.prototype */ {
            init: function(model, options) {
                var opt = Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options);
                if (model) {
                    // FIXME: need to create prop that uses original getter/setters from `model` - or no?
                    Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)(this, model);
                    opt.watchAll && makeObservable(this, null, opt.deep);
                    getInstance(this).opt = opt;
                }
            },
            /**
     * Add a callback to changes on a given property
     *
     * @param {String|Object} prop
     *  Object property name. If wanting to list to all changes to the object, the
     *  object instance itself can be passed as the prop.
     *
     * @param {Function} callback
     *  A callback function to list to the event. The callback function
     *  can cancel any queued event callbacks by returning `true` (boolean).
     *
     * @return {EventListener}
     *
     * @example
     *
     * obj.on("firstName", () => {});
     *
     * // List to all changes
     * obj.on(obj, () => {});
     */
            on: function(prop, callback) {
                return watchProp(this, prop, callback);
            },
            /**
     * Remove a callback the listening queue of a for a given property name
     *
     * @param {String} prop
     *  Object property name
     *
     * @param {Function} callback
     *  The callback that should be removed.
     */
            off: function(prop, callback) {
                unwatchProp(this, prop, callback);
            },
            /**
     * Add a callback for changes on a given property that is called only once
     *
     * @param {String} prop
     *  Object property name
     *
     * @param {Function} callback
     *  The callback that should be removed.
     */
            once: function(prop, callback) {
                return watchPropOnce(this, prop, callback);
            },
            /**
     * Emit an event and execute any callback listening. Any of the listening
     * events can cancel the calling of queued callbacks by returning `true`
     * (boolean)
     *
     * @param {String} prop
     */
            emit: function(prop) {
                return notifyPropWatchers(this, prop);
            },
            /**
     * Copies the properties of one or more objects into the current observable
     * and makes those properties "watchable".
     *
     * @param {...Object} args
     *
     * @returns {Object}
     */
            assign: function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                return observableAssign.apply(void 0, [ this ].concat(_toConsumableArray(args)));
            },
            /**
     * Sets a property on the observable object and automatically makes it watchable
     *
     * @param {String} propName
     * @param {*} [value]
     * @returns {*}
     */
            setProp: function(propName, value) {
                makePropWatchable(this, propName);
                return this[propName] = value;
            }
        });
        /**
 * Returns the private Instance data for this object
 *
 * @private
 * @param {Object} observableObj
 *
 * @return {EventEmitter}
 */
        function getInstance(observableObj) {
            if (!__WEBPACK_IMPORTED_MODULE_5__common__.d.has(observableObj)) {
                var instData = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_EventEmitter__.a.create();
                var watched = instData.watched = {};
                var isQueued = false;
                Object(__WEBPACK_IMPORTED_MODULE_5__common__.m)(observableObj);
                instData.opt = Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)({}, ObservableObject.defaults);
                instData.notify = function() {
                    if (isQueued) return;
                    isQueued = true;
                    Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_nextTick__.a)(function() {
                        instData.emit("");
                        isQueued = false;
                    });
                };
                __WEBPACK_IMPORTED_MODULE_5__common__.d.set(observableObj, instData);
                observableObj.onDestroy && observableObj.onDestroy(function() {
                    objectKeys(watched).forEach(function(propName) {
                        watched[propName].destroy();
                        // FIXME remove property getter/setter on the object (if still there)
                        delete watched[propName];
                    });
                    delete instData.watched;
                    __WEBPACK_IMPORTED_MODULE_5__common__.d.delete(observableObj);
                    instData.destroy();
                }.bind(observableObj));
            }
            return __WEBPACK_IMPORTED_MODULE_5__common__.d.get(observableObj);
        }
        /**
 * A property setup
 *
 * @private
 * @class Observable~PropertySetup
 * @extends Compose
 */
        var PropertySetup = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__.a.extend(/** @lends Observable~PropertySetup.prototype */ {
            init: function(observable, propName) {
                var _this = this;
                this.dependees = new __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_es6_Set__.a();
                this.propName = propName;
                this._obj = observable;
                this.onDestroy(function() {
                    _this.dependees.clear();
                    _this.rmDepEvListener && _this.rmDepEvListener.off();
                    _this._obj = null;
                });
            },
            propName: "",
            /** @type Array */
            dependees: null,
            oldVal: null,
            newVal: null,
            queued: false,
            isComputed: false,
            /**
     * Notifies everyone that is listening for events on this property
     *
     * @param [noDelay=false]
     * @param [noDependees=false]
     */
            notify: function(noDelay, noDependees) {
                var _this2 = this;
                var propSetup = this;
                // Queue up calling all dependee notifiers
                noDependees || this.dependees.forEach(function(cb) {
                    return Object(__WEBPACK_IMPORTED_MODULE_5__common__.k)(cb);
                });
                // If emitting of events for this property was already queued, exit
                if (propSetup.queued) return;
                propSetup.queued = true;
                if (noDelay) {
                    this._emit();
                    return;
                }
                Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_nextTick__.a)(function() {
                    return _this2._emit();
                });
            },
            _emit: function() {
                this.queued = false;
                getInstance(this._obj).emit(this.propName, this.newVal, this.oldVal);
                this.oldVal = null;
            },
            /**
     * Removes a callback from the list of dependees
     * @param {Function} cb
     */
            removeDependee: function(cb) {
                this.dependees.delete(cb);
                // Remove listener if no dependees
                if (this.rmDepEvListener && 0 === this.dependees.size) {
                    this.rmDepEvListener.off();
                    this.rmDepEvListener = null;
                }
            },
            /**
     * Stores global dependees into this Property list of dependees
     */
            storeDependees: function() {
                Object(__WEBPACK_IMPORTED_MODULE_5__common__.o)(this.dependees);
                // If we have dependees, then setup an internal event bus listener
                this.dependees.size > 0 && !this.rmDepEvListener && (this.rmDepEvListener = Object(__WEBPACK_IMPORTED_MODULE_5__common__.j)(__WEBPACK_IMPORTED_MODULE_5__common__.a, this.removeDependee.bind(this)));
            }
        });
        /**
 * Checks to see if a given property on this object already has a watcher
 * and if not, it sets one up for it.
 *
 * @private
 * @param {ObservableObject} observable
 * @param {String} propName
 * @param {Function} [valueGetter]
 * @param {Function} [valueSetter]
 * @param {Boolean} [enumerable=true]
 *
 * @return {EventEmitter}
 */
        function makePropWatchable(observable, propName, valueGetter, valueSetter) {
            var enumerable = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
            var inst = getInstance(observable);
            var watched = inst.watched;
            if (watched[propName]) return inst;
            var currentValue = void 0;
            var emitNotification = !(propName in observable);
            var propDescriptor = Object.getOwnPropertyDescriptor(observable, propName);
            if (propDescriptor) {
                if (false === propDescriptor.configurable) // TODO: should we throw()?
                return;
                valueGetter = valueGetter || propDescriptor.get;
                valueSetter = valueSetter || propDescriptor.set;
                valueGetter || (currentValue = propDescriptor.value);
            }
            // if we're able to remove the current property (ex. Constants would fail),
            // then change this attribute to be watched
            if (delete observable[propName]) {
                var propSetup = watched[propName] = PropertySetup.create(observable, propName);
                propSetup.oldVal = propSetup.newVal = currentValue;
                objectDefineProperty(observable, propName, {
                    enumerable: enumerable,
                    configurable: true,
                    // Getter will either delegate to the prior getter(),
                    // or return the value that was originally assigned to the property
                    get: function() {
                        propSetup.storeDependees();
                        return valueGetter ? valueGetter() : propSetup.newVal;
                    },
                    // Setter is how we detect changes to the value.
                    set: function(newValue) {
                        if (propSetup.isComputed) return;
                        var oldValue = valueGetter ? valueGetter() : propSetup.newVal;
                        if (valueSetter) newValue = valueSetter.call(observable, newValue); else {
                            propSetup.oldVal = oldValue;
                            propSetup.newVal = newValue;
                        }
                        // Dirty checking...
                        // Only trigger if values are different. Also, only add a trigger
                        // if one is not already queued.
                        if (newValue !== oldValue) {
                            inst.opt.deep && newValue && Object(__WEBPACK_IMPORTED_MODULE_5__common__.i)(newValue) && makeObservable(newValue, null, true);
                            propSetup.notify();
                        }
                    }
                });
            } else console.log(new Error("Unable to watch property [" + propName + "] - delete failed"));
            emitNotification && inst.notify();
            return inst;
        }
        /**
 * Created a computed property on a given object
 *
 * @param {Object} observable
 * @param {String} propName
 * @param {Function} valueGenerator
 * @param {Boolean} [enumerable=true]
 */
        function createComputedProp(observable, propName, valueGenerator) {
            var enumerable = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            if (observable && propName && valueGenerator) {
                var runValueGenerator = true;
                var propValue = void 0;
                var dependencyChangeNotifier = function() {
                    // Trigger the Object property setter(). This does nothing as far as the
                    // computed value does, but provides compatibility for any code that
                    // might have overwritten the setter in order ot also listen for changes
                    // outside of this lib.
                    observable[propName] = "";
                    // Reset the internally cached prop value and set the flag to run the
                    // generator and then notify listeners.
                    propValue = null;
                    runValueGenerator = true;
                    getInstance(observable).watched[propName].notify();
                };
                var valueGetter = function() {
                    // FIXME: should we detect circular loops?
                    if (!runValueGenerator) return propValue;
                    Object(__WEBPACK_IMPORTED_MODULE_5__common__.l)(dependencyChangeNotifier);
                    try {
                        propValue = valueGenerator.call(observable);
                    } catch (e) {
                        Object(__WEBPACK_IMPORTED_MODULE_5__common__.p)(dependencyChangeNotifier);
                        throw e;
                    }
                    Object(__WEBPACK_IMPORTED_MODULE_5__common__.p)(dependencyChangeNotifier);
                    runValueGenerator = false;
                    return propValue;
                };
                var valueSetter = function() {
                    /* FIXME: should this anything? */
                    return propValue;
                };
                var inst = getInstance(observable);
                dependencyChangeNotifier[__WEBPACK_IMPORTED_MODULE_5__common__.b] = true;
                // If this propName is already being watched, then first destroy that instance
                if (propName in inst.watched) {
                    inst.watched[propName].destroy();
                    delete inst.watched[propName];
                }
                makePropWatchable(observable, propName, valueGetter, valueSetter, enumerable);
                inst.watched[propName].isComputed = true;
                inst.watched[propName].onDestroy(function() {
                    Object(__WEBPACK_IMPORTED_MODULE_5__common__.n)(dependencyChangeNotifier);
                    delete inst.watched[propName];
                    delete observable[propName];
                    observable[propName] = propValue;
                });
                return Object.create({
                    destroy: function() {
                        inst.watched[propName] && inst.watched[propName].destroy(true);
                    }
                });
            }
        }
        /**
 * Assign the properties of one (or more) objects to the observable and
 * makes those properties "watchable"
 *
 * @param {Object} observable
 * @param {...Object} objs
 *
 * @return {Object} observable
 */
        function observableAssign(observable) {
            for (var _len2 = arguments.length, objs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) objs[_key2 - 1] = arguments[_key2];
            objs.length && Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objs, function(obj) {
                Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objectKeys(obj), function(key) {
                    makePropWatchable(observable, key);
                    observable[key] = obj[key];
                });
            });
            return observable;
        }
        /**
 * Makes an Object observable or a given property of the object observable.
 *
 * @param {Object} observable
 *  The object that should be made observable.
 *
 * @param {String} [propName]
 *  if left unset, then all existing `own properties` of the object will
 *  be made observable.
 *
 * @param {Boolean} [deep=false]
 *  If set to `true` then the object, or the value the given `prop` (if defined)
 *  will be "walked" and any object found made an observable as well.
 *
 * @param {Function} [onEach]
 *  A callback function to be called as each property is "walked". The property value
 *  is provided on input to the callback
 */
        function makeObservable(observable, propName, deep, onEach) {
            if (observable) {
                propName ? makePropWatchable(observable, propName) : Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objectKeys(observable), function(prop) {
                    return makePropWatchable(observable, prop);
                });
                deep && Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objectKeys(observable), function(key) {
                    observable[key] && Object(__WEBPACK_IMPORTED_MODULE_5__common__.i)(observable[key]) && makeObservable(observable[key], null, deep, onEach);
                    onEach && onEach(observable[key]);
                });
            }
        }
        /**
 * Watch a given object property for changes.
 *
 * @param {Object} observable
 * @param {String} propName
 *  The `observable` property name or, if wanting to list to all property changes,
 *  the actual `observable` instance
 * @param {Function} notifier
 *
 * @returns {EventEmitter#EventListener}
 */
        function watchProp(observable, propName, notifier) {
            var inst = getInstance(observable);
            if (propName === observable) return inst.on(inst, notifier);
            if (objectHasOwnProperty(observable, propName)) {
                makePropWatchable(observable, propName);
                return inst.on(propName, notifier);
            }
            return noopEventListener;
        }
        /**
 * Watch for changes on a given object property only once
 * (automatically stops listening after the first invocation).
 *
 * @param {Object} observable
 * @param {String} propName
 * @param {Function} notifier
 * @returns {EventEmitter#EventListener}
 */
        function watchPropOnce(observable, propName, notifier) {
            var inst = getInstance(observable);
            if (propName === observable) return inst.once(inst, notifier);
            if (objectHasOwnProperty(observable, propName)) {
                makePropWatchable(observable, propName);
                return inst.once(propName, notifier);
            }
            return noopEventListener;
        }
        /**
 * Stop watching an object property.
 *
 * @param {Object} observable
 * @param {String} propName
 * @param {Function} notifier
 */
        function unwatchProp(observable, propName, notifier) {
            return getInstance(observable).off(propName, notifier);
        }
        /**
 * Notifies watchers of a given Observable property
 *
 * @param {Object} observable
 * @param {String} propName
 */
        function notifyPropWatchers(observable, propName) {
            var watched = getInstance(observable).watched;
            watched[propName] && watched[propName].notify(true, true);
        }
        /**
 * Adds ObservableObject capabilities to an object.
 *
 * @method ObservableObject.mixin
 *
 * @param {Object} observable
 *
 * @return {Object}
 *  Same object that was given on input will be returned
 */
        function observableMixin(observable) {
            observable && Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objectKeys(ObservableObject.prototype), function(method) {
                method in observable && observable[method] === ObservableObject.prototype[method] || objectDefineProperty(observable, method, {
                    value: ObservableObject.prototype[method],
                    enumerable: false,
                    configurable: true
                });
            });
            return observable;
        }
        ObservableObject.createComputed = createComputedProp;
        ObservableObject.mixin = observableMixin;
        /**
 * Default options to the ObservableObject constructor
 *
 * @type Object
 * @name ObservableObject.defaults
 */
        ObservableObject.defaults = {
            watchAll: true,
            deep: true
        };
        /* harmony default export */
        __webpack_exports__.a = ObservableObject;
    }, /* 69 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_observable_data_src_ObservableArray__ = __webpack_require__(40);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_domutils_domChildren__ = __webpack_require__(25);
        // FIXME: add method for getting rows removed from tracked data set (use of GetListItemChangesSinceToken)
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create(), findEle = document.querySelector, /**
 * A collection (array) of list items (`ListItemModel`).
 *
 * @class ListItemsCollection
 * @extends Collection
 *
 * @param {Array} itemsList
 *
 * @param {Object} options
 * @param {ApiFetchResponse} options.apiResponse
 *  The response from the API.
 *
 * @param {ApiFetchResponse} options.queryOptions
 *  The options that was given to the original list query method.
 */
        ListItemsCollection = __WEBPACK_IMPORTED_MODULE_1_observable_data_src_ObservableArray__.a.extend({
            init: function(itemsList, options) {
                __WEBPACK_IMPORTED_MODULE_1_observable_data_src_ObservableArray__.a.prototype.init.call(this, itemsList);
                var opt = Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_objectExtend__.a)({}, {
                    apiResponse: null,
                    queryOptions: null
                }, options);
                PRIVATE.set(this, opt);
            },
            /**
     * Returns the API response content (ex. `XMLDocument` or `JSON` object)
     *
     * @returns {Document|Object}
     */
            getApiResponseContent: function() {
                return PRIVATE.get(this).apiResponse.content;
            },
            /**
     * Returns the token to be used in retrieving the next page of data.
     *
     * @return {String}
     */
            getNextPageToken: function() {
                // Sample XML:
                // <rs:data ItemCount="5" ListItemCollectionPositionNext="Paged=TRUE&amp;p_DueDate=&amp;p_ID=10">
                var changesEle = findEle.call(this.getApiResponseContent(), "data"), response = "";
                changesEle && (response = changesEle.getAttribute("ListItemCollectionPositionNext") || "");
                return response;
            },
            /**
     * Returns the Change Token to be used with `GetListItemChangesSinceToken`
     * operation.
     *
     * @return {String}
     */
            getChangeToken: function() {
                // Sample XML:
                //    <Changes LastChangeToken="1;3;7ee477d9-d257-47f5-a25d-a882d882e51f;636000407939270000;97706562">
                var changesEle = findEle.call(this.getApiResponseContent(), "Changes"), response = "";
                changesEle && (response = changesEle.getAttribute("LastChangeToken") || "");
                return response;
            },
            /**
     * Returns a array of list item `ID`'s that were removed/deleted from the
     * query results. Applies to when `GetListItemChangesSinceToken` was used
     * as the `operation`
     *
     * @return {Array<Object>}
     *  An Array of Objects where each object contains the following attributes:
     *
     *  -   `ChangeType`
     *  -   `UniqueId`
     *  -   `ID`
     *
     *  @example
     *
     *  // Response structure example:
     *
     *  [
     *      {
     *          ChangeType: "Delete",
     *          UniqueId:   "{UUID here}",
     *          ID:         "7"
     *      }
     *  ]
     */
            getChanges: function() {
                // Sample XML from SOAP request
                //  <Changes LastChangeToken="1;3;c21149be-b52a-4c80-8b73-e76bf814c676;636109593982230000;104332865">
                //    <Id ChangeType="Delete" UniqueId="{1B986CEB-FF11-4390-9459-601D5C4820E0}">7</Id>
                //  </Changes>
                var changesEle = findEle.call(this.getApiResponseContent(), "Changes"), response = [];
                if (changesEle && changesEle.hasChildNodes()) {
                    var childElements = Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_domutils_domChildren__.a)(changesEle, "Id");
                    childElements.filter(function(childNode) {
                        return 1 === childNode.nodeType;
                    }).forEach(function(childNode) {
                        response.push({
                            ChangeType: childNode.getAttribute("ChangeType") || "",
                            UniqueId: childNode.getAttribute("UniqueId") || "",
                            ID: String(childNode.textContent).trim()
                        });
                    });
                }
                return response;
            }
        });
        /* harmony default export */
        __webpack_exports__.a = __WEBPACK_IMPORTED_MODULE_1_observable_data_src_ObservableArray__.a.extend(ListItemsCollection);
    }, /* 70 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_observable_data_src_ObservableArray__ = __webpack_require__(40);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create();
        /**
 * A collection of List Columns
 *
 * @class ListColumnsCollection
 * @extends Collection
 *
 * @param {Array} itemsList
 * @param {Object} options
 * @param {Object} options.listDef
 */
        /* harmony default export */
        __webpack_exports__.a = __WEBPACK_IMPORTED_MODULE_1_observable_data_src_ObservableArray__.a.extend({
            init: function(itemsList, options) {
                __WEBPACK_IMPORTED_MODULE_1_observable_data_src_ObservableArray__.a.prototype.init.call(this, itemsList);
                var opt = Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_objectExtend__.a)({}, {
                    listDef: null
                }, options);
                PRIVATE.set(this, opt);
            },
            /**
     * Returns an object with the definition for the given column
     *
     * @param {String} name
     *  Name of column - external or internal.
     *
     * @return {ListColumnModel}
     */
            getColumn: function(name) {
                var col;
                this.some(function(thisCol) {
                    thisCol.Name !== name && thisCol.DisplayName !== name && thisCol.StaticName !== name || (col = thisCol);
                });
                return col;
            },
            /**
     * returns the ListModel for the list for which the collection was requested.
     *
     * @return {ListModel}
     */
            getList: function() {
                return PRIVATE.get(this).listDef;
            }
        });
    }, /* 71 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__sputils_apiFetch__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__sputils_cache__ = __webpack_require__(15);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__getSiteWebUrl__ = __webpack_require__(14);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_domutils_domFind__ = __webpack_require__(9);
        /**
 * Given a list name, this method will query the SP service and retrieve
 * the list of forms for it.
 *
 * @param {Object} options
 * @param {String} options.listName
 * @param {String} [options.webUrl='currentSiteUrl']
 *
 * @returns {Promise<FormCollection, Error>}
 *  Promise is resolved with an object containing the forms.
 *  If rejected, then an `Error` object is returned. The object
 *  will have an additional property called `response` with the api response.
 *
 * @example
 *
 * // Sample response
 *  [
 *      {
 *          url: "http:/.../Lists/Tasks/DispForm.aspx",
 *          type: "DisplayForm"
 *      },
 *      {
 *          url: "http:/.../Lists/Tasks/EditForm.aspx",
 *          type: "EditForm"
 *      },
 *      {
 *          url: "http:/.../Lists/Tasks/NewForm.aspx",
 *          type: "NewForm"
 *      }
 *  ]
 */
        var getListFormCollection = function getListFormCollection(options) {
            var opt = Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, getListFormCollection.defaults, options);
            // Backwards compatibility...
            "undefined" !== typeof opt.cacheXML && (opt.cache = opt.cacheXML);
            return Object(__WEBPACK_IMPORTED_MODULE_2__getSiteWebUrl__.a)(opt.webURL).then(function(webURL) {
                var endPoint = webURL + "_vti_bin/Forms.asmx";
                opt.cacheKey = endPoint + "?Operation=GetFormCollection&List=" + opt.listName;
                if (opt.cache && __WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a.isCached(opt.cacheKey)) return Object(__WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a)(opt.cacheKey);
                var responsePromise = Object(__WEBPACK_IMPORTED_MODULE_0__sputils_apiFetch__.a)(endPoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/xml;charset=UTF-8"
                    },
                    body: '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetFormCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>' + opt.listName + "</listName></GetFormCollection></soap:Body></soap:Envelope>"
                }).then(function(response) {
                    /**
             * A list Forms Collection
             *
             * @typedef FormCollection
             *
             * @type {Array<Object>}
             *
             * @example
             *
             *  [
             *      {
             *          url: "http:/.../Lists/Tasks/DispForm.aspx",
             *          type: "DisplayForm"
             *      },
             *      {
             *          url: "http:/.../Lists/Tasks/EditForm.aspx",
             *          type: "EditForm"
             *      },
             *      {
             *          url: "http:/.../Lists/Tasks/NewForm.aspx",
             *          type: "NewForm"
             *      }
             *  ]
             */
                    return Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_domutils_domFind__.a)(response.content, "Form").map(function(formEle) {
                        return {
                            url: webURL + formEle.getAttribute("Url"),
                            type: formEle.getAttribute("Type")
                        };
                    });
                });
                opt.cache ? Object(__WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a)(opt.cacheKey, responsePromise) : __WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a.clear(opt.cacheKey);
                // On failure, ensure cached values are cleared.
                responsePromise.catch(function() {
                    __WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a.clear(opt.cacheKey);
                });
                return responsePromise;
            });
        };
        getListFormCollection.defaults = {
            listName: "",
            webURL: "",
            cache: true
        };
        /* harmony default export */
        __webpack_exports__.a = getListFormCollection;
    }, /* 72 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__sputils_apiFetch__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__sputils_cache__ = __webpack_require__(15);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__getSiteWebUrl__ = __webpack_require__(14);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_domutils_domFind__ = __webpack_require__(9);
        /**
 * Returns a Deferred that is resolved with an Array of Objects containing
 * the site list collection.
 *
 * @param {Object} [options]
 *
 * @param {String} [options.webURL=currentSite]
 *  The site/sub-site for which the list collection
 *  is to be retrieved.
 *
 * @param {Boolean} [options.cache=true]
 *  If true, the request will be cached.
 *
 * @return {Promise}
 *  Promise is resolved with an Array of Objects.
 *  Promise might be rejected with an `Error` object
 *
 * @see https://msdn.microsoft.com/en-us/library/ms774864(v=office.12).aspx
 *
 * @example
 *
 * // Sample Object in response:
 *
 *  {
 *      "InternalName": "{E0919C81-0B24-4FFC-A049-F289473ADE32}",
 *      "Title": "App Survey",
 *      "Description": "",
 *      "BaseType": "Survey",
 *      "BaseTemplate": "Survey",
 *      "DefaultViewUrl": "/sites/PT2013/Lists/App Survey/overview.aspx",
 *      "LastModified": "2015-12-15 17:32:11Z",
 *      "InheritedSecurity": "true",
 *      "AllowAnonymousAccess": "false",
 *      "AnonymousViewListItems": "false",
 *      "ReadSecurity": "1",
 *      "title": "App Survey"
 *  }
 */
        var getSiteListCollection = function getSiteListCollection(options) {
            var reqPromise, opt = Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, getSiteListCollection.defaults, options);
            return Object(__WEBPACK_IMPORTED_MODULE_2__getSiteWebUrl__.a)(opt.webURL).then(function(webURL) {
                opt.webURL += webURL + "_vti_bin/SiteData.asmx";
                // FIXME: cache key not correct below...
                opt.cacheKey = opt.webURL + "?" + [ opt.filter ].join("|");
                opt.isCached = __WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a.isCached(opt.cacheKey);
                var convertXmlToArrayOfObjects = function(response) {
                    var $siteLists = Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_domutils_domFind__.a)(response.content, "_sList");
                    return $siteLists.map(function(listHtml) {
                        return Array.prototype.reduce.call(listHtml.childNodes, function(listObj, listProp) {
                            listObj[listProp.nodeName] = listProp.textContent;
                            return listObj;
                        }, {});
                    });
                };
                // Backward compatibility
                if ("undefined" !== typeof opt.cacheXML) {
                    try {
                        console.warn("getSiteListCollection(): cacheXML option deprecated");
                    } catch (e) {}
                    opt.cache = opt.cacheXML;
                }
                if (opt.filter || opt.completefunc) try {
                    console.error("getSiteListCollection(): option.filter and option.completefunc not supported");
                } catch (e) {}
                // If cache is true and we have a cached version, return it.
                opt.cache && opt.isCached && Object(__WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a)(opt.cacheKey).then(convertXmlToArrayOfObjects);
                // If cache is FALSE, and we have a cached version of this key,
                // then remove the cached version - basically reset
                opt.isCached && __WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a.clear(opt.cacheKey);
                reqPromise = Object(__WEBPACK_IMPORTED_MODULE_0__sputils_apiFetch__.a)(opt.webURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/xml;charset=UTF-8"
                    },
                    body: '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetListCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/"></GetListCollection></soap:Body></soap:Envelope>'
                });
                //-------------------------------------------------------------------
                // RESPONSE EXAMPLE:
                //-------------------------------------------------------------------
                //<?xml version="1.0" encoding="utf-8"?>
                //<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
                //xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
                //    <soap:Body>
                //<GetListCollectionResponse xmlns="http://schemas.microsoft.com/sharepoint/soap/">
                // <GetListCollectionResult>0</GetListCollectionResult>
                //  <vLists>
                //      <_sList>
                //          <InternalName>{E0919C81-0B24-4FFC-A049-F289473ADE32}</InternalName>
                //          <Title>App Survey</Title>
                //          <Description/>
                //          <BaseType>Survey</BaseType>
                //          <BaseTemplate>Survey</BaseTemplate>
                //          <DefaultViewUrl>/sites/PT2013/Lists/App Survey/overview.aspx</DefaultViewUrl>
                //          <LastModified>2015-12-15 17:32:11Z</LastModified>
                //          <InheritedSecurity>true</InheritedSecurity>
                //          <AllowAnonymousAccess>false</AllowAnonymousAccess>
                //          <AnonymousViewListItems>false</AnonymousViewListItems>
                //          <ReadSecurity>1</ReadSecurity>
                //      </_sList>
                //  </vLists>
                //</GetListCollectionResponse>
                //</soap:Body>
                //</soap:Envelope>
                //-------------------------------------------------------------------
                // If cache was true, then cache this promise
                opt.cache && Object(__WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a)(opt.cacheKey, reqPromise);
                return reqPromise.then(convertXmlToArrayOfObjects);
            });
        };
        getSiteListCollection.defaults = {
            webURL: "",
            cache: true
        };
        /* harmony default export */
        __webpack_exports__.a = getSiteListCollection;
    }, /* 73 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__sputils_apiFetch__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__sputils_cache__ = __webpack_require__(15);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__getSiteWebUrl__ = __webpack_require__(14);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__models_UserProfileModel__ = __webpack_require__(18);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_domutils_domFind__ = __webpack_require__(9);
        /**
 * Retrieves a User's profile using the Login name (ex. DOMAIN\name).
 *
 * @function
 *
 * @param {Object} options
 * @param {String} options.accountName
 *  The desired user account name. (ex. DOMAIN\userName).
 *
 * @param {Object} [options.otherAttr]
 *  Any other attribute that should be added to the user profile model.
 *  These are added prior to the ones retrieved from `getUserProfile`,
 *  thus they may be overwritten.
 *
 * @param {String} [options.webURL=current site]
 *
 * @param {Boolean} [options.cache=true]
 *
 * @param {Compose} [options.UserProfileModel=UserProfileModel]
 *
 * @return {Promise<UserProfileModel, Error>}
 *  Promise is resolved with a [UserProfileModel]{@link UserProfileModel}
 *  or rejected with an Error.
 */
        var getUserProfile = function getUserProfile(options) {
            var reqPromise, opt = Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_objectExtend__.a)({}, getUserProfile.defaults, options);
            // backward comparability
            "undefined" !== typeof opt.cacheXML && (opt.cache = opt.cacheXML);
            return Object(__WEBPACK_IMPORTED_MODULE_2__getSiteWebUrl__.a)(opt.webURL).then(function(webURL) {
                opt.webURL = webURL;
                opt.cacheKey = opt.webURL + "/?accountName=" + opt.accountName;
                opt.isCached = __WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a.isCached(opt.cacheKey);
                // If cache is true and we have a cached version, return it.
                if (opt.cache && opt.isCached) return Object(__WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a)(opt.cacheKey);
                opt.isCached && __WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a.clear(opt.cacheKey);
                reqPromise = Object(__WEBPACK_IMPORTED_MODULE_0__sputils_apiFetch__.a)(webURL + "_vti_bin/UserProfileService.asmx", {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/xml;charset=UTF-8",
                        SOAPAction: "http://microsoft.com/webservices/SharePointPortalServer/UserProfileService/GetUserProfileByName"
                    },
                    body: '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetUserProfileByName xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService"><AccountName>' + opt.accountName + "</AccountName></GetUserProfileByName></soap:Body></soap:Envelope>"
                }).then(function(response) {
                    var profile = {};
                    // If user passed in other Attributes, add it to the model
                    opt.otherAttr && Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_objectExtend__.a)(profile, opt.otherAttr);
                    Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_domutils_domFind__.a)(response.content, "PropertyData").forEach(function($prop) {
                        var nameEle = Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_domutils_domFind__.a)($prop, "Name")[0], valueEle = Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_domutils_domFind__.a)($prop, "Value")[0], propName = nameEle ? nameEle.textContent || "" : "", propValue = valueEle ? valueEle.textContent || "" : "";
                        profile[propName] = propValue;
                    });
                    "undefined" === typeof profile.DisplayName && (profile.DisplayName = profile.Name || "");
                    return opt.UserProfileModel.create(profile, {
                        webURL: opt.webURL
                    });
                });
                opt.cache && Object(__WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a)(opt.cacheKey, reqPromise);
                reqPromise.catch(function() {
                    __WEBPACK_IMPORTED_MODULE_1__sputils_cache__.a.clear(opt.cacheKey, reqPromise);
                });
                return reqPromise;
            });
        };
        getUserProfile.defaults = {
            accountName: "",
            otherAttr: "",
            webURL: "",
            cache: true,
            UserProfileModel: __WEBPACK_IMPORTED_MODULE_3__models_UserProfileModel__.a
        };
        /* harmony default export */
        __webpack_exports__.a = getUserProfile;
    }, /* 74 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__sputils_apiFetch__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__getSiteWebUrl__ = __webpack_require__(14);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_es6_promise__ = __webpack_require__(13);
        var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        //======================================================================
        var counter = Date.now();
        /**
 * Makes updates to list items in Sharepoint Lists and Libraries. For more
 * information on this method, see {@link https://msdn.microsoft.com/en-us/library/lists.lists.updatelistitems(v=office.12).aspx}
 *
 * This method will process updates in batches and can be configured on input to
 * control the number of concurrent updates that it can issue at one time.
 *
 * @function
 *
 * @param {Object} options
 *
 * @param {String} options.listName
 *
 * @param {String|Object|Array<Array>|Array<Object>|Array<String>} options.updates
 *  A String, Object or an Array containing any of those types. If defining XML strings,
 *  the &lt;Batch&gt; wrapper __SHOULD NOT__ be included. Only the individual `Method`
 *  elements.
 *
 * @param {Object} [options.webUrl=current_site]
 *
 * @param {String} [options.updateType='Update']
 *  Used when the updates parameter is a non-string. The value will be used
 *  to set the Cmd on the update. Valid values are:
 *  `Update` (default), `New` and `Delete`.
 *  Note that when using 'Udpate' and 'Delete' your
 *  updates must include the ID property so that SharePoint knows on what
 *  item it needs to act on.
 *  {@link https://msdn.microsoft.com/en-us/library/ms459050(v=office.12).aspx}
 *
 * @param {String} [options.updateOnError='Continue']
 *  Value is used on the Batch element to indicate what should be done if
 *  an error is encountered. Valid values include 'Continue' (default) and
 *  'Return'. {@link https://msdn.microsoft.com/en-us/library/ms437562(v=office.12).aspx}

 * @param {Number} [options.batchSize=100]
 *  Number of updates per batch. Default is 100.
 *
 * @param {Number} [options.concurrency=2]
 *  Number of max concurrent updates allowed.
 *
 *
 * @return {Promise}
 *  The promise returned is resolved with a {@link updateListItemsResponse}
 *  object.
 *
 * @example
 *
 * updateListItems({
 *      listName: "Tasks",
 *      updates: [
 *          {
 *              ID: "3",
 *              Title: "Updated title"
 *          },
 *          {
 *              ID: "4",
 *              Title: "Updated title for 4"
 *          }
 *      ]
 * })
 * .then(function(response){
 *      alert(response.message);
 * })
 */
        function updateListItems(options) {
            var opt = Object(__WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_objectExtend__.a)({}, updateListItems.defaults, options, {
                counter: 1
            });
            return Object(__WEBPACK_IMPORTED_MODULE_1__getSiteWebUrl__.a)(opt.webURL).then(function(webURL) {
                opt.webURL = webURL;
                // Get an array of Strings with all updates
                opt._updates = getUpdateArray(opt);
                return new __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_es6_promise__.a(function(resolve, reject) {
                    var updatePromisesList = [], batchProcessingDone = false, updatesInFlight = 0, maxConcurrentUpds = opt.concurrency, getBatchUpdateList = function() {
                        var count = 0, xmlUpdateString = "";
                        for (;opt._updates.length && count < opt.batchSize; ) {
                            xmlUpdateString += opt._updates.shift();
                            count++;
                        }
                        /<\/Batch>/.test(xmlUpdateString) || (xmlUpdateString = '<Batch OnError="Continue">' + xmlUpdateString + "</Batch>");
                        opt._updates.length || (batchProcessingDone = true);
                        return xmlUpdateString;
                    }, onUpdateDone = function() {
                        --updatesInFlight;
                        // If we're all done, then resolve the overall updateListItems promise
                        if (0 === updatesInFlight && batchProcessingDone) {
                            resolveUpdateListItems();
                            return;
                        }
                        // if concurrency is not maxed out, then execute a batch update again
                        updatesInFlight < maxConcurrentUpds && execBatchUpdate();
                    }, execBatchUpdate = function execBatchUpdate() {
                        // If we are at the max concurrency, then exit...
                        if (batchProcessingDone || updatesInFlight >= maxConcurrentUpds) return;
                        var updatePromise = Object(__WEBPACK_IMPORTED_MODULE_0__sputils_apiFetch__.a)(opt.webURL + "_vti_bin/Lists.asmx", {
                            method: "POST",
                            headers: {
                                "Content-Type": "text/xml;charset=UTF-8",
                                SOAPAction: "http://schemas.microsoft.com/sharepoint/soap/UpdateListItems"
                            },
                            body: '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><UpdateListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>' + opt.listName + "</listName><updates>" + getBatchUpdateList() + "</updates></UpdateListItems></soap:Body></soap:Envelope>"
                        });
                        updatesInFlight++;
                        updatePromisesList.push(updatePromise);
                        // on resolve or reject: call onUpdateDone()
                        // FIXME: on first Promise.reject - stop all further executions of apiFetch's
                        updatePromise.then(onUpdateDone, onUpdateDone);
                        // If we are not yet done, then call execBatchUpdate again
                        batchProcessingDone || execBatchUpdate();
                    }, // resolveUpdateListItems
                    // Called when all Updates have been sent to the server
                    resolveUpdateListItems = function() {
                        var // Processes the values returns by apiFetch (ApiResponse object)
                        processAjaxResponses = function(apiResponses, isHttpError) {
                            var isMultiRequest = updatePromisesList.length > 1, /**
                     * Response object returned by updateListItems. Note that if batch
                     * processing was applied, the `httpData` and `xhrRequest` properties
                     * will be arrays instead.
                     *
                     * @typedef {Object} updateListItemsResponse
                     *
                     * @property {String} status
                     *  The status of the update. Value will be
                     *  either 'error' or 'success'
                     *
                     * @property {String} message
                     *  The message string. For a status of success, this
                     *  will just be "Update successful.". For a status of
                     *  error, this will include the errors returned by sharepoint.
                     *
                     * @property {Object|Error|Array<ApiFetchResponse>} response
                     *  The response returns from the API call. If batching is turned on
                     *  ond it was needed to process the request, this property will
                     *  be an array with all API Responses.
                     *  If an error occurred, this property will be an `Error` or
                     *  an `Object`
                     */
                            response = {
                                status: "success",
                                //error || success
                                message: "Update Successful.",
                                response: isMultiRequest ? [] : null
                            };
                            if (Array.isArray(apiResponses)) apiResponses.forEach(function(reqResponse) {
                                isMultiRequest ? response.response.push(reqResponse) : response.response = reqResponse;
                                if (isHttpError) {
                                    response.status = "error";
                                    response.message = reqResponse.message || "HTTP error";
                                }
                            }); else if (apiResponses instanceof Error) {
                                response.status = "error";
                                response.message = apiResponses.message;
                                response.response = apiResponses;
                            }
                            "error" === response.status ? // FIXME: convert response to an Error
                            reject(response) : resolve(response);
                        };
                        // When all requests are done, then process the responses
                        __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_es6_promise__.a.all(updatePromisesList).then(function(apiResponses) {
                            processAjaxResponses(apiResponses, false);
                        }, function(err) {
                            processAjaxResponses(err, true);
                        }).catch(function(err) {
                            reject(err);
                        });
                    };
                    execBatchUpdate();
                });
            });
        }
        /**
 * Returns an array of Strings (XML) representing the updates that need
 * to be made. The strings will be XML
 * [Method]{@link https://msdn.microsoft.com/en-us/library/ms459050(v=office.12).aspx}
 * element that contain the individual update.
 * Handles the updates being defined in a variety of
 * ways:
 *
 * -    `Array<Array<String>>`: Array of Arrays.  Taken from the
 *      approach used by SPServices. Generates one single update.
 *      Each "inner" array has two members: the key and the value
 *      Example:
 *
 *          [
 *              ["ID", "1"],
 *              ["Title", "new title here"]
 *          ]
 *
 * -    `Array<Object>`: array-of-objects. Each object is an update.
 *      Example:
 *
 *          [
 *              {
 *                  ID: "1",
 *                  Title: "New title here"
 *              }
 *          ]
 *
 * -    array-of-strings
 * -    string
 *
 * @private
 *
 * @param {Object} options
 * @param {String|Object|Array<Array>|Array<Object>|Array<String>} options.updates
 *
 * @param {Object} options.updateType
 *  `Update` (default), `New` and `Delete`.
 *  See updateListItems for more info.
 *
 * @return {Array<String>}
 *  Each item in the Array is an xml string (the single Method element)
 */
        function getUpdateArray(options) {
            var opt = Object(__WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_objectExtend__.a)({
                updateType: "Update",
                updates: []
            }, options);
            var updates = [];
            var ofType = _typeof(opt.updates);
            var getUpdId = function() {
                if (opt.counter) return opt.counter++;
                return counter++;
            };
            function processArrayOfObjects(updArray) {
                var i, j, col, thisUpd = "";
                // Loop through the list of objects (updates)
                for (i = 0, j = updArray.length; i < j; i++) {
                    thisUpd = "";
                    // Build the fields to be updated for this update
                    for (col in updArray[i]) updArray[i].hasOwnProperty(col) && (thisUpd += '<Field Name="' + col + '">' + updArray[i][col] + "</Field>");
                    // If this column has fields to be updated, create
                    // the method agregate around it
                    thisUpd && updates.push('<Method ID="' + getUpdId() + '" Cmd="' + opt.updateType + '">' + thisUpd + "</Method>");
                }
            }
            // Array-of-arrays
            // 1 single update (outer-array) with multiple fields to be
            // updated (inner-arrays's)
            function processArrayOfArrays(updArray) {
                var i, j, thisUpd = "";
                for (i = 0, j = updArray.length; i < j; i++) Array.isArray(updArray[i]) && (thisUpd += '<Field Name="' + updArray[i][0] + '">' + updArray[i][1] + "</Field>");
                thisUpd && updates.push('<Method ID="' + getUpdId() + '" Cmd="' + opt.updateType + '">' + thisUpd + "</Method>");
            }
            // Backwards compatability to SPServices: if we don't have
            // options.updates defined, but we have .ID and .valuepairs,
            // Then do array-of-arrays
            if (!opt.updates && opt.ID && opt.valuepairs) {
                opt.valuepairs.push([ "ID", opt.ID ]);
                processArrayOfArrays(opt.valuepairs);
            } else if ("string" === ofType) updates.push(opt.updates); else if (Array.isArray(opt.updates) && opt.updates.length) {
                ofType = _typeof(opt.updates[0]);
                // Array<Object>
                "object" === ofType ? processArrayOfObjects(opt.updates) : "string" === ofType ? updates.push.apply(updates, opt.updates) : Array.isArray(opt.updates[0]) && processArrayOfArrays(opt.updates);
            } else "object" === ofType && processArrayOfObjects([ opt.updates ]);
            return updates;
        }
        /**
 * Get an array of xml string - each being the update to the list.
 *
 * @type {Function}
 */
        updateListItems.getUpdateArray = getUpdateArray;
        // Define defaults. User can change these on their function attachment.
        updateListItems.defaults = {
            listName: "",
            webURL: "",
            async: true,
            completefunc: null,
            updates: "",
            updateType: "Update",
            updateOnError: "Continue",
            batchSize: 100,
            concurrency: 2
        };
        /* harmony default export */
        __webpack_exports__.a = updateListItems;
    }, /* 75 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_es6_promise__ = __webpack_require__(13);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_jsutils_uuid__ = __webpack_require__(44);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddClass__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domRemoveClass__ = __webpack_require__(11);
        /* harmony import */
        __webpack_require__(19);
        /* harmony import */
        __webpack_require__(9);
        /* harmony import */
        __webpack_require__(21);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_13__spapi_getListColumns__ = __webpack_require__(38);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_14__ChoiceItem_ChoiceItem__ = __webpack_require__(79);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_15__ChoiceField_html__ = __webpack_require__(83);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_15__ChoiceField_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__ChoiceField_html__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_16__ChoiceField_less__ = __webpack_require__(84);
        /* harmony import */
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__ChoiceField_less__);
        //--------------------------------------------------------
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create();
        var CSS_CLASS_BASE = "spwidgets-ChoiceField";
        /**
 * A choice field giving the user the ability to pick from a list
 * of values. Handles Choice, MultiChoice.
 *
 * @class ChoiceField
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} [options]
 *
 * @param {ListColumnModel} [options.column={}]
 *  Although optional, it is strongly suggested this be passed in on input, since
 *  some of display values are obtained from the list column definition - example
 *  the label (DisplayName) and field description if any.
 *
 * @param {String} [options.listName]
 *  The list name or UUID.
 *
 * @param {String} [options.webURL]
 *
 * @param {String} [options.selected=""]
 *  The item in the list of choices that should be selected. Either the `value` or
 *  `title` can be used.
 *
 * @param {String} [options.maxHeight="15em"]
 *  A CSS dimension indicating the max height for the area that displays the
 *  choices.
 *
 * @param {Boolean} [options.hideLabel=false]
 *
 * @param {Boolean} [options.hideDescription=false]
 *
 * @param {String} [options.layout=""]
 *  The layout to be used. Possible values:
 *
 *  -   `inline`: Choices are displayed inline.
 *
 * @param {Boolean} [options.isMulti=null]
 *  By default, this will widget will use the Column definition to determine if
 *  multiple values can be selected. This options, however, will override that
 *  setting. Set it to true of false
 *
 * @param {Array<String|Object>} [options.choiceList]
 *  The list of choices to be available on the widget. Will override the use of
 *  the `column` definition `getColumnValues()`. The value can either be a `String`
 *  in which case i twill be used as the title and the value, or an object
 *  containing both a `title` and `value` attributes.
 *
 * @param {Widget} [options.ChoiceItemWidget]
 *  The Widget to be used for each Choice displayed.
 *
 * @fires ChoiceField#change
 * @fires ChoiceField#item-change
 */
        var ChoiceField = /** @lends ChoiceField.prototype */ {
            init: function(options) {
                var _this = this;
                var inst = {
                    opt: Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options),
                    groupName: __WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_jsutils_uuid__.a.generate(),
                    isMulti: null,
                    allowMultiples: null,
                    onReady: null,
                    isReady: false,
                    choices: null,
                    // FIXME: delete this?
                    choiceList: [],
                    selectedCount: 0
                };
                PRIVATE.set(this, inst);
                inst.opt.column || (inst.opt.column = {});
                var opt = inst.opt;
                var $ui = this.$ui = Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__.a)(Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__.a)(__WEBPACK_IMPORTED_MODULE_15__ChoiceField_html___default.a, opt)).firstChild;
                var uiFind = inst.uiFind = $ui.querySelector.bind($ui);
                "boolean" === typeof inst.opt.isMulti ? // FIXME: remove this after refacor
                inst.isMulti = inst.opt.isMulti : "boolean" === typeof inst.opt.allowMultiples ? inst.isMulti = inst.opt.allowMultiples : inst.isMulti = "MultiChoice" === inst.opt.column.Type;
                inst.title = uiFind(".ms-ChoiceFieldGroup-title");
                inst.choices = uiFind(".spwidgets-ChoiceField-choices");
                inst.$count = uiFind("." + CSS_CLASS_BASE + "-selectedCount");
                inst.onReady = __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_es6_promise__.a.resolve().then(function() {
                    if (opt.choiceList) return opt.choiceList;
                    return getChoices.call(_this);
                }).then(addChoicesToUI.bind(this)).then(function() {
                    opt.selected && _this.setSelected(opt.selected);
                    inst.isReady = true;
                    opt.checkAll && _this.checkAll();
                }).catch(function(e) {
                    console.log(e);
                });
                opt.hideLabel && Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddClass__.a)($ui, "spwidgets-ChoiceField--noLabel");
                opt.hideDescription && Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddClass__.a)($ui, "spwidgets-ChoiceField--noDescription");
                opt.layout && Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddClass__.a)($ui, CSS_CLASS_BASE + "--" + opt.layout);
                opt.maxHeight && (inst.choices.style.maxHeight = opt.maxHeight);
                opt.hideSelectedCount || Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domRemoveClass__.a)($ui, CSS_CLASS_BASE + "--noSelectedCount");
                updateSelectedCount.call(this);
                this.on("item-change", function(itemWdg) {
                    inst.isMulti || markAllChoiceFields.call(_this);
                    itemWdg.isChecked() ? inst.selectedCount++ : --inst.selectedCount;
                    updateSelectedCount.call(_this);
                    /**
             * Input field (checkbox or radio button) was changed.
             *
             * @event ChoiceField#change
             *
             * @type {String}
             */
                    _this.emit("change");
                });
                this.onDestroy(function() {
                    PRIVATE.delete(this);
                }.bind(this));
            },
            /**
     * Returns a promise that resolves once the widget is ready to user
     * interaction (aka: fully loaded)
     *
     * @return {Promise}
     */
            onReady: function() {
                return PRIVATE.get(this).onReady;
            },
            /**
     * Gets the value of the input.
     *
     * @returns {Array<String>}
     *  An array is always returned. for single selection choice fields,
     *  this array will contain only 1 item.
     */
            getValue: function() {
                return PRIVATE.get(this).choiceList.filter(function(wdg) {
                    return wdg.isChecked();
                }).map(function(wdg) {
                    return wdg.getValue();
                });
            },
            /**
     * Unlike `getValue()`  which returns only the input value (a string), this
     * method will return the object used on input to create the item widget.
     *
     * @returns {Array<String|Object>}
     */
            getSelected: function() {
                return PRIVATE.get(this).choiceList.filter(function(wdg) {
                    return wdg.isChecked();
                }).map(function(wdg) {
                    return wdg.getData();
                });
            },
            /**
     * Sets the selected value(s), by looking at the list of choices
     * and setting their state to "selected" if they match the value
     * passed on input.
     *
     * @param {String|Array<String>|Array<Object>} newValue
     *  The new value(s) that should be marked selected. When using `Array<Object>`
     *  format, ensure that each object has a property named `value`.
     *
     * @returns {Promise}
     */
            setSelected: function(newValue) {
                var _this2 = this;
                var inst = PRIVATE.get(this);
                var newVals = Array.isArray(newValue) ? newValue : [ newValue ];
                // Ensure that array of new values to be selected are single value strings which
                // are then compared against the input value of the choice field widget.
                newVals = newVals.map(function(newVal) {
                    if ("string" === typeof newVal) return newVal;
                    if (newVal && newVal.hasOwnProperty("value")) return newVal.value;
                    return newVal;
                });
                return this.onReady().then(function() {
                    inst.choiceList.forEach(function(choiceWdg) {
                        -1 !== newVals.indexOf(choiceWdg.getInputValue()) ? choiceWdg.check() : choiceWdg.unCheck();
                    });
                    markAllChoiceFields.call(_this2);
                    inst.selectedCount = _this2.getSelected().length;
                    updateSelectedCount.call(_this2);
                });
            },
            // backwards compatible...
            // deprecated. Use setSelected()
            setValue: function() {
                return this.setSelected.apply(this, arguments);
            },
            /**
     * Returns array of the choices available in the widget.
     *
     * @return {Array}
     */
            getChoices: function() {
                return PRIVATE.get(this).choiceList.map(function(wdg) {
                    return wdg.getValue();
                });
            },
            /**
     * Sets the list of choices available on the widget
     *
     * @param {Array<String|Object>} choiceList
     *
     * @return {Promise}
     */
            setChoices: function(choiceList) {
                var _this3 = this;
                return this.onReady().then(function() {
                    if (Array.isArray(choiceList)) {
                        var inst = PRIVATE.get(_this3);
                        var selected = _this3.getValue();
                        addChoicesToUI.call(_this3, choiceList);
                        _this3.setSelected(selected);
                        inst.selectedCount = _this3.getSelected().length;
                        updateSelectedCount.call(_this3);
                    }
                });
            },
            /**
     * Checks all choices in the list.
     *
     * @return {Promise}
     */
            checkAll: function() {
                var _this4 = this;
                var inst = PRIVATE.get(this);
                return this.onReady().then(function() {
                    inst.choiceList.forEach(function(choiceItemWdg) {
                        return choiceItemWdg.check();
                    });
                    inst.isMulti || markAllChoiceFields.call(_this4);
                    inst.selectedCount = _this4.getSelected().length;
                    updateSelectedCount.call(_this4);
                });
            },
            /**
     * Unchecks all choices
     *
     * @return {Promise}
     */
            unCheckAll: function() {
                var inst = PRIVATE.get(this);
                return this.onReady().then(function() {
                    inst.choiceList.forEach(function(choiceItemWdg) {
                        return choiceItemWdg.unCheck();
                    });
                });
            }
        };
        function updateSelectedCount() {
            var _PRIVATE$get = PRIVATE.get(this), selectedCount = _PRIVATE$get.selectedCount, $count = _PRIVATE$get.$count, opt = _PRIVATE$get.opt;
            $count.textContent = Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__.a)(opt.labels.selectedLabel, {
                count: String(selectedCount)
            });
        }
        function getChoices() {
            var inst = PRIVATE.get(this);
            var _inst$opt = inst.opt, listName = _inst$opt.listName, webURL = _inst$opt.webURL;
            var column = inst.opt.column;
            var type = column.Type;
            if ("Choice" === type || "MultiChoice" === type) {
                // If the column object does not have a "getColumnValues()" method,
                // then retrieve the column from the list definition and then use it.
                if (!column.getColumnValues && listName) return Object(__WEBPACK_IMPORTED_MODULE_13__spapi_getListColumns__.a)({
                    listName: listName,
                    webURL: webURL
                }).then(function(cols) {
                    var thisColumn = cols.getColumn(column.Name || column.DisplayName);
                    if (thisColumn) return thisColumn.getColumnValues();
                    return [];
                });
                if (column.getColumnValues) return column.getColumnValues();
            }
            return __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_es6_promise__.a.resolve([]);
        }
        function addChoicesToUI(choiceList) {
            var _this5 = this;
            var inst = PRIVATE.get(this);
            var ChoiceItemWidget = inst.opt.ChoiceItemWidget;
            var isMulti = inst.isMulti, groupName = inst.groupName;
            var $newChoices = document.createDocumentFragment();
            if (inst.choiceList.length) {
                inst.choiceList.forEach(function(wdg) {
                    return wdg.destroy();
                });
                inst.choiceList.splice(0);
            }
            inst.choiceList = choiceList.map(function(choice) {
                var isString = "string" === typeof choice;
                var choiceWdg = ChoiceItemWidget.create({
                    type: isMulti ? "checkbox" : "radio",
                    name: groupName,
                    title: isString ? choice : choice.title,
                    value: isString ? choice : choice.value,
                    data: choice
                });
                /**
         * Change by specific Choice Item.
         *
         * @event ChoiceField#item-change
         */
                choiceWdg.pipe(_this5, "item-");
                choiceWdg.appendTo($newChoices);
                return choiceWdg;
            });
            inst.choices.appendChild($newChoices);
            return inst.choiceList;
        }
        function markAllChoiceFields() {
            PRIVATE.get(this).choiceList.forEach(function(wdg) {
                return wdg.evalState();
            });
        }
        ChoiceField = __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__.a.extend(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__.a, ChoiceField);
        ChoiceField.defaults = {
            listName: "",
            webURL: "",
            column: {},
            selected: "",
            checkAll: false,
            maxHeight: "15em",
            hideLabel: false,
            hideDescription: false,
            hideSelectedCount: true,
            layout: "",
            isMulti: null,
            // FIXME: Deprecated!!!
            allowMultiples: null,
            choiceList: null,
            labels: {
                selectedLabel: "{{count}} Selected"
            },
            ChoiceItemWidget: __WEBPACK_IMPORTED_MODULE_14__ChoiceItem_ChoiceItem__.a
        };
        /* harmony default export */
        __webpack_exports__.a = ChoiceField;
    }, /* 76 */
    /***/
    function(module, exports, __webpack_require__) {
        var content = __webpack_require__(77);
        "string" === typeof content && (content = [ [ module.i, content, "" ] ]);
        var options = {
            hmr: true
        };
        options.transform = void 0;
        options.insertInto = void 0;
        __webpack_require__(6)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 77 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)();
        // imports
        // module
        exports.push([ module.i, ".my-widget-hide {\n  display: none !important;\n}\n", "" ]);
    }, /* 78 */
    /***/
    function(module, exports) {
        /**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */
        module.exports = function(css) {
            // get current location
            var location = "undefined" !== typeof window && window.location;
            if (!location) throw new Error("fixUrls requires window.location");
            // blank or null?
            if (!css || "string" !== typeof css) return css;
            var baseUrl = location.protocol + "//" + location.host;
            var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");
            // convert each url(...)
            /*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
            var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
                // strip quotes (if they exist)
                var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function(o, $1) {
                    return $1;
                }).replace(/^'(.*)'$/, function(o, $1) {
                    return $1;
                });
                // already a full url? no change
                if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) return fullMatch;
                // convert the url to a full url
                var newUrl;
                //TODO: should we add protocol?
                newUrl = 0 === unquotedOrigUrl.indexOf("//") ? unquotedOrigUrl : 0 === unquotedOrigUrl.indexOf("/") ? baseUrl + unquotedOrigUrl : currentDir + unquotedOrigUrl.replace(/^\.\//, "");
                // send back the fixed url(...)
                return "url(" + JSON.stringify(newUrl) + ")";
            });
            // send back the fixed css
            return fixedCss;
        };
    }, /* 79 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_uuid__ = __webpack_require__(44);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__ = __webpack_require__(10);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddClass__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domRemoveClass__ = __webpack_require__(11);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10__ChoiceItem_html__ = __webpack_require__(80);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10__ChoiceItem_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__ChoiceItem_html__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_11__ChoiceItem_less__ = __webpack_require__(81);
        /* harmony import */
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__ChoiceItem_less__);
        //=======================================================================
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create();
        var uuidGenerate = __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_uuid__.a.generate.bind(__WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_uuid__.a);
        var CSS_MS_IS_CHECKED = "is-checked";
        /**
 * ChoiceItem Widget
 *
 * @class ChoiceItem
 * @extends Widget
 *
 * @param {Object} options
 *
 * @fires ChoiceItem#change
 */
        var ChoiceItem = __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__.a.extend(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__.a).extend(/** @lends ChoiceItem.prototype */ {
            init: function(options) {
                var _this = this;
                var inst = {
                    opt: Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options),
                    msType: "RadioButton"
                };
                PRIVATE.set(this, inst);
                var opt = inst.opt;
                opt.id || (opt.id = uuidGenerate());
                // Set the MS Type which is used in the class name
                "checkbox" === opt.type.toLowerCase() && (inst.msType = "CheckBox");
                var $ui = this.$ui = this.getTemplate();
                "string" === typeof $ui && ($ui = this.$ui = Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__.a)(Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__.a)($ui, inst)).firstChild);
                var uiFind = $ui.querySelector.bind($ui);
                inst.$input = uiFind(".spwidgets-ChoiceField-ChoiceItem-input");
                inst.$label = uiFind(".spwidgets-ChoiceField-ChoiceItem-label");
                inst.uiClickEv = Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__.a)(inst.$input, "click", function() {
                    markChoiceField.call(_this);
                    /**
             * The state of the Choice item has changed
             *
             * @event ChoiceItem#change
             */
                    _this.emit("change");
                });
                this.onDestroy(function() {
                    // Destroy all Compose object
                    Object.keys(inst).forEach(function(prop) {
                        if (inst[prop]) {
                            // Widgets
                            inst[prop].destroy ? inst[prop].destroy() : inst[prop].remove ? inst[prop].remove() : inst[prop].off && inst[prop].off();
                            inst[prop] = void 0;
                        }
                    });
                    PRIVATE.delete(this);
                }.bind(this));
            },
            /**
     * returns the widget's template
     * @return {String}
     */
            getTemplate: function() {
                return __WEBPACK_IMPORTED_MODULE_10__ChoiceItem_html___default.a;
            },
            /**
     * Returns the value of this choice item - normally the same
     * as what was provided on input to the consructor.
     *
     * @return {Object|String}
     */
            getValue: function() {
                return PRIVATE.get(this).opt.value;
            },
            /**
     * Returns the data structure associated with this choice
     * (same as `data` attribute passed on input to constructor)
     */
            getData: function() {
                return PRIVATE.get(this).opt.data;
            },
            /**
     * returns the specific value in the Input (checkbox or radio) element `value` attribute
     *
     * @return {String}
     */
            getInputValue: function() {
                return PRIVATE.get(this).$input.value;
            },
            /**
     * returns a boolean indicating if choice is checked
     *
     * @return {Boolean}
     */
            isChecked: function() {
                return PRIVATE.get(this).$input.checked;
            },
            /**
     * Checks the choice and shows it as selected
     */
            check: function() {
                //let { $input, $label } = PRIVATE.get(this);
                PRIVATE.get(this).$input.checked = true;
                markChoiceField.call(this);
            },
            /**
     * Unchecks the choice adn shows it as unselected
     */
            unCheck: function() {
                //let { $input, $label } = PRIVATE.get(this);
                PRIVATE.get(this).$input.checked = false;
                markChoiceField.call(this);
            },
            /**
     * Toggles the check states of the choice item
     */
            toggle: function() {
                this.isChecked() ? this.unCheck() : this.check();
            },
            /**
     * Re-evaluate the widget state and makes adjustment if needed.
     * Called primarily when Widget is set to use radio buttons
     */
            evalState: function() {
                markChoiceField.call(this);
            }
        });
        function markChoiceField() {
            var _PRIVATE$get = PRIVATE.get(this), $input = _PRIVATE$get.$input, $label = _PRIVATE$get.$label;
            $input.checked ? Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddClass__.a)($label, CSS_MS_IS_CHECKED) : Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domRemoveClass__.a)($label, CSS_MS_IS_CHECKED);
        }
        ChoiceItem.defaults = {
            name: "",
            title: "",
            value: "",
            type: "radio",
            // checkbox -or- radio
            id: "",
            data: null
        };
        /* harmony default export */
        __webpack_exports__.a = ChoiceItem;
    }, /* 80 */
    /***/
    function(module, exports) {
        module.exports = '<div class="spwidgets-ChoiceField-ChoiceItem">\r\n    <div class="ms-{{msType}} ms-font-m">\r\n        <input class="ms-{{msType}}-input spwidgets-ChoiceField-ChoiceItem-input" tabindex="-1" id="{{opt.id}}" type="{{opt.type}}" name="{{opt.name}}" value="{{opt.value}}">\r\n        <label role="{{opt.type}}" class="ms-{{msType}}-field spwidgets-ChoiceField-ChoiceItem-label" for="{{opt.id}}" tabindex="0" aria-checked="false">\r\n            <span class="ms-Label">{{opt.title}}</span>\r\n        </label>\r\n    </div>\r\n</div>\r\n';
    }, /* 81 */
    /***/
    function(module, exports, __webpack_require__) {
        var content = __webpack_require__(82);
        "string" === typeof content && (content = [ [ module.i, content, "" ] ]);
        var options = {
            hmr: true
        };
        options.transform = void 0;
        options.insertInto = void 0;
        __webpack_require__(6)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 82 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)();
        // imports
        // module
        exports.push([ module.i, ".spwidgets-ChoiceField-ChoiceItem {\n  padding-left: 0.5em;\n  padding-right: 0.5em;\n}\n.spwidgets-ChoiceField-ChoiceItem-label {\n  display: block;\n}\n", "" ]);
    }, /* 83 */
    /***/
    function(module, exports) {
        module.exports = '<div class="spwidgets-ChoiceField spwidgets-ChoiceField--noSelectedCount ms-font-m">\r\n    <div class="ms-ChoiceFieldGroup">\r\n        <div class="ms-ChoiceFieldGroup-title">\r\n            <label class="ms-Label">{{column.DisplayName}}</label>\r\n        </div>\r\n        <span class="spwidgets-ChoiceField-description">{{column.Description}}</span>\r\n        <div class="spwidgets-ChoiceField-choices ms-ChoiceFieldGroup-list ms-borderColor-neutralSecondary--hover"></div>\r\n        <div class="spwidgets-ChoiceField-selectedCount"></div>\r\n    </div>\r\n</div>\r\n';
    }, /* 84 */
    /***/
    function(module, exports, __webpack_require__) {
        var content = __webpack_require__(85);
        "string" === typeof content && (content = [ [ module.i, content, "" ] ]);
        var options = {
            hmr: true
        };
        options.transform = void 0;
        options.insertInto = void 0;
        __webpack_require__(6)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 85 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)();
        // imports
        // module
        exports.push([ module.i, ".spwidgets-ChoiceField-choices {\n  padding: 0.5em;\n  overflow: auto;\n  border: 1px solid #eaeaea;\n  min-height: 5em;\n}\n.spwidgets-ChoiceField-choices::-webkit-scrollbar {\n  width: 0.5em;\n  background-color: #F5F5F5;\n}\n.spwidgets-ChoiceField-choices::-webkit-scrollbar-thumb {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  background-color: #555;\n}\n.spwidgets-ChoiceField--noLabel .ms-ChoiceFieldGroup-title {\n  display: none;\n}\n.spwidgets-ChoiceField--noDescription .spwidgets-ChoiceField-description {\n  display: none;\n}\n.spwidgets-ChoiceField--inline .spwidgets-ChoiceField-choices > * {\n  display: inline-block;\n  margin-right: 1em;\n  padding-right: 0.5em;\n}\n.spwidgets-ChoiceField--inline .spwidgets-ChoiceField-choices > *:last-child {\n  margin-right: 0;\n}\n.spwidgets-ChoiceField--noSelectedCount .spwidgets-ChoiceField-selectedCount {\n  display: none;\n}\n", "" ]);
    }, /* 86 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domAddClass__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__ = __webpack_require__(10);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8_flatpickr__ = __webpack_require__(87);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_flatpickr__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9_flatpickr_dist_flatpickr_min_css__ = __webpack_require__(88);
        /* harmony import */
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_flatpickr_dist_flatpickr_min_css__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10__DateTimeField_html__ = __webpack_require__(90);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10__DateTimeField_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__DateTimeField_html__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_11__DateTimeField_less__ = __webpack_require__(91);
        /* harmony import */
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__DateTimeField_less__);
        //--------------------------------------------------------
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create();
        window.navigator;
        var CSS_BASE_CLASS = "spwidgets-DateTimeField";
        /**
 * A SharePoint DateTime field.
 *
 * @class DateTimeField
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} options
 *
 * @param {Object|ListColumnModel} options.column
 *  the column definition. `DisplayName`, `Description` and
 *  `Format` all have an impact on the widget.
 *
 * @param {String} [options.dateFormat='F j, Y']
 *  Format of the date when no time is allowed.
 *  For information on what token can be used see
 *  [flatpickr widget]{@link https://chmln.github.io/flatpickr/#dateformat}
 *
 * @param {String} [options.dateTimeFormat='F j, Y h:i:S K']
 *  Format of the date and time.
 *  For information on what token can be used see
 *  [flatpickr widget]{@link https://chmln.github.io/flatpickr/#dateformat}
 *
 * @fires DateTimeField#change
 */
        var DateTimeField = /** @lends DateTimeField.prototype */ {
            init: function(options) {
                var inst = {
                    opt: Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options)
                }, opt = inst.opt, column = opt.column || {};
                PRIVATE.set(this, inst);
                var $ui = this.$ui = Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__.a)(Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__.a)(this.getTemplate(), inst.opt)).firstChild;
                var uiFind = this.$ui.querySelector.bind($ui);
                inst.isDateOnly = "DateOnly" === column.Format;
                opt.hideLabel && Object(__WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domAddClass__.a)($ui, CSS_BASE_CLASS + "--noLabel");
                opt.hideDescription && Object(__WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domAddClass__.a)($ui, CSS_BASE_CLASS + "--noDescription");
                opt.inline && Object(__WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domAddClass__.a)($ui, CSS_BASE_CLASS + "--inlinePicker");
                var dateWdg = inst.dateWdg = __WEBPACK_IMPORTED_MODULE_8_flatpickr___default()(uiFind("input"), {
                    dateFormat: inst.isDateOnly ? opt.dateFormat : opt.dateTimeFormat,
                    enableTime: !inst.isDateOnly,
                    inline: opt.inline,
                    prevArrow: '<i class="ms-Icon ms-Icon--ChevronLeft" />',
                    nextArrow: '<i class="ms-Icon ms-Icon--ChevronRight" />',
                    onChange: function(dtObj, dtStr) {
                        /**
                 * Date and/or time was changed
                 *
                 * @event DateTimeField#change
                 *
                 * @type Object
                 * @property {Date} dateObj
                 * @property {String} formattedDate
                 */
                        this.emit("change", {
                            dateObj: dtObj,
                            formattedDate: dtStr
                        });
                    }.bind(this)
                });
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__.a)(uiFind(".spwidgets-DateTimeField-calIcon"), "click", dateWdg.toggle.bind(dateWdg));
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__.a)(uiFind(".spwidgets-DateTimeField-clearIcon"), "click", dateWdg.clear.bind(dateWdg));
                this.onDestroy(function() {
                    // Destroy all Compose object
                    Object.keys(inst).forEach(function(prop) {
                        if (inst[prop]) {
                            // Widgets
                            inst[prop].destroy ? inst[prop].destroy() : inst[prop].remove ? inst[prop].remove() : inst[prop].off && inst[prop].off();
                            inst[prop] = void 0;
                        }
                    });
                    PRIVATE.delete(this);
                }.bind(this));
            },
            getTemplate: function() {
                return __WEBPACK_IMPORTED_MODULE_10__DateTimeField_html___default.a;
            },
            /**
     * Returns an object containing information about the date
     * selected by the user.
     *
     * @return {Object|undefined}
     *
     * @example
     *
     * // returned object format
     *
     * {
     *      dateObj: Date()
     *      formattedDate: 'date displayed to user'
     * }
     */
            getValue: function() {
                var dateWdg = PRIVATE.get(this).dateWdg, dateObj = dateWdg.selectedDateObj;
                if (!dateObj) return;
                return {
                    dateObj: dateObj,
                    formattedDate: dateWdg.input.value
                };
            },
            /**
     * Sets the date on the widget
     *
     * @param {String|Date} date
     *  The date to set on the widget. If a `String` is defined, it
     *  must be one that `Date.parse()` can handle
     *  ([more]{@link http://devdocs.io/javascript/global_objects/date/parse})
     *
     * @see http://devdocs.io/javascript/global_objects/date/parse
     */
            setValue: function(date) {
                if (!date) return;
                "string" === typeof date && (date = new Date(Date.parse(date)));
                if (date instanceof Date) {
                    var _PRIVATE$get = PRIVATE.get(this), dateWdg = _PRIVATE$get.dateWdg, isDateOnly = _PRIVATE$get.isDateOnly;
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    dateWdg.setDate(date);
                    isDateOnly || dateWdg.setTime(hours, minutes);
                }
            }
        };
        DateTimeField = __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__.a.extend(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__.a, DateTimeField);
        DateTimeField.defaults = {
            column: null,
            dateFormat: "F j, Y",
            dateTimeFormat: "F j, Y h:i:S K",
            hideLabel: false,
            hideDescription: false,
            inline: false,
            allowMultiples: false,
            // FIXME: implement
            labels: {
                placeholder: "Click to select..."
            }
        };
        /* harmony default export */
        __webpack_exports__.a = DateTimeField;
    }, /* 87 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var _typeof2 = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        var _typeof = "function" === typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(obj) {
            return "undefined" === typeof obj ? "undefined" : _typeof2(obj);
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol ? "symbol" : "undefined" === typeof obj ? "undefined" : _typeof2(obj);
        };
        var flatpickr = function flatpickr(selector, config) {
            var elements = void 0;
            var createInstance = function(element) {
                element._flatpickr && element._flatpickr.destroy();
                element._flatpickr = new flatpickr.init(element, config);
                return element._flatpickr;
            };
            if (selector.nodeName) return createInstance(selector);
            if (/^#[a-zA-Z0-9\-_]*$/.test(selector)) return createInstance(document.getElementById(selector.slice(1)));
            elements = /^\.[a-zA-Z0-9\-_]*$/.test(selector) ? document.getElementsByClassName(selector.slice(1)) : document.querySelectorAll(selector);
            var instances = [];
            for (var i = 0; i < elements.length; i++) instances.push(createInstance(elements[i]));
            if (1 === instances.length) return instances[0];
            return {
                calendars: instances,
                byID: function(id) {
                    return document.getElementById(id)._flatpickr;
                }
            };
        };
        /**
 * @constructor
 */
        flatpickr.init = function(element, instanceConfig) {
            function createElement(tag, className, content) {
                var newElement = document.createElement(tag);
                content && (newElement.textContent = content);
                className && (newElement.className = className);
                return newElement;
            }
            // functions
            var self = this;
            var parseConfig = void 0, init = void 0, wrap = void 0, uDate = void 0, equalDates = void 0, pad = void 0, monthToStr = void 0, isEnabled = void 0, buildMonthNavigation = void 0, buildWeekdays = void 0, buildCalendar = void 0, buildDays = void 0, buildWeeks = void 0, buildTime = void 0, timeWrapper = void 0, yearScroll = void 0, updateValue = void 0, amPMToggle = void 0, onKeyDown = void 0, onResize = void 0, updateNavigationCurrentMonth = void 0, handleYearChange = void 0, changeMonth = void 0, getDaysinMonth = void 0, documentClick = void 0, selectDate = void 0, getRandomCalendarIdStr = void 0, bind = void 0, triggerChange = void 0;
            // elements & variables
            var calendarContainer = void 0, weekdayContainer = void 0, timeContainer = void 0, navigationCurrentMonth = void 0, monthsNav = void 0, prevMonthNav = void 0, currentYearElement = void 0, currentMonthElement = void 0, nextMonthNav = void 0, calendar = void 0, weekNumbers = void 0, now = new Date(), wrapperElement = void 0, clickEvt = void 0;
            self.formats = {
                // weekday name, short, e.g. Thu
                D: function() {
                    return self.l10n.weekdays.shorthand[self.formats.w()];
                },
                // full month name e.g. January
                F: function() {
                    return monthToStr(self.formats.n() - 1, false);
                },
                // hours with leading zero e.g. 03
                H: function() {
                    return pad(self.selectedDateObj.getHours());
                },
                // day (1-30) with ordinal suffix e.g. 1st, 2nd
                J: function() {
                    return self.formats.j() + self.l10n.ordinal(self.formats.j());
                },
                // AM/PM
                K: function() {
                    return self.selectedDateObj.getHours() > 11 ? "PM" : "AM";
                },
                // shorthand month e.g. Jan, Sep, Oct, etc
                M: function() {
                    return monthToStr(self.formats.n() - 1, true);
                },
                // seconds 00-59
                S: function() {
                    return pad(self.selectedDateObj.getSeconds());
                },
                // unix timestamp
                U: function() {
                    return self.selectedDateObj.getTime() / 1e3;
                },
                // full year e.g. 2016
                Y: function() {
                    return self.selectedDateObj.getFullYear();
                },
                // day in month, padded (01-30)
                d: function() {
                    return pad(self.formats.j());
                },
                // hour from 1-12 (am/pm)
                h: function() {
                    return self.selectedDateObj.getHours() % 12 ? self.selectedDateObj.getHours() % 12 : 12;
                },
                // minutes, padded with leading zero e.g. 09
                i: function() {
                    return pad(self.selectedDateObj.getMinutes());
                },
                // day in month (1-30)
                j: function() {
                    return self.selectedDateObj.getDate();
                },
                // weekday name, full, e.g. Thursday
                l: function() {
                    return self.l10n.weekdays.longhand[self.formats.w()];
                },
                // padded month number (01-12)
                m: function() {
                    return pad(self.formats.n());
                },
                // the month number (1-12)
                n: function() {
                    return self.selectedDateObj.getMonth() + 1;
                },
                // seconds 0-59
                s: function() {
                    return self.selectedDateObj.getSeconds();
                },
                // number of the day of the week
                w: function() {
                    return self.selectedDateObj.getDay();
                },
                // last two digits of year e.g. 16 for 2016
                y: function() {
                    return String(self.formats.Y()).substring(2);
                }
            };
            self.defaultConfig = {
                /* if true, dates will be parsed, formatted, and displayed in UTC.
  preloading date strings w/ timezones is recommended but not necessary */
                utc: false,
                // wrap: see https://chmln.github.io/flatpickr/#strap
                wrap: false,
                // enables week numbers
                weekNumbers: false,
                allowInput: false,
                /*
  	clicking on input opens the date(time)picker.
  	disable if you wish to open the calendar manually with .open()
  */
                clickOpens: true,
                // display time picker in 24 hour mode
                time_24hr: false,
                // enables the time picker functionality
                enableTime: false,
                // noCalendar: true will hide the calendar. use for a time picker along w/ enableTime
                noCalendar: false,
                // more date format chars at https://chmln.github.io/flatpickr/#dateformat
                dateFormat: "Y-m-d",
                // altInput - see https://chmln.github.io/flatpickr/#altinput
                altInput: false,
                // the created altInput element will have this class.
                altInputClass: "",
                // same as dateFormat, but for altInput
                altFormat: "F j, Y",
                // defaults to e.g. June 10, 2016
                // defaultDate - either a datestring or a date object. used for datetimepicker"s initial value
                defaultDate: null,
                // the minimum date that user can pick (inclusive)
                minDate: null,
                // the maximum date that user can pick (inclusive)
                maxDate: null,
                // dateparser that transforms a given string to a date object
                parseDate: null,
                // see https://chmln.github.io/flatpickr/#disable
                enable: [],
                // see https://chmln.github.io/flatpickr/#disable
                disable: [],
                // display the short version of month names - e.g. Sep instead of September
                shorthandCurrentMonth: false,
                // displays calendar inline. see https://chmln.github.io/flatpickr/#inline-calendar
                inline: false,
                // position calendar inside wrapper and next to the input element
                // leave at false unless you know what you"re doing
                static: false,
                // code for previous/next icons. this is where you put your custom icon code e.g. fontawesome
                prevArrow: "&lt;",
                nextArrow: "&gt;",
                // enables seconds in the time picker
                enableSeconds: false,
                // step size used when scrolling/incrementing the hour element
                hourIncrement: 1,
                // step size used when scrolling/incrementing the minute element
                minuteIncrement: 5,
                // onChange callback when user selects a date or time
                onChange: null,
                // function (dateObj, dateStr) {}
                // called every time calendar is opened
                onOpen: null,
                // function (dateObj, dateStr) {}
                // called every time calendar is closed
                onClose: null,
                // function (dateObj, dateStr) {}
                onValueUpdate: null
            };
            init = function() {
                instanceConfig = instanceConfig || {};
                self.element = element;
                parseConfig();
                self.input = self.config.wrap ? element.querySelector("[data-input]") : element;
                self.input.classList.add("flatpickr-input");
                self.config.defaultDate && (self.config.defaultDate = uDate(self.config.defaultDate));
                (self.input.value || self.config.defaultDate) && (self.selectedDateObj = uDate(self.config.defaultDate || self.input.value));
                wrap();
                buildCalendar();
                bind();
                self.uDate = uDate;
                self.jumpToDate();
                updateValue();
            };
            parseConfig = function() {
                self.config = {};
                Object.keys(self.defaultConfig).forEach(function(key) {
                    instanceConfig.hasOwnProperty(key) ? self.config[key] = instanceConfig[key] : self.element.dataset && self.element.dataset.hasOwnProperty(key.toLowerCase()) ? self.config[key] = self.element.dataset[key.toLowerCase()] : !self.element.dataset && self.element.hasAttribute("data-" + key) ? self.config[key] = self.element.getAttribute("data-" + key) : self.config[key] = flatpickr.init.prototype.defaultConfig[key] || self.defaultConfig[key];
                    "boolean" === typeof self.defaultConfig[key] && (self.config[key] = true === self.config[key] || "" === self.config[key] || "true" === self.config[key]);
                    if ("enableTime" === key && self.config[key]) {
                        self.defaultConfig.dateFormat = self.config.time_24hr ? "Y-m-d H:i" : "Y-m-d h:i K";
                        self.defaultConfig.altFormat = self.config.time_24hr ? "F j, Y H:i" : "F j Y, h:i K";
                    } else if ("noCalendar" === key && self.config[key]) {
                        self.defaultConfig.dateFormat = "h:i K";
                        self.defaultConfig.altFormat = "h:i K";
                    }
                });
            };
            getRandomCalendarIdStr = function() {
                var randNum = void 0, idStr = void 0;
                do {
                    randNum = Math.round(Math.random() * Math.pow(10, 10));
                    idStr = "flatpickr-" + randNum;
                } while (null !== document.getElementById(idStr));
                return idStr;
            };
            uDate = function(date, timeless) {
                timeless = timeless || false;
                if ("today" === date) {
                    date = new Date();
                    timeless = true;
                } else if ("string" === typeof date) {
                    date = date.trim();
                    if (self.config.parseDate) date = self.config.parseDate(date); else if (/^\d\d\d\d\-\d{1,2}\-\d\d$/.test(date)) // this utc datestring gets parsed, but incorrectly by Date.parse
                    date = new Date(date.replace(/(\d)-(\d)/g, "$1/$2")); else if (Date.parse(date)) date = new Date(date); else if (/^\d\d\d\d\-\d\d\-\d\d/.test(date)) // disable special utc datestring
                    date = new Date(date.replace(/(\d)-(\d)/g, "$1/$2")); else if (/^(\d?\d):(\d\d)/.test(date)) {
                        // time-only picker
                        var matches = date.match(/^(\d?\d):(\d\d)(:(\d\d))?/), seconds = void 0 !== matches[4] ? matches[4] : 0;
                        date = new Date();
                        date.setHours(matches[1], matches[2], seconds, 0);
                    } else {
                        console.error("flatpickr: invalid date string " + date);
                        console.info(self.element);
                    }
                }
                if (!(date instanceof Date) || !date.getTime()) return null;
                self.config.utc && !date.fp_isUTC && (date = date.fp_toUTC());
                timeless && date.setHours(0, 0, 0, 0);
                return date;
            };
            equalDates = function(date1, date2) {
                return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
            };
            wrap = function() {
                wrapperElement = createElement("div", "flatpickr-wrapper");
                if (self.config.inline || self.config.static) {
                    // Wrap input and place calendar underneath
                    self.element.parentNode.insertBefore(wrapperElement, self.element);
                    wrapperElement.appendChild(self.element);
                    wrapperElement.classList.add(self.config.inline ? "inline" : "static");
                } else // Insert at bottom of BODY tag to display outside
                // of relative positioned elements with css "overflow: hidden;"
                // property set.
                document.body.appendChild(wrapperElement);
                if (self.config.altInput) {
                    // replicate self.element
                    self.altInput = createElement(self.input.nodeName, self.config.altInputClass + " flatpickr-input");
                    self.altInput.placeholder = self.input.placeholder;
                    self.altInput.type = "text";
                    self.input.type = "hidden";
                    self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
                }
            };
            getDaysinMonth = function() {
                var month = arguments.length <= 0 || void 0 === arguments[0] ? self.currentMonth : arguments[0];
                var yr = self.currentYear;
                if (1 === month && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0)) return 29;
                return self.l10n.daysInMonth[month];
            };
            updateValue = function(e) {
                if (self.config.noCalendar && !self.selectedDateObj) // picking time only and method triggered from picker
                self.selectedDateObj = new Date(); else if (!self.selectedDateObj) return;
                e && e.target.blur();
                var timeHasChanged = void 0;
                if (self.config.enableTime) {
                    var previousTimestamp = self.selectedDateObj.getTime();
                    // update time
                    var hours = parseInt(self.hourElement.value, 10) || 0, seconds = void 0;
                    var minutes = (60 + (parseInt(self.minuteElement.value, 10) || 0)) % 60;
                    self.config.enableSeconds && (seconds = (60 + parseInt(self.secondElement.value, 10) || 0) % 60);
                    self.config.time_24hr || (// the real number of hours for the date object
                    hours = hours % 12 + 12 * ("PM" === self.amPM.innerHTML));
                    self.selectedDateObj.setHours(hours, minutes, void 0 === seconds ? self.selectedDateObj.getSeconds() : seconds);
                    self.hourElement.value = pad(self.config.time_24hr ? hours : (12 + hours) % 12 + 12 * (hours % 12 === 0));
                    self.minuteElement.value = pad(minutes);
                    void 0 !== seconds && (self.secondElement.value = pad(seconds));
                    timeHasChanged = self.selectedDateObj.getTime() !== previousTimestamp;
                }
                self.input.value = self.formatDate(self.config.dateFormat);
                self.altInput && (self.altInput.value = self.formatDate(self.config.altFormat));
                e && (timeHasChanged || e.target.classList.contains("flatpickr-day")) && triggerChange();
                self.config.onValueUpdate && self.config.onValueUpdate(self.selectedDateObj, self.input.value, self);
            };
            pad = function(num) {
                return ("0" + num).slice(-2);
            };
            self.formatDate = function(dateFormat) {
                var formattedDate = "";
                var formatPieces = dateFormat.split("");
                for (var i = 0; i < formatPieces.length; i++) {
                    var c = formatPieces[i];
                    self.formats.hasOwnProperty(c) && "\\" !== formatPieces[i - 1] ? formattedDate += self.formats[c]() : "\\" !== c && (formattedDate += c);
                }
                return formattedDate;
            };
            monthToStr = function(date, shorthand) {
                if (shorthand || self.config.shorthandCurrentMonth) return self.l10n.months.shorthand[date];
                return self.l10n.months.longhand[date];
            };
            isEnabled = function(dateToCheck) {
                if (self.config.minDate && dateToCheck < self.config.minDate || self.config.maxDate && dateToCheck > self.config.maxDate) return false;
                dateToCheck = uDate(dateToCheck, true);
                // timeless
                var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
                var d = void 0;
                for (var i = 0; i < array.length; i++) {
                    d = array[i];
                    if (d instanceof Function && d(dateToCheck)) // disabled by function
                    return bool;
                    if (// disabled weekday
                    "string" === typeof d && /^wkd/.test(d) && dateToCheck.getDay() === (parseInt(d.slice(-1), 10) + self.l10n.firstDayOfWeek - 1) % 7) return bool;
                    if ((d instanceof Date || "string" === typeof d && !/^wkd/.test(d)) && uDate(d, true).getTime() === dateToCheck.getTime()) // disabled by date string
                    return bool;
                    if (// disabled by range
                    "object" === ("undefined" === typeof d ? "undefined" : _typeof(d)) && d.hasOwnProperty("from") && dateToCheck >= uDate(d.from) && dateToCheck <= uDate(d.to)) return bool;
                }
                return !bool;
            };
            yearScroll = function(event) {
                event.preventDefault();
                var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.deltaY));
                self.currentYear = event.target.value = parseInt(event.target.value, 10) + delta;
                self.redraw();
            };
            timeWrapper = function(e) {
                e.preventDefault();
                var min = parseInt(e.target.min, 10), max = parseInt(e.target.max, 10), step = parseInt(e.target.step, 10), value = parseInt(e.target.value, 10);
                var newValue = value;
                "wheel" === e.type && (newValue = value + step * Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY)));
                newValue <= min ? newValue = max - step : newValue >= max && (newValue = min + step);
                e.target.value = pad(newValue);
            };
            updateNavigationCurrentMonth = function() {
                currentMonthElement.textContent = monthToStr(self.currentMonth) + " ";
                currentYearElement.value = self.currentYear;
            };
            handleYearChange = function() {
                if (self.currentMonth < 0 || self.currentMonth > 11) {
                    self.currentYear += self.currentMonth % 11;
                    self.currentMonth = (self.currentMonth + 12) % 12;
                }
            };
            documentClick = function(e) {
                var isCalendarElement = wrapperElement.contains(e.relatedTarget || e.target), isInput = self.element.contains(e.relatedTarget || e.target) || e.relatedTarget || e.target === self.altInput;
                !self.isOpen || isCalendarElement || isInput || self.close();
            };
            changeMonth = function(offset) {
                self.currentMonth += offset;
                handleYearChange();
                updateNavigationCurrentMonth();
                buildDays();
                (self.config.noCalendar ? timeContainer : calendar).focus();
            };
            selectDate = function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (self.config.allowInput && e.target === (self.altInput || self.input) && 13 === e.which) {
                    self.setDate((self.altInput || self.input).value);
                    self.redraw();
                } else if (e.target.classList.contains("flatpickr-day")) {
                    var isPrevMonthDay = e.target.classList.contains("prevMonthDay"), isNextMonthDay = e.target.classList.contains("nextMonthDay"), monthNum = self.currentMonth - isPrevMonthDay + isNextMonthDay;
                    (isPrevMonthDay || isNextMonthDay) && changeMonth(+isNextMonthDay - isPrevMonthDay);
                    self.selectedDateObj = new Date(self.currentYear, monthNum, e.target.innerHTML);
                    updateValue(e);
                    buildDays();
                    self.config.enableTime || self.close();
                }
            };
            buildCalendar = function() {
                calendarContainer = createElement("div", "flatpickr-calendar");
                calendarContainer.id = getRandomCalendarIdStr();
                calendar = createElement("div", "flatpickr-days");
                calendar.tabIndex = -1;
                if (!self.config.noCalendar) {
                    buildMonthNavigation();
                    buildWeekdays();
                    self.config.weekNumbers && buildWeeks();
                    buildDays();
                    calendarContainer.appendChild(calendar);
                }
                wrapperElement.appendChild(calendarContainer);
                self.config.enableTime && buildTime();
            };
            buildMonthNavigation = function() {
                monthsNav = createElement("div", "flatpickr-month");
                prevMonthNav = createElement("span", "flatpickr-prev-month");
                prevMonthNav.innerHTML = self.config.prevArrow;
                currentMonthElement = createElement("span", "cur_month");
                currentYearElement = createElement("input", "cur_year");
                currentYearElement.type = "number";
                currentYearElement.title = self.l10n.scrollTitle;
                nextMonthNav = createElement("span", "flatpickr-next-month");
                nextMonthNav.innerHTML = self.config.nextArrow;
                navigationCurrentMonth = createElement("span", "flatpickr-current-month");
                navigationCurrentMonth.appendChild(currentMonthElement);
                navigationCurrentMonth.appendChild(currentYearElement);
                monthsNav.appendChild(prevMonthNav);
                monthsNav.appendChild(navigationCurrentMonth);
                monthsNav.appendChild(nextMonthNav);
                calendarContainer.appendChild(monthsNav);
                updateNavigationCurrentMonth();
            };
            buildWeekdays = function() {
                weekdayContainer = createElement("div", "flatpickr-weekdays");
                var firstDayOfWeek = self.l10n.firstDayOfWeek;
                var weekdays = self.l10n.weekdays.shorthand.slice();
                firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length && (weekdays = [].concat(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek)));
                self.config.weekNumbers && (weekdayContainer.innerHTML = "<span>" + self.l10n.weekAbbreviation + "</span>");
                weekdayContainer.innerHTML += "<span>" + weekdays.join("</span><span>") + "</span>";
                calendarContainer.appendChild(weekdayContainer);
            };
            buildWeeks = function() {
                calendarContainer.classList.add("hasWeeks");
                weekNumbers = createElement("div", "flatpickr-weeks");
                calendarContainer.appendChild(weekNumbers);
            };
            buildDays = function() {
                var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7, daysInMonth = getDaysinMonth(), prevMonthDays = getDaysinMonth((self.currentMonth - 1 + 12) % 12), days = document.createDocumentFragment();
                var dayNumber = prevMonthDays + 1 - firstOfMonth, currentDate = void 0, dateIsDisabled = void 0;
                self.config.weekNumbers && (weekNumbers.innerHTML = "");
                calendar.innerHTML = "";
                self.config.minDate = uDate(self.config.minDate, true);
                self.config.maxDate = uDate(self.config.maxDate, true);
                // prepend days from the ending of previous month
                for (;dayNumber <= prevMonthDays; dayNumber++) {
                    var curDate = new Date(self.currentYear, self.currentMonth - 1, dayNumber, 0, 0, 0, 0, 0), dateIsEnabled = isEnabled(curDate), dayElem = createElement("span", dateIsEnabled ? "flatpickr-day prevMonthDay" : "disabled", dayNumber);
                    dateIsEnabled && (dayElem.tabIndex = 0);
                    days.appendChild(dayElem);
                }
                // Start at 1 since there is no 0th day
                for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
                    currentDate = new Date(self.currentYear, self.currentMonth, dayNumber, 0, 0, 0, 0, 0);
                    self.config.weekNumbers && dayNumber % 7 === 1 && weekNumbers.appendChild(createElement("span", "disabled flatpickr-day", currentDate.fp_getWeek()));
                    dateIsDisabled = !isEnabled(currentDate);
                    var dayElement = createElement("span", dateIsDisabled ? "disabled" : "flatpickr-day", dayNumber);
                    if (!dateIsDisabled) {
                        dayElement.tabIndex = 0;
                        equalDates(currentDate, now) && dayElement.classList.add("today");
                        self.selectedDateObj && equalDates(currentDate, self.selectedDateObj) && dayElement.classList.add("selected");
                    }
                    days.appendChild(dayElement);
                }
                // append days from the next month
                for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++) {
                    var _curDate = new Date(self.currentYear, self.currentMonth + 1, dayNum % daysInMonth, 0, 0, 0, 0, 0), _dateIsEnabled = isEnabled(_curDate), _dayElement = createElement("span", _dateIsEnabled ? "nextMonthDay flatpickr-day" : "disabled", dayNum % daysInMonth);
                    self.config.weekNumbers && dayNum % 7 === 1 && weekNumbers.appendChild(createElement("span", "disabled", _curDate.fp_getWeek()));
                    _dateIsEnabled && (_dayElement.tabIndex = 0);
                    days.appendChild(_dayElement);
                }
                calendar.appendChild(days);
            };
            buildTime = function() {
                timeContainer = createElement("div", "flatpickr-time");
                timeContainer.tabIndex = -1;
                var separator = createElement("span", "flatpickr-time-separator", ":");
                self.hourElement = createElement("input", "flatpickr-hour");
                self.minuteElement = createElement("input", "flatpickr-minute");
                self.hourElement.tabIndex = self.minuteElement.tabIndex = 0;
                self.hourElement.type = self.minuteElement.type = "number";
                self.hourElement.value = self.selectedDateObj ? pad(self.selectedDateObj.getHours()) : 12;
                self.minuteElement.value = self.selectedDateObj ? pad(self.selectedDateObj.getMinutes()) : "00";
                self.hourElement.step = self.config.hourIncrement;
                self.minuteElement.step = self.config.minuteIncrement;
                self.hourElement.min = -self.config.time_24hr;
                self.hourElement.max = self.config.time_24hr ? 24 : 13;
                self.minuteElement.min = -self.minuteElement.step;
                self.minuteElement.max = 60;
                self.hourElement.title = self.minuteElement.title = self.l10n.scrollTitle;
                timeContainer.appendChild(self.hourElement);
                timeContainer.appendChild(separator);
                timeContainer.appendChild(self.minuteElement);
                if (self.config.enableSeconds) {
                    timeContainer.classList.add("has-seconds");
                    self.secondElement = createElement("input", "flatpickr-second");
                    self.secondElement.type = "number";
                    self.secondElement.value = self.selectedDateObj ? pad(self.selectedDateObj.getSeconds()) : "00";
                    self.secondElement.step = self.minuteElement.step;
                    self.secondElement.min = self.minuteElement.min;
                    self.secondElement.max = self.minuteElement.max;
                    timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
                    timeContainer.appendChild(self.secondElement);
                }
                if (!self.config.time_24hr) {
                    // add self.amPM if appropriate
                    self.amPM = createElement("span", "flatpickr-am-pm", [ "AM", "PM" ][self.hourElement.value > 11 | 0]);
                    self.amPM.title = self.l10n.toggleTitle;
                    self.amPM.tabIndex = 0;
                    timeContainer.appendChild(self.amPM);
                }
                calendarContainer.appendChild(timeContainer);
            };
            bind = function() {
                document.addEventListener("keydown", onKeyDown);
                window.addEventListener("resize", onResize);
                if (self.config.clickOpens) {
                    (self.altInput || self.input).addEventListener("click", self.open);
                    (self.altInput || self.input).addEventListener("focus", self.open);
                }
                self.config.wrap && self.element.querySelector("[data-open]") && self.element.querySelector("[data-open]").addEventListener("click", self.open);
                self.config.wrap && self.element.querySelector("[data-close]") && self.element.querySelector("[data-close]").addEventListener("click", self.close);
                self.config.wrap && self.element.querySelector("[data-toggle]") && self.element.querySelector("[data-toggle]").addEventListener("click", self.toggle);
                self.config.wrap && self.element.querySelector("[data-clear]") && self.element.querySelector("[data-clear]").addEventListener("click", self.clear);
                if (!self.config.noCalendar) {
                    prevMonthNav.addEventListener("click", function() {
                        changeMonth(-1);
                    });
                    nextMonthNav.addEventListener("click", function() {
                        changeMonth(1);
                    });
                    currentYearElement.addEventListener("wheel", yearScroll);
                    currentYearElement.addEventListener("focus", currentYearElement.select);
                    currentYearElement.addEventListener("input", function(event) {
                        self.currentYear = parseInt(event.target.value, 10);
                        self.redraw();
                    });
                    calendar.addEventListener("click", selectDate);
                }
                document.addEventListener("click", documentClick, true);
                document.addEventListener("focus", documentClick, true);
                if (self.config.enableTime) {
                    self.hourElement.addEventListener("wheel", timeWrapper);
                    self.minuteElement.addEventListener("wheel", timeWrapper);
                    self.hourElement.addEventListener("input", timeWrapper);
                    self.minuteElement.addEventListener("input", timeWrapper);
                    self.hourElement.addEventListener("mouseout", updateValue);
                    self.minuteElement.addEventListener("mouseout", updateValue);
                    self.hourElement.addEventListener("change", updateValue);
                    self.minuteElement.addEventListener("change", updateValue);
                    self.hourElement.addEventListener("focus", self.hourElement.select);
                    self.minuteElement.addEventListener("focus", self.minuteElement.select);
                    if (self.config.enableSeconds) {
                        self.secondElement.addEventListener("wheel", timeWrapper);
                        self.secondElement.addEventListener("input", timeWrapper);
                        self.secondElement.addEventListener("mouseout", updateValue);
                        self.secondElement.addEventListener("change", updateValue);
                        self.secondElement.addEventListener("focus", self.secondElement.select);
                    }
                    if (!self.config.time_24hr) {
                        self.amPM.addEventListener("click", amPMToggle);
                        self.amPM.addEventListener("wheel", amPMToggle);
                        self.amPM.addEventListener("mouseout", updateValue);
                        self.amPM.addEventListener("keydown", function(e) {
                            38 !== e.which && 40 !== e.which || amPMToggle(e);
                        });
                    }
                }
                if (document.createEvent) {
                    clickEvt = document.createEvent("MouseEvent");
                    // without all these args ms edge spergs out
                    clickEvt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                } else clickEvt = new MouseEvent("click", {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
            };
            self.open = function() {
                if (self.isOpen || (self.altInput || self.input).disabled || self.config.inline) return;
                self.config.static || self.positionCalendar();
                self.isOpen = true;
                wrapperElement.classList.add("open");
                if (!self.config.allowInput) {
                    (self.altInput || self.input).blur();
                    (self.config.noCalendar ? timeContainer : calendar).focus();
                }
                (self.altInput || self.input).classList.add("active");
                self.config.onOpen && self.config.onOpen(self.selectedDateObj, self.input.value, self);
            };
            // For calendars inserted in BODY (as opposed to inline wrapper)
            // it"s necessary to properly calculate top/left position.
            self.positionCalendar = function() {
                var calendarHeight = calendarContainer.offsetHeight, input = self.altInput || self.input, inputBounds = input.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom + input.offsetHeight;
                var top = void 0, left = window.pageXOffset + inputBounds.left;
                if (distanceFromBottom < calendarHeight) {
                    top = window.pageYOffset - calendarHeight + inputBounds.top - 2;
                    calendarContainer.classList.remove("arrowTop");
                    calendarContainer.classList.add("arrowBottom");
                } else {
                    top = window.pageYOffset + input.offsetHeight + inputBounds.top + 2;
                    calendarContainer.classList.remove("arrowBottom");
                    calendarContainer.classList.add("arrowTop");
                }
                wrapperElement.style.top = top + "px";
                wrapperElement.style.left = left + "px";
            };
            self.toggle = function() {
                self.isOpen ? self.close() : self.open();
            };
            self.close = function() {
                self.isOpen = false;
                wrapperElement.classList.remove("open");
                (self.altInput || self.input).classList.remove("active");
                self.config.onClose && self.config.onClose(self.selectedDateObj, self.input.value, self);
            };
            self.clear = function() {
                self.input.value = "";
                self.altInput && (self.altInput.value = "");
                self.selectedDateObj = null;
                triggerChange();
                self.jumpToDate();
            };
            triggerChange = function() {
                self.input.dispatchEvent(clickEvt);
                self.config.onChange && self.config.onChange(self.selectedDateObj, self.input.value, self);
            };
            self.destroy = function() {
                document.removeEventListener("click", documentClick, false);
                self.altInput && self.altInput.parentNode.removeChild(self.altInput);
                if (self.config.inline) {
                    var parent = self.element.parentNode, removedElement = parent.removeChild(self.element);
                    parent.removeChild(calendarContainer);
                    parent.parentNode.replaceChild(removedElement, parent);
                } else document.getElementsByTagName("body")[0].removeChild(wrapperElement);
            };
            self.redraw = function() {
                if (self.config.noCalendar) return;
                updateNavigationCurrentMonth();
                buildDays();
            };
            self.jumpToDate = function(jumpDate) {
                jumpDate = uDate(jumpDate || self.selectedDateObj || self.config.defaultDate || self.config.minDate || now);
                self.currentYear = jumpDate.getFullYear();
                self.currentMonth = jumpDate.getMonth();
                self.redraw();
            };
            self.setDate = function(date, triggerChangeEvent) {
                date = uDate(date);
                if (date instanceof Date && date.getTime()) {
                    self.selectedDateObj = uDate(date);
                    self.jumpToDate(self.selectedDateObj);
                    updateValue();
                    triggerChangeEvent && triggerChange();
                }
            };
            self.setTime = function(hour, minute, triggerChangeEvent) {
                if (!self.selectedDateObj) return;
                self.hourElement.value = parseInt(hour, 10) % 24;
                self.minuteElement.value = parseInt(minute || 0, 10) % 60;
                self.config.time_24hr || (self.amPM.innerHTML = hour > 11 ? "PM" : "AM");
                updateValue();
                triggerChangeEvent && triggerChange();
            };
            self.set = function(key, value) {
                if (key in self.config) {
                    self.config[key] = value;
                    self.jumpToDate();
                }
            };
            amPMToggle = function(e) {
                e.preventDefault();
                self.amPM.textContent = [ "AM", "PM" ]["AM" === self.amPM.innerHTML | 0];
            };
            onKeyDown = function(e) {
                if (!self.isOpen || self.config.enableTime && timeContainer.contains(e.target)) return;
                switch (e.which) {
                  case 13:
                    selectDate(e);
                    break;

                  case 27:
                    self.close();
                    break;

                  case 37:
                    changeMonth(-1);
                    break;

                  case 38:
                    e.preventDefault();
                    self.currentYear++;
                    self.redraw();
                    break;

                  case 39:
                    changeMonth(1);
                    break;

                  case 40:
                    e.preventDefault();
                    self.currentYear--;
                    self.redraw();
                }
            };
            onResize = function(func, wait, immediate) {
                var timeout = void 0;
                return function() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    var context = this;
                    var later = function() {
                        timeout = null;
                        immediate || func.apply(context, args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    immediate && !timeout && func.apply(context, args);
                };
            }(function() {
                !self.isOpen || self.config.inline || self.config.static || self.positionCalendar();
            }, 300);
            try {
                init();
            } catch (error) {
                // skip and carry on
                console.error(error);
                console.info(self.element);
            }
            return self;
        };
        flatpickr.init.prototype = {
            defaultConfig: {},
            l10n: {
                weekdays: {
                    shorthand: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
                    longhand: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
                },
                months: {
                    shorthand: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                    longhand: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
                },
                daysInMonth: [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
                firstDayOfWeek: 0,
                ordinal: function(nth) {
                    var s = nth % 100;
                    if (s > 3 && s < 21) return "th";
                    switch (s % 10) {
                      case 1:
                        return "st";

                      case 2:
                        return "nd";

                      case 3:
                        return "rd";

                      default:
                        return "th";
                    }
                },
                weekAbbreviation: "Wk",
                scrollTitle: "Scroll to increment",
                toggleTitle: "Click to toggle"
            }
        };
        Date.prototype.fp_incr = function(days) {
            return new Date(this.getFullYear(), this.getMonth(), this.getDate() + parseInt(days, 10));
        };
        Date.prototype.fp_isUTC = false;
        Date.prototype.fp_toUTC = function() {
            var newDate = new Date(this.getTime() + 6e4 * this.getTimezoneOffset());
            newDate.fp_isUTC = true;
            return newDate;
        };
        Date.prototype.fp_getWeek = function() {
            var date = new Date(this.getTime());
            date.setHours(0, 0, 0, 0);
            // Thursday in current week decides the year.
            date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
            // January 4 is always in week 1.
            var week1 = new Date(date.getFullYear(), 0, 4);
            // Adjust to Thursday in week 1 and count number of weeks from date to week1.
            return 1 + Math.round(((date.getTime() - week1.getTime()) / 864e5 - 3 + (week1.getDay() + 6) % 7) / 7);
        };
        // classList polyfill
        "classList" in document.documentElement || !Object.defineProperty || "undefined" === typeof HTMLElement || Object.defineProperty(HTMLElement.prototype, "classList", {
            get: function() {
                var selfElements = this;
                function update(fn) {
                    return function(value) {
                        var classes = selfElements.className.split(/\s+/);
                        var index = classes.indexOf(value);
                        fn(classes, index, value);
                        selfElements.className = classes.join(" ");
                    };
                }
                var ret = {
                    add: update(function(classes, index, value) {
                        return ~index || classes.push(value);
                    }),
                    remove: update(function(classes, index) {
                        return ~index && classes.splice(index, 1);
                    }),
                    toggle: update(function(classes, index, value) {
                        ~index ? classes.splice(index, 1) : classes.push(value);
                    }),
                    contains: function(value) {
                        return !!~selfElements.className.split(/\s+/).indexOf(value);
                    }
                };
                return ret;
            }
        });
        module.exports = flatpickr;
    }, /* 88 */
    /***/
    function(module, exports, __webpack_require__) {
        var content = __webpack_require__(89);
        "string" === typeof content && (content = [ [ module.i, content, "" ] ]);
        var options = {
            hmr: true
        };
        options.transform = void 0;
        options.insertInto = void 0;
        __webpack_require__(6)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 89 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)();
        // imports
        // module
        exports.push([ module.i, ".flatpickr-input,.flatpickr-wrapper input{z-index:1;cursor:pointer}.flatpickr-wrapper{position:absolute;display:none}.flatpickr-wrapper.inline,.flatpickr-wrapper.inline .flatpickr-calendar,.flatpickr-wrapper.static{position:relative}.flatpickr-wrapper.static .flatpickr-calendar{position:absolute}.flatpickr-wrapper.inline,.flatpickr-wrapper.open{display:inline-block}.flatpickr-wrapper.inline .flatpickr-calendar,.flatpickr-wrapper.open .flatpickr-calendar{z-index:99999;visibility:visible}.flatpickr-calendar{background:#fff;border:1px solid #ddd;font-size:90%;border-radius:3px;position:absolute;top:100%;left:0;visibility:hidden;width:256px}.flatpickr-calendar.hasWeeks{width:288px}.flatpickr-calendar.hasWeeks .flatpickr-weekdays span{width:12.5%}.flatpickr-calendar:after,.flatpickr-calendar:before{position:absolute;display:block;pointer-events:none;border:solid transparent;content:'';height:0;width:0;left:22px}.flatpickr-calendar:before{border-width:5px;margin:0 -5px}.flatpickr-calendar:after{border-width:4px;margin:0 -4px}.flatpickr-calendar.arrowTop:after,.flatpickr-calendar.arrowTop:before{bottom:100%}.flatpickr-calendar.arrowTop:before{border-bottom-color:#ddd}.flatpickr-calendar.arrowTop:after{border-bottom-color:#fff}.flatpickr-calendar.arrowBottom:after,.flatpickr-calendar.arrowBottom:before{top:100%}.flatpickr-calendar.arrowBottom:before{border-top-color:#ddd}.flatpickr-calendar.arrowBottom:after{border-top-color:#fff}.flatpickr-month{background:0 0;color:#000;padding:4px 5px 2px;text-align:center;position:relative}.flatpickr-next-month,.flatpickr-prev-month{text-decoration:none;cursor:pointer;position:absolute;top:.5rem}.flatpickr-next-month i,.flatpickr-prev-month i{position:relative}.flatpickr-next-month:hover,.flatpickr-prev-month:hover{color:#f99595}.flatpickr-prev-month{float:left;left:.5rem}.flatpickr-next-month{float:right;right:.5rem}.flatpickr-current-month{font-size:135%;font-weight:300;color:rgba(0,0,0,.7);display:inline-block}.flatpickr-current-month .cur_month{font-weight:700;color:#000}.flatpickr-current-month .cur_year{background:0 0;box-sizing:border-box;color:inherit;cursor:default;padding:0 0 0 2px;margin:0;width:3.15em;display:inline;font-size:inherit;font-weight:300;line-height:inherit;height:initial;border:0}.flatpickr-current-month .cur_year:hover{background:rgba(0,0,0,.05)}.flatpickr-weekdays{font-size:90%;background:0 0;padding:2px 0 4px;text-align:center}.flatpickr-weekdays span{opacity:.54;text-align:center;display:inline-block;width:14.28%;font-weight:700}.flatpickr-weeks{width:32px;float:left}.flatpickr-days{padding-top:1px;outline:0}.flatpickr-days span,.flatpickr-weeks span{background:0 0;border:1px solid transparent;border-radius:150px;box-sizing:border-box;color:#393939;cursor:pointer;display:inline-block;font-weight:300;width:34px;height:34px;line-height:33px;margin:0 1px 1px;text-align:center}.flatpickr-days span.disabled,.flatpickr-days span.disabled:hover,.flatpickr-days span.nextMonthDay,.flatpickr-days span.prevMonthDay,.flatpickr-weeks span.disabled,.flatpickr-weeks span.disabled:hover,.flatpickr-weeks span.nextMonthDay,.flatpickr-weeks span.prevMonthDay{color:rgba(57,57,57,.3);background:0 0;border-color:transparent;cursor:default}.flatpickr-days span.nextMonthDay:focus,.flatpickr-days span.nextMonthDay:hover,.flatpickr-days span.prevMonthDay:focus,.flatpickr-days span.prevMonthDay:hover,.flatpickr-days span:focus,.flatpickr-days span:hover,.flatpickr-weeks span.nextMonthDay:focus,.flatpickr-weeks span.nextMonthDay:hover,.flatpickr-weeks span.prevMonthDay:focus,.flatpickr-weeks span.prevMonthDay:hover,.flatpickr-weeks span:focus,.flatpickr-weeks span:hover{cursor:pointer;outline:0;background:#e6e6e6;border-color:#e6e6e6}.flatpickr-days span.today,.flatpickr-weeks span.today{border-color:#f99595}.flatpickr-days span.today:focus,.flatpickr-days span.today:hover,.flatpickr-weeks span.today:focus,.flatpickr-weeks span.today:hover{border-color:#f99595;background:#f99595;color:#fff}.flatpickr-days span.selected,.flatpickr-days span.selected:focus,.flatpickr-days span.selected:hover,.flatpickr-weeks span.selected,.flatpickr-weeks span.selected:focus,.flatpickr-weeks span.selected:hover{background:#446cb3;color:#fff;border-color:#446cb3}.flatpickr-am-pm,.flatpickr-time input[type=number],.flatpickr-time-separator{height:38px;display:inline-block;line-height:38px;color:#393939}.flatpickr-time{overflow:auto;text-align:center;border-top:0;outline:0}.flatpickr-time input[type=number]{background:0 0;-webkit-appearance:none;-moz-appearance:textfield;box-shadow:none;border:0;border-radius:0;width:33%;min-width:33%;text-align:center;margin:0;padding:0;cursor:pointer;font-weight:700}.flatpickr-am-pm:focus,.flatpickr-am-pm:hover,.flatpickr-time input[type=number]:focus,.flatpickr-time input[type=number]:hover{background:#f0f0f0}.flatpickr-time input[type=number].flatpickr-minute{width:26%;font-weight:300}.flatpickr-time input[type=number].flatpickr-second{font-weight:300}.flatpickr-time input[type=number]:focus{outline:0;border:0}.flatpickr-time.has-seconds input[type=number]{width:25%;min-width:25%}.flatpickr-days+.flatpickr-time{border-top:1px solid #ddd}.flatpickr-am-pm{outline:0;width:21%;padding:0 2%;cursor:pointer;text-align:left;font-weight:300}@media all and (-ms-high-contrast:none){.flatpickr-month{padding:0}}", "" ]);
    }, /* 90 */
    /***/
    function(module, exports) {
        module.exports = '<div class="spwidgets-DateTimeField ms-font-m">\r\n    <label class="ms-Label">{{column.DisplayName}}</label>\r\n    <div class="ms-TextField spwidgets-DateTimeField-inputHolder">\r\n        <input class="ms-TextField-field" data-input type="text" placeholder="{{labels.placeholder}}">\r\n        <div class="ms-Button spwidgets-DateTimeField-calIcon" data-toggle>\r\n            <i class="ms-Icon ms-Icon--Calendar"></i>\r\n        </div>\r\n        <div class="ms-Button spwidgets-DateTimeField-clearIcon" data-clear>\r\n            <i class="ms-Icon ms-Icon--ChromeClose"></i>\r\n        </div>\r\n    </div>\r\n    <span class="ms-TextField-description">{{column.Description}}</span>\r\n</div>\r\n';
    }, /* 91 */
    /***/
    function(module, exports, __webpack_require__) {
        var content = __webpack_require__(92);
        "string" === typeof content && (content = [ [ module.i, content, "" ] ]);
        var options = {
            hmr: true
        };
        options.transform = void 0;
        options.insertInto = void 0;
        __webpack_require__(6)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 92 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)();
        // imports
        // module
        exports.push([ module.i, ".spwidgets-DateTimeField {\n  position: relative;\n  box-sizing: border-box;\n}\n.spwidgets-DateTimeField-inputHolder {\n  position: relative;\n}\n.spwidgets-DateTimeField-calIcon,\n.spwidgets-DateTimeField-clearIcon {\n  position: absolute;\n  top: 0;\n  right: 54px;\n  border: 1px solid #c8c8c8;\n  min-width: 32px;\n}\n.spwidgets-DateTimeField-clearIcon {\n  right: 0;\n}\n.spwidgets-DateTimeField--noLabel .ms-Label {\n  display: none;\n}\n.spwidgets-DateTimeField--noDescription .ms-TextField-description {\n  display: none;\n}\n.spwidgets-DateTimeField--inlinePicker .spwidgets-DateTimeField-calIcon {\n  display: none;\n}\n", "" ]);
    }, /* 93 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Map;
        });
        /* unused harmony export FakeMap */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__getGlobal__ = __webpack_require__(36);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__Iterator__ = __webpack_require__(37);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__runtime_aliases__ = __webpack_require__(22);
        //======================================================
        var Map = Object(__WEBPACK_IMPORTED_MODULE_0__getGlobal__.a)().Map || FakeMap;
        function FakeMap() {}
        Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.c)(FakeMap.prototype, {
            constructor: {
                value: FakeMap,
                configurable: true
            },
            _: {
                get: function() {
                    Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.d)(this, "_", {
                        value: {
                            keys: [],
                            values: []
                        }
                    });
                    return this._;
                }
            },
            set: {
                value: function(key, _value) {
                    if (-1 === Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.a)(this._.keys, key)) {
                        this._.keys.push(key);
                        this._.values.push(_value);
                    }
                    return this;
                }
            },
            has: {
                value: function(key) {
                    return -1 !== Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.a)(this._.keys, key);
                }
            },
            size: {
                get: function() {
                    return this._.keys.length;
                }
            },
            clear: {
                value: function() {
                    Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.b)(this._.keys, 0);
                    Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.b)(this._.values, 0);
                }
            },
            delete: {
                value: function(key) {
                    var idx = Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.a)(this._.keys, key);
                    if (-1 !== idx) {
                        Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.b)(this._.keys, idx, 1);
                        Object(__WEBPACK_IMPORTED_MODULE_2__runtime_aliases__.b)(this._.values, idx, 1);
                        return true;
                    }
                    return false;
                }
            },
            keys: {
                value: function() {
                    return new __WEBPACK_IMPORTED_MODULE_1__Iterator__.a(this._.keys);
                }
            },
            values: {
                value: function() {
                    return new __WEBPACK_IMPORTED_MODULE_1__Iterator__.a(this._.values);
                }
            },
            entries: {
                value: function() {
                    return new __WEBPACK_IMPORTED_MODULE_1__Iterator__.a(this._.keys, this._.values);
                }
            },
            forEach: {
                value: function(cb) {
                    var _this = this;
                    this._.keys.forEach(function(item, i) {
                        return cb(_this._.values[i], item, _this);
                    });
                }
            }
        });
    }, /* 94 */
    /***/
    function(module, exports) {
        module.exports = '<li class="ms-ListItem spwidgets-ListItem spwidgets-ListItem-simple">\r\n    <span class="ms-ListItem-primaryText" title="{{_ui.primary}}">{{_ui.primary}}</span>\r\n    <div class="ms-ListItem-selectionTarget js-toggleSelection"></div>\r\n</li>';
    }, /* 95 */
    /***/
    function(module, exports, __webpack_require__) {
        var content = __webpack_require__(96);
        "string" === typeof content && (content = [ [ module.i, content, "" ] ]);
        var options = {
            hmr: true
        };
        options.transform = void 0;
        options.insertInto = void 0;
        __webpack_require__(6)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 96 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)();
        // imports
        // module
        exports.push([ module.i, ".spwidgets-ListItem-simple .ms-ListItem-primaryText {\n  padding-right: 0;\n}\n.spwidgets-ListItem--hover {\n  background-color: #eaeaea;\n  cursor: pointer;\n  outline: 1px solid transparent;\n}\n.spwidgets-ListItem.is-selected .ms-ListItem-primaryText {\n  color: #0078d7;\n}\n", "" ]);
    }, /* 97 */
    /***/
    function(module, exports) {
        module.exports = '<ul class="spwidgets-List ms-List ms-font-m"></ul>';
    }, /* 98 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_es6_Map__ = __webpack_require__(46);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_jsutils_es6_promise__ = __webpack_require__(13);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddEventListener__ = __webpack_require__(10);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domAddClass__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10_common_micro_libs_src_domutils_domPosition__ = __webpack_require__(48);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_11_common_micro_libs_src_domutils_DomKeyboardInteraction__ = __webpack_require__(49);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_12__SelectedItem_SelectedItem__ = __webpack_require__(100);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_13__List_List__ = __webpack_require__(45);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_14__spapi_getListItems__ = __webpack_require__(23);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_15__sputils_getCamlLogical__ = __webpack_require__(32);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_16__sputils_xmlEscape__ = __webpack_require__(31);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_17__LookupField_html__ = __webpack_require__(104);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_17__LookupField_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__LookupField_html__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_18__LookupField_less__ = __webpack_require__(105);
        /* harmony import */
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__LookupField_less__);
        //---------------------------------------------------------------------
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create(), DOCUMENT = document, BODY = DOCUMENT.body, isArray = Array.isArray, /**
 * A Lookup field. Supports either Single lookup or Multi Lookup
 * fields.
 *
 * @class LookupField
 *
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} options
 *
 * @param {ListColumnModel} options.column
 *  The list column model for the LookupField.
 *  This column definition (if not of type `ListColumnModel`) should have
 *  an attribute called `List` with the Name or UUID of the list.
 *
 * @param {Array} [options.fields=[options.column.ShowField]]
 *  List of column fields from the lookup list to be retrieved. Defaults to
 *  the column `ShowField` value or the `Title` column. Note that if
 *  `options.queryOptions` (below) defines a `CAMLViewFields`, then that
 *  will take precedence and the value in the options will not be used.
 *
 * @param {Array<Object|ListItemModel>|Object|ListItemModel} [options.selected]
 *  The list of lookup items to be pre-selected when widget is initialized. Value
 *  will be given to the `setSelected()` method, thus accepts any input by that
 *  method.
 *
 * @param {Array<String>} [options.searchColumns=[options.column.ShowField]
 *  A list of column internal names that will be used to search against
 *  when use types in a value in the input box. Defaults to the column
 *  definition `ShowField` setting.
 *
 * @param {Widget} [options.ListWidget=List]
 *  The List widget to use for displaying the items.
 *
 * @param {Widget} [options.SelectedItemWidget=SelectedItem]
 *  The widget to use for Selected items. Events from this widget will be piped
 *  to the `LookupField`.
 *
 * @param {Boolean} [options.allowMultiples]
 *  Allow multiple values to be selected. If set, value will override
 *  whatever is defined in the `Type` property of `options.column`
 *
 * @param {Number} [options.choicesZIndex=5]
 *  The CSS `zIndex` of the choices popup.
 *
 * @param {Object} [options.queryOptions={}]
 *  Additional options to be used in querying the lookup list. With the
 *  exception of `listName`, all other options supported by
 *  `getListItems` can be defined.
 *
 * @fires LookupField#item:selected
 * @fires LookupField#item:unselected
 * @fires LookupField#change
 */
        LookupField = /** @lends LookupField.prototype */ {
            init: function(options) {
                var _this = this;
                var inst = {
                    opt: Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options),
                    showChoicesListener: null,
                    list: "",
                    webURL: "",
                    fields: "",
                    listWdg: null,
                    selected: new __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_es6_Map__.a(),
                    // Keeps ListItemRow->Widget associations
                    allowMultiples: false,
                    currentData: null,
                    // Rows[] Array
                    onReady: null
                }, opt = inst.opt;
                PRIVATE.set(this, inst);
                opt._selectedCountUI = Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__.a)(opt.labels.selectedCount, {
                    count: '<span class="spwidgets-LookupField-selectedCount-number"></span>'
                });
                isArray(opt.searchColumns) || (opt.searchColumns = [ opt.column.ShowField || "Title" ]);
                // if we have a Column Model, the get the webURL from the List model
                opt.column && opt.column.getList && (inst.webURL = opt.column.getList().getWebURL());
                var $ui = this.$ui = Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__.a)(Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__.a)(__WEBPACK_IMPORTED_MODULE_17__LookupField_html___default.a, opt)).firstChild, BASE_SELECTOR = ".spwidgets-LookupField", uiFind = $ui.querySelector.bind($ui), $input = inst.$input = uiFind(BASE_SELECTOR + "-input > input"), on = this.on.bind(this);
                inst.$inputHolder = uiFind(BASE_SELECTOR + "-input");
                inst.$selectedHolder = uiFind(BASE_SELECTOR + "-selected");
                inst.$choicesHolder = uiFind(BASE_SELECTOR + "-input-choices");
                inst.$count = uiFind(BASE_SELECTOR + "-selectedCount-number");
                opt.hideLabel && Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domAddClass__.a)($ui, "spwidgets-LookupField--noLabel");
                opt.hideDescription && Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domAddClass__.a)($ui, "spwidgets-LookupField--noDescription");
                opt.choicesZIndex && (inst.$choicesHolder.style.zIndex = opt.choicesZIndex);
                // Determine if multiple selections are allowed
                "boolean" === typeof opt.allowMultiples ? inst.allowMultiples = opt.allowMultiples : opt.column && opt.column.Type && (inst.allowMultiples = "LookupMulti" === opt.column.Type);
                // Get the list name to be used in the lookup
                "Self" === opt.column.List ? inst.list = opt.column.getList().Name : inst.list = opt.column.List;
                setSelectedCount.call(this);
                // Define the Query Fields
                isArray(opt.fields) || (opt.fields = [ opt.column.ShowField || "Title" ]);
                inst.fields = "<ViewFields>" + opt.fields.reduce(function(camlFields, fieldName) {
                    camlFields += '<FieldRef Name="' + fieldName + '"/>';
                    return camlFields;
                }, "") + "</ViewFields>";
                // Add keyboard interaction to the CHoices from the input field
                // Setup keyboard interaction between input field and list of choices
                inst.keyboardInteraction = __WEBPACK_IMPORTED_MODULE_11_common_micro_libs_src_domutils_DomKeyboardInteraction__.a.create({
                    input: $input,
                    eleGroup: inst.$choicesHolder,
                    focusClass: "spwidgets-ListItem--hover",
                    eleSelector: ".ms-ListItem"
                });
                //---------------------------------
                //   setup events
                //---------------------------------
                Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddEventListener__.a)(uiFind(BASE_SELECTOR + "-items-clear"), "click", function(ev) {
                    ev.stopPropagation();
                    clearAllSelected.call(this);
                }.bind(this));
                // When clicking on any part of the -items section, focus on input field
                Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddEventListener__.a)(uiFind(BASE_SELECTOR + "-items"), "click", function(ev) {
                    ev.target !== $input && $input.focus();
                });
                // Typing in the input field, searches the list
                var currentRetrieval, lastSearchString = "";
                Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddEventListener__.a)($input, "keyup", function(ev) {
                    var thisSearchString = String(ev.target.value).trim();
                    // If search string is the same as the last one, exit.
                    // no need to pull results
                    if (thisSearchString === lastSearchString) return;
                    lastSearchString = thisSearchString;
                    currentRetrieval && clearTimeout(currentRetrieval);
                    var thisIteration = setTimeout(function() {
                        if (thisIteration !== currentRetrieval) return;
                        retrieveListData.call(this, thisSearchString).then(addItemsToChoices.bind(this)).catch(function(e) {
                            console.log(e);
                        });
                    }.bind(this), 300);
                    currentRetrieval = thisIteration;
                }.bind(this));
                Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddEventListener__.a)($input, "focus", function() {
                    this.showChoices();
                }.bind(this));
                // User removes an item from the selected list
                on("selected:remove", function(itemData) {
                    removeItemFromSelected.call(this, itemData);
                    inst.listWdg && inst.listWdg.unselectItem(itemData);
                }.bind(this));
                // Load first page of data and add it to the list of selectable items.
                inst.onReady = retrieveListData.call(this).then(function(rows) {
                    addItemsToChoices.call(this, rows);
                }.bind(this));
                opt.selected && inst.onReady.then(function() {
                    _this.setSelected(opt.selected);
                });
                this.onDestroy(function() {
                    clearAllSelected.call(this);
                    // Destroy all Compose object
                    Object.keys(inst).forEach(function(prop) {
                        if (inst[prop]) {
                            // Widgets
                            inst[prop].destroy ? inst[prop].destroy() : inst[prop].remove ? inst[prop].remove() : inst[prop].off && inst[prop].off();
                            inst[prop] = void 0;
                        }
                    });
                    PRIVATE.delete(this);
                }.bind(this));
            },
            /**
     * Returns a promise that resolves when widget is ready (initialization done)
     *
     * @return {Promise}
     */
            onReady: function() {
                return PRIVATE.get(this).onReady;
            },
            /**
     * Shows the list of possible items that can be selected.
     */
            showChoices: function() {
                var me = this, inst = PRIVATE.get(me), $choices = inst.$choicesHolder, $inputHldr = inst.$inputHolder;
                BODY.appendChild($choices);
                Object(__WEBPACK_IMPORTED_MODULE_10_common_micro_libs_src_domutils_domPosition__.a)($choices, $inputHldr);
                $choices.style.width = $inputHldr.clientWidth + "px";
                $choices.style.display = "block";
                inst.showChoicesListener || setTimeout(function() {
                    inst.showChoicesListener = Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddEventListener__.a)(DOCUMENT, "click", function(ev) {
                        ev.target === inst.$input || inst.$choicesHolder.contains(ev.target) || me.hideChoices();
                    });
                }, 20);
            },
            /**
     * Hides the list of possible items.
     */
            hideChoices: function() {
                var inst = PRIVATE.get(this), $choices = inst.$choicesHolder;
                $choices.style.display = "none";
                $choices.parentNode && $choices.parentNode.removeChild($choices);
                if (inst.showChoicesListener) {
                    inst.showChoicesListener.remove();
                    inst.showChoicesListener = null;
                }
            },
            /**
     * returns an array with the selected items. The item
     * definition (ex. `ListItemModel`) is returned in the array.
     *
     * @return {Array<Object|ListItemModel>}
     */
            getSelected: function() {
                var selectedItem, selectedKeys = PRIVATE.get(this).selected.values(), response = [];
                for (;!(selectedItem = selectedKeys.next()).done; ) response.push(selectedItem.value.getValue());
                return response;
            },
            /**
     * Sets items as selected on the lookup widget.
     *
     * @param {Array<Object|ListItemModel>|Object|ListItemModel} items
     *  The items to show selected. Each item must have at least the `ID` defined if
     *  not a `ListItemModel`.
     *
     * @return {Promise}
     */
            setSelected: function(items) {
                var me = this, inst = PRIVATE.get(this);
                isArray(items) || (items = [ items ]);
                !inst.allowMultiples && items.length > 1 && (items = [ items.pop() ]);
                return __WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_jsutils_es6_promise__.a.resolve().then(function() {
                    var queryOptions, loadDataIDs = [], itemsData = items.map(function(item) {
                        var itemData = getItemDataById.call(me, item.ID) || getSelectedItemById.call(me, item.ID);
                        // It itemData is already stored within this widget,
                        // then use that, but only if item is not yet selected
                        if (itemData) {
                            if (isItemSelected.call(me, itemData)) return;
                            return itemData;
                        }
                        loadDataIDs.push(item.ID);
                        return null;
                    }).filter(function(item) {
                        return !!item;
                    });
                    if (loadDataIDs.length) {
                        queryOptions = getQueryOptions.call(me);
                        queryOptions.CAMLQuery = "<Query><Where>" + Object(__WEBPACK_IMPORTED_MODULE_15__sputils_getCamlLogical__.a)({
                            type: "OR",
                            values: loadDataIDs.map(function(id) {
                                return '<Eq><FieldRef Name="ID"/><Value Type="Counter">' + id + "</Value></Eq>";
                            })
                        }) + "</Where></Query>";
                        return Object(__WEBPACK_IMPORTED_MODULE_14__spapi_getListItems__.a)(queryOptions).then(function(rows) {
                            return rows.concat(itemsData);
                        });
                    }
                    return itemsData;
                }).then(function(rows) {
                    rows.forEach(function(itemData) {
                        showItemAsSelected.call(me, itemData);
                        inst.listWdg && inst.listWdg.selectItem(itemData);
                    });
                    return rows;
                });
            }
        };
        function retrieveListData(query) {
            var me = this;
            var inst = PRIVATE.get(me);
            var queryOptions = getQueryOptions.call(me);
            var showField = inst.opt.column.ShowField;
            var queryCaml = "";
            query && (queryCaml += "<Where>" + Object(__WEBPACK_IMPORTED_MODULE_15__sputils_getCamlLogical__.a)({
                type: "OR",
                values: inst.opt.searchColumns.map(function(colName) {
                    return '<Contains><FieldRef Name="' + colName + '"/><Value Type="Text">' + __WEBPACK_IMPORTED_MODULE_16__sputils_xmlEscape__.a.escape(query) + "</Value></Contains>";
                })
            }) + "</Where>");
            // Sort by `ShowField`
            showField && (queryCaml += '<OrderBy><FieldRef Name="' + showField + '" Ascending="True" /></OrderBy>');
            queryCaml && (queryOptions.CAMLQuery = "<Query>" + queryCaml + "</Query>");
            return Object(__WEBPACK_IMPORTED_MODULE_14__spapi_getListItems__.a)(queryOptions);
        }
        function getQueryOptions() {
            var inst = PRIVATE.get(this), queryOptions = Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({
                webURL: inst.webURL
            }, inst.opt.queryOptions, {
                listName: inst.list
            });
            queryOptions.CAMLViewFields || (queryOptions.CAMLViewFields = inst.fields);
            return queryOptions;
        }
        function addItemsToChoices(rows) {
            var listWdg, inst = PRIVATE.get(this);
            if (inst.listWdg) {
                inst.listWdg.destroy();
                inst.listWdg = null;
            }
            // If there are items selected, then loop through the new set
            // of rows and if any are selected, use the data object from the
            // selection instead
            rows = rows.map(function(row) {
                return getSelectedItemById.call(this, row.ID) || row;
            }.bind(this));
            inst.currentData = rows;
            listWdg = inst.listWdg = inst.opt.ListWidget.create({
                items: rows
            });
            rows.forEach(function(row) {
                isItemSelected.call(this, row) && listWdg.selectItem(row);
            }.bind(this));
            listWdg.on("item:selected", function(itemData) {
                showItemAsSelected.call(this, itemData);
            }.bind(this));
            listWdg.on("item:unselected", removeItemFromSelected.bind(this));
            listWdg.appendTo(inst.$choicesHolder);
        }
        function isItemSelected(itemData) {
            return PRIVATE.get(this).selected.has(itemData);
        }
        function getSelectedItemById(id) {
            if (!id) return;
            var selectedItem, selectedKeys = PRIVATE.get(this).selected.keys(), response = null;
            for (;!response && !(selectedItem = selectedKeys.next()).done; ) selectedItem.value.ID === id && (response = selectedItem.value);
            return response;
        }
        function getItemDataById(id) {
            var response, data = PRIVATE.get(this).currentData;
            data && id && data.some(function(itemData) {
                if (itemData.ID === id) {
                    response = itemData;
                    return true;
                }
            });
            return response;
        }
        function showItemAsSelected(itemData) {
            var itemWdg, inst = PRIVATE.get(this), selected = inst.selected;
            // If itemData is already selected, exit
            if (selected.has(itemData)) return;
            inst.allowMultiples || clearAllSelected.call(this);
            itemWdg = inst.opt.SelectedItemWidget.create({
                item: itemData
            });
            // Pipe events of the Selected Widget to LookupField prefixed with `selected:`
            itemWdg.pipe(this, "selected:");
            itemWdg.appendTo(inst.$selectedHolder);
            itemWdg.onDestroy(function() {
                selected.has(itemData) && selected.delete(itemData);
            });
            selected.set(itemData, itemWdg);
            setSelectedCount.call(this);
            /**
     * An item was added to the list of selected items.
     * The selected item's data is provided to event callbacks
     *
     * @event LookupField#item:selected
     *
     * @type {Object}
     */
            this.emit("item:selected", itemData);
            /**
     * Items selection has changed
     *
     * @event LookupField#change
     */
            this.emit("change");
        }
        function removeItemFromSelected(itemData) {
            var selected = PRIVATE.get(this).selected;
            if (selected.has(itemData)) {
                selected.get(itemData).destroy();
                selected.delete(itemData);
            }
            setSelectedCount.call(this);
            /**
     * An item was added to the list of selected items.
     * The selected item's data is provided to event callbacks
     *
     * @event LookupField#item:unselected
     *
     * @type {Object}
     */
            this.emit("item:unselected", itemData);
            this.emit("change");
        }
        function clearAllSelected() {
            var selected = PRIVATE.get(this).selected;
            selected.forEach(function(selectedWdg) {
                if (selectedWdg) {
                    selectedWdg.remove();
                    selectedWdg.destroy();
                }
            });
            selected.clear();
        }
        function setSelectedCount() {
            var inst = PRIVATE.get(this), $count = inst.$count;
            $count && ($count.textContent = inst.selected.size);
        }
        LookupField = __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__.a.extend(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__.a, LookupField);
        LookupField.defaults = {
            column: null,
            fields: null,
            selected: null,
            // Any format accepted by setSelected
            hideLabel: false,
            hideDescription: false,
            queryOptions: {
                CAMLRowLimit: 100
            },
            allowMultiples: null,
            // Only looked at when its set to a boolean
            searchColumns: null,
            choicesZIndex: 0,
            // Default to 5 via css file
            ListWidget: __WEBPACK_IMPORTED_MODULE_13__List_List__.a,
            SelectedItemWidget: __WEBPACK_IMPORTED_MODULE_12__SelectedItem_SelectedItem__.a,
            labels: {
                placeholder: "Choose...",
                selectedCount: "{{count}} Selected",
                clear: "Clear"
            }
        };
        /* harmony default export */
        __webpack_exports__.a = LookupField;
    }, /* 99 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export scrollEleIntoView */
        /**
 * Given an element that is inside of a Scrolling Element
 * (one that has a fixed height with overflow), this utility
 * will manipulate the Scrolling element's `scrollTop` so that
 * the Element is made visible in the area provided by the
 * Scrolling Element.
 *
 * @function scrollEleIntoView
 *
 * @param {HTMLElement} ele
 * @param {HTMLElement} scrollingParent
 */
        function scrollEleIntoView(ele, scrollingParent) {
            if (!ele || !scrollingParent || !scrollingParent.contains(ele)) return;
            var parentScrollTop = scrollingParent.scrollTop, parentHeight = scrollingParent.clientHeight, eleHeight = ele.clientHeight, parentClientRect = scrollingParent.getBoundingClientRect(), eleClientRect = ele.getBoundingClientRect();
            eleClientRect.top < parentClientRect.top ? scrollingParent.scrollTop = parentScrollTop + eleClientRect.top - parentClientRect.top : eleClientRect.bottom > parentClientRect.bottom && (scrollingParent.scrollTop = parentScrollTop + eleClientRect.top - parentClientRect.top - parentHeight + eleHeight);
        }
        /* harmony default export */
        __webpack_exports__.a = scrollEleIntoView;
    }, /* 100 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__ = __webpack_require__(7);
        /* harmony import */
        __webpack_require__(41);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__ = __webpack_require__(10);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8__SelectedItem_html__ = __webpack_require__(101);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8__SelectedItem_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__SelectedItem_html__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9__SelectedItem_less__ = __webpack_require__(102);
        /* harmony import */
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__SelectedItem_less__);
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create(), /**
 * Displays a selected item from the LookupField list of choices.
 *
 * @class SelectedItem
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} options
 *
 * @fires SelectedItem#remove
 */
        SelectedItem = /** @lends SelectedItem.prototype */ {
            init: function(options) {
                var inst = {
                    opt: Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options)
                };
                PRIVATE.set(this, inst);
                this.$ui = Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__.a)(Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__.a)(this.getTemplate(), inst.opt)).firstChild;
                inst.$removeBtn = this.$ui.querySelector(".spwidgets-LookupField-SelectedItem-remove");
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__.a)(inst.$removeBtn, "click", function(ev) {
                    ev.stopPropagation();
                    /**
             * User clicked on the Remove button. The `item` object provided on input
             * will be given to listeners of this event.
             *
             * @event SelectedItem#remove
             * @type {Object}
             */
                    this.emit("remove", inst.opt.item);
                }.bind(this));
                this.onDestroy(function() {
                    PRIVATE.delete(this);
                }.bind(this));
            },
            /**
     * Returns the template for the widget.
     *
     * @return {String}
     */
            getTemplate: function() {
                return __WEBPACK_IMPORTED_MODULE_8__SelectedItem_html___default.a;
            },
            /**
     * Same as user clicking the remove button of the selected item
     */
            remove: function() {
                PRIVATE.get(this).$removeBtn.click();
            },
            /**
     * Returns the value for this selected item (default is the item passed on input)
     *
     * @return {Object}
     */
            getValue: function() {
                return PRIVATE.get(this).opt.item;
            }
        };
        SelectedItem = __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__.a.extend(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__.a, SelectedItem);
        SelectedItem.defaults = {
            item: null
        };
        /* harmony default export */
        __webpack_exports__.a = SelectedItem;
    }, /* 101 */
    /***/
    function(module, exports) {
        module.exports = '<div class="spwidgets-LookupField-SelectedItem ms-font-m">\r\n    <div class="spwidgets-LookupField-SelectedItem-info ms-font-l">\r\n        <span>{{item.Title}}</span>\r\n    </div>\r\n    <button type="button" class="ms-Button ms-Button--command spwidgets-LookupField-SelectedItem-remove">\r\n        <span class="ms-Button-icon">\r\n            <i class="ms-Icon ms-Icon--ChromeClose"></i>\r\n        </span>\r\n    </button>\r\n</div>';
    }, /* 102 */
    /***/
    function(module, exports, __webpack_require__) {
        var content = __webpack_require__(103);
        "string" === typeof content && (content = [ [ module.i, content, "" ] ]);
        var options = {
            hmr: true
        };
        options.transform = void 0;
        options.insertInto = void 0;
        __webpack_require__(6)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 103 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)();
        // imports
        // module
        exports.push([ module.i, ".spwidgets-LookupField-SelectedItem {\n  position: relative;\n  margin: 4px;\n  padding: 0;\n  border: 1px solid transparent;\n}\n.spwidgets-LookupField-SelectedItem:hover {\n  border-color: #C8C8C8;\n}\n.spwidgets-LookupField-SelectedItem-info {\n  padding-right: 34px;\n  padding-left: 0.5em;\n  background-color: #f4f4f4;\n  min-height: 32px;\n  line-height: 32px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.spwidgets-LookupField-SelectedItem-remove {\n  position: absolute;\n  height: 100%;\n  top: 0;\n  right: 0;\n  min-width: 0;\n}\n.spwidgets-LookupField-SelectedItem-remove .ms-Button-icon {\n  display: inline-block;\n}\n.spwidgets-LookupField-SelectedItem-remove:hover {\n  background-color: #eaeaea;\n  color: #333;\n}\n", "" ]);
    }, /* 104 */
    /***/
    function(module, exports) {
        module.exports = '<div class="spwidgets-LookupField ms-font-m">\r\n    <div class="ms-TextField">\r\n        <label class="ms-Label spwidgets-LookupField-label">{{column.DisplayName}}</label>\r\n        <div class="spwidgets-LookupField-items">\r\n            <div class="spwidgets-LookupField-input">\r\n                <a class="spwidgets-LookupField-items-clear ms-Button">{{labels.clear}}</a>\r\n                <span class="spwidgets-LookupField-items-count">{{_selectedCountUI}}</span>\r\n                <input type="text" placeholder="{{labels.placeholder}}"/>\r\n                <div class="spwidgets-LookupField-input-choices ms-u-slideDownIn20"></div>\r\n            </div>\r\n            <div class="spwidgets-LookupField-selected"></div>\r\n        </div>\r\n        <div class="spwidgets-LookupField-description">{{column.Description}}</div>\r\n    </div>\r\n</div>';
    }, /* 105 */
    /***/
    function(module, exports, __webpack_require__) {
        var content = __webpack_require__(106);
        "string" === typeof content && (content = [ [ module.i, content, "" ] ]);
        var options = {
            hmr: true
        };
        options.transform = void 0;
        options.insertInto = void 0;
        __webpack_require__(6)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 106 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)();
        // imports
        // module
        exports.push([ module.i, ".spwidgets-LookupField {\n  background-color: white;\n}\n.spwidgets-LookupField-items {\n  border: 1px solid #c8c8c8;\n  position: relative;\n  box-sizing: border-box;\n}\n.spwidgets-LookupField-items:hover {\n  border-color: #767676;\n}\n.spwidgets-LookupField-items-count {\n  display: inline-block;\n  vertical-align: middle;\n  padding: 0 1em;\n  font-style: italic;\n}\n.spwidgets-LookupField-items-clear {\n  vertical-align: middle;\n  display: inline-block;\n  cursor: pointer;\n}\n.spwidgets-LookupField-selected {\n  max-height: 15em;\n  overflow-y: auto;\n}\n.spwidgets-LookupField-selected::-webkit-scrollbar {\n  width: 0.5em;\n  background-color: #F5F5F5;\n}\n.spwidgets-LookupField-selected::-webkit-scrollbar-thumb {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  background-color: #555;\n}\n.spwidgets-LookupField-input {\n  position: relative;\n  box-sizing: border-box;\n}\n.spwidgets-LookupField-input > input {\n  box-sizing: border-box;\n  display: inline-block;\n  border: 0;\n  height: 38px;\n  outline: none;\n  padding-left: 8px;\n}\n.spwidgets-LookupField-input-choices {\n  box-sizing: border-box;\n  display: none;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  min-height: 2em;\n  border: 1px solid #ababab;\n  border-top: none;\n  padding: 0.5em 1em;\n  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);\n  background-color: white;\n  z-index: 5;\n  max-width: 100%;\n  max-height: 20em;\n  overflow-y: auto;\n}\n.spwidgets-LookupField-input-choices::-webkit-scrollbar {\n  width: 0.5em;\n  background-color: #F5F5F5;\n}\n.spwidgets-LookupField-input-choices::-webkit-scrollbar-thumb {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  background-color: #555;\n}\n.spwidgets-LookupField--noLabel .spwidgets-LookupField-label {\n  display: none;\n}\n.spwidgets-LookupField--noDescription .spwidgets-LookupField-description {\n  display: none;\n}\n.spwidgets-LookupField--displayInline .spwidgets-LookupField-selected,\n.spwidgets-LookupField--displayInline .spwidgets-LookupField-selected > *,\n.spwidgets-LookupField--displayInline .spwidgets-LookupField-input {\n  display: inline-block;\n}\n.spwidgets-LookupField--displayInline .spwidgets-LookupField-selected {\n  max-height: none;\n}\n.spwidgets-LookupField--displayInline .spwidgets-LookupField-input-choices {\n  max-width: 450px;\n}\n", "" ]);
    }, /* 107 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_parseHTML__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_domutils_domRemoveClass__ = __webpack_require__(11);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domAddClass__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domToggleClass__ = __webpack_require__(26);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddEventListener__ = __webpack_require__(10);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9__Message_html__ = __webpack_require__(108);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9__Message_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__Message_html__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10__Message_less__ = __webpack_require__(109);
        /* harmony import */
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__Message_less__);
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_dataStore__.a.create();
        var CSS_CLASS_MS_ICON_INFO = "ms-Icon--Info";
        var CSS_CLASS_MS_ICON_ALERT = "ms-Icon--Warning";
        var CSS_CLASS_MS_ICON_ERROR = "ms-Icon--ErrorBadge";
        var CSS_CLASS_MS_ICON_SUCCESS = "ms-Icon--Completed";
        /**
 * Show a message to the user in a variety of types.
 *
 * @class Message
 * @extends Widget
 *
 * @param {Object} options
 *
 * @param {String} options.message
 *
 * @param {String} [options.extendedMessage=""]
 *  The extended message. This is initially hidden, but user will see a
 *  "..." on the screen. Clicking on it will show the extended message.
 *
 * @param {String} [options.type="info"]
 *  Type of message. valid values: `info`, `error`, `alert`, `success`
 *
 * @param {String} [options.iconClass]
 *  A css class to be applied to the icon element. If defined,
 *  the icon associated with `options.type` will be ignored.
 *
 */
        var Message = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__.a.extend(/** @lends Message.prototype */ {
            init: function(options) {
                var _this = this;
                if (PRIVATE.has(this)) return;
                var opt = Object(__WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options);
                var inst = {
                    opt: opt,
                    iconClass: opt.iconClass,
                    $icon: null
                };
                PRIVATE.set(this, inst);
                opt.type = opt.type.toLowerCase();
                inst.iconClass || (inst.iconClass = getIconForMsgType(opt.type));
                var $ui = this.$ui = Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_parseHTML__.a)(Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_fillTemplate__.a)(__WEBPACK_IMPORTED_MODULE_9__Message_html___default.a, inst)).firstChild;
                inst.$icon = $ui.querySelector(".ms-Icon");
                inst.moreEv = Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddEventListener__.a)($ui.querySelector(".spwidgets-message-msg-showMore"), "click", function() {
                    Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domToggleClass__.a)($ui, "spwidgets-message--showMore");
                });
                this.setType(opt.type);
                this.setExtendedMessage(opt.extendedMessage);
                this.onDestroy(function() {
                    // Destroy all Compose object
                    Object.keys(inst).forEach(function(prop) {
                        if (inst[prop]) {
                            [ "destroy", // Compose
                            "remove", // DOM Events Listeners
                            "off" ].some(function(method) {
                                if (inst[prop][method]) {
                                    inst[prop][method]();
                                    return true;
                                }
                            });
                            inst[prop] = void 0;
                        }
                    });
                    PRIVATE.delete(_this);
                });
            },
            /**
     * Sets the message
     *
     * @param {String} message
     */
            setMessage: function(message) {
                this.getEle().querySelector(".spwidgets-message-msg").textContent = message;
            },
            /**
     * Sets the "more..." data of the message.
     *
     * @param {String} message
     */
            setExtendedMessage: function(message) {
                var $ele = this.getEle();
                $ele.querySelector(".spwidgets-message-msg-more").textContent = message;
                message ? Object(__WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domAddClass__.a)($ele, "spwidgets-message--hasMore") : Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_domutils_domRemoveClass__.a)($ele, "spwidgets-message--hasMore");
            },
            /**
     * Changes the type of message to display
     *
     * @param {String} type
     *  Valid values: `info`, `error`, `alert`, `success`
     */
            setType: function(type) {
                if (type) {
                    type = type.toLowerCase();
                    var $ele = this.getEle();
                    var inst = PRIVATE.get(this);
                    var opt = inst.opt, $icon = inst.$icon, iconClass = inst.iconClass;
                    Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_domutils_domRemoveClass__.a)($ele, "ms-bgColor-" + opt.type);
                    Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_domutils_domRemoveClass__.a)($ele, "ms-fontColor-" + opt.type);
                    Object(__WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domAddClass__.a)($ele, "ms-bgColor-" + type);
                    Object(__WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domAddClass__.a)($ele, "ms-fontColor-" + type);
                    // If user did not define a custom icon, then also change the
                    // message icon.
                    if (!opt.iconClass) {
                        Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_domutils_domRemoveClass__.a)($icon, iconClass);
                        iconClass = inst.iconClass = getIconForMsgType(type);
                        Object(__WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domAddClass__.a)($icon, iconClass);
                    }
                    opt.type = type;
                }
            }
        });
        function getIconForMsgType(type) {
            switch (type.toLowerCase()) {
              case "error":
                return CSS_CLASS_MS_ICON_ERROR;

              case "alert":
                return CSS_CLASS_MS_ICON_ALERT;

              case "success":
                return CSS_CLASS_MS_ICON_SUCCESS;

              default:
                return CSS_CLASS_MS_ICON_INFO;
            }
        }
        Message.defaults = {
            message: "",
            extendedMessage: "",
            type: "info",
            iconClass: "",
            more: "++"
        };
        /* harmony default export */
        __webpack_exports__.a = Message;
    }, /* 108 */
    /***/
    function(module, exports) {
        module.exports = '<div class="spwidgets-message">\r\n    <span class="spwidgets-message-iconHolder">\r\n        <i class="ms-Icon {{iconClass}}"></i>\r\n    </span>\r\n    <div class="spwidgets-message-msgHolder">\r\n        <div class="spwidgets-message-msgHolder-msg">\r\n            <span class="spwidgets-message-msg">{{opt.message}}</span>\r\n            <a class="spwidgets-message-msg-showMore">{{opt.more}}</a>\r\n        </div>\r\n        <div class="spwidgets-message-msg-more"></div>\r\n    </div>\r\n</div>';
    }, /* 109 */
    /***/
    function(module, exports, __webpack_require__) {
        var content = __webpack_require__(110);
        "string" === typeof content && (content = [ [ module.i, content, "" ] ]);
        var options = {
            hmr: true
        };
        options.transform = void 0;
        options.insertInto = void 0;
        __webpack_require__(6)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 110 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)();
        // imports
        // module
        exports.push([ module.i, ".spwidgets-message {\n  position: relative;\n  padding: 0.5em;\n}\n.spwidgets-message-iconHolder {\n  display: block;\n  position: absolute;\n  font-size: 1.5em;\n  line-height: 1em;\n}\n.spwidgets-message-msgHolder {\n  padding-left: 2em;\n  min-height: 2em;\n}\n.spwidgets-message-msgHolder-msg > * {\n  display: inline;\n}\n.spwidgets-message-msg-showMore {\n  display: none;\n  cursor: pointer;\n}\n.spwidgets-message-msg-more {\n  display: none;\n  white-space: pre-wrap;\n}\n.spwidgets-message--hasMore .spwidgets-message-msg-showMore {\n  display: inline;\n}\n.spwidgets-message--showMore .spwidgets-message-msg-more {\n  display: block;\n}\n", "" ]);
    }, /* 111 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_parseHTML__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_es6_promise__ = __webpack_require__(13);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__ = __webpack_require__(10);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddClass__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domRemoveClass__ = __webpack_require__(11);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_10_common_micro_libs_src_domutils_domClosest__ = __webpack_require__(21);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_11_common_micro_libs_src_domutils_domTriggerEvent__ = __webpack_require__(50);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_12_common_micro_libs_src_domutils_domPosition__ = __webpack_require__(48);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_13_common_micro_libs_src_domutils_domSetStyle__ = __webpack_require__(112);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_14_common_micro_libs_src_domutils_DomKeyboardInteraction__ = __webpack_require__(49);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_15__spapi_searchPrincipals__ = __webpack_require__(43);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_16__sputils_parsePeopleField__ = __webpack_require__(113);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_17__PeoplePickerUserProfileModel__ = __webpack_require__(114);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_18__ResultGroup_ResultGroup__ = __webpack_require__(115);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_19__PeoplePickerPersona_PeoplePickerPersona__ = __webpack_require__(124);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_20__PeoplePicker_html__ = __webpack_require__(128);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_20__PeoplePicker_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20__PeoplePicker_html__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_21__PeoplePicker_less__ = __webpack_require__(129);
        /* harmony import */
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21__PeoplePicker_less__);
        //-----------------------------------------------------------------------------------------
        // FIXME: support for 'Suggested' grouping
        // FIXME: Support hidding input area when allowMultiples is false and a value is selected
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create();
        var BODY = document.body;
        var CURRENT_USER_ID = "<UserID/>";
        var SELECTOR_BASE = ".spwidgets-PeoplePicker";
        /**
 * SharePoint People Picker widget.
 *
 * @class PeoplePicker
 *
 * @extends EventEmitter
 * @extends Widget
 *
 * @param {Object} [options]
 *
 * @param {Array|Array<Object>|String} [options.selected=""]
 *  The selected people.
 *
 * @param {Boolean} [options.allowMultiples=true]
 *  Determine whether multiple users can be selected.
 *
 * @param {String} [options.webURL=currentSiteUrl]
 *  The URL of the site. Defaults to the site from where the widget is running.
 *
 * @param {String} [options.type='User']
 *  The type of search to conduct. Default is `User`. Others
 *  include: `None`, `DistributionList`, `SecurityGroup`,
 *  `SharePointGroup`, `All`
 *
 * @param {Number} [options.maxSearchResults=50]
 *  The max number of results to be returned from the server.
 *
 * @param {Number} [options.minLength=2]
 *  The minimum number of characters the user must type before
 *  suggestions are retrieved.
 *
 * @param {String} [options.showSelected=true]
 *  If `true` (default), the selected users by this widget will be shown
 *  on the screen and remembered by the widget.
 *  Set to this `false`, if all that is desired to show is the
 *  search input element. Note that when set to `false`, `getSelected` method
 *  will always return an empty array and the
 *  [remove]{@link PeoplePicker#select} event should be used to capture
 *  the selection made by the user.
 *
 * @param {String} [options.resolvePrincipals=true]
 *  If set to true, any user that is suggested but not yet  part of the
 *  site collection user info list (their id is `-1`) will be automatically
 *  added.
 *
 * @param {Function} [options.filterSuggestions]
 *  A function to filter the Array of results. Function is used in `Array.filter`,
 *  and thus receives as input the array item
 *  (a [PeoplePickerUserProfileModel]{@link PeoplePickerUserProfileModel}) and the index
 *  of the item in the array. Function should return a `Boolean` indicating whether the
 *  item should be kept in the list or no (`true` == keep, `false` don't keep). See
 *  `Array.filter` for more information.
 *
 * @param {Function} [options.resultsZIndex=5]
 *  The CSS `z-index` value to be used for the element that display the search results.
 *
 * @param {String} [options.suggestionsRightAlign=false"]
 *  If true, the search suggestion element is right aligned with the search input
 *  box. good for when widget is close to the right edge of the viewport
 *
 * @param {Function} [options.apiSearch=searchPrincipals]
 *  The API function that will be called to get search results. See `searchPrincipals`
 *  or `searchPeoplePicker` for supported argument signature
 *
 * @param {Object} [options.labels]
 *  The labels used by the people picker.
 *
 * @param {String} [options.labels.inputPlaceholder="Type and Pick"]
 *  The text to appear in the HTML5 placeholder attribute
 *  of the input field.
 *
 * @param {String} [options.labels.meKeyword="[me]"]
 *  The keyword that will trigger the special entry that represents the currently
 *  logged in user into the list of suggestions. From an API standpoint, this
 *  special entry translates into `<userid/>`. To turn this feature off, just
 *  set this value to an empty string.
 *
 * @param {String} [options.labels.meKeywordLabel="Current User"]
 *  The label that will be shown when the user selects the special entry from the
 *  suggestions.
 *
 * @param {String} [options.labels.searchInfoMsg="Type a value to see list of candidates."]
 * @param {String} [options.labels.searchingMsg="Searching directory..."]
 *
 * @fires PeoplePicker#select
 * @fires PeoplePicker#remove
 */
        var PeoplePicker = __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__.a.extend(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__.a).extend(/** @lends PeoplePicker.prototype */ {
            init: function(options) {
                var inst = {
                    opt: Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options),
                    resultGroup: null,
                    bodyClickEv: null,
                    lastSearchInput: "",
                    lastSearchId: 1,
                    isSilentFocus: false,
                    selected: []
                };
                inst.opt.UserProfileModel = inst.opt.UserProfileModel.extend({
                    webURL: inst.opt.webURL
                });
                PRIVATE.set(this, inst);
                var opt = inst.opt;
                var $ui = this.$ui = Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_parseHTML__.a)(Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_fillTemplate__.a)(__WEBPACK_IMPORTED_MODULE_20__PeoplePicker_html___default.a, opt)).firstChild;
                var uiFind = $ui.querySelector.bind($ui);
                var $input = inst.$input = uiFind("input[name='search']");
                var $searchBox = inst.$searchBox = uiFind(".ms-PeoplePicker-searchBox");
                var $suggestions = inst.$suggestions = uiFind(SELECTOR_BASE + "-suggestions");
                var requestSuggestions = void 0;
                inst.$groups = uiFind(SELECTOR_BASE + "-suggestions-groups");
                inst.$inputCntr = uiFind(SELECTOR_BASE + "-searchFieldCntr");
                // Detach the Suggestions element
                // FIXME: need to move this to a Popup widget
                $suggestions.parentNode.removeChild($suggestions);
                opt.resultsZIndex && Object(__WEBPACK_IMPORTED_MODULE_13_common_micro_libs_src_domutils_domSetStyle__.a)($suggestions, {
                    zIndex: opt.resultsZIndex
                });
                opt.resultsMaxHeight && Object(__WEBPACK_IMPORTED_MODULE_13_common_micro_libs_src_domutils_domSetStyle__.a)(inst.$groups, {
                    maxHeight: opt.resultsMaxHeight
                });
                // Add keyboard interaction to the Input field
                var keyboardInteraction = inst.keyboardInteraction = __WEBPACK_IMPORTED_MODULE_14_common_micro_libs_src_domutils_DomKeyboardInteraction__.a.create({
                    input: $input,
                    eleGroup: inst.$groups,
                    eleSelector: ".spwidgets-PeoplePicker-Result",
                    focusClass: "spwidgets-PeoplePicker-Result--focus"
                });
                keyboardInteraction.on("keyEnter", function() {
                    if (inst.resultGroup) {
                        inst.resultGroup.selectCurrent();
                        requestAnimationFrame(function() {
                            $input.value = "";
                        });
                    }
                });
                keyboardInteraction.on("keyEsc", function() {
                    if (!$input.value) {
                        Object(__WEBPACK_IMPORTED_MODULE_11_common_micro_libs_src_domutils_domTriggerEvent__.a)(BODY, "click");
                        $input.blur();
                    }
                    $input.value = "";
                });
                // Cancel bubbling of mouse clicks inside the suggestions (results)
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__.a)($suggestions, "click", function(ev) {
                    return ev.stopPropagation() && ev.preventDefault();
                });
                // Focusing on the Input field, show the suggestions
                // and sets up the event to close it clicking outside of it.
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__.a)($input, "focus", function() {
                    inst.isSilentFocus || this.showResults();
                }.bind(this));
                // On blur: we want to hide the results popup, but only if the user
                // did not leave the input to actually click on a result item. so,
                // we delay the hiding of the results and check later if it was realy
                // a true blur
                // FIXME: blur not realy playing well with results.
                //domAddEventListener($input, "blur", function(){
                //    this.hideResults();
                //}.bind(this));
                // When user types, get suggestions
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__.a)($input, "keyup", function() {
                    var //key         = ev.which || ev.keyCode,
                    searchInput = String($input.value).trim();
                    if (inst.lastSearchInput === searchInput) return;
                    inst.lastSearchInput = searchInput;
                    if (!searchInput) {
                        inst.lastSearchId++;
                        requestSuggestions = void 0;
                        clearSuggestions.call(this);
                        return;
                    }
                    // If not min length, exit
                    if (searchInput.length < inst.opt.minLength) {
                        inst.lastSearchId++;
                        clearSuggestions.call(this);
                        return;
                    }
                    var exec = function() {
                        if (exec === requestSuggestions) {
                            inst.lastSearchId++;
                            var searchId = inst.lastSearchId;
                            Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddClass__.a)($ui, "is-searching");
                            Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddClass__.a)($suggestions, "is-searching");
                            clearSuggestions.call(this);
                            getSuggestions.call(this).then(function(peopleList) {
                                // if already stale, then do nothing
                                if (searchId !== inst.lastSearchId) {
                                    Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domRemoveClass__.a)($ui, "is-searching");
                                    Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domRemoveClass__.a)($suggestions, "is-searching");
                                    return;
                                }
                                showSuggestions.call(this, peopleList);
                                Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domRemoveClass__.a)($ui, "is-searching");
                                Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domRemoveClass__.a)($suggestions, "is-searching");
                            }.bind(this)).catch(function(e) {
                                console.log(e);
                            });
                        }
                    }.bind(this);
                    requestSuggestions = exec;
                    // After brief delay: get suggestion
                    setTimeout(function() {
                        exec();
                    }, 250);
                }.bind(this));
                // Clicking inside of this widget, but not on a selected element or
                // the input element, places focus on the input
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__.a)($searchBox, "click", function(ev) {
                    ev.target === $searchBox && $input.focus();
                }.bind(this));
                // Listen for when selected users are removed
                this.on("selected-remove", function(userWdg) {
                    var selectedIndex, personModel = userWdg.getUserProfile();
                    userWdg.destroy();
                    inst.selected.some(function(selectedWdg, index) {
                        if (selectedWdg === userWdg) {
                            selectedIndex = index;
                            return true;
                        }
                    });
                    "undefined" !== typeof selectedIndex && inst.selected.splice(selectedIndex, 1);
                    positionResultsPopup.call(this);
                    Object(__WEBPACK_IMPORTED_MODULE_11_common_micro_libs_src_domutils_domTriggerEvent__.a)($input, "keyup");
                    /**
             * A selection was removed
             *
             * @event PeoplePicker#remove
             *
             * @type {UserProfileModel}
             */
                    this.emit("remove", personModel);
                }.bind(this));
                // If user Set 'suggestionsRightAlign' then align suggestions to the right
                inst.opt.suggestionsRightAlign && Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddClass__.a)($ui, "spwidgets-PeoplePicker--suggestionsRight");
                // If selected people were defined on input, call add()
                inst.opt.selected && this.add(inst.opt.selected);
                this.onDestroy(function() {
                    // Since the suggestion UI was detached from the widget, need to
                    // ensure it is also destroyed.
                    $suggestions.parentNode && $suggestions.parentNode.removeChild($suggestions);
                    inst.selected.forEach(function(wdg) {
                        wdg && wdg.destroy();
                    });
                    inst.selected.splice(0);
                    // Destroy all Compose object
                    Object.keys(inst).forEach(function(prop) {
                        if (inst[prop]) {
                            // Widgets
                            inst[prop].destroy ? inst[prop].destroy() : inst[prop].remove ? inst[prop].remove() : inst[prop].off && inst[prop].off();
                            inst[prop] = void 0;
                        }
                    });
                    PRIVATE.delete(this);
                }.bind(this));
            },
            /**
     * Clears all selected users.
     */
            clear: function() {
                var selected = PRIVATE.get(this).selected;
                selected.forEach(function(userWdg) {
                    userWdg.destroy();
                });
                selected.splice(0);
            },
            /**
     * Adds a User to the list of selected items.
     *
     * @param {Object|Array<Object>|String} people
     *  The object defined with the person to be added should have
     *  at least two attributes: `ID` and `AccountName`. If no `ID`
     *  is defined but `AccountName` or DisplayName is, an
     *  API call will be made attempting to identify the person's ID
     *  on the site.
     *  A `String` can also be used, in which case it is assume to be one
     *  in the format normally returned by the SOAP API (ex. ID;#name).
     *  Example of person definition:
     *
     *      {
     *          ID: "123",
     *          AccountName: "John Doe"
     *      }
     *
     * @returns {Promise<Array<PeoplePickerUserProfileModel>, Error>}
     */
            add: function(people) {
                var UserProfileModel = PRIVATE.get(this).opt.UserProfileModel;
                if (!Array.isArray(people)) if ("string" === typeof people) people = Object(__WEBPACK_IMPORTED_MODULE_16__sputils_parsePeopleField__.a)(people, UserProfileModel); else {
                    if (!people) return __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_es6_promise__.a.resolve([]);
                    people = [ people ];
                }
                return __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_es6_promise__.a.all(people.map(function(person) {
                    // If we already have ID and Account Name on input, then
                    // just make sure we have as a PeoplePickerUserProfileModel instance
                    if (person.ID && (person.ID === CURRENT_USER_ID || person.AccountName)) {
                        person.Name || (person.Name = person.DisplayName || person.AccountName);
                        if (UserProfileModel.isInstanceOf(person)) return person;
                        return UserProfileModel.create(person);
                    }
                    if (person.AccountName || person.DisplayName || person.Name) return getSuggestions.call(this, person.AccountName || person.DisplayName || person.Name).then(function(peopleList) {
                        // If Account Name was used and we have 1 match, then that is it
                        if (person.AccountName && 1 === peopleList.length) return peopleList[0];
                        // Multiple matches.. lets try to match the user
                        // up if possible.
                        var userProfile;
                        peopleList.some(function(personProfile) {
                            if (person.AccountName && personProfile.AccountName === person.AccountName || person.DisplayName && personProfile.DisplayName === person.DisplayName || person.Name && personProfile.Name === person.Name) {
                                userProfile = personProfile;
                                return true;
                            }
                        });
                        return userProfile;
                    });
                    return;
                }.bind(this))).then(function(peopleList) {
                    peopleList.forEach(function(personModel) {
                        personModel && addPersonToSelectedList.call(this, personModel);
                    }.bind(this));
                    return peopleList;
                }.bind(this)).catch(function(e) {
                    console.error(e);
                    // jshint ignore:line
                    return __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_jsutils_es6_promise__.a.reject(e);
                });
            },
            /**
     * Removes a selected user (or a list of users) from the list.
     *
     * @param {String|Array<String>} people
     *  The user or list of users to be removed. Anyone of the following
     *  values can be defined on input: `ID`, `AccountName`, `DisplayName`.
     */
            remove: function(people) {
                var inst = PRIVATE.get(this), selectedList = inst.selected;
                if (!selectedList.length) return;
                Array.isArray(people) || (people = [ people ]);
                people.forEach(function(id) {
                    var wdgToRemove;
                    selectedList.some(function(selectedWdg) {
                        var userProfile = selectedWdg.getUserProfile();
                        userProfile.ID !== id && userProfile.UserInfoID !== id && userProfile.AccountName !== id && userProfile.Name !== id && userProfile.DisplayName !== id || (wdgToRemove = selectedWdg);
                    });
                    // If we found the person, then emit a 'remove' on it...
                    // Widget's events are pipe'd to the PeoplePicker instance
                    // as 'selected-remove' which is being listened to.
                    wdgToRemove && wdgToRemove.emit("remove");
                });
            },
            /**
     * Removes all currently selected people and replaces them with new set. `add` method
     * is called after clearing all selected people.
     *
     * @param {Object|Array<Object>|String} people
     *  The object defined with the new set of people. Should have
     *  at least two attributes: `ID` and `AccountName`.
     *  If no `ID` is defined but `AccountName` or DisplayName is, an
     *  API call will be made attempting to identify the person's ID
     *  on the site.
     *  A `String` can also be used, in which case it is assume to be one
     *  in the format normally returned by the SOAP API (ex. ID;#name).
     *  Example of person definition:
     *
     *      {
     *          ID: "123",
     *          AccountName: "John Doe"
     *      }
     *
     * @returns {Promise<Array<PeoplePickerUserProfileModel>, Error>}
     */
            setSelected: function(people) {
                this.clear();
                return this.add(people);
            },
            /**
     * Returns an array of `UserProfileModels` for those that are currently
     * selected.
     *
     * @returns {Array<UserProfileModel>}
     */
            getSelected: function() {
                // FIXME: add methods to returned array to provide easy methods to get array values for update to SP - use Collection
                return PRIVATE.get(this).selected.map(function(userWdg) {
                    return userWdg.getUserProfile();
                });
            },
            /**
     * Sets focus on the input search element
     *
     * @param {Boolean} [isSilent=false]
     *  If true, then event associated with the input focus will not be executed and
     *  the input will simply receive focus.
     */
            setFocus: function(isSilent) {
                var inst = PRIVATE.get(this);
                inst.isSilentFocus = isSilent;
                inst.$input.focus();
                inst.isSilentFocus = false;
            },
            /**
     * Shows the results UI
     */
            showResults: function() {
                var inst = PRIVATE.get(this);
                var $input = inst.$input;
                var $suggestions = inst.$suggestions;
                var $ui = this.getEle();
                Object(__WEBPACK_IMPORTED_MODULE_8_common_micro_libs_src_domutils_domAddClass__.a)($ui, "is-active");
                BODY.appendChild($suggestions);
                positionResultsPopup.call(this);
                Object(__WEBPACK_IMPORTED_MODULE_11_common_micro_libs_src_domutils_domTriggerEvent__.a)($input, "keyup");
                if (inst.bodyClickEv) {
                    inst.bodyClickEv.remove();
                    inst.bodyClickEv = null;
                }
                // Clicking anywhere outside of this widget - removes active class
                inst.bodyClickEv = Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__.a)(BODY, "click", function(ev) {
                    var closestPeoplePicker = Object(__WEBPACK_IMPORTED_MODULE_10_common_micro_libs_src_domutils_domClosest__.a)(ev.target, SELECTOR_BASE);
                    closestPeoplePicker && closestPeoplePicker === $ui || this.hideResults();
                }.bind(this));
            },
            /**
     * Hides the results UI
     */
            hideResults: function() {
                var inst = PRIVATE.get(this);
                var $suggestions = inst.$suggestions;
                if (inst.bodyClickEv) {
                    inst.bodyClickEv.remove();
                    inst.bodyClickEv = null;
                }
                Object(__WEBPACK_IMPORTED_MODULE_9_common_micro_libs_src_domutils_domRemoveClass__.a)(this.getEle(), "is-active");
                $suggestions.parentNode && BODY.removeChild($suggestions);
                Object(__WEBPACK_IMPORTED_MODULE_13_common_micro_libs_src_domutils_domSetStyle__.a)($suggestions, {
                    display: "none"
                });
                inst.lastSearchInput = "";
                clearSuggestions.call(this);
            }
        });
        function positionResultsPopup() {
            var _PRIVATE$get = PRIVATE.get(this), $suggestions = _PRIVATE$get.$suggestions, $input = _PRIVATE$get.$input;
            Object(__WEBPACK_IMPORTED_MODULE_13_common_micro_libs_src_domutils_domSetStyle__.a)($suggestions, {
                width: $input.clientWidth + "px",
                display: "block"
            });
            Object(__WEBPACK_IMPORTED_MODULE_12_common_micro_libs_src_domutils_domPosition__.a)($suggestions, $input);
        }
        /**
 * Fetches the suggestion for the text entered by the user
 *
 * @private
 *
 * @param {String} [searchString]
 * @param {Number} [searchId]
 *
 * @return {Promise}
 */
        function getSuggestions(searchString, searchId) {
            var inst = PRIVATE.get(this), opt = inst.opt, selected = inst.selected;
            searchString = searchString || inst.$input.value;
            return opt.apiSearch({
                webURL: opt.webURL,
                searchText: searchString,
                maxResults: opt.maxSearchResults,
                principalType: opt.type,
                UserProfileModel: opt.UserProfileModel
            }).then(function(results) {
                // If not the last thing the user types, exit.
                if (searchId && inst.lastSearchId !== searchId) return;
                var filteredResults = results.slice(0);
                // Insert the "ME" entry if that was the text the user entered
                opt.labels.meKeyword && searchString === opt.labels.meKeyword && filteredResults.unshift(opt.UserProfileModel.create({
                    UserInfoID: CURRENT_USER_ID,
                    DisplayName: opt.labels.meKeywordLabel
                }));
                filteredResults = filteredResults.filter(function(personModel) {
                    if (!selected.length || !selected.some(function(selectedWdg) {
                        return selectedWdg.getUserProfile().ID === personModel.ID;
                    })) return true;
                });
                opt.filterSuggestions && (filteredResults = filteredResults.filter(opt.filterSuggestions));
                return filteredResults;
            });
        }
        /**
 * Shows the list of suggestions to the user.
 *
 * @param {Array} peopleList
 *
 * @private
 */
        function showSuggestions(peopleList) {
            var _this = this;
            var inst = PRIVATE.get(this);
            // FIXME: need to ensure that this set of results matches the last request made for data. Else, don't show it
            clearSuggestions.call(this);
            var resultGroup = inst.resultGroup = inst.opt.ResultGroupWidget.create({
                results: peopleList
            });
            resultGroup.appendTo(inst.$groups);
            resultGroup.on("result-click", function(result) {
                var resultModel = result.getUserProfile();
                (inst.opt.resolvePrincipals && !resultModel.ID || "-1" === String(resultModel.ID)) && resultModel.resolvePrincipal();
                if (inst.opt.showSelected) {
                    result.destroy();
                    addPersonToSelectedList.call(_this, resultModel);
                }
                positionResultsPopup.call(_this);
                inst.$input.value = "";
                _this.setFocus(true);
                /**
         * A suggestion was selected.
         *
         * @event PeoplePicker#select
         * @type {PeoplePickerUserProfileModel}
         */
                _this.emit("select", resultModel);
            });
        }
        /**
 * Adds a `PeoplePickerUserProfileModel` person to the list
 * of selected users.
 *
 * @private
 *
 * @param {PeoplePickerUserProfileModel} personModel
 */
        function addPersonToSelectedList(personModel) {
            var newSelectedPerson, inst = PRIVATE.get(this), $inputCntr = inst.$inputCntr;
            if (!isPersonInSelectedList.call(this, personModel)) {
                inst.opt.allowMultiples || this.clear();
                newSelectedPerson = inst.opt.PersonaWidget.create({
                    userProfile: personModel
                });
                newSelectedPerson.setSize("xs");
                newSelectedPerson.pipe(this, "selected-");
                $inputCntr.parentNode.insertBefore(newSelectedPerson.getEle(), $inputCntr);
                inst.selected.push(newSelectedPerson);
                positionResultsPopup.call(this);
            }
        }
        function isPersonInSelectedList(personModel) {
            return PRIVATE.get(this).selected.some(function(selectedPerson) {
                return selectedPerson.getUserProfile().ID === personModel.ID;
            });
        }
        /**
 * Clears the current set of suggestions
 *
 * @private
 */
        function clearSuggestions() {
            var inst = PRIVATE.get(this), resultGroup = inst.resultGroup;
            if (resultGroup) {
                resultGroup.destroy();
                inst.resultGroup = null;
            }
        }
        /**
 * Defaults for the widget
 *
 * @type Object
 */
        PeoplePicker.defaults = {
            selected: "",
            allowMultiples: true,
            maxSearchResults: 50,
            webURL: null,
            type: "User",
            minLength: 2,
            resultsZIndex: 0,
            resultsMaxHeight: "",
            // default: 20em
            showSelected: true,
            resolvePrincipals: true,
            filterSuggestions: null,
            UserProfileModel: __WEBPACK_IMPORTED_MODULE_17__PeoplePickerUserProfileModel__.a,
            PersonaWidget: __WEBPACK_IMPORTED_MODULE_19__PeoplePickerPersona_PeoplePickerPersona__.a,
            ResultGroupWidget: __WEBPACK_IMPORTED_MODULE_18__ResultGroup_ResultGroup__.a,
            apiSearch: __WEBPACK_IMPORTED_MODULE_15__spapi_searchPrincipals__.a,
            suggestionsRightAlign: false,
            labels: {
                inputPlaceholder: "Type and Pick",
                meKeyword: "[me]",
                meKeywordLabel: "Current User",
                searchInfoMsg: "Type a value to see list of candidates. Use '[me]' for current user.",
                searchingMsg: "Searching directory..."
            }
        };
        /* harmony default export */
        __webpack_exports__.a = PeoplePicker;
    }, /* 112 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export domSetStyle */
        var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        /**
 * Sets styles on an element
 *
 * @function domSetStyle
 *
 * @param {HTMLElement} el
 * @param {Object} styles
 *
 * @example
 *
 * domSetStyle(document.body, {"background-color", "yellow"});
 */
        function domSetStyle(el, styles) {
            if (!el || "object" !== ("undefined" === typeof styles ? "undefined" : _typeof(styles))) return;
            Object.keys(styles).forEach(function(prop) {
                el.style[prop] = styles[prop];
            });
        }
        /* harmony default export */
        __webpack_exports__.a = domSetStyle;
    }, /* 113 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__models_UserProfileModel__ = __webpack_require__(18);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__parseLookupFieldValue__ = __webpack_require__(33);
        /**
 * Parses a Person or Group value string returned by SharePoint webservices
 * into an array of object, each object representing a person or group.
 *
 * @see http://msdn.microsoft.com/en-us/library/cc264031%28v=office.14%29.aspx
 *
 * @function parsePeopleField
 *
 * @param {String} peopleString
 * @param {UserProfileModel} [PersonModel=UserProfileModel]
 *
 * @return {Array<UserProfileModel>}
 */
        var parsePeopleField = function parsePeopleField(peopleString, PersonModel) {
            PersonModel = PersonModel || parsePeopleField.defaults.PersonModel;
            return Object(__WEBPACK_IMPORTED_MODULE_2__parseLookupFieldValue__.a)(String(peopleString || "")).map(function(person) {
                var personInfo = {
                    ID: person.id || "",
                    Name: person.title || ""
                };
                // If the Name field seems to have data that is returned when you
                // expand the field during the API call, then parse that now into
                // individual attributes... See for more info. on these attributes:
                // http://msdn.microsoft.com/en-us/library/cc264031%28v=office.14%29.aspx
                // O365 seems to return some additional values from what is documented.
                //  Example of expanded values in an array (from o365):
                //  [
                //      "First Last",
                //      "i:0#.f|membership|somename@domain.com",
                //      "someName@domain.com",
                //      "",
                //      "First Last",
                //      "https://someDomain-my.sharepoint.com:443/User%20Photos/.....jpg",  // Not using it now
                //      "",  // Not using it now
                //      ""  // Not using it now
                // ]
                if (personInfo.Name.indexOf(",#") > -1) {
                    var additionalAttributes = [ "Name", "AccountName", "Email", "SIP", "DisplayName" ];
                    personInfo.Name.split(/\,#/g).forEach(function(expandedValue, index) {
                        additionalAttributes[index] && (personInfo[additionalAttributes[index]] = String(expandedValue || "").replace(/\,\,/g, ","));
                    });
                }
                // Create the model and populate with the attr. from above.
                return PersonModel.create(personInfo);
            });
        };
        /**
 * Defaults for the function
 *
 * @name parsePeopleField.defaults
 * @type {Object}
 */
        parsePeopleField.defaults = {
            PersonModel: __WEBPACK_IMPORTED_MODULE_1__models_UserProfileModel__.a
        };
        /* harmony default export */
        __webpack_exports__.a = parsePeopleField;
    }, /* 114 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_es6_promise__ = __webpack_require__(13);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__models_UserProfileModel__ = __webpack_require__(18);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3__spapi_resolvePrincipals__ = __webpack_require__(42);
        //=======================================================================
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_dataStore__.a.create();
        /**
 * People picker user profile model used to model each user profile
 *
 * @class PeoplePickerUserProfileModel
 * @extends UserProfileModel
 */
        var PeoplePickerUserProfileModel = __WEBPACK_IMPORTED_MODULE_2__models_UserProfileModel__.a.extend(/** @lends PeoplePickerProfileModel.prototype */ {
            /**
     * The web URL from where this user was retrieved. Used in resolved principal
     * @type {String}
     */
            webURL: "",
            /**
     * Returns the AccountName url encoded.
     *
     * @returns {string}
     */
            getAccountNameUrlEncoded: function() {
                return encodeURIComponent(this.AccountName);
            },
            /**
     * Resolves the person against the site (`webURL`) by calling
     * the `ResolvePrincipal` API. API is only called if `ID` is `-1`
     *
     * @returns {Promise<PeoplePickerUserProfileModel, Error>}
     */
            resolvePrincipal: function() {
                if (this.ID && "-1" !== this.ID) return __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_es6_promise__.a.resolve(this);
                var inst = void 0;
                if (PRIVATE.has(this)) inst = PRIVATE.get(this); else {
                    inst = {
                        resolvePromise: null
                    };
                    PRIVATE.set(this, inst);
                }
                if (inst.resolvePromise) return inst.resolvePromise;
                inst.resolvePromise = Object(__WEBPACK_IMPORTED_MODULE_3__spapi_resolvePrincipals__.a)({
                    webURL: this.webURL,
                    principalKeys: this.AccountName
                }).then(function(userList) {
                    // See Issue #42 for the possibility of the results returning
                    // multiples, even when only one principalKey was provided on
                    // input to the API.
                    // https://github.com/purtuga/SPWidgets/issues/42
                    userList.some(function(resolvedUser) {
                        if (resolvedUser.ID && "-1" !== String(resolvedUser.ID) && (resolvedUser.AccountName && resolvedUser.AccountName === this.AccountName || resolvedUser.Email && resolvedUser.Email === this.Email || resolvedUser.DisplayName && resolvedUser.DisplayName === this.DisplayName)) {
                            this.UserInfoID = this.ID = resolvedUser.ID;
                            return true;
                        }
                    }.bind(this));
                    return this;
                }.bind(this));
                return inst.resolvePromise;
            }
        });
        /* harmony default export */
        __webpack_exports__.a = PeoplePickerUserProfileModel;
    }, /* 115 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__ = __webpack_require__(7);
        /* harmony import */
        __webpack_require__(10);
        /* harmony import */
        __webpack_require__(21);
        /* harmony import */
        __webpack_require__(9);
        /* harmony import */
        __webpack_require__(19);
        /* harmony import */
        __webpack_require__(4);
        /* harmony import */
        __webpack_require__(11);
        /* harmony import */
        __webpack_require__(50);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_13__Result_Result__ = __webpack_require__(116);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_14__ResultGroup_html__ = __webpack_require__(123);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_14__ResultGroup_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__ResultGroup_html__);
        //=============================================================================
        // FIXME: convert to use DomKeyboardInteraction
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create();
        /**
 * Widget description
 *
 * @class ResultGroup
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} options
 * @param {Array<PeoplePickerUserProfileModel>} options.results
 * @param {Object} [options.labels]
 * @param {String} [options.labels.groupTitle="Search Results"]
 *
 * @fires ResultGroup#result-click
 */
        var ResultGroup = /** @lends ResultGroup */ {
            init: function(options) {
                var inst = {
                    opt: Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options),
                    uiFind: null,
                    $resultList: null,
                    resultItems: []
                };
                PRIVATE.set(this, inst);
                var $ui = this.$ui = Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__.a)(Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__.a)(__WEBPACK_IMPORTED_MODULE_14__ResultGroup_html___default.a, {
                    groupTitle: inst.opt.labels.groupTitle
                })).firstChild;
                inst.uiFind = $ui.querySelector.bind($ui);
                inst.$resultList = inst.uiFind(".ms-PeoplePicker-resultList");
                setResultsToGroup.call(this);
                this.onDestroy(function() {
                    inst.resultItems.forEach(function(wdg) {
                        wdg.destroy();
                    });
                    inst.uiFind = void 0;
                    inst.$resultList = void 0;
                    PRIVATE.delete(this);
                }.bind(this));
            },
            /**
     * Sets focus on the next result item
     */
            focusNext: function() {
                var selectedWdg, selectedWdgIndex, inst = PRIVATE.get(this), resultItems = inst.resultItems;
                if (!resultItems.length) return;
                resultItems.some(function(resultWdg, index) {
                    if (resultWdg.hasFocus()) {
                        selectedWdgIndex = index;
                        selectedWdg = resultWdg;
                        return true;
                    }
                });
                // Nothing selected? - set first item
                if (!selectedWdg) {
                    resultItems[0].setFocus();
                    return;
                }
                selectedWdg.removeFocus();
                // If currently in the last item, select the first one again
                if (selectedWdgIndex === resultItems.length - 1) {
                    resultItems[0].setFocus();
                    return;
                }
                resultItems[selectedWdgIndex + 1].setFocus();
            },
            /**
     * Sets focus on previous result item
     */
            focusPrevious: function() {
                var selectedWdg, selectedWdgIndex, inst = PRIVATE.get(this), resultItems = inst.resultItems, lastIndex = resultItems.length - 1;
                if (!resultItems.length) return;
                resultItems.some(function(resultWdg, index) {
                    if (resultWdg.hasFocus()) {
                        selectedWdgIndex = index;
                        selectedWdg = resultWdg;
                        return true;
                    }
                });
                // Nothing selected? - set last item
                if (!selectedWdg) {
                    resultItems[lastIndex].setFocus();
                    return;
                }
                selectedWdg.removeFocus();
                // If currently in the first item, select the last one again
                if (0 === selectedWdgIndex) {
                    resultItems[lastIndex].setFocus();
                    return;
                }
                resultItems[selectedWdgIndex - 1].setFocus();
            },
            /**
     * Selects current result item by emitting a click
     * event on it and thus triggering associated widget events.
     */
            selectCurrent: function() {
                var inst = PRIVATE.get(this), resultItems = inst.resultItems;
                resultItems.some(function(resultWdg) {
                    if (resultWdg.hasFocus()) {
                        resultWdg.emit("click");
                        return true;
                    }
                });
            }
        };
        /**
 * Builds the widgets for each result and adds them to the list
 * @private
 */
        function setResultsToGroup() {
            var inst = PRIVATE.get(this), resultItems = inst.resultItems, listHolderEle = inst.$resultList, removeFromResults = function(resultInst) {
                var index;
                resultItems.some(function(wdg, i) {
                    if (wdg === resultInst) {
                        index = i;
                        return true;
                    }
                });
                "undefined" !== typeof index && resultItems.splice(index, 1);
            };
            // Destroy existing - if any
            resultItems.forEach(function(resultWdg) {
                resultWdg.destroy();
            });
            resultItems.splice(0);
            resultItems.push.apply(resultItems, inst.opt.results.map(function(userProfile) {
                var resultInst = inst.opt.ResultWidget.create({
                    userProfile: userProfile
                });
                resultInst.appendTo(listHolderEle);
                resultInst.pipe(this, "result-");
                resultInst.onDestroy(function() {
                    removeFromResults(resultInst);
                });
                return resultInst;
            }.bind(this)));
        }
        ResultGroup = __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__.a.extend(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__.a, ResultGroup);
        ResultGroup.defaults = {
            results: [],
            ResultWidget: __WEBPACK_IMPORTED_MODULE_13__Result_Result__.a,
            labels: {
                groupTitle: "Search Results"
            }
        };
        /* harmony default export */
        __webpack_exports__.a = ResultGroup;
    }, /* 116 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Persona_Persona__ = __webpack_require__(27);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_domutils_domHasClass__ = __webpack_require__(19);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_domutils_domAddClass__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_domutils_domRemoveClass__ = __webpack_require__(11);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__Result_html__ = __webpack_require__(120);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__Result_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Result_html__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6__Result_less__ = __webpack_require__(121);
        /* harmony import */
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__Result_less__);
        /**
 * A People picker suggestion result
 *
 * @class Result
 * @extends Persona
 *
 * @param {Object} options
 * @param {Object} options.userProfile
 */
        var Result = {
            init: function() {
                __WEBPACK_IMPORTED_MODULE_0__Persona_Persona__.a.prototype.init.apply(this, arguments);
                "<userid/>" === this.getUserProfile().ID && this.setAsCurrentUser();
                this.setSize("sm");
            },
            // Returns the People Picker Result wrapper with the persona template inside.
            getTemplate: function() {
                return Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_fillTemplate__.a)(__WEBPACK_IMPORTED_MODULE_5__Result_html___default.a, {
                    PersonaTemplateHtml: __WEBPACK_IMPORTED_MODULE_0__Persona_Persona__.a.prototype.getTemplate.call(this)
                });
            },
            /**
     * Highlights he result items
     */
            setFocus: function() {
                Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_domutils_domAddClass__.a)(this.getEle(), "spwidgets-PeoplePicker-Result--focus");
            },
            /**
     * Removes the highlight of the item
     */
            removeFocus: function() {
                Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_domutils_domRemoveClass__.a)(this.getEle(), "spwidgets-PeoplePicker-Result--focus");
            },
            /**
     * Returns a boolean indicating if item is currently focused
     */
            hasFocus: function() {
                return Object(__WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_domutils_domHasClass__.a)(this.getEle(), "spwidgets-PeoplePicker-Result--focus");
            },
            /**
     * Used to highlight the persona that it is not a specific user, but
     * rather the pseudo entry that point to the currently logged in user.
     */
            setAsCurrentUser: function() {
                Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_domutils_domAddClass__.a)(this.getEle(), "is-currentUserEntry");
            }
        };
        Result = __WEBPACK_IMPORTED_MODULE_0__Persona_Persona__.a.extend(Result);
        /* harmony default export */
        __webpack_exports__.a = Result;
    }, /* 117 */
    /***/
    function(module, exports) {
        module.exports = '<div class="ms-Persona ms-Persona--offline spwidgets-Persona" data-sp_id="{{ID}}">\r\n    <div class="ms-Persona-imageArea">\r\n        <div class="ms-Persona-initials">{{Initials}}</div>\r\n        <div class="ms-Image ms-Persona-image">\r\n            <img class="ms-Image-image ms-Image-image--portrait ms-Image-image--cover" src="{{UserPhoto}}">\r\n        </div>\r\n    </div>\r\n    <div class="ms-Persona-presence"></div>\r\n    <div class="ms-Persona-details">\r\n        <div class="ms-Persona-primaryText">{{Name}}</div>\r\n        <div class="ms-Persona-secondaryText">{{Title}}</div>\r\n        <div class="ms-Persona-tertiaryText">{{Office}}</div>\r\n        <div class="ms-Persona-optionalText"></div>\r\n    </div>\r\n    <div class="ms-Persona-actionIcon">\r\n        <i class="ms-Icon ms-Icon--Cancel"></i>\r\n    </div>\r\n</div>';
    }, /* 118 */
    /***/
    function(module, exports, __webpack_require__) {
        var content = __webpack_require__(119);
        "string" === typeof content && (content = [ [ module.i, content, "" ] ]);
        var options = {
            hmr: true
        };
        options.transform = void 0;
        options.insertInto = void 0;
        __webpack_require__(6)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 119 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)();
        // imports
        // module
        exports.push([ module.i, '.spwidgets-Persona .ms-Image-image {\n  width: 100%;\n}\n.spwidgets-Persona .ms-Persona-initials:empty:before {\n  content: "?";\n}\n.spwidgets-Persona--noDetails .ms-Persona-details {\n  display: none;\n}\n.spwidgets-Persona--noAction .ms-Persona-actionIcon {\n  display: none;\n}\n.spwidgets-Persona--showInitials .ms-Persona-image {\n  display: none;\n}\n.spwidgets-Persona.ms-Persona--nopresence .ms-Persona-presence {\n  display: none;\n}\n', "" ]);
    }, /* 120 */
    /***/
    function(module, exports) {
        module.exports = '<div class="ms-PeoplePicker-result spwidgets-PeoplePicker-Result">\r\n    {{PersonaTemplateHtml}}\r\n</div>';
    }, /* 121 */
    /***/
    function(module, exports, __webpack_require__) {
        var content = __webpack_require__(122);
        "string" === typeof content && (content = [ [ module.i, content, "" ] ]);
        var options = {
            hmr: true
        };
        options.transform = void 0;
        options.insertInto = void 0;
        __webpack_require__(6)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 122 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)();
        // imports
        // module
        exports.push([ module.i, ".spwidgets-PeoplePicker-Result.is-currentUserEntry .ms-Persona-primaryText {\n  color: #005A9E;\n  font-style: italic;\n}\n.spwidgets-PeoplePicker-Result--focus {\n  background-color: #eaeaea;\n  outline: 1px solid transparent;\n}\n", "" ]);
    }, /* 123 */
    /***/
    function(module, exports) {
        module.exports = '<div class="ms-PeoplePicker-resultGroup spwidgets-PeoplePicker-resultGroup">\r\n    <div class="ms-PeoplePicker-resultGroupTitle">{{groupTitle}}</div>\r\n    <div class="ms-PeoplePicker-resultList"></div>\r\n</div>\r\n\r\n\r\n\r\n\r\n';
    }, /* 124 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Persona_Persona__ = __webpack_require__(27);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_domutils_domAddClass__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__PeoplePickerPersona_html__ = __webpack_require__(125);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4__PeoplePickerPersona_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__PeoplePickerPersona_html__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__PeoplePickerPersona_less__ = __webpack_require__(126);
        /* harmony import */
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__PeoplePickerPersona_less__);
        //=========================================================================
        /**
 * A Selected Persona widget for the people picker, which includes
 * a button to remove the entry from the selected list.
 *
 * @class PeoplePickerPersona
 * @extends Persona
 *
 * @triggers PeoplePickerPersona#remove
 */
        var PeoplePickerPersona = /** @lends PeoplePickerPersona.prototype **/ {
            init: function(options) {
                var _this = this;
                var opt = Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options);
                __WEBPACK_IMPORTED_MODULE_0__Persona_Persona__.a.prototype.init.call(this, opt);
                var evActionClickListener = this.on("action-click", function() {
                    /**
             * User clicked the remove button on the people picker persona.
             *
             * @event PeoplePickerPersona#remove
             */
                    _this.emit("remove");
                });
                this.onDestroy(function() {
                    evActionClickListener.off();
                });
                if ("<userid/>" === String(this.getUserProfile().ID).toLowerCase()) {
                    this.setAsCurrentUser();
                    this.setPresence("noPresence");
                }
            },
            getTemplate: function() {
                return Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_fillTemplate__.a)(__WEBPACK_IMPORTED_MODULE_4__PeoplePickerPersona_html___default.a, {
                    PersonaTemplateHtml: __WEBPACK_IMPORTED_MODULE_0__Persona_Persona__.a.prototype.getTemplate.call(this)
                });
            },
            /**
     * Used to highlight the persona that it is not a specific user, but
     * rather the pseudo entry that point to the currently logged in user.
     */
            setAsCurrentUser: function() {
                Object(__WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_domutils_domAddClass__.a)(this.getEle(), "is-currentUserEntry");
            }
        };
        PeoplePickerPersona = __WEBPACK_IMPORTED_MODULE_0__Persona_Persona__.a.extend(PeoplePickerPersona);
        PeoplePickerPersona.defaults = Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, PeoplePickerPersona.defaults, {
            variant: "token",
            hideAction: false
        });
        /* harmony default export */
        __webpack_exports__.a = PeoplePickerPersona;
    }, /* 125 */
    /***/
    function(module, exports) {
        module.exports = '<div class="ms-PeoplePicker-persona spwidgets-PeoplePicker-persona">\r\n    {{PersonaTemplateHtml}}\r\n</div>\r\n';
    }, /* 126 */
    /***/
    function(module, exports, __webpack_require__) {
        var content = __webpack_require__(127);
        "string" === typeof content && (content = [ [ module.i, content, "" ] ]);
        var options = {
            hmr: true
        };
        options.transform = void 0;
        options.insertInto = void 0;
        __webpack_require__(6)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 127 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)();
        // imports
        // module
        exports.push([ module.i, ".spwidgets-PeoplePicker-persona {\n  display: inline-block;\n}\n.spwidgets-PeoplePicker-persona.is-currentUserEntry .ms-Persona-primaryText {\n  color: #005A9E;\n  font-style: italic;\n  padding-right: 0.5em;\n}\n", "" ]);
    }, /* 128 */
    /***/
    function(module, exports) {
        module.exports = '<div class="ms-PeoplePicker spwidgets-PeoplePicker">\r\n    <div class="ms-PeoplePicker-searchBox">\r\n        <div class="ms-TextField ms-TextField--textFieldUnderlined spwidgets-PeoplePicker-searchFieldCntr">\r\n            <input class="ms-TextField-field" name="search" type="text" value="" autocomplete="off" placeholder="{{labels.inputPlaceholder}}">\r\n        </div>\r\n    </div>\r\n\r\n    <div class="spwidgets-PeoplePicker-suggestions ms-PeoplePicker-results ms-font-m">\r\n        <div class="spwidgets-PeoplePicker-suggestions-groups"></div>\r\n\r\n        <div class="spwidgets-PeoplePicker-searchInfo">\r\n            <div class="spwidgets-PeoplePicker-searchInfo-iconHolder">\r\n                <i class="ms-Icon ms-Icon--Search"></i>\r\n                <i class="ms-Icon ms-Icon--Sync spwidgets-PeoplePicker-busy"></i>\r\n            </div>\r\n            <p class="spwidgets-PeoplePicker-searchInfo-msg ms-fontColor-neutralSecondary .ms-fontSize-m">{{labels.searchInfoMsg}}</p>\r\n            <p class="spwidgets-PeoplePicker-searchInfo-searchingMsg ms-fontColor-neutralSecondary .ms-fontSize-m">{{labels.searchingMsg}}</p>\r\n        </div>\r\n    </div>\r\n</div>\r\n';
    }, /* 129 */
    /***/
    function(module, exports, __webpack_require__) {
        var content = __webpack_require__(130);
        "string" === typeof content && (content = [ [ module.i, content, "" ] ]);
        var options = {
            hmr: true
        };
        options.transform = void 0;
        options.insertInto = void 0;
        __webpack_require__(6)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 130 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)();
        // imports
        // module
        exports.push([ module.i, ".spwidgets-PeoplePicker button {\n  min-width: 0;\n  padding: initial;\n  margin-left: auto;\n  font-size: initial;\n}\n.spwidgets-PeoplePicker-searchFieldCntr {\n  min-width: 180px;\n}\n.spwidgets-PeoplePicker-searchFieldCntr input {\n  min-width: 100%;\n}\n.spwidgets-PeoplePicker-suggestions {\n  min-width: 250px;\n  position: absolute;\n  z-index: 5;\n}\n.spwidgets-PeoplePicker-suggestions-groups {\n  padding: 1px;\n  overflow-y: auto;\n  overflow-x: hidden;\n  max-height: 20em;\n}\n.spwidgets-PeoplePicker-suggestions-groups::-webkit-scrollbar {\n  width: 0.5em;\n  background-color: #F5F5F5;\n}\n.spwidgets-PeoplePicker-suggestions-groups::-webkit-scrollbar-thumb {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  background-color: #555;\n}\n.spwidgets-PeoplePicker-searchInfo {\n  border-top: 1px solid #eaeaea;\n  padding: 1em;\n}\n.spwidgets-PeoplePicker-searchInfo-iconHolder {\n  position: absolute;\n}\n.spwidgets-PeoplePicker-searchInfo > p {\n  padding-left: 2em;\n  margin: 0;\n}\n.spwidgets-PeoplePicker-searchInfo-searchingMsg {\n  display: none;\n}\n.spwidgets-PeoplePicker-busy {\n  display: none;\n}\n.spwidgets-PeoplePicker .ms-Persona-details > * {\n  width: auto;\n  max-width: 190px;\n}\n.spwidgets-PeoplePicker-suggestions.is-searching .ms-Icon--Search {\n  display: none;\n}\n.spwidgets-PeoplePicker-suggestions.is-searching .spwidgets-PeoplePicker-searchInfo-msg {\n  display: none;\n}\n.spwidgets-PeoplePicker-suggestions.is-searching .spwidgets-PeoplePicker-searchInfo-searchingMsg {\n  display: block;\n}\n.spwidgets-PeoplePicker-suggestions.is-searching .spwidgets-PeoplePicker-busy {\n  display: inline-block;\n  -webkit-animation: spwidgets-PeoplePicker-rotate 0.8s linear infinite;\n  animation: spwidgets-PeoplePicker-rotate 0.8s linear infinite;\n}\n.spwidgets-PeoplePicker--suggestionsRight .spwidgets-PeoplePicker-suggestions {\n  right: 0;\n}\n@-webkit-keyframes spwidgets-PeoplePicker-rotate {\n  from {\n    -ms-transform: rotate(0deg);\n    -moz-transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    -o-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  to {\n    -ms-transform: rotate(360deg);\n    -moz-transform: rotate(360deg);\n    -webkit-transform: rotate(360deg);\n    -o-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@keyframes spwidgets-PeoplePicker-rotate {\n  from {\n    -ms-transform: rotate(0deg);\n    -moz-transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    -o-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  to {\n    -ms-transform: rotate(360deg);\n    -moz-transform: rotate(360deg);\n    -webkit-transform: rotate(360deg);\n    -o-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n", "" ]);
    }, /* 131 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__ = __webpack_require__(8);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(2);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(0);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__ = __webpack_require__(3);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__ = __webpack_require__(7);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domAddClass__ = __webpack_require__(4);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__ = __webpack_require__(10);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8__TextField_html__ = __webpack_require__(132);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_8__TextField_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__TextField_html__);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_9__TextField_less__ = __webpack_require__(133);
        /* harmony import */
        __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__TextField_less__);
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create(), /**
 * A list field of type Text
 *
 * @class TextField
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} options
 * @param {ListColumnModel} [options.column={}]
 *  Although options, it is strongly suggested this be passed in on input, since
 *  some of display values are obtained from the list column definition - example
 *  the label (DisplayName) and field description if any.
 * @param {String} [options.value]
 * @param {Boolean} [options.hideLabel=false]
 * @param {String} [options.placeholder=""]
 *
 * @fires TextField#change
 * @fires TextField#key-enter
 */
        TextField = /** @lends TextField.prototype */ {
            init: function(options) {
                var _this = this;
                var inst = {
                    opt: Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options)
                };
                PRIVATE.set(this, inst);
                inst.opt.column || (inst.opt.column = {});
                var opt = inst.opt;
                var $ui = this.$ui = Object(__WEBPACK_IMPORTED_MODULE_5_common_micro_libs_src_jsutils_parseHTML__.a)(Object(__WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_fillTemplate__.a)(__WEBPACK_IMPORTED_MODULE_8__TextField_html___default.a, opt)).firstChild;
                var uiFind = $ui.querySelector.bind($ui);
                var $input = inst.input = uiFind(".ms-TextField-field");
                var emit = this.emit.bind(this);
                opt.hideLabel && Object(__WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domAddClass__.a)($ui, "spwidgets-TextField--noLabel");
                opt.hideDescription && Object(__WEBPACK_IMPORTED_MODULE_6_common_micro_libs_src_domutils_domAddClass__.a)($ui, "spwidgets-TextField--noDescription");
                opt.value && this.setValue(opt.value);
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__.a)($input, "input", function() {
                    /**
             * Text field input was changed.
             *
             * @event TextField#change
             *
             * @type {String}
             */
                    emit("change", $input.value);
                }.bind(this));
                Object(__WEBPACK_IMPORTED_MODULE_7_common_micro_libs_src_domutils_domAddEventListener__.a)($input, "keyup", function(ev) {
                    13 === ev.which && /**
                 * User clicked ENTER key on the input field
                 *
                 * @event TextField#key-enter
                 *
                 * @type {String}
                 */
                    emit("key-enter");
                });
                this.onDestroy(function() {
                    // Destroy all Compose object
                    Object.keys(inst).forEach(function(prop) {
                        if (inst[prop]) {
                            [ "destroy", // Compose
                            "remove", // DOM Events Listeners
                            "off" ].some(function(method) {
                                if (inst[prop][method]) {
                                    inst[prop][method]();
                                    return true;
                                }
                            });
                            inst[prop] = void 0;
                        }
                    });
                    PRIVATE.delete(_this);
                });
            },
            /**
     * Gets the value of the input.
     *
     * @returns {String}
     */
            getValue: function() {
                return PRIVATE.get(this).input.value;
            },
            /**
     * Sets the value of the input
     *
     * @param {String} newValue
     */
            setValue: function(newValue) {
                PRIVATE.get(this).input.value = newValue;
            },
            /**
     * Validates the input.
     *
     * @returns {Boolean}
     *  `true` = input if valid. `false`, input is invalid.
     */
            isValid: function() {
                var inst = PRIVATE.get(this);
                return !(inst.column.Required && !inst.input.value);
            },
            /**
     * Returns the native HTML input element of the widget
     *
     * @return {HTMLElement}
     */
            getInputEle: function() {
                return PRIVATE.get(this).input;
            },
            /**
     * Sets focus on the input field
     */
            setFocus: function() {
                this.getInputEle().focus();
            }
        };
        TextField = __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_EventEmitter__.a.extend(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Widget__.a, TextField);
        TextField.defaults = {
            column: null,
            hideLabel: false,
            hideDescription: false,
            placeholder: "",
            value: ""
        };
        /* harmony default export */
        __webpack_exports__.a = TextField;
    }, /* 132 */
    /***/
    function(module, exports) {
        module.exports = '<div class="ms-TextField ms-font-m spwidgets-TextField">\r\n    <label class="ms-Label">{{column.DisplayName}}</label>\r\n    <input class="ms-TextField-field" type="text" placeholder="{{placeholder}}" pattern="{{validationPattern}}">\r\n    <span class="ms-TextField-description">{{column.Description}}</span>\r\n</div>';
    }, /* 133 */
    /***/
    function(module, exports, __webpack_require__) {
        var content = __webpack_require__(134);
        "string" === typeof content && (content = [ [ module.i, content, "" ] ]);
        var options = {
            hmr: true
        };
        options.transform = void 0;
        options.insertInto = void 0;
        __webpack_require__(6)(content, options);
        content.locals && (module.exports = content.locals);
    }, /* 134 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)();
        // imports
        // module
        exports.push([ module.i, ".spwidgets-TextField input.ms-TextField-field {\n  min-width: 100%;\n}\n.spwidgets-TextField--noLabel .ms-Label {\n  display: none;\n}\n.spwidgets-TextField--noDescription .ms-TextField-description {\n  display: none;\n}\n", "" ]);
    } ]);
});
//# sourceMappingURL=SPWidgets.js.map