$(function () {
    var form = layui.form
    initInfo();
    var index = null
    //添加文章分类模块
    $('#addType').on('click', function () {
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#form_add').html()
        });
    })

    //当表单提交的时候,就新增文章类别
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章失败')
                }
                console.log(res);
                layer.close(index);
                initInfo();
            }
        });
    })

    //点击修改按钮以后,添加一个修改文章的弹出层
    $('tbody').on('click', '.btn-edit', function (e) {
        e.preventDefault();
        console.log(e);
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#form-edit').html()
        });
        var index1 = $(this).attr('data-index')
        fillInfo(index1);
        console.log(index1);
        // var name = $(this).parents('td').prev().
        // console.log(name);
    })

    //把通过 id 查询到的数据 渲染到模板上
    function fillInfo(id) {
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                console.log(res);
                //通过 lay-filter 属性与form-edit绑定 
                form.val('form-edit', res.data)
            }
        });
    }

    //确认添加按钮
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(index)
                initInfo()
            }
        })
    })

    $('body').on('click', '.btn-delet', function () {
        console.log(55);
        let index3 = $(this).attr('data-index')
        layer.confirm('确定删除?', function (index4) {
            //do something
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + index3,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除类别失败')
                    }
                    console.log(res);
                    layer.msg('删除类别成功')
                    initInfo()
                }
            });
            layer.close(index4);
        });     
    })
})

//初始化信息模块
function initInfo() {
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取文章列表失败')
            }
            console.log(res);
            var htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr);
        }
    });
}