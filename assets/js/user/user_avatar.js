// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

var layer = layui.layer

$(function () {
    $('#upload').on('click', function () {
        $('.up').click();
    })

    //为文件选择框绑定 change 事件
    $('.up').on('change', function (e) {
        //获取用户选择的文件
        var files = e.target.files
        console.log(file);
        if (files.length === 0) {
            return layer.msg('请选择照片')
        }
        var file = e.target.files[0];
        //把新的图片转换成一个 url地址
        //URL.createObjectURL 可以把图片转换成一个URL地址
        var newImgUrl = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    $('#confirm').on('click', function () {
        //获取用户裁剪的头像
        var dataURL = $image
        .cropper('getCroppedCanvas', {
          // 创建一个 Canvas 画布
          width: 100,
          height: 100
        })
        .toDataURL('image/png')
    //把选择的图片上传到服务器
        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: {
                avatar:dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新头像失败')
                }
                console.log(res);
                window.parent.getInfo();
            }
        });
    })

})