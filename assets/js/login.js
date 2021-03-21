
$(function () {
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //自定义校验规则
    var form = layui.form
    form.verify({
        'pwd': [
            /^[\S]{6,12}$/, '密码必须6-12位,且不能出现空格'
        ],

        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            //需要获得密码框中的值来进行对比
            var pwd = $('#pwd').val()
            if (pwd !== value) {
                return alert('两次密码不一致')
            }
        }
    })

    // axios.default.baseURL = 'http://ajax.frontend.itheima.net'
    // 监听注册表单的注册请求
    // $('#form_reg').on('submit', function (e) {
    //     e.preventDefault(); //阻止表单默认提交行为
    //     var data = {
    //         username: $('#form_reg [name=username]').val(),
    //         password: $('#form_reg [name=password]').val()
    //     }
    //     console.log("请求1",data);
    //     axios.post('http://ajax.frontend.itheima.net/api/reguser', data).then(function (res) {
    //         // if (res.status !== 0) {
    //         //     return console.log(res.message);
    //         // }
    //         console.log(res.data);
    //         // console.log('注册成功');
    //     })
    // })

    // let layer = layui.layer
    // $('#form_reg').on('submit', function (e) {
    //     // 1. 阻止默认的提交行为
    //     e.preventDefault()
    //     // 2. 发起Ajax的POST请求
    //     var data = {
    //         username: $('#form_reg [name=username]').val(),
    //         password: $('#form_reg [name=password]').val()
    //     }
    //     console.log("请求2",data);

    //     $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
    //         if (res.status !== 0) {
    //             return layer.msg(res.message)
    //         }
    //         layer.msg('注册成功，请登录！')
    //         //模拟点击事件,跳转到登录页面
    //         $('#link_login').click()
    //     })
    // })

    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功')
                //将登录成功后得到的token值存入本地数据
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        });
    })

})