define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "vendor/domutils/domAddEventListener",
    "vendor/domutils/domAddClass",
    "vendor/domutils/domRemoveClass",
    "vendor/domutils/domHasClass",

    "../FilterModel",

    "text!./FilterColumn.html",
    //--------------------------------------
    "less!./FilterColumn"
], function (
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    domAddEventListener,
    domAddClass,
    domRemoveClass,
    domHasClass,

    FilterModel,

    FilterColumnTemplate
) {

    var
    PRIVATE         = dataStore.create(),

    CSS_CLASS_BASE          = 'spwidgets-SPFilterPanel-FilterColumn',
    CSS_CLASS_SHOW_OPTIONS  = CSS_CLASS_BASE + "--showOptions",


    /**
     * Widget description
     *
     * @class FilterColumn
     * @extends Widget
     *
     * @param {Object} options
     *
     * @param {ListColumnModel} options.column
     *  the column definition
     *
     * @param {String} options.delimiter
     *
     * @param {Widget} [options.Widget=TextField]
     *  the widget to be used for user to define its filtering values
     *
     * @fires FilterColumn#up
     * @fires FilterColumn#down
     */
    FilterColumn = /** @lends FilterColumn.prototype */{
        init: function (options) {
            var inst = {
                opt: objectExtend({}, FilterColumn.defaults, options)
            };

            PRIVATE.set(this, inst);

            var me  = this,
                $ui = me.$ui = parseHTML(
                    fillTemplate(FilterColumnTemplate, inst.opt)
                ).firstChild,
                uiFind          = inst.uiFind = $ui.querySelector.bind($ui),
                BASE_SELECTOR   = "." + CSS_CLASS_BASE,
                emit            = me.emit.bind(me);

            inst.input              = uiFind("." + CSS_CLASS_BASE + "-input-holder input");
            inst.logicalOperator    = uiFind("select[name='logicalOperator']");
            inst.compareOperator    = uiFind("select[name='compareOperator']");
            inst.sortOrder          = uiFind("select[name='sortOrder']");

            domAddEventListener(uiFind(BASE_SELECTOR + "-info-optLink"), "click", function(){
                me.toggleOptions();
            });

            domAddEventListener(uiFind(BASE_SELECTOR + "-move-up"), "click", function(){
                /**
                 * The Up arrow was clicked on the Filter column definition
                 *
                 * @event FilterColumn#up
                 */
                emit("up");
            });

            domAddEventListener(uiFind(BASE_SELECTOR + "-move-down"), "click", function(){
                /**
                 * The Down arrow was clicked on the Filter column definition
                 *
                 * @event FilterColumn#down
                 */
                emit("down");
            });

            this.onDestroy(function () {
                PRIVATE.delete(this);
            }.bind(this));
        },

        /**
         * Toggles the Column options visibility on and off
         */
        toggleOptions: function () {
            var $ui = this.getEle();

            if (domHasClass($ui, CSS_CLASS_SHOW_OPTIONS)) {
                domRemoveClass($ui, CSS_CLASS_SHOW_OPTIONS);

            } else {
                domAddClass($ui, CSS_CLASS_SHOW_OPTIONS);
            }
        },

        /**
         * returns an array of keywords from the value entered.
         *
         * @return {Array<String>}
         */
        getKeywords: function () {
            var opt         = PRIVATE.get(this).opt,
                delimiter   = opt.delimeter || ";",
                reIgnore    = opt.ignoreKeywords;

            return this.getValue()
                .split(delimiter)
                .map(function(keyword){
                    return keyword.trim();
                })
                .filter(function(keyword){
                    return (keyword && !reIgnore.test(keyword));
                });
        },

        /**
         * Returns an object with the keywords the user entered
         * along with matching and sorting options.
         *
         * @return {FilterModel}
         */
        getFilter: function(){
            var inst = PRIVATE.get(this);

            return FilterModel.create(
                {
                    logicalOperator:    inst.logicalOperator.value,
                    compareOperator:    inst.compareOperator.value,
                    sortOrder:          inst.sortOrder.value,
                    values:             this.getKeywords()
                },
                { column: inst.opt.column }
            );
        },

        /**
         * Returns the value currently defined for the Column displayed
         * inside of the FilterColumn
         *
         * @return {String}
         */
        getValue: function(){
            return PRIVATE.get(this).input.value;
        }
    };

    FilterColumn = EventEmitter.extend(Widget, FilterColumn);
    FilterColumn.defaults = {};

    return FilterColumn;
});