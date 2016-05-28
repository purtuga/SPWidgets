define([
    "jquery",
    "../jsutils/Compose",
    "../jsutils/objectExtend",
    "../jsutils/dataStore",
    "../sputils/getNodesFromXml",
    "../spapi/getListItems",

    "vendor/jsutils/es6-promise"
], function(
    $,
    Compose,
    objectExtend,
    dataStore,
    getNodesFromXml,
    getListItems,

    Promise
){

    var
    instData = dataStore.stash,

    /**
     * list Column Model.
     *
     * @constructor ListColumnModel
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
    ListColumnModel = /** @lends ListColumn.prototype */{

        init: function(columnData, options){

            var opt = objectExtend({}, ListColumnModel.defaults, options);
            if (columnData) {
                objectExtend(this, columnData);
            }
            instData.set(this, opt);

        },

        /**
         * Returns the values for the column. Useful for column of type Choice or Lookup.
         *
         * @return {Promise<Array<Object|String>, Error>}
         */
        getColumnValues: function() {
            var me          = this,
                $colXml     = $(instData.get(me).source),
                colType     = me.Type,
                colValues   = [];

            return new Promise(function(resolve, reject){
                switch (colType) {
                    case "Choice":
                    case "MultiChoice":
                        $colXml.find("CHOICE").each(function(){
                            colValues.push($(this).text() || "");
                        });

                        resolve(colValues);
                        break;

                    case "Lookup":
                    case "LookupMulti":
                        getListItems({
                            listName:   me.List,
                            // FIXME: missing webURL here.
                            CAMLQuery:  '<Query><OrderBy><FieldRef Name="' +
                                me.ShowField + '"/></OrderBy></Query>',
                            CAMLViewFields: '<ViewFields><FieldRef Name="' +
                                me.ShowField + '"/></ViewFields>'
                        }).then(
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
        }, //end getColumnvalues()

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
    return ListColumnModel;
});