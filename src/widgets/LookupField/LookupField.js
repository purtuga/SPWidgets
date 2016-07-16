define([
    "vendor/jsutils/Widget",
    "vendor/jsutils/EventEmitter",
    "vendor/jsutils/dataStore",
    "vendor/jsutils/objectExtend",
    "vendor/jsutils/fillTemplate",
    "vendor/jsutils/parseHTML",
    "vendor/jsutils/uuid",
    "vendor/jsutils/es6-Map",

    "vendor/domutils/domAddEventListener",
    "vendor/domutils/domAddClass",
    "vendor/domutils/domRemoveClass",
    "vendor/domutils/domHasClass",

    "./SelectedItem/SelectedItem",
    "../List/List",
    "../../spapi/getListItems",

    "text!./LookupField.html",
    //-------------------------------
    "less!./LookupField.less"
], function (
    Widget,
    EventEmitter,
    dataStore,
    objectExtend,
    fillTemplate,
    parseHTML,
    uuid,
    Map,

    domAddEventListener,
    domAddClass,
    domRemoveClass,
    domHasClass,

    SelectedItem,
    List,
    getListItems,

    LookupFieldTemplate
) {

    // FIXME: Support CAMLQuery
    // FIXME: Support SortOrder
    // FIXME: support search box
    // FIXME: need to use Map

    var
    PRIVATE             = dataStore.create(),
    WINDOW_NAVIGATOR    = window.navigator,

    CSS_CLASS_BASE              = 'spwidgets-LookupField',
    CSS_CLASS_NO_LABEL          = CSS_CLASS_BASE + "--noLabel",
    CSS_CLASS_NO_DESCRIPTION    = CSS_CLASS_BASE + "--noDescription",
    CSS_CLASS_SHOW_CHOICES      = CSS_CLASS_BASE + "--showChoices",

    /**
     * A Lookup field. Supports either Single lookup or Multi Lookup
     * fields.
     *
     * @class LookupField
     *
     * @extends Widget
     * @extends EventEmitter
     *
     * @param {Object} options
     *
     * @param {ListColumnModel} options.column
     *  The list column model for the LookupField.
     *  This column definition (if not of type ListColumnModel) should have
     *  an attribute called `List` with the Name or UUID of the list.
     *
     * @param {Array} [options.fields=[options.column.ShowField]]
     *  List of column fields from the lookup list to be retrieved. Defaults to
     *  the column `ShowField` value or the `Title` column.
     *
     * @param {Widget} [options.ListWidget=List]
     *  The List widget to use for displaying the items.
     *
     * @param {Widget} [options.SelectedItemWidget=SelectedItem]
     *
     * @fires LookupField#selected:remove
     */
    LookupField = /** @lends LookupField.prototype */{
        init: function (options) {
            var
            inst = {
                opt:                    objectExtend({}, LookupField.defaults, options),
                showChoicesListener:    null,
                list:                   '',
                fields:                 '',
                listWdg:                null,
                selected:               new Map() // Keeps ListItemRow->Widget associations
            },
            opt = inst.opt;

            PRIVATE.set(this, inst);

            opt.lang    = String(WINDOW_NAVIGATOR.language || WINDOW_NAVIGATOR.userLanguage || "en-US");
            opt.labels  = opt.i18n[opt.lang] || opt.i18n["en-US"];

            var
            $ui             = this.$ui = parseHTML(fillTemplate(LookupFieldTemplate, opt)).firstChild,
            BASE_SELECTOR   = "." + CSS_CLASS_BASE,
            uiFind          = $ui.querySelector.bind($ui),
            $input          = inst.$input = uiFind(BASE_SELECTOR + "-input > input"),
            on              = this.on.bind(this),
            selected        = inst.selected;

            inst.$selectedHolder    = uiFind(BASE_SELECTOR + "-selected");
            inst.$choicesHolder     = uiFind(BASE_SELECTOR + "-input-choices");

            if (opt.hideLabel) {
                domAddClass($ui, CSS_CLASS_NO_LABEL);
            }

            if (opt.hideDescription) {
                domAddClass($ui, CSS_CLASS_NO_DESCRIPTION);
            }

            // Get the list name to be used in the lookup
            if (opt.column.List === "Self") {
                inst.list = opt.column.getList().Name;

            } else {
                inst.list = opt.column.List;
            }

            // Define the Query Fields
            if (!Array.isArray(opt.fields)) {
                opt.fields = [opt.column.ShowField || 'Title'];
            }

            inst.fields = '<ViewFields>' +
                opt.fields.reduce(function(camlFields, fieldName){
                    camlFields += '<FieldRef Name="' + fieldName + '"/>';
                    return camlFields;
                }, "") +
                '</ViewFields>';

            //---------------------------------
            //   setup events
            //---------------------------------

            // When clicking on any part of the -items section, focus on input field
            domAddEventListener(uiFind(BASE_SELECTOR + "-items"), "click", function(ev){
                if (ev.target !== $input) {
                    $input.focus();
                }
            });

            // Typing in the input field, searches the list
            domAddEventListener($input, "keyup", handleKeywordInput.bind(this));

            domAddEventListener($input, "focus", function(){
                this.showChoices();
            }.bind(this));

            // User removes an item from the selected list
            on("selected:remove", function(itemData){
                if (selected.has(itemData)){
                    selected.get(itemData).destroy();
                    selected["delete"](itemData);
                }
            });

            // Load first page of data and add it to the list of selectable items.
            retrieveListData.call(this).then(function(rows){
                addItemsToUI.call(this, rows);
            }.bind(this));

            this.onDestroy(function () {
                if (inst.showChoicesListener) {
                    inst.showChoicesListener.remove();
                }

                if (inst.listWdg) {
                    inst.listWdg.destroy();
                }

                selected.forEach(function(selectedWdg){
                    if (selectedWdg) {
                        selectedWdg.destroy();
                    }
                });
                selected.clear();

                PRIVATE.delete(this);
            }.bind(this));
        },

        /**
         * Shows the list of possible items that can be selected.
         */
        showChoices: function(){
            var me      = this,
                inst    = PRIVATE.get(this),
                ele     = this.getEle();

            if (!domHasClass(ele, CSS_CLASS_SHOW_CHOICES)) {
                domAddClass(ele, CSS_CLASS_SHOW_CHOICES);

                if (!inst.showChoicesListener) {
                    setTimeout(function() {
                        inst.showChoicesListener = domAddEventListener(document, "click", function(ev){
                            if (ev.target !== inst.$input && !inst.$choicesHolder.contains(ev.target)) {
                                me.hideChoices();
                            }
                        });
                    }, 20);
                }
            }
        },

        /**
         * Hides the list of possible items.
         */
        hideChoices: function(){
            var inst = PRIVATE.get(this);

            domRemoveClass(this.getEle(), CSS_CLASS_SHOW_CHOICES);

            if (inst.showChoicesListener) {
                inst.showChoicesListener.remove();
                inst.showChoicesListener = null;
            }
        }
    };


    function handleKeywordInput(ev){

        ev;

    }

    function retrieveListData() {
        var me      = this,
            inst    = PRIVATE.get(me);

        return getListItems({
            listName:       inst.list,
            CAMLViewFields: inst.fields
        });
    }

    function addItemsToUI(rows) {
        var inst = PRIVATE.get(this);

        if (inst.listWdg) {
            inst.listWdg.destroy();
            inst.listWdg = null;
        }

        inst.listWdg = inst.opt.ListWidget.create({items: rows});

        inst.listWdg.on("item:selected", showItemAsSelected.bind(this));
        inst.listWdg.on("item:unselected", removeItemFromSelected.bind(this));

        inst.listWdg.appendTo(inst.$choicesHolder);
    }

    function showItemAsSelected(itemData){
        var inst        = PRIVATE.get(this),
            selected    = inst.selected,
            itemWdg;

        // If itemData is already selected, exit
        if (selected.has(itemData)) {
            return;
        }

        itemWdg = inst.opt.SelectedItemWidget.create({
            item: itemData
        });
        itemWdg.appendTo(inst.$selectedHolder);
        // Pipe events of the Selected Widget to LookupField prefixed with `selected:`
        itemWdg.pipe(this, "selected:");
        itemWdg.onDestroy(function(){
            if (selected.has(itemData)) {
                selected["delete"](itemData);
            }
        });

        selected.set(itemData, itemWdg);
    }

    function removeItemFromSelected(itemData){
        var selected = PRIVATE.get(this).selected;
        if (selected.has(itemData)) {
            selected.get(itemData).destroy();
            selected["delete"](itemData);
        }
    }


    LookupField = EventEmitter.extend(Widget, LookupField);
    LookupField.defaults = {
        column:             {},
        fields:             null,
        hideLabel:          false,
        hideDescription:    false,
        ListWidget:         List,
        SelectedItemWidget: SelectedItem,
        i18n:               {
            'en-US': {
                placeholder: "Choose..."
            }
        }
    };

    return LookupField;
});