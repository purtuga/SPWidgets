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
                if (opt.includeLibraries && opt.includeLists) {
                    
                    opt._lists = $siteLists.find("_sList");
                    
                } else if (opt.includeLibraries) {
                    
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
                
                opt._widget = $('<div class="spwidgets-demo-list-picker">' +
                        '<div class="ui-state-active spwidgets-demo-list-selected">Select List...</div>' +
                        '</div>')
                    .appendTo(opt.container)
                    .append(
                        '<div class="spwidgets-demo-list-selector ui-widget-content" style="display:none;">' + 
                        htmlList + '</div>' )
                    .on("click", "div.spwidgets-demo-list-selected", function(ev){
                        
                        var $this = $(this).html("Select...");
                        
                        opt._widgetSelector
                            .css("display", "")
                            .position({
                                my: "left top",
                                at: "left top",
                                of: $this
                            });
                        
                    })
                    .on("click", "a", function(ev){
                        
                        var $this   = $(this),
                            $list   = opt._lists
                                        .find(
                                            "_sList InternalName:contains('" +
                                            $this.data("list_uid") + "')" 
                                        )
                                        .parent();
                        
                        opt._widgetSelector.hide();
                        
                        opt._widgetSelected.html("List: " + $list.find("Title").text());
                        
                        if ($.isFunction(opt.onListSelect)) {
                            
                            opt.onListSelect.call(
                                opt.container, $list, $this);
                            
                        }
                        
                    });
                
                opt._widgetSelector = opt._widget.find("div.spwidgets-demo-list-selector");
                opt._widgetSelected = opt._widget.find("div.spwidgets-demo-list-selected");
                
            }//end: completefunc()
        });
        
        return Main;
        
    }; //end: Main.insertListSelector();
    
    
    /**
     * Inserts a list column selector into the defined container.
     * 
     * @param {Object} options
     * @param {Object} options
     * @param {Object} options
     * @param {Object} [options.onColumnSelect=null]
     *          Called with a scope of container and 3 params:
     *          thisCol, opt.listName, html a element
     *          
     * 
     * @return {jQuery.Promise}
     *          Resolved with scope of the container
     * 
     */
    Main.insertListColumnSelector = function(options) {
        
        return $.Deferred(function(dfd){
            
             var opt = $.extend({}, {
                    container:      null,
                    listName:       "",
                    ColumnType:     "",
                    onColumnSelect: null
                },
                options);
            
            if (!opt.container) {
                
                dfd.resolve();
                return;
                
            }
            
            opt.container = $(opt.container).empty();
            
            Main.getListColumns(opt.listName)
                .then(function(columns){
                    
                    var htmlList = "";
                    
                    // Loop through all lists and build the UI for it.
                    $.each(columns, function(i, column){
                        
                        htmlList +=
                            '<a href="javascript:" class="ui-state-default" data-list_name="' +
                             opt.listName + '" data-column_name="' + column + '">' +
                             column + ' </a>';
                             
                    });
                    
                    // If no columns, entere default message
                    if (htmlList === "") {
                        
                        htmlList += '<div>No Columns!</div>';
                        
                    }
                    
                    opt._widget = $('<div class="spwidgets-demo-list-picker">' +
                            '<div class="ui-state-active spwidgets-demo-list-selected">Select Column...</div>' +
                            '</div>')
                        .appendTo(opt.container)
                        .append(
                            '<div class="spwidgets-demo-list-selector ui-widget-content" style="display:none;">' + 
                            htmlList + '</div>' )
                        .on("click", "div.spwidgets-demo-list-selected", function(ev){
                            
                            var $this = $(this).html("Column: Select...");
                            
                            opt._widgetSelector
                                .css("display", "")
                                .position({
                                    my: "left top",
                                    at: "left top",
                                    of: $this
                                });
                            
                        })
                        .on("click", "a", function(ev){
                            
                            var $this   = $(this),
                                thisCol  = $this.data("column_name");
                            
                            opt._widgetSelector.hide();
                            
                            opt._widgetSelected.html( "Column: " + thisCol );
                            
                            if ($.isFunction(opt.onColumnSelect)) {
                                
                                opt.onColumnSelect.call(
                                    opt.container, thisCol, opt.listName, $this);
                                
                            }
                            
                        });
                    
                    opt._widgetSelector = opt._widget.find("div.spwidgets-demo-list-selector");
                    opt._widgetSelected = opt._widget.find("div.spwidgets-demo-list-selected");
                    
                    dfd.resolveWith(opt.container);
                    
                });
            
        })
        .promise();
        
        
    }; //end: Main.insertListColumnSelector()
    
    
    /**
     * Gets the list of columns names by using the Edit form
     * 
     * @param {Object} listName
     * 
     * @return {jQuery.Promise}
     */
    Main.getListColumns = function(listName){
        
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
        
    }; //end: getListColumns()
    
    /**
     * Given an element, this method will setup it up for logging data,
     * and return an object ready to interact with it.
     */
    Main.setupLogOutput = function(options) {
        
        var opt     = $.extend({}, {
                        container: null,
                        fixHeight: true,
                        height:     '40em'
                    }, options),
            Inst    = {},
            css     = {
                        padding: ".2em",
                        position: "relative"
                    };
        
        if (!opt.container) {
            
            return;
            
        }
        
        opt.container = $(opt.container);
        
        if (opt.fixHeight){
            
            css.height      = opt.height;
            css.overflow    = "auto";
            
        }
        
        opt.container
            .addClass("ui-widget-content")
            .css(css);
        
        Inst.log = function(data) {
            
            opt.container.append('<div>' + data + '<div>');
            opt.container.scrollTop(opt.container.children(":last").position().top);
            
        }; //end: log()
        
        return Inst;
        
    }; //end: Main.setupLogOutput()
    
    Main.$ui = $("#spwidgets_demo_cntr")
            .css("display", "")
            .on("keyup", function(ev){
                
                if (ev.which === 13) {
                    ev.preventDefault();
                    ev.stopPropagation();
                }
                
            });
    
    // Create TABs and make ui visible
    Main.$ui.find("#ptTabsCntr")
        .tabs()
        .fadeIn("slow");
    
    // Populate the About page
    $("#SPWidgetsAbout ul.spwidgets-demo-info-cntr").each(function(){
        
        var $ul     = $(this);
        
        setTimeout(function(){
            
            var info    = $.SPWidgets.getRuntimeInfo(),
                display = '',
                key;
            
            for (key in info){
                
                if (info.hasOwnProperty(key)) {
                    
                    display += '<li>' + key + ': ' + info[key] + '</li>';
                    
                }
                
            }
            
            $ul.append(display);
            
            
        }, 2000);
        
    });
    
    
 /* function return jQuery to closure above */
})( (function($){
    
    var styles = "__BUILD_STYLES__";
    
    $('<style type="text/css">' + styles + "</style>")
        .appendTo(document.head || document.getElementsByTagName('head')[0]);
    
    return $;
    
})(SPWIDGET_DEMO.JQUERY || jQuery) );
