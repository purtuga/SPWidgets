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
     * Returns the current site URL. URL will end with a forward slash (/).
     *
     * If this function is unable to determine the SiteUrl from data already
     * loaded, then it will call a webservice to retrieve it. That call to
     * the webservice will be syncronous.
     *
     * @function
     *
     * @param {String} [pageUrl=document.location.href]
     *
     * @return {String}
     *
     * @throws Unable to determine site url
     *
     */
    API.getSiteUrl = (function() {

        // TODO: should we allow this method to be called async=true? with default to false?

        // Cache of site urls
        var siteUrl    = {};

        return function(pageUrl) {

            var page        = '',
                isThisPage  = false;

            if (!pageUrl) {

                pageUrl     = document.location.href;
                isThisPage  = true;

            }

            page = pageUrl;

            // Get only the pure url up to the page... no URL params or hash.
            if (pageUrl.indexOf("?") > -1) {

                page = pageUrl.substr(0, pageUrl.indexOf("?"));

            } else if (pageUrl.indexOf("#") > -1) {

                page = pageUrl.substr(0, pageUrl.indexOf("#"));

            }

            if (!page) {

                throw("getSiteUrl(): Unable to determine site url from " + pageUrl);

            }

            // If the URL site is already known, return it.
            if (siteUrl[page]) {

                return siteUrl[page];

            }

            // If it is the current page, then try to determine the siteUrl
            // based on variables set by SharePoint
            if (isThisPage) {

                // DO we have _spPageContextInfo to work with? Then use
                // the webServerRelativeUrl param of it.
                if (    typeof _spPageContextInfo !== "undefined"
                    &&  _spPageContextInfo.webServerRelativeUrl
                ) {

                    siteUrl[page] = _spPageContextInfo.webServerRelativeUrl;

                } //do we have a _spPageContextInfo?

                // Do we have L_Menu_BaseUrl defined?
                if (!siteUrl[page] && (typeof L_Menu_BaseUrl !== "undefined") && L_Menu_BaseUrl) {

                    siteUrl[page] = L_Menu_BaseUrl;

                }

                if (siteUrl[page]) {

                    // If URL does not start with http, then insert it.
                    if (siteUrl[page].indexOf("http") !== 0) {

                        siteUrl[page] = document.location.protocol + "//" +
                                document.location.hostname +
                                (           Number(document.location.port) !== 80
                                        &&  Number(document.location.port) > 0
                                    ?   document.location.port
                                    :   ""
                                ) +
                                siteUrl[page];

                    }

                }

            } //end: if(): is current page

            // If we still don't have a current site for this page, then
            // Lets call the web serivce
            if (!siteUrl[page]) {

                $.ajax({
                    type:   "POST",
                    cache:  false,
                    async:  false,
                    url:    document.location.protocol + "//" + document.location.host + "/_vti_bin/Webs.asmx",
                    data:   "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><WebUrlFromPageUrl xmlns='http://schemas.microsoft.com/sharepoint/soap/' >" +
                            "<pageUrl>" + page + "</pageUrl></WebUrlFromPageUrl></soap:Body></soap:Envelope>",
                    contentType:    "text/xml; charset=utf-8",
                    dataType:       "xml",
                    success:        function(xDoc) {

                        siteUrl[page] = $(xDoc).find("WebUrlFromPageUrlResult").text();


                    } //end: success
                });

            } //end: if()

            // if URL does not end with "/" then insert it
            if (siteUrl[page] && siteUrl[page].charAt(siteUrl[page].length - 1) !== "/") {

                siteUrl[page] += "/";

            }

            return siteUrl[page] || "";

        }; //end: return: function

    })(); // end: API.getSiteUrl()

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));

