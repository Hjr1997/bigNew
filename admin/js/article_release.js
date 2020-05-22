$(function () {
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            console.log(res)
            if (res.code == 200) {
                var htmlStrs = template('items', res)
                console.log(res.data)
                $('.category').html(htmlStrs)
            }
        }

    })
    // 3. 启用日期插件
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isTime: false,
        zIndex: 20999,  //修改日期插件的弹出层级
        minDate: "2014-09-19 00:00:00"
    })
    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()
    $('#inputCover').on('change', function () {
        var file = this.files[0]
        console.log(file)
        var url = URL.createObjectURL(file)
        $('.article_cover').attr('src', url)
    })
    $('#form').on('click', '.btn', function (e) {
        e.preventDefault()
        var form = $('#form')[0]
        var data = new FormData(form)
        console.log($(this))
        console.log($(e.target))
        data.append('content', editor.txt.html())
        if ($(this).hasClass('btn-release')) {
            data.append('state', '已发布')
        } else {
            data.append('state', '草稿')
        }
        // data.append('state', '已发布')

        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    // /    window.history.back()/
                    window.location.href = 'article_list.html'
                }

            }
        })
    })
})