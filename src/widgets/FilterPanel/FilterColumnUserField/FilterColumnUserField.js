import FilterColumn from "../FilterColumn/FilterColumn";
import PeoplePicker from "../../PeoplePicker/PeoplePicker";
import objectExtend from "common-micro-libs/src/jsutils/objectExtend";
import dataStore from "common-micro-libs/src/jsutils/dataStore";

//============================================================================
const PRIVATE = dataStore.stash;

/**
 * Filter Panel User field.
 *
 * @class FilterColumnUserField
 * @extends FilterColumn
 *
 * @param {Object} options
 */
const FilterColumnUserField = FilterColumn.extend(/** @lends FilterColumnUserField.prototype */{
    init: function (options) {
        const opt = objectExtend({}, this.getFactory().defaults, options);
        FilterColumn.prototype.init.call(this, opt);

        const inst            = PRIVATE.get(this);
        const userSelectionMode = opt.column ? opt.column.UserSelectionMode : null;
        const peoplePicker    = inst.inputWdg = opt.PeoplePickerWidget.create({
            resultsZIndex: inst.opt.zIndex,
            type: userSelectionMode && (userSelectionMode === "PeopleOnly" || String(userSelectionMode) === "0") ? "User" : "All"
        });

        ["remove", "select"].forEach(function(evName){
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
});

FilterColumnUserField.defaults = {
    PeoplePickerWidget: PeoplePicker
};

export default FilterColumnUserField;
