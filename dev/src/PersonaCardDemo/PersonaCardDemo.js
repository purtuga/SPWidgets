import Widget       from "common-micro-libs/src/jsutils/Widget"
import dataStore    from "common-micro-libs/src/jsutils/dataStore"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML    from "common-micro-libs/src/jsutils/parseHTML"

import getUserProfile   from "../../../src/spapi/getUserProfile"
import PeoplePicker     from "../../../src/widgets/PeoplePicker/PeoplePicker"
import PersonaCard      from "../../../src/widgets/PersonaCard/PersonaCard"

import PersonaCardDemoTemplate from "./PersonaCardDemo.html"
import "./PersonaCardDemo.less"

//==========================================================================
const PRIVATE = dataStore.create();


/**
 * PersonaCardDemo Widget
 *
 * @class PersonaCardDemo
 * @extends Widget
 *
 * @param {Object} options
 */
const PersonaCardDemo = Widget.extend(/** @lends PersonaCardDemo.prototype */{
    init(options) {
        var inst = {
            opt: objectExtend({}, this.getFactory().defaults, options)
        };

        PRIVATE.set(this, inst);

        let $ui = this.$ui = this.getTemplate();

        if (typeof $ui === "string") {
            $ui = this.$ui = parseHTML(fillTemplate($ui, inst)).firstChild;
        }

        let uiFind      = $ui.querySelector.bind($ui);
        let $cardHolder = uiFind(".card");

        inst.peoplePicker = PeoplePicker.create({
            allowMultiples: false,
            showSelected:   false
        });
        inst.peoplePicker.appendTo(uiFind(".picker"));

        inst.peoplePicker.on("select", (/** @type PeoplePickerUserProfileModel */person) => {
            inst.peoplePicker.hideResults();

            if (inst.personaCard) {
                inst.personaCard.destroy();
                inst.personaCard = null;
            }

            getUserProfile({
                accountName: person.AccountName,
                webURL:     person.webURL
            }).then((personProfile) => {
                inst.personaCard = PersonaCard.create({
                    userProfile: personProfile
                });
                inst.personaCard.appendTo($cardHolder);
            });
        });


        this.onDestroy(() => {
            // Destroy all Compose object
            Object.keys(inst).forEach(function (prop) {
                if (inst[prop]) {
                    [
                        "destroy",      // Compose
                        "remove",       // DOM Events Listeners
                        "off"           // EventEmitter Listeners
                    ].some((method) => {
                        if (inst[prop][method]) {
                            inst[prop][method]();
                            return true;
                        }
                    });

                    inst[prop] = undefined;
                }
            });

            PRIVATE['delete'](this);
        });
    },

    /**
     * returns the widget's template
     * @return {String}
     */
    getTemplate(){
        return PersonaCardDemoTemplate;
    }
});

PersonaCardDemo.defaults = {};

export default PersonaCardDemo;
