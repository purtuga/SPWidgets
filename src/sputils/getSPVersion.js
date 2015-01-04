define([], function(){

    /* global SP, _spPageContextInfo */

    /**
     * Returns the SharePoint version number. This is accomplished by
     * looking for  the SP namespace and if it is define, parsing the
     * SP.ClientSchemeversions value.
     *
     * @param {Boolean} returnExternal
     *          If true, then the external version (ex. 2007, 2010) is
     *          returned. Default is to return the internal version number
     *          (ex. 12, 14)
     *
     * @return {String}
     *
     */
    var getSPVersion = function getSPVersion(returnExternal) {

        // Some approaches below taken from:
        // http://sharepoint.stackexchange.com/questions/74978/can-i-tell-what-version-of-sharepoint-is-being-used-from-javascript

        var versionMap = {
                            12: '2007',
                            14: '2010',
                            15: '2013'
                        },
            version     = 12,
            foundIt     = false;

        // If the SP variable is defined, then its at least SP2010
        if (typeof SP !== "undefined") {

            version = 14;

            if (SP.ClientSchemaVersions) {

                if (SP.ClientSchemaVersions.currentVersion) {

                    version = parseInt(SP.ClientSchemaVersions.currentVersion);
                    foundIt = true;

                }

            }

            if (!foundIt && (typeof _spPageContextInfo !== "undefined")) {

                version = parseInt(_spPageContextInfo.webUIVersion);

                if (version === 4) {

                    version = 14;

                }

            }

        }

        // TODO: implement method detailed by Jeremy Thake: http://www.jeremythake.com/2013/08/get-sharepoint-version-number-of-your-platform-quickly/
        // Queries: /_vti_pvt/service.cnf ... Works in SP2010 / 2013

        if (returnExternal) {

            version = versionMap[version] || version;

        }

        return version;

    }; //end: getSPVersion();

    return getSPVersion;

});
