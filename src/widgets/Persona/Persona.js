define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "vendor/domutils/domClosest",
    "vendor/domutils/domAddClass",
    "vendor/domutils/domRemoveClass",

    "text!./Persona.html"
], function (
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    domClosest,
    domAddClass,
    domRemoveClass,

    PersonaTemplate
) {

    var
        PRIVATE = dataStore.create(),

        CSS_CLASS_MS_PERSONA    = 'ms-Persona',

        /**
         * Widget description
         *
         * @class Persona
         * @extends Widget
         *
         * @param {Object} options
         * @param {UserProfileModel} options.userProfile
         *
         * @fires Persona#click
         */
        Persona = {
            init: function (options) {
                var inst = {
                    opt:            objectExtend({}, Persona.defaults, options),
                    sizeModifier:    ""
                };

                PRIVATE.set(this, inst);

                this._model = inst.opt.userProfile;

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
            }
        };

    Persona = EventEmitter.extend(Widget, Persona);
    Persona.defaults = {
        userProfile: {}
    };

    return Persona;
});