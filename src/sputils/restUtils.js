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