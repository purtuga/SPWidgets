define([
    "../../../models/ListColumnModel",

    "../../ChoiceField/ChoiceField",
    "text!../../ChoiceField/choice.html",

    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",
    "vendor/jsutils/uuid"
], function(
    ListColumnModel,
    ChoiceField,
    choiceTemplate,

    objectExtend,
    fillTemplate,
    parseHTML,
    uuid
){

    var
    WINDOW_NAVIGATOR    = window.navigator,

    FilterAttachmentsField = ChoiceField.extend({
        init: function(options){
            options = objectExtend({}, FilterAttachmentsField.defaults, options);
            ChoiceField.prototype.init.call(this, options);

            var
            lang        = String(WINDOW_NAVIGATOR.language || WINDOW_NAVIGATOR.userLanguage || "en-US"),
            labels      = options.i18n[lang] || options.i18n["en-US"],
            groupName   = uuid.generate(),
            listUI      = parseHTML(
                fillTemplate(choiceTemplate, [
                    {
                        name:   groupName,
                        title:  labels.any,
                        value:  "",
                        id:     uuid.generate()
                    },
                    {
                        name:   groupName,
                        title:  labels.yes,
                        value:  "1",
                        id:     uuid.generate()
                    },
                    {
                        name:   groupName,
                        title:  labels.no,
                        value:  "0",
                        id:     uuid.generate()
                    }
                ])
            );

            this.getEle()
                .querySelector(".spwidgets-ChoiceField-choices")
                .appendChild(listUI);
        }
    });

    FilterAttachmentsField.defaults = {
        layout: "inline",
        i18n: {
            "en-US": {
                "any": "Any",
                "yes": "Yes",
                "no":  "No"
            }
        }
    };

    return FilterAttachmentsField;
});