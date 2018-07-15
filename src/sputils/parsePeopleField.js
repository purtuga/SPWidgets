import UserProfileModel         from "../models/UserProfileModel";
import parseLookupFieldValue    from "./parseLookupFieldValue";

/**
 * Parses a Person or Group value string returned by SharePoint webservices
 * into an array of object, each object representing a person or group.
 *
 * @see http://msdn.microsoft.com/en-us/library/cc264031%28v=office.14%29.aspx
 *
 * @function parsePeopleField
 *
 * @param {String} peopleString
 * @param {UserProfileModel} [PersonModel=UserProfileModel]
 *
 * @return {Array<UserProfileModel>}
 */
const parsePeopleField = function(peopleString, PersonModel) {
    PersonModel = PersonModel || parsePeopleField.defaults.PersonModel;

    return parseLookupFieldValue(String(peopleString || "")).map(function(person){
        var personInfo = {
            ID:     person.id       || "",
            Name:   person.title    || ""
        };

        // If the Name field seems to have data that is returned when you
        // expand the field during the API call, then parse that now into
        // individual attributes... See for more info. on these attributes:
        // http://msdn.microsoft.com/en-us/library/cc264031%28v=office.14%29.aspx
        // O365 seems to return some additional values from what is documented.
        //  Example of expanded values in an array (from o365):
        //  [
        //      "First Last",
        //      "i:0#.f|membership|somename@domain.com",
        //      "someName@domain.com",
        //      "",
        //      "First Last",
        //      "https://someDomain-my.sharepoint.com:443/User%20Photos/.....jpg",  // Not using it now
        //      "",  // Not using it now
        //      ""  // Not using it now
        // ]
        if (personInfo.Name.indexOf(",#") > -1) {
            let additionalAttributes = [
                "Name",
                "AccountName",
                "Email",
                "SIP",
                "DisplayName"
                //,
                //"UserPhoto"   // not adding it to the info object because this normally points to the "my site" which requires additional login
            ];

            personInfo.Name.split(/,#/g).forEach(function(expandedValue, index){
                if (additionalAttributes[index]) {
                    personInfo[additionalAttributes[index]] = String(expandedValue || "").replace(/,,/g, ",")
                }
            });
        }

        // Create the model and populate with the attr. from above.
        return PersonModel.create(personInfo);
    });
};

/**
 * Defaults for the function
 *
 * @name parsePeopleField.defaults
 * @type {Object}
 */
parsePeopleField.defaults = {
    PersonModel: UserProfileModel
};

export default parsePeopleField;


