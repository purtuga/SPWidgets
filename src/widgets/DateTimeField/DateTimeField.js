import Widget               from "common-micro-libs/src/jsutils/Widget"
import EventEmitter         from "common-micro-libs/src/jsutils/EventEmitter"
import dataStore            from "common-micro-libs/src/jsutils/dataStore"
import objectExtend         from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate         from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML            from "common-micro-libs/src/jsutils/parseHTML"
import domAddClass          from "common-micro-libs/src/domutils/domAddClass"
import domAddEventListener  from "common-micro-libs/src/domutils/domAddEventListener"

import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"

import DateTimeFieldTemplate from "./DateTimeField.html";
import "./DateTimeField.less";

//--------------------------------------------------------
var PRIVATE = dataStore.create();
var WINDOW_NAVIGATOR    = window.navigator;
var CSS_BASE_CLASS      = 'spwidgets-DateTimeField';

/**
 * A SharePoint DateTime field.
 *
 * @class DateTimeField
 * @extends Widget
 * @extends EventEmitter
 *
 * @param {Object} options
 *
 * @param {Object|ListColumnModel} options.column
 *  the column definition. `DisplayName`, `Description` and
 *  `Format` all have an impact on the widget.
 *
 * @param {String} [options.dateFormat='F j, Y']
 *  Format of the date when no time is allowed.
 *  For information on what token can be used see
 *  [flatpickr widget]{@link https://chmln.github.io/flatpickr/#dateformat}
 *
 * @param {String} [options.dateTimeFormat='F j, Y h:i:S K']
 *  Format of the date and time.
 *  For information on what token can be used see
 *  [flatpickr widget]{@link https://chmln.github.io/flatpickr/#dateformat}
 *
 * @fires DateTimeField#change
 */
var DateTimeField = /** @lends DateTimeField.prototype */{
    init: function (options) {
        var
        inst = {
            opt: objectExtend({}, this.getFactory().defaults, options)
        },
        opt     = inst.opt,
        column  = opt.column || {};

        PRIVATE.set(this, inst);

        var $ui = this.$ui = parseHTML(
            fillTemplate(this.getTemplate(), inst.opt)
        ).firstChild;

        var uiFind          = this.$ui.querySelector.bind($ui);
        var BASE_SELECTOR   = "." + CSS_BASE_CLASS;

        inst.isDateOnly = column.Format === "DateOnly";

        if (opt.hideLabel) {
            domAddClass($ui, CSS_BASE_CLASS + "--noLabel");
        }

        if (opt.hideDescription) {
            domAddClass($ui, CSS_BASE_CLASS + "--noDescription");
        }

        if (opt.inline) {
            domAddClass($ui, CSS_BASE_CLASS + "--inlinePicker");
        }

        opt.lang    = opt.lang || String(WINDOW_NAVIGATOR.language || WINDOW_NAVIGATOR.userLanguage || "en-US");
        opt.labels  = opt.i18n[opt.lang] || opt.i18n["en-US"];

        var dateWdg = inst.dateWdg = flatpickr(uiFind("input"), {
            dateFormat: inst.isDateOnly ? opt.dateFormat : opt.dateTimeFormat,
            enableTime: !inst.isDateOnly,
            inline:     opt.inline,
            prevArrow:  '<i class="ms-Icon ms-Icon--ChevronLeft" />',
            nextArrow:  '<i class="ms-Icon ms-Icon--ChevronRight" />',
            onChange:   function(dtObj, dtStr){
                /**
                 * Date and/or time was changed
                 *
                 * @event DateTimeField#change
                 *
                 * @type Object
                 * @property {Date} dateObj
                 * @property {String} formattedDate
                 */
                this.emit("change", {
                    dateObj:        dtObj,
                    formattedDate:  dtStr
                });
            }.bind(this)
        });

        domAddEventListener(uiFind(BASE_SELECTOR + "-calIcon"),   "click", dateWdg.toggle.bind(dateWdg));
        domAddEventListener(uiFind(BASE_SELECTOR + "-clearIcon"), "click", dateWdg.clear.bind(dateWdg));

        this.onDestroy(function () {
            // Destroy all Compose object
            Object.keys(inst).forEach(function(prop){
                if (inst[prop]) {
                    // Widgets
                    if (inst[prop].destroy) {
                        inst[prop].destroy();

                        // DOM events
                    } else if (inst[prop].remove) {
                        inst[prop].remove();

                        // EventEmitter events
                    } else if (inst[prop].off) {
                        inst[prop].off();
                    }

                    inst[prop] = undefined;
                }
            });
            PRIVATE.delete(this);
        }.bind(this));
    },

    getTemplate() {
        return DateTimeFieldTemplate;
    },

    /**
     * Returns an object containing information about the date
     * selected by the user.
     *
     * @return {Object|undefined}
     *
     * @example
     *
     * // returned object format
     *
     * {
     *      dateObj: Date()
     *      formattedDate: 'date displayed to user'
     * }
     */
    getValue: function(){
        var dateWdg = PRIVATE.get(this).dateWdg,
            dateObj = dateWdg.selectedDateObj;

        if (!dateObj) {
            return;
        }

        return {
            dateObj:        dateObj,
            formattedDate:  dateWdg.input.value
        };
    },

    /**
     * Sets the date on the widget
     *
     * @param {String|Date} date
     *  The date to set on the widget. If a `String` is defined, it
     *  must be one that `Date.parse()` can handle
     *  ([more]{@link http://devdocs.io/javascript/global_objects/date/parse})
     *
     * @see http://devdocs.io/javascript/global_objects/date/parse
     */
    setValue: function(date){
        if (!date) {
            return;
        }

        if (typeof date === "string") {
            date = new Date(Date.parse(date));
        }

        if (date instanceof Date) {
            PRIVATE.get(this).dateWdg.setDate(date);
        }
    }
};

DateTimeField = EventEmitter.extend(Widget, DateTimeField);
DateTimeField.defaults = {
    column:             null,
    dateFormat:         "F j, Y",
    dateTimeFormat:     "F j, Y h:i:S K",
    hideLabel:          false,
    hideDescription:    false,

    inline:             false,
    allowMultiples:     false,          // FIXME: implement

    i18n: {
        'en-US': {
            placeholder: "Click to select..."
        }
    }
};

export default DateTimeField;

// SP List DATE field definition
//-------------------------------------
//<Field Type="DateTime"
//      ID="{cd21b4c2-6841-4f9e-a23a-738a65f99889}"
//      Name="DueDate"
//      DisplayName="Due Date"
//      Format="DateOnly"
//      FriendlyDisplayFormat="Relative"
//      SourceID="http://schemas.microsoft.com/sharepoint/v3"
//      StaticName="DueDate"
//      ColName="datetime2"
//      Required="FALSE"
//      EnforceUniqueValues="FALSE"
//      Indexed="FALSE"
//      CalType="0"
//      Version="2"
//      RowOrdinal="0"/>

