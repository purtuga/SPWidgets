import Compose from "vendor/jsutils/Compose"
import objectExtend from "vendor/jsutils/objectExtend"
import dataStore from "vendor/jsutils/dataStore"
import getNodesFromXml from "../sputils/getNodesFromXml"


var
instData = dataStore.stash,

/**
 * List model. Contains the List definition data.
 *
 * @constructor ListModel
 * @extends Compose
 *
 * @param {XMLDocument|Object} source
 *  The list source - either an XML document or an Object
 *
 * @param {Object} [options]
 *
 * @param {String} [options.type="xml"]
 *  the type data in `source`. Supported values are `xml` and `json`
 *
 * @param {String} [options.webURL=""]
 *  The Full webURL of the Site for the list (ex. `https://.../sites/web1`).
 *  Option enables some of the value added methods of this model
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
    },

    /**
     * Returns the url to the list. The absolute URL (ex. `https://.../sites/web1`)
     * will be returned _if_ the model was initialized with the `options.webURL`
     * defined on input.. Else, the absolute path from the root of the domain will
     * be returned (ex. `/sites/web1`).
     *
     * @return {String}
     */
    getListUrl: function(){
        var
        opt = instData.get(this),
        rootUrl;

        if (!opt.webURL) {
            return this.RootFolder || "";
        }

        rootUrl = opt.webURL.substr(0, opt.webURL.indexOf(this.WebFullUrl));

        if (!rootUrl){
            return this.RootFolder || "";
        }

        return rootUrl + this.RootFolder;
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

export default  ListModel;
