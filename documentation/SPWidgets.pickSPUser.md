pickSPUser Widget
=================

Given an input field, this method will display an interface that allows the users to select one or more users from SharePoint and stores the selected user information into the input field in the format expected when making an update via webservices.

The input field will be hidden in its current position and a UI will displayed instead. As the user picks or removes users, the input field will be updated at the same time, thus it will always be ready to be submitted as part of an update to the server.


Usage
-----

    $("input[name='users']").pickSPUser();


Input Parameters
----------------

This method takes as input an object containing the options below. These can also be set globally by setting them on _$.SPWidgets.defaults.peoplePicker_.


-   **allowMultiples**      :   *Boolean. Optional. Default=true.* <br />
    Determine whether multiple users can be picked.

-   **maxSearchResults**    :   *Integer. Optional. Default=50.* <br />
    The max number of results to be returned from the server.

-   **resolvePrincipals**     :   *String. Optional. Default=true* <br />
    When set to true (default), any person/group selected in the people picker that is not yet resolved (has -1 for ID and thus not part of Site List Info list) will be resolved first. Note that if setting this to false, could cause issues if attempting to update a people field on a list with a user that is not resolved. (Since v.2.3)

-   **type**     :   *String. Optional. Default='User'* <br />
    The type of search that should be done.  This input parameter is used as the underlying webservice PrincipalType value. Possible values include _User_, _DistributionList_, _SecurityGroup_, _SharePointGroup_, _All_, _None_. Default value is _User_.

    *Example*: Initiate a people picker that selects only Groups

        $("input[name='team']").pickSPUser({ type: 'SharePointGroup' });

-   **minLength**    :   *Integer. Optional. Default=3.* <br />
    The number of characters the user must type before suggestions are retrieved and displayed.

-   **appendTo**    :   *selector. Optional.* Default=null<br />
    The container where the autocomplete suggestions should be appended to. Default is inside of the People Picker widget container. See jQuery UI's Autocomplete for more on this options.


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


-   **filterSuggestions**    :   *Function. Optional. Default=null* <br />
    A callback function to be used to filter the list of suggestions retrieved from the server. Method, if defined, __must__ return an array (either empty or of Objects). (Since 2.4).
    Function is given an `Array` of `Objects` as input. Each object represents the suggestion that will be displayed to the user. Each object will have the following structure:

        {
            accountId:      "999999"
            accountName:    "i:0#.f|membership|john.doe@spwidgets.com"
            accountType:    "User"
            displayName:    "John Doe"
            email:          "John.Doe@spwidgets.com"
            label:          "John Doe"
            value:          "John Doe"
        }

    The callback must return this same structure for each object when processing is complete. The `label` will be the visible value to the user when suggestions are displayed on the autocomplete widget and thus can be manipulated to show custom data.

    Example:

        options.filterSuggestions = function(suggestions){
            var newSuggestions = [];

            $.each(suggestions, function(i, userInfo){
                // If the user's ID is not -1, then add them return it.
                if (userInfo.accountId !== "-1") {
                    // Change the visible label to include email
                    userInfo.label = userInfo.label + " (" + userInfo.email + ")";
                }
            });

            return newSuggestions;
        }

-   **inputPlaceholder**    :   *String. Optional. Default=Type and Pick.* <br />
    The text to appear in the HTML5 placeholder attribute of the input field.  Since v2.1.


-   **meKeyword** : *String. Optional. Default=[me]* <br />
    The keyword used to represent the current user. When the user types this keyword, an additional suggestion is added to the autocomplete titled 'Current User' (value is configurable. See option below). This suggestion, when selected by the user, will use sharepoint's &lt;ThisUser/&gt; keyword instead of an ID;#name format and thus can be used to accomodate a dynamic setting based on the user using the widget.  (Since v.2.3)


-   **meKeywordLabel** : *String. Optional. Default=Current User* <br />
    The label to be shown on the suggestion box or selected list of user when using the [me] keyword.  (Since v.2.3)

-   **showSelected** : *Boolean. Optional. Default=true* <br />
    Controls whether the selected list of people should be shown. Default is true.  When wanting to only show the people picker input, set this value to false. See example below.

    Example:

        $("input[name='findUser']").pickSPUser({
            showSelected: false,
            onPickUser: function(personObj){
                // keep the list of selected user empty
                this.pickSPUser("method", "clear");

                // Now do something with the person the user just selected
                alert(personObj.displayName + " was selected!");
            }
        });


Return Value
------------

This plugin will return a jQuery object that contains the initially selected set of node, thus maintaining chainability.


<hr>

Utilities
---------

### **$().pickSPUser.resolvePrincipals(options)**

A utility to resolve user accounts that may not be part of the site collection list info table. This is normally needed when a user's ID is -1: meaning the user is valid, but not part of the site collection (yet). By calling this method and setting the _addToUserInfoList_ input option to true, that user will be added and receive a valid (positive) ID.  (Since v.2.3)

#### Input parameters

-   **options**</br>
    An object with the input options. See below for list of options

### Options

-   **principalKeys** :   *String|Array. REQUIRED* <br />
    The account name, or email address of the principal to be resolved. Example: DOMAIN\userloginname.

-   **principalType**:   *String. Optional. Default=All* <br />
    The type of principal to be resolved. Valid values are: _User_, _DistributionList_, _SecurityGroup_, _SharePointGroup_, _All_, _None_. Default is All.

-   **addToUserInfoList**:   *Boolean. Optional. Default=true* <br />
    If true, then user will be added to site's List Info list.

-   **aysnc**: *Boolean. Optional. Default=true* <br />
    If true, request to the server will be done async.

### Return

Method returns a jQuery Promise (the one from $.ajax()). The promise (if successful) will provide its callback 3 input parameters: data (the xml response document), textStatus and the jQuery XHR request.

Example:<br/>

    $().pickSPUser.resolvePrincipals({
        principalKey: "DOMAIN\PAUL"
    })
    .done(function(xmlDoc, textstatus, jqXHR){
        var $doc = $(xmlDoc);
        alert($doc.find("DisplayName").eq(0).text());
    });



<hr>

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

    1.   _{String}_ A string with people to add in the format of _id;#name_

    Example:

        $("input[name='user']").pickSPUser("method", "add", '4;#John Smith');


-   **remove(id)**<br />
    (Since v2.1) Removes a person from the selection.  Method accepts 1 input paramater.


    1.  _{String}_ The ID or Display Name of the person that should be removed.

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


<hr>

Events
------

The following Events are triggered by this widget

-   **spwidget:peoplePickerCreate** <br/>
    (Since v2.1) Event is triggered after widget is initiated on an element. Event is given two input parameters:

    1.  jQuery Event Object
    2.  Original Input field as jQuery object

    Example:

        $("input[name='user']")
            .on("spwidget:peoplePickerCreate", function(ev, $input){
                // ev.target = input element
            })
            .pickSPUser()

-   **spwidget:peoplePickerAdd**<br />
    (Since v2.1) Event is triggered anytime the user selects a person/group. Event is given three input parameters:

    1.  jQuery Event Object
    2.  Original Input field as jQuery object
    3.  An object with data about the user that was selected

    Example:

        $("input[name='user']")
            .on("spwidget:peoplePickerAdd", function(ev, $input, personObj){
                // ev.target = input element
            })
            .pickSPUser()

-   **spwidget:peoplePickerRemove**<br />
    (Since v2.1) Event is triggered anytime the user removes a person/group from the selected list. Returning False (Boolean) will canceld the removal and leave the person in the selected list. Event is given three input parameters:

    1.  jQuery Event Object
    2.  Original Input field as jQuery object
    3.  An object with data about the user that was selected

    Example:

        $("input[name='user']")
            .on("spwidget:peoplePickerRemove", function(ev, $input, personObj){
                // ev.target = input element
            })
            .pickSPUser()


<hr>

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


