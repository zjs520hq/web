
$(function () {
    let form = layui.form
    let layer = layui.layer

    form.verify({
        //val 就是文本框中输入的内容
        nikname: function (val) {
            if (val.length >= 6) {
                return layer.msg('昵称长度必须在 1 - 6 个字符之间')
            }
        }
    })

    //重置表单的数据
    $('#reset').on('click', function (e) {
        e.preventDefault(); //阻止表单的默认重置行为
        getInfo();
    })

    getInfo();

    //初始化用户信息
    function getInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                //调用form.val()为表单赋值
                form.val('user_info', res.data)
                // console.log(res);
            }
        });
    }

    //监听到表单被提交的时候
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()   //阻止默认的提交事件
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新信息失败')
                }
                console.log(11);
                window.parent.getInfo();
            }
        });
    })

   
})

