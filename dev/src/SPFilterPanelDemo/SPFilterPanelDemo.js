import Widget                       from "vendor/jsutils/Widget";
import dataStore                    from "vendor/jsutils/dataStore";
import objectExtend                 from "vendor/jsutils/objectExtend";
import fillTemplate                 from "vendor/jsutils/fillTemplate";
import parseHTML                    from "vendor/jsutils/parseHTML";
import FilterPanel                  from "../../../src/widgets/FilterPanel/FilterPanel";
import SPFilterPanelDemoTemplate    from "text!./SPFilterPanelDemo.html";

var PRIVATE = dataStore.create();

/**
 * Widget description
 *
 * @class SPFilterPanelDemo
 * @extends Widget
 */
var SPFilterPanelDemo = /** @lends SPFilterPanelDemo.prototype */{
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
    var inst        = PRIVATE.get(this);
    var filterPanel = FilterPanel.create({listName: "Tasks"});
    var cntr        = inst.uiFind("#spfilterpaneldemo_1");
    var out         = inst.uiFind("#spfilterpaneldemo_1_out");

    filterPanel.appendTo(cntr);
    filterPanel.getEle().style.width = "50%";
    filterPanel.getEle().style.marginLeft = "20%";

    filterPanel.on("*", function(evName){
        out.appendChild(
            parseHTML('<div>Event: ' + evName + '</div>')
        );

        if (evName === 'find') {
            out.appendChild(
                parseHTML(
                    '<div><pre>' + JSON.stringify(
                        filterPanel.getFilters().slice(),
                        null,
                        2
                    ) + "\r\n URL PARAMS: " +
                    filterPanel.getFilters().toURLParams() +
                    "\r\n URL PARAMS W/abreviated keys: " +
                    filterPanel.getFilters().toURLParams({
                        stringifyProperties: [
                            {column: "c"},
                            {values: 'v'},
                            {logicalOperator: 'lO'}
                        ]
                    }) +
                    '</pre></div>'
                )
            );
        }
    });

}

SPFilterPanelDemo = Widget.extend(SPFilterPanelDemo);
SPFilterPanelDemo.defaults = {};

export default SPFilterPanelDemo;
