define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "../../../src/widgets/LookupField/LookupField",
    "../../../src/spapi/getListColumns",

    "text!./LookupFieldDemo.html"
], function (
    Widget,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    LookupField,
    getListColumns,

    LookupFieldDemoTemplate
) {

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
        getListColumns("Tasks")
        .then(function(columns){
            this.demo1 = LookupField.create({column: columns.getColumn("Predecessors")});
            this.demo1.appendTo(this.getEle().querySelector("#lookupFieldDemo_1"));

        }.bind(this))["catch"](function(e){
            console.log(e); // jshint ignore:line
        });
    }

    LookupFieldDemo = Widget.extend(LookupFieldDemo);
    LookupFieldDemo.defaults = {};

    return LookupFieldDemo;
});