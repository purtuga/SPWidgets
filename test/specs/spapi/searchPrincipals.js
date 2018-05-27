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

            it("has defaults.cache", function(){
                expect(searchPrincipals.defaults.cache).toBeDefined();
            });

            it("defaults.cache is set to false", function(){
                expect(searchPrincipals.defaults.cache).toBe(true);
            });

            it("has defaults.UserProfileModel", function(){
                expect(searchPrincipals.defaults.UserProfileModel).toBeDefined();
            });

        });

        describe("DATA Retrieval", function(){

            beforeEach(function(){
                this.searchReq = searchPrincipals({
                    searchText: "auto_respond"
                });
            });

            it("returns a promise", function(done){
                expect(this.searchReq.then).toBeDefined();
                this.searchReq.then(function(){
                    done();
                });
            });

            it("Promise resolved with Array", function(done){
                this.searchReq.then(function(results){
                    expect(results).toBeDefined();
                    expect(Array.isArray(results)).toBe(true);
                    done();
                });
            });
        });
    });
});
