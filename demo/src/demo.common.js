/**
 * @fileOverview demo.common.js
 * Common file for all demos. Initiates the UI on the page.
 * 
 * @version _BUILD_VERSION_NUMBER_
 * 
 */
(function($){
    
    var Main    = SPWIDGET_DEMO;
    
    
    /**
     * Given a container element, this method will insert a
     * list of List and/or Libraries in the current site
     * for the user to select/pick one.
     * 
     * @param {Object} options
     * @param {HTMLElement|jQuery} options.container
     * @param {Boolean} [options.includeLibraries=true]
     * @param {Boolean} [options.includeLists=true]
     * @param {Function} [options.onListSelect=null]
     *      Function will have the scope of the library picker
     *      HTML element (as a jQuery object) and given 2 input
     *      parameters - 1) jQuery object with the list definition
     *      and 2) the html element that the user clicked on.
     * 
     * @return {Object} Main
     * 
     */
    Main.insertListSelector = function(options) {
        
        var opt = $.extend({}, {
                container:          null,
                includeLibraries:   true,
                includeLists:       true,
                onListSelect:       null
            },
            options);
        
        if (!opt.container) {
            
            return Main;
            
        }
        
        opt.container = $(opt.container);
        
        // Have the user pick which library to use in the demo.
        $().SPServices({
            operation:  "SiteDataGetListCollection",
            async:      false,
            cacheXML:   true,
            completefunc: function (xData, Status) {
                
                var $siteLists  = $(xData.responseXML),
                    htmlList    = '';
                
                opt._lists = null;
                
                // Get a set (array) of lists to work with
                if (opt.inclueLibraries && opt.includeLists) {
                    
                    opt._lists = $siteLists.find("_sList");
                    
                } else if (opt.inclueLibraries) {
                    
                    opt._lists = $siteLists
                                .find("_sList BaseType:contains('DocumentLibrary')")
                                    .parent();
                    
                } else if (opt.includeLists) {
                    
                    opt._lists = $siteLists
                                .find("_sList BaseType:contains('GenericList')")
                                    .parent();
                    
                } else {
                    
                    return Main;
                    
                }
                
                // If no lists define, then exit
                if (!opt._lists || !opt._lists.length) {
                    
                    return Main;
                    
                }
                
                // Loop through all lists and build the UI for it.
                opt._lists.each(function(){
                    
                    var $list = $(this);
                    
                    htmlList +=
                        '<a href="javascript:" class="ui-state-default" data-list_uid="' +
                         $.trim($list.find("InternalName").text()) +
                         '" data-list_name="' +
                         $list.find("Title").text() + '">' +
                         $list.find("Title").text() + ' </a>';
                         
                });
                
                $('<div class="spwidgets-demo-list-picker"></div>')
                    .appendTo(opt.container)
                    .append(htmlList)
                    .on("click", "a", function(ev){
                        
                        var $this   = $(this),
                            $list   = opt._lists
                                        .find(
                                            "_sList InternalName:contains('" +
                                            $this.data("list_uid") + "')" 
                                        )
                                        .parent();
                        
                        if ($.isFunction(opt.onListSelect)) {
                            
                            opt.onListSelect.call(
                                opt.container, $list, $this);
                            
                        }
                        
                    });
                
            }//end: completefunc()
        });

        return Main;
        
    }; //end: Main.insertListSelector();
    
    
    
    Main.$ui = $("#spwidgets_demo_cntr")
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
    
    
})( (function($){ /* function return jQuery to closure above */
    
    var styles = '__BUILD:STYLES__';
    
    $('<style type="text/css">' + styles + "</style>").appendTo("head");
    
    return $;
    
})(SPWIDGET_DEMO.JQUERY || jQuery) );
