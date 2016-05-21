define([
    "../../Persona/Persona",
    "vendor/jsutils/fillTemplate",

    "text!./PeoplePickerPersona.html"
], function (
    Persona,
    fillTemplate,
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
                 * @event PeoplePickerPersona#remove
                 */
                this.emit("remove");
            }.bind(this));
        },

        getTemplate: function(){
            return fillTemplate(
                PeoplePickerPersonaTemplate,
                { PersonaTemplateHtml: Persona.prototype.getTemplate.call(this) }
            );
        }
    };

    PeoplePickerPersona = Persona.extend(PeoplePickerPersona);

    return PeoplePickerPersona;
});