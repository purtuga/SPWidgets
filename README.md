SPWidgets
=========

SharePoint Custom UI Widgets that make building custom User Interfaces easier.

Documentation
-------------

**See the [project page](http://purtuga.github.com/SPWidgets/) folder for full
detail on the usage of each available plugins.**


>   **NOTE: SPWidgets is undergoing a major change in the MASTER branch. Please**
>   **use one of the existing tagged releases instead of the code from MASTER.**


Downloads
---------

The compiled plugin can be found under the [_dist/_](https://github.com/purtuga/SPWidgets/tree/master/dist) folder.


License
-------

Dual License support

-   MIT http://www.opensource.org/licenses/mit-license.php
-   GPL http://www.opensource.org/licenses/gpl-license.php

User can pick whichever one applies best for their project and doesn’t have to contact me.


Contributions
-------------

Contributions are welcome. Just fork the project, make your changes (see below for notes on development environment) and send me a Pull Request.  Note that before committing your changes, a `grunt build-prod` must be run so that all files are compiled.


Developing
----------

## Pre-requisites

1.  `node` and `npm`
2.  `grunt`
3.  `bower`

## Getting Started

Once the code has been forked and checked out, insure that following is run from inside the project root folder:

-   `npm install`
-   `bower install`

This will install both the build dependencies as well as the runtime dependencies.

The source is broken up into modules using the AMD pattern. Any new modules created should follow the same pattern. A few guidelines:

1.  New widgets should be created in a new folder under `src/`. Widgets should have a calling signature that accepts at least two input parameters: a dom element to act on and an object of options. Example:

        define(['jquery'], function($){
            return function myWidget(domElements, options){
                // build widget on to domElements
            };
        });

2.  Any new module that should be exposed via `$.SPWidgets` should be added to `src/SPWidgets.js`.

3.  New widgets need to have a Markdown documentation file under `documentation/`. The file should be named as `SPWidgets._new_widget_name.md`.

3.  All API modules should return a jQuery Promise.


## Build

SPWidgets is built using `grunt`. To find out what targets are available, run the following command:

    grunt --help

The first time `grunt` is run, a file called `me.build.json` will be created at the root of the project. This file contains build parameters that can be customized to the local env. (ex. set `buildLocation` to your computer's temp folder).

To build the project, which will update the `dist` folder with the current changes, run the following:

    grunt build-prod


## Deployment and Testing in a Real SharePoint Site

This project has a `deploy` build target (`grunt deploy`) that copies the built library along with a development version of the Demo to a SharePoint Document Library folder.  The location is set in a file called `me.build.json`, which is created at the root of the project the first time `grunt` is run, and should be the absolute path to the document library (ex. Office 365: `//myTestTenant.sharepoint.com@SSL/DavWWWRoot/sites/DevTest/Shared Documents/SPWidgets/`. Or if a drive was mapped, it could be set as `z:/Shared Documents/SPWidgets/`).

Once deployed, browse to the deployment location on the SharePoint site and click on `demo/src/Dev.SPWidgets.aspx`. This version of the Demo loads all modules using requireJS, which facilitates development and testing.


## Unit Tests

Unit test cases are written under the `test` folder using Jasnime.  Test should be able to run without a real SharePoint Server by taking advantage of fakeServer. To run the test case locally run the following:

    npm run server

This will run an http server on port 8080 and try to open the test `index.html` file in the browser.


## Contributors

-   [@TerryMooreII](https://github.com/TerryMooreII)
-   [@donsuhr](https://github.com/donsuhr)


