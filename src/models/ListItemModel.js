define([
    "../jsutils/Compose",
    "../jsutils/objectExtend",
    "../jsutils/dataStore"
], function(
    Compose,
    objectExtend,
    dataStore
){

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
     * @param {Object|String} [options.list]
     * @param {String} [options.webURL]
     *
     */
    return Compose.extend(/** @lends ListItemModel.prototype */{
        init: function(itemData, options){
            var opt = objectExtend({}, {
                list:       "",
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

});