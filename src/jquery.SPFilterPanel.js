/**
 * @fileOverview - List filter panel widget
 * 
 * BUILD: _BUILD_VERSION_DATE_
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
        list:               '',
        webURL:             $().SPServices.SPGetCurrentSite(),
        columns:            ['Title'],
        textFieldTooltip:   'Use a semicolon to delimiter multiple keywords.',
        showFilterButton:   true,
        showStackedUI:      false,
        filterButtonLabel:  "Filter",
        onFilterClick:      null,
        onReady:            null,
        ignoreKeywords:     /^(of|and|a|an|to|by|the|or|from)$/i
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
     * @param {Boolean} [options.showFilterButton=true]
     * @param {Boolean} [options.showStackedUI=false]
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
     * $(ele).SPFilterPanel("destroy");
     * 
     *      Removes the widget from the page.
     * 
     */
    $.fn.SPFilterPanel = function(options){
        
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
                    case "getfilter":
                        
                        response = Filter.getFilterValues(Inst);
                        
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
                        
                        // If showStackedUI is true, then add class that will
                        // cause the UI to be vertical.
                        if (Inst.opt.showStackedUI) {
                            
                            Inst.$ui
                                .find("div.spwidget-filter-column-cntr")
                                .addClass("spwidget-filter-fmt-stacked");
                            
                        }
                        
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
                                    type:   null
                                };
                            
                            if (!$thisCol.length) {
                                
                                $thisCol = $list
                                            .find("Field[Name='" + v + "']");
                                
                            }
                            
                            if (!$thisCol.length){
                                
                                return;
                                
                            }
                            
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
                                            type:        'choice'
                                        }
                                    );
                                    
                                    break;
                                
                                // From here until DEFAUL, we only set the type.
                                case "Lookup":
                                case "LookupMulti":
                                    
                                    model.type = 'lookup';
                                    model.list = $thisCol.attr("List");
                                    
                                    if ( model.list === "Self") {
                                        
                                        model.list = $list.find("List").attr("Title");
                                        
                                    }
                                    
                                
                                case "User":
                                case "UserMulti":
                                    
                                    if (model.type === null) {
                                        
                                        model.type = 'people';
                                        
                                    }
                                    
                                // DEFAULT: Show as a text field
                                default:
                                    
                                    if (model.type === null) {
                                        
                                        model.type = 'text';
                                        
                                    }
                                    
                                    inputUI = Filter.templates
                                                .filter("#filter_text_field")
                                                    .html();
                                    
                                    thisColUI = thisColUI.replace(/__COLUMN__UI__/, inputUI);
                                    
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
                                    list: $field.data("spwidget_list")
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
                        
                        // Setup the Button on the UI (if applicable)
                        if (Inst.opt.showFilterButton) {
                            
                            Inst.$ui
                                .find("div.spwidget-filter-button-cntr button")
                                    .button({
                                        icons: {
                                            primary: "ui-icon-search"
                                        },
                                        label: Inst.opt.filterButtonLabel
                                    })
                                    .on("click", Filter.onFilterButtonClick);
                            
                        // Else, remove button container
                        } else {
                            
                            Inst.$ui
                                .find("div.spwidget-filter-button-cntr")
                                    .remove();
                            
                        }
                        
                        // Bind event
                        Inst.$ui
                            // Filter type change()
                            .on(
                                "change.SPWigets.SPFilterPanel",
                                "select.spwidget-filter-type", 
                                Filter.onFilterTypeChange
                            );
                        
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
                        
                        // Store the Widget Inst object in the UI
                        Inst.$ui
                            .data("SPFilterPanelInst", Inst);
                        
                        
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
     * Bound to the $ui. Listen for changes in the filter type
     * select element.
     * 
     * @param {jQuery.Event} ev
     * 
     * return {jQuery} this
     */
    Filter.onFilterTypeChange = function(ev) {
        
        var $ele        = $(this),
            $colValCntr = $ele
                            .closest("div.spwidget-column")
                            .find("div.spwidget-filter-value-cntr"),
            $colInput   = $colValCntr.find(".spwidget-input"),
            eleValue    = $ele.val();
        
        if (eleValue === "IsNull" || eleValue === "IsNotNull") {
            
            $colValCntr.addClass("spwidget-disabled");
            $colInput.attr("disabled", "disabled");
            
        } else {
            
            $colValCntr.removeClass("spwidget-disabled");
            $colInput.removeAttr("disabled", "disabled");
            
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
     *          filters: {
     *              columnInternalName: {
     *                  matchType: 'Eq',
     *                  values: [
     *                      'filter value 1',
     *                      'filter value 2',
     *                      etc...
     *                  ],
     *                  CAMLQuery: 'string with query wrapped in an <Or> aggregate',
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
                    type:           'OR',
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
                        columnName: colName,
                        matchType:  $thisCol
                                        .find("select.spwidget-filter-type")
                                            .val(),
                        values:     [],
                        count:      0,
                        CAMLQuery:  ''
                    },
                colFilterWasSet = false,
                colType         = $thisCol.data("spwidget_column_type");
            
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
                                    
                                };
                                
                            });
                            
                            if (thisColFilter.values.length) {
                                
                                thisColFilter.count     = thisColFilter.values.length;
                                thisColFilter.CAMLQuery = $.SPWidgets.getCamlLogical({
                                        type:           'OR',
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
                    
                    // -------------------- TEXT COLUMNS
                    case "text":
                        
                        // ELSE, if user entered text, then parse it
                        if ( String( $.trim( $input.val() ) ).length ) {
                            
                            (function(){
                                
                                var keywords = $input.val().split(';'),
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
                                };
                                
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
                
            }
            
            
        });
        
        // Build the CAMLQuery
        if (filters.count > 1) {
            
            filters.CAMLQuery = $.SPWidgets.getCamlLogical({
                                    type:   'AND',
                                    values: colFilters,
                                });
            
        } else if (filters.count === 1 ) {
            
            filters.CAMLQuery = colFilters[0];
            
        } 
        
        return filters;
        
    }; // Filter.getFilterValues()
    
    /**
     * @property
     * Stores the Style sheet that is inserted into the page the first
     * time SPFilterPanel() is called.
     * Value is set at build time.
     */
    Filter.styleSheet = "_INCLUDE_FILTER_CSS_TEMPLATE_";
    
    /**
     * @property
     * Stores the HTML template for each Filter widget.
     * Value is set at build time.
     */
    Filter.htmlTemplate = "_INCLUDE_FILTER_HTML_TEMPLATE_";
    
})(jQuery); /***** End of module: jquery.SPFilterPanel.js */
