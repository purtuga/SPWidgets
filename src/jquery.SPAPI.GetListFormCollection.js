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
     * Given a list name, this method will query the SP service and retrieve
     * the list of forms for it.
     *
     * @param {Object} options
     * @param {Object} options.listName
     * @param {Object} [options.webUrl='currentSiteUrl']
     * @param {Object} [options.cacheXML=false]
     * @param {Object} [options.async=true]
     * @param {Object} [options.completefunc]
     *      Options is deprecated. Use .promise that is returned.
     *
     * @return {jQuery.Promise}
     *      Promise is resolved with two input params:
     *      XMLDocument : Response from Sharepoint
     *      status : the ajax status string (error or success)
     *
     * Depends on:
     *
     * .getSiteUrl()
     * .doesMsgHaveError()
     * .cache()
     */
    API.getListFormCollection = (function(){

        var getData     = null,
            Me          = null,
            callerFn    = function(){

                            if (Me === null) {

                                Me = this;

                            }

                            return getData.apply(this, arguments);

                        };

        // Define defaults. User can change these on their function attachment.
        callerFn.defaults = {
            listName:       '',
            webURL:         '',
            cacheXML:       false,
            async:          true,
            completefunc:   null
        };

        /**
         * Retrieves the data from Sharepoint
         */
        getData = function(opt){

            var options = $.extend({}, callerFn.defaults, opt),
                reqPromise;

            // Return a deferred.
            reqPromise = $.Deferred(function(dfd){

                if (!options.webURL) {

                    options.webURL = Me.getSiteUrl();

                } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                    options.webURL += "/";

                }

                options.webURL += "_vti_bin/Forms.asmx";

                options.cacheKey = options.webURL + "?List=" + options.listname;
                options.isCached = Me.cache.isCached(options.cacheKey);

                // If cacheXML is true and we have a cached version, return it.
                if (options.cacheXML && options.isCached) {

                    reqPromise =  Me.cache(options.cacheKey);

                    // If a completefunc was defined on this call,
                    // execute it.
                    if ($.isFunction(options.completefunc)) {

                        reqPromise.then(function(xdata, status){

                            options.completefunc.call($, xdata, status);

                        });

                    }

                    return reqPromise;

                }

                // If cacheXML is FALSE, and we have a cached version of this key,
                // then remove the cached version - basically reset
                if (options.isCached) {

                    Me.cache.clear(options.cacheKey);

                }

                $.ajax({
                    type:           "POST",
                    cache:          false,
                    async:          options.async,
                    url:            options.webURL,
                    contentType:    "text/xml;charset=utf-8",
                    dataType:       "xml",
                    data:           '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '<soap:Body><GetFormCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/">' +
                        '<listName>' + options.listName + '</listName></GetFormCollection></soap:Body></soap:Envelope>',
                    complete:       function(xdata, status) {

                        // Process Error from status
                        if (status === "error" || Me.doesMsgHaveError(xdata)) {

                            // If cacheXML was true, then remove this from cache.
                            // No point in caching failures.
                            if (options.cacheXML) {

                                Me.cache.clear(options.cacheKey);

                            }

                            dfd.rejectWith( $, [xdata, status] );
                            return;

                        }

                        if ($.isFunction(options.completefunc)) {

                            options.completefunc.call($, xdata, status);

                        }

                        dfd.resolveWith($, [xdata, status]);

                    }//end: $.ajax().success()
                });

            }).promise(); //end: return .promise()

            // If cacheXML was true, then cache this promise
            if (options.cacheXML) {

                Me.cache(options.cacheKey, reqPromise);

            }

            return reqPromise;

        }; //end: getData

        return callerFn;

    })(); //end: API.getListFormCollection()

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));
