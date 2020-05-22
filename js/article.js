$(function () {
    var id = utils.convertToObj(location.search.slice(1)).id
    $.ajax({
        type: 'get',
        url: BigNew.article_detail,
        data: {
            id: id
        },
        success: function (res) {
            console.log(res.data.id)

            if (res.code == 200) {
                var htmlStr = template('item', res.data)
                $('.box').html(htmlStr)
                $('#myForm input[name="articleId"]').val(res.data.id)
                comment(res.data.id)

            }
        }
    })
    $('#myForm').on('submit', function (e) {
        e.preventDefault()
        // var form=$('#myForm')[0]
        // var data =new FormData(form)
        $.ajax({
            type: "post",
            url: BigNew.post_comment,
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.code == 201) {
                    alert(res.msg)
                    $('#myForm')[0].reset()
                }
            }
        })
    })

    function comment(id) {
        $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            data: {
                articleId: id
            },
            success: function (res) {
                console.log(res)
                if (res.code == 200) {
                    var htmlStr = template('items', res)
                    $('.comment_list_con').html(htmlStr)
                    $('.comment_count').text(res.data.length + '条评论')
                }
            }
        })
    }

})