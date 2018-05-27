/**
 * Parses a Sharepoint lookup values as returned by webservices
 * (SOAP, ex: `id;#title;#id;#Title`) into an array of objects.
 *
 * @param {String} lookupValue
 *  Lookup items string as returned by SP - usually in format of
 *  `id;#valueHere`.
 *
 * @return {Array<Object>}
 *  Array of objects. Each object has two keys; `Title` and `ID`
 *
 * @example
 *
 * parseLookupFieldValue("1;#item one title;#2;#item two title");
 * // Returns:
 * [
 *      {
 *          ID: "1",
 *          Title: "item one title"
 *      },
 *      {
 *          ID: "2",
 *          Title: "item two title"
 *      }
 * ]
 */
const parseLookupFieldValue = function(lookupValue) {
    var response    = [],
        valueTokens = String(lookupValue).split(';#'),
        total       = valueTokens.length,
        i, vId, vTitle;

    if (!lookupValue) {
        return response;
    }

    for (i=0; i<total; i++){
        vId = valueTokens[i];
        i++;
        vTitle = valueTokens[i];

        if (vId || vTitle) {
            response.push({
                // FIXME: remove deprecated values
                /* DEPRECATED */ id:     vId,
                /* DEPRECATED */ title:  vTitle,
                ID:     vId,
                Title:  vTitle
            });
        }
    }

    return response;
};

export default parseLookupFieldValue;


