import Compose from "vendor/jsutils/Compose";
import objectExtend from "vendor/jsutils/objectExtend";
import dataStore from "vendor/jsutils/dataStore";
import toUrlParams from "vendor/jsutils/toUrlParams";
import fillTemplate from "vendor/jsutils/fillTemplate";
import getCamlLogical from "../../sputils/getCamlLogical";
import xmlEscape from "../../sputils/xmlEscape";

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
                this.column = inst.opt.column.Name;
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
            var
            me              = this,
            columnSetup     = PRIVATE.get(this).opt.column,
            compareOperator = me.compareOperator || 'Eq',
            colName         = xmlEscape.escape(me.column),
            filterValues    = me.values,
            template        = "<FieldRef Name='{{colName}}'/><Value Type='Text'>{{colValue}}</Value>";

            // If we have a column Setup object, then adjust the template for
            // the given type of column
            if (columnSetup) {
                switch (columnSetup.Type) {
                    // Lookup type of fields. We use only the ID to query along
                    // with LookupId=True in the CAMl definition
                    case "User":
                    case "UserMulti":
                    case "Lookup":
                    case "LookupMulti":
                        template        = "<FieldRef Name='{{colName}}' LookupId='True'/><Value Type='Lookup'>{{colValue}}</Value>";
                        filterValues    = filterValues.map(function(filter){
                            if (filter && filter.ID) {
                                return filter.ID;
                            }
                            return filter;
                        });

                        break;
                }
            }

            template = "<{{cOP}}>" + template + "</{{cOP}}>";

            return getCamlLogical({
                type:           me.logicalOperator,
                values:         filterValues,
                onEachValue:    function(filterVal){
                    return fillTemplate(template, {
                        colName:    colName,
                        cOP:        compareOperator,
                        colValue:   xmlEscape.escape(filterVal)
                    });
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

    export default FilterModel;
