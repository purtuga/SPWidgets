define([
    "jquery",
    "./getSiteUrl",
    "../sputils/doesMsgHaveError",
    "../sputils/getMsgError"
], function(
    $,
    getSiteUrl,
    doesMsgHaveError,
    getMsgError
){

    var
    /**
     * Returns an array of String representing the updates that need
     * to be made. Handles the updates being defined in a variety of
     * ways: array-of-arrays, array-of-objects, array-of-strings, string.
     *
     * @private
     * @param {Object} options
     *
     * @return {Array<String>}
     */
    getUpdateArray = function(options){

        var updates = [],
            ofType   = typeof options.updates;

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
                        '<Method ID="' + options.counter + '" Cmd="' +
                        options.updateType + '">' + thisUpd + '</Method>'
                    );

                    options.counter++;

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

                if ($.isArray(updArray[i])) {

                    thisUpd += '<Field Name="' + updArray[i][0] + '">' +
                              updArray[i][1] + '</Field>';

                }

            }

            if (thisUpd) {

                updates.push(
                    '<Method ID="' + options.counter + '" Cmd="' +
                    options.updateType + '">' + thisUpd + '</Method>'
                );

                options.counter++;

            }

        }

        // Backwards compatability to SPServices: if we don't have
        // options.updates defined, but we have .ID and .valuepairs,
        // Then do array-of-arrays
        if (!options.updates && options.ID && options.valuepairs) {

            options.valuepairs.push(["ID", options.ID]);
            processArrayOfArrays(options.valuepairs);

        // If options.updates is a string, then just add it as is to
        // the array
        } else if (ofType === "string"){

            updates.push(options.updates);

        } else if ($.isArray(options.updates) && options.updates.length) {

            ofType = typeof options.updates[0];

            // Array<Object>
            if (ofType === "object") {

                processArrayOfObjects(options.updates);

            // Array<String>
            } else if (ofType === "string") {

                updates.push.apply(updates, options.updates);


            // Array<Array>
            } else if ($.isArray(options.updates[0])) {

                processArrayOfArrays(options.updates);

            }

        }
        return updates;

    }, //end: getUpdateArray

    /**
     * Makes updates to list items in Sharepoint Lists and Libraries. For more
     * information on this method, see {@link https://msdn.microsoft.com/en-us/library/lists.lists.updatelistitems(v=office.12).aspx}
     *
     * @function
     *
     * @param {Object} options
     * @param {String} options.listName
     * @param {String, Object, Array<Array>, Array<Object>, Array<String>} options.updates
     *      A String, Object or an Array containing any of those types.
     * @param {Object} [options.webUrl=current_site]
     * @param {Object} [options.async=true]
     * @param {String} [options.updateType='Update']
     *      Used when the updates paramter is a non-string. The value will be used
     *      to set the Cmd on the update. Valid values are 'Update' (default),
     *      'New' and 'Delete'. Note that when using 'Udpate' and 'Delete' your
     *      updates must include the ID property so that SharePoint knows on what
     *      item it needs to act on.
     *      {@link https://msdn.microsoft.com/en-us/library/ms459050(v=office.12).aspx}
     * @param {String} [options.updateOnError='Continue']
     *      Value is used on the Batch element to indicate what should be done if
     *      an error is encountered. Valid values include 'Continue' (default) and
     *      'Return'. {@link https://msdn.microsoft.com/en-us/library/ms437562(v=office.12).aspx}
     * @param {Object} [options.completefunc=null]
     *      Deprecated.
     * @param {Object} [options.ID=null]
     *      Deprecated. Here for backwards compatability with SPServices
     * @param {Object} [options.valuepairs=null]
     *      Deprecated. Here for backwards compatability with SPServices
     *
     * @return {jQuery.Promise}
     *      The promise returned is resolved with a {@link updateListItemsResponse}
     *      object.
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
     *
     *
     */
    updateListItems = function (options) {

        var opt = $.extend({}, updateListItems.defaults, options, { counter: 1});

        if (!opt.webURL) {
            opt.webURL = getSiteUrl();

        } else if (opt.webURL.charAt(opt.webURL.length - 1) !== "/") {
            opt.webURL += "/";
        }

        // some backwards compatability for SPServices
        opt.updateType = opt.batchCmd || opt.updateType;

        // Get an array of Strings with all updates
        opt._updates = getUpdateArray(opt).join("");

        if (!/<\/Batch>/.test(opt._updates)) {

            opt._updates = '<Batch OnError="Continue">' +
                opt._updates + '</Batch>';

        }

        // FIXME: support for large set of updates - batch processing.

        return $.Deferred(function(dfd){

            $.ajax({
                type:           "POST",
                cache:          false,
                async:          opt.async,
                url:            opt.webURL + "_vti_bin/Lists.asmx",
                beforeSend:     function(xhr) {
                    xhr.setRequestHeader(
                        'SOAPAction',
                        'http://schemas.microsoft.com/sharepoint/soap/UpdateListItems'
                    );
                },
                contentType:    "text/xml;charset=utf-8",
                dataType:       "xml",
                data:           "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                    "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
                    "<soap:Body><UpdateListItems xmlns=\"http://schemas.microsoft.com/sharepoint/soap/\">" +
                    "<listName>" + opt.listName + "</listName><updates>" +
                    opt._updates + "</updates></UpdateListItems></soap:Body></soap:Envelope>",
                complete:       function(data, status) {

                    if ($.isFunction(opt.completefunc)) {
                        opt.completefunc.call($, data, status);
                    }

                }//end: $.ajax().success()
            })
            .always(function(data, status, jqXHR){

                var
                /**
                 * Response object returned by updateListItems.
                 *
                 * @typedef updateListItemsResponse
                 * @property {String} status
                 *      The status of the update. Value will be
                 *      either 'error' or 'success'
                 * @property {String} message
                 *      The message string. For a status of success, this
                 *      will just be "Update successful.". For a status of
                 *      error, this will include the errors returned by sharepoint.
                 * @property {Object|jQuery.jqXHR} httpData
                 * @property {Object|jQuery.jqXHR} xhrRequest
                 */
                response = {
                    status      : "", //error || success
                    message     : "", // message if any
                    httpData    : data,
                    xhrRequest  : jqXHR
                };

                // Error HTTP code received.
                if (status === "error") {
                    response.status = "error";
                    response.message = data.statusText || "HTTP error.";
                    dfd.rejectWith($, [response]);

                // Success HTTP response - but was it successful?
                } else {

                    // If a SP processing error was encoutered, then
                    // reject the deferred.
                    if (doesMsgHaveError(data)) {
                        response.status = "error";
                        response.message = getMsgError(data);
                        dfd.rejectWith($, [response]);

                    // Else, SP processing was successful
                    } else {
                        response.status = "success";
                        response.message = "Update Successful.";
                        dfd.resolveWith($, [response]);

                    }

                }

            });

        }).promise(); //end: return promise

    }; //end: updateListItems()

    // Define defaults. User can change these on their function attachment.
    updateListItems.defaults = {
        listName:       '',
        webURL:         '',
        async:          true,
        completefunc:   null,
        updates:        '',
        updateType:     'Update',
        updateOnError:  'Continue'
    };

    return updateListItems;

});
