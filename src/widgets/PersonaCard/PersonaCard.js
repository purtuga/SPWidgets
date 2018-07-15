import Widget                       from "common-micro-libs/src/jsutils/Widget"
import EventEmitter                 from "common-micro-libs/src/jsutils/EventEmitter"
import dataStore                    from "common-micro-libs/src/jsutils/dataStore"
import objectExtend                 from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate                 from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML                    from "common-micro-libs/src/jsutils/parseHTML"

import Persona                      from "../Persona/Persona"

import PersonaCardActions           from "./PersonaCardActions/PersonaCardActions"
import PersonaCardActionDetails     from "./PersonaCardActionDetails/PersonaCardActionDetails"
import PersonaCardTemplate          from "./PersonaCard.html"
import "./PersonaCard.less"

//==========================================================================
const PRIVATE                   = dataStore.create();
const CSS_CLASS_MS_PERSONA_CARD = "ms-PersonaCard";
const CSS_CLASS_BASE            = "spwidgets-PersonaCard";

/**
 * PersonaCard Widget
 *
 * @class PersonaCard
 * @extends Widget
 *
 * @param {Object} options
 *
 * @fires PersonaCard#action-click
 */
const PersonaCard = EventEmitter.extend(Widget).extend(/** @lends PersonaCard.prototype */{
    init(options) {
        var inst = {
            opt:            objectExtend({}, this.getFactory().defaults, options),
            activeDetails:  null,
            detailWidgets:  {}
        };

        PRIVATE.set(this, inst);

        let opt = inst.opt;
        let $ui = this.$ui = this.getTemplate();

        if (typeof $ui === "string") {
            $ui = this.$ui = parseHTML(fillTemplate($ui, inst)).firstChild;
        }

        let uiFind              = $ui.querySelector.bind($ui);
        let userProfile         = opt.userProfile;
        let $actionDetailBox    = uiFind(`.${CSS_CLASS_MS_PERSONA_CARD}-actionDetailBox`);

        inst.personaWdg = opt.PersonaWidget.create(opt);
        inst.personaWdg.appendTo(uiFind(`.${CSS_CLASS_MS_PERSONA_CARD}-persona`));

        // Create actions
        if (!Array.isArray(opt.actions)) {
            opt.actions = [];
        }

        if (opt.showDefaultActions) {
            opt.actions.push(...[
                {
                    icon: "ms-Icon--Phone",
                    details: ["WorkPhone", "CellPhone", "HomePhone"].map((attr) => {
                        if (userProfile[attr]) {
                            return {
                                label: attr,
                                value: userProfile[attr]
                            }
                        }
                        return null;
                    }).filter(item => !!item)
                },
                {
                    icon: "ms-Icon--Mail",
                    details: ["Email", "WorkEmail"].map((attr) => {
                        if (userProfile[attr]) {
                            return {
                                label: attr,
                                value: `<a class="ms-Link" href="mailto:${ userProfile[attr] }">${ userProfile[attr] }</a>`
                            }
                        }
                        return null;
                    }).filter(item => !!item)
                }
            ]);
        }

        let detailWidgets   = inst.detailWidgets;
        let actionsWdg      = inst.actionsWdg = opt.PersonaCardActionsWidget.create({
            actions: opt.actions
        });
        actionsWdg.appendTo(uiFind(`.${CSS_CLASS_BASE}-actions`));
        actionsWdg.on("click", (data) => {

            if (inst.activeDetails) {
                inst.activeDetails.detach();
            }

            let id = data.id;
            let actionSetup;

            opt.actions.some((action) => {
                if (action.id === id) {
                    actionSetup = action;
                    return true;
                }
            });

            if (actionSetup && actionSetup.details) {
                if (actionSetup.details.appendTo) {
                    detailWidgets[id] = actionSetup.details;
                }

                if (!detailWidgets[id]) {
                    detailWidgets[id] = opt.PersonaCardDetailsWidget.create({
                        details: actionSetup.details
                    });
                }

                detailWidgets[id].appendTo($actionDetailBox);
                inst.activeDetails = detailWidgets[id];
            }
        });

        let selectedAction = actionsWdg.getSelected();
        if (selectedAction) {
            actionsWdg.emit("click", selectedAction);
        }

        /**
         * User clicked on an action
         *
         * @event PersonaCard#action-click
         */
        actionsWdg.pipe(this, "action-");


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

            PRIVATE["delete"](this);
        });
    },

    /**
     * returns the widget's template
     * @return {String}
     */
    getTemplate(){
        return PersonaCardTemplate;
    }
});

PersonaCard.defaults = {
    // Same options as Persona Widget
    userProfile:    null,
    presence:       "offline",
    variant:        "circle",
    size:           "xl",
    hideDetails:    false,
    hideAction:     true,
    hideInitials:   true,
    initialsColor:  "blue",
    // Specific to PersonaCard
    PersonaWidget:              Persona,
    PersonaCardActionsWidget:   PersonaCardActions,
    PersonaCardDetailsWidget:   PersonaCardActionDetails,
    actions:                    null,        // Array<Object>
    showDefaultActions:         true
};

export default PersonaCard;
