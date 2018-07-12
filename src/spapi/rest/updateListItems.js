import objectExtend         from "common-micro-libs/src/jsutils/objectExtend"
import getContextInfo       from "./getContextInfo"
import apiFetch             from "../../sputils/apiFetch"
import { getRestHeaders }   from "../../sputils/restUtils"
import ListItemModel from "../../models/ListItemModel"
import {IS_GUID_RE} from "../../sputils/constants";


//==================================================================
const encodeURIComponent = window.encodeURIComponent;

////// FIXME: support Array of updates
////// FIXME: support updates defined as as string (pass it to `body` of request as is)


/**
 * Makes updates to list items
 *
 * @function
 *
 * @param {Object} options
 *
 * @param {String} options.list
 *  The list name or ID
 *
 * @param {String|Object|Array<String|Object>} options.updates
 *
 * @param {String} [options.type="update"]
 *  The type of update... Possible values are:
 *  -   `update` (`PATCH` will be used)
 *  -   `create` (`POST` will be used)
 *
 * @param {String} [options.web=__current_web__]
 *
 * @param {ListItemModel} [options.ListItemModel=ListItemModel]
 *
 * @return {Promise<void, Error>}
 *
 * @example
 *
 * FIXME: example here
 */
export function updateListItems(options) {
    const opt = objectExtend({}, updateListItems.defaults, options);

    return getContextInfo(opt.web)
        .then(contextInfo => {
            let requestUrl = `${ contextInfo.WebFullUrl }/_api/web/lists${
                IS_GUID_RE.test(opt.list) ?
                    `(guid'${opt.list.replace(/[{}]/g, "")}')` :
                    `/getbytitle('${encodeURIComponent(opt.list)}')`
                }/items?`;

            // FIXME: should encodeURIComponent() be used for below options?

            if (opt.filter) {
                requestUrl+= `&$filter=${opt.filter}`;
            }

            if (opt.select) {
                requestUrl+= `&$select=${opt.select}`;
            }

            if (opt.orderBy) {
                requestUrl+= `&$orderby=${opt.orderBy}`;
            }

            if (opt.expand) {
                requestUrl+= `&$expand=${opt.expand}`;
            }

            opt.requestUrl = requestUrl;
            opt.isREST = true;

            return apiFetch(requestUrl, {
                method: opt.type.toLowerCase() === "create" ? "POST" : "PATCH",
                headers: getRestHeaders(contextInfo),
                body: JSON.stringify(opt.updates)
            }).then(fetchResponse => {
                return opt.ListItemModel.create(fetchResponse.content, opt);
            });
        });
}
export default updateListItems;



/**
 * Default options for `updateListItems` REST method
 *
 * @type {{list: string, web: string, select: string, filter: string, expand: string, orderBy: string, ListItemsCollection, ListItemModel}}
 */
updateListItems.defaults = {
    list: "",
    web: "",
    type: "update",
    updates: null,
    ListItemModel
};
