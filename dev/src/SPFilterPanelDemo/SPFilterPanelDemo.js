import Widget                       from "common-micro-libs/src/jsutils/Widget";
import dataStore                    from "common-micro-libs/src/jsutils/dataStore";
import objectExtend                 from "common-micro-libs/src/jsutils/objectExtend";
import fillTemplate                 from "common-micro-libs/src/jsutils/fillTemplate";
import parseHTML                    from "common-micro-libs/src/jsutils/parseHTML";
import xmlEscape                    from "common-micro-libs/src/jsutils/xmlEscape"
import FilterPanel                  from "../../../src/widgets/FilterPanel/FilterPanel";
import SPFilterPanelDemoTemplate    from "./SPFilterPanelDemo.html";

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
    var filterPanel = FilterPanel.create({listName: "Tasks", bodyHeight: `${window.innerHeight - 200}px`});
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
                    "\r\n toCAMLQuery: " +
                    xmlEscape.escape(filterPanel.getFilters().toCAMLQuery()) +
                    '</pre></div>'
                )
            );
        }
    });

    window.filterPanel1 = filterPanel;
    console.info("window.filterPanel1 created");

    this.onDestroy(function() {
        filterPanel.destroy();
        window.filterPanel1 = null;
    });
}

SPFilterPanelDemo = Widget.extend(SPFilterPanelDemo);
SPFilterPanelDemo.defaults = {};

export default SPFilterPanelDemo;
