import Compose         from "common-micro-libs/src/jsutils/Compose"
import objectExtend    from "common-micro-libs/src/jsutils/objectExtend"
import dataStore       from "common-micro-libs/src/jsutils/dataStore"
import getNodesFromXml from "../sputils/getNodesFromXml"
import getListItems    from "../spapi/getListItems"
import Promise         from "common-micro-libs/src/jsutils/es6-promise"


var
instData = dataStore.stash,

/**
 * list Column Model.
 *
 * @class ListColumnModel
 * @extends Compose
 *
 * @param {Object} columnData
 *      A javascript Object with the column
 * @param {Object} [options]
 * @param {ListModel|String} [options.list=null]
 *      A reference to the [ListModel]{ListModel} of the column
 * @param {String} [options.type="xml"]
 *      A static string of either `xml` or `json`
 *      (json not yet supported, 2015-07-03)
 * @param {Object} [options.source=null]
 *      The source originally used to create the model. (ex. the XML node or the
 *     JSON response object)
 *
 */
ListColumnModel = /** @lends ListColumnModel.prototype */{

    init: function(columnData, options){
        if (instData.has(this)) {
            return;
        }

        var opt = objectExtend({}, this.getFactory().defaults, options);
        objectExtend(this, {
            ID:             "",
            Type:           "",
            Name:           "",
            DisplayName:    "",
            Sortable:       "",
            StaticName:     "",
            Required:       false,
            ReadOnly:       false,
            webURL:         "",         // SPWidgets inserted value if available
            listID:         "",         // SPWigets inserted value if available
            listName:       ""          // SPWigets inserted value if available
        }, columnData);

        if (opt.list) {
            if (opt.list.getWebUrl) {
                this.webURL = opt.list.getWebUrl();
            }

            if (opt.list.ID) {
                this.listID = opt.list.ID;
            }

            if (opt.list.Title) {
                this.listName = opt.list.Name;
            }
        }

        instData.set(this, opt);
        this.onDestroy(() => instData['delete'](this));
    },

    /**
     * Returns the values for the column. Useful for column of type Choice or Lookup.
     *
     * @param {Object} [lookupOptions]
     *  Used only when column is of type `Lookup` or `LookupMulti`.
     *  An object with options that will be used with [getListItems]{getListItems}
     *  to retrieve the list of column values.
     *
     * @return {Promise<Array<Object|String>, Error>}
     */
    getColumnValues: function(lookupOptions) {
        var me          = this,
            $colXml     = instData.get(me).source,
            colType     = me.Type,
            colValues   = [];

        return new Promise(function(resolve, reject){
            switch (colType) {
                case "Choice":
                case "MultiChoice":
                    Array.prototype.slice.call($colXml.querySelectorAll("CHOICE"), 0).forEach(function(choiceEle){
                        colValues.push(choiceEle.textContent || "");
                    });

                    resolve(colValues);
                    break;

                case "Lookup":
                case "LookupMulti":
                    getListItems(objectExtend(
                        {
                            CAMLQuery:  '<Query><OrderBy><FieldRef Name="' +
                                me.ShowField + '"/></OrderBy></Query>',
                            CAMLViewFields: '<ViewFields><FieldRef Name="' +
                                me.ShowField + '"/></ViewFields>'
                        },
                        lookupOptions,
                        {
                            listName:   me.List
                            // FIXME: missing webURL here.
                        }
                    )).then(
                        function(rows){
                            resolve(rows);
                        },
                        function(err){
                            reject(err);
                        }
                    );
                    break;

                default:
                    resolve(colValues);
            }
        });
    },

    /**
     * returns the ListModel if one was given on input when listColumnModel instance
     * was created.
     *
     * @return {ListModel}
     */
    getList: function(){
        return instData.get(this).list;
    }
};

ListColumnModel = Compose.extend(ListColumnModel);

ListColumnModel.defaults = {
    list:   null,
    type:   "xml",
    source: null
};

export default ListColumnModel;
