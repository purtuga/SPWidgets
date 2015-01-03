define([], function(){

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
    var cache = (function(){

        var cacheData   = {},
            fnCaller    = function cache(key, value){

                if (!key) {

                    return;

                }

                // Getter
                if (typeof value === "undefined"){

                    return fnCaller.get(key);

                }

                // Setter
                return fnCaller.set(key, value);

            };

        /**
         * Clear specific key from cache.
         * @function cache.clear
         * @param {Object} key
         */
        fnCaller.clear = function(key){

            delete cacheData[key];

        };
        /**
         * Clears all cached data
         * @fucntion cache.clearAll
         */
        fnCaller.clearAll = function(){

            cacheData = {};

        };
         /**
         * Gets a cached piece of data
         * @function cache.get
         * @param {Object} key
         */
        fnCaller.get = function(key) {

            return cacheData[key];

        };
        /**
         * Caches a piece of data.
         * @function cache.set
         * @param {Object} key
         * @param {Object} value
         */
        fnCaller.set = function(key, value) {

            cacheData[key] = value;
            return value;

        };
        /**
         * Returns a boolean indicating if the give key has cached data.
         * @function cache.isCached
         * @param {Object} key
         * @return {Boolean}
         */
        fnCaller.isCached = function(key){

            if (cacheData.hasOwnProperty(key)) {

                return true;

            }

            return false;
        };

        return fnCaller;

    })(); //end: cache method.

    return cache;

});
