define([
    "../sputils/apiFetch",
    "../sputils/cache",
    "./getSiteWebUrl",
    "../models/ListModel",
    "vendor/jsutils/objectExtend"
], function(
    apiFetch,
    cache,
    getSiteWebUrl,
    ListModel,
    objectExtend
){

     /**
     * Get a list definition from sharepoint or return its cached version
     * if one exists.
      *
     * @function
     *
     * @param {Object} options
     *
     * @param {String} options.listName
     * @param {String} [options.webURL='']
     * @param {Boolean} [options.cache=true]
     *      The message response is cached UNTIL the next time the same
     *      request is received with cacheXML set to false.
     * @param {Boolean} [options.ListModel]
     *      List model constructor factory. Factory must expose a method called
     *      `create` that accetps two input parameters: the source (XML, JSON) and
     *      the `options`.
     *
     * @return {Promise<ListModel, Error>}
     *  Resolved one object - ListModel object.
     */
     var getList = function (options) {
         var opt = objectExtend({}, getList.defaults, options);

         return getSiteWebUrl(opt.webURL).then(function (webURL) {
             opt.webURL = webURL;

             var getCacheKey = function (listName) {
                     return opt.webURL + "?List=" + listName;
                 },
                 reqPromise;

             // Backwards compatibility
             if (typeof opt.cacheXML !== 'undefined') {
                 opt.cache = opt.cacheXML;
             }

             opt.webURL += "_vti_bin/Lists.asmx";
             opt.cacheKey = getCacheKey(opt.listName);
             opt.isCached = cache.isCached(opt.cacheKey);

             // If cacheXML is true and we have a cached version, return it.
             if (opt.cache && opt.isCached) {
                 return cache(opt.cacheKey);
             }

             // If cache is FALSE, and we have a cached version of this key,
             // then remove the cached version - basically reset
             if (opt.isCached) {
                 cache.clear(opt.cacheKey);
             }

             reqPromise = apiFetch(opt.webURL, {
                 method: "POST",
                 headers: {
                     'Content-Type': 'text/xml;charset=UTF-8'
                 },
                 body: '<?xml version="1.0" encoding="utf-8"?>' +
                     '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                     '<soap:Body><GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>' +
                     opt.listName + '</listName></GetList></soap:Body></soap:Envelope>'
             })
             .then(function (response) {
                 var listDef = opt.ListModel.create(response.content, {
                     webURL: opt.webURL
                 });

                 // If cache is true, then create cache with internal name and external
                 if (opt.cache) {
                     // Was list name an internal UID? then use list Title
                     if (opt.listName.indexOf("{") === 0) {
                         cache(getCacheKey(listDef.Title), reqPromise);

                         // Else, use the ID to cache
                     } else {
                         cache(getCacheKey(listDef.ID), reqPromise);
                     }
                 }

                 return listDef;
             });

             // If there is a failure, remove from cache
             reqPromise.catch(function () {
                 cache.clear(opt.cacheKey);
             });

             // If cache was true, then cache this promise
             if (opt.cache) {
                 cache(opt.cacheKey, reqPromise);
             }

             return reqPromise;
         });
     };

    getList.defaults = {
        listName:   '',
        webURL:     '',
        cache:      true,
        ListModel:  ListModel
    };

    return getList;
});
