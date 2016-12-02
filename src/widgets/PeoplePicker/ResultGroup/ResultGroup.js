import Widget               from "common-micro-libs/src/jsutils/Widget"
import EventEmitter         from "common-micro-libs/src/jsutils/EventEmitter"
import dataStore            from "common-micro-libs/src/jsutils/dataStore"
import objectExtend         from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate         from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML            from "common-micro-libs/src/jsutils/parseHTML"
import domAddEventListener  from "common-micro-libs/src/domutils/domAddEventListener"
import domClosest           from "common-micro-libs/src/domutils/domClosest"
import domFind              from "common-micro-libs/src/domutils/domFind"
import domHasClass          from "common-micro-libs/src/domutils/domHasClass"
import domAddClass          from "common-micro-libs/src/domutils/domAddClass"
import domRemoveClass       from "common-micro-libs/src/domutils/domRemoveClass"
import domTriggerEvent      from "common-micro-libs/src/domutils/domTriggerEvent"

import Result               from "../Result/Result"
import ResultGroupTemplate  from "./ResultGroup.html"


//=============================================================================

// FIXME: convert to use DomKeyboardInteraction

const PRIVATE = dataStore.create();

const CSS_CLASS_MS_PICKER_BASE           = "ms-PeoplePicker";
const CSS_CLASS_MS_PICKER_RESULT_LIST    = CSS_CLASS_MS_PICKER_BASE + "-resultList";

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
let ResultGroup = /** @lends ResultGroup */{
    init: function (options) {
        var inst = {
            opt:            objectExtend({}, this.getFactory().defaults, options),
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

        resultItems.some(function(resultWdg, index){
            if (resultWdg.hasFocus()) {
                selectedWdgIndex    = index;
                selectedWdg         = resultWdg;
                return true;
            }
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

        resultItems.some(function(resultWdg, index){
            if (resultWdg.hasFocus()) {
                selectedWdgIndex    = index;
                selectedWdg         = resultWdg;
                return true;
            }
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
            resultItems     = inst.resultItems;

        resultItems.some(function(resultWdg){
            if (resultWdg.hasFocus()) {
                resultWdg.emit("click");
                return true;
            }
        });
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
            var resultInst = inst.opt.ResultWidget.create({ userProfile: userProfile });

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
    results:    [],
    ResultWidget: Result
};

export default ResultGroup;
