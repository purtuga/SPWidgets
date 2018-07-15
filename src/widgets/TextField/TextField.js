import Widget from "common-micro-libs/src/jsutils/Widget";
import EventEmitter from "common-micro-libs/src/jsutils/EventEmitter";
import dataStore from "common-micro-libs/src/jsutils/dataStore";
import objectExtend from "common-micro-libs/src/jsutils/objectExtend";
import fillTemplate from "common-micro-libs/src/jsutils/fillTemplate";
import parseHTML from "common-micro-libs/src/jsutils/parseHTML";
import domAddClass from "common-micro-libs/src/domutils/domAddClass";
import domAddEventListener from "common-micro-libs/src/domutils/domAddEventListener";
import TextFieldTemplate from "./TextField.html";
import "./TextField.less";

var
PRIVATE = dataStore.create(),

CSS_CLASS_BASE              = "spwidgets-TextField",
CSS_CLASS_NO_LABEL          = CSS_CLASS_BASE + "--noLabel",
CSS_CLASS_NO_DESCRIPTION    = CSS_CLASS_BASE + "--noDescription",

/**
 * A list field of type Text
 *
 * @class TextField
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} options
 * @param {ListColumnModel} [options.column={}]
 *  Although options, it is strongly suggested this be passed in on input, since
 *  some of display values are obtained from the list column definition - example
 *  the label (DisplayName) and field description if any.
 * @param {String} [options.value]
 * @param {Boolean} [options.hideLabel=false]
 * @param {String} [options.placeholder=""]
 *
 * @fires TextField#change
 * @fires TextField#key-enter
 */
TextField = /** @lends TextField.prototype */{
    init: function (options) {
        var inst = {
            opt: objectExtend({}, this.getFactory().defaults, options)
        };

        PRIVATE.set(this, inst);

        if (!inst.opt.column){
            inst.opt.column = {};
        }

        let opt     = inst.opt;
        let $ui     = this.$ui = parseHTML(
            fillTemplate(TextFieldTemplate, opt)
        ).firstChild;
        let uiFind  = $ui.querySelector.bind($ui);
        let $input  = inst.input = uiFind(".ms-TextField-field");
        let emit    = this.emit.bind(this);

        if (opt.hideLabel) {
            domAddClass($ui, CSS_CLASS_NO_LABEL);
        }

        if (opt.hideDescription) {
            domAddClass($ui, CSS_CLASS_NO_DESCRIPTION);
        }

        if (opt.value) {
            this.setValue(opt.value);
        }

        domAddEventListener($input, "input", function(){
            /**
             * Text field input was changed.
             *
             * @event TextField#change
             *
             * @type {String}
             */
            emit("change", $input.value);
        }.bind(this));

        domAddEventListener($input, "keyup", (ev) => {
            if (ev.which === 13) {
                /**
                 * User clicked ENTER key on the input field
                 *
                 * @event TextField#key-enter
                 *
                 * @type {String}
                 */
                emit("key-enter");
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

            PRIVATE["delete"](this);
        });
    },

    /**
     * Gets the value of the input.
     *
     * @returns {String}
     */
    getValue: function(){
        return PRIVATE.get(this).input.value;
    },

    /**
     * Sets the value of the input
     *
     * @param {String} newValue
     */
    setValue: function(newValue){
        PRIVATE.get(this).input.value = newValue;
    },

    /**
     * Validates the input.
     *
     * @returns {Boolean}
     *  `true` = input if valid. `false`, input is invalid.
     */
    isValid: function(){
        var inst = PRIVATE.get(this);

        return !(inst.column.Required && !inst.input.value);
    },

    /**
     * Returns the native HTML input element of the widget
     *
     * @return {HTMLElement}
     */
    getInputEle: function(){
        return PRIVATE.get(this).input;
    },

    /**
     * Sets focus on the input field
     */
    setFocus(){
        this.getInputEle().focus();
    }
};

TextField = EventEmitter.extend(Widget, TextField);
TextField.defaults = {
    column:             null,
    hideLabel:          false,
    hideDescription:    false,
    placeholder:        "",
    value:              ""
};

export default TextField;


// SAMPLE OF TEXT FIELD DEFINITION:
//  <Field
//      ID="{fa564e0f-0c70-4ab9-b863-0177e6ddd247}"
//      Type="Text"
//      Name="Title"
//      DisplayName="Task Name"
//      Required="TRUE"
//      SourceID="http://schemas.microsoft.com/sharepoint/v3"
//      StaticName="Title"
//      FromBaseType="TRUE"
//      Sealed="TRUE"
//      ColName="nvarchar1"/>

