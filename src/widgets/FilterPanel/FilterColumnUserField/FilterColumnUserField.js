define([
    "../FilterColumn/FilterColumn",
    "../../PeoplePicker/PeoplePicker",

    "vendor/jsutils/objectExtend",
    "vendor/jsutils/dataStore"
], function (
    FilterColumn,
    PeoplePicker,

    objectExtend,
    dataStore
) {

    var
    PRIVATE = dataStore.stash,

    /**
     * Filter Panel User field.
     *
     * @class FilterColumnUserField
     * @extends FilterColumn
     *
     * @param {Object} options
     */
    FilterColumnUserField = /** @lends FilterColumnUserField.prototype */{
        init: function (options) {
            FilterColumn.prototype.init.call(this,
                objectExtend({}, FilterColumnUserField.defaults, options)
            );

            var
            inst            = PRIVATE.get(this),
            peoplePicker    = inst.inputWdg = PeoplePicker.create();

            ['remove', 'select'].forEach(function(evName){
                peoplePicker.on(evName, this.evalDirtyState.bind(this));
            }.bind(this));

            peoplePicker.appendTo(inst.inputHolder);
            this.setKeywordInfo("");
        },

        getValue: function(){
            return PRIVATE.get(this).inputWdg.getSelected();
        },

        setFilter: function(filter){
            var inst = PRIVATE.get(this);

            inst.setFieldCommonFilters.call(this, filter);

            return inst.inputWdg
                .add(filter.values)
                .then(function(){
                    this.evalDirtyState();
                }.bind(this));
        }
    };

    FilterColumnUserField = FilterColumn.extend(FilterColumnUserField);
    FilterColumnUserField.defaults = {};

    return FilterColumnUserField;
});