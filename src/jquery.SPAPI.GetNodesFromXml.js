/**
 * By default, this API method will add its self to jQuery under the following
 * namespace: $.SPAPI. This can be altered by defining an object named 'SPAPI'
 * just prior to loading/executing this code.
 *
 * @Example
 *
 *  // Load this API method into a custom namespace
 *  <script type="text/javascript">
 *      var SPAPI = {};
 *  </script>
 *  <script type"text/javascript" src="path/to/this/file.js"/>
 *
 */
(function($, namespace){

    var API = namespace || {};

    if (!namespace) {

        if (typeof $.SPAPI === "undefined") {

            $.SPAPI = API;

        } else {

            API = $.SPAPI;

        }

    }

    /**
     * Returns the requested nodes from the given xml document
     *
     * @param {Object} options
     * @param {XMLDocument} options.xDoc
     * @param {String} options.nodeName
     * @param {Boolean} [options.asJQuery=false]
     *      If true, then xmlNodes will be returned as a jQuery
     *      selection object, ready to be traversed and/or filtered.
     * @param {Boolean} [options.cleanAttr=true]
     *      if true, the 'ows_' will be stripped from column names.
     *      Only used when asJQuery=false.
     *
     * @return {Array|jQuery}
     *
     * @example
     *
     *  API.getNodesFromXml({
     *      xDoc: jgXHR.responseXML,
     *      nodeName: "z:row"
     *  });
     *
     */
    API.getNodesFromXml = function(options) {

        var opt     = $.extend({}, {
                        xDoc:       null,
                        nodeName:   '',
                        asJQuery:   false,
                        cleanAttr:  true
                    }, options),
            nodes   = opt.xDoc.getElementsByTagName(opt.nodeName),
            getNodeAsObj, nodeList, i, j;

        if (nodes.length === 0 && opt.nodeName === "z:row") {

            nodes = opt.xDoc.getElementsByTagName('row');

        }

        if (nodes.length === 0 && opt.nodeName === "rs:data") {

            nodes = opt.xDoc.getElementsByTagName('data');

        }

        if (opt.asJQuery === true) {

            return $(nodes);

        }

        nodeList = [];

        getNodeAsObj = function(ele) {

            var attrs   = ele.attributes,
                row     = {},
                name,x,y;

            for(x=0,y=attrs.length; x<y; x++){

                name = attrs[x].name;

                if (opt.cleanAttr) {

                    if (name.indexOf("ows_") > -1) {

                        name = name.replace("ows_", "");

                    }

                    // Code below commented off because replacing the space does not really
                    // indicate that it is external name.
                    // if (name.indexOf("_x0020_") > -1) {
//
                        // name = name.replace(/_x0020_/g, " ");
//
                    // }

                }

                row[name] = attrs[x].value;

            }

            return row;

        };

        for (i=0,j=nodes.length; i<j; i++){

            nodeList.push( getNodeAsObj(nodes[i]) );

        }

        return nodeList;

    }; //end: API.getNodesFromXml

})(jQuery, (typeof SPAPI !== "undefined" ? SPAPI : undefined));

