define([
    "vendor/jsutils/objectExtend"
], function(
    objectExtend
){

    /**
     * Given an array of CAML matches, this method will wrap them all in a
     * Logical condition (<And></And> or a <Or></Or>).
     *
     * @function getCamlLogical
     *
     * @param {Object}  options
     *              Options for the call. See below.
     * @param {String}  options.type
     *              Static String. The type of logical condition that
     *              the 'values' should be wrapped in. Possible values
     *              are 'AND' or 'OR'.  Default is 'AND'.
     * @param {Array} options.values
     *              The array of String elements that will be
     *              join into caml Logical condition.
     * @param {Function} [options.onEachValue=null]
     *              A function to process each items in the 'values'
     *              array. Function must return the value that should
     *              be used instead of the one found in the array. Use
     *              it to define the xml around each value
     *              (ex. <Eq><FieldRef>...</Eq>).
     *              Function is given 1 input param - the item currently
     *              being processed (from the 'values' input param).
     *
     * @return {String} logical Query as a single string.
     *
     * @example Create a OR statement from an array of conditions
     *
     *   getCamlLogical({
     *        type: "or",
     *        values: [
     *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test</Value></Eq>",
     *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test1</Value></Eq>",
     *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test2</Value></Eq>",
     *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test3</Value></Eq>",
     *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test4</Value></Eq>"
     *        ]
     *      })
     *
     *
     * @example Concatenate multiple calls to getCamlLogical():
     *
     *     getCamlLogical({
     *        type: "or",
     *        values: [
     *           "<Eq><FieldRef Name='ID' /><Value Type='Text'>10</Value></Eq>",
     *           "<Eq><FieldRef Name='ID' /><Value Type='Text'>15</Value></Eq>",
     *           getCamlLogical({
     *              type: "and",
     *              values: [
     *                 "west",
     *                 "east"
     *              ],
     *              onEachValue: function(loc){
     *                 return "<Neq><FieldRef Name='Region'/><Value Type='Text'>" +
     *                         loc + "</Value></Neq>";
     *              }
     *          })
     *        ]
     *      })
     *
     */
    var getCamlLogical = function getCamlLogical(options){

        var o = objectExtend(
                    {},
                    {   type:           "AND",
                        values:         [],
                        onEachValue:    null
                    },
                    options),
            tagOpen     = "<And>",
            tagClose    = "</And>",
            logical     = "",
            total       = 0,
            last        = 0,
            haveFn      = false,
            newLogical  = "",
            totalBuilt  = 0,
            i;

        o.type = String(o.type).toUpperCase();

        if (!Array.isArray(o.values)) {

            o.values = [o.values];

        }

        if (o.type !== "AND") {

            tagOpen     = "<Or>";
            tagClose    = "</Or>";

        }

        // logical = tagOpen;
        total   = o.values.length;
        last    = (total - 1);
        haveFn  = typeof o.onEachValue === "function";

        // Loop through all query logical strings and build
        // the overall filter logical
        for ( i=0; i<total; i++){

            newLogical = '';

            if (haveFn) {

                newLogical += String(o.onEachValue(o.values[i])).toString();

            } else {

                newLogical += String(o.values[i]).toString();

            }

            if (newLogical) {

                logical += newLogical;
                totalBuilt++;

                // If the total number of items is >2, then build the rest
                // of the logicals by calling this method again with the
                // remainder of the filters as input.
                if ((last - i) > 1){

                    newLogical = getCamlLogical(
                                objectExtend({}, o, {
                                    values: o.values.slice((i + 1), (total - i))
                                })
                            );

                    // If building the remainder of the filter returned
                    // something, then add it to the list and incrment the
                    // number of logicals built.
                    if (newLogical) {

                        totalBuilt++;
                        logical += newLogical;

                    }

                    // Break out of this loop, even if there are other
                    // items... The call above will take care of the others
                    break;
                }

            }

        }

        if (totalBuilt > 1){

            logical = tagOpen + logical + tagClose;
        }

        return logical;

    };// getCamlLogical()

    return getCamlLogical;

});
