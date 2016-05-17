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

    "../../spapi/searchPrincipals",
    "./ResultGroup/ResultGroup",

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

    searchPrincipals,
    ResultGroup,

    SPPeoplePickerTemplate,
    selectedPersonaWrapperTemplate
){

    var
    PRIVATE = dataStore.create(),

    BODY = document.body,

    CSS_CLASS_BASE          = "spwidgets-SPPeoplePicker",
    CSS_CLASS_IS_ACTIVE     = "is-active",
        
    CSS_CLASS_MS_PERSONA    = 'ms-Persona',
    CSS_CLASS_MS_PERSONA_XS = CSS_CLASS_MS_PERSONA + '--xs',

    CSS_CLASS_MS_PICKER_BASE        = "ms-PeoplePicker",
    CSS_CLASS_MS_PICKER_SEARCHBOX   = CSS_CLASS_MS_PICKER_BASE + '-searchBox',
    CSS_CLASS_MS_PICKER_PERSONA     = CSS_CLASS_MS_PICKER_BASE + '-persona',

    SELECTOR_BASE = "." + CSS_CLASS_BASE,

    /**
     * SharePoint People Picker widget.
     *
     * @class SPPeoplePicker
     * @extends EventEmitter
     * @extends Widget
     *
     * @fires SPPeoplePicker#create
     * @fires SPPeoplePicker#add
     * @fires SPPeoplePicker#remove
     */
    SPPeoplePicker = {
        init: function (options) {
            var inst = {
                opt:            objectExtend({}, SPPeoplePicker.defaults, options),
                resultGroup:    null,
                selected:       [] // array of UserProfileModel's
            };

            PRIVATE.set(this, inst);

            var $ui         = this.$ui = parseHTML(
                                fillTemplate(SPPeoplePickerTemplate, inst.opt)
                            ).firstChild,
                uiFind      = $ui.querySelector.bind($ui),
                $input      = inst.$input = uiFind("input[name='search']"),
                $searchBox  = inst.$searchBox = uiFind("." + CSS_CLASS_MS_PICKER_SEARCHBOX),
                requestSuggestions,
                bodyClickEv;

            inst.$suggestions   = uiFind(SELECTOR_BASE + "-suggestions");
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
                    };

                if (!String($input.value).trim()) {
                    requestSuggestions = undefined;
                    clearSuggestions.call(this);

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

            // Clicking the remove button on selected users, removes them from the list
            domAddEventListener($searchBox, "click", function(ev){
                var removeButtonEle = domClosest(ev.target, SELECTOR_BASE + "-result-remove");

                if (removeButtonEle) {
                    var selectedPersona = domClosest(removeButtonEle, '.' + CSS_CLASS_MS_PICKER_PERSONA),
                        personaEle      = domFind(selectedPersona, "." + CSS_CLASS_MS_PERSONA)[0],
                        personID        = personaEle.getAttribute("data-sp_id"),
                        personModel, selectedIndex;

                    selectedPersona.parentNode.removeChild(selectedPersona);

                    inst.selected.some(function(selectedPerson, index){
                        if (selectedPerson.ID === personID) {
                            selectedIndex = index;
                            personModel = selectedPerson;
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
                }
            }.bind(this));

            // Clicking inside of this widget, but no on a selected element or
            // the input element, places focus on the input
            domAddEventListener($ui, "click", function(ev){
                if (ev.target === $searchBox) {
                    $input.focus();
                }
            });
        },

        clear: function(){},

        add: function(){},

        remove: function(){},

        getSelected: function(){}
    };

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
                webURL:     opt.webURL,
                searchText: inst.$input.value,
                UserProfileModel: searchPrincipals.defaults.UserProfileModel.extend({
                    getAccountNameUrlEncoded: function(){
                        return encodeURIComponent(this.AccountName);
                    }
                })
            })
            // filter out those already selected
            .then(function(results){
                return results.filter(function(personModel){
                    if (
                        !selected.length ||
                        !selected.some(function(selectedModel){
                            return selectedModel.ID === personModel.ID;
                        })
                    ) {
                        return true;
                    }
                });
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
            $inputCntr  = inst.$inputCntr;

        clearSuggestions.call(this);

        inst.resultGroup = ResultGroup.create({
            results: peopleList
        });

        inst.resultGroup.appendTo(inst.$groups);

        inst.resultGroup.on("result-click", function(result){
            var resultEle       = result.resultEle,
                personaEle      = result.personaEle,
                selectedWrapEle = parseHTML(selectedPersonaWrapperTemplate).firstChild;

            selectedWrapEle.insertBefore(personaEle, selectedWrapEle.firstChild);
            domAddClass(personaEle, CSS_CLASS_MS_PERSONA_XS);

            // Remove the result Element from the suggestion list and
            // add the personal Element to the list of selected people
            resultEle.parentNode.removeChild(resultEle);
            $inputCntr.parentNode.insertBefore(selectedWrapEle, $inputCntr);

            inst.selected.push(result.resultModel);
        });
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
        allowMultiples:     true,
        maxSearchResults:   50,
        webURL:             null,
        type:               'User',
        onPickUser:         null,
        onCreate:           null,
        onRemoveUser:       null,
        inputPlaceholder:   "Type and Pick",
        appendTo:           null,
        minLength:          3,
        showSelected:       true,
        resolvePrincipals:  true,
        meKeyword:          "[me]",
        meKeywordLabel:     "Current User",
        filterSuggestions:  null
    };

    return SPPeoplePicker;
});
