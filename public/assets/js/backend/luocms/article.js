define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'luocms/article/index' + location.search,
                    add_url: 'luocms/article/add',
                    edit_url: 'luocms/article/edit',
                    del_url: 'luocms/article/del',
                    multi_url: 'luocms/article/multi',
                    import_url: 'luocms/article/import',
                    table: 'luocms/article',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {
                            field: 'title',
                            title: __('Title'),
                            operate: 'LIKE',
                            formatter: function (value, row, index) {
                                return [
                                    '<a href="http://fastadmin.lh/addons/luocms?id=' + row.id + '" target="_blank">' + value + '</a>'
                                ].join("")
                            }
                        },
                        {field: 'is_delete', title: __('Is_delete')},
                        {field: 'createtime', title: __('Createtime'), formatter: Table.api.formatter.datetime, operate: 'RANGE', addclass: 'datetimerange', autocomplete:false},
                        {field: 'updatetime', title: __('Updatetime'), formatter: Table.api.formatter.datetime, operate: 'RANGE', addclass: 'datetimerange', autocomplete:false},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});