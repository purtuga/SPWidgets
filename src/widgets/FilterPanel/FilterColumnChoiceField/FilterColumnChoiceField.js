import FilterColumn from "../FilterColumn/FilterColumn";
import ChoiceField from "../../ChoiceField/ChoiceField";
import objectExtend from "vendor/jsutils/objectExtend";
import dataStore from "vendor/jsutils/dataStore";
import fillTemplate from "vendor/jsutils/fillTemplate";

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
        },

        setFilter: function(filter){
            var inst = PRIVATE.get(this);
            inst.setFieldCommonFilters.call(this, filter);
            return inst.inputWdg.setSelected(filter.values).then(() => this.evalDirtyState());
        }
    };

    FilterColumnChoiceField = FilterColumn.extend(FilterColumnChoiceField);
    FilterColumnChoiceField.defaults = {};

    export default FilterColumnChoiceField;
