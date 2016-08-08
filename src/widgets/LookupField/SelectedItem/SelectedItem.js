import Widget from "vendor/jsutils/Widget";
import EventEmitter from "vendor/jsutils/EventEmitter";
import dataStore from "vendor/jsutils/dataStore";
import objectExtend from "vendor/jsutils/objectExtend";
import fillTemplate from "vendor/jsutils/fillTemplate";
import parseHTML from "vendor/jsutils/parseHTML";
import domMatches from "vendor/domutils/domMatches";
import domAddEventListener from "vendor/domutils/domAddEventListener";
import SelectedItemTemplate from "text!./SelectedItem.html";
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

    export default SelectedItem;
