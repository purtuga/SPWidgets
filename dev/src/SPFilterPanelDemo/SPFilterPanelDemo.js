define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "src/widgets/SPFilterPanel/SPFilterPanel",

    "text!./SPFilterPanelDemo.html"
], function (
    Widget,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    SPFilterPanel,

    SPFilterPanelDemoTemplate
) {

    var
        PRIVATE = dataStore.create(),

        /**
         * Widget description
         *
         * @class SPFilterPanelDemo
         * @extends Widget
         */
        SPFilterPanelDemo = /** @lends SPFilterPanelDemo.prototype */{
            init: function (options) {
                var inst = {
                    opt: objectExtend({}, SPFilterPanelDemo.defaults, options)
                };

                PRIVATE.set(this, inst);

                this.$ui = parseHTML(
                    fillTemplate(SPFilterPanelDemoTemplate, inst.opt)
                ).firstChild;

                inst.uiFind = this.$ui.querySelector.bind(this.$ui);

                setupDemo1.call(this);

                this.onDestroy(function () {
                    PRIVATE.delete(this);
                }.bind(this));
            }
        };

    function setupDemo1(){
        var inst = PRIVATE.get(this),
            filterPanel = SPFilterPanel.create({listName: "Tasks"}),
            cntr        = inst.uiFind("#spfilterpaneldemo_1");
            out         = inst.uiFind("#spfilterpaneldemo_1_out");

        filterPanel.appendTo(cntr);
        filterPanel.getEle().style.width = "50%";
        filterPanel.getEle().style.marginLeft = "20%";

        filterPanel.on("*", function(evName){
            out.appendChild(
                parseHTML('<div>Event: ' + evName + '</div>')
            )
        })

    }

    SPFilterPanelDemo = Widget.extend(SPFilterPanelDemo);
    SPFilterPanelDemo.defaults = {};

    return SPFilterPanelDemo;
});