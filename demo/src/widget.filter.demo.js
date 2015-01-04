/**
 * widget.filter.demo.js
 * Demo code for the Filter Panel widget
 *
 */
(function($){

    /* global SPWIDGET_DEMO, vkbeautify */

    SPWIDGET_DEMO.demoInitializers.push(function(){
        var Main        = SPWIDGET_DEMO,
            $cntr       = $("#SPControlListFilterPanel"),
            $textarea   = $cntr.find("textarea"),
            $demoCntr   = $cntr.find("div.spwidgets-list-filter"),
            $sliderVal  = $cntr.find("div.spwidgets-list-filter-slider-value"),
            $results    = $cntr.find("div.spwidgets-demo-filter-result-output");


        //---------------------------------------

        // Create the tabs under this demo
        $cntr.find("div.spwidget-demo-tabs").tabs();


        // Insert the set of Lists on this site and when user
        // selects one, get is list of columns and display a filter
        // panel for it.
        Main.insertListSelector({
            container:          $cntr.find("div.spwidgets-demo-lists"),
            includeLibraries:   false,
            onListSelect:       function($listInfo){

                var listName = $listInfo.find("Title").text();

                $results.html("");

                // Get a list of columns for this list and then
                // display a filter panel for them.
                Main.getListColumns(listName).then(function(columns){

                    var tblHeader   = '',
                        rowTemplate = '',
                        camlFields  = '';

                    $demoCntr
                        .empty()
                        .SPFilterPanel({
                            list:       listName,
                            columns:    columns,
                            height:     "25em",
                            onFilterClick: function(filters){

                                var query = '<Query><Where>' +
                                                filters.CAMLQuery +
                                                '</Where>' +
                                                filters.CAMLOrderBy +
                                            '</Query>';
                                $textarea.val(
                                    vkbeautify.xml( query ) +
                                    "\n\n--------------------------\n" +
                                    decodeURIComponent(filters.URLParams)
                                );

                                $results.html("<p>Loading...</p>");

                                // Retrieve data from this list using the
                                // filter defined by the user
                                $.SPWidgets.SPAPI.getListItems({
                                    listName:       listName,
                                    async:          true,
                                    cacheXML:       true,
                                    CAMLQuery:      query,
                                    CAMLRowLimit:   10,
                                    CAMLViewFields: camlFields,
                                    completefunc:   function(xData, status, rows){

                                        $results.html(
                                            "<table width='98%' class='ui-widget-content'>" +
                                                tblHeader +
                                                $.SPWidgets.fillTemplate(
                                                    rowTemplate,
                                                    rows
                                                ) +
                                            "</table>"
                                        );


                                    } //end: completefunc()
                                });

                            } //end: onFilterClick()
                        });


                    // Get the list definition and build the template for the
                    // output of what was found.
                    $.SPWidgets.SPAPI.getList({
                        listName:   listName,
                        cacheXML:   false,
                        async:      true,
                        completefunc: function(xData/*, status*/) {

                            var resp = $(xData.responseXML);

                            $.each(columns, function(i, col){

                                var $colXml = resp.find("Fields Field[DisplayName='" +
                                                col + "']");

                                tblHeader   += '<th class="ui-widget-content">' +
                                                col + '</th>';

                                rowTemplate += '<td class="ui-widget-content">{{' +
                                                $colXml.attr("StaticName") + '}}</td>';

                                camlFields  += '<FieldRef Name="' +
                                                $colXml.attr("StaticName") + '" />';

                                if (i === 2) {

                                    return false;

                                }

                            });

                            tblHeader   = '<tr>' + tblHeader + '</tr>';
                            rowTemplate = '<tr>' + rowTemplate + '</tr>';
                            camlFields  = '<ViewFields>' + camlFields + '</ViewFields>';

                        }//end: completefunc
                    });

                });
            }
        });


        $cntr.find("div.spwidgets-list-filter-width")
            .slider({
                orientation: "horizontal",
                min:    10,
                max:    100,
                value:  100,
                slide:  function(ev, ui){

                    $demoCntr.css("width", ui.value + "%");
                    $sliderVal.html(ui.value + "%");

                }
            });

        // Setup setFilter test
        $cntr.find('a#spwidgets_demo_filter_test_setfilter')
            .button()
            .on("click", function(/*ev*/){

                $demoCntr.SPFilterPanel("setfilter", {
                    ID: {
                        values: ["one", "two"],
                        matchType: "Contains",
                        sortOrder: "Asc"
                    }
                });

            });

        // Setup sortOrder setfilter
        $cntr.find('a#spwidgets_demo_filter_test_sortOrder')
            .button()
            .on("click", function(/*ev*/){

                $demoCntr.SPFilterPanel("setfilter", {
                    ID: {
                        sortOrder: "Asc"
                    }
                });

            });

    });

})(SPWIDGET_DEMO.JQUERY || jQuery);
