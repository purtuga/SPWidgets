/**
 * jquery.SPDateField.js
 * The SPDateField widget. Introduced with v2.2, August 2013
 * 
 * BUILD: _BUILD_VERSION_DATE_
 * 
 */
;(function($){
    
    "use strict";
    /*jslint nomen: true, plusplus: true */
    /*global SPWidgets */
    
    /**
     * @class SPDate
     * @namespace
     */
    var SPDate = {};
    
    /** @property {Boolean} Is initialization done */
    SPDate.isInitDone = false;
    
    /** @property {String} Event namespace */
    SPDate.evNamespace = '.spwidgets.spdatefield';
    
    /**
     * Default options. 
     * @member Inst.opt
     * @memberOf Inst.opt
     */
    $.SPWidgets.defaults.date = {
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
        timeFormat:     ' {{hour}}:{{minutes}} {{ampm}}'
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
     * @param {Object} [options]
     * 
     * @param {Boolean} [options.allowMultiples=false]
     * @param {String} [options.delimeter=";"]
     * @param {Boolean} [options.remainOpen=true]
     * @param {Object} [options.datepicker={...}]
     * @param {String} [options.dateTemplate=""]
     * @param {Boolean} [options.showTimepicker=false]
     * @param {String} [options.timeFormat='h:m T']
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
    $.fn.SPDateField = function(options){
        
        var arg         = arguments,
            inputEle    = this;
        
        // If initialization is not yet done, then do it now
        if ( !SPDate.isInitDone ) {
            
            SPDate.isInitDone = true;
            
            if ( SPDate.styleSheet !== "" ) {
                
                $('<style type="text/css">' + "\n\n" +
                        SPDate.styleSheet + "\n\n</style>" )
                    .prependTo("head");
                
            }
            
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
        return this.each(function(){
            
           /**
            * @class SPDate
            */
            var Inst = {
                
                /** @property {jQuery} The input element used by the user */
                $ele: $(this).addClass("hasSPDateField")
                
            };
            
            if (!Inst.$ele.is("input[type='text']")) {
                
                return;
                
            }
            
            /**
             * @property {String} The original value in the input
             * @member Inst
             * @memberOf Inst
             */
            Inst.eleOrigVal = Inst.$ele.val();
            Inst.$ele.val("");
                
            /**
             * @property {Object} The input options after defaults
             * @member Inst
             * @memberOf Inst
             */
            Inst.opt = $.extend(true, {}, $.SPWidgets.defaults.date, options);
            
            /**
             * @property {jQuery} the UI container for the Date field.
             * @member Inst
             * @memberOf Inst
             */
            Inst.$ui = $(SPDate.htmlTemplate)
                        .filter("div.spwidget-date-cntr")
                        .clone()
                            .insertAfter(Inst.$ele)
                            .css("display", "none");
            
            /**
             * @property {jQuery} the Datepicker input field.
             * @member Inst
             * @memberOf Inst
             */
            Inst.$input = Inst.$ui
                            .find("input[name='SPDateFieldInput']")
                            .val(Inst.$ele.val());
            
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
             *          Then true, the datepicker jQuery UI widget input will
             *          be set to the value that was provided via this method.
             *          Used only when allowMultiples is false
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
                    dtShow  = '';
                
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
                    
                    if (!(dtObj instanceof Date)) {
                        
                        try {
                            
                            dtObj = $.datepicker.parseDate(opt.format, dt);
                            
                        } catch(e){
                            
                            return Inst;
                            
                        }
                         
                    }

                    dt1 = $.datepicker.formatDate('yy-mm-dd', dtObj);
                    dt2 = $.datepicker
                            .formatDate(Inst.opt.datepicker.dateFormat, dtObj);
                    
                    
                    // AllowMultiples = false
                    if (!Inst.opt.allowMultiples) {
                        
                        eleVal  = dt1;
                        dtShow  = dt2;
                        
                        if (Inst.opt.showTimepicker) {
                            
                            eleVal = $.SPWidgets.SPGetDateString(dtObj);
                            dtShow += Inst.$timepicker.formatTime(dtObj);
                            
                        }
                        
                    // allowMultiples = true and date not yet stored
                    } else if (eleVal.indexOf(dt1) < 0) {
                        
                        if (eleVal) {
                            
                            eleVal += Inst.opt.delimeter;
                            
                        }
                        
                        eleVal += dt1;
                        
                        dtShow += '<span class="spwidgets-item" data-spwidget_dt1="' +
                                    dt1 + '" data-spwidget_dt2="' + dt2 + '">' +
                                    $.SPWidgets.fillTemplate({
                                        tmplt: Inst.opt.dateTemplate,
                                        data: { date: dt2 }
                                    }) + 
                                ' </span>';
                        
                    }
                    
                });
                
                // If allow multiple is true, then set teh multiple dates
                // on the display area. Then set the input value and trigger
                // change event
                if (Inst.opt.allowMultiples) {
                    
                    Inst.$dtCntr.append(dtShow);
                    
                } else if (opt.setDatepicker) {
                    
                    Inst.$input.val(dtShow);
                    
                }
                
                Inst.$ele.val(eleVal);
                
                if (opt.triggerEvent) {
                    
                    Inst.$ele.change();
                    
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

                    dt1         = $.datepicker.formatDate('yy-mm-dd', dtObj);
                    dt1Regex    = new RegExp(
                                    "(" + Inst.opt.delimeter + ")?" + dt1, 
                                    "g");
                    
                    eleDtObj.input = eleDtObj.input.replace(dt1Regex, "");
                    
                    if (Inst.opt.allowMultiples) {
                        
                        dt1Regex = $.datepicker.formatDate('yy-mm-dd', dtObj);
                        
                        Inst.$dtCntr
                            .find("span[data-spwidget_dt1='" + dt1 + "']")
                            .remove();
                        
                    }
                    
                });
                
                // Clean up the new string, set it to
                // the input field and trigger event.
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
                    
                    wdg.$selectorCntr   = $(SPDate.htmlTemplate)
                                            .filter("div.spwidget-datetime-selector")
                                            .clone()
                                                .appendTo(Inst.$input.parent())
                                                .css("display", "none");
                    wdg.$datePicker     = wdg.$selectorCntr.find("div.spwidget-date-selector");
                    wdg.$timePicker     = wdg.$selectorCntr.find("div.spwidget-time-selector");
                    wdg.$hourSelect     = wdg.$timePicker.find("select.spwidget-hour");
                    wdg.$minSelect      = wdg.$timePicker.find("select.spwidget-min");
                    wdg.$ampmSelect     = wdg.$timePicker.find("select.spwidget-ampm");
                    wdg.heightDone      = false;
                    
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
                        
                        timeFormated = $.SPWidgets.fillTemplate(
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
                    wdg.updateDateTime = function(dtObj){
                        
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
                        
                        return;
                        
                    }; //end: wdg.updateDateTime()
                    
                    /**
                     * Makes the Time picker visible on the page.
                     * 
                     * @return {undefined}
                     */
                    wdg.showPicker = function() {
                        
                        wdg.$selectorCntr
                                .show(function(){
                                    
                                    if (!wdg.heightDone) {
                                        
                                        wdg.heightDone = true;
                                        
                                        $.SPWidgets.makeSameHeight(
                                            wdg.$datePicker
                                                .find("div.ui-datepicker-inline")
                                                .add(wdg.$timePicker)
                                        );
                                        
                                    }
                                    
                                })
                                .position({
                                    my: "left top",
                                    at: "left bottom",
                                    of: Inst.$input
                                });
                        
                        return;
                        
                    }; //end: wdg.showPicker()
                    
                    
                    /* ------------------------------------------------------ */
                    
                    // If user set the icon option in the Datepicker, then need
                    // to build it manually
                    if (Inst.opt.datepicker.buttonImage) {
                        
                        $('<img class="ui-datepicker-trigger" src="' + 
                                Inst.opt.datepicker.buttonImage + 
                                '" alt="..." title="...">'
                            )
                            .appendTo(Inst.$input.parent())
                            .on("click" + SPDate.evNamespace, function(){
                                
                                wdg.showPicker();
                                
                            });
                        
                    }
                    
                    // Set up a listener on the datepicker widget so that when user picks
                    // a date, we catch it and add the time portion to it.
                    // Let's also save the existing onSelect function, if one was defined
                    // on input, so we can call it later.
                    if ($.isFunction(Inst.opt.datepicker.onSelect)) {
                        
                        Inst.opt.datepicker._onSelect = Inst.opt.datepicker.onSelect;
                        
                    }
                    
                    // Setup the Datepicker 
                    Inst.opt.datepicker.onSelect = function(dateText, dtPicker){
                        
                        var newDate = new Date(
                                            dtPicker.currentYear,
                                            dtPicker.currentMonth,
                                            dtPicker.currentDay
                                        );
                        
                        wdg.updateDateTime(newDate);
                        
                        // Call the user defined onSelect if one was defined.
                        if ($.isFunction(Inst.opt.datepicker._onSelect)) {
                            
                            Inst.opt.datepicker._onSelect.call(this, dateText, dtPicker );
                            
                        }
                        
                    };
                    
                    wdg.$datePicker.datepicker(Inst.opt.datepicker);
                    
                    // Setup listeners on the time selectors so that we can trigger
                    // an update to the widget.
                    wdg.$timePicker
                        .on("change" + SPDate.evNamespace + " keyup" + SPDate.evNamespace,
                            "select",
                            function(){
                        
                                wdg.updateDateTime();
                                
                            });
                    
                    // now that we have the datepicker setup, add listeners to the
                    // input field so that the date and time picker is shown.
                    Inst.$input
                        .on("focus" + SPDate.evNamespace + " click" + SPDate.evNamespace, function(){
                            
                            wdg.showPicker();
                            
                        })
                        .on("blur", function(){
                            
                            // TODO: need to hide only if not this widget's selector
                            // wdg.$selectorCntr.hide();
                            
                        });
                    
                
                // ELSE: showTimePicker is false. Just show regular
                // jQuery UI date widget. 
                } else {
                    
                    Inst.$input.datepicker(Inst.opt.datepicker);
                    
                }
                
                return wdg;
                
            }; //end: createDatePicker()
                        
            //------------------------------------------------------
            //-----------    INITIATE THIS INSTANCE    -------------
            //------------------------------------------------------
            
            // Setup the datepicker options
            // TODO: should we allow the user to manipulate this?
            Inst.opt.datepicker.altFormat   = 'yy-mm-dd';
            Inst.opt.datepicker.altField    = Inst.$ele;
            
            // If allowMultiples is true, then set special processing for storing
            // multiple dates - both on display and in the input field.
            if (Inst.opt.allowMultiples){
                
                Inst.opt.datepicker.altFormat   = '';
                Inst.opt.datepicker.altField    = '';
                
                // If remainOpen option is true, then turn off picker animation
                if (Inst.opt.remainOpen) {
                    
                    Inst.opt.datepicker.showAnim = '';
                    
                }
                
                // Setup listener for removing selected dates.
                Inst.$dtCntr
                    .css("display", "")
                    .on("click", ".spwidgets-item-remove", function(ev){
                        
                        var $dt = $(ev.target).closest(".spwidgets-item");
                        
                        Inst.removeDate({
                            date:   $dt.data("spwidget_dt1"),
                            format: 'yy-mm-dd'
                        });
                        
                    });
                
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
                    
                    Inst.$input.val("");
                    
                    if (Inst.opt.remainOpen) {
                        
                        setTimeout(function(){
                            Inst.$input.datepicker("show");
                        }, 5);
                        
                    }
                    
                };
                
            } //end: if(): allowMultiples

            // Hide the input used by the caller and display our datepicker input.
            Inst.$ele
                .css("display", "none")
                .data("SPDateFieldInstance", Inst);
            
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
            $allSelectors   = $("div.spwidget-datetime-selector:visible"),
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
    
    /**
     * @property
     * Stores the Style sheet for the Date widget
     * @member SPDate
     * @memberOf SPDate
     */
    SPDate.styleSheet = "_INCLUDE_DATE_CSS_TEMPLATE_";
    
    /**
     * @property
     * Stores the HTML templates for the Date widget
     * @member SPDate
     * @memberOf SPDate
     */
    SPDate.htmlTemplate = "_INCLUDE_DATE_HTML_TEMPLATE_";
    
})(jQuery); /***** End of module: jquery.SPDateField.js */

