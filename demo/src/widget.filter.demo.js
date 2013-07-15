/**
 * widget.filter.demo.js
 * Demo code for the Filter Panel widget
 * 
 */
(function($){
    
    var Main        = SPWIDGET_DEMO,
        $cntr       = $("#SPControlListFilterPanel"),
        $textarea   = $cntr.find("textarea"),
        $demoCntr   = $cntr.find("div.spwidgets-list-filter"),
        $sliderVal  = $cntr.find("div.spwidgets-list-filter-slider-value");
    
    
    
    /**
     * Gets the list of columns names by using the Edit form
     * 
     * @param {Object} listName
     * 
     * @return {jQuery.Promise}
     */
    function getListColumns(listName){
        
        return $.Deferred(function(dfd){
            
            $('<div style="display:none;"/>')
                .load(
                    String(
                            $().SPServices.SPGetCurrentSite() +
                            "/Lists/" + listName + "/NewForm.aspx"
                        )
                        .replace(/ /, "%20") +
                        " .ms-formtable",
                    function(){
                        
                        var $ele = $(this),
                            cols = ['ID'];
                        
                        $ele.find(".ms-standardheader").each(function(){
                            
                            cols.push( $.trim( $(this).text().replace(/ \*/, "") ) );
                            
                        });
                        
                        dfd.resolveWith($, [cols]);
                        
                        $ele.remove();  
                        
                    }
                );
            
        })
        .promise();
        
    } //end: getListColumns()
    
    
    
    //---------------------------------------
    
    // Insert the set of Lists on this site and when user
    // selects one, get is list of columns and display a filter
    // panel for it.
    Main.insertListSelector({
        container:          $cntr.find("div.spwidgets-demo-lists"),
        includeLibraries:   false,
        onListSelect:       function($listInfo){
            
            var listName = $listInfo.find("Title").text();
            
            getListColumns(listName).then(function(columns){
                
                $demoCntr
                    .empty()
                    .SPFilterPanel({
                        list:       listName,
                        columns:    columns,
                        onFilterClick: function(filters){
                            
                            $textarea.val( vkbeautify.xml( filters.CAMLQuery ) );
                            
                        }
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
    
    
})(SPWIDGET_DEMO.JQUERY || jQuery);
