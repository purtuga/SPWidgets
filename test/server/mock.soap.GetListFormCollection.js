define([
    "text!./soapMsgs/forms.GetListFormCollection.response.success.xml"
], function(
    getListFormCollectionXML
){

    return {

        // requests must have 'auto_respond' in the request message
        install: function(){
            jasmine.Ajax.stubRequest(
                /.*\/_vti_bin\/Forms\.asmx/,            // url
                /.*<GetFormCollection .*auto_respond/   // request Search
            ).andReturn({
                status:         200,
                statusText:     'HTTP/1.1 200 OK',
                contentType:    'text/xml;charset=UTF-8',
                responseText:   getListFormCollectionXML,
                response:       getListFormCollectionXML
            });

        },

        msgSuccess: getListFormCollectionXML
    };

});

