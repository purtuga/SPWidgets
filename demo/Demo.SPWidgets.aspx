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

<!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
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
 * Build Date:  2016-09-09
 * Version:     2.5.4 1473439134741
 *
 */
</script>
<div id="spwidgets_demo_cntr" class="ui-widget-content" style="display:none;">

<div class="spwidgets-demo-cntr"> <div class="spwidgets-demo-top-banner ui-state-active"> <h1>Demo of SPWidgets</h1> <p class="ui-widget-content ui-corner-all"> SPWidgets is a set of Sharepoint widgets meant to facilitate the building of custom UI's. This demo contains a showcase of the widgets that are available and serves to only scratch at the possibilities of what can be accomplished with them. Visit the project at <a href="http://purtuga.github.io/SPWidgets/">purtuga.github.io/SPWidgets</a> </p> </div> <div id="ptTabsCntr" style="display: none"> <ul> <li><a href="#SPControlUploadDemo"><span>Upload</span></a></li> <li><a href="#SPControlPickUserDemo"><span>People Picker</span></a></li> <li><a href="#SPControlBoardDemo"><span>Board</span></a></li> <li><a href="#SPControlLookupFieldDemo"><span>Lookup Field</span></a></li> <li><a href="#SPControlListFilterPanel"><span>List Filter Panel</span></a></li> <li><a href="#SPDateField"><span>Date Field</span></a></li> <li><a href="#SPWidgetsAbout"><span class="ui-icon ui-icon-info">Info</span></a></li> </ul> <div id="SPControlUploadDemo"> <h2>Upload Plugin</h2> <div style="padding: 1em;margin: 3em auto" class="ui-state-highlight"> Once an existing Document Library is selected, you will be presented with an upload button that will allow you to upload files to the root of the library selected. </div> <hr> <div> <div class="spwidgets-demo-lists"></div> <div class="spwidget-demo-upload-cntr"> <h3></h3> <div class="spwidget-demo-upload-widget"></div> <div> <span>Last File Uploaded: </span> <span class="spwidget-demo-upload-last-file"></span> </div> <div class="spwidget-demo-library-files"> <table width="100%" cellpadding="4" cellspacing="0"> <thead> <tr> <th class="ui-widget-header">File</th> <th class="ui-widget-header">Last Modified</th> <th class="ui-widget-header">Last Modified By</th> </tr> </thead> <tbody> </tbody> </table> </div> </div> </div> </div> <div id="SPControlPickUserDemo"> <h2>People Picker</h2> <div style="min-height: 300px"> <div style="padding: 1em;margin: 3em auto" class="ui-state-highlight"> Start typing the user name (last or first) and a list of suggested selections will be displayed. Because it is using jQuery UI, mouse or keyboard shortcuts can be used to select a user. The input field that was used to bind this plugin will be populated with the selected user information in the formta expected for update to the sharepoing list (ID;#userName) </div> <div> <h3>Demo 1: Basic People Picker</h3> <p>A basic setup on an input element.<br>(Note: Once a person is selected here, Demo number two will be initiated and made visible below.</p> <div> <label>User Name</label> <input type="text" name="spuserdemo"> <div id="sp_control_pick_user_detail" style="margin-top: 1em;padding:1em"></div> </div> <div> <h4>Events Output</h4> <div id="SPControlPickUserEventOut"> </div> </div> </div> <hr> <div id="spuserdemo2cntr" style="display:none"> <h3>Demo 2: Pre-populated People Picker</h3> <div>Input element in this example was pre-populated with <span class="spwidgets-demo-know-user"></span> and then initiated with the widget. Result should be a people picker that has 1 user already selected.</div> <div> <label>Person</label> <input type="text" name="spuserdemo2"> <div id="sp_control_pick_user_detail2" style="margin-top: 1em;padding:1em"></div> </div> </div> </div> </div> <div id="SPControlBoardDemo"> <h2>Kan-Ban Board Widget</h2> <div class="spwidget-demo-tabs"> <ul> <li> <a href="#spwidgets_demo_board_demo"> <span>Demo</span> </a> </li> <li> <a href="#spwidgets_demo_board_output"> <span>Output</span> </a> </li> <li> <a href="#spwidgets_demo_board_about"> <span>About</span> </a> </li> </ul> <div id="spwidgets_demo_board_demo"> <p> Click below to select a list followed by a column from that list. Reminder: Column must be of a type supported by the widget (Lookup, Choice).<br> The Board is configured to be displayed with a fixed height of 500px. </p> <div class="spwidgets-demo-lists"></div> <div class="spwidgets-demo-columns"></div> <div class="spwidget-board-demo-cntr"></div> </div> <div id="spwidgets_demo_board_output"> <p> Events fired by the widget will populate data here. </p> <div class="spwidget-demo-code ui-widget-content ui-corner-all"></div> </div> <div id="spwidgets_demo_board_about"> <p> The Board widget displays a Kan-Ban type board for list items, allowing the user to quickly move items around between states. The example below is using the Tasks List commonly used in all Sharepoint Sites, and specifically, the Status Field of that List. </p> </div> </div> </div> <div id="SPControlLookupFieldDemo"> <h2>Lookup Field Widget</h2> <div class="spwidget-demo-fluid spwidget-demo-float-cntr"> <div class="ui-widget-content ui-corner-all spwidget-demo-float"> <p>Click below to select a List.</p> <div class="spwidgets-demo-lists"></div> <div class="spwidgets-demo-lookup-examples"> <div> <h3>Example 1</h3> <p>Field below allows user to pick only 1 value.</p> <div> <input name="example1"> </div> </div> <div> <h3>Example 2</h3> <p>Field below allows user to select mulitple values (multi-select).</p> <div> <input name="example2"> </div> </div> <div> <h3>Example 3</h3> <p>Field below allows user to select mulitple values (multi-select) and displays the selector, which allows the user the ability to "browse" the list looking for the correct value. In addition, the List items are sorted by ID in Descending order.</p> <div> <input name="example3"> </div> <div class="spwidgets-dev-only"> <a href="javascript:" class="spwidgets-demo-lookup-example3-clear-all">Clear All</a> </div> </div> </div> </div> <div class="spwidget-demo-float"> <div class="spwidget-demo-tabs"> <ul> <li> <a href="#spwidgets_demo_lookup_output"> <span>Output</span> </a> </li> <li> <a href="#spwidgets_demo_lookup_about"> <span>About</span> </a> </li> </ul> <div id="spwidgets_demo_lookup_output"> <p> Area below will capture out of events from the demo. </p> <div class="spwidget-demo-code ui-widget-content ui-corner-all"></div> </div> <div id="spwidgets_demo_lookup_about"> <p> The Lookup Field widget provides a custom interface for List/Library field of type Lookup. It turns an input field into a Type-Ahead/autocomplete field allowing the user to start typing values and select a match from the suggestion. </p> </div> </div> </div> </div> </div> <div id="SPControlListFilterPanel"> <h2>List Filter Widget Demo</h2> <div class="spwidget-demo-fluid spwidget-demo-float-cntr"> <div class="ui-widget-content ui-corner-all spwidget-demo-float"> <p>This demo uses one of lists available on this site (picker below) and displays a filter panel for the fields on that list.</p> <p>Click below to select a List.</p> <div class="spwidgets-demo-lists"></div> <div class="spwidgets-list-filter ui-widget-content" style="padding: .5em"> </div> </div> <div class="spwidget-demo-float"> <div class="spwidget-demo-tabs"> <ul> <li> <a href="#spwidgets_demo_filter_results"> <span>Results</span> </a> </li> <li> <a href="#spwidgets_demo_filter_output"> <span>CAML XML</span> </a> </li> <li> <a href="#spwidgets_demo_filter_about"> <span>About</span> </a> </li> </ul> <div id="spwidgets_demo_filter_results"> <p> The results from the filter defined are displayed below. Results are limited only to the first 10 matches and the first 3 columns.. </p> <div class="spwidgets-demo-filter-result-output"> </div> </div> <div id="spwidgets_demo_filter_output"> <p> Click the filter button to see CAML generated from filter values entered. </p> <div class="spwidgets-list-filter-query"> <textarea name="camlquery" class="spwidget-demo-code"></textarea> </div> </div> <div id="spwidgets_demo_filter_about"> <p> The List Filter widget displays a filter panel to collect information from the user. Data can be used to then retrieve rows from the list using the criteria provided by the user. </p> <h3>Test: filter panel width adjustment</h3> <div style="padding: .5em; margin-bottom: 2em;margin-top:2em"> <div style="margin-bottom: 1em"> Use slider below to test width of container holding the filter panel and see how the content adjusts to the new width.</div> <div class="ui-widget-content spwidgets-list-filter-slider-value ui-corner-all" style="text-align:center;width:5em;padding:.5em;margin:.2em;font-size:1.5em;font-weight:bold">100%</div> <div class="spwidgets-list-filter-width" style="width: 50%"></div> </div> <h3>Test: setFilter</h3> <p>Set the ID column value via setFilter method. The column should be populated with a value of 'one;two', a match type of 'Contains' and a sort order of 'Ascending'. The column should be shown as dirty.</p> <p> <a id="spwidgets_demo_filter_test_setfilter" href="javascript:">Run</a> </p> <h3>Test: setFilter - sortOrder only</h3> <p>Set the ID column sortOrder only via setFilter method. Only the sort order should be set to 'Ascending' and the column should show dirty.</p> <p> <a id="spwidgets_demo_filter_test_sortOrder" href="javascript:">Run</a> </p> </div> </div> </div> </div> </div> <div id="SPDateField"> <h2>Date Widget</h2> <div class="spwidget-demo-fluid spwidget-demo-float-cntr"> <div class="ui-widget-content ui-corner-all spwidget-demo-float"> <div class="spwidget-demo-samples"> <p> <h3>Example 1: Default</h3> </p><p>Default functionality.</p> <div class="spwidget-demo-example1"> <input class="spwidget-demo-input" type="text" name="example1"> </div>  <hr> <p> <h3>Example 2: Allow Multiples</h3> </p><p>Allow multiple dates.</p> <div> <input class="spwidget-demo-input" type="text" name="example2"> </div>  <hr> <p> <h3>Example 3: Change Date Format</h3> </p><p>Override date input format to Euro - mm/dd/yyyy</p> <div> <input class="spwidget-demo-input" type="text" name="example3"> </div>  <hr> <p> <h3>Example 4: Pre-Defined Inputs</h3> </p><p> In this example, the input field used to bind SPDateField widget was already storing 2 dates: August 1, 2013 and August 2, 2013. </p> <div> <input class="spwidget-demo-input" type="text" name="example4" value="2013-08-01;2013-08-02"> </div>  <hr> <p> <h3>Example 5: Date and Time Picker</h3> </p><p> In this example, the widget is set to also show a time picker along with the date picker. Time is displayed along with date and the date string for use with SharePoint's API will include the time element in it. When picker is displayed, it will have the currently selected date pre-selected or if not has been set yet, it will defaul to current time/date. </p> <div> <input class="spwidget-demo-input" type="text" name="example5"> </div>  <hr> <p> <h3>Example 6: Date and Time Picker - Allow Multiples</h3> </p><p> Similar to Example 5, where a date and Time picker is displayed, but allows user to define multiples. </p> <div> <input class="spwidget-demo-input" type="text" name="example6"> </div>  <hr> <p> <h3>Example 7: Date and Time Picker - Pre-Defined Inputs</h3> </p><p> In this example, the input field used to bind SPDateField widget was already storing 2 dates: August 1, 2013 1:05 AM and August 2, 2013 4:30PM. This instance also shows the use of localized labels, like Time, Hour, Minutes. </p> <div> <input class="spwidget-demo-input" type="text" name="example7" value="2013-08-01T01:05:00;2013-08-02T16:30:00"> </div>  <hr> <p> <h3>Example 8: Date Picker Displayed inline on a non-input element</h3> </p><p> Example showing the Date picker being used on a non-input element. The dates selected by the user would have to be handled by the callback to the JQuery UI Datepicker widget. </p> <div class="spwidget-spdatefield-demo8"></div>  <hr> <p> <h3>Example 9: Date and Time Picker Displayed inline on a non-input element</h3> </p><p> Example showing the Date and Time picker being used on a non-input element. The dates selected by the user would have to be handled by the callback to the JQuery UI Datepicker widget. </p> <div class="spwidget-spdatefield-demo9"></div>  <p style="height: 15em"></p> </div> </div> <div class="spwidget-demo-float"> <div class="spwidget-demo-tabs"> <ul> <li> <a href="#spwidgets_demo_date_results"> <span>Results</span> </a> </li> <li> <a href="#spwidgets_demo_date_about"> <span>About</span> </a> </li> </ul> <div id="spwidgets_demo_date_results"> <p> As the dates are selected, the demo will output data to this area when the input element's change event is triggered. </p> <div class="spwidget-output"> </div> </div> <div id="spwidgets_demo_date_about"> <p> SPDateField is a widgets wrapped around jQuery UI Datepicker that allows the user to pick one or more dates using their own locale format, while storing the SharePoint friendly format (YYY-MM-DD) in the input field to which this widget was bound to. </p> </div> </div> </div> </div> </div>  <div id="SPWidgetsAbout"> <p> Below are the version of software currently being used for this demo showcase. </p> <ul class="spwidgets-demo-info-cntr"> </ul> </div>  </div> <div> <span>Build: </span><span>1469398291025</span> </div> <div> <div id="themeSwitchWidget"></div> </div> </div>

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

/*! SPWidgets v2.5.4 2016-09-09 | MIT | Copyright (c) 2016 Paul Tavares | http://purtuga.github.io/SPWidgets */
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


                    // Get the list definition and build the template for the
                    // output of what was found.
                    $.SPWidgets.SPAPI.getList({
                        listName:   listName,
                        cacheXML:   false,
                        async:      true,
                        completefunc: function(xData/*, status*/) {

                            var resp = $(xData.responseXML);

                            $.each(columns, function(i, col){

                                var $colXml = resp.find("Fields Field[DisplayName='" +
                                                col + "']");

                                tblHeader   += '<th class="ui-widget-content">' +
                                                col + '</th>';

                                rowTemplate += '<td class="ui-widget-content">{{' +
                                                $colXml.attr("StaticName") + '}}</td>';

                                camlFields  += '<FieldRef Name="' +
                                                $colXml.attr("StaticName") + '" />';

                                if (i === 2) {

                                    return false;

                                }

                            });

                            tblHeader   = '<tr>' + tblHeader + '</tr>';
                            rowTemplate = '<tr>' + rowTemplate + '</tr>';
                            camlFields  = '<ViewFields>' + camlFields + '</ViewFields>';

                        }//end: completefunc
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

/*! SPWidgets v2.5.4 2016-09-09 | MIT | Copyright (c) 2016 Paul Tavares | http://purtuga.github.io/SPWidgets */
/*! jQuery v1.12.4 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="1.12.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray||function(a){return"array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;try{if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(!l.ownFirst)for(b in a)return k.call(a,b);for(b in a);return void 0===b||k.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(h)return h.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=e.call(arguments,2),d=function(){return a.apply(b||this,c.concat(e.call(arguments)))},d.guid=a.guid=a.guid||n.guid++,d):void 0},now:function(){return+new Date},support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return n.inArray(a,b)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return!0}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}if(f=d.getElementById(e[2]),f&&f.parentNode){if(f.id!==e[2])return A.find(a);this.length=1,this[0]=f}return this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||(e=n.uniqueSort(e)),D.test(a)&&(e=e.reverse())),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=!0,c||j.disable(),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.addEventListener?(d.removeEventListener("DOMContentLoaded",K),a.removeEventListener("load",K)):(d.detachEvent("onreadystatechange",K),a.detachEvent("onload",K))}function K(){(d.addEventListener||"load"===a.event.type||"complete"===d.readyState)&&(J(),n.ready())}n.ready.promise=function(b){if(!I)if(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll)a.setTimeout(n.ready);else if(d.addEventListener)d.addEventListener("DOMContentLoaded",K),a.addEventListener("load",K);else{d.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);var c=!1;try{c=null==a.frameElement&&d.documentElement}catch(e){}c&&c.doScroll&&!function f(){if(!n.isReady){try{c.doScroll("left")}catch(b){return a.setTimeout(f,50)}J(),n.ready()}}()}return I.promise(b)},n.ready.promise();var L;for(L in n(l))break;l.ownFirst="0"===L,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c,e;c=d.getElementsByTagName("body")[0],c&&c.style&&(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",l.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(e))}),function(){var a=d.createElement("div");l.deleteExpando=!0;try{delete a.test}catch(b){l.deleteExpando=!1}a=null}();var M=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b},N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}n.data(a,b,c)}else c=void 0;
}return c}function Q(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function R(a,b,d,e){if(M(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),"object"!=typeof b&&"function"!=typeof b||(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f}}function S(a,b,c){if(M(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!Q(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=void 0)}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)},data:function(a,b,c){return R(a,b,c)},removeData:function(a,b){return S(a,b)},_data:function(a,b,c){return R(a,b,c,!0)},_removeData:function(a,b){return S(a,b,!0)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));n._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){n.data(this,a)}):arguments.length>1?this.each(function(){n.data(this,a,b)}):f?P(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c)})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}}),function(){var a;l.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,e;return c=d.getElementsByTagName("body")[0],c&&c.style?(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(d.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(e),a):void 0}}();var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),V=["Top","Right","Bottom","Left"],W=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function X(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&U.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var Y=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)Y(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},Z=/^(?:checkbox|radio)$/i,$=/<([\w:-]+)/,_=/^$|\/(?:java|ecma)script/i,aa=/^\s+/,ba="abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";function ca(a){var b=ba.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}!function(){var a=d.createElement("div"),b=d.createDocumentFragment(),c=d.createElement("input");a.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",l.leadingWhitespace=3===a.firstChild.nodeType,l.tbody=!a.getElementsByTagName("tbody").length,l.htmlSerialize=!!a.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==d.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,b.appendChild(c),l.appendChecked=c.checked,a.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!a.cloneNode(!0).lastChild.defaultValue,b.appendChild(a),c=d.createElement("input"),c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),a.appendChild(c),l.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!!a.addEventListener,a[n.expando]=1,l.attributes=!a.getAttribute(n.expando)}();var da={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]};da.optgroup=da.option,da.tbody=da.tfoot=da.colgroup=da.caption=da.thead,da.th=da.td;function ea(a,b){var c,d,e=0,f="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,ea(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function fa(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))}var ga=/<|&#?\w+;/,ha=/<tbody/i;function ia(a){Z.test(a.type)&&(a.defaultChecked=a.checked)}function ja(a,b,c,d,e){for(var f,g,h,i,j,k,m,o=a.length,p=ca(b),q=[],r=0;o>r;r++)if(g=a[r],g||0===g)if("object"===n.type(g))n.merge(q,g.nodeType?[g]:g);else if(ga.test(g)){i=i||p.appendChild(b.createElement("div")),j=($.exec(g)||["",""])[1].toLowerCase(),m=da[j]||da._default,i.innerHTML=m[1]+n.htmlPrefilter(g)+m[2],f=m[0];while(f--)i=i.lastChild;if(!l.leadingWhitespace&&aa.test(g)&&q.push(b.createTextNode(aa.exec(g)[0])),!l.tbody){g="table"!==j||ha.test(g)?"<table>"!==m[1]||ha.test(g)?0:i:i.firstChild,f=g&&g.childNodes.length;while(f--)n.nodeName(k=g.childNodes[f],"tbody")&&!k.childNodes.length&&g.removeChild(k)}n.merge(q,i.childNodes),i.textContent="";while(i.firstChild)i.removeChild(i.firstChild);i=p.lastChild}else q.push(b.createTextNode(g));i&&p.removeChild(i),l.appendChecked||n.grep(ea(q,"input"),ia),r=0;while(g=q[r++])if(d&&n.inArray(g,d)>-1)e&&e.push(g);else if(h=n.contains(g.ownerDocument,g),i=ea(p.appendChild(g),"script"),h&&fa(i),c){f=0;while(g=i[f++])_.test(g.type||"")&&c.push(g)}return i=null,p}!function(){var b,c,e=d.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(l[b]=c in a)||(e.setAttribute(c,"t"),l[b]=e.attributes[c].expando===!1);e=null}();var ka=/^(?:input|select|textarea)$/i,la=/^key/,ma=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,na=/^(?:focusinfocus|focusoutblur)$/,oa=/^([^.]*)(?:\.(.+)|)/;function pa(){return!0}function qa(){return!1}function ra(){try{return d.activeElement}catch(a){}}function sa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)sa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=qa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return"undefined"==typeof n||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(G)||[""],h=b.length;while(h--)f=oa.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=oa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))}},trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(i=m=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!na.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),h=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),l=n.event.special[q]||{},f||!l.trigger||l.trigger.apply(e,c)!==!1)){if(!f&&!l.noBubble&&!n.isWindow(e)){for(j=l.delegateType||q,na.test(j+q)||(i=i.parentNode);i;i=i.parentNode)p.push(i),m=i;m===(e.ownerDocument||d)&&p.push(m.defaultView||m.parentWindow||a)}o=0;while((i=p[o++])&&!b.isPropagationStopped())b.type=o>1?j:l.bindType||q,g=(n._data(i,"events")||{})[b.type]&&n._data(i,"handle"),g&&g.apply(i,c),g=h&&i[h],g&&g.apply&&M(i)&&(b.result=g.apply(i,c),b.result===!1&&b.preventDefault());if(b.type=q,!f&&!b.isDefaultPrevented()&&(!l._default||l._default.apply(p.pop(),c)===!1)&&M(e)&&h&&e[q]&&!n.isWindow(e)){m=e[h],m&&(e[h]=null),n.event.triggered=q;try{e[q]()}catch(s){}n.event.triggered=void 0,m&&(e[h]=m)}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ma.test(f)?this.mouseHooks:la.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=g.srcElement||d),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,h.filter?h.filter(a,g):a},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button,h=b.fromElement;return null==a.pageX&&null!=b.clientX&&(e=a.target.ownerDocument||d,f=e.documentElement,c=e.body,a.pageX=b.clientX+(f&&f.scrollLeft||c&&c.scrollLeft||0)-(f&&f.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(f&&f.scrollTop||c&&c.scrollTop||0)-(f&&f.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&h&&(a.relatedTarget=h===a.target?b.toElement:h),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ra()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ra()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b),d.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=d.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)}:function(a,b,c){var d="on"+b;a.detachEvent&&("undefined"==typeof a[d]&&(a[d]=null),a.detachEvent(d,c))},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?pa:qa):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:qa,isPropagationStopped:qa,isImmediatePropagationStopped:qa,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=pa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=pa,a&&!this.isSimulated&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=pa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.submit||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?n.prop(b,"form"):void 0;c&&!n._data(c,"submit")&&(n.event.add(c,"submit._submit",function(a){a._submitBubble=!0}),n._data(c,"submit",!0))})},postDispatch:function(a){a._submitBubble&&(delete a._submitBubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a))},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")}}),l.change||(n.event.special.change={setup:function(){return ka.test(this.nodeName)?("checkbox"!==this.type&&"radio"!==this.type||(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._justChanged=!0)}),n.event.add(this,"click._change",function(a){this._justChanged&&!a.isTrigger&&(this._justChanged=!1),n.event.simulate("change",this,a)})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;ka.test(b.nodeName)&&!n._data(b,"change")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a)}),n._data(b,"change",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!ka.test(this.nodeName)}}),l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))}}}),n.fn.extend({on:function(a,b,c,d){return sa(this,a,b,c,d)},one:function(a,b,c,d){return sa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=qa),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ta=/ jQuery\d+="(?:null|\d+)"/g,ua=new RegExp("<(?:"+ba+")[\\s/>]","i"),va=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,wa=/<script|<style|<link/i,xa=/checked\s*(?:[^=]|=\s*.checked.)/i,ya=/^true\/(.*)/,za=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Aa=ca(d),Ba=Aa.appendChild(d.createElement("div"));function Ca(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function Da(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function Ea(a){var b=ya.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Fa(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d])}g.data&&(g.data=n.extend({},g.data))}}function Ga(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando)}"script"===c&&b.text!==a.text?(Da(b).text=a.text,Ea(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&Z.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}}function Ha(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&xa.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),Ha(f,b,c,d)});if(o&&(k=ja(b,a[0].ownerDocument,!1,a,d),e=k.firstChild,1===k.childNodes.length&&(k=e),e||d)){for(i=n.map(ea(k,"script"),Da),h=i.length;o>m;m++)g=k,m!==p&&(g=n.clone(g,!0,!0),h&&n.merge(i,ea(g,"script"))),c.call(a[m],g,m);if(h)for(j=i[i.length-1].ownerDocument,n.map(i,Ea),m=0;h>m;m++)g=i[m],_.test(g.type||"")&&!n._data(g,"globalEval")&&n.contains(j,g)&&(g.src?n._evalUrl&&n._evalUrl(g.src):n.globalEval((g.text||g.textContent||g.innerHTML||"").replace(za,"")));k=e=null}return a}function Ia(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(ea(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&fa(ea(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(va,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!ua.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(Ba.innerHTML=a.outerHTML,Ba.removeChild(f=Ba.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=ea(f),h=ea(a),g=0;null!=(e=h[g]);++g)d[g]&&Ga(e,d[g]);if(b)if(c)for(h=h||ea(a),d=d||ea(f),g=0;null!=(e=h[g]);g++)Fa(e,d[g]);else Fa(a,f);return d=ea(f,"script"),d.length>0&&fa(d,!i&&ea(a,"script")),d=h=e=null,f},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.attributes,m=n.event.special;null!=(d=a[h]);h++)if((b||M(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k||"undefined"==typeof d.removeAttribute?d[i]=void 0:d.removeAttribute(i),c.push(f))}}}),n.fn.extend({domManip:Ha,detach:function(a){return Ia(this,a,!0)},remove:function(a){return Ia(this,a)},text:function(a){return Y(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||d).createTextNode(a))},null,a,arguments.length)},append:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.appendChild(a)}})},prepend:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(ea(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return Y(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(ta,""):void 0;if("string"==typeof a&&!wa.test(a)&&(l.htmlSerialize||!ua.test(a))&&(l.leadingWhitespace||!aa.test(a))&&!da[($.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ea(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ha(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(ea(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],f=n(a),h=f.length-1;h>=d;d++)c=d===h?this:this.clone(!0),n(f[d])[b](c),g.apply(e,c.get());return this.pushStack(e)}});var Ja,Ka={HTML:"block",BODY:"block"};function La(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function Ma(a){var b=d,c=Ka[a];return c||(c=La(a,b),"none"!==c&&c||(Ja=(Ja||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ja[0].contentWindow||Ja[0].contentDocument).document,b.write(),b.close(),c=La(a,b),Ja.detach()),Ka[a]=c),c}var Na=/^margin/,Oa=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Pa=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Qa=d.documentElement;!function(){var b,c,e,f,g,h,i=d.createElement("div"),j=d.createElement("div");if(j.style){j.style.cssText="float:left;opacity:.5",l.opacity="0.5"===j.style.opacity,l.cssFloat=!!j.style.cssFloat,j.style.backgroundClip="content-box",j.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===j.style.backgroundClip,i=d.createElement("div"),i.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",j.innerHTML="",i.appendChild(j),l.boxSizing=""===j.style.boxSizing||""===j.style.MozBoxSizing||""===j.style.WebkitBoxSizing,n.extend(l,{reliableHiddenOffsets:function(){return null==b&&k(),f},boxSizingReliable:function(){return null==b&&k(),e},pixelMarginRight:function(){return null==b&&k(),c},pixelPosition:function(){return null==b&&k(),b},reliableMarginRight:function(){return null==b&&k(),g},reliableMarginLeft:function(){return null==b&&k(),h}});function k(){var k,l,m=d.documentElement;m.appendChild(i),j.style.cssText="-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",b=e=h=!1,c=g=!0,a.getComputedStyle&&(l=a.getComputedStyle(j),b="1%"!==(l||{}).top,h="2px"===(l||{}).marginLeft,e="4px"===(l||{width:"4px"}).width,j.style.marginRight="50%",c="4px"===(l||{marginRight:"4px"}).marginRight,k=j.appendChild(d.createElement("div")),k.style.cssText=j.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",k.style.marginRight=k.style.width="0",j.style.width="1px",g=!parseFloat((a.getComputedStyle(k)||{}).marginRight),j.removeChild(k)),j.style.display="none",f=0===j.getClientRects().length,f&&(j.style.display="",j.innerHTML="<table><tr><td></td><td>t</td></tr></table>",j.childNodes[0].style.borderCollapse="separate",k=j.getElementsByTagName("td"),k[0].style.cssText="margin:0;border:0;padding:0;display:none",f=0===k[0].offsetHeight,f&&(k[0].style.display="",k[1].style.display="none",f=0===k[0].offsetHeight)),m.removeChild(i)}}}();var Ra,Sa,Ta=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ra=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Oa.test(g)&&Na.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0===g?g:g+""}):Qa.currentStyle&&(Ra=function(a){return a.currentStyle},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Oa.test(g)&&!Ta.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Ua(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Va=/alpha\([^)]*\)/i,Wa=/opacity\s*=\s*([^)]*)/i,Xa=/^(none|table(?!-c[ea]).+)/,Ya=new RegExp("^("+T+")(.*)$","i"),Za={position:"absolute",visibility:"hidden",display:"block"},$a={letterSpacing:"0",fontWeight:"400"},_a=["Webkit","O","Moz","ms"],ab=d.createElement("div").style;function bb(a){if(a in ab)return a;var b=a.charAt(0).toUpperCase()+a.slice(1),c=_a.length;while(c--)if(a=_a[c]+b,a in ab)return a}function cb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&W(d)&&(f[g]=n._data(d,"olddisplay",Ma(d.nodeName)))):(e=W(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function db(a,b,c){var d=Ya.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function eb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+V[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+V[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+V[f]+"Width",!0,e))):(g+=n.css(a,"padding"+V[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+V[f]+"Width",!0,e)));return g}function fb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ra(a),g=l.boxSizing&&"border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Sa(a,b,f),(0>e||null==e)&&(e=a.style[b]),Oa.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+eb(a,b,c||(g?"border":"content"),d,f)+"px"}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Sa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;if(b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=U.exec(c))&&e[1]&&(c=X(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Sa(a,b,d)),"normal"===f&&b in $a&&(f=$a[b]),""===c||c?(e=parseFloat(f),c===!0||isFinite(e)?e||0:f):f}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Xa.test(n.css(a,"display"))&&0===a.offsetWidth?Pa(a,Za,function(){return fb(a,b,d)}):fb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ra(a);return db(a,c,d?eb(a,b,d,l.boxSizing&&"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Wa.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Va,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Va.test(f)?f.replace(Va,e):f+" "+e)}}),n.cssHooks.marginRight=Ua(l.reliableMarginRight,function(a,b){return b?Pa(a,{display:"inline-block"},Sa,[a,"marginRight"]):void 0}),n.cssHooks.marginLeft=Ua(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Sa(a,"marginLeft"))||(n.contains(a.ownerDocument,a)?a.getBoundingClientRect().left-Pa(a,{
marginLeft:0},function(){return a.getBoundingClientRect().left}):0))+"px":void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+V[d]+b]=f[d]||f[d-2]||f[0];return e}},Na.test(a)||(n.cssHooks[a+b].set=db)}),n.fn.extend({css:function(a,b){return Y(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ra(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return cb(this,!0)},hide:function(){return cb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){W(this)?n(this).show():n(this).hide()})}});function gb(a,b,c,d,e){return new gb.prototype.init(a,b,c,d,e)}n.Tween=gb,gb.prototype={constructor:gb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=gb.propHooks[this.prop];return a&&a.get?a.get(this):gb.propHooks._default.get(this)},run:function(a){var b,c=gb.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):gb.propHooks._default.set(this),this}},gb.prototype.init.prototype=gb.prototype,gb.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},gb.propHooks.scrollTop=gb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=gb.prototype.init,n.fx.step={};var hb,ib,jb=/^(?:toggle|show|hide)$/,kb=/queueHooks$/;function lb(){return a.setTimeout(function(){hb=void 0}),hb=n.now()}function mb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=V[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function nb(a,b,c){for(var d,e=(qb.tweeners[b]||[]).concat(qb.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ob(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&W(a),r=n._data(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k="none"===j?n._data(a,"olddisplay")||Ma(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==Ma(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],jb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(o))"inline"===("none"===j?Ma(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide()}),m.done(function(){var b;n._removeData(a,"fxshow");for(b in o)n.style(a,b,o[b])});for(d in o)g=nb(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function pb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function qb(a,b,c){var d,e,f=0,g=qb.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=hb||lb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:hb||lb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(pb(k,j.opts.specialEasing);g>f;f++)if(d=qb.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,nb,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(qb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return X(c.elem,a,U.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],qb.tweeners[c]=qb.tweeners[c]||[],qb.tweeners[c].unshift(b)},prefilters:[ob],prefilter:function(a,b){b?qb.prefilters.unshift(a):qb.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(W).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=qb(this,n.extend({},a),f);(e||n._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&kb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(mb(b,!0),a,d,e)}}),n.each({slideDown:mb("show"),slideUp:mb("hide"),slideToggle:mb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;for(hb=n.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||n.fx.stop(),hb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){ib||(ib=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(ib),ib=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a,b=d.createElement("input"),c=d.createElement("div"),e=d.createElement("select"),f=e.appendChild(d.createElement("option"));c=d.createElement("div"),c.setAttribute("className","t"),c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],b.setAttribute("type","checkbox"),c.appendChild(b),a=c.getElementsByTagName("a")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==c.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=f.selected,l.enctype=!!d.createElement("form").enctype,e.disabled=!0,l.optDisabled=!f.disabled,b=d.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value}();var rb=/\r/g,sb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(sb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>-1)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var tb,ub,vb=n.expr.attrHandle,wb=/^(?:checked|selected)$/i,xb=l.getSetAttribute,yb=l.input;n.fn.extend({attr:function(a,b){return Y(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ub:tb)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?yb&&xb||!wb.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(xb?c:d)}}),ub={set:function(a,b,c){return b===!1?n.removeAttr(a,c):yb&&xb||!wb.test(c)?a.setAttribute(!xb&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=vb[b]||n.find.attr;yb&&xb||!wb.test(b)?vb[b]=function(a,b,d){var e,f;return d||(f=vb[b],vb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,vb[b]=f),e}:vb[b]=function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null}}),yb&&xb||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):tb&&tb.set(a,b,c)}}),xb||(tb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},vb.id=vb.name=vb.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:tb.set},n.attrHooks.contenteditable={set:function(a,b,c){tb.set(a,""===b?!1:b,c)}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var zb=/^(?:input|select|textarea|button|object)$/i,Ab=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return Y(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):zb.test(a.nodeName)||Ab.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this}),l.enctype||(n.propFix.enctype="encoding");var Bb=/[\t\r\n\f]/g;function Cb(a){return n.attr(a,"class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,Cb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&n.attr(c,"class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,Cb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&n.attr(c,"class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,Cb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=Cb(this),b&&n._data(this,"__className__",b),n.attr(this,"class",b||a===!1?"":n._data(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+Cb(c)+" ").replace(Bb," ").indexOf(b)>-1)return!0;return!1}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Db=a.location,Eb=n.now(),Fb=/\?/,Gb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=n.trim(b+"");return e&&!n.trim(e.replace(Gb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():n.error("Invalid JSON: "+b)},n.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new a.DOMParser,c=d.parseFromString(b,"text/xml")):(c=new a.ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var Hb=/#.*$/,Ib=/([?&])_=[^&]*/,Jb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Kb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Lb=/^(?:GET|HEAD)$/,Mb=/^\/\//,Nb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ob={},Pb={},Qb="*/".concat("*"),Rb=Db.href,Sb=Nb.exec(Rb.toLowerCase())||[];function Tb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Ub(a,b,c,d){var e={},f=a===Pb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Vb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&n.extend(!0,a,c),a}function Wb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Xb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Rb,type:"GET",isLocal:Kb.test(Sb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Qb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Vb(Vb(a,n.ajaxSettings),b):Vb(n.ajaxSettings,a)},ajaxPrefilter:Tb(Ob),ajaxTransport:Tb(Pb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var d,e,f,g,h,i,j,k,l=n.ajaxSetup({},c),m=l.context||l,o=l.context&&(m.nodeType||m.jquery)?n(m):n.event,p=n.Deferred(),q=n.Callbacks("once memory"),r=l.statusCode||{},s={},t={},u=0,v="canceled",w={readyState:0,getResponseHeader:function(a){var b;if(2===u){if(!k){k={};while(b=Jb.exec(g))k[b[1].toLowerCase()]=b[2]}b=k[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===u?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return u||(a=t[c]=t[c]||a,s[a]=b),this},overrideMimeType:function(a){return u||(l.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>u)for(b in a)r[b]=[r[b],a[b]];else w.always(a[w.status]);return this},abort:function(a){var b=a||v;return j&&j.abort(b),y(0,b),this}};if(p.promise(w).complete=q.add,w.success=w.done,w.error=w.fail,l.url=((b||l.url||Rb)+"").replace(Hb,"").replace(Mb,Sb[1]+"//"),l.type=c.method||c.type||l.method||l.type,l.dataTypes=n.trim(l.dataType||"*").toLowerCase().match(G)||[""],null==l.crossDomain&&(d=Nb.exec(l.url.toLowerCase()),l.crossDomain=!(!d||d[1]===Sb[1]&&d[2]===Sb[2]&&(d[3]||("http:"===d[1]?"80":"443"))===(Sb[3]||("http:"===Sb[1]?"80":"443")))),l.data&&l.processData&&"string"!=typeof l.data&&(l.data=n.param(l.data,l.traditional)),Ub(Ob,l,c,w),2===u)return w;i=n.event&&l.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),l.type=l.type.toUpperCase(),l.hasContent=!Lb.test(l.type),f=l.url,l.hasContent||(l.data&&(f=l.url+=(Fb.test(f)?"&":"?")+l.data,delete l.data),l.cache===!1&&(l.url=Ib.test(f)?f.replace(Ib,"$1_="+Eb++):f+(Fb.test(f)?"&":"?")+"_="+Eb++)),l.ifModified&&(n.lastModified[f]&&w.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&w.setRequestHeader("If-None-Match",n.etag[f])),(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&w.setRequestHeader("Content-Type",l.contentType),w.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+("*"!==l.dataTypes[0]?", "+Qb+"; q=0.01":""):l.accepts["*"]);for(e in l.headers)w.setRequestHeader(e,l.headers[e]);if(l.beforeSend&&(l.beforeSend.call(m,w,l)===!1||2===u))return w.abort();v="abort";for(e in{success:1,error:1,complete:1})w[e](l[e]);if(j=Ub(Pb,l,c,w)){if(w.readyState=1,i&&o.trigger("ajaxSend",[w,l]),2===u)return w;l.async&&l.timeout>0&&(h=a.setTimeout(function(){w.abort("timeout")},l.timeout));try{u=1,j.send(s,y)}catch(x){if(!(2>u))throw x;y(-1,x)}}else y(-1,"No Transport");function y(b,c,d,e){var k,s,t,v,x,y=c;2!==u&&(u=2,h&&a.clearTimeout(h),j=void 0,g=e||"",w.readyState=b>0?4:0,k=b>=200&&300>b||304===b,d&&(v=Wb(l,w,d)),v=Xb(l,v,w,k),k?(l.ifModified&&(x=w.getResponseHeader("Last-Modified"),x&&(n.lastModified[f]=x),x=w.getResponseHeader("etag"),x&&(n.etag[f]=x)),204===b||"HEAD"===l.type?y="nocontent":304===b?y="notmodified":(y=v.state,s=v.data,t=v.error,k=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),w.status=b,w.statusText=(c||y)+"",k?p.resolveWith(m,[s,y,w]):p.rejectWith(m,[w,y,t]),w.statusCode(r),r=void 0,i&&o.trigger(k?"ajaxSuccess":"ajaxError",[w,l,k?s:t]),q.fireWith(m,[w,y]),i&&(o.trigger("ajaxComplete",[w,l]),--n.active||n.event.trigger("ajaxStop")))}return w},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b))});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}});function Yb(a){return a.style&&a.style.display||n.css(a,"display")}function Zb(a){if(!n.contains(a.ownerDocument||d,a))return!0;while(a&&1===a.nodeType){if("none"===Yb(a)||"hidden"===a.type)return!0;a=a.parentNode}return!1}n.expr.filters.hidden=function(a){return l.reliableHiddenOffsets()?a.offsetWidth<=0&&a.offsetHeight<=0&&!a.getClientRects().length:Zb(a)},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var $b=/%20/g,_b=/\[\]$/,ac=/\r?\n/g,bc=/^(?:submit|button|image|reset|file)$/i,cc=/^(?:input|select|textarea|keygen)/i;function dc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||_b.test(a)?d(a,e):dc(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)dc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)dc(c,a[c],b,e);return d.join("&").replace($b,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&cc.test(this.nodeName)&&!bc.test(a)&&(this.checked||!Z.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(ac,"\r\n")}}):{name:b.name,value:c.replace(ac,"\r\n")}}).get()}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return this.isLocal?ic():d.documentMode>8?hc():/^(get|post|head|put|delete|options)$/i.test(this.type)&&hc()||ic()}:hc;var ec=0,fc={},gc=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in fc)fc[a](void 0,!0)}),l.cors=!!gc&&"withCredentials"in gc,gc=l.ajax=!!gc,gc&&n.ajaxTransport(function(b){if(!b.crossDomain||l.cors){var c;return{send:function(d,e){var f,g=b.xhr(),h=++ec;if(g.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(f in b.xhrFields)g[f]=b.xhrFields[f];b.mimeType&&g.overrideMimeType&&g.overrideMimeType(b.mimeType),b.crossDomain||d["X-Requested-With"]||(d["X-Requested-With"]="XMLHttpRequest");for(f in d)void 0!==d[f]&&g.setRequestHeader(f,d[f]+"");g.send(b.hasContent&&b.data||null),c=function(a,d){var f,i,j;if(c&&(d||4===g.readyState))if(delete fc[h],c=void 0,g.onreadystatechange=n.noop,d)4!==g.readyState&&g.abort();else{j={},f=g.status,"string"==typeof g.responseText&&(j.text=g.responseText);try{i=g.statusText}catch(k){i=""}f||!b.isLocal||b.crossDomain?1223===f&&(f=204):f=j.text?200:404}j&&e(f,i,j,g.getAllResponseHeaders())},b.async?4===g.readyState?a.setTimeout(c):g.onreadystatechange=fc[h]=c:c()},abort:function(){c&&c(void 0,!0)}}}});function hc(){try{return new a.XMLHttpRequest}catch(b){}}function ic(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=d.head||n("head")[0]||d.documentElement;return{send:function(e,f){b=d.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||f(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var jc=[],kc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=jc.pop()||n.expando+"_"+Eb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(kc.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&kc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(kc,"$1"+e):b.jsonp!==!1&&(b.url+=(Fb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,jc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ja([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var lc=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&lc)return lc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h,a.length)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function mc(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,n.contains(b,e)?("undefined"!=typeof e.getBoundingClientRect&&(d=e.getBoundingClientRect()),c=mc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",!0),c.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-n.css(d,"marginTop",!0),left:b.left-c.left-n.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Qa})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);n.fn[a]=function(d){return Y(this,function(a,d,e){var f=mc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ua(l.pixelPosition,function(a,c){return c?(c=Sa(a,b),Oa.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({
padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return Y(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var nc=a.jQuery,oc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=oc),b&&a.jQuery===n&&(a.jQuery=nc),n},b||(a.jQuery=a.$=n),n});

/*! jQuery UI - v1.12.0 - 2016-07-08
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/draggable.js, widgets/droppable.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/resizable.js, widgets/selectable.js, widgets/selectmenu.js, widgets/slider.js, widgets/sortable.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){function e(t){for(var e=t.css("visibility");"inherit"===e;)t=t.parent(),e=t.css("visibility");return"hidden"!==e}function i(t){for(var e,i;t.length&&t[0]!==document;){if(e=t.css("position"),("absolute"===e||"relative"===e||"fixed"===e)&&(i=parseInt(t.css("zIndex"),10),!isNaN(i)&&0!==i))return i;t=t.parent()}return 0}function s(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},t.extend(this._defaults,this.regional[""]),this.regional.en=t.extend(!0,{},this.regional[""]),this.regional["en-US"]=t.extend(!0,{},this.regional.en),this.dpDiv=n(t("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function n(e){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.on("mouseout",i,function(){t(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).removeClass("ui-datepicker-next-hover")}).on("mouseover",i,o)}function o(){t.datepicker._isDisabledDatepicker(m.inline?m.dpDiv.parent()[0]:m.input[0])||(t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),t(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).addClass("ui-datepicker-next-hover"))}function a(e,i){t.extend(e,i);for(var s in i)null==i[s]&&(e[s]=i[s]);return e}function r(t){return function(){var e=this.element.val();t.apply(this,arguments),this._refresh(),e!==this.element.val()&&this._trigger("change")}}t.ui=t.ui||{},t.ui.version="1.12.0";var h=0,l=Array.prototype.slice;t.cleanData=function(e){return function(i){var s,n,o;for(o=0;null!=(n=i[o]);o++)try{s=t._data(n,"events"),s&&s.remove&&t(n).triggerHandler("remove")}catch(a){}e(i)}}(t.cleanData),t.widget=function(e,i,s){var n,o,a,r={},h=e.split(".")[0];e=e.split(".")[1];var l=h+"-"+e;return s||(s=i,i=t.Widget),t.isArray(s)&&(s=t.extend.apply(null,[{}].concat(s))),t.expr[":"][l.toLowerCase()]=function(e){return!!t.data(e,l)},t[h]=t[h]||{},n=t[h][e],o=t[h][e]=function(t,e){return this._createWidget?(arguments.length&&this._createWidget(t,e),void 0):new o(t,e)},t.extend(o,n,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),a=new i,a.options=t.widget.extend({},a.options),t.each(s,function(e,s){return t.isFunction(s)?(r[e]=function(){function t(){return i.prototype[e].apply(this,arguments)}function n(t){return i.prototype[e].apply(this,t)}return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=n,e=s.apply(this,arguments),this._super=i,this._superApply=o,e}}(),void 0):(r[e]=s,void 0)}),o.prototype=t.widget.extend(a,{widgetEventPrefix:n?a.widgetEventPrefix||e:e},r,{constructor:o,namespace:h,widgetName:e,widgetFullName:l}),n?(t.each(n._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete n._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var i,s,n=l.call(arguments,1),o=0,a=n.length;a>o;o++)for(i in n[o])s=n[o][i],n[o].hasOwnProperty(i)&&void 0!==s&&(e[i]=t.isPlainObject(s)?t.isPlainObject(e[i])?t.widget.extend({},e[i],s):t.widget.extend({},s):s);return e},t.widget.bridge=function(e,i){var s=i.prototype.widgetFullName||e;t.fn[e]=function(n){var o="string"==typeof n,a=l.call(arguments,1),r=this;return o?this.each(function(){var i,o=t.data(this,s);return"instance"===n?(r=o,!1):o?t.isFunction(o[n])&&"_"!==n.charAt(0)?(i=o[n].apply(o,a),i!==o&&void 0!==i?(r=i&&i.jquery?r.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+n+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; "+"attempted to call method '"+n+"'")}):(a.length&&(n=t.widget.extend.apply(null,[n].concat(a))),this.each(function(){var e=t.data(this,s);e?(e.option(n||{}),e._init&&e._init()):t.data(this,s,new i(n,this))})),r}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(e,i){i=t(i||this.defaultElement||this)[0],this.element=t(i),this.uuid=h++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),this.classesElementLookup={},i!==this&&(t.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===i&&this.destroy()}}),this.document=t(i.style?i.ownerDocument:i.document||i),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){var e=this;this._destroy(),t.each(this.classesElementLookup,function(t,i){e._removeClass(i,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},s=e.split("."),e=s.shift(),s.length){for(n=a[e]=t.widget.extend({},this.options[e]),o=0;s.length-1>o;o++)n[s[o]]=n[s[o]]||{},n=n[s[o]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(e){var i,s,n;for(i in e)n=this.classesElementLookup[i],e[i]!==this.options.classes[i]&&n&&n.length&&(s=t(n.get()),this._removeClass(n,i),s.addClass(this._classes({element:s,keys:i,classes:e,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(e){function i(i,o){var a,r;for(r=0;i.length>r;r++)a=n.classesElementLookup[i[r]]||t(),a=e.add?t(t.unique(a.get().concat(e.element.get()))):t(a.not(e.element).get()),n.classesElementLookup[i[r]]=a,s.push(i[r]),o&&e.classes[i[r]]&&s.push(e.classes[i[r]])}var s=[],n=this;return e=t.extend({element:this.element,classes:this.options.classes||{}},e),e.keys&&i(e.keys.match(/\S+/g)||[],!0),e.extra&&i(e.extra.match(/\S+/g)||[]),s.join(" ")},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(e,i,s){var n,o=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,function(s,a){function r(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+o.eventNamespace,c=h[2];c?n.on(l,c,r):i.on(l,r)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.off(i).off(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){this._addClass(t(e.currentTarget),null,"ui-state-hover")},mouseleave:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){this._addClass(t(e.currentTarget),null,"ui-state-focus")},focusout:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}}),t.widget,function(){function e(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function i(e,i){return parseInt(t.css(e,i),10)||0}function s(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}var n,o,a=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;o=function(){var e=t("<div>").css("position","absolute").appendTo("body").offset({top:1.5,left:1.5}),i=1.5===e.offset().top;return e.remove(),o=function(){return i},i},t.position={scrollbarWidth:function(){if(void 0!==n)return n;var e,i,s=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return t("body").append(s),e=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,e===i&&(i=s[0].clientWidth),s.remove(),n=e-i},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),s=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,o="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:o?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType,o=!s&&!n;return{element:i,isWindow:s,isDocument:n,offset:o?t(e).offset():{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:i.outerWidth(),height:i.outerHeight()}}},t.fn.position=function(n){if(!n||!n.of)return f.apply(this,arguments);n=t.extend({},n);var p,g,m,_,v,b,y=t(n.of),w=t.position.getWithinInfo(n.within),k=t.position.getScrollInfo(w),x=(n.collision||"flip").split(" "),C={};return b=s(y),y[0].preventDefault&&(n.at="left top"),g=b.width,m=b.height,_=b.offset,v=t.extend({},_),t.each(["my","at"],function(){var t,e,i=(n[this]||"").split(" ");1===i.length&&(i=l.test(i[0])?i.concat(["center"]):c.test(i[0])?["center"].concat(i):["center","center"]),i[0]=l.test(i[0])?i[0]:"center",i[1]=c.test(i[1])?i[1]:"center",t=u.exec(i[0]),e=u.exec(i[1]),C[this]=[t?t[0]:0,e?e[0]:0],n[this]=[d.exec(i[0])[0],d.exec(i[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===n.at[0]?v.left+=g:"center"===n.at[0]&&(v.left+=g/2),"bottom"===n.at[1]?v.top+=m:"center"===n.at[1]&&(v.top+=m/2),p=e(C.at,g,m),v.left+=p[0],v.top+=p[1],this.each(function(){var s,l,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=i(this,"marginLeft"),b=i(this,"marginTop"),D=u+f+i(this,"marginRight")+k.width,I=d+b+i(this,"marginBottom")+k.height,T=t.extend({},v),P=e(C.my,c.outerWidth(),c.outerHeight());"right"===n.my[0]?T.left-=u:"center"===n.my[0]&&(T.left-=u/2),"bottom"===n.my[1]?T.top-=d:"center"===n.my[1]&&(T.top-=d/2),T.left+=P[0],T.top+=P[1],o()||(T.left=h(T.left),T.top=h(T.top)),s={marginLeft:f,marginTop:b},t.each(["left","top"],function(e,i){t.ui.position[x[e]]&&t.ui.position[x[e]][i](T,{targetWidth:g,targetHeight:m,elemWidth:u,elemHeight:d,collisionPosition:s,collisionWidth:D,collisionHeight:I,offset:[p[0]+P[0],p[1]+P[1]],my:n.my,at:n.at,within:w,elem:c})}),n.using&&(l=function(t){var e=_.left-T.left,i=e+g-u,s=_.top-T.top,o=s+m-d,h={target:{element:y,left:_.left,top:_.top,width:g,height:m},element:{element:c,left:T.left,top:T.top,width:u,height:d},horizontal:0>i?"left":e>0?"right":"center",vertical:0>o?"top":s>0?"bottom":"middle"};u>g&&g>r(e+i)&&(h.horizontal="center"),d>m&&m>r(s+o)&&(h.vertical="middle"),h.important=a(r(e),r(i))>a(r(s),r(o))?"horizontal":"vertical",n.using.call(this,t,h)}),c.offset(t.extend(T,{using:l}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,o=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-o-n;e.collisionWidth>o?h>0&&0>=l?(i=t.left+h+e.collisionWidth-o-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+o-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=a(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,o=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-o-n;e.collisionHeight>o?h>0&&0>=l?(i=t.top+h+e.collisionHeight-o-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+o-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=a(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,o=n.offset.left+n.scrollLeft,a=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,c=l-h,u=l+e.collisionWidth-a-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-a-o,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,o=n.offset.top+n.scrollTop,a=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,c=l-h,u=l+e.collisionHeight-a-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,g=-2*e.offset[1];0>c?(s=t.top+p+f+g+e.collisionHeight-a-o,(0>s||r(c)>s)&&(t.top+=p+f+g)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+g-h,(i>0||u>r(i))&&(t.top+=p+f+g))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}}}(),t.ui.position,t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,s){return!!t.data(e,s[3])}}),t.fn.extend({disableSelection:function(){var t="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.on(t+".ui-disableSelection",function(t){t.preventDefault()})}}(),enableSelection:function(){return this.off(".ui-disableSelection")}});var c="ui-effects-",u="ui-effects-style",d="ui-effects-animated",p=t;t.effects={effect:{}},function(t,e){function i(t,e,i){var s=u[e.type]||{};return null==t?i||!e.def?null:e.def:(t=s.floor?~~t:parseFloat(t),isNaN(t)?e.def:s.mod?(t+s.mod)%s.mod:0>t?0:t>s.max?s.max:t)}function s(i){var s=l(),n=s._rgba=[];return i=i.toLowerCase(),f(h,function(t,o){var a,r=o.re.exec(i),h=r&&o.parse(r),l=o.space||"rgba";return h?(a=s[l](h),s[c[l].cache]=a[c[l].cache],n=s._rgba=a._rgba,!1):e}),n.length?("0,0,0,0"===n.join()&&t.extend(n,o.transparent),s):o[i]}function n(t,e,i){return i=(i+1)%1,1>6*i?t+6*(e-t)*i:1>2*i?e:2>3*i?t+6*(e-t)*(2/3-i):t}var o,a="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],l=t.Color=function(e,i,s,n){return new t.Color.fn.parse(e,i,s,n)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},u={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=l.support={},p=t("<p>")[0],f=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),l.fn=t.extend(l.prototype,{parse:function(n,a,r,h){if(n===e)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=t(n).css(a),a=e);var u=this,d=t.type(n),p=this._rgba=[];return a!==e&&(n=[n,a,r,h],d="array"),"string"===d?this.parse(s(n)||o._default):"array"===d?(f(c.rgba.props,function(t,e){p[e.idx]=i(n[e.idx],e)}),this):"object"===d?(n instanceof l?f(c,function(t,e){n[e.cache]&&(u[e.cache]=n[e.cache].slice())}):f(c,function(e,s){var o=s.cache;f(s.props,function(t,e){if(!u[o]&&s.to){if("alpha"===t||null==n[t])return;u[o]=s.to(u._rgba)}u[o][e.idx]=i(n[t],e,!0)}),u[o]&&0>t.inArray(null,u[o].slice(0,3))&&(u[o][3]=1,s.from&&(u._rgba=s.from(u[o])))}),this):e},is:function(t){var i=l(t),s=!0,n=this;return f(c,function(t,o){var a,r=i[o.cache];return r&&(a=n[o.cache]||o.to&&o.to(n._rgba)||[],f(o.props,function(t,i){return null!=r[i.idx]?s=r[i.idx]===a[i.idx]:e})),s}),s},_space:function(){var t=[],e=this;return f(c,function(i,s){e[s.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var s=l(t),n=s._space(),o=c[n],a=0===this.alpha()?l("transparent"):this,r=a[o.cache]||o.to(a._rgba),h=r.slice();return s=s[o.cache],f(o.props,function(t,n){var o=n.idx,a=r[o],l=s[o],c=u[n.type]||{};null!==l&&(null===a?h[o]=l:(c.mod&&(l-a>c.mod/2?a+=c.mod:a-l>c.mod/2&&(a-=c.mod)),h[o]=i((l-a)*e+a,n)))}),this[n](h)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=l(e)._rgba;return l(t.map(i,function(t,e){return(1-s)*n[e]+s*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),s=i.pop();return e&&i.push(~~(255*s)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,s=t[0]/255,n=t[1]/255,o=t[2]/255,a=t[3],r=Math.max(s,n,o),h=Math.min(s,n,o),l=r-h,c=r+h,u=.5*c;return e=h===r?0:s===r?60*(n-o)/l+360:n===r?60*(o-s)/l+120:60*(s-n)/l+240,i=0===l?0:.5>=u?l/c:l/(2-c),[Math.round(e)%360,i,u,null==a?1:a]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],s=t[2],o=t[3],a=.5>=s?s*(1+i):s+i-s*i,r=2*s-a;return[Math.round(255*n(r,a,e+1/3)),Math.round(255*n(r,a,e)),Math.round(255*n(r,a,e-1/3)),o]},f(c,function(s,n){var o=n.props,a=n.cache,h=n.to,c=n.from;l.fn[s]=function(s){if(h&&!this[a]&&(this[a]=h(this._rgba)),s===e)return this[a].slice();var n,r=t.type(s),u="array"===r||"object"===r?s:arguments,d=this[a].slice();return f(o,function(t,e){var s=u["object"===r?t:e.idx];null==s&&(s=d[e.idx]),d[e.idx]=i(s,e)}),c?(n=l(c(d)),n[a]=d,n):l(d)},f(o,function(e,i){l.fn[e]||(l.fn[e]=function(n){var o,a=t.type(n),h="alpha"===e?this._hsla?"hsla":"rgba":s,l=this[h](),c=l[i.idx];return"undefined"===a?c:("function"===a&&(n=n.call(this,c),a=t.type(n)),null==n&&i.empty?this:("string"===a&&(o=r.exec(n),o&&(n=c+parseFloat(o[2])*("+"===o[1]?1:-1))),l[i.idx]=n,this[h](l)))})})}),l.hook=function(e){var i=e.split(" ");f(i,function(e,i){t.cssHooks[i]={set:function(e,n){var o,a,r="";if("transparent"!==n&&("string"!==t.type(n)||(o=s(n)))){if(n=l(o||n),!d.rgba&&1!==n._rgba[3]){for(a="backgroundColor"===i?e.parentNode:e;(""===r||"transparent"===r)&&a&&a.style;)try{r=t.css(a,"backgroundColor"),a=a.parentNode}catch(h){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{e.style[i]=n}catch(h){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=l(e.elem,i),e.end=l(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},l.hook(a),t.cssHooks.borderColor={expand:function(t){var e={};return f(["Top","Right","Bottom","Left"],function(i,s){e["border"+s+"Color"]=t}),e}},o=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(p),function(){function e(e){var i,s,n=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,o={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(o[t.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(o[i]=n[i]);return o}function i(e,i){var s,o,a={};for(s in i)o=i[s],e[s]!==o&&(n[s]||(t.fx.step[s]||!isNaN(parseFloat(o)))&&(a[s]=o));return a}var s=["add","remove","toggle"],n={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,i){t.fx.step[i]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(p.style(t.elem,i,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(n,o,a,r){var h=t.speed(o,a,r);return this.queue(function(){var o,a=t(this),r=a.attr("class")||"",l=h.children?a.find("*").addBack():a;l=l.map(function(){var i=t(this);return{el:i,start:e(this)}}),o=function(){t.each(s,function(t,e){n[e]&&a[e+"Class"](n[e])})},o(),l=l.map(function(){return this.end=e(this.el[0]),this.diff=i(this.start,this.end),this}),a.attr("class",r),l=l.map(function(){var e=this,i=t.Deferred(),s=t.extend({},h,{queue:!1,complete:function(){i.resolve(e)}});return this.el.animate(this.diff,s),i.promise()}),t.when.apply(t,l.get()).done(function(){o(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),h.complete.call(a[0])})})},t.fn.extend({addClass:function(e){return function(i,s,n,o){return s?t.effects.animateClass.call(this,{add:i},s,n,o):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(i,s,n,o){return arguments.length>1?t.effects.animateClass.call(this,{remove:i},s,n,o):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(e){return function(i,s,n,o,a){return"boolean"==typeof s||void 0===s?n?t.effects.animateClass.call(this,s?{add:i}:{remove:i},n,o,a):e.apply(this,arguments):t.effects.animateClass.call(this,{toggle:i},s,n,o)}}(t.fn.toggleClass),switchClass:function(e,i,s,n,o){return t.effects.animateClass.call(this,{add:i,remove:e},s,n,o)}})}(),function(){function e(e,i,s,n){return t.isPlainObject(e)&&(i=e,e=e.effect),e={effect:e},null==i&&(i={}),t.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||t.fx.speeds[i])&&(n=s,s=i,i={}),t.isFunction(s)&&(n=s,s=null),i&&t.extend(e,i),s=s||i.duration,e.duration=t.fx.off?0:"number"==typeof s?s:s in t.fx.speeds?t.fx.speeds[s]:t.fx.speeds._default,e.complete=n||i.complete,e}function i(e){return!e||"number"==typeof e||t.fx.speeds[e]?!0:"string"!=typeof e||t.effects.effect[e]?t.isFunction(e)?!0:"object"!=typeof e||e.effect?!1:!0:!0}function s(t,e){var i=e.outerWidth(),s=e.outerHeight(),n=/^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,o=n.exec(t)||["",0,i,s,0];return{top:parseFloat(o[1])||0,right:"auto"===o[2]?i:parseFloat(o[2]),bottom:"auto"===o[3]?s:parseFloat(o[3]),left:parseFloat(o[4])||0}}t.expr&&t.expr.filters&&t.expr.filters.animated&&(t.expr.filters.animated=function(e){return function(i){return!!t(i).data(d)||e(i)}}(t.expr.filters.animated)),t.uiBackCompat!==!1&&t.extend(t.effects,{save:function(t,e){for(var i=0,s=e.length;s>i;i++)null!==e[i]&&t.data(c+e[i],t[0].style[e[i]])},restore:function(t,e){for(var i,s=0,n=e.length;n>s;s++)null!==e[s]&&(i=t.data(c+e[s]),t.css(e[s],i))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var i={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},s=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:e.width(),height:e.height()},o=document.activeElement;try{o.id}catch(a){o=document.body}return e.wrap(s),(e[0]===o||t.contains(e[0],o))&&t(o).trigger("focus"),s=e.parent(),"static"===e.css("position")?(s.css({position:"relative"}),e.css({position:"relative"})):(t.extend(i,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,s){i[s]=e.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(n),s.css(i).show()},removeWrapper:function(e){var i=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===i||t.contains(e[0],i))&&t(i).trigger("focus")),e}}),t.extend(t.effects,{version:"1.12.0",define:function(e,i,s){return s||(s=i,i="effect"),t.effects.effect[e]=s,t.effects.effect[e].mode=i,s},scaledDimensions:function(t,e,i){if(0===e)return{height:0,width:0,outerHeight:0,outerWidth:0};var s="horizontal"!==i?(e||100)/100:1,n="vertical"!==i?(e||100)/100:1;return{height:t.height()*n,width:t.width()*s,outerHeight:t.outerHeight()*n,outerWidth:t.outerWidth()*s}},clipToBox:function(t){return{width:t.clip.right-t.clip.left,height:t.clip.bottom-t.clip.top,left:t.clip.left,top:t.clip.top}},unshift:function(t,e,i){var s=t.queue();e>1&&s.splice.apply(s,[1,0].concat(s.splice(e,i))),t.dequeue()},saveStyle:function(t){t.data(u,t[0].style.cssText)},restoreStyle:function(t){t[0].style.cssText=t.data(u)||"",t.removeData(u)},mode:function(t,e){var i=t.is(":hidden");return"toggle"===e&&(e=i?"show":"hide"),(i?"hide"===e:"show"===e)&&(e="none"),e},getBaseline:function(t,e){var i,s;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=t[1]/e.width}return{x:s,y:i}},createPlaceholder:function(e){var i,s=e.css("position"),n=e.position();return e.css({marginTop:e.css("marginTop"),marginBottom:e.css("marginBottom"),marginLeft:e.css("marginLeft"),marginRight:e.css("marginRight")}).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()),/^(static|relative)/.test(s)&&(s="absolute",i=t("<"+e[0].nodeName+">").insertAfter(e).css({display:/^(inline|ruby)/.test(e.css("display"))?"inline-block":"block",visibility:"hidden",marginTop:e.css("marginTop"),marginBottom:e.css("marginBottom"),marginLeft:e.css("marginLeft"),marginRight:e.css("marginRight"),"float":e.css("float")}).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).addClass("ui-effects-placeholder"),e.data(c+"placeholder",i)),e.css({position:s,left:n.left,top:n.top}),i},removePlaceholder:function(t){var e=c+"placeholder",i=t.data(e);i&&(i.remove(),t.removeData(e))},cleanUp:function(e){t.effects.restoreStyle(e),t.effects.removePlaceholder(e)},setTransition:function(e,i,s,n){return n=n||{},t.each(i,function(t,i){var o=e.cssUnit(i);o[0]>0&&(n[i]=o[0]*s+o[1])}),n}}),t.fn.extend({effect:function(){function i(e){function i(){r.removeData(d),t.effects.cleanUp(r),"hide"===s.mode&&r.hide(),a()}function a(){t.isFunction(h)&&h.call(r[0]),t.isFunction(e)&&e()}var r=t(this);s.mode=c.shift(),t.uiBackCompat===!1||o?"none"===s.mode?(r[l](),a()):n.call(r[0],s,i):(r.is(":hidden")?"hide"===l:"show"===l)?(r[l](),a()):n.call(r[0],s,a)}var s=e.apply(this,arguments),n=t.effects.effect[s.effect],o=n.mode,a=s.queue,r=a||"fx",h=s.complete,l=s.mode,c=[],u=function(e){var i=t(this),s=t.effects.mode(i,l)||o;i.data(d,!0),c.push(s),o&&("show"===s||s===o&&"hide"===s)&&i.show(),o&&"none"===s||t.effects.saveStyle(i),t.isFunction(e)&&e()};return t.fx.off||!n?l?this[l](s.duration,h):this.each(function(){h&&h.call(this)}):a===!1?this.each(u).each(i):this.queue(r,u).queue(r,i)},show:function(t){return function(s){if(i(s))return t.apply(this,arguments);var n=e.apply(this,arguments);return n.mode="show",this.effect.call(this,n)}}(t.fn.show),hide:function(t){return function(s){if(i(s))return t.apply(this,arguments);
var n=e.apply(this,arguments);return n.mode="hide",this.effect.call(this,n)}}(t.fn.hide),toggle:function(t){return function(s){if(i(s)||"boolean"==typeof s)return t.apply(this,arguments);var n=e.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n)}}(t.fn.toggle),cssUnit:function(e){var i=this.css(e),s=[];return t.each(["em","px","%","pt"],function(t,e){i.indexOf(e)>0&&(s=[parseFloat(i),e])}),s},cssClip:function(t){return t?this.css("clip","rect("+t.top+"px "+t.right+"px "+t.bottom+"px "+t.left+"px)"):s(this.css("clip"),this)},transfer:function(e,i){var s=t(this),n=t(e.to),o="fixed"===n.css("position"),a=t("body"),r=o?a.scrollTop():0,h=o?a.scrollLeft():0,l=n.offset(),c={top:l.top-r,left:l.left-h,height:n.innerHeight(),width:n.innerWidth()},u=s.offset(),d=t("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(e.className).css({top:u.top-r,left:u.left-h,height:s.innerHeight(),width:s.innerWidth(),position:o?"fixed":"absolute"}).animate(c,e.duration,e.easing,function(){d.remove(),t.isFunction(i)&&i()})}}),t.fx.step.clip=function(e){e.clipInit||(e.start=t(e.elem).cssClip(),"string"==typeof e.end&&(e.end=s(e.end,e.elem)),e.clipInit=!0),t(e.elem).cssClip({top:e.pos*(e.end.top-e.start.top)+e.start.top,right:e.pos*(e.end.right-e.start.right)+e.start.right,bottom:e.pos*(e.end.bottom-e.start.bottom)+e.start.bottom,left:e.pos*(e.end.left-e.start.left)+e.start.left})}}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,i){e[i]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;((e=Math.pow(2,--i))-1)/11>t;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,i){t.easing["easeIn"+e]=i,t.easing["easeOut"+e]=function(t){return 1-i(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?i(2*t)/2:1-i(-2*t+2)/2}})}();var f=t.effects;t.effects.define("blind","hide",function(e,i){var s={up:["bottom","top"],vertical:["bottom","top"],down:["top","bottom"],left:["right","left"],horizontal:["right","left"],right:["left","right"]},n=t(this),o=e.direction||"up",a=n.cssClip(),r={clip:t.extend({},a)},h=t.effects.createPlaceholder(n);r.clip[s[o][0]]=r.clip[s[o][1]],"show"===e.mode&&(n.cssClip(r.clip),h&&h.css(t.effects.clipToBox(r)),r.clip=a),h&&h.animate(t.effects.clipToBox(r),e.duration,e.easing),n.animate(r,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("bounce",function(e,i){var s,n,o,a=t(this),r=e.mode,h="hide"===r,l="show"===r,c=e.direction||"up",u=e.distance,d=e.times||5,p=2*d+(l||h?1:0),f=e.duration/p,g=e.easing,m="up"===c||"down"===c?"top":"left",_="up"===c||"left"===c,v=0,b=a.queue().length;for(t.effects.createPlaceholder(a),o=a.css(m),u||(u=a["top"===m?"outerHeight":"outerWidth"]()/3),l&&(n={opacity:1},n[m]=o,a.css("opacity",0).css(m,_?2*-u:2*u).animate(n,f,g)),h&&(u/=Math.pow(2,d-1)),n={},n[m]=o;d>v;v++)s={},s[m]=(_?"-=":"+=")+u,a.animate(s,f,g).animate(n,f,g),u=h?2*u:u/2;h&&(s={opacity:0},s[m]=(_?"-=":"+=")+u,a.animate(s,f,g)),a.queue(i),t.effects.unshift(a,b,p+1)}),t.effects.define("clip","hide",function(e,i){var s,n={},o=t(this),a=e.direction||"vertical",r="both"===a,h=r||"horizontal"===a,l=r||"vertical"===a;s=o.cssClip(),n.clip={top:l?(s.bottom-s.top)/2:s.top,right:h?(s.right-s.left)/2:s.right,bottom:l?(s.bottom-s.top)/2:s.bottom,left:h?(s.right-s.left)/2:s.left},t.effects.createPlaceholder(o),"show"===e.mode&&(o.cssClip(n.clip),n.clip=s),o.animate(n,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("drop","hide",function(e,i){var s,n=t(this),o=e.mode,a="show"===o,r=e.direction||"left",h="up"===r||"down"===r?"top":"left",l="up"===r||"left"===r?"-=":"+=",c="+="===l?"-=":"+=",u={opacity:0};t.effects.createPlaceholder(n),s=e.distance||n["top"===h?"outerHeight":"outerWidth"](!0)/2,u[h]=l+s,a&&(n.css(u),u[h]=c+s,u.opacity=1),n.animate(u,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("explode","hide",function(e,i){function s(){b.push(this),b.length===u*d&&n()}function n(){p.css({visibility:"visible"}),t(b).remove(),i()}var o,a,r,h,l,c,u=e.pieces?Math.round(Math.sqrt(e.pieces)):3,d=u,p=t(this),f=e.mode,g="show"===f,m=p.show().css("visibility","hidden").offset(),_=Math.ceil(p.outerWidth()/d),v=Math.ceil(p.outerHeight()/u),b=[];for(o=0;u>o;o++)for(h=m.top+o*v,c=o-(u-1)/2,a=0;d>a;a++)r=m.left+a*_,l=a-(d-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-a*_,top:-o*v}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:_,height:v,left:r+(g?l*_:0),top:h+(g?c*v:0),opacity:g?0:1}).animate({left:r+(g?0:l*_),top:h+(g?0:c*v),opacity:g?1:0},e.duration||500,e.easing,s)}),t.effects.define("fade","toggle",function(e,i){var s="show"===e.mode;t(this).css("opacity",s?0:1).animate({opacity:s?1:0},{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("fold","hide",function(e,i){var s=t(this),n=e.mode,o="show"===n,a="hide"===n,r=e.size||15,h=/([0-9]+)%/.exec(r),l=!!e.horizFirst,c=l?["right","bottom"]:["bottom","right"],u=e.duration/2,d=t.effects.createPlaceholder(s),p=s.cssClip(),f={clip:t.extend({},p)},g={clip:t.extend({},p)},m=[p[c[0]],p[c[1]]],_=s.queue().length;h&&(r=parseInt(h[1],10)/100*m[a?0:1]),f.clip[c[0]]=r,g.clip[c[0]]=r,g.clip[c[1]]=0,o&&(s.cssClip(g.clip),d&&d.css(t.effects.clipToBox(g)),g.clip=p),s.queue(function(i){d&&d.animate(t.effects.clipToBox(f),u,e.easing).animate(t.effects.clipToBox(g),u,e.easing),i()}).animate(f,u,e.easing).animate(g,u,e.easing).queue(i),t.effects.unshift(s,_,4)}),t.effects.define("highlight","show",function(e,i){var s=t(this),n={backgroundColor:s.css("backgroundColor")};"hide"===e.mode&&(n.opacity=0),t.effects.saveStyle(s),s.css({backgroundImage:"none",backgroundColor:e.color||"#ffff99"}).animate(n,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("size",function(e,i){var s,n,o,a=t(this),r=["fontSize"],h=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],l=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],c=e.mode,u="effect"!==c,d=e.scale||"both",p=e.origin||["middle","center"],f=a.css("position"),g=a.position(),m=t.effects.scaledDimensions(a),_=e.from||m,v=e.to||t.effects.scaledDimensions(a,0);t.effects.createPlaceholder(a),"show"===c&&(o=_,_=v,v=o),n={from:{y:_.height/m.height,x:_.width/m.width},to:{y:v.height/m.height,x:v.width/m.width}},("box"===d||"both"===d)&&(n.from.y!==n.to.y&&(_=t.effects.setTransition(a,h,n.from.y,_),v=t.effects.setTransition(a,h,n.to.y,v)),n.from.x!==n.to.x&&(_=t.effects.setTransition(a,l,n.from.x,_),v=t.effects.setTransition(a,l,n.to.x,v))),("content"===d||"both"===d)&&n.from.y!==n.to.y&&(_=t.effects.setTransition(a,r,n.from.y,_),v=t.effects.setTransition(a,r,n.to.y,v)),p&&(s=t.effects.getBaseline(p,m),_.top=(m.outerHeight-_.outerHeight)*s.y+g.top,_.left=(m.outerWidth-_.outerWidth)*s.x+g.left,v.top=(m.outerHeight-v.outerHeight)*s.y+g.top,v.left=(m.outerWidth-v.outerWidth)*s.x+g.left),a.css(_),("content"===d||"both"===d)&&(h=h.concat(["marginTop","marginBottom"]).concat(r),l=l.concat(["marginLeft","marginRight"]),a.find("*[width]").each(function(){var i=t(this),s=t.effects.scaledDimensions(i),o={height:s.height*n.from.y,width:s.width*n.from.x,outerHeight:s.outerHeight*n.from.y,outerWidth:s.outerWidth*n.from.x},a={height:s.height*n.to.y,width:s.width*n.to.x,outerHeight:s.height*n.to.y,outerWidth:s.width*n.to.x};n.from.y!==n.to.y&&(o=t.effects.setTransition(i,h,n.from.y,o),a=t.effects.setTransition(i,h,n.to.y,a)),n.from.x!==n.to.x&&(o=t.effects.setTransition(i,l,n.from.x,o),a=t.effects.setTransition(i,l,n.to.x,a)),u&&t.effects.saveStyle(i),i.css(o),i.animate(a,e.duration,e.easing,function(){u&&t.effects.restoreStyle(i)})})),a.animate(v,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){var e=a.offset();0===v.opacity&&a.css("opacity",_.opacity),u||(a.css("position","static"===f?"relative":f).offset(e),t.effects.saveStyle(a)),i()}})}),t.effects.define("scale",function(e,i){var s=t(this),n=e.mode,o=parseInt(e.percent,10)||(0===parseInt(e.percent,10)?0:"effect"!==n?0:100),a=t.extend(!0,{from:t.effects.scaledDimensions(s),to:t.effects.scaledDimensions(s,o,e.direction||"both"),origin:e.origin||["middle","center"]},e);e.fade&&(a.from.opacity=1,a.to.opacity=0),t.effects.effect.size.call(this,a,i)}),t.effects.define("puff","hide",function(e,i){var s=t.extend(!0,{},e,{fade:!0,percent:parseInt(e.percent,10)||150});t.effects.effect.scale.call(this,s,i)}),t.effects.define("pulsate","show",function(e,i){var s=t(this),n=e.mode,o="show"===n,a="hide"===n,r=o||a,h=2*(e.times||5)+(r?1:0),l=e.duration/h,c=0,u=1,d=s.queue().length;for((o||!s.is(":visible"))&&(s.css("opacity",0).show(),c=1);h>u;u++)s.animate({opacity:c},l,e.easing),c=1-c;s.animate({opacity:c},l,e.easing),s.queue(i),t.effects.unshift(s,d,h+1)}),t.effects.define("shake",function(e,i){var s=1,n=t(this),o=e.direction||"left",a=e.distance||20,r=e.times||3,h=2*r+1,l=Math.round(e.duration/h),c="up"===o||"down"===o?"top":"left",u="up"===o||"left"===o,d={},p={},f={},g=n.queue().length;for(t.effects.createPlaceholder(n),d[c]=(u?"-=":"+=")+a,p[c]=(u?"+=":"-=")+2*a,f[c]=(u?"-=":"+=")+2*a,n.animate(d,l,e.easing);r>s;s++)n.animate(p,l,e.easing).animate(f,l,e.easing);n.animate(p,l,e.easing).animate(d,l/2,e.easing).queue(i),t.effects.unshift(n,g,h+1)}),t.effects.define("slide","show",function(e,i){var s,n,o=t(this),a={up:["bottom","top"],down:["top","bottom"],left:["right","left"],right:["left","right"]},r=e.mode,h=e.direction||"left",l="up"===h||"down"===h?"top":"left",c="up"===h||"left"===h,u=e.distance||o["top"===l?"outerHeight":"outerWidth"](!0),d={};t.effects.createPlaceholder(o),s=o.cssClip(),n=o.position()[l],d[l]=(c?-1:1)*u+n,d.clip=o.cssClip(),d.clip[a[h][1]]=d.clip[a[h][0]],"show"===r&&(o.cssClip(d.clip),o.css(l,d[l]),d.clip=s,d[l]=n),o.animate(d,{queue:!1,duration:e.duration,easing:e.easing,complete:i})});var f;t.uiBackCompat!==!1&&(f=t.effects.define("transfer",function(e,i){t(this).transfer(e,i)})),t.ui.focusable=function(i,s){var n,o,a,r,h,l=i.nodeName.toLowerCase();return"area"===l?(n=i.parentNode,o=n.name,i.href&&o&&"map"===n.nodeName.toLowerCase()?(a=t("img[usemap='#"+o+"']"),a.length>0&&a.is(":visible")):!1):(/^(input|select|textarea|button|object)$/.test(l)?(r=!i.disabled,r&&(h=t(i).closest("fieldset")[0],h&&(r=!h.disabled))):r="a"===l?i.href||s:s,r&&t(i).is(":visible")&&e(t(i)))},t.extend(t.expr[":"],{focusable:function(e){return t.ui.focusable(e,null!=t.attr(e,"tabindex"))}}),t.ui.focusable,t.fn.form=function(){return"string"==typeof this[0].form?this.closest("form"):t(this[0].form)},t.ui.formResetMixin={_formResetHandler:function(){var e=t(this);setTimeout(function(){var i=e.data("ui-form-reset-instances");t.each(i,function(){this.refresh()})})},_bindFormResetHandler:function(){if(this.form=this.element.form(),this.form.length){var t=this.form.data("ui-form-reset-instances")||[];t.length||this.form.on("reset.ui-form-reset",this._formResetHandler),t.push(this),this.form.data("ui-form-reset-instances",t)}},_unbindFormResetHandler:function(){if(this.form.length){var e=this.form.data("ui-form-reset-instances");e.splice(t.inArray(this,e),1),e.length?this.form.data("ui-form-reset-instances",e):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")}}},"1.7"===t.fn.jquery.substring(0,3)&&(t.each(["Width","Height"],function(e,i){function s(e,i,s,o){return t.each(n,function(){i-=parseFloat(t.css(e,"padding"+this))||0,s&&(i-=parseFloat(t.css(e,"border"+this+"Width"))||0),o&&(i-=parseFloat(t.css(e,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],o=i.toLowerCase(),a={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(e){return void 0===e?a["inner"+i].call(this):this.each(function(){t(this).css(o,s(this,e)+"px")})},t.fn["outer"+i]=function(e,n){return"number"!=typeof e?a["outer"+i].call(this,e):this.each(function(){t(this).css(o,s(this,e,!0,n)+"px")})}}),t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},t.ui.escapeSelector=function(){var t=/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;return function(e){return e.replace(t,"\\$1")}}(),t.fn.labels=function(){var e,i,s,n,o;return this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(n=this.eq(0).parents("label"),s=this.attr("id"),s&&(e=this.eq(0).parents().last(),o=e.add(e.length?e.siblings():this.siblings()),i="label[for='"+t.ui.escapeSelector(s)+"']",n=n.add(o.find(i).addBack(i))),this.pushStack(n))},t.fn.scrollParent=function(e){var i=this.css("position"),s="absolute"===i,n=e?/(auto|scroll|hidden)/:/(auto|scroll)/,o=this.parents().filter(function(){var e=t(this);return s&&"static"===e.css("position")?!1:n.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==i&&o.length?o:t(this[0].ownerDocument||document)},t.extend(t.expr[":"],{tabbable:function(e){var i=t.attr(e,"tabindex"),s=null!=i;return(!s||i>=0)&&t.ui.focusable(e,s)}}),t.fn.extend({uniqueId:function(){var t=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++t)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&t(this).removeAttr("id")})}}),t.widget("ui.accordion",{version:"1.12.0",options:{active:0,animate:{},classes:{"ui-accordion-header":"ui-corner-top","ui-accordion-header-collapsed":"ui-corner-all","ui-accordion-content":"ui-corner-bottom"},collapsible:!1,event:"click",header:"> li > :first-child, > :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var e=this.options;this.prevShow=this.prevHide=t(),this._addClass("ui-accordion","ui-widget ui-helper-reset"),this.element.attr("role","tablist"),e.collapsible||e.active!==!1&&null!=e.active||(e.active=0),this._processPanels(),0>e.active&&(e.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():t()}},_createIcons:function(){var e,i,s=this.options.icons;s&&(e=t("<span>"),this._addClass(e,"ui-accordion-header-icon","ui-icon "+s.header),e.prependTo(this.headers),i=this.active.children(".ui-accordion-header-icon"),this._removeClass(i,s.header)._addClass(i,null,s.activeHeader)._addClass(this.headers,"ui-accordion-icons"))},_destroyIcons:function(){this._removeClass(this.headers,"ui-accordion-icons"),this.headers.children(".ui-accordion-header-icon").remove()},_destroy:function(){var t;this.element.removeAttr("role"),this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(),this._destroyIcons(),t=this.headers.next().css("display","").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&t.css("height","")},_setOption:function(t,e){return"active"===t?(this._activate(e),void 0):("event"===t&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(e)),this._super(t,e),"collapsible"!==t||e||this.options.active!==!1||this._activate(0),"icons"===t&&(this._destroyIcons(),e&&this._createIcons()),void 0)},_setOptionDisabled:function(t){this._super(t),this.element.attr("aria-disabled",t),this._toggleClass(null,"ui-state-disabled",!!t),this._toggleClass(this.headers.add(this.headers.next()),null,"ui-state-disabled",!!t)},_keydown:function(e){if(!e.altKey&&!e.ctrlKey){var i=t.ui.keyCode,s=this.headers.length,n=this.headers.index(e.target),o=!1;switch(e.keyCode){case i.RIGHT:case i.DOWN:o=this.headers[(n+1)%s];break;case i.LEFT:case i.UP:o=this.headers[(n-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(e);break;case i.HOME:o=this.headers[0];break;case i.END:o=this.headers[s-1]}o&&(t(e.target).attr("tabIndex",-1),t(o).attr("tabIndex",0),t(o).trigger("focus"),e.preventDefault())}},_panelKeyDown:function(e){e.keyCode===t.ui.keyCode.UP&&e.ctrlKey&&t(e.currentTarget).prev().trigger("focus")},refresh:function(){var e=this.options;this._processPanels(),e.active===!1&&e.collapsible===!0||!this.headers.length?(e.active=!1,this.active=t()):e.active===!1?this._activate(0):this.active.length&&!t.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(e.active=!1,this.active=t()):this._activate(Math.max(0,e.active-1)):e.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var t=this.headers,e=this.panels;this.headers=this.element.find(this.options.header),this._addClass(this.headers,"ui-accordion-header ui-accordion-header-collapsed","ui-state-default"),this.panels=this.headers.next().filter(":not(.ui-accordion-content-active)").hide(),this._addClass(this.panels,"ui-accordion-content","ui-helper-reset ui-widget-content"),e&&(this._off(t.not(this.headers)),this._off(e.not(this.panels)))},_refresh:function(){var e,i=this.options,s=i.heightStyle,n=this.element.parent();this.active=this._findActive(i.active),this._addClass(this.active,"ui-accordion-header-active","ui-state-active")._removeClass(this.active,"ui-accordion-header-collapsed"),this._addClass(this.active.next(),"ui-accordion-content-active"),this.active.next().show(),this.headers.attr("role","tab").each(function(){var e=t(this),i=e.uniqueId().attr("id"),s=e.next(),n=s.uniqueId().attr("id");e.attr("aria-controls",n),s.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(i.event),"fill"===s?(e=n.height(),this.element.siblings(":visible").each(function(){var i=t(this),s=i.css("position");"absolute"!==s&&"fixed"!==s&&(e-=i.outerHeight(!0))}),this.headers.each(function(){e-=t(this).outerHeight(!0)}),this.headers.next().each(function(){t(this).height(Math.max(0,e-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===s&&(e=0,this.headers.next().each(function(){var i=t(this).is(":visible");i||t(this).show(),e=Math.max(e,t(this).css("height","").height()),i||t(this).hide()}).height(e))},_activate:function(e){var i=this._findActive(e)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return"number"==typeof e?this.headers.eq(e):t()},_setupEvents:function(e){var i={keydown:"_keydown"};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(e){var i,s,n=this.options,o=this.active,a=t(e.currentTarget),r=a[0]===o[0],h=r&&n.collapsible,l=h?t():a.next(),c=o.next(),u={oldHeader:o,oldPanel:c,newHeader:h?t():a,newPanel:l};e.preventDefault(),r&&!n.collapsible||this._trigger("beforeActivate",e,u)===!1||(n.active=h?!1:this.headers.index(a),this.active=r?t():a,this._toggle(u),this._removeClass(o,"ui-accordion-header-active","ui-state-active"),n.icons&&(i=o.children(".ui-accordion-header-icon"),this._removeClass(i,null,n.icons.activeHeader)._addClass(i,null,n.icons.header)),r||(this._removeClass(a,"ui-accordion-header-collapsed")._addClass(a,"ui-accordion-header-active","ui-state-active"),n.icons&&(s=a.children(".ui-accordion-header-icon"),this._removeClass(s,null,n.icons.header)._addClass(s,null,n.icons.activeHeader)),this._addClass(a.next(),"ui-accordion-content-active")))},_toggle:function(e){var i=e.newPanel,s=this.prevShow.length?this.prevShow:e.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,e):(s.hide(),i.show(),this._toggleComplete(e)),s.attr({"aria-hidden":"true"}),s.prev().attr({"aria-selected":"false","aria-expanded":"false"}),i.length&&s.length?s.prev().attr({tabIndex:-1,"aria-expanded":"false"}):i.length&&this.headers.filter(function(){return 0===parseInt(t(this).attr("tabIndex"),10)}).attr("tabIndex",-1),i.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_animate:function(t,e,i){var s,n,o,a=this,r=0,h=t.css("box-sizing"),l=t.length&&(!e.length||t.index()<e.index()),c=this.options.animate||{},u=l&&c.down||c,d=function(){a._toggleComplete(i)};return"number"==typeof u&&(o=u),"string"==typeof u&&(n=u),n=n||u.easing||c.easing,o=o||u.duration||c.duration,e.length?t.length?(s=t.show().outerHeight(),e.animate(this.hideProps,{duration:o,easing:n,step:function(t,e){e.now=Math.round(t)}}),t.hide().animate(this.showProps,{duration:o,easing:n,complete:d,step:function(t,i){i.now=Math.round(t),"height"!==i.prop?"content-box"===h&&(r+=i.now):"content"!==a.options.heightStyle&&(i.now=Math.round(s-e.outerHeight()-r),r=0)}}),void 0):e.animate(this.hideProps,o,n,d):t.animate(this.showProps,o,n,d)},_toggleComplete:function(t){var e=t.oldPanel,i=e.prev();this._removeClass(e,"ui-accordion-content-active"),this._removeClass(i,"ui-accordion-header-active")._addClass(i,"ui-accordion-header-collapsed"),e.length&&(e.parent()[0].className=e.parent()[0].className),this._trigger("activate",null,t)}}),t.ui.safeActiveElement=function(t){var e;try{e=t.activeElement}catch(i){e=t.body}return e||(e=t.body),e.nodeName||(e=t.body),e},t.widget("ui.menu",{version:"1.12.0",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().attr({role:this.options.role,tabIndex:0}),this._addClass("ui-menu","ui-widget ui-widget-content"),this._on({"mousedown .ui-menu-item":function(t){t.preventDefault()},"click .ui-menu-item":function(e){var i=t(e.target),s=t(t.ui.safeActiveElement(this.document[0]));!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(e),e.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(e):!this.element.is(":focus")&&s.closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(e){if(!this.previousFilter){var i=t(e.target).closest(".ui-menu-item"),s=t(e.currentTarget);i[0]===s[0]&&(this._removeClass(s.siblings().children(".ui-state-active"),null,"ui-state-active"),this.focus(e,s))}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(t,e){var i=this.active||this.element.find(this.options.items).eq(0);e||this.focus(t,i)},blur:function(e){this._delay(function(){var i=!t.contains(this.element[0],t.ui.safeActiveElement(this.document[0]));i&&this.collapseAll(e)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){this._closeOnDocumentClick(t)&&this.collapseAll(t),this.mouseHandled=!1}})},_destroy:function(){var e=this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),i=e.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),i.children().each(function(){var e=t(this);e.data("ui-menu-submenu-caret")&&e.remove()})},_keydown:function(e){var i,s,n,o,a=!0;switch(e.keyCode){case t.ui.keyCode.PAGE_UP:this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:this.nextPage(e);break;case t.ui.keyCode.HOME:this._move("first","first",e);break;case t.ui.keyCode.END:this._move("last","last",e);break;case t.ui.keyCode.UP:this.previous(e);break;case t.ui.keyCode.DOWN:this.next(e);break;case t.ui.keyCode.LEFT:this.collapse(e);break;case t.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:this._activate(e);break;case t.ui.keyCode.ESCAPE:this.collapse(e);break;default:a=!1,s=this.previousFilter||"",n=String.fromCharCode(e.keyCode),o=!1,clearTimeout(this.filterTimer),n===s?o=!0:n=s+n,i=this._filterMenuItems(n),i=o&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(n=String.fromCharCode(e.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(e,i),this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}a&&e.preventDefault()},_activate:function(t){this.active&&!this.active.is(".ui-state-disabled")&&(this.active.children("[aria-haspopup='true']").length?this.expand(t):this.select(t))},refresh:function(){var e,i,s,n,o,a=this,r=this.options.icons.submenu,h=this.element.find(this.options.menus);this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length),s=h.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var e=t(this),i=e.prev(),s=t("<span>").data("ui-menu-submenu-caret",!0);a._addClass(s,"ui-menu-icon","ui-icon "+r),i.attr("aria-haspopup","true").prepend(s),e.attr("aria-labelledby",i.attr("id"))}),this._addClass(s,"ui-menu","ui-widget ui-widget-content ui-front"),e=h.add(this.element),i=e.find(this.options.items),i.not(".ui-menu-item").each(function(){var e=t(this);a._isDivider(e)&&a._addClass(e,"ui-menu-divider","ui-widget-content")}),n=i.not(".ui-menu-item, .ui-menu-divider"),o=n.children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),this._addClass(n,"ui-menu-item")._addClass(o,"ui-menu-item-wrapper"),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!t.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(t,e){if("icons"===t){var i=this.element.find(".ui-menu-icon");this._removeClass(i,null,this.options.icons.submenu)._addClass(i,null,e.submenu)}this._super(t,e)},_setOptionDisabled:function(t){this._super(t),this.element.attr("aria-disabled",t+""),this._toggleClass(null,"ui-state-disabled",!!t)},focus:function(t,e){var i,s,n;this.blur(t,t&&"focus"===t.type),this._scrollIntoView(e),this.active=e.first(),s=this.active.children(".ui-menu-item-wrapper"),this._addClass(s,null,"ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),n=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),this._addClass(n,null,"ui-state-active"),t&&"keydown"===t.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=e.children(".ui-menu"),i.length&&t&&/^mouse/.test(t.type)&&this._startOpening(i),this.activeMenu=e.parent(),this._trigger("focus",t,{item:e})},_scrollIntoView:function(e){var i,s,n,o,a,r;this._hasScroll()&&(i=parseFloat(t.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(t.css(this.activeMenu[0],"paddingTop"))||0,n=e.offset().top-this.activeMenu.offset().top-i-s,o=this.activeMenu.scrollTop(),a=this.activeMenu.height(),r=e.outerHeight(),0>n?this.activeMenu.scrollTop(o+n):n+r>a&&this.activeMenu.scrollTop(o+n-a+r))},blur:function(t,e){e||clearTimeout(this.timer),this.active&&(this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active"),this._trigger("blur",t,{item:this.active}),this.active=null)},_startOpening:function(t){clearTimeout(this.timer),"true"===t.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(t)},this.delay))},_open:function(e){var i=t.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true"),e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(e,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:t(e&&e.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(e),this._removeClass(s.find(".ui-state-active"),null,"ui-state-active"),this.activeMenu=s},this.delay)},_close:function(t){t||(t=this.active?this.active.parent():this.element),t.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")},_closeOnDocumentClick:function(e){return!t(e.target).closest(".ui-menu").length},_isDivider:function(t){return!/[^\-\u2014\u2013\s]/.test(t.text())},collapse:function(t){var e=this.active&&this.active.parent().closest(".ui-menu-item",this.element);e&&e.length&&(this._close(),this.focus(t,e))},expand:function(t){var e=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();e&&e.length&&(this._open(e.parent()),this._delay(function(){this.focus(t,e)}))},next:function(t){this._move("next","first",t)},previous:function(t){this._move("prev","last",t)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(t,e,i){var s;this.active&&(s="first"===t||"last"===t?this.active["first"===t?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[t+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[e]()),this.focus(i,s)},nextPage:function(e){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=t(this),0>i.offset().top-s-n}),this.focus(e,i)):this.focus(e,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())),void 0):(this.next(e),void 0)},previousPage:function(e){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-s+n>0}),this.focus(e,i)):this.focus(e,this.activeMenu.find(this.options.items).first())),void 0):(this.next(e),void 0)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){this.active=this.active||t(e.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(e,!0),this._trigger("select",e,i)},_filterMenuItems:function(e){var i=e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(t.trim(t(this).children(".ui-menu-item-wrapper").text()))})}}),t.widget("ui.autocomplete",{version:"1.12.0",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var e,i,s,n=this.element[0].nodeName.toLowerCase(),o="textarea"===n,a="input"===n;this.isMultiLine=o||!a&&this._isContentEditable(this.element),this.valueMethod=this.element[o||a?"val":"text"],this.isNewMenu=!0,this._addClass("ui-autocomplete-input"),this.element.attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return e=!0,s=!0,i=!0,void 0;
e=!1,s=!1,i=!1;var o=t.ui.keyCode;switch(n.keyCode){case o.PAGE_UP:e=!0,this._move("previousPage",n);break;case o.PAGE_DOWN:e=!0,this._move("nextPage",n);break;case o.UP:e=!0,this._keyEvent("previous",n);break;case o.DOWN:e=!0,this._keyEvent("next",n);break;case o.ENTER:this.menu.active&&(e=!0,n.preventDefault(),this.menu.select(n));break;case o.TAB:this.menu.active&&this.menu.select(n);break;case o.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(e)return e=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),void 0;if(!i){var n=t.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(t){return s?(s=!1,t.preventDefault(),void 0):(this._searchTimeout(t),void 0)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(t){return this.cancelBlur?(delete this.cancelBlur,void 0):(clearTimeout(this.searching),this.close(t),this._change(t),void 0)}}),this._initSource(),this.menu=t("<ul>").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._addClass(this.menu.element,"ui-autocomplete","ui-front"),this._on(this.menu.element,{mousedown:function(e){e.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,this.element[0]!==t.ui.safeActiveElement(this.document[0])&&this.element.trigger("focus")})},menufocus:function(e,i){var s,n;return this.isNewMenu&&(this.isNewMenu=!1,e.originalEvent&&/^mouse/.test(e.originalEvent.type))?(this.menu.blur(),this.document.one("mousemove",function(){t(e.target).trigger(e.originalEvent)}),void 0):(n=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",e,{item:n})&&e.originalEvent&&/^key/.test(e.originalEvent.type)&&this._value(n.value),s=i.item.attr("aria-label")||n.value,s&&t.trim(s).length&&(this.liveRegion.children().hide(),t("<div>").text(s).appendTo(this.liveRegion)),void 0)},menuselect:function(e,i){var s=i.item.data("ui-autocomplete-item"),n=this.previous;this.element[0]!==t.ui.safeActiveElement(this.document[0])&&(this.element.trigger("focus"),this.previous=n,this._delay(function(){this.previous=n,this.selectedItem=s})),!1!==this._trigger("select",e,{item:s})&&this._value(s.value),this.term=this._value(),this.close(e),this.selectedItem=s}}),this.liveRegion=t("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(t,e){this._super(t,e),"source"===t&&this._initSource(),"appendTo"===t&&this.menu.element.appendTo(this._appendTo()),"disabled"===t&&e&&this.xhr&&this.xhr.abort()},_isEventTargetInWidget:function(e){var i=this.menu.element[0];return e.target===this.element[0]||e.target===i||t.contains(i,e.target)},_closeOnClickOutside:function(t){this._isEventTargetInWidget(t)||this.close()},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e&&e[0]||(e=this.element.closest(".ui-front, dialog")),e.length||(e=this.document[0].body),e},_initSource:function(){var e,i,s=this;t.isArray(this.options.source)?(e=this.options.source,this.source=function(i,s){s(t.ui.autocomplete.filter(e,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(e,n){s.xhr&&s.xhr.abort(),s.xhr=t.ajax({url:i,data:e,dataType:"json",success:function(t){n(t)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(t){clearTimeout(this.searching),this.searching=this._delay(function(){var e=this.term===this._value(),i=this.menu.element.is(":visible"),s=t.altKey||t.ctrlKey||t.metaKey||t.shiftKey;(!e||e&&!i&&!s)&&(this.selectedItem=null,this.search(null,t))},this.options.delay)},search:function(t,e){return t=null!=t?t:this._value(),this.term=this._value(),t.length<this.options.minLength?this.close(e):this._trigger("search",e)!==!1?this._search(t):void 0},_search:function(t){this.pending++,this._addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:t},this._response())},_response:function(){var e=++this.requestIndex;return t.proxy(function(t){e===this.requestIndex&&this.__response(t),this.pending--,this.pending||this._removeClass("ui-autocomplete-loading")},this)},__response:function(t){t&&(t=this._normalize(t)),this._trigger("response",null,{content:t}),!this.options.disabled&&t&&t.length&&!this.cancelSearch?(this._suggest(t),this._trigger("open")):this._close()},close:function(t){this.cancelSearch=!0,this._close(t)},_close:function(t){this._off(this.document,"mousedown"),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",t))},_change:function(t){this.previous!==this._value()&&this._trigger("change",t,{item:this.selectedItem})},_normalize:function(e){return e.length&&e[0].label&&e[0].value?e:t.map(e,function(e){return"string"==typeof e?{label:e,value:e}:t.extend({},e,{label:e.label||e.value,value:e.value||e.label})})},_suggest:function(e){var i=this.menu.element.empty();this._renderMenu(i,e),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(t.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(),this._on(this.document,{mousedown:"_closeOnClickOutside"})},_resizeMenu:function(){var t=this.menu.element;t.outerWidth(Math.max(t.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(e,i){var s=this;t.each(i,function(t,i){s._renderItemData(e,i)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-autocomplete-item",e)},_renderItem:function(e,i){return t("<li>").append(t("<div>").text(i.label)).appendTo(e)},_move:function(t,e){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(t)||this.menu.isLastItem()&&/^next/.test(t)?(this.isMultiLine||this._value(this.term),this.menu.blur(),void 0):(this.menu[t](e),void 0):(this.search(null,e),void 0)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(t,e){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(t,e),e.preventDefault())},_isContentEditable:function(t){if(!t.length)return!1;var e=t.prop("contentEditable");return"inherit"===e?this._isContentEditable(t.parent()):"true"===e}}),t.extend(t.ui.autocomplete,{escapeRegex:function(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(e,i){var s=RegExp(t.ui.autocomplete.escapeRegex(i),"i");return t.grep(e,function(t){return s.test(t.label||t.value||t)})}}),t.widget("ui.autocomplete",t.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(t){return t+(t>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=e&&e.length?this.options.messages.results(e.length):this.options.messages.noResults,this.liveRegion.children().hide(),t("<div>").text(i).appendTo(this.liveRegion))}}),t.ui.autocomplete;var g=/ui-corner-([a-z]){2,6}/g;t.widget("ui.controlgroup",{version:"1.12.0",defaultElement:"<div>",options:{direction:"horizontal",disabled:null,onlyVisible:!0,items:{button:"input[type=button], input[type=submit], input[type=reset], button, a",controlgroupLabel:".ui-controlgroup-label",checkboxradio:"input[type='checkbox'], input[type='radio']",selectmenu:"select",spinner:".ui-spinner-input"}},_create:function(){this._enhance()},_enhance:function(){this.element.attr("role","toolbar"),this.refresh()},_destroy:function(){this._callChildMethod("destroy"),this.childWidgets.removeData("ui-controlgroup-data"),this.element.removeAttr("role"),this.options.items.controlgroupLabel&&this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()},_initWidgets:function(){var e=this,i=[];t.each(this.options.items,function(s,n){var o,a={};return n?"controlgroupLabel"===s?(o=e.element.find(n),o.each(function(){var e=t(this);e.children(".ui-controlgroup-label-contents").length||e.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")}),e._addClass(o,null,"ui-widget ui-widget-content ui-state-default"),i=i.concat(o.get()),void 0):(t.fn[s]&&(e["_"+s+"Options"]&&(a=e["_"+s+"Options"]("middle")),e.element.find(n).each(function(){var n=t(this),o=n[s]("instance"),r=t.widget.extend({},a);if("button"!==s||!n.parent(".ui-spinner").length){o||(o=n[s]()[s]("instance")),o&&(r.classes=e._resolveClassesValues(r.classes,o)),n[s](r);var h=n[s]("widget");t.data(h[0],"ui-controlgroup-data",o?o:n[s]("instance")),i.push(h[0])}})),void 0):void 0}),this.childWidgets=t(t.unique(i)),this._addClass(this.childWidgets,"ui-controlgroup-item")},_callChildMethod:function(e){this.childWidgets.each(function(){var i=t(this),s=i.data("ui-controlgroup-data");s&&s[e]&&s[e]()})},_updateCornerClass:function(t,e){var i="ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",s=this._buildSimpleOptions(e,"label").classes.label;this._removeClass(t,null,i),this._addClass(t,null,s)},_buildSimpleOptions:function(t,e){var i="vertical"===this.options.direction,s={classes:{}};return s.classes[e]={middle:"",first:"ui-corner-"+(i?"top":"left"),last:"ui-corner-"+(i?"bottom":"right"),only:"ui-corner-all"}[t],s},_spinnerOptions:function(t){var e=this._buildSimpleOptions(t,"ui-spinner");return e.classes["ui-spinner-up"]="",e.classes["ui-spinner-down"]="",e},_buttonOptions:function(t){return this._buildSimpleOptions(t,"ui-button")},_checkboxradioOptions:function(t){return this._buildSimpleOptions(t,"ui-checkboxradio-label")},_selectmenuOptions:function(t){var e="vertical"===this.options.direction;return{width:e?"auto":!1,classes:{middle:{"ui-selectmenu-button-open":"","ui-selectmenu-button-closed":""},first:{"ui-selectmenu-button-open":"ui-corner-"+(e?"top":"tl"),"ui-selectmenu-button-closed":"ui-corner-"+(e?"top":"left")},last:{"ui-selectmenu-button-open":e?"":"ui-corner-tr","ui-selectmenu-button-closed":"ui-corner-"+(e?"bottom":"right")},only:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"}}[t]}},_resolveClassesValues:function(e,i){var s={};return t.each(e,function(t){var n=i.options.classes[t]||"";n=n.replace(g,"").trim(),s[t]=(n+" "+e[t]).replace(/\s+/g," ")}),s},_setOption:function(t,e){return"direction"===t&&this._removeClass("ui-controlgroup-"+this.options.direction),this._super(t,e),"disabled"===t?(this._callChildMethod(e?"disable":"enable"),void 0):(this.refresh(),void 0)},refresh:function(){var e,i=this;this._addClass("ui-controlgroup ui-controlgroup-"+this.options.direction),"horizontal"===this.options.direction&&this._addClass(null,"ui-helper-clearfix"),this._initWidgets(),e=this.childWidgets,this.options.onlyVisible&&(e=e.filter(":visible")),e.length&&(t.each(["first","last"],function(t,s){var n=e[s]().data("ui-controlgroup-data");if(n&&i["_"+n.widgetName+"Options"]){var o=i["_"+n.widgetName+"Options"](1===e.length?"only":s);o.classes=i._resolveClassesValues(o.classes,n),n.element[n.widgetName](o)}else i._updateCornerClass(e[s](),s)}),this._callChildMethod("refresh"))}}),t.widget("ui.checkboxradio",[t.ui.formResetMixin,{version:"1.12.0",options:{disabled:null,label:null,icon:!0,classes:{"ui-checkboxradio-label":"ui-corner-all","ui-checkboxradio-icon":"ui-corner-all"}},_getCreateOptions:function(){var e,i,s=this,n=this._super()||{};return this._readType(),i=this.element.labels(),this.label=t(i[i.length-1]),this.label.length||t.error("No label found for checkboxradio widget"),this.originalLabel="",this.label.contents().not(this.element).each(function(){s.originalLabel+=3===this.nodeType?t(this).text():this.outerHTML}),this.originalLabel&&(n.label=this.originalLabel),e=this.element[0].disabled,null!=e&&(n.disabled=e),n},_create:function(){var t=this.element[0].checked;this._bindFormResetHandler(),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled),this._setOption("disabled",this.options.disabled),this._addClass("ui-checkboxradio","ui-helper-hidden-accessible"),this._addClass(this.label,"ui-checkboxradio-label","ui-button ui-widget"),"radio"===this.type&&this._addClass(this.label,"ui-checkboxradio-radio-label"),this.options.label&&this.options.label!==this.originalLabel?this._updateLabel():this.originalLabel&&(this.options.label=this.originalLabel),this._enhance(),t&&(this._addClass(this.label,"ui-checkboxradio-checked","ui-state-active"),this.icon&&this._addClass(this.icon,null,"ui-state-hover")),this._on({change:"_toggleClasses",focus:function(){this._addClass(this.label,null,"ui-state-focus ui-visual-focus")},blur:function(){this._removeClass(this.label,null,"ui-state-focus ui-visual-focus")}})},_readType:function(){var e=this.element[0].nodeName.toLowerCase();this.type=this.element[0].type,"input"===e&&/radio|checkbox/.test(this.type)||t.error("Can't create checkboxradio on element.nodeName="+e+" and element.type="+this.type)},_enhance:function(){this._updateIcon(this.element[0].checked)},widget:function(){return this.label},_getRadioGroup:function(){var e,i=this.element[0].name,s="input[name='"+t.ui.escapeSelector(i)+"']";return i?(e=this.form.length?t(this.form[0].elements).filter(s):t(s).filter(function(){return 0===t(this).form().length}),e.not(this.element)):t([])},_toggleClasses:function(){var e=this.element[0].checked;this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",e),this.options.icon&&"checkbox"===this.type&&this._toggleClass(this.icon,null,"ui-icon-check ui-state-checked",e)._toggleClass(this.icon,null,"ui-icon-blank",!e),"radio"===this.type&&this._getRadioGroup().each(function(){var e=t(this).checkboxradio("instance");e&&e._removeClass(e.label,"ui-checkboxradio-checked","ui-state-active")})},_destroy:function(){this._unbindFormResetHandler(),this.icon&&(this.icon.remove(),this.iconSpace.remove())},_setOption:function(t,e){return"label"!==t||e?(this._super(t,e),"disabled"===t?(this._toggleClass(this.label,null,"ui-state-disabled",e),this.element[0].disabled=e,void 0):(this.refresh(),void 0)):void 0},_updateIcon:function(e){var i="ui-icon ui-icon-background ";this.options.icon?(this.icon||(this.icon=t("<span>"),this.iconSpace=t("<span> </span>"),this._addClass(this.iconSpace,"ui-checkboxradio-icon-space")),"checkbox"===this.type?(i+=e?"ui-icon-check ui-state-checked":"ui-icon-blank",this._removeClass(this.icon,null,e?"ui-icon-blank":"ui-icon-check")):i+="ui-icon-blank",this._addClass(this.icon,"ui-checkboxradio-icon",i),e||this._removeClass(this.icon,null,"ui-icon-check ui-state-checked"),this.icon.prependTo(this.label).after(this.iconSpace)):void 0!==this.icon&&(this.icon.remove(),this.iconSpace.remove(),delete this.icon)},_updateLabel:function(){this.label.contents().not(this.element.add(this.icon).add(this.iconSpace)).remove(),this.label.append(this.options.label)},refresh:function(){var t=this.element[0].checked,e=this.element[0].disabled;this._updateIcon(t),this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",t),null!==this.options.label&&this._updateLabel(),e!==this.options.disabled&&this._setOptions({disabled:e})}}]),t.ui.checkboxradio,t.widget("ui.button",{version:"1.12.0",defaultElement:"<button>",options:{classes:{"ui-button":"ui-corner-all"},disabled:null,icon:null,iconPosition:"beginning",label:null,showLabel:!0},_getCreateOptions:function(){var t,e=this._super()||{};return this.isInput=this.element.is("input"),t=this.element[0].disabled,null!=t&&(e.disabled=t),this.originalLabel=this.isInput?this.element.val():this.element.html(),this.originalLabel&&(e.label=this.originalLabel),e},_create:function(){!this.option.showLabel&!this.options.icon&&(this.options.showLabel=!0),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled||!1),this.hasTitle=!!this.element.attr("title"),this.options.label&&this.options.label!==this.originalLabel&&(this.isInput?this.element.val(this.options.label):this.element.html(this.options.label)),this._addClass("ui-button","ui-widget"),this._setOption("disabled",this.options.disabled),this._enhance(),this.element.is("a")&&this._on({keyup:function(e){e.keyCode===t.ui.keyCode.SPACE&&(e.preventDefault(),this.element[0].click?this.element[0].click():this.element.trigger("click"))}})},_enhance:function(){this.element.is("button")||this.element.attr("role","button"),this.options.icon&&(this._updateIcon("icon",this.options.icon),this._updateTooltip())},_updateTooltip:function(){this.title=this.element.attr("title"),this.options.showLabel||this.title||this.element.attr("title",this.options.label)},_updateIcon:function(e,i){var s="iconPosition"!==e,n=s?this.options.iconPosition:i,o="top"===n||"bottom"===n;this.icon?s&&this._removeClass(this.icon,null,this.options.icon):(this.icon=t("<span>"),this._addClass(this.icon,"ui-button-icon","ui-icon"),this.options.showLabel||this._addClass("ui-button-icon-only")),s&&this._addClass(this.icon,null,i),this._attachIcon(n),o?(this._addClass(this.icon,null,"ui-widget-icon-block"),this.iconSpace&&this.iconSpace.remove()):(this.iconSpace||(this.iconSpace=t("<span> </span>"),this._addClass(this.iconSpace,"ui-button-icon-space")),this._removeClass(this.icon,null,"ui-wiget-icon-block"),this._attachIconSpace(n))},_destroy:function(){this.element.removeAttr("role"),this.icon&&this.icon.remove(),this.iconSpace&&this.iconSpace.remove(),this.hasTitle||this.element.removeAttr("title")},_attachIconSpace:function(t){this.icon[/^(?:end|bottom)/.test(t)?"before":"after"](this.iconSpace)},_attachIcon:function(t){this.element[/^(?:end|bottom)/.test(t)?"append":"prepend"](this.icon)},_setOptions:function(t){var e=void 0===t.showLabel?this.options.showLabel:t.showLabel,i=void 0===t.icon?this.options.icon:t.icon;e||i||(t.showLabel=!0),this._super(t)},_setOption:function(t,e){"icon"===t&&(e?this._updateIcon(t,e):this.icon&&(this.icon.remove(),this.iconSpace&&this.iconSpace.remove())),"iconPosition"===t&&this._updateIcon(t,e),"showLabel"===t&&(this._toggleClass("ui-button-icon-only",null,!e),this._updateTooltip()),"label"===t&&(this.isInput?this.element.val(e):(this.element.html(e),this.icon&&(this._attachIcon(this.options.iconPosition),this._attachIconSpace(this.options.iconPosition)))),this._super(t,e),"disabled"===t&&(this._toggleClass(null,"ui-state-disabled",e),this.element[0].disabled=e,e&&this.element.blur())},refresh:function(){var t=this.element.is("input, button")?this.element[0].disabled:this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOptions({disabled:t}),this._updateTooltip()}}),t.uiBackCompat!==!1&&(t.widget("ui.button",t.ui.button,{options:{text:!0,icons:{primary:null,secondary:null}},_create:function(){this.options.showLabel&&!this.options.text&&(this.options.showLabel=this.options.text),!this.options.showLabel&&this.options.text&&(this.options.text=this.options.showLabel),this.options.icon||!this.options.icons.primary&&!this.options.icons.secondary?this.options.icon&&(this.options.icons.primary=this.options.icon):this.options.icons.primary?this.options.icon=this.options.icons.primary:(this.options.icon=this.options.icons.secondary,this.options.iconPosition="end"),this._super()},_setOption:function(t,e){return"text"===t?(this._super("showLabel",e),void 0):("showLabel"===t&&(this.options.text=e),"icon"===t&&(this.options.icons.primary=e),"icons"===t&&(e.primary?(this._super("icon",e.primary),this._super("iconPosition","beginning")):e.secondary&&(this._super("icon",e.secondary),this._super("iconPosition","end"))),this._superApply(arguments),void 0)}}),t.fn.button=function(e){return function(){return!this.length||this.length&&"INPUT"!==this[0].tagName||this.length&&"INPUT"===this[0].tagName&&"checkbox"!==this.attr("type")&&"radio"!==this.attr("type")?e.apply(this,arguments):(t.ui.checkboxradio||t.error("Checkboxradio widget missing"),0===arguments.length?this.checkboxradio({icon:!1}):this.checkboxradio.apply(this,arguments))}}(t.fn.button),t.fn.buttonset=function(){return t.ui.controlgroup||t.error("Controlgroup widget missing"),"option"===arguments[0]&&"items"===arguments[1]&&arguments[2]?this.controlgroup.apply(this,[arguments[0],"items.button",arguments[2]]):"option"===arguments[0]&&"items"===arguments[1]?this.controlgroup.apply(this,[arguments[0],"items.button"]):("object"==typeof arguments[0]&&arguments[0].items&&(arguments[0].items={button:arguments[0].items}),this.controlgroup.apply(this,arguments))}),t.ui.button,t.extend(t.ui,{datepicker:{version:"1.12.0"}});var m;t.extend(s.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(t){return a(this._defaults,t||{}),this},_attachDatepicker:function(e,i){var s,n,o;s=e.nodeName.toLowerCase(),n="div"===s||"span"===s,e.id||(this.uuid+=1,e.id="dp"+this.uuid),o=this._newInst(t(e),n),o.settings=t.extend({},i||{}),"input"===s?this._connectDatepicker(e,o):n&&this._inlineDatepicker(e,o)},_newInst:function(e,i){var s=e[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:s,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?n(t("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(e,i){var s=t(e);i.append=t([]),i.trigger=t([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).on("keydown",this._doKeyDown).on("keypress",this._doKeyPress).on("keyup",this._doKeyUp),this._autoSize(i),t.data(e,"datepicker",i),i.settings.disabled&&this._disableDatepicker(e))},_attachments:function(e,i){var s,n,o,a=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),a&&(i.append=t("<span class='"+this._appendClass+"'>"+a+"</span>"),e[r?"before":"after"](i.append)),e.off("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&e.on("focus",this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),o=this._get(i,"buttonImage"),i.trigger=t(this._get(i,"buttonImageOnly")?t("<img/>").addClass(this._triggerClass).attr({src:o,alt:n,title:n}):t("<button type='button'></button>").addClass(this._triggerClass).html(o?t("<img/>").attr({src:o,alt:n,title:n}):n)),e[r?"before":"after"](i.trigger),i.trigger.on("click",function(){return t.datepicker._datepickerShowing&&t.datepicker._lastInput===e[0]?t.datepicker._hideDatepicker():t.datepicker._datepickerShowing&&t.datepicker._lastInput!==e[0]?(t.datepicker._hideDatepicker(),t.datepicker._showDatepicker(e[0])):t.datepicker._showDatepicker(e[0]),!1}))},_autoSize:function(t){if(this._get(t,"autoSize")&&!t.inline){var e,i,s,n,o=new Date(2009,11,20),a=this._get(t,"dateFormat");a.match(/[DM]/)&&(e=function(t){for(i=0,s=0,n=0;t.length>n;n++)t[n].length>i&&(i=t[n].length,s=n);return s},o.setMonth(e(this._get(t,a.match(/MM/)?"monthNames":"monthNamesShort"))),o.setDate(e(this._get(t,a.match(/DD/)?"dayNames":"dayNamesShort"))+20-o.getDay())),t.input.attr("size",this._formatDate(t,o).length)}},_inlineDatepicker:function(e,i){var s=t(e);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),t.data(e,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(e),i.dpDiv.css("display","block"))},_dialogDatepicker:function(e,i,s,n,o){var r,h,l,c,u,d=this._dialogInst;return d||(this.uuid+=1,r="dp"+this.uuid,this._dialogInput=t("<input type='text' id='"+r+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.on("keydown",this._doKeyDown),t("body").append(this._dialogInput),d=this._dialogInst=this._newInst(this._dialogInput,!1),d.settings={},t.data(this._dialogInput[0],"datepicker",d)),a(d.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(d,i):i,this._dialogInput.val(i),this._pos=o?o.length?o:[o.pageX,o.pageY]:null,this._pos||(h=document.documentElement.clientWidth,l=document.documentElement.clientHeight,c=document.documentElement.scrollLeft||document.body.scrollLeft,u=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[h/2-100+c,l/2-150+u]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),d.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),t.blockUI&&t.blockUI(this.dpDiv),t.data(this._dialogInput[0],"datepicker",d),this},_destroyDatepicker:function(e){var i,s=t(e),n=t.data(e,"datepicker");s.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),t.removeData(e,"datepicker"),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).off("focus",this._showDatepicker).off("keydown",this._doKeyDown).off("keypress",this._doKeyPress).off("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty(),m===n&&(m=null))},_enableDatepicker:function(e){var i,s,n=t(e),o=t.data(e,"datepicker");n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!1,o.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}))},_disableDatepicker:function(e){var i,s,n=t(e),o=t.data(e,"datepicker");n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!0,o.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}),this._disabledInputs[this._disabledInputs.length]=e)},_isDisabledDatepicker:function(t){if(!t)return!1;for(var e=0;this._disabledInputs.length>e;e++)if(this._disabledInputs[e]===t)return!0;return!1},_getInst:function(e){try{return t.data(e,"datepicker")}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(e,i,s){var n,o,r,h,l=this._getInst(e);return 2===arguments.length&&"string"==typeof i?"defaults"===i?t.extend({},t.datepicker._defaults):l?"all"===i?t.extend({},l.settings):this._get(l,i):null:(n=i||{},"string"==typeof i&&(n={},n[i]=s),l&&(this._curInst===l&&this._hideDatepicker(),o=this._getDateDatepicker(e,!0),r=this._getMinMaxDate(l,"min"),h=this._getMinMaxDate(l,"max"),a(l.settings,n),null!==r&&void 0!==n.dateFormat&&void 0===n.minDate&&(l.settings.minDate=this._formatDate(l,r)),null!==h&&void 0!==n.dateFormat&&void 0===n.maxDate&&(l.settings.maxDate=this._formatDate(l,h)),"disabled"in n&&(n.disabled?this._disableDatepicker(e):this._enableDatepicker(e)),this._attachments(t(e),l),this._autoSize(l),this._setDate(l,o),this._updateAlternate(l),this._updateDatepicker(l)),void 0)},_changeDatepicker:function(t,e,i){this._optionDatepicker(t,e,i)},_refreshDatepicker:function(t){var e=this._getInst(t);e&&this._updateDatepicker(e)},_setDateDatepicker:function(t,e){var i=this._getInst(t);i&&(this._setDate(i,e),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(t,e){var i=this._getInst(t);return i&&!i.inline&&this._setDateFromField(i,e),i?this._getDate(i):null},_doKeyDown:function(e){var i,s,n,o=t.datepicker._getInst(e.target),a=!0,r=o.dpDiv.is(".ui-datepicker-rtl");if(o._keyEvent=!0,t.datepicker._datepickerShowing)switch(e.keyCode){case 9:t.datepicker._hideDatepicker(),a=!1;break;case 13:return n=t("td."+t.datepicker._dayOverClass+":not(."+t.datepicker._currentClass+")",o.dpDiv),n[0]&&t.datepicker._selectDay(e.target,o.selectedMonth,o.selectedYear,n[0]),i=t.datepicker._get(o,"onSelect"),i?(s=t.datepicker._formatDate(o),i.apply(o.input?o.input[0]:null,[s,o])):t.datepicker._hideDatepicker(),!1;case 27:t.datepicker._hideDatepicker();break;case 33:t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 34:t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&t.datepicker._clearDate(e.target),a=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&t.datepicker._gotoToday(e.target),a=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?1:-1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,-7,"D"),a=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?-1:1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,7,"D"),a=e.ctrlKey||e.metaKey;break;default:a=!1}else 36===e.keyCode&&e.ctrlKey?t.datepicker._showDatepicker(this):a=!1;a&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(e){var i,s,n=t.datepicker._getInst(e.target);return t.datepicker._get(n,"constrainInput")?(i=t.datepicker._possibleChars(t.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),e.ctrlKey||e.metaKey||" ">s||!i||i.indexOf(s)>-1):void 0},_doKeyUp:function(e){var i,s=t.datepicker._getInst(e.target);if(s.input.val()!==s.lastVal)try{i=t.datepicker.parseDate(t.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,t.datepicker._getFormatConfig(s)),i&&(t.datepicker._setDateFromField(s),t.datepicker._updateAlternate(s),t.datepicker._updateDatepicker(s))}catch(n){}return!0},_showDatepicker:function(e){if(e=e.target||e,"input"!==e.nodeName.toLowerCase()&&(e=t("input",e.parentNode)[0]),!t.datepicker._isDisabledDatepicker(e)&&t.datepicker._lastInput!==e){var s,n,o,r,h,l,c;s=t.datepicker._getInst(e),t.datepicker._curInst&&t.datepicker._curInst!==s&&(t.datepicker._curInst.dpDiv.stop(!0,!0),s&&t.datepicker._datepickerShowing&&t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),n=t.datepicker._get(s,"beforeShow"),o=n?n.apply(e,[e,s]):{},o!==!1&&(a(s.settings,o),s.lastVal=null,t.datepicker._lastInput=e,t.datepicker._setDateFromField(s),t.datepicker._inDialog&&(e.value=""),t.datepicker._pos||(t.datepicker._pos=t.datepicker._findPos(e),t.datepicker._pos[1]+=e.offsetHeight),r=!1,t(e).parents().each(function(){return r|="fixed"===t(this).css("position"),!r}),h={left:t.datepicker._pos[0],top:t.datepicker._pos[1]},t.datepicker._pos=null,s.dpDiv.empty(),s.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),t.datepicker._updateDatepicker(s),h=t.datepicker._checkOffset(s,h,r),s.dpDiv.css({position:t.datepicker._inDialog&&t.blockUI?"static":r?"fixed":"absolute",display:"none",left:h.left+"px",top:h.top+"px"}),s.inline||(l=t.datepicker._get(s,"showAnim"),c=t.datepicker._get(s,"duration"),s.dpDiv.css("z-index",i(t(e))+1),t.datepicker._datepickerShowing=!0,t.effects&&t.effects.effect[l]?s.dpDiv.show(l,t.datepicker._get(s,"showOptions"),c):s.dpDiv[l||"show"](l?c:null),t.datepicker._shouldFocusInput(s)&&s.input.trigger("focus"),t.datepicker._curInst=s))
}},_updateDatepicker:function(e){this.maxRows=4,m=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e);var i,s=this._getNumberOfMonths(e),n=s[1],a=17,r=e.dpDiv.find("."+this._dayOverClass+" a");r.length>0&&o.apply(r.get(0)),e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),n>1&&e.dpDiv.addClass("ui-datepicker-multi-"+n).css("width",a*n+"em"),e.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e===t.datepicker._curInst&&t.datepicker._datepickerShowing&&t.datepicker._shouldFocusInput(e)&&e.input.trigger("focus"),e.yearshtml&&(i=e.yearshtml,setTimeout(function(){i===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),i=e.yearshtml=null},0))},_shouldFocusInput:function(t){return t.input&&t.input.is(":visible")&&!t.input.is(":disabled")&&!t.input.is(":focus")},_checkOffset:function(e,i,s){var n=e.dpDiv.outerWidth(),o=e.dpDiv.outerHeight(),a=e.input?e.input.outerWidth():0,r=e.input?e.input.outerHeight():0,h=document.documentElement.clientWidth+(s?0:t(document).scrollLeft()),l=document.documentElement.clientHeight+(s?0:t(document).scrollTop());return i.left-=this._get(e,"isRTL")?n-a:0,i.left-=s&&i.left===e.input.offset().left?t(document).scrollLeft():0,i.top-=s&&i.top===e.input.offset().top+r?t(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>h&&h>n?Math.abs(i.left+n-h):0),i.top-=Math.min(i.top,i.top+o>l&&l>o?Math.abs(o+r):0),i},_findPos:function(e){for(var i,s=this._getInst(e),n=this._get(s,"isRTL");e&&("hidden"===e.type||1!==e.nodeType||t.expr.filters.hidden(e));)e=e[n?"previousSibling":"nextSibling"];return i=t(e).offset(),[i.left,i.top]},_hideDatepicker:function(e){var i,s,n,o,a=this._curInst;!a||e&&a!==t.data(e,"datepicker")||this._datepickerShowing&&(i=this._get(a,"showAnim"),s=this._get(a,"duration"),n=function(){t.datepicker._tidyDialog(a)},t.effects&&(t.effects.effect[i]||t.effects[i])?a.dpDiv.hide(i,t.datepicker._get(a,"showOptions"),s,n):a.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,o=this._get(a,"onClose"),o&&o.apply(a.input?a.input[0]:null,[a.input?a.input.val():"",a]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),t.blockUI&&(t.unblockUI(),t("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(t){t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(t.datepicker._curInst){var i=t(e.target),s=t.datepicker._getInst(i[0]);(i[0].id!==t.datepicker._mainDivId&&0===i.parents("#"+t.datepicker._mainDivId).length&&!i.hasClass(t.datepicker.markerClassName)&&!i.closest("."+t.datepicker._triggerClass).length&&t.datepicker._datepickerShowing&&(!t.datepicker._inDialog||!t.blockUI)||i.hasClass(t.datepicker.markerClassName)&&t.datepicker._curInst!==s)&&t.datepicker._hideDatepicker()}},_adjustDate:function(e,i,s){var n=t(e),o=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(o,i+("M"===s?this._get(o,"showCurrentAtPos"):0),s),this._updateDatepicker(o))},_gotoToday:function(e){var i,s=t(e),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},_selectMonthYear:function(e,i,s){var n=t(e),o=this._getInst(n[0]);o["selected"+("M"===s?"Month":"Year")]=o["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(o),this._adjustDate(n)},_selectDay:function(e,i,s,n){var o,a=t(e);t(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(a[0])||(o=this._getInst(a[0]),o.selectedDay=o.currentDay=t("a",n).html(),o.selectedMonth=o.currentMonth=i,o.selectedYear=o.currentYear=s,this._selectDate(e,this._formatDate(o,o.currentDay,o.currentMonth,o.currentYear)))},_clearDate:function(e){var i=t(e);this._selectDate(i,"")},_selectDate:function(e,i){var s,n=t(e),o=this._getInst(n[0]);i=null!=i?i:this._formatDate(o),o.input&&o.input.val(i),this._updateAlternate(o),s=this._get(o,"onSelect"),s?s.apply(o.input?o.input[0]:null,[i,o]):o.input&&o.input.trigger("change"),o.inline?this._updateDatepicker(o):(this._hideDatepicker(),this._lastInput=o.input[0],"object"!=typeof o.input[0]&&o.input.trigger("focus"),this._lastInput=null)},_updateAlternate:function(e){var i,s,n,o=this._get(e,"altField");o&&(i=this._get(e,"altFormat")||this._get(e,"dateFormat"),s=this._getDate(e),n=this.formatDate(i,s,this._getFormatConfig(e)),t(o).val(n))},noWeekends:function(t){var e=t.getDay();return[e>0&&6>e,""]},iso8601Week:function(t){var e,i=new Date(t.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),e=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((e-i)/864e5)/7)+1},parseDate:function(e,i,s){if(null==e||null==i)throw"Invalid arguments";if(i="object"==typeof i?""+i:i+"",""===i)return null;var n,o,a,r,h=0,l=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,c="string"!=typeof l?l:(new Date).getFullYear()%100+parseInt(l,10),u=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,d=(s?s.dayNames:null)||this._defaults.dayNames,p=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,f=(s?s.monthNames:null)||this._defaults.monthNames,g=-1,m=-1,_=-1,v=-1,b=!1,y=function(t){var i=e.length>n+1&&e.charAt(n+1)===t;return i&&n++,i},w=function(t){var e=y(t),s="@"===t?14:"!"===t?20:"y"===t&&e?4:"o"===t?3:2,n="y"===t?s:1,o=RegExp("^\\d{"+n+","+s+"}"),a=i.substring(h).match(o);if(!a)throw"Missing number at position "+h;return h+=a[0].length,parseInt(a[0],10)},k=function(e,s,n){var o=-1,a=t.map(y(e)?n:s,function(t,e){return[[e,t]]}).sort(function(t,e){return-(t[1].length-e[1].length)});if(t.each(a,function(t,e){var s=e[1];return i.substr(h,s.length).toLowerCase()===s.toLowerCase()?(o=e[0],h+=s.length,!1):void 0}),-1!==o)return o+1;throw"Unknown name at position "+h},x=function(){if(i.charAt(h)!==e.charAt(n))throw"Unexpected literal at position "+h;h++};for(n=0;e.length>n;n++)if(b)"'"!==e.charAt(n)||y("'")?x():b=!1;else switch(e.charAt(n)){case"d":_=w("d");break;case"D":k("D",u,d);break;case"o":v=w("o");break;case"m":m=w("m");break;case"M":m=k("M",p,f);break;case"y":g=w("y");break;case"@":r=new Date(w("@")),g=r.getFullYear(),m=r.getMonth()+1,_=r.getDate();break;case"!":r=new Date((w("!")-this._ticksTo1970)/1e4),g=r.getFullYear(),m=r.getMonth()+1,_=r.getDate();break;case"'":y("'")?x():b=!0;break;default:x()}if(i.length>h&&(a=i.substr(h),!/^\s+/.test(a)))throw"Extra/unparsed characters found in date: "+a;if(-1===g?g=(new Date).getFullYear():100>g&&(g+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c>=g?0:-100)),v>-1)for(m=1,_=v;;){if(o=this._getDaysInMonth(g,m-1),o>=_)break;m++,_-=o}if(r=this._daylightSavingAdjust(new Date(g,m-1,_)),r.getFullYear()!==g||r.getMonth()+1!==m||r.getDate()!==_)throw"Invalid date";return r},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(t,e,i){if(!e)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,o=(i?i.dayNames:null)||this._defaults.dayNames,a=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,h=function(e){var i=t.length>s+1&&t.charAt(s+1)===e;return i&&s++,i},l=function(t,e,i){var s=""+e;if(h(t))for(;i>s.length;)s="0"+s;return s},c=function(t,e,i,s){return h(t)?s[e]:i[e]},u="",d=!1;if(e)for(s=0;t.length>s;s++)if(d)"'"!==t.charAt(s)||h("'")?u+=t.charAt(s):d=!1;else switch(t.charAt(s)){case"d":u+=l("d",e.getDate(),2);break;case"D":u+=c("D",e.getDay(),n,o);break;case"o":u+=l("o",Math.round((new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5),3);break;case"m":u+=l("m",e.getMonth()+1,2);break;case"M":u+=c("M",e.getMonth(),a,r);break;case"y":u+=h("y")?e.getFullYear():(10>e.getFullYear()%100?"0":"")+e.getFullYear()%100;break;case"@":u+=e.getTime();break;case"!":u+=1e4*e.getTime()+this._ticksTo1970;break;case"'":h("'")?u+="'":d=!0;break;default:u+=t.charAt(s)}return u},_possibleChars:function(t){var e,i="",s=!1,n=function(i){var s=t.length>e+1&&t.charAt(e+1)===i;return s&&e++,s};for(e=0;t.length>e;e++)if(s)"'"!==t.charAt(e)||n("'")?i+=t.charAt(e):s=!1;else switch(t.charAt(e)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":n("'")?i+="'":s=!0;break;default:i+=t.charAt(e)}return i},_get:function(t,e){return void 0!==t.settings[e]?t.settings[e]:this._defaults[e]},_setDateFromField:function(t,e){if(t.input.val()!==t.lastVal){var i=this._get(t,"dateFormat"),s=t.lastVal=t.input?t.input.val():null,n=this._getDefaultDate(t),o=n,a=this._getFormatConfig(t);try{o=this.parseDate(i,s,a)||n}catch(r){s=e?"":s}t.selectedDay=o.getDate(),t.drawMonth=t.selectedMonth=o.getMonth(),t.drawYear=t.selectedYear=o.getFullYear(),t.currentDay=s?o.getDate():0,t.currentMonth=s?o.getMonth():0,t.currentYear=s?o.getFullYear():0,this._adjustInstDate(t)}},_getDefaultDate:function(t){return this._restrictMinMax(t,this._determineDate(t,this._get(t,"defaultDate"),new Date))},_determineDate:function(e,i,s){var n=function(t){var e=new Date;return e.setDate(e.getDate()+t),e},o=function(i){try{return t.datepicker.parseDate(t.datepicker._get(e,"dateFormat"),i,t.datepicker._getFormatConfig(e))}catch(s){}for(var n=(i.toLowerCase().match(/^c/)?t.datepicker._getDate(e):null)||new Date,o=n.getFullYear(),a=n.getMonth(),r=n.getDate(),h=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=h.exec(i);l;){switch(l[2]||"d"){case"d":case"D":r+=parseInt(l[1],10);break;case"w":case"W":r+=7*parseInt(l[1],10);break;case"m":case"M":a+=parseInt(l[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a));break;case"y":case"Y":o+=parseInt(l[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a))}l=h.exec(i)}return new Date(o,a,r)},a=null==i||""===i?s:"string"==typeof i?o(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return a=a&&"Invalid Date"==""+a?s:a,a&&(a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)),this._daylightSavingAdjust(a)},_daylightSavingAdjust:function(t){return t?(t.setHours(t.getHours()>12?t.getHours()+2:0),t):null},_setDate:function(t,e,i){var s=!e,n=t.selectedMonth,o=t.selectedYear,a=this._restrictMinMax(t,this._determineDate(t,e,new Date));t.selectedDay=t.currentDay=a.getDate(),t.drawMonth=t.selectedMonth=t.currentMonth=a.getMonth(),t.drawYear=t.selectedYear=t.currentYear=a.getFullYear(),n===t.selectedMonth&&o===t.selectedYear||i||this._notifyChange(t),this._adjustInstDate(t),t.input&&t.input.val(s?"":this._formatDate(t))},_getDate:function(t){var e=!t.currentYear||t.input&&""===t.input.val()?null:this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return e},_attachHandlers:function(e){var i=this._get(e,"stepMonths"),s="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){t.datepicker._adjustDate(s,-i,"M")},next:function(){t.datepicker._adjustDate(s,+i,"M")},hide:function(){t.datepicker._hideDatepicker()},today:function(){t.datepicker._gotoToday(s)},selectDay:function(){return t.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return t.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return t.datepicker._selectMonthYear(s,this,"Y"),!1}};t(this).on(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(t){var e,i,s,n,o,a,r,h,l,c,u,d,p,f,g,m,_,v,b,y,w,k,x,C,D,I,T,P,M,S,H,z,O,A,N,W,E,F,R,L=new Date,B=this._daylightSavingAdjust(new Date(L.getFullYear(),L.getMonth(),L.getDate())),Y=this._get(t,"isRTL"),j=this._get(t,"showButtonPanel"),q=this._get(t,"hideIfNoPrevNext"),K=this._get(t,"navigationAsDateFormat"),U=this._getNumberOfMonths(t),V=this._get(t,"showCurrentAtPos"),X=this._get(t,"stepMonths"),$=1!==U[0]||1!==U[1],G=this._daylightSavingAdjust(t.currentDay?new Date(t.currentYear,t.currentMonth,t.currentDay):new Date(9999,9,9)),Q=this._getMinMaxDate(t,"min"),J=this._getMinMaxDate(t,"max"),Z=t.drawMonth-V,te=t.drawYear;if(0>Z&&(Z+=12,te--),J)for(e=this._daylightSavingAdjust(new Date(J.getFullYear(),J.getMonth()-U[0]*U[1]+1,J.getDate())),e=Q&&Q>e?Q:e;this._daylightSavingAdjust(new Date(te,Z,1))>e;)Z--,0>Z&&(Z=11,te--);for(t.drawMonth=Z,t.drawYear=te,i=this._get(t,"prevText"),i=K?this.formatDate(i,this._daylightSavingAdjust(new Date(te,Z-X,1)),this._getFormatConfig(t)):i,s=this._canAdjustMonth(t,-1,te,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>":q?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>",n=this._get(t,"nextText"),n=K?this.formatDate(n,this._daylightSavingAdjust(new Date(te,Z+X,1)),this._getFormatConfig(t)):n,o=this._canAdjustMonth(t,1,te,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>":q?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>",a=this._get(t,"currentText"),r=this._get(t,"gotoCurrent")&&t.currentDay?G:B,a=K?this.formatDate(a,r,this._getFormatConfig(t)):a,h=t.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(t,"closeText")+"</button>",l=j?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(Y?h:"")+(this._isInRange(t,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+a+"</button>":"")+(Y?"":h)+"</div>":"",c=parseInt(this._get(t,"firstDay"),10),c=isNaN(c)?0:c,u=this._get(t,"showWeek"),d=this._get(t,"dayNames"),p=this._get(t,"dayNamesMin"),f=this._get(t,"monthNames"),g=this._get(t,"monthNamesShort"),m=this._get(t,"beforeShowDay"),_=this._get(t,"showOtherMonths"),v=this._get(t,"selectOtherMonths"),b=this._getDefaultDate(t),y="",k=0;U[0]>k;k++){for(x="",this.maxRows=4,C=0;U[1]>C;C++){if(D=this._daylightSavingAdjust(new Date(te,Z,t.selectedDay)),I=" ui-corner-all",T="",$){if(T+="<div class='ui-datepicker-group",U[1]>1)switch(C){case 0:T+=" ui-datepicker-group-first",I=" ui-corner-"+(Y?"right":"left");break;case U[1]-1:T+=" ui-datepicker-group-last",I=" ui-corner-"+(Y?"left":"right");break;default:T+=" ui-datepicker-group-middle",I=""}T+="'>"}for(T+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+I+"'>"+(/all|left/.test(I)&&0===k?Y?o:s:"")+(/all|right/.test(I)&&0===k?Y?s:o:"")+this._generateMonthYearHeader(t,Z,te,Q,J,k>0||C>0,f,g)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",P=u?"<th class='ui-datepicker-week-col'>"+this._get(t,"weekHeader")+"</th>":"",w=0;7>w;w++)M=(w+c)%7,P+="<th scope='col'"+((w+c+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+d[M]+"'>"+p[M]+"</span></th>";for(T+=P+"</tr></thead><tbody>",S=this._getDaysInMonth(te,Z),te===t.selectedYear&&Z===t.selectedMonth&&(t.selectedDay=Math.min(t.selectedDay,S)),H=(this._getFirstDayOfMonth(te,Z)-c+7)%7,z=Math.ceil((H+S)/7),O=$?this.maxRows>z?this.maxRows:z:z,this.maxRows=O,A=this._daylightSavingAdjust(new Date(te,Z,1-H)),N=0;O>N;N++){for(T+="<tr>",W=u?"<td class='ui-datepicker-week-col'>"+this._get(t,"calculateWeek")(A)+"</td>":"",w=0;7>w;w++)E=m?m.apply(t.input?t.input[0]:null,[A]):[!0,""],F=A.getMonth()!==Z,R=F&&!v||!E[0]||Q&&Q>A||J&&A>J,W+="<td class='"+((w+c+6)%7>=5?" ui-datepicker-week-end":"")+(F?" ui-datepicker-other-month":"")+(A.getTime()===D.getTime()&&Z===t.selectedMonth&&t._keyEvent||b.getTime()===A.getTime()&&b.getTime()===D.getTime()?" "+this._dayOverClass:"")+(R?" "+this._unselectableClass+" ui-state-disabled":"")+(F&&!_?"":" "+E[1]+(A.getTime()===G.getTime()?" "+this._currentClass:"")+(A.getTime()===B.getTime()?" ui-datepicker-today":""))+"'"+(F&&!_||!E[2]?"":" title='"+E[2].replace(/'/g,"&#39;")+"'")+(R?"":" data-handler='selectDay' data-event='click' data-month='"+A.getMonth()+"' data-year='"+A.getFullYear()+"'")+">"+(F&&!_?"&#xa0;":R?"<span class='ui-state-default'>"+A.getDate()+"</span>":"<a class='ui-state-default"+(A.getTime()===B.getTime()?" ui-state-highlight":"")+(A.getTime()===G.getTime()?" ui-state-active":"")+(F?" ui-priority-secondary":"")+"' href='#'>"+A.getDate()+"</a>")+"</td>",A.setDate(A.getDate()+1),A=this._daylightSavingAdjust(A);T+=W+"</tr>"}Z++,Z>11&&(Z=0,te++),T+="</tbody></table>"+($?"</div>"+(U[0]>0&&C===U[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),x+=T}y+=x}return y+=l,t._keyEvent=!1,y},_generateMonthYearHeader:function(t,e,i,s,n,o,a,r){var h,l,c,u,d,p,f,g,m=this._get(t,"changeMonth"),_=this._get(t,"changeYear"),v=this._get(t,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",y="";if(o||!m)y+="<span class='ui-datepicker-month'>"+a[e]+"</span>";else{for(h=s&&s.getFullYear()===i,l=n&&n.getFullYear()===i,y+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",c=0;12>c;c++)(!h||c>=s.getMonth())&&(!l||n.getMonth()>=c)&&(y+="<option value='"+c+"'"+(c===e?" selected='selected'":"")+">"+r[c]+"</option>");y+="</select>"}if(v||(b+=y+(!o&&m&&_?"":"&#xa0;")),!t.yearshtml)if(t.yearshtml="",o||!_)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(u=this._get(t,"yearRange").split(":"),d=(new Date).getFullYear(),p=function(t){var e=t.match(/c[+\-].*/)?i+parseInt(t.substring(1),10):t.match(/[+\-].*/)?d+parseInt(t,10):parseInt(t,10);return isNaN(e)?d:e},f=p(u[0]),g=Math.max(f,p(u[1]||"")),f=s?Math.max(f,s.getFullYear()):f,g=n?Math.min(g,n.getFullYear()):g,t.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";g>=f;f++)t.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";t.yearshtml+="</select>",b+=t.yearshtml,t.yearshtml=null}return b+=this._get(t,"yearSuffix"),v&&(b+=(!o&&m&&_?"":"&#xa0;")+y),b+="</div>"},_adjustInstDate:function(t,e,i){var s=t.selectedYear+("Y"===i?e:0),n=t.selectedMonth+("M"===i?e:0),o=Math.min(t.selectedDay,this._getDaysInMonth(s,n))+("D"===i?e:0),a=this._restrictMinMax(t,this._daylightSavingAdjust(new Date(s,n,o)));t.selectedDay=a.getDate(),t.drawMonth=t.selectedMonth=a.getMonth(),t.drawYear=t.selectedYear=a.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(t)},_restrictMinMax:function(t,e){var i=this._getMinMaxDate(t,"min"),s=this._getMinMaxDate(t,"max"),n=i&&i>e?i:e;return s&&n>s?s:n},_notifyChange:function(t){var e=this._get(t,"onChangeMonthYear");e&&e.apply(t.input?t.input[0]:null,[t.selectedYear,t.selectedMonth+1,t])},_getNumberOfMonths:function(t){var e=this._get(t,"numberOfMonths");return null==e?[1,1]:"number"==typeof e?[1,e]:e},_getMinMaxDate:function(t,e){return this._determineDate(t,this._get(t,e+"Date"),null)},_getDaysInMonth:function(t,e){return 32-this._daylightSavingAdjust(new Date(t,e,32)).getDate()},_getFirstDayOfMonth:function(t,e){return new Date(t,e,1).getDay()},_canAdjustMonth:function(t,e,i,s){var n=this._getNumberOfMonths(t),o=this._daylightSavingAdjust(new Date(i,s+(0>e?e:n[0]*n[1]),1));return 0>e&&o.setDate(this._getDaysInMonth(o.getFullYear(),o.getMonth())),this._isInRange(t,o)},_isInRange:function(t,e){var i,s,n=this._getMinMaxDate(t,"min"),o=this._getMinMaxDate(t,"max"),a=null,r=null,h=this._get(t,"yearRange");return h&&(i=h.split(":"),s=(new Date).getFullYear(),a=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(a+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||e.getTime()>=n.getTime())&&(!o||e.getTime()<=o.getTime())&&(!a||e.getFullYear()>=a)&&(!r||r>=e.getFullYear())},_getFormatConfig:function(t){var e=this._get(t,"shortYearCutoff");return e="string"!=typeof e?e:(new Date).getFullYear()%100+parseInt(e,10),{shortYearCutoff:e,dayNamesShort:this._get(t,"dayNamesShort"),dayNames:this._get(t,"dayNames"),monthNamesShort:this._get(t,"monthNamesShort"),monthNames:this._get(t,"monthNames")}},_formatDate:function(t,e,i,s){e||(t.currentDay=t.selectedDay,t.currentMonth=t.selectedMonth,t.currentYear=t.selectedYear);var n=e?"object"==typeof e?e:this._daylightSavingAdjust(new Date(s,i,e)):this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return this.formatDate(this._get(t,"dateFormat"),n,this._getFormatConfig(t))}}),t.fn.datepicker=function(e){if(!this.length)return this;t.datepicker.initialized||(t(document).on("mousedown",t.datepicker._checkExternalClick),t.datepicker.initialized=!0),0===t("#"+t.datepicker._mainDivId).length&&t("body").append(t.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof e||"isDisabled"!==e&&"getDate"!==e&&"widget"!==e?"option"===e&&2===arguments.length&&"string"==typeof arguments[1]?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof e?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this].concat(i)):t.datepicker._attachDatepicker(this,e)}):t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i))},t.datepicker=new s,t.datepicker.initialized=!1,t.datepicker.uuid=(new Date).getTime(),t.datepicker.version="1.12.0",t.datepicker,t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());var _=!1;t(document).on("mouseup",function(){_=!1}),t.widget("ui.mouse",{version:"1.12.0",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.on("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).on("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(e){if(!_){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(e),this._mouseDownEvent=e;var i=this,s=1===e.which,n="string"==typeof this.options.cancel&&e.target.nodeName?t(e.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(e)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(e)!==!1,!this._mouseStarted)?(e.preventDefault(),!0):(!0===t.data(e.target,this.widgetName+".preventClickEvent")&&t.removeData(e.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return i._mouseMove(t)},this._mouseUpDelegate=function(t){return i._mouseUp(t)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),e.preventDefault(),_=!0,!0)):!0}},_mouseMove:function(e){if(this._mouseMoved){if(t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button)return this._mouseUp(e);if(!e.which)if(e.originalEvent.altKey||e.originalEvent.ctrlKey||e.originalEvent.metaKey||e.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(e)}return(e.which||e.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,_=!1,e.preventDefault()},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),t.ui.plugin={add:function(e,i,s){var n,o=t.ui[e].prototype;for(n in s)o.plugins[n]=o.plugins[n]||[],o.plugins[n].push([i,s[n]])},call:function(t,e,i,s){var n,o=t.plugins[e];if(o&&(s||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(n=0;o.length>n;n++)t.options[o[n][0]]&&o[n][1].apply(t.element,i)}},t.ui.safeBlur=function(e){e&&"body"!==e.nodeName.toLowerCase()&&t(e).trigger("blur")},t.widget("ui.draggable",t.ui.mouse,{version:"1.12.0",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this._addClass("ui-draggable"),this._setHandleClassName(),this._mouseInit()},_setOption:function(t,e){this._super(t,e),"handle"===t&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(e){var i=this.options;return this._blurActiveElement(e),this.helper||i.disabled||t(e.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(e),this.handle?(this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(e){this.iframeBlocks=this.document.find(e).map(function(){var e=t(this);return t("<div>").css("position","absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(e){var i=t.ui.safeActiveElement(this.document[0]),s=t(e.target);this._getHandle(e)&&s.closest(i).length||t.ui.safeBlur(i)},_mouseStart:function(e){var i=this.options;return this.helper=this._createHelper(e),this._addClass(this.helper,"ui-draggable-dragging"),this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===t(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(e),this.originalPosition=this.position=this._generatePosition(e,!1),this.originalPageX=e.pageX,this.originalPageY=e.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",e)===!1?(this._clear(),!1):(this._cacheHelperProportions(),t.ui.ddmanager&&!i.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._mouseDrag(e,!0),t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0)},_refreshOffsets:function(t){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:t.pageX-this.offset.left,top:t.pageY-this.offset.top}},_mouseDrag:function(e,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(e,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",e,s)===!1)return this._mouseUp(new t.Event("mouseup",e)),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1},_mouseStop:function(e){var i=this,s=!1;return t.ui.ddmanager&&!this.options.dropBehaviour&&(s=t.ui.ddmanager.drop(this,e)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",e)!==!1&&i._clear()}):this._trigger("stop",e)!==!1&&this._clear(),!1},_mouseUp:function(e){return this._unblockFrames(),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),this.handleElement.is(e.target)&&this.element.trigger("focus"),t.ui.mouse.prototype._mouseUp.call(this,e)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp(new t.Event("mouseup",{target:this.element[0]})):this._clear(),this},_getHandle:function(e){return this.options.handle?!!t(e.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this._addClass(this.handleElement,"ui-draggable-handle")},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper),n=s?t(i.helper.apply(this.element[0],[e])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_isRootNode:function(t){return/(html|body)/i.test(t.tagName)||t===this.document[0]},_getParentOffset:function(){var e=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.element.position(),e=this._isRootNode(this.scrollParent[0]);return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+(e?0:this.scrollParent.scrollTop()),left:t.left-(parseInt(this.helper.css("left"),10)||0)+(e?0:this.scrollParent.scrollLeft())}
},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options,o=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,t(o).width()-this.helperProportions.width-this.margins.left,(t(o).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=t(n.containment),s=i[0],s&&(e=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(e?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)},_convertPositionTo:function(t,e){e||(e=this.position);var i="absolute"===t?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:e.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:e.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(t,e){var i,s,n,o,a=this.options,r=this._isRootNode(this.scrollParent[0]),h=t.pageX,l=t.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),e&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,t.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),a.grid&&(n=a.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/a.grid[1])*a.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-a.grid[1]:n+a.grid[1]:n,o=a.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/a.grid[0])*a.grid[0]:this.originalPageX,h=i?o-this.offset.click.left>=i[0]||o-this.offset.click.left>i[2]?o:o-this.offset.click.left>=i[0]?o-a.grid[0]:o+a.grid[0]:o),"y"===a.axis&&(h=this.originalPageX),"x"===a.axis&&(l=this.originalPageY)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_trigger:function(e,i,s){return s=s||this._uiHash(),t.ui.plugin.call(this,e,[i,s,this],!0),/^(drag|start|stop)/.test(e)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),t.Widget.prototype._trigger.call(this,e,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),t.ui.plugin.add("draggable","connectToSortable",{start:function(e,i,s){var n=t.extend({},i,{item:s.element});s.sortables=[],t(s.options.connectToSortable).each(function(){var i=t(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",e,n))})},stop:function(e,i,s){var n=t.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,t.each(s.sortables,function(){var t=this;t.isOver?(t.isOver=0,s.cancelHelperRemoval=!0,t.cancelHelperRemoval=!1,t._storedCSS={position:t.placeholder.css("position"),top:t.placeholder.css("top"),left:t.placeholder.css("left")},t._mouseStop(e),t.options.helper=t.options._helper):(t.cancelHelperRemoval=!0,t._trigger("deactivate",e,n))})},drag:function(e,i,s){t.each(s.sortables,function(){var n=!1,o=this;o.positionAbs=s.positionAbs,o.helperProportions=s.helperProportions,o.offset.click=s.offset.click,o._intersectsWith(o.containerCache)&&(n=!0,t.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==o&&this._intersectsWith(this.containerCache)&&t.contains(o.element[0],this.element[0])&&(n=!1),n})),n?(o.isOver||(o.isOver=1,s._parent=i.helper.parent(),o.currentItem=i.helper.appendTo(o.element).data("ui-sortable-item",!0),o.options._helper=o.options.helper,o.options.helper=function(){return i.helper[0]},e.target=o.currentItem[0],o._mouseCapture(e,!0),o._mouseStart(e,!0,!0),o.offset.click.top=s.offset.click.top,o.offset.click.left=s.offset.click.left,o.offset.parent.left-=s.offset.parent.left-o.offset.parent.left,o.offset.parent.top-=s.offset.parent.top-o.offset.parent.top,s._trigger("toSortable",e),s.dropped=o.element,t.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,o.fromOutside=s),o.currentItem&&(o._mouseDrag(e),i.position=o.position)):o.isOver&&(o.isOver=0,o.cancelHelperRemoval=!0,o.options._revert=o.options.revert,o.options.revert=!1,o._trigger("out",e,o._uiHash(o)),o._mouseStop(e,!0),o.options.revert=o.options._revert,o.options.helper=o.options._helper,o.placeholder&&o.placeholder.remove(),i.helper.appendTo(s._parent),s._refreshOffsets(e),i.position=s._generatePosition(e,!0),s._trigger("fromSortable",e),s.dropped=!1,t.each(s.sortables,function(){this.refreshPositions()}))})}}),t.ui.plugin.add("draggable","cursor",{start:function(e,i,s){var n=t("body"),o=s.options;n.css("cursor")&&(o._cursor=n.css("cursor")),n.css("cursor",o.cursor)},stop:function(e,i,s){var n=s.options;n._cursor&&t("body").css("cursor",n._cursor)}}),t.ui.plugin.add("draggable","opacity",{start:function(e,i,s){var n=t(i.helper),o=s.options;n.css("opacity")&&(o._opacity=n.css("opacity")),n.css("opacity",o.opacity)},stop:function(e,i,s){var n=s.options;n._opacity&&t(i.helper).css("opacity",n._opacity)}}),t.ui.plugin.add("draggable","scroll",{start:function(t,e,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(e,i,s){var n=s.options,o=!1,a=s.scrollParentNotHidden[0],r=s.document[0];a!==r&&"HTML"!==a.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+a.offsetHeight-e.pageY<n.scrollSensitivity?a.scrollTop=o=a.scrollTop+n.scrollSpeed:e.pageY-s.overflowOffset.top<n.scrollSensitivity&&(a.scrollTop=o=a.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+a.offsetWidth-e.pageX<n.scrollSensitivity?a.scrollLeft=o=a.scrollLeft+n.scrollSpeed:e.pageX-s.overflowOffset.left<n.scrollSensitivity&&(a.scrollLeft=o=a.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(e.pageY-t(r).scrollTop()<n.scrollSensitivity?o=t(r).scrollTop(t(r).scrollTop()-n.scrollSpeed):t(window).height()-(e.pageY-t(r).scrollTop())<n.scrollSensitivity&&(o=t(r).scrollTop(t(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(e.pageX-t(r).scrollLeft()<n.scrollSensitivity?o=t(r).scrollLeft(t(r).scrollLeft()-n.scrollSpeed):t(window).width()-(e.pageX-t(r).scrollLeft())<n.scrollSensitivity&&(o=t(r).scrollLeft(t(r).scrollLeft()+n.scrollSpeed)))),o!==!1&&t.ui.ddmanager&&!n.dropBehaviour&&t.ui.ddmanager.prepareOffsets(s,e)}}),t.ui.plugin.add("draggable","snap",{start:function(e,i,s){var n=s.options;s.snapElements=[],t(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var e=t(this),i=e.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:e.outerWidth(),height:e.outerHeight(),top:i.top,left:i.left})})},drag:function(e,i,s){var n,o,a,r,h,l,c,u,d,p,f=s.options,g=f.snapTolerance,m=i.offset.left,_=m+s.helperProportions.width,v=i.offset.top,b=v+s.helperProportions.height;for(d=s.snapElements.length-1;d>=0;d--)h=s.snapElements[d].left-s.margins.left,l=h+s.snapElements[d].width,c=s.snapElements[d].top-s.margins.top,u=c+s.snapElements[d].height,h-g>_||m>l+g||c-g>b||v>u+g||!t.contains(s.snapElements[d].item.ownerDocument,s.snapElements[d].item)?(s.snapElements[d].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,e,t.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=!1):("inner"!==f.snapMode&&(n=g>=Math.abs(c-b),o=g>=Math.abs(u-v),a=g>=Math.abs(h-_),r=g>=Math.abs(l-m),n&&(i.position.top=s._convertPositionTo("relative",{top:c-s.helperProportions.height,left:0}).top),o&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left)),p=n||o||a||r,"outer"!==f.snapMode&&(n=g>=Math.abs(c-v),o=g>=Math.abs(u-b),a=g>=Math.abs(h-m),r=g>=Math.abs(l-_),n&&(i.position.top=s._convertPositionTo("relative",{top:c,left:0}).top),o&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left)),!s.snapElements[d].snapping&&(n||o||a||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,e,t.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=n||o||a||r||p)}}),t.ui.plugin.add("draggable","stack",{start:function(e,i,s){var n,o=s.options,a=t.makeArray(t(o.stack)).sort(function(e,i){return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(i).css("zIndex"),10)||0)});a.length&&(n=parseInt(t(a[0]).css("zIndex"),10)||0,t(a).each(function(e){t(this).css("zIndex",n+e)}),this.css("zIndex",n+a.length))}}),t.ui.plugin.add("draggable","zIndex",{start:function(e,i,s){var n=t(i.helper),o=s.options;n.css("zIndex")&&(o._zIndex=n.css("zIndex")),n.css("zIndex",o.zIndex)},stop:function(e,i,s){var n=s.options;n._zIndex&&t(i.helper).css("zIndex",n._zIndex)}}),t.ui.draggable,t.widget("ui.resizable",t.ui.mouse,{version:"1.12.0",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,classes:{"ui-resizable-se":"ui-icon ui-icon-gripsmall-diagonal-se"},containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(t){return parseFloat(t)||0},_isNumber:function(t){return!isNaN(parseFloat(t))},_hasScroll:function(e,i){if("hidden"===t(e).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",n=!1;return e[s]>0?!0:(e[s]=1,n=e[s]>0,e[s]=0,n)},_create:function(){var e,i=this.options,s=this;this._addClass("ui-resizable"),t.extend(this,{_aspectRatio:!!i.aspectRatio,aspectRatio:i.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:i.helper||i.ghost||i.animate?i.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,e={marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom"),marginLeft:this.originalElement.css("marginLeft")},this.element.css(e),this.originalElement.css("margin",0),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css(e),this._proportionallyResize()),this._setupHandles(),i.autoHide&&t(this.element).on("mouseenter",function(){i.disabled||(s._removeClass("ui-resizable-autohide"),s._handles.show())}).on("mouseleave",function(){i.disabled||s.resizing||(s._addClass("ui-resizable-autohide"),s._handles.hide())}),this._mouseInit()},_destroy:function(){this._mouseDestroy();var e,i=function(e){t(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),e=this.element,this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")}).insertAfter(e),e.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_setOption:function(t,e){switch(this._super(t,e),t){case"handles":this._removeHandles(),this._setupHandles();break;default:}},_setupHandles:function(){var e,i,s,n,o,a=this.options,r=this;if(this.handles=a.handles||(t(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=t(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),s=this.handles.split(","),this.handles={},i=0;s.length>i;i++)e=t.trim(s[i]),n="ui-resizable-"+e,o=t("<div>"),this._addClass(o,"ui-resizable-handle "+n),o.css({zIndex:a.zIndex}),this.handles[e]=".ui-resizable-"+e,this.element.append(o);this._renderAxis=function(e){var i,s,n,o;e=e||this.element;for(i in this.handles)this.handles[i].constructor===String?this.handles[i]=this.element.children(this.handles[i]).first().show():(this.handles[i].jquery||this.handles[i].nodeType)&&(this.handles[i]=t(this.handles[i]),this._on(this.handles[i],{mousedown:r._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(s=t(this.handles[i],this.element),o=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),e.css(n,o),this._proportionallyResize()),this._handles=this._handles.add(this.handles[i])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.on("mouseover",function(){r.resizing||(this.className&&(o=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),r.axis=o&&o[1]?o[1]:"se")}),a.autoHide&&(this._handles.hide(),this._addClass("ui-resizable-autohide"))},_removeHandles:function(){this._handles.remove()},_mouseCapture:function(e){var i,s,n=!1;for(i in this.handles)s=t(this.handles[i])[0],(s===e.target||t.contains(s,e.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(e){var i,s,n,o=this.options,a=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),s=this._num(this.helper.css("top")),o.containment&&(i+=t(o.containment).scrollLeft()||0,s+=t(o.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:a.width(),height:a.height()},this.originalSize=this._helper?{width:a.outerWidth(),height:a.outerHeight()}:{width:a.width(),height:a.height()},this.sizeDiff={width:a.outerWidth()-a.width(),height:a.outerHeight()-a.height()},this.originalPosition={left:i,top:s},this.originalMousePosition={left:e.pageX,top:e.pageY},this.aspectRatio="number"==typeof o.aspectRatio?o.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=t(".ui-resizable-"+this.axis).css("cursor"),t("body").css("cursor","auto"===n?this.axis+"-resize":n),this._addClass("ui-resizable-resizing"),this._propagate("start",e),!0},_mouseDrag:function(e){var i,s,n=this.originalMousePosition,o=this.axis,a=e.pageX-n.left||0,r=e.pageY-n.top||0,h=this._change[o];return this._updatePrevProperties(),h?(i=h.apply(this,[e,a,r]),this._updateVirtualBoundaries(e.shiftKey),(this._aspectRatio||e.shiftKey)&&(i=this._updateRatio(i,e)),i=this._respectSize(i,e),this._updateCache(i),this._propagate("resize",e),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),t.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",e,this.ui()),this._applyChanges()),!1):!1},_mouseStop:function(e){this.resizing=!1;var i,s,n,o,a,r,h,l=this.options,c=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&this._hasScroll(i[0],"left")?0:c.sizeDiff.height,o=s?0:c.sizeDiff.width,a={width:c.helper.width()-o,height:c.helper.height()-n},r=parseFloat(c.element.css("left"))+(c.position.left-c.originalPosition.left)||null,h=parseFloat(c.element.css("top"))+(c.position.top-c.originalPosition.top)||null,l.animate||this.element.css(t.extend(a,{top:h,left:r})),c.helper.height(c.size.height),c.helper.width(c.size.width),this._helper&&!l.animate&&this._proportionallyResize()),t("body").css("cursor","auto"),this._removeClass("ui-resizable-resizing"),this._propagate("stop",e),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var t={};return this.position.top!==this.prevPosition.top&&(t.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(t.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(t.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(t.height=this.size.height+"px"),this.helper.css(t),t},_updateVirtualBoundaries:function(t){var e,i,s,n,o,a=this.options;o={minWidth:this._isNumber(a.minWidth)?a.minWidth:0,maxWidth:this._isNumber(a.maxWidth)?a.maxWidth:1/0,minHeight:this._isNumber(a.minHeight)?a.minHeight:0,maxHeight:this._isNumber(a.maxHeight)?a.maxHeight:1/0},(this._aspectRatio||t)&&(e=o.minHeight*this.aspectRatio,s=o.minWidth/this.aspectRatio,i=o.maxHeight*this.aspectRatio,n=o.maxWidth/this.aspectRatio,e>o.minWidth&&(o.minWidth=e),s>o.minHeight&&(o.minHeight=s),o.maxWidth>i&&(o.maxWidth=i),o.maxHeight>n&&(o.maxHeight=n)),this._vBoundaries=o},_updateCache:function(t){this.offset=this.helper.offset(),this._isNumber(t.left)&&(this.position.left=t.left),this._isNumber(t.top)&&(this.position.top=t.top),this._isNumber(t.height)&&(this.size.height=t.height),this._isNumber(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var e=this.position,i=this.size,s=this.axis;return this._isNumber(t.height)?t.width=t.height*this.aspectRatio:this._isNumber(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===s&&(t.left=e.left+(i.width-t.width),t.top=null),"nw"===s&&(t.top=e.top+(i.height-t.height),t.left=e.left+(i.width-t.width)),t},_respectSize:function(t){var e=this._vBoundaries,i=this.axis,s=this._isNumber(t.width)&&e.maxWidth&&e.maxWidth<t.width,n=this._isNumber(t.height)&&e.maxHeight&&e.maxHeight<t.height,o=this._isNumber(t.width)&&e.minWidth&&e.minWidth>t.width,a=this._isNumber(t.height)&&e.minHeight&&e.minHeight>t.height,r=this.originalPosition.left+this.originalSize.width,h=this.originalPosition.top+this.originalSize.height,l=/sw|nw|w/.test(i),c=/nw|ne|n/.test(i);return o&&(t.width=e.minWidth),a&&(t.height=e.minHeight),s&&(t.width=e.maxWidth),n&&(t.height=e.maxHeight),o&&l&&(t.left=r-e.minWidth),s&&l&&(t.left=r-e.maxWidth),a&&c&&(t.top=h-e.minHeight),n&&c&&(t.top=h-e.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_getPaddingPlusBorderDimensions:function(t){for(var e=0,i=[],s=[t.css("borderTopWidth"),t.css("borderRightWidth"),t.css("borderBottomWidth"),t.css("borderLeftWidth")],n=[t.css("paddingTop"),t.css("paddingRight"),t.css("paddingBottom"),t.css("paddingLeft")];4>e;e++)i[e]=parseFloat(s[e])||0,i[e]+=parseFloat(n[e])||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var t,e=0,i=this.helper||this.element;this._proportionallyResizeElements.length>e;e++)t=this._proportionallyResizeElements[e],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(t)),t.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var e=this.element,i=this.options;this.elementOffset=e.offset(),this._helper?(this.helper=this.helper||t("<div style='overflow:hidden;'></div>"),this._addClass(this.helper,this._helper),this.helper.css({width:this.element.outerWidth(),height:this.element.outerHeight(),position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,e){return{width:this.originalSize.width+e}},w:function(t,e){var i=this.originalSize,s=this.originalPosition;return{left:s.left+e,width:i.width-e}},n:function(t,e,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(t,e,i){return{height:this.originalSize.height+i}},se:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},sw:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[e,i,s]))},ne:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},nw:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[e,i,s]))}},_propagate:function(e,i){t.ui.plugin.call(this,e,[i,this.ui()]),"resize"!==e&&this._trigger(e,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),t.ui.plugin.add("resizable","animate",{stop:function(e){var i=t(this).resizable("instance"),s=i.options,n=i._proportionallyResizeElements,o=n.length&&/textarea/i.test(n[0].nodeName),a=o&&i._hasScroll(n[0],"left")?0:i.sizeDiff.height,r=o?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-a},l=parseFloat(i.element.css("left"))+(i.position.left-i.originalPosition.left)||null,c=parseFloat(i.element.css("top"))+(i.position.top-i.originalPosition.top)||null;i.element.animate(t.extend(h,c&&l?{top:c,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseFloat(i.element.css("width")),height:parseFloat(i.element.css("height")),top:parseFloat(i.element.css("top")),left:parseFloat(i.element.css("left"))};n&&n.length&&t(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",e)}})}}),t.ui.plugin.add("resizable","containment",{start:function(){var e,i,s,n,o,a,r,h=t(this).resizable("instance"),l=h.options,c=h.element,u=l.containment,d=u instanceof t?u.get(0):/parent/.test(u)?c.parent().get(0):u;d&&(h.containerElement=t(d),/document/.test(u)||u===document?(h.containerOffset={left:0,top:0},h.containerPosition={left:0,top:0},h.parentData={element:t(document),left:0,top:0,width:t(document).width(),height:t(document).height()||document.body.parentNode.scrollHeight}):(e=t(d),i=[],t(["Top","Right","Left","Bottom"]).each(function(t,s){i[t]=h._num(e.css("padding"+s))}),h.containerOffset=e.offset(),h.containerPosition=e.position(),h.containerSize={height:e.innerHeight()-i[3],width:e.innerWidth()-i[1]},s=h.containerOffset,n=h.containerSize.height,o=h.containerSize.width,a=h._hasScroll(d,"left")?d.scrollWidth:o,r=h._hasScroll(d)?d.scrollHeight:n,h.parentData={element:d,left:s.left,top:s.top,width:a,height:r}))},resize:function(e){var i,s,n,o,a=t(this).resizable("instance"),r=a.options,h=a.containerOffset,l=a.position,c=a._aspectRatio||e.shiftKey,u={top:0,left:0},d=a.containerElement,p=!0;d[0]!==document&&/static/.test(d.css("position"))&&(u=h),l.left<(a._helper?h.left:0)&&(a.size.width=a.size.width+(a._helper?a.position.left-h.left:a.position.left-u.left),c&&(a.size.height=a.size.width/a.aspectRatio,p=!1),a.position.left=r.helper?h.left:0),l.top<(a._helper?h.top:0)&&(a.size.height=a.size.height+(a._helper?a.position.top-h.top:a.position.top),c&&(a.size.width=a.size.height*a.aspectRatio,p=!1),a.position.top=a._helper?h.top:0),n=a.containerElement.get(0)===a.element.parent().get(0),o=/relative|absolute/.test(a.containerElement.css("position")),n&&o?(a.offset.left=a.parentData.left+a.position.left,a.offset.top=a.parentData.top+a.position.top):(a.offset.left=a.element.offset().left,a.offset.top=a.element.offset().top),i=Math.abs(a.sizeDiff.width+(a._helper?a.offset.left-u.left:a.offset.left-h.left)),s=Math.abs(a.sizeDiff.height+(a._helper?a.offset.top-u.top:a.offset.top-h.top)),i+a.size.width>=a.parentData.width&&(a.size.width=a.parentData.width-i,c&&(a.size.height=a.size.width/a.aspectRatio,p=!1)),s+a.size.height>=a.parentData.height&&(a.size.height=a.parentData.height-s,c&&(a.size.width=a.size.height*a.aspectRatio,p=!1)),p||(a.position.left=a.prevPosition.left,a.position.top=a.prevPosition.top,a.size.width=a.prevSize.width,a.size.height=a.prevSize.height)},stop:function(){var e=t(this).resizable("instance"),i=e.options,s=e.containerOffset,n=e.containerPosition,o=e.containerElement,a=t(e.helper),r=a.offset(),h=a.outerWidth()-e.sizeDiff.width,l=a.outerHeight()-e.sizeDiff.height;e._helper&&!i.animate&&/relative/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:h,height:l}),e._helper&&!i.animate&&/static/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:h,height:l})}}),t.ui.plugin.add("resizable","alsoResize",{start:function(){var e=t(this).resizable("instance"),i=e.options;t(i.alsoResize).each(function(){var e=t(this);e.data("ui-resizable-alsoresize",{width:parseFloat(e.width()),height:parseFloat(e.height()),left:parseFloat(e.css("left")),top:parseFloat(e.css("top"))})})},resize:function(e,i){var s=t(this).resizable("instance"),n=s.options,o=s.originalSize,a=s.originalPosition,r={height:s.size.height-o.height||0,width:s.size.width-o.width||0,top:s.position.top-a.top||0,left:s.position.left-a.left||0};t(n.alsoResize).each(function(){var e=t(this),s=t(this).data("ui-resizable-alsoresize"),n={},o=e.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];t.each(o,function(t,e){var i=(s[e]||0)+(r[e]||0);i&&i>=0&&(n[e]=i||null)}),e.css(n)})},stop:function(){t(this).removeData("ui-resizable-alsoresize")}}),t.ui.plugin.add("resizable","ghost",{start:function(){var e=t(this).resizable("instance"),i=e.size;e.ghost=e.originalElement.clone(),e.ghost.css({opacity:.25,display:"block",position:"relative",height:i.height,width:i.width,margin:0,left:0,top:0}),e._addClass(e.ghost,"ui-resizable-ghost"),t.uiBackCompat!==!1&&"string"==typeof e.options.ghost&&e.ghost.addClass(this.options.ghost),e.ghost.appendTo(e.helper)},resize:function(){var e=t(this).resizable("instance");e.ghost&&e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})},stop:function(){var e=t(this).resizable("instance");e.ghost&&e.helper&&e.helper.get(0).removeChild(e.ghost.get(0))}}),t.ui.plugin.add("resizable","grid",{resize:function(){var e,i=t(this).resizable("instance"),s=i.options,n=i.size,o=i.originalSize,a=i.originalPosition,r=i.axis,h="number"==typeof s.grid?[s.grid,s.grid]:s.grid,l=h[0]||1,c=h[1]||1,u=Math.round((n.width-o.width)/l)*l,d=Math.round((n.height-o.height)/c)*c,p=o.width+u,f=o.height+d,g=s.maxWidth&&p>s.maxWidth,m=s.maxHeight&&f>s.maxHeight,_=s.minWidth&&s.minWidth>p,v=s.minHeight&&s.minHeight>f;s.grid=h,_&&(p+=l),v&&(f+=c),g&&(p-=l),m&&(f-=c),/^(se|s|e)$/.test(r)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.top=a.top-d):/^(sw)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.left=a.left-u):((0>=f-c||0>=p-l)&&(e=i._getPaddingPlusBorderDimensions(this)),f-c>0?(i.size.height=f,i.position.top=a.top-d):(f=c-e.height,i.size.height=f,i.position.top=a.top+o.height-f),p-l>0?(i.size.width=p,i.position.left=a.left-u):(p=l-e.width,i.size.width=p,i.position.left=a.left+o.width-p))}}),t.ui.resizable,t.widget("ui.dialog",{version:"1.12.0",options:{appendTo:"body",autoOpen:!0,buttons:[],classes:{"ui-dialog":"ui-corner-all","ui-dialog-titlebar":"ui-corner-all"},closeOnEscape:!0,closeText:"Close",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(e){var i=t(this).css(e).offset().top;0>i&&t(this).css("top",e.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),null==this.options.title&&null!=this.originalTitle&&(this.options.title=this.originalTitle),this.options.disabled&&(this.options.disabled=!1),this._createWrapper(),this.element.show().removeAttr("title").appendTo(this.uiDialog),this._addClass("ui-dialog-content","ui-widget-content"),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&t.fn.draggable&&this._makeDraggable(),this.options.resizable&&t.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var e=this.options.appendTo;return e&&(e.jquery||e.nodeType)?t(e):this.document.find(e||"body").eq(0)},_destroy:function(){var t,e=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().css(this.originalCss).detach(),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),t=e.parent.children().eq(e.index),t.length&&t[0]!==this.element[0]?t.before(this.element):e.parent.append(this.element)},widget:function(){return this.uiDialog
},disable:t.noop,enable:t.noop,close:function(e){var i=this;this._isOpen&&this._trigger("beforeClose",e)!==!1&&(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),this.opener.filter(":focusable").trigger("focus").length||t.ui.safeBlur(t.ui.safeActiveElement(this.document[0])),this._hide(this.uiDialog,this.options.hide,function(){i._trigger("close",e)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(e,i){var s=!1,n=this.uiDialog.siblings(".ui-front:visible").map(function(){return+t(this).css("z-index")}).get(),o=Math.max.apply(null,n);return o>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",o+1),s=!0),s&&!i&&this._trigger("focus",e),s},open:function(){var e=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),void 0):(this._isOpen=!0,this.opener=t(t.ui.safeActiveElement(this.document[0])),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){e._focusTabbable(),e._trigger("focus")}),this._makeFocusTarget(),this._trigger("open"),void 0)},_focusTabbable:function(){var t=this._focusedElement;t||(t=this.element.find("[autofocus]")),t.length||(t=this.element.find(":tabbable")),t.length||(t=this.uiDialogButtonPane.find(":tabbable")),t.length||(t=this.uiDialogTitlebarClose.filter(":tabbable")),t.length||(t=this.uiDialog),t.eq(0).trigger("focus")},_keepFocus:function(e){function i(){var e=t.ui.safeActiveElement(this.document[0]),i=this.uiDialog[0]===e||t.contains(this.uiDialog[0],e);i||this._focusTabbable()}e.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=t("<div>").hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._addClass(this.uiDialog,"ui-dialog","ui-widget ui-widget-content ui-front"),this._on(this.uiDialog,{keydown:function(e){if(this.options.closeOnEscape&&!e.isDefaultPrevented()&&e.keyCode&&e.keyCode===t.ui.keyCode.ESCAPE)return e.preventDefault(),this.close(e),void 0;if(e.keyCode===t.ui.keyCode.TAB&&!e.isDefaultPrevented()){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");e.target!==n[0]&&e.target!==this.uiDialog[0]||e.shiftKey?e.target!==s[0]&&e.target!==this.uiDialog[0]||!e.shiftKey||(this._delay(function(){n.trigger("focus")}),e.preventDefault()):(this._delay(function(){s.trigger("focus")}),e.preventDefault())}},mousedown:function(t){this._moveToTop(t)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var e;this.uiDialogTitlebar=t("<div>"),this._addClass(this.uiDialogTitlebar,"ui-dialog-titlebar","ui-widget-header ui-helper-clearfix"),this._on(this.uiDialogTitlebar,{mousedown:function(e){t(e.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.trigger("focus")}}),this.uiDialogTitlebarClose=t("<button type='button'></button>").button({label:t("<a>").text(this.options.closeText).html(),icon:"ui-icon-closethick",showLabel:!1}).appendTo(this.uiDialogTitlebar),this._addClass(this.uiDialogTitlebarClose,"ui-dialog-titlebar-close"),this._on(this.uiDialogTitlebarClose,{click:function(t){t.preventDefault(),this.close(t)}}),e=t("<span>").uniqueId().prependTo(this.uiDialogTitlebar),this._addClass(e,"ui-dialog-title"),this._title(e),this.uiDialogTitlebar.prependTo(this.uiDialog),this.uiDialog.attr({"aria-labelledby":e.attr("id")})},_title:function(t){this.options.title?t.text(this.options.title):t.html("&#160;")},_createButtonPane:function(){this.uiDialogButtonPane=t("<div>"),this._addClass(this.uiDialogButtonPane,"ui-dialog-buttonpane","ui-widget-content ui-helper-clearfix"),this.uiButtonSet=t("<div>").appendTo(this.uiDialogButtonPane),this._addClass(this.uiButtonSet,"ui-dialog-buttonset"),this._createButtons()},_createButtons:function(){var e=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),t.isEmptyObject(i)||t.isArray(i)&&!i.length?(this._removeClass(this.uiDialog,"ui-dialog-buttons"),void 0):(t.each(i,function(i,s){var n,o;s=t.isFunction(s)?{click:s,text:i}:s,s=t.extend({type:"button"},s),n=s.click,o={icon:s.icon,iconPosition:s.iconPosition,showLabel:s.showLabel},delete s.click,delete s.icon,delete s.iconPosition,delete s.showLabel,t("<button></button>",s).button(o).appendTo(e.uiButtonSet).on("click",function(){n.apply(e.element[0],arguments)})}),this._addClass(this.uiDialog,"ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),void 0)},_makeDraggable:function(){function e(t){return{position:t.position,offset:t.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,n){i._addClass(t(this),"ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,e(n))},drag:function(t,s){i._trigger("drag",t,e(s))},stop:function(n,o){var a=o.offset.left-i.document.scrollLeft(),r=o.offset.top-i.document.scrollTop();s.position={my:"left top",at:"left"+(a>=0?"+":"")+a+" "+"top"+(r>=0?"+":"")+r,of:i.window},i._removeClass(t(this),"ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,e(o))}})},_makeResizable:function(){function e(t){return{originalPosition:t.originalPosition,originalSize:t.originalSize,position:t.position,size:t.size}}var i=this,s=this.options,n=s.resizable,o=this.uiDialog.css("position"),a="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:a,start:function(s,n){i._addClass(t(this),"ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,e(n))},resize:function(t,s){i._trigger("resize",t,e(s))},stop:function(n,o){var a=i.uiDialog.offset(),r=a.left-i.document.scrollLeft(),h=a.top-i.document.scrollTop();s.height=i.uiDialog.height(),s.width=i.uiDialog.width(),s.position={my:"left top",at:"left"+(r>=0?"+":"")+r+" "+"top"+(h>=0?"+":"")+h,of:i.window},i._removeClass(t(this),"ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,e(o))}}).css("position",o)},_trackFocus:function(){this._on(this.widget(),{focusin:function(e){this._makeFocusTarget(),this._focusedElement=t(e.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var e=this._trackingInstances(),i=t.inArray(this,e);-1!==i&&e.splice(i,1)},_trackingInstances:function(){var t=this.document.data("ui-dialog-instances");return t||(t=[],this.document.data("ui-dialog-instances",t)),t},_minHeight:function(){var t=this.options;return"auto"===t.height?t.minHeight:Math.min(t.minHeight,t.height)},_position:function(){var t=this.uiDialog.is(":visible");t||this.uiDialog.show(),this.uiDialog.position(this.options.position),t||this.uiDialog.hide()},_setOptions:function(e){var i=this,s=!1,n={};t.each(e,function(t,e){i._setOption(t,e),t in i.sizeRelatedOptions&&(s=!0),t in i.resizableRelatedOptions&&(n[t]=e)}),s&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",n)},_setOption:function(e,i){var s,n,o=this.uiDialog;"disabled"!==e&&(this._super(e,i),"appendTo"===e&&this.uiDialog.appendTo(this._appendTo()),"buttons"===e&&this._createButtons(),"closeText"===e&&this.uiDialogTitlebarClose.button({label:t("<a>").text(""+this.options.closeText).html()}),"draggable"===e&&(s=o.is(":data(ui-draggable)"),s&&!i&&o.draggable("destroy"),!s&&i&&this._makeDraggable()),"position"===e&&this._position(),"resizable"===e&&(n=o.is(":data(ui-resizable)"),n&&!i&&o.resizable("destroy"),n&&"string"==typeof i&&o.resizable("option","handles",i),n||i===!1||this._makeResizable()),"title"===e&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var t,e,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),t=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),e=Math.max(0,s.minHeight-t),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-t):"none","auto"===s.height?this.element.css({minHeight:e,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-t)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var e=t(this);return t("<div>").css({position:"absolute",width:e.outerWidth(),height:e.outerHeight()}).appendTo(e.parent()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(e){return t(e.target).closest(".ui-dialog").length?!0:!!t(e.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var e=!0;this._delay(function(){e=!1}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function(t){e||this._allowInteraction(t)||(t.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=t("<div>").appendTo(this._appendTo()),this._addClass(this.overlay,null,"ui-widget-overlay ui-front"),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var t=this.document.data("ui-dialog-overlays")-1;t?this.document.data("ui-dialog-overlays",t):(this._off(this.document,"focusin"),this.document.removeData("ui-dialog-overlays")),this.overlay.remove(),this.overlay=null}}}),t.uiBackCompat!==!1&&t.widget("ui.dialog",t.ui.dialog,{options:{dialogClass:""},_createWrapper:function(){this._super(),this.uiDialog.addClass(this.options.dialogClass)},_setOption:function(t,e){"dialogClass"===t&&this.uiDialog.removeClass(this.options.dialogClass).addClass(e),this._superApply(arguments)}}),t.ui.dialog,t.widget("ui.droppable",{version:"1.12.0",widgetEventPrefix:"drop",options:{accept:"*",addClasses:!0,greedy:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=t.isFunction(s)?s:function(t){return t.is(s)},this.proportions=function(){return arguments.length?(e=arguments[0],void 0):e?e:e={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},this._addToManager(i.scope),i.addClasses&&this._addClass("ui-droppable")},_addToManager:function(e){t.ui.ddmanager.droppables[e]=t.ui.ddmanager.droppables[e]||[],t.ui.ddmanager.droppables[e].push(this)},_splice:function(t){for(var e=0;t.length>e;e++)t[e]===this&&t.splice(e,1)},_destroy:function(){var e=t.ui.ddmanager.droppables[this.options.scope];this._splice(e)},_setOption:function(e,i){if("accept"===e)this.accept=t.isFunction(i)?i:function(t){return t.is(i)};else if("scope"===e){var s=t.ui.ddmanager.droppables[this.options.scope];this._splice(s),this._addToManager(i)}this._super(e,i)},_activate:function(e){var i=t.ui.ddmanager.current;this._addActiveClass(),i&&this._trigger("activate",e,this.ui(i))},_deactivate:function(e){var i=t.ui.ddmanager.current;this._removeActiveClass(),i&&this._trigger("deactivate",e,this.ui(i))},_over:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this._addHoverClass(),this._trigger("over",e,this.ui(i)))},_out:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this._removeHoverClass(),this._trigger("out",e,this.ui(i)))},_drop:function(e,i){var s=i||t.ui.ddmanager.current,n=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=t(this).droppable("instance");return i.options.greedy&&!i.options.disabled&&i.options.scope===s.options.scope&&i.accept.call(i.element[0],s.currentItem||s.element)&&v(s,t.extend(i,{offset:i.element.offset()}),i.options.tolerance,e)?(n=!0,!1):void 0}),n?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this._removeActiveClass(),this._removeHoverClass(),this._trigger("drop",e,this.ui(s)),this.element):!1):!1},ui:function(t){return{draggable:t.currentItem||t.element,helper:t.helper,position:t.position,offset:t.positionAbs}},_addHoverClass:function(){this._addClass("ui-droppable-hover")},_removeHoverClass:function(){this._removeClass("ui-droppable-hover")},_addActiveClass:function(){this._addClass("ui-droppable-active")},_removeActiveClass:function(){this._removeClass("ui-droppable-active")}});var v=t.ui.intersect=function(){function t(t,e,i){return t>=e&&e+i>t}return function(e,i,s,n){if(!i.offset)return!1;var o=(e.positionAbs||e.position.absolute).left+e.margins.left,a=(e.positionAbs||e.position.absolute).top+e.margins.top,r=o+e.helperProportions.width,h=a+e.helperProportions.height,l=i.offset.left,c=i.offset.top,u=l+i.proportions().width,d=c+i.proportions().height;switch(s){case"fit":return o>=l&&u>=r&&a>=c&&d>=h;case"intersect":return o+e.helperProportions.width/2>l&&u>r-e.helperProportions.width/2&&a+e.helperProportions.height/2>c&&d>h-e.helperProportions.height/2;case"pointer":return t(n.pageY,c,i.proportions().height)&&t(n.pageX,l,i.proportions().width);case"touch":return(a>=c&&d>=a||h>=c&&d>=h||c>a&&h>d)&&(o>=l&&u>=o||r>=l&&u>=r||l>o&&r>u);default:return!1}}}();t.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(e,i){var s,n,o=t.ui.ddmanager.droppables[e.options.scope]||[],a=i?i.type:null,r=(e.currentItem||e.element).find(":data(ui-droppable)").addBack();t:for(s=0;o.length>s;s++)if(!(o[s].options.disabled||e&&!o[s].accept.call(o[s].element[0],e.currentItem||e.element))){for(n=0;r.length>n;n++)if(r[n]===o[s].element[0]){o[s].proportions().height=0;continue t}o[s].visible="none"!==o[s].element.css("display"),o[s].visible&&("mousedown"===a&&o[s]._activate.call(o[s],i),o[s].offset=o[s].element.offset(),o[s].proportions({width:o[s].element[0].offsetWidth,height:o[s].element[0].offsetHeight}))}},drop:function(e,i){var s=!1;return t.each((t.ui.ddmanager.droppables[e.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&v(e,this,this.options.tolerance,i)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(e,i){e.element.parentsUntil("body").on("scroll.droppable",function(){e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)})},drag:function(e,i){e.options.refreshPositions&&t.ui.ddmanager.prepareOffsets(e,i),t.each(t.ui.ddmanager.droppables[e.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,n,o,a=v(e,this,this.options.tolerance,i),r=!a&&this.isover?"isout":a&&!this.isover?"isover":null;r&&(this.options.greedy&&(n=this.options.scope,o=this.element.parents(":data(ui-droppable)").filter(function(){return t(this).droppable("instance").options.scope===n}),o.length&&(s=t(o[0]).droppable("instance"),s.greedyChild="isover"===r)),s&&"isover"===r&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[r]=!0,this["isout"===r?"isover":"isout"]=!1,this["isover"===r?"_over":"_out"].call(this,i),s&&"isout"===r&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(e,i){e.element.parentsUntil("body").off("scroll.droppable"),e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)}},t.uiBackCompat!==!1&&t.widget("ui.droppable",t.ui.droppable,{options:{hoverClass:!1,activeClass:!1},_addActiveClass:function(){this._super(),this.options.activeClass&&this.element.addClass(this.options.activeClass)},_removeActiveClass:function(){this._super(),this.options.activeClass&&this.element.removeClass(this.options.activeClass)},_addHoverClass:function(){this._super(),this.options.hoverClass&&this.element.addClass(this.options.hoverClass)},_removeHoverClass:function(){this._super(),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass)}}),t.ui.droppable,t.widget("ui.progressbar",{version:"1.12.0",options:{classes:{"ui-progressbar":"ui-corner-all","ui-progressbar-value":"ui-corner-left","ui-progressbar-complete":"ui-corner-right"},max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.attr({role:"progressbar","aria-valuemin":this.min}),this._addClass("ui-progressbar","ui-widget ui-widget-content"),this.valueDiv=t("<div>").appendTo(this.element),this._addClass(this.valueDiv,"ui-progressbar-value","ui-widget-header"),this._refreshValue()},_destroy:function(){this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"),this.valueDiv.remove()},value:function(t){return void 0===t?this.options.value:(this.options.value=this._constrainedValue(t),this._refreshValue(),void 0)},_constrainedValue:function(t){return void 0===t&&(t=this.options.value),this.indeterminate=t===!1,"number"!=typeof t&&(t=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,t))},_setOptions:function(t){var e=t.value;delete t.value,this._super(t),this.options.value=this._constrainedValue(e),this._refreshValue()},_setOption:function(t,e){"max"===t&&(e=Math.max(this.min,e)),this._super(t,e)},_setOptionDisabled:function(t){this._super(t),this.element.attr("aria-disabled",t),this._toggleClass(null,"ui-state-disabled",!!t)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var e=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||e>this.min).width(i.toFixed(0)+"%"),this._toggleClass(this.valueDiv,"ui-progressbar-complete",null,e===this.options.max)._toggleClass("ui-progressbar-indeterminate",null,this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=t("<div>").appendTo(this.valueDiv),this._addClass(this.overlayDiv,"ui-progressbar-overlay"))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":e}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==e&&(this.oldValue=e,this._trigger("change")),e===this.options.max&&this._trigger("complete")}}),t.widget("ui.selectable",t.ui.mouse,{version:"1.12.0",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var e=this;this._addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){e.elementPos=t(e.element[0]).offset(),e.selectees=t(e.options.filter,e.element[0]),e._addClass(e.selectees,"ui-selectee"),e.selectees.each(function(){var i=t(this),s=i.offset(),n={left:s.left-e.elementPos.left,top:s.top-e.elementPos.top};t.data(this,"selectable-item",{element:this,$element:i,left:n.left,top:n.top,right:n.left+i.outerWidth(),bottom:n.top+i.outerHeight(),startselected:!1,selected:i.hasClass("ui-selected"),selecting:i.hasClass("ui-selecting"),unselecting:i.hasClass("ui-unselecting")})})},this.refresh(),this._mouseInit(),this.helper=t("<div>"),this._addClass(this.helper,"ui-selectable-helper")},_destroy:function(){this.selectees.removeData("selectable-item"),this._mouseDestroy()},_mouseStart:function(e){var i=this,s=this.options;this.opos=[e.pageX,e.pageY],this.elementPos=t(this.element[0]).offset(),this.options.disabled||(this.selectees=t(s.filter,this.element[0]),this._trigger("start",e),t(s.appendTo).append(this.helper),this.helper.css({left:e.pageX,top:e.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=t.data(this,"selectable-item");s.startselected=!0,e.metaKey||e.ctrlKey||(i._removeClass(s.$element,"ui-selected"),s.selected=!1,i._addClass(s.$element,"ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",e,{unselecting:s.element}))}),t(e.target).parents().addBack().each(function(){var s,n=t.data(this,"selectable-item");return n?(s=!e.metaKey&&!e.ctrlKey||!n.$element.hasClass("ui-selected"),i._removeClass(n.$element,s?"ui-unselecting":"ui-selected")._addClass(n.$element,s?"ui-selecting":"ui-unselecting"),n.unselecting=!s,n.selecting=s,n.selected=s,s?i._trigger("selecting",e,{selecting:n.element}):i._trigger("unselecting",e,{unselecting:n.element}),!1):void 0}))},_mouseDrag:function(e){if(this.dragged=!0,!this.options.disabled){var i,s=this,n=this.options,o=this.opos[0],a=this.opos[1],r=e.pageX,h=e.pageY;return o>r&&(i=r,r=o,o=i),a>h&&(i=h,h=a,a=i),this.helper.css({left:o,top:a,width:r-o,height:h-a}),this.selectees.each(function(){var i=t.data(this,"selectable-item"),l=!1,c={};i&&i.element!==s.element[0]&&(c.left=i.left+s.elementPos.left,c.right=i.right+s.elementPos.left,c.top=i.top+s.elementPos.top,c.bottom=i.bottom+s.elementPos.top,"touch"===n.tolerance?l=!(c.left>r||o>c.right||c.top>h||a>c.bottom):"fit"===n.tolerance&&(l=c.left>o&&r>c.right&&c.top>a&&h>c.bottom),l?(i.selected&&(s._removeClass(i.$element,"ui-selected"),i.selected=!1),i.unselecting&&(s._removeClass(i.$element,"ui-unselecting"),i.unselecting=!1),i.selecting||(s._addClass(i.$element,"ui-selecting"),i.selecting=!0,s._trigger("selecting",e,{selecting:i.element}))):(i.selecting&&((e.metaKey||e.ctrlKey)&&i.startselected?(s._removeClass(i.$element,"ui-selecting"),i.selecting=!1,s._addClass(i.$element,"ui-selected"),i.selected=!0):(s._removeClass(i.$element,"ui-selecting"),i.selecting=!1,i.startselected&&(s._addClass(i.$element,"ui-unselecting"),i.unselecting=!0),s._trigger("unselecting",e,{unselecting:i.element}))),i.selected&&(e.metaKey||e.ctrlKey||i.startselected||(s._removeClass(i.$element,"ui-selected"),i.selected=!1,s._addClass(i.$element,"ui-unselecting"),i.unselecting=!0,s._trigger("unselecting",e,{unselecting:i.element})))))}),!1}},_mouseStop:function(e){var i=this;return this.dragged=!1,t(".ui-unselecting",this.element[0]).each(function(){var s=t.data(this,"selectable-item");i._removeClass(s.$element,"ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",e,{unselected:s.element})}),t(".ui-selecting",this.element[0]).each(function(){var s=t.data(this,"selectable-item");i._removeClass(s.$element,"ui-selecting")._addClass(s.$element,"ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",e,{selected:s.element})}),this._trigger("stop",e),this.helper.remove(),!1}}),t.widget("ui.selectmenu",[t.ui.formResetMixin,{version:"1.12.0",defaultElement:"<select>",options:{appendTo:null,classes:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"},disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:!1,change:null,close:null,focus:null,open:null,select:null},_create:function(){var e=this.element.uniqueId().attr("id");this.ids={element:e,button:e+"-button",menu:e+"-menu"},this._drawButton(),this._drawMenu(),this._bindFormResetHandler(),this._rendered=!1,this.menuItems=t()},_drawButton:function(){var e,i=this,s=this._parseOption(this.element.find("option:selected"),this.element[0].selectedIndex);this.labels=this.element.labels().attr("for",this.ids.button),this._on(this.labels,{click:function(t){this.button.focus(),t.preventDefault()}}),this.element.hide(),this.button=t("<span>",{tabindex:this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true",title:this.element.attr("title")}).insertAfter(this.element),this._addClass(this.button,"ui-selectmenu-button ui-selectmenu-button-closed","ui-button ui-widget"),e=t("<span>").appendTo(this.button),this._addClass(e,"ui-selectmenu-icon","ui-icon "+this.options.icons.button),this.buttonItem=this._renderButtonItem(s).appendTo(this.button),this.options.width!==!1&&this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){i._rendered||i._refreshMenu()})},_drawMenu:function(){var e=this;this.menu=t("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),this.menuWrap=t("<div>").append(this.menu),this._addClass(this.menuWrap,"ui-selectmenu-menu","ui-front"),this.menuWrap.appendTo(this._appendTo()),this.menuInstance=this.menu.menu({classes:{"ui-menu":"ui-corner-bottom"},role:"listbox",select:function(t,i){t.preventDefault(),e._setSelection(),e._select(i.item.data("ui-selectmenu-item"),t)},focus:function(t,i){var s=i.item.data("ui-selectmenu-item");null!=e.focusIndex&&s.index!==e.focusIndex&&(e._trigger("focus",t,{item:s}),e.isOpen||e._select(s,t)),e.focusIndex=s.index,e.button.attr("aria-activedescendant",e.menuItems.eq(s.index).attr("id"))}}).menu("instance"),this.menuInstance._off(this.menu,"mouseleave"),this.menuInstance._closeOnDocumentClick=function(){return!1},this.menuInstance._isDivider=function(){return!1}},refresh:function(){this._refreshMenu(),this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item")||{})),null===this.options.width&&this._resizeButton()},_refreshMenu:function(){var t,e=this.element.find("option");this.menu.empty(),this._parseOptions(e),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"),this._rendered=!0,e.length&&(t=this._getSelectedItem(),this.menuInstance.focus(null,t),this._setAria(t.data("ui-selectmenu-item")),this._setOption("disabled",this.element.prop("disabled")))},open:function(t){this.options.disabled||(this._rendered?(this._removeClass(this.menu.find(".ui-state-active"),null,"ui-state-active"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),this.menuItems.length&&(this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",t)))},_position:function(){this.menuWrap.position(t.extend({of:this.button},this.options.position))},close:function(t){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",t))},widget:function(){return this.button},menuWidget:function(){return this.menu},_renderButtonItem:function(e){var i=t("<span>");return this._setText(i,e.label),this._addClass(i,"ui-selectmenu-text"),i},_renderMenu:function(e,i){var s=this,n="";t.each(i,function(i,o){var a;o.optgroup!==n&&(a=t("<li>",{text:o.optgroup}),s._addClass(a,"ui-selectmenu-optgroup","ui-menu-divider"+(o.element.parent("optgroup").prop("disabled")?" ui-state-disabled":"")),a.appendTo(e),n=o.optgroup),s._renderItemData(e,o)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-selectmenu-item",e)},_renderItem:function(e,i){var s=t("<li>"),n=t("<div>",{title:i.element.attr("title")});return i.disabled&&this._addClass(s,null,"ui-state-disabled"),this._setText(n,i.label),s.append(n).appendTo(e)},_setText:function(t,e){e?t.text(e):t.html("&#160;")},_move:function(t,e){var i,s,n=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex).parent("li"):(i=this.menuItems.eq(this.element[0].selectedIndex).parent("li"),n+=":not(.ui-state-disabled)"),s="first"===t||"last"===t?i["first"===t?"prevAll":"nextAll"](n).eq(-1):i[t+"All"](n).eq(0),s.length&&this.menuInstance.focus(e,s)},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex).parent("li")},_toggle:function(t){this[this.isOpen?"close":"open"](t)},_setSelection:function(){var t;this.range&&(window.getSelection?(t=window.getSelection(),t.removeAllRanges(),t.addRange(this.range)):this.range.select(),this.button.focus())},_documentClick:{mousedown:function(e){this.isOpen&&(t(e.target).closest(".ui-selectmenu-menu, #"+t.ui.escapeSelector(this.ids.button)).length||this.close(e))}},_buttonEvents:{mousedown:function(){var t;window.getSelection?(t=window.getSelection(),t.rangeCount&&(this.range=t.getRangeAt(0))):this.range=document.selection.createRange()},click:function(t){this._setSelection(),this._toggle(t)},keydown:function(e){var i=!0;switch(e.keyCode){case t.ui.keyCode.TAB:case t.ui.keyCode.ESCAPE:this.close(e),i=!1;break;case t.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(e);break;case t.ui.keyCode.UP:e.altKey?this._toggle(e):this._move("prev",e);break;case t.ui.keyCode.DOWN:e.altKey?this._toggle(e):this._move("next",e);break;case t.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(e):this._toggle(e);break;case t.ui.keyCode.LEFT:this._move("prev",e);break;case t.ui.keyCode.RIGHT:this._move("next",e);break;case t.ui.keyCode.HOME:case t.ui.keyCode.PAGE_UP:this._move("first",e);break;case t.ui.keyCode.END:case t.ui.keyCode.PAGE_DOWN:this._move("last",e);break;default:this.menu.trigger(e),i=!1}i&&e.preventDefault()}},_selectFocusedItem:function(t){var e=this.menuItems.eq(this.focusIndex).parent("li");e.hasClass("ui-state-disabled")||this._select(e.data("ui-selectmenu-item"),t)},_select:function(t,e){var i=this.element[0].selectedIndex;this.element[0].selectedIndex=t.index,this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(t)),this._setAria(t),this._trigger("select",e,{item:t}),t.index!==i&&this._trigger("change",e,{item:t}),this.close(e)},_setAria:function(t){var e=this.menuItems.eq(t.index).attr("id");this.button.attr({"aria-labelledby":e,"aria-activedescendant":e}),this.menu.attr("aria-activedescendant",e)},_setOption:function(t,e){if("icons"===t){var i=this.button.find("span.ui-icon");this._removeClass(i,null,this.options.icons.button)._addClass(i,null,e.button)}this._super(t,e),"appendTo"===t&&this.menuWrap.appendTo(this._appendTo()),"width"===t&&this._resizeButton()},_setOptionDisabled:function(t){this._super(t),this.menuInstance.option("disabled",t),this.button.attr("aria-disabled",t),this._toggleClass(this.button,null,"ui-state-disabled",t),this.element.prop("disabled",t),t?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e&&e[0]||(e=this.element.closest(".ui-front, dialog")),e.length||(e=this.document[0].body),e},_toggleAttr:function(){this.button.attr("aria-expanded",this.isOpen),this._removeClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"closed":"open"))._addClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"open":"closed"))._toggleClass(this.menuWrap,"ui-selectmenu-open",null,this.isOpen),this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var t=this.options.width;return t===!1?(this.button.css("width",""),void 0):(null===t&&(t=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(t),void 0)},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),this.menu.width("").outerWidth()+1))},_getCreateOptions:function(){var t=this._super();return t.disabled=this.element.prop("disabled"),t},_parseOptions:function(e){var i=this,s=[];e.each(function(e,n){s.push(i._parseOption(t(n),e))}),this.items=s},_parseOption:function(t,e){var i=t.parent("optgroup");return{element:t,index:e,value:t.val(),label:t.text(),optgroup:i.attr("label")||"",disabled:i.prop("disabled")||t.prop("disabled")}},_destroy:function(){this._unbindFormResetHandler(),this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.labels.attr("for",this.ids.element)}}]),t.widget("ui.slider",t.ui.mouse,{version:"1.12.0",widgetEventPrefix:"slide",options:{animate:!1,classes:{"ui-slider":"ui-corner-all","ui-slider-handle":"ui-corner-all","ui-slider-range":"ui-corner-all ui-widget-header"},distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this._addClass("ui-slider ui-slider-"+this.orientation,"ui-widget ui-widget-content"),this._refresh(),this._animateOff=!1
},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,i,s=this.options,n=this.element.find(".ui-slider-handle"),o="<span tabindex='0'></span>",a=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),e=n.length;i>e;e++)a.push(o);this.handles=n.add(t(a.join("")).appendTo(this.element)),this._addClass(this.handles,"ui-slider-handle","ui-state-default"),this.handle=this.handles.eq(0),this.handles.each(function(e){t(this).data("ui-slider-handle-index",e)})},_createRange:function(){var e=this.options;e.range?(e.range===!0&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:t.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?(this._removeClass(this.range,"ui-slider-range-min ui-slider-range-max"),this.range.css({left:"",bottom:""})):(this.range=t("<div>").appendTo(this.element),this._addClass(this.range,"ui-slider-range")),("min"===e.range||"max"===e.range)&&this._addClass(this.range,"ui-slider-range-"+e.range)):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this._mouseDestroy()},_mouseCapture:function(e){var i,s,n,o,a,r,h,l,c=this,u=this.options;return u.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:e.pageX,y:e.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var i=Math.abs(s-c.values(e));(n>i||n===i&&(e===c._lastChangedValue||c.values(e)===u.min))&&(n=i,o=t(this),a=e)}),r=this._start(e,a),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=a,this._addClass(o,null,"ui-state-active"),o.trigger("focus"),h=o.offset(),l=!t(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:e.pageX-h.left-o.width()/2,top:e.pageY-h.top-o.height()/2-(parseInt(o.css("borderTopWidth"),10)||0)-(parseInt(o.css("borderBottomWidth"),10)||0)+(parseInt(o.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,a,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this._removeClass(this.handles,null,"ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,s,n,o;return"horizontal"===this.orientation?(e=this.elementSize.width,i=t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,i=t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/e,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),o=this._valueMin()+s*n,this._trimAlignValue(o)},_uiHash:function(t,e,i){var s={handle:this.handles[t],handleIndex:t,value:void 0!==e?e:this.value()};return this._hasMultipleValues()&&(s.value=void 0!==e?e:this.values(t),s.values=i||this.values()),s},_hasMultipleValues:function(){return this.options.values&&this.options.values.length},_start:function(t,e){return this._trigger("start",t,this._uiHash(e))},_slide:function(t,e,i){var s,n,o=this.value(),a=this.values();this._hasMultipleValues()&&(n=this.values(e?0:1),o=this.values(e),2===this.options.values.length&&this.options.range===!0&&(i=0===e?Math.min(n,i):Math.max(n,i)),a[e]=i),i!==o&&(s=this._trigger("slide",t,this._uiHash(e,i,a)),s!==!1&&(this._hasMultipleValues()?this.values(e,i):this.value(i)))},_stop:function(t,e){this._trigger("stop",t,this._uiHash(e))},_change:function(t,e){this._keySliding||this._mouseSliding||(this._lastChangedValue=e,this._trigger("change",t,this._uiHash(e)))},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),this._change(null,0),void 0):this._value()},values:function(e,i){var s,n,o;if(arguments.length>1)return this.options.values[e]=this._trimAlignValue(i),this._refreshValue(),this._change(null,e),void 0;if(!arguments.length)return this._values();if(!t.isArray(arguments[0]))return this._hasMultipleValues()?this._values(e):this.value();for(s=this.options.values,n=arguments[0],o=0;s.length>o;o+=1)s[o]=this._trimAlignValue(n[o]),this._change(null,o);this._refreshValue()},_setOption:function(e,i){var s,n=0;switch("range"===e&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),t.isArray(this.options.values)&&(n=this.options.values.length),this._super(e,i),e){case"orientation":this._detectOrientation(),this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-"+this.orientation),this._refreshValue(),this.options.range&&this._refreshRange(i),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=n-1;s>=0;s--)this._change(null,s);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_setOptionDisabled:function(t){this._super(t),this._toggleClass(null,"ui-state-disabled",!!t)},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,s;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this._hasMultipleValues()){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(t){if(this._valueMin()>=t)return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=this.options.step>0?this.options.step:1,i=(t-this._valueMin())%e,s=t-i;return 2*Math.abs(i)>=e&&(s+=i>0?e:-e),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var t=this.options.max,e=this._valueMin(),i=this.options.step,s=Math.round((t-e)/i)*i;t=s+e,t>this.options.max&&(t-=i),this.max=parseFloat(t.toFixed(this._precision()))},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=""+t,i=e.indexOf(".");return-1===i?0:e.length-i-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshRange:function(t){"vertical"===t&&this.range.css({width:"",left:""}),"horizontal"===t&&this.range.css({height:"",bottom:""})},_refreshValue:function(){var e,i,s,n,o,a=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,c={};this._hasMultipleValues()?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),c["horizontal"===h.orientation?"left":"bottom"]=i+"%",t(this).stop(1,1)[l?"animate":"css"](c,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:r.animate}))),e=i}):(s=this.value(),n=this._valueMin(),o=this._valueMax(),i=o!==n?100*((s-n)/(o-n)):0,c["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](c,r.animate),"min"===a&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===a&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:100-i+"%"},r.animate),"min"===a&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===a&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:100-i+"%"},r.animate))},_handleEvents:{keydown:function(e){var i,s,n,o,a=t(e.target).data("ui-slider-handle-index");switch(e.keyCode){case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(e.preventDefault(),!this._keySliding&&(this._keySliding=!0,this._addClass(t(e.target),null,"ui-state-active"),i=this._start(e,a),i===!1))return}switch(o=this.options.step,s=n=this._hasMultipleValues()?this.values(a):this.value(),e.keyCode){case t.ui.keyCode.HOME:n=this._valueMin();break;case t.ui.keyCode.END:n=this._valueMax();break;case t.ui.keyCode.PAGE_UP:n=this._trimAlignValue(s+(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(s-(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:if(s===this._valueMax())return;n=this._trimAlignValue(s+o);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(s===this._valueMin())return;n=this._trimAlignValue(s-o)}this._slide(e,a,n)},keyup:function(e){var i=t(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,i),this._change(e,i),this._removeClass(t(e.target),null,"ui-state-active"))}}}),t.widget("ui.sortable",t.ui.mouse,{version:"1.12.0",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(t,e,i){return t>=e&&e+i>t},_isFloating:function(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))},_create:function(){this.containerCache={},this._addClass("ui-sortable"),this.refresh(),this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(t,e){this._super(t,e),"handle"===t&&this._setHandleClassName()},_setHandleClassName:function(){var e=this;this._removeClass(this.element.find(".ui-sortable-handle"),"ui-sortable-handle"),t.each(this.items,function(){e._addClass(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item,"ui-sortable-handle")})},_destroy:function(){this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(e,i){var s=null,n=!1,o=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(e),t(e.target).parents().each(function(){return t.data(this,o.widgetName+"-item")===o?(s=t(this),!1):void 0}),t.data(e.target,o.widgetName+"-item")===o&&(s=t(e.target)),s?!this.options.handle||i||(t(this.options.handle,s).find("*").addBack().each(function(){this===e.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(e,i,s){var n,o,a=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,a.cursorAt&&this._adjustOffsetFromHelper(a.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),a.containment&&this._setContainment(),a.cursor&&"auto"!==a.cursor&&(o=this.document.find("body"),this.storedCursor=o.css("cursor"),o.css("cursor",a.cursor),this.storedStylesheet=t("<style>*{ cursor: "+a.cursor+" !important; }</style>").appendTo(o)),a.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",a.opacity)),a.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",a.zIndex)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",e,this._uiHash(this));return t.ui.ddmanager&&(t.ui.ddmanager.current=this),t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this.dragging=!0,this._addClass(this.helper,"ui-sortable-helper"),this._mouseDrag(e),!0},_mouseDrag:function(e){var i,s,n,o,a=this.options,r=!1;for(this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<a.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+a.scrollSpeed:e.pageY-this.overflowOffset.top<a.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-a.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<a.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+a.scrollSpeed:e.pageX-this.overflowOffset.left<a.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-a.scrollSpeed)):(e.pageY-this.document.scrollTop()<a.scrollSensitivity?r=this.document.scrollTop(this.document.scrollTop()-a.scrollSpeed):this.window.height()-(e.pageY-this.document.scrollTop())<a.scrollSensitivity&&(r=this.document.scrollTop(this.document.scrollTop()+a.scrollSpeed)),e.pageX-this.document.scrollLeft()<a.scrollSensitivity?r=this.document.scrollLeft(this.document.scrollLeft()-a.scrollSpeed):this.window.width()-(e.pageX-this.document.scrollLeft())<a.scrollSensitivity&&(r=this.document.scrollLeft(this.document.scrollLeft()+a.scrollSpeed))),r!==!1&&t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],o=this._intersectsWithPointer(s),o&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===o?"next":"prev"]()[0]!==n&&!t.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!t.contains(this.element[0],n):!0)){if(this.direction=1===o?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(e,s),this._trigger("change",e,this._uiHash());break}return this._contactContainers(e),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),this._trigger("sort",e,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(e,i){if(e){if(t.ui.ddmanager&&!this.options.dropBehaviour&&t.ui.ddmanager.drop(this,e),this.options.revert){var s=this,n=this.placeholder.offset(),o=this.options.axis,a={};o&&"x"!==o||(a.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),o&&"y"!==o||(a.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,t(this.helper).animate(a,parseInt(this.options.revert,10)||500,function(){s._clear(e)})}else this._clear(e,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?(this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?t(this.domPosition.prev).after(this.currentItem):t(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},t(i).each(function(){var i=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);i&&s.push((e.key||i[1]+"[]")+"="+(e.key&&e.expression?i[1]:i[2]))}),!s.length&&e.key&&s.push(e.key+"="),s.join("&")},toArray:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},i.each(function(){s.push(t(e.item||this).attr(e.attribute||"id")||"")}),s},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,o=t.left,a=o+t.width,r=t.top,h=r+t.height,l=this.offset.click.top,c=this.offset.click.left,u="x"===this.options.axis||s+l>r&&h>s+l,d="y"===this.options.axis||e+c>o&&a>e+c,p=u&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?p:e+this.helperProportions.width/2>o&&a>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&h>n-this.helperProportions.height/2},_intersectsWithPointer:function(t){var e,i,s="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),n="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width),o=s&&n;return o?(e=this._getDragVerticalDirection(),i=this._getDragHorizontalDirection(),this.floating?"right"===i||"down"===e?2:1:e&&("down"===e?2:1)):!1},_intersectsWithSides:function(t){var e=this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&e||"up"===s&&!e)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){function i(){r.push(this)}var s,n,o,a,r=[],h=[],l=this._connectWith();if(l&&e)for(s=l.length-1;s>=0;s--)for(o=t(l[s],this.document[0]),n=o.length-1;n>=0;n--)a=t.data(o[n],this.widgetFullName),a&&a!==this&&!a.options.disabled&&h.push([t.isFunction(a.options.items)?a.options.items.call(a.element):t(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a]);for(h.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):t(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=h.length-1;s>=0;s--)h[s][0].each(i);return t(r)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=t.grep(this.items,function(t){for(var i=0;e.length>i;i++)if(e[i]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.items=[],this.containers=[this];var i,s,n,o,a,r,h,l,c=this.items,u=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):t(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(n=t(d[i],this.document[0]),s=n.length-1;s>=0;s--)o=t.data(n[s],this.widgetFullName),o&&o!==this&&!o.options.disabled&&(u.push([t.isFunction(o.options.items)?o.options.items.call(o.element[0],e,{item:this.currentItem}):t(o.options.items,o.element),o]),this.containers.push(o));for(i=u.length-1;i>=0;i--)for(a=u[i][1],r=u[i][0],s=0,l=r.length;l>s;s++)h=t(r[s]),h.data(this.widgetName+"-item",a),c.push({item:h,instance:a,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.floating=this.items.length?"x"===this.options.axis||this._isFloating(this.items[0].item):!1,this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,o;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?t(this.options.toleranceElement,s.item):s.item,e||(s.width=n.outerWidth(),s.height=n.outerHeight()),o=n.offset(),s.left=o.left,s.top=o.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)o=this.containers[i].element.offset(),this.containers[i].containerCache.left=o.left,this.containers[i].containerCache.top=o.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(e){e=e||this;var i,s=e.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=e.currentItem[0].nodeName.toLowerCase(),n=t("<"+s+">",e.document[0]);return e._addClass(n,"ui-sortable-placeholder",i||e.currentItem[0].className)._removeClass(n,"ui-sortable-helper"),"tbody"===s?e._createTrPlaceholder(e.currentItem.find("tr").eq(0),t("<tr>",e.document[0]).appendTo(n)):"tr"===s?e._createTrPlaceholder(e.currentItem,n):"img"===s&&n.attr("src",e.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(t,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(s.placeholder.element.call(e.element,e.currentItem)),e.currentItem.after(e.placeholder),s.placeholder.update(e,e.placeholder)},_createTrPlaceholder:function(e,i){var s=this;e.children().each(function(){t("<td>&#160;</td>",s.document[0]).attr("colspan",t(this).attr("colspan")||1).appendTo(i)})},_contactContainers:function(e){var i,s,n,o,a,r,h,l,c,u,d=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!t.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(d&&t.contains(this.containers[i].element[0],d.element[0]))continue;d=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",e,this._uiHash(this)),this.containers[i].containerCache.over=0);if(d)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(n=1e4,o=null,c=d.floating||this._isFloating(this.currentItem),a=c?"left":"top",r=c?"width":"height",u=c?"pageX":"pageY",s=this.items.length-1;s>=0;s--)t.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(h=this.items[s].item.offset()[a],l=!1,e[u]-h>this.items[s][r]/2&&(l=!0),n>Math.abs(e[u]-h)&&(n=Math.abs(e[u]-h),o=this.items[s],this.direction=l?"up":"down"));if(!o&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash()),this.currentContainer.containerCache.over=1),void 0;o?this._rearrange(e,o,null,!0):this._rearrange(e,null,this.containers[p].element,!0),this._trigger("change",e,this._uiHash()),this.containers[p]._trigger("change",e,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||t("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===n.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===n.containment?this.document.height()||document.body.parentNode.scrollHeight:this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(e=t(n.containment)[0],i=t(n.containment).offset(),s="hidden"!==t(e).css("overflow"),this.containment=[i.left+(parseInt(t(e).css("borderLeftWidth"),10)||0)+(parseInt(t(e).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(t(e).css("borderTopWidth"),10)||0)+(parseInt(t(e).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(t(e).css("borderLeftWidth"),10)||0)-(parseInt(t(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(t(e).css("borderTopWidth"),10)||0)-(parseInt(t(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():o?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():o?0:n.scrollLeft())*s}},_generatePosition:function(e){var i,s,n=this.options,o=e.pageX,a=e.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(o=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(a=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(o=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(a=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((a-this.originalPageY)/n.grid[1])*n.grid[1],a=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((o-this.originalPageX)/n.grid[0])*n.grid[0],o=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:a-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:o-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)
})},_clear:function(t,e){function i(t,e,i){return function(s){i._trigger(t,s,e._uiHash(e))}}this.reverting=!1;var s,n=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&n.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||n.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(n.push(function(t){this._trigger("remove",t,this._uiHash())}),n.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),n.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)e||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!e){for(s=0;n.length>s;s++)n[s].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){t.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(e){var i=e||this;return{helper:i.helper,placeholder:i.placeholder||t([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:e?e.element:null}}}),t.widget("ui.spinner",{version:"1.12.0",defaultElement:"<input>",widgetEventPrefix:"spin",options:{classes:{"ui-spinner":"ui-corner-all","ui-spinner-down":"ui-corner-br","ui-spinner-up":"ui-corner-tr"},culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var e=this._super(),i=this.element;return t.each(["min","max","step"],function(t,s){var n=i.attr(s);null!=n&&n.length&&(e[s]=n)}),e},_events:{keydown:function(t){this._start(t)&&this._keydown(t)&&t.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(t){return this.cancelBlur?(delete this.cancelBlur,void 0):(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",t),void 0)},mousewheel:function(t,e){if(e){if(!this.spinning&&!this._start(t))return!1;this._spin((e>0?1:-1)*this.options.step,t),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(t)},100),t.preventDefault()}},"mousedown .ui-spinner-button":function(e){function i(){var e=this.element[0]===t.ui.safeActiveElement(this.document[0]);e||(this.element.trigger("focus"),this.previous=s,this._delay(function(){this.previous=s}))}var s;s=this.element[0]===t.ui.safeActiveElement(this.document[0])?this.previous:this.element.val(),e.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(e)!==!1&&this._repeat(null,t(e.currentTarget).hasClass("ui-spinner-up")?1:-1,e)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(e){return t(e.currentTarget).hasClass("ui-state-active")?this._start(e)===!1?!1:(this._repeat(null,t(e.currentTarget).hasClass("ui-spinner-up")?1:-1,e),void 0):void 0},"mouseleave .ui-spinner-button":"_stop"},_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap("<span>").parent().append("<a></a><a></a>")},_draw:function(){this._enhance(),this._addClass(this.uiSpinner,"ui-spinner","ui-widget ui-widget-content"),this._addClass("ui-spinner-input"),this.element.attr("role","spinbutton"),this.buttons=this.uiSpinner.children("a").attr("tabIndex",-1).attr("aria-hidden",!0).button({classes:{"ui-button":""}}),this._removeClass(this.buttons,"ui-corner-all"),this._addClass(this.buttons.first(),"ui-spinner-button ui-spinner-up"),this._addClass(this.buttons.last(),"ui-spinner-button ui-spinner-down"),this.buttons.first().button({icon:this.options.icons.up,showLabel:!1}),this.buttons.last().button({icon:this.options.icons.down,showLabel:!1}),this.buttons.height()>Math.ceil(.5*this.uiSpinner.height())&&this.uiSpinner.height()>0&&this.uiSpinner.height(this.uiSpinner.height())},_keydown:function(e){var i=this.options,s=t.ui.keyCode;switch(e.keyCode){case s.UP:return this._repeat(null,1,e),!0;case s.DOWN:return this._repeat(null,-1,e),!0;case s.PAGE_UP:return this._repeat(null,i.page,e),!0;case s.PAGE_DOWN:return this._repeat(null,-i.page,e),!0}return!1},_start:function(t){return this.spinning||this._trigger("start",t)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(t,e,i){t=t||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,e,i)},t),this._spin(e*this.options.step,i)},_spin:function(t,e){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+t*this._increment(this.counter)),this.spinning&&this._trigger("spin",e,{value:i})===!1||(this._value(i),this.counter++)},_increment:function(e){var i=this.options.incremental;return i?t.isFunction(i)?i(e):Math.floor(e*e*e/5e4-e*e/500+17*e/200+1):1},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=""+t,i=e.indexOf(".");return-1===i?0:e.length-i-1},_adjustValue:function(t){var e,i,s=this.options;return e=null!==s.min?s.min:0,i=t-e,i=Math.round(i/s.step)*s.step,t=e+i,t=parseFloat(t.toFixed(this._precision())),null!==s.max&&t>s.max?s.max:null!==s.min&&s.min>t?s.min:t},_stop:function(t){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",t))},_setOption:function(t,e){var i,s,n;return"culture"===t||"numberFormat"===t?(i=this._parse(this.element.val()),this.options[t]=e,this.element.val(this._format(i)),void 0):(("max"===t||"min"===t||"step"===t)&&"string"==typeof e&&(e=this._parse(e)),"icons"===t&&(s=this.buttons.first().find(".ui-icon"),this._removeClass(s,null,this.options.icons.up),this._addClass(s,null,e.up),n=this.buttons.last().find(".ui-icon"),this._removeClass(n,null,this.options.icons.down),this._addClass(n,null,e.down)),this._super(t,e),void 0)},_setOptionDisabled:function(t){this._super(t),this._toggleClass(this.uiSpinner,null,"ui-state-disabled",!!t),this.element.prop("disabled",!!t),this.buttons.button(t?"disable":"enable")},_setOptions:r(function(t){this._super(t)}),_parse:function(t){return"string"==typeof t&&""!==t&&(t=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(t,10,this.options.culture):+t),""===t||isNaN(t)?null:t},_format:function(t){return""===t?"":window.Globalize&&this.options.numberFormat?Globalize.format(t,this.options.numberFormat,this.options.culture):t},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},isValid:function(){var t=this.value();return null===t?!1:t===this._adjustValue(t)},_value:function(t,e){var i;""!==t&&(i=this._parse(t),null!==i&&(e||(i=this._adjustValue(i)),t=this._format(i))),this.element.val(t),this._refresh()},_destroy:function(){this.element.prop("disabled",!1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:r(function(t){this._stepUp(t)}),_stepUp:function(t){this._start()&&(this._spin((t||1)*this.options.step),this._stop())},stepDown:r(function(t){this._stepDown(t)}),_stepDown:function(t){this._start()&&(this._spin((t||1)*-this.options.step),this._stop())},pageUp:r(function(t){this._stepUp((t||1)*this.options.page)}),pageDown:r(function(t){this._stepDown((t||1)*this.options.page)}),value:function(t){return arguments.length?(r(this._value).call(this,t),void 0):this._parse(this.element.val())},widget:function(){return this.uiSpinner}}),t.uiBackCompat!==!1&&t.widget("ui.spinner",t.ui.spinner,{_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())},_uiSpinnerHtml:function(){return"<span>"},_buttonHtml:function(){return"<a></a><a></a>"}}),t.ui.spinner,t.widget("ui.tabs",{version:"1.12.0",delay:300,options:{active:null,classes:{"ui-tabs":"ui-corner-all","ui-tabs-nav":"ui-corner-all","ui-tabs-panel":"ui-corner-bottom","ui-tabs-tab":"ui-corner-top"},collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var t=/#.*$/;return function(e){var i,s;i=e.href.replace(t,""),s=location.href.replace(t,"");try{i=decodeURIComponent(i)}catch(n){}try{s=decodeURIComponent(s)}catch(n){}return e.hash.length>1&&i===s}}(),_create:function(){var e=this,i=this.options;this.running=!1,this._addClass("ui-tabs","ui-widget ui-widget-content"),this._toggleClass("ui-tabs-collapsible",null,i.collapsible),this._processTabs(),i.active=this._initialActive(),t.isArray(i.disabled)&&(i.disabled=t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"),function(t){return e.tabs.index(t)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):t(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var e=this.options.active,i=this.options.collapsible,s=location.hash.substring(1);return null===e&&(s&&this.tabs.each(function(i,n){return t(n).attr("aria-controls")===s?(e=i,!1):void 0}),null===e&&(e=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===e||-1===e)&&(e=this.tabs.length?0:!1)),e!==!1&&(e=this.tabs.index(this.tabs.eq(e)),-1===e&&(e=i?!1:0)),!i&&e===!1&&this.anchors.length&&(e=0),e},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):t()}},_tabKeydown:function(e){var i=t(t.ui.safeActiveElement(this.document[0])).closest("li"),s=this.tabs.index(i),n=!0;if(!this._handlePageNav(e)){switch(e.keyCode){case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:s++;break;case t.ui.keyCode.UP:case t.ui.keyCode.LEFT:n=!1,s--;break;case t.ui.keyCode.END:s=this.anchors.length-1;break;case t.ui.keyCode.HOME:s=0;break;case t.ui.keyCode.SPACE:return e.preventDefault(),clearTimeout(this.activating),this._activate(s),void 0;case t.ui.keyCode.ENTER:return e.preventDefault(),clearTimeout(this.activating),this._activate(s===this.options.active?!1:s),void 0;default:return}e.preventDefault(),clearTimeout(this.activating),s=this._focusNextTab(s,n),e.ctrlKey||e.metaKey||(i.attr("aria-selected","false"),this.tabs.eq(s).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",s)},this.delay))}},_panelKeydown:function(e){this._handlePageNav(e)||e.ctrlKey&&e.keyCode===t.ui.keyCode.UP&&(e.preventDefault(),this.active.trigger("focus"))},_handlePageNav:function(e){return e.altKey&&e.keyCode===t.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):e.altKey&&e.keyCode===t.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(e,i){function s(){return e>n&&(e=0),0>e&&(e=n),e}for(var n=this.tabs.length-1;-1!==t.inArray(s(),this.options.disabled);)e=i?e+1:e-1;return e},_focusNextTab:function(t,e){return t=this._findNextTab(t,e),this.tabs.eq(t).trigger("focus"),t},_setOption:function(t,e){return"active"===t?(this._activate(e),void 0):(this._super(t,e),"collapsible"===t&&(this._toggleClass("ui-tabs-collapsible",null,e),e||this.options.active!==!1||this._activate(0)),"event"===t&&this._setupEvents(e),"heightStyle"===t&&this._setupHeightStyle(e),void 0)},_sanitizeSelector:function(t){return t?t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var e=this.options,i=this.tablist.children(":has(a[href])");e.disabled=t.map(i.filter(".ui-state-disabled"),function(t){return i.index(t)}),this._processTabs(),e.active!==!1&&this.anchors.length?this.active.length&&!t.contains(this.tablist[0],this.active[0])?this.tabs.length===e.disabled.length?(e.active=!1,this.active=t()):this._activate(this._findNextTab(Math.max(0,e.active-1),!1)):e.active=this.tabs.index(this.active):(e.active=!1,this.active=t()),this._refresh()},_refresh:function(){this._setOptionDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._addClass(this.active,"ui-tabs-active","ui-state-active"),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var e=this,i=this.tabs,s=this.anchors,n=this.panels;this.tablist=this._getList().attr("role","tablist"),this._addClass(this.tablist,"ui-tabs-nav","ui-helper-reset ui-helper-clearfix ui-widget-header"),this.tablist.on("mousedown"+this.eventNamespace,"> li",function(e){t(this).is(".ui-state-disabled")&&e.preventDefault()}).on("focus"+this.eventNamespace,".ui-tabs-anchor",function(){t(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").attr({role:"tab",tabIndex:-1}),this._addClass(this.tabs,"ui-tabs-tab","ui-state-default"),this.anchors=this.tabs.map(function(){return t("a",this)[0]}).attr({role:"presentation",tabIndex:-1}),this._addClass(this.anchors,"ui-tabs-anchor"),this.panels=t(),this.anchors.each(function(i,s){var n,o,a,r=t(s).uniqueId().attr("id"),h=t(s).closest("li"),l=h.attr("aria-controls");e._isLocal(s)?(n=s.hash,a=n.substring(1),o=e.element.find(e._sanitizeSelector(n))):(a=h.attr("aria-controls")||t({}).uniqueId()[0].id,n="#"+a,o=e.element.find(n),o.length||(o=e._createPanel(a),o.insertAfter(e.panels[i-1]||e.tablist)),o.attr("aria-live","polite")),o.length&&(e.panels=e.panels.add(o)),l&&h.data("ui-tabs-aria-controls",l),h.attr({"aria-controls":a,"aria-labelledby":r}),o.attr("aria-labelledby",r)}),this.panels.attr("role","tabpanel"),this._addClass(this.panels,"ui-tabs-panel","ui-widget-content"),i&&(this._off(i.not(this.tabs)),this._off(s.not(this.anchors)),this._off(n.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol, ul").eq(0)},_createPanel:function(e){return t("<div>").attr("id",e).data("ui-tabs-destroy",!0)},_setOptionDisabled:function(e){var i,s,n;for(t.isArray(e)&&(e.length?e.length===this.anchors.length&&(e=!0):e=!1),n=0;s=this.tabs[n];n++)i=t(s),e===!0||-1!==t.inArray(n,e)?(i.attr("aria-disabled","true"),this._addClass(i,null,"ui-state-disabled")):(i.removeAttr("aria-disabled"),this._removeClass(i,null,"ui-state-disabled"));this.options.disabled=e,this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,e===!0)},_setupEvents:function(e){var i={};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(t){t.preventDefault()}}),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(e){var i,s=this.element.parent();"fill"===e?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var e=t(this),s=e.css("position");"absolute"!==s&&"fixed"!==s&&(i-=e.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=t(this).outerHeight(!0)}),this.panels.each(function(){t(this).height(Math.max(0,i-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===e&&(i=0,this.panels.each(function(){i=Math.max(i,t(this).height("").height())}).height(i))},_eventHandler:function(e){var i=this.options,s=this.active,n=t(e.currentTarget),o=n.closest("li"),a=o[0]===s[0],r=a&&i.collapsible,h=r?t():this._getPanelForTab(o),l=s.length?this._getPanelForTab(s):t(),c={oldTab:s,oldPanel:l,newTab:r?t():o,newPanel:h};e.preventDefault(),o.hasClass("ui-state-disabled")||o.hasClass("ui-tabs-loading")||this.running||a&&!i.collapsible||this._trigger("beforeActivate",e,c)===!1||(i.active=r?!1:this.tabs.index(o),this.active=a?t():o,this.xhr&&this.xhr.abort(),l.length||h.length||t.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(o),e),this._toggle(e,c))},_toggle:function(e,i){function s(){o.running=!1,o._trigger("activate",e,i)}function n(){o._addClass(i.newTab.closest("li"),"ui-tabs-active","ui-state-active"),a.length&&o.options.show?o._show(a,o.options.show,s):(a.show(),s())}var o=this,a=i.newPanel,r=i.oldPanel;this.running=!0,r.length&&this.options.hide?this._hide(r,this.options.hide,function(){o._removeClass(i.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),n()}):(this._removeClass(i.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),r.hide(),n()),r.attr("aria-hidden","true"),i.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),a.length&&r.length?i.oldTab.attr("tabIndex",-1):a.length&&this.tabs.filter(function(){return 0===t(this).attr("tabIndex")}).attr("tabIndex",-1),a.attr("aria-hidden","false"),i.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(e){var i,s=this._findActive(e);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return e===!1?t():this.tabs.eq(e)},_getIndex:function(e){return"string"==typeof e&&(e=this.anchors.index(this.anchors.filter("[href$='"+t.ui.escapeSelector(e)+"']"))),e},_destroy:function(){this.xhr&&this.xhr.abort(),this.tablist.removeAttr("role").off(this.eventNamespace),this.anchors.removeAttr("role tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){t.data(this,"ui-tabs-destroy")?t(this).remove():t(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")}),this.tabs.each(function(){var e=t(this),i=e.data("ui-tabs-aria-controls");i?e.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):e.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(e){var i=this.options.disabled;i!==!1&&(void 0===e?i=!1:(e=this._getIndex(e),i=t.isArray(i)?t.map(i,function(t){return t!==e?t:null}):t.map(this.tabs,function(t,i){return i!==e?i:null})),this._setOptionDisabled(i))},disable:function(e){var i=this.options.disabled;if(i!==!0){if(void 0===e)i=!0;else{if(e=this._getIndex(e),-1!==t.inArray(e,i))return;i=t.isArray(i)?t.merge([e],i).sort():[e]}this._setOptionDisabled(i)}},load:function(e,i){e=this._getIndex(e);var s=this,n=this.tabs.eq(e),o=n.find(".ui-tabs-anchor"),a=this._getPanelForTab(n),r={tab:n,panel:a},h=function(t,e){"abort"===e&&s.panels.stop(!1,!0),s._removeClass(n,"ui-tabs-loading"),a.removeAttr("aria-busy"),t===s.xhr&&delete s.xhr};this._isLocal(o[0])||(this.xhr=t.ajax(this._ajaxSettings(o,i,r)),this.xhr&&"canceled"!==this.xhr.statusText&&(this._addClass(n,"ui-tabs-loading"),a.attr("aria-busy","true"),this.xhr.done(function(t,e,n){setTimeout(function(){a.html(t),s._trigger("load",i,r),h(n,e)},1)}).fail(function(t,e){setTimeout(function(){h(t,e)},1)})))},_ajaxSettings:function(e,i,s){var n=this;return{url:e.attr("href"),beforeSend:function(e,o){return n._trigger("beforeLoad",i,t.extend({jqXHR:e,ajaxSettings:o},s))}}},_getPanelForTab:function(e){var i=t(e).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}}),t.uiBackCompat!==!1&&t.widget("ui.tabs",t.ui.tabs,{_processTabs:function(){this._superApply(arguments),this._addClass(this.tabs,"ui-tab")}}),t.ui.tabs,t.widget("ui.tooltip",{version:"1.12.0",options:{classes:{"ui-tooltip":"ui-corner-all ui-widget-shadow"},content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,track:!1,close:null,open:null},_addDescribedBy:function(e,i){var s=(e.attr("aria-describedby")||"").split(/\s+/);s.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(s.join(" ")))},_removeDescribedBy:function(e){var i=e.data("ui-tooltip-id"),s=(e.attr("aria-describedby")||"").split(/\s+/),n=t.inArray(i,s);-1!==n&&s.splice(n,1),e.removeData("ui-tooltip-id"),s=t.trim(s.join(" ")),s?e.attr("aria-describedby",s):e.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.liveRegion=t("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this.disabledTitles=t([])},_setOption:function(e,i){var s=this;this._super(e,i),"content"===e&&t.each(this.tooltips,function(t,e){s._updateContent(e.element)})},_setOptionDisabled:function(t){this[t?"_disable":"_enable"]()},_disable:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s.element[0],e.close(n,!0)}),this.disabledTitles=this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function(){var e=t(this);return e.is("[title]")?e.data("ui-tooltip-title",e.attr("title")).removeAttr("title"):void 0}))},_enable:function(){this.disabledTitles.each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))}),this.disabledTitles=t([])},open:function(e){var i=this,s=t(e?e.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&s.parents().each(function(){var e,s=t(this);s.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._registerCloseHandlers(e,s),this._updateContent(s,e))},_updateContent:function(t,e){var i,s=this.options.content,n=this,o=e?e.type:null;return"string"==typeof s||s.nodeType||s.jquery?this._open(e,t,s):(i=s.call(t[0],function(i){n._delay(function(){t.data("ui-tooltip-open")&&(e&&(e.type=o),this._open(e,t,i))})}),i&&this._open(e,t,i),void 0)},_open:function(e,i,s){function n(t){l.of=t,a.is(":hidden")||a.position(l)}var o,a,r,h,l=t.extend({},this.options.position);if(s){if(o=this._find(i))return o.tooltip.find(".ui-tooltip-content").html(s),void 0;i.is("[title]")&&(e&&"mouseover"===e.type?i.attr("title",""):i.removeAttr("title")),o=this._tooltip(i),a=o.tooltip,this._addDescribedBy(i,a.attr("id")),a.find(".ui-tooltip-content").html(s),this.liveRegion.children().hide(),h=t("<div>").html(a.find(".ui-tooltip-content").html()),h.removeAttr("name").find("[name]").removeAttr("name"),h.removeAttr("id").find("[id]").removeAttr("id"),h.appendTo(this.liveRegion),this.options.track&&e&&/^mouse/.test(e.type)?(this._on(this.document,{mousemove:n}),n(e)):a.position(t.extend({of:i},this.options.position)),a.hide(),this._show(a,this.options.show),this.options.track&&this.options.show&&this.options.show.delay&&(r=this.delayedShow=setInterval(function(){a.is(":visible")&&(n(l.of),clearInterval(r))},t.fx.interval)),this._trigger("open",e,{tooltip:a})}},_registerCloseHandlers:function(e,i){var s={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var s=t.Event(e);s.currentTarget=i[0],this.close(s,!0)}}};i[0]!==this.element[0]&&(s.remove=function(){this._removeTooltip(this._find(i).tooltip)}),e&&"mouseover"!==e.type||(s.mouseleave="close"),e&&"focusin"!==e.type||(s.focusout="close"),this._on(!0,i,s)},close:function(e){var i,s=this,n=t(e?e.currentTarget:this.element),o=this._find(n);return o?(i=o.tooltip,o.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&!n.attr("title")&&n.attr("title",n.data("ui-tooltip-title")),this._removeDescribedBy(n),o.hiding=!0,i.stop(!0),this._hide(i,this.options.hide,function(){s._removeTooltip(t(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete s.parents[e]}),o.closing=!0,this._trigger("close",e,{tooltip:i}),o.hiding||(o.closing=!1)),void 0):(n.removeData("ui-tooltip-open"),void 0)},_tooltip:function(e){var i=t("<div>").attr("role","tooltip"),s=t("<div>").appendTo(i),n=i.uniqueId().attr("id");return this._addClass(s,"ui-tooltip-content"),this._addClass(i,"ui-tooltip","ui-widget ui-widget-content"),i.appendTo(this._appendTo(e)),this.tooltips[n]={element:e,tooltip:i}},_find:function(t){var e=t.data("ui-tooltip-id");return e?this.tooltips[e]:null},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_appendTo:function(t){var e=t.closest(".ui-front, dialog");return e.length||(e=this.document[0].body),e},_destroy:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur"),o=s.element;n.target=n.currentTarget=o[0],e.close(n,!0),t("#"+i).remove(),o.data("ui-tooltip-title")&&(o.attr("title")||o.attr("title",o.data("ui-tooltip-title")),o.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}}),t.uiBackCompat!==!1&&t.widget("ui.tooltip",t.ui.tooltip,{options:{tooltipClass:null},_tooltip:function(){var t=this._superApply(arguments);return this.options.tooltipClass&&t.tooltip.addClass(this.options.tooltipClass),t}}),t.ui.tooltip});
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


/*! SPWidgets v2.5.4 2016-09-09 | MIT | Copyright (c) 2016 Paul Tavares | http://purtuga.github.io/SPWidgets */
;(function() {
var src_spapi_getSiteUrl, src_sputils_cache, src_spapi_getList, src_sputils_doesMsgHaveError, src_spapi_getListFormCollection, src_sputils_getNodesFromXml, src_spapi_getListItems, src_sputils_getMsgError, src_spapi_updateListItems, src_sputils_fillTemplate, src_uiutils_makeSameHeight, src_uiutils_addHoverEffect, text_src_boardWidget_boardhtml, less_src_boardWidget_board, src_boardWidget_board, text_src_dateFieldWidget_dateFieldhtml, src_sputils_getDateString, src_sputils_parseDateString, less_src_dateFieldWidget_dateField, src_dateFieldWidget_dateField, text_src_lookupFieldWidget_lookupFieldhtml, src_sputils_getCamlLogical, src_sputils_parseLookupFieldValue, src_sputils_xmlEscape, less_src_lookupFieldWidget_lookupField, src_lookupFieldWidget_lookupField, text_src_peoplePickerWidget_peoplePickerhtml, src_spapi_searchPrincipals, src_spapi_resolvePrincipals, less_src_peoplePickerWidget_peoplePicker, src_peoplePickerWidget_peoplePicker, text_src_filterPanelWidget_filterPanelhtml, text_src_filterPanelWidget_filterPanelColumnhtml, text_src_filterPanelWidget_filterPanelChoiceFieldhtml, text_src_filterPanelWidget_filterPanelTextFieldhtml, less_src_filterPanelWidget_filterPanel, src_filterPanelWidget_filterPanel, text_src_uploadWidget_uploadhtml, src_sputils_getSPVersion, less_src_uploadWidget_upload, src_uploadWidget_upload, src_spapi_getSiteListCollection, src_spapi_getUserProfile, src_SPWidgets;
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
  src_spapi_getList = function ($, cache, getSiteUrl) {
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
     * @param {Function} [options.completefunc=null]
     *      Deprecated. Use returned promise to process response.
     *
     * @return {jQuery.Promise}
     *          Resolved with 3 input params: data, textStatus, jqXHR
     *
     */
    var getList = function () {
      var getListData = null, callerFn = function getList() {
          return getListData.apply(this, arguments);
        };
      // Define defaults. User can change these on their function attachement.
      callerFn.defaults = {
        listName: '',
        webURL: '',
        cacheXML: true,
        async: true,
        completefunc: null
      };
      // Makes the ajax call to sharepoint and returns a jQuery.promise
      getListData = function (opt) {
        var options = $.extend({}, callerFn.defaults, opt), reqPromise;
        if (!options.webURL) {
          options.webURL = getSiteUrl();
        } else if (options.webURL.charAt(options.webURL.length - 1) !== '/') {
          options.webURL += '/';
        }
        options.webURL += '_vti_bin/Lists.asmx';
        options.cacheKey = options.webURL + '?List=' + options.listName;
        options.isCached = cache.isCached(options.cacheKey);
        // If cacheXML is true and we have a cached version, return it.
        if (options.cacheXML && options.isCached) {
          reqPromise = cache(options.cacheKey);
          // If a completefunc was defined on this call,
          // execute it.
          if ($.isFunction(options.completefunc)) {
            reqPromise.then(function (data, textStatus, jqXHR) {
              options.completefunc(jqXHR, textStatus);
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
            data: '<?xml version="1.0" encoding="utf-8"?>' + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' + '<soap:Body><GetList xmlns="http://schemas.microsoft.com/sharepoint/soap/"><listName>' + options.listName + '</listName></GetList></soap:Body></soap:Envelope>'
          }).done(function (data, textStatus, jqXHR) {
            dfd.resolveWith($, [
              data,
              textStatus,
              jqXHR
            ]);
            if ($.isFunction(options.completefunc)) {
              // Call the complete function (same signature as SPServices)
              options.completefunc(jqXHR, textStatus);
            }
          }).fail(function () {
            dfd.rejectWith($, arguments);
            // If cacheXML was true, then remove this from cache.
            // No point in caching failures.
            if (options.cacheXML) {
              cache.clear(options.cacheKey);
            }
          });
        }).promise();
        // If cacheXML was true, then cache this promise
        if (options.cacheXML) {
          cache(options.cacheKey, reqPromise);
        }
        return reqPromise;
      };
      //end: function()
      return callerFn;
    }();
    //end: .getList()
    return getList;
  }(jquery, src_sputils_cache, src_spapi_getSiteUrl);
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
      var $msg = $(xmlMsg), spErrCode = $msg.find('ErrorCode'), response = false;
      if (!spErrCode.length) {
        if ($msg.find('faultcode').length) {
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
  src_sputils_getNodesFromXml = function ($) {
    /**
     * Returns the requested nodes from the given xml document
     *
     * @param {Object} options
     * @param {XMLDocument} options.xDoc
     * @param {String} options.nodeName
     * @param {Boolean} [options.asJQuery=false]
     *      If true, then xmlNodes will be returned as a jQuery
     *      selection object, ready to be traversed and/or filtered.
     * @param {Boolean} [options.cleanAttr=true]
     *      if true, the 'ows_' will be stripped from column names.
     *      Only used when asJQuery=false.
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
          cleanAttr: true
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
            }  // Code below commented off because replacing the space does not really
               // indicate that it is external name.
               // if (name.indexOf("_x0020_") > -1) {
               //
               // name = name.replace(/_x0020_/g, " ");
               //
               // }
          }
          row[name] = attrs[x].value;
        }
        // Also store the original xml node
        row.___xmlNode = ele;
        return row;
      };
      for (i = 0, j = nodes.length; i < j; i++) {
        nodeList.push(getNodeAsObj(nodes[i]));
      }
      return nodeList;
    };
    //end: API.getNodesFromXml
    return getNodesFromXml;
  }(jquery);
  src_spapi_getListItems = function ($, cache, getSiteUrl, getNodesFromXml, doesMsgHaveError) {
    /**
     * Method to retrieve data from a SharePoint list using GetListItems or
     * GetListItemChangesSinceToken operations of the List.axps webservice.
     * @function
     *
     * @param {Object} opt
     *      Supports same input options as SPServices
     * @param {Object} opt.listName
     * @param {String} [opt.webURL="currentSiteWeb"]
     * @param {String} [opt.viewName=""]
     * @param {String} [opt.CAMLViewFields=""]
     * @param {String} [opt.CAMLQuery=""]
     * @param {String} [opt.CAMLQueryOptions=""]
     * @param {String|Number} [opt.CAMLRowLimit=""]
     * @param {String} [opt.operation="GetListItems"]
     *      Value Could also be set to "GetListItemChangesSinceToken".
     * @param {Boolean} [opt.changeToken=""]
     *      Used only when opt.operation is "GetListItemChangesSinceToken"
     * @param {Boolean} [opt.cacheXML=false]
     * @param {Boolean} [opt.async=true]
     * @param {Function} [opt.completefunc=null]
     *      Function given 3 input parameters:
     *      jqXHR (an Object)
     *      status (a String)
     *      rows (Array of Objects)
     *
     * @return {jQuery.Promise}
     *      Promise is resolved with 3 input parameters:
     *      Array = rows (could be empty if error)
     *      Object = jqXHR
     *      String = status
     *
     * Dependencies:
     *
     *  namespace.getSiteUrl()
     *  namespace.getNodesFromXml()
     *  namespace.doesMsgHaveError()
     *  namespace.cache()
     *
     *
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
        changeToken: ''  // GetListChangesSinceToken only
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
                nodeName: 'z:row'
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
  }(jquery, src_sputils_cache, src_spapi_getSiteUrl, src_sputils_getNodesFromXml, src_sputils_doesMsgHaveError);
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
      },
      //end: getUpdateArray
      /**
       * Makes updates to list items in Sharepoint Lists and Libraries. For more
       * information on this method, see {@link https://msdn.microsoft.com/en-us/library/lists.lists.updatelistitems(v=office.12).aspx}
       *
       * @function
       *
       * @param {Object} options
       * @param {String} options.listName
       * @param {String, Object, Array<Array>, Array<Object>, Array<String>} options.updates
       *      A String, Object or an Array containing any of those types.
       * @param {Object} [options.webUrl=current_site]
       * @param {Object} [options.async=true]
       * @param {String} [options.updateType='Update']
       *      Used when the updates paramter is a non-string. The value will be used
       *      to set the Cmd on the update. Valid values are 'Update' (default),
       *      'New' and 'Delete'. Note that when using 'Udpate' and 'Delete' your
       *      updates must include the ID property so that SharePoint knows on what
       *      item it needs to act on.
       *      {@link https://msdn.microsoft.com/en-us/library/ms459050(v=office.12).aspx}
       * @param {String} [options.updateOnError='Continue']
       *      Value is used on the Batch element to indicate what should be done if
       *      an error is encountered. Valid values include 'Continue' (default) and
       *      'Return'. {@link https://msdn.microsoft.com/en-us/library/ms437562(v=office.12).aspx}
       * @param {Object} [options.completefunc=null]
       *      Deprecated.
       * @param {Object} [options.ID=null]
       *      Deprecated. Here for backwards compatability with SPServices
       * @param {Object} [options.valuepairs=null]
       *      Deprecated. Here for backwards compatability with SPServices
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
        opt._updates = getUpdateArray(opt).join('');
        if (!/<\/Batch>/.test(opt._updates)) {
          opt._updates = '<Batch OnError="Continue">' + opt._updates + '</Batch>';
        }
        // FIXME: support for large set of updates - batch processing.
        return $.Deferred(function (dfd) {
          $.ajax({
            type: 'POST',
            cache: false,
            async: opt.async,
            url: opt.webURL + '_vti_bin/Lists.asmx',
            beforeSend: function (xhr) {
              xhr.setRequestHeader('SOAPAction', 'http://schemas.microsoft.com/sharepoint/soap/UpdateListItems');
            },
            contentType: 'text/xml;charset=utf-8',
            dataType: 'xml',
            data: '<?xml version="1.0" encoding="utf-8"?>' + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' + '<soap:Body><UpdateListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">' + '<listName>' + opt.listName + '</listName><updates>' + opt._updates + '</updates></UpdateListItems></soap:Body></soap:Envelope>',
            complete: function (data, status) {
              if ($.isFunction(opt.completefunc)) {
                opt.completefunc.call($, data, status);
              }
            }  //end: $.ajax().success()
          }).always(function (data, status, jqXHR) {
            var
            /**
             * Response object returned by updateListItems.
             *
             * @typedef updateListItemsResponse
             * @property {String} status
             *      The status of the update. Value will be
             *      either 'error' or 'success'
             * @property {String} message
             *      The message string. For a status of success, this
             *      will just be "Update successful.". For a status of
             *      error, this will include the errors returned by sharepoint.
             * @property {Object|jQuery.jqXHR} httpData
             * @property {Object|jQuery.jqXHR} xhrRequest
             */
            response = {
              status: '',
              //error || success
              message: '',
              // message if any
              httpData: data,
              xhrRequest: jqXHR
            };
            // Error HTTP code received.
            if (status === 'error') {
              response.status = 'error';
              response.message = data.statusText || 'HTTP error.';
              dfd.rejectWith($, [response]);  // Success HTTP response - but was it successful?
            } else {
              // If a SP processing error was encoutered, then
              // reject the deferred.
              if (doesMsgHaveError(data)) {
                response.status = 'error';
                response.message = getMsgError(data);
                dfd.rejectWith($, [response]);  // Else, SP processing was successful
              } else {
                response.status = 'success';
                response.message = 'Update Successful.';
                dfd.resolveWith($, [response]);
              }
            }
          });
        }).promise();  //end: return promise
      };
    //end: updateListItems()
    // Define defaults. User can change these on their function attachment.
    updateListItems.defaults = {
      listName: '',
      webURL: '',
      async: true,
      completefunc: null,
      updates: '',
      updateType: 'Update',
      updateOnError: 'Continue'
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
  src_boardWidget_board = function ($, getSiteUrl, getList, getListFormCollection, getListItems, updateListItems, getNodesFromXml, fillTemplate, makeSameHeight, addHoverEffect, doesMsgHaveError, getMsgError, boardTemplate) {
    /**
     * Displays data from a list in Kan-Ban board using a specific column from
     * that list.  Column (at this point) is assume to be a CHOICE type of field.
     * @namespace board
     */
    var Board = {}, showBoard;
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
          getBoardStates: function () {
            return $.Deferred(function (dfd) {
              // Get List information (use cached if already done in prior calls)
              // and get list of States to build
              getList({
                listName: opt.list,
                cacheXML: true,
                async: false,
                webURL: opt.webURL,
                completefunc: function (xData, status) {
                  // FIXME: need to handle errors
                  // if (resp.hasSPError()) {
                  // spAgile.logMsg({
                  // type:   "error",
                  // msg:    resp.getSPError()
                  // });
                  // return null;
                  // }
                  var resp = $(xData.responseXML), f = resp.find('Fields Field[StaticName=\'' + opt.field + '\']');
                  // If we did not find the field by internal name, try external.
                  // If we found it by Display name, then lets change the
                  // field value... We need internal name for referencing
                  // item column values.
                  if (!f.length) {
                    f = resp.find('Fields Field[DisplayName=\'' + opt.field + '\']');
                    if (!f.length) {
                      dfd.rejectWith(ele, [
                        'Field (' + opt.field + ') not found in list definition!',
                        xData,
                        status
                      ]);
                      return;
                    }
                    opt._origField = opt.field;
                    opt.field = f.attr('StaticName');
                  }
                  // store if field is required
                  if (f.attr('Required') === 'TRUE') {
                    opt.isStateRequired = true;
                  }
                  // Override the calculated required state attribute
                  // if user set allowFieldBlanks on input
                  if (typeof opt.allowFieldBlanks === 'boolean') {
                    opt.isStateRequired = !opt.allowFieldBlanks;
                  }
                  switch (f.attr('Type').toLowerCase()) {
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
                    f.find('CHOICES CHOICE').each(function (i) {
                      var thisChoice = $(this).text();
                      // if there i sa filter and this column
                      // is not part of it, exit now
                      if (opt.fieldFilter) {
                        if (!$.grep(opt.fieldFilter, function (e) {
                            return e === thisChoice;
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
                        return false;
                      }
                      opt.states.push({
                        type: 'choice',
                        title: thisChoice,
                        // extenal visible
                        name: thisChoice  // internal name
                      });
                      // Store State value in mapper (use internal name)
                      opt.statesMap[thisChoice] = opt.states[opt.states.length - 1];
                    });
                    dfd.resolveWith(opt, [
                      xData,
                      status
                    ]);
                    break;
                  // LOOKUP COLUMNS
                  case 'lookup':
                    if (!opt.fieldFilter) {
                      opt.fieldFilter = '<Query></Query>';
                    }
                    // Query the lookup table and get the rows that
                    // should be used to build the states
                    getListItems({
                      listName: f.attr('List'),
                      async: true,
                      cacheXML: true,
                      CAMLQuery: opt.fieldFilter,
                      webURL: opt.webURL,
                      CAMLRowLimit: Board.maxColumns,
                      CAMLViewFields: '<ViewFields><FieldRef Name="' + f.attr('ShowField') + '" /></ViewFields>',
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
                        var resp = $(xData.responseXML), $rows;
                        if (doesMsgHaveError(resp)) {
                          dfd.rejectWith(ele, [
                            getMsgError(resp),
                            xData,
                            status
                          ]);
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
                        // Loop thorugh all rows and build the
                        // array of states.
                        $rows = getNodesFromXml({
                          xDoc: xData.responseXML,
                          nodeName: 'z:row',
                          asJQuery: true
                        });
                        $rows.each(function (i) {
                          // If we reached a max column number, exit here.
                          if (i >= Board.maxColumns) {
                            try {
                              console.log('SPWIDGETS:BOARD:Warning: Can only build a max of ' + Board.maxColumns + ' columns!');
                            } catch (e) {
                            }
                            return false;
                          }
                          var thisRow = $(this), thisId = thisRow.attr('ows_ID'), thisTitle = thisRow.attr('ows_' + f.attr('ShowField')), thisName = thisId + ';#' + thisTitle;
                          opt.states.push({
                            type: 'lookup',
                            title: thisTitle,
                            // Extenal visible
                            name: thisName  // internal name
                          });
                          // Store State value in mapper (use internal name)
                          opt.statesMap[thisName] = opt.states[opt.states.length - 1];
                        });
                        dfd.resolveWith(opt, [
                          xData,
                          status
                        ]);
                        return;
                      }  //end: completefunc
                    });
                    break;
                  // DEFAULT: Type on the column is not supported.
                  default:
                    dfd.rejectWith(ele, [
                      'Field (' + opt.field + ') Type (' + f.attr('Type') + ') is not supported!',
                      xData,
                      status
                    ]);
                    break;
                  }
                  return;
                }  //end: completefunc()
              });  //end: getList
            }).promise();
          },
          //end: getBoardStates()
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
                  webURL: opt.webURL,
                  completefunc: function (xData, status, rows) {
                    // Process Errors
                    if (status === 'error') {
                      dfd.rejectWith(ele, [
                        'Communications Error!',
                        xData,
                        status
                      ]);
                      return;
                    }
                    var resp = $(xData.responseXML);
                    if (doesMsgHaveError(resp)) {
                      dfd.rejectWith(ele, [
                        getMsgError(resp),
                        xData,
                        status
                      ]);
                      return;
                    }
                    // Store the list of items
                    opt.listItems = rows;
                    resolveDeferred(resp);
                  }  //end: completefunc()
                });  //end: getListItems
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
           * @param {String|} [options.state=null] The state to be updated
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
    //end: $.fn.SPShowBoard()
    showBoard.defaults = Board.defaults;
    return showBoard;
  }(jquery, src_spapi_getSiteUrl, src_spapi_getList, src_spapi_getListFormCollection, src_spapi_getListItems, src_spapi_updateListItems, src_sputils_getNodesFromXml, src_sputils_fillTemplate, src_uiutils_makeSameHeight, src_uiutils_addHoverEffect, src_sputils_doesMsgHaveError, src_sputils_getMsgError, text_src_boardWidget_boardhtml);
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
  src_filterPanelWidget_filterPanel = function ($, filterPanelTemplate, filterPanelColumnTemplate, filterPanelChoiceFieldTemplate, filterPanelTextFieldTemplate, getSiteUrl, getList, parseLookupFieldValue, fillTemplate, getCamlLogical, xmlEscape, lookupFieldWidget, peoplePickerWidget, dateFieldWidget, doesMsgHaveError, getMsgError) {
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
         * Retrieves the list definition.
         *
         * @return {jQuery.Deferred}
         *      Deferred is resolved with a scope of the jQuery message
         *      object and given 2 parameters - xData and status
         *
         */
        Inst.getListDefinition = function () {
          return $.Deferred(function (dfd) {
            // Get List Definition
            getList({
              listName: opt.list,
              cacheXML: true,
              async: true,
              webURL: opt.webURL,
              completefunc: function (xData, status) {
                var $msg = $(xData.responseXML);
                if (status === 'error') {
                  dfd.rejectWith($msg, [
                    xData,
                    status
                  ]);
                  return;
                }
                if (doesMsgHaveError($msg)) {
                  dfd.rejectWith($msg, [
                    xData,
                    status
                  ]);
                  return;
                }
                dfd.resolveWith($msg, [
                  xData,
                  status
                ]);
              }  //end: completefunc
            });
          }).promise();
        };
        //end: getListDefinition
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
            Inst.getListDefinition().then(function () {
              var $list = this, columns = '', colUI = $.trim(filterPanelColumnTemplate);
              // Insert the UI into the page and set
              // pointer ($ui) to it.
              Inst.$ui = $($.trim(filterPanelTemplate)).appendTo(Inst.$ele.empty().addClass('hasSPFilterPanel'));
              Inst.$uiFilterColumnCntr = Inst.$ui.find('div.spwidget-filter-column-cntr');
              Inst.$uiFilterSortCntr = Inst.$ui.find('div.spwidget-filter-sort-cntr');
              // Store list definition
              Inst.$list = $list;
              // set fixed height if set on input
              if (Inst.opt.height) {
                Inst.$uiFilterColumnCntr.css('height', Inst.opt.height);
              }
              // Loop through list of columns to display and
              // build the UI for them.
              $.each(Inst.opt.columns, function (i, v) {
                // find column in the list definition
                var $thisCol = $list.find('Field[DisplayName=\'' + v + '\']'), thisColUI = colUI, inputUI = '', model = null;
                if (!$thisCol.length) {
                  $thisCol = $list.find('Field[Name=\'' + v + '\']');
                }
                if (!$thisCol.length) {
                  return;
                }
                // Now that we are sure we have a COl. definition,
                // populate the model for this column
                model = {
                  type: null,
                  otherFilterTypes: '',
                  sp_type: $thisCol.attr('Type'),
                  sp_format: $thisCol.attr('Format'),
                  Name: $thisCol.attr('Name'),
                  DisplayName: $thisCol.attr('DisplayName')
                };
                // Build the column ui based on its type
                switch ($thisCol.attr('Type')) {
                // CHOICE: Show checkboxes allowing user to select multiple
                case 'Choice':
                case 'MultiChoice':
                  $thisCol.find('CHOICES CHOICE').each(function (i, v) {
                    inputUI += fillTemplate($.trim(filterPanelChoiceFieldTemplate), {
                      DisplayName: $thisCol.attr('DisplayName'),
                      Name: $thisCol.attr('Name'),
                      value: $(v).text()
                    });
                  });
                  thisColUI = thisColUI.replace(/__COLUMN__UI__/, inputUI).replace(/__OTHER_FILTER_TYPES__/, '');
                  thisColUI = fillTemplate(thisColUI, {
                    DisplayName: $thisCol.attr('DisplayName'),
                    type: 'choice',
                    Name: $thisCol.attr('Name')
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
                  switch ($thisCol.attr('Type')) {
                  case 'Lookup':
                  case 'LookupMulti':
                    if (model.type === null) {
                      model.type = 'lookup';
                      model.list = $thisCol.attr('List');
                      if (model.list === 'Self') {
                        model.list = $list.find('List').attr('Title');
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
                      model.sp_format = $thisCol.attr('Format') !== 'DateOnly' ? 'DateTime' : 'DateOnly';
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
                    DisplayName: $thisCol.attr('DisplayName'),
                    Name: $thisCol.attr('Name'),
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
                var $field = $(this), colDef = $list.find('Field[Name=\'' + $field.attr('name') + '\']'), peopleType = 'User';
                if (colDef.attr('UserSelectionMode') !== 'PeopleOnly') {
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
        if (Inst.opt.ignoreKeywords && !(Inst.opt.ignoreKeywords instanceof RegExp)) {
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
     * @return {Object}
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
     *                  count: 0
     *              }
     *          },
     *          count: 2 // number of filters created
     *      }
     *
     *
     */
    Filter.getFilterValues = function (Inst) {
      var filters = {
          CAMLQuery: '',
          CAMLOrderBy: '',
          URLParams: '',
          filters: {},
          count: 0
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
  }(jquery, text_src_filterPanelWidget_filterPanelhtml, text_src_filterPanelWidget_filterPanelColumnhtml, text_src_filterPanelWidget_filterPanelChoiceFieldhtml, text_src_filterPanelWidget_filterPanelTextFieldhtml, src_spapi_getSiteUrl, src_spapi_getList, src_sputils_parseLookupFieldValue, src_sputils_fillTemplate, src_sputils_getCamlLogical, src_sputils_xmlEscape, src_lookupFieldWidget_lookupField, src_peoplePickerWidget_peoplePicker, src_dateFieldWidget_dateField, src_sputils_doesMsgHaveError, src_sputils_getMsgError);
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
          opt.listName = Upload.getListUID(opt.listName, opt.webURL);
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
     * @param {String} webURL       The name of the list.
     * @return {String}
     * @memberOf jQuery.pt
     *
     */
    Upload.getListUID = function (listName, webURL) {
      if (!listName) {
        return '';
      }
      var id = '';
      getList({
        listName: listName,
        async: false,
        webURL: webURL,
        cacheXML: true,
        completefunc: function (xData) {
          id = $(xData.responseXML).find('List').attr('ID');
        }
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
     * @param {String} accountName
     * @param {String} [webURL=current site]
     * @param {Boolean} [async=true]
     * @param {Boolean} [cacheXML=true]
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
  src_SPWidgets = function ($, board, dateField, lookupField, peoplePicker, filterPanel, upload, getMsgError, doesMsgHaveError, xmlEscape, fillTemplate, getCamlLogical, getSPVersion, parseDateString, parseLookupFieldValue, getDateString, getNodesFromXml, makeSameHeight, getList, getListFormCollection, getListItems, getSiteListCollection, getSiteUrl, getUserProfile, resolvePrincipals, searchPrincipals) {
    $.SPWidgets = {
      defaults: {},
      version: '2.5.4',
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
  }(jquery, src_boardWidget_board, src_dateFieldWidget_dateField, src_lookupFieldWidget_lookupField, src_peoplePickerWidget_peoplePicker, src_filterPanelWidget_filterPanel, src_uploadWidget_upload, src_sputils_getMsgError, src_sputils_doesMsgHaveError, src_sputils_xmlEscape, src_sputils_fillTemplate, src_sputils_getCamlLogical, src_sputils_getSPVersion, src_sputils_parseDateString, src_sputils_parseLookupFieldValue, src_sputils_getDateString, src_sputils_getNodesFromXml, src_uiutils_makeSameHeight, src_spapi_getList, src_spapi_getListFormCollection, src_spapi_getListItems, src_spapi_getSiteListCollection, src_spapi_getSiteUrl, src_spapi_getUserProfile, src_spapi_resolvePrincipals, src_spapi_searchPrincipals);
  (function (c) {
    var d = document, a = 'appendChild', i = 'styleSheet', s = d.createElement('style');
    s.type = 'text/css';
    d.getElementsByTagName('head')[0][a](s);
    s[i] ? s[i].cssText = c : s[a](d.createTextNode(c));
  }('div.spwidget-board{width:100%;position:relative}div.spwidget-board div.spwidget-board-headers,div.spwidget-board div.spwidget-board-headers-cntr,div.spwidget-board div.spwidget-board-states,div.spwidget-board div.spwidget-board-states-cntr{width:100%}div.spwidget-board div.spwidget-board-state{width:49%;float:left;margin:0% .1%;padding:.2%;overflow:auto}div.spwidget-board div.spwidget-board-headers-cntr div.spwidget-board-state{font-weight:700;font-size:1.1em;overflow:hidden;word-wrap:break-word}div.spwidget-board div.spwidget-board-headers-cntr .spwidget-board-header-title,div.spwidget-board div.spwidget-board-headers-cntr .spwidget-state-item-stat-cntr,div.spwidget-board-settings div.spwidget-board-column-list>a>span.ui-icon{display:inline-block}div.spwidget-board div.spwidget-board-headers-cntr .spwidget-state-item-stat-cntr{font-size:.8em;float:right}div.spwidget-board div.spwidget-board-headers-cntr .spwidget-item-stat{display:inline-block;min-width:2em;padding:0 .2em;text-align:center}div.spwidget-board div.spwidget-board-states div.spwidget-board-state{margin-bottom:1em;min-height:10em}div.spwidget-board div.spwidget-board-state div.spwidget-board-state-item{padding:.2em;margin:.5em .2em;font-weight:400;cursor:move;overflow:hidden;word-break:break-word}div.spwidget-board div.spwidget-board-state-item div.spwidget-board-item-actions{margin-top:.2em;padding:.2em .5em;overflow:hidden}div.spwidget-board .spwidget-board-placeholder{height:3em}div.spwidget-board-settings{font-size:.8em;margin:.2em}div.spwidget-board-settings div.spwidget-board-column-list-cntr{z-index:5;position:absolute}div.spwidget-board-settings div.spwidget-board-column-list-cntr>div{padding:.2em}div.spwidget-board-settings div.spwidget-board-column-list-cntr>div:first-child,div.spwidget-board-settings div.spwidget-board-column-list-cntr>div:last-child{text-align:right}div.spwidget-board-settings div.spwidget-board-column-list{width:20em;height:17em;overflow:auto;position:relative}div.spwidget-board-settings div.spwidget-board-column-list-cntr .spwidget-board-msg{position:absolute;top:1px;left:1px;padding:.2em}.spwidget-date-cntr div.spwidget-date-input-cntr,div.spwidget-board-settings div.ui-state-default{position:relative}div.spwidget-board-settings div.spwidget-board-column-list>a{display:block;margin:.2em;padding:.2em}div.spwidget-board .spwidget-states-3 div.spwidget-board-state{width:32.4%}div.spwidget-board .spwidget-states-4 div.spwidget-board-state{width:24%}div.spwidget-board .spwidget-states-5 div.spwidget-board-state{width:19.1%}div.spwidget-board .spwidget-states-6 div.spwidget-board-state{width:15.8%}div.spwidget-board .spwidget-states-7 div.spwidget-board-state{width:13.4%}div.spwidget-board .spwidget-states-8 div.spwidget-board-state{width:11.6%}div.spwidget-board .spwidget-states-9 div.spwidget-board-state{width:10.2%}div.spwidget-board .spwidget-states-10 div.spwidget-board-state{width:9.1%}.spwidget-date-cntr{display:inline-block;position:relative}.pt-pickSPUser div.pt-pickSPUser-input input.ui-autocomplete,.spwidget-date-cntr input,.spwidgets-lookup-cntr .spwidgets-lookup-input input{width:99%}.spwidget-date-cntr img.ui-datepicker-trigger{display:block;position:absolute;right:2%;top:.3em}.spwidget-date-cntr .spwidgets-item-remove{color:red;font-size:xx-small;vertical-align:super;cursor:pointer}.spwidget-date-cntr div.spwidget-datetime-selector{padding:.5em;position:absolute;width:28em;z-index:1}.spwidget-date-cntr div.spwidget-datetime-selector div.ui-datepicker-inline{width:14em}.spwidget-date-cntr div.spwidget-datetime-selector div.spwidget-date-selector,.spwidget-date-cntr div.spwidget-datetime-selector div.spwidget-time-selector{float:left}.spwidget-date-cntr div.spwidget-selectors:after,.spwidget-date-cntr div.spwidget-selectors:before{content:"";display:table;line-height:0}.spwidget-date-cntr div.spwidget-selectors:after{clear:both}.spwidget-date-cntr div.spwidget-datetime-selector select.spwidget-ampm,.spwidget-date-cntr div.spwidget-datetime-selector select.spwidget-hour,.spwidget-date-cntr div.spwidget-datetime-selector select.spwidget-min{font-size:1.2em}.spwidget-date-cntr div.spwidget-time-selector{margin-left:.2em;width:11em}.spwidget-date-cntr div.spwidget-time-selector-cntr{padding:.2em}.spwidget-date-cntr div.spwidget-time-selector div.ui-widget-header{text-align:center;line-height:2em;margin-bottom:.5em}.spwidget-date-cntr .spwidget-time-ampm,.spwidget-date-cntr .spwidget-time-hour,.spwidget-date-cntr .spwidget-time-min{margin-top:.2em;padding:.2em}.spwidget-date-cntr .spwidget-time-selector-cntr label,.spwidget-date-cntr .spwidget-time-selector-cntr select{overflow:hidden;display:inline-block;font-weight:700}.spwidget-date-cntr .spwidget-time-selector-cntr select{width:4em}.spwidget-date-cntr .spwidget-time-selector-cntr label{width:5em;font-size:.9em}.spwidget-date-cntr .spwidget-inline div.spwidget-datetime-selector{position:relative;width:26em}.spwidget-btn-set{display:none;position:absolute;right:.2em;bottom:.2em}.spwidget-date-multiples-cntr .spwidget-btn-set,div.spwidget-filter .spwidget-date-cntr,div.spwidget-filter .spwidgets-lookup-cntr,div.spwidget-filter div.spwidget-column-actions a{display:block}.spwidgets-lookup-cntr{position:relative;display:inline-block;zoom:1;*display:inline}.spwidgets-lookup-cntr .spwidgets-lookup-selected{-moz-appearance:textfield;-webkit-appearance:textfield;background-color:#fff;background-color:-moz-field;border:1px solid #a9a9a9;box-shadow:1px 1px 1px 0 #d3d3d3 inset;font:-moz-field;font:-webkit-small-control;margin-top:5px;padding:2px 5px}.spwidgets-lookup-cntr .spwidgets-lookup-selected .spwidgets-item{display:inline-block;margin-left:.5em}.spwidgets-lookup-cntr .spwidgets-item:first-child{margin-left:0}.spwidgets-lookup-cntr .spwidgets-item-remove{color:red;font-size:xx-small;vertical-align:super;cursor:pointer}.spwidgets-lookup-cntr .spwidgets-lookup-input{margin:.2em 0;position:relative}.spwidgets-lookup-cntr ul.ui-autocomplete{overflow:auto;z-index:1}.spwidgets-lookup-cntr div.spwidget-lookup-readyonly .spwidgets-lookup-selected{-moz-appearance:none;-webkit-appearance:none;background-color:transparent;border:none;box-shadow:none;font:inherit}.spwidgets-lookup-cntr div.spwidget-lookup-readyonly .spwidgets-item-remove{display:none}.spwidgets-lookup-cntr .spwidget-lookup-selector-showhide{background-repeat:no-repeat;background-image:url(/_layouts/images/bizdatacontentsource.gif);cursor:pointer;display:block;position:absolute;text-indent:-99999px;z-index:5;height:16px;width:16px;right:5px;top:.3em}.spwidgets-lookup-cntr div.spwidget-lookup-selector-cntr{display:none;position:absolute;left:0;z-index:10;padding:.2em;width:98%;font-size:.8em}.spwidgets-lookup-cntr div.spwidget-lookup-selector-cntr>.ui-state-default{padding:.2em;text-align:right}.spwidgets-lookup-cntr div.spwidget-lookup-selector-item-cntr{height:15em;overflow:auto;padding:.2em;font-size:1em}.spwidgets-lookup-cntr div.spwidget-lookup-selector-item-cntr .ui-state-highlight{padding:.5em;margin:1em .2em;text-align:center;font-size:1.1em;font-weight:700}.spwidgets-lookup-cntr div.spwidget-lookup-selector-item-cntr .spwidget-lookup-selector-next{cursor:pointer}.spwidgets-lookup-cntr div.spwidget-lookup-selector-item-cntr .spwidget-lookup-item{padding:.2em .5em;margin:.2em;cursor:pointer;font-weight:400}.pt-pickSPUser .pt-pickSPUser-selected .pt-pickSPUser-person{float:left;margin-left:.2em}.pt-pickSPUser .pt-pickSPUser-hint{font-size:.9em}.pt-pickSPUser div.pt-pickSPUser-input ul.ui-autocomplete{z-index:1}.pt-pickSPUser .pt-pickSPUser-person-cntr{margin:.2em 0;padding:.2em;position:relative}.pt-pickSPUser .pt-pickSPUser-person-cntr .pt-person-name{padding-right:2em}.pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions{position:absolute;right:1px;top:1px;padding:.2em;display:none}.pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions .pt-pickSPUser-person-action-links,.pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions .pt-pickSPUser-person-action-links .tt-confirm-delete{float:right}.pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions a,.pt-pickSPUser .pt-pickSPUser-person-cntr .pt-pickSPUser-person-actions.tt-confirm,.pt-pickSPUser .pt-pickSPUser-person-cntr.ui-state-hover .pt-pickSPUser-person-actions{display:block;float:right}.ui-autocomplete-loading{background:#fff url(/_layouts/images/loading.gif) right center no-repeat}div.spwidget-filter{width:100%;position:relative}div.spwidget-filter .spwidget-filter-column-cntr{overflow:auto;position:relative}div.spwidget-filter .spwidget-type-people input.ui-autocomplete-input,div.spwidget-filter .spwidget-type-text input.spwidget-filter-input,div.spwidget-filter div.spwidget-type-choice div.spwidget-filter-value-input{width:95%}div.spwidget-filter .spwidgets-lookup-cntr{width:96%}div.spwidget-filter .spwidget-date-cntr div.spwidget-date-input-cntr{width:97%}div.spwidget-filter div.spwidget-column{padding:.5em;margin:.5em;position:relative;border-bottom:1px solid #a9a9a9;box-shadow:1px 1px 1px 0 #d3d3d3 inset}div.spwidget-filter div.spwidget-column-actions{position:absolute;right:1%;top:10%}div.spwidget-filter div.spwidget-column-sort-actions{display:none}div.spwidget-filter div.spwidget-has-sort-order div.spwidget-column-sort-actions{display:block}div.spwidget-filter div.spwidget-column-actions a,div.spwidget-filter div.spwidget-filter-type-cntr{opacity:.6;filter:alpha(opacity=60)}div.spwidget-filter div.spwidget-column-actions a:hover,div.spwidget-filter div.spwidget-filter-type-cntr:hover{opacity:1}div.spwidget-filter div.spwidget-filter-type-cntr{position:absolute;font-size:.8em;top:.6em;right:8%}div.spwidget-filter div.spwidget-filter-type-cntr select{text-overflow:ellipsis;width:5em}div.spwidget-filter div.spwidget-filter-value-cntr{width:96%}div.spwidget-filter div.spwidget-filter-value-cntr>label{display:block;padding:.2em;font-weight:700}div.spwidget-filter div.spwidget-column-dirty div.spwidget-filter-value-cntr>label{color:red}div.spwidget-filter .spwidget-tooltip{display:block;font-size:.8em;font-style:italic}div.spwidget-filter div.spwidgets-lookup-cntr div.spwidgets-lookup-selected>div.spwidgets-item{display:block;margin-left:0}div.spwidget-filter div.spwidget-type-choice div.spwidget-filter-value-input{max-height:6em;overflow:auto;-moz-appearance:textfield;-webkit-appearance:textfield;background-color:#fff;background-color:-moz-field;border:1px solid #a9a9a9;box-shadow:1px 1px 1px 0 #d3d3d3 inset;font:-moz-field;font:-webkit-small-control;padding:2px 5px}div.spwidget-filter div.spwidget-type-choice div.spwidget-filter-value-input label{display:block;padding:.2em}div.spwidget-filter .spwidget-disabled{-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50);opacity:.5}div.spwidget-filter div.spwidget-filter-button-cntr{padding:.5em 4%;margin-top:.5em;text-align:right}.spcontrolupload .mainContainer{position:relative;display:block;height:4em}.spcontrolupload .buttonPane,.spcontrolupload .iFrameWindow{position:absolute;top:0;height:3em}.spcontrolupload .loadingOverlay,.spcontrolupload .spwidget-success-cntr{position:absolute;top:0;height:3em;width:100%}.spcontrolupload .buttonPane{left:0;width:10%;overflow:hidden;cursor:pointer}.spcontrolupload .buttonPane .upload_button{font-weight:700;font-size:1.1em;text-align:center;margin-top:.8em}.spcontrolupload .iFrameWindow{width:90%;left:10%;overflow:hidden}.spcontrolupload .iFrameWindow iframe{overflow:auto;width:100%;height:99%}.spcontrolupload .spwidget-show-full-form .iFrameWindow{overflow:auto;width:100%;margin:0;left:0;right:auto;z-index:5}.spcontrolupload .loadingOverlayMsg{font-size:1em;background-position:left top;background-repeat:no-repeat;background-image:url(/_layouts/images/loadingcirclests16.gif);margin:.5em;padding-left:25px}.spcontrolupload .spwidget-error-cntr,.spcontrolupload .spwidget-success-cntr{display:none}.spcontrolupload div.spwidget-msg-cntr{margin:.5em .5em .5em 3em;font-size:1em;background-position:left top;background-repeat:no-repeat}.spcontrolupload .spwidget-close{color:red;font-size:xx-small;font-weight:700;vertical-align:super;cursor:pointer}.spcontrolupload .spwidget-success-cntr div.spwidget-msg-cntr{background-image:url(/_layouts/images/STS_ListItem_43216.gif);padding-left:30px}.spcontrolupload .spwidget-error-cntr{bottom:-1.5em;left:0;width:100%;position:absolute}.spcontrolupload-dev-mode .iFrameWindow{overflow:auto!important;height:auto!important;z-index:5!important}.spcontrolupload-dev-mode .iFrameWindow iframe{overflow:scroll!important}'));
}));
}());
/**
 * @fileOverview demo.common.js
 * Common file for all demos. Initiates the UI on the page.
 *
 * @version 1473439134741
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

                $('<div style="display:none;"/>')
                    .load(
                        String(
                                $.SPWidgets.SPAPI.getSiteUrl() +
                                "Lists/" + listName + "/NewForm.aspx"
                            )
                            .replace(/ /, "%20") +
                            " .ms-formtable",
                        function(){

                            var $ele = $(this),
                                cols = ['ID'];

                            $ele.find(".ms-standardheader").each(function(){

                                cols.push( $.trim( $(this).text().replace(/ \*/, "") ) );

                            });

                            dfd.resolveWith($, [cols]);

                            $ele.remove();

                        }
                    );

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

