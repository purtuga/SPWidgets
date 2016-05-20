define([
    "vendor/jsutils/Compose",
    "vendor/jsutils/objectExtend"
], function(
    Compose,
    objectExtend
){

    /**
     * Model for a user profile. Accounts for attributes returned by
     * the UserProfile service, as well as the Search Principals.
     *
     *
     * @class UserProfileModel
     * @extends Compose
     *
     * @param {Object} [modelProperties]
     */
    return Compose.extend(/** @lends UserProfile.prototype */{
        init: function(modelProperties){

            objectExtend(
                this,
                {
                    "AboutMe": "",
                    "AccountName": "",
                    "CellPhone": "",
                    "Department": "",
                    "DisplayName": "", // Should be the same as 'Name'
                    "EmployeeID": "",
                    "Email": "",
                    "Fax": "",
                    "FirstName": "",
                    "HomePhone": "",
                    "ID": "",
                    "LastName": "",
                    "Manager": "",
                    "Name": "",
                    "Office": "",
                    "PersonalSpace": "",
                    "PictureURL": "",
                    "PreferredName": "",
                    "PublicSiteRedirect": "",
                    "QuickLinks": "",
                    "Title": "",
                    "UserName": "",
                    "UserInfoID": "",           // Should be the same as ID. returned by SearchPrincipals service
                    "UserProfile_GUID": "",
                    "WebSite": "",
                    "WorkEmail": "",
                    "WorkPhone": ""
                },
                modelProperties
            );
        }
    });

});