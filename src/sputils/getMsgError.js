import domFind from "common-micro-libs/src/domutils/domFind";
import parseXML from "common-micro-libs/src/jsutils/parseXML";

    /**
     * Given a sharepoint webservices response, this method will
     * look to see if it contains an error and return that error
     * formated as a string.
     *
     * @param {XMLDocument|String} xmlMsg
     *
     * @return {String} errorMessage
     *
     */
    export default function getMsgError(xmlMsg){

        if (typeof xmlMsg === "string") {
            xmlMsg = parseXML(xmlMsg);

        // Backwards compatible
        // if xmlMsg is a jquery object, get the native ele
        } else if (xmlMsg && xmlMsg.jquery) {
            xmlMsg = xmlMsg[0];
        }

        // if xmlDocument does not support querySelector, throw error
        if (!xmlMsg.querySelector) {
            throw new Error("input is not an XML Document!");
        }

        var error = "",
            spErr = domFind(xmlMsg, "ErrorCode"),
            count = 0;

        if (!spErr.length) {
            spErr = domFind(xmlMsg, "faultcode");
        }

        // See if any Elements with ErrorMessage attribute
        if (!spErr.length) {
            spErr = domFind(xmlMsg, "CopyResult[ErrorMessage]");

            if (spErr.length) {
                spErr.forEach(function(thisErr){
                    count += 1;
                    error += "(" + count + ") " +
                        (thisErr.getAttribute("ErrorCode") || "unknown") +
                        ": " +
                        thisErr.getAttribute("ErrorMessage") + "\n";
                });
                return count + " error(s) encountered! \n" + error;
            }
        }

        if (!spErr.length) {
            return "";
        }

        // Loop through and get all errors.
        spErr.forEach(function(thisErr){
            var textContent = thisErr.textContent;
            if ( textContent !== "0x00000000" ) {
                count += 1;
                error += "(" + count + ") " + textContent + ": " +
                    domFind(thisErr.parentNode, "*")
                        .filter(function(ele){
                            return ele !== thisErr;
                        })
                        .reduce(function(text, ele){
                            return text + " " + ele.textContent;
                        }, "") +
                    "\n";
            }
        });

        error = count + " error(s) encountered! \n" + error;
        return error;
    };

