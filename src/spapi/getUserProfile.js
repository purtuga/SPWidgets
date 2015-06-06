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
     * Retrieves a User's profile using the Login name (ex. DOMAIN\name). Data
     * is returned as an object, alogn with the webservices response.
     * @function
     *
     * @param {Object} options
     * @param {String} options.accountName
     * @param {Object} [options.otherAttr]
     * @param {String} [options.webURL=current site]
     * @param {Boolean} [options.async=true]
     * @param {Boolean} [options.cacheXML=true]
     *
     * @return {jQuery.Promise}
     *      Promise is resolved with 3 params - Object, xData, status. Object
     *      contains the properties for the user.
     */
    var getUserProfile = (function(){

        var
        /**
         * Calls the sharepoint webserices.
         * @function
         *
         * @param {Object} opt
         *
         * @return {jQuery.Promise}
         */
        wsCall      = null,

        /**
         * Function bound scope.
         * @type {Object}
         */
        Me          = null,

        /**
         * Function caller to be returned to the bound scope.
         */
        callerFn    = function getUserProfile(){

            if (Me === null) {

                Me = this;

            }

            return wsCall.apply(this, arguments);

        };

        // Define defaults. User can change these on their function attachment.
        callerFn.defaults = {
            accountName:    '',
            otherAttr:      '',
            webURL:         '',
            async:          true,
            cacheXML:       true,
            completefunc:   null // deprecated.
        };

        // Get rows from SP. Returns a jQuery.Promse
        wsCall = function (opt) {

            var options = $.extend({}, callerFn.defaults, opt),
                reqPromise;

            if (!options.webURL) {

                options.webURL = getSiteUrl();

            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                options.webURL += "/";

            }

            options.cacheKey = options.webURL + "/" + options.accountName;

            // If cache is true and we already
            if (options.cacheXML === true && cache.isCached(options.cacheKey)) {

                reqPromise = cache.get(options.cacheKey);

                // If a completefunc was defined on this call,
                // execute it.
                if ($.isFunction(options.completefunc)) {

                    reqPromise.then(function(rows, data, status){

                        options.completefunc(data, status, rows);

                    });

                }

                return reqPromise;

            }

            // Return a Promise
            reqPromise =  $.Deferred(function(dfd){

                // Make ajac call to SP webservice
                $.ajax({
                    type:           "POST",
                    cache:          false,
                    async:          options.async,
                    url:            options.webURL + "_vti_bin/UserProfileService.asmx",
                    beforeSend:     function(xhr) {

                        xhr.setRequestHeader(
                            'SOAPAction',
                            'http://microsoft.com/webservices/SharePointPortalServer/UserProfileService/GetUserProfileByName'
                        );

                    },
                    contentType:    "text/xml;charset=utf-8",
                    dataType:       "xml",
                    data:           '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '<soap:Body><GetUserProfileByName xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">' +
                        '<AccountName>' + options.accountName + '</AccountName></GetUserProfileByName></soap:Body></soap:Envelope>',
                    complete:       function(xData, status){

                        var $xmlDoc = $(xData.responseXML),
                            profile = {};

                        if (status === "error" || doesMsgHaveError($xmlDoc)) {

                            // If cacheXML was true, then remove this from cache.
                            // No point in caching failures.
                            if (options.cacheXML) {

                                cache.clear(options.cacheKey);

                            }

                            dfd.rejectWith($, [ {}, xData, status ]);

                            if ($.isFunction(options.completefunc)) {

                                options.completefunc(xData, status, {});

                            }

                            return;

                        }

                        $xmlDoc.find("PropertyData").each(function(){

                            var $prop = $(this);

                            profile[ $prop.find("Name").text() ] = $prop.find("Value").text() || "";

                        });

                        // If user passed in other Attributes, add it to the model
                        if (options.otherAttr) {
                            $.extend(profile, options.otherAttr);
                        }

                        dfd.resolveWith($, [profile, xData, status]);

                        if ($.isFunction(options.completefunc)) {

                            options.completefunc.call($, xData, status, profile);

                        }

                    }
                }); //end: .ajax()

            }).promise();

            // If cacheXML was true, then cache this promise
            if (options.cacheXML) {

                cache(options.cacheKey, reqPromise);

            }

            return reqPromise;

        }; //end: wsCall()

        return callerFn;

    })(); //end: .getUserProfile()

    return getUserProfile;
});
