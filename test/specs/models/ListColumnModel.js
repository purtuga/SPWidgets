define([
    "src/models/ListColumnModel"
],
function(
    ListColumnModel
){

    var xmlField = (function(){
        var
        parser  = new DOMParser(),
        xml  = parser.parseFromString(
            '<Field ID="{a8eb573e-9e11-481a-a8c9-1104a54b2fbd}" Type="Choice" Name="Priority" DisplayName="Priority" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="Priority" ColName="nvarchar3">' +
                '<CHOICES>' +
                    '<CHOICE>(1) High</CHOICE>' +
                    '<CHOICE>(2) Normal</CHOICE>' +
                    '<CHOICE>(3) Low</CHOICE>' +
                '</CHOICES>' +
                '<MAPPINGS>' +
                    '<MAPPING Value="1">(1) High</MAPPING>' +
                    '<MAPPING Value="2">(2) Normal</MAPPING>' +
                    '<MAPPING Value="3">(3) Low</MAPPING>' +
                '</MAPPINGS>' +
                '<Default>(2) Normal</Default>' +
            '</Field>', "text/xml");
        return xml;
    }());

    describe("ListColumnModel", function(){

        beforeEach(function(){
            beforeEach(function(){
                this.col = ListColumnModel.create(
                    {
                        ID:             "{a8eb573e-9e11-481a-a8c9-1104a54b2fbd}",
                        Type:           "Choice",
                        Name:           "Priority",
                        DisplayName:    "Priority",
                        SourceID:       "http://schemas.microsoft.com/sharepoint/v3",
                        StaticName:     "Priority",
                        ColName:        "nvarchar3",
                        MyBoolean:      "True"
                    },
                    {
                        source: xmlField
                    }
                );
            });
        });

        it("exposes defaults", function(){
            expect(ListColumnModel.defaults).toBeDefined();
        });

        it("Returns a ListcolumnModel instance", function(){
            expect(ListColumnModel.isInstanceOf(this.col)).toBe(true);
        });

        it("has object propertis for the column", function(){
            expect(this.col.Type).toMatch("Choice");
            expect(this.col.DisplayName).toMatch("Priority");
            expect(this.col.MyBoolean).toMatch("True");
        });

        it("has .getColumnValues() method", function(){
            expect(this.col.getColumnValues).toBeDefined();
        });

        it(".getColumnValues() returns array of values for CHOICE column", function(){
            expect(this.col.getColumnValues().length).toBe(3);
        });

        // FYI: the actual checking that this method returns values is done in getListColumn()

    });

});
