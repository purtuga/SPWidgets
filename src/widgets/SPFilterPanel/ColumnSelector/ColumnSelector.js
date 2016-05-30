define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "vendor/domutils/domAddEventListener",

    "../../../spapi/getListColumns",

    "text!./ColumnSelector.html",
    "text!./column.html",
    //-------------------------------------
    "less!./ColumnSelector"
], function (
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    domAddEventListener,

    getListColumns,

    ColumnSelectorTemplate,
    columnTemplate
) {

    var
    PRIVATE = dataStore.create(),

    CSS_CLASS_BASE = "spwidgets-SPFilterPanel-ColumnSelector",

    /**
     * Widget description
     *
     * @class ColumnSelector
     * @extends Widget
     *
     * @fires ColumnSelector#cancel
     * @fires ColumnSelector#select
     */
    ColumnSelector = /** @lends ColumnSelector.prototype */{
        init: function (options) {
            var inst = {
                opt:        objectExtend({}, ColumnSelector.defaults, options),
                listCols:   null
            };

            PRIVATE.set(this, inst);

            var $ui = this.$ui = parseHTML(
                    fillTemplate(ColumnSelectorTemplate, inst.opt)
                ).firstChild,
                uiFind          = $ui.querySelector.bind($ui),
                BASE_SELECTOR   = "." + CSS_CLASS_BASE,
                emit            = this.emit.bind(this);

            this.hide();

            inst.bodyContent = uiFind(BASE_SELECTOR + "-body-content");

            domAddEventListener(uiFind(BASE_SELECTOR + "-action-cancel"), "click", function () {
                /**
                 * Cancel button was clicked
                 * @event ColumnSelector#cancel
                 */
                emit("cancel");
            });

            domAddEventListener(uiFind(BASE_SELECTOR + "-action-select"), "click", function () {
                /**
                 * Select button was clicked
                 * @event ColumnSelector#cancel
                 */
                emit("select");
            });

            loadColumns.call(this)
                .then(showColumns.bind(this))
                ["catch"](function(e){
                    console.error(e); // jshint ignore:line
                });

            this.onDestroy(function () {
                PRIVATE.delete(this);
            }.bind(this));
        }
    };

    /**
     * Retrieves the list of columns from the List definition.
     *
     * @private
     *
     * @returns {Promise<ListColumnsCollection, Error>}
     */
    function loadColumns() {
        var inst = PRIVATE.get(this);

        return getListColumns({listName: inst.opt.listName, webURL: inst.opt.webURL})
            .then(function(columns){
                inst.listCols = columns;
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

    ColumnSelector = EventEmitter.extend(Widget, ColumnSelector);
    ColumnSelector.defaults = {};

    return ColumnSelector;
});