import Widget                   from "common-micro-libs/src/jsutils/Widget";
import EventEmitter             from "common-micro-libs/src/jsutils/EventEmitter";
import dataStore                from "common-micro-libs/src/jsutils/dataStore";
import objectExtend             from "common-micro-libs/src/jsutils/objectExtend";
import fillTemplate             from "common-micro-libs/src/jsutils/fillTemplate";
import parseHTML                from "common-micro-libs/src/jsutils/parseHTML";
import domAddEventListener      from "common-micro-libs/src/domutils/domAddEventListener";
import domFind                  from "common-micro-libs/src/domutils/domFind";
import domClosest               from "common-micro-libs/src/domutils/domClosest";
import domAddClass              from "common-micro-libs/src/domutils/domAddClass";
import domRemoveClass           from "common-micro-libs/src/domutils/domRemoveClass";
import domHasClass              from "common-micro-libs/src/domutils/domHasClass";

import getListColumns           from "../../../spapi/getListColumns";
import ColumnSelectorTemplate   from "./ColumnSelector.html";
import columnTemplate           from "./column.html";
import "./ColumnSelector.less";

//======================================================================================

const PRIVATE                   = dataStore.create();
const CSS_CLASS_BASE            = "spwidgets-FilterPanel-ColumnSelector";
const CSS_CLASS_COL_SELECTED    = CSS_CLASS_BASE + "-col--selected";

/**
 * Widget description
 *
 * @class ColumnSelector
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} options
 * @param {String} options.listName
 * @param {String} [options.webURL]
 * @param {String} [options.columns]
 * @param {String} [options.selectFieldsLayout]
 *
 * @fires ColumnSelector#cancel
 * @fires ColumnSelector#ok
 * @fires ColumnSelector#select
 * @fires ColumnSelector#unselect
 */
const ColumnSelector = EventEmitter.extend(Widget).extend(/** @lends ColumnSelector.prototype */{
    init: function (options) {
        var inst = {
            opt:        objectExtend({}, this.getFactory().defaults, options),
            listCols:   null
        };

        PRIVATE.set(this, inst);

        var $ui = this.$ui = parseHTML(
                fillTemplate(ColumnSelectorTemplate, inst.opt)
            ).firstChild,
            uiFind          = inst.uiFind = $ui.querySelector.bind($ui),
            BASE_SELECTOR   = "." + CSS_CLASS_BASE,
            emit            = this.emit.bind(this);

        this.hide();

        inst.bodyContent = uiFind(BASE_SELECTOR + "-body-content");

        if (inst.opt.selectFieldsLayout !== "3-col") {
            domAddClass($ui, CSS_CLASS_BASE + "--" + inst.opt.selectFieldsLayout);
        }

        domAddEventListener(uiFind(BASE_SELECTOR + "-action-cancel"), "click", function () {
            /**
             * Cancel button was clicked
             * @event ColumnSelector#cancel
             */
            emit("cancel");
        });

        domAddEventListener(uiFind(BASE_SELECTOR + "-action-ok"), "click", function () {
            /**
             * The OK button was clicked
             * @event ColumnSelector#ok
             */
            emit("ok");
        });

        domAddEventListener($ui, "click", function(ev){
            var colEle = domClosest(ev.target, BASE_SELECTOR + "-col");
            if (colEle) {
                toggleColumnSelection.call(this, colEle);
            }
        }.bind(this));

        loadColumns.call(this)
            .then(showColumns.bind(this))
            ["catch"](function(e){
                console.error(e); // jshint ignore:line
            });

        this.onDestroy(function () {
            PRIVATE.delete(this);
        }.bind(this));
    },

    /**
     * Un-selects all columns.
     */
    unSelectAll: function(){
        domFind(this.getEle(), "." + CSS_CLASS_COL_SELECTED).forEach(function(colEle){
            if (domHasClass(colEle, CSS_CLASS_COL_SELECTED)) {
                toggleColumnSelection.call(this, colEle);
            }
        }.bind(this));
    },

    /**
     * returns the List Column Models for the columns selected
     *
     * @return {Array<ListColumnModel>}
     */
    getSelected: function(){
        return domFind(this.getEle(), "." + CSS_CLASS_COL_SELECTED).map(function(selColEle){
            return getColumnDefForElement.call(this, selColEle);
        }.bind(this));
    },

    /**
     * Given an list of column defintions, this method will mark them
     * selected in the UI.
     *
     * @param {Array<ListColumnModel>} columns
     */
    setSelected: function(columns){
        var inst = PRIVATE.get(this);

        if (!Array.isArray(columns)) {
            columns = [columns];
        }

        columns.forEach(function(colDef){
            var ele = inst.uiFind("[data-name='" + colDef.StaticName + "']");
            if (ele) {
                domAddClass(ele, CSS_CLASS_COL_SELECTED);
            }
        });
    }
});

/**
 * returns the ListColumnModel for the given HTML element
 *
 * @private
 *
 * @returns {ListColumnModel|Object}
 */
function getColumnDefForElement(element) {
    var colName = element.getAttribute("data-name"),
        colDef  = {};

    PRIVATE.get(this).listCols.some(function(listColDef){
        if (listColDef.Name === colName) {
            colDef = listColDef;
            return true;
        }
    });

    return colDef;
}

/**
 * Retrieves the list of columns from the List definition.
 *
 * @private
 *
 * @returns {Promise<ListColumnsCollection, Error>}
 */
function loadColumns() {
    var inst        = PRIVATE.get(this),
        allowedCols = inst.opt.columns || [];

    return getListColumns({listName: inst.opt.listName, webURL: inst.opt.webURL})
        .then(function(columns){
            inst.listCols = columns.filter(function(column){
                return  !allowedCols.length ||
                        allowedCols.indexOf(column.StaticName) !== -1 ||
                        allowedCols.indexOf(column.DisplayName) !== -1;
            });
            return inst.listCols;
        });
}

/**
 * Show the columns on the UI
 * @private
 */
function showColumns() {
    var inst = PRIVATE.get(this),
        cols    = inst.listCols.slice();

    cols.sort(function(a, b){
        var aName   = a.DisplayName,
            bName   = b.DisplayName;

        if (aName < bName) {
            return -1;
        }
        if (aName > bName) {
            return 1;
        }
        return 0;
    });

    inst.bodyContent.innerHTML = "";
    inst.bodyContent.appendChild(
        parseHTML(
            fillTemplate(columnTemplate, cols)
        )
    );
}

function toggleColumnSelection(colEle) {
    var emit = this.emit.bind(this),
        colDef = getColumnDefForElement.call(this, colEle);

    if (domHasClass(colEle, CSS_CLASS_COL_SELECTED)) {
        domRemoveClass(colEle, CSS_CLASS_COL_SELECTED);
        /**
         * Column was unselected from the list
         *
         * @event ColumnSelector#unselect
         * @type {ListColumnModel}
         */
        emit("unselect", colDef);

    } else {
        domAddClass(colEle, CSS_CLASS_COL_SELECTED);
        /**
         * Column was unselected from the list
         *
         * @event ColumnSelector#select
         * @type {ListColumnModel}
         */
        emit("select", colDef);
    }
}

ColumnSelector.defaults = {
    listName:               "",
    webURL:                 "",
    columns:                null,
    selectedFieldsLayout:   ""
};

export default ColumnSelector;
