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
                                The max number of results to be returned from the
                                server.
                                
-   **onPickUser**          :   *Function. Optional. Default=null.* <br />
                                Function that is called when user makes a selection.
                                Function will have a context (*this* keyword) of the
                                input field to which this plugin was bound, and
                                will be given one input param; an object containing
                                information about the selection made by the user. This
                                object will contain data returned by the SharePoint's
                                webservice.


Return Value
------------

This plugin will return a jQuery object that contains the initially selected set of node, thus maintaining chainability.
 

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

    
