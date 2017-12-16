import FilterColumnTextField from "../FilterColumnTextField/FilterColumnTextField";
import objectExtend from "common-micro-libs/src/jsutils/objectExtend";
import dataStore from "common-micro-libs/src/jsutils/dataStore";

const PRIVATE = dataStore.stash;
const FilterColumnTextFieldPrototype = FilterColumnTextField.prototype;
const toPrct = value => String(Number(value) * 100);
const toDecimal = value => String(Number(value) / 100);

/**
 * Widget description
 *
 * @class FilterColumnNumberField
 * @extends FilterColumnTextField
 *
 * @param {Object} options
 */
const FilterColumnNumberField = FilterColumnTextField.extend(/** @lends FilterColumnNumberField.prototype */{
    init: function (options) {
        if (options && options.value) {
            options.value = toPrct(options.value);
        }

        FilterColumnTextFieldPrototype.init.call(this,
            objectExtend({}, this.getFactory().defaults, options)
        );

        const labels = PRIVATE.get(this).opt.labels;

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
    },

    isPercent() {
        return !!(PRIVATE.get(this).opt.column || {}).Percentage;
    },

    setFilter(filter) {
        if (this.isPercent()){
            if (filter && filter.values) {
                filter.values.forEach((decimalValue, i) => filter.values[i] = toPrct(decimalValue));
            }
        }
        FilterColumnTextFieldPrototype.setFilter.call(this, filter);
    },

    getValue() {
        const response = FilterColumnTextFieldPrototype.getValue.call(this);
        return this.isPercent() ? toDecimal(response) : response;
    }
});

FilterColumnNumberField.defaults = {};

export default FilterColumnNumberField;
