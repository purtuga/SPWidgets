define([
    "text!./soapMsgs/people.searchPrincipals.response.success.xml"
], function(
    searchPrincipalsResponseSuccessXML
){

    return {
        // requests must have 'auto_respond' in the request message
        install: function(){

            jasmine.Ajax.stubRequest(
                /.*\/_vti_bin\/People\.asmx/,    // url
                /.*<SearchPrincipals .*auto_respond/          // request Search
            ).andReturn({
                status:         200,
                statusText:     'HTTP/1.1 200 OK',
                contentType:    'text/xml;charset=UTF-8',
                responseText:   searchPrincipalsResponseSuccessXML
            });

        }
    };

});

