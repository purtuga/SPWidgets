define([
    "src/spapi/getListColumns",
    "src/models/ListModel",
    "test/server/mock.soap.GetList",
    "test/server/mock.soap.getListItems",
    "test/server/mock.soap.WebUrlFromPageUrl"
],
function(
    getListColumns,
    ListModel,
    mockSoapGetList,
    mockSoapGetListItems,
    mockSoapWebUrlFromPageUrl
){

    describe("getListColumns", function(){

        beforeEach(function(){
            jasmine.Ajax.install();
            mockSoapGetList.install();
            mockSoapGetListItems.install();
            mockSoapWebUrlFromPageUrl.install();
        });

        afterEach(function(){
            jasmine.Ajax.uninstall();
        });

        describe("General", function(){
            it("exposes defaults", function(){
                expect(getListColumns.defaults).toBeDefined();
            });

            it("returns a promise", function(){
                expect(getListColumns({listName: "auto_respond"}).then).toBeDefined();
            });
        });

        describe("data retrieval", function(){

            beforeEach(function(){
                this.colPromise = getListColumns({
                    listName: "auto_respond"
                });
            });

            it("resolves with an array", function(done){
                this.colPromise.then(function(cols){
                    expect(Array.isArray(cols)).toBe(true);
                    expect(cols.length).toBeGreaterThan(0);
                    done();
                });
            });

            it("result array has getColumn() method", function(done){
                this.colPromise.then(function(cols){
                    expect(cols.getColumn).toBeDefined();
                    done();
                });
            });

            it("result array getColumn() returns ListColumnModel", function(done){
                this.colPromise.then(function(cols){
                    var col = cols.getColumn("Status");
                    expect(col).toBeDefined();
                    expect(getListColumns.defaults.ListColumnModel.isInstanceOf(col)).toBe(true);
                    done();
                });
            });

            it("contains an object for each columns", function(done){
                this.colPromise.then(function(cols){
                    var col1 = cols[0];
                    expect(typeof col1).toMatch("object");
                    expect(col1.Name).toMatch("Title");
                    done();
                });
            });

            it("each column exposes method getColumnValues()", function(done){
                this.colPromise.then(function(cols){
                    expect(cols[0].getColumnValues).toBeDefined();
                    done();
                });
            });

            it("does not return columns internal columns", function(done){
                this.colPromise.then(function(cols){
                    // col ContentTypeId has Hidden=TRUE
                    expect(cols.some(function(col){return col.Name === "ContentTypeId";})).toBe(false);
                    // col: AppAuthor has List=AppPrincipals
                    expect(cols.some(function(col){return col.Name === "AppAuthor";})).toBe(false);
                    // Col: ItemChildCount has List=Docs
                    expect(cols.some(function(col){return col.Name === "ItemChildCount";})).toBe(false);
                    // COL: Edit - Has AuthoringInfo
                    expect(cols.some(function(col){return col.Name === "Edit";})).toBe(false);
                    done();
                });
            });

            it("does not have internal __xmlNode (legacy code)", function(done){
                this.colPromise.then(function(cols){
                    expect(cols[0].___xmlNode).not.toBeDefined();
                    done();
                });
            });

            it("Choice Column: getColumnValues() returns Promise", function(done){
                this.colPromise.then(function(cols){
                    var col;
                    cols.some(function(c){
                        if (c.Name === "Status") {
                            col = c;
                            return true;
                        }
                    });
                    var colValuesPromise = col.getColumnValues();
                    expect(colValuesPromise.then).toBeDefined();
                    done();
                });
            });

            it("Choice Column: getColumnValues() returns allowed values", function(done){
                this.colPromise.then(function(cols){
                    var col;
                    cols.some(function(c){
                        if (c.Name === "Status") {
                            col = c;
                            return true;
                        }
                    });
                    col.getColumnValues().then(function(values) {
                        expect(values.length).toEqual(5);
                        done();
                    });
                });
            });


            it("Lookup Column: getColumnValues() returns allowed values", function(done){
                this.colPromise.then(function(cols){
                    var col;
                    cols.some(function(c){
                        if (c.Name === "Regions") {
                            col = c;
                            return true;
                        }
                    });
                    col.getColumnValues().then(function(values){
                        expect(values.length).toBeGreaterThan(0);
                        done();
                    });
                });
            });

            it(".getList() returns a ListModel", function(done){
                this.colPromise.then(function(cols){
                    expect(cols.getList).toBeDefined();
                    expect(ListModel.isInstanceOf(cols.getList())).toBe(true);
                    done();
                });
            });

            it("Each column definition .getList() returns a ListModel", function(done){
                this.colPromise.then(function(cols){
                    expect(cols[0].getList).toBeDefined();
                    expect(ListModel.isInstanceOf(cols[0].getList())).toBe(true);
                    done();
                });
            });

        });

    });

});
