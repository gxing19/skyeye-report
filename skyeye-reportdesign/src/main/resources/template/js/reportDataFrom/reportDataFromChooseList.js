
layui.config({
    base: basePath,
    version: skyeyeVersion
}).extend({
    window: 'js/winui.window'
}).define(['window', 'table', 'jquery', 'winui', 'form'], function (exports) {
    var index = parent.layer.getFrameIndex(window.name);
    winui.renderColor();
    var $ = layui.$,
        form = layui.form,
        table = layui.table;

    // 数据源类型列表
    showGrid({
        id: "dataFromType",
        url: reqBasePath + "reportcommon008",
        params: {},
        pagination: false,
        template: getFileContent('tpl/template/select-option.tpl'),
        method: "GET",
        ajaxSendLoadBefore: function(hdb){
        },
        ajaxSendAfter:function(json){
            initTable();
        }
    });

    // 数据源选择列表
    function initTable(){
        table.render({
            id: 'messageTable',
            elem: '#messageTable',
            method: 'post',
            url: reqBasePath + 'reportdatafrom006',
            where: getTableParams(),
            even: true,
            page: true,
            limits: getLimits(),
            limit: getLimit(),
            cols: [[
                { type: 'radio'},
                { title: systemLanguage["com.skyeye.serialNumber"][languageType], type: 'numbers'},
                { field: 'name', title: '名称', align: 'left', width: 150},
                { field: 'typeName', title: '来源', align: 'left', width: 100 },
                { field: 'remark', title: '备注', align: 'left', width: 150 },
                { field: 'createName', title: '创建人', align: 'left', width: 100 },
                { field: 'createTime', title: '创建时间', align: 'center', width: 140 },
                { field: 'lastUpdateName', title: '最后修改人', align: 'left', width: 100 },
                { field: 'lastUpdateTime', title: '最后修改时间', align: 'center', width: 140}
            ]],
            done: function(res){
                matchingLanguage();
                $('#messageTable').next().find('.layui-table-body').find("table" ).find("tbody").children("tr").on('dblclick',function(){
                    var dubClick = $('#messageTable').next().find('.layui-table-body').find("table").find("tbody").find(".layui-table-hover");
                    dubClick.find("input[type='radio']").prop("checked", true);
                    form.render();
                    var id = JSON.stringify(dubClick.data('index'));
                    var obj = res.rows[id];
                    parent.dataBaseMation = obj;
                    parent.layer.close(index);
                    parent.refreshCode = '0';
                });

                $('#messageTable').next().find('.layui-table-body').find("table" ).find("tbody").children("tr").on('click',function(){
                    var click = $('#messageTable').next().find('.layui-table-body').find("table").find("tbody").find(".layui-table-hover");
                    click.find("input[type='radio']").prop("checked", true);
                    form.render();
                })
            }
        });

        table.on('tool(messageTable)', function (obj) {
            var data = obj.data;
            var layEvent = obj.event;
        });
    }

    form.render();
    form.on('submit(formSearch)', function (data) {
        if (winui.verifyForm(data.elem)) {
            refreshloadTable();
        }
        return false;
    });

    // 刷新数据
    $("body").on("click", "#reloadTable", function(){
        loadTable();
    });

    function loadTable(){
        table.reload("messageTable", {where: getTableParams()});
    }

    function refreshloadTable(){
        table.reload("messageTable", {page: {curr: 1}, where: getTableParams()});
    }

    function getTableParams(){
        return {
            name: $("#name").val(),
            type: $("#dataFromType").val()
        };
    }

    exports('reportDataFromChooseList', {});
});
