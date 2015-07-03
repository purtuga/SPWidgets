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
     * List model. Contains the List definition data. Used by `getList()` api method.
     *
     * @constructor ListModel
     * @extends Compose
     *
     * @param {Object} options
     *      Either `fromXML` or `fromJSON` is required on input
     *
     * @param {XMLDocument} [fromXML]
     *      The list XML document as returned by the SOAP services.
     *
     * @param {Object} [fromJSON]
     *      The list JSON string returned by the REST API.
     *
     */
    ListModel = /** @lends ListModel.prototype */{

        init: function(options){

            var
            me  = this,
            opt = objectExtend({}, ListModel.defaults, options),
            listObj;

            instData.set(me, opt);

            if (opt.fromXML) {
                opt.sourceType  = "xml";
                opt.source      = opt.fromXML;
                listObj         = getListDetailsFromXML.call(me, opt.source);

            } else if (opt.fromJSON){
                opt.sourceType  = "json";
                opt.source      = opt.fromJSON;
                listObj         = getListDetailsFromJSON.call(me, opt.source);
            }

            objectExtend(me, listObj);

        },

        /**
         * returns the original list source used to build the model.
         */
        getRawSource: function(){
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
        fromXML:    null,   // soap
        fromJSON:   null    // REST
    };

    return ListModel;

});