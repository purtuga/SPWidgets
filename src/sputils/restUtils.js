import objectExtend     from "common-micro-libs/src/jsutils/objectExtend"
import { REST_HEADERS } from "./constants"

//===========================================================

/**
 * Returns an object with the standard JSON headers for a SharePoint REST call.
 *
 * @param {ContextWebInformation} [contextInfo]
 *
 * @return {Object}
 */
export function getRestHeaders (contextInfo) {
    return objectExtend({}, REST_HEADERS, contextInfo ? {"X-RequestDigest": contextInfo.FormDigestValue} : null);
}


/**
 * Given a user info object returnd by SP REST, this method will augument that data and
 * return back a UserProfileModel instance.
 *
 * @param {Object} userInfo
 *
 * @returns {UserProfileModel}
 */
export function processUserInfo (userInfo) {
    if (userInfo.Title && !userInfo.FirstName) {
        [ userInfo.FirstName, userInfo.LastName ] = userInfo.Title.split(" ");
    }
    return userInfo;
}