import Compose      from "common-micro-libs/src/jsutils/Compose"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import dataStore    from "common-micro-libs/src/jsutils/dataStore"
import parseHTML    from "common-micro-libs/src/jsutils/parseHTML"
import domFind      from "common-micro-libs/src/domutils/domFind"


var PRIVATE = dataStore.stash;

/**
 * Model for SharePoint List Items (rows). Object returned will include all of
 * the properties that were given on input (row). In addition, if `options`
 * are provided on input and those have a `CAMLViewFields`, then the model
 * will have one attribute for each - even if those were not included in the
 * `itemData` (SharePoint does not return empty attributes)
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

        // If options has CAMLViewFields, then ensure the model has
        // those fields defined as attributes
        if (opt && opt.CAMLViewFields) {
            domFind(parseHTML(opt.CAMLViewFields), "FieldRef").forEach(fieldEle => {
                let fieldName = fieldEle.getAttribute("Name");
                if (fieldName && !this.hasOwnProperty(fieldName)) {
                    this[fieldName] = "";
                }
            });                                                                              }

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