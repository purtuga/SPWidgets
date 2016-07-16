define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "../ListItem/ListItem",

    "text!./List.html"
], function (
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    ListItem,

    ListTemplate
) {

    var
    PRIVATE = dataStore.create(),

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
     *  An array of object with the items to be displayed. Could also be a
     *  `Collection` as a result of an API call.  Each Object should contain
     *  the attributes needed by the specified `ListItemWidget` on input.
     *
     * @param {Widget} [options.ListItemWidget]
     *  The Widget to be used in building each list item. If widtet inherits
     *  from [EventEmitter]{@link EventEmitter}, then those events will be
     *  `pipe`'d to this widget.
     *
     * @fires ListItem#item:selected
     * @fires ListItem#item:unselected
     */
    List = /** @lends List.prototype */{
        init: function (options) {
            var inst = {
                opt:            objectExtend({}, List.defaults, options),
                itemWidgets:    [] // Array of Widgets - each 1 item
            };

            PRIVATE.set(this, inst);

            this.$ui = parseHTML(
                fillTemplate(ListTemplate, inst.opt)
            ).firstChild;

            if (inst.opt.items) {
                this.setItems(inst.opt.items);
            }


            this.onDestroy(function () {
                inst.itemWidgets = inst.itemWidgets.filter(function(wdg){
                    wdg.destroy();
                    return false;
                });

                PRIVATE.delete(this);
            }.bind(this));
        },

        /**
         * Sets a new list of items provided on input to the widget.
         *
         * @param {Array<Object>|Collection} items
         */
        setItems: function(items){
            var me              = this,
                inst            = PRIVATE.get(me),
                itemWidgets     = inst.itemWidgets,
                $ele            = me.getEle(),
                $newItemSet     = document.createDocumentFragment(),
                ListItemWidget  = inst.opt.ListItemWidget;

            itemWidgets.splice(0).forEach(function(listItemWdg){
                listItemWdg.destroy();
            });

            // Item object needs to have `forEach` (array or Collection)
            if (!items || !items.forEach) {
                return;
            }

            items.forEach(function(item){
                var itemWidget = ListItemWidget.create({
                    item: item
                });

                itemWidget.appendTo($newItemSet);
                itemWidgets.push(itemWidget);
                itemWidget.pipe(me, "item:");
            });

            $ele.appendChild($newItemSet);
        }
    };

    List = EventEmitter.extend(Widget, List);
    List.defaults = {
        items:          null,
        ListItemWidget: ListItem
    };

    return List;
});