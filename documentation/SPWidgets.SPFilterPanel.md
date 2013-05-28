SPFilterPanel Widget
====================

Given a selector (an html element), this method will insert a UI that allows the user to enter filter criteria for a list. The widgets generates CAML filters from that data that can then be used by the hosting application to do further processing (ex. retrieve data). 

For columns that will be displayed to the user with a text input field (ex. Text, Note, Computed, etc.) the user can enter multiple keywords by delimitering them with a semicolon.  In addition, the following columns are displayed using widgets provided by this library:

-   Lookup Columns<br/>
    Displayed using the SPLookupField widget. User is able to select multiple lookup values.

-   People Columns<br/>
    Displayed using the pickSPUser widget. Multiple values can be selected.

-   Choice Columns<br/>
    Each choice value is displayed in a scrollable area as checkboxes, thus allowing the user to pick multiples. 

The SPFilterPanel widget was introduced with v2.1

Usage
-----

    $("#listfilter").SPFilterPanel({
        list: "Tasks",
        columns: [
            'Title', 'Status', 'AssignedTo', 'Predecessors'
        ],
        onFilterClick: function(filters){
            
            alert("Number of filters entered by the user: " + filters.count);
            
        }
    });
    

Input Parameters
----------------

This method takes as input an object containing the supported options:

        $("#board").SPFilterPanel({
            list:               '',
            webURL:             $().SPServices.SPGetCurrentSite(),
            columns:            ['Title'],
            textFieldTooltip:   'Use a semicolon to delimiter multiple keywords.',
            showFilterButton:   true,
            filterButtonLabel:  "Filter",
            onFilterClick:      null,
            onReady:            null,
            ignoreKeywords:     /^(of|and|a|an|to|by|the|or|from)$/i
        });

The default options for this widget can be manipulated/set via the following object:

        $.SPWidgets.defaults.filter = {}

### Options


-   **list**    :   *String. Required.* <br />
    The List that will be used to build the filter against.

-   **webURL**  :   *String. Optional. Default=_current_site_* <br />
    The site url of the list. Defaults to the site from where the widget was executed.

-   **columns** :   *Array. Optional. Default=['Title']* <br />
    An array with the list of columns that should be displayed. Default is the Title column. Any column can be used.
 

-   **textFieldTooltip**    :   *String. Optional. Default='Use a semicolon to delimiter multiple keywords.'* <br />
    The text that appear below Text fields, which instructs the user that a semicolon can be used to delimiter multiple keywords.

-   **showFilterButton**    :   *Boolean. Optional. Default=true* <br />
    True or false whether a button should be displayed at the bottom of the widget. Default is true. See _filterButtonLabel_ and _onFilterClick_ options for more on the use of this button.

-   **showStackedUI**    :   *Boolean. Optional. Default=false* <br />
    By default, the UI for each column is to place the Match type to the left of the area where the user defines the filters for the column. Setting this option to true will cause the UI to be presented stacked; where the match type is displayed above the column filter area. Use this options when displaying the Filter Panel in narrow container.

-   **filterButtonLabel**   :   *String. Optional. Default='Filter'* <br />
    The text that will be used in the button at the bottom of the filter panel. Used only when _showFilterButton_ is set to true. If a _onFilterClick_ function is not set, a click event can be set on _button.spwidget-button_
    
    Example:
    
        $("body").on("click", "button.spwidget-button", function(){
            // this = button
        });

-   **onFilterClick**       :   *Function. Optional. Default=null* <br />
    Used when _showFilterButton_ is set to true.  Function is executed when the button is clicked. Function is have a scope of the original container HTML element (the one where the widget was inserted) and be given one parameter: A _Filter_ object (see the getFilter method of this widget).
    
        onFilterClick: function(FilterObj) {
            // this = original container element
        }

-   **onReady**      :   *Function. Optional. Default=null* <br />
    A function to be executed when the widget is done being created. Function is called prior to making the widget visible and will have a scope of the original HTML element container (the one where the widget was inserted) and given one parameter: the original options object given to this widget.

-   **ignoreKeywords**      :   *RegEx. Optional. Default=/^(of|and|a|an|to|by|the|or|from)$/i* <br />
    A regular expression with the list of keywords to ignore. RegEx is used when parsing the values entered by the user in text fields. Default setting ignores the following: of, and, a, an, to, by, the, or, from


Return Value
------------

This plugin will return a jQuery object that contains the initially selected
set of nodes (selector), thus maintaining chainability.


Methods
-------


-   **getFilter**</br />
    Returns a Filter object with the values entered by the user. The object will have CAML Query ready string values as well as properties that hold the individual values entered by the user.
    
    Usage:

        $("#board").SPFilterPanel("getFilter");
    
    The Filter object return will contain the following:
    
        {
            CAMLQuery: 'string with query of all columns filters wrapped in an <And> aggregate',
            filters: {
                columnInternalName: {
                    matchType: 'Eq',
                    values: [
                        'filter value 1',
                        'filter value 2',
                        etc...
                    ],
                    CAMLQuery: 'string with query wrapped in an <Or> aggregate',
                    count: 0
                },
                etc...
           },
           count: 2 // number of filters created
        }


-   **destroy**</br />
    Removes the widget from the UI.
    
    Usage:
 
        $("#board").SPFilterPanel("destroy");


Examples
--------


### Example 1

    $("<div/>").appendTo("body")
        .SPFilterPanel({
            list: "Tasks",
            columns: [
                'Title', 'Status', 'AssignedTo', 'Predecessors'
            ],
            onFilterClick: function(filters){
                
                alert("Number of filters entered by the user: " + fitlers.count);
                
            }
        });

