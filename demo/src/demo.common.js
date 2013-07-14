/**
 * @fileOverview demo.common.js
 * Common file for all demos. Initiates the UI on the page.
 * 
 * @version _BUILD_VERSION_NUMBER_
 * 
 */
(function($){
    
    var Main = SPWIDGET_DEMO;
    
    Main.$ui = $("#sp_control_upload_demo_cntr")
            .css({
                padding:    '1em',
                minHeight:  '400px'
            })
            .on("keyup", function(ev){
                
                if (ev.which === 13) {
                    ev.preventDefault();
                    ev.stopPropagation();
                }
                
            });
    
    // Create TABs and make ui visible
    Main.$ui.find("#ptTabsCntr")
        .tabs({
            activate: function(ev,ui){
                
                // If Board? then redraw it.
                if (ui.newPanel.is("#SPControlBoardDemo")) {
                    
                    $("#SPControlBoardDemo div.spwidget-board-demo-cntr")
                        .SPShowBoard("redraw");
                        
                }
                
            } //end: activate()
        })
        .fadeIn("slow");
    
})(SPWIDGET_DEMO.JQUERY || jQuery);
