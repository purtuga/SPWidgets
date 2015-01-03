define([], function(){

    /**
     * Parses a date string in ISO 8601 format into a Date object.
     * Date format supported on input:
     *  2013-09-01T01:00:00
     *  2013-09-01T01:00:00Z
     *  2013-09-01T01:00:00Z+05:00
     *
     * @param {String} dateString
     *      The date string to be parsed.
     *
     * @return {Date|Null}
     *      If unable to parse string, a Null value will be returned.
     *
     * @see {https://github.com/csnover/js-iso8601}
     *      Method was developed using some of the code from js-iso8601
     *      project on github by csnover.
     *
     */
    var parseDateString = function parseDateString(dateString) {

        var dtObj       = null,
            re, dtPieces, i, j, numericKeys, minOffset;

        if (!dateString) {

            return dtObj;

        }

        // let's see if Date.parse() can do it?
        // We append 'T00:00' to the date string case it is
        // only in format YYYY-MM-DD
        dtObj = Date.parse(
                    (       dateString.length === 10
                        ?   dateString + "T00:00"
                        :   dateString
                    )
                );

        if (dtObj) {

            return new Date(dtObj);

        }

        // Once we parse the date string, these locations
        // in the array must be Numbers.
        numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ];

        // Define regEx
        re = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;

        // dtPieces:
        //    [0]
        //    [1]   YYYY
        //    [2]   MM
        //    [3]   DD
        //    [4]   HH
        //    [5]   mm
        //    [6]   ss
        //    [7]   msec
        //    [8]   Z
        //    [9]   +|-
        //    [10]  Z HH
        //    [11]  Z mm
        dtPieces    = dateString.match(re);


        if( !dtPieces ){

            return dtObj;

        }

        for(i=0,j=numericKeys.length; i<j; i++){

            dtPieces[numericKeys[i]] = ~~dtPieces[numericKeys[i]];

        }

        // Month is "zero" based
        --dtPieces[2];

        // Date specifed UTC Format?
        if (dtPieces[8] === 'Z') {

            // do we need to calculate offset to minutes?
            if (dtPieces[9] !== undefined) {

                minOffset = dtPieces[10] * 60 + dtPieces[11];

                if (dtPieces[9] === '+') {

                    minOffset = (- minOffset);

                }

                dtPieces[5] += minOffset;

            }

            dtObj = new Date(
                    Date.UTC(
                        dtPieces[1],
                        dtPieces[2],
                        dtPieces[3],
                        dtPieces[4],
                        dtPieces[5],
                        dtPieces[6],
                        dtPieces[7]
                    )
                );

        // Else: Date was did not seem to be UTC. Do local.
        } else {

            dtObj = new Date(
                    dtPieces[1],
                    dtPieces[2],
                    dtPieces[3],
                    dtPieces[4],
                    dtPieces[5],
                    dtPieces[6],
                    dtPieces[7]
                );

        }

        return dtObj;

    }; //end: parseDateString()

    return parseDateString;
});
