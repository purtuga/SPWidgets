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
;(function($){

    // Commented out strict mode. Causing errors.  "use strict";
    /*jslint nomen: true, plusplus: true */
    /*global SPWidgets, unescapeProperly, escapeProperly */
    
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
     * Defaults 
     */
    $.SPWidgets.defaults.upload = {
        listName:               '',
        folderPath:             '',
        uploadDonePage:         '/undefined',
        onPageChange:           null,
        onUploadDone:           null,
        uploadUrlOpt:           '',
        overwrite:              false,
        uploadPage:             '',
        overlayClass:           '',
        overlayBgColor:         'white',
        overlayMessage:         '<div>Working on it</div>',
        selectFileMessage:      "Click here to select file...",
        uploadDoneMessage:      "Upload Successful!",
        fileNameErrorMessage:   "A file name cannot contain any of the following characters: \\ / : * ? \" &lt; &gt; | # { } % ~ &amp;",
        noFileErrorMessage:     "No file selected!",
        checkInFormHeight:      '25em',
        webURL:                 $().SPServices.SPGetCurrentSite()
    }; 
    
    
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
     * @param {Function} [options.onUploadDone=null]
     *                  Triggered when file is successfully uploaded - or when it reaches
     *                  the uploadDonePage. This is normally triggered after a file is
     *                  checkedIn (if library requires it to be checked in).
     *                  Function will have a scope of the element used on input and
     *                  be given 1 parameter:  An object with the upload file metadata.
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
     * @param {String} [options.uploadPage=""]
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
     * @param {String|HTMLElement|jQuery} [options.selectFileMessage="Click here to select file..."]
     *              The message displayed for user to select file
     * 
     * @param {String} [options.checkInFormHeight='20em']
     *              The height of the form when a checkin is required.
     * 
     * @param {String} [options.webURL=Current site]
     *              The URL of the web site/sub site.
     * 
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
        
        return $(this).each(function(){
        
            var opt = $.extend({}, $.SPWidgets.defaults.upload, options),
                overlayCss;
            
            // if the global styles have not yet been inserted into the page, do it now
            if (!$.pt._isSPUploadCssDone) {
                
                $.pt._isSPUploadCssDone = true;
                
                $('<style type="text/css">' + "\n\n" +
                    $.pt.SPUploadStyleSheet + "\n\n</style>"
                )
                .prependTo("head");
                
            }
            
            /**
             * Shows or hides the Busy loading animation.
             * 
             * @param {Boolean} hide
             *      if True, then loading busy animation will be hidden.
             * 
             * @return {jQuery.Promise} 
             */
            opt.showHideBusy = function(hide) {
                
                return $.Deferred(function(dfd){
                    
                    if (hide) {
                        
                        opt.$busyOverlay.fadeOut("fast").promise().then(function(){
                            
                            dfd.resolve();
                            
                        });
                        
                    } else {
                        
                        opt.$busyOverlay.fadeIn("slow").promise().then(function(){
                            
                            dfd.resolve();
                            
                        });
                        
                    }            
                    
                })
                .promise();
                
            }; //end: showHideBusy()
            
            /**
             * Shows or hides the full Upload form. Used when the document has
             * been upload and perhaps there is a CheckIn page to go through.
             * 
             * @param {Boolean} hide
             * 
             * @return {Object} opt
             *  
             */
            opt.showHideFullForm = function(hide) {
                
                // HIde full form
                if (hide) {
                    
                    opt.$content.removeClass("spwidget-show-full-form");
                    
                    opt.$iframeCntr
                        .css({
                            overflow:   "",
                            height:     ""
                        });
                
                
                // SHOW full form
                } else {
                    
                    opt.$content.addClass("spwidget-show-full-form");
                    
                    opt.$iframeCntr
                        .css({
                            overflow:   "auto",
                            height:     "auto" // (opt.$iframe.outerHeight() + 5) + "px"
                        });
                    
                }
                
                return opt;
                
            }; //end: opt.showHideFullForm
            
            /**
             * Shows or hides the Upload Success message.
             * 
             * @param {Boolean} [hide=false]
             * 
             * @return {Object} opt
             *  
             */
            opt.showHideSuccess = function(hide){
                
                // HIDE
                if (hide) {
                    
                    opt.$successCntr
                        .stop()
                        .fadeOut()
                        .promise(function(){
                            
                            opt.$successCntr.css("display", "none");
                            
                        });
                    
                // DEFAULT: SHOW
                } else {
                    
                    opt.$successCntr
                        .stop()
                        .show()
                        .promise(function(){
                            
                            opt.$successCntr.css("display", "block");
                            
                        });
                    
                }
                
                return opt;
                
            }; //end: opt.showHideSuccess()
            
            /**
             * Shows an error on the widget. 
             * 
             * @param {Object} showErrorOptions
             * 
             * @param {String} showErrorOptions.message
             * @param {Boolean} [showErrorOptions.autoHide=true]
             * 
             * @return {Object} opt
             * 
             */
            opt.showError = function(showErrorOptions){
                
                var thisOpt = $.extend({}, {
                                    message:    '',
                                    autoHide:   true
                                },
                                showErrorOptions);
                
                opt.$errorCntrMsg.html(thisOpt.message);
                opt.$errorCntr
                    .stop()
                    .css("display", "block");
                
                if (thisOpt.autoHide) {
                    
                    opt.$errorCntr.animate(
                        { opacity: 1 },
                        5000,
                        function(){
                            
                            opt.clearError();
                            
                        }
                    );
                    
                }
                
                return opt;
                
            }; //end: opt.showError()
            
            /**
             * Clears any error currently displayed on the widget.
             *  
             * @return {Object} opt
             * 
             */
            opt.clearError = function() {
                
                opt.$errorCntr.css("display", "none");
                
                return opt;
                
            }; //end: opt.clearError
            
            /**
             * Resets the Upload widget after the upload.
             * 
             * @return {Object} opt 
             */
            opt.resetWidget = function() {
                
                opt.ev = {
                    state:          1,
                    action:         "uploading",
                    hideOverlay:    true,
                    pageUrl:        "",
                    page:           null, // a jquery object
                    isUploadDone:   false,
                    file:           {}
                };
                
                opt.$iframe.attr("src", opt.uploadPage);
                
                return opt;
                
            }; //end: opt.resetWidget()
            
            /**
             * Returns the last uploaded file for the user.
             * 
             * @return {Object} z:row object
             * 
             */
            opt.getUploadedFileRow = function() {
                
                var lastFile = {};
                
                $().SPServices({
                    operation:      "GetListItems",
                    async:          false,
                    webURL:         opt.webURL,
                    listName:       opt.listName,
                    CAMLQuery:      "<Query><Where>" +
                            "<Eq><FieldRef Name='Author' LookupId='TRUE'/>" +
                            "<Value Type='Integer'><UserID/></Value></Eq>" +
                            "</Where><OrderBy><FieldRef Name='Created' Ascending='FALSE'/>" +
                            "</OrderBy></Query>",
                    CAMLViewFields: "<ViewFields>" +
                            "<FieldRef Name='ID'/>" +
                            "<FieldRef Name='EncodedAbsUrl'/>" +
                            "<FieldRef Name='FileLeafRef' />" +
                            "<FieldRef Name='Author' />" +
                            "<FieldRef Name='Editor' />" +
                            "<FieldRef Name='Created' />" +
                            "<FieldRef Name='Modified' />" +
                        "</ViewFields>",
                    CAMLRowLimit:       1,
                    CAMLQueryOptions:   "<QueryOptions><ViewAttributes Scope='Recursive' /></QueryOptions>",
                    completefunc:       function(xData, status) {
                        
                        var rows = $(xData.responseXML)
                                    .SPFilterNode("z:row")
                                    .SPXmlToJson({includeAllAttrs: true});
                        
                        if (rows.length) {
                            
                            lastFile = rows[0];
                            
                        }
                        
                    }
                });
                
                return lastFile;
                
            }; //end: opt.getUploadedFileRow()
            
            
            /** ---------------------------------------------------------- **/
            /** -------------[        SETUP WIDGET      ]----------------- **/
            /** ---------------------------------------------------------- **/
            
            // If list Name is not the UID, then get it now
            if (opt.listName && opt.listName.indexOf("{") !== 0) {
                
                opt.listName = $.pt.getListUID(opt.listName);
                
            }
            // If list name is not defined - error
            if (!opt.listName) {
                
                $(this).html('<div class="ui-state-error">Input parameter [listName] not valid!</div>');
                return this;
                
            }

            // If user did not define the Upload page on input, then set it depending
            // on SP version. Else, if the user defined the upload page, ensure it 
            // is a full url starting at http... 
            opt.spVersion     = $.SPWidgets.getSPVersion(true);
            opt.uploadPage    = String(opt.uploadPage);
            
            if (!opt.uploadPage) {
                
                switch(opt.spVersion) {
                    
                    case "2013":
                        
                        opt.uploadPage = opt.webURL + '/_layouts/15/UploadEx.aspx';
                        
                        break;
                    
                    case "2010":
                        
                        opt.uploadPage2 = opt.webURL + "/_layouts/UploadEx.aspx";
                        
                        break;
                    
                    // Default: SP 2007
                    default: 
                        
                        opt.uploadPage = opt.webURL + '/_layouts/Upload.aspx';
                        
                        break;
                    
                }
                
            } else if (opt.uploadPage.toLowerCase().indexOf("http") === -1) {
                
                var s = "/";
                
                if (opt.uploadPage.indexOf('/') == 0) {
                    
                    s = "";
                    
                }
                
                opt.uploadPage = opt.webURL + s + opt.uploadPage;
                
            }
            
            // Set the uploadDonePage url
            if (String(opt.uploadDonePage).toLowerCase().indexOf("http") === -1) {
                
                var s = "/";
                
                if (opt.uploadDonePage.indexOf('/') == 0) {
                    
                    s = "";
                    
                }
                
                opt.uploadDonePage = opt.webURL + s + opt.uploadDonePage;
                
            }
            
            // Create additional non-overridable options
            opt._uploadUrlParams    = "?List=" + 
                                      $.pt.getEscapedUrl(opt.listName) + "&RootFolder=" +
                                      $.pt.getEscapedUrl(opt.folderPath) + "&Source=" +
                                      $.pt.getEscapedUrl(opt.uploadDonePage) + "&" + opt.uploadUrlOpt;
            opt.uploadPage          = opt.uploadPage + opt._uploadUrlParams;
            opt._lastError          = "";
            opt._reloadCount        = 0;
           
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
            opt.ev            = {
                state:          1,
                action:         "uploading",
                hideOverlay:    true,
                pageUrl:        "",
                page:           null, // a jquery object
                isUploadDone:   false,
                file:           {} // populated when file is uploaded
            };
        
            // Create the UI on the element given used by the SPCOntrolUpload plugin
            opt.$ele    = $(this);
            overlayCss  = {};
            
            if (opt.overlayBgColor) {
                
                overlayCss["background-color"] = opt.overlayBgColor;
                
            }
            
            // Create the UI on the page
            opt.$cntr = $(
                    $($.pt.SPUploadHtml).filter("div.SPControlUploadUI").clone()
                )
                .appendTo(opt.$ele.addClass("hasSPControlUploadUI").empty())
                .data("SPControlUploadOptions", opt);
                
            opt.$buttonCntr = opt.$cntr.find("div.buttonPane")
                    .click(function(ev){
                        
                        $.pt._onUpload(this);
                        
                    });
                    
            // Store references
            opt.$content        = opt.$cntr.find("div.mainContainer");
            opt.$iframeCntr     = opt.$cntr.find("div.iFrameWindow");
            opt.$iframe         = opt.$iframeCntr.children('iframe');
            opt.$busyOverlay    = opt.$cntr.find("div.loadingOverlay");
            opt.$busyOverlayMsg = opt.$busyOverlay.find("div.loadingOverlayMsg");
            opt.$successCntr    = opt.$cntr.find("div.spwidget-success-cntr");
            opt.$errorCntr      = opt.$cntr.find("div.spwidget-error-cntr");
            opt.$errorCntrMsg   = opt.$errorCntr.find(".spwidget-msg");
            opt.reInvalidChr    = new RegExp("[\\\/\:\*\?\"\<\>\|\#\{\}\%\~\&]");
            
            // Setup success message closure listner and include user's message
            opt.$successCntr
                .on("click", ".spwidget-close", function(ev){
                    
                    opt.showHideSuccess(true);
                    
                })
                .find(".spwidget-msg")
                    .html(opt.uploadDoneMessage);
            
            // Setup error message closure
            opt.$errorCntr.on("click", ".spwidget-close", function(ev){
                
                opt.clearError();
                
            });
            
            // Setup the overlay 
            opt.$busyOverlay
                .addClass(opt.overlayClass)
                .css(overlayCss);
            
            opt.$busyOverlayMsg.html(opt.overlayMessage);
            
            // Show the loading animation and load the UI
            opt.showHideBusy();
            
            opt.$cntr.find("iframe")
                    .css("height", opt.checkInFormHeight)
                    .load(function(ev){
                        
                        $.pt._onIFramePageChange(opt.$ele.find(".SPControlUploadUI"));
                        
                    })
                    .attr("src", opt.uploadPage)
                    .end();
                   
            return this;
            
        });//each()
    
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
        
        var e       = $(ele).closest(".SPControlUploadUI"),
            page    = e.find("iframe").contents(),
            msgs    = page.find("input[type='file']").closest("tr").siblings().find("span"),
            opt     = e.data("SPControlUploadOptions"),
            ev      = opt.ev;
        
        // Insure all messages are initially hidden (these might have been
        // visible from any prior call to upload the document where it failed.)
        msgs.css("display", "none");
        
        // If no file was entered, then there is nothing to upload.
        if (!page.find("input[type='file']").val()) {
            
            opt.showError({message: opt.noFileErrorMessage});
            return;
            
        }
        
        // If file contains invalid charactors, then error
        if (opt.reInvalidChr.test(page.find("div.SPControlUploadModUIFileSelected").text())) {
            
            opt.showError({message: opt.fileNameErrorMessage});
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
        if (opt.onPageChange) {
            
            if (opt.onPageChange.call(opt.$ele, ev) === false){
                
                return false;
                
            }
            
        }
        
        opt.showHideFullForm(true);
        
        // Hide the upload button, and Submit the form after showing the busy animation
        // e.find(".buttonPane").css("display", "none")
        
        opt.showHideBusy().then(function(){
            
            page.find("input[type='button'][id$='btnOK']").click();
    
            // If error message are displayed (after we click upload button), 
            // then just return control back to the user.
            if (msgs.is(":visible")) {
                
                e.find(".loadingOverlay")
                        .css("display", "none")
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
            ev      = opt.ev,
            form    = page.find("form").eq(0);
        
        ev.pageUrl  = page[0].location.href;
        ev.page     = page;
        
    //    console.debug("$.pt._onIFramePageChange(): In...");
        
        // Because just about every browser differs on how the load() event
        // is triggered, we do all our work in a function that is triggered
        // 500 millisends from now. By then, the page (regardless of browser)
        // should be in a state that is useful.
        setTimeout(
            function(){
                
                opt.$iframeCntr.scrollTop(0);
                
                // If the URL of the page in the iFrame is the same as the 
                // upload page then this is either the
                // initial load of the page or an error has occured...
                // Hide the page and show only the upload form element.
                if (
                        $.pt.isSameUrlpage(
                            $.pt.getUnEscapedUrl(ev.pageUrl),
                            $.pt.getUnEscapedUrl(opt.uploadPage))
                ) {
    //                console.debug("_onIFramePageChange() URL is the same as the one originally requested.");
                    
                    page.find("body").css({
                        overflow: "hidden"
                    });
                    
                    form
                        .children(":visible")
                            .hide()
                            .end()
                        .append(
                            $($.pt.SPUploadHtml).filter("div#SPControlUploadModUI").clone() )
                        .find("div.SPControlUploadModUIFileSelected")
                            .html(opt.selectFileMessage);
                    
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
                        
                        page.find("input[type='file']").closest("table")
                                .appendTo(page.find("#SPControlUploadModUI"))
                                .removeClass("ms-authoringcontrols");
                                
                        // setup upload input field on the iframe page, including
                        // setting up the change, focus and click event to update
                        // the input div that shows the file name selected to the
                        // user.
                        var $fileInput = page.find("#SPControlUploadModUI")
                            .find("input[type='file']")
                                .closest('tr')
                                    .siblings()
                                        .css("display", "none")
                                        .end()
                                    .end()
                                    .siblings("tr .ms-error")
                                        .css("display", "")
                                        .end()
                                .on("change focus click", function(ev){
                                        
                                        var $this       = $(this),
                                            filePath    = $this.val(),
                                            fileExt     = '',
                                            icon        = '/_layouts/images/urn-content-classes-smartfolder16.gif';
                                        
                                        if (filePath) {
                                            
                                            try {
                                                
                                                fileExt = filePath.substr(filePath.lastIndexOf(".") + 1);
                                                
                                            } catch(e) {
                                                
                                                fileExt = 'GEN';
                                                
                                            }
                                            
                                            icon = "/_layouts/images/IC" + 
                                                    fileExt.toUpperCase() + ".GIF";
                                            
                                            // Get only the file name
                                            filePath =  (filePath.replace(/\\/g, '/').split('/').pop())
                                                        || filePath;
                                            
                                        } else {
                                            
                                            filePath = opt.selectFileMessage;
                                            
                                        }
                                        
                                        page.find("#SPControlUploadModUI > div")
                                            .html(filePath)
                                            .css("background-image",
                                                "url('" + icon + "')");
                                        
                                        
                                }) //end: .on()
                                .css({
                                    cursor:         "pointer",
                                    height:         "100px",
                                    position:       "absolute",
                                    left:           "0px",
                                    top:            "0px",
                                    filter:         "alpha(opacity=1)",
                                    opacity:        "0.01",
                                    outline:        "none",
                                    "-moz-opacity": "0.01",
                                    "font-size":    "100px",
                                    'z-index':      "5"
                                });
                        
                        
                        // Setup the mouseover event so that the input file field 
                        // follows the mouse around while user hovers over
                        // the iframe.
                        form.on("mousemove", function(ev){
                            
                            $fileInput
                                .css({
                                    left:   (ev.pageX - ($fileInput.width() - 50)),
                                    top:    (ev.pageY - 30)
                                })
                                .blur();
                            
                        });
                        
                                
                        // If there were any errors found during a previous call, then 
                        // display them now
                        if (opt._lastError) {
                            
                            opt.showError({message: opt._lastError});
                            
               // TODO: cleanup
                            // page.find("input[type='file']")
                                // .after('<div style="color:red;"><div class="ui-state-error">ERROR: '
                                    // +    opt._lastError + '</div></div>');
                            
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
                        
                        // Set proper event values for user's callback
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
                    ev.file             = opt.getUploadedFileRow();
                    
                    // If the current page is the 'uploadDonePage', then set
                    // flag in the event, set flag to not hide the overlay
                    // and insert message indicating upload is done.
                    if ($.pt.isSameUrlpage(ev.pageUrl, opt.uploadDonePage)) {
                        
                        ev.isUploadDone = true;
                        ev.hideOverlay  = false;
                        
                        // Show the busy indicator and success message.
                        opt.showHideBusy();
                        opt.showHideSuccess();
                        
                    // Else, page is not the uploadDonePage... manipulate the form's
                    // onsubmit event.
                    } else {
                        
                        var formOnSubmit    = form.prop("onsubmit");
                        
                        // Show only the form in the page
                        form
                            .children(":visible")
                                .css("display", "none")
                                .addClass("ptWasVisible")
                                .end()
                            .find("input[title='Name']")
                                .closest("div[id^='WebPart']")
                                    .appendTo(page.find("form"));
                        
                        // SP seems to have a good hold of the Form, because
                        // we are unable o bind an event via $. Thus:
                        // The form's onsubmit has to be overriden with our
                        // own function... The original function was captured
                        // above, thus it will triggered... but we now control
                        // when we trigger it.
                        // FIXME: this does not seem to do anything (at least in FF)
                        form[0].onsubmit = function(){
        
                            // Show the overlay without animation.
                            opt.showHideBusy();
                            
                            var allowFormToContinue = true;
                            
                            // if the user defined a function, then run it now and
                            // exit if the resposne is false (stop submition)
                            if ($.isFunction(opt.onPageChange)) {
                                allowFormToContinue = opt.onPageChange.call(
                                            opt.$ele,
                                            $.extend({}, ev, {state: 3, action: "preLoad"}));
                            }
                            
                            if (allowFormToContinue === false) {
                                
                                opt.showHideBusy(true);
                                return allowFormToContinue;
                                
                            }
                            
                            // if SP had a onSubmit defined, then execute it now and 
                            // exit if the resposne is false (stop submition)
                            if ($.isFunction(formOnSubmit)) {
                                
                                allowFormToContinue = formOnSubmit();
                                
                            }
                            
                            if (allowFormToContinue === false) {
                                
                                opt.showHideBusy(true);
                                return allowFormToContinue;
                                
                            }
                            
                            // hide the form before continuing
                            opt.showHideFullForm(true);
                            
                            // Return true, allowing the form to be submitted.
                            return allowFormToContinue;
                            
                        };
                        
                    } //end: if(): onUpdateDonePage? or not?
                                  
                    // Bind a function to the iframe WINDOW object for when it is
                    // unloaded.. At this point, nothing can be done to prevent
                    // the page from being submitted, but we can still execute
                    // the caller's function. 
                    $(e.find("iframe")[0].contentWindow).unload(function(evv){
                        
                        // Make the busy panel visible without animation
                        // opt.$buttonCntr.css("display", "");
                        opt.showHideBusy();
                        opt.showHideFullForm(true);
                        
                        if ($.isFunction(opt.onPageChange)) {
                            
                            return opt.onPageChange.call(
                                    opt.$ele,
                                    $.extend({}, ev, {state: 3, action: "preLoad"}) );
                                    
                        }
                        
                    });
                    
                }//end:if
                
                // Call user event function
                if (opt.onPageChange) {
                    
                    opt.onPageChange.call(opt.$ele, ev);
                    
                }
                
                // Hide our overlay area
                if (ev.action.toLowerCase() !== "postload" || ev.hideOverlay === true) {
                    
                    opt.showHideBusy(true);
                    
                    if (ev.isUploadDone === false && ev.state === 3) {
                        
                        opt.showHideFullForm();
                        
                    }
                    
                }
                
                // If Upload is DONE, then reset form
                if (ev.isUploadDone) {
                    
                    // Reset upload form
                    opt.resetWidget();
                    
                    // Wait 4 seconds then hide success message
                    opt.$successCntr.animate(
                        { opacity: 1 },
                        3000,
                        function(){
                            
                            opt.showHideSuccess(true);
                            
                        }
                    );
                    
                    if ($.isFunction(opt.onUploadDone)) {
                        
                        opt.onUploadDone.call(opt.$ele, ev.file);
                        
                    }
                    
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
    
    /**
     * @property
     * Stores the HTML templates used by this widget.
     * Populated during the build process from the 
     * html.SPControlUpload.html file 
     */
    $.pt.SPUploadHtml = "_INCLUDE_SPUPLOAD_HTML_TEMPLATE_";
    
})(jQuery);
