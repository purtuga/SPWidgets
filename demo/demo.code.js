/**
 * @fileOverview
 * Demo of the Sharepoint Control Upload widget.
 * Look for the SPControlUpload() call below to see how it
 * is being used.
 * 
 * @version _BUILD_VERSION_NUMBER_
 * 
 */
 $(document).ready(function(){
    
    var ui = $("#sp_control_upload_demo_cntr")
            .css({
                padding:    '1em',
                minHeight:  '400px'
            })
            .on("keyup", function(ev){
                
                if (ev.which === 13) {
                    ev.preventDefault();
                    ev.stopPropagation();
                }
                
            }),
        // Inserted at build time from demo.body.html
        uiContentTemplate = "_INCLUDE_DEMO_BODY_TEMPLATE_";
    
    ui.html(uiContentTemplate);
    
    // Create TABs and make ui visible
    ui.find("#ptTabsCntr")
        .tabs({
            activate: function(ev,ui){
                
                if (ui.newPanel.is("#SPControlBoardDemo")) {
                    
                    $("#SPControlBoardDemo div.spwidget-board-demo-cntr")
                        .SPShowBoard("redraw");
                        
                }
                
            }
        })
        .fadeIn("slow");
    
    
    var uiFileList      = ui.find("#sp_control_file_list"),
        uiUploadCntr    = ui.find("#sp_control_upload_file"),
        uiUploadWidget  = uiUploadCntr.find("#sp_upload_widget"),
        counter         = 1,
        siteUrl         = $().SPServices.SPGetCurrentSite(),
        listUID         = '',
        listName        = '',
        folderPath      = siteUrl;
    
    /**
     * Removes the internal representation of a lookup value and
     * return only the expected visible value.
     */
    function getLookupFieldValue(xmlFieldValue, returnID){
        if (xmlFieldValue == undefined) {
            return "";
        }
        if (!xmlFieldValue || !xmlFieldValue.indexOf("#")) {
            return xmlFieldValue;
        }
        var field = xmlFieldValue.substring(xmlFieldValue.indexOf("#") + 1);
        if (returnID) {
            field = parseInt(xmlFieldValue.substring(0, xmlFieldValue.indexOf(";")));
        }
        return field;
    }
    
    /**
     *  Pulls in all files under th elibrary's root folder and displays them
     *  on the page, under the Files container.
     */
    function refreshFileList() {
        $().SPServices({
            operation:  "GetListItems",
            async:      true,
            listName:   listName,
            CAMLQuery:  '<Query><Where>'
                    +       "<Neq>"
                    +           "<FieldRef Name='ContentType' />"
                    +           "<Value Type='Text'>Folder</Value>"
                    +       "</Neq>"
                    +   "</Where>"
                    +   "<OrderBy>"
                    +       "<FieldRef Name='Title' Ascending='True' />"
                    +   "</OrderBy></Query>",
            CAMLViewFields: "<ViewFields>"
                    +   "<FieldRef Name='Title'/>"
                    +   "<FieldRef Name='FileLeafRef'/>"
                    +   "<FieldRef Name='Filename'/>"
                    +   "<FieldRef Name='ContentType'/>"
                    +   "<FieldRef Name='Editor'/>"
                    +   "<FieldRef Name='Modified'/>"
                    +   "<FieldRef Name='EncodedAbsUrl'/>"
                    +   "<FieldRef Name='DocIcon'/>"
                    +   "</ViewFields>",
            CAMLRowLimit: 0,
            completefunc: function(xData, Status) {
                var r = $(xData.responseXML).SPFilterNode("z:row"),
                    s = "";
                uiFileList.empty();
                if (!r.length) {
                    uiFileList.append("<div>No documents found at root of Document Library!</div>");
                    return;
                }
                r.each(function(){
                    var d = $(this);
                    s += '<div class="file"><span style="font-weight:bold;font-size:1.2em;">' + 
                        getLookupFieldValue(d.attr("ows_FileLeafRef")) + '</span>' +
                        ' [Last Modified: ' + d.attr("ows_Modified") +
                        ' | Last Modified By: ' + getLookupFieldValue(d.attr("ows_Editor")) + ' ]' +
                        '</div>';
                });
                uiFileList.append(s);
                
            }//end: completefunc()
        });
    }//end: refreshFileList()
    
    // bind event to upload button, which will create an upload element on the
    // page in real time using the SPControlUpload plugin.
    var uploadButton = uiUploadCntr.find("button")
        .click(function(ev){
            $('<div style="height:350px;width;100%;padding:.5em;" class="" id="spcontroluploadwidget' + counter +'"></div>')
                .appendTo(uiUploadWidget.empty())
                .SPControlUpload({
                    listName:       listUID, 
                    onPageChange:   function(ev){
                        
                        // If we're done with the upload, then continue to show the
                        // overlay, and fade out the area that contained the upload control. 
                        if (ev.state == 3 && ev.isUploadDone) {
                            ev.hideOverlay = false;
                            $('<div style="padding: 1em; width: 80%; margin: 3em auto;" class="ui-state-highlight">Upload Successful!!!</div>')
                                .appendTo(uiUploadWidget.empty())
                                .fadeOut(4000, function(){
                                    $(this).remove();
                                });
                            
                            // Reload files into viewing area.
                            refreshFileList();
                        
                        // If file was uploaded, but we have required fields to fill out,
                        // then adjust page to only show that... 
                        } else if (ev.state == 3) {
                            
                            // Because we're coming from the same domain, we
                            // have full access to the content of the page,
                            // and thus we can manipulate it. In this example
                            // I hide all chrome and show only the form fields
                            // the user should be filling in.
                            ev.page.find("form")
                                .children(":visible")
                                    .css("display", "none")
                                    .addClass("ptWasVisible")
                                    .end()
                                .find("input[title='Name']")
                                    .closest("div[id^='WebPart']")
                                        .appendTo(ev.page.find("form"));
                        }

                    }//end: onPageChange()
                });
                
            counter += 1;
        })
        .hide();
    
    
    // -----------------------------------------------------
    // Have the user pick which library to use in the demo.
    $().SPServices({
        operation: "SiteDataGetListCollection",
        async: true,
        completefunc: function (xData, Status) {
            var d = $(xData.responseXML).find("_sList BaseType:contains('DocumentLibrary')").parent(),
                c = "<div style='font-weight:bold'>Pick the Document Library below to be used in this demo:</div>";
            
            if (!d.length) {
                uiUploadWidget.empty().append(
                    '<div style="padding: 1em; width: 80%; margin: 3em auto;" class="ui-state-error">This site has no Document Libraries!</div>'
                );
                return;
            }
            
            d.each(function(){
                var l = $(this);
                c += '<a href="javascript:" class="ui-state-default" style="display:block;" data-list_uid="' +
                     $.trim(l.find("InternalName").text()) +
                     '" data-list_name="' +
                     l.find("Title").text() + '">' +
                     l.find("Title").text() + ' </a>';
            });
            uiUploadWidget.empty().append(c).find("a")
                .click(function(ev){
                    listUID     = $(this).data("list_uid");
                    listName    = $(this).data("list_name");
                    $("#sp_control_library_name").empty().append(
                        'Document Library: ' + listName
                    );
                    folderPath = jQuery.pt.getEscapedUrl(folderPath + "/" + listName);
                    uiUploadWidget.empty();
                    uploadButton.show();
                    refreshFileList();
                })
                .css({
                    margin: '.3em',
                    padding: '.5em'
                });
            
        }//end: completefunc()
    });

    //-----------------------------------
    // pickSPUser plugin
    //-----------------------------------
    $("#SPControlPickUserDemo").each(function(){
        
        var $cntr   = $(this),
            $output = $cntr.find("#SPControlPickUserEventOut");
        
        /**
         * Logs output to the people picker output area
         */
        function logOutput(data) {
            
            $output.append($("<div/>").html(data));
            
        }
        
        // SEtup listners
        $cntr
            .on("spwidget:peoplePickerCreate", function(ev, $input){
                
                logOutput("spwidget:peoplePickerCreate EVENT TRIGGERED!");
                
            })
            .on("spwidget:peoplePickerAdd", function(ev, $input, personObj){
                
                logOutput(
                    "spwidget:peoplePickerAdd TRIGGERED! (Person: " + 
                    personObj.displayName + ")");
                    
            })
            .on("spwidget:peoplePickerRemove", function(ev, $input, personObj){
                
                logOutput(
                    "spwidget:peoplePickerRemove TRIGGERED! (Person: " + 
                    personObj.displayName + ")");
                    
            });
        
        // Attach widget to input.
        $("input[name='spuserdemo']").pickSPUser({
            onPickUser: function(u){
                
                logOutput("onPickUser CALLED!(Person: " + u.displayName + ")");
                
                $("#sp_control_pick_user_detail")
                    .empty()
                    .append(
                        '<div>The following User was selected:</div>' +
                        '<div>User Name: ' + u.displayName + '</div>' +
                        '<div>Account Name: ' + u.accountName + '</div>' +
                        '<div>Account ID: ' + u.accountId + '</div>' +
                        '<div>Account Type: ' + u.accountType + '</div>'
                    );
            },
            onCreate: function($input) {
                
                logOutput("onCreate CALLED!");
                
            },
            onRemoveUser: function($input, $ui, person){
                
                logOutput("onRemoveUser CALLED! (Person: " + person.displayName + ")");
                
            }
        });
        
        
        
        
    }); //end: each() = People picker container
    
    // Kan-Ban Board
    $("#SPControlBoardDemo div.spwidget-board-demo-cntr")
        .SPShowBoard({
            list:                   "Tasks",
            field:                  "Status",
            showColPicker:          true,
            colPickerLabel:         "Choose Columns",
            colPickerCloseLabel:    "Close Picker",
            colPickerApplyLabel:    "Change"
        });
    
    
    // DEMO: Lookup Field widget
    $("#SPControlLookupFieldDemo").each(function(){
        
        var $ele = $(this);
        
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
        
        
        
        return false;
    });
    
    
    
    // DEMO: SP List Filter
    // Uses the Tasks list.
    (function(){
        
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
        
        
        
    })();
    
    
});//end .ready()

/**
* vkBeautify - javascript plugin to pretty-print or minify text in XML, JSON, CSS and SQL formats.
*  
* Version - 0.99.00.beta 
* Copyright (c) 2012 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/vkbeautify/
* 
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*   Pretty print
*
*        vkbeautify.xml(text [,indent_pattern]);
*        vkbeautify.json(text [,indent_pattern]);
*        vkbeautify.css(text [,indent_pattern]);
*        vkbeautify.sql(text [,indent_pattern]);
*
*        @text - String; text to beatufy;
*        @indent_pattern - Integer | String;
*                Integer:  number of white spaces;
*                String:   character string to visualize indentation ( can also be a set of white spaces )
*   Minify
*
*        vkbeautify.xmlmin(text [,preserve_comments]);
*        vkbeautify.jsonmin(text);
*        vkbeautify.cssmin(text [,preserve_comments]);
*        vkbeautify.sqlmin(text);
*
*        @text - String; text to minify;
*        @preserve_comments - Bool; [optional];
*                Set this flag to true to prevent removing comments from @text ( minxml and mincss functions only. )
*
*   Examples:
*        vkbeautify.xml(text); // pretty print XML
*        vkbeautify.json(text, 4 ); // pretty print JSON
*        vkbeautify.css(text, '. . . .'); // pretty print CSS
*        vkbeautify.sql(text, '----'); // pretty print SQL
*
*        vkbeautify.xmlmin(text, true);// minify XML, preserve comments
*        vkbeautify.jsonmin(text);// minify JSON
*        vkbeautify.cssmin(text);// minify CSS, remove comments ( default )
*        vkbeautify.sqlmin(text);// minify SQL
*
*/

(function() {

function createShiftArr(step) {

    var space = '    ';
    
    if ( isNaN(parseInt(step)) ) {  // argument is string
        space = step;
    } else { // argument is integer
        switch(step) {
            case 1: space = ' '; break;
            case 2: space = '  '; break;
            case 3: space = '   '; break;
            case 4: space = '    '; break;
            case 5: space = '     '; break;
            case 6: space = '      '; break;
            case 7: space = '       '; break;
            case 8: space = '        '; break;
            case 9: space = '         '; break;
            case 10: space = '          '; break;
            case 11: space = '           '; break;
            case 12: space = '            '; break;
        }
    }

    var shift = ['\n']; // array of shifts
    for(ix=0;ix<100;ix++){
        shift.push(shift[ix]+space); 
    }
    return shift;
}

function vkbeautify(){
    this.step = '    '; // 4 spaces
    this.shift = createShiftArr(this.step);
};

vkbeautify.prototype.xml = function(text,step) {

    var ar = text.replace(/>\s{0,}</g,"><")
                 .replace(/</g,"~::~<")
                 .replace(/\s*xmlns\:/g,"~::~xmlns:")
                 .replace(/\s*xmlns\=/g,"~::~xmlns=")
                 .split('~::~'),
        len = ar.length,
        inComment = false,
        deep = 0,
        str = '',
        ix = 0,
        shift = step ? createShiftArr(step) : this.shift;

        for(ix=0;ix<len;ix++) {
            // start comment or <![CDATA[...]]> or <!DOCTYPE //
            if(ar[ix].search(/<!/) > -1) { 
                str += shift[deep]+ar[ix];
                inComment = true; 
                // end comment  or <![CDATA[...]]> //
                if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1 ) { 
                    inComment = false; 
                }
            } else 
            // end comment  or <![CDATA[...]]> //
            if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) { 
                str += ar[ix];
                inComment = false; 
            } else 
            // <elm></elm> //
            if( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
                /^<[\w:\-\.\,]+/.exec(ar[ix-1]) == /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/','')) { 
                str += ar[ix];
                if(!inComment) deep--;
            } else
             // <elm> //
            if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1 ) {
                str = !inComment ? str += shift[deep++]+ar[ix] : str += ar[ix];
            } else 
             // <elm>...</elm> //
            if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
                str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
            } else 
            // </elm> //
            if(ar[ix].search(/<\//) > -1) { 
                str = !inComment ? str += shift[--deep]+ar[ix] : str += ar[ix];
            } else 
            // <elm/> //
            if(ar[ix].search(/\/>/) > -1 ) { 
                str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
            } else 
            // <? xml ... ?> //
            if(ar[ix].search(/<\?/) > -1) { 
                str += shift[deep]+ar[ix];
            } else 
            // xmlns //
            if( ar[ix].search(/xmlns\:/) > -1  || ar[ix].search(/xmlns\=/) > -1) { 
                str += shift[deep]+ar[ix];
            } 
            
            else {
                str += ar[ix];
            }
        }
        
    return  (str[0] == '\n') ? str.slice(1) : str;
}

vkbeautify.prototype.json = function(text,step) {

    var step = step ? step : this.step;
    
    if (typeof JSON === 'undefined' ) return text; 
    
    if ( typeof text === "string" ) return JSON.stringify(JSON.parse(text), null, step);
    if ( typeof text === "object" ) return JSON.stringify(text, null, step);
        
    return text; // text is not string nor object
}

vkbeautify.prototype.css = function(text, step) {

    var ar = text.replace(/\s{1,}/g,' ')
                .replace(/\{/g,"{~::~")
                .replace(/\}/g,"~::~}~::~")
                .replace(/\;/g,";~::~")
                .replace(/\/\*/g,"~::~/*")
                .replace(/\*\//g,"*/~::~")
                .replace(/~::~\s{0,}~::~/g,"~::~")
                .split('~::~'),
        len = ar.length,
        deep = 0,
        str = '',
        ix = 0,
        shift = step ? createShiftArr(step) : this.shift;
        
        for(ix=0;ix<len;ix++) {

            if( /\{/.exec(ar[ix]))  { 
                str += shift[deep++]+ar[ix];
            } else 
            if( /\}/.exec(ar[ix]))  { 
                str += shift[--deep]+ar[ix];
            } else
            if( /\*\\/.exec(ar[ix]))  { 
                str += shift[deep]+ar[ix];
            }
            else {
                str += shift[deep]+ar[ix];
            }
        }
        return str.replace(/^\n{1,}/,'');
}

//----------------------------------------------------------------------------

function isSubquery(str, parenthesisLevel) {
    return  parenthesisLevel - (str.replace(/\(/g,'').length - str.replace(/\)/g,'').length )
}

function split_sql(str, tab) {

    return str.replace(/\s{1,}/g," ")

                .replace(/ AND /ig,"~::~"+tab+tab+"AND ")
                .replace(/ BETWEEN /ig,"~::~"+tab+"BETWEEN ")
                .replace(/ CASE /ig,"~::~"+tab+"CASE ")
                .replace(/ ELSE /ig,"~::~"+tab+"ELSE ")
                .replace(/ END /ig,"~::~"+tab+"END ")
                .replace(/ FROM /ig,"~::~FROM ")
                .replace(/ GROUP\s{1,}BY/ig,"~::~GROUP BY ")
                .replace(/ HAVING /ig,"~::~HAVING ")
                //.replace(/ SET /ig," SET~::~")
                .replace(/ IN /ig," IN ")
                
                .replace(/ JOIN /ig,"~::~JOIN ")
                .replace(/ CROSS~::~{1,}JOIN /ig,"~::~CROSS JOIN ")
                .replace(/ INNER~::~{1,}JOIN /ig,"~::~INNER JOIN ")
                .replace(/ LEFT~::~{1,}JOIN /ig,"~::~LEFT JOIN ")
                .replace(/ RIGHT~::~{1,}JOIN /ig,"~::~RIGHT JOIN ")
                
                .replace(/ ON /ig,"~::~"+tab+"ON ")
                .replace(/ OR /ig,"~::~"+tab+tab+"OR ")
                .replace(/ ORDER\s{1,}BY/ig,"~::~ORDER BY ")
                .replace(/ OVER /ig,"~::~"+tab+"OVER ")

                .replace(/\(\s{0,}SELECT /ig,"~::~(SELECT ")
                .replace(/\)\s{0,}SELECT /ig,")~::~SELECT ")
                
                .replace(/ THEN /ig," THEN~::~"+tab+"")
                .replace(/ UNION /ig,"~::~UNION~::~")
                .replace(/ USING /ig,"~::~USING ")
                .replace(/ WHEN /ig,"~::~"+tab+"WHEN ")
                .replace(/ WHERE /ig,"~::~WHERE ")
                .replace(/ WITH /ig,"~::~WITH ")
                
                //.replace(/\,\s{0,}\(/ig,",~::~( ")
                //.replace(/\,/ig,",~::~"+tab+tab+"")

                .replace(/ ALL /ig," ALL ")
                .replace(/ AS /ig," AS ")
                .replace(/ ASC /ig," ASC ") 
                .replace(/ DESC /ig," DESC ")   
                .replace(/ DISTINCT /ig," DISTINCT ")
                .replace(/ EXISTS /ig," EXISTS ")
                .replace(/ NOT /ig," NOT ")
                .replace(/ NULL /ig," NULL ")
                .replace(/ LIKE /ig," LIKE ")
                .replace(/\s{0,}SELECT /ig,"SELECT ")
                .replace(/\s{0,}UPDATE /ig,"UPDATE ")
                .replace(/ SET /ig," SET ")
                            
                .replace(/~::~{1,}/g,"~::~")
                .split('~::~');
}

vkbeautify.prototype.sql = function(text,step) {

    var ar_by_quote = text.replace(/\s{1,}/g," ")
                            .replace(/\'/ig,"~::~\'")
                            .split('~::~'),
        len = ar_by_quote.length,
        ar = [],
        deep = 0,
        tab = this.step,//+this.step,
        inComment = true,
        inQuote = false,
        parenthesisLevel = 0,
        str = '',
        ix = 0,
        shift = step ? createShiftArr(step) : this.shift;;

        for(ix=0;ix<len;ix++) {
            if(ix%2) {
                ar = ar.concat(ar_by_quote[ix]);
            } else {
                ar = ar.concat(split_sql(ar_by_quote[ix], tab) );
            }
        }
        
        len = ar.length;
        for(ix=0;ix<len;ix++) {
            
            parenthesisLevel = isSubquery(ar[ix], parenthesisLevel);
            
            if( /\s{0,}\s{0,}SELECT\s{0,}/.exec(ar[ix]))  { 
                ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"")
            } 
            
            if( /\s{0,}\s{0,}SET\s{0,}/.exec(ar[ix]))  { 
                ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"")
            } 
            
            if( /\s{0,}\(\s{0,}SELECT\s{0,}/.exec(ar[ix]))  { 
                deep++;
                str += shift[deep]+ar[ix];
            } else 
            if( /\'/.exec(ar[ix]) )  { 
                if(parenthesisLevel<1 && deep) {
                    deep--;
                }
                str += ar[ix];
            }
            else  { 
                str += shift[deep]+ar[ix];
                if(parenthesisLevel<1 && deep) {
                    deep--;
                }
            } 
            var junk = 0;
        }

        str = str.replace(/^\n{1,}/,'').replace(/\n{1,}/g,"\n");
        return str;
}


vkbeautify.prototype.xmlmin = function(text, preserveComments) {

    var str = preserveComments ? text
                               : text.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g,"")
                                     .replace(/[ \r\n\t]{1,}xmlns/g, ' xmlns');
    return  str.replace(/>\s{0,}</g,"><"); 
}

vkbeautify.prototype.jsonmin = function(text) {

    if (typeof JSON === 'undefined' ) return text; 
    
    return JSON.stringify(JSON.parse(text), null, 0); 
                
}

vkbeautify.prototype.cssmin = function(text, preserveComments) {
    
    var str = preserveComments ? text
                               : text.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g,"") ;

    return str.replace(/\s{1,}/g,' ')
              .replace(/\{\s{1,}/g,"{")
              .replace(/\}\s{1,}/g,"}")
              .replace(/\;\s{1,}/g,";")
              .replace(/\/\*\s{1,}/g,"/*")
              .replace(/\*\/\s{1,}/g,"*/");
}

vkbeautify.prototype.sqlmin = function(text) {
    return text.replace(/\s{1,}/g," ").replace(/\s{1,}\(/,"(").replace(/\s{1,}\)/,")");
}

window.vkbeautify = new vkbeautify();

})();



