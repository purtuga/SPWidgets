import Widget from "common-micro-libs/src/jsutils/Widget";
import parseHTML from "common-micro-libs/src/jsutils/parseHTML";
import domFind from "common-micro-libs/src/domutils/domFind";
import SPPeoplePicker from "../../../src/widgets/PeoplePicker/PeoplePicker";
import template from "./SPPeoplePickerDemo.html";

import common from "../setup/common";

    var $CONSOLE_LOG_OUT,
        log = function(data){
            $CONSOLE_LOG_OUT.appendChild(
                parseHTML('<div style=\'border-top:1px solid; margin-bottom: 2em;font-family: Consolas, Inconsolata, Monaco, "Courier New";white-space: pre-wrap;\'>' + data + '</div>')
            );
        };

    export default Widget.extend({
        init: function(){
            this.$ui = parseHTML(template).firstChild;
            $CONSOLE_LOG_OUT = domFind(this.$ui, "#SPPeoplePicker_console_out").shift();

            initDemo1.call(this);
            initDemo2.call(this);
        }
    });

    function initDemo1() {
        var picker = SPPeoplePicker.create({
            webURL: common.getWebURL()
        });
        picker.appendTo(domFind(this.$ui, "#SPPeoplePickerDemo1")[0]);
    }

    function initDemo2() {
        var picker = SPPeoplePicker.create({
            allowMultiples: false,
            minLength:      0,
            webURL:         common.getWebURL()
        });
        picker.appendTo(domFind(this.$ui, "#SPPeoplePickerDemo2")[0]);

        picker.on("remove", function(person){
            log("Event Triggered: remove:\n" +
                JSON.stringify(person || {}, null, 2)
                    .replace("<", "&lt;")
                    .replace(">", "&gt;")
            );
        });

        picker.on("select", function(person){
            log("Event Triggered: select:\n" +
                JSON.stringify(person || {}, null, 2)
                    .replace("<", "&lt;")
                    .replace(">", "&gt;")
            );
        });
    }

