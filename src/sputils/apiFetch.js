define([
    "vendor/jsutils/es7-fetch",
    "vendor/jsutils/parseXML",
    "./doesMsgHaveError",
    "./getMsgError"
], function(
    fetchPolyfill,
    parseXML,
    doesMsgHaveError,
    getMsgError
){

    var fetch = fetchPolyfill.fetch;

    /**
     * Handles API calls to SharePoint using the low level ES7 fetch() api,
     * thus is has the same input signature. Response will be processed for
     * Sharepoint Status errors and then data parsed, returning instead an
     * object.
     *
     * @param {String|Request} input
     * @param {Object} init
     *
     * @return {Promise}
     *  Promise is resolved with an object containing the following:
     *
     *      {
     *          content:    {},         // XMLDocument
     *          msgType:    'xml',      // String
     *          response:   response    // A Response object
     *      }
     *
     */
    var apiFetch = function(input, init){
        return fetch(input, init)
            .then(parseApiResponse)
            .then(checkForSharePointErrors)
            .then(checkForHttpErrors);
    },

    /**
     * Checks the HTTP resposne to see if there was an HTTP error.
     *
     * @private
     *
     * @param response
     *
     * @returns {*}
     */
    checkForHttpErrors = function(response) {
        var res = response.status ? response : response.response ? response.response : {};

        // If server returned an error code, then reject promise
        if (res.status >= 200 && res.status < 300) {
            return response;

        } else {
            var error = new Error(res.statusText);
            error.response = response;
            throw error;
        }
    },

    /**
     * Parses the API response into either XML or JSON
     *
     * @private
     *
     * @param response
     * @returns {*}
     */
    parseApiResponse = function(response){
        // Get the response text and then parse it.
        return response.text().then(function(responseString){

            // TODO: start handing JSON responses from SP2013

            return {
                content:    parseXML(responseString),
                msgType:    'xml',
                response:   response
            };
        });
    },

    /**
     * Checks the API response for any SharePoint processing errors.
     *
     * @private
     *
     * @param {Object} response
     *
     * @returns {*}
     */
    checkForSharePointErrors = function(response){
        if (response.msgType === 'xml'){
            if (doesMsgHaveError(response.content)) {
                var error = new Error(getMsgError(response.content));
                error.response = response;
                throw error;
            }
        }

        return response;
    };

    return apiFetch;
});
