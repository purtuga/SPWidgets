import FilterColumn     from "../FilterColumn/FilterColumn";
import ContentTypeField from "../../ContentTypeField/ContentTypeField";
import objectExtend     from "common-micro-libs/src/jsutils/objectExtend";
import dataStore        from "common-micro-libs/src/jsutils/dataStore";
import fillTemplate     from "common-micro-libs/src/jsutils/fillTemplate";

const PRIVATE = dataStore.stash;


/**
 * Widget description
 *
 * @class FilterColumnContentTypeField
 * @extends FilterColumn
 *
 * @param {Object} options
 */
const FilterColumnContentTypeField = FilterColumn.extend(/** @lends FilterColumnContentTypeField.prototype */{
    init: function (options) {
        FilterColumn.prototype.init.call(this,
            objectExtend({}, this.getFactory().defaults, options)
        );

        const inst = PRIVATE.get(this);
        const opt     = inst.opt;
        const column  = opt.column;

        // Change the type temporarily so that the widget is
        // created with Checkboxes
        const choice = inst.inputWdg = ContentTypeField
            .extend({
                setChoices(choices) {
                    choices = choices || [];
                    return ContentTypeField.prototype.setChoices.call(this, choices.map(choice => {
                        choice.value = choice.title;
                        return choice;
                    }));
                }
            }).create(
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

            const totalSelected = choice.getValue().length;

            if (totalSelected) {
                this.setKeywordInfo(fillTemplate(opt.labels.totalSelected, {total: totalSelected}));

            } else {
                this.setKeywordInfo("");
            }
        }.bind(this));

        this.removeCompareOperators("Contains");
        this.setCompareOperatorDefault("Eq");
        this.setKeywordInfo("");
    },

    setFilter: function(filter){
        const inst = PRIVATE.get(this);
        inst.setFieldCommonFilters.call(this, filter);
        return inst.inputWdg.setSelected(filter.values).then(() => this.evalDirtyState());
    }
});

// FilterColumnContentTypeField.defaults = {};

export default FilterColumnContentTypeField;
