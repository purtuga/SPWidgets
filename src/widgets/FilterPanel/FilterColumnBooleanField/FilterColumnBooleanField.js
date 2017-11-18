import FilterColumn from "../FilterColumn/FilterColumn";
import BooleanField from "../../BooleanField/BooleanField";
import dataStore    from "common-micro-libs/src/jsutils/dataStore";
import objectExtend from "common-micro-libs/src/jsutils/objectExtend";

const PRIVATE = dataStore.stash;

/**
 * A text field column for filter panel
 *
 * @class FilterColumnBooleanField
 * @extends FilterColumn
 *
 * @param {Object} options
 *  In addition to the options required/supported by
 *  [FilterColumn]{@link FilterColumn}, this Widget supports this additional
 *  set documented below
 *
 */
const FilterColumnBooleanField = FilterColumn.extend(/** @lends FilterColumnBooleanField.prototype */{
    init: function (options) {
        FilterColumn.prototype.init.call(this,
            objectExtend({}, this.getFactory().defaults, options)
        );

        const inst      = PRIVATE.get(this);
        const opt       = inst.opt;
        const inputWdg  = inst.inputWdg = BooleanField.create({
            column:             opt.column,
            value:              opt.value,
            hideLabel:          true,
            hideDescription:    true
        });

        inputWdg.on("change", () => this.evalDirtyState());
        inputWdg.appendTo(inst.inputHolder);
        this.removeCompareOperators("Contains");
        this.setCompareOperatorDefault("Eq");
        this.setKeywordInfo("");
        this.evalDirtyState();
    },

    appendTo(ele) {
        FilterColumn.prototype.appendTo.call(this, ele);
        this.evalDirtyState();
    }
});


export default FilterColumnBooleanField;
