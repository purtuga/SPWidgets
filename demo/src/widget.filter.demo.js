/**
 * widget.filter.demo.js
 * Demo code for the Filter Panel widget
 * 
 */
(function($){
    
    var $cntr       = $("#SPControlListFilterPanel"),
        $textarea   = $cntr.find("textarea"),
        $demoCntr   = $cntr.find("div.spwidgets-list-filter"),
        $sliderVal  = $cntr.find("div.spwidgets-list-filter-slider-value");
    
    $cntr.find("div.spwidgets-list-filter-width")
        .slider({
            orientation: "horizontal",
            min: 10,
            max: 100,
            value: 100,
            slide: function(ev, ui){
                
                $demoCntr.css("width", ui.value + "%");
                $sliderVal.html(ui.value + "%");
                
            }
        });
    
    $demoCntr
        .SPFilterPanel({
            list: "Tasks",
            columns: [
                'Title', 'Status', 'Priority', 
                'PercentComplete', 'AssignedTo', 
                'Predecessors' ],
            onFilterClick: function(filters){
                
                $textarea.val( vkbeautify.xml( filters.CAMLQuery ) );
                
            }
        });
    
})(SPWIDGET_DEMO.JQUERY || jQuery);
