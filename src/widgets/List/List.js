import Widget       from "common-micro-libs/src/jsutils/Widget"
import EventEmitter from "common-micro-libs/src/jsutils/EventEmitter"
import dataStore    from "common-micro-libs/src/jsutils/dataStore"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML    from "common-micro-libs/src/jsutils/parseHTML"
import Map          from "common-micro-libs/src/jsutils/es6-Map"
import ListItem     from "../ListItem/ListItem"
import ListTemplate from "./List.html"

//-------------------------------------------------------------
let PRIVATE = dataStore.create();

/**
 * A list of items.
 *
 * @class List
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} [options]
 *
 * @param {Array<Object>|Collection} [options.items]
 *  An array of objects with the items to be displayed. Could also be a
 *  `Collection` as a result of an API call.  Each Object should contain
 *  the attributes needed by the specified `ListItemWidget` on input.
 *
 * @param {Widget} [options.ListItemWidget]
 *  The Widget to be used in building each list item. If widget inherits
 *  from [EventEmitter]{@link EventEmitter}, then those events will be
 *  `pipe`'d to this widget.
 *
 * @param {Object} [options.listItemOptions]
 *  Options to be passed along to each initialization of a ListItem widget.
 *
 * @fires ListItem#item:selected
 * @fires ListItem#item:unselected
 */
let List = /** @lends List.prototype */{
    init: function (options) {
        var inst = {
            opt:        objectExtend({}, this.getFactory().defaults, options),
            listItems:  new Map() // ListItem Widgets: key === dataObj
        };

        PRIVATE.set(this, inst);

        this.$ui = parseHTML(
            fillTemplate(ListTemplate, inst.opt)
        ).firstChild;

        if (inst.opt.items) {
            this.setItems(inst.opt.items);
        }

        this.onDestroy(function () {
            this.clear();

            PRIVATE.delete(this);
        }.bind(this));
    },

    /**
     * Sets a new list of items provided on input to the widget.
     *
     * @param {Array<Object>|Collection} items
     */
    setItems: function(items){
        var
        me              = this,
        inst            = PRIVATE.get(me),
        listItems       = inst.listItems,
        $ele            = me.getEle(),
        $newItemSet     = document.createDocumentFragment(),
        ListItemWidget  = inst.opt.ListItemWidget;

        me.clear();

        // Item object needs to have `forEach` (array or Collection)
        if (!items || !items.forEach) {
            return;
        }

        items.forEach(function(itemData){
            var itemWidget = ListItemWidget.create({
                item: itemData
            });

            itemWidget.appendTo($newItemSet);
            itemWidget.pipe(me, "item:");

            listItems.set(itemData, itemWidget);
        });

        $ele.appendChild($newItemSet);
    },

    /**
     * Clears all items from the list (removes them)
     */
    clear: function(){
        var listItems = PRIVATE.get(this).listItems;

        listItems.forEach(function(listItem){
            if (listItem) {
                listItem.destroy();
            }
        });

        listItems.clear();
    },

    /**
     * Select a specific item currently in the list
     *
     * @param {Object} itemData
     * The item data object that represents the item to be selected.
     * Note that this object must be exactly the one used when the item
     * was added to the List.
     */
    selectItem: function(itemData){
        var listItems = PRIVATE.get(this).listItems;

        if (itemData && listItems.has(itemData)) {
            listItems.get(itemData).select();
        }
    },

    /**
     * Unselect a specific item currently in the list.
     *
     * @param {Object} itemData
     * The item data object that represents the item to be selected.
     * Note that this object must be exactly the one used when the item
     * was added to the List.
     */
    unselectItem: function(itemData){
        var listItems = PRIVATE.get(this).listItems;

        if (itemData && listItems.has(itemData)) {
            listItems.get(itemData).unselect();
        }
    }
};

List = EventEmitter.extend(Widget, List);
List.defaults = {
    items:              null,
    ListItemWidget:     ListItem,
    listItemOptions:    null
};

export default List;
