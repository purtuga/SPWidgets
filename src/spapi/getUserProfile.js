import apiFetch from "../sputils/apiFetch";
import cache from "../sputils/cache";
import getSiteWebUrl from "./getSiteWebUrl";
import UserProfileModel from "../models/UserProfileModel";
import objectExtend from "common-micro-libs/src/jsutils/objectExtend";
import domFind from "common-micro-libs/src/domutils/domFind";

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
 *  Any other attribute that should be added to the user profile model.
 *  These are added prior to the ones retrieved from `getUserProfile`,
 *  thus they may be overwritten.
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
        opt.webURL      = webURL;
        opt.cacheKey    = opt.webURL + "/?accountName=" + opt.accountName;
        opt.isCached    = cache.isCached(opt.cacheKey);

        // If cache is true and we have a cached version, return it.
        if (opt.cache && opt.isCached) {
            return cache(opt.cacheKey);
        }

        if (opt.isCached) {
            cache.clear(opt.cacheKey);
        }

        reqPromise = apiFetch(webURL + "_vti_bin/UserProfileService.asmx", {
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

                // If user passed in other Attributes, add it to the model
                if (opt.otherAttr) {
                    objectExtend(profile, opt.otherAttr);
                }

                domFind(response.content, "PropertyData").forEach(function($prop){
                    var nameEle     = domFind($prop, "Name")[0],
                        valueEle    = domFind($prop, "Value")[0],
                        propName    = nameEle ? nameEle.textContent || "" : "",
                        propValue   = valueEle ? valueEle.textContent || "" : "";

                    profile[propName] = propValue;
                });

                if (typeof profile.DisplayName === "undefined") {
                    profile.DisplayName = profile.Name || "";
                }

                return opt.UserProfileModel.create(profile, { webURL: opt.webURL });
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

export default getUserProfile;

