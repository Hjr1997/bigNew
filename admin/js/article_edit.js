$(function () {
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

    var str = location.search.slice(1)
    console.log(str)
    var id = utils.convertToObj(str).id
    console.log(id)
    $.ajax({
        type: 'get',
        url: BigNew.article_search,
        data: {
            id: id
        },
        success: function (res) {
            console.log(res)
            // 将数据渲染到页面上
            if (res.code == 200) {
                $('#form input[name=id]').val(res.data.id)
                $('#form input[name=title]').val(res.data.title)
                $('#form .article_cover').attr('src', res.data.cover)
                // $('#form select[name="categoryId"]').val(res.data.categoryId)
                $('#form input[name=date]').val(res.data.date)
                // $('#form textarea[name=content]').val(res.data.content)
                editor.txt.html(res.data.content)
                var categoryId = res.data.categoryId

                $.ajax({
                    type: 'get',
                    url: BigNew.category_list,
                    success: function (res) {
                        console.log(res)
                        console.log(typeof res)
                        // 1.2 获取数据并渲染页面
                        if (res.code == 200) {
                            console.log(res)
                            res.categoryId = categoryId
                            var htmlStr = template('item', res)
                            $('.category').html(htmlStr)
                        }
                    }
                })
            }
        }
    })
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
        if ($(this).hasClass('btn-edit')) {
            data.append('state', '已发布')
        } else {
            data.append('state', '草稿')
        }
        // data.append('state', '已发布')

        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    window.history.back()
                    // window.location.href = 'article_list.html'
                }

            }
        })
    })
})
