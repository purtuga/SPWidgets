/**
 * widget.lookup.demo.js
 * Code for the lookup field widget.
 */
(function($){

    /* global SPWIDGET_DEMO */
    SPWIDGET_DEMO.demoInitializers.push(function(){
        var Main        = SPWIDGET_DEMO,
            $cntr       = $("#SPControlLookupFieldDemo"),
            $lookups    = $cntr.find("div.spwidgets-demo-lookup-examples"),
            lookupTmplt = '',
            $output     = $cntr.find(".spwidget-demo-code");


        $cntr.find("div.spwidget-demo-tabs").tabs();

        lookupTmplt = $lookups.html();

        $lookups.empty();

        Main.insertListSelector({
            container: $cntr.find("div.spwidgets-demo-lists"),
            onListSelect: function($list){

                var listName = $list.find("Title").text();

                $lookups
                    .html($.trim(lookupTmplt))
                    .find("input[name='example1']")
                        .change(function(){

                            $output.append(
                                "<div>Example 1 input Value: " +
                                $(this).val() + "</div>");

                        })
                        .SPLookupField({
                            list:           listName,
                            allowMultiples: false,
                            showSelector:   true
                        })
                        .end()
                    .find("input[name='example2']")
                        .change(function(){

                            $output.append(
                                "<div>Example 2 input Value: " +
                                $(this).val() + "</div>");

                        })
                        .SPLookupField({
                            list:           listName,
                            allowMultiples: true
                        })
                        .end()
                    .find("input[name='example3']")
                        .change(function(){

                            $output.append(
                                "<div>Example 3 input Value: " +
                                $(this).val() + "</div>");

                        })
                        .SPLookupField({
                            list:           listName,
                            allowMultiples: true,
                            showSelector:   true,
                            maxResults:     10,
                            listTemplate:   '#{{ID}}: {{Title}}',
                            filterOrderBy:  '<OrderBy><FieldRef Name="ID" Ascending="FALSE"/></OrderBy>',
                            onItemAdd:      function($newItemSelection, itemObject/*, widgetCntr*/){

                                $output.append(
                                "<div>Example 3 onItemAdd Event: Item ID " +
                                itemObject.ID + " was added: " +
                                itemObject.Title + "</div>");

                            },
                            onItemRemove:   function($items, itemObjects/*, $widgetCntr*/) {

                                var removedItems = "";

                                $.each(itemObjects, function(i, item){

                                    if (removedItems.length) {

                                        removedItems += " | ";

                                    }

                                    removedItems += item.Title;

                                });

                                $output.append(
                                "<div>Example 3 onItemRemove Event: [" +
                                removedItems + "] were removed!</div>");

                            }
                        })
                        .end()
                    .find(".spwidgets-demo-lookup-example3-clear-all")
                        .click(function(){

                            $lookups.find("input[name='example3']")
                                .SPLookupField("method", "clear");

                        })
                        .end();

            }
        });

    });

})(SPWIDGET_DEMO.JQUERY || jQuery);
