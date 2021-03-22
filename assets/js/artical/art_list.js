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
                renderPage(res.total)

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
                // console.log(alltype);
                layui.form.render()
            }
        });
    }

    //监听筛选按钮所触发的事件
    $('#filter').on('submit', function (e) {
        e.preventDefault()
        var cateid = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        query.cate_id = cateid
        query.state = state
        getList();
    })

    function getList() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: query,
            success: function (res) {
                console.log(res);
                //把服务器返回来的数据交给模板渲染
                var strhtml = template('tpl-table', res)
                $('tbody').html(strhtml);

            }
        });
    }

    //为删除按钮注册点击事件
    $('body').on('click', '.btn-delet', function () {
        var data_index = $(this).attr('data-index')
        var del_num = $('.btn-delet').length
        layer.confirm('确定要删除?', { icon: 3, title: '提示' }, function (index2) {
            //do something
            console.log(data_index);
            $.ajax({
                type: "GET",
                url: "/my/article/delete/" + data_index,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功')
                    if (del_num == 1) {
                        query.pagenum = query.pagenum == 1 ? 1 : query.pagenum - 1
                    }
                    getList();
                }
            });
            layer.close(index2);
        });
    })

    function renderPage(num) {
        console.log(num);
        var laypage = layui.laypage
        //调用layrender来执行
        laypage.render({
            elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号
            , count: num //数据总数，从服务端得到
            , limit: query.pagesize //限制每页显示的条数
            , curr: query.pagenum //设置默认的起始页,
            , layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
            , limits: [2, 3, 5, 10]
            , jump: function (obj, first) {
                //触发jump的方式有两种 一种是调用render函数 还有就是点击页码的时候
                //如果first的值是true 则是调用render函数的时候触发的
                query.pagenum = obj.curr
                //点击分页条数时,也可以触发render函数,并且把选择的显示条目数给query
                query.pagesize = obj.limit
                if (!first) {
                    getList()
                }
            }
        });
    }
})

