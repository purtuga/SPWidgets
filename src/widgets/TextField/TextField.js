define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "vendor/domutils/domAddClass",
    "vendor/domutils/domAddEventListener",

    "text!./TextField.html",
    //-------------------------------
    "./TextField.less"
], function (
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    domAddClass,
    domAddEventListener,

    TextFieldTemplate
) {

    var
    PRIVATE = dataStore.create(),

    CSS_CLASS_BASE              = 'spwidgets-TextField',
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
     * @param {Boolean} [options.hideLabel=false]
     * @param {String} [options.placeholder=""]
     *
     * @fires TextField#change
     */
    TextField = /** @lends TextField.prototype */{
        init: function (options) {
            var inst = {
                opt: objectExtend({}, TextField.defaults, options)
            };

            PRIVATE.set(this, inst);

            if (!inst.opt.column){
                inst.opt.column = {};
            }

            var $ui     = this.$ui = parseHTML(
                            fillTemplate(TextFieldTemplate, inst.opt)
                        ).firstChild,
                uiFind  = $ui.querySelector.bind($ui);

            inst.input = uiFind(".ms-TextField-field");

            if (inst.opt.hideLabel) {
                domAddClass($ui, CSS_CLASS_NO_LABEL);
            }

            if (inst.opt.hideDescription) {
                domAddClass($ui, CSS_CLASS_NO_DESCRIPTION);
            }

            domAddEventListener(inst.input, "input", function(){
                /**
                 * Text field input was changed.
                 *
                 * @event TextField#change
                 *
                 * @type {String}
                 */
                this.emit("change", inst.input.value);
            }.bind(this));

            this.onDestroy(function () {
                PRIVATE.delete(this);
            }.bind(this));
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
        }
    };

    TextField = EventEmitter.extend(Widget, TextField);
    TextField.defaults = {
        column:             null,
        hideLabel:          false,
        hideDescription:    false,
        placeholder:        ""
    };

    return TextField;


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

});