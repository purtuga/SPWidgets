define([
    "src/spapi/getListItems",
    "test/server/mock.soap.webUrlFromPageUrl",
    "test/server/mock.soap.getListItems"
], function(
    getListItems,
    mockSoapWebUrlFromPageUrl,
    mockSoapGetListItems
){

    describe("getListItems", function(){

        beforeEach(function(){
            jasmine.Ajax.install();
            mockSoapWebUrlFromPageUrl.install();
            mockSoapGetListItems.install();
        });

        afterEach(function(){
            jasmine.Ajax.uninstall();
        });

        //----------------------------------------------

        it("is a function", function(){
            expect(typeof getListItems).toMatch("function");
        });

        it("exposes defaults", function(){
            expect(getListItems.defaults).toBeDefined();
        });

        it("returns array with rows found", function(done){

            getListItems({
                listName:   "someList",
                CAMLQuery:  "<Query>auto_respond</Query>"
            }).then(function(rows, jqXHR, status){
                expect(rows).toBeDefined();
                expect(Array.isArray(rows)).toBe(true);
                expect(rows.length).toBe(1);

                expect(jqXHR).toBeDefined();
                expect(jqXHR.responseText).toBeDefined();

                expect(status).toBe("success");
                done();
            });

        });

        it("has properties set on each row found (getListItems)", function(done){
            getListItems({
                listName:   "someList",
                CAMLQuery:  "<Query>auto_respond</Query>"
            }).then(function(rows, jqXHR, status){
                var row1 = rows[0];
                expect(row1).toBeDefined();
                expect(row1.Status).toBe("Not Started");
                done();
            });
        });

        it("has properties set on each row found (getListItemsChangeSinceToken)", function(done){
            getListItems({
                listName:   "someList",
                CAMLQuery:  "<Query>auto_respond</Query>",
                operation:  "GetListItemChangesSinceToken"
            }).then(function(rows, jqXHR, status){
                var row1 = rows[0];
                expect(row1).toBeDefined();
                expect(row1.Status).toBe("Not Started");
                done();
            });
        });

    });

});