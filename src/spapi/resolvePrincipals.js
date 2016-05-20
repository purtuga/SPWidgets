define([
    "../sputils/apiFetch",
    "./getSiteWebUrl",
    "../models/UserProfileModel",

    "vendor/jsutils/objectExtend",
    "vendor/domutils/domFind"
], function(
    apiFetch,
    getSiteWebUrl,
    UserProfileModel,

    objectExtend,
    domFind
){

    /**
     * Given a list of users, this method will resolve those if they
     * are not part of the site collection user list info.
     *
     * @param {Object} options
     *
     * @param {Array|String} options.principalKeys
     *  The principal key (login name/Account Name/email) to be resolved.
     *  An array of values can also be used on input.
     *
     * @param {String} [options.webURL="current_site"]
     *
     * @param {String} [options.principalType='All']
     *  The type of principal that is being resolved. Possible values are
     *  `All` (default), `Distribution List`, `None`, `SecurityGroup`,
     *  `SharePointGroup` and `User`.
     *   See https://msdn.microsoft.com/en-us/library/people.spprincipaltype(v=office.12).aspx
     *
     * @param {Boolean} [options.addToUserInfoList=true]
     *  If true, then principal will be added to the site collection
     *  user info list.
     *
     * @param {Compose} [options.UserProfileModel=UserProfileModel]
     *  A Composable object that will be used to build each user profile.
     *
     * @return {Promise<Array<UserProfileModel>, Error>}
     *  Promise is resolved with an array of UserProfileModels
     *  or rejected with an error.
     *
     * @see https://msdn.microsoft.com/EN-US/library/office/websvcpeople.people.resolveprincipals.aspx
     *
     * @example
     *
     *  resolvePrincipals({
     *      principalKeys: "domain\\userid"
     *  })
     *  .then(function(resolvedUsers){
     *      // do something
     *  });
     */
    var resolvePrincipals = function(options) {
        var opt = objectExtend({}, resolvePrincipals.defaults, options);

        if (!Array.isArray(opt.principalKeys)) {
            opt.principalKeys = [opt.principalKeys];
        }

        return getSiteWebUrl(opt.webURL).then(function(webURL) {
            opt.webURL = webURL + "/_vti_bin/People.asmx";

            var principalXml = opt.principalKeys.map(function(principal){
                return '<string>' + principal + '</string>';
            }).join("");

            return apiFetch(opt.webURL, {
                method:     "POST",
                headers:    {
                    'Content-Type': 'text/xml;charset=UTF-8',
                    'SOAPAction':   'http://schemas.microsoft.com/sharepoint/soap/ResolvePrincipals'
                },
                body: '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                    '<soap:Body><ResolvePrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">' +
                    '<principalKeys>' + principalXml + '</principalKeys>' +
                    '<principalType>' + opt.principalType + '</principalType>' +
                    '<addToUserInfoList>' + opt.addToUserInfoList + '</addToUserInfoList>' +
                    '</ResolvePrincipals></soap:Body></soap:Envelope>'
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
        });
    };

    resolvePrincipals.defaults = {
        webURL:             '',
        principalKeys:      [],
        principalType:      'All',
        addToUserInfoList:  true,
        UserProfileModel:   UserProfileModel
    };

    return resolvePrincipals;


    //------------------------
    // Response example:
    //------------------------
    // <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    //  <soap:Body>
    //      <ResolvePrincipalsResponse xmlns="http://schemas.microsoft.com/sharepoint/soap/">
    //          <ResolvePrincipalsResult>
    //              <PrincipalInfo>
    //                  <AccountName>i:0#.f|membership|mark.smith@tenant.sharepoint.com</AccountName>
    //                  <UserInfoID>1565</UserInfoID>
    //                  <DisplayName>Mark Smith</DisplayName>
    //                  <Email />
    //                  <Department />
    //                  <Title />
    //                  <IsResolved>true</IsResolved>
    //                  <PrincipalType>User</PrincipalType>
    //              </PrincipalInfo>
    //          </ResolvePrincipalsResult>
    //      </ResolvePrincipalsResponse>
    //  </soap:Body>
    // </soap:Envelope>

});

