import Widget               from "common-micro-libs/src/jsutils/Widget"
import dataStore            from "common-micro-libs/src/jsutils/dataStore"
import objectExtend         from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate         from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML            from "common-micro-libs/src/jsutils/parseHTML"
import domRemoveClass       from "common-micro-libs/src/domutils/domRemoveClass"
import domAddClass          from "common-micro-libs/src/domutils/domAddClass"
import domToggleClass       from "common-micro-libs/src/domutils/domToggleClass"
import domAddEventHandler   from "common-micro-libs/src/domutils/domAddEventListener"

import MessageTemplate  from "./Message.html"
import "./Message.less";

const PRIVATE                           = dataStore.create();
const CSS_CLASS_MS_ICON                 = "ms-Icon";
const CSS_CLASS_MS_ICON_INFO            = CSS_CLASS_MS_ICON + "--Info";
const CSS_CLASS_MS_ICON_ALERT           = CSS_CLASS_MS_ICON + "--Warning";
const CSS_CLASS_MS_ICON_ERROR           = CSS_CLASS_MS_ICON + "--ErrorBadge";
const CSS_CLASS_MS_ICON_SUCCESS         = CSS_CLASS_MS_ICON + "--Completed";
const CSS_CLASS_PREFIX_MS_BG_COLOR      = "ms-bgColor-";
const CSS_CLASS_PREFIX_MS_FONT_COLOR    = "ms-fontColor-";
const CSS_CLASS_MESSAGE                 = "spwidgets-message";
const CSS_CLASS_MESSAGE_MSG             = `${ CSS_CLASS_MESSAGE }-msg`;
const CSS_CLASS_MESSAGE_MSG_HAS_MORE    = `${ CSS_CLASS_MESSAGE }--hasMore`;
const CSS_CLASS_MESSAGE_MSG_SHOW_MORE   = `${ CSS_CLASS_MESSAGE }--showMore`;

/**
 * Show a message to the user in a variety of types.
 *
 * @class Message
 * @extends Widget
 *
 * @param {Object} options
 *
 * @param {String} options.message
 *
 * @param {String} [options.extendedMessage=""]
 *  The extended message. This is initially hidden, but user will see a
 *  "..." on the screen. Clicking on it will show the extended message.
 *
 * @param {String} [options.type="info"]
 *  Type of message. valid values: `info`, `error`, `alert`, `success`
 *
 * @param {String} [options.iconClass]
 *  A css class to be applied to the icon element. If defined,
 *  the icon associated with `options.type` will be ignored.
 *
 */
const Message = Widget.extend(/** @lends Message.prototype */{
    init: function (options) {
        if (PRIVATE.has(this)) {
            return;
        }

        let opt = objectExtend({}, this.getFactory().defaults, options);
        let inst = {
            opt,
            iconClass: opt.iconClass,
            $icon: null
        };

        PRIVATE.set(this, inst);


        opt.type = opt.type.toLowerCase();

        if (!inst.iconClass) {
            inst.iconClass = getIconForMsgType(opt.type);
        }

        let $ui = this.$ui = parseHTML(fillTemplate(MessageTemplate, inst)).firstChild;

        inst.$icon = $ui.querySelector(".ms-Icon");

        inst.moreEv = domAddEventHandler($ui.querySelector(`.${ CSS_CLASS_MESSAGE_MSG }-showMore`), "click", () => {
            domToggleClass($ui, CSS_CLASS_MESSAGE_MSG_SHOW_MORE);
        });

        this.setType(opt.type);
        this.setExtendedMessage(opt.extendedMessage);

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
     * Sets the message
     *
     * @param {String} message
     */
    setMessage: function(message){
        this.getEle().querySelector(`.${ CSS_CLASS_MESSAGE_MSG }`).textContent = message;
    },

    /**
     * Sets the "more..." data of the message.
     *
     * @param {String} message
     */
    setExtendedMessage: function(message){
        let $ele = this.getEle();

        $ele.querySelector(`.${ CSS_CLASS_MESSAGE_MSG }-more`).textContent = message;

        if (message) {
            domAddClass($ele, `${ CSS_CLASS_MESSAGE_MSG_HAS_MORE }`);

        } else {
            domRemoveClass($ele, `${ CSS_CLASS_MESSAGE_MSG_HAS_MORE }`);
        }
    },

    /**
     * Changes the type of message to display
     *
     * @param {String} type
     *  Valid values: `info`, `error`, `alert`, `success`
     */
    setType: function(type){
        if (type) {
            type = type.toLowerCase();

            let $ele            = this.getEle();
            let inst            = PRIVATE.get(this);
            let {
                opt,
                $icon,
                iconClass }     = inst;

            domRemoveClass($ele, `${ CSS_CLASS_PREFIX_MS_BG_COLOR + opt.type }`);
            domRemoveClass($ele, `${ CSS_CLASS_PREFIX_MS_FONT_COLOR + opt.type }`);

            domAddClass($ele, `${ CSS_CLASS_PREFIX_MS_BG_COLOR + type }`);
            domAddClass($ele, `${ CSS_CLASS_PREFIX_MS_FONT_COLOR + type }`);

            // If user did not define a custom icon, then also change the
            // message icon.
            if (!opt.iconClass) {
                domRemoveClass($icon, iconClass);
                iconClass = inst.iconClass = getIconForMsgType(type);
                domAddClass($icon, iconClass);
            }

            opt.type = type;
        }
    }
});

function getIconForMsgType(type) {
    switch (type.toLowerCase()){
        case "error":
            return CSS_CLASS_MS_ICON_ERROR;
            break;

        case "alert":
            return CSS_CLASS_MS_ICON_ALERT;
            break;

        case "success":
            return CSS_CLASS_MS_ICON_SUCCESS;
            break;

        default:
            return CSS_CLASS_MS_ICON_INFO;
    }
}


Message.defaults = {
    message:            '',
    extendedMessage:    "",
    type:               'info',
    iconClass:          '',
    more:               '++'
};

export default Message;
