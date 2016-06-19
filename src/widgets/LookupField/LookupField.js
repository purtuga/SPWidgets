define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "vendor/domutils/domAddClass",

    "text!./LookupField.html",
    //-------------------------------
    "less!./LookupField.less"
], function (
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    domAddClass,

    LookupFieldTemplate
) {

    var
    PRIVATE = dataStore.create(),

    CSS_CLASS_BASE              = 'spwidgets-LookupField',
    CSS_CLASS_NO_LABEL          = CSS_CLASS_BASE + "--noLabel",
    CSS_CLASS_NO_DESCRIPTION    = CSS_CLASS_BASE + "--noDescription",

    /**
     * A Lookup field. Supports either Single lookup or Multi Lookup
     * fields.
     *
     * @class LookupField
     * @extends Widget
     * @extends EventEmitter
     *
     * @param {Object} options
     */
    LookupField = /** @lends LookupField.prototype */{
        init: function (options) {
            var inst = {
                opt: objectExtend({}, LookupField.defaults, options)
            };

            PRIVATE.set(this, inst);

            var
            opt = inst.opt,
            $ui = this.$ui = parseHTML(
                fillTemplate(LookupFieldTemplate, opt)
            ).firstChild;

            if (opt.hideLabel) {
                domAddClass($ui, CSS_CLASS_NO_LABEL);
            }

            if (opt.hideDescription) {
                domAddClass($ui, CSS_CLASS_NO_DESCRIPTION);
            }

            this.onDestroy(function () {
                PRIVATE.delete(this);
            }.bind(this));
        }
    };

    LookupField = EventEmitter.extend(Widget, LookupField);
    LookupField.defaults = {
        column:             {},
        hideLabel:          false,
        hideDescription:    false
    };

    return LookupField;
});