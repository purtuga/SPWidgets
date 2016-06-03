define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "vendor/domutils/domSetStyle",
    "vendor/domutils/domAddEventListener",

    "../Message/Message",
    "./ColumnSelector/ColumnSelector",
    "./FilterColumn/FilterColumn",

    "text!./SPFilterPanel.html",

    //----------------------------------
    "less!./SPFilterPanel.less"
], function (
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    domSetStyle,
    domAddEventListener,

    Message,
    ColumnSelector,
    FilterColumn,

    SPFilterPanelTemplate
) {

    var
    PRIVATE             = dataStore.create(),
    WINDOW_NAVIGATOR    = window.navigator,

    CSS_CLASS_BASE      = "spwidgets-SPFilterPanel",


    /**
     * A Filter panel allowing a user the ability to define filtering
     * criteria for data in a List or Document Library using the
     * columns of that list or library.
     *
     * @class SPFilterPanel
     * @extends Widget
     *
     * @param {Object} options
     *
     * @param {Object} [options.i18n]
     * @param {Object} [options.i18n.en-us]
     * @param {String} [options.i18n.en-us.title]
     * @param {String} [options.i18n.en-us.find]
     * @param {String} [options.i18n.en-us.clear]
     * @param {String} [options.i18n.en-us.close]
     * @param {String} [options.i18n.en-us.add]
     *
     * @fires SPFilterPanel#clear
     * @fires SPFilterPanel#find
     * @fires SPFilterPanel#close
     */
    SPFilterPanel = /** @lends SPFilterPanel.prototype */{
        init: function (options) {
            var inst = {
                opt:        objectExtend({}, SPFilterPanel.defaults, options),
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
                addColumns.call(this, []);

                /**
                 * Defined filters were cleared
                 *
                 * @event SPFilterPanel#clear
                 */
                emit("clear");
            }.bind(this));

            domAddEventListener(uiFind(BASE_SELECTOR + "-footer-action-find"), "click", function(){
                /**
                 * Find button was clicked
                 *
                 * @event SPFilterPanel#find
                 */
                emit("find");
            });

            domAddEventListener(uiFind(BASE_SELECTOR + "-header-close"), "click", function(){
                /**
                 * Close button was clicked
                 *
                 * @event SPFilterPanel#close
                 */
                emit("close");
            });

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
                Object.key(inst).forEach(function(prop){
                    if (inst[prop] && inst[prop].destroy) {
                        inst[prop].destroy();
                        inst[prop] = undefined;
                    }
                });
            }.bind(this));
        }
    };

    /**
     * Adds a column to the UI, if not already there.
     *
     * @param {Array} colList
     *  The list of column definition that should be added to the UI
     *  for the user to define criteria.
     *
     * @private
     */
    function addColumns(colList){
        var inst    = PRIVATE.get(this),
            colsWdg = inst.colsWdg,
            body    = inst.body,
            newSet  = document.createDocumentFragment();

        // Detach all
        Object.keys(colsWdg).forEach(function(colName){
            colsWdg[colName].detach();
        });

        if (colList.length) {
            colList.forEach(function(colDef){
                var colName = colDef.Name;

                if (!colsWdg[colName]){
                    colsWdg[colName] = FilterColumn.create({
                        column: colDef,
                        labels: inst.opt.labels
                    });
                }

                colsWdg[colName].appendTo(newSet);
            });

            inst.infoMsg.detach();
            body.appendChild(newSet);

        } else {
            inst.infoMsg.appendTo(body);
        }
    }



    SPFilterPanel = EventEmitter.extend(Widget, SPFilterPanel);
    SPFilterPanel.defaults = {
        listName:       "",
        webURL:         "",
        ignoreKeywords: /^(of|and|a|an|to|by|the|or|from)$/i,
        delimiter:      ';',
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
                moveUp:         "Move Up",
                moveDown:       "Move Down",
                // Comparison operators
                contains:       "Contains",
                equal:          "Equal",
                notEqual:       "Not Equal",
                isBlank:        "Is Blank",
                isNotBlank:     "Is Not Blank",
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

    return SPFilterPanel;
});