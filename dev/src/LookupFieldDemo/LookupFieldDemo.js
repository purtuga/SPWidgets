import Widget from "vendor/jsutils/Widget";
import dataStore from "vendor/jsutils/dataStore";
import objectExtend from "vendor/jsutils/objectExtend";
import fillTemplate from "vendor/jsutils/fillTemplate";
import parseHTML from "vendor/jsutils/parseHTML";
import LookupField from "../../../src/widgets/LookupField/LookupField";
import getListColumns from "../../../src/spapi/getListColumns";
import LookupFieldDemoTemplate from "text!./LookupFieldDemo.html";

    var
    PRIVATE = dataStore.create(),

    /**
     * Widget description
     *
     * @class LookupFieldDemo
     * @extends Widget
     *
     * @param {Object} options
     */
    LookupFieldDemo = /** @lends LookupFieldDemo.prototype */{
        init: function (options) {
            var inst = {
                opt: objectExtend({}, LookupFieldDemo.defaults, options)
            };

            PRIVATE.set(this, inst);

            this.$ui = parseHTML(
                fillTemplate(LookupFieldDemoTemplate, inst.opt)
            ).firstChild;

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

    function setupDemo1() {
        var inst = PRIVATE.get(this);

        getListColumns("Tasks")
        .then(function(columns){
            inst.demo1 = LookupField.create({column: columns.getColumn("Predecessors")});
            inst.demo1.appendTo(this.getEle().querySelector("#lookupFieldDemo_1"));

        }.bind(this))["catch"](function(e){
            console.log(e); // jshint ignore:line
        });
    }

    LookupFieldDemo = Widget.extend(LookupFieldDemo);
    LookupFieldDemo.defaults = {};

    export default LookupFieldDemo;
