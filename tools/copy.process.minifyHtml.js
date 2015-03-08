(function(){

    var htmlMinifier= require('html-minifier').minify,
        grunt       = require("grunt"),
        isHtmlFile  = /\.html|htm$/i;

    /**
     * Grunt copy task processor that returns minified HTML markup. Meant to be
     * used with the processContent/process option of the copy task.
     *
     * @param {String} fileContent
     * @param {String} filePath
     * @return {String} file content
     *
     * @see https://www.npmjs.com/package/html-minifier
     *
     * @example
     *
     * copy: {
     *      build: {
     *          src: '',
     *          dest: '',
     *          expand: true,
     *          options: {
     *              processConent: minifyHtml
     *          }
     *      }
     * }
     *
     */
    exports.minifyHtml = function(fileContent, filePath){

        if (isHtmlFile.test(filePath)) {

            grunt.verbose.writeln("minifyHtml: minifying: " + filePath);

            return htmlMinifier(fileContent, {
                    removeComments              : true,
                    collapseWhitespace          : true,
                    conservativeCollapse        : true,
                    collapseBooleanAttributes   : true,
                    removeEmptyAttributes       : true,
                    caseSensitive               : true,
                    ignoreCustomComments        : [
                                                    /^\s+ko/,
                                                    /\/ko\s+$/
                                                ]
                });

        }
        return fileContent;
    };

}());
