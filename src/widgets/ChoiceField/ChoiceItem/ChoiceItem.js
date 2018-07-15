import Widget           from "common-micro-libs/src/jsutils/Widget"
import EventEmitter     from "common-micro-libs/src/jsutils/EventEmitter"
import dataStore        from "common-micro-libs/src/jsutils/dataStore"
import objectExtend     from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate     from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML        from "common-micro-libs/src/jsutils/parseHTML"
import uuid             from "common-micro-libs/src/jsutils/uuid"

import domAddEventListener  from "common-micro-libs/src/domutils/domAddEventListener"
import domAddClass          from "common-micro-libs/src/domutils/domAddClass"
import domRemoveClass       from "common-micro-libs/src/domutils/domRemoveClass"

import ChoiceItemTemplate from "./ChoiceItem.html"
import "./ChoiceItem.less"

//=======================================================================
const PRIVATE           = dataStore.create();
const uuidGenerate      = uuid.generate.bind(uuid);

const CSS_CLASS_BASE    = "spwidgets-ChoiceField-ChoiceItem";
const CSS_MS_IS_CHECKED = "is-checked";


/**
 * ChoiceItem Widget
 *
 * @class ChoiceItem
 * @extends Widget
 *
 * @param {Object} options
 *
 * @fires ChoiceItem#change
 */
const ChoiceItem = EventEmitter.extend(Widget).extend(/** @lends ChoiceItem.prototype */{
    init(options) {
        var inst = {
            opt: objectExtend({}, this.getFactory().defaults, options),
            msType: "RadioButton"
        };

        PRIVATE.set(this, inst);

        let opt = inst.opt;

        if (!opt.id) {
            opt.id = uuidGenerate();
        }

        // Set the MS Type which is used in the class name
        if (opt.type.toLowerCase() === "checkbox") {
            inst.msType = "CheckBox";
        }

        let $ui = this.$ui = this.getTemplate();

        if (typeof $ui === "string") {
            $ui = this.$ui = parseHTML(fillTemplate($ui, inst)).firstChild;
        }

        let uiFind = $ui.querySelector.bind($ui);

        inst.$input = uiFind(`.${ CSS_CLASS_BASE }-input`);
        inst.$label = uiFind(`.${ CSS_CLASS_BASE }-label`);

        inst.uiClickEv = domAddEventListener(inst.$input, "click", (/*ev*/) => {
            markChoiceField.call(this);

            /**
             * The state of the Choice item has changed
             *
             * @event ChoiceItem#change
             */
            this.emit("change");
        });

        this.onDestroy(function () {
            // Destroy all Compose object
            Object.keys(inst).forEach(function (prop) {
                if (inst[prop]) {
                    // Widgets
                    if (inst[prop].destroy) {
                        inst[prop].destroy();

                        // DOM events
                    } else if (inst[prop].remove) {
                        inst[prop].remove();

                        // EventEmitter events
                    } else if (inst[prop].off) {
                        inst[prop].off();
                    }

                    inst[prop] = undefined;
                }
            });

            PRIVATE["delete"](this);
        }.bind(this));
    },

    /**
     * returns the widget's template
     * @return {String}
     */
    getTemplate() {
        return ChoiceItemTemplate;
    },

    /**
     * Returns the value of this choice item - normally the same
     * as what was provided on input to the consructor.
     *
     * @return {Object|String}
     */
    getValue() {
        return PRIVATE.get(this).opt.value;
    },

    /**
     * Returns the data structure associated with this choice
     * (same as `data` attribute passed on input to constructor)
     */
    getData() {
        return PRIVATE.get(this).opt.data;
    },

    /**
     * returns the specific value in the Input (checkbox or radio) element `value` attribute
     *
     * @return {String}
     */
    getInputValue() {
        return PRIVATE.get(this).$input.value;
    },

    /**
     * returns a boolean indicating if choice is checked
     *
     * @return {Boolean}
     */
    isChecked() {
        return PRIVATE.get(this).$input.checked;
    },

    /**
     * Checks the choice and shows it as selected
     */
    check() {
        //let { $input, $label } = PRIVATE.get(this);

        PRIVATE.get(this).$input.checked = true;
        markChoiceField.call(this);
        //domAddClass($label, CSS_MS_IS_CHECKED);
    },

    /**
     * Unchecks the choice adn shows it as unselected
     */
    unCheck(){
        //let { $input, $label } = PRIVATE.get(this);

        PRIVATE.get(this).$input.checked = false;
        markChoiceField.call(this);
        //domRemoveClass($label, CSS_MS_IS_CHECKED);
    },

    /**
     * Toggles the check states of the choice item
     */
    toggle() {
        if (this.isChecked()) {
            this.unCheck();

        } else {
            this.check()
        }
    },

    /**
     * Re-evaluate the widget state and makes adjustment if needed.
     * Called primarily when Widget is set to use radio buttons
     */
    evalState() {
        markChoiceField.call(this);
    }
});


function markChoiceField() {
    let { $input, $label } = PRIVATE.get(this);

    if ($input.checked) {
        domAddClass($label, CSS_MS_IS_CHECKED);

    } else {
        domRemoveClass($label, CSS_MS_IS_CHECKED);
    }
}


ChoiceItem.defaults = {
    name:   "",
    title:  "",
    value:  "",
    type:   "radio", // checkbox -or- radio
    id:     "",
    data:   null
};

export default ChoiceItem;
