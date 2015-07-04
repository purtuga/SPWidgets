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
    /* BUILD_INCLUDE('<%= buildFolder %>/demo/src/demo.css') */
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
 * Build Date:  @DATE
 * Version:     @VERSION @BUILD
 *
 */
</script>
<div id="spwidgets_demo_cntr" class="ui-widget-content" style="display:none;">

<!-- BUILD_INCLUDE('<%= buildFolder %>/demo/src/demo.html') -->

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

// BUILD_INCLUDE('<%= buildFolder %>/demo.widgets.js')


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

// BUILD_INCLUDE('<%= buildFolder %>/demo.vendor.js')

            // Get private version of jQuery for use by this demo only!
            SPWIDGET_DEMO.JQUERY = jQuery.noConflict(true);

            return SPWIDGET_DEMO.JQUERY || jQuery;

        })()
    ); //end: initialize all code

}, 2000); //end: setTimeout

</script>

</asp:Content>

