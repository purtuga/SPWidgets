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
                var list = ListModel.create({
                    fromXML: xmlDoc
                });
                expect(ListModel.isInstanceOf(list)).toBe(true);
            });
        });

        describe("Create from XML", function(){
            beforeEach(function(){
                this.list = ListModel.create({
                    fromXML: xmlDoc
                });
            });

            it("contains list properties", function(){
                expect(this.list.Title).toBe("Tasks");
                expect(this.list.MaxItemsPerThrottledOperation).toBe("5000");
            });

            it("converts true/false strings to Boolean types", function(){
                expect(this.list.Followable).toBe(false);
                expect(this.list.ShowUser).toBe(true);
            });

            it("getRawSource() returns original data source", function(){
                expect(this.list.getRawSource()).toBe(xmlDoc);
            });
        });

    });

});

