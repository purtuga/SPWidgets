import objectExtend         from "common-micro-libs/src/jsutils/objectExtend"
import dataStore            from "common-micro-libs/src/jsutils/dataStore"
import PeoplePicker         from "./PeoplePicker"
import searchPeoplePicker   from "../../spapi/rest/searchPeoplePicker"
import ensureUser           from "../../spapi/rest/ensureUser"

// PeoplePicker widget based on SharePoint's REST api
const PRIVATE = dataStore.create();
const PeoplePickerREST = PeoplePicker.extend({});

PeoplePickerREST.defaults = objectExtend({}, PeoplePickerREST.defaults, {
    apiSearch: searchPeoplePicker,
    UserProfileModel: PeoplePicker.defaults.UserProfileModel.extend({
        resolvePrincipal: function(){
            if (this.ID && this.ID !== "-1") {
                return Promise.resolve(this);
            }

            let inst;

            if (PRIVATE.has(this)) {
                inst = PRIVATE.get(this);
            } else {
                inst = { resolvePromise: null };
                PRIVATE.set(this, inst);
            }

            if (inst.resolvePromise) {
                return inst.resolvePromise;
            }

            inst.resolvePromise = ensureUser({
                webURL: this.webURL,
                logonName: this.AccountName || this.LoginName
            }).then(response => {
                this.ID = response.ID;
            });

            return inst.resolvePromise
        }
    })
});

export default PeoplePickerREST;