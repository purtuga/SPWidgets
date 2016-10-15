import Widget               from "common-micro-libs/src/jsutils/Widget"
import EventEmitter         from "common-micro-libs/src/jsutils/EventEmitter"
import dataStore            from "common-micro-libs/src/jsutils/dataStore"
import objectExtend         from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate         from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML            from "common-micro-libs/src/jsutils/parseHTML"
import Promise              from "common-micro-libs/src/jsutils/es6-promise"
import uuid                 from "common-micro-libs/src/jsutils/uuid"
import domAddClass          from "common-micro-libs/src/domutils/domAddClass"
import domAddEventListener  from "common-micro-libs/src/domutils/domAddEventListener"
import domFind              from "common-micro-libs/src/domutils/domFind"
import ChoiceFieldTemplate  from "./ChoiceField.html"
import choiceTemplate       from "./choice.html"
import "./ChoiceField.less"

//--------------------------------------------------------

var PRIVATE = dataStore.create();

var CSS_CLASS_BASE              = 'spwidgets-ChoiceField';
var CSS_CLASS_CHOICES           = CSS_CLASS_BASE + "-choices";
var CSS_CLASS_NO_LABEL          = CSS_CLASS_BASE + "--noLabel";
var CSS_CLASS_NO_DESCRIPTION    = CSS_CLASS_BASE + "--noDescription";

var CSS_CLASS_MS_INPUT          = 'ms-ChoiceField-input';

var ATTR_CHECKED                = "checked";

/**
 * A choice field giving the user the ability to pick from a list
 * of values. Handles Choice, MultiChoice.
 *
 * @class ChoiceField
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} options
 *
 * @param {ListColumnModel} [options.column={}]
 *  Although optional, it is strongly suggested this be passed in on input, since
 *  some of display values are obtained from the list column definition - example
 *  the label (DisplayName) and field description if any.
 *
 * @param {String} [options.selected=""]
 *  The item in the list of choices that should be selected. Either the `value` or
 *  `title` can be used.
 *
 * @param {String} [options.maxHeight="10em"]
 *  A CSS dimension indicating the max height for the area that displays the
 *  choices.
 *
 * @param {Boolean} [options.hideLabel=false]
 *
 * @param {Boolean} [options.hideDescription=false]
 *
 * @param {String} [options.layout=""]
 *  The layout to be used. Possible values:
 *
 *  -   `inline`: Choices are displayed inline.
 *
 * @param {Boolean} [options.isMulti=null]
 *  By default, this will widget will use the Column definition to determine if
 *  multiple values can be selected. This options, however, will override that
 *  setting. Set it to true of false
 *
 * @param {Array<String|Object>} [options.choiceList]
 *  The list of choices to be available on the widget. Will override the use of
 *  the `column` definition `getColumnValues()`. The value can either be a `String`
 *  in which case i twill be used as the title and the value, or an object
 *  containing both a `title` and `value` attributes.
 *
 * @fires ChoiceField#change
 */
var ChoiceField = /** @lends ChoiceField.prototype */{
    init: function (options) {
        var inst = {
            opt:        objectExtend({}, ChoiceField.defaults, options),
            groupName:  uuid.generate(),
            isMulti:    null,
            onReady:    null,
            isReady:    false,
            choices:    null,
            choiceList: []
        };

        PRIVATE.set(this, inst);

        if (!inst.opt.column){
            inst.opt.column = {};
        }
        var opt = inst.opt;
        var $ui = this.$ui = parseHTML(
            fillTemplate(ChoiceFieldTemplate, opt)
        ).firstChild;
        var uiFind  = inst.uiFind = $ui.querySelector.bind($ui);

        if (typeof inst.opt.isMulti === "boolean") {
            inst.isMulti = inst.opt.isMulti;

        } else {
            inst.isMulti = inst.opt.column.Type === "MultiChoice";
        }

        inst.title      = uiFind(".ms-ChoiceFieldGroup-title");
        inst.choices    = uiFind("." + CSS_CLASS_CHOICES);
        inst.onReady    = Promise.resolve()
            .then(() => {
                if (opt.choiceList) {
                    return opt.choiceList
                }
                return getChoices.call(this)
            })
            .then(addChoicesToUI.bind(this))
            .then(() => {
                if (opt.selected) {
                    this.setSelected(opt.selected);
                }
                inst.isReady = true;
                if (opt.checkAll) {
                    this.checkAll();
                }
            })["catch"](function(e){
                console.log(e); //jshint ignore:line
            });

        if (opt.hideLabel) {
            domAddClass($ui, CSS_CLASS_NO_LABEL);
        }

        if (opt.hideDescription) {
            domAddClass($ui, CSS_CLASS_NO_DESCRIPTION);
        }

        if (opt.layout) {
            domAddClass($ui, CSS_CLASS_BASE + '--' + opt.layout);
        }

        if (opt.maxHeight) {
            inst.choices.style.maxHeight = opt.maxHeight;
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
     * @returns {Array<String>}
     *  An array is always returned. for single selection choice fields,
     *  this array will contain only 1 item.
     */
    getValue: function(){
        var inst = PRIVATE.get(this);
        return domFind(inst.choices, "." + CSS_CLASS_MS_INPUT)
            .filter(function(input){
                return input.checked;
            })
            .map(function(input){
                return input.value;
            });
    },

    /**
     * Sets the selected value(s)
     *
     * @param {String|Array<String>} newValue
     *  The new value that should be selected.
     *
     * @returns {Promise}
     */
    setSelected: function(newValue){
        var inst = PRIVATE.get(this);
        var setValueOnWidget = function(){
            var newVals     = Array.isArray(newValue) ? newValue : [newValue],
                choiceEles  = domFind(inst.choices, "." + CSS_CLASS_MS_INPUT);

            choiceEles.forEach(function(input){
                var isNewVal = false;

                newVals.some(function(newVal){
                    if (input.value === newVal) {
                        isNewVal = true;
                        return true;
                    }
                });

                input.checked = isNewVal;
            });
        }.bind(this);

        return inst.onReady.then(setValueOnWidget);
    },

    // backwards compatible...
    // deprecated. Use setSelected()
    setValue: function(...args){
        return this.setSelected(...args);
    },

    /**
     * Returns array of the choices available in the widget.
     *
     * @return {Array}
     */
    getChoices: function(){
        return PRIVATE.get(this).choiceList;
    },

    /**
     * Sets the list of choices available on the widget
     *
     * @param {Array<String>} choiceList
     */
    setChoices: function(choiceList){
        let selected = this.getValue();
        addChoicesToUI.call(this, choiceList);
        this.setSelected(selected);
    },

    /**
     * Checks all choices in the list.
     */
    checkAll: function(){
        domFind(this.getEle(), `.${CSS_CLASS_MS_INPUT}`).forEach(function(inputEle){
            inputEle.setAttribute(ATTR_CHECKED, ATTR_CHECKED);
        });
    },

    /**
     * Unchecks all choices
     */
    unCheckAll: function(){
        domFind(this.getEle(), `.${CSS_CLASS_MS_INPUT}`).forEach(function(inputEle){
            inputEle.removeAttribute(ATTR_CHECKED, ATTR_CHECKED);
        });
    }
};

function getChoices() {
    var inst    = PRIVATE.get(this),
        column  = inst.opt.column,
        type    = column.Type;

    if (type === "Choice" || type === "MultiChoice") {
        return column.getColumnValues();
    }

    return Promise.resolve([]);
}

function addChoicesToUI(choiceList) {
    var inst        = PRIVATE.get(this),
        groupName   = inst.groupName,
        inputType   = inst.isMulti ? "checkbox" : "radio",
        listUI;

    inst.choices.innerHTML = "";

    choiceList = inst.choiceList = choiceList.map(function(choice){
        var isString  = typeof choice === "string";

        return {
            name:   groupName,
            title:  isString ? choice : choice.title,
            value:  isString ? choice : choice.value,
            type:   inputType,
            id:     uuid.generate()
        };
    });

    listUI = parseHTML( fillTemplate(choiceTemplate, choiceList) );
    inst.choices.appendChild(listUI);

    return choiceList;
}

ChoiceField = EventEmitter.extend(Widget, ChoiceField);
ChoiceField.defaults = {
    column:             {},
    selected:           "",
    checkAll:           false,
    maxHeight:          "10em",
    hideLabel:          false,
    hideDescription:    false,
    layout:             "",
    isMulti:            null,
    choiceList:         null
};

export default ChoiceField;
