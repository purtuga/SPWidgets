import page                 from "page"
import parseHTML            from "common-micro-libs/src/jsutils/parseHTML"

import SPPeoplePickerDemo   from '../SPPeoplePickerDemo/SPPeoplePickerDemo'
import SPFilterPanelDemo    from '../SPFilterPanelDemo/SPFilterPanelDemo'
import LookupFieldDemo      from '../LookupFieldDemo/LookupFieldDemo'
import ListPickerDemo       from '../ListPickerDemo/ListPickerDemo'
import ColumnPickerDemo     from '../ColumnPickerDemo/ColumnPickerDemo'
import DateTimeFieldDemo    from '../DateTimeFieldDemo/DateTimeFieldDemo'


//==============================================================


let currentDemo;
let demoCntr        = document.querySelector("#spwidgets_dev_demo");
let demoSelector    = document.querySelector("#demo_selector");
let demoComponents  = {
    SPPeoplePickerDemo,
    SPFilterPanelDemo,
    LookupFieldDemo,
    ListPickerDemo,
    ColumnPickerDemo,
    DateTimeFieldDemo
};

Object.keys(demoComponents).forEach((demoName) => {
    demoSelector.appendChild(parseHTML('<option value="' + demoName + '">' + demoName+ '</option>'));
});

demoSelector.addEventListener("change", function(){
    location.hash = `#/${demoSelector.value}`;
});

page.base("/#");
page("/:demoName", function(ctx){
    if (currentDemo) {
        currentDemo.destroy();
        currentDemo = null;
    }

    let demoName = ctx.params.demoName;

    if (demoComponents[demoName]) {
        currentDemo = demoComponents[demoName].create();
        currentDemo.appendTo(demoCntr);
    }
});
page.start();

demoSelector.style.display = "";

