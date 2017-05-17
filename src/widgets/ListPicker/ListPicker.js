import ItemPicker   from "../ItemPicker/ItemPicker"
import dataStore    from "common-micro-libs/src/jsutils/dataStore"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import sortBy       from "common-micro-libs/src/jsutils/sortBy"

import getSiteListCollection    from "../../spapi/getSiteListCollection";


//-----------------------------------------------------------

const PRIVATE           = dataStore.create();
const PickerPrototype   = ItemPicker.prototype;

/**
 * Display a picker to select a list from the site
 *
 * @class ListPicker
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} options
 *
 * @triggers ListPicker#item-selected
 * @triggers ListPicker#selection-cleared
 */
var ListPicker = {
    init: function (options){
        var inst = {
            opt:        objectExtend({}, this.getFactory().defaults, options),
            ready:      null,
            lists:      null,
            selected:   null
        };

        PRIVATE.set(this, inst);
        PickerPrototype.init.call(this, inst.opt);

        inst.ready = populateMenu.call(this)
            .then(() => {
                return this; // return current widget to any outside caller
            })["catch"](function(err){
                console.log(err);//jshint ignore:line
            });
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
     * Selects a list currently in the list of choices
     *
     * @param {String|Object} list
     * @returns {Promise}
     */
    setSelected: function (list){
        let onReady = this.onReady();

        if (onReady) {
            return onReady.then(() => {
                var listInfo = typeof list === "object" ? list : this.getListInfo(list) || {};
                return PickerPrototype.setSelected.call(this, listInfo.Title);
            });
        }
    }
};

/**
 * fetches the list from Sharepoint and populates the menu
 * @private
 *
 * @return {Promise}
 */
var populateMenu = function(){
    let inst = PRIVATE.get(this);
    let {
        webURL,
        showLists,
        showLibraries,
        filter: filterListResults  } = inst.opt;

    return getSiteListCollection({webURL: webURL}).then((lists) => {
        sortBy(lists, "Title");

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

        if (filterListResults) {
            inst.lists = inst.lists.filter(filterListResults);
        }

        this.setChoices(
            inst.lists.map((list) => {
                list.title = list.Title;
                return list;
            })
        );

        return lists;
    });
};

ListPicker = ItemPicker.extend(ListPicker);

ListPicker.defaults = {
    webURL:         '',
    showLists:      true,
    showLibraries:  true,
    filter:         null,
    labels:         {
        title: "Select..."
    }
};

export default ListPicker;
