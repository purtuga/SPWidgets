import objectExtend         from "common-micro-libs/src/jsutils/objectExtend"
import PeoplePicker         from "./PeoplePicker"
import searchPeoplePicker   from "../../spapi/rest/searchPeoplePicker"

// PeoplePicker widget based on SharePoint's REST api
const PeoplePickerREST = PeoplePicker.extend({});

PeoplePickerREST.defaults = objectExtend({}, PeoplePickerREST.defaults, {
    apiSearch: searchPeoplePicker
});

export default PeoplePickerREST;