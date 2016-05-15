define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/parseHTML",
    "vendor/domutils/domFind",
    "src/widgets/SPPeoplePicker/SPPeoplePicker",

    "text!./SPPeoplePickerDemo.html"
], function(
    Widget,
    parseHTML,
    domFind,
    SPPeoplePicker,

    template
){

    return Widget.extend({
        init: function(){
            this.$ui = parseHTML(template).firstChild;

            initDemo1.call(this);

        }
    });

    function initDemo1() {
        var picker = SPPeoplePicker.create();
        picker.appendTo(domFind(this.$ui, "#SPPeoplePickerDemo1")[0]);

    }

});