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
 */
const ColumnPicker = Picker.extend(/** @lends ColumnPicker.prototype */{
    init: function (options) {
        var inst = {
            opt: objectExtend({}, ColumnPicker.defaults, options)
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

        loadListColumns.call(this);

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
    }
});

function loadListColumns() {
    getListColumns(PRIVATE.get(this).opt)
        .then(columns => {
            var filter = PRIVATE.get(this).opt.filter;

            if (filter) {
                columns = filter(columns);
            }

            this.setChoices(columns.map(column => {
                column.title = column.DisplayName;
                return column;
            }));
        })["catch"](e => {
            console.log(e);
        });
}

ColumnPicker.defaults = {
    listName:   "",
    webURL:     "",
    filter:     null,               // function. Given array of columns. Must return array.
    title:      "Select Column..."
};

export default ColumnPicker;
