define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "vendor/domutils/domAddEventListener",
    "vendor/domutils/domHasClass",
    "vendor/domutils/domToggleClass",

    "text!./ListItem.html"
], function (
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    domAddEventListener,
    domHasClass,
    domToggleClass,

    ListItemTemplate
) {

    var
    PRIVATE = dataStore.create(),

    CSS_CLASS_IS_SELECTABLE = "is-selectable",
    CSS_CLASS_SELECTED      = "is-selected",

    /**
     * Widget description
     *
     * @class ListItem
     * @extends Widget
     *
     * @param {Object} options
     *
     * @param {Object} options.item
     *
     * @fires ListItem#selected
     * @fires ListItem#unselected
     */
    ListItem = /** @lends ListItem.prototype */{
        init: function (options) {
            var me      = this,
                inst    = {
                opt: objectExtend({}, ListItem.defaults, options)
            };

            PRIVATE.set(this, inst);

            var $ui = me.$ui = parseHTML(
                fillTemplate(this.getTemplate(), inst.opt)
            ).firstChild;

            // Listen for clicks on the list item
            domAddEventListener($ui, "click", function(){
                // If selectable, toggle the condition
                if (domHasClass($ui, CSS_CLASS_IS_SELECTABLE)) {
                    domToggleClass($ui, CSS_CLASS_SELECTED);

                    if (domHasClass($ui, CSS_CLASS_SELECTED)) {
                        /**
                         * List Item was selected. The data structure used to
                         * build the list item is provided to event listeners.
                         *
                         * @event ListItem#selected
                         * @type Object
                         */
                        me.emit("selected", inst.opt.item);

                    } else {
                        /**
                         * List Item was unselected. The data structure used to
                         * build the list item is provided to event listeners.
                         *
                         * @event ListItem#unselected
                         * @type Object
                         */
                        me.emit("unselected", inst.opt.item);
                    }
                }
            });

            me.onDestroy(function () {
                PRIVATE.delete(me);
            }.bind(this));
        },

        /**
         * Returns the template for the widget.
         *
         * @return {String}
         */
        getTemplate: function(){
            return ListItemTemplate;
        }
    };

    ListItem = EventEmitter.extend(Widget, ListItem);
    ListItem.defaults = {};

    return ListItem;
});