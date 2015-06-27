define(["jquery"], function($){

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
     * @param {Object} [options.nodeModel=null]
     *      A factory constructor that will be used to build each node.
     *      Factory must have a `create` member that will be called with
     *      the object.
     *
     * @return {Array|jQuery}
     *      Each object that represents an XML node will contain properties
     *      for each attribute found on that node. Also, the Object will
     *      contain a special attribute - ___xmlNode - that is the actual
     *      xml node.
     *
     * @example
     *
     *  API.getNodesFromXml({
     *      xDoc: jgXHR.responseXML,
     *      nodeName: "z:row"
     *  });
     *
     * // returns something similar to the following:
     *  {
     *      ID: "123",
     *      Title: "item title",
     *      ___xmlNode: XMLElement
     *  }
     *
     *
     */
    var getNodesFromXml = function(options) {

        var opt     = $.extend({}, {
                        xDoc:       null,
                        nodeName:   '',
                        asJQuery:   false,
                        cleanAttr:  true,
                        nodeModel:  null
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

            // Also store the original xml node
            // FIXME: remove ___xmlNode from object
            row.___xmlNode = ele;

            if (opt.nodeModel && opt.nodeModel.create) {
                return opt.nodeModel.create(row);

            } else {
                return row;
            }

        };

        for (i=0,j=nodes.length; i<j; i++){

            nodeList.push(getNodeAsObj(nodes[i]));

        }

        return nodeList;

    }; //end: API.getNodesFromXml

    return getNodesFromXml;

});
