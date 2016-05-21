define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/parseHTML",
    "vendor/jsutils/fillTemplate",

    "vendor/domutils/domAddEventListener",
    "vendor/domutils/domAddClass",
    "vendor/domutils/domRemoveClass",
    "vendor/domutils/domClosest",
    "vendor/domutils/domFind",
    "vendor/domutils/domTriggerEvent",
    "vendor/domutils/domChildren",

    "../../spapi/searchPrincipals",
    "../../spapi/resolvePrincipals",
    "./ResultGroup/ResultGroup",
    "./PeoplePickerPersona/PeoplePickerPersona",

    "text!./SPPeoplePicker.html",
    "text!./selectedPersonaWrapper.html",

    //=================================
    "less!./SPPeoplePicker"
], function(
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    parseHTML,
    fillTemplate,

    domAddEventListener,
    domAddClass,
    domRemoveClass,
    domClosest,
    domFind,
    domTriggerEvent,
    domChildren,

    searchPrincipals,
    resolvePrincipals,
    ResultGroup,
    PeoplePickerPersona,

    SPPeoplePickerTemplate
){

    var
    PRIVATE = dataStore.create(),

    BODY = document.body,

    CSS_CLASS_BASE          = "spwidgets-SPPeoplePicker",
    CSS_CLASS_IS_ACTIVE     = "is-active",

    CSS_CLASS_MS_PICKER_BASE        = "ms-PeoplePicker",
    CSS_CLASS_MS_PICKER_SEARCHBOX   = CSS_CLASS_MS_PICKER_BASE + '-searchBox',

    SELECTOR_BASE = "." + CSS_CLASS_BASE,

    /**
     * SharePoint People Picker widget.
     *
     * @class SPPeoplePicker
     * @extends EventEmitter
     * @extends Widget
     *
     * @param {Object} [options]
     *
     * @param {Function} [options.filterSuggestions]
     *  A function to filter the Array of results. Function is used in `Array.filter`,
     *  and thus received as input the array item (a `UserProfileModel`) and the index
     *  of the item in the array. Function should return a `Boolean`: keep item == `true`,
     *  while `false` will not keep the item.
     *
     * @fires SPPeoplePicker#select
     * @fires SPPeoplePicker#remove
     */
    SPPeoplePicker = {
        init: function (options) {
            var inst = {
                opt:            objectExtend({}, SPPeoplePicker.defaults, options),
                resultGroup:    null,
                selected:       [] // array of Persona widgets
            };

            inst.opt.UserProfileModel = inst.opt.UserProfileModel.extend({webURL: inst.opt.webURL});
            PRIVATE.set(this, inst);

            var $ui         = this.$ui = parseHTML(
                                fillTemplate(SPPeoplePickerTemplate, inst.opt)
                            ).firstChild,
                uiFind      = $ui.querySelector.bind($ui),
                $input      = inst.$input = uiFind("input[name='search']"),
                $searchBox  = inst.$searchBox = uiFind("." + CSS_CLASS_MS_PICKER_SEARCHBOX),
                requestSuggestions,
                bodyClickEv;

            inst.$groups        = uiFind(SELECTOR_BASE + "-suggestions-groups");
            inst.$inputCntr     = uiFind(SELECTOR_BASE + "-searchFieldCntr");

            // Focusing on the Input field, show the suggestions
            // and sets up the event to close it clicking outside of it.
            domAddEventListener($input, "focus", function(){
                domAddClass($ui, CSS_CLASS_IS_ACTIVE);
                domTriggerEvent($input, "keyup");

                if (bodyClickEv) {
                    bodyClickEv.remove();
                    bodyClickEv = null;
                }

                // Clicking anywhere outside of this widget - removes active class
                bodyClickEv = domAddEventListener(BODY, "click", function(ev){
                    var closestPeoplePicker = domClosest(ev.target, SELECTOR_BASE);

                    if (!closestPeoplePicker || closestPeoplePicker !== $ui) {
                        domRemoveClass($ui, CSS_CLASS_IS_ACTIVE);
                        bodyClickEv.remove();
                        bodyClickEv = null;
                        clearSuggestions.call(this);
                    }
                }.bind(this));
            }.bind(this));

            // When user types, get suggestions
            domAddEventListener($input, "keyup", function(ev){
                var key         = ev.which || ev.keyCode,
                    resultGroup = inst.resultGroup,
                    stopEvent   = function() {
                        ev.preventDefault();
                        ev.stopPropagation();
                        ev.stopImmediatePropagation();
                    },
                    searchInput = String($input.value).trim();

                if (!searchInput) {
                    requestSuggestions = undefined;
                    clearSuggestions.call(this);

                    // ESC key + no value: close suggestions panel
                    if (key === 27 && !$input.value) {
                        domTriggerEvent(BODY, "click");
                        $input.blur();
                    }
                    return;
                }

                // DOWN key
                if (key === 40) {
                    if (resultGroup) {
                        resultGroup.focusNext();
                    }
                    stopEvent();
                    return;
                }

                // UP key
                if (key === 38) {
                    if (resultGroup) {
                        resultGroup.focusPrevious();
                    }
                    stopEvent();
                    return;
                }

                // ESC key
                if (key === 27) {
                    $input.value = "";
                    setTimeout(function(){
                        domTriggerEvent($input, "keyup");
                    }, 50);
                    stopEvent();
                    return;
                }

                // ENTER key
                if (key === 13) {
                    if (resultGroup) {
                        resultGroup.selectCurrent();
                    }
                    stopEvent();
                    return;
                }

                // If not min length, exit
                if (searchInput.length < inst.opt.minLength) {
                    clearSuggestions.call(this);
                    return;
                }

                var exec = function(){
                    if (exec === requestSuggestions) {
                        getSuggestions.call(this)["catch"](function(e){
                            console.log(e); // jshint ignore:line
                        });
                    }
                }.bind(this);

                requestSuggestions = exec;

                // After brief delay: get suggestion
                setTimeout(function(){
                    exec();
                }, 250);
            }.bind(this));

            // Clicking inside of this widget, but no on a selected element or
            // the input element, places focus on the input
            domAddEventListener($searchBox, "click", function(ev){
                if (ev.target === $searchBox) {
                    $input.focus();
                }
            }.bind(this));

            // List for when selected users are removed
            this.on("selected-remove", function(userWdg){
                var personModel = userWdg.getUserProfile(),
                    selectedIndex;

                userWdg.destroy();

                inst.selected.some(function(selectedWdg, index){
                    if (selectedWdg === userWdg) {
                        selectedIndex = index;
                        return true;
                    }
                });

                if (typeof selectedIndex !== "undefined") {
                    inst.selected.splice(selectedIndex, 1);
                }

                domTriggerEvent($input, "keyup");

                /**
                 * A selection was removed
                 *
                 * @event SPPeoplePicker#remove
                 *
                 * @type {UserProfileModel}
                 */
                this.emit("remove", personModel);
            }.bind(this));

            this.onDestroy(function(){
                inst.selected.forEach(function(wdg){
                    if (wdg) {
                        wdg.destroy();
                    }
                });
                inst.selected.splice(0);
                PRIVATE['delete'](this);
            }.bind(this));
        },

        /**
         * Clears all selected users.
         */
        clear: function(){
            var selected = PRIVATE.get(this).selected;
            selected.forEach(function(userWdg){
                userWdg.destroy();
            });
            selected.slice(0);
        },

        add: function(){},

        remove: function(){},

        /**
         * Returns an array of `UserProfileModels` for those that are currently
         * selected.
         *
         * @returns {Array.<UserProfileModel>}
         */
        getSelected: function(){
            // FIXME: add methods to returned array to provide easy methods to get array values for update to SP - use Collection
            return PRIVATE.get(this).selected.map(function(userWdg){
                return userWdg.getUserProfile();
            });
        }
    },

    /**
     * People picker user profile model used to model each user profile
     *
     * @class PeoplePickerUserProfileModel
     * @extends UserProfileModel
     */
    PeoplePickerUserProfileModel = searchPrincipals.defaults.UserProfileModel.extend(/** @lends PeoplePickerProfileModel.prototype */{
        /**
         * The web URL from where this user was retrieved. Used in resolved principal
         * @type {String}
         */
        webURL: "",

        /**
         * Returns the AccountName url encoded.
         *
         * @returns {string}
         */
        getAccountNameUrlEncoded: function(){
            return encodeURIComponent(this.AccountName);
        },

        /**
         * Resolves the User in the current site by calling the `ResolvePrincipal` API
         *
         * @returns {Promise}
         */
        resolvePrincipal: function(){
            resolvePrincipals({
                webURL:         this.webURL,
                principalKeys:  this.AccountName
            }).then(function(userList){
                // See Issue #42 for the possibility of the results returning
                // multiples, even when only one principalKey was provided on
                // input to the API.
                // https://github.com/purtuga/SPWidgets/issues/42
                userList.some(function(resolvedUser){
                    if (
                        resolvedUser.ID &&
                        String(resolvedUser.ID) !== "-1" &&
                        (
                            (
                                resolvedUser.AccountName &&
                                resolvedUser.AccountName === this.AccountName
                            ) ||
                            (
                                resolvedUser.Email &&
                                resolvedUser.Email === this.Email
                            ) ||
                            (
                                resolvedUser.DisplayName &&
                                resolvedUser.DisplayName  === this.DisplayName
                            )

                        )
                    ) {
                        this.UserInfoID = this.ID = resolvedUser.ID;
                        return true;
                    }

                }.bind(this));
            }.bind(this));
        }
    });

    /**
     * Fetches the suggestion for the text entered by the user
     *
     * @private
     * @return {Promise}
     */
    function getSuggestions() {
        var inst        = PRIVATE.get(this),
            opt         = inst.opt,
            selected    = inst.selected;

        return searchPrincipals({
                webURL:             opt.webURL,
                searchText:         inst.$input.value,
                maxResults:         opt.maxSearchResults,
                principalType:      opt.type,
                UserProfileModel:   opt.UserProfileModel
            })
            // filter out those already selected
            .then(function(results){
                var filteredResults = results.filter(function(personModel){
                    if (
                        !selected.length ||
                        !selected.some(function(selectedWdg){
                            return selectedWdg.getUserProfile().ID === personModel.ID;
                        })
                    ) {
                        return true;
                    }
                });

                if (opt.filterSuggestions) {
                    filteredResults = filteredResults.filter(opt.filterSuggestions);
                }

                return filteredResults;
            })
            .then(showSuggestions.bind(this));
    }

    /**
     * Shows the list of suggestions to the user.
     *
     * @param {Array} peopleList
     *
     * @private
     */
    function showSuggestions(peopleList) {
        var inst        = PRIVATE.get(this),
            $inputCntr  = inst.$inputCntr,
            selected    = inst.selected;

        // FIXME: need to ensure that this set of results matches the last request made for data. Else, don't show it

        clearSuggestions.call(this);

        inst.resultGroup = ResultGroup.create({
            results: peopleList
        });

        inst.resultGroup.appendTo(inst.$groups);

        inst.resultGroup.on("result-click", function(result){
            var resultModel = result.getUserProfile(),
                newSelectedPerson;

            if (String(resultModel.ID) === "-1") {
                resultModel.resolvePrincipal();
            }

            if (inst.opt.showSelected) {
                result.destroy();

                newSelectedPerson = PeoplePickerPersona.create({userProfile: resultModel});
                newSelectedPerson.setSize("xs");
                newSelectedPerson.pipe(this, "selected-");

                $inputCntr.parentNode.insertBefore(newSelectedPerson.getEle(), $inputCntr);
                selected.push(newSelectedPerson);
            }

            /**
             * A suggestion was selected.
             *
             * @event SPPeoplePicker#select
             * @type {PeoplePickerUserProfileModel}
             */
            this.emit("select", resultModel);
        }.bind(this));
    }

    /**
     * Clears the current set of suggestions
     *
     * @private
     */
    function clearSuggestions(){
        var inst        = PRIVATE.get(this),
            resultGroup = inst.resultGroup;

        if (resultGroup) {
            resultGroup.destroy();
            inst.resultGroup = null;
        }
    }

    SPPeoplePicker = EventEmitter.extend(Widget, SPPeoplePicker);

    SPPeoplePicker.defaults = {
        allowMultiples:     true,                           // done
        maxSearchResults:   50,                             // done
        webURL:             null,                           // done
        type:               'User',                         // done
        onPickUser:         null,                           // done (event: select)
        //onCreate:           null,                           // NA - no needed
        onRemoveUser:       null,                           // done (event: remove
        inputPlaceholder:   "Type and Pick",                // done
        minLength:          2,                              // done
        showSelected:       true,                           // done
        resolvePrincipals:  true,                           // done
        meKeyword:          "[me]",
        meKeywordLabel:     "Current User",
        filterSuggestions:  null,                           // done
        UserProfileModel:   PeoplePickerUserProfileModel    // done
    };

    return SPPeoplePicker;
});
