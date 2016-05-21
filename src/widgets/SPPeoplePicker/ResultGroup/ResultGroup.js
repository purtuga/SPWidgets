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

    "../Result/Result",

    "text!./ResultGroup.html"
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

    Result,

    ResultGroupTemplate
) {

    var
    PRIVATE = dataStore.create(),

    CSS_CLASS_MS_PICKER_BASE           = "ms-PeoplePicker",
    CSS_CLASS_MS_PICKER_RESULT_LIST    = CSS_CLASS_MS_PICKER_BASE + "-resultList",

    /**
     * Widget description
     *
     * @class ResultGroup
     * @extends Widget
     * @extends EventEmitter
     *
     * @params {Object} options
     * @params {Array<PeoplePickerUserProfileModel>} options.results
     * @params {String} [options.groupTitle="Search Results"]
     *
     * @fires ResultGroup#result-click
     */
    ResultGroup = {
        init: function (options) {
            var inst = {
                opt:            objectExtend({}, ResultGroup.defaults, options),
                uiFind:         null,
                $resultList:    null,
                resultItems:    []
            };

            PRIVATE.set(this, inst);

            var $ui = this.$ui = parseHTML(
                fillTemplate(ResultGroupTemplate, {groupTitle: inst.opt.groupTitle})
            ).firstChild;

            inst.uiFind         = $ui.querySelector.bind($ui);
            inst.$resultList    = inst.uiFind("." + CSS_CLASS_MS_PICKER_RESULT_LIST);

            setResultsToGroup.call(this);

            this.onDestroy(function(){
                inst.resultItems.forEach(function(wdg){
                    wdg.destroy();
                });
                inst.uiFind         = undefined;
                inst.$resultList    = undefined;
                PRIVATE['delete'](this);
            }.bind(this));
        },

        /**
         * Sets focus on the next result item
         */
        focusNext: function(){
            var inst            = PRIVATE.get(this),
                resultItems     = inst.resultItems,
                selectedWdg, selectedWdgIndex;

            if (!resultItems.length) {
                return;
            }

            selectedWdg = resultItems.find(function(resultWdg, index){
                selectedWdgIndex = index;
                return resultWdg.hasFocus();
            });

            // Nothing selected? - set first item
            if (!selectedWdg) {
                resultItems[0].setFocus();
                return;
            }

            selectedWdg.removeFocus();

            // If currently in the last item, select the first one again
            if (selectedWdgIndex === (resultItems.length - 1)) {
                resultItems[0].setFocus();
                return;
            }

            resultItems[selectedWdgIndex + 1].setFocus();
        },

        /**
         * Sets focus on previous result item
         */
        focusPrevious: function(){
            var inst            = PRIVATE.get(this),
                resultItems     = inst.resultItems,
                lastIndex       = resultItems.length - 1,
                selectedWdg, selectedWdgIndex;

            if (!resultItems.length) {
                return;
            }

            selectedWdg = resultItems.find(function(resultWdg, index){
                selectedWdgIndex = index;
                return resultWdg.hasFocus();
            });

            // Nothing selected? - set last item
            if (!selectedWdg) {
                resultItems[lastIndex].setFocus();
                return;
            }

            selectedWdg.removeFocus();

            // If currently in the first item, select the last one again
            if (selectedWdgIndex === 0) {
                resultItems[lastIndex].setFocus();
                return;
            }

            resultItems[selectedWdgIndex - 1].setFocus();
        },

        /**
         * Selects current result item by emitting a click
         * event on it and thus triggering associated widget events.
         */
        selectCurrent: function(){
            var inst            = PRIVATE.get(this),
                resultItems     = inst.resultItems,
                selectedWdg     = resultItems.find(function(resultWdg){
                    return resultWdg.hasFocus();
                });

            if (selectedWdg) {
                selectedWdg.emit("click");
            }
        }
    };

    /**
     * Builds the widgets for each result and adds them to the list
     * @private
     */
    function setResultsToGroup(){
        var inst            = PRIVATE.get(this),
            resultItems     = inst.resultItems,
            listHolderEle   = inst.$resultList,
            removeFromResults = function(resultInst){
                var index;
                resultItems.some(function(wdg, i){
                    if (wdg === resultInst) {
                        index  = i;
                        return true;
                    }
                });

                if (typeof index !== "undefined") {
                    resultItems.splice(index, 1);
                }
            };

        // Destroy existing - if any
        resultItems.forEach(function(resultWdg){
            resultWdg.destroy();
        });
        resultItems.splice(0);

        resultItems.push.apply(resultItems,
            inst.opt.results.map(function(userProfile){
                var resultInst = Result.create({ userProfile: userProfile });

                resultInst.appendTo(listHolderEle);
                resultInst.pipe(this, "result-");

                resultInst.onDestroy(function(){
                    removeFromResults(resultInst);
                });

                return resultInst;
            }.bind(this))
        );
    }


    ResultGroup = EventEmitter.extend(Widget, ResultGroup);
    ResultGroup.defaults = {
        groupTitle: "Search Results",
        results:    []
    };

    return ResultGroup;
});