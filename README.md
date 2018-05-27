SPWidgets
=========

SharePoint Custom UI Widgets that make building custom User Interfaces easier. All widgets are self-contained and use the office-ui-fabric styling.

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

Documentation
-------------

All widgets are built into the `dist/SPWidgets.js` bundle. When using this file directly on a page (as the example above shows), all widgets will be available under `window.SPWidgets.default`. This path is an object containing all of the exported utilities and widgets (see `src/index.js` for a full list)

Full documentation is TBD... Currently, I mainly use this library as a library dependency into some other projects, thus dcumentation (outside of the jsdocs in each widgets) has not be the focus.

To play with the available widgets, see this bin: http://jsbin.com/sesayohecu/edit?html,js,output (HOWEVER: note that several widgets will likely fail, since they require a SharePoint env. to access its APIs)


License
-------

-   MIT http://www.opensource.org/licenses/mit-license.php


Contributions
-------------

tbd...


Developing
----------

tbd...



## Contributors

-   [@TerryMooreII](https://github.com/TerryMooreII)
-   [@donsuhr](https://github.com/donsuhr)


