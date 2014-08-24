/**
 * By default, this API method will add its self to jQuery under the following
 * namespace: $.SPAPI. This can be altered by defining an object named 'SPAPI'
 * just prior to loading/executing this code.
 *
 * @Example
 *
 *  // Load this API method into a custom namespace
 *  <script type="text/javascript">
 *      var SPAPI = {};
 *  </script>
 *  <script type"text/javascript" src="path/to/this/file.js"/>
 *
 */
(function($, namespace){

    var API = namespace || {};

    if (!namespace) {

        if (typeof $.SPAPI === "undefined") {

            $.SPAPI = API;

        } else {

            API = $.SPAPI;

        }

    }

    /**
     * Method to retrieve data from a SharePoint list using GetListItems or
     * GetListItemChangesSinceToken operations of the List.axps webservice.
     * @function
     *
     * @param {Object} opt
     *      Supports same input options as SPServices
     * @param {Object} opt.listName
     * @param {String} [opt.webURL="currentSiteWeb"]
     * @param {String} [opt.viewName=""]
     * @param {String} [opt.CAMLViewFields=""]
     * @param {String} [opt.CAMLQuery=""]
     * @param {String|Number} [opt.CAMLRowLimit=""]
     * @param {String} [opt.operation="GetListItems"]
     *      Value Could also be set to "GetListItemChangesSinceToken".
     * @param {Boolean} [opt.changeToken=""]
     *      Used only when opt.operation is "GetListItemChangesSinceToken"
     * @param {Boolean} [opt.cacheXML=false]
     * @param {Boolean} [opt.async=true]
     * @param {Function} [opt.completefunc=null]
     *      Function given 3 input parameters:
     *      jqXHR (an Object)
     *      status (a String)
     *      rows (Array of Objects)
     *
     * @return {jQuery.Promise}
     *      Promise is resolved with 3 input parameters:
     *      Array = rows (could be empty if error)
     *      Object = jqXHR
     *      String = status
     *
     * Dependencies:
     *
     *  namespace.getSiteUrl()
     *  namespace.getNodesFromXml()
     *  namespace.doesMsgHaveError()
     *
     *
     */
    API.getListItems = (function(){

        var getRows     = null,
            Me          = null,
            callerFn    = function(){

                            if (Me === null) { Me = this; }

                            return getRows.apply(this, arguments);

                        };

        // Define defaults. User can change these on their function attachment.
        callerFn.defaults = {
            listName:       '',
            webURL:         '',
            viewName:       '',
            CAMLViewFields: '',
            CAMLQuery:      '',
            CAMLRowLimit:   '',
            operation:      'GetListItems', // Optionally: set it to = GetListItemChangesSinceToken
            cacheXML:       false,
            async:          true,
            completefunc:   null,
            changeToken:    '' // GetListChangesSinceToken only
        };

        // Makes the AJax call to SharePoint to get the data. Returns a jQuery.Promise
        getRows = function (opt) {

            var options = $.extend({}, callerFn.defaults, opt),
                reqPromise;

            if (!options.webURL) {

                options.webURL = Me.getSiteUrl();

            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                options.webURL += "/";

            }

            options.webURL += "_vti_bin/Lists.asmx";

            options.cacheKey = options.webURL + "?" +
                [
                    options.listName,
                    options.viewName,
                    options.CAMLViewFields,
                    options.CAMLQuery,
                    options.CAMLRowLimit,
                    options.operation,
                    options.changeToken
                ].join("|");
            options.isCached = Me.cache.isCached(options.cacheKey);

            // If cacheXML is true and we have a cached version, return it.
            if (options.cacheXML && options.isCached) {

                reqPromise =  Me.cache(options.cacheKey);

                // If a completefunc was defined on this call,
                // execute it.
                if ($.isFunction(options.completefunc)) {

                    reqPromise.then(function(rows, data, status){

                        options.completefunc(data, status, rows);

                    });

                }

                return reqPromise;

            }

            // If cacheXML is FALSE, and we have a cached version of this key,
            // then remove the cached version - basically reset
            if (options.isCached) {

                Me.cache.clear(options.cacheKey);

            }

            reqPromise = $.Deferred(function(dfd){

                $.ajax({
                    type:           "POST",
                    cache:          false,
                    async:          options.async,
                    url:            options.webURL,
                    contentType:    "text/xml;charset=utf-8",
                    dataType:       "xml",
                    data:           "<?xml version=\"1.0\" encoding=\"utf-8\"?><soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
                        "<soap:Body>" +"<" + options.operation + " xmlns=\"http://schemas.microsoft.com/sharepoint/soap/\"><listName>" +
                        options.listName + "</listName><viewName>" +
                        (options.viewName || "") +
                        "</viewName><query>" +
                        (options.CAMLQuery || "<Query></Query>") +
                        "</query><viewFields>" +
                        (options.CAMLViewFields || "<ViewFields></ViewFields>") +
                        "</viewFields><rowLimit>" +
                        (options.CAMLRowLimit || 0) +
                        "</rowLimit><queryOptions>" +
                        (options.CAMLQueryOptions || "<QueryOptions></QueryOptions>") +
                        "</queryOptions>" +
                        (       options.operation === "GetListItemChangesSinceToken"
                            ?   "<changeToken>" + options.changeToken + "</changeToken>"
                            :   ""
                        ) +
                        "</" + options.operation +"></soap:Body></soap:Envelope>",
                    complete:       function(data, status) {

                        var rows = [];

                        if (status === "error" || Me.doesMsgHaveError(data)) {

                            // If cacheXML was true, then remove this from cache.
                            // No point in caching failures.
                            if (options.cacheXML) {

                                Me.cache.clear(options.cacheKey);

                            }

                            dfd.rejectWith($, [ rows, data, status ]);

                            if ($.isFunction(options.completefunc)) {

                                options.completefunc(data, status, rows);

                            }
                            return;

                        }

                        rows = Me.getNodesFromXml({
                                xDoc:       data.responseXML,
                                nodeName:   "z:row"
                            });

                        dfd.resolveWith($, [ rows, data, status ]);

                        if ($.isFunction(options.completefunc)) {

                            options.completefunc(data, status, rows);

                        }

                    }//end: $.ajax().success()
                });

            }).promise();

            // If cacheXML was true, then cache this promise
            if (options.cacheXML) {

                Me.cache(options.cacheKey, reqPromise);

            }

            return reqPromise;

        }; //end: getRows()

        return callerFn;

    })(); //end: getListItems()

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));

