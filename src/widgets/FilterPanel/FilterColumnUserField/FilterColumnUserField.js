import FilterColumn from "../FilterColumn/FilterColumn";
import PeoplePicker from "../../PeoplePicker/PeoplePicker";
import objectExtend from "common-micro-libs/src/jsutils/objectExtend";
import dataStore from "common-micro-libs/src/jsutils/dataStore";

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
            objectExtend({}, this.getFactory().defaults, options)
        );

        var
        inst            = PRIVATE.get(this),
        peoplePicker    = inst.inputWdg = PeoplePicker.create({
            resultsZIndex: inst.opt.zIndex
        });

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

export default FilterColumnUserField;
