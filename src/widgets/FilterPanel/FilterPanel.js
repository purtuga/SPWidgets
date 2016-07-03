define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",
    "vendor/jsutils/es6-promise",

    "vendor/domutils/domSetStyle",
    "vendor/domutils/domAddEventListener",
    "vendor/domutils/domAddClass",
    "vendor/domutils/domRemoveClass",
    "vendor/domutils/fitEleToParent",

    "../Message/Message",
    "./ColumnSelector/ColumnSelector",
    "./FilterColumn/FilterColumn",
    "./FiltersCollection",

    "../TextField/TextField",
    "../ChoiceField/ChoiceField",
    "../LookupField/LookupField",
    "../PeoplePicker/PeoplePicker",
    "./FilterAttachmentsField/FilterAttachmentsField",

    "../../spapi/getListColumns",


    "text!./FilterPanel.html",
    //----------------------------------
    "less!./FilterPanel.less"
], function (
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,
    Promise,

    domSetStyle,
    domAddEventListener,
    domAddClass,
    domRemoveClass,
    fitEleToParent,

    Message,
    ColumnSelector,
    FilterColumn,
    FiltersCollection,

    TextField,
    ChoiceField,
    LookupField,
    PeoplePicker,
    FilterAttachmentsField,

    getListColumns,

    SPFilterPanelTemplate
) {

    var
    PRIVATE             = dataStore.create(),
    WINDOW_NAVIGATOR    = window.navigator,

    CSS_CLASS_BASE              = "spwidgets-FilterPanel",
    CSS_CLASS_NO_HEADER         = CSS_CLASS_BASE + "--noHeader",
    CSS_CLASS_BODY_FIXED_HEIGHT = CSS_CLASS_BASE + "--fixHeight",

    /**
     * A Filter panel allowing a user the ability to define filtering
     * criteria for data in a List or Document Library using the
     * columns of that list or library.
     *
     * @class FilterPanel
     * @extends Widget
     *
     * @param {Object} options
     *
     * @param {Array<String>} [options.columns]
     *  List of columns that should be made available to the user for use in
     *  the filter panel. By default, all exposed columns of the given List
     *  are shown. The column names defined in this option must be the `InternalName`
     *  of the list column.
     *
     * @param {Object} [options.i18n]
     * @param {Object} [options.i18n.en-us]
     * @param {String} [options.i18n.en-us.title]
     * @param {String} [options.i18n.en-us.find]
     * @param {String} [options.i18n.en-us.clear]
     * @param {String} [options.i18n.en-us.close]
     * @param {String} [options.i18n.en-us.add]
     *
     * @fires FilterPanel#clear
     * @fires FilterPanel#find
     * @fires FilterPanel#close
     */
    FilterPanel = /** @lends FilterPanel.prototype */{
        init: function (options) {
            var inst = {
                opt:        objectExtend({}, FilterPanel.defaults, options),
                uiFind:     null,
                body:       null,
                infoMsg:    null,
                colsWdg:    {}      // List of columns currently shown
            },
            opt = inst.opt;

            PRIVATE.set(this, inst);

            opt.lang    = String(WINDOW_NAVIGATOR.language || WINDOW_NAVIGATOR.userLanguage || "en-US");
            opt.labels  = opt.i18n[opt.lang] || opt.i18n["en-US"];

            var me  = this,
                $ui = me.$ui = parseHTML(
                    fillTemplate(SPFilterPanelTemplate, inst.opt)
                ).firstChild,
                uiFind          = inst.uiFind = $ui.querySelector.bind($ui),
                BASE_SELECTOR   = "." + CSS_CLASS_BASE,
                emit            = me.emit.bind(me);

            // hide Header?
            if (opt.hideHeader) {
                domAddClass($ui, CSS_CLASS_NO_HEADER);
            }

            inst.main = uiFind(BASE_SELECTOR + "-main");
            inst.body = uiFind(BASE_SELECTOR + "-body");

            // Info widget
            inst.infoMsg = Message.create({ message: opt.labels.msg });
            domSetStyle(inst.infoMsg.getEle(), {margin: "2em 5%"});
            inst.infoMsg.appendTo(inst.body);

            // Column selector widget
            inst.columnSelector = ColumnSelector.create(opt);
            inst.columnSelector.pipe(this, "columnSelector:");

            //----------------------------------------
            // Initialize event handlers
            //----------------------------------------
            domAddEventListener(uiFind(BASE_SELECTOR + "-footer-action-add"), "click", function(){
                inst.columnSelector.appendTo(inst.main);
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

            domAddEventListener(uiFind(BASE_SELECTOR + "-footer-action-find"), "click", function(){
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

            me.on("columnSelector:select", function(){
                inst.columnSelector.hide();
                addColumns.call(me, inst.columnSelector.getSelected());
            });

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
         * Returns a collection of filters defined by the user.
         *
         * @return {FiltersCollection}
         */
        getFilters: function(){
            var inst    = PRIVATE.get(this),
                colsWdg = inst.colsWdg,
                filters = Object.keys(colsWdg)
                    .filter(function(colName){
                        return  !!colsWdg[colName].getEle().parentNode &&
                                colsWdg[colName].isDirty();
                    })
                    .map(function(colName){
                        return colsWdg[colName].getFilter();
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

            var opt = PRIVATE.get(this).opt;

            return getListColumns({listName: opt.listName, webURL: opt.webURL}).then(function(columns){
                var colList     = [],
                    colValues   = filters.filter(function(filter){
                        var column = columns.getColumn(filter.column);
                        if (column) {
                            colList.push(column);
                            return true;
                        }
                        return false;
                    });

                if (colList.length) {
                    return addColumns.call(this, colList, colValues);
                }
            }.bind(this))["catch"](function(e){
                console.error(e); // jshint ignore:line
            });
        }
    };

    /**
     * Adds a column to the UI, if not already there.
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
     * @returns {Promise}
     */
    function addColumns(colList, colValues){
        var inst                = PRIVATE.get(this),
            opt                 = inst.opt,
            colsWdg             = inst.colsWdg,
            body                = inst.body,
            newSet              = document.createDocumentFragment(),
            colsInitPromises    = [];

        // Detach all widgets currently visible
        Object.keys(colsWdg).forEach(function(colName){
            colsWdg[colName].detach();
        });

        if (colList.length) {
            colList.forEach(function(colDef){
                var colName     = colDef.StaticName,
                    colValue    = { values: [] };

                if (!colsWdg[colName]){
                    colsWdg[colName] = FilterColumn.create(
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
    FilterPanel.defaults = {
        listName:           "",
        webURL:             "",
        columns:            null,
        ignoreKeywords:     /^(of|and|a|an|to|by|the|or|from)$/i,
        delimiter:          ';',
        TextField:          TextField,
        ChoiceField:        ChoiceField,
        AttachmentsField:   FilterAttachmentsField,
        PeoplePicker:       PeoplePicker,
        LookupField:        LookupField,
        // FIXME: add all other modules, like collection, model, and internal widgets here as well.

        hideHeader:         false,
        selectFieldsLayout: '3-col',    // 1, 2 or 3 -col
        i18n: {
            "en-US": {
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
                des:            "Descending"
            }
        }
    };

    return FilterPanel;
});