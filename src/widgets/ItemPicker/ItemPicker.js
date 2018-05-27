import Picker       from "common-micro-libs/src/widgets/Picker/Picker"
import domAddClass  from "common-micro-libs/src/domutils/domAddClass"

//==============================================================================

/**
 * Same as Picker, but applies styles using UI Fabric
 *
 * @class ItemPicker
 * @extend Picker
 */
export default Picker.extend({
    init: function (options) {
        Picker.prototype.init.call(this, options);

        var CSS_MS_FONT_M   = "ms-font-m";
        var CSS_MS_ICON     = "ms-Icon ms-Icon";
        var CSS_PICKER      = "Picker";
        var $ui             = this.getEle();
        var uiFind          = $ui.querySelector.bind($ui);
        var $ele;

        domAddClass($ui, CSS_MS_FONT_M);
        domAddClass($ui, "ms-borderColor-neutralSecondary--hover");
        domAddClass(this.getPopupWidget().getEle(), CSS_MS_FONT_M);

        $ele                = uiFind(`.${CSS_PICKER}-clear`);
        $ele.textContent    = "";
        domAddClass($ele, `${CSS_MS_ICON}--ChromeClose`);

        $ele = uiFind(`.${CSS_PICKER}-showMenu`);
        $ele.textContent = "";
        domAddClass($ele, `${CSS_MS_ICON}--ChevronDownMed`);
    }
});
