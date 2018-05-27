import Collection       from "observable-data/src/ObservableArray";
import objectExtend     from "common-micro-libs/src/jsutils/objectExtend";
import toUrlParams      from "common-micro-libs/src/jsutils/toUrlParams";
import getCamlLogical   from "../../sputils/getCamlLogical";

//------------------------------------------------

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
     * @param {Function} [onEach]
     *  If defined, callback will be executed on each filter. Callback is
     *  given an object with the `filter` model and the `filterString`, which
     *  is what is returned back. This can be manipulated by the callback.
     *
     * @returns {String}
     *
     */
    toCAMLQuery: function(onEach){
        return getCamlLogical({
            values: this
                .filter(isFilterDefined)
                .map(function(filter){
                    let filterInfo = {
                        filter,
                        filterString: filter.toCAMLQuery()
                    };

                    if (onEach) {
                        onEach(filterInfo);
                    }

                    return filterInfo.filterString;
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
        var opt = objectExtend({}, this.getFactory().defaults.toUrlParamsOptions, options),
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
    return filter.values.length ||
        filter.sortOrder        ||
        (
            filter.compareOperator &&
            /IsNull|IsNotNull/.test(filter.compareOperator)
        );
}

FiltersCollection = Collection.extend(FiltersCollection);

FiltersCollection.defaults = {
    toUrlParamsOptions: {
        propName:           'filter',
        stringifyProperties:   [
            "column",
            "type",
            "values",
            "compareOperator",
            "logicalOperator",
            "sortOrder"
        ]
    }
};

export default FiltersCollection;
