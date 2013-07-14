/**
 * widget.board.demo.js
 * Code for the board widget demo.
 */
(function($){
    
    // Kan-Ban Board
    $("#SPControlBoardDemo div.spwidget-board-demo-cntr")
        .on("spwidget:boardColumnChange", function(ev, $board, colObj){
            
            try {
                
                console.log("spwidget:boardColumnChange = Columns changed:" + colObj.join(" | "));
                
            } catch(e) {}
            
        })
        .SPShowBoard({
            list:                   "Tasks",
            field:                  "Status",
            showColPicker:          true,
            colPickerLabel:         "Choose Columns",
            colPickerCloseLabel:    "Close Picker",
            colPickerApplyLabel:    "Change"
        });
    
})(SPWIDGET_DEMO.JQUERY || jQuery);
