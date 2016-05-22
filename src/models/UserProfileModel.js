define([
    "vendor/jsutils/Compose",
    "vendor/jsutils/objectExtend"
], function(
    Compose,
    objectExtend
){

    /**
     * Model for a user profile. Accounts for attributes returned by
     * the UserProfile service, as well as the Search Principals and
     * normalizes those.
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

            //------------------------------------------------------
            // Handle data differences from SearchPrincipals output
            //------------------------------------------------------

            // If there is a UserInfoID, then make sure ID is also set
            if (this.UserInfoID && !this.ID) {
                this.ID = this.UserInfoID;
            }

            // If there is a DisplayName but no Name, then set the name
            if (this.DisplayName && !this.Name) {
                this.Name = this.DisplayName;
            }
        }
    });

});