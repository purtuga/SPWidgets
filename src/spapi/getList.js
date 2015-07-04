define([
    "jquery",
    "../sputils/cache",
    "./getSiteUrl",
    "../models/ListModel"
], function(
    $,
    cache,
    getSiteUrl,
    ListModel
){

    var

     /**
     * Get a list definition from sharepoint or return its cached version
     * if one exists.
     * @function
     *
     * @param {Object} options
     *
     * @param {String} options.listName
     * @param {String} [options.webURL='']
     * @param {Boolean} [options.async=true]
     * @param {Boolean} [options.cacheXML=true]
     *      The message response is cached UNTIL the next time the same
     *      request is received with cacheXML set to false.
     * @param {Boolean} [options.ListModel]
     *      List model constructor factory. Factory must expose a method called
     *      `create` that accetps two input parameters: the source (XML, JSON) and
     *      the `options`.
     *
     * @return {jQuery.Promise}
     *          Resolved with 3 input params: data, textStatus, jqXHR
     *
     */
    getList = function(options){
        return getListDataUsingSoap.call(this, options);
    },

    getListDataUsingSoap = function(options) {

        var
        opt         = $.extend({}, getList.defaults, options),
        getCacheKey = function(listName){
            return opt.webURL + "?List=" + listName;
        },
        reqPromise;

        if (!opt.webURL) {
            opt.webURL = getSiteUrl();

        } else if (opt.webURL.charAt(opt.webURL.length - 1) !== "/") {
            opt.webURL += "/";
        }

        opt.webURL  += "_vti_bin/Lists.asmx";
        opt.cacheKey = getCacheKey(opt.listName);
        opt.isCached = cache.isCached(opt.cacheKey);

        // If cacheXML is true and we have a cached version, return it.
        if (opt.cacheXML && opt.isCached) {
            return $.Deferred(function(dfd){
                dfd.resolveWith($, [cache(opt.cacheKey)]);
            }).promise();
        }

        // If cacheXML is FALSE, and we have a cached version of this key,
        // then remove the cached version - basically reset
        if (opt.isCached) {
            cache.clear(opt.cacheKey);
        }

        reqPromise = $.Deferred(function(dfd){

            $.ajax({
                type:           "POST",
                cache:          false,
                async:          opt.async,
                url:            opt.webURL,
                contentType:    "text/xml;charset=utf-8",
                dataType:       "xml",
                data:           '<?xml version="1.0" encoding="utf-8"?>' +
                    '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                    '<soap:Body><GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>' +
                    opt.listName + '</listName></GetList></soap:Body></soap:Envelope>'
            })
            .then(function(data){

                var listDef = opt.ListModel.create(data);

                // If cacheXML is true, then create cache with internal name and external
                if (opt.cacheXML) {
                    cache(opt.cacheKey, listDef);
                    cache(getCacheKey(listDef.ID), listDef);
                }

                dfd.resolveWith($, [listDef]);

            })
            .fail(function(){

                dfd.rejectWith($, arguments);

                // If cacheXML was true, then remove this from cache.
                // No point in caching failures.
                if (opt.cacheXML) {
                    cache.clear(opt.cacheKey);
                }

            });

        }).promise();

        return reqPromise;

    };

    getList.defaults = {
        listName:   '',
        webURL:     '',
        cacheXML:   true,
        async:      true,
        ListModel:  ListModel
    };

    return getList;

});
