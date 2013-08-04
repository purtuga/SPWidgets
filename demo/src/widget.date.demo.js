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
        $demoCntr   = $cntr.find("div.spwidget-demo-samples"),
        output      = Main.setupLogOutput({ container: $cntr.find("div.spwidget-output") });
    
    
    //---------------------------------------
    
    // Create the tabs under this demo
    $cntr.find("div.spwidget-demo-tabs").tabs();
    
    // Initialize the demos
    $demoCntr.find("input[name='example1']")
        .SPDateField()
        .on("change", function(){
            output.log("Example 1: input change: " + $(this).val());
        });
    
    $demoCntr.find("input[name='example2']")
        .SPDateField({ allowMultiples: true })
        .on("change", function(){
            output.log("Example 2: input change: " + $(this).val());
        });
        
    $demoCntr.find("input[name='example3']")
        .SPDateField({
            allowMultiples: true,
            datepicker: {
                dateFormat: "dd/mm/yy"
            } 
        })
        .on("change", function(){
            output.log("Example 3: input change: " + $(this).val());
        });
    
    
})(SPWIDGET_DEMO.JQUERY || jQuery);
