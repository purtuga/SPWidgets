import Compose      from "common-micro-libs/src/jsutils/Compose"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"

/**
 * Model for a user profile. Accounts for attributes returned by
 * the UserProfile service, as well as the Search Principals and
 * normalizes those.
 *
 * @class UserProfileModel
 * @extends Compose
 *
 * @param {Object} [modelProperties]
 * @param {Object} [options]
 * @param {String} [options.webURL]
 */
const UserProfileModel = Compose.extend(/** @lends UserProfile.prototype */{
    init: function(modelProperties, options){

        let opt = objectExtend({}, this.getFactory().defaults, options);

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
                "Initials": "",
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
                "UserPhoto": "",            // Will be set to use {fullURL}userphoto.aspx
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
        if (!this.Name) {
            this.Name = this.DisplayName || this.PreferredName;

            if (!this.Name && (this.FirstName || this.LastName)) {
                this.Name = `${this.FirstName} ${this.LastName}`
            }
        }

        if (!this.UserPhoto && this.AccountName) {
            this.UserPhoto = (opt.webURL || "/") +
                "_layouts/userphoto.aspx?size=M&accountname=" +
                encodeURIComponent(this.AccountName);
        }

        if (!this.Initials) {
            this.deriveInitials();
        }
    },

    /**
     * Derives the user's initials based on firstName, LastName or DisplayName.
     * Calling this method will set the Model's `Initials` property
     */
    deriveInitials() {
        let firstCharOf = function(stringValue){
            return stringValue.trim().charAt(0);
        };
        let firstName   = this.FirstName;
        let lastName    = this.LastName;
        let displayName = this.DisplayName || this.Name;

        // If no first or last name, but we have a display name (common with output
        // from list queries), then parse that and use it.
        if (!firstName && !lastName && displayName) {
            [firstName, lastName ] = displayName.split(/\W/);
        }

        this.Initials = (firstCharOf(firstName) + firstCharOf(lastName)) || "?";
    }
});


UserProfileModel.defaults = {
    webURL: ""
};

export default UserProfileModel;
