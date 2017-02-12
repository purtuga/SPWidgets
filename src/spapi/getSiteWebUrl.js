import Promise  from "common-micro-libs/src/jsutils/es6-promise";
import apiFetch from "../sputils/apiFetch";
import cache    from "../sputils/cache";

/* global _spPageContextInfo, L_Menu_BaseUrl */

/**
 * Returns a Promise that resolves to the current site Web URL.
 * URL will end with a forward slash (/) and will always be a fully qualified
 * url (starting with http...).
 *
 * If this function is unable to determine the Site Url from data already
 * loaded, then it will call a webservice to retrieve it.
 *
 * @function
 *
 * @param {String} [pageUrl=document.location.href]
 *  The URL from where the Base Site Web URL will be obtained. Defaults to
 *  current page URL.
 *
 * @return {Promise}
 *  Resolves to a String representing the base Web URL of the site.
 *  Rejects if unable to determine the web URL.
 *
 * @throws Unable to determine site url
 *
 */
var getSiteUrl = function(pageUrl) {
    var page            = '',
        isThisPage      = false,
        errorMessage    = "getSiteUrl(): Unable to determine site url from " + pageUrl,
        cacheKey        = "getSiteWebUrl():",
        docLocation     = document.location,
        siteUrlResponse, siteUrl;

    if (!pageUrl) {
        page = docLocation.href;
        isThisPage  = true;

    } else {
        page = pageUrl;
    }


    // Get only the pure url up to the page... no URL params or hash.
    if (page.indexOf("?") > -1) {
        page = page.substr(0, page.indexOf("?"));

    } else if (page.indexOf("#") > -1) {
        page = page.substr(0, page.indexOf("#"));
    }
    cacheKey += page;

    siteUrlResponse = new Promise(function(resolve, reject){

        if (!page) {
            reject(new Error(errorMessage));
            return;
        }

        // If the URL site is already known, return it.
        if (cache.get(cacheKey)) {
            resolve(cache.get(cacheKey));
            return;
        }

        // If it is the current page, then try to determine the siteUrl
        // based on variables set by SharePoint
        if (isThisPage) {
            // DO we have _spPageContextInfo to work with?
            // Then use locate the web URL in one of several params
            if (
                typeof _spPageContextInfo !== "undefined"
                //&&
                //_spPageContextInfo.webServerRelativeUrl
            ) {
                [
                    'webAbsoluteUrl',
                    'webServerRelativeUrl'
                ].some(function(attr){
                    if (_spPageContextInfo[attr]) {
                        siteUrl = _spPageContextInfo[attr];
                        return true;
                    }
                });
            }

            // Do we have L_Menu_BaseUrl defined?
            if (!siteUrl && (typeof L_Menu_BaseUrl !== "undefined") && L_Menu_BaseUrl) {
                siteUrl = L_Menu_BaseUrl;
            }

            // ensure we get a full url starting with http
            if (siteUrl) {
                resolve(getFullUrl(siteUrl));
                return;
            }
        }

        // Lets try to validate webURL against current root site collection
        // Works only if running inside of SharePoint (ex. in webpart)
        apiFetch(getFullUrl("/_vti_bin/Webs.asmx", true), {
            method:     "POST",
            headers:    { 'Content-Type': 'text/xml;charset=UTF-8' },
            body:       "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><WebUrlFromPageUrl xmlns='http://schemas.microsoft.com/sharepoint/soap/' >" +
            "<pageUrl>" + page + "</pageUrl></WebUrlFromPageUrl></soap:Body></soap:Envelope>"
        })
            .then(
                function(response){
                    siteUrl = response.content.querySelector("WebUrlFromPageUrlResult").textContent;
                    resolve(getFullUrl(siteUrl));
                }

                // If request failed, then its likely because the page is not running
                // inside of SharePoint. If a webURL was passed on input, then lets
                // just assume that its correct and use it.
            )["catch"](function(error){
            if (pageUrl) {
                resolve(getFullUrl(pageUrl));
                return;
            }

            reject(error);
        });

    })["catch"](function(error){
        cache.clear(cacheKey);
        return Promise.reject(error);
    });

    if (page) {
        cache(cacheKey, siteUrlResponse);
    }

    return siteUrlResponse;
};

/**
 * Takes a relative URL (ex. /you/page.aspx) and returns the full
 * url starting wtih http...
 *
 * @param {String} pageAddress
 * @param {Boolean} [noEndSlash=false]
 *
 * @private
 */
var getFullUrl = function (pageAddress, noEndSlash) {

    // if URL does not end with "/" then insert it
    if (pageAddress && !noEndSlash && pageAddress.charAt(pageAddress.length - 1) !== "/") {
        pageAddress += "/";
    }

    if (pageAddress.toLowerCase().indexOf("http") > -1) {
        return pageAddress;
    }

    var docLocation = document.location;

    pageAddress = docLocation.protocol + "//" +
        docLocation.hostname +
        (   Number(docLocation.port) !== 80 &&
            Number(docLocation.port) > 0 ?
            ":" + docLocation.port :
                ""
        ) +
        pageAddress;

    return pageAddress;
};

export default getSiteUrl;

