define([
    "src/spapi/getListFormCollection",
    "../../server/mock.soap.GetListFormCollection",
    "../../server/mock.soap.WebUrlFromPageUrl"
], function(
    getListFormCollection,
    mockSoapGetListFormCollection,
    mockSoapWebUrlFromPageUrl
){

    describe("getListFormCollection SP API", function(){

        beforeEach(function(){
            jasmine.Ajax.install();
            mockSoapWebUrlFromPageUrl.install();
            mockSoapGetListFormCollection.install();
        });

        afterEach(function(){
            jasmine.Ajax.uninstall();
        });

        describe("Interface", function() {

            it("return a promise", function(){
                var req = getListFormCollection({listName: "auto_respond"});
                expect(req).toBeDefined();
                expect(req.then).toBeDefined();
            });

            it("exposes defaults", function(){
                expect(getListFormCollection.defaults).toBeDefined();
            });

        });

        describe("Data retrieval", function(){

            it("resolves to an array", function(done){
                getListFormCollection({listName: "auto_respond"}).then(function(forms){
                    expect(Array.isArray(forms)).toBe(true);
                    done();
                }).catch(function (err) {
                    console.log(err);
                    console.log(err.stack);
                });
            });

            it("Array contains objects with forms", function(done){
                getListFormCollection({listName: "auto_respond"}).then(function(forms){
                    expect(typeof forms[0]).toBe("object");
                    done();
                });
            });

            it("Array objects contains type and url attributes", function(done){
                getListFormCollection({listName: "auto_respond"}).then(function(forms){
                    expect(forms[0].url).toBeDefined();
                    expect(forms[0].type).toBeDefined();
                    done();
                });
            });

            it("Form url attribute starts with http", function(done){
                getListFormCollection({listName: "auto_respond"}).then(function(forms){
                    expect(forms[0].url.toLowerCase().indexOf('http') === 0).toBe(true);
                    done();
                });
            });

        });
    });
});
