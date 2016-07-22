define([
    "../FilterColumn/FilterColumn",
    "../../ChoiceField/ChoiceField",

    "vendor/jsutils/objectExtend",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/fillTemplate"
], function (
    FilterColumn,
    ChoiceField,

    objectExtend,
    dataStore,
    fillTemplate
) {

    var
    PRIVATE = dataStore.stash,

    /**
     * Widget description
     *
     * @class FilterColumnChoiceField
     * @extends FilterColumn
     *
     * @param {Object} options
     */
    FilterColumnChoiceField = /** @lends FilterColumnChoiceField.prototype */{
        init: function (options) {
            FilterColumn.prototype.init.call(this,
                objectExtend({}, FilterColumnChoiceField.defaults, options)
            );

            var
            inst = PRIVATE.get(this),
            opt     = inst.opt,
            column  = opt.column,
            choice;

            // Change the type temporarily so that the widget is
            // created with Checkboxes
            choice = inst.inputWdg = ChoiceField.create(
                objectExtend(
                    {
                        column:     column,
                        hideLabel:  true,
                        isMulti:    true
                    },
                    options
                )
            );

            choice.appendTo(inst.inputHolder);
            choice.on("change", function(){
                this.evalDirtyState();

                var totalSelected = choice.getValue().length;

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
        }
    };

    FilterColumnChoiceField = FilterColumn.extend(FilterColumnChoiceField);
    FilterColumnChoiceField.defaults = {};

    return FilterColumnChoiceField;
});