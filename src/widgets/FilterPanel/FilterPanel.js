import Widget                       from "common-micro-libs/src/jsutils/Widget"
import EventEmitter                 from "common-micro-libs/src/jsutils/EventEmitter"
import dataStore                    from "common-micro-libs/src/jsutils/dataStore"
import objectExtend                 from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate                 from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML                    from "common-micro-libs/src/jsutils/parseHTML"
import Promise                      from "common-micro-libs/src/jsutils/es6-promise"
import domSetStyle                  from "common-micro-libs/src/domutils/domSetStyle"
import domAddEventListener          from "common-micro-libs/src/domutils/domAddEventListener"
import domAddClass                  from "common-micro-libs/src/domutils/domAddClass"
import domRemoveClass               from "common-micro-libs/src/domutils/domRemoveClass"
import domChildren                  from "common-micro-libs/src/domutils/domChildren"
import fitEleToParent               from "common-micro-libs/src/domutils/fitEleToParent"

import Message                      from "../Message/Message"

import ColumnSelector               from "./ColumnSelector/ColumnSelector"
import FilterColumn                 from "./FilterColumn/FilterColumn"
import FilterColumnTextField        from "./FilterColumnTextField/FilterColumnTextField"
import FilterColumnAttachmentsField from "./FilterColumnAttachmentsField/FilterColumnAttachmentsField"
import FilterColumnChoiceField      from "./FilterColumnChoiceField/FilterColumnChoiceField"
import FilterColumnLookupField      from "./FilterColumnLookupField/FilterColumnLookupField"
import FilterColumnNumberField      from "./FilterColumnNumberField/FilterColumnNumberField"
import FilterColumnUserField        from "./FilterColumnUserField/FilterColumnUserField"
import FilterColumnDateTimeField    from "./FilterColumnDateTimeField/FilterColumnDateTimeField"
import FilterColumnContentTypeField from "./FilterColumnContentTypeField/FilterColumnContentTypeField"
import FilterColumnBooleanField     from "./FilterColumnBooleanField/FilterColumnBooleanField"
import FiltersCollection            from "./FiltersCollection"
import FilterModel                  from "./FilterModel"

import getListColumns               from "../../spapi/getListColumns"
import SPFilterPanelTemplate        from "./FilterPanel.html"
import "./FilterPanel.less"

var
PRIVATE             = dataStore.create(),
WINDOW_NAVIGATOR    = window.navigator,

CSS_CLASS_BASE              = "spwidgets-FilterPanel",
CSS_CLASS_NO_HEADER         = CSS_CLASS_BASE + "--noHeader",
CSS_CLASS_NO_FIND_BUTTON    = `${CSS_CLASS_BASE}--noFindButton`,
CSS_CLASS_BODY_FIXED_HEIGHT = CSS_CLASS_BASE + "--fixHeight",

CSS_CLASS_MS_BUTTON_PRIMARY = "ms-Button--primary",

/**
 * A Filter panel allowing a user the ability to define filtering
 * criteria for data in a List or Document Library using the
 * columns of that list or library.
 *
 * __About Events__
 *
 * All Filter Column widget events are piped to the Filter panel with prefix of `filterColumn:`.
 * To capture all column changes, use `filterColumn:change` event
 *
 * @class FilterPanel
 * @extends Widget
 *
 * @param {Object} options
 *
 * @param {Array<String>} [options.columns]
 *  List of columns that should be made available to the user for use in
 *  the filter panel. By default, all exposed columns of the given List
 *  are shown. The column names defined in this option must be the `StaticName`
 *  of the list column.
 * @param {Array<Object>|FiltersCollection} [options.filters]
 *  A list of defined filters to show in the filter panel. See [setFilters()]{@link FilterPanel#setFilters}
 *  for more on the format of this parameter
 *
 * @fires FilterPanel#clear
 * @fires FilterPanel#find
 * @fires FilterPanel#close
 */
FilterPanel = /** @lends FilterPanel.prototype */{
    init: function (options) {
        var inst = {
            opt:        objectExtend({}, this.getFactory().defaults, options),
            uiFind:     null,
            body:       null,
            infoMsg:    null,
            colsWdg:    {}      // List of columns currently shown
        },
        opt = inst.opt;

        PRIVATE.set(this, inst);

        var me  = this,
            $ui = me.$ui = parseHTML(
                fillTemplate(SPFilterPanelTemplate, inst.opt)
            ).firstChild,
            uiFind          = inst.uiFind = $ui.querySelector.bind($ui),
            BASE_SELECTOR   = "." + CSS_CLASS_BASE,
            emit            = me.emit.bind(me);


        inst.main = uiFind(BASE_SELECTOR + "-main");
        inst.body = uiFind(BASE_SELECTOR + "-body");
        inst.find = uiFind(BASE_SELECTOR + "-footer-action-find");

        // Apply modifiers
        if (opt.hideHeader) {
            domAddClass($ui, CSS_CLASS_NO_HEADER);
        }
        if (opt.hideFindButton) {
            domAddClass($ui, CSS_CLASS_NO_FIND_BUTTON);
        }

        if (opt.bodyHeight) {
            this.setBodyHeight(opt.bodyHeight);
        }


        // Info widget
        inst.infoMsg = Widget.extend({$ui: parseHTML('<div style="padding: 2em 5%;"/>').firstChild}).create();
        Message.create({ message: opt.labels.msg }).appendTo(inst.infoMsg.getEle());
        inst.infoMsg.appendTo(inst.body);

        // Column selector widget
        inst.columnSelector = ColumnSelector.create(opt);
        inst.columnSelector.pipe(this, "columnSelector:");

        if (opt.filters && opt.filters.length) {
            this.setFilters(opt.filters);
        }

        //----------------------------------------
        // Initialize event handlers
        //----------------------------------------
        domAddEventListener(uiFind(BASE_SELECTOR + "-footer-action-add"), "click", function(){
            inst.columnSelector.appendTo($ui);
            inst.columnSelector.show();
        });

        domAddEventListener(uiFind(BASE_SELECTOR + "-footer-action-clear"), "click", function(){
            this.clear();

            /**
             * Defined filters were cleared
             *
             * @event FilterPanel#clear
             */
            emit("clear");
        }.bind(this));

        domAddEventListener(inst.find, "click", function(){
            /**
             * Find button was clicked
             *
             * @event FilterPanel#find
             */
            emit("find");
        });

        domAddEventListener(uiFind(BASE_SELECTOR + "-header-close"), "click", function(){
            /**
             * Close button was clicked
             *
             * @event FilterPanel#close
             */
            emit("close");
        });

        // FIXME: handle move up|down of columns
        // See snippet from stackoverflow on movement:
        // http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
        //    Array.prototype.move = function (old_index, new_index) {
        //        if (new_index >= this.length) {
        //            var k = new_index - this.length;
        //            while ((k--) + 1) {
        //                this.push(undefined);
        //            }
        //        }
        //        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
        //        return this; // for testing purposes
        //    };

        me.on("columnSelector:cancel", function(){
            inst.columnSelector.hide();
        });

        me.on("columnSelector:ok", function(){
            inst.columnSelector.hide();
        });

        me.on("columnSelector:select", function(colDef){
            addColumns.call(me, [colDef], null, true);
        });

        me.on("columnSelector:unselect", function(colDef){
            hideFilterColumn.call(me, colDef.Name);
        });

        me.on("filterColumn:change", function(){
            if (this.isDirty()) {
                domAddClass(inst.find, CSS_CLASS_MS_BUTTON_PRIMARY);
            } else {
                domRemoveClass(inst.find, CSS_CLASS_MS_BUTTON_PRIMARY);
            }
        }.bind(this));

        //--------------------------------------
        // Destroy logic
        //--------------------------------------
        this.onDestroy(function () {
            PRIVATE.delete(this);
            Object.keys(inst).forEach(function(prop){
                if (inst[prop] && inst[prop].destroy) {
                    inst[prop].destroy();
                    inst[prop] = undefined;
                }
            });
        }.bind(this));
    },

    /**
     * Fits the widgets to its parent element, by ensuring that
     * the Filter widget's buttons and header are always visible.
     *
     * @param {Number} [offset]
     *  Number of pixels to offset the fitting by.
     */
    fitToParent: function(offset){
        var ele = this.getEle();
        domAddClass(ele, CSS_CLASS_BODY_FIXED_HEIGHT);
        return fitEleToParent(ele, offset, PRIVATE.get(this).body);
    },

    /**
     * Clears the fixed height placed on the Filter Panel
     */
    clearFitToParent: function(){
        this.clearBodyHeight();
    },

    /**
     * Sets a fixed height to the body of the filter panel
     *
     * @param {String} newHeight
     *  the new height as a CSS value.
     *
     * @param {Boolean} fixed
     *  If true, then the css `height` property will be used, else
     *  the `max-height` property is used by default
     */
    setBodyHeight: function(newHeight, fixed){
        domAddClass(this.getEle(), CSS_CLASS_BODY_FIXED_HEIGHT);
        var cssProp = {};
        cssProp[fixed ? "height" : "maxHeight"] = newHeight;
        domSetStyle(PRIVATE.get(this).body, cssProp);
    },

    /**
     * Clears the fixed height out of the body of the filter panel
     */
    clearBodyHeight: function(){
        domRemoveClass(this.getEle(), CSS_CLASS_BODY_FIXED_HEIGHT);
        PRIVATE.get(this).body.style.height = "";
    },

    /**
     * Clears the selected fields in the Filter Panel
     */
    clear: function(){
        addColumns.call(this, []);
    },

    /**
     * Returns a boolean indicating whether the filter panel
     * contains columns that have been changed by the user.
     *
     * @returns {Boolean}
     */
    isDirty: function(){
        return getVisibleFilterColumnWidgets.call(this).some(function(colWidget){
            return colWidget.isDirty();
        });
    },

    /**
     * Returns a collection of filters defined by the user.
     *
     * @return {FiltersCollection}
     */
    getFilters: function(){
        var filters = getVisibleFilterColumnWidgets.call(this)
            .map(function(colWidget){
                return colWidget.getFilter();
            });

        return FiltersCollection.create(filters);
    },

    /**
     * Sets the filters on the panel, by removing all of the ones
     * currently displayed and showing only the set given on input.
     *
     * @param {Array<Object>|FiltersCollection} filters
     *
     * @returns {Promise}
     *  A promise is returned because it is possible that a network might
     *  be made to get the list of columns associated with the list.
     */
    setFilters: function(filters){
        if (!Array.isArray(filters) || !filters.length) {
            addColumns.call(this, []);
            return Promise.resolve();
        }

        var
        inst    = PRIVATE.get(this),
        opt     = inst.opt;

        return getListColumns({
            listName: opt.listName,
            webURL: opt.webURL
        })
        .then(function(columns){
            var colList     = [],
                colValues   = filters.filter(function(filter){
                    var column = columns.getColumn(filter.column);
                    if (column) {
                        colList.push(column);
                        return true;
                    }
                    return false;
                }),
                response;

            if (colList.length) {
                response = addColumns.call(this, colList, colValues);
                inst.columnSelector.setSelected(colList);
            }
            return response;

        }.bind(this))["catch"](function(e){
            console.error(e); // jshint ignore:line
        });
    }
};

/**
 * returns array with the filter columns that are visible
 * in the order in which they are displayed on the screen.
 *
 * @private
 *
 * @return {Array<Widget>}
 */
function getVisibleFilterColumnWidgets() {
    var colsWdg     = PRIVATE.get(this).colsWdg;
    var response    = Object.keys(colsWdg)
        .filter(function(colName){
            return  !!colsWdg[colName].getEle().parentNode &&
                colsWdg[colName].isDirty();
        }).map(function(colName){
            return colsWdg[colName];
        });
    var getDomPositionIndex = function(colWdg){
        var $colWdgUI       = colWdg.getEle();
        var $colWdgParent   = $colWdgUI.parentNode;

        if (!$colWdgParent) {
            return -1;
        }

        return domChildren($colWdgParent).indexOf($colWdgUI);
    };

    response.sort(function(wdgA, wdgB){
        var wdgAIndex = getDomPositionIndex(wdgA);
        var wdgBIndex = getDomPositionIndex(wdgB);

        if (wdgAIndex > wdgBIndex) {
            return 1;
        }

        if (wdgAIndex < wdgBIndex) {
            return -1;
        }

        return 0;
    });

    return response;
}

/**
 * Hides a filter column currently displayed
 *
 * @private
 * @param {String} internalColumnName
 */
function hideFilterColumn(internalColumnName) {
    var colsWdg = PRIVATE.get(this).colsWdg;

    if (colsWdg[internalColumnName]) {
        colsWdg[internalColumnName].detach();
    }
}

/**
 * Adds a column to the UI for the user to define criteria, if not already there.
 *
 * @private
 *
 * @param {Array<ListColumnModel>} colList
 *  The list of column definition that should be added to the UI
 *  for the user to define criteria.
 *
 * @param {Array} [colValues]
 *  A FiltersCollection like array with the defaults values for
 *  the columns that will be made visible.
 *
 * @param {Boolean} [append=false]
 *
 * @returns {Promise}
 */
function addColumns(colList, colValues, append){
    var inst                = PRIVATE.get(this),
        opt                 = inst.opt,
        colsWdg             = inst.colsWdg,
        body                = inst.body,
        newSet              = document.createDocumentFragment(),
        colsInitPromises    = [];

    // Detach all widgets currently visible
    if (!append) {
        Object.keys(colsWdg).forEach(function(colName){
            colsWdg[colName].detach();
        });
    }

    if (colList.length) {
        colList.forEach(function(colDef){
            var colName     = colDef.Name,
                colValue    = { values: []},
                FilterColumnConstructor;

            if (!colsWdg[colName]){

                // Get the constructor based on type
                switch (colDef.Type) {
                    case "User":
                    case "UserMulti":
                        FilterColumnConstructor = opt.UserWidget;
                        break;

                    case "Counter":
                    case "Number":
                    case "RatingCount":
                    case "AverageRating":
                    case "Likes":
                        FilterColumnConstructor = opt.NumberWidget;
                        break;

                    case "Computed":
                        // Is contentType?
                        if (colDef.PIAttribute === "ContentTypeID" || colDef.Name === "ContentType") {
                            FilterColumnConstructor = opt.ContentTypeWidget;
                        }
                        else {
                            FilterColumnConstructor = opt.TextWidget;
                        }
                        break;

                    case "DateTime":
                        FilterColumnConstructor = opt.DateTimeWidget;
                        break;

                    case "Choice":
                    case "MultiChoice":
                        FilterColumnConstructor = opt.ChoiceWidget;
                        break;

                    case "Lookup":
                    case "LookupMulti":
                        FilterColumnConstructor = opt.LookupWidget;
                        break;

                    case "Boolean":
                        FilterColumnConstructor = opt.BooleanWidget;
                        break;

                    case "Attachments":
                        FilterColumnConstructor = opt.AttachmentsWidget;
                        break;

                    default:
                        FilterColumnConstructor = opt.TextWidget;
                }

                colsWdg[colName] = FilterColumnConstructor.create(
                    objectExtend({}, opt, {column: colDef})
                );

                colsWdg[colName].pipe(this, "filterColumn:", true);
            }

            colsWdg[colName].appendTo(newSet);

            // If a colValue was set on input, then set that now as well
            // and add teh return value to the list of init promises, since
            // setting a value could trigger async calls.
            if (Array.isArray(colValues)) {
                colValues.some(function(colDefValue){
                    if (colDefValue && colDefValue.column === colName) {
                        colValue = colDefValue;
                        return true;
                    }
                });

                colsInitPromises.push(colsWdg[colName].setFilter(colValue));
            }
        }.bind(this));

        inst.infoMsg.detach();
        body.appendChild(newSet);

    } else {
        inst.infoMsg.appendTo(body);
        inst.columnSelector.unSelectAll();
    }

    return Promise.all(colsInitPromises);
}

FilterPanel = EventEmitter.extend(Widget, FilterPanel);

/**
 * Given an array of filters (ex. `Array<Object>`), this method
 * will return a collection of `FilterModel`'s.
 *
 * @method FilterPanel.getFiltersCollection
 *
 * @param {Array<Object>|Collection} filterList
 *
 * @return {FiltersCollection}
 */
FilterPanel.getFiltersCollection = function(filterList){
    var filters = filterList && filterList.slice ? filterList.slice() : [];
    return FiltersCollection.create(filters.map( filter => FilterModel.create(filter) ));
};

FilterPanel.defaults = {
    listName:           "",
    webURL:             "",
    columns:            null,
    filters:            null,
    ignoreKeywords:     /^(of|and|a|an|to|by|the|or|from)$/i,
    delimiter:          ';',
    zIndex:             15,
    bodyHeight:         '',

    FilterColumn:       FilterColumn,   // Base class. Use it to build other fields
    TextWidget:         FilterColumnTextField,
    AttachmentsWidget:  FilterColumnAttachmentsField,
    ChoiceWidget:       FilterColumnChoiceField,
    LookupWidget:       FilterColumnLookupField,
    NumberWidget:       FilterColumnNumberField,
    UserWidget:         FilterColumnUserField,
    DateTimeWidget:     FilterColumnDateTimeField,
    ContentTypeWidget:  FilterColumnContentTypeField,
    BooleanWidget:      FilterColumnBooleanField,

    // FIXME: add all other modules, like collection, model, and internal widgets here as well.

    hideHeader:         false,
    hideFindButton:     false,
    selectFieldsLayout: '3-col',    // 1, 2 or 3 -col
    labels: {                       // All possible labels used by all widgets
        title:          "Filter",
        find:           "Find",
        clear:          "Clear",
        close:          "Close",
        cancel:         "Cancel",
        add:            "Add Field",
        msg:            "Click the Add button below to add a list field.",
        select:         "Select Fields",
        ok:             "Ok",
        options:        "options",
        inputKeywords:  "Enter Keywords",
        keywordsInfo:   "Use a semicolon to delimiter multiple keywords.",
        attachmentsInfo:"Match items that include attachments.",
        totalSelected:  "{{total}} selected.",
        moveUp:         "Move Up",
        moveDown:       "Move Down",
        selectedLabel:  "{{count}} Selected",
        // Comparison operators
        contains:       "Contains",
        equal:          "Equal",
        notEqual:       "Not Equal",
        isBlank:        "Is Blank",
        isNotBlank:     "Is Not Blank",
        lessThan:       "Less Than",
        greaterThan:    "Greater Than",
        after:          "After",
        before:         "Before",
        // Logical Operators
        any:             "Any",
        all:             "All",
        // Sort Order
        sort:           "Sort",
        asc:            "Ascending",
        des:            "Descending",

        // Attachments
        "yes": "Yes",
        "no":  "No"
    }
};

export default FilterPanel;
