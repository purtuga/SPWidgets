import objectExtend         from "common-micro-libs/src/jsutils/objectExtend"
import getContextInfo       from "./getContextInfo"
import apiFetch             from "../../sputils/apiFetch"
import { getRestHeaders, processResults }   from "../../sputils/restUtils"
import ListItemModel from "../../models/ListItemModel"
import ListItemsCollection from "../../collections/ListItemsCollection"
import {IS_GUID_RE} from "../../sputils/constants";


//==================================================================
const encodeURIComponent = window.encodeURIComponent;


/**
 * Method to retrieve data from a SharePoint lists
 *
 * @function
 *
 * @param {Object} options
 *
 * @param {String} options.list
 *  The list name or ID
 *
 * @param {String} [options.web=__current_web__]
 *
 * @param {String} [options.select=""]
 *
 * @param {String} [options.filter=""]
 *
 * @param {String} [options.orderBy=""]
 *
 * @param {String} [options.expand=""]
 *
 * @param {Boolean} [options.ListItemsCollection=ListItemsCollection]
 *
 * @param {Boolean} [options.ListItemModel=ListItemModel]
 *  The model to be used for each row retrieved. Model constructor must
 *  support a .create() method.
 *
 * @return {Promise<ListItemsCollection, Error>}
 *   Promise is resolved with a Collection, or rejected with an Error object
 *
 * @example
 *
 * getListItems({list: "tasks"})
 */
export function getListItems(options) {
    const opt = objectExtend({}, getListItems.defaults, options);

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
                    method:     "GET",
                    headers:    getRestHeaders(contextInfo)
                })
                .then(fetchResponse => {
                    return ListItemsCollection.create( // FIXME: convert to Class
                        fetchResponse.content.value.map(item => {
                            processResults(item);
                            return new opt.ListItemModel(item, opt);
                        })
                    )
                });
        });
}
export default getListItems;

/**
 * Default options for `getListItems` REST method
 *
 * @type {{list: string, web: string, select: string, filter: string, expand: string, orderBy: string, ListItemsCollection, ListItemModel}}
 */
getListItems.defaults = {
    list: "",
    web: "",
    select: "",
    filter: "",
    expand: "",
    orderBy: "",
    ListItemsCollection,
    ListItemModel
};
