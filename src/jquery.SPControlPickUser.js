/**
 * @fileOverview jquery.SPControlPickUser.js
 * jQuery plugin that attaches to an input field and provide a people
 * picker widget for interaction by the user. This Plugin is dependent
 * on jQuery UI's Autocomplete and SPServices library.
 *      
 *  
 * @version _BUILD_VERSION_NUMBER_NUMBER_
 * @author  Paul Tavares, www.purtuga.com
 * @see     TODO: site url
 * 
 * @requires jQuery.js {@link http://jquery.com}
 * @requires jQuery-ui.js {@link http://jqueryui.com}
 * @requires jquery.SPServices.js {@link http://spservices.codeplex.com}
 * 
 * Build Date _BUILD_VERSION_DATE_
 * 
 */

/**
 * Namespace for pickSPUser specific methods.
 * @name        pickSPUser
 * @class       Namespace for pickSPUser plugin
 * @memberOf    jQuery.pt
 */
$.pt.pickSPUser = {
    _isPickSPUserCssDone: false
};

/**
 * Given an input field, this method will display an interface that
 * allows the users to select one or more users from SharePoint and
 * stores the selected user information into the intput field in the
 * format expected when making an update via webservices.
 * 
 * The input field will be hidden in its current position and a UI
 * will displayed instead. As the user picks or removes users, the
 * input field will be updated at the same time, thus it will always
 * be ready to be submitted as part of an update to the server.
 * 
 * @alias $.pickSPUser()
 * @alias jQuery.pickSPUser()
 * @alias $().pickSPUser()
 * @alias jQuery().pickSPUser()
 * 
 * 
 * @param {Object} options
 *                      Object with the options. See below.
 * 
 * @param {Boolean} [options.allowMultiples=true]
 *                      Determine whether multiple users can be picked.
 * @param {Interger} [options.maxSearchResults=50]
 *                      The max number of results to be returned from the
 *                      server.
 * @param {Function} [onPickUser=null]
 *                      Function that is called when user makes a selection.
 *                      Function will have a context (this keyword) of the
 *                      input field to which this plugin is called on, and
 *                      will be given one input param; an object containing
 *                      information about the selected user.
 *   
 * @param {Function} [inputPlaceholder="Type and Pick"]
 *                      The text to appear in the HTML5 placeholder attribute
 *                      of the input field. 
 * 
 * @return {jQuery} selection
 * 
 * 
 * 
 * METHODS:
 * 
 * $().pickSPUser("method", "clear")    -   Clears the currently selected users.
 * 
 */
$.fn.pickSPUser = function(options) {
    
    // if the global styles have not yet been inserted into the page, do it now
    if (!$.pt.pickSPUser._isPickSPUserCssDone) {
        $.pt.pickSPUser._isPickSPUserCssDone = true;
        $('<style type="text/css">' + "\n\n" +
                $.pt.pickSPUser.styleSheet +
                "\n\n</style>")
            .prependTo("head");
    }
    
    // Store the arguments given to this function. Used later if the
    // user is trying to execute a method of this plugin.
    var arg = arguments;
    
    // Define options with globals
    // var options = $.extend({}, options2);
 
    // Initiate each selection as a pickSPUser element
    this.each(function(){
        var ele = $(this);
        if (!ele.is("input") || ele.hasClass("hasPickSPUser")){
            // if the first argument is a string, and this is an input
            // fild, then process methods
            if (typeof options === "string" && ele.is("input")) {
                return $.pt.pickSPUser.handleAction.apply(this, arg);
                
            // ELse, exit
            } else {
                return this;
            }
        };
        
        // Options for this element
        var o   = $.extend({},
                {
                    allowMultiples:     true,
                    maxSearchResults:   50,
                    onPickUser:         null,
                    inputPlaceholder:   "Type and Pick"
                },
                options, 
                {
                    eleUserInput: ele.css("display", "none").addClass("hasPickSPUser") 
                });

        // insure that maxsearchResults is an interger
        o.maxSearchResults = parseInt(o.maxSearchResults) || 50;
        
        // Create pick user container and insert it after the input element
        // TODO: Clean up
        // var cntr        = $(o.htmlTemplateSelector + " .pt-pickSPUser")
                            // .clone(1).insertAfter(ele);
        var cntr        = $($.pt.pickSPUser.htmlTemplate)
                            .find(".pt-pickSPUser").clone(1).insertAfter(ele);
        o.eleSelected   = cntr.find("div.pt-pickSPUser-selected").empty();
        
        o.elePickInput  = cntr.find("div.pt-pickSPUser-input");
        
        // If multiple user are allowed to be picked, then add style to
        // selected input area
        if (o.allowMultiples === true) {
            o.eleSelected.addClass("pt-pickSPUser-selected-multiple");
        }
        
        // If the current input field has a value defined, then parse it
        // and display the currently defined values
        if (ele.val()) {
            var curUsers = new String(ele.val()).split(';#'); 
            var total = curUsers.length;
            for (var i=0; i<total; i++){
                var id = curUsers[i];
                i++;
                var user    = curUsers[i];
                o.eleSelected.append($.pt.pickSPUser.getUserHtmlElement(o, id, user));
            }
            $.pt.addHoverEffect(
                o.eleSelected.find("div.pt-pickSPUser-person-cntr") );
        
            // if we don't allow multiple, then hide the input area
            if (o.allowMultiples === false) {
                o.elePickInput.css("display", "none");
            }
        }
        
        // Variable that store all search results
        var cache = {};
        
        // Add the AutoComplete functionality to the input field
        o.elePickInput.find("input[name='pickSPUserInputField']")
            .attr("placeholder", o.inputPlaceholder)
            .autocomplete({
                minLength: 3,
                source: function(request, response){
                    // If search term is in cache, return it now
                    if (request.term in cache) {
                        response(cache[request.term]);
                        return;
                    }
                    cache[request.term] = [];
                    
                    // Search SP
                    $().SPServices({
                        operation:      "SearchPrincipals",
                        searchText:     request.term,
                        maxResults:     o.maxSearchResults,
                        async:          true,
                        completefunc:   function(xData, status){
                            $(xData.responseXML).find("PrincipalInfo").each(function(){
                                var thisEle = $(this);
                                cache[request.term].push({
                                    displayName:    thisEle.find("DisplayName").text(),
                                    accountId:      thisEle.find("UserInfoID").text(),
                                    accountName:    thisEle.find("AccountName").text(),
                                    accountType:    thisEle.find("PrincipalType").text(),
                                    // needed attributes for autocomplete
                                    value:          thisEle.find("DisplayName").text(),
                                    label:          thisEle.find("DisplayName").text()
                                });
                            });
                            // insert items for Autocomplete
                            
                            // Add to cache
                            response(cache[request.term]);
                        }
                    });
                },//end:source()
                /**
                 * Event bound to an autocomplete suggestion.
                 * 
                 * @param {jQuery} ev   -   jQuery event.
                 * @param {Object} u    -   An object containing the element generated above
                 *                          by the <source> method that represents the person
                 *                          that was selected.
                 */
                select: function(ev, u){
                    // If we store only 1 user, then clear out the current values
                    if (o.allowMultiples === false) {
                        o.eleSelected.empty();
                    }
                    o.eleSelected.append(
                        $.pt.pickSPUser.getUserHtmlElement(
                            o, u.item.accountId, u.item.displayName));
                    $.pt.pickSPUser.storeListOfUsers(cntr);
                    $.pt.addHoverEffect(
                        cntr.find("div.pt-pickSPUser-person-cntr") );
                    // clear out the autocomplete box
                    setTimeout(function(){ev.target.value = "";}, 50);
                    if (o.allowMultiples === false) {
                        o.elePickInput.hide();
                    }
                    // if a callback was defined, call it now
                    if ($.isFunction(o.onPickUser)) {
                        o.onPickUser.call(o.eleUserInput, $.extend({},u.item));
                    }
                }
            });//end:autocomplete 
        
        // Store the options for this call on the container and include a pointer
        // in the input field to this element
        cntr.data("pickSPUserContainerOpt", o);
        ele.data("pickSPUserContainer", cntr);
        
        return this;
    });
    
    return this;
    
};// $.fn.pickSPUser()

/**
 * Builds the html element that surrounds a user for display on the page.
 * 
 * @param {Object} opt     -   The options object given to <jQuery.fn.pickSPUser()>
 * @param {String} id      -   The User's Sharepoint UID
 * @param {String} name    -   The User's name.
 * 
 * @return {jQuery} Html element
 * 
 */
$.pt.pickSPUser.getUserHtmlElement = function(opt, id, name){
    // TODO: clean up
    // var ele = $(opt.htmlTemplateSelector + " .pt-pickSPUser-person").clone(1);
    var ele = $($.pt.pickSPUser.htmlTemplate)
                .find(".pt-pickSPUser-person").clone(1);
    ele.attr("data-pickSPUserID", id);
    ele.find("span.pt-person-name")
            .append(name)
            .end()
        .attr("data-pickSPUserNAME", name);
    return ele;    
    
};// $.pt.pickSPUser.getUserHtmlElement()


/**
 * Method is bound to the X (remove) button that appears when the one 
 * hovers over the names curerntly displayed. Removes the user from
 * the UI and updates the input field to reflect what is currently
 * displayed. 
 * 
 * @param {Object} ele -   The HTML element from where this method was
 *                         called. Used to find both the div.pt-pickSPUser
 *                         overall parent element as well as the specific
 *                         .pt-pickSPUser-person element for the user that
 *                         was clicked on.
 * 
 * @return {undefined}
 * 
 */
$.pt.pickSPUser.removeUser = function(ele){
    
    var cntr    = $(ele).closest("div.pt-pickSPUser");
    var o       = cntr.data("pickSPUserContainerOpt");
    
    // remove user from the view
    $(ele).closest("div.pt-pickSPUser-person").fadeOut('fast', function(){
        $(this).remove();
        $.pt.pickSPUser.storeListOfUsers(cntr);
    });
    
    // if AllowMultiple is false, then make the picker input visible
    if (o.allowMultiples === false) {
        o.elePickInput.show("fast", function(){
            o.elePickInput.find("input").focus();
        });
    }
    
    return;
};// $.pt.pickSPUser.removeUser()


/**
 * Method will look at the container that holds the currently selected
 * users and will populate the initial input field given to
 * <jQuery.fn.pickSPUser()> with a sting representing those users.
 *   
 * 
 * @param {Object} ele -   The HTML element from where this method was
 *                         called. Used to find both the div.pt-pickSPUser
 *                         overall parent element as well as the specific
 *                         .pt-pickSPUser-person element for the user that
 *                         was clicked on.
 * 
 * @return {undefined}
 * 
 */
$.pt.pickSPUser.storeListOfUsers = function(ele){
    
    var cntr    = $(ele).closest("div.pt-pickSPUser"),
        opt     = cntr.data("pickSPUserContainerOpt"),
        newVal  = "",
        // isDone: keep track of the user already selected,
        // so we don't add them twice to the input field.
        isDone  = {}; 
    
    cntr.find("div.pt-pickSPUser-selected div.pt-pickSPUser-person")
        .each(function(){
            if (isDone[$(this).attr("data-pickSPUserID")]) {return;};
            isDone[$(this).attr("data-pickSPUserID")] = true;
            if (newVal) {
                newVal += ";#";
            }
            newVal += $(this).attr("data-pickSPUserID");
            newVal += ";#";
            newVal += $(this).attr("data-pickSPUserNAME");
        });
    opt.eleUserInput.val(newVal);
    
    return;
};// $.pt.pickSPUser.storeListOfUsers()

/**
 * Handles method actions given to $().pickSPUser()
 * 
 * @param {String} type
 * @param {String} action
 * @param {Object} options
 * 
 * @return {this}
 * 
 */
$.pt.pickSPUser.handleAction = function(type, action, options) {
    
    type    = String(type).toLowerCase();
    action  = String(action).toLowerCase();
    
    o = $(this).data("pickSPUserContainer").data("pickSPUserContainerOpt");
    
    if (type === "method") {
        if (action === "clear") {
            o.eleUserInput.val("");
            o.eleSelected.empty();
            if (o.allowMultiples === false) {
                o.eleSelected.css("display", "none");
                o.elePickInput.show();
            }
        }
        if (action === "destroy"){
            if ( $(this).hasClass('hasPickSPUser')) {
                $(this).removeClass('hasPickSPUser')
                        .next('.pt-pickSPUser').remove()
                        .show()
                        .trigger('change'); //trigger is for knockoutJS.
            }

        }
    }//end:type===method
    
    return this;
};// $.pt.pickSPUser.handleAction() 


/**
 * @property
 * Stores the Style sheet that is inserted into the page the first
 * time pickSPUser is called.
 * Value is set at build time.
 * 
 */
$.pt.pickSPUser.styleSheet = "_INCLUDE_PICKSPUSER_CSS_TEMPLATE_";


/**
 * @property
 * Stores the HTML template for each people picker.
 * Value is set at build time.
 * 
 */
$.pt.pickSPUser.htmlTemplate = "_INCLUDE_PICKSPUSER_HTML_TEMPLATE_";

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
$.pt.addHoverEffect = function(ele){
    return $(ele).each(function(){
            if ($(this).hasClass("addHoverEffectDone")) {
                return;
            } else {
                $(this).addClass("addHoverEffectDone");
            };
            var e = this;
            $(e).mouseenter(function(){$(e).toggleClass("ui-state-hover");});
            $(e).mouseleave(function(){$(e).toggleClass("ui-state-hover");});
        });
};// $.pt.addHoverEffect()



