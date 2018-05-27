import Widget from "common-micro-libs/src/jsutils/Widget";
import EventEmitter from "common-micro-libs/src/jsutils/EventEmitter";
import dataStore from "common-micro-libs/src/jsutils/dataStore";
import objectExtend from "common-micro-libs/src/jsutils/objectExtend";
import fillTemplate from "common-micro-libs/src/jsutils/fillTemplate";
import parseHTML from "common-micro-libs/src/jsutils/parseHTML";
import domMatches from "common-micro-libs/src/domutils/domMatches";
import domAddEventListener from "common-micro-libs/src/domutils/domAddEventListener";
import SelectedItemTemplate from "./SelectedItem.html";
import "./SelectedItem.less";

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
                opt: objectExtend({}, this.getFactory().defaults, options)
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
        },

        /**
         * Returns the value for this selected item (default is the item passed on input)
         *
         * @return {Object}
         */
        getValue: function(){
            return PRIVATE.get(this).opt.item;
        }
    };

    SelectedItem = EventEmitter.extend(Widget, SelectedItem);
    SelectedItem.defaults = {
        item: null
    };

    export default SelectedItem;
