define([
    "src/sputils/doesMsgHaveError",
    "vendor/jsutils/parseXML",
    "text!../../server/soapMsgs/login.operation.response.noError.xml",
    "text!../../server/soapMsgs/error.faultcode.xml",
    "text!../../server/soapMsgs/error.ErrorCode.good.xml",
    "text!../../server/soapMsgs/error.ErrorCode.bad.xml",
    "text!../../server/soapMsgs/error.copyResult.xml"
], function(
    doesMsgHaveError,
    parseXML,
    msgNoError,
    msgFaultcode,
    msgErrorCodeGood,
    msgErrorCodeBad,
    msgCopyResult
){

    describe("doesMsgHaveError", function(){

        it("is a function", function(){
            expect(typeof doesMsgHaveError).toMatch("function");
        });

        it("finds bad ErrorCode", function(){
            var xml = parseXML(msgErrorCodeBad);
            expect(doesMsgHaveError(xml)).toBe(true);
        });

        it("Ignores good ErrorCode", function(){
            var xml = parseXML(msgErrorCodeGood);
            expect(doesMsgHaveError(xml)).toBe(false);
        });

        it("finds faultcode", function(){
            var xml = parseXML(msgFaultcode);
            expect(doesMsgHaveError(xml)).toBe(true);
        });

        it("finds CopyResult ErrorMessage", function(){
            var xml = parseXML(msgCopyResult);
            expect(doesMsgHaveError(xml)).toBe(true);
        });
    });

});