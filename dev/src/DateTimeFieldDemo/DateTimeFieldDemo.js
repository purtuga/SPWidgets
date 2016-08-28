import Widget from "vendor/jsutils/Widget";
import dataStore from "vendor/jsutils/dataStore";
import objectExtend from "vendor/jsutils/objectExtend";
import fillTemplate from "vendor/jsutils/fillTemplate";
import parseHTML from "vendor/jsutils/parseHTML";
import DateTimeField from "../../../src/widgets/DateTimeField/DateTimeField";
import DateTimeFieldDemoTemplate from "./DateTimeFieldDemo.html";

    var
    PRIVATE = dataStore.create(),

    /**
     * Widget description
     *
     * @class DateTimeFieldDemo
     * @extends Widget
     *
     * @param {Object} options
     */
    DateTimeFieldDemo = /** @lends DateTimeFieldDemo.prototype */{
        init: function (options) {
            var inst = {
                opt: objectExtend({}, DateTimeFieldDemo.defaults, options)
            };

            PRIVATE.set(this, inst);

            this.$ui = parseHTML(
                fillTemplate(DateTimeFieldDemoTemplate, inst.opt)
            ).firstChild;

            inst.uiFind = this.$ui.querySelector.bind(this.$ui);

            setupDemo1.call(this);

            this.onDestroy(function () {
                Object.keys(inst).forEach(function(prop){
                    if (inst[prop] && inst[prop].destroy) {
                        inst[prop].destroy();
                    }
                });
                PRIVATE.delete(this);
            }.bind(this));
        }
    };

    function setupDemo1(){
        var inst = PRIVATE.get(this);
        var $demo1Cntr = inst.uiFind("#DateTimeField_demo1");

        inst.demo1 = DateTimeField.create({
            column: {
                DisplayName: "Due Date",
                Description: "the date the item is due"
            }
        });
        inst.demo1.appendTo($demo1Cntr);
    }

    DateTimeFieldDemo = Widget.extend(DateTimeFieldDemo);
    DateTimeFieldDemo.defaults = {};

    export default DateTimeFieldDemo;
