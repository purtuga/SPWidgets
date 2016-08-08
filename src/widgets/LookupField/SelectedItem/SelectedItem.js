define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "vendor/domutils/domMatches",
    "vendor/domutils/domAddEventListener",

    "text!./SelectedItem.html",
    //-----------------------------
    "./SelectedItem.less"
], function (
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    domMatches,
    domAddEventListener,

    SelectedItemTemplate
) {

    var
    PRIVATE = dataStore.create(),

    CSS_CLASS_REMOVE_BUTTON = "spwidgets-LookupField-SelectedItem-remove",

    /**
     * Displays a selected item from the LookupField list of choices.
     *
     * @class SelectedItem
     * @extends Widget
     * @extends EventEmitter
     *
     * @param {Object} options
     *
     * @fires SelectedItem#remove
     */
    SelectedItem = /** @lends SelectedItem.prototype */{
        init: function (options) {
            var inst = {
                opt: objectExtend({}, SelectedItem.defaults, options)
            };

            PRIVATE.set(this, inst);

            this.$ui = parseHTML(
                fillTemplate(this.getTemplate(), inst.opt)
            ).firstChild;

            inst.$removeBtn = this.$ui.querySelector("." + CSS_CLASS_REMOVE_BUTTON);

            domAddEventListener(inst.$removeBtn, "click", function(ev){
                ev.stopPropagation();
                /**
                 * User clicked on the Remove button. The `item` object provided on input
                 * will be given to listeners of this event.
                 *
                 * @event SelectedItem#remove
                 * @type {Object}
                 */
                this.emit("remove", inst.opt.item);
            }.bind(this));

            this.onDestroy(function () {
                PRIVATE.delete(this);
            }.bind(this));
        },

        /**
         * Returns the template for the widget.
         *
         * @return {String}
         */
        getTemplate: function(){
            return SelectedItemTemplate;
        },

        /**
         * Same as user clicking the remove button of the selected item
         */
        remove: function(){
            PRIVATE.get(this).$removeBtn.click();
        }
    };

    SelectedItem = EventEmitter.extend(Widget, SelectedItem);
    SelectedItem.defaults = {
        item: null
    };

    return SelectedItem;
});