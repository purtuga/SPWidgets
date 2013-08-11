Common Utilities
================

The following is a list of common utilities created internally for the widgets, but built generically and accessible externally.
  

$.SPWidgets.fillTemplate
------------------------

A simple templating engine. Meant primarily for use internally by the widgets provided in this library. It simply replaces tokens in a string having a format of {{tokenName}} with the tokeName found in the data to be used to fill out the template.
(Since v. 2.0) 

### Input Parameters

The method accepts as input an Object containing the options below.


#### Options

-   **tmplt** :   *String|jQuery|Selector. Required.* <br />
    The template to be used for the data.

-   **data** :   *Object|Array. Required.* <br />
    The object containing the data to be used in populating the template. This value can also be an Array of object, in which case, each array item will be used to build the return string.


### Return Value

This method will return a String with the template filled out with the data.


### Example 


    $.SPWidgets.fillTemplate({
        tmplt: '<div>{{Title}}</div>',
        data: [
            { Title: "Record number 1" },
            { Title: "Record number 2" },
            { Title: "Record number 3" },
            { Title: "Record number 4" }
        ]
    });



$.SPWidgets.getCamlLogical
--------------------------

Given an array of individual CAML filters, this method will wrap them all in a Logical condition (&lt;And&gt;&lt;/And&gt; or a &lt;Or&gt;&lt;/Or&gt;). The result (a string) will be returned to the caller. This method takes care of building the proper format required by the CAML conditional aggregates.
(Since v. 2.0) 


### Input Parameters

The method accepts as input an Object containing the options below.

#### Options

-   **values** :   *Array. Required* <br />
    The array of String elements that will be join into caml Logical condition.

-   **type** :   *String. Optional. Default="AND"* <br />
    Static String. The type of logical condition that the *values* should be wrapped in. Possible values are *AND* or *OR*.  Default is 'AND'.
     
-   **onEachValue** :   *Function. Optional. Default=null* <br />
    A function to process each items in the *values* array. Function must return the value that should be used in the logial concatenation. 
    Function is given 1 input param - the item currently being processed (from the *values* input param).


### Return Value

This method return a String containing the concatenated filter values in the appropriate AND or OR logical aggregate. 


### Example 1

    $.SPWidgets.getCamlLogical({
        type: "or",
        values: [
            "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test</Value></Eq>",
            "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test1</Value></Eq>",
            "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test2</Value></Eq>",
            "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test3</Value></Eq>",
            "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test4</Value></Eq>"
        ]
    })


### Example 2

    $.SPWidgets.getCamlLogical({
        type: "and",
        values: [
            "west",
            "east"
        ],
        onEachValue: function(loc){
            
            return "<Neq><FieldRef Name='Region'/>" +
                    "<Value Type='Text'>" + loc + "</Value></Neq>";
        
        }
    })


$.SPWidgets.makeSameHeight
--------------------------

Given a group of elements, this plugin will set their css *height* attribute to be at least equal to the tallest item among them.
(Since v. 2.0) 
 

### Input Parameters

-   **ele** :   *HTMLElement|Selector|jQuery. Required.* <br />
    The set of elements whose height will be adjusted.
    
-   **pad** :   *Integer. Optional. Default=0* <br />
    Number of pixels to add on to the height. Value will be added to the calculated height of the tallest element. 

### Return Value

The *ele* input parameters is returned to the caller. 


### Example

Given the following html markup:

    <div class="spwidgets-demo" style="height: 30px;" />
    <div class="spwidgets-demo" style="height: 100px;" />
    <div class="spwidgets-demo" style="height: 50px;" />
    <div class="spwidgets-demo" style="height: 102px;" />

The above elements height would be set to 102px by the following:

    
    $.SPWidgets.makeSameHeight( $("div.spwidgets-demo") );


$.SPWidgets.parseLookupFieldValue 
---------------------------------

Parses a SharePoint lookup values as returned by webservices (id;#title;#id;#Title) into an array of objects where each object contains the lookup item data (ID and TITLE).
(Since v. 2.0) 


### Input Parameters

-   **value** :   *String. Required.* <br />
    The column value that is returned by SharePoint's webservices for a Lookup column (normally in the format of ID;#Title) 

### Return Value

An array of objects will be returned where each object has two keys; title and id of the lookup item that was parsed. Example:

    [
        {
            id: "1",
            title: "Title of lookup item 1"
        },
        {
            id: "2",
            title: "Title of lookup item 2"
        },
        {
            id: "3",
            title: "Title of lookup item 3"
        }
    ]


### Example

    $.SPWidgets.parseLookupFieldValue("1;#Title of lookup item 1;#2;#Title of lookup item 2");



$.SPWidgets.SPGetDateString
---------------------------

Returns a date string in the format expected by SharePoint Date/time fields. Useful when wanting to obtain a date/time string for use in CAML Queries.
(Since v. 2.0) 

_Credit:  Matt [twitter @iOnline247](https://twitter.com/iOnline247) in this [SPServices post](http://spservices.codeplex.com/discussions/349356)_


### Input Parameters

-   **dateObj** :   *Date. Optional. Default=Date()* <br />
    The date object to use in generating the Date string.
    
-   **formatType** :   *String. Optional. Default="local"* <br />
    What format to use in creating the date string. Supported values are *local* for local time and *utc* for UTC time.

### Return Value

A string is returned with the date formatted in the appropriate locale.

### Example

    // Return today's date formatted in local time
    // Result example: 2013-05-06T13:08:10
    $.SPWidgets.SPGetDateString();
    
    // Return date formatted in UTC time
    // Result example: 2013-05-06T17:09:19Z
    $.SPWidgets.SPGetDateString(null, "utc");


$().SPGetMsgError
-----------------

A jQuery method (extension of $.fn) that given a SharePoint webservices response object, will look to see if it contains an error and return that error formatted as a string. The XML response object will be checked for errors that might be returned in the following XML elements:

    <ErrorCode />
    <faultcode />

(Since v. 2.0) 

### Input Parameters

None.

### Return Value

A string with the first error found in the XML message.

### Example

    alert( $(xData.responseXML).SPGetMsgError() );



$().SPMsgHasError
-------------------------

A jQuery method (extension of $.fn) that given a SharePoint webservices response object, that given an XML message as returned by the SharePoint WebServices API, will check if it contains an error and return a Boolean indicating that. The XML response object will be checked for errors that might be returned in the following XML elements:

    <ErrorCode />
    <faultcode />

(Since v. 2.0) 

### Input Parameters

None.


### Return Value

A Boolean will be returned indicating whether the XML message has an error (true) or not (false).

### Example
    
    if ( $(xData.responseXML).SPMsgHasError() ) {
        
        alert("error in xml message.");
        
    }


$.SPWidgets.escapeXML
---------------------

Given a XML or HTML string, this utility will escape the special characters that can impact rendering when displayed as html or xml. 
(Since v2.1)

### Input Parameters

-   **xmlString**      :   *String. Required* <br />
    The string to be escaped.
 
### Return Value

-   String. The input parameter is returned with XML characters escaped.

### Example
    
    $.SPWidgets.escapeXML("This is <text>.");
    
    returns:
    
    "This is &lt;text&gt;."


$.SPWidgets.unEscapeXML
-----------------------

Given a string, this utility will un-escape any special characters that were escaped by $.SPWigets.escapeXML. 
(Since v2.1)

### Input Parameters

-   **xmlString**      :   *String. Required* <br />
    The string to be un-escaped.
 
### Return Value

-   String. The input parameter is returned with XML characters un-escaped.

### Example
    
    $.SPWidgets.escapeXML("This is &lt;text&gt;.");
    
    returns:
    
    "This is <text>."

$.SPWidgets.getSPVersion
------------------------

Returns the SharePoint version number (Since v2.2).

### Input Parameters

-   **returnExternal**      :   *Boolean. Optional. Default=false* <br />
    By default, this function returns the SharePoint internal version number (ex. 12 for SP2007, or 14 for SP2010). Setting this value to true will return instead the external version (ex. 2007 or 2010)
 
### Return Value

-   String. The SharePoint version.

### Example
    
    // Under SP 2010, the following returns 14
    $.SPWidgets.getSPVersion();
    
    // Under SP2013, the following returns 2013
    $.SPWidgets.getSPVersion(true);
    

