import objectExtend from "vendor/jsutils/objectExtend";

    /**
     * Returns the requested nodes from the given xml document
     *
     * @param {Object} options
     *
     * @param {XMLDocument} options.xDoc
     *
     * @param {String} options.nodeName
     *
     * @param {Boolean} [options.asJQuery=false]
     *      If true, then xmlNodes will be returned as a jQuery
     *      selection object, ready to be traversed and/or filtered.
     *
     * @param {Boolean} [options.cleanAttr=true]
     *      if true, the 'ows_' will be stripped from column names.
     *      Only used when asJQuery=false.
     *
     * @param {Object} [options.nodeModel=null]
     *      A factory constructor that will be used to build each node.
     *      Factory must have a `create` member that will be called with
     *      the object. The model constructor method should have a signature
     *      of the following: `function(modelData, options)`
     *
     * @param {Object} [options.nodeModelOptions]
     *      Any data to be passed to the `nodeModel` constructor as the second
     *      argument. NOTE that this method will add an attribute to the options
     *      called 'source' that will contain the XML node used to create the object
     *
     * @param {Boolean} [options.convertTypes=false]
     *      When true, this method will attempt to convert certain known
     *      String values to javascript natives (ex. `"TRUE"` would become `true`)
     *
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

        var opt     = objectExtend({}, {
                        xDoc:               null,
                        nodeName:           '',
                        cleanAttr:          true,
                        nodeModel:          null,
                        nodeModelOptions:   null,
                        convertTypes:       false
                    }, options),
            nodes   = opt.xDoc.getElementsByTagName(opt.nodeName),
            getNodeAsObj, nodeList, i, j;

        if (nodes.length === 0 && opt.nodeName === "z:row") {
            nodes = opt.xDoc.getElementsByTagName('row');
        }

        if (nodes.length === 0 && opt.nodeName === "rs:data") {
            nodes = opt.xDoc.getElementsByTagName('data');
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
                }

                if (opt.convertTypes) {
                    row[name] = getJsNativeFromString(attrs[x].value);

                } else {
                    row[name] = attrs[x].value;
                }

            }

            // Also store the original xml node
            // FIXME: remove ___xmlNode from object
            // row.___xmlNode = ele;
            Object.defineProperty(row, '___xmlNode', {
                value:          ele,
                configurable:   true
            });

            if (opt.nodeModel && opt.nodeModel.create) {
                return opt.nodeModel.create(row, objectExtend({}, opt.nodeModelOptions, {source: ele}));

            } else {
                return row;
            }

        };

        for (i=0,j=nodes.length; i<j; i++){
            nodeList.push(getNodeAsObj(nodes[i]));
        }

        return nodeList;

    }, //end: API.getNodesFromXml

    /**
     * Returns a JS native type (if possible) from the given string.
     * @private
     * @param {String} str
     *
     * @return {String|Object}
     */
    getJsNativeFromString = function(str){

        if (!str) {
            return str;
        }
        var response = str;
        switch (str.toUpperCase()) {
            case "TRUE":
                response = true;
                break;

            case "FALSE":
                response = false;
                break;
        }
        return response;
    };

    getNodesFromXml.getJsNativeFromString = getJsNativeFromString;

    export default getNodesFromXml;


