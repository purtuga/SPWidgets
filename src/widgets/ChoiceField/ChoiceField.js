import Widget               from "common-micro-libs/src/jsutils/Widget"
import EventEmitter         from "common-micro-libs/src/jsutils/EventEmitter"
import dataStore            from "common-micro-libs/src/jsutils/dataStore"
import objectExtend         from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate         from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML            from "common-micro-libs/src/jsutils/parseHTML"
import Promise              from "common-micro-libs/src/jsutils/es6-promise"
import uuid                 from "common-micro-libs/src/jsutils/uuid"
import domAddClass          from "common-micro-libs/src/domutils/domAddClass"
import domRemoveClass       from "common-micro-libs/src/domutils/domRemoveClass"
import domHasClass          from "common-micro-libs/src/domutils/domHasClass"
import domAddEventListener  from "common-micro-libs/src/domutils/domAddEventListener"
import domFind              from "common-micro-libs/src/domutils/domFind"
import domClosest           from "common-micro-libs/src/domutils/domClosest"

import ChoiceFieldTemplate  from "./ChoiceField.html"
import choiceTemplate       from "./choice.html"
import "./ChoiceField.less"

//--------------------------------------------------------

var PRIVATE = dataStore.create();

var CSS_CLASS_BASE              = 'spwidgets-ChoiceField';
var CSS_CLASS_CHOICES           = CSS_CLASS_BASE + "-choices";
var CSS_CLASS_NO_LABEL          = CSS_CLASS_BASE + "--noLabel";
var CSS_CLASS_NO_DESCRIPTION    = CSS_CLASS_BASE + "--noDescription";
var CSS_CLASS_CHOICE_INPUT      = 'spwidgets-ChoiceField-choice-input';
var CSS_CLASS_CHOICE_LABEL      = 'spwidgets-ChoiceField-choice-label';
var CSS_MS_IS_CHECKED           = "is-checked";
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
            allowMultiples: null,
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

        if (typeof inst.opt.isMulti === "boolean") { // FIXME: remove this after refacor
            inst.isMulti = inst.opt.isMulti;

        } else if (typeof inst.opt.allowMultiples === "boolean") {
            inst.isMulti = inst.opt.allowMultiples;

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

        domAddEventListener($ui, "change", (ev) => {
            if (!inst.isMulti) {
                markAllChoiceFields.call(this)

            } else {
                markChoiceField.call(this, ev.target);
            }

            /**
             * Input field (checkbox or radio button) was changed.
             *
             * @event ChoiceField#change
             *
             * @type {String}
             */
            this.emit("change");
        });

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
        return domFind(inst.choices, "." + CSS_CLASS_CHOICE_INPUT)
            .filter(function(input){
                return input.checked;
            })
            .map(function(input){
                return input.value;
            });
    },

    /**
     * Sets the selected value(s), by looking at the list of choices
     * and setting their state to "selected" if they match the value
     * passed on input.
     *
     * @param {String|Array<String>} newValue
     *  The new value(s) that should be marked selected.
     *
     * @returns {Promise}
     */
    setSelected: function(newValue){
        var inst = PRIVATE.get(this);
        var setValueOnWidget = () => {
            var newVals = Array.isArray(newValue) ? newValue : [newValue],
                choiceEles = domFind(inst.choices, "." + CSS_CLASS_CHOICE_INPUT);

            // Loop through the choices inputs (radio or checkbox) and
            // if their value matches one the values that was provided on
            // input, then mark input "checked" - else - unchecked
            choiceEles.forEach((input) => {
                input.checked = newVals.indexOf(input.value) !== -1;
                markChoiceField.call(this, input);
            });
        };

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
     *
     * @return {Promise}
     */
    setChoices: function(choiceList){
        return PRIVATE.get(this).onReady.then(() => {
            let selected = this.getValue();
            addChoicesToUI.call(this, choiceList);
            this.setSelected(selected);
        });
    },

    /**
     * Checks all choices in the list.
     *
     * @return {Promise}
     */
    checkAll: function(){
        return PRIVATE.get(this).onReady.then(() => {
            domFind(this.getEle(), `.${CSS_CLASS_CHOICE_INPUT}`).forEach((inputEle) => {
                inputEle.checked = true;
                markChoiceField.call(this, inputEle);
            });
        });
    },

    /**
     * Unchecks all choices
     *
     * @return {Promise}
     */
    unCheckAll: function(){
        return PRIVATE.get(this).onReady.then(() => {
            domFind(this.getEle(), `.${CSS_CLASS_CHOICE_INPUT}`).forEach((inputEle) => {
                inputEle.checked = false;
                markChoiceField.call(this, inputEle);
            });
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
    let inst        = PRIVATE.get(this);
    let { isMulti, groupName } = inst;
    let inputType   = isMulti ? "checkbox" : "radio";
    let msType      = isMulti ? "CheckBox" : "RadioButton";
    var listUI;

    inst.choices.innerHTML = "";

    choiceList = inst.choiceList = choiceList.map(function(choice){
        var isString  = typeof choice === "string";

        return {
            name:   groupName,
            title:  isString ? choice : choice.title,
            value:  isString ? choice : choice.value,
            type:   inputType,
            id:     uuid.generate(),
            msType: msType
        };
    });

    listUI = parseHTML( fillTemplate(choiceTemplate, choiceList) );
    inst.choices.appendChild(listUI);

    return choiceList;
}

function markChoiceField($ele) {
    let $choice = domClosest($ele, `.${CSS_CLASS_BASE}-choice`);
    
    if (!$choice) {
        return;
    }
    
    let $choiceInput    = domFind($choice, `.${CSS_CLASS_CHOICE_INPUT}`)[0];
    let $choiceLabel    = domFind($choice, `.${CSS_CLASS_CHOICE_LABEL}`)[0];

    if ($choiceInput.checked) {
        domAddClass($choiceLabel, CSS_MS_IS_CHECKED);

    } else {
        domRemoveClass($choiceLabel, CSS_MS_IS_CHECKED);
    }
}

function markAllChoiceFields() {
    domFind(this.getEle(), `.${CSS_CLASS_CHOICE_INPUT}`).forEach((input) => markChoiceField.call(this, input));
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
    isMulti:            null, // FIXME: Deprecated!!!
    allowMultiples:     null,
    choiceList:         null
};

export default ChoiceField;
