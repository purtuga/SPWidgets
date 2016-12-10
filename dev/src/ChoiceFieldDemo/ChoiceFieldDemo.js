import Widget       from "common-micro-libs/src/jsutils/Widget"
import dataStore    from "common-micro-libs/src/jsutils/dataStore"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML    from "common-micro-libs/src/jsutils/parseHTML"

import ChoiceFieldDemoTemplate from "./ChoiceFieldDemo.html"
import "./ChoiceFieldDemo.less"


import ChoiceField      from "../../../src/widgets/ChoiceField/ChoiceField"
import getListColumns   from "../../../src/spapi/getListColumns"

const PRIVATE = dataStore.create();

/**
 * ChoiceFieldDemo Widget
 *
 * @class ChoiceFieldDemo
 * @extends Widget
 *
 * @param {Object} options
 */
const ChoiceFieldDemo = Widget.extend(/** @lends ChoiceFieldDemo.prototype */{
    init(options) {
        const inst = {
            opt: objectExtend({}, this.getFactory().defaults, options)
        };

        PRIVATE.set(this, inst);

        let $ui = this.$ui = this.getTemplate();

        if (typeof $ui === "string") {
            $ui = this.$ui = parseHTML(fillTemplate($ui, inst.opt)).firstChild;
        }

        setupDemo1.call(this);
        setupDemo2.call(this);
        setupDemo3.call(this);
        setupDemo4.call(this);

        this.onDestroy(function () {
            // Destroy all Compose object
            Object.keys(inst).forEach(function (prop) {
                if (inst[prop]) {
                    [
                        "destroy",  // widgets 
                        "remove",   // dom event listeners
                        "off"       // event emmiter listners
                    ].some((methodName) => {
                        if (inst[prop][methodName]) {
                            inst[prop][methodName]();
                            return true;
                        }
                    });

                    if (window[prop]) {
                        window[prop] = undefined;
                    }

                    inst[prop] = undefined;
                }
            });

            PRIVATE['delete'](this);
        }.bind(this));
    },

    /**
     * returns the widget's template
     *
     * @return {String|HTMLElement}
     */
    getTemplate(){
        return ChoiceFieldDemoTemplate;
    }
});

function setupDemo4() {
    let inst = PRIVATE.get(this);
    let choiceField4 = inst.choiceField4 = window.choiceField4 = ChoiceField.create({
        layout: "inline",
        choiceList: [
            {
                title: "Value 1",
                value: "v1"
            },
            {
                title: "Value 2",
                value: "v2"
            },
            {
                title: "Value 2",
                value: "v3"
            }
        ]
    });

    choiceField4.appendTo(this.getEle().querySelector(".demo-4"));
    console.info("window.choiceField4 created");
}


function setupDemo3() {
    let inst = PRIVATE.get(this);
    getListColumns({listName: "Tasks"}).then((columns) => {
        let choiceField3 = inst.choiceField3 = window.choiceField3 = ChoiceField.create({
            column: columns.getColumn("Status"),
            allowMultiples: true,
            selected: "Completed"
        });

        choiceField3.appendTo(this.getEle().querySelector(".demo-3"));
    });
    console.info("window.choiceField3 created");
}

function setupDemo2() {
    let inst = PRIVATE.get(this);
    let choiceField2 = inst.choiceField2 = window.choiceField2 = ChoiceField.create({
        allowMultiples: true,
        choiceList: [
            {
                title: "Value 1",
                value: "v1"
            },
            {
                title: "Value 2",
                value: "v2"
            },
            {
                title: "Value 2",
                value: "v3"
            },
            {
                title: "Value 3",
                value: "v4"
            },
            {
                title: "Value 4",
                value: "v5"
            },
            {
                title: "Value 1",
                value: "v1"
            },
            {
                title: "Value 1",
                value: "v1"
            }
        ]
    });

    choiceField2.appendTo(this.getEle().querySelector(".demo-2"));
    console.info("window.choiceField2 created");
}


function setupDemo1(){
    let inst = PRIVATE.get(this);
    getListColumns({listName: "Tasks"}).then((columns) => {
        let choiceField1 = inst.choiceField1 = window.choiceField1 = ChoiceField.create({
            column: columns.getColumn("Status")
        });

        choiceField1.appendTo(this.getEle().querySelector(".demo-1"));
    });
    console.info("window.choiceField1 created");
}


ChoiceFieldDemo.defaults = {};

export default ChoiceFieldDemo;
