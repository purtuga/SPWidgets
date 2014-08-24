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

    var API = namespace || {},
        /**
         * Returns an array of String representing the updates that need
         * to be made.
         *
         * @param {Object} options
         *
         * @return {Array<String>}
         */
        getUpdateArray = function(options){

            var updates = [],
                ofType   = typeof options.updates;

            function processArrayOfObjects(updArray) {

                var i,j, col, thisUpd;
                for(i=0,j=updArray.length; i<j; i++){

                    thisUpd = '';

                    for (col in updArray[i]) {

                        if (updArray[i].hasOwnProperty(col)) {

                            thisUpd = '<Field Name="' + col + '">' +
                                      updArray[i][col] + '</Field>';

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

            }

            function processArrayOfArrays(updArray) {

                var i,j, col, thisUpd;
                for(i=0,j=updArray.length; i<j; i++){

                    if ($.isArray(updArray[i])) {

                        thisUpd = '<Field Name="' + updArray[i][0] + '">' +
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


            // If options.updates is a string, then just add it as is to
            // the array
            if (ofType === "string"){

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

            // Backwards compatability to SPServices
            if (options.ID && options.valuepairs) {

                options.valuepairs.push(["ID", options.ID]);
                processArrayOfArrays(options.valuepairs);

            }

            return updates;

        };

    if (!namespace) {

        if (typeof $.SPAPI === "undefined") {

            $.SPAPI = API;

        } else {

            API = $.SPAPI;

        }

    }

    /**
     * Makes updates to list items in Sharepoint Lists and Libraries.
     *
     * @function
     *
     * @param {Object} options
     * @param {String} options.listName
     * @param {String, Array<Array>, Array<Object>, Array<String>} options.updates
     * @param {Object} [options.webUrl=current_site]
     * @param {Object} [options.async=true]
     * @param {Object} [options.completefunc=null]
     * @param {Object} [options.ID=null]
     *      Deprecated. Here for backwards compatability with SPServices
     * @param {Object} [options.valuepairs=null]
     *      Deprecated. Here for backwards compatability with SPServices
     *
     *
     * @return {jQuery.Promise}
     *
     * Dependencies
     *
     *  .getSiteUrl()
     *
     *
     */
    API.updateListItems = (function(){

        // TODO: Enhance to support batch processing when 'updates' is an array. with throlling
        // see here: https://spservices.codeplex.com/workitem/10168

        var wsCall      = null,
            callerFn    = function(){

                            return wsCall.apply(this, arguments);

                        };

        // Define defaults. User can change these on their function attachment.
        callerFn.defaults = {
            listName:       '',
            webURL:         '',
            async:          true,
            completefunc:   null,
            updates:        '',
            updateType:     'Update',
            updateOnError:  'Continue'
        };


        // Get rows from SP. Returns a JQuery.Promise
        wsCall = function (opt) {

            // FIXME: support for caching and default options

            var Me      = this,
                options = $.extend({}, callerFn.defaults, opt, { counter: 1});

            if (!options.webURL) {

                options.webURL = Me.getSiteUrl();

            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                options.webURL += "/";

            }

            // some backwards compatability for SPServices
            options.updateType = options.batchCmd || options.updateType;

            // Get an array of Strings with all updates
            options._updates = getUpdateArray(options).join("");

            if (!/<\/Batch>/.test(options._updates)) {

                options._updates = '<Batch OnError="Continue">' +
                    options._updates + '</Batch>';

            }

            return $.ajax({
                type:           "POST",
                cache:          false,
                async:          options.async,
                url:            options.webURL + "_vti_bin/Lists.asmx",
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
                    "<listName>" + options.listName + "</listName><updates>" +
                    options._updates + "</updates></UpdateListItems></soap:Body></soap:Envelope>",
                complete:       function(data, status) {

                    if ($.isFunction(options.completefunc)) {

                        options.completefunc.call($, data, status);

                    }

                }//end: $.ajax().success()
            });

        }; //end: wsCall()

        return callerFn;

    })(); // API.updateListItems()

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));
