
$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (val) {
            if (val == $('#oldpwd').val()) {
                return '新旧密码不能相同哦'
            }
        },
        repwd: function (val) {
            if (val !== $('#newpwd').val()) {
                return '两次密码必须相同哦'
            }
            console.log(11);
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(), //快速获取表单的值
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败!')
                }
                console.log('更新成功');
                //重置表单
                $('.layui-form')[0].reset()
            }
        });
    })

})