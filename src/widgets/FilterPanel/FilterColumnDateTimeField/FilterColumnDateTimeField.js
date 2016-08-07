define([
    "../FilterColumn/FilterColumn",
    "../../DateTimeField/DateTimeField",

    "vendor/jsutils/objectExtend",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/es6-promise"
], function (
    FilterColumn,
    DateTimeField,

    objectExtend,
    dataStore,
    Promise
) {

    var
    PRIVATE = dataStore.stash,

    /**
     * Filter Panel date/time field
     *
     * @class FilterColumnDateTimeField
     * @extends FilterColumn
     *
     * @param {Object} options
     */
    FilterColumnDateTimeField = /** @lends FilterColumnDateTimeField.prototype */{
        init: function (options) {
            FilterColumn.prototype.init.call(this,
                objectExtend({}, FilterColumnDateTimeField.defaults, options)
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
            this.addCompareOperators([
                {title: opt.labels.after,   value: 'Gt'},
                {title: opt.labels.before,  value: 'Lt'}
            ]);
        },

        getValue: function(){
            // FIXME: change coerce to array here once multiple dates are supported
            return [FilterColumn.prototype.getValue.call(this)];
        },

        setFilter: function(filter){
            var inst = PRIVATE.get(this);
            inst.setFieldCommonFilters(filter);
            inst.inputWdg.setValue(filter.values);
            return Promise.resolve();
        }
    };

    FilterColumnDateTimeField = FilterColumn.extend(FilterColumnDateTimeField);
    FilterColumnDateTimeField.defaults = {};

    return FilterColumnDateTimeField;
});