define([
    "../jsutils/Compose",
    "../jsutils/objectExtend",
    "../jsutils/dataStore"
], function(
    Compose,
    objectExtend,
    dataStore
){

    var data = dataStore.stash;

    /**
     * Model for SharePoint List Items (rows). Object return will include all of
     * the properties that were given on input.
     *
     * @constructor ListItem
     * @extends Compose
     *
     * @param {Object} itemData
     *      An object with the properties for the model
     * @param {Object} [options]
     * @param {Object} [options.itemData]
     * @param {Object|String} [options.list]
     * @param {String} [options.webURL]
     *
     */
    return Compose.extend(/** @lends ListItem.prototype */{

        init: function(itemData, options){

            var opt = objectExtend({}, {
                list:       null,
                webURL:     null
            }, options);

            if (itemData) {
                objectExtend(this, itemData);
            }

            data.set(this, opt);

        }

    });

});