import Widget               from "common-micro-libs/src/jsutils/Widget"
import EventEmitter         from "common-micro-libs/src/jsutils/EventEmitter"
import dataStore            from "common-micro-libs/src/jsutils/dataStore"
import objectExtend         from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate         from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML            from "common-micro-libs/src/jsutils/parseHTML"
import uuid                 from "common-micro-libs/src/jsutils/uuid"
import domAddClass          from "common-micro-libs/src/domutils/domAddClass"
import domRemoveClass       from "common-micro-libs/src/domutils/domRemoveClass"
import domAddEventListener  from "common-micro-libs/src/domutils/domAddEventListener"

import BooleanFieldTemplate from "./BooleanField.html"
import "./BooleanField.less"

//==========================================================================
const PRIVATE               = dataStore.create();
const CSS_CLASS_IS_SELECTED = "is-selected";
const CSS_CLASS_BASE        = "spwidgets-BooleanField";

/**
 * BooleanField Widget is one that displays a `yes` or `no` type of user input.
 *
 * @class BooleanField
 * @extends Widget
 *
 * @param {Object} options
 *
 * @fires BooleanField#change
 */
const BooleanField = EventEmitter.extend(Widget).extend(/** @lends BooleanField.prototype */{
    init(options) {
        if (PRIVATE.has(this)) {
            return;
        }

        const Factory = this.getFactory();
        const opt = objectExtend({}, Factory.defaults, options);
        const inst = {
            opt,
            uid: uuid.generate()
        };

        PRIVATE.set(this, inst);

        if (!opt.column) {
            opt.column = {};
        }

        let $ui = this.$ui = this.getTemplate();

        if (typeof $ui === "string") {
            $ui = this.$ui = parseHTML(fillTemplate($ui, inst)).firstChild;
        }

        const $input = inst.$input = $ui.querySelector("input");
        const $label = $ui.querySelector("label");
        const setSelected = () => {
            if ($input.checked) {
                domAddClass($label, CSS_CLASS_IS_SELECTED);
            } else {
                domRemoveClass($label, CSS_CLASS_IS_SELECTED);
            }
            /**
             * the value of the Boolean field widget has changed
             *
             * @event BooleanField#change
             * @type {Object}
             * @property {String} value
             */
            this.emit("change", { value: this.getValue() });
        };

        inst.clickEv = domAddEventListener($input, "change", () => setSelected());
        setSelected();

        if (opt.hideLabel) {
            domAddClass($ui, `${ CSS_CLASS_BASE }--noLabel`);

        }

        if (opt.hideDescription) {
            domAddClass($ui, `${ CSS_CLASS_BASE }--noDescription`);
        }

        this.onDestroy(Factory.getDestroyCallback(inst, PRIVATE));
    },

    /**
     * returns the widget's template
     * @return {String}
     */
    getTemplate(){
        return BooleanFieldTemplate;
    },

    /**
     * Get the current value of the widget
     *
     * @return {String}
     */
    getValue() {
        return PRIVATE.get(this).$input.checked ? "1" : "0";
    }
});

/**
 * Global default options for BooleanField
 *
 * @name BooleanField.defaults
 * @type {Object}
 */
BooleanField.defaults = {
    column:             null,
    value:              0,
    hideLabel:          false,
    hideDescription:    false,
    labels: {
        yes: "Yes",
        no: "No"
    }
};

export default BooleanField;
