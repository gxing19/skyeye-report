
var rowId;

layui.config({
    base: basePath,
    version: skyeyeVersion
}).extend({
    window: 'js/winui.window',
    echarts: '../echarts/echarts',
    echartsTheme: '../echarts/echartsTheme'
}).define(['window', 'jquery', 'winui', 'form', 'echarts', 'colorpicker'], function (exports) {
    winui.renderColor();
    var $ = layui.$,
        form = layui.form;

    rowId = GetUrlParam("rowId");

    var echartsModel = {};
    // 获取echarts模型配置
    AjaxPostUtil.request({url:reqBasePath + "reportimporthistory003", params: {}, type:'json', method: "GET", callback:function(json){
        if(json.returnCode == 0){
            echartsModel = json.rows;
        }else{
            winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
        }
    }, async: false});

    var bgImages = {};
    // 获取所有背景图片列表信息
    AjaxPostUtil.request({url:reqBasePath + "reportbgimage004", params: {}, type:'json', method: "GET", callback:function(json){
        if(json.returnCode == 0){
            bgImages = json.rows;
        }else{
            winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
        }
    }, async: false});

    var initData = {};
    // 获取初始化数据
    AjaxPostUtil.request({url:reqBasePath + "reportpage006", params: {rowId: rowId}, type:'json', method: "GET", callback:function(json){
        if(json.returnCode == 0){
            initData = JSON.parse(json.bean.content);
        }else{
            winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
        }
    }, async: false});

    $.skyeyeReportDesigner({
        mouseLineColor: "blue",
        initData: initData,
        headerMenuJson: [{
            "icon": " fa fa-area-chart fa-fw",
            "title": "图表",
            "id": "echartsModel",
            "children": echartsModel
        }, {
            "icon": " fa fa-table fa-fw",
            "title": "表格",
            "children": [{
                "icon": " fa fa-table fa-fw",
                "title": "简单表格",
            }, {
                "icon": " fa fa-list-alt fa-fw",
                "title": "复杂表格",
            }]
        }, {
            "icon": " fa fa-area-chart fa-fw",
            "title": "背景图",
            "id": "bgImages",
            "children": bgImages
        }, {
            "icon": " fa fa-fw fa-save",
            "title": "保存",
            "class": "save-btn",
            "id": "save"
        }]
    });

    form.render();

});