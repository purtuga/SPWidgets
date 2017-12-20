import objectExtend         from "common-micro-libs/src/jsutils/objectExtend"
import getContextInfo       from "./getContextInfo"
import apiFetch             from "../../sputils/apiFetch"
import { getRestHeaders }   from "../../sputils/restUtils"
import cache                from "../../sputils/cache"
import UserProfileModel     from "../../models/UserProfileModel"

//==============================================================================
const freeze = Object.freeze;

export const PRINCIPAL_TYPES = freeze({
    USER:               1,
    NONE:               0,
    DISTRIBUTIONLIST:   2,
    SECURITYGROUP:      4,
    SHAREPOINTGROUP:    8,
    ALL:                15
});

export const PRINCIPAL_SOURCES = freeze({
    ALL:                    15,
    MEMBERSHIPPROVIDER:     4,
    NONE:                   0,
    ROLEPROVIDER:           8,
    USERINFOLIST:           1,
    WINDOWS:                2
});

/**
 * Searches for People based on a query string
 *
 * @param {Object} options
 * @param {Object} options.searchText
 * @param {Object} [options.maxResults=50]
 * @param {Object} [options.principalType='All']
 *      Default is User. Others include: None, DistributionList,
 *      SecurityGroup, SharePointGroup, All
 * @param {Object} [options.principalSource='All']
 *  Possible values: `All`, `MembershipProvider`, `None`, `RoleProvider`, `UserInfoList`, `Windows`
 * @param {Object} [options.webURL='currentSiteUrl']
 * @param {Object} [options.cache=true]
 * @param {UserProfileModel} [options.UserProfileModel=UserProfileModel]
 *
 * @return {Promise<Array<UserProfileModel>, Error>}
 */
export default function searchPeoplePicker(options) {
    // FIXME: support for SharePointGroupID of peoplePicker API

    const opt       = objectExtend({}, searchPeoplePicker.defaults, options);
    const request   = getContextInfo(opt.webURL).then(contextInfo => {
        opt.webURL = contextInfo.WebFullUrl;

        const cacheKey = opt.webURL + "?" + [ opt.searchText, opt.maxResults, opt.principalType ].join("|");

        if (opt.cache && cache.get(cacheKey)) {
            return cache.get(cacheKey).then(response => processApiResults(response, opt));
        }
        else if (!opt.cache) {
            cache.clear(cacheKey);
        }

        const apiRequest = apiFetch(`${ contextInfo.WebFullUrl }/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.ClientPeoplePickerSearchUser`, {
            method:     "POST",
            headers:    getRestHeaders(contextInfo),
            body:       JSON.stringify({
                queryParams: {
                    QueryString:                opt.searchText,
                    MaximumEntitySuggestions:   opt.maxResults,
                    AllowEmailAddresses:        true,
                    AllowOnlyEmailAddresses:    false,
                    PrincipalSource:            PRINCIPAL_SOURCES[String(opt.principalSource || "ALL").toUpperCase()],
                    PrincipalType:              PRINCIPAL_TYPES[String(opt.principalType || "ALL").toUpperCase()],
                    SharePointGroupID:          0
                }
            })
        });

        if (opt.cache) {
            cache.set(cacheKey, apiRequest);
        }

        apiRequest.catch(() => cache.clear(cacheKey));

        return apiRequest.then(response => processApiResults(response, opt));
    });

    request.catch(e => console.log(e)); // eslint-disable-line

    return request;
}

/**
 * Default options
 *
 * @name defaults
 * @memberof searchPeoplePicker
 * @static
 * @type {Object}
 */
searchPeoplePicker.defaults = {
    searchText:         '',
    maxResults:         50,
    principalType:      'All',
    principalSource:    'All',
    webURL:             '',
    cache:              true,
    UserProfileModel:   UserProfileModel
};


function processApiResults (response, opt) {
    return JSON.parse(response.content.d.ClientPeoplePickerSearchUser).map(person => {
        // Take the output returned and try to map it (as close as possible) to the UserProfileModel
        person = objectExtend({}, person, person.EntityData);
        person.AccountName = person.LoginName = person.Key;
        person.DisplayName = person.DisplayText;
        [ person.FirstName = "", person.LastName = "" ] = person.DisplayText.split(" ");

        return opt.UserProfileModel.create(person, opt)
    });
}


// EXAMPLE RESPONSE:
// 
//      [
//          {
//              "Key": "i:0#.f|membership|paul.tavares@company.com",
//              "Description": "paul.tavares@company.com",
//              "DisplayText": "Paul Tavares",
//              "EntityType": "User",
//              "ProviderDisplayName": "Tenant",
//              "ProviderName": "Tenant",
//              "IsResolved": true,
//              "EntityData": {
//                  "IsAltSecIdPresent": "False",
//                  "Title": "",
//                  "Email": "",
//                  "MobilePhone": "",
//                  "ObjectId": "d5f2fb68-973d-4ae8-b796-4c87eee99151",
//                  "Department": ""
//              },
//              "MultipleMatches": []
//          },
//          {
//              "Key": "i:0#.f|membership|tony.smith@company.com",//
//              "Description": "tony.smith@company.com",
//              "DisplayText": "Tony Smith",
//              "EntityType": "User",
//              "ProviderDisplayName": "Tenant",
//              "ProviderName": "Tenant",
//              "IsResolved": true,
//              "EntityData": {
//                  "IsAltSecIdPresent": "False",
//                  "Title": "Chief Gum Flopper",
//                  "Email": "tony.smith@company.com",
//                  "MobilePhone": "6178354594",
//                  "ObjectId": "0c4392e5-ac6d-4bce-adb4-6260449815f9",
//                  "Department": ""
//              },
//              "MultipleMatches": []
//          }
// ]



// DOCUMENENTATION FROM:
// http://dattabase.com/sharepoint-people-picker-rest-api/
//----------------------------------------------------------------------------
//  Client People Picker Query Parameters
//  AllowEmailAddresses – Allows valid email address to be resolved and used as values.
//      AllowMultipleEntities – Enabled for multiple user or group entities.
//      AllUrlZones – Searches across all url zones for a particular web application.
//      EnabledClaimProviders
//  ForceClaims
//  MaximumEntitySuggestions (Required) – The maximum number of entities to return.
//  PrincipalSource – The principal sources to search.
//      All (15) – Search all principal sources.
//      MembershipProvider (4) – Search the current membership provider.
//      None (0) – Search no principal sources.
//      RoleProvider (8) – Search the current role provider.
//      UserInfoList (1) – Search the user information list.
//      Windows (2) – Search active directory.
//  PrincipalType – The principal types to return.
//      All (15) – Return all entity types.
//      DistributionList (2) – Return distribution list entity types.
//      None (0) – Return no principal types.
//      SecurityGroup (4) – Return security group entity types.
//      SharePointGroup (8) – Return sharepoint group entity types.
//      User (1) – Return user entity types.
//  QueryString – The search term.
//  Required
//  SharePointGroupID – The SharePoint group id to limit the search to.
//  UrlZone – The url zone to search within a particular web application.
//      Custom (3) – Search the custom zone.
//      Default (0) – Search the default zone.
//      Extranet (4) – Search the extranet zone.
//      Internet (2) – Search the internet zone.
//      Intranet (1) – Search the intranet zone.
//  UrlZoneSpecified
//  Web – Required if you are limiting your search to a SharePoint group
//  WebApplicationID – The web application to limit the search to.
