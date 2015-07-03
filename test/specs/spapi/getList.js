define([
    "src/spapi/getList",
    "../../server/mock.soap.GetList",
    "../../server/mock.soap.WebUrlFromPageUrl"
], function(
    getList,
    mockSoapGetList,
    mockSoapWebUrlFromPageUrl
){

    describe("getList SP API", function(){

        beforeEach(function(){
            jasmine.Ajax.install();
            mockSoapWebUrlFromPageUrl.install();
            mockSoapGetList.install();
        });

        afterEach(function(){
            jasmine.Ajax.uninstall();
        });

        describe("Interface", function() {

            it("return a promise", function(){
                var req = getList({listName: "auto_respond"});
                expect(req).toBeDefined();
                expect(req.then).toBeDefined();
            });

            it("exposes defaults", function(){
                expect(getList.defaults).toBeDefined();
            });

        });

        describe("Data retrieval", function(){

            it("returns an object that is an instance of ListModel", function(done){
                getList({listName: "auto_respond"}).then(function(list){
                    expect(getList.defaults.ListModel.isInstanceOf(list)).toBe(true);
                    done();
                });
            });

            it("ListModel instance contains list definition attributes", function(done){
                getList({listName: "auto_respond"}).then(function(list){
                    expect(list.ID).toMatch("{7EE477D9-D257-47F5-A25D-A882D882E51F}");
                    expect(list.Title).toMatch("Tasks");
                    expect(list.HasUniqueScopes).toBe(false);
                    expect(list.ShowUser).toBe(true);
                    done();
                });
            });

            it("caches data by default", function(done){
                getList({listName: "auto_respond"}).then(function(list1){
                    getList({listName: "auto_respond"}).then(function(list2){
                        expect(list1 === list2).toBe(true);
                        done();
                    });
                });
            });

        });

    });

});
