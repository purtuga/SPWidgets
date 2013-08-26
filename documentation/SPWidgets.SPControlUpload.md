SPControlUpload Widget
======================

jQuery plugin that inserts a widget into page for uploading a file to a SharePoint Document Library without having to leave the page that the user is currently on. This plugin provides a behavior similar to an async ajax call.

At its core, this plugin is simply uses the default SharePoint upload.aspx page inside an iframe, but manipulating it from the hosted page, so that the user is shown only a minimalist UI.  Code hooks are provided for allowing a developer to further manipulate the page(s) that may be shown after the initial upload _(ex. some libraries require users to fill in additional information and then check in the document. This can all be automated without user input.)_

In a normal flow, the upload process follows this sequence:

1.  Display upload form. User selects a file for upload and presses the upload button.
2.  File is uploaded to the server and depending on the setup, a check in page may be displayed.
3.  File is checked in and file upload is complete. Page is redirected to display/list view.


Usage
-----

    $("div.file_upload").SPControlUpload({
        listName: "Shared Documents",
        onPageChange: function(ev){
            if (ev.state === 3) {
                ev.hideOverlay = false;
                alert("Upload Done!");
            }
        }
    });
    

Input Parameters
----------------

This method takes as input an object containing the following options

-   **listName**  :   _String. **REQUIRED.**_ <br />
    The name or UID of the list.
    Example 'Shared Documents' or '{67587-89284-93884-78827-78823}'
    
-   **folderPath** :  *String. Optional. Default="/"* <br />
    The path to the folder inside of the Document Library where
    the document should be uploaded to. Value can be either relative to the
    document library root or absolute. Default is to place the
    document at the root of the Document Library
    Examples 'http://yourdomain.com/sites/site1/Shared Documents' or
    '/sites/site1/Shared Documents'

-   **uploadDonePage** : *String. Optional. Default="/undefined".* <br />
    The url of the page that should be loaded after the
    file has been uploaded successful. Under normal use, there should be
    no need to change the default on this input parameter, and it may be
    depricated in the future.

-   **onPageChange** :  *Function. Optional. Default=null.* <br />
    Function that is called each time the form in the
    iFrame is changed. The function 'this' keyword points to the
    element that was used when this method was called.
    The function is given one param - the event object created 
    by this plugin that includes information about the state
    of the upload. See Event Object below for more information.
    Return value of this function will control flow of plugin.
    Returning true (boolean), will allow processing to continue
    at different stages (see the event object below), while 
    returning false (boolean) will stop flow from continuing. The
    check is strict; meaning that it has to be a boolean false in
    order for flow to stop. 

        onPageChange: function(ev){
            // this=original $(selector)
            // so some processing
            return true; // allow form to proceed.
        }

-   **uploadUrlOpt** :  *String. Optional. Default="".* <br />
    String of data that should be appended to the upload page url,
    following this '?".
    This string value is assumed to have already been properly 
    escaped for use in the url.<br />
    _NOTE_: The option "MultipleUpload=1" is NOT SUPPORTED.

-   **overwrite** :   *Boolean. Optional. Default=False.* <br />
    True or False indicating if document being uploaded should
    overwrite any existing one. Default is False (don't overwrite)

-   **uploadPage** :  *String. Optional. Default="/_layouts/Upload.aspx".* <br />
    The relative URL from the WebSite root to the upload page.
    Default is "/_layouts/Upload.aspx". This value is appended to
    to the website full url, which is retrieved using SPServices
    utility.

-   **overlayClass** :  *String. Optional. Default="".* <br />
    A css class to be associated with the overlay that is displayed
    over the iframe while loading of the page is going on.

-   **overlayBgColor** : *String. Optional. Default="white".* <br />
    A color to be used for the overlay area that is displayed over the iframe wile loading of the page is going on. Default is white. Set this to null if wanting only to use a class.

-   **checkInFormHeight** : *String. Optional. Default="25em"* <br />
    The height of the displayed Form that is displayed when a file required CheckIn. The form is displayed after the file has been uploaded to the document library. The display of the form does not impact the layout of the page (it is displayed using position:absolute). New with v2.2

-   **overlayMessage** : *String|HTMLElement|jQuery. Optional. Default="Working on it".* <br />
    String or object/element to be displayed inside of the overlay when it is displayed. 

-   **selectFileLabel** : *String. Optional. Default="Click here to select file..."* <br />
    The label to display when no file is selected. New with v2.2

-   **uploadDoneMessage** : *String. Optional. Default="Upload Successful!"* <br />
    Message to display when file upload is completed. New with v2.2

-   **fileNameErrorMessage** : *String. Optional. Default="The file name is invalid or the file is empty. A file name cannot contain any of the following characters: \\ / : * ? \" &lt; &gt; | # { } % ~ &amp;"* <br />
    Error to display when file name is invalid (ex. contains unsupported characters). New with v2.2

-   **noFileErrorMessage** : *String. Optional. Default=""* <br />
    Error to display when no file is selected (but user clicks Upload). New with v2.2



Event Object
------------

The function defined for the *onPageChange* input parameter will receive as input an event object generated by this plugin. The object will contain information about the state of the upload process. 

The following attributes can be found in the event object: 

-   **ev.state**  : *Integer. 1|2|3* <br />
    A value from 1 through 3 that represents the state of
    the phisical file. This value, along with the 
    _ev.action_ value can be used to validate user input
    and if appropriate, cancel the send request to the
    server.
    
    1.  No File uploaded. Upload form is ready for user input.
        This is set when the form is initially loaded and the 
        File html element is ready for the user to attach the file.
        
    2.  No File uploaded. User has defined a file for upload and
        form is now ready to be submitted to the server. This state
        could be used in the _onPageChange_ to (for example) prevent
        the upload of certain file types.  
        
    3.  File has been uploaded and is now available on the server (note
        that it may not be checked in yet).  This state is set when the
        user has successfully uploaded the file to the server and no 
        errors were encountered (example invalid file characters).
        This state will remain through subsequent pages if the file
        requires check in.
      
-   **ev.action** : *String. preLoad|postLoad*  <br /> 
    The event action as it pertains to this plugin. Use this value in
    conjuction with the _ev.state_ to do additional validations on user
    input.
    *   _preLoad_   - action is taking place before the page is sent to
                      the server. The user (or code) must have initiated
                      an action that requires sending data to the server.
    *   _postLoad_  - action is taking place after page has completed
                      loading, but is not yet "visible" to the user.
      
-   **ev.hideOverlay** : *Boolean. Default=true.*  <br />
    Used when action=postLoad. Can be set by a callback function to false, 
    so that the busy overlay remains displayed and is not automatically 
    hidden.
      
-   **ev.pageUrl** : *String.* <br />
    The url of the page currently loaded in the iframe.
      
-   **ev.page** : *jQuery Object.*  <br />
    An object representing the page loaded inside the iFrame. This can be
    used to further manipulate the iframe's page content.
      
-   **ev.isUploadDone** : *Boolean.* <br />
    Indicates if the upload process is done. Basically, this means that 
    the processes has reached the page defined in the *updatePageDone* 
    parameter.
  

Return Value
------------

This plugin will return a jQuery object that contains the initially selected
set of node, thus maintaining chainability.
 

Examples
--------

### Example 1

The following example creates a jQuery UI dialog to display the upload interface to the user.  The dialog closes after the file is sucessfuly uploaded. It demostrates the use of the event object's _state_ and _isUploadDone_ attributes. 

    $('<div style="height:350px;width;100%;padding:.5em;"></div>')
        .appendTo("body")
        .dialog()
        .SPControlUpload({
            listName:       "Shared Documents", 
            onPageChange:   function(ev){
                
                // If we're done with the upload, then continue to show the
                // overlay, and fade out the area that contained the upload control. 
                if (ev.state == 3 && ev.isUploadDone) {
                    ev.hideOverlay = false;                    
                    setTimeout(function(){
                            $(this).dialog("close").dialog("destroy");
                            alert("Upload Done!");
                        }, 1000);
                    
                // If file was uploaded, but we have required fields to fill out,
                // then adjust page to only show the required data... 
                } else if (ev.state == 3 && !ev.isUploadDone) {
                            
                    // Because we're coming from the same domain, we
                    // have full access to the content of the page,
                    // and thus we can manipulate it. In this example
                    // I hide all chrome and show only the form fields
                    // the user should be filling in.
                    // Note that this works because in this very simple
                    // example, I assume that the required fields form
                    // does not have any special fields, like people pickers,
                    // etc.
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

### Example 2

In this example the file that the user is attempting to upload will be checked and if not a PDF file, then an error is displayed and the file is not uploaded.

    $('<div style="height:350px;width;100%;padding:.5em;"></div>')
        .appendTo("body")
        .dialog()
        .SPControlUpload({
            listName:       "Shared Documents", 
            onPageChange:   function(ev){
                
                // If we're done with the upload, then continue to show the
                // overlay, and fade out the area that contained the upload control. 
                if (ev.state == 3 && ev.isUploadDone) {
                    ev.hideOverlay = false;                    
                    setTimeout(function(){
                            $(this).dialog("close").dialog("destroy");
                            alert("Upload Done!");
                        }, 1000);
                    
                // If file was uploaded, but we have required fields to fill out,
                // then adjust page to only show the required data... 
                } else if (ev.state == 3 && !ev.isUploadDone) {
                    
                    ev.page.find("form")
                        .children(":visible")
                            .css("display", "none")
                            .addClass("ptWasVisible")
                            .end()
                        .find("input[title='Name']")
                            .closest("div[id^='WebPart']")
                                .appendTo(ev.page.find("form"));
                        }
                
                // User has clicked UPLOAD. If file type not pdf, error
                } else if (ev.state == 2 && ev.action === "preLoad") {
                    var uploadFileName = String(ev.page.find("input[type='file']").val()); 
                    if (uploadFileName.match(/\.pdf$/i) === null) {
                        alert("Only PDF file are allowed!!");
                        return false; // Cancel upload
                    }
                    
                }
            }//end: onPageChange()
        });

