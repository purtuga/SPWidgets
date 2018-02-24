import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import Collection   from "observable-data/src/ObservableArray"
import dataStore    from "common-micro-libs/src/jsutils/dataStore"
import domChildren  from "common-micro-libs/src/domutils/domChildren"


// FIXME: add method for getting rows removed from tracked data set (use of GetListItemChangesSinceToken)

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
    },

    /**
     * Returns a array of list item `ID`'s that were removed/deleted from the
     * query results. Applies to when `GetListItemChangesSinceToken` was used
     * as the `operation`
     *
     * @return {Array<Object>}
     *  An Array of Objects where each object contains the following attributes:
     *
     *  -   `ChangeType`
     *  -   `UniqueId`
     *  -   `ID`
     *
     *  @example
     *
     *  // Response structure example:
     *
     *  [
     *      {
     *          ChangeType: "Delete",
     *          UniqueId:   "{UUID here}",
     *          ID:         "7"
     *      }
     *  ]
     */
    getChanges: function(){
        // Sample XML from SOAP request
        //  <Changes LastChangeToken="1;3;c21149be-b52a-4c80-8b73-e76bf814c676;636109593982230000;104332865">
        //    <Id ChangeType="Delete" UniqueId="{1B986CEB-FF11-4390-9459-601D5C4820E0}">7</Id>
        //  </Changes>
        var changesEle = findEle.call(this.getApiResponseContent(), "Changes"),
            response = [];

        if (changesEle && changesEle.hasChildNodes()){
            let childElements = domChildren(changesEle, "Id");
            childElements
                .filter(childNode => childNode.nodeType === 1)
                .forEach((childNode) => {
                    response.push({
                        ChangeType: childNode.getAttribute("ChangeType")    || "",
                        UniqueId:   childNode.getAttribute("UniqueId")      || "",
                        ID:         String(childNode.textContent).trim()
                    })
                });
        }
        return response;
    }
});

export default Collection.extend(ListItemsCollection);
