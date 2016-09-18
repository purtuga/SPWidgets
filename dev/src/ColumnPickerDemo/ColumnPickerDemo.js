import Widget       from "common-micro-libs/src/jsutils/Widget"
import dataStore    from "common-micro-libs/src/jsutils/dataStore"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML    from "common-micro-libs/src/jsutils/parseHTML"

import ListPickerDemoTemplate from "./ColumnPickerDemo.html"

import ColumnPicker from "../../../src/widgets/ColumnPicker/ColumnPicker"

const PRIVATE = dataStore.create();

/**
 * ColumnPickerDemo Widget
 *
 * @class ColumnPickerDemo
 * @extends Widget
 *
 * @param {Object} options
 */
const ColumnPickerDemo = Widget.extend(/** @lends ColumnPickerDemo.prototype */{
    init: function (options) {
        var inst = {
            opt: objectExtend({}, ColumnPickerDemo.defaults, options)
        };

        PRIVATE.set(this, inst);

        this.$ui = parseHTML(
            fillTemplate(this.getTemplate(), inst.opt)
        ).firstChild;

        setupDemo1.call(this);

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

            PRIVATE.delete(this);
        }.bind(this));
    },

    /**
     * returns the widget's template
     * @return {String}
     */
    getTemplate: function () {
        return ListPickerDemoTemplate;
    }
});

function setupDemo1() {

    var inst = PRIVATE.get(this);

    inst.demo1 = ColumnPicker.create({
        listName: "Tasks"
    });
    inst.demo1.appendTo(this.getEle());

    var $out = parseHTML('<div style="white-space: pre-wrap;font-family:\'Courier New\';margin-top:2rem;"></div>').firstChild;
    this.getEle().appendChild($out);

    inst.demo1.on("item-selected", function(list){
        $out.textContent = JSON.stringify(list, null, 2);
    });
}


ColumnPickerDemo.defaults = {};

export default ColumnPickerDemo;
