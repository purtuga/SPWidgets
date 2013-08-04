/**
 * widget.date.demo.js
 * Demo code for the Date widget
 * 
 */
(function($){
    
    "use strict";
    /*jslint nomen: true, plusplus: true */
    /*global SPWidgets, SPWIDGET_DEMO */
    
    
    var Main        = SPWIDGET_DEMO,
        $cntr       = $("#SPDateField"),
        $demoCntr   = $cntr.find("div.spwidget-demo-samples");
    
    
    //---------------------------------------
    
    // Create the tabs under this demo
    $cntr.find("div.spwidget-demo-tabs").tabs();
    
    
    // Initialize the demos
    $demoCntr.find("input[name='example1']")
        .SPDateField();
    
    
})(SPWIDGET_DEMO.JQUERY || jQuery);
