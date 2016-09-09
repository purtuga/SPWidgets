import Widget                   from "common-micro-libs/src/jsutils/Widget";
import fillTemplate             from "common-micro-libs/src/jsutils/fillTemplate";
import parseHTML                from "common-micro-libs/src/jsutils/parseHTML";
import objectExtend             from "common-micro-libs/src/jsutils/objectExtend";
import dataStore                from "common-micro-libs/src/jsutils/dataStore";
import EventEmitter             from "common-micro-libs/src/jsutils/EventEmitter";

import domAddClass              from "common-micro-libs/src/domutils/domAddClass"

import Popup                    from "common-micro-libs/src/widgets/Popup/Popup";
import Menu                     from "common-micro-libs/src/widgets/Menu/Menu";

import getSiteListCollection    from "../../spapi/getSiteListCollection";

import SPListPickerTemplate     from "./ListPicker.html";
import "./ListPicker.less";


//-----------------------------------------------------------

var PRIVATE = dataStore.create();

const CSS_CLASS_BASE    = "spwidgets-listPicker";
const CSS_CLASS_CLEAR   = `${CSS_CLASS_BASE}-clear`;
const CSS_CLASS_TITLE   = `${CSS_CLASS_BASE}-title`;

/**
 * Display a picker to select a list from the site
 *
 * @class SPListPicker
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} options
 *
 * @triggers SPListPicker#item-selected
 * @triggers SPListPicker#selection-cleared
 */
var SPListPicker = {
    init: function (options){
        var inst = {
            opt:        objectExtend({}, SPListPicker.defaults, options),
            ready:      null,
            lists:      null,
            selected:   null
        };
        var popup   = inst.popup    = Popup.create();
        var menu    = inst.menu     = Menu.create();

        PRIVATE.set(this, inst);

        var $ui = this.$ui = parseHTML(
            fillTemplate(this.getTemplate(), inst.opt)
        ).firstChild;
        var uiFind = $ui.querySelector.bind($ui);

        inst.$title = uiFind(`.${CSS_CLASS_TITLE}`);

        popup.getEle().style.maxHeight = '20em';
        popup.setContent(menu);
        popup.attachTo($ui);
        domAddClass(popup.getEle(), "ms-font-m");

        $ui.addEventListener("click", function(){
            popup.toggle();
        });

        uiFind(`.${CSS_CLASS_CLEAR}`).addEventListener("click", (ev) => {
            var current = inst.selected;

            ev.stopPropagation();
            this.clearSelected();

            /**
             * Selection was cleared from widget by user.
             *
             * @event ListPicker#selection-cleared
             *
             * @type {Object}
             */
            this.emit('selection-cleared', current);
        });

        this.onDestroy(function(){
            menu.destroy();
            menu = inst.menu = undefined;

            popup.destroy();
            popup = inst.popup = undefined;
        });

        inst.ready = populateMenu.call(this)
            .then(function(){
                return this; // return current widget to any outside caller
            }.bind(this))["catch"](function(err){
                console.log(err);//jshint ignore:line
            });
    },

    /**
     * Returns the widget's template
     * @returns {String}
     */
    getTemplate: function(){
        return SPListPickerTemplate;
    },

    /**
     * Returns a promise that resolves once the Widget is ready
     * for interaction (after getting Lists from SP)
     *
     * @return {Promise}
     */
    onReady: function(){
        return PRIVATE.get(this).ready;
    },

    /**
     * returns list information given a list name. Information is the object
     * returned from `getSiteListCollection` API response.
     *
     * @param {String} listName
     *  The list name or internal UUID
     *
     * @return
     */
    getListInfo: function(listName){
        var list;
        PRIVATE.get(this).lists.some(function(listObj){
            if (listObj.InternalName === listName || listObj.Title === listName) {
                list = listObj;
                return true;
            }
        });
        return list;
    },

    /**
     * Selects a specific list
     *
     * @param {String} listName
     */
    setSelected: function(listName){
        var listInfo = this.getListInfo(listName);
        if (listInfo) {
            setListSelected.call(this, listInfo);
        }
    },

    /**
     * Returns the selected list (an object as returned by `getSiteListCollection`.
     *
     * @returns {Object}
     */
    getSelected: function(){
        return PRIVATE.get(this).selected;
    },

    /**
     * Clears the current selection
     */
    clearSelected: function(){
        setListSelected.call(this);
    }
};

function setListSelected(listObj) {
    var inst    = PRIVATE.get(this);
    var $title  = inst.$title;

    inst.selected = null;

    if (listObj) {
        inst.selected       = listObj;
        $title.textContent  = listObj.Title;

    } else {
        $title.textContent = inst.opt.title;
    }
}

/**
 * fetches the list from Sharepoint and populates the menu
 * @private
 *
 * @return {Promise}
 */
var populateMenu = function(){
    var inst    = PRIVATE.get(this);
    var {webURL, showLists, showLibraries} = inst.opt;

    return getSiteListCollection({webURL: webURL}).then((lists) => {
        lists.sort(function(a, b){
            var aTitle = a.Title.toUpperCase();
            var bTitle = b.Title.toUpperCase();

            if (aTitle < bTitle) {
                return -1;
            }
            if (aTitle > bTitle) {
                return 1;
            }
            return 0;
        });

        if (!showLibraries || !showLists) {
            inst.lists = lists.filter(function(list){
                var isDocumentLibrary = list.BaseType === "DocumentLibrary";

                if (isDocumentLibrary && !showLibraries) {
                    return false;
                }

                if (!isDocumentLibrary && !showLists) {
                    return false;
                }

                return true;
            });

        } else {
            inst.lists = lists;
        }

        inst.menu.setItems(
            inst.lists.map((list) => {
                list.title = list.Title;
                list.onClick = () => {
                    inst.popup.hide();
                    setListSelected.call(this, list);

                    /**
                     * Item was selected by the user.
                     *
                     * @event SPListPicker#item-selected
                     *
                     * @type {Object}
                     */
                    this.emit("item-selected", list);
                };

                return list;
            })
        );

        return lists;
    });
};

SPListPicker = EventEmitter.extend(Widget, SPListPicker);

SPListPicker.defaults = {
    webURL:         '',
    showLists:      true,
    showLibraries:  true,
    title:          "Select..."
};

export default SPListPicker;
