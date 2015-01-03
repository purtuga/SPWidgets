define([
    "jquery",
    "../sputils/cache",
    "./getSiteUrl"
], function(
    $,
    cache,
    getSiteUrl
){

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
     */
    var getList = (function() {

        var getListData = null,
            callerFn    = function getList(){

                    getListData.apply(this, arguments);

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
        getListData = function(opt) {

            var options = $.extend({}, callerFn.defaults, opt),
                reqPromise;


            if (!options.webURL) {

                options.webURL = getSiteUrl();

            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                options.webURL += "/";

            }

            options.webURL += "_vti_bin/Lists.asmx";

            options.cacheKey = options.webURL + "?List=" + options.listName;
            options.isCached = cache.isCached(options.cacheKey);

            // If cacheXML is true and we have a cached version, return it.
            if (options.cacheXML && options.isCached) {

                reqPromise =  cache(options.cacheKey);

                // If a completefunc was defined on this call,
                // execute it.
                if ($.isFunction(options.completefunc)) {

                    reqPromise.then(function(data, textStatus, jqXHR){

                        options.completefunc(jqXHR, textStatus);

                    });

                }

                return reqPromise;

            }

            // If cacheXML is FALSE, and we have a cached version of this key,
            // then remove the cached version - basically reset
            if (options.isCached) {

                cache.clear(options.cacheKey);

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

                    dfd.resolveWith($, [data, textStatus, jqXHR]);

                    if ($.isFunction(options.completefunc)) {

                        // Call the complete function (same signature as SPServices)
                        options.completefunc(jqXHR, textStatus);

                    }

                })
                .fail(function(){

                    dfd.rejectWith($, arguments);

                    // If cacheXML was true, then remove this from cache.
                    // No point in caching failures.
                    if (options.cacheXML) {

                        cache.clear(options.cacheKey);

                    }


                });

            }).promise();

            // If cacheXML was true, then cache this promise
            if (options.cacheXML) {

                cache(options.cacheKey, reqPromise);

            }

            return reqPromise;

        }; //end: function()

        return callerFn;

    })(); //end: .getList()


    return getList;

});
