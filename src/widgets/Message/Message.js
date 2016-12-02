import Widget from "vendor/jsutils/Widget";
import dataStore from "vendor/jsutils/dataStore";
import objectExtend from "vendor/jsutils/objectExtend";
import fillTemplate from "vendor/jsutils/fillTemplate";
import parseHTML from "vendor/jsutils/parseHTML";
import MessageTemplate from "./Message.html";
import "./Message.less";

    var
    PRIVATE = dataStore.create(),

    CSS_CLASS_MS_ICON           = "ms-Icon",
    CSS_CLASS_MS_ICON_INFO      = CSS_CLASS_MS_ICON + "--Info",
    CSS_CLASS_MS_ICON_ALERT     = CSS_CLASS_MS_ICON + "--Warning",
    CSS_CLASS_MS_ICON_ERROR     = CSS_CLASS_MS_ICON + "--ErrorBadge",
    CSS_CLASS_MS_ICON_SUCCESS   = CSS_CLASS_MS_ICON + "--Completed",

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
                opt: objectExtend({}, this.getFactory().defaults, options)
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

    export default Message;
