define([
    "../sputils/apiFetch",
    "../sputils/cache",
    "./getSiteWebUrl",
    "../models/UserProfileModel",

    "vendor/jsutils/objectExtend",
    "vendor/domutils/domFind"
], function(
    apiFetch,
    cache,
    getSiteWebUrl,
    UserProfileModel,

    objectExtend,
    domFind
){

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
     *  Any other attribute that should be added to the user profile model
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
    var getUserProfile = function(options){

        var opt = objectExtend({}, getUserProfile.defaults, options),
            reqPromise;

        // backward comparability
        if (typeof opt.cacheXML !== "undefined") {
            opt.cache = opt.cacheXML;
        }

        return getSiteWebUrl(opt.webURL).then(function(webURL) {
            opt.webURL      = webURL + "_vti_bin/UserProfileService.asmx";
            opt.cacheKey    = opt.webURL + "/?accountName=" + opt.accountName;
            opt.isCached    = cache.isCached(opt.cacheKey);

            // If cacheXML is true and we have a cached version, return it.
            if (opt.cacheXML && opt.isCached) {
                return cache(opt.cacheKey);
            }

            if (opt.isCached) {
                cache.clear(opt.cacheKey);
            }

            reqPromise = apiFetch(opt.webURL, {
                    method:     "POST",
                    headers:    {
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'SOAPAction':   'http://microsoft.com/webservices/SharePointPortalServer/UserProfileService/GetUserProfileByName'
                    },
                    body: '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '<soap:Body><GetUserProfileByName xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">' +
                        '<AccountName>' + opt.accountName + '</AccountName></GetUserProfileByName></soap:Body></soap:Envelope>'
                })
                .then(function(response){
                    var profile = {};

                    domFind(response.content, "PropertyData").forEach(function($prop){
                        var propName    = domFind($prop, "Name")[0].textContent || "",
                            propValue   = domFind($prop, "Value")[0].textContent || "";

                        profile[propName] = propValue;
                    });

                    // If user passed in other Attributes, add it to the model
                    if (opt.otherAttr) {
                        objectExtend(profile, opt.otherAttr);
                    }

                    if (typeof profile.DisplayName === "undefined") {
                        profile.DisplayName = profile.Name || "";
                    }

                    return opt.UserProfileModel.create(profile);
                });

            if (opt.cache) {
                cache(opt.cacheKey, reqPromise);
            }

            reqPromise["catch"](function () {
                cache.clear(opt.cacheKey, reqPromise);
            });

            return reqPromise;
        });
    };

    getUserProfile.defaults = {
        accountName:        '',
        otherAttr:          '',
        webURL:             '',
        cache:              true,
        UserProfileModel:   UserProfileModel
    };



//var old = (function(){
//
//        var
//        /**
//         * Calls the sharepoint webserices.
//         * @function
//         *
//         * @param {Object} opt
//         *
//         * @return {jQuery.Promise}
//         */
//        wsCall      = null,
//
//        /**
//         * Function bound scope.
//         * @type {Object}
//         */
//        Me          = null,
//
//        /**
//         * Function caller to be returned to the bound scope.
//         */
//        callerFn    = function getUserProfile(){
//
//            if (Me === null) {
//
//                Me = this;
//
//            }
//
//            return wsCall.apply(this, arguments);
//
//        };
//
//        // Define defaults. User can change these on their function attachment.
//        callerFn.defaults = {
//            accountName:    '',
//            otherAttr:      '',
//            webURL:         '',
//            async:          true,
//            cacheXML:       true,
//            completefunc:   null // deprecated.
//        };
//
//        // Get rows from SP. Returns a jQuery.Promse
//        wsCall = function (opt) {
//
//            var options = $.extend({}, callerFn.defaults, opt),
//                reqPromise;
//
//            if (!options.webURL) {
//
//                options.webURL = getSiteUrl();
//
//            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {
//
//                options.webURL += "/";
//
//            }
//
//            options.cacheKey = options.webURL + "/" + options.accountName;
//
//            // If cache is true and we already
//            if (options.cacheXML === true && cache.isCached(options.cacheKey)) {
//
//                reqPromise = cache.get(options.cacheKey);
//
//                // If a completefunc was defined on this call,
//                // execute it.
//                if ($.isFunction(options.completefunc)) {
//
//                    reqPromise.then(function(rows, data, status){
//
//                        options.completefunc(data, status, rows);
//
//                    });
//
//                }
//
//                return reqPromise;
//
//            }
//
//            // Return a Promise
//            reqPromise =  $.Deferred(function(dfd){
//
//                // Make ajac call to SP webservice
//                $.ajax({
//                    type:           "POST",
//                    cache:          false,
//                    async:          options.async,
//                    url:            options.webURL + "_vti_bin/UserProfileService.asmx",
//                    beforeSend:     function(xhr) {
//
//                        xhr.setRequestHeader(
//                            'SOAPAction',
//                            'http://microsoft.com/webservices/SharePointPortalServer/UserProfileService/GetUserProfileByName'
//                        );
//
//                    },
//                    contentType:    "text/xml;charset=utf-8",
//                    dataType:       "xml",
//                    data:           '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
//                        '<soap:Body><GetUserProfileByName xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">' +
//                        '<AccountName>' + options.accountName + '</AccountName></GetUserProfileByName></soap:Body></soap:Envelope>',
//                    complete:       function(xData, status){
//
//                        var $xmlDoc = $(xData.responseXML),
//                            profile = {};
//
//                        if (status === "error" || doesMsgHaveError($xmlDoc)) {
//
//                            // If cacheXML was true, then remove this from cache.
//                            // No point in caching failures.
//                            if (options.cacheXML) {
//
//                                cache.clear(options.cacheKey);
//
//                            }
//
//                            dfd.rejectWith($, [ {}, xData, status ]);
//
//                            if ($.isFunction(options.completefunc)) {
//
//                                options.completefunc(xData, status, {});
//
//                            }
//
//                            return;
//
//                        }
//
//                        $xmlDoc.find("PropertyData").each(function(){
//
//                            var $prop = $(this);
//
//                            profile[ $prop.find("Name").text() ] = $prop.find("Value").text() || "";
//
//                        });
//
//                        // If user passed in other Attributes, add it to the model
//                        if (options.otherAttr) {
//                            $.extend(profile, options.otherAttr);
//                        }
//
//                        dfd.resolveWith($, [profile, xData, status]);
//
//                        if ($.isFunction(options.completefunc)) {
//
//                            options.completefunc.call($, xData, status, profile);
//
//                        }
//
//                    }
//                }); //end: .ajax()
//
//            }).promise();
//
//            // If cacheXML was true, then cache this promise
//            if (options.cacheXML) {
//
//                cache(options.cacheKey, reqPromise);
//
//            }
//
//            return reqPromise;
//
//        }; //end: wsCall()
//
//        return callerFn;
//
//    })(); //end: .getUserProfile()

    return getUserProfile;
});
