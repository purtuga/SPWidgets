define([
    "text!./soapMsgs/web.webUrlFromPageUrl.response.success.xml"
],
function(
    webUrlFromPageUrlXML
){

    return {

        install: function(){

            // /_vti_bin/Webs.asmx

            jasmine.Ajax.stubRequest(
                /.*\/_vti_bin\/Webs\.asmx/,    // url
                /.*<WebUrlFromPageUrl.*/          // request Search
            ).andReturn({
                status:         200,
                statusText:     'HTTP/1.1 200 OK',
                contentType:    'text/xml;charset=UTF-8',
                responseText:   webUrlFromPageUrlXML
            });

        }

    };

    // request sample:
    // <soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
        // <soap:Body>
            // <WebUrlFromPageUrl xmlns='http://schemas.microsoft.com/sharepoint/soap/' >
                // <pageUrl>https://site.sharepoint.com/sites/mysite/Shared%20Documents/page.apsxp</pageUrl>
            // </WebUrlFromPageUrl>
        // </soap:Body>
    // </soap:Envelope>

});
