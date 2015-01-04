define([
    'jquery',
    './boardWidget/board',
    './dateFieldWidget/dateField',
    './lookupFieldWidget/lookupField',
    './peoplePickerWidget/peoplePicker',
    './filterPanelWidget/filterPanel',
    './uploadWidget/upload',
    './sputils/getMsgError',
    './sputils/doesMsgHaveError',
    './sputils/xmlEscape',
    './sputils/fillTemplate',
    './sputils/getCamlLogical',
    './sputils/getSPVersion',
    './sputils/parseDateString',
    './sputils/parseLookupFieldValue',
    './sputils/getDateString',
    './sputils/getNodesFromXml',
    './uiutils/makeSameHeight',
    './spapi/getList',
    './spapi/getListFormCollection',
    './spapi/getListItems',
    './spapi/getSiteListCollection',
    './spapi/getSiteUrl',
    './spapi/getUserProfile',
    './spapi/resolvePrincipals',
    './spapi/searchPrincipals'
], function(
    $,
    board,
    dateField,
    lookupField,
    peoplePicker,
    filterPanel,
    upload,
    getMsgError,
    doesMsgHaveError,
    xmlEscape,
    fillTemplate,
    getCamlLogical,
    getSPVersion,
    parseDateString,
    parseLookupFieldValue,
    getDateString,
    getNodesFromXml,
    makeSameHeight,
    getList,
    getListFormCollection,
    getListItems,
    getSiteListCollection,
    getSiteUrl,
    getUserProfile,
    resolvePrincipals,
    searchPrincipals
){

    $.SPWidgets = {
        defaults:   {},
        version:    "@VERSION",

        // Utilities
        escapeXML:              xmlEscape.escape,
        unEscapeXML:            xmlEscape.unescape,
        fillTemplate:           fillTemplate,
        getCamlLogical:         getCamlLogical,
        getSPVersion:           getSPVersion,
        parseDateString:        parseDateString,
        parseLookupFieldValue:  parseLookupFieldValue,
        SPGetDateString:        getDateString,
        makeSameHeight:         makeSameHeight,
        /**
         * Returns information about the runtime as it applies
         * to SPWidgets.
         *
         * @return {Object} info
         *
         */
        getRuntimeInfo: function() {

            // Class
            function Info() {

                this.SPWidgets      = $.SPWidgets.version;
                this.jQuery         = ($.fn.jquery || '?');
                this.jQueryUI       = '?';
                this.jQueryUICss    = "?";

                return this;
            }

            Info.prototype.asString = function() {

                var me      = this,
                    resp    = "",
                    prop;

                for (prop in me) {

                    if (me.hasOwnProperty(prop)) {

                        resp += "[ " + prop + " = " + me[prop] + " ] ";

                    }

                }

                return resp;

            }; //end: asString()

            var info        = new Info(),
                $testObj    = $('<div style="position:fixed;width:100px;left:-1000px;"/>')
                                .appendTo("body"),
                testInfo    = '';

            try {

                info.jQueryUI = jQuery.ui.version;

            } catch(e){}

            // Check if jQuery ui css loaded
            testInfo = $testObj.css("background-image");
            $testObj.addClass('ui-widget-header');

            if ($testObj.css("background-image") !== testInfo) {

                info.jQueryUICss = 'loaded';

            }

            $testObj.remove();

            return info;

        },

        // SP API methods
        SPAPI: {

            getList:                getList,
            getListFormCollection:  getListFormCollection,
            getListItems:           getListItems,
            getSiteListCollection:  getSiteListCollection,
            getSiteUrl:             getSiteUrl,
            getUserProfile:         getUserProfile,
            resolvePrincipals:      resolvePrincipals,
            searchPrincipals:       searchPrincipals,
            getNodesFromXml:        getNodesFromXml

        }

    };

    // Exposes all of the widgets as jQuery plugins, by adding them
    // to the jQuery $.fn namespace
    $.each({

        SPShowBoard:        board,
        SPDateField:        dateField,
        SPLookupField:      lookupField,
        pickSPUser:         peoplePicker,
        SPFilterPanel:      filterPanel,
        SPControlUpload:    upload,
        SPGetMsgError:      getMsgError,
        SPMsgHasError:      doesMsgHaveError

    }, function(pluginName, pluginContructor){

        // Add plugin to the jQuery fn namespace
        $.fn[pluginName] = function(){
            var args = Array.prototype.slice.call(arguments);
            args.unshift(this);
            return pluginContructor.apply(pluginContructor, args);
        };

        // If plugin has global defaults, then add them to the $.SPWidgts.defautls as well.
        if (pluginContructor.defaults) {
            $.SPWidgets.defaults[pluginName] = pluginContructor.defaults;
        }

    });

});
