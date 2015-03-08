define([
    'jquery',
    'text!./upload.html',
    '../spapi/getList',
    '../spapi/getListItems',
    '../spapi/getSiteUrl',
    '../sputils/getSPVersion',
    //------------------------------
    'less!./upload'
], function(
    $,
    uploadTemplate,
    getList,
    getListItems,
    getSiteUrl,
    getSPVersion
){

    /**
     * jQuery plugin that interacts with Sharepoint built in Upload.aspx through an iframe
     * to provide to the user an upload UI without leaving actually leaving the page, thus
     * simulating an ajax file upload interaction.
     * Currently used to upload files to a Document Library with out having the user go
     * through the many SP pages and without having to leave the user's current page
     */

    var Upload = {},
        upload;

    /**
     * @property {Boolean} Tracks if the CSS injection into the page has been done.
     */
    Upload.isInitDone = false;

    /**
     * Defaults
     */
    Upload.defaults = {
        listName:               '',
        folderPath:             '',
        uploadDonePage:         '',
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
        webURL:                 null, // set later
        debug:                  false,
        filenameInputSelector: "input[id$='onetidIOFile']" // 3/14/2014: Undocumented for now
    };


    /**
     * jQuery plugin that populates the elements selected with a UI for
     * uploading a file to a Sharepoint location (library) without having
     * to leave the current page that the user is currently on.
     *
     * @param {HTMLElement|jQuery|selector} containers
     *      The elements where the widget should be initialized.
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
     *                  to the website full url.
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
     * @param {String} [options.debug=false]
     *              Turns debug on for this widget.
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
     */
    upload = function (containers, options) {

        // if the global styles have not yet been inserted into the page, do it now
        if (!Upload.isInitDone) {

            Upload.isInitDone = true;
            if (!Upload.defaults.webURL) {
                Upload.defaults.webURL = getSiteUrl();
            }

        }

        return containers.each(function(){

            var opt = $.extend({}, Upload.defaults, options),
                overlayCss;
            /**
             * Define the log method for this instance.
             */
            opt.log = ( opt.debug ? Upload.log : function(){} );

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

                getListItems({
                    async:          false,
                    webURL:         opt.webURL,
                    listName:       opt.listName,
                    CAMLQuery:      "<Query><Where>" +
                            "<Eq><FieldRef Name='Author' LookupId='TRUE'/>" +
                            "<Value Type='Integer'><UserID/></Value></Eq>" +
                            "</Where><OrderBy><FieldRef Name='Modified' Ascending='FALSE'/>" +
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
                    completefunc:       function(xData, status, rows) {

                        if (rows.length) {

                            lastFile = rows[0];

                        }

                    }
                });

                return lastFile;

            }; //end: opt.getUploadedFileRow()


            /**
             * Given a URL, this method will check if it is one of the
             * known upload pages of SharePoint. True = yes it is.
             * False = no it is not.
             *
             * @param {String} url
             *      URL is assumed to be full url, including http.
             *
             * @return {Boolean}
             */
            opt.isUploadPage = function(url) {

                // Uses parser apprach shown here:
                // https://gist.github.com/jlong/2428561

                var answer  = false,
                    parser  = document.createElement('a'),
                    parser2 = null;

                parser.href = String(url).toLowerCase();

                // If user defined their own Upload page, then
                // parse that URL and use it in matching.
                // Else, just see if the input url has Upload.aspx
                // or UploadEx.aspx.
                if (opt.userUploadPage) {

                    parser2         = document.createElement('a');
                    parser2.href    = String(opt.userUploadPage).toLowerCase();

                    if (parser.pathname === parser2.pathname) {

                        answer = true;

                    }

                } else {

                    // 2007 = Upload.aspx
                    // 2010, 2013 = UploadEx.aspx
                    answer = /upload(ex)?\.aspx$/.test(parser.pathname);

                }

                return answer;

            }; //end: opt.isUploadPage()

            /** ---------------------------------------------------------- **/
            /** -------------[        SETUP WIDGET      ]----------------- **/
            /** ---------------------------------------------------------- **/

            // If list Name is not the UID, then get it now
            if (opt.listName && opt.listName.indexOf("{") !== 0) {

                opt.listName = Upload.getListUID(opt.listName);

            }
            // If list name is not defined - error
            if (!opt.listName) {

                $(this).html('<div class="ui-state-error">Input parameter [listName] not valid!</div>');
                return this;

            }

            // If user did not define the Upload page on input, then set it depending
            // on SP version. Else, if the user defined the upload page, ensure it
            // is a full url starting at http...
            opt.spVersion       = getSPVersion(true);
            opt.userUploadPage  = opt.uploadPage;
            opt.uploadPage      = String(opt.uploadPage);

            if (!opt.uploadPage) {

                switch(opt.spVersion) {

                    case "2013":

                        opt.uploadPage = opt.webURL + '/_layouts/15/UploadEx.aspx';

                        break;

                    case "2010":

                        opt.uploadPage = opt.webURL + "/_layouts/UploadEx.aspx";

                        break;

                    // Default: SP 2007
                    default:

                        opt.uploadPage = opt.webURL + '/_layouts/Upload.aspx';

                        break;

                }

            // If user defined a upload page using relative URL from root of site, then
            // prepend the site URL.
            } else if (opt.uploadPage.toLowerCase().indexOf("http") === -1) {

                var s = "/";

                if (opt.uploadPage.indexOf('/') === 0) {

                    s = "";

                }

                opt.uploadPage = opt.webURL + s + opt.uploadPage;

            }


            opt.uploadDonePage = String(opt.uploadDonePage);

            // Set the uploadDonePage url
            if (!opt.uploadDonePage) {

                opt.uploadDonePage = opt.webURL + "/_layouts/images/STS_ListItem_43216.gif";

            }

            // _iframeLoadId is used to determine if the onIframeChange() function
            // should be run or not... It ensure that when a page is redirected, that
            // only the last function to be spawn (via setTimeout) is run.
            opt._iframeLoadId = 1;

            // Create additional non-overridable options
            opt._uploadUrlParams    = "?List=" +
                                      encodeURIComponent(opt.listName) + "&RootFolder=" +
                                      encodeURIComponent(opt.folderPath) + "&Source=" +
                                      encodeURIComponent(opt.uploadDonePage) +
                                      "&" + (new Date()).getTime() + "=1&" + opt.uploadUrlOpt;
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
             *          the file upload form. The flow is:
             *
             *              [1]                 [2]                 [3]
             *          [ready for input] -> [pre-upload] -> [file uploaded]
             *
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
             *          to the server. State of '2' are handled by Upload.onUpdate
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
                    $(uploadTemplate).filter("div.SPControlUploadUI").clone()
                )
                .appendTo(opt.$ele.addClass("hasSPControlUploadUI").empty())
                .data("SPControlUploadOptions", opt);

            opt.$buttonCntr = opt.$cntr.find("div.buttonPane")
                    .click(function(/*ev*/){

                        Upload.onUpload(this);

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
                .on("click", ".spwidget-close", function(/*ev*/){

                    opt.showHideSuccess(true);

                })
                .find(".spwidget-msg")
                    .html(opt.uploadDoneMessage);

            // Setup error message closure
            opt.$errorCntr.on("click", ".spwidget-close", function(/*ev*/){

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
                .load(function(/*ev*/){

                    Upload.onIframeChange(opt.$ele.find(".SPControlUploadUI"));

                })
                .attr("src", opt.uploadPage)
                .end();

            return this;

        });// return each()

    };// upload

    /**
     * FUNCTION: Upload.onUpload()
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
    Upload.onUpload = function(ele){

        var e       = $(ele).closest(".SPControlUploadUI"),
            page    = e.find("iframe").contents(),
            msgs    = page.find("input[type='file']").closest("tr").siblings().find("span"),
            opt     = e.data("SPControlUploadOptions"),
            ev      = opt.ev;

        opt.log("Upload.onUpload(" + opt._iframeLoadId + "): Start....");

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
        opt.showHideBusy().then(function(){

            opt.log("Upload.onUpload(" + opt._iframeLoadId + "): Clicking the OK button on upload form.");

            page.find("input[type='button'][id$='btnOK']").click();

            // ev.action = "postLoad";

            // If error message are displayed (after we click upload button),
            // then just return control back to the user.
            if (msgs.is(":visible")) {

                opt.log("Upload.onUpload(" + opt._iframeLoadId + "): Error message reported! \n" + msgs.text());

                e.find(".loadingOverlay")
                        .css("display", "none")
                        .end();

                return false;

            }

        });

    };//* Upload.onUpload()

    /**
     * Returns true of false indicating if the given Selection has the
     * Sharepoint busy animation image/element.
     *
     * @param {jQuery} $doc
     *
     * @return {Boolean}
     */
    Upload.isSPBusyAnimation = function($doc) {

        if ($doc.find("#GearPage").length) {

            return true;

        }

        if ($doc.find("#ms-loading-box").length) {

            return true;

        }

        return false;

    }; /* Upload.isSPBusyAnimation() */

    /**
     * FUNTION: Upload.onIframeChange()
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
    Upload.onIframeChange = function(ele){

        var e       = $(ele).closest(".SPControlUploadUI"),
            opt     = e.data("SPControlUploadOptions"),
            id      = 0,
            page    = $(e.find("iframe").contents());

        if (opt.debug) {

            try {

                opt.log("Upload.onIframeChange(): ENTERING... Document readyState: " + page[0].readyState +
                " IFRAME URL: " + page[0].location.href);

            } catch(err){}

        }

        if (Upload.isSPBusyAnimation(page)) {

            opt.log("Upload.onIframeChange(): EXITING... Gear page displyed.");
            return;

        }

        // If the upload event state is 2, then {Upload.onUpload} has already
        // taken care of the form and user call back... There is nothing to do
        // here and form is arleady being submitted... Set the ev. to
        // postLoad and Exit.
        if (opt.ev.state === 2 && opt.ev.action === "preLoad" && page[0].spcontrolupload_init_done === true) {

            opt.log("Upload.onIframeChange(" + opt._iframeLoadId +
                "): Exiting! ev.action=[" + opt.ev.action + "] and ev.state=[" +
                opt.ev.state+ "] - Nothing to do. Action handled by onUpload(). Setting action to postLoad"
            );

            opt.ev.action = "postLoad";

            // FIXME: needed to comment this out for SP2007???
            return;

        }

        opt._iframeLoadId++;
        id = opt._iframeLoadId;

        opt.log("Upload.onIframeChange(" + id + "): State=[" + opt.ev.state + "] Action=[" + opt.ev.action + "]");

        // Because just about every browser differs on how the load() event
        // is triggered, we do all our work in a function that is triggered
        // 500 millisends from now. By then, the page (regardless of browser)
        // should be in a state that is useful.
        setTimeout(
            function(){

                // if this invocation is not the last iframe refresh ID,
                // then exit... there is another fucntion queued up...
                if (id !== opt._iframeLoadId) {

                    opt.log("Upload.onIframeChange(" + id + "): not latest invokation! Existing.");

                    return;

                }

                var ev      = opt.ev,
                    form    = page.find("form").eq(0);

                // Re-Set the page variale here (in timeout... Case the page changed and prior point is no good)
                page    = $(e.find("iframe").contents());

                opt.log("Upload.onIframeChange(" + id + "): STARTING... Executing setTimeout(). URL:" + page[0].location.href);

                // If page was already processed, then exit.
                if (page.spcontrolupload_init_done === true) {

                    opt.log("Upload.onIframeChange(" + id + "): EXITING!!! Page was already processed!");
                    return;

                }

                page.spcontrolupload_init_done = true;

                ev.pageUrl  = page[0].location.href;
                ev.page     = page;

                // Focus at the top of the form
                opt.$iframeCntr.scrollTop(0);
                page.scrollTop(0);

                // If the URL of the page in the iFrame is the same as the
                // upload page then this is either the
                // initial load of the page or an error has occured...
                // Hide the page and show only the upload form element.
                if (opt.isUploadPage(ev.pageUrl)) {

                    opt.log("Upload.onIframeChange(" + id + "): URL is the upload page!");

                    page.find("body").css({
                        overflow: "hidden"
                    });

                    form
                        .children(":visible")
                            .hide()
                            .end()
                        .append(
                            $(uploadTemplate).filter("div#SPControlUploadModUI").clone() )
                        .find("div.SPControlUploadModUIFileSelected")
                            .html(opt.selectFileMessage);

                    // Is the page displaying an error page without the upload interface?
                    // Capture error message and reload the page.
                    // SP2010 Seems to behave differntly and land display errors a little
                    // differently... so we try the <title> tag adn then the form action value.
                    if (
                        new RegExp(/error/i).test($.trim(page.find(".ms-pagetitle").text())) ||
                        new RegExp(/error/i).test($.trim(page.find("title").text())) ||
                        new RegExp(/error\.aspx/i).test($.trim(page.find("form").attr("action")))
                    ) {

                        opt.log("Upload.onIframeChange(" + id + "): page displaying an error... Storing it and reloading upload form.");

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

                    }/* if: error page or upload UI? */

                    // SP2010 Code
                    // If this is the new SP2010 "Processing..." page, then
                    // the just exit... there is nothing for us to do yet...
                    if (
                        Upload.isSPBusyAnimation(page) &&
                        !page.find("input[type='file']").length
                    ) {

                        opt.log("Upload.onIframeChange(" + id +
                            "): SP processing page (GearPage)... Exiting and waiting for next page..."
                        );

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
                            .on("change focus click", function(/*ev*/){

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
                                        filePath =  (filePath.replace(/\\/g, '/').split('/').pop()) || filePath;

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
                    ev.action       = "postLoad";
                    ev.hideOverlay  = true;


                //------------------------------------------------------------------------
                //------------------------------------------------------------------------
                // Else, we must be passed the upload page...
                // set the state to 3 (passed upload) and bind a function to the
                // iframe document's form element (which in turn calls the user defined
                // onPageChange event prior to sending the form on.
                } else {

                    opt.log(
                        "Upload.onIframeChange(" + opt._iframeLoadId +
                        "): File uploaded to server! Need [" + opt.uploadDonePage + "] to be done."
                    );

                    ev.state            = 3;
                    ev.action           = "postLoad";
                    ev.hideOverlay      = true;
                    ev.file             = opt.getUploadedFileRow();

                    // If the current page is the 'uploadDonePage', then set
                    // flag in the event, set flag to not hide the overlay
                    // and insert message indicating upload is done.
                    if (Upload.isSameUrlPage(ev.pageUrl, opt.uploadDonePage)) {

                        opt.log("Upload.onIframeChange(" + opt._iframeLoadId +
                            "): Upload widget process DONE!");

                        ev.isUploadDone = true;
                        ev.hideOverlay  = false;

                        // Show the busy indicator and success message.
                        opt.showHideBusy();
                        opt.showHideSuccess();

                    // Else, page is not the uploadDonePage... manipulate the form's
                    // onsubmit event.
                    } else {

                        opt.log("Upload.onIframeChange(" + opt._iframeLoadId +
                            "): Post Upload Form being displayed! Hooking into form.onsubmit!");

                        if (form.length) {

                            var formOnSubmit    = form.prop("onsubmit"),
                                $nameField      = form.find(opt.filenameInputSelector).eq(0);

                            // Hide the Form content if we found the File name input field,
                            // and move that input field to the root of the form.
                            if ($nameField.length) {

                                form.children(":visible")
                                    .css("display", "none")
                                    .addClass("ptWasVisible");

                                $nameField.closest("div[id^='WebPart']")
                                    .appendTo(form)
                                    // 8/30/2013: ensure the UI is visible.
                                    // Just in case it was at root of form
                                    .css("display", "")
                                    .removeClass("ptWasVisible");

                            }

                            // SP seems to have a good hold of the Form, because
                            // we are unable o bind an event via $. Thus:
                            // The form's onsubmit has to be overriden with our
                            // own function... The original function was captured
                            // above, thus it will triggered... but we now control
                            // when we trigger it.
                            // FIXME: this does not seem to do anything (at least in FF)
                            form[0].onsubmit = function(){

                                opt.log("Upload.onIframeChange(" + id + "): iframe form.onsubmit triggered!");

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

                        } //end: if() - do we have a form?

                    } //end: if(): onUpdateDonePage? or not?

                    // Bind a function to the iframe WINDOW object for when it is
                    // unloaded.. At this point, nothing can be done to prevent
                    // the page from being submitted, but we can still execute
                    // the caller's function.
                    $(e.find("iframe")[0].contentWindow).unload(function(/*evv*/){

                        opt.log("Upload.onIframeChange(" + opt._iframeLoadId +
                            "): iframe.unload() triggered!");

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

                }//end:if: is uploadPage? or past the file uploaded?

                opt.log("Upload.onIframeChange(" + opt._iframeLoadId +
                    "): iframe page setup done!");

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

    };// Upload.onIframeChange

    /**
     * Determines whether two URLs are the same page. URLs could be the same page, but
     * have difference url params. This function will look only at the page (eveything
     * up to the "?") and will then compare them. It will also work if the server portion
     * of a URL is not provided.
     *
     * @param {String} u1   First URL
     * @param {String} u2   Second URL
     *
     * @return {Boolean}
     *
     * @memberOf jQuery.pt
     *
     */
    Upload.isSameUrlPage = function(u1, u2) {

        if (!u1 || !u2) { return false; }

        var normalize   = function(urlString){

                            var parser = document.createElement('a');
                            parser.href = urlString;

                            return unescape(parser.pathname);

                        },
            url1        = String( normalize(u1) ).toLowerCase(),
            url2        = String( normalize(u2) ).toLowerCase();

        return (url1 === url2);

    };// Upload.isSameUrlPage()

    /**
     * Given a List name or a DOcument Library name, this method will retrieve
     * it's UID from SP.
     *
     * @param {String} listName     The name of the list.
     * @return {String}
     * @memberOf jQuery.pt
     *
     */
    Upload.getListUID = function(listName) {

        if (!listName) {
            return "";
        }

        var id = "";

        getList({
            listName:   listName,
            async:      false,
            cacheXML:   true,
            completefunc: function (xData/*, Status*/) {
                id = $(xData.responseXML).find("List").attr("ID");
            }
        });

        return id;

    };// Upload.getListUID()


    /**
     * Logs information to the output console.
     *
     * @param {String} msg
     */
    Upload.log = (function(){

        var logit, $output,
            n           = 1,
            c           = 0,
            isNative    = false,
            initDone    = false,
            bgColor     = [
                '#FFFFFF',
                '#F5F5F2'
            ];

        if (
            typeof console === "undefined" ||
            typeof console.debug === "undefined"
        ) {

            logit = function(){

                var i,j,
                    data = "";

                for(i=0,j=arguments.length; i<j; i++){

                    data += '<div style="padding: .1em .1em;background-color:' +
                            bgColor[c] + '"><span>[' + n + '] </span>' +
                            arguments[i] + '</div>';

                    n++;

                    if (c === 1) {

                        c = 0;

                    } else {

                        c = 1;

                    }

                }

                if (data) {

                    $output.append(data);

                    if (!$output.dialog("isOpen")) {

                        $output.dialog("open");

                    }

                }

            };

        } else {

            isNative    = true;

        }

        return function(){

            if (!initDone) {

                initDone = true;

                if (!isNative) {

                    $output = $("<div><h2>SPWidgets Debug Output</h2></div>")
                            .appendTo("body")
                            .dialog({
                                title: "Debug output",
                                height: 300
                            });

                }

            }

            if (isNative) {

                var i,j;

                for(i=0,j=arguments.length; i<j; i++){

                    console.debug(arguments[i]);

                }

            } else {

                logit.apply(this, arguments);

            }

        };

    })(); // end: Upload.log();

    upload.defaults = Upload.defaults;
    return upload;

});


