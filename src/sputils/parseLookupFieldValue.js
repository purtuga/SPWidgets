define([], function(){

    /**
     * Parses a Sharepoint lookup values as returned by webservices
     * (id;#title;#id;#Title) into an array of objects.
     *
     * @param {String} v
     *          Lookup items string as returned by SP webservices.
     *
     * @return {Array}
     *          Array of objects. Each object has two keys; title and id
     *
     * @example
     *
     * parseLookupFieldValue("1;#item one title;#2;#item two title");
     * // Returns:
     * [
     *      {
     *          id: "1",
     *          title: "item one title"
     *      },
     *      {
     *          id: "2",
     *          title: "item two title"
     *      }
     * ]
     */
    var parseLookupFieldValue = function(v) {

        var r       = [],
            a       = String(v).split(';#'),
            total   = a.length,
            i, n, t;

        if (v === undefined) {

            return r;

        }

        for (i=0; i<total; i++){

            n = a[i];
            i++;
            t = a[i];

            if (n || t) {

                r.push({ id: n, title: t });

            }

        }

        return r;

    }; //end: parseLookupFieldValue

    return parseLookupFieldValue;

});
