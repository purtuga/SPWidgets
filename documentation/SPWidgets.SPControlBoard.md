SPShowBoard Widget
==================

Given a selector (an html element), this method will insert a Kan-Ban board inside of it based on one of the columns from the desired List.  The column must be of type Lookup or Choice, and it's values will be used by this widget to build the Board columns.
The widget support both columns set as Required or Optional and has input parameters available to filter the list of columns created. Currently, this widget supports no more than 20 columns total, with no more than 10 displayed at one time.


Usage
-----

    $("#board").SPShowBoard({
        list: "Tasks",
        field: "Status"
    });
    

Input Parameters
----------------

This method takes as input an object containing the supported options:

        $("#board").SPShowBoard({
            list:                   '',
            field:                  '',
            CAMLQuery:              '<Query></Query>',
            CAMLViewFields:         '',
            fieldFilter:            null,
            optionalLabel:          '(none)',
            template:               null,
            webURL:                 $().SPServices.SPGetCurrentSite(),
            showColPicker:          false,
            colPickerLabel:         "Columns",
            colPickerCloseLabel:    "Close",
            colPickerApplyLabel:    "Apply",
            onGetListItems:         null,
            onPreUpdate:            null,
            onBoardCreate:          null
        });

The default options for this widget can be manipulated/set via the following object:

        $.SPWidgets.defaults.board = {}

### Options


-   **list**      :   *String. Required.* <br />
    The list name or UID.

-   **field**     :   *String. Required.* <br />
    The field from the List from where the board should
    be built from. This field should be either of type
    CHOICE or LOOKUP.

-   **CAMLQuery** :   *String|Function. Optional. Default=&lt;Query&gt;&lt;/Query&gt;* </br />
    String with CAML query to be used against the list to filter what is displayed or a function that will provide the list of items (an array).
    
    If defining a Function, it will have a scope (this keyword) of the HTML element where this widget was bound and be given two input parameter:
    
    1.  a function that must be called and be given the array of objects each representing the List row to be displayed.
        
    2.  The options defined on input to this widget. The user defined function will be given a scope (this keyword) of the html element it was bound to.
    
    
    Example: Use of a string with the Query defined:

        options.CAMLQuery = '<Query><Where>' + 
                '<FieldRef Name="Project" />' +
                '<Value Type="Text">Latin America</Value>' +
            '</Where></Query>';
    
    Example: Use of a function that will return the List rows:

        options.CAMLQuery = function(sendResults, options) {
                //       this = html element
                // get Rows from DB
                $().SPServices({
                    operation:  "GetListItems",
                    listName:   "Tasks",
                    async:      true,
                    CAMLQuery:  '<Query><Where>' +
                                    '<FieldRef Name="Project" />' +
                                    '<Value Type="Text">Latin America</Value>' +
                                '</Where></Query>',
                    CAMLRowLimit:   0,
                    completefunc:   function(xData, status){
                        var rows = $(xData.responseXML)
                                    .SPFilterNode("z:row")
                                    .SPXmlToJson({includeAllAttrs: true});
                        // Call sendResults input param to 
                        // send it back to the SPShowBoard Widget.
                        sendResults( rows );
                } //end: completefunc()
            });
        }

     
-   **CAMLViewFields**    :   *String. Optional. Default=""* </br />
    String in CAML format with list of fields to be returned from the list when retrieving the rows to be displayed on the board.
    
    Example:
    
        CAMLViewFields: '<ViewFields>' +
                '<FieldRef Name="Title" />' +
                '<FieldRef Name="ID" />' +
                '<FieldRef Name="Attachments" />' +  
                '<FieldRef Name="Author" />' +
                '<FieldRef Name="Editor" />' +
                '<FieldRef Name="Created" />' +
                '<FieldRef Name="Modified" />' +
            "</ViewFields>"
     

-   **fieldFilter**       :   *String. Optional. Default=""* </br />
    For a field of type CHOICE, this option should be set to a comma delimietered list of column values to be displayed as the columns.
    
    For a field of type LOOKUP, this option should be set with the CAML Query to use for retrieving the list of column values from the Lookup List.
    
    Example: for a field of type CHOICE
    
        options.fieldFilter: "Not Started,In Progress,Completed,Deferred"
        
    Example: for a field of type LOOKUP
    
        options.fieldFilter: "<Query>" +
                    "<Where>" + 
                        "<Or>" +
                            "<Eq>" +
                                "<FieldRef Name='State' />" +
                                "<Value Type='Text'>New Jersey</Value>" +
                            "</Eq>" +
                            "<Eq>" +
                                "<FieldRef Name='State' />" +
                                "<Value Type='Text'>Alabama</Value>" +
                            "</Eq>" +
                       "</Or>" +
                    "</Where>" +
                    "<OrderBy>" +
                        "<FieldRef Name='State' Ascending='True' />" +
                    "</OrderBy>" +
                "</Query>"
    
    
-   **optionalLabel**     :   *String. Optional. Default="(none)"* </br />
    The string to be used as the State column header when
    field from where Board was built is optional in the
    List. 
 
-   **template**          :   *String|Function|Element|jQuery. Optional. Default="&lt;div/&gt;"* </br />
    The HTML template that will be used to for displaying
    items on the board. The HTML will be used with jQuery's
    .wrapInner() method and will use the Title field to
    populate the inner nodes.
    When defining a Function, it will be called with
    a context of the item container on board that
    should receive the content and be given two
    input parameters: an object with the list item
    and the original element that the board was bound
    to.
    Example:
 
        function(listItem, boardItemEle){
            // this = jQuery - List Item container within the board.
        } 


-   **webURL**     :   *String. Optional. Default=current site* </br />
    The URL of the site that hosts the List.


-   **showColPicker**     :   *Boolean. Optional. Default=false* </br />
    If true, the column picker option will be displayed on the page. Allows user to pick which column are visible/hidden. (Since v2.1)
    _Note: This option is automatically turned to True if the number of columns available is greater than 10._
    
    
-   **colPickerLabel**      :   *String. Optional. Default="Columns"* </br />
    The label for the column picker button that is displayed when _showColPicker_ option is set to _true_. (Since v2.1)
   
    
-   **colPickerCloseLabel** :   *String. Optional. Default="Close"* </br />
    The label for the column picker pop-up close button.  (Since v2.1)
    
    
-   **colPickerApplyLabel** :   *String. Optional. Default="Apply"* </br />
    The label for the column picker pop-up apply button.  (Since v2.1)
    
    
-   **onGetListItems**     :  *Function. Optional. Default=null* </br />
    Callback function to be called after data has been
    retrieved from the 'list'. Function will be given a
    scope (this) of the selection they used on input to
    this method and two input parameters: 
    An Array of Objects with the list of rows returned
    from the List, and
    A jQuery object representing the entire xml document
    response.
    
    Example:

        onGetListItems: function(items, xmlResponse){
            //this = jQuery element container selction
        } 
 
 
-   **onPreUpdate**     :   *Function. Optional. Default=null* </br />
    Callback function to be called just prior to a List Item
    update. The function should return a boolean indicating whether the
    update should be canceled. True will cancel the update.
    The callback will have a scope of the item being updated and be
    given 3 parameters:
    
    1.  the event object
    
    2.  the item (DOM element) that triggered the event and
     
    3.  a data object with information/methods for the current
        item/widget binding. The object will include two
        attributes that will impact the updates that will be done:</br />
        data.updates</br />
        An array of updates that will be made.
        The array will have, to start, the update to the
        state that was triggered by the move in the board.
        Additional updates can be added.
        Format will be identical to what SPServices uses:
        ["field", "value"]. Example:
            
            data.updates.push(["Title", "New title here"]);
            
        data.updatePromise</br />
        A jQuery.Promise that represents
        the update that will be made. This can be used to
        bind on additional functionality. The queued functions
        will be given the List Item object as well as the
        xml resposne returned from the update. The context of
        object will be the HTML element from where the update
        was triggered.
        
        The function should return a boolean indicating whether the
        update should be canceled. True will cancel the update.
        Example:
 
        onPreUpdate: function(ev, item, data){
            //this = jQuery element container selction
            
            data.updates.push(["Title", "Update was made!"]);
            
            data.updatePromise.done(function(){ alert("udpate done!"); });
        } 
 
 
-   **onBoardCreate**     :   *Function. Optional. Default=null* </br />
    Function triggered after board is initially created.
    See spwidget:boardcreate event for parameters that
    will be given to function.
 


Return Value
------------

This plugin will return a jQuery object that contains the initially selected
set of nodes (selector), thus maintaining chainability.


Methods
-------


-   **refresh**</br />
    Refreshes the data in the Board by retrieving the data
    from the list again. During a refresh, existing board
    items (the html element in DOM) is not actually deleted
    and recreated if it already exists, but re-used. It is
    important to note this specially if a custom template
    function was defined as an input param.
    Usage:

        $("#board").SPShowBoard("refresh");

-   **redraw**</br />
    Redraws the board without pulling in data from the list.
    Column heights will be normalized and jQuery UI's sortable
    widget will be refreshed.
 
        $("#board").SPShowBoard("redraw");

Events
------

This widget triggers several events that can be used to perform additional actions from those experienced in the board. In addition to the events below specific to this widget, events are also fired by the jQuery UI sortable interaction.

-   **spwidget:boardchange**</br />
    Event is triggered anytime a change happens in the board 
    The function scope (this variable) will point to the column element that received the new item and is given 3 input parameters:
    
    1.  A jQuery event object - the one generated by the jQuery UI's sortable interaction
    
    2.  the item (DOM element) that triggered the event
    
    3.  A data object with information/methods for the current item/widget binding.  The objects updates attribute will contain an array of array's with the updates that will be made to the item.
    
    Example:

        $("body").on("spwidget:boardchange", function(ev, item, data){
            // this = column that received item;
        })

-   **spwidget:boardcreate**</br />
    Event is triggered when the board is first created. It has the same scope and input elements as teh spwidget:boardchange event, above.

-   **spwidget:boarditemadd**</br />
    Event triggered when new items are added to the board (ex. from a refresh). Event will be given the following input params:
    
    1.  the event object (jquery)
    
    2.  the item (DOM element) that triggered the event
    
    3.  a data object with information/methods for the current item/widget binding.  The objects's .itemsModified attribute will contain an array of Objects  that were added.

-   **spwidget:boarditemremove**</br />
    Event triggered when items are removed from the board (ex. from a refresh). Event will be given the following input params:
    
    1.  the event object (jquery)
    
    2.  the board container (DOM element)
    
    3.  a data object with information/methods for the current item/widget binding.  The objects's .itemsModified attribute will contain an array of Objects that were removed.


Examples
--------


### Example 1

    $("<div/>").append("body")
        .SPShowBoard({
            list:   "Tasks",
            field:  "Status"
        });

