define([
    "src/sputils/getMsgError",
    "vendor/jsutils/parseXML",
    "text!../../server/soapMsgs/login.operation.response.noError.xml",
    "text!../../server/soapMsgs/error.faultcode.xml",
    "text!../../server/soapMsgs/error.ErrorCode.good.xml",
    "text!../../server/soapMsgs/error.ErrorCode.bad.xml",
    "text!../../server/soapMsgs/error.copyResult.xml"
], function(
    getMsgError,
    parseXML,
    msgNoError,
    msgFaultcode,
    msgErrorCodeGood,
    msgErrorCodeBad,
    msgCopyResult
){

    describe("getMsgError", function(){

        it("is a function", function(){
            expect(typeof getMsgError).toMatch("function");
        });

        it("finds ErrorCode", function(){
            var xml = parseXML(msgErrorCodeBad);
            expect(getMsgError(xml)).toMatch(/Some error message/);
        });

        it("finds faultcode", function(){
            var xml = parseXML(msgFaultcode);
            expect(getMsgError(xml)).toMatch(/Exception of type/);
            expect(getMsgError(xml)).toMatch(/0x81020067/);
        });

        it("finds CopyResult ErrorMessage", function(){
            var xml = parseXML(msgCopyResult);
            expect(getMsgError(xml)).toMatch(/Some Message here/);
            expect(getMsgError(xml)).toMatch(/err101/);
        });
    });

});