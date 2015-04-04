define([
    'jquery',
    'text!./filterPanel.html',
    'text!./filterPanelColumn.html',
    'text!./filterPanelChoiceField.html',
    'text!./filterPanelTextField.html',
    '../spapi/getSiteUrl',
    '../spapi/getList',
    '../sputils/parseLookupFieldValue',
    '../sputils/fillTemplate',
    '../sputils/getCamlLogical',
    '../sputils/xmlEscape',
    '../lookupFieldWidget/lookupField',
    '../peoplePickerWidget/peoplePicker',
    '../dateFieldWidget/dateField',
    '../sputils/doesMsgHaveError',
    '../sputils/getMsgError',
    //------------------------------
    'less!./filterPanel'
], function(
    $,
    filterPanelTemplate,
    filterPanelColumnTemplate,
    filterPanelChoiceFieldTemplate,
    filterPanelTextFieldTemplate,
    getSiteUrl,
    getList,
    parseLookupFieldValue,
    fillTemplate,
    getCamlLogical,
    xmlEscape,
    lookupFieldWidget,
    peoplePickerWidget,
    dateFieldWidget,
    doesMsgHaveError,
    getMsgError
){


    var Filter  = {},
        filterPanel;

    /**
     * Default options.
     */
    Filter.defaults = {
        list:                   '',
        webURL:                 '',
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
    filterPanel = function(containers, options){

        var arg = Array.prototype.slice.call(arguments, 1),
            $this = containers;

        // If input was a string, then must be a method.
        if (typeof options === "string") {

            if (!$this.eq(0).hasClass("hasSPFilterPanel")) {

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

            })($this);

        } //end: if(): options === string

        // --------------------------------
        // Build the plugin on each element
        // --------------------------------
        return $this.each(function(){

            var opt     = $.extend({}, Filter.defaults, options),
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

            if (!opt.webURL) {
                opt.webURL = getSiteUrl();
            }

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
                    getList({
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

                            if (doesMsgHaveError($msg)) {

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

                    Inst.getListDefinition().then(function(/*xData, status*/){

                        var $list   = this,
                            columns = '',
                            colUI   =$.trim(filterPanelColumnTemplate);

                        // Insert the UI into the page and set
                        // pointer ($ui) to it.
                        Inst.$ui = $($.trim(filterPanelTemplate)).appendTo(
                                Inst.$ele.empty().addClass("hasSPFilterPanel") );

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

                                        inputUI += fillTemplate(
                                            $.trim(filterPanelChoiceFieldTemplate),
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

                                    thisColUI = fillTemplate(
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

                                    thisColUI = fillTemplate(
                                        thisColUI
                                            .replace(/__COLUMN__UI__/, model.input_ui)
                                            .replace(/__OTHER_FILTER_TYPES__/, ''),
                                        model
                                    );

                                    break;

                                //============================================
                                // === all types below use the input field ===
                                //============================================

                                // DEFAULT: Show as a text field
                                default:

                                    // lets set the type on the Column
                                    switch ($thisCol.attr("Type")) {

                                        case "Lookup":
                                        case "LookupMulti":

                                            if (model.type === null) {

                                                model.type = 'lookup';
                                                model.list = $thisCol.attr("List");

                                                if ( model.list === "Self") {

                                                    model.list = $list.find("List").attr("Title");

                                                }

                                            }
                                            break;

                                        case "User":
                                        case "UserMulti":

                                            if (model.type === null) {

                                                model.type = 'people';

                                            }
                                            break;

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
                                            break;

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
                                                    $thisCol.attr("Format") !== "DateOnly" ?
                                                        "DateTime" :
                                                        "DateOnly"
                                               );

                                            }
                                            break;

                                        default:

                                            model.type = 'text';
                                            break;

                                    } //end: switch(): set the model.type only

                                    // BUILD the input field for this.
                                    inputUI     = $.trim(filterPanelTextFieldTemplate);
                                    thisColUI   = thisColUI
                                                .replace(/__COLUMN__UI__/, inputUI)
                                                .replace(/__OTHER_FILTER_TYPES__/, model.otherFilterTypes);
                                    thisColUI   = fillTemplate(thisColUI,
                                        $.extend(model, {
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

                                lookupFieldWidget(
                                    $field,
                                    {
                                        list:           $field
                                                            .closest("div.spwidget-column")
                                                            .data("spwidget_list"),
                                        template:       '<div>{{Title}} <span class="spwidgets-item-remove">[x]</span></div>',
                                        listTemplate:   '{{Title}}',
                                        allowMultiples: true,
                                        readOnly:       false,
                                        filter:         '',
                                        showSelector:   true
                                    }
                                );

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

                                peoplePickerWidget($field, {
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

                                dateFieldWidget($field, {
                                    allowMultiples: true,
                                    showTimepicker: (
                                        $column.data("spwidget_sp_format") === "DateTime" ?
                                            true :
                                            false
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
                                        .on("click", function(/*ev*/){

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
                    .fail(function(/*xData, status*/){

                        var $msg = this;

                        Inst.$ele
                            .html(
                                '<div class="ui-state-error">Unable to retrieve list information. ' +
                                getMsgError($msg) + '</div>' );

                        dfd.reject();

                    });


                }).promise();

            }; //end: Inst.buildWidget()

            // A few validations

            if (
                Inst.opt.ignoreKeywords &&
                !Inst.opt.ignoreKeywords instanceof RegExp
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
    Filter.onFilterInputChange = function(/*ev*/){

        var $input      = $(this),
            $cntr       = $input.closest("div.spwidget-filter-value-input"),
            $col        = $cntr.closest("div.spwidget-column"),
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
    Filter.onFilterTypeChange = function(/*ev*/) {

        var $ele            = $(this),
            $col            = $ele.closest("div.spwidget-column"),
            $logicalType    = $col.find("div.spwidget-filter-type-cntr select.spwidget-match-type"),
            $colValCntr     = $col.find("div.spwidget-filter-value-cntr"),
            $colInput       = $colValCntr.find(".spwidget-input"),
            inputVal        = '',
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
    Filter.onFilterButtonClick = function(/*ev*/) {

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
                .val("");

        // reset date fields
        dateFieldWidget(Inst.$ui.find(".hasSPDateField"), "reset");

        // reset people fields
        peoplePickerWidget(Inst.$ui.find(".hasPickSPUser"), "method", "clear");

        // reset lookup fields
        lookupFieldWidget(Inst.$ui.find(".hasLookupSPField"), "method", "clear");

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

            return getCamlLogical({
                    type:           colFilterObj.logicalType,
                    values:         colFilterObj.values,
                    onEachValue:    function(filterVal){

                        return "<" + colFilterObj.matchType +
                                "><FieldRef Name='" + colFilterObj.columnName +
                                "' /><Value Type='Text'>" +
                                xmlEscape.escape(filterVal) +
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
            if (
                thisColFilter.matchType === "IsNull" ||
                thisColFilter.matchType === "IsNotNull"
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
                                    lookupVals  = parseLookupFieldValue($lookup.val()),
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
                                thisColFilter.CAMLQuery = getCamlLogical({
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

                            var dtObj = dateFieldWidget($input, "getDate");

                            if (dtObj.dates.length) {

                                thisColFilter.values    = dtObj.dates;
                                thisColFilter.count     = thisColFilter.values.length;
                                thisColFilter.CAMLQuery = getCamlLogical({
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

                                    if (
                                        !Inst.opt.ignoreKeywords.test(thisKeyword) &&
                                        thisKeyword
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

            filters.CAMLQuery = getCamlLogical({
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
            if (
                type === "boolean" ||
                (
                    filter.matchType !== "IsNull" &&
                    filter.matchType !== "IsNotNull"
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

                        lookupFieldWidget($input, "method", "add", thisFilter.values.join(";#") );
                        break;

                    case "people":

                        peoplePickerWidget($input, "method", "add", thisFilter.values.join(";#") );
                        break;

                    case "date":

                        // If dateTime value, then let SPDateField parse values
                        if ($colUI.data("spwidget_sp_format") === "DateTime") {

                            dateFieldWidget($input, 'setDate', thisFilter.values);

                        // Regular dates - Provide format input
                        } else {

                            dateFieldWidget($input, 'setDate', thisFilter.values, 'yy-mm-dd');

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

    filterPanel.defaults = Filter.defaults;
    return filterPanel;

});