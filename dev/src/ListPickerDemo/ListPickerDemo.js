import Widget       from "common-micro-libs/src/jsutils/Widget"
import dataStore    from "common-micro-libs/src/jsutils/dataStore"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML    from "common-micro-libs/src/jsutils/parseHTML"

import ListPickerDemoTemplate from "./ListPickerDemo.html"

import ListPicker from "../../../src/widgets/ListPicker/ListPicker"

const PRIVATE = dataStore.create();

/**
 * ListPickerDemo Widget
 *
 * @class ListPickerDemo
 * @extends Widget
 *
 * @param {Object} options
 */
const ListPickerDemo = Widget.extend(/** @lends ListPickerDemo.prototype */{
    init: function (options) {
        var inst = {
            opt: objectExtend({}, ListPickerDemo.defaults, options)
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

    inst.demo1 = ListPicker.create();
    inst.demo1.appendTo(this.getEle());

    var $out = parseHTML('<div style="white-space: pre-wrap;font-family:\'Courier New\';margin-top:2rem;"></div>').firstChild;
    this.getEle().appendChild($out);

    inst.demo1.on("item-selected", function(list){
        $out.textContent = JSON.stringify(list, null, 2);
    });
}


ListPickerDemo.defaults = {};

export default ListPickerDemo;
