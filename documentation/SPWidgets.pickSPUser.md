pickSPUser Widget
=================

Given an input field, this method will display an interface that 
allows the users to select one or more users from SharePoint and
stores the selected user information into the intput field in the
format expected when making an update via webservices.

The input field will be hidden in its current position and a UI
will displayed instead. As the user picks or removes users, the
input field will be updated at the same time, thus it will always
be ready to be submitted as part of an update to the server.


Usage:
--------

    $("input[name='users']").pickSPUser();
    

Input Parameters:
-----------------

This method takes as input an object containing the following options


-   allowMultiples:     Boolean. Optional. Default=true
                        Determine whether multiple users can be picked.
-   maxSearchResults:   Integer. Optional. Default=50
                        The max number of results to be returned from the
                        server.
-   onPickUser:         Function. Optional. Default=null
                        Function that is called when user makes a selection.
                        Function will have a context (this keyword) of the
                        input field to which this plugin was bound, and
                        will be given one input param; an object containing
                        information about the selection made by the user.  


Return Value:
-------------

This plugin will return a jQuery object that contains the initially selected
set of node, thus maintaining chainability.
 

Examples:
---------


