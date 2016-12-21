import FilterColumn     from "../FilterColumn/FilterColumn"
import objectExtend     from "common-micro-libs/src/jsutils/objectExtend"
import dataStore        from "common-micro-libs/src/jsutils/dataStore"
import uuid             from "common-micro-libs/src/jsutils/uuid"
import fillTemplate     from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML        from "common-micro-libs/src/jsutils/parseHTML"
import ChoiceField      from "../../ChoiceField/ChoiceField"


//====================================================================
const WINDOW_NAVIGATOR    = window.navigator;
const PRIVATE             = dataStore.stash;

/**
 * Filter column allowing the user to filter items based on whether
 * they have attachments or not.
 *
 * @class FilterColumnAttachmentsField
 * @extends FilterColumn
 *
 * @param {Object} options
 */
let FilterColumnAttachmentsField = /** @lends FilterColumnAttachmentsField.prototype */{
    init: function (options) {
        FilterColumn.prototype.init.call(this,
            objectExtend({}, this.getFactory().defaults, options)
        );

        var
        inst    = PRIVATE.get(this),
        opt     = inst.opt,
        lang    = String(WINDOW_NAVIGATOR.language || WINDOW_NAVIGATOR.userLanguage || "en-US"),
        labels  = opt.labels || opt.i18n[lang] || opt.i18n["en-US"],
        attachmentsField = inst.inputWdg = ChoiceField.create({
            layout:     "inline",
            hideLabel:  true,
            column:     opt.column,
            labels:     labels
        });

        attachmentsField.setChoices([labels.any, labels.yes, labels.no]);

        attachmentsField.on("change", function(){
            this.evalDirtyState();
        }.bind(this));

        inst.inputWdg.setValue(options.selected || "");
        inst.inputWdg.appendTo(inst.inputHolder);

        this.setCompareOperatorDefault("Eq");
        this.setKeywordInfo(opt.labels.attachmentsInfo);
    }
};

FilterColumnAttachmentsField = FilterColumn.extend(FilterColumnAttachmentsField);
FilterColumnAttachmentsField.defaults = {
    layout:     "inline",
    selected:   "",
    i18n: {
        "en-US": {
            "any": "Any",
            "yes": "Yes",
            "no":  "No"
        }
    }
};

export default FilterColumnAttachmentsField;
