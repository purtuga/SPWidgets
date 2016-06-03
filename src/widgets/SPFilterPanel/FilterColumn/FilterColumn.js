define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "vendor/domutils/domAddEventListener",
    "vendor/domutils/domAddClass",
    "vendor/domutils/domRemoveClass",
    "vendor/domutils/domHasClass",

    "text!./FilterColumn.html",
    //--------------------------------------
    "less!./FilterColumn"
], function (
    Widget,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    domAddEventListener,
    domAddClass,
    domRemoveClass,
    domHasClass,

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
     * @param {Widget} [options.Widget=TextField]
     *  the widget to be used for user to define its filtering values
     *
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
                uiFind = inst.uiFind = $ui.querySelector.bind($ui),
                BASE_SELECTOR    = "." + CSS_CLASS_BASE;

            domAddEventListener(uiFind(BASE_SELECTOR + "-info-optLink"), "click", function(){
                me.toggleOptions();
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
        }
    };

    FilterColumn = Widget.extend(FilterColumn);
    FilterColumn.defaults = {};

    return FilterColumn;
});