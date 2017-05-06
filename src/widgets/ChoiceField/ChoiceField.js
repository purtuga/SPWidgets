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
import domFind              from "common-micro-libs/src/domutils/domFind"
import domClosest           from "common-micro-libs/src/domutils/domClosest"

import getListColumns       from "../../spapi/getListColumns"

import ChoiceItem           from "./ChoiceItem/ChoiceItem"
import ChoiceFieldTemplate  from "./ChoiceField.html"
import "./ChoiceField.less"

//--------------------------------------------------------

var PRIVATE = dataStore.create();

var CSS_CLASS_BASE              = 'spwidgets-ChoiceField';
var CSS_CLASS_CHOICES           = CSS_CLASS_BASE + "-choices";
var CSS_CLASS_NO_LABEL          = CSS_CLASS_BASE + "--noLabel";
var CSS_CLASS_NO_DESCRIPTION    = CSS_CLASS_BASE + "--noDescription";

/**
 * A choice field giving the user the ability to pick from a list
 * of values. Handles Choice, MultiChoice.
 *
 * @class ChoiceField
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} [options]
 *
 * @param {ListColumnModel} [options.column={}]
 *  Although optional, it is strongly suggested this be passed in on input, since
 *  some of display values are obtained from the list column definition - example
 *  the label (DisplayName) and field description if any.
 *
 * @param {String} [options.listName]
 *  The list name or UUID.
 *
 * @param {String} [options.webURL]
 *
 * @param {String} [options.selected=""]
 *  The item in the list of choices that should be selected. Either the `value` or
 *  `title` can be used.
 *
 * @param {String} [options.maxHeight="15em"]
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
 * @param {Widget} [options.ChoiceItemWidget]
 *  The Widget to be used for each Choice displayed.
 *
 * @fires ChoiceField#change
 * @fires ChoiceField#item-change
 */
var ChoiceField = /** @lends ChoiceField.prototype */{
    init: function (options) {
        var inst = {
            opt:        objectExtend({}, this.getFactory().defaults, options),
            groupName:  uuid.generate(),
            isMulti:    null,
            allowMultiples: null,
            onReady:    null,
            isReady:    false,
            choices:    null,   // FIXME: delete this?
            choiceList: [],
            selectedCount:  0
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
        inst.$count     = uiFind(`.${CSS_CLASS_BASE}-selectedCount`);
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

        if (!opt.hideSelectedCount) {
            domRemoveClass($ui, `${CSS_CLASS_BASE}--noSelectedCount`);
        }

        updateSelectedCount.call(this);

        this.on("item-change", (itemWdg) => {
            if (!inst.isMulti) {
                markAllChoiceFields.call(this)
            }

            if (itemWdg.isChecked()) {
                inst.selectedCount++;
            } else {
                --inst.selectedCount;
            }
            updateSelectedCount.call(this);

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
        return PRIVATE.get(this).choiceList
            .filter(wdg => wdg.isChecked())
            .map(wdg => wdg.getValue());
    },

    /**
     * Unlike `getValue()`  which returns only the input value (a string), this
     * method will return the object used on input to create the item widget.
     *
     * @returns {Array<String|Object>}
     */
    getSelected: function(){
        return PRIVATE.get(this).choiceList
            .filter(wdg => wdg.isChecked())
            .map(wdg => wdg.getData());
    },

    /**
     * Sets the selected value(s), by looking at the list of choices
     * and setting their state to "selected" if they match the value
     * passed on input.
     *
     * @param {String|Array<String>|Array<Object>} newValue
     *  The new value(s) that should be marked selected. When using `Array<Object>`
     *  format, ensure that each object has a property named `value`.
     *
     * @returns {Promise}
     */
    setSelected: function(newValue){
        let inst    = PRIVATE.get(this);
        let newVals = Array.isArray(newValue) ? newValue : [newValue];

        // Ensure that array of new values to be selected are single value strings which
        // are then compared against the input value of the choice field widget.
        newVals = newVals.map(function(newVal){
            if (typeof newVal === "string") {
                return newVal;
            }

            if (newVal && newVal.hasOwnProperty("value")) {
                return newVal.value;
            }

            return newVal;
        });

        return inst.onReady.then(() => {
            inst.choiceList.forEach((choiceWdg) => {
                if (newVals.indexOf(choiceWdg.getInputValue()) !== -1) {
                    choiceWdg.check();

                } else {
                    choiceWdg.unCheck();
                }
            });

            markAllChoiceFields.call(this);
            inst.selectedCount = this.getSelected().length;
            updateSelectedCount.call(this);
        });
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
        return PRIVATE.get(this).choiceList.map(wdg => wdg.getValue());
    },

    /**
     * Sets the list of choices available on the widget
     *
     * @param {Array<String|Object>} choiceList
     *
     * @return {Promise}
     */
    setChoices: function(choiceList){
        return PRIVATE.get(this).onReady.then(() => {
            if (Array.isArray(choiceList)) {
                let inst        = PRIVATE.get(this);
                let selected    = this.getValue();

                addChoicesToUI.call(this, choiceList);
                this.setSelected(selected);

                inst.selectedCount = this.getSelected().length;
                updateSelectedCount.call(this);
            }
        });
    },

    /**
     * Checks all choices in the list.
     *
     * @return {Promise}
     */
    checkAll: function(){
        let inst = PRIVATE.get(this);

        return inst.onReady.then(() => {
            inst.choiceList.forEach((choiceItemWdg) => choiceItemWdg.check());

            if (!inst.isMulti) {
                markAllChoiceFields.call(this);
            }

            inst.selectedCount = this.getSelected().length;
            updateSelectedCount.call(this);
        });
    },

    /**
     * Unchecks all choices
     *
     * @return {Promise}
     */
    unCheckAll: function(){
        let inst = PRIVATE.get(this);

        return inst.onReady.then(() => {
            inst.choiceList.forEach((choiceItemWdg) => choiceItemWdg.unCheck());
        });
    }
};

function updateSelectedCount(){
    let { selectedCount, $count, opt } = PRIVATE.get(this);

    $count.textContent = fillTemplate(opt.labels.selectedLabel, { count: String(selectedCount) });
}

function getChoices() {
    let inst                = PRIVATE.get(this);
    let {listName, webURL}  = inst.opt;
    let column  = inst.opt.column;
    let type    = column.Type;

    if (type === "Choice" || type === "MultiChoice") {
        // If the column object does not have a "getColumnValues()" method,
        // then retrieve the column from the list definition and then use it.
        if (!column.getColumnValues && listName) {

            return getListColumns({
                listName:   listName,
                webURL:     webURL
            }).then((cols) => {
                let thisColumn = cols.getColumn(column.Name || column.DisplayName);

                if (thisColumn) {
                    return thisColumn.getColumnValues();
                }

                return [];
            });

        } else if (column.getColumnValues) {
            return column.getColumnValues();
        }

    }

    return Promise.resolve([]);
}

function addChoicesToUI(choiceList) {
    let inst                    = PRIVATE.get(this);
    let ChoiceItemWidget        = inst.opt.ChoiceItemWidget;
    let { isMulti, groupName }  = inst;
    let $newChoices             = document.createDocumentFragment();


    if (inst.choiceList.length) {
        inst.choiceList.forEach((wdg) => wdg.destroy());
        inst.choiceList.splice(0);
    }

    inst.choiceList = choiceList.map((choice) => {
        let isString    = typeof choice === "string";
        let choiceWdg   = ChoiceItemWidget.create({
            type:   isMulti ? "checkbox" : "radio",
            name:   groupName,
            title:  isString ? choice : choice.title,
            value:  isString ? choice : choice.value,
            data:   choice
        });

        /**
         * Change by specific Choice Item.
         *
         * @event ChoiceField#item-change
         */
        choiceWdg.pipe(this, "item-");
        choiceWdg.appendTo($newChoices);
        return choiceWdg
    });

    inst.choices.appendChild($newChoices);
    return inst.choiceList;
}

function markAllChoiceFields() {
    PRIVATE.get(this).choiceList.forEach(wdg => wdg.evalState());
}

ChoiceField = EventEmitter.extend(Widget, ChoiceField);
ChoiceField.defaults = {
    listName:           "",
    webURL:             "",
    column:             {},
    selected:           "",
    checkAll:           false,
    maxHeight:          "15em",
    hideLabel:          false,
    hideDescription:    false,
    hideSelectedCount:  true,
    layout:             "",
    isMulti:            null, // FIXME: Deprecated!!!
    allowMultiples:     null,
    choiceList:         null,
    labels:             {
        selectedLabel: "{{count}} Selected"
    },
    ChoiceItemWidget:   ChoiceItem
};

export default ChoiceField;
