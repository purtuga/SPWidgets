define([
    "vendor/jsutils/Collection",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/toUrlParams",

    "../../sputils/getCamlLogical"
], function(
    Collection,
    objectExtend,
    toUrlParams,

    getCamlLogical
){

    /**
     * A collection (Array like object) with the list of
     * individual Filters (`FilterModel`).
     *
     * @class FiltersCollection
     * @extends Collection
     */
    var FiltersCollection = {
        /**
         * Returns a CAML strings of all the Filters contained
         * in the collection using an `And` logical operator.
         *
         * @returns {String}
         */
        toCAMLQuery: function(){
            return getCamlLogical({
                values: this
                    .filter(isFilterDefined)
                    .map(function(filter){
                        return filter.toCAMLQuery();
                    })
            });
        },

        /**
         * Returns a URL parameters string with all the filters. All urls
         * params will be wrapped in an object with a single property.
         *
         * @param {Object} [options]
         *
         * @param {String} [options.propName='filter']
         *  The property name for the wrapper object. The stringified url
         *  param will be the value of this property.
         *
         * @param {Array<String>|Array<Object>|String} [options.filterProperties]
         *  By default, all properties of each filter will be stringified. Define this
         *  option to control/limit which properties should be included in the stringified.
         *  value.
         *  Alternatively, an object can be defined for each property which allows for control
         *  over the name of the key that will be used on the stringified value.
         *  Example: if
         *  wanting `column` attribute to be stringified as `c`, the property would be defined
         *  as: `{column: 'c'}`.
         *
         *      filterPanel.getFilters().toURLParams({
         *                  stringifyProperties: [
         *                      {column: "c"},
         *                      {values: 'v'},
         *                      {logicalOperator: 'lO'}
         *                  ]
         *              })
         *
         * @returns {String}
         */
        toURLParams: function(options){
            var opt = objectExtend({}, FiltersCollection.defaults.toUrlParamsOptions, options),
                filtersToStringify, onlySpecificProperties;

            if (!Array.isArray(opt.stringifyProperties)) {
                opt.stringifyProperties = opt.stringifyProperties ? [opt.stringifyProperties] : [];
            }

            // Normalize stringifyProperties to be Array<Object>
            opt.stringifyProperties = opt.stringifyProperties.map(function(prop){
                var isString    = typeof prop === "string",
                    retVal      = prop;

                if (isString) {
                    retVal          = {};
                    retVal[prop]    = prop;
                }
                return retVal;
            });

            onlySpecificProperties = !!opt.stringifyProperties.length;

            filtersToStringify = this.slice()
                .filter(isFilterDefined)
                .map(function(filter){
                    if (!onlySpecificProperties) {
                        return filter;
                    }

                    // Stringify only those properties of the filter that were defined on input,
                    // and use the "stringify name" for the property instead of the actual filter
                    // property name.
                    return Object.keys(filter).reduce(function(newFilterObj, filterProp){
                        var stringifyPropName;
                        opt.stringifyProperties.some(function(stringifyProp){
                            if (filterProp in stringifyProp) {
                                stringifyPropName = stringifyProp[filterProp] || filterProp;
                                return true;
                            }
                        });

                        if (stringifyPropName) {
                            newFilterObj[stringifyPropName] = filter[filterProp];
                        }

                        return newFilterObj;
                    }, {});
                });

            return toUrlParams(filtersToStringify, opt.propName);
        },

        /**
         * returns a string of CAML with the sort orders defined by
         * any of the Columns in the collection. Return value could
         * be an empty string. Note that this method will return only
         * the `FieldRef` definition by default. Use input parameter
         * to wrap that in a CAML `OrderBy` clause
         *
         * @param {Boolean} [wrapInOrderBy=false]
         *
         * @return {String}
         */
        toCAMLSortOrder: function(wrapInOrderBy){
            var caml = this
                .map(function(filter){
                    return filter.toCAMLSortOrder();
                })
                .filter(function(filter){
                    return !!filter;
                })
                .join("");

            if (caml && wrapInOrderBy) {
                caml = '<OrderBy>' + caml + '</OrderBy>';
            }

            return caml;
        }
    };

    /**
     * Used with `Array#filter` to check if an individual filter
     * is defined.
     *
     * @private
     *
     * @param {FilterModel} filter
     *
     * @return {Boolean}
     */
    function isFilterDefined(filter){
        return filter.values.length || filter.sortOrder;
    }

    FiltersCollection = Collection.extend(FiltersCollection);

    FiltersCollection.defaults = {
        toUrlParamsOptions: {
            propName:           'filter',
            stringifyProperties:   [
                "column",
                "values",
                "compareOperator",
                "logicalOperator",
                "sortOrder"
            ]
        }
    };

    return FiltersCollection;
});