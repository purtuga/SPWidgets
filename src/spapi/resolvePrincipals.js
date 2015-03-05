define([
    "jquery",
    "./getSiteUrl",
], function(
    $,
    getSiteUrl
){

    /**
     * Given a list of users, this method will resolve those if they
     * are not part of the site collection user list info.
     *
     * @param {Object} options
     * @param {Array|String} options.principalKeys
     *      The principal key (login name/Account Name/email) to be resolved.
     *      An array of values can also be used on input.
     * @param {String} [options.principalType='All']
     *      The type of principal that is being resolved.
     * @param {Boolean} [options.addToUserInfoList=true]
     *      If true, then principal will be added to the site collection
     *      user info list.
     * @param {Boolean} [options.async=true]
     *      If true, call to the service will be made async.
     *
     *
     * @return {jQuery.Promise}
     *      The jquery .ajax() Promise is returned.
     *
     * @example
     *
     *  SPAPI.resolvePrincipals({
     *      principalKeys: "domain\\userid"
     *  })
     *  .then(function(xmlDoc, status){
     *
     *      var userSiteUID = $(xmlDoc)
     *              .find("AccountName:contains('domain\\userid')")
     *              .parent()
     *              .find("UserInfoID")
     *              .text();
     *      alert("User was Resolved. His ID is: " + userSisteID);
     *  });
     */
    var resolvePrincipals = (function() {

        var getData     = null,
            callerFn    = function(){
                            return getData.apply(this, arguments);
                        };

        // Define defaults. User can change these on their function attachment.
        callerFn.defaults = {
            principalKeys:      [],
            principalType:      'All',
            addToUserInfoList:  true,
            async:              true
        };

        /**
         * Retrieves the data from Sharepoint
         */
        getData = function(opt){

            var options = $.extend({}, callerFn.defaults, opt);

            if (!options.webURL) {

                options.webURL = getSiteUrl();

            } else if (options.webURL.charAt(options.webURL.length - 1) !== "/") {

                options.webURL += "/";

            }

            options.webURL += "/_vti_bin/People.asmx";


            if (!$.isArray(options.principalKeys)) {

                options.principalKeys = [options.principalKeys];

            }

            options.principalXml    = "";
            var hasStringTag        = /<string>/i,
                i,j;

            for(i=0,j=options.principalKeys.length; i<j; i++){

                if (!hasStringTag.test(options.principalKeys[i])) {

                    options.principalXml += '<string>' + options.principalKeys[i] + '</string>';

                } else {

                    options.principalXml += options.principalKeys[i];

                }

            }

            // Make ajax call and return pronise
            return $.ajax({
                type:           "POST",
                cache:          false,
                async:          options.async,
                url:            options.webURL,
                contentType:    "text/xml;charset=utf-8",
                beforeSend:     function(xhr) {

                    xhr.setRequestHeader(
                        'SOAPAction',
                        'http://schemas.microsoft.com/sharepoint/soap/ResolvePrincipals'
                    );

                },
                dataType:       "xml",
                data:           '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                    '<soap:Body><ResolvePrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">' +
                        '<principalKeys>' + options.principalXml + '</principalKeys>' +
                        '<principalType>' + options.principalType + '</principalType>' +
                        '<addToUserInfoList>' + options.addToUserInfoList + '</addToUserInfoList>' +
                    '</ResolvePrincipals></soap:Body></soap:Envelope>'
            });

        }; //end: getData

        return callerFn;

    })();

    return resolvePrincipals;

});

