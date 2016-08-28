import objectExtend from "vendor/jsutils/objectExtend";
import getList from './getList';
import cache from '../sputils/cache';
import getNodesFromXml from '../sputils/getNodesFromXml';
import ListColumnModel from '../models/ListColumnModel';
import ListColumnsCollection from '../collections/ListColumnsCollection';

    var
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
     * @param {Boolean} [options.cache=true]
     *      If true (default), request will be cached. This is mainly a pass through to
     *      `getList()`.
     *
     * @param {Object} [options.ListItemModel=ListColumnModel]
     *      The List Column Model factory to be used. Factory must expose a `create` method
     *      that accepts two input parameters: column definition (object) and options.
     *      See [ListColumnModel]{@link ListColumnModel} for more details.
     *
     * @param {Object} [options.ListColumnsCollection=ListColumnsCollection]
     *
     * @return {Promise<ListColumnCollection, Error>}
     *  Promise is resolved with an ListColumnCollection {@link ListColumnCollection}
     *  containing [ListColumnModels]{@link ListColumnModel}
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

        var opt = objectExtend(
            {},
            getListColumns.defaults,
            (typeof options === "string" ? {listName: options} : options)
        );

        if (typeof opt.cacheXML !== "undefined") {
            opt.cache = opt.cacheXML;
        }

        return getList({
                listName:   opt.listName,
                cache:      opt.cache,
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
                    convertTypes:       true,
                    nodeModelOptions:   {
                        list: list
                    }
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

                    // ELSE: column must be a SharePoint internal one... destroy model
                    } else if (opt.ListModel) {
                        columns[i].destroy();
                    }
                }

                return opt.ListColumnsCollection.create(cols, {listDef: list});
            });
    };

    /**
     * Default input params
     * @static
     * @name getListColumns.defaults
     * @type {Object}
     */
    getListColumns.defaults = {
        listName:               '',
        columnName:             '',
        cache:                  true,
        webURL:                 null,
        ListColumnModel:        ListColumnModel,
        ListColumnsCollection:  ListColumnsCollection
    };

    export default getListColumns;

