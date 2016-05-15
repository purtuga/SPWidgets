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
     * Given some text, the operation will search for user that match
     * that text.
     *
     * @param {Object} options
     * @param {Object} options.searchText
     * @param {Object} [options.maxResults=50]
     * @param {Object} [options.principalType='All']
     *      Default is User. Others include: None, DistributionList,
     *      SecurityGroup, SharePointGroup, All
     * @param {Object} [options.webUrl='currentSiteUrl']
     * @param {Object} [options.cache=true]
     *
     * @return {Promise<Array<UserProfileModel>, Error>}
     *  Promise is resolved with an array of UserProfileModels
     *  or rejected with an error.
     */
    var searchPrincipals = function(options){
        var opt = objectExtend({}, searchPrincipals.defaults, options),
            reqPromise;

        return getSiteWebUrl(opt.webURL).then(function(webURL) {
            opt.webURL      = webURL + "_vti_bin/People.asmx";
            opt.cacheKey    = opt.webURL + "?" +
                [
                    opt.searchText,
                    opt.maxResults,
                    opt.principalType
                ].join("|");

            opt.isCached = cache.isCached(opt.cacheKey);

            if (opt.cacheXML && opt.isCached) {
                return cache(opt.cacheKey);
            }

            cache.clear(opt.cacheKey);

            reqPromise = apiFetch(opt.webURL, {
                    method:     "POST",
                    headers:    {'Content-Type': 'text/xml;charset=UTF-8'},
                    body:       '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '<soap:Body><SearchPrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">' +
                        '<searchText>' + opt.searchText + '</searchText>' +
                        '<maxResults>' + opt.maxResults + '</maxResults>' +
                        '<principalType>' + opt.principalType + '</principalType>' +
                        '</SearchPrincipals></soap:Body></soap:Envelope>'
                })
                .then(function(response){
                    return domFind(response.content, "PrincipalInfo").map(function(principalInfo){
                        return Array.prototype.slice.call(principalInfo.childNodes, 0).reduce(function(profile, attrNode){
                            var attrName = attrNode.nodeName;

                            if (attrNode.nodeType === 1) {
                                profile[attrName] = attrNode.textContent;

                                if (attrName === "DisplayName") {
                                    profile.Name = profile[attrName];
                                }

                                if (attrName === "UserInfoID") {
                                    profile.ID = profile[attrName];
                                }
                            }
                            return profile;
                        }, opt.UserProfileModel.create());
                    });
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

    searchPrincipals.defaults = {
        searchText:         '',
        maxResults:         50,
        principalType:      'All',
        webURL:             '',
        cache:              true,
        UserProfileModel:   UserProfileModel
    };


    // SAMPLE XML response:
    // <?xml version="1.0" encoding="utf-8"?>
    //      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    //          <soap:Body>
    //              <SearchPrincipalsResponse xmlns="http://schemas.microsoft.com/sharepoint/soap/">
    //                  <SearchPrincipalsResult>
    //                      <PrincipalInfo>
    //                          <AccountName>i:0#.f|membership|jack.smith@tenant.com</AccountName>
    //                          <UserInfoID>12</UserInfoID>
    //                          <DisplayName>Jack Smith</DisplayName>
    //                          <Email>jack.smith@tenant.com</Email>
    //                          <IsResolved>true</IsResolved>
    //                          <PrincipalType>User</PrincipalType>
    //                      </PrincipalInfo>
    //                      <PrincipalInfo>
    //                          <AccountName>i:0#.f|membership|jack.miller@tenant.com</AccountName>
    //                          <UserInfoID>15</UserInfoID>
    //                          <DisplayName>Jack Miller</DisplayName>
    //                          <IsResolved>true</IsResolved>
    //                          <PrincipalType>User</PrincipalType>
    //                      </PrincipalInfo>
    //                  </SearchPrincipalsResult>
    //              </SearchPrincipalsResponse>
    //          </soap:Body>
    //  </soap:Envelope>




















//var old = (function(){
//
//        var getData     = null,
//            callerFn    = function(){
//                            return getData.apply(this, arguments);
//                        };
//
//        // Define defaults. User can change these on their function attachment.
//        callerFn.defaults = {
//            searchText:     '',
//            maxResults:     50,
//            principalType:  'All',
//            webURL:         '',
//            cacheXML:       false,
//            async:          true,
//            completefunc:   null
//        };
//
//        /**
//         * Retrieves the data from Sharepoint
//         */
//        getData = function(opt){
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
//            options.webURL += "_vti_bin/People.asmx";
//
//            options.cacheKey = options.webURL + "?" +
//                [
//                    options.searchText,
//                    options.maxResults,
//                    options.principalType
//                ].join("|");
//            options.isCached = cache.isCached(options.cacheKey);
//
//            // If cacheXML is true and we have a cached version, return it.
//            if (options.cacheXML && options.isCached) {
//
//                reqPromise =  cache(options.cacheKey);
//
//                // If a completefunc was defined on this call,
//                // execute it.
//                if ($.isFunction(options.completefunc)) {
//
//                    reqPromise.then(function(xdata, status){
//
//                        options.completefunc(xdata, status);
//
//                    });
//
//                }
//
//                return reqPromise;
//
//            }
//
//            // Return a deferred.
//            reqPromise = $.Deferred(function(dfd){
//
//
//                // If cacheXML is FALSE, and we have a cached version of this key,
//                // then remove the cached version - basically reset
//                if (options.isCached) {
//
//                    cache.clear(options.cacheKey);
//
//                }
//
//                $.ajax({
//                    type:           "POST",
//                    cache:          false,
//                    async:          options.async,
//                    url:            options.webURL,
//                    contentType:    "text/xml;charset=utf-8",
//                    dataType:       "xml",
//                    data:           '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
//                        '<soap:Body><SearchPrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">' +
//                        '<searchText>' + options.searchText + '</searchText>' +
//                        '<maxResults>' + options.maxResults + '</maxResults>' +
//                        '<principalType>' + options.principalType + '</principalType>' +
//                        '</SearchPrincipals></soap:Body></soap:Envelope>',
//                    complete:       function(xdata, status) {
//
//                        // Process Error from status
//                        if (status === "error" || doesMsgHaveError(xdata.responseXML)) {
//
//                            // If cacheXML was true, then remove this from cache.
//                            // No point in caching failures.
//                            if (options.cacheXML) {
//
//                                cache.clear(options.cacheKey);
//
//                            }
//
//                            dfd.rejectWith( $, [xdata, status] );
//                            return;
//
//                        }
//
//                        dfd.resolveWith($, [xdata, status]);
//
//                        if ($.isFunction(options.completefunc)) {
//
//                            options.completefunc(xdata, status);
//
//                        }
//
//                    }//end: $.ajax().success()
//                });
//
//            }).promise(); //end: return .promise()
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
//        }; //end: getData
//
//        return callerFn;
//
//    })(); //end: API.searchPrincipals()

    return searchPrincipals;
});

