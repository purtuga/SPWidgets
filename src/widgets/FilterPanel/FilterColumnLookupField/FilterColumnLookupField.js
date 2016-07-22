define([
    "../FilterColumn/FilterColumn",
    "../../LookupField/LookupField",

    "vendor/jsutils/objectExtend",
    "vendor/jsutils/dataStore"
], function (
    FilterColumn,
    LookupField,

    objectExtend,
    dataStore
) {

    var
    PRIVATE = dataStore.stash,

    /**
     * Filter panel lookup field
     *
     * @class FilterColumnLookupField
     * @extends FilterColumn
     *
     * @param {Object} options
     */
    FilterColumnLookupField = /** @lends FilterColumnLookupField.prototype */{
        init: function (options) {
            FilterColumn.prototype.init.call(this,
                objectExtend({}, FilterColumnLookupField.defaults, options)
            );

            var
            inst        = PRIVATE.get(this),
            opt         = inst.opt,
            inputWdg    = inst.inputWdg = LookupField.create({
                column:             opt.column,
                hideLabel:          true,
                hideDescription:    true,
                allowMultiples:     true
            });

            inputWdg.on("item:selected", this.evalDirtyState.bind(this));
            inputWdg.on("item:unselected", this.evalDirtyState.bind(this));
            inputWdg.appendTo(inst.inputHolder);

            this.setKeywordInfo("");
        },

        getValue: function(){
            return PRIVATE.get(this).inputWdg.getSelected();
        },

        setValue: function(options){
            return PRIVATE.get(this).inputWdg.setSelected(options);
        }
    };

    FilterColumnLookupField = FilterColumn.extend(FilterColumnLookupField);
    FilterColumnLookupField.defaults = {};

    return FilterColumnLookupField;
});