define(['jquery'], function($){

    /**
     * Given a list of elements, this will add a hover affect to
     * those elements by toggling some classes from jQuery UI
     *
     * @memberof jQuery.pt
     *
     * @param {jQuery|String} ele   A jQuery selector or object containing
     *                              the list of elements to receive the hover
     *                              effect.
     * @return {jQuery}
     *
     * @example
     *
     *      $(".tt-hover-animate").addHoverEffect();
     *      $(".container a").addHoverEffect();
     *
     */
    var addHoverEffect = function(ele){
        return $(ele).each(function(){
                if ($(this).hasClass("addHoverEffectDone")) {
                    return;
                } else {
                    $(this).addClass("addHoverEffectDone");
                }
                var e = this;
                $(e).mouseenter(function(){$(e).toggleClass("ui-state-hover");});
                $(e).mouseleave(function(){$(e).toggleClass("ui-state-hover");});
            });
    };// .addHoverEffect()

    return addHoverEffect;

});
