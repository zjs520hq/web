$(function () {
    getInfo();
    leave()

})

function getInfo() {
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",
        // headers: {
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取失败')
            }
            //渲染头像和名字
            renderInfo(res.data)
            console.log(res.data);
        }
    });
}

function renderInfo(usr) {
    //获取用户名称
    var name = usr.nickname || usr.username
    //渲染用户名称
    $('#welcome').html('欢迎' + '' + name)
    //渲染用户头像
    if (usr.user_pic !== null) {
        $('.layui-nav-img').attr('src', usr.user_pic).show();
        $('.txt-avatar').hide()
    } else {
        var firstName = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.txt-avatar').html(firstName)
    }
}

function leave() {
    var layer = layui.layer
    $('#out').on('click', function () {
        //提示用户是否确定退出
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
            //清空本地存储中的token
            localStorage.removeItem('token')
            //关闭询问框
            layer.close(index);
            //跳转到登录页面
            location.href = '/login.html'
        });
    })
}