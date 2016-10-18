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


//----------------------------------------------------------------
var PRIVATE                 = dataStore.create();
var CSS_CLASS_MS_PERSONA    = 'ms-Persona';

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

        this._model = inst.opt.userProfile;
        inst.presenceModifier = inst.opt.presence || 'offline';

        this.$ui = parseHTML(
            fillTemplate(this.getTemplate(), inst.opt.userProfile)
        ).firstChild;

        // Find the persona element, which might not be the top element,
        // since this widget could have been extended and UI might be wrapped
        // in other elements (ex. people picker)
        inst.$persona = domClosest(
            this.$ui.querySelector("." + CSS_CLASS_MS_PERSONA + "-imageArea"),
            "." + CSS_CLASS_MS_PERSONA
        );

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
    }
};

Persona = EventEmitter.extend(Widget, Persona);
Persona.defaults = {
    userProfile: null,
    presence: 'offline'
};

export default Persona;
