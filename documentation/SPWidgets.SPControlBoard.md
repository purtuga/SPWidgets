SPShowBoard Widget
==================

Given a selector (an html element), this method will insert a Kan-Ban board inside of it based on one of the columns from the desired List.  The column must be of type Lookup or Choice, and it's values will be used by this widget to build the Board columns.
The widget support both columns set as Required or Optional and has input parameters available to filter the list of columns created. Currently, this widget supports no more than 20 columns total, with no more than 10 displayed at one time.

Below is a screen capture from the available demo:

![Board Widget](web/spwidgets.board.jpg)


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
            colPickerCheckLabel:    "Check-Uncheck All",
            colPickerMaxColMsg:     "Can not exceed 10 columns!",
            colPickerMinColMsg:     "Mininum of 2 required!",
            onGetListItems:         null,
            onPreUpdate:            null,
            onBoardCreate:          null
        });

The default options for this widget can be manipulated/set via the following object:

        $.SPWidgets.defaults.board = {}

### Options


-   **list**      :   *String. Required.* <br>
    The list name or UID.

-   **field**     :   *String. Required.* <br>
    The field from the List from where the board should
    be built from. This field should be either of type
    CHOICE or LOOKUP.

-   **CAMLQuery** :   *String|Function. Optional. Default=&lt;Query&gt;&lt;/Query&gt;* <br>
    String with CAML query to be used against the list to filter what is displayed or a function that will provide the list of items (an array).
    
    _Defining a Function_<br>
    If defining a Function, it must generate an array of objects with the list data that will be used to create the board items. This task can be quickly achived with the use of [SPServices Library][SPServices] library. That array of objects is then given to Board widget by calling the first input paramter given to this function.
    
    > *NOTE*: The Board widget support objects whose attribue values are of type Function. Thus the use of frameworks such as [knockout.js][knockout] to build view models is supported. See Example 3 below for such an use case.
    
    The function will have a scope (this keyword) of the HTML element where this widget was bound and be given two input parameter:
    
    -   _{Function}_ A function that must be called and be given the array of objects each representing the List row to be displayed. See example below.
    -   _{Object}_ The options defined on input to this widget.

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

     
-   **CAMLViewFields**    :   *String. Optional. Default=""* <br>
    String in CAML format with list of fields to be returned from the list when retrieving the rows to be displayed on the board. If left blank, the ID, TITLE and the column defined for the _field_ option will be used, as they are the minimum set required to build a board with the default options.
    
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
     

-   **fieldFilter**       :   *String. Optional. Default=""* <br>
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
    
    
-   **optionalLabel**     :   *String. Optional. Default="(none)"* <br>
    The string to be used as the State column header when field from where Board was built is optional in the List. 
 
-   **template**          :   *String|Function. Optional. Default="&lt;div/&gt;"* <br>
    The HTML template that will be used to for displaying items on the board. The template can container special tokens referencing List (internal) column names which are then used to replace with each row's information. Tokens are defined in the format of _{{Column_Internal_Name}}_. The defult template is defined as:
    
        <div>
            <div>#{{ID}}: {{Title}}</div>
            <div class="ui-state-active ui-corner-all spwidget-board-item-actions">
                <a class="spwidgets-board-action" href="javascript:" title="View Item" data-spwidgets_id="{{ID}}" data-spwidgets_board_action="view-item"><img src="/_layouts/images/icgen.gif" border="0"/></a>
                <a class="spwidgets-board-action" href="javascript:" title="Edit Item" data-spwidgets_id="{{ID}}" data-spwidgets_board_action="edit-item"><img src="/_layouts/images/CMSEditSourceDoc.GIF" border="0"/></a>
            </div>
        </div>
    
    This option can also be defined as a Function whose job is to create the markup around the List row.  The function must return a String when creating a row's UI for the first time. When defining a Function, it will be given a scope of the HTML element that container the Board and provided with two input parameters:
    
    -   _{Object}_ The List row being created
    -   _{jQuery | Undefined}_ The row's current UI element if it was already created. This input parameter will be Null prior to creating the items the first time. However, if a _refresh_ is done and the Row is found to to still be returned, this input parameter will point to a jQuery object holding the element UI on the Board.
    
    If the function returns a true value, its return value **must** be a String reprensing the List row with data filled out. 
    
    Example: return the row's markup for display on the board if not yet created:
 
        options.template = function(rowObj, $rowUI){
            // this = jQuery - List Item container within the board.
            //
            // If UI is already created, exit. No need to re-create 
            if ($rowUI) {
                return;
            }
            // return a new item template
            return '<div><strong>' +
                    rowObj.ID + '</strong>: ' +
                    rowObj.Title + '</div>';
        } 


-   **webURL**     :   *String. Optional. Default=current site* <br>
    The URL of the site that hosts the List.


-   **showColPicker**     :   *Boolean. Optional. Default=false* <br>
    If true, the column picker option will be displayed on the page. Allows user to pick which column are visible/hidden. (Since v2.1)
    _Note: This option is automatically turned to True if the number of columns available is greater than 10._
    
    
-   **colPickerVisible**     :   *Array. Optional. Default=[]* <br>
    An array with a list of board columns that should be visible. Used only when showColPicker is true. (Since v2.1). 
    
    
-   **colPickerLabel**      :   *String. Optional. Default="Columns"* <br>
    The label for the column picker button that is displayed when _showColPicker_ option is set to _true_. (Since v2.1)
   
    
-   **colPickerCloseLabel** :   *String. Optional. Default="Close"* <br>
    The label for the column picker pop-up close button.  (Since v2.1)
    
    
-   **colPickerApplyLabel** :   *String. Optional. Default="Apply"* <br>
    The label for the column picker pop-up apply button.  (Since v2.1)


-   **colPickerCheckLabel** :   *String. Optional. Default="Check-Uncheck All"* <br>
    The label for the column picker pop-up Check/UnCheck all button.  (Since v2.1)


-   **colPickerTotalLabel** :   *String. Optional. Default="Selected."* <br>
    The label for the number of column selected text on the column picker popup. (Since v2.1)


-   **colPickerMinColMsg** :   *String. Optional. Default="Mininum of 2 required!"* <br>
    The message to display on column picker if user attempts to display less than 2 columns. (Since v2.1)

    
-   **colPickerMaxColMsg** :   *String. Optional. Default="Can not exceed 10 columns!"* <br>
    The message to display on column picker if user attempts to display more than 10 columns. (Since v2.1)

    
-   **onGetListItems**     :  *Function. Optional. Default=null* <br>
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


-   **onPreUpdate**     :   *Function. Optional. Default=null* <br>
    Callback function to be called just prior to a List Item update. The function should return a boolean indicating whether the update should be canceled. True will cancel the update.
    
    Example:
 
            options.onPreUpdate: function(ev, item, data){
                //this = jQuery element container selction
                //
                data.updates.push(["Title", "Update was made!"]);
                data.updatePromise.done(function(updatedItemObject, xData){
                        alert("udpate done!");
                    });
            }
    
    The callback will have a scope of the item being updated and be given 3 parameters:
    
    -   The event object
    
    -   The item (DOM element) that triggered the event and
    
    -   A data object with information/methods for the current item/widget binding. The object will include two attributes that will impact the updates that will be done:
            
            {
                updates:        {Array},
                updatePromise:  {Object}
            }
            
        *data.updates* <br/>
        An array of updates that will be made. The array will have, to start, the update to the state that was triggered by the move in the board. Additional updates can be added. Format will be identical to what SPServices uses:
        
            ["field", "value"]
        
        Example: Make an additional update
            
            data.updates.push(["Title", "New title here"]);
        
        *data.updatePromise*<br/>
        A jQuery.Promise that represents the update that will be made. This can be used to bind on additional functionality. The queued functions will be given:
        
        -   {Object} The updated List Item object
        -   {Object} The pre-update List Item object
        -   {XMLDocument} The xml response returned from the update (xData).
        
        The context of object will be the HTML element from where the update was triggered.
        

-   **onBoardCreate**     :   *Function. Optional. Default=null* <br>
    Function triggered after board is initially created. See spwidget:boardcreate event for parameters that will be given to function.


Return Value
------------

This plugin will return a jQuery object that contains the initially selected set of nodes (selector), thus maintaining chainability.


Methods
-------

The following methods are supported:

-   **refresh()**<br>
    Refreshes the data in the Board by retrieving the data from the list again. During a refresh, existing board items (the html element in DOM) is not actually deleted and recreated if it already exists, but re-used. It is important to note this specially if a custom template function was defined as an input param. 
    
    Usage:

        $("#board").SPShowBoard("refresh");


-   **redraw()**<br>
    Redraws the board without pulling in data from the list. Column heights will be normalized and jQuery UI's sortable widget will be refreshed.
    
    Usage:
 
        $("#board").SPShowBoard("redraw");


-   **setVisible([columnName,...])**<br>
    Sets the visible columns on the board. Method accepts as input an array of board column names to be displayed. A minimum of 2 must be difined and no more than 10 will be displayed. (Since 2.1)
    
    Input:
    
    -   {Array|String} : this method accepts an array of board column names that should be made visible. Using an empty array will set all column to be visible.  Using a static string value of 'All' will also make all columns visible.
    
    Example:
        
        // Set only 2 columns to be visible
        $("#board").SPShowBoard("setVisible", [ 'Not Started', 'Completed' ]); 
        
        // Set all column to be visible
        $("#board").SPShowBoard("setVisible", []); 
        

Events
------

This widget triggers several events that can be used to perform additional actions from those experienced in the board. In addition to the events below specific to this widget, events are also fired by the jQuery UI sortable interaction.

-   **spwidget:boardchange**<br>
    Event is triggered anytime a change happens in the board 
    The function scope (this variable) will point to the column element that received the new item and is given 3 input parameters:
    
    -   _{jQuery}_ A jQuery event object - the one generated by the jQuery UI sortable interaction
    -   _{HTMLElement}_ The item (DOM element) that triggered the event
    -   _{Object}_ A data object with information/methods for the current item/widget binding.  The objects updates attribute will contain an array of array's with the updates that will be made to the item.
    
    Example:

        $("body").on("spwidget:boardchange", function(ev, item, data){
            // this = column that received item;
        })


-   **spwidget:boardcreate**<br>
    Event is triggered when the board is first created. It has the same scope and input elements as teh spwidget:boardchange event, above.


-   **spwidget:boarditemadd**<br>
    Event triggered when new items are added to the board (ex. from a refresh). Event will be given the following input params:
    
    -   _{jQuery}_ The event object (jquery)
    -   _{HTMLElement}_ the item (DOM element) that triggered the event
    -   _{Object}_ A data object with information/methods for the current item/widget binding.  The objects's .itemsModified attribute will contain an array of Objects  that were added.


-   **spwidget:boarditemremove**<br>
    Event triggered when items are removed from the board (ex. from a refresh). Event will be given the following input params:
    
    -   _{jQuery}_ the event object (jquery)
    -   _{HTMLElement}_ the board container (DOM element)
    -   _{Object}_ a data object with information/methods for the current item/widget binding.  The objects's .itemsModified attribute will contain an array of Objects that were removed.


-   **spwidget:boardColumnChange**<br>
    Event triggered when columns on the board are changed. Event will be given the following input params:
    
    -   _{jQuery}_ jQuery Event object
    -   _{jQuery}_ The board container
    -   _{Array}_ A list of board columns currently visible.
    
    Example:
    
        $("#board").on("spwidget:boardColumnChange", function(ev, $board, colArray){
            //this = $board object
            alert("Columns changed to: " + colArray.join(" | "));
        });


Examples
--------


### Example 1

Simple usage. Simply supply the required input options of _list_ and _field_.

    $("<div/>").appendTo("body")
        .SPShowBoard({
            list:   "Tasks",
            field:  "Status"
        });


### Example 2

Simple usage. Creates a board based on the 'Status' field of Tasks list. The Column picker button is displayed, allowing the user to manipulate the columns displayed on teh board and also changs a few of the labels on the column picker.

It also listens for changes in the board's visible columns and writes that information to the console (for those browsers that support it). 

    $("<div/>")
        .appendTo("body")
        .on("spwidget:boardColumnChange", function(ev, $board, colObj){
            
            try {
                
                console.log("spwidget:boardColumnChange = Columns changed: " + colObj.join(" | "));
                
            } catch(e) {}
            
        })
        .SPShowBoard({
            list:                   "Tasks",
            field:                  "Status",
            showColPicker:          true,
            colPickerLabel:         "Choose Columns",
            colPickerCloseLabel:    "Close Picker",
            colPickerApplyLabel:    "Change"
        });
    

### Example 3

This example demostrates how knockout.js can be used to create the board item UI and thus take advantage of knockout live data binding.  The example below retrieves data from the list, converts each row to a knockout aware object and then provides that to the Board widget.  SPWidgets Board widget supports objects whose attibute values are of type Function.


    $().SPServices({
        operation:      "GetListItems",
        async:          true,
        listName:       "Tasks",
        CAMLRowLimit:   0
    })
    .done(fucntion(xData, status){
        
        // Check for errors here
        
        // Get the list of rows as an array of objects
        var rows        = $(xData.responseXML)
                            .SPFilterNode("z:row")
                            .SPXmlToJson({includeAllAttrs: true}),
            rowIdMap    = {};
        
        // Convert each object in the array to a knockout object
        $.each(rows, function(i, thisRow){
            
            // Convert each property on this row to an observable object.    
            for ( var column in thisRow ) {
                
                thisRow[ column ] =  ko.observable( thisRow[ column ] );
                
            }
            
            // create a map by ID to this row
            rowIdMap[ thisRow.ID() ] = thisRow;
            
        });
        
        // now build the Board
        var $board = $("<div/>").appendTo("body")
            /**
             * Event to listen to the Create and Item Add events.
             * Each time an item is added, we populate the template
             * with knockout.js
             */
            .on("spwidget:boardcreate spwidget:boarditemadd ", function(){
                
                $board.find("div.fill-template").each(function(){
                    
                    // get a local reference to this board item, and
                    // retrieve the row ID from the markup (which was
                    // included when we created the template)
                    var $thisItem = $(this).removeClass("fill-template"),
                        thisRowId   = $thisItem.data("row_id");
                    
                    // Apply model to the template
                    ko.applyBindings(
                        rowIdMap[ thisRowId ],
                        $thisItem[0]
                    );
                    
                });
                
            })
            /**
             * Create the board
             */
            .SPShowBoard({
                list:   "Tasks",
                field:  "Status",
                CAMLQuery: function(sendDataToBoard) {
                    
                    // We already got the data... Just send it to the board
                    sendDataToBoard( rows );
                    
                },
                template: function(rowObj, $rowUI) {
                    
                    // If UI is already done, exit here.
                    if ($rowUI){
                        
                        return;
                        
                    }
                    
                    // Else, Return the template that will be used by KO later
                    return '<div class="fill-template" data-row_id="' + 
                            rowObj.ID() + '">' +
                                '<div>' +
                                    '<span data-bind="text: ID"></span>' + 
                                    '(<span data-bind="text: Status"></span>)' +
                                '</div>' +
                                '<div data-bind="html: Description"></div>' +
                            '</div>';
                    
                }
            });
        
    });

Although this example does not do much with knockout, the possibilities are high specially for rich application, for things like caching approaches, data refresh strategies, etc.


[SPServices]: https://spservices.codeplex.com/ "SPServices - jQuery Library for SharePoint Web Services"
[knockout]: http://knockoutjs.com/ "Knockout - JavaScript UIs with MVVM"
