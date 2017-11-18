import dataStore            from "common-micro-libs/src/jsutils/dataStore"
import Deferred             from "common-micro-libs/src/jsutils/Deferred"
import Promise              from "common-micro-libs/src/jsutils/es6-promise"
import ChoiceField          from "../ChoiceField/ChoiceField"
import getListContentTypes  from "../../spapi/getListContentTypes"

//=================================================================
const PRIVATE               = dataStore.create();
const ChoiceFieldPrototype  = ChoiceField.prototype;

/**
 * Widget picker for List content types. Note that the `value` of the selected
 * options will be the Content Type internal ID, which in order to be used
 * when a query, one would have to use the `ContentTypeId` field of the list.
 *
 * @class ContentTypeField
 * @extends ChoiceField
 */
export default ChoiceField.extend({
    init(options) {
        if (options && !options.choiceList) {
            options.choiceList = [];
        }
        ChoiceFieldPrototype.init.call(this, options);
        const deferred = Deferred.create();
        const state = {
            onReady: deferred.promise.then(() => this)
        };
        PRIVATE.set(this, state);

        ChoiceFieldPrototype.onReady.call(this)
            .then(() => getListContentTypes({listName: options.listName, webURL: options.webURL}))
            .then(contentTypes => {
                contentTypes.forEach(contentType => {
                    contentType.title = contentType.Name;
                    contentType.value = contentType.ID;
                });
                state.onReady = Promise.resolve(this);
                this.setChoices.call(this, contentTypes);
                deferred.resolve();
            });

        this.onDestroy(() => PRIVATE.delete(state));
    },

    onReady() {
        return PRIVATE.get(this).onReady;
    },

    setSelected(...vals) {
        return this.onReady().then(() => ChoiceFieldPrototype.setSelected.call(this, ...vals));
    }
});
