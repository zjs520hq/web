// 在每次调用$.ajax() $.get()  $.post() 的时候,都会预先调用
//此函数
//此函数会得到 我们给 ajax的配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的 ajax 请求之前, 统一拼接请求的根路径 
    options.url += 'http://ajax.frontend.itheima.net'
})