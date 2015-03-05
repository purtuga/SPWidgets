define([
    "jquery",
    "../sputils/cache",
    "./getSiteUrl",
    "../sputils/doesMsgHaveError"
], function(
    $,
    cache,
    getSiteUrl,
    doesMsgHaveError
){

    /**
     * Given a list name, this method will query the SP service and retrieve
     * the list of forms for it.
     *
     * @param {Object} options
     * @param {Object} options.searchText
     * @param {Object} [options.maxResults=50]
     * @param {Object} [options.principalType='All']
     *      Default is User. Others include: None, DistributionList,
     *      SecurityGroup, SharePointGroup, All
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
     */
    var searchPrincipals = (function(){

        var getData     = null,
            callerFn    = function(){
                            return getData.apply(this, arguments);
                        };

        // Define defaults. User can change these on their function attachment.
        callerFn.defaults = {
            searchText:     '',
            maxResults:     50,
            principalType:  'All',
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

            if (!options.webURL) {

                options.webURL = getSiteUrl();

            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                options.webURL += "/";

            }

            options.webURL += "_vti_bin/People.asmx";

            options.cacheKey = options.webURL + "?" +
                [
                    options.searchText,
                    options.maxResults,
                    options.principalType
                ].join("|");
            options.isCached = cache.isCached(options.cacheKey);

            // If cacheXML is true and we have a cached version, return it.
            if (options.cacheXML && options.isCached) {

                reqPromise =  cache(options.cacheKey);

                // If a completefunc was defined on this call,
                // execute it.
                if ($.isFunction(options.completefunc)) {

                    reqPromise.then(function(xdata, status){

                        options.completefunc(xdata, status);

                    });

                }

                return reqPromise;

            }

            // Return a deferred.
            reqPromise = $.Deferred(function(dfd){


                // If cacheXML is FALSE, and we have a cached version of this key,
                // then remove the cached version - basically reset
                if (options.isCached) {

                    cache.clear(options.cacheKey);

                }

                $.ajax({
                    type:           "POST",
                    cache:          false,
                    async:          options.async,
                    url:            options.webURL,
                    contentType:    "text/xml;charset=utf-8",
                    dataType:       "xml",
                    data:           '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '<soap:Body><SearchPrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">' +
                        '<searchText>' + options.searchText + '</searchText>' +
                        '<maxResults>' + options.maxResults + '</maxResults>' +
                        '<principalType>' + options.principalType + '</principalType>' +
                        '</SearchPrincipals></soap:Body></soap:Envelope>',
                    complete:       function(xdata, status) {

                        // Process Error from status
                        if (status === "error" || doesMsgHaveError(xdata)) {

                            // If cacheXML was true, then remove this from cache.
                            // No point in caching failures.
                            if (options.cacheXML) {

                                cache.clear(options.cacheKey);

                            }

                            dfd.rejectWith( $, [xdata, status] );
                            return;

                        }

                        dfd.resolveWith($, [xdata, status]);

                        if ($.isFunction(options.completefunc)) {

                            options.completefunc(xdata, status);

                        }

                    }//end: $.ajax().success()
                });

            }).promise(); //end: return .promise()

            // If cacheXML was true, then cache this promise
            if (options.cacheXML) {

                cache(options.cacheKey, reqPromise);

            }

            return reqPromise;

        }; //end: getData

        return callerFn;

    })(); //end: API.searchPrincipals()

    return searchPrincipals;
});

