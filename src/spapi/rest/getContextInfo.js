import getWebUrlFromPageUrl from "./getWebUrlFromPageUrl"
import apiFetch             from "../../sputils/apiFetch"
import cache                from "../../sputils/cache"
import { getRestHeaders }   from "../../sputils/restUtils"

//----------------------------------------------------------------

/**
 * Gets the SharePoint (2013 or above) context by calling the associated api.
 *
 * @param {String} [webURL]
 *  The Web site URL for the requested Context. Default is get get current page's
 *  web site URL.
 *
 * @param {Boolean} [noCache]
 *  By default, context data is cached for the amount of time as reported valid in the
 *  api response. Set this param to false, to not return cached result.
 *
 * @return {Promise<ContextWebInformation, Error>}
 */
export default function getContextInfo (webURL, noCache) {
    // FIXME: should we try to get it from here:  $("#__REQUESTDIGEST").val() if available
    // FIXME: should we get it from _spPageContextInfo.formDigestValue if available?

    return getWebUrlFromPageUrl(webURL).then(siteWebURL => {
        const apiUrl = `${ siteWebURL }_api/contextinfo`;
        let apiResponse;

        if (!noCache && cache.isCached(apiUrl)) {
            return cache.get(apiUrl);
        }
        else if (noCache) {
            apiResponse = cache.get(apiUrl);
            if (apiResponse) {
                cache.clear(apiUrl);
                clearTimeout(apiResponse._settimeout);
                apiResponse = null;
            }
        }

        apiResponse = apiFetch(apiUrl, {
            method:     "POST",
            headers:    getRestHeaders()
        }).then(response => {
            /**
             * A SharePoint Web Context information object.
             *
             * @typedef {Object} ContextWebInformation
             * @see https://msdn.microsoft.com/en-us/library/hh624285(v=office.16).aspx
             * @see https://msdn.microsoft.com/en-us/library/office/dn600183.aspx#bk_ContextWebInformation
             *
             * @property {Number} FormDigestTimeoutSeconds
             *  Specifies the amount of time in seconds before security validation expires
             *
             * @property {String} FormDigestValue
             *  Specifies a valid form digest for the site.
             *
             * @property {String} LibraryVersion
             *  Specifies the library version.
             *
             * @property {String} SiteFullUrl
             *  Specifies the URL of the site collection that contains the site.
             *
             * @property {Object} SupportedSchemaVersions
             *  Specifies the supported client-side object model (CSOM) request schema version
             *
             * @property {String} WebFullUrl
             *  Specifies the URL of the site.
             */
            const contextInfo = Object.freeze(response.content);

            // Expire the cached version 1 minute before the set expiration on the form digest.
            apiResponse._settimeout = setTimeout(() => {
                cache.clear(apiUrl);
                apiResponse._settimeout = null;
            }, (contextInfo.FormDigestTimeoutSeconds - 1) * 1000);

            return contextInfo;
        });

        // Cache the request
        cache.set(apiUrl, apiResponse);
        apiResponse.catch(e => console.log(e)); // eslint-disable-line
        return apiResponse.then(response => response);
    });
}

// RESPONSE EXAMPLE:
//
//  {
//      "d": {
//          "GetContextWebInformation": {
//              "__metadata": {"type": "SP.ContextWebInformation"},
//              "FormDigestTimeoutSeconds": 1800,
//              "FormDigestValue": "0xC5300B3C2....935BCB,20 Dec 2017 00:01:21 -0000",
//              "LibraryVersion": "16.0.7206.1207",
//              "SiteFullUrl": "https://myTenant.sharepoint.com/sites/PT2013",
//              "SupportedSchemaVersions": {
//                  "__metadata": {"type": "Collection(Edm.String)"},
//                  "results": ["14.0.0.0", "15.0.0.0"]
//              },
//              "WebFullUrl": "https://myTenant.sharepoint.com/sites/PT2013"
//          }
//      }
//  }
