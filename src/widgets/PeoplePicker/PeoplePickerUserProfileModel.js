import Promise              from "common-micro-libs/src/jsutils/es6-promise"
import dataStore            from "common-micro-libs/src/jsutils/dataStore"

import UserProfileModel     from "../../models/UserProfileModel";
import resolvePrincipals    from "../../spapi/resolvePrincipals"


//=======================================================================
const PRIVATE = dataStore.create();

/**
 * People picker user profile model used to model each user profile
 *
 * @class PeoplePickerUserProfileModel
 * @extends UserProfileModel
 */
let PeoplePickerUserProfileModel = UserProfileModel.extend(/** @lends PeoplePickerProfileModel.prototype */{
    /**
     * The web URL from where this user was retrieved. Used in resolved principal
     * @type {String}
     */
    webURL: "",

    /**
     * Returns the AccountName url encoded.
     *
     * @returns {string}
     */
    getAccountNameUrlEncoded: function(){
        return encodeURIComponent(this.AccountName);
    },

    /**
     * Resolves the person against the site (`webURL`) by calling
     * the `ResolvePrincipal` API. API is only called if `ID` is `-1`
     *
     * @returns {Promise}
     */
    resolvePrincipal: function(){
        if (this.ID && this.ID !== "-1") {
            return Promise.resolve();
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

        inst.resolvePromise = resolvePrincipals({
            webURL:         this.webURL,
            principalKeys:  this.AccountName
        }).then(function(userList){
            // See Issue #42 for the possibility of the results returning
            // multiples, even when only one principalKey was provided on
            // input to the API.
            // https://github.com/purtuga/SPWidgets/issues/42
            userList.some(function(resolvedUser){
                if (
                    resolvedUser.ID &&
                    String(resolvedUser.ID) !== "-1" &&
                    (
                        (
                            resolvedUser.AccountName &&
                            resolvedUser.AccountName === this.AccountName
                        ) ||
                        (
                            resolvedUser.Email &&
                            resolvedUser.Email === this.Email
                        ) ||
                        (
                            resolvedUser.DisplayName &&
                            resolvedUser.DisplayName  === this.DisplayName
                        )

                    )
                ) {
                    this.UserInfoID = this.ID = resolvedUser.ID;
                    return true;
                }

            }.bind(this));
        }.bind(this));

        return inst.resolvePromise
    }
});

export default PeoplePickerUserProfileModel;
