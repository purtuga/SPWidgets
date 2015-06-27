define([
    "src/models/ListItemModel"
], function(ListItemModel){

    describe("ListItemModel", function(){

        describe("Instances", function(){
            beforeEach(function(){
                this.itemObj = {
                    Name:   "Test item",
                    ID:     "123"
                };
                this.listItem = ListItemModel.create({itemData: this.itemObj});
            });

            it("has properties defined on input", function(){
                expect(this.listItem).toEqual(this.itemObj);
            });
        });

    });

});
