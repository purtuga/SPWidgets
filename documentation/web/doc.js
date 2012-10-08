/**
 * Script file for documenation generated via markdown.
 */
$(document).ready(function(){
    
    $("#ptNoScriptingWarning").css("display", "none");
        
    $.getJSON("http://www.gravatar.com/8fed973012499e7ab4bb3dad481a899d.json?callback=?")
        .then(function(info){
            var me      = info.entry[0],
                profile = $("#templates div.pt-author-cntr"),
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
    

    var nav = "",
        i   = 1;
    $("#pt_documentation h1,#pt_documentation h2").each(function(){
        var e = $(this);
        e.before('<a name="ptDoc' + i + '"></a>');
        nav += '<a href="#ptDoc' + i + '" class="' + 
            ($(this).is("h2") ? "h2link" : "h1link") +
            '">' + $(this).text() + '</a>';
        i++;
    });
    $(".ptNav")
        .sticky({
            topSpacing: 10
        })
        .append(nav);
    
});
