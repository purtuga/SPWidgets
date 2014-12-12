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
     * Returns a Deferred that is resolved with an Array of Objects containing
     * the site list collection.
     *
     * Dependends on getSiteUrl()
     *
     * @param {Object} options
     *
     * @param {String} [options.webURL=currentSite]
     *          The site/sub-site for which the list collection
     *          is to be retrieved.
     * @param {Boolean} [options.cacheXML=false]
     *          If true, the XML response returned is cached for
     *          future calls.
     * @param {String|Array|Function} [options.filter=null]
     *          A string or array of strings with the list name or UID's
     *          that should be returned when the deferred is resolved.
     *
     * @return {jQuery.Promise}
     *          Promise is resolved with 3 input params:
     *          lists - Array of objects for the list collection
     *          xData - webservice Response XML Document
     *          status - jQuery async request status
     *
     *
     * Depends on:
     *
     * .getSiteUrl();
     * .doesMsgHaveError(0)
     *
     */
    API.getSiteListCollection = (function(options){

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
            webURL:         '',
            cacheXML:       false,
            async:          true,
            completefunc:   null,
            filter:         null
        };

        /**
         * Retrieves the data from Sharepoint
         */
        getData = function(opt){

            var options = $.extend({}, callerFn.defaults, opt),
                reqPromise;

            if (!options.webURL) {

                options.webURL = Me.getSiteUrl();

            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                options.webURL += "/";

            }

            options.webURL += "_vti_bin/SiteData.asmx";

            options.cacheKey = options.webURL + "?" + [options.filter].join("|");
            options.isCached = Me.cache.isCached(options.cacheKey);

            // If cacheXML is true and we have a cached version, return it.
            if (options.cacheXML && options.isCached) {

                reqPromise =  Me.cache(options.cacheKey);

                // If a completefunc was defined on this call,
                // execute it.
                if ($.isFunction(options.completefunc)) {

                    reqPromise.then(function(lists, xdata, status){

                        options.completefunc.call($, xdata, status, lists);

                    });

                }

                return reqPromise;

            }

            // Return a deferred.
            reqPromise = $.Deferred(function(dfd){

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
                    data:           '<?xml version="1.0" encoding="utf-8"?>' +
                        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '<soap:Body><GetListCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/">' +
                        '</GetListCollection></soap:Body></soap:Envelope>',
                    complete:       function(xdata, status) {

                        // Process Error from status
                        if (status === "error"|| Me.doesMsgHaveError(xdata)) {

                            // If cacheXML was true, then remove this from cache.
                            // No point in caching failures.
                            if (options.cacheXML) {

                                Me.cache.clear(options.cacheKey);

                            }

                            dfd.rejectWith( $, [null, xdata, status] );
                            return;

                        }

                        var $siteLists  = $(xdata.responseXML).find("_sList"),
                            lists       = [];

                        // TODO: Enhance return object so that each one has a method to .getList()


                        // FIXME: options.filter should support a Function as well.

                        // if we hav a filter defined, then make sure its an array
                        if (options.filter && !$.isArray(options.filter)) {

                            options.filter = [options.filter];

                        }

                        $siteLists.each(function(){

                            var $thisList   = $(this),
                                listDef     = {};

                            // if a filter was defined, then check to see
                            // if this list matches that filter name
                            if (    options.filter
                                &&  $.isArray(options.filter)
                                &&  $.inArray($thisList.find("Title").text(), options.filter) === -1
                                &&  $.inArray($thisList.find("InternalName").text(), options.filter) === -1
                            ) {

                                return;

                            }

                            $thisList.children().each(function(){

                                listDef[this.nodeName] = $(this).text();

                            });

                            lists.push(listDef);

                        });


                        dfd.resolveWith($, [lists, xdata, status]);

                        if ($.isFunction(options.completefunc)) {

                            options.completefunc(xdata, status, lists);

                        }

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

    })(); //end: API.getSiteListCollection

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));


