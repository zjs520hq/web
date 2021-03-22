$(function () {
    var form = layui.form
    showType()

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

    function showType() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                console.log(res);
                var strhtml = template('tpl-cate', res)
                $('[name = cate_id]').html(strhtml)
                form.render()
            }
        });
    }

    // 初始化富文本编辑器
    initEditor()

    //为选择封面添加点击事件
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })

    var art_state = '已发布'

    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })

    //为文件框添加改变事件
    var newImgUrl = null
    $('#coverFile').on('change', function (e) {
        var files = e.target.files
        if (files.length == 0) {
            return layer.msg('请选择文件')
        }
        newImgUrl = URL.createObjectURL(files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        //$(this)[0] 是把jq对象转换成dom对象  FormData()里面的东西是整个表单
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                pub(fd)
            })


    })

    function pub(file) {
        $.ajax({
            type: "post",
            url: "/my/article/add",
            data: file,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败')
                }
                console.log(res);
                layer.msg('发布文章成功')
                location.href = '/artical/art_list.html'
            }
        });
    }
})