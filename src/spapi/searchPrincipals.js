import apiFetch from "../sputils/apiFetch";
import cache from "../sputils/cache";
import getSiteWebUrl from "./getSiteWebUrl";
import UserProfileModel from "../models/UserProfileModel";
import objectExtend from "vendor/jsutils/objectExtend";
import domFind from "vendor/domutils/domFind";

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
 * @param {Object} [options.webURL='currentSiteUrl']
 * @param {Object} [options.cache=true]
 *
 * @return {Promise<Array<UserProfileModel>, Error>}
 *  Promise is resolved with an array of UserProfileModels
 *  or rejected with an error.
 *
 * @see https://msdn.microsoft.com/en-us/library/people.people.searchprincipals.aspx
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
                    return opt.UserProfileModel.create(
                        Array.prototype.slice.call(principalInfo.childNodes, 0).reduce(function(profile, attrNode){
                            var attrName = attrNode.nodeName;

                            if (attrNode.nodeType === 1) {
                                profile[attrName] = attrNode.textContent;
                            }

                            return profile;
                        }, {}),
                        { webURL: webURL }
                    );

                    //return Array.prototype.slice.call(principalInfo.childNodes, 0).reduce(function(profile, attrNode){
                    //    var attrName = attrNode.nodeName;
                    //
                    //    if (attrNode.nodeType === 1) {
                    //        profile[attrName] = attrNode.textContent;
                    //
                    //        if (attrName === "DisplayName") {
                    //            profile.Name = profile[attrName];
                    //        }
                    //
                    //        if (attrName === "UserInfoID") {
                    //            profile.ID = profile[attrName];
                    //        }
                    //    }
                    //    return profile;
                    //}, opt.UserProfileModel.create({}, {webURL: webURL}));
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

export default searchPrincipals;


