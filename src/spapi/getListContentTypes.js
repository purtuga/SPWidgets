import objectExtend     from "common-micro-libs/src/jsutils/objectExtend"
import getSiteWebUrl    from "./getSiteWebUrl"
import cache            from "../sputils/cache";
import getNodesFromXml  from "../sputils/getNodesFromXml";
import apiFetch         from "../sputils/apiFetch";

//========================================================================

/**
 * Retrieves the list of content types for a given list.
 *
 * @param {Object} options
 *
 * @param {String} options.listName
 *  list Name or ID
 *
 * @param {String} [options.webURL=currentSite]
 *  The url to the site where list is located. Defaults to current site.
 *
 * @param {Boolean} [options.cache=true]
 *  If true (default), content will be cached.
 *
 * @return {Promise}
 *  Resolved with an array-of-object with the content types.
 *
 * @see  https://msdn.microsoft.com/en-us/library/lists.lists.getlistcontenttypes.aspx
 *
 * @example Content type object
 *
 * {
 *      Description: "Track a work item that you or your team needs to complete.",
 *      ID: "0x010800719988A683552B489A4C7F1E2288B466",
 *      Name: "Task",
 *      Scope: "https://tenant.sharepoint.com/sites/sitea/Lists/Tasks",
 *      Version: "16"
 * }
 */
const getListContentTypes = function(options) {
    let opt = objectExtend({}, getListContentTypes.defaults, options);

    return getSiteWebUrl(opt.webURL).then(function(webURL) {
        opt.cacheKey = opt.webURL + "?getListContentTypes=" + opt.listName;

        // IF cache was requested and we have it cached, resolve now
        if (opt.cache && cache.isCached(opt.cacheKey)) {
            return JSON.parse(JSON.stringify(cache.get(opt.cacheKey)));
        }

        return apiFetch(webURL + "_vti_bin/Lists.asmx", {
            method: "POST",
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8'
            },
            body: "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>" +
            "<soap:Body><GetListContentTypes xmlns='http://schemas.microsoft.com/sharepoint/soap/'><listName>" +
            opt.listName + "</listName></GetListContentTypes></soap:Body></soap:Envelope>"
        })
            .then(function(response){
                let contentTypes = getNodesFromXml({
                    xDoc:       response.content,
                    nodeName:   "ContentType"
                });

                if (opt.cache) {
                    cache(opt.cacheKey, contentTypes);
                }

                return JSON.parse(JSON.stringify(contentTypes));
            });
    });
};

getListContentTypes.defaults = {
    listName:   "",
    webURL:     "",
    cache:      true
};

export default getListContentTypes;
