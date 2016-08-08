import apiFetch from "../sputils/apiFetch";
import cache from "../sputils/cache";
import getSiteWebUrl from "./getSiteWebUrl";
import objectExtend from "vendor/jsutils/objectExtend";
import domFind from "vendor/domutils/domFind";

    /**
     * Returns a Deferred that is resolved with an Array of Objects containing
     * the site list collection.
     *
     * @param {Object} [options]
     *
     * @param {String} [options.webURL=currentSite]
     *  The site/sub-site for which the list collection
     *  is to be retrieved.
     *
     * @param {Boolean} [options.cache=true]
     *  If true, the request will be cached.
     *
     * @return {Promise}
     *  Promise is resolved with an Array of Objects.
     *  Promise might be rejected with an `Error` object
     *
     * @see https://msdn.microsoft.com/en-us/library/ms774864(v=office.12).aspx
     *
     * @example
     *
     * // Sample Object in response:
     *
     *  {
     *      "InternalName": "{E0919C81-0B24-4FFC-A049-F289473ADE32}",
     *      "Title": "App Survey",
     *      "Description": "",
     *      "BaseType": "Survey",
     *      "BaseTemplate": "Survey",
     *      "DefaultViewUrl": "/sites/PT2013/Lists/App Survey/overview.aspx",
     *      "LastModified": "2015-12-15 17:32:11Z",
     *      "InheritedSecurity": "true",
     *      "AllowAnonymousAccess": "false",
     *      "AnonymousViewListItems": "false",
     *      "ReadSecurity": "1",
     *      "title": "App Survey"
     *  }
     */
    var getSiteListCollection = function(options){
        var opt = objectExtend({}, getSiteListCollection.defaults, options),
            reqPromise;

        return getSiteWebUrl(opt.webURL).then(function(webURL){
            opt.webURL     += webURL + "_vti_bin/SiteData.asmx";
            // FIXME: cache key not correct below...
            opt.cacheKey    = opt.webURL + "?" + [opt.filter].join("|");
            opt.isCached    = cache.isCached(opt.cacheKey);

            // Backward compatibility
            if (typeof opt.cacheXML !== "undefined") {
                try {
                    console.warn("getSiteListCollection(): cacheXML option deprecated"); // jshint ignore:line
                } catch(e){}
                opt.cache = opt.cacheXML;
            }
            if (opt.filter || opt.completefunc) {
                try {
                    console.error("getSiteListCollection(): option.filter and option.completefunc not supported"); // jshint ignore:line
                } catch(e){}
            }

            // If cache is true and we have a cached version, return it.
            if (opt.cache && opt.isCached) {
                reqPromise =  cache(opt.cacheKey);
                return reqPromise;
            }

            // If cache is FALSE, and we have a cached version of this key,
            // then remove the cached version - basically reset
            if (opt.isCached) {
                cache.clear(opt.cacheKey);
            }

            reqPromise = apiFetch(opt.webURL, {
                method:     "POST",
                headers:    {'Content-Type': 'text/xml;charset=UTF-8'},
                body:       '<?xml version="1.0" encoding="utf-8"?>' +
                '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                '<soap:Body><GetListCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/">' +
                '</GetListCollection></soap:Body></soap:Envelope>'

            }).then(function(response){
                var $siteLists  = domFind(response.content, "_sList"),
                    lists       = $siteLists.map(function(listHtml){
                        return Array.prototype.reduce.call(listHtml.childNodes, function(listObj, listProp){
                            listObj[listProp.nodeName] = listProp.textContent;
                            return listObj;
                        }, {});
                    });

                return lists;
            });

            //-------------------------------------------------------------------
            // RESPONSE EXAMPLE:
            //-------------------------------------------------------------------
            //<?xml version="1.0" encoding="utf-8"?>
            //<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
            //xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
            //    <soap:Body>
            //<GetListCollectionResponse xmlns="http://schemas.microsoft.com/sharepoint/soap/">
            // <GetListCollectionResult>0</GetListCollectionResult>
            //  <vLists>
            //      <_sList>
            //          <InternalName>{E0919C81-0B24-4FFC-A049-F289473ADE32}</InternalName>
            //          <Title>App Survey</Title>
            //          <Description/>
            //          <BaseType>Survey</BaseType>
            //          <BaseTemplate>Survey</BaseTemplate>
            //          <DefaultViewUrl>/sites/PT2013/Lists/App Survey/overview.aspx</DefaultViewUrl>
            //          <LastModified>2015-12-15 17:32:11Z</LastModified>
            //          <InheritedSecurity>true</InheritedSecurity>
            //          <AllowAnonymousAccess>false</AllowAnonymousAccess>
            //          <AnonymousViewListItems>false</AnonymousViewListItems>
            //          <ReadSecurity>1</ReadSecurity>
            //      </_sList>
            //  </vLists>
            //</GetListCollectionResponse>
            //</soap:Body>
            //</soap:Envelope>
            //-------------------------------------------------------------------

            // If cache was true, then cache this promise
            if (opt.cache) {
                cache(opt.cacheKey, reqPromise);
            }

            return reqPromise;
        });
    };

    getSiteListCollection.defaults = {
        webURL: '',
        cache:  true
    };

    export default getSiteListCollection;

