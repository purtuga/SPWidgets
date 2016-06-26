define([
    "vendor/jsutils/Compose",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/toUrlParams",

    "../../sputils/getCamlLogical",
    "../../sputils/xmlEscape"
], function(
    Compose,
    objectExtend,
    dataStore,
    toUrlParams,

    getCamlLogical,
    xmlEscape
){

    var
    PRIVATE = dataStore.create(),

    /**
     * An individual filter defined by the user
     *
     * @class FilterModel
     * @extends Compose
     *
     * @param {Object} filerData
     * @param {Object} options
     * @param  {ListColumnModel} options.column
     */
    FilterModel = {

        /**
         * the column internal name
         *
         * @type {String}
         */
        column: null,

        /**
         * The raw input by the user
         *
         * @type {String}
         */
        input: null,

        /**
         * The type of comparison that should be used when querying SharePoint.
         * Possible values include `Eq`, `Neq`, `IsNull`, `IsNotNull`, `Contains`.
         *
         * @type {String}
         */
        compareOperator: null,

        /**
         * The type of logical operator (`And`, `Or`) that should be used for the
         * multiple keywords entered by the user.
         *
         * @type {String}
         */
        logicalOperator: null,

        /**
         * An array of parsed keywords entered by the user
         *
         * @type {Array<String>}
         */
        values: null,

        init: function(filterData, options){
            var inst = {
                opt: objectExtend({}, FilterModel.defaults, options)
            };
            PRIVATE.set(this, inst);

            objectExtend(
                this,
                {   // !!! ANY ATTRIBUTE ADDED HERE SHOULD
                    // ALSO BE ADDED TO THE JSDOCS ABOVE
                    column:             '',
                    input:              '',
                    values:             [],
                    compareOperator:    '',
                    logicalOperator:    '',
                    sortOrder:          '',

                    matchType:  ''  // backward compatibility
                },
                filterData
            );

            // For backwards compatibility
            // TODO: remove after refactor
            this.matchType  = this.compareOperator || this.matchType;
            this.count      = this.values.length;

            if (!this.column) {
                this.column = options.column.Name;
            }

            this.onDestroy(function (){
                PRIVATE["delete"](this);
            }.bind(this));
        },

        /**
         * Returns the FilterModel as a CAML Query string
         *
         * @return {String}
         */
        toCAMLQuery: function () {
            var me          = this,
                compareOperator = me.compareOperator,
                colName         = xmlEscape.escape(PRIVATE.get(this).opt.column.Name);

            return getCamlLogical({
                type:           me.logicalOperator,
                values:         me.values,
                onEachValue:    function(filterVal){
                    return "<" + compareOperator +"><FieldRef Name='" + colName +
                        "' /><Value Type='Text'>" + xmlEscape.escape(filterVal) +
                        "</Value></" + compareOperator + ">";

                }
            });
        },

        /**
         * Returns the `FieldRef` CAML definition for the sort order
         * of this Column, if one is defined. Return value could be empty.
         *
         * @returns {string}
         */
        toCAMLSortOrder: function(){
            var sortOrder = this.sortOrder;

            return sortOrder ?
                "<FieldRef Name='" +
                    this.column +
                    "' Ascending='" +
                    sortOrder === "Des" ?
                        "FALSE" :
                        "TRUE" +
                "'/>" :
                '';
        },

        /**
         * Returns the Filter as a URL parameters string
         *
         * @return {String}
         */
        toURLParams: function(){
            return toUrlParams(this);
        }
    };

    FilterModel = Compose.extend(FilterModel);

    FilterModel.defaults = {
        column: null
    };

    return FilterModel;
});