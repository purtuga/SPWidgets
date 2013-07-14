/**
 * widget.upload.demo.js
 * Code for the upload widget demo.
 */
(function(){
    
    var ui              = window.SPWIDGET_DEMO.$ui,
        uiFileList      = ui.find("#sp_control_file_list"),
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
    
})(SPWIDGET_DEMO.JQUERY || jQuery);
