define([
    "src/models/ListModel",
    "test/server/mock.soap.GetList"
], function(
    ListModel,
    mockSoapGetList
){

    var xmlDoc = (function(){
        var
        parser  = new DOMParser(),
        xmlDoc  = parser.parseFromString(mockSoapGetList.msgSuccess, "text/xml");
        return xmlDoc;
    }());

    describe("ListModel", function(){

        describe("General validations", function(){
            it("exposes defaults options", function(){
                expect(ListModel.defaults).toBeDefined();
            });

            it("instanciates", function(){
                var list = ListModel.create(xmlDoc);
                expect(ListModel.isInstanceOf(list)).toBe(true);
            });
        });

        describe("Create from XML", function(){
            beforeEach(function(){
                this.list = ListModel.create(xmlDoc, {
                    webURL: "https://test.com/sites/test"
                });
            });

            it("responds to getListUrl()", function(){
                expect("function" === typeof this.list.getListUrl).toBe(true);
            });

            it("contains list properties", function(){
                expect(this.list.Title).toBe("Tasks");
                expect(this.list.MaxItemsPerThrottledOperation).toBe("5000");
            });

            it("converts true/false strings to Boolean types", function(){
                expect(this.list.Followable).toBe(false);
                expect(this.list.ShowUser).toBe(true);
            });

            it("getSource() returns original data source", function(){
                expect(this.list.getSource()).toBe(xmlDoc);
            });
        });

        describe("Method", function(){
            beforeEach(function(){
                this.list = ListModel.create(xmlDoc, {
                    webURL: "https://test.com/sites/test"
                });
            });

            describe("getListUrl()", function(){
                it("returns full URL of list when webURL is known", function(){
                    expect(this.list.getListUrl()).toBe("https://test.com/sites/test/Lists/Tasks");
                });
                it("returns list root URL when webURL is NOT known", function(){
                    this.list = ListModel.create(xmlDoc);
                    expect(this.list.getListUrl()).toBe("/sites/test/Lists/Tasks");
                });
            });

        });
    });

});

