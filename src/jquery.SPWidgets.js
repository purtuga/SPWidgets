/**
 * @fileOverview jquery.SPWidgets.js
 * jQuery plugin offering multiple Sharepoint widgets that can be used
 * for creating customized User Interfaces (UI).
 *  
 * @version _BUILD_VERSION_NUMBER_
 * @author  Paul Tavares, www.purtuga.com, paultavares.wordpress.com
 * @see     https://github.com/purtuga/SPWidgets
 * 
 * @requires jQuery.js {@link http://jquery.com}
 * @requires jQuery-ui.js {@link http://jqueryui.com}
 * @requires jquery.SPServices.js {@link http://spservices.codeplex.com}
 * 
 * Build Date:  _BUILD_VERSION_DATE_
 * Version:     _BUILD_VERSION_NUMBER_
 * 
 */
;(function($){
    
    /**
     * Namespace for all properties and methods
     * @name        pt
     * @namespace   pt
     * @memberOf    jQuery
     */
    try {
        if (!jQuery.pt) {
            jQuery.pt = {};
        }
    } catch (e) {
        jQuery.pt = {};
    }
    if (jQuery.pt._cache === undefined) {
        /**
         * Local cache of data that is unlikely to change during
         * the live of the page.
         */
        jQuery.pt._cache = {};
    }
    jQuery.SPWidgets = {},
    jQuery.SPWidgets.version = "_BUILD_VERSION_NUMBER_";
    
    
//_SPWIDGETS_PLUGINS_

})(jQuery);
