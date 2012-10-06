About
-----

SPWidgets is a jQuery plugin that provides SharePoint Widgets that can be used for creating customized User Interfaces (UI) on the SharePoint platform using Client Side scripting (javascript).

For the latest information on this plugin, see the [project page on GIT](http://purtuga.github.com/SPWidgets/).


Dependencies
------------

SPWidgets has the following dependencies:

1.  [jQuery](http://jquery.com)
2.  [jQuery UI](http://jqueryui.com)
3.  [SPServices](http://spservices.codeplex.com)


Usage
-----

The following is an example that loads the required libraries from CDN's, the SPWidgets from the local site and then initiates the People Picker plugin on an input field inside a jQuery UI dialog.


    <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/themes/redmond/jquery-ui.css" />
    <script type="text/javascript" src='https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js'></script>
    <script type="text/javascript" src='https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js'></script>
    <script type="text/javascript" src='http://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/0.7.1a/jquery.SPServices-0.7.1a.min.js'></script>
    <script type="text/javascript" src='yoursite/path/to/SPWidgets.js'></script>
    <script type="text/javascript">
        $(document).ready(function(){
            $("<div> <input name="users" value="" /> </div>")
                .appendTo("body")
                .find("input")
                    .pickSPUser()
                    .end()
                .dialog();
        });
    </script>


License
-------

Dual License support

-   [MIT](http://www.opensource.org/licenses/mit-license.php)
-   [GPL](http://www.opensource.org/licenses/gpl-license.php)

User can pick whichever one applies best for their project
and does'nt not have to contact me.


Author
------

<span id="ptAuthorInfo">
[Paul Tavares](http://paultavares.wordpress.com) @purtuga

Follow me at Twitter [@paul_tavares](https://twitter.com/paul_tavares) 
</span>

Version
-------

-   Version: _BUILD_VERSION_NUMBER_
-   Build Date: _BUILD_VERSION_DATE_

