import Compose      from "common-micro-libs/src/jsutils/Compose"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import dataStore    from "common-micro-libs/src/jsutils/dataStore"

//================================================================
const PRIVATE = dataStore.create();

const COLORS = [
    "blueLight",
    "blue",
    "blueDark",
    "teal",
    "greenLight",
    "green",
    "greenDark",
    "magentaLight",
    "magenta",
    "purpleLight",
    "purple",
    "black",
    "orange",
    "red",
    "redDark"
];

let nextColorIndex  = 0;
let assignedColor   = {};   // Timed cache?

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
const UserProfileModel = Compose.extend(/** @lends UserProfileModel.prototype */{
    init: function(modelProperties, options){
        if (PRIVATE.has(this)) {
            return;
        }

        let opt = objectExtend({}, this.getFactory().defaults, options);

        PRIVATE.set(this, opt);

        objectExtend(
            this,
            {
                "AboutMe": "",
                "AccountName": "",  // Should be same as LoginName
                "CellPhone": "",
                "Department": "",
                "DisplayName": "", // Should be the same as 'Name'
                "EmployeeID": "",
                "Email": "",
                "Fax": "",
                "FirstName": "",
                "HomePhone": "",
                "ID": "",
                "Id": "",           // SP2013 and above. Should be same as ID
                "Initials": "",
                "Color": "",
                "LastName": "",
                "LoginName": "",    // Should be same as AccountName
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

        if (!this.ID && this.Id) {
            this.ID = this.Id;
        }

        // If there is a UserInfoID, then make sure ID is also set
        if (!this.ID && this.UserInfoID) {
            this.ID = this.UserInfoID;
        }

        this.UserInfoID = this.Id = this.ID;

        // If there is a DisplayName but no Name, then set the name
        if (!this.Name) {
            this.Name = this.DisplayName || this.PreferredName;

            if (!this.Name && (this.FirstName || this.LastName)) {
                this.Name = `${this.FirstName} ${this.LastName}`
            }
        }

        if (!this.AccountName && this.LoginName) {
            this.AccountName = this.LoginName;
        }

        if (!this.LoginName && this.AccountName) {
            this.LoginName = this.AccountName;
        }

        if (!this.UserPhoto && this.AccountName) {
            this.UserPhoto = (opt.webURL || "/") +
                "_layouts/userphoto.aspx?size=M&accountname=" +
                encodeURIComponent(this.AccountName);
        }

        if (!this.Initials) {
            this.deriveInitials();
        }

        if (!this.Color) {
            this.setRandomColor();
        }

        this.onDestroy(() => PRIVATE['delete'](this));
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
            [ firstName = "", lastName = "" ] = displayName.split(/\W/);
        }

        this.Initials = (firstCharOf(firstName) + firstCharOf(lastName)) || "?";
    },

    /**
     * Sets a random color on the current user profile model.
     * Color is store in model attribute named `Color` and also returned and
     * represents one of the available color names (CSS modifiers) that the
     * `Persona` widget supports.
     *
     * @returns {String}
     */
    setRandomColor() {
        let accountName = this.AccountName;
        let color       = COLORS[nextColorIndex];

        if (accountName) {
            if (assignedColor[accountName]) {
                color = assignedColor[accountName];

            } else {
                assignedColor[accountName] = color;
            }
        }

        if (nextColorIndex === (COLORS.length - 1)) {
            nextColorIndex = 0;

        } else {
            nextColorIndex++;
        }

        return this.Color = color;
    },

    /**
     * Returns a string value with the user information in the format normally
     * received in SOAP responses (ex. `ID;#VisibleValue`)
     *
     * @param {Boolean} [expanded=false]
     *  If true, then the format returned is the `expanded` one (normally received in
     *  queries when `ExpandUserField` is used)
     *
     * @return {String}
     *
     * @example
     *
     *  // non-expanded: 11;#Paul Tavares
     *  // Expanded: 11;#Paul Tavares,#i:0#.f|membership|paul.tavares@sharepoint.com,#paul.tavares@sharepoint.com,#,#Paul Tavares
     */
    toCamlResponseString(expanded) {
        // Examples:
        let response = `${ this.ID };#${ this.Name }`;

        if (expanded) {
            response += [
                "Name",
                "AccountName",
                "Email",
                "SIP",
                "DisplayName"
            ].map(attr => this[attr]).join(",#")
        }

        return response;
    }
});


UserProfileModel.defaults = {
    webURL: ""
};

export default UserProfileModel;
