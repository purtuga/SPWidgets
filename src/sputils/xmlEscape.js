define([], function(){

    /**
     * HTML and XML escaping routines
     * @namespace xmlEscape
     */
    var exports = /** @lends xmlEscape */{

        /**
         * Escapes html code. Characters that are escaped include
         * <, > and &. These are converted to the HTML safe
         * characters.  This method can also be used to escape XML.
         *
         * @param {Object} xmlString
         *          The html code to be escaped.
         *
         * @return {String}
         *          html escaped
         *
         */
        escape: function escapeXML(xmlString) {

            if ( typeof xmlString !== "string" ) {

                return "";

            }

            return xmlString
                    .replace(/&/g,'&amp;')
                    .replace(/</g,'&lt;')
                    .replace(/>/g,'&gt;')
                    .replace(/'/g,"&apos;")
                    .replace(/"/g,"&quot;");

        },

        /**
         * Un-escapes html code. Characters that are un-escaped include
         * "&lt;", "&gt;" "&apos;", "&quot;" and "&amp;". These are
         * converted to <, >, ', " and &
         *
         * @param {Object} xmlString
         *          The html code to be un-escaped.
         *
         * @return {String}
         *          html string escaped.
         *
         */
        unescape: function(xmlString){

            if ( typeof xmlString !== "string" ) {

                return "";

            }

            return xmlString
                    .replace(/&lt;/g,'<')
                    .replace(/&gt;/g,'>')
                    .replace(/&amp;/g,'&')
                    .replace(/&apos;/g,"'")
                    .replace(/&quot;/g,'"');

        }

    };

    return exports;

});
