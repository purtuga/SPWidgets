import apiFetch from "../sputils/apiFetch";
import cache from "../sputils/cache";
import getSiteWebUrl from "./getSiteWebUrl";
import objectExtend from "common-micro-libs/src/jsutils/objectExtend";
import domFind from "common-micro-libs/src/domutils/domFind";

    /**
     * Given a list name, this method will query the SP service and retrieve
     * the list of forms for it.
     *
     * @param {Object} options
     * @param {String} options.listName
     * @param {String} [options.webUrl='currentSiteUrl']
     *
     * @returns {Promise<FormCollection, Error>}
     *  Promise is resolved with an object containing the forms.
     *  If rejected, then an `Error` object is returned. The object
     *  will have an additional property called `response` with the api response.
     *
     * @example
     *
     * // Sample response
     *  [
     *      {
     *          url: "http:/.../Lists/Tasks/DispForm.aspx",
     *          type: "DisplayForm"
     *      },
     *      {
     *          url: "http:/.../Lists/Tasks/EditForm.aspx",
     *          type: "EditForm"
     *      },
     *      {
     *          url: "http:/.../Lists/Tasks/NewForm.aspx",
     *          type: "NewForm"
     *      }
     *  ]
     */
    var getListFormCollection = function(options){

        var opt = objectExtend({}, getListFormCollection.defaults, options);

        // Backwards compatibility...
        if (typeof opt.cacheXML !== "undefined") {
            opt.cache = opt.cacheXML;
        }

        return getSiteWebUrl(opt.webURL).then(function(webURL){

            var endPoint = webURL + "_vti_bin/Forms.asmx";

            opt.cacheKey = endPoint + "?Operation=GetFormCollection&List=" + opt.listName;

            if (opt.cache && cache.isCached(opt.cacheKey)) {
                return cache(opt.cacheKey);
            }

            var responsePromise = apiFetch(endPoint, {
                method:     "POST",
                headers:    { "Content-Type": "text/xml;charset=UTF-8" },
                body:       "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
                            "<soap:Body><GetFormCollection xmlns=\"http://schemas.microsoft.com/sharepoint/soap/\">" +
                            "<listName>" + opt.listName + "</listName></GetFormCollection></soap:Body></soap:Envelope>"
            })
            .then(function(response){
                /**
                 * A list Forms Collection
                 *
                 * @typedef FormCollection
                 *
                 * @type {Array<Object>}
                 *
                 * @example
                 *
                 *  [
                 *      {
                 *          url: "http:/.../Lists/Tasks/DispForm.aspx",
                 *          type: "DisplayForm"
                 *      },
                 *      {
                 *          url: "http:/.../Lists/Tasks/EditForm.aspx",
                 *          type: "EditForm"
                 *      },
                 *      {
                 *          url: "http:/.../Lists/Tasks/NewForm.aspx",
                 *          type: "NewForm"
                 *      }
                 *  ]
                 */
                return domFind(response.content, "Form").map(function(formEle){
                    return {
                        url:    webURL + formEle.getAttribute("Url"),
                        type:   formEle.getAttribute("Type")
                    };
                });
            });

            if (opt.cache) {
                cache(opt.cacheKey, responsePromise);

            } else {
                cache.clear(opt.cacheKey);
            }

            // On failure, ensure cached values are cleared.
            responsePromise["catch"](function(){
                cache.clear(opt.cacheKey);
            });

            return responsePromise;
        });
    };

    getListFormCollection.defaults = {
        listName:   "",
        webURL:     "",
        cache:      true
    };

    export default getListFormCollection;

