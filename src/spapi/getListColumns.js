define([
    'jquery',
    './getList',
    '../sputils/cache',
    '../sputils/getNodesFromXml',
    '../models/ListColumnModel',
    '../jsutils/dataStore'
], function(
    $,
    getList,
    cache,
    getNodesFromXml,
    ListColumnModel,
    dataStore
){

    var
    instData = dataStore.stash,

    /**
     * Gets the list of columns names for the given list that are
     * visible on edit/new/disp forms. This method attempts to NOT return any
     * column that is internal.
     *
     * @param {Object|String} options
     *      An object with the options below, or a string with the listName.
     *
     * @param {String} options.listName
     *      The list name.
     *
     * @param {String} [options.columnName]
     *      Internal or External name of column. When set, only that one column will
     *      be returned.
     *
     * @param {String} [options.webURL]
     *
     * @param {Boolean} [options.cacheXML=true]
     *      If true (default), request will be cached.
     *
     * @param {Boolean} [options.async=true]
     *      If true (default) request will be async.
     *
     * @param {Object} [options.ListItemModel=ListColumnModel]
     *      The List Column Model factory to be used. Factory must expose a `create` method
     *      that accepts two input parameters: column definition (object) and options.
     *      See [ListColumnModel]{@link ListColumnModel} for more details.
     *
     * @return {jQuery.Promise}
     *      Deferred is resolved with an ListColumnCollection {@link ListColumnCollection}
     *      containing [ListColumnModels]{@link ListColumnModels}
     *
     * @example
     *
     * // Example of column definition object:
     *
     * {
     *      ColName: "nvarchar1",
     *      DisplayName: "Task Name",
     *      Name: "Title",
     *      StaticName: "Title",
     *      Type: "Text",
     *      FromBaseType: "TRUE",
     *      ID: "{fa564e0f-0c70-4ab9-b863-0177e6ddd247}",
     *      Required: "TRUE",
     *      Sealed: "TRUE",
     *      SourceID: "http://schemas.microsoft.com/sharepoint/v3",
     *      getColumnValues: function () {}
     * }
     */
    getListColumns = function(options){

        var opt = $.extend({},
            getListColumns.defaults,
            (typeof options === "string" ? {listName: options} : options)
        );

        return $.Deferred(function(dfd){

            getList({
                listName:   opt.listName,
                cacheXML:   opt.cacheXML,
                webURL:     opt.webURL,
                async:      opt.async
            })
            .then(function(list){

                opt.listDef = list;

                var
                columns = getNodesFromXml({
                    xDoc:               list.getSource(),
                    nodeName:           "Field",
                    nodeModel:          opt.ListColumnModel,
                    nodeModelOptions:   {
                        list: list
                    }
                    // FIXME: need to set the convertTypes to true
                }),
                cols = [],
                i,j;

                for( i=0,j=columns.length; i<j; i++){

                    // Include only (all must match):
                    //      -   Hidden attribute not set to is not true (no internal SP fields)
                    //      -   Has to have a Display attribute
                    //      -   No AuthoringInfo attribute (these are used on the edit buttons)
                    if (
                            (
                                columns[i].Hidden === undefined ||
                                columns[i].Hidden === "FALSE"
                            ) &&
                            (
                                columns[i].List === undefined ||
                                (
                                    columns[i].List !== "Docs" &&
                                    columns[i].List !== "AppPrincipals"
                                )
                            ) &&
                            columns[i].DisplayName &&
                            columns[i].AuthoringInfo === undefined &&
                            (
                                !opt.columnName                             ||
                                columns[i].Name         === opt.columnName  ||
                                columns[i].StaticName   === opt.columnName  ||
                                columns[i].DisplayName  === opt.columnName
                            )
                        //&&  String(columns[i].ColName).indexOf("tp_") !== 0 // this removes ID, CreatedBy,Modified,ModifiedBy,ContentType, etc...
                    ) {

                        // FIXME: remove this once all is converted to models
                        // If XML property is present, remove it
                        if (columns[i].___xmlNode) {
                            delete columns[i].___xmlNode;
                        }

                        cols.push(columns[i]);

                        // If there was a column name defined on input, then
                        // break the loop... this was it.
            // FIXME: remove this option from this method
                        if (opt.columnName) {
                            i += j;
                        }

                    // ELSE: column must be internal... destroy model
                    } else if (opt.ListModel) {
                        columns[i].destroy();
                    }

                } //end: for()

                // Mixin additional methods into the array object and
                // Store this getListItems opt in stash and associated with the result
                $.extend(cols, listColumnCollectionMixin);
                instData.set(cols, opt);

                dfd.resolveWith($, [cols]);
                return;

            })["catch"](function(){
                dfd.rejectWith($, Array.prototype.slice.call(arguments, 0));
            });

        })
        .promise();

    }, //end: getlistColumns


   /**
    * An Array of List Columns. Each object in the array is a
    * [ListColumn]{@link ListColumnModel} model.
    * This collection extends the Array instance created and provides additional
    * methods for interacting with the collection.
    *
    * @typedef ListColumnCollection
    * @property {Function} getColumn
    *       Returns a column by searching the array by its name (internal or external)
    */
   listColumnCollectionMixin = {

        /**
         * Returns an object with the definition for the given column
         * @param {String} name
         * @return {ListColumnModel}
         */
        getColumn: function(name){
            var
            list = this,
            col;
            list.some(function(thisCol){
                if (thisCol.Name === name || thisCol.DisplayName === name || thisCol.StaticName === name){
                    col = thisCol;
                }
            });
            return col;
        },

        /**
         * returns the ListModel for the list for which the collection was requested.
         *
         * @return {ListModel}
         */
        getList: function(){
            if (instData.has(this)) {
                return instData.get(this).listDef;
            }
        }

   }; //end: resultArrayMixins

    /**
     * Default input params
     * @static
     * @name getListColumns.defaults
     * @type {Object}
     */
    getListColumns.defaults = {
        listName:           '',
        columnName:         '',
        cacheXML:           true,
        async:              true,
        webURL:             null,
        ListColumnModel:    ListColumnModel
    };

    return getListColumns;

});
