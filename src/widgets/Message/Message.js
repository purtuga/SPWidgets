define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",

    "text!./Message.html",

    //-----------------------------
    "less!./Message"
], function (
    Widget,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,

    MessageTemplate
) {

    var
    PRIVATE = dataStore.create(),

    CSS_CLASS_MS_ICON           = "ms-Icon",
    CSS_CLASS_MS_ICON_INFO      = CSS_CLASS_MS_ICON + "--circleInfo",
    CSS_CLASS_MS_ICON_ALERT     = CSS_CLASS_MS_ICON + "--alertOutline",
    CSS_CLASS_MS_ICON_ERROR     = CSS_CLASS_MS_ICON + "--x",
    CSS_CLASS_MS_ICON_SUCCESS   = CSS_CLASS_MS_ICON + "--check",

    /**
     * Widget description
     *
     * @class Message
     * @extends Widget
     *
     * @param {Object} options
     *
     * @param {String} options.message
     *
     * @param {String} [options.type="info"]
     *  Type of message. valid values: `info`, `error`, `alert`, `success`
     *
     * @param {String} [options.iconClass]
     *  A css class to be applied to the icon element. If defined,
     *  the icon associated with `options.type` will be ignored.
     *
     */
    Message = /** @lends Message.prototype */{
        init: function (options) {
            var inst = {
                opt: objectExtend({}, Message.defaults, options)
            };

            PRIVATE.set(this, inst);

            var opt = inst.opt;

            opt.type = opt.type.toLowerCase();

            if (!opt.iconClass) {
                switch (opt.type){
                    case "error":
                        opt.iconClass = CSS_CLASS_MS_ICON_ERROR;
                        break;

                    case "alert":
                        opt.iconClass = CSS_CLASS_MS_ICON_ALERT;
                        break;

                    case "success":
                        opt.iconClass = CSS_CLASS_MS_ICON_SUCCESS;
                        break;

                    default:
                        opt.iconClass = CSS_CLASS_MS_ICON_INFO;
                }
            }

            this.$ui = parseHTML(
                fillTemplate(MessageTemplate, inst.opt)
            ).firstChild;

            this.onDestroy(function () {
                PRIVATE.delete(this);
            }.bind(this));
        }
    };

    Message = Widget.extend(Message);
    Message.defaults = {
        message:    '',
        type:       'info',
        iconClass:  ''
    };

    return Message;
});