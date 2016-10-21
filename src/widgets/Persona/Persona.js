import Widget           from "vendor/jsutils/Widget";
import EventEmitter     from "vendor/jsutils/EventEmitter";
import dataStore        from "vendor/jsutils/dataStore";
import objectExtend     from "vendor/jsutils/objectExtend";
import fillTemplate     from "vendor/jsutils/fillTemplate";
import parseHTML        from "vendor/jsutils/parseHTML";
import domClosest       from "vendor/domutils/domClosest";
import domAddClass      from "vendor/domutils/domAddClass";
import domRemoveClass   from "vendor/domutils/domRemoveClass";

import PersonaTemplate  from "./Persona.html";
import "./Persona.less";


//----------------------------------------------------------------
var PRIVATE                 = dataStore.create();
var CSS_CLASS_BASE          = 'spwidgets-Persona';
var CSS_CLASS_MS_PERSONA    = 'ms-Persona';
var CSS_CLASS_NO_DETAILS    = `${CSS_CLASS_BASE}--noDetails`;

/**
 * Widget description
 *
 * @class Persona
 * @extends Widget
 *
 * @param {Object} options
 * @param {UserProfileModel} options.userProfile
 * @param {String} [options.presence='offline']
 *
 * @fires Persona#click
 */
var Persona = {
    init: function (options) {
        var inst = {
            opt:            objectExtend({}, Persona.defaults, options),
            sizeModifier:    "",
            presenceModifier:""
        };

        PRIVATE.set(this, inst);

        let opt = inst.opt;

        this._model = opt.userProfile;
        inst.presenceModifier = opt.presence || 'offline';

        this.$ui = parseHTML(
            fillTemplate(this.getTemplate(), opt.userProfile)
        ).firstChild;

        // Find the persona element, which might not be the top element,
        // since this widget could have been extended and UI might be wrapped
        // in other elements (ex. people picker)
        inst.$persona = domClosest(
            this.$ui.querySelector("." + CSS_CLASS_MS_PERSONA + "-imageArea"),
            "." + CSS_CLASS_MS_PERSONA
        );

        if (opt.size) {
            this.setSize(opt.size);
        }

        if (opt.hideDetails) {
            this.hideDetails();
        }

        this.$ui.addEventListener("click", function(){
            /**
             * Persona Element was clicked on by user
             *
             * @event Persona#click
             */
            this.emit("click");
        }.bind(this));

        this.onDestroy(function(){
            PRIVATE['delete'](this);
        }.bind(this));
    },

    /**
     * Get the HTML template for the widget.
     *
     * @returns {String}
     */
    getTemplate: function(){
        return PersonaTemplate;
    },

    /**
     * Returns the user profile this instance of the persona widget.
     *
     * @returns {UserProfileModel}
     */
    getUserProfile: function(){
        return this._model;
    },

    /**
     * Sets the size of the widget.
     *
     * @param {String} size
     *  Valid value are: `tiny`, `xs`, `sm`, `lg`, `xl`
     */
    setSize: function(size){
        if (!size) {
            return;
        }

        var inst            = PRIVATE.get(this),
            $persona        = inst.$persona,
            cssClassName    = CSS_CLASS_MS_PERSONA + "--" + size.toLowerCase();

        if (inst.sizeModifier) {
            domRemoveClass($persona, inst.sizeModifier);
        }

        inst.sizeModifier = cssClassName;
        domAddClass($persona, cssClassName);
    },

    /**
     * Sets the presence of the Persona.
     *
     * @param {String} state
     *  The state to set on the Persona. Possible values are:
     *  `available`, `away`, `blocked`, `busy`,
     *  `dnd` (do not disturb) and `offline`
     */
    setPresence: function(state){
        var inst = PRIVATE.get(this),
            $ui = this.getEle();

        if (inst.presenceModifier) {
            domRemoveClass($ui, CSS_CLASS_MS_PERSONA + "--" + inst.presenceModifier);
            inst.presenceModifier = "";
        }

        if (state) {
            state = String(state).toLowerCase();
            domAddClass($ui, CSS_CLASS_MS_PERSONA + "--" + state);
            inst.presenceModifier = state;
        }
    },

    /**
     * Hides the details (show image only)
     */
    hideDetails: function(){
        showHideDetails.call(this, true);
    },

    /**
     * Shows the details
     */
    showDetails: function(){
        showHideDetails.call(this)
    }
};

/**
 * Show or hides the details area based on the input param
 *
 * @param {Boolean} hide
 */
function showHideDetails(hide) {
    let $ui = this.getEle();

    if (hide) {
        domAddClass($ui, CSS_CLASS_NO_DETAILS);
    } else {
        domRemoveClass($ui, CSS_CLASS_NO_DETAILS);
    }
}

Persona = EventEmitter.extend(Widget, Persona);
Persona.defaults = {
    userProfile:    null,
    presence:       'offline',
    size:           null,
    hideDetails:    false
};

export default Persona;
