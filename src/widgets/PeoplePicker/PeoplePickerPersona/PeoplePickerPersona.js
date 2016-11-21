import Persona                      from "../../Persona/Persona"
import fillTemplate                 from "common-micro-libs/src/jsutils/fillTemplate"
import domAddClass                  from "common-micro-libs/src/domutils/domAddClass"
import objectExtend                 from "common-micro-libs/src/jsutils/objectExtend"

import PeoplePickerPersonaTemplate  from "./PeoplePickerPersona.html"
import "./PeoplePickerPersona.less";

//=========================================================================

/**
 * A Selected Persona widget for the people picker, which includes
 * a button to remove the entry from the selected list.
 *
 * @class PeoplePickerPersona
 * @extends Persona
 *
 * @triggers PeoplePickerPersona#remove
 */
let PeoplePickerPersona = /** @lends PeoplePickerPersona.prototype **/{
    init: function (options) {
        let opt = objectExtend({}, PeoplePickerPersona.defaults, options);

        Persona.prototype.init.call(this, opt);

        let evActionClickListener = this.on("action-click", () => {
            /**
             * User clicked the remove button on the people picker persona.
             *
             * @event PeoplePickerPersona#remove
             */
            this.emit("remove");
        });

        this.onDestroy(function(){
            evActionClickListener.off();
        });

        if (String(this.getUserProfile().ID).toLowerCase() === "<userid/>") {
            this.setAsCurrentUser();
            this.setPresence("noPresence");
        }
    },

    getTemplate: function(){
        return fillTemplate(
            PeoplePickerPersonaTemplate,
            { PersonaTemplateHtml: Persona.prototype.getTemplate.call(this) }
        );
    },

    /**
     * Used to highlight the persona that it is not a specific user, but
     * rather the pseudo entry that point to the currently logged in user.
     */
    setAsCurrentUser: function(){
        domAddClass(this.getEle(), "is-currentUserEntry");
    }
};

PeoplePickerPersona = Persona.extend(PeoplePickerPersona);
PeoplePickerPersona.defaults = objectExtend({}, PeoplePickerPersona.defaults, {
    variant:    "token",
    hideAction: false
});

export default PeoplePickerPersona;
