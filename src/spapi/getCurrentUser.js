import fetchPolyfill    from "common-micro-libs/src/jsutils/es7-fetch"
import objectExtend     from "common-micro-libs/src/jsutils/objectExtend"
import Promise          from "common-micro-libs/src/jsutils/es6-promise"
import parseHTML        from "common-micro-libs/src/jsutils/parseHTML"
import domFind          from "common-micro-libs/src/domutils/domFind"

import cache            from "../sputils/cache"
import getSiteWebUrl    from "./getSiteWebUrl"
import searchPrincipals from "./searchPrincipals"
import getUserProfile   from "./getUserProfile"
import UserProfileModel from "../models/UserProfileModel"


//-----------------------------------------------------------------------
/* globals _spPageContextInfo  */
const fetch                             = fetchPolyfill.fetch;
const UNABLE_TO_GET_USER_FROM_SCRAPING  = "Unable to get ID from scraping userdisp.aspx.";
const PROMISE_CATCH                     = "catch";

/**
 * Returns a `UserProfileModel` that represents the currently logged in user.
 * A few attempts are done to determine the current user, including using
 * information normally available in SP pages (`_spPageContextInfo`), and the
 * resorting to screen scrapping the user's profile page and then (if needed)
 * doing a few more searches to try and find the user.
 *
 * @param {Object} [options]
 * @param {String} [options.webURL=Current_Site]
 * @param {Object} [options.UserProfileModel=UserProfileModel]
 *
 * @return {Promise<UserProfileModel, Error>}
 *  Promise is resolved with an UserProfileModel.
 *
 *  // FIXME: backward compatibility:
 *      userLoginName
 *      userId
 *
 */
const getCurrentUser = function(options){
    let cacheId             = "getCurrentUserData";
    let opt                 = objectExtend({}, getCurrentUser.defaults, options);
    let UserProfileModel    = opt.UserProfileModel;
    let returnProfileClone  = profile => UserProfileModel.create(profile, opt);
    let reqPromise          =  Promise.resolve().then(function(){
        if (cache.isCached(cacheId)) {
            return cache.get(cacheId).then(returnProfileClone);
        }

        cache(cacheId, reqPromise);
        return searchUsingSPPageInfo(opt);

    // if getting user principals fails, try scraping user display page
    })[PROMISE_CATCH](function(/*e*/){
        return scrapeUserDisplayPage(opt).then(userInfo => {
            return getUserProfile({
                accountName:        userInfo.AccountName || userInfo.UserName,
                webURL:             opt.webURL,
                otherAttr:          userInfo,
                UserProfileModel:   UserProfileModel
            })["catch"](e => {
                // If getUserProfile failed, this could be because we're in
                // a SP Foundation version which does not have a UserProfileService api,
                // ajax calls returns a 404.
                // In this case, if scrapping the user display page was OK, then return that.
                if (userInfo && userInfo.ID) {
                    return userInfo;

                } else {
                    return Promise.reject(e);
                }
            });
        });

    // Unable to get current user
    })[PROMISE_CATCH](function(/*e*/){
        return Promise.reject(new Error("Unable to get current user info."));
    });

    return reqPromise.then(returnProfileClone);
};

/**
 * Uses the searchPrincipals to try to identify the current user using
 * the userLoginName information from `_spPageContextInfo.userLoginName`
 *
 * @private
 *
 * @param {Object} opt
 *
 * @returns {Promise<UserProfileModel, Error>}
 */
function searchUsingSPPageInfo(opt) {

    // Possible second approach?: use 'GetUserInfo' service which accepts a loginName?
    //      API: https://msdn.microsoft.com/en-us/library/ms774637.aspx

    return new Promise(function(resolve, reject){
        if (
            typeof _spPageContextInfo               === "undefined" ||
            typeof _spPageContextInfo.userLoginName === "undefined" ||
            typeof _spPageContextInfo.userId        === "undefined"
        ) {
            reject(new Error("Unable to searchPrincipals for user. Needed info not in _spPageContextInfo"));
            return;
        }

        var userId          = String(_spPageContextInfo.userId),
            userLoginName   = _spPageContextInfo.userLoginName;

        searchPrincipals({
            searchText: userLoginName,
            webUrl:     opt.webURL
        })
        .then(function(results){
            var userProfile;

            results.some(function(user){
                if (String(user.ID) === userId) {
                    userProfile = user;
                    return true;
                }
            });

            if (!userProfile) {
                reject(new Error("User not found via searchPrincipals"));
                return;
            }

            resolve(userProfile);

        })[PROMISE_CATCH](function(e){
            reject(e);
        });
    });
}

/**
 * Same approach as SPServices - screen scrape the user Display page.
 *
 * @private
 *
 * @return {Promise}
 */
function scrapeUserDisplayPage(opt) {
    // NOTE:
    // Although the API differs, this method implementation borrows heavily from
    // SPServices.SPGetCurrentUser (http://spservices.codeplex.com/)

    return getSiteWebUrl(opt.webURL).then(function(webURL){

        return fetch(webURL + "/_layouts/userdisp.aspx?Force=True&" + (new Date()).getTime())
            .then(function(response){
                return response.text().then(function(responseString){
                    return parseHTML(responseString);
                });
            })
            .then(function(contentDocFrag){
                var userInfo = {};

                domFind(contentDocFrag, "table.ms-formtable td.ms-formbody").forEach(function($td){
                    var
                    tdInnerHtml     = $td.innerHTML,
                    reInternalName  = /FieldInternalName="(.+?)"/i,
                    reFieldType     = /FieldType="(.+?)"/i,
                    internalName    = reInternalName.exec(tdInnerHtml),
                    fieldType       = reFieldType.exec(tdInnerHtml),
                    key, value, $child;

                    // If we found an internal name, then use that as the key
                    if (internalName) {
                        key = internalName[1];

                    // ELSE, use the visible label on the page
                    } else {
                        key = $td.previousSibling.textContent.trim();
                    }

                    fieldType = (fieldType ? fieldType[1] : "");

                    // Get the value for this field
                    switch (fieldType) {
                        case "SPFieldNote":
                            $child = $td.querySelector("div");
                            if ($child) {
                                value = $child.innerHTML;
                            }
                            break;

                        case "SPFieldURL":
                            $child = $td.querySelector("img");
                            if ($child) {
                                value = $child.getAttribute("src");
                            }
                            break;

                        default:
                            value = $td.textContent;
                            break;
                    }

                    userInfo[key] = (value || "").trim();
                });


                // If no ID, then get it from the Edit link
                if (!userInfo.hasOwnProperty("ID")) {

                    domFind(contentDocFrag, "table.ms-toolbar a[id*='EditItem']").some(function(ele){
                        var idMatch = (/ID=(\d*)/i).exec(ele.href);
                        if (idMatch) {
                            userInfo.ID = idMatch[1];
                            return true;
                        }
                    });
                }

                // If no 'AccountName', and we have "Name", then set it from that
                // (since it seems that it is the account name)
                if (!userInfo.AccountName && userInfo.Name) {
                    userInfo.AccountName = userInfo.Name;
                }

                userInfo.Name = `${ userInfo.FirstName } ${ userInfo.LastName }`;

                if (userInfo.ID) {
                    return userInfo;
                }

                // If we have an account name, lets try to find user that way using the
                // search principals api (since UserProfileService is not available in foundation
                if (userInfo.AccountName) {
                    return searchPrincipals({
                        searchText: userInfo.AccountName,
                        webUrl:     webURL
                    }).then(results => {
                        // Ok... let's try to match up a good response
                        if (results.some(function(user){
                                if (String(user.AccountName) === userInfo.AccountName) {
                                    objectExtend(userInfo, user);
                                    return true;
                                }
                            })
                        ) {
                            return userInfo;
                        }

                        // Else... was not able to find a good match (or no results)
                        // Let try to find by EMail
                        if (userInfo.EMail) {
                            return searchPrincipals({
                                searchText: userInfo.EMail,
                                webUrl:     webURL
                            }).then(results => {
                                // Ok... let's try to match up a good response
                                if (results.some(function(user){
                                        if (String(user.EMail) === userInfo.EMail) {
                                            objectExtend(userInfo, user);
                                            return true;
                                        }
                                    })
                                ) {
                                    return userInfo;
                                }

                                return Promise.reject(new Error(UNABLE_TO_GET_USER_FROM_SCRAPING));
                            });
                        }
                    });
                }

                return Promise.reject(new Error(UNABLE_TO_GET_USER_FROM_SCRAPING));

                // EXAMPLE OF DATA RETRIEVED FROM SCRAPE:
                //{
                //    "Name": "i:0#.f|membership|joe.doe@sharepoint.com",
                //    "AccountName": "domain\login", // Set from "title"
                //    "Title": "Joe Doe",
                //    "EMail": "joedoe@sharepoint.com",
                //    "MobilePhone": "",
                //    "Notes": "<div dir=\"\"></div>&nbsp;",
                //    "Picture": "https://my.sharepoint.com:443/User%20Photos/Profile%20Pictures/joeDoe.jpg?t=63523359043",
                //    "Department": "",
                //    "JobTitle": "",
                //    "SipAddress": "",
                //    "FirstName": "joe",
                //    "LastName": "doe",
                //    "WorkPhone": "",
                //    "UserName": "joe.doe@sharepoint.com",
                //    "WebSite": "",
                //    "SPSResponsibility": "",
                //    "Office": "",
                //    "SPSPictureTimestamp": "63523359043",
                //    "SPSPicturePlaceholderState": "",
                //    "SPSPictureExchangeSyncState": "",
                //    "Attachments": "",
                //    "ID": "11"
                //}
            });
    });
}


getCurrentUser.defaults = {
    webURL:             null,
    UserProfileModel:   UserProfileModel
};

export default getCurrentUser;

    //------------------------------------------------
    // Other possible approaches
    //------------------------------------------------
    // SP 2013: end point:      /_api/web/currentuser
    //   NOT SURE IF THIS WORKS ON PREM....
    // returns:
    //      <?xml version="1.0" encoding="utf-8"?><entry xml:base="https://mytenant.sharepoint.com/sites/PT2013/_api/" xmlns="http://www.w3.org/2005/Atom" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns:georss="http://www.georss.org/georss" xmlns:gml="http://www.opengis.net/gml"><id>https://mytenant.sharepoint.com/sites/PT2013/_api/Web/GetUserById(11)</id><category term="SP.User" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" /><link rel="edit" href="Web/GetUserById(11)" /><link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Groups" type="application/atom+xml;type=feed" title="Groups" href="Web/GetUserById(11)/Groups" /><title /><updated>2016-06-05T15:33:18Z</updated><author><name /></author><content type="application/xml"><m:properties><d:Id m:type="Edm.Int32">11</d:Id><d:IsHiddenInUI m:type="Edm.Boolean">false</d:IsHiddenInUI><d:LoginName>i:0#.f|membership|paul.tavares@sharepoint.com</d:LoginName><d:Title>Paul Tavares</d:Title><d:PrincipalType m:type="Edm.Int32">1</d:PrincipalType><d:Email>paultavares1@gmail.com</d:Email><d:IsShareByEmailGuestUser m:type="Edm.Boolean">false</d:IsShareByEmailGuestUser><d:IsSiteAdmin m:type="Edm.Boolean">true</d:IsSiteAdmin><d:UserId m:type="SP.UserIdInfo"><d:NameId>10033fff8524baa1</d:NameId><d:NameIdIssuer>urn:federation:microsoftonline</d:NameIdIssuer></d:UserId></m:properties></content></entry>
    // THEN:
    //     Call end point: https://mytenant.sharepoint.com/sites/PT2013/_api/Web/GetUserById(11)
    // Returns:
    // <?xml version="1.0" encoding="utf-8"?><entry xml:base="https://mytenant.sharepoint.com/sites/PT2013/_api/" xmlns="http://www.w3.org/2005/Atom" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns:georss="http://www.georss.org/georss" xmlns:gml="http://www.opengis.net/gml"><id>https://mytenant.sharepoint.com/sites/PT2013/_api/Web/GetUserById(11)</id><category term="SP.User" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" /><link rel="edit" href="Web/GetUserById(11)" /><link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Groups" type="application/atom+xml;type=feed" title="Groups" href="Web/GetUserById(11)/Groups" /><title /><updated>2016-06-05T15:54:23Z</updated><author><name /></author><content type="application/xml"><m:properties><d:Id m:type="Edm.Int32">11</d:Id><d:IsHiddenInUI m:type="Edm.Boolean">false</d:IsHiddenInUI><d:LoginName>i:0#.f|membership|paul.tavares@sharepoint.com</d:LoginName><d:Title>Paul Tavares</d:Title><d:PrincipalType m:type="Edm.Int32">1</d:PrincipalType><d:Email>paultavares1@gmail.com</d:Email><d:IsShareByEmailGuestUser m:type="Edm.Boolean">false</d:IsShareByEmailGuestUser><d:IsSiteAdmin m:type="Edm.Boolean">true</d:IsSiteAdmin><d:UserId m:type="SP.UserIdInfo"><d:NameId>10033fff8524baa1</d:NameId><d:NameIdIssuer>urn:federation:microsoftonline</d:NameIdIssuer></d:UserId></m:properties></content></entry>




    // Query User Information List table
    //  COMCERNS:
    //      - Permissions (only site admins have access?
    // FROM:
    //   var user = {};
    //   var query = '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter"><UserID /></Value></Eq></Where></Query>';
    //   var viewFields = '<ViewFields><FieldRef Name="ID" /><FieldRef Name="Name" /><FieldRef Name="EMail" /><FieldRef Name="Department" /><FieldRef Name="JobTitle" /><FieldRef Name="UserName" /><FieldRef Name="Office" /></ViewFields>';
    //
    //   getListItems('', 'User Information List', viewFields, query, function (any, status, jqXhr) {





