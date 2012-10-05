SPControlUpload Widget
======================

jQuery plugin that populates the elements selected with a UI for
uploading a file to a Sharepoint location (library) without having
to leave the current page that the user is currently on.

Usage:
--------

    $("input[name='users']").SPControlUpload({
        list: "Shared Documents"
    });
    

Input Parameters:
-----------------

This method takes as input an object containing the following options

-   listName :      String. REQUIRED.
                    The name or UID of the list.
                    Example 'Shared Documents' or '{67587-89284-93884-78827-78823}'
-   folderPath :    String. Optional. Default="/"
                    Optional. The path to the folder inside of the Document Library where
                    the document should be uploaded to. Value can be either relative to the
                    document library root or absolute. Default is to place the
                    document at the root of the Document Library
                    Examples 'http://yourdomain.com/sites/site1/Shared Documents' or
                    '/sites/site1/Shared Documents'
 
-   uploadDonePage: String. Optional. Default="/_layouts/viewlsts.aspx".
                    Optional. The url of the page that should be loaded after the
                    file has been uploaded successful. Value MUTST start with http.
                    Default is 'http://yourdomain.com/sites/site1/_layouts/viewlsts.aspx'
  
-   onPageChange :  Function. Optional. Default=null.
                    Function that is called each time the form in the
                    iFrame is changed. The function 'this' keyword points to the
                    element that was used when this method was called. The function
                    is given one param; the event object created by this method.
                    Return value of this function will control flow of plugin.
                    Returning true (boolean), will allow processing to continue
                    at different stages (see the event object below), while 
                    returing false (boolean) will stop flow from continuing. The
                    check is strict; meaning that it has to be a boolean false in
                    order for flow to stop. 
-   uploadUrlOpt :  String. Optional. Default="".
                    String of data that should be appended to the upload page url,
                    following this '?". 
                    NOTE; The option "MultipleUpload=1" is NOT SUPPORTED.
                    This string value is assumed to have already been properly 
                    escaped for use in the url.
-   overwrite :     Boolean. Optional. Default=False.
                    True or False indicating if document being uploaded should
                    overwrite any existing one. Default is False (don't overwrite)
-   uploadPage :    String. Optional. Default="/_layouts/Upload.aspx".
                    The relative URL from the WebSite root to the upload page.
                    Default is "/_layouts/Upload.aspx". This value is appended to
                    to the website full url, which is retrieved using SPServices
                    utility.
-   overlayClass :  String. Optional. Default="".
                    A css class to be associated with the overlay that is displayed
                    over the iframe while loading of the page is going on.
-   overlayBgColor: String. Optional. Default="white".
                    A color to be used for the overlay area that is displayed over
                    the iframe wile loading of the page is going on. Default is
                    white. Set this to null if wanting only to use a class.
-   overlayMessage: String|HTMLElement|jQuery. Optional. Default="Loading..."
                    String or object/element to be displayed inside of the overlay
                    when it is displayed. Default is "Loading..."


Return Value:
-------------

This plugin will return a jQuery object that contains the initially selected
set of node, thus maintaining chainability.
 

Examples:
---------

TBD...
