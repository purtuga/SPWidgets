/**
 * The typical REST API headers for JSON data strctures
 *
 * @type {{Content-Type: string, Accept: string}}
 */
export const REST_HEADERS = {
    "Content-Type": "application/json;odata=verbose",
    "Accept":       "application/json;odata=verbose"
};


/**
 * RegExp to validate GUID's
 *
 * @type {RegExp}
 */
export const IS_GUID_RE = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;
