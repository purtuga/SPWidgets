

    /**
     * Returns a date string in the format expected by Sharepoint
     * Date/time fields. Usefull in doing filtering queries.
     *
     * Credit:  Matt (twitter @iOnline247)
     *          {@see http://spservices.codeplex.com/discussions/349356}
     *
     * @param {Date} [dateObj=Date()]
     * @param {String} [formatType='local']
     *              Possible formats: local, utc
     *
     * @return {String} a date string.
     *
     */
    var getDateString = function( dateObj, formatType ) {

        formatType  = String(formatType || "local").toLowerCase();
        dateObj     = dateObj || new Date();

        function pad( n ) {

            return n < 10 ? '0' + n : n;

        }

        var ret = '';

        if (formatType === 'utc') {

            ret = dateObj.getUTCFullYear() + '-' +
                    pad( dateObj.getUTCMonth() + 1 ) + '-' +
                    pad( dateObj.getUTCDate() ) + 'T' +
                    pad( dateObj.getUTCHours() ) + ':' +
                    pad( dateObj.getUTCMinutes() )+ ':' +
                    pad( dateObj.getUTCSeconds() )+ 'Z';

        } else {

            ret = dateObj.getFullYear() + '-' +
                    pad( dateObj.getMonth() + 1 ) + '-' +
                    pad( dateObj.getDate() ) + 'T' +
                    pad( dateObj.getHours() ) + ':' +
                    pad( dateObj.getMinutes() )+ ':' +
                    pad( dateObj.getSeconds() );

        }

        return ret;

    }; //end: SPGetDateString()

    export default getDateString;

