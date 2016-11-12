import Widget               from "vendor/jsutils/Widget";
import EventEmitter         from "vendor/jsutils/EventEmitter";
import dataStore            from "vendor/jsutils/dataStore";
import objectExtend         from "vendor/jsutils/objectExtend";
import fillTemplate         from "vendor/jsutils/fillTemplate";
import parseHTML            from "vendor/jsutils/parseHTML";
import domAddEventListener  from "vendor/domutils/domAddEventListener";
import domHasClass          from "vendor/domutils/domHasClass";
import domToggleClass       from "vendor/domutils/domToggleClass";
import domAddClass          from "vendor/domutils/domAddClass";
import domRemoveClass       from "vendor/domutils/domRemoveClass";
import ListItemTemplate     from "./ListItemSimple.html";
import "./ListItem.less";

//----------------------------------------------------------------
const PRIVATE                   = dataStore.create();
const CSS_CLASS_IS_SELECTABLE   = "is-selectable";
const CSS_CLASS_IS_UNSEEN       = "is-unseen";
const CSS_CLASS_IS_UNREAD       = "is-unread";
const CSS_CLASS_SELECTED        = "is-selected";
const NBSP                      = '&nbsp;';

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
let ListItem = /** @lends ListItem.prototype */{
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

export default ListItem;
