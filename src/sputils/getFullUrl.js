const DOCUMENT_LOCATION = document.location;

/**
 * Returns the full URL (starting with `http...` for a given page address
 *
 * @param {String} pageAddress
 * @param {Boolean} [noEndSlash=false]
 *  By default, the returned url will be ensured to end with a `/`. set this
 *  param to `true` to not append this character if needed.
 *
 * @returns {string}
 */
export default function getFullUrl(pageAddress, noEndSlash) {

    // if URL does not end with "/" then insert it
    if (pageAddress && !noEndSlash && pageAddress.charAt(pageAddress.length - 1) !== "/") {
        pageAddress += "/";
    }

    if (pageAddress.toLowerCase().indexOf("http") > -1) {
        return pageAddress;
    }

    pageAddress = DOCUMENT_LOCATION.protocol + "//" +
        DOCUMENT_LOCATION.hostname +
        (   Number(DOCUMENT_LOCATION.port) !== 80 &&
            Number(DOCUMENT_LOCATION.port) > 0 ?
                ":" + DOCUMENT_LOCATION.port :
                ""
        ) +
        pageAddress;

    return pageAddress;
}
