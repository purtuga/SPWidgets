SPWidgets Demo
==============

The SPWidgets Demo page is a self-contained Single Page Application (SPA) that showcases the widgets available.

![SPWidgets Demos](../documentation/web/spwidgets.demos.jpg)


Installation
------------

The demo page is provided as a SharePoint page (_aspx_) and should work by simply uploading (or copying) it to a Document Library. The file assumes that a Master page named _~masterurl/default.master_ is available on the Site that it will be uploaded to.


### Steps

1.  Upload the [Demo.SPWidgets.aspx][demoFile] file to a SharePoint Document Library 

2.  After uploading it to a document library, browse to that folder and click on the file 'Demo.SPWidgets'. The page should display the demos (see screen capture above).


### Possible Issues

-   When access the file, an error is displayed instead
    This may be caused by the fact that the site does not have a Master page called default.master. To correct this issue, edit the _Demo.SPWigets.aspx_ page and change the following (located at the top of the file) to a valid master page:
    
        MasterPageFile="~masterurl/default.master"
    
    One of the ways to find out the active master page on the site is to create a WebPart Page and then analyze it's markup for the correct value. 


Reference
---------

-   [SPWidgets Project](http://purtuga.github.io/SPWidgets/)
-   [Online version of this file](https://github.com/purtuga/SPWidgets/tree/master/demo/demo.about.md)



[demoFile]: https://raw.github.com/purtuga/SPWidgets/master/demo/Demo.SPWidgets.aspx "Demo.SPWidgets.aspx"

