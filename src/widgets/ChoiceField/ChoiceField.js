define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",
    "vendor/jsutils/es6-promise",
    "vendor/jsutils/uuid",

    "vendor/domutils/domAddClass",
    "vendor/domutils/domAddEventListener",

    "text!./ChoiceField.html",
    "text!./choice.html",
    //---------------------------------
    "less!./ChoiceField.less"
], function (
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,
    Promise,
    uuid,

    domAddClass,
    domAddEventListener,

    ChoiceFieldTemplate,
    choiceTemplate
) {

    var
    PRIVATE = dataStore.create(),

    CSS_CLASS_BASE              = 'spwidgets-ChoiceField',
    CSS_CLASS_CHOICES           = CSS_CLASS_BASE + "-choices",
    CSS_CLASS_NO_LABEL          = CSS_CLASS_BASE + "--noLabel",
    CSS_CLASS_NO_DESCRIPTION    = CSS_CLASS_BASE + "--noDescription",

    /**
     * A choice field giving the user the ability to pick from a list
     * of values. Handles Choice, MultiChoice.
     *
     * @class ChoiceField
     * @extends Widget
     *
     * @param {Object} options
     * @param {ListColumnModel} [options.column={}]
     *  Although options, it is strongly suggested this be passed in on input, since
     *  some of display values are obtained from the list column definition - example
     *  the label (DisplayName) and field description if any.
     * @param {String} [options.selected=""]
     *  The item in the list of choices that should be selected. Either the `value` or
     *  `title` can be used.
     * @param {Boolean} [options.hideLabel=false]
     * @param {String} [options.description=""]
     * @param {String} [options.layout=""]
     *  The layout to be used. Possible values:
     *
     *  -   `inline`: Choices are displayed inline.
     */
    ChoiceField = /** @lends ChoiceField.prototype */{
        init: function (options) {
            var inst = {
                opt:        objectExtend({}, ChoiceField.defaults, options),
                groupName:  uuid.generate()
            };

            PRIVATE.set(this, inst);

            if (!inst.opt.column){
                inst.opt.column = {};
            }

            var
            $ui     = this.$ui = parseHTML(
                        fillTemplate(ChoiceFieldTemplate, inst.opt)
                    ).firstChild,
            uiFind = inst.uiFind  = $ui.querySelector.bind($ui);

            inst.title      = uiFind(".ms-ChoiceFieldGroup-title");
            inst.choices    = uiFind("." + CSS_CLASS_CHOICES);
            getChoices.call(this).then(addChoicesToUI.bind(this));

            if (inst.opt.hideLabel) {
                domAddClass($ui, CSS_CLASS_NO_LABEL);
            }

            if (inst.opt.hideDescription) {
                domAddClass($ui, CSS_CLASS_NO_DESCRIPTION);
            }

            if (inst.opt.layout) {
                domAddClass($ui, CSS_CLASS_BASE + '--' + inst.opt.layout);
            }

            domAddEventListener($ui, "change", function(){
                /**
                 * Text field input was changed.
                 *
                 * @event ChoiceField#change
                 *
                 * @type {String}
                 */
                this.emit("change");
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
            return "";
        },

        /**
         * Sets the selected value(s)
         *
         * @param {String} newValue
         *  The new value that should be selected.
         */
        setSelected: function(/* newValue */){

        }
    };

    function getChoices() {
        var inst    = PRIVATE.get(this),
            column  = inst.opt.column,
            type    = column.Type;

        inst.choices.innerHTML = "";

        if (type === "Choice" || type === "MultiChoice") {
            return column.getColumnValues();

        }

        return Promise.resolve([]);
    }

    function addChoicesToUI(choiceList) {
        var inst        = PRIVATE.get(this),
            defVal      = inst.opt.selected,
            groupname   = inst.groupName,
            defId       = "",
            listUI;

        choiceList = choiceList.map(function(choice){
            var id = uuid.generate();

            if (choice === defVal) {
                defId = id;
            }

            return {
                name:   groupname,
                title:  choice,
                value:  choice,
                id:     id
            };
        });

        listUI = parseHTML( fillTemplate(choiceTemplate, choiceList) );

        if (defId) {
            defId = listUI.querySelector("#" + defId);
            if (defId) {
                defId.setAttribute('checked', 'checked');
            }
        }

        inst.choices.appendChild(listUI);

        return choiceList;
    }

    ChoiceField = EventEmitter.extend(Widget, ChoiceField);
    ChoiceField.defaults = {
        column:     {},
        selected:   ""
    };

    return ChoiceField;
});