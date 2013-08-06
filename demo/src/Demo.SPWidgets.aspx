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
</style>

</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderSearchArea" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderLeftActions" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageDescription" runat="server">
SPWidgets - Widgets for building custom UIs
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderBodyRightMargin" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageImage" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderLeftNavBar" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderNavSpacer" runat="server"></asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">

<script type="text/javascript">
/** 
 * SPWidgets Demo
 * 
 * Build Date:  _BUILD_VERSION_DATE_
 * Version:     _BUILD_VERSION_NUMBER_ 
 * 
 */
</script>
<div id="spwidgets_demo_cntr" class="ui-widget-content" style="display:none;">
    
<div class="spwidgets-demo-cntr">
    
    <div class="spwidgets-demo-top-banner ui-state-active">
        <h1>Demo of SPWidgets</h1>
        <p class="ui-widget-content ui-corner-all">
            SPWidgets is a set of Sharepoint widgets meant to facilitate the 
            building of custom UI's. This demo contains a showcase of the widgets 
            that are available and serves to only scratch at the possibilities 
            of what can be accomplished with them.  Visit the project at 
            <a href="http://purtuga.github.io/SPWidgets/">purtuga.github.io/SPWidgets</a>
        </p> 
    </div>
    <div id="ptTabsCntr" style="display: none;">
        <ul>
            <li><a href="#SPControlUploadDemo"><span>Upload</span></a></li>
            <li><a href="#SPControlPickUserDemo"><span>People Picker</span></a></li>
            <li><a href="#SPControlBoardDemo"><span>Board</span></a></li>
            <li><a href="#SPControlLookupFieldDemo"><span>Lookup Field</span></a></li>
            <li><a href="#SPControlListFilterPanel"><span>List Filter Panel</span></a></li>
            <li><a href="#SPDateField"><span>Date Field</span></a></li>
            <li><a href="#SPWidgetsAbout"><span class="ui-icon ui-icon-info">Info</span></a></li>
        </ul>
        <div id="SPControlUploadDemo">
            <h2>Upload Plugin</h2>
            <div style="padding: 1em;margin: 3em auto;" class="ui-state-highlight">
                Once an existing Document Library is selected, you will be presented 
                with an upload button that will allow you to upload files to the 
                root of the library selected.
            </div>
            <div>
                <div id="sp_control_library_name"></div>
                <div id="sp_control_file_list" style="margin-bottom:2em;padding:.5em;padding-left:1.5em;"></div>
            </div>
            <hr/>
            <h3>Upload New File</h3>
            <div id="sp_control_upload_file">
                <div>
                    <button type="button" name="upload" value="">Upload</button>
                </div>
                <div id="sp_upload_widget"></div>
            </div>
        </div>
        
        <div id="SPControlPickUserDemo">
            <h2>People Picker</h2>
            <div style="min-height: 300px;">
                <div style="padding: 1em;margin: 3em auto;" class="ui-state-highlight">
                    Start typing the user\'s name (last or first) and a list of
                    suggested selections will be displayed. Because it is using jQuery
                    UI, mouse or keyboard shortcuts can be used to select a user. The
                    input field that was used to bind this plugin will be populated with
                    the selected user\'s information in the formta expected for update to
                    the sharepoing list (ID;#userName)
                </div>
                
                <div>
                    <div>
                        <label>User Name</label>
                        <input type="text" name="spuserdemo" value="" />
                        <div id="sp_control_pick_user_detail" style="margin-top: 1em;padding:1em;"></div>
                        
                    </div>
                    <div>
                        <h4>Events Output</h4>
                        <div id="SPControlPickUserEventOut">
                            
                        </div>
                    </div>
                        
                </div>
                
            </div>
        </div>
        
        <div id="SPControlBoardDemo">
            
            <h2>Kan-Ban Board Widget</h2>
            
            <div class="spwidget-demo-tabs">
                <ul>
                    <li>
                        <a href="#spwidgets_demo_board_demo">
                            <span>Demo</span>
                        </a>
                    </li>
                    <li>
                        <a href="#spwidgets_demo_board_output">
                            <span>Output</span>
                        </a>
                    </li>
                    <li>
                        <a href="#spwidgets_demo_board_about">
                            <span>About</span>
                        </a>
                    </li>
                </ul>
                <div id="spwidgets_demo_board_demo">
                    
                    <p>
                        Click below to select a list followed by a column from
                        that list. Reminder: Column must be of a type supported
                        by the widget. 
                    </p>
                    
                    <div class="spwidgets-demo-lists"></div>
                    <div class="spwidgets-demo-columns"></div>
                    
                    <div class="spwidget-board-demo-cntr"></div>
                    
                </div>
                <div id="spwidgets_demo_board_output">
                    
                    <p>
                    Events fired by the widget will populate data here.
                    </p>
                    
                    <div class="spwidget-demo-code ui-widget-content ui-corner-all"></div>
                    
                </div>
                <div id="spwidgets_demo_board_about">
                    
                    <p>
                    The Board widget displays a Kan-Ban type board for list items, allowing
                    the user to quickly move items around between states. The example below
                    is using the Tasks List commonly used in all Sharepoint Sites, and
                    specifically, the Status Field of that List.
                    </p>
                    
                </div>
            </div>
            
        </div>
        
        <div id="SPControlLookupFieldDemo">
            <h2>Lookup Field Widget</h2>
            
            <div class="spwidget-demo-fluid spwidget-demo-float-cntr">
                <div class="ui-widget-content ui-corner-all spwidget-demo-float">
                    
                    <p>Click below to select a List.</p>
                    <div class="spwidgets-demo-lists"></div>
                    
                    <div class="spwidgets-demo-lookup-examples">
                        <div>
                            <h3>Example 1</h3>
                            <p>Field below allows user to pick only 1 value.</p>
                            <div>
                                <input name="example1" value="" />
                            </div>
                        </div>
                
                        <div>
                            <h3>Example 2</h3>
                            <p>Field below allows user to select
                                mulitple values (multi-select).</p>
                            <div>
                                <input name="example2" value="" />
                            </div>
                        </div>
                        
                        <div>
                            <h3>Example 3</h3>
                            <p>Field below allows user to select
                                mulitple values (multi-select) and displays
                                the selector, which allows the user the ability
                                to "browse" the list looking for the correct value.</p>
                            <div>
                                <input name="example3" value="" />
                            </div>
                            <div class="spwidgets-dev-only">
                                <a href="javascript:" class="spwidgets-demo-lookup-example3-clear-all">Clear All</a>
                            </div>
                        </div>
                        
                    </div>
                    
                    
                </div>
                <div class="spwidget-demo-float">
                    <div class="spwidget-demo-tabs">
                        <ul>
                            <li>
                                <a href="#spwidgets_demo_lookup_output">
                                    <span>Output</span>
                                </a>
                            </li>
                            <li>
                                <a href="#spwidgets_demo_lookup_about">
                                    <span>About</span>
                                </a>
                            </li>
                        </ul>
                        <div id="spwidgets_demo_lookup_output">
                            
                            <p>
                                Area below will capture out of events from the demo.
                            </p>
                            
                            <div class="spwidget-demo-code ui-widget-content ui-corner-all"></div>
                            
                        </div>
                        
                        <div id="spwidgets_demo_lookup_about">
                            
                            <p>
                            The Lookup Field widget provides a custom interface for List/Library
                            field of type Lookup. It turns an input field into a Type-Ahead/autocomplete
                            field allowing the user to start typing values and select a match from
                            the suggestion.
                            </p>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>
        
        <div id="SPControlListFilterPanel">
            
            <h2>List Filter Widget Demo</h2>
            
            <div class="spwidget-demo-fluid spwidget-demo-float-cntr">
                <div class="ui-widget-content ui-corner-all spwidget-demo-float">
                    
                    <p>This demo uses one of lists available on this site (picker below) and displays a filter panel for the fields on that list.</p>
                    
                    <p>Click below to select a List.</p>
                    <div class="spwidgets-demo-lists"></div>
                    
                    <div class="spwidgets-list-filter ui-widget-content" style="padding: .5em;">
                    </div>
                    
                </div>
                <div class="spwidget-demo-float">
                    <div class="spwidget-demo-tabs">
                        <ul>
                            <li>
                                <a href="#spwidgets_demo_filter_results">
                                    <span>Results</span>
                                </a>
                            </li>
                            <li>
                                <a href="#spwidgets_demo_filter_output">
                                    <span>CAML XML</span>
                                </a>
                            </li>
                            <li>
                                <a href="#spwidgets_demo_filter_about">
                                    <span>About</span>
                                </a>
                            </li>
                        </ul>
                        <div id="spwidgets_demo_filter_results">
                            
                            <p>
                                The results from the filter defined are displayed below.
                                Results are limited only to the first 10 matches and the
                                first 3 columns..
                            </p>
                            
                            <div class="spwidgets-demo-filter-result-output">
                                
                            </div>
                            
                        </div>
                        <div id="spwidgets_demo_filter_output">
                            <p>
                            Click the filter button to see CAML generated from filter values entered.
                            </p>
                            <div class="spwidgets-list-filter-query">
                                <textarea name="camlquery" class="spwidget-demo-code"></textarea>
                            </div>
                        </div>
                        
                        <div id="spwidgets_demo_filter_about">
                            
                            <p>
                            The List Filter widget displays a filter panel to collect information from the
                            user. Data can be used to then retrieve rows from the list 
                            using the criteria provided by the user.
                            </p>
                            
                            <p>Slider below is used for testing purposes.</p>
                            
                            <div style="padding: .5em; margin-bottom: 2em;margin-top:2em;">
                                <div style="margin-bottom: 1em;">
                                    Use slider below to test width of container holding the 
                                    filter panel and see how the content adjusts to the new
                                     width.</div>
                                <div class="ui-widget-content spwidgets-list-filter-slider-value ui-corner-all" style="text-align:center;width:5em;padding:.5em;margin:.2em;font-size:1.5em;font-weight:bold;">100%</div>
                                <div class="spwidgets-list-filter-width" style="width: 50%;"></div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div><!-- end: #SPControlListFilterPanel -->
        
        <div id="SPDateField">
            
            <h2>Date Widget</h2>
            
            <div class="spwidget-demo-fluid spwidget-demo-float-cntr">
                <div class="ui-widget-content ui-corner-all spwidget-demo-float">
                    
                    <div class="spwidget-demo-samples">
                        
                        <p>
                            <h3>Example 1</h3>
                            <p>Default functionality.</p>
                            <div class="spwidget-demo-example1">
                                <input type="text" name="example1" value="" />
                            </div>
                        </p>
                        <hr>
                        <p>
                            <h3>Exmaple 2</h3>
                            <p>Allow multiple dates.</p>
                            <div>
                                <input type="text" name="example2" value="" />
                            </div>
                        </p>
                        <hr>
                        <p>
                            <h3>Exmaple 3</h3>
                            <p>Override date input format to Euro - mm/dd/yyyy</p>
                            <div>
                                <input type="text" name="example3" value="" />
                            </div>
                        </p>
                        
                        <p>
                            <h3>Exmaple 4</h3>
                            <p>
                                In this example, the input field used to bind SPDateField widget
                                was already storing 2 dates: August 1, 2013 and August 2, 2013.
                            </p>
                            <div>
                                <input type="text" name="example4" value="2013-08-01;2013-08-02" />
                            </div>
                        </p>
                        
                        <p style="height: 15em;"></p>
                    </div>
                    
                </div>
                <div class="spwidget-demo-float">
                    <div class="spwidget-demo-tabs">
                        <ul>
                            <li>
                                <a href="#spwidgets_demo_date_results">
                                    <span>Results</span>
                                </a>
                            </li>
                            <li>
                                <a href="#spwidgets_demo_date_about">
                                    <span>About</span>
                                </a>
                            </li>
                        </ul>
                        
                        <div id="spwidgets_demo_date_results">
                            <p>
                                As the dates are selected, the demo will output data to this 
                                area when the input element's change event is triggered.
                            </p>
                            <div class="spwidget-output">
                                
                            </div>
                        </div>
                        
                        <div id="spwidgets_demo_date_about">
                            <p>
                                SPDateField is a widgets wrapped around jQuery UI Datepicker that 
                                allows the user to pick one or more dates using their own locale 
                                format, while storing the SharePoint friendly format (YYY-MM-DD) 
                                in the input field to which this widget was bound to.
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div> <!-- end: #SPDateField -->
        
        <div id="SPWidgetsAbout">
            
            <p>
                Below are the version of software currently being used for this demo showcase.
            </p>
            
            <ul class="spwidgets-demo-info-cntr">
                
            </ul>
            
        </div> <!-- END: #SPWidgetsAbout -->
        
    </div>
    <div>
        <span>Build: </span><span>_BUILD_VERSION_NUMBER_</span>
    </div>
    <div>
        <div id="themeSwitchWidget"></div>
    </div>
    
</div>
</div>

<script type="text/javascript" language="javascript">

//__HAS_EMBEDED_DATA_FROM_BUILD__

setTimeout(function(){
    
    (function($){
        
        var jQuery = $;
        
        $(function(){
            
            $('<link rel="stylesheet" type="text/css" href="' +
                window.location.protocol + 
                '//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/redmond/jquery-ui.css" />'
            )
            .appendTo("head");
            
//-------- demo code below: inserted by build script -----------------

//__BUILD:DEMO_CODE__

//----------------- end of demo code (above) -------------------------
            
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
            
//-------- 3rd Party Libs below: inserted by build script ----------------- 
            
//__BUILD:EXT_LIBS__
            
//-------- 3rd Party Libs above: inserted by build script ----------------- 

//-------- START SPWidgets plugin: inserted by build script ----------------- 

//__BUILD:DEMO_SPWIDGETS__

//-------- END of SPWidgets plugin: inserted by build script ----------------- 
            
            // Get private version of jQuery for use by this demo only!
            SPWIDGET_DEMO.JQUERY = jQuery.noConflict(true);
            
            return SPWIDGET_DEMO.JQUERY || jQuery;
            
        })()
    ); //end: initialize all code
    
}, 2000); //end: setTimeout
    
</script>

</asp:Content>

