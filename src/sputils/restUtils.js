import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import {objectDefineProperty} from "common-micro-libs/src/jsutils/runtime-aliases"
import { REST_HEADERS, REST_HEADERS_NO_METADATA } from "./constants"
import apiFetch from "./apiFetch";
import getContextInfo from "../spapi/rest/getContextInfo";

//===========================================================

/**
 * Returns an object with the standard JSON headers for a SharePoint REST call.
 *
 * @param {ContextWebInformation} [contextInfo]
 * @param {Boolean} [oDataVerbose=false]
 *  If set to `true`, then the REST headers that indicate `odata=verbose` will be used.
 *  Default is to use `odata=nometadata`.
 *
 * @return {Object}
 */
export function getRestHeaders (contextInfo, oDataVerbose = false) {
    return objectExtend(
        {},
        oDataVerbose ? REST_HEADERS : REST_HEADERS_NO_METADATA,
        contextInfo ? {"X-RequestDigest": contextInfo.FormDigestValue} : null
    );
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

/**
 * Processes REST API response results. Does:
 *
 * -    Added a `.load()` method to any property value that has a `__deferred` object
 *
 * @param {Array|Object} results
 */
export function processResults(results) {
    results = Array.isArray(results) ? results : [results];
    for (let x=0, t=results.length; x < t; x++) {
        if (results[x]){
            for (let attrName in results[x]) {
                if (results[x].hasOwnProperty(attrName) && results[x][attrName] && results[x][attrName].__deferred) {
                    objectDefineProperty(
                        results[x][attrName],
                        "load",
                        { configurable: true, writable: true, value: fetchDeferredUri }
                    );
                }
            }
        }
    }
}


function fetchDeferredUri () {
    return getContextInfo(this.__deferred.uri.substr(0, this.__deferred.uri.indexOf("_api")))
        .then(contextInfo => {
            return apiFetch(this.__deferred.uri, {
                method:     "GET",
                headers:    getRestHeaders(contextInfo, true)
            });
        });
}
