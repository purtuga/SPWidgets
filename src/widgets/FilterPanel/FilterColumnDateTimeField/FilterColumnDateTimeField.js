import FilterColumn     from "../FilterColumn/FilterColumn";
import DateTimeField    from "../../DateTimeField/DateTimeField";
import objectExtend     from "common-micro-libs/src/jsutils/objectExtend";
import dataStore        from "common-micro-libs/src/jsutils/dataStore";
import Promise          from "common-micro-libs/src/jsutils/es6-promise";

//-------------------------------------------------------------------
const PRIVATE               = dataStore.stash;
const FilterColumnPrototype = FilterColumn.prototype;


/**
 * Filter Panel date/time field
 *
 * @class FilterColumnDateTimeField
 * @extends FilterColumn
 *
 * @param {Object} options
 */
const FilterColumnDateTimeField = FilterColumn.extend(/** @lends FilterColumnDateTimeField.prototype */{
    init: function (options) {
        FilterColumnPrototype.init.call(this,
            objectExtend({}, this.getFactory().defaults, options)
        );

        var
        inst        = PRIVATE.get(this),
        opt         = inst.opt,
        inputWdg    = inst.inputWdg = DateTimeField.create({
            column:             opt.column,
            hideLabel:          true,
            hideDescription:    true,
            allowMultiples:     true
        });

        inputWdg.on("change", this.evalDirtyState.bind(this));
        inputWdg.appendTo(inst.inputHolder);
        inputWdg.pipe(this, "DateTimeField");

        this.setKeywordInfo("");
        this.removeCompareOperators("Contains");
        this.addCompareOperators([
            {title: opt.labels.after,   value: "Gt"},
            {title: opt.labels.before,  value: "Lt"}
        ]);
        this.setCompareOperatorDefault("Eq");
    },

    getValue: function(){
        let dateValue = PRIVATE.get(this).inputWdg.getValue();
        if (!dateValue || !dateValue.dateObj) {
            return [];
        }
        return [ dateValue.dateObj.toISOString() ];
    },

    setFilter: function(filter){
        let inst    = PRIVATE.get(this);
        let values  = filter.values;

        inst.setFieldCommonFilters(filter);
        inst.inputWdg.setValue(Array.isArray(values) ? values[0] : values);
        this.evalDirtyState();
        return Promise.resolve();
    }
});

FilterColumnDateTimeField.defaults = {};

export default FilterColumnDateTimeField;
