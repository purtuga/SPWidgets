SPWidgets
=========

Sharepoint Custom UI Widgets that make building custom User Interfaces easier.

Documentation
-------------

See the markdown files under the [Documentation](https://github.com/purtuga/SPWidgets/tree/master/documentation/)
folder for full detail on the usage of each available plugins.


Downloads
---------

Go to the **[DOWNLOADS](https://github.com/purtuga/SPWidgets/downloads)** page to get 
access the pre-built package (Look at the area labeled 'Download Packages')

Files in source would need to be built using Apache Ant, Google Closure compiler 
and Markdown perl script.


License
-------

Dual License support

-   MIT http://www.opensource.org/licenses/mit-license.php
-   GPL http://www.opensource.org/licenses/gpl-license.php

User can pick whichever one applies best for their project
and does'nt not have to contact me.


Developer Notes
---------------

This project has been developed in Eclipse using the Aptana plugin.
The project is built using Apached Ant.  In addition to have Ant installed,
Google Closure compiler (for minification) and Markdown.pl is needed. Perl
is required in order to turn Markdown.pl.

The tools should be downloaded and placed under:

- BUILD/Tools/google-closure-compiler/
- BUILD/Tools/markdown/

The project also allows you to "deploy" to a live sharepoint site by doing
a file copy from the development BUILD folder to a sharepoint folder. In order
to do, the target location (the sharepoint location) must be setup in the me.build.properties
file. this file is automatically created the first time the build file is ran.

