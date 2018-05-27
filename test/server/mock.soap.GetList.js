define([
    "text!./soapMsgs/list.GetList.response.success.xml"
], function(
    getListResponseSuccessXML
){

    return {

        // requests must have 'auto_respond' in the request message
        install: function(){

            jasmine.Ajax.stubRequest(
                /.*\/_vti_bin\/Lists\.asmx/,    // url
                /.*<GetList .*auto_respond/          // request Search
            ).andReturn({
                status:         200,
                statusText:     'HTTP/1.1 200 OK',
                contentType:    'text/xml;charset=UTF-8',
                responseText:   getListResponseSuccessXML,
                response:       getListResponseSuccessXML
            });

        },

        msgSuccess: getListResponseSuccessXML
    };

});

