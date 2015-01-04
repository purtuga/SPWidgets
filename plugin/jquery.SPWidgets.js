/**
 * @fileOverview jquery.SPWidgets.js
 * jQuery plugin offering multiple Sharepoint widgets that can be used
 * for creating customized User Interfaces (UI).
 *
 * @version 20150102062141
 * @author  Paul Tavares, www.purtuga.com, paultavares.wordpress.com
 * @see     http://purtuga.github.com/SPWidgets/
 *
 * @requires jQuery.js {@link http://jquery.com}
 * @requires jQuery-ui.js {@link http://jqueryui.com}
 *
 * Build Date:  January 02, 2015 - 06:21 PM
 * Version:     20150102062141
 *
 */
;(function($, window, document, undefined){

    // Local pointer to jQuery given on input
    var jQuery = $,
        SPAPI  = {};

    // Need a shim because we insert styles into head
    document.head || (document.head = document.getElementsByTagName('head')[0]);

    (function(){

        "use strict";
        /*jslint nomen: true, plusplus: true */

        /**
         * Namespace for all properties and methods
         * @name        pt
         * @namespace   pt
         * @memberOf    jQuery
         */
        try {
            if (!$.pt) {
                $.pt = {};
            }
        } catch (e) {
            $.pt = {};
        }

        if ($.pt._cache === undefined) {

            /**
             * Local cache of data that is unlikely to change during
             * the live of the page.
             */
            $.pt._cache = {};

        }

        $.SPWidgets             = {};
        $.SPWidgets.version     = "20150102062141";
        $.SPWidgets.defaults    = {};
        $.SPWidgets.SPAPI       = SPAPI;

        // Here for backwards compatibility. Wraps API.doesMsgHaveError()
        $.fn.SPMsgHasError = function() {

            return SPAPI.doesMsgHaveError(this);

        };

        /**
         * Given a sharepoint webservices response, this method will
         * look to see if it contains an error and return that error
         * formated as a string.
         *
         * @return {String} errorMessage
         *
         */
        $.fn.SPGetMsgError = function(){

            var xMsg  = $(this),
                error = "",
                spErr = xMsg.find("ErrorCode"),
                count = 0;

            if (!spErr.length) {

                spErr = xMsg.find("faultcode");

            }

            if (!spErr.length) {

                return "";

            }

            // Loop through and get all errors.
            spErr.each(function(){

                var thisErr = $(this);
                if ( thisErr.text() !== "0x00000000" ) {

                    count += 1;
                    error += "(" + count + ") " + thisErr.text() + ": " +
                        thisErr.parent().children().not(thisErr).text() + "\n";

                }

            });

            error = count + " error(s) encountered! \n" + error;

            return error;

        }; /* $.fn.SPGetMsgError() */

        /**
         * An extreemly lightweight template engine for replacing
         * tokens in the form of {{name}} with values from an object
         * or a list (array) of objects
         *
         * @param {Object} tmplt
         * @param {Object} data
         *
         * @return {String} templated filled out
         *
         */
        $.SPWidgets.fillTemplate = function(tmplt, data) {

            var opt = {},i,j,x,y,item, tokenVal;

            // If user used an object to define input param, then parse that now
            if (typeof tmplt === "object" && arguments.length === 1) {

                data    = tmplt.data;
                tmplt   = tmplt.tmplt;

            }

            opt.response    = "";
            opt.template    = (     typeof tmplt !== "string"
                                ?   String($("<div/>").append(tmplt).html())
                                :   tmplt
                            );
            opt.tokens      = opt.template.match(/(\{\{.*?\}\})/g);

            if (!$.isArray(data)) {

                if (!data) {

                    data = [{}];

                } else {

                    data = [ data ];

                }

            }

            // If we have tokens in the template, then replace them
            if (opt.tokens !== null) {

                // If data tokens were passed in on input, then use them
                // in looking for that token in the template and replacing
                // it with the value defined.
                for(x=0,y=data.length; x<y; x++){

                    item = opt.template;

                    for(i=0,j=opt.tokens.length; i<j; i++){

                        opt.tokens[i]   = opt.tokens[i].replace(/[\{\}]/g, "");
                        tokenVal        = data[x][ opt.tokens[i] ] || '';

                        if ($.isFunction(tokenVal)) {

                            tokenVal = tokenVal();

                        }

                        item = item.replace("{{" + opt.tokens[i] + "}}", tokenVal);

                    }

                    opt.response += item;

                }

            } else {

                opt.response = opt.template;

            }

            return opt.response;

        }; //end: $.SPWidgets.fillTemplate()


        /**
         * Parses a Sharepoint lookup values as returned by webservices
         * (id;#title;#id;#Title) into an array of objects.
         *
         * @param {String} v
         *          Lookup items string as returned by SP webservices.
         *
         * @return {Array}
         *          Array of objects. Each object has two keys; title and id
         */
        $.SPWidgets.parseLookupFieldValue = function(v) {

            var r       = [],
                a       = String(v).split(';#'),
                total   = a.length,
                i, n, t;

            if (v === undefined) {

                return r;

            }

            for (i=0; i<total; i++){

                n = a[i];
                i++;
                t = a[i];

                if (n || t) {

                    r.push({ id: n, title: t });

                }

            }

            return r;

        }; //end: $.SPWidgets.parseLookupFieldValue


        /**
         * Given an array of CAML matches, this method will wrap them all in a
         * Logical condition (<And></And> or a <Or></Or>).
         *
         * @param {Object}  options
         *              Options for the call. See below.
         * @param {String}  options.type
         *              Static String. The type of logical condition that
         *              the 'values' should be wrapped in. Possible values
         *              are 'AND' or 'OR'.  Default is 'AND'.
         * @param {Array options.values
         *              The array of String elements that will be
         *              join into caml Logical condition.
         * @param {Function} [options.onEachValue=null]
         *              A function to process each items in the 'values'
         *              array. Function must return the value that should
         *              be used instead of the one found in the array. Use
         *              it to define the xml around each value
         *              (ex. <Eq><FieldRef>...</Eq>).
         *              Function is given 1 input param - the item currently
         *              being processed (from the 'values' input param).
         *
         * @return {String} logical Query as a single string.
         *
         * @example
         *   $.SPWidgets.getCamlLogical({
         *        type: "or",
         *        values: [
         *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test</Value></Eq>",
         *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test1</Value></Eq>",
         *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test2</Value></Eq>",
         *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test3</Value></Eq>",
         *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test4</Value></Eq>"
         *        ]
         *      })
         *
         *
         *     Concatenate multiple calls to getCamlLogical():
         *
         *     $.SPWidgets.getCamlLogical({
         *        type: "or",
         *        values: [
         *           "<Eq><FieldRef Name='ID' /><Value Type='Text'>10</Value></Eq>",
         *           "<Eq><FieldRef Name='ID' /><Value Type='Text'>15</Value></Eq>",
         *           $.SPWidgets.getCamlLogical({
         *              type: "and",
         *              values: [
         *                 "west",
         *                 "east"
         *              ],
         *              onEachValue: function(loc){
         *                 return "<Neq><FieldRef Name='Region'/><Value Type='Text'>" +
         *                         loc + "</Value></Neq>";
         *              }
         *          })
         *        ]
         *      })
         *
         */
        $.SPWidgets.getCamlLogical = function(options){

            var o = $.extend(
                        {},
                        {   type:           "AND",
                            values:         [],
                            onEachValue:    null
                        },
                        options),
                tagOpen     = "<And>",
                tagClose    = "</And>",
                logical     = "",
                total       = 0,
                last        = 0,
                haveFn      = false,
                newLogical  = "",
                totalBuilt  = 0,
                i;

            o.type = String(o.type).toUpperCase();

            if (!$.isArray(o.values)) {

                o.values = [o.values];

            }

            if (o.type !== "AND") {

                tagOpen     = "<Or>";
                tagClose    = "</Or>";

            }

            // logical = tagOpen;
            total   = o.values.length;
            last    = (total - 1);
            haveFn  = $.isFunction(o.onEachValue);

            // Loop through all query logical strings and build
            // the overall filter logical
            for ( i=0; i<total; i++){

                newLogical = '';

                if (haveFn) {

                    newLogical += String(o.onEachValue(o.values[i])).toString();

                } else {

                    newLogical += String(o.values[i]).toString();

                }

                if (newLogical) {

                    logical += newLogical;
                    totalBuilt++;

                    // If the total number of items is >2, then build the rest
                    // of the logicals by calling this method again with the
                    // remainder of the filters as input.
                    if ((last - i) > 1){

                        newLogical = $.SPWidgets.getCamlLogical(
                                    $.extend({}, o, {
                                        values: o.values.slice((i + 1), (total - i))
                                    })
                                );

                        // If building the remainder of the filter returned
                        // something, then add it to the list and incrment the
                        // number of logicals built.
                        if (newLogical) {

                            totalBuilt++;
                            logical += newLogical;

                        }

                        // Break out of this loop, even if there are other
                        // items... The call above will take care of the others
                        break;
                    }

                }

            }

            if (totalBuilt > 1){

                logical = tagOpen + logical + tagClose;
            }

            return logical;

        };// $.SPWidgets.getCamlLogical()

        /**
         * Returns a date string in the format expected by Sharepoint
         * Date/time fields. Usefull in doing filtering queries.
         *
         * Credit:  Matt (twitter @iOnline247)
         *          {@see http://spservices.codeplex.com/discussions/349356}
         *
         * @param {Date} [dateObj=Date()]
         * @param {String} [formatType='local']
         *              Possible formats: local, utc
         *
         * @return {String} a date string.
         *
         */
        $.SPWidgets.SPGetDateString = function( dateObj, formatType ) {

            formatType  = String(formatType || "local").toLowerCase();
            dateObj     = dateObj || new Date();

            function pad( n ) {

                return n < 10 ? '0' + n : n;

            }

            var ret = '';

            if (formatType === 'utc') {

                ret = dateObj.getUTCFullYear() + '-' +
                        pad( dateObj.getUTCMonth() + 1 ) + '-' +
                        pad( dateObj.getUTCDate() ) + 'T' +
                        pad( dateObj.getUTCHours() ) + ':' +
                        pad( dateObj.getUTCMinutes() )+ ':' +
                        pad( dateObj.getUTCSeconds() )+ 'Z';

            } else {

                ret = dateObj.getFullYear() + '-' +
                        pad( dateObj.getMonth() + 1 ) + '-' +
                        pad( dateObj.getDate() ) + 'T' +
                        pad( dateObj.getHours() ) + ':' +
                        pad( dateObj.getMinutes() )+ ':' +
                        pad( dateObj.getSeconds() );

            }

            return ret;

        }; //end: $.SPWidgets.SPGetDateString()

        /**
         * Parses a date string in ISO 8601 format into a Date object.
         * Date format supported on input:
         *  2013-09-01T01:00:00
         *  2013-09-01T01:00:00Z
         *  2013-09-01T01:00:00Z+05:00
         *
         * @param {String} dateString
         *      The date string to be parsed.
         *
         * @return {Date|Null}
         *      If unable to parse string, a Null value will be returned.
         *
         * @see {https://github.com/csnover/js-iso8601}
         *      Method was developed using some of the code from js-iso8601
         *      project on github by csnover.
         *
         */
        $.SPWidgets.parseDateString = function(dateString) {

            var dtObj       = null,
                re, dtPieces, i, j, numericKeys, minOffset;

            if (!dateString) {

                return dtObj;

            }

            // let's see if Date.parse() can do it?
            // We append 'T00:00' to the date string case it is
            // only in format YYYY-MM-DD
            dtObj = Date.parse(
                        (       dateString.length === 10
                            ?   dateString + "T00:00"
                            :   dateString
                        )
                    );

            if (dtObj) {

                return new Date(dtObj);

            }

            // Once we parse the date string, these locations
            // in the array must be Numbers.
            numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ];

            // Define regEx
            re = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;

            // dtPieces:
            //    [0]
            //    [1]   YYYY
            //    [2]   MM
            //    [3]   DD
            //    [4]   HH
            //    [5]   mm
            //    [6]   ss
            //    [7]   msec
            //    [8]   Z
            //    [9]   +|-
            //    [10]  Z HH
            //    [11]  Z mm
            dtPieces    = dateString.match(re);


            if( !dtPieces ){

                return dtObj;

            }

            for(i=0,j=numericKeys.length; i<j; i++){

                dtPieces[numericKeys[i]] = ~~dtPieces[numericKeys[i]];

            }

            // Month is "zero" based
            --dtPieces[2];

            // Date specifed UTC Format?
            if (dtPieces[8] === 'Z') {

                // do we need to calculate offset to minutes?
                if (dtPieces[9] !== undefined) {

                    minOffset = dtPieces[10] * 60 + dtPieces[11];

                    if (dtPieces[9] === '+') {

                        minOffset = (- minOffset);

                    }

                    dtPieces[5] += minOffset;

                }

                dtObj = new Date(
                        Date.UTC(
                            dtPieces[1],
                            dtPieces[2],
                            dtPieces[3],
                            dtPieces[4],
                            dtPieces[5],
                            dtPieces[6],
                            dtPieces[7]
                        )
                    );

            // Else: Date was did not seem to be UTC. Do local.
            } else {

                dtObj = new Date(
                        dtPieces[1],
                        dtPieces[2],
                        dtPieces[3],
                        dtPieces[4],
                        dtPieces[5],
                        dtPieces[6],
                        dtPieces[7]
                    );

            }

            return dtObj;

        }; //end: $.SPWidgets.parseDateString()

        /**
         * Make a set of element the same height by taking the height of
         * the longest element.
         *
         * @param {HTMLElement|Selector|jQuery} ele - Set of elements
         * @param {Interger} [pad=0]                - Number of pixels to add on to the height
         * @param {String} [cssProp=height]         - The css property to be set. Default is height
         *
         * @return {Object} ele (input param) is returned
         *
         */
        $.SPWidgets.makeSameHeight = function(ele, pad, cssProp) {

            var h = 0,
                e = $(ele);

            if (!cssProp) {

                cssProp = "height";

            }

            e.each(function(){

                var thisEle = $(this).css(cssProp, "");

                if (h < thisEle.outerHeight(true)) {

                    h = thisEle.outerHeight(true);

                }

            });

            if (h > 0) {

                if (pad) {

                    h += pad;

                }

                e.css(cssProp, h);

            }

            return ele;

        }; // end: $.SPWidgets.MakeSameHeight()

        /**
         * Escapes html code. Characters that are escaped include
         * <, > and &. These are converted to the HTML safe
         * characters.  This method can also be used to escape XML.
         *
         * @param {Object} xmlString
         *          The html code to be escaped.
         *
         * @return {String}
         *          html escaped
         *
         */
        $.SPWidgets.escapeXML = function(xmlString) {

            if ( typeof xmlString !== "string" ) {

                return "";

            }

            return xmlString
                    .replace(/&/g,'&amp;')
                    .replace(/</g,'&lt;')
                    .replace(/>/g,'&gt;')
                    .replace(/'/g,"&apos;")
                    .replace(/"/g,"&quot;");

        }; /* $.SPWidgets.escapeXML() */

        /**
         * Un-escapes html code. Characters that are un-escaped include
         * "&lt;", "&gt;" "&apos;", "&quot;" and "&amp;". These are
         * converted to <, >, ', " and &
         *
         * @param {Object} xmlString
         *          The html code to be un-escaped.
         *
         * @return {String}
         *          html string escaped.
         *
         */
        $.SPWidgets.unEscapeXML = function(xmlString){

            if ( typeof xmlString !== "string" ) {

                return "";

            }

            return xmlString
                    .replace(/&lt;/g,'<')
                    .replace(/&gt;/g,'>')
                    .replace(/&amp;/g,'&')
                    .replace(/&apos;/g,"'")
                    .replace(/&quot;/g,'"');

        }; /* $.SPWidgets.unEscapeXML() */

        /**
         * Returns information about the runtime as it applies
         * to SPWidgets.
         *
         * @return {Object} info
         *
         */
        $.SPWidgets.getRuntimeInfo = function() {

            // Class
            function Info() {

                this.SPWidgets      = $.SPWidgets.version;
                this.jQuery         = ($.fn.jquery || '?');
                this.jQueryUI       = '?';
                this.jQueryUICss    = "?";

                return this;
            }

            Info.prototype.asString = function() {

                var me      = this,
                    resp    = "",
                    prop;

                for (prop in me) {

                    if (me.hasOwnProperty(prop)) {

                        resp += "[ " + prop + " = " + me[prop] + " ] ";

                    }

                }

                return resp;

            }; //end: asString()

            var info        = new Info(),
                $testObj    = $('<div style="position:fixed;width:100px;left:-1000px;"/>')
                                .appendTo("body"),
                testInfo    = '';

            try {

                info.jQueryUI = jQuery.ui.version;

            } catch(e){}

            // Check if jQuery ui css loaded
            testInfo = $testObj.css("background-image");
            $testObj.addClass('ui-widget-header');

            if ($testObj.css("background-image") !== testInfo) {

                info.jQueryUICss = 'loaded';

            }

            $testObj.remove();

            return info;

        }; //end: $.SPWidgets.getRuntimeInfo()

        /**
         * Returns the SharePoint version number. This is accomplished by
         * looking for  the SP namespace and if it is define, parsing the
         * SP.ClientSchemeversions value.
         *
         * @param {Boolean} returnExternal
         *          If true, then the external version (ex. 2007, 2010) is
         *          returned. Default is to return the internal version number
         *          (ex. 12, 14)
         *
         * @return {String}
         *
         */
        $.SPWidgets.getSPVersion = function(returnExternal) {

            // Some approaches below taken from:
            // http://sharepoint.stackexchange.com/questions/74978/can-i-tell-what-version-of-sharepoint-is-being-used-from-javascript

            var versionMap = {
                                12: '2007',
                                14: '2010',
                                15: '2013'
                            },
                version     = 12,
                foundIt     = false;

            if (typeof SP !== "undefined") {

                version = 14;

                if (SP.ClientSchemaVersions) {

                    if (SP.ClientSchemaVersions.currentVersion) {

                        version = parseInt(SP.ClientSchemaVersions.currentVersion);
                        foundIt = true;

                    }

                }

                if (!foundIt && (typeof _spPageContextInfo !== "undefined")) {

                    version = parseInt(_spPageContextInfo.webUIVersion);

                    if (version === 4) {

                        version = 14;

                    }

                }

            }

            if (returnExternal) {

                version = versionMap[version] || version;

            }

            return version;

        }; //end: $.SPWidgets.getSPVersion();


    })(jQuery); /** *********** END: $.SPWidgets common */

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
     * Checks if an xml message has an error. Taken from
     * SPWidgets.
     *
     * @param {jQuery|XMLDocument} xmlMsg
     *
     * @return {Boolean}
     */
    API.doesMsgHaveError = function(xmlMsg) {

        var $msg        = $(xmlMsg),
            spErrCode   = $msg.find("ErrorCode"),
            response    = false;

        if ( !spErrCode.length ) {

            if ( $msg.find("faultcode").length ) {

                return true;

            }

            return false;

        }

        spErrCode.each(function(){

            if ( $(this).text() !== "0x00000000" ) {

                response = true;
                return false;

            }

        });

        return response;

    }; /* doesMsgHaveError() */


})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));
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
     * @param {Function} [options.completefunc=null]
     *      Deprecated. Use returned promise to process response.
     *
     * @return {jQuery.Promise}
     *          Resolved with 3 input params: data, textStatus, jqXHR
     *
     * Depends on:
     *
     * .cache()
     * .getSiteUrl()
     *
     */
    API.getList = (function() {

        var Me          = null,
            getList     = null,
            callerFn    = function(){

                    if (Me === null) { Me  = this; }
                    getList.apply(this, arguments);

            };

        // Define defaults. User can change these on their function attachement.
        callerFn.defaults = {
            listName:       '',
            webURL:         '',
            cacheXML:       true,
            async:          true,
            completefunc:   null
        };

        // Makes the ajax call to sharepoint and returns a jQuery.promise
        getList = function(opt) {

            var options = $.extend({}, callerFn.defaults, opt),
                reqPromise;


            if (!options.webURL) {

                options.webURL = Me.getSiteUrl();

            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                options.webURL += "/";

            }

            options.webURL += "_vti_bin/Lists.asmx";

            options.cacheKey = options.webURL + "?List=" + options.listName;
            options.isCached = Me.cache.isCached(options.cacheKey);

            // If cacheXML is true and we have a cached version, return it.
            if (options.cacheXML && options.isCached) {

                reqPromise =  Me.cache(options.cacheKey);

                // If a completefunc was defined on this call,
                // execute it.
                if ($.isFunction(options.completefunc)) {

                    reqPromise.then(function(data, textStatus, jqXHR){

                        options.completefunc(jqXHR, textStatus);

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
                    data:           '<?xml version="1.0" encoding="utf-8"?>' +
                        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '<soap:Body><GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>' +
                        options.listName + '</listName></GetList></soap:Body></soap:Envelope>'
                })
                .done(function(data, textStatus, jqXHR){

                    dfd.resolveWith($, [data, textStatus, jqXHR]);

                    if ($.isFunction(options.completefunc)) {

                        // Call the complete function (same signature as SPServices)
                        options.completefunc(jqXHR, textStatus);

                    }

                })
                .fail(function(){

                    dfd.rejectWith($, arguments);

                    // If cacheXML was true, then remove this from cache.
                    // No point in caching failures.
                    if (options.cacheXML) {

                        Me.cache.clear(options.cacheKey);

                    }


                });

            }).promise();

            // If cacheXML was true, then cache this promise
            if (options.cacheXML) {

                Me.cache(options.cacheKey, reqPromise);

            }

            return reqPromise;

        }; //end: function()

        return callerFn;

    })(); //end: API.getList()

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));
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
     * Given a list name, this method will query the SP service and retrieve
     * the list of forms for it.
     *
     * @param {Object} options
     * @param {Object} options.listName
     * @param {Object} [options.webUrl='currentSiteUrl']
     * @param {Object} [options.cacheXML=false]
     * @param {Object} [options.async=true]
     * @param {Object} [options.completefunc]
     *      Options is deprecated. Use .promise that is returned.
     *
     * @return {jQuery.Promise}
     *      Promise is resolved with two input params:
     *      XMLDocument : Response from Sharepoint
     *      status : the ajax status string (error or success)
     *
     * Depends on:
     *
     * .getSiteUrl()
     * .doesMsgHaveError()
     * .cache()
     */
    API.getListFormCollection = (function(){

        var getData     = null,
            Me          = null,
            callerFn    = function(){

                            if (Me === null) {

                                Me = this;

                            }

                            return getData.apply(this, arguments);

                        };

        // Define defaults. User can change these on their function attachment.
        callerFn.defaults = {
            listName:       '',
            webURL:         '',
            cacheXML:       false,
            async:          true,
            completefunc:   null
        };

        /**
         * Retrieves the data from Sharepoint
         */
        getData = function(opt){

            var options = $.extend({}, callerFn.defaults, opt),
                reqPromise;

            if (!options.webURL) {

                options.webURL = Me.getSiteUrl();

            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                options.webURL += "/";

            }

            options.webURL += "_vti_bin/Forms.asmx";

            options.cacheKey = options.webURL + "?List=" + options.listName;
            options.isCached = Me.cache.isCached(options.cacheKey);

            // If cacheXML is true and we have a cached version, return it.
            if (options.cacheXML && options.isCached) {

                reqPromise =  Me.cache(options.cacheKey);

                // If a completefunc was defined on this call,
                // execute it.
                if ($.isFunction(options.completefunc)) {

                    reqPromise.then(function(xdata, status){

                        options.completefunc(xdata, status);

                    });

                }

                return reqPromise;

            }

            // Return a deferred.
            reqPromise = $.Deferred(function(dfd){

                // If cacheXML is FALSE, and we have a cached version of this key,
                // then remove the cached version - basically reset
                if (options.isCached) {

                    Me.cache.clear(options.cacheKey);

                }

                $.ajax({
                    type:           "POST",
                    cache:          false,
                    async:          options.async,
                    url:            options.webURL,
                    contentType:    "text/xml;charset=utf-8",
                    dataType:       "xml",
                    data:           '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '<soap:Body><GetFormCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/">' +
                        '<listName>' + options.listName + '</listName></GetFormCollection></soap:Body></soap:Envelope>',
                    complete:       function(xdata, status) {

                        // Process Error from status
                        if (status === "error" || Me.doesMsgHaveError(xdata)) {

                            // If cacheXML was true, then remove this from cache.
                            // No point in caching failures.
                            if (options.cacheXML) {

                                Me.cache.clear(options.cacheKey);

                            }

                            dfd.rejectWith( $, [xdata, status] );
                            return;

                        }

                        dfd.resolveWith($, [xdata, status]);

                        if ($.isFunction(options.completefunc)) {

                            options.completefunc(xdata, status);

                        }


                    }//end: $.ajax().success()
                });

            }).promise(); //end: return .promise()

            // If cacheXML was true, then cache this promise
            if (options.cacheXML) {

                Me.cache(options.cacheKey, reqPromise);

            }

            return reqPromise;

        }; //end: getData

        return callerFn;

    })(); //end: API.getListFormCollection()

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));
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
     * @param {String} [opt.CAMLQueryOptions=""]
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
     *  namespace.cache()
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
            CAMLQueryOptions:   '',
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
                    options.CAMLQueryOptions,
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
     * Returns the requested nodes from the given xml document
     *
     * @param {Object} options
     * @param {XMLDocument} options.xDoc
     * @param {String} options.nodeName
     * @param {Boolean} [options.asJQuery=false]
     *      If true, then xmlNodes will be returned as a jQuery
     *      selection object, ready to be traversed and/or filtered.
     * @param {Boolean} [options.cleanAttr=true]
     *      if true, the 'ows_' will be stripped from column names.
     *      Only used when asJQuery=false.
     *
     * @return {Array|jQuery}
     *      Each object that represents an XML node will contain properties
     *      for each attribute found on that node. Also, the Object will
     *      contain a special attribute - ___xmlNode - that is the actual
     *      xml node.
     *
     * @example
     *
     *  API.getNodesFromXml({
     *      xDoc: jgXHR.responseXML,
     *      nodeName: "z:row"
     *  });
     *
     * // returns something similar to the following:
     *  {
     *      ID: "123",
     *      Title: "item title",
     *      ___xmlNode: XMLElement
     *  }
     *
     *
     */
    API.getNodesFromXml = function(options) {

        var opt     = $.extend({}, {
                        xDoc:       null,
                        nodeName:   '',
                        asJQuery:   false,
                        cleanAttr:  true
                    }, options),
            nodes   = opt.xDoc.getElementsByTagName(opt.nodeName),
            getNodeAsObj, nodeList, i, j;

        if (nodes.length === 0 && opt.nodeName === "z:row") {

            nodes = opt.xDoc.getElementsByTagName('row');

        }

        if (nodes.length === 0 && opt.nodeName === "rs:data") {

            nodes = opt.xDoc.getElementsByTagName('data');

        }

        if (opt.asJQuery === true) {

            return $(nodes);

        }

        nodeList = [];

        getNodeAsObj = function(ele) {

            var attrs   = ele.attributes,
                row     = {},
                name,x,y;

            for(x=0,y=attrs.length; x<y; x++){

                name = attrs[x].name;

                if (opt.cleanAttr) {

                    if (name.indexOf("ows_") > -1) {

                        name = name.replace("ows_", "");

                    }

                    // Code below commented off because replacing the space does not really
                    // indicate that it is external name.
                    // if (name.indexOf("_x0020_") > -1) {
//
                        // name = name.replace(/_x0020_/g, " ");
//
                    // }

                }

                row[name] = attrs[x].value;

            }

            // Also store the original xml node
            row.___xmlNode = ele;

            return row;

        };

        for (i=0,j=nodes.length; i<j; i++){

            nodeList.push(getNodeAsObj(nodes[i]));

        }

        return nodeList;

    }; //end: API.getNodesFromXml

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));

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
     * Given a list name, this method will query the SP service and retrieve
     * the list of forms for it.
     *
     * @param {Object} options
     * @param {Object} options.searchText
     * @param {Object} [options.maxResults=50]
     * @param {Object} [options.principalType='All']
     *      Default is User. Others include: None, DistributionList,
     *      SecurityGroup, SharePointGroup, All
     * @param {Object} [options.webUrl='currentSiteUrl']
     * @param {Object} [options.cacheXML=false]
     * @param {Object} [options.async=true]
     * @param {Object} [options.completefunc]
     *      Options is deprecated. Use .promise that is returned.
     *
     * @return {jQuery.Promise}
     *      Promise is resolved with two input params:
     *      XMLDocument : Response from Sharepoint
     *      status : the ajax status string (error or success)
     *
     * Depends on:
     *
     * .getSiteUrl()
     * .doesMsgHaveError()
     * .cache()
     */
    API.getSearchPrincipals = (function(){

        var getData     = null,
            Me          = null,
            callerFn    = function(){

                            if (Me === null) {

                                Me = this;

                            }

                            return getData.apply(this, arguments);

                        };

        // Define defaults. User can change these on their function attachment.
        callerFn.defaults = {
            searchText:     '',
            maxResults:     50,
            principalType:  'All',
            webURL:         '',
            cacheXML:       false,
            async:          true,
            completefunc:   null
        };

        /**
         * Retrieves the data from Sharepoint
         */
        getData = function(opt){

            var options = $.extend({}, callerFn.defaults, opt),
                reqPromise;

            // Return a deferred.
            reqPromise = $.Deferred(function(dfd){


                if (!options.webURL) {

                    options.webURL = Me.getSiteUrl();

                } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                    options.webURL += "/";

                }

                options.webURL += "_vti_bin/People.asmx";

                options.cacheKey = options.webURL + "?" +
                    [
                        options.searchText,
                        options.maxResults,
                        options.principalType
                    ].join("|");
                options.isCached = Me.cache.isCached(options.cacheKey);

                // If cacheXML is true and we have a cached version, return it.
                if (options.cacheXML && options.isCached) {

                    reqPromise =  Me.cache(options.cacheKey);

                    // If a completefunc was defined on this call,
                    // execute it.
                    if ($.isFunction(options.completefunc)) {

                        reqPromise.then(function(xdata, status){

                            options.completefunc.call($, xdata, status);

                        });

                    }

                    return reqPromise;

                }

                // If cacheXML is FALSE, and we have a cached version of this key,
                // then remove the cached version - basically reset
                if (options.isCached) {

                    Me.cache.clear(options.cacheKey);

                }

                $.ajax({
                    type:           "POST",
                    cache:          false,
                    async:          options.async,
                    url:            options.webURL,
                    contentType:    "text/xml;charset=utf-8",
                    dataType:       "xml",
                    data:           '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '<soap:Body><SearchPrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">' +
                        '<searchText>' + optinons.searchText + '</searchText>' +
                        '<maxResults>' + options.maxResults + '</maxResults>' +
                        '<principalType>' + options.principalType + '</principalType>' +
                        '</SearchPrincipals></soap:Body></soap:Envelope>',
                    complete:       function(xdata, status) {

                        // Process Error from status
                        if (status === "error" || Me.doesMsgHaveError(xdata)) {

                            // If cacheXML was true, then remove this from cache.
                            // No point in caching failures.
                            if (options.cacheXML) {

                                Me.cache.clear(options.cacheKey);

                            }

                            dfd.rejectWith( $, [xdata, status] );
                            return;

                        }

                        if ($.isFunction(options.completefunc)) {

                            options.completefunc.call($, xdata, status);

                        }

                        dfd.resolveWith($, [xdata, status]);

                    }//end: $.ajax().success()
                });

            }).promise(); //end: return .promise()

            // If cacheXML was true, then cache this promise
            if (options.cacheXML) {

                Me.cache(options.cacheKey, reqPromise);

            }

            return reqPromise;

        }; //end: getData

        return callerFn;

    })(); //end: API.getSearchPrincipals()

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));

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
     * Returns a Deferred that is resolved with an Array of Objects containing
     * the site list collection.
     *
     * Dependends on getSiteUrl()
     *
     * @param {Object} options
     *
     * @param {String} [options.webURL=currentSite]
     *          The site/sub-site for which the list collection
     *          is to be retrieved.
     * @param {Boolean} [options.cacheXML=false]
     *          If true, the XML response returned is cached for
     *          future calls.
     * @param {String|Array|Function} [options.filter=null]
     *          A string or array of strings with the list name or UID's
     *          that should be returned when the deferred is resolved.
     *
     * @return {jQuery.Promise}
     *          Promise is resolved with 3 input params:
     *          lists - Array of objects for the list collection
     *          xData - webservice Response XML Document
     *          status - jQuery async request status
     *
     *
     * Depends on:
     *
     * .getSiteUrl();
     * .doesMsgHaveError(0)
     *
     */
    API.getSiteListCollection = (function(options){

        var getData     = null,
            Me          = null,
            callerFn    = function(){

                            if (Me === null) {

                                Me = this;

                            }

                            return getData.apply(this, arguments);

                        };

        // Define defaults. User can change these on their function attachment.
        callerFn.defaults = {
            webURL:         '',
            cacheXML:       false,
            async:          true,
            completefunc:   null,
            filter:         null
        };

        /**
         * Retrieves the data from Sharepoint
         */
        getData = function(opt){

            var options = $.extend({}, callerFn.defaults, opt),
                reqPromise;

            if (!options.webURL) {

                options.webURL = Me.getSiteUrl();

            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                options.webURL += "/";

            }

            options.webURL += "_vti_bin/SiteData.asmx";

            options.cacheKey = options.webURL + "?" + [options.filter].join("|");
            options.isCached = Me.cache.isCached(options.cacheKey);

            // If cacheXML is true and we have a cached version, return it.
            if (options.cacheXML && options.isCached) {

                reqPromise =  Me.cache(options.cacheKey);

                // If a completefunc was defined on this call,
                // execute it.
                if ($.isFunction(options.completefunc)) {

                    reqPromise.then(function(lists, xdata, status){

                        options.completefunc.call($, xdata, status, lists);

                    });

                }

                return reqPromise;

            }

            // Return a deferred.
            reqPromise = $.Deferred(function(dfd){

                // If cacheXML is FALSE, and we have a cached version of this key,
                // then remove the cached version - basically reset
                if (options.isCached) {

                    Me.cache.clear(options.cacheKey);

                }

                $.ajax({
                    type:           "POST",
                    cache:          false,
                    async:          options.async,
                    url:            options.webURL,
                    contentType:    "text/xml;charset=utf-8",
                    dataType:       "xml",
                    data:           '<?xml version="1.0" encoding="utf-8"?>' +
                        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '<soap:Body><GetListCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/">' +
                        '</GetListCollection></soap:Body></soap:Envelope>',
                    complete:       function(xdata, status) {

                        // Process Error from status
                        if (status === "error"|| Me.doesMsgHaveError(xdata)) {

                            // If cacheXML was true, then remove this from cache.
                            // No point in caching failures.
                            if (options.cacheXML) {

                                Me.cache.clear(options.cacheKey);

                            }

                            dfd.rejectWith( $, [null, xdata, status] );
                            return;

                        }

                        var $siteLists  = $(xdata.responseXML).find("_sList"),
                            lists       = [];

                        // TODO: Enhance return object so that each one has a method to .getList()


                        // FIXME: options.filter should support a Function as well.

                        // if we hav a filter defined, then make sure its an array
                        if (options.filter && !$.isArray(options.filter)) {

                            options.filter = [options.filter];

                        }

                        $siteLists.each(function(){

                            var $thisList   = $(this),
                                listDef     = {};

                            // if a filter was defined, then check to see
                            // if this list matches that filter name
                            if (    options.filter
                                &&  $.isArray(options.filter)
                                &&  $.inArray($thisList.find("Title").text(), options.filter) === -1
                                &&  $.inArray($thisList.find("InternalName").text(), options.filter) === -1
                            ) {

                                return;

                            }

                            $thisList.children().each(function(){

                                listDef[this.nodeName] = $(this).text();

                            });

                            lists.push(listDef);

                        });


                        dfd.resolveWith($, [lists, xdata, status]);

                        if ($.isFunction(options.completefunc)) {

                            options.completefunc(xdata, status, lists);

                        }

                    }//end: $.ajax().success()
                });

            }).promise(); //end: return .promise()

            // If cacheXML was true, then cache this promise
            if (options.cacheXML) {

                Me.cache(options.cacheKey, reqPromise);

            }

            return reqPromise;

        }; //end: getData


        return callerFn;

    })(); //end: API.getSiteListCollection

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));


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
     * Returns the current site URL. URL will end with a forward slash (/) and
     * will always be a fully qualified url (starting with http...).
     * If this function is unable to determine the SiteUrl from data already
     * loaded, then it will call a webservice to retrieve it. That call to
     * the webservice will be syncronous.
     *
     * @function
     *
     * @param {String} [pageUrl=document.location.href]
     *
     * @return {String}
     *
     * @throws Unable to determine site url
     *
     */
    API.getSiteUrl = (function() {

        // Cache of site urls
        var siteUrl    = {};

        /**
         * Takes a relative URL (ex. /you/page.aspx) and returns the full
         * url starting wtih http...
         */
        function getFullUrl(pageAddress) {

            // if URL does not end with "/" then insert it
            if (pageAddress && pageAddress.charAt(pageAddress.length - 1) !== "/") {

                pageAddress += "/";

            }

            if (pageAddress.indexOf("http") > -1) {

                return pageAddress;

            }

            pageAddress = document.location.protocol + "//" +
                document.location.hostname +
                (           Number(document.location.port) !== 80
                        &&  Number(document.location.port) > 0
                    ?   document.location.port
                    :   ""
                ) +
                pageAddress;

            return pageAddress;

        }

        // return caller function
        return function(pageUrl) {

            var page        = '',
                isThisPage  = false,
                errorMessage = "getSiteUrl(): Unable to determine site url from " + pageUrl;

            if (!pageUrl) {

                pageUrl     = document.location.href;
                isThisPage  = true;

            }

            page = pageUrl;

            // Get only the pure url up to the page... no URL params or hash.
            if (pageUrl.indexOf("?") > -1) {

                page = pageUrl.substr(0, pageUrl.indexOf("?"));

            } else if (pageUrl.indexOf("#") > -1) {

                page = pageUrl.substr(0, pageUrl.indexOf("#"));

            }

            if (!page) {

                throw new Error(errorMessage);

            }

            // If the URL site is already known, return it.
            if (siteUrl[page]) {

                return siteUrl[page];

            }

            // If it is the current page, then try to determine the siteUrl
            // based on variables set by SharePoint
            if (isThisPage) {

                // DO we have _spPageContextInfo to work with? Then use
                // the webServerRelativeUrl param of it.
                if (    typeof _spPageContextInfo !== "undefined"
                    &&  _spPageContextInfo.webServerRelativeUrl
                ) {

                    siteUrl[page] = _spPageContextInfo.webServerRelativeUrl;

                } //do we have a _spPageContextInfo?

                // Do we have L_Menu_BaseUrl defined?
                if (!siteUrl[page] && (typeof L_Menu_BaseUrl !== "undefined") && L_Menu_BaseUrl) {

                    siteUrl[page] = L_Menu_BaseUrl;

                }

                // ensure we get a full url starting with http
                if (siteUrl[page]) {

                    siteUrl[page] = getFullUrl(siteUrl[page]);
                    return siteUrl[page];

                }

            } //end: if(): is current page

            // If we still don't have a current site for this page, then
            // Lets call the web serivce
            if (!siteUrl[page]) {

                $.ajax({
                    type:   "POST",
                    cache:  false,
                    async:  false,
                    url:    document.location.protocol + "//" + document.location.host + "/_vti_bin/Webs.asmx",
                    data:   "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><WebUrlFromPageUrl xmlns='http://schemas.microsoft.com/sharepoint/soap/' >" +
                            "<pageUrl>" + page + "</pageUrl></WebUrlFromPageUrl></soap:Body></soap:Envelope>",
                    contentType:    "text/xml; charset=utf-8",
                    dataType:       "xml",
                    success:        function(xDoc) {

                        siteUrl[page] = $(xDoc).find("WebUrlFromPageUrlResult").text() || '';


                    } //end: success
                });

            } //end: if()

            if (!siteUrl[page]) {

                delete siteUrl[page];
                throw new Error(errorMessage);

            }

            siteUrl[page] = getFullUrl(siteUrl[page]);

            return siteUrl[page] || "";

        }; //end: return: function

    })(); // end: API.getSiteUrl()

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));

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
     * Given a list of users, this method will resolve those if they
     * are not part of the site collection user list info.
     *
     * @param {Object} options
     * @param {Array|String} options.principalKeys
     *      The principal key (login name/Account Name/email) to be resolved.
     *      An array of values can also be used on input.
     * @param {String} [options.principalType='All']
     *      The type of principal that is being resolved.
     * @param {Boolean} [options.addToUserInfoList=true]
     *      If true, then principal will be added to the site collection
     *      user info list.
     * @param {Boolean} [options.async=true]
     *      If true, call to the service will be made async.
     *
     *
     * @return {jQuery.Promise}
     *      The jquery .ajax() Promise is returned.
     *
     * Depends on:
     *
     * .getSiteUrl()
     *
     */
    API.resolvePrincipals = (function(options) {

        var getData     = null,
            Me          = null,
            callerFn    = function(){

                            if (Me === null) {

                                Me = this;

                            }

                            return getData.apply(this, arguments);

                        };

        // Define defaults. User can change these on their function attachment.
        callerFn.defaults = {
            principalKeys:      [],
            principalType:      'All',
            addToUserInfoList:  true,
            async:              true
        };

        /**
         * Retrieves the data from Sharepoint
         */
        getData = function(opt){

            var options = $.extend({}, callerFn.defaults, opt);

            if (!options.webURL) {

                options.webURL = Me.getSiteUrl();

            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                options.webURL += "/";

            }

            options.webURL += "/_vti_bin/People.asmx";


            if (!$.isArray(options.principalKeys)) {

                options.principalKeys = [options.principalKeys];

            }

            options.principalXml    = "";
            var hasStringTag        = /<string>/i,
                i,j;

            for(i=0,j=options.principalKeys.length; i<j; i++){

                if (!hasStringTag.test(options.principalKeys[i])) {

                    options.principalXml += '<string>' + options.principalKeys[i] + '</string>';

                } else {

                    options.principalXml += options.principalKeys[i];

                }

            }

            // Make ajax call and return pronise
            return $.ajax({
                type:           "POST",
                cache:          false,
                async:          options.async,
                url:            options.webURL,
                contentType:    "text/xml;charset=utf-8",
                beforeSend:     function(xhr) {

                    xhr.setRequestHeader(
                        'SOAPAction',
                        'http://schemas.microsoft.com/sharepoint/soap/ResolvePrincipals'
                    );

                },
                dataType:       "xml",
                data:           '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                    '<soap:Body><ResolvePrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">' +
                        '<principalKeys>' + options.principalXml + '</principalKeys>' +
                        '<principalType>' + options.principalType + '</principalType>' +
                        '<addToUserInfoList>' + options.addToUserInfoList + '</addToUserInfoList>' +
                    '</ResolvePrincipals></soap:Body></soap:Envelope>'
            });

        }; //end: getData

        return callerFn;

    })();

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));

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
     * Given a list name, this method will query the SP service and retrieve
     * the list of forms for it.
     *
     * @param {Object} options
     * @param {Object} options.searchText
     * @param {Object} [options.maxResults=50]
     * @param {Object} [options.principalType='All']
     *      Default is User. Others include: None, DistributionList,
     *      SecurityGroup, SharePointGroup, All
     * @param {Object} [options.webUrl='currentSiteUrl']
     * @param {Object} [options.cacheXML=false]
     * @param {Object} [options.async=true]
     * @param {Object} [options.completefunc]
     *      Options is deprecated. Use .promise that is returned.
     *
     * @return {jQuery.Promise}
     *      Promise is resolved with two input params:
     *      XMLDocument : Response from Sharepoint
     *      status : the ajax status string (error or success)
     *
     * @example
     *
     *  SPAPI.resolvePrincipals({
     *      principalKeys: "domain\\userid"
     *  })
     *  .then(function(xmlDoc, status){
     *
     *      var userSiteUID = $(xmlDoc)
     *              .find("AccountName:contains('domain\\userid')")
     *              .parent()
     *              .find("UserInfoID")
     *              .text();
     *      alert("User was Resolved. His ID is: " + userSisteID);
     *  });

     *
     * Depends on:
     *
     * .getSiteUrl()
     * .doesMsgHaveError()
     * .cache()
     */
    API.searchPrincipals = (function(){

        var getData     = null,
            Me          = null,
            callerFn    = function(){

                            if (Me === null) {

                                Me = this;

                            }

                            return getData.apply(this, arguments);

                        };

        // Define defaults. User can change these on their function attachment.
        callerFn.defaults = {
            searchText:     '',
            maxResults:     50,
            principalType:  'All',
            webURL:         '',
            cacheXML:       false,
            async:          true,
            completefunc:   null
        };

        /**
         * Retrieves the data from Sharepoint
         */
        getData = function(opt){

            var options = $.extend({}, callerFn.defaults, opt),
                reqPromise;

            if (!options.webURL) {

                options.webURL = Me.getSiteUrl();

            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                options.webURL += "/";

            }

            options.webURL += "_vti_bin/People.asmx";

            options.cacheKey = options.webURL + "?" +
                [
                    options.searchText,
                    options.maxResults,
                    options.principalType
                ].join("|");
            options.isCached = Me.cache.isCached(options.cacheKey);

            // If cacheXML is true and we have a cached version, return it.
            if (options.cacheXML && options.isCached) {

                reqPromise =  Me.cache(options.cacheKey);

                // If a completefunc was defined on this call,
                // execute it.
                if ($.isFunction(options.completefunc)) {

                    reqPromise.then(function(xdata, status){

                        options.completefunc(xdata, status);

                    });

                }

                return reqPromise;

            }

            // Return a deferred.
            reqPromise = $.Deferred(function(dfd){


                // If cacheXML is FALSE, and we have a cached version of this key,
                // then remove the cached version - basically reset
                if (options.isCached) {

                    Me.cache.clear(options.cacheKey);

                }

                $.ajax({
                    type:           "POST",
                    cache:          false,
                    async:          options.async,
                    url:            options.webURL,
                    contentType:    "text/xml;charset=utf-8",
                    dataType:       "xml",
                    data:           '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '<soap:Body><SearchPrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">' +
                        '<searchText>' + options.searchText + '</searchText>' +
                        '<maxResults>' + options.maxResults + '</maxResults>' +
                        '<principalType>' + options.principalType + '</principalType>' +
                        '</SearchPrincipals></soap:Body></soap:Envelope>',
                    complete:       function(xdata, status) {

                        // Process Error from status
                        if (status === "error" || Me.doesMsgHaveError(xdata)) {

                            // If cacheXML was true, then remove this from cache.
                            // No point in caching failures.
                            if (options.cacheXML) {

                                Me.cache.clear(options.cacheKey);

                            }

                            dfd.rejectWith( $, [xdata, status] );
                            return;

                        }

                        dfd.resolveWith($, [xdata, status]);

                        if ($.isFunction(options.completefunc)) {

                            options.completefunc(xdata, status);

                        }

                    }//end: $.ajax().success()
                });

            }).promise(); //end: return .promise()

            // If cacheXML was true, then cache this promise
            if (options.cacheXML) {

                Me.cache(options.cacheKey, reqPromise);

            }

            return reqPromise;

        }; //end: getData

        return callerFn;

    })(); //end: API.searchPrincipals()

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));

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

    var API = namespace || {},
        /**
         * Returns an array of String representing the updates that need
         * to be made. Handles the updates being defined in a variety of
         * ways: array-of-arrays, array-of-objects, array-of-strings, string.
         *
         * @param {Object} options
         *
         * @return {Array<String>}
         */
        getUpdateArray = function(options){

            var updates = [],
                ofType   = typeof options.updates;

            function processArrayOfObjects(updArray) {

                var i,j, col,
                    thisUpd = '';

                // Loop through the list of objects (updates)
                for(i=0,j=updArray.length; i<j; i++){

                    thisUpd = '';

                    // Build the fields to be updated for this update
                    for (col in updArray[i]) {

                        if (updArray[i].hasOwnProperty(col)) {

                            thisUpd += '<Field Name="' + col + '">' +
                                      updArray[i][col] + '</Field>';

                        }

                    }

                    // If this column has fields to be updated, create
                    // the method agregate around it
                    if (thisUpd) {

                        updates.push(
                            '<Method ID="' + options.counter + '" Cmd="' +
                            options.updateType + '">' + thisUpd + '</Method>'
                        );

                        options.counter++;

                    }

                }

            }

            // Array-of-arrays
            // 1 single update (outer-array) with multiple fields to be
            // updated (inner-arrays's)
            function processArrayOfArrays(updArray) {

                var thisUpd = '',
                    i,j, col;

                for(i=0,j=updArray.length; i<j; i++){

                    if ($.isArray(updArray[i])) {

                        thisUpd += '<Field Name="' + updArray[i][0] + '">' +
                                  updArray[i][1] + '</Field>';

                    }

                }

                if (thisUpd) {

                    updates.push(
                        '<Method ID="' + options.counter + '" Cmd="' +
                        options.updateType + '">' + thisUpd + '</Method>'
                    );

                    options.counter++;

                }

            }

            // Backwards compatability to SPServices: if we don't have
            // options.updates defined, but we have .ID and .valuepairs,
            // Then do array-of-arrays
            if (!options.updates && options.ID && options.valuepairs) {

                options.valuepairs.push(["ID", options.ID]);
                processArrayOfArrays(options.valuepairs);

            // If options.updates is a string, then just add it as is to
            // the array
            } else if (ofType === "string"){

                updates.push(options.updates);

            } else if ($.isArray(options.updates) && options.updates.length) {

                ofType = typeof options.updates[0];

                // Array<Object>
                if (ofType === "object") {

                    processArrayOfObjects(options.updates);

                // Array<String>
                } else if (ofType === "string") {

                    updates.push.apply(updates, options.updates);


                // Array<Array>
                } else if ($.isArray(options.updates[0])) {

                    processArrayOfArrays(options.updates);

                }

            }


            return updates;

        };

    if (!namespace) {

        if (typeof $.SPAPI === "undefined") {

            $.SPAPI = API;

        } else {

            API = $.SPAPI;

        }

    }

    /**
     * Makes updates to list items in Sharepoint Lists and Libraries.
     *
     * @function
     *
     * @param {Object} options
     * @param {String} options.listName
     * @param {String, Array<Array>, Array<Object>, Array<String>} options.updates
     * @param {Object} [options.webUrl=current_site]
     * @param {Object} [options.async=true]
     * @param {Object} [options.completefunc=null]
     * @param {Object} [options.ID=null]
     *      Deprecated. Here for backwards compatability with SPServices
     * @param {Object} [options.valuepairs=null]
     *      Deprecated. Here for backwards compatability with SPServices
     *
     *
     * @return {jQuery.Promise}
     *
     * Dependencies
     *
     *  .getSiteUrl()
     *
     *
     */
    API.updateListItems = (function(){

        // TODO: Enhance to support batch processing when 'updates' is an array. with throlling
        // see here: https://spservices.codeplex.com/workitem/10168

        var wsCall      = null,
            callerFn    = function(){

                            return wsCall.apply(this, arguments);

                        };

        // Define defaults. User can change these on their function attachment.
        callerFn.defaults = {
            listName:       '',
            webURL:         '',
            async:          true,
            completefunc:   null,
            updates:        '',
            updateType:     'Update',
            updateOnError:  'Continue'
        };


        // Get rows from SP. Returns a JQuery.Promise
        wsCall = function (opt) {

            // FIXME: support for caching and default options

            var Me      = this,
                options = $.extend({}, callerFn.defaults, opt, { counter: 1});

            if (!options.webURL) {

                options.webURL = Me.getSiteUrl();

            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                options.webURL += "/";

            }

            // some backwards compatability for SPServices
            options.updateType = options.batchCmd || options.updateType;

            // Get an array of Strings with all updates
            options._updates = getUpdateArray(options).join("");

            if (!/<\/Batch>/.test(options._updates)) {

                options._updates = '<Batch OnError="Continue">' +
                    options._updates + '</Batch>';

            }

            return $.ajax({
                type:           "POST",
                cache:          false,
                async:          options.async,
                url:            options.webURL + "_vti_bin/Lists.asmx",
                beforeSend:     function(xhr) {
                    xhr.setRequestHeader(
                        'SOAPAction',
                        'http://schemas.microsoft.com/sharepoint/soap/UpdateListItems'
                    );
                },
                contentType:    "text/xml;charset=utf-8",
                dataType:       "xml",
                data:           "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                    "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
                    "<soap:Body><UpdateListItems xmlns=\"http://schemas.microsoft.com/sharepoint/soap/\">" +
                    "<listName>" + options.listName + "</listName><updates>" +
                    options._updates + "</updates></UpdateListItems></soap:Body></soap:Envelope>",
                complete:       function(data, status) {

                    if ($.isFunction(options.completefunc)) {

                        options.completefunc.call($, data, status);

                    }

                }//end: $.ajax().success()
            });

        }; //end: wsCall()

        return callerFn;

    })(); // API.updateListItems()

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));
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
     * Simple caching function.
     * @function
     *
     * @param {Sting} key
     * @param {Object} value
     *
     * @return {undefined}
     *
     * Methods:
     *
     *  cache("myKey") // getter. Same as cache.get()
     *  cache("myKey", "value") // Setter. Same as cache.set();
     *  cache.clear(key)
     *  cache.clearAll()
     *  cache.get(key),
     *  cache.set(key, value),
     *  cache.isCached(key)
     *
     * Dependencies:
     *
     *  none
     *
     */
    API.cache = (function(){

        var cacheData   = {},
            fnCaller    = function(key, value){

                if (!key) {

                    return;

                }

                // Getter
                if (typeof value === "undefined"){

                    return fnCaller.get(key);

                }

                // Setter
                return fnCaller.set(key, value);

            };

        fnCaller.clear = function(key){

            delete cacheData[key];

        };

        fnCaller.clearAll = function(){

            cacheData = {};

        };

        fnCaller.get = function(key) {

            return cacheData[key];

        };

        fnCaller.set = function(key, value) {

            cacheData[key] = value;
            return value;

        };

        fnCaller.isCached = function(key){

            if (cacheData.hasOwnProperty(key)) {

                return true;

            }

            return false;
        };

        return fnCaller;

    })(); //end: cache method.

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));
/**
 * Displays data from a list in Kan-Ban board using a specific column from
 * that list.  Column (at this point) is assume to be a CHOICE type of field.
 *
 * Dependencies:
 *
 *  -   jQuery-UI Draggable
 *
 *
 * BUILD: October 03, 2014 - 02:25 PM
 */

;(function($){

    "use strict";
    /*jslint nomen: true, plusplus: true */
    /*global SPWidgets */

    /**
     * @class Baard
     */
    var Board   = {},
        SPAPI   = $.SPWidgets.SPAPI;

    /** @property {Boolean} */
    Board.initDone = false;

    /** @property {Integer} The max number of columns that can be built (not displayed) */
    Board.maxColumns = 20;

    /**
     * Board widget default options.
     */
    $.SPWidgets.defaults.board = {
        list:                   '',
        field:                  '',
        CAMLQuery:              '<Query></Query>',
        CAMLViewFields:         '',
        fieldFilter:            null,
        optionalLabel:          '(none)',
        template:               null,
        webURL:                 SPAPI.getSiteUrl(),
        showColPicker:          false,
        colPickerLabel:         "Columns",
        colPickerVisible:       [],
        colPickerCloseLabel:    "Close",
        colPickerApplyLabel:    "Apply",
        colPickerCheckLabel:    "Check-Uncheck All",
        colPickerTotalLabel:    "Selected.",
        colPickerMaxColMsg:     "Can not exceed 10 columns!",
        colPickerMinColMsg:     "Mininum of 2 required!",
        onGetListItems:         null,
        onPreUpdate:            null,
        onBoardCreate:          null,
        height:                 null
    };

    /**
     * Given a selector, this method will insert a Kan-Ban board inside
     * of it with data retrieved from a specific list.
     * This widget will retrieve the List definition upon first call
     * and setting cache = true. In some implementations
     * it may be desirable to get these defintions ahead of calling this
     * widget so that a cached version is used.
     *
     * @param {Object} options
     *
     * @param {String} options.list
     *                  The list name or UID.
     *
     * @param {String} options.field
     *                  The field from the List from where the board should
     *                  be built from. This field should be either of type
     *                  CHOICE or LOOKUP.
     *
     * @param {String|Function} [options.CAMLQuery="<Query></Query>"]
     *                  String with CAML query to be used against the list
     *                  to filter what is displayed or a function that will
     *                  provide the list of items (an array). If defining
     *                  a Function, it will be given two input parameter:
     *                  1) a function that must be called and be given the
     *                  array of items.
     *                  2) The options defiend on input to this widget.
     *                  The user defined function will be given a scope
     *                  (this keyword) of the html element it was bound to.
     *                  Example:
     *                  options.CAMLQuery = '<Query><Where>\
     *                          <FieldRef Name="Project" />\
     *                          <Value Type="Text">Latin America</Value>\
     *                      </Where></Query>';
     *                  --or--
     *                  options.CAMLQuery = function(sendResults) {
     *                      //get items from DB
     *                      sendResults([...]);
     *                  }
     *
     * @param {String} [options.CAMLViewFields=""]
     *                  String in CAML format with list of fields to be
     *                  returned from the list when retrieving the rows
     *                  to be displayed on the board.
     *
     * @param {String} [options.fieldFilter=""]
     *                  A string with either a comma delimetered list of
     *                  column values to show if field is of CHOICE type;
     *                  or a string with a CAML query to filter field values,
     *                  if field is of type Lookup
     *
     * @param {String} [options.optionalLabel="(none)"]
     *                  The string to be used as the State column header when
     *                  field from where Board was built is optional in the
     *                  List.
     *
     * @param {String|Function} [options.template="<div></div>"]
     *                  The HTML template that will be used to for displaying
     *                  items on the board. The HTML can be defined with tokens
     *                  in the format of {{Column_Internal_Name}}.
     *                  When defining a Function, it will be called with
     *                  a context of the board Html Element container and be
     *                  given two input params:
     *                  1. Item data object
     *                  2. Null || jQuery object
     *
     *                  Example:
     *
     *                      function(listItemObj, $ItemUI){
     *                          // this = jQuery - the container of the board.
     *                      }
     *
     * @param {String} [options.webURL=currentSiteUrl]
     *                  The WebURL for the list.
     *
     * @param {Boolean} [options.showColPicker=false]
     *                  If true, the column picker option will be displayed
     *                  on the page. Allows user to pick which column are
     *                  visible/hidden.
     *
     * @param {Array} [options.colPickerVisible=[]]
     *                  The list of board columns that should be visible. Used
     *                  only when showColPicker is true.
     *
     * @param {String} [options.colPickerLabel="Columns"]
     *                  The label for the column picker button.
     *
     * @param {String} [options.colPickerCloseLabel="Close"]
     *                  The label for the column picker pop-up close button
     *
     * @param {String} [options.colPickerCheckLabel="Apply"]
     *                  Label for the Check all/uncheck all
     *
     * @param {String} [options.colPickerApplyLabel="Apply"]
     *                  The label for the column picker pop-up apply button
     *
     * @param {String} [options.colPickerMaxColMsg="Can not exceed 10 columns!"]
     *                  Message to display when more than 10 columns were selected
     *
     * @param {String} [options.colPickerMinColMsg="Minimum of 2 required!"]
     *                  Message to display when less then 2 columsn were selected
     *
     * @param {String} [options.colPickerTotalLabel="Selected."]
     *                  The label for the number of column selected text on
     *                  the column picker popup.
     *
     * @param {Function} [options.onGetListItems=null]
     *                  Callback function to be called after data has been
     *                  retrieved from the 'list'. Function will be given a
     *                  scope (this) of the selection they used on input to
     *                  this method and two input parameters:
     *                  An Array of Objects with the list of rows returned
     *                  from the List, and
     *                  A jQuery object representing the entire xml document
     *                  response.  Example:
     *
     *                      onGetListItems: function(items, xmlResponse){
     *                          //this = jQuery element container selction
     *                      }
     *
     * @param {Function} [options.onPreUpdate=null]
     *                  Callback function to be called just prior to a List Item
     *                  update. The callback will have a scope of the item being
     *                  updated and be given 2 parameters:
     *                  1) the event object,
     *                  2) the item (DOM element) that triggered the event and
     *                  3) a data object with information/methods for the current
     *                     item/widget binding. The object will include two
     *                     attributes that will impact the updates:
     *                      data.updates - An array of updates that will be made.
     *                          The array will have, to start, the update to the
     *                          state that was triggered by the move in the board.
     *                          Additional updates can be added.
     *                          Format will be an Array-of-Arrays, where each sub-array
     *                          must have 2 items: the column name (index 0) and
     *                          the column value (index 1). Example:<br/>
     *
     *                          data.updates = [
     *                              ["Status", "Done"]
     *                          ];
     *                          // insert additional update
     *                          data.updates.push(["Title", "New title here"]);
     *
     *                      data.updatePromise - A jQuery.Promise that represents
     *                          the update that will be made. This can be used to
     *                          bind on additional functionality. The queued functions
     *                          will be given the following as input:
     *
     *                              updatePromise.then(function(newItemObj, oldItemObj, xData){
     *                                  // this = jQuery of the row container on the board
     *                              })
     *
     *                          -   The update item object (as returned by SP)
     *                          -   current item object (the one used to display the item on the board)
     *                          -   XML Document of the response from SP (xData)
     *
     *                  The function should return a boolean indicating whether the
     *                  update should be canceled. True will cancel the update.
     *                  Example:
     *
     *                      onPreUpdate: function(ev, item, data){
     *                          //this = jQuery element container selction
     *                      }
     *
     * @param {Function} [options.onBoardCreate=null]
     *                  Function triggered after board is initially created.
     *                  See spwidget:boardcreate even for parameters that
     *                  will be given to function.
     *
     * @param {String}  [options.height=null]
     *                  The height for the board. This value should be a valid CSS
     *                  dimention (ex. integer + unit - 100px). Default is null,
     *                  indicating that its not fixed height (entire board is expanded)
     *
     * @return {jQuery} this
     *
     *
     * @example
     *
     *      $("#boardContainer").SPShowBoard({
     *          list:   "Tasks",
     *          field:  "Status"
     *      });
     *
     *
     * EVENTS TRIGGERED BY THIS PLUGIN:
     *
     *  spwidget:boardchange,
     *  spwidget:boardcreate    -   Events triggered anytime a change happens
     *                              in the board or when the board is first created.
     *                              Event is provided 3 parameters
     *                              1) the event object,
     *                              2) the item (DOM element) that triggered
     *                                 the event and
     *                              3) a data object with information/methods for the current
     *                                 item/widget binding.  The objects's .updates attribute
     *                                 will contain an array of array's with the updates that
     *                                 will be made to the item.
     *                              The function's 'this'
     *                              variable will point to the column element that
     *                              received the new item.
     *
     *                              Example:
     *
     *                                  ele.on("spwidget:boardchange", function(ev, item, data){
     *                                      // this = ele;
     *                                  })
     *
     * spwidget:boarditemadd    -   Event triggered when new items are added to the
     *                              board (ex. from a refresh). Event will be given
     *                              the following input params:
     *                              1) the event object (jquery)
     *                              2) the item (DOM element) that triggered
     *                                 the event and
     *                              3) a data object with information/methods for the current
     *                                 item/widget binding.  The objects's .itemsModified attribute
     *                                 will contain an array of Objects  that were added.
     *
     * spwidget:boarditemremove -   Event triggered when items are removed from the
     *                              board (ex. from a refresh). Event will be given
     *                              the following input params:
     *                              1) the event object (jquery)
     *                              2) the board container (DOM element)
     *                              3) a data object with information/methods for the current
     *                                 item/widget binding.  The objects's .itemsModified attribute
     *                                 will contain an array of Objects that were removed.
     *
     * spwidget:boardColumnChange -   Event triggered when columns on the board are changed.
     *                              Event will be given the following input params:
     *                              1) jQuery: the event object (jquery)
     *                              2) jQuery: the board container (DOM element)
     *                              3) Object of Column Names currently visible. Key is internal
     *                                 static name, while value is the external visible name.
     *                                 For boards created from CHOICE values, key and value is
     *                                 the same.
     *
     *                              $("#board")
     *                                  .on(
     *                                      "spwidget:boardColumnChange",
     *                                      function($board, columnsObj){
     *                                          //this = $board object
     *                                      })
     *
     *
     *
     *
     * AVAILABLE METHODS:
     *
     *  refresh     -   Refreshes the data in the Board by retrieving the data
     *                  from the list again. During a refresh, existing board
     *                  items (the html element in DOM) is not actually deleted
     *                  and recreated if it already exists, but re-used. It is
     *                  important to note this specially if a custom template
     *                  function was defined as an input param.
     *
     *                  $().SPShowBoard("refresh");
     *
     * redraw       -   Redraws the board without pulling in data from the list.
     *                  Column heights will be normalized and jQuery UI's sortable
     *                  widget will be refreshed.
     *
     *                  $().SPShowBoard("redraw");
     *
     * setVisible   -   Sets which Board columns should be visible.  Method takes
     *                  as input an array of board column values (the visible name)
     *
     *                  $().SPShowBoard("setVisible", ['Not Started', 'Completed']);
     *
     *
     * setHeight    -   Sets the height of the board by applying the value passed in
     *                  to the column area that holds the cards. Use null to remove
     *                  the height.
     *                  Example:
     *                      $().SPShowBoard("setHeight", "300px");
     *                      $().SPShowBoard("setHeight", null);
     *
     * getColumns   -   Returns an array board columns. Array will include a list of
     *                  object that each represent a column in the board. The object
     *                  will contain the following information:
     *
     *                      {
     *                          name: 'internal name',
     *                          title: 'external name',
     *                          isVisible: true|false
     *                      }
     *
     * // TODO: Destroy method (must remove all event bindings)
     * // TODO: move method - moves an item on the board (identified by ID) to
     *          a different state
     *
     *
     */
    $.fn.SPShowBoard = function(options){

        // TODO: need to determine how to page large datasets.

        // If initialization was not done yet, then do it now.
        // if the global styles have not yet been inserted into the page, do it now
        if (!Board.initDone) {

            Board.initDone = true;

            if (Board.styleSheet !== "") {

                $('<style type="text/css">' + "\n\n" +
                        Board.styleSheet + "\n\n</style>" )
                    .prependTo("head");

            }

        }

        // Capture original set of input arguments.
        var args    = arguments,
            retVal  = this;

        // Attach the board to each element
        this.each(function(){

            var ele         = $(this),
                isMethod    = (typeof options === "string"),
                hasBoard    = ele.hasClass("hasSPShowBoard"),
                opt         = null,
                method      = '',
                board       = null;

            // if this element alraedy has a board on it, and
            // options is not a string, then exit.
            if ( hasBoard && !isMethod ) {

                return this;

            // Handle METHODS
            } else if (isMethod && hasBoard && !ele.hasClass("loadingSPShowBoard")) {

                method  = options.toLowerCase();
                board   = ele.data("SPShowBoardOptions");

                //*** REFRESH ***
                if (method === "refresh") {

                    board._getListItems().then(function(){

                        board.showItemsOnBoard({ refresh: true });

                    });

                //*** REDRAW ***
                } else if (method === "redraw") {

                    board.setBoardColumnHeight();

                //*** SETVISIBLE ***
                } else if (method === "setvisible") {

                    board.setUserDefinedVisibleCol( args[1] );

                //*** SETHEIGHT ***
                } else if (method === "setheight") {

                    board.height = args[1];
                    board.setBoardColumnHeight();

                //*** GET COLUMNS ***
                } else if (method === "getcolumns") {

                    retVal = board.getBoardColumnList();

                }//end: if(): methods

                return this;

            }//end: if()

            // If this element is already loading the UI, exit now
            if (ele.hasClass("loadingSPShowBoard")) {

                return this;

            }

            // Define this Widget instance
            opt = $.extend({},
                $.SPWidgets.defaults.board,
                options,
                {
                    ele:                ele,
                    states:             [], // List of states
                    statesMap:          {}, // Map of State->object in states[]
                    tmpltHeader:        '', // Header template
                    tmpltState:         '', // State item template
                    statesCntr:         '', // DOM element where rows are located
                    headersCntr:        '', // DOM element where headers are located
                    listItems:          [], // Array with items from the list.
                    initDone:           false,
                    formUrls:           null, // Object with url's to form. Used by opt.getListFormUrl()
                    isStateRequired:    true,
                    maxColumnVisible:   10,
                    showNumberOfColumns: 10,    // number of columns shown on the board
                    /**
                     * Populates the opt.states and opt.statesMap by
                     * pulling info. from the List definition
                     *
                     * @return {jQuery.Promise}
                     *      Success, promise get resolved with a scope of 'opt' and
                     *          receives the xData and status variables
                     *      Failure, promise gets resolved with cope of 'ele' and
                     *          received a string with the error, xData and Status.
                     *
                     */
                    getBoardStates:     function(){

                        return $.Deferred(function(dfd){

                            // Get List information (use cached if already done in prior calls)
                            // and get list of States to build
                            SPAPI.getList({
                                listName:   opt.list,
                                cacheXML:   true,
                                async:      false,
                                webURL:     opt.webURL,
                                completefunc : function(xData, status) {

                                    // FIXME: need to handle errors
                                    // if (resp.hasSPError()) {
                                        // spAgile.logMsg({
                                            // type:   "error",
                                            // msg:    resp.getSPError()
                                        // });
                                        // return null;
                                    // }

                                    var resp    = $(xData.responseXML),
                                        f       = resp.find("Fields Field[StaticName='" + opt.field + "']");

                                    // If we did not find the field by internal name, try external.
                                    // If we found it by Display name, then lets change the
                                    // field value... We need internal name for referencing
                                    // item column values.
                                    if (!f.length) {

                                        f = resp.find("Fields Field[DisplayName='" + opt.field + "']");

                                        if (!f.length) {

                                            dfd.rejectWith(
                                                ele,
                                                [ 'Field (' + opt.field +  ') not found in list definition!',
                                                xData, status ]);

                                            return;

                                        }

                                        opt._origField  = opt.field;
                                        opt.field       = f.attr("StaticName");

                                    }

                                    // store if field is required
                                    if ( f.attr("Required") === "FALSE" ) {

                                        opt.isStateRequired = false;

                                    }

                                    switch(f.attr("Type").toLowerCase()) {
                                        // CHOICE COLUMNS
                                        case "choice":

                                            // Should there be a blank column?
                                            if ( !opt.isStateRequired ) {

                                                opt.states.push({
                                                    type:   'choice',
                                                    title:  opt.optionalLabel,
                                                    name:   opt.optionalLabel
                                                });

                                                opt.statesMap[""] = opt.states[opt.states.length - 1];

                                            }

                                            if (opt.fieldFilter) {

                                                opt.fieldFilter = opt.fieldFilter.split(/\,/);

                                            }

                                            f.find("CHOICES CHOICE").each(function(i,v){

                                                var thisChoice = $(this).text();

                                                // if there i sa filter and this column
                                                // is not part of it, exit now
                                                if (opt.fieldFilter) {
                                                    if (!$.grep(opt.fieldFilter, function(e){ return (e === thisChoice); }).length) {
                                                        return;
                                                    }
                                                }

                                                // If we reached a max column number, exit here.
                                                if (i >= Board.maxColumns){

                                                    try { console.log(
                                                            "SPWIDGETS:BOARD:Warning: Can only build a max of " +
                                                            Board.maxColumns + " columns!");

                                                    } catch(e){ }

                                                    return false;

                                                }

                                                opt.states.push({
                                                    type:   'choice',
                                                    title:  thisChoice, // extenal visible
                                                    name:   thisChoice  // internal name
                                                });

                                                // Store State value in mapper (use internal name)
                                                opt.statesMap[thisChoice] = opt.states[opt.states.length - 1];

                                            });

                                            dfd.resolveWith(opt, [xData, status]);

                                            break;

                                        // LOOKUP COLUMNS
                                        case "lookup":

                                            if ( !opt.fieldFilter ) {

                                                opt.fieldFilter = "<Query></Query>";

                                            }

                                            // Query the lookup table and get the rows that
                                            // should be used to build the states
                                            SPAPI.getListItems({
                                                listName:       f.attr("List"),
                                                async:          true,
                                                cacheXML:       true,
                                                CAMLQuery:      opt.fieldFilter,
                                                webURL:         opt.webURL,
                                                CAMLRowLimit:   Board.maxColumns,
                                                CAMLViewFields:
                                                    '<ViewFields><FieldRef Name="' +
                                                    f.attr("ShowField") +
                                                    '" /></ViewFields>',
                                                completefunc:   function(xData, status){

                                                    // Process Errors
                                                    if (status === "error") {

                                                        dfd.rejectWith(
                                                                ele,
                                                                [ 'Communications Error!', xData, status ]);

                                                        return;

                                                    }

                                                    var resp = $(xData.responseXML),
                                                        $rows;

                                                    if ( resp.SPMsgHasError() ) {

                                                         dfd.rejectWith(
                                                                ele,
                                                                [ resp.SPGetMsgError(), xData, status ]);

                                                        return;

                                                    }

                                                    // Should there be a blank column?
                                                    if ( !opt.isStateRequired ) {

                                                        opt.states.push({
                                                            type:   'lookup',
                                                            title:  opt.optionalLabel,  // extenal visible
                                                            name:   ""                  // internal name
                                                        });

                                                        opt.statesMap[""] = opt.states[opt.states.length - 1];

                                                    }

                                                    // Loop thorugh all rows and build the
                                                    // array of states.
                                                    $rows = SPAPI.getNodesFromXml({
                                                        xDoc: xData.responseXML,
                                                        node: "z:row",
                                                        asJQuery: true
                                                    });

                                                    $rows.each(function(i,v){

                                                        // If we reached a max column number, exit here.
                                                        if (i >= Board.maxColumns){

                                                            try { console.log(
                                                                    "SPWIDGETS:BOARD:Warning: Can only build a max of " +
                                                                    Board.maxColumns + " columns!");

                                                            } catch(e){ }

                                                            return false;

                                                        }

                                                        var thisRow     = $(this),
                                                            thisId      = thisRow.attr("ows_ID"),
                                                            thisTitle   = thisRow.attr( "ows_" + f.attr("ShowField") ),
                                                            thisName    = thisId + ";#" + thisTitle;


                                                        opt.states.push({
                                                            type:   'lookup',
                                                            title:  thisTitle,  // Extenal visible
                                                            name:   thisName    // internal name
                                                        });

                                                        // Store State value in mapper (use internal name)
                                                        opt.statesMap[thisName] = opt.states[opt.states.length - 1];

                                                    });

                                                    dfd.resolveWith(opt, [xData, status]);

                                                    return;

                                                } //end: completefunc
                                            });

                                            break;

                                        // DEFAULT: Type on the column is not supported.
                                        default:

                                            dfd.rejectWith(
                                                ele,
                                                [   'Field (' + opt.field +
                                                    ') Type (' + f.attr("Type") +
                                                    ') is not supported!',
                                                    xData,
                                                    status ]);

                                            break;

                                    }

                                    return;

                                }//end: completefunc()
                            });//end: getList

                        })
                        .promise();

                    }, //end: getBoardStates()

                    /**
                     * Retrieves the items from the list for display on the board.
                     * Method return a promise whose input param is an array of
                     * object.
                     *
                     * @param {object} options
                     *
                     * @return {jQuery.Promise} jQuery promise
                     *
                     */
                    _getListItems:   function(){

                        return $.Deferred(function(dfd){

                            /**
                             * Resolves the Deferred object.
                             *
                             * @param {jQuery|Function} rawResponse
                             *              Raw response from teh call to get data.
                             *              is passed along to the user's onGetListItems()
                             *              callback.
                             */
                            function resolveDeferred(rawResponse) {

                                // If a callback was defined for onGetListItems,
                                // then call it now
                                if ($.isFunction(opt.onGetListItems)) {

                                    opt.onGetListItems.call(
                                        ele,
                                        opt.listItems,
                                        rawResponse
                                    );

                                }

                                dfd.resolveWith(ele, [opt.listItems]);

                            } //end: resolveDeferred()

                            // If CAMLQuery is a function, then call user'
                            // data retrieval method.
                            if ($.isFunction( opt.CAMLQuery )) {

                                opt.CAMLQuery.call(
                                    ele,
                                    function(items){

                                        if ($.isArray(items)) {

                                            opt.listItems = items;
                                            resolveDeferred( opt.CAMLQuery );
                                        }

                                    },
                                    options );

                            // ELSE, opt.CAMLQuery is not a function...
                            // call GetListItems operation.
                            } else {

                                SPAPI.getListItems({
                                    listName:       opt.list,
                                    async:          true,
                                    CAMLQuery:      opt.CAMLQuery,
                                    CAMLRowLimit:   0, // FIXME: SP data should be paged??
                                    CAMLViewFields: opt.CAMLViewFields,
                                    webURL:         opt.webURL,
                                    completefunc:   function(xData, status, rows){

                                        // Process Errors
                                        if (status === "error") {

                                            dfd.rejectWith(
                                                    ele,
                                                    [ 'Communications Error!', xData, status ]);

                                            return;

                                        }

                                        var resp = $(xData.responseXML);

                                        if ( resp.SPMsgHasError() ) {

                                             dfd.rejectWith(
                                                    ele,
                                                    [ resp.SPGetMsgError(), xData, status ]);

                                            return;

                                        }

                                        // Store the list of items
                                        opt.listItems   = rows;

                                        resolveDeferred( resp );

                                    }//end: completefunc()
                                });//end: getListItems

                            } //end: else: get list items

                        }).promise();

                    }, //end: _getListItems()

                    /**
                     * Given an ID, this method will return the data object
                     * for that item - the element retrieved during for
                     * display on the board.
                     *
                     * @param {String|Interger}
                     *
                     * @return {Object} Item Object
                     *
                     */
                    getBoardItemDataObject: function(itemId){

                        var itemObject = null,
                            x,y,id;

                        if (itemId) {

                            itemId = String(itemId);

                            for(x=0,y=opt.listItems.length; x<y; x++){

                                id = opt.listItems[x].ID;

                                if ($.isFunction(id)) {

                                    id = opt.listItems[x].ID();

                                }

                                id = String(id);

                                if (itemId === id) {

                                    itemObject = opt.listItems[x];
                                    x = y + y;

                                }

                            }

                        }

                        return itemObject;

                    }, // end: pageSetup.getBoardItemDataObject


                    /**
                     * Shows the List items on the board.
                     *
                     * @param {Object} [options]
                     *
                     * @param {Array} [options.rows=opt.listItems]
                     *              The rows to display on tehe board. Default
                     *              to list stored in opt.listItems.
                     *
                     * @param {Boolean} [options.refresh=false]
                     *              If true, then items currently on the board
                     *              will not be erased; only new items will be
                     *              added and invalid item will be removed.
                     *
                     * @param {Boolean} [options.doBoardInsert=true]
                     *              When true, the items created will be inserted
                     *              into the board widget. Set to false if doing it
                     *              elsewhere.
                     *
                     * @return {Object} itemsForBoard
                     *              An object with state=string of html for
                     *              insertion into the Board.
                     *
                     */
                    showItemsOnBoard:   function(options){

        // console.time("Board.ShowItemsOnBoard()");


                        var thisOpt         = $.extend({}, {
                                                rows:           opt.listItems,
                                                refresh:        false,
                                                doBoardInsert:  true
                                            }, options),
                            newItems        = [],
                            delItems        = [],
                            chgItems        = [],
                            itemsForBoard   = {}, // each state as the key... string of html as value
                            boardItemStr    = "",
                            boardItemCntr   = null,
                            thisRowState    = null,
                            thisRowID       = null,
                            evData          = null,
                            thisListRow     = null,
                            x,y;


                        /**
                         * Creates a new items using the given template
                         * and returns a string of that new items.
                         *
                         * @param {Object} itemDataObj  -   The item's object.
                         * @param {jQUery} $uiELe       -   The UI container.
                         *
                         * @return {String} new item html
                         *
                         */
                        function createNewItem(itemDataObj, $uiEle) {

                            var newItem     = "",
                                itemId      = null,
                                css         = "";

                            // Caller defined a function for item template?
                            if ($.isFunction(opt.template)) {

                                newItem = opt.template.call(
                                            ele, itemDataObj, $uiEle);

                                if (newItem) {

                                    newItem = String(newItem);

                                }


                            // ELSE: Caller did not define function for template
                            } else {

                                newItem = $.SPWidgets.fillTemplate(opt.template, thisListRow );

                            }

                            // If we have a UI element already and a new item was created
                            // insert it directly into the UI element.
                            if ($uiEle !== undefined && newItem !== "") {

                                $uiEle.html(newItem);

                            // Else, we have no UI Element... If the new Item is not
                            // blank, then create a new item for insertion.
                            } else if (newItem !== "") {

                                // Accomodate possible knockout objects
                                itemId = itemDataObj.ID;

                                if ($.isFunction(itemDataObj.ID)) {

                                    itemId = itemDataObj.ID();

                                }

                                // Store this item to be added to the board in bulk
                                if ( itemsForBoard[thisRowState] === undefined ) {

                                    itemsForBoard[thisRowState] = "";

                                }

                                if (opt.initDone && thisOpt.refresh) {

                                    css += " spwidget-temp";

                                }

                                itemsForBoard[thisRowState] +=
                                    '<div class="spwidget-board-state-item ui-state-default ui-corner-all' +
                                    css + '" data-id="' + itemId + '">' + newItem + '</div>';

                            }

                            return newItem;

                        } //end: ------> createNewItem()


                        // If refresh is false, then erase all items
                        // currently in the board
                        if (!thisOpt.refresh) {

                            for(x=0,y=opt.states.length; x<y; x++){

                                opt.states[x].headerTotalEle.html("0");
                                opt.states[x].dataEle.empty();

                            }

                        }


         // console.time("Board.ShowItemsOnBoard().each(rows)");

                        // Populate each row into its respective column
                        for(x=0,y=thisOpt.rows.length; x<y; x++){

                            thisListRow = thisOpt.rows[x];

                            // Get this row's State and ID.
                            // Accomodate possible knockout objects
                            thisRowState = thisListRow[opt.field] || "";
                            thisRowID    = thisListRow.ID;

                            if ($.isFunction(thisRowState)) {

                                thisRowState = thisListRow[opt.field]();

                            }

                            if ($.isFunction(thisRowID)) {

                                thisRowID = thisRowID();

                            }

                            // If this state value is on the board (as a column),
                            // Then proced to build the item into the board.
                            if (opt.statesMap[thisRowState]) {

                                // If not a refresh, then the entire UI is being
                                // rebuilt. We'll be working with Strings.
                                if (thisOpt.refresh === false) {

                                    // if INIT is done (true), then capture this as a new
                                    // item on the board (for events)
                                    if (opt.initDone) {

                                        newItems.push(thisListRow);

                                    }

                                    createNewItem(thisListRow);

                                // ELSE, must be doing a Refresh and these
                                // items could already exist on the board.
                                } else {

                                    // Try to find this row in the board
                                    boardItemCntr = opt.statesCntr
                                            .find( "div[data-id='" + thisRowID + "']" );

                                    // If item was NOT found on the board, then
                                    // we're adding it now.
                                    if ( !boardItemCntr.length ) {

                                        // if INIT is done (true), then capture this as a new
                                        // item on the board (for events)
                                        if (opt.initDone) {

                                            newItems.push(thisListRow);

                                        }

                                        createNewItem(thisListRow);

                                    // Else, item was found on the Board.
                                    } else {

                                        // Add a temporary class to the item, so that we
                                        // know a little later (below) that this is still
                                        // a valid item
                                        boardItemCntr.addClass("spwidget-temp");

                                        // Check if it should be moved to a new STate (column)
                                        if (boardItemCntr.closest("div.spwidget-board-state")
                                                .data("boardstate") !== thisRowState
                                        ) {

                                            boardItemCntr.appendTo(opt.statesMap[thisRowState].dataEle);
                                            chgItems.push(thisListRow);

                                        }

                                        // Refresh the UI for the item with the new data
                                        createNewItem(thisListRow, boardItemCntr);

                                    }

                                } //end: if(): is it refresh?

                            } //end: if(): Does the state appear on the board?

                        } //end: for() - each thisOpt.rows[]

         // console.timeEnd("Board.ShowItemsOnBoard().each(rows)");

                        // should we update the board?
                        if (thisOpt.doBoardInsert) {


         // console.time("Board.ShowItemsOnBoard().InsertIntoDOM");


                            for (x in itemsForBoard) {

                                if ( itemsForBoard.hasOwnProperty(x) && itemsForBoard[x] !== "" ) {

                                    opt.statesMap[x].dataEle.append( itemsForBoard[x] );

                                }

                            }

                            // Add the mouseover hover affect.
                            $.pt.addHoverEffect(ele.find(".spwidget-board-state-item"));


         // console.timeEnd("Board.ShowItemsOnBoard().InsertIntoDOM");


                        }

                        // If initialization is done and board is being
                        // refreshed, then check to see if any items are
                        // no longer valid
                        if (opt.initDone && thisOpt.refresh) {

                            opt.statesCntr.find("div.spwidget-board-state-item")
                                    .not("div.spwidget-temp").each(function(){

                                        delItems.push(
                                            opt.getBoardItemDataObject( $(this).data("id") )
                                        );

                                        $(this).remove();

                                    })
                                    .end()
                                .removeClass("spwidget-temp");

                        }

                        // If initialization was done already, then
                        // trigger events and refresh jQuery UI widget
                        if (opt.initDone) {

                            // Refresh sortable widget if init was already done
                            opt.statesCntr.find("div.spwidget-board-state")
                                    .sortable("refresh")
                                    .end()
                                .disableSelection();

                            // Get a new event object
                            evData = opt.getEventObject();

                            // Trigger events if init has already been done
                            if (newItems.length) {

                                evData.itemsModified.length = 0;
                                evData.itemsModified.push(newItems);
                                ele.trigger(
                                    "spwidget:boarditemadd",
                                    [ ele, $.extend( {}, evData ) ] );

                            }

                            if (delItems.length) {

                                evData.itemsModified.length = 0;
                                evData.itemsModified.push(delItems);
                                ele.trigger(
                                    "spwidget:boarditemremove",
                                    [ ele, $.extend( {}, evData ) ] );

                            }

                            // Push both updates and removals to the eventObject
                            evData.itemsModified.length = 0;
                            evData.itemsModified.push.apply(evData.itemsModified, newItems);
                            evData.itemsModified.push.apply(evData.itemsModified, delItems);
                            evData.itemsModified.push.apply(evData.itemsModified, chgItems);

                            // Trigger event if anything has changed.
                            if (evData.itemsModified.length) {

                                ele.trigger("spwidget:boardchange", [ ele, evData ]);

                            }

                        }//end: if(): initDone == true

                        // Update the headers and set the board height
                        opt.updBoardHeaders();
                        opt.setBoardColumnHeight();

         // console.timeEnd("Board.ShowItemsOnBoard()");

                        return itemsForBoard;

                    }, //end: opt.showItemsOnBoard()

                    /**
                     * Updates the board headers with the total number of
                     * items under each state column
                     *
                     * @param {options} [options]
                     * @param {String|} [options.state=null] The state to be updated
                     *
                     */
                    updBoardHeaders: function(options) {

                        var thisOpt = $.extend({}, {
                                state: null
                            }, options ),
                            x,y;

                        // Specific state
                        if (thisOpt.state) {

                            // FIXME: Need to implement functionality

                        // ALL States
                        } else {

                            for( x=0,y=opt.states.length; x<y; x++ ){

                                opt.states[x].headerTotalEle
                                    .html(
                                        opt.states[x].dataEle.children().length
                                    );

                            }

                        }

                    }, //end: opt.updBoardHeaders()

                    /**
                     * Returns an object with data about the board that can
                     * be used to pass along to events.
                     *
                     * @param {jQuery|HTMLElement} [uiItemEle]
                     *      The board item to initiate the event object from.
                     *
                     * @return {Object}
                     *
                     */
                    getEventObject: function(uiItemEle){

                        if (!uiItemEle) {
                            uiItemEle = opt.statesCntr.find("div.spwidget-board-state-item:first");
                        }
                        uiItemEle = $(uiItemEle);

                        var evObj = {
                                /** @property {Object} evObj.stateTotal A map of state name to total number of items */
                                stateTotals:    {},

                                /** @property {Integer} itemTotal   The total number of items in the board, across all states. */
                                itemTotal: 0,

                                /** @property {String} evObj.currentState   The state name */
                                currentState:   uiItemEle.closest("div.spwidget-board-state")
                                                    .data("boardstate"),

                                /** @property {Object} evObj.itemObj    The individual board item data */
                                itemObj:        ( opt.getBoardItemDataObject( uiItemEle.data("id") ) || {} ),

                                /** @property {Array} evObj.itemsModified   The list of objects representing the modified items */
                                itemsModified: []
                            },
                            x,j;

                        // Build totals
                        for( x=0,j=opt.states.length; x<j; x++ ){

                            evObj.itemTotal += evObj.stateTotals[opt.states[x].name] = Number( opt.states[x].headerTotalEle.text() );

                        }

                        return evObj;

                    }, //end: opt.getEventObject()

                    /**
                     * Returns the url (full url) for the requested form
                     * of the List.
                     *
                     * @param {String} type
                     *          A static string value indicating the type
                     *          of form to return. Valid values include
                     *          'EditForm', 'DisplayForm' and 'NewForm'
                     *
                     * @return {String}
                     *          The url to the list form.
                     *
                     */
                    getListFormUrl: function(type) {

                        type = String(type).toLowerCase();

                        function loadFormCollection() {

                            SPAPI.getListFormCollection({
                                listName:       opt.list,
                                webURL:         opt.webURL,
                                cacheXML:       true,
                                async:          false,
                                completefunc:   function(xData, Status) {

                                    // Need to check for errors?

                                    $(xData.responseXML)
                                        .find("Form")
                                        .each(function(){

                                            var $thisForm = $(this);

                                            opt.formUrls[ String($thisForm.attr("Type")).toLowerCase() ] =
                                                opt.webURL + "/" + $thisForm.attr("Url");

                                        });


                                } //end: completefunc
                            });

                        } //end: loadFormCollection()


                        if (opt.formUrls === null) {

                            opt.formUrls = {};
                            loadFormCollection();

                        }

                        return ( opt.formUrls[type] || "" );

                    }, // end: opt.getListFormUrl()

                    /**
                     * Handles the setting of visible board columns based on
                     * user input, which shoudl be an array of column names.
                     *
                     * @param {Array|String} colList
                     *      An array of columns names or a static string value
                     *      of 'all'. Column names can be either internal name
                     *      or external.
                     *
                     */
                    setUserDefinedVisibleCol: function (colList){

                        var count   = 0,
                            showAll = false;

                        if (!colList) {

                            return;

                        }

                        // If input is not an array, then exit, unless
                        // it is the keyword 'all'.
                        if (!$.isArray(colList) || !colList.length) {

                            if (    !$.isArray(colList)
                                &&  String(colList).toLowerCase() !== "all"
                            ) {

                                return;

                            }

                            showAll = true;
                            colList = [];

                        }

                        if (colList.length < 2) {

                            return;

                        }

                        // isValidColumn - checks if a column is valid
                        function isValidColumn(colName) {

                            var response = false;

                            $.each(opt.states, function(i, state){

                                if (state.title === colName || state.name === colName) {

                                    response = true;
                                    return false;

                                }

                            });

                            return response;
                        } //end: function isValidColumn


                        // Validate that at least 2 of the column names are valid.
                        if (!showAll) {

                            count = 0;
                            $.each(colList, function(i, col){

                                if (isValidColumn(col)) {

                                    count++;

                                }

                                // If we validated at least 2 columns, exit. Next loop
                                // will do the job of show/hide if column valid.
                                if (count === 2) {

                                    return false;

                                }

                            });

                        }

                        // Loop through all states and if any of them are
                        // in the list of columns to make visible, ensure they
                        // are visible on the board, else hide it.
                        count = 0;
                        $.each(opt.states, function(i, colDef){

                            if (    $.inArray(colDef.title, colList) > -1
                                ||  $.inArray(colDef.name, colList) > -1
                            ) {

                                count++;

                                if (colDef.isVisible === false) {

                                    colDef.isVisible = true;
                                    colDef.dataEle.css("display", "");
                                    colDef.headerEle.css("display", "");

                                }

                            } else {

                                colDef.isVisible = false;
                                colDef.dataEle.css("display", "none");
                                colDef.headerEle.css("display", "none");

                            }


                            // if we reached the MAX allowed number
                            // of visible columns, then break loop.
                            if (count >= opt.maxColumnVisible) {

                                return false;

                            }

                        });

                        opt.setBoardColumnClass(count);

                        // Adjust the board columns height
                        opt.setBoardColumnHeight();

                        opt.triggerBoardColumnChangeEvent();

                        return;

                    }, //end: setUserDefinedVisibleCol()

                    /**
                     * Sets the class on the board based on the number
                     * of columns displayed.
                     *
                     * @param {Integer} colCount
                     *      Number of columns. If not defined, then this
                     *      method will loop through opt.states to determine
                     *      what is visible
                     *
                     * @return {Object} opt
                     */
                    setBoardColumnClass: function(colCount) {

                        var $colCntr = opt.headersCntr.add(opt.statesCntr);

                        colCount = parseInt( colCount );

                        if (!colCount || colCount < 2) {

                            colCount = 0;

                            $.each(opt.states, function(i, colDef){

                                if (colDef.isVisible) {

                                    colCount++;

                                }

                            });

                        }

                        if (opt.showNumberOfColumns === colCount) {

                            return opt;

                        }

                        // Add the new class...
                        $colCntr.addClass("spwidget-states-" + colCount);

                        if (opt.showNumberOfColumns) {

                            $colCntr.removeClass(
                                "spwidget-states-" + opt.showNumberOfColumns);

                        }

                        opt.showNumberOfColumns = colCount;

                        return opt;

                    }, //end: opt.setBoardColumnClass()

                    /**
                     * Triggers a spwidget:boardColumnChange event on the board.
                     * This is done only if initiazliation has been done. Called
                     * when there are changes invisibility to the board's columns.
                     */
                    triggerBoardColumnChangeEvent: function() {

                        var columns = [];

                        if (opt.initDone) {

                            $.each(opt.statesMap, function(key,defObj){

                                if (defObj.isVisible){

                                    columns.push(defObj.title);

                                }

                            });

                            opt.ele.trigger(
                                "spwidget:boardColumnChange",
                                [ opt.ele, columns ] );

                        }

                    }, //end: opt.triggerBoardColumnChangeEvent

                    /**
                     * Sets up the button for the Column picker.
                     */
                    setupColumnPicker: function(){

                        var $colCntr    = ele.find(".spwidget-board-column-list-cntr"),
                            $colList    = $colCntr.find("div.spwidget-board-column-list"),
                            $colFooter  = $colCntr.children("div.ui-state-default:last"),
                            Picker      = {
                                $totalCntr:     $colCntr.find("span.spwidget-board-column-total")
                            };


                        /**
                         * SEts the total selected on the picker and returns
                         * that total to the caller.
                         *
                         * @return {Integer}
                         */
                        Picker.setTotalSelected = function(){

                            var total = Picker.getSelected().length;

                            Picker.$totalCntr.html(total);

                            return total;

                        }; //end: Picker.setTotalSelected()

                        /**
                         * Returns a jQuery object with the list of columns
                         * selected by the user (anchors <a>)
                         *
                         * @return {jQuery}
                         */
                        Picker.getSelected = function() {

                            return $colList.find("a.ui-state-highlight");

                        }; //end: Picker.getSelected()

                        /**
                         * Shows a message on the picker
                         *
                         */
                        Picker.showMessage = function(msg) {

                            $('<div class="spwidget-board-msg ui-state-error ui-corner-all">' +
                                    msg + '</div>')
                                .appendTo($colFooter)
                                .fadeOut(8000, function(){
                                    $(this).remove();
                                });

                        };

                        /**
                         * Sets the currently displayed columns on the picker
                         */
                        Picker.setSelected = function() {

                            var $columns    = $colList.find("a");

                            $.each(opt.states, function(i, colDef){

                                var $thisCol = $columns.filter(
                                                "[data-board_col_index='" + i + "']" );

                                if (colDef.isVisible) {

                                    Picker.selectColumn($thisCol, false);

                                } else {

                                    Picker.selectColumn($thisCol, true);

                                }

                            });

                            Picker.setTotalSelected();

                        }; //end: Picker.setSelected()

                        /**
                         * Sets the columns (an <a> anchor) to either
                         * selected or not selected
                         *
                         * @param {HTMLElement} colEle
                         *          Single html element or an array of elements
                         *
                         * @param {Boolean} unSelect
                         *          If true, then the column, regardless of its
                         *          current display setting, will be un-selected.
                         *
                         * @return {HTMLElement} anchor
                         */
                        Picker.selectColumn = function(colEle, unSelect){

                            $(colEle).each(function(){

                                var $a      = $(this),
                                    $icon   = $a.find(".ui-icon");

                                if ($a.hasClass("ui-state-highlight") || unSelect) {

                                    if (unSelect !== false) {

                                        $icon.removeClass("ui-icon-check");
                                        $a.removeClass("ui-state-highlight");

                                    }

                                } else {

                                    $icon.addClass("ui-icon-check");
                                    $a.addClass("ui-state-highlight");

                                }

                            });

                            return colEle;

                        }; //end: Picker.selectColumn()

                        /**
                         * CHanges the board columns and makes only those selected
                         * on the COlumn Picker visible. A set of colunsn (the <a>
                         * element on the picker) can also be given on input, which
                         * will be used as the set to make visible, regardless of
                         * their state on the picker.
                         *
                         * @param {jQuery} $selected
                         *
                         * @return {undefined}
                         */
                        Picker.setVisibleColumns = function($selected){

                            if (!$selected) {

                                $selected = Picker.getSelected();

                            }

                            var colNum = $selected.length;

                            // Apply columns
                            $.each(opt.states, function(i, colDef){

                                if ($selected.filter(
                                            "[data-board_col_index='" + i + "']"
                                        ).length
                                ) {

                                    if (colDef.isVisible === false) {

                                        colDef.isVisible = true;
                                        colDef.dataEle.css("display", "");
                                        colDef.headerEle.css("display", "");

                                    }

                                } else {

                                    colDef.isVisible = false;
                                    colDef.dataEle.css("display", "none");
                                    colDef.headerEle.css("display", "none");

                                }

                            });

                            opt.setBoardColumnClass(colNum);

                            // Adjust the board columns height
                            opt.setBoardColumnHeight();

                        }; //end: Picker.setVisibleColumns()

                        /**
                         * Given an array of visible column names, this method
                         * will make that set of columns visible.
                         * Columns are first validated to ensure they exist,
                         * and the min/max limits are also honored.
                         *
                         * FIXME: Refactor method Picker.setUserDefinedVisibleCol to use opt.setUserDefinedVisibleCol
                         */
                        Picker.setUserDefinedVisibleCol = function(colList){

                                var count       = 0,
                                    selector    = "";

                                // If input is not an array, then exit, unless
                                // it is the keyword 'all'.
                                if (!$.isArray(colList) || !colList.length) {

                                    if (    !$.isArray(colList)
                                        &&  String(colList).toLowerCase() !== "all"
                                    ) {

                                        return;

                                    }

                                    // set all columns visible
                                    colList = [];

                                    $.each(opt.states, function(i,colDef){

                                        colList.push(colDef.title);

                                    });

                                }

                                // Build the jQUery selector for the set of columns
                                // that should be made visible. This selector is used
                                // to get a set of elements (columns) from the Picker
                                // that will then drive which columns are visible.
                                $.each(colList, function(i,columnName){

                                    // loop through the Array of states looking
                                    // for this column. Once found, build the
                                    // jquery selector for it and exit loop
                                    $.each(opt.states, function(i, state){

                                        if (state.title === columnName) {

                                            count++;

                                            if (count > 1) {

                                                selector += ",";

                                            }

                                            selector += "a[data-board_col_name='" +
                                                        state.name + "']";

                                            return false;

                                        }

                                    });

                                    // if we reached the MAX allowed number
                                    // of visible columns, then break loop.
                                    if (count >= opt.maxColumnVisible) {

                                        return false;

                                    }

                                });

                                // if we have at least 2 columns, then make only the
                                // requested set visible
                                if (count >= 2) {

                                    Picker.setVisibleColumns($colList.find(selector));
                                    Picker.triggerEvent();

                                }

                            }; //end: Picker.setUserDefinedVisibleCol() and opt.setUserDefinedVisibleCol()

                        /**
                         * Triggers a spwidget:boardColumnChange event on the board.
                         * This is done only if initiazliation has been done.
                         */
                        Picker.triggerEvent = opt.triggerBoardColumnChangeEvent;

                        // ----------------- [ setup ] ------------------

                        // Setup Picker apply button
                        $colCntr.find("button[name='apply']")
                            .button({
                                label: opt.colPickerApplyLabel,
                                icons: {
                                    secondary: "ui-icon-circle-check"
                                }
                            })
                            .on("click", function(ev){

                                var $selected   = Picker.getSelected(),
                                    colNum      = $selected.length;

                                // validate
                                if (colNum > opt.maxColumnVisible) {

                                    Picker.showMessage(opt.colPickerMaxColMsg)
                                    return;

                                } else if (colNum < 2) {

                                    Picker.showMessage(opt.colPickerMinColMsg)
                                    return;

                                }

                                // Hide container
                                $colCntr.hide();

                                Picker.setVisibleColumns($selected);
                                Picker.triggerEvent();

                            });

                        // Setup Picker CHECK button
                        $colCntr.find("button[name='check']")
                            .attr("title", opt.colPickerCheckLabel)
                            .button({
                                text: false,
                                icons: {
                                    primary: "ui-icon-radio-off"
                                }
                            })
                            .on("click", function(ev){

                                var $sel = Picker.getSelected();

                                if ($sel.length) {

                                    Picker.selectColumn($sel, true);

                                } else {

                                    Picker.selectColumn( $colList.find("a") );

                                }

                                Picker.setTotalSelected();

                            });

                        // Setup Picker Close button
                        $colCntr.find("button[name='close']")
                            .attr("title", opt.colPickerCloseLabel)
                            .button({
                                text: false,
                                icons: {
                                    primary: "ui-icon-circle-close"
                                }
                            })
                            .on("click", function(ev){

                                $colCntr.hide();

                            });

                        // Setup the columns button
                        ele.find("div.spwidget-board-settings")
                            .css("display", "")
                            .find("div.spwidget-board-settings-columns")
                                .each(function(){

                                    var $btn = $(this);

                                    $btn.button({
                                        label: opt.colPickerLabel,
                                        icons: {
                                            secondary: "ui-icon-triangle-1-s"
                                        }
                                    })
                                    .on("click.SPWidgets", function(){

                                        if ($colCntr.is(":visible")) {

                                            $colCntr.hide();

                                        } else {

                                            Picker.setSelected();

                                            $colCntr.show()
                                                .position({
                                                    my: "left top",
                                                    at: "left bottom",
                                                    of: $btn
                                                });

                                        }

                                    });

                                    return false;

                                });

                        // Setup the Column choices in the popup
                        $colList.each(function(){

                                var $cntr   = $(this),
                                    columns = "";

                                $.each(opt.states, function(i,colDef){

                                    columns += '<a href="javascript:" data-board_col_index="' +
                                        i + '" data-board_col_name="' + colDef.name +
                                        '"><span class="ui-icon ui-icon-minus"></span>' +
                                        '<span>' + colDef.title + '</span></a>';

                                });

                                $cntr.html(columns);

                                return false;

                            })
                            .on("click", "a", function(){

                                Picker.selectColumn(this);
                                Picker.setTotalSelected();

                            });

                        // Set the label of the Total
                        $colCntr.find("span.spwidget-board-column-total-label")
                            .html( opt.colPickerTotalLabel );

                    }, //end: opt.setupColumnPicker()

                    /**
                     * Sets the height on the board header and
                     * data columns so that they are all equal.
                     *
                     */
                    setBoardColumnHeight: function() {

                        // Set the height of the headers
                        if (opt.headersCntr.is(":visible")) {

                            $.SPWidgets.makeSameHeight(
                                opt.headersCntr.find("div.spwidget-board-state:visible"),
                                0,
                                'min-height'
                            );

                        }

                        // If user defined a fixed height, then use that on the
                        // card content column and exit.
                        if (opt.height) {

                            opt.statesCntr
                                .find("div.spwidget-board-state:visible")
                                .css({
                                    height:         opt.height,
                                    "min-height":   ""
                                });

                            return;

                        }

                        // Else, set the height of the column area that holds the cards.
                        // We also remove the fixed height from these if set.
                        if (opt.statesCntr.is(":visible")) {

                            $.SPWidgets.makeSameHeight(
                                opt.statesCntr
                                    .find("div.spwidget-board-state:visible")
                                    .css("height", ""),
                                20,
                                'min-height'
                            );

                        }

                        return;

                    }, // end: opt.setBoardCOlumnHeight()

                    /**
                     * Returns an array of objects with the list of board
                     * columns currently defined for the board. This list
                     * is _NOT_ the internal array, but rather an external
                     * "safe" list.
                     *
                     * @return {Array}
                     *      An array of objects. Each object contains the
                     *      name, title and isVisible attributes.
                     *
                     */
                    getBoardColumnList: function() {

                        var columns = [],
                            i,j;

                        for(i=0,j=opt.states.length; i<j; i++){

                            columns.push({
                                name:       opt.states[i].name,
                                title:      opt.states[i].title,
                                isVisible:  opt.states[i].isVisible
                            });

                        }

                        return columns;

                    } //end: opt.getBoardColumnList()


            });//end: $.extend() set opt

            //----------------------------------------------------------
            //----------------[ Initialize this instance ]--------------
            //----------------------------------------------------------

            // Check for Required params
            if ( !opt.list || !opt.field ) {

                ele.html("<div>SPWidgets:Board [ERROR] Missing required input parameters!</div>");
                return this;

            }

            // Store instance object and mark element "loading"
            ele.addClass("loadingSPShowBoard").data("SPShowBoardOptions", opt);

            // get board states from the table definition
            opt.getBoardStates().then(function(){

                // If user did not define CAMLViewFields or the definition
                // by the user did not include the Board column then either
                // define it here or add on to the set.
                if (opt.CAMLViewFields === "") {

                    opt.CAMLViewFields =
                        '<ViewFields>' +
                            '<FieldRef Name="ID" />' +
                            '<FieldRef Name="Title" />' +
                            '<FieldRef Name="' + opt.field + '" />' +
                        '</ViewFields>';

                } else if (opt.CAMLViewFields.indexOf(opt.field) < 0){

                    opt.CAMLViewFields = opt.CAMLViewFields.replace(
                                    /\<\/ViewFields\>/i,
                                    '<FieldRef Name="' +
                                        opt.field + '" /></ViewFields>'
                                );

                }

                // Populate the element with the board template
                ele.html($(Board.htmlTemplate).filter("div.spwidget-board"));

                // Get a copy of the state column for both headers and values
                opt.tmpltHeader  = $("<div/>")
                                    .append(
                                        ele.find("div.spwidget-board-headers-cntr div.spwidget-board-state").clone()
                                    ).html();

                opt.tmpltState   = $("<div/>")
                                .append(
                                    ele.find("div.spwidget-board-states-cntr div.spwidget-board-state")
                                )
                                .html();

                // Set the number of columns to display
                // If less then 11, then set it to that number
                if (opt.states.length <= opt.maxColumnVisible) {

                    opt.showNumberOfColumns = opt.states.length;

                }

                // Get pointers to the containers in the UI
                opt.statesCntr  = ele
                                    .find("div.spwidget-board-states-cntr")
                                        .addClass(
                                            "spwidget-states-" +
                                            opt.showNumberOfColumns
                                        )
                                        .empty();

                opt.headersCntr = ele
                                    .find("div.spwidget-board-headers-cntr")
                                        .addClass(
                                            "spwidget-states-" +
                                            opt.showNumberOfColumns
                                        )
                                        .empty();

                // Build the board columns
                $.each(opt.states, function(i,v){

                    v.headerEle = $(opt.tmpltHeader)
                                    .appendTo(opt.headersCntr)
                                    .attr("data-boardstate", v.name)
                                    .attr("data-boardindex", i)
                                    .find(".spwidget-board-header-title")
                                        .html(v.title)
                                        .end();

                    v.dataEle = $(opt.tmpltState).appendTo(opt.statesCntr)
                                    .attr("data-boardindex", i)
                                    .attr("data-boardstate", v.name);

                    // Create the header element that holds the total
                    v.headerTotalEle = v.headerEle
                                        .find("span.spwidget-state-item-total");

                    // Create variable to track if column is visible
                    v.isVisible = true;

                    // If the index is greater than 9 (10 columns) then Column
                    // must be hidden - only support 10 columns.
                    if (i > (opt.maxColumnVisible - 1) ) {

                        v.headerEle.css("display", "none");
                        v.dataEle.css("display", "none");
                        v.isVisible = false;

                    }

                }); //end: .each()

                // Insert element to clear float elements
                $(opt.headersCntr,opt.statesCntr)
                    .append('<div style="clear:both;"></div>');

                // If showColPicker is true, then show the column selector
                if (opt.showColPicker === true) {

                    opt.setupColumnPicker();

                }

                // If user defined colPickerVisible on input, then
                // make only those items visible
                if ($.isArray(opt.colPickerVisible) && opt.colPickerVisible.length) {

                    opt.setUserDefinedVisibleCol(opt.colPickerVisible);

                }

                // Create listeners on the board.
                ele
                    // Bind function to sortable events so that headers stay updated
                    .on("sortreceive sortremove", function(ev, ui){

                        opt.updBoardHeaders();
                        $(ui.item).removeClass("ui-state-hover");

                    })

                    // On Sortreceive: update item
                    .on("sortreceive", function(ev, ui){

                        var evData  = opt.getEventObject(ui.item),
                            dfd     = $.Deferred(),
                            itemId  = '';

                        // Handle possibly the itemObject being a knockout object
                        if ($.isFunction(evData.itemObj.ID)) {

                            itemId = evData.itemObj.ID();

                        } else {

                            itemId = evData.itemObj.ID;

                        }

                        // Make the update to the state in SP
                        evData.updates       = []; // Format = SPService UpdateListItems
                        evData.updatePromise = dfd.promise();
                        evData.updates.push([ opt.field, evData.currentState ]);

                        // TODO: need to normalize evData by adding values to itemsModified

                        // Call any onPreUpdate event. If TRUE (boolean) is returned,
                        // update is canceled. Note that the UI is not updated to
                        // reflect a canceled update (ex. item is not moved back to
                        // original position)
                        if ($.isFunction(opt.onPreUpdate)) {

                            if (opt.onPreUpdate.call(ui.item, ev, ui.item, evData) === true) {

                                return this;

                            }

                        }

                        // If no updates to make, exit here.
                        if (!evData.updates.length) {

                            return this;

                        }

                        // Make update to SP item
                        SPAPI.updateListItems({
                            listName:       opt.list,
                            async:          true,
                            ID:             itemId,
                            valuepairs:     evData.updates,
                            webURL:         opt.webURL,
                            completefunc:   function(xData, status){

                                // Process Errors
                                if (status === "error") {

                                    dfd.rejectWith(
                                            ele,
                                            [ 'Communications Error!', xData, status ]);

                                    return;

                                }

                                var resp = $(xData.responseXML),
                                    row  = null;

                                if ( resp.SPMsgHasError() ) {

                                     dfd.rejectWith(
                                            ele,
                                            [ resp.SPGetMsgError(), xData, status ]);

                                    return;

                                }

                                row = SPAPI.getNodesFromXml({
                                    xDoc: xData.responseXML,
                                    nodeName: "z:row"
                                });

                                $(ev.target).trigger(
                                    "spwidget:boardchange", [ ui.item, evData ] );

                                dfd.resolveWith(ev.target, [row[0], evData.itemObj, xData]);

                            }//end: completefunc()
                        });

                    }) // end: ele.on("sortreceive")

                    // Buind event to catch board actions
                    .on("click", "a.spwidgets-board-action", function(ev){

                        var $actionEle  = $(ev.currentTarget),
                            action      = String(
                                                $actionEle
                                                    .data("spwidgets_board_action")
                                            )
                                            .toLowerCase(),
                            gotoUrl     = "",
                            thisPageUrl = $.pt.getEscapedUrl(window.location.href);

                        // TODO: enhance to open item in dialog (SP2010) if that feature is on

                        switch (action) {

                            case "edit-item":

                                gotoUrl = opt.getListFormUrl("EditForm");

                                break;

                            case "view-item":

                                gotoUrl = opt.getListFormUrl("DisplayForm");

                                break;


                        } //end: switch()

                        window.location.href = gotoUrl +
                            "?ID=" + $actionEle.data("spwidgets_id") +
                            "&Source=" + thisPageUrl;

                        return this;

                    }); //end: ele.on()

                // If no template was defined, use default
                if (opt.template === null) {

                    opt.template = $( Board.htmlTemplate )
                                    .filter("div.spwidget-item-template");

                }

                // Retrieve the items from the List and then
                // Display items retrieved on the board
                opt._getListItems()
                    .then(function(){

                        opt.showItemsOnBoard();

                        // Make the columns "sortable"
                        opt.statesCntr.find("div.spwidget-board-state").each(function(){
                            var thisState = $(this);
                            thisState.sortable({
                                connectWith:    thisState.siblings(),
                                containment:    ele,
                                cursor:         "move",
                                tolerance:      "pointer",
                                opacity:        ".80",
                                placeholder:    "ui-state-highlight spwidget-board-placeholder",
                                forcePlaceholderSize: true,
                                remove:         function(ev, ui){

                                    opt.setBoardColumnHeight();

                                }//end: remove()
                            });

                        });


                        // Make text inside the states container un-selectable.
                        opt.statesCntr.disableSelection();

                        opt.initDone = true;

                        opt.setBoardColumnHeight();

                        // remove temp class and add the hasSPShowBoard to it.
                        ele.addClass("hasSPShowBoard").removeClass("loadingSPShowBoard");

                        // Call any user defined callback and trigger create event
                        if ($.isFunction(opt.onBoardCreate)) {

                            opt.onBoardCreate.call(ele, opt.getEventObject());

                        }

                        $(ele).trigger(
                            "spwidget:boardcreate",
                            [ ele, opt.getEventObject() ] );

                    });

            }) //end: .then() (get board states)
            .fail(function(failureMsg, xData, status){

                ele.append('<div class="ui-state-error"><p>' + failureMsg + '</p></div>');

            }); //end: .fail() (get board states)

            return this;

        });//end: return .each()

        // return the original jQuery selection OR whatever
        // a method might have generated if one was called.
        return retVal;

    };//end: $.fn.SPShowBoard()

    /**
     * @property
     * Stores the Style sheet that is inserted into the page the first
     * time SPShowBoard() is called.
     * Value is set at build time.
     */
    Board.styleSheet = "/** \n"
+ " * Stylesheet for the Board widget\n"
+ " * \n"
+ " * BUILD: August 23, 2014 - 10:14 AM\n"
+ " */\n"
+ "div.spwidget-board {\n"
+ "    width: 100%;\n"
+ "    position: relative;\n"
+ "}\n"
+ "\n"
+ "div.spwidget-board div.spwidget-board-headers,\n"
+ "div.spwidget-board div.spwidget-board-headers-cntr,\n"
+ "div.spwidget-board div.spwidget-board-states-cntr, \n"
+ "div.spwidget-board div.spwidget-board-states {\n"
+ "    width: 100%;\n"
+ "}\n"
+ "\n"
+ "div.spwidget-board div.spwidget-board-state {\n"
+ "    width: 49%;\n"
+ "    float: left;\n"
+ "    margin: 0% .1%;\n"
+ "    padding: .2%;\n"
+ "    overflow: auto;\n"
+ "}\n"
+ "/* Board Individual Headers */\n"
+ "div.spwidget-board div.spwidget-board-headers-cntr div.spwidget-board-state {\n"
+ "    font-weight: bold;\n"
+ "    font-size: 1.1em;\n"
+ "    overflow: hidden;\n"
+ "    word-wrap: break-word;\n"
+ "}\n"
+ "/* Board Header Title */\n"
+ "div.spwidget-board div.spwidget-board-headers-cntr .spwidget-board-header-title,\n"
+ "div.spwidget-board div.spwidget-board-headers-cntr .spwidget-state-item-stat-cntr {\n"
+ "    display: inline-block\n"
+ "}\n"
+ "/* Board Header Stats container*/\n"
+ "div.spwidget-board div.spwidget-board-headers-cntr .spwidget-state-item-stat-cntr {\n"
+ "    font-size: .8em;\n"
+ "    float: right;\n"
+ "}\n"
+ "div.spwidget-board div.spwidget-board-headers-cntr .spwidget-item-stat {\n"
+ "    display: inline-block;\n"
+ "    min-width: 2em;\n"
+ "    padding: 0 0.2em;\n"
+ "    text-align: center;\n"
+ "}\n"
+ "\n"
+ "/* Board column content */\n"
+ "div.spwidget-board div.spwidget-board-states div.spwidget-board-state {\n"
+ "    margin-bottom: 1em;\n"
+ "    min-height: 10em;\n"
+ "}\n"
+ "\n"
+ "div.spwidget-board div.spwidget-board-state div.spwidget-board-state-item {\n"
+ "    padding: .2em;\n"
+ "    margin: .5em .2em;\n"
+ "    font-weight: normal;\n"
+ "    cursor: move;\n"
+ "    overflow: auto;\n"
+ "}\n"
+ "div.spwidget-board div.spwidget-board-state-item div.spwidget-board-item-actions{\n"
+ "    margin-top: .2em;\n"
+ "    padding: .2em .5em;\n"
+ "    overflow: hidden;\n"
+ "}\n"
+ "div.spwidget-board .spwidget-board-placeholder {\n"
+ "    height: 3em;\n"
+ "}\n"
+ "\n"
+ "/** Setting container */\n"
+ "div.spwidget-board-settings {\n"
+ "    font-size: .8em;\n"
+ "    margin: .2em;\n"
+ "}\n"
+ "div.spwidget-board-settings div.spwidget-board-column-list-cntr {\n"
+ "    z-index: 5;\n"
+ "    position: absolute;\n"
+ "}\n"
+ "div.spwidget-board-settings div.spwidget-board-column-list-cntr > div {\n"
+ "    padding: .2em;\n"
+ "}\n"
+ "div.spwidget-board-settings div.spwidget-board-column-list-cntr > div:first-child,\n"
+ "div.spwidget-board-settings div.spwidget-board-column-list-cntr > div:last-child {\n"
+ "    text-align: right;\n"
+ "}\n"
+ "div.spwidget-board-settings div.spwidget-board-column-list {\n"
+ "    width: 20em;\n"
+ "    height: 17em;\n"
+ "    overflow: auto;\n"
+ "    position: relative\n"
+ "}\n"
+ "div.spwidget-board-settings div.spwidget-board-column-list-cntr .spwidget-board-msg {\n"
+ "    position: absolute;\n"
+ "    top: 1px;\n"
+ "    left: 1px;\n"
+ "    padding: .2em;\n"
+ "}\n"
+ "div.spwidget-board-settings div.ui-state-default {\n"
+ "    position: relative;\n"
+ "}\n"
+ "div.spwidget-board-settings div.spwidget-board-column-list > a {\n"
+ "    display: block;\n"
+ "    margin: .2em;\n"
+ "    padding: .2em;\n"
+ "}\n"
+ "div.spwidget-board-settings div.spwidget-board-column-list > a > span.ui-icon {\n"
+ "    display: inline-block;\n"
+ "}\n"
+ "\n"
+ "/* Number of Columns (96 % #columns)\n"
+ " * Currently support 10 columns. \n"
+ " */\n"
+ "div.spwidget-board .spwidget-states-3 div.spwidget-board-state {\n"
+ "    width: 32.4%;\n"
+ "}\n"
+ "div.spwidget-board .spwidget-states-4 div.spwidget-board-state {\n"
+ "    width: 24%;\n"
+ "}\n"
+ "div.spwidget-board .spwidget-states-5 div.spwidget-board-state {\n"
+ "    width: 19.1%;\n"
+ "}\n"
+ "div.spwidget-board .spwidget-states-6 div.spwidget-board-state {\n"
+ "    width: 15.8%;\n"
+ "}\n"
+ "div.spwidget-board .spwidget-states-7 div.spwidget-board-state {\n"
+ "    width: 13.4%;\n"
+ "}\n"
+ "div.spwidget-board .spwidget-states-8 div.spwidget-board-state {\n"
+ "    width: 11.6%;\n"
+ "}\n"
+ "div.spwidget-board .spwidget-states-9 div.spwidget-board-state {\n"
+ "    width: 10.2%;\n"
+ "}\n"
+ "div.spwidget-board .spwidget-states-10 div.spwidget-board-state {\n"
+ "    width: 9.1%;\n"
+ "}\n";
//_HAS_BOARD_CSS_TEMPLATE_


    /**
     * @property
     * Stores the HTML template for each Board widget.
     * Value is set at build time.
     */
    Board.htmlTemplate = "<div class=\"spwidget-board\">\n"
+ "    <div class=\"spwidget-board-settings\" style=\"display:none;\">\n"
+ "        <div class='spwidget-board-settings-columns'>Columns</div>\n"
+ "        <div class=\"spwidget-board-column-list-cntr ui-widget-content ui-corner-all\" style=\"display: none\">\n"
+ "            <div class=\"ui-state-default\">\n"
+ "                <span>\n"
+ "                    <span class=\"spwidget-board-column-total\"></span> \n"
+ "                    <span class=\"spwidget-board-column-total-label\">Selected.</span>\n"
+ "                </span>\n"
+ "                <button type=\"button\" name=\"check\" title=\"Check-Uncheck All\">Check</button>\n"
+ "                <button type=\"button\" name=\"close\" title=\"Close\">Close</button>\n"
+ "            </div>\n"
+ "            <div class=\"spwidget-board-column-list\">\n"
+ "            </div>\n"
+ "            <div class=\"ui-state-default\">\n"
+ "                <button type=\"button\" name=\"apply\">Apply</button>\n"
+ "            </div>\n"
+ "        </div>\n"
+ "    </div>\n"
+ "    <div class=\"spwidget-board-headers\">\n"
+ "        <div class=\"spwidget-board-headers-cntr\">\n"
+ "            <div class=\"spwidget-board-state ui-widget-content ui-corner-top\">\n"
+ "                <span class=\"spwidget-board-header-title\"></span>\n"
+ "                <span class=\"spwidget-state-item-stat-cntr\">\n"
+ "                    <span class=\"spwidget-item-stat ui-widget-content ui-corner-all spwidget-state-item-total\">0</span>\n"
+ "                </span>\n"
+ "            </div>\n"
+ "            <div style=\"clear:both;\"></div>\n"
+ "        </div>\n"
+ "    </div>\n"
+ "    <div style=\"clear:both;\"></div>\n"
+ "    <div class=\"spwidget-board-states\">\n"
+ "        <div class=\"spwidget-board-states-cntr\">\n"
+ "            <div class=\"spwidget-board-state ui-widget-content ui-corner-bottom\"></div>\n"
+ "            <div style=\"clear:both;\"></div>\n"
+ "        </div>\n"
+ "    </div>\n"
+ "    <div style=\"clear:both;\"></div>\n"
+ "</div>\n"
+ "<div class=\"spwidget-item-template\">\n"
+ "    <div>\n"
+ "        <div>#{{ID}}: {{Title}}</div>\n"
+ "        <div class=\"ui-state-active ui-corner-all spwidget-board-item-actions\">\n"
+ "            <a class=\"spwidgets-board-action\" href=\"javascript:\" title=\"View Item\" data-spwidgets_id=\"{{ID}}\" data-spwidgets_board_action=\"view-item\"><img src=\"/_layouts/images/icgen.gif\" border=\"0\"/></a>\n"
+ "            <a class=\"spwidgets-board-action\" href=\"javascript:\" title=\"Edit Item\" data-spwidgets_id=\"{{ID}}\" data-spwidgets_board_action=\"edit-item\"><img src=\"/_layouts/images/CMSEditSourceDoc.GIF\" border=\"0\"/></a>\n"
+ "        </div>\n"
+ "    </div>\n"
+ "</div>\n";
//_HAS_BOARD_HTML_TEMPLATE_


})(jQuery);
/**
 * Widget that turn an input field into a lookup field. The
 * field will store only the ID's (one or more) for the items
 * that the user picks.
 * THe user, however, is presented with the existing items
 * and has the ability to Remove them and add new ones.
 *
 * BUILD: October 03, 2014 - 02:25 PM
 *
 */

;(function($){

    "use strict";
    /*jslint nomen: true, plusplus: true */
    /*global SPWidgets */


    /**
     * Namespace for pickSPUser specific methods.
     * @name        Lookup
     * @class       Namespace for lookup Field plugin
     */
    var Lookup = {
        _islookupFieldCssDone:  false,
        _isLookupbodyEventDone: false
    },
    SPAPI = $.SPWidgets.SPAPI;

    // Default options
    $.SPWidgets.defaults.LookupField = {
        list:               '',
        allowMultiples:     true,
        inputLabel:         '',
        inputPlaceholder:   'Type and Pick',
        readOnly:           false,
        exactMatch:         true,
        uiContainer:        null,
        selectFields:       ['Title'],
        filter:             '',
        filterFields:       ['Title'],
        filterOrderBy:      '',
        template:           '<div>{{Title}} <span class="spwidgets-item-remove">[x]</span></div>',
        listTemplate:       '{{Title}}',
        listHeight:         0,
        onItemAdd:          null,
        onItemRemove:       null,
        onReady:            null,
        msgNoItems:         "",
        maxResults:         50,
        minLength:          2,
        hideInput:          true,
        padDelimeter:       false,
        showSelector:       false
    };


    /**
     *
     * Converts the selection into a Sharepoint Lookup Field.
     *
     * @param {Object} options
     *
     * @param {String} options.list
     *              List name from where lookup will be done.
     *
     * @param {Boolean} [options.allowMultiples=true]
     *              Set to false if wanting only 1 item to be referenced.
     *
     * @param {String} [options.inputLabel=""]
     *              The label for the input field.
     *
     * @param {String} [options.inputPlaceholder="Type and Pick"]
     *              The value to be used in the Input Field placeholder
     *              attribute (HTML5 attribute)
     *
     * @param {Boolean} [options.exactMatch=true]
     *              If set to false, then the text entered by the user will
     *              be parsed into individual keywords and a search will be
     *              done on those instead.
     *
     * @param {Boolean} [options.readOnly=false]
     *              If true, field is displayed as readonly.
     *
     * @param {Selector|Object} [options.uiContainer=null]
     *              The container where the UI widget should be inserted.
     *              Default is directly after the input field
     *
     * @param {Array} options.selectFields=["Title"]
     *              Array of field names (internal names) that should be
     *              returned. ID is also used when the input value by the
     *              user is an integer.
     *
     * @param {String} [options.filter=""]
     *              Any additional filter criteria (in CAML format) to be
     *              added to the query when retrieving the Lookup values
     *              from the list.
     *              Example:
     *                  <Contains>
     *                      <FieldRef Name="Title" />
     *                      <Value Type="Text">New</Value>
     *                  </Contains>
     *
     * @param {String} [options.filterOrderBy='']
     *              The OrderBy (sort) CAML string used when retrieving values
     *              from the List.
     *              Example:
     *                  <OrderBy>
     *                      <FieldRef Name="Title" Ascending="TRUE"/>
     *                  </OrderBy>
     *
     * @param {Array} [options.filterFields=["Title"]]
     *              Array of fields name (internal names) that will be used
     *              to filter data against.
     *              Example:
     *                  options.filterFields=[
     *                      "Title",
     *                      "Description",
     *                      "Notes"
     *                  ]
     *
     * @param {String} [options.template="..."]
     *              The template to be used for displaying the item once selected.
     *              Use the following format for item Field placeholders
     *              {{fieldInternalName}}. When defining HTML, an element containing
     *              a call of 'spwidgets-item-remove' will be used to remove the item
     *              from the selected list.
     *              Example:
     *                  options.template='<div>{{Title}} [<span class="spwidgets-item-remove">x</span>]</div>',
     *
     * @param {String} [options.listTemplate="..."]
     *              The template to be used for displaying the items displayed as
     *              suggestion (autocomplete values).
     *              Use the following format for item Field placeholders
     *              {{fieldInternalName}}. Example: {{Title}}
     *
     * @param {Number} [options.listHeight=0]
     *              The height to be set on the Autocomplete suggesion box.
     *              Use this value when there is a chance for allot of values
     *              to be returned on a query.
     *
     * @param {Boolean} [options.padDelimeter=false]
     *              If true, then an extra delimeter (;#) will be inserted at
     *              the begining of the stored value.
     *              Example: ;#;#5;#  (normal would be: 5;#)
     *
     * @param {Function} [options.onReady=null]
     *              Triggered after the LookupField has been setup. This is
     *              triggered either after completing the UI setup, or if the
     *              field already had pre-defined values, after retrieving that
     *              data and displaying it.
     *              Function will be given a scope of the original selector
     *              (the field) as well as the following input params:
     *              1) widget container (jQuery)
     *              Example:
     *                  onReady: function(widgetCntr){
     *                      //this=original selector to where the widget was bound
     *                  }
     *
     * @param {Function} [options.onItemAdd=null]
     *              Function that will be called when adding a new item reference
     *              to the list of currently picked item. This method could, if
     *              necessary remove the new item from the UI (ex. due to some
     *              custom validation rule).
     *              The function will be given a scope of the bound area (the
     *              input field) as well as two input parameters:
     *              1) A jQuery object representing the new item
     *              on the UI and
     *              2) An object with the item's information
     *              Example:
     *                  onItemAdd: function($newItemSelection, itemObject, widgetCntr){
     *                      //this=original selector to where the widget was bound
     *                  }
     *
     * @param {Function} [options.onItemRemove=null]
     *              Function that is called when items are removed. Return Boolean
     *              false will cancel the removal of the items.
     *              Function is given the list of items on the UI, an array of
     *              objects that represent the row data structure (as retrieved from
     *              SP) and the Widget container on the page
     *              Example:
     *                  onItemRemove: function($items, itemObjects, $widgetCntr ){
     *                          //this=bound element
     *                      }
     *
     * @param {String} [options.msgNoItems=""]
     *              Message to be displayed when no items are selected. Set this
     *              to null/blank if wanting nothing to be displayed, which will
     *              result in only the input selection field being displayed.
     *
     * @param {Integer} [options.maxResults=50]
     *              Max number of results to be returned as the user types the filter
     *
     * @param {Integer} [options.minLength=2]
     *              The minimum length before the autocomplete search is triggered.
     *
     * @param {Boolean} [options.hideInput=true]
     *              Option used only when allowMultiples is false. It will hide
     *              the input field once a value has been selected. Only way to
     *              get it displayed again is to remove existing selected item.
     *
     * @param {Boolean} [options.hideInput=false]
     *              If true, then an icon will be displayed to the right of the
     *              selection input field that displays a popup displaysing all
     *              values currently in the lookup List.
     *
     *
     * @return {jQuery} Selection
     *
     *
     *
     * Methods:
     *
     * jQuery(ele).SPLookupField("method", <action>, <options>)
     *
     * clear    Clears all items currently reference.
     *          Usage:
     *              $(ele).SPLookupField("method", "clear"); // clears all
     *              $(ele).SPLookupField("method", "clear", 5); // clear ID=5
     *              $(ele).SPLookupField("method", "clear", [5, 123455]); // clear ID=5 and 123455
     *
     *
     * add      Adds a lookup value to the widget. (does not clear existing)
     *          Usage:
     *              $(ele).SPLookupField("method", "add", "45;#test;#234;#test 2")
     *
     *
     */
    $.fn.SPLookupField = function(options) {

        // if the global styles have not yet been inserted into the page, do it now
        if (!Lookup._islookupFieldCssDone) {
            Lookup._islookupFieldCssDone = true;
            $('<style type="text/css">' + "\n\n" +
                    Lookup.styleSheet +
                    "\n\n</style>")
                .prependTo("head");
        }

        // Store the arguments given to this function. Used later if the
        // user is trying to execute a method of this plugin.
        var arg = arguments;

        // Initiate each selection as a Lookup element
        this.each(function(){

            var ele = $(this);

            // TODO: may need to change code below if going to bind to other types of fields (like select)
            // FIXME: when allowing textarea, need to ensure that its definition is textonly (no HTML)

            if (    ( !ele.is("input") && !ele.is("textarea") )
                ||  ele.hasClass("hasLookupSPField")
            ){
                // if the first argument is a string, and this is an input
                // field, then process methods
                if (typeof options === "string" && ele.is("input")) {

                    var o = ele.data("SPWidgetLookupFieldUI").data("SPWidgetLookupFieldOpt");

                    // METHOD
                    if (options.toLowerCase() === 'method') {

                        var cmd     = String(arg[1] || '').toLowerCase();
                        var cmdOpt  = arg[2];

                        // ====> ACTION: clear
                        if (cmd === "clear") {

                            if (!$.isArray(cmdOpt)) {

                                if (cmdOpt) {

                                    cmdOpt = [ cmdOpt ];

                                } else {

                                    cmdOpt = [];

                                }

                            }

                            // If we have no ID, then blank them all out.
                            if (!cmdOpt.length) {

                                Lookup.removeItem(
                                    o,
                                    o._selectedItemsCntr.find("div.spwidgets-item")
                                );

                            // Else, we must have an id defined. Parse that
                            // and remove only those items.
                            } else {

                                (function(){

                                    // find all the ID's in the UI
                                    var $rmItems = $();

                                    $.each(cmdOpt, function(i, id){

                                        $rmItems = $rmItems.add(
                                            o._selectedItemsCntr
                                                .find("div.spwidgets-item-id-" + id)
                                        );

                                    });

                                    // Remove them.
                                     Lookup.removeItem(o, $rmItems);

                                })();

                            }

                        // ====> ACTION: add
                        } else if (cmd === "add") {

                            Lookup.addItem(o, cmdOpt);

                        }

                    }//end: options === method

                }

                // Exit
                return this;

            }

            //-------------------------------------
            // CREATE THE WIDGET ON THE PAGE.
            //-------------------------------------

            // Options for this element
            var o = $.extend(
                    {},
                    $.SPWidgets.defaults.LookupField,
                    options,
                    {
                        _ele: ele.css("display", "none").addClass("hasLookupSPField")
                    }
                );


            /**
             * Displays items selected by the user on the UI and updates
             * the original input element if necessary.
             *
             * @params {Array|Object} items
             *          An object or array of objects with the rows
             *          to be shown as slected. Object contains the row
             *          metadata as retrieved from Sharepoint and used on
             *          the autocomplete widget
             * @params {Boolean} [doNotStoreIds=false]
             *          If true, then the IDs of the items that will be
             *          shown as selected will not be added to the input
             *          field. Good for when initially displaying data
             *          that is defined in the intput field
             *          (ex. when the widget is first bound)
             *
             */
            o.showSelectedItems = function(items, doNotStoreIds) {

                var itemCntr    = o._selectedItemsCntr.css("display", ""),
                    itemList    = [],
                    wasUpdated  = false;

                // If this is the first item, empty container
                if (    !itemCntr.find("div.spwidgets-item").length
                    ||  o.allowMultiples === false
                ) {

                    itemCntr.empty();

                }

                // If input is an array, then use that to iterate over.
                if ( $.isArray(items) ) {

                    itemList = items;

                // Else, the input must not be an array (assume single object)
                // Add it as an item in the defiend array.
                } else {

                    itemList.push(items);

                }

                // Loop through each item to be shown as selected
                $.each(itemList, function(i, item){

                    // If this item is not yet displayed, then add it now
                    if (!itemCntr.find("div.spwidgets-item-id-" + item.ID).length) {

                        // Create the new item UI and append it to the
                        // display area.
                        var thisItemUI =
                                $('<div class="spwidgets-item spwidgets-item-id-' + item.ID +
                                        '" data-spid="' + item.ID + '" style="display:none">' +
                                        $.SPWidgets.fillTemplate(o.template, item) +
                                        '</div>'
                                    )
                                    .appendTo( itemCntr )
                                    .find(".spwidgets-item-remove")
                                        .on("click.SPWidgets", function(ev){

                                            Lookup.removeItem(o,this);

                                        })
                                        .end();

                        // If an onAddItem event was defined, AND the storage
                        // of the ID are is not being bypassed, then then run it now
                        if ($.isFunction(o.onItemAdd) && doNotStoreIds !== true) {

                            o.onItemAdd.call(o._ele, thisItemUI, item, o._cntr);

                        }

                        // If item is still present in the selction list
                        // then continue on to add its ID to the input field
                        // which is used to store it in the DB.
                        // We check  this here because the .onItemAdd() event
                        // could have removed it from the UI
                        if ( itemCntr.find("div.spwidgets-item-id-" + item.ID).length > 0 ) {

                            wasUpdated = true;

                            // Show the new item on the page.
                            thisItemUI.fadeIn("slow").promise().then(function(){

                                $(this).css("display", "");

                            });

                            // Store this item's ID in the input field
                            if (doNotStoreIds !== true) {

                                o.storeItemIDs(item.ID, o.allowMultiples);

                            }

                            // If allowMultiples is false, then check if the input field
                            // should be hidden
                            if (o.allowMultiples === false && o.hideInput === true) {

                                o._lookupInputEleCntr.css("display", "none");

                            }

                        } //end: if() is item still in the UI (after .onItemAdd())

                    } //end: if(): item already displayed?

                });//end: .each() item

                // If readOnly = true, then remove the "delete item"
                // link from the elements
                if (o.readOnly) {

                    o._cntr.find(".spwidgets-item-remove").remove();

                }

                // if an update was made, then trigger the change() event on the
                // original input element.
                if (wasUpdated) {

                    o._ele.trigger("change");

                }

            };//end: o.showSelectedItems()


            /**
             * Stores the ID's of the selected items in the
             * input field that this widget was bound to.
             *
             * @param {Array|String} ids
             * @param {Boolean} [append=false]
             *
             */
            o.storeItemIDs = function(ids, append) {

                // Store item in input field, by appending this new
                // item to the end of the existing data in the input.
                var newItemValue    = $.trim( o._ele.val() ),
                    isPadDone       = false;

                // If ID's not an array, then converted to one and
                // assign its value to the new array.
                if ( !$.isArray(ids) ) {

                    ids = [ ids ];

                }

                // If append is not true, then erase whatever
                // data might be there now.
                if (append !== true) {

                    newItemValue = "";

                }

                // Loop through all element and add them to the string
                // that will be used to update the input field.
                $.each( ids, function( i, thisID ){

                    if (thisID){

                        // If existing input is blank and padDelimeter is
                        // true, then add an extra delimeter to the begening of the
                        // string.
                        if (newItemValue.length < 1 && o.padDelimeter === true && !isPadDone ) {

                            newItemValue   += ";#";
                            isPadDone       = true;

                        }

                        // If data is already in the input field, then add
                        // delimeter to end of the data.
                        if (newItemValue.length > 0) {

                            newItemValue += ";#";

                        }

                        newItemValue += thisID + ";#";

                        // TODO: Support for having the Title also be saved - similar to SP
                        // Does the .Title value need to be escaped

                    }

                });

                // Store the values back on the input element.
                o._ele.val(newItemValue);

            };//end: o.storeItemIDs()

            /**
             * Looks at the input field where this widget was bound to
             * and displays the items (rows) that are currently stored
             * there in the widget.
             *
             * @param {Object} options
             * @param {Boolean} [options.aysnc=true]
             *
             * @return {jQuery.Deferred}
             *      A deferred because based on those values in the input
             *      calls will be made to the server to retrieve their data.
             *      Deferred is resolved with a scope of the intance object
             *      (o) and given two input params: xData, Status.. Note that
             *      these could be null if input was not set
             */
            o.showCurrentInputSelection = function(options) {

                return $.Deferred(function(dfd){

                    var opt     = $.extend({}, {
                                    async: true
                                }, options),
                        items = $.SPWidgets.parseLookupFieldValue(o._ele.val());

                    if (!items.length) {

                        dfd.resolveWith(o, [null, null]);
                        return;

                    }

                    SPAPI.getListItems({
                        operation: "GetListItems",
                        async:      opt.async,
                        listName:   o.list,
                        CAMLQuery:  '<Query><Where>' +
                                $.SPWidgets.getCamlLogical({
                                    type:   'OR',
                                    values: items,
                                    onEachValue: function(n){
                                        var s = "";
                                        if (n.id) {
                                            s = "<Eq><FieldRef Name='ID'/>" +
                                                "<Value Type='Counter'>" +
                                                n.id + "</Value></Eq>";
                                        }
                                        return s;
                                    }
                                }) +
                                '</Where></Query>',
                        CAMLViewFields: "<ViewFields>" +
                                o._selectFields + "</ViewFields>",
                        CAMLRowLimit: 0,
                        completefunc: function(xData, status, arrayOfCurrentItems) {

                            // Add to autocomplete cache
                            o.addToAutocompleteCache(arrayOfCurrentItems);

                            o.showSelectedItems( arrayOfCurrentItems, true );
                            dfd.resolveWith(o, [xData, status]);

                            return;

                        }//end: completefunc()
                    }); //end: getListItems

                }) //end: deferred()
                .promise();

            }; //end: o.showCurrentInputSelection()

            /**
             * Checks the cache object (o._autocompleteCache), which is
             * used to store the objects of data used by the Autocomplete
             * function, for an object matching the ID provided on input.
             *
             * @param {String} itemId
             *
             * @return {null|Object}
             *
             */
            o.getItemObjectFromCache = function(itemId) {

                var itemObj = null;

                $.each(o._autocompleteCache, function(key, rows){

                    $.each(rows, function(i, row){

                        if (row.ID == itemId){

                            itemObj = row;

                            return false;

                        }

                    });

                    if (itemObj !== null) {

                        return false;

                    }

                });

                return itemObj;

            }; //end: o.getItemObjectFromCache()

            /**
             * Add a new row or rows to the autocomplete
             * cache. Cache token will be each row ID.
             */
            o.addToAutocompleteCache = function(rows){

                if (!$.isArray(rows)) {

                    rows = [rows];

                }

                $.each(rows, function(i, row){

                    if (!o._autocompleteCache[row.ID]) {

                        o._autocompleteCache[row.ID] = [];

                    }

                    o._autocompleteCache[row.ID].push( row );

                });

            }; //end: o.addToAutocommpleteCache();


            //---------------------------------------------------
            //              START BUILD THIS INSTANCE
            //---------------------------------------------------

            // Create the UI container and store the options object in the input field
            o._cntr                 = $(Lookup.htmlTemplate)
                                        .find(".spwidgets-lookup-cntr").clone(1);
            // Insert the widget container into the UI
            if (o.uiContainer === null) {

                o._cntr.insertAfter(o._ele);

            } else {

                o._cntr.appendTo($(o.uiContainer));

            }

            // Define references to the different elements of the UI
            o._selectedItemsCntr    = o._cntr.find("div.spwidgets-lookup-selected");
            o._lookupInputEleCntr   = o._cntr.find("div.spwidgets-lookup-input");
            o._lookupInputEle       = o._lookupInputEleCntr
                                        .find("input[name='spwidgetLookupInput']");
            o._ignoreKeywordsRegEx  = (/^(of|and|a|an|to|by|the|or)$/i);

            o._cntr.data("SPWidgetLookupFieldOpt", o);
            o._ele.data("SPWidgetLookupFieldUI", o._cntr);


            // If showSelector is false, remove the option from the UI...
            // FIXME: maybe we realy want to hide it? case the option is changed later?
            if (!o.showSelector){

                o._cntr.find('.spwidget-lookup-selector-showhide,.spwidget-lookup-selector-cntr').remove();

            // Else, bind methods for handling the selector.
            } else {

                o._selectorCntr     = o._cntr.find("div.spwidget-lookup-selector-cntr");
                o._queryInitDone    = false;

                o._cntr.find(".spwidget-lookup-selector-showhide")
                    .on("click", function(ev){

                        if (o._selectorCntr.is(":visible")) {

                            o._selectorCntr.css("display", "none");

                        } else {

                            o._selectorCntr
                                .css("display", "block")
                                .position({
                                    my: "left top",
                                    at: "left bottom",
                                    of: o._lookupInputEle
                                });

                            if (!o._queryInitDone) {

                                o._queryInitDone = true;

                                Lookup.doSelectorDataInit(o);

                            }

                        } //end: if/else(): how/hide

                    });

                o._selectorCntr
                    .find("button[name='close']")
                    .button({
                        text: false,
                        icons: {
                            primary: "ui-icon-circle-close"
                        }
                    })
                    .click(function(){

                        o._selectorCntr.css("display", "none");

                    });

                // If user focuses on the Input field (autocomplete),
                // then hide the selector if visible
                o._lookupInputEle.on("focus", function(ev){

                    if (o._selectorCntr.is(":visible")) {

                        o._selectorCntr.css("display", "none");

                    }

                });

            } //end: else(): ShowSelector is true

            // If an input label was defined, then set it, else, remove input label
            if (o.inputLabel) {

                o._cntr.find("div.spwidgets-lookup-input label")
                    .empty()
                    .append(o.inputLabel);

            } else {

                o._cntr.find("div.spwidgets-lookup-input label").remove();

            }

            // insert placeholder
            if (o.inputPlaceholder) {
                o._lookupInputEleCntr
                    .find("input")
                        .attr("placeholder", o.inputPlaceholder);
            }

            // Hide the ADD input field if we're in readonly mode
            if (o.readOnly === true) {

                o._lookupInputEleCntr.css("display", "none");

                o._cntr.find("div.spwidget-lookup")
                    .addClass("spwidget-lookup-readyonly");

            }

            // Convert the list of fields to CAML
            o._selectFields = "";
            $.each(o.selectFields, function(i, f){

                o._selectFields += "<FieldRef Name='" + f + "'/>";

            });

            // Get the token names from the text template
            o._templateTokens = String(o.template).match(/(\$\{.*?\})/g);

            if (o._templateTokens == null) {
                o._templateTokens = [];
            }

            $.each(o._templateTokens, function(i, thisToken){

                o._templateTokens[i] = thisToken.replace(/[\$\{\}]/g, "");

            });

            // Bind an Autocomplete to the ADD input of the Lookup widget
            // Cache is kept by [searchTerm]: ArrayOfObjects (rows from DB)
            var cache = o._autocompleteCache = {};

            o._cntr.find("div.spwidgets-lookup-input input")
                .autocomplete({
                    minLength:  2,
                    appendTo:   o._cntr,

                    /**
                     * Add format to the pick options and set height
                     * if it was defined on input.
                     */
                    open:       function(ev, ui){

                        $(this).autocomplete("widget")
                            .each(function(){

                                if (o.listHeight > 0) {

                                    $(this).css("height", o.listHeight + "px");

                                }

                                return false;

                            });

                            // TODO: need to create a class to place a border around suggestion.
                            //        then, add to the above: .find("a").addClass("classname here")

                    },

                    /**
                     * Searches for the data to be displayed in the autocomplete choices.
                     */
                    source:     function(request, response){

                        request.term = $.trim(request.term);

                        // If search term is in cache, return it now
                        var termCacheName = String($.trim(request.term)).toUpperCase();
                        if (termCacheName in cache) {
                            response(cache[termCacheName]);
                            return;
                        }
                        cache[termCacheName] = [];

                        var filterItems = [];

                        // If search term contains only digits, then do a search on ID
                        var term = String(request.term);
                        if (    term.match(/\D/) === null
                            &&  term.match(/\d/) !== null) {

                            filterItems.push(
                                "<Eq><FieldRef Name='ID'/>" +
                                "<Value Type='Counter'>" +
                                term + "</Value></Eq>" );


                        // Else, search all Fields defined by the caller for the term
                        } else {

                            var keywords = [request.term];
                            if (!o.exactMatch) {
                                keywords = String(request.term).split(/ /);
                            }
                            // For each search field, build the search using AND logical
                            for (var n=0,m=o.filterFields.length; n<m; n++){
                                var fieldFilters = [];
                                for (var i=0,j=keywords.length; i<j; i++){
                                    if (!o._ignoreKeywordsRegEx.test(keywords[i])) {
                                        fieldFilters.push(
                                            "<Contains><FieldRef Name='" +  o.filterFields[n] + "'/>" +
                                            "<Value Type='Text'>" + keywords[i] + "</Value></Contains>" );
                                    }
                                }
                                filterItems.push($.SPWidgets.getCamlLogical({
                                    values: fieldFilters,
                                    type:   "AND"
                                }));
                            }
                        }

                        // Build the query using OR statements
                        var camlFilter = $.SPWidgets.getCamlLogical({
                                            values: filterItems,
                                            type:   "OR"
                                        });

                        // If caller defined extra REQUIRED criteria, then
                        // build it into the query.
                        if (o.filter) {
                            camlFilter = $.SPWidgets.getCamlLogical({
                                values: [camlFilter, o.filter],
                                type:   "AND"
                            });
                        }

                        // Find the items based on the user's input
                        SPAPI.getListItems({
                            operation:      "GetListItems",
                            listName:       o.list,
                            async:          true,
                            CAMLQuery:      '<Query><Where>' + camlFilter + '</Where>' +
                                            o.filterOrderBy + '</Query>',
                            CAMLRowLimit:   o.maxResults,
                            CAMLViewFields: "<ViewFields>" + o._selectFields + "</ViewFields>",
                            completefunc:   function(xData, status, rows){

                                $.each(rows, function(i, thisDt){

                                    thisDt.value = "";
                                    thisDt.label = $.SPWidgets.fillTemplate(o.listTemplate, thisDt );

                                    // Add to cache
                                    cache[termCacheName].push(thisDt);

                                });

                                // Return response
                                response(cache[termCacheName]);

                            }
                        });
                    },//end:source()
                    /**
                     * Event bound to an autocomplete suggestion.
                     *
                     * @param {jQuery} ev   -   jQuery event.
                     * @param {Object} u    -   An object containing the element generated above
                     *                          by the <source> method that represents the item
                     *                          that was selected.
                     */
                    select: function(ev, u){

                        o.showSelectedItems(u.item);

                    }//end: event: select()

                })//end:autocomplete

                /**
                 * ON enter key, if value is less than the minLength, then
                 * Force a search. We pad the query string with spaces so
                 * that it gets pass the autocomplete options set during setup.
                 */
                .on("keyup.SPWidgets", function(ev){

                    if (ev.which != 13 ) { return; }

                    var v = $(ev.target).val();

                    if (v) {

                        if (String(v).length < o.minLength) {

                            $(ev.target).autocomplete("search", v + "    ");

                        }

                    }

                });

            // If the input field has values, then parse them and display them
            if (o._ele.val()) {

                o.showCurrentInputSelection()
                    .then(function(xData, status){

                        // Call onReady function if one was defined.
                        if ($.isFunction(o.onReady)) {

                            o.onReady.call(o._ele, o._cntr);

                        }

                    });

            // ELSE, input was blank. Trigger onReady if applicable.
            } else {

                if ($.isFunction(o.onReady)) {

                    o.onReady.call(o._ele, o._cntr);

                }

            } // end: if()

            return this;

        });

        return this;

    };//end: $.fn.SPLookupField()


    /**
     * Removes an item or array of item from the selection.
     * The html element is removed from UI and the input
     * element is updated to not contain that ID
     *
     * @memberOf Lookup.lookupField
     *
     * @param {Object} o
     * @param {Object} htmlEle
     *              A jQuery selection of elements to remove.
     *
     * @return {Object} Lookup
     */
    Lookup.removeItem = function(o, htmlEle) {

        var e       = $(htmlEle).closest('div.spwidgets-item'),
            cntr    = o._selectedItemsCntr,
            store   = [];

        // If an onItemRemove param was defined, then trigger it now
        // Use the store[] array to temporarly store the item IDs that
        // will be removed. This is used to provide it to the callback.
        if ($.isFunction(o.onItemRemove)) {

            e.each(function(){

                store.push(
                    o.getItemObjectFromCache( $(this).data("spid") )
                );

            });

            if (o.onItemRemove.call(o._ele, e, store, o._cntr) === false){

                return Lookup;

            }

            store = [];

        }

        // Hide the item the user removed from the UI
        e.fadeOut("fast").promise().then(function(){

            e.remove();

            // If AllowMultiple is false and msgNoItem is false
            // then hide the selected items container
            if (    !o.msgNoItems
                &&  (   o.allowMultiples === false
                    ||  (   o.allowMultiples === true
                        && cntr.find("div.spwidgets-item").length < 1
                        )
                    )
            ) {

                cntr.css("display", "none");

            }

            // If allowMultiples is false, and hideInput is true, then make sure
            // it is visible again
            if ( o.allowMultiples === false && o.hideInput === true ) {

                o._lookupInputEleCntr.css("display", "");

            }

            // If a message was defined for no items selected,
            // then show it now.
            if ( cntr.find("div.spwidgets-item").length < 1 && o.msgNoItems ) {

                cntr.append("<div>" + o.msgNoItems + "</div>");

            }

            // Get a new list of items to store
            cntr.find("div.spwidgets-item").each(function(){

                store.push($(this).data("spid"));

            });

            // Focus on the autocomplete field.
            o._lookupInputEleCntr.find("input").focus();

            // remove the item and trigger a change event
            o.storeItemIDs( store );
            o._ele.change();

        });

        return Lookup;

    };//end:Lookup.removeItem()

    /**
     * Adds items to the Lookup widget. Method is used with the
     * "add" method on this widget.
     * Takes a string of values in format id;#title (title optional)
     * and adds them to the input element and then calls the
     * Inst.showCurrentInputSelection() method to display them.
     *
     * @param {Object} Inst     The instance object for the widget
     * @param {String} strItems The sting of items to add.
     *
     * @return {Object} Inst
     */
    Lookup.addItem = function(Inst, strItems) {

        if (!strItems || typeof strItems !== "string") {

            return Inst;

        }

        var newVal = Inst._ele.val();

        if (newVal === "" && Inst.padDelimeter === true) {

            newVal += ";#";

        }

        if (newVal) {

            newVal += ";#";

        }

        newVal += strItems;

        Inst._ele.val(newVal);
        Inst.showCurrentInputSelection();

        return Inst;

    }; //end: Lookup.addItem()

    /**
     * Initializes the Selector with data from the List.
     *
     * @param {Object} Inst
     *          The widget instance object.
     *
     * @return {Object} Inst
     *
     */
    Lookup.doSelectorDataInit = function(Inst) {

        var opt = {
                $resultsCntr:   Inst._selectorCntr
                                .find("div.spwidget-lookup-selector-item-cntr"),
                nextPageToken:  '',
                isLoading:      false,
                hasMorePages:   true,
                $lastPage:      $(),
                queryXml:       (
                                    Inst.filter
                                    ?   '<Query><Where>' + Inst.filter +
                                        '</Where>' + Inst.filterOrderBy + '</Query>'
                                    :   '<Query>' + Inst.filterOrderBy + '</Query>'
                                )
            };

        // If the global listner is not yet setup, do it now
        if (!Lookup._isLookupbodyEventDone) {

            Lookup._isLookupbodyEventDone = true;
            $("body").on("click", function(ev){

                var $ele            = $(ev.target),
                    $allSelectors   = $("div.spwidget-lookup-selector-cntr:visible"),
                    $clickArea      = null;

                if ($allSelectors.length) {

                    $clickArea = $ele.closest("div.spwidget-lookup-selector-cntr");

                    if (!$clickArea.length && $ele.is(".spwidget-lookup-selector-showhide")) {


                        $clickArea = $ele.parent().find("div.spwidget-lookup-selector-cntr");

                    }

                    $allSelectors.not($clickArea).hide();

                }

            });

        }

        /**
         * Gets the rows from the list and keeps
         * a reference to the next page ID so that
         * on subsquent calls, it will be used.
         *
         * @return {jQuery.Promise}
         *          Promise is resolved with a context of the
         *          page of data that was inserted into the
         *          selector.
         */
        opt.getListRows = function(){

            return $.Deferred(function(dfd){

                // If we're already busy getting results, exit...
                if (opt.isLoading) {

                    dfd.resolveWith($lastPage, [$lastPage]);
                    return;

                }

                opt.isLoading = true;

                // Get the data from the list using the user's filter,
                // maxResult and SelectFields. Then populate the selector
                // with the data found.
                SPAPI.getListItems({
                    operation:      "GetListItems",
                    listName:       Inst.list,
                    async:          true,
                    CAMLQuery:      opt.queryXml,
                    CAMLRowLimit:   Inst.maxResults,
                    CAMLViewFields: "<ViewFields>" + Inst._selectFields +
                                    "</ViewFields>",
                    CAMLQueryOptions:   (function(){

                                if (opt.nextPageToken !== "") {

                                    return '<QueryOptions>' +
                                        "<Paging ListItemCollectionPositionNext='" +
                                        $.SPWidgets.escapeXML(opt.nextPageToken) +
                                        "'/></QueryOptions>";

                                }

                            })(),
                    completefunc:   function(xData, status, rows){

                        var $resp       = $(xData.responseXML),
                            $rsData     = SPAPI.getNodesFromXml({
                                            xDoc: xData.responseXML,
                                            nodeName: "rs:data",
                                            asJQuery: true
                                        }).eq(0),
                            $page       = $("<div/>").insertBefore(opt.$nextPage),
                            rowsHtml    = '';

                        // Store the NextPage Token
                        opt.nextPageToken = $rsData.attr("ListItemCollectionPositionNext") || '';

                        if (opt.nextPageToken === "") {

                            opt.hasMorePages = false;

                        }

                        $.each(rows, function(i, row){

                            // Add row to autocomplete cache
                            Inst.addToAutocompleteCache(row);

                            // Create the same attribute as those that are created for
                            // the Autocomplete widget. Ensure consistency should we
                            // do more with this in the future.
                            row.value = "";
                            row.label = $.SPWidgets.fillTemplate(Inst.listTemplate, row );

                            rowsHtml += '<div class="spwidget-lookup-item" data-spwidgetsindex="' +
                                        i + '">' + row.label + '</div>';

                        });


                        $page
                            .html(rowsHtml)
                            .find("div.spwidget-lookup-item")
                                .each(function(){

                                    var $e = $(this);

                                    $e.hover(
                                        function(){

                                            $e.addClass("ui-state-hover");

                                        },
                                        function(){

                                            $e.removeClass("ui-state-hover");

                                        }
                                    );
                                })
                                .end()
                            .on("click", "div.spwidget-lookup-item", function(ev){

                                var thisRowIndex = $(this).data("spwidgetsindex");

                                Inst.showSelectedItems(rows[thisRowIndex]);

                            });

                        opt.isLoading = false;

                        dfd.resolveWith($page, [$page]);

                        return;

                    } //end: completefunc()
                });

            });

        };

        // Create the "next page" button
        opt.$nextPage = $('<div class="ui-state-highlight spwidget-lookup-selector-next">Next...</div>')
            .appendTo(opt.$resultsCntr.empty())
            .click(function(ev){

                if (!opt.hasMorePages) {

                    return;

                }

                opt.$nextPage.css("display", "none");

                // Get teh list of rows and then:
                // if more pages exist - display the next button
                // if not and no items were displayed, then show message
                opt.getListRows()
                    .then(function($page){

                        if (opt.hasMorePages) {

                            opt.$nextPage.css("display", "");

                        } else if (!$page.children().length) {

                            $page.append("<div class='ui-state-highlight'>No Items Found!</div>");

                        }

                        opt.$resultsCntr.scrollTop($page.position().top);

                    });

            });

        opt.$nextPage.click();

        return Inst;

    }; //end: Lookup.doSelectorDataInit()

    /**
     * @property
     * @memberOf    Lookup.lookupField
     * Stores the Style sheet that is inserted into the page the first
     * time lookupField is called.
     * Value is set at build time.
     *
     */
    Lookup.styleSheet = "/**\n"
+ " * Stylesheet for the Lookup Field widget.\n"
+ " * \n"
+ " */\n"
+ "\n"
+ ".spwidgets-lookup-cntr {\n"
+ "    position: relative;\n"
+ "    display: inline-block;\n"
+ "    zoom: 1; /* IE7 hack */\n"
+ "    *display: inline; /* IE7 hack */\n"
+ "}\n"
+ "\n"
+ "\n"
+ ".spwidgets-lookup-cntr .spwidgets-lookup-selected {\n"
+ "    -moz-appearance: textfield;\n"
+ "    -webkit-appearance: textfield;\n"
+ "    background-color: white;\n"
+ "    background-color: -moz-field;\n"
+ "    border: 1px solid  darkgray;\n"
+ "    box-shadow: 1px 1px 1px 0 lightgray inset;  \n"
+ "    font: -moz-field;\n"
+ "    font: -webkit-small-control;\n"
+ "    margin-top: 5px;\n"
+ "    padding: 2px 5px; \n"
+ "}\n"
+ "\n"
+ ".spwidgets-lookup-cntr  .spwidgets-lookup-selected .spwidgets-item {\n"
+ "    display: inline-block;\n"
+ "    margin-left: .5em;\n"
+ "}\n"
+ ".spwidgets-lookup-cntr .spwidgets-item:first-child {\n"
+ "    margin-left: 0px;\n"
+ "}\n"
+ ".spwidgets-lookup-cntr .spwidgets-item-remove {\n"
+ "    color: red;\n"
+ "    font-size: xx-small;\n"
+ "    vertical-align: super;\n"
+ "    cursor: pointer;\n"
+ "}\n"
+ "\n"
+ ".spwidgets-lookup-cntr .spwidgets-lookup-input {\n"
+ "    margin: .2em 0em;\n"
+ "    position: relative;\n"
+ "}\n"
+ ".spwidgets-lookup-cntr .spwidgets-lookup-input input {\n"
+ "    width: 99%;\n"
+ "}\n"
+ ".spwidgets-lookup-cntr ul.ui-autocomplete {\n"
+ "    overflow: auto;\n"
+ "    z-index: 1;\n"
+ "}\n"
+ "\n"
+ "/* Ready only display */\n"
+ ".spwidgets-lookup-cntr div.spwidget-lookup-readyonly .spwidgets-lookup-selected {\n"
+ "    -moz-appearance: none;\n"
+ "    -webkit-appearance: none;\n"
+ "    background-color: transparent;\n"
+ "    border: none;\n"
+ "    box-shadow: none;\n"
+ "    font: inherit;\n"
+ "}\n"
+ ".spwidgets-lookup-cntr div.spwidget-lookup-readyonly .spwidgets-item-remove {\n"
+ "    display: none;\n"
+ "}\n"
+ "\n"
+ "/** SELECTOR */\n"
+ ".spwidgets-lookup-cntr .spwidget-lookup-selector-showhide {\n"
+ "    background-repeat: no-repeat;\n"
+ "    background-image: url(\"/_layouts/images/bizdatacontentsource.gif\");\n"
+ "    cursor: pointer;\n"
+ "    display: block;\n"
+ "    position: absolute;\n"
+ "    text-indent: -99999px;\n"
+ "    z-index: 5;\n"
+ "    height: 16px;\n"
+ "    width: 16px;\n"
+ "    right: 5px;\n"
+ "    top: .3em;\n"
+ "}\n"
+ ".spwidgets-lookup-cntr div.spwidget-lookup-selector-cntr {\n"
+ "    display: none;\n"
+ "    position: absolute;\n"
+ "    left: 0px;\n"
+ "    z-index: 10;\n"
+ "    padding: .2em;\n"
+ "    width: 98%;\n"
+ "    font-size: .8em;\n"
+ "}\n"
+ ".spwidgets-lookup-cntr div.spwidget-lookup-selector-cntr > .ui-state-default {\n"
+ "    padding: .2em;\n"
+ "    text-align: right;\n"
+ "}\n"
+ "\n"
+ ".spwidgets-lookup-cntr div.spwidget-lookup-selector-item-cntr {\n"
+ "    height: 15em;\n"
+ "    overflow: auto;\n"
+ "    padding: .2em;\n"
+ "    font-size: 1em;\n"
+ "}\n"
+ ".spwidgets-lookup-cntr div.spwidget-lookup-selector-item-cntr .ui-state-highlight {\n"
+ "    padding: .5em;\n"
+ "    margin: 1em .2em;\n"
+ "    text-align: center;\n"
+ "    font-size: 1.1em;\n"
+ "    font-weight: bold;\n"
+ "}\n"
+ ".spwidgets-lookup-cntr div.spwidget-lookup-selector-item-cntr .spwidget-lookup-selector-next {\n"
+ "    cursor: pointer;\n"
+ "}\n"
+ ".spwidgets-lookup-cntr div.spwidget-lookup-selector-item-cntr .spwidget-lookup-item {\n"
+ "    padding: .2em .5em;\n"
+ "    margin: .2em;\n"
+ "    cursor: pointer;\n"
+ "    font-weight: normal;\n"
+ "}\n"
+ "\n";
//_HAS_LOOKUP_CSS_TEMPLATE_;


    /**
     * @property
     * @memberOf    Lookup.lookupField
     * Stores the HTML template for each lookup field.
     * Value is set at build time.
     *
     */
    Lookup.htmlTemplate = "<div>\n"
+ "    <div class=\"spwidgets-lookup-cntr\">\n"
+ "        <div class=\"spwidget-lookup\">\n"
+ "            <div class=\"spwidgets-lookup-selected\" style=\"display:none;\">\n"
+ "            </div>\n"
+ "            <div class=\"spwidgets-lookup-input\">\n"
+ "                <label>Add</label>\n"
+ "                <input type=\"text\" name=\"spwidgetLookupInput\" value=\"\" />\n"
+ "                <span class=\"spwidget-lookup-selector-showhide\" title=\"Browse\">Browse</span>\n"
+ "                <div class=\"spwidget-lookup-selector-cntr ui-widget-content\">\n"
+ "                    <div class=\"ui-state-default\">\n"
+ "                        <button type=\"button\" name=\"close\" title=\"Close\">Close</button>\n"
+ "                    </div>\n"
+ "                    <div class=\"spwidget-lookup-selector-item-cntr\"></div>\n"
+ "                </div>\n"
+ "            </div>\n"
+ "        </div>\n"
+ "    </div>\n"
+ "</div>\n"
+ "\n";
//_HAS_LOOKUP_HTML_TEMPLATE_


})(jQuery);
/**
 * @fileOverview jquery.SPControlPickUser.js
 * jQuery plugin that attaches to an input field and provide a people
 * picker widget for interaction by the user. This Plugin is dependent
 * on jQuery UI's Autocomplete.
 *
 *
 * @version 20141003022505NUMBER_
 * @author  Paul Tavares, www.purtuga.com
 * @see     TODO: site url
 *
 * @requires jQuery.js {@link http://jquery.com}
 * @requires jQuery-ui.js {@link http://jqueryui.com}
 *
 * Build Date October 03, 2014 - 02:25 PM
 *
 */
(function($){

    /*jslint nomen: true, plusplus: true */
    /*global SPWidgets */

    var SPAPI   = $.SPWidgets.SPAPI;

    /**
     * Namespace for pickSPUser specific methods.
     * @name        pickSPUser
     * @class       Namespace for pickSPUser plugin
     * @memberOf    jQuery.pt
     */
    $.pt.pickSPUser = {
        _isPickSPUserCssDone: false
    };

    // Store defaults in SPWidgets object.
    $.SPWidgets.defaults.peoplePicker = {
        allowMultiples:     true,
        maxSearchResults:   50,
        webURL:             null,
        type:               'User',
        onPickUser:         null,
        onCreate:           null,
        onRemoveUser:       null,
        inputPlaceholder:   "Type and Pick",
        appendTo:           null,
        minLength:          3,
        resolvePrincipals:  true,
        meKeyword:          "[me]",
        meKeywordLabel:     "Current User",
        filterSuggestions:  null
    };

    /**
     * Given an input field, this method will display an interface that
     * allows the users to select one or more users from SharePoint and
     * stores the selected user information into the intput field in the
     * format expected when making an update via webservices.
     *
     * The input field will be hidden in its current position and a UI
     * will displayed instead. As the user picks or removes users, the
     * input field will be updated at the same time, thus it will always
     * be ready to be submitted as part of an update to the server.
     *
     * @alias $.pickSPUser()
     * @alias jQuery.pickSPUser()
     * @alias $().pickSPUser()
     * @alias jQuery().pickSPUser()
     *
     *
     * @param {Object} options
     *                      Object with the options. See below.
     *
     * @param {Boolean} [options.allowMultiples=true]
     *                      Determine whether multiple users can be picked.
     *
     * @param {String} [options.webURL=currentSiteUrl]
     *                  The URL of the site
     *
     * @param {String} [options.type='User']
     *                  The type of search to conduct. Default is User. Others
     *                  include: None, DistributionList, SecurityGroup,
     *                  SharePointGroup, All
     *
     * @param {Interger} [options.maxSearchResults=50]
     *                      The max number of results to be returned from the
     *                      server.
     *
     * @param {jQuery}  [options.appendTo=null]
     *                      The container where to where the autocomplete suggestion
     *                      should be appended.
     *
     * @param {Number} [options.minLength=3]
     *                      The minimum number of characters the user must type before
     *                      suggestions are retrieved. Given directly to jQuery UI's
     *                      Autocomplete widget.
     * @param {Function} [options.onPickUser=null]
     *                      Function that is called when user makes a selection.
     *                      Function will have a context (this keyword) of the
     *                      input field to which this plugin is called on, and
     *                      will be given one input param; an object containing
     *                      information about the selected user.
     *
     * @param {Function} [options.onCreate=null]
     *                      Function that is called after the widget has been
     *                      initiated on an input element.
     *                      Function will have a context (this keyword) of the
     *                      input field to which this plugin is called on, which
     *                      will also be provided as the first argument to the
     *                      function.
     *
     * @param {Function} [options.onRemoveUser=null]
     *                      Function called when removing a user from the selected
     *                      list. Returning false (boolean) will cancel the removal
     *                      of the person from the selected list.
     *                      Function will have a context (this keyword) of the
     *                      input field to which this plugin is called on, and is
     *                      given 3 input params: $input, $personUI, personObj
     *
     * @param {String} [options.inputPlaceholder="Type and Pick"]
     *                      The text to appear in the HTML5 placeholder attribute
     *                      of the input field.
     * @param {String} [options.resolvePrincipals=true]
     *                      If set to true, any user that is suggested but not yet
     *                      part of the site collection user info list (their id
     *                      is -1) will be automatically added.
     *
     * @param {Function} [options.filterSuggestions=null]
     *                      A callback function to be used in filtering the
     *                      suggestions values retrieved from the server. This
     *                      callback, if defined, must return an array of objects.
     *
     *
     * @return {jQuery} selection
     *
     *
     *
     * METHODS:
     *
     * $().pickSPUser("method", "clear")
     *      Clears the currently selected users.
     *
     * $().pickSPUser("method", "destroy")
     *      Destroys the widget.
     *
     * $().pickSPUser("method", "add", "person in id;#name format")
     *      adds a person
     *
     * $().pickSPUser("method", "remove", "person id or displayed name")
     *      removes a person
     *
     * $().pickSPUser("method", "getSelected")
     *      Returns array of people selecte.
     *
     *
     * EVENTS:
     *
     * spwidget:peoplePickerCreate
     *          Triggered when the widget is initiated. Event will received
     *          a scope of the input element or whatever object it bubled to
     *          as well as the following input parameter:
     *          1. jQuery Event object
     *          2. Input element that widget was attached to (as jQuery object)
     *
     * spwidget:peoplePickerAdd
     *          Triggered when an item is added to the input field. Event will
     *          receive a scope of the input element or whatever object it
     *          bubbled to, as well as the following input parametes:
     *          1. jQuery Event Object
     *          2. Input element (as jQuery object)
     *          3. Object with information on the user that was added.
     *
     * spwidget:peoplePickerRemove
     *          Triggered when an item is removed from the selected list. Event will
     *          receive a scope of the input element or whatever object it
     *          bubbled to, as well as the following input parametes:
     *          1. jQuery Event Object
     *          2. Input element (as jQuery object)
     *          3. Object with information on the user that was added.
     *
     *
     */
    $.fn.pickSPUser = function(options) {

        // if the global styles have not yet been inserted into the page, do it now
        if (!$.pt.pickSPUser._isPickSPUserCssDone) {
            $.pt.pickSPUser._isPickSPUserCssDone = true;
            $('<style type="text/css">' + "\n\n" +
                    $.pt.pickSPUser.styleSheet +
                    "\n\n</style>")
                .prependTo("head");
        }

        // Store the arguments given to this function. Used later if the
        // user is trying to execute a method of this plugin.
        var arg     = arguments,
            $this   = this;

        // If input is a string, then it must be an action (method).
        // Process only the first element in the selection.
        if (typeof options === "string") {

            // TODO: should methods support actions on all items in selection?

            return (function(ele){

                if (ele.is("input") && ele.hasClass("hasPickSPUser")){

                    return $.pt.pickSPUser.handleAction.apply(ele, arg);

                }

                return $this;

            })( $this.eq(0) );

        }

        // Define options with globals
        // var options = $.extend({}, options2);

        // Initiate each selection as a pickSPUser element
        this.each(function(){

            var ele = $(this);

            // Options for this element
            var o   = $.extend({},
                    $.SPWidgets.defaults.peoplePicker,
                    options,
                    {
                        eleUserInput: ele.css("display", "none").addClass("hasPickSPUser")
                    });

            // If no webURL, define it now
            if (!o.webURL) {

                o.webURL = SPAPI.getSiteUrl();
            }

            // insure that maxsearchResults is an interger
            o.maxSearchResults = parseInt(o.maxSearchResults) || 50;

            // Create pick user container and insert it after the input element
            var cntr        = $($.pt.pickSPUser.htmlTemplate)
                                .find(".pt-pickSPUser").clone(1).insertAfter(ele);

            o.eleSelected   = cntr.find("div.pt-pickSPUser-selected")
                                .empty()
                                .on("click", ".tt-delete-icon", function(){

                                    $.pt.pickSPUser.removeUser(this);

                                });

            o.elePickInput  = cntr.find("div.pt-pickSPUser-input");

            /**
             * Checks if a user is already included in the list of selected people
             * in the People Picker widget.
             *
             * @param {String} id
             * @param {String} [name]
             *
             * @return {Boolean}
             */
            o.isUserAlreadySelected = function(id, name) {

                var selector = "div[data-pickspuserid='" + id + "']";

                if (name) {

                    selector += "[data-pickspusername='" + name + "']";

                }

                return (o.eleSelected.find(selector).length > 0);

            };

            /**
             * Adds people to the selected list.
             *
             * @param {String} peopleString
             * @param {Boolean} noEvents
             *
             */
            o.addPeopleToList = function(peopleString, noEvents) {

                var curUsers    = new String(peopleString).split(';#'),
                    total       = curUsers.length,
                    i,id,user, $ui;

                // TODO: use $.SPWidgets.parseLookupFieldValue instead of local logic to parse values

                for (i=0; i<total; i++){

                    id = curUsers[i];
                    i++;
                    user    = curUsers[i];

                    if (id.toLowerCase() === "<userid/>") {

                        user = o.meKeywordLabel;

                    }

                    $ui     = $.pt.pickSPUser
                                .getUserHtmlElement(o, id, user)
                                .appendTo( o.eleSelected );

                    // Get this user's info. and store it in the input element
                    (function($thisUserUI, thisUserName, thisUserId){

                        var searchString = thisUserName;

                        if (id.toLowerCase() === "<userid/>") {

                            searchString = o.meKeyword;

                        }

                        o.getSearchResults(searchString)
                            .done(function(rows, xData, status){

                                var personName = String(thisUserName).toLowerCase();

                                $.each(rows, function(i,v){

                                    // TODO: Should we instead try to match on the ID?
                                    // SP is not consistent how the name is displayed on people pickers.
                                    // trying to get the Person record.

                                    var thisName = String(v.displayName).toLowerCase();

                                    if (thisName === personName) {

                                        $thisUserUI.data("pickspuser_object", v);

                                        return false;

                                    }

                                });

                                // TODO: should something be done if we're unable to find user?

                            });

                    })($ui, user, id);

                }

                $.pt.addHoverEffect(
                    o.eleSelected.find("div.pt-pickSPUser-person-cntr") );

                // if we don't allow multiple, then hide the input area
                if (o.allowMultiples === false) {

                    o.elePickInput.css("display", "none");

                }

                $.pt.pickSPUser.storeListOfUsers(o.eleSelected, noEvents);

            }; //end: o.addPeopleToList()

            /**
             * Searches SP for the value provided on input
             *
             * @param {String} searchString
             *
             * @return {jQuery.Promise}
             *
             */
            o.getSearchResults = function(searchString) {

                return $.Deferred(function(dfd){

                    SPAPI.searchPrincipals({
                        searchText:     searchString,
                        maxResults:     o.maxSearchResults,
                        principalType:  o.type,
                        async:          true,
                        webURL:         o.webURL,
                        completefunc:   function(xData, status){

                            var resp = $(xData.responseXML),
                                rows = [];

                            // If searchString is part of the keyword [me],
                            // then add <UserID>;#current user to the list
                            // of suggestions
                            if (String(o.meKeyword).indexOf(searchString.toLowerCase()) > -1) {

                                rows.push({
                                    displayName:    o.meKeywordLabel,
                                    accountId:      '<UserID/>',
                                    accountName:    o.meKeywordLabel,
                                    accountType:    'User',
                                    // needed attributes for autocomplete
                                    value:          o.meKeywordLabel,
                                    label:          o.meKeywordLabel
                                });

                            }

                            resp.find("PrincipalInfo").each(function(){

                                var thisEle     = $(this),
                                    thisUser    = {
                                        displayName:    thisEle.find("DisplayName").text(),
                                        accountId:      thisEle.find("UserInfoID").text(),
                                        accountName:    thisEle.find("AccountName").text(),
                                        accountType:    thisEle.find("PrincipalType").text(),
                                        // needed attributes for autocomplete
                                        value:          thisEle.find("DisplayName").text(),
                                        label:          ''
                                    };

                                // TODO: in the future, need to find a way to show type icon on the suggestions
                                // if (thisUser.accountType === "User") {
//
                                    // thisUser.label = "<img src='/_layouts/images/CheckNames.gif' /> ";
//
                                // } else {
//
                                    // thisUser.label = "<img src='/_layouts/images/ALLUSR.GIF' /> ";
//
                                // }

                                thisUser.label += thisUser.displayName;


                                rows.push(thisUser);

                            });

                            // If a suggestion filter was defined, call it now
                            if (o.filterSuggestions) {


                                rows = o.filterSuggestions(rows);

                            }

                            dfd.resolveWith(xData, [rows, xData, status]);

                        }
                    });

                })
                .promise();

            }; //end: o.getSearchResults()

            // If multiple user are allowed to be picked, then add style to
            // selected input area
            if (o.allowMultiples === true) {

                o.eleSelected.addClass("pt-pickSPUser-selected-multiple");

            }

            // Variable that store all search results
            var cache = {};

            // Add the AutoComplete functionality to the input field
            o.elePickInput.find("input[name='pickSPUserInputField']")
                .attr("placeholder", o.inputPlaceholder)
                .autocomplete({
                    minLength:  o.minLength,
                    appendTo:   o.appendTo || o.elePickInput,
                    source:     function(request, response){
                        // If search term is in cache, return it now
                        if (request.term in cache) {
                            response(cache[request.term]);
                            return;
                        }

                        cache[request.term] = [];

                        // Search SP
                        o.getSearchResults(request.term)
                            .then(function(rows, xData, status){

                                cache[request.term].push
                                    .apply(
                                        cache[request.term],
                                        rows
                                   );

                                response(cache[request.term]);

                            });

                    },//end:source()
                    /**
                     * Event bound to an autocomplete suggestion.
                     *
                     * @param {jQuery} ev   -   jQuery event.
                     * @param {Object} u    -   An object containing the element generated above
                     *                          by the <source> method that represents the person
                     *                          that was selected.
                     */
                    select: function(ev, u){
                        // If we store only 1 user, then clear out the current values
                        if (o.allowMultiples === false) {

                            o.eleSelected.empty();

                        // Check if already displayed.
                        } else if (
                            o.isUserAlreadySelected(
                                u.item.accountId,
                                u.item.displayName
                            )
                        ) {

                            setTimeout(function(){ev.target.value = "";}, 50);
                            return;

                        }

                        /**
                         * Add the user to the list of selected user
                         */
                        var addToSelectionList = function() {

                            var $newPersonUI = $.pt.pickSPUser.getUserHtmlElement(
                                        o, u.item.accountId, u.item.displayName
                                    )
                                    .appendTo( o.eleSelected );

                            // Store a copy of the user object on the UI
                            $newPersonUI.data("pickspuser_object", u.item);

                            $.pt.pickSPUser.storeListOfUsers(cntr);

                            $.pt.addHoverEffect(
                                cntr.find("div.pt-pickSPUser-person-cntr") );

                            // clear out the autocomplete box
                            setTimeout(function(){ev.target.value = "";}, 50);

                            if (o.allowMultiples === false) {
                                o.elePickInput.hide();
                            }

                            // if a callback was defined, call it now
                            if ($.isFunction(o.onPickUser)) {
                                o.onPickUser.call(o.eleUserInput, $.extend({},u.item));
                            }

                            // Triggere event
                            ele.trigger(
                                $.Event("spwidget:peoplePickerAdd"),
                                [ o.eleUserInput, $.extend({},u.item) ]
                            );

                        };

                        // If the user id is NOT -1 (is resolved) or resolvePrincipals
                        // is false, then add user to list now.
                        if (u.item.accountId !== "-1" || !o.resolvePrincipals) {

                            addToSelectionList();

                        // Else, let's resolve the user before we add them.
                        } else {

                            SPAPI.resolvePrincipals({
                                principalKeys: u.item.accountName
                            })
                            .then(function(xmlDoc, status){

                                // TODO: handle error conditions? (low risk of ocuring)

                                u.item.accountId = $(xmlDoc)
                                    .find("AccountName:contains('" + u.item.accountName + "')")
                                        .parent()
                                        .find("UserInfoID")
                                        .text();

                                addToSelectionList();

                            });

                        }

                    }
                });//end:autocomplete

            // Store the options for this call on the container and include a pointer
            // in the input field to this element
            cntr.data("pickSPUserContainerOpt", o);
            ele.data("pickSPUserContainer", cntr);

            // If the current input field has a value defined, then parse it
            // and display the currently defined values
            if (ele.val()) {

                o.addPeopleToList(ele.val(), true);

            }

            // call onCreate if defined
            if ($.isFunction(o.onCreate)) {

                o.onCreate.call(ele, ele);

            }

            // Trigger create event on this instance
            ele.trigger(
                $.Event("spwidget:peoplePickerCreate"),
                [o.eleUserInput]
            );

            return this;
        });

        return this;

    };// $.fn.pickSPUser()

    /**
     * Builds the html element that surrounds a user for display on the page.
     *
     * @param {Object} opt     -   The options object given to <jQuery.fn.pickSPUser()>
     * @param {String} id      -   The User's Sharepoint UID
     * @param {String} name    -   The User's name.
     *
     * @return {jQuery} Html element
     *
     */
    $.pt.pickSPUser.getUserHtmlElement = function(opt, id, name){

        var ele = $($.pt.pickSPUser.htmlTemplate)
                    .find(".pt-pickSPUser-person").clone(1);
        ele.attr("data-pickSPUserID", id);
        ele.find("span.pt-person-name")
                .append(name)
                .end()
            .attr("data-pickSPUserNAME", name);
        return ele;

    };// $.pt.pickSPUser.getUserHtmlElement()


    /**
     * Method is bound to the X (remove) button that appears when the one
     * hovers over the names curerntly displayed. Removes the user from
     * the UI and updates the input field to reflect what is currently
     * displayed.
     *
     * @param {Object} ele -   The HTML element from where this method was
     *                         called. Used to find both the div.pt-pickSPUser
     *                         overall parent element as well as the specific
     *                         .pt-pickSPUser-person element for the user that
     *                         was clicked on.
     *
     * @return {undefined}
     *
     */
    $.pt.pickSPUser.removeUser = function(ele){

        var cntr        = $(ele).closest("div.pt-pickSPUser"),
            o           = cntr.data("pickSPUserContainerOpt"),
            $personUI   = $(ele).closest("div.pt-pickSPUser-person"),
            personObj   = $personUI.data("pickspuser_object"),
            doRemove    = true;

        // If an onRemoveUser is defined, then call method
        // and capture response
        if ($.isFunction(o.onRemoveUser)) {

            o.onRemoveUser.call(
                o.ele,
                o.ele,
                $personUI,
                personObj );

        }

        if (doRemove === false) {

            return;

        }

        // remove user from the view
        $personUI.fadeOut('fast', function(){
            $(this).remove();
            $.pt.pickSPUser.storeListOfUsers(cntr);
        });

        // if AllowMultiple is false, then make the picker input visible
        if (o.allowMultiples === false) {
            o.elePickInput.show("fast", function(){
                o.elePickInput.find("input").focus();
            });
        }

        // trigger event
        o.eleUserInput.trigger(
            $.Event("spwidget:peoplePickerRemove"),
            [ o.eleUserInput, personObj ]
        );

        return;
    };// $.pt.pickSPUser.removeUser()


    /**
     * Method will look at the container that holds the currently selected
     * users and will populate the initial input field given to
     * <jQuery.fn.pickSPUser()> with a sting representing those users.
     *
     *
     * @param {Object} ele -   The HTML element from where this method was
     *                         called. Used to find both the div.pt-pickSPUser
     *                         overall parent element as well as the specific
     *                         .pt-pickSPUser-person element for the user that
     *                         was clicked on.
     *
     * @return {undefined}
     *
     */
    $.pt.pickSPUser.storeListOfUsers = function(ele, noEvents){

        var cntr    = $(ele).closest("div.pt-pickSPUser"),
            opt     = cntr.data("pickSPUserContainerOpt"),
            newVal  = "",
            // isDone: keep track of the user already selected,
            // so we don't add them twice to the input field.
            isDone  = {};

        cntr.find("div.pt-pickSPUser-selected div.pt-pickSPUser-person")
            .each(function(){

                var
                $this           = $(this),
                thisUserString  = $this.attr("data-pickSPUserID") + ";#" +
                                    $(this).attr("data-pickSPUserNAME");

                if (isDone[thisUserString]) {

                    return;

                };

                isDone[thisUserString] = true;

                if (newVal) {

                    newVal += ";#";

                }

                newVal += thisUserString;

            });

        opt.eleUserInput.val(newVal);

        if (!noEvents) {

            opt.eleUserInput.change();

        }

        return;
    };// $.pt.pickSPUser.storeListOfUsers()

    /**
     * Handles method actions given to $().pickSPUser()
     *
     * @param {String} type
     * @param {String} action
     * @param {Object} options
     *
     * @return {this}
     *
     */
    $.pt.pickSPUser.handleAction = function(type, action, options) {

        type    = String(type).toLowerCase();
        action  = String(action).toLowerCase();
        var o   = $(this)
                        .data("pickSPUserContainer")
                        .data("pickSPUserContainerOpt"),
            ret     = this;

        if (type === "method") {

            switch (action) {

                case "clear":

                    o.eleUserInput.val("");
                    o.eleSelected.empty();

                    if (o.allowMultiples === false) {

                        o.eleSelected.css("display", "none");
                        o.elePickInput.show();

                    }

                    break;

                case "destroy":

                    if ( $(this).hasClass('hasPickSPUser')) {

                        $(this).removeClass('hasPickSPUser')
                                .next('.pt-pickSPUser').remove()
                                .show()
                                .trigger('change');

                    }

                    break;

                case "add":

                    o.addPeopleToList(options);

                    break;

                case "remove":

                    if (options) {

                        var rmEle = o.eleSelected
                                .find(
                                    "div[data-pickspuserid='" +
                                    options + "']" );

                        if (!rmEle.length) {

                            rmEle = o.eleSelected
                                .find(
                                    "div[data-pickspusername='" +
                                    options + "']" );

                        }

                        if (rmEle.length) {

                            $.pt.pickSPUser.removeUser(rmEle);

                        }

                    }

                    break;

                case "getselected":

                    ret = $.SPWidgets.parseLookupFieldValue(o.eleUserInput.val());

                    break;

            }

        }//end:type===method

        return ret;

    };// $.pt.pickSPUser.handleAction()


    /**
     * @property
     * Stores the Style sheet that is inserted into the page the first
     * time pickSPUser is called.
     * Value is set at build time.
     *
     */
    $.pt.pickSPUser.styleSheet = "/**\n"
+ " * Styles for the Pick User Widget\n"
+ " */\n"
+ ".pt-pickSPUser .pt-pickSPUser-selected .pt-pickSPUser-person {\n"
+ "    float: left;\n"
+ "    margin-left: .2em;\n"
+ "}\n"
+ ".pt-pickSPUser .pt-pickSPUser-hint {\n"
+ "    font-size: .9em;\n"
+ "}\n"
+ "\n"
+ ".pt-pickSPUser div.pt-pickSPUser-input input.ui-autocomplete {\n"
+ "    width: 99%;\n"
+ "}\n"
+ ".pt-pickSPUser div.pt-pickSPUser-input ul.ui-autocomplete {\n"
+ "    z-index: 1;\n"
+ "}\n"
+ "\n"
+ ".pt-pickSPUser .pt-pickSPUser-person-cntr {\n"
+ "    margin: .2em 0em;\n"
+ "    padding: .2em;\n"
+ "    position: relative;\n"
+ "}\n"
+ "\n"
+ ".pt-pickSPUser .pt-pickSPUser-person-cntr .pt-person-name {\n"
+ "    padding-right: 2em;\n"
+ "}\n"
+ "\n"
+ "/* Item action container (delete button) */\n"
+ ".pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions {\n"
+ "    position: absolute;\n"
+ "    right: 1px;\n"
+ "    top: 1px;\n"
+ "    padding: .2em;\n"
+ "    display: none;\n"
+ "}\n"
+ ".pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions .pt-pickSPUser-person-action-links,\n"
+ ".pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions .pt-pickSPUser-person-action-links .tt-confirm-delete {\n"
+ "    float:right;\n"
+ "}\n"
+ "\n"
+ "/* Make the action visible if we hover or we are trying to confirm a deletion */\n"
+ ".pt-pickSPUser .pt-pickSPUser-person-cntr.ui-state-hover .pt-pickSPUser-person-actions,\n"
+ ".pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions.tt-confirm,\n"
+ ".pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions a {\n"
+ "    display:block;\n"
+ "    float: right;\n"
+ "}\n"
+ "\n"
+ "/* autocomplete busy image */\n"
+ ".ui-autocomplete-loading {\n"
+ "    background: white url('/_layouts/images/loading.gif') right center no-repeat;\n"
+ "}\n"
+ "\n"
+ "\n";
//_HAS_PICKSPUSER_CSS_TEMPLATE_


    /**
     * @property
     * Stores the HTML template for each people picker.
     * Value is set at build time.
     *
     */
    $.pt.pickSPUser.htmlTemplate = "<!--\n"
+ "    Html Templates for the PickSPUser plugin.\n"
+ "    \n"
+ "    |\n"
+ "    |   $Author$\n"
+ "    | $Revision$\n"
+ "    |     $Date$\n"
+ "    |       $Id$\n"
+ "    |\n"
+ "-->\n"
+ "<div>\n"
+ "    <div class=\"pt-pickSPUser\">\n"
+ "        <div class=\"pt-pickSPUser-selected\">\n"
+ "            None Selected!\n"
+ "        </div>\n"
+ "        <div style=\"clear:both\"></div>\n"
+ "        <div class=\"pt-pickSPUser-input\" \n"
+ "                title=\"Type user name above to view search results.\">\n"
+ "            <input name=\"pickSPUserInputField\" value=\"\" type=\"text\"/>\n"
+ "        </div>\n"
+ "    </div>\n"
+ "    \n"
+ "    <div class=\"pt-pickSPUser-person\">\n"
+ "        <div class=\"pt-pickSPUser-person-cntr ui-state-default ui-corner-all\">\n"
+ "            <span class=\"pt-person-name\"></span>\n"
+ "            <div class=\"pt-pickSPUser-person-actions\">\n"
+ "                <div class=\"tt-record-item-action-links\">\n"
+ "                    <a class=\"tt-delete-icon\" href=\"javascript:\" onclick=\"jQuery.pt.pickSPUser.removeUser(this);\">\n"
+ "                        <img style=\"border: medium none; margin-right: 2px;\" alt=\"Delete\" src=\"/_layouts/images/delitem.gif\">\n"
+ "                    </a>\n"
+ "                    <div style=\"clear:both;\"></div>\n"
+ "                </div>\n"
+ "                <div style=\"clear:both;\"></div>\n"
+ "            </div>\n"
+ "        </div>\n"
+ "    </div>\n"
+ "</div>\n";
//_HAS_PICKSPUSER_HTML_TEMPLATE_

    /**
     * Given a list of elements, this will add a hover affect to
     * those elements by toggling some classes from jQuery UI
     *
     * @memberof jQuery.pt
     *
     * @param {jQuery|String} ele   A jQuery selector or object containing
     *                              the list of elements to receive the hover
     *                              effect.
     * @return {jQuery}
     *
     * @example
     *
     *      $(".tt-hover-animate").addHoverEffect();
     *      $(".container a").addHoverEffect();
     *
     */
    $.pt.addHoverEffect = function(ele){
        return $(ele).each(function(){
                if ($(this).hasClass("addHoverEffectDone")) {
                    return;
                } else {
                    $(this).addClass("addHoverEffectDone");
                };
                var e = this;
                $(e).mouseenter(function(){$(e).toggleClass("ui-state-hover");});
                $(e).mouseleave(function(){$(e).toggleClass("ui-state-hover");});
            });
    };// $.pt.addHoverEffect()

})(jQuery);

/**
 * @fileOverview jquery.SPControlUpload.js
 * jQuery plugin that interacts with Sharepoint built in Upload.aspx through an iframe
 * to provide to the user an upload UI without leaving actually leaving the page, thus
 * simulating an ajax file upload interaction.
 * Currently used to upload files to a Document Library with out having the user go
 * through the many SP pages and without having to leave the user's current page.
 *
 *
 * @version 20141003022505NUMBER_
 * @author  Paul Tavares, www.purtuga.com
 *
 * @requires jQuery.js {@link http://jquery.com}
 * @requires jQuery-ui.js {@link http://jqueryui.com}
 *
 * Build Date October 03, 2014 - 02:25 PM
 *
 */
;(function($){

    // Commented out strict mode. Causing errors.  "use strict";
    /*jslint nomen: true, plusplus: true */
    /*global SPWidgets, unescapeProperly, escapeProperly */

    /**
     *  jQuery definition
     *  @see    http://jquery.com/
     *  @name   jQuery
     *  @class  jQuery Library
     */

    /**
     * jQuery 'fn' definition to anchor all public plugin methods.
     * @see         http://jquery.com/
     * @name        fn
     * @class       jQuery Library public method anchor
     * @memberOf    jQuery
     */

    /**
     * @name        Upload
     * @class       Upload widget
     */
    var Upload = {},
        SPAPI   = $.SPWidgets.SPAPI;

    /**
     * @property {Boolean} Tracks if the CSS injection into the page has been done.
     */
    Upload.isSPUploadCssDone = false;

    /**
     * Defaults
     */
    $.SPWidgets.defaults.upload = {
        listName:               '',
        folderPath:             '',
        uploadDonePage:         '',
        onPageChange:           null,
        onUploadDone:           null,
        uploadUrlOpt:           '',
        overwrite:              false,
        uploadPage:             '',
        overlayClass:           '',
        overlayBgColor:         'white',
        overlayMessage:         '<div>Working on it</div>',
        selectFileMessage:      "Click here to select file...",
        uploadDoneMessage:      "Upload Successful!",
        fileNameErrorMessage:   "A file name cannot contain any of the following characters: \\ / : * ? \" &lt; &gt; | # { } % ~ &amp;",
        noFileErrorMessage:     "No file selected!",
        checkInFormHeight:      '25em',
        webURL:                 null, // set later
        debug:                  false,
        filenameInputSelector: "input[id$='onetidIOFile']" // 3/14/2014: Undocumented for now
    };


    /**
     * jQuery plugin that populates the elements selected with a UI for
     * uploading a file to a Sharepoint location (library) without having
     * to leave the current page that the user is currently on.
     *
     * @param {Object} options  Object with the options below.
     *
     * @param {String} options.listName REQUIRED. The name or UID of the list.
     *                  Example 'Shared Documents' or '{67587-89284-93884-78827-78823}'
     *
     * @param {String} [options.folderPath="/"]
     *                  Optional. The full path to the folder inside of the List where
     *                  the document should be uploaded to. Default is to place the
     *                  document at the root of the Document Library
     *                  Examples 'http://yourdomain.com/sites/site1/Shared Documents' or
     *                  '/sites/site1/Shared Documents'
     *
     * @param {String} [options.uploadDonePage="/_layouts/viewlsts.aspx"]
     *                  Optional. The url of the page that should be loaded after the
     *                  file has been uploaded successful. Value MUTST start with http.
     *                  Default is 'http://yourdomain.com/sites/site1/_layouts/viewlsts.aspx'
     *
     * @param {Funtion} [options.onPageChange=null]
     *                  Function that is called each time the form in the
     *                  iFrame is changed. The function 'this' keyword points to the
     *                  element that was used when this method was called. The function
     *                  is given one param; the event object created by this method.
     *                  ({@link SPControlLoadEvent})
     *                  Return value of this function will control flow of plugin.
     *                  Returning true (boolean), will allow processing to continue
     *                  at different stages (see the event object below), while
     *                  returnin false (boolean) will stop flow from continuing. The
     *                  check is strict; meaning that it has to be a boolean false in
     *                  order for flow to stop.
     *
     * @param {Function} [options.onUploadDone=null]
     *                  Triggered when file is successfully uploaded - or when it reaches
     *                  the uploadDonePage. This is normally triggered after a file is
     *                  checkedIn (if library requires it to be checked in).
     *                  Function will have a scope of the element used on input and
     *                  be given 1 parameter:  An object with the upload file metadata.
     *
     * @param {String} [options.uploadUrlOpt=""]
     *                  String of data that should be appended to the upload page url,
     *                  following this '?".
     *                  NOTE; The option "MultipleUpload=1" is NOT SUPPORTED.
     *                  This string value is assumed to have already been properly
     *                  escaped for use in the url.
     *
     * @param {Boolean} [options.overwrite=False]
     *                  True or False indicating if document being uploaded should
     *                  overwrite any existing one. Default is False (don't overwrite)
     *
     * @param {String} [options.uploadPage=""]
     *                  The relative URL from the WebSite root to the upload page.
     *                  Default is "/_layouts/Upload.aspx". This value is appended to
     *                  to the website full url.
     *
     * @param {String} [options.overlayClass=""]
     *                  A css class to be associated with the overlay that is displayed
     *                  over the iframe while loading of the page is going on.
     *
     * @param {String} [options.overlayBgColor="white"]
     *                  A color to be used for the overlay area that is displayed over
     *                  the iframe wile loading of the page is going on. Default is
     *                  white. Set this to null if wanting only to use a class.
     *
     * @param {String|HTMLElement|jQuery} [options.overlayMessage="Loading..."]
     *                  String or object/element to be displayed inside of the overlay
     *                  when it is displayed. Default is "Loading..."
     *
     * @param {String|HTMLElement|jQuery} [options.selectFileMessage="Click here to select file..."]
     *              The message displayed for user to select file
     *
     * @param {String} [options.checkInFormHeight='20em']
     *              The height of the form when a checkin is required.
     *
     * @param {String} [options.webURL=Current site]
     *              The URL of the web site/sub site.
     *
     * @param {String} [options.debug=false]
     *              Turns debug on for this widget.
     *
     * @return {jQuery}
     *
     * @example
     *
     *  $("&lt;di&gt;&lt;/div&gt;").appendTo("body")
     *      .SPControlUpload({
     *          listName: "Shared Documents"
     *      });
     *
     *
     */
    $.fn.SPControlUpload = function (options) {

        // if the global styles have not yet been inserted into the page, do it now
        if (!Upload.isSPUploadCssDone) {

            Upload.isSPUploadCssDone = true;

            $('<style type="text/css">' + "\n\n" +
                Upload.StyleSheet + "\n\n</style>"
            )
            .prependTo("head");

            if (!$.SPWidgets.defaults.upload.webURL) {

                $.SPWidgets.defaults.upload.webURL = SPAPI.getSiteUrl();

            }

        }

        return $(this).each(function(){

            var opt = $.extend({}, $.SPWidgets.defaults.upload, options),
                overlayCss;
            /**
             * Define the log method for this instance.
             */
            opt.log = ( opt.debug ? Upload.log : function(){} );

            /**
             * Shows or hides the Busy loading animation.
             *
             * @param {Boolean} hide
             *      if True, then loading busy animation will be hidden.
             *
             * @return {jQuery.Promise}
             */
            opt.showHideBusy = function(hide) {

                return $.Deferred(function(dfd){

                    if (hide) {

                        opt.$busyOverlay.fadeOut("fast").promise().then(function(){

                            dfd.resolve();

                        });

                    } else {

                        opt.$busyOverlay.fadeIn("slow").promise().then(function(){

                            dfd.resolve();

                        });

                    }

                })
                .promise();

            }; //end: showHideBusy()

            /**
             * Shows or hides the full Upload form. Used when the document has
             * been upload and perhaps there is a CheckIn page to go through.
             *
             * @param {Boolean} hide
             *
             * @return {Object} opt
             *
             */
            opt.showHideFullForm = function(hide) {

                // HIde full form
                if (hide) {

                    opt.$content.removeClass("spwidget-show-full-form");

                    opt.$iframeCntr
                        .css({
                            overflow:   "",
                            height:     ""
                        });


                // SHOW full form
                } else {

                    opt.$content.addClass("spwidget-show-full-form");

                    opt.$iframeCntr
                        .css({
                            overflow:   "auto",
                            height:     "auto" // (opt.$iframe.outerHeight() + 5) + "px"
                        });

                }

                return opt;

            }; //end: opt.showHideFullForm

            /**
             * Shows or hides the Upload Success message.
             *
             * @param {Boolean} [hide=false]
             *
             * @return {Object} opt
             *
             */
            opt.showHideSuccess = function(hide){

                // HIDE
                if (hide) {

                    opt.$successCntr
                        .stop()
                        .fadeOut()
                        .promise(function(){

                            opt.$successCntr.css("display", "none");

                        });

                // DEFAULT: SHOW
                } else {

                    opt.$successCntr
                        .stop()
                        .show()
                        .promise(function(){

                            opt.$successCntr.css("display", "block");

                        });

                }

                return opt;

            }; //end: opt.showHideSuccess()

            /**
             * Shows an error on the widget.
             *
             * @param {Object} showErrorOptions
             *
             * @param {String} showErrorOptions.message
             * @param {Boolean} [showErrorOptions.autoHide=true]
             *
             * @return {Object} opt
             *
             */
            opt.showError = function(showErrorOptions){

                var thisOpt = $.extend({}, {
                                    message:    '',
                                    autoHide:   true
                                },
                                showErrorOptions);

                opt.$errorCntrMsg.html(thisOpt.message);
                opt.$errorCntr
                    .stop()
                    .css("display", "block");

                if (thisOpt.autoHide) {

                    opt.$errorCntr.animate(
                        { opacity: 1 },
                        5000,
                        function(){

                            opt.clearError();

                        }
                    );

                }

                return opt;

            }; //end: opt.showError()

            /**
             * Clears any error currently displayed on the widget.
             *
             * @return {Object} opt
             *
             */
            opt.clearError = function() {

                opt.$errorCntr.css("display", "none");

                return opt;

            }; //end: opt.clearError

            /**
             * Resets the Upload widget after the upload.
             *
             * @return {Object} opt
             */
            opt.resetWidget = function() {

                opt.ev = {
                    state:          1,
                    action:         "uploading",
                    hideOverlay:    true,
                    pageUrl:        "",
                    page:           null, // a jquery object
                    isUploadDone:   false,
                    file:           {}
                };

                opt.$iframe.attr("src", opt.uploadPage);

                return opt;

            }; //end: opt.resetWidget()

            /**
             * Returns the last uploaded file for the user.
             *
             * @return {Object} z:row object
             *
             */
            opt.getUploadedFileRow = function() {

                var lastFile = {};

                SPAPI.getListItems({
                    async:          false,
                    webURL:         opt.webURL,
                    listName:       opt.listName,
                    CAMLQuery:      "<Query><Where>" +
                            "<Eq><FieldRef Name='Author' LookupId='TRUE'/>" +
                            "<Value Type='Integer'><UserID/></Value></Eq>" +
                            "</Where><OrderBy><FieldRef Name='Modified' Ascending='FALSE'/>" +
                            "</OrderBy></Query>",
                    CAMLViewFields: "<ViewFields>" +
                            "<FieldRef Name='ID'/>" +
                            "<FieldRef Name='EncodedAbsUrl'/>" +
                            "<FieldRef Name='FileLeafRef' />" +
                            "<FieldRef Name='Author' />" +
                            "<FieldRef Name='Editor' />" +
                            "<FieldRef Name='Created' />" +
                            "<FieldRef Name='Modified' />" +
                        "</ViewFields>",
                    CAMLRowLimit:       1,
                    CAMLQueryOptions:   "<QueryOptions><ViewAttributes Scope='Recursive' /></QueryOptions>",
                    completefunc:       function(xData, status, rows) {

                        if (rows.length) {

                            lastFile = rows[0];

                        }

                    }
                });

                return lastFile;

            }; //end: opt.getUploadedFileRow()


            /**
             * Given a URL, this method will check if it is one of the
             * known upload pages of SharePoint. True = yes it is.
             * False = no it is not.
             *
             * @param {String} url
             *      URL is assumed to be full url, including http.
             *
             * @return {Boolean}
             */
            opt.isUploadPage = function(url) {

                // Uses parser apprach shown here:
                // https://gist.github.com/jlong/2428561

                var answer  = false,
                    parser  = document.createElement('a'),
                    parser2 = null;

                parser.href = String(url).toLowerCase();

                // If user defined their own Upload page, then
                // parse that URL and use it in matching.
                // Else, just see if the input url has Upload.aspx
                // or UploadEx.aspx.
                if (opt.userUploadPage) {

                    parser2         = document.createElement('a');
                    parser2.href    = String(opt.userUploadPage).toLowerCase();

                    if (parser.pathname === parser2.pathname) {

                        answer = true;

                    }

                } else {

                    // 2007 = Upload.aspx
                    // 2010, 2013 = UploadEx.aspx
                    answer = /upload(ex)?\.aspx$/.test(parser.pathname);

                }

                return answer;

            }; //end: opt.isUploadPage()

            /** ---------------------------------------------------------- **/
            /** -------------[        SETUP WIDGET      ]----------------- **/
            /** ---------------------------------------------------------- **/

            // If list Name is not the UID, then get it now
            if (opt.listName && opt.listName.indexOf("{") !== 0) {

                opt.listName = $.pt.getListUID(opt.listName);

            }
            // If list name is not defined - error
            if (!opt.listName) {

                $(this).html('<div class="ui-state-error">Input parameter [listName] not valid!</div>');
                return this;

            }

            // If user did not define the Upload page on input, then set it depending
            // on SP version. Else, if the user defined the upload page, ensure it
            // is a full url starting at http...
            opt.spVersion       = $.SPWidgets.getSPVersion(true);
            opt.userUploadPage  = opt.uploadPage;
            opt.uploadPage      = String(opt.uploadPage);

            if (!opt.uploadPage) {

                switch(opt.spVersion) {

                    case "2013":

                        opt.uploadPage = opt.webURL + '/_layouts/15/UploadEx.aspx';

                        break;

                    case "2010":

                        opt.uploadPage = opt.webURL + "/_layouts/UploadEx.aspx";

                        break;

                    // Default: SP 2007
                    default:

                        opt.uploadPage = opt.webURL + '/_layouts/Upload.aspx';

                        break;

                }

            // If user defined a upload page using relative URL from root of site, then
            // prepend the site URL.
            } else if (opt.uploadPage.toLowerCase().indexOf("http") === -1) {

                var s = "/";

                if (opt.uploadPage.indexOf('/') == 0) {

                    s = "";

                }

                opt.uploadPage = opt.webURL + s + opt.uploadPage;

            }


            opt.uploadDonePage = String(opt.uploadDonePage);

            // Set the uploadDonePage url
            if (!opt.uploadDonePage) {

                opt.uploadDonePage = opt.webURL + "/_layouts/images/STS_ListItem_43216.gif";

            }

            // _iframeLoadId is used to determine if the onIframeChange() function
            // should be run or not... It ensure that when a page is redirected, that
            // only the last function to be spawn (via setTimeout) is run.
            opt._iframeLoadId = 1;

            // Create additional non-overridable options
            opt._uploadUrlParams    = "?List=" +
                                      $.pt.getEscapedUrl(opt.listName) + "&RootFolder=" +
                                      $.pt.getEscapedUrl(opt.folderPath) + "&Source=" +
                                      $.pt.getEscapedUrl(opt.uploadDonePage) +
                                      "&" + (new Date()).getTime() + "=1&" + opt.uploadUrlOpt;
            opt.uploadPage          = opt.uploadPage + opt._uploadUrlParams;
            opt._lastError          = "";
            opt._reloadCount        = 0;

            /**
             * @name SPControlLoadEvent
             * Event object that is given as input to the function defined in the
             * $.fn.SPControlUpload-onPageChange parameter.
             *
             * @event
             * @memberof $.fn.SPControlUpload
             *
             * @param {SPControlLoadEvent} ev
             *
             * @param {Integer} ev.state
             *          A value from 1 through 3 that represents the state of
             *          the file upload form. The flow is:
             *
             *              [1]                 [2]                 [3]
             *          [ready for input] -> [pre-upload] -> [file uploaded]
             *
             *          1 = is set when the form is initially loaded and the
             *          File html element is ready for the user to attach the file.
             *          File has not yet been uploaded.
             *          2 = is set when the form is ready to be submitted to the server
             *          along with the file set by the user. File has not yet been
             *          uploaded.
             *          3 = is set when the user has successfully uploaded the file to
             *          the server and no errors were encountered.
             *          File has been uploaded and now sits on the server.
             *
             * @param {String} ev.action
             *          The event action as it pertains to this plugin.
             *          preLoad        =    action is taking place before the page is sent
             *          to the server. State of '2' are handled by Upload.onUpdate
             *          postLoad    =    action is taking place after page has completed
             *          loading, but is not yet "visible" to the user.
             *
             * @param {Boolean} ev.hideOverlay
             *          Used when action=postLoad. Can be set by
             *          a callback function to false, so that the busy overlay remains
             *          displayed and is not automaticaly hidden. Default value is "true".
             *
             * @param {String} ev.pageUrl
             *          The url of the page currently loaded in the iframe.
             *
             * @param {jQuery} ev.page
             *          An object representing the page loaded inside the
             *          iFrame. This can be used to further manipulate the iframe's
             *          page content.
             *
             * @param {Boolean} ev.isUploadDone
             *          Indicates if the upload process is done. Basically,
             *          this means that the processess has reached the page defined
             *          in the updatePageDone parameter.
             *
             */
            opt.ev            = {
                state:          1,
                action:         "uploading",
                hideOverlay:    true,
                pageUrl:        "",
                page:           null, // a jquery object
                isUploadDone:   false,
                file:           {} // populated when file is uploaded
            };

            // Create the UI on the element given used by the SPCOntrolUpload plugin
            opt.$ele    = $(this);
            overlayCss  = {};

            if (opt.overlayBgColor) {

                overlayCss["background-color"] = opt.overlayBgColor;

            }

            // Create the UI on the page
            opt.$cntr = $(
                    $(Upload.HtmlUI).filter("div.SPControlUploadUI").clone()
                )
                .appendTo(opt.$ele.addClass("hasSPControlUploadUI").empty())
                .data("SPControlUploadOptions", opt);

            opt.$buttonCntr = opt.$cntr.find("div.buttonPane")
                    .click(function(ev){

                        Upload.onUpload(this);

                    });

            // Store references
            opt.$content        = opt.$cntr.find("div.mainContainer");
            opt.$iframeCntr     = opt.$cntr.find("div.iFrameWindow");
            opt.$iframe         = opt.$iframeCntr.children('iframe');
            opt.$busyOverlay    = opt.$cntr.find("div.loadingOverlay");
            opt.$busyOverlayMsg = opt.$busyOverlay.find("div.loadingOverlayMsg");
            opt.$successCntr    = opt.$cntr.find("div.spwidget-success-cntr");
            opt.$errorCntr      = opt.$cntr.find("div.spwidget-error-cntr");
            opt.$errorCntrMsg   = opt.$errorCntr.find(".spwidget-msg");
            opt.reInvalidChr    = new RegExp("[\\\/\:\*\?\"\<\>\|\#\{\}\%\~\&]");

            // Setup success message closure listner and include user's message
            opt.$successCntr
                .on("click", ".spwidget-close", function(ev){

                    opt.showHideSuccess(true);

                })
                .find(".spwidget-msg")
                    .html(opt.uploadDoneMessage);

            // Setup error message closure
            opt.$errorCntr.on("click", ".spwidget-close", function(ev){

                opt.clearError();

            });

            // Setup the overlay
            opt.$busyOverlay
                .addClass(opt.overlayClass)
                .css(overlayCss);

            opt.$busyOverlayMsg.html(opt.overlayMessage);

            // Show the loading animation and load the UI
            opt.showHideBusy();

            opt.$cntr.find("iframe")
                .css("height", opt.checkInFormHeight)
                .load(function(ev){

                    Upload.onIframeChange(opt.$ele.find(".SPControlUploadUI"));

                })
                .attr("src", opt.uploadPage)
                .end();

            return this;

        });//each()

    };// $.fn.SPControlUpload

    /**
     * FUNCTION: Upload.onUpload()
     *
     *  Submits the upload form that is loaded in the iframe window.
     *  Also calls any callback function defined by the user.
     *
     * PARAMS:
     *
     *  @param {Object} ele -   Element from within the
     *                          .SPControlUploadUI class html container
     *
     * RETURN:
     *
     *  @return {undefined} Nothing.
     *
     */
    Upload.onUpload = function(ele){

        var e       = $(ele).closest(".SPControlUploadUI"),
            page    = e.find("iframe").contents(),
            msgs    = page.find("input[type='file']").closest("tr").siblings().find("span"),
            opt     = e.data("SPControlUploadOptions"),
            ev      = opt.ev;

        opt.log("Upload.onUpload(" + opt._iframeLoadId + "): Start....");

        // Insure all messages are initially hidden (these might have been
        // visible from any prior call to upload the document where it failed.)
        msgs.css("display", "none");

        // If no file was entered, then there is nothing to upload.
        if (!page.find("input[type='file']").val()) {

            opt.showError({message: opt.noFileErrorMessage});
            return;

        }

        // If file contains invalid charactors, then error
        if (opt.reInvalidChr.test(page.find("div.SPControlUploadModUIFileSelected").text())) {

            opt.showError({message: opt.fileNameErrorMessage});
            return;

        }

        // Set the event info
        // TODO: Look into building the event with $.Event("ev name here")
        ev.state    = 2;
        ev.action   = "preLoad";

        // if a user function was defined, then call it now and give it the event
        // object defined above.
        // If fucntion returns a boolean false, then we exit here and never submit
        // the form.
        if (opt.onPageChange) {

            if (opt.onPageChange.call(opt.$ele, ev) === false){

                return false;

            }

        }


        opt.showHideFullForm(true);

        // Hide the upload button, and Submit the form after showing the busy animation
        opt.showHideBusy().then(function(){

            opt.log("Upload.onUpload(" + opt._iframeLoadId + "): Clicking the OK button on upload form.");

            page.find("input[type='button'][id$='btnOK']").click();

            // ev.action = "postLoad";

            // If error message are displayed (after we click upload button),
            // then just return control back to the user.
            if (msgs.is(":visible")) {

                opt.log("Upload.onUpload(" + opt._iframeLoadId + "): Error message reported! \n" + msgs.text());

                e.find(".loadingOverlay")
                        .css("display", "none")
                        .end();

                return false;

            }

        });

    };//* Upload.onUpload()

    /**
     * Returns true of false indicating if the given Selection has the
     * Sharepoint busy animation image/element.
     *
     * @param {jQuery} $doc
     *
     * @return {Boolean}
     */
    Upload.isSPBusyAnimation = function($doc) {

        if ($doc.find("#GearPage").length) {

            return true;

        }

        if ($doc.find("#ms-loading-box").length) {

            return true;

        }

        return false;

    }; /* Upload.isSPBusyAnimation() */

    /**
     * FUNTION: Upload.onIframeChange()
     *
     *  Called when ever the iframe is "load"ed. Function is bound to
     *  the iframe html element's _load event so that it is called each
     *  time the content of the iframe (the page) is reloaded.
     *
     * PARAMS:
     *
     *  @param {jQuery} ele -   jQuery object representing the .SPControlUploadUI
     *                          element.
     *
     * RETURN:
     *
     *  @return {undefined} nothing.
     *
     */
    Upload.onIframeChange = function(ele){

        var e       = $(ele).closest(".SPControlUploadUI"),
            opt     = e.data("SPControlUploadOptions"),
            id      = 0,
            page    = $(e.find("iframe").contents());

        if (opt.debug) {

            try {

                opt.log("Upload.onIframeChange(): ENTERING... Document readyState: " + page[0].readyState +
                " IFRAME URL: " + page[0].location.href);

            } catch(err){}

        }

        if (Upload.isSPBusyAnimation(page)) {

            opt.log("Upload.onIframeChange(): EXITING... Gear page displyed.");
            return;

        }

        // If the upload event state is 2, then {Upload.onUpload} has already
        // taken care of the form and user call back... There is nothing to do
        // here and form is arleady being submitted... Set the ev. to
        // postLoad and Exit.
        if (opt.ev.state === 2 && opt.ev.action === "preLoad" && page[0].spcontrolupload_init_done === true) {

            opt.log("Upload.onIframeChange(" + opt._iframeLoadId +
                "): Exiting! ev.action=[" + opt.ev.action + "] and ev.state=[" +
                opt.ev.state+ "] - Nothing to do. Action handled by onUpload(). Setting action to postLoad"
            );

            opt.ev.action = "postLoad";

            // FIXME: needed to comment this out for SP2007???
            return;

        }

        opt._iframeLoadId++;
        id = opt._iframeLoadId;

        opt.log("Upload.onIframeChange(" + id + "): State=[" + opt.ev.state + "] Action=[" + opt.ev.action + "]");

        // Because just about every browser differs on how the load() event
        // is triggered, we do all our work in a function that is triggered
        // 500 millisends from now. By then, the page (regardless of browser)
        // should be in a state that is useful.
        setTimeout(
            function(){

                // if this invocation is not the last iframe refresh ID,
                // then exit... there is another fucntion queued up...
                if (id !== opt._iframeLoadId) {

                    opt.log("Upload.onIframeChange(" + id + "): not latest invokation! Existing.");

                    return;

                }

                var ev      = opt.ev,
                    form    = page.find("form").eq(0);

                // Re-Set the page variale here (in timeout... Case the page changed and prior point is no good)
                page    = $(e.find("iframe").contents());

                opt.log("Upload.onIframeChange(" + id + "): STARTING... Executing setTimeout(). URL:" + page[0].location.href);

                // If page was already processed, then exit.
                if (page.spcontrolupload_init_done === true) {

                    opt.log("Upload.onIframeChange(" + id + "): EXITING!!! Page was already processed!");
                    return;

                }

                page.spcontrolupload_init_done = true;

                ev.pageUrl  = page[0].location.href;
                ev.page     = page;

                // Focus at the top of the form
                opt.$iframeCntr.scrollTop(0);
                page.scrollTop(0);

                // If the URL of the page in the iFrame is the same as the
                // upload page then this is either the
                // initial load of the page or an error has occured...
                // Hide the page and show only the upload form element.
                if (opt.isUploadPage(ev.pageUrl)) {

                    opt.log("Upload.onIframeChange(" + id + "): URL is the upload page!");

                    page.find("body").css({
                        overflow: "hidden"
                    });

                    form
                        .children(":visible")
                            .hide()
                            .end()
                        .append(
                            $(Upload.HtmlUI).filter("div#SPControlUploadModUI").clone() )
                        .find("div.SPControlUploadModUIFileSelected")
                            .html(opt.selectFileMessage);

                    // Is the page displaying an error page without the upload interface?
                    // Capture error message and reload the page.
                    // SP2010 Seems to behave differntly and land display errors a little
                    // differently... so we try the <title> tag adn then the form action value.
                    if (    new RegExp(/error/i).test($.trim(page.find(".ms-pagetitle").text()))
                        ||  new RegExp(/error/i).test($.trim(page.find("title").text()))
                        ||  new RegExp(/error\.aspx/i).test($.trim(page.find("form").attr("action")))
                    ) {

                        opt.log("Upload.onIframeChange(" + id + "): page displaying an error... Storing it and reloading upload form.");

                        opt._lastError = page.find("[id$='LabelMessage']").text();

                        // Lets avoid looping... Dont if it possible, but just in case.
                        if (opt._reloadCount > 1) {
                            alert("Error encountered during upload which is causing program to loop. Last upload error was: " + opt._lastError);
                            e.find(".loadingOverlay").fadeOut();
                            return;
                        }

                        opt._reloadCount += 1;
                        e.find("iframe").attr("src", opt.uploadPage);

                        return;

                    }/* if: error page or upload UI? */

                    // SP2010 Code
                    // If this is the new SP2010 "Processing..." page, then
                    // the just exit... there is nothing for us to do yet...
                    if (    Upload.isSPBusyAnimation(page)
                        &&  !page.find("input[type='file']").length
                    ) {

                        opt.log("Upload.onIframeChange(" + id +
                            "): SP processing page (GearPage)... Exiting and waiting for next page..."
                        );

                        return;

                    }

                    page.find("input[type='file']").closest("table")
                            .appendTo(page.find("#SPControlUploadModUI"))
                            .removeClass("ms-authoringcontrols");

                    // setup upload input field on the iframe page, including
                    // setting up the change, focus and click event to update
                    // the input div that shows the file name selected to the
                    // user.
                    var $fileInput = page.find("#SPControlUploadModUI")
                        .find("input[type='file']")
                            .closest('tr')
                                .siblings()
                                    .css("display", "none")
                                    .end()
                                .end()
                                .siblings("tr .ms-error")
                                    .css("display", "")
                                    .end()
                            .on("change focus click", function(ev){

                                    var $this       = $(this),
                                        filePath    = $this.val(),
                                        fileExt     = '',
                                        icon        = '/_layouts/images/urn-content-classes-smartfolder16.gif';

                                    if (filePath) {

                                        try {

                                            fileExt = filePath.substr(filePath.lastIndexOf(".") + 1);

                                        } catch(e) {

                                            fileExt = 'GEN';

                                        }

                                        icon = "/_layouts/images/IC" +
                                                fileExt.toUpperCase() + ".GIF";

                                        // Get only the file name
                                        filePath =  (filePath.replace(/\\/g, '/').split('/').pop())
                                                    || filePath;

                                    } else {

                                        filePath = opt.selectFileMessage;

                                    }

                                    page.find("#SPControlUploadModUI > div")
                                        .html(filePath)
                                        .css("background-image",
                                            "url('" + icon + "')");


                            }) //end: .on()
                            .css({
                                cursor:         "pointer",
                                height:         "100px",
                                position:       "absolute",
                                left:           "0px",
                                top:            "0px",
                                filter:         "alpha(opacity=1)",
                                opacity:        "0.01",
                                outline:        "none",
                                "-moz-opacity": "0.01",
                                "font-size":    "100px",
                                'z-index':      "5"
                            });


                    // Setup the mouseover event so that the input file field
                    // follows the mouse around while user hovers over
                    // the iframe.
                    form.on("mousemove", function(ev){

                        $fileInput
                            .css({
                                left:   (ev.pageX - ($fileInput.width() - 50)),
                                top:    (ev.pageY - 30)
                            })
                            .blur();

                    });


                    // If there were any errors found during a previous call, then
                    // display them now
                    if (opt._lastError) {

                        opt.showError({message: opt._lastError});
                        opt._lastError = "";

                    }

                    opt._reloadCount = 0;

                    // Set the override checkbox
                    if (opt.overwrite) {

                        page.find("input[type='checkbox'][name$='OverwriteSingle']")
                            .prop("checked", "checked");

                    } else {

                        page.find("input[type='checkbox'][name$='OverwriteSingle']")
                            .prop("checked", "");

                    }

                    // Set proper event values for user's callback
                    ev.state        = 1;
                    ev.action       = "postLoad";
                    ev.hideOverlay  = true;


                //------------------------------------------------------------------------
                //------------------------------------------------------------------------
                // Else, we must be passed the upload page...
                // set the state to 3 (passed upload) and bind a function to the
                // iframe document's form element (which in turn calls the user defined
                // onPageChange event prior to sending the form on.
                } else {

                    opt.log(
                        "Upload.onIframeChange(" + opt._iframeLoadId +
                        "): File uploaded to server! Need [" + opt.uploadDonePage + "] to be done."
                    );

                    ev.state            = 3;
                    ev.action           = "postLoad";
                    ev.hideOverlay      = true;
                    ev.file             = opt.getUploadedFileRow();

                    // If the current page is the 'uploadDonePage', then set
                    // flag in the event, set flag to not hide the overlay
                    // and insert message indicating upload is done.
                    if (Upload.isSameUrlPage(ev.pageUrl, opt.uploadDonePage)) {

                        opt.log("Upload.onIframeChange(" + opt._iframeLoadId +
                            "): Upload widget process DONE!");

                        ev.isUploadDone = true;
                        ev.hideOverlay  = false;

                        // Show the busy indicator and success message.
                        opt.showHideBusy();
                        opt.showHideSuccess();

                    // Else, page is not the uploadDonePage... manipulate the form's
                    // onsubmit event.
                    } else {

                        opt.log("Upload.onIframeChange(" + opt._iframeLoadId +
                            "): Post Upload Form being displayed! Hooking into form.onsubmit!");

                        if (form.length) {

                            var formOnSubmit    = form.prop("onsubmit"),
                                $nameField      = form.find(opt.filenameInputSelector).eq(0);

                            // Hide the Form content if we found the File name input field,
                            // and move that input field to the root of the form.
                            if ($nameField.length) {

                                form.children(":visible")
                                    .css("display", "none")
                                    .addClass("ptWasVisible");

                                $nameField.closest("div[id^='WebPart']")
                                    .appendTo(form)
                                    // 8/30/2013: ensure the UI is visible.
                                    // Just in case it was at root of form
                                    .css("display", "")
                                    .removeClass("ptWasVisible");

                            }

                            // SP seems to have a good hold of the Form, because
                            // we are unable o bind an event via $. Thus:
                            // The form's onsubmit has to be overriden with our
                            // own function... The original function was captured
                            // above, thus it will triggered... but we now control
                            // when we trigger it.
                            // FIXME: this does not seem to do anything (at least in FF)
                            form[0].onsubmit = function(){

                                opt.log("Upload.onIframeChange(" + id + "): iframe form.onsubmit triggered!");

                                // Show the overlay without animation.
                                opt.showHideBusy();

                                var allowFormToContinue = true;

                                // if the user defined a function, then run it now and
                                // exit if the resposne is false (stop submition)
                                if ($.isFunction(opt.onPageChange)) {
                                    allowFormToContinue = opt.onPageChange.call(
                                                opt.$ele,
                                                $.extend({}, ev, {state: 3, action: "preLoad"}));
                                }

                                if (allowFormToContinue === false) {

                                    opt.showHideBusy(true);
                                    return allowFormToContinue;

                                }

                                // if SP had a onSubmit defined, then execute it now and
                                // exit if the resposne is false (stop submition)
                                if ($.isFunction(formOnSubmit)) {

                                    allowFormToContinue = formOnSubmit();

                                }

                                if (allowFormToContinue === false) {

                                    opt.showHideBusy(true);
                                    return allowFormToContinue;

                                }

                                // hide the form before continuing
                                opt.showHideFullForm(true);

                                // Return true, allowing the form to be submitted.
                                return allowFormToContinue;

                            };

                        } //end: if() - do we have a form?

                    } //end: if(): onUpdateDonePage? or not?

                    // Bind a function to the iframe WINDOW object for when it is
                    // unloaded.. At this point, nothing can be done to prevent
                    // the page from being submitted, but we can still execute
                    // the caller's function.
                    $(e.find("iframe")[0].contentWindow).unload(function(evv){

                        opt.log("Upload.onIframeChange(" + opt._iframeLoadId +
                            "): iframe.unload() triggered!");

                        // Make the busy panel visible without animation
                        // opt.$buttonCntr.css("display", "");
                        opt.showHideBusy();
                        opt.showHideFullForm(true);

                        if ($.isFunction(opt.onPageChange)) {

                            return opt.onPageChange.call(
                                    opt.$ele,
                                    $.extend({}, ev, {state: 3, action: "preLoad"}) );

                        }

                    });

                }//end:if: is uploadPage? or past the file uploaded?

                opt.log("Upload.onIframeChange(" + opt._iframeLoadId +
                    "): iframe page setup done!");

                // Call user event function
                if (opt.onPageChange) {

                    opt.onPageChange.call(opt.$ele, ev);

                }

                // Hide our overlay area
                if (ev.action.toLowerCase() !== "postload" || ev.hideOverlay === true) {

                    opt.showHideBusy(true);

                    if (ev.isUploadDone === false && ev.state === 3) {

                        opt.showHideFullForm();

                    }

                }

                // If Upload is DONE, then reset form
                if (ev.isUploadDone) {

                    // Reset upload form
                    opt.resetWidget();

                    // Wait 4 seconds then hide success message
                    opt.$successCntr.animate(
                        { opacity: 1 },
                        3000,
                        function(){

                            opt.showHideSuccess(true);

                        }
                    );

                    if ($.isFunction(opt.onUploadDone)) {

                        opt.onUploadDone.call(opt.$ele, ev.file);

                    }

                }

                return;

            },
            500);//end:setTimeout()

    };// Upload.onIframeChange

    /**
     * Determines whether two URLs are the same page. URLs could be the same page, but
     * have difference url params. This function will look only at the page (eveything
     * up to the "?") and will then compare them. It will also work if the server portion
     * of a URL is not provided.
     *
     * @param {String} u1   First URL
     * @param {String} u2   Second URL
     *
     * @return {Boolean}
     *
     * @memberOf jQuery.pt
     *
     */
    Upload.isSameUrlPage = function(u1, u2) {

        if (!u1 || !u2) { return false; }

        var normalize   = function(urlString){

                            var parser = document.createElement('a');
                            parser.href = urlString;

                            return unescape(parser.pathname);

                        },
            url1        = String( normalize(u1) ).toLowerCase(),
            url2        = String( normalize(u2) ).toLowerCase();

        return (url1 === url2);

    };// Upload.isSameUrlPage()


    /**
     * Uses sharepoint default function from {/_layouts/1033/core.js}
     * for escaping urls.
     *
     * @function
     */
    $.pt.getEscapedUrl = escapeProperly;

    /**
     * Uses sharepoint default function from {/_layouts/1033/core.js}
     * to un-escape urls.
     * @function
     */
    $.pt.getUnEscapedUrl = unescapeProperly;


    /**
     * Given a List name or a DOcument Library name, this method will retrieve
     * it's UID from SP.
     *
     * @param {String} listName     The name of the list.
     * @return {String}
     * @memberOf jQuery.pt
     *
     */
    $.pt.getListUID = function(listName) {
        if (!listName) {
            return "";
        }
        var id = "";
        if ($.pt._cache["getListUID:" + listName]) {
            id = $.pt._cache["getListUID:" + listName];
            return id;
        }
        SPAPI.getList({
            listName: listName,
            async: false,
            completefunc: function (xData, Status) {
                id = $(xData.responseXML).find("List").attr("ID");
            }
        });
        if (id) {
            $.pt._cache["getListUID:" + listName] = id;
        }
        return id;

    };// $.pt.getListUID()


    /**
     * Logs information to the output console.
     *
     * @param {String} msg
     */
    Upload.log = (function(){

        var logit, $output,
            n           = 1,
            c           = 0,
            isNative    = false,
            initDone    = false,
            bgColor     = [
                '#FFFFFF',
                '#F5F5F2'
            ];

        if (    typeof console === "undefined"
            ||  typeof console.debug === "undefined"
        ) {

            logit = function(){

                var i,j,
                    data = "";

                for(i=0,j=arguments.length; i<j; i++){

                    data += '<div style="padding: .1em .1em;background-color:' +
                            bgColor[c] + '"><span>[' + n + '] </span>' +
                            arguments[i] + '</div>';

                    n++;

                    if (c === 1) {

                        c = 0;

                    } else {

                        c = 1;

                    }

                }

                if (data) {

                    $output.append(data);

                    if (!$output.dialog("isOpen")) {

                        $output.dialog("open");

                    }

                }

            };

        } else {

            isNative    = true;

        }

        return function(){

            if (!initDone) {

                initDone = true;

                if (!isNative) {

                    $output = $("<div><h2>SPWidgets Debug Output</h2></div>")
                            .appendTo("body")
                            .dialog({
                                title: "Debug output",
                                height: 300
                            });

                }

            }

            if (isNative) {

                var i,j;

                for(i=0,j=arguments.length; i<j; i++){

                    console.debug(arguments[i]);

                };

            } else {

                logit.apply(this, arguments);

            }

        };

    })(); // end: Upload.log();


    /**
     * @property
     * Stores the Style sheet that is inserted into the page the first
     * time SPControlUpload is called.
     * Value is set at build time.
     *
     */
    Upload.StyleSheet = "/**\n"
+ " * FILE: jquery.SPControlUpload.css\n"
+ " * \n"
+ " * \n"
+ " */\n"
+ ".spcontrolupload .mainContainer {\n"
+ "	position: relative;\n"
+ "	display:block;\n"
+ "	height: 4em;\n"
+ "}\n"
+ "\n"
+ ".spcontrolupload .iFrameWindow,\n"
+ ".spcontrolupload .buttonPane,\n"
+ ".spcontrolupload .spwidget-success-cntr,\n"
+ ".spcontrolupload .loadingOverlay {\n"
+ "    position: absolute;\n"
+ "    top: 0px;\n"
+ "    height: 3em;\n"
+ "    width: 100%;\n"
+ "}\n"
+ ".spcontrolupload .buttonPane {\n"
+ "    left: 0px;\n"
+ "    width: 10%;\n"
+ "    overflow: hidden;\n"
+ "    cursor: pointer;\n"
+ "}\n"
+ ".spcontrolupload .buttonPane .upload_button {\n"
+ "    font-weight: bold;\n"
+ "    font-size: 1.1em;\n"
+ "    text-align: center;\n"
+ "    margin-top: .8em;\n"
+ "}\n"
+ "\n"
+ ".spcontrolupload .iFrameWindow {\n"
+ "    width: 90%;\n"
+ "    left: 10%;\n"
+ "    overflow: hidden;\n"
+ "}\n"
+ ".spcontrolupload .iFrameWindow iframe {\n"
+ "	overflow: auto;\n"
+ "	width: 100%;\n"
+ "	height: 99%;\n"
+ "}\n"
+ "\n"
+ ".spcontrolupload .spwidget-show-full-form .iFrameWindow {\n"
+ "    overflow: auto;\n"
+ "    width: 100%;\n"
+ "    margin: 0em;\n"
+ "    left: 0px;\n"
+ "    right: auto;\n"
+ "    z-index: 5;\n"
+ "}\n"
+ "\n"
+ ".spcontrolupload .loadingOverlayMsg {\n"
+ "	font-size: 1em;\n"
+ "	background-position: left top;\n"
+ "    background-repeat: no-repeat;\n"
+ "    background-image: url('/_layouts/images/loadingcirclests16.gif');\n"
+ "    margin: 0.5em;\n"
+ "    padding-left: 25px;\n"
+ "}\n"
+ "\n"
+ ".spcontrolupload .spwidget-success-cntr,\n"
+ ".spcontrolupload .spwidget-error-cntr {\n"
+ "    display: none;\n"
+ "}\n"
+ ".spcontrolupload div.spwidget-msg-cntr {\n"
+ "    margin: 0.5em .5em .5em 3em;\n"
+ "	font-size: 1em;\n"
+ "	background-position: left top;\n"
+ "    background-repeat: no-repeat;    \n"
+ "}\n"
+ ".spcontrolupload .spwidget-close {\n"
+ "    color: red;\n"
+ "    font-size: xx-small;\n"
+ "    font-weight: bold;\n"
+ "    vertical-align: super;\n"
+ "    cursor: pointer;\n"
+ "}\n"
+ "\n"
+ ".spcontrolupload .spwidget-success-cntr div.spwidget-msg-cntr {\n"
+ "    background-image: url('/_layouts/images/STS_ListItem_43216.gif');\n"
+ "    padding-left: 30px;\n"
+ "}\n"
+ "\n"
+ ".spcontrolupload .spwidget-error-cntr {\n"
+ "    bottom: -1.5em;\n"
+ "    left: 0px;\n"
+ "    width: 100%;\n"
+ "    position: absolute;\n"
+ "}\n"
+ "\n"
+ "/* For debug/dev purpose. Add it to .spcontrolupload container */\n"
+ ".spcontrolupload-dev-mode .iFrameWindow {\n"
+ "    overflow: auto !important;\n"
+ "    height: auto !important;\n"
+ "    z-index: 5 !important;\n"
+ "}\n"
+ ".spcontrolupload-dev-mode .iFrameWindow iframe {\n"
+ "    overflow: scroll !important;\n"
+ "}\n"
+ "\n";
//_HAS_SPUPLOAD_CSS_TEMPLATE_

    /**
     * @property
     * Stores the HTML templates used by this widget.
     * Populated during the build process from the
     * html.SPControlUpload.html file
     */
    Upload.HtmlUI = "<div class=\"SPControlUploadUI spcontrolupload\">\n"
+ "    <div class=\"mainContainer\">\n"
+ "        <div class=\"buttonPane ui-state-default\">\n"
+ "            <div class=\"upload_button\">\n"
+ "                Upload\n"
+ "            </div>\n"
+ "        </div>\n"
+ "        <div class=\"iFrameWindow ui-state-default\">\n"
+ "            <iframe name=\"SPControlUploadUI\" frameborder=\"0\" scrollbars=\"yes\" scrolling=\"yes\"></iframe>\n"
+ "        </div>\n"
+ "        <div class=\"loadingOverlay ui-widget-content\">\n"
+ "            <div class=\"loadingOverlayMsg\"></div>\n"
+ "        </div>\n"
+ "        <div class=\"spwidget-success-cntr ui-widget-content\">\n"
+ "            <div class=\"spwidget-msg-cntr\">\n"
+ "                <span class=\"spwidget-msg\">Upload Successful!</span> \n"
+ "                <span class=\"spwidget-close\">x</span> \n"
+ "            </div>\n"
+ "        </div>\n"
+ "        <div class=\"spwidget-error-cntr ui-state-error\">\n"
+ "            <div class=\"spwidget-msg-cntr\">\n"
+ "                <span class=\"spwidget-msg\">Error</span> \n"
+ "                <span class=\"spwidget-close\">x</span> \n"
+ "            </div>\n"
+ "        </div>\n"
+ "    </div>\n"
+ "</div>\n"
+ "\n"
+ "<div id=\"SPControlUploadModUI\" \n"
+ "    style=\"\n"
+ "        position:   absolute;\n"
+ "        width:      99.9%;\n"
+ "        height:     99.9%;\n"
+ "        left:       0px;\n"
+ "        top:        0px;\n"
+ "        padding-left:       .5em;\n"
+ "        background-color:   white;\">\n"
+ "    <div class=\"SPControlUploadModUIFileSelected\"\n"
+ "        style=\"\n"
+ "        background-position: left center;\n"
+ "        background-repeat: no-repeat;\n"
+ "        background-image: url('/_layouts/images/urn-content-classes-smartfolder16.gif');\n"
+ "        padding: 0.5em 2em;\">Select...</div>\n"
+ "</div>\n";
//_HAS_SPUPLOAD_HTML_TEMPLATE_

})(jQuery);
/**
 * jquery.SPDateField.js
 * The SPDateField widget. Introduced with v2.2, August 2013
 * 
 * BUILD: October 03, 2014 - 02:25 PM
 * 
 */
;(function($){
    
    "use strict";
    /*jslint nomen: true, plusplus: true */
    /*global SPWidgets */
    
    /**
     * @class SPDate
     * @namespace
     */
    var SPDate = {};
    
    /** @property {Boolean} Is initialization done */
    SPDate.isInitDone = false;
    
    /** @property {String} Event namespace */
    SPDate.evNamespace = '.spwidgets.spdatefield';
    
    /**
     * Default options. 
     * @member Inst.opt
     * @memberOf Inst.opt
     */
    $.SPWidgets.defaults.date = {
        allowMultiples: false,
        delimeter:      ";",
        remainOpen:     true,
        datepicker:     {
            dateFormat:         'mm/dd/yy',
            buttonImage:        '/_layouts/images/CALENDAR.GIF',
            showOn:             "both",
            buttonImageOnly:    true
        },
        dateTemplate:   '{{date}} <span class="spwidgets-item-remove">[x]</span>',
        showTimepicker: false,
        timeFormat:     ' {{hour}}:{{minutes}} {{ampm}}',
        timeUTC:        true,
        labelHour:      'Hour',
        labelMinutes:   'Minutes',
        labelAMPM:      'AM|PM',
        labelTime:      'Time',
        labelSet:       'Set',
        onSelect:       null
    };
    
    
    /**
     * Inserts a jQuery datepicker into the UI that allows the user to
     * pick a date and save the Sharepoint format of that date to the
     * original input field that this widget was bound to.
     * Display format could be defined as the local locale while the
     * value that will actually be stored in the input value will be
     * the format expected by SharePoint webservices mainly ISO format
     * YYYY-MM-DD.
     * 
     * @param {Object} [options]
     * 
     * @param {Boolean} [options.allowMultiples=false]
     * @param {String} [options.delimeter=";"]
     * @param {Boolean} [options.remainOpen=true]
     * @param {Object} [options.datepicker={...}]
     * @param {String} [options.dateTemplate=""]
     * @param {Boolean} [options.showTimepicker=false]
     * @param {String} [options.timeFormat='{{our}}:{{minutes}} {{ampm}}']
     * @param {Boolean} [options.timeUTC=true]
     * @param {String} [options.labelHour='Hour']
     * @param {String} [options.labelMinutes='Minutes']
     * @param {String} [options.labelAMPM='AM|PM']
     * @param {String} [options.labelTime='Time']
     * @param {String} [options.labelSet='Set']
     * @param {Function} [options.onSelect=null]
     * 
     * return {jQuery} this
     * 
     * This widget supports the following methods:
     * 
     * $().SPDateField("reset");
     * $().SPDateField("getDate");
     * $().SPDateField("setDate", dates[], "format");
     * $().SPDateField("removeDate", dates[], "format");
     * $().SPDateField("destroy");
     * 
     */
    $.fn.SPDateField = function(options){
        
        var arg         = arguments,
            inputEle    = this;
        
        // If initialization is not yet done, then do it now
        if ( !SPDate.isInitDone ) {
            
            SPDate.isInitDone = true;
            
            if ( SPDate.styleSheet !== "" ) {
                
                $('<style type="text/css">' + "\n\n" +
                        SPDate.styleSheet + "\n\n</style>" )
                    .prependTo("head");
                
            }
            
            $("body").on("click" + SPDate.evNamespace, SPDate.onPageClick);
            
        }
        
        // Process Methods
        if (typeof options === "string") {
            
            return (function(){
                
                var action  = String(arg[0]).toLowerCase(),
                    resp    = inputEle;
                    
                // Loop through all inputs and process the method
                // on it. Note that for methods that return data
                // if user defined more than one element in the
                // selection, only the data for the last item on
                // that selection will be returned.
                $(inputEle).each(function(i, thisInput){
                    
                    if (!$(inputEle).hasClass("hasSPDateField")) {
                        
                        return;
                        
                    }
                    
                    var $this   = $(thisInput),
                        Inst    = $this.data("SPDateFieldInstance");
                    
                    if (Inst && $this.length > 0) {
                        
                        switch(action) {
                            
                            //------> GET DATE METHOD: dateObj = $().SPDateField("getDate")
                            case "getdate":
                                
                                resp = Inst.getDate();
                                
                                break;
                            
                            //------> SET DATE METHOD: $().SPDateField("setDate", dates, format)
                            case "setdate":
                                
                                if (arg[1]) {
                                    
                                    Inst.setDate({
                                        date:   arg[1],
                                        format: (arg[2] || Inst.opt.datepicker.dateFormat)
                                    });
                                    
                                }
                                
                                break;
                                
                            //------> REMOVE DATE METHOD: $().SPDateField("removeDate", dates, format)
                            case "removedate":
                                
                                if (arg[1]) {
                                    
                                    Inst.removeDate({
                                        date:   arg[1],
                                        format: (arg[2] || Inst.opt.datepicker.dateFormat)
                                    });
                                    
                                }
                                
                                break;
                                
                            //------> RESET METHOD: $().SPDateField("reset")
                            case "reset":
                                
                                Inst.reset();
                                
                                break;
                            
                            //------> DESTROY METHOD: $().SPDateField("destroy")
                            case "destroy":
                                
                                Inst.destroy();
                                
                                break;
                            
                        } //end: switch()
                        
                    }
                    
                });
                
                return resp;
                
            })();
            
        } //end: Method? ---------------------------
        
        // BUILD the widget on each input element 
        // provided by the user's selection
        return this.each(function(){
            
           /**
            * @class SPDate
            */
            var Inst = {
                
                /** @property {jQuery} The input element used by the user */
                $ele: $(this).addClass("hasSPDateField"),
                
                /** @property {Boolean} Is this an inline binding? */
                isInline: false,
                
                /** @property {jQuery} the inline container that was given by the user */
                inlineCntr: null
                
            };
            
            // If not an input text field, then check if it is a non-input element,
            // which will cause this widget to be inserted inline always visible
            // widget.
            if (!Inst.$ele.is("input[type='text']")) {
                
                if (!Inst.$ele.is(":input")) {
                    
                    Inst.isInline   = true;
                    Inst.inlineCntr = $(this);
                    Inst.$ele       = $('<input name="spdatefieldinline" value="" type="text" style="display:none" />')
                    
                } else {
                    
                    return;
                    
                }
                
            }
                
            /**
             * @property {Object} The input options after defaults
             * @member Inst
             * @memberOf Inst
             */
            Inst.opt = $.extend(true, {}, $.SPWidgets.defaults.date, options);
            
            /**
             * @property {jQuery} the UI container for the Date field.
             * @member Inst
             * @memberOf Inst
             */
            Inst.$ui = $(SPDate.htmlTemplate)
                        .filter("div.spwidget-date-cntr")
                        .clone();
            
            if (Inst.isInline) {
                
                Inst.$ui
                    .appendTo(Inst.inlineCntr)
                    .addClass("spwidget-inline")
                    .css("display", "none");
                
                Inst.$ele.appendTo(Inst.$ui);
                
            } else {
                
                Inst.$ui    
                    .insertAfter(Inst.$ele)
                    .css("display", "none");
                
            }
            
            /**
             * @property {String} The original value in the input
             * @member Inst
             * @memberOf Inst
             */
            Inst.eleOrigVal = Inst.$ele.val();
            Inst.$ele.val("");
            
            /**
             * @property {jQuery} the Datepicker input field.
             * @member Inst
             * @memberOf Inst
             */
            Inst.$input = Inst.$ui
                            .find("input[name='SPDateFieldInput']")
                            .val(Inst.$ele.val());
            
            /** @property {jQuery} the jQuery datepicker input container */
            Inst.$inputCntr = Inst.$input.closest(".spwidget-date-input-cntr");
            
            /**
             * @property {jQuery} The container used to display date when allowMuliples is true.
             * @member Inst
             * @memberOf Inst
             */
            Inst.$dtCntr = Inst.$ui.find("div.spwidget-date-selected-cntr");
            
            /**
             * Returns the date selected by the user. An object is returned
             * with the date formatted in differnt ways. See below.
             * 
             * @return {Object} 
             *      The returned objec will have the following format:
             *  
             *      {
             *          input: 'value of input',
             *          dates: [
             *              'date 1',
             *              'date 2'
             *          ]
             *      }
             * 
             */
            Inst.getDate = function() {
                
                var dtObj = {
                        input:  Inst.$ele.val(),
                        dates:  []
                    };
                
                if (dtObj.input) {
                    
                    if (Inst.opt.allowMultiples) {
                        
                        dtObj.dates = dtObj.input.split(Inst.opt.delimeter);
                        
                    } else {
                        
                        dtObj.dates.push(dtObj.input);
                        
                    }
                    
                }
                
                return dtObj;
                
            }; //end: Inst.getDate()
            
            /**
             * Resets the widget to its initial state, which could have
             * had a prepopluated value on it.
             * 
             * @return {Object} Inst
             */
            Inst.reset = function() {
                
                Inst.$input.val("").datepicker("hide");
                Inst.$ele.val("").change();
                Inst.$dtCntr.empty();
                
                return Inst;
                
            }; //end: Inst.reset()
            
            /**
             * Sets a date on the date widgets. Upon setting the date, the
             * input's change() event is triggered.
             * 
             * @param {Object} setDateOpt
             * 
             * @param {Date|Array|String} setDateOpt.date
             *          The date or array of dates to set on the picker.
             * 
             * @param {Boolean} [setDateOpt.setDatepicker=true]
             *          When true, the datepicker jQuery UI widget input will
             *          be set to the value that was provided via this method.
             *          Used only when allowMultiples is false or isInline is
             *          true.
             * 
             * @param {String} [setDateOpt.format=Inst.opt.datepicker.dateFormat]
             *          The format of the dates provided on input. This param
             *          is used only if the input date (or one of them) is a
             *          string.
             * 
             * @param {Boolean} [setDateOpt.triggerEvent=true]
             *          
             * 
             * 
             * @return {Object} Inst
             */
            Inst.setDate = function(setDateOpt) {
                
                var opt     = $.extend(
                                {},
                                {
                                    date:           '',
                                    time:           '',
                                    format:         Inst.opt.datepicker.dateFormat,
                                    setDatepicker:  true,
                                    triggerEvent:   true
                                },
                                setDateOpt
                            ),
                    eleVal  = Inst.$ele.val(),
                    dtShow  = '',
                    dtShowObj;
                
                if (!opt.date) {
                    
                    return Inst;
                    
                }
                
                if (!$.isArray(opt.date)) {
                    
                    opt.date = [ opt.date ];
                    
                }
                
                // Loop through each date and create the string that will be used
                // to set the date on the widget.
                $.each(opt.date, function(i, dt){
                    
                    var dtObj   = dt,
                        dt1     = '',
                        dt2     = '';
                    
                    // If this date object is not an instance of Date, then
                    // parse it into a Date object.
                    // If the string has a T on it, then we assume that it is
                    // an ISO 8601 compliant string and use the $.SPWidgets.parseDateString
                    // to get a Date object.
                    // Else, it could be a date in the format defined by the datepicker
                    // date format param.
                    if (!(dtObj instanceof Date)) {
                        
                        dtObj = String(dtObj);
                        
                        if (dtObj.indexOf("T") > -1) {
                            
                            dtObj = $.SPWidgets.parseDateString(dtObj);
                            
                        } else {
                            
                            try {
                                
                                dtObj = $.datepicker.parseDate(opt.format, dt);
                                
                            } catch(e){
                                
                                return Inst;
                                
                            }
                            
                        }
                        
                    }
                    
                    dtShowObj   = dtObj;
                    dt1         = $.datepicker.formatDate('yy-mm-dd', dtObj);
                    dt2         = $.datepicker
                                    .formatDate(Inst.opt.datepicker.dateFormat, dtObj);
                    
                    if (Inst.opt.showTimepicker) {
                        
                        dt1  = $.SPWidgets.SPGetDateString(dtObj, Inst.opt._timeFmt);
                        dt2 += Inst.$timepicker.formatTime(dtObj);
                        
                    }
                    
                    // AllowMultiples = false
                    if (!Inst.opt.allowMultiples) {
                        
                        eleVal  = dt1;
                        dtShow  = dt2;
                        
                    // allowMultiples = true and date not yet stored
                    } else if (eleVal.indexOf(dt1) < 0) {
                        
                        if (eleVal) {
                            
                            eleVal += Inst.opt.delimeter;
                            
                        }
                        
                        eleVal += dt1;
                        
                        dtShow += '<span class="spwidgets-item" data-spwidget_dt1="' +
                                    dt1 + '" data-spwidget_dt2="' + dt2 + '">' +
                                    $.SPWidgets.fillTemplate({
                                        tmplt: Inst.opt.dateTemplate,
                                        data: { date: dt2 }
                                    }) + 
                                ' </span>';
                        
                    }
                    
                }); //end: each
                
                // If allow multiple is true, then set teh multiple dates
                // on the display area. Then set the input value and trigger
                // change event
                if (Inst.opt.allowMultiples) {
                    
                    Inst.$dtCntr.append(dtShow);
                    
                // else, should we set the date picker widget
                } else if (opt.setDatepicker) {
                    
                    Inst.$input.val(dtShow);
                    
                    if (Inst.isInline && !Inst.opt.showTimepicker){
                        
                        Inst.$inputCntr.datepicker("setDate", dtShowObj);
                        
                    } else if (Inst.isInline) {
                        
                        Inst.$timepicker.updateDateTimeWidgets(dtShowObj);
                        
                    }
                    
                }
                
                Inst.$ele.val(eleVal);
                
                if (opt.triggerEvent) {
                    
                    if (!Inst.isInline) {
                        
                        Inst.$ele.change();
                        
                    }
                    
                    if ($.isFunction(Inst.opt.onSelect)) {
                        
                        Inst.opt.onSelect.call(
                            (   Inst.isInline
                                ?   Inst.inlineCntr
                                :   Inst.$ele
                            )
                        );
                        
                    }
                    
                }
                
                return Inst;
                
            }; //end: Inst.setDate()
            
            /**
             * Removes a date from the list of selected dates.
             * 
             * @param {Object} removeDateOpt
             * 
             * @param {Date|String|Array} date
             *          The date or array of dates to be removed. Can be
             *          Date objects or strings. If defined as a string
             *          the 'format' option should be set accordingly
             * 
             * @return {Object} Inst 
             */
            Inst.removeDate = function(removeDateOpt){
                
                var opt     = $.extend(
                                {},
                                {
                                    date:           '',
                                    format:         Inst.opt.datepicker.dateFormat
                                },
                                removeDateOpt
                        ),
                    eleDtObj    = Inst.getDate();
                
                if (!opt.date) {
                    
                    return Inst;
                    
                }
                
                if (!$.isArray(opt.date)) {
                    
                    opt.date = [ opt.date ];
                    
                }
                
                $.each(opt.date, function(i, dt){
                    
                    var dtObj       = dt,
                        dt1         = '',
                        dt1Regex    = '';
                    
                    if (!(dtObj instanceof Date)) {
                        
                        try {
                            
                            dtObj = $.datepicker.parseDate(opt.format, dt);
                            
                        } catch(e){
                            
                            return Inst;
                            
                        }
                         
                    }

                    // Get the internal representation of the date (ISO 8601)
                    // so that we can remove it from the list of selected
                    // dates. The internal representation can be just the date
                    // or the date + time. 
                    // The dt1Regex is used to search and replace the
                    // date in the input to where this widget was bound, which
                    // could include multiple dates.
                    if (Inst.opt.showTimepicker) {
                        
                        dt1 = $.SPWidgets.SPGetDateString(dtObj, Inst.opt._timeFmt);
                        
                    } else {
                        
                        dt1 = $.datepicker.formatDate('yy-mm-dd', dtObj);
                        
                    }
                    
                    dt1Regex    = new RegExp(
                                    "(" + Inst.opt.delimeter + ")?" + dt1, 
                                    "g");
                    
                    eleDtObj.input = eleDtObj.input.replace(dt1Regex, "");
                    
                    if (Inst.opt.allowMultiples) {
                        
                        Inst.$dtCntr
                            .find("span[data-spwidget_dt1='" + dt1 + "']")
                            .remove();
                        
                    }
                    
                });
                
                // Set the value on bound input.
                // Clean up the new string (misc. delimeteres at begining or
                // end of string), set it to the input field and trigger event.
                eleDtObj.input = eleDtObj.input
                                    .replace((new RegExp("^" + Inst.opt.delimeter)), "")
                                    .replace((new RegExp(Inst.opt.delimeter + "$")), "");
                                    
                Inst.$ele.val(eleDtObj.input).change();
                
                return Inst;
                
            }; //end: Inst.removeDate()
            
            /**
             * Removes the widget from the page and makes the original
             * Element visible
             */
            Inst.destroy = function() {
                
                Inst.$ele.removeData("SPDateFieldInstance");
                Inst.$ele.removeClass("hasSPDateField").css("display", "");
                Inst.$ui.css("display", "none");
                Inst.$input.datepicker("hide");
                Inst.$input.datepicker("destroy");
                
                if (Inst.$timepicker) {
                    
                    Inst.$timepicker.$timePicker.off(".spdatefield");
                    Inst.$input.off(".spdatefield");
                    
                }
                
                if (Inst.isInline) {
                    
                    Inst.inlineCntr
                        .removeClass("hasSPDateField")
                        .removeData("SPDateFieldInstance");
                    
                }
                
                Inst.$ui.remove();
                
            }; //end: Inst.destroy()
            
            /**
             * Creates the date picker on this field. Depending on the 
             * input options, this could be a strait jQuery UI datepicker
             * or a customized picker that allows selection of time as well.
             * 
             * @return {Object} Date time Picker (if showTimepicker is true)
             */
            Inst.createDatePicker = function() {
                
                var wdg = {};
                
                // If showTimepicker is true, then lets build our own
                // date and time picker, which wraps jQuery datepicker.
                if (Inst.opt.showTimepicker) {
                    
                    wdg.$selectorCntr   = $(SPDate.htmlTemplate)
                                            .filter("div.spwidget-datetime-selector")
                                            .clone()
                                                .appendTo(Inst.$inputCntr)
                                                .css("display", "none");
                    wdg.$datePicker     = wdg.$selectorCntr.find("div.spwidget-date-selector");
                    wdg.$timePicker     = wdg.$selectorCntr.find("div.spwidget-time-selector");
                    wdg.$setButton      = wdg.$selectorCntr.find("div.spwidget-btn-set");
                    wdg.$hourSelect     = wdg.$timePicker.find("select.spwidget-hour");
                    wdg.$minSelect      = wdg.$timePicker.find("select.spwidget-min");
                    wdg.$ampmSelect     = wdg.$timePicker.find("select.spwidget-ampm");
                    wdg.heightDone      = false;
                    wdg.firstShowDone   = false;
                    
                    /**
                     * Returns an object with the time currently selected.
                     * 
                     * @return {Object}
                     *      An object with the following format:
                     * 
                     *          {
                     *              hour:       '',
                     *              hour24:     '',
                     *              minutes:    ''
                     *              ampm:       ''
                     *          }
                     */
                    wdg.getTime = function() {
                        
                        var time = {
                                hour:       wdg.$hourSelect.val(),
                                minutes:    wdg.$minSelect.val(),
                                ampm:       wdg.$ampmSelect.val()
                            };
                        
                        time.hour24 = time.hour;
                        
                        if (time.ampm === "PM" && time.hour !== "12") {
                            
                            time.hour24 = String(parseInt(time.hour) + 12);
                            
                        } else if (time.ampm === "AM" && time.hour === "12") {
                            
                            time.hour24 = "0";
                            
                        }
                        
                        return time;
                        
                    }; //end: wdg.getTime()
                    
                    /**
                     * Formats the time on the widget, either based on the
                     * values returned from getTime() or a Date object.
                     * 
                     * @param {Date|Object} time
                     *      The object that will be used to format the Time.
                     * 
                     * @return {String}
                     *      Date formated with the dateFormat input parameter
                     */
                    wdg.formatTime = function(time) {
                        
                        var timeObj         = time,
                            timeFormated    = '';
                        
                        if (time instanceof Date) {
                            
                            timeObj = {
                                hour:       time.getHours(),
                                hour24:     String(time.getHours()),
                                minutes:    String(time.getMinutes()),
                                ampm:       'AM'
                            };
                            
                            if (timeObj.hour > 12) {
                                
                                timeObj.hour = String(timeObj.hour - 12);
                                timeObj.ampm = 'PM';
                                
                            } else if (timeObj.hour === 12) {
                                
                                timeObj.ampm = 'PM';
                                
                            }
                            
                            timeObj.hour = String(timeObj.hour);
                            
                            if (timeObj.hour === "0") {
                                
                                timeObj.hour = "12";
                                
                            }
                            
                            if (String(timeObj.minutes).length < 2) {
                                
                                timeObj.minutes = "0" + timeObj.minutes;
                                
                            }
                            
                            
                        } else if (!time) {
                            
                            timeObj = wdg.getTime();
                            
                        }
                        
                        timeFormated = $.SPWidgets.fillTemplate(
                            Inst.opt.timeFormat,
                            timeObj
                        );
                        
                        return timeFormated;
                        
                    }; //end: wdg.formatTime()
                    
                    /**
                     * Updates the widget date/time with what's currently selected.
                     * If no date is selected, Today will be used.
                     * 
                     * @return {undefined}
                     */
                    wdg.setDateTime = function(dtObj){
                        
                        var time    = wdg.getTime();
                        
                        // If dtObj is not a Date object, then create it now.
                        // First try to get it from the Datepicker... If thats
                        // Null (not yet selected by user), then just create a
                        // default Date.
                        if (!(dtObj instanceof Date)) {
                            
                            dtObj = wdg.$datePicker.datepicker("getDate");
                            
                            if (dtObj === null) {
                                
                                dtObj = new Date();
                                
                            }
                            
                        }
                        
                        // Add time elements to date object
                        dtObj.setHours(time.hour24);
                        dtObj.setMinutes(time.minutes);
                        
                        Inst.setDate({
                            date:           dtObj,
                            format:         Inst.opt.datepicker.dateFormat,
                            setDatepicker:  true
                        });
                        
                        // If allowMultiples or isInline is true, then the
                        // "set" button is visible. Need to make sure we call
                        // any user defined callback to jQuery-UI's 'select'
                        // option
                        wdg.execUsersCallback(Inst.$input.val());
                        
                        return;
                        
                    }; //end: wdg.setDateTime()
                    
                    /**
                     * Updates the DateTime picker widgets (jquery datepicker
                     * and the hour and minutes selects) with the specified
                     * input date and time. This update of the widgets does
                     * not trigger an update to the date+time that is stored
                     * in the SPDateField() widget nor does it trigger events.
                     * 
                     * @param {Date} [newDate=Date()]
                     * 
                     * @return {undefined}
                     */
                    wdg.updateDateTimeWidgets = function(newDate){
                        
                        var dtObj = newDate,
                            tmpVal;
                        
                        if (!(dtObj instanceof Date)) {
                            
                            dtObj = new Date();
                            
                        }
                        
                        // Set hours
                        tmpVal = dtObj.getHours();
                                        
                        if (tmpVal === 0) {
                            
                            tmpVal = "12";
                            
                        } else if (tmpVal > 12) {
                            
                            tmpVal = (tmpVal - 12);
                            
                        }
                        
                        wdg.$hourSelect.val(tmpVal);
                        
                        // Set Minutes
                        tmpVal = dtObj.getMinutes();
                        
                        while (tmpVal % 5) {
                            
                            --tmpVal;
                            
                        }
                        
                        if (tmpVal < 10) {
                            
                            tmpVal = "0" + tmpVal;
                            
                        }
                        
                        wdg.$minSelect.val(tmpVal);
                        
                        // set PM/AM
                        if (dtObj.getHours() > 11) {
                            
                            wdg.$ampmSelect.val("PM");
                            
                        } else {
                            
                            wdg.$ampmSelect.val("AM");
                            
                        }
                        
                        wdg.$datePicker.datepicker("setDate", dtObj);
                        
                    }; //end: wdg.updateDateTimeWidgets()
                    
                    /**
                     * Makes the Time picker visible on the page.
                     * 
                     * @return {undefined}
                     */
                    wdg.showPicker = function() {
                        
                        wdg.$selectorCntr
                                .show(function(){
                                    
                                    var currentDate, tmpVal;
                                    
                                    if (!wdg.heightDone) {
                                        
                                        wdg.heightDone = true;
                                        
                                        $.SPWidgets.makeSameHeight(
                                            wdg.$datePicker
                                                .find("div.ui-datepicker-inline")
                                                .add(wdg.$timePicker)
                                        );
                                        
                                    }
                                    
                                    // If this is the first time showing the picker,
                                    // then pre-set the picker to the last date that
                                    // was selected.
                                    // If no date was selected (or was pre-set on the
                                    // input), then create a new date object (now)
                                    if (!wdg.firstShowDone) {
                                        
                                        wdg.firstShowDone = true;
                                        
                                        currentDate = Inst.getDate();
                                        
                                        if (currentDate.dates.length) {
                                            
                                            currentDate = $.SPWidgets
                                                            .parseDateString(
                                                                currentDate.dates[
                                                                    currentDate.dates.length - 1
                                                                ]
                                                            );
                                            
                                        } else {
                                            
                                            currentDate = new Date();
                                            
                                        }
                                        
                                        // FIXME: Replace code below with call to new method.
                                        wdg.updateDateTimeWidgets(currentDate);
                                                                                
                                    }//end: if(): pre-set the picker values
                                    
                                })
                                .position({
                                    my: "left top",
                                    at: "left bottom",
                                    of: Inst.$input
                                });
                        
                        return;
                        
                    }; //end: wdg.showPicker()
                    
                    /**
                     * Executes the user's callback to jQuery-UI's datepicker
                     * 'onSelect' option, if one was defined.
                     * 
                     * @param {String} dateText
                     * @param {Object} dtPickerObj
                     * 
                     */
                    wdg.execUsersCallback = function(dateText, dtPickerObj) {
                        
                        // Call the user defined onSelect if one was defined.
                        if ($.isFunction(Inst.opt.datepicker._onSelect)) {
                            
                            Inst.opt.datepicker._onSelect.call(
                                wdg.$datePicker,
                                dateText,
                                dtPickerObj
                            );
                            
                        }
                        
                    }; //end: wdg.execUsersCallback()
                    
                    /* ------------------------------------------------------ */
                    /* ------------------------------------------------------ */
                    
                    // Remove alt field updates from datepicker. We'll handle it
                    // with the time picker
                    Inst.opt.datepicker.altFormat   = '';
                    Inst.opt.datepicker.altField    = '';
                        
                    // If user set the icon option in the Datepicker, then need
                    // to build it manually
                    if (Inst.opt.datepicker.buttonImage && !Inst.isInline) {
                        
                        $('<img class="ui-datepicker-trigger" src="' + 
                                Inst.opt.datepicker.buttonImage + 
                                '" alt="..." title="...">'
                            )
                            .appendTo(Inst.$inputCntr)
                            .on("click" + SPDate.evNamespace, function(){
                                
                                wdg.showPicker();
                                
                            });
                        
                    }
                    
                    // If allowMultiples or isInline is true, then make set button visible
                    if (Inst.opt.allowMultiples || Inst.isInline) {
                        
                        wdg.$selectorCntr.addClass("spwidget-date-multiples-cntr");
                        wdg.$setButton.find("div.spwidget-btn")
                            .button({label: Inst.opt.labelSet})
                            .on("click" + SPDate.evNamespace, function(ev){
                                
                                wdg.setDateTime();
                                
                                return this;
                                
                            });
                        
                    }
                    
                    // Apply the Labels for the time picker for this instance
                    wdg.$timePicker
                        .find("div.ui-widget-header")
                            .html(Inst.opt.labelTime)
                            .end()
                        .find("div.spwidget-time-hour > label")
                            .html(Inst.opt.labelHour)
                            .end()
                        .find("div.spwidget-time-min > label")
                            .html(Inst.opt.labelMinutes)
                            .end()
                        .find("div.spwidget-time-ampm > label")
                            .html(Inst.opt.labelAMPM)
                            .end();
                    
                    // Set up a listener on the datepicker widget so that when user picks
                    // a date, we catch it and add the time portion to it.
                    // Let's also save the existing onSelect function, if one was defined
                    // on input, so we can call it later.
                    if ($.isFunction(Inst.opt.datepicker.onSelect)) {
                        
                        Inst.opt.datepicker._onSelect = Inst.opt.datepicker.onSelect;
                        
                    }
                    
                    // Ensure only 1 month
                    Inst.opt.datepicker.numberOfMonths = 1;
                    
                    // Setup the Datepicker onSelect event, which will build a Date
                    // object of the date the user selected and call setDateTime()
                    // to set teh widget. 
                    Inst.opt.datepicker.onSelect = function(dateText, dtPicker){
                        
                        // If allowMultiples is true, then exit if 
                        // this click is not the SET button 
                        if (Inst.opt.allowMultiples || Inst.isInline) {
                            
                            return this;
                            
                        }
                        
                        var newDate = new Date(
                                            dtPicker.currentYear,
                                            dtPicker.currentMonth,
                                            dtPicker.currentDay
                                        );
                        
                        wdg.setDateTime(newDate);
                        
                    };
                    
                    // Create datepicker widget using jquery ui
                    wdg.$datePicker.datepicker(Inst.opt.datepicker);
                    
                    // Setup listeners on the time selectors so that we can trigger
                    // an update to the widget.
                    wdg.$timePicker
                        .on("change" + SPDate.evNamespace + " keyup" + SPDate.evNamespace,
                            "select",
                            function(ev){
                                
                                // Cancel event bubbling
                                ev.stopPropagation();
                                ev.preventDefault();
                                
                                // If allowMultiples is true, then exit if 
                                // this click is not the SET button 
                                if (Inst.opt.allowMultiples || Inst.isInline) {
                                    
                                    return this;
                                    
                                }
                                
                                wdg.setDateTime();
                                
                                return this;
                                
                            });
                    
                    // If 'inline' mode is on, then make widget visible and
                    // hide the input field
                    if (Inst.isInline){
                        
                        Inst.$input.css("display", "none");
                        wdg.$selectorCntr
                            .addClass("spwidget-inline")
                            .css("display", "");
                        
                    }
                    
                    // now that we have the datepicker setup, if we're
                    // NOT 'inline' mode, then add listeners to then 
                    // input field so that the date and time picker is shown.
                    if (!Inst.isInline) {
                        
                        Inst.$input
                            .on("focus" + SPDate.evNamespace, function(){
                                
                                wdg.showPicker();
                                
                            });
                        
                    }
                    
                /////////////////////////////////////////////////////
                // ELSE: showTimepicker is false. Just show regular
                // jQuery UI date widget. 
                } else {
                    
                    // If remainOpen option is true, then turn off picker animation
                    if (Inst.opt.allowMultiples && Inst.opt.remainOpen) {
                        
                        Inst.opt.datepicker.showAnim = '';
                        
                    }
                    
                    // Store a reference to teh original onSelect method (if defined)
                    // and set our own here.  Our function will take the date selected
                    // by the user in their own locale and format it to ISO 8601
                    if ($.isFunction(Inst.opt.datepicker.onSelect)) {
                        
                        Inst.opt.datepicker._onSelect = Inst.opt.datepicker.onSelect;
                        
                    }
                    
                    // Setup the Datepicker 
                    Inst.opt.datepicker.onSelect = function(dateText, dtPicker){
                        
                        Inst.setDate({
                            date:           dateText,
                            format:         dtPicker.settings.dateFormat,
                            setDatepicker:  false
                        });
                        
                        // Call the user defined onSelect if one was defined.
                        if ($.isFunction(Inst.opt.datepicker._onSelect)) {
                            
                            Inst.opt.datepicker._onSelect.call(this, dateText, dtPicker );
                            
                        }
                        
                        // If allow multiples is true, then clear out date picker input
                        if (Inst.opt.allowMultiples) {
                            
                            Inst.$input.val("");
                            
                        }
                        
                        if (Inst.opt.allowMultiples && Inst.opt.remainOpen && !Inst.isInline) {
                            
                            setTimeout(function(){
                                Inst.$input.datepicker("show");
                            }, 5);
                            
                        }
                        
                    }; 
                    
                    // If inline is true, the initiate the datepicker on the
                    // DIV container and hide the input... Else, just initiate
                    // the Datepicker on the input field.
                    if (Inst.isInline) {
                        
                        Inst.$inputCntr.datepicker(Inst.opt.datepicker);
                        Inst.$input.css("display", "none");
                        
                    } else {
                        
                        Inst.$input.datepicker(Inst.opt.datepicker);
                        
                    }
                    
                }
                
                return wdg;
                
            }; //end: createDatePicker()
            
            //------------------------------------------------------
            //-----------    INITIATE THIS INSTANCE    -------------
            //------------------------------------------------------
            
            // Define time string format (local or utc) 
            // param that is used with SPGetDateString
            Inst.opt._timeFmt = ( Inst.opt.timeUTC ? 'utc' : 'local' );
            
            // Setup the datepicker options
            // TODO: should we allow the user to manipulate this?
            Inst.opt.datepicker.altFormat   = 'yy-mm-dd';
            Inst.opt.datepicker.altField    = Inst.$ele;
            
            // If allowMultiples is true, then set special processing for storing
            // multiple dates - both on display and in the input field.
            if (Inst.opt.allowMultiples){
                
                Inst.opt.datepicker.altFormat   = '';
                Inst.opt.datepicker.altField    = '';
                
                // Setup listener for removing selected dates.
                Inst.$dtCntr
                    .css("display", "")
                    .on("click", ".spwidgets-item-remove", function(ev){
                        
                        var $dtItem = $(ev.target).closest(".spwidgets-item"),
                            date    = $dtItem.data("spwidget_dt1");
                        
                        // If allowMultiples is true, then convert the date string
                        // to a date object
                        if (Inst.opt.allowMultiples) {
                            
                            date = $.SPWidgets.parseDateString(date);
                            
                        }
                        
                        Inst.removeDate({
                            date:   date,
                            format: 'yy-mm-dd'
                        });
                        
                    });
                
            } //end: if(): allowMultiples

            // Hide the input used by the caller and display our datepicker input.
            Inst.$ele
                .css("display", "none")
                .data("SPDateFieldInstance", Inst);
            
            if (Inst.isInline) {
                
                Inst.inlineCntr.data("SPDateFieldInstance", Inst);
                
            }
            
            // $timepicker holds only the setup (wdg) for the date+time picker
            // for the Datepicker only, use Inst.$input
            Inst.$timepicker = Inst.createDatePicker();
            
            // If input field already has some date, then prepopulate the widget
            if (Inst.eleOrigVal) {
                
                Inst.setDate({
                    date:           (Inst.eleOrigVal.split(Inst.opt.delimeter)),
                    format:         'yy-mm-dd',
                    triggerEvent:   false
                });
                
            }
            
            // On date change, trigger event on original
            // element and cancel this one
            Inst.$input.on("change", function(ev){
                
                ev.stopPropagation();
                Inst.$ele.change();
                
            });
            
            Inst.$ui.css("display", "");
            
        }); //end: return.each()
        
    }; //end: $.fn.SPDateField()
        
    /**
     * When user clicks on the page, this method will close the
     * Timepicker if it is open.
     * 
     * @param {jQuery.Event}
     * 
     * @return {Object} this
     */
    SPDate.onPageClick = function(ev) {
        
        var $ele            = $(ev.target),
            $allSelectors   = $("div.spwidget-datetime-selector:visible:not('.spwidget-inline')"),
            $clickArea      = null;
        
        // JQuery UI Datepicker FWD/BAKC button are recreate everytime a
        // user clicks on them... if this 
        if (!$.contains(document.documentElement, $ele[0])) {
            
            return this;
            
        }
        
        // If Date and Time selectors are visible, then lets check if the user
        // clicked on an element that is associated with the current time picker.
        // This is used later to ensure we close all other pickers *except* the
        // one associated with this element.
        if ($allSelectors.length) {
            
            $clickArea = $ele.closest("div.spwidget-datetime-selector");
            
            if (!$clickArea.length && $ele.is("input.spwidget-date-datepicker,.ui-datepicker-trigger")) {
                
                $clickArea = $ele.parent().find("div.spwidget-datetime-selector");
                
            }
            
            $allSelectors.not($clickArea).hide();
            
        }
        
        return this;
        
    }; //end: SPDate.onPageClick()
    
    /**
     * @property
     * Stores the Style sheet for the Date widget
     * @member SPDate
     * @memberOf SPDate
     */
    SPDate.styleSheet = ".spwidget-date-cntr {\n"
+ "    display: inline-block;   \n"
+ "    position: relative;\n"
+ "}\n"
+ ".spwidget-date-cntr div.spwidget-date-input-cntr {\n"
+ "    position: relative;\n"
+ "}\n"
+ ".spwidget-date-cntr input {\n"
+ "    width: 99%;\n"
+ "}\n"
+ ".spwidget-date-cntr img.ui-datepicker-trigger {\n"
+ "    display: block;\n"
+ "    position: absolute;\n"
+ "    right: 2%;\n"
+ "    top: .3em;\n"
+ "}\n"
+ "\n"
+ ".spwidget-date-cntr .spwidgets-item-remove {\n"
+ "    color: red;\n"
+ "    font-size: xx-small;\n"
+ "    vertical-align: super;\n"
+ "    cursor: pointer;\n"
+ "}\n"
+ "/** --------------------------- Date and Time picker -- */\n"
+ ".spwidget-date-cntr div.spwidget-datetime-selector {\n"
+ "    padding: .5em;\n"
+ "    position: absolute;\n"
+ "    width: 28em;\n"
+ "    z-index: 1;\n"
+ "}\n"
+ ".spwidget-date-cntr div.spwidget-datetime-selector div.ui-datepicker-inline {\n"
+ "    width: 14em;\n"
+ "}\n"
+ "\n"
+ ".spwidget-date-cntr div.spwidget-datetime-selector div.spwidget-date-selector,\n"
+ ".spwidget-date-cntr div.spwidget-datetime-selector div.spwidget-time-selector {\n"
+ "    float: left;\n"
+ "}\n"
+ ".spwidget-date-cntr div.spwidget-selectors:before,\n"
+ ".spwidget-date-cntr div.spwidget-selectors:after {\n"
+ "    content: \"\";\n"
+ "    display: table;\n"
+ "    line-height: 0;\n"
+ "}\n"
+ ".spwidget-date-cntr div.spwidget-selectors:after {\n"
+ "    clear: both;    \n"
+ "}\n"
+ ".spwidget-date-cntr div.spwidget-datetime-selector select.spwidget-hour,\n"
+ ".spwidget-date-cntr div.spwidget-datetime-selector select.spwidget-min,\n"
+ ".spwidget-date-cntr div.spwidget-datetime-selector select.spwidget-ampm {\n"
+ "    font-size: 1.2em;\n"
+ "}\n"
+ "/* Time selector */\n"
+ ".spwidget-date-cntr div.spwidget-time-selector {\n"
+ "    margin-left: .2em;\n"
+ "    width: 11em;\n"
+ "}\n"
+ ".spwidget-date-cntr div.spwidget-time-selector-cntr {\n"
+ "    padding: .2em;\n"
+ "}\n"
+ ".spwidget-date-cntr div.spwidget-time-selector div.ui-widget-header {\n"
+ "    text-align: center;\n"
+ "    line-height: 2em;\n"
+ "    margin-bottom: .5em;\n"
+ "}\n"
+ ".spwidget-date-cntr .spwidget-time-hour,\n"
+ ".spwidget-date-cntr .spwidget-time-min,\n"
+ ".spwidget-date-cntr .spwidget-time-ampm {\n"
+ "    margin-top: .2em;\n"
+ "    padding: .2em;\n"
+ "}\n"
+ ".spwidget-date-cntr .spwidget-time-selector-cntr select,\n"
+ ".spwidget-date-cntr .spwidget-time-selector-cntr label {\n"
+ "    overflow: hidden;\n"
+ "    display: inline-block;\n"
+ "    font-weight: bold;\n"
+ "}\n"
+ ".spwidget-date-cntr .spwidget-time-selector-cntr select {\n"
+ "    width: 4em;\n"
+ "}\n"
+ ".spwidget-date-cntr .spwidget-time-selector-cntr label {\n"
+ "    width: 5em;\n"
+ "    font-size: .9em;\n"
+ "}\n"
+ "\n"
+ "/* inline mode */\n"
+ ".spwidget-date-cntr .spwidget-inline div.spwidget-datetime-selector {\n"
+ "    position: relative;\n"
+ "    width: 26em;\n"
+ "}\n"
+ "\n"
+ ".spwidget-btn-set {\n"
+ "    display: none;\n"
+ "    position: absolute;\n"
+ "    right: .2em;\n"
+ "    bottom: .2em;\n"
+ "}\n"
+ ".spwidget-date-multiples-cntr .spwidget-btn-set {\n"
+ "    display: block;\n"
+ "}\n";
//_HAS_DATE_CSS_TEMPLATE_
    
    /**
     * @property
     * Stores the HTML templates for the Date widget
     * @member SPDate
     * @memberOf SPDate
     */
    SPDate.htmlTemplate = "<div class=\"spwidget-date-cntr\">\n"
+ "    <div class=\"spwidget-date-selected-cntr\" style=\"display:none;\"></div>\n"
+ "    <div class=\"spwidget-date-input-cntr\">\n"
+ "        <input class=\"spwidget-date-datepicker\" name=\"SPDateFieldInput\" value=\"\" />\n"
+ "    </div>\n"
+ "</div>\n"
+ "<div class=\"spwidget-datetime-selector ui-widget-content ui-corner-all\">\n"
+ "    <div class=\"spwidget-selectors\">\n"
+ "        <div class=\"spwidget-date-selector\"></div>\n"
+ "        <div class=\"spwidget-time-selector ui-widget-content ui-corner-all\">\n"
+ "            <div class=\"spwidget-time-selector-cntr\">\n"
+ "                <div class=\"ui-widget-header ui-helper-clearfix ui-corner-all\">\n"
+ "                    Time\n"
+ "                </div>\n"
+ "                <div class=\"spwidget-time-hour\">\n"
+ "                    <label>Hour</label>\n"
+ "                    <select name=\"spwidget_hour\" class=\"spwidget-hour\">\n"
+ "                        <option value=\"1\"> 1</option>\n"
+ "                        <option value=\"2\"> 2</option>\n"
+ "                        <option value=\"3\"> 3</option>\n"
+ "                        <option value=\"4\"> 4</option>\n"
+ "                        <option value=\"5\"> 5</option>\n"
+ "                        <option value=\"6\"> 6</option>\n"
+ "                        <option value=\"7\"> 7</option>\n"
+ "                        <option value=\"8\"> 8</option>\n"
+ "                        <option value=\"9\"> 9</option>\n"
+ "                        <option value=\"10\">10</option>\n"
+ "                        <option value=\"11\">11</option>\n"
+ "                        <option value=\"12\">12</option>\n"
+ "                    </select>\n"
+ "                </div>\n"
+ "                <div class=\"spwidget-time-min\">   \n"
+ "                    <label>Minutes</label>\n"
+ "                    <select name=\"spwidget_min\" class=\"spwidget-min\">\n"
+ "                        <option value=\"00\">00</option>\n"
+ "                        <option value=\"05\">05</option>\n"
+ "                        <option value=\"10\">10</option>\n"
+ "                        <option value=\"15\">15</option>\n"
+ "                        <option value=\"20\">20</option>\n"
+ "                        <option value=\"25\">25</option>\n"
+ "                        <option value=\"30\">30</option>\n"
+ "                        <option value=\"35\">35</option>\n"
+ "                        <option value=\"40\">40</option>\n"
+ "                        <option value=\"45\">45</option>\n"
+ "                        <option value=\"50\">50</option>\n"
+ "                        <option value=\"55\">55</option>\n"
+ "                    </select>\n"
+ "                </div>\n"
+ "                <div class=\"spwidget-time-ampm\">\n"
+ "                    <label>AM|PM</label>\n"
+ "                    <select name=\"spwidget_ampm\" class=\"spwidget-ampm\">\n"
+ "                        <option value=\"AM\">AM</option>\n"
+ "                        <option value=\"PM\">PM</option>\n"
+ "                    </select>\n"
+ "                </div>\n"
+ "            </div>\n"
+ "        </div>\n"
+ "    </div>\n"
+ "    <div class=\"spwidget-btn-set\">\n"
+ "        <div class=\"spwidget-btn\">\n"
+ "            Set\n"
+ "        </div>\n"
+ "    </div>\n"
+ "</div>\n";
//_HAS_DATE_HTML_TEMPLATE_
    
})(jQuery); /***** End of module: jquery.SPDateField.js */

/**
 * @fileOverview - List filter panel widget
 *
 * BUILD: November 26, 2014 - 11:13 AM
 *
 */
(function($){

    "use strict";
    /*jslint nomen: true, plusplus: true */
    /*global SPWidgets */

    /**
     * @class Filter
     */
    var Filter  = {},
        SPAPI   = $.SPWidgets.SPAPI;

    /** @property {Boolean} Is initialization done */
    Filter.isInitDone = false;

    /** @property {jQuery} jQuery object with templates. Loaded from Filter.htmlTemplate during initialization */
    Filter.templates = null;

    /**
     * Default options.
     */
    $.SPWidgets.defaults.filter = {
        list:                   '',
        webURL:                 SPAPI.getSiteUrl(),
        columns:                ['Title'],
        textFieldTooltip:       'Use a semicolon to delimiter multiple keywords.',
        peopleFieldTooltip:     'Use [me] keyword to represent current user.',
        definedClass:           'spwidget-column-dirty',
        showFilterButton:       true,
        showFilterButtonTop:    true,
        filterButtonLabel:      'Filter',
        onFilterClick:          null,
        onReady:                null,
        onReset:                null,
        ignoreKeywords:         /^(of|and|a|an|to|by|the|or|from)$/i,
        delimeter:              ';',
        height:                 null
    };

    /**
     * Given a container, this jQuery plugin will attach a user interface
     * that allows the user to define filter criteria for a list.
     *
     * @param {Object}  options
     * @param {String}  options.list
     * @param {String}  [options.webURL=current site]
     * @param {Array}   [options.columns=['title']]
     * @param {String}  [options.textFieldTooltip='']
     * @param {String}  [options.definedClass='spwidget-column-dirty']
     * @param {Boolean} [options.showFilterButton=true]
     * @param {Boolean} [options.showFilterButtonTop=true]
     * @param {String}  [options.filterButtonLabel='Fitler']
     * @param {String}  [options.onFilterClick=null]
     * @param {String}  [options.onReady=null]
     * @param {String}  [options.ignoreKeywords=RegEx]
     * @param {String}  [options.delimeter=';']
     * @param {Integer}  [options.height=null]
     *
     * @return {jQuery} this
     *
     * METHODS
     *
     *  All methods must be executed on single element.
     *
     *  $(ele).SPFilterPanel("getFilter");
     *
     *      Returns an object with the filter information entered by the user.
     *
     *  $(ele).SPFilterPanel("setFilter", {column: { matchType: "eq", values: [ '1', '2' ]} });
     *
     *      Returns an object with the filter information entered by the user.
     *
     * $(ele).SPFilterPanel("destroy");
     *
     *      Removes the widget from the page.
     *
     */
    $.fn.SPFilterPanel = function(options){

        var arg = arguments;

        // If initialization is not yet done, then do it now
        if ( !Filter.isInitDone ) {

            Filter.isInitDone = true;

            if ( Filter.styleSheet !== "" ) {

                $('<style type="text/css">' + "\n\n" +
                        Filter.styleSheet + "\n\n</style>" )
                    .prependTo("head");

            }

            Filter.templates = $( Filter.htmlTemplate );

        }

        // If input was a string, then must be a method.
        if (typeof options === "string") {

            if (!this.eq(0).hasClass("hasSPFilterPanel")) {

                return;

            }

            return (function(ele){

                // Get the instance object
                var Inst        = ele.eq(0)
                                    .find("div.spwidget-filter")
                                    .data("SPFilterPanelInst"),
                    method      = options.toLowerCase(),
                    response    = Inst.$ele;

                switch (method) {

                    // METHOD----------> getFilter
                    //      Return: {Object}
                    case "getfilter":

                        response = Filter.getFilterValues(Inst);

                        break;

                    // METHOD----------> setFilter("url param")
                    //      Return: $ele
                    case "setfilter":

                        Filter.setFilterValues(Inst, arg[1]);

                        break;

                    // METHOD----------> reset
                    case "reset":

                        Filter.doResetFilter( Inst );

                        break;

                    // METHOD----------> destroy
                    case "destroy":

                        Inst.$ele
                            .removeClass("hasSPFilterPanel")
                            .empty();

                        break;

                } //end: switch()

                return response;

            })(this);

        } //end: if(): options === string

        // --------------------------------
        // Build the plugin on each element
        // --------------------------------
        return this.each(function(){

            var opt     = $.extend({}, $.SPWidgets.defaults.filter, options),
                /**
                 * @class Inst
                 * Widget instance
                 */
                Inst    = {
                    $ele:                   $(this),
                    $ui:                    null,
                    $uiFilterSortCntr:      null,
                    $uiFilterColumnCntr:    null,
                    $uiSortButtons:         null,
                    opt:                    opt
                };

            /**
             * Retrieves the list definition.
             *
             * @return {jQuery.Deferred}
             *      Deferred is resolved with a scope of the jQuery message
             *      object and given 2 parameters - xData and status
             *
             */
            Inst.getListDefinition = function() {

                return $.Deferred(function(dfd){

                    // Get List Definition
                    SPAPI.getList({
                        listName:       opt.list,
                        cacheXML:       true,
                        async:          true,
                        webURL:         opt.webURL,
                        completefunc:   function(xData, status) {

                            var $msg    = $(xData.responseXML);

                            if (status === "error") {

                                dfd.rejectWith($msg, [xData, status]);
                                return;

                            }

                            if ($msg.SPMsgHasError()) {

                                dfd.rejectWith($msg, [xData, status]);
                                return;

                            }

                            dfd.resolveWith($msg, [xData, status]);

                        } //end: completefunc
                    });

                }).promise();

            }; //end: getListDefinition

            /**
             * Shows the column sort order UI on the panel.
             */
            Inst.showSortOrder = function() {

                Inst.$uiFilterColumnCntr.hide();
                Inst.$uiFilterSortCntr.show();

            };

            /**
             * Shows the column filters UI on the panel.
             */
            Inst.showFilterColumns = function() {

                Inst.$uiFilterSortCntr.hide();
                Inst.$uiFilterColumnCntr.show();

            };

            /**
             * Builds the widget in the container element.
             *
             * @return {jQuery.Deferred}
             */
            Inst.buildWidget = function() {

                return $.Deferred(function(dfd){

                    Inst.getListDefinition().then(function(xData, status){

                        var $list   = this,
                            columns = '',
                            colUI   = Filter.templates.filter("#filter_column").html();

                        // Insert the UI into the page and set
                        // pointer ($ui) to it.
                        Inst.$ui = $(
                                Filter.templates
                                    .filter("#filter_main_ui").html()
                            )
                            .appendTo(
                                Inst.$ele
                                    .empty()
                                    .addClass("hasSPFilterPanel")
                            );

                        Inst.$uiFilterColumnCntr = Inst.$ui.find("div.spwidget-filter-column-cntr");
                        Inst.$uiFilterSortCntr   = Inst.$ui.find("div.spwidget-filter-sort-cntr");

                        // Store list definition
                        Inst.$list = $list;

                        // set fixed height if set on input
                        if (Inst.opt.height) {

                            Inst.$uiFilterColumnCntr.css("height", Inst.opt.height);

                        }

                        // Loop through list of columns to display and
                        // build the UI for them.
                        $.each(Inst.opt.columns, function(i,v){

                            // find column in the list definition
                            var $thisCol = $list
                                            .find(
                                                "Field[DisplayName='" +
                                                v + "']" ),
                                thisColUI = colUI,
                                inputUI   = '',
                                values    = null,
                                model     = null;

                            if (!$thisCol.length) {

                                $thisCol = $list
                                            .find("Field[Name='" + v + "']");

                            }

                            if (!$thisCol.length){

                                return;

                            }

                            // Now that we are sure we have a COl. definition,
                            // populate the model for this column
                            model = {
                                type:               null,
                                otherFilterTypes:   '',
                                sp_type:            $thisCol.attr("Type"),
                                sp_format:          $thisCol.attr("Format"),
                                Name:               $thisCol.attr("Name"),
                                DisplayName:        $thisCol.attr("DisplayName")
                            };

                            // Build the column ui based on its type
                            switch ($thisCol.attr("Type")) {

                                // CHOICE: Show checkboxes allowing user to select multiple
                                case "Choice":
                                case "MultiChoice":

                                    $thisCol.find("CHOICES CHOICE").each(function(i,v){

                                        inputUI += $.SPWidgets.fillTemplate(
                                                Filter.templates
                                                    .filter("#filter_choice_field")
                                                        .html(),
                                                {
                                                    DisplayName:    $thisCol.attr("DisplayName"),
                                                    Name:           $thisCol.attr("Name"),
                                                    value:          $(v).text()
                                                }
                                            );

                                    });

                                    thisColUI = thisColUI
                                                .replace(/__COLUMN__UI__/, inputUI)
                                                .replace(/__OTHER_FILTER_TYPES__/, '');

                                    thisColUI = $.SPWidgets.fillTemplate(
                                        thisColUI,
                                        {
                                            DisplayName: $thisCol.attr("DisplayName"),
                                            type:        'choice',
                                            Name:        $thisCol.attr("Name")
                                        }
                                    );

                                    break;

                                // Attachments
                                // Is a Boolean type of field.
                                case "Attachments":

                                    model.type = "boolean";
                                    model.input_ui = '<select name="' + model.Name +
                                        '" class="spwidget-input spwidget-filter-input">' +
                                        '<option value=""></option>' +
                                        '<option value="1">Yes</option>' +
                                        '<option value="0">No</option>' +
                                        '</select>';

                                    thisColUI = $.SPWidgets.fillTemplate(
                                        thisColUI
                                            .replace(/__COLUMN__UI__/, model.input_ui)
                                            .replace(/__OTHER_FILTER_TYPES__/, ''),
                                        model
                                    );

                                    break;

                                //============================================
                                // === all types below use the input field ===
                                //============================================

                                // From here until DEFAUL, we only set the type.
                                case "Lookup":
                                case "LookupMulti":

                                    if (model.type === null) {

                                        model.type = 'lookup';
                                        model.list = $thisCol.attr("List");

                                        if ( model.list === "Self") {

                                            model.list = $list.find("List").attr("Title");

                                        }

                                    }

                                case "User":
                                case "UserMulti":

                                    if (model.type === null) {

                                        model.type = 'people';

                                    }

                                // COUNTER,
                                // Number
                                // Insert additional filter types
                                case "Counter":
                                case "Number":
                                case "RatingCount":
                                case "Likes":

                                    if (model.type === null) {

                                        model.type = 'text';

                                        model.otherFilterTypes =
                                            '<option value="Gt">Greater Than</option>' +
                                            '<option value="Lt">Less Than</option>';

                                    }

                                // Date and Time: Inser additional filter types
                                // We control which type of widget is displayed
                                // by ensuring that the sp_format is set correctly
                                // here.
                                case "DateTime":

                                    if (model.type === null) {

                                        model.type = 'date';

                                        model.otherFilterTypes =
                                            '<option value="Gt">After</option>' +
                                            '<option value="Lt">Before</option>';

                                       model.sp_format = (
                                                $thisCol.attr("Format") !== "DateOnly"
                                            ?   "DateTime"
                                            :   "DateOnly"
                                       );

                                    }

                                // DEFAULT: Show as a text field
                                default:

                                    if (model.type === null) {

                                        model.type = 'text';

                                    }

                                    inputUI = Filter.templates
                                                .filter("#filter_text_field")
                                                    .html();

                                    thisColUI = thisColUI
                                                .replace(/__COLUMN__UI__/, inputUI)
                                                .replace(/__OTHER_FILTER_TYPES__/, model.otherFilterTypes);

                                    thisColUI = $.SPWidgets.fillTemplate(
                                            thisColUI,
                                            $.extend(
                                                model,
                                                {
                                                    DisplayName:    $thisCol.attr("DisplayName"),
                                                    Name:           $thisCol.attr("Name"),
                                                    tooltip:        Inst.opt.textFieldTooltip
                                                })
                                        );

                                    break;

                            } //end: switch()

                            // Add Column UI to list of columns
                            columns += thisColUI;

                        }); //end: .each() - column

                        // Insert the columns into the UI
                        Inst.$uiFilterColumnCntr.html(columns);

                        // Setup Lookup field
                        Inst.$ele.find("div.spwidget-type-lookup input")
                            .each(function(){

                                var $field = $(this);

                                $field.SPLookupField({
                                    list:           $field
                                                        .closest("div.spwidget-column")
                                                        .data("spwidget_list"),
                                    template:       '<div>{{Title}} <span class="spwidgets-item-remove">[x]</span></div>',
                                    listTemplate:   '{{Title}}',
                                    allowMultiples: true,
                                    readOnly:       false,
                                    filter:         '',
                                    showSelector:   true
                                });

                                $field.parent().find(".spwidget-tooltip").remove();

                            });

                        // Setup PEOPLE fields
                        Inst.$ele.find("div.spwidget-type-people input")
                            .each(function(){

                                var $field      = $(this),
                                    colDef      = $list.find(
                                                    "Field[Name='" +
                                                    $field.attr("name") + "']"),
                                    peopleType  = 'User';

                                if (colDef.attr("UserSelectionMode") !== "PeopleOnly") {

                                    peopleType = 'All';

                                }

                                $field.pickSPUser({
                                    allowMultiple:  true,
                                    type:           peopleType
                                });

                                $field.parent().find(".spwidget-tooltip")
                                    .html(Inst.opt.peopleFieldTooltip);

                            });

                        // Setup DATE fields
                        Inst.$ele.find("div.spwidget-type-date")
                            .each(function(){

                                var $column = $(this),
                                    $field  = $column.find("input");

                                $field.SPDateField({
                                    allowMultiples: true,
                                    showTimepicker: (
                                            $column.data("spwidget_sp_format") === "DateTime"
                                            ?   true
                                            :   false
                                        )
                                });

                                $column.find(".spwidget-tooltip").remove();
                                $column.find("select.spwidget-filter-type")
                                    .val("Eq")
                                    .find("option[value='Contains']").remove();

                                return this;

                            });

                        // Setup the Boolean fields
                        Inst.$ele
                            .find(".spwidget-type-boolean div.spwidget-filter-type-cntr")
                                .css("display", "none");

                        // Setup the Button on the UI (if applicable)
                        if (Inst.opt.showFilterButton || Inst.opt.showFilterButtonTop) {

                            Inst.$ui.find("div.spwidget-filter-button-cntr")
                                .each(function(){

                                    var $btnCntr  = $(this),
                                        $btn      = $();

                                    // If Top button is true, clone adn insert at top
                                    if (Inst.opt.showFilterButtonTop) {

                                        $btn = $btn
                                                .add( $btnCntr.clone(true) )
                                                .prependTo( Inst.$ui );

                                    }

                                    // If BOttom Button is true, then added to
                                    // group selection... if not, then remove it.
                                    if (Inst.opt.showFilterButton) {

                                        $btn = $btn.add( $btnCntr );

                                    } else {

                                        $btnCntr.remove();

                                    }

                                    // Setup Filter button
                                    $btn.find("button[name='filter']")
                                        .button({
                                            icons: {
                                                primary: "ui-icon-search"
                                            },
                                            label: Inst.opt.filterButtonLabel
                                        })
                                        .on("click", Filter.onFilterButtonClick);

                                    // Setup Filter button
                                    $btn.find("button[name='reset']")
                                        .button({
                                            icons: {
                                                primary: "ui-icon-arrowreturnthick-1-n"
                                            },
                                            text: false
                                        })
                                        .on("click", function(ev){

                                            Filter.doResetFilter( Inst );

                                            return this;

                                        });

                                });

                        // Else, remove button container
                        } else {

                            Inst.$ui
                                .find("div.spwidget-filter-button-cntr")
                                    .remove();

                        }

                        // Bind events
                        Inst.$ui
                            // Filter type change()
                            .on(
                                "change.SPWidgets.SPFilterPanel",
                                "select.spwidget-filter-type,select.spwidget-sort-order",
                                Filter.onFilterTypeChange
                            )
                            .on(
                                "click.SPWidgets.SPFilterpanel",
                                "a.spwidget-column-action",
                                Filter.onFilterTypeChange
                            );

                        // If we have a DefinedClass specified, then
                        // listen to change events
                        if (Inst.opt.definedClass !== "") {

                            Inst.$ui
                                .on(
                                    "change.SPWidgets.SPFilterPanel",
                                    ".spwidget-filter-input",
                                    Filter.onFilterInputChange
                                );

                        }

                        // Store the Widget Inst object in the UI
                        Inst.$ui
                            .data("SPFilterPanelInst", Inst);

                        // If a onReady callback was defined, then
                        // execute it now
                        if ($.isFunction(Inst.opt.onReady)) {

                            Inst.opt.onReady.call(Inst.$ele, options);

                        }

                        // Make the UI visible
                        Inst.$ui
                            .fadeIn().promise().then(function(){

                                $(this).css("display", "");

                                dfd.resolve();

                            });

                    }) //end: .then()
                    // IF getting the List definition fails, then display error
                    // in the widget container element.
                    .fail(function(xData, status){

                        var $msg = this;

                        Inst.$ele
                            .html(
                                '<div class="ui-state-error">Unable to retrieve list information. ' +
                                $msg.SPGetMsgError() + '</div>' );

                        dfd.reject();

                    });


                }).promise();

            }; //end: Inst.buildWidget()

            // A few validations

            if (    Inst.opt.ignoreKeywords
                &&  !Inst.opt.ignoreKeywords instanceof RegExp
            ) {

                Inst.opt.ignoreKeywords = /Inst.opt.ignoreKeywords/i;

            }

            // build the widget
            Inst.buildWidget();

            return this;

        }); //end: return()

    }; //end: $.fn.SPFilterPanel()

    /**
     * Triggered when the change event is triggered on the
     * input elements that collect data from the user.
     * Sets the dirty class on the column if one is defined.
     *
     * @param {jQuery.Event} ev
     *
     * @return {HTMLElement} this
     */
    Filter.onFilterInputChange = function(ev){

        var $input      = $(this),
            $cntr       = $input.closest("div.spwidget-filter-value-input"),
            $col        = $cntr.closest("div.spwidget-column"),
            matchType   = $col.find("div.spwidget-filter-type-cntr select.spwidget-filter-type").val(),
            val         = $input.val(),
            Inst        = $cntr
                            .closest("div.spwidget-filter")
                            .data("SPFilterPanelInst");

        if ($col.is(".spwidget-type-choice")) {

            if (!$cntr.find(".spwidget-filter-input:checked").length) {

                val = "";

            }

        }

        if (Filter.isColumnDirty($col)) {

            $col.addClass(Inst.opt.definedClass);

        } else {

            $col.removeClass(Inst.opt.definedClass);

        }

        return this;

    }; //end: Filter.onFilterInputChange()

    /**
     * Bound to the $ui. Listen for changes in the filter type
     * select element.
     *
     * @param {jQuery.Event} ev
     *
     * return {jQuery} this
     */
    Filter.onFilterTypeChange = function(ev) {

        var $ele            = $(this),
            $col            = $ele.closest("div.spwidget-column"),
            $logicalType    = $col.find("div.spwidget-filter-type-cntr select.spwidget-match-type"),
            $colValCntr     = $col.find("div.spwidget-filter-value-cntr"),
            $colInput       = $colValCntr.find(".spwidget-input"),
            inputVal        = '',
            colType         = $col.data("spwidget_column_type"),
            eleValue        = $ele.val(),
            Inst            = $ele
                                .closest("div.spwidget-filter")
                                .data("SPFilterPanelInst");

                // If its the sort column, then show/hide order buttons
        if ($ele.is("select.spwidget-sort-order")) {

            if ($ele.val()) {

                $col.addClass('spwidget-has-sort-order');
                $col.addClass(Inst.opt.definedClass);

            } else {

                $col.removeClass('spwidget-has-sort-order');

                // revove dirty flag if no value set
                if (!Filter.isColumnDirty($col)) {

                    $col.removeClass(Inst.opt.definedClass);

                }

            }

            return;

        }

        // IF its a column action, then move the column around or close it
        if ($ele.is("a.spwidget-column-action")) {

            inputVal = $ele.data("action");

            if (inputVal === "up" || inputVal === "down") {

                Filter.moveColumn($col, (inputVal === "up" ? true : false));

            }

            return;

        }

        // ELSE, must be one of the Filter Type dropdowns.
        if (eleValue === "IsNull" || eleValue === "IsNotNull") {

            $colValCntr.addClass("spwidget-disabled");
            $colInput.attr("disabled", "disabled");
            $logicalType.attr("disabled", "disabled");
            $col.addClass(Inst.opt.definedClass);

        } else {

            $colValCntr.removeClass("spwidget-disabled");
            $colInput.removeAttr("disabled", "disabled");
            $logicalType.removeAttr("disabled");

            // Remove the higlight class from the column if
            // no value is defined for it. For Checkboxes (choice)
            // we need to first grab the checkboxes and then see
            // if they are checked.
            if (!Filter.isColumnDirty($col)) {

                $col.removeClass(Inst.opt.definedClass);

            }

        }

        return this;

    }; //end: Filter.onFilterTypeChange()

    /**
     * Calls the user defined function when user clicks the filter button.
     *
     * @param {jQuery.Event} ev
     *
     * @return {HTMLElement} this
     */
    Filter.onFilterButtonClick = function(ev) {

        var Inst    = $(this)
                        .closest("div.spwidget-filter")
                        .data("SPFilterPanelInst"),
            filters = null;

        if ( $.isFunction( Inst.opt.onFilterClick ) ) {

            filters = Filter.getFilterValues(Inst);

            Inst.opt.onFilterClick.call( Inst.$ele, filters );

        }

        return this;

    }; //end: Filter.onFilterButtonClick()

    /**
     * Resets the filter panel, by removing all filters
     * defined from the form.
     *
     * @param {Object} Inst
     *      The widget instance object
     *
     * @return {Object} the instance object
     */
    Filter.doResetFilter = function(Inst) {

        if ($.isFunction(Inst.onReset)) {

            if (Inst.onReset.call(Inst.$ele, Filter.getFilterValues(Inst)) === true) {

                return Inst;

            }

        }

        Inst.$ui
            // Reset regular text fields
            .find("div[data-spwidget_column_type='text'] input")
                .val("")
                .end()
            // reset checkboxes for CHOICE columns
            .find("div[data-spwidget_column_type='choice'] input")
                .prop("checked", false)
                .end()
            // reset dropdown boxes
            .find("div[data-spwidget_column_type='boolean'] .spwidget-filter-value-input select")
                .val("")
                .end()
            // reset people fields
            .find(".hasPickSPUser")
                .pickSPUser("method", "clear")
                .end()
            // reset date fields
            .find(".hasSPDateField")
                .SPDateField("reset")
                .end()
            // reset lookup fields
            .find(".hasLookupSPField")
                .SPLookupField("method", "clear");

        // Remove the Defined class
        if (Inst.opt.definedClass !== "") {

            Inst.$ui
                .find("." + Inst.opt.definedClass)
                .removeClass(Inst.opt.definedClass);

        }

        // Reset any IsNull and IsNotNull filters
        Inst.$ui.find("select.spwidget-filter-type").each(function(){

            var $ele    = $(this),
                value   = $ele.val();

            if (value === "IsNull" || value === "IsNotNull") {

                $ele.val("Eq");
                $ele.change();

            }

        });

        // reset the sort Order column
        Inst.$ui.find("select.spwidget-sort-order").val("").change();

        return Inst;

    }; // Filter.doResetFilter()

    /**
     * Generates the filters from the values entered by the user.
     *
     * @param {SPFilterPanel.Instance} Inst
     *      The Instance object generated by the $().SPFilterPanel()
     *
     * @return {Object}
     *      An object with the filter information. See below for the
     *      structured of the object
     *
     * @example
     *
     *      Filter.getFilterValues(instObject);
     *
     *      {
     *          CAMLQuery: 'string with query wrapped in an <And> aggregate',
     *          URLParams: 'String with query in URL params style',
     *          filters: {
     *              columnInternalName: {
     *                  matchType: 'Eq',
     *                  values: [
     *                      'filter value 1',
     *                      'filter value 2',
     *                      etc...
     *                  ],
     *                  CAMLQuery: 'string with query wrapped in an <Or> aggregate',
     *                  URLParams: 'string with query in URL param style',
     *                  count: 0
     *              }
     *          },
     *          count: 2 // number of filters created
     *      }
     *
     *
     */
    Filter.getFilterValues = function(Inst) {

        var filters = {
                CAMLQuery:  '',
                CAMLOrderBy: '',
                URLParams:  '',
                filters:    {},
                count:      0
            },
            $cols           = Inst.$ui.find("div.spwidget-column"),
            colFilters      = [],
            orderByValues   = '';


        /**
         * Returns a CAMLQuery for the set of individual column filters.
         * USed in fields of type Choice or Text.
         *
         * @param {Object} colFilterObj
         *          The object for the individual column
         *
         * @return {String} caml query
         *
         */
        function getColumnCAMLQuery(colFilterObj) {

            return $.SPWidgets.getCamlLogical({
                    type:           colFilterObj.logicalType,
                    values:         colFilterObj.values,
                    onEachValue:    function(filterVal){

                        return "<" + colFilterObj.matchType +
                                "><FieldRef Name='" + colFilterObj.columnName +
                                "' /><Value Type='Text'>" +
                                $.SPWidgets.escapeXML(filterVal) +
                                "</Value></" + colFilterObj.matchType + ">";

                    }
                });

        } //end: getColumnCAMLQuery()

        // Loop through each column and build the data
        $cols.each(function(i,v){

            var $thisCol        = $(v),
                $input          = $thisCol.find(".spwidget-input"),
                colName         = $input.attr("name"),
                thisColFilter   = (new Filter.ColumnFilter({
                    columnName:     colName,
                    matchType:      $thisCol
                                        .find("select.spwidget-filter-type")
                                        .val(),
                    logicalType:    $thisCol
                                        .find("select.spwidget-match-type")
                                        .val(),
                    sortOrder:      $thisCol
                                        .find("select.spwidget-sort-order")
                                        .val()
                })),
                colFilterWasSet = false,
                colType         = $thisCol.data("spwidget_column_type"),
                thisColUrlParam = {};

            // If this columns has sort set, add it to list
            if (thisColFilter.sortOrder) {

                thisColFilter.CAMLOrderBy += '<FieldRef Name="' + colName +
                    '" Ascending="' +
                (
                    thisColFilter.sortOrder === "Asc" ?
                    'TRUE"' : 'FALSE"'

                ) + '/>';

            }

            // If the match type is IsNull or IsNotNull, then
            // build the match now... don't need to know which type
            // of column for these.
            if (    thisColFilter.matchType === "IsNull"
                ||  thisColFilter.matchType === "IsNotNull"
            ) {

                thisColFilter.CAMLQuery =
                    "<" + thisColFilter.matchType + "><FieldRef Name='" +
                    colName + "' /></" + thisColFilter.matchType + ">";

                thisColFilter.count += 1;

            // ELSE, process the column type
            } else {

                // Process column type user input
                switch(colType) {

                    // -------------------- CHOICE COLUMNS
                    case "choice":
                    case "multichoice":

                        $input.each(function(){

                            var $checkbox   = $(this),
                                checkboxVal = $checkbox.val();

                            if ($checkbox.is(":checked")) {

                                thisColFilter.values.push(checkboxVal);

                            }

                        });

                        if (thisColFilter.values.length) {

                            thisColFilter.count = thisColFilter.values.length;
                            thisColFilter.CAMLQuery = getColumnCAMLQuery(thisColFilter);

                        }

                        break;

                    // -------------------- LOOKUP COLUMNS
                    // -------------------- PEOPLE COLUMNS
                    case "lookup":
                    case "people":

                        (function(){

                            var lookupIDs = [];

                            $input.each(function(){


                                var $lookup     = $(this),
                                    lookupVals  = $.SPWidgets
                                                    .parseLookupFieldValue(
                                                        $lookup.val()
                                                    ),
                                    i,j;

                                for(i=0,j=lookupVals.length; i<j; i++){

                                    if (lookupVals[i].id) {

                                        thisColFilter.values
                                            .push(
                                                lookupVals[i].id + ";#" +
                                                lookupVals[i].title
                                            );

                                        lookupIDs.push(lookupVals[i].id);

                                    }

                                }

                            });

                            if (thisColFilter.values.length) {

                                thisColFilter.count     = thisColFilter.values.length;
                                thisColFilter.CAMLQuery = $.SPWidgets.getCamlLogical({
                                        type:           thisColFilter.logicalType,
                                        values:         lookupIDs,
                                        onEachValue:    function(filterVal){

                                            return "<" + thisColFilter.matchType +
                                                    "><FieldRef Name='" + thisColFilter.columnName +
                                                    "' LookupId='True'/><Value Type='Lookup'>" +
                                                    filterVal + "</Value></" + thisColFilter.matchType + ">";

                                        }
                                    });

                            }


                        })();

                        break;

                    // -------------------- DATE FIELDS
                    case "date":

                        $input.each(function(){

                            var dtObj = $input.SPDateField("getDate");

                            if (dtObj.dates.length) {

                                thisColFilter.values    = dtObj.dates;
                                thisColFilter.count     = thisColFilter.values.length;
                                thisColFilter.CAMLQuery = $.SPWidgets.getCamlLogical({
                                    type:           thisColFilter.logicalType,
                                    values:         thisColFilter.values,
                                    onEachValue:    function(filterVal){

                                        return "<" + thisColFilter.matchType +
                                                "><FieldRef Name='" +
                                                thisColFilter.columnName +
                                                "'/><Value Type='DateTime'>" +
                                                filterVal + "</Value></" +
                                                thisColFilter.matchType + ">";

                                    }
                                });

                            }

                            return false;

                        });

                        break;

                    // -------------------- TEXT COLUMNS
                    case "text":
                    case "boolean":

                        // ELSE, if user entered text, then parse it
                        if ( String( $.trim( $input.val() ) ).length ) {

                            (function(){

                                var keywords = $input.val().split(Inst.opt.delimeter),
                                    i,j,
                                    thisKeyword;

                                // Loop thorugh all keywords.
                                for( i=0,j=keywords.length; i<j; i++ ){

                                    thisKeyword = $.trim(keywords[i]);

                                    if (    !Inst.opt.ignoreKeywords.test(thisKeyword)
                                        &&  thisKeyword
                                    ) {

                                        thisColFilter.values.push(thisKeyword);

                                    }
                                }

                                thisColFilter.CAMLQuery = getColumnCAMLQuery(thisColFilter);

                                thisColFilter.count = thisColFilter.values.length;

                            })();

                        }

                        break;

                } //end: switch() - type of column

            } //end if()

            // If filters where built for this column, then add it to the
            // list of column that the user entered values for.
            if (thisColFilter.count > 0 || thisColFilter.CAMLOrderBy) {

                thisColUrlParam[ colName ] = {};

                // If OrderBY value were defined for this column, then add it
                // to overall filter
                if (thisColFilter.CAMLOrderBy) {

                    orderByValues += thisColFilter.CAMLOrderBy;
                    thisColUrlParam[colName].sortOrder = thisColFilter.sortOrder;

                }

                // If we have a filter defined for this column, then
                // prepare it for the overall query.
                if (thisColFilter.count > 0) {

                    colFilters.push(thisColFilter.CAMLQuery);
                    filters.count += thisColFilter.count;
                    filters.filters[colName] = thisColFilter;

                    // Create the URLParams for this column filter value
                    thisColUrlParam[colName].matchType      = thisColFilter.matchType;
                    thisColUrlParam[colName].logicalType    = thisColFilter.logicalType;
                    thisColUrlParam[colName].values         = thisColFilter.values;

                }

                thisColFilter.URLParams = $.param(thisColUrlParam, false);

                // Add this column's URL params to the overall filter value
                if (filters.URLParams !== "") {

                    filters.URLParams += "&";

                }

                filters.URLParams += thisColFilter.URLParams;

            }

        });

        // Build the CAMLQuery
        if (filters.count > 1) {

            filters.CAMLQuery = $.SPWidgets.getCamlLogical({
                                    type:   'AND',
                                    values: colFilters
                                });

        } else if (filters.count === 1 ) {

            filters.CAMLQuery = colFilters[0];

        }

        // If we have OrderBy values, add it on to Filter CAML
        if (orderByValues) {

            filters.CAMLOrderBy += '<OrderBy>' + orderByValues + '</OrderBy>';

        }

        return filters;

    }; // Filter.getFilterValues()

    /**
     * Clears the current panel and populates it with the
     * filter criteria defined on the input object
     *
     * @param {Object} Inst
     *      The instance object for the widget on the page
     * @param {String} filters
     *      An object with the column criteria to be set.
     *      format of object:
     *          {
     *              columnInternalName: {
     *                  matchType: "",
     *                  values: [
     *                      'value 1',
     *                      'value 2'
     *                  ]
     *              }
     *          }
     *
     * @return {Object} Inst
     */
    Filter.setFilterValues = function(Inst, filters) {

        // If filters is not an object or is an empty object, exit
        if (typeof filters !== "object" || $.isEmptyObject(filters)) {

            return Inst;

        }

        Filter.doResetFilter(Inst);

        $.each(filters, function(column, filter){

            var $input          = Inst.$ui.find(".spwidget-filter-input[name='" + column + "']"),
                $colUI          = $input.closest("div.spwidget-column"),
                type            = $colUI.data("spwidget_column_type"),
                $match          = $colUI.find("select[name='" + column + "_type']"),
                $logicalType    = $colUI.find("div.spwidget-filter-type-cntr select.spwidget-match-type"),
                $sortOrder      = $colUI.find("select.spwidget-sort-order"),
                thisFilter      = new Filter.ColumnFilter();

            $.extend(thisFilter, filter);

            // If we have a matchType or logicalType, then set it
            if (type !== "boolean") {

                if (thisFilter.matchType && type !== "boolean") {

                    $match.val(thisFilter.matchType);

                }

                if (thisFilter.logicalType) {

                    $logicalType.val(thisFilter.logicalType);

                }

            }

            // if match type is IsNull or IsNotNull, then no need to set column value
            if (    type === "boolean"
                || (    filter.matchType !== "IsNull"
                    &&  filter.matchType !== "IsNotNull"
                    )
            ) {

                // Populate the values
                switch (type) {

                    case "text":
                    case "boolean":

                        if (thisFilter.values instanceof Array) {

                            $input.val(thisFilter.values.join(Inst.opt.delimeter));

                        } else {

                            $input.val(thisFilter.values);

                        }

                        break;

                    case "choice":
                    case "multichoice":

                        $.each(thisFilter.values, function(i, colVal){

                            $input
                                .filter("[value='" + colVal + "']")
                                    .prop("checked", true);

                        });

                        break;

                    case "lookup":

                        $input.SPLookupField("method", "add",
                            thisFilter.values.join(";#") );

                        break;

                    case "people":

                        $input.pickSPUser("method", "add",
                            thisFilter.values.join(";#") );

                        break;

                    case "date":

                        // If dateTime value, then let SPDateField parse values
                        if ($colUI.data("spwidget_sp_format") === "DateTime") {

                            $input.SPDateField('setDate', thisFilter.values);

                        // Regular dates - Provide format input
                        } else {

                            $input.SPDateField('setDate', thisFilter.values, 'yy-mm-dd');

                        }

                        break;

                }

            // ELSE: Must have been IsNull or IsNotNull. trigger change
            // event on dropdown so that column can be properly highlighted.
            } else {

                $match.change();

            } //end: if()

            // if we have a sort order, then set it now
            if (thisFilter.sortOrder) {

                // Ascending
                if (String(thisFilter.sortOrder).toLowerCase() === "asc") {

                    $sortOrder.val("Asc");

                } else {

                    $sortOrder.val("Des");

                }

            }

            $sortOrder.change();
            $input.change();

        }); //end: each(): thisFilter

        return Inst;

    }; //end: Filter.setFilterValues()

    /**
     * Create a new instance of a Column object.
     *
     * @constructor
     *
     * @param {Object} inst
     *      The initial object of values
     *
     * @return {Filter.ColumnFilter}
     *
     */
    Filter.ColumnFilter = function(inst) {

        var Column = function(){},
            newCol = new Column();

        if (typeof inst !== "object") {

            inst = {};

        }

        newCol.columnName   = inst.columnName || '';
        newCol.matchType    = inst.matchType || '';
        newCol.logicalType  = inst.logicalType || '';
        newCol.sortOrder    = inst.sortOrder || '';
        newCol.values       = inst.values || [];
        newCol.CAMLQuery    = inst.CAMLQuery || '';
        newCol.CAMLOrderBy  = inst.CAMLOrderBy || '';
        newCol.URLParams    = inst.URLParams || '';
        newCol.count        = inst.count || 0;

        return newCol;

    }; //end: ColumnFilter()

    /**
     * Moves a column up or down among the other columns
     *
     * @param {jQuery} $col
     * @param {Boolean} [moveUp=false]
     *
     */
    Filter.moveColumn = function($col, moveUp){

        var $allCols = $col.parent().children(),
            total    = $allCols.length,
            colIndex = $allCols.index($col);

        if (moveUp && colIndex === 0) {

            return;

        }

        if (!moveUp && (colIndex + 1) === total) {

            return;

        }

        if (moveUp) {

            $col.insertBefore($col.prev());

        } else {

            $col.insertAfter($col.next());

        }

    };

    /**
     * Returns a boolean indicating whether the column is dirty or not.
     *
     * @param {jQuery} $col
     *
     * @return {Boolean}
     */
    Filter.isColumnDirty = function($col){

        var response    = false,
            colType     = $col.data("spwidget_column_type"),
            $colInput   = $col.find(".spwidget-input");

        // Lets check the value of the field first.
        if (colType === "choice" || colType === "multichoice") {

            $colInput.filter(":checkbox").each(function(){

                var $this = $(this);

                if ($this.is(":checked")) {

                    response = true;
                    return false;

                }

            });

        } else if ($colInput.val()) {

            response = true;

        }

        // If response is still false, lets check on the select fields
        // that can still impact column definition
        if (!response) {

            $colInput = $col.find("select.spwidget-sort-order");

            if ($colInput.val()) {

                response = true;

            }

        }

        return response;

    };

    /**
     * @property
     * Stores the Style sheet that is inserted into the page the first
     * time SPFilterPanel() is called.
     * Value is set at build time.
     */
    Filter.styleSheet = "/**\n"
+ " * Stylesheet for the Board widget\n"
+ " *\n"
+ " * BUILD: August 23, 2014 - 10:14 AM\n"
+ " */\n"
+ "div.spwidget-filter {\n"
+ "    width: 100%;\n"
+ "    position: relative;\n"
+ "}\n"
+ "div.spwidget-filter .spwidget-date-cntr,\n"
+ "div.spwidget-filter .spwidgets-lookup-cntr {\n"
+ "    display: block;\n"
+ "}\n"
+ "div.spwidget-filter .spwidget-filter-column-cntr {\n"
+ "    overflow:auto;\n"
+ "    position: relative;\n"
+ "}\n"
+ "/* Adjust the width of the widget inputs inside the filter panel */\n"
+ "div.spwidget-filter .spwidget-type-text input.spwidget-filter-input,\n"
+ "div.spwidget-filter .spwidget-type-people input.ui-autocomplete-input,\n"
+ "div.spwidget-filter div.spwidget-type-choice div.spwidget-filter-value-input {\n"
+ "    width: 95%;\n"
+ "}\n"
+ "\n"
+ "div.spwidget-filter .spwidgets-lookup-cntr {\n"
+ "    width: 96%;\n"
+ "}\n"
+ "div.spwidget-filter .spwidget-date-cntr div.spwidget-date-input-cntr {\n"
+ "    width: 97%\n"
+ "}\n"
+ "\n"
+ "/* FIELD CONTAINER */\n"
+ "div.spwidget-filter div.spwidget-column {\n"
+ "    padding: .5em;\n"
+ "    margin: .5em;\n"
+ "    position: relative;\n"
+ "    border-bottom: 1px solid  darkgray;\n"
+ "    box-shadow: 1px 1px 1px 0 lightgray inset;\n"
+ "}\n"
+ "\n"
+ "/* FIELD ACTIONS */\n"
+ "div.spwidget-filter div.spwidget-column-actions {\n"
+ "    position: absolute;\n"
+ "    right: 1%;\n"
+ "    top: 10%;\n"
+ "}\n"
+ "div.spwidget-filter div.spwidget-column-actions a {\n"
+ "    display:block;\n"
+ "}\n"
+ "\n"
+ "div.spwidget-filter div.spwidget-column-sort-actions {\n"
+ "    display:none\n"
+ "}\n"
+ "\n"
+ "div.spwidget-filter div.spwidget-has-sort-order div.spwidget-column-sort-actions {\n"
+ "    display: block;\n"
+ "}\n"
+ "\n"
+ "/* DIMED ITEMS - FULL OPACITY ON HOVER */\n"
+ "div.spwidget-filter div.spwidget-filter-type-cntr,\n"
+ "div.spwidget-filter div.spwidget-column-actions a {\n"
+ "    opacity: .6;\n"
+ "    filter: Alpha(opacity=60);\n"
+ "}\n"
+ "div.spwidget-filter div.spwidget-filter-type-cntr:hover,\n"
+ "div.spwidget-filter div.spwidget-column-actions a:hover {\n"
+ "    opacity: 1;\n"
+ "}\n"
+ "/* FILTER OPTIONS */\n"
+ "div.spwidget-filter div.spwidget-filter-type-cntr {\n"
+ "    position: absolute;\n"
+ "    font-size: .8em;\n"
+ "    top: .6em;\n"
+ "    right: 8%;\n"
+ "}\n"
+ "div.spwidget-filter div.spwidget-filter-type-cntr select {\n"
+ "    text-overflow: ellipsis;\n"
+ "    width: 5em;\n"
+ "}\n"
+ "\n"
+ "/* FILTER VALUE CONTAINER */\n"
+ "div.spwidget-filter div.spwidget-filter-value-cntr {\n"
+ "    width: 96%;\n"
+ "}\n"
+ "\n"
+ "div.spwidget-filter div.spwidget-filter-value-cntr > label {\n"
+ "    display: block;\n"
+ "    padding: .2em;\n"
+ "    font-weight: bold;\n"
+ "}\n"
+ "div.spwidget-filter div.spwidget-column-dirty div.spwidget-filter-value-cntr > label {\n"
+ "    color: #FF0000;\n"
+ "}\n"
+ "div.spwidget-filter .spwidget-tooltip {\n"
+ "    display: block;\n"
+ "    font-size: .8em;\n"
+ "    font-style: italic;\n"
+ "}\n"
+ "\n"
+ "/* LOOKUP FIELDS */\n"
+ "div.spwidget-filter div.spwidgets-lookup-cntr div.spwidgets-lookup-selected > div.spwidgets-item {\n"
+ "    display: block;\n"
+ "    margin-left: 0px;\n"
+ "}\n"
+ "\n"
+ "/* CHOICE FIELDS */\n"
+ "div.spwidget-filter div.spwidget-type-choice div.spwidget-filter-value-input {\n"
+ "    max-height: 6em;\n"
+ "    overflow: auto;\n"
+ "    -moz-appearance: textfield;\n"
+ "    -webkit-appearance: textfield;\n"
+ "    background-color: white;\n"
+ "    background-color: -moz-field;\n"
+ "    border: 1px solid  darkgray;\n"
+ "    box-shadow: 1px 1px 1px 0 lightgray inset;\n"
+ "    font: -moz-field;\n"
+ "    font: -webkit-small-control;\n"
+ "    padding: 2px 5px;\n"
+ "}\n"
+ "div.spwidget-filter div.spwidget-type-choice div.spwidget-filter-value-input label {\n"
+ "    display: block;\n"
+ "    padding: .2em;\n"
+ "}\n"
+ "\n"
+ "/** DISABLED COLUMN VALUE CONTAINER */\n"
+ "div.spwidget-filter .spwidget-disabled {\n"
+ "    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)\";\n"
+ "    filter: alpha(opacity=50);\n"
+ "    opacity: 0.5;\n"
+ "}\n"
+ "\n"
+ "/** Button container */\n"
+ "div.spwidget-filter div.spwidget-filter-button-cntr {\n"
+ "    padding: .5em 4%;\n"
+ "    margin-top: .5em;\n"
+ "    text-align: right;\n"
+ "}\n"
+ "\n";
//_HAS_FILTER_CSS_TEMPLATE_

    /**
     * @property
     * Stores the HTML template for each Filter widget.
     * Value is set at build time.
     */
    Filter.htmlTemplate = "<script type=\"text/html\" id=\"filter_main_ui\">\n"
+ "    <div class=\"spwidget-filter\" style=\"display: none;\">\n"
+ "        <div class=\"spwidget-filter-column-cntr ui-widget-content\"></div>\n"
+ "        <div class=\"spwidget-filter-button-cntr\">\n"
+ "            <button type=\"button\" class=\"spwidget-button ui-priority-secondary\" name='reset'>Reset</button>\n"
+ "            <button type=\"button\" class=\"spwidget-button\" name='filter'>Filter</button>\n"
+ "        </div>\n"
+ "    </div>\n"
+ "\x3c/script>\n"
+ "<script type=\"text/html\" id=\"filter_column\">\n"
+ "    <div class=\"spwidget-column spwidget-type-{{type}}\"\n"
+ "            data-spwidget_column_type=\"{{type}}\"\n"
+ "            data-spwidget_list=\"{{list}}\"\n"
+ "            data-spwidget_sp_type=\"{{sp_type}}\"\n"
+ "            data-spwidget_sp_format=\"{{sp_format}}\" >\n"
+ "        <div class=\"spwidget-filter-value-cntr\">\n"
+ "            <label>{{DisplayName}}</label>\n"
+ "            <div class=\"spwidget-filter-value-input\">\n"
+ "                __COLUMN__UI__\n"
+ "            </div>\n"
+ "        </div>\n"
+ "        <div class=\"spwidget-filter-type-cntr\" title=\"Match Options\">\n"
+ "            <select name=\"{{Name}}_type\" class=\"spwidget-filter-type\" tabindex=\"-1\">\n"
+ "                <option value=\"Contains\">Contains</option>\n"
+ "                <option value=\"Eq\" selected=\"selected\">Equal</option>\n"
+ "                <option value=\"Neq\">Not Equal</option>\n"
+ "                <option value=\"IsNull\">Is Blank</option>\n"
+ "                <option value=\"IsNotNull\">Is Not Blank</option>\n"
+ "                __OTHER_FILTER_TYPES__\n"
+ "            </select>\n"
+ "            <select name=\"{{Name}}_match\" class=\"spwidget-match-type\" tabindex=\"-1\">\n"
+ "                <option value=\"Or\" selected=\"selected\">Any</option>\n"
+ "                <option value=\"And\">All</option>\n"
+ "            </select>\n"
+ "            <select name=\"{{Name}}_order\" class=\"spwidget-sort-order\" tabindex=\"-1\">\n"
+ "                <option value=\"\" selected=\"selected\">Sort</option>\n"
+ "                <option value=\"Asc\">&#9650; Ascending</option>\n"
+ "                <option value=\"Des\">&#9660; Descending</option>\n"
+ "            </select>\n"
+ "        </div>\n"
+ "        <div class=\"spwidget-column-actions\">\n"
+ "            <a style=\"display:none;\" href=\"javascript:\" tabindex=\"-1\" data-action=\"remove\" class=\"spwidget-column-action\">\n"
+ "                <span class=\"ui-icon ui-icon-circle-close\">remove</span>\n"
+ "            </a>\n"
+ "            <div class=\"spwidget-column-sort-actions\">\n"
+ "                <a href=\"javascript:\" tabindex=\"-1\" data-action=\"up\" class=\"spwidget-column-action\" title=\"Move up\">\n"
+ "                    <span class=\"ui-icon ui-icon-circle-arrow-n\">Move Up</span>\n"
+ "                </a>\n"
+ "                <a href=\"javascript:\" tabindex=\"-1\" data-action=\"down\" class=\"spwidget-column-action\" title=\"Move down\">\n"
+ "                    <span class=\"ui-icon ui-icon-circle-arrow-s\">Move Down</span>\n"
+ "                </a>\n"
+ "            </div>\n"
+ "        </div>\n"
+ "    </div>\n"
+ "\x3c/script>\n"
+ "<script type=\"text/html\" id=\"filter_text_field\">\n"
+ "    <input name=\"{{Name}}\" title=\"{{DisplayName}}\" type=\"text\" value=\"\" class=\"spwidget-input spwidget-filter-input\" />\n"
+ "    <span class=\"spwidget-tooltip\">{{tooltip}}</span>\n"
+ "\x3c/script>\n"
+ "<script type=\"text/html\" id=\"filter_choice_field\">\n"
+ "    <label>\n"
+ "        <input name=\"{{Name}}\" title=\"{{DisplayName}}\" type=\"checkbox\" value=\"{{value}}\" class=\"spwidget-input spwidget-filter-input\" />\n"
+ "        {{value}}\n"
+ "    </label>\n"
+ "\x3c/script>\n";
//_HAS_FILTER_HTML_TEMPLATE_

})(jQuery); /***** End of module: jquery.SPFilterPanel.js */


})(jQuery, window, document);
