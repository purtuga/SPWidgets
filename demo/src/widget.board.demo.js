/**
 * widget.board.demo.js
 * Code for the board widget demo.
 */
(function($){

    /* global SPWIDGET_DEMO */
    SPWIDGET_DEMO.demoInitializers.push(function(){

        var Main       = SPWIDGET_DEMO,
            $cntr       = $("#SPControlBoardDemo"),
            $boardCntr  = $cntr.find("div.spwidget-board-demo-cntr"),
            $colCntr    = $cntr.find("div.spwidgets-demo-columns"),
            $output     = $cntr.find(".spwidget-demo-code");


        // Create the tabs
        $cntr.find("div.spwidget-demo-tabs").tabs();

        // Populate the container to select a list
        Main.insertListSelector({
            container: $cntr.find("div.spwidgets-demo-lists"),
            onListSelect: function($list){

                var listName = $list.find("Title").text();

                $colCntr.empty();
                $boardCntr.empty();

                // Insert the column picker
                Main.insertListColumnSelector({
                    container:      $colCntr,
                    listName:       listName,
                    onColumnSelect: function(columnName){

                        // Kan-Ban Board
                        $("<div/>")
                            .appendTo( $boardCntr.empty() )
                            .on("spwidget:boardColumnChange", function(ev, $board, colObj){

                                $output.append(
                                    "<div>spwidget:boardColumnChange = Columns changed:" +
                                    colObj.join(" | ") + "</div>");

                            })
                            .SPShowBoard({
                                list:                   listName,
                                field:                  columnName,
                                showColPicker:          true,
                                colPickerLabel:         "Choose Columns",
                                colPickerCloseLabel:    "Close Picker",
                                colPickerApplyLabel:    "Change",
                                height:                 "500px"
                            });

                    }
                });

            }//end: insertListSelector.onListSelect()
        });

    });


})(SPWIDGET_DEMO.JQUERY || jQuery);
