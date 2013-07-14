/**
 * widget.lookup.demo.js
 * Code for the lookup field widget.
 */
(function($){
    
    var $ele = $("#SPControlLookupFieldDemo")
    
    $ele
        .find("input[name='State']")
            .SPLookupField({
                list: "states",
                allowMultiples: false
            })
            .end()
        .find("input[name='State2']")
            .SPLookupField({
                list: "states",
                allowMultiples: true
            })
            .end();
    
})(SPWIDGET_DEMO.JQUERY || jQuery);
