import $ from "jquery";
    /* global _spPageContextInfo, L_Menu_BaseUrl */


    //******************************
    //  THIS MODULE IS DEPRECATED
    //******************************



    var getSiteUrl = (function() {

        // Cache of site urls
        var siteUrl    = {};

        /**
         * Takes a relative URL (ex. /you/page.aspx) and returns the full
         * url starting wtih http...
         */
        function getFullUrl(pageAddress) {

            // if URL does not end with "/" then insert it
            if (pageAddress && pageAddress.charAt(pageAddress.length - 1) !== "/") {

                pageAddress += "/";

            }

            if (pageAddress.toLowerCase().indexOf("http") > -1) {
                return pageAddress;
            }

            pageAddress = document.location.protocol + "//" +
                document.location.hostname +
                (   Number(document.location.port) !== 80 &&
                    Number(document.location.port) > 0 ?
                        ":" + document.location.port :
                        ""
                ) +
                pageAddress;

            return pageAddress;

        }

        // return caller function
        return function(pageUrl) {

            var page        = "",
                isThisPage  = false,
                errorMessage = "getSiteUrl(): Unable to determine site url from " + pageUrl;

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

                throw new Error(errorMessage);

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
                if (
                    typeof _spPageContextInfo !== "undefined" &&
                    _spPageContextInfo.webServerRelativeUrl
                ) {

                    siteUrl[page] = _spPageContextInfo.webServerRelativeUrl;

                } //do we have a _spPageContextInfo?

                // Do we have L_Menu_BaseUrl defined?
                if (!siteUrl[page] && (typeof L_Menu_BaseUrl !== "undefined") && L_Menu_BaseUrl) {

                    siteUrl[page] = L_Menu_BaseUrl;

                }

                // ensure we get a full url starting with http
                if (siteUrl[page]) {

                    siteUrl[page] = getFullUrl(siteUrl[page]);
                    return siteUrl[page];

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

                        siteUrl[page] = $(xDoc).find("WebUrlFromPageUrlResult").text() || "";


                    } //end: success
                });

            } //end: if()

            if (!siteUrl[page]) {

                delete siteUrl[page];
                throw new Error(errorMessage);

            }

            siteUrl[page] = getFullUrl(siteUrl[page]);

            return siteUrl[page] || "";

        }; //end: return: function

    })(); // end: getSiteUrl()

    export default getSiteUrl;




