/**
 * @fileOverview jquery.SPControlUpload.js
 * jQuery plugin that interacts with Sharepoint built in Upload.aspx through an iframe
 * to provide to the user an upload UI without leaving actually leaving the page, thus
 * simulating an ajax file upload interaction.
 * Currently used to upload files to a Document Library with out having the user go
 * through the many SP pages and without having to leave the user's current page.
 *      
 *  
 * @version _BUILD_VERSION_NUMBER_NUMBER_
 * @author  Paul Tavares, www.purtuga.com
 * @see     TODO: site url
 * 
 * @requires jQuery.js {@link http://jquery.com}
 * @requires jQuery-ui.js {@link http://jqueryui.com}
 * @requires jquery.SPServices.js {@link http://spservices.codeplex.com}
 * 
 * Build Date _BUILD_VERSION_DATE_
 * 
 */

/**
 *  jQuery definition
 *  @see    http://jquery.com/
 *  @name   jQuery
 *  @class  jQuery Library
 */

/**
 * jQuery 'fn' definition to anchor all public plugin methods.
 * @see         http://jquery.com/
 * @name        fn
 * @class       jQuery Library public method anchor
 * @memberOf    jQuery
 */

/**
 * Tracks if the CSS injection into the page has been done.
 */
$.pt._isSPUploadCssDone = false;


/**
 * jQuery plugin that populates the elements selected with a UI for
 * uploading a file to a Sharepoint location (library) without having
 * to leave the current page that the user is currently on.
 * 
 * @param {Object} options  Object with the options below.
 * 
 * @param {String} options.listName REQUIRED. The name or UID of the list.
 *                  Example 'Shared Documents' or '{67587-89284-93884-78827-78823}'
 * 
 * @param {String} [options.folderPath="/"]
 *                  Optional. The full path to the folder inside of the List where
 *                  the document should be uploaded to. Default is to place the
 *                  document at the root of the Document Library
 *                  Examples 'http://yourdomain.com/sites/site1/Shared Documents' or
 *                  '/sites/site1/Shared Documents'
 * 
 * @param {String} [options.uploadDonePage="/_layouts/viewlsts.aspx"]
 *                  Optional. The url of the page that should be loaded after the
 *                  file has been uploaded successful. Value MUTST start with http.
 *                  Default is 'http://yourdomain.com/sites/site1/_layouts/viewlsts.aspx'
 * 
 * @param {Funtion} [options.onPageChange=null]
 *                  Function that is called each time the form in the
 *                  iFrame is changed. The function 'this' keyword points to the
 *                  element that was used when this method was called. The function
 *                  is given one param; the event object created by this method.
 *                  ({@link SPControlLoadEvent})
 *                  Return value of this function will control flow of plugin.
 *                  Returning true (boolean), will allow processing to continue
 *                  at different stages (see the event object below), while 
 *                  returnin false (boolean) will stop flow from continuing. The
 *                  check is strict; meaning that it has to be a boolean false in
 *                  order for flow to stop. 
 * 
 * @param {String} [options.uploadUrlOpt=""]
 *                  String of data that should be appended to the upload page url,
 *                  following this '?". 
 *                  NOTE; The option "MultipleUpload=1" is NOT SUPPORTED.
 *                  This string value is assumed to have already been properly 
 *                  escaped for use in the url.
 * 
 * @param {Boolean} [options.overwrite=False]
 *                  True or False indicating if document being uploaded should
 *                  overwrite any existing one. Default is False (don't overwrite)
 * 
 * @param {String} [options.uploadPage="/_layouts/Upload.aspx"]
 *                  The relative URL from the WebSite root to the upload page.
 *                  Default is "/_layouts/Upload.aspx". This value is appended to
 *                  to the website full url, which is retrieved using SPServices
 *                  utility.
 * 
 * @param {String} [options.overlayClass=""]
 *                  A css class to be associated with the overlay that is displayed
 *                  over the iframe while loading of the page is going on.
 * 
 * @param {String} [options.overlayBgColor="white"]
 *                  A color to be used for the overlay area that is displayed over
 *                  the iframe wile loading of the page is going on. Default is
 *                  white. Set this to null if wanting only to use a class.
 * 
 * @param {String|HTMLElement|jQuery} [options.overlayMessage="Loading..."]
 *                  String or object/element to be displayed inside of the overlay
 *                  when it is displayed. Default is "Loading..."
 * 
 * @return {jQuery}
 * 
 * @example
 *  
 *  $("&lt;di&gt;&lt;/div&gt;").appendTo("body")
 *      .SPControlUpload({
 *          listName: "Shared Documents"
 *      }); 
 * 
 * 
 */
$.fn.SPControlUpload = function (options) {
    var o = $.extend({}, {
                listName:       '',
                folderPath:     '',
                uploadDonePage: '/_layouts/viewlsts.aspx',
                onPageChange:   null,
                uploadUrlOpt:   '',
                overwrite:      false,
                uploadPage:     '/_layouts/Upload.aspx',
                overlayClass:   '',
                overlayBgColor: 'white',
                overlayMessage: '<div class="loadingOverlayMsg">Loading...</div>'
            }, options);
    
    // if the global styles have not yet been inserted into the page, do it now
    if (!$.pt._isSPUploadCssDone) {
        $.pt._isSPUploadCssDone = true;
        $('<style type="text/css">' + "\n\n" +
        $.pt.SPUploadStyleSheet + "\n\n</style>").prependTo("head");
    }
    
    // If list Name is not the UID, then get it now
    if (o.listName && o.listName.indexOf("{") != 0) {
        o.listName = $.pt.getListUID(o.listName);
    }
    // If list name is not defined - error
    if (!o.listName) {
        $(this).html('<div class="ui-state-error">Input parameter [listName] not valid!</div>');
        return this;
    }

    // get current site URL
    // TODO: use WebUrlFromPageUrl to get the url baed on siteUrl
    o.siteUrl       = $().SPServices.SPGetCurrentSite();
    
    // set the url of the upload page based on the siteUrl
    if (String(o.uploadPage).toLowerCase().indexOf("http") == -1) {
        var s = "/";
        if (o.uploadPage.indexOf('/') == 0) {
            s = "";
        }
        o.uploadPage = o.siteUrl + s + o.uploadPage;
        
        // Define SP2010 alternate upload form
        o.uploadPage2 = o.siteUrl + "/_layouts/UploadEx.aspx";
        
    }
    // Set the uploadDonePage url
    if (String(o.uploadDonePage).toLowerCase().indexOf("http") == -1) {
        var s = "/";
        if (o.uploadDonePage.indexOf('/') == 0) {
            s = "";
        }
        o.uploadDonePage = o.siteUrl + s + o.uploadDonePage;
    }
    
    // Create additional non-overridable options
    o._uploadUrlParams  = "?List=" + 
                      $.pt.getEscapedUrl(o.listName) + "&RootFolder=" +
                      $.pt.getEscapedUrl(o.folderPath) + "&Source=" +
                      $.pt.getEscapedUrl(o.uploadDonePage) + "&" + o.uploadUrlOpt;
    o.uploadPage    = o.uploadPage + o._uploadUrlParams;
    o.uploadPage2   = o.uploadPage2 + o._uploadUrlParams;
    o._lastError    = "";
    o._reloadCount  = 0;
   
    /** 
     * @name SPControlLoadEvent
     * Event object that is given as input to the function defined in the
     * $.fn.SPControlUpload-onPageChange parameter.
     * 
     * @event
     * @memberof $.fn.SPControlUpload
     * 
     * @param {SPControlLoadEvent} ev
     * 
     * @param {Integer} ev.state
     *          A value from 1 through 3 that represents the state of
     *          the file upload form.
     *          1 = is set when the form is initially loaded and the 
     *          File html element is ready for the user to attach the file.
     *          File has not yet been uploaded.
     *          2 = is set when the form is ready to be submitted to the server
     *          along with the file set by the user. File has not yet been
     *          uploaded.
     *          3 = is set when the user has successfully uploaded the file to
     *          the server and no errors were encountered.
     *          File has been uploaded and now sits on the server.
     * 
     * @param {String} ev.action
     *          The event action as it pertains to this plugin. 
     *          preLoad        =    action is taking place before the page is sent
     *          to the server.
     *          postLoad    =    action is taking place after page has completed
     *          loading, but is not yet "visible" to the user.
     * 
     * @param {Boolean} ev.hideOverlay
     *          Used when action=postLoad. Can be set by
     *          a callback function to false, so that the busy overlay remains
     *          displayed and is not automaticaly hidden. Default value is "true".
     * 
     * @param {String} ev.pageUrl
     *          The url of the page currently loaded in the iframe.
     * 
     * @param {jQuery} ev.page
     *          An object representing the page loaded inside the
     *          iFrame. This can be used to further manipulate the iframe's
     *          page content.
     * 
     * @param {Boolean} ev.isUploadDone
     *          Indicates if the upload process is done. Basically,
     *          this means that the processess has reached the page defined
     *          in the updatePageDone parameter.
     * 
     */
    o.ev            = {
        state:          1,
        action:         "uploading",
        hideOverlay:    true,
        pageUrl:        "",
        page:           null, // a jquery object
        isUploadDone:   false
    };
    
    var overlayStyle = "";
    if (o.overlayBgColor) {
        overlayStyle = "style='background-color:" + o.overlayBgColor + ";' ";
    }
    
    $(this).each(function(){
        
        // Create the UI on the element given used by the SPCOntrolUpload plugin
        var e = $(this);
        var h = (e.outerHeight() - 75);
        var c = {
            top:        0, //e.offset().top
            left:       0, //e.offset().left
            height:     e.outerHeight(true) - 15,
            display:    "block"
        };
        
        e.empty()
            .addClass("hasSPControlUploadUI")
            .append("<div class='SPControlUploadUI spcontrolupload'>" +
                "<div class='mainContainer'><div class='iFrameWindow'>" +
                "<iframe name='SPControlUploadUI' frameborder='0' scrollbars='yes' " +
                "scrolling='yes'></iframe></div><div class='buttonPane'>" + 
                "<button type='button' class='ui-state-default' " +
                "name='upload_button' value='upload' onclick='$.pt._onUpload(this);'>" +
                "Upload</button></div><div class='loadingOverlay " + o.overlayClass + 
                "' " + overlayStyle + "></div></div></div>" )
            .find(".SPControlUploadUI")
                .data("SPControlUploadOptions", o)
                .end()
            .find("iframe")
                .css("height", h)
                .load(function(ev){
                    $.pt._onIFramePageChange(e.find(".SPControlUploadUI"));
                })
                .attr("src", o.uploadPage)
                .end()
            .find(".loadingOverlay")
                .append(o.overlayMessage)
                .css(c);
                
        return this;
    });//each()

    return this;
    
};// $.fn.SPControlUpload
    
/**
 * FUNCTION: $.pt._onUpload()
 * 
 *  Submits the upload form that is loaded in the iframe window.
 *  Also calls any callback function defined by the user.
 * 
 * PARAMS:
 * 
 *  @param {Object} ele -   Element from within the 
 *                          .SPControlUploadUI class html container
 * 
 * RETURN:
 * 
 *  @return {undefined} Nothing.
 *
 */
$.pt._onUpload = function(ele){
    var e       = $(ele).closest(".SPControlUploadUI");
    var page    = e.find("iframe").contents();
    var msgs    = page.find("input[type='file']").closest("tr").siblings().find("span");
    var o       = e.data("SPControlUploadOptions");
    var ev      = o.ev;
    
    // Insure all messages are initially hidden (these might have been
    // visible from any prior call to upload the document where it failed.)
    msgs.css("display", "none");
    
    // If no file was entered, then there is nothing to upload.
    if (!page.find("input[type='file']").val()) {
        return;
    }
    
    // Set the event info
    // TODO: Look into building the event with $.Event("ev name here")
    ev.state    = 2;
    ev.action   = "preLoad";
    
    // if a user function was defined, then call it now and give it the event
    // object defined above.
    // If fucntion returns a boolean false, then we exit here and never submit
    // the form.
    if (o.onPageChange) {
        if (o.onPageChange.call(e.closest(".hasSPControlUploadUI"), ev) === false){
            return false;
        }
    }
    
    // Hide the upload button, and Submit the form
    e.find(".buttonPane")
            .css("display", "none")
            .end()
        .find(".loadingOverlay")
            .fadeIn("slow", function(){
                page.find("input[type='button'][id$='btnOK']").click();

                // If error message are displayed (after we click upload button), 
                // then just return control back to the user.
                if (msgs.is(":visible")) {
//                    console.debug("_onUpload() msgs.is(visible) return true. showing button pane.");
                    e.find(".loadingOverlay")
                            .css("display", "none")
                            .end()
                        .find(".buttonPane")
                            .show(0)
                            .end();
                    return false;
                }
            });
    
};//* $.pt._onUpload()


/**
 * FUNTION: $.pt._onIFramePageChange()
 * 
 *  Called when ever the iframe is "load"ed. Function is bound to
 *  the iframe html element's _load event so that it is called each
 *  time the content of the iframe (the page) is reloaded. 
 * 
 * PARAMS:
 * 
 *  @param {jQuery} ele -   jQuery object representing the .SPControlUploadUI
 *                          element.
 * 
 * RETURN:
 * 
 *  @return {undefined} nothing.
 * 
 */
$.pt._onIFramePageChange = function(ele){
    
    var e       = $(ele).closest(".SPControlUploadUI"),
        page    = e.find("iframe").contents(),
        opt     = e.data("SPControlUploadOptions"),
        ev      = opt.ev;
    
    ev.pageUrl  = page[0].location.href;
    ev.page     = page;
    
//    console.debug("$.pt._onIFramePageChange(): In...");
    
    // Because just about every browser differs on how the load() event
    // is triggered, we do all our work in a function that is triggered
    // 500 millisends from now. By then, the page (regardless of browser)
    // should be in a state that is useful.
    setTimeout(
        function(){

            // If the URL of the page in the iFrame is the same as the 
            // upload page then this is either the
            // initial load of the page or an error has occured...
            // Hide the page and show only the upload form element.
            if (
                    $.pt.isSameUrlpage(
                        $.pt.getUnEscapedUrl(ev.pageUrl),
                        $.pt.getUnEscapedUrl(opt.uploadPage))
                ||  $.pt.isSameUrlpage(
                        $.pt.getUnEscapedUrl(ev.pageUrl),
                        $.pt.getUnEscapedUrl(opt.uploadPage2))
            ) {
//                console.debug("_onIFramePageChange() URL is the same as the one originally requested.");
                
                page.find("form").children(":visible").hide();
                page.find("form").append(
                        "<div id='SPControlUploadModUI' style='position:"
                    +    "absolute;width:99.9%;height:99.9%x;left:0px;top:0px;"
                    +    "background-color:white;padding-top:3em;'></div>");
                
                // Is the page displaying an error page without the upload interface?
                // Capture error message and reload the page.
                // SP2010 Seems to behave differntly and land display errors a little
                // differently... so we try the <title> tag adn then the form action value. 
                if (    new RegExp(/error/i).test($.trim(page.find(".ms-pagetitle").text()))
                    ||  new RegExp(/error/i).test($.trim(page.find("title").text()))
                    ||  new RegExp(/error\.aspx/i).test($.trim(page.find("form").attr("action")))
                ) {
//                    console.debug("_onIFramePageChange() page displaying an error... Storing it and reloading upload form.");
                    
                    opt._lastError = page.find("[id$='LabelMessage']").text();
                    
                    // Lets avoid looping... Dont if it possible, but just in case.
                    if (opt._reloadCount > 1) {
                        alert("Error encountered during upload which is causing program to loop. Last upload error was: " + opt._lastError);
                        e.find(".loadingOverlay").fadeOut();
                        return;
                    }
                    
                    opt._reloadCount += 1;
                    e.find("iframe").attr("src", opt.uploadPage);
                    return;
                    
                // Not an error page.... 
                // Prepare the page for display to the user
                } else {
                    
                    // SP2010 Code
                    // If this is the new SP2010 "Processing..." page, then
                    // the just exit... there is nothing for us to do yet...
                    if (page.find("#GearPage") && !page.find("input[type='file']").length) {
//                        console.debug("_onIFramePageChange() SP2010 processing page... Exiting and waiting for next page...");
                        return;
                    }
                    
                    page.find("input[type='file']")
                        .closest("table")
                            .appendTo(page.find("#SPControlUploadModUI"))
                            .removeClass("ms-authoringcontrols")
                            .find("a[id$='UploadMultipleLink']")
                                .closest("tr")
                                    .css("display", "none")
                                    .end()
                                .end()
                            .find("input[type='checkbox'][name$='OverwriteSingle']")
                                .closest("tr")
                                    .css("display", "none")
                                    .end()
                                .end()
                            .find(".ms-fileinput")
                                .css("font-size", "13pt");
                    
                    // If there were any errors found during a previous call, then 
                    // display them now
                    if (opt._lastError) {
                        page.find("input[type='file']")
                            .after('<div style="color:red;"><div class="ui-state-error">ERROR: '
                                +    opt._lastError + '</div></div>');
                        opt._lastError = "";
                    }
                    opt._reloadCount = 0;
                    
                    // Set the override checkbox
                    if (opt.overwrite) {
                        page.find("input[type='checkbox'][name$='OverwriteSingle']")
                            .prop("checked", "checked");
                    } else {
                        page.find("input[type='checkbox'][name$='OverwriteSingle']")
                            .prop("checked", "");
                    }
                    
                    // Make sure the buttons are displayed and set proper event 
                    // param (for user defined functions)
//                    console.debug("_onIFramePageChange() Making buttons panel visible. state[1], action[postload], showoverlay[true].");
                    e.find(".buttonPane").show();
                    ev.state        = 1;
                    ev.action        = "postLoad";
                    ev.hideOverlay    = true;
                    
                }/* if: error page or upload UI? */
                
            // Else, we must be passed the upload page... 
            // set the state to 3 (passed upload) and bind a function to the
            // iframe document's form element (which in turn calls the user defined 
            // onPageChange event prior to sending the form on.
            } else {
                ev.state            = 3;
                ev.action           = "postLoad";
                ev.hideOverlay      = true;
                var form            = page.find("form").eq(0);
                var formOnSubmit    = form.prop("onsubmit");
                
                // If the current page is the 'uploadDonePage', then set
                // flag in the event, set flag to not hide the overlay
                // and insert message indicating upload is done.
                if ($.pt.isSameUrlpage(ev.pageUrl, opt.uploadDonePage)) {
                    ev.isUploadDone = true;
                    ev.hideOverlay  = false;
                    e.find(".loadingOverlay")
                        .empty()
                        .append('<div class="ui-state-highlight" style="width:80%;">' +
                                'Upload Complete!</div>');
                }
                
//                console.debug("_onIFramePageChange(): Binding function to form!");
                
                // SP seems to have a good hold of the Form, because
                // we are unable o bind an event via $. Thus:
                // The form's onsubmit has to be overriden with our
                // own function... The original function was captured
                // above, thus it will triggered... but we now control
                // when we trigger it.
                form[0].onsubmit = function(){

//                    console.debug("_onIFramePageChange(): in custom onsubmit... ");
                    
                    // Show the overlay without animation.
                    e.find(".loadingOverlay").css("display", "block");
                    
                    var allowFormToContinue = true;
                    
                    // if the user defined a function, then run it now and
                    // exit if the resposne is false (stop submition)
                    if ($.isFunction(opt.onPageChange)) {
                        allowFormToContinue = opt.onPageChange.call(
                                    e.closest(".hasSPControlUploadUI"),
                                    $.extend({}, ev, {state: 3, action: "preLoad"}));
                    }
                    if (allowFormToContinue === false) {
                        e.find(".loadingOverlay").fadeOut();
                        return allowFormToContinue;
                    };
                    
                    // if SP had a onSubmit defined, then execute it now and 
                    // exit if the resposne is false (stop submition)
                    if ($.isFunction(formOnSubmit)) {
                        allowFormToContinue = formOnSubmit();
                    }
                    if (allowFormToContinue === false) {
                        e.find(".loadingOverlay").fadeOut();
                        return allowFormToContinue;
                    };

                    // Return true, allowing the form to be submitted.
                    return allowFormToContinue;
                    
                };

                              
                // Bind a function to the iframe WINDOW object for when it is
                // unloaded.. At this point, nothing can be done to prevent
                // the page from being submitted, but we can still execute
                // the caller's function. 
                $(e.find("iframe")[0].contentWindow).unload(function(evv){
                    
                    // Make the busy panel visible without animation
                    e.find(".loadingOverlay").css("display", "block");
                    
                    if ($.isFunction(opt.onPageChange)) {
                        return opt.onPageChange
                            .call(
                                e.closest(".hasSPControlUploadUI"),
                                $.extend({}, ev, {state: 3, action: "preLoad"}) );
                    }
                });
                
            }//end:if
            
            // Call user event function    
            if (opt.onPageChange) {
                opt.onPageChange.call(e.closest(".hasSPControlUploadUI"), ev);
            }
            // Hide our overlay area
            if (ev.action.toLowerCase() != "postload" || ev.hideOverlay == true) {
                e.find(".loadingOverlay").fadeOut();
            }
            return;
        },
        500);//end:setTimeout()

};// $.pt._onIFramePageChange

/**
 * Determines whether two URLs are the same page. URLs could be the same page, but
 * have difference url params. This function will look only at the page (eveything
 * up to the "?") and will then compare them.
 * 
 * @param {String} u1   First URL
 * @param {String} u2   Second URL
 * @return {Boolean}
 * @memberOf jQuery.pt
 *
 */
$.pt.isSameUrlpage = function(u1, u2) {
    if (!u1 || !u2) { return false; }
    var matchString = u1;
    if (u1.indexOf("?") > -1) {
        matchString = u1.substring(0, u1.indexOf("?"));
    }
    if (u2.indexOf(matchString) == 0) {
        return true;
    } else {
        return false;
    }
};// $.pt.isSameUrlpage()


/**
 * Uses sharepoint default function for escaping urls.
 * @function
 */
$.pt.getEscapedUrl = escapeProperly;

/**
 * Uses sharepoint default function to un-escape urls.
 * @function
 */
$.pt.getUnEscapedUrl = unescapeProperly;


/**
 * Given a List name or a DOcument Library name, this method will retrieve
 * it's UID from SP.
 *
 * @param {String} listName     The name of the list.
 * @return {String}
 * @memberOf jQuery.pt
 *
 */
$.pt.getListUID = function(listName) {
    if (!listName) {
        return "";
    }
    var id = "";
    if ($.pt._cache["getListUID:" + listName]) {
        id = $.pt._cache["getListUID:" + listName];
        return id;
    }
    $().SPServices({
        operation: "GetList",
        listName: listName,
        async: false,
        completefunc: function (xData, Status) {
            id = $(xData.responseXML).find("List").attr("ID");
        }
    });
    if (id) {
        $.pt._cache["getListUID:" + listName] = id;
    }
    return id;
    
};// $.pt.getListUID()

/**
 * @property
 * Stores the Style sheet that is inserted into the page the first
 * time SPControlUpload is called.
 * Value is set at build time.
 * 
 */
$.pt.SPUploadStyleSheet = "_INCLUDE_SPUPLOAD_CSS_TEMPLATE_";
