import Widget       from "common-micro-libs/src/jsutils/Widget"
import dataStore    from "common-micro-libs/src/jsutils/dataStore"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML    from "common-micro-libs/src/jsutils/parseHTML"

import PersonaCardActionDetailsTemplate from "./PersonaCardActionDetails.html"
import detailLineTemplate               from "./detailLine.html"

//==========================================================================
const PRIVATE = dataStore.create();


/**
 * PersonaCardActionDetails Widget Display the content of an action when the
 * user clicks on it.
 *
 * @class PersonaCardActionDetails
 * @extends Widget
 *
 * @param {Object} options
 * @param {Array<Object>} options.details
 *  Each Detail object can have the following properties:
 *
 *  -   `label`: The label for the value
 *  -   `value`: the value for detail item. Could be a string of HTML
 *
 */
const PersonaCardActionDetails = Widget.extend(/** @lends PersonaCardActionDetails.prototype */{
    init(options) {
        var inst = {
            opt: objectExtend({}, this.getFactory().defaults, options)
        };

        PRIVATE.set(this, inst);

        let $ui = this.$ui = this.getTemplate();

        if (typeof $ui === "string") {
            $ui = this.$ui = parseHTML(fillTemplate($ui, {
                detailsHTML: fillTemplate(this.getDetailLineTemplate(), inst.opt.details)
            })).firstChild;
        }


        this.onDestroy(() => {
            // Destroy all Compose object
            Object.keys(inst).forEach(function (prop) {
                if (inst[prop]) {
                    [
                        "destroy",      // Compose
                        "remove",       // DOM Events Listeners
                        "off"           // EventEmitter Listeners
                    ].some((method) => {
                        if (inst[prop][method]) {
                            inst[prop][method]();
                            return true;
                        }
                    });

                    inst[prop] = undefined;
                }
            });

            PRIVATE['delete'](this);
        });
    },

    /**
     * returns the widget's template
     * @return {String}
     */
    getTemplate(){
        return PersonaCardActionDetailsTemplate;
    },

    /**
     * Returns the HTML template for an insividual item
     *
     * @return {String}
     */
    getDetailLineTemplate(){
        return detailLineTemplate;
    }
});

PersonaCardActionDetails.defaults = {
    details: null           // Array<Object>
};

export default PersonaCardActionDetails;
