/**
 * By default, this API method will add its self to jQuery under the following
 * namespace: $.SPAPI. This can be altered by defining an object named 'SPAPI'
 * just prior to loading/executing this code.
 *
 * @Example
 *
 *  // Load this API method into a custom namespace
 *  <script type="text/javascript">
 *      var SPAPI = {};
 *  </script>
 *  <script type"text/javascript" src="path/to/this/file.js"/>
 *
 */
(function($, namespace){

    var API = namespace || {};

    if (!namespace) {

        if (typeof $.SPAPI === "undefined") {

            $.SPAPI = API;

        } else {

            API = $.SPAPI;

        }

    }

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
    API.cache = (function(){

        var cacheData   = {},
            fnCaller    = function(key, value){

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

        fnCaller.clear = function(key){

            delete cacheData[key];

        };

        fnCaller.clearAll = function(){

            cacheData = {};

        };

        fnCaller.get = function(key) {

            return cacheData[key];

        };

        fnCaller.set = function(key, value) {

            cacheData[key] = value;
            return value;

        };

        fnCaller.isCached = function(key){

            if (cacheData.hasOwnProperty(key)) {

                return true;

            }

            return false;
        };

        return fnCaller;

    })(); //end: cache method.

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));
