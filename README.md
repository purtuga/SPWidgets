SPWidgets
=========

SharePoint Custom UI Widgets that make building custom User Interfaces easier. All widgets are self-contained and use the office-ui-fabric styling.

## CURRENT STATUS

**THIS VERSION (3.0.0) REMAINS IN **BETA** AS THE DOCUMENTATION HAS NOT BEEN CREATED AND THERE ARE NO TEST CASES. WIDGETS, HOWEVER, HAVE PROVEN (UNDER MY OWN PROJECTS) TO BE STABLE ENOUGH FOR USAGE.** 

Version 3.0 was a large effort that removed jQuery and jQuery UI from the code base and instead adopted native JavaScript APIs and the new Office UI Fabric for styling. It also replaced the use of Grunt with npm script and Webpack. My goal with this project has always been to have a set of SharePoint widgets I can use in any context and independent of any framework. To that extent, v3.0 has proven to do that as I have used them directly within SharePoint as a "drop in" library as well as in a project that uses VueJS. 

At this point, I'm still not unsure if I will dedicate any more time to the activities I believe are needed remove the `beta` indicator from v3.0. I'm leaning towards moving these widgets to Custom Elements and fully embrace the web platform in providing framework/library agnostic widgets.
 

## example: 

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>SP Widgets</title>
  <link rel="stylesheet" href="//spoprod-a.akamaihd.net/files/fabric/office-ui-fabric-core/5.0.1/css/fabric.min.css">
  <link rel="stylesheet" href="//appsforoffice.microsoft.com/fabric/fabric-js/1.0.0/fabric.components.css">
</head>
<body>

  <script src="https://cdn.rawgit.com/purtuga/SPWidgets/no-jquery/dist/SPWidgets.js"></script>
  <script>
    var message = SPWidgets.default.Message.create({ message: "hello"})
    message.appendTo(document.body);
</script>
</body>
</html>
```

To play with the available widgets, see this bin: 

http://jsbin.com/sesayohecu/edit?html,js,output 

__HOWEVER:__ note that several widgets will likely fail, since they require a SharePoint env. to access its APIs)


Documentation
-------------

All widgets are built into the `dist/SPWidgets.js` bundle. When using this file directly on a page (as the example above shows), all widgets will be available under `window.SPWidgets.default`. This path is an object containing all of the exported utilities and widgets (see `src/index.js` for a full list)

Full documentation is TBD... 

Currently, I mainly use this library as a dependency into some other projects, thus documentation (outside of the jsdocs in each widgets) has not been a focus.
 

License
-------

-   MIT http://www.opensource.org/licenses/mit-license.php


Contributions
-------------

Contributions are welcomed. 



Developing
----------

The `npm server:sp` task assists with running an environment that allows for connection to a real sharepoint instance to use its APIs. Note that this is achieve by staring a separate instance of Chrome with security turned off. 

>   __IMPORTANT__: Do not use this version of chrome for regular internet browsing.

Before staring development, create a file under `dev/` folder named `my.sp.dev.js`. In this file, add the following:

```javascript
window._spPageContextInfo = {
    webServerRelativeUrl:   "/sites/your-site-name",
    webAbsoluteUrl:         "https://my-sharepoint-site-here.sharepoint.com/sites/your-site-name"
};
```

Change the above to include your SharePoint tenant information. Now run: 

```bash
npm run serve:sp
```

All content is now being served from the `dev/` folder. Ensure that you access your sharepoint URL defined above from the same browser instance that is displaying the development content.


## Contributors

-   [@TerryMooreII](https://github.com/TerryMooreII)
-   [@donsuhr](https://github.com/donsuhr)


