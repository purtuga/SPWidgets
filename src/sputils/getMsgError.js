define(['jquery'], function($){

    /**
     * Given a sharepoint webservices response, this method will
     * look to see if it contains an error and return that error
     * formated as a string.
     *
     * @param {XMLDocument|jQuery|String} xmlMsg
     * @return {String} errorMessage
     *
     */
    var getMsgError = function getMsgError(xmlMsg){

        var xMsg  = $(xmlMsg),
            error = "",
            spErr = xMsg.find("ErrorCode"),
            count = 0;

        if (!spErr.length) {
            spErr = xMsg.find("faultcode");
        }

        // See if any Elements with ErrorMssage attribute
        if (!spErr.length) {
            spErr = xMsg.find("CopyResult[ErrorMessage]");

            if (spErr.length) {
                spErr.each(function(){
                    var thisErr = $(this);
                    count += 1;
                    error += "(" + count + ") " +
                        (thisErr.attr("ErrorCode") || "unknown") +
                        ": " +
                        thisErr.attr("ErrorMessage") + "\n";
                });
                return count + " error(s) encountered! \n" + error;
            }
        }

        if (!spErr.length) {
            return "";
        }

        // Loop through and get all errors.
        spErr.each(function(){
            var thisErr = $(this);
            if ( thisErr.text() !== "0x00000000" ) {
                count += 1;
                error += "(" + count + ") " + thisErr.text() + ": " +
                    thisErr.parent().children().not(thisErr).text() + "\n";
            }
        });

        error = count + " error(s) encountered! \n" + error;
        return error;

    }; /* SPGetMsgError() */

    return getMsgError;

});
