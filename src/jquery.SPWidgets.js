/**
 * @fileOverview jquery.SPWidgets.js
 * jQuery plugin offering multiple Sharepoint widgets that can be used
 * for creating customized User Interfaces (UI).
 *  
 * @version _BUILD_VERSION_NUMBER_
 * @author  Paul Tavares, www.purtuga.com, paultavares.wordpress.com
 * @see     http://purtuga.github.com/SPWidgets/
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
    
    "use strict";
    /*jslint nomen: true, plusplus: true */
   
    /**
     * Namespace for all properties and methods
     * @name        pt
     * @namespace   pt
     * @memberOf    jQuery
     */
    try {
        if (!$.pt) {
            $.pt = {};
        }
    } catch (e) {
        $.pt = {};
    }
    
    if ($.pt._cache === undefined) {
    
        /**
         * Local cache of data that is unlikely to change during
         * the live of the page.
         */
        $.pt._cache = {};
    
    }
    
    $.SPWidgets             = {};
    $.SPWidgets.version     = "_BUILD_VERSION_NUMBER_";
    $.SPWidgets.defaults    = {};
    
    /**
     * Given an XML message as returned by the Sharepoint WebServices API,
     * this method will check if it contains an error and return a boolean
     * indicating that. 
     * 
     *  @return {Boolean} true|false
     * 
     */
    $.fn.SPMsgHasError = function() {
        
        var spErrCode = $(this).find("ErrorCode:first");
        
        if (    spErrCode.size()
            &&  spErrCode.text() !== "0x00000000"
        ) {
            
            return true;
            
        } else {
        
            spErrCode = $(this).find("faultcode");
        
            if (spErrCode.size()) {
        
                return true;
        
            }      
        
        }
        
        return false;
        
    }; /* $.fn.SPMsgHasError() */
    
    /**
     *  Given a sharepoint webservices response, this method will
     *  look to see if it contains an error and return that error
     *  formated as a string.
     * 
     * PARAMS:
     * 
     *  -   none.
     * 
     * RETURN:
     * 
     * @return {String} errorMessage
     * 
     */
    $.fn.SPGetMsgError = function(){
        
        var xMsg  = $(this),
            error = "ERROR: Call to Sharepoint Web Services failed.";
        
        if (xMsg.find("ErrorCode").length) {
            
            error += "\n" + xMsg.find("ErrorCode:first").text() +
                    ": " + xMsg.find("ErrorText").text();
        
        } else if (xMsg.find("faultcode").length) {
            
            error += xMsg.find("faultstring").text() + 
                    "\n" + xMsg.find("errorstring").text();
            
        } else {
            
            error = "";
            
        }
        
        return error;
        
    }; /* $.fn.SPGetMsgError() */
    
    
//_SPWIDGETS_PLUGINS_

})(jQuery);
