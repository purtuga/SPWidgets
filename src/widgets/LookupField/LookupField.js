import Widget                   from "common-micro-libs/src/jsutils/Widget"
import EventEmitter             from "common-micro-libs/src/jsutils/EventEmitter"
import dataStore                from "common-micro-libs/src/jsutils/dataStore"
import objectExtend             from "common-micro-libs/src/jsutils/objectExtend"
import fillTemplate             from "common-micro-libs/src/jsutils/fillTemplate"
import parseHTML                from "common-micro-libs/src/jsutils/parseHTML"
import Map                      from "common-micro-libs/src/jsutils/es6-Map"
import Promise                  from "common-micro-libs/src/jsutils/es6-promise"
import domAddEventListener      from "common-micro-libs/src/domutils/domAddEventListener"
import domAddClass              from "common-micro-libs/src/domutils/domAddClass"
import domPosition              from "common-micro-libs/src/domutils/domPosition"
import DomKeyboardInteraction   from "common-micro-libs/src/domutils/DomKeyboardInteraction"

import SelectedItem             from "./SelectedItem/SelectedItem"
import List                     from "../List/List"
import getListItems             from "../../spapi/getListItems"
import getCamlLogical           from "../../sputils/getCamlLogical"
import xmlEscape                from "../../sputils/xmlEscape"

import LookupFieldTemplate      from "./LookupField.html"
import "./LookupField.less"


//---------------------------------------------------------------------
var
PRIVATE             = dataStore.create(),
DOCUMENT            = document,
BODY                = DOCUMENT.body,

CSS_CLASS_BASE              = 'spwidgets-LookupField',
CSS_CLASS_NO_LABEL          = CSS_CLASS_BASE + "--noLabel",
CSS_CLASS_NO_DESCRIPTION    = CSS_CLASS_BASE + "--noDescription",

isArray = Array.isArray,

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
 *  This column definition (if not of type `ListColumnModel`) should have
 *  an attribute called `List` with the Name or UUID of the list.
 *
 * @param {Array} [options.fields=[options.column.ShowField]]
 *  List of column fields from the lookup list to be retrieved. Defaults to
 *  the column `ShowField` value or the `Title` column. Note that if
 *  `options.queryOptions` (below) defines a `CAMLViewFields`, then that
 *  will take precedence and the value in the options will not be used.
 *
 * @param {Array<Object|ListItemModel>|Object|ListItemModel} [options.selected]
 *  The list of lookup items to be pre-selected when widget is initialized. Value
 *  will be given to the `setSelected()` method, thus accepts any input by that
 *  method.
 *
 * @param {Array<String>} [options.searchColumns=[options.column.ShowField]
 *  A list of column internal names that will be used to search against
 *  when use types in a value in the input box. Defaults to the column
 *  definition `ShowField` setting.
 *
 * @param {Widget} [options.ListWidget=List]
 *  The List widget to use for displaying the items.
 *
 * @param {Widget} [options.SelectedItemWidget=SelectedItem]
 *  The widget to use for Selected items. Events from this widget will be piped
 *  to the `LookupField`.
 *
 * @param {Boolean} [options.allowMultiples]
 *  Allow multiple values to be selected. If set, value will override
 *  whatever is defined in the `Type` property of `options.column`
 *
 * @param {Number} [options.choicesZIndex=5]
 *  The CSS `zIndex` of the choices popup.
 *
 * @param {Object} [options.queryOptions={}]
 *  Additional options to be used in querying the lookup list. With the
 *  exception of `listName`, all other options supported by
 *  `getListItems` can be defined.
 *
 * @fires LookupField#item:selected
 * @fires LookupField#item:unselected
 * @fires LookupField#change
 */
LookupField = /** @lends LookupField.prototype */{
    init: function (options) {
        var
        inst = {
            opt:                    objectExtend({}, this.getFactory().defaults, options),
            showChoicesListener:    null,
            list:                   '',
            webURL:                 '',
            fields:                 '',
            listWdg:                null,
            selected:               new Map(), // Keeps ListItemRow->Widget associations
            allowMultiples:         false,
            currentData:            null,       // Rows[] Array
            onReady:                null        // Promise
        },
        opt = inst.opt;

        PRIVATE.set(this, inst);


        opt._selectedCountUI = fillTemplate(opt.labels.selectedCount, {
            count: '<span class="' + CSS_CLASS_BASE + '-selectedCount-number"></span>'
        });

        if (!isArray(opt.searchColumns)) {
            opt.searchColumns = [opt.column.ShowField || 'Title'];
        }

        // if we have a Column Model, the get the webURL from the List model
        if (opt.column && opt.column.getList) {
            inst.webURL = opt.column.getList().getWebURL();
        }

        var
        $ui             = this.$ui = parseHTML(fillTemplate(LookupFieldTemplate, opt)).firstChild,
        BASE_SELECTOR   = "." + CSS_CLASS_BASE,
        uiFind          = $ui.querySelector.bind($ui),
        $input          = inst.$input = uiFind(BASE_SELECTOR + "-input > input"),
        on              = this.on.bind(this);

        inst.$inputHolder       = uiFind(BASE_SELECTOR + "-input");
        inst.$selectedHolder    = uiFind(BASE_SELECTOR + "-selected");
        inst.$choicesHolder     = uiFind(BASE_SELECTOR + "-input-choices");
        inst.$count             = uiFind(BASE_SELECTOR + '-selectedCount-number');

        if (opt.hideLabel) {
            domAddClass($ui, CSS_CLASS_NO_LABEL);
        }

        if (opt.hideDescription) {
            domAddClass($ui, CSS_CLASS_NO_DESCRIPTION);
        }

        if (opt.choicesZIndex) {
            inst.$choicesHolder.style.zIndex = opt.choicesZIndex;
        }

        // Determine if multiple selections are allowed
        if (typeof opt.allowMultiples === "boolean") {
            inst.allowMultiples =  opt.allowMultiples;

        } else if (opt.column && opt.column.Type) {
            inst.allowMultiples =  opt.column.Type === "LookupMulti";
        }

        // Get the list name to be used in the lookup
        if (opt.column.List === "Self") {
            inst.list = opt.column.getList().Name;

        } else {
            inst.list = opt.column.List;
        }

        setSelectedCount.call(this);

        // Define the Query Fields
        if (!isArray(opt.fields)) {
            opt.fields = [opt.column.ShowField || 'Title'];
        }

        inst.fields = '<ViewFields>' +
            opt.fields.reduce(function(camlFields, fieldName){
                camlFields += '<FieldRef Name="' + fieldName + '"/>';
                return camlFields;
            }, "") +
            '</ViewFields>';

        // Add keyboard interaction to the CHoices from the input field

        // Setup keyboard interaction between input field and list of choices
        inst.keyboardInteraction = DomKeyboardInteraction.create({
            input:              $input,
            eleGroup:           inst.$choicesHolder,
            focusClass:         'spwidgets-ListItem--hover',
            eleSelector:        '.ms-ListItem'
        });


        //---------------------------------
        //   setup events
        //---------------------------------
        domAddEventListener(uiFind(BASE_SELECTOR + "-items-clear"), "click", function(ev){
            ev.stopPropagation();
            clearAllSelected.call(this);
        }.bind(this));

        // When clicking on any part of the -items section, focus on input field
        domAddEventListener(uiFind(BASE_SELECTOR + "-items"), "click", function(ev){
            if (ev.target !== $input) {
                $input.focus();
            }
        });

        // Typing in the input field, searches the list
        var currentRetrieval,
            lastSearchString = "";

        domAddEventListener($input, "keyup", function(ev){
            var thisSearchString = String(ev.target.value).trim();

            // If search string is the same as the last one, exit.
            // no need to pull results
            if (thisSearchString === lastSearchString) {
                return;
            }

            lastSearchString = thisSearchString;

            if (currentRetrieval) {
                clearTimeout(currentRetrieval);
            }

            var thisIteration = setTimeout(function(){
                if (thisIteration !== currentRetrieval) {
                    return;
                }

                retrieveListData.call(this, thisSearchString)
                    .then(
                        addItemsToChoices.bind(this)
                    )["catch"](function(e){
                        console.log(e);//jshint ignore:line
                    });
            }.bind(this), 300);

            currentRetrieval = thisIteration;
        }.bind(this));

        domAddEventListener($input, "focus", function(){
            this.showChoices();
        }.bind(this));

        // User removes an item from the selected list
        on("selected:remove", function(itemData){
            removeItemFromSelected.call(this, itemData);
            if (inst.listWdg){
                inst.listWdg.unselectItem(itemData);
            }
        }.bind(this));

        // Load first page of data and add it to the list of selectable items.
        inst.onReady = retrieveListData.call(this).then(function(rows){
            addItemsToChoices.call(this, rows);
        }.bind(this));

        if (opt.selected) {
            inst.onReady.then(() => {
                this.setSelected(opt.selected);
            });
        }

        this.onDestroy(function () {
            clearAllSelected.call(this);

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

    /**
     * Returns a promise that resolves when widget is ready (initialization done)
     *
     * @return {Promise}
     */
    onReady: function(){
        return PRIVATE.get(this).onReady;
    },

    /**
     * Shows the list of possible items that can be selected.
     */
    showChoices: function(){
        var me          = this,
            inst        = PRIVATE.get(me),
            $choices    = inst.$choicesHolder,
            $inputHldr  = inst.$inputHolder;

        BODY.appendChild($choices);
        domPosition($choices, $inputHldr);
        $choices.style.width    = $inputHldr.clientWidth + "px";
        $choices.style.display  = "block";

        if (!inst.showChoicesListener) {
            setTimeout(function() {
                inst.showChoicesListener = domAddEventListener(DOCUMENT, "click", function(ev){
                    if (ev.target !== inst.$input && !inst.$choicesHolder.contains(ev.target)) {
                        me.hideChoices();
                    }
                });
            }, 20);
        }
    },

    /**
     * Hides the list of possible items.
     */
    hideChoices: function(){
        var inst = PRIVATE.get(this),
            $choices    = inst.$choicesHolder;

        $choices.style.display  = "none";

        if ($choices.parentNode) {
            $choices.parentNode.removeChild($choices);
        }

        if (inst.showChoicesListener) {
            inst.showChoicesListener.remove();
            inst.showChoicesListener = null;
        }
    },

    /**
     * returns an array with the selected items. The item
     * definition (ex. `ListItemModel`) is returned in the array.
     *
     * @return {Array<Object|ListItemModel>}
     */
    getSelected: function(){
        var selectedKeys    = PRIVATE.get(this).selected.values(),
            response        = [],
            selectedItem;

        while (!(selectedItem = selectedKeys.next()).done) {
            response.push(selectedItem.value.getValue());
        }

        return response;
    },

    /**
     * Sets items as selected on the lookup widget.
     *
     * @param {Array<Object|ListItemModel>|Object|ListItemModel} items
     *  The items to show selected. Each item must have at least the `ID` defined if
     *  not a `ListItemModel`.
     *
     * @return {Promise}
     */
    setSelected: function(items){
        var me      = this,
            inst    = PRIVATE.get(this);

        if (!isArray(items)) {
            items = [items];
        }

        if (!inst.allowMultiples && items.length > 1) {
            items = [items.pop()];
        }

        return Promise.resolve().then(function(){
            var loadDataIDs = [],
                itemsData = items.map(function(item){
                    var itemData = getItemDataById.call(me, item.ID) ||
                                    getSelectedItemById.call(me, item.ID);

                    // It itemData is already stored within this widget,
                    // then use that, but only if item is not yet selected
                    if (itemData) {
                        if (isItemSelected.call(me, itemData)) {
                            return;
                        }

                        return itemData;
                    }

                    loadDataIDs.push(item.ID);
                    return null;

                }).filter(function(item){
                    return !!item;
                }),
                queryOptions;

            if (loadDataIDs.length) {
                queryOptions = getQueryOptions.call(me);
                queryOptions.CAMLQuery = "<Query><Where>" +
                    getCamlLogical({
                        type:   'OR',
                        values: loadDataIDs.map(function(id){
                            return '<Eq><FieldRef Name="ID"/><Value Type="Counter">' +
                                id + '</Value></Eq>';
                        })
                    }) +
                    "</Where></Query>";

                return getListItems(queryOptions).then(function(rows){
                    return rows.concat(itemsData);
                });
            }

            return itemsData;
        })
        .then(function(rows){
            rows.forEach(function (itemData) {
                showItemAsSelected.call(me, itemData);

                if (inst.listWdg) {
                    inst.listWdg.selectItem(itemData);
                }
            });
            return rows;
        });
    }
};

function retrieveListData(query) {
    var me              = this,
        inst            = PRIVATE.get(me),
        queryOptions    = getQueryOptions.call(me);

    if (query) {
        queryOptions.CAMLQuery = "<Query><Where>" +
            getCamlLogical({
                type:   'OR',
                values: inst.opt.searchColumns.map(function(colName){
                    return '<Contains><FieldRef Name="' + colName +
                        '"/><Value Type="Text">' +
                        xmlEscape.escape(query) +
                        '</Value></Contains>';
                })
            }) +
            "</Where></Query>";
    }

    return getListItems(queryOptions);
}

function getQueryOptions() {
    var inst            = PRIVATE.get(this),
        queryOptions    = objectExtend(
            { webURL: inst.webURL },
            inst.opt.queryOptions,
            { listName: inst.list }
        );

    if (!queryOptions.CAMLViewFields) {
        queryOptions.CAMLViewFields = inst.fields;
    }

    return queryOptions;
}

function addItemsToChoices(rows) {
    var inst = PRIVATE.get(this),
        listWdg;

    if (inst.listWdg) {
        inst.listWdg.destroy();
        inst.listWdg = null;
    }

    // If there are items selected, then loop through the new set
    // of rows and if any are selected, use the data object from the
    // selection instead
    rows = rows.map(function(row){
        return getSelectedItemById.call(this, row.ID) || row;
    }.bind(this));

    inst.currentData = rows;

    listWdg = inst.listWdg = inst.opt.ListWidget.create({items: rows});

    rows.forEach(function(row){
        if (isItemSelected.call(this, row)) {
            listWdg.selectItem(row);
        }
    }.bind(this));

    listWdg.on("item:selected", function(itemData){
        showItemAsSelected.call(this, itemData);
    }.bind(this));

    listWdg.on("item:unselected", removeItemFromSelected.bind(this));
    listWdg.appendTo(inst.$choicesHolder);
}

function isItemSelected(itemData){
    return PRIVATE.get(this).selected.has(itemData);
}

function getSelectedItemById(id) {
    if (!id) {
        return;
    }

    var selectedKeys    = PRIVATE.get(this).selected.keys(),
        response        = null,
        selectedItem;

    while (!response && !(selectedItem = selectedKeys.next()).done) {
        if (selectedItem.value.ID === id) {
            response = selectedItem.value;
        }
    }

    return response;
}

function getItemDataById(id){
    var data = PRIVATE.get(this).currentData,
        response;

    if (data && id) {
        data.some(function(itemData){
            if (itemData.ID === id) {
                response = itemData;
                return true;
            }
        });
    }

    return response;
}

function showItemAsSelected(itemData){
    var inst        = PRIVATE.get(this),
        selected    = inst.selected,
        itemWdg;

    // If itemData is already selected, exit
    if (selected.has(itemData)) {
        return;
    }

    if (!inst.allowMultiples) {
        clearAllSelected.call(this);
    }

    itemWdg = inst.opt.SelectedItemWidget.create({
        item: itemData
    });

    // Pipe events of the Selected Widget to LookupField prefixed with `selected:`
    itemWdg.pipe(this, "selected:");
    itemWdg.appendTo(inst.$selectedHolder);

    itemWdg.onDestroy(function(){
        if (selected.has(itemData)) {
            selected["delete"](itemData);
        }
    });

    selected.set(itemData, itemWdg);
    setSelectedCount.call(this);

    /**
     * An item was added to the list of selected items.
     * The selected item's data is provided to event callbacks
     *
     * @event LookupField#item:selected
     *
     * @type {Object}
     */
    this.emit("item:selected", itemData);

    /**
     * Items selection has changed
     *
     * @event LookupField#change
     */
    this.emit("change");
}

function removeItemFromSelected(itemData){
    var selected = PRIVATE.get(this).selected;
    if (selected.has(itemData)) {
        selected.get(itemData).destroy();
        selected["delete"](itemData);
    }
    setSelectedCount.call(this);

    /**
     * An item was added to the list of selected items.
     * The selected item's data is provided to event callbacks
     *
     * @event LookupField#item:unselected
     *
     * @type {Object}
     */
    this.emit("item:unselected", itemData);
    this.emit("change");
}

function clearAllSelected() {
    var selected = PRIVATE.get(this).selected;

    selected.forEach(function(selectedWdg){
        if (selectedWdg) {
            selectedWdg.remove();
            selectedWdg.destroy();
        }
    });

    selected.clear();
}

function setSelectedCount(){
    var inst    = PRIVATE.get(this),
        $count  = inst.$count;
    if ($count) {
        $count.textContent = inst.selected.size;
    }
}

LookupField = EventEmitter.extend(Widget, LookupField);
LookupField.defaults = {
    column:             null,
    fields:             null,
    selected:           null,   // Any format accepted by setSelected
    hideLabel:          false,
    hideDescription:    false,
    queryOptions:       {
        CAMLRowLimit: 100
    },
    allowMultiples:     null, // Only looked at when its set to a boolean
    searchColumns:      null,
    choicesZIndex:      0,  // Default to 5 via css file
    ListWidget:         List,
    SelectedItemWidget: SelectedItem,
    labels:             {
        placeholder:    "Choose...",
        selectedCount:  "{{count}} Selected",
        clear:          "Clear"
    }
};

export default LookupField;
