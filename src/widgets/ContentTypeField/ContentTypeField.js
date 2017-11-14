import ChoiceField          from "../ChoiceField/ChoiceField"
import getListContentTypes  from "../../spapi/getListContentTypes"

//=================================================================

/**
 * Widget picker for List content types
 *
 * @class ContentTypeField
 * @extends ChoiceField
 */
export default ChoiceField.extend({
    init(options) {
        if (options && !options.choiceList) {
            options.choiceList = [];
        }
        ChoiceField.prototype.init.call(this, options);
        getListContentTypes({listName: options.listName, webURL: options.webURL}).then(contentTypes => {
            contentTypes.forEach(contentType => {
                contentType.title = contentType.Name;
                contentType.value = contentType.ID;
            });
            this.setChoices(contentTypes);
        });
    }
});
