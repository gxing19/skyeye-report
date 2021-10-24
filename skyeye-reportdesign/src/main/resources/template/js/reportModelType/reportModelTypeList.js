
var rowId = "";

layui.config({
    base: basePath,
    version: skyeyeVersion
}).extend({
    window: 'js/winui.window',
}).define(['window', 'treeGrid', 'jquery', 'winui', 'form'], function (exports) {
    winui.renderColor();
    var $ = layui.$,
        form = layui.form,
        treeGrid = layui.treeGrid;

    authBtn('1635086167509');

    treeGrid.render({
        id: 'messageTable',
        elem: '#messageTable',
        method: 'post',
        idField: 'id',
        url: reqBasePath + 'reportmodeltype001',
        cellMinWidth: 100,
        where: getTableParams(),
        treeId: 'id',//树形id字段名称
        treeUpId: 'parentId',//树形父id字段名称
        treeShowName: 'name',//以树形式显示的字段
        cols: [[
            { field: 'name', width: 300, title: '名称'},
            { field: 'createName', title: '创建人', align: 'left', width: 100 },
            { field: 'createTime', title: '创建时间', align: 'center', width: 140 },
            { field: 'lastUpdateName', title: '最后修改人', align: 'left', width: 100 },
            { field: 'lastUpdateTime', title: '最后修改时间', align: 'center', width: 140},
            { title: '操作', fixed: 'right', align: 'center', width: 120, toolbar: '#tableBar'}
        ]],
        done: function(){
            matchingLanguage();
        },
        isPage:false
    });

    treeGrid.on('tool(messageTable)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'del') { //删除
            del(data);
        }else if (layEvent === 'edit') { //编辑
            edit(data);
        }
    });

    // 删除
    function del(data){
        layer.confirm(systemLanguage["com.skyeye.deleteOperationMsg"][languageType], {icon: 3, title: systemLanguage["com.skyeye.deleteOperation"][languageType]}, function(index){
            layer.close(index);
            AjaxPostUtil.request({url:reqBasePath + "reportmodeltype003", params:{id: data.id}, type:'json', method: "DELETE", callback:function(json){
                if(json.returnCode == 0){
                    winui.window.msg("删除成功", {icon: 1,time: 2000});
                    loadTable();
                }else{
                    winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
                }
            }});
        });
    }

    // 编辑
    function edit(data){
        rowId = data.id;
        _openNewWindows({
            url: "../../tpl/reportModelType/reportModelTypeEdit.html",
            title: systemLanguage["com.skyeye.editPageTitle"][languageType],
            pageId: "reportModelTypeEdit",
            area: ['90vw', '90vh'],
            callBack: function(refreshCode){
                if (refreshCode == '0') {
                    winui.window.msg("操作成功", {icon: 1,time: 2000});
                    loadTable();
                } else if (refreshCode == '-9999') {
                    winui.window.msg("操作失败", {icon: 2,time: 2000});
                }
            }});
    }

    // 新增
    $("body").on("click", "#addBean", function(){
        _openNewWindows({
            url: "../../tpl/reportModelType/reportModelTypeAdd.html",
            title: systemLanguage["com.skyeye.addPageTitle"][languageType],
            pageId: "reportModelTypeAdd",
            area: ['90vw', '90vh'],
            callBack: function(refreshCode){
                if (refreshCode == '0') {
                    winui.window.msg("操作成功", {icon: 1,time: 2000});
                    loadTable();
                } else if (refreshCode == '-9999') {
                    winui.window.msg("操作失败", {icon: 2,time: 2000});
                }
            }});
    });

    form.render();
    form.on('submit(formSearch)', function (data) {
        if (winui.verifyForm(data.elem)) {
            loadTable();
        }
        return false;
    });

    // 刷新数据
    $("body").on("click", "#reloadTable", function(){
        loadTable();
    });

    function loadTable(){
        treeGrid.query("messageTable", {where: getTableParams()});
    }

    function getTableParams(){
        return {
            name: $("#name").val()
        };
    }

    exports('reportModelTypeList', {});
});
