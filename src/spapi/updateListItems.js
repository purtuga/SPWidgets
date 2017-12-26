import apiFetch         from "../sputils/apiFetch"
import getSiteWebUrl    from "./getSiteWebUrl"
import objectExtend     from "common-micro-libs/src/jsutils/objectExtend"
import Promise          from "common-micro-libs/src/jsutils/es6-promise"

//======================================================================

let counter = Date.now();

/**
 * Makes updates to list items in Sharepoint Lists and Libraries. For more
 * information on this method, see {@link https://msdn.microsoft.com/en-us/library/lists.lists.updatelistitems(v=office.12).aspx}
 *
 * This method will process updates in batches and can be configured on input to
 * control the number of concurrent updates that it can issue at one time.
 *
 * @function
 *
 * @param {Object} options
 *
 * @param {String} options.listName
 *
 * @param {String|Object|Array<Array>|Array<Object>|Array<String>} options.updates
 *  A String, Object or an Array containing any of those types. If defining XML strings,
 *  the &lt;Batch&gt; wrapper __SHOULD NOT__ be included. Only the individual `Method`
 *  elements.
 *
 * @param {Object} [options.webUrl=current_site]
 *
 * @param {String} [options.updateType='Update']
 *  Used when the updates parameter is a non-string. The value will be used
 *  to set the Cmd on the update. Valid values are:
 *  `Update` (default), `New` and `Delete`.
 *  Note that when using 'Udpate' and 'Delete' your
 *  updates must include the ID property so that SharePoint knows on what
 *  item it needs to act on.
 *  {@link https://msdn.microsoft.com/en-us/library/ms459050(v=office.12).aspx}
 *
 * @param {String} [options.updateOnError='Continue']
 *  Value is used on the Batch element to indicate what should be done if
 *  an error is encountered. Valid values include 'Continue' (default) and
 *  'Return'. {@link https://msdn.microsoft.com/en-us/library/ms437562(v=office.12).aspx}

 * @param {Number} [options.batchSize=100]
 *  Number of updates per batch. Default is 100.
 *
 * @param {Number} [options.concurrency=2]
 *  Number of max concurrent updates allowed.
 *
 *
 * @return {Promise}
 *  The promise returned is resolved with a {@link updateListItemsResponse}
 *  object.
 *
 * @example
 *
 * updateListItems({
 *      listName: "Tasks",
 *      updates: [
 *          {
 *              ID: "3",
 *              Title: "Updated title"
 *          },
 *          {
 *              ID: "4",
 *              Title: "Updated title for 4"
 *          }
 *      ]
 * })
 * .then(function(response){
 *      alert(response.message);
 * })
 */
function updateListItems(options) {
    var opt = objectExtend({}, updateListItems.defaults, options, { counter: 1});

    return getSiteWebUrl(opt.webURL).then(function(webURL){
        opt.webURL = webURL;

        // Get an array of Strings with all updates
        opt._updates = getUpdateArray(opt);

        return new Promise(function(resolve, reject){
            var
            updatePromisesList  = [],
            batchProcessingDone = false,
            updatesInFlight     = 0,
            maxConcurrentUpds   = opt.concurrency,
            getBatchUpdateList  = function(){
                var
                count           = 0,
                xmlUpdateString = "";

                while (opt._updates.length && count < opt.batchSize) {
                    xmlUpdateString += opt._updates.shift();
                    count++;
                }

                if (!/<\/Batch>/.test(xmlUpdateString)) {
                    xmlUpdateString = '<Batch OnError="Continue">' + xmlUpdateString + '</Batch>';
                }

                if (!opt._updates.length) {
                    batchProcessingDone = true;
                }

                return xmlUpdateString;
            },
            onUpdateDone = function(){
                --updatesInFlight;

                // If we're all done, then resolve the overall updateListItems promise
                if (updatesInFlight === 0 && batchProcessingDone) {
                    resolveUpdateListItems();
                    return;
                }

                // if concurrency is not maxed out, then execute a batch update again
                if (updatesInFlight < maxConcurrentUpds){
                    execBatchUpdate();
                }
            },
            execBatchUpdate = function(){
                // If we are at the max concurrency, then exit...
                if (batchProcessingDone || updatesInFlight >= maxConcurrentUpds) {
                    return;
                }

                var
                updatePromise = apiFetch(opt.webURL + "_vti_bin/Lists.asmx", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'SOAPAction':   'http://schemas.microsoft.com/sharepoint/soap/UpdateListItems'

                    },
                    body: "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                        "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
                        "<soap:Body><UpdateListItems xmlns=\"http://schemas.microsoft.com/sharepoint/soap/\">" +
                        "<listName>" + opt.listName + "</listName><updates>" +
                        getBatchUpdateList() +
                        "</updates></UpdateListItems></soap:Body></soap:Envelope>"
                });

                updatesInFlight++;
                updatePromisesList.push(updatePromise);
                // on resolve or reject: call onUpdateDone()
                // FIXME: on first Promise.reject - stop all further executions of apiFetch's
                updatePromise.then(onUpdateDone, onUpdateDone);

                // If we are not yet done, then call execBatchUpdate again
                if (!batchProcessingDone){
                    execBatchUpdate();
                }
            },
            // resolveUpdateListItems
            // Called when all Updates have been sent to the server
            resolveUpdateListItems = function(){
                var
                // Processes the values returns by apiFetch (ApiResponse object)
                processAjaxResponses = function(apiResponses, isHttpError){
                    var isMultiRequest = updatePromisesList.length > 1,

                    /**
                     * Response object returned by updateListItems. Note that if batch
                     * processing was applied, the `httpData` and `xhrRequest` properties
                     * will be arrays instead.
                     *
                     * @typedef {Object} updateListItemsResponse
                     *
                     * @property {String} status
                     *  The status of the update. Value will be
                     *  either 'error' or 'success'
                     *
                     * @property {String} message
                     *  The message string. For a status of success, this
                     *  will just be "Update successful.". For a status of
                     *  error, this will include the errors returned by sharepoint.
                     *
                     * @property {Object|Error|Array<ApiFetchResponse>} response
                     *  The response returns from the API call. If batching is turned on
                     *  ond it was needed to process the request, this property will
                     *  be an array with all API Responses.
                     *  If an error occurred, this property will be an `Error` or
                     *  an `Object`
                     */
                    response = {
                        status:     "success", //error || success
                        message:    "Update Successful.",
                        response:   isMultiRequest ? [] : null
                    };

                    if (!Array.isArray(apiResponses)) {
                        if (apiResponses instanceof Error) {
                            response.status     = "error";
                            response.message    = apiResponses.message;
                            response.response   = apiResponses;
                        }

                    } else {
                        apiResponses.forEach(function(reqResponse){
                            if (isMultiRequest) {
                                response.response.push(reqResponse);

                            } else {
                                response.response = reqResponse;
                            }

                            if (isHttpError) {
                                response.status     = "error";
                                response.message    = reqResponse.message || "HTTP error";
                            }
                        });
                    }

                    if (response.status === "error") {
                        // FIXME: convert response to an Error
                        reject(response);

                    } else {
                        resolve(response);
                    }
                };

                // When all requests are done, then process the responses
                Promise.all(updatePromisesList).then(
                    function(apiResponses){
                        processAjaxResponses(apiResponses, false);
                    },
                    function (err) {
                        processAjaxResponses(err, true);
                    }
                )["catch"](function(err){
                    reject(err);
                });
            };

            execBatchUpdate();
        });
    });
}

/**
 * Returns an array of Strings (XML) representing the updates that need
 * to be made. The strings will be XML
 * [Method]{@link https://msdn.microsoft.com/en-us/library/ms459050(v=office.12).aspx}
 * element that contain the individual update.
 * Handles the updates being defined in a variety of
 * ways:
 *
 * -    `Array<Array<String>>`: Array of Arrays.  Taken from the
 *      approach used by SPServices. Generates one single update.
 *      Each "inner" array has two members: the key and the value
 *      Example:
 *
 *          [
 *              ["ID", "1"],
 *              ["Title", "new title here"]
 *          ]
 *
 * -    `Array<Object>`: array-of-objects. Each object is an update.
 *      Example:
 *
 *          [
 *              {
 *                  ID: "1",
 *                  Title: "New title here"
 *              }
 *          ]
 *
 * -    array-of-strings
 * -    string
 *
 * @private
 *
 * @param {Object} options
 * @param {String|Object|Array<Array>|Array<Object>|Array<String>} options.updates
 *
 * @param {Object} options.updateType
 *  `Update` (default), `New` and `Delete`.
 *  See updateListItems for more info.
 *
 * @return {Array<String>}
 *  Each item in the Array is an xml string (the single Method element)
 */
function getUpdateArray(options){
    let opt = objectExtend({
        updateType: "Update",
        updates:    []
    }, options);
    let updates     = [];
    let ofType      = typeof opt.updates;
    let getUpdId    = () => {
        if (opt.counter) {
            return opt.counter++
        }
        return counter++;
    };

    function processArrayOfObjects(updArray) {
        var i,j, col,
            thisUpd = '';

        // Loop through the list of objects (updates)
        for(i=0,j=updArray.length; i<j; i++){
            thisUpd = '';

            // Build the fields to be updated for this update
            for (col in updArray[i]) {
                if (updArray[i].hasOwnProperty(col)) {
                    thisUpd += '<Field Name="' + col + '">' +
                              updArray[i][col] + '</Field>';
                }
            }

            // If this column has fields to be updated, create
            // the method agregate around it
            if (thisUpd) {
                updates.push(
                    '<Method ID="' + getUpdId() + '" Cmd="' +
                    opt.updateType + '">' + thisUpd + '</Method>'
                );
            }
        }
    }

    // Array-of-arrays
    // 1 single update (outer-array) with multiple fields to be
    // updated (inner-arrays's)
    function processArrayOfArrays(updArray) {
        var thisUpd = '',
            i,j;

        for(i=0,j=updArray.length; i<j; i++){
            if (Array.isArray(updArray[i])) {
                thisUpd += '<Field Name="' + updArray[i][0] + '">' +
                          updArray[i][1] + '</Field>';
            }
        }

        if (thisUpd) {
            updates.push(
                '<Method ID="' + getUpdId() + '" Cmd="' +
                opt.updateType + '">' + thisUpd + '</Method>'
            );
        }
    }

    // Backwards compatability to SPServices: if we don't have
    // options.updates defined, but we have .ID and .valuepairs,
    // Then do array-of-arrays
    if (!opt.updates && opt.ID && opt.valuepairs) {
        opt.valuepairs.push(["ID", opt.ID]);
        processArrayOfArrays(opt.valuepairs);

    // If options.updates is a string, then just add it as is to
    // the array
    }
    else if (ofType === "string"){
        updates.push(opt.updates);
    }
    else if (Array.isArray(opt.updates) && opt.updates.length) {
        ofType = typeof opt.updates[0];

        // Array<Object>
        if (ofType === "object") {
            processArrayOfObjects(opt.updates);

        // Array<String>
        } else if (ofType === "string") {
            updates.push.apply(updates, opt.updates);

        // Array<Array>
        } else if (Array.isArray(opt.updates[0])) {
            processArrayOfArrays(opt.updates);
        }
    }
    else if (ofType === "object") {
        processArrayOfObjects([ opt.updates ]);
    }

    return updates;
}

/**
 * Get an array of xml string - each being the update to the list.
 *
 * @type {Function}
 */
updateListItems.getUpdateArray = getUpdateArray;

// Define defaults. User can change these on their function attachment.
updateListItems.defaults = {
    listName:       '',
    webURL:         '',
    async:          true,
    completefunc:   null,
    updates:        '',
    updateType:     'Update',
    updateOnError:  'Continue',
    batchSize:      100,
    concurrency:    2
};

export default updateListItems;
