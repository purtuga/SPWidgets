define(function(){

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
    if (typeof WeakMap === 'undefined') {
      (function() {
        var defineProperty = Object.defineProperty;
        var counter = Date.now() % 1e9;

        var WeakMap = function() {
          this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
        };

        WeakMap.prototype = {
          set: function(key, value) {
            var entry = key[this.name];
            if (entry && entry[0] === key)
              entry[1] = value;
            else
              defineProperty(key, this.name, {value: [key, value], writable: true});
            return this;
          },
          get: function(key) {
            var entry;
            return (entry = key[this.name]) && entry[0] === key ?
                entry[1] : undefined;
          },
          // [pt] Quotes around the delete property needed for IE8
          "delete": function(key) {
            var entry = key[this.name];
            if (!entry || entry[0] !== key) return false;
            entry[0] = entry[1] = undefined;
            return true;
          },
          has: function(key) {
            var entry = key[this.name];
            if (!entry) return false;
            return entry[0] === key;
          }
        };

        window.WeakMap = WeakMap;
      })();
    }
    /* jshint ignore:end */

    /**
     * Returns an object that contains an initialized WeakMap (`stash` property)
     * where data can be stored.
     *
     * @namespace dataStore
     *
     */
    var dataStore = /** @lends dataStore */{
        /**
         * Stash data here.
         * @type WeakMap
         */
        stash:  new WeakMap(),
        /**
         * Create a private data store and return it.
         * @return {WeakMap}
         */
        create: function(){
            return new WeakMap();
        }
    };

    return dataStore;

});