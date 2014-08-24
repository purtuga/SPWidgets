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
     * Get a list definition from sharepoint or return its cached version
     * if one exists.
     * @function
     *
     * @param {Object} options
     *
     * @param {String} options.listName
     * @param {String} [options.webURL='']
     * @param {Boolean} [options.async=true]
     * @param {Boolean} [options.cacheXML=true]
     *      The message response is cached UNTIL the next time the same
     *      request is received with cacheXML set to false.
     * @param {Function} [options.completefunc=null]
     *      Deprecated. Use returned promise to process response.
     *
     * @return {jQuery.Promise}
     *          Resolved with 3 input params: data, textStatus, jqXHR
     *
     * Depends on:
     *
     * .cache()
     * .getSiteUrl()
     *
     */
    API.getList = (function() {

        var getList     = null,
            callerFn    = function(){

                    getList.apply(this, arguments);

            };

        // Define defaults. User can change these on their function attachement.
        callerFn.defaults = {
            listName:       '',
            webURL:         '',
            cacheXML:       true,
            async:          true,
            completefunc:   null
        };

        // Makes the ajax call to sharepoint and returns a jQuery.promise
        getList = function(opt) {

            var Me  = this,
                options = $.extend({}, callerFn.defaults, opt),
                reqPromise;


            if (!options.webURL) {

                options.webURL = Me.getSiteUrl();

            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                options.webURL += "/";

            }

            options.webURL += "_vti_bin/Lists.asmx";

            options.cacheKey = options.webURL + "?List=" + options.listname;
            options.isCached = Me.cache.isCached(options.cacheKey);

            // If cacheXML is true and we have a cached version, return it.
            if (options.cacheXML && options.isCached) {

                reqPromise =  Me.cache(options.cacheKey);

                // If a completefunc was defined on this call,
                // execute it.
                if ($.isFunction(options.completefunc)) {

                    reqPromise.then(function(data, textStatus, jqXHR){

                        options.completefunc.call($, jqXHR, textStatus);

                    });

                }

                return reqPromise;

            }

            // If cacheXML is FALSE, and we have a cached version of this key,
            // then remove the cached version - basically reset
            if (options.isCached) {

                Me.cache.clear(options.cacheKey);

            }

            reqPromise = $.Deferred(function(dfd){

                $.ajax({
                    type:           "POST",
                    cache:          false,
                    async:          options.async,
                    url:            options.webURL,
                    contentType:    "text/xml;charset=utf-8",
                    dataType:       "xml",
                    data:           '<?xml version="1.0" encoding="utf-8"?>' +
                        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '<soap:Body><GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>' +
                        options.listName + '</listName></GetList></soap:Body></soap:Envelope>'
                })
                .done(function(data, textStatus, jqXHR){

                    if ($.isFunction(options.completefunc)) {

                        // Call the complete function (same signature as SPServices)
                        options.completefunc.call($, jqXHR, textStatus);

                    }

                    dfd.resolveWith($, [data, textStatus, jqXHR]);

                })
                .fail(function(){

                    // If cacheXML was true, then remove this from cache.
                    // No point in caching failures.
                    if (options.cacheXML) {

                        Me.cache.clear(options.cacheKey);

                    }

                    dfd.rejectWith($, arguments);

                });

            }).promise();

            // If cacheXML was true, then cache this promise
            if (options.cacheXML) {

                Me.cache(options.cacheKey, reqPromise);

            }

            return reqPromise;

        }; //end: function()

        return callerFn;

    })(); //end: API.getList()

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));
