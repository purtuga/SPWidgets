import Compose          from "common-micro-libs/src/jsutils/Compose"
import objectExtend     from "common-micro-libs/src/jsutils/objectExtend"
import dataStore        from "common-micro-libs/src/jsutils/dataStore"
import getNodesFromXml  from "../sputils/getNodesFromXml"


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
 * @example List definition attributes:
 *
 *  {
 *      "DocTemplateUrl":                   "",
 *      "DefaultViewUrl":                   "/sites/siteA/Lists/Tasks/AllItems.aspx",
 *      "MobileDefaultViewUrl":             "",
 *      "ID":                               "{7EE477D9-D257-47F5-A25D-A882D882E51F}",
 *      "Title":                            "Tasks",
 *      "Description":                      "",
 *      "ImageUrl":                         "/_layouts/15/images/ittask.png?rev=30",
 *      "Name":                             "{7EE477D9-D257-47F5-A25D-A882D882E51F}",
 *      "BaseType":                         "0",
 *      "FeatureId":                        "f9ce21f8-f437-4f7e-8bc6-946378c850f0",
 *      "ServerTemplate":                   "171",
 *      "Created":                          "20131115 21:43:34",
 *      "Modified":                         "20161212 20:06:34",
 *      "LastDeleted":                      "20161209 17:55:58",
 *      "Version":                          "39",
 *      "Direction":                        "none",
 *      "ThumbnailSize":                    "",
 *      "WebImageWidth":                    "",
 *      "WebImageHeight":                   "",
 *      "Flags":                            "549458048",
 *      "ItemCount":                        "65",
 *      "AnonymousPermMask":                "0",
 *      "RootFolder":                       "/sites/siteA/Lists/Tasks",
 *      "ReadSecurity":                     "1",
 *      "WriteSecurity":                    "1",
 *      "Author":                           "11",
 *      "EventSinkAssembly":                "",
 *      "EventSinkClass":                   "",
 *      "EventSinkData":                    "",
 *      "EmailAlias":                       "",
 *      "WebFullUrl":                       "/sites/siteA",
 *      "WebId":                            "b0cb691f-3a1c-4199-a7f4-86a1bb147cc9",
 *      "SendToLocation":                   "",
 *      "ScopeId":                          "1d5001e0-2e0c-483b-8579-f14931151477",
 *      "MajorVersionLimit":                "50",
 *      "MajorWithMinorVersionsLimit":      "0",
 *      "WorkFlowId":                       "",
 *      "HasUniqueScopes":                  false,
 *      "NoThrottleListOperations":         false,
 *      "HasRelatedLists":                  "",
 *      "Followable":                       false,
 *      "Acl":                              "",
 *      "Flags2":                           "0",
 *      "RootFolderId":                     "070d6524-2096-4c1b-9a6f-fbd2dc036c76",
 *      "ComplianceTag":                    "",
 *      "ComplianceFlags":                  "0",
 *      "UserModified":                     "20161212 20:06:34",
 *      "ListSchemaVersion":                "107",
 *      "AllowDeletion":                    true,
 *      "AllowMultiResponses":              false,
 *      "EnableAttachments":                true,
 *      "EnableModeration":                 false,
 *      "EnableVersioning":                 true,
 *      "HasExternalDataSource":            false,
 *      "Hidden":                           false,
 *      "MultipleDataList":                 false,
 *      "Ordered":                          false,
 *      "ShowUser":                         true,
 *      "EnablePeopleSelector":             false,
 *      "EnableResourceSelector":           false,
 *      "EnableMinorVersion":               false,
 *      "RequireCheckout":                  false,
 *      "ThrottleListOperations":           false,
 *      "ExcludeFromOfflineClient":         false,
 *      "CanOpenFileAsync":                 true,
 *      "EnableFolderCreation":             false,
 *      "IrmEnabled":                       false,
 *      "IrmSyncable":                      false,
 *      "IsApplicationList":                false,
 *      "PreserveEmptyValues":              false,
 *      "StrictTypeCoercion":               false,
 *      "EnforceDataValidation":            false,
 *      "MaxItemsPerThrottledOperation":    "5000"
 *  }
 *
 */
ListModel = /** @lends ListModel.prototype */{

    init: function(source, options){
        if (instData.has(this)) {
            return;
        }

        var
        me  = this,
        opt = objectExtend({}, this.getFactory().defaults, options),
        listObj;

        opt.type = opt.type.toLowerCase();
        opt.source = source;

        instData.set(me, opt);

        if (opt.type === "xml") {
            listObj = getListDetailsFromXML.call(me, opt.source);

        } else if (opt.type === "json"){
            listObj = getListDetailsFromJSON.call(me, opt.source);
        }

        objectExtend(me, listObj);
        this.onDestroy(() => instData["delete"](this));
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
    },

    /**
     * Will return the site's URL where the list is located.
     * __note:__ depends on the model having been initialized with
     * the value in the options.
     */
    getWebURL: function(){
        return instData.get(this).webURL;
    }
},

/**
 * Returns an object with the list definition from an XML document
 * @private
 * @return {Object}
 */
getListDetailsFromXML = function(xmlDoc){
    let listDef = getNodesFromXml({
        xDoc:           xmlDoc,
        nodeName:       "List",
        convertTypes:   true
    }).shift();

    if (!listDef) {
        // Try to get the List properties from "ListProperties" - which is
        // returned when an update to the list is done (updateList())
        listDef = getNodesFromXml({
            xDoc:           xmlDoc,
            nodeName:       "ListProperties",
            convertTypes:   true
        }).shift();

        if (!listDef) {
            return {};
        }
    }

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
    type:   "xml",   // possible values: xml, json
    webURL: ""
};

export default  ListModel;
