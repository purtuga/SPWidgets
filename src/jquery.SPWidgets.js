/**
 * @fileOverview jquery.SPWidgets.js
 * jQuery plugin offering multiple Sharepoint widgets that can be used
 * for creating customized User Interfaces (UI).
 *  
 * @version _BUILD_VERSION_NUMBER_
 * @author  Paul Tavares, www.purtuga.com, paultavares.wordpress.com
 * @see     http://purtuga.github.com/SPWidgets/
 * 
 * @requires jQuery.js {@link http://jquery.com}
 * @requires jQuery-ui.js {@link http://jqueryui.com}
 * @requires jquery.SPServices.js {@link http://spservices.codeplex.com}
 * 
 * Build Date:  _BUILD_VERSION_DATE_
 * Version:     _BUILD_VERSION_NUMBER_
 * 
 */
;(function($){
    
    // Local pointer to jQuery given on input
    var jQuery = $;
    
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
        $.SPWidgets.version     = "_BUILD_VERSION_NUMBER_";
        $.SPWidgets.defaults    = {};
        
        /**
         * Given an XML message as returned by the Sharepoint WebServices API,
         * this method will check if it contains an error and return a boolean
         * indicating that. 
         * 
         *  @return {Boolean} true|false
         * 
         */
        $.fn.SPMsgHasError = function() {
            
            var spErrCode   = $(this).find("ErrorCode"),
                response    = false;
            
            if ( !spErrCode.length ) {
                
                if ( $(this).find("faultcode").length ) {
                    
                    return true;
                    
                } else {
                    
                    return false;
                    
                }
                
            } 
            
            spErrCode.each(function(){
                
                if ( $(this).text() !== "0x00000000" ) {
                    
                    response = true;
                    return false;
                    
                }
                
            });
            
            return response;
            
        }; /* $.fn.SPMsgHasError() */
        
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
            
            var opt = {},i,j,x,y,item;
            
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
                
                data = [ data ];
                
            }
            
            if (opt.tokens !== null) {
                
                for(x=0,y=data.length; x<y; x++){
                    
                    item = opt.template;
                    
                    for(i=0,j=opt.tokens.length; i<j; i++){
                        
                        opt.tokens[i]   = opt.tokens[i].replace(/[\{\{\}\}]/g, "");
                        item            = item.replace(
                                            "{{" + opt.tokens[i] + "}}",
                                            data[x][ opt.tokens[i] ] );
                                        
                    }
                    
                    opt.response += item;
                    
                }
            
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
            
            // FIXME: BUG: getCamlLogical() currently alters values array given on input.
            
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
                i;
            
            o.type = String(o.type).toUpperCase();
            
            if (!$.isArray(o.values)) {
                
                o.values = [o.values];
                
            }
            
            if (o.type !== "AND") {
                
                tagOpen     = "<Or>";
                tagClose    = "</Or>";
                
            }
            
            logical = tagOpen;
            total   = o.values.length;
            last    = (total - 1);
            haveFn  = $.isFunction(o.onEachValue);
            
            if (total < 2){
                
                logical = "";
                
            }
            
            for ( i=0; i<total; i++){
                if (haveFn) {
                    logical += String(o.onEachValue(o.values[i])).toString();
                } else {
                    logical += String(o.values[i]).toString();
                }
                if ((last - i) > 1){
                    logical += $.SPWidgets.getCamlLogical(
                                $.extend({}, o, {
                                    values: o.values.slice((i + 1), (total - i))
                                })
                            );
                    break;
                }
            }
            
            if (total > 1){
                logical += tagClose;
            }
        
            return logical;
            
        };// $.SPWidgets.getCamlLogical()
        
        /**
         * Returns a date string in the format expected by Sharepoint
         * Date/time fields. Usefaul in doing filtering queries.
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
         * Make a set of element the same height by taking the height of
         * the longest element. 
         * 
         * @param {HTMLElement|Selector|jQuery} ele - Set of elements
         * @param {Interger} [pad=0]                - Number of pixels to add on to the height
         * 
         * @return {Object} ele (input param) is returned
         * 
         */
        $.SPWidgets.makeSameHeight = function(ele, pad) {
                
            var h = 0,
                e = $(ele);
            e.each(function(){
                
                var thisEle = $(this).css("height", "");
                
                if (h < thisEle.outerHeight(true)) {
                    
                    h = thisEle.outerHeight(true);
                    
                }
                
            });
            
            if (h > 0) {
                
                if (pad) {
                    
                    h += pad;
                    
                }
                
                e.height(h);
                
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
            
        }/* $.SPWidgets.escapeXML() */
        
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
                    
        }/* $.SPWidgets.unEscapeXML() */
        
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
                this.SPServices     = "?";
                
                return this
            }
            Info.prototype.asString = function() {
                
                var me      = this,
                    resp    = "",
                    prop;
                
                for (prop in me) {
                    
                    if (me.hasOwnProperty(prop)) {
                        
                        resp += "[ " + prop + " = " + me[prop] + " ] "
                        
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
            
            try {
                
                info.SPServices = $().SPServices.Version();
                
            } catch(e){
                
                if ($.fn.SPServices) {
                    
                    info.SPServices = "loaded";
                    
                }
                
            }
            
            // Check if jQuery ui css loaded
            testInfo = $testObj.css("background-image");
            $testObj.addClass('ui-widget-header');
            
            if ($testObj.css("background-image") !== testInfo) {
                
                info.jQueryUICss = 'loaded';
                
            }
            
            $testObj.remove();
            
            return info;
            
        }; //end: $.SPWidgets.getRuntimeInfo()
        
        
    })(jQuery); /** *********** END: $.SPWidgets common */
    
//_SPWIDGETS_PLUGINS_

})(jQuery);
