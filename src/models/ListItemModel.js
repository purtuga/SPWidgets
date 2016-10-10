import Compose      from "../jsutils/Compose"
import objectExtend from "../jsutils/objectExtend"
import dataStore    from "../jsutils/dataStore"


var PRIVATE = dataStore.stash;

/**
 * Model for SharePoint List Items (rows). Object return will include all of
 * the properties that were given on input.
 *
 * @class ListItemModel
 * @extends Compose
 *
 * @param {Object} itemData
 *      An object with the properties for the model
 * @param {Object} [options]
 *  An object with the options used to get the row from SP
 *
 */
const ListItemModel = Compose.extend(/** @lends ListItemModel.prototype */{
    init: function(itemData, options){
        var opt = objectExtend({}, {
            listName:   "",
            webURL:     ""
        }, options);

        if (itemData) {
            objectExtend(this, itemData);
        }

        PRIVATE.set(this, opt);

        this.onDestroy(function(){
            PRIVATE["delete"](this);
        }.bind(this));
    },

    /**
     * Returns an object with the `listName` and `webURL`
     * attributes needed to retrieve list information. Data
     * will only be available if provided on input when model
     * was initialized.
     *
     * @returns {Object}
     */
    getListInfo: function(){
        return PRIVATE.get(this);
    }
});

export default ListItemModel