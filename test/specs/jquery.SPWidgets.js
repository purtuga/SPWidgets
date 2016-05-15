define(["jquery", "src/SPWidgets"], function($){

    describe("SPWidgets as a jQuery Plugin", function(){

        describe("Utilities available under $.SPWidgets", function(){
            it("has correct count of utilities", function(){
                // If this errors, then we added new methods,
                // but forgot to update this file to include a test case for it.
                var countUnderSPWidgtes = Object.keys($.SPWidgets).length;
                var countUnderSPAPI     = Object.keys($.SPWidgets.SPAPI).length;
                expect(countUnderSPWidgtes + countUnderSPAPI).toEqual(24);
            });
            it("defines SPWidgets namespace in jQuery namespace", function(){
                expect($.SPWidgets).toBeDefined();
            });
            it("includes defaults object", function(){
                expect($.SPWidgets.defaults).toBeDefined();
            });
            it("includes version", function(){
                expect($.SPWidgets.version).toBeDefined();
            });
            it("includes escapeXML", function(){
                expect($.SPWidgets.escapeXML).toBeDefined();
            });
            it("includes fillTemplate", function(){
                expect($.SPWidgets.fillTemplate).toBeDefined();
            });
            it("includes getCamlLogical", function(){
                expect($.SPWidgets.getCamlLogical).toBeDefined();
            });
            it("includes getSPVersion", function(){
                expect($.SPWidgets.getSPVersion).toBeDefined();
            });
            it("includes parseDateString", function(){
                expect($.SPWidgets.parseDateString).toBeDefined();
            });
            it("includes parseLookupFieldValue", function(){
                expect($.SPWidgets.parseLookupFieldValue).toBeDefined();
            });
            it("includes SPGetDateString", function(){
                expect($.SPWidgets.SPGetDateString).toBeDefined();
            });
            it("includes makeSameHeight", function(){
                expect($.SPWidgets.makeSameHeight).toBeDefined();
            });
            it("includes getRuntimeInfo", function(){
                expect($.SPWidgets.getRuntimeInfo).toBeDefined();
            });
            it("includes SPAPI", function(){
                expect($.SPWidgets.SPAPI).toBeDefined();
            });
            it("includes SPAPI.getList", function(){
                expect($.SPWidgets.SPAPI.getList).toBeDefined();
            });
            it("includes SPAPI.getListColumns", function(){
                expect($.SPWidgets.SPAPI.getListColumns).toBeDefined();
            });
            it("includes SPAPI.getListFormCollection", function(){
                expect($.SPWidgets.SPAPI.getListFormCollection).toBeDefined();
            });
            it("includes SPAPI.getListItems", function(){
                expect($.SPWidgets.SPAPI.getListItems).toBeDefined();
            });
            it("includes SPAPI.getSiteListCollection", function(){
                expect($.SPWidgets.SPAPI.getSiteListCollection).toBeDefined();
            });
            it("includes SPAPI.getSiteUrl", function(){
                expect($.SPWidgets.SPAPI.getSiteUrl).toBeDefined();
            });
            it("includes SPAPI.getUserProfile", function(){
                expect($.SPWidgets.SPAPI.getUserProfile).toBeDefined();
            });
            it("includes SPAPI.resolvePrincipals", function(){
                expect($.SPWidgets.SPAPI.resolvePrincipals).toBeDefined();
            });
            it("includes SPAPI.searchPrincipals", function(){
                expect($.SPWidgets.SPAPI.searchPrincipals).toBeDefined();
            });
            it("includes SPAPI.getNodesFromXml", function(){
                expect($.SPWidgets.SPAPI.getNodesFromXml).toBeDefined();
            });
        });

        describe("Widgets available under $.fn", function(){
            it("includes SPShowBoard", function(){
                expect($.fn.SPShowBoard).toBeDefined();
            });
            it("includes SPDateField", function(){
                expect($.fn.SPDateField).toBeDefined();
            });
            it("includes SPLookupField", function(){
                expect($.fn.SPLookupField).toBeDefined();
            });
            it("includes pickSPUser", function(){
                expect($.fn.pickSPUser).toBeDefined();
            });
            it("includes SPFilterPanel", function(){
                expect($.fn.SPFilterPanel).toBeDefined();
            });
            it("includes SPControlUpload", function(){
                expect($.fn.SPControlUpload).toBeDefined();
            });
            it("includes SPGetMsgError", function(){
                expect($.fn.SPGetMsgError).toBeDefined();
            });
            it("includes SPMsgHasError", function(){
                expect($.fn.SPMsgHasError).toBeDefined();
            });
        });

    });

});
