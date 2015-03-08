define([
    'jquery',
    'text!./lookupField.html',
    '../spapi/getListItems',
    '../sputils/fillTemplate',
    '../sputils/getCamlLogical',
    '../sputils/getNodesFromXml',
    '../sputils/parseLookupFieldValue',
    '../sputils/xmlEscape',
    // ------------------------
    'less!./lookupField'
], function(
    $,
    lookupFieldTemplate,
    getListItems,
    fillTemplate,
    getCamlLogical,
    getNodesFromXml,
    parseLookupFieldValue,
    xmlEscape
){

    /**
     * Widget that turn an input field into a lookup field. The
     * field will store only the ID's (one or more) for the items
     * that the user picks.
     * THe user, however, is presented with the existing items
     * and has the ability to Remove them and add new ones.
     *
     * BUILD: _BUILD_VERSION_DATE_
     *
     */

    /**
     * Namespace for pickSPUser specific methods.
     * @name        Lookup
     * @class       Namespace for lookup Field plugin
     */
    var Lookup = {
        _isLookupbodyEventDone: false
    },
    lookupField;

    // Default options
    Lookup.defaults = {
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
     * @param {HTMLElement|jQuery|selector} containers
     *      Containers that will receive the lookupField
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
    lookupField = function(containers, options) {

        // Store the arguments given to this function. Used later if the
        // user is trying to execute a method of this plugin.
        var arg = Array.prototype.slice.call(arguments, 1);

        // Initiate each selection as a Lookup element
        return containers.each(function(){

            var ele = $(this),
                o;

            // TODO: may need to change code below if going to bind to other types of fields (like select)
            // FIXME: when allowing textarea, need to ensure that its definition is textonly (no HTML)

            if (
                (!ele.is("input") && !ele.is("textarea")) ||
                ele.hasClass("hasLookupSPField")
            ){
                // if the first argument is a string, and this is an input
                // field, then process methods
                if (typeof options === "string" && ele.is("input")) {

                    o = ele.data("SPWidgetLookupFieldUI").data("SPWidgetLookupFieldOpt");

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
            o = $.extend(
                    {},
                    Lookup.defaults,
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
                if (
                    !itemCntr.find("div.spwidgets-item").length ||
                    o.allowMultiples === false
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
                                        fillTemplate(o.template, item) +
                                        '</div>'
                                    )
                                    .appendTo( itemCntr )
                                    .find(".spwidgets-item-remove")
                                        .on("click.SPWidgets", function(/*ev*/){

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
                        items = parseLookupFieldValue(o._ele.val());

                    if (!items.length) {

                        dfd.resolveWith(o, [null, null]);
                        return;

                    }

                    getListItems({
                        operation: "GetListItems",
                        async:      opt.async,
                        listName:   o.list,
                        CAMLQuery:  '<Query><Where>' +
                                getCamlLogical({
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

                        if (row.ID === itemId){

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
            o._cntr                 = $(lookupFieldTemplate)
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
                    .on("click", function(/*ev*/){

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
                o._lookupInputEle.on("focus", function(/*ev*/){

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
                    open: function(/*ev, ui*/){

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
                        if (
                            term.match(/\D/) === null &&
                            term.match(/\d/) !== null
                        ) {

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
                                filterItems.push(getCamlLogical({
                                    values: fieldFilters,
                                    type:   "AND"
                                }));
                            }
                        }

                        // Build the query using OR statements
                        var camlFilter = getCamlLogical({
                                            values: filterItems,
                                            type:   "OR"
                                        });

                        // If caller defined extra REQUIRED criteria, then
                        // build it into the query.
                        if (o.filter) {
                            camlFilter = getCamlLogical({
                                values: [camlFilter, o.filter],
                                type:   "AND"
                            });
                        }

                        // Find the items based on the user's input
                        getListItems({
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
                                    thisDt.label = fillTemplate(o.listTemplate, thisDt );

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

                    if (ev.which !== 13 ) { return; }

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
                    .then(function(/*xData, status*/){

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
            if (
                !o.msgNoItems &&
                (
                    o.allowMultiples === false ||
                    (
                        o.allowMultiples === true &&
                        cntr.find("div.spwidgets-item").length < 1
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
                    Inst.filter ?
                        '<Query><Where>' + Inst.filter + '</Where>' + Inst.filterOrderBy + '</Query>' :
                        '<Query>' + Inst.filterOrderBy + '</Query>'
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

                    dfd.resolveWith($, [opt.$lastPage]);
                    return;

                }

                opt.isLoading = true;

                // Create this new page of data container and save it as the "last" page displayed.
                var $page = $("<div/>").insertBefore(opt.$nextPage);
                opt.$lastPage = $page;

                // Get the data from the list using the user's filter,
                // maxResult and SelectFields. Then populate the selector
                // with the data found.
                getListItems({
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
                                        xmlEscape.escape(opt.nextPageToken) +
                                        "'/></QueryOptions>";

                                }

                            })(),
                    completefunc:   function(xData, status, rows){

                        var $rsData     = getNodesFromXml({
                                            xDoc: xData.responseXML,
                                            nodeName: "rs:data",
                                            asJQuery: true
                                        }).eq(0),
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
                            row.label = fillTemplate(Inst.listTemplate, row );

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
                            .on("click", "div.spwidget-lookup-item", function(/*ev*/){

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
            .click(function(/*ev*/){

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

    lookupField.defaults = Lookup.defaults;
    return lookupField;

});


