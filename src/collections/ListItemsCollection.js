define([
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/Collection",
    "vendor/jsutils/dataStore"
], function(
    objectExtend,
    Collection,
    dataStore
){

    var
    PRIVATE = dataStore.create(),
    findEle = document.querySelector,

    /**
     * A collection (array) of list items (`ListItemModel`).
     *
     * @class ListItemsCollection
     * @extends Collection
     *
     * @param {Array} itemsList
     *
     * @param {Object} options
     * @param {ApiFetchResponse} options.apiResponse
     *  The response from the API.
     *
     * @param {ApiFetchResponse} options.queryOptions
     *  The options that was given to the original list query method.
     */
    ListItemsCollection = Collection.extend({
        init: function(itemsList, options){
            Collection.prototype.init.call(this, itemsList);

            var opt = objectExtend({}, {
                apiResponse:    null,
                queryOptions:   null
            }, options);

            PRIVATE.set(this, opt);
        },

        /**
         * Returns the API response content (ex. `XMLDocument` or `JSON` object)
         *
         * @returns {Document|Object}
         */
        getApiResponseContent: function(){
            return PRIVATE.get(this).apiResponse.content;
        },

        /**
         * Returns the token to be used in retrieving the next page of data.
         *
         * @return {String}
         */
        getNextPageToken: function(){
            // Sample XML:
            // <rs:data ItemCount="5" ListItemCollectionPositionNext="Paged=TRUE&amp;p_DueDate=&amp;p_ID=10">

            var changesEle = findEle.call(this.getApiResponseContent(), "data"),
                response = "";

            if (changesEle){
                response = changesEle.getAttribute("ListItemCollectionPositionNext") || "";
            }

            return response;
        },

        /**
         * Returns the Change Token to be used with `GetListItemChangesSinceToken`
         * operation.
         *
         * @return {String}
         */
        getChangeToken: function(){
            // Sample XML:
            //    <Changes LastChangeToken="1;3;7ee477d9-d257-47f5-a25d-a882d882e51f;636000407939270000;97706562">

            var changesEle = findEle.call(this.getApiResponseContent(), "Changes"),
                response = "";

            if (changesEle){
                response = changesEle.getAttribute("LastChangeToken") || "";
            }

            return response;
        }
    });

    return Collection.extend(ListItemsCollection);
});