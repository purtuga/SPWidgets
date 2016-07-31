define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "../../../src/widgets/DateTimeField/DateTimeField",

    "text!./DateTimeFieldDemo.html"
], function (
    Widget,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    DateTimeField,

    DateTimeFieldDemoTemplate
) {

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

    return DateTimeFieldDemo;
});