define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "vendor/domutils/domAddEventListener",
    "vendor/domutils/domClosest",
    "vendor/domutils/domFind",
    "vendor/domutils/domHasClass",
    "vendor/domutils/domAddClass",
    "vendor/domutils/domRemoveClass",
    "vendor/domutils/domTriggerEvent",

    "text!./ResultGroup.html",
    "text!./Result.html"
], function (
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    domAddEventListener,
    domClosest,
    domFind,
    domHasClass,
    domAddClass,
    domRemoveClass,
    domTriggerEvent,

    ResultGroupTemplate,
    ResultTemplate
) {

    var
    PRIVATE = dataStore.create(),

    CSS_CLASS_PERSONA       = "ms-Persona",
        
    CSS_CLASS_PICKER_BASE           = "ms-PeoplePicker",
    CSS_CLASS_PICKER_RESULT_LIST    = CSS_CLASS_PICKER_BASE + "-resultList",
    CSS_CLASS_PICKER_RESULT         = CSS_CLASS_PICKER_BASE + "-result",
    CSS_CLASS_PICKER_RESULT_FOCUS   = CSS_CLASS_PICKER_RESULT + "--focus",

    /**
     * Widget description
     *
     * @class ResultGroup
     * @extends Widget
     * @extends EventEmitter
     *
     * @params {Object} options
     * @params {Array<Object>} options.results
     * @params {String} [options.groupTitle="Search Results"]
     *
     * @fires ResultGroup#result-click
     */
    ResultGroup = {
        init: function (options) {
            var inst = {
                opt: objectExtend({}, ResultGroup.defaults, options),
                uiFind: null,
                $resultList: null
            };

            PRIVATE.set(this, inst);

            var $ui = this.$ui = parseHTML(
                fillTemplate(ResultGroupTemplate, {
                    groupTitle: inst.opt.groupTitle,
                    results:    inst.opt.results.map(function(result){
                        return fillTemplate(ResultTemplate, result);
                    }).join("")
                })
            ).firstChild;

            inst.uiFind         = $ui.querySelector.bind($ui);
            inst.$resultList    = inst.uiFind("." + CSS_CLASS_PICKER_RESULT_LIST);

            domAddEventListener($ui, "click", function(ev){
                var resultEle = domClosest(ev.target, "." + CSS_CLASS_PICKER_RESULT);

                if (resultEle) {
                    notifyResultClicked.call(this, resultEle);
                }
            }.bind(this));
        },

        /**
         * Sets focus on the next result item
         */
        focusNext: function(){
            var inst            = PRIVATE.get(this),
                $resultList     = inst.$resultList,
                resultElements  = domFind($resultList, "." + CSS_CLASS_PICKER_RESULT),
                setFocusClassOnEle  = function(ele){
                    domAddClass(ele, CSS_CLASS_PICKER_RESULT_FOCUS);
                },
                selectedEle;

            if (!resultElements.length) {
                return;
            }

            selectedEle = resultElements.find(function(resultEle){
                return domHasClass(resultEle, CSS_CLASS_PICKER_RESULT_FOCUS);
            });

            // Nothing selected? - set first item
            if (!selectedEle) {
                setFocusClassOnEle(resultElements[0]);
                return;
            }

            domRemoveClass(selectedEle, CSS_CLASS_PICKER_RESULT_FOCUS);

            if (!selectedEle.nextSibling) {
                setFocusClassOnEle(resultElements[0]);
                return;
            }

            setFocusClassOnEle(selectedEle.nextSibling);
        },

        /**
         * Sets focus on previous result item
         */
        focusPrevious: function(){
            var inst            = PRIVATE.get(this),
                $resultList     = inst.$resultList,
                resultElements  = domFind($resultList, "." + CSS_CLASS_PICKER_RESULT),
                lastIndex       = resultElements.length - 1,
                setFocusClassOnEle  = function(ele){
                    domAddClass(ele, CSS_CLASS_PICKER_RESULT_FOCUS);
                },
                selectedEle;

            if (!resultElements.length) {
                return;
            }

            selectedEle = resultElements.find(function(resultEle){
                return domHasClass(resultEle, CSS_CLASS_PICKER_RESULT_FOCUS);
            });

            // Nothing selected? - set first item
            if (!selectedEle) {
                setFocusClassOnEle(resultElements[lastIndex]);
                return;
            }

            domRemoveClass(selectedEle, CSS_CLASS_PICKER_RESULT_FOCUS);

            if (!selectedEle.previousSibling) {
                setFocusClassOnEle(resultElements[lastIndex]);
                return;
            }

            setFocusClassOnEle(selectedEle.previousSibling);
        },

        /**
         * Selects current result item by emitting a click
         * event on it and thus triggering associated widget events.
         */
        selectCurrent: function(){
            var inst            = PRIVATE.get(this),
                $resultList     = inst.$resultList,
                selectedEle     = domFind($resultList, "." + CSS_CLASS_PICKER_RESULT_FOCUS)[0];

            if (selectedEle) {
                notifyResultClicked.call(this, selectedEle);
            }
        }
    };

    /**
     * Emits an event on the widget indicating that a search result was clicked.
     *
     * @private
     *
     * @param resultEle
     */
    function notifyResultClicked(resultEle) {
        var inst        = PRIVATE.get(this),
            personaEle  = domFind(resultEle, "." + CSS_CLASS_PERSONA)[0],
            personID    = personaEle.getAttribute("data-sp_id"),
            personModel;

        inst.opt.results.some(function(person){
            if (person.ID === personID) {
                personModel = person;
                return true;
            }
        });

        /**
         * One of the suggestions in the people picker was
         * clicked
         *
         * @event ResultGroup#result-click
         *
         * @type {Object}
         *
         * @property {HTMLElement} resultEle
         * @property {{UserProfileModel}} resultModel
         */
        this.emit("result-click", {
            resultEle:      resultEle,
            personaEle:     personaEle,
            resultModel:    personModel
        });
    }

    ResultGroup = EventEmitter.extend(Widget, ResultGroup);
    ResultGroup.defaults = {
        groupTitle: "Search Results"
    };

    return ResultGroup;
});