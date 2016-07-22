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
    "vendor/domutils/domAddClass",
    "vendor/domutils/domRemoveClass",

    "text!./ListItemSimple.html",
    //------------------------------------
    "less!./ListItem.less"
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
    domAddClass,
    domRemoveClass,

    ListItemTemplate
) {

    var
    PRIVATE = dataStore.create(),

    CSS_CLASS_IS_SELECTABLE = "is-selectable",
    CSS_CLASS_IS_UNSEEN     = "is-unseen",
    CSS_CLASS_IS_UNREAD     = "is-unread",
    CSS_CLASS_SELECTED      = "is-selected",

    NBSP = '&nbsp;',

    /**
     * A list item widget displayed in the `List`. The widget provides
     * a template where multiple pieces of data can be displayed as well
     * as support for selection and visual queues.
     *
     * @class ListItem
     * @extends Widget
     *
     * @param {Object} options
     *
     * @param {Object} options.item
     *  The Item model for the list item. Object will also be given to event
     *  callbacks
     *
     * @param {String} [options.primaryFrom='Title']
     *  The attribute from `options.item` to be used as the value for the
     *  Primary text.
     *
     * @param {String} [options.secondaryFrom='Editor']
     *
     * @param {String} [options.tertiaryFrom='']
     *
     * @param {String} [options.metaFrom='Modified']
     *
     * @param {Object} [options.selectable=true]
     *
     * @param {Object} [options.unseen=false]
     *
     * @param {Object} [options.unread=false]
     *
     *
     * @fires ListItem#selected
     * @fires ListItem#unselected
     */
    ListItem = /** @lends ListItem.prototype */{
        init: function (options) {
            var me      = this,
                inst    = {
                opt: objectExtend({}, ListItem.defaults, options, {_ui: {}})
            },
            opt     = inst.opt,
            item    = opt.item,
            _ui     = opt._ui;

            PRIVATE.set(this, inst);

            // Define the data values for the template
            _ui.primary     = item[opt.primaryFrom || 'Title']  || NBSP;
            _ui.secondary   = item[opt.secondaryFrom]           || NBSP;
            _ui.tertiary    = item[opt.tertiaryFrom]            || NBSP;
            _ui.meta        = item[opt.metaFrom]                || NBSP;

            var $ui = me.$ui = parseHTML(
                fillTemplate(this.getTemplate(), opt)
            ).firstChild;

            // Apply behaviours to the template
            if (opt.selectable) {
                domAddClass($ui, CSS_CLASS_IS_SELECTABLE);
            }
            if (opt.unseen) {
                domAddClass($ui, CSS_CLASS_IS_UNSEEN);
            }
            if (opt.unread) {
                domAddClass($ui, CSS_CLASS_IS_UNREAD);
            }

            // Listen for clicks on the list item
            domAddEventListener($ui, "click", function(){
                // If selectable, toggle the condition
                if (domHasClass($ui, CSS_CLASS_IS_SELECTABLE)) {
                    me.toggleSelected();

                    if (domHasClass($ui, CSS_CLASS_SELECTED)) {
                        /**
                         * List Item was selected. The data structure used to
                         * build the list item is provided to event listeners.
                         *
                         * @event ListItem#selected
                         * @type Object
                         */
                        me.emit("selected", item);

                    } else {
                        /**
                         * List Item was unselected. The data structure used to
                         * build the list item is provided to event listeners.
                         *
                         * @event ListItem#unselected
                         * @type Object
                         */
                        me.emit("unselected", item);
                    }
                }
            });

            me.onDestroy(function () {
                PRIVATE.delete(me);
            }.bind(this));
        },

        /**
         * Toggles the item's selection. Only applied if List item `is-selectable`
         */
        toggleSelected: function(){
            var $ui = this.getEle();
            if (domHasClass($ui, CSS_CLASS_IS_SELECTABLE)) {
                domToggleClass($ui, CSS_CLASS_SELECTED);
            }
        },

        /**
         * Selects the list item. Only applied if list item `is-selectable`
         */
        select: function(){
            var $ui = this.getEle();
            if (domHasClass($ui, CSS_CLASS_IS_SELECTABLE)) {
                domAddClass($ui, CSS_CLASS_SELECTED);
            }
        },

        /**
         * Unselects the List item. Only applied if list item `is-selectable`
         */
        unselect: function(){
            var $ui = this.getEle();
            if (domHasClass($ui, CSS_CLASS_IS_SELECTABLE)) {
                domRemoveClass($ui, CSS_CLASS_SELECTED);
            }
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
    ListItem.defaults = {
        item:       null,
        primaryFrom:    'Title',
        secondaryFrom:  'Editor',
        tertiaryFrom:   '',
        metaFrom:       'Modified',
        selectable:     true,
        unseen:         false,
        unread:         false
    };

    return ListItem;
});