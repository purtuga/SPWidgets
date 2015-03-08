define([
    'jquery',
    'text!./dateField.html',
    '../sputils/fillTemplate',
    '../sputils/getDateString',
    '../sputils/parseDateString',
    '../uiutils/makeSameHeight',
    //--------------------------------
    'less!./dateField.less'
], function(
    $,
    dateFieldTemplate,
    fillTemplate,
    getDateString,
    parseDateString,
    makeSameHeight
){


    var SPDate = {},
        dateField;

    /** @property {Boolean} Is initialization done */
    SPDate.isInitDone = false;

    /** @property {String} Event namespace */
    SPDate.evNamespace = '.spwidgets.spdatefield';

    /**
     * Default options.
     * @member Inst.opt
     * @memberOf Inst.opt
     */
    SPDate.defaults = {
        allowMultiples: false,
        delimeter:      ";",
        remainOpen:     true,
        datepicker:     {
            dateFormat:         'mm/dd/yy',
            buttonImage:        '/_layouts/images/CALENDAR.GIF',
            showOn:             "both",
            buttonImageOnly:    true
        },
        dateTemplate:   '{{date}} <span class="spwidgets-item-remove">[x]</span>',
        showTimepicker: false,
        timeFormat:     ' {{hour}}:{{minutes}} {{ampm}}',
        timeUTC:        true,
        labelHour:      'Hour',
        labelMinutes:   'Minutes',
        labelAMPM:      'AM|PM',
        labelTime:      'Time',
        labelSet:       'Set',
        onSelect:       null
    };


    /**
     * Inserts a jQuery datepicker into the UI that allows the user to
     * pick a date and save the Sharepoint format of that date to the
     * original input field that this widget was bound to.
     * Display format could be defined as the local locale while the
     * value that will actually be stored in the input value will be
     * the format expected by SharePoint webservices mainly ISO format
     * YYYY-MM-DD.
     *
     * @param {HTMLElement|jQuery|Selector} containers
     *      The elements that will have dateFields add to them.
     *
     * @param {Object} [options]
     *
     * @param {Boolean} [options.allowMultiples=false]
     * @param {String} [options.delimeter=";"]
     * @param {Boolean} [options.remainOpen=true]
     * @param {Object} [options.datepicker={...}]
     * @param {String} [options.dateTemplate=""]
     * @param {Boolean} [options.showTimepicker=false]
     * @param {String} [options.timeFormat='{{our}}:{{minutes}} {{ampm}}']
     * @param {Boolean} [options.timeUTC=true]
     * @param {String} [options.labelHour='Hour']
     * @param {String} [options.labelMinutes='Minutes']
     * @param {String} [options.labelAMPM='AM|PM']
     * @param {String} [options.labelTime='Time']
     * @param {String} [options.labelSet='Set']
     * @param {Function} [options.onSelect=null]
     *
     * return {jQuery} this
     *
     * This widget supports the following methods:
     *
     * $().SPDateField("reset");
     * $().SPDateField("getDate");
     * $().SPDateField("setDate", dates[], "format");
     * $().SPDateField("removeDate", dates[], "format");
     * $().SPDateField("destroy");
     *
     */
    dateField = function dateField(containers, options){

        var arg         = Array.prototype.slice.call(arguments, 1),
            inputEle    = containers;

        // If initialization is not yet done, then do it now
        if ( !SPDate.isInitDone ) {

            SPDate.isInitDone = true;
            $("body").on("click" + SPDate.evNamespace, SPDate.onPageClick);

        }

        // Process Methods
        if (typeof options === "string") {

            return (function(){

                var action  = String(arg[0]).toLowerCase(),
                    resp    = inputEle;

                // Loop through all inputs and process the method
                // on it. Note that for methods that return data
                // if user defined more than one element in the
                // selection, only the data for the last item on
                // that selection will be returned.
                $(inputEle).each(function(i, thisInput){

                    if (!$(inputEle).hasClass("hasSPDateField")) {

                        return;

                    }

                    var $this   = $(thisInput),
                        Inst    = $this.data("SPDateFieldInstance");

                    if (Inst && $this.length > 0) {

                        switch(action) {

                            //------> GET DATE METHOD: dateObj = $().SPDateField("getDate")
                            case "getdate":

                                resp = Inst.getDate();

                                break;

                            //------> SET DATE METHOD: $().SPDateField("setDate", dates, format)
                            case "setdate":

                                if (arg[1]) {

                                    Inst.setDate({
                                        date:   arg[1],
                                        format: (arg[2] || Inst.opt.datepicker.dateFormat)
                                    });

                                }

                                break;

                            //------> REMOVE DATE METHOD: $().SPDateField("removeDate", dates, format)
                            case "removedate":

                                if (arg[1]) {

                                    Inst.removeDate({
                                        date:   arg[1],
                                        format: (arg[2] || Inst.opt.datepicker.dateFormat)
                                    });

                                }

                                break;

                            //------> RESET METHOD: $().SPDateField("reset")
                            case "reset":

                                Inst.reset();

                                break;

                            //------> DESTROY METHOD: $().SPDateField("destroy")
                            case "destroy":

                                Inst.destroy();

                                break;

                        } //end: switch()

                    }

                });

                return resp;

            })();

        } //end: Method? ---------------------------

        // BUILD the widget on each input element
        // provided by the user's selection
        return containers.each(function(){

           /**
            * @class SPDate
            */
            var Inst = {

                /** @property {jQuery} The input element used by the user */
                $ele: $(this).addClass("hasSPDateField"),

                /** @property {Boolean} Is this an inline binding? */
                isInline: false,

                /** @property {jQuery} the inline container that was given by the user */
                inlineCntr: null

            };

            // If not an input text field, then check if it is a non-input element,
            // which will cause this widget to be inserted inline always visible
            // widget.
            if (!Inst.$ele.is("input[type='text']")) {

                if (!Inst.$ele.is(":input")) {

                    Inst.isInline   = true;
                    Inst.inlineCntr = $(this);
                    Inst.$ele       = $('<input name="spdatefieldinline" value="" type="text" style="display:none" />');

                } else {

                    return this;

                }

            }

            /**
             * @property {Object} The input options after defaults
             * @member Inst
             * @memberOf Inst
             */
            Inst.opt = $.extend(true, {}, SPDate.defaults, options);

            /**
             * @property {jQuery} the UI container for the Date field.
             * @member Inst
             * @memberOf Inst
             */
            Inst.$ui = $(dateFieldTemplate)
                        .filter("div.spwidget-date-cntr")
                        .clone();

            if (Inst.isInline) {

                Inst.$ui
                    .appendTo(Inst.inlineCntr)
                    .addClass("spwidget-inline")
                    .css("display", "none");

                Inst.$ele.appendTo(Inst.$ui);

            } else {

                Inst.$ui
                    .insertAfter(Inst.$ele)
                    .css("display", "none");

            }

            /**
             * @property {String} The original value in the input
             * @member Inst
             * @memberOf Inst
             */
            Inst.eleOrigVal = Inst.$ele.val();
            Inst.$ele.val("");

            /**
             * @property {jQuery} the Datepicker input field.
             * @member Inst
             * @memberOf Inst
             */
            Inst.$input = Inst.$ui
                            .find("input[name='SPDateFieldInput']")
                            .val(Inst.$ele.val());

            /** @property {jQuery} the jQuery datepicker input container */
            Inst.$inputCntr = Inst.$input.closest(".spwidget-date-input-cntr");

            /**
             * @property {jQuery} The container used to display date when allowMuliples is true.
             * @member Inst
             * @memberOf Inst
             */
            Inst.$dtCntr = Inst.$ui.find("div.spwidget-date-selected-cntr");

            /**
             * Returns the date selected by the user. An object is returned
             * with the date formatted in differnt ways. See below.
             *
             * @return {Object}
             *      The returned objec will have the following format:
             *
             *      {
             *          input: 'value of input',
             *          dates: [
             *              'date 1',
             *              'date 2'
             *          ]
             *      }
             *
             */
            Inst.getDate = function() {

                var dtObj = {
                        input:  Inst.$ele.val(),
                        dates:  []
                    };

                if (dtObj.input) {

                    if (Inst.opt.allowMultiples) {

                        dtObj.dates = dtObj.input.split(Inst.opt.delimeter);

                    } else {

                        dtObj.dates.push(dtObj.input);

                    }

                }

                return dtObj;

            }; //end: Inst.getDate()

            /**
             * Resets the widget to its initial state, which could have
             * had a prepopluated value on it.
             *
             * @return {Object} Inst
             */
            Inst.reset = function() {

                Inst.$input.val("").datepicker("hide");
                Inst.$ele.val("").change();
                Inst.$dtCntr.empty();

                return Inst;

            }; //end: Inst.reset()

            /**
             * Sets a date on the date widgets. Upon setting the date, the
             * input's change() event is triggered.
             *
             * @param {Object} setDateOpt
             *
             * @param {Date|Array|String} setDateOpt.date
             *          The date or array of dates to set on the picker.
             *
             * @param {Boolean} [setDateOpt.setDatepicker=true]
             *          When true, the datepicker jQuery UI widget input will
             *          be set to the value that was provided via this method.
             *          Used only when allowMultiples is false or isInline is
             *          true.
             *
             * @param {String} [setDateOpt.format=Inst.opt.datepicker.dateFormat]
             *          The format of the dates provided on input. This param
             *          is used only if the input date (or one of them) is a
             *          string.
             *
             * @param {Boolean} [setDateOpt.triggerEvent=true]
             *
             *
             *
             * @return {Object} Inst
             */
            Inst.setDate = function(setDateOpt) {

                var opt     = $.extend(
                                {},
                                {
                                    date:           '',
                                    time:           '',
                                    format:         Inst.opt.datepicker.dateFormat,
                                    setDatepicker:  true,
                                    triggerEvent:   true
                                },
                                setDateOpt
                            ),
                    eleVal  = Inst.$ele.val(),
                    dtShow  = '',
                    dtShowObj;

                if (!opt.date) {

                    return Inst;

                }

                if (!$.isArray(opt.date)) {

                    opt.date = [ opt.date ];

                }

                // Loop through each date and create the string that will be used
                // to set the date on the widget.
                $.each(opt.date, function(i, dt){

                    var dtObj   = dt,
                        dt1     = '',
                        dt2     = '';

                    // If this date object is not an instance of Date, then
                    // parse it into a Date object.
                    // If the string has a T on it, then we assume that it is
                    // an ISO 8601 compliant string and use the parseDateString
                    // to get a Date object.
                    // Else, it could be a date in the format defined by the datepicker
                    // date format param.
                    if (!(dtObj instanceof Date)) {

                        dtObj = String(dtObj);

                        if (dtObj.indexOf("T") > -1) {

                            dtObj = parseDateString(dtObj);

                        } else {

                            try {

                                dtObj = $.datepicker.parseDate(opt.format, dt);

                            } catch(e){

                                return Inst;

                            }

                        }

                    }

                    dtShowObj   = dtObj;
                    dt1         = $.datepicker.formatDate('yy-mm-dd', dtObj);
                    dt2         = $.datepicker
                                    .formatDate(Inst.opt.datepicker.dateFormat, dtObj);

                    if (Inst.opt.showTimepicker) {

                        dt1  = getDateString(dtObj, Inst.opt._timeFmt);
                        dt2 += Inst.$timepicker.formatTime(dtObj);

                    }

                    // AllowMultiples = false
                    if (!Inst.opt.allowMultiples) {

                        eleVal  = dt1;
                        dtShow  = dt2;

                    // allowMultiples = true and date not yet stored
                    } else if (eleVal.indexOf(dt1) < 0) {

                        if (eleVal) {

                            eleVal += Inst.opt.delimeter;

                        }

                        eleVal += dt1;

                        dtShow += '<span class="spwidgets-item" data-spwidget_dt1="' +
                                    dt1 + '" data-spwidget_dt2="' + dt2 + '">' +
                                    fillTemplate({
                                        tmplt: Inst.opt.dateTemplate,
                                        data: { date: dt2 }
                                    }) +
                                ' </span>';

                    }

                }); //end: each

                // If allow multiple is true, then set teh multiple dates
                // on the display area. Then set the input value and trigger
                // change event
                if (Inst.opt.allowMultiples) {

                    Inst.$dtCntr.append(dtShow);

                // else, should we set the date picker widget
                } else if (opt.setDatepicker) {

                    Inst.$input.val(dtShow);

                    if (Inst.isInline && !Inst.opt.showTimepicker){

                        Inst.$inputCntr.datepicker("setDate", dtShowObj);

                    } else if (Inst.isInline) {

                        Inst.$timepicker.updateDateTimeWidgets(dtShowObj);

                    }

                }

                Inst.$ele.val(eleVal);

                if (opt.triggerEvent) {

                    if (!Inst.isInline) {

                        Inst.$ele.change();

                    }

                    if ($.isFunction(Inst.opt.onSelect)) {

                        Inst.opt.onSelect.call(
                            ( Inst.isInline ? Inst.inlineCntr : Inst.$ele )
                        );

                    }

                }

                return Inst;

            }; //end: Inst.setDate()

            /**
             * Removes a date from the list of selected dates.
             *
             * @param {Object} removeDateOpt
             *
             * @param {Date|String|Array} date
             *          The date or array of dates to be removed. Can be
             *          Date objects or strings. If defined as a string
             *          the 'format' option should be set accordingly
             *
             * @return {Object} Inst
             */
            Inst.removeDate = function(removeDateOpt){

                var opt     = $.extend(
                                {},
                                {
                                    date:           '',
                                    format:         Inst.opt.datepicker.dateFormat
                                },
                                removeDateOpt
                        ),
                    eleDtObj    = Inst.getDate();

                if (!opt.date) {

                    return Inst;

                }

                if (!$.isArray(opt.date)) {

                    opt.date = [ opt.date ];

                }

                $.each(opt.date, function(i, dt){

                    var dtObj       = dt,
                        dt1         = '',
                        dt1Regex    = '';

                    if (!(dtObj instanceof Date)) {

                        try {

                            dtObj = $.datepicker.parseDate(opt.format, dt);

                        } catch(e){

                            return Inst;

                        }

                    }

                    // Get the internal representation of the date (ISO 8601)
                    // so that we can remove it from the list of selected
                    // dates. The internal representation can be just the date
                    // or the date + time.
                    // The dt1Regex is used to search and replace the
                    // date in the input to where this widget was bound, which
                    // could include multiple dates.
                    if (Inst.opt.showTimepicker) {

                        dt1 = getDateString(dtObj, Inst.opt._timeFmt);

                    } else {

                        dt1 = $.datepicker.formatDate('yy-mm-dd', dtObj);

                    }

                    dt1Regex    = new RegExp(
                                    "(" + Inst.opt.delimeter + ")?" + dt1,
                                    "g");

                    eleDtObj.input = eleDtObj.input.replace(dt1Regex, "");

                    if (Inst.opt.allowMultiples) {

                        Inst.$dtCntr
                            .find("span[data-spwidget_dt1='" + dt1 + "']")
                            .remove();

                    }

                });

                // Set the value on bound input.
                // Clean up the new string (misc. delimeteres at begining or
                // end of string), set it to the input field and trigger event.
                eleDtObj.input = eleDtObj.input
                                    .replace((new RegExp("^" + Inst.opt.delimeter)), "")
                                    .replace((new RegExp(Inst.opt.delimeter + "$")), "");

                Inst.$ele.val(eleDtObj.input).change();

                return Inst;

            }; //end: Inst.removeDate()

            /**
             * Removes the widget from the page and makes the original
             * Element visible
             */
            Inst.destroy = function() {

                Inst.$ele.removeData("SPDateFieldInstance");
                Inst.$ele.removeClass("hasSPDateField").css("display", "");
                Inst.$ui.css("display", "none");
                Inst.$input.datepicker("hide");
                Inst.$input.datepicker("destroy");

                if (Inst.$timepicker) {

                    Inst.$timepicker.$timePicker.off(".spdatefield");
                    Inst.$input.off(".spdatefield");

                }

                if (Inst.isInline) {

                    Inst.inlineCntr
                        .removeClass("hasSPDateField")
                        .removeData("SPDateFieldInstance");

                }

                Inst.$ui.remove();

            }; //end: Inst.destroy()

            /**
             * Creates the date picker on this field. Depending on the
             * input options, this could be a strait jQuery UI datepicker
             * or a customized picker that allows selection of time as well.
             *
             * @return {Object} Date time Picker (if showTimepicker is true)
             */
            Inst.createDatePicker = function() {

                var wdg = {};

                // If showTimepicker is true, then lets build our own
                // date and time picker, which wraps jQuery datepicker.
                if (Inst.opt.showTimepicker) {

                    wdg.$selectorCntr   = $(dateFieldTemplate)
                                            .filter("div.spwidget-datetime-selector")
                                            .clone()
                                                .appendTo(Inst.$inputCntr)
                                                .css("display", "none");
                    wdg.$datePicker     = wdg.$selectorCntr.find("div.spwidget-date-selector");
                    wdg.$timePicker     = wdg.$selectorCntr.find("div.spwidget-time-selector");
                    wdg.$setButton      = wdg.$selectorCntr.find("div.spwidget-btn-set");
                    wdg.$hourSelect     = wdg.$timePicker.find("select.spwidget-hour");
                    wdg.$minSelect      = wdg.$timePicker.find("select.spwidget-min");
                    wdg.$ampmSelect     = wdg.$timePicker.find("select.spwidget-ampm");
                    wdg.heightDone      = false;
                    wdg.firstShowDone   = false;

                    /**
                     * Returns an object with the time currently selected.
                     *
                     * @return {Object}
                     *      An object with the following format:
                     *
                     *          {
                     *              hour:       '',
                     *              hour24:     '',
                     *              minutes:    ''
                     *              ampm:       ''
                     *          }
                     */
                    wdg.getTime = function() {

                        var time = {
                                hour:       wdg.$hourSelect.val(),
                                minutes:    wdg.$minSelect.val(),
                                ampm:       wdg.$ampmSelect.val()
                            };

                        time.hour24 = time.hour;

                        if (time.ampm === "PM" && time.hour !== "12") {

                            time.hour24 = String(parseInt(time.hour) + 12);

                        } else if (time.ampm === "AM" && time.hour === "12") {

                            time.hour24 = "0";

                        }

                        return time;

                    }; //end: wdg.getTime()

                    /**
                     * Formats the time on the widget, either based on the
                     * values returned from getTime() or a Date object.
                     *
                     * @param {Date|Object} time
                     *      The object that will be used to format the Time.
                     *
                     * @return {String}
                     *      Date formated with the dateFormat input parameter
                     */
                    wdg.formatTime = function(time) {

                        var timeObj         = time,
                            timeFormated    = '';

                        if (time instanceof Date) {

                            timeObj = {
                                hour:       time.getHours(),
                                hour24:     String(time.getHours()),
                                minutes:    String(time.getMinutes()),
                                ampm:       'AM'
                            };

                            if (timeObj.hour > 12) {

                                timeObj.hour = String(timeObj.hour - 12);
                                timeObj.ampm = 'PM';

                            } else if (timeObj.hour === 12) {

                                timeObj.ampm = 'PM';

                            }

                            timeObj.hour = String(timeObj.hour);

                            if (timeObj.hour === "0") {

                                timeObj.hour = "12";

                            }

                            if (String(timeObj.minutes).length < 2) {

                                timeObj.minutes = "0" + timeObj.minutes;

                            }


                        } else if (!time) {

                            timeObj = wdg.getTime();

                        }

                        timeFormated = fillTemplate(
                            Inst.opt.timeFormat,
                            timeObj
                        );

                        return timeFormated;

                    }; //end: wdg.formatTime()

                    /**
                     * Updates the widget date/time with what's currently selected.
                     * If no date is selected, Today will be used.
                     *
                     * @return {undefined}
                     */
                    wdg.setDateTime = function(dtObj){

                        var time    = wdg.getTime();

                        // If dtObj is not a Date object, then create it now.
                        // First try to get it from the Datepicker... If thats
                        // Null (not yet selected by user), then just create a
                        // default Date.
                        if (!(dtObj instanceof Date)) {

                            dtObj = wdg.$datePicker.datepicker("getDate");

                            if (dtObj === null) {

                                dtObj = new Date();

                            }

                        }

                        // Add time elements to date object
                        dtObj.setHours(time.hour24);
                        dtObj.setMinutes(time.minutes);

                        Inst.setDate({
                            date:           dtObj,
                            format:         Inst.opt.datepicker.dateFormat,
                            setDatepicker:  true
                        });

                        // If allowMultiples or isInline is true, then the
                        // "set" button is visible. Need to make sure we call
                        // any user defined callback to jQuery-UI's 'select'
                        // option
                        wdg.execUsersCallback(Inst.$input.val());

                        return;

                    }; //end: wdg.setDateTime()

                    /**
                     * Updates the DateTime picker widgets (jquery datepicker
                     * and the hour and minutes selects) with the specified
                     * input date and time. This update of the widgets does
                     * not trigger an update to the date+time that is stored
                     * in the SPDateField() widget nor does it trigger events.
                     *
                     * @param {Date} [newDate=Date()]
                     *
                     * @return {undefined}
                     */
                    wdg.updateDateTimeWidgets = function(newDate){

                        var dtObj = newDate,
                            tmpVal;

                        if (!(dtObj instanceof Date)) {

                            dtObj = new Date();

                        }

                        // Set hours
                        tmpVal = dtObj.getHours();

                        if (tmpVal === 0) {

                            tmpVal = "12";

                        } else if (tmpVal > 12) {

                            tmpVal = (tmpVal - 12);

                        }

                        wdg.$hourSelect.val(tmpVal);

                        // Set Minutes
                        tmpVal = dtObj.getMinutes();

                        while (tmpVal % 5) {

                            --tmpVal;

                        }

                        if (tmpVal < 10) {

                            tmpVal = "0" + tmpVal;

                        }

                        wdg.$minSelect.val(tmpVal);

                        // set PM/AM
                        if (dtObj.getHours() > 11) {

                            wdg.$ampmSelect.val("PM");

                        } else {

                            wdg.$ampmSelect.val("AM");

                        }

                        wdg.$datePicker.datepicker("setDate", dtObj);

                    }; //end: wdg.updateDateTimeWidgets()

                    /**
                     * Makes the Time picker visible on the page.
                     *
                     * @return {undefined}
                     */
                    wdg.showPicker = function() {

                        wdg.$selectorCntr
                                .show(function(){

                                    var currentDate;

                                    if (!wdg.heightDone) {

                                        wdg.heightDone = true;

                                        makeSameHeight(
                                            wdg.$datePicker
                                                .find("div.ui-datepicker-inline")
                                                .add(wdg.$timePicker)
                                        );

                                    }

                                    // If this is the first time showing the picker,
                                    // then pre-set the picker to the last date that
                                    // was selected.
                                    // If no date was selected (or was pre-set on the
                                    // input), then create a new date object (now)
                                    if (!wdg.firstShowDone) {

                                        wdg.firstShowDone = true;

                                        currentDate = Inst.getDate();

                                        if (currentDate.dates.length) {

                                            currentDate = parseDateString(
                                                                currentDate.dates[
                                                                    currentDate.dates.length - 1
                                                                ]
                                                            );

                                        } else {

                                            currentDate = new Date();

                                        }

                                        // FIXME: Replace code below with call to new method.
                                        wdg.updateDateTimeWidgets(currentDate);

                                    }//end: if(): pre-set the picker values

                                })
                                .position({
                                    my: "left top",
                                    at: "left bottom",
                                    of: Inst.$input
                                });

                        return;

                    }; //end: wdg.showPicker()

                    /**
                     * Executes the user's callback to jQuery-UI's datepicker
                     * 'onSelect' option, if one was defined.
                     *
                     * @param {String} dateText
                     * @param {Object} dtPickerObj
                     *
                     */
                    wdg.execUsersCallback = function(dateText, dtPickerObj) {

                        // Call the user defined onSelect if one was defined.
                        if ($.isFunction(Inst.opt.datepicker._onSelect)) {

                            Inst.opt.datepicker._onSelect.call(
                                wdg.$datePicker,
                                dateText,
                                dtPickerObj
                            );

                        }

                    }; //end: wdg.execUsersCallback()

                    /* ------------------------------------------------------ */
                    /* ------------------------------------------------------ */

                    // Remove alt field updates from datepicker. We'll handle it
                    // with the time picker
                    Inst.opt.datepicker.altFormat   = '';
                    Inst.opt.datepicker.altField    = '';

                    // If user set the icon option in the Datepicker, then need
                    // to build it manually
                    if (Inst.opt.datepicker.buttonImage && !Inst.isInline) {

                        $('<img class="ui-datepicker-trigger" src="' +
                                Inst.opt.datepicker.buttonImage +
                                '" alt="..." title="...">'
                            )
                            .appendTo(Inst.$inputCntr)
                            .on("click" + SPDate.evNamespace, function(){

                                wdg.showPicker();

                            });

                    }

                    // If allowMultiples or isInline is true, then make set button visible
                    if (Inst.opt.allowMultiples || Inst.isInline) {

                        wdg.$selectorCntr.addClass("spwidget-date-multiples-cntr");
                        wdg.$setButton.find("div.spwidget-btn")
                            .button({label: Inst.opt.labelSet})
                            .on("click" + SPDate.evNamespace, function(/*ev*/){

                                wdg.setDateTime();

                                return this;

                            });

                    }

                    // Apply the Labels for the time picker for this instance
                    wdg.$timePicker
                        .find("div.ui-widget-header")
                            .html(Inst.opt.labelTime)
                            .end()
                        .find("div.spwidget-time-hour > label")
                            .html(Inst.opt.labelHour)
                            .end()
                        .find("div.spwidget-time-min > label")
                            .html(Inst.opt.labelMinutes)
                            .end()
                        .find("div.spwidget-time-ampm > label")
                            .html(Inst.opt.labelAMPM)
                            .end();

                    // Set up a listener on the datepicker widget so that when user picks
                    // a date, we catch it and add the time portion to it.
                    // Let's also save the existing onSelect function, if one was defined
                    // on input, so we can call it later.
                    if ($.isFunction(Inst.opt.datepicker.onSelect)) {

                        Inst.opt.datepicker._onSelect = Inst.opt.datepicker.onSelect;

                    }

                    // Ensure only 1 month
                    Inst.opt.datepicker.numberOfMonths = 1;

                    // Setup the Datepicker onSelect event, which will build a Date
                    // object of the date the user selected and call setDateTime()
                    // to set teh widget.
                    Inst.opt.datepicker.onSelect = function(dateText, dtPicker){

                        // If allowMultiples is true, then exit if
                        // this click is not the SET button
                        if (Inst.opt.allowMultiples || Inst.isInline) {

                            return this;

                        }

                        var newDate = new Date(
                                            dtPicker.currentYear,
                                            dtPicker.currentMonth,
                                            dtPicker.currentDay
                                        );

                        wdg.setDateTime(newDate);

                    };

                    // Create datepicker widget using jquery ui
                    wdg.$datePicker.datepicker(Inst.opt.datepicker);

                    // Setup listeners on the time selectors so that we can trigger
                    // an update to the widget.
                    wdg.$timePicker
                        .on("change" + SPDate.evNamespace + " keyup" + SPDate.evNamespace,
                            "select",
                            function(ev){

                                // Cancel event bubbling
                                ev.stopPropagation();
                                ev.preventDefault();

                                // If allowMultiples is true, then exit if
                                // this click is not the SET button
                                if (Inst.opt.allowMultiples || Inst.isInline) {

                                    return this;

                                }

                                wdg.setDateTime();

                                return this;

                            });

                    // If 'inline' mode is on, then make widget visible and
                    // hide the input field
                    if (Inst.isInline){

                        Inst.$input.css("display", "none");
                        wdg.$selectorCntr
                            .addClass("spwidget-inline")
                            .css("display", "");

                    }

                    // now that we have the datepicker setup, if we're
                    // NOT 'inline' mode, then add listeners to then
                    // input field so that the date and time picker is shown.
                    if (!Inst.isInline) {

                        Inst.$input
                            .on("focus" + SPDate.evNamespace, function(){

                                wdg.showPicker();

                            });

                    }

                /////////////////////////////////////////////////////
                // ELSE: showTimepicker is false. Just show regular
                // jQuery UI date widget.
                } else {

                    // If remainOpen option is true, then turn off picker animation
                    if (Inst.opt.allowMultiples && Inst.opt.remainOpen) {

                        Inst.opt.datepicker.showAnim = '';

                    }

                    // Store a reference to teh original onSelect method (if defined)
                    // and set our own here.  Our function will take the date selected
                    // by the user in their own locale and format it to ISO 8601
                    if ($.isFunction(Inst.opt.datepicker.onSelect)) {

                        Inst.opt.datepicker._onSelect = Inst.opt.datepicker.onSelect;

                    }

                    // Setup the Datepicker
                    Inst.opt.datepicker.onSelect = function(dateText, dtPicker){

                        Inst.setDate({
                            date:           dateText,
                            format:         dtPicker.settings.dateFormat,
                            setDatepicker:  false
                        });

                        // Call the user defined onSelect if one was defined.
                        if ($.isFunction(Inst.opt.datepicker._onSelect)) {

                            Inst.opt.datepicker._onSelect.call(this, dateText, dtPicker );

                        }

                        // If allow multiples is true, then clear out date picker input
                        if (Inst.opt.allowMultiples) {

                            Inst.$input.val("");

                        }

                        if (Inst.opt.allowMultiples && Inst.opt.remainOpen && !Inst.isInline) {

                            setTimeout(function(){
                                Inst.$input.datepicker("show");
                            }, 5);

                        }

                    };

                    // If inline is true, the initiate the datepicker on the
                    // DIV container and hide the input... Else, just initiate
                    // the Datepicker on the input field.
                    if (Inst.isInline) {

                        Inst.$inputCntr.datepicker(Inst.opt.datepicker);
                        Inst.$input.css("display", "none");

                    } else {

                        Inst.$input.datepicker(Inst.opt.datepicker);

                    }

                }

                return wdg;

            }; //end: createDatePicker()

            //------------------------------------------------------
            //-----------    INITIATE THIS INSTANCE    -------------
            //------------------------------------------------------

            // Define time string format (local or utc)
            // param that is used with getDateString
            Inst.opt._timeFmt = ( Inst.opt.timeUTC ? 'utc' : 'local' );

            // Setup the datepicker options
            // TODO: should we allow the user to manipulate this?
            Inst.opt.datepicker.altFormat   = 'yy-mm-dd';
            Inst.opt.datepicker.altField    = Inst.$ele;

            // If allowMultiples is true, then set special processing for storing
            // multiple dates - both on display and in the input field.
            if (Inst.opt.allowMultiples){

                Inst.opt.datepicker.altFormat   = '';
                Inst.opt.datepicker.altField    = '';

                // Setup listener for removing selected dates.
                Inst.$dtCntr
                    .css("display", "")
                    .on("click", ".spwidgets-item-remove", function(ev){

                        var $dtItem = $(ev.target).closest(".spwidgets-item"),
                            date    = $dtItem.data("spwidget_dt1");

                        // If allowMultiples is true, then convert the date string
                        // to a date object
                        if (Inst.opt.allowMultiples) {

                            date = parseDateString(date);

                        }

                        Inst.removeDate({
                            date:   date,
                            format: 'yy-mm-dd'
                        });

                    });

            } //end: if(): allowMultiples

            // Hide the input used by the caller and display our datepicker input.
            Inst.$ele
                .css("display", "none")
                .data("SPDateFieldInstance", Inst);

            if (Inst.isInline) {

                Inst.inlineCntr.data("SPDateFieldInstance", Inst);

            }

            // $timepicker holds only the setup (wdg) for the date+time picker
            // for the Datepicker only, use Inst.$input
            Inst.$timepicker = Inst.createDatePicker();

            // If input field already has some date, then prepopulate the widget
            if (Inst.eleOrigVal) {

                Inst.setDate({
                    date:           (Inst.eleOrigVal.split(Inst.opt.delimeter)),
                    format:         'yy-mm-dd',
                    triggerEvent:   false
                });

            }

            // On date change, trigger event on original
            // element and cancel this one
            Inst.$input.on("change", function(ev){

                ev.stopPropagation();
                Inst.$ele.change();

            });

            Inst.$ui.css("display", "");

            return this;

        }); //end: return.each()

    }; //end: $.fn.SPDateField()

    /**
     * When user clicks on the page, this method will close the
     * Timepicker if it is open.
     *
     * @param {jQuery.Event}
     *
     * @return {Object} this
     */
    SPDate.onPageClick = function(ev) {

        var $ele            = $(ev.target),
            $allSelectors   = $("div.spwidget-datetime-selector:visible:not('.spwidget-inline')"),
            $clickArea      = null;

        // JQuery UI Datepicker FWD/BAKC button are recreate everytime a
        // user clicks on them... if this
        if (!$.contains(document.documentElement, $ele[0])) {

            return this;

        }

        // If Date and Time selectors are visible, then lets check if the user
        // clicked on an element that is associated with the current time picker.
        // This is used later to ensure we close all other pickers *except* the
        // one associated with this element.
        if ($allSelectors.length) {

            $clickArea = $ele.closest("div.spwidget-datetime-selector");

            if (!$clickArea.length && $ele.is("input.spwidget-date-datepicker,.ui-datepicker-trigger")) {

                $clickArea = $ele.parent().find("div.spwidget-datetime-selector");

            }

            $allSelectors.not($clickArea).hide();

        }

        return this;

    }; //end: SPDate.onPageClick()

    dateField.defaults = SPDate.defaults;
    return dateField;

});
