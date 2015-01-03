define([
    'jquery'
], function(
    $
){

    /**
     * demo.dev.js
     * Contains code that is loaded with the Dev.SPWidgets.html file
     * which assists with development, testing and debuging.
     *
     * This module assumes that window.SPWIDGET_DEMO and most important
     * window.SPWIDGET_DEMO.BIN_DIR has already been set. This
     * will be used to load each file individually into the page.
     *
     */

    var Main = SPWIDGET_DEMO.Dev = {};

    Main._version = '@BUILD';

    /**
     * Loads a script using DOm elemnets instead of jQuery's
     * .load(). This helps ensure that the script is visible
     * through the debuggers (like firebug)
     *
     * @param {String} jsUrl
     * @param {Function} callback
     *
     * @return {Undefined|jQuery.Deferred}
     *      If jQuery is loaded, then a deferred is returned.
     */
    Main.loadScript = function(jsUrl, callback, ensureNoCache){

        var head    = document.head
                        || document.getElementsByTagName("head")[0]
                        || document.documentElement,
            s       = document.createElement("script"),
            now     = (new Date()).getTime(),
            def     = null,
            ret     = undefined;

        if (ensureNoCache === true) {

            if (jsUrl.indexOf("?") < 0) {

                jsUrl += '?';

            }

            jsUrl += "&_" + now;

        }

        try {

            if (typeof jQuery !== "undefined") {

                def = $.Deferred();
                ret = def.promise();

            }

        } catch(e){}


        // insert the Script into the page.
        s.type  = "text/javascript";
        s.src   = jsUrl;

        // Taken from jQuery and slightly modifided
        s.onload = s.onreadystatechange = function( _, isAbort ) {

            if ( isAbort || !s.readyState || /loaded|complete/.test( s.readyState ) ) {

                // Handle memory leak in IE
                s.onload = s.onreadystatechange = null;

                // Dereference the script
                s = undefined;

                if (callback instanceof Function) {

                    setTimeout(function(){

                        callback();

                        if (def) {

                            def.resolve();

                        }

                    }, 5);

                } else {

                    if (def) {

                        def.resolve();

                    }

                }

            }

        };

        head.insertBefore(s, head.firstChild);

        return ret;

    }; //end: Main.loadScript()

    /**
     * Loads all the modules in the correct order.
     */
    Main.init = function() {

        // jQuery UI style (from google)
        $('<link rel="stylesheet" type="text/css" href="' +
            window.location.protocol +
            '//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/redmond/jquery-ui.css" />').appendTo("head");


        // 4. vkBeautiry.js (xml beatifier)
        Main.loadScript(
            SPWIDGET_DEMO.BIN_DIR +
            "demo/src/ext/vkBeautify.js?rev=" + Main._version);

        // Load the UI from the regular Demo page into the container here
        $("#spwidgets_demo_cntr").load(
            String(SPWIDGET_DEMO.BIN_DIR).replace(/ /g, "%20") +
            "demo/src/Demo.SPWidgets.aspx .spwidgets-demo-cntr",
            function(){

                // 13. demo.common.js
                Main.loadScript(
                    SPWIDGET_DEMO.BIN_DIR +
                    "demo/src/demo.common.js?rev=" + Main._version
                )
                .then(function(){

                    // 14. widget.upload.demo.js
                    Main.loadScript(
                        SPWIDGET_DEMO.BIN_DIR +
                        "demo/src/widget.upload.demo.js?rev=" + Main._version);

                    // 15. widget.peoplepicker.demo.js
                    Main.loadScript(
                        SPWIDGET_DEMO.BIN_DIR +
                        "demo/src/widget.peoplepicker.demo.js?rev=" + Main._version);

                    // 16. widget.board.demo.js
                    Main.loadScript(
                        SPWIDGET_DEMO.BIN_DIR +
                        "demo/src/widget.board.demo.js?rev=" + Main._version);

                    // 17. widget.lookup.demo.js
                    Main.loadScript(
                        SPWIDGET_DEMO.BIN_DIR +
                        "demo/src/widget.lookup.demo.js?rev=" + Main._version);

                    // 18. widget.filter.demo.js
                    Main.loadScript(
                        SPWIDGET_DEMO.BIN_DIR +
                        "demo/src/widget.filter.demo.js?rev=" + Main._version);

                    // 19. widget.filter.demo.js
                    Main.loadScript(
                        SPWIDGET_DEMO.BIN_DIR +
                        "demo/src/widget.date.demo.js?rev=" + Main._version);

                }); //end: load() UI

            } // getScript.callback
        );//end: .load()

    }; // Main.init()

    return Main;

});
