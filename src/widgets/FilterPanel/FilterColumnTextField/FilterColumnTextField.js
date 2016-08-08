import FilterColumn from "../FilterColumn/FilterColumn";
import TextField from "../../TextField/TextField";
import dataStore from "vendor/jsutils/dataStore";
import objectExtend from "vendor/jsutils/objectExtend";

    var
    PRIVATE = dataStore.stash,

    /**
     * A text field column for filter panel
     *
     * @class FilterColumnTextField
     * @extends FilterColumn
     *
     * @param {Object} options
     *  In addition to the options required/supported by
     *  [FilterColumn]{@link FilterColumn}, this Widget supports this additional
     *  set documented below
     *
     *  // FIXME document options
     */
    FilterColumnTextField = /** @lends FilterColumnTextField.prototype */{
        init: function (options) {
            FilterColumn.prototype.init.call(this,
                objectExtend({}, FilterColumnTextField.defaults, options)
            );

            var inst    = PRIVATE.get(this),
                opt     = inst.opt;

            inst.inputWdg = TextField.create({
                column:             opt.column,
                hideLabel:          true,
                hideDescription:    true,
                placeholder:        opt.inputKeywords
            });

            inst.inputWdg.on("change", function() {
                this.evalDirtyState();
            }.bind(this));

            inst.inputWdg.appendTo(inst.inputHolder);
        },

        getKeywords: function(){
            var
            opt         = PRIVATE.get(this).opt,
            delimiter   = opt.delimeter || ";",
            reIgnore    = opt.ignoreKeywords;

            return this.getValue()
                .split(delimiter)
                .map(function(keyword){
                    return keyword.trim();
                })
                .filter(function(keyword){
                    return (keyword && !reIgnore.test(keyword));
                });
        }
    };

    FilterColumnTextField = FilterColumn.extend(FilterColumnTextField);
    FilterColumnTextField.defaults = {
        delimiter:      ';',
        ignoreKeywords: new RegExp()
    };

    export default FilterColumnTextField;
