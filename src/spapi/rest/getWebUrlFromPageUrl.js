import Promise              from "common-micro-libs/src/jsutils/es6-promise"
import getFullUrl           from "../../sputils/getFullUrl"
import { getRestHeaders }   from "../../sputils/restUtils"
import cache                from "../../sputils/cache"
import apiFetch             from "../../sputils/apiFetch"

/**
 * Returns the Site Web url for a given page url.
 * Url returned will end with a forward slash (`/`).
 * Example:
 *
 *      https://yourtenant.sharepoint.com/sites/A/
 *
 * @param {String} [pageUrl=location.href]
 *  current serving page will be used if left empty
 *
 * @return {Promise<String, Error>}
 */
export default function getWebUrlFromPageUrl(pageUrl) {
    let isThisPage = false;

    if (!pageUrl) {
        pageUrl = location.href;
        isThisPage  = true;
    }

    // Get only the pure url up to the page... no URL params or hash.
    if (pageUrl.indexOf("?") > -1) {
        pageUrl = pageUrl.substr(0, pageUrl.indexOf("?"));

    }
    else if (pageUrl.indexOf("#") > -1) {
        pageUrl = pageUrl.substr(0, pageUrl.indexOf("#"));
    }

    pageUrl = getFullUrl(pageUrl);
    const cacheKey = `getWebUrlFromPageUrl():${ pageUrl }`.toLowerCase();

    if (cache.get(cacheKey)) {
        return cache.get(cacheKey);
    }

    let siteUrl = "";

    // DO we have _spPageContextInfo to work with? Then use it to locate the web URL in
    // one of several params. We'll then use that to query SP or resolve this request if
    // the current page URL is being used.
    if (typeof _spPageContextInfo !== "undefined") {
        ['webAbsoluteUrl', 'webServerRelativeUrl'].some(function(attr){
            if (_spPageContextInfo[attr]) {
                siteUrl = _spPageContextInfo[attr];
                return true;
            }
        });
    }

    // If it is the current page, then try to determine the siteUrl
    // based on variables set by SharePoint
    if (isThisPage && siteUrl) {
        siteUrl = getFullUrl(siteUrl);
        cache.set(cacheKey, Promise.resolve(siteUrl));
        return cache.get(cacheKey);
    }

    // Last resolve - make an API call
    const apiRequest = apiFetch(
            `${ getFullUrl(`${ siteUrl }/_api`) }sp.web.getweburlfrompageurl(@v)?@v='${ encodeURIComponent(pageUrl) }'`,
            {
                method: "GET",
                headers: getRestHeaders()
            }
        )
        .then(response => getFullUrl(response.content.d.GetWebUrlFromPageUrl));

    cache.set(cacheKey, apiRequest);
    apiRequest.catch(e => {
        cache.clear(cacheKey);
        console.log(e); // eslint-disable-line
    });

    return apiRequest;
}
