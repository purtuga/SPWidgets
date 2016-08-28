import FilterColumn from "../FilterColumn/FilterColumn";
import objectExtend from "vendor/jsutils/objectExtend";
import dataStore from "vendor/jsutils/dataStore";
import uuid from "vendor/jsutils/uuid";
import fillTemplate from "vendor/jsutils/fillTemplate";
import parseHTML from "vendor/jsutils/parseHTML";
import ChoiceField from "../../ChoiceField/ChoiceField";
import choiceTemplate from "../../ChoiceField/choice.html";

    var
    WINDOW_NAVIGATOR    = window.navigator,
    PRIVATE             = dataStore.stash,

    /**
     * Filter column allowing the user to filter items based on whether
     * they have attachments or not.
     *
     * @class FilterColumnAttachmentsField
     * @extends FilterColumn
     *
     * @param {Object} options
     */
    FilterColumnAttachmentsField = /** @lends FilterColumnAttachmentsField.prototype */{
        init: function (options) {
            FilterColumn.prototype.init.call(this,
                objectExtend({}, FilterColumnAttachmentsField.defaults, options)
            );

            var
            inst    = PRIVATE.get(this),
            opt     = inst.opt,
            lang    = String(WINDOW_NAVIGATOR.language || WINDOW_NAVIGATOR.userLanguage || "en-US"),
            labels  = opt.labels || opt.i18n[lang] || opt.i18n["en-US"],
            attachmentsField = inst.inputWdg = AttachmentsField.create({
                layout:     "inline",
                hideLabel:  true,
                column:     opt.column,
                labels:     labels
            });

            attachmentsField.on("change", function(){
                this.evalDirtyState();
            }.bind(this));

            inst.inputWdg.setValue(options.selected || "");
            inst.inputWdg.appendTo(inst.inputHolder);

            this.setCompareOperatorDefault("Eq");
            this.setKeywordInfo(opt.labels.attachmentsInfo);
        }
    };


    // Extends ChoiceField and displays pick list for Attachments
    var AttachmentsField = ChoiceField.extend({
        init: function(options){
            options = objectExtend({}, options);
            ChoiceField.prototype.init.call(this, options);

            var
            labels      = options.labels,
            groupName   = uuid.generate(),
            listUI      = parseHTML(
                fillTemplate(choiceTemplate, [
                    {
                        name:   groupName,
                        title:  labels.any,
                        value:  "",
                        id:     uuid.generate(),
                        type:   "radio"
                    },
                    {
                        name:   groupName,
                        title:  labels.yes,
                        value:  "1",
                        id:     uuid.generate(),
                        type:   "radio"
                    },
                    {
                        name:   groupName,
                        title:  labels.no,
                        value:  "0",
                        id:     uuid.generate(),
                        type:   "radio"
                    }
                ])
            );

            this.getEle()
                .querySelector(".spwidgets-ChoiceField-choices")
                .appendChild(listUI);

            if (typeof options.selected !== "undefined") {
                this.setValue(options.selected);
            }
        }
    });

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
