import domFind from "common-micro-libs/src/domutils/domFind";

    /**
     * Checks if an xml message has an error. Taken from
     * SPWidgets.
     *
     * @param {XMLDocument} xmlMsg
     *
     * @return {Boolean}
     */
    export default function(xmlMsg) {

        // BACKWARD COMPATIBILITY
        // if xmlMsg seems to be a jQuery object, then get it native element
        if (xmlMsg.jquery) {
            xmlMsg = xmlMsg[0];
        }

        // if xmlDocument does not support querySelector, throw error
        if (!xmlMsg.querySelector) {
            throw new Error("input is not an XML Document!");
        }

        var spErrCode   = domFind(xmlMsg, "ErrorCode"),
            response    = false;

        // If we don't have <ErrorCode> elements, then check other stuff
        // that sharepoint can return in error conditions
        if (!spErrCode.length) {
            // Any "fauldcode" nodes?
            if (domFind(xmlMsg, "faultcode").length) {
                return true;
            }

            // Any CopyResult nodes with ErrorMessage
            if (domFind(xmlMsg, "CopyResult[ErrorMessage]").length){
                return true;
            }

            return response;
        }

        spErrCode.some(function(errorCodeEle){
            var errorCodeString = errorCodeEle.textContent;
            if (errorCodeString !== "0x00000000" && errorCodeString !== "NoError" ) {
                response = true;
                return true;
            }
        });

        return response;
    }

