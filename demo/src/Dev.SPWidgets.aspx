<%-- SPWIDGETS DEMO PAGE --%>
<%-- Simply open this page in a browser and all scripts files --%>
<%-- will be loaded individually and thus available in browser --%>
<%-- debugging tools (like Firefox) --%>
<%@ Page language="C#" MasterPageFile="~masterurl/default.master"    Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=12.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
    SPWidgets Development Page
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitleInTitleArea" runat="server">
    <h2>SPWidgets Development Page</h2>
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
 * Dev.SPWidgets.html
 * File is used for development. Loads each script file individually
 * so that it can be looked at in the browser's debugger. 
 * 
 * To Use it, simply make a copy of it and save anywhere on a 
 * SharePoint library. Use it in a CEWP. Remember to set the
 * BIN_DIR on the copy that was made.
 */

window.SPWIDGET_DEMO = {
    
    // BIN_DIR - Used for Development only.
    //  Value can also be set via the URL with param BIN_DIR=
    //
    //  Edit the SPWIDGET_BIN_DIR variable below and define the URL
    //  to the folder that contains the Demo and src folder. 
    //  Example:
    //  if the folders are in
    //      http://yoursite/plugins/spwidgets/demo/
    //      http://yoursite/plugins/spwidgets/src/
    // the variable below would be defined as:
    //          http://yoursite/plugins/spwidgets/    
    BIN_DIR: '',
    
    JQUERY: null
    
};

</script>
<div id="spwidgets_demo_cntr" class="ui-widget-content">
    
</div>
<script type="text/javascript">
    
    if (!SPWIDGET_DEMO.BIN_DIR) {
        
        SPWIDGET_DEMO.BIN_DIR = GetUrlKeyValue("BIN_DIR");
        
    }
    
    if (!SPWIDGET_DEMO.BIN_DIR) {
        
        document.write(
            '<h1 style="color:red;">' +
                'BIN_DIR not defined. Add the following parameter to the URL and refresh the page:<br><br>' +
                '<code>?BIN_DIR=url_to_src_folder</code><br><br>' +
                'Url to source folder should include the trailing forward slash.' +
            '</h1>'
        );
        
    } else {
        
        document.write(
            '<script type="text/javascript" src="' + SPWIDGET_DEMO.BIN_DIR +
            'demo/src/demo.dev.js"></' + 'script>'
        );
        
    }
    
</script>

</asp:Content>


