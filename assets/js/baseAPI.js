// 在每次调用$.ajax() $.get()  $.post() 的时候,都会预先调用
//此函数
//此函数会得到 我们给 ajax的配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的 ajax 请求之前, 统一拼接请求的根路径 
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);
    //统一为有权限的接口,设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function (res) {
        console.log(res.responseJSON.message);
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})