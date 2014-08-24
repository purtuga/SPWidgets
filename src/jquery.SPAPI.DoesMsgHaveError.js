/**
 * By default, this API method will add its self to jQuery under the following
 * namespace: $.SPAPI. This can be altered by defining an object named 'SPAPI'
 * just prior to loading/executing this code.
 *
 * @Example
 *
 *  // Load this API method into a custom namespace
 *  <script type="text/javascript">
 *      var SPAPI = {};
 *  </script>
 *  <script type"text/javascript" src="path/to/this/file.js"/>
 *
 */
(function($, namespace){

    var API = namespace || {};

    if (!namespace) {

        if (typeof $.SPAPI === "undefined") {

            $.SPAPI = API;

        } else {

            API = $.SPAPI;

        }

    }

    /**
     * Checks if an xml message has an error. Taken from
     * SPWidgets.
     *
     * @param {jQuery|XMLDocument} xmlMsg
     *
     * @return {Boolean}
     */
    API.doesMsgHaveError = function(xmlMsg) {

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

            if ( $(this).text() !== "0x00000000" ) {

                response = true;
                return false;

            }

        });

        return response;

    }; /* doesMsgHaveError() */


})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));
