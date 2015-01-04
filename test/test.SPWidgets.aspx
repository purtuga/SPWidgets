<%-- SPWIDGETS DEV PAGE--%>
<%@ Page language="C#" MasterPageFile="~masterurl/default.master"    Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=12.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
    SPWidgets Test Page
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitleInTitleArea" runat="server">
    <h2>SPWidgets Test Page</h2>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">

<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8">

<link rel="stylesheet" type="text/css" href="../demo/src/demo.css?@BUILD"/>
<script type="text/javascript">
    document.write('<link rel="stylesheet" href="/' +
        '/ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/redmond/jquery-ui.css?_@BUILD">');
</script>

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

<div id="spwidgets_demo_cntr" class="ui-widget-content"></div>

<script type="text/javascript" src="../vendor/jquery/dist/jquery.js"></script>
<script type="text/javascript" src="../vendor/jquery-ui/jquery-ui.js"></script>
<script type="text/javascript" src="../dist/jquery.SPWidgets.js"></script>

<script type="text/javascript">
(function($){

    window.SPWIDGET_DEMO = {
        BIN_DIR: '../'
    };

}(jQuery));
</script>
<script type="text/javascript" src="../demo/src/ext/vkBeautify.js"></script>
<script type="text/javascript" src="../demo/src/demo.common.js"></script>
<script type="text/javascript" src="../demo/src/widget.board.demo.js"></script>
<script type="text/javascript" src="../demo/src/widget.date.demo.js"></script>
<script type="text/javascript" src="../demo/src/widget.filter.demo.js"></script>
<script type="text/javascript" src="../demo/src/widget.lookup.demo.js"></script>
<script type="text/javascript" src="../demo/src/widget.peoplepicker.demo.js"></script>
<script type="text/javascript" src="../demo/src/widget.upload.demo.js"></script>

<script type="text/javascript">
(function($){

     $("#spwidgets_demo_cntr").load(
        String(SPWIDGET_DEMO.BIN_DIR).replace(/ /g, "%20") +
        "demo/src/Demo.SPWidgets.aspx .spwidgets-demo-cntr",
        function(){

            SPWIDGET_DEMO.init();

        });

}(jQuery));
</script>
</asp:Content>


