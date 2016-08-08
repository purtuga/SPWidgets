import FilterColumnTextField from "../FilterColumnTextField/FilterColumnTextField";
import objectExtend from "vendor/jsutils/objectExtend";
import dataStore from "vendor/jsutils/dataStore";

    var
    PRIVATE = dataStore.stash,

    /**
     * Widget description
     *
     * @class FilterColumnNumberField
     * @extends FilterColumnTextField
     *
     * @param {Object} options
     */
    FilterColumnNumberField = /** @lends FilterColumnNumberField.prototype */{
        init: function (options) {
            FilterColumnTextField.prototype.init.call(this,
                objectExtend({}, FilterColumnNumberField.defaults, options)
            );

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
        }
    };

    FilterColumnNumberField = FilterColumnTextField.extend(FilterColumnNumberField);
    FilterColumnNumberField.defaults = {};

    export default FilterColumnNumberField;
