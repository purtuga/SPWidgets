SPLookupField Widget
====================

SPLookupField Widget takes an input html field and converts it to a lookup field by displaying an autocomplete input area, for selecting new items from the lookup List, and displaying the already selected items on the page. This widget attempts to provide the same functionality as SharePoint's columns of type Lookup, but using more efficient methods of selecting values and presenting the user with a more modern and consistent user interface/experience across all browsers.

The value stored in the input field, after the user selects an item from the autocomplete field, will use the same format that SharePoint returns when a Lookup field is set, with the exception that only the ID is stored.

Example of the value stored when a single item selected:

    1;#

Example of the value stored when a 3 items are selected:

    1;#;#2;#;#3;#

A common utility (*$.SPWidgets.parseLookupFieldValue*) is available for parsing Lookup fields, both those created by this widget as well as those returned by SharePoint's Webservices.


Usage
-----

    $("input[name='productList']")
        .SPLookupField({
            list: 'Products'
        });
    

Input Parameters
----------------

This method takes as input an object containing the supported options:

    $("#board").SPLookupField({
        list:               '',
        allowMultiples:     true,
        inputLabel:         '',
        inputPlaceholder:   'Type and Pick',
        readOnly:           false,
        exactMatch:         true,
        uiContainer:        null,
        selectFields:       ['Title'],
        filter:             '',
        filterFields:       ['Title'],
        template:           '<div>{{Title}} <span class="spwidgets-item-remove">[x]</span></div>',
        listTemplate:       '{{Title}}',
        listHeight:         0,
        onItemAdd:          null,
        onItemRemove:       null,
        onReady:            null,
        msgNoItems:         "",
        maxResults:         50,
        minLength:          2,
        hideInput:          true,
        padDelimeter:       false,
        showSelector:       false
    });

The default options for this widget can be manipulated/set via the following object:

        $.SPWidgets.defaults.LookupField = {}

### Options


-   **list**                :   *String. Required.* <br />
     List name from where lookup will be done.

-   **allowMultiples**      :   *Boolean. Optional. Default=true* <br />
    Should the lookup widget allows multiple selection. Set to false if wanting only 1 item to be referenced.

-   **inputLabel**          :   *String. Optional. Default=''* <br />
    The label for the input field.

-   **inputPlaceholder**      :   *String. Optional. Default="Type and Pick"* <br />
    The value to be used in the Input Field placeholder attribute (HTML5 attribute)

-   **exactMatch**          :   *Boolean. Optional. Default=true* <br />
    If set to false, then the text entered by the user will be parsed into individual keywords and a search will be done on those instead.

-   **readOnly**      :   *Boolean. Optional. Default=false* <br />
    If true, field is displayed as readonly.

-   **uiContainer**      :   *Selector|Object. Optional. Default=null* <br />
    The container where the UI widget should be inserted. Default is directly after the input field

-   **selectFields**      :   *Array. Optional. Default=["Title"]* <br />
    Array of field names (internal names) that should be returned. ID is also used when the input value by the user is an integer.

-   **filter**      :   *String. Optional. Default=""* <br />
    Any additional filter criteria (in CAML format) to be added to the query when retrieving the table rows from the Lookup list. This should be only the filtering criteria with no <Query> and no <where> clause. Example:
        
        <Contains>
            <FieldRef Name="Title" />
            <Value Type="Text">New</Value>
        </Contains>

-   **filterFields**      :   *Array. Optional. Default=["Title"]* <br />
    Array of column names (internal names) that will be used to attempt to match the user's typed input.
    Example: If wanting to search the Title, "Job Description" and Notes fields for the value that the user typed in, this field would be set as follows: 
        
        options.filterFields=[
            "Title",
            "Job_x0020_Description",
            "Notes"
        ]

-   **template**      :   *String. Optional. Default='&lt;div&gt;{{Title}} &lt;span class="spwidgets-item-remove"&gt;[x]&lt;/span&gt;&lt;/div&gt;' <br />
    The template (most likely html) to be used for displaying the item once selected. Use the following format for item column placeholders {{fieldInternalName}}. Any column returned in the query response from the Lookup list can be used.
    When defining HTML for this value, an element containing a css class of 'spwidgets-item-remove' will be used to remove the item from the list of selected items. Example:
        
        options.template='<div>{{Title}} [<span class="spwidgets-item-remove">x</span>]</div>'

-   **listTemplate**      :   *String. Optional. Default='{{Title}}'* <br />
    The template to be used for displaying the suggested items in the autocomplete field. Use the following format for item column placeholders {{fieldInternalName}}.

-   **listHeight**      :   *Number. Optional. Default=0* <br />
    The height to be set on the Autocomplete suggestion box. Use this value when there is a chance for allot of values to be returned on a query. It will place a fixed height on the container holding the suggestions and apply a scroll bar.

-   **padDelimeter**      :   *Boolean. Optional. Default=false* <br />
    If true, then an extra delimiter (;#) will be inserted at the beginning of the stored value. This may be helpful in custom solution when attempting to filter a list column whose value has been set by this widget.  For example, if the a list container two rows whose lookup widget column held the following:
        
        2;#;#;#15;#
        5;#;#2;#
    
    And a query to this list column was done to match any row with the lookup reference to item #5, the query would most likely return both rows from the example above. (query would probably filter on 5;#). By padding the first lookup item stored, the values above would now look like the following:
    
        ;#;#2;#;#;#15;#
        ;#;#5;#;#2;#
    
    And a query to this column would be adjusted to filter on the column containing a value of *;#5;#* which would return the second record only.
    
    
-   **onReady**      :   *Function. Optional. Default=null* <br />
    Triggered after the LookupField has been setup. This is triggered either after completing the UI setup, or if the field already had pre-defined values, after retrieving that data and displaying it. Function will be given a scope of the original selector (the field) as well as the following input params: 1) widget container (jQuery). Example:
        
        onReady: function(widgetCntr){
            //this=original selector to where the widget was bound
        }

-   **onItemAdd**      :   *Function. Optional. Default=null* <br />
    Function that will be called when adding a new item reference to the list of currently picked item. This method could, if necessary remove the new item from the UI (ex. due to some custom validation rule).
    The function will be given a scope of the bound area (the input field) as well as two input parameters: 1) A jQuery object representing the new item on the UI and 2) An object with the item's information
    Example:
    
        onItemAdd: function($newItemSelection, itemObject, widgetCntr){
            //this=original selector to where the widget was bound
        }

-   **msgNoItems**      :   *String. Optional. Default=""* <br />
    Message to be displayed when no items are selected. Set this to null/blank if wanting nothing to be displayed, which will result in only the input selection field being displayed.

-   **maxResults**      :   *Integer. Optional. Default=50* <br />
    Max number of results to be returned as the user types the filter

-   **minLength**      :   *Integer. Optional. Default=2* <br />
    The minimum length before the autocomplete search is triggered.

-   **hideInput**      :   *Boolean. Optional. Default=true* <br />
    Option used only when allowMultiples is false. It will hide the input field once a value has been selected. Only way to get it displayed again is to remove existing selected item.

-   **hideInput**      :   *Boolean. Optional. Default=false* <br />
    If true, then an icon will be displayed to the right of the selection input field that displays a popup displaying all values currently in the lookup List. 



Return Value
------------

This plugin will return a jQuery object that contains the initially selected
set of nodes (selector), thus maintaining chainability.


Methods
-------

All methods provided by this widget are invoked by calling SPLookupField on the original input element that the widget was called on but providing the word 'method' as the first argument to the function:

    $("input[name='productList']").SPLookupField("method", "method name"[, options] )


-   **clear**</br />
    The clean method removes items from the selection list. When called with no input options, all items selected will be removed.  Optionally, an object can be defined and the ID or ID's of specific items can be used as input.
    Example:
        
        // Clears all selections
        $(ele).SPLookupField("method", "clear"); // clears all
        
        // Clear ID #5
        $(ele).SPLookupField("method", "clear", { id: 5 });
        
        // Clear ID #5 and #10
        $(ele).SPLookupField("method", "clear", { id: [ 5, 10 ] });
        


Events
------

No custom events are currently triggered by this widget. 
    
    
Examples
--------


### Example 1

    


### Example 2

