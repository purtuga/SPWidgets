define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/parseHTML",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/es6-promise",

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

    //=================================
    "less!./SPPeoplePicker"
], function(
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    parseHTML,
    fillTemplate,
    Promise,

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
    CSS_CLASS_IS_SEARCHING  = "is-searching",

    CSS_CLASS_MS_PICKER_BASE        = "ms-PeoplePicker",
    CSS_CLASS_MS_PICKER_SEARCHBOX   = CSS_CLASS_MS_PICKER_BASE + '-searchBox',

    SELECTOR_BASE = "." + CSS_CLASS_BASE,

    /**
     * SharePoint People Picker widget.
     *
     * @class SPPeoplePicker
     *
     * @extends EventEmitter
     * @extends Widget
     *
     * @param {Object} [options]
     *
     * @param {Boolean} [options.allowMultiples=true]
     *  Determine whether multiple users can be selected.
     *
     * @param {String} [options.webURL=currentSiteUrl]
     *  The URL of the site. Defaults to the site from where the widget is running.
     *
     * @param {String} [options.type='User']
     *  The type of search to conduct. Default is `User`. Others
     *  include: `None`, `DistributionList`, `SecurityGroup`,
     *  `SharePointGroup`, `All`
     *
     * @param {Number} [options.maxSearchResults=50]
     *  The max number of results to be returned from the server.
     *
     * @param {Number} [options.minLength=2]
     *  The minimum number of characters the user must type before
     *  suggestions are retrieved.
     *
     * @param {String} [options.inputPlaceholder="Type and Pick"]
     *  The text to appear in the HTML5 placeholder attribute
     *  of the input field.
     *
     * @param {String} [options.showSelected=true]
     *  If `true` (default), the selected users by this widget will be shown
     *  on the screen and remembered by the widget.
     *  Set to this `false`, if all that is desired to show is the
     *  search input element. Note that when set to `false`, `getSelected` method
     *  will always return an empty array and the
     *  [remove]{@link SPPeoplePicker#select} event should be used to capture
     *  the selection made by the user.
     *
     * @param {String} [options.resolvePrincipals=true]
     *  If set to true, any user that is suggested but not yet  part of the
     *  site collection user info list (their id is `-1`) will be automatically
     *  added.
     *
     * @param {Function} [options.filterSuggestions]
     *  A function to filter the Array of results. Function is used in `Array.filter`,
     *  and thus receives as input the array item
     *  (a [PeoplePickerUserProfileModel]{@link PeoplePickerUserProfileModel}) and the index
     *  of the item in the array. Function should return a `Boolean` indicating whether the
     *  item should be kept in the list or no (`true` == keep, `false` don't keep). See
     *  `Array.filter` for more information.
     *
     * @param {String} [options.meKeyword="[me]"]
     *  The keyword that will trigger the special entry that represents the currently
     *  logged in user into the list of suggestions. From an API standpoint, this
     *  special entry translates into `<userid/>`. To turn this feature off, just
     *  set this value to an empty string.
     *
     * @param {String} [options.meKeywordLabel="Current User"]
     *  The label that will be shown when the user selects the special entry from the
     *  suggestions.
     *
     * @param {String} [options.searchInfoMsg="Type a value to see list of candidates."]
     * @param {String} [options.searchingMsg="Searching directory..."]
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

            inst.$groups    = uiFind(SELECTOR_BASE + "-suggestions-groups");
            inst.$inputCntr = uiFind(SELECTOR_BASE + "-searchFieldCntr");

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
                    return false;
                }

                // UP key
                if (key === 38) {
                    if (resultGroup) {
                        resultGroup.focusPrevious();
                    }
                    stopEvent();
                    return false;
                }

                // ESC key
                if (key === 27) {
                    $input.value = "";
                    setTimeout(function(){
                        domTriggerEvent($input, "keyup");
                    }, 50);
                    stopEvent();
                    return false;
                }

                // ENTER key
                if (key === 13) {
                    if (resultGroup) {
                        resultGroup.selectCurrent();
                    }
                    stopEvent();
                    return false;
                }

                // If not min length, exit
                if (searchInput.length < inst.opt.minLength) {
                    clearSuggestions.call(this);
                    return;
                }

                var exec = function(){
                    if (exec === requestSuggestions) {
                        domAddClass($ui, CSS_CLASS_IS_SEARCHING);

                        getSuggestions.call(this)
                            .then(function(peopleList){
                                showSuggestions.call(this, peopleList);
                                domRemoveClass($ui, CSS_CLASS_IS_SEARCHING);
                            }.bind(this))["catch"](function(e){
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

        /**
         * Adds a User to the list of selected items.
         *
         * @param {Object|Array<Object>} people
         *  The object defined with the person to be added should have
         *  at least two attributes: `ID` and `AccountName`. If no `ID`
         *  is defined, however, but `AccountName` or DisplayName is, an
         *  API call will be made attempting to identify the person's ID
         *  on the site.
         *  Example of person definition:
         *
         *      {
         *          ID: "123",
         *          AccountName: "John Doe"
         *      }
         *
         * @returns {Promise<Array<PeoplePickerUserProfileModel>, Error>}
         */
        add: function(people){
            if (!Array.isArray(people)) {
                people = [people];
            }

            return Promise.all(
                people.map(function(person){
                    // If we already have ID and Account Name on input, then
                    // just make sure we have as a PeoplePickerUserProfileModel instance
                    if (person.ID && person.AccountName) {
                        if (!person.Name) {
                            person.Name = person.DisplayName || person.AccountName;
                        }

                        if (PeoplePickerUserProfileModel.isInstanceOf(person)) {
                            return person;
                        }

                        return PeoplePickerUserProfileModel.create(person);
                    }

                    if (person.AccountName || person.DisplayName || person.Name) {
                        return getSuggestions.call(this, person.AccountName || person.DisplayName || person.Name)
                            .then(function(peopleList){
                                // If Account Name was used and we have 1 match, then that is it
                                if (person.AccountName && peopleList.length === 1) {
                                    return peopleList[0];
                                }

                                // Multiple matches.. lets try to match the user
                                // up if possible.
                                var userProfile;
                                peopleList.some(function(personProfile){
                                    if (
                                        (person.AccountName && personProfile.AccountName === person.AccountName) ||
                                        (person.DisplayName && personProfile.DisplayName === person.DisplayName) ||
                                        (person.Name && personProfile.Name === person.Name)
                                    ) {
                                        userProfile = personProfile;
                                        return true;
                                    }
                                });
                                return userProfile;
                            });
                    }

                    return undefined;
                }.bind(this))
            ).then(function(peopleList){
                peopleList.forEach(function(personModel){
                    addPersonToSelectedList.call(this, personModel);
                }.bind(this));

                return peopleList;

            }.bind(this))["catch"](function(e){
                console.error(e); // jshint ignore:line
                return Promise.reject(e);
            });
        },

        /**
         * Removes a selected user (or a list of users) from the list.
         *
         * @param {String|Array<String>} people
         *  The user or list of users to be removed. Anyone of the following
         *  values can be defined on input: `ID`, `AccountName`, `DisplayName`.
         */
        remove: function(people){
            var inst            = PRIVATE.get(this),
                selectedList    = inst.selected;

            if (!selectedList.length) {
                return;
            }

            if (!Array.isArray(people)) {
                people = [people];
            }

            people.forEach(function(id){
                var wdgToRemove;

                selectedList.some(function(selectedWdg){
                    var userProfile = selectedWdg.getUserProfile();

                    if (
                        userProfile.ID          === id ||
                        userProfile.UserInfoID  === id ||
                        userProfile.AccountName === id ||
                        userProfile.Name        === id ||
                        userProfile.DisplayName === id
                    ) {
                        wdgToRemove = selectedWdg;
                    }
                });

                if (wdgToRemove) {
                    wdgToRemove.emit('remove');
                }
            });
        },

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
     *
     * @param {String} [searchString]
     *
     * @return {Promise}
     */
    function getSuggestions(searchString) {
        var inst        = PRIVATE.get(this),
            opt         = inst.opt,
            selected    = inst.selected;

        searchString = searchString || inst.$input.value;

        return searchPrincipals({
                webURL:             opt.webURL,
                searchText:         searchString,
                maxResults:         opt.maxSearchResults,
                principalType:      opt.type,
                UserProfileModel:   opt.UserProfileModel
            })
            // filter out those already selected
            .then(function(results){
                var filteredResults = results.slice(0);

                // Insert the "ME" entry if that was the text the user entered
                if (opt.meKeyword && searchString === opt.meKeyword) {
                    filteredResults.unshift(
                        opt.UserProfileModel.create({
                            UserInfoID:     '<userid/>',
                            DisplayName:    opt.meKeywordLabel
                        })
                    );
                }

                filteredResults = filteredResults.filter(function(personModel){
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
            });
    }

    /**
     * Shows the list of suggestions to the user.
     *
     * @param {Array} peopleList
     *
     * @private
     */
    function showSuggestions(peopleList) {
        var inst        = PRIVATE.get(this);

        // FIXME: need to ensure that this set of results matches the last request made for data. Else, don't show it

        clearSuggestions.call(this);

        inst.resultGroup = ResultGroup.create({
            results: peopleList
        });

        inst.resultGroup.appendTo(inst.$groups);

        inst.resultGroup.on("result-click", function(result){
            var resultModel = result.getUserProfile();

            if (String(resultModel.ID) === "-1") {
                resultModel.resolvePrincipal();
            }

            if (inst.opt.showSelected) {
                result.destroy();
                addPersonToSelectedList.call(this, resultModel);
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
     * Adds a `PeoplePickerUserProfileModel` person to the list
     * of selected users.
     *
     * @private
     *
     * @param {PeoplePickerUserProfileModel} personModel
     */
    function addPersonToSelectedList(personModel){
        var inst        = PRIVATE.get(this),
            $inputCntr  = inst.$inputCntr,
            newSelectedPerson;

        newSelectedPerson = PeoplePickerPersona.create({userProfile: personModel});
        newSelectedPerson.setSize("xs");
        newSelectedPerson.pipe(this, "selected-");

        $inputCntr.parentNode.insertBefore(newSelectedPerson.getEle(), $inputCntr);
        inst.selected.push(newSelectedPerson);
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
        //onCreate:           null,                         // NA - no needed
        onRemoveUser:       null,                           // done (event: remove
        inputPlaceholder:   "Type and Pick",                // done
        minLength:          2,                              // done
        showSelected:       true,                           // done
        resolvePrincipals:  true,                           // done
        meKeyword:          "[me]",                         // done
        meKeywordLabel:     "Current User",                 // done
        filterSuggestions:  null,                           // done
        UserProfileModel:   PeoplePickerUserProfileModel,   // done
        searchInfoMsg:      "Type a value to see list of candidates. Use '[me]' for current user.",
        searchingMsg:       "Searching directory..."
    };

    return SPPeoplePicker;
});
