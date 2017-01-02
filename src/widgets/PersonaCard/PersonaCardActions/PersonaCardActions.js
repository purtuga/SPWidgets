import Widget       from "common-micro-libs/src/jsutils/Widget"
import EventEmitter from "common-micro-libs/src/jsutils/EventEmitter"
import dataStore    from "common-micro-libs/src/jsutils/dataStore"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML    from "common-micro-libs/src/jsutils/parseHTML"
import uuid         from "common-micro-libs/src/jsutils/uuid"

import domAddEventListener  from "common-micro-libs/src/domutils/domAddEventListener"
import domClosest           from "common-micro-libs/src/domutils/domClosest"
import domToggleClass       from "common-micro-libs/src/domutils/domToggleClass"

import PersonaCardActionsTemplate   from "./PersonaCardActions.html"
import actionTemplate               from "./action.html"

//==========================================================================
const PRIVATE = dataStore.create();
const CSS_CLASS_IS_ACTIVE               = "is-active";
const CSS_CLASS_MS_PERSONA_CARD_ACTION  = "ms-PersonaCard-action";


/**
 * PersonaCardActions Widget
 *
 * @class PersonaCardActions
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} options
 * @param {Array<Object>} options.actions
 *  An array of actions. Each action can have the following properties:
 *
 *  -   `icon`:     `{String}` - A CSS class. (ex. `ms-Icon--Mail`)
 *  -   `title`:    `{String}` - The title for the item.
 *  -   `id`:       `{String}` - the action's id
 *  -   `selected`: `{Boolean}` - If true, then item will be selected
 *
 * @fires PersonaCardActions#click
 */
const PersonaCardActions = EventEmitter.extend(Widget).extend(/** @lends PersonaCardActions.prototype */{
    init(options) {
        var inst = {
            opt: objectExtend({}, this.getFactory().defaults, options),
            selected: null
        };

        PRIVATE.set(this, inst);

        let $ui         = this.$ui = this.getTemplate();

        if (typeof $ui === "string") {
            $ui = this.$ui = parseHTML(fillTemplate($ui, {
                _actionsHTML: fillTemplate(
                    this.getActionTemplate(),
                    inst.opt.actions.map((action) => {
                        if (!action.id) {
                            action.id = uuid.generate();
                        }

                        if (action.selected) {
                            inst.selected = action;
                        }

                        return action;
                    })
                )
            })).firstChild;
        }

        let uiFind = inst.uiFind = $ui.querySelector.bind($ui);

        if (inst.selected) {
            this.setSelected(inst.selected);
        }

        inst.clickEv = domAddEventListener($ui, "click", (ev) => {
            let $actionEle  = domClosest(ev.target, `.${ CSS_CLASS_MS_PERSONA_CARD_ACTION }`);

            if ($actionEle) {
                let actionId = $actionEle.getAttribute("data-action-id");

                if (actionId) {
                    this.setSelected(actionId);
                    this.emit("click", { id: actionId });
                }
            }
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
        return PersonaCardActionsTemplate;
    },

    /**
     * Returns the HTML template for a single action
     * @return {String}
     */
    getActionTemplate() {
        return actionTemplate;
    },

    /**
     * Sets an action as Selected.
     *
     * @param {String|Object} selectAction
     */
    setSelected(selectAction) {
        let inst    = PRIVATE.get(this);
        let uiFind  = inst.uiFind;
        let actions = inst.opt.actions;
        let id      = typeof selectAction === "string" ? selectAction : "";

        if (!id) {
            actions.some((action) => {
                if (
                    action === selectAction ||
                    (
                        selectAction    &&
                        selectAction.id &&
                        selectAction.id === action.id
                    )
                ) {
                    id              = action.id;
                    inst.selected   = action;
                    return true;
                }
            });
        }

        if (id) {
            let $actionEle  = uiFind(`.${ CSS_CLASS_MS_PERSONA_CARD_ACTION }[data-action-id="${ id }"]`);
            let $active     = uiFind(`.${CSS_CLASS_IS_ACTIVE}`);

            if ($actionEle && $active !== $actionEle) {
                domToggleClass($active,  CSS_CLASS_IS_ACTIVE);
                domToggleClass($actionEle, CSS_CLASS_IS_ACTIVE);
            }
        }
    },

    /**
     * Returns the object of the currently selected action.
     *
     * @return {Object|undefined}
     */
    getSelected() {
        return PRIVATE.get(this).selected;
    }
});


PersonaCardActions.defaults = {
    actions: null   // Array
};

export default PersonaCardActions;
