define([
    "../../Persona/Persona",
    "vendor/jsutils/fillTemplate",

    "vendor/domutils/domAddClass",

    "text!./PeoplePickerPersona.html",

    //-----------------------------
    "less!./PeoplePickerPersona"
], function (
    Persona,
    fillTemplate,

    domAddClass,

    PeoplePickerPersonaTemplate
) {

    var
    /**
     * A Selected Persona widget for the people picker, which includes
     * a button to remove the entry from the selected list.
     *
     * @class PeoplePickerPersona
     * @extends Persona
     *
     * @triggers PeoplePickerPersona#remove
     */
    PeoplePickerPersona = /** @lends PeoplePickerPersona.prototype **/{
        init: function () {
            Persona.prototype.init.apply(this, arguments);
            this.getEle().querySelector(".ms-PeoplePicker-personaRemove").addEventListener("click", function(){
                /**
                 * User clicked the remove button on the people picker persona.
                 *
                 * @event PeoplePickerPersona#remove
                 */
                this.emit("remove");
            }.bind(this));

            if (this.getUserProfile().ID === "<userid/>") {
                this.setAsCurrentUser();
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

    return PeoplePickerPersona;
});