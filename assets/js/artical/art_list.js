$(function () {
    let query = {
        pagenum: 1, //页码值,默认显示第一页
        pagesize: 4, //一页显示多少条数据
        cate_id: '', //文章分类id
        state: ''    //文章发布状态
    }

    //定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = padZzero(dt.getFullYear())
        var m = padZzero(dt.getMonth() + 1)
        var d = padZzero(dt.getDate())

        var hh = padZzero(dt.getHours())
        var mm = padZzero(dt.getMinutes())
        var ss = padZzero(dt.getSeconds())

        return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss
    }

    //定义一个补零函数
    function padZzero(n) {
        return n > 9 ? n : '0' + n
    }

    initTable()
    initCate()

    //初始化表格数据
    function initTable() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: query,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                console.log(res);
                var strhtml = template('tpl-table', res)
                $('tbody').html(strhtml);
                // var alltype = template('alltype', res)
                // $('[name=cate_id]').html(alltype)
            }
        });
    }

    //初始化分类
    function initCate() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败')
                }
                console.log(res);
                var alltype = template('tpl-cate', res)
                $('[name=cate_id]').html(alltype)
                console.log(alltype);
                layui.form.render()
            }
        });
    }
})