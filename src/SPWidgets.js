import getMsgError              from './sputils/getMsgError'
import doesMsgHaveError         from './sputils/doesMsgHaveError'
import xmlEscape                from './sputils/xmlEscape'
import fillTemplate             from './sputils/fillTemplate'
import getCamlLogical           from './sputils/getCamlLogical'
import getSPVersion             from './sputils/getSPVersion'
import parseDateString          from './sputils/parseDateString'
import parseLookupFieldValue    from './sputils/parseLookupFieldValue'
import getDateString            from './sputils/getDateString'
import getNodesFromXml          from './sputils/getNodesFromXml'
import getList                  from './spapi/getList'
import getListColumns           from './spapi/getListColumns'
import getListFormCollection    from './spapi/getListFormCollection'
import getListItems             from './spapi/getListItems'
import getSiteListCollection    from './spapi/getSiteListCollection'
import getSiteWebUrl            from './spapi/getSiteWebUrl'
import getUserProfile           from './spapi/getUserProfile'
import resolvePrincipals        from './spapi/resolvePrincipals'
import searchPrincipals         from './spapi/searchPrincipals'
import updateListItems          from './spapi/updateListItems'

import ChoiceField              from './widgets/ChoiceField/ChoiceField'
import DateTimeField            from './widgets/DateTimeField/DateTimeField'
import List                     from './widgets/List/List'
import ListItem                 from './widgets/ListItem/ListItem'
import LookupField              from './widgets/LookupField/LookupField'
import Message                  from './widgets/Message/Message'
import PeoplePicker             from './widgets/PeoplePicker/PeoplePicker'
import Persona                  from './widgets/Persona/Persona'
import TextField                from './widgets/TextField/TextField'

export default {
    getMsgError:            getMsgError,
    doesMsgHaveError:       doesMsgHaveError,
    xmlEscape:              xmlEscape,
    fillTemplate:           fillTemplate,
    getCamlLogical:         getCamlLogical,
    getSPVersion:           getSPVersion,
    parseDateString:        parseDateString,
    parseLookupFieldValue:  parseLookupFieldValue,
    getDateString:          getDateString,
    getNodesFromXml:        getNodesFromXml,
    getList:                getList,
    getListColumns:         getListColumns,
    getListFormCollection:  getListFormCollection,
    getListItems:           getListItems,
    getSiteListCollection:  getSiteListCollection,
    getSiteWebUrl:          getSiteWebUrl,
    getUserProfile:         getUserProfile,
    resolvePrincipals:      resolvePrincipals,
    searchPrincipals:       searchPrincipals,
    updateListItems:        updateListItems,

    ChoiceField:            ChoiceField,
    DateTimeField:          DateTimeField,
    List:                   List,
    ListItem:               ListItem,
    LookupField:            LookupField,
    Message:                Message,
    PeoplePicker:           PeoplePicker,
    Persona:                Persona,
    TextField:              TextField
};

















//define([
//    'jquery',
//    './boardWidget/board',
//    './dateFieldWidget/dateField',
//    './lookupFieldWidget/lookupField',
//    './peoplePickerWidget/peoplePicker',
//    './filterPanelWidget/filterPanel',
//    './uploadWidget/upload',
//    './sputils/getMsgError',
//    './sputils/doesMsgHaveError',
//    './sputils/xmlEscape',
//    './sputils/fillTemplate',
//    './sputils/getCamlLogical',
//    './sputils/getSPVersion',
//    './sputils/parseDateString',
//    './sputils/parseLookupFieldValue',
//    './sputils/getDateString',
//    './sputils/getNodesFromXml',
//    './uiutils/makeSameHeight',
//    './spapi/getList',
//    './spapi/getListColumns',
//    './spapi/getListFormCollection',
//    './spapi/getListItems',
//    './spapi/getSiteListCollection',
//    './spapi/getSiteUrl',
//    './spapi/getUserProfile',
//    './spapi/resolvePrincipals',
//    './spapi/searchPrincipals',
//    './spapi/updateListItems'
//], function(
//    $,
//    board,
//    dateField,
//    lookupField,
//    peoplePicker,
//    filterPanel,
//    upload,
//    getMsgError,
//    doesMsgHaveError,
//    xmlEscape,
//    fillTemplate,
//    getCamlLogical,
//    getSPVersion,
//    parseDateString,
//    parseLookupFieldValue,
//    getDateString,
//    getNodesFromXml,
//    makeSameHeight,
//    getList,
//    getListColumns,
//    getListFormCollection,
//    getListItems,
//    getSiteListCollection,
//    getSiteUrl,
//    getUserProfile,
//    resolvePrincipals,
//    searchPrincipals,
//    updateListItems
//){
//
//    $.SPWidgets = {
//        defaults:   {},
//        version:    "@VERSION",
//
//        // Utilities
//        escapeXML:              xmlEscape.escape,
//        unEscapeXML:            xmlEscape.unescape,
//        fillTemplate:           fillTemplate,
//        getCamlLogical:         getCamlLogical,
//        getSPVersion:           getSPVersion,
//        parseDateString:        parseDateString,
//        parseLookupFieldValue:  parseLookupFieldValue,
//        SPGetDateString:        getDateString,
//        makeSameHeight:         makeSameHeight,
//        /**
//         * Returns information about the runtime as it applies
//         * to SPWidgets.
//         *
//         * @return {Object} info
//         *
//         */
//        getRuntimeInfo: function() {
//
//            // Class
//            function Info() {
//
//                this.SPWidgets      = $.SPWidgets.version;
//                this.jQuery         = ($.fn.jquery || '?');
//                this.jQueryUI       = '?';
//                this.jQueryUICss    = "?";
//
//                return this;
//            }
//
//            Info.prototype.asString = function() {
//
//                var me      = this,
//                    resp    = "",
//                    prop;
//
//                for (prop in me) {
//
//                    if (me.hasOwnProperty(prop)) {
//
//                        resp += "[ " + prop + " = " + me[prop] + " ] ";
//
//                    }
//
//                }
//
//                return resp;
//
//            }; //end: asString()
//
//            var info        = new Info(),
//                $testObj    = $('<div style="position:fixed;width:100px;left:-1000px;"/>')
//                                .appendTo("body"),
//                testInfo    = '';
//
//            try {
//
//                info.jQueryUI = jQuery.ui.version;
//
//            } catch(e){}
//
//            // Check if jQuery ui css loaded
//            testInfo = $testObj.css("background-image");
//            $testObj.addClass('ui-widget-header');
//
//            if ($testObj.css("background-image") !== testInfo) {
//
//                info.jQueryUICss = 'loaded';
//
//            }
//
//            $testObj.remove();
//
//            return info;
//
//        },
//
//        // SP API methods
//        SPAPI: {
//
//            getList:                getList,
//            getListColumns:         getListColumns,
//            getListFormCollection:  getListFormCollection,
//            getListItems:           getListItems,
//            getSiteListCollection:  getSiteListCollection,
//            getSiteUrl:             getSiteUrl,
//            getUserProfile:         getUserProfile,
//            resolvePrincipals:      resolvePrincipals,
//            searchPrincipals:       searchPrincipals,
//            getNodesFromXml:        getNodesFromXml,
//            updateListItems:        updateListItems
//
//        }
//
//    };
//
//    // Exposes all of the widgets as jQuery plugins, by adding them
//    // to the jQuery $.fn namespace
//    $.each({
//
//        SPShowBoard:        board,
//        SPDateField:        dateField,
//        SPLookupField:      lookupField,
//        pickSPUser:         peoplePicker,
//        SPFilterPanel:      filterPanel,
//        SPControlUpload:    upload,
//        SPGetMsgError:      getMsgError,
//        SPMsgHasError:      doesMsgHaveError
//
//    }, function(pluginName, pluginContructor){
//
//        // Add plugin to the jQuery fn namespace
//        $.fn[pluginName] = function(){
//            var args = Array.prototype.slice.call(arguments);
//            args.unshift(this);
//            return pluginContructor.apply(pluginContructor, args);
//        };
//
//        // If plugin has global defaults, then add them to the $.SPWidgts.defautls as well.
//        if (pluginContructor.defaults) {
//            $.SPWidgets.defaults[pluginName] = pluginContructor.defaults;
//        }
//
//    });
//
//});
