/**
 * widget.lookup.demo.js
 * Code for the lookup field widget.
 */
(function($){
    
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
                .html(lookupTmplt)
                .find("input[name='example1']")
                    .change(function(){
                        
                        $output.append(
                            "<div>Exmaple 1 input Value: " +
                            $(this).val() + "</div>");
                        
                    })
                    .SPLookupField({
                        list:           listName,
                        allowMultiples: false
                    })
                    .end()
                .find("input[name='example2']")
                    .change(function(){
                        
                        $output.append(
                            "<div>Exmaple 2 input Value: " +
                            $(this).val() + "</div>");
                        
                    })
                    .SPLookupField({
                        list:           listName,
                        allowMultiples: true
                    });
                
        }
    });
    
    
})(SPWIDGET_DEMO.JQUERY || jQuery);
