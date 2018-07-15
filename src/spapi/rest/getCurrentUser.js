import Promise              from "common-micro-libs/src/jsutils/es6-promise"
import objectExtend         from "common-micro-libs/src/jsutils/objectExtend"
import cache                from "../../sputils/cache"
import apiFetch             from "../../sputils/apiFetch"
import getContextInfo       from "./getContextInfo"
import {
    getRestHeaders,
    processUserInfo }       from "../../sputils/restUtils"
import UserProfileModel     from "../../models/UserProfileModel"

//================================================================
const currentUserCachekey = "getCurrentUserData(REST)";
const logIt = console.log.bind(console); // eslint-disable-line

/**
 * Get current user profile using SP REST interface.
 *
 * @param {Object} [options]
 * @param {String} [options.webURL=Current_Site]
 * @param {Object} [options.UserProfileModel=UserProfileModel]
 *
 * @return {Promise<UserProfileModel, Error>}
 */
export function getCurrentUser(options) {
    if (cache.get(currentUserCachekey)) {
        return cache.get(currentUserCachekey);
    }
    const opt = objectExtend({}, getCurrentUser.defaults, options);
    const response = getContextInfo(opt.webURL).then(contextInfo => {
        let webURL = contextInfo.WebFullUrl;

        // Because User Profile service is not available in Foundation, we ignore failures from that api call
        return Promise.all([
            getWebCurrentUser(webURL),
            getMyPropertiesFromUserProfile(webURL).catch(() => null)
        ]).then(([currentUser, userProfile]) => {
            if (userProfile) {
                objectExtend(userProfile, currentUser);
                // ID is coerced to a string for backward compatibility purposes
                // Id however is a Number
                userProfile.ID = userProfile.Id = userProfile.UserInfoID = String(currentUser.ID || currentUser.Id || "");
                if (userProfile.Id) {
                    userProfile.Id = Number(userProfile.Id);
                }
                return opt.UserProfileModel.create(userProfile);
            }
            return opt.UserProfileModel.create(currentUser);
        });
    });

    cache.set(currentUserCachekey, response);
    response
        .then(currentUser => {
            if (!currentUser.ID) {
                logIt("WARNING: currentUser.ID is not set!");
            }
        })
        .catch(e => {
            cache.clear(currentUserCachekey);
            logIt(e);
        });
    
    return response;
}

/**
 * Defaults input options for getCurrentUser
 *
 * @type {Object}
 */
getCurrentUser.defaults = {
    webURL:             null,
    UserProfileModel:   UserProfileModel
};


function getMyPropertiesFromUserProfile (webURL) {
    return apiFetch(`${ webURL }/_api/SP.UserProfiles.PeopleManager/GetMyProperties`, {
        method: "GET",
        headers: getRestHeaders(null, true)
    }).then(response => {
        const user = response.content.d;

        user.UserProfileProperties.results.forEach(userProp => user[userProp.Key] = userProp.Value);
        delete user.UserProfileProperties;

        return user;
    }).catch(e => {
        logIt(e);
        return Promise.reject(e);
    });


    // RESPONSE EXAMPLE:
    //  var d = {
    //      "d": {
    //          "__metadata": {
    //              "id": "https://company.sharepoint.com/sites/PT2013/_api/SP.UserProfiles.PeopleManager/GetMyProperties",
    //              "uri": "https://company.sharepoint.com/sites/PT2013/_api/SP.UserProfiles.PeopleManager/GetMyProperties",
    //              "type": "SP.UserProfiles.PersonProperties"
    //          },
    //          "AccountName": "i:0#.f|membership|paul.tavares@company.com",
    //          "DirectReports": {"__metadata": {"type": "Collection(Edm.String)"}, "results": []},
    //          "DisplayName": "Paul Tavares",
    //          "Email": "paultavares1@company.com",
    //          "ExtendedManagers": {"__metadata": {"type": "Collection(Edm.String)"}, "results": []},
    //          "ExtendedReports": {
    //              "__metadata": {"type": "Collection(Edm.String)"},
    //              "results": ["i:0#.f|membership|paul.tavares@company.com"]
    //          },
    //          "IsFollowed": false,
    //          "LatestPost": null,
    //          "Peers": {"__metadata": {"type": "Collection(Edm.String)"}, "results": []},
    //          "PersonalSiteHostUrl": "https://company-my.sharepoint.com:443/",
    //          "PersonalUrl": "https://company-my.sharepoint.com/personal/paul_tavares_company_com/",
    //          "PictureUrl": "https://company-my.sharepoint.com:443/User%20Photos/Profile%20Pictures/paul_tavares_company_com_MThumb.jpg?t=63523359043",
    //          "Title": null,
    //          "UserProfileProperties": {
    //              "results": [
    //                  {
    //                      "__metadata": {"type": "SP.KeyValue"},
    //                      "Key": "UserProfile_GUID",
    //                      "Value": "dff95339-1e6b-4392-a51f-7ecc6390cad6",
    //                      "ValueType": "Edm.String"
    //                  },
    //                  {
    //                      "__metadata": {"type": "SP.KeyValue"},
    //                      "Key": "SID",
    //                      "Value": "i:0h.f|membership|10033fff8524baa1@live.com",
    //                      "ValueType": "Edm.String"
    //                  }
    //              ]
    //          },
    //          "UserUrl": "https://company-my.sharepoint.com:443/Person.aspx?accountname=i%3A0%23%2Ef%7Cmembership%7Cpaul%2Etavares%company%2Ecom"
    //      }
    //  }
}

// SP2013 and above ++ Foundation
function getWebCurrentUser(webURL) {
    return apiFetch(`${ webURL }/_api/Web/CurrentUser`, {
        method: "GET",
        headers: getRestHeaders(null, true)
    }).then(response => {
        return processUserInfo(response.content.d);
    });

    // RESPONSE EXAMPLE:
    // /_api/Web/CurrentUser:
    //
    //      {
    //        "d": {
    //            "__metadata": {
    //                "id": "https://tenant.sharepoint.com/sites/siteName/_api/Web/GetUserById(11)",
    //                "uri": "https://tenant.sharepoint.com/sites/siteName/_api/Web/GetUserById(11)",
    //                "type": "SP.User"
    //            },
    //            "Alerts": {"__deferred": {"uri": "https://tenant.sharepoint.com/sites/siteName/_api/Web/GetUserById(11)/Alerts"}},
    //            "Groups": {"__deferred": {"uri": "https://tenant.sharepoint.com/sites/siteName/_api/Web/GetUserById(11)/Groups"}},
    //            "Id": 11,
    //            "IsHiddenInUI": false,
    //            "LoginName": "i:0#.f|membership|paul.tavares@company.com",
    //            "Title": "Paul Tavares",
    //            "PrincipalType": 1,
    //            "Email": "paul.tavares@company.com",
    //            "IsEmailAuthenticationGuestUser": false,
    //            "IsShareByEmailGuestUser": false,
    //            "IsSiteAdmin": true,
    //            "UserId": {
    //                "__metadata": {"type": "SP.UserIdInfo"},
    //                "NameId": "10033fff8524baa1",
    //                "NameIdIssuer": "urn:federation:microsoftonline"
    //            }
    //        }
    //    }
}

export default getCurrentUser;