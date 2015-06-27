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
     * @param {Object} [options]
     * @param {Object} [options.itemData]
     * @param {Object|String} [options.list]
     * @param {String} [options.webURL]
     *
     */
    return Compose.extend(/** @lends ListItem.prototype */{

        init: function(options){

            var opt = objectExtend({}, {
                itemData:   null,
                list:       null,
                webURL:     null
            }, options);

            if (opt.itemData) {
                objectExtend(this, opt.itemData);
            }

            data.set(this, opt);

        }

    });

});