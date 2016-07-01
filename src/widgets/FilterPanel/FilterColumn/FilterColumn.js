define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",
    "vendor/jsutils/es6-promise",

    "vendor/domutils/domAddEventListener",
    "vendor/domutils/domAddClass",
    "vendor/domutils/domRemoveClass",
    "vendor/domutils/domHasClass",
    "vendor/domutils/domFind",

    "../FilterModel",

    "text!./FilterColumn.html",
    //--------------------------------------
    "less!./FilterColumn"
], function (
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,
    Promise,

    domAddEventListener,
    domAddClass,
    domRemoveClass,
    domHasClass,
    domFind,

    FilterModel,

    FilterColumnTemplate
) {

    var
    PRIVATE = dataStore.create(),

    CSS_CLASS_BASE          = 'spwidgets-FilterPanel-FilterColumn',
    CSS_CLASS_SHOW_OPTIONS  = CSS_CLASS_BASE + "--showOptions",
    CSS_CLASS_HIDE_INPUT    = CSS_CLASS_BASE + "--hideInput",
    CSS_CLASS_IS_DIRTY      = CSS_CLASS_BASE + "--isDirty",

    /**
     * Widget description
     *
     * @class FilterColumn
     * @extends Widget
     *
     * @param {Object} options
     *
     * @param {ListColumnModel} options.column
     *  the column definition
     *
     * @param {String} options.delimiter
     *
     * // FIXME: document all other parameters inherited from FilerPanel
     *
     * @fires FilterColumn#up
     * @fires FilterColumn#down
     */
    FilterColumn = /** @lends FilterColumn.prototype */{
        init: function (options) {
            var inst = {
                opt: objectExtend({}, FilterColumn.defaults, options)
            };

            PRIVATE.set(this, inst);

            var me  = this,
                $ui = me.$ui = parseHTML(
                    fillTemplate(FilterColumnTemplate, inst.opt)
                ).firstChild,
                uiFind          = inst.uiFind = $ui.querySelector.bind($ui),
                BASE_SELECTOR   = "." + CSS_CLASS_BASE,
                emit            = me.emit.bind(me);

            inst.inputHolder        = uiFind(BASE_SELECTOR + "-input-holder");
            inst.infoKeywords       = uiFind(BASE_SELECTOR + "-info-keywords");
            inst.compareOperator    = uiFind("select[name='compareOperator']");
            inst.logicalOperator    = uiFind("select[name='logicalOperator']");
            inst.sortOrder          = uiFind("select[name='sortOrder']");

            // Build the input for this widget
            switch (inst.opt.column.Type) {
                case "User":
                case "UserMulti":
                    buildUserField.call(me);
                    break;

                case "Counter":
                case "Number":
                case "RatingCount":
                case "AverageRating":
                case "Likes":
                    buildNumberField.call(me);
                    break;

                case "Computed":
                    // FIXME: check for Content Type field
                    //    Content Type Attribute:
                    //      Name: "ContentType"
                    //      PIAttribute:"ContentTypeID"
                    //      StaticName:"ContentType"

                    buildTextField.call(me);
                    break;

                case "DateTime":
                    buildDateTimeField.call(me);
                    break;

                case "Choice":
                case "MultiChoice":
                    buildChoiceField.call(me);
                    break;

                case "Lookup":
                case "LookupMulti":
                    buildLookupField.call(me);
                    break;

                case "Attachments":
                    buildAttachmentField.call(me);
                    break;

                default:
                    buildTextField.call(me);
            }

            inst.inputWdg.appendTo(inst.inputHolder);

            domAddEventListener(uiFind(BASE_SELECTOR + "-info-optLink"), "click", function(){
                me.toggleOptions();
            });

            domAddEventListener(uiFind(BASE_SELECTOR + "-move-up"), "click", function(){
                /**
                 * The Up arrow was clicked on the Filter column definition
                 *
                 * @event FilterColumn#up
                 */
                emit("up");
            });

            domAddEventListener(uiFind(BASE_SELECTOR + "-move-down"), "click", function(){
                /**
                 * The Down arrow was clicked on the Filter column definition
                 *
                 * @event FilterColumn#down
                 */
                emit("down");
            });

            domAddEventListener(inst.compareOperator, "change", evalDirtyState.bind(this));
            domAddEventListener(inst.sortOrder, "change", evalDirtyState.bind(this));

            this.onDestroy(function () {
                Object.keys(inst, function(instProp){
                    if (inst[instProp] && inst[instProp].destroy ) {
                        inst[instProp].destroy();
                    }
                });
                PRIVATE.delete(me);
            });
        },

        /**
         * Toggles the Column options visibility on and off
         */
        toggleOptions: function () {
            var $ui = this.getEle();

            if (domHasClass($ui, CSS_CLASS_SHOW_OPTIONS)) {
                domRemoveClass($ui, CSS_CLASS_SHOW_OPTIONS);

            } else {
                domAddClass($ui, CSS_CLASS_SHOW_OPTIONS);
            }
        },

        /**
         * returns an array of keywords from the value entered.
         *
         * @return {Array<String>}
         */
        getKeywords: function() {
            var opt         = PRIVATE.get(this).opt,
                delimiter   = opt.delimeter || ";",
                reIgnore    = opt.ignoreKeywords;

            return this.getValue()
                .split(delimiter)
                .map(function(keyword){
                    return keyword.trim();
                })
                .filter(function(keyword){
                    return (keyword && !reIgnore.test(keyword));
                });
        },

        /**
         * Returns an object with the keywords the user entered
         * along with matching and sorting options.
         *
         * @return {FilterModel}
         */
        getFilter: function(){
            var inst = PRIVATE.get(this);

            return FilterModel.create(
                {
                    logicalOperator:    inst.logicalOperator.value,
                    compareOperator:    inst.compareOperator.value,
                    sortOrder:          inst.sortOrder.value,
                    input:              this.getValue(),
                    values:             this.getKeywords()
                },
                { column: inst.opt.column }
            );
        },

        /**
         * Sets the filter with the default values. Any of the values provided by
         * FilterModel can be set.
         *
         * @param {Object} filter
         *
         * @returns {Promise}
         */
        setFilter: function (filter) {
            setFieldCommonFilters.call(this, filter);

            var response = Promise.resolve();

            if (filter && Array.isArray(filter.values)) {
                var inst = PRIVATE.get(this);
                response.then(inst.inputWdg.setValue(filter.values.join(inst.opt.delimiter)));
                evalDirtyState.call(this);
            }

            return response;
        },

        /**
         * Returns the value currently defined for the Column displayed
         * inside of the FilterColumn
         *
         * @return {String|Array}
         *  Depending on the type of column, getValue will either be a
         *  `String` or `Array`
         */
        getValue: function(){
            return PRIVATE.get(this).inputWdg.getValue();
        },

        /**
         * Sets the text displayed below the input field.
         *
         * @param {String} message
         */
        setKeywordInfo: function(message){
            var inst = PRIVATE.get(this);
            inst.infoKeywords.textContent = String(message);
        },

        /**
         * checks if the filter column is dirty - either it has a value entered or
         * Sort order was set
         *
         * @return {Boolean}
         */
        isDirty: function(){
            return domHasClass(this.getEle(), CSS_CLASS_IS_DIRTY);
        },

        /**
         * Selects the given logical operator on the widget.
         *
         * @param {String} internalLogicalOperator
         */
        setLogicalOperator: function(internalLogicalOperator) {
            var logicalOperator = PRIVATE.get(this).logicalOperator;
            logicalOperator.value = internalLogicalOperator;
            evalDirtyState.call(this);
        },

        /**
         * Selects the given sort order on the widget.
         *
         * @param {String} internalSortOrder
         */
        setSortOrder: function(internalSortOrder){
            var sortOrder = PRIVATE.get(this).sortOrder;
            sortOrder.value = internalSortOrder;
            evalDirtyState.call(this);
        },

        /**
         * Adds comparison operators to the column's dropdown.
         *
         * @param {Array<Object>} operators
         */
        addCompareOperators: function(operators){
            var compareOperator     = PRIVATE.get(this).compareOperator,
                newOperatorsHtml    = operators.reduce(function(html, operator){
                html += '<option value="' + operator.value + '">' + operator.title + '</option>';
                return html;
            }, "");

            compareOperator.appendChild(parseHTML(newOperatorsHtml));
        },

        /**
         * Selects the given comparison operator on the widget.
         *
         * @param {String} internalOperatorName
         */
        setCompareOperator: function(internalOperatorName){
            var compareOperator     = PRIVATE.get(this).compareOperator,
                $ui = this.getEle();
            compareOperator.value = internalOperatorName;

            if (internalOperatorName === "IsNull" || internalOperatorName === "IsNotNull") {
                domAddClass($ui, CSS_CLASS_SHOW_OPTIONS);
                domAddClass($ui, CSS_CLASS_HIDE_INPUT);

            } else {
                domRemoveClass($ui, CSS_CLASS_HIDE_INPUT);
            }

            evalDirtyState.call(this);
        },

        /**
         * Changes the default operator on the given value and then sets that value as the selected one.
         *
         * @param internalOperatorName
         */
        setCompareOperatorDefault: function (internalOperatorName) {
            var compareOperator     = PRIVATE.get(this).compareOperator;
            domFind(compareOperator, "option").forEach(function(option){
                if (option.value === internalOperatorName) {
                    option.setAttribute("selected", "selected");
                    compareOperator.value = internalOperatorName;

                } else {
                    option.removeAttribute("selected");
                }
            });
        }
    };

    /**
     * Evaluates the filter column dirty state and marks it as such
     *
     * @private
     *
     * @returns {boolean}
     */
    function evalDirtyState() {
        var inst                    = PRIVATE.get(this),
            compareOperatorValue    = inst.compareOperator.value,
            isCompareOperatorDirty  = compareOperatorValue === "IsNull" || compareOperatorValue === "IsNotNull",
            isSortOrderDirty        = !!inst.sortOrder.value,
            isUserInputDirty        = !!inst.inputWdg.getValue(),
            $ui                     = this.getEle();

        if (!isCompareOperatorDirty) {
            domRemoveClass($ui, CSS_CLASS_HIDE_INPUT);

        } else {
            domAddClass($ui, CSS_CLASS_SHOW_OPTIONS);
            domAddClass($ui, CSS_CLASS_HIDE_INPUT);
        }

        if (isUserInputDirty || isSortOrderDirty || isCompareOperatorDirty) {
            domAddClass($ui, CSS_CLASS_IS_DIRTY);
            return true;
        }

        domRemoveClass($ui, CSS_CLASS_IS_DIRTY);
        return false;
    }

    function getChoiceFieldKeywords() {
        return this.getValue();
    }

    function setChoiceFieldFilter(filter) {
        setFieldCommonFilters.call(this, filter);

        var response = Promise.resolve();

        if (filter && Array.isArray(filter.values)) {
            var inst = PRIVATE.get(this);
            response.then(inst.inputWdg.setValue(filter.values));
            evalDirtyState.call(this);
        }

        return response;
    }

    function setPeoplePickerFilter(filter) {
        setFieldCommonFilters.call(this, filter);
        PRIVATE.get(this).inputWdg.add(filter.values);
        evalDirtyState.call(this);
    }

    function setFieldCommonFilters(filter) {
        if (filter.compareOperator) {
            this.setCompareOperator(filter.compareOperator);
        }

        if (filter.logicalOperator) {
            this.setLogicalOperator(filter.logicalOperator);
        }

        if (typeof filter.sortOrder === "string") {
            this.setSortOrder(filter.sortOrder);
        }
    }

    function buildTextField() {
        var inst = PRIVATE.get(this);

        inst.inputWdg = inst.opt.TextField.create({
            column:             inst.opt.column,
            hideLabel:          true,
            hideDescription:    true,
            placeholder:        inst.opt.inputKeywords
        });

        inst.inputWdg.on("change", function() {
            evalDirtyState.call(this);
        }.bind(this));
    }

    function buildUserField() {
        this.setKeywordInfo("");

        var
        inst                = PRIVATE.get(this),
        // FIXME: should this move to FilterPanel? or maybe in .init()?
        FilterPeoplePicker  = inst.opt.PeoplePicker.extend({
            getValue: function(){
                return this.getSelected().map(function(person){
                    return {
                        ID:             person.ID,
                        Name:           person.Name,
                        AccountName:    person.AccountName
                    };
                });
            },
            setValue: function(){
                return this.add.apply(this, arguments);
            }
        }),
        peoplePicker    = inst.inputWdg = FilterPeoplePicker.create(),
        checkDirtyState = function () {
            setDirtyIndicator.call(this, !!peoplePicker.getSelected().length);
        }.bind(this);

        ['remove', 'select'].forEach(function(evName){
            peoplePicker.on(evName, checkDirtyState);
        });

        this.getKeywords = peoplePicker.getValue.bind(peoplePicker);
        this.setFilter   = setPeoplePickerFilter;
    }

    function buildNumberField() {
        var labels = PRIVATE.get(this).opt.labels;

        this.addCompareOperators([
            {
                value: "Gt",
                title: labels.greaterThan
            },
            {
                value: "Lt",
                title: labels.lessThan
            }
        ]);

        this.setCompareOperatorDefault("Eq");

        buildTextField.call(this);
    }

    function buildDateTimeField(){
        var labels = PRIVATE.get(this).opt.labels;

        this.addCompareOperators([
            {
                value: "Gt",
                title: labels.after
            },
            {
                value: "Lt",
                title: labels.before
            }
        ]);

        // FIXME: use a date picker widget
        buildTextField.call(this);
    }

    function buildAttachmentField() {
        var inst    = PRIVATE.get(this),
            opt     = inst.opt;

        this.setCompareOperatorDefault("Eq");
        this.setKeywordInfo(opt.labels.attachmentsInfo);

        domAddClass(this.getEle(), CSS_CLASS_BASE + "--noOptionsToggle");
        var attachmentsField = inst.inputWdg = opt.AttachmentsField.create({
            hideLabel:  true,
            column:     opt.column
        });

        attachmentsField.on("change", function(){
            var selectedValues  = attachmentsField.getValue(),
                totalSelected   = selectedValues.length > 1 ||
                                (selectedValues[0] && selectedValues[0] !== "");

            setDirtyIndicator.call(this, !!totalSelected);
        }.bind(this));

        this.getKeywords = getChoiceFieldKeywords;
    }

    function buildChoiceField(options){
        var
        inst    = PRIVATE.get(this),
        opt     = inst.opt,
        column  = opt.column,
        choice;

        // Change the type temporarily so that the widget is
        // created with Checkboxes
        choice = inst.inputWdg = opt.ChoiceField.create(
            objectExtend(
                {
                    column:     column,
                    hideLabel:  true,
                    isMulti:    true
                },
                options
            )
        );

        choice.on("change", function(){
            var totalSelected = choice.getValue().length;

            setDirtyIndicator.call(this, !!totalSelected);

            if (totalSelected) {
                this.setKeywordInfo(fillTemplate(opt.labels.totalSelected, {total: totalSelected}));

            } else {
                this.setKeywordInfo("");
            }
        }.bind(this));

        if (column.Type === "Choice") {
            this.setCompareOperatorDefault("Eq");
        }

        this.setKeywordInfo("");
        this.getKeywords = getChoiceFieldKeywords.bind(this);

        this.setFilter = setChoiceFieldFilter;
    }

    function buildLookupField() {
        var
        inst    = PRIVATE.get(this),
        opt     = inst.opt;

        inst.inputWdg = opt.LookupField.create({
            column:             opt.column,
            hideLabel:          true,
            hideDescription:    true
        });
    }

    /**
     * Sets the column dirty indicator
     *
     * @param {Boolean} isDirty
     */
    function setDirtyIndicator(isDirty){
        var $ui = this.getEle();
        if (isDirty) {
            domAddClass($ui, CSS_CLASS_IS_DIRTY);

        } else {
            domRemoveClass($ui, CSS_CLASS_IS_DIRTY);
        }
    }


    FilterColumn = EventEmitter.extend(Widget, FilterColumn);
    FilterColumn.defaults = {
        column:     {},
        delimiter:  ';'
    };

    return FilterColumn;
});