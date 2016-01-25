<%-- SPWIDGETS DEMO PAGE --%>
<%-- BUILD _BUILD_VERSION_NUMBER_ --%>
<%@ Page language="C#" MasterPageFile="~masterurl/default.master"    Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=12.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
    SPWidgets Showcase Demo
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitleInTitleArea" runat="server">
    <h2>SPWidgets Showcase</h2>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">

<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8">

<!--[if lt IE 10]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.3/es5-shim.min.js"></script>
<![endif]-->

<style type="text/css">
    body #s4-leftpanel {
        display:none;
    }
    .s4-ca {
        margin-left:0px;
    }
    /**
 * Stylesheet for the demo area
 */
/*! normalize.css v2.1.2 | MIT License | git.io/normalize */

/* ==========================================================================
   HTML5 display definitions
   ========================================================================== */

/**
 * Correct `block` display not defined in IE 8/9.
 */

#spwidgets_demo_cntr article,
#spwidgets_demo_cntr aside,
#spwidgets_demo_cntr details,
#spwidgets_demo_cntr figcaption,
#spwidgets_demo_cntr figure,
#spwidgets_demo_cntr footer,
#spwidgets_demo_cntr header,
#spwidgets_demo_cntr hgroup,
#spwidgets_demo_cntr main,
#spwidgets_demo_cntr nav,
#spwidgets_demo_cntr section,
#spwidgets_demo_cntr summary {
    display: block;
}

/**
 * Address `[hidden]` styling not present in IE 8/9.
 * Hide the `template` element in IE, Safari, and Firefox < 22.
 */

#spwidgets_demo_cntr [hidden],
#spwidgets_demo_cntr template {
    display: none;
}

/* ==========================================================================
   Links
   ========================================================================== */

/**
 * Address `outline` inconsistency between Chrome and other browsers.
 */

#spwidgets_demo_cntr a:focus {
    outline: thin dotted;
}

/**
 * Improve readability when focused and also mouse hovered in all browsers.
 */

#spwidgets_demo_cntr a:active,
#spwidgets_demo_cntr a:hover {
    outline: 0;
}

/* ==========================================================================
   Typography
   ========================================================================== */

/**
 * Address variable `h1` font-size and margin within `section` and `article`
 * contexts in Firefox 4+, Safari 5, and Chrome.
 */

#spwidgets_demo_cntr h1 {
    font-size: 2em;
    margin: 0.67em 0;
}

/**
 * Address styling not present in IE 8/9, Safari 5, and Chrome.
 */

#spwidgets_demo_cntr abbr[title] {
    border-bottom: 1px dotted;
}

/**
 * Address style set to `bolder` in Firefox 4+, Safari 5, and Chrome.
 */

#spwidgets_demo_cntr b,
#spwidgets_demo_cntr strong {
    font-weight: bold;
}

/**
 * Address styling not present in Safari 5 and Chrome.
 */

#spwidgets_demo_cntr dfn {
    font-style: italic;
}

/**
 * Address differences between Firefox and other browsers.
 */

#spwidgets_demo_cntr hr {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    height: 0;
}

/**
 * Address styling not present in IE 8/9.
 */

#spwidgets_demo_cntr mark {
    background: #ff0;
    color: #000;
}

/**
 * Correct font family set oddly in Safari 5 and Chrome.
 */

#spwidgets_demo_cntr code,
#spwidgets_demo_cntr kbd,
#spwidgets_demo_cntr pre,
#spwidgets_demo_cntr samp {
    font-family: monospace, serif;
    font-size: 1em;
}

/**
 * Improve readability of pre-formatted text in all browsers.
 */

#spwidgets_demo_cntr pre {
    white-space: pre-wrap;
}

/**
 * Set consistent quote types.
 */

#spwidgets_demo_cntr q {
    quotes: "\201C" "\201D" "\2018" "\2019";
}

/**
 * Address inconsistent and variable font size in all browsers.
 */

#spwidgets_demo_cntr small {
    font-size: 80%;
}

/**
 * Prevent `sub` and `sup` affecting `line-height` in all browsers.
 */

#spwidgets_demo_cntr sub,
#spwidgets_demo_cntr sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}

#spwidgets_demo_cntr sup {
    top: -0.5em;
}

#spwidgets_demo_cntr sub {
    bottom: -0.25em;
}

/* ==========================================================================
   Embedded content
   ========================================================================== */

/**
 * Remove border when inside `a` element in IE 8/9.
 */

#spwidgets_demo_cntr img {
    border: 0;
}

/**
 * Correct overflow displayed oddly in IE 9.
 */

#spwidgets_demo_cntr svg:not(:root) {
    overflow: hidden;
}

/* ==========================================================================
   Figures
   ========================================================================== */

/**
 * Address margin not present in IE 8/9 and Safari 5.
 */

#spwidgets_demo_cntr figure {
    margin: 0;
}

/* ==========================================================================
   Forms
   ========================================================================== */

/**
 * Define consistent border, margin, and padding.
 */

#spwidgets_demo_cntr fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
}

/**
 * 1. Correct `color` not being inherited in IE 8/9.
 * 2. Remove padding so people aren't caught out if they zero out fieldsets.
 */

#spwidgets_demo_cntr legend {
    border: 0; /* 1 */
    padding: 0; /* 2 */
}

/**
 * 1. Correct font family not being inherited in all browsers.
 * 2. Correct font size not being inherited in all browsers.
 * 3. Address margins set differently in Firefox 4+, Safari 5, and Chrome.
 */

#spwidgets_demo_cntr button,
#spwidgets_demo_cntr input,
#spwidgets_demo_cntr select,
#spwidgets_demo_cntr textarea {
    font-family: inherit; /* 1 */
    /* font-size: 100%; */ /* 2 */
    margin: 0; /* 3 */
}

/**
 * Address Firefox 4+ setting `line-height` on `input` using `!important` in
 * the UA stylesheet.
 */

#spwidgets_demo_cntr button,
#spwidgets_demo_cntr input {
    line-height: normal;
}

/**
 * Address inconsistent `text-transform` inheritance for `button` and `select`.
 * All other form control elements do not inherit `text-transform` values.
 * Correct `button` style inheritance in Chrome, Safari 5+, and IE 8+.
 * Correct `select` style inheritance in Firefox 4+ and Opera.
 */

#spwidgets_demo_cntr button,
#spwidgets_demo_cntr select {
    text-transform: none;
}

/**
 * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`
 *    and `video` controls.
 * 2. Correct inability to style clickable `input` types in iOS.
 * 3. Improve usability and consistency of cursor style between image-type
 *    `input` and others.
 */

#spwidgets_demo_cntr button,
#spwidgets_demo_cntr html input[type="button"], /* 1 */
#spwidgets_demo_cntr input[type="reset"],
#spwidgets_demo_cntr input[type="submit"] {
    -webkit-appearance: button; /* 2 */
    cursor: pointer; /* 3 */
}

/**
 * Re-set default cursor for disabled elements.
 */

#spwidgets_demo_cntr button[disabled],
#spwidgets_demo_cntr html input[disabled] {
    cursor: default;
}

/**
 * 1. Address box sizing set to `content-box` in IE 8/9.
 * 2. Remove excess padding in IE 8/9.
 */

#spwidgets_demo_cntr input[type="checkbox"],
#spwidgets_demo_cntr input[type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
}

/**
 * 1. Address `appearance` set to `searchfield` in Safari 5 and Chrome.
 * 2. Address `box-sizing` set to `border-box` in Safari 5 and Chrome
 *    (include `-moz` to future-proof).
 */

#spwidgets_demo_cntr input[type="search"] {
    -webkit-appearance: textfield; /* 1 */
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box; /* 2 */
    box-sizing: content-box;
}

/**
 * Remove inner padding and search cancel button in Safari 5 and Chrome
 * on OS X.
 */

#spwidgets_demo_cntr input[type="search"]::-webkit-search-cancel-button,
#spwidgets_demo_cntr input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
}

/**
 * Remove inner padding and border in Firefox 4+.
 */

#spwidgets_demo_cntr button::-moz-focus-inner,
#spwidgets_demo_cntr input::-moz-focus-inner {
    border: 0;
    padding: 0;
}

/**
 * 1. Remove default vertical scrollbar in IE 8/9.
 * 2. Improve readability and alignment in all browsers.
 */

#spwidgets_demo_cntr textarea {
    overflow: auto; /* 1 */
    vertical-align: top; /* 2 */
}

/* ==========================================================================
   Tables
   ========================================================================== */

/**
 * Remove most spacing between table cells.
 */

#spwidgets_demo_cntr table {
    border-collapse: collapse;
    border-spacing: 0;
}


/** ==================================================================== */
/** ==================================================================== */
/** ==[[   SPWIDGETS DEMO   ]]========================================== */
/** ==================================================================== */
/** ==================================================================== */
/** ==================================================================== */

#s4-leftpanel,
#sideNavBox {
    display:none !important;
}
.s4-ca,
#contentBox {
    margin-left: .5em !important;
    width: 98%;
}

#spwidgets_demo_cntr {
    padding: 1em;
    minHeight: 100em;;
}
#spwidgets_demo_cntr thead {
    display:table-header-group;
}
#spwidgets_demo_cntr tbody {
    display:table-row-group;
} 

#spwidgets_demo_cntr .spwidgets-demo-top-banner {
    padding:1em;
    margin:.5em;
}
#spwidgets_demo_cntr p {
    padding: .5em;
}

#spwidgets_demo_cntr .spwidget-demo-samples {
    padding: .5em;
}

/** LIST PICKER **/
#spwidgets_demo_cntr div.spwidgets-demo-list-picker {
    position: relative;
    width: 60%;
}

#spwidgets_demo_cntr div.spwidgets-demo-list-picker .spwidgets-demo-list-selector {
    position: absolute;
    z-index: 20;
    height: 15em;
    overflow: auto;
    width: 100%;
}
#spwidgets_demo_cntr div.spwidgets-demo-list-picker .spwidgets-demo-list-selected,
#spwidgets_demo_cntr div.spwidgets-demo-list-picker .spwidgets-demo-list-selector a {
    display: block;
    margin: 0.3em;
    padding: 0.5em;
    cursor: pointer;
}

/* Classes for when container has floating element */
#spwidgets_demo_cntr .spwidget-demo-fluid:before,
#spwidgets_demo_cntr .spwidget-demo-fluid:after {
    content: "";
    display: table;
    line-height: 0;
}
#spwidgets_demo_cntr .spwidget-demo-fluid:after {
    clear: both;
}

#spwidgets_demo_cntr .spwidget-demo-float-cntr div.spwidget-demo-float {
    float: left;
    width: 49%;
    overflow: visible;
    min-height: 40em;
}
#spwidgets_demo_cntr .spwidget-demo-float-cntr div.spwidget-demo-float:first-child {
    margin-right: .5%;
}

/* code container */
#spwidgets_demo_cntr .spwidget-demo-code {
    width: 98%;
    font-family: Monaco,Courier;
    font-size: 1.1em;
    min-height: 20em;
}
#spwidgets_demo_cntr textarea.spwidget-demo-code {
    height: 35em;
    resize: none;
}

/* Tabs within Tabs */
#spwidgets_demo_cntr .ui-tabs .ui-tabs {
    border: medium none;    
}
#spwidgets_demo_cntr .ui-tabs .ui-tabs .ui-tabs-nav {
    background: none repeat scroll 0 0 transparent;
    border-left: medium none;
    border-right: medium none;
    border-top: medium none;
}
#spwidgets_demo_cntr .ui-tabs .ui-tabs .ui-tabs-panel {
    border-top: 1px none;
    border-width: 1px;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    min-height: 40em;
}

/** LIST FILTER DEMO AREA */
#SPControlListFilterPanel #spwidgets_demo_filter_output {
    padding: .5em;
}
#SPControlListFilterPanel .spwidgets-list-filter {
    margin: 1em .5em;
    padding: .5em;
}

/** BOARD DEMO AREA */
#SPControlBoardDemo .ui-tabs-panel {
    min-height: 15em;
}
#SPControlBoardDemo .spwidget-board-demo-cntr {
    margin-top: 1.5em;
}
#SPControlBoardDemo  .spwidget-demo-code {
    padding: .5em;
}

/** LOOKUP FIELD AREA */
#SPControlLookupFieldDemo .spwidgets-demo-lookup-examples {
    padding: .5em;
}
#SPControlLookupFieldDemo div.spwidget-demo-float-cntr div.spwidget-demo-float {
    min-height: 70em;
}    


/** UPLOAD WIDGET */
#SPControlUploadDemo .spwidget-demo-upload-cntr {
    display: none;
}
#SPControlUploadDemo .spwidget-demo-library-files {
    min-height: 60em;
    margin-top: 1em;
}
#SPControlUploadDemo .spwidget-demo-library-files table,
#SPControlUploadDemo .spwidget-demo-library-files table tr,
#SPControlUploadDemo .spwidget-demo-library-files table td,
#SPControlUploadDemo .spwidget-demo-library-files table th {
    border-collapse: collapse;
}
#SPControlUploadDemo .spwidget-demo-library-files table th {
    font-size: 1.1em;
    font-weight: bold;
}

/** DATE WIDGET **/
#SPDateField div.spwidget-date-cntr {
    display: block;
}


</style>

</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderSearchArea" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderLeftActions" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageDescription" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderBodyRightMargin" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageImage" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderLeftNavBar" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderNavSpacer" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">

<script type="text/javascript">
/**
 * SPWidgets Demo
 *
 * Build Date:  2016-01-25
 * Version:     2.5.2 1453764504292
 *
 */
</script>
<div id="spwidgets_demo_cntr" class="ui-widget-content" style="display:none;">

<div class="spwidgets-demo-cntr"> <div class="spwidgets-demo-top-banner ui-state-active"> <h1>Demo of SPWidgets</h1> <p class="ui-widget-content ui-corner-all"> SPWidgets is a set of Sharepoint widgets meant to facilitate the building of custom UI's. This demo contains a showcase of the widgets that are available and serves to only scratch at the possibilities of what can be accomplished with them. Visit the project at <a href="http://purtuga.github.io/SPWidgets/">purtuga.github.io/SPWidgets</a> </p> </div> <div id="ptTabsCntr" style="display: none"> <ul> <li><a href="#SPControlUploadDemo"><span>Upload</span></a></li> <li><a href="#SPControlPickUserDemo"><span>People Picker</span></a></li> <li><a href="#SPControlBoardDemo"><span>Board</span></a></li> <li><a href="#SPControlLookupFieldDemo"><span>Lookup Field</span></a></li> <li><a href="#SPControlListFilterPanel"><span>List Filter Panel</span></a></li> <li><a href="#SPDateField"><span>Date Field</span></a></li> <li><a href="#SPWidgetsAbout"><span class="ui-icon ui-icon-info">Info</span></a></li> </ul> <div id="SPControlUploadDemo"> <h2>Upload Plugin</h2> <div style="padding: 1em;margin: 3em auto" class="ui-state-highlight"> Once an existing Document Library is selected, you will be presented with an upload button that will allow you to upload files to the root of the library selected. </div> <hr> <div> <div class="spwidgets-demo-lists"></div> <div class="spwidget-demo-upload-cntr"> <h3></h3> <div class="spwidget-demo-upload-widget"></div> <div> <span>Last File Uploaded: </span> <span class="spwidget-demo-upload-last-file"></span> </div> <div class="spwidget-demo-library-files"> <table width="100%" cellpadding="4" cellspacing="0"> <thead> <tr> <th class="ui-widget-header">File</th> <th class="ui-widget-header">Last Modified</th> <th class="ui-widget-header">Last Modified By</th> </tr> </thead> <tbody> </tbody> </table> </div> </div> </div> </div> <div id="SPControlPickUserDemo"> <h2>People Picker</h2> <div style="min-height: 300px"> <div style="padding: 1em;margin: 3em auto" class="ui-state-highlight"> Start typing the user name (last or first) and a list of suggested selections will be displayed. Because it is using jQuery UI, mouse or keyboard shortcuts can be used to select a user. The input field that was used to bind this plugin will be populated with the selected user information in the formta expected for update to the sharepoing list (ID;#userName) </div> <div> <h3>Demo 1: Basic People Picker</h3> <p>A basic setup on an input element.<br>(Note: Once a person is selected here, Demo number two will be initiated and made visible below.</p> <div> <label>User Name</label> <input type="text" name="spuserdemo"> <div id="sp_control_pick_user_detail" style="margin-top: 1em;padding:1em"></div> </div> <div> <h4>Events Output</h4> <div id="SPControlPickUserEventOut"> </div> </div> </div> <hr> <div id="spuserdemo2cntr" style="display:none"> <h3>Demo 2: Pre-populated People Picker</h3> <div>Input element in this example was pre-populated with <span class="spwidgets-demo-know-user"></span> and then initiated with the widget. Result should be a people picker that has 1 user already selected.</div> <div> <label>Person</label> <input type="text" name="spuserdemo2"> <div id="sp_control_pick_user_detail2" style="margin-top: 1em;padding:1em"></div> </div> </div> </div> </div> <div id="SPControlBoardDemo"> <h2>Kan-Ban Board Widget</h2> <div class="spwidget-demo-tabs"> <ul> <li> <a href="#spwidgets_demo_board_demo"> <span>Demo</span> </a> </li> <li> <a href="#spwidgets_demo_board_output"> <span>Output</span> </a> </li> <li> <a href="#spwidgets_demo_board_about"> <span>About</span> </a> </li> </ul> <div id="spwidgets_demo_board_demo"> <p> Click below to select a list followed by a column from that list. Reminder: Column must be of a type supported by the widget (Lookup, Choice).<br> The Board is configured to be displayed with a fixed height of 500px. </p> <div class="spwidgets-demo-lists"></div> <div class="spwidgets-demo-columns"></div> <div class="spwidget-board-demo-cntr"></div> </div> <div id="spwidgets_demo_board_output"> <p> Events fired by the widget will populate data here. </p> <div class="spwidget-demo-code ui-widget-content ui-corner-all"></div> </div> <div id="spwidgets_demo_board_about"> <p> The Board widget displays a Kan-Ban type board for list items, allowing the user to quickly move items around between states. The example below is using the Tasks List commonly used in all Sharepoint Sites, and specifically, the Status Field of that List. </p> </div> </div> </div> <div id="SPControlLookupFieldDemo"> <h2>Lookup Field Widget</h2> <div class="spwidget-demo-fluid spwidget-demo-float-cntr"> <div class="ui-widget-content ui-corner-all spwidget-demo-float"> <p>Click below to select a List.</p> <div class="spwidgets-demo-lists"></div> <div class="spwidgets-demo-lookup-examples"> <div> <h3>Example 1</h3> <p>Field below allows user to pick only 1 value.</p> <div> <input name="example1"> </div> </div> <div> <h3>Example 2</h3> <p>Field below allows user to select mulitple values (multi-select).</p> <div> <input name="example2"> </div> </div> <div> <h3>Example 3</h3> <p>Field below allows user to select mulitple values (multi-select) and displays the selector, which allows the user the ability to "browse" the list looking for the correct value. In addition, the List items are sorted by ID in Descending order.</p> <div> <input name="example3"> </div> <div class="spwidgets-dev-only"> <a href="javascript:" class="spwidgets-demo-lookup-example3-clear-all">Clear All</a> </div> </div> </div> </div> <div class="spwidget-demo-float"> <div class="spwidget-demo-tabs"> <ul> <li> <a href="#spwidgets_demo_lookup_output"> <span>Output</span> </a> </li> <li> <a href="#spwidgets_demo_lookup_about"> <span>About</span> </a> </li> </ul> <div id="spwidgets_demo_lookup_output"> <p> Area below will capture out of events from the demo. </p> <div class="spwidget-demo-code ui-widget-content ui-corner-all"></div> </div> <div id="spwidgets_demo_lookup_about"> <p> The Lookup Field widget provides a custom interface for List/Library field of type Lookup. It turns an input field into a Type-Ahead/autocomplete field allowing the user to start typing values and select a match from the suggestion. </p> </div> </div> </div> </div> </div> <div id="SPControlListFilterPanel"> <h2>List Filter Widget Demo</h2> <div class="spwidget-demo-fluid spwidget-demo-float-cntr"> <div class="ui-widget-content ui-corner-all spwidget-demo-float"> <p>This demo uses one of lists available on this site (picker below) and displays a filter panel for the fields on that list.</p> <p>Click below to select a List.</p> <div class="spwidgets-demo-lists"></div> <div class="spwidgets-list-filter ui-widget-content" style="padding: .5em"> </div> </div> <div class="spwidget-demo-float"> <div class="spwidget-demo-tabs"> <ul> <li> <a href="#spwidgets_demo_filter_results"> <span>Results</span> </a> </li> <li> <a href="#spwidgets_demo_filter_output"> <span>CAML XML</span> </a> </li> <li> <a href="#spwidgets_demo_filter_about"> <span>About</span> </a> </li> </ul> <div id="spwidgets_demo_filter_results"> <p> The results from the filter defined are displayed below. Results are limited only to the first 10 matches and the first 3 columns.. </p> <div class="spwidgets-demo-filter-result-output"> </div> </div> <div id="spwidgets_demo_filter_output"> <p> Click the filter button to see CAML generated from filter values entered. </p> <div class="spwidgets-list-filter-query"> <textarea name="camlquery" class="spwidget-demo-code"></textarea> </div> </div> <div id="spwidgets_demo_filter_about"> <p> The List Filter widget displays a filter panel to collect information from the user. Data can be used to then retrieve rows from the list using the criteria provided by the user. </p> <h3>Test: filter panel width adjustment</h3> <div style="padding: .5em; margin-bottom: 2em;margin-top:2em"> <div style="margin-bottom: 1em"> Use slider below to test width of container holding the filter panel and see how the content adjusts to the new width.</div> <div class="ui-widget-content spwidgets-list-filter-slider-value ui-corner-all" style="text-align:center;width:5em;padding:.5em;margin:.2em;font-size:1.5em;font-weight:bold">100%</div> <div class="spwidgets-list-filter-width" style="width: 50%"></div> </div> <h3>Test: setFilter</h3> <p>Set the ID column value via setFilter method. The column should be populated with a value of 'one;two', a match type of 'Contains' and a sort order of 'Ascending'. The column should be shown as dirty.</p> <p> <a id="spwidgets_demo_filter_test_setfilter" href="javascript:">Run</a> </p> <h3>Test: setFilter - sortOrder only</h3> <p>Set the ID column sortOrder only via setFilter method. Only the sort order should be set to 'Ascending' and the column should show dirty.</p> <p> <a id="spwidgets_demo_filter_test_sortOrder" href="javascript:">Run</a> </p> </div> </div> </div> </div> </div> <div id="SPDateField"> <h2>Date Widget</h2> <div class="spwidget-demo-fluid spwidget-demo-float-cntr"> <div class="ui-widget-content ui-corner-all spwidget-demo-float"> <div class="spwidget-demo-samples"> <p> <h3>Example 1: Default</h3> </p><p>Default functionality.</p> <div class="spwidget-demo-example1"> <input class="spwidget-demo-input" type="text" name="example1"> </div>  <hr> <p> <h3>Example 2: Allow Multiples</h3> </p><p>Allow multiple dates.</p> <div> <input class="spwidget-demo-input" type="text" name="example2"> </div>  <hr> <p> <h3>Example 3: Change Date Format</h3> </p><p>Override date input format to Euro - mm/dd/yyyy</p> <div> <input class="spwidget-demo-input" type="text" name="example3"> </div>  <hr> <p> <h3>Example 4: Pre-Defined Inputs</h3> </p><p> In this example, the input field used to bind SPDateField widget was already storing 2 dates: August 1, 2013 and August 2, 2013. </p> <div> <input class="spwidget-demo-input" type="text" name="example4" value="2013-08-01;2013-08-02"> </div>  <hr> <p> <h3>Example 5: Date and Time Picker</h3> </p><p> In this example, the widget is set to also show a time picker along with the date picker. Time is displayed along with date and the date string for use with SharePoint's API will include the time element in it. When picker is displayed, it will have the currently selected date pre-selected or if not has been set yet, it will defaul to current time/date. </p> <div> <input class="spwidget-demo-input" type="text" name="example5"> </div>  <hr> <p> <h3>Example 6: Date and Time Picker - Allow Multiples</h3> </p><p> Similar to Example 5, where a date and Time picker is displayed, but allows user to define multiples. </p> <div> <input class="spwidget-demo-input" type="text" name="example6"> </div>  <hr> <p> <h3>Example 7: Date and Time Picker - Pre-Defined Inputs</h3> </p><p> In this example, the input field used to bind SPDateField widget was already storing 2 dates: August 1, 2013 1:05 AM and August 2, 2013 4:30PM. This instance also shows the use of localized labels, like Time, Hour, Minutes. </p> <div> <input class="spwidget-demo-input" type="text" name="example7" value="2013-08-01T01:05:00;2013-08-02T16:30:00"> </div>  <hr> <p> <h3>Example 8: Date Picker Displayed inline on a non-input element</h3> </p><p> Example showing the Date picker being used on a non-input element. The dates selected by the user would have to be handled by the callback to the JQuery UI Datepicker widget. </p> <div class="spwidget-spdatefield-demo8"></div>  <hr> <p> <h3>Example 9: Date and Time Picker Displayed inline on a non-input element</h3> </p><p> Example showing the Date and Time picker being used on a non-input element. The dates selected by the user would have to be handled by the callback to the JQuery UI Datepicker widget. </p> <div class="spwidget-spdatefield-demo9"></div>  <p style="height: 15em"></p> </div> </div> <div class="spwidget-demo-float"> <div class="spwidget-demo-tabs"> <ul> <li> <a href="#spwidgets_demo_date_results"> <span>Results</span> </a> </li> <li> <a href="#spwidgets_demo_date_about"> <span>About</span> </a> </li> </ul> <div id="spwidgets_demo_date_results"> <p> As the dates are selected, the demo will output data to this area when the input element's change event is triggered. </p> <div class="spwidget-output"> </div> </div> <div id="spwidgets_demo_date_about"> <p> SPDateField is a widgets wrapped around jQuery UI Datepicker that allows the user to pick one or more dates using their own locale format, while storing the SharePoint friendly format (YYY-MM-DD) in the input field to which this widget was bound to. </p> </div> </div> </div> </div> </div>  <div id="SPWidgetsAbout"> <p> Below are the version of software currently being used for this demo showcase. </p> <ul class="spwidgets-demo-info-cntr"> </ul> </div>  </div> <div> <span>Build: </span><span>1446333998238</span> </div> <div> <div id="themeSwitchWidget"></div> </div> </div>

</div>

<script type="text/javascript" language="javascript">

setTimeout(function(){

    (function($){

        var jQuery = $;

        $(function(){

            $('<link rel="stylesheet" type="text/css" href="' +
                window.location.protocol +
                '//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/redmond/jquery-ui.css" />'
            )
            .appendTo("head");

/*! SPWidgets v2.5.2 2016-01-25 | MIT | Copyright (c) 2016 Paul Tavares | http://purtuga.github.io/SPWidgets */
/**
 * widget.board.demo.js
 * Code for the board widget demo.
 */
(function($){

    /* global SPWIDGET_DEMO */
    SPWIDGET_DEMO.demoInitializers.push(function(){

        var Main       = SPWIDGET_DEMO,
            $cntr       = $("#SPControlBoardDemo"),
            $boardCntr  = $cntr.find("div.spwidget-board-demo-cntr"),
            $colCntr    = $cntr.find("div.spwidgets-demo-columns"),
            $output     = $cntr.find(".spwidget-demo-code");


        // Create the tabs
        $cntr.find("div.spwidget-demo-tabs").tabs();

        // Populate the container to select a list
        Main.insertListSelector({
            container: $cntr.find("div.spwidgets-demo-lists"),
            onListSelect: function($list){

                var listName = $list.find("Title").text();

                $colCntr.empty();
                $boardCntr.empty();

                // Insert the column picker
                Main.insertListColumnSelector({
                    container:      $colCntr,
                    listName:       listName,
                    onColumnSelect: function(columnName){

                        // Kan-Ban Board
                        $("<div/>")
                            .appendTo( $boardCntr.empty() )
                            .on("spwidget:boardColumnChange", function(ev, $board, colObj){

                                $output.append(
                                    "<div>spwidget:boardColumnChange = Columns changed:" +
                                    colObj.join(" | ") + "</div>");

                            })
                            .SPShowBoard({
                                list:                   listName,
                                field:                  columnName,
                                showColPicker:          true,
                                colPickerLabel:         "Choose Columns",
                                colPickerCloseLabel:    "Close Picker",
                                colPickerApplyLabel:    "Change",
                                height:                 "500px"
                            });

                    }
                });

            }//end: insertListSelector.onListSelect()
        });

    });


})(SPWIDGET_DEMO.JQUERY || jQuery);

/**
 * widget.date.demo.js
 * Demo code for the Date widget
 *
 */
(function($){

    "use strict";
    /*global SPWIDGET_DEMO */

    SPWIDGET_DEMO.demoInitializers.push(function(){
        var Main        = SPWIDGET_DEMO,
            $cntr       = $("#SPDateField"),
            $demoCntr   = $cntr.find("div.spwidget-demo-samples"),
            output      = Main.setupLogOutput({ container: $cntr.find("div.spwidget-output") });


        //---------------------------------------

        // Create the tabs under this demo
        $cntr.find("div.spwidget-demo-tabs").tabs();

        // Initialize the demos
        $demoCntr.find("input[name='example1']")
            .SPDateField()
            .on("change", function(){
                output.log("Example 1: input change: " + $(this).val());
            });

        $demoCntr.find("input[name='example2']")
            .SPDateField({ allowMultiples: true })
            .on("change", function(){
                output.log("Example 2: input change: " + $(this).val());
            });

        $demoCntr.find("input[name='example3']")
            .SPDateField({
                allowMultiples: true,
                datepicker: {
                    dateFormat: "dd/mm/yy"
                }
            })
            .on("change", function(){
                output.log("Example 3: input change: " + $(this).val());
            });

        $demoCntr.find("input[name='example4']")
            .SPDateField({
                allowMultiples: true
            })
            .on("change", function(){
                output.log("Example 4: input change: " + $(this).val());
            });

        $demoCntr.find("input[name='example5']")
            .SPDateField({
                showTimepicker: true,
                datepicker:     {
                    dateFormat: "mm/dd/yy"
                }
            })
            .on("change", function(){
                output.log("Example 5: input change: " + $(this).val());
            });

        $demoCntr.find("input[name='example6']")
            .SPDateField({
                showTimepicker: true,
                allowMultiples: true
            })
            .on("change", function(){
                output.log("Example 6: input change: " + $(this).val());
            });


        $demoCntr.find("input[name='example7']")
            .SPDateField({
                showTimepicker: true,
                allowMultiples: true,
                labelAMPM:      'T. Day',
                labelTime:      'Select',
                labelMinutes:   'Min',
                labelHour:      'Hr',
                labelSet:       'Pick',
                timeUTC:        false
            })
            .on("change", function(){
                output.log("Example 7: input change: " + $(this).val());
            });

        $demoCntr.find("div.spwidget-spdatefield-demo8")
            .SPDateField({
                onSelect: function(){

                    output.log(
                        "Example 8: date change: " +
                        $(this).SPDateField("getDate").input
                    );

                }
            });

        $demoCntr.find("div.spwidget-spdatefield-demo9")
            .SPDateField({
                showTimepicker: true,
                onSelect: function() {

                    output.log(
                        "Example 9: date change: " +
                        $(this).SPDateField("getDate").input
                    );

                }
            });

    });

})(SPWIDGET_DEMO.JQUERY || jQuery);

/**
 * widget.filter.demo.js
 * Demo code for the Filter Panel widget
 *
 */
(function($){

    /* global SPWIDGET_DEMO, vkbeautify */

    SPWIDGET_DEMO.demoInitializers.push(function(){
        var Main        = SPWIDGET_DEMO,
            $cntr       = $("#SPControlListFilterPanel"),
            $textarea   = $cntr.find("textarea"),
            $demoCntr   = $cntr.find("div.spwidgets-list-filter"),
            $sliderVal  = $cntr.find("div.spwidgets-list-filter-slider-value"),
            $results    = $cntr.find("div.spwidgets-demo-filter-result-output");


        //---------------------------------------

        // Create the tabs under this demo
        $cntr.find("div.spwidget-demo-tabs").tabs();


        // Insert the set of Lists on this site and when user
        // selects one, get is list of columns and display a filter
        // panel for it.
        Main.insertListSelector({
            container:          $cntr.find("div.spwidgets-demo-lists"),
            includeLibraries:   false,
            onListSelect:       function($listInfo){

                var listName = $listInfo.find("Title").text();

                $results.html("");

                // Get a list of columns for this list and then
                // display a filter panel for them.
                Main.getListColumns(listName).then(function(columns){

                    var tblHeader   = '',
                        rowTemplate = '',
                        camlFields  = '';

                    $demoCntr
                        .empty()
                        .SPFilterPanel({
                            list:       listName,
                            columns:    columns,
                            height:     "25em",
                            onFilterClick: function(filters){

                                var query = '<Query><Where>' +
                                                filters.CAMLQuery +
                                                '</Where>' +
                                                filters.CAMLOrderBy +
                                            '</Query>';
                                $textarea.val(
                                    vkbeautify.xml( query ) +
                                    "\n\n--------------------------\n" +
                                    decodeURIComponent(filters.URLParams)
                                );

                                $results.html("<p>Loading...</p>");

                                // Retrieve data from this list using the
                                // filter defined by the user
                                $.SPWidgets.SPAPI.getListItems({
                                    listName:       listName,
                                    async:          true,
                                    cacheXML:       true,
                                    CAMLQuery:      query,
                                    CAMLRowLimit:   10,
                                    CAMLViewFields: camlFields,
                                    completefunc:   function(xData, status, rows){

                                        $results.html(
                                            "<table width='98%' class='ui-widget-content'>" +
                                                tblHeader +
                                                $.SPWidgets.fillTemplate(
                                                    rowTemplate,
                                                    rows
                                                ) +
                                            "</table>"
                                        );


                                    } //end: completefunc()
                                });

                            } //end: onFilterClick()
                        });

                    // Get the list of columns and build the output template
                    // with the columns thta are used in the Filter panel.
                    $.SPWidgets.SPAPI.getListColumns({
                        listName:   listName,
                        cacheXML:   false
                    })
                    .then(function(colDefList) {

                        $.each(columns, function(i, col){

                            var thisColDef = colDefList.getColumn(col);
                            if (thisColDef) {
                                tblHeader   += '<th class="ui-widget-content">' +
                                                col + '</th>';
                                rowTemplate += '<td class="ui-widget-content">{{' +
                                                thisColDef.StaticName + '}}</td>';
                                camlFields  += '<FieldRef Name="' + thisColDef.StaticName + '" />';
                                if (i === 2) {
                                    return false;
                                }
                            }

                        });

                        tblHeader   = '<tr>' + tblHeader + '</tr>';
                        rowTemplate = '<tr>' + rowTemplate + '</tr>';
                        camlFields  = '<ViewFields>' + camlFields + '</ViewFields>';

                    });

                });
            }
        });


        $cntr.find("div.spwidgets-list-filter-width")
            .slider({
                orientation: "horizontal",
                min:    10,
                max:    100,
                value:  100,
                slide:  function(ev, ui){

                    $demoCntr.css("width", ui.value + "%");
                    $sliderVal.html(ui.value + "%");

                }
            });

        // Setup setFilter test
        $cntr.find('a#spwidgets_demo_filter_test_setfilter')
            .button()
            .on("click", function(/*ev*/){

                $demoCntr.SPFilterPanel("setfilter", {
                    ID: {
                        values: ["one", "two"],
                        matchType: "Contains",
                        sortOrder: "Asc"
                    }
                });

            });

        // Setup sortOrder setfilter
        $cntr.find('a#spwidgets_demo_filter_test_sortOrder')
            .button()
            .on("click", function(/*ev*/){

                $demoCntr.SPFilterPanel("setfilter", {
                    ID: {
                        sortOrder: "Asc"
                    }
                });

            });

    });

})(SPWIDGET_DEMO.JQUERY || jQuery);

/**
 * widget.lookup.demo.js
 * Code for the lookup field widget.
 */
(function($){

    /* global SPWIDGET_DEMO */
    SPWIDGET_DEMO.demoInitializers.push(function(){
        var Main        = SPWIDGET_DEMO,
            $cntr       = $("#SPControlLookupFieldDemo"),
            $lookups    = $cntr.find("div.spwidgets-demo-lookup-examples"),
            lookupTmplt = '',
            $output     = $cntr.find(".spwidget-demo-code");


        $cntr.find("div.spwidget-demo-tabs").tabs();

        lookupTmplt = $lookups.html();

        $lookups.empty();

        Main.insertListSelector({
            container: $cntr.find("div.spwidgets-demo-lists"),
            onListSelect: function($list){

                var listName = $list.find("Title").text();

                $lookups
                    .html($.trim(lookupTmplt))
                    .find("input[name='example1']")
                        .change(function(){

                            $output.append(
                                "<div>Example 1 input Value: " +
                                $(this).val() + "</div>");

                        })
                        .SPLookupField({
                            list:           listName,
                            allowMultiples: false,
                            showSelector:   true
                        })
                        .end()
                    .find("input[name='example2']")
                        .change(function(){

                            $output.append(
                                "<div>Example 2 input Value: " +
                                $(this).val() + "</div>");

                        })
                        .SPLookupField({
                            list:           listName,
                            allowMultiples: true
                        })
                        .end()
                    .find("input[name='example3']")
                        .change(function(){

                            $output.append(
                                "<div>Example 3 input Value: " +
                                $(this).val() + "</div>");

                        })
                        .SPLookupField({
                            list:           listName,
                            allowMultiples: true,
                            showSelector:   true,
                            maxResults:     10,
                            listTemplate:   '#{{ID}}: {{Title}}',
                            filterOrderBy:  '<OrderBy><FieldRef Name="ID" Ascending="FALSE"/></OrderBy>',
                            onItemAdd:      function($newItemSelection, itemObject/*, widgetCntr*/){

                                $output.append(
                                "<div>Example 3 onItemAdd Event: Item ID " +
                                itemObject.ID + " was added: " +
                                itemObject.Title + "</div>");

                            },
                            onItemRemove:   function($items, itemObjects/*, $widgetCntr*/) {

                                var removedItems = "";

                                $.each(itemObjects, function(i, item){

                                    if (removedItems.length) {

                                        removedItems += " | ";

                                    }

                                    removedItems += item.Title;

                                });

                                $output.append(
                                "<div>Example 3 onItemRemove Event: [" +
                                removedItems + "] were removed!</div>");

                            }
                        })
                        .end()
                    .find(".spwidgets-demo-lookup-example3-clear-all")
                        .click(function(){

                            $lookups.find("input[name='example3']")
                                .SPLookupField("method", "clear");

                        })
                        .end();

            }
        });

    });

})(SPWIDGET_DEMO.JQUERY || jQuery);

/**
 * widget.people.demo.js
 * Code for the people picker widget.
 */
(function($){

    /* global SPWIDGET_DEMO */
    SPWIDGET_DEMO.demoInitializers.push(function(){
        var $cntr                   = $("#SPControlPickUserDemo"),
            $output                 = $cntr.find("#SPControlPickUserEventOut"),
            prePopuplatedInputDone  = false,
            knownUserString         = '';

        /**
         * Logs output to the people picker output area
         */
        function logOutput(data) {

            $output.append($("<div/>").html(data));

        }

        function initPrePopulatedInputDemo(){

            $("#spuserdemo2cntr")
                .find("input")
                    .val(knownUserString)
                    .pickSPUser({
                        type: 'All',
                        minLength: 3,
                        onPickUser: function(u){

                            logOutput("onPickUser Person added: " + u.displayName + ")");
                        }
                    })
                    .end()
                .show()
                .find(".spwidgets-demo-know-user")
                    .html(knownUserString);

        }

        // SEtup listners
        $cntr
            .on("spwidget:peoplePickerCreate", function(/*ev, $input*/){

                logOutput("spwidget:peoplePickerCreate EVENT TRIGGERED!");

            })
            .on("spwidget:peoplePickerAdd", function(ev, $input, personObj){

                logOutput(
                    "spwidget:peoplePickerAdd TRIGGERED! (Person: " +
                    personObj.displayName + ")");

            })
            .on("spwidget:peoplePickerRemove", function(ev, $input, personObj){

                logOutput(
                    "spwidget:peoplePickerRemove TRIGGERED! (Person: " +
                    personObj.displayName + ")");

            });

        // Attach widget to input.
        $("input[name='spuserdemo']").pickSPUser({
            type: 'All',
            minLength: 1,
            onPickUser: function(u){

                logOutput("onPickUser CALLED!(Person: " + u.displayName + ")");

                $("#sp_control_pick_user_detail")
                    .empty()
                    .append(
                        '<div>The following User was selected:</div>' +
                        '<div>User Name: ' + u.displayName + '</div>' +
                        '<div>Account Name: ' + u.accountName + '</div>' +
                        '<div>Account ID: ' + u.accountId + '</div>' +
                        '<div>Account Type: ' + u.accountType + '</div>'
                    );

                // If Demo 2 is not yet initiated, do it now.
                if (!prePopuplatedInputDone) {

                    prePopuplatedInputDone  = true;
                    knownUserString         = $(this).val();

                    initPrePopulatedInputDemo();

                    logOutput("NOTE: SECOND DEMO WAS INITIATED!");

                }

            },
            onCreate: function(/*$input*/) {

                logOutput("onCreate CALLED!");

            },
            onRemoveUser: function($input, $ui, person){

                logOutput("onRemoveUser CALLED! (Person: " + person.displayName + ")");

            }
        });

    });

})(SPWIDGET_DEMO.JQUERY || jQuery);

/**
 * widget.upload.demo.js
 * Code for the upload widget demo.
 */
(function($){

    "use strict";
    /*global SPWIDGET_DEMO */
    SPWIDGET_DEMO.demoInitializers.push(function(){
        var Main        = SPWIDGET_DEMO,
            $ui         = Main.$ui.find("#SPControlUploadDemo"),
            $demoCntr   = $ui.find("div.spwidget-demo-upload-cntr"),
            $widgetCntr = $demoCntr.find("div.spwidget-demo-upload-widget"),
            $libFiles   = $demoCntr.find("div.spwidget-demo-library-files > table tbody"),
            $lastFile   = $demoCntr.find(".spwidget-demo-upload-last-file");

        /**
         * Removes the internal representation of a lookup value and
         * return only the expected visible value.
         */
        function getLookupFieldValue(xmlFieldValue, returnID){

            if (!xmlFieldValue) {

                return "";

            }

            if (xmlFieldValue.indexOf("#") < 0) {

                return xmlFieldValue;

            }

            var field = xmlFieldValue.substring(xmlFieldValue.indexOf("#") + 1);

            if (returnID) {

                field = parseInt(xmlFieldValue.substring(0, xmlFieldValue.indexOf(";")));

            }

            return field;

        } //end: getLookupFieldValue

        /**
         *  Pulls in all files under th elibrary's root folder and displays them
         *  on the page, under the Files container.
         */
        function refreshFileList(listName) {

            $.SPWidgets.SPAPI.getListItems({
                async:      true,
                listName:   listName,
                CAMLQuery:  '<Query><Where>' +
                        "<Neq>" +
                            "<FieldRef Name='ContentType' />" +
                            "<Value Type='Text'>Folder</Value>" +
                        "</Neq>" +
                        "</Where>" +
                        "<OrderBy>"+
                            "<FieldRef Name='Title' Ascending='True' />" +
                        "</OrderBy></Query>",
                CAMLViewFields: "<ViewFields>" +
                        "<FieldRef Name='Title'/>" +
                        "<FieldRef Name='FileLeafRef'/>" +
                        "<FieldRef Name='Filename'/>" +
                        "<FieldRef Name='ContentType'/>" +
                        "<FieldRef Name='Editor'/>" +
                        "<FieldRef Name='Modified'/>" +
                        "<FieldRef Name='EncodedAbsUrl'/>" +
                        "<FieldRef Name='DocIcon'/>" +
                        "</ViewFields>",
                CAMLRowLimit: 0,
                completefunc: function(xData/*, Status*/) {

                    var r = $.SPWidgets.SPAPI.getNodesFromXml({
                                xDoc: xData.responseXML,
                                nodeName: "z:row",
                                asJQuery: true
                            }),
                        s = "";

                    if (!r.length) {

                        $libFiles.append("<tr><td colspan='20' class='ui-widget-content'>No documents found at root of Document Library!</td></tr>");

                        return;

                    }

                    r.each(function(){

                        var d = $(this);

                        s += '<tr>' +
                            '<td class="ui-widget-content">' + getLookupFieldValue(d.attr("ows_FileLeafRef")) + '</td>' +
                            '<td class="ui-widget-content">' + d.attr("ows_Modified") + '</td>' +
                            '<td class="ui-widget-content">' + getLookupFieldValue(d.attr("ows_Editor")) + '</td>' +
                        '</tr>';

                    });

                    $libFiles.html(s);

                }//end: completefunc()
            });
        }//end: refreshFileList()


        // Insert the list picker
        Main.insertListSelector({
            container:      $ui.find("div.spwidgets-demo-lists"),
            includeLists:   false,
            onListSelect:   function($library){

                var libraryName = $library.find("Title").text();

                refreshFileList(libraryName);

                $demoCntr.show();

                $widgetCntr
                    .empty()
                    .append("<h3>Upload with Overwrite = False</h3>");

                $("<div/>")
                    .appendTo($widgetCntr)
                    .SPControlUpload({
                        listName:       libraryName,
                        debug:          Main.debug,
                        onUploadDone:   function(file){

                            refreshFileList(libraryName);

                            $lastFile.html(decodeURIComponent(file.EncodedAbsUrl));

                        }
                    });

                $widgetCntr
                    .append("<h3>Upload with Overwrite = True</h3>");

                $("<div/>")
                    .appendTo($widgetCntr)
                    .SPControlUpload({
                        listName:       libraryName,
                        debug:          Main.debug,
                        overwrite:      true,
                        onUploadDone:   function(file){

                            refreshFileList(libraryName);

                            $lastFile.html(decodeURIComponent(file.EncodedAbsUrl));

                        }
                    });

            }//end: onListSelect()
        });

    });

})(SPWIDGET_DEMO.JQUERY || jQuery);



            // Lets initialize the demos
            SPWIDGET_DEMO.init();

        }); //end: ready()

    })(
        // Execute the function below to load all the needed libraries
        // and then return the jQuery object as input to the function
        // above.
        (function(){

            if (!window.SPWIDGET_DEMO) {

                window.SPWIDGET_DEMO = {};

            }

            window.SPWIDGET_DEMO.JQUERY = null;

/*! SPWidgets v2.5.2 2016-01-25 | MIT | Copyright (c) 2016 Paul Tavares | http://purtuga.github.io/SPWidgets */
/*! jQuery v1.11.2 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.2",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b=a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=hb(),z=hb(),A=hb(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},eb=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fb){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function gb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+rb(o[l]);w=ab.test(a)&&pb(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function hb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ib(a){return a[u]=!0,a}function jb(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function kb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function lb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function nb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function ob(a){return ib(function(b){return b=+b,ib(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pb(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=gb.support={},f=gb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=gb.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",eb,!1):e.attachEvent&&e.attachEvent("onunload",eb)),p=!f(g),c.attributes=jb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=jb(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=jb(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(jb(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),jb(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&jb(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return lb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?lb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},gb.matches=function(a,b){return gb(a,null,null,b)},gb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return gb(b,n,null,[a]).length>0},gb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},gb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},gb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},gb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=gb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=gb.selectors={cacheLength:50,createPseudo:ib,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||gb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&gb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=gb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||gb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ib(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ib(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ib(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ib(function(a){return function(b){return gb(a,b).length>0}}),contains:ib(function(a){return a=a.replace(cb,db),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ib(function(a){return W.test(a||"")||gb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:ob(function(){return[0]}),last:ob(function(a,b){return[b-1]}),eq:ob(function(a,b,c){return[0>c?c+b:c]}),even:ob(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:ob(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:ob(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:ob(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=mb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=nb(b);function qb(){}qb.prototype=d.filters=d.pseudos,d.setFilters=new qb,g=gb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?gb.error(a):z(a,i).slice(0)};function rb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function tb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ub(a,b,c){for(var d=0,e=b.length;e>d;d++)gb(a,b[d],c);return c}function vb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wb(a,b,c,d,e,f){return d&&!d[u]&&(d=wb(d)),e&&!e[u]&&(e=wb(e,f)),ib(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ub(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:vb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=vb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=vb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sb(function(a){return a===b},h,!0),l=sb(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sb(tb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wb(i>1&&tb(m),i>1&&rb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xb(a.slice(i,e)),f>e&&xb(a=a.slice(e)),f>e&&rb(a))}m.push(c)}return tb(m)}function yb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=vb(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&gb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ib(f):f}return h=gb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,yb(e,d)),f.selector=a}return f},i=gb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&pb(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&rb(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&pb(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=jb(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),jb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||kb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&jb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||kb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),jb(function(a){return null==a.getAttribute("disabled")})||kb(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),gb}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;
return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function ab(){return!0}function bb(){return!1}function cb(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==cb()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===cb()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ab:bb):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:bb,isPropagationStopped:bb,isImmediatePropagationStopped:bb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ab,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ab,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ab,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=bb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=bb),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function db(a){var b=eb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var eb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fb=/ jQuery\d+="(?:null|\d+)"/g,gb=new RegExp("<(?:"+eb+")[\\s/>]","i"),hb=/^\s+/,ib=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,jb=/<([\w:]+)/,kb=/<tbody/i,lb=/<|&#?\w+;/,mb=/<(?:script|style|link)/i,nb=/checked\s*(?:[^=]|=\s*.checked.)/i,ob=/^$|\/(?:java|ecma)script/i,pb=/^true\/(.*)/,qb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,rb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sb=db(y),tb=sb.appendChild(y.createElement("div"));rb.optgroup=rb.option,rb.tbody=rb.tfoot=rb.colgroup=rb.caption=rb.thead,rb.th=rb.td;function ub(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ub(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function vb(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wb(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xb(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function yb(a){var b=pb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function zb(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Ab(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Bb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xb(b).text=a.text,yb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=db(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(lb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(jb.exec(f)||["",""])[1].toLowerCase(),l=rb[i]||rb._default,h.innerHTML=l[1]+f.replace(ib,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&hb.test(f)&&p.push(b.createTextNode(hb.exec(f)[0])),!k.tbody){f="table"!==i||kb.test(f)?"<table>"!==l[1]||kb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ub(p,"input"),vb),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ub(o.appendChild(f),"script"),g&&zb(h),c)){e=0;while(f=h[e++])ob.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ub(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&zb(ub(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ub(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fb,""):void 0;if(!("string"!=typeof a||mb.test(a)||!k.htmlSerialize&&gb.test(a)||!k.leadingWhitespace&&hb.test(a)||rb[(jb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ib,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ub(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ub(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&nb.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ub(i,"script"),xb),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ub(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,yb),j=0;f>j;j++)d=g[j],ob.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qb,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Cb,Db={};function Eb(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fb(a){var b=y,c=Db[a];return c||(c=Eb(a,b),"none"!==c&&c||(Cb=(Cb||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Cb[0].contentWindow||Cb[0].contentDocument).document,b.write(),b.close(),c=Eb(a,b),Cb.detach()),Db[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Gb=/^margin/,Hb=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ib,Jb,Kb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ib=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Hb.test(g)&&Gb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ib=function(a){return a.currentStyle},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Hb.test(g)&&!Kb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Lb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Mb=/alpha\([^)]*\)/i,Nb=/opacity\s*=\s*([^)]*)/,Ob=/^(none|table(?!-c[ea]).+)/,Pb=new RegExp("^("+S+")(.*)$","i"),Qb=new RegExp("^([+-])=("+S+")","i"),Rb={position:"absolute",visibility:"hidden",display:"block"},Sb={letterSpacing:"0",fontWeight:"400"},Tb=["Webkit","O","Moz","ms"];function Ub(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Tb.length;while(e--)if(b=Tb[e]+c,b in a)return b;return d}function Vb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fb(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wb(a,b,c){var d=Pb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Yb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ib(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Jb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Hb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xb(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Jb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ub(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ub(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Jb(a,b,d)),"normal"===f&&b in Sb&&(f=Sb[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Ob.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Rb,function(){return Yb(a,b,d)}):Yb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ib(a);return Wb(a,c,d?Xb(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Nb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Mb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Mb.test(f)?f.replace(Mb,e):f+" "+e)}}),m.cssHooks.marginRight=Lb(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Jb,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Gb.test(a)||(m.cssHooks[a+b].set=Wb)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ib(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Vb(this,!0)},hide:function(){return Vb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Zb(a,b,c,d,e){return new Zb.prototype.init(a,b,c,d,e)
}m.Tween=Zb,Zb.prototype={constructor:Zb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Zb.propHooks[this.prop];return a&&a.get?a.get(this):Zb.propHooks._default.get(this)},run:function(a){var b,c=Zb.propHooks[this.prop];return this.pos=b=this.options.duration?m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Zb.propHooks._default.set(this),this}},Zb.prototype.init.prototype=Zb.prototype,Zb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Zb.propHooks.scrollTop=Zb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Zb.prototype.init,m.fx.step={};var $b,_b,ac=/^(?:toggle|show|hide)$/,bc=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cc=/queueHooks$/,dc=[ic],ec={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bc.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bc.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fc(){return setTimeout(function(){$b=void 0}),$b=m.now()}function gc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hc(a,b,c){for(var d,e=(ec[b]||[]).concat(ec["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ic(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fb(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fb(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ac.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fb(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hc(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jc(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kc(a,b,c){var d,e,f=0,g=dc.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$b||fc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$b||fc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jc(k,j.opts.specialEasing);g>f;f++)if(d=dc[f].call(j,a,k,j.opts))return d;return m.map(k,hc,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kc,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],ec[c]=ec[c]||[],ec[c].unshift(b)},prefilter:function(a,b){b?dc.unshift(a):dc.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kc(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gc(b,!0),a,d,e)}}),m.each({slideDown:gc("show"),slideUp:gc("hide"),slideToggle:gc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($b=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$b=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_b||(_b=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_b),_b=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lc=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lc,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mc,nc,oc=m.expr.attrHandle,pc=/^(?:checked|selected)$/i,qc=k.getSetAttribute,rc=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nc:mc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rc&&qc||!pc.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qc?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nc={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rc&&qc||!pc.test(c)?a.setAttribute(!qc&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=oc[b]||m.find.attr;oc[b]=rc&&qc||!pc.test(b)?function(a,b,d){var e,f;return d||(f=oc[b],oc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,oc[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rc&&qc||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mc&&mc.set(a,b,c)}}),qc||(mc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},oc.id=oc.name=oc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mc.set},m.attrHooks.contenteditable={set:function(a,b,c){mc.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sc=/^(?:input|select|textarea|button|object)$/i,tc=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sc.test(a.nodeName)||tc.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var uc=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(uc," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vc=m.now(),wc=/\?/,xc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yc,zc,Ac=/#.*$/,Bc=/([?&])_=[^&]*/,Cc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Dc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ec=/^(?:GET|HEAD)$/,Fc=/^\/\//,Gc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hc={},Ic={},Jc="*/".concat("*");try{zc=location.href}catch(Kc){zc=y.createElement("a"),zc.href="",zc=zc.href}yc=Gc.exec(zc.toLowerCase())||[];function Lc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mc(a,b,c,d){var e={},f=a===Ic;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nc(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Oc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zc,type:"GET",isLocal:Dc.test(yc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nc(Nc(a,m.ajaxSettings),b):Nc(m.ajaxSettings,a)},ajaxPrefilter:Lc(Hc),ajaxTransport:Lc(Ic),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zc)+"").replace(Ac,"").replace(Fc,yc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yc[1]&&c[2]===yc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yc[3]||("http:"===yc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mc(Hc,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Ec.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bc.test(e)?e.replace(Bc,"$1_="+vc++):e+(wc.test(e)?"&":"?")+"_="+vc++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mc(Ic,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Oc(k,v,c)),u=Pc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qc=/%20/g,Rc=/\[\]$/,Sc=/\r?\n/g,Tc=/^(?:submit|button|image|reset|file)$/i,Uc=/^(?:input|select|textarea|keygen)/i;function Vc(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rc.test(a)?d(a,e):Vc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vc(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vc(c,a[c],b,e);return d.join("&").replace(Qc,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Uc.test(this.nodeName)&&!Tc.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sc,"\r\n")}}):{name:b.name,value:c.replace(Sc,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zc()||$c()}:Zc;var Wc=0,Xc={},Yc=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xc)Xc[a](void 0,!0)}),k.cors=!!Yc&&"withCredentials"in Yc,Yc=k.ajax=!!Yc,Yc&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xc[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zc(){try{return new a.XMLHttpRequest}catch(b){}}function $c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _c=[],ad=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_c.pop()||m.expando+"_"+vc++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ad.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ad.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ad,"$1"+e):b.jsonp!==!1&&(b.url+=(wc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_c.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bd=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bd)return bd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cd=a.document.documentElement;function dd(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dd(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cd;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cd})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dd(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=Lb(k.pixelPosition,function(a,c){return c?(c=Jb(a,b),Hb.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ed=a.jQuery,fd=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fd),b&&a.jQuery===m&&(a.jQuery=ed),m},typeof b===K&&(a.jQuery=a.$=m),m});
//# sourceMappingURL=jquery.min.map
/*! jQuery UI - v1.11.2 - 2014-10-16
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, draggable.js, droppable.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js, menu.js, progressbar.js, resizable.js, selectable.js, selectmenu.js, slider.js, sortable.js, spinner.js, tabs.js, tooltip.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(t,s){var n,a,o,r=t.nodeName.toLowerCase();return"area"===r?(n=t.parentNode,a=n.name,t.href&&a&&"map"===n.nodeName.toLowerCase()?(o=e("img[usemap='#"+a+"']")[0],!!o&&i(o)):!1):(/input|select|textarea|button|object/.test(r)?!t.disabled:"a"===r?t.href||s:s)&&i(t)}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}function s(e){for(var t,i;e.length&&e[0]!==document;){if(t=e.css("position"),("absolute"===t||"relative"===t||"fixed"===t)&&(i=parseInt(e.css("zIndex"),10),!isNaN(i)&&0!==i))return i;e=e.parent()}return 0}function n(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},e.extend(this._defaults,this.regional[""]),this.regional.en=e.extend(!0,{},this.regional[""]),this.regional["en-US"]=e.extend(!0,{},this.regional.en),this.dpDiv=a(e("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function a(t){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.delegate(i,"mouseout",function(){e(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).removeClass("ui-datepicker-next-hover")}).delegate(i,"mouseover",o)}function o(){e.datepicker._isDisabledDatepicker(v.inline?v.dpDiv.parent()[0]:v.input[0])||(e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),e(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).addClass("ui-datepicker-next-hover"))}function r(t,i){e.extend(t,i);for(var s in i)null==i[s]&&(t[s]=i[s]);return t}function h(e){return function(){var t=this.element.val();e.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change")}}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var i=this.css("position"),s="absolute"===i,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var t=e(this);return s&&"static"===t.css("position")?!1:n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&a.length?a:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(i){return t(i,!isNaN(e.attr(i,"tabindex")))},tabbable:function(i){var s=e.attr(i,"tabindex"),n=isNaN(s);return(n||s>=0)&&t(i,!n)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function s(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(a,s(this,t)+"px")})},e.fn["outer"+i]=function(t,n){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(a,s(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,s,n=e(this[0]);n.length&&n[0]!==document;){if(i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0}}),e.ui.plugin={add:function(t,i,s){var n,a=e.ui[t].prototype;for(n in s)a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]])},call:function(e,t,i,s){var n,a=e.plugins[t];if(a&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(n=0;a.length>n;n++)e.options[a[n][0]]&&a[n][1].apply(e.element,i)}};var l=0,u=Array.prototype.slice;e.cleanData=function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove")}catch(o){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var n,a,o,r,h={},l=t.split(".")[0];return t=t.split(".")[1],n=l+"-"+t,s||(s=i,i=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[l]=e[l]||{},a=e[l][t],o=e[l][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new o(e,t)},e.extend(o,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i,r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(h[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},n=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}(),void 0):(h[t]=s,void 0)}),o.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},h,{constructor:o,namespace:l,widgetName:t,widgetFullName:n}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete a._childConstructors):i._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(t){for(var i,s,n=u.call(arguments,1),a=0,o=n.length;o>a;a++)for(i in n[a])s=n[a][i],n[a].hasOwnProperty(i)&&void 0!==s&&(t[i]=e.isPlainObject(s)?e.isPlainObject(t[i])?e.widget.extend({},t[i],s):e.widget.extend({},s):s);return t},e.widget.bridge=function(t,i){var s=i.prototype.widgetFullName||t;e.fn[t]=function(n){var a="string"==typeof n,o=u.call(arguments,1),r=this;return n=!a&&o.length?e.widget.extend.apply(null,[n].concat(o)):n,a?this.each(function(){var i,a=e.data(this,s);return"instance"===n?(r=a,!1):a?e.isFunction(a[n])&&"_"!==n.charAt(0)?(i=a[n].apply(a,o),i!==a&&void 0!==i?(r=i&&i.jquery?r.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+n+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+n+"'")}):this.each(function(){var t=e.data(this,s);t?(t.option(n||{}),t._init&&t._init()):e.data(this,s,new i(n,this))}),r}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=l++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,n,a,o=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(o={},s=t.split("."),t=s.shift(),s.length){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;s.length-1>a;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(t=s.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,i,s){var n,a=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){return t||a.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(i).undelegate(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,o=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}}),e.widget;var d=!1;e(document).mouseup(function(){d=!1}),e.widget("ui.mouse",{version:"1.11.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(!d){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var i=this,s=1===t.which,n="string"==typeof this.options.cancel&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(t)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(t)!==!1,!this._mouseStarted)?(t.preventDefault(),!0):(!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e)},this._mouseUpDelegate=function(e){return i._mouseUp(e)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),d=!0,!0)):!0}},_mouseMove:function(t){if(this._mouseMoved){if(e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button)return this._mouseUp(t);if(!t.which)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),d=!1,!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),function(){function t(e,t,i){return[parseFloat(e[0])*(p.test(e[0])?t/100:1),parseFloat(e[1])*(p.test(e[1])?i/100:1)]}function i(t,i){return parseInt(e.css(t,i),10)||0}function s(t){var i=t[0];return 9===i.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:e.isWindow(i)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}e.ui=e.ui||{};var n,a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,u=/top|center|bottom/,d=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,p=/%$/,f=e.fn.position;e.position={scrollbarWidth:function(){if(void 0!==n)return n;var t,i,s=e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),a=s.children()[0];return e("body").append(s),t=a.offsetWidth,s.css("overflow","scroll"),i=a.offsetWidth,t===i&&(i=s[0].clientWidth),s.remove(),n=t-i},getScrollInfo:function(t){var i=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),s=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),n="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth,a="scroll"===s||"auto"===s&&t.height<t.element[0].scrollHeight;return{width:a?e.position.scrollbarWidth():0,height:n?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=e(t||window),s=e.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:s,isDocument:n,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s||n?i.width():i.outerWidth(),height:s||n?i.height():i.outerHeight()}}},e.fn.position=function(n){if(!n||!n.of)return f.apply(this,arguments);n=e.extend({},n);var p,m,g,v,y,b,_=e(n.of),x=e.position.getWithinInfo(n.within),w=e.position.getScrollInfo(x),k=(n.collision||"flip").split(" "),T={};return b=s(_),_[0].preventDefault&&(n.at="left top"),m=b.width,g=b.height,v=b.offset,y=e.extend({},v),e.each(["my","at"],function(){var e,t,i=(n[this]||"").split(" ");1===i.length&&(i=l.test(i[0])?i.concat(["center"]):u.test(i[0])?["center"].concat(i):["center","center"]),i[0]=l.test(i[0])?i[0]:"center",i[1]=u.test(i[1])?i[1]:"center",e=d.exec(i[0]),t=d.exec(i[1]),T[this]=[e?e[0]:0,t?t[0]:0],n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]]}),1===k.length&&(k[1]=k[0]),"right"===n.at[0]?y.left+=m:"center"===n.at[0]&&(y.left+=m/2),"bottom"===n.at[1]?y.top+=g:"center"===n.at[1]&&(y.top+=g/2),p=t(T.at,m,g),y.left+=p[0],y.top+=p[1],this.each(function(){var s,l,u=e(this),d=u.outerWidth(),c=u.outerHeight(),f=i(this,"marginLeft"),b=i(this,"marginTop"),D=d+f+i(this,"marginRight")+w.width,S=c+b+i(this,"marginBottom")+w.height,M=e.extend({},y),C=t(T.my,u.outerWidth(),u.outerHeight());"right"===n.my[0]?M.left-=d:"center"===n.my[0]&&(M.left-=d/2),"bottom"===n.my[1]?M.top-=c:"center"===n.my[1]&&(M.top-=c/2),M.left+=C[0],M.top+=C[1],a||(M.left=h(M.left),M.top=h(M.top)),s={marginLeft:f,marginTop:b},e.each(["left","top"],function(t,i){e.ui.position[k[t]]&&e.ui.position[k[t]][i](M,{targetWidth:m,targetHeight:g,elemWidth:d,elemHeight:c,collisionPosition:s,collisionWidth:D,collisionHeight:S,offset:[p[0]+C[0],p[1]+C[1]],my:n.my,at:n.at,within:x,elem:u})}),n.using&&(l=function(e){var t=v.left-M.left,i=t+m-d,s=v.top-M.top,a=s+g-c,h={target:{element:_,left:v.left,top:v.top,width:m,height:g},element:{element:u,left:M.left,top:M.top,width:d,height:c},horizontal:0>i?"left":t>0?"right":"center",vertical:0>a?"top":s>0?"bottom":"middle"};d>m&&m>r(t+i)&&(h.horizontal="center"),c>g&&g>r(s+a)&&(h.vertical="middle"),h.important=o(r(t),r(i))>o(r(s),r(a))?"horizontal":"vertical",n.using.call(this,e,h)}),u.offset(e.extend(M,{using:l}))})},e.ui.position={fit:{left:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=e.left-t.collisionPosition.marginLeft,h=n-r,l=r+t.collisionWidth-a-n;t.collisionWidth>a?h>0&&0>=l?(i=e.left+h+t.collisionWidth-a-n,e.left+=h-i):e.left=l>0&&0>=h?n:h>l?n+a-t.collisionWidth:n:h>0?e.left+=h:l>0?e.left-=l:e.left=o(e.left-r,e.left)},top:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollTop:s.offset.top,a=t.within.height,r=e.top-t.collisionPosition.marginTop,h=n-r,l=r+t.collisionHeight-a-n;t.collisionHeight>a?h>0&&0>=l?(i=e.top+h+t.collisionHeight-a-n,e.top+=h-i):e.top=l>0&&0>=h?n:h>l?n+a-t.collisionHeight:n:h>0?e.top+=h:l>0?e.top-=l:e.top=o(e.top-r,e.top)}},flip:{left:function(e,t){var i,s,n=t.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=e.left-t.collisionPosition.marginLeft,u=l-h,d=l+t.collisionWidth-o-h,c="left"===t.my[0]?-t.elemWidth:"right"===t.my[0]?t.elemWidth:0,p="left"===t.at[0]?t.targetWidth:"right"===t.at[0]?-t.targetWidth:0,f=-2*t.offset[0];0>u?(i=e.left+c+p+f+t.collisionWidth-o-a,(0>i||r(u)>i)&&(e.left+=c+p+f)):d>0&&(s=e.left-t.collisionPosition.marginLeft+c+p+f-h,(s>0||d>r(s))&&(e.left+=c+p+f))},top:function(e,t){var i,s,n=t.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=e.top-t.collisionPosition.marginTop,u=l-h,d=l+t.collisionHeight-o-h,c="top"===t.my[1],p=c?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,f="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0,m=-2*t.offset[1];0>u?(s=e.top+p+f+m+t.collisionHeight-o-a,e.top+p+f+m>u&&(0>s||r(u)>s)&&(e.top+=p+f+m)):d>0&&(i=e.top-t.collisionPosition.marginTop+p+f+m-h,e.top+p+f+m>d&&(i>0||d>r(i))&&(e.top+=p+f+m))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,i,s,n,o,r=document.getElementsByTagName("body")[0],h=document.createElement("div");t=document.createElement(r?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},r&&e.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(o in s)t.style[o]=s[o];t.appendChild(h),i=r||document.documentElement,i.insertBefore(t,i.firstChild),h.style.cssText="position: absolute; left: 10.7432222px;",n=e(h).offset().left,a=n>10&&11>n,t.innerHTML="",i.removeChild(t)}()}(),e.ui.position,e.widget("ui.accordion",{version:"1.11.2",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var t=this.options;this.prevShow=this.prevHide=e(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),t.collapsible||t.active!==!1&&null!=t.active||(t.active=0),this._processPanels(),0>t.active&&(t.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():e()}},_createIcons:function(){var t=this.options.icons;t&&(e("<span>").addClass("ui-accordion-header-icon ui-icon "+t.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(),this._destroyIcons(),e=this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display","").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&e.css("height","")},_setOption:function(e,t){return"active"===e?(this._activate(t),void 0):("event"===e&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),"collapsible"!==e||t||this.options.active!==!1||this._activate(0),"icons"===e&&(this._destroyIcons(),t&&this._createIcons()),"disabled"===e&&(this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!t)),void 0)},_keydown:function(t){if(!t.altKey&&!t.ctrlKey){var i=e.ui.keyCode,s=this.headers.length,n=this.headers.index(t.target),a=!1;switch(t.keyCode){case i.RIGHT:case i.DOWN:a=this.headers[(n+1)%s];break;case i.LEFT:case i.UP:a=this.headers[(n-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(t);break;case i.HOME:a=this.headers[0];break;case i.END:a=this.headers[s-1]}a&&(e(t.target).attr("tabIndex",-1),e(a).attr("tabIndex",0),a.focus(),t.preventDefault())}},_panelKeyDown:function(t){t.keyCode===e.ui.keyCode.UP&&t.ctrlKey&&e(t.currentTarget).prev().focus()},refresh:function(){var t=this.options;this._processPanels(),t.active===!1&&t.collapsible===!0||!this.headers.length?(t.active=!1,this.active=e()):t.active===!1?this._activate(0):this.active.length&&!e.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(t.active=!1,this.active=e()):this._activate(Math.max(0,t.active-1)):t.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var e=this.headers,t=this.panels;this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"),this.panels=this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(),t&&(this._off(e.not(this.headers)),this._off(t.not(this.panels)))},_refresh:function(){var t,i=this.options,s=i.heightStyle,n=this.element.parent();this.active=this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(){var t=e(this),i=t.uniqueId().attr("id"),s=t.next(),n=s.uniqueId().attr("id");t.attr("aria-controls",n),s.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(i.event),"fill"===s?(t=n.height(),this.element.siblings(":visible").each(function(){var i=e(this),s=i.css("position");"absolute"!==s&&"fixed"!==s&&(t-=i.outerHeight(!0))}),this.headers.each(function(){t-=e(this).outerHeight(!0)}),this.headers.next().each(function(){e(this).height(Math.max(0,t-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===s&&(t=0,this.headers.next().each(function(){t=Math.max(t,e(this).css("height","").height())}).height(t))},_activate:function(t){var i=this._findActive(t)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return"number"==typeof t?this.headers.eq(t):e()},_setupEvents:function(t){var i={keydown:"_keydown"};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(t){var i=this.options,s=this.active,n=e(t.currentTarget),a=n[0]===s[0],o=a&&i.collapsible,r=o?e():n.next(),h=s.next(),l={oldHeader:s,oldPanel:h,newHeader:o?e():n,newPanel:r};t.preventDefault(),a&&!i.collapsible||this._trigger("beforeActivate",t,l)===!1||(i.active=o?!1:this.headers.index(n),this.active=a?e():n,this._toggle(l),s.removeClass("ui-accordion-header-active ui-state-active"),i.icons&&s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),a||(n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),i.icons&&n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),n.next().addClass("ui-accordion-content-active")))},_toggle:function(t){var i=t.newPanel,s=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,t):(s.hide(),i.show(),this._toggleComplete(t)),s.attr({"aria-hidden":"true"}),s.prev().attr("aria-selected","false"),i.length&&s.length?s.prev().attr({tabIndex:-1,"aria-expanded":"false"}):i.length&&this.headers.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),i.attr("aria-hidden","false").prev().attr({"aria-selected":"true",tabIndex:0,"aria-expanded":"true"})},_animate:function(e,t,i){var s,n,a,o=this,r=0,h=e.length&&(!t.length||e.index()<t.index()),l=this.options.animate||{},u=h&&l.down||l,d=function(){o._toggleComplete(i)};return"number"==typeof u&&(a=u),"string"==typeof u&&(n=u),n=n||u.easing||l.easing,a=a||u.duration||l.duration,t.length?e.length?(s=e.show().outerHeight(),t.animate(this.hideProps,{duration:a,easing:n,step:function(e,t){t.now=Math.round(e)}}),e.hide().animate(this.showProps,{duration:a,easing:n,complete:d,step:function(e,i){i.now=Math.round(e),"height"!==i.prop?r+=i.now:"content"!==o.options.heightStyle&&(i.now=Math.round(s-t.outerHeight()-r),r=0)}}),void 0):t.animate(this.hideProps,a,n,d):e.animate(this.showProps,a,n,d)},_toggleComplete:function(e){var t=e.oldPanel;t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}}),e.widget("ui.menu",{version:"1.11.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},items:"> *",menus:"ul",position:{my:"left-1 top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item":function(e){e.preventDefault()},"click .ui-menu-item":function(t){var i=e(t.target);!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(t),t.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(t):!this.element.is(":focus")&&e(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){if(!this.previousFilter){var i=e(t.currentTarget);i.siblings(".ui-state-active").removeClass("ui-state-active"),this.focus(t,i)
}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var i=this.active||this.element.find(this.options.items).eq(0);t||this.focus(e,i)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){this._closeOnDocumentClick(e)&&this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){var i,s,n,a,o=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:o=!1,s=this.previousFilter||"",n=String.fromCharCode(t.keyCode),a=!1,clearTimeout(this.filterTimer),n===s?a=!0:n=s+n,i=this._filterMenuItems(n),i=a&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(n=String.fromCharCode(t.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(t,i),this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}o&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.is("[aria-haspopup='true']")?this.expand(e):this.select(e))},refresh:function(){var t,i,s=this,n=this.options.icons.submenu,a=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),i=t.parent(),s=e("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);i.attr("aria-haspopup","true").prepend(s),t.attr("aria-labelledby",i.attr("id"))}),t=a.add(this.element),i=t.find(this.options.items),i.not(".ui-menu-item").each(function(){var t=e(this);s._isDivider(t)&&t.addClass("ui-widget-content ui-menu-divider")}),i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){"icons"===e&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this._super(e,t)},focus:function(e,t){var i,s;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.addClass("ui-state-focus").removeClass("ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=t.children(".ui-menu"),i.length&&e&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var i,s,n,a,o,r;this._hasScroll()&&(i=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,n=t.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),o=this.activeMenu.height(),r=t.outerHeight(),0>n?this.activeMenu.scrollTop(a+n):n+r>o&&this.activeMenu.scrollTop(a+n-o+r))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this.active.removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active}))},_startOpening:function(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e)},this.delay))},_open:function(t){var i=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(t,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(t),this.activeMenu=s},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")},_closeOnDocumentClick:function(t){return!e(t.target).closest(".ui-menu").length},_isDivider:function(e){return!/[^\-\u2014\u2013\s]/.test(e.text())},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[t]()),this.focus(i,s)},nextPage:function(t){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=e(this),0>i.offset().top-s-n}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())),void 0):(this.next(t),void 0)},previousPage:function(t){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=e(this),i.offset().top-s+n>0}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items).first())),void 0):(this.next(t),void 0)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,i)},_filterMenuItems:function(t){var i=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(e.trim(e(this).text()))})}}),e.widget("ui.autocomplete",{version:"1.11.2",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var t,i,s,n=this.element[0].nodeName.toLowerCase(),a="textarea"===n,o="input"===n;this.isMultiLine=a?!0:o?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[a||o?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return t=!0,s=!0,i=!0,void 0;t=!1,s=!1,i=!1;var a=e.ui.keyCode;switch(n.keyCode){case a.PAGE_UP:t=!0,this._move("previousPage",n);break;case a.PAGE_DOWN:t=!0,this._move("nextPage",n);break;case a.UP:t=!0,this._keyEvent("previous",n);break;case a.DOWN:t=!0,this._keyEvent("next",n);break;case a.ENTER:this.menu.active&&(t=!0,n.preventDefault(),this.menu.select(n));break;case a.TAB:this.menu.active&&this.menu.select(n);break;case a.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(t)return t=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),void 0;if(!i){var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(e){return s?(s=!1,e.preventDefault(),void 0):(this._searchTimeout(e),void 0)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(clearTimeout(this.searching),this.close(e),this._change(e),void 0)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(s){s.target===t.element[0]||s.target===i||e.contains(i,s.target)||t.close()})})},menufocus:function(t,i){var s,n;return this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type))?(this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)}),void 0):(n=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",t,{item:n})&&t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(n.value),s=i.item.attr("aria-label")||n.value,s&&e.trim(s).length&&(this.liveRegion.children().hide(),e("<div>").text(s).appendTo(this.liveRegion)),void 0)},menuselect:function(e,t){var i=t.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s,this.selectedItem=i})),!1!==this._trigger("select",e,{item:i})&&this._value(i.value),this.term=this._value(),this.close(e),this.selectedItem=i}}),this.liveRegion=e("<span>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,i,s=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,n){s.xhr&&s.xhr.abort(),s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){n(e)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){var t=this.term===this._value(),i=this.menu.element.is(":visible"),s=e.altKey||e.ctrlKey||e.metaKey||e.shiftKey;(!t||t&&!i&&!s)&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):void 0},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var t=++this.requestIndex;return e.proxy(function(e){t===this.requestIndex&&this.__response(e),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},this)},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({},t,{label:t.label||t.value,value:t.value||t.label})})},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var s=this;e.each(i,function(e,i){s._renderItemData(t,i)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").text(i.label).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this.isMultiLine||this._value(this.term),this.menu.blur(),void 0):(this.menu[e](t),void 0):(this.search(null,t),void 0)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault())}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var s=RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return s.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,this.liveRegion.children().hide(),e("<div>").text(i).appendTo(this.liveRegion))}}),e.ui.autocomplete;var c,p="ui-button ui-widget ui-state-default ui-corner-all",f="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",m=function(){var t=e(this);setTimeout(function(){t.find(":ui-button").button("refresh")},1)},g=function(t){var i=t.name,s=t.form,n=e([]);return i&&(i=i.replace(/'/g,"\\'"),n=s?e(s).find("[name='"+i+"'][type=radio]"):e("[name='"+i+"'][type=radio]",t.ownerDocument).filter(function(){return!this.form})),n};e.widget("ui.button",{version:"1.11.2",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,m),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var t=this,i=this.options,s="checkbox"===this.type||"radio"===this.type,n=s?"":"ui-state-active";null===i.label&&(i.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(p).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){i.disabled||this===c&&e(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){i.disabled||e(this).removeClass(n)}).bind("click"+this.eventNamespace,function(e){i.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}),this._on({focus:function(){this.buttonElement.addClass("ui-state-focus")},blur:function(){this.buttonElement.removeClass("ui-state-focus")}}),s&&this.element.bind("change"+this.eventNamespace,function(){t.refresh()}),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return i.disabled?!1:void 0}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(i.disabled)return!1;e(this).addClass("ui-state-active"),t.buttonElement.attr("aria-pressed","true");var s=t.element[0];g(s).not(s).map(function(){return e(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return i.disabled?!1:(e(this).addClass("ui-state-active"),c=this,t.document.one("mouseup",function(){c=null}),void 0)}).bind("mouseup"+this.eventNamespace,function(){return i.disabled?!1:(e(this).removeClass("ui-state-active"),void 0)}).bind("keydown"+this.eventNamespace,function(t){return i.disabled?!1:((t.keyCode===e.ui.keyCode.SPACE||t.keyCode===e.ui.keyCode.ENTER)&&e(this).addClass("ui-state-active"),void 0)}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){e(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(t){t.keyCode===e.ui.keyCode.SPACE&&e(this).click()})),this._setOption("disabled",i.disabled),this._resetButton()},_determineButtonType:function(){var e,t,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(e=this.element.parents().last(),t="label[for='"+this.element.attr("id")+"']",this.buttonElement=e.find(t),this.buttonElement.length||(e=e.length?e.siblings():this.element.siblings(),this.buttonElement=e.filter(t),this.buttonElement.length||(this.buttonElement=e.find(t))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(p+" ui-state-active "+f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(e,t){return this._super(e,t),"disabled"===e?(this.widget().toggleClass("ui-state-disabled",!!t),this.element.prop("disabled",!!t),t&&("checkbox"===this.type||"radio"===this.type?this.buttonElement.removeClass("ui-state-focus"):this.buttonElement.removeClass("ui-state-focus ui-state-active")),void 0):(this._resetButton(),void 0)},refresh:function(){var t=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOption("disabled",t),"radio"===this.type?g(this.element[0]).each(function(){e(this).is(":checked")?e(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return this.options.label&&this.element.val(this.options.label),void 0;var t=this.buttonElement.removeClass(f),i=e("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),s=this.options.icons,n=s.primary&&s.secondary,a=[];s.primary||s.secondary?(this.options.text&&a.push("ui-button-text-icon"+(n?"s":s.primary?"-primary":"-secondary")),s.primary&&t.prepend("<span class='ui-button-icon-primary ui-icon "+s.primary+"'></span>"),s.secondary&&t.append("<span class='ui-button-icon-secondary ui-icon "+s.secondary+"'></span>"),this.options.text||(a.push(n?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||t.attr("title",e.trim(i)))):a.push("ui-button-text-only"),t.addClass(a.join(" "))}}),e.widget("ui.buttonset",{version:"1.11.2",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(e,t){"disabled"===e&&this.buttons.button("option",e,t),this._super(e,t)},refresh:function(){var t="rtl"===this.element.css("direction"),i=this.element.find(this.options.items),s=i.filter(":ui-button");i.not(":ui-button").button(),s.button("refresh"),this.buttons=i.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(t?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}}),e.ui.button,e.extend(e.ui,{datepicker:{version:"1.11.2"}});var v;e.extend(n.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return r(this._defaults,e||{}),this},_attachDatepicker:function(t,i){var s,n,a;s=t.nodeName.toLowerCase(),n="div"===s||"span"===s,t.id||(this.uuid+=1,t.id="dp"+this.uuid),a=this._newInst(e(t),n),a.settings=e.extend({},i||{}),"input"===s?this._connectDatepicker(t,a):n&&this._inlineDatepicker(t,a)},_newInst:function(t,i){var s=t[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:s,input:t,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?a(e("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(t,i){var s=e(t);i.append=e([]),i.trigger=e([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(i),e.data(t,"datepicker",i),i.settings.disabled&&this._disableDatepicker(t))},_attachments:function(t,i){var s,n,a,o=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),o&&(i.append=e("<span class='"+this._appendClass+"'>"+o+"</span>"),t[r?"before":"after"](i.append)),t.unbind("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&t.focus(this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),a=this._get(i,"buttonImage"),i.trigger=e(this._get(i,"buttonImageOnly")?e("<img/>").addClass(this._triggerClass).attr({src:a,alt:n,title:n}):e("<button type='button'></button>").addClass(this._triggerClass).html(a?e("<img/>").attr({src:a,alt:n,title:n}):n)),t[r?"before":"after"](i.trigger),i.trigger.click(function(){return e.datepicker._datepickerShowing&&e.datepicker._lastInput===t[0]?e.datepicker._hideDatepicker():e.datepicker._datepickerShowing&&e.datepicker._lastInput!==t[0]?(e.datepicker._hideDatepicker(),e.datepicker._showDatepicker(t[0])):e.datepicker._showDatepicker(t[0]),!1}))},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t,i,s,n,a=new Date(2009,11,20),o=this._get(e,"dateFormat");o.match(/[DM]/)&&(t=function(e){for(i=0,s=0,n=0;e.length>n;n++)e[n].length>i&&(i=e[n].length,s=n);return s},a.setMonth(t(this._get(e,o.match(/MM/)?"monthNames":"monthNamesShort"))),a.setDate(t(this._get(e,o.match(/DD/)?"dayNames":"dayNamesShort"))+20-a.getDay())),e.input.attr("size",this._formatDate(e,a).length)}},_inlineDatepicker:function(t,i){var s=e(t);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),e.data(t,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(t),i.dpDiv.css("display","block"))},_dialogDatepicker:function(t,i,s,n,a){var o,h,l,u,d,c=this._dialogInst;return c||(this.uuid+=1,o="dp"+this.uuid,this._dialogInput=e("<input type='text' id='"+o+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),e("body").append(this._dialogInput),c=this._dialogInst=this._newInst(this._dialogInput,!1),c.settings={},e.data(this._dialogInput[0],"datepicker",c)),r(c.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(c,i):i,this._dialogInput.val(i),this._pos=a?a.length?a:[a.pageX,a.pageY]:null,this._pos||(h=document.documentElement.clientWidth,l=document.documentElement.clientHeight,u=document.documentElement.scrollLeft||document.body.scrollLeft,d=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[h/2-100+u,l/2-150+d]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),c.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),e.blockUI&&e.blockUI(this.dpDiv),e.data(this._dialogInput[0],"datepicker",c),this},_destroyDatepicker:function(t){var i,s=e(t),n=e.data(t,"datepicker");s.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),e.removeData(t,"datepicker"),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty())},_enableDatepicker:function(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!1,a.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}))},_disableDatepicker:function(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!0,a.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}),this._disabledInputs[this._disabledInputs.length]=t)},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;this._disabledInputs.length>t;t++)if(this._disabledInputs[t]===e)return!0;return!1},_getInst:function(t){try{return e.data(t,"datepicker")}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(t,i,s){var n,a,o,h,l=this._getInst(t);return 2===arguments.length&&"string"==typeof i?"defaults"===i?e.extend({},e.datepicker._defaults):l?"all"===i?e.extend({},l.settings):this._get(l,i):null:(n=i||{},"string"==typeof i&&(n={},n[i]=s),l&&(this._curInst===l&&this._hideDatepicker(),a=this._getDateDatepicker(t,!0),o=this._getMinMaxDate(l,"min"),h=this._getMinMaxDate(l,"max"),r(l.settings,n),null!==o&&void 0!==n.dateFormat&&void 0===n.minDate&&(l.settings.minDate=this._formatDate(l,o)),null!==h&&void 0!==n.dateFormat&&void 0===n.maxDate&&(l.settings.maxDate=this._formatDate(l,h)),"disabled"in n&&(n.disabled?this._disableDatepicker(t):this._enableDatepicker(t)),this._attachments(e(t),l),this._autoSize(l),this._setDate(l,a),this._updateAlternate(l),this._updateDatepicker(l)),void 0)},_changeDatepicker:function(e,t,i){this._optionDatepicker(e,t,i)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var i=this._getInst(e);i&&(this._setDate(i,t),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(e,t){var i=this._getInst(e);return i&&!i.inline&&this._setDateFromField(i,t),i?this._getDate(i):null},_doKeyDown:function(t){var i,s,n,a=e.datepicker._getInst(t.target),o=!0,r=a.dpDiv.is(".ui-datepicker-rtl");if(a._keyEvent=!0,e.datepicker._datepickerShowing)switch(t.keyCode){case 9:e.datepicker._hideDatepicker(),o=!1;break;case 13:return n=e("td."+e.datepicker._dayOverClass+":not(."+e.datepicker._currentClass+")",a.dpDiv),n[0]&&e.datepicker._selectDay(t.target,a.selectedMonth,a.selectedYear,n[0]),i=e.datepicker._get(a,"onSelect"),i?(s=e.datepicker._formatDate(a),i.apply(a.input?a.input[0]:null,[s,a])):e.datepicker._hideDatepicker(),!1;case 27:e.datepicker._hideDatepicker();break;case 33:e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;case 34:e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;case 35:(t.ctrlKey||t.metaKey)&&e.datepicker._clearDate(t.target),o=t.ctrlKey||t.metaKey;break;case 36:(t.ctrlKey||t.metaKey)&&e.datepicker._gotoToday(t.target),o=t.ctrlKey||t.metaKey;break;case 37:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?1:-1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;case 38:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,-7,"D"),o=t.ctrlKey||t.metaKey;break;case 39:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?-1:1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;case 40:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,7,"D"),o=t.ctrlKey||t.metaKey;break;default:o=!1}else 36===t.keyCode&&t.ctrlKey?e.datepicker._showDatepicker(this):o=!1;o&&(t.preventDefault(),t.stopPropagation())},_doKeyPress:function(t){var i,s,n=e.datepicker._getInst(t.target);return e.datepicker._get(n,"constrainInput")?(i=e.datepicker._possibleChars(e.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==t.charCode?t.keyCode:t.charCode),t.ctrlKey||t.metaKey||" ">s||!i||i.indexOf(s)>-1):void 0
},_doKeyUp:function(t){var i,s=e.datepicker._getInst(t.target);if(s.input.val()!==s.lastVal)try{i=e.datepicker.parseDate(e.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,e.datepicker._getFormatConfig(s)),i&&(e.datepicker._setDateFromField(s),e.datepicker._updateAlternate(s),e.datepicker._updateDatepicker(s))}catch(n){}return!0},_showDatepicker:function(t){if(t=t.target||t,"input"!==t.nodeName.toLowerCase()&&(t=e("input",t.parentNode)[0]),!e.datepicker._isDisabledDatepicker(t)&&e.datepicker._lastInput!==t){var i,n,a,o,h,l,u;i=e.datepicker._getInst(t),e.datepicker._curInst&&e.datepicker._curInst!==i&&(e.datepicker._curInst.dpDiv.stop(!0,!0),i&&e.datepicker._datepickerShowing&&e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),n=e.datepicker._get(i,"beforeShow"),a=n?n.apply(t,[t,i]):{},a!==!1&&(r(i.settings,a),i.lastVal=null,e.datepicker._lastInput=t,e.datepicker._setDateFromField(i),e.datepicker._inDialog&&(t.value=""),e.datepicker._pos||(e.datepicker._pos=e.datepicker._findPos(t),e.datepicker._pos[1]+=t.offsetHeight),o=!1,e(t).parents().each(function(){return o|="fixed"===e(this).css("position"),!o}),h={left:e.datepicker._pos[0],top:e.datepicker._pos[1]},e.datepicker._pos=null,i.dpDiv.empty(),i.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),e.datepicker._updateDatepicker(i),h=e.datepicker._checkOffset(i,h,o),i.dpDiv.css({position:e.datepicker._inDialog&&e.blockUI?"static":o?"fixed":"absolute",display:"none",left:h.left+"px",top:h.top+"px"}),i.inline||(l=e.datepicker._get(i,"showAnim"),u=e.datepicker._get(i,"duration"),i.dpDiv.css("z-index",s(e(t))+1),e.datepicker._datepickerShowing=!0,e.effects&&e.effects.effect[l]?i.dpDiv.show(l,e.datepicker._get(i,"showOptions"),u):i.dpDiv[l||"show"](l?u:null),e.datepicker._shouldFocusInput(i)&&i.input.focus(),e.datepicker._curInst=i))}},_updateDatepicker:function(t){this.maxRows=4,v=t,t.dpDiv.empty().append(this._generateHTML(t)),this._attachHandlers(t);var i,s=this._getNumberOfMonths(t),n=s[1],a=17,r=t.dpDiv.find("."+this._dayOverClass+" a");r.length>0&&o.apply(r.get(0)),t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),n>1&&t.dpDiv.addClass("ui-datepicker-multi-"+n).css("width",a*n+"em"),t.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),t.dpDiv[(this._get(t,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),t===e.datepicker._curInst&&e.datepicker._datepickerShowing&&e.datepicker._shouldFocusInput(t)&&t.input.focus(),t.yearshtml&&(i=t.yearshtml,setTimeout(function(){i===t.yearshtml&&t.yearshtml&&t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),i=t.yearshtml=null},0))},_shouldFocusInput:function(e){return e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&!e.input.is(":focus")},_checkOffset:function(t,i,s){var n=t.dpDiv.outerWidth(),a=t.dpDiv.outerHeight(),o=t.input?t.input.outerWidth():0,r=t.input?t.input.outerHeight():0,h=document.documentElement.clientWidth+(s?0:e(document).scrollLeft()),l=document.documentElement.clientHeight+(s?0:e(document).scrollTop());return i.left-=this._get(t,"isRTL")?n-o:0,i.left-=s&&i.left===t.input.offset().left?e(document).scrollLeft():0,i.top-=s&&i.top===t.input.offset().top+r?e(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>h&&h>n?Math.abs(i.left+n-h):0),i.top-=Math.min(i.top,i.top+a>l&&l>a?Math.abs(a+r):0),i},_findPos:function(t){for(var i,s=this._getInst(t),n=this._get(s,"isRTL");t&&("hidden"===t.type||1!==t.nodeType||e.expr.filters.hidden(t));)t=t[n?"previousSibling":"nextSibling"];return i=e(t).offset(),[i.left,i.top]},_hideDatepicker:function(t){var i,s,n,a,o=this._curInst;!o||t&&o!==e.data(t,"datepicker")||this._datepickerShowing&&(i=this._get(o,"showAnim"),s=this._get(o,"duration"),n=function(){e.datepicker._tidyDialog(o)},e.effects&&(e.effects.effect[i]||e.effects[i])?o.dpDiv.hide(i,e.datepicker._get(o,"showOptions"),s,n):o.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,a=this._get(o,"onClose"),a&&a.apply(o.input?o.input[0]:null,[o.input?o.input.val():"",o]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),e.blockUI&&(e.unblockUI(),e("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(t){if(e.datepicker._curInst){var i=e(t.target),s=e.datepicker._getInst(i[0]);(i[0].id!==e.datepicker._mainDivId&&0===i.parents("#"+e.datepicker._mainDivId).length&&!i.hasClass(e.datepicker.markerClassName)&&!i.closest("."+e.datepicker._triggerClass).length&&e.datepicker._datepickerShowing&&(!e.datepicker._inDialog||!e.blockUI)||i.hasClass(e.datepicker.markerClassName)&&e.datepicker._curInst!==s)&&e.datepicker._hideDatepicker()}},_adjustDate:function(t,i,s){var n=e(t),a=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(a,i+("M"===s?this._get(a,"showCurrentAtPos"):0),s),this._updateDatepicker(a))},_gotoToday:function(t){var i,s=e(t),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},_selectMonthYear:function(t,i,s){var n=e(t),a=this._getInst(n[0]);a["selected"+("M"===s?"Month":"Year")]=a["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(a),this._adjustDate(n)},_selectDay:function(t,i,s,n){var a,o=e(t);e(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(o[0])||(a=this._getInst(o[0]),a.selectedDay=a.currentDay=e("a",n).html(),a.selectedMonth=a.currentMonth=i,a.selectedYear=a.currentYear=s,this._selectDate(t,this._formatDate(a,a.currentDay,a.currentMonth,a.currentYear)))},_clearDate:function(t){var i=e(t);this._selectDate(i,"")},_selectDate:function(t,i){var s,n=e(t),a=this._getInst(n[0]);i=null!=i?i:this._formatDate(a),a.input&&a.input.val(i),this._updateAlternate(a),s=this._get(a,"onSelect"),s?s.apply(a.input?a.input[0]:null,[i,a]):a.input&&a.input.trigger("change"),a.inline?this._updateDatepicker(a):(this._hideDatepicker(),this._lastInput=a.input[0],"object"!=typeof a.input[0]&&a.input.focus(),this._lastInput=null)},_updateAlternate:function(t){var i,s,n,a=this._get(t,"altField");a&&(i=this._get(t,"altFormat")||this._get(t,"dateFormat"),s=this._getDate(t),n=this.formatDate(i,s,this._getFormatConfig(t)),e(a).each(function(){e(this).val(n)}))},noWeekends:function(e){var t=e.getDay();return[t>0&&6>t,""]},iso8601Week:function(e){var t,i=new Date(e.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),t=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((t-i)/864e5)/7)+1},parseDate:function(t,i,s){if(null==t||null==i)throw"Invalid arguments";if(i="object"==typeof i?""+i:i+"",""===i)return null;var n,a,o,r,h=0,l=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,u="string"!=typeof l?l:(new Date).getFullYear()%100+parseInt(l,10),d=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,c=(s?s.dayNames:null)||this._defaults.dayNames,p=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,f=(s?s.monthNames:null)||this._defaults.monthNames,m=-1,g=-1,v=-1,y=-1,b=!1,_=function(e){var i=t.length>n+1&&t.charAt(n+1)===e;return i&&n++,i},x=function(e){var t=_(e),s="@"===e?14:"!"===e?20:"y"===e&&t?4:"o"===e?3:2,n="y"===e?s:1,a=RegExp("^\\d{"+n+","+s+"}"),o=i.substring(h).match(a);if(!o)throw"Missing number at position "+h;return h+=o[0].length,parseInt(o[0],10)},w=function(t,s,n){var a=-1,o=e.map(_(t)?n:s,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)});if(e.each(o,function(e,t){var s=t[1];return i.substr(h,s.length).toLowerCase()===s.toLowerCase()?(a=t[0],h+=s.length,!1):void 0}),-1!==a)return a+1;throw"Unknown name at position "+h},k=function(){if(i.charAt(h)!==t.charAt(n))throw"Unexpected literal at position "+h;h++};for(n=0;t.length>n;n++)if(b)"'"!==t.charAt(n)||_("'")?k():b=!1;else switch(t.charAt(n)){case"d":v=x("d");break;case"D":w("D",d,c);break;case"o":y=x("o");break;case"m":g=x("m");break;case"M":g=w("M",p,f);break;case"y":m=x("y");break;case"@":r=new Date(x("@")),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case"!":r=new Date((x("!")-this._ticksTo1970)/1e4),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case"'":_("'")?k():b=!0;break;default:k()}if(i.length>h&&(o=i.substr(h),!/^\s+/.test(o)))throw"Extra/unparsed characters found in date: "+o;if(-1===m?m=(new Date).getFullYear():100>m&&(m+=(new Date).getFullYear()-(new Date).getFullYear()%100+(u>=m?0:-100)),y>-1)for(g=1,v=y;;){if(a=this._getDaysInMonth(m,g-1),a>=v)break;g++,v-=a}if(r=this._daylightSavingAdjust(new Date(m,g-1,v)),r.getFullYear()!==m||r.getMonth()+1!==g||r.getDate()!==v)throw"Invalid date";return r},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(e,t,i){if(!t)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,a=(i?i.dayNames:null)||this._defaults.dayNames,o=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,h=function(t){var i=e.length>s+1&&e.charAt(s+1)===t;return i&&s++,i},l=function(e,t,i){var s=""+t;if(h(e))for(;i>s.length;)s="0"+s;return s},u=function(e,t,i,s){return h(e)?s[t]:i[t]},d="",c=!1;if(t)for(s=0;e.length>s;s++)if(c)"'"!==e.charAt(s)||h("'")?d+=e.charAt(s):c=!1;else switch(e.charAt(s)){case"d":d+=l("d",t.getDate(),2);break;case"D":d+=u("D",t.getDay(),n,a);break;case"o":d+=l("o",Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-new Date(t.getFullYear(),0,0).getTime())/864e5),3);break;case"m":d+=l("m",t.getMonth()+1,2);break;case"M":d+=u("M",t.getMonth(),o,r);break;case"y":d+=h("y")?t.getFullYear():(10>t.getYear()%100?"0":"")+t.getYear()%100;break;case"@":d+=t.getTime();break;case"!":d+=1e4*t.getTime()+this._ticksTo1970;break;case"'":h("'")?d+="'":c=!0;break;default:d+=e.charAt(s)}return d},_possibleChars:function(e){var t,i="",s=!1,n=function(i){var s=e.length>t+1&&e.charAt(t+1)===i;return s&&t++,s};for(t=0;e.length>t;t++)if(s)"'"!==e.charAt(t)||n("'")?i+=e.charAt(t):s=!1;else switch(e.charAt(t)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":n("'")?i+="'":s=!0;break;default:i+=e.charAt(t)}return i},_get:function(e,t){return void 0!==e.settings[t]?e.settings[t]:this._defaults[t]},_setDateFromField:function(e,t){if(e.input.val()!==e.lastVal){var i=this._get(e,"dateFormat"),s=e.lastVal=e.input?e.input.val():null,n=this._getDefaultDate(e),a=n,o=this._getFormatConfig(e);try{a=this.parseDate(i,s,o)||n}catch(r){s=t?"":s}e.selectedDay=a.getDate(),e.drawMonth=e.selectedMonth=a.getMonth(),e.drawYear=e.selectedYear=a.getFullYear(),e.currentDay=s?a.getDate():0,e.currentMonth=s?a.getMonth():0,e.currentYear=s?a.getFullYear():0,this._adjustInstDate(e)}},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(t,i,s){var n=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},a=function(i){try{return e.datepicker.parseDate(e.datepicker._get(t,"dateFormat"),i,e.datepicker._getFormatConfig(t))}catch(s){}for(var n=(i.toLowerCase().match(/^c/)?e.datepicker._getDate(t):null)||new Date,a=n.getFullYear(),o=n.getMonth(),r=n.getDate(),h=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=h.exec(i);l;){switch(l[2]||"d"){case"d":case"D":r+=parseInt(l[1],10);break;case"w":case"W":r+=7*parseInt(l[1],10);break;case"m":case"M":o+=parseInt(l[1],10),r=Math.min(r,e.datepicker._getDaysInMonth(a,o));break;case"y":case"Y":a+=parseInt(l[1],10),r=Math.min(r,e.datepicker._getDaysInMonth(a,o))}l=h.exec(i)}return new Date(a,o,r)},o=null==i||""===i?s:"string"==typeof i?a(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return o=o&&"Invalid Date"==""+o?s:o,o&&(o.setHours(0),o.setMinutes(0),o.setSeconds(0),o.setMilliseconds(0)),this._daylightSavingAdjust(o)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,i){var s=!t,n=e.selectedMonth,a=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),n===e.selectedMonth&&a===e.selectedYear||i||this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(s?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&""===e.input.val()?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(t){var i=this._get(t,"stepMonths"),s="#"+t.id.replace(/\\\\/g,"\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function(){e.datepicker._adjustDate(s,-i,"M")},next:function(){e.datepicker._adjustDate(s,+i,"M")},hide:function(){e.datepicker._hideDatepicker()},today:function(){e.datepicker._gotoToday(s)},selectDay:function(){return e.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return e.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return e.datepicker._selectMonthYear(s,this,"Y"),!1}};e(this).bind(this.getAttribute("data-event"),t[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t,i,s,n,a,o,r,h,l,u,d,c,p,f,m,g,v,y,b,_,x,w,k,T,D,S,M,C,N,A,P,I,z,H,F,E,O,j,W,L=new Date,R=this._daylightSavingAdjust(new Date(L.getFullYear(),L.getMonth(),L.getDate())),Y=this._get(e,"isRTL"),B=this._get(e,"showButtonPanel"),J=this._get(e,"hideIfNoPrevNext"),q=this._get(e,"navigationAsDateFormat"),K=this._getNumberOfMonths(e),V=this._get(e,"showCurrentAtPos"),U=this._get(e,"stepMonths"),Q=1!==K[0]||1!==K[1],G=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),X=this._getMinMaxDate(e,"min"),$=this._getMinMaxDate(e,"max"),Z=e.drawMonth-V,et=e.drawYear;if(0>Z&&(Z+=12,et--),$)for(t=this._daylightSavingAdjust(new Date($.getFullYear(),$.getMonth()-K[0]*K[1]+1,$.getDate())),t=X&&X>t?X:t;this._daylightSavingAdjust(new Date(et,Z,1))>t;)Z--,0>Z&&(Z=11,et--);for(e.drawMonth=Z,e.drawYear=et,i=this._get(e,"prevText"),i=q?this.formatDate(i,this._daylightSavingAdjust(new Date(et,Z-U,1)),this._getFormatConfig(e)):i,s=this._canAdjustMonth(e,-1,et,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>":J?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>",n=this._get(e,"nextText"),n=q?this.formatDate(n,this._daylightSavingAdjust(new Date(et,Z+U,1)),this._getFormatConfig(e)):n,a=this._canAdjustMonth(e,1,et,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>":J?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>",o=this._get(e,"currentText"),r=this._get(e,"gotoCurrent")&&e.currentDay?G:R,o=q?this.formatDate(o,r,this._getFormatConfig(e)):o,h=e.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(e,"closeText")+"</button>",l=B?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(Y?h:"")+(this._isInRange(e,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+o+"</button>":"")+(Y?"":h)+"</div>":"",u=parseInt(this._get(e,"firstDay"),10),u=isNaN(u)?0:u,d=this._get(e,"showWeek"),c=this._get(e,"dayNames"),p=this._get(e,"dayNamesMin"),f=this._get(e,"monthNames"),m=this._get(e,"monthNamesShort"),g=this._get(e,"beforeShowDay"),v=this._get(e,"showOtherMonths"),y=this._get(e,"selectOtherMonths"),b=this._getDefaultDate(e),_="",w=0;K[0]>w;w++){for(k="",this.maxRows=4,T=0;K[1]>T;T++){if(D=this._daylightSavingAdjust(new Date(et,Z,e.selectedDay)),S=" ui-corner-all",M="",Q){if(M+="<div class='ui-datepicker-group",K[1]>1)switch(T){case 0:M+=" ui-datepicker-group-first",S=" ui-corner-"+(Y?"right":"left");break;case K[1]-1:M+=" ui-datepicker-group-last",S=" ui-corner-"+(Y?"left":"right");break;default:M+=" ui-datepicker-group-middle",S=""}M+="'>"}for(M+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+S+"'>"+(/all|left/.test(S)&&0===w?Y?a:s:"")+(/all|right/.test(S)&&0===w?Y?s:a:"")+this._generateMonthYearHeader(e,Z,et,X,$,w>0||T>0,f,m)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",C=d?"<th class='ui-datepicker-week-col'>"+this._get(e,"weekHeader")+"</th>":"",x=0;7>x;x++)N=(x+u)%7,C+="<th scope='col'"+((x+u+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+c[N]+"'>"+p[N]+"</span></th>";for(M+=C+"</tr></thead><tbody>",A=this._getDaysInMonth(et,Z),et===e.selectedYear&&Z===e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,A)),P=(this._getFirstDayOfMonth(et,Z)-u+7)%7,I=Math.ceil((P+A)/7),z=Q?this.maxRows>I?this.maxRows:I:I,this.maxRows=z,H=this._daylightSavingAdjust(new Date(et,Z,1-P)),F=0;z>F;F++){for(M+="<tr>",E=d?"<td class='ui-datepicker-week-col'>"+this._get(e,"calculateWeek")(H)+"</td>":"",x=0;7>x;x++)O=g?g.apply(e.input?e.input[0]:null,[H]):[!0,""],j=H.getMonth()!==Z,W=j&&!y||!O[0]||X&&X>H||$&&H>$,E+="<td class='"+((x+u+6)%7>=5?" ui-datepicker-week-end":"")+(j?" ui-datepicker-other-month":"")+(H.getTime()===D.getTime()&&Z===e.selectedMonth&&e._keyEvent||b.getTime()===H.getTime()&&b.getTime()===D.getTime()?" "+this._dayOverClass:"")+(W?" "+this._unselectableClass+" ui-state-disabled":"")+(j&&!v?"":" "+O[1]+(H.getTime()===G.getTime()?" "+this._currentClass:"")+(H.getTime()===R.getTime()?" ui-datepicker-today":""))+"'"+(j&&!v||!O[2]?"":" title='"+O[2].replace(/'/g,"&#39;")+"'")+(W?"":" data-handler='selectDay' data-event='click' data-month='"+H.getMonth()+"' data-year='"+H.getFullYear()+"'")+">"+(j&&!v?"&#xa0;":W?"<span class='ui-state-default'>"+H.getDate()+"</span>":"<a class='ui-state-default"+(H.getTime()===R.getTime()?" ui-state-highlight":"")+(H.getTime()===G.getTime()?" ui-state-active":"")+(j?" ui-priority-secondary":"")+"' href='#'>"+H.getDate()+"</a>")+"</td>",H.setDate(H.getDate()+1),H=this._daylightSavingAdjust(H);M+=E+"</tr>"}Z++,Z>11&&(Z=0,et++),M+="</tbody></table>"+(Q?"</div>"+(K[0]>0&&T===K[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),k+=M}_+=k}return _+=l,e._keyEvent=!1,_},_generateMonthYearHeader:function(e,t,i,s,n,a,o,r){var h,l,u,d,c,p,f,m,g=this._get(e,"changeMonth"),v=this._get(e,"changeYear"),y=this._get(e,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",_="";if(a||!g)_+="<span class='ui-datepicker-month'>"+o[t]+"</span>";else{for(h=s&&s.getFullYear()===i,l=n&&n.getFullYear()===i,_+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",u=0;12>u;u++)(!h||u>=s.getMonth())&&(!l||n.getMonth()>=u)&&(_+="<option value='"+u+"'"+(u===t?" selected='selected'":"")+">"+r[u]+"</option>");_+="</select>"}if(y||(b+=_+(!a&&g&&v?"":"&#xa0;")),!e.yearshtml)if(e.yearshtml="",a||!v)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(d=this._get(e,"yearRange").split(":"),c=(new Date).getFullYear(),p=function(e){var t=e.match(/c[+\-].*/)?i+parseInt(e.substring(1),10):e.match(/[+\-].*/)?c+parseInt(e,10):parseInt(e,10);return isNaN(t)?c:t},f=p(d[0]),m=Math.max(f,p(d[1]||"")),f=s?Math.max(f,s.getFullYear()):f,m=n?Math.min(m,n.getFullYear()):m,e.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";m>=f;f++)e.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";e.yearshtml+="</select>",b+=e.yearshtml,e.yearshtml=null}return b+=this._get(e,"yearSuffix"),y&&(b+=(!a&&g&&v?"":"&#xa0;")+_),b+="</div>"},_adjustInstDate:function(e,t,i){var s=e.drawYear+("Y"===i?t:0),n=e.drawMonth+("M"===i?t:0),a=Math.min(e.selectedDay,this._getDaysInMonth(s,n))+("D"===i?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(s,n,a)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(e)},_restrictMinMax:function(e,t){var i=this._getMinMaxDate(e,"min"),s=this._getMinMaxDate(e,"max"),n=i&&i>t?i:t;return s&&n>s?s:n},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return null==t?[1,1]:"number"==typeof t?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return new Date(e,t,1).getDay()},_canAdjustMonth:function(e,t,i,s){var n=this._getNumberOfMonths(e),a=this._daylightSavingAdjust(new Date(i,s+(0>t?t:n[0]*n[1]),1));return 0>t&&a.setDate(this._getDaysInMonth(a.getFullYear(),a.getMonth())),this._isInRange(e,a)},_isInRange:function(e,t){var i,s,n=this._getMinMaxDate(e,"min"),a=this._getMinMaxDate(e,"max"),o=null,r=null,h=this._get(e,"yearRange");return h&&(i=h.split(":"),s=(new Date).getFullYear(),o=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(o+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||t.getTime()>=n.getTime())&&(!a||t.getTime()<=a.getTime())&&(!o||t.getFullYear()>=o)&&(!r||r>=t.getFullYear())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t="string"!=typeof t?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,i,s){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var n=t?"object"==typeof t?t:this._daylightSavingAdjust(new Date(s,i,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),n,this._getFormatConfig(e))}}),e.fn.datepicker=function(t){if(!this.length)return this;e.datepicker.initialized||(e(document).mousedown(e.datepicker._checkExternalClick),e.datepicker.initialized=!0),0===e("#"+e.datepicker._mainDivId).length&&e("body").append(e.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof t||"isDisabled"!==t&&"getDate"!==t&&"widget"!==t?"option"===t&&2===arguments.length&&"string"==typeof arguments[1]?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof t?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this].concat(i)):e.datepicker._attachDatepicker(this,t)}):e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i))},e.datepicker=new n,e.datepicker.initialized=!1,e.datepicker.uuid=(new Date).getTime(),e.datepicker.version="1.11.2",e.datepicker,e.widget("ui.draggable",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._setHandleClassName(),this._mouseInit()},_setOption:function(e,t){this._super(e,t),"handle"===e&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(t){var i=this.options;return this._blurActiveElement(t),this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=e(this);return e("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var i=this.document[0];if(this.handleElement.is(t.target))try{i.activeElement&&"body"!==i.activeElement.nodeName.toLowerCase()&&e(i.activeElement).blur()}catch(s){}},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===e(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._normalizeRightBottom(),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_refreshOffsets:function(e){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:e.pageX-this.offset.left,top:e.pageY-this.offset.top}},_mouseDrag:function(t,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i=this,s=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(s=e.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",t)!==!1&&i._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1},_mouseUp:function(t){return this._unblockFrames(),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.focus(),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this.handleElement.addClass("ui-draggable-handle")},_removeHandleClassName:function(){this.handleElement.removeClass("ui-draggable-handle")},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper),n=s?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(e){return/(html|body)/i.test(e.tagName)||e===this.document[0]},_getParentOffset:function(){var t=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var e=this.element.position(),t=this._isRootNode(this.scrollParent[0]);return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+(t?0:this.scrollParent.scrollTop()),left:e.left-(parseInt(this.helper.css("left"),10)||0)+(t?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options,a=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,e(a).width()-this.helperProportions.width-this.margins.left,(e(a).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=e(n.containment),s=i[0],s&&(t=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)
},_convertPositionTo:function(e,t){t||(t=this.position);var i="absolute"===e?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:t.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:t.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(e,t){var i,s,n,a,o=this.options,r=this._isRootNode(this.scrollParent[0]),h=e.pageX,l=e.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),t&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,h=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a),"y"===o.axis&&(h=this.originalPageX),"x"===o.axis&&(l=this.originalPageY)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_normalizeRightBottom:function(){"y"!==this.options.axis&&"auto"!==this.helper.css("right")&&(this.helper.width(this.helper.width()),this.helper.css("right","auto")),"x"!==this.options.axis&&"auto"!==this.helper.css("bottom")&&(this.helper.height(this.helper.height()),this.helper.css("bottom","auto"))},_trigger:function(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i,s){var n=e.extend({},i,{item:s.element});s.sortables=[],e(s.options.connectToSortable).each(function(){var i=e(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",t,n))})},stop:function(t,i,s){var n=e.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,e.each(s.sortables,function(){var e=this;e.isOver?(e.isOver=0,s.cancelHelperRemoval=!0,e.cancelHelperRemoval=!1,e._storedCSS={position:e.placeholder.css("position"),top:e.placeholder.css("top"),left:e.placeholder.css("left")},e._mouseStop(t),e.options.helper=e.options._helper):(e.cancelHelperRemoval=!0,e._trigger("deactivate",t,n))})},drag:function(t,i,s){e.each(s.sortables,function(){var n=!1,a=this;a.positionAbs=s.positionAbs,a.helperProportions=s.helperProportions,a.offset.click=s.offset.click,a._intersectsWith(a.containerCache)&&(n=!0,e.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==a&&this._intersectsWith(this.containerCache)&&e.contains(a.element[0],this.element[0])&&(n=!1),n})),n?(a.isOver||(a.isOver=1,a.currentItem=i.helper.appendTo(a.element).data("ui-sortable-item",!0),a.options._helper=a.options.helper,a.options.helper=function(){return i.helper[0]},t.target=a.currentItem[0],a._mouseCapture(t,!0),a._mouseStart(t,!0,!0),a.offset.click.top=s.offset.click.top,a.offset.click.left=s.offset.click.left,a.offset.parent.left-=s.offset.parent.left-a.offset.parent.left,a.offset.parent.top-=s.offset.parent.top-a.offset.parent.top,s._trigger("toSortable",t),s.dropped=a.element,e.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,a.fromOutside=s),a.currentItem&&(a._mouseDrag(t),i.position=a.position)):a.isOver&&(a.isOver=0,a.cancelHelperRemoval=!0,a.options._revert=a.options.revert,a.options.revert=!1,a._trigger("out",t,a._uiHash(a)),a._mouseStop(t,!0),a.options.revert=a.options._revert,a.options.helper=a.options._helper,a.placeholder&&a.placeholder.remove(),s._refreshOffsets(t),i.position=s._generatePosition(t,!0),s._trigger("fromSortable",t),s.dropped=!1,e.each(s.sortables,function(){this.refreshPositions()}))})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,i,s){var n=e("body"),a=s.options;n.css("cursor")&&(a._cursor=n.css("cursor")),n.css("cursor",a.cursor)},stop:function(t,i,s){var n=s.options;n._cursor&&e("body").css("cursor",n._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("opacity")&&(a._opacity=n.css("opacity")),n.css("opacity",a.opacity)},stop:function(t,i,s){var n=s.options;n._opacity&&e(i.helper).css("opacity",n._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(e,t,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(t,i,s){var n=s.options,a=!1,o=s.scrollParentNotHidden[0],r=s.document[0];o!==r&&"HTML"!==o.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+o.offsetHeight-t.pageY<n.scrollSensitivity?o.scrollTop=a=o.scrollTop+n.scrollSpeed:t.pageY-s.overflowOffset.top<n.scrollSensitivity&&(o.scrollTop=a=o.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+o.offsetWidth-t.pageX<n.scrollSensitivity?o.scrollLeft=a=o.scrollLeft+n.scrollSpeed:t.pageX-s.overflowOffset.left<n.scrollSensitivity&&(o.scrollLeft=a=o.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(t.pageY-e(r).scrollTop()<n.scrollSensitivity?a=e(r).scrollTop(e(r).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(r).scrollTop())<n.scrollSensitivity&&(a=e(r).scrollTop(e(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(t.pageX-e(r).scrollLeft()<n.scrollSensitivity?a=e(r).scrollLeft(e(r).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(r).scrollLeft())<n.scrollSensitivity&&(a=e(r).scrollLeft(e(r).scrollLeft()+n.scrollSpeed)))),a!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(s,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,i,s){var n=s.options;s.snapElements=[],e(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var t=e(this),i=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:i.top,left:i.left})})},drag:function(t,i,s){var n,a,o,r,h,l,u,d,c,p,f=s.options,m=f.snapTolerance,g=i.offset.left,v=g+s.helperProportions.width,y=i.offset.top,b=y+s.helperProportions.height;for(c=s.snapElements.length-1;c>=0;c--)h=s.snapElements[c].left-s.margins.left,l=h+s.snapElements[c].width,u=s.snapElements[c].top-s.margins.top,d=u+s.snapElements[c].height,h-m>v||g>l+m||u-m>b||y>d+m||!e.contains(s.snapElements[c].item.ownerDocument,s.snapElements[c].item)?(s.snapElements[c].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=!1):("inner"!==f.snapMode&&(n=m>=Math.abs(u-b),a=m>=Math.abs(d-y),o=m>=Math.abs(h-v),r=m>=Math.abs(l-g),n&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left)),p=n||a||o||r,"outer"!==f.snapMode&&(n=m>=Math.abs(u-y),a=m>=Math.abs(d-b),o=m>=Math.abs(h-g),r=m>=Math.abs(l-v),n&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d-s.helperProportions.height,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left)),!s.snapElements[c].snapping&&(n||a||o||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=n||a||o||r||p)}}),e.ui.plugin.add("draggable","stack",{start:function(t,i,s){var n,a=s.options,o=e.makeArray(e(a.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});o.length&&(n=parseInt(e(o[0]).css("zIndex"),10)||0,e(o).each(function(t){e(this).css("zIndex",n+t)}),this.css("zIndex",n+o.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("zIndex")&&(a._zIndex=n.css("zIndex")),n.css("zIndex",a.zIndex)},stop:function(t,i,s){var n=s.options;n._zIndex&&e(i.helper).css("zIndex",n._zIndex)}}),e.ui.draggable,e.widget("ui.resizable",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(e){return parseInt(e,10)||0},_isNumber:function(e){return!isNaN(parseInt(e,10))},_hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",n=!1;return t[s]>0?!0:(t[s]=1,n=t[s]>0,t[s]=0,n)},_create:function(){var t,i,s,n,a,o=this,r=this.options;if(this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),t=this.handles.split(","),this.handles={},i=0;t.length>i;i++)s=e.trim(t[i]),a="ui-resizable-"+s,n=e("<div class='ui-resizable-handle "+a+"'></div>"),n.css({zIndex:r.zIndex}),"se"===s&&n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(n);this._renderAxis=function(t){var i,s,n,a;t=t||this.element;for(i in this.handles)this.handles[i].constructor===String&&(this.handles[i]=this.element.children(this.handles[i]).first().show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(s=e(this.handles[i],this.element),a=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(n,a),this._proportionallyResize()),e(this.handles[i]).length},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){o.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),o.axis=n&&n[1]?n[1]:"se")}),r.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(e(this).removeClass("ui-resizable-autohide"),o._handles.show())}).mouseleave(function(){r.disabled||o.resizing||(e(this).addClass("ui-resizable-autohide"),o._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t,i=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(t){var i,s,n=!1;for(i in this.handles)s=e(this.handles[i])[0],(s===t.target||e.contains(s,t.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(t){var i,s,n,a=this.options,o=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),s=this._num(this.helper.css("top")),a.containment&&(i+=e(a.containment).scrollLeft()||0,s+=e(a.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:o.width(),height:o.height()},this.originalSize=this._helper?{width:o.outerWidth(),height:o.outerHeight()}:{width:o.width(),height:o.height()},this.sizeDiff={width:o.outerWidth()-o.width(),height:o.outerHeight()-o.height()},this.originalPosition={left:i,top:s},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio="number"==typeof a.aspectRatio?a.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===n?this.axis+"-resize":n),o.addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(t){var i,s,n=this.originalMousePosition,a=this.axis,o=t.pageX-n.left||0,r=t.pageY-n.top||0,h=this._change[a];return this._updatePrevProperties(),h?(i=h.apply(this,[t,o,r]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",t,this.ui()),this._applyChanges()),!1):!1},_mouseStop:function(t){this.resizing=!1;var i,s,n,a,o,r,h,l=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&this._hasScroll(i[0],"left")?0:u.sizeDiff.height,a=s?0:u.sizeDiff.width,o={width:u.helper.width()-a,height:u.helper.height()-n},r=parseInt(u.element.css("left"),10)+(u.position.left-u.originalPosition.left)||null,h=parseInt(u.element.css("top"),10)+(u.position.top-u.originalPosition.top)||null,l.animate||this.element.css(e.extend(o,{top:h,left:r})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!l.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var e={};return this.position.top!==this.prevPosition.top&&(e.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(e.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(e.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(e.height=this.size.height+"px"),this.helper.css(e),e},_updateVirtualBoundaries:function(e){var t,i,s,n,a,o=this.options;a={minWidth:this._isNumber(o.minWidth)?o.minWidth:0,maxWidth:this._isNumber(o.maxWidth)?o.maxWidth:1/0,minHeight:this._isNumber(o.minHeight)?o.minHeight:0,maxHeight:this._isNumber(o.maxHeight)?o.maxHeight:1/0},(this._aspectRatio||e)&&(t=a.minHeight*this.aspectRatio,s=a.minWidth/this.aspectRatio,i=a.maxHeight*this.aspectRatio,n=a.maxWidth/this.aspectRatio,t>a.minWidth&&(a.minWidth=t),s>a.minHeight&&(a.minHeight=s),a.maxWidth>i&&(a.maxWidth=i),a.maxHeight>n&&(a.maxHeight=n)),this._vBoundaries=a},_updateCache:function(e){this.offset=this.helper.offset(),this._isNumber(e.left)&&(this.position.left=e.left),this._isNumber(e.top)&&(this.position.top=e.top),this._isNumber(e.height)&&(this.size.height=e.height),this._isNumber(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=this.position,i=this.size,s=this.axis;return this._isNumber(e.height)?e.width=e.height*this.aspectRatio:this._isNumber(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===s&&(e.left=t.left+(i.width-e.width),e.top=null),"nw"===s&&(e.top=t.top+(i.height-e.height),e.left=t.left+(i.width-e.width)),e},_respectSize:function(e){var t=this._vBoundaries,i=this.axis,s=this._isNumber(e.width)&&t.maxWidth&&t.maxWidth<e.width,n=this._isNumber(e.height)&&t.maxHeight&&t.maxHeight<e.height,a=this._isNumber(e.width)&&t.minWidth&&t.minWidth>e.width,o=this._isNumber(e.height)&&t.minHeight&&t.minHeight>e.height,r=this.originalPosition.left+this.originalSize.width,h=this.position.top+this.size.height,l=/sw|nw|w/.test(i),u=/nw|ne|n/.test(i);return a&&(e.width=t.minWidth),o&&(e.height=t.minHeight),s&&(e.width=t.maxWidth),n&&(e.height=t.maxHeight),a&&l&&(e.left=r-t.minWidth),s&&l&&(e.left=r-t.maxWidth),o&&u&&(e.top=h-t.minHeight),n&&u&&(e.top=h-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e},_getPaddingPlusBorderDimensions:function(e){for(var t=0,i=[],s=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],n=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];4>t;t++)i[t]=parseInt(s[t],10)||0,i[t]+=parseInt(n[t],10)||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var e,t=0,i=this.helper||this.element;this._proportionallyResizeElements.length>t;t++)e=this._proportionallyResizeElements[t],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(e)),e.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(e,t,i){return{height:this.originalSize.height+i}},se:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},sw:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]))},ne:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},nw:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]))}},_propagate:function(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","animate",{stop:function(t){var i=e(this).resizable("instance"),s=i.options,n=i._proportionallyResizeElements,a=n.length&&/textarea/i.test(n[0].nodeName),o=a&&i._hasScroll(n[0],"left")?0:i.sizeDiff.height,r=a?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-o},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(h,u&&l?{top:u,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};n&&n.length&&e(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var t,i,s,n,a,o,r,h=e(this).resizable("instance"),l=h.options,u=h.element,d=l.containment,c=d instanceof e?d.get(0):/parent/.test(d)?u.parent().get(0):d;c&&(h.containerElement=e(c),/document/.test(d)||d===document?(h.containerOffset={left:0,top:0},h.containerPosition={left:0,top:0},h.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(t=e(c),i=[],e(["Top","Right","Left","Bottom"]).each(function(e,s){i[e]=h._num(t.css("padding"+s))}),h.containerOffset=t.offset(),h.containerPosition=t.position(),h.containerSize={height:t.innerHeight()-i[3],width:t.innerWidth()-i[1]},s=h.containerOffset,n=h.containerSize.height,a=h.containerSize.width,o=h._hasScroll(c,"left")?c.scrollWidth:a,r=h._hasScroll(c)?c.scrollHeight:n,h.parentData={element:c,left:s.left,top:s.top,width:o,height:r}))},resize:function(t){var i,s,n,a,o=e(this).resizable("instance"),r=o.options,h=o.containerOffset,l=o.position,u=o._aspectRatio||t.shiftKey,d={top:0,left:0},c=o.containerElement,p=!0;c[0]!==document&&/static/.test(c.css("position"))&&(d=h),l.left<(o._helper?h.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-h.left:o.position.left-d.left),u&&(o.size.height=o.size.width/o.aspectRatio,p=!1),o.position.left=r.helper?h.left:0),l.top<(o._helper?h.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-h.top:o.position.top),u&&(o.size.width=o.size.height*o.aspectRatio,p=!1),o.position.top=o._helper?h.top:0),n=o.containerElement.get(0)===o.element.parent().get(0),a=/relative|absolute/.test(o.containerElement.css("position")),n&&a?(o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top):(o.offset.left=o.element.offset().left,o.offset.top=o.element.offset().top),i=Math.abs(o.sizeDiff.width+(o._helper?o.offset.left-d.left:o.offset.left-h.left)),s=Math.abs(o.sizeDiff.height+(o._helper?o.offset.top-d.top:o.offset.top-h.top)),i+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-i,u&&(o.size.height=o.size.width/o.aspectRatio,p=!1)),s+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-s,u&&(o.size.width=o.size.height*o.aspectRatio,p=!1)),p||(o.position.left=o.prevPosition.left,o.position.top=o.prevPosition.top,o.size.width=o.prevSize.width,o.size.height=o.prevSize.height)},stop:function(){var t=e(this).resizable("instance"),i=t.options,s=t.containerOffset,n=t.containerPosition,a=t.containerElement,o=e(t.helper),r=o.offset(),h=o.outerWidth()-t.sizeDiff.width,l=o.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l}),t._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l})}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).resizable("instance"),i=t.options,s=function(t){e(t).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};"object"!=typeof i.alsoResize||i.alsoResize.parentNode?s(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e)})},resize:function(t,i){var s=e(this).resizable("instance"),n=s.options,a=s.originalSize,o=s.originalPosition,r={height:s.size.height-a.height||0,width:s.size.width-a.width||0,top:s.position.top-o.top||0,left:s.position.left-o.left||0},h=function(t,s){e(t).each(function(){var t=e(this),n=e(this).data("ui-resizable-alsoresize"),a={},o=s&&s.length?s:t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(o,function(e,t){var i=(n[t]||0)+(r[t]||0);i&&i>=0&&(a[t]=i||null)}),t.css(a)})};"object"!=typeof n.alsoResize||n.alsoResize.nodeType?h(n.alsoResize):e.each(n.alsoResize,function(e,t){h(e,t)})},stop:function(){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).resizable("instance"),i=t.options,s=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).resizable("instance");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).resizable("instance");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(){var t,i=e(this).resizable("instance"),s=i.options,n=i.size,a=i.originalSize,o=i.originalPosition,r=i.axis,h="number"==typeof s.grid?[s.grid,s.grid]:s.grid,l=h[0]||1,u=h[1]||1,d=Math.round((n.width-a.width)/l)*l,c=Math.round((n.height-a.height)/u)*u,p=a.width+d,f=a.height+c,m=s.maxWidth&&p>s.maxWidth,g=s.maxHeight&&f>s.maxHeight,v=s.minWidth&&s.minWidth>p,y=s.minHeight&&s.minHeight>f;s.grid=h,v&&(p+=l),y&&(f+=u),m&&(p-=l),g&&(f-=u),/^(se|s|e)$/.test(r)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.top=o.top-c):/^(sw)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.left=o.left-d):((0>=f-u||0>=p-l)&&(t=i._getPaddingPlusBorderDimensions(this)),f-u>0?(i.size.height=f,i.position.top=o.top-c):(f=u-t.height,i.size.height=f,i.position.top=o.top+a.height-f),p-l>0?(i.size.width=p,i.position.left=o.left-d):(p=u-t.height,i.size.width=p,i.position.left=o.left+a.width-p))}}),e.ui.resizable,e.widget("ui.dialog",{version:"1.11.2",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"Close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var i=e(this).css(t).offset().top;0>i&&e(this).css("top",t.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&e.fn.draggable&&this._makeDraggable(),this.options.resizable&&e.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var t=this.options.appendTo;return t&&(t.jquery||t.nodeType)?e(t):this.document.find(t||"body").eq(0)},_destroy:function(){var e,t=this.originalPosition;this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),e=t.parent.children().eq(t.index),e.length&&e[0]!==this.element[0]?e.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},disable:e.noop,enable:e.noop,close:function(t){var i,s=this;if(this._isOpen&&this._trigger("beforeClose",t)!==!1){if(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),!this.opener.filter(":focusable").focus().length)try{i=this.document[0].activeElement,i&&"body"!==i.nodeName.toLowerCase()&&e(i).blur()}catch(n){}this._hide(this.uiDialog,this.options.hide,function(){s._trigger("close",t)})}},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,i){var s=!1,n=this.uiDialog.siblings(".ui-front:visible").map(function(){return+e(this).css("z-index")}).get(),a=Math.max.apply(null,n);return a>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",a+1),s=!0),s&&!i&&this._trigger("focus",t),s},open:function(){var t=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),void 0):(this._isOpen=!0,this.opener=e(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){t._focusTabbable(),t._trigger("focus")}),this._makeFocusTarget(),this._trigger("open"),void 0)},_focusTabbable:function(){var e=this._focusedElement;e||(e=this.element.find("[autofocus]")),e.length||(e=this.element.find(":tabbable")),e.length||(e=this.uiDialogButtonPane.find(":tabbable")),e.length||(e=this.uiDialogTitlebarClose.filter(":tabbable")),e.length||(e=this.uiDialog),e.eq(0).focus()},_keepFocus:function(t){function i(){var t=this.document[0].activeElement,i=this.uiDialog[0]===t||e.contains(this.uiDialog[0],t);i||this._focusTabbable()}t.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(t){if(this.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===e.ui.keyCode.ESCAPE)return t.preventDefault(),this.close(t),void 0;
if(t.keyCode===e.ui.keyCode.TAB&&!t.isDefaultPrevented()){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");t.target!==n[0]&&t.target!==this.uiDialog[0]||t.shiftKey?t.target!==s[0]&&t.target!==this.uiDialog[0]||!t.shiftKey||(this._delay(function(){n.focus()}),t.preventDefault()):(this._delay(function(){s.focus()}),t.preventDefault())}},mousedown:function(e){this._moveToTop(e)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var t;this.uiDialogTitlebar=e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(t){e(t.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=e("<button type='button'></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(e){e.preventDefault(),this.close(e)}}),t=e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(t),this.uiDialog.attr({"aria-labelledby":t.attr("id")})},_title:function(e){this.options.title||e.html("&#160;"),e.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var t=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),e.isEmptyObject(i)||e.isArray(i)&&!i.length?(this.uiDialog.removeClass("ui-dialog-buttons"),void 0):(e.each(i,function(i,s){var n,a;s=e.isFunction(s)?{click:s,text:i}:s,s=e.extend({type:"button"},s),n=s.click,s.click=function(){n.apply(t.element[0],arguments)},a={icons:s.icons,text:s.showText},delete s.icons,delete s.showText,e("<button></button>",s).button(a).appendTo(t.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),void 0)},_makeDraggable:function(){function t(e){return{position:e.position,offset:e.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,n){e(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,t(n))},drag:function(e,s){i._trigger("drag",e,t(s))},stop:function(n,a){var o=a.offset.left-i.document.scrollLeft(),r=a.offset.top-i.document.scrollTop();s.position={my:"left top",at:"left"+(o>=0?"+":"")+o+" "+"top"+(r>=0?"+":"")+r,of:i.window},e(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,t(a))}})},_makeResizable:function(){function t(e){return{originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size}}var i=this,s=this.options,n=s.resizable,a=this.uiDialog.css("position"),o="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:o,start:function(s,n){e(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,t(n))},resize:function(e,s){i._trigger("resize",e,t(s))},stop:function(n,a){var o=i.uiDialog.offset(),r=o.left-i.document.scrollLeft(),h=o.top-i.document.scrollTop();s.height=i.uiDialog.height(),s.width=i.uiDialog.width(),s.position={my:"left top",at:"left"+(r>=0?"+":"")+r+" "+"top"+(h>=0?"+":"")+h,of:i.window},e(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,t(a))}}).css("position",a)},_trackFocus:function(){this._on(this.widget(),{focusin:function(t){this._makeFocusTarget(),this._focusedElement=e(t.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var t=this._trackingInstances(),i=e.inArray(this,t);-1!==i&&t.splice(i,1)},_trackingInstances:function(){var e=this.document.data("ui-dialog-instances");return e||(e=[],this.document.data("ui-dialog-instances",e)),e},_minHeight:function(){var e=this.options;return"auto"===e.height?e.minHeight:Math.min(e.minHeight,e.height)},_position:function(){var e=this.uiDialog.is(":visible");e||this.uiDialog.show(),this.uiDialog.position(this.options.position),e||this.uiDialog.hide()},_setOptions:function(t){var i=this,s=!1,n={};e.each(t,function(e,t){i._setOption(e,t),e in i.sizeRelatedOptions&&(s=!0),e in i.resizableRelatedOptions&&(n[e]=t)}),s&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",n)},_setOption:function(e,t){var i,s,n=this.uiDialog;"dialogClass"===e&&n.removeClass(this.options.dialogClass).addClass(t),"disabled"!==e&&(this._super(e,t),"appendTo"===e&&this.uiDialog.appendTo(this._appendTo()),"buttons"===e&&this._createButtons(),"closeText"===e&&this.uiDialogTitlebarClose.button({label:""+t}),"draggable"===e&&(i=n.is(":data(ui-draggable)"),i&&!t&&n.draggable("destroy"),!i&&t&&this._makeDraggable()),"position"===e&&this._position(),"resizable"===e&&(s=n.is(":data(ui-resizable)"),s&&!t&&n.resizable("destroy"),s&&"string"==typeof t&&n.resizable("option","handles",t),s||t===!1||this._makeResizable()),"title"===e&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var e,t,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),e=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),t=Math.max(0,s.minHeight-e),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-e):"none","auto"===s.height?this.element.css({minHeight:t,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-e)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var t=e(this);return e("<div>").css({position:"absolute",width:t.outerWidth(),height:t.outerHeight()}).appendTo(t.parent()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(t){return e(t.target).closest(".ui-dialog").length?!0:!!e(t.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var t=!0;this._delay(function(){t=!1}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function(e){t||this._allowInteraction(e)||(e.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var e=this.document.data("ui-dialog-overlays")-1;e?this.document.data("ui-dialog-overlays",e):this.document.unbind("focusin").removeData("ui-dialog-overlays"),this.overlay.remove(),this.overlay=null}}}),e.widget("ui.droppable",{version:"1.11.2",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var t,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=e.isFunction(s)?s:function(e){return e.is(s)},this.proportions=function(){return arguments.length?(t=arguments[0],void 0):t?t:t={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},this._addToManager(i.scope),i.addClasses&&this.element.addClass("ui-droppable")},_addToManager:function(t){e.ui.ddmanager.droppables[t]=e.ui.ddmanager.droppables[t]||[],e.ui.ddmanager.droppables[t].push(this)},_splice:function(e){for(var t=0;e.length>t;t++)e[t]===this&&e.splice(t,1)},_destroy:function(){var t=e.ui.ddmanager.droppables[this.options.scope];this._splice(t),this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(t,i){if("accept"===t)this.accept=e.isFunction(i)?i:function(e){return e.is(i)};else if("scope"===t){var s=e.ui.ddmanager.droppables[this.options.scope];this._splice(s),this._addToManager(i)}this._super(t,i)},_activate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",t,this.ui(i))},_deactivate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",t,this.ui(i))},_over:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(i)))},_out:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(i)))},_drop:function(t,i){var s=i||e.ui.ddmanager.current,n=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=e(this).droppable("instance");return i.options.greedy&&!i.options.disabled&&i.options.scope===s.options.scope&&i.accept.call(i.element[0],s.currentItem||s.element)&&e.ui.intersect(s,e.extend(i,{offset:i.element.offset()}),i.options.tolerance,t)?(n=!0,!1):void 0}),n?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(s)),this.element):!1):!1},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),e.ui.intersect=function(){function e(e,t,i){return e>=t&&t+i>e}return function(t,i,s,n){if(!i.offset)return!1;var a=(t.positionAbs||t.position.absolute).left+t.margins.left,o=(t.positionAbs||t.position.absolute).top+t.margins.top,r=a+t.helperProportions.width,h=o+t.helperProportions.height,l=i.offset.left,u=i.offset.top,d=l+i.proportions().width,c=u+i.proportions().height;switch(s){case"fit":return a>=l&&d>=r&&o>=u&&c>=h;case"intersect":return a+t.helperProportions.width/2>l&&d>r-t.helperProportions.width/2&&o+t.helperProportions.height/2>u&&c>h-t.helperProportions.height/2;case"pointer":return e(n.pageY,u,i.proportions().height)&&e(n.pageX,l,i.proportions().width);case"touch":return(o>=u&&c>=o||h>=u&&c>=h||u>o&&h>c)&&(a>=l&&d>=a||r>=l&&d>=r||l>a&&r>d);default:return!1}}}(),e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,i){var s,n,a=e.ui.ddmanager.droppables[t.options.scope]||[],o=i?i.type:null,r=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();e:for(s=0;a.length>s;s++)if(!(a[s].options.disabled||t&&!a[s].accept.call(a[s].element[0],t.currentItem||t.element))){for(n=0;r.length>n;n++)if(r[n]===a[s].element[0]){a[s].proportions().height=0;continue e}a[s].visible="none"!==a[s].element.css("display"),a[s].visible&&("mousedown"===o&&a[s]._activate.call(a[s],i),a[s].offset=a[s].element.offset(),a[s].proportions({width:a[s].element[0].offsetWidth,height:a[s].element[0].offsetHeight}))}},drop:function(t,i){var s=!1;return e.each((e.ui.ddmanager.droppables[t.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance,i)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(t,i){t.element.parentsUntil("body").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)})},drag:function(t,i){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,i),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,n,a,o=e.ui.intersect(t,this,this.options.tolerance,i),r=!o&&this.isover?"isout":o&&!this.isover?"isover":null;r&&(this.options.greedy&&(n=this.options.scope,a=this.element.parents(":data(ui-droppable)").filter(function(){return e(this).droppable("instance").options.scope===n}),a.length&&(s=e(a[0]).droppable("instance"),s.greedyChild="isover"===r)),s&&"isover"===r&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[r]=!0,this["isout"===r?"isover":"isout"]=!1,this["isover"===r?"_over":"_out"].call(this,i),s&&"isout"===r&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(t,i){t.element.parentsUntil("body").unbind("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)}},e.ui.droppable;var y="ui-effects-",b=e;e.effects={effect:{}},function(e,t){function i(e,t,i){var s=d[t.type]||{};return null==e?i||!t.def?null:t.def:(e=s.floor?~~e:parseFloat(e),isNaN(e)?t.def:s.mod?(e+s.mod)%s.mod:0>e?0:e>s.max?s.max:e)}function s(i){var s=l(),n=s._rgba=[];return i=i.toLowerCase(),f(h,function(e,a){var o,r=a.re.exec(i),h=r&&a.parse(r),l=a.space||"rgba";return h?(o=s[l](h),s[u[l].cache]=o[u[l].cache],n=s._rgba=o._rgba,!1):t}),n.length?("0,0,0,0"===n.join()&&e.extend(n,a.transparent),s):a[i]}function n(e,t,i){return i=(i+1)%1,1>6*i?e+6*(t-e)*i:1>2*i?t:2>3*i?e+6*(t-e)*(2/3-i):e}var a,o="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],l=e.Color=function(t,i,s,n){return new e.Color.fn.parse(t,i,s,n)},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},d={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},c=l.support={},p=e("<p>")[0],f=e.each;p.style.cssText="background-color:rgba(1,1,1,.5)",c.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(u,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),l.fn=e.extend(l.prototype,{parse:function(n,o,r,h){if(n===t)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=e(n).css(o),o=t);var d=this,c=e.type(n),p=this._rgba=[];return o!==t&&(n=[n,o,r,h],c="array"),"string"===c?this.parse(s(n)||a._default):"array"===c?(f(u.rgba.props,function(e,t){p[t.idx]=i(n[t.idx],t)}),this):"object"===c?(n instanceof l?f(u,function(e,t){n[t.cache]&&(d[t.cache]=n[t.cache].slice())}):f(u,function(t,s){var a=s.cache;f(s.props,function(e,t){if(!d[a]&&s.to){if("alpha"===e||null==n[e])return;d[a]=s.to(d._rgba)}d[a][t.idx]=i(n[e],t,!0)}),d[a]&&0>e.inArray(null,d[a].slice(0,3))&&(d[a][3]=1,s.from&&(d._rgba=s.from(d[a])))}),this):t},is:function(e){var i=l(e),s=!0,n=this;return f(u,function(e,a){var o,r=i[a.cache];return r&&(o=n[a.cache]||a.to&&a.to(n._rgba)||[],f(a.props,function(e,i){return null!=r[i.idx]?s=r[i.idx]===o[i.idx]:t})),s}),s},_space:function(){var e=[],t=this;return f(u,function(i,s){t[s.cache]&&e.push(i)}),e.pop()},transition:function(e,t){var s=l(e),n=s._space(),a=u[n],o=0===this.alpha()?l("transparent"):this,r=o[a.cache]||a.to(o._rgba),h=r.slice();return s=s[a.cache],f(a.props,function(e,n){var a=n.idx,o=r[a],l=s[a],u=d[n.type]||{};null!==l&&(null===o?h[a]=l:(u.mod&&(l-o>u.mod/2?o+=u.mod:o-l>u.mod/2&&(o-=u.mod)),h[a]=i((l-o)*t+o,n)))}),this[n](h)},blend:function(t){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=l(t)._rgba;return l(e.map(i,function(e,t){return(1-s)*n[t]+s*e}))},toRgbaString:function(){var t="rgba(",i=e.map(this._rgba,function(e,t){return null==e?t>2?1:0:e});return 1===i[3]&&(i.pop(),t="rgb("),t+i.join()+")"},toHslaString:function(){var t="hsla(",i=e.map(this.hsla(),function(e,t){return null==e&&(e=t>2?1:0),t&&3>t&&(e=Math.round(100*e)+"%"),e});return 1===i[3]&&(i.pop(),t="hsl("),t+i.join()+")"},toHexString:function(t){var i=this._rgba.slice(),s=i.pop();return t&&i.push(~~(255*s)),"#"+e.map(i,function(e){return e=(e||0).toString(16),1===e.length?"0"+e:e}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,u.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t,i,s=e[0]/255,n=e[1]/255,a=e[2]/255,o=e[3],r=Math.max(s,n,a),h=Math.min(s,n,a),l=r-h,u=r+h,d=.5*u;return t=h===r?0:s===r?60*(n-a)/l+360:n===r?60*(a-s)/l+120:60*(s-n)/l+240,i=0===l?0:.5>=d?l/u:l/(2-u),[Math.round(t)%360,i,d,null==o?1:o]},u.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t=e[0]/360,i=e[1],s=e[2],a=e[3],o=.5>=s?s*(1+i):s+i-s*i,r=2*s-o;return[Math.round(255*n(r,o,t+1/3)),Math.round(255*n(r,o,t)),Math.round(255*n(r,o,t-1/3)),a]},f(u,function(s,n){var a=n.props,o=n.cache,h=n.to,u=n.from;l.fn[s]=function(s){if(h&&!this[o]&&(this[o]=h(this._rgba)),s===t)return this[o].slice();var n,r=e.type(s),d="array"===r||"object"===r?s:arguments,c=this[o].slice();return f(a,function(e,t){var s=d["object"===r?e:t.idx];null==s&&(s=c[t.idx]),c[t.idx]=i(s,t)}),u?(n=l(u(c)),n[o]=c,n):l(c)},f(a,function(t,i){l.fn[t]||(l.fn[t]=function(n){var a,o=e.type(n),h="alpha"===t?this._hsla?"hsla":"rgba":s,l=this[h](),u=l[i.idx];return"undefined"===o?u:("function"===o&&(n=n.call(this,u),o=e.type(n)),null==n&&i.empty?this:("string"===o&&(a=r.exec(n),a&&(n=u+parseFloat(a[2])*("+"===a[1]?1:-1))),l[i.idx]=n,this[h](l)))})})}),l.hook=function(t){var i=t.split(" ");f(i,function(t,i){e.cssHooks[i]={set:function(t,n){var a,o,r="";if("transparent"!==n&&("string"!==e.type(n)||(a=s(n)))){if(n=l(a||n),!c.rgba&&1!==n._rgba[3]){for(o="backgroundColor"===i?t.parentNode:t;(""===r||"transparent"===r)&&o&&o.style;)try{r=e.css(o,"backgroundColor"),o=o.parentNode}catch(h){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{t.style[i]=n}catch(h){}}},e.fx.step[i]=function(t){t.colorInit||(t.start=l(t.elem,i),t.end=l(t.end),t.colorInit=!0),e.cssHooks[i].set(t.elem,t.start.transition(t.end,t.pos))}})},l.hook(o),e.cssHooks.borderColor={expand:function(e){var t={};return f(["Top","Right","Bottom","Left"],function(i,s){t["border"+s+"Color"]=e}),t}},a=e.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(b),function(){function t(t){var i,s,n=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,a={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(a[e.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(a[i]=n[i]);return a}function i(t,i){var s,a,o={};for(s in i)a=i[s],t[s]!==a&&(n[s]||(e.fx.step[s]||!isNaN(parseFloat(a)))&&(o[s]=a));return o}var s=["add","remove","toggle"],n={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,i){e.fx.step[i]=function(e){("none"!==e.end&&!e.setAttr||1===e.pos&&!e.setAttr)&&(b.style(e.elem,i,e.end),e.setAttr=!0)}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e.effects.animateClass=function(n,a,o,r){var h=e.speed(a,o,r);return this.queue(function(){var a,o=e(this),r=o.attr("class")||"",l=h.children?o.find("*").addBack():o;l=l.map(function(){var i=e(this);return{el:i,start:t(this)}}),a=function(){e.each(s,function(e,t){n[t]&&o[t+"Class"](n[t])})},a(),l=l.map(function(){return this.end=t(this.el[0]),this.diff=i(this.start,this.end),this}),o.attr("class",r),l=l.map(function(){var t=this,i=e.Deferred(),s=e.extend({},h,{queue:!1,complete:function(){i.resolve(t)}});return this.el.animate(this.diff,s),i.promise()}),e.when.apply(e,l.get()).done(function(){a(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),h.complete.call(o[0])})})},e.fn.extend({addClass:function(t){return function(i,s,n,a){return s?e.effects.animateClass.call(this,{add:i},s,n,a):t.apply(this,arguments)}}(e.fn.addClass),removeClass:function(t){return function(i,s,n,a){return arguments.length>1?e.effects.animateClass.call(this,{remove:i},s,n,a):t.apply(this,arguments)}}(e.fn.removeClass),toggleClass:function(t){return function(i,s,n,a,o){return"boolean"==typeof s||void 0===s?n?e.effects.animateClass.call(this,s?{add:i}:{remove:i},n,a,o):t.apply(this,arguments):e.effects.animateClass.call(this,{toggle:i},s,n,a)}}(e.fn.toggleClass),switchClass:function(t,i,s,n,a){return e.effects.animateClass.call(this,{add:i,remove:t},s,n,a)}})}(),function(){function t(t,i,s,n){return e.isPlainObject(t)&&(i=t,t=t.effect),t={effect:t},null==i&&(i={}),e.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||e.fx.speeds[i])&&(n=s,s=i,i={}),e.isFunction(s)&&(n=s,s=null),i&&e.extend(t,i),s=s||i.duration,t.duration=e.fx.off?0:"number"==typeof s?s:s in e.fx.speeds?e.fx.speeds[s]:e.fx.speeds._default,t.complete=n||i.complete,t}function i(t){return!t||"number"==typeof t||e.fx.speeds[t]?!0:"string"!=typeof t||e.effects.effect[t]?e.isFunction(t)?!0:"object"!=typeof t||t.effect?!1:!0:!0}e.extend(e.effects,{version:"1.11.2",save:function(e,t){for(var i=0;t.length>i;i++)null!==t[i]&&e.data(y+t[i],e[0].style[t[i]])},restore:function(e,t){var i,s;for(s=0;t.length>s;s++)null!==t[s]&&(i=e.data(y+t[s]),void 0===i&&(i=""),e.css(t[s],i))},setMode:function(e,t){return"toggle"===t&&(t=e.is(":hidden")?"show":"hide"),t},getBaseline:function(e,t){var i,s;switch(e[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=e[0]/t.height}switch(e[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=e[1]/t.width}return{x:s,y:i}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var i={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},s=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:t.width(),height:t.height()},a=document.activeElement;try{a.id}catch(o){a=document.body}return t.wrap(s),(t[0]===a||e.contains(t[0],a))&&e(a).focus(),s=t.parent(),"static"===t.css("position")?(s.css({position:"relative"}),t.css({position:"relative"})):(e.extend(i,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,s){i[s]=t.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(n),s.css(i).show()},removeWrapper:function(t){var i=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===i||e.contains(t[0],i))&&e(i).focus()),t},setTransition:function(t,i,s,n){return n=n||{},e.each(i,function(e,i){var a=t.cssUnit(i);a[0]>0&&(n[i]=a[0]*s+a[1])}),n}}),e.fn.extend({effect:function(){function i(t){function i(){e.isFunction(a)&&a.call(n[0]),e.isFunction(t)&&t()}var n=e(this),a=s.complete,r=s.mode;(n.is(":hidden")?"hide"===r:"show"===r)?(n[r](),i()):o.call(n[0],s,i)}var s=t.apply(this,arguments),n=s.mode,a=s.queue,o=e.effects.effect[s.effect];return e.fx.off||!o?n?this[n](s.duration,s.complete):this.each(function(){s.complete&&s.complete.call(this)}):a===!1?this.each(i):this.queue(a||"fx",i)},show:function(e){return function(s){if(i(s))return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="show",this.effect.call(this,n)}}(e.fn.show),hide:function(e){return function(s){if(i(s))return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="hide",this.effect.call(this,n)}}(e.fn.hide),toggle:function(e){return function(s){if(i(s)||"boolean"==typeof s)return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n)}}(e.fn.toggle),cssUnit:function(t){var i=this.css(t),s=[];return e.each(["em","px","%","pt"],function(e,t){i.indexOf(t)>0&&(s=[parseFloat(i),t])}),s}})}(),function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,i){t[i]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return 0===e||1===e?e:-Math.pow(2,8*(e-1))*Math.sin((80*(e-1)-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){for(var t,i=4;((t=Math.pow(2,--i))-1)/11>e;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*t-2)/22-e,2)}}),e.each(t,function(t,i){e.easing["easeIn"+t]=i,e.easing["easeOut"+t]=function(e){return 1-i(1-e)},e.easing["easeInOut"+t]=function(e){return.5>e?i(2*e)/2:1-i(-2*e+2)/2}})}(),e.effects,e.effects.effect.blind=function(t,i){var s,n,a,o=e(this),r=/up|down|vertical/,h=/up|left|vertical|horizontal/,l=["position","top","bottom","left","right","height","width"],u=e.effects.setMode(o,t.mode||"hide"),d=t.direction||"up",c=r.test(d),p=c?"height":"width",f=c?"top":"left",m=h.test(d),g={},v="show"===u;o.parent().is(".ui-effects-wrapper")?e.effects.save(o.parent(),l):e.effects.save(o,l),o.show(),s=e.effects.createWrapper(o).css({overflow:"hidden"}),n=s[p](),a=parseFloat(s.css(f))||0,g[p]=v?n:0,m||(o.css(c?"bottom":"right",0).css(c?"top":"left","auto").css({position:"absolute"}),g[f]=v?a:n+a),v&&(s.css(p,0),m||s.css(f,a+n)),s.animate(g,{duration:t.duration,easing:t.easing,queue:!1,complete:function(){"hide"===u&&o.hide(),e.effects.restore(o,l),e.effects.removeWrapper(o),i()}})},e.effects.effect.bounce=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","height","width"],h=e.effects.setMode(o,t.mode||"effect"),l="hide"===h,u="show"===h,d=t.direction||"up",c=t.distance,p=t.times||5,f=2*p+(u||l?1:0),m=t.duration/f,g=t.easing,v="up"===d||"down"===d?"top":"left",y="up"===d||"left"===d,b=o.queue(),_=b.length;for((u||l)&&r.push("opacity"),e.effects.save(o,r),o.show(),e.effects.createWrapper(o),c||(c=o["top"===v?"outerHeight":"outerWidth"]()/3),u&&(a={opacity:1},a[v]=0,o.css("opacity",0).css(v,y?2*-c:2*c).animate(a,m,g)),l&&(c/=Math.pow(2,p-1)),a={},a[v]=0,s=0;p>s;s++)n={},n[v]=(y?"-=":"+=")+c,o.animate(n,m,g).animate(a,m,g),c=l?2*c:c/2;l&&(n={opacity:0},n[v]=(y?"-=":"+=")+c,o.animate(n,m,g)),o.queue(function(){l&&o.hide(),e.effects.restore(o,r),e.effects.removeWrapper(o),i()}),_>1&&b.splice.apply(b,[1,0].concat(b.splice(_,f+1))),o.dequeue()},e.effects.effect.clip=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","height","width"],h=e.effects.setMode(o,t.mode||"hide"),l="show"===h,u=t.direction||"vertical",d="vertical"===u,c=d?"height":"width",p=d?"top":"left",f={};e.effects.save(o,r),o.show(),s=e.effects.createWrapper(o).css({overflow:"hidden"}),n="IMG"===o[0].tagName?s:o,a=n[c](),l&&(n.css(c,0),n.css(p,a/2)),f[c]=l?a:0,f[p]=l?0:a/2,n.animate(f,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){l||o.hide(),e.effects.restore(o,r),e.effects.removeWrapper(o),i()}})},e.effects.effect.drop=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","opacity","height","width"],o=e.effects.setMode(n,t.mode||"hide"),r="show"===o,h=t.direction||"left",l="up"===h||"down"===h?"top":"left",u="up"===h||"left"===h?"pos":"neg",d={opacity:r?1:0};e.effects.save(n,a),n.show(),e.effects.createWrapper(n),s=t.distance||n["top"===l?"outerHeight":"outerWidth"](!0)/2,r&&n.css("opacity",0).css(l,"pos"===u?-s:s),d[l]=(r?"pos"===u?"+=":"-=":"pos"===u?"-=":"+=")+s,n.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i()}})},e.effects.effect.explode=function(t,i){function s(){b.push(this),b.length===d*c&&n()}function n(){p.css({visibility:"visible"}),e(b).remove(),m||p.hide(),i()}var a,o,r,h,l,u,d=t.pieces?Math.round(Math.sqrt(t.pieces)):3,c=d,p=e(this),f=e.effects.setMode(p,t.mode||"hide"),m="show"===f,g=p.show().css("visibility","hidden").offset(),v=Math.ceil(p.outerWidth()/c),y=Math.ceil(p.outerHeight()/d),b=[];for(a=0;d>a;a++)for(h=g.top+a*y,u=a-(d-1)/2,o=0;c>o;o++)r=g.left+o*v,l=o-(c-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-o*v,top:-a*y}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:y,left:r+(m?l*v:0),top:h+(m?u*y:0),opacity:m?0:1}).animate({left:r+(m?0:l*v),top:h+(m?0:u*y),opacity:m?1:0},t.duration||500,t.easing,s)},e.effects.effect.fade=function(t,i){var s=e(this),n=e.effects.setMode(s,t.mode||"toggle");s.animate({opacity:n},{queue:!1,duration:t.duration,easing:t.easing,complete:i})},e.effects.effect.fold=function(t,i){var s,n,a=e(this),o=["position","top","bottom","left","right","height","width"],r=e.effects.setMode(a,t.mode||"hide"),h="show"===r,l="hide"===r,u=t.size||15,d=/([0-9]+)%/.exec(u),c=!!t.horizFirst,p=h!==c,f=p?["width","height"]:["height","width"],m=t.duration/2,g={},v={};e.effects.save(a,o),a.show(),s=e.effects.createWrapper(a).css({overflow:"hidden"}),n=p?[s.width(),s.height()]:[s.height(),s.width()],d&&(u=parseInt(d[1],10)/100*n[l?0:1]),h&&s.css(c?{height:0,width:u}:{height:u,width:0}),g[f[0]]=h?n[0]:u,v[f[1]]=h?n[1]:0,s.animate(g,m,t.easing).animate(v,m,t.easing,function(){l&&a.hide(),e.effects.restore(a,o),e.effects.removeWrapper(a),i()})},e.effects.effect.highlight=function(t,i){var s=e(this),n=["backgroundImage","backgroundColor","opacity"],a=e.effects.setMode(s,t.mode||"show"),o={backgroundColor:s.css("backgroundColor")};"hide"===a&&(o.opacity=0),e.effects.save(s,n),s.show().css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(o,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===a&&s.hide(),e.effects.restore(s,n),i()}})},e.effects.effect.size=function(t,i){var s,n,a,o=e(this),r=["position","top","bottom","left","right","width","height","overflow","opacity"],h=["position","top","bottom","left","right","overflow","opacity"],l=["width","height","overflow"],u=["fontSize"],d=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],c=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=e.effects.setMode(o,t.mode||"effect"),f=t.restore||"effect"!==p,m=t.scale||"both",g=t.origin||["middle","center"],v=o.css("position"),y=f?r:h,b={height:0,width:0,outerHeight:0,outerWidth:0};"show"===p&&o.show(),s={height:o.height(),width:o.width(),outerHeight:o.outerHeight(),outerWidth:o.outerWidth()},"toggle"===t.mode&&"show"===p?(o.from=t.to||b,o.to=t.from||s):(o.from=t.from||("show"===p?b:s),o.to=t.to||("hide"===p?b:s)),a={from:{y:o.from.height/s.height,x:o.from.width/s.width},to:{y:o.to.height/s.height,x:o.to.width/s.width}},("box"===m||"both"===m)&&(a.from.y!==a.to.y&&(y=y.concat(d),o.from=e.effects.setTransition(o,d,a.from.y,o.from),o.to=e.effects.setTransition(o,d,a.to.y,o.to)),a.from.x!==a.to.x&&(y=y.concat(c),o.from=e.effects.setTransition(o,c,a.from.x,o.from),o.to=e.effects.setTransition(o,c,a.to.x,o.to))),("content"===m||"both"===m)&&a.from.y!==a.to.y&&(y=y.concat(u).concat(l),o.from=e.effects.setTransition(o,u,a.from.y,o.from),o.to=e.effects.setTransition(o,u,a.to.y,o.to)),e.effects.save(o,y),o.show(),e.effects.createWrapper(o),o.css("overflow","hidden").css(o.from),g&&(n=e.effects.getBaseline(g,s),o.from.top=(s.outerHeight-o.outerHeight())*n.y,o.from.left=(s.outerWidth-o.outerWidth())*n.x,o.to.top=(s.outerHeight-o.to.outerHeight)*n.y,o.to.left=(s.outerWidth-o.to.outerWidth)*n.x),o.css(o.from),("content"===m||"both"===m)&&(d=d.concat(["marginTop","marginBottom"]).concat(u),c=c.concat(["marginLeft","marginRight"]),l=r.concat(d).concat(c),o.find("*[width]").each(function(){var i=e(this),s={height:i.height(),width:i.width(),outerHeight:i.outerHeight(),outerWidth:i.outerWidth()};
f&&e.effects.save(i,l),i.from={height:s.height*a.from.y,width:s.width*a.from.x,outerHeight:s.outerHeight*a.from.y,outerWidth:s.outerWidth*a.from.x},i.to={height:s.height*a.to.y,width:s.width*a.to.x,outerHeight:s.height*a.to.y,outerWidth:s.width*a.to.x},a.from.y!==a.to.y&&(i.from=e.effects.setTransition(i,d,a.from.y,i.from),i.to=e.effects.setTransition(i,d,a.to.y,i.to)),a.from.x!==a.to.x&&(i.from=e.effects.setTransition(i,c,a.from.x,i.from),i.to=e.effects.setTransition(i,c,a.to.x,i.to)),i.css(i.from),i.animate(i.to,t.duration,t.easing,function(){f&&e.effects.restore(i,l)})})),o.animate(o.to,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){0===o.to.opacity&&o.css("opacity",o.from.opacity),"hide"===p&&o.hide(),e.effects.restore(o,y),f||("static"===v?o.css({position:"relative",top:o.to.top,left:o.to.left}):e.each(["top","left"],function(e,t){o.css(t,function(t,i){var s=parseInt(i,10),n=e?o.to.left:o.to.top;return"auto"===i?n+"px":s+n+"px"})})),e.effects.removeWrapper(o),i()}})},e.effects.effect.scale=function(t,i){var s=e(this),n=e.extend(!0,{},t),a=e.effects.setMode(s,t.mode||"effect"),o=parseInt(t.percent,10)||(0===parseInt(t.percent,10)?0:"hide"===a?0:100),r=t.direction||"both",h=t.origin,l={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()},u={y:"horizontal"!==r?o/100:1,x:"vertical"!==r?o/100:1};n.effect="size",n.queue=!1,n.complete=i,"effect"!==a&&(n.origin=h||["middle","center"],n.restore=!0),n.from=t.from||("show"===a?{height:0,width:0,outerHeight:0,outerWidth:0}:l),n.to={height:l.height*u.y,width:l.width*u.x,outerHeight:l.outerHeight*u.y,outerWidth:l.outerWidth*u.x},n.fade&&("show"===a&&(n.from.opacity=0,n.to.opacity=1),"hide"===a&&(n.from.opacity=1,n.to.opacity=0)),s.effect(n)},e.effects.effect.puff=function(t,i){var s=e(this),n=e.effects.setMode(s,t.mode||"hide"),a="hide"===n,o=parseInt(t.percent,10)||150,r=o/100,h={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()};e.extend(t,{effect:"scale",queue:!1,fade:!0,mode:n,complete:i,percent:a?o:100,from:a?h:{height:h.height*r,width:h.width*r,outerHeight:h.outerHeight*r,outerWidth:h.outerWidth*r}}),s.effect(t)},e.effects.effect.pulsate=function(t,i){var s,n=e(this),a=e.effects.setMode(n,t.mode||"show"),o="show"===a,r="hide"===a,h=o||"hide"===a,l=2*(t.times||5)+(h?1:0),u=t.duration/l,d=0,c=n.queue(),p=c.length;for((o||!n.is(":visible"))&&(n.css("opacity",0).show(),d=1),s=1;l>s;s++)n.animate({opacity:d},u,t.easing),d=1-d;n.animate({opacity:d},u,t.easing),n.queue(function(){r&&n.hide(),i()}),p>1&&c.splice.apply(c,[1,0].concat(c.splice(p,l+1))),n.dequeue()},e.effects.effect.shake=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","height","width"],o=e.effects.setMode(n,t.mode||"effect"),r=t.direction||"left",h=t.distance||20,l=t.times||3,u=2*l+1,d=Math.round(t.duration/u),c="up"===r||"down"===r?"top":"left",p="up"===r||"left"===r,f={},m={},g={},v=n.queue(),y=v.length;for(e.effects.save(n,a),n.show(),e.effects.createWrapper(n),f[c]=(p?"-=":"+=")+h,m[c]=(p?"+=":"-=")+2*h,g[c]=(p?"-=":"+=")+2*h,n.animate(f,d,t.easing),s=1;l>s;s++)n.animate(m,d,t.easing).animate(g,d,t.easing);n.animate(m,d,t.easing).animate(f,d/2,t.easing).queue(function(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i()}),y>1&&v.splice.apply(v,[1,0].concat(v.splice(y,u+1))),n.dequeue()},e.effects.effect.slide=function(t,i){var s,n=e(this),a=["position","top","bottom","left","right","width","height"],o=e.effects.setMode(n,t.mode||"show"),r="show"===o,h=t.direction||"left",l="up"===h||"down"===h?"top":"left",u="up"===h||"left"===h,d={};e.effects.save(n,a),n.show(),s=t.distance||n["top"===l?"outerHeight":"outerWidth"](!0),e.effects.createWrapper(n).css({overflow:"hidden"}),r&&n.css(l,u?isNaN(s)?"-"+s:-s:s),d[l]=(r?u?"+=":"-=":u?"-=":"+=")+s,n.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){"hide"===o&&n.hide(),e.effects.restore(n,a),e.effects.removeWrapper(n),i()}})},e.effects.effect.transfer=function(t,i){var s=e(this),n=e(t.to),a="fixed"===n.css("position"),o=e("body"),r=a?o.scrollTop():0,h=a?o.scrollLeft():0,l=n.offset(),u={top:l.top-r,left:l.left-h,height:n.innerHeight(),width:n.innerWidth()},d=s.offset(),c=e("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(t.className).css({top:d.top-r,left:d.left-h,height:s.innerHeight(),width:s.innerWidth(),position:a?"fixed":"absolute"}).animate(u,t.duration,t.easing,function(){c.remove(),i()})},e.widget("ui.progressbar",{version:"1.11.2",options:{max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min}),this.valueDiv=e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()},value:function(e){return void 0===e?this.options.value:(this.options.value=this._constrainedValue(e),this._refreshValue(),void 0)},_constrainedValue:function(e){return void 0===e&&(e=this.options.value),this.indeterminate=e===!1,"number"!=typeof e&&(e=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,e))},_setOptions:function(e){var t=e.value;delete e.value,this._super(e),this.options.value=this._constrainedValue(t),this._refreshValue()},_setOption:function(e,t){"max"===e&&(t=Math.max(this.min,t)),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this._super(e,t)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var t=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||t>this.min).toggleClass("ui-corner-right",t===this.options.max).width(i.toFixed(0)+"%"),this.element.toggleClass("ui-progressbar-indeterminate",this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=e("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":t}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==t&&(this.oldValue=t,this._trigger("change")),t===this.options.max&&this._trigger("complete")}}),e.widget("ui.selectable",e.ui.mouse,{version:"1.11.2",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var t,i=this;this.element.addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){t=e(i.options.filter,i.element[0]),t.addClass("ui-selectee"),t.each(function(){var t=e(this),i=t.offset();e.data(this,"selectable-item",{element:this,$element:t,left:i.left,top:i.top,right:i.left+t.outerWidth(),bottom:i.top+t.outerHeight(),startselected:!1,selected:t.hasClass("ui-selected"),selecting:t.hasClass("ui-selecting"),unselecting:t.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=t.addClass("ui-selectee"),this._mouseInit(),this.helper=e("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(t){var i=this,s=this.options;this.opos=[t.pageX,t.pageY],this.options.disabled||(this.selectees=e(s.filter,this.element[0]),this._trigger("start",t),e(s.appendTo).append(this.helper),this.helper.css({left:t.pageX,top:t.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=e.data(this,"selectable-item");s.startselected=!0,t.metaKey||t.ctrlKey||(s.$element.removeClass("ui-selected"),s.selected=!1,s.$element.addClass("ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",t,{unselecting:s.element}))}),e(t.target).parents().addBack().each(function(){var s,n=e.data(this,"selectable-item");return n?(s=!t.metaKey&&!t.ctrlKey||!n.$element.hasClass("ui-selected"),n.$element.removeClass(s?"ui-unselecting":"ui-selected").addClass(s?"ui-selecting":"ui-unselecting"),n.unselecting=!s,n.selecting=s,n.selected=s,s?i._trigger("selecting",t,{selecting:n.element}):i._trigger("unselecting",t,{unselecting:n.element}),!1):void 0}))},_mouseDrag:function(t){if(this.dragged=!0,!this.options.disabled){var i,s=this,n=this.options,a=this.opos[0],o=this.opos[1],r=t.pageX,h=t.pageY;return a>r&&(i=r,r=a,a=i),o>h&&(i=h,h=o,o=i),this.helper.css({left:a,top:o,width:r-a,height:h-o}),this.selectees.each(function(){var i=e.data(this,"selectable-item"),l=!1;i&&i.element!==s.element[0]&&("touch"===n.tolerance?l=!(i.left>r||a>i.right||i.top>h||o>i.bottom):"fit"===n.tolerance&&(l=i.left>a&&r>i.right&&i.top>o&&h>i.bottom),l?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,s._trigger("selecting",t,{selecting:i.element}))):(i.selecting&&((t.metaKey||t.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),s._trigger("unselecting",t,{unselecting:i.element}))),i.selected&&(t.metaKey||t.ctrlKey||i.startselected||(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,s._trigger("unselecting",t,{unselecting:i.element})))))}),!1}},_mouseStop:function(t){var i=this;return this.dragged=!1,e(".ui-unselecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",t,{unselected:s.element})}),e(".ui-selecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-selecting").addClass("ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",t,{selected:s.element})}),this._trigger("stop",t),this.helper.remove(),!1}}),e.widget("ui.selectmenu",{version:"1.11.2",defaultElement:"<select>",options:{appendTo:null,disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:null,change:null,close:null,focus:null,open:null,select:null},_create:function(){var e=this.element.uniqueId().attr("id");this.ids={element:e,button:e+"-button",menu:e+"-menu"},this._drawButton(),this._drawMenu(),this.options.disabled&&this.disable()},_drawButton:function(){var t=this,i=this.element.attr("tabindex");this.label=e("label[for='"+this.ids.element+"']").attr("for",this.ids.button),this._on(this.label,{click:function(e){this.button.focus(),e.preventDefault()}}),this.element.hide(),this.button=e("<span>",{"class":"ui-selectmenu-button ui-widget ui-state-default ui-corner-all",tabindex:i||this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true"}).insertAfter(this.element),e("<span>",{"class":"ui-icon "+this.options.icons.button}).prependTo(this.button),this.buttonText=e("<span>",{"class":"ui-selectmenu-text"}).appendTo(this.button),this._setText(this.buttonText,this.element.find("option:selected").text()),this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){t.menuItems||t._refreshMenu()}),this._hoverable(this.button),this._focusable(this.button)},_drawMenu:function(){var t=this;this.menu=e("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),this.menuWrap=e("<div>",{"class":"ui-selectmenu-menu ui-front"}).append(this.menu).appendTo(this._appendTo()),this.menuInstance=this.menu.menu({role:"listbox",select:function(e,i){e.preventDefault(),t._setSelection(),t._select(i.item.data("ui-selectmenu-item"),e)},focus:function(e,i){var s=i.item.data("ui-selectmenu-item");null!=t.focusIndex&&s.index!==t.focusIndex&&(t._trigger("focus",e,{item:s}),t.isOpen||t._select(s,e)),t.focusIndex=s.index,t.button.attr("aria-activedescendant",t.menuItems.eq(s.index).attr("id"))}}).menu("instance"),this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"),this.menuInstance._off(this.menu,"mouseleave"),this.menuInstance._closeOnDocumentClick=function(){return!1},this.menuInstance._isDivider=function(){return!1}},refresh:function(){this._refreshMenu(),this._setText(this.buttonText,this._getSelectedItem().text()),this.options.width||this._resizeButton()},_refreshMenu:function(){this.menu.empty();var e,t=this.element.find("option");t.length&&(this._parseOptions(t),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup"),e=this._getSelectedItem(),this.menuInstance.focus(null,e),this._setAria(e.data("ui-selectmenu-item")),this._setOption("disabled",this.element.prop("disabled")))},open:function(e){this.options.disabled||(this.menuItems?(this.menu.find(".ui-state-focus").removeClass("ui-state-focus"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",e))},_position:function(){this.menuWrap.position(e.extend({of:this.button},this.options.position))},close:function(e){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",e))},widget:function(){return this.button},menuWidget:function(){return this.menu},_renderMenu:function(t,i){var s=this,n="";e.each(i,function(i,a){a.optgroup!==n&&(e("<li>",{"class":"ui-selectmenu-optgroup ui-menu-divider"+(a.element.parent("optgroup").prop("disabled")?" ui-state-disabled":""),text:a.optgroup}).appendTo(t),n=a.optgroup),s._renderItemData(t,a)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-selectmenu-item",t)},_renderItem:function(t,i){var s=e("<li>");return i.disabled&&s.addClass("ui-state-disabled"),this._setText(s,i.label),s.appendTo(t)},_setText:function(e,t){t?e.text(t):e.html("&#160;")},_move:function(e,t){var i,s,n=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex):(i=this.menuItems.eq(this.element[0].selectedIndex),n+=":not(.ui-state-disabled)"),s="first"===e||"last"===e?i["first"===e?"prevAll":"nextAll"](n).eq(-1):i[e+"All"](n).eq(0),s.length&&this.menuInstance.focus(t,s)},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex)},_toggle:function(e){this[this.isOpen?"close":"open"](e)},_setSelection:function(){var e;this.range&&(window.getSelection?(e=window.getSelection(),e.removeAllRanges(),e.addRange(this.range)):this.range.select(),this.button.focus())},_documentClick:{mousedown:function(t){this.isOpen&&(e(t.target).closest(".ui-selectmenu-menu, #"+this.ids.button).length||this.close(t))}},_buttonEvents:{mousedown:function(){var e;window.getSelection?(e=window.getSelection(),e.rangeCount&&(this.range=e.getRangeAt(0))):this.range=document.selection.createRange()},click:function(e){this._setSelection(),this._toggle(e)},keydown:function(t){var i=!0;switch(t.keyCode){case e.ui.keyCode.TAB:case e.ui.keyCode.ESCAPE:this.close(t),i=!1;break;case e.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(t);break;case e.ui.keyCode.UP:t.altKey?this._toggle(t):this._move("prev",t);break;case e.ui.keyCode.DOWN:t.altKey?this._toggle(t):this._move("next",t);break;case e.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(t):this._toggle(t);break;case e.ui.keyCode.LEFT:this._move("prev",t);break;case e.ui.keyCode.RIGHT:this._move("next",t);break;case e.ui.keyCode.HOME:case e.ui.keyCode.PAGE_UP:this._move("first",t);break;case e.ui.keyCode.END:case e.ui.keyCode.PAGE_DOWN:this._move("last",t);break;default:this.menu.trigger(t),i=!1}i&&t.preventDefault()}},_selectFocusedItem:function(e){var t=this.menuItems.eq(this.focusIndex);t.hasClass("ui-state-disabled")||this._select(t.data("ui-selectmenu-item"),e)},_select:function(e,t){var i=this.element[0].selectedIndex;this.element[0].selectedIndex=e.index,this._setText(this.buttonText,e.label),this._setAria(e),this._trigger("select",t,{item:e}),e.index!==i&&this._trigger("change",t,{item:e}),this.close(t)},_setAria:function(e){var t=this.menuItems.eq(e.index).attr("id");this.button.attr({"aria-labelledby":t,"aria-activedescendant":t}),this.menu.attr("aria-activedescendant",t)},_setOption:function(e,t){"icons"===e&&this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(t.button),this._super(e,t),"appendTo"===e&&this.menuWrap.appendTo(this._appendTo()),"disabled"===e&&(this.menuInstance.option("disabled",t),this.button.toggleClass("ui-state-disabled",t).attr("aria-disabled",t),this.element.prop("disabled",t),t?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)),"width"===e&&this._resizeButton()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_toggleAttr:function(){this.button.toggleClass("ui-corner-top",this.isOpen).toggleClass("ui-corner-all",!this.isOpen).attr("aria-expanded",this.isOpen),this.menuWrap.toggleClass("ui-selectmenu-open",this.isOpen),this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var e=this.options.width;e||(e=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(e)},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),this.menu.width("").outerWidth()+1))},_getCreateOptions:function(){return{disabled:this.element.prop("disabled")}},_parseOptions:function(t){var i=[];t.each(function(t,s){var n=e(s),a=n.parent("optgroup");i.push({element:n,index:t,value:n.attr("value"),label:n.text(),optgroup:a.attr("label")||"",disabled:a.prop("disabled")||n.prop("disabled")})}),this.items=i},_destroy:function(){this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.label.attr("for",this.ids.element)}}),e.widget("ui.slider",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var t,i,s=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),a="<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",o=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),t=n.length;i>t;t++)o.push(a);this.handles=n.add(e(o.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t)})},_createRange:function(){var t=this.options,i="";t.range?(t.range===!0&&(t.values?t.values.length&&2!==t.values.length?t.values=[t.values[0],t.values[0]]:e.isArray(t.values)&&(t.values=t.values.slice(0)):t.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=e("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===t.range||"max"===t.range?" ui-slider-range-"+t.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(t){var i,s,n,a,o,r,h,l,u=this,d=this.options;return d.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:t.pageX,y:t.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var i=Math.abs(s-u.values(t));(n>i||n===i&&(t===u._lastChangedValue||u.values(t)===d.min))&&(n=i,a=e(this),o=t)}),r=this._start(t,o),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,a.addClass("ui-state-active").focus(),h=a.offset(),l=!e(t.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:t.pageX-h.left-a.width()/2,top:t.pageY-h.top-a.height()/2-(parseInt(a.css("borderTopWidth"),10)||0)-(parseInt(a.css("borderBottomWidth"),10)||0)+(parseInt(a.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,o,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},i=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,i),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,i,s,n,a;return"horizontal"===this.orientation?(t=this.elementSize.width,i=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,i=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/t,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),a=this._valueMin()+s*n,this._trimAlignValue(a)},_start:function(e,t){var i={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("start",e,i)},_slide:function(e,t,i){var s,n,a;this.options.values&&this.options.values.length?(s=this.values(t?0:1),2===this.options.values.length&&this.options.range===!0&&(0===t&&i>s||1===t&&s>i)&&(i=s),i!==this.values(t)&&(n=this.values(),n[t]=i,a=this._trigger("slide",e,{handle:this.handles[t],value:i,values:n}),s=this.values(t?0:1),a!==!1&&this.values(t,i))):i!==this.value()&&(a=this._trigger("slide",e,{handle:this.handles[t],value:i}),a!==!1&&this.value(i))},_stop:function(e,t){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("stop",e,i)},_change:function(e,t){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._lastChangedValue=t,this._trigger("change",e,i)}},value:function(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0),void 0):this._value()},values:function(t,i){var s,n,a;if(arguments.length>1)return this.options.values[t]=this._trimAlignValue(i),this._refreshValue(),this._change(null,t),void 0;if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();for(s=this.options.values,n=arguments[0],a=0;s.length>a;a+=1)s[a]=this._trimAlignValue(n[a]),this._change(null,a);this._refreshValue()},_setOption:function(t,i){var s,n=0;switch("range"===t&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),e.isArray(this.options.values)&&(n=this.options.values.length),"disabled"===t&&this.element.toggleClass("ui-state-disabled",!!i),this._super(t,i),t){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue(),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;n>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e)},_values:function(e){var t,i,s;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(e){if(this._valueMin()>=e)return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,i=(e-this._valueMin())%t,s=e-i;return 2*Math.abs(i)>=t&&(s+=i>0?t:-t),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var e=(this.options.max-this._valueMin())%this.options.step;this.max=this.options.max-e},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshValue:function(){var t,i,s,n,a,o=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",e(this).stop(1,1)[l?"animate":"css"](u,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-t+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-t+"%"},{queue:!1,duration:r.animate}))),t=i}):(s=this.value(),n=this._valueMin(),a=this._valueMax(),i=a!==n?100*((s-n)/(a-n)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,r.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===o&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===o&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(t){var i,s,n,a,o=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(t.preventDefault(),!this._keySliding&&(this._keySliding=!0,e(t.target).addClass("ui-state-active"),i=this._start(t,o),i===!1))return}switch(a=this.options.step,s=n=this.options.values&&this.options.values.length?this.values(o):this.value(),t.keyCode){case e.ui.keyCode.HOME:n=this._valueMin();break;case e.ui.keyCode.END:n=this._valueMax();break;case e.ui.keyCode.PAGE_UP:n=this._trimAlignValue(s+(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(s-(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(s===this._valueMax())return;n=this._trimAlignValue(s+a);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(s===this._valueMin())return;n=this._trimAlignValue(s-a)}this._slide(t,o,n)},keyup:function(t){var i=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,i),this._change(t,i),e(t.target).removeClass("ui-state-active"))}}}),e.widget("ui.sortable",e.ui.mouse,{version:"1.11.2",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(e,t,i){return e>=t&&t+i>e},_isFloating:function(e){return/left|right/.test(e.css("float"))||/inline|table-cell/.test(e.css("display"))},_create:function(){var e=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===e.axis||this._isFloating(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(e,t){this._super(e,t),"handle"===e&&this._setHandleClassName()},_setHandleClassName:function(){this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"),e.each(this.items,function(){(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item).addClass("ui-sortable-handle")})},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(t,i){var s=null,n=!1,a=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(t),e(t.target).parents().each(function(){return e.data(this,a.widgetName+"-item")===a?(s=e(this),!1):void 0}),e.data(t.target,a.widgetName+"-item")===a&&(s=e(t.target)),s?!this.options.handle||i||(e(this.options.handle,s).find("*").addBack().each(function(){this===t.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(t,i,s){var n,a,o=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),o.containment&&this._setContainment(),o.cursor&&"auto"!==o.cursor&&(a=this.document.find("body"),this.storedCursor=a.css("cursor"),a.css("cursor",o.cursor),this.storedStylesheet=e("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(a)),o.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",o.opacity)),o.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",o.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",t,this._uiHash(this));
return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var i,s,n,a,o=this.options,r=!1;for(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<o.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+o.scrollSpeed:t.pageY-this.overflowOffset.top<o.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-o.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<o.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+o.scrollSpeed:t.pageX-this.overflowOffset.left<o.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-o.scrollSpeed)):(t.pageY-e(document).scrollTop()<o.scrollSensitivity?r=e(document).scrollTop(e(document).scrollTop()-o.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<o.scrollSensitivity&&(r=e(document).scrollTop(e(document).scrollTop()+o.scrollSpeed)),t.pageX-e(document).scrollLeft()<o.scrollSensitivity?r=e(document).scrollLeft(e(document).scrollLeft()-o.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<o.scrollSensitivity&&(r=e(document).scrollLeft(e(document).scrollLeft()+o.scrollSpeed))),r!==!1&&e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],a=this._intersectsWithPointer(s),a&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===a?"next":"prev"]()[0]!==n&&!e.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!e.contains(this.element[0],n):!0)){if(this.direction=1===a?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,i){if(t){if(e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t),this.options.revert){var s=this,n=this.placeholder.offset(),a=this.options.axis,o={};a&&"x"!==a||(o.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),a&&"y"!==a||(o.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,e(this.helper).animate(o,parseInt(this.options.revert,10)||500,function(){s._clear(t)})}else this._clear(t,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},e(i).each(function(){var i=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);i&&s.push((t.key||i[1]+"[]")+"="+(t.key&&t.expression?i[1]:i[2]))}),!s.length&&t.key&&s.push(t.key+"="),s.join("&")},toArray:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},i.each(function(){s.push(e(t.item||this).attr(t.attribute||"id")||"")}),s},_intersectsWith:function(e){var t=this.positionAbs.left,i=t+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,a=e.left,o=a+e.width,r=e.top,h=r+e.height,l=this.offset.click.top,u=this.offset.click.left,d="x"===this.options.axis||s+l>r&&h>s+l,c="y"===this.options.axis||t+u>a&&o>t+u,p=d&&c;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?p:t+this.helperProportions.width/2>a&&o>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&h>n-this.helperProportions.height/2},_intersectsWithPointer:function(e){var t="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top,e.height),i="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left,e.width),s=t&&i,n=this._getDragVerticalDirection(),a=this._getDragHorizontalDirection();return s?this.floating?a&&"right"===a||"down"===n?2:1:n&&("down"===n?2:1):!1},_intersectsWithSides:function(e){var t=this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+e.height/2,e.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+e.width/2,e.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&t||"up"===s&&!t)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return 0!==e&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return 0!==e&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor===String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){function i(){r.push(this)}var s,n,a,o,r=[],h=[],l=this._connectWith();if(l&&t)for(s=l.length-1;s>=0;s--)for(a=e(l[s]),n=a.length-1;n>=0;n--)o=e.data(a[n],this.widgetFullName),o&&o!==this&&!o.options.disabled&&h.push([e.isFunction(o.options.items)?o.options.items.call(o.element):e(o.options.items,o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),o]);for(h.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=h.length-1;s>=0;s--)h[s][0].each(i);return e(r)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var i=0;t.length>i;i++)if(t[i]===e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var i,s,n,a,o,r,h,l,u=this.items,d=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],c=this._connectWith();if(c&&this.ready)for(i=c.length-1;i>=0;i--)for(n=e(c[i]),s=n.length-1;s>=0;s--)a=e.data(n[s],this.widgetFullName),a&&a!==this&&!a.options.disabled&&(d.push([e.isFunction(a.options.items)?a.options.items.call(a.element[0],t,{item:this.currentItem}):e(a.options.items,a.element),a]),this.containers.push(a));for(i=d.length-1;i>=0;i--)for(o=d[i][1],r=d[i][0],s=0,l=r.length;l>s;s++)h=e(r[s]),h.data(this.widgetName+"-item",o),u.push({item:h,instance:o,width:0,height:0,left:0,top:0})},refreshPositions:function(t){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,a;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?e(this.options.toleranceElement,s.item):s.item,t||(s.width=n.outerWidth(),s.height=n.outerHeight()),a=n.offset(),s.left=a.left,s.top=a.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)a=this.containers[i].element.offset(),this.containers[i].containerCache.left=a.left,this.containers[i].containerCache.top=a.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(t){t=t||this;var i,s=t.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=t.currentItem[0].nodeName.toLowerCase(),n=e("<"+s+">",t.document[0]).addClass(i||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===s?t.currentItem.children().each(function(){e("<td>&#160;</td>",t.document[0]).attr("colspan",e(this).attr("colspan")||1).appendTo(n)}):"img"===s&&n.attr("src",t.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(e,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}),t.placeholder=e(s.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),s.placeholder.update(t,t.placeholder)},_contactContainers:function(t){var i,s,n,a,o,r,h,l,u,d,c=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!e.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(c&&e.contains(this.containers[i].element[0],c.element[0]))continue;c=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",t,this._uiHash(this)),this.containers[i].containerCache.over=0);if(c)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(n=1e4,a=null,u=c.floating||this._isFloating(this.currentItem),o=u?"left":"top",r=u?"width":"height",d=u?"clientX":"clientY",s=this.items.length-1;s>=0;s--)e.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(h=this.items[s].item.offset()[o],l=!1,t[d]-h>this.items[s][r]/2&&(l=!0),n>Math.abs(t[d]-h)&&(n=Math.abs(t[d]-h),a=this.items[s],this.direction=l?"up":"down"));if(!a&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash()),this.currentContainer.containerCache.over=1),void 0;a?this._rearrange(t,a,null,!0):this._rearrange(t,null,this.containers[p].element,!0),this._trigger("change",t,this._uiHash()),this.containers[p]._trigger("change",t,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||e("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,e("document"===n.containment?document:window).width()-this.helperProportions.width-this.margins.left,(e("document"===n.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(t=e(n.containment)[0],i=e(n.containment).offset(),s="hidden"!==e(t).css("overflow"),this.containment=[i.left+(parseInt(e(t).css("borderLeftWidth"),10)||0)+(parseInt(e(t).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(e(t).css("borderTopWidth"),10)||0)+(parseInt(e(t).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(e(t).css("borderLeftWidth"),10)||0)-(parseInt(e(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(e(t).css("borderTopWidth"),10)||0)-(parseInt(e(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"===t?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s}},_generatePosition:function(t){var i,s,n=this.options,a=t.pageX,o=t.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(a=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(a=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1],o=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((a-this.originalPageX)/n.grid[0])*n.grid[0],a=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:a-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_rearrange:function(e,t,i,s){i?i[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(e,t){function i(e,t,i){return function(s){i._trigger(e,s,t._uiHash(t))}}this.reverting=!1;var s,n=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!t&&n.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||t||n.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(t||(n.push(function(e){this._trigger("remove",e,this._uiHash())}),n.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),n.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)t||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,t||this._trigger("beforeStop",e,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!t){for(s=0;n.length>s;s++)n[s].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var i=t||this;return{helper:i.helper,placeholder:i.placeholder||e([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:t?t.element:null}}}),e.widget("ui.spinner",{version:"1.11.2",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var t={},i=this.element;return e.each(["min","max","step"],function(e,s){var n=i.attr(s);void 0!==n&&n.length&&(t[s]=n)}),t},_events:{keydown:function(e){this._start(e)&&this._keydown(e)&&e.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",e),void 0)},mousewheel:function(e,t){if(t){if(!this.spinning&&!this._start(e))return!1;this._spin((t>0?1:-1)*this.options.step,e),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(e)},100),e.preventDefault()}},"mousedown .ui-spinner-button":function(t){function i(){var e=this.element[0]===this.document[0].activeElement;e||(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s}))}var s;s=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),t.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(t)!==!1&&this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){return e(t.currentTarget).hasClass("ui-state-active")?this._start(t)===!1?!1:(this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t),void 0):void 0},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var e=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=e.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(.5*e.height())&&e.height()>0&&e.height(e.height()),this.options.disabled&&this.disable()},_keydown:function(t){var i=this.options,s=e.ui.keyCode;switch(t.keyCode){case s.UP:return this._repeat(null,1,t),!0;case s.DOWN:return this._repeat(null,-1,t),!0;case s.PAGE_UP:return this._repeat(null,i.page,t),!0;case s.PAGE_DOWN:return this._repeat(null,-i.page,t),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span>"+"</a>"+"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>"+"<span class='ui-icon "+this.options.icons.down+"'>&#9660;</span>"+"</a>"},_start:function(e){return this.spinning||this._trigger("start",e)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(e,t,i){e=e||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,t,i)},e),this._spin(t*this.options.step,i)},_spin:function(e,t){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+e*this._increment(this.counter)),this.spinning&&this._trigger("spin",t,{value:i})===!1||(this._value(i),this.counter++)},_increment:function(t){var i=this.options.incremental;return i?e.isFunction(i)?i(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=""+e,i=t.indexOf(".");return-1===i?0:t.length-i-1},_adjustValue:function(e){var t,i,s=this.options;return t=null!==s.min?s.min:0,i=e-t,i=Math.round(i/s.step)*s.step,e=t+i,e=parseFloat(e.toFixed(this._precision())),null!==s.max&&e>s.max?s.max:null!==s.min&&s.min>e?s.min:e},_stop:function(e){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",e))},_setOption:function(e,t){if("culture"===e||"numberFormat"===e){var i=this._parse(this.element.val());return this.options[e]=t,this.element.val(this._format(i)),void 0}("max"===e||"min"===e||"step"===e)&&"string"==typeof t&&(t=this._parse(t)),"icons"===e&&(this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up),this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down)),this._super(e,t),"disabled"===e&&(this.widget().toggleClass("ui-state-disabled",!!t),this.element.prop("disabled",!!t),this.buttons.button(t?"disable":"enable"))},_setOptions:h(function(e){this._super(e)}),_parse:function(e){return"string"==typeof e&&""!==e&&(e=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(e,10,this.options.culture):+e),""===e||isNaN(e)?null:e},_format:function(e){return""===e?"":window.Globalize&&this.options.numberFormat?Globalize.format(e,this.options.numberFormat,this.options.culture):e},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},isValid:function(){var e=this.value();return null===e?!1:e===this._adjustValue(e)},_value:function(e,t){var i;""!==e&&(i=this._parse(e),null!==i&&(t||(i=this._adjustValue(i)),e=this._format(i))),this.element.val(e),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:h(function(e){this._stepUp(e)}),_stepUp:function(e){this._start()&&(this._spin((e||1)*this.options.step),this._stop())},stepDown:h(function(e){this._stepDown(e)}),_stepDown:function(e){this._start()&&(this._spin((e||1)*-this.options.step),this._stop())},pageUp:h(function(e){this._stepUp((e||1)*this.options.page)}),pageDown:h(function(e){this._stepDown((e||1)*this.options.page)}),value:function(e){return arguments.length?(h(this._value).call(this,e),void 0):this._parse(this.element.val())},widget:function(){return this.uiSpinner}}),e.widget("ui.tabs",{version:"1.11.2",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var e=/#.*$/;return function(t){var i,s;t=t.cloneNode(!1),i=t.href.replace(e,""),s=location.href.replace(e,"");try{i=decodeURIComponent(i)}catch(n){}try{s=decodeURIComponent(s)}catch(n){}return t.hash.length>1&&i===s}}(),_create:function(){var t=this,i=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",i.collapsible),this._processTabs(),i.active=this._initialActive(),e.isArray(i.disabled)&&(i.disabled=e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"),function(e){return t.tabs.index(e)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):e(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var t=this.options.active,i=this.options.collapsible,s=location.hash.substring(1);return null===t&&(s&&this.tabs.each(function(i,n){return e(n).attr("aria-controls")===s?(t=i,!1):void 0}),null===t&&(t=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===t||-1===t)&&(t=this.tabs.length?0:!1)),t!==!1&&(t=this.tabs.index(this.tabs.eq(t)),-1===t&&(t=i?!1:0)),!i&&t===!1&&this.anchors.length&&(t=0),t},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):e()}},_tabKeydown:function(t){var i=e(this.document[0].activeElement).closest("li"),s=this.tabs.index(i),n=!0;if(!this._handlePageNav(t)){switch(t.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:s++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:n=!1,s--;break;case e.ui.keyCode.END:s=this.anchors.length-1;break;case e.ui.keyCode.HOME:s=0;break;case e.ui.keyCode.SPACE:return t.preventDefault(),clearTimeout(this.activating),this._activate(s),void 0;case e.ui.keyCode.ENTER:return t.preventDefault(),clearTimeout(this.activating),this._activate(s===this.options.active?!1:s),void 0;default:return}t.preventDefault(),clearTimeout(this.activating),s=this._focusNextTab(s,n),t.ctrlKey||(i.attr("aria-selected","false"),this.tabs.eq(s).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",s)},this.delay))}},_panelKeydown:function(t){this._handlePageNav(t)||t.ctrlKey&&t.keyCode===e.ui.keyCode.UP&&(t.preventDefault(),this.active.focus())},_handlePageNav:function(t){return t.altKey&&t.keyCode===e.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):t.altKey&&t.keyCode===e.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(t,i){function s(){return t>n&&(t=0),0>t&&(t=n),t}for(var n=this.tabs.length-1;-1!==e.inArray(s(),this.options.disabled);)t=i?t+1:t-1;return t},_focusNextTab:function(e,t){return e=this._findNextTab(e,t),this.tabs.eq(e).focus(),e},_setOption:function(e,t){return"active"===e?(this._activate(t),void 0):"disabled"===e?(this._setupDisabled(t),void 0):(this._super(e,t),"collapsible"===e&&(this.element.toggleClass("ui-tabs-collapsible",t),t||this.options.active!==!1||this._activate(0)),"event"===e&&this._setupEvents(t),"heightStyle"===e&&this._setupHeightStyle(t),void 0)},_sanitizeSelector:function(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,i=this.tablist.children(":has(a[href])");t.disabled=e.map(i.filter(".ui-state-disabled"),function(e){return i.index(e)}),this._processTabs(),t.active!==!1&&this.anchors.length?this.active.length&&!e.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=e()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active):(t.active=!1,this.active=e()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var t=this,i=this.tabs,s=this.anchors,n=this.panels;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist").delegate("> li","mousedown"+this.eventNamespace,function(t){e(this).is(".ui-state-disabled")&&t.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){e(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return e("a",this)[0]
}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=e(),this.anchors.each(function(i,s){var n,a,o,r=e(s).uniqueId().attr("id"),h=e(s).closest("li"),l=h.attr("aria-controls");t._isLocal(s)?(n=s.hash,o=n.substring(1),a=t.element.find(t._sanitizeSelector(n))):(o=h.attr("aria-controls")||e({}).uniqueId()[0].id,n="#"+o,a=t.element.find(n),a.length||(a=t._createPanel(o),a.insertAfter(t.panels[i-1]||t.tablist)),a.attr("aria-live","polite")),a.length&&(t.panels=t.panels.add(a)),l&&h.data("ui-tabs-aria-controls",l),h.attr({"aria-controls":o,"aria-labelledby":r}),a.attr("aria-labelledby",r)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel"),i&&(this._off(i.not(this.tabs)),this._off(s.not(this.anchors)),this._off(n.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol,ul").eq(0)},_createPanel:function(t){return e("<div>").attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(t){e.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1);for(var i,s=0;i=this.tabs[s];s++)t===!0||-1!==e.inArray(s,t)?e(i).addClass("ui-state-disabled").attr("aria-disabled","true"):e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=t},_setupEvents:function(t){var i={};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(e){e.preventDefault()}}),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var i,s=this.element.parent();"fill"===t?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var t=e(this),s=t.css("position");"absolute"!==s&&"fixed"!==s&&(i-=t.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=e(this).outerHeight(!0)}),this.panels.each(function(){e(this).height(Math.max(0,i-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===t&&(i=0,this.panels.each(function(){i=Math.max(i,e(this).height("").height())}).height(i))},_eventHandler:function(t){var i=this.options,s=this.active,n=e(t.currentTarget),a=n.closest("li"),o=a[0]===s[0],r=o&&i.collapsible,h=r?e():this._getPanelForTab(a),l=s.length?this._getPanelForTab(s):e(),u={oldTab:s,oldPanel:l,newTab:r?e():a,newPanel:h};t.preventDefault(),a.hasClass("ui-state-disabled")||a.hasClass("ui-tabs-loading")||this.running||o&&!i.collapsible||this._trigger("beforeActivate",t,u)===!1||(i.active=r?!1:this.tabs.index(a),this.active=o?e():a,this.xhr&&this.xhr.abort(),l.length||h.length||e.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(a),t),this._toggle(t,u))},_toggle:function(t,i){function s(){a.running=!1,a._trigger("activate",t,i)}function n(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),o.length&&a.options.show?a._show(o,a.options.show,s):(o.show(),s())}var a=this,o=i.newPanel,r=i.oldPanel;this.running=!0,r.length&&this.options.hide?this._hide(r,this.options.hide,function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),n()}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),r.hide(),n()),r.attr("aria-hidden","true"),i.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),o.length&&r.length?i.oldTab.attr("tabIndex",-1):o.length&&this.tabs.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),o.attr("aria-hidden","false"),i.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(t){var i,s=this._findActive(t);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return t===!1?e():this.tabs.eq(t)},_getIndex:function(e){return"string"==typeof e&&(e=this.anchors.index(this.anchors.filter("[href$='"+e+"']"))),e},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tablist.unbind(this.eventNamespace),this.tabs.add(this.panels).each(function(){e.data(this,"ui-tabs-destroy")?e(this).remove():e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var t=e(this),i=t.data("ui-tabs-aria-controls");i?t.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):t.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(t){var i=this.options.disabled;i!==!1&&(void 0===t?i=!1:(t=this._getIndex(t),i=e.isArray(i)?e.map(i,function(e){return e!==t?e:null}):e.map(this.tabs,function(e,i){return i!==t?i:null})),this._setupDisabled(i))},disable:function(t){var i=this.options.disabled;if(i!==!0){if(void 0===t)i=!0;else{if(t=this._getIndex(t),-1!==e.inArray(t,i))return;i=e.isArray(i)?e.merge([t],i).sort():[t]}this._setupDisabled(i)}},load:function(t,i){t=this._getIndex(t);var s=this,n=this.tabs.eq(t),a=n.find(".ui-tabs-anchor"),o=this._getPanelForTab(n),r={tab:n,panel:o};this._isLocal(a[0])||(this.xhr=e.ajax(this._ajaxSettings(a,i,r)),this.xhr&&"canceled"!==this.xhr.statusText&&(n.addClass("ui-tabs-loading"),o.attr("aria-busy","true"),this.xhr.success(function(e){setTimeout(function(){o.html(e),s._trigger("load",i,r)},1)}).complete(function(e,t){setTimeout(function(){"abort"===t&&s.panels.stop(!1,!0),n.removeClass("ui-tabs-loading"),o.removeAttr("aria-busy"),e===s.xhr&&delete s.xhr},1)})))},_ajaxSettings:function(t,i,s){var n=this;return{url:t.attr("href"),beforeSend:function(t,a){return n._trigger("beforeLoad",i,e.extend({jqXHR:t,ajaxSettings:a},s))}}},_getPanelForTab:function(t){var i=e(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}}),e.widget("ui.tooltip",{version:"1.11.2",options:{content:function(){var t=e(this).attr("title")||"";return e("<a>").text(t).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_addDescribedBy:function(t,i){var s=(t.attr("aria-describedby")||"").split(/\s+/);s.push(i),t.data("ui-tooltip-id",i).attr("aria-describedby",e.trim(s.join(" ")))},_removeDescribedBy:function(t){var i=t.data("ui-tooltip-id"),s=(t.attr("aria-describedby")||"").split(/\s+/),n=e.inArray(i,s);-1!==n&&s.splice(n,1),t.removeData("ui-tooltip-id"),s=e.trim(s.join(" ")),s?t.attr("aria-describedby",s):t.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable(),this.liveRegion=e("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)},_setOption:function(t,i){var s=this;return"disabled"===t?(this[i?"_disable":"_enable"](),this.options[t]=i,void 0):(this._super(t,i),"content"===t&&e.each(this.tooltips,function(e,t){s._updateContent(t.element)}),void 0)},_disable:function(){var t=this;e.each(this.tooltips,function(i,s){var n=e.Event("blur");n.target=n.currentTarget=s.element[0],t.close(n,!0)}),this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.is("[title]")&&t.data("ui-tooltip-title",t.attr("title")).removeAttr("title")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var t=e(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))})},open:function(t){var i=this,s=e(t?t.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),t&&"mouseover"===t.type&&s.parents().each(function(){var t,s=e(this);s.data("ui-tooltip-open")&&(t=e.Event("blur"),t.target=t.currentTarget=this,i.close(t,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._updateContent(s,t))},_updateContent:function(e,t){var i,s=this.options.content,n=this,a=t?t.type:null;return"string"==typeof s?this._open(t,e,s):(i=s.call(e[0],function(i){e.data("ui-tooltip-open")&&n._delay(function(){t&&(t.type=a),this._open(t,e,i)})}),i&&this._open(t,e,i),void 0)},_open:function(t,i,s){function n(e){u.of=e,o.is(":hidden")||o.position(u)}var a,o,r,h,l,u=e.extend({},this.options.position);if(s){if(a=this._find(i))return a.tooltip.find(".ui-tooltip-content").html(s),void 0;i.is("[title]")&&(t&&"mouseover"===t.type?i.attr("title",""):i.removeAttr("title")),a=this._tooltip(i),o=a.tooltip,this._addDescribedBy(i,o.attr("id")),o.find(".ui-tooltip-content").html(s),this.liveRegion.children().hide(),s.clone?(l=s.clone(),l.removeAttr("id").find("[id]").removeAttr("id")):l=s,e("<div>").html(l).appendTo(this.liveRegion),this.options.track&&t&&/^mouse/.test(t.type)?(this._on(this.document,{mousemove:n}),n(t)):o.position(e.extend({of:i},this.options.position)),o.hide(),this._show(o,this.options.show),this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){o.is(":visible")&&(n(u.of),clearInterval(h))},e.fx.interval)),this._trigger("open",t,{tooltip:o}),r={keyup:function(t){if(t.keyCode===e.ui.keyCode.ESCAPE){var s=e.Event(t);s.currentTarget=i[0],this.close(s,!0)}}},i[0]!==this.element[0]&&(r.remove=function(){this._removeTooltip(o)}),t&&"mouseover"!==t.type||(r.mouseleave="close"),t&&"focusin"!==t.type||(r.focusout="close"),this._on(!0,i,r)}},close:function(t){var i,s=this,n=e(t?t.currentTarget:this.element),a=this._find(n);a&&(i=a.tooltip,a.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&!n.attr("title")&&n.attr("title",n.data("ui-tooltip-title")),this._removeDescribedBy(n),a.hiding=!0,i.stop(!0),this._hide(i,this.options.hide,function(){s._removeTooltip(e(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),t&&"mouseleave"===t.type&&e.each(this.parents,function(t,i){e(i.element).attr("title",i.title),delete s.parents[t]}),a.closing=!0,this._trigger("close",t,{tooltip:i}),a.hiding||(a.closing=!1)))},_tooltip:function(t){var i=e("<div>").attr("role","tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||"")),s=i.uniqueId().attr("id");return e("<div>").addClass("ui-tooltip-content").appendTo(i),i.appendTo(this.document[0].body),this.tooltips[s]={element:t,tooltip:i}},_find:function(e){var t=e.data("ui-tooltip-id");return t?this.tooltips[t]:null},_removeTooltip:function(e){e.remove(),delete this.tooltips[e.attr("id")]},_destroy:function(){var t=this;e.each(this.tooltips,function(i,s){var n=e.Event("blur"),a=s.element;n.target=n.currentTarget=a[0],t.close(n,!0),e("#"+i).remove(),a.data("ui-tooltip-title")&&(a.attr("title")||a.attr("title",a.data("ui-tooltip-title")),a.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}})});
/**
* vkBeautify - javascript plugin to pretty-print or minify text in XML, JSON, CSS and SQL formats.
*
* Version - 0.99.00.beta
* Copyright (c) 2012 Vadim Kiryukhin
* vkiryukhin @ gmail.com
* http://www.eslinstructor.net/vkbeautify/
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*   Pretty print
*
*        vkbeautify.xml(text [,indent_pattern]);
*        vkbeautify.json(text [,indent_pattern]);
*        vkbeautify.css(text [,indent_pattern]);
*        vkbeautify.sql(text [,indent_pattern]);
*
*        @text - String; text to beatufy;
*        @indent_pattern - Integer | String;
*                Integer:  number of white spaces;
*                String:   character string to visualize indentation ( can also be a set of white spaces )
*   Minify
*
*        vkbeautify.xmlmin(text [,preserve_comments]);
*        vkbeautify.jsonmin(text);
*        vkbeautify.cssmin(text [,preserve_comments]);
*        vkbeautify.sqlmin(text);
*
*        @text - String; text to minify;
*        @preserve_comments - Bool; [optional];
*                Set this flag to true to prevent removing comments from @text ( minxml and mincss functions only. )
*
*   Examples:
*        vkbeautify.xml(text); // pretty print XML
*        vkbeautify.json(text, 4 ); // pretty print JSON
*        vkbeautify.css(text, '. . . .'); // pretty print CSS
*        vkbeautify.sql(text, '----'); // pretty print SQL
*
*        vkbeautify.xmlmin(text, true);// minify XML, preserve comments
*        vkbeautify.jsonmin(text);// minify JSON
*        vkbeautify.cssmin(text);// minify CSS, remove comments ( default )
*        vkbeautify.sqlmin(text);// minify SQL
*
*/

(function() {

function createShiftArr(step) {

    var space = '    ';

    if ( isNaN(parseInt(step)) ) {  // argument is string
        space = step;
    } else { // argument is integer
        switch(step) {
            case 1: space = ' '; break;
            case 2: space = '  '; break;
            case 3: space = '   '; break;
            case 4: space = '    '; break;
            case 5: space = '     '; break;
            case 6: space = '      '; break;
            case 7: space = '       '; break;
            case 8: space = '        '; break;
            case 9: space = '         '; break;
            case 10: space = '          '; break;
            case 11: space = '           '; break;
            case 12: space = '            '; break;
        }
    }

    var shift = ['\n']; // array of shifts
    for(ix=0;ix<100;ix++){
        shift.push(shift[ix]+space);
    }
    return shift;
}

function vkbeautify(){
    this.step = '    '; // 4 spaces
    this.shift = createShiftArr(this.step);
};

vkbeautify.prototype.xml = function(text,step) {

    var ar = text.replace(/>\s{0,}</g,"><")
                 .replace(/</g,"~::~<")
                 .replace(/\s*xmlns\:/g,"~::~xmlns:")
                 .replace(/\s*xmlns\=/g,"~::~xmlns=")
                 .split('~::~'),
        len = ar.length,
        inComment = false,
        deep = 0,
        str = '',
        ix = 0,
        shift = step ? createShiftArr(step) : this.shift;

        for(ix=0;ix<len;ix++) {
            // start comment or <![CDATA[...]]> or <!DOCTYPE //
            if(ar[ix].search(/<!/) > -1) {
                str += shift[deep]+ar[ix];
                inComment = true;
                // end comment  or <![CDATA[...]]> //
                if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1 ) {
                    inComment = false;
                }
            } else
            // end comment  or <![CDATA[...]]> //
            if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) {
                str += ar[ix];
                inComment = false;
            } else
            // <elm></elm> //
            if( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
                /^<[\w:\-\.\,]+/.exec(ar[ix-1]) == /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/','')) {
                str += ar[ix];
                if(!inComment) deep--;
            } else
             // <elm> //
            if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1 ) {
                str = !inComment ? str += shift[deep++]+ar[ix] : str += ar[ix];
            } else
             // <elm>...</elm> //
            if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
                str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
            } else
            // </elm> //
            if(ar[ix].search(/<\//) > -1) {
                str = !inComment ? str += shift[--deep]+ar[ix] : str += ar[ix];
            } else
            // <elm/> //
            if(ar[ix].search(/\/>/) > -1 ) {
                str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
            } else
            // <? xml ... ?> //
            if(ar[ix].search(/<\?/) > -1) {
                str += shift[deep]+ar[ix];
            } else
            // xmlns //
            if( ar[ix].search(/xmlns\:/) > -1  || ar[ix].search(/xmlns\=/) > -1) {
                str += shift[deep]+ar[ix];
            }

            else {
                str += ar[ix];
            }
        }

    return  (str[0] == '\n') ? str.slice(1) : str;
}

vkbeautify.prototype.json = function(text,step) {

    var step = step ? step : this.step;

    if (typeof JSON === 'undefined' ) return text;

    if ( typeof text === "string" ) return JSON.stringify(JSON.parse(text), null, step);
    if ( typeof text === "object" ) return JSON.stringify(text, null, step);

    return text; // text is not string nor object
}

vkbeautify.prototype.css = function(text, step) {

    var ar = text.replace(/\s{1,}/g,' ')
                .replace(/\{/g,"{~::~")
                .replace(/\}/g,"~::~}~::~")
                .replace(/\;/g,";~::~")
                .replace(/\/\*/g,"~::~/*")
                .replace(/\*\//g,"*/~::~")
                .replace(/~::~\s{0,}~::~/g,"~::~")
                .split('~::~'),
        len = ar.length,
        deep = 0,
        str = '',
        ix = 0,
        shift = step ? createShiftArr(step) : this.shift;

        for(ix=0;ix<len;ix++) {

            if( /\{/.exec(ar[ix]))  {
                str += shift[deep++]+ar[ix];
            } else
            if( /\}/.exec(ar[ix]))  {
                str += shift[--deep]+ar[ix];
            } else
            if( /\*\\/.exec(ar[ix]))  {
                str += shift[deep]+ar[ix];
            }
            else {
                str += shift[deep]+ar[ix];
            }
        }
        return str.replace(/^\n{1,}/,'');
}

//----------------------------------------------------------------------------

function isSubquery(str, parenthesisLevel) {
    return  parenthesisLevel - (str.replace(/\(/g,'').length - str.replace(/\)/g,'').length )
}

function split_sql(str, tab) {

    return str.replace(/\s{1,}/g," ")

                .replace(/ AND /ig,"~::~"+tab+tab+"AND ")
                .replace(/ BETWEEN /ig,"~::~"+tab+"BETWEEN ")
                .replace(/ CASE /ig,"~::~"+tab+"CASE ")
                .replace(/ ELSE /ig,"~::~"+tab+"ELSE ")
                .replace(/ END /ig,"~::~"+tab+"END ")
                .replace(/ FROM /ig,"~::~FROM ")
                .replace(/ GROUP\s{1,}BY/ig,"~::~GROUP BY ")
                .replace(/ HAVING /ig,"~::~HAVING ")
                //.replace(/ SET /ig," SET~::~")
                .replace(/ IN /ig," IN ")

                .replace(/ JOIN /ig,"~::~JOIN ")
                .replace(/ CROSS~::~{1,}JOIN /ig,"~::~CROSS JOIN ")
                .replace(/ INNER~::~{1,}JOIN /ig,"~::~INNER JOIN ")
                .replace(/ LEFT~::~{1,}JOIN /ig,"~::~LEFT JOIN ")
                .replace(/ RIGHT~::~{1,}JOIN /ig,"~::~RIGHT JOIN ")

                .replace(/ ON /ig,"~::~"+tab+"ON ")
                .replace(/ OR /ig,"~::~"+tab+tab+"OR ")
                .replace(/ ORDER\s{1,}BY/ig,"~::~ORDER BY ")
                .replace(/ OVER /ig,"~::~"+tab+"OVER ")

                .replace(/\(\s{0,}SELECT /ig,"~::~(SELECT ")
                .replace(/\)\s{0,}SELECT /ig,")~::~SELECT ")

                .replace(/ THEN /ig," THEN~::~"+tab+"")
                .replace(/ UNION /ig,"~::~UNION~::~")
                .replace(/ USING /ig,"~::~USING ")
                .replace(/ WHEN /ig,"~::~"+tab+"WHEN ")
                .replace(/ WHERE /ig,"~::~WHERE ")
                .replace(/ WITH /ig,"~::~WITH ")

                //.replace(/\,\s{0,}\(/ig,",~::~( ")
                //.replace(/\,/ig,",~::~"+tab+tab+"")

                .replace(/ ALL /ig," ALL ")
                .replace(/ AS /ig," AS ")
                .replace(/ ASC /ig," ASC ")
                .replace(/ DESC /ig," DESC ")
                .replace(/ DISTINCT /ig," DISTINCT ")
                .replace(/ EXISTS /ig," EXISTS ")
                .replace(/ NOT /ig," NOT ")
                .replace(/ NULL /ig," NULL ")
                .replace(/ LIKE /ig," LIKE ")
                .replace(/\s{0,}SELECT /ig,"SELECT ")
                .replace(/\s{0,}UPDATE /ig,"UPDATE ")
                .replace(/ SET /ig," SET ")

                .replace(/~::~{1,}/g,"~::~")
                .split('~::~');
}

vkbeautify.prototype.sql = function(text,step) {

    var ar_by_quote = text.replace(/\s{1,}/g," ")
                            .replace(/\'/ig,"~::~\'")
                            .split('~::~'),
        len = ar_by_quote.length,
        ar = [],
        deep = 0,
        tab = this.step,//+this.step,
        inComment = true,
        inQuote = false,
        parenthesisLevel = 0,
        str = '',
        ix = 0,
        shift = step ? createShiftArr(step) : this.shift;;

        for(ix=0;ix<len;ix++) {
            if(ix%2) {
                ar = ar.concat(ar_by_quote[ix]);
            } else {
                ar = ar.concat(split_sql(ar_by_quote[ix], tab) );
            }
        }

        len = ar.length;
        for(ix=0;ix<len;ix++) {

            parenthesisLevel = isSubquery(ar[ix], parenthesisLevel);

            if( /\s{0,}\s{0,}SELECT\s{0,}/.exec(ar[ix]))  {
                ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"")
            }

            if( /\s{0,}\s{0,}SET\s{0,}/.exec(ar[ix]))  {
                ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"")
            }

            if( /\s{0,}\(\s{0,}SELECT\s{0,}/.exec(ar[ix]))  {
                deep++;
                str += shift[deep]+ar[ix];
            } else
            if( /\'/.exec(ar[ix]) )  {
                if(parenthesisLevel<1 && deep) {
                    deep--;
                }
                str += ar[ix];
            }
            else  {
                str += shift[deep]+ar[ix];
                if(parenthesisLevel<1 && deep) {
                    deep--;
                }
            }
            var junk = 0;
        }

        str = str.replace(/^\n{1,}/,'').replace(/\n{1,}/g,"\n");
        return str;
}


vkbeautify.prototype.xmlmin = function(text, preserveComments) {

    var str = preserveComments ? text
                               : text.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g,"")
                                     .replace(/[ \r\n\t]{1,}xmlns/g, ' xmlns');
    return  str.replace(/>\s{0,}</g,"><");
}

vkbeautify.prototype.jsonmin = function(text) {

    if (typeof JSON === 'undefined' ) return text;

    return JSON.stringify(JSON.parse(text), null, 0);

}

vkbeautify.prototype.cssmin = function(text, preserveComments) {

    var str = preserveComments ? text
                               : text.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g,"") ;

    return str.replace(/\s{1,}/g,' ')
              .replace(/\{\s{1,}/g,"{")
              .replace(/\}\s{1,}/g,"}")
              .replace(/\;\s{1,}/g,";")
              .replace(/\/\*\s{1,}/g,"/*")
              .replace(/\*\/\s{1,}/g,"*/");
}

vkbeautify.prototype.sqlmin = function(text) {
    return text.replace(/\s{1,}/g," ").replace(/\s{1,}\(/,"(").replace(/\s{1,}\)/,")");
}

window.vkbeautify = new vkbeautify();

})();


/*! SPWidgets v2.5.2 2016-01-25 | MIT | Copyright (c) 2016 Paul Tavares | http://purtuga.github.io/SPWidgets */
;(function() {
var src_spapi_getSiteUrl, src_sputils_cache, src_jsutils_objectExtend, src_jsutils_dataStore, src_jsutils_Compose, src_sputils_getNodesFromXml, src_models_ListModel, src_sputils_doesMsgHaveError, src_spapi_getList, src_models_ListItemModel, src_spapi_getListItems, src_models_ListColumnModel, src_spapi_getListColumns, src_spapi_getListFormCollection, src_sputils_getMsgError, src_spapi_updateListItems, src_sputils_fillTemplate, src_uiutils_makeSameHeight, src_uiutils_addHoverEffect, text_src_boardWidget_boardhtml, less_src_boardWidget_board, src_boardWidget_board, text_src_dateFieldWidget_dateFieldhtml, src_sputils_getDateString, src_sputils_parseDateString, less_src_dateFieldWidget_dateField, src_dateFieldWidget_dateField, text_src_lookupFieldWidget_lookupFieldhtml, src_sputils_getCamlLogical, src_sputils_parseLookupFieldValue, src_sputils_xmlEscape, less_src_lookupFieldWidget_lookupField, src_lookupFieldWidget_lookupField, text_src_peoplePickerWidget_peoplePickerhtml, src_spapi_searchPrincipals, src_spapi_resolvePrincipals, less_src_peoplePickerWidget_peoplePicker, src_peoplePickerWidget_peoplePicker, text_src_filterPanelWidget_filterPanelhtml, text_src_filterPanelWidget_filterPanelColumnhtml, text_src_filterPanelWidget_filterPanelChoiceFieldhtml, text_src_filterPanelWidget_filterPanelTextFieldhtml, less_src_filterPanelWidget_filterPanel, src_filterPanelWidget_filterPanel, text_src_uploadWidget_uploadhtml, src_sputils_getSPVersion, less_src_uploadWidget_upload, src_uploadWidget_upload, src_spapi_getSiteListCollection, src_spapi_getUserProfile, src_SPWidgets;
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }
}(function (jquery) {
  src_spapi_getSiteUrl = function ($) {
    /* global _spPageContextInfo, L_Menu_BaseUrl */
    /**
     * Returns the current site URL. URL will end with a forward slash (/) and
     * will always be a fully qualified url (starting with http...).
     * If this function is unable to determine the SiteUrl from data already
     * loaded, then it will call a webservice to retrieve it. That call to
     * the webservice will be syncronous.
     *
     * @function
     *
     * @param {String} [pageUrl=document.location.href]
     *
     * @return {String}
     *
     * @throws Unable to determine site url
     *
     */
    var getSiteUrl = function () {
      // Cache of site urls
      var siteUrl = {};
      /**
       * Takes a relative URL (ex. /you/page.aspx) and returns the full
       * url starting wtih http...
       */
      function getFullUrl(pageAddress) {
        // if URL does not end with "/" then insert it
        if (pageAddress && pageAddress.charAt(pageAddress.length - 1) !== '/') {
          pageAddress += '/';
        }
        if (pageAddress.indexOf('http') > -1) {
          return pageAddress;
        }
        pageAddress = document.location.protocol + '//' + document.location.hostname + (Number(document.location.port) !== 80 && Number(document.location.port) > 0 ? ':' + document.location.port : '') + pageAddress;
        return pageAddress;
      }
      // return caller function
      return function (pageUrl) {
        var page = '', isThisPage = false, errorMessage = 'getSiteUrl(): Unable to determine site url from ' + pageUrl;
        if (!pageUrl) {
          pageUrl = document.location.href;
          isThisPage = true;
        }
        page = pageUrl;
        // Get only the pure url up to the page... no URL params or hash.
        if (pageUrl.indexOf('?') > -1) {
          page = pageUrl.substr(0, pageUrl.indexOf('?'));
        } else if (pageUrl.indexOf('#') > -1) {
          page = pageUrl.substr(0, pageUrl.indexOf('#'));
        }
        if (!page) {
          throw new Error(errorMessage);
        }
        // If the URL site is already known, return it.
        if (siteUrl[page]) {
          return siteUrl[page];
        }
        // If it is the current page, then try to determine the siteUrl
        // based on variables set by SharePoint
        if (isThisPage) {
          // DO we have _spPageContextInfo to work with? Then use
          // the webServerRelativeUrl param of it.
          if (typeof _spPageContextInfo !== 'undefined' && _spPageContextInfo.webServerRelativeUrl) {
            siteUrl[page] = _spPageContextInfo.webServerRelativeUrl;
          }
          //do we have a _spPageContextInfo?
          // Do we have L_Menu_BaseUrl defined?
          if (!siteUrl[page] && typeof L_Menu_BaseUrl !== 'undefined' && L_Menu_BaseUrl) {
            siteUrl[page] = L_Menu_BaseUrl;
          }
          // ensure we get a full url starting with http
          if (siteUrl[page]) {
            siteUrl[page] = getFullUrl(siteUrl[page]);
            return siteUrl[page];
          }
        }
        //end: if(): is current page
        // If we still don't have a current site for this page, then
        // Lets call the web serivce
        if (!siteUrl[page]) {
          $.ajax({
            type: 'POST',
            cache: false,
            async: false,
            url: document.location.protocol + '//' + document.location.host + '/_vti_bin/Webs.asmx',
            data: '<soap:Envelope xmlns:xsi=\'http://www.w3.org/2001/XMLSchema-instance\' xmlns:xsd=\'http://www.w3.org/2001/XMLSchema\' xmlns:soap=\'http://schemas.xmlsoap.org/soap/envelope/\'><soap:Body><WebUrlFromPageUrl xmlns=\'http://schemas.microsoft.com/sharepoint/soap/\' >' + '<pageUrl>' + page + '</pageUrl></WebUrlFromPageUrl></soap:Body></soap:Envelope>',
            contentType: 'text/xml; charset=utf-8',
            dataType: 'xml',
            success: function (xDoc) {
              siteUrl[page] = $(xDoc).find('WebUrlFromPageUrlResult').text() || '';
            }  //end: success
          });
        }
        //end: if()
        if (!siteUrl[page]) {
          delete siteUrl[page];
          throw new Error(errorMessage);
        }
        siteUrl[page] = getFullUrl(siteUrl[page]);
        return siteUrl[page] || '';
      };  //end: return: function
    }();
    // end: getSiteUrl()
    return getSiteUrl;
  }(jquery);
  src_sputils_cache = function () {
    /**
     * Simple caching function.
     * @function
     *
     * @param {Sting} key
     * @param {Object} value
     *
     * @return {undefined}
     *
     * Methods:
     *
     *  cache("myKey") // getter. Same as cache.get()
     *  cache("myKey", "value") // Setter. Same as cache.set();
     *  cache.clear(key)
     *  cache.clearAll()
     *  cache.get(key),
     *  cache.set(key, value),
     *  cache.isCached(key)
     *
     * Dependencies:
     *
     *  none
     *
     */
    var cache = function () {
      var cacheData = {}, fnCaller = function cache(key, value) {
          if (!key) {
            return;
          }
          // Getter
          if (typeof value === 'undefined') {
            return fnCaller.get(key);
          }
          // Setter
          return fnCaller.set(key, value);
        };
      /**
       * Clear specific key from cache.
       * @function cache.clear
       * @param {Object} key
       */
      fnCaller.clear = function (key) {
        delete cacheData[key];
      };
      /**
       * Clears all cached data
       * @fucntion cache.clearAll
       */
      fnCaller.clearAll = function () {
        cacheData = {};
      };
      /**
       * Gets a cached piece of data
       * @function cache.get
       * @param {Object} key
       */
      fnCaller.get = function (key) {
        return cacheData[key];
      };
      /**
       * Caches a piece of data.
       * @function cache.set
       * @param {Object} key
       * @param {Object} value
       */
      fnCaller.set = function (key, value) {
        cacheData[key] = value;
        return value;
      };
      /**
       * Returns a boolean indicating if the give key has cached data.
       * @function cache.isCached
       * @param {Object} key
       * @return {Boolean}
       */
      fnCaller.isCached = function (key) {
        if (cacheData.hasOwnProperty(key)) {
          return true;
        }
        return false;
      };
      return fnCaller;
    }();
    //end: cache method.
    return cache;
  }();
  src_jsutils_objectExtend = function () {
    /**
     * Extends an object with the properties of another.
     *
     * @name objectExtend
     *
     * @param {Object} mergeIntoObj
     * @param {...Object} copyObj1
     *
     * @return {Object}
     */
    var objectExtend = function (mergeIntoObj) {
      var response = mergeIntoObj || {}, copyObjs = Array.prototype.slice.call(arguments, 1), total = copyObjs.length, i, key;
      for (i = 0; i < total; i++) {
        if (!copyObjs[i]) {
          continue;
        }
        for (key in copyObjs[i]) {
          if (copyObjs[i].hasOwnProperty(key)) {
            response[key] = copyObjs[i][key];
          }
        }
      }
      return response;
    };
    return objectExtend;
  }();
  src_jsutils_dataStore = function () {
    // POLYFILL FOR WEAKMAP
    //  [pt] changed how "delete" is defined so that it can work in IE8
    /* jshint ignore:start */
    /**
     * @license
     * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */
    if (typeof WeakMap === 'undefined') {
      (function () {
        var defineProperty = Object.defineProperty;
        var counter = Date.now() % 1000000000;
        var WeakMap = function () {
          this.name = '__st' + (Math.random() * 1000000000 >>> 0) + (counter++ + '__');
        };
        WeakMap.prototype = {
          set: function (key, value) {
            var entry = key[this.name];
            if (entry && entry[0] === key)
              entry[1] = value;
            else
              defineProperty(key, this.name, {
                value: [
                  key,
                  value
                ],
                writable: true
              });
            return this;
          },
          get: function (key) {
            var entry;
            return (entry = key[this.name]) && entry[0] === key ? entry[1] : undefined;
          },
          // [pt] Quotes around the delete property needed for IE8
          'delete': function (key) {
            var entry = key[this.name];
            if (!entry || entry[0] !== key)
              return false;
            entry[0] = entry[1] = undefined;
            return true;
          },
          has: function (key) {
            var entry = key[this.name];
            if (!entry)
              return false;
            return entry[0] === key;
          }
        };
        window.WeakMap = WeakMap;
      }());
    }
    /* jshint ignore:end */
    /**
     * Returns an object that contains an initialized WeakMap (`stash` property)
     * where data can be stored.
     *
     * @namespace dataStore
     *
     */
    var dataStore = /** @lends dataStore */
    {
      /**
       * Stash data here.
       * @type WeakMap
       */
      stash: new WeakMap(),
      /**
       * Create a private data store and return it.
       * @return {WeakMap}
       */
      create: function () {
        return new WeakMap();
      }
    };
    return dataStore;
  }();
  src_jsutils_Compose = function (objectExtend, dataStore) {
    /**
     * Composes new factory methods from a list of given Objects/Classes.
     *
     * @constructor Compose
     *
     * @example
     *
     * var Widget = Compose.create(Model, Events);
     *
     * myWidget = Widget.create();
     *
     */
    var
      // return all KEYs of an object, even those that are not iterable
      objectKeys = function (prototype) {
        var k, keys = [];
        for (k in prototype) {
          keys.push(k);
        }
        return keys;
      }, objectCreate = Object.create, instData = dataStore.stash,
      // Base instance methods for Compose'd object
      baseMethods = /** @lends Compose.prototype */
      {
        /**
         * Property indicating whether instance has been destroyed
         */
        isDestroyed: false,
        /**
         * instance initializing code
         */
        init: function () {
        },
        /**
         * Destroys the instance, by removing its private data.
         */
        destroy: function () {
          var hasCallbacks = this.__onDestroy, onDestroyCallbacks;
          if (hasCallbacks) {
            onDestroyCallbacks = instData.get(hasCallbacks);
            if (Array.isArray(onDestroyCallbacks)) {
              onDestroyCallbacks.forEach(function (callback, i) {
                if ('function' === typeof callback) {
                  callback();
                }
                onDestroyCallbacks[i] = null;
              });
            }
            instData['delete'](hasCallbacks);
          }
          instData['delete'](this);
          this.isDestroyed = true;
        },
        /**
         * Adds a callback to the queue to be called when this object's `.destroy()`
         * is called.
         *
         * @param {Function} callback
         */
        onDestroy: function (callback) {
          if (!this.__onDestroy) {
            this.__onDestroy = function () {
            };
          }
          if ('function' === typeof callback) {
            var key = this.__onDestroy, onDestroyCallbacks = instData.get(key);
            if (!onDestroyCallbacks) {
              onDestroyCallbacks = [];
              instData.set(key, onDestroyCallbacks);
            }
            onDestroyCallbacks.push(callback);
          }
        }
      }, staticMethods = /** @lends Compose */
      {
        /**
         * Creates an new factory based on the prototye of the current Factory
         * and any other Factory given on input.
         *
         * @return {Compose}
         */
        extend: function () {
          var args = Array.prototype.slice.call(arguments), Factory = function () {
            };
          Factory.prototype = args.reduce(function (newProto, obj) {
            if (obj) {
              var thisObjProto = obj.prototype || obj;
              objectKeys(thisObjProto).forEach(function (objKey) {
                newProto[objKey] = thisObjProto[objKey];
              });
            }
            return newProto;
          }, objectCreate(this.prototype));
          return objectExtend(Factory, this);
        },
        /**
         * Checks if the Object given on input looks like an instance of this Factory.
         *
         * @return {Boolean}
         */
        isInstanceOf: function (instanceObj) {
          if (!instanceObj) {
            return false;
          }
          var neededKeys = objectKeys(this.prototype);
          // If any prototype key is not in the object prototype, then return false
          return !neededKeys.some(function (protoKey) {
            return typeof instanceObj[protoKey] === 'undefined';
          });
        },
        /**
         * Creates an instance object based on this factory.
         *
         * @return {Object}
         */
        create: function () {
          var instance = objectCreate(this.prototype);
          if (instance.init) {
            instance.init.apply(instance, arguments);
          }
          return instance;
        }
      }, Compose = function () {
      };
    Compose.prototype = objectCreate(baseMethods);
    objectExtend(Compose, staticMethods);
    return Compose;
  }(src_jsutils_objectExtend, src_jsutils_dataStore);
  src_sputils_getNodesFromXml = function ($) {
    /**
     * Returns the requested nodes from the given xml document
     *
     * @param {Object} options
     *
     * @param {XMLDocument} options.xDoc
     *
     * @param {String} options.nodeName
     *
     * @param {Boolean} [options.asJQuery=false]
     *      If true, then xmlNodes will be returned as a jQuery
     *      selection object, ready to be traversed and/or filtered.
     *
     * @param {Boolean} [options.cleanAttr=true]
     *      if true, the 'ows_' will be stripped from column names.
     *      Only used when asJQuery=false.
     *
     * @param {Object} [options.nodeModel=null]
     *      A factory constructor that will be used to build each node.
     *      Factory must have a `create` member that will be called with
     *      the object. The model constructor method should have a signature
     *      of the following: `function(modelData, options)`
     *
     * @param {Object} [options.nodeModelOptions]
     *      Any data to be passed to the `nodeModel` constructor as the second
     *      argument. NOTE that this method will add an attribute to the options
     *      called 'source' that will contain the XML node used to create the object
     *
     * @param {Boolean} [options.convertTypes=false]
     *      When true, this method will attempt to convert certain known
     *      String values to javascript natives (ex. `"TRUE"` would become `true`)
     *
     *
     * @return {Array|jQuery}
     *      Each object that represents an XML node will contain properties
     *      for each attribute found on that node. Also, the Object will
     *      contain a special attribute - ___xmlNode - that is the actual
     *      xml node.
     *
     * @example
     *
     *  API.getNodesFromXml({
     *      xDoc: jgXHR.responseXML,
     *      nodeName: "z:row"
     *  });
     *
     * // returns something similar to the following:
     *  {
     *      ID: "123",
     *      Title: "item title",
     *      ___xmlNode: XMLElement
     *  }
     *
     *
     */
    var getNodesFromXml = function (options) {
        var opt = $.extend({}, {
            xDoc: null,
            nodeName: '',
            asJQuery: false,
            cleanAttr: true,
            nodeModel: null,
            nodeModelOptions: null,
            convertTypes: false
          }, options), nodes = opt.xDoc.getElementsByTagName(opt.nodeName), getNodeAsObj, nodeList, i, j;
        if (nodes.length === 0 && opt.nodeName === 'z:row') {
          nodes = opt.xDoc.getElementsByTagName('row');
        }
        if (nodes.length === 0 && opt.nodeName === 'rs:data') {
          nodes = opt.xDoc.getElementsByTagName('data');
        }
        if (opt.asJQuery === true) {
          return $(nodes);
        }
        nodeList = [];
        getNodeAsObj = function (ele) {
          var attrs = ele.attributes, row = {}, name, x, y;
          for (x = 0, y = attrs.length; x < y; x++) {
            name = attrs[x].name;
            if (opt.cleanAttr) {
              if (name.indexOf('ows_') > -1) {
                name = name.replace('ows_', '');
              }
            }
            if (opt.convertTypes) {
              row[name] = getJsNativeFromString(attrs[x].value);
            } else {
              row[name] = attrs[x].value;
            }
          }
          // Also store the original xml node
          // FIXME: remove ___xmlNode from object
          row.___xmlNode = ele;
          if (opt.nodeModel && opt.nodeModel.create) {
            return opt.nodeModel.create(row, $.extend({}, opt.nodeModelOptions, { source: ele }));
          } else {
            return row;
          }
        };
        for (i = 0, j = nodes.length; i < j; i++) {
          nodeList.push(getNodeAsObj(nodes[i]));
        }
        return nodeList;
      },
      //end: API.getNodesFromXml
      /**
       * Returns a JS native type (if possible) from the given string.
       * @private
       * @param {String} str
       *
       * @return {String|Object}
       */
      getJsNativeFromString = function (str) {
        if (!str) {
          return str;
        }
        var response = str;
        switch (str.toUpperCase()) {
        case 'TRUE':
          response = true;
          break;
        case 'FALSE':
          response = false;
          break;
        }
        return response;
      };
    getNodesFromXml.getJsNativeFromString = getJsNativeFromString;
    return getNodesFromXml;
  }(jquery);
  src_models_ListModel = function (Compose, objectExtend, dataStore, getNodesFromXml) {
    var instData = dataStore.stash,
      /**
       * List model. Contains the List definition data.
       *
       * @constructor ListModel
       * @extends Compose
       *
       * @param {XMLDocument|Object} source
       *  The list source - either an XML document or an Object
       *
       * @param {Object} [options]
       *
       * @param {String} [options.type="xml"]
       *  the type data in `source`. Supported values are `xml` and `json`
       *
       * @param {String} [options.webURL=""]
       *  The Full webURL of the Site for the list (ex. `https://.../sites/web1`).
       *  Option enables some of the value added methods of this model
       *
       */
      ListModel = /** @lends ListModel.prototype */
      {
        init: function (source, options) {
          var me = this, opt = objectExtend({}, ListModel.defaults, options), listObj;
          opt.type = opt.type.toLowerCase();
          opt.source = source;
          instData.set(me, opt);
          if (opt.type === 'xml') {
            listObj = getListDetailsFromXML.call(me, opt.source);
          } else if (opt.type === 'json') {
            listObj = getListDetailsFromJSON.call(me, opt.source);
          }
          objectExtend(me, listObj);
        },
        /**
         * returns the original list source used to build the model.
         */
        getSource: function () {
          return instData.get(this).source;
        },
        /**
         * Returns the url to the list. The absolute URL (ex. `https://.../sites/web1`)
         * will be returned _if_ the model was initialized with the `options.webURL`
         * defined on input.. Else, the absolute path from the root of the domain will
         * be returned (ex. `/sites/web1`).
         *
         * @return {String}
         */
        getListUrl: function () {
          var opt = instData.get(this), rootUrl;
          if (!opt.webURL) {
            return this.RootFolder || '';
          }
          rootUrl = opt.webURL.substr(0, opt.webURL.indexOf(this.WebFullUrl));
          if (!rootUrl) {
            return this.RootFolder || '';
          }
          return rootUrl + this.RootFolder;
        }
      },
      /**
       * Returns an object with the list definition from an XML document
       * @private
       * @return {Object}
       */
      getListDetailsFromXML = function (xmlDoc) {
        var listDef = getNodesFromXml({
          xDoc: xmlDoc,
          nodeName: 'List',
          convertTypes: true
        }).shift();
        delete listDef.Fields;
        delete listDef.RegionalSettings;
        delete listDef.ServerSettings;
        delete listDef.___xmlNode;
        return listDef;
      },
      /**
       * returns an object with the list definition from a JSON response object.
       */
      getListDetailsFromJSON = function () {
      };
    ListModel = Compose.extend(ListModel);
    ListModel.defaults = {
      type: 'xml'  // possible values: xml, json
    };
    return ListModel;
  }(src_jsutils_Compose, src_jsutils_objectExtend, src_jsutils_dataStore, src_sputils_getNodesFromXml);
  src_sputils_doesMsgHaveError = function ($) {
    /**
     * Checks if an xml message has an error. Taken from
     * SPWidgets.
     *
     * @param {jQuery|XMLDocument} xmlMsg
     *
     * @return {Boolean}
     */
    var doesMsgHaveError = function (xmlMsg) {
      // TODO: need to check if message is XML format. See http://stackoverflow.com/questions/8672597/how-should-i-test-if-an-object-is-a-xml-document-in-a-cross-browser-way
      var $msg = $(xmlMsg), spErrCode = $msg.find('ErrorCode'), response = false;
      if (!spErrCode.length) {
        // Any "fauldcode" nodes?
        if ($msg.find('faultcode').length) {
          return true;
        }
        // Any CopyResult nodes with ErrorMessage
        if ($msg.find('CopyResult[ErrorMessage]').length) {
          return true;
        }
        return false;
      }
      spErrCode.each(function () {
        if ($(this).text() !== '0x00000000' && $(this).text() !== 'NoError') {
          response = true;
          return false;
        }
      });
      return response;
    };
    /* doesMsgHaveError() */
    return doesMsgHaveError;
  }(jquery);
  src_spapi_getList = function ($, cache, getSiteUrl, ListModel, doesMsgHaveError) {
    var
      /**
       * Get a list definition from sharepoint or return its cached version
       * if one exists.
       * @function
       *
       * @param {Object} options
       *
       * @param {String} options.listName
       * @param {String} [options.webURL='']
       * @param {Boolean} [options.async=true]
       * @param {Boolean} [options.cacheXML=true]
       *      The message response is cached UNTIL the next time the same
       *      request is received with cacheXML set to false.
       * @param {Boolean} [options.ListModel]
       *      List model constructor factory. Factory must expose a method called
       *      `create` that accetps two input parameters: the source (XML, JSON) and
       *      the `options`.
       *
       * @return {jQuery.Promise}
       *  Resolved one object - ListModel object.
       *
       */
      getList = function (options) {
        return getListDataUsingSoap.call(this, options);
      }, getListDataUsingSoap = function (options) {
        var opt = $.extend({}, getList.defaults, options), getCacheKey = function (listName) {
            return opt.webURL + '?List=' + listName;
          }, reqPromise;
        if (!opt.webURL) {
          opt.webURL = getSiteUrl();
        } else if (opt.webURL.charAt(opt.webURL.length - 1) !== '/') {
          opt.webURL += '/';
        }
        opt.webURL += '_vti_bin/Lists.asmx';
        opt.cacheKey = getCacheKey(opt.listName);
        opt.isCached = cache.isCached(opt.cacheKey);
        // If cacheXML is true and we have a cached version, return it.
        if (opt.cacheXML && opt.isCached) {
          return cache(opt.cacheKey);
        }
        // If cacheXML is FALSE, and we have a cached version of this key,
        // then remove the cached version - basically reset
        if (opt.isCached) {
          cache.clear(opt.cacheKey);
        }
        reqPromise = $.Deferred(function (dfd) {
          $.ajax({
            type: 'POST',
            cache: false,
            async: opt.async,
            url: opt.webURL,
            contentType: 'text/xml;charset=utf-8',
            dataType: 'xml',
            data: '<?xml version="1.0" encoding="utf-8"?>' + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' + '<soap:Body><GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>' + opt.listName + '</listName></GetList></soap:Body></soap:Envelope>'
          }).then(function (xmlDoc) {
            // Any errors? if so, fail the deferred.
            if (doesMsgHaveError(xmlDoc)) {
              dfd.rejectWith($, arguments);
              return;
            }
            var listDef = opt.ListModel.create(xmlDoc, { webURL: opt.webURL });
            // If cacheXML is true, then create cache with internal name and external
            if (opt.cacheXML) {
              // Was list name an internal UID? then use list Title
              if (opt.listName.indexOf('{') === 0) {
                cache(getCacheKey(listDef.Title), reqPromise);  // Else, use the ID to cache
              } else {
                cache(getCacheKey(listDef.ID), reqPromise);
              }
            }
            dfd.resolveWith($, [listDef]);
          }).fail(function () {
            dfd.rejectWith($, arguments);
            // If cacheXML was true, then remove this from cache.
            // No point in caching failures.
            if (opt.cacheXML) {
              cache.clear(opt.cacheKey);
            }
          });
        }).promise();
        // If cacheXML was true, then cache this promise
        if (opt.cacheXML) {
          cache(opt.cacheKey, reqPromise);
        }
        return reqPromise;
      };
    getList.defaults = {
      listName: '',
      webURL: '',
      cacheXML: true,
      async: true,
      ListModel: ListModel
    };
    return getList;
  }(jquery, src_sputils_cache, src_spapi_getSiteUrl, src_models_ListModel, src_sputils_doesMsgHaveError);
  src_models_ListItemModel = function (Compose, objectExtend, dataStore) {
    var data = dataStore.stash;
    /**
     * Model for SharePoint List Items (rows). Object return will include all of
     * the properties that were given on input.
     *
     * @constructor ListItem
     * @extends Compose
     *
     * @param {Object} itemData
     *      An object with the properties for the model
     * @param {Object} [options]
     * @param {Object} [options.itemData]
     * @param {Object|String} [options.list]
     * @param {String} [options.webURL]
     *
     */
    return Compose.extend(/** @lends ListItem.prototype */
    {
      init: function (itemData, options) {
        var opt = objectExtend({}, {
          list: null,
          webURL: null
        }, options);
        if (itemData) {
          objectExtend(this, itemData);
        }
        data.set(this, opt);
      }
    });
  }(src_jsutils_Compose, src_jsutils_objectExtend, src_jsutils_dataStore);
  src_spapi_getListItems = function ($, cache, getSiteUrl, getNodesFromXml, doesMsgHaveError, ListItemModel) {
    /**
     * Method to retrieve data from a SharePoint list using GetListItems or
     * GetListItemChangesSinceToken operations of the List.axps webservice.
     * @function
     *
     * @param {Object} opt
     *      Supports same input options as SPServices
     * @param {Object} opt.listName
     *
     * @param {String} [opt.webURL="currentSiteWeb"]
     *
     * @param {String} [opt.viewName=""]
     *
     * @param {String} [opt.CAMLViewFields=""]
     *
     * @param {String} [opt.CAMLQuery=""]
     *
     * @param {String} [opt.CAMLQueryOptions=""]
     *
     * @param {String|Number} [opt.CAMLRowLimit=""]
     *
     * @param {String} [opt.operation="GetListItems"]
     *      Value Could also be set to "GetListItemChangesSinceToken".
     *
     * @param {Boolean} [opt.changeToken=""]
     *      Used only when opt.operation is "GetListItemChangesSinceToken"
     *
     * @param {Boolean} [opt.cacheXML=false]
     *
     * @return {jQuery.Promise}
     *      Promise is resolved with 3 input parameters:
     *      Array = rows (could be empty if error)
     *      Object = jqXHR
     *      String = status
     *
     * @see https://msdn.microsoft.com/en-us/library/websvclists.lists.getlistitems(v=office.14).aspx
     */
    var getListItems = function () {
      var getRows = null, callerFn = function getListItems() {
          return getRows.apply(this, arguments);
        };
      // Define defaults. User can change these on their function attachment.
      callerFn.defaults = {
        listName: '',
        webURL: '',
        viewName: '',
        CAMLViewFields: '',
        CAMLQuery: '',
        CAMLRowLimit: '',
        CAMLQueryOptions: '',
        operation: 'GetListItems',
        // Optionally: set it to = GetListItemChangesSinceToken
        cacheXML: false,
        async: true,
        completefunc: null,
        changeToken: '',
        // GetListChangesSinceToken only
        listItemModel: ListItemModel
      };
      // Makes the AJax call to SharePoint to get the data. Returns a jQuery.Promise
      getRows = function (opt) {
        var options = $.extend({}, callerFn.defaults, opt), reqPromise;
        if (!options.webURL) {
          options.webURL = getSiteUrl();
        } else if (options.webURL.charAt(options.webURL.length - 1) !== '/') {
          options.webURL += '/';
        }
        options.webURL += '_vti_bin/Lists.asmx';
        options.cacheKey = options.webURL + '?' + [
          options.listName,
          options.viewName,
          options.CAMLViewFields,
          options.CAMLQuery,
          options.CAMLRowLimit,
          options.CAMLQueryOptions,
          options.operation,
          options.changeToken
        ].join('|');
        options.isCached = cache.isCached(options.cacheKey);
        // If cacheXML is true and we have a cached version, return it.
        if (options.cacheXML && options.isCached) {
          reqPromise = cache(options.cacheKey);
          // If a completefunc was defined on this call,
          // execute it.
          if ($.isFunction(options.completefunc)) {
            reqPromise.then(function (rows, data, status) {
              options.completefunc(data, status, rows);
            });
          }
          return reqPromise;
        }
        // If cacheXML is FALSE, and we have a cached version of this key,
        // then remove the cached version - basically reset
        if (options.isCached) {
          cache.clear(options.cacheKey);
        }
        reqPromise = $.Deferred(function (dfd) {
          $.ajax({
            type: 'POST',
            cache: false,
            async: options.async,
            url: options.webURL,
            contentType: 'text/xml;charset=utf-8',
            dataType: 'xml',
            data: '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' + '<soap:Body>' + '<' + options.operation + ' xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>' + options.listName + '</listName><viewName>' + (options.viewName || '') + '</viewName><query>' + (options.CAMLQuery || '<Query></Query>') + '</query><viewFields>' + (options.CAMLViewFields || '<ViewFields></ViewFields>') + '</viewFields><rowLimit>' + (options.CAMLRowLimit || 0) + '</rowLimit><queryOptions>' + (options.CAMLQueryOptions || '<QueryOptions></QueryOptions>') + '</queryOptions>' + (options.operation === 'GetListItemChangesSinceToken' ? '<changeToken>' + options.changeToken + '</changeToken>' : '') + '</' + options.operation + '></soap:Body></soap:Envelope>',
            complete: function (data, status) {
              var rows = [];
              if (status === 'error' || doesMsgHaveError(data)) {
                // If cacheXML was true, then remove this from cache.
                // No point in caching failures.
                if (options.cacheXML) {
                  cache.clear(options.cacheKey);
                }
                dfd.rejectWith($, [
                  rows,
                  data,
                  status
                ]);
                if ($.isFunction(options.completefunc)) {
                  options.completefunc(data, status, rows);
                }
                return;
              }
              rows = getNodesFromXml({
                xDoc: data.responseXML,
                nodeName: 'z:row',
                nodeModel: options.listItemModel
              });
              dfd.resolveWith($, [
                rows,
                data,
                status
              ]);
              if ($.isFunction(options.completefunc)) {
                options.completefunc(data, status, rows);
              }
            }  //end: $.ajax().success()
          });
        }).promise();
        // If cacheXML was true, then cache this promise
        if (options.cacheXML) {
          cache(options.cacheKey, reqPromise);
        }
        return reqPromise;
      };
      //end: getRows()
      return callerFn;
    }();
    //end: getListItems()
    return getListItems;
  }(jquery, src_sputils_cache, src_spapi_getSiteUrl, src_sputils_getNodesFromXml, src_sputils_doesMsgHaveError, src_models_ListItemModel);
  src_models_ListColumnModel = function ($, Compose, objectExtend, dataStore, getNodesFromXml, getListItems) {
    var instData = dataStore.stash,
      /**
       * list Column Model.
       *
       * @constructor ListColumnModel
       * @extends Compose
       *
       * @param {Object} columnData
       *      A javascript Object with the column
       * @param {Object} [options]
       * @param {ListModel|String} [options.list=null]
       *      A reference to the [ListModel]{ListModel} of the column
       * @param {String} [options.type="xml"]
       *      A static string of either `xml` or `json`
       *      (json not yet supported, 2015-07-03)
       * @param {Object} [options.source=null]
       *      The source originally used to create the model. (ex. the XML node or the
       *     JSON response object)
       *
       */
      ListColumnModel = /** @lends ListColumn.prototype */
      {
        init: function (columnData, options) {
          var opt = objectExtend({}, ListColumnModel.defaults, options);
          if (columnData) {
            objectExtend(this, columnData);
          }
          instData.set(this, opt);
        },
        /**
         * Returns the values for the column. Useful for column of type Choice or Lookup.
         *
         * @return {Array}
         */
        getColumnValues: function () {
          var me = this, $colXml = $(instData.get(this).source), colType = me.Type, colValues = [];
          switch (colType) {
          case 'Choice':
          case 'MultiChoice':
            $colXml.find('CHOICE').each(function () {
              colValues.push($(this).text() || '');
            });
            break;
          case 'Lookup':
          case 'LookupMulti':
            // FIXME: need to make this async and return a promise
            getListItems({
              listName: me.List,
              cacheXML: true,
              async: false,
              CAMLQuery: '<Query><OrderBy><FieldRef Name="' + me.ShowField + '"/></OrderBy></Query>',
              CAMLViewFields: '<ViewFields><FieldRef Name="' + me.ShowField + '"/></ViewFields>'
            }).then(function (rows) {
              colValues = rows;
            });
            break;
          }
          return colValues;
        },
        //end getColumnvalues()
        /**
         * returns the ListModel if one was given on input when listColumnModel instance
         * was created.
         *
         * @return {ListModel}
         */
        getList: function () {
          return instData.get(this).list;
        }
      };
    ListColumnModel = Compose.extend(ListColumnModel);
    ListColumnModel.defaults = {
      list: null,
      type: 'xml',
      source: null
    };
    return ListColumnModel;
  }(jquery, src_jsutils_Compose, src_jsutils_objectExtend, src_jsutils_dataStore, src_sputils_getNodesFromXml, src_spapi_getListItems);
  src_spapi_getListColumns = function ($, getList, cache, getNodesFromXml, ListColumnModel, dataStore) {
    var instData = dataStore.stash,
      /**
       * Gets the list of columns names for the given list that are
       * visible on edit/new/disp forms. This method attempts to NOT return any
       * column that is internal.
       *
       * @param {Object|String} options
       *      An object with the options below, or a string with the listName.
       *
       * @param {String} options.listName
       *      The list name.
       *
       * @param {String} [options.columnName]
       *      Internal or External name of column. When set, only that one column will
       *      be returned.
       *
       * @param {String} [options.webURL]
       *
       * @param {Boolean} [options.cacheXML=true]
       *      If true (default), request will be cached.
       *
       * @param {Boolean} [options.async=true]
       *      If true (default) request will be async.
       *
       * @param {Object} [options.ListItemModel=ListColumnModel]
       *      The List Column Model factory to be used. Factory must expose a `create` method
       *      that accepts two input parameters: column definition (object) and options.
       *      See [ListColumnModel]{@link ListColumnModel} for more details.
       *
       * @return {jQuery.Promise}
       *      Deferred is resolved with an ListColumnCollection {@link ListColumnCollection}
       *      containing [ListColumnModels]{@link ListColumnModels}
       *
       * @example
       *
       * // Example of column definition object:
       *
       * {
       *      ColName: "nvarchar1",
       *      DisplayName: "Task Name",
       *      Name: "Title",
       *      StaticName: "Title",
       *      Type: "Text",
       *      FromBaseType: "TRUE",
       *      ID: "{fa564e0f-0c70-4ab9-b863-0177e6ddd247}",
       *      Required: "TRUE",
       *      Sealed: "TRUE",
       *      SourceID: "http://schemas.microsoft.com/sharepoint/v3",
       *      getColumnValues: function () {}
       * }
       */
      getListColumns = function (options) {
        var opt = $.extend({}, getListColumns.defaults, typeof options === 'string' ? { listName: options } : options);
        return $.Deferred(function (dfd) {
          getList({
            listName: opt.listName,
            cacheXML: opt.cacheXML,
            webURL: opt.webURL,
            async: opt.async
          }).then(function (list) {
            opt.listDef = list;
            var columns = getNodesFromXml({
                xDoc: list.getSource(),
                nodeName: 'Field',
                nodeModel: opt.ListColumnModel,
                nodeModelOptions: { list: list }  // FIXME: need to set the convertTypes to true
              }), cols = [], i, j;
            for (i = 0, j = columns.length; i < j; i++) {
              // Include only (all must match):
              //      -   Hidden attribute not set to is not true (no internal SP fields)
              //      -   Has to have a Display attribute
              //      -   No AuthoringInfo attribute (these are used on the edit buttons)
              if ((columns[i].Hidden === undefined || columns[i].Hidden === 'FALSE') && (columns[i].List === undefined || columns[i].List !== 'Docs' && columns[i].List !== 'AppPrincipals') && columns[i].DisplayName && columns[i].AuthoringInfo === undefined && (!opt.columnName || columns[i].Name === opt.columnName || columns[i].StaticName === opt.columnName || columns[i].DisplayName === opt.columnName)  //&&  String(columns[i].ColName).indexOf("tp_") !== 0 // this removes ID, CreatedBy,Modified,ModifiedBy,ContentType, etc...
) {
                // FIXME: remove this once all is converted to models
                // If XML property is present, remove it
                if (columns[i].___xmlNode) {
                  delete columns[i].___xmlNode;
                }
                cols.push(columns[i]);
                // If there was a column name defined on input, then
                // break the loop... this was it.
                // FIXME: remove this option from this method
                if (opt.columnName) {
                  i += j;
                }  // ELSE: column must be internal... destroy model
              } else if (opt.ListModel) {
                columns[i].destroy();
              }
            }
            //end: for()
            // Mixin additional methods into the array object and
            // Store this getListItems opt in stash and associated with the result
            $.extend(cols, listColumnCollectionMixin);
            instData.set(cols, opt);
            dfd.resolveWith($, [cols]);
            return;
          }).fail(function () {
            dfd.rejectWith($, Array.prototype.slice.call(arguments, 0));
          });
        }).promise();
      },
      //end: getlistColumns
      /**
      * An Array of List Columns. Each object in the array is a
      * [ListColumn]{@link ListColumnModel} model.
      * This collection extends the Array instance created and provides additional
      * methods for interacting with the collection.
      *
      * @typedef ListColumnCollection
      * @property {Function} getColumn
      *       Returns a column by searching the array by its name (internal or external)
      */
      listColumnCollectionMixin = {
        /**
         * Returns an object with the definition for the given column
         * @param {String} name
         * @return {ListColumnModel}
         */
        getColumn: function (name) {
          var list = this, col;
          list.some(function (thisCol) {
            if (thisCol.Name === name || thisCol.DisplayName === name || thisCol.StaticName === name) {
              col = thisCol;
            }
          });
          return col;
        },
        /**
         * returns the ListModel for the list for which the collection was requested.
         *
         * @return {ListModel}
         */
        getList: function () {
          if (instData.has(this)) {
            return instData.get(this).listDef;
          }
        }
      };
    //end: resultArrayMixins
    /**
     * Default input params
     * @static
     * @name getListColumns.defaults
     * @type {Object}
     */
    getListColumns.defaults = {
      listName: '',
      columnName: '',
      cacheXML: true,
      async: true,
      webURL: null,
      ListColumnModel: ListColumnModel
    };
    return getListColumns;
  }(jquery, src_spapi_getList, src_sputils_cache, src_sputils_getNodesFromXml, src_models_ListColumnModel, src_jsutils_dataStore);
  src_spapi_getListFormCollection = function ($, cache, getSiteUrl, doesMsgHaveError) {
    /**
     * Given a list name, this method will query the SP service and retrieve
     * the list of forms for it.
     *
     * @param {Object} options
     * @param {Object} options.listName
     * @param {Object} [options.webUrl='currentSiteUrl']
     * @param {Object} [options.cacheXML=false]
     * @param {Object} [options.async=true]
     * @param {Object} [options.completefunc]
     *      Options is deprecated. Use .promise that is returned.
     *
     * @return {jQuery.Promise}
     *      Promise is resolved with two input params:
     *      XMLDocument : Response from Sharepoint
     *      status : the ajax status string (error or success)
     *
     */
    var getListFormCollection = function () {
      var getData = null, callerFn = function getListFormCollection() {
          return getData.apply(this, arguments);
        };
      // Define defaults. User can change these on their function attachment.
      callerFn.defaults = {
        listName: '',
        webURL: '',
        cacheXML: false,
        async: true,
        completefunc: null
      };
      /**
       * Retrieves the data from Sharepoint
       */
      getData = function (opt) {
        var options = $.extend({}, callerFn.defaults, opt), reqPromise;
        if (!options.webURL) {
          options.webURL = getSiteUrl();
        } else if (options.webURL.charAt(options.webURL.length - 1) !== '/') {
          options.webURL += '/';
        }
        options.webURL += '_vti_bin/Forms.asmx';
        options.cacheKey = options.webURL + '?List=' + options.listName;
        options.isCached = cache.isCached(options.cacheKey);
        // If cacheXML is true and we have a cached version, return it.
        if (options.cacheXML && options.isCached) {
          reqPromise = cache(options.cacheKey);
          // If a completefunc was defined on this call,
          // execute it.
          if ($.isFunction(options.completefunc)) {
            reqPromise.then(function (xdata, status) {
              options.completefunc(xdata, status);
            });
          }
          return reqPromise;
        }
        // Return a deferred.
        reqPromise = $.Deferred(function (dfd) {
          // If cacheXML is FALSE, and we have a cached version of this key,
          // then remove the cached version - basically reset
          if (options.isCached) {
            cache.clear(options.cacheKey);
          }
          $.ajax({
            type: 'POST',
            cache: false,
            async: options.async,
            url: options.webURL,
            contentType: 'text/xml;charset=utf-8',
            dataType: 'xml',
            data: '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' + '<soap:Body><GetFormCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/">' + '<listName>' + options.listName + '</listName></GetFormCollection></soap:Body></soap:Envelope>',
            complete: function (xdata, status) {
              // Process Error from status
              if (status === 'error' || doesMsgHaveError(xdata)) {
                // If cacheXML was true, then remove this from cache.
                // No point in caching failures.
                if (options.cacheXML) {
                  cache.clear(options.cacheKey);
                }
                dfd.rejectWith($, [
                  xdata,
                  status
                ]);
                return;
              }
              dfd.resolveWith($, [
                xdata,
                status
              ]);
              if ($.isFunction(options.completefunc)) {
                options.completefunc(xdata, status);
              }
            }  //end: $.ajax().success()
          });
        }).promise();
        //end: return .promise()
        // If cacheXML was true, then cache this promise
        if (options.cacheXML) {
          cache(options.cacheKey, reqPromise);
        }
        return reqPromise;
      };
      //end: getData
      return callerFn;
    }();
    //end: API.getListFormCollection()
    return getListFormCollection;
  }(jquery, src_sputils_cache, src_spapi_getSiteUrl, src_sputils_doesMsgHaveError);
  src_sputils_getMsgError = function ($) {
    /**
     * Given a sharepoint webservices response, this method will
     * look to see if it contains an error and return that error
     * formated as a string.
     *
     * @param {XMLDocument|jQuery|String} xmlMsg
     * @return {String} errorMessage
     *
     */
    var getMsgError = function getMsgError(xmlMsg) {
      var xMsg = $(xmlMsg), error = '', spErr = xMsg.find('ErrorCode'), count = 0;
      if (!spErr.length) {
        spErr = xMsg.find('faultcode');
      }
      // See if any Elements with ErrorMssage attribute
      if (!spErr.length) {
        spErr = xMsg.find('CopyResult[ErrorMessage]');
        if (spErr.length) {
          spErr.each(function () {
            var thisErr = $(this);
            count += 1;
            error += '(' + count + ') ' + (thisErr.attr('ErrorCode') || 'unknown') + ': ' + thisErr.attr('ErrorMessage') + '\n';
          });
          return count + ' error(s) encountered! \n' + error;
        }
      }
      if (!spErr.length) {
        return '';
      }
      // Loop through and get all errors.
      spErr.each(function () {
        var thisErr = $(this);
        if (thisErr.text() !== '0x00000000') {
          count += 1;
          error += '(' + count + ') ' + thisErr.text() + ': ' + thisErr.parent().children().not(thisErr).text() + '\n';
        }
      });
      error = count + ' error(s) encountered! \n' + error;
      return error;
    };
    /* SPGetMsgError() */
    return getMsgError;
  }(jquery);
  src_spapi_updateListItems = function ($, getSiteUrl, doesMsgHaveError, getMsgError) {
    var
      /**
           * Makes updates to list items in Sharepoint Lists and Libraries. For more
           * information on this method, see {@link https://msdn.microsoft.com/en-us/library/lists.lists.updatelistitems(v=office.12).aspx}
           *
           * This method will process updates in batches and can be configured on input to
           * control the number of concurrent updates that it can issue.
           *
           * @function
           *
           * @param {Object} options
           *
           * @param {String} options.listName
           *
           * @param {String|Object|Array<Array>|Array<Object>|Array<String>} options.updates
           *  A String, Object or an Array containing any of those types. If defining XML strings,
           *  the &lt;Batch&gt; wrapper __SHOULD NOT__ be included.
           *
           * @param {Object} [options.webUrl=current_site]
           *
           * @param {String} [options.updateType='Update']
           *  Used when the updates parameter is a non-string. The value will be used
           *  to set the Cmd on the update. Valid values are 'Update' (default),
           *  'New' and 'Delete'. Note that when using 'Udpate' and 'Delete' your
           *  updates must include the ID property so that SharePoint knows on what
           *  item it needs to act on.
           *  {@link https://msdn.microsoft.com/en-us/library/ms459050(v=office.12).aspx}
           *
           * @param {String} [options.updateOnError='Continue']
           *  Value is used on the Batch element to indicate what should be done if
           *  an error is encountered. Valid values include 'Continue' (default) and
           *  'Return'. {@link https://msdn.microsoft.com/en-us/library/ms437562(v=office.12).aspx}
      
           * @param {Number} [options.batchSize=100]
           *  Number of updates per batch. Default is 100.
           *
           * @param {Number} [options.concurrency=2]
           *  Number of max concurrent updates allowed.
           *
           *
           * @return {jQuery.Promise}
           *      The promise returned is resolved with a {@link updateListItemsResponse}
           *      object.
           *
           * @example
           *
           * updateListItems({
           *      listName: "Tasks",
           *      updates: [
           *          {
           *              ID: "3",
           *              Title: "Updated title"
           *          },
           *          {
           *              ID: "4",
           *              Title: "Updated title for 4"
           *          }
           *      ]
           * })
           * .then(function(response){
           *      alert(response.message);
           * })
           *
           *
           */
      updateListItems = function (options) {
        var opt = $.extend({}, updateListItems.defaults, options, { counter: 1 });
        if (!opt.webURL) {
          opt.webURL = getSiteUrl();
        } else if (opt.webURL.charAt(opt.webURL.length - 1) !== '/') {
          opt.webURL += '/';
        }
        // some backwards compatability for SPServices
        opt.updateType = opt.batchCmd || opt.updateType;
        // Get an array of Strings with all updates
        opt._updates = getUpdateArray(opt);
        return $.Deferred(function (dfd) {
          var updatePromisesList = [], batchProcessingDone = false, updatesInFlight = 0, maxConcurrentUpds = opt.concurrency, getBatchUpdateList = function () {
              var count = 0, xmlUpdateString = '';
              while (opt._updates.length && count < opt.batchSize) {
                xmlUpdateString += opt._updates.shift();
                count++;
              }
              if (!/<\/Batch>/.test(xmlUpdateString)) {
                xmlUpdateString = '<Batch OnError="Continue">' + xmlUpdateString + '</Batch>';
              }
              if (!opt._updates.length) {
                batchProcessingDone = true;
              }
              return xmlUpdateString;
            }, onUpdateDone = function () {
              --updatesInFlight;
              // If we're all done, then resolve the overall updateListItems promise
              if (updatesInFlight === 0 && batchProcessingDone) {
                resolveUpdateListItems();
                return;
              }
              // if concurrency is not maxed out, then execute a batch update again
              if (updatesInFlight < maxConcurrentUpds) {
                execBatchUpdate();
              }
            }, execBatchUpdate = function () {
              // If we are at the max concurrency, then exit...
              if (batchProcessingDone || updatesInFlight >= maxConcurrentUpds) {
                return;
              }
              var updatePromise = $.ajax({
                type: 'POST',
                cache: false,
                async: opt.async,
                url: opt.webURL + '_vti_bin/Lists.asmx',
                beforeSend: function (xhr) {
                  xhr.setRequestHeader('SOAPAction', 'http://schemas.microsoft.com/sharepoint/soap/UpdateListItems');
                },
                contentType: 'text/xml;charset=utf-8',
                dataType: 'xml',
                data: '<?xml version="1.0" encoding="utf-8"?>' + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' + '<soap:Body><UpdateListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">' + '<listName>' + opt.listName + '</listName><updates>' + getBatchUpdateList() + '</updates></UpdateListItems></soap:Body></soap:Envelope>'
              });
              updatesInFlight++;
              updatePromise.always(onUpdateDone);
              updatePromisesList.push(updatePromise);
              // If we are not yet done, then call execBatchUpdate again
              if (!batchProcessingDone) {
                execBatchUpdate();
              }
            }, resolveUpdateListItems = function () {
              var
                // Backwards compatibility
                // TODO: remove code in future release
                execBackwardsCompatibleCode = function (xdata, status, jqXHR) {
                  if ($.isFunction(opt.completefunc)) {
                    try {
                      console.warn('updateListItems(): completefunc options is deprecated!');
                    } catch (e) {
                    }
                    opt.completefunc(xdata, status, jqXHR);
                  }
                }, processAjaxResponses = function (reqArgs, isHttpError) {
                  var args = Array.prototype.slice.call(reqArgs, 0), isMultiRequest = updatePromisesList.length > 1,
                    /**
                     * Response object returned by updateListItems. Note that if batch
                     * processing was applied, the `httpData` and `xhrRequest` properties
                     * will be arrays instead.
                     *
                     * @typedef updateListItemsResponse
                     *
                     * @property {String} status
                     *  The status of the update. Value will be
                     *  either 'error' or 'success'
                     *
                     * @property {String} message
                     *  The message string. For a status of success, this
                     *  will just be "Update successful.". For a status of
                     *  error, this will include the errors returned by sharepoint.
                     *
                     * @property {Object|jQuery.jqXHR|Array} httpData
                     *  The Data object returned from SP (ex. XML or JSON) when successful
                     *  or the jqXHR object when failure was encountered. Note that this
                     *  could be an array depending on whether updates were done in batches
                     *
                     * @property {Object|jQuery.jqXHR|Array} xhrRequest
                     *
                     */
                    response = {
                      status: 'success',
                      //error || success
                      message: 'Update Successful.',
                      httpData: isMultiRequest ? [] : isHttpError ? args[2] : args[0],
                      xhrRequest: isMultiRequest ? [] : args[2]
                    };
                  // If multiple requests, then check each one of them for
                  // SP processing errors
                  if (!isMultiRequest) {
                    args = [args];  // make args array-of-arrays === [ [args] ]
                  }
                  args.forEach(function (reqResponse) {
                    if (isMultiRequest) {
                      // for HTTP errors, we push the xhr object to the httpData attribute
                      response.httpData.push(isHttpError ? reqResponse[2] : reqResponse[0]);
                      response.xhrRequest.push(reqResponse[2]);
                    }
                    if (isHttpError) {
                      response.status = 'error';
                      response.message = reqResponse[1] || 'HTTP error.';
                      return;
                    }
                    if (doesMsgHaveError(reqResponse[0])) {
                      response.status = 'error';
                      response.message = getMsgError(reqResponse[0]);
                    }
                  });
                  if (response.status === 'error') {
                    execBackwardsCompatibleCode(response.httpData, response.status, response.xhrRequest);
                    dfd.rejectWith($, [response]);
                  } else {
                    execBackwardsCompatibleCode(response.httpData, response.status, response.xhrRequest);
                    dfd.resolveWith($, [response]);
                  }
                };
              // When all requests are done, then process the responses
              $.when.apply($, updatePromisesList).then(function () {
                processAjaxResponses(arguments, false);
              }).fail(function () {
                processAjaxResponses(arguments, true);
              });
            };
          execBatchUpdate();
        }).promise();  //end: return promise
      },
      //end: updateListItems()
      /**
       * Returns an array of String representing the updates that need
       * to be made. Handles the updates being defined in a variety of
       * ways: array-of-arrays, array-of-objects, array-of-strings, string.
       *
       * @private
       * @param {Object} options
       *
       * @return {Array<String>}
       */
      getUpdateArray = function (options) {
        var updates = [], ofType = typeof options.updates;
        function processArrayOfObjects(updArray) {
          var i, j, col, thisUpd = '';
          // Loop through the list of objects (updates)
          for (i = 0, j = updArray.length; i < j; i++) {
            thisUpd = '';
            // Build the fields to be updated for this update
            for (col in updArray[i]) {
              if (updArray[i].hasOwnProperty(col)) {
                thisUpd += '<Field Name="' + col + '">' + updArray[i][col] + '</Field>';
              }
            }
            // If this column has fields to be updated, create
            // the method agregate around it
            if (thisUpd) {
              updates.push('<Method ID="' + options.counter + '" Cmd="' + options.updateType + '">' + thisUpd + '</Method>');
              options.counter++;
            }
          }
        }
        // Array-of-arrays
        // 1 single update (outer-array) with multiple fields to be
        // updated (inner-arrays's)
        function processArrayOfArrays(updArray) {
          var thisUpd = '', i, j;
          for (i = 0, j = updArray.length; i < j; i++) {
            if ($.isArray(updArray[i])) {
              thisUpd += '<Field Name="' + updArray[i][0] + '">' + updArray[i][1] + '</Field>';
            }
          }
          if (thisUpd) {
            updates.push('<Method ID="' + options.counter + '" Cmd="' + options.updateType + '">' + thisUpd + '</Method>');
            options.counter++;
          }
        }
        // Backwards compatability to SPServices: if we don't have
        // options.updates defined, but we have .ID and .valuepairs,
        // Then do array-of-arrays
        if (!options.updates && options.ID && options.valuepairs) {
          options.valuepairs.push([
            'ID',
            options.ID
          ]);
          processArrayOfArrays(options.valuepairs);  // If options.updates is a string, then just add it as is to
                                                     // the array
        } else if (ofType === 'string') {
          updates.push(options.updates);
        } else if ($.isArray(options.updates) && options.updates.length) {
          ofType = typeof options.updates[0];
          // Array<Object>
          if (ofType === 'object') {
            processArrayOfObjects(options.updates);  // Array<String>
          } else if (ofType === 'string') {
            updates.push.apply(updates, options.updates);  // Array<Array>
          } else if ($.isArray(options.updates[0])) {
            processArrayOfArrays(options.updates);
          }
        }
        return updates;
      };
    //end: getUpdateArray
    // Define defaults. User can change these on their function attachment.
    updateListItems.defaults = {
      listName: '',
      webURL: '',
      async: true,
      completefunc: null,
      updates: '',
      updateType: 'Update',
      updateOnError: 'Continue',
      batchSize: 100,
      concurrency: 2
    };
    return updateListItems;
  }(jquery, src_spapi_getSiteUrl, src_sputils_doesMsgHaveError, src_sputils_getMsgError);
  src_sputils_fillTemplate = function ($) {
    /**
     * An extreemly lightweight template engine for replacing
     * tokens in the form of {{name}} with values from an object
     * or a list (array) of objects
     *
     * @param {Object} tmplt
     * @param {Object} data
     *
     * @return {String} templated filled out
     *
     */
    var fillTemplate = function fillTemplate(tmplt, data) {
      var opt = {}, i, j, x, y, item, tokenVal;
      // If user used an object to define input param, then parse that now
      if (typeof tmplt === 'object' && arguments.length === 1) {
        data = tmplt.data;
        tmplt = tmplt.tmplt;
      }
      opt.response = '';
      opt.template = typeof tmplt !== 'string' ? String($('<div/>').append(tmplt).html()) : tmplt;
      opt.tokens = opt.template.match(/(\{\{.*?\}\})/g);
      if (!$.isArray(data)) {
        if (!data) {
          data = [{}];
        } else {
          data = [data];
        }
      }
      // If we have tokens in the template, then replace them
      if (opt.tokens !== null) {
        // If data tokens were passed in on input, then use them
        // in looking for that token in the template and replacing
        // it with the value defined.
        for (x = 0, y = data.length; x < y; x++) {
          item = opt.template;
          for (i = 0, j = opt.tokens.length; i < j; i++) {
            opt.tokens[i] = opt.tokens[i].replace(/[\{\}]/g, '');
            tokenVal = data[x][opt.tokens[i]] || '';
            if ($.isFunction(tokenVal)) {
              tokenVal = tokenVal();
            }
            item = item.replace('{{' + opt.tokens[i] + '}}', tokenVal);
          }
          opt.response += item;
        }
      } else {
        opt.response = opt.template;
      }
      return opt.response;
    };
    //end: fillTemplate()
    return fillTemplate;
  }(jquery);
  src_uiutils_makeSameHeight = function ($) {
    /**
     * Make a set of element the same height by taking the height of
     * the longest element.
     *
     * @param {HTMLElement|Selector|jQuery} ele - Set of elements
     * @param {Interger} [pad=0]                - Number of pixels to add on to the height
     * @param {String} [cssProp=height]         - The css property to be set. Default is height
     *
     * @return {Object} ele (input param) is returned
     *
     */
    var makeSameHeight = function makeSameHeight(ele, pad, cssProp) {
      var h = 0, e = $(ele);
      if (!cssProp) {
        cssProp = 'height';
      }
      e.each(function () {
        var thisEle = $(this).css(cssProp, '');
        if (h < thisEle.outerHeight(true)) {
          h = thisEle.outerHeight(true);
        }
      });
      if (h > 0) {
        if (pad) {
          h += pad;
        }
        e.css(cssProp, h);
      }
      return ele;
    };
    // end: makeSameHeight()
    return makeSameHeight;
  }(jquery);
  src_uiutils_addHoverEffect = function ($) {
    /**
     * Given a list of elements, this will add a hover affect to
     * those elements by toggling some classes from jQuery UI
     *
     * @memberof jQuery.pt
     *
     * @param {jQuery|String} ele   A jQuery selector or object containing
     *                              the list of elements to receive the hover
     *                              effect.
     * @return {jQuery}
     *
     * @example
     *
     *      $(".tt-hover-animate").addHoverEffect();
     *      $(".container a").addHoverEffect();
     *
     */
    var addHoverEffect = function (ele) {
      return $(ele).each(function () {
        if ($(this).hasClass('addHoverEffectDone')) {
          return;
        } else {
          $(this).addClass('addHoverEffectDone');
        }
        var e = this;
        $(e).mouseenter(function () {
          $(e).toggleClass('ui-state-hover');
        });
        $(e).mouseleave(function () {
          $(e).toggleClass('ui-state-hover');
        });
      });
    };
    // .addHoverEffect()
    return addHoverEffect;
  }(jquery);
  text_src_boardWidget_boardhtml = '<div class="spwidget-board"> <div class="spwidget-board-settings" style="display:none"> <div class="spwidget-board-settings-columns">Columns</div> <div class="spwidget-board-column-list-cntr ui-widget-content ui-corner-all" style="display: none"> <div class="ui-state-default"> <span> <span class="spwidget-board-column-total"></span> <span class="spwidget-board-column-total-label">Selected.</span> </span> <button type="button" name="check" title="Check-Uncheck All">Check</button> <button type="button" name="close" title="Close">Close</button> </div> <div class="spwidget-board-column-list"> </div> <div class="ui-state-default"> <button type="button" name="apply">Apply</button> </div> </div> </div> <div class="spwidget-board-headers"> <div class="spwidget-board-headers-cntr"> <div class="spwidget-board-state ui-widget-content ui-corner-top"> <span class="spwidget-board-header-title"></span> <span class="spwidget-state-item-stat-cntr"> <span class="spwidget-item-stat ui-widget-content ui-corner-all spwidget-state-item-total">0</span> </span> </div> <div style="clear:both"></div> </div> </div> <div style="clear:both"></div> <div class="spwidget-board-states"> <div class="spwidget-board-states-cntr"> <div class="spwidget-board-state ui-widget-content ui-corner-bottom"></div> <div style="clear:both"></div> </div> </div> <div style="clear:both"></div> </div> <div class="spwidget-item-template"> <div> <div>#{{ID}}: {{Title}}</div> <div class="ui-state-active ui-corner-all spwidget-board-item-actions"> <a class="spwidgets-board-action" href="javascript:" title="View Item" data-spwidgets_id="{{ID}}" data-spwidgets_board_action="view-item"><img src="/_layouts/images/icgen.gif" border="0"></a> <a class="spwidgets-board-action" href="javascript:" title="Edit Item" data-spwidgets_id="{{ID}}" data-spwidgets_board_action="edit-item"><img src="/_layouts/images/CMSEditSourceDoc.GIF" border="0"></a> </div> </div> </div>';
  less_src_boardWidget_board = undefined;
  src_boardWidget_board = function ($, getSiteUrl, getListColumns, getListFormCollection, getListItems, updateListItems, getNodesFromXml, fillTemplate, makeSameHeight, addHoverEffect, doesMsgHaveError, getMsgError, boardTemplate) {
    /**
     * Displays data from a list in Kan-Ban board using a specific column from
     * that list.  Column (at this point) is assume to be a CHOICE type of field.
     * @namespace board
     */
    var Board = {}, showBoard, getBoardStates;
    /** @property {Integer} The max number of columns that can be built (not displayed) */
    Board.maxColumns = 20;
    /**
     * Board widget default options.
     * @name board.defaults
     * @type {Object}
     */
    Board.defaults = {
      list: '',
      field: '',
      CAMLQuery: '<Query></Query>',
      CAMLViewFields: '',
      fieldFilter: null,
      optionalLabel: '(none)',
      allowFieldBlanks: null,
      template: null,
      webURL: '',
      showColPicker: false,
      colPickerLabel: 'Columns',
      colPickerVisible: [],
      colPickerCloseLabel: 'Close',
      colPickerApplyLabel: 'Apply',
      colPickerCheckLabel: 'Check-Uncheck All',
      colPickerTotalLabel: 'Selected.',
      colPickerMaxColMsg: 'Can not exceed 10 columns!',
      colPickerMinColMsg: 'Mininum of 2 required!',
      onGetListItems: null,
      onPreUpdate: null,
      onBoardCreate: null,
      height: null
    };
    /**
     * Given a selector, this method will insert a Kan-Ban board inside
     * of it with data retrieved from a specific list.
     * This widget will retrieve the List definition upon first call
     * and setting cache = true. In some implementations
     * it may be desirable to get these defintions ahead of calling this
     * widget so that a cached version is used.
     *
     * @param {HTMLElement|jQuery|Selector} containers
     *      The elements where the board will be created.
     *
     * @param {Object} options
     *
     * @param {String} options.list
     *                  The list name or UID.
     *
     * @param {String} options.field
     *                  The field from the List from where the board should
     *                  be built from. This field should be either of type
     *                  CHOICE or LOOKUP.
     *
     * @param {Null|Boolean} [options.allowFieldBlanks=null]
     *                  Control whether an additional board state is shown that
     *                  allows user to move a task to blank value (value in the column
     *                  is blank). Possible values are:
     *                  `null` - (default) widget will try to
     *                  figure it out based on the Field definition in the list.
     *                  `true` - Always show "none" column. Note that if the field is
     *                  setup as Required, updates to the item may fail.
     *                  `false` - Always hide the "none" column, regardless of the
     *                  field definition. Note that if your data has item with blanks
     *                  for the field, those item will not be shown on the board.
     *
     *
     * @param {String|Function} [options.CAMLQuery="<Query></Query>"]
     *                  String with CAML query to be used against the list
     *                  to filter what is displayed or a function that will
     *                  provide the list of items (an array). If defining
     *                  a Function, it will be given two input parameter:
     *                  1) a function that must be called and be given the
     *                  array of items.
     *                  2) The options defiend on input to this widget.
     *                  The user defined function will be given a scope
     *                  (this keyword) of the html element it was bound to.
     *                  Example:
     *                  options.CAMLQuery = '<Query><Where>\
     *                          <FieldRef Name="Project" />\
     *                          <Value Type="Text">Latin America</Value>\
     *                      </Where></Query>';
     *                  --or--
     *                  options.CAMLQuery = function(sendResults) {
     *                      //get items from DB
     *                      sendResults([...]);
     *                  }
     *
     * @param {String} [options.CAMLViewFields=""]
     *                  String in CAML format with list of fields to be
     *                  returned from the list when retrieving the rows
     *                  to be displayed on the board.
     *
     * @param {String} [options.fieldFilter=""]
     *                  A string with either a comma delimetered list of
     *                  column values to show if field is of CHOICE type;
     *                  or a string with a CAML query to filter field values,
     *                  if field is of type Lookup
     *
     * @param {String} [options.optionalLabel="(none)"]
     *                  The string to be used as the State column header when
     *                  field from where Board was built is optional in the
     *                  List.
     *
     * @param {String|Function} [options.template="<div></div>"]
     *                  The HTML template that will be used to for displaying
     *                  items on the board. The HTML can be defined with tokens
     *                  in the format of {{Column_Internal_Name}}.
     *                  When defining a Function, it will be called with
     *                  a context of the board Html Element container and be
     *                  given two input params:
     *                  1. Item data object
     *                  2. Null || jQuery object
     *
     *                  Example:
     *
     *                      function(listItemObj, $ItemUI){
     *                          // this = jQuery - the container of the board.
     *                      }
     *
     * @param {String} [options.webURL=currentSiteUrl]
     *                  The WebURL for the list.
     *
     * @param {Boolean} [options.showColPicker=false]
     *                  If true, the column picker option will be displayed
     *                  on the page. Allows user to pick which column are
     *                  visible/hidden.
     *
     * @param {Array} [options.colPickerVisible=[]]
     *                  The list of board columns that should be visible. Used
     *                  only when showColPicker is true.
     *
     * @param {String} [options.colPickerLabel="Columns"]
     *                  The label for the column picker button.
     *
     * @param {String} [options.colPickerCloseLabel="Close"]
     *                  The label for the column picker pop-up close button
     *
     * @param {String} [options.colPickerCheckLabel="Apply"]
     *                  Label for the Check all/uncheck all
     *
     * @param {String} [options.colPickerApplyLabel="Apply"]
     *                  The label for the column picker pop-up apply button
     *
     * @param {String} [options.colPickerMaxColMsg="Can not exceed 10 columns!"]
     *                  Message to display when more than 10 columns were selected
     *
     * @param {String} [options.colPickerMinColMsg="Minimum of 2 required!"]
     *                  Message to display when less then 2 columsn were selected
     *
     * @param {String} [options.colPickerTotalLabel="Selected."]
     *                  The label for the number of column selected text on
     *                  the column picker popup.
     *
     * @param {Function} [options.onGetListItems=null]
     *                  Callback function to be called after data has been
     *                  retrieved from the 'list'. Function will be given a
     *                  scope (this) of the selection they used on input to
     *                  this method and two input parameters:
     *                  An Array of Objects with the list of rows returned
     *                  from the List, and
     *                  A jQuery object representing the entire xml document
     *                  response.  Example:
     *
     *                      onGetListItems: function(items, xmlResponse){
     *                          //this = jQuery element container selction
     *                      }
     *
     * @param {Function} [options.onPreUpdate=null]
     *                  Callback function to be called just prior to a List Item
     *                  update. The callback will have a scope of the item being
     *                  updated and be given 2 parameters:
     *                  1) the event object,
     *                  2) the item (DOM element) that triggered the event and
     *                  3) a data object with information/methods for the current
     *                     item/widget binding. The object will include two
     *                     attributes that will impact the updates:
     *                      data.updates - An array of updates that will be made.
     *                          The array will have, to start, the update to the
     *                          state that was triggered by the move in the board.
     *                          Additional updates can be added.
     *                          Format will be an Array-of-Arrays, where each sub-array
     *                          must have 2 items: the column name (index 0) and
     *                          the column value (index 1). Example:<br/>
     *
     *                          data.updates = [
     *                              ["Status", "Done"]
     *                          ];
     *                          // insert additional update
     *                          data.updates.push(["Title", "New title here"]);
     *
     *                      data.updatePromise - A jQuery.Promise that represents
     *                          the update that will be made. This can be used to
     *                          bind on additional functionality. The queued functions
     *                          will be given the following as input:
     *
     *                              updatePromise.then(function(newItemObj, oldItemObj, xData){
     *                                  // this = jQuery of the row container on the board
     *                              })
     *
     *                          -   The update item object (as returned by SP)
     *                          -   current item object (the one used to display the item on the board)
     *                          -   XML Document of the response from SP (xData)
     *
     *                  The function should return a boolean indicating whether the
     *                  update should be canceled. True will cancel the update.
     *                  Example:
     *
     *                      onPreUpdate: function(ev, item, data){
     *                          //this = jQuery element container selction
     *                      }
     *
     * @param {Function} [options.onBoardCreate=null]
     *                  Function triggered after board is initially created.
     *                  See spwidget:boardcreate even for parameters that
     *                  will be given to function.
     *
     * @param {String}  [options.height=null]
     *                  The height for the board. This value should be a valid CSS
     *                  dimention (ex. integer + unit - 100px). Default is null,
     *                  indicating that its not fixed height (entire board is expanded)
     *
     * @return {jQuery} this
     *
     *
     * @example
     *
     *      $("#boardContainer").SPShowBoard({
     *          list:   "Tasks",
     *          field:  "Status"
     *      });
     *
     *
     * EVENTS TRIGGERED BY THIS PLUGIN:
     *
     *  spwidget:boardchange,
     *  spwidget:boardcreate    -   Events triggered anytime a change happens
     *                              in the board or when the board is first created.
     *                              Event is provided 3 parameters
     *                              1) the event object,
     *                              2) the item (DOM element) that triggered
     *                                 the event and
     *                              3) a data object with information/methods for the current
     *                                 item/widget binding.  The objects's .updates attribute
     *                                 will contain an array of array's with the updates that
     *                                 will be made to the item.
     *                              The function's 'this'
     *                              variable will point to the column element that
     *                              received the new item.
     *
     *                              Example:
     *
     *                                  ele.on("spwidget:boardchange", function(ev, item, data){
     *                                      // this = ele;
     *                                  })
     *
     * spwidget:boarditemadd    -   Event triggered when new items are added to the
     *                              board (ex. from a refresh). Event will be given
     *                              the following input params:
     *                              1) the event object (jquery)
     *                              2) the item (DOM element) that triggered
     *                                 the event and
     *                              3) a data object with information/methods for the current
     *                                 item/widget binding.  The objects's .itemsModified attribute
     *                                 will contain an array of Objects  that were added.
     *
     * spwidget:boarditemremove -   Event triggered when items are removed from the
     *                              board (ex. from a refresh). Event will be given
     *                              the following input params:
     *                              1) the event object (jquery)
     *                              2) the board container (DOM element)
     *                              3) a data object with information/methods for the current
     *                                 item/widget binding.  The objects's .itemsModified attribute
     *                                 will contain an array of Objects that were removed.
     *
     * spwidget:boardColumnChange -   Event triggered when columns on the board are changed.
     *                              Event will be given the following input params:
     *                              1) jQuery: the event object (jquery)
     *                              2) jQuery: the board container (DOM element)
     *                              3) Object of Column Names currently visible. Key is internal
     *                                 static name, while value is the external visible name.
     *                                 For boards created from CHOICE values, key and value is
     *                                 the same.
     *
     *                              $("#board")
     *                                  .on(
     *                                      "spwidget:boardColumnChange",
     *                                      function($board, columnsObj){
     *                                          //this = $board object
     *                                      })
     *
     *
     *
     *
     * AVAILABLE METHODS:
     *
     *  refresh     -   Refreshes the data in the Board by retrieving the data
     *                  from the list again. During a refresh, existing board
     *                  items (the html element in DOM) is not actually deleted
     *                  and recreated if it already exists, but re-used. It is
     *                  important to note this specially if a custom template
     *                  function was defined as an input param.
     *
     *                  $().SPShowBoard("refresh");
     *
     * redraw       -   Redraws the board without pulling in data from the list.
     *                  Column heights will be normalized and jQuery UI's sortable
     *                  widget will be refreshed.
     *
     *                  $().SPShowBoard("redraw");
     *
     * setVisible   -   Sets which Board columns should be visible.  Method takes
     *                  as input an array of board column values (the visible name)
     *
     *                  $().SPShowBoard("setVisible", ['Not Started', 'Completed']);
     *
     *
     * setHeight    -   Sets the height of the board by applying the value passed in
     *                  to the column area that holds the cards. Use null to remove
     *                  the height.
     *                  Example:
     *                      $().SPShowBoard("setHeight", "300px");
     *                      $().SPShowBoard("setHeight", null);
     *
     * getColumns   -   Returns an array board columns. Array will include a list of
     *                  object that each represent a column in the board. The object
     *                  will contain the following information:
     *
     *                      {
     *                          name: 'internal name',
     *                          title: 'external name',
     *                          isVisible: true|false
     *                      }
     *
     * // TODO: Destroy method (must remove all event bindings)
     * // TODO: move method - moves an item on the board (identified by ID) to
     *          a different state
     *
     *
     */
    showBoard = function (containers, options) {
      // TODO: need to determine how to page large datasets.
      // Capture original set of input options (no containers).
      var args = Array.prototype.slice.call(arguments, 1), retVal = containers;
      // Attach the board to each element
      containers.each(function () {
        var ele = $(this), isMethod = typeof options === 'string', hasBoard = ele.hasClass('hasSPShowBoard'), opt = null, method = '', board = null;
        // if this element alraedy has a board on it, and
        // options is not a string, then exit.
        if (hasBoard && !isMethod) {
          return this;  // Handle METHODS
        } else if (isMethod && hasBoard && !ele.hasClass('loadingSPShowBoard')) {
          method = options.toLowerCase();
          board = ele.data('SPShowBoardOptions');
          //*** REFRESH ***
          if (method === 'refresh') {
            board._getListItems().then(function () {
              board.showItemsOnBoard({ refresh: true });
            });  //*** REDRAW ***
          } else if (method === 'redraw') {
            board.setBoardColumnHeight();  //*** SETVISIBLE ***
          } else if (method === 'setvisible') {
            board.setUserDefinedVisibleCol(args[1]);  //*** SETHEIGHT ***
          } else if (method === 'setheight') {
            board.height = args[1];
            board.setBoardColumnHeight();  //*** GET COLUMNS ***
          } else if (method === 'getcolumns') {
            retVal = board.getBoardColumnList();
          }
          //end: if(): methods
          return this;
        }
        //end: if()
        // If this element is already loading the UI, exit now
        if (ele.hasClass('loadingSPShowBoard')) {
          return this;
        }
        // Define this Widget instance
        opt = $.extend({}, Board.defaults, options, {
          ele: ele,
          states: [],
          // List of states
          statesMap: {},
          // Map of State->object in states[]
          tmpltHeader: '',
          // Header template
          tmpltState: '',
          // State item template
          statesCntr: '',
          // DOM element where rows are located
          headersCntr: '',
          // DOM element where headers are located
          listItems: [],
          // Array with items from the list.
          initDone: false,
          formUrls: null,
          // Object with url's to form. Used by opt.getListFormUrl()
          isStateRequired: false,
          // SP defaults are for fields to be optional
          maxColumnVisible: 10,
          showNumberOfColumns: 10,
          // number of columns shown on the board
          /**
           * Populates the opt.states and opt.statesMap by
           * pulling info. from the List definition
           *
           * @return {jQuery.Promise}
           *      Success, promise get resolved with a scope of 'opt' and
           *          receives the xData and status variables
           *      Failure, promise gets resolved with cope of 'ele' and
           *          received a string with the error, xData and Status.
           *
           */
          getBoardStates: getBoardStates,
          /**
           * Retrieves the items from the list for display on the board.
           * Method return a promise whose input param is an array of
           * object.
           *
           * @param {object} options
           *
           * @return {jQuery.Promise} jQuery promise
           *
           */
          _getListItems: function () {
            return $.Deferred(function (dfd) {
              /**
               * Resolves the Deferred object.
               *
               * @param {jQuery|Function} rawResponse
               *              Raw response from teh call to get data.
               *              is passed along to the user's onGetListItems()
               *              callback.
               */
              function resolveDeferred(rawResponse) {
                // If a callback was defined for onGetListItems,
                // then call it now
                if ($.isFunction(opt.onGetListItems)) {
                  opt.onGetListItems.call(ele, opt.listItems, rawResponse);
                }
                dfd.resolveWith(ele, [opt.listItems]);
              }
              //end: resolveDeferred()
              // If CAMLQuery is a function, then call user'
              // data retrieval method.
              if ($.isFunction(opt.CAMLQuery)) {
                opt.CAMLQuery.call(ele, function (items) {
                  if ($.isArray(items)) {
                    opt.listItems = items;
                    resolveDeferred(opt.CAMLQuery);
                  }
                }, options);  // ELSE, opt.CAMLQuery is not a function...
                              // call GetListItems operation.
              } else {
                getListItems({
                  listName: opt.list,
                  async: true,
                  CAMLQuery: opt.CAMLQuery,
                  CAMLRowLimit: 0,
                  // FIXME: SP data should be paged??
                  CAMLViewFields: opt.CAMLViewFields,
                  webURL: opt.webURL
                }).then(function (rows) {
                  opt.listItems = rows;
                  resolveDeferred(rows);
                })  //end: completefunc()
.fail(function (rows, data, status) {
                  dfd.rejectWith($, [
                    rows,
                    data,
                    status
                  ]);
                });
              }  //end: else: get list items
            }).promise();
          },
          //end: _getListItems()
          /**
           * Given an ID, this method will return the data object
           * for that item - the element retrieved during for
           * display on the board.
           *
           * @param {String|Interger}
           *
           * @return {Object} Item Object
           *
           */
          getBoardItemDataObject: function (itemId) {
            var itemObject = null, x, y, id;
            if (itemId) {
              itemId = String(itemId);
              for (x = 0, y = opt.listItems.length; x < y; x++) {
                id = opt.listItems[x].ID;
                if ($.isFunction(id)) {
                  id = opt.listItems[x].ID();
                }
                id = String(id);
                if (itemId === id) {
                  itemObject = opt.listItems[x];
                  x = y + y;
                }
              }
            }
            return itemObject;
          },
          // end: pageSetup.getBoardItemDataObject
          /**
           * Shows the List items on the board.
           *
           * @param {Object} [options]
           *
           * @param {Array} [options.rows=opt.listItems]
           *              The rows to display on tehe board. Default
           *              to list stored in opt.listItems.
           *
           * @param {Boolean} [options.refresh=false]
           *              If true, then items currently on the board
           *              will not be erased; only new items will be
           *              added and invalid item will be removed.
           *
           * @param {Boolean} [options.doBoardInsert=true]
           *              When true, the items created will be inserted
           *              into the board widget. Set to false if doing it
           *              elsewhere.
           *
           * @return {Object} itemsForBoard
           *              An object with state=string of html for
           *              insertion into the Board.
           *
           */
          showItemsOnBoard: function (options) {
            // console.time("Board.ShowItemsOnBoard()");
            var thisOpt = $.extend({}, {
                rows: opt.listItems,
                refresh: false,
                doBoardInsert: true
              }, options), newItems = [], delItems = [], chgItems = [], itemsForBoard = {},
              // each state as the key... string of html as value
              boardItemCntr = null, thisRowState = null, thisRowID = null, evData = null, thisListRow = null, x, y;
            /**
             * Creates a new items using the given template
             * and returns a string of that new items.
             *
             * @param {Object} itemDataObj  -   The item's object.
             * @param {jQUery} $uiELe       -   The UI container.
             *
             * @return {String} new item html
             *
             */
            function createNewItem(itemDataObj, $uiEle) {
              var newItem = '', itemId = null, css = '';
              // Caller defined a function for item template?
              if ($.isFunction(opt.template)) {
                newItem = opt.template.call(ele, itemDataObj, $uiEle);
                if (newItem) {
                  newItem = String(newItem);
                }  // ELSE: Caller did not define function for template
              } else {
                newItem = fillTemplate(opt.template, thisListRow);
              }
              // If we have a UI element already and a new item was created
              // insert it directly into the UI element.
              if ($uiEle !== undefined && newItem !== '') {
                $uiEle.html(newItem);  // Else, we have no UI Element... If the new Item is not
                                       // blank, then create a new item for insertion.
              } else if (newItem !== '') {
                // Accomodate possible knockout objects
                itemId = itemDataObj.ID;
                if ($.isFunction(itemDataObj.ID)) {
                  itemId = itemDataObj.ID();
                }
                // Store this item to be added to the board in bulk
                if (itemsForBoard[thisRowState] === undefined) {
                  itemsForBoard[thisRowState] = '';
                }
                if (opt.initDone && thisOpt.refresh) {
                  css += ' spwidget-temp';
                }
                itemsForBoard[thisRowState] += '<div class="spwidget-board-state-item ui-state-default ui-corner-all' + css + '" data-id="' + itemId + '">' + newItem + '</div>';
              }
              return newItem;
            }
            //end: ------> createNewItem()
            // If refresh is false, then erase all items
            // currently in the board
            if (!thisOpt.refresh) {
              for (x = 0, y = opt.states.length; x < y; x++) {
                opt.states[x].headerTotalEle.html('0');
                opt.states[x].dataEle.empty();
              }
            }
            // console.time("Board.ShowItemsOnBoard().each(rows)");
            // Populate each row into its respective column
            for (x = 0, y = thisOpt.rows.length; x < y; x++) {
              thisListRow = thisOpt.rows[x];
              // Get this row's State and ID.
              // Accomodate possible knockout objects
              thisRowState = thisListRow[opt.field] || '';
              thisRowID = thisListRow.ID;
              if ($.isFunction(thisRowState)) {
                thisRowState = thisListRow[opt.field]();
              }
              if ($.isFunction(thisRowID)) {
                thisRowID = thisRowID();
              }
              // If this state value is on the board (as a column),
              // Then proced to build the item into the board.
              if (opt.statesMap[thisRowState]) {
                // If not a refresh, then the entire UI is being
                // rebuilt. We'll be working with Strings.
                if (thisOpt.refresh === false) {
                  // if INIT is done (true), then capture this as a new
                  // item on the board (for events)
                  if (opt.initDone) {
                    newItems.push(thisListRow);
                  }
                  createNewItem(thisListRow);  // ELSE, must be doing a Refresh and these
                                               // items could already exist on the board.
                } else {
                  // Try to find this row in the board
                  boardItemCntr = opt.statesCntr.find('div[data-id=\'' + thisRowID + '\']');
                  // If item was NOT found on the board, then
                  // we're adding it now.
                  if (!boardItemCntr.length) {
                    // if INIT is done (true), then capture this as a new
                    // item on the board (for events)
                    if (opt.initDone) {
                      newItems.push(thisListRow);
                    }
                    createNewItem(thisListRow);  // Else, item was found on the Board.
                  } else {
                    // Add a temporary class to the item, so that we
                    // know a little later (below) that this is still
                    // a valid item
                    boardItemCntr.addClass('spwidget-temp');
                    // Check if it should be moved to a new STate (column)
                    if (boardItemCntr.closest('div.spwidget-board-state').data('boardstate') !== thisRowState) {
                      boardItemCntr.appendTo(opt.statesMap[thisRowState].dataEle);
                      chgItems.push(thisListRow);
                    }
                    // Refresh the UI for the item with the new data
                    createNewItem(thisListRow, boardItemCntr);
                  }
                }  //end: if(): is it refresh?
              }  //end: if(): Does the state appear on the board?
            }
            //end: for() - each thisOpt.rows[]
            // console.timeEnd("Board.ShowItemsOnBoard().each(rows)");
            // should we update the board?
            if (thisOpt.doBoardInsert) {
              // console.time("Board.ShowItemsOnBoard().InsertIntoDOM");
              for (x in itemsForBoard) {
                if (itemsForBoard.hasOwnProperty(x) && itemsForBoard[x] !== '') {
                  opt.statesMap[x].dataEle.append(itemsForBoard[x]);
                }
              }
              // Add the mouseover hover affect.
              addHoverEffect(ele.find('.spwidget-board-state-item'));  // console.timeEnd("Board.ShowItemsOnBoard().InsertIntoDOM");
            }
            // If initialization is done and board is being
            // refreshed, then check to see if any items are
            // no longer valid
            if (opt.initDone && thisOpt.refresh) {
              opt.statesCntr.find('div.spwidget-board-state-item').not('div.spwidget-temp').each(function () {
                delItems.push(opt.getBoardItemDataObject($(this).data('id')));
                $(this).remove();
              }).end().removeClass('spwidget-temp');
            }
            // If initialization was done already, then
            // trigger events and refresh jQuery UI widget
            if (opt.initDone) {
              // Refresh sortable widget if init was already done
              opt.statesCntr.find('div.spwidget-board-state').sortable('refresh').end().disableSelection();
              // Get a new event object
              evData = opt.getEventObject();
              // Trigger events if init has already been done
              if (newItems.length) {
                evData.itemsModified.length = 0;
                evData.itemsModified.push(newItems);
                ele.trigger('spwidget:boarditemadd', [
                  ele,
                  $.extend({}, evData)
                ]);
              }
              if (delItems.length) {
                evData.itemsModified.length = 0;
                evData.itemsModified.push(delItems);
                ele.trigger('spwidget:boarditemremove', [
                  ele,
                  $.extend({}, evData)
                ]);
              }
              // Push both updates and removals to the eventObject
              evData.itemsModified.length = 0;
              evData.itemsModified.push.apply(evData.itemsModified, newItems);
              evData.itemsModified.push.apply(evData.itemsModified, delItems);
              evData.itemsModified.push.apply(evData.itemsModified, chgItems);
              // Trigger event if anything has changed.
              if (evData.itemsModified.length) {
                ele.trigger('spwidget:boardchange', [
                  ele,
                  evData
                ]);
              }
            }
            //end: if(): initDone == true
            // Update the headers and set the board height
            opt.updBoardHeaders();
            opt.setBoardColumnHeight();
            // console.timeEnd("Board.ShowItemsOnBoard()");
            return itemsForBoard;
          },
          //end: opt.showItemsOnBoard()
          /**
           * Updates the board headers with the total number of
           * items under each state column
           *
           * @param {options} [options]
           * @param {String} [options.state=null] The state to be updated
           *
           */
          updBoardHeaders: function (options) {
            var thisOpt = $.extend({}, { state: null }, options), x, y;
            // Specific state
            if (thisOpt.state) {
            } else {
              for (x = 0, y = opt.states.length; x < y; x++) {
                opt.states[x].headerTotalEle.html(opt.states[x].dataEle.children().length);
              }
            }
          },
          //end: opt.updBoardHeaders()
          /**
           * Returns an object with data about the board that can
           * be used to pass along to events.
           *
           * @param {jQuery|HTMLElement} [uiItemEle]
           *      The board item to initiate the event object from.
           *
           * @return {Object}
           *
           */
          getEventObject: function (uiItemEle) {
            if (!uiItemEle) {
              uiItemEle = opt.statesCntr.find('div.spwidget-board-state-item:first');
            }
            uiItemEle = $(uiItemEle);
            var evObj = {
                /** @property {Object} evObj.stateTotal A map of state name to total number of items */
                stateTotals: {},
                /** @property {Integer} itemTotal   The total number of items in the board, across all states. */
                itemTotal: 0,
                /** @property {String} evObj.currentState   The state name */
                currentState: uiItemEle.closest('div.spwidget-board-state').data('boardstate'),
                /** @property {Object} evObj.itemObj    The individual board item data */
                itemObj: opt.getBoardItemDataObject(uiItemEle.data('id')) || {},
                /** @property {Array} evObj.itemsModified   The list of objects representing the modified items */
                itemsModified: []
              }, x, j;
            // Build totals
            for (x = 0, j = opt.states.length; x < j; x++) {
              evObj.itemTotal += evObj.stateTotals[opt.states[x].name] = Number(opt.states[x].headerTotalEle.text());
            }
            return evObj;
          },
          //end: opt.getEventObject()
          /**
           * Returns the url (full url) for the requested form
           * of the List.
           *
           * @param {String} type
           *          A static string value indicating the type
           *          of form to return. Valid values include
           *          'EditForm', 'DisplayForm' and 'NewForm'
           *
           * @return {String}
           *          The url to the list form.
           *
           */
          getListFormUrl: function (type) {
            type = String(type).toLowerCase();
            function loadFormCollection() {
              getListFormCollection({
                listName: opt.list,
                webURL: opt.webURL,
                cacheXML: true,
                async: false,
                completefunc: function (xData) {
                  // Need to check for errors?
                  $(xData.responseXML).find('Form').each(function () {
                    var $thisForm = $(this);
                    opt.formUrls[String($thisForm.attr('Type')).toLowerCase()] = opt.webURL + '/' + $thisForm.attr('Url');
                  });
                }  //end: completefunc
              });
            }
            //end: loadFormCollection()
            if (opt.formUrls === null) {
              opt.formUrls = {};
              loadFormCollection();
            }
            return opt.formUrls[type] || '';
          },
          // end: opt.getListFormUrl()
          /**
           * Handles the setting of visible board columns based on
           * user input, which shoudl be an array of column names.
           *
           * @param {Array|String} colList
           *      An array of columns names or a static string value
           *      of 'all'. Column names can be either internal name
           *      or external.
           *
           */
          setUserDefinedVisibleCol: function (colList) {
            var count = 0, showAll = false;
            if (!colList) {
              return;
            }
            // If input is not an array, then exit, unless
            // it is the keyword 'all'.
            if (!$.isArray(colList) || !colList.length) {
              if (!$.isArray(colList) && String(colList).toLowerCase() !== 'all') {
                return;
              }
              showAll = true;
              colList = [];
            }
            if (colList.length < 2) {
              return;
            }
            // isValidColumn - checks if a column is valid
            function isValidColumn(colName) {
              var response = false;
              $.each(opt.states, function (i, state) {
                if (state.title === colName || state.name === colName) {
                  response = true;
                  return false;
                }
              });
              return response;
            }
            //end: function isValidColumn
            // Validate that at least 2 of the column names are valid.
            if (!showAll) {
              count = 0;
              $.each(colList, function (i, col) {
                if (isValidColumn(col)) {
                  count++;
                }
                // If we validated at least 2 columns, exit. Next loop
                // will do the job of show/hide if column valid.
                if (count === 2) {
                  return false;
                }
              });
            }
            // Loop through all states and if any of them are
            // in the list of columns to make visible, ensure they
            // are visible on the board, else hide it.
            count = 0;
            $.each(opt.states, function (i, colDef) {
              if ($.inArray(colDef.title, colList) > -1 || $.inArray(colDef.name, colList) > -1) {
                count++;
                if (colDef.isVisible === false) {
                  colDef.isVisible = true;
                  colDef.dataEle.css('display', '');
                  colDef.headerEle.css('display', '');
                }
              } else {
                colDef.isVisible = false;
                colDef.dataEle.css('display', 'none');
                colDef.headerEle.css('display', 'none');
              }
              // if we reached the MAX allowed number
              // of visible columns, then break loop.
              if (count >= opt.maxColumnVisible) {
                return false;
              }
            });
            opt.setBoardColumnClass(count);
            // Adjust the board columns height
            opt.setBoardColumnHeight();
            opt.triggerBoardColumnChangeEvent();
            return;
          },
          //end: setUserDefinedVisibleCol()
          /**
           * Sets the class on the board based on the number
           * of columns displayed.
           *
           * @param {Integer} colCount
           *      Number of columns. If not defined, then this
           *      method will loop through opt.states to determine
           *      what is visible
           *
           * @return {Object} opt
           */
          setBoardColumnClass: function (colCount) {
            var $colCntr = opt.headersCntr.add(opt.statesCntr);
            colCount = parseInt(colCount);
            if (!colCount || colCount < 2) {
              colCount = 0;
              $.each(opt.states, function (i, colDef) {
                if (colDef.isVisible) {
                  colCount++;
                }
              });
            }
            if (opt.showNumberOfColumns === colCount) {
              return opt;
            }
            // Add the new class...
            $colCntr.addClass('spwidget-states-' + colCount);
            if (opt.showNumberOfColumns) {
              $colCntr.removeClass('spwidget-states-' + opt.showNumberOfColumns);
            }
            opt.showNumberOfColumns = colCount;
            return opt;
          },
          //end: opt.setBoardColumnClass()
          /**
           * Triggers a spwidget:boardColumnChange event on the board.
           * This is done only if initiazliation has been done. Called
           * when there are changes invisibility to the board's columns.
           */
          triggerBoardColumnChangeEvent: function () {
            var columns = [];
            if (opt.initDone) {
              $.each(opt.statesMap, function (key, defObj) {
                if (defObj.isVisible) {
                  columns.push(defObj.title);
                }
              });
              opt.ele.trigger('spwidget:boardColumnChange', [
                opt.ele,
                columns
              ]);
            }
          },
          //end: opt.triggerBoardColumnChangeEvent
          /**
           * Sets up the button for the Column picker.
           */
          setupColumnPicker: function () {
            var $colCntr = ele.find('.spwidget-board-column-list-cntr'), $colList = $colCntr.find('div.spwidget-board-column-list'), $colFooter = $colCntr.children('div.ui-state-default:last'), Picker = { $totalCntr: $colCntr.find('span.spwidget-board-column-total') };
            /**
             * SEts the total selected on the picker and returns
             * that total to the caller.
             *
             * @return {Integer}
             */
            Picker.setTotalSelected = function () {
              var total = Picker.getSelected().length;
              Picker.$totalCntr.html(total);
              return total;
            };
            //end: Picker.setTotalSelected()
            /**
             * Returns a jQuery object with the list of columns
             * selected by the user (anchors <a>)
             *
             * @return {jQuery}
             */
            Picker.getSelected = function () {
              return $colList.find('a.ui-state-highlight');
            };
            //end: Picker.getSelected()
            /**
             * Shows a message on the picker
             *
             */
            Picker.showMessage = function (msg) {
              $('<div class="spwidget-board-msg ui-state-error ui-corner-all">' + msg + '</div>').appendTo($colFooter).fadeOut(8000, function () {
                $(this).remove();
              });
            };
            /**
             * Sets the currently displayed columns on the picker
             */
            Picker.setSelected = function () {
              var $columns = $colList.find('a');
              $.each(opt.states, function (i, colDef) {
                var $thisCol = $columns.filter('[data-board_col_index=\'' + i + '\']');
                if (colDef.isVisible) {
                  Picker.selectColumn($thisCol, false);
                } else {
                  Picker.selectColumn($thisCol, true);
                }
              });
              Picker.setTotalSelected();
            };
            //end: Picker.setSelected()
            /**
             * Sets the columns (an <a> anchor) to either
             * selected or not selected
             *
             * @param {HTMLElement} colEle
             *          Single html element or an array of elements
             *
             * @param {Boolean} unSelect
             *          If true, then the column, regardless of its
             *          current display setting, will be un-selected.
             *
             * @return {HTMLElement} anchor
             */
            Picker.selectColumn = function (colEle, unSelect) {
              $(colEle).each(function () {
                var $a = $(this), $icon = $a.find('.ui-icon');
                if ($a.hasClass('ui-state-highlight') || unSelect) {
                  if (unSelect !== false) {
                    $icon.removeClass('ui-icon-check');
                    $a.removeClass('ui-state-highlight');
                  }
                } else {
                  $icon.addClass('ui-icon-check');
                  $a.addClass('ui-state-highlight');
                }
              });
              return colEle;
            };
            //end: Picker.selectColumn()
            /**
             * CHanges the board columns and makes only those selected
             * on the COlumn Picker visible. A set of colunsn (the <a>
             * element on the picker) can also be given on input, which
             * will be used as the set to make visible, regardless of
             * their state on the picker.
             *
             * @param {jQuery} $selected
             *
             * @return {undefined}
             */
            Picker.setVisibleColumns = function ($selected) {
              if (!$selected) {
                $selected = Picker.getSelected();
              }
              var colNum = $selected.length;
              // Apply columns
              $.each(opt.states, function (i, colDef) {
                if ($selected.filter('[data-board_col_index=\'' + i + '\']').length) {
                  if (colDef.isVisible === false) {
                    colDef.isVisible = true;
                    colDef.dataEle.css('display', '');
                    colDef.headerEle.css('display', '');
                  }
                } else {
                  colDef.isVisible = false;
                  colDef.dataEle.css('display', 'none');
                  colDef.headerEle.css('display', 'none');
                }
              });
              opt.setBoardColumnClass(colNum);
              // Adjust the board columns height
              opt.setBoardColumnHeight();
            };
            //end: Picker.setVisibleColumns()
            /**
             * Given an array of visible column names, this method
             * will make that set of columns visible.
             * Columns are first validated to ensure they exist,
             * and the min/max limits are also honored.
             *
             * FIXME: Refactor method Picker.setUserDefinedVisibleCol to use opt.setUserDefinedVisibleCol
             */
            Picker.setUserDefinedVisibleCol = function (colList) {
              var count = 0, selector = '';
              // If input is not an array, then exit, unless
              // it is the keyword 'all'.
              if (!$.isArray(colList) || !colList.length) {
                if (!$.isArray(colList) && String(colList).toLowerCase() !== 'all') {
                  return;
                }
                // set all columns visible
                colList = [];
                $.each(opt.states, function (i, colDef) {
                  colList.push(colDef.title);
                });
              }
              // Build the jQUery selector for the set of columns
              // that should be made visible. This selector is used
              // to get a set of elements (columns) from the Picker
              // that will then drive which columns are visible.
              $.each(colList, function (i, columnName) {
                // loop through the Array of states looking
                // for this column. Once found, build the
                // jquery selector for it and exit loop
                $.each(opt.states, function (i, state) {
                  if (state.title === columnName) {
                    count++;
                    if (count > 1) {
                      selector += ',';
                    }
                    selector += 'a[data-board_col_name=\'' + state.name + '\']';
                    return false;
                  }
                });
                // if we reached the MAX allowed number
                // of visible columns, then break loop.
                if (count >= opt.maxColumnVisible) {
                  return false;
                }
              });
              // if we have at least 2 columns, then make only the
              // requested set visible
              if (count >= 2) {
                Picker.setVisibleColumns($colList.find(selector));
                Picker.triggerEvent();
              }
            };
            //end: Picker.setUserDefinedVisibleCol() and opt.setUserDefinedVisibleCol()
            /**
             * Triggers a spwidget:boardColumnChange event on the board.
             * This is done only if initiazliation has been done.
             */
            Picker.triggerEvent = opt.triggerBoardColumnChangeEvent;
            // ----------------- [ setup ] ------------------
            // Setup Picker apply button
            $colCntr.find('button[name=\'apply\']').button({
              label: opt.colPickerApplyLabel,
              icons: { secondary: 'ui-icon-circle-check' }
            }).on('click', function () {
              var $selected = Picker.getSelected(), colNum = $selected.length;
              // validate
              if (colNum > opt.maxColumnVisible) {
                Picker.showMessage(opt.colPickerMaxColMsg);
                return;
              } else if (colNum < 2) {
                Picker.showMessage(opt.colPickerMinColMsg);
                return;
              }
              // Hide container
              $colCntr.hide();
              Picker.setVisibleColumns($selected);
              Picker.triggerEvent();
            });
            // Setup Picker CHECK button
            $colCntr.find('button[name=\'check\']').attr('title', opt.colPickerCheckLabel).button({
              text: false,
              icons: { primary: 'ui-icon-radio-off' }
            }).on('click', function () {
              var $sel = Picker.getSelected();
              if ($sel.length) {
                Picker.selectColumn($sel, true);
              } else {
                Picker.selectColumn($colList.find('a'));
              }
              Picker.setTotalSelected();
            });
            // Setup Picker Close button
            $colCntr.find('button[name=\'close\']').attr('title', opt.colPickerCloseLabel).button({
              text: false,
              icons: { primary: 'ui-icon-circle-close' }
            }).on('click', function () {
              $colCntr.hide();
            });
            // Setup the columns button
            ele.find('div.spwidget-board-settings').css('display', '').find('div.spwidget-board-settings-columns').each(function () {
              var $btn = $(this);
              $btn.button({
                label: opt.colPickerLabel,
                icons: { secondary: 'ui-icon-triangle-1-s' }
              }).on('click.SPWidgets', function () {
                if ($colCntr.is(':visible')) {
                  $colCntr.hide();
                } else {
                  Picker.setSelected();
                  $colCntr.show().position({
                    my: 'left top',
                    at: 'left bottom',
                    of: $btn
                  });
                }
              });
              return false;
            });
            // Setup the Column choices in the popup
            $colList.each(function () {
              var $cntr = $(this), columns = '';
              $.each(opt.states, function (i, colDef) {
                columns += '<a href="javascript:" data-board_col_index="' + i + '" data-board_col_name="' + colDef.name + '"><span class="ui-icon ui-icon-minus"></span>' + '<span>' + colDef.title + '</span></a>';
              });
              $cntr.html(columns);
              return false;
            }).on('click', 'a', function () {
              Picker.selectColumn(this);
              Picker.setTotalSelected();
            });
            // Set the label of the Total
            $colCntr.find('span.spwidget-board-column-total-label').html(opt.colPickerTotalLabel);
          },
          //end: opt.setupColumnPicker()
          /**
           * Sets the height on the board header and
           * data columns so that they are all equal.
           *
           */
          setBoardColumnHeight: function () {
            // Set the height of the headers
            if (opt.headersCntr.is(':visible')) {
              makeSameHeight(opt.headersCntr.find('div.spwidget-board-state:visible'), 0, 'min-height');
            }
            // If user defined a fixed height, then use that on the
            // card content column and exit.
            if (opt.height) {
              opt.statesCntr.find('div.spwidget-board-state:visible').css({
                height: opt.height,
                'min-height': ''
              });
              return;
            }
            // Else, set the height of the column area that holds the cards.
            // We also remove the fixed height from these if set.
            if (opt.statesCntr.is(':visible')) {
              makeSameHeight(opt.statesCntr.find('div.spwidget-board-state:visible').css('height', ''), 20, 'min-height');
            }
            return;
          },
          // end: opt.setBoardCOlumnHeight()
          /**
           * Returns an array of objects with the list of board
           * columns currently defined for the board. This list
           * is _NOT_ the internal array, but rather an external
           * "safe" list.
           *
           * @return {Array}
           *      An array of objects. Each object contains the
           *      name, title and isVisible attributes.
           *
           */
          getBoardColumnList: function () {
            var columns = [], i, j;
            for (i = 0, j = opt.states.length; i < j; i++) {
              columns.push({
                name: opt.states[i].name,
                title: opt.states[i].title,
                isVisible: opt.states[i].isVisible
              });
            }
            return columns;
          }  //end: opt.getBoardColumnList()
        });
        //end: $.extend() set opt
        if (!opt.webURL) {
          opt.webURL = getSiteUrl();
        }
        //----------------------------------------------------------
        //----------------[ Initialize this instance ]--------------
        //----------------------------------------------------------
        // Check for Required params
        if (!opt.list || !opt.field) {
          ele.html('<div>SPWidgets:Board [ERROR] Missing required input parameters!</div>');
          return this;
        }
        // Store instance object and mark element "loading"
        ele.addClass('loadingSPShowBoard').data('SPShowBoardOptions', opt);
        // get board states from the table definition
        opt.getBoardStates().then(function () {
          // If user did not define CAMLViewFields or the definition
          // by the user did not include the Board column then either
          // define it here or add on to the set.
          if (opt.CAMLViewFields === '') {
            opt.CAMLViewFields = '<ViewFields>' + '<FieldRef Name="ID" />' + '<FieldRef Name="Title" />' + '<FieldRef Name="' + opt.field + '" />' + '</ViewFields>';
          } else if (opt.CAMLViewFields.indexOf(opt.field) < 0) {
            opt.CAMLViewFields = opt.CAMLViewFields.replace(/<\/ViewFields\>/i, '<FieldRef Name="' + opt.field + '" /></ViewFields>');
          }
          // Populate the element with the board template
          ele.html($(boardTemplate).filter('div.spwidget-board'));
          // Get a copy of the state column for both headers and values
          opt.tmpltHeader = $('<div/>').append(ele.find('div.spwidget-board-headers-cntr div.spwidget-board-state').clone()).html();
          opt.tmpltState = $('<div/>').append(ele.find('div.spwidget-board-states-cntr div.spwidget-board-state')).html();
          // Set the number of columns to display
          // If less then 11, then set it to that number
          if (opt.states.length <= opt.maxColumnVisible) {
            opt.showNumberOfColumns = opt.states.length;
          }
          // Get pointers to the containers in the UI
          opt.statesCntr = ele.find('div.spwidget-board-states-cntr').addClass('spwidget-states-' + opt.showNumberOfColumns).empty();
          opt.headersCntr = ele.find('div.spwidget-board-headers-cntr').addClass('spwidget-states-' + opt.showNumberOfColumns).empty();
          // Build the board columns
          $.each(opt.states, function (i, v) {
            v.headerEle = $(opt.tmpltHeader).appendTo(opt.headersCntr).attr('data-boardstate', v.name).attr('data-boardindex', i).find('.spwidget-board-header-title').html(v.title).end();
            v.dataEle = $(opt.tmpltState).appendTo(opt.statesCntr).attr('data-boardindex', i).attr('data-boardstate', v.name);
            // Create the header element that holds the total
            v.headerTotalEle = v.headerEle.find('span.spwidget-state-item-total');
            // Create variable to track if column is visible
            v.isVisible = true;
            // If the index is greater than 9 (10 columns) then Column
            // must be hidden - only support 10 columns.
            if (i > opt.maxColumnVisible - 1) {
              v.headerEle.css('display', 'none');
              v.dataEle.css('display', 'none');
              v.isVisible = false;
            }
          });
          //end: .each()
          // Insert element to clear float elements
          $(opt.headersCntr, opt.statesCntr).append('<div style="clear:both;"></div>');
          // If showColPicker is true, then show the column selector
          if (opt.showColPicker === true) {
            opt.setupColumnPicker();
          }
          // If user defined colPickerVisible on input, then
          // make only those items visible
          if ($.isArray(opt.colPickerVisible) && opt.colPickerVisible.length) {
            opt.setUserDefinedVisibleCol(opt.colPickerVisible);
          }
          // Create listeners on the board.
          ele  // Bind function to sortable events so that headers stay updated
.on('sortreceive sortremove', function (ev, ui) {
            opt.updBoardHeaders();
            $(ui.item).removeClass('ui-state-hover');
          })  // On Sortreceive: update item
.on('sortreceive', function (ev, ui) {
            var evData = opt.getEventObject(ui.item), dfd = $.Deferred(), itemId = '';
            // Handle possibly the itemObject being a knockout object
            if ($.isFunction(evData.itemObj.ID)) {
              itemId = evData.itemObj.ID();
            } else {
              itemId = evData.itemObj.ID;
            }
            // Make the update to the state in SP
            evData.updates = [];
            // Format = SPService UpdateListItems
            evData.updatePromise = dfd.promise();
            evData.updates.push([
              opt.field,
              evData.currentState
            ]);
            // TODO: need to normalize evData by adding values to itemsModified
            // Call any onPreUpdate event. If TRUE (boolean) is returned,
            // update is canceled. Note that the UI is not updated to
            // reflect a canceled update (ex. item is not moved back to
            // original position)
            if ($.isFunction(opt.onPreUpdate)) {
              if (opt.onPreUpdate.call(ui.item, ev, ui.item, evData) === true) {
                return this;
              }
            }
            // If no updates to make, exit here.
            if (!evData.updates.length) {
              return this;
            }
            // Make update to SP item
            updateListItems({
              listName: opt.list,
              async: true,
              ID: itemId,
              valuepairs: evData.updates,
              webURL: opt.webURL,
              completefunc: function (xData, status) {
                // Process Errors
                if (status === 'error') {
                  dfd.rejectWith(ele, [
                    'Communications Error!',
                    xData,
                    status
                  ]);
                  return;
                }
                var resp = $(xData.responseXML), row = null;
                if (doesMsgHaveError(resp)) {
                  dfd.rejectWith(ele, [
                    getMsgError(resp),
                    xData,
                    status
                  ]);
                  return;
                }
                row = getNodesFromXml({
                  xDoc: xData.responseXML,
                  nodeName: 'z:row'
                });
                $(ev.target).trigger('spwidget:boardchange', [
                  ui.item,
                  evData
                ]);
                dfd.resolveWith(ev.target, [
                  row[0],
                  evData.itemObj,
                  xData
                ]);
              }  //end: completefunc()
            });
          })  // end: ele.on("sortreceive")
              // Buind event to catch board actions
.on('click', 'a.spwidgets-board-action', function (ev) {
            var $actionEle = $(ev.currentTarget), action = String($actionEle.data('spwidgets_board_action')).toLowerCase(), gotoUrl = '', thisPageUrl = encodeURIComponent(window.location.href);
            // TODO: enhance to open item in dialog (SP2010) if that feature is on
            switch (action) {
            case 'edit-item':
              gotoUrl = opt.getListFormUrl('EditForm');
              break;
            case 'view-item':
              gotoUrl = opt.getListFormUrl('DisplayForm');
              break;
            }
            //end: switch()
            window.location.href = gotoUrl + '?ID=' + $actionEle.data('spwidgets_id') + '&Source=' + thisPageUrl;
            return this;
          });
          //end: ele.on()
          // If no template was defined, use default
          if (opt.template === null) {
            // FIXME: need to split the item template into its own HTML file
            opt.template = $(boardTemplate).filter('div.spwidget-item-template');
          }
          // Retrieve the items from the List and then
          // Display items retrieved on the board
          opt._getListItems().then(function () {
            opt.showItemsOnBoard();
            // Make the columns "sortable"
            opt.statesCntr.find('div.spwidget-board-state').each(function () {
              var thisState = $(this);
              thisState.sortable({
                connectWith: thisState.siblings(),
                containment: ele,
                cursor: 'move',
                tolerance: 'pointer',
                opacity: '.80',
                placeholder: 'ui-state-highlight spwidget-board-placeholder',
                forcePlaceholderSize: true,
                remove: function () {
                  opt.setBoardColumnHeight();
                }  //end: remove()
              });
            });
            // Make text inside the states container un-selectable.
            opt.statesCntr.disableSelection();
            opt.initDone = true;
            opt.setBoardColumnHeight();
            // remove temp class and add the hasSPShowBoard to it.
            ele.addClass('hasSPShowBoard').removeClass('loadingSPShowBoard');
            // Call any user defined callback and trigger create event
            if ($.isFunction(opt.onBoardCreate)) {
              opt.onBoardCreate.call(ele, opt.getEventObject());
            }
            $(ele).trigger('spwidget:boardcreate', [
              ele,
              opt.getEventObject()
            ]);
          });
        })  //end: .then() (get board states)
.fail(function (failureMsg) {
          ele.append('<div class="ui-state-error"><p>' + failureMsg + '</p></div>');
        });
        //end: .fail() (get board states)
        return this;
      });
      //end: return .each()
      // return the original jQuery selection OR whatever
      // a method might have generated if one was called.
      return retVal;
    };
    //end: showBoard()
    /**
     * Returns the board states (columns).
     * @private
     * @this board
     */
    getBoardStates = function () {
      var opt = this;
      return $.Deferred(function (dfd) {
        var rejectDeferred = function (jqXHR, msg) {
          dfd.rejectWith($, [
            msg || 'Field (' + opt.field + ') not found in list definition!',
            jqXHR,
            'error'
          ]);
        };
        // Get list columns from SP
        getListColumns({
          listName: opt.list,
          cacheXML: true,
          webURL: opt.webURL
        }).then(function (listCols) {
          var f = listCols.getColumn(opt.field);
          if (!f) {
            rejectDeferred(null);
            return;
          }
          // Lets make sure that when we deal with the server, we always
          // use the Field's internal name
          opt._origField = opt.field;
          opt.field = f.Name;
          // store if field is required
          if (f.Required === 'TRUE') {
            opt.isStateRequired = true;
          }
          // Override the calculated required state attribute
          // if user set allowFieldBlanks on input
          if (typeof opt.allowFieldBlanks === 'boolean') {
            opt.isStateRequired = !opt.allowFieldBlanks;
          }
          // Process the column type (choice or Lookup)
          switch (f.Type.toLowerCase()) {
          // CHOICE COLUMNS
          case 'choice':
            // Should there be a blank column?
            if (!opt.isStateRequired) {
              opt.states.push({
                type: 'choice',
                title: opt.optionalLabel,
                name: opt.optionalLabel
              });
              opt.statesMap[''] = opt.states[opt.states.length - 1];
            }
            if (opt.fieldFilter) {
              opt.fieldFilter = opt.fieldFilter.split(/\,/);
            }
            // Loop through the Columns allowed values
            f.getColumnValues().some(function (colValue, i) {
              // if there is a filter and this column
              // is not part of it, exit loopnow
              if (opt.fieldFilter) {
                if (!$.grep(opt.fieldFilter, function (e) {
                    return e === colValue;
                  }).length) {
                  return;
                }
              }
              // If we reached a max column number, exit here.
              if (i >= Board.maxColumns) {
                try {
                  console.log('SPWIDGETS:BOARD:Warning: Can only build a max of ' + Board.maxColumns + ' columns!');
                } catch (e) {
                }
                return true;  // break the loop
              }
              opt.states.push({
                type: 'choice',
                title: colValue,
                // external visible value
                name: colValue  // internal name
              });
              // Store State value in mapper (use internal name)
              opt.statesMap[colValue] = opt.states[opt.states.length - 1];
            });
            dfd.resolveWith($, [opt.states]);
            break;
          // LOOKUP COLUMNS
          case 'lookup':
            if (!opt.fieldFilter) {
              opt.fieldFilter = '<Query></Query>';
            }
            // Query the lookup table and get the rows that
            // should be used to build the states
            getListItems({
              listName: f.List,
              async: true,
              cacheXML: true,
              CAMLQuery: opt.fieldFilter,
              webURL: opt.webURL,
              CAMLRowLimit: Board.maxColumns,
              CAMLViewFields: '<ViewFields><FieldRef Name="' + f.ShowField + '" /></ViewFields>'
            }).then(function (rows) {
              // Process Errors
              if (status === 'error') {
                rejectDeferred(null, 'Communications Error!');
                return;
              }
              // Should there be a blank column?
              if (!opt.isStateRequired) {
                opt.states.push({
                  type: 'lookup',
                  title: opt.optionalLabel,
                  // extenal visible
                  name: ''  // internal name
                });
                opt.statesMap[''] = opt.states[opt.states.length - 1];
              }
              // Loop through the rows and build the State... break
              // loop if we go over the max about of columns allowed.
              rows.some(function (thisRow, i) {
                // If we reached a max column number, exit here.
                if (i >= Board.maxColumns) {
                  try {
                    console.log('SPWIDGETS:BOARD:Warning: Can only build a max of ' + Board.maxColumns + ' columns!');
                  } catch (e) {
                  }
                  return true;
                }
                var thisId = thisRow.ID, thisTitle = thisRow[f.ShowField], thisName = thisId + ';#' + thisTitle;
                opt.states.push({
                  type: 'lookup',
                  title: thisTitle,
                  // Extenal visible
                  name: thisName  // internal name
                });
                // Store State value in mapper (use internal name)
                opt.statesMap[thisName] = opt.states[opt.states.length - 1];
              });
              dfd.resolveWith(opt, [opt.states]);
              return;
            }).fail(function (jqXHR) {
              rejectDeferred(jqXHR, 'Unable to get rows from Lookup column list');
            });
            break;
          // DEFAULT: Type on the column is not supported.
          default:
            rejectDeferred(null, 'Field (' + opt.field + ') Type (' + f.Type + ') is not supported!');
            break;
          }
          // end: switch()
          return;
        })  // getListColumns failed
.fail(function (jqXHR) {
          rejectDeferred(jqXHR);
        });
      }).promise();
    };
    //end: getBoardStates()
    showBoard.defaults = Board.defaults;
    return showBoard;
  }(jquery, src_spapi_getSiteUrl, src_spapi_getListColumns, src_spapi_getListFormCollection, src_spapi_getListItems, src_spapi_updateListItems, src_sputils_getNodesFromXml, src_sputils_fillTemplate, src_uiutils_makeSameHeight, src_uiutils_addHoverEffect, src_sputils_doesMsgHaveError, src_sputils_getMsgError, text_src_boardWidget_boardhtml);
  text_src_dateFieldWidget_dateFieldhtml = '<div class="spwidget-date-cntr"> <div class="spwidget-date-selected-cntr" style="display:none"></div> <div class="spwidget-date-input-cntr"> <input class="spwidget-date-datepicker" name="SPDateFieldInput"> </div> </div> <div class="spwidget-datetime-selector ui-widget-content ui-corner-all"> <div class="spwidget-selectors"> <div class="spwidget-date-selector"></div> <div class="spwidget-time-selector ui-widget-content ui-corner-all"> <div class="spwidget-time-selector-cntr"> <div class="ui-widget-header ui-helper-clearfix ui-corner-all"> Time </div> <div class="spwidget-time-hour"> <label>Hour</label> <select name="spwidget_hour" class="spwidget-hour"> <option value="1"> 1</option> <option value="2"> 2</option> <option value="3"> 3</option> <option value="4"> 4</option> <option value="5"> 5</option> <option value="6"> 6</option> <option value="7"> 7</option> <option value="8"> 8</option> <option value="9"> 9</option> <option value="10">10</option> <option value="11">11</option> <option value="12">12</option> </select> </div> <div class="spwidget-time-min"> <label>Minutes</label> <select name="spwidget_min" class="spwidget-min"> <option value="00">00</option> <option value="05">05</option> <option value="10">10</option> <option value="15">15</option> <option value="20">20</option> <option value="25">25</option> <option value="30">30</option> <option value="35">35</option> <option value="40">40</option> <option value="45">45</option> <option value="50">50</option> <option value="55">55</option> </select> </div> <div class="spwidget-time-ampm"> <label>AM|PM</label> <select name="spwidget_ampm" class="spwidget-ampm"> <option value="AM">AM</option> <option value="PM">PM</option> </select> </div> </div> </div> </div> <div class="spwidget-btn-set"> <div class="spwidget-btn"> Set </div> </div> </div>';
  src_sputils_getDateString = function () {
    /**
     * Returns a date string in the format expected by Sharepoint
     * Date/time fields. Usefull in doing filtering queries.
     *
     * Credit:  Matt (twitter @iOnline247)
     *          {@see http://spservices.codeplex.com/discussions/349356}
     *
     * @param {Date} [dateObj=Date()]
     * @param {String} [formatType='local']
     *              Possible formats: local, utc
     *
     * @return {String} a date string.
     *
     */
    var getDateString = function (dateObj, formatType) {
      formatType = String(formatType || 'local').toLowerCase();
      dateObj = dateObj || new Date();
      function pad(n) {
        return n < 10 ? '0' + n : n;
      }
      var ret = '';
      if (formatType === 'utc') {
        ret = dateObj.getUTCFullYear() + '-' + pad(dateObj.getUTCMonth() + 1) + '-' + pad(dateObj.getUTCDate()) + 'T' + pad(dateObj.getUTCHours()) + ':' + pad(dateObj.getUTCMinutes()) + ':' + pad(dateObj.getUTCSeconds()) + 'Z';
      } else {
        ret = dateObj.getFullYear() + '-' + pad(dateObj.getMonth() + 1) + '-' + pad(dateObj.getDate()) + 'T' + pad(dateObj.getHours()) + ':' + pad(dateObj.getMinutes()) + ':' + pad(dateObj.getSeconds());
      }
      return ret;
    };
    //end: SPGetDateString()
    return getDateString;
  }();
  src_sputils_parseDateString = function () {
    /**
     * Parses a date string in ISO 8601 format into a Date object.
     * Date format supported on input:
     *  2013-09-01T01:00:00
     *  2013-09-01T01:00:00Z
     *  2013-09-01T01:00:00Z+05:00
     *
     * @param {String} dateString
     *      The date string to be parsed.
     *
     * @return {Date|Null}
     *      If unable to parse string, a Null value will be returned.
     *
     * @see {https://github.com/csnover/js-iso8601}
     *      Method was developed using some of the code from js-iso8601
     *      project on github by csnover.
     *
     */
    var parseDateString = function parseDateString(dateString) {
      var dtObj = null, re, dtPieces, i, j, numericKeys, minOffset;
      if (!dateString) {
        return dtObj;
      }
      // let's see if Date.parse() can do it?
      // We append 'T00:00' to the date string case it is
      // only in format YYYY-MM-DD
      dtObj = Date.parse(dateString.length === 10 ? dateString + 'T00:00' : dateString);
      if (dtObj) {
        return new Date(dtObj);
      }
      // Once we parse the date string, these locations
      // in the array must be Numbers.
      numericKeys = [
        1,
        4,
        5,
        6,
        7,
        10,
        11
      ];
      // Define regEx
      re = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
      // dtPieces:
      //    [0]
      //    [1]   YYYY
      //    [2]   MM
      //    [3]   DD
      //    [4]   HH
      //    [5]   mm
      //    [6]   ss
      //    [7]   msec
      //    [8]   Z
      //    [9]   +|-
      //    [10]  Z HH
      //    [11]  Z mm
      dtPieces = dateString.match(re);
      if (!dtPieces) {
        return dtObj;
      }
      for (i = 0, j = numericKeys.length; i < j; i++) {
        dtPieces[numericKeys[i]] = ~~dtPieces[numericKeys[i]];
      }
      // Month is "zero" based
      --dtPieces[2];
      // Date specifed UTC Format?
      if (dtPieces[8] === 'Z') {
        // do we need to calculate offset to minutes?
        if (dtPieces[9] !== undefined) {
          minOffset = dtPieces[10] * 60 + dtPieces[11];
          if (dtPieces[9] === '+') {
            minOffset = -minOffset;
          }
          dtPieces[5] += minOffset;
        }
        dtObj = new Date(Date.UTC(dtPieces[1], dtPieces[2], dtPieces[3], dtPieces[4], dtPieces[5], dtPieces[6], dtPieces[7]));  // Else: Date was did not seem to be UTC. Do local.
      } else {
        dtObj = new Date(dtPieces[1], dtPieces[2], dtPieces[3], dtPieces[4], dtPieces[5], dtPieces[6], dtPieces[7]);
      }
      return dtObj;
    };
    //end: parseDateString()
    return parseDateString;
  }();
  less_src_dateFieldWidget_dateField = undefined;
  src_dateFieldWidget_dateField = function ($, dateFieldTemplate, fillTemplate, getDateString, parseDateString, makeSameHeight) {
    var SPDate = {}, dateField;
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
      delimeter: ';',
      remainOpen: true,
      datepicker: {
        dateFormat: 'mm/dd/yy',
        buttonImage: '/_layouts/images/CALENDAR.GIF',
        showOn: 'both',
        buttonImageOnly: true
      },
      dateTemplate: '{{date}} <span class="spwidgets-item-remove">[x]</span>',
      showTimepicker: false,
      timeFormat: ' {{hour}}:{{minutes}} {{ampm}}',
      timeUTC: true,
      labelHour: 'Hour',
      labelMinutes: 'Minutes',
      labelAMPM: 'AM|PM',
      labelTime: 'Time',
      labelSet: 'Set',
      onSelect: null
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
    dateField = function dateField(containers, options) {
      var arg = Array.prototype.slice.call(arguments, 1), inputEle = containers;
      // If initialization is not yet done, then do it now
      if (!SPDate.isInitDone) {
        SPDate.isInitDone = true;
        $('body').on('click' + SPDate.evNamespace, SPDate.onPageClick);
      }
      // Process Methods
      if (typeof options === 'string') {
        return function () {
          var action = String(arg[0]).toLowerCase(), resp = inputEle;
          // Loop through all inputs and process the method
          // on it. Note that for methods that return data
          // if user defined more than one element in the
          // selection, only the data for the last item on
          // that selection will be returned.
          $(inputEle).each(function (i, thisInput) {
            if (!$(inputEle).hasClass('hasSPDateField')) {
              return;
            }
            var $this = $(thisInput), Inst = $this.data('SPDateFieldInstance');
            if (Inst && $this.length > 0) {
              switch (action) {
              //------> GET DATE METHOD: dateObj = $().SPDateField("getDate")
              case 'getdate':
                resp = Inst.getDate();
                break;
              //------> SET DATE METHOD: $().SPDateField("setDate", dates, format)
              case 'setdate':
                if (arg[1]) {
                  Inst.setDate({
                    date: arg[1],
                    format: arg[2] || Inst.opt.datepicker.dateFormat
                  });
                }
                break;
              //------> REMOVE DATE METHOD: $().SPDateField("removeDate", dates, format)
              case 'removedate':
                if (arg[1]) {
                  Inst.removeDate({
                    date: arg[1],
                    format: arg[2] || Inst.opt.datepicker.dateFormat
                  });
                }
                break;
              //------> RESET METHOD: $().SPDateField("reset")
              case 'reset':
                Inst.reset();
                break;
              //------> DESTROY METHOD: $().SPDateField("destroy")
              case 'destroy':
                Inst.destroy();
                break;
              }  //end: switch()
            }
          });
          return resp;
        }();
      }
      //end: Method? ---------------------------
      // BUILD the widget on each input element
      // provided by the user's selection
      return containers.each(function () {
        /**
        * @class SPDate
        */
        var Inst = {
          /** @property {jQuery} The input element used by the user */
          $ele: $(this).addClass('hasSPDateField'),
          /** @property {Boolean} Is this an inline binding? */
          isInline: false,
          /** @property {jQuery} the inline container that was given by the user */
          inlineCntr: null
        };
        // If not an input text field, then check if it is a non-input element,
        // which will cause this widget to be inserted inline always visible
        // widget.
        if (!Inst.$ele.is('input[type=\'text\']')) {
          if (!Inst.$ele.is(':input')) {
            Inst.isInline = true;
            Inst.inlineCntr = $(this);
            Inst.$ele = $('<input name="spdatefieldinline" value="" type="text" style="display:none" />');
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
        Inst.$ui = $(dateFieldTemplate).filter('div.spwidget-date-cntr').clone();
        if (Inst.isInline) {
          Inst.$ui.appendTo(Inst.inlineCntr).addClass('spwidget-inline').css('display', 'none');
          Inst.$ele.appendTo(Inst.$ui);
        } else {
          Inst.$ui.insertAfter(Inst.$ele).css('display', 'none');
        }
        /**
         * @property {String} The original value in the input
         * @member Inst
         * @memberOf Inst
         */
        Inst.eleOrigVal = Inst.$ele.val();
        Inst.$ele.val('');
        /**
         * @property {jQuery} the Datepicker input field.
         * @member Inst
         * @memberOf Inst
         */
        Inst.$input = Inst.$ui.find('input[name=\'SPDateFieldInput\']').val(Inst.$ele.val());
        /** @property {jQuery} the jQuery datepicker input container */
        Inst.$inputCntr = Inst.$input.closest('.spwidget-date-input-cntr');
        /**
         * @property {jQuery} The container used to display date when allowMuliples is true.
         * @member Inst
         * @memberOf Inst
         */
        Inst.$dtCntr = Inst.$ui.find('div.spwidget-date-selected-cntr');
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
        Inst.getDate = function () {
          var dtObj = {
            input: Inst.$ele.val(),
            dates: []
          };
          if (dtObj.input) {
            if (Inst.opt.allowMultiples) {
              dtObj.dates = dtObj.input.split(Inst.opt.delimeter);
            } else {
              dtObj.dates.push(dtObj.input);
            }
          }
          return dtObj;
        };
        //end: Inst.getDate()
        /**
         * Resets the widget to its initial state, which could have
         * had a prepopluated value on it.
         *
         * @return {Object} Inst
         */
        Inst.reset = function () {
          Inst.$input.val('').datepicker('hide');
          Inst.$ele.val('').change();
          Inst.$dtCntr.empty();
          return Inst;
        };
        //end: Inst.reset()
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
        Inst.setDate = function (setDateOpt) {
          var opt = $.extend({}, {
              date: '',
              time: '',
              format: Inst.opt.datepicker.dateFormat,
              setDatepicker: true,
              triggerEvent: true
            }, setDateOpt), eleVal = Inst.$ele.val(), dtShow = '', dtShowObj;
          if (!opt.date) {
            return Inst;
          }
          if (!$.isArray(opt.date)) {
            opt.date = [opt.date];
          }
          // Loop through each date and create the string that will be used
          // to set the date on the widget.
          $.each(opt.date, function (i, dt) {
            var dtObj = dt, dt1 = '', dt2 = '';
            // If this date object is not an instance of Date, then
            // parse it into a Date object.
            // If the string has a T on it, then we assume that it is
            // an ISO 8601 compliant string and use the parseDateString
            // to get a Date object.
            // Else, it could be a date in the format defined by the datepicker
            // date format param.
            if (!(dtObj instanceof Date)) {
              dtObj = String(dtObj);
              if (dtObj.indexOf('T') > -1) {
                dtObj = parseDateString(dtObj);
              } else {
                try {
                  dtObj = $.datepicker.parseDate(opt.format, dt);
                } catch (e) {
                  return Inst;
                }
              }
            }
            dtShowObj = dtObj;
            dt1 = $.datepicker.formatDate('yy-mm-dd', dtObj);
            dt2 = $.datepicker.formatDate(Inst.opt.datepicker.dateFormat, dtObj);
            if (Inst.opt.showTimepicker) {
              dt1 = getDateString(dtObj, Inst.opt._timeFmt);
              dt2 += Inst.$timepicker.formatTime(dtObj);
            }
            // AllowMultiples = false
            if (!Inst.opt.allowMultiples) {
              eleVal = dt1;
              dtShow = dt2;  // allowMultiples = true and date not yet stored
            } else if (eleVal.indexOf(dt1) < 0) {
              if (eleVal) {
                eleVal += Inst.opt.delimeter;
              }
              eleVal += dt1;
              dtShow += '<span class="spwidgets-item" data-spwidget_dt1="' + dt1 + '" data-spwidget_dt2="' + dt2 + '">' + fillTemplate({
                tmplt: Inst.opt.dateTemplate,
                data: { date: dt2 }
              }) + ' </span>';
            }
          });
          //end: each
          // If allow multiple is true, then set teh multiple dates
          // on the display area. Then set the input value and trigger
          // change event
          if (Inst.opt.allowMultiples) {
            Inst.$dtCntr.append(dtShow);  // else, should we set the date picker widget
          } else if (opt.setDatepicker) {
            Inst.$input.val(dtShow);
            if (Inst.isInline && !Inst.opt.showTimepicker) {
              Inst.$inputCntr.datepicker('setDate', dtShowObj);
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
              Inst.opt.onSelect.call(Inst.isInline ? Inst.inlineCntr : Inst.$ele);
            }
          }
          return Inst;
        };
        //end: Inst.setDate()
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
        Inst.removeDate = function (removeDateOpt) {
          var opt = $.extend({}, {
              date: '',
              format: Inst.opt.datepicker.dateFormat
            }, removeDateOpt), eleDtObj = Inst.getDate();
          if (!opt.date) {
            return Inst;
          }
          if (!$.isArray(opt.date)) {
            opt.date = [opt.date];
          }
          $.each(opt.date, function (i, dt) {
            var dtObj = dt, dt1 = '', dt1Regex = '';
            if (!(dtObj instanceof Date)) {
              try {
                dtObj = $.datepicker.parseDate(opt.format, dt);
              } catch (e) {
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
            dt1Regex = new RegExp('(' + Inst.opt.delimeter + ')?' + dt1, 'g');
            eleDtObj.input = eleDtObj.input.replace(dt1Regex, '');
            if (Inst.opt.allowMultiples) {
              Inst.$dtCntr.find('span[data-spwidget_dt1=\'' + dt1 + '\']').remove();
            }
          });
          // Set the value on bound input.
          // Clean up the new string (misc. delimeteres at begining or
          // end of string), set it to the input field and trigger event.
          eleDtObj.input = eleDtObj.input.replace(new RegExp('^' + Inst.opt.delimeter), '').replace(new RegExp(Inst.opt.delimeter + '$'), '');
          Inst.$ele.val(eleDtObj.input).change();
          return Inst;
        };
        //end: Inst.removeDate()
        /**
         * Removes the widget from the page and makes the original
         * Element visible
         */
        Inst.destroy = function () {
          Inst.$ele.removeData('SPDateFieldInstance');
          Inst.$ele.removeClass('hasSPDateField').css('display', '');
          Inst.$ui.css('display', 'none');
          Inst.$input.datepicker('hide');
          Inst.$input.datepicker('destroy');
          if (Inst.$timepicker) {
            Inst.$timepicker.$timePicker.off('.spdatefield');
            Inst.$input.off('.spdatefield');
          }
          if (Inst.isInline) {
            Inst.inlineCntr.removeClass('hasSPDateField').removeData('SPDateFieldInstance');
          }
          Inst.$ui.remove();
        };
        //end: Inst.destroy()
        /**
         * Creates the date picker on this field. Depending on the
         * input options, this could be a strait jQuery UI datepicker
         * or a customized picker that allows selection of time as well.
         *
         * @return {Object} Date time Picker (if showTimepicker is true)
         */
        Inst.createDatePicker = function () {
          var wdg = {};
          // If showTimepicker is true, then lets build our own
          // date and time picker, which wraps jQuery datepicker.
          if (Inst.opt.showTimepicker) {
            wdg.$selectorCntr = $(dateFieldTemplate).filter('div.spwidget-datetime-selector').clone().appendTo(Inst.$inputCntr).css('display', 'none');
            wdg.$datePicker = wdg.$selectorCntr.find('div.spwidget-date-selector');
            wdg.$timePicker = wdg.$selectorCntr.find('div.spwidget-time-selector');
            wdg.$setButton = wdg.$selectorCntr.find('div.spwidget-btn-set');
            wdg.$hourSelect = wdg.$timePicker.find('select.spwidget-hour');
            wdg.$minSelect = wdg.$timePicker.find('select.spwidget-min');
            wdg.$ampmSelect = wdg.$timePicker.find('select.spwidget-ampm');
            wdg.heightDone = false;
            wdg.firstShowDone = false;
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
            wdg.getTime = function () {
              var time = {
                hour: wdg.$hourSelect.val(),
                minutes: wdg.$minSelect.val(),
                ampm: wdg.$ampmSelect.val()
              };
              time.hour24 = time.hour;
              if (time.ampm === 'PM' && time.hour !== '12') {
                time.hour24 = String(parseInt(time.hour) + 12);
              } else if (time.ampm === 'AM' && time.hour === '12') {
                time.hour24 = '0';
              }
              return time;
            };
            //end: wdg.getTime()
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
            wdg.formatTime = function (time) {
              var timeObj = time, timeFormated = '';
              if (time instanceof Date) {
                timeObj = {
                  hour: time.getHours(),
                  hour24: String(time.getHours()),
                  minutes: String(time.getMinutes()),
                  ampm: 'AM'
                };
                if (timeObj.hour > 12) {
                  timeObj.hour = String(timeObj.hour - 12);
                  timeObj.ampm = 'PM';
                } else if (timeObj.hour === 12) {
                  timeObj.ampm = 'PM';
                }
                timeObj.hour = String(timeObj.hour);
                if (timeObj.hour === '0') {
                  timeObj.hour = '12';
                }
                if (String(timeObj.minutes).length < 2) {
                  timeObj.minutes = '0' + timeObj.minutes;
                }
              } else if (!time) {
                timeObj = wdg.getTime();
              }
              timeFormated = fillTemplate(Inst.opt.timeFormat, timeObj);
              return timeFormated;
            };
            //end: wdg.formatTime()
            /**
             * Updates the widget date/time with what's currently selected.
             * If no date is selected, Today will be used.
             *
             * @return {undefined}
             */
            wdg.setDateTime = function (dtObj) {
              var time = wdg.getTime();
              // If dtObj is not a Date object, then create it now.
              // First try to get it from the Datepicker... If thats
              // Null (not yet selected by user), then just create a
              // default Date.
              if (!(dtObj instanceof Date)) {
                dtObj = wdg.$datePicker.datepicker('getDate');
                if (dtObj === null) {
                  dtObj = new Date();
                }
              }
              // Add time elements to date object
              dtObj.setHours(time.hour24);
              dtObj.setMinutes(time.minutes);
              Inst.setDate({
                date: dtObj,
                format: Inst.opt.datepicker.dateFormat,
                setDatepicker: true
              });
              // If allowMultiples or isInline is true, then the
              // "set" button is visible. Need to make sure we call
              // any user defined callback to jQuery-UI's 'select'
              // option
              wdg.execUsersCallback(Inst.$input.val());
              return;
            };
            //end: wdg.setDateTime()
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
            wdg.updateDateTimeWidgets = function (newDate) {
              var dtObj = newDate, tmpVal;
              if (!(dtObj instanceof Date)) {
                dtObj = new Date();
              }
              // Set hours
              tmpVal = dtObj.getHours();
              if (tmpVal === 0) {
                tmpVal = '12';
              } else if (tmpVal > 12) {
                tmpVal = tmpVal - 12;
              }
              wdg.$hourSelect.val(tmpVal);
              // Set Minutes
              tmpVal = dtObj.getMinutes();
              while (tmpVal % 5) {
                --tmpVal;
              }
              if (tmpVal < 10) {
                tmpVal = '0' + tmpVal;
              }
              wdg.$minSelect.val(tmpVal);
              // set PM/AM
              if (dtObj.getHours() > 11) {
                wdg.$ampmSelect.val('PM');
              } else {
                wdg.$ampmSelect.val('AM');
              }
              wdg.$datePicker.datepicker('setDate', dtObj);
            };
            //end: wdg.updateDateTimeWidgets()
            /**
             * Makes the Time picker visible on the page.
             *
             * @return {undefined}
             */
            wdg.showPicker = function () {
              wdg.$selectorCntr.show(function () {
                var currentDate;
                if (!wdg.heightDone) {
                  wdg.heightDone = true;
                  makeSameHeight(wdg.$datePicker.find('div.ui-datepicker-inline').add(wdg.$timePicker));
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
                    currentDate = parseDateString(currentDate.dates[currentDate.dates.length - 1]);
                  } else {
                    currentDate = new Date();
                  }
                  // FIXME: Replace code below with call to new method.
                  wdg.updateDateTimeWidgets(currentDate);
                }  //end: if(): pre-set the picker values
              }).position({
                my: 'left top',
                at: 'left bottom',
                of: Inst.$input
              });
              return;
            };
            //end: wdg.showPicker()
            /**
             * Executes the user's callback to jQuery-UI's datepicker
             * 'onSelect' option, if one was defined.
             *
             * @param {String} dateText
             * @param {Object} dtPickerObj
             *
             */
            wdg.execUsersCallback = function (dateText, dtPickerObj) {
              // Call the user defined onSelect if one was defined.
              if ($.isFunction(Inst.opt.datepicker._onSelect)) {
                Inst.opt.datepicker._onSelect.call(wdg.$datePicker, dateText, dtPickerObj);
              }
            };
            //end: wdg.execUsersCallback()
            /* ------------------------------------------------------ */
            /* ------------------------------------------------------ */
            // Remove alt field updates from datepicker. We'll handle it
            // with the time picker
            Inst.opt.datepicker.altFormat = '';
            Inst.opt.datepicker.altField = '';
            // If user set the icon option in the Datepicker, then need
            // to build it manually
            if (Inst.opt.datepicker.buttonImage && !Inst.isInline) {
              $('<img class="ui-datepicker-trigger" src="' + Inst.opt.datepicker.buttonImage + '" alt="..." title="...">').appendTo(Inst.$inputCntr).on('click' + SPDate.evNamespace, function () {
                wdg.showPicker();
              });
            }
            // If allowMultiples or isInline is true, then make set button visible
            if (Inst.opt.allowMultiples || Inst.isInline) {
              wdg.$selectorCntr.addClass('spwidget-date-multiples-cntr');
              wdg.$setButton.find('div.spwidget-btn').button({ label: Inst.opt.labelSet }).on('click' + SPDate.evNamespace, function () {
                wdg.setDateTime();
                return this;
              });
            }
            // Apply the Labels for the time picker for this instance
            wdg.$timePicker.find('div.ui-widget-header').html(Inst.opt.labelTime).end().find('div.spwidget-time-hour > label').html(Inst.opt.labelHour).end().find('div.spwidget-time-min > label').html(Inst.opt.labelMinutes).end().find('div.spwidget-time-ampm > label').html(Inst.opt.labelAMPM).end();
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
            Inst.opt.datepicker.onSelect = function (dateText, dtPicker) {
              // If allowMultiples is true, then exit if
              // this click is not the SET button
              if (Inst.opt.allowMultiples || Inst.isInline) {
                return this;
              }
              var newDate = new Date(dtPicker.currentYear, dtPicker.currentMonth, dtPicker.currentDay);
              wdg.setDateTime(newDate);
            };
            // Create datepicker widget using jquery ui
            wdg.$datePicker.datepicker(Inst.opt.datepicker);
            // Setup listeners on the time selectors so that we can trigger
            // an update to the widget.
            wdg.$timePicker.on('change' + SPDate.evNamespace + ' keyup' + SPDate.evNamespace, 'select', function (ev) {
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
            if (Inst.isInline) {
              Inst.$input.css('display', 'none');
              wdg.$selectorCntr.addClass('spwidget-inline').css('display', '');
            }
            // now that we have the datepicker setup, if we're
            // NOT 'inline' mode, then add listeners to then
            // input field so that the date and time picker is shown.
            if (!Inst.isInline) {
              Inst.$input.on('focus' + SPDate.evNamespace, function () {
                wdg.showPicker();
              });
            }  /////////////////////////////////////////////////////
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
            Inst.opt.datepicker.onSelect = function (dateText, dtPicker) {
              Inst.setDate({
                date: dateText,
                format: dtPicker.settings.dateFormat,
                setDatepicker: false
              });
              // Call the user defined onSelect if one was defined.
              if ($.isFunction(Inst.opt.datepicker._onSelect)) {
                Inst.opt.datepicker._onSelect.call(this, dateText, dtPicker);
              }
              // If allow multiples is true, then clear out date picker input
              if (Inst.opt.allowMultiples) {
                Inst.$input.val('');
              }
              if (Inst.opt.allowMultiples && Inst.opt.remainOpen && !Inst.isInline) {
                setTimeout(function () {
                  Inst.$input.datepicker('show');
                }, 5);
              }
            };
            // If inline is true, the initiate the datepicker on the
            // DIV container and hide the input... Else, just initiate
            // the Datepicker on the input field.
            if (Inst.isInline) {
              Inst.$inputCntr.datepicker(Inst.opt.datepicker);
              Inst.$input.css('display', 'none');
            } else {
              Inst.$input.datepicker(Inst.opt.datepicker);
            }
          }
          return wdg;
        };
        //end: createDatePicker()
        //------------------------------------------------------
        //-----------    INITIATE THIS INSTANCE    -------------
        //------------------------------------------------------
        // Define time string format (local or utc)
        // param that is used with getDateString
        Inst.opt._timeFmt = Inst.opt.timeUTC ? 'utc' : 'local';
        // Setup the datepicker options
        // TODO: should we allow the user to manipulate this?
        Inst.opt.datepicker.altFormat = 'yy-mm-dd';
        Inst.opt.datepicker.altField = Inst.$ele;
        // If allowMultiples is true, then set special processing for storing
        // multiple dates - both on display and in the input field.
        if (Inst.opt.allowMultiples) {
          Inst.opt.datepicker.altFormat = '';
          Inst.opt.datepicker.altField = '';
          // Setup listener for removing selected dates.
          Inst.$dtCntr.css('display', '').on('click', '.spwidgets-item-remove', function (ev) {
            var $dtItem = $(ev.target).closest('.spwidgets-item'), date = $dtItem.data('spwidget_dt1');
            // If allowMultiples is true, then convert the date string
            // to a date object
            if (Inst.opt.allowMultiples) {
              date = parseDateString(date);
            }
            Inst.removeDate({
              date: date,
              format: 'yy-mm-dd'
            });
          });
        }
        //end: if(): allowMultiples
        // Hide the input used by the caller and display our datepicker input.
        Inst.$ele.css('display', 'none').data('SPDateFieldInstance', Inst);
        if (Inst.isInline) {
          Inst.inlineCntr.data('SPDateFieldInstance', Inst);
        }
        // $timepicker holds only the setup (wdg) for the date+time picker
        // for the Datepicker only, use Inst.$input
        Inst.$timepicker = Inst.createDatePicker();
        // If input field already has some date, then prepopulate the widget
        if (Inst.eleOrigVal) {
          Inst.setDate({
            date: Inst.eleOrigVal.split(Inst.opt.delimeter),
            format: 'yy-mm-dd',
            triggerEvent: false
          });
        }
        // On date change, trigger event on original
        // element and cancel this one
        Inst.$input.on('change', function (ev) {
          ev.stopPropagation();
          Inst.$ele.change();
        });
        Inst.$ui.css('display', '');
        return this;
      });  //end: return.each()
    };
    //end: $.fn.SPDateField()
    /**
     * When user clicks on the page, this method will close the
     * Timepicker if it is open.
     *
     * @param {jQuery.Event}
     *
     * @return {Object} this
     */
    SPDate.onPageClick = function (ev) {
      var $ele = $(ev.target), $allSelectors = $('div.spwidget-datetime-selector:visible:not(\'.spwidget-inline\')'), $clickArea = null;
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
        $clickArea = $ele.closest('div.spwidget-datetime-selector');
        if (!$clickArea.length && $ele.is('input.spwidget-date-datepicker,.ui-datepicker-trigger')) {
          $clickArea = $ele.parent().find('div.spwidget-datetime-selector');
        }
        $allSelectors.not($clickArea).hide();
      }
      return this;
    };
    //end: SPDate.onPageClick()
    dateField.defaults = SPDate.defaults;
    return dateField;
  }(jquery, text_src_dateFieldWidget_dateFieldhtml, src_sputils_fillTemplate, src_sputils_getDateString, src_sputils_parseDateString, src_uiutils_makeSameHeight);
  text_src_lookupFieldWidget_lookupFieldhtml = '<div> <div class="spwidgets-lookup-cntr"> <div class="spwidget-lookup"> <div class="spwidgets-lookup-selected" style="display:none"> </div> <div class="spwidgets-lookup-input"> <label>Add</label> <input type="text" name="spwidgetLookupInput"> <span class="spwidget-lookup-selector-showhide" title="Browse">Browse</span> <div class="spwidget-lookup-selector-cntr ui-widget-content"> <div class="ui-state-default"> <button type="button" name="close" title="Close">Close</button> </div> <div class="spwidget-lookup-selector-item-cntr"></div> </div> </div> </div> </div> </div>';
  src_sputils_getCamlLogical = function ($) {
    /**
     * Given an array of CAML matches, this method will wrap them all in a
     * Logical condition (<And></And> or a <Or></Or>).
     *
     * @param {Object}  options
     *              Options for the call. See below.
     * @param {String}  options.type
     *              Static String. The type of logical condition that
     *              the 'values' should be wrapped in. Possible values
     *              are 'AND' or 'OR'.  Default is 'AND'.
     * @param {Array options.values
     *              The array of String elements that will be
     *              join into caml Logical condition.
     * @param {Function} [options.onEachValue=null]
     *              A function to process each items in the 'values'
     *              array. Function must return the value that should
     *              be used instead of the one found in the array. Use
     *              it to define the xml around each value
     *              (ex. <Eq><FieldRef>...</Eq>).
     *              Function is given 1 input param - the item currently
     *              being processed (from the 'values' input param).
     *
     * @return {String} logical Query as a single string.
     *
     * @example Create a OR statement from an array of conditions
     *
     *   getCamlLogical({
     *        type: "or",
     *        values: [
     *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test</Value></Eq>",
     *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test1</Value></Eq>",
     *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test2</Value></Eq>",
     *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test3</Value></Eq>",
     *           "<Eq><FieldRef Name='Title' /><Value Type='Text'>Test4</Value></Eq>"
     *        ]
     *      })
     *
     *
     * @example Concatenate multiple calls to getCamlLogical():
     *
     *     getCamlLogical({
     *        type: "or",
     *        values: [
     *           "<Eq><FieldRef Name='ID' /><Value Type='Text'>10</Value></Eq>",
     *           "<Eq><FieldRef Name='ID' /><Value Type='Text'>15</Value></Eq>",
     *           getCamlLogical({
     *              type: "and",
     *              values: [
     *                 "west",
     *                 "east"
     *              ],
     *              onEachValue: function(loc){
     *                 return "<Neq><FieldRef Name='Region'/><Value Type='Text'>" +
     *                         loc + "</Value></Neq>";
     *              }
     *          })
     *        ]
     *      })
     *
     */
    var getCamlLogical = function getCamlLogical(options) {
      var o = $.extend({}, {
          type: 'AND',
          values: [],
          onEachValue: null
        }, options), tagOpen = '<And>', tagClose = '</And>', logical = '', total = 0, last = 0, haveFn = false, newLogical = '', totalBuilt = 0, i;
      o.type = String(o.type).toUpperCase();
      if (!$.isArray(o.values)) {
        o.values = [o.values];
      }
      if (o.type !== 'AND') {
        tagOpen = '<Or>';
        tagClose = '</Or>';
      }
      // logical = tagOpen;
      total = o.values.length;
      last = total - 1;
      haveFn = $.isFunction(o.onEachValue);
      // Loop through all query logical strings and build
      // the overall filter logical
      for (i = 0; i < total; i++) {
        newLogical = '';
        if (haveFn) {
          newLogical += String(o.onEachValue(o.values[i])).toString();
        } else {
          newLogical += String(o.values[i]).toString();
        }
        if (newLogical) {
          logical += newLogical;
          totalBuilt++;
          // If the total number of items is >2, then build the rest
          // of the logicals by calling this method again with the
          // remainder of the filters as input.
          if (last - i > 1) {
            newLogical = getCamlLogical($.extend({}, o, { values: o.values.slice(i + 1, total - i) }));
            // If building the remainder of the filter returned
            // something, then add it to the list and incrment the
            // number of logicals built.
            if (newLogical) {
              totalBuilt++;
              logical += newLogical;
            }
            // Break out of this loop, even if there are other
            // items... The call above will take care of the others
            break;
          }
        }
      }
      if (totalBuilt > 1) {
        logical = tagOpen + logical + tagClose;
      }
      return logical;
    };
    // getCamlLogical()
    return getCamlLogical;
  }(jquery);
  src_sputils_parseLookupFieldValue = function () {
    /**
     * Parses a Sharepoint lookup values as returned by webservices
     * (id;#title;#id;#Title) into an array of objects.
     *
     * @param {String} v
     *          Lookup items string as returned by SP webservices.
     *
     * @return {Array}
     *          Array of objects. Each object has two keys; title and id
     *
     * @example
     *
     * parseLookupFieldValue("1;#item one title;#2;#item two title");
     * // Returns:
     * [
     *      {
     *          id: "1",
     *          title: "item one title"
     *      },
     *      {
     *          id: "2",
     *          title: "item two title"
     *      }
     * ]
     */
    var parseLookupFieldValue = function (v) {
      var r = [], a = String(v).split(';#'), total = a.length, i, n, t;
      if (v === undefined) {
        return r;
      }
      for (i = 0; i < total; i++) {
        n = a[i];
        i++;
        t = a[i];
        if (n || t) {
          r.push({
            id: n,
            title: t
          });
        }
      }
      return r;
    };
    //end: parseLookupFieldValue
    return parseLookupFieldValue;
  }();
  src_sputils_xmlEscape = function () {
    /**
     * HTML and XML escaping routines
     * @namespace xmlEscape
     */
    var exports = /** @lends xmlEscape */
    {
      /**
       * Escapes html code. Characters that are escaped include
       * <, > and &. These are converted to the HTML safe
       * characters.  This method can also be used to escape XML.
       *
       * @param {Object} xmlString
       *          The html code to be escaped.
       *
       * @return {String}
       *          html escaped
       *
       */
      escape: function escapeXML(xmlString) {
        if (typeof xmlString !== 'string') {
          return '';
        }
        return xmlString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/"/g, '&quot;');
      },
      /**
       * Un-escapes html code. Characters that are un-escaped include
       * "&lt;", "&gt;" "&apos;", "&quot;" and "&amp;". These are
       * converted to <, >, ', " and &
       *
       * @param {Object} xmlString
       *          The html code to be un-escaped.
       *
       * @return {String}
       *          html string escaped.
       *
       */
      unescape: function (xmlString) {
        if (typeof xmlString !== 'string') {
          return '';
        }
        return xmlString.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&apos;/g, '\'').replace(/&quot;/g, '"');
      }
    };
    return exports;
  }();
  less_src_lookupFieldWidget_lookupField = undefined;
  src_lookupFieldWidget_lookupField = function ($, lookupFieldTemplate, getListItems, fillTemplate, getCamlLogical, getNodesFromXml, parseLookupFieldValue, xmlEscape) {
    /**
     * Widget that turn an input field into a lookup field. The
     * field will store only the ID's (one or more) for the items
     * that the user picks.
     * THe user, however, is presented with the existing items
     * and has the ability to Remove them and add new ones.
     *
     * BUILD: _BUILD_VERSION_DATE_
     *
     */
    /**
     * Namespace for pickSPUser specific methods.
     * @name        Lookup
     * @class       Namespace for lookup Field plugin
     */
    var Lookup = { _isLookupbodyEventDone: false }, lookupField;
    // Default options
    Lookup.defaults = {
      list: '',
      allowMultiples: true,
      inputLabel: '',
      inputPlaceholder: 'Type and Pick',
      readOnly: false,
      exactMatch: true,
      uiContainer: null,
      selectFields: ['Title'],
      filter: '',
      filterFields: ['Title'],
      filterOrderBy: '',
      template: '<div>{{Title}} <span class="spwidgets-item-remove">[x]</span></div>',
      listTemplate: '{{Title}}',
      listHeight: 0,
      onItemAdd: null,
      onItemRemove: null,
      onReady: null,
      msgNoItems: '',
      maxResults: 50,
      minLength: 2,
      hideInput: true,
      padDelimeter: false,
      showSelector: false
    };
    /**
     *
     * Converts the selection into a Sharepoint Lookup Field.
     *
     * @param {HTMLElement|jQuery|selector} containers
     *      Containers that will receive the lookupField
     *
     * @param {Object} options
     *
     * @param {String} options.list
     *              List name from where lookup will be done.
     *
     * @param {Boolean} [options.allowMultiples=true]
     *              Set to false if wanting only 1 item to be referenced.
     *
     * @param {String} [options.inputLabel=""]
     *              The label for the input field.
     *
     * @param {String} [options.inputPlaceholder="Type and Pick"]
     *              The value to be used in the Input Field placeholder
     *              attribute (HTML5 attribute)
     *
     * @param {Boolean} [options.exactMatch=true]
     *              If set to false, then the text entered by the user will
     *              be parsed into individual keywords and a search will be
     *              done on those instead.
     *
     * @param {Boolean} [options.readOnly=false]
     *              If true, field is displayed as readonly.
     *
     * @param {Selector|Object} [options.uiContainer=null]
     *              The container where the UI widget should be inserted.
     *              Default is directly after the input field
     *
     * @param {Array} options.selectFields=["Title"]
     *              Array of field names (internal names) that should be
     *              returned. ID is also used when the input value by the
     *              user is an integer.
     *
     * @param {String} [options.filter=""]
     *              Any additional filter criteria (in CAML format) to be
     *              added to the query when retrieving the Lookup values
     *              from the list.
     *              Example:
     *                  <Contains>
     *                      <FieldRef Name="Title" />
     *                      <Value Type="Text">New</Value>
     *                  </Contains>
     *
     * @param {String} [options.filterOrderBy='']
     *              The OrderBy (sort) CAML string used when retrieving values
     *              from the List.
     *              Example:
     *                  <OrderBy>
     *                      <FieldRef Name="Title" Ascending="TRUE"/>
     *                  </OrderBy>
     *
     * @param {Array} [options.filterFields=["Title"]]
     *              Array of fields name (internal names) that will be used
     *              to filter data against.
     *              Example:
     *                  options.filterFields=[
     *                      "Title",
     *                      "Description",
     *                      "Notes"
     *                  ]
     *
     * @param {String} [options.template="..."]
     *              The template to be used for displaying the item once selected.
     *              Use the following format for item Field placeholders
     *              {{fieldInternalName}}. When defining HTML, an element containing
     *              a call of 'spwidgets-item-remove' will be used to remove the item
     *              from the selected list.
     *              Example:
     *                  options.template='<div>{{Title}} [<span class="spwidgets-item-remove">x</span>]</div>',
     *
     * @param {String} [options.listTemplate="..."]
     *              The template to be used for displaying the items displayed as
     *              suggestion (autocomplete values).
     *              Use the following format for item Field placeholders
     *              {{fieldInternalName}}. Example: {{Title}}
     *
     * @param {Number} [options.listHeight=0]
     *              The height to be set on the Autocomplete suggesion box.
     *              Use this value when there is a chance for allot of values
     *              to be returned on a query.
     *
     * @param {Boolean} [options.padDelimeter=false]
     *              If true, then an extra delimeter (;#) will be inserted at
     *              the begining of the stored value.
     *              Example: ;#;#5;#  (normal would be: 5;#)
     *
     * @param {Function} [options.onReady=null]
     *              Triggered after the LookupField has been setup. This is
     *              triggered either after completing the UI setup, or if the
     *              field already had pre-defined values, after retrieving that
     *              data and displaying it.
     *              Function will be given a scope of the original selector
     *              (the field) as well as the following input params:
     *              1) widget container (jQuery)
     *              Example:
     *                  onReady: function(widgetCntr){
     *                      //this=original selector to where the widget was bound
     *                  }
     *
     * @param {Function} [options.onItemAdd=null]
     *              Function that will be called when adding a new item reference
     *              to the list of currently picked item. This method could, if
     *              necessary remove the new item from the UI (ex. due to some
     *              custom validation rule).
     *              The function will be given a scope of the bound area (the
     *              input field) as well as two input parameters:
     *              1) A jQuery object representing the new item
     *              on the UI and
     *              2) An object with the item's information
     *              Example:
     *                  onItemAdd: function($newItemSelection, itemObject, widgetCntr){
     *                      //this=original selector to where the widget was bound
     *                  }
     *
     * @param {Function} [options.onItemRemove=null]
     *              Function that is called when items are removed. Return Boolean
     *              false will cancel the removal of the items.
     *              Function is given the list of items on the UI, an array of
     *              objects that represent the row data structure (as retrieved from
     *              SP) and the Widget container on the page
     *              Example:
     *                  onItemRemove: function($items, itemObjects, $widgetCntr ){
     *                          //this=bound element
     *                      }
     *
     * @param {String} [options.msgNoItems=""]
     *              Message to be displayed when no items are selected. Set this
     *              to null/blank if wanting nothing to be displayed, which will
     *              result in only the input selection field being displayed.
     *
     * @param {Integer} [options.maxResults=50]
     *              Max number of results to be returned as the user types the filter
     *
     * @param {Integer} [options.minLength=2]
     *              The minimum length before the autocomplete search is triggered.
     *
     * @param {Boolean} [options.hideInput=true]
     *              Option used only when allowMultiples is false. It will hide
     *              the input field once a value has been selected. Only way to
     *              get it displayed again is to remove existing selected item.
     *
     * @param {Boolean} [options.hideInput=false]
     *              If true, then an icon will be displayed to the right of the
     *              selection input field that displays a popup displaysing all
     *              values currently in the lookup List.
     *
     *
     * @return {jQuery} Selection
     *
     *
     *
     * Methods:
     *
     * jQuery(ele).SPLookupField("method", <action>, <options>)
     *
     * clear    Clears all items currently reference.
     *          Usage:
     *              $(ele).SPLookupField("method", "clear"); // clears all
     *              $(ele).SPLookupField("method", "clear", 5); // clear ID=5
     *              $(ele).SPLookupField("method", "clear", [5, 123455]); // clear ID=5 and 123455
     *
     *
     * add      Adds a lookup value to the widget. (does not clear existing)
     *          Usage:
     *              $(ele).SPLookupField("method", "add", "45;#test;#234;#test 2")
     *
     *
     */
    lookupField = function (containers, options) {
      // Store the arguments given to this function. Used later if the
      // user is trying to execute a method of this plugin.
      var arg = Array.prototype.slice.call(arguments, 1);
      // Initiate each selection as a Lookup element
      return containers.each(function () {
        var ele = $(this), o;
        // TODO: may need to change code below if going to bind to other types of fields (like select)
        // FIXME: when allowing textarea, need to ensure that its definition is textonly (no HTML)
        if (!ele.is('input') && !ele.is('textarea') || ele.hasClass('hasLookupSPField')) {
          // if the first argument is a string, and this is an input
          // field, then process methods
          if (typeof options === 'string' && ele.is('input')) {
            o = ele.data('SPWidgetLookupFieldUI').data('SPWidgetLookupFieldOpt');
            // METHOD
            if (options.toLowerCase() === 'method') {
              var cmd = String(arg[1] || '').toLowerCase();
              var cmdOpt = arg[2];
              // ====> ACTION: clear
              if (cmd === 'clear') {
                if (!$.isArray(cmdOpt)) {
                  if (cmdOpt) {
                    cmdOpt = [cmdOpt];
                  } else {
                    cmdOpt = [];
                  }
                }
                // If we have no ID, then blank them all out.
                if (!cmdOpt.length) {
                  Lookup.removeItem(o, o._selectedItemsCntr.find('div.spwidgets-item'));  // Else, we must have an id defined. Parse that
                                                                                          // and remove only those items.
                } else {
                  (function () {
                    // find all the ID's in the UI
                    var $rmItems = $();
                    $.each(cmdOpt, function (i, id) {
                      $rmItems = $rmItems.add(o._selectedItemsCntr.find('div.spwidgets-item-id-' + id));
                    });
                    // Remove them.
                    Lookup.removeItem(o, $rmItems);
                  }());
                }  // ====> ACTION: add
              } else if (cmd === 'add') {
                Lookup.addItem(o, cmdOpt);
              }
            }  //end: options === method
          }
          // Exit
          return this;
        }
        //-------------------------------------
        // CREATE THE WIDGET ON THE PAGE.
        //-------------------------------------
        // Options for this element
        o = $.extend({}, Lookup.defaults, options, { _ele: ele.css('display', 'none').addClass('hasLookupSPField') });
        /**
         * Displays items selected by the user on the UI and updates
         * the original input element if necessary.
         *
         * @params {Array|Object} items
         *          An object or array of objects with the rows
         *          to be shown as slected. Object contains the row
         *          metadata as retrieved from Sharepoint and used on
         *          the autocomplete widget
         * @params {Boolean} [doNotStoreIds=false]
         *          If true, then the IDs of the items that will be
         *          shown as selected will not be added to the input
         *          field. Good for when initially displaying data
         *          that is defined in the intput field
         *          (ex. when the widget is first bound)
         *
         */
        o.showSelectedItems = function (items, doNotStoreIds) {
          var itemCntr = o._selectedItemsCntr.css('display', ''), itemList = [], wasUpdated = false;
          // If this is the first item, empty container
          if (!itemCntr.find('div.spwidgets-item').length || o.allowMultiples === false) {
            itemCntr.empty();
          }
          // If input is an array, then use that to iterate over.
          if ($.isArray(items)) {
            itemList = items;  // Else, the input must not be an array (assume single object)
                               // Add it as an item in the defiend array.
          } else {
            itemList.push(items);
          }
          // Loop through each item to be shown as selected
          $.each(itemList, function (i, item) {
            // If this item is not yet displayed, then add it now
            if (!itemCntr.find('div.spwidgets-item-id-' + item.ID).length) {
              // Create the new item UI and append it to the
              // display area.
              var thisItemUI = $('<div class="spwidgets-item spwidgets-item-id-' + item.ID + '" data-spid="' + item.ID + '" style="display:none">' + fillTemplate(o.template, item) + '</div>').appendTo(itemCntr).find('.spwidgets-item-remove').on('click.SPWidgets', function () {
                Lookup.removeItem(o, this);
              }).end();
              // If an onAddItem event was defined, AND the storage
              // of the ID are is not being bypassed, then then run it now
              if ($.isFunction(o.onItemAdd) && doNotStoreIds !== true) {
                o.onItemAdd.call(o._ele, thisItemUI, item, o._cntr);
              }
              // If item is still present in the selction list
              // then continue on to add its ID to the input field
              // which is used to store it in the DB.
              // We check  this here because the .onItemAdd() event
              // could have removed it from the UI
              if (itemCntr.find('div.spwidgets-item-id-' + item.ID).length > 0) {
                wasUpdated = true;
                // Show the new item on the page.
                thisItemUI.fadeIn('slow').promise().then(function () {
                  $(this).css('display', '');
                });
                // Store this item's ID in the input field
                if (doNotStoreIds !== true) {
                  o.storeItemIDs(item.ID, o.allowMultiples);
                }
                // If allowMultiples is false, then check if the input field
                // should be hidden
                if (o.allowMultiples === false && o.hideInput === true) {
                  o._lookupInputEleCntr.css('display', 'none');
                }
              }  //end: if() is item still in the UI (after .onItemAdd())
            }  //end: if(): item already displayed?
          });
          //end: .each() item
          // If readOnly = true, then remove the "delete item"
          // link from the elements
          if (o.readOnly) {
            o._cntr.find('.spwidgets-item-remove').remove();
          }
          // if an update was made, then trigger the change() event on the
          // original input element.
          if (wasUpdated) {
            o._ele.trigger('change');
          }
        };
        //end: o.showSelectedItems()
        /**
         * Stores the ID's of the selected items in the
         * input field that this widget was bound to.
         *
         * @param {Array|String} ids
         * @param {Boolean} [append=false]
         *
         */
        o.storeItemIDs = function (ids, append) {
          // Store item in input field, by appending this new
          // item to the end of the existing data in the input.
          var newItemValue = $.trim(o._ele.val()), isPadDone = false;
          // If ID's not an array, then converted to one and
          // assign its value to the new array.
          if (!$.isArray(ids)) {
            ids = [ids];
          }
          // If append is not true, then erase whatever
          // data might be there now.
          if (append !== true) {
            newItemValue = '';
          }
          // Loop through all element and add them to the string
          // that will be used to update the input field.
          $.each(ids, function (i, thisID) {
            if (thisID) {
              // If existing input is blank and padDelimeter is
              // true, then add an extra delimeter to the begening of the
              // string.
              if (newItemValue.length < 1 && o.padDelimeter === true && !isPadDone) {
                newItemValue += ';#';
                isPadDone = true;
              }
              // If data is already in the input field, then add
              // delimeter to end of the data.
              if (newItemValue.length > 0) {
                newItemValue += ';#';
              }
              newItemValue += thisID + ';#';  // TODO: Support for having the Title also be saved - similar to SP
                                              // Does the .Title value need to be escaped
            }
          });
          // Store the values back on the input element.
          o._ele.val(newItemValue);
        };
        //end: o.storeItemIDs()
        /**
         * Looks at the input field where this widget was bound to
         * and displays the items (rows) that are currently stored
         * there in the widget.
         *
         * @param {Object} options
         * @param {Boolean} [options.aysnc=true]
         *
         * @return {jQuery.Deferred}
         *      A deferred because based on those values in the input
         *      calls will be made to the server to retrieve their data.
         *      Deferred is resolved with a scope of the intance object
         *      (o) and given two input params: xData, Status.. Note that
         *      these could be null if input was not set
         */
        o.showCurrentInputSelection = function (options) {
          return $.Deferred(function (dfd) {
            var opt = $.extend({}, { async: true }, options), items = parseLookupFieldValue(o._ele.val());
            if (!items.length) {
              dfd.resolveWith(o, [
                null,
                null
              ]);
              return;
            }
            getListItems({
              operation: 'GetListItems',
              async: opt.async,
              listName: o.list,
              CAMLQuery: '<Query><Where>' + getCamlLogical({
                type: 'OR',
                values: items,
                onEachValue: function (n) {
                  var s = '';
                  if (n.id) {
                    s = '<Eq><FieldRef Name=\'ID\'/>' + '<Value Type=\'Counter\'>' + n.id + '</Value></Eq>';
                  }
                  return s;
                }
              }) + '</Where></Query>',
              CAMLViewFields: '<ViewFields>' + o._selectFields + '</ViewFields>',
              CAMLRowLimit: 0,
              completefunc: function (xData, status, arrayOfCurrentItems) {
                // Add to autocomplete cache
                o.addToAutocompleteCache(arrayOfCurrentItems);
                o.showSelectedItems(arrayOfCurrentItems, true);
                dfd.resolveWith(o, [
                  xData,
                  status
                ]);
                return;
              }  //end: completefunc()
            });  //end: getListItems
          })  //end: deferred()
.promise();
        };
        //end: o.showCurrentInputSelection()
        /**
         * Checks the cache object (o._autocompleteCache), which is
         * used to store the objects of data used by the Autocomplete
         * function, for an object matching the ID provided on input.
         *
         * @param {String} itemId
         *
         * @return {null|Object}
         *
         */
        o.getItemObjectFromCache = function (itemId) {
          var itemObj = null;
          $.each(o._autocompleteCache, function (key, rows) {
            $.each(rows, function (i, row) {
              if (row.ID === itemId) {
                itemObj = row;
                return false;
              }
            });
            if (itemObj !== null) {
              return false;
            }
          });
          return itemObj;
        };
        //end: o.getItemObjectFromCache()
        /**
         * Add a new row or rows to the autocomplete
         * cache. Cache token will be each row ID.
         */
        o.addToAutocompleteCache = function (rows) {
          if (!$.isArray(rows)) {
            rows = [rows];
          }
          $.each(rows, function (i, row) {
            if (!o._autocompleteCache[row.ID]) {
              o._autocompleteCache[row.ID] = [];
            }
            o._autocompleteCache[row.ID].push(row);
          });
        };
        //end: o.addToAutocommpleteCache();
        //---------------------------------------------------
        //              START BUILD THIS INSTANCE
        //---------------------------------------------------
        // Create the UI container and store the options object in the input field
        o._cntr = $(lookupFieldTemplate).find('.spwidgets-lookup-cntr').clone(1);
        // Insert the widget container into the UI
        if (o.uiContainer === null) {
          o._cntr.insertAfter(o._ele);
        } else {
          o._cntr.appendTo($(o.uiContainer));
        }
        // Define references to the different elements of the UI
        o._selectedItemsCntr = o._cntr.find('div.spwidgets-lookup-selected');
        o._lookupInputEleCntr = o._cntr.find('div.spwidgets-lookup-input');
        o._lookupInputEle = o._lookupInputEleCntr.find('input[name=\'spwidgetLookupInput\']');
        o._ignoreKeywordsRegEx = /^(of|and|a|an|to|by|the|or)$/i;
        o._cntr.data('SPWidgetLookupFieldOpt', o);
        o._ele.data('SPWidgetLookupFieldUI', o._cntr);
        // If showSelector is false, remove the option from the UI...
        // FIXME: maybe we realy want to hide it? case the option is changed later?
        if (!o.showSelector) {
          o._cntr.find('.spwidget-lookup-selector-showhide,.spwidget-lookup-selector-cntr').remove();  // Else, bind methods for handling the selector.
        } else {
          o._selectorCntr = o._cntr.find('div.spwidget-lookup-selector-cntr');
          o._queryInitDone = false;
          o._cntr.find('.spwidget-lookup-selector-showhide').on('click', function () {
            if (o._selectorCntr.is(':visible')) {
              o._selectorCntr.css('display', 'none');
            } else {
              o._selectorCntr.css('display', 'block').position({
                my: 'left top',
                at: 'left bottom',
                of: o._lookupInputEle
              });
              if (!o._queryInitDone) {
                o._queryInitDone = true;
                Lookup.doSelectorDataInit(o);
              }
            }  //end: if/else(): how/hide
          });
          o._selectorCntr.find('button[name=\'close\']').button({
            text: false,
            icons: { primary: 'ui-icon-circle-close' }
          }).click(function () {
            o._selectorCntr.css('display', 'none');
          });
          // If user focuses on the Input field (autocomplete),
          // then hide the selector if visible
          o._lookupInputEle.on('focus', function () {
            if (o._selectorCntr.is(':visible')) {
              o._selectorCntr.css('display', 'none');
            }
          });
        }
        //end: else(): ShowSelector is true
        // If an input label was defined, then set it, else, remove input label
        if (o.inputLabel) {
          o._cntr.find('div.spwidgets-lookup-input label').empty().append(o.inputLabel);
        } else {
          o._cntr.find('div.spwidgets-lookup-input label').remove();
        }
        // insert placeholder
        if (o.inputPlaceholder) {
          o._lookupInputEleCntr.find('input').attr('placeholder', o.inputPlaceholder);
        }
        // Hide the ADD input field if we're in readonly mode
        if (o.readOnly === true) {
          o._lookupInputEleCntr.css('display', 'none');
          o._cntr.find('div.spwidget-lookup').addClass('spwidget-lookup-readyonly');
        }
        // Convert the list of fields to CAML
        o._selectFields = '';
        $.each(o.selectFields, function (i, f) {
          o._selectFields += '<FieldRef Name=\'' + f + '\'/>';
        });
        // Get the token names from the text template
        o._templateTokens = String(o.template).match(/(\$\{.*?\})/g);
        if (o._templateTokens == null) {
          o._templateTokens = [];
        }
        $.each(o._templateTokens, function (i, thisToken) {
          o._templateTokens[i] = thisToken.replace(/[\$\{\}]/g, '');
        });
        // Bind an Autocomplete to the ADD input of the Lookup widget
        // Cache is kept by [searchTerm]: ArrayOfObjects (rows from DB)
        var cache = o._autocompleteCache = {};
        o._cntr.find('div.spwidgets-lookup-input input').autocomplete({
          minLength: 2,
          appendTo: o._cntr,
          /**
           * Add format to the pick options and set height
           * if it was defined on input.
           */
          open: function () {
            $(this).autocomplete('widget').each(function () {
              if (o.listHeight > 0) {
                $(this).css('height', o.listHeight + 'px');
              }
              return false;
            });  // TODO: need to create a class to place a border around suggestion.
                 //        then, add to the above: .find("a").addClass("classname here")
          },
          /**
           * Searches for the data to be displayed in the autocomplete choices.
           */
          source: function (request, response) {
            request.term = $.trim(request.term);
            // If search term is in cache, return it now
            var termCacheName = String($.trim(request.term)).toUpperCase();
            if (termCacheName in cache) {
              response(cache[termCacheName]);
              return;
            }
            cache[termCacheName] = [];
            var filterItems = [];
            // If search term contains only digits, then do a search on ID
            var term = String(request.term);
            if (term.match(/\D/) === null && term.match(/\d/) !== null) {
              filterItems.push('<Eq><FieldRef Name=\'ID\'/>' + '<Value Type=\'Counter\'>' + term + '</Value></Eq>');  // Else, search all Fields defined by the caller for the term
            } else {
              var keywords = [request.term];
              if (!o.exactMatch) {
                keywords = String(request.term).split(/ /);
              }
              // For each search field, build the search using AND logical
              for (var n = 0, m = o.filterFields.length; n < m; n++) {
                var fieldFilters = [];
                for (var i = 0, j = keywords.length; i < j; i++) {
                  if (!o._ignoreKeywordsRegEx.test(keywords[i])) {
                    fieldFilters.push('<Contains><FieldRef Name=\'' + o.filterFields[n] + '\'/>' + '<Value Type=\'Text\'>' + keywords[i] + '</Value></Contains>');
                  }
                }
                filterItems.push(getCamlLogical({
                  values: fieldFilters,
                  type: 'AND'
                }));
              }
            }
            // Build the query using OR statements
            var camlFilter = getCamlLogical({
              values: filterItems,
              type: 'OR'
            });
            // If caller defined extra REQUIRED criteria, then
            // build it into the query.
            if (o.filter) {
              camlFilter = getCamlLogical({
                values: [
                  camlFilter,
                  o.filter
                ],
                type: 'AND'
              });
            }
            // Find the items based on the user's input
            getListItems({
              operation: 'GetListItems',
              listName: o.list,
              async: true,
              CAMLQuery: '<Query><Where>' + camlFilter + '</Where>' + o.filterOrderBy + '</Query>',
              CAMLRowLimit: o.maxResults,
              CAMLViewFields: '<ViewFields>' + o._selectFields + '</ViewFields>',
              completefunc: function (xData, status, rows) {
                $.each(rows, function (i, thisDt) {
                  thisDt.value = '';
                  thisDt.label = fillTemplate(o.listTemplate, thisDt);
                  // Add to cache
                  cache[termCacheName].push(thisDt);
                });
                // Return response
                response(cache[termCacheName]);
              }
            });
          },
          //end:source()
          /**
           * Event bound to an autocomplete suggestion.
           *
           * @param {jQuery} ev   -   jQuery event.
           * @param {Object} u    -   An object containing the element generated above
           *                          by the <source> method that represents the item
           *                          that was selected.
           */
          select: function (ev, u) {
            o.showSelectedItems(u.item);
          }  //end: event: select()
        })  //end:autocomplete
            /**
             * ON enter key, if value is less than the minLength, then
             * Force a search. We pad the query string with spaces so
             * that it gets pass the autocomplete options set during setup.
             */.on('keyup.SPWidgets', function (ev) {
          if (ev.which !== 13) {
            return;
          }
          var v = $(ev.target).val();
          if (v) {
            if (String(v).length < o.minLength) {
              $(ev.target).autocomplete('search', v + '    ');
            }
          }
        });
        // If the input field has values, then parse them and display them
        if (o._ele.val()) {
          o.showCurrentInputSelection().then(function () {
            // Call onReady function if one was defined.
            if ($.isFunction(o.onReady)) {
              o.onReady.call(o._ele, o._cntr);
            }
          });  // ELSE, input was blank. Trigger onReady if applicable.
        } else {
          if ($.isFunction(o.onReady)) {
            o.onReady.call(o._ele, o._cntr);
          }
        }
        // end: if()
        return this;
      });
    };
    //end: $.fn.SPLookupField()
    /**
     * Removes an item or array of item from the selection.
     * The html element is removed from UI and the input
     * element is updated to not contain that ID
     *
     * @memberOf Lookup.lookupField
     *
     * @param {Object} o
     * @param {Object} htmlEle
     *              A jQuery selection of elements to remove.
     *
     * @return {Object} Lookup
     */
    Lookup.removeItem = function (o, htmlEle) {
      var e = $(htmlEle).closest('div.spwidgets-item'), cntr = o._selectedItemsCntr, store = [];
      // If an onItemRemove param was defined, then trigger it now
      // Use the store[] array to temporarly store the item IDs that
      // will be removed. This is used to provide it to the callback.
      if ($.isFunction(o.onItemRemove)) {
        e.each(function () {
          store.push(o.getItemObjectFromCache($(this).data('spid')));
        });
        if (o.onItemRemove.call(o._ele, e, store, o._cntr) === false) {
          return Lookup;
        }
        store = [];
      }
      // Hide the item the user removed from the UI
      e.fadeOut('fast').promise().then(function () {
        e.remove();
        // If AllowMultiple is false and msgNoItem is false
        // then hide the selected items container
        if (!o.msgNoItems && (o.allowMultiples === false || o.allowMultiples === true && cntr.find('div.spwidgets-item').length < 1)) {
          cntr.css('display', 'none');
        }
        // If allowMultiples is false, and hideInput is true, then make sure
        // it is visible again
        if (o.allowMultiples === false && o.hideInput === true) {
          o._lookupInputEleCntr.css('display', '');
        }
        // If a message was defined for no items selected,
        // then show it now.
        if (cntr.find('div.spwidgets-item').length < 1 && o.msgNoItems) {
          cntr.append('<div>' + o.msgNoItems + '</div>');
        }
        // Get a new list of items to store
        cntr.find('div.spwidgets-item').each(function () {
          store.push($(this).data('spid'));
        });
        // Focus on the autocomplete field.
        o._lookupInputEleCntr.find('input').focus();
        // remove the item and trigger a change event
        o.storeItemIDs(store);
        o._ele.change();
      });
      return Lookup;
    };
    //end:Lookup.removeItem()
    /**
     * Adds items to the Lookup widget. Method is used with the
     * "add" method on this widget.
     * Takes a string of values in format id;#title (title optional)
     * and adds them to the input element and then calls the
     * Inst.showCurrentInputSelection() method to display them.
     *
     * @param {Object} Inst     The instance object for the widget
     * @param {String} strItems The sting of items to add.
     *
     * @return {Object} Inst
     */
    Lookup.addItem = function (Inst, strItems) {
      if (!strItems || typeof strItems !== 'string') {
        return Inst;
      }
      var newVal = Inst._ele.val();
      if (newVal === '' && Inst.padDelimeter === true) {
        newVal += ';#';
      }
      if (newVal) {
        newVal += ';#';
      }
      newVal += strItems;
      Inst._ele.val(newVal);
      Inst.showCurrentInputSelection();
      return Inst;
    };
    //end: Lookup.addItem()
    /**
     * Initializes the Selector with data from the List.
     *
     * @param {Object} Inst
     *          The widget instance object.
     *
     * @return {Object} Inst
     *
     */
    Lookup.doSelectorDataInit = function (Inst) {
      var opt = {
        $resultsCntr: Inst._selectorCntr.find('div.spwidget-lookup-selector-item-cntr'),
        nextPageToken: '',
        isLoading: false,
        hasMorePages: true,
        $lastPage: $(),
        queryXml: Inst.filter ? '<Query><Where>' + Inst.filter + '</Where>' + Inst.filterOrderBy + '</Query>' : '<Query>' + Inst.filterOrderBy + '</Query>'
      };
      // If the global listner is not yet setup, do it now
      if (!Lookup._isLookupbodyEventDone) {
        Lookup._isLookupbodyEventDone = true;
        $('body').on('click', function (ev) {
          var $ele = $(ev.target), $allSelectors = $('div.spwidget-lookup-selector-cntr:visible'), $clickArea = null;
          if ($allSelectors.length) {
            $clickArea = $ele.closest('div.spwidget-lookup-selector-cntr');
            if (!$clickArea.length && $ele.is('.spwidget-lookup-selector-showhide')) {
              $clickArea = $ele.parent().find('div.spwidget-lookup-selector-cntr');
            }
            $allSelectors.not($clickArea).hide();
          }
        });
      }
      /**
       * Gets the rows from the list and keeps
       * a reference to the next page ID so that
       * on subsquent calls, it will be used.
       *
       * @return {jQuery.Promise}
       *          Promise is resolved with a context of the
       *          page of data that was inserted into the
       *          selector.
       */
      opt.getListRows = function () {
        return $.Deferred(function (dfd) {
          // If we're already busy getting results, exit...
          if (opt.isLoading) {
            dfd.resolveWith($, [opt.$lastPage]);
            return;
          }
          opt.isLoading = true;
          // Create this new page of data container and save it as the "last" page displayed.
          var $page = $('<div/>').insertBefore(opt.$nextPage);
          opt.$lastPage = $page;
          // Get the data from the list using the user's filter,
          // maxResult and SelectFields. Then populate the selector
          // with the data found.
          getListItems({
            operation: 'GetListItems',
            listName: Inst.list,
            async: true,
            CAMLQuery: opt.queryXml,
            CAMLRowLimit: Inst.maxResults,
            CAMLViewFields: '<ViewFields>' + Inst._selectFields + '</ViewFields>',
            CAMLQueryOptions: function () {
              if (opt.nextPageToken !== '') {
                return '<QueryOptions>' + '<Paging ListItemCollectionPositionNext=\'' + xmlEscape.escape(opt.nextPageToken) + '\'/></QueryOptions>';
              }
            }(),
            completefunc: function (xData, status, rows) {
              var $rsData = getNodesFromXml({
                  xDoc: xData.responseXML,
                  nodeName: 'rs:data',
                  asJQuery: true
                }).eq(0), rowsHtml = '';
              // Store the NextPage Token
              opt.nextPageToken = $rsData.attr('ListItemCollectionPositionNext') || '';
              if (opt.nextPageToken === '') {
                opt.hasMorePages = false;
              }
              $.each(rows, function (i, row) {
                // Add row to autocomplete cache
                Inst.addToAutocompleteCache(row);
                // Create the same attribute as those that are created for
                // the Autocomplete widget. Ensure consistency should we
                // do more with this in the future.
                row.value = '';
                row.label = fillTemplate(Inst.listTemplate, row);
                rowsHtml += '<div class="spwidget-lookup-item" data-spwidgetsindex="' + i + '">' + row.label + '</div>';
              });
              $page.html(rowsHtml).find('div.spwidget-lookup-item').each(function () {
                var $e = $(this);
                $e.hover(function () {
                  $e.addClass('ui-state-hover');
                }, function () {
                  $e.removeClass('ui-state-hover');
                });
              }).end().on('click', 'div.spwidget-lookup-item', function () {
                var thisRowIndex = $(this).data('spwidgetsindex');
                Inst.showSelectedItems(rows[thisRowIndex]);
              });
              opt.isLoading = false;
              dfd.resolveWith($page, [$page]);
              return;
            }  //end: completefunc()
          });
        });
      };
      // Create the "next page" button
      opt.$nextPage = $('<div class="ui-state-highlight spwidget-lookup-selector-next">Next...</div>').appendTo(opt.$resultsCntr.empty()).click(function () {
        if (!opt.hasMorePages) {
          return;
        }
        opt.$nextPage.css('display', 'none');
        // Get teh list of rows and then:
        // if more pages exist - display the next button
        // if not and no items were displayed, then show message
        opt.getListRows().then(function ($page) {
          if (opt.hasMorePages) {
            opt.$nextPage.css('display', '');
          } else if (!$page.children().length) {
            $page.append('<div class=\'ui-state-highlight\'>No Items Found!</div>');
          }
          opt.$resultsCntr.scrollTop($page.position().top);
        });
      });
      opt.$nextPage.click();
      return Inst;
    };
    //end: Lookup.doSelectorDataInit()
    lookupField.defaults = Lookup.defaults;
    return lookupField;
  }(jquery, text_src_lookupFieldWidget_lookupFieldhtml, src_spapi_getListItems, src_sputils_fillTemplate, src_sputils_getCamlLogical, src_sputils_getNodesFromXml, src_sputils_parseLookupFieldValue, src_sputils_xmlEscape);
  text_src_peoplePickerWidget_peoplePickerhtml = '<div> <div class="pt-pickSPUser"> <div class="pt-pickSPUser-selected"> None Selected! </div> <div style="clear:both"></div> <div class="pt-pickSPUser-input" title="Type user name above to view search results."> <input name="pickSPUserInputField" type="text"> </div> </div> <div class="pt-pickSPUser-person"> <div class="pt-pickSPUser-person-cntr ui-state-default ui-corner-all"> <span class="pt-person-name"></span> <div class="pt-pickSPUser-person-actions"> <div class="tt-record-item-action-links"> <a class="tt-delete-icon" href="javascript:"> <img style="border: medium none; margin-right: 2px" alt="Delete" src="/_layouts/images/delitem.gif"> </a> <div style="clear:both"></div> </div> <div style="clear:both"></div> </div> </div> </div> </div>';
  src_spapi_searchPrincipals = function ($, cache, getSiteUrl, doesMsgHaveError) {
    /**
     * Given a list name, this method will query the SP service and retrieve
     * the list of forms for it.
     *
     * @param {Object} options
     * @param {Object} options.searchText
     * @param {Object} [options.maxResults=50]
     * @param {Object} [options.principalType='All']
     *      Default is User. Others include: None, DistributionList,
     *      SecurityGroup, SharePointGroup, All
     * @param {Object} [options.webUrl='currentSiteUrl']
     * @param {Object} [options.cacheXML=false]
     * @param {Object} [options.async=true]
     * @param {Object} [options.completefunc]
     *      Options is deprecated. Use .promise that is returned.
     *
     * @return {jQuery.Promise}
     *      Promise is resolved with two input params:
     *      XMLDocument : Response from Sharepoint
     *      status : the ajax status string (error or success)
     */
    var searchPrincipals = function () {
      var getData = null, callerFn = function () {
          return getData.apply(this, arguments);
        };
      // Define defaults. User can change these on their function attachment.
      callerFn.defaults = {
        searchText: '',
        maxResults: 50,
        principalType: 'All',
        webURL: '',
        cacheXML: false,
        async: true,
        completefunc: null
      };
      /**
       * Retrieves the data from Sharepoint
       */
      getData = function (opt) {
        var options = $.extend({}, callerFn.defaults, opt), reqPromise;
        if (!options.webURL) {
          options.webURL = getSiteUrl();
        } else if (options.webURL.charAt(options.webURL.length - 1) !== '/') {
          options.webURL += '/';
        }
        options.webURL += '_vti_bin/People.asmx';
        options.cacheKey = options.webURL + '?' + [
          options.searchText,
          options.maxResults,
          options.principalType
        ].join('|');
        options.isCached = cache.isCached(options.cacheKey);
        // If cacheXML is true and we have a cached version, return it.
        if (options.cacheXML && options.isCached) {
          reqPromise = cache(options.cacheKey);
          // If a completefunc was defined on this call,
          // execute it.
          if ($.isFunction(options.completefunc)) {
            reqPromise.then(function (xdata, status) {
              options.completefunc(xdata, status);
            });
          }
          return reqPromise;
        }
        // Return a deferred.
        reqPromise = $.Deferred(function (dfd) {
          // If cacheXML is FALSE, and we have a cached version of this key,
          // then remove the cached version - basically reset
          if (options.isCached) {
            cache.clear(options.cacheKey);
          }
          $.ajax({
            type: 'POST',
            cache: false,
            async: options.async,
            url: options.webURL,
            contentType: 'text/xml;charset=utf-8',
            dataType: 'xml',
            data: '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' + '<soap:Body><SearchPrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">' + '<searchText>' + options.searchText + '</searchText>' + '<maxResults>' + options.maxResults + '</maxResults>' + '<principalType>' + options.principalType + '</principalType>' + '</SearchPrincipals></soap:Body></soap:Envelope>',
            complete: function (xdata, status) {
              // Process Error from status
              if (status === 'error' || doesMsgHaveError(xdata)) {
                // If cacheXML was true, then remove this from cache.
                // No point in caching failures.
                if (options.cacheXML) {
                  cache.clear(options.cacheKey);
                }
                dfd.rejectWith($, [
                  xdata,
                  status
                ]);
                return;
              }
              dfd.resolveWith($, [
                xdata,
                status
              ]);
              if ($.isFunction(options.completefunc)) {
                options.completefunc(xdata, status);
              }
            }  //end: $.ajax().success()
          });
        }).promise();
        //end: return .promise()
        // If cacheXML was true, then cache this promise
        if (options.cacheXML) {
          cache(options.cacheKey, reqPromise);
        }
        return reqPromise;
      };
      //end: getData
      return callerFn;
    }();
    //end: API.searchPrincipals()
    return searchPrincipals;
  }(jquery, src_sputils_cache, src_spapi_getSiteUrl, src_sputils_doesMsgHaveError);
  src_spapi_resolvePrincipals = function ($, getSiteUrl) {
    /**
     * Given a list of users, this method will resolve those if they
     * are not part of the site collection user list info.
     *
     * @param {Object} options
     * @param {Array|String} options.principalKeys
     *      The principal key (login name/Account Name/email) to be resolved.
     *      An array of values can also be used on input.
     * @param {String} [options.principalType='All']
     *      The type of principal that is being resolved.
     * @param {Boolean} [options.addToUserInfoList=true]
     *      If true, then principal will be added to the site collection
     *      user info list.
     * @param {Boolean} [options.async=true]
     *      If true, call to the service will be made async.
     *
     *
     * @return {jQuery.Promise}
     *      The jquery .ajax() Promise is returned.
     *
     * @example
     *
     *  SPAPI.resolvePrincipals({
     *      principalKeys: "domain\\userid"
     *  })
     *  .then(function(xmlDoc, status){
     *
     *      var userSiteUID = $(xmlDoc)
     *              .find("AccountName:contains('domain\\userid')")
     *              .parent()
     *              .find("UserInfoID")
     *              .text();
     *      alert("User was Resolved. His ID is: " + userSisteID);
     *  });
     */
    var resolvePrincipals = function () {
      var getData = null, callerFn = function () {
          return getData.apply(this, arguments);
        };
      // Define defaults. User can change these on their function attachment.
      callerFn.defaults = {
        principalKeys: [],
        principalType: 'All',
        addToUserInfoList: true,
        async: true
      };
      /**
       * Retrieves the data from Sharepoint
       */
      getData = function (opt) {
        var options = $.extend({}, callerFn.defaults, opt);
        if (!options.webURL) {
          options.webURL = getSiteUrl();
        } else if (options.webURL.charAt(options.webURL.length - 1) !== '/') {
          options.webURL += '/';
        }
        options.webURL += '/_vti_bin/People.asmx';
        if (!$.isArray(options.principalKeys)) {
          options.principalKeys = [options.principalKeys];
        }
        options.principalXml = '';
        var hasStringTag = /<string>/i, i, j;
        for (i = 0, j = options.principalKeys.length; i < j; i++) {
          if (!hasStringTag.test(options.principalKeys[i])) {
            options.principalXml += '<string>' + options.principalKeys[i] + '</string>';
          } else {
            options.principalXml += options.principalKeys[i];
          }
        }
        // Make ajax call and return pronise
        return $.ajax({
          type: 'POST',
          cache: false,
          async: options.async,
          url: options.webURL,
          contentType: 'text/xml;charset=utf-8',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('SOAPAction', 'http://schemas.microsoft.com/sharepoint/soap/ResolvePrincipals');
          },
          dataType: 'xml',
          data: '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' + '<soap:Body><ResolvePrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">' + '<principalKeys>' + options.principalXml + '</principalKeys>' + '<principalType>' + options.principalType + '</principalType>' + '<addToUserInfoList>' + options.addToUserInfoList + '</addToUserInfoList>' + '</ResolvePrincipals></soap:Body></soap:Envelope>'
        });
      };
      //end: getData
      return callerFn;
    }();
    return resolvePrincipals;
  }(jquery, src_spapi_getSiteUrl);
  less_src_peoplePickerWidget_peoplePicker = undefined;
  src_peoplePickerWidget_peoplePicker = function ($, peoplePickerTemplate, getSiteUrl, searchPrincipals, resolvePrincipals, parseLookupFieldValue, addHoverEffect) {
    /**
     * jQuery plugin that attaches to an input field and provide a people
     * picker widget for interaction by the user. This Plugin is dependent
     * on jQuery UI's Autocomplete.
     */
    var People = {}, peoplePicker;
    // Store defaults in SPWidgets object.
    People.defaults = {
      allowMultiples: true,
      maxSearchResults: 50,
      webURL: null,
      type: 'User',
      onPickUser: null,
      onCreate: null,
      onRemoveUser: null,
      inputPlaceholder: 'Type and Pick',
      appendTo: null,
      minLength: 3,
      showSelected: true,
      resolvePrincipals: true,
      meKeyword: '[me]',
      meKeywordLabel: 'Current User',
      filterSuggestions: null
    };
    /**
     * Given an input field, this method will display an interface that
     * allows the users to select one or more users from SharePoint and
     * stores the selected user information into the intput field in the
     * format expected when making an update via webservices.
     *
     * The input field will be hidden in its current position and a UI
     * will displayed instead. As the user picks or removes users, the
     * input field will be updated at the same time, thus it will always
     * be ready to be submitted as part of an update to the server.
     *
     * @param {HTMLElement|jQuery|Selector} containers
     *      Containers that will receive the peoplePickers
     *
     * @param {Object} options
     *      Object with the options. See below.
     *
     * @param {Boolean} [options.allowMultiples=true]
     *      Determine whether multiple users can be picked.
     *
     * @param {String} [options.webURL=currentSiteUrl]
     *      The URL of the site
     *
     * @param {String} [options.type='User']
     *      The type of search to conduct. Default is User. Others
     *      include: None, DistributionList, SecurityGroup,
     *      SharePointGroup, All
     *
     * @param {Interger} [options.maxSearchResults=50]
     *      The max number of results to be returned from the
     *      server.
     *
     * @param {jQuery}  [options.appendTo=null]
     *      The container where to where the autocomplete suggestion
     *      should be appended.
     *
     * @param {Number} [options.minLength=3]
     *      The minimum number of characters the user must type before
     *      suggestions are retrieved. Given directly to jQuery UI's
     *      Autocomplete widget.
     *
     * @param {Function} [options.onPickUser=null]
     *      Function that is called when user makes a selection.
     *      Function will have a context (this keyword) of the
     *      input field to which this plugin is called on, and
     *      will be given one input param; an object containing
     *      information about the selected user.
     *
     * @param {Function} [options.onCreate=null]
     *      Function that is called after the widget has been
     *      initiated on an input element.
     *      Function will have a context (this keyword) of the
     *      input field to which this plugin is called on, which
     *      will also be provided as the first argument to the
     *      function.
     *
     * @param {Function} [options.onRemoveUser=null]
     *      Function called when removing a user from the selected
     *      list. Returning false (boolean) will cancel the removal
     *      of the person from the selected list.
     *      Function will have a context (this keyword) of the
     *      input field to which this plugin is called on, and is
     *      given 3 input params: $input, $personUI, personObj
     *
     * @param {String} [options.inputPlaceholder="Type and Pick"]
     *      The text to appear in the HTML5 placeholder attribute
     *      of the input field.
     *
     * @param {String} [options.showSelected=true]
     *      If true (default), the selected users by this widget will be shown
     *      on the screen. Set to this false, if all that is desired to show is the
     *      search input element.
     * @param {String} [options.resolvePrincipals=true]
     *      If set to true, any user that is suggested but not yet
     *      part of the site collection user info list (their id
     *      is -1) will be automatically added.
     *
     * @param {Function} [options.filterSuggestions=null]
     *      A callback function to be used in filtering the
     *      suggestions values retrieved from the server. This
     *      callback, if defined, must return an array of objects.
     *
     * @return {jQuery} selection
     *
     *
     * METHODS:
     *
     * $().pickSPUser("method", "clear")
     *      Clears the currently selected users.
     *
     * $().pickSPUser("method", "destroy")
     *      Destroys the widget.
     *
     * $().pickSPUser("method", "add", "person in id;#name format")
     *      adds a person
     *
     * $().pickSPUser("method", "remove", "person id or displayed name")
     *      removes a person
     *
     * $().pickSPUser("method", "getSelected")
     *      Returns array of people selecte.
     *
     *
     * EVENTS:
     *
     * spwidget:peoplePickerCreate
     *          Triggered when the widget is initiated. Event will received
     *          a scope of the input element or whatever object it bubled to
     *          as well as the following input parameter:
     *          1. jQuery Event object
     *          2. Input element that widget was attached to (as jQuery object)
     *
     * spwidget:peoplePickerAdd
     *          Triggered when an item is added to the input field. Event will
     *          receive a scope of the input element or whatever object it
     *          bubbled to, as well as the following input parametes:
     *          1. jQuery Event Object
     *          2. Input element (as jQuery object)
     *          3. Object with information on the user that was added.
     *
     * spwidget:peoplePickerRemove
     *          Triggered when an item is removed from the selected list. Event will
     *          receive a scope of the input element or whatever object it
     *          bubbled to, as well as the following input parametes:
     *          1. jQuery Event Object
     *          2. Input element (as jQuery object)
     *          3. Object with information on the user that was removed.
     *
     *
     */
    peoplePicker = function (containers, options) {
      // Store the arguments given to this function. Used later if the
      // user is trying to execute a method of this plugin.
      var arg = Array.prototype.slice.call(arguments, 1), $this = containers;
      // If input is a string, then it must be an action (method).
      // Process only the first element in the selection.
      if (typeof options === 'string') {
        // TODO: should methods support actions on all items in selection?
        return function (ele) {
          if (ele.is('input') && ele.hasClass('hasPickSPUser')) {
            return People.handleAction.apply(ele, arg);
          }
          return $this;
        }($this.eq(0));
      }
      // Initiate each selection as a pickSPUser element
      return $this.each(function () {
        var ele = $(this);
        // Options for this element
        var o = $.extend({}, People.defaults, options, { eleUserInput: ele.css('display', 'none').addClass('hasPickSPUser') });
        // If no webURL, define it now
        if (!o.webURL) {
          o.webURL = getSiteUrl();
        }
        // insure that maxsearchResults is an interger
        o.maxSearchResults = parseInt(o.maxSearchResults) || 50;
        // Create pick user container and insert it after the input element
        var cntr = $(peoplePickerTemplate).find('.pt-pickSPUser').clone(1).insertAfter(ele);
        o.eleSelected = cntr.find('div.pt-pickSPUser-selected').empty().on('click', '.tt-delete-icon', function () {
          People.removeUser(this);
        });
        o.elePickInput = cntr.find('div.pt-pickSPUser-input');
        /**
         * Checks if a user is already included in the list of selected people
         * in the People Picker widget.
         *
         * @param {String} id
         * @param {String} [name]
         *
         * @return {Boolean}
         */
        o.isUserAlreadySelected = function (id, name) {
          var selector = 'div[data-pickspuserid=\'' + id + '\']';
          if (name) {
            selector += '[data-pickspusername=\'' + name.replace(/'/g, '\\\'') + '\']';
          }
          return o.eleSelected.find(selector).length > 0;
        };
        /**
         * Adds people to the selected list.
         *
         * @param {String} peopleString
         * @param {Boolean} noEvents
         *
         */
        o.addPeopleToList = function (peopleString, noEvents) {
          var curUsers = String(peopleString).split(';#'), total = curUsers.length, i, id, user, $ui;
          // TODO: use parseLookupFieldValue instead of local logic to parse values
          for (i = 0; i < total; i++) {
            id = curUsers[i];
            i++;
            user = curUsers[i];
            if (id.toLowerCase() === '<userid/>') {
              user = o.meKeywordLabel;
            }
            $ui = People.getUserHtmlElement(o, id, user).appendTo(o.eleSelected);
            // Get this user's info. and store it in the input element
            (function ($thisUserUI, thisUserName) {
              var searchString = thisUserName;
              if (id.toLowerCase() === '<userid/>') {
                searchString = o.meKeyword;
              }
              o.getSearchResults(searchString).done(function (rows) {
                var personName = String(thisUserName).toLowerCase();
                $.each(rows, function (i, v) {
                  // TODO: Should we instead try to match on the ID?
                  // SP is not consistent how the name is displayed on people pickers.
                  // trying to get the Person record.
                  var thisName = String(v.displayName).toLowerCase();
                  if (thisName === personName) {
                    $thisUserUI.data('pickspuser_object', v);
                    return false;
                  }
                });  // TODO: should something be done if we're unable to find user?
              });
            }($ui, user, id));
          }
          addHoverEffect(o.eleSelected.find('div.pt-pickSPUser-person-cntr'));
          // if we don't allow multiple, then hide the input area
          if (o.allowMultiples === false) {
            o.elePickInput.css('display', 'none');
          }
          People.storeListOfUsers(o.eleSelected, noEvents);
        };
        //end: o.addPeopleToList()
        /**
         * Searches SP for the value provided on input
         *
         * @param {String} searchString
         *
         * @return {jQuery.Promise}
         *
         */
        o.getSearchResults = function (searchString) {
          return $.Deferred(function (dfd) {
            searchPrincipals({
              searchText: searchString,
              maxResults: o.maxSearchResults,
              principalType: o.type,
              async: true,
              webURL: o.webURL,
              completefunc: function (xData, status) {
                var resp = $(xData.responseXML), rows = [];
                // If searchString is part of the keyword [me],
                // then add <UserID>;#current user to the list
                // of suggestions
                if (String(o.meKeyword).indexOf(searchString.toLowerCase()) > -1) {
                  rows.push({
                    displayName: o.meKeywordLabel,
                    accountId: '<UserID/>',
                    accountName: o.meKeywordLabel,
                    accountType: 'User',
                    // needed attributes for autocomplete
                    value: o.meKeywordLabel,
                    label: o.meKeywordLabel
                  });
                }
                resp.find('PrincipalInfo').each(function () {
                  var thisEle = $(this), thisUser = {
                      displayName: thisEle.find('DisplayName').text(),
                      accountId: thisEle.find('UserInfoID').text(),
                      accountName: thisEle.find('AccountName').text(),
                      accountType: thisEle.find('PrincipalType').text(),
                      email: thisEle.find('Email').text(),
                      // needed attributes for autocomplete
                      value: thisEle.find('DisplayName').text(),
                      label: ''
                    };
                  // TODO: in the future, need to find a way to show type icon on the suggestions
                  // if (thisUser.accountType === "User") {
                  //
                  // thisUser.label = "<img src='/_layouts/images/CheckNames.gif' /> ";
                  //
                  // } else {
                  //
                  // thisUser.label = "<img src='/_layouts/images/ALLUSR.GIF' /> ";
                  //
                  // }
                  thisUser.label += thisUser.displayName;
                  rows.push(thisUser);
                });
                // If a suggestion filter was defined, call it now
                if (o.filterSuggestions) {
                  rows = o.filterSuggestions(rows);
                }
                dfd.resolveWith(xData, [
                  rows,
                  xData,
                  status
                ]);
              }
            });
          }).promise();
        };
        //end: o.getSearchResults()
        // If multiple user are allowed to be picked, then add style to
        // selected input area
        if (o.allowMultiples === true) {
          o.eleSelected.addClass('pt-pickSPUser-selected-multiple');
        }
        // Variable that store all search results
        var cache = {};
        // Add the AutoComplete functionality to the input field
        o.elePickInput.find('input[name=\'pickSPUserInputField\']').attr('placeholder', o.inputPlaceholder).autocomplete({
          minLength: o.minLength,
          appendTo: o.appendTo || o.elePickInput,
          source: function (request, response) {
            // If search term is in cache, return it now
            if (request.term in cache) {
              response(cache[request.term]);
              return;
            }
            cache[request.term] = [];
            // Search SP
            o.getSearchResults(request.term).then(function (rows) {
              cache[request.term].push.apply(cache[request.term], rows);
              response(cache[request.term]);
            });
          },
          //end:source()
          /**
           * Event bound to an autocomplete suggestion.
           *
           * @param {jQuery} ev   -   jQuery event.
           * @param {Object} u    -   An object containing the element generated above
           *                          by the <source> method that represents the person
           *                          that was selected.
           */
          select: function (ev, u) {
            // If we store only 1 user, then clear out the current values
            if (o.allowMultiples === false) {
              o.eleSelected.empty();  // Check if already displayed.
            } else if (o.isUserAlreadySelected(u.item.accountId, u.item.displayName)) {
              setTimeout(function () {
                ev.target.value = '';
              }, 50);
              return;
            }
            /**
             * Add the user to the list of selected user
             */
            var addToSelectionList = function () {
              var $newPersonUI = People.getUserHtmlElement(o, u.item.accountId, u.item.displayName).appendTo(o.eleSelected);
              // Store a copy of the user object on the UI
              $newPersonUI.data('pickspuser_object', u.item);
              People.storeListOfUsers(cntr);
              addHoverEffect(cntr.find('div.pt-pickSPUser-person-cntr'));
              // clear out the autocomplete box
              setTimeout(function () {
                ev.target.value = '';
              }, 50);
              if (o.allowMultiples === false) {
                o.elePickInput.hide();
              }
              // if a callback was defined, call it now
              if ($.isFunction(o.onPickUser)) {
                o.onPickUser.call(o.eleUserInput, $.extend({}, u.item));
              }
              // Triggere event
              ele.trigger($.Event('spwidget:peoplePickerAdd'), [
                o.eleUserInput,
                $.extend({}, u.item)
              ]);
            };
            // If the user id is NOT -1 (is resolved) or resolvePrincipals
            // is false, then add user to list now.
            if (u.item.accountId !== '-1' || !o.resolvePrincipals) {
              addToSelectionList();  // Else, let's resolve the user before we add them.
            } else {
              resolvePrincipals({ principalKeys: u.item.accountName }).then(function (xmlDoc) {
                // TODO: handle error conditions? (low risk of occuring)
                var principalInfo = $(xmlDoc).find('PrincipalInfo');
                // Get and set ID if only one user was returned.
                // See issue #42 for why we don't try to match on the value
                // that was searched.
                // https://github.com/purtuga/SPWidgets/issues/42
                principalInfo.each(function () {
                  var $thisPrincipalInfo = $(this);
                  if ($thisPrincipalInfo.find('Email').text() === u.item.email || $thisPrincipalInfo.find('DisplayName').text() === u.item.displayName) {
                    u.item.accountId = principalInfo.find('UserInfoID').text();
                    addToSelectionList();
                    return false;
                  }
                });
              });
            }
          }
        });
        //end:autocomplete
        // If showSelected if false, then hide the selected people area.
        if (!o.showSelected) {
          cntr.find('div.pt-pickSPUser-selected').css('display', 'none');
        }
        // Store the options for this call on the container and include a pointer
        // in the input field to this element
        cntr.data('pickSPUserContainerOpt', o);
        ele.data('pickSPUserContainer', cntr);
        // If the current input field has a value defined, then parse it
        // and display the currently defined values
        if (ele.val()) {
          o.addPeopleToList(ele.val(), true);
        }
        // call onCreate if defined
        if ($.isFunction(o.onCreate)) {
          o.onCreate.call(ele, ele);
        }
        // Trigger create event on this instance
        ele.trigger($.Event('spwidget:peoplePickerCreate'), [o.eleUserInput]);
        return this;
      });
    };
    // $.fn.pickSPUser()
    /**
     * Builds the html element that surrounds a user for display on the page.
     *
     * @param {Object} opt     -   The options object given to <jQuery.fn.pickSPUser()>
     * @param {String} id      -   The User's Sharepoint UID
     * @param {String} name    -   The User's name.
     *
     * @return {jQuery} Html element
     *
     */
    People.getUserHtmlElement = function (opt, id, name) {
      var ele = $(peoplePickerTemplate).find('.pt-pickSPUser-person').clone(1);
      ele.attr('data-pickSPUserID', id);
      ele.find('span.pt-person-name').append(name).end().attr('data-pickSPUserNAME', name);
      return ele;
    };
    // People.getUserHtmlElement()
    /**
     * Method is bound to the X (remove) button that appears when the one
     * hovers over the names curerntly displayed. Removes the user from
     * the UI and updates the input field to reflect what is currently
     * displayed.
     *
     * @param {Object} ele -   The HTML element from where this method was
     *                         called. Used to find both the div.pt-pickSPUser
     *                         overall parent element as well as the specific
     *                         .pt-pickSPUser-person element for the user that
     *                         was clicked on.
     *
     * @return {undefined}
     *
     */
    People.removeUser = function (ele) {
      var cntr = $(ele).closest('div.pt-pickSPUser'), o = cntr.data('pickSPUserContainerOpt'), $personUI = $(ele).closest('div.pt-pickSPUser-person'), personObj = $personUI.data('pickspuser_object'), doRemove = true;
      // If an onRemoveUser is defined, then call method
      // and capture response
      if ($.isFunction(o.onRemoveUser)) {
        o.onRemoveUser.call(o.ele, o.ele, $personUI, personObj);
      }
      if (doRemove === false) {
        return;
      }
      // remove user from the view
      $personUI.fadeOut('fast', function () {
        $(this).remove();
        People.storeListOfUsers(cntr);
      });
      // if AllowMultiple is false, then make the picker input visible
      if (o.allowMultiples === false) {
        o.elePickInput.show('fast', function () {
          o.elePickInput.find('input').focus();
        });
      }
      // trigger event
      o.eleUserInput.trigger($.Event('spwidget:peoplePickerRemove'), [
        o.eleUserInput,
        personObj
      ]);
      return;
    };
    // People.removeUser()
    /**
     * Method will look at the container that holds the currently selected
     * users and will populate the initial input field given to
     * <jQuery.fn.pickSPUser()> with a sting representing those users.
     *
     *
     * @param {Object} ele -   The HTML element from where this method was
     *                         called. Used to find both the div.pt-pickSPUser
     *                         overall parent element as well as the specific
     *                         .pt-pickSPUser-person element for the user that
     *                         was clicked on.
     *
     * @return {undefined}
     *
     */
    People.storeListOfUsers = function (ele, noEvents) {
      var cntr = $(ele).closest('div.pt-pickSPUser'), opt = cntr.data('pickSPUserContainerOpt'), newVal = '',
        // isDone: keep track of the user already selected,
        // so we don't add them twice to the input field.
        isDone = {};
      cntr.find('div.pt-pickSPUser-selected div.pt-pickSPUser-person').each(function () {
        var $this = $(this), thisUserString = $this.attr('data-pickSPUserID') + ';#' + $(this).attr('data-pickSPUserNAME');
        if (isDone[thisUserString]) {
          return;
        }
        isDone[thisUserString] = true;
        if (newVal) {
          newVal += ';#';
        }
        newVal += thisUserString;
      });
      opt.eleUserInput.val(newVal);
      if (!noEvents) {
        opt.eleUserInput.change();
      }
      return;
    };
    // People.storeListOfUsers()
    /**
     * Handles method actions given to $().pickSPUser()
     *
     * @param {String} type
     * @param {String} action
     * @param {Object} options
     *
     * @return {this}
     *
     */
    People.handleAction = function (type, action, options) {
      type = String(type).toLowerCase();
      action = String(action).toLowerCase();
      var o = $(this).data('pickSPUserContainer').data('pickSPUserContainerOpt'), ret = this;
      if (type === 'method') {
        switch (action) {
        case 'clear':
          o.eleUserInput.val('');
          o.eleSelected.empty();
          if (o.allowMultiples === false) {
            o.eleSelected.css('display', 'none');
            o.elePickInput.show();
          }
          break;
        case 'destroy':
          if ($(this).hasClass('hasPickSPUser')) {
            $(this).removeClass('hasPickSPUser').next('.pt-pickSPUser').remove().show().trigger('change');
          }
          break;
        case 'add':
          o.addPeopleToList(options);
          break;
        case 'remove':
          if (options) {
            var rmEle = o.eleSelected.find('div[data-pickspuserid=\'' + options + '\']');
            if (!rmEle.length) {
              rmEle = o.eleSelected.find('div[data-pickspusername=\'' + options.replace(/'/g, '\\\'') + '\']');
            }
            if (rmEle.length) {
              People.removeUser(rmEle);
            }
          }
          break;
        case 'getselected':
          ret = parseLookupFieldValue(o.eleUserInput.val());
          break;
        }
      }
      //end:type===method
      return ret;
    };
    // People.handleAction()
    peoplePicker.defaults = People.defaults;
    return peoplePicker;
  }(jquery, text_src_peoplePickerWidget_peoplePickerhtml, src_spapi_getSiteUrl, src_spapi_searchPrincipals, src_spapi_resolvePrincipals, src_sputils_parseLookupFieldValue, src_uiutils_addHoverEffect);
  text_src_filterPanelWidget_filterPanelhtml = '<div class="spwidget-filter" style="display: none"> <div class="spwidget-filter-column-cntr ui-widget-content"></div> <div class="spwidget-filter-button-cntr"> <button type="button" class="spwidget-button ui-priority-secondary" name="reset">Reset</button> <button type="button" class="spwidget-button" name="filter">Filter</button> </div> </div>';
  text_src_filterPanelWidget_filterPanelColumnhtml = '<div class="spwidget-column spwidget-type-{{type}}" data-spwidget_column_type="{{type}}" data-spwidget_list="{{list}}" data-spwidget_sp_type="{{sp_type}}" data-spwidget_sp_format="{{sp_format}}"> <div class="spwidget-filter-value-cntr"> <label>{{DisplayName}}</label> <div class="spwidget-filter-value-input"> __COLUMN__UI__ </div> </div> <div class="spwidget-filter-type-cntr" title="Match Options"> <select name="{{Name}}_type" class="spwidget-filter-type" tabindex="-1"> <option value="Contains">Contains</option> <option value="Eq" selected>Equal</option> <option value="Neq">Not Equal</option> <option value="IsNull">Is Blank</option> <option value="IsNotNull">Is Not Blank</option> __OTHER_FILTER_TYPES__ </select> <select name="{{Name}}_match" class="spwidget-match-type" tabindex="-1"> <option value="Or" selected>Any</option> <option value="And">All</option> </select> <select name="{{Name}}_order" class="spwidget-sort-order" tabindex="-1"> <option value="" selected>Sort</option> <option value="Asc">&#9650; Ascending</option> <option value="Des">&#9660; Descending</option> </select> </div> <div class="spwidget-column-actions"> <a style="display:none" href="javascript:" tabindex="-1" data-action="remove" class="spwidget-column-action"> <span class="ui-icon ui-icon-circle-close">remove</span> </a> <div class="spwidget-column-sort-actions"> <a href="javascript:" tabindex="-1" data-action="up" class="spwidget-column-action" title="Move up"> <span class="ui-icon ui-icon-circle-arrow-n">Move Up</span> </a> <a href="javascript:" tabindex="-1" data-action="down" class="spwidget-column-action" title="Move down"> <span class="ui-icon ui-icon-circle-arrow-s">Move Down</span> </a> </div> </div> </div>';
  text_src_filterPanelWidget_filterPanelChoiceFieldhtml = '<label> <input name="{{Name}}" title="{{DisplayName}}" type="checkbox" value="{{value}}" class="spwidget-input spwidget-filter-input"> {{value}} </label>';
  text_src_filterPanelWidget_filterPanelTextFieldhtml = '<div> <input name="{{Name}}" title="{{DisplayName}}" type="text" class="spwidget-input spwidget-filter-input"> <span class="spwidget-tooltip">{{tooltip}}</span> </div>';
  less_src_filterPanelWidget_filterPanel = undefined;
  src_filterPanelWidget_filterPanel = function ($, filterPanelTemplate, filterPanelColumnTemplate, filterPanelChoiceFieldTemplate, filterPanelTextFieldTemplate, getSiteUrl, getList, getListColumns, parseLookupFieldValue, fillTemplate, getCamlLogical, xmlEscape, lookupFieldWidget, peoplePickerWidget, dateFieldWidget, doesMsgHaveError, getMsgError) {
    var Filter = {}, filterPanel;
    /**
     * Default options.
     */
    Filter.defaults = {
      list: '',
      webURL: '',
      columns: ['Title'],
      textFieldTooltip: 'Use a semicolon to delimiter multiple keywords.',
      peopleFieldTooltip: 'Use [me] keyword to represent current user.',
      definedClass: 'spwidget-column-dirty',
      showFilterButton: true,
      showFilterButtonTop: true,
      filterButtonLabel: 'Filter',
      onFilterClick: null,
      onReady: null,
      onReset: null,
      ignoreKeywords: /^(of|and|a|an|to|by|the|or|from)$/i,
      delimeter: ';',
      height: null
    };
    /**
     * Given a container, this jQuery plugin will attach a user interface
     * that allows the user to define filter criteria for a list.
     *
     * @method filterPanel
     *
     * @param {Object}  options
     * @param {String}  options.list
     * @param {String}  [options.webURL=current site]
     * @param {Array}   [options.columns=['title']]
     * @param {String}  [options.textFieldTooltip='']
     * @param {String}  [options.definedClass='spwidget-column-dirty']
     * @param {Boolean} [options.showFilterButton=true]
     * @param {Boolean} [options.showFilterButtonTop=true]
     * @param {String}  [options.filterButtonLabel='Fitler']
     * @param {String}  [options.onFilterClick=null]
     * @param {String}  [options.onReady=null]
     * @param {String}  [options.ignoreKeywords=RegEx]
     * @param {String}  [options.delimeter=';']
     * @param {Integer}  [options.height=null]
     *
     * @return {jQuery} this
     *
     * METHODS
     *
     *  All methods must be executed on single element.
     *
     *  $(ele).SPFilterPanel("getFilter");
     *
     *      Returns an object with the filter information entered by the user.
     *
     *  $(ele).SPFilterPanel("setFilter", {column: { matchType: "eq", values: [ '1', '2' ]} });
     *
     *      Returns an object with the filter information entered by the user.
     *
     * $(ele).SPFilterPanel("destroy");
     *
     *      Removes the widget from the page.
     *
     */
    filterPanel = function (containers, options) {
      var arg = Array.prototype.slice.call(arguments, 1), $this = containers;
      // If input was a string, then must be a method.
      if (typeof options === 'string') {
        if (!$this.eq(0).hasClass('hasSPFilterPanel')) {
          return;
        }
        return function (ele) {
          // Get the instance object
          var Inst = ele.eq(0).find('div.spwidget-filter').data('SPFilterPanelInst'), method = options.toLowerCase(), response = Inst.$ele;
          switch (method) {
          // METHOD----------> getFilter
          //      Return: {Object}
          case 'getfilter':
            response = Filter.getFilterValues(Inst);
            break;
          // METHOD----------> setFilter("url param")
          //      Return: $ele
          case 'setfilter':
            Filter.setFilterValues(Inst, arg[1]);
            break;
          // METHOD----------> reset
          case 'reset':
            Filter.doResetFilter(Inst);
            break;
          // METHOD----------> destroy
          case 'destroy':
            Inst.$ele.removeClass('hasSPFilterPanel').empty();
            break;
          }
          //end: switch()
          return response;
        }($this);
      }
      //end: if(): options === string
      // --------------------------------
      // Build the plugin on each element
      // --------------------------------
      return $this.each(function () {
        var opt = $.extend({}, Filter.defaults, options),
          /**
           * @class Inst
           * Widget instance
           */
          Inst = {
            $ele: $(this),
            $ui: null,
            $uiFilterSortCntr: null,
            $uiFilterColumnCntr: null,
            $uiSortButtons: null,
            opt: opt
          };
        if (!opt.webURL) {
          opt.webURL = getSiteUrl();
        }
        /**
         * Shows the column sort order UI on the panel.
         */
        Inst.showSortOrder = function () {
          Inst.$uiFilterColumnCntr.hide();
          Inst.$uiFilterSortCntr.show();
        };
        /**
         * Shows the column filters UI on the panel.
         */
        Inst.showFilterColumns = function () {
          Inst.$uiFilterSortCntr.hide();
          Inst.$uiFilterColumnCntr.show();
        };
        /**
         * Builds the widget in the container element.
         *
         * @return {jQuery.Deferred}
         */
        Inst.buildWidget = function () {
          return $.Deferred(function (dfd) {
            // Get List Definition
            getListColumns({
              listName: opt.list,
              cacheXML: true,
              async: true,
              webURL: opt.webURL
            }).then(function (colsDef) {
              var columns = '', colUI = $.trim(filterPanelColumnTemplate);
              // Insert the UI into the page and set
              // pointer ($ui) to it.
              Inst.$ui = $($.trim(filterPanelTemplate)).appendTo(Inst.$ele.empty().addClass('hasSPFilterPanel'));
              Inst.$uiFilterColumnCntr = Inst.$ui.find('div.spwidget-filter-column-cntr');
              Inst.$uiFilterSortCntr = Inst.$ui.find('div.spwidget-filter-sort-cntr');
              // set fixed height if set on input
              if (Inst.opt.height) {
                Inst.$uiFilterColumnCntr.css('height', Inst.opt.height);
              }
              // Loop through list of columns to display and
              // build the UI for them.
              $.each(Inst.opt.columns, function (i, v) {
                // find column in the list definition
                var
                  // $thisCol = $list
                  // .find(
                  // "Field[DisplayName='" +
                  // v + "']" ),
                  $thisCol = colsDef.getColumn(v), thisColUI = colUI, inputUI = '', model = null;
                if (!$thisCol) {
                  return;
                }
                // Now that we are sure we have a COl. definition,
                // populate the model for this column
                model = {
                  type: null,
                  otherFilterTypes: '',
                  sp_type: $thisCol.Type,
                  sp_format: $thisCol.Format,
                  Name: $thisCol.Name,
                  DisplayName: $thisCol.DisplayName
                };
                // Build the column ui based on its type
                switch ($thisCol.Type) {
                // CHOICE: Show checkboxes allowing user to select multiple
                case 'Choice':
                case 'MultiChoice':
                  $thisCol.getColumnValues().forEach(function (v) {
                    inputUI += fillTemplate($.trim(filterPanelChoiceFieldTemplate), {
                      DisplayName: $thisCol.DisplayName,
                      Name: $thisCol.Name,
                      value: v
                    });
                  });
                  thisColUI = thisColUI.replace(/__COLUMN__UI__/, inputUI).replace(/__OTHER_FILTER_TYPES__/, '');
                  thisColUI = fillTemplate(thisColUI, {
                    DisplayName: $thisCol.DisplayName,
                    type: 'choice',
                    Name: $thisCol.Name
                  });
                  break;
                // Attachments
                // Is a Boolean type of field.
                case 'Attachments':
                  model.type = 'boolean';
                  model.input_ui = '<select name="' + model.Name + '" class="spwidget-input spwidget-filter-input">' + '<option value=""></option>' + '<option value="1">Yes</option>' + '<option value="0">No</option>' + '</select>';
                  thisColUI = fillTemplate(thisColUI.replace(/__COLUMN__UI__/, model.input_ui).replace(/__OTHER_FILTER_TYPES__/, ''), model);
                  break;
                //============================================
                // === all types below use the input field ===
                //============================================
                // DEFAULT: Show as a text field
                default:
                  // lets set the type on the Column
                  switch ($thisCol.Type) {
                  case 'Lookup':
                  case 'LookupMulti':
                    if (model.type === null) {
                      model.type = 'lookup';
                      model.list = $thisCol.List;
                      if (model.list === 'Self') {
                        model.list = $thisCol.getList().Title;
                      }
                    }
                    break;
                  case 'User':
                  case 'UserMulti':
                    if (model.type === null) {
                      model.type = 'people';
                    }
                    break;
                  // COUNTER,
                  // Number
                  // Insert additional filter types
                  case 'Counter':
                  case 'Number':
                  case 'RatingCount':
                  case 'Likes':
                    if (model.type === null) {
                      model.type = 'text';
                      model.otherFilterTypes = '<option value="Gt">Greater Than</option>' + '<option value="Lt">Less Than</option>';
                    }
                    break;
                  // Date and Time: Inser additional filter types
                  // We control which type of widget is displayed
                  // by ensuring that the sp_format is set correctly
                  // here.
                  case 'DateTime':
                    if (model.type === null) {
                      model.type = 'date';
                      model.otherFilterTypes = '<option value="Gt">After</option>' + '<option value="Lt">Before</option>';
                      model.sp_format = $thisCol.Format !== 'DateOnly' ? 'DateTime' : 'DateOnly';
                    }
                    break;
                  default:
                    model.type = 'text';
                    break;
                  }
                  //end: switch(): set the model.type only
                  // BUILD the input field for this.
                  inputUI = $.trim(filterPanelTextFieldTemplate);
                  thisColUI = thisColUI.replace(/__COLUMN__UI__/, inputUI).replace(/__OTHER_FILTER_TYPES__/, model.otherFilterTypes);
                  thisColUI = fillTemplate(thisColUI, $.extend(model, {
                    DisplayName: $thisCol.DisplayName,
                    Name: $thisCol.Name,
                    tooltip: Inst.opt.textFieldTooltip
                  }));
                  break;
                }
                //end: switch()
                // Add Column UI to list of columns
                columns += thisColUI;
              });
              //end: .each() - column
              // Insert the columns into the UI
              Inst.$uiFilterColumnCntr.html(columns);
              // Setup Lookup field
              Inst.$ele.find('div.spwidget-type-lookup input').each(function () {
                var $field = $(this);
                lookupFieldWidget($field, {
                  list: $field.closest('div.spwidget-column').data('spwidget_list'),
                  template: '<div>{{Title}} <span class="spwidgets-item-remove">[x]</span></div>',
                  listTemplate: '{{Title}}',
                  allowMultiples: true,
                  readOnly: false,
                  filter: '',
                  showSelector: true
                });
                $field.parent().find('.spwidget-tooltip').remove();
              });
              // Setup PEOPLE fields
              Inst.$ele.find('div.spwidget-type-people input').each(function () {
                var $field = $(this), colDef = colsDef.getColumn($field.attr('name')), peopleType = 'User';
                if (colDef.UserSelectionMode !== 'PeopleOnly') {
                  peopleType = 'All';
                }
                peoplePickerWidget($field, {
                  allowMultiple: true,
                  type: peopleType
                });
                $field.parent().find('.spwidget-tooltip').html(Inst.opt.peopleFieldTooltip);
              });
              // Setup DATE fields
              Inst.$ele.find('div.spwidget-type-date').each(function () {
                var $column = $(this), $field = $column.find('input');
                dateFieldWidget($field, {
                  allowMultiples: true,
                  showTimepicker: $column.data('spwidget_sp_format') === 'DateTime' ? true : false
                });
                $column.find('.spwidget-tooltip').remove();
                $column.find('select.spwidget-filter-type').val('Eq').find('option[value=\'Contains\']').remove();
                return this;
              });
              // Setup the Boolean fields
              Inst.$ele.find('.spwidget-type-boolean div.spwidget-filter-type-cntr').css('display', 'none');
              // Setup the Button on the UI (if applicable)
              if (Inst.opt.showFilterButton || Inst.opt.showFilterButtonTop) {
                Inst.$ui.find('div.spwidget-filter-button-cntr').each(function () {
                  var $btnCntr = $(this), $btn = $();
                  // If Top button is true, clone adn insert at top
                  if (Inst.opt.showFilterButtonTop) {
                    $btn = $btn.add($btnCntr.clone(true)).prependTo(Inst.$ui);
                  }
                  // If BOttom Button is true, then added to
                  // group selection... if not, then remove it.
                  if (Inst.opt.showFilterButton) {
                    $btn = $btn.add($btnCntr);
                  } else {
                    $btnCntr.remove();
                  }
                  // Setup Filter button
                  $btn.find('button[name=\'filter\']').button({
                    icons: { primary: 'ui-icon-search' },
                    label: Inst.opt.filterButtonLabel
                  }).on('click', Filter.onFilterButtonClick);
                  // Setup Filter button
                  $btn.find('button[name=\'reset\']').button({
                    icons: { primary: 'ui-icon-arrowreturnthick-1-n' },
                    text: false
                  }).on('click', function () {
                    Filter.doResetFilter(Inst);
                    return this;
                  });
                });  // Else, remove button container
              } else {
                Inst.$ui.find('div.spwidget-filter-button-cntr').remove();
              }
              // Bind events
              Inst.$ui.on('change.SPWidgets.SPFilterPanel', 'select.spwidget-filter-type,select.spwidget-sort-order', Filter.onFilterTypeChange).on('click.SPWidgets.SPFilterpanel', 'a.spwidget-column-action', Filter.onFilterTypeChange);
              // If we have a DefinedClass specified, then
              // listen to change events
              if (Inst.opt.definedClass !== '') {
                Inst.$ui.on('change.SPWidgets.SPFilterPanel', '.spwidget-filter-input', Filter.onFilterInputChange);
              }
              // Store the Widget Inst object in the UI
              Inst.$ui.data('SPFilterPanelInst', Inst);
              // If a onReady callback was defined, then
              // execute it now
              if ($.isFunction(Inst.opt.onReady)) {
                Inst.opt.onReady.call(Inst.$ele, options);
              }
              // Make the UI visible
              Inst.$ui.fadeIn().promise().then(function () {
                $(this).css('display', '');
                dfd.resolve();
              });
            })  //end: .then()
                // IF getting the List definition fails, then display error
                // in the widget container element.
.fail(function () {
              var $msg = this;
              Inst.$ele.html('<div class="ui-state-error">Unable to retrieve list information. ' + getMsgError($msg) + '</div>');
              dfd.reject();
            });
          }).promise();
        };
        //end: Inst.buildWidget()
        // A few validations
        if (Inst.opt.ignoreKeywords && !Inst.opt.ignoreKeywords instanceof RegExp) {
          Inst.opt.ignoreKeywords = /Inst.opt.ignoreKeywords/i;
        }
        // build the widget
        Inst.buildWidget();
        return this;
      });  //end: return()
    };
    //end: $.fn.SPFilterPanel()
    /**
     * Triggered when the change event is triggered on the
     * input elements that collect data from the user.
     * Sets the dirty class on the column if one is defined.
     *
     * @param {jQuery.Event} ev
     *
     * @return {HTMLElement} this
     */
    Filter.onFilterInputChange = function () {
      var $input = $(this), $cntr = $input.closest('div.spwidget-filter-value-input'), $col = $cntr.closest('div.spwidget-column'), val = $input.val(), Inst = $cntr.closest('div.spwidget-filter').data('SPFilterPanelInst');
      if ($col.is('.spwidget-type-choice')) {
        if (!$cntr.find('.spwidget-filter-input:checked').length) {
          val = '';
        }
      }
      if (Filter.isColumnDirty($col)) {
        $col.addClass(Inst.opt.definedClass);
      } else {
        $col.removeClass(Inst.opt.definedClass);
      }
      return this;
    };
    //end: Filter.onFilterInputChange()
    /**
     * Bound to the $ui. Listen for changes in the filter type
     * select element.
     *
     * @param {jQuery.Event} ev
     *
     * return {jQuery} this
     */
    Filter.onFilterTypeChange = function () {
      var $ele = $(this), $col = $ele.closest('div.spwidget-column'), $logicalType = $col.find('div.spwidget-filter-type-cntr select.spwidget-match-type'), $colValCntr = $col.find('div.spwidget-filter-value-cntr'), $colInput = $colValCntr.find('.spwidget-input'), inputVal = '', eleValue = $ele.val(), Inst = $ele.closest('div.spwidget-filter').data('SPFilterPanelInst');
      // If its the sort column, then show/hide order buttons
      if ($ele.is('select.spwidget-sort-order')) {
        if ($ele.val()) {
          $col.addClass('spwidget-has-sort-order');
          $col.addClass(Inst.opt.definedClass);
        } else {
          $col.removeClass('spwidget-has-sort-order');
          // revove dirty flag if no value set
          if (!Filter.isColumnDirty($col)) {
            $col.removeClass(Inst.opt.definedClass);
          }
        }
        return;
      }
      // IF its a column action, then move the column around or close it
      if ($ele.is('a.spwidget-column-action')) {
        inputVal = $ele.data('action');
        if (inputVal === 'up' || inputVal === 'down') {
          Filter.moveColumn($col, inputVal === 'up' ? true : false);
        }
        return;
      }
      // ELSE, must be one of the Filter Type dropdowns.
      if (eleValue === 'IsNull' || eleValue === 'IsNotNull') {
        $colValCntr.addClass('spwidget-disabled');
        $colInput.attr('disabled', 'disabled');
        $logicalType.attr('disabled', 'disabled');
        $col.addClass(Inst.opt.definedClass);
      } else {
        $colValCntr.removeClass('spwidget-disabled');
        $colInput.removeAttr('disabled', 'disabled');
        $logicalType.removeAttr('disabled');
        // Remove the higlight class from the column if
        // no value is defined for it. For Checkboxes (choice)
        // we need to first grab the checkboxes and then see
        // if they are checked.
        if (!Filter.isColumnDirty($col)) {
          $col.removeClass(Inst.opt.definedClass);
        }
      }
      return this;
    };
    //end: Filter.onFilterTypeChange()
    /**
     * Calls the user defined function when user clicks the filter button.
     *
     * @param {jQuery.Event} ev
     *
     * @return {HTMLElement} this
     */
    Filter.onFilterButtonClick = function () {
      var Inst = $(this).closest('div.spwidget-filter').data('SPFilterPanelInst'), filters = null;
      if ($.isFunction(Inst.opt.onFilterClick)) {
        filters = Filter.getFilterValues(Inst);
        Inst.opt.onFilterClick.call(Inst.$ele, filters);
      }
      return this;
    };
    //end: Filter.onFilterButtonClick()
    /**
     * Resets the filter panel, by removing all filters
     * defined from the form.
     *
     * @param {Object} Inst
     *      The widget instance object
     *
     * @return {Object} the instance object
     */
    Filter.doResetFilter = function (Inst) {
      if ($.isFunction(Inst.onReset)) {
        if (Inst.onReset.call(Inst.$ele, Filter.getFilterValues(Inst)) === true) {
          return Inst;
        }
      }
      Inst.$ui.find('div[data-spwidget_column_type=\'text\'] input').val('').end()  // reset checkboxes for CHOICE columns
.find('div[data-spwidget_column_type=\'choice\'] input').prop('checked', false).end()  // reset dropdown boxes
.find('div[data-spwidget_column_type=\'boolean\'] .spwidget-filter-value-input select').val('');
      // reset date fields
      dateFieldWidget(Inst.$ui.find('.hasSPDateField'), 'reset');
      // reset people fields
      peoplePickerWidget(Inst.$ui.find('.hasPickSPUser'), 'method', 'clear');
      // reset lookup fields
      lookupFieldWidget(Inst.$ui.find('.hasLookupSPField'), 'method', 'clear');
      // Remove the Defined class
      if (Inst.opt.definedClass !== '') {
        Inst.$ui.find('.' + Inst.opt.definedClass).removeClass(Inst.opt.definedClass);
      }
      // Reset any IsNull and IsNotNull filters
      Inst.$ui.find('select.spwidget-filter-type').each(function () {
        var $ele = $(this), value = $ele.val();
        if (value === 'IsNull' || value === 'IsNotNull') {
          $ele.val('Eq');
          $ele.change();
        }
      });
      // reset the sort Order column
      Inst.$ui.find('select.spwidget-sort-order').val('').change();
      return Inst;
    };
    // Filter.doResetFilter()
    /**
     * Generates the filters from the values entered by the user.
     *
     * @param {SPFilterPanel.Instance} Inst
     *      The Instance object generated by the $().SPFilterPanel()
     *
     * @return {filterPanel~filter}
     *      An object with the filter information. See below for the
     *      structured of the object
     *
     * @example
     *
     *      Filter.getFilterValues(instObject);
     *
     *      {
     *          CAMLQuery: 'string with query wrapped in an <And> aggregate',
     *          URLParams: 'String with query in URL params style',
     *          filters: {
     *              columnInternalName: {
     *                  matchType: 'Eq',
     *                  values: [
     *                      'filter value 1',
     *                      'filter value 2',
     *                      etc...
     *                  ],
     *                  CAMLQuery: 'string with query wrapped in an <Or> aggregate',
     *                  URLParams: 'string with query in URL param style',
     *                  count: 0,
     *                  columns: []
     *              }
     *          },
     *          count: 2 // number of filters created
     *      }
     *
     *
     */
    Filter.getFilterValues = function (Inst) {
      var
        /**
         * Filter panel user defined criteria
         *
         * @typedef {Object} filterPanel~filter
         *
         * @property {String} CAMLQuery
         * @property {String} CAMLOrderBy
         * @property {String} URLParams
         * @property {Object} filters
         * @property {Number} count
         * @property {Array<String>} columns
         *
         */
        filters = {
          CAMLQuery: '',
          CAMLOrderBy: '',
          URLParams: '',
          filters: {},
          count: 0,
          columns: []
        }, $cols = Inst.$ui.find('div.spwidget-column'), colFilters = [], orderByValues = '';
      /**
       * Returns a CAMLQuery for the set of individual column filters.
       * USed in fields of type Choice or Text.
       *
       * @param {Object} colFilterObj
       *          The object for the individual column
       *
       * @return {String} caml query
       *
       */
      function getColumnCAMLQuery(colFilterObj) {
        return getCamlLogical({
          type: colFilterObj.logicalType,
          values: colFilterObj.values,
          onEachValue: function (filterVal) {
            return '<' + colFilterObj.matchType + '><FieldRef Name=\'' + colFilterObj.columnName + '\' /><Value Type=\'Text\'>' + xmlEscape.escape(filterVal) + '</Value></' + colFilterObj.matchType + '>';
          }
        });
      }
      //end: getColumnCAMLQuery()
      // Loop through each column and build the data
      $cols.each(function (i, v) {
        var $thisCol = $(v), $input = $thisCol.find('.spwidget-input'), colName = $input.attr('name'), thisColFilter = new Filter.ColumnFilter({
            columnName: colName,
            matchType: $thisCol.find('select.spwidget-filter-type').val(),
            logicalType: $thisCol.find('select.spwidget-match-type').val(),
            sortOrder: $thisCol.find('select.spwidget-sort-order').val()
          }), colType = $thisCol.data('spwidget_column_type'), thisColUrlParam = {};
        // If this columns has sort set, add it to list
        if (thisColFilter.sortOrder) {
          thisColFilter.CAMLOrderBy += '<FieldRef Name="' + colName + '" Ascending="' + (thisColFilter.sortOrder === 'Asc' ? 'TRUE"' : 'FALSE"') + '/>';
        }
        // If the match type is IsNull or IsNotNull, then
        // build the match now... don't need to know which type
        // of column for these.
        if (thisColFilter.matchType === 'IsNull' || thisColFilter.matchType === 'IsNotNull') {
          thisColFilter.CAMLQuery = '<' + thisColFilter.matchType + '><FieldRef Name=\'' + colName + '\' /></' + thisColFilter.matchType + '>';
          thisColFilter.count += 1;  // ELSE, process the column type
        } else {
          // Process column type user input
          switch (colType) {
          // -------------------- CHOICE COLUMNS
          case 'choice':
          case 'multichoice':
            $input.each(function () {
              var $checkbox = $(this), checkboxVal = $checkbox.val();
              if ($checkbox.is(':checked')) {
                thisColFilter.values.push(checkboxVal);
              }
            });
            if (thisColFilter.values.length) {
              thisColFilter.count = thisColFilter.values.length;
              thisColFilter.CAMLQuery = getColumnCAMLQuery(thisColFilter);
            }
            break;
          // -------------------- LOOKUP COLUMNS
          // -------------------- PEOPLE COLUMNS
          case 'lookup':
          case 'people':
            (function () {
              var lookupIDs = [];
              $input.each(function () {
                var $lookup = $(this), lookupVals = parseLookupFieldValue($lookup.val()), i, j;
                for (i = 0, j = lookupVals.length; i < j; i++) {
                  if (lookupVals[i].id) {
                    thisColFilter.values.push(lookupVals[i].id + ';#' + lookupVals[i].title);
                    lookupIDs.push(lookupVals[i].id);
                  }
                }
              });
              if (thisColFilter.values.length) {
                thisColFilter.count = thisColFilter.values.length;
                thisColFilter.CAMLQuery = getCamlLogical({
                  type: thisColFilter.logicalType,
                  values: lookupIDs,
                  onEachValue: function (filterVal) {
                    return '<' + thisColFilter.matchType + '><FieldRef Name=\'' + thisColFilter.columnName + '\' LookupId=\'True\'/><Value Type=\'Lookup\'>' + filterVal + '</Value></' + thisColFilter.matchType + '>';
                  }
                });
              }
            }());
            break;
          // -------------------- DATE FIELDS
          case 'date':
            $input.each(function () {
              var dtObj = dateFieldWidget($input, 'getDate');
              if (dtObj.dates.length) {
                thisColFilter.values = dtObj.dates;
                thisColFilter.count = thisColFilter.values.length;
                thisColFilter.CAMLQuery = getCamlLogical({
                  type: thisColFilter.logicalType,
                  values: thisColFilter.values,
                  onEachValue: function (filterVal) {
                    return '<' + thisColFilter.matchType + '><FieldRef Name=\'' + thisColFilter.columnName + '\'/><Value Type=\'DateTime\'>' + filterVal + '</Value></' + thisColFilter.matchType + '>';
                  }
                });
              }
              return false;
            });
            break;
          // -------------------- TEXT COLUMNS
          case 'text':
          case 'boolean':
            // ELSE, if user entered text, then parse it
            if (String($.trim($input.val())).length) {
              (function () {
                var keywords = $input.val().split(Inst.opt.delimeter), i, j, thisKeyword;
                // Loop thorugh all keywords.
                for (i = 0, j = keywords.length; i < j; i++) {
                  thisKeyword = $.trim(keywords[i]);
                  if (!Inst.opt.ignoreKeywords.test(thisKeyword) && thisKeyword) {
                    thisColFilter.values.push(thisKeyword);
                  }
                }
                thisColFilter.CAMLQuery = getColumnCAMLQuery(thisColFilter);
                thisColFilter.count = thisColFilter.values.length;
              }());
            }
            break;
          }  //end: switch() - type of column
        }
        //end if()
        // If filters where built for this column, then add it to the
        // list of column that the user entered values for.
        if (thisColFilter.count > 0 || thisColFilter.CAMLOrderBy) {
          thisColUrlParam[colName] = {};
          // If OrderBY value were defined for this column, then add it
          // to overall filter
          if (thisColFilter.CAMLOrderBy) {
            orderByValues += thisColFilter.CAMLOrderBy;
            thisColUrlParam[colName].sortOrder = thisColFilter.sortOrder;
          }
          // If we have a filter defined for this column, then
          // prepare it for the overall query.
          if (thisColFilter.count > 0) {
            colFilters.push(thisColFilter.CAMLQuery);
            filters.count += thisColFilter.count;
            filters.filters[colName] = thisColFilter;
            // Create the URLParams for this column filter value
            thisColUrlParam[colName].matchType = thisColFilter.matchType;
            thisColUrlParam[colName].logicalType = thisColFilter.logicalType;
            thisColUrlParam[colName].values = thisColFilter.values;
          }
          // If this column has either a Filter or was set as a sort field, then
          // add it to the list of columns
          if (thisColFilter.CAMLOrderBy || thisColFilter.count > 0) {
            filters.columns.push(thisColFilter.columnName);
          }
          thisColFilter.URLParams = $.param(thisColUrlParam, false);
          // Add this column's URL params to the overall filter value
          if (filters.URLParams !== '') {
            filters.URLParams += '&';
          }
          filters.URLParams += thisColFilter.URLParams;
        }
      });
      // Build the CAMLQuery
      if (filters.count > 1) {
        filters.CAMLQuery = getCamlLogical({
          type: 'AND',
          values: colFilters
        });
      } else if (filters.count === 1) {
        filters.CAMLQuery = colFilters[0];
      }
      // If we have OrderBy values, add it on to Filter CAML
      if (orderByValues) {
        filters.CAMLOrderBy += '<OrderBy>' + orderByValues + '</OrderBy>';
      }
      return filters;
    };
    // Filter.getFilterValues()
    /**
     * Clears the current panel and populates it with the
     * filter criteria defined on the input object
     *
     * @param {Object} Inst
     *      The instance object for the widget on the page
     * @param {String} filters
     *      An object with the column criteria to be set.
     *      format of object:
     *          {
     *              columnInternalName: {
     *                  matchType: "",
     *                  values: [
     *                      'value 1',
     *                      'value 2'
     *                  ]
     *              }
     *          }
     *
     * @return {Object} Inst
     */
    Filter.setFilterValues = function (Inst, filters) {
      // If filters is not an object or is an empty object, exit
      if (typeof filters !== 'object' || $.isEmptyObject(filters)) {
        return Inst;
      }
      Filter.doResetFilter(Inst);
      $.each(filters, function (column, filter) {
        var $input = Inst.$ui.find('.spwidget-filter-input[name=\'' + column + '\']'), $colUI = $input.closest('div.spwidget-column'), type = $colUI.data('spwidget_column_type'), $match = $colUI.find('select[name=\'' + column + '_type\']'), $logicalType = $colUI.find('div.spwidget-filter-type-cntr select.spwidget-match-type'), $sortOrder = $colUI.find('select.spwidget-sort-order'), thisFilter = new Filter.ColumnFilter();
        $.extend(thisFilter, filter);
        // If we have a matchType or logicalType, then set it
        if (type !== 'boolean') {
          if (thisFilter.matchType && type !== 'boolean') {
            $match.val(thisFilter.matchType);
          }
          if (thisFilter.logicalType) {
            $logicalType.val(thisFilter.logicalType);
          }
        }
        // if match type is IsNull or IsNotNull, then no need to set column value
        if (type === 'boolean' || filter.matchType !== 'IsNull' && filter.matchType !== 'IsNotNull') {
          // Populate the values
          switch (type) {
          case 'text':
          case 'boolean':
            if (thisFilter.values instanceof Array) {
              $input.val(thisFilter.values.join(Inst.opt.delimeter));
            } else {
              $input.val(thisFilter.values);
            }
            break;
          case 'choice':
          case 'multichoice':
            $.each(thisFilter.values, function (i, colVal) {
              $input.filter('[value=\'' + colVal + '\']').prop('checked', true);
            });
            break;
          case 'lookup':
            lookupFieldWidget($input, 'method', 'add', thisFilter.values.join(';#'));
            break;
          case 'people':
            peoplePickerWidget($input, 'method', 'add', thisFilter.values.join(';#'));
            break;
          case 'date':
            // If dateTime value, then let SPDateField parse values
            if ($colUI.data('spwidget_sp_format') === 'DateTime') {
              dateFieldWidget($input, 'setDate', thisFilter.values);  // Regular dates - Provide format input
            } else {
              dateFieldWidget($input, 'setDate', thisFilter.values, 'yy-mm-dd');
            }
            break;
          }  // ELSE: Must have been IsNull or IsNotNull. trigger change
             // event on dropdown so that column can be properly highlighted.
        } else {
          $match.change();
        }
        //end: if()
        // if we have a sort order, then set it now
        if (thisFilter.sortOrder) {
          // Ascending
          if (String(thisFilter.sortOrder).toLowerCase() === 'asc') {
            $sortOrder.val('Asc');
          } else {
            $sortOrder.val('Des');
          }
        }
        $sortOrder.change();
        $input.change();
      });
      //end: each(): thisFilter
      return Inst;
    };
    //end: Filter.setFilterValues()
    /**
     * Create a new instance of a Column object.
     *
     * @constructor
     *
     * @param {Object} inst
     *      The initial object of values
     *
     * @return {Filter.ColumnFilter}
     *
     */
    Filter.ColumnFilter = function (inst) {
      var Column = function () {
        }, newCol = new Column();
      if (typeof inst !== 'object') {
        inst = {};
      }
      newCol.columnName = inst.columnName || '';
      newCol.matchType = inst.matchType || '';
      newCol.logicalType = inst.logicalType || '';
      newCol.sortOrder = inst.sortOrder || '';
      newCol.values = inst.values || [];
      newCol.CAMLQuery = inst.CAMLQuery || '';
      newCol.CAMLOrderBy = inst.CAMLOrderBy || '';
      newCol.URLParams = inst.URLParams || '';
      newCol.count = inst.count || 0;
      return newCol;
    };
    //end: ColumnFilter()
    /**
     * Moves a column up or down among the other columns
     *
     * @param {jQuery} $col
     * @param {Boolean} [moveUp=false]
     *
     */
    Filter.moveColumn = function ($col, moveUp) {
      var $allCols = $col.parent().children(), total = $allCols.length, colIndex = $allCols.index($col);
      if (moveUp && colIndex === 0) {
        return;
      }
      if (!moveUp && colIndex + 1 === total) {
        return;
      }
      if (moveUp) {
        $col.insertBefore($col.prev());
      } else {
        $col.insertAfter($col.next());
      }
    };
    /**
     * Returns a boolean indicating whether the column is dirty or not.
     *
     * @param {jQuery} $col
     *
     * @return {Boolean}
     */
    Filter.isColumnDirty = function ($col) {
      var response = false, colType = $col.data('spwidget_column_type'), $colInput = $col.find('.spwidget-input');
      // Lets check the value of the field first.
      if (colType === 'choice' || colType === 'multichoice') {
        $colInput.filter(':checkbox').each(function () {
          var $this = $(this);
          if ($this.is(':checked')) {
            response = true;
            return false;
          }
        });
      } else if ($colInput.val()) {
        response = true;
      }
      // If response is still false, lets check on the select fields
      // that can still impact column definition
      if (!response) {
        $colInput = $col.find('select.spwidget-sort-order');
        if ($colInput.val()) {
          response = true;
        }
      }
      return response;
    };
    filterPanel.defaults = Filter.defaults;
    return filterPanel;
  }(jquery, text_src_filterPanelWidget_filterPanelhtml, text_src_filterPanelWidget_filterPanelColumnhtml, text_src_filterPanelWidget_filterPanelChoiceFieldhtml, text_src_filterPanelWidget_filterPanelTextFieldhtml, src_spapi_getSiteUrl, src_spapi_getList, src_spapi_getListColumns, src_sputils_parseLookupFieldValue, src_sputils_fillTemplate, src_sputils_getCamlLogical, src_sputils_xmlEscape, src_lookupFieldWidget_lookupField, src_peoplePickerWidget_peoplePicker, src_dateFieldWidget_dateField, src_sputils_doesMsgHaveError, src_sputils_getMsgError);
  text_src_uploadWidget_uploadhtml = '<div class="SPControlUploadUI spcontrolupload"> <div class="mainContainer"> <div class="buttonPane ui-state-default"> <div class="upload_button"> Upload </div> </div> <div class="iFrameWindow ui-state-default"> <iframe name="SPControlUploadUI" frameborder="0" scrollbars="yes" scrolling="yes"></iframe> </div> <div class="loadingOverlay ui-widget-content"> <div class="loadingOverlayMsg"></div> </div> <div class="spwidget-success-cntr ui-widget-content"> <div class="spwidget-msg-cntr"> <span class="spwidget-msg">Upload Successful!</span> <span class="spwidget-close">x</span> </div> </div> <div class="spwidget-error-cntr ui-state-error"> <div class="spwidget-msg-cntr"> <span class="spwidget-msg">Error</span> <span class="spwidget-close">x</span> </div> </div> </div> </div> <div id="SPControlUploadModUI" style="position:   absolute;\r\n        width:      99.9%;\r\n        height:     99.9%;\r\n        left:       0px;\r\n        top:        0px;\r\n        padding-left:       .5em;\r\n        background-color:   white"> <div class="SPControlUploadModUIFileSelected" style="background-position: left center;\r\n        background-repeat: no-repeat;\r\n        background-image: url(\'/_layouts/images/urn-content-classes-smartfolder16.gif\');\r\n        padding: 0.5em 2em">Select...</div> </div>';
  src_sputils_getSPVersion = function () {
    /* global SP, _spPageContextInfo */
    /**
     * Returns the SharePoint version number. This is accomplished by
     * looking for  the SP namespace and if it is define, parsing the
     * SP.ClientSchemeversions value.
     *
     * @param {Boolean} returnExternal
     *          If true, then the external version (ex. 2007, 2010) is
     *          returned. Default is to return the internal version number
     *          (ex. 12, 14)
     *
     * @return {String}
     *
     */
    var getSPVersion = function getSPVersion(returnExternal) {
      // Some approaches below taken from:
      // http://sharepoint.stackexchange.com/questions/74978/can-i-tell-what-version-of-sharepoint-is-being-used-from-javascript
      var versionMap = {
          12: '2007',
          14: '2010',
          15: '2013'
        }, version = 12, foundIt = false;
      // If the SP variable is defined, then its at least SP2010
      if (typeof SP !== 'undefined') {
        version = 14;
        if (SP.ClientSchemaVersions) {
          if (SP.ClientSchemaVersions.currentVersion) {
            version = parseInt(SP.ClientSchemaVersions.currentVersion);
            foundIt = true;
          }
        }
        if (!foundIt && typeof _spPageContextInfo !== 'undefined') {
          version = parseInt(_spPageContextInfo.webUIVersion);
          if (version === 4) {
            version = 14;
          }
        }
      }
      // TODO: implement method detailed by Jeremy Thake: http://www.jeremythake.com/2013/08/get-sharepoint-version-number-of-your-platform-quickly/
      // Queries: /_vti_pvt/service.cnf ... Works in SP2010 / 2013, 2007 as well.
      // OUTPUT:
      //      vti_encoding:SR|utf8-nl
      //      ti_extenderversion:SR|16.0.0.1216
      if (returnExternal) {
        version = versionMap[version] || version;
      }
      return version;
    };
    //end: getSPVersion();
    return getSPVersion;
  }();
  less_src_uploadWidget_upload = undefined;
  src_uploadWidget_upload = function ($, uploadTemplate, getList, getListItems, getSiteUrl, getSPVersion) {
    /**
     * jQuery plugin that interacts with Sharepoint built in Upload.aspx through an iframe
     * to provide to the user an upload UI without leaving actually leaving the page, thus
     * simulating an ajax file upload interaction.
     * Currently used to upload files to a Document Library with out having the user go
     * through the many SP pages and without having to leave the user's current page
     */
    var Upload = {}, upload;
    /**
     * @property {Boolean} Tracks if the CSS injection into the page has been done.
     */
    Upload.isInitDone = false;
    /**
     * Defaults
     */
    Upload.defaults = {
      listName: '',
      folderPath: '',
      uploadDonePage: '',
      onPageChange: null,
      onUploadDone: null,
      uploadUrlOpt: '',
      overwrite: false,
      uploadPage: '',
      overlayClass: '',
      overlayBgColor: 'white',
      overlayMessage: '<div>Working on it</div>',
      selectFileMessage: 'Click here to select file...',
      uploadDoneMessage: 'Upload Successful!',
      fileNameErrorMessage: 'A file name cannot contain any of the following characters: \\ / : * ? " &lt; &gt; | # { } % ~ &amp;',
      noFileErrorMessage: 'No file selected!',
      checkInFormHeight: '25em',
      webURL: null,
      // set later
      debug: false,
      filenameInputSelector: 'input[id$=\'onetidIOFile\']'  // 3/14/2014: Undocumented for now
    };
    /**
     * jQuery plugin that populates the elements selected with a UI for
     * uploading a file to a Sharepoint location (library) without having
     * to leave the current page that the user is currently on.
     *
     * @param {HTMLElement|jQuery|selector} containers
     *      The elements where the widget should be initialized.
     *
     * @param {Object} options  Object with the options below.
     *
     * @param {String} options.listName REQUIRED. The name or UID of the list.
     *                  Example 'Shared Documents' or '{67587-89284-93884-78827-78823}'
     *
     * @param {String} [options.folderPath="/"]
     *                  Optional. The full path to the folder inside of the List where
     *                  the document should be uploaded to. Default is to place the
     *                  document at the root of the Document Library
     *                  Examples 'http://yourdomain.com/sites/site1/Shared Documents' or
     *                  '/sites/site1/Shared Documents'
     *
     * @param {String} [options.uploadDonePage="/_layouts/viewlsts.aspx"]
     *                  Optional. The url of the page that should be loaded after the
     *                  file has been uploaded successful. Value MUTST start with http.
     *                  Default is 'http://yourdomain.com/sites/site1/_layouts/viewlsts.aspx'
     *
     * @param {Funtion} [options.onPageChange=null]
     *                  Function that is called each time the form in the
     *                  iFrame is changed. The function 'this' keyword points to the
     *                  element that was used when this method was called. The function
     *                  is given one param; the event object created by this method.
     *                  ({@link SPControlLoadEvent})
     *                  Return value of this function will control flow of plugin.
     *                  Returning true (boolean), will allow processing to continue
     *                  at different stages (see the event object below), while
     *                  returnin false (boolean) will stop flow from continuing. The
     *                  check is strict; meaning that it has to be a boolean false in
     *                  order for flow to stop.
     *
     * @param {Function} [options.onUploadDone=null]
     *                  Triggered when file is successfully uploaded - or when it reaches
     *                  the uploadDonePage. This is normally triggered after a file is
     *                  checkedIn (if library requires it to be checked in).
     *                  Function will have a scope of the element used on input and
     *                  be given 1 parameter:  An object with the upload file metadata.
     *
     * @param {String} [options.uploadUrlOpt=""]
     *                  String of data that should be appended to the upload page url,
     *                  following this '?".
     *                  NOTE; The option "MultipleUpload=1" is NOT SUPPORTED.
     *                  This string value is assumed to have already been properly
     *                  escaped for use in the url.
     *
     * @param {Boolean} [options.overwrite=False]
     *                  True or False indicating if document being uploaded should
     *                  overwrite any existing one. Default is False (don't overwrite)
     *
     * @param {String} [options.uploadPage=""]
     *                  The relative URL from the WebSite root to the upload page.
     *                  Default is "/_layouts/Upload.aspx". This value is appended to
     *                  to the website full url.
     *
     * @param {String} [options.overlayClass=""]
     *                  A css class to be associated with the overlay that is displayed
     *                  over the iframe while loading of the page is going on.
     *
     * @param {String} [options.overlayBgColor="white"]
     *                  A color to be used for the overlay area that is displayed over
     *                  the iframe wile loading of the page is going on. Default is
     *                  white. Set this to null if wanting only to use a class.
     *
     * @param {String|HTMLElement|jQuery} [options.overlayMessage="Loading..."]
     *                  String or object/element to be displayed inside of the overlay
     *                  when it is displayed. Default is "Loading..."
     *
     * @param {String|HTMLElement|jQuery} [options.selectFileMessage="Click here to select file..."]
     *              The message displayed for user to select file
     *
     * @param {String} [options.checkInFormHeight='20em']
     *              The height of the form when a checkin is required.
     *
     * @param {String} [options.webURL=Current site]
     *              The URL of the web site/sub site.
     *
     * @param {String} [options.debug=false]
     *              Turns debug on for this widget.
     *
     * @return {jQuery}
     *
     * @example
     *
     *  $("&lt;di&gt;&lt;/div&gt;").appendTo("body")
     *      .SPControlUpload({
     *          listName: "Shared Documents"
     *      });
     *
     */
    upload = function (containers, options) {
      // if the global styles have not yet been inserted into the page, do it now
      if (!Upload.isInitDone) {
        Upload.isInitDone = true;
        if (!Upload.defaults.webURL) {
          Upload.defaults.webURL = getSiteUrl();
        }
      }
      return containers.each(function () {
        var opt = $.extend({}, Upload.defaults, options), overlayCss;
        /**
         * Define the log method for this instance.
         */
        opt.log = opt.debug ? Upload.log : function () {
        };
        /**
         * Shows or hides the Busy loading animation.
         *
         * @param {Boolean} hide
         *      if True, then loading busy animation will be hidden.
         *
         * @return {jQuery.Promise}
         */
        opt.showHideBusy = function (hide) {
          return $.Deferred(function (dfd) {
            if (hide) {
              opt.$busyOverlay.fadeOut('fast').promise().then(function () {
                dfd.resolve();
              });
            } else {
              opt.$busyOverlay.fadeIn('slow').promise().then(function () {
                dfd.resolve();
              });
            }
          }).promise();
        };
        //end: showHideBusy()
        /**
         * Shows or hides the full Upload form. Used when the document has
         * been upload and perhaps there is a CheckIn page to go through.
         *
         * @param {Boolean} hide
         *
         * @return {Object} opt
         *
         */
        opt.showHideFullForm = function (hide) {
          // HIde full form
          if (hide) {
            opt.$content.removeClass('spwidget-show-full-form');
            opt.$iframeCntr.css({
              overflow: '',
              height: ''
            });  // SHOW full form
          } else {
            opt.$content.addClass('spwidget-show-full-form');
            opt.$iframeCntr.css({
              overflow: 'auto',
              height: 'auto'  // (opt.$iframe.outerHeight() + 5) + "px"
            });
          }
          return opt;
        };
        //end: opt.showHideFullForm
        /**
         * Shows or hides the Upload Success message.
         *
         * @param {Boolean} [hide=false]
         *
         * @return {Object} opt
         *
         */
        opt.showHideSuccess = function (hide) {
          // HIDE
          if (hide) {
            opt.$successCntr.stop().fadeOut().promise(function () {
              opt.$successCntr.css('display', 'none');
            });  // DEFAULT: SHOW
          } else {
            opt.$successCntr.stop().show().promise(function () {
              opt.$successCntr.css('display', 'block');
            });
          }
          return opt;
        };
        //end: opt.showHideSuccess()
        /**
         * Shows an error on the widget.
         *
         * @param {Object} showErrorOptions
         *
         * @param {String} showErrorOptions.message
         * @param {Boolean} [showErrorOptions.autoHide=true]
         *
         * @return {Object} opt
         *
         */
        opt.showError = function (showErrorOptions) {
          var thisOpt = $.extend({}, {
            message: '',
            autoHide: true
          }, showErrorOptions);
          opt.$errorCntrMsg.html(thisOpt.message);
          opt.$errorCntr.stop().css('display', 'block');
          if (thisOpt.autoHide) {
            opt.$errorCntr.animate({ opacity: 1 }, 5000, function () {
              opt.clearError();
            });
          }
          return opt;
        };
        //end: opt.showError()
        /**
         * Clears any error currently displayed on the widget.
         *
         * @return {Object} opt
         *
         */
        opt.clearError = function () {
          opt.$errorCntr.css('display', 'none');
          return opt;
        };
        //end: opt.clearError
        /**
         * Resets the Upload widget after the upload.
         *
         * @return {Object} opt
         */
        opt.resetWidget = function () {
          opt.ev = {
            state: 1,
            action: 'uploading',
            hideOverlay: true,
            pageUrl: '',
            page: null,
            // a jquery object
            isUploadDone: false,
            file: {}
          };
          opt.$iframe.attr('src', opt.uploadPage);
          return opt;
        };
        //end: opt.resetWidget()
        /**
         * Returns the last uploaded file for the user.
         *
         * @return {Object} z:row object
         *
         */
        opt.getUploadedFileRow = function () {
          var lastFile = {};
          getListItems({
            async: false,
            webURL: opt.webURL,
            listName: opt.listName,
            CAMLQuery: '<Query><Where>' + '<Eq><FieldRef Name=\'Author\' LookupId=\'TRUE\'/>' + '<Value Type=\'Integer\'><UserID/></Value></Eq>' + '</Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'FALSE\'/>' + '</OrderBy></Query>',
            CAMLViewFields: '<ViewFields>' + '<FieldRef Name=\'ID\'/>' + '<FieldRef Name=\'EncodedAbsUrl\'/>' + '<FieldRef Name=\'FileLeafRef\' />' + '<FieldRef Name=\'Author\' />' + '<FieldRef Name=\'Editor\' />' + '<FieldRef Name=\'Created\' />' + '<FieldRef Name=\'Modified\' />' + '</ViewFields>',
            CAMLRowLimit: 1,
            CAMLQueryOptions: '<QueryOptions><ViewAttributes Scope=\'Recursive\' /></QueryOptions>',
            completefunc: function (xData, status, rows) {
              if (rows.length) {
                lastFile = rows[0];
              }
            }
          });
          return lastFile;
        };
        //end: opt.getUploadedFileRow()
        /**
         * Given a URL, this method will check if it is one of the
         * known upload pages of SharePoint. True = yes it is.
         * False = no it is not.
         *
         * @param {String} url
         *      URL is assumed to be full url, including http.
         *
         * @return {Boolean}
         */
        opt.isUploadPage = function (url) {
          // Uses parser apprach shown here:
          // https://gist.github.com/jlong/2428561
          var answer = false, parser = document.createElement('a'), parser2 = null;
          parser.href = String(url).toLowerCase();
          // If user defined their own Upload page, then
          // parse that URL and use it in matching.
          // Else, just see if the input url has Upload.aspx
          // or UploadEx.aspx.
          if (opt.userUploadPage) {
            parser2 = document.createElement('a');
            parser2.href = String(opt.userUploadPage).toLowerCase();
            if (parser.pathname === parser2.pathname) {
              answer = true;
            }
          } else {
            // 2007 = Upload.aspx
            // 2010, 2013 = UploadEx.aspx
            answer = /upload(ex)?\.aspx$/.test(parser.pathname);
          }
          return answer;
        };
        //end: opt.isUploadPage()
        /** ---------------------------------------------------------- **/
        /** -------------[        SETUP WIDGET      ]----------------- **/
        /** ---------------------------------------------------------- **/
        // If list Name is not the UID, then get it now
        if (opt.listName && opt.listName.indexOf('{') !== 0) {
          opt.listName = Upload.getListUID(opt.listName);
        }
        // If list name is not defined - error
        if (!opt.listName) {
          $(this).html('<div class="ui-state-error">Input parameter [listName] not valid!</div>');
          return this;
        }
        // If user did not define the Upload page on input, then set it depending
        // on SP version. Else, if the user defined the upload page, ensure it
        // is a full url starting at http...
        opt.spVersion = getSPVersion(true);
        opt.userUploadPage = opt.uploadPage;
        opt.uploadPage = String(opt.uploadPage);
        if (!opt.uploadPage) {
          switch (opt.spVersion) {
          case '2013':
            opt.uploadPage = opt.webURL + '/_layouts/15/UploadEx.aspx';
            break;
          case '2010':
            opt.uploadPage = opt.webURL + '/_layouts/UploadEx.aspx';
            break;
          // Default: SP 2007
          default:
            opt.uploadPage = opt.webURL + '/_layouts/Upload.aspx';
            break;
          }  // If user defined a upload page using relative URL from root of site, then
             // prepend the site URL.
        } else if (opt.uploadPage.toLowerCase().indexOf('http') === -1) {
          var s = '/';
          if (opt.uploadPage.indexOf('/') === 0) {
            s = '';
          }
          opt.uploadPage = opt.webURL + s + opt.uploadPage;
        }
        opt.uploadDonePage = String(opt.uploadDonePage);
        // Set the uploadDonePage url
        if (!opt.uploadDonePage) {
          opt.uploadDonePage = opt.webURL + '/_layouts/images/STS_ListItem_43216.gif';
        }
        // _iframeLoadId is used to determine if the onIframeChange() function
        // should be run or not... It ensure that when a page is redirected, that
        // only the last function to be spawn (via setTimeout) is run.
        opt._iframeLoadId = 1;
        // Create additional non-overridable options
        opt._uploadUrlParams = '?List=' + encodeURIComponent(opt.listName) + '&RootFolder=' + encodeURIComponent(opt.folderPath) + '&Source=' + encodeURIComponent(opt.uploadDonePage) + '&' + new Date().getTime() + '=1&' + opt.uploadUrlOpt;
        opt.uploadPage = opt.uploadPage + opt._uploadUrlParams;
        opt._lastError = '';
        opt._reloadCount = 0;
        /**
         * @name SPControlLoadEvent
         * Event object that is given as input to the function defined in the
         * $.fn.SPControlUpload-onPageChange parameter.
         *
         * @event
         * @memberof $.fn.SPControlUpload
         *
         * @param {SPControlLoadEvent} ev
         *
         * @param {Integer} ev.state
         *          A value from 1 through 3 that represents the state of
         *          the file upload form. The flow is:
         *
         *              [1]                 [2]                 [3]
         *          [ready for input] -> [pre-upload] -> [file uploaded]
         *
         *          1 = is set when the form is initially loaded and the
         *          File html element is ready for the user to attach the file.
         *          File has not yet been uploaded.
         *          2 = is set when the form is ready to be submitted to the server
         *          along with the file set by the user. File has not yet been
         *          uploaded.
         *          3 = is set when the user has successfully uploaded the file to
         *          the server and no errors were encountered.
         *          File has been uploaded and now sits on the server.
         *
         * @param {String} ev.action
         *          The event action as it pertains to this plugin.
         *          preLoad        =    action is taking place before the page is sent
         *          to the server. State of '2' are handled by Upload.onUpdate
         *          postLoad    =    action is taking place after page has completed
         *          loading, but is not yet "visible" to the user.
         *
         * @param {Boolean} ev.hideOverlay
         *          Used when action=postLoad. Can be set by
         *          a callback function to false, so that the busy overlay remains
         *          displayed and is not automaticaly hidden. Default value is "true".
         *
         * @param {String} ev.pageUrl
         *          The url of the page currently loaded in the iframe.
         *
         * @param {jQuery} ev.page
         *          An object representing the page loaded inside the
         *          iFrame. This can be used to further manipulate the iframe's
         *          page content.
         *
         * @param {Boolean} ev.isUploadDone
         *          Indicates if the upload process is done. Basically,
         *          this means that the processess has reached the page defined
         *          in the updatePageDone parameter.
         *
         */
        opt.ev = {
          state: 1,
          action: 'uploading',
          hideOverlay: true,
          pageUrl: '',
          page: null,
          // a jquery object
          isUploadDone: false,
          file: {}  // populated when file is uploaded
        };
        // Create the UI on the element given used by the SPCOntrolUpload plugin
        opt.$ele = $(this);
        overlayCss = {};
        if (opt.overlayBgColor) {
          overlayCss['background-color'] = opt.overlayBgColor;
        }
        // Create the UI on the page
        opt.$cntr = $($(uploadTemplate).filter('div.SPControlUploadUI').clone()).appendTo(opt.$ele.addClass('hasSPControlUploadUI').empty()).data('SPControlUploadOptions', opt);
        opt.$buttonCntr = opt.$cntr.find('div.buttonPane').click(function () {
          Upload.onUpload(this);
        });
        // Store references
        opt.$content = opt.$cntr.find('div.mainContainer');
        opt.$iframeCntr = opt.$cntr.find('div.iFrameWindow');
        opt.$iframe = opt.$iframeCntr.children('iframe');
        opt.$busyOverlay = opt.$cntr.find('div.loadingOverlay');
        opt.$busyOverlayMsg = opt.$busyOverlay.find('div.loadingOverlayMsg');
        opt.$successCntr = opt.$cntr.find('div.spwidget-success-cntr');
        opt.$errorCntr = opt.$cntr.find('div.spwidget-error-cntr');
        opt.$errorCntrMsg = opt.$errorCntr.find('.spwidget-msg');
        opt.reInvalidChr = new RegExp('[\\/:*?"<>|#{}%~&]');
        // Setup success message closure listner and include user's message
        opt.$successCntr.on('click', '.spwidget-close', function () {
          opt.showHideSuccess(true);
        }).find('.spwidget-msg').html(opt.uploadDoneMessage);
        // Setup error message closure
        opt.$errorCntr.on('click', '.spwidget-close', function () {
          opt.clearError();
        });
        // Setup the overlay
        opt.$busyOverlay.addClass(opt.overlayClass).css(overlayCss);
        opt.$busyOverlayMsg.html(opt.overlayMessage);
        // Show the loading animation and load the UI
        opt.showHideBusy();
        opt.$cntr.find('iframe').css('height', opt.checkInFormHeight).load(function () {
          Upload.onIframeChange(opt.$ele.find('.SPControlUploadUI'));
        }).attr('src', opt.uploadPage).end();
        return this;
      });  // return each()
    };
    // upload
    /**
     * FUNCTION: Upload.onUpload()
     *
     *  Submits the upload form that is loaded in the iframe window.
     *  Also calls any callback function defined by the user.
     *
     * PARAMS:
     *
     *  @param {Object} ele -   Element from within the
     *                          .SPControlUploadUI class html container
     *
     * RETURN:
     *
     *  @return {undefined} Nothing.
     *
     */
    Upload.onUpload = function (ele) {
      var e = $(ele).closest('.SPControlUploadUI'), page = e.find('iframe').contents(), msgs = page.find('input[type=\'file\']').closest('tr').siblings().find('span'), opt = e.data('SPControlUploadOptions'), ev = opt.ev;
      opt.log('Upload.onUpload(' + opt._iframeLoadId + '): Start....');
      // Insure all messages are initially hidden (these might have been
      // visible from any prior call to upload the document where it failed.)
      msgs.css('display', 'none');
      // If no file was entered, then there is nothing to upload.
      if (!page.find('input[type=\'file\']').val()) {
        opt.showError({ message: opt.noFileErrorMessage });
        return;
      }
      // If file contains invalid charactors, then error
      if (opt.reInvalidChr.test(page.find('div.SPControlUploadModUIFileSelected').text())) {
        opt.showError({ message: opt.fileNameErrorMessage });
        return;
      }
      // Set the event info
      // TODO: Look into building the event with $.Event("ev name here")
      ev.state = 2;
      ev.action = 'preLoad';
      // if a user function was defined, then call it now and give it the event
      // object defined above.
      // If fucntion returns a boolean false, then we exit here and never submit
      // the form.
      if (opt.onPageChange) {
        if (opt.onPageChange.call(opt.$ele, ev) === false) {
          return false;
        }
      }
      opt.showHideFullForm(true);
      // Hide the upload button, and Submit the form after showing the busy animation
      opt.showHideBusy().then(function () {
        opt.log('Upload.onUpload(' + opt._iframeLoadId + '): Clicking the OK button on upload form.');
        page.find('input[type=\'button\'][id$=\'btnOK\']').click();
        // ev.action = "postLoad";
        // If error message are displayed (after we click upload button),
        // then just return control back to the user.
        if (msgs.is(':visible')) {
          opt.log('Upload.onUpload(' + opt._iframeLoadId + '): Error message reported! \n' + msgs.text());
          e.find('.loadingOverlay').css('display', 'none').end();
          return false;
        }
      });
    };
    //* Upload.onUpload()
    /**
     * Returns true of false indicating if the given Selection has the
     * Sharepoint busy animation image/element.
     *
     * @param {jQuery} $doc
     *
     * @return {Boolean}
     */
    Upload.isSPBusyAnimation = function ($doc) {
      if ($doc.find('#GearPage').length) {
        return true;
      }
      if ($doc.find('#ms-loading-box').length) {
        return true;
      }
      return false;
    };
    /* Upload.isSPBusyAnimation() */
    /**
     * FUNTION: Upload.onIframeChange()
     *
     *  Called when ever the iframe is "load"ed. Function is bound to
     *  the iframe html element's _load event so that it is called each
     *  time the content of the iframe (the page) is reloaded.
     *
     * PARAMS:
     *
     *  @param {jQuery} ele -   jQuery object representing the .SPControlUploadUI
     *                          element.
     *
     * RETURN:
     *
     *  @return {undefined} nothing.
     *
     */
    Upload.onIframeChange = function (ele) {
      var e = $(ele).closest('.SPControlUploadUI'), opt = e.data('SPControlUploadOptions'), id = 0, page = $(e.find('iframe').contents());
      if (opt.debug) {
        try {
          opt.log('Upload.onIframeChange(): ENTERING... Document readyState: ' + page[0].readyState + ' IFRAME URL: ' + page[0].location.href);
        } catch (err) {
        }
      }
      if (Upload.isSPBusyAnimation(page)) {
        opt.log('Upload.onIframeChange(): EXITING... Gear page displyed.');
        return;
      }
      // If the upload event state is 2, then {Upload.onUpload} has already
      // taken care of the form and user call back... There is nothing to do
      // here and form is arleady being submitted... Set the ev. to
      // postLoad and Exit.
      if (opt.ev.state === 2 && opt.ev.action === 'preLoad' && page[0].spcontrolupload_init_done === true) {
        opt.log('Upload.onIframeChange(' + opt._iframeLoadId + '): Exiting! ev.action=[' + opt.ev.action + '] and ev.state=[' + opt.ev.state + '] - Nothing to do. Action handled by onUpload(). Setting action to postLoad');
        opt.ev.action = 'postLoad';
        // FIXME: needed to comment this out for SP2007???
        return;
      }
      opt._iframeLoadId++;
      id = opt._iframeLoadId;
      opt.log('Upload.onIframeChange(' + id + '): State=[' + opt.ev.state + '] Action=[' + opt.ev.action + ']');
      // Because just about every browser differs on how the load() event
      // is triggered, we do all our work in a function that is triggered
      // 500 millisends from now. By then, the page (regardless of browser)
      // should be in a state that is useful.
      setTimeout(function () {
        // if this invocation is not the last iframe refresh ID,
        // then exit... there is another fucntion queued up...
        if (id !== opt._iframeLoadId) {
          opt.log('Upload.onIframeChange(' + id + '): not latest invokation! Existing.');
          return;
        }
        var ev = opt.ev, form = page.find('form').eq(0);
        // Re-Set the page variale here (in timeout... Case the page changed and prior point is no good)
        page = $(e.find('iframe').contents());
        opt.log('Upload.onIframeChange(' + id + '): STARTING... Executing setTimeout(). URL:' + page[0].location.href);
        // If page was already processed, then exit.
        if (page.spcontrolupload_init_done === true) {
          opt.log('Upload.onIframeChange(' + id + '): EXITING!!! Page was already processed!');
          return;
        }
        page.spcontrolupload_init_done = true;
        ev.pageUrl = page[0].location.href;
        ev.page = page;
        // Focus at the top of the form
        opt.$iframeCntr.scrollTop(0);
        page.scrollTop(0);
        // If the URL of the page in the iFrame is the same as the
        // upload page then this is either the
        // initial load of the page or an error has occured...
        // Hide the page and show only the upload form element.
        if (opt.isUploadPage(ev.pageUrl)) {
          opt.log('Upload.onIframeChange(' + id + '): URL is the upload page!');
          page.find('body').css({ overflow: 'hidden' });
          form.children(':visible').hide().end().append($(uploadTemplate).filter('div#SPControlUploadModUI').clone()).find('div.SPControlUploadModUIFileSelected').html(opt.selectFileMessage);
          // Is the page displaying an error page without the upload interface?
          // Capture error message and reload the page.
          // SP2010 Seems to behave differntly and land display errors a little
          // differently... so we try the <title> tag adn then the form action value.
          if (new RegExp(/error/i).test($.trim(page.find('.ms-pagetitle').text())) || new RegExp(/error/i).test($.trim(page.find('title').text())) || new RegExp(/error\.aspx/i).test($.trim(page.find('form').attr('action')))) {
            opt.log('Upload.onIframeChange(' + id + '): page displaying an error... Storing it and reloading upload form.');
            opt._lastError = page.find('[id$=\'LabelMessage\']').text();
            // Lets avoid looping... Dont if it possible, but just in case.
            if (opt._reloadCount > 1) {
              alert('Error encountered during upload which is causing program to loop. Last upload error was: ' + opt._lastError);
              e.find('.loadingOverlay').fadeOut();
              return;
            }
            opt._reloadCount += 1;
            e.find('iframe').attr('src', opt.uploadPage);
            return;
          }
          /* if: error page or upload UI? */
          // SP2010 Code
          // If this is the new SP2010 "Processing..." page, then
          // the just exit... there is nothing for us to do yet...
          if (Upload.isSPBusyAnimation(page) && !page.find('input[type=\'file\']').length) {
            opt.log('Upload.onIframeChange(' + id + '): SP processing page (GearPage)... Exiting and waiting for next page...');
            return;
          }
          page.find('input[type=\'file\']').closest('table').appendTo(page.find('#SPControlUploadModUI')).removeClass('ms-authoringcontrols');
          // setup upload input field on the iframe page, including
          // setting up the change, focus and click event to update
          // the input div that shows the file name selected to the
          // user.
          var $fileInput = page.find('#SPControlUploadModUI').find('input[type=\'file\']').closest('tr').siblings().css('display', 'none').end().end().siblings('tr .ms-error').css('display', '').end().on('change focus click', function () {
            var $this = $(this), filePath = $this.val(), fileExt = '', icon = '/_layouts/images/urn-content-classes-smartfolder16.gif';
            if (filePath) {
              try {
                fileExt = filePath.substr(filePath.lastIndexOf('.') + 1);
              } catch (e) {
                fileExt = 'GEN';
              }
              icon = '/_layouts/images/IC' + fileExt.toUpperCase() + '.GIF';
              // Get only the file name
              filePath = filePath.replace(/\\/g, '/').split('/').pop() || filePath;
            } else {
              filePath = opt.selectFileMessage;
            }
            page.find('#SPControlUploadModUI > div').html(filePath).css('background-image', 'url(\'' + icon + '\')');
          })  //end: .on()
.css({
            cursor: 'pointer',
            height: '100px',
            position: 'absolute',
            left: '0px',
            top: '0px',
            filter: 'alpha(opacity=1)',
            opacity: '0.01',
            outline: 'none',
            '-moz-opacity': '0.01',
            'font-size': '100px',
            'z-index': '5'
          });
          // Setup the mouseover event so that the input file field
          // follows the mouse around while user hovers over
          // the iframe.
          form.on('mousemove', function (ev) {
            $fileInput.css({
              left: ev.pageX - ($fileInput.width() - 50),
              top: ev.pageY - 30
            }).blur();
          });
          // If there were any errors found during a previous call, then
          // display them now
          if (opt._lastError) {
            opt.showError({ message: opt._lastError });
            opt._lastError = '';
          }
          opt._reloadCount = 0;
          // Set the override checkbox
          if (opt.overwrite) {
            page.find('input[type=\'checkbox\'][name$=\'OverwriteSingle\']').prop('checked', 'checked');
          } else {
            page.find('input[type=\'checkbox\'][name$=\'OverwriteSingle\']').prop('checked', '');
          }
          // Set proper event values for user's callback
          ev.state = 1;
          ev.action = 'postLoad';
          ev.hideOverlay = true;  //------------------------------------------------------------------------
                                  //------------------------------------------------------------------------
                                  // Else, we must be passed the upload page...
                                  // set the state to 3 (passed upload) and bind a function to the
                                  // iframe document's form element (which in turn calls the user defined
                                  // onPageChange event prior to sending the form on.
        } else {
          opt.log('Upload.onIframeChange(' + opt._iframeLoadId + '): File uploaded to server! Need [' + opt.uploadDonePage + '] to be done.');
          ev.state = 3;
          ev.action = 'postLoad';
          ev.hideOverlay = true;
          ev.file = opt.getUploadedFileRow();
          // If the current page is the 'uploadDonePage', then set
          // flag in the event, set flag to not hide the overlay
          // and insert message indicating upload is done.
          if (Upload.isSameUrlPage(ev.pageUrl, opt.uploadDonePage)) {
            opt.log('Upload.onIframeChange(' + opt._iframeLoadId + '): Upload widget process DONE!');
            ev.isUploadDone = true;
            ev.hideOverlay = false;
            // Show the busy indicator and success message.
            opt.showHideBusy();
            opt.showHideSuccess();  // Else, page is not the uploadDonePage... manipulate the form's
                                    // onsubmit event.
          } else {
            opt.log('Upload.onIframeChange(' + opt._iframeLoadId + '): Post Upload Form being displayed! Hooking into form.onsubmit!');
            if (form.length) {
              var formOnSubmit = form.prop('onsubmit'), $nameField = form.find(opt.filenameInputSelector).eq(0);
              // Hide the Form content if we found the File name input field,
              // and move that input field to the root of the form.
              if ($nameField.length) {
                form.children(':visible').css('display', 'none').addClass('ptWasVisible');
                $nameField.closest('div[id^=\'WebPart\']').appendTo(form)  // 8/30/2013: ensure the UI is visible.
                                                                           // Just in case it was at root of form
.css('display', '').removeClass('ptWasVisible');
              }
              // SP seems to have a good hold of the Form, because
              // we are unable o bind an event via $. Thus:
              // The form's onsubmit has to be overriden with our
              // own function... The original function was captured
              // above, thus it will triggered... but we now control
              // when we trigger it.
              // FIXME: this does not seem to do anything (at least in FF)
              form[0].onsubmit = function () {
                opt.log('Upload.onIframeChange(' + id + '): iframe form.onsubmit triggered!');
                // Show the overlay without animation.
                opt.showHideBusy();
                var allowFormToContinue = true;
                // if the user defined a function, then run it now and
                // exit if the resposne is false (stop submition)
                if ($.isFunction(opt.onPageChange)) {
                  allowFormToContinue = opt.onPageChange.call(opt.$ele, $.extend({}, ev, {
                    state: 3,
                    action: 'preLoad'
                  }));
                }
                if (allowFormToContinue === false) {
                  opt.showHideBusy(true);
                  return allowFormToContinue;
                }
                // if SP had a onSubmit defined, then execute it now and
                // exit if the resposne is false (stop submition)
                if ($.isFunction(formOnSubmit)) {
                  allowFormToContinue = formOnSubmit();
                }
                if (allowFormToContinue === false) {
                  opt.showHideBusy(true);
                  return allowFormToContinue;
                }
                // hide the form before continuing
                opt.showHideFullForm(true);
                // Return true, allowing the form to be submitted.
                return allowFormToContinue;
              };
            }  //end: if() - do we have a form?
          }
          //end: if(): onUpdateDonePage? or not?
          // Bind a function to the iframe WINDOW object for when it is
          // unloaded.. At this point, nothing can be done to prevent
          // the page from being submitted, but we can still execute
          // the caller's function.
          $(e.find('iframe')[0].contentWindow).unload(function () {
            opt.log('Upload.onIframeChange(' + opt._iframeLoadId + '): iframe.unload() triggered!');
            // Make the busy panel visible without animation
            // opt.$buttonCntr.css("display", "");
            opt.showHideBusy();
            opt.showHideFullForm(true);
            if ($.isFunction(opt.onPageChange)) {
              return opt.onPageChange.call(opt.$ele, $.extend({}, ev, {
                state: 3,
                action: 'preLoad'
              }));
            }
          });
        }
        //end:if: is uploadPage? or past the file uploaded?
        opt.log('Upload.onIframeChange(' + opt._iframeLoadId + '): iframe page setup done!');
        // Call user event function
        if (opt.onPageChange) {
          opt.onPageChange.call(opt.$ele, ev);
        }
        // Hide our overlay area
        if (ev.action.toLowerCase() !== 'postload' || ev.hideOverlay === true) {
          opt.showHideBusy(true);
          if (ev.isUploadDone === false && ev.state === 3) {
            opt.showHideFullForm();
          }
        }
        // If Upload is DONE, then reset form
        if (ev.isUploadDone) {
          // Reset upload form
          opt.resetWidget();
          // Wait 4 seconds then hide success message
          opt.$successCntr.animate({ opacity: 1 }, 3000, function () {
            opt.showHideSuccess(true);
          });
          if ($.isFunction(opt.onUploadDone)) {
            opt.onUploadDone.call(opt.$ele, ev.file);
          }
        }
        return;
      }, 500);  //end:setTimeout()
    };
    // Upload.onIframeChange
    /**
     * Determines whether two URLs are the same page. URLs could be the same page, but
     * have difference url params. This function will look only at the page (eveything
     * up to the "?") and will then compare them. It will also work if the server portion
     * of a URL is not provided.
     *
     * @param {String} u1   First URL
     * @param {String} u2   Second URL
     *
     * @return {Boolean}
     *
     * @memberOf jQuery.pt
     *
     */
    Upload.isSameUrlPage = function (u1, u2) {
      if (!u1 || !u2) {
        return false;
      }
      var normalize = function (urlString) {
          var parser = document.createElement('a');
          parser.href = urlString;
          return unescape(parser.pathname);
        }, url1 = String(normalize(u1)).toLowerCase(), url2 = String(normalize(u2)).toLowerCase();
      return url1 === url2;
    };
    // Upload.isSameUrlPage()
    /**
     * Given a List name or a DOcument Library name, this method will retrieve
     * it's UID from SP.
     *
     * @param {String} listName     The name of the list.
     * @return {String}
     * @memberOf jQuery.pt
     *
     */
    Upload.getListUID = function (listName) {
      if (!listName) {
        return '';
      }
      var id = '';
      // FIXME: need to make this async=true
      getList({
        listName: listName,
        async: false,
        cacheXML: true
      }).then(function (list) {
        id = list.ID;
      });
      return id;
    };
    // Upload.getListUID()
    /**
     * Logs information to the output console.
     *
     * @param {String} msg
     */
    Upload.log = function () {
      var logit, $output, n = 1, c = 0, isNative = false, initDone = false, bgColor = [
          '#FFFFFF',
          '#F5F5F2'
        ];
      if (typeof console === 'undefined' || typeof console.debug === 'undefined') {
        logit = function () {
          var i, j, data = '';
          for (i = 0, j = arguments.length; i < j; i++) {
            data += '<div style="padding: .1em .1em;background-color:' + bgColor[c] + '"><span>[' + n + '] </span>' + arguments[i] + '</div>';
            n++;
            if (c === 1) {
              c = 0;
            } else {
              c = 1;
            }
          }
          if (data) {
            $output.append(data);
            if (!$output.dialog('isOpen')) {
              $output.dialog('open');
            }
          }
        };
      } else {
        isNative = true;
      }
      return function () {
        if (!initDone) {
          initDone = true;
          if (!isNative) {
            $output = $('<div><h2>SPWidgets Debug Output</h2></div>').appendTo('body').dialog({
              title: 'Debug output',
              height: 300
            });
          }
        }
        if (isNative) {
          var i, j;
          for (i = 0, j = arguments.length; i < j; i++) {
            console.debug(arguments[i]);
          }
        } else {
          logit.apply(this, arguments);
        }
      };
    }();
    // end: Upload.log();
    upload.defaults = Upload.defaults;
    return upload;
  }(jquery, text_src_uploadWidget_uploadhtml, src_spapi_getList, src_spapi_getListItems, src_spapi_getSiteUrl, src_sputils_getSPVersion);
  src_spapi_getSiteListCollection = function ($, cache, getSiteUrl, doesMsgHaveError) {
    /**
     * Returns a Deferred that is resolved with an Array of Objects containing
     * the site list collection.
     *
     * @param {Object} options
     *
     * @param {String} [options.webURL=currentSite]
     *          The site/sub-site for which the list collection
     *          is to be retrieved.
     * @param {Boolean} [options.cacheXML=false]
     *          If true, the XML response returned is cached for
     *          future calls.
     * @param {String|Array|Function} [options.filter=null]
     *          A string or array of strings with the list name or UID's
     *          that should be returned when the deferred is resolved.
     *
     * @return {jQuery.Promise}
     *          Promise is resolved with 3 input params:
     *          lists - Array of objects for the list collection
     *          xData - webservice Response XML Document
     *          status - jQuery async request status
     *
     * @see https://msdn.microsoft.com/en-us/library/ms774864(v=office.12).aspx
     *
     */
    var getSiteListCollection = function () {
      var getData = null, callerFn = function getSiteListCollection() {
          return getData.apply(this, arguments);
        };
      // Define defaults. User can change these on their function attachment.
      callerFn.defaults = {
        webURL: '',
        cacheXML: false,
        async: true,
        completefunc: null,
        filter: null
      };
      /**
       * Retrieves the data from Sharepoint
       */
      getData = function (opt) {
        var options = $.extend({}, callerFn.defaults, opt), reqPromise;
        if (!options.webURL) {
          options.webURL = getSiteUrl();
        } else if (options.webURL.charAt(options.webURL.length - 1) !== '/') {
          options.webURL += '/';
        }
        options.webURL += '_vti_bin/SiteData.asmx';
        options.cacheKey = options.webURL + '?' + [options.filter].join('|');
        options.isCached = cache.isCached(options.cacheKey);
        // If cacheXML is true and we have a cached version, return it.
        if (options.cacheXML && options.isCached) {
          reqPromise = cache(options.cacheKey);
          // If a completefunc was defined on this call,
          // execute it.
          if ($.isFunction(options.completefunc)) {
            reqPromise.then(function (lists, xdata, status) {
              options.completefunc.call($, xdata, status, lists);
            });
          }
          return reqPromise;
        }
        // Return a deferred.
        reqPromise = $.Deferred(function (dfd) {
          // If cacheXML is FALSE, and we have a cached version of this key,
          // then remove the cached version - basically reset
          if (options.isCached) {
            cache.clear(options.cacheKey);
          }
          $.ajax({
            type: 'POST',
            cache: false,
            async: options.async,
            url: options.webURL,
            contentType: 'text/xml;charset=utf-8',
            dataType: 'xml',
            data: '<?xml version="1.0" encoding="utf-8"?>' + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' + '<soap:Body><GetListCollection xmlns="http://schemas.microsoft.com/sharepoint/soap/">' + '</GetListCollection></soap:Body></soap:Envelope>',
            complete: function (xdata, status) {
              // Process Error from status
              if (status === 'error' || doesMsgHaveError(xdata)) {
                // If cacheXML was true, then remove this from cache.
                // No point in caching failures.
                if (options.cacheXML) {
                  cache.clear(options.cacheKey);
                }
                dfd.rejectWith($, [
                  null,
                  xdata,
                  status
                ]);
                return;
              }
              var $siteLists = $(xdata.responseXML).find('_sList'), lists = [];
              // TODO: Enhance return object so that each one has a method to .getList()
              // FIXME: options.filter should support a Function as well.
              // if we hav a filter defined, then make sure its an array
              if (options.filter && !$.isArray(options.filter)) {
                options.filter = [options.filter];
              }
              $siteLists.each(function () {
                var $thisList = $(this), listDef = {};
                // if a filter was defined, then check to see
                // if this list matches that filter name
                if (options.filter && $.isArray(options.filter) && $.inArray($thisList.find('Title').text(), options.filter) === -1 && $.inArray($thisList.find('InternalName').text(), options.filter) === -1) {
                  return;
                }
                $thisList.children().each(function () {
                  listDef[this.nodeName] = $(this).text();
                });
                lists.push(listDef);
              });
              dfd.resolveWith($, [
                lists,
                xdata,
                status
              ]);
              if ($.isFunction(options.completefunc)) {
                options.completefunc(xdata, status, lists);
              }
            }  //end: $.ajax().success()
          });
        }).promise();
        //end: return .promise()
        // If cacheXML was true, then cache this promise
        if (options.cacheXML) {
          cache(options.cacheKey, reqPromise);
        }
        return reqPromise;
      };
      //end: getData
      return callerFn;
    }();
    //end: .getSiteListCollection
    return getSiteListCollection;
  }(jquery, src_sputils_cache, src_spapi_getSiteUrl, src_sputils_doesMsgHaveError);
  src_spapi_getUserProfile = function ($, cache, getSiteUrl, doesMsgHaveError) {
    /**
     * Retrieves a User's profile using the Login name (ex. DOMAIN\name). Data
     * is returned as an object, alogn with the webservices response.
     * @function
     *
     * @param {Object} options
     * @param {String} options.accountName
     * @param {Object} [options.otherAttr]
     * @param {String} [options.webURL=current site]
     * @param {Boolean} [options.async=true]
     * @param {Boolean} [options.cacheXML=true]
     *
     * @return {jQuery.Promise}
     *      Promise is resolved with 3 params - Object, xData, status. Object
     *      contains the properties for the user.
     */
    var getUserProfile = function () {
      var
        /**
         * Calls the sharepoint webserices.
         * @function
         *
         * @param {Object} opt
         *
         * @return {jQuery.Promise}
         */
        wsCall = null,
        /**
         * Function bound scope.
         * @type {Object}
         */
        Me = null,
        /**
         * Function caller to be returned to the bound scope.
         */
        callerFn = function getUserProfile() {
          if (Me === null) {
            Me = this;
          }
          return wsCall.apply(this, arguments);
        };
      // Define defaults. User can change these on their function attachment.
      callerFn.defaults = {
        accountName: '',
        otherAttr: '',
        webURL: '',
        async: true,
        cacheXML: true,
        completefunc: null  // deprecated.
      };
      // Get rows from SP. Returns a jQuery.Promse
      wsCall = function (opt) {
        var options = $.extend({}, callerFn.defaults, opt), reqPromise;
        if (!options.webURL) {
          options.webURL = getSiteUrl();
        } else if (options.webURL.charAt(options.webURL.length - 1) !== '/') {
          options.webURL += '/';
        }
        options.cacheKey = options.webURL + '/' + options.accountName;
        // If cache is true and we already
        if (options.cacheXML === true && cache.isCached(options.cacheKey)) {
          reqPromise = cache.get(options.cacheKey);
          // If a completefunc was defined on this call,
          // execute it.
          if ($.isFunction(options.completefunc)) {
            reqPromise.then(function (rows, data, status) {
              options.completefunc(data, status, rows);
            });
          }
          return reqPromise;
        }
        // Return a Promise
        reqPromise = $.Deferred(function (dfd) {
          // Make ajac call to SP webservice
          $.ajax({
            type: 'POST',
            cache: false,
            async: options.async,
            url: options.webURL + '_vti_bin/UserProfileService.asmx',
            beforeSend: function (xhr) {
              xhr.setRequestHeader('SOAPAction', 'http://microsoft.com/webservices/SharePointPortalServer/UserProfileService/GetUserProfileByName');
            },
            contentType: 'text/xml;charset=utf-8',
            dataType: 'xml',
            data: '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' + '<soap:Body><GetUserProfileByName xmlns="http://microsoft.com/webservices/SharePointPortalServer/UserProfileService">' + '<AccountName>' + options.accountName + '</AccountName></GetUserProfileByName></soap:Body></soap:Envelope>',
            complete: function (xData, status) {
              var $xmlDoc = $(xData.responseXML), profile = {};
              if (status === 'error' || doesMsgHaveError($xmlDoc)) {
                // If cacheXML was true, then remove this from cache.
                // No point in caching failures.
                if (options.cacheXML) {
                  cache.clear(options.cacheKey);
                }
                dfd.rejectWith($, [
                  {},
                  xData,
                  status
                ]);
                if ($.isFunction(options.completefunc)) {
                  options.completefunc(xData, status, {});
                }
                return;
              }
              $xmlDoc.find('PropertyData').each(function () {
                var $prop = $(this);
                profile[$prop.find('Name').text()] = $prop.find('Value').text() || '';
              });
              // If user passed in other Attributes, add it to the model
              if (options.otherAttr) {
                $.extend(profile, options.otherAttr);
              }
              dfd.resolveWith($, [
                profile,
                xData,
                status
              ]);
              if ($.isFunction(options.completefunc)) {
                options.completefunc.call($, xData, status, profile);
              }
            }
          });  //end: .ajax()
        }).promise();
        // If cacheXML was true, then cache this promise
        if (options.cacheXML) {
          cache(options.cacheKey, reqPromise);
        }
        return reqPromise;
      };
      //end: wsCall()
      return callerFn;
    }();
    //end: .getUserProfile()
    return getUserProfile;
  }(jquery, src_sputils_cache, src_spapi_getSiteUrl, src_sputils_doesMsgHaveError);
  src_SPWidgets = function ($, board, dateField, lookupField, peoplePicker, filterPanel, upload, getMsgError, doesMsgHaveError, xmlEscape, fillTemplate, getCamlLogical, getSPVersion, parseDateString, parseLookupFieldValue, getDateString, getNodesFromXml, makeSameHeight, getList, getListColumns, getListFormCollection, getListItems, getSiteListCollection, getSiteUrl, getUserProfile, resolvePrincipals, searchPrincipals) {
    $.SPWidgets = {
      defaults: {},
      version: '2.5.2',
      // Utilities
      escapeXML: xmlEscape.escape,
      unEscapeXML: xmlEscape.unescape,
      fillTemplate: fillTemplate,
      getCamlLogical: getCamlLogical,
      getSPVersion: getSPVersion,
      parseDateString: parseDateString,
      parseLookupFieldValue: parseLookupFieldValue,
      SPGetDateString: getDateString,
      makeSameHeight: makeSameHeight,
      /**
       * Returns information about the runtime as it applies
       * to SPWidgets.
       *
       * @return {Object} info
       *
       */
      getRuntimeInfo: function () {
        // Class
        function Info() {
          this.SPWidgets = $.SPWidgets.version;
          this.jQuery = $.fn.jquery || '?';
          this.jQueryUI = '?';
          this.jQueryUICss = '?';
          return this;
        }
        Info.prototype.asString = function () {
          var me = this, resp = '', prop;
          for (prop in me) {
            if (me.hasOwnProperty(prop)) {
              resp += '[ ' + prop + ' = ' + me[prop] + ' ] ';
            }
          }
          return resp;
        };
        //end: asString()
        var info = new Info(), $testObj = $('<div style="position:fixed;width:100px;left:-1000px;"/>').appendTo('body'), testInfo = '';
        try {
          info.jQueryUI = jQuery.ui.version;
        } catch (e) {
        }
        // Check if jQuery ui css loaded
        testInfo = $testObj.css('background-image');
        $testObj.addClass('ui-widget-header');
        if ($testObj.css('background-image') !== testInfo) {
          info.jQueryUICss = 'loaded';
        }
        $testObj.remove();
        return info;
      },
      // SP API methods
      SPAPI: {
        getList: getList,
        getListColumns: getListColumns,
        getListFormCollection: getListFormCollection,
        getListItems: getListItems,
        getSiteListCollection: getSiteListCollection,
        getSiteUrl: getSiteUrl,
        getUserProfile: getUserProfile,
        resolvePrincipals: resolvePrincipals,
        searchPrincipals: searchPrincipals,
        getNodesFromXml: getNodesFromXml
      }
    };
    // Exposes all of the widgets as jQuery plugins, by adding them
    // to the jQuery $.fn namespace
    $.each({
      SPShowBoard: board,
      SPDateField: dateField,
      SPLookupField: lookupField,
      pickSPUser: peoplePicker,
      SPFilterPanel: filterPanel,
      SPControlUpload: upload,
      SPGetMsgError: getMsgError,
      SPMsgHasError: doesMsgHaveError
    }, function (pluginName, pluginContructor) {
      // Add plugin to the jQuery fn namespace
      $.fn[pluginName] = function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(this);
        return pluginContructor.apply(pluginContructor, args);
      };
      // If plugin has global defaults, then add them to the $.SPWidgts.defautls as well.
      if (pluginContructor.defaults) {
        $.SPWidgets.defaults[pluginName] = pluginContructor.defaults;
      }
    });
  }(jquery, src_boardWidget_board, src_dateFieldWidget_dateField, src_lookupFieldWidget_lookupField, src_peoplePickerWidget_peoplePicker, src_filterPanelWidget_filterPanel, src_uploadWidget_upload, src_sputils_getMsgError, src_sputils_doesMsgHaveError, src_sputils_xmlEscape, src_sputils_fillTemplate, src_sputils_getCamlLogical, src_sputils_getSPVersion, src_sputils_parseDateString, src_sputils_parseLookupFieldValue, src_sputils_getDateString, src_sputils_getNodesFromXml, src_uiutils_makeSameHeight, src_spapi_getList, src_spapi_getListColumns, src_spapi_getListFormCollection, src_spapi_getListItems, src_spapi_getSiteListCollection, src_spapi_getSiteUrl, src_spapi_getUserProfile, src_spapi_resolvePrincipals, src_spapi_searchPrincipals);
  (function (c) {
    var d = document, a = 'appendChild', i = 'styleSheet', s = d.createElement('style');
    s.type = 'text/css';
    d.getElementsByTagName('head')[0][a](s);
    s[i] ? s[i].cssText = c : s[a](d.createTextNode(c));
  }('div.spwidget-board{width:100%;position:relative}div.spwidget-board div.spwidget-board-headers,div.spwidget-board div.spwidget-board-headers-cntr,div.spwidget-board div.spwidget-board-states-cntr,div.spwidget-board div.spwidget-board-states{width:100%}div.spwidget-board div.spwidget-board-state{width:49%;float:left;margin:0% .1%;padding:.2%;overflow:auto}div.spwidget-board div.spwidget-board-headers-cntr div.spwidget-board-state{font-weight:700;font-size:1.1em;overflow:hidden;word-wrap:break-word}div.spwidget-board div.spwidget-board-headers-cntr .spwidget-board-header-title{display:inline-block}div.spwidget-board div.spwidget-board-headers-cntr .spwidget-state-item-stat-cntr{display:inline-block;font-size:.8em;float:right}div.spwidget-board div.spwidget-board-headers-cntr .spwidget-item-stat{display:inline-block;min-width:2em;padding:0 .2em;text-align:center}div.spwidget-board div.spwidget-board-states div.spwidget-board-state{margin-bottom:1em;min-height:10em}div.spwidget-board div.spwidget-board-state div.spwidget-board-state-item{padding:.2em;margin:.5em .2em;font-weight:400;cursor:move;overflow:hidden;word-break:break-word}div.spwidget-board div.spwidget-board-state-item div.spwidget-board-item-actions{margin-top:.2em;padding:.2em .5em;overflow:hidden}div.spwidget-board .spwidget-board-placeholder{height:3em}div.spwidget-board-settings{font-size:.8em;margin:.2em}div.spwidget-board-settings div.spwidget-board-column-list-cntr{z-index:5;position:absolute}div.spwidget-board-settings div.spwidget-board-column-list-cntr>div{padding:.2em}div.spwidget-board-settings div.spwidget-board-column-list-cntr>div:first-child,div.spwidget-board-settings div.spwidget-board-column-list-cntr>div:last-child{text-align:right}div.spwidget-board-settings div.spwidget-board-column-list{width:20em;height:17em;overflow:auto;position:relative}div.spwidget-board-settings div.spwidget-board-column-list-cntr .spwidget-board-msg{position:absolute;top:1px;left:1px;padding:.2em}div.spwidget-board-settings div.ui-state-default{position:relative}div.spwidget-board-settings div.spwidget-board-column-list>a{display:block;margin:.2em;padding:.2em}div.spwidget-board-settings div.spwidget-board-column-list>a>span.ui-icon{display:inline-block}div.spwidget-board .spwidget-states-3 div.spwidget-board-state{width:32.4%}div.spwidget-board .spwidget-states-4 div.spwidget-board-state{width:24%}div.spwidget-board .spwidget-states-5 div.spwidget-board-state{width:19.1%}div.spwidget-board .spwidget-states-6 div.spwidget-board-state{width:15.8%}div.spwidget-board .spwidget-states-7 div.spwidget-board-state{width:13.4%}div.spwidget-board .spwidget-states-8 div.spwidget-board-state{width:11.6%}div.spwidget-board .spwidget-states-9 div.spwidget-board-state{width:10.2%}div.spwidget-board .spwidget-states-10 div.spwidget-board-state{width:9.1%}.spwidget-date-cntr{display:inline-block;position:relative}.spwidget-date-cntr div.spwidget-date-input-cntr{position:relative}.spwidget-date-cntr input{width:99%}.spwidget-date-cntr img.ui-datepicker-trigger{display:block;position:absolute;right:2%;top:.3em}.spwidget-date-cntr .spwidgets-item-remove{color:red;font-size:xx-small;vertical-align:super;cursor:pointer}.spwidget-date-cntr div.spwidget-datetime-selector{padding:.5em;position:absolute;width:28em;z-index:1}.spwidget-date-cntr div.spwidget-datetime-selector div.ui-datepicker-inline{width:14em}.spwidget-date-cntr div.spwidget-datetime-selector div.spwidget-date-selector,.spwidget-date-cntr div.spwidget-datetime-selector div.spwidget-time-selector{float:left}.spwidget-date-cntr div.spwidget-selectors:before{content:"";display:table;line-height:0}.spwidget-date-cntr div.spwidget-selectors:after{content:"";display:table;line-height:0;clear:both}.spwidget-date-cntr div.spwidget-datetime-selector select.spwidget-hour,.spwidget-date-cntr div.spwidget-datetime-selector select.spwidget-min,.spwidget-date-cntr div.spwidget-datetime-selector select.spwidget-ampm{font-size:1.2em}.spwidget-date-cntr div.spwidget-time-selector{margin-left:.2em;width:11em}.spwidget-date-cntr div.spwidget-time-selector-cntr{padding:.2em}.spwidget-date-cntr div.spwidget-time-selector div.ui-widget-header{text-align:center;line-height:2em;margin-bottom:.5em}.spwidget-date-cntr .spwidget-time-hour,.spwidget-date-cntr .spwidget-time-min,.spwidget-date-cntr .spwidget-time-ampm{margin-top:.2em;padding:.2em}.spwidget-date-cntr .spwidget-time-selector-cntr select,.spwidget-date-cntr .spwidget-time-selector-cntr label{overflow:hidden;display:inline-block;font-weight:700}.spwidget-date-cntr .spwidget-time-selector-cntr select{width:4em}.spwidget-date-cntr .spwidget-time-selector-cntr label{width:5em;font-size:.9em}.spwidget-date-cntr .spwidget-inline div.spwidget-datetime-selector{position:relative;width:26em}.spwidget-btn-set{display:none;position:absolute;right:.2em;bottom:.2em}.spwidget-date-multiples-cntr .spwidget-btn-set{display:block}.spwidgets-lookup-cntr{position:relative;display:inline-block;zoom:1;*display:inline}.spwidgets-lookup-cntr .spwidgets-lookup-selected{-moz-appearance:textfield;-webkit-appearance:textfield;background-color:#fff;background-color:-moz-field;border:1px solid darkgray;box-shadow:1px 1px 1px 0 lightgray inset;font:-moz-field;font:-webkit-small-control;margin-top:5px;padding:2px 5px}.spwidgets-lookup-cntr .spwidgets-lookup-selected .spwidgets-item{display:inline-block;margin-left:.5em}.spwidgets-lookup-cntr .spwidgets-item:first-child{margin-left:0}.spwidgets-lookup-cntr .spwidgets-item-remove{color:red;font-size:xx-small;vertical-align:super;cursor:pointer}.spwidgets-lookup-cntr .spwidgets-lookup-input{margin:.2em 0;position:relative}.spwidgets-lookup-cntr .spwidgets-lookup-input input{width:99%}.spwidgets-lookup-cntr ul.ui-autocomplete{overflow:auto;z-index:1}.spwidgets-lookup-cntr div.spwidget-lookup-readyonly .spwidgets-lookup-selected{-moz-appearance:none;-webkit-appearance:none;background-color:transparent;border:none;box-shadow:none;font:inherit}.spwidgets-lookup-cntr div.spwidget-lookup-readyonly .spwidgets-item-remove{display:none}.spwidgets-lookup-cntr .spwidget-lookup-selector-showhide{background-repeat:no-repeat;background-image:url("/_layouts/images/bizdatacontentsource.gif");cursor:pointer;display:block;position:absolute;text-indent:-99999px;z-index:5;height:16px;width:16px;right:5px;top:.3em}.spwidgets-lookup-cntr div.spwidget-lookup-selector-cntr{display:none;position:absolute;left:0;z-index:10;padding:.2em;width:98%;font-size:.8em}.spwidgets-lookup-cntr div.spwidget-lookup-selector-cntr>.ui-state-default{padding:.2em;text-align:right}.spwidgets-lookup-cntr div.spwidget-lookup-selector-item-cntr{height:15em;overflow:auto;padding:.2em;font-size:1em}.spwidgets-lookup-cntr div.spwidget-lookup-selector-item-cntr .ui-state-highlight{padding:.5em;margin:1em .2em;text-align:center;font-size:1.1em;font-weight:700}.spwidgets-lookup-cntr div.spwidget-lookup-selector-item-cntr .spwidget-lookup-selector-next{cursor:pointer}.spwidgets-lookup-cntr div.spwidget-lookup-selector-item-cntr .spwidget-lookup-item{padding:.2em .5em;margin:.2em;cursor:pointer;font-weight:400}.pt-pickSPUser .pt-pickSPUser-selected .pt-pickSPUser-person{float:left;margin-left:.2em}.pt-pickSPUser .pt-pickSPUser-hint{font-size:.9em}.pt-pickSPUser div.pt-pickSPUser-input input.ui-autocomplete{width:99%}.pt-pickSPUser div.pt-pickSPUser-input ul.ui-autocomplete{z-index:1}.pt-pickSPUser .pt-pickSPUser-person-cntr{margin:.2em 0;padding:.2em;position:relative}.pt-pickSPUser .pt-pickSPUser-person-cntr .pt-person-name{padding-right:2em}.pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions{position:absolute;right:1px;top:1px;padding:.2em;display:none}.pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions .pt-pickSPUser-person-action-links,.pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions .pt-pickSPUser-person-action-links .tt-confirm-delete{float:right}.pt-pickSPUser .pt-pickSPUser-person-cntr.ui-state-hover .pt-pickSPUser-person-actions,.pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions.tt-confirm,.pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions a{display:block;float:right}.ui-autocomplete-loading{background:#fff url(\'/_layouts/images/loading.gif\') right center no-repeat}div.spwidget-filter{width:100%;position:relative}div.spwidget-filter .spwidget-date-cntr,div.spwidget-filter .spwidgets-lookup-cntr{display:block}div.spwidget-filter .spwidget-filter-column-cntr{overflow:auto;position:relative}div.spwidget-filter .spwidget-type-text input.spwidget-filter-input,div.spwidget-filter .spwidget-type-people input.ui-autocomplete-input,div.spwidget-filter div.spwidget-type-choice div.spwidget-filter-value-input{width:95%}div.spwidget-filter .spwidgets-lookup-cntr{width:96%}div.spwidget-filter .spwidget-date-cntr div.spwidget-date-input-cntr{width:97%}div.spwidget-filter div.spwidget-column{padding:.5em;margin:.5em;position:relative;border-bottom:1px solid darkgray;box-shadow:1px 1px 1px 0 lightgray inset}div.spwidget-filter div.spwidget-column-actions{position:absolute;right:1%;top:10%}div.spwidget-filter div.spwidget-column-actions a{display:block}div.spwidget-filter div.spwidget-column-sort-actions{display:none}div.spwidget-filter div.spwidget-has-sort-order div.spwidget-column-sort-actions{display:block}div.spwidget-filter div.spwidget-filter-type-cntr,div.spwidget-filter div.spwidget-column-actions a{opacity:.6;filter:alpha(opacity=60)}div.spwidget-filter div.spwidget-filter-type-cntr:hover,div.spwidget-filter div.spwidget-column-actions a:hover{opacity:1}div.spwidget-filter div.spwidget-filter-type-cntr{position:absolute;font-size:.8em;top:.6em;right:8%}div.spwidget-filter div.spwidget-filter-type-cntr select{text-overflow:ellipsis;width:5em}div.spwidget-filter div.spwidget-filter-value-cntr{width:96%}div.spwidget-filter div.spwidget-filter-value-cntr>label{display:block;padding:.2em;font-weight:700}div.spwidget-filter div.spwidget-column-dirty div.spwidget-filter-value-cntr>label{color:red}div.spwidget-filter .spwidget-tooltip{display:block;font-size:.8em;font-style:italic}div.spwidget-filter div.spwidgets-lookup-cntr div.spwidgets-lookup-selected>div.spwidgets-item{display:block;margin-left:0}div.spwidget-filter div.spwidget-type-choice div.spwidget-filter-value-input{max-height:6em;overflow:auto;-moz-appearance:textfield;-webkit-appearance:textfield;background-color:#fff;background-color:-moz-field;border:1px solid darkgray;box-shadow:1px 1px 1px 0 lightgray inset;font:-moz-field;font:-webkit-small-control;padding:2px 5px}div.spwidget-filter div.spwidget-type-choice div.spwidget-filter-value-input label{display:block;padding:.2em}div.spwidget-filter .spwidget-disabled{-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50);opacity:.5}div.spwidget-filter div.spwidget-filter-button-cntr{padding:.5em 4%;margin-top:.5em;text-align:right}.spcontrolupload .mainContainer{position:relative;display:block;height:4em}.spcontrolupload .iFrameWindow,.spcontrolupload .buttonPane{position:absolute;top:0;height:3em}.spcontrolupload .spwidget-success-cntr,.spcontrolupload .loadingOverlay{position:absolute;top:0;height:3em;width:100%}.spcontrolupload .buttonPane{left:0;width:10%;overflow:hidden;cursor:pointer}.spcontrolupload .buttonPane .upload_button{font-weight:700;font-size:1.1em;text-align:center;margin-top:.8em}.spcontrolupload .iFrameWindow{width:90%;left:10%;overflow:hidden}.spcontrolupload .iFrameWindow iframe{overflow:auto;width:100%;height:99%}.spcontrolupload .spwidget-show-full-form .iFrameWindow{overflow:auto;width:100%;margin:0;left:0;right:auto;z-index:5}.spcontrolupload .loadingOverlayMsg{font-size:1em;background-position:left top;background-repeat:no-repeat;background-image:url(\'/_layouts/images/loadingcirclests16.gif\');margin:.5em;padding-left:25px}.spcontrolupload .spwidget-success-cntr,.spcontrolupload .spwidget-error-cntr{display:none}.spcontrolupload div.spwidget-msg-cntr{margin:.5em .5em .5em 3em;font-size:1em;background-position:left top;background-repeat:no-repeat}.spcontrolupload .spwidget-close{color:red;font-size:xx-small;font-weight:700;vertical-align:super;cursor:pointer}.spcontrolupload .spwidget-success-cntr div.spwidget-msg-cntr{background-image:url(\'/_layouts/images/STS_ListItem_43216.gif\');padding-left:30px}.spcontrolupload .spwidget-error-cntr{bottom:-1.5em;left:0;width:100%;position:absolute}.spcontrolupload-dev-mode .iFrameWindow{overflow:auto!important;height:auto!important;z-index:5!important}.spcontrolupload-dev-mode .iFrameWindow iframe{overflow:scroll!important}'));
}));
}());
/**
 * @fileOverview demo.common.js
 * Common file for all demos. Initiates the UI on the page.
 *
 * @version 1453764305743
 *
 */
(function($){
    /* global SPWIDGET_DEMO */

    var Main = SPWIDGET_DEMO;
    // an array of demos that will be initialized. Each demo adds its function to this array.
    // Array alias is: window.SPWIDGET_DEMO
    Main.demoInitializers = [];

    /**
     * Initialize the demos
     */
    Main.init = function() {

        Main.debug = (
            String(window.location.search).indexOf("debug=1") > -1 ?
                true :
                false
        );

        /**
         * Given a container element, this method will insert a
         * list of List and/or Libraries in the current site
         * for the user to select/pick one.
         *
         * @param {Object} options
         * @param {HTMLElement|jQuery} options.container
         * @param {Boolean} [options.includeLibraries=true]
         * @param {Boolean} [options.includeLists=true]
         * @param {Function} [options.onListSelect=null]
         *      Function will have the scope of the library picker
         *      HTML element (as a jQuery object) and given 2 input
         *      parameters - 1) jQuery object with the list definition
         *      and 2) the html element that the user clicked on.
         *
         * @return {Object} Main
         *
         */
        Main.insertListSelector = function(options) {

            var opt = $.extend({}, {
                    container:          null,
                    includeLibraries:   true,
                    includeLists:       true,
                    onListSelect:       null
                },
                options);

            if (!opt.container) {

                return Main;

            }

            opt.container = $(opt.container);

            // Have the user pick which library to use in the demo.
            $.SPWidgets.SPAPI.getSiteListCollection({
                async:      false,
                cacheXML:   true,
                completefunc: function (xData/*, Status*/) {

                    var $siteLists  = $(xData.responseXML),
                        htmlList    = '';

                    opt._lists = null;

                    // Get a set (array) of lists to work with
                    if (opt.includeLibraries && opt.includeLists) {

                        opt._lists = $siteLists.find("_sList");

                    } else if (opt.includeLibraries) {

                        opt._lists = $siteLists
                                    .find("_sList BaseType:contains('DocumentLibrary')")
                                        .parent();

                    } else if (opt.includeLists) {

                        opt._lists = $siteLists
                                    .find("_sList BaseType:contains('GenericList')")
                                        .parent();

                    } else {

                        return Main;

                    }

                    // If no lists define, then exit
                    if (!opt._lists || !opt._lists.length) {

                        return Main;

                    }

                    // Loop through all lists and build the UI for it.
                    opt._lists.each(function(){

                        var $list = $(this);

                        htmlList +=
                            '<a href="javascript:" class="ui-state-default" data-list_uid="' +
                             $.trim($list.find("InternalName").text()) +
                             '" data-list_name="' +
                             $list.find("Title").text() + '">' +
                             $list.find("Title").text() + ' </a>';

                    });

                    opt._widget = $('<div class="spwidgets-demo-list-picker">' +
                            '<div class="ui-state-active spwidgets-demo-list-selected">Select List...</div>' +
                            '</div>')
                        .appendTo(opt.container)
                        .append(
                            '<div class="spwidgets-demo-list-selector ui-widget-content" style="display:none;">' +
                            htmlList + '</div>' )
                        .on("click", "div.spwidgets-demo-list-selected", function(/*ev*/){

                            var $this = $(this).html("Select...");

                            opt._widgetSelector
                                .css("display", "")
                                .position({
                                    my: "left top",
                                    at: "left top",
                                    of: $this
                                });

                        })
                        .on("click", "a", function(/*ev*/){

                            var $this   = $(this),
                                $list   = opt._lists
                                            .find(
                                                "_sList InternalName:contains('" +
                                                $this.data("list_uid") + "')"
                                            )
                                            .parent();

                            opt._widgetSelector.hide();

                            opt._widgetSelected.html("List: " + $list.find("Title").text());

                            if ($.isFunction(opt.onListSelect)) {

                                opt.onListSelect.call(
                                    opt.container, $list, $this);

                            }

                        });

                    opt._widgetSelector = opt._widget.find("div.spwidgets-demo-list-selector");
                    opt._widgetSelected = opt._widget.find("div.spwidgets-demo-list-selected");

                }//end: completefunc()
            });

            return Main;

        }; //end: Main.insertListSelector();


        /**
         * Inserts a list column selector into the defined container.
         *
         * @param {Object} options
         * @param {Object} options
         * @param {Object} options
         * @param {Object} [options.onColumnSelect=null]
         *          Called with a scope of container and 3 params:
         *          thisCol, opt.listName, html a element
         *
         *
         * @return {jQuery.Promise}
         *          Resolved with scope of the container
         *
         */
        Main.insertListColumnSelector = function(options) {

            return $.Deferred(function(dfd){

                 var opt = $.extend({}, {
                        container:      null,
                        listName:       "",
                        ColumnType:     "",
                        onColumnSelect: null
                    },
                    options);

                if (!opt.container) {

                    dfd.resolve();
                    return;

                }

                opt.container = $(opt.container).empty();

                Main.getListColumns(opt.listName)
                    .then(function(columns){

                        var htmlList = "";

                        // Loop through all lists and build the UI for it.
                        $.each(columns, function(i, column){

                            htmlList +=
                                '<a href="javascript:" class="ui-state-default" data-list_name="' +
                                 opt.listName + '" data-column_name="' + column + '">' +
                                 column + ' </a>';

                        });

                        // If no columns, entere default message
                        if (htmlList === "") {

                            htmlList += '<div>No Columns!</div>';

                        }

                        opt._widget = $('<div class="spwidgets-demo-list-picker">' +
                                '<div class="ui-state-active spwidgets-demo-list-selected">Select Column...</div>' +
                                '</div>')
                            .appendTo(opt.container)
                            .append(
                                '<div class="spwidgets-demo-list-selector ui-widget-content" style="display:none;">' +
                                htmlList + '</div>' )
                            .on("click", "div.spwidgets-demo-list-selected", function(/*ev*/){

                                var $this = $(this).html("Column: Select...");

                                opt._widgetSelector
                                    .css("display", "")
                                    .position({
                                        my: "left top",
                                        at: "left top",
                                        of: $this
                                    });

                            })
                            .on("click", "a", function(/*ev*/){

                                var $this   = $(this),
                                    thisCol  = $this.data("column_name");

                                opt._widgetSelector.hide();

                                opt._widgetSelected.html( "Column: " + thisCol );

                                if ($.isFunction(opt.onColumnSelect)) {

                                    opt.onColumnSelect.call(
                                        opt.container, thisCol, opt.listName, $this);

                                }

                            });

                        opt._widgetSelector = opt._widget.find("div.spwidgets-demo-list-selector");
                        opt._widgetSelected = opt._widget.find("div.spwidgets-demo-list-selected");

                        dfd.resolveWith(opt.container);

                    });

            })
            .promise();


        }; //end: Main.insertListColumnSelector()


        /**
         * Gets the list of columns names by using the Edit form
         *
         * @param {Object} listName
         *
         * @return {jQuery.Promise}
         */
        Main.getListColumns = function(listName){

            return $.Deferred(function(dfd){

                $.SPWidgets.SPAPI.getListColumns({listName: listName}).then(function(listCols){

                    var cols = listCols.map(function(col){
                        return col.DisplayName;
                    });
                    dfd.resolveWith($, [cols]);

                });

                // $('<div style="display:none;"/>')
                    // .load(
                        // String(
                                // $.SPWidgets.SPAPI.getSiteUrl() +
                                // "Lists/" + listName + "/NewForm.aspx"
                            // )
                            // .replace(/ /, "%20") +
                            // " .ms-formtable",
                        // function(){
//
                            // var $ele = $(this),
                                // cols = ['ID'];
//
                            // $ele.find(".ms-standardheader").each(function(){
//
                                // cols.push( $.trim( $(this).text().replace(/ \*/, "") ) );
//
                            // });
//
                            // dfd.resolveWith($, [cols]);
//
                            // $ele.remove();
//
                        // }
                    // );

            })
            .promise();

        }; //end: getListColumns()

        /**
         * Given an element, this method will setup it up for logging data,
         * and return an object ready to interact with it.
         */
        Main.setupLogOutput = function(options) {

            var opt     = $.extend({}, {
                            container: null,
                            fixHeight: true,
                            height:     '40em'
                        }, options),
                Inst    = {},
                css     = {
                            padding: ".2em",
                            position: "relative"
                        };

            if (!opt.container) {

                return;

            }

            opt.container = $(opt.container);

            if (opt.fixHeight){

                css.height      = opt.height;
                css.overflow    = "auto";

            }

            opt.container
                .addClass("ui-widget-content")
                .css(css);

            Inst.log = function(data) {

                opt.container.append('<div>' + data + '<div>');
                opt.container.scrollTop(opt.container.children(":last").position().top);

            }; //end: log()

            return Inst;

        }; //end: Main.setupLogOutput()


        //------------------------------------------
        //   INITIALIZE THE DEMO UI
        //------------------------------------------
        Main.$ui = $("#spwidgets_demo_cntr")
                .css("display", "")
                .on("keyup", function(ev){

                    if (ev.which === 13) {
                        ev.preventDefault();
                        ev.stopPropagation();
                    }

                });

        // Create TABs and make ui visible
        Main.$ui.find("#ptTabsCntr")
            .tabs()
            .fadeIn("slow");

        // Populate the About page
        $("#SPWidgetsAbout ul.spwidgets-demo-info-cntr").each(function(){

            var $ul     = $(this);

            setTimeout(function(){

                var info    = $.SPWidgets.getRuntimeInfo(),
                    display = '',
                    key;

                for (key in info){

                    if (info.hasOwnProperty(key)) {

                        display += '<li>' + key + ': ' + info[key] + '</li>';

                    }

                }

                $ul.append(display);


            }, 2000);

        });

        $.each(Main.demoInitializers, function(i, demoFn){

            if ($.isFunction(demoFn)) {
                demoFn();
            }

        });

    }; //end: init()

}(SPWIDGET_DEMO.JQUERY || jQuery));


            // Get private version of jQuery for use by this demo only!
            SPWIDGET_DEMO.JQUERY = jQuery.noConflict(true);

            return SPWIDGET_DEMO.JQUERY || jQuery;

        })()
    ); //end: initialize all code

}, 2000); //end: setTimeout

</script>

</asp:Content>

