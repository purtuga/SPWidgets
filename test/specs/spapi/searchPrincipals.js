define([
    "src/spapi/searchPrincipals",
    "test/server/mock.soap.webUrlFromPageUrl",
    "../../server/mock.soap.SearchPrincipals"
], function(
    searchPrincipals,
    mockSoapWebUrlFromPageUrl,
    mockSoapSearchPrincipals
){

    describe("SearchPrincipals SP API", function(){

        beforeEach(function(){
            jasmine.Ajax.install();
            mockSoapWebUrlFromPageUrl.install();
            mockSoapSearchPrincipals.install();
        });

        afterEach(function(){
            jasmine.Ajax.uninstall();
        });

        describe("Method API", function(){
            it("is a function", function(){
                expect(typeof searchPrincipals).toMatch("function");
            });

            it("exposes defaults", function(){
                expect(searchPrincipals.defaults).toBeDefined();
            });

            it("has defaults.searchText", function(){
                expect(searchPrincipals.defaults.searchText).toBeDefined();
            });

            it("has defaults.maxResults", function(){
                expect(searchPrincipals.defaults.maxResults).toBeDefined();
            });

            it("defaults.maxResults is a Number", function(){
                expect(typeof searchPrincipals.defaults.maxResults).toMatch("number");
            });

            it("has defaults.principalType", function(){
                expect(searchPrincipals.defaults.principalType).toBeDefined();
            });

            it("has defaults.webURL", function(){
                expect(searchPrincipals.defaults.webURL).toBeDefined();
            });

            it("has defaults.cacheXML", function(){
                expect(searchPrincipals.defaults.cacheXML).toBeDefined();
            });

            it("defaults.cacheXML is set to false", function(){
                expect(searchPrincipals.defaults.cacheXML).toBe(false);
            });

            it("has defaults.async", function(){
                expect(searchPrincipals.defaults.async).toBeDefined();
            });

            it("defaults.async is set to true", function(){
                expect(searchPrincipals.defaults.async).toBe(true);
            });

            it("has defaults.completefunc", function(){
                expect(searchPrincipals.defaults.completefunc).toBeDefined();
            });
        });

        describe("DATA Retrieval", function(){

            beforeEach(function(){
                this.searchReq = searchPrincipals({
                    searchText: "auto_respond"
                });
            });

            it("returns a promise", function(){
                expect(this.searchReq.then).toBeDefined();
            });

            it("Promise resolved with 2 arguments", function(done){
                this.searchReq.then(function(xData, status){
                    expect(xData).toBeDefined();
                    expect(xData.responseXML).toBeDefined();
                    expect(status).toBeDefined();
                    expect(typeof status).toMatch("string");
                    done();
                });
            });

            it("Results are XML", function(done){
                this.searchReq.then(function(xData){
                    expect(xData.responseXML instanceof XMLDocument).toBe(true);
                    expect(xData.responseXML.querySelectorAll("PrincipalInfo").length).toBe(2);
                    done();
                });
            });

        });

    });

});
