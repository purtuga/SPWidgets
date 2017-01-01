import Widget                   from "common-micro-libs/src/jsutils/Widget"
import dataStore                from "common-micro-libs/src/jsutils/dataStore"
import objectExtend             from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate             from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML                from "common-micro-libs/src/jsutils/parseHTML"
import LookupField              from "../../../src/widgets/LookupField/LookupField"
import getListColumns           from "../../../src/spapi/getListColumns"
import LookupFieldDemoTemplate  from "./LookupFieldDemo.html"

import common from "../setup/common";

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
        setupDemo2.call(this);

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

    getListColumns({
        listName:   "Tasks",
        webURL:     common.getWebURL()
    })
    .then(function(columns){
        inst.demo1 = LookupField.create({
            column: columns.getColumn("Predecessors")
        });
        inst.demo1.appendTo(this.getEle().querySelector("#lookupFieldDemo_1"));

    }.bind(this))["catch"](function(e){
        console.log(e); // jshint ignore:line
    });
}


function setupDemo2() {
    var inst = PRIVATE.get(this);

    getListColumns({
        listName:   "Tasks",
        webURL:     common.getWebURL()
    })
        .then(function(columns){
            let col = columns.getColumn("Predecessors");
            col.Type = "Lookup";

            inst.demo1 = LookupField.create({
                column: columns.getColumn("Predecessors")
            });
            inst.demo1.appendTo(this.getEle().querySelector("#lookupFieldDemo_2"));

        }.bind(this))["catch"](function(e){
        console.log(e); // jshint ignore:line
    });
}

LookupFieldDemo = Widget.extend(LookupFieldDemo);
LookupFieldDemo.defaults = {};

    export default LookupFieldDemo;
