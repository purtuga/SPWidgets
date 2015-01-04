/**
 * widget.upload.demo.js
 * Code for the upload widget demo.
 */
(function($){

    "use strict";
    /*global SPWIDGET_DEMO */

    var Main        = SPWIDGET_DEMO,
        $ui         = Main.$ui.find("#SPControlUploadDemo"),
        $demoCntr   = $ui.find("div.spwidget-demo-upload-cntr"),
        $widgetCntr = $demoCntr.find("div.spwidget-demo-upload-widget"),
        $libFiles   = $demoCntr.find("div.spwidget-demo-library-files > table tbody"),
        $lastFile   = $demoCntr.find(".spwidget-demo-upload-last-file");

    /**
     * Removes the internal representation of a lookup value and
     * return only the expected visible value.
     */
    function getLookupFieldValue(xmlFieldValue, returnID){

        if (!xmlFieldValue) {

            return "";

        }

        if (xmlFieldValue.indexOf("#") < 0) {

            return xmlFieldValue;

        }

        var field = xmlFieldValue.substring(xmlFieldValue.indexOf("#") + 1);

        if (returnID) {

            field = parseInt(xmlFieldValue.substring(0, xmlFieldValue.indexOf(";")));

        }

        return field;

    } //end: getLookupFieldValue

    /**
     *  Pulls in all files under th elibrary's root folder and displays them
     *  on the page, under the Files container.
     */
    function refreshFileList(listName) {

        $.SPWidgets.SPAPI.getListItems({
            async:      true,
            listName:   listName,
            CAMLQuery:  '<Query><Where>' +
                    "<Neq>" +
                        "<FieldRef Name='ContentType' />" +
                        "<Value Type='Text'>Folder</Value>" +
                    "</Neq>" +
                    "</Where>" +
                    "<OrderBy>"+
                        "<FieldRef Name='Title' Ascending='True' />" +
                    "</OrderBy></Query>",
            CAMLViewFields: "<ViewFields>" +
                    "<FieldRef Name='Title'/>" +
                    "<FieldRef Name='FileLeafRef'/>" +
                    "<FieldRef Name='Filename'/>" +
                    "<FieldRef Name='ContentType'/>" +
                    "<FieldRef Name='Editor'/>" +
                    "<FieldRef Name='Modified'/>" +
                    "<FieldRef Name='EncodedAbsUrl'/>" +
                    "<FieldRef Name='DocIcon'/>" +
                    "</ViewFields>",
            CAMLRowLimit: 0,
            completefunc: function(xData/*, Status*/) {

                var r = $.SPWidgets.SPAPI.getNodesFromXml({
                            xDoc: xData.responseXML,
                            nodeName: "z:row",
                            asJQuery: true
                        }),
                    s = "";

                if (!r.length) {

                    $libFiles.append("<tr><td colspan='20' class='ui-widget-content'>No documents found at root of Document Library!</td></tr>");

                    return;

                }

                r.each(function(){

                    var d = $(this);

                    s += '<tr>' +
                        '<td class="ui-widget-content">' + getLookupFieldValue(d.attr("ows_FileLeafRef")) + '</td>' +
                        '<td class="ui-widget-content">' + d.attr("ows_Modified") + '</td>' +
                        '<td class="ui-widget-content">' + getLookupFieldValue(d.attr("ows_Editor")) + '</td>' +
                    '</tr>';

                });

                $libFiles.html(s);

            }//end: completefunc()
        });
    }//end: refreshFileList()


    // Insert the list picker
    Main.insertListSelector({
        container:      $ui.find("div.spwidgets-demo-lists"),
        includeLists:   false,
        onListSelect:   function($library){

            var libraryName = $library.find("Title").text();

            refreshFileList(libraryName);

            $demoCntr.show();

            $widgetCntr
                .empty()
                .append("<h3>Upload with Overwrite = False</h3>");

            $("<div/>")
                .appendTo($widgetCntr)
                .SPControlUpload({
                    listName:       libraryName,
                    debug:          Main.debug,
                    onUploadDone:   function(file){

                        refreshFileList(libraryName);

                        $lastFile.html(decodeURIComponent(file.EncodedAbsUrl));

                    }
                });

            $widgetCntr
                .append("<h3>Upload with Overwrite = True</h3>");

            $("<div/>")
                .appendTo($widgetCntr)
                .SPControlUpload({
                    listName:       libraryName,
                    debug:          Main.debug,
                    overwrite:      true,
                    onUploadDone:   function(file){

                        refreshFileList(libraryName);

                        $lastFile.html(decodeURIComponent(file.EncodedAbsUrl));

                    }
                });

        }//end: onListSelect()
    });

})(SPWIDGET_DEMO.JQUERY || jQuery);
