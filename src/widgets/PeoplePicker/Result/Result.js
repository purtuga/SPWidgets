import Persona          from "../../Persona/Persona"
import fillTemplate     from "common-micro-libs/src/jsutils/fillTemplate"
import domHasClass      from "common-micro-libs/src/domutils/domHasClass"
import domAddClass      from "common-micro-libs/src/domutils/domAddClass"
import domRemoveClass   from "common-micro-libs/src/domutils/domRemoveClass"

import ResultTemplate   from "./Result.html"
import "./Result.less";


//============================================================================

const CSS_CLASS_MS_PICKER_RESULT         = "spwidgets-PeoplePicker-Result";
const CSS_CLASS_MS_PICKER_RESULT_FOCUS   = CSS_CLASS_MS_PICKER_RESULT + "--focus";

/**
 * A People picker suggestion result
 *
 * @class Result
 * @extends Persona
 *
 * @param {Object} options
 * @param {Object} options.userProfile
 */
let Result = {
    init: function(){
        Persona.prototype.init.apply(this, arguments);
        if (this.getUserProfile().ID === "<userid/>") {
            this.setAsCurrentUser();
        }
        this.setSize("sm");
    },
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
    },

    /**
     * Used to highlight the persona that it is not a specific user, but
     * rather the pseudo entry that point to the currently logged in user.
     */
    setAsCurrentUser: function(){
        domAddClass(this.getEle(), "is-currentUserEntry");
    }
};

Result = Persona.extend(Result);

export default Result;

