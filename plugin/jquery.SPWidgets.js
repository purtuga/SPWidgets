/**
 * @fileOverview jquery.SPWidgets.js
 * jQuery plugin offering multiple Sharepoint widgets that can be used
 * for creating customized User Interfaces (UI).
 *  
 * @version 20130830081913
 * @author  Paul Tavares, www.purtuga.com, paultavares.wordpress.com
 * @see     http://purtuga.github.com/SPWidgets/
 * 
 * @requires jQuery.js {@link http://jquery.com}
 * @requires jQuery-ui.js {@link http://jqueryui.com}
 * @requires jquery.SPServices.js {@link http://spservices.codeplex.com}
 * 
 * Build Date:  August 30, 2013 - 08:19 PM
 * Version:     20130830081913
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
        $.SPWidgets.version     = "20130830081913";
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
            
            var versionMap = {
                                12: '2007',
                                14: '2010',
                                15: '2013'
                        },
                version     = (typeof SP !== 'undefined')
                            ?   parseInt(SP.ClientSchemaVersions.currentVersion) 
                            :   12;
            
            if (returnExternal) {
                
                version = versionMap[version] || version;
                
            }
            
            return version
            
        }; //end: $.SPWidgets.getSPVersion();
        
        
    })(jQuery); /** *********** END: $.SPWidgets common */
    
/**
 * Displays data from a list in Kan-Ban board using a specific column from
 * that list.  Column (at this point) is assume to be a CHOICE type of field.
 * 
 * Dependencies:
 * 
 *  -   jQuery-UI Draggable
 * 
 * 
 * BUILD: Paul:August 30, 2013 06:52 AM
 */

;(function($){

    "use strict";
    /*jslint nomen: true, plusplus: true */
    /*global SPWidgets */
    
    /**
     * @class Baard
     */
    var Board   = {};
    
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
        webURL:                 $().SPServices.SPGetCurrentSite(),
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
        onBoardCreate:          null
    };
    
    /**
     * Given a selector, this method will insert a Kan-Ban board inside 
     * of it with data retrieved from a specific list.
     * This widget will retrieve the List definition upon first call
     * using SPServices and setting cache = true. In some implementations
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
     * @param {String} [options.webURL=$().SPServices.SPGetCurrentSite()]
     *                  The WebURL for the list.
     * 
     * @param {Boolean} [options.showColPicker=false]
     *                  If true, the column picker option will be displayed
     *                  on the page. Allows user to pick which column are
     *                  visible/hidden.
     *                  Note: This option is automatically turned to True
     *                  if the number of columns available is greater than
     *                  10. 
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
     *                          Format will be identical to what SPServices uses:
     *                          ["field", "value"]. Example:
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
        var args = arguments;
        
        // Attach the board to each element
        return this.each(function(){
            
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
                
                //*** REFRESH ***\\
                if (method === "refresh") {
                    
                    board._getListItems().then(function(){
                        
                        board.showItemsOnBoard({ refresh: true });
                        
                    });
                    
                //*** REDRAW ***\\
                } else if (method === "redraw") {
                    
                    board.setBoardColumnHeight();
                    
                //*** SETVISIBLE ***\\
                } else if (method === "setvisible") {
                    
                    if (board.showColPicker) {
                        
                        board.setUserDefinedVisibleCol( args[1] );
                        
                    }
                    
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
                     * Populates the opt.stats and opt.statesMap by 
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
                            $().SPServices({
                                operation:  "GetList",
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
                                            $().SPServices({
                                                operation:      "GetListItems",
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
                                                    
                                                    var resp = $(xData.responseXML);
                                                    
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
                                                    resp.SPFilterNode("z:row").each(function(i,v){
                                                        
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
                            });//end: spservices 
                            
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
                                
                                $().SPServices({
                                    operation:      "GetListItems",
                                    listName:       opt.list,
                                    async:          true,
                                    CAMLQuery:      opt.CAMLQuery,
                                    CAMLRowLimit:   0, // FIXME: SP data should be paged??
                                    CAMLViewFields: opt.CAMLViewFields,
                                    webURL:         opt.webURL,
                                    completefunc:   function(xData, status){
                                        
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
                                        opt.listItems   = resp
                                                            .SPFilterNode("z:row")
                                                            .SPXmlToJson({
                                                                includeAllAttrs: true
                                                            });
                                        
                                        resolveDeferred( resp );
                                        
                                        
                                        
                                    }//end: completefunc()
                                });//end: SPServices
                                
                            } //end: else: do SPServices call
                            
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
                            
                            // Update the board headers with the totals
                            opt.updBoardHeaders();
                            
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
                                
                            opt.setBoardColumnHeight();
                            
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
                            
                            $().SPServices({
                                operation:      "GetFormCollection",
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
                         */
                        Picker.setUserDefinedVisibleCol = 
                            opt.setUserDefinedVisibleCol = function(colList){
                                
                                var count       = 0,
                                    selector    = "";
                                
                                if (!$.isArray(colList)) {
                                    
                                    return;
                                    
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
                                                        state.name + 
                                                        "']";
                                        
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
                        Picker.triggerEvent = function() {
                            
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
                            
                        }; //end: PIcker.triggerEvent()
                        
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
                                    primary: "ui-icon-check"
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
                        
                        // If user defined colPickerVisible on input, then
                        // make only those items visible
                        if ($.isArray(opt.colPickerVisible) && opt.colPickerVisible.length) {
                            
                            Picker.setUserDefinedVisibleCol(opt.colPickerVisible);
                            
                        } //end: if() Have opt.colPickerVisible?
                        
                    }, //end: opt.setupColumnPicker()
                    
                    /**
                     * Sets the height on the board header and
                     * data columns so that they are all equal.
                     *  
                     */
                    setBoardColumnHeight: function() {
                        
                        if (opt.statesCntr.is(":visible")) {
                            
                            $.SPWidgets.makeSameHeight(
                                opt.statesCntr.find("div.spwidget-board-state:visible"),
                                20 );
                            
                        }
                        
                        if (opt.headersCntr.is(":visible")) {
                            
                            $.SPWidgets.makeSameHeight(
                                opt.headersCntr.find("div.spwidget-board-state:visible"),
                                0 );
                            
                        }
                        
                        
                    } // end: opt.setBoardCOlumnHeight()
                    
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
                    
                // ELSE, must be higher than 10... Force columnsPicker. 
                } else {
                    
                    opt.showColPicker = true;
                    
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
                    
                    v.headerEle = $(opt.tmpltHeader).appendTo(opt.headersCntr)
                                    .attr("data-boardstate", v.name)
                                    .attr("data-boardindex", i)
                                    .html(v.title);
                                    
                    v.dataEle = $(opt.tmpltState).appendTo(opt.statesCntr)
                                    .attr("data-boardindex", i)
                                    .attr("data-boardstate", v.name);
                    
                    // Create the header element that holds the total
                    v.headerTotalEle = $('<span>&nbsp;[<span class="spwidget-state-item-total">0</span>]</span>')
                                        .appendTo(v.headerEle)
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
                        $().SPServices({
                            operation:      "UpdateListItems",
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
                                
                                row = $(xData.responseXML).SPFilterNode("z:row")
                                            .SPXmlToJson({includeAllAttrs: true});
                                
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
                        ele.addClass("hasSPShowBoard")
                            .removeClass("loadingSPShowBoard");
                            
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
+ " * BUILD: Paul:July 28, 2013 10:15 AM\n"
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
+ "    margin: .1%;\n"
+ "    padding: .2%;\n"
+ "    overflow: auto;\n"
+ "}\n"
+ "\n"
+ "div.spwidget-board div.spwidget-board-headers-cntr {\n"
+ "    border: none;\n"
+ "}\n"
+ "div.spwidget-board div.spwidget-board-headers-cntr div.spwidget-board-state {\n"
+ "    text-align: center;\n"
+ "    font-weight: bold;\n"
+ "    font-size: 1.1em;\n"
+ "    overflow: hidden;\n"
+ "    word-wrap: break-word;\n"
+ "}\n"
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
+ "        <div class=\"spwidget-board-headers-cntr ui-widget-content ui-corner-all\">\n"
+ "            <div class=\"spwidget-board-state ui-widget-content ui-corner-all\"></div>\n"
+ "            <div style=\"clear:both;\"></div>\n"
+ "        </div>\n"
+ "    </div>\n"
+ "    <div style=\"clear:both;\"></div>\n"
+ "    <div class=\"spwidget-board-states\">\n"
+ "        <div class=\"spwidget-board-states-cntr\">\n"
+ "            <div class=\"spwidget-board-state ui-widget-content ui-corner-all\"></div>\n"
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
 * BUILD: Paul:August 30, 2013 06:52 AM
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
    };
    
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
                    
                    $().SPServices({
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
                        completefunc: function(xData, status) {
                            
                            // Display the items.
                            var arrayOfCurrentItems = $(xData.responseXML)
                                            .SPFilterNode("z:row")
                                            .SPXmlToJson({
                                                includeAllAttrs:    true,
                                                removeOws:          true
                                            });
                            
                            // Add to autocomplete cache
                            o.addToAutocompleteCache(arrayOfCurrentItems);
                            
                            o.showSelectedItems( arrayOfCurrentItems, true );
                            dfd.resolveWith(o, [xData, status]);
                            
                            return;
                            
                        }//end: completefunc()
                    }); //end: SPSErvices
                    
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
                        $().SPServices({
                            operation:      "GetListItems",
                            listName:       o.list,
                            async:          true,
                            CAMLQuery:      '<Query><Where>' + camlFilter + '</Where>' + 
                                            o.filterOrderBy + '</Query>',
                            CAMLRowLimit:   o.maxResults,
                            CAMLViewFields: "<ViewFields>" + o._selectFields + "</ViewFields>",
                            completefunc:   function(xData, status){
                                $(xData.responseXML).SPFilterNode("z:row").each(function(){
                                    var thisEle = $(this);
                                    var thisDt  = thisEle.SPXmlToJson({includeAllAttrs: true})[0];
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
                $().SPServices({
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
                                        "'/></QueryOptions>"
                                    
                                }
                                
                            })(),
                    completefunc:   function(xData, status){
                        
                        var $resp       = $(xData.responseXML),
                            $rsData     = $resp.SPFilterNode("rs:data").eq(0),
                            rows        = $resp
                                            .SPFilterNode("z:row")
                                            .SPXmlToJson({
                                                includeAllAttrs:    true,
                                                removeOws:          true
                                            }),
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
                                        i + '">' + row.label + '</div>'
                             
                        });
                        
                        
                        $page
                            .html(rowsHtml)
                            .find("div.spwidget-lookup-item")
                                .each(function(){
                                    
                                    var $e = $(this)
                                    
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
 * on jQuery UI's Autocomplete and SPServices library.
 *      
 *  
 * @version 20130830065250NUMBER_
 * @author  Paul Tavares, www.purtuga.com
 * @see     TODO: site url
 * 
 * @requires jQuery.js {@link http://jquery.com}
 * @requires jQuery-ui.js {@link http://jqueryui.com}
 * @requires jquery.SPServices.js {@link http://spservices.codeplex.com}
 * 
 * Build Date Paul:August 30, 2013 06:52 AM
 * 
 */
(function(){
    
    /*jslint nomen: true, plusplus: true */
    /*global SPWidgets */
    
    /**
     * Namespace for pickSPUser specific methods.
     * @name        pickSPUser
     * @class       Namespace for pickSPUser plugin
     * @memberOf    jQuery.pt
     */
    $.pt.pickSPUser = {
        _isPickSPUserCssDone: false
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
     * @param {String} [options.webURL=$().SPServices.SPGetCurrentSite()]
     *                  The URL of the site
     * 
     * @param {Interger} [options.maxSearchResults=50]
     *                      The max number of results to be returned from the
     *                      server.
     * 
     * @param {Function} [onPickUser=null]
     *                      Function that is called when user makes a selection.
     *                      Function will have a context (this keyword) of the
     *                      input field to which this plugin is called on, and
     *                      will be given one input param; an object containing
     *                      information about the selected user.
     *   
     * @param {Function} [onCreate=null]
     *                      Function that is called after the widget has been
     *                      initiated on an input element.
     *                      Function will have a context (this keyword) of the
     *                      input field to which this plugin is called on, which
     *                      will also be provided as the first argument to the
     *                      function.
     * 
     * @param {Function} [onRemoveUser=null]
     *                      Function called when removing a user from the selected
     *                      list. Returning false (boolean) will cancel the removal
     *                      of the person from the selected list.
     *                      Function will have a context (this keyword) of the
     *                      input field to which this plugin is called on, and is
     *                      given 3 input params: $input, $personUI, personObj
     * 
     * @param {String} [inputPlaceholder="Type and Pick"]
     *                      The text to appear in the HTML5 placeholder attribute
     *                      of the input field. 
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
        var arg = arguments;
        
        // Define options with globals
        // var options = $.extend({}, options2);
     
        // Initiate each selection as a pickSPUser element
        this.each(function(){
            var ele = $(this);
            if (!ele.is("input") || ele.hasClass("hasPickSPUser")){
                // if the first argument is a string, and this is an input
                // fild, then process methods
                if (typeof options === "string" && ele.is("input")) {
                    return $.pt.pickSPUser.handleAction.apply(this, arg);
                    
                // ELse, exit
                } else {
                    return this;
                }
            };
            
            // Options for this element
            var o   = $.extend({},
                    {
                        allowMultiples:     true,
                        maxSearchResults:   50,
                        webURL:             $().SPServices.SPGetCurrentSite(),
                        onPickUser:         null,
                        onCreate:           null,
                        onRemoveUser:       null,
                        inputPlaceholder:   "Type and Pick"
                    },
                    options, 
                    {
                        eleUserInput: ele.css("display", "none").addClass("hasPickSPUser") 
                    });
    
            // insure that maxsearchResults is an interger
            o.maxSearchResults = parseInt(o.maxSearchResults) || 50;
            
            // Create pick user container and insert it after the input element
            // TODO: Clean up
            // var cntr        = $(o.htmlTemplateSelector + " .pt-pickSPUser")
                                // .clone(1).insertAfter(ele);
            var cntr        = $($.pt.pickSPUser.htmlTemplate)
                                .find(".pt-pickSPUser").clone(1).insertAfter(ele);
            
            o.eleSelected   = cntr.find("div.pt-pickSPUser-selected")
                                .empty()
                                .on("click", ".tt-delete-icon", function(){
                                    
                                    $.pt.pickSPUser.removeUser(this);
                                    
                                });
            
            o.elePickInput  = cntr.find("div.pt-pickSPUser-input");
            
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
                
                for (i=0; i<total; i++){
                    
                    id = curUsers[i];
                    
                    i++;
                    
                    user    = curUsers[i];
                    $ui     = $.pt.pickSPUser
                                .getUserHtmlElement(o, id, user)
                                .appendTo( o.eleSelected );
                    
                    // Get this user's info. and store it in the input element
                    (function($thisUserUI, thisUserName){
                        
                        o.getSearchResults(thisUserName)
                            .done(function(rows, xData, status){
                                
                                var personName = String(thisUserName).toLowerCase();
                                
                                $.each(rows, function(i,v){
                                    
                                    var thisName = String(v.displayName).toLowerCase();
                                    
                                    if (thisName === personName) {
                                        
                                        $thisUserUI.data("pickspuser_object", v);
                                        
                                        return false;
                                        
                                    }
                                    
                                });
                                
                                // TODO: should something be done if we're unable to find user?
                                
                            });
                        
                    })($ui, user);
                    
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
             * Searches SP for the value providedon input
             * 
             * @param {String} searchString
             * 
             * @return {jQuery.Promise}
             *  
             */
            o.getSearchResults = function(searchString) {
                
                return $.Deferred(function(dfd){
                    
                    $().SPServices({
                        operation:      "SearchPrincipals",
                        searchText:     searchString,
                        maxResults:     o.maxSearchResults,
                        async:          true,
                        webURL:         o.webURL,
                        completefunc:   function(xData, status){
                            
                            var resp = $(xData.responseXML),
                                rows = [];
                            
                            resp.find("PrincipalInfo").each(function(){
                                
                                var thisEle = $(this);
                                
                                rows.push({
                                    displayName:    thisEle.find("DisplayName").text(),
                                    accountId:      thisEle.find("UserInfoID").text(),
                                    accountName:    thisEle.find("AccountName").text(),
                                    accountType:    thisEle.find("PrincipalType").text(),
                                    // needed attributes for autocomplete
                                    value:          thisEle.find("DisplayName").text(),
                                    label:          thisEle.find("DisplayName").text()
                                });
                                
                            });
                            
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
            
            // If the current input field has a value defined, then parse it
            // and display the currently defined values
            if (ele.val()) {
                
                o.addPeopleToList(ele.val(), noEvents);
                
            }
            
            // Variable that store all search results
            var cache = {};
            
            // Add the AutoComplete functionality to the input field
            o.elePickInput.find("input[name='pickSPUserInputField']")
                .attr("placeholder", o.inputPlaceholder)
                .autocomplete({
                    minLength: 3,
                    source: function(request, response){
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
                            o.eleSelected.find(
                                "div[data-pickspuserid='" + 
                                u.item.accountId + "']" ).length
                        ) {
                            
                            return;
                            
                        }
                        
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
                        
                    }
                });//end:autocomplete 
            
            // Store the options for this call on the container and include a pointer
            // in the input field to this element
            cntr.data("pickSPUserContainerOpt", o);
            ele.data("pickSPUserContainer", cntr);
            
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
        // TODO: clean up
        // var ele = $(opt.htmlTemplateSelector + " .pt-pickSPUser-person").clone(1);
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
                if (isDone[$(this).attr("data-pickSPUserID")]) {return;};
                isDone[$(this).attr("data-pickSPUserID")] = true;
                if (newVal) {
                    newVal += ";#";
                }
                newVal += $(this).attr("data-pickSPUserID");
                newVal += ";#";
                newVal += $(this).attr("data-pickSPUserNAME");
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
        
        var type    = String(type).toLowerCase();
            action  = String(action).toLowerCase(),
            o       = $(this)
                        .data("pickSPUserContainer")
                        .data("pickSPUserContainerOpt")
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
                
                case "getSelected":
                    
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
+ ".pt-pickSPUser .pt-pickSPUser-selected-multiple {\n"
+ "    min-height: 3em;\n"
+ "}\n"
+ "\n"
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
 * @version 20130830081913NUMBER_
 * @author  Paul Tavares, www.purtuga.com
 * 
 * @requires jQuery.js {@link http://jquery.com}
 * @requires jQuery-ui.js {@link http://jqueryui.com}
 * @requires jquery.SPServices.js {@link http://spservices.codeplex.com}
 * 
 * Build Date August 30, 2013 - 08:19 PM
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
    var Upload = {};
    
    /**
     * Tracks if the CSS injection into the page has been done.
     */
    Upload.isSPUploadCssDone = false;
    
    /**
     * Defaults 
     */
    $.SPWidgets.defaults.upload = {
        listName:               '',
        folderPath:             '',
        uploadDonePage:         '/_layouts/images/STS_ListItem_43216.gif',
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
        webURL:                 $().SPServices.SPGetCurrentSite()
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
     *                  to the website full url, which is retrieved using SPServices
     *                  utility.
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
        
        return $(this).each(function(){
        
            var opt = $.extend({}, $.SPWidgets.defaults.upload, options),
                overlayCss;
            
            // if the global styles have not yet been inserted into the page, do it now
            if (!Upload.isSPUploadCssDone) {
                
                Upload.isSPUploadCssDone = true;
                
                $('<style type="text/css">' + "\n\n" +
                    Upload.StyleSheet + "\n\n</style>"
                )
                .prependTo("head");
                
            }
            
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
                
                $().SPServices({
                    operation:      "GetListItems",
                    async:          false,
                    webURL:         opt.webURL,
                    listName:       opt.listName,
                    CAMLQuery:      "<Query><Where>" +
                            "<Eq><FieldRef Name='Author' LookupId='TRUE'/>" +
                            "<Value Type='Integer'><UserID/></Value></Eq>" +
                            "</Where><OrderBy><FieldRef Name='Created' Ascending='FALSE'/>" +
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
                    completefunc:       function(xData, status) {
                        
                        var rows = $(xData.responseXML)
                                    .SPFilterNode("z:row")
                                    .SPXmlToJson({includeAllAttrs: true});
                        
                        if (rows.length) {
                            
                            lastFile = rows[0];
                            
                        }
                        
                    }
                });
                
                return lastFile;
                
            }; //end: opt.getUploadedFileRow()
            
            
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
            opt.spVersion     = $.SPWidgets.getSPVersion(true);
            opt.uploadPage    = String(opt.uploadPage);
            
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
                
            } else if (opt.uploadPage.toLowerCase().indexOf("http") === -1) {
                
                var s = "/";
                
                if (opt.uploadPage.indexOf('/') == 0) {
                    
                    s = "";
                    
                }
                
                opt.uploadPage = opt.webURL + s + opt.uploadPage;
                
            }
            
            // Set the uploadDonePage url
            if (String(opt.uploadDonePage).toLowerCase().indexOf("http") === -1) {
                
                var s = "/";
                
                if (opt.uploadDonePage.indexOf('/') == 0) {
                    
                    s = "";
                    
                }
                
                opt.uploadDonePage = opt.webURL + s + opt.uploadDonePage;
                
            }
            
            // Create additional non-overridable options
            opt._uploadUrlParams    = "?List=" + 
                                      $.pt.getEscapedUrl(opt.listName) + "&RootFolder=" +
                                      $.pt.getEscapedUrl(opt.folderPath) + "&Source=" +
                                      $.pt.getEscapedUrl(opt.uploadDonePage) + "&" + opt.uploadUrlOpt;
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
             *          the file upload form.
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
             *          to the server.
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
        // e.find(".buttonPane").css("display", "none")
        
        opt.showHideBusy().then(function(){
            
            page.find("input[type='button'][id$='btnOK']").click();
    
            // If error message are displayed (after we click upload button), 
            // then just return control back to the user.
            if (msgs.is(":visible")) {
                
                e.find(".loadingOverlay")
                        .css("display", "none")
                        .end();
    
                return false;
                
            }
            
        });
        
    };//* Upload.onUpload()
    
    
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
        
        var e = $(ele).closest(".SPControlUploadUI");
        
    //    console.debug("Upload.onIframeChange(): In...");
        
        // Because just about every browser differs on how the load() event
        // is triggered, we do all our work in a function that is triggered
        // 500 millisends from now. By then, the page (regardless of browser)
        // should be in a state that is useful.
        setTimeout(
            function(){
                
                var page    = e.find("iframe").contents(),
                    opt     = e.data("SPControlUploadOptions"),
                    ev      = opt.ev,
                    form    = page.find("form").eq(0);
                
                ev.pageUrl  = page[0].location.href;
                ev.page     = page;
                
                // Focus at the top of the form
                opt.$iframeCntr.scrollTop(0);
                page.scrollTop(0);
                
                // If the URL of the page in the iFrame is the same as the 
                // upload page then this is either the
                // initial load of the page or an error has occured...
                // Hide the page and show only the upload form element.
                if (
                        Upload.isSameUrlPage(
                            $.pt.getUnEscapedUrl(ev.pageUrl),
                            $.pt.getUnEscapedUrl(opt.uploadPage))
                ) {
    //                console.debug("_onIFramePageChange() URL is the same as the one originally requested.");
                    
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
    //                    console.debug("_onIFramePageChange() page displaying an error... Storing it and reloading upload form.");
                        
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
                        
                    // Not an error page.... 
                    // Prepare the page for display to the user
                    } else {
                        
                        // SP2010 Code
                        // If this is the new SP2010 "Processing..." page, then
                        // the just exit... there is nothing for us to do yet...
                        if (page.find("#GearPage") && !page.find("input[type='file']").length) {
    //                        console.debug("_onIFramePageChange() SP2010 processing page... Exiting and waiting for next page...");
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
                        ev.action        = "postLoad";
                        ev.hideOverlay    = true;
                        
                    }/* if: error page or upload UI? */
                    
                // Else, we must be passed the upload page... 
                // set the state to 3 (passed upload) and bind a function to the
                // iframe document's form element (which in turn calls the user defined 
                // onPageChange event prior to sending the form on.
                } else {
                    
                    ev.state            = 3;
                    ev.action           = "postLoad";
                    ev.hideOverlay      = true;
                    // ev.file             = opt.getUploadedFileRow();
                    
                    // If the current page is the 'uploadDonePage', then set
                    // flag in the event, set flag to not hide the overlay
                    // and insert message indicating upload is done.
                    if (Upload.isSameUrlPage(ev.pageUrl, opt.uploadDonePage)) {
                        
                        ev.isUploadDone = true;
                        ev.hideOverlay  = false;
                        
                        // Show the busy indicator and success message.
                        opt.showHideBusy();
                        opt.showHideSuccess();
                        
                    // Else, page is not the uploadDonePage... manipulate the form's
                    // onsubmit event.
                    } else {
                        
                        var formOnSubmit    = form.prop("onsubmit");
                        
                        // Show only the form in the page
                        form
                            .children(":visible")
                                .css("display", "none")
                                .addClass("ptWasVisible")
                                .end()
                            .find("input[title='Name']")
                                .closest("div[id^='WebPart']")
                                    .appendTo(page.find("form"))
                                    // 8/30/2013: ensure the UI is visible.
                                    // Just in case it was at root of form
                                    .css("display", "")
                                    .removeClass("ptWasVisible");
                        
                        // SP seems to have a good hold of the Form, because
                        // we are unable o bind an event via $. Thus:
                        // The form's onsubmit has to be overriden with our
                        // own function... The original function was captured
                        // above, thus it will triggered... but we now control
                        // when we trigger it.
                        // FIXME: this does not seem to do anything (at least in FF)
                        form[0].onsubmit = function(){
        
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
                        
                    } //end: if(): onUpdateDonePage? or not?
                                  
                    // Bind a function to the iframe WINDOW object for when it is
                    // unloaded.. At this point, nothing can be done to prevent
                    // the page from being submitted, but we can still execute
                    // the caller's function. 
                    $(e.find("iframe")[0].contentWindow).unload(function(evv){
                        
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
                    
                }//end:if
                
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
     * up to the "?") and will then compare them.
     * 
     * @param {String} u1   First URL
     * @param {String} u2   Second URL
     * @return {Boolean}
     * @memberOf jQuery.pt
     *
     */
    Upload.isSameUrlPage = function(u1, u2) {
        if (!u1 || !u2) { return false; }
        var matchString = u1;
        if (u1.indexOf("?") > -1) {
            matchString = u1.substring(0, u1.indexOf("?"));
        }
        if (u2.indexOf(matchString) == 0) {
            return true;
        } else {
            return false;
        }
    };// Upload.isSameUrlPage()
    
    
    /**
     * Uses sharepoint default function for escaping urls.
     * @function
     */
    $.pt.getEscapedUrl = escapeProperly;
    
    /**
     * Uses sharepoint default function to un-escape urls.
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
        $().SPServices({
            operation: "GetList",
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
+ "}\n"
+ "\n"
+ ".spcontrolupload .loadingOverlay {\n"
+ "	width: 99%;\n"
+ "	left: 1px;\n"
+ "	top: 1px;\n"
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
+ "\n"
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
+ "        <div class=\"loadingOverlay\">\n"
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
 * BUILD: Paul:August 30, 2013 06:52 AM
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
        dateTemplate: '{{date}} <span class="spwidgets-item-remove">[x]</span>'
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
     * @param {Object} [options.allowMultiples=false]
     * @param {Object} [options.delimeter=";"]
     * @param {Object} [options.remainOpen=true]
     * @param {Object} [options.datepicker={...}]
     * @param {Object} [options.dateTemplate=""]
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
                $ele:   $(this).addClass("hasSPDateField")
                
            };
            
            if (!Inst.$ele.is("input[type='text']")) {
                
                return;
                
            }
            
            /**
             * @property {String} The original value in the input
             * @member Inst
             * @memberOf Inst
             */
            Inst.eleOrigVal = Inst.$ele.val();
            Inst.$ele.val("");
                
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
                        .clone()
                            .insertAfter(Inst.$ele)
                            .css("display", "none");
            
            /**
             * @property {jQuery} the Datepicker input field.
             * @member Inst
             * @memberOf Inst
             */
            Inst.$input = Inst.$ui
                            .find("input[name='SPDateFieldInput']")
                            .val(Inst.$ele.val());
            
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
             * @param {Object|Array|String} setDateOpt.date
             *          The date or array of dates to set on the picker.
             * 
             * @param {Boolean} [setDateOpt.setDatepicker=true]
             *          Then true, the datepicker jQuery UI widget input will
             *          be set to the value that was provided via this method.
             *          Used only when allowMultiples is false
             * 
             * @param {String} [setDateOpt.format=Inst.opt.datepicker.dateFormat]
             *          The format of the dates provided on input. This param
             *          is used only if the input date (or one of them) is a
             *          string.
             * 
             * @return {Object} Inst
             */
            Inst.setDate = function(setDateOpt) {
                
                var opt     = $.extend(
                                {},
                                {
                                    date:           '',
                                    format:         Inst.opt.datepicker.dateFormat,
                                    setDatepicker:  true,
                                    triggerEvent:   true
                                },
                                setDateOpt
                            ),
                    eleVal  = Inst.$ele.val(),
                    dtShow  = '';
                
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
                    
                    if (!(dtObj instanceof Date)) {
                        
                        try {
                            
                            dtObj = $.datepicker.parseDate(opt.format, dt);
                            
                        } catch(e){
                            
                            return Inst;
                            
                        }
                         
                    }

                    dt1 = $.datepicker.formatDate('yy-mm-dd', dtObj);
                    dt2 = $.datepicker
                            .formatDate(Inst.opt.datepicker.dateFormat, dtObj);
                    
                    
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
                    
                });
                
                // If allow multiple is true, then set teh multiple dates
                // on the display area. Then set the input value and trigger
                // change event
                if (Inst.opt.allowMultiples) {
                    
                    Inst.$dtCntr.append(dtShow);
                    
                } else if (opt.setDatepicker) {
                    
                    Inst.$input.val(dtShow);
                    
                }
                
                Inst.$ele.val(eleVal);
                
                if (opt.triggerEvent) {
                    
                    Inst.$ele.change();
                    
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

                    dt1         = $.datepicker.formatDate('yy-mm-dd', dtObj);
                    dt1Regex    = new RegExp(
                                    "(" + Inst.opt.delimeter + ")?" + dt1, 
                                    "g");
                    
                    eleDtObj.input = eleDtObj.input.replace(dt1Regex, "");
                    
                    if (Inst.opt.allowMultiples) {
                        
                        dt1Regex = $.datepicker.formatDate('yy-mm-dd', dtObj);
                        
                        Inst.$dtCntr
                            .find("span[data-spwidget_dt1='" + dt1 + "']")
                            .remove();
                        
                    }
                    
                });
                
                // Clean up the new string, set it to
                // the input field and trigger event.
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
                Inst.$ui.remove();
                
            }; //end: Inst.destroy()
            
            //------------------------------------------------------
            //-----------    INITIATE THIS INSTANCE    -------------
            //------------------------------------------------------
            
            // Setup the datepicker options
            // TODO: should we allow the user to manipulate this?
            Inst.opt.datepicker.altFormat   = 'yy-mm-dd';
            Inst.opt.datepicker.altField    = Inst.$ele;
            
            // If allowMultiples is true, then set special processing for storing
            // multiple dates - both on display and in the input field.
            if (Inst.opt.allowMultiples){
                
                Inst.opt.datepicker.altFormat   = '';
                Inst.opt.datepicker.altField    = '';
                
                // If remainOpen option is true, then turn off picker animation
                if (Inst.opt.remainOpen) {
                    
                    Inst.opt.datepicker.showAnim = '';
                    
                }
                
                // Setup listener for removing selected dates.
                Inst.$dtCntr
                    .css("display", "")
                    .on("click", ".spwidgets-item-remove", function(ev){
                        
                        var $dt = $(ev.target).closest(".spwidgets-item");
                        
                        Inst.removeDate({
                            date:   $dt.data("spwidget_dt1"),
                            format: 'yy-mm-dd'
                        });
                        
                    });
                
                // Store a reference to teh original onSelect method (if defined)
                // and set our own here.  Our function will take the date selected
                // by the user in their own locale and format it to ISO 8601
                if ($.isFunction(Inst.opt.datepicker.onSelect)) {
                    
                    Inst.opt.datepicker._onSelect = Inst.opt.datepicker.onSelect;
                    
                }
                
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
                    
                    Inst.$input.val("");
                    
                    if (Inst.opt.remainOpen) {
                        
                        setTimeout(function(){
                            Inst.$input.datepicker("show");
                        }, 5);
                        
                    }
                    
                };
                
            } //end: if(): allowMultiples

            
            // Hide the input used by the caller and display our datepicker input.
            Inst.$ele
                .css("display", "none")
                .data("SPDateFieldInstance", Inst);
                
            Inst.$input.datepicker(Inst.opt.datepicker);
            
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
+ "</div>\n";
//_HAS_DATE_HTML_TEMPLATE_
    
    
})(jQuery); /***** End of module: jquery.SPDateField.js */

/**
 * @fileOverview - List filter panel widget
 * 
 * BUILD: August 30, 2013 - 04:46 PM
 * 
 */
(function($){
    
    "use strict";
    /*jslint nomen: true, plusplus: true */
    /*global SPWidgets */
    
    /**
     * @class Filter
     */
    var Filter  = {};
    
    /** @property {Boolean} Is initialization done */
    Filter.isInitDone = false;
    
    /** @property {jQuery} jQuery object with templates. Loaded from Filter.htmlTemplate during initialization */
    Filter.templates = null; 
    
    /**
     * Default options. 
     */
    $.SPWidgets.defaults.filter = {
        list:                   '',
        webURL:                 $().SPServices.SPGetCurrentSite(),
        columns:                ['Title'],
        textFieldTooltip:       'Use a semicolon to delimiter multiple keywords.',
        definedClass:           'spwidget-column-dirty',
        showFilterButton:       true,
        showFilterButtonTop:    true,
        filterButtonLabel:      "Filter",
        onFilterClick:          null,
        onReady:                null,
        onReset:                null,
        ignoreKeywords:         /^(of|and|a|an|to|by|the|or|from)$/i,
        delimeter:              ';'
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
                    $ele:   $(this),
                    $ui:    null,
                    opt:    opt
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
                    $().SPServices({
                        operation:      "GetList",
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
                        
                        // Store list definition
                        Inst.$list = $list;
                        
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
                                model     = {
                                    type:               null,
                                    otherFilterTypes:   ''
                                };
                            
                            if (!$thisCol.length) {
                                
                                $thisCol = $list
                                            .find("Field[Name='" + v + "']");
                                
                            }
                            
                            if (!$thisCol.length){
                                
                                return;
                                
                            }
                            
                            
                            // Set some default model values
                            model.Name = $thisCol.attr("Name");
                            
                            // Build the column ui based on its type
                            switch ($thisCol.attr("Type")) {
                                
                                // CHOICE: Show checkboxes allowing user to select multiple
                                case "Choice":
                                    
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
                                    
                                    thisColUI = thisColUI.replace(/__COLUMN__UI__/, inputUI);
                                    
                                    thisColUI = $.SPWidgets.fillTemplate(
                                        thisColUI,
                                        {
                                            DisplayName: $thisCol.attr("DisplayName"),
                                            type:        'choice',
                                            Name:        $thisCol.attr("Name")
                                        }
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
                                    
                                case "DateTime":
                                    
                                    if (model.type === null) {
                                        
                                        model.type = 'date';
                                        
                                        model.otherFilterTypes = 
                                            '<option value="Gt">After</option>' + 
                                            '<option value="Lt">Before</option>'; 
                                            
                                    }
                                    
                                case "User":
                                case "UserMulti":
                                    
                                    if (model.type === null) {
                                        
                                        model.type = 'people';
                                        
                                    }
                                
                                // COUNTER: Inser additional filter types
                                case "Counter":
                                    
                                    if (model.type === null) {
                                        
                                        model.type = 'text';
                                        
                                        model.otherFilterTypes = 
                                            '<option value="Gt">Greater Than</option>' + 
                                            '<option value="Lt">Less Than</option>'; 
                                            
                                    }
                                
                                 // Date and Time: Inser additional filter types
                                case "DateTime":
                                    
                                    if (model.type === null) {
                                        
                                        model.type = 'text';
                                        
                                        model.otherFilterTypes = 
                                            '<option value="Gt">After</option>' + 
                                            '<option value="Lt">Before</option>';
                                            
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
                        Inst.$ele
                            .find("div.spwidget-filter-column-cntr")
                            .html(columns);
                        
                        // Setup Lookup field
                        Inst.$ele.find("div.spwidget-type-lookup input")
                            .each(function(){
                                
                                var $field = $(this);
                                
                                $field.SPLookupField({
                                    list:           $field.data("spwidget_list"),
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
                                
                                var $field = $(this);
                                
                                $field.pickSPUser({ allowMultiple: true });
                                    
                                $field.parent().find(".spwidget-tooltip").remove();
                                
                            });
                        
                        // Setup DATE fields
                        Inst.$ele.find("div.spwidget-type-date")
                            .each(function(){
                                
                                var $column = $(this),
                                    $field  = $column.find("input");
                                
                                $field.SPDateField({
                                    allowMultiples: true
                                });
                                
                                $column.find(".spwidget-tooltip").remove();
                                $column.find("select.spwidget-filter-type")
                                    .val("Eq")
                                    .find("option[value='Contains']").remove();
                                
                                return this;
                                
                            });
                        
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
                                "change.SPWigets.SPFilterPanel",
                                "select.spwidget-filter-type", 
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
        
        var $input  = $(this),
            $cntr   = $input.closest("div.spwidget-filter-value-input"),
            $col    = $cntr.closest("div.spwidget-column"),
            val     = $input.val(),
            Inst    = $cntr
                        .closest("div.spwidget-filter")
                        .data("SPFilterPanelInst");
        
        if ($col.is(".spwidget-type-choice")) {
            
            if (!$cntr.find(".spwidget-filter-input:checked").length) {
                
                val = "";
                
            }
            
        }
        
        if (val !== "") {
            
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
            eleValue        = $ele.val(),
            Inst            = $ele
                                .closest("div.spwidget-filter")
                                .data("SPFilterPanelInst");
        
        if (eleValue === "IsNull" || eleValue === "IsNotNull") {
            
            $colValCntr.addClass("spwidget-disabled");
            $colInput.attr("disabled", "disabled");
            $logicalType.attr("disabled", "disabled");
            $col.addClass(Inst.opt.definedClass);
            
        } else {
            
            $colValCntr.removeClass("spwidget-disabled");
            $colInput.removeAttr("disabled", "disabled");
            $logicalType.removeAttr("disabled");
            
            if (!$colInput.val()) {
                
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

        // Focus the on the first input
        Inst.$ui.find(":input.spwidget-input:first").focus();
        
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
                URLParams:  '',
                filters:    {},
                count:      0
            },
            $cols       = Inst.$ui.find("div.spwidget-column"),
            colFilters  = [];
        
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
                thisColFilter   = {
                        columnName:     colName,
                        matchType:      $thisCol
                                            .find("select.spwidget-filter-type")
                                            .val(),
                        logicalType:    $thisCol
                                            .find("select.spwidget-match-type")
                                            .val(),
                        values:         [],
                        count:          0,
                        CAMLQuery:      '',
                        URLParams:      ''
                    },
                colFilterWasSet = false,
                colType         = $thisCol.data("spwidget_column_type"),
                thisColUrlParam = {};
            
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
            if (thisColFilter.count > 0) {
                
                colFilters.push(thisColFilter.CAMLQuery);
            
                filters.count           += thisColFilter.count;
                filters.filters[colName] = thisColFilter;
                
                // Create the URLParams for this column
                thisColUrlParam[ colName ] = {
                    matchType:  thisColFilter.matchType,
                    values:     thisColFilter.values
                };
                
                thisColFilter.URLParams = $.param(thisColUrlParam, false);
                
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
            
            var $input          = Inst.$ui
                                    .find(
                                        ".spwidget-filter-input[name='" + 
                                        column + "']"
                                    ),
                $colUI          = $input.closest("div.spwidget-column"),
                type            = $colUI.data("spwidget_column_type"),
                $match          = $colUI.find("select[name='" + column + "_type']"),
                $logicalType    = $colUI.find("div.spwidget-filter-type-cntr select.spwidget-match-type");
            
            // If we have a matchType or logicalType, then set it
            if (filter.matchType) {
                
                $match.val(filter.matchType);
                
            }
            
            if (filter.logicalType) {
                
                $logicalType.val(filter.logicalType);
                
            }
            
            // Populate the values
            switch (type) {
                
                case "text":
                
                    if (filter.values instanceof Array) {
                        
                        $input.val(filter.values.join(";"));
                        
                    } else {
                        
                        $input.val(filter.values);
                        
                    }
                    
                    break;
                
                case "choice":
                    
                    $.each(filter.values, function(i, colVal){
                        
                        $input
                            .filter("[value='" + colVal + "']")
                                .prop("checked", true);
                        
                    });
                    
                    break;
                
                case "lookup":
                    
                    $input.SPLookupField("method", "add", 
                        filter.values.join(";#") );
                    
                    break;
                
                case "people":
                    
                    $input.pickSPUser("method", "add", 
                        filter.values.join(";#") );
                    
                    break;
                
                case "date":
                    
                    $input.SPDateField('setDate', filter.values);
                    
                    break;
                
            }
            
            $input.change();
            
        }); //end: each(): filter
        
        return Inst;
        
    }; //end: Filter.setFilterValues()
    
    /**
     * @property
     * Stores the Style sheet that is inserted into the page the first
     * time SPFilterPanel() is called.
     * Value is set at build time.
     */
    Filter.styleSheet = "/** \n"
+ " * Stylesheet for the Board widget\n"
+ " * \n"
+ " * BUILD: Paul:August 30, 2013 06:52 AM\n"
+ " */\n"
+ "div.spwidget-filter {\n"
+ "    width: 100%;\n"
+ "    position: relative;\n"
+ "}\n"
+ "div.spwidget-filter .spwidget-date-cntr,\n"
+ "div.spwidget-filter .spwidgets-lookup-cntr {\n"
+ "    display: block;\n"
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
+ "div.spwidget-filter div.spwidget-column {\n"
+ "    padding: .5em;\n"
+ "    margin: .5em;\n"
+ "    position: relative;\n"
+ "    border-bottom: 1px solid  darkgray;\n"
+ "    box-shadow: 1px 1px 1px 0 lightgray inset;\n"
+ "}\n"
+ "div.spwidget-filter div.spwidget-filter-type-cntr {\n"
+ "    right: 4%;\n"
+ "    position: absolute;\n"
+ "    font-size: .8em;\n"
+ "    top: .6em;\n"
+ "    opacity: .6;\n"
+ "}\n"
+ "div.spwidget-filter div.spwidget-filter-type-cntr:hover {\n"
+ "    opacity: 1;\n"
+ "}\n"
+ "div.spwidget-filter div.spwidget-filter-value-cntr {\n"
+ "    width: 100%;\n"
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
    Filter.htmlTemplate = "<div id=\"filter_main_ui\">\n"
+ "    <div class=\"spwidget-filter\" style=\"display: none;\">\n"
+ "        <div class=\"spwidget-filter-column-cntr\"></div>\n"
+ "        <div class=\"spwidget-filter-button-cntr\">\n"
+ "            <button type=\"button\" class=\"spwidget-button\" name='reset'>Reset</button>\n"
+ "            <button type=\"button\" class=\"spwidget-button\" name='filter'>Filter</button>\n"
+ "        </div>\n"
+ "    </div>\n"
+ "</div>\n"
+ "<div id=\"filter_column\">\n"
+ "    <div class=\"spwidget-column spwidget-type-{{type}}\" data-spwidget_column_type=\"{{type}}\">\n"
+ "        <div class=\"spwidget-filter-value-cntr\">\n"
+ "            <label>{{DisplayName}}</label>\n"
+ "            <div class=\"spwidget-filter-value-input\">\n"
+ "                __COLUMN__UI__\n"
+ "            </div>\n"
+ "        </div>\n"
+ "        <div class=\"spwidget-filter-type-cntr\" title=\"Match Type\">\n"
+ "            <select name=\"{{Name}}_type\" class=\"spwidget-filter-type\" tabindex=\"-1\">\n"
+ "                <option value=\"Contains\">Contains</option>\n"
+ "                <option value=\"Eq\" selected=\"selected\">Equal</option>\n"
+ "                <option value=\"Neq\">Not Equal</option>\n"
+ "                <option value=\"IsNull\">Is Blank</option> \n"
+ "                <option value=\"IsNotNull\">Is Not Blank</option>\n"
+ "                __OTHER_FILTER_TYPES__\n"
+ "            </select>\n"
+ "            <select name=\"{{Name}}_match\" class=\"spwidget-match-type\" tabindex=\"-1\">\n"
+ "                <option value=\"Or\" selected=\"selected\">Any</option>\n"
+ "                <option value=\"And\">All</option>\n"
+ "            </select>\n"
+ "        </div>\n"
+ "    </div>\n"
+ "</div>\n"
+ "<div id=\"filter_text_field\">\n"
+ "    <input name=\"{{Name}}\" title=\"{{DisplayName}}\" type=\"text\" value=\"\" data-spwidget_list=\"{{list}}\" class=\"spwidget-input spwidget-filter-input\" />\n"
+ "    <span class=\"spwidget-tooltip\">{{tooltip}}</span>\n"
+ "</div>\n"
+ "<div id=\"filter_choice_field\">\n"
+ "    <label>\n"
+ "        <input name=\"{{Name}}\" title=\"{{DisplayName}}\" type=\"checkbox\" value=\"{{value}}\" class=\"spwidget-input spwidget-filter-input\" />\n"
+ "        {{value}}\n"
+ "    </label>\n"
+ "</div>\n";
//_HAS_FILTER_HTML_TEMPLATE_
    
})(jQuery); /***** End of module: jquery.SPFilterPanel.js */


})(jQuery);
