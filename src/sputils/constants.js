import {objectKeys} from "common-micro-libs/src/jsutils/runtime-aliases"
/**
 * The typical REST API headers for JSON data structures. Includes `odata=verbose`
 *
 * @type {{"Content-Type": string, Accept: string}}
 */
export const REST_HEADERS = {
    "Content-Type": "application/json;odata=verbose",
    "Accept":       "application/json;odata=verbose"
};

/**
 * The typical REST API headers, but with `odata=nometadata` - ideal for working
 * with Create/Update operation and not have to define the item type
 * @type {{"Content-Type": string, Accept: string}}
 */
export const REST_HEADERS_NO_METADATA = Object.assign({}, REST_HEADERS);
objectKeys(REST_HEADERS_NO_METADATA)
    .forEach(key => REST_HEADERS_NO_METADATA[key] = REST_HEADERS_NO_METADATA[key].replace("verbose", "nometadata"));


/**
 * RegExp to validate GUID's
 *
 * @type {RegExp}
 */
export const IS_GUID_RE = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;
