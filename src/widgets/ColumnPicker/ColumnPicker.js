import Picker       from "common-micro-libs/src/widgets/Picker/Picker"
import dataStore    from "common-micro-libs/src/jsutils/dataStore"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import domAddClass  from "common-micro-libs/src/domutils/domAddClass"

import getListColumns   from "../../spapi/getListColumns"

//--------------------------------------------------

const PRIVATE           = dataStore.create();
const PickerPrototype   = Picker.prototype;

/**
 * ColumnPicker Widget
 *
 * @class ColumnPicker
 * @extends Picker
 *
 * @param {Object} options
 *
 * @fires ColumnPicker#item-selected
 * @fires ColumnPicker#selection-cleared
 */
const ColumnPicker = Picker.extend(/** @lends ColumnPicker.prototype */{
    init: function (options) {
        var inst = {
            opt: objectExtend({}, this.getFactory().defaults, options),
            ready: null,
            choices: []
        };

        PRIVATE.set(this, inst);
        PickerPrototype.init.call(this, inst.opt);

        var CSS_MS_FONT_M   = "ms-font-m";
        var CSS_MS_ICON     = "ms-Icon ms-Icon";
        var CSS_PICKER      = "Picker";
        var $ui             = this.getEle();
        var uiFind          = $ui.querySelector.bind($ui);
        var $ele;

        domAddClass(this.getEle(), CSS_MS_FONT_M);
        domAddClass(this.getPopupWidget().getEle(), CSS_MS_FONT_M);

        $ele = uiFind(`.${CSS_PICKER}-clear`);
        $ele.textContent = "";
        domAddClass($ele, `${CSS_MS_ICON}--x`);

        $ele = uiFind(`.${CSS_PICKER}-showMenu`);
        $ele.textContent = "";
        domAddClass($ele, `${CSS_MS_ICON}--chevronThickDown`);

        inst.ready = loadListColumns.call(this).then(() => {
            return this;
        });

        if (inst.opt.selected) {
            this.setSelected(inst.opt.selected);
        }

        this.onDestroy(function() {


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

            PRIVATE.delete(this);
        }.bind(this));
    },

    /**
     * Returns a promise that resolves once the Widget is ready
     * for interaction (after getting Lists from SP)
     *
     * @return {Promise}
     */
    onReady: function(){
        return PRIVATE.get(this).ready;
    },

    /**
     * returns the object with info on a given columns,
     * so long as that column is part of the choices of
     * this widget instance.
     *
     * @param {String} columnName
     *  Either StaticName or DisplayName.
     *
     * @return {Object|undefined}
     */
    getColumnInfo: function(columnName){
        var col;
        PRIVATE.get(this).choices.some((colObj) => {
            if (colObj.StaticName === columnName || colObj.DisplayName === columnName) {
                col = colObj;
                return true;
            }
        });
        return col;
    },

    /**
     * Selects a list currently in the list of choices
     *
     * @param {String|Object} column
     * @returns {Promise}
     */
    setSelected: function (column){
        return this.onReady().then(() => {
            var colInfo = typeof column === "object" ? column : this.getColumnInfo(column) || {};
            return PickerPrototype.setSelected.call(this, colInfo.DisplayName);
        });
    }
});

/**
 * Loads the list of columns
 *
 * @private
 * @returns {Promise}
 */
function loadListColumns() {
    return getListColumns(PRIVATE.get(this).opt)
        .then(columns => {
            var filter = PRIVATE.get(this).opt.filter;

            if (filter) {
                columns = filter(columns);
            }

            PRIVATE.get(this).choices = columns = columns.map(column => {
                column.title = column.DisplayName;
                return column;
            });

            this.setChoices(columns);
        })["catch"](e => {
            console.log(e);
        });
}

ColumnPicker.defaults = {
    listName:   "",
    webURL:     "",
    selected:   "",
    filter:     null,               // function. Given array of columns. Must return array.
    title:      "Select Column..."
};

export default ColumnPicker;
