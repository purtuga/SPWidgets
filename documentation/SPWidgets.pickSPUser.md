pickSPUser Widget
=================

Given an input field, this method will display an interface that allows the users to select one or more users from SharePoint and stores the selected user information into the input field in the format expected when making an update via webservices.

The input field will be hidden in its current position and a UI will displayed instead. As the user picks or removes users, the input field will be updated at the same time, thus it will always be ready to be submitted as part of an update to the server.


Usage
-----

    $("input[name='users']").pickSPUser();
    

Input Parameters
----------------

This method takes as input an object containing the following options


-   **allowMultiples**      :   *Boolean. Optional. Default=true.* <br />
    Determine whether multiple users can be picked.

-   **maxSearchResults**    :   *Integer. Optional. Default=50.* <br />
    The max number of results to be returned from the server.

-   **webURL**     :   *String. Optional. Default=current site* <br />
    The WebURL for the list. (Since v2.1) 

-   **onPickUser**          :   *Function. Optional. Default=null.* <br />
    Function that is called when user makes a selection. Function will have a context (*this* keyword) of the input field to which this plugin was bound, and will be given one input param; an object containing information about the selection made by the user. This object will contain data returned by the SharePoint's webservice.
    
    Example:
        
        onPickUser: function(personObj) {
            // this = input element
            
            alert(personObj.displayName + " was selected!");
            
        }
    
                                
-   **onCreate**            :   *Function. Optional. Default=null.* <br />
    Function that is called after the widget has been initiated on an input element. Function will have a context (this keyword) of the input field to which this plugin is called on, which will also be provided as the first argument to the function. (Since v2.1)
    
    Example:
        
        onCreate: function($input){
            // this = input element
        }

-   **onRemoveUser**    :   *Function. Optional. Default=null.* <br />
    (Since v2.1) Function that is called when user makes removes a person from the selected list. Function will have a context (*this* keyword) of the input field to which this plugin was bound, and will be given the following two input parameters:
    
    -  Original Input field as jQuery object
    -  The UI of the person (as jQuery object)
    -  An object with data about the user that was selected 
    
    Returning a (boolean) false will cancel the removal of the person from the selected list.
    
    Example:
        
        onRemoveUser: function($input, $ui, personObj) {
            // this = input element
            // return false; // will cancel removal
        }
    
    
-   **inputPlaceholder**    :   *String. Optional. Default=Type and Pick.* <br />
    The text to appear in the HTML5 placeholder attribute of the input field.  Since v2.1.


Return Value
------------

This plugin will return a jQuery object that contains the initially selected set of node, thus maintaining chainability.


Methods
-------

All methods are called using the original input element where the People Picker widget was bound with the word 'method' as the first parameter:

    $("input[name='user']").pickSPUser("method", "method name here");

The following methods are supported:

-   **clear()**<br />
    Clears out all selected people
    
    Example:
        
        $("input[name='user']").pickSPUser("method", "clear");

-   **destroy()**<br />
    (Since v2.0) Removes the widget from the bound input element.
    
    Example:
        
        $("input[name='user']").pickSPUser("method", "destroy");
    
-   **add('id;#name')**<br />
    (Since v2.1) Adds a person to the seletion list. Method accepts one input:
    
    -   _{String}_ A string with people to add in the format of _id;#name_
    
    Example:
    
        $("input[name='user']").pickSPUser("method", "add", '4;#John Smith');
        

-   **remove('id')**<br />
    (Since v2.1) Removes a person from the selection.  Method accepts 1 input paramater:
    
    -   _{String}_ The ID or Display Name of the person that should be removed.
    
    Example:
        
        // Remove person with ID of 4
        $("input[name='user']").pickSPUser("method", "remove", 4);
        
        // remove John Smith
        $("input[name='user']").pickSPUser("method", "remove", "John Smith");
        
-   **getSelected()**<br />
    (Since v2.1) Returns an Array of objects representing the currently set of selected people.  The array object element will have the following structure:
        
        [
            {
                id: 'id of person',
                title: 'display name of person'
            }
        ]
        
    Example:
        
        var selected = $("input[name='user']").pickSPUser("method", "getSelected");
        
        alert("There are " + selected.length + " people selected!");
        

Events
------

The following Events are triggered by this widget:

-   **spwidget:peoplePickerCreate**<br />
    (Since v2.1) Event is triggered after widget is initiated on an element. Event is given two input parameters:
    
    -  jQuery Event Object
    -  Original Input field as jQuery object 

    Example:
        
        $("input[name='user']")
            .on("spwidget:peoplePickerCreate", function(ev, $input){
                // ev.target = input element
            })
            .pickSPUser()

-   **spwidget:peoplePickerAdd**<br />
    (Since v2.1) Event is triggered anytime the user selects a person/group. Event is given three input parameters:
    
    -  jQuery Event Object
    -  Original Input field as jQuery object
    -  An object with data about the user that was selected 

    Example:
        
        $("input[name='user']")
            .on("spwidget:peoplePickerAdd", function(ev, $input, personObj){
                // ev.target = input element
            })
            .pickSPUser()

-   **spwidget:peoplePickerRemove**<br />
    (Since v2.1) Event is triggered anytime the user removes a person/group from the selected list. Returning False (Boolean) will canceld the removal and leave the person in the selected list. Event is given three input parameters:
    
    -  jQuery Event Object
    -  Original Input field as jQuery object
    -  An object with data about the user that was selected 

    Example:
        
        $("input[name='user']")
            .on("spwidget:peoplePickerRemove", function(ev, $input, personObj){
                // ev.target = input element
            })
            .pickSPUser()



Examples
--------

Bind people picker and allow only 1 person to be selected/stored.

    $("input[name='users']").pickSPUser({
        allowMultiples: false
    });


When user makes a selection, show alert with person's info.

    $("input[name='users']").pickSPUser({
        onPickUser: function(person){
            alert("User selected: \n displayName: " + 
                person.displayName + "\n accountId: " +
                person.accountId + "\n accountName: " +
                person.accountName + "\n accountType:" +
                person.accountType);
        }
    });

    
