/**
 * widget.date.demo.js
 * Demo code for the Date widget
 *
 */
(function($){

    "use strict";
    /*global SPWIDGET_DEMO */

    SPWIDGET_DEMO.demoInitializers.push(function(){
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

        $demoCntr.find("input[name='example4']")
            .SPDateField({
                allowMultiples: true
            })
            .on("change", function(){
                output.log("Example 4: input change: " + $(this).val());
            });

        $demoCntr.find("input[name='example5']")
            .SPDateField({
                showTimepicker: true,
                datepicker:     {
                    dateFormat: "mm/dd/yy"
                }
            })
            .on("change", function(){
                output.log("Example 5: input change: " + $(this).val());
            });

        $demoCntr.find("input[name='example6']")
            .SPDateField({
                showTimepicker: true,
                allowMultiples: true
            })
            .on("change", function(){
                output.log("Example 6: input change: " + $(this).val());
            });


        $demoCntr.find("input[name='example7']")
            .SPDateField({
                showTimepicker: true,
                allowMultiples: true,
                labelAMPM:      'T. Day',
                labelTime:      'Select',
                labelMinutes:   'Min',
                labelHour:      'Hr',
                labelSet:       'Pick',
                timeUTC:        false
            })
            .on("change", function(){
                output.log("Example 7: input change: " + $(this).val());
            });

        $demoCntr.find("div.spwidget-spdatefield-demo8")
            .SPDateField({
                onSelect: function(){

                    output.log(
                        "Example 8: date change: " +
                        $(this).SPDateField("getDate").input
                    );

                }
            });

        $demoCntr.find("div.spwidget-spdatefield-demo9")
            .SPDateField({
                showTimepicker: true,
                onSelect: function() {

                    output.log(
                        "Example 9: date change: " +
                        $(this).SPDateField("getDate").input
                    );

                }
            });

    });

})(SPWIDGET_DEMO.JQUERY || jQuery);
