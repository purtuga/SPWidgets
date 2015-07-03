define([
    "text!./soapMsgs/list.GetListItems.response.success.xml",
    "text!./soapMsgs/list.GetListItemsChangesSinceTokenResponse.response.success.xml"
], function(
    getListItemsResponseSuccessXML,
    getListItemsChangesSinceTokenResponseSuccessXML
){

    return {
        // requests must have 'auto_respond' in the request message
        install: function(){

            jasmine.Ajax.stubRequest(
                /.*\/_vti_bin\/Lists\.asmx/,    // url
                /.*<GetListItems .*auto_respond/          // request Search
            ).andReturn({
                status:         200,
                statusText:     'HTTP/1.1 200 OK',
                contentType:    'text/xml;charset=UTF-8',
                responseText:   getListItemsResponseSuccessXML
            });

            jasmine.Ajax.stubRequest(
                /.*\/_vti_bin\/Lists\.asmx/,    // url
                /.*<GetListItemChangesSinceToken .*auto_respond/          // request Search
            ).andReturn({
                status:         200,
                statusText:     'HTTP/1.1 200 OK',
                contentType:    'text/xml;charset=UTF-8',
                responseText:   getListItemsChangesSinceTokenResponseSuccessXML
            });

        }
    };

});

