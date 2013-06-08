/**
 * 
 */
try { if (!pt){ pt = {}; } } catch(e){pt = {};}

$(document).ready(function(){
    
    var $widgetMenuList = $("div.pt-widget-menu"),
        menuOptions     = '',
        counter         = 1,
        $page           = $("html,body");
    
    $.getJSON("http://www.gravatar.com/8fed973012499e7ab4bb3dad481a899d.json?callback=?")
        .then(function(info){
            var me      = info.entry[0],
                profile = $('<div class="pt-author-cntr">' +
                           '<div class="pt-left-col">' +
                                '<div class="pt-img"></div>' +
                                '<div class="pt-location"></div>' +
                            '</div>' +
                            '<div class="pt-right-col">' +
                                '<h4 class="pt-name"></h4>'+
                                '<div class="pt-links"></div>' +
                            '</div>' +
                        '</div>'),
                tmp     = "";
            profile.find(".pt-img")
                    .empty()
                    .append('<img src="' + me.thumbnailUrl + '" />')
                    .end()
                .find(".pt-location")
                    .empty()
                    .append(me.currentLocation)
                    .end()
                .find(".pt-name")
                    .empty()
                    .append(me.displayName)
                    .end();
            
            tmp = "<ul>";
            for(var i=0,j=me.urls.length; i<j; i++){
                tmp += '<li><a href="' + me.urls[i].value +
                       '">' + me.urls[i].title + '</a> </li>';
            };
            tmp += "</ul>";
            profile.find(".pt-links").html(tmp);
            
            $('#ptAuthorInfo').html(profile);
        });
    
    
    pt.gotoWidget = function(item) {
        
        var $menuItem = $(item),
            widgetId    = $menuItem.data('ptwidget');
        
        $page
            .stop()
            .animate({
                    scrollTop: ($("#" + widgetId).offset().top - 20)
                },
                1000)
        
    }; 
    
    
    // Populate the widget menu
    $("section h1").each(function(){
        
        var $thisWidgetHeading  = $(this),
            widgetHeadingId     = "widget" + counter;
        
        $thisWidgetHeading.attr("id", widgetHeadingId);
        
        menuOptions += '<a href="javascript:" onclick="pt.gotoWidget(this)" ' +
            'data-ptwidget="' + widgetHeadingId + '">' + 
            $thisWidgetHeading.text() + '</a>'
        
        counter++;
        
    });
    
    $widgetMenuList.html( menuOptions );
    
    
});

