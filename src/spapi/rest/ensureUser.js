import objectExtend         from "common-micro-libs/src/jsutils/objectExtend"
import getContextInfo       from "./getContextInfo"
import apiFetch             from "../../sputils/apiFetch"
import { getRestHeaders }   from "../../sputils/restUtils"
import cache                from "../../sputils/cache"
import UserProfileModel     from "../../models/UserProfileModel"

//===========================================================================

/**
 * Ensures that a given user is added to the current site, which then returns the
 * `ID` of that user as present in the User information table.
 *
 * @param options
 * @param {String} options.logonName
 * @param {String} [options.webURL]
 * @param {Boolean} [options.cache=true]
 * @param {UserProfileModel} [options.UserProfileModel=UserProfileModel]
 *
 * @return {Promise<UserProfileModel, Error>}
 *
 * @see https://msdn.microsoft.com/en-us/library/office/dn499819%28v=office.15%29.aspx?f=255&MSPPError=-2147217396#bk_WebEnsureUser
 * @see https://msdn.microsoft.com/en-us/library/office/dn531432.aspx#bk_User
 */
export default function ensureUser (options) {
    const opt = objectExtend({
        logonName: "",
        webURL: "",
        cache: true,
        UserProfileModel
    }, options);

    return getContextInfo(opt.webURL)
        .then(contextInfo => {
            opt.webURL = contextInfo.WebFullUrl;
            const cacheKey = `${opt.webURL}?${ opt.logonName }`;

            if (opt.cache && cache.get(cacheKey)) {
                return cache.get(cacheKey).then(response => processApiResponse(response, opt));
            }
            else if (!opt.cache) {
                cache.clear(cacheKey);
            }


            const apiRequest = apiFetch(`${ contextInfo.WebFullUrl }/_api/web/ensureuser`, {
                method:     "POST",
                headers:    getRestHeaders(contextInfo),
                body:       JSON.stringify({
                    logonName: opt.logonName
                })
            });

            if (opt.cache) {
                cache.set(cacheKey, apiRequest);

                apiRequest.catch(e => {
                    cache.clear(cacheKey);
                    console.log(e); // eslint-disable-line
                });
            }

            return apiRequest.then(response => processApiResponse(response, opt));
        });
}

function processApiResponse(response, opt) {
    const user = response.content.d;

    if (user.Title && !user.FirstName) {
        [ user.FirstName, user.LastName ] = user.Title.split(" ");
    }

    return opt.UserProfileModel.create(user, opt);
}


// SAMPLE RESPONSE:
//
//      {
//          "d": {
//              "__metadata": {
//                  "id": "https://tenant.sharepoint.com/sites/siteName/_api/Web/GetUserById(11)",
//                  "uri": "https://tenant.sharepoint.com/sites/siteName/_api/Web/GetUserById(11)",
//                  "type": "SP.User"
//              },
//              "Alerts": {"__deferred": {"uri": "https://tenant.sharepoint.com/sites/siteName/_api/Web/GetUserById(11)/Alerts"}},
//              "Groups": {"__deferred": {"uri": "https://tenant.sharepoint.com/sites/siteName/_api/Web/GetUserById(11)/Groups"}},
//              "Id": 11,
//              "IsHiddenInUI": false,
//              "LoginName": "i:0#.f|membership|paul.tavares@tenantname.com",
//              "Title": "Paul Tavares",
//              "PrincipalType": 1,
//              "Email": "paultavares@tenantname.com",
//              "IsEmailAuthenticationGuestUser": false,
//              "IsShareByEmailGuestUser": false,
//              "IsSiteAdmin": true,
//              "UserId": {
//                  "__metadata": {"type": "SP.UserIdInfo"},
//                  "NameId": "10033fff8524baa1",
//                  "NameIdIssuer": "urn:federation:microsoftonline"
//              }
//          }
//      }

