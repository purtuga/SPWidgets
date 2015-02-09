define(["jquery"], function($){

    /**
     * Checks if an xml message has an error. Taken from
     * SPWidgets.
     *
     * @param {jQuery|XMLDocument} xmlMsg
     *
     * @return {Boolean}
     */
    var doesMsgHaveError = function(xmlMsg) {

        var $msg        = $(xmlMsg),
            spErrCode   = $msg.find("ErrorCode"),
            response    = false;

        if ( !spErrCode.length ) {

            if ( $msg.find("faultcode").length ) {

                return true;

            }

            return false;

        }

        spErrCode.each(function(){
			            
            if ( $(this).text() !== "0x00000000" && $(this).text() !== "NoError" ) {

                response = true;
                return false;

            }

        });

        return response;

    }; /* doesMsgHaveError() */

    return doesMsgHaveError;

});
