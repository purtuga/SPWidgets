define([
    "../jsutils/Compose",
    "../jsutils/objectExtend",
    "../jsutils/dataStore",
    "../sputils/getNodesFromXml"
], function(
    Compose,
    objectExtend,
    dataStore,
    getNodesFromXml
){

    var
    instData = dataStore.stash,

    /**
     * List model. Contains the List definition data.
     *
     * @constructor ListModel
     * @extends Compose
     *
     * @param {XMLDocument|Object} source
     *      The list source - either an XML document or an Object
     *
     * @param {Object} [options]
     * @param {String} [type="xml"]
     *      the type data in `source`. Supported values are `xml` and `json`
     *
     */
    ListModel = /** @lends ListModel.prototype */{

        init: function(source, options){

            var
            me  = this,
            opt = objectExtend({}, ListModel.defaults, options),
            listObj;

            opt.type = opt.type.toLowerCase();
            opt.source = source;

            instData.set(me, opt);

            if (opt.type === 'xml') {
                listObj = getListDetailsFromXML.call(me, opt.source);

            } else if (opt.type === "json"){
                listObj = getListDetailsFromJSON.call(me, opt.source);
            }

            objectExtend(me, listObj);

        },

        /**
         * returns the original list source used to build the model.
         */
        getSource: function(){
            return instData.get(this).source;
        }

    },

    /**
     * Returns an object with the list definition from an XML document
     * @private
     * @return {Object}
     */
    getListDetailsFromXML = function(xmlDoc){

        var listDef = getNodesFromXml({
            xDoc:           xmlDoc,
            nodeName:       "List",
            convertTypes:   true
        }).shift();

        delete listDef.Fields;
        delete listDef.RegionalSettings;
        delete listDef.ServerSettings;
        delete listDef.___xmlNode;

        return listDef;

    },

    /**
     * returns an object with the list definition from a JSON response object.
     */
    getListDetailsFromJSON = function(){

        // FIXME: finish method for support of o365

    };

    ListModel           = Compose.extend(ListModel);
    ListModel.defaults  = {
        type: "xml"   // possible values: xml, json
    };

    return ListModel;

});