define(['jquery'], function($){

    /**
     * Make a set of element the same height by taking the height of
     * the longest element.
     *
     * @param {HTMLElement|Selector|jQuery} ele - Set of elements
     * @param {Interger} [pad=0]                - Number of pixels to add on to the height
     * @param {String} [cssProp=height]         - The css property to be set. Default is height
     *
     * @return {Object} ele (input param) is returned
     *
     */
    var makeSameHeight = function makeSameHeight(ele, pad, cssProp) {

        var h = 0,
            e = $(ele);

        if (!cssProp) {

            cssProp = "height";

        }

        e.each(function(){

            var thisEle = $(this).css(cssProp, "");

            if (h < thisEle.outerHeight(true)) {

                h = thisEle.outerHeight(true);

            }

        });

        if (h > 0) {

            if (pad) {

                h += pad;

            }

            e.css(cssProp, h);

        }

        return ele;

    }; // end: makeSameHeight()

    return makeSameHeight;

});
