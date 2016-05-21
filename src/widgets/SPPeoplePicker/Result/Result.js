define([
    "../../Persona/Persona",

    "vendor/jsutils/fillTemplate",

    "vendor/domutils/domHasClass",
    "vendor/domutils/domAddClass",
    "vendor/domutils/domRemoveClass",

    "text!./Result.html",

    //------------------------------------
    "less!./Result"
], function (
    Persona,

    fillTemplate,

    domHasClass,
    domAddClass,
    domRemoveClass,

    ResultTemplate
) {

    var
    CSS_CLASS_MS_PICKER_RESULT         = "ms-PeoplePicker-result",
    CSS_CLASS_MS_PICKER_RESULT_FOCUS   = CSS_CLASS_MS_PICKER_RESULT + "--focus",

    /**
     * A People picker suggestion result
     *
     * @class Result
     * @extends Persona
     *
     * @param {Object} options
     * @param {Object} options.userProfile
     */
    Result = {
        // Returns the People Picker Result wrapper with the persona template inside.
        getTemplate: function(){
            return fillTemplate(
                ResultTemplate,
                { PersonaTemplateHtml: Persona.prototype.getTemplate.call(this) }
            );
        },

        /**
         * Highlights he result items
         */
        setFocus: function(){
            domAddClass(this.getEle(), CSS_CLASS_MS_PICKER_RESULT_FOCUS);
        },

        /**
         * Removes the highlight of the item
         */
        removeFocus: function(){
            domRemoveClass(this.getEle(), CSS_CLASS_MS_PICKER_RESULT_FOCUS);
        },

        /**
         * Returns a boolean indicating if item is currently focused
         */
        hasFocus: function(){
            return domHasClass(this.getEle(), CSS_CLASS_MS_PICKER_RESULT_FOCUS);
        }
    };

    Result = Persona.extend(Result);

    return Result;
});