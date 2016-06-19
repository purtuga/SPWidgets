define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

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

    domAddEventListener,
    domAddClass,
    domRemoveClass,
    domHasClass,
    domFind,

    FilterModel,

    FilterColumnTemplate
) {

    var
    PRIVATE         = dataStore.create(),

    CSS_CLASS_BASE          = 'spwidgets-SPFilterPanel-FilterColumn',
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

                case "DateTime":
                    buildDateTimeField.call(me);
                    break;

                case "Choice":
                case "MultiChoice":
                    buildChoiceField.call(me);
                    break;

                case "Lookup":
                case "LookupMulti":
                    buildTextField.call(me); // FIXME: create lookup
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

            domAddEventListener(inst.compareOperator, "change", function(){
                var operator = inst.compareOperator.value;

                if (operator === "IsNull" || operator === "IsNotNull") {
                    domAddClass($ui, CSS_CLASS_HIDE_INPUT);

                } else {
                    domRemoveClass($ui, CSS_CLASS_HIDE_INPUT);
                }
            });

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
        getKeywords: function () {
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
                    values:             this.getKeywords()
                },
                { column: inst.opt.column }
            );
        },

        /**
         * Returns the value currently defined for the Column displayed
         * inside of the FilterColumn
         *
         * @return {String}
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
         * Sets the column dirty indicator
         *
         * @param {Boolean} isDirty
         */
        setDirty: function(isDirty){
            var $ui = this.getEle();
            if (isDirty) {
                domAddClass($ui, CSS_CLASS_IS_DIRTY);

            } else {
                domRemoveClass($ui, CSS_CLASS_IS_DIRTY);
            }
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
            var compareOperator     = PRIVATE.get(this).compareOperator;
            compareOperator.value = internalOperatorName;

            // FIXME: trigger events?
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

    function buildTextField() {
        var inst = PRIVATE.get(this);

        inst.inputWdg = inst.opt.TextField.create({
            column:             inst.opt.column,
            hideLabel:          true,
            hideDescription:    true,
            placeholder:        inst.opt.inputKeywords
        });

        inst.inputWdg.on("change", function (newValue) {
            this.setDirty(Boolean(newValue));
        }.bind(this));
    }

    function buildUserField() {
        this.setKeywordInfo("");

        var
        inst                = PRIVATE.get(this),
        FilterPeoplePicker  = inst.opt.PeoplePicker.extend({
            getValue: function(){
                return this.getSelected().map(function(person){
                    return person.ID;
                }).join(inst.opt.delimeter);
            }
        }),
        peoplePicker    = inst.inputWdg = FilterPeoplePicker.create(),
        checkDirtyState = function () {
            this.setDirty(!!peoplePicker.getSelected().length);
        }.bind(this);

        ['remove', 'select'].forEach(function(evName){
            peoplePicker.on(evName, checkDirtyState);
        });
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
        inst.inputWdg = opt.AttachmentsField.create({
            hideLabel:  true,
            column:     opt.column
        });
    }

    function buildChoiceField(options){
        this.setKeywordInfo("");

        var
        inst    = PRIVATE.get(this),
        opt     = inst.opt,
        choice  = inst.inputWdg = opt.ChoiceField.create(
            objectExtend(
                {
                    column:     opt.column,
                    hideLabel:  true
                },
                options
            )
        );

        choice.on("change", function(){
            this.setDirty(!!choice.getValue().length);
        }.bind(this));
    }

    FilterColumn = EventEmitter.extend(Widget, FilterColumn);
    FilterColumn.defaults = {
        column:     {},
        delimiter:  ';'
    };

    return FilterColumn;
});